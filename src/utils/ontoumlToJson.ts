import fs from 'fs';
import path from 'path';
//import { Project } from 'ontouml-js';
import { Project, serializationUtils} from 'ontouml-js';
//import * as Ontouml from 'ontouml-js';

const excludedNames = [
  'number',
  'string',
  'boolean',
  'date',
  'time',
  'datetime',
  'undefined'
];

export function loadProjectFromJson(filePath: string): Project {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Arquivo não encontrado: ${absolutePath}`);
  }
  let data: any;
  try {
    data = fs.readFileSync(absolutePath, { encoding: "utf8" });
  } catch (err) {
    throw new Error(`Erro ao ler arquivo JSON: ${err}`);
  }
  
  try {
    // Use fromJSON em vez de from
    return serializationUtils.parse(data, true) as Project;
    //return Project.fromJSON(json);
  } catch (err) {
    throw new Error(`Erro ao criar Project do ontouml-js: ${err}`);
  }
}

export function getAllClassNames(project: Project): string[] {
  const classes = project.getAllClasses();

  const classNames = classes
    .map((c) => c.getName().toLowerCase())
    .filter((name) => !excludedNames.includes(name.toLowerCase()));

  return classNames;
}
