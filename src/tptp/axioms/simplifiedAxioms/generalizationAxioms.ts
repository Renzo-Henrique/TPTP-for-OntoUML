import { Project, Class, Generalization, GeneralizationSet} from 'ontouml-js';
import {getDisjunctionsOfClassesFormula, getOrFromClassesFormula, getCombinationOfClassesFormula, getAndFromClassesFormula} from '../basicFormulas'
import { getNextAxiomId } from '../idGenerator';

/**
 * Generates TPTP axioms for all generalizations in the project.
 * Each axiom states that an instance of the specific class is also an instance of the general class.
 *
 * @param project - The OntoUML project containing generalizations.
 * @returns A string containing all generalization axioms concatenated by newlines.
 */
export function generalizationAllAxioms(project: Project): string {
  
  /**
   * Generates a TPTP axiom for a single generalization.
   *
   * @param generalization - A generalization relation between classes.
   * @returns A string representing the TPTP axiom for the generalization.
   */
  function generalizationAxiom(generalization: Generalization): string{
    return `fof(${getNextAxiomId()}improper_especialization_of_created_class_${generalization.specific.getName()}_generalizing_${generalization.general.getName()}, axiom, (
    ![X, W]: (${generalization.specific.getName()}(X, W)  => (${generalization.general.getName()}(X, W) ))
  )).`
  }

  return project.getAllGeneralizations()
    .map(content => generalizationAxiom(content))
    .join('\n');
}



/**
 * Generates TPTP axioms for all generalization sets in the project.
 *
 * @param project - The OntoUML project containing generalization sets.
 * @returns A string containing all generalization set axioms concatenated by newlines.
 */
export function generalizationSetAllAxioms(project: Project): string {
  
  return project.getAllGeneralizationSets()
    .map(content => generalizationSetAxiom(content))
    .join('\n');
}

/**
 * Generates TPTP axioms for a single generalization set,
 * including disjointness, completeness, and incompleteness axioms depending on the set's properties.
 *
 * @param generalizationSet - The generalization set to generate axioms for.
 * @returns A string containing the TPTP axioms for the generalization set.
 */
function generalizationSetAxiom(generalizationSet: GeneralizationSet): string{

  /**
   * Generates an axiom expressing that the specific classes in the set are disjoint.
   *
   * @returns A string representing the disjointness axiom for the generalization set.
   */
  function disjointGeneralizationSetAxiom(): string{
    const comment = `% Disjoint set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t';
    
    const disjunctionAxiom = getDisjunctionsOfClassesFormula(generalizationSet.getSpecificClasses(), additionalTabs, 'X', 'W');
    return comment + `fof(${getNextAxiomId()}generalization_set_disjoint_${generalizationSet.getName()}, axiom, (
    ![X, W]: (${disjunctionAxiom})\n)).`;
  }

  /**
   * Placeholder for an axiom describing possible overlaps between specific classes in the generalization set.
   * Currently returns an empty string.
   *
   * @returns An empty string (to be implemented).
   */
  function overlapGeneralizationSetAxiom(): string{
    //TODO:: teria que fazer um axioma que descreve que existem 0011, 1100, 0110 
    // (sendo n o total de especializações, existem m classes juntas que podem ser possíveis, mas que não são as outras n - m possíveis)

    //TODO:: verificar, mas deveria ter uma flag para utilizar ou não essa "expansão" da ontologia?
     return '';
    //TODO:: Consertar
    const comment = `% Overlap set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t';
    const combinationOfClasses = getCombinationOfClassesFormula(generalizationSet.getSpecificClasses(), additionalTabs, 'X', 'W');

    return comment + `fof(${getNextAxiomId()}generalization_set_overlap_${generalizationSet.getName()}, axiom, (
    ?[X, W]: (${combinationOfClasses})\n)).`;
  }

  /**
   * Generates an axiom stating that the general class is completely partitioned by its specific classes.
   *
   * @returns A string representing the completeness axiom for the generalization set.
   */
  function completeGeneralizationSetAxiom(): string{
    const comment = `% Complete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;

    return comment + `fof(${getNextAxiomId()}generalization_set_complete_${generalizationSet.getName()}, axiom, (
    ![X, W]: (${generalizationSet.getGeneralClass().getName()}(X, W) => ${getOrFromClassesFormula(generalizationSet.getSpecificClasses(), 'X', 'W')})\n)).`;
  }

  /**
   * Generates an axiom stating that the generalization set is incomplete,
   * meaning there exists some instance of the general class not covered by the specific classes.
   *
   * @returns A string representing the incompleteness axiom for the generalization set.
   */
  function incompleteGeneralizationSetAxiom(): string{
    //TODO:: está certo, mas deveria ter uma flag para utilizar ou não essa "expansão" da ontologia?
    const comment = `% Incomplete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const incompleteAxiom = getOrFromClassesFormula(generalizationSet.getSpecificClasses(), 'X', 'W');


    return comment + `fof(${getNextAxiomId()}generalization_set_incomplete_${generalizationSet.getName()}, axiom, (
  ?[X, W]: (${generalizationSet.getGeneralClass().getName()}(X, W) & ~(${incompleteAxiom} )\n\t\t\t)\n)).`;
  }

  const disjointOrOverlap = generalizationSet.isDisjoint ? disjointGeneralizationSetAxiom() : overlapGeneralizationSetAxiom();
  const incompleteOrComplete = generalizationSet.isComplete ? completeGeneralizationSetAxiom() : incompleteGeneralizationSetAxiom();
  
  return disjointOrOverlap + '\n' + incompleteOrComplete;
}