import fs from 'fs';
import path from 'path';
import { Project, Relation} from 'ontouml-js';
import {fixProjectNames, resetProjectId } from '../common/utils'

import { resetAxiomId} from './axioms/idGenerator';
import { relationBetweenClassesAndReifiedClassesMltAxioms, classesEstereotypesStatementsMltAxioms} from './axioms/mltAxioms/classAxioms';
import { generalizationAllMltAxioms, generalizationSetAllMltAxioms } from './axioms/mltAxioms/generalizationAxioms';
import { existenceOfTypesInOntology, reifiedClassesAndRelationsAreDifferentMltAxioms} from './axioms/mltAxioms/worldConstraints';
import { relationsMltAxioms } from './axioms/mltAxioms/relationAxioms';
import { readAxiomFiles } from '../common/readFiles';

export enum GenerateTptpMode {
  OntologyOnly = 0,
  FullFormalization = 1,
  FullFormalizationAndOntologyOnlySeparated = 2,
}

export interface GenerateTptpFileOptions {
    generateMode?: GenerateTptpMode,
    formalizationOptions?: FormalizationOptions;
}

export interface GenerateTptpOptions {
    generateFullFormalization?: boolean,
    formalizationOptions?: FormalizationOptions;
}

export interface FormalizationOptions {
    closedWorldOfTypes?: boolean,
    withRelations?: boolean;
}

export async function generateTptpFileFromProject(project: Project, outputDirPath: string, options: GenerateTptpFileOptions = {}){

    const {
        generateMode = GenerateTptpMode.FullFormalizationAndOntologyOnlySeparated
    } = options;

    function generateTptpFile(content: string, outputFilePath: string){
        try {
            fs.writeFileSync(outputFilePath, content, 'utf-8');
            console.log(`TPTP file successfully generated in: ${outputFilePath}`);
        } catch (err) {
            console.error(`Error while trying to save generated TPTP file: ${err}`);
        }
    }

    async function generateFullFormalization(){
        const fileContent = await generateTptpFromProject(project, 
            {generateFullFormalization: true, formalizationOptions:options.formalizationOptions});
        const projectName = project.name.getText();
        const fileName = projectName + '.fullFormalization'  + '.p';
        const outputFilePath = path.join(outputDirPath, fileName);

        generateTptpFile(fileContent, outputFilePath);
    }

    async function generateOntologyOnly(){
        const fileContent = await generateTptpFromProject(project, 
            {generateFullFormalization: false, formalizationOptions:options.formalizationOptions});
        const projectName = project.name.getText();
        const fileName = projectName  + '.p';
        const outputFilePath = path.join(outputDirPath, fileName);

        generateTptpFile(fileContent, outputFilePath);
    }

    

    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
    }

    if(generateMode == GenerateTptpMode.FullFormalizationAndOntologyOnlySeparated){
        generateFullFormalization();
        generateOntologyOnly();
    }
    else if(generateMode == GenerateTptpMode.FullFormalization){
        generateFullFormalization();
    }
    else{
        generateOntologyOnly();
    }
    
}




/**
 * Generates a TPTP (.p) file representation of a given OntoUML project.
 * The output file will be saved under the `generated` directory,
 * in the same path as the input file.
 *
 * @param filePath - Path to the input OntoUML JSON file.
 * @param project - The OntoUML project instance parsed with `ontouml-js`.
 */
export async function generateTptpFromProject(project: Project, options: GenerateTptpOptions = {}): Promise <string> {
    const {
        generateFullFormalization = true
    } = options;

    resetAxiomId();
    resetProjectId();

    fixProjectNames(project);
    //console.log(project.name.getText())
    
    var formalizationAxioms: string = '';

    if(generateFullFormalization){
        // Leitura dos includes do MLT + formalização adicional
        formalizationAxioms = await readAxiomFiles();
    }

    const formulasMlt = generateTptpMLTAxiomsFromProject(project, options.formalizationOptions);

    const contentMlt = formalizationAxioms + '\n' + formulasMlt.join('\n');
    
    return contentMlt;
}

/**
 * Generates a list of MLT TPTP axioms as strings based on the given OntoUML project.
 *
 * @param project - The OntoUML project to be transformed.
 * @returns Array of strings representing TPTP axioms.
 */
function generateTptpMLTAxiomsFromProject(project: Project, options: FormalizationOptions = {}): string[]{
    const {
        closedWorldOfTypes = true,
        withRelations = true
    } = options;

    //console.log(options)

    const formulas: string[] = [];
    
    formulas.push('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%% ESPECIFIC AXIOM\'S FOR THE ONTOLOGY\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    formulas.push('%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS\n%%%%%%%%%%%%%%%%%');
    if(closedWorldOfTypes){  
        formulas.push(existenceOfTypesInOntology(project));
    }
    formulas.push(reifiedClassesAndRelationsAreDifferentMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Classes Statements\n%%%%%%%%%%%%%%%');
    formulas.push(classesEstereotypesStatementsMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Class Reification\n%%%%%%%%%%%%%%%');
    formulas.push(relationBetweenClassesAndReifiedClassesMltAxioms(project));

    formulas.push('%%%%%%%%%%%%%%%\n%%%%Generalizations\n%%%%%%%%%%%%%%%');
    formulas.push(generalizationAllMltAxioms(project));

    formulas.push(`%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Generalization Sets\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
    formulas.push(generalizationSetAllMltAxioms(project));

    if(withRelations){  
        formulas.push(`%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Relations\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`);
        formulas.push(relationsMltAxioms(project));
    }
    //printRelations(project);
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






