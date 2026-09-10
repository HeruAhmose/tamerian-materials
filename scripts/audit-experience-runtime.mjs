import fs from "node:fs/promises";

const BASE = process.env.TAMERIAN_BASE_URL || "http://127.0.0.1:4188/";
const CDP_HTTP = process.env.TAMERIAN_CDP_URL || "http://127.0.0.1:9238";
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitFor(url, attempts = 80) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await sleep(250);
  }
  throw new Error(`timeout waiting for ${url}`);
}

class CDP {
  constructor(url) {
    this.url = url;
    this.id = 0;
    this.pending = new Map();
  }
  async open() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", event => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const pending = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error
          ? pending.reject(new Error(JSON.stringify(msg.error)))
          : pending.resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text || "evaluation failed");
    }
    return result.result.value;
  }
  close() {
    this.ws?.close();
  }
}

async function movePointerToFirstNavigation(cdp) {
  const point = await cdp.eval(`(() => {
    const element = [...document.querySelectorAll('nav a, header a')]
      .find(item => item.getClientRects().length > 0);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  })()`);
  if (!point) throw new Error("no visible Tamerian navigation target");
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: point.x,
    y: point.y,
  });
  return point;
}

await waitFor(BASE);
await waitFor(`${CDP_HTTP}/json/version`);
const targets = await (await fetch(`${CDP_HTTP}/json/list`)).json();
const target = targets.find(item => item.type === "page");
if (!target?.webSocketDebuggerUrl) throw new Error("no page target");
const cdp = new CDP(target.webSocketDebuggerUrl);
await cdp.open();

