import { Project } from 'ontouml-js';
import { tptpClient } from 'tptp';
import path from 'path';
import fs from 'fs';
import { generateTptpFromProject } from './generator';


/** TODO:: FIX comments
 * Validate the generated TPTP from a project using a remote TPTP theorem prover.
 *
 * @param project The OntoUML project to be validated.
 * @param inputDir The directory where the TPTP (.p) file is (or will be) located.
 * @returns A string containing the result of the proof.
 */
export async function validateTptpFromProject(project: Project, tptpFileDir: string, generateOutputFileOfResult: boolean, generateFile: boolean): Promise<string> {
    const tptpFileName = `${project.name.getText()}.p`;
    const tptpFilePath = path.join(tptpFileDir, tptpFileName);
    let tptpContent: string;
    // If the file doesn't exist, generate it
    if (generateFile) {
        console.warn(`Generating TPTP file "${tptpFileName}" from project...`);
        tptpContent = generateTptpFromProject(project, tptpFileDir);
    }
    else if (!fs.existsSync(tptpFilePath)){
        console.warn(`File "${tptpFileName}" not found. Generating TPTP from project...`);
        tptpContent = generateTptpFromProject(project, tptpFileDir);
    }
    else{
        tptpContent = fs.readFileSync(tptpFilePath, 'utf-8');
    }
    
    try {
        //return '';
        // Chama o provador remoto com a string TPTP
        console.log(`\nTPTP validation running...\n`);
        const result = await tptpClient.runSystem('E---', tptpContent, {includeSystemOutput: generateOutputFileOfResult});

        if(generateOutputFileOfResult){
            try {
                const outputFileOfResult = path.join(tptpFileDir, tptpFileName + ".validationResult.txt");
                fs.writeFileSync(outputFileOfResult, result.systemOutput, 'utf-8');
                console.log(`TPTP validation result successfully generated in: ${outputFileOfResult}`);
            } catch (err) {
                console.error(`Error while trying to save generated TPTP file: ${err}`);
            }
        }
        
        //console.log(typeof(result));
        //console.log('Full result object:', JSON.stringify(result, null, 2));
        // Exibe os campos úteis retornados
        return `System "${result.systemName}" on project "${project.name.getText()}":\n` +
            `Result: ${result.result}\nCPU time: ${result.cpuTime}\nWall-clock time: ${result.wallClockTime}`;
    } catch (err) {
    console.error('Error during remote theorem proving:', err);
    throw err;
  }
}

async function printAvailableSystems(problem: string) {
  try {
    const systems = await tptpClient.suggestSystemList(problem);
    console.log('Available theorem prover systems:');
    console.log(typeof(systems))
    console.log(systems)

    systems.map(content => console.log(`- ${content.getName()} ;--; ${content.getTptpName()} (${content.getStatus() || 'no description'})`));
    // systems.forEach(sys => {
    //   console.log(`- ${systems.getTptpName()} (${systems.getStatus() || 'no description'})`);
    // });
  } catch (error) {
    console.error('Error fetching systems:', error);
  }
}