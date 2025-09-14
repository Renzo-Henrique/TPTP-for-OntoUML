import fs from 'fs';
import path from 'path';
import { Project, serializationUtils} from 'ontouml-js';
import {camelCase} from 'lodash';

export const outpurDirName = 'generated'

let idCounterProject = 0;
/**
 * Generates a unique id for things without name
 *
 * @returns A unique string identifier for an axiom (e.g., "id_0_ax_").
 */
export function getNextProjectId(): string {
  return `${idCounterProject++}`;
}

/**
 * Resets the internal axiom ID counter to zero.
 * 
 * Useful for test cases or when regenerating axioms from scratch.
 */
export function resetProjectId() {
  idCounterProject = 0;
}


/**
 * Loads an OntoUML Project instance from a JSON file.
 *
 * @param filePath - The path to the JSON file.
 * @throws Throws an error if the file does not exist or cannot be parsed.
 * @returns The deserialized OntoUML Project.
 */
export function loadProjectFromJson(filePath: string): Project {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found: ${absolutePath}`);
    }
    let data: any;
    try {
        data = fs.readFileSync(absolutePath, { encoding: "utf8" });
    } catch (err) {
        throw new Error(`Error while trying to read JSON file: ${err}`);
    }
    try {
        // Use parse instead of fromJSON
        return serializationUtils.parse(data, true) as Project;
    } catch (err) {
        throw new Error(`Error while trying to create ontouml-js Project: ${err}`);
    }
}

/**
 * Recursively find all .json files inside a directory and its subdirectories.
 */
export function findJsonFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return findJsonFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      return [fullPath];
    }

    return [];
  });

  return files;
}

/**
 * Checks if an array is empty, logs an error message, and exits the process if it is.
 *
 * @param elements - The array to check.
 * @param errorMessage - The error message to log if the array is empty.
 */
export function checkEmptyForError(elements: any[], errorMessage: string): void{

  if(elements.length === 0) {
    console.error(errorMessage);
    process.exit(1);
  }
}

/**
 * Refactors class names in a project by converting them to camelCase
 * and prefixing with "cl_".
 *
 * @param project - The OntoUML project whose class names will be refactored.
 */
export function fixProjectNames(project: Project): void {

  function fixSymbols(original: string): string{
    return original.replace(/[{:}, ]/g, "_");
  }
  function getDefaultName(sufix: string): string{
    return `default_name_${getNextProjectId()}_${sufix}`;
  }
  function fixName(name: string, sufixForDefault: string): string{
    if (name == null){
      return getDefaultName(sufixForDefault);
    }
    else{
      return fixSymbols(name);
    }
  }

  
  project.getAllClasses().forEach(content =>
    content.setName(fixName(content.getName(), 'class'))
  );
  project.getAllGeneralizationSets().forEach(content =>
    content.setName(fixName(content.getName(), 'generalizationSet'))
  );
  project.getAllGeneralizations().forEach(content =>
    content.setName(fixName(content.getName(), 'generalization'))
  );
  project.getAllRelations().forEach(content =>
    content.setName(fixName(content.getName(), 'association'))
  );

}

/**
 * Refactors class names in a project by converting them to camelCase
 * and prefixing with "cl_".
 *
 * @param project - The OntoUML project whose class names will be refactored.
 */
export function refactorNames(project: Project): void {
  const classes = project.getAllClasses();

  for (const cls of classes) {
    const original = cls.getName();

    if (!original) continue;
    // substitui { e : por _
    const sanitized = original.replace(/[{:}]/g, "_");

    const camel = camelCase(sanitized);
    const newName = `cl_${camel}`;
    cls.setName(newName);
  }

  for (const genSets of project.getAllGeneralizationSets()) {
    const original = genSets.getName();

    if (!original) continue;
    // substitui { e : por _
    const sanitized = original.replace(/[{:}]/g, "_");

    const camel = camelCase(sanitized);
    const newName = `cl_${camel}`;
    genSets.setName(newName);
  }

  for (const gens of project.getAllGeneralizations()) {
    const original = gens.getName();

    if (!original) continue;
    // substitui { e : por _
    const sanitized = original.replace(/[{:}]/g, "_");

    const camel = camelCase(sanitized);
    const newName = `cl_${camel}`;
    gens.setName(newName);
  }
}

/**
 * Prints all classes in the project with their stereotypes to the console.
 *
 * @param project - The OntoUML project whose classes will be printed.
 */
export function printAllClasses(project: Project): void{
    const consoleOutput = project.model.getAllClasses()
    .map(content => `${content.getName()} :: ${content.stereotype}`)
    .join('\n');

    console.log(consoleOutput);
}