import path from 'path';
import fs from 'fs';

const ufoFormalizationInTPTPPath: string = path.resolve(process.cwd(), "ufoFormalizationInTPTP/axioms");
const ufoAxiomsPath: string = path.resolve(ufoFormalizationInTPTPPath, 'ufoModules');
const additionalsAxiomsPath: string = path.resolve(ufoFormalizationInTPTPPath, 'additionals');

/**
 * Reads the contents of all axiom files in the given base directory.
 *
 * @returns A dictionary where keys are filenames and values are the file contents.
 */
export async function readAxiomFiles(): Promise<string> {
    
    const ufoModulesFileNames = [
        "01_taxonomy_thing.p",
        "02_taxonomy_abstract_individual.p",
        "03_taxonomy_endurant.p",
        "04_taxonomy_endurant_type_nature.p",
        "05_taxonomy_endurant_types_properties.p",
        "06_instantiation.p",
        "07_specialization.p",
        "08_rigidity_and_sortality.p",
        "09_endurant_types_definitions.p",
        "10_ultimate_sortals.p",
        "11_mereology.p",
        "12_composition.p",
        "13_constitution.p",
        "14_existential_dependence.p",
        "15_moments_and_inherence.p",
        "16_relators.p",
        "17_characterization.p",
        "18_qualities.p",
        "19_endurants_and_perdurants.p",
    ];

    let allContent = "";
    for (const fname of ufoModulesFileNames) {
        const fpath = path.join(ufoAxiomsPath, fname);
        const content = fs.readFileSync(fpath, "utf-8");
        allContent += `%%% ${fname}\n${content}\n\n`; // concatena com comentário do nome do arquivo
    }
    allContent += '\n\n%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%% Beginning of included Axioms %%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%\n\n\n';

    const additionalsFileNames = [
        "baseMltAxioms.p",
        "baseClassAxioms.p",
        "baseRelationAxioms.p",
    ];
    for (const fname of additionalsFileNames) {
        const fpath = path.join(additionalsAxiomsPath, fname);
        const content = fs.readFileSync(fpath, "utf-8");
        allContent += `%%% ${fname}\n${content}\n\n`; // concatena com comentário do nome do arquivo
    }

    return allContent.trim() + '\n';
}