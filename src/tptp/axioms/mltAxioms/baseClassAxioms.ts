const typeTaxonomy = `
fof(ax_powerType_estereotype, axiom, (
    ![T]: (powerType(T) => (type_(T)))
)).

`

export const classBaseAxioms = typeTaxonomy
                                + '\n';