import { Project, Class, ClassStereotype, stereotypeUtils } from 'ontouml-js';
import {checkEmptyForError} from './utils'
import * as newStereotypes from './newStereotypes'
import { getDisjunctionsOfClassesFormula } from './basicFormulas';

export function disjunctionOfKindsAxiom(project: Project): string {

  const errorMessage = 'Erro: A ontologia não possui sortal para ser instanciada'
  checkEmptyForError(project.getClassesWithKindStereotype(), errorMessage);

  if (project.getClassesWithKindStereotype().length > 1){
    const additionalTabs = '\t\t\t\t\t\t\t';
  return `fof(ax_disjunction_of_kinds_instances, axiom, (
  ![X, W]: ( ${getDisjunctionsOfClassesFormula(project.getClassesWithKindStereotype(), additionalTabs, 'X', 'W')})
)).`;
  }
  else{
    return '\n\n\n';
  }
  
}

export function existenceOfSortalInstancesAxiom(project: Project): string {

  const errorMessage = 'Erro: A ontologia não possui sortal para ser instanciada'
  checkEmptyForError(project.getClassesWithKindStereotype(), errorMessage);

  const result = project.getClassesWithKindStereotype()
    .map(content => `${content.getName()}(X,W)`)
    .join(' | ');

  return `fof(ax_existence_of_sortal_instances, axiom, (
  ![X, W]: ( exists(X, W) => (${result}))
)).`;
}

export function existenceOfRigidSortalClassesAxioms(project: Project): string {
  const errorMessage = 'Erro: A ontologia não possui rigid sortals';
  //const rigidSortal: Class[] = project.getClassesWithKindStereotype().concat(project.getClassesWithSubkindStereotype());
  const rigidSortal: Class[] = project.getAllClassesByStereotype(newStereotypes.RigidSortalStereotypes);
  checkEmptyForError(rigidSortal, errorMessage);

  return rigidSortal
    .map(content => existenceOfRigidSortalClassAxiom(content))
    .join('\n');
}

export function existenceOfRigidSortalClassAxiom(rigidSortalClass: Class): string{
    if(! newStereotypes.isRigidSortalStereotype(rigidSortalClass.stereotype)){
        console.error('Erro: Essa função só pode ser usada para o esteriótipo rigidSortal');
        process.exit(1);
    }
  return `fof(ax_rigid_sortal_ex_${rigidSortalClass.getName()}, axiom, (
  ![X, W1]: (${rigidSortalClass.getName()}(X, W1) => ( 
              (exists(X, W1) &
            ![W2]: ((exists(X, W2) & W1 != W2) => (${rigidSortalClass.getName()}(X, W2)))
    )
  )
))).`
}

export function existenceOfAntiRigidSortalClassesAxioms(project: Project): string {
  /*const phaseAxioms = project.getClassesWithPhaseStereotype()
                  .map(content => existenceOfAntiRigidSortalClassAxiom(content))
                  .join('\n');

  const roleAxioms = project.getClassesWithRoleStereotype()
                  .map(content => existenceOfAntiRigidSortalClassAxiom(content))
                  .join('\n');

  return phaseAxioms + roleAxioms;*/

  return project.getAllClassesByStereotype(newStereotypes.AntiRigidSortalStereotypes)
    .map(content => existenceOfAntiRigidSortalClassAxiom(content))
    .join('\n');
}

export function existenceOfAntiRigidSortalClassAxiom(antiRigidSortalClass: Class): string{
    if(! newStereotypes.isAntiRigidSortalStereotype(antiRigidSortalClass.stereotype)){
        console.error('Erro: Essa função só pode ser usada para o esteriótipo rigidSortal');
        process.exit(1);
    }
  return `fof(ax_antirigid_ex_${antiRigidSortalClass.getName()}, axiom, (
  ![X, W1]: (${antiRigidSortalClass.getName()}(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~${antiRigidSortalClass.getName()}(X, W2)))
    )
  )
)).`
}

export function existenceOfAtLeastOneOfEachClassAxioms(project: Project): string {
  const errorMessage = 'Erro: Pelo menos uma classe deveria existir ';
  checkEmptyForError(project.getAllClassesByStereotype(newStereotypes.AvailableInAxiomsClassStereotypes), errorMessage);
  //return '';
  return project.getAllClassesByStereotype(newStereotypes.AvailableInAxiomsClassStereotypes)
    .map(content => existenceOfAtLeastOneOfClassAxiom(content))
    .join('\n');
}

export function existenceOfAtLeastOneOfClassAxiom(projectClass: Class): string{
  return `fof(ax_exists_at_least_one_of_${projectClass.getName()}, axiom,(
  ?[X, W]: (exists(X, W) & ${projectClass.getName()}(X, W))
)).`
}