// Cancelief — the hand-in program for the make.fun "Invent a Word We Need" bounty.
//
// The entry is one coined English word plus a one-line definition, written to
// /output/entry.txt. The sealed gate only accepts UTF-8 text of 1 to 140
// characters, so the program is deliberately tiny and deterministic: no clock,
// no randomness, no network, no model calls, no files read from outside the
// repository. The same input always produces the same byte-for-byte output.
//
// The coinage: "cancelief" (cancel + relief).
//   - Fresh: a web search finds no prior use of the word as a noun for this
//     feeling (only the separate words "cancel" and "relief" turn up).
//   - A real gap: English has no single word for the quiet joy of a plan
//     being cancelled — a feeling almost everyone recognises at once.
//   - Well formed: cancel + relief share their middle sound, so the blend
//     reads and sounds like a word English could have grown on its own:
//     CAN-suh-leef, easy to say, spell and remember.
//   - The definition lands in one reading, with no second sentence and no
//     example needed.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  'Cancelief (n.) — the quiet joy of a plan being cancelled.';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), ENTRY, 'utf8');

// Self-check against the sealed gate, so a bad entry fails loudly here
// instead of silently on the server: UTF-8 text, 1 to 140 characters,
// and more than whitespace.
if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.trim().length === 0) {
  throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
}
console.log(`wrote ${ENTRY.length} characters to ${join(out, 'entry.txt')}`);
