import fs from "node:fs/promises";
import path from "node:path";

const outputDir = path.join(process.cwd(), ".output", "netlify");
const redirectsPath = path.join(outputDir, "_redirects");

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(
  redirectsPath,
  "/* /.netlify/functions/server 200\n",
  "utf8",
);
