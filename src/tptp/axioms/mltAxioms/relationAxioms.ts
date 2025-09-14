import { Project, Class, Relation} from 'ontouml-js';
import { ClassStereotypesAvailableInAxioms, mapClassStereotypeToRefactored } from '../../../common/newClassStereotypes';
import { getClassPrefix, getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';





/**
 * Generates TPTP axioms that declare the OntoUML relations
 * in a given project, adapted for Multi-Level Theory (MLT).
 *
 * @param project - OntoUML Project containing all classes and stereotypes.
 * @returns A TPTP formula (string) where each class is reified and associated
 *          with its mapped stereotype.
 *
 */ 
export function relationsMltAxioms(project: Project): string{
    
    return relationsStatementsMltAxioms(project) + '\n' + relationsWithTypesAxioms(project);
}
// connectsTypes(T1, T2, R)
// `${rlt.getName()}: ${rlt.getSourceClass().getName()}---${rlt.getTargetClass().getName()}

function relationsStatementsMltAxioms(project: Project): string{
    
    const result = project.getAllRelations()
            .map(content => `relationType(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
        return `fof(${getNextAxiomId()}_ontology_relations_statement, axiom, (
        ${result}
    )).`
}

function relationsWithTypesAxioms(project: Project): string{
    const result = project.getAllRelations()
            .map(content => `connectsTypes(${getReifiedPrefix()}${content.getSourceClass().getName()}, ${getReifiedPrefix()}${content.getTargetClass().getName()}, ${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
        return `fof(${getNextAxiomId()}_ontology_relations_with_types, axiom, (
        ${result}
    )).`
}
