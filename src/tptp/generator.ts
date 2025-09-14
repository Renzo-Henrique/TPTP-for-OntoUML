import fs from 'fs';
import path from 'path';
import { Project, Relation} from 'ontouml-js';
import {worldAndEntity} from './axioms/simplifiedAxioms/baseAxioms'
import {fixProjectNames, refactorNames, resetProjectId } from '../common/utils'
import {generalizationAllAxioms, generalizationSetAllAxioms} from './axioms/simplifiedAxioms/generalizationAxioms'
import {existenceOfSortalInstancesAxiom, existenceOfRigidClassesAxioms, 
        existenceOfAntiRigidClassesAxioms, existenceOfAtLeastOneOfEachClassAxioms,
        disjunctionOfKindsAxiom} from './axioms/simplifiedAxioms/taxonomyAxioms'

import { resetAxiomId} from './axioms/idGenerator';
import { existenceOfDeclaredClassesMltAxioms, reifiedClassesAreDifferentMltAxioms, relationBetweenClassesAndReifiedClassesMltAxioms, classesTaxonomiesStatementsMltAxioms} from './axioms/mltAxioms/classAxioms';
import { baseMltAxiom } from './axioms/mltAxioms/baseAxioms';
import { generalizationAllMltAxioms, generalizationSetAllMltAxioms } from './axioms/mltAxioms/generalizationAxioms';
import { relationsDefinitions } from './axioms/mltAxioms/relationBaseAxioms';

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
    resetAxiomId();
    resetProjectId();

    fixProjectNames(project);
    console.log(project.name.getText())
    const projectName = project.name.getText();
    const fileName = projectName  + '.p';
    

    const outputFilePath = path.join(outputDirPath, fileName);
    
    var formulas = ['',''];
    //formulas = generateTptpSimplifiedAxiomsFromProject(project);
    const content = formulas.join('\n');

    var formulasMlt = ['',''];
    formulasMlt = generateTptpMLTAxiomsFromProject(project);
    
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
    refactorNames(project);
    formulas.push(worldAndEntity);

    formulas.push('\n%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%%\n');
    formulas.push(`% Everything that exists must be an instance of a sortal`);
    formulas.push(existenceOfSortalInstancesAxiom(project));

    formulas.push(`%%%%%%%%\n%%%%%%%%\n% Disjunction among kinds`);
    formulas.push(disjunctionOfKindsAxiom(project));

    formulas.push(`% All things that are instances of a rigid type in some world`);
    formulas.push(`% Remain instances of the same type in every world where they exist`);
    formulas.push(existenceOfRigidClassesAxioms(project));

    formulas.push(`% All things that are instances of an anti-rigid type in some world`);
    formulas.push(`% May not be instances in other worlds`);
    formulas.push(existenceOfAntiRigidClassesAxioms(project));

    formulas.push(`%%%%%%\n%%%%%%\n%%%%%%\n% Improper Specializations\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
    formulas.push(generalizationAllAxioms(project));

    formulas.push(`%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Generalization Sets\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
    formulas.push(generalizationSetAllAxioms(project));

    
    formulas.push(`\n\n%% UNCERTAIN: Is this necessary or only for simulation of worlds?`);
    formulas.push(`%% If so, better to keep at the end and explain why`);
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
    formulas.push('\n\n%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%% Beginning of MLT %%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%');
    formulas.push(baseMltAxiom);
    formulas.push(relationsDefinitions);
    
    formulas.push('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%% ESPECIFIC AXIOM\'S FOR THE ONTOLOGY\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    formulas.push('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%% WORLD CONSTRAINTS\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    formulas.push(existenceOfDeclaredClassesMltAxioms(project));
    formulas.push(reifiedClassesAreDifferentMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Classes Statements\n%%%%%%%%%%%%%%%');
    formulas.push(classesTaxonomiesStatementsMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Class Reification\n%%%%%%%%%%%%%%%');
    formulas.push(relationBetweenClassesAndReifiedClassesMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Generalizations\n%%%%%%%%%%%%%%%');
    formulas.push(generalizationAllMltAxioms(project));

    formulas.push(`%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Generalization Sets\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
    formulas.push(generalizationSetAllMltAxioms(project));

    printRelations(project);
    return formulas;
}

function printRelations(project: Project): void{
    console.log("\n\n------------------\n\n")
    project.getAllRelations()
        .map(content => console.log(getStringRelation(content)))
}

function getStringRelation(rlt: Relation): string{
    return `${rlt.getName()}: ${rlt.getSourceClass().getName()}---${rlt.getTargetClass().getName()}
    `
}







