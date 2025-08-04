import fs from 'fs';
import path from 'path';
import { Project} from 'ontouml-js';
import {worldAndEntity} from './axioms/baseAxioms'
import {refactorNames} from '../common/utils'
//import {getDisjunctionsOfClassesFormula, getOrFromClassesFormula, getCombinationOfClassesFormula} from './basicFormulas'
import {generalizationAllAxioms, generalizationSetAllAxioms} from './axioms/generalizationAxioms'
import {existenceOfSortalInstancesAxiom, existenceOfRigidSortalClassesAxioms, 
        existenceOfAntiRigidSortalClassesAxioms, existenceOfAtLeastOneOfEachClassAxioms,
        disjunctionOfKindsAxiom} from './axioms/taxonomyAxioms'


/**
 * Gera um arquivo .p com a representação TPTP do modelo OntoUML.
 * O arquivo será salvo na pasta:
 * ~/TPTP-for-OntoUML/examples/generated
 *
 * @param project Instância do modelo OntoUML carregado.
 */
export function generateTptpFromProject(filePath: string, project: Project): void {
    const inputDir = path.dirname(filePath);
    const outputDir = path.join(inputDir, 'generated');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const projectName = project.name.getText();
    const fileName = projectName
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/gi, '') + '.p';

    const outputPath = path.join(outputDir, fileName);

    const formulas = generateTptpAxioms(project);
    
    const content = formulas.join('\n');
    //----------
    try {
        fs.writeFileSync(outputPath, content, 'utf-8');
        console.log(`Arquivo TPTP gerado com sucesso em: ${outputPath}`);
    } catch (err) {
        console.error(`Erro ao salvar arquivo .p: ${err}`);
    }
}

export function generateTptpAxioms(project: Project): string[]{
  
  refactorNames(project);
  const formulas: string[] = [];

  formulas.push(worldAndEntity);


  formulas.push('\n\n\n');
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

//export function validateTptpAxioms()




