import fs from 'fs';

import path from 'path';
import { Project} from 'ontouml-js';
import {generateTptpAxioms} from '../axioms/tptpAxioms'
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