try {
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `(() => {
      const Native = window.AudioContext || window.webkitAudioContext;
      window.__tmAudioProbe = { contexts: 0, oscillators: 0 };
      if (Native) {
        const Wrapped = new Proxy(Native, {
          construct(Target, args) {
            const ctx = new Target(...args);
            window.__tmAudioProbe.contexts++;
            const nativeOscillator = ctx.createOscillator.bind(ctx);
            ctx.createOscillator = (...oscArgs) => {
              window.__tmAudioProbe.oscillators++;
              return nativeOscillator(...oscArgs);
            };
            return ctx;
          }
        });
        window.AudioContext = Wrapped;
        if (window.webkitAudioContext) window.webkitAudioContext = Wrapped;
      }
      const nativeRaf = window.requestAnimationFrame.bind(window);
      window.__tmMotionProbe = { callbacks: 0 };
      window.requestAnimationFrame = callback => nativeRaf(time => {
        window.__tmMotionProbe.callbacks++;
        return callback(time);
      });
    })();`,
  });

  await cdp.send("Page.navigate", { url: BASE });
  await sleep(650);
  const introProbe = await cdp.eval(`(() => ({
    intro: !!document.querySelector('[aria-label="Tamerian cinematic introduction"]'),
    audio: window.__tmAudioProbe,
    raf: window.__tmMotionProbe.callbacks
  }))()`);
  await sleep(300);
  const introRafAfter = await cdp.eval(`window.__tmMotionProbe.callbacks`);
  if (
    !introProbe.intro ||
    introProbe.audio.contexts !== 0 ||
    introProbe.audio.oscillators !== 0 ||
    introRafAfter <= introProbe.raf
  ) {
    throw new Error(
      `intro consent/motion contract failed ${JSON.stringify({ introProbe, introRafAfter })}`
    );
  }

  await cdp.eval(
    `sessionStorage.setItem('tamerian-intro-complete-v1','true'); location.reload(); true`
  );
  await sleep(1400);

  const initial = await cdp.eval(`(() => {
    const button = document.querySelector('[data-tamerian-sound]');
    return {
      state: button?.dataset.tamerianSound,
      pressed: button?.getAttribute('aria-pressed'),
      label: button?.getAttribute('aria-label'),
      probe: window.__tmAudioProbe,
      favicon: document.querySelector('link[rel~="icon"]')?.href || null
    };
  })()`);
  if (
    initial.state !== "off" ||
    initial.pressed !== "false" ||
    initial.label !== "Enable sounds"
  ) {
    throw new Error(`sound control not explicitly off: ${JSON.stringify(initial)}`);
  }
  if (initial.probe.contexts !== 0 || initial.probe.oscillators !== 0) {
    throw new Error(
      `audio initialized before opt-in: ${JSON.stringify(initial.probe)}`
    );
  }
  if (!initial.favicon) throw new Error("favicon missing");

  await cdp.eval(
    `document.querySelector('[data-tamerian-sound]')?.click(); true`
  );
  await sleep(450);
  const enabled = await cdp.eval(`(() => ({
    state: document.querySelector('[data-tamerian-sound]')?.dataset.tamerianSound,
    pressed: document.querySelector('[data-tamerian-sound]')?.getAttribute('aria-pressed'),
    label: document.querySelector('[data-tamerian-sound]')?.getAttribute('aria-label'),
    probe: window.__tmAudioProbe
  }))()`);
  if (
    enabled.state !== "on" ||
    enabled.pressed !== "true" ||
    enabled.label !== "Mute sounds" ||
    enabled.probe.contexts < 1 ||
    enabled.probe.oscillators < 1
  ) {
    throw new Error(`opt-in did not activate audio: ${JSON.stringify(enabled)}`);
  }

  const beforeHover = enabled.probe.oscillators;
  const hoverPoint = await movePointerToFirstNavigation(cdp);
  await sleep(250);
  const afterHover = await cdp.eval(`window.__tmAudioProbe.oscillators`);
  if (afterHover <= beforeHover) {
    throw new Error(`hover SFX not observed: ${beforeHover}->${afterHover}`);
  }

  await cdp.eval(
    `document.querySelector('[data-tamerian-sound]')?.click(); true`
  );
  await sleep(300);
  const mutedBefore = await cdp.eval(`window.__tmAudioProbe.oscillators`);
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: 1,
    y: 1,
  });
  await sleep(80);
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: hoverPoint.x,
    y: hoverPoint.y,
  });
  await sleep(250);
  const mutedAfter = await cdp.eval(`window.__tmAudioProbe.oscillators`);
  if (mutedAfter !== mutedBefore) {
    throw new Error(`mute failed: ${mutedBefore}->${mutedAfter}`);
  }

  const layout = await cdp.eval(`(() => ({
    broken: [...document.images]
      .filter(image => image.complete && image.naturalWidth === 0)
      .map(image => image.src),
    overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)
  }))()`);
  if (layout.broken.length) {
    throw new Error(`broken images: ${layout.broken.join(",")}`);
  }
  if (layout.overflow > 1) throw new Error(`overflow ${layout.overflow}px`);

  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.eval(
    `sessionStorage.removeItem('tamerian-intro-complete-v1'); location.reload(); true`
  );
  await sleep(1200);
  const reduced = await cdp.eval(`(() => ({
    media: matchMedia('(prefers-reduced-motion: reduce)').matches,
    remembered: sessionStorage.getItem('tamerian-intro-complete-v1'),
    sound: document.querySelector('[data-tamerian-sound]')?.dataset.tamerianSound,
    probe: window.__tmAudioProbe,
    overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)
  }))()`);
  if (
    !reduced.media ||
    reduced.remembered !== "true" ||
    reduced.sound !== "off" ||
    reduced.probe.contexts !== 0 ||
    reduced.probe.oscillators !== 0 ||
    reduced.overflow > 1
  ) {
    throw new Error(`reduced-motion failed: ${JSON.stringify(reduced)}`);
  }

  const report = {
    intro: { ...introProbe, rafAfter: introRafAfter },
    initial,
    enabled,
    hoverSfx: { before: beforeHover, after: afterHover },
    mutedSfx: { before: mutedBefore, after: mutedAfter },
    layout,
    reduced,
    failures: 0,
  };
  await fs.writeFile(
    "tamerian-experience-audit.json",
    JSON.stringify(report, null, 2)
  );
  console.log("TAMERIAN_EXPERIENCE_RUNTIME=PASS");
  console.log(JSON.stringify(report));
} finally {
  cdp.close();
}
