#!/usr/bin/env node
/**
 * macos_contacts_lookup.mjs
 *
 * Usage:
 *   node scripts/macos_contacts_lookup.mjs "carolita"
 *
 * Outputs JSON array to stdout:
 *   [{ name, numberRaw, number, label }]
 *
 * Notes:
 * - Requires macOS Contacts access (may prompt).
 * - "number" is lightly normalized (spaces/dashes removed). It is NOT guaranteed E.164.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const query = process.argv.slice(2).join(' ').trim();
if (!query) {
  console.error('Missing query. Example: node scripts/macos_contacts_lookup.mjs "carolita"');
  process.exit(2);
}

function normalizeNumber(s) {
  if (!s) return s;
  // Keep leading + if present; remove everything else that isn't digit.
  const trimmed = String(s).trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/[^0-9]/g, '');
  return hasPlus ? `+${digits}` : digits;
}

// AppleScript: find people whose name contains query (case-insensitive behavior is locale-dependent).
// For each phone number, emit a tab-separated line:
//   name<TAB>label<TAB>value
const appleScript = `
on run argv
  set q to item 1 of argv
  tell application "Contacts"
    set out to ""
    set matches to every person whose name contains q
    repeat with p in matches
      set personName to name of p
      repeat with ph in phones of p
        set phLabel to label of ph
        set phValue to value of ph
        set out to out & personName & tab & phLabel & tab & phValue & linefeed
      end repeat
    end repeat
    return out
  end tell
end run
`;

let stdout = '';
try {
  const res = await execFileAsync('osascript', ['-e', appleScript, query], { maxBuffer: 10 * 1024 * 1024 });
  stdout = res.stdout ?? '';
} catch (err) {
  // If Contacts access is denied, osascript exits non-zero.
  console.error(String(err?.stderr || err?.message || err));
  process.exit(1);
}

const lines = stdout
  .split('\n')
  .map(l => l.trimEnd())
  .filter(Boolean);

const results = [];
for (const line of lines) {
  const [name, label, numberRaw] = line.split('\t');
  if (!name || !numberRaw) continue;
  results.push({
    name,
    label: label || null,
    numberRaw,
    number: normalizeNumber(numberRaw),
  });
}

process.stdout.write(JSON.stringify(results, null, 2));
