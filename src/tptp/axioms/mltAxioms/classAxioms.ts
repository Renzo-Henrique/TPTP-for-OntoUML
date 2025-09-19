import { Project, Class, ClassStereotype, stereotypeUtils} from 'ontouml-js';
import { ClassStereotypesAvailableInAxioms, mapClassStereotypeToRefactored, ClassStereotypesThatCanBeObjectType, isClassStereotypeThatCanBeObjectType } from '../../../common/newClassStereotypes';
import { getClassPrefix, getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';



/**
 * Generates TPTP axioms relating each OntoUML class with its reified class.
 *
 * @param project - OntoUML Project containing the classes to axiomatize.
 * @returns A string containing one TPTP axiom per class, ensuring that
 *          `iof(X, Reified_Class, W)` is equivalent to
 *          `Class(X, W)` for the original OntoUML class.
 *
 */
export function relationBetweenClassesAndReifiedClassesMltAxioms(project: Project): string{
    //TODO:: verify if is necessary
    return '';
    /**
     * Helper function that generates a single TPTP axiom connecting
     * a given OntoUML class with its reified representation.
     *
     * @param cl - OntoUML class to axiomatize.
     * @returns A TPTP axiom (string) linking the reified class to the
     *          corresponding OntoUML predicate.
     */
    function classAndReifiedClassAxiom(cl: Class): string{
        return `fof(${getNextAxiomId()}_relation_between_class_and_reified_class, axiom,(
    ![X, W]: (iof(X, ${getReifiedPrefix()}${cl.getName()}, W) <=> ${getClassPrefix()}${cl.getName()}(X, W) )\n)).`;
    }

    return project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms)
        .map(content => classAndReifiedClassAxiom(content))
        .join('\n');

}

/**
 * Generates TPTP axioms that declare the stereotypes of OntoUML classes
 * in a given project, adapted for Multi-Level Theory (MLT).
 *
 * @param project - OntoUML Project containing all classes and stereotypes.
 * @returns A TPTP formula (string) where each class is reified and associated
 *          with its mapped stereotype.
 *
 */ 
export function classesEstereotypesStatementsMltAxioms(project: Project): string{
    
    var firstAxiom = project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms)
            .map(content => getClassEstereotypeInAxiom(content))
            .join(' & \n\t\t\t\t');
    
    if(firstAxiom){
        return  `fof(${getNextAxiomId()}_ontology_classes_estereotypes, axiom, (
        ${firstAxiom}\n)).`
    }
    else{
        for(var i = 0; i < 5; i++){  
            console.log("THERE ARE NO CLASSES IN YOUR ONTOLOGY\n---------\n");
        }
        return '';
    }
    
}


function getClassEstereotypeInAxiom(cl: Class): string{
    const directlyStatement = `${mapClassStereotypeToRefactored(cl.stereotype)}(${getReifiedPrefix()}${cl.getName()})`;

    var indirectlyStatement = getIndirectStereotype(cl);
    

    return directlyStatement + indirectlyStatement;
}

function getIndirectStereotype(cl: Class): string{
    
    if(! isClassStereotypeThatCanBeObjectType(cl.stereotype)){
        return '';
    }

    //console.log(`\t\t${cl.getName()}: ${cl.stereotype}: ${cl.restrictedTo}`);

    var additionalStereotype = '& '
    // Restricted to functionalComples
    
    if(cl.isRestrictedToCollective()){
        additionalStereotype += 'collectiveType';
    }
    else if(cl.isRestrictedToQuantity()){
        additionalStereotype += 'quantityType';
    }
    else if(cl.isRestrictedToQuality()){
        additionalStereotype += 'qualityType';
    }
    else if(cl.isRestrictedToIntrinsicMode()){
        additionalStereotype += 'modeType';
    }
    else if(cl.isRestrictedToRelator()){
        additionalStereotype += 'relatorType';
    }
    else if(cl.isRestrictedToFunctionalComplex()){
        additionalStereotype += 'objectType';
    }
    else{
        return '';
    }
    
    return `${additionalStereotype}(${getReifiedPrefix()}${cl.getName()})`;
}


