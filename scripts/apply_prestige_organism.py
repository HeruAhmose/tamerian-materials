from pathlib import Path

path = Path('client/public/trai-organism-v5.js')
text = path.read_text(encoding='utf-8')

text = text.replace(
    ' * Six independent worlds, one shared navigation organism.\n',
    ' * Seven functional regions, one shared navigation organism and memory.\n'
)
text = text.replace('var VERSION = "5.3.0";', 'var VERSION = "5.5.0";')
text = text.replace(
    '<div class="trai-v5-head__kicker">TRAI Organism Protocol · Six Worlds</div>',
    '<div class="trai-v5-head__kicker">TRAI ORGANISM /// SEVEN REGIONS · SEVEN FUNCTIONS · ONE MEMORY</div>'
)

needle = '''    button.dataset.worldId = world.id;\n    button.dataset.current = String(world.id === SELF);\n    button.style.setProperty("--world-accent", world.accent || "#d6a33a");'''
replacement = '''    button.dataset.worldId = world.id;\n    button.dataset.current = String(world.id === SELF);\n    button.dataset.worldSkin = world.skin || "orbit";\n    button.dataset.worldKind = world.kind || "organ";\n    button.dataset.worldOrgan = world.organ || world.role || "orientation";\n    button.style.setProperty("--world-accent", world.accent || "#d6a33a");\n    button.style.setProperty("--world-secondary", world.secondary || "#7dd3fc");'''
assert needle in text
text = text.replace(needle, replacement, 1)

needle = '''    button.addEventListener("click", function () {\n      selectWorld(world.id);\n    });'''
replacement = '''    button.addEventListener("pointermove", function (event) {\n      var rect = button.getBoundingClientRect();\n      button.style.setProperty("--trai-v5-mx", ((event.clientX - rect.left) / rect.width * 100).toFixed(2) + "%");\n      button.style.setProperty("--trai-v5-my", ((event.clientY - rect.top) / rect.height * 100).toFixed(2) + "%");\n    });\n    button.addEventListener("pointerleave", function () {\n      button.style.removeProperty("--trai-v5-mx");\n      button.style.removeProperty("--trai-v5-my");\n    });\n    button.addEventListener("click", function () {\n      button.dataset.activating = "true";\n      window.setTimeout(function () { delete button.dataset.activating; }, 720);\n      selectWorld(world.id);\n    });'''
assert needle in text
text = text.replace(needle, replacement, 1)

needle = '''    state.selected = world;\n\n    state.dialog.querySelectorAll(".trai-v5-world").forEach(function (button) {'''
replacement = '''    state.selected = world;\n\n    var shell = state.dialog.querySelector(".trai-v5-shell");\n    if (shell) {\n      shell.dataset.prestige = "true";\n      shell.dataset.selectedWorld = world.id;\n      shell.dataset.selectedSkin = world.skin || "orbit";\n      shell.style.setProperty("--trai-v5-selected", world.accent || "#d6a33a");\n      shell.style.setProperty("--trai-v5-selected-secondary", world.secondary || "#7dd3fc");\n    }\n\n    state.dialog.querySelectorAll(".trai-v5-world").forEach(function (button) {'''
assert needle in text
text = text.replace(needle, replacement, 1)

old = '''    detail.innerHTML =\n      '<div class="trai-v5-detail__role">' +\n      escapeHtml(world.role || "TRAI world") +\n      "</div>" +\n      "<h3>" +\n      escapeHtml(world.name) +\n      "</h3>" +\n      '<p class="trai-v5-detail__thesis">' +\n      escapeHtml(world.thesis || "") +\n      "</p>" +\n      "<details open>" +\n      "<summary>Brief synopsis</summary>" +\n      "<p>" +\n      escapeHtml(world.synopsis || world.thesis || "") +\n      "</p>" +\n      "</details>" +\n      actions;'''
new = '''    var regionLabel = world.kind === "organ"\n      ? "REGION " + escapeHtml(world.index || "—") + " · " + escapeHtml(world.organ || "TRAI organ")\n      : escapeHtml(world.index || world.kind || "ORIENTATION");\n    var status = world.status\n      ? '<span class="trai-v5-detail__status">' + escapeHtml(world.status) + "</span>"\n      : "";\n    var functionLine = world.domain || world.role || "TRAI world";\n\n    detail.innerHTML =\n      '<div class="trai-v5-detail__instrument" aria-hidden="true"><i></i><i></i><i></i></div>' +\n      '<div class="trai-v5-detail__region">' + regionLabel + "</div>" +\n      '<div class="trai-v5-detail__role">' + escapeHtml(functionLine) + "</div>" +\n      "<h3>" + escapeHtml(world.name) + "</h3>" +\n      '<p class="trai-v5-detail__thesis">' + escapeHtml(world.thesis || "") + "</p>" +\n      '<div class="trai-v5-detail__memory"><span>SHARED MEMORY</span><p>' +\n      escapeHtml(world.transitionLine || "This region exchanges context with the wider TRAI organism.") +\n      "</p></div>" +\n      "<details open>" +\n      "<summary>Function briefing</summary>" +\n      "<p>" + escapeHtml(world.synopsis || world.thesis || "") + "</p>" +\n      "</details>" + status + actions;'''
assert old in text
text = text.replace(old, new, 1)

