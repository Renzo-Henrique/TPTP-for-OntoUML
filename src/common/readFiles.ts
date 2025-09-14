import path from 'path';
import fs from 'fs';

const ufoFormalizationInTPTPPath: string = path.resolve(process.cwd(), "ufoFormalizationInTPTP");
const axiomsBasePath: string = path.resolve(ufoFormalizationInTPTPPath, 'axioms');

/**
 * Reads the contents of all axiom files in the given base directory.
 *
 * @returns A dictionary where keys are filenames and values are the file contents.
 */
export async function readAxiomFiles(): Promise<string> {
    // const filenames = [
    //     "01_taxonomy_thing.p",
    //     "02_taxonomy_abstract_individual.p",
    //     "03_taxonomy_endurant.p",
    //     "04_taxonomy_endurant_type_nature.p",
    //     "05_taxonomy_endurant_types_properties.p",
    //     "06_instantiation.p",
    //     "07_specialization.p",
    //     "08_rigidity_and_sortality.p",
    //     "09_endurant_types_definitions.p",
    //     "10_ultimate_sortals.p",
    // ];

    const filenames = [
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
    for (const fname of filenames) {
        const fpath = path.join(axiomsBasePath, fname);
        const content = fs.readFileSync(fpath, "utf-8");
        allContent += `%%% ${fname}\n${content}\n\n`; // concatena com comentário do nome do arquivo
    }

    return allContent.trim() + '\n';
}