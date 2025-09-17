import { Project, Class, Relation} from 'ontouml-js';
import { ClassStereotypesAvailableInAxioms, mapClassStereotypeToRefactored } from '../../../common/newClassStereotypes';
import { getClassPrefix, getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';

/**
 * Generates a TPTP axiom asserting that all declared OntoUML classes (filtered by stereotype) 
 * and relations are the only valid `type_` entities.
 *
 * @param project - OntoUML Project containing the classes to axiomatize.
 * @returns A single TPTP formula (string) where the predicate `type_(T)`
 *          is equivalent to the disjunction of all reified classes.
 *
 */
export function existenceOfTypesInOntology(project: Project): string{
    const result = [
        ...project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms),
        ...project.getAllRelations()
    ].map(content => `T = ${getReifiedPrefix()}${content.getName()}`)
        .join(' | \n\t\t\t\t');
    

    return `fof(${getNextAxiomId()}_ontology_classes_are_types, axiom, (
    ![T]: (type_(T) <=> (${result})) 
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
export function reifiedClassesAndRelationsAreDifferentMltAxioms(project: Project): string{
    
    const pairCombinations: [any, any][] = getPairCombinations( [
        ...project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms),
        ...project.getAllRelations()
    ]);
    const result = pairCombinations
                    .map(content => `${getReifiedPrefix()}${content[0].getName()} != ${getReifiedPrefix()}${content[1].getName()}`)
                    .join(" &\n\t\t\t");

    if(result){
        return `fof(${getNextAxiomId()}_reified_classes_are_different, axiom,
  (${result})\n).`;
    }
    else{ 
        return '\n';
    }
}