prestige_css = r'''

/* v5.5 prestige organism: seven functional regions, causal selection, shared memory. */
.trai-v5-shell[data-prestige="true"] {
  --trai-v5-selected: var(--trai-v5-current, #d6a33a);
  --trai-v5-selected-secondary: #7dd3fc;
  border-radius: 1.8rem;
  border-color: color-mix(in srgb, var(--trai-v5-selected) 34%, rgba(255,255,255,.08));
  background:
    radial-gradient(circle at 74% 28%, color-mix(in srgb, var(--trai-v5-selected-secondary) 10%, transparent), transparent 28%),
    radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--trai-v5-selected) 11%, transparent), transparent 34%),
    linear-gradient(145deg, rgba(7,11,17,.995), rgba(2,5,9,.995));
  box-shadow: 0 48px 150px rgba(0,0,0,.68), 0 0 90px color-mix(in srgb, var(--trai-v5-selected) 7%, transparent);
}
.trai-v5-shell[data-prestige="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(115deg, transparent 0 42%, color-mix(in srgb, var(--trai-v5-selected) 4%, transparent) 49%, transparent 57%),
    radial-gradient(circle at 78% 68%, color-mix(in srgb, var(--trai-v5-selected-secondary) 5%, transparent), transparent 30%);
  mix-blend-mode: screen;
}
.trai-v5-shell[data-prestige="true"] .trai-v5-head { padding: 1.45rem 1.55rem 1.1rem; }
.trai-v5-shell[data-prestige="true"] .trai-v5-head__kicker { font-size: .57rem; letter-spacing: .22em; }
.trai-v5-shell[data-prestige="true"] .trai-v5-body { gap: 1.25rem; padding: .35rem 1.5rem 1.5rem; }
.trai-v5-shell[data-prestige="true"] .trai-v5-worlds { gap: .8rem; }
.trai-v5-shell[data-prestige="true"] .trai-v5-world {
  --trai-v5-mx: 72%;
  --trai-v5-my: 26%;
  min-height: 9rem;
  padding: 1rem 1rem 1.05rem;
  border-radius: 1.35rem;
  transform-style: preserve-3d;
  background:
    radial-gradient(circle at var(--trai-v5-mx) var(--trai-v5-my), color-mix(in srgb, var(--world-accent) 14%, transparent), transparent 31%),
    linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
  box-shadow: inset 0 1px rgba(255,255,255,.035), 0 14px 30px rgba(0,0,0,.18);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world::before {
  width: 10rem;
  height: 10rem;
  right: -3rem;
  bottom: -4rem;
  opacity: .16;
  filter: blur(9px);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .48;
  transition: opacity .3s ease, transform .5s cubic-bezier(.16,1,.3,1);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="tamerian"]::after {
  background: repeating-linear-gradient(60deg, transparent 0 18px, color-mix(in srgb,var(--world-accent) 12%,transparent) 19px 20px, transparent 21px 39px);
  clip-path: polygon(48% 5%, 95% 32%, 84% 86%, 26% 96%, 4% 43%);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="bluegold"]::after {
  background: radial-gradient(circle at 72% 34%, color-mix(in srgb,var(--world-accent) 42%,transparent) 0 2px, transparent 3px) 0 0/19px 19px;
  mask-image: radial-gradient(circle at 72% 36%, black, transparent 64%);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="califia"]::after {
  background: repeating-radial-gradient(circle at 76% 38%, transparent 0 13px, color-mix(in srgb,var(--world-accent) 18%,transparent) 14px 15px, transparent 16px 28px);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="mela"]::after {
  background: linear-gradient(128deg, transparent 0 42%, color-mix(in srgb,var(--world-accent) 30%,transparent) 43% 44%, transparent 45% 54%, color-mix(in srgb,var(--world-secondary) 22%,transparent) 55% 56%, transparent 57%);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="melanina"]::after {
  background: repeating-linear-gradient(135deg, transparent 0 7px, color-mix(in srgb,var(--world-accent) 16%,transparent) 8px 9px, transparent 10px 17px), repeating-linear-gradient(45deg, transparent 0 13px, color-mix(in srgb,var(--world-secondary) 8%,transparent) 14px 15px, transparent 16px 27px);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="techbridge"]::after {
  background: linear-gradient(180deg, transparent 58%, color-mix(in srgb,var(--world-accent) 30%,transparent) 59% 60%, transparent 61%), linear-gradient(32deg, transparent 46%, color-mix(in srgb,var(--world-secondary) 20%,transparent) 47% 48%, transparent 49%);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="foundation"]::after,
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="peoples"]::after {
  background: repeating-linear-gradient(82deg, transparent 0 21px, color-mix(in srgb,var(--world-accent) 16%,transparent) 22px 23px, transparent 24px 43px);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-world-id="trai"]::after {
  background: repeating-radial-gradient(ellipse at 72% 36%, transparent 0 15px, color-mix(in srgb,var(--world-accent) 16%,transparent) 16px 17px, transparent 18px 32px);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world:hover {
  transform: perspective(700px) translateY(-4px) rotateX(1.2deg) scale(1.012);
  box-shadow: 0 24px 48px rgba(0,0,0,.3), 0 0 42px color-mix(in srgb,var(--world-accent) 14%,transparent);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world:hover::after,
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-selected="true"]::after { opacity: .82; transform: scale(1.035); }
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-selected="true"] {
  transform: perspective(700px) translateY(-4px) scale(1.018);
  border-color: color-mix(in srgb,var(--world-accent) 68%,transparent);
  box-shadow: 0 28px 58px rgba(0,0,0,.34), inset 0 0 34px color-mix(in srgb,var(--world-accent) 5%,transparent), 0 0 52px color-mix(in srgb,var(--world-accent) 16%,transparent);
}
.trai-v5-shell[data-prestige="true"] .trai-v5-world[data-activating="true"] { animation: trai-v5-region-activation .7s cubic-bezier(.16,1,.3,1) both; }
.trai-v5-shell[data-prestige="true"] .trai-v5-world__index { margin-bottom: .8rem; font-size: .55rem; letter-spacing: .2em; }
.trai-v5-shell[data-prestige="true"] .trai-v5-world strong { max-width: 78%; font: 650 1.05rem/1.05 ui-serif, Georgia, serif; letter-spacing: -.02em; }
.trai-v5-shell[data-prestige="true"] .trai-v5-world span:last-child { max-width: 80%; margin-top: .55rem; font-size: .69rem; line-height: 1.38; }
.trai-v5-shell[data-prestige="true"] .trai-v5-detail {
  min-height: 26rem;
  padding: 1.35rem;
  border-radius: 1.4rem;
  overflow: hidden;
  background: radial-gradient(circle at 100% 0%, color-mix(in srgb,var(--detail-accent) 17%,transparent), transparent 36%), linear-gradient(155deg,rgba(255,255,255,.032),rgba(255,255,255,.012));
  box-shadow: inset 0 1px rgba(255,255,255,.04), 0 18px 55px rgba(0,0,0,.2);
}
.trai-v5-detail__instrument { display:flex; gap:.34rem; margin-bottom:1rem; }
.trai-v5-detail__instrument i { width:.36rem; height:.36rem; border-radius:50%; background:var(--detail-accent); box-shadow:0 0 12px var(--detail-accent); opacity:.45; }
.trai-v5-detail__instrument i:nth-child(2){opacity:.72}.trai-v5-detail__instrument i:nth-child(3){opacity:1}
.trai-v5-detail__region { color:rgba(244,237,224,.42); font:700 .55rem/1.2 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.2em; text-transform:uppercase; }
.trai-v5-shell[data-prestige="true"] .trai-v5-detail__role { margin-top:.4rem; font-size:.6rem; letter-spacing:.19em; }
.trai-v5-shell[data-prestige="true"] .trai-v5-detail h3 { margin:.7rem 0 .45rem; font-size:clamp(1.65rem,2.8vw,2.35rem); }
.trai-v5-shell[data-prestige="true"] .trai-v5-detail__thesis { font-size:.9rem; line-height:1.62; }
.trai-v5-detail__memory { margin:1rem 0; padding:.9rem 1rem; border-left:2px solid color-mix(in srgb,var(--detail-accent) 58%,transparent); background:linear-gradient(90deg,color-mix(in srgb,var(--detail-accent) 7%,transparent),transparent); }
.trai-v5-detail__memory span { color:var(--detail-accent); font:700 .52rem/1.2 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.2em; }
.trai-v5-detail__memory p { margin:.42rem 0 0; color:rgba(244,237,224,.58); font-size:.75rem; line-height:1.48; }
.trai-v5-detail__status { display:inline-flex; margin-top:.85rem; padding:.36rem .55rem; border:1px solid color-mix(in srgb,var(--detail-accent) 24%,transparent); border-radius:999px; color:rgba(244,237,224,.58); background:rgba(255,255,255,.025); font:650 .52rem/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.1em; text-transform:uppercase; }
@keyframes trai-v5-region-activation {
  0% { filter:brightness(1); transform:translateY(-3px) scale(1); }
  34% { filter:brightness(1.45); transform:translateY(-5px) scale(1.025); }
  100% { filter:brightness(1); transform:translateY(-4px) scale(1.018); }
}
'''
marker = '@media (max-width: 760px) {'
assert marker in text
text = text.replace(marker, prestige_css + '\n' + marker, 1)

path.write_text(text, encoding='utf-8')
print('TAMERIAN_PRESTIGE_ORGANISM_PATCH=PASS')
