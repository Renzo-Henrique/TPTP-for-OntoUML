import path from 'path';
import { loadProjectFromJson } from './ontouml/ontoumlToJson';

async function main() {
  try {
    const modelPath = path.resolve(__dirname, '/home/renzohgl/projetos/npm-testes/TPTP-for-OntoUML/examples/original/personSimplified.json'); // ajuste o caminho do seu JSON
    const project = loadProjectFromJson(modelPath);
    console.log('Projeto OntoUML carregado com sucesso:');
    console.log('Nome do projeto:', project.name);
    // Você pode fazer mais inspeções aqui, por exemplo, listar elementos do projeto
  } catch (err) {
    console.error('Erro ao carregar o projeto:', err);
  }
}

main();
