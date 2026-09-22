import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { certifyProduction } from "./certify-production.mjs";

const html =
  '<script src="/assets/current.js"></script><link href="/assets/current.css">';
const files = {
  "/": html,
  "/assets/current.js": "current JS",
  "/assets/current.css": "current CSS",
};

async function fixture(t, respond) {
  const buildDir = await mkdtemp(join(tmpdir(), "tamerian-certification-"));
  t.after(() => rm(buildDir, { recursive: true, force: true }));
  await mkdir(join(buildDir, "assets"));
  await writeFile(join(buildDir, "index.html"), html);
  for (const path of ["/assets/current.js", "/assets/current.css"]) {
    await writeFile(join(buildDir, path), files[path]);
  }
  const server = createServer((req, res) => respond(req, res));
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return {
    buildDir,
    base: `http://127.0.0.1:${server.address().port}`,
    attempts: 2,
    intervalMs: 1,
    log: () => {},
  };
}

test("waits for the deployed HTML to reference the exact build", async t => {
  let roots = 0;
  const options = await fixture(t, (req, res) => {
    const body =
      req.url === "/" && ++roots === 1
        ? html.replaceAll("current", "previous")
        : files[req.url];
    res.end(body);
  });
  const result = await certifyProduction(options);
  assert.equal(result.attempt, 2);
});

test("retries transient HTTP failures and certifies matching bytes", async t => {
  let roots = 0;
  const options = await fixture(t, (req, res) => {
    if (req.url === "/" && ++roots === 1) {
      res.writeHead(503).end("Deploying");
    } else {
      res.end(files[req.url]);
    }
  });
  assert.equal((await certifyProduction(options)).attempt, 2);
});

for (const kind of ["js", "css"]) {
  test(`rejects different ${kind} bytes even when asset names match`, async t => {
    const options = await fixture(t, (req, res) => {
      res.end(
        req.url === `/assets/current.${kind}` ? "wrong bytes" : files[req.url]
      );
    });
    await assert.rejects(certifyProduction(options), error => {
      assert.match(error.message, /did not match the exact build/);
      assert.match(error.cause.message, new RegExp(`${kind}: live hash`));
      return true;
    });
  });
}

test("rejects a deployment that never converges", async t => {
  const options = await fixture(t, (req, res) =>
    res.end(html.replaceAll("current", "previous"))
  );
  await assert.rejects(
    certifyProduction(options),
    /did not match the exact build/
  );
});
