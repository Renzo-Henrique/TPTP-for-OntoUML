import { Project, Class} from 'ontouml-js';
import {checkEmptyForError, stereotypesWithoutDatatype} from './utils'

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
  const rigidSortal: Class[] = project.getClassesWithKindStereotype().concat(project.getClassesWithSubkindStereotype());

  checkEmptyForError(rigidSortal, errorMessage);

  return rigidSortal
    .map(content => existenceOfRigidSortalClassAxiom(content))
    .join('\n');
}

export function existenceOfRigidSortalClassAxiom(projectClass: Class): string{
  return `fof(ax_rigid_sortal_ex_${projectClass.getName()}, axiom, (
  ![X, W1]: (${projectClass.getName()}(X, W1) => ( 
              (exists(X, W1) &
            ![W2]: ((exists(X, W2) & W1 != W2) => (${projectClass.getName()}(X, W2)))
    )
  )
))).`
}

export function existenceOfAntiRigidSortalClassesAxioms(project: Project): string {
  const phaseAxioms = project.getClassesWithPhaseStereotype()
                  .map(content => existenceOfAntiRigidSortalClassAxiom(content))
                  .join('\n');

  const roleAxioms = project.getClassesWithRoleStereotype()
                  .map(content => existenceOfAntiRigidSortalClassAxiom(content))
                  .join('\n');

  return phaseAxioms + roleAxioms;
}

export function existenceOfAntiRigidSortalClassAxiom(projectClass: Class): string{
  return `fof(ax_antirigid_ex_${projectClass.getName()}, axiom, (
  ![X, W1]: (${projectClass.getName()}(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~${projectClass.getName()}(X, W2)))
    )
  )
)).`
}

export function existenceOfAtLeastOneOfEachClassAxioms(project: Project): string {
  const errorMessage = 'Erro: Pelo menos uma classe deveria existir ';
  checkEmptyForError(project.getAllClassesByStereotype(stereotypesWithoutDatatype), errorMessage);
  //return '';
  return project.getAllClassesByStereotype(stereotypesWithoutDatatype)
    .map(content => existenceOfAtLeastOneOfClassAxiom(content))
    .join('\n');
}

export function existenceOfAtLeastOneOfClassAxiom(projectClass: Class): string{
  return `fof(ax_exists_at_least_one_of_${projectClass.getName()}, axiom,(
  ?[X, W]: (exists(X, W) & ${projectClass.getName()}(X, W))
)).`
}