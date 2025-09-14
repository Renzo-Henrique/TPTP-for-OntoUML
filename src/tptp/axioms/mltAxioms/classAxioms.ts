import { Project, Class} from 'ontouml-js';
import { ClassStereotypesAvailableInAxioms, mapClassStereotypeToRefactored } from '../../../common/newClassStereotypes';
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
export function classesTaxonomiesStatementsMltAxioms(project: Project): string{
    
    const result = project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms)
            .map(content => `${mapClassStereotypeToRefactored(content.stereotype)}(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
        return `fof(${getNextAxiomId()}_ontology_classes_stereotypes, axiom, (
        ${result}
    )).`
}


