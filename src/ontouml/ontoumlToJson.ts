// src/ontouml/ontoumlToJson.ts

import fs from 'fs';
import path from 'path';
import { Project } from 'ontouml-js';

/**
 * Lê um arquivo JSON e transforma em um Project do ontouml-js
 * @param filePath Caminho para o arquivo JSON
 * @returns Instância de Project
 */
export function loadProjectFromJson(filePath: string): Project {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Arquivo não encontrado: ${absolutePath}`);
  }

  const rawData = fs.readFileSync(absolutePath, 'utf-8');

  let json: any;
  try {
    json = JSON.parse(rawData);
  } catch (err) {
    throw new Error(`Erro ao fazer parse do JSON: ${err}`);
  }

  try {
    return Project.from(json);
  } catch (err) {
    throw new Error(`Erro ao criar Project do ontouml-js: ${err}`);
  }
}
