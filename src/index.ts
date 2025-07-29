import path from 'path';
import { loadProjectFromJson, getAllClassNames } from './utils/ontoumlToJson';
import { generateTptpFromProject } from './utils/jsonToTptp';

async function main() {
  try {
    var file_path = '/home/renzohgl/projetos/npm-testes/TPTP-for-OntoUML/examples/json/customer.json';
    var modelPath = path.resolve(__dirname, file_path); // ajuste o caminho do seu JSON
    var project = loadProjectFromJson(modelPath);
    generateTptpFromProject(file_path,project);

    file_path = '/home/renzohgl/projetos/npm-testes/TPTP-for-OntoUML/examples/json/personSimplified.json';
    modelPath = path.resolve(__dirname, file_path); // ajuste o caminho do seu JSON
    project = loadProjectFromJson(modelPath);
    generateTptpFromProject(file_path,project);
  } catch (err) {
    console.error('Erro ao carregar o projeto:', err);
  }
}

main();
