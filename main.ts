// One Line, One Chill — make.fun entry
// Writes a single sentence of horror (under 200 characters) to /output/entry.txt.
// The line: a child's drawing of the family holds one figure too many, and that
// figure moves closer to her bed every night. Concrete, specific, and the dread
// lands on the last words — no gore, no setup, just the count that will not add up.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My daughter\u2019s drawing of our family has five figures, and we are four \u2014 the fifth keeps moving closer to her bed each night.";

const MAX_CHARS = 200;
const OUTPUT_PATH = join("/output", "entry.txt");

function validate(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`Entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
  // One sentence: exactly one sentence-ending mark, at the very end.
  const endings = (line.match(/[.!?]/g) ?? []).length;
  if (endings !== 1 || !line.endsWith(".")) {
    throw new Error("Entry must be exactly one sentence ending with a period");
  }
}

function main(): void {
  const line = ENTRY.trim();
  validate(line);

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");

  // Read-back round-trip check: what landed on disk must be the line we wrote.
  const written = readFileSync(OUTPUT_PATH, "utf8").trim();
  if (written !== line) {
    throw new Error("Read-back mismatch: /output/entry.txt does not hold the entry line");
  }
  console.log(`Wrote ${line.length} characters to /output/entry.txt (read-back verified)`);
}

main();
