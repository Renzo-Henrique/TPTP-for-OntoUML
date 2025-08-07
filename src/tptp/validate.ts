import { Project } from 'ontouml-js';
import { tptpClient } from 'tptp';
import path from 'path';
import fs from 'fs';
import { generateTptpFromProject } from './generator';


/**
 * Validate the generated TPTP from a project using a remote TPTP theorem prover.
 *
 * @param project The OntoUML project to be validated.
 * @param inputDir The directory where the TPTP (.p) file is (or will be) located.
 * @returns A string containing the result of the proof.
 */
export async function validateTptpFromProject(project: Project, tptpFileDir: string): Promise<any> {
    const tptpFileName = `${project.name.getText()}.p`;
    const tptpFilePath = path.join(tptpFileDir, tptpFileName);
    let tptpContent: string;
    // If the file doesn't exist, generate it
    if (!fs.existsSync(tptpFilePath)) {
        console.warn(`File "${tptpFileName}" not found. Generating TPTP from project...`);
        tptpContent = generateTptpFromProject(project, tptpFileDir);
    }
    else{
        tptpContent = fs.readFileSync(tptpFilePath, 'utf-8');
    }

    try {
        // Chama o provador remoto com a string TPTP
        const result = await tptpClient.runSystem('E---', tptpContent);

        // Exibe os campos úteis retornados
        return `System "${result.systemName}" on project "${project.name.getText()}":\n` +
            `Result: ${result.result}\nCPU time: ${result.cpuTime}\nWall-clock time: ${result.wallClockTime}`;
    } catch (err) {
    console.error('Error during remote theorem proving:', err);
    throw err;
  }
}
