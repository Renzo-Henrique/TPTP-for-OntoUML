import path from 'path';
import { loadProjectFromJson, findJsonFiles} from './common/utils';
import { generateTptpFromProject } from './tptp/generator';

async function main() {
  try {
    const inputDir = path.resolve(__dirname, '../examples');
    const outputDir = path.resolve(inputDir, 'generated');

    const jsonFiles = findJsonFiles(inputDir);

    for (const inputFilePath of jsonFiles) {
      const project = loadProjectFromJson(inputFilePath);
      generateTptpFromProject(project, outputDir);
    }
  } catch (err) {
    console.error('Error while trying to load ontouml-js projects:', err);
  }
}

main();
