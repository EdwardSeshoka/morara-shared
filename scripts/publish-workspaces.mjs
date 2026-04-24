import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const packagesDir = join(rootDir, "packages");
const registry = "https://npm.pkg.github.com";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? rootDir,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe",
    env: process.env,
  });

  return result;
}

function packageVersionExists(packageName, version) {
  const result = run("npm", [
    "view",
    `${packageName}@${version}`,
    "version",
    "--registry",
    registry,
  ]);

  if (result.status === 0) {
    return true;
  }

  const output = `${result.stdout}\n${result.stderr}`;
  if (output.includes("E404") || output.includes("404 Not Found")) {
    return false;
  }

  process.stderr.write(output);
  throw new Error(`Unable to check published version for ${packageName}@${version}.`);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const workspaceDirs = readdirSync(packagesDir)
  .map((entry) => join(packagesDir, entry))
  .filter((path) => statSync(path).isDirectory());

let publishedCount = 0;
let skippedCount = 0;

for (const workspaceDir of workspaceDirs) {
  const packageJsonPath = join(workspaceDir, "package.json");
  const packageJson = readJson(packageJsonPath);
  const { name, version, private: isPrivate } = packageJson;

  if (isPrivate) {
    console.log(`Skipping private package ${name}.`);
    skippedCount += 1;
    continue;
  }

  if (packageVersionExists(name, version)) {
    console.log(`Skipping ${name}@${version}; it is already published.`);
    skippedCount += 1;
    continue;
  }

  console.log(`Publishing ${name}@${version}.`);
  const publish = run("npm", ["publish", "--registry", registry], {
    cwd: workspaceDir,
    stdio: "inherit",
  });

  if (publish.status !== 0) {
    throw new Error(`Publishing failed for ${name}@${version}.`);
  }

  publishedCount += 1;
}

console.log(
  `Workspace publish complete. Published ${publishedCount}; skipped ${skippedCount}.`,
);
