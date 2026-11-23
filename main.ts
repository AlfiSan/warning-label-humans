// Warning Label for Humans: One Line, Big Laugh
//
// The whole entry is one line of comedy: the safety warning that should
// come printed on every human being. The program below does a deliberately
// small job — it holds that one line, checks it against the bounty's own
// limits, and writes it out as plain text for the judge to read.
//
// Why this line: everybody knows someone who says "I'm five minutes away"
// while nowhere near leaving. The joke is recognition, not absurdity —
// the label stays plausible because the scene is ordinary, and the laugh
// lands in the last few words, when the excuse quietly falls apart.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label itself. One sentence, one idea, no second joke hiding in it.
const LABEL =
  'WARNING: This human says "I\'m five minutes away" while still in bed, ' +
  "in a towel, with wet hair, and no idea where their keys are.";

// Where the harness expects the finished text.
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The gate the sealed scorer applies: UTF-8 text, 1 to 160 characters,
// more than whitespace. Refuse to write anything that would fail it.
const MAX_CHARS = 160;

function checkLabel(text: string): void {
  if (text.length === 0) {
    throw new Error("label is empty");
  }
  if (text.trim().length === 0) {
    throw new Error("label is only whitespace");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `label is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("label must stay on a single line");
  }
}

function main(): void {
  checkLabel(LABEL);
  mkdirSync(OUT_DIR, { recursive: true });
  // Write exactly the line, no trailing newline: the file is the entry.
  writeFileSync(OUT_FILE, LABEL, "utf8");
  console.log(`wrote ${LABEL.length} characters to ${OUT_FILE}`);
}

main();
