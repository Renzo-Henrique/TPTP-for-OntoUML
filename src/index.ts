import path from 'path';
import { loadProjectFromJson, findJsonFiles, outpurDirName} from './common/utils';
import { generateTptpFromProject } from './tptp/generator';
import { validateTptpFromProject } from './tptp/validate';

async function main() {
  try {
    const inputDir = path.resolve(process.cwd(), 'examples');
    const outputDir = path.resolve(inputDir, outpurDirName);

    // const jsonFiles = findJsonFiles(inputDir);
    // for (const inputFilePath of jsonFiles) {
    //   const project = loadProjectFromJson(inputFilePath);
    //   generateTptpFromProject(project, outputDir);
    //   const result = await validateTptpFromProject(project, outputDir, true, false, true);console.log(result);
    //   //break;
    // }
    //const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/wrongs/specializationFromDisjoints/specializationFromDisjoints.json'));
    //const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/wrongs/companyService/companyService.json'));
    //const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/personSimplified/personSimplified.json'));
    //const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/customer/customer.json'));
    const project = loadProjectFromJson(path.resolve(process.cwd(),'examples/notWrongs/providerRelation/providerRelation.json'));
    
    generateTptpFromProject(project, outputDir);
    const result = await validateTptpFromProject(project, outputDir, true, false, true);console.log(result);
  } catch (err) {
    console.error('Error while trying to load ontouml-js projects:', err);
  }
}

main();
