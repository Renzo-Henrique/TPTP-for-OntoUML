import { Project, Class, Generalization, GeneralizationSet} from 'ontouml-js';
import {getDisjunctionsOfClassesFormula, getOrFromClassesFormula, getCombinationOfClassesFormula, getAndFromClassesFormula} from './basicFormulas'

export function generalizationAllAxioms(project: Project): string {
  return project.getAllGeneralizations()
    .map(content => generalizationAxiom(content))
    .join('\n');
}

export function generalizationAxiom(generalization: Generalization): string{
  return `fof(ax_especialization_of_created_class_${generalization.specific.getName()}_generalizing_${generalization.general.getName()}, axiom, (
  ![X, W]: (${generalization.specific.getName()}(X, W)  => ${generalization.general.getName()}(X, W))
)).`
}

export function generalizationSetAllAxioms(project: Project): string {
  
  return project.getAllGeneralizationSets()
    .map(content => generalizationSetAxiom(content))
    .join('\n');
}

export function generalizationSetAxiom(generalizationSet: GeneralizationSet): string{

  function disjointGeneralizationSetAxiom(): string{
    const comment = `% Disjoint set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t';
    
    const disjunctionAxiom = getDisjunctionsOfClassesFormula(generalizationSet.getSpecificClasses(), additionalTabs, 'X', 'W');
    return comment + `fof(ax_generalization_set_disjoint_${generalizationSet.getName()}, axiom, (
    ![X, W]: (${disjunctionAxiom})\n)).`;
  }

  function overlapGeneralizationSetAxiom(): string{
    //TODO:: Esse axioma está expandindo muito o escopo da ontologia, sobrecarregando o provador. Acho que deve ser retirado.
    return '';
    // const comment = `% Overlap set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    // const additionalTabs = '\t\t\t\t\t\t\t';
    // const combinationOfClasses = getCombinationOfClassesFormula(generalizationSet.getSpecificClasses(), additionalTabs, 'X', 'W');

    // return comment + `fof(ax_generalization_set_overlap_${generalizationSet.getName()}, axiom, (
    // ?[X, W]: (${combinationOfClasses})\n)).`;
  }

  function completeGeneralizationSetAxiom(): string{
    const comment = `% Complete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;

    return comment + `fof(ax_generalization_set_complete_${generalizationSet.getName()}, axiom, (
    ![X, W]: (${generalizationSet.getGeneralClass().getName()}(X, W) => ${getOrFromClassesFormula(generalizationSet.getSpecificClasses(), 'X', 'W')})\n)).`;
  }

  function incompleteGeneralizationSetAxiom(): string{
    const comment = `% Incomplete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const incompleteAxiom = getOrFromClassesFormula(generalizationSet.getSpecificClasses(), 'X', 'W');


    return comment + `fof(ax_generalization_set_incomplete_${generalizationSet.getName()}, axiom, (
  ?[X, W]: (${generalizationSet.getGeneralClass().getName()}(X, W) & ~(${incompleteAxiom} )\n\t\t\t)\n)).`;
  }

  const disjointOrOverlap = generalizationSet.isDisjoint ? disjointGeneralizationSetAxiom() : overlapGeneralizationSetAxiom();
  const incompleteOrComplete = generalizationSet.isComplete ? completeGeneralizationSetAxiom() : incompleteGeneralizationSetAxiom();
  
  return disjointOrOverlap + '\n' + incompleteOrComplete;
}