#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/publish-preview.mjs <slug>');
  process.exit(1);
}

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, 'previews', slug, 'dist');
const destDir = path.join(repoRoot, 'sites', 'preview-hub', 'public', 'p', slug);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function emptyDir(p) {
  if (!fs.existsSync(p)) return;
  for (const entry of fs.readdirSync(p)) {
    fs.rmSync(path.join(p, entry), { recursive: true, force: true });
  }
}

function copyDir(from, to) {
  ensureDir(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

if (!fs.existsSync(srcDir)) {
  console.error(`Missing build output: ${srcDir}`);
  console.error('Put your static build output into previews/<slug>/dist/ first.');
  process.exit(1);
}

ensureDir(destDir);
emptyDir(destDir);
copyDir(srcDir, destDir);

const indexHtml = path.join(destDir, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.warn('Warning: index.html not found in destination. Is this a static build?');
}

console.log(`Published preview: /p/${slug}/`);
console.log(`Copied: ${srcDir} -> ${destDir}`);
