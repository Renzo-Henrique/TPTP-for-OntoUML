// 
// iof(X, T, W)
// X é instância
// T é tipo
// W é mundo
//
import { getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { Project } from "ontouml-js";
import { AvailableInAxiomsClassStereotypes, mapStereotypeToRefactored } from '../../../common/newStereotypes';

export function classesTaxonomiesStatementsMltAxioms(project: Project): string{
    
    const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
            .map(content => `${mapStereotypeToRefactored(content.stereotype)}(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
        return `fof(${getNextAxiomId()}_ontology_classes_stereotypes, axiom, (
        ${result}
    )).`
}