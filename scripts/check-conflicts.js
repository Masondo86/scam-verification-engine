const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CONFLICT_MARKER_RE = /^(<{7}|={7}|>{7})(?:\s|$)/;

function scanDir(dir) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);

    if (entry === 'node_modules' || entry === '.next' || entry === '.git') {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      if (CONFLICT_MARKER_RE.test(line)) {
        console.error(`❌ Merge conflict marker detected in: ${fullPath}`);
        process.exit(1);
      }
    }
  }
}

scanDir(ROOT);
console.log('✅ No merge conflict markers detected.');
process.exit(0);
