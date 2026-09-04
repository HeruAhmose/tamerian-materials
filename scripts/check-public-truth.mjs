import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const withDist = process.argv.includes("--dist");

const sourceFiles = [
  "client/index.html",
  "client/src/components/CinematicIntro.tsx",
  "client/src/components/ResearchProgress.tsx",
  "client/src/components/TechModal.tsx",
  "client/src/lib/data.ts",
  "client/src/pages/Home.tsx",
  "client/public/trai-organism-v5.json",
  "README.md",
];

const assets = [
  "hero-material-architecture.svg",
  "hemp-carbon-matrix.svg",
  "crystalline-phases.svg",
  "energy-harvesting-concept.svg",
  "quantum-sensing-hypothesis.svg",
];

const required = [
  "Bio-derived multifunctional composites for self-powered sensing",
  "Integrated performance remains to be experimentally validated.",
  "Illustrative · Not measured data",
  "Room-Temperature Coherence Hypothesis",
  "they do not validate the integrated Tamerian composite",
  "Skip intro",
  "Click or press → to advance",
  "Operating under §508(c)(1)(A) · no IRS determination represented",
  "https://heruahmose.github.io/QueenCalifia-CyberAI/",
];

const forbidden = [
  "d2xsxph8kpxj0f.cloudfront.net",
  "validated across 51 peer-reviewed papers",
  "Every Tamerian composite starts carbon-negative",
  "entirely self-powered",
  "MATERIAL ATLAS /// LIVE PHASE MAP",
  "Hover chart data points for exact values.",
  "5–10× Bi₂Te₃",
  "12% magnetite optimized vs Bi₂Te₃ reference",
  "https://queencalifia-cyberai.web.app/",
  "EIN obtained · exemption pending",
];

function read(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path))
    throw new Error(`Missing governed file: ${relativePath}`);
  return readFileSync(path, "utf8");
}

function collectText(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return collectText(path);
    return /\.(?:css|html|js|json|svg)$/.test(name)
      ? [readFileSync(path, "utf8")]
      : [];
  });
}

const source = sourceFiles.map(read).join("\n");
const normalize = value => value.replace(/\s+/g, " ");
const normalizedSource = normalize(source);

for (const phrase of required) {
  if (!normalizedSource.includes(normalize(phrase)))
    throw new Error(`Required public truth missing: ${phrase}`);
}

for (const phrase of forbidden) {
  if (normalizedSource.includes(normalize(phrase)))
    throw new Error(`Retired or overbounded public claim remains: ${phrase}`);
}

for (const asset of assets) {
  const relativePath = `client/public/images/tamerian/${asset}`;
  const path = join(root, relativePath);
  if (!existsSync(path) || statSync(path).size < 1_000) {
    throw new Error(
      `First-party visual missing or unexpectedly small: ${relativePath}`
    );
  }
}

const organism = JSON.parse(read("client/public/trai-organism-v5.json"));
const califia = organism.worlds.find(world => world.id === "califia");
const foundation = organism.worlds.find(world => world.id === "foundation");
if (califia?.url !== "https://heruahmose.github.io/QueenCalifia-CyberAI/") {
  throw new Error("Queen Califia registry URL is not canonical.");
}
if (!foundation?.status?.includes("no IRS determination represented")) {
  throw new Error(
    "Foundation registry status overstates its public operating position."
  );
}

if (withDist) {
  const distRoot = join(root, "dist/public");
  if (!existsSync(distRoot))
    throw new Error("dist/public is missing; build before --dist validation.");
  const built = collectText(distRoot).join("\n");
  const normalizedBuilt = normalize(built);

  for (const phrase of required) {
    if (!normalizedBuilt.includes(normalize(phrase)))
      throw new Error(`Built public truth missing: ${phrase}`);
  }
  for (const phrase of forbidden) {
    if (normalizedBuilt.includes(normalize(phrase)))
      throw new Error(`Built artifact contains retired claim: ${phrase}`);
  }
  if (built.includes("data-loc")) {
    throw new Error(
      "Development JSX source-location metadata leaked into production."
    );
  }
  for (const asset of assets) {
    const path = join(distRoot, "images/tamerian", asset);
    if (!existsSync(path) || statSync(path).size < 1_000) {
      throw new Error(
        `Built first-party visual missing or unexpectedly small: ${asset}`
      );
    }
  }
}

console.log(
  `public truth gate: ${sourceFiles.length} governed files and ${assets.length} first-party visuals clean${withDist ? "; built artifact clean" : ""}.`
);
