import fs from "node:fs/promises";
import path from "node:path";

const appDir = process.cwd();
const outputDir = path.join(appDir, ".output", "netlify");
const publicDir = path.join(appDir, "public");
const runtimeClientDir = path.join(
  appDir,
  ".adaptive-nitro",
  "netlify",
  "runtime",
  "client",
);

await fs.mkdir(outputDir, { recursive: true });
await copyDirContents(publicDir, outputDir, { skip: new Set(["_redirects"]) });
await fs.mkdir(path.join(outputDir, "_adaptive"), { recursive: true });
await fs.cp(runtimeClientDir, path.join(outputDir, "_adaptive"), {
  recursive: true,
});
await fs.writeFile(
  path.join(outputDir, "_redirects"),
  "/* /.netlify/functions/main 200!\n",
  "utf8",
);

async function copyDirContents(fromDir, toDir, options = {}) {
  try {
    const entries = await fs.readdir(fromDir, { withFileTypes: true });

    for (const entry of entries) {
      if (options.skip?.has(entry.name)) {
        continue;
      }

      const sourcePath = path.join(fromDir, entry.name);
      const targetPath = path.join(toDir, entry.name);

      if (entry.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true });
        await copyDirContents(sourcePath, targetPath, options);
      } else {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }
    throw error;
  }
}
