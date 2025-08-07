import path from 'path';
import { loadProjectFromJson, findJsonFiles, outpurDirName} from './common/utils';
import { generateTptpFromProject } from './tptp/generator';
import { validateTptpFromProject } from './tptp/validate';

async function main() {
  try {
    const inputDir = path.resolve(__dirname, '../examples');
    const outputDir = path.resolve(inputDir, outpurDirName);

    const jsonFiles = findJsonFiles(inputDir);

    for (const inputFilePath of jsonFiles) {
      const project = loadProjectFromJson(inputFilePath);
      //generateTptpFromProject(project, outputDir);
      const result = await validateTptpFromProject(project, outputDir);
      console.log(result);
      break;
    }
  } catch (err) {
    console.error('Error while trying to load ontouml-js projects:', err);
  }
}

main();
