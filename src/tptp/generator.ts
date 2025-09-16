import fs from 'fs';
import path from 'path';
import { Project, Relation} from 'ontouml-js';
import {fixProjectNames, resetProjectId } from '../common/utils'

import { resetAxiomId} from './axioms/idGenerator';
import {  relationBetweenClassesAndReifiedClassesMltAxioms, classesTaxonomiesStatementsMltAxioms} from './axioms/mltAxioms/classAxioms';
import { baseMltAxiom } from './axioms/mltAxioms/baseGeneralAxioms';
import { generalizationAllMltAxioms, generalizationSetAllMltAxioms } from './axioms/mltAxioms/generalizationAxioms';
import { relationBaseAxioms } from './axioms/mltAxioms/baseRelationAxioms';
import { existenceOfTypesInOntology, reifiedClassesAndRelationsAreDifferentMltAxioms} from './axioms/mltAxioms/worldConstraints';
import { relationsMltAxioms } from './axioms/mltAxioms/relationAxioms';

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

    var formulasMlt: string[] =  [];
    formulasMlt = generateTptpMLTAxiomsFromProject(project);
    
    const contentMlt = formulasMlt.join('\n');
    //----------
    try {
        fs.writeFileSync(outputFilePath, contentMlt, 'utf-8');
        console.log(`TPTP file successfully generated in: ${outputFilePath}`);
    } catch (err) {
        console.error(`Error while trying to save generated TPTP file: ${err}`);
    }

    return contentMlt;
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
    formulas.push(relationBaseAxioms);
    
    formulas.push('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%% ESPECIFIC AXIOM\'S FOR THE ONTOLOGY\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    formulas.push('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%% WORLD CONSTRAINTS\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    formulas.push(existenceOfTypesInOntology(project));
    formulas.push(reifiedClassesAndRelationsAreDifferentMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Classes Statements\n%%%%%%%%%%%%%%%');
    formulas.push(classesTaxonomiesStatementsMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Class Reification\n%%%%%%%%%%%%%%%');
    formulas.push(relationBetweenClassesAndReifiedClassesMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Generalizations\n%%%%%%%%%%%%%%%');
    formulas.push(generalizationAllMltAxioms(project));

    formulas.push(`%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Generalization Sets\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
    formulas.push(generalizationSetAllMltAxioms(project));

    formulas.push(`%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Relations\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
    formulas.push(relationsMltAxioms(project));
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







