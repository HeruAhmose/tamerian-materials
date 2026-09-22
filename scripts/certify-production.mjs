import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

function assets(html) {
  const js = html.match(/(?:src|href)=["'](\/assets\/[^"']+\.js)["']/)?.[1];
  const css = html.match(/href=["'](\/assets\/[^"']+\.css)["']/)?.[1];
  if (!js || !css)
    throw new Error("HTML must reference both JS and CSS assets");
  return { js, css };
}

const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");

export async function certifyProduction({
  base = "https://tamerian-materials.com",
  buildDir = "dist/public",
  attempts = 40,
  intervalMs = 15_000,
  log = console.log,
} = {}) {
  const built = assets(await readFile(resolve(buildDir, "index.html"), "utf8"));
  const hashes = {};
  for (const kind of ["js", "css"]) {
    hashes[kind] = sha256(await readFile(resolve(buildDir, `.${built[kind]}`)));
  }

  async function fetchBytes(path) {
    const response = await fetch(new URL(path, base), {
      headers: { "Cache-Control": "no-cache" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }

  log(`GITHUB_SHA=${process.env.GITHUB_SHA ?? "local"}`);
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const live = assets((await fetchBytes("/")).toString("utf8"));
      for (const kind of ["js", "css"]) {
        if (live[kind] !== built[kind]) {
          throw new Error(
            `${kind}: live ${live[kind]} != built ${built[kind]}`
          );
        }
        const liveHash = sha256(await fetchBytes(live[kind]));
        if (liveHash !== hashes[kind]) {
          throw new Error(`${kind}: live hash ${liveHash} != ${hashes[kind]}`);
        }
      }
      log(JSON.stringify({ built, sha256: hashes, attempt }));
      log("TAMERIAN_PUBLIC_PRODUCTION=PASS");
      return { assets: built, hashes, attempt };
    } catch (error) {
      log(`Deployment convergence ${attempt}/${attempts}: ${error.message}`);
      if (attempt === attempts) {
        throw new Error(
          "Production did not match the exact build before the deadline",
          {
            cause: error,
          }
        );
      }
      await delay(intervalMs);
    }
  }
  throw new Error("Certification requires at least one attempt");
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  await certifyProduction();
}
