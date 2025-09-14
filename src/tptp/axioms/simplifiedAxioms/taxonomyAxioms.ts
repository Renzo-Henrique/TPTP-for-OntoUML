import { Project, Class, stereotypeUtils } from 'ontouml-js';
import {checkEmptyForError} from '../../../common/utils'
import { getDisjunctionsOfClassesFormula } from '../basicFormulas';
import { getNextAxiomId } from '../idGenerator';
import { ClassStereotypesAvailableInAxioms } from '../../../common/newClassStereotypes';


/**
 * Generates a TPTP axiom stating that instances of different kinds are disjoint.
 * If there is only one kind class, the axiom is skipped.
 *
 * @param project - The OntoUML project to extract kind classes from.
 * @returns A string containing the TPTP axiom, or empty lines if not applicable.
 */
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

/**
 * Generates a TPTP axiom enforcing that all existing individuals are instances of some sortal.
 *
 * @param project - The OntoUML project containing sortal classes.
 * @returns A string representing the TPTP axiom.
 */
export function existenceOfSortalInstancesAxiom(project: Project): string {
  return '';
  checkEmptyForError(project.getClassesWithKindStereotype(), 'Your ontology must have at least one kind class stereotype to be instatiable')
  //TODO:: fazer checagem de erros?
  const result = project.getClassesWithKindStereotype()
    .map(content => `${content.getName()}(X, W)`)
    .join(' | ');

  return `fof(${getNextAxiomId()}existence_of_sortal_instances, axiom, (
    ![X, W]: ( exists(X, W) => (${result}))
  )).`;
}

/**
 * Generates TPTP axioms stating that individuals that are instances of rigid types
 * in one world must be instances of the same type in all worlds where they exist.
 *
 * @param project - The OntoUML project containing rigid classes.
 * @returns A string with all rigid class axioms joined by newlines.
 */
export function existenceOfRigidClassesAxioms(project: Project): string {
  //TODO:: fazer checagem de erros?
  const rigids: Class[] = project.getAllClassesByStereotype(stereotypeUtils.RigidStereotypes);

  /**
 * Generates the TPTP axiom for a single rigid class. 
 * States that individuals which are instances of a rigid type in one world 
 * must also be instances of the same type in all other worlds where they exist.
 *
 * @param rigidClass - A class marked as rigid.
 * @returns A string representing the rigid class axiom.
 */
  function existenceOfRigidClassAxiom(rigidClass: Class): string{
    return `fof(${getNextAxiomId()}rigid_ex_${rigidClass.getName()}, axiom, (
    ![X, W1]: (${rigidClass.getName()}(X, W1) => ( 
                (exists(X, W1) &
              ![W2]: ((exists(X, W2) & W1 != W2) => (${rigidClass.getName()}(X, W2)))
      )
    )\n\t\t))).`
  }
  return rigids
    .map(content => existenceOfRigidClassAxiom(content))
    .join('\n');
}



/**
 * Generates TPTP axioms for all anti-rigid classes, stating that
 * individuals can stop being instances of such classes in some other world.
 *
 * @param project - The OntoUML project containing anti-rigid classes.
 * @returns A string with all anti-rigid class axioms joined by newlines.
 */
export function existenceOfAntiRigidClassesAxioms(project: Project): string {
  /**
 * Generates the TPTP axiom for a single anti-rigid class.
 * States that individuals may not be instances of such classes in some other worlds.
 *
 * @param antiRigidClass - A class marked as anti-rigid.
 * @returns A string representing the anti-rigid class axiom.
 */
  function existenceOfAntiRigidClassAxiom(antiRigidClass: Class): string{
    return `fof(${getNextAxiomId()}antirigid_ex_${antiRigidClass.getName()}, axiom, (
    ![X, W1]: (${antiRigidClass.getName()}(X, W1) => (
              ?[W2]: (exists(X, W2) & W1 != W2 & (~${antiRigidClass.getName()}(X, W2)))
      )
    )\n)).`
  }

  return project.getAllClassesByStereotype(stereotypeUtils.AntiRigidStereotypes)
    .map(content => existenceOfAntiRigidClassAxiom(content))
    .join('\n');
}



/**
 * Generates TPTP axioms ensuring that at least one instance of each class exists
 * in some world. Only classes included in `AvailableInAxiomsClassStereotypes` are considered.
 *
 * @param project - The OntoUML project containing the model.
 * @returns A string with all axioms asserting at least one instance per class.
 * @throws If no eligible classes are found in the project.
 */
export function existenceOfAtLeastOneOfEachClassAxioms(project: Project): string {
  //TODO:: deveria ter uma flag para garantir esse escopo para os provadores?
  const errorMessage = 'Error: The ontology must have at least one class';
  checkEmptyForError(project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms), errorMessage);
  /**
 * Generates a TPTP axiom asserting that at least one instance of the given class exists
 * in some world.
 *
 * @param projectClass - The OntoUML class for which the axiom should be created.
 * @returns A string representing the TPTP axiom.
 */
  function existenceOfAtLeastOneOfClassAxiom(projectClass: Class): string{
    return `fof(${getNextAxiomId()}exists_at_least_one_of_${projectClass.getName()}, axiom,(
    ?[X, W]: (exists(X, W) & ${projectClass.getName()}(X, W))
  )).`
  }
  return project.getAllClassesByStereotype(ClassStereotypesAvailableInAxioms)
    .map(content => existenceOfAtLeastOneOfClassAxiom(content))
    .join('\n');
}

