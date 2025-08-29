import { Project, Class, Generalization, GeneralizationSet} from 'ontouml-js';
import { AvailableInAxiomsClassStereotypes } from '../../../common/newStereotypes';
import { getClassPrefix, getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';


// const worldConstraints = `
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%% WORLD CONSTRAINTS 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// fof(ax_named_classes, axiom, (
//     ![C]: (named_classes(C) <=> (C = classA | C = classB | C = classZ)) 
// )).

// fof(ax_class_types, axiom, (
//   type_(classA) & type_(classB) & type_(classZ)
// )).

// fof(ax_named_classes_negatives, axiom, (
//   ![C]: ((~(C = classA) & ~(C = classB) & ~(C = classZ)) => ~named_classes(C))
// )).

// % Only the explicitly declared classes exist in this world
// fof(ax_world_only_for_declarated_classes, axiom, (
//   ![C]: (type_(C) <=> named_classes(C))
// )).

// % All instantiations must refer to one of the declared classes
// fof(ax_only_declared_classes_have_instances, axiom, (
//   ![X, C, W]: (
//     iof(X, C, W) => named_classes(C)
//   )
// )).

// fof(ax_named_classes_are_different, axiom, (
//   classA != classB &
//   classA != classZ &
//   classB != classZ
// )).
// `

export function existenceOfDeclaredClassesMltAxioms(project: Project): string{
    const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
        .map(content => `C = ${getReifiedPrefix()}${content.getName()}`)
        .join(' | \n\t\t\t\t');
    return `fof(${getNextAxiomId()}_ontology_classes_are_types, axiom, (
    ![C]: (type_(C) <=> (${result})) 
)).`
}

export function reifiedClassesAreDifferentMltAxioms(project: Project): string{
    
    const condicoes: string[] = [];

    const availableClasses = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes);
    for (let i = 0; i < availableClasses.length; i++) {
        for (let j = i + 1; j < project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes).length; j++) {
        condicoes.push(`${getReifiedPrefix()}${availableClasses[i].getName()} != ${getReifiedPrefix()}${availableClasses[j].getName()}`);
        }
    }
    
    const corpo = condicoes.join(" &\n\t\t\t");

    const pairCombinations: [Class, Class][] = getPairCombinations( project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes));
    const result = pairCombinations
                    .map(content => `${getReifiedPrefix()}${content[0].getName()} != ${getReifiedPrefix()}${content[1].getName()}`)
                    .join(" &\n\t\t\t");

    return `fof(${getNextAxiomId()}_reified_classes_are_different, axiom,
  (${result})
).`;
}

export function relationBetweenClassesAndReifiedClassesMltAxioms(project: Project): string{

    return project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
        .map(content => classAndReifiedClassAxiom(content))
        .join('\n');

}

function classAndReifiedClassAxiom(cl: Class): string{
    return `fof(${getNextAxiomId()}_relation_between_class_and_reified_class, axiom,(
          ![X, W]: (iof(X, ${getReifiedPrefix()}${cl.getName()}, W) <=> ${getClassPrefix()}${cl.getName()}(X, W) )
)).`;
}

