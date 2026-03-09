#!/usr/bin/env node

import { appendFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();
const rootPackagePath = join(cwd, 'package.json');
const packagesDir = join(cwd, 'packages');

const semverPattern =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

const rootPackage = readJson(rootPackagePath);
const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const workspacePackages = packageDirs.map((dir) => {
  const path = join(packagesDir, dir, 'package.json');
  const pkg = readJson(path);

  if (!pkg.name || !pkg.version) {
    throw new Error(`Missing name/version in ${path}`);
  }

  return {
    name: pkg.name,
    version: pkg.version,
    path: `packages/${dir}/package.json`
  };
});

const versions = new Map();
versions.set('root/package.json', rootPackage.version);
for (const pkg of workspacePackages) {
  versions.set(pkg.path, pkg.version);
}

for (const [path, version] of versions.entries()) {
  if (!semverPattern.test(version)) {
    throw new Error(`Invalid semver in ${path}: ${version}`);
  }
}

const uniqueVersions = [...new Set(versions.values())];
if (uniqueVersions.length !== 1) {
  const details = [...versions.entries()]
    .map(([path, version]) => `${path} => ${version}`)
    .join('\n');
  throw new Error(`Version mismatch detected across workspace:\n${details}`);
}

const releaseVersion = uniqueVersions[0];
const releaseTag = `v${releaseVersion}`;
const packageNames = workspacePackages.map((pkg) => pkg.name);

const args = process.argv.slice(2);
const isPrintOnly = args.includes('--print');
const githubOutputIndex = args.indexOf('--github-output');
const githubOutputPath = githubOutputIndex >= 0 ? args[githubOutputIndex + 1] : undefined;

if (githubOutputIndex >= 0 && !githubOutputPath) {
  throw new Error('Missing value for --github-output');
}

if (githubOutputPath) {
  appendFileSync(githubOutputPath, `release_version=${releaseVersion}\n`);
  appendFileSync(githubOutputPath, `release_tag=${releaseTag}\n`);
  appendFileSync(githubOutputPath, `package_names=${packageNames.join(',')}\n`);
}

if (isPrintOnly || !githubOutputPath) {
  process.stdout.write(`${releaseVersion}\n`);
}
