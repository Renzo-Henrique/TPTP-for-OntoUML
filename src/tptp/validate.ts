import { Project } from 'ontouml-js';
import { tptpClient } from 'tptp';
import path from 'path';
import fs from 'fs';
import { FormalizationOptions, generateTptpFromProject} from './generator';
import { readAxiomFiles } from '../common/readFiles';

// Caso 1: generateOutputFileOfResult = false ou não definido → não precisa de path
interface ValidateTptpOptionsNoOutputFile {
  generateOutputFileOfResult?: false;
}

// Caso 2: generateOutputFileOfResult = true → path obrigatório
interface ValidateTptpOptionsWithOutput {
  generateOutputFileOfResult: true;
  outputFileOfResultDirPath: string;
}

export type ValidateTptpOptions =
  (ValidateTptpOptionsNoOutputFile | ValidateTptpOptionsWithOutput) & {
    formalizationOptions?: FormalizationOptions;
  };

/** TODO:: FIX comments and possible parameters
 * Validate the generated TPTP from a project using a remote TPTP theorem prover.
 *
 * @param project The OntoUML project to be validated.
 * @param inputDir The directory where the TPTP (.p) file is (or will be) located.
 * @returns A string containing the result of the proof.
 */
export async function validateTptpFromProject(project: Project, options: ValidateTptpOptions = {}): Promise<string> {
  
  // Desestruturação com valor default
  const { generateOutputFileOfResult = false } = options;

  var tptpContent: string = '';
  tptpContent += await generateTptpFromProject(project, {
      generateFullFormalization: true,
      formalizationOptions: options.formalizationOptions
    });
  
  try {
      //return '';
      // Chama o provador remoto com a string TPTP
      console.log(`\nTPTP validation running...\n`);
      const result = await tptpClient.runSystem('E---', tptpContent, {
        includeSystemOutput: generateOutputFileOfResult,
        cpuLimit: 30 
      });
      
      if(generateOutputFileOfResult){
        const tptpOutputFileName = `${project.name.getText()}.validationResult.txt`;
        try {
            const outputFile = path.join( (options as ValidateTptpOptionsWithOutput).outputFileOfResultDirPath, tptpOutputFileName);

            fs.writeFileSync(outputFile, result.systemOutput, 'utf-8');
            console.log(`TPTP validation result successfully generated in: ${outputFile}`);
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