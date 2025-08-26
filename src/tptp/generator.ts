import fs from 'fs';
import path from 'path';
import { Project} from 'ontouml-js';
import {worldAndEntity} from './axioms/simplifiedAxioms/baseAxioms'
import {refactorNames} from '../common/utils'
import {generalizationAllAxioms, generalizationSetAllAxioms} from './axioms/simplifiedAxioms/generalizationAxioms'
import {existenceOfSortalInstancesAxiom, existenceOfRigidClassesAxioms, 
        existenceOfAntiRigidClassesAxioms, existenceOfAtLeastOneOfEachClassAxioms,
        disjunctionOfKindsAxiom} from './axioms/simplifiedAxioms/taxonomyAxioms'

import { resetAxiomId } from './axioms/idGenerator';
import { existenceOfDeclaredClassesAxioms, closedWorldAxioms, differenceBetweenReifiedClassesAxioms, topLevelTaxonomyOfClassesAxioms} from './axioms/mltAxioms/worldConstraints';
import { mltBaseAxiom } from './axioms/mltAxioms/baseAxioms';
import { classesTaxonomiesStatementsAxioms } from './axioms/mltAxioms/taxonomyConstraints';

/**
 * Generates a TPTP (.p) file representation of a given OntoUML project.
 * The output file will be saved under the `generated` directory,
 * in the same path as the input file.
 *
 * @param filePath - Path to the input OntoUML JSON file.
 * @param project - The OntoUML project instance parsed with `ontouml-js`.
 */
export function generateTptpFromProject(project: Project, outputDirPath: string): string {

    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
    }
    resetAxiomId()
    console.log(project.name.getText())
    const projectName = project.name.getText();
    const fileName = projectName  + '.p';

    const outputFilePath = path.join(outputDirPath, fileName);
    refactorNames(project);
    const formulas = generateTptpSimplifiedAxiomsFromProject(project);
    
    const content = formulas.join('\n');

    const formulasMlt = generateTptpMLTAxiomsFromProject(project);
    
    const contentMlt = formulasMlt.join('\n');
    //----------
    try {
        fs.writeFileSync(outputFilePath, content + contentMlt, 'utf-8');
        console.log(`TPTP file successfully generated in: ${outputFilePath}`);
    } catch (err) {
        console.error(`Error while trying to save generated TPTP file: ${err}`);
    }

    return content;
}

/**
 * Generates a list of simplified TPTP axioms as strings based on the given OntoUML project.
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
function generateTptpSimplifiedAxiomsFromProject(project: Project): string[]{
  
    
    const formulas: string[] = [];
    var formulaComment = '';

    formulas.push(worldAndEntity);

    formulas.push('\n%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%%\n');
    formulaComment = `% Everything that exists must be an instance of a sortal`;
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

/**
 * Generates a list of MLT TPTP axioms as strings based on the given OntoUML project.
 *
 * @param project - The OntoUML project to be transformed.
 * @returns Array of strings representing TPTP axioms.
 */
function generateTptpMLTAxiomsFromProject(project: Project): string[]{
  
    
    const formulas: string[] = [];
    var formulaComment = '\n\n%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%% Beginning of MLT %%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%';
    formulas.push(formulaComment);
    formulas.push(mltBaseAxiom);
    
    formulaComment = '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%% WORLD CONSTRAINTS\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'
    formulas.push(formulaComment);
    formulas.push(existenceOfDeclaredClassesAxioms(project));
    formulas.push(topLevelTaxonomyOfClassesAxioms(project))
    formulas.push(closedWorldAxioms(project));
    formulas.push(differenceBetweenReifiedClassesAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Classes Statements%%%%%%%%%%%%%%%')
    formulas.push(classesTaxonomiesStatementsAxioms(project));
    return formulas;
}









