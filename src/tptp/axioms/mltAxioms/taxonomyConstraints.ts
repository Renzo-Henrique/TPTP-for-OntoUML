import { getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { Project } from "ontouml-js";
import { AvailableInAxiomsClassStereotypes, mapStereotypeToRefactored } from '../../../common/newClassStereotypes';

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
    
    const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
            .map(content => `${mapStereotypeToRefactored(content.stereotype)}(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
        return `fof(${getNextAxiomId()}_ontology_classes_stereotypes, axiom, (
        ${result}
    )).`
}