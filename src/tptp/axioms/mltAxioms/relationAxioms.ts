import { Project, Class, Relation, RectangularShape, RelationStereotype} from 'ontouml-js';
import { ClassStereotypesAvailableInAxioms, mapClassStereotypeToRefactored } from '../../../common/newClassStereotypes';
import { getClassPrefix, getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';
import { mapRelationStereotypeToRefactored } from '../../../common/newRelationStereotypes';





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
    
    return relationsStatementsMltAxioms(project) 
    + '\n' + relationsWithTypesAxioms(project)
    + `\n%%%%%%%%%%%%%% Relation Estereotypes\n` 
    + relationsStereotypesAxioms(project);
}
// connectsTypes(T1, T2, R)
// `${rlt.getName()}: ${rlt.getSourceClass().getName()}---${rlt.getTargetClass().getName()}

function relationsStatementsMltAxioms(project: Project): string{
    
    const result = project.getAllRelations()
            .map(content => `relationType(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
    
            // Geração somente se não for vazio
    if(result){
        return  `\nfof(${getNextAxiomId()}_ontology_relations_statement, axiom, (
    ${result}\n)).`
    }
    else{
        return '';
    }
}

function relationsWithTypesAxioms(project: Project): string{
    var result = project.getAllRelations()
            .map(content => `connectsTypes(${getReifiedPrefix()}${content.getSourceClass().getName()}, ${getReifiedPrefix()}${content.getTargetClass().getName()}, ${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
    
    if(result){
        return `fof(${getNextAxiomId()}_ontology_relations_with_types, axiom, (
        ${result}\n)).`
    }
    else{
        return '';
    }
}

function relationsStereotypesAxioms(project: Project): string{

    var relationStatement = project.getAllRelations()
            .filter(content =>
                content.stereotype &&
                content.stereotype !== RelationStereotype.MATERIAL&&
                content.stereotype !== RelationStereotype.DERIVATION&&
                content.stereotype !== RelationStereotype.COMPARATIVE
            )
            .map(content => `${mapRelationStereotypeToRefactored(content.stereotype)}(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
    
    if (relationStatement){
        relationStatement = `fof(${getNextAxiomId()}_ontology_relations_statement, axiom, (
        ${relationStatement}\n)).`;
    }
    else{
        relationStatement = '';
    }

    var relationWithoutStereotype = project.getAllRelations()
            .filter(content =>
                !content.stereotype ||
                content.stereotype === RelationStereotype.MATERIAL ||
                content.stereotype === RelationStereotype.DERIVATION ||
                content.stereotype === RelationStereotype.COMPARATIVE
            )
            .map(content => `relationType(${getReifiedPrefix()}${content.getName()})`)
            .join(' & \n\t\t\t\t');
    
    if (relationWithoutStereotype){
        relationWithoutStereotype = `fof(${getNextAxiomId()}_ontology_relations_statement_without_estereotype, axiom, (
        ${relationWithoutStereotype}\n)).`;
    }
    else{
        relationWithoutStereotype = '';
    }

    // function generateInstanceOf(project: Project): string{
    //     return project.getAllRelationsByStereotype(RelationStereotype.INSTANTIATION)
    //                 .map(content => `iof(${getReifiedPrefix()}${content.getSourceClass().getName()}, ${getReifiedPrefix()}${content.getTargetClass().getName()}, W)`)
    //                 .join(' & \n\t\t\t\t');
    // }
    // var instantiationAxiom = generateInstanceOf(project)

    // // Geração somente se não for vazio
    // if (instantiationAxiom){
    //     instantiationAxiom = `fof(${getNextAxiomId()}_instantiation_of_types, axiom, (
    // ![W]: (${instantiationAxiom})\n)).`
    // }
    // else{
    //     instantiationAxiom = '';
    // }

    return relationStatement
            //+'\n' + instantiationAxiom
            + '\n' + relationWithoutStereotype
            + '\n';
}
