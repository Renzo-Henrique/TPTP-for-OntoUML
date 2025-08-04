import fs from 'fs';
import path from 'path';
import { Project, serializationUtils} from 'ontouml-js';
import {camelCase} from 'lodash';


export function loadProjectFromJson(filePath: string): Project {

    var modelPath = path.resolve(__dirname, filePath); // ajuste o caminho do seu JSON
    const absolutePath = path.resolve(modelPath);

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

export function checkEmptyForError(elements: any[], errorMessage: string): void{

  if(elements.length === 0) {
    console.error(errorMessage);
    process.exit(1);
  }
}

export function refactorNames(project: Project): void {
  const classes = project.getAllClasses();

  for (const cls of classes) {
    const original = cls.getName();

    if (!original) continue;

    const camel = camelCase(original);
    const newName = `cl_${camel}`;
    cls.setName(newName);
  }
}

export function printAllClasses(project: Project): void{
    const consoleOutput = project.model.getAllClasses()
    .map(content => `${content.getName()} :: ${content.stereotype}`)
    .join('\n');

    console.log(consoleOutput);
}