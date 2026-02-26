const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONFLICT_PATTERNS = ["<<<<<<<", "=======", ">>>>>>>"];

function scanDir(dir) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);

    if (
      entry === "node_modules" ||
      entry === ".next" ||
      entry === ".git"
    ) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      const content = fs.readFileSync(fullPath, "utf8");

      for (const pattern of CONFLICT_PATTERNS) {
        if (content.includes(pattern)) {
          console.error(
            `❌ Merge conflict marker detected in: ${fullPath}`
          );
          process.exit(1);
        }
      }
    }
  }
}

scanDir(ROOT);
console.log("✅ No merge conflict markers detected.");
process.exit(0);
