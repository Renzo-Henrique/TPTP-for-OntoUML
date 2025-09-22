import path from 'path';
import { loadProjectFromJson, findJsonFiles, outpurDirName } from './common/utils';
import { generateTptpFileFromProject, generateTptpFromProject, GenerateTptpOptions, GenerateTptpFileOptions, FormalizationOptions } from './tptp/generator';
import { validateTptpFromProject, ValidateTptpOptions } from './tptp/validate';
import { ClassStereotypesThatCanBeObjectType } from './common/newClassStereotypes';

async function main() {
  try {

    const formalizationOptions: FormalizationOptions = {
      closedWorldOfTypes: false, 
      withOntologyRelations: true
    }

    const inputDir = path.resolve(process.cwd(), 'examples');
    const outputDir = path.resolve(inputDir, outpurDirName);

    
    generateExamples(outputDir, formalizationOptions);
    validateExamples(outputDir, formalizationOptions);
    //validateSimpleWrongExamples(outputDir, formalizationOptions);

    // const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/wrongs/specializationFromDisjoints/specializationFromDisjoints.json'));
    // const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/wrongs/companyService/companyService.json'));
    // const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/personSimplified/personSimplified.json'));
    // const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/customer/customer.json'));
    // const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/providerRelation/providerRelation.json'));
    // const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/iofExample/iofExample.json'));
    
    //const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/relationsInSubclasses/relationsInSubclasses.json'));
    
    //generateTptpFileFromProject(project, outputDir, {formalizationOptions: formalizationOptions});
    //const result = await validateTptpFromProject(project, {generateOutputFileOfResult: true, outputFileOfResultDirPath: outpurDirName, formalizationOptions: formalizationOptions});console.log(result);

  } catch (err) {
    console.error('Error while trying to load ontouml-js projects:', err);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function validateExamples(outputDir: string, formalizationOptions: FormalizationOptions){
  const inputDir = path.resolve(process.cwd(), 'examples');
  const outputDirPath = path.resolve(outputDir);

  for (const inputFilePath of findJsonFiles(inputDir)) {
    const project = loadProjectFromJson(inputFilePath);
    generateTptpFileFromProject(project, outputDirPath, {formalizationOptions: formalizationOptions});
    const result = await validateTptpFromProject(project, {generateOutputFileOfResult: true, outputFileOfResultDirPath: outputDir, formalizationOptions: formalizationOptions});console.log(result);const waitTime = 30000 + Math.floor(Math.random() * 10000); console.log(`Waiting ${waitTime / 1000} seconds...\n\n`); await sleep(waitTime)
    
  }
}

async function validateSimpleWrongExamples(outputDir: string, formalizationOptions: FormalizationOptions){
  const inputDir = path.resolve(process.cwd(), 'examples/simplified/json');
  const outputDirPath = path.resolve(outputDir);

  for (const inputFilePath of findJsonFiles(inputDir)) {
    const project = loadProjectFromJson(inputFilePath);
    generateTptpFileFromProject(project, outputDirPath, {formalizationOptions: formalizationOptions});
    const result = await validateTptpFromProject(project, {generateOutputFileOfResult: true, outputFileOfResultDirPath: outputDir, formalizationOptions: formalizationOptions});console.log(result);const waitTime = 30000 + Math.floor(Math.random() * 10000); console.log(`Waiting ${waitTime / 1000} seconds...\n\n`); await sleep(waitTime)
    
  }
}

async function generateExamples(outputDir: string, formalizationOptions: FormalizationOptions){
  const inputDir = path.resolve(process.cwd(), 'examples');
  const outputDirPath = path.resolve(outputDir);

  for (const inputFilePath of findJsonFiles(inputDir)) {
    const project = loadProjectFromJson(inputFilePath);
    generateTptpFileFromProject(project, outputDirPath, {formalizationOptions: formalizationOptions});
    
  }
}


main();
