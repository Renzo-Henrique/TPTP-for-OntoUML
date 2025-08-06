import fs from 'fs';
import path from 'path';
import { Project} from 'ontouml-js';
import {worldAndEntity} from './axioms/baseAxioms'
import {refactorNames} from '../common/utils'
import {generalizationAllAxioms, generalizationSetAllAxioms} from './axioms/generalizationAxioms'
import {existenceOfSortalInstancesAxiom, existenceOfRigidClassesAxioms, 
        existenceOfAntiRigidClassesAxioms, existenceOfAtLeastOneOfEachClassAxioms,
        disjunctionOfKindsAxiom} from './axioms/taxonomyAxioms'

import { resetAxiomId } from './axioms/idGenerator';


/**
 * Generates a TPTP (.p) file representation of a given OntoUML project.
 * The output file will be saved under the `generated` directory,
 * in the same path as the input file.
 *
 * @param filePath - Path to the input OntoUML JSON file.
 * @param project - The OntoUML project instance parsed with `ontouml-js`.
 */
export function generateTptpFromProject(filePath: string, project: Project): void {
    const inputDir = path.dirname(filePath);
    const outputDir = path.join(inputDir, 'generated');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    resetAxiomId()
    console.log(project.name.getText())
    const projectName = project.name.getText();
    const fileName = projectName  + '.p';

    const outputPath = path.join(outputDir, fileName);

    const formulas = generateTptpAxioms(project);
    
    const content = formulas.join('\n');
    //----------
    try {
        fs.writeFileSync(outputPath, content, 'utf-8');
        console.log(`Arquivo TPTP gerado com sucesso em: ${outputPath}`);
    } catch (err) {
        console.error(`Erro ao salvar arquivo .p: ${err}`);
    }
}

/**
 * Generates a list of TPTP axioms as strings based on the given OntoUML project.
 *
 * This includes axioms for:
 * - Basic ontology assumptions
 * - Existence of instances
 * - Taxonomic disjunctions
 * - Rigidity/anti-rigidity of classes
 * - Generalizations and generalization sets
 *
 *
 * @param project - The OntoUML project to be transformed.
 * @returns Array of strings representing TPTP axioms.
 */
export function generateTptpAxioms(project: Project): string[]{
  
    refactorNames(project);
    const formulas: string[] = [];

    formulas.push(worldAndEntity);

    formulas.push('\n%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%%\n');
    var formulaComment = `% Everything that exists must be an instance of a sortal`;
    formulas.push(formulaComment);
    formulas.push(existenceOfSortalInstancesAxiom(project));

    formulaComment = `%%%%%%%%\n%%%%%%%%\n% Disjunction among kinds`;
    formulas.push(formulaComment);
    formulas.push(disjunctionOfKindsAxiom(project));

    formulaComment = `% All things that are instances of a rigid type in some world`;
    formulas.push(formulaComment);
    formulaComment = `% Remain instances of the same type in every world where they exist`;
    formulas.push(formulaComment);
    formulas.push(existenceOfRigidClassesAxioms(project));

    formulaComment = `% All things that are instances of an anti-rigid type in some world`;
    formulas.push(formulaComment);
    formulaComment = `% May not be instances in other worlds`;
    formulas.push(formulaComment);
    formulas.push(existenceOfAntiRigidClassesAxioms(project));

    formulaComment = `%%%%%%\n%%%%%%\n%%%%%%\n% Improper Specializations\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`;
    formulas.push(formulaComment);
    formulas.push(generalizationAllAxioms(project));

    formulaComment = `%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Generalization Sets\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`;
    formulas.push(formulaComment);
    formulas.push(generalizationSetAllAxioms(project));

    
    formulaComment = `\n\n%% UNCERTAIN: Is this necessary or only for simulation of worlds?`;
    formulas.push(formulaComment);
    formulaComment = `%% If so, better to keep at the end and explain why`;
    formulas.push(formulaComment);
    formulas.push(existenceOfAtLeastOneOfEachClassAxioms(project));
    
    return formulas;
}









