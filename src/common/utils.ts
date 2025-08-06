import fs from 'fs';
import path from 'path';
import { Project, serializationUtils} from 'ontouml-js';
import {camelCase} from 'lodash';

export const outpurDirName = 'outputGenerated'


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

/**
 * Searches for duplicated TPTP axiom identifiers in a list of axiom lines.
 *
 * It looks for patterns of the form `fof(ax_something, ...)` and reports any repeated `ax_something`.
 *
 * @param lines - Array of strings representing TPTP axioms.
 * @returns An array of duplicated identifiers (e.g., `ax_rigid_sortal_ex`).
 */
export function findDuplicateFofIdentifiers(lines: string[]): string[] {
  const regex = /fof\(ax_([^,]+),/g;
  const countMap = new Map<string, number>();
  let totalMatches = 0;

  for (const line of lines) {
    const matches = [...line.matchAll(regex)];

    for (const match of matches) {
      totalMatches++;
      const id = match[1]; // exemplo: 'rigid_sortal_ex_'

      const key = `ax_${id}`;
      const count = countMap.get(key) ?? 0;
      countMap.set(key, count + 1);

      //console.log(`Match #${totalMatches}: '${key}' encontrado`);
    }
  }

  //console.log(`\nTotal de ocorrências: ${totalMatches}\n`);

  const duplicates: string[] = [];
  for (const [id, count] of countMap.entries()) {
    if (count > 1) {
      //console.log(`🔁 Duplicado: '${id}' com ${count} ocorrências\n`);
      duplicates.push(id);
    }
  }

  return duplicates;
}