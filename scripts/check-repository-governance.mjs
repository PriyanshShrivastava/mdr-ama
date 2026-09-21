import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const matrixPath = join(root, "docs/testing/MATRIX.md");
const required = [
  "AGENTS.md",
  "CHANGELOG.md",
  "PROGRESS.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/workflows/ci.yml",
  "docs/architecture/README.md",
  "docs/modules/session-creation/PROGRESS.md",
  "docs/modules/payer-flow/PROGRESS.md",
  "docs/modules/account-history/PROGRESS.md",
  "docs/modules/platform-delivery/PROGRESS.md",
];

const missingRequired = required.filter((path) => !existsSync(join(root, path)));
if (!existsSync(matrixPath)) missingRequired.push("docs/testing/MATRIX.md");

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const matrix = existsSync(matrixPath) ? readFileSync(matrixPath, "utf8") : "";
const sourceFiles = walk(join(root, "src"))
  .map((path) => relative(root, path))
  .filter((path) => /\.(ts|tsx)$/.test(path))
  .filter((path) => !/\.test\.(ts|tsx)$/.test(path) && path !== "src/test/setup.ts");
const unregistered = sourceFiles.filter((path) => !matrix.includes(`\`${path}\``));

if (missingRequired.length || unregistered.length) {
  if (missingRequired.length) console.error(`Missing governance files:\n- ${missingRequired.join("\n- ")}`);
  if (unregistered.length) console.error(`Source files missing from docs/testing/MATRIX.md:\n- ${unregistered.join("\n- ")}`);
  process.exit(1);
}

console.log(`Repository governance check passed for ${sourceFiles.length} source files.`);
