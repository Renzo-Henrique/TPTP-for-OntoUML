import { Project, Class, Generalization, GeneralizationSet} from 'ontouml-js';
import { AvailableInAxiomsClassStereotypes } from '../../../common/newStereotypes';
import { getNextAxiomId } from '../idGenerator';


const worldConstraints = `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% WORLD CONSTRAINTS 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fof(ax_named_classes, axiom, (
    ![C]: (named_classes(C) <=> (C = classA | C = classB | C = classZ)) 
)).

fof(ax_class_types, axiom, (
  type_(classA) & type_(classB) & type_(classZ)
)).

fof(ax_named_classes_negatives, axiom, (
  ![C]: ((~(C = classA) & ~(C = classB) & ~(C = classZ)) => ~named_classes(C))
)).

% Only the explicitly declared classes exist in this world
fof(ax_world_only_for_declarated_classes, axiom, (
  ![C]: (type_(C) <=> named_classes(C))
)).

% All instantiations must refer to one of the declared classes
fof(ax_only_declared_classes_have_instances, axiom, (
  ![X, C, W]: (
    iof(X, C, W) => named_classes(C)
  )
)).

fof(ax_named_classes_are_different, axiom, (
  classA != classB &
  classA != classZ &
  classB != classZ
)).
`

export function existenceOfDeclaredClassesAxioms(project: Project): string{
    const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
        .map(content => 'C = ' + content.getName())
        .join(' | \n\t\t\t\t');
    return `fof(${getNextAxiomId()}_ontology_classes_are_types, axiom, (
    ![C]: (type_(C) <=> (${result})) 
)).`
}

export function topLevelTaxonomyOfClassesAxioms(project: Project): string{
    const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
        .map(content => `type_(${content.getName()})`)
        .join(' & \n\t\t\t\t');
    return `fof(${getNextAxiomId()}_ontology_classes_are_types, axiom, (
    ${result}
)).`
}

export function differenceBetweenReifiedClassesAxioms(project: Project): string{
    // const result = project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
    // .map(content => `${content.getName()}(X, W)`)
    // .join(' | ');

    // return project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)
    //     .map(content => existenceOfAtLeastOneOfClassAxiom(content))
    //     .join('\n');

     const condicoes: string[] = [];

    for (let i = 0; i < project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes).length; i++) {
        for (let j = i + 1; j < project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes).length; j++) {
        condicoes.push(`${project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)[i].getName()} != ${project.getAllClassesByStereotype(AvailableInAxiomsClassStereotypes)[j].getName()}`);
        }
    }

    const corpo = condicoes.join(" &\n\t\t\t");
    return `fof(${getNextAxiomId()}_ontology_classes_are_differente, axiom,
  (${corpo})
).`;
}

