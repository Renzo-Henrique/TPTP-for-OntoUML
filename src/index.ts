import path from 'path';
import { loadProjectFromJson, getAllClassNames } from './utils/ontoumlToJson';
import { generateTptpFromProject } from './utils/jsonToTptp';

async function main() {
  try {
    const file_path = '/home/renzohgl/projetos/npm-testes/TPTP-for-OntoUML/examples/json/customer.json';
    const modelPath = path.resolve(__dirname, file_path); // ajuste o caminho do seu JSON
    const project = loadProjectFromJson(modelPath);
    //console.log('Projeto OntoUML carregado com sucesso:');
    //console.log('Nome do projeto:', project.name);
    // Você pode fazer mais inspeções aqui, por exemplo, listar elementos do projeto
    //console.log(getAllClassNames(project));
    generateTptpFromProject(file_path,project);
  } catch (err) {
    console.error('Erro ao carregar o projeto:', err);
  }
}

main();
