import fs from 'fs';
import path from 'path';
//import { Project } from 'ontouml-js';
import { Project, serializationUtils} from 'ontouml-js';
//import * as Ontouml from 'ontouml-js';

export function loadProjectFromJson(filePath: string): Project {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Arquivo não encontrado: ${absolutePath}`);
  }

  //console.log(Object.getOwnPropertyNames(Ontouml));
  //console.log(Ontouml.serializationUtils); // deve mostrar undefined ou o objeto


  //const data = fs.readFileSync(absolutePath, 'utf-8');

  //const data = fs.readFileSync(opts.fileName, { encoding: "utf8" });

  //const project: Project = serializationUtils.parse(data, true) as Project;
  
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
