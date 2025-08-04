import { Project} from 'ontouml-js';
import {worldAndEntity, refactorNames} from './utils'
//import {getDisjunctionsOfClassesFormula, getOrFromClassesFormula, getCombinationOfClassesFormula} from './basicFormulas'
import {generalizationAllAxioms, generalizationSetAllAxioms} from './generalizationAxioms'
import {existenceOfSortalInstancesAxiom, existenceOfRigidSortalClassesAxioms, 
        existenceOfAntiRigidSortalClassesAxioms, existenceOfAtLeastOneOfEachClassAxioms,
        disjunctionOfKindsAxiom} from './taxonomyAxioms'

export function generateTptpAxioms(project: Project): string[]{
  
  refactorNames(project);
  const formulas: string[] = [];

  formulas.push(worldAndEntity);

  var formulaComment = `% Tudo que existe deve ser instância de sortal`;
  formulas.push(formulaComment);
  formulas.push(existenceOfSortalInstancesAxiom(project));

  formulaComment = `%%%%%%%%\n%%%%%%%%\n% Disjunção entre kinds`;
  formulas.push(formulaComment);
  formulas.push(disjunctionOfKindsAxiom(project));

  formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM SORTAL EM ALGUM MUNDO`;
  formulas.push(formulaComment);
  formulaComment = `% CONTINUAM SENDO INSTÂNCIAS DO MESMO SORTAL EM TODOS OS MUNDOS NO QUAL EXISTAM`;
  formulas.push(formulaComment);
  formulas.push(existenceOfRigidSortalClassesAxioms(project));

  formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM TIPO-ANTI-RIGIDO EM ALGUM MUNDO`;
  formulas.push(formulaComment);
  formulaComment = `% PODEM NÃO SE-LO EM OUTRO MUNDO`;
  formulas.push(formulaComment);
  formulas.push(existenceOfAntiRigidSortalClassesAxioms(project));


  formulaComment = `%%%%%%\n%%%%%%\n%%%%%%\n%Especializações`;
  formulas.push(formulaComment);
  formulas.push(generalizationAllAxioms(project));

  formulaComment = `%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Genset\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`;
  formulas.push(formulaComment);
  formulas.push(generalizationSetAllAxioms(project));

  
  formulaComment = `\n\n%% NAO TENHO CERTEZA SE ISSO É NECESSÁRIO/CORRETO!?!? É PRA SIMULAÇÃO DE MUNDOS?`;
  formulas.push(formulaComment);
  formulaComment = `%% SE FOR, MELHOR DEIXAR NO FINAL E COM UM COMENTÁRIO EXPLICANDO`;
  formulas.push(formulaComment);
  formulas.push(existenceOfAtLeastOneOfEachClassAxioms(project));
  
  return formulas;
}




