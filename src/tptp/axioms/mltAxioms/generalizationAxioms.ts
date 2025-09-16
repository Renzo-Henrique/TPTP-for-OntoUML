import { Project, Class, Generalization, GeneralizationSet} from 'ontouml-js';
import {getDisjunctionsOfClassesFormula, getOrFromClassesFormula, getFactorialCombinationOfClassesFormula, getAndFromClassesFormula} from '../basicFormulas'
import { getNextAxiomId, getReifiedPrefix } from '../idGenerator';
import { getPairCombinations } from '../basicFormulas';
import { ifError } from 'assert';

/**
 * Generates TPTP axioms for all generalizations in the project.
 * Each axiom states that an instance of the specific class is also an instance of the general class.
 *
 * @param project - The OntoUML project containing generalizations.
 * @returns A string containing all generalization axioms concatenated by newlines.
 */
export function generalizationAllMltAxioms(project: Project): string {
  
  /**
   * Generates a TPTP axiom for a single generalization.
   *
   * @param generalization - A generalization relation between classes.
   * @returns A string representing the TPTP axiom for the generalization.
   */
  function generalizationMltAxiom(generalization: Generalization): string{
    return `fof(${getNextAxiomId()}proper_especialization_of_created_class_${generalization.specific.getName()}_generalizing_${generalization.general.getName()}, axiom, (
    properSpecializes(${getReifiedPrefix()}${generalization.specific.getName()}, ${getReifiedPrefix()}${generalization.general.getName()})
  )).`
  }

  return project.getAllGeneralizations()
    .map(content => generalizationMltAxiom(content))
    .join('\n');
}



/**
 * Generates TPTP axioms for all generalization sets in the project.
 *
 * @param project - The OntoUML project containing generalization sets.
 * @returns A string containing all generalization set axioms concatenated by newlines.
 */
export function generalizationSetAllMltAxioms(project: Project): string {
  
  return project.getAllGeneralizationSets()
    .map(content => generalizationSetMltAxiom(content))
    .join('\n');
}

/**
 * Generates TPTP axioms for a single generalization set,
 * including disjointness, completeness, and incompleteness axioms depending on the set's properties.
 *
 * @param generalizationSet - The generalization set to generate axioms for.
 * @returns A string containing the TPTP axioms for the generalization set.
 */
function generalizationSetMltAxiom(generalizationSet: GeneralizationSet): string{

  /**
   * Generates an axiom expressing that the specific classes in the set are disjoint.
   *
   * @returns A string representing the disjointness axiom for the generalization set.
   */
  function disjointGeneralizationSetMltAxiom(): string{
    const comment = `% Mlt disjoint set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t';
    // const result = generalizationSet.getSpecificClasses()
    //             .map(content => `properSpecializes(${content.getName()}, ${generalizationSet.getGeneralClass().getName()}) `)
    //             .join(' & \n\t');
    const pairCombinationsOfSpecifics: [Class, Class][] = getPairCombinations(generalizationSet.getSpecificClasses());

    const result = pairCombinationsOfSpecifics
                    .map(content => `disjointWith(${getReifiedPrefix()}${content[0].getName()}, ${getReifiedPrefix()}${content[1].getName()}) `)
                    .join('&\n'+additionalTabs);
    return comment + `fof(${getNextAxiomId()}generalization_set_disjoint_${generalizationSet.getName()}, axiom, (
    ${result}\n)).`;
  }

  /**
   * Placeholder for an axiom describing possible overlaps between specific classes in the generalization set.
   * Currently returns an empty string.
   *
   * @returns An empty string (to be implemented).
   */
  function overlapGeneralizationSetMltAxiom(): string{
    //TODO:: verificar, mas deveria ter uma flag para utilizar ou não essa "expansão" da ontologia?
    //TODO:: Deveria fazer exaustivamente cada possibilidade?
    const comment = `% Mlt overlap set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t';
    const pairCombinationsOfSpecifics: [Class, Class][] = getPairCombinations(generalizationSet.getSpecificClasses());

    const result = pairCombinationsOfSpecifics
                    .map(content => `overlappingWith(${getReifiedPrefix()}${content[0].getName()}, ${getReifiedPrefix()}${content[1].getName()})`)
                    .join('&\n'+additionalTabs);
    return comment + `fof(${getNextAxiomId()}generalization_set_overlapping_${generalizationSet.getName()}, axiom, (
    ${result}\n)).`;
  }

  /**
   * Generates an axiom stating that the general class is completely partitioned by its specific classes.
   *
   * @returns A string representing the completeness axiom for the generalization set.
   */
  function completeGeneralizationSetMltAxiom(): string{
    const comment = `% Mlt complete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t\t\t';
    const result = generalizationSet.getSpecificClasses()
                    .map(content => `iof(X, ${getReifiedPrefix()}${content.getName()}, W)`)
                    .join(' |\n'+additionalTabs)

    return comment + `fof(${getNextAxiomId()}generalization_set_complete_${generalizationSet.getName()}, axiom, (
    ![X, W]: (iof(X, ${getReifiedPrefix()}${generalizationSet.getGeneralClass().getName()}, W) => (\n${additionalTabs}${result}\n${additionalTabs}))\n)).`;
  }

  /**
   * Generates an axiom stating that the generalization set is incomplete,
   * meaning there exists some instance of the general class not covered by the specific classes.
   *
   * @returns A string representing the incompleteness axiom for the generalization set.
   */
  function incompleteGeneralizationSetMltAxiom(): string{
    //TODO:: está certo?, mas deveria ter uma flag para utilizar ou não essa "expansão" da ontologia?
    return '';
    const comment = `% Mlt incomplete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t\t\t';
    const result = generalizationSet.getSpecificClasses()
                    .map(content => `iof(X, ${getReifiedPrefix()}${content.getName()}, W)`)
                    .join(' |\n'+additionalTabs)

    return comment + `fof(${getNextAxiomId()}generalization_set_incomplete_${generalizationSet.getName()}, axiom, (
    ?[X, W]: (iof(X, ${getReifiedPrefix()}${generalizationSet.getGeneralClass().getName()}, W) & ~(\n${additionalTabs}${result}\n${additionalTabs}))\n)).`;
  }

  const disjointOrOverlap = generalizationSet.isDisjoint ? disjointGeneralizationSetMltAxiom() : overlapGeneralizationSetMltAxiom();
  const incompleteOrComplete = generalizationSet.isComplete ? completeGeneralizationSetMltAxiom() : incompleteGeneralizationSetMltAxiom();
  
  return disjointOrOverlap + '\n' + incompleteOrComplete;
}