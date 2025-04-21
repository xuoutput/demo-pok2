import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export async function readPackageJson() {
  const packageJsonPath = path.resolve(__dirname, "../package.json");

  const packageJson = await fs.readJson(packageJsonPath);
  return packageJson;
}

// const templateDir = path.resolve(
//   fileURLToPath(import.meta.url),
//   "../..",
//   `template-${template}`
// );
// fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
// );