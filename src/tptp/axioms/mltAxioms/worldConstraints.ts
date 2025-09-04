import { Project, Class, Generalization, GeneralizationSet} from 'ontouml-js';
import { AvailableInAxiomsClassStereotypes } from '../../../common/newClassStereotypes';
import { getClassPrefix, getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';


/**
 * Generates a TPTP axiom asserting that all declared OntoUML classes
 * (filtered by stereotype) are the only valid `type_` entities.
 *
 * @param project - OntoUML Project containing the classes to axiomatize.
 * @returns A single TPTP formula (string) where the predicate `type_(C)`
 *          is equivalent to the disjunction of all reified classes.
 *
 */
export function existenceOfDeclaredClassesMltAxioms(project: Project): string{
    const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
        .map(content => `C = ${getReifiedPrefix()}${content.getName()}`)
        .join(' | \n\t\t\t\t');
    return `fof(${getNextAxiomId()}_ontology_classes_are_types, axiom, (
    ![C]: (type_(C) <=> (${result})) 
)).`
}

/**
 * Generates TPTP axioms ensuring that all reified classes are distinct
 * individuals in the ontology.
 *
 * @param project - OntoUML Project containing the classes to axiomatize.
 * @returns A single TPTP formula (string) where each pair of reified classes
 *          is asserted to be different.
 *
 */
export function reifiedClassesAreDifferentMltAxioms(project: Project): string{
    
    const pairCombinations: [Class, Class][] = getPairCombinations( project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes));
    const result = pairCombinations
                    .map(content => `${getReifiedPrefix()}${content[0].getName()} != ${getReifiedPrefix()}${content[1].getName()}`)
                    .join(" &\n\t\t\t");

    return `fof(${getNextAxiomId()}_reified_classes_are_different, axiom,
  (${result})
).`;
}

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
    return project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
        .map(content => classAndReifiedClassAxiom(content))
        .join('\n');

}



