const disjointnessMLT = `
include('./originalAxioms/01_taxonomy_thing.p').
include('./originalAxioms/02_taxonomy_abstract_individual.p').
include('./originalAxioms/03_taxonomy_endurant.p').
include('./originalAxioms/04_taxonomy_endurant_type_nature.p').
include('./originalAxioms/05_taxonomy_endurant_types_properties.p').
include('./originalAxioms/06_instantiation.p').
include('./originalAxioms/07_specialization.p').
include('./originalAxioms/08_rigidity_and_sortality.p').
include('./originalAxioms/09_endurant_types_definitions.p').
include('./originalAxioms/10_ultimate_sortals.p').


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% Disjointness

% A class C1 is disjoint with C2 iff they are different and share no instance in any world
fof(ax_disjointWith, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) <=>
              ( (C1 != C2) & ~?[X,W]: (iof(X, C1, W) & iof(X, C2, W)))
  )
)).

% Disjointness is symmetric: if C1 is disjoint with C2, then C2 is disjoint with C1
fof(ax_disjointWith_symmetry, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => disjointWith(C2, C1))
)).

% No class is disjoint with itself (irreflexivity)
fof(ax_disjointWith_irreflexivity, axiom, (
  ![C1]: (~disjointWith(C1, C1))
)).`;

const overlapMLT = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% Overlap

% Two classes overlap iff there exists an individual that is instance of both in some world
fof(ax_overlappingWith, axiom, (
  ![C1, C2]: (overlappingWith(C1, C2) <=>
              ( ?[X,W]: (iof(X, C1, W) & iof(X, C2, W)))
  )
)).

% Overlapping is symmetric
fof(ax_overlapping_symmetry, axiom, (
  ![C1, C2]: (overlappingWith(C1, C2) => overlappingWith(C2, C1))
)).

% Any class overlaps with itself (reflexivity)
fof(ax_overlapping_reflexivity, axiom, (
  ![C]: (type_(C) => overlappingWith(C, C))
)).`;

const disjointCantOverlap = `% Disjoint classes cannot overlap
fof(ax_disjoint_implies_not_overlapping, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => ~overlappingWith(C1, C2))
)).`;

export const mltBaseAxiom = disjointnessMLT + '\n' +
                            overlapMLT + '\n' + 
                            disjointCantOverlap + '\n';