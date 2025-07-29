import { Project, ClassStereotype } from 'ontouml-js';
import {camelCase} from 'lodash';

export const worldAndEntity = `%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Existência de mundos e entidades
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Existe pelo menos um mundo
fof(ax_exists_world, axiom,(
  ?[W]: world(W)
)).
% Existe pelo menos uma entidade
fof(ax_exists_entity, axiom,(
  ?[E]: entity(E)
)).
% Entidades são diferentes de mundos
fof(ax_entity_different_than_world, axiom, (
  ![X, W]: ( exists(X, W)  => (X != W & entity(X) & world(W)))
)).`;


export const stereotypesWithoutDatatype = Object.values(ClassStereotype).filter(
  value => value !== ClassStereotype.DATATYPE
);

export function checkEmptyForError(elements: any[], errorMessage: string): void{

  if(elements.length === 0) {
    console.error(errorMessage);
    process.exit(1);
  }
}

export function refactorNames(project: Project): void {
  const classes = project.getAllClasses();

  for (const cls of classes) {
    const original = cls.getName();

    if (!original) continue;

    const camel = camelCase(original);
    const newName = `cl_${camel}`;
    cls.setName(newName);
  }
}

export function printAllClasses(project: Project): void{
    const consoleOutput = project.model.getAllClasses()
    .map(content => `${content.getName()} :: ${content.stereotype}`)
    .join('\n');

    console.log(consoleOutput);
}