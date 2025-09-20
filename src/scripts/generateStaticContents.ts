import * as fs from "fs";
import * as path from "path";

const projectSource = "../../"
const additionalsDir = path.resolve(__dirname, projectSource + "/ufoFormalizationInTPTP/axioms/additionals");
const ufoModulesDir = path.resolve(__dirname, projectSource + "/ufoFormalizationInTPTP/axioms/ufoModules");
const outputFile = path.resolve(__dirname, projectSource + "/src/scripts/staticContents.ts");

function sanitizeName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/^(\d)/, "_$1");
}

function generateConstants() {
  
  fs.writeFileSync(outputFile, "// AUTO-GENERATED FILE. DO NOT EDIT.\n\n", "utf-8");

  const exports: string[] = [];

  // --- Additionals: cada arquivo vira uma constante ---
  if (fs.existsSync(additionalsDir)) {
    const files = fs.readdirSync(additionalsDir);

    for (const file of files) {
      const filePath = path.join(additionalsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      const constName = sanitizeName(path.basename(file, path.extname(file)));

      exports.push(
        `export const ${constName} = ${JSON.stringify(content)};`
      );
    }
  }

  // --- UfoModules: todos os arquivos em uma constante só ---
  if (fs.existsSync(ufoModulesDir)) {
    const files = fs.readdirSync(ufoModulesDir);
    let combined = "";

    for (const file of files) {
      const filePath = path.join(ufoModulesDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      combined += content + "\n";
    }

    exports.push(
      `export const ufoModules = ${JSON.stringify(combined)};`
    );
  }

  // --- acrescenta o conteúdo no arquivo já criado ---
  fs.appendFileSync(outputFile, exports.join("\n\n") + "\n", "utf-8");

  console.log(`Generated ${outputFile}`);
}

generateConstants();
