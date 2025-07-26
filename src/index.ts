// src/index.ts
import { loadProjectFromJson } from './ontouml/ontoumlToJson';

const projectPath = './examples/mymodel.json'; // atualize com o caminho correto

try {
  const project = loadProjectFromJson(projectPath);
  console.log('Modelo carregado com sucesso:', project.name);
} catch (err) {
  console.error('Erro ao carregar o modelo:', err);
}
