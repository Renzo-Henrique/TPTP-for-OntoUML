import fs from 'fs';
import {lowerFirst, camelCase} from 'lodash';
import path from 'path';
import { Project, Class } from 'ontouml-js';
import {worldAndEntity, existenceOfSortalInstancesAxiom, 
    existenceOfRigidSortalClassesAxiom, existenceOfAntiRigidSortalClassesAxiom} from './baseAxioms'
/**
 * Gera um arquivo .p com a representação TPTP do modelo OntoUML.
 * O arquivo será salvo na pasta:
 * /home/renzohgl/projetos/npm-testes/TPTP-for-OntoUML/examples/generated
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

    printAllClasses(project);
    //----------
    refactorNames(project);
    const formulas: string[] = [];

    formulas.push(worldAndEntity);

    //
    const kinds = getNamesFromClasses(project.getClassesWithKindStereotype());
    const subkinds = getNamesFromClasses(project.getClassesWithSubkindStereotype());
    const rigidSortals = kinds.concat(subkinds);

    const phases = getNamesFromClasses(project.getClassesWithPhaseStereotype());
    const roles = getNamesFromClasses(project.getClassesWithRoleStereotype());
    const antiRigidSortals = phases.concat(roles);

    var formulaComment = `% Tudo que existe deve ser instância de sortal`;
    formulas.push(formulaComment);
    formulas.push(existenceOfSortalInstancesAxiom(kinds));

    formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM SORTAL EM ALGUM MUNDO`;
    formulaComment += `\n% CONTINUAM SENDO INSTÂNCIAS DO MESMO SORTAL EM TODOS OS MUNDOS NO QUAL EXISTAM`;
    formulas.push(formulaComment);
    formulas.push(existenceOfRigidSortalClassesAxiom(rigidSortals));

    formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM TIPO-ANTI-RIGIDO EM ALGUM MUNDO`;
    formulaComment += `\n% PODEM NÃO SE-LO EM OUTRO MUNDO`;
    formulas.push(formulaComment);
    formulas.push(existenceOfAntiRigidSortalClassesAxiom(antiRigidSortals));


    formulaComment = `Especializações`;
    formulas.push(formulaComment);
    //formulas.push(specializationOfClassesAxiom(antiRigidSortals));

    //formulaComment = `%% NAO TENHO CERTEZA SE ISSO É NECESSÁRIO/CORRETO!?!? É PRA SIMULAÇÃO DE MUNDOS?`;
    //formulaComment += `\n%% SE FOR, MELHOR DEIXAR NO FINAL E COM UM COMENTÁRIO EXPLICANDO`;
    //formulas.push(formulaComment);
    //formulas.push(project.getAllClasses());

    /*for (const cls of classes) {
        const name = cls.getName();

        if (!name) continue;

        const identifier = name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/gi, '');

        formulas.push(`fof(${identifier}_decl, axiom, class(${identifier})).`);
    }*/

    const content = formulas.join('\n');

    //----------
    try {
        fs.writeFileSync(outputPath, content, 'utf-8');
        console.log(`Arquivo TPTP gerado com sucesso em: ${outputPath}`);
    } catch (err) {
        console.error(`Erro ao salvar arquivo .p: ${err}`);
    }
}

/**
 * Fazer a função preetify_formula(formula: string) : string
 * 
 * A ideia é que após gerar as fórmulas essa opção deixe mais legível
 * Talvez seja mais fácil já gerar "embelezado"
 * 
 * Como fazer??
 * Dar enter após segundo vírgula
 * 
 */

/**
 * Fazer a função make_formula(nome_axioma, formula) : string
 * 
 * Geralzona que coloca retorna: fof(nome_axioma, axiom, formula).
 * 
 * 
 * Dar enter após segundo vírgula
 * 
 */

function refactorNames(project: Project): void {
  const classes = project.getAllClasses();

  for (const cls of classes) {
    const original = cls.getName();

    if (!original) continue;

    const camel = camelCase(original);
    const newName = `cl_${camel}`;
    cls.setName(newName);
  }
}

function getNamesFromClasses(classes: Class[]): string[]{
    return classes.map(content => content.getName());
}

function printAllClasses(project: Project): void{
    const consoleOutput = project.model.getAllClasses()
    .map(content => `${content.getName()} :: ${content.stereotype}`)
    .join('\n');

    console.log(consoleOutput);
}