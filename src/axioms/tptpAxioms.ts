import { Project, Class} from 'ontouml-js';
import {worldAndEntity, stereotypesWithoutDatatype} from './utils'
//import {getDisjunctionsOfClassesFormula, getOrFromClassesFormula, getCombinationOfClassesFormula} from './basicFormulas'
import {generalizationAllAxioms, generalizationSetAllAxioms} from './generalizationAxioms'
import { refactorNames, printAllClasses, checkEmptyForError } from './utils';
import {existenceOfSortalInstancesAxiom, existenceOfRigidSortalClassesAxioms, existenceOfAntiRigidSortalClassesAxioms, existenceOfAtLeastOneOfEachClassAxioms} from './taxonomyAxioms'


export function generateTptpAxioms(project: Project): string[]{
  printAllClasses(project);
  //----------
  refactorNames(project);
  const formulas: string[] = [];

  formulas.push(worldAndEntity);

  var formulaComment = `% Tudo que existe deve ser instância de sortal`;
  formulas.push(formulaComment);
  formulas.push(existenceOfSortalInstancesAxiom(project));

  formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM SORTAL EM ALGUM MUNDO`;
  formulaComment += `\n% CONTINUAM SENDO INSTÂNCIAS DO MESMO SORTAL EM TODOS OS MUNDOS NO QUAL EXISTAM`;
  formulas.push(formulaComment);
  formulas.push(existenceOfRigidSortalClassesAxioms(project));

  formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM TIPO-ANTI-RIGIDO EM ALGUM MUNDO`;
  formulaComment += `\n% PODEM NÃO SE-LO EM OUTRO MUNDO`;
  formulas.push(formulaComment);
  formulas.push(existenceOfAntiRigidSortalClassesAxioms(project));


  formulaComment = `%%%%%%\n%%%%%%\n%%%%%%\n%Especializações`;
  formulas.push(formulaComment);
  formulas.push(generalizationAllAxioms(project));

  formulaComment = `%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Genset\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`;
  formulas.push(formulaComment);
  formulas.push(generalizationSetAllAxioms(project));

  
  formulaComment = `\n\n%% NAO TENHO CERTEZA SE ISSO É NECESSÁRIO/CORRETO!?!? É PRA SIMULAÇÃO DE MUNDOS?`;
  formulaComment += `\n%% SE FOR, MELHOR DEIXAR NO FINAL E COM UM COMENTÁRIO EXPLICANDO`;
  formulas.push(formulaComment);
  formulas.push(existenceOfAtLeastOneOfEachClassAxioms(project));
  
  return formulas;
}




