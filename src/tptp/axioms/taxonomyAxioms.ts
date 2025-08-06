import { Project, Class, stereotypeUtils } from 'ontouml-js';
import {checkEmptyForError} from '../../common/utils'
import * as newStereotypes from '../../common/newStereotypes'
import { getDisjunctionsOfClassesFormula } from './basicFormulas';
import { getNextAxiomId } from './idGenerator';

export function disjunctionOfKindsAxiom(project: Project): string {

  //TODO:: fazer checagem de erros?

  if (project.getClassesWithKindStereotype().length > 1){
    const additionalTabs = '\t\t\t\t\t\t\t';
  return `fof(${getNextAxiomId()}disjunction_of_kinds_instances, axiom, (
  ![X, W]: ( ${getDisjunctionsOfClassesFormula(project.getClassesWithKindStereotype(), additionalTabs, 'X', 'W')})
)).`;
  }
  else{
    return '\n\n\n';
  }
  
}

export function existenceOfSortalInstancesAxiom(project: Project): string {
  //TODO:: fazer checagem de erros?
  const result = project.getClassesWithKindStereotype()
    .map(content => `${content.getName()}(X, W)`)
    .join(' | ');

  return `fof(${getNextAxiomId()}existence_of_sortal_instances, axiom, (
  ![X, W]: ( exists(X, W) => (${result}))
)).`;
}

export function existenceOfRigidClassesAxioms(project: Project): string {
  //TODO:: fazer checagem de erros?
  const rigids: Class[] = project.getAllClassesByStereotype(stereotypeUtils.RigidStereotypes);

  return rigids
    .map(content => existenceOfRigidClassAxiom(content))
    .join('\n');
}

function existenceOfRigidClassAxiom(rigidClass: Class): string{
  return `fof(${getNextAxiomId()}rigid_sortal_ex_${rigidClass.getName()}, axiom, (
  ![X, W1]: (${rigidClass.getName()}(X, W1) => ( 
              (exists(X, W1) &
            ![W2]: ((exists(X, W2) & W1 != W2) => (${rigidClass.getName()}(X, W2)))
    )
  )
))).`
}

export function existenceOfAntiRigidClassesAxioms(project: Project): string {

  return project.getAllClassesByStereotype(stereotypeUtils.AntiRigidStereotypes)
    .map(content => existenceOfAntiRigidClassAxiom(content))
    .join('\n');
}

function existenceOfAntiRigidClassAxiom(antiRigidClass: Class): string{
  return `fof(${getNextAxiomId()}antirigid_ex_${antiRigidClass.getName()}, axiom, (
  ![X, W1]: (${antiRigidClass.getName()}(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~${antiRigidClass.getName()}(X, W2)))
    )
  )
)).`
}

export function existenceOfAtLeastOneOfEachClassAxioms(project: Project): string {
  //TODO:: deveria ter uma flag para garantir esse escopo para os provadores?
  const errorMessage = 'Erro: Pelo menos uma classe deveria existir ';
  checkEmptyForError(project.getAllClassesByStereotype(newStereotypes.AvailableInAxiomsClassStereotypes), errorMessage);
  
  return project.getAllClassesByStereotype(newStereotypes.AvailableInAxiomsClassStereotypes)
    .map(content => existenceOfAtLeastOneOfClassAxiom(content))
    .join('\n');
}

function existenceOfAtLeastOneOfClassAxiom(projectClass: Class): string{
  return `fof(${getNextAxiomId()}exists_at_least_one_of_${projectClass.getName()}, axiom,(
  ?[X, W]: (exists(X, W) & ${projectClass.getName()}(X, W))
)).`
}