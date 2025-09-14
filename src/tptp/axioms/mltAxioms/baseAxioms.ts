
/** 
 * Imports original UFO axioms (taxonomy, instantiation, specialization, etc.)
 * from `.p` files. 
 *
 * @note Currently commented out in `baseMltAxiom`, but may be re-enabled when
 * full ontology axioms are required.
 */
const includesMlt = `
include('./originalAxioms/01_taxonomy_thing.p').
include('./originalAxioms/02_taxonomy_abstract_individual.p').
include('./originalAxioms/03_taxonomy_endurant.p').
include('./originalAxioms/04_taxonomy_endurant_type_nature.p').
include('./originalAxioms/05_taxonomy_endurant_types_properties.p').
include('./originalAxioms/06_instantiation.p').
include('./originalAxioms/07_specialization.p').
include('./originalAxioms/08_rigidity_and_sortality.p').
include('./originalAxioms/09_endurant_types_definitions.p').
include('./originalAxioms/10_ultimate_sortals.p').\n\n
`

/**
 * Axioms for reified class disjointness.
 * 
 * @logic
 * - `disjointWith(C1, C2)` ⇔ C1 ≠ C2 ∧ no instance belongs to both in any world.
 * - Symmetric: if C1 is disjoint with C2, then C2 is disjoint with C1.
 * - Irreflexive: no class is disjoint with itself.
 */
const disjointnessMlt = `
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

/**
 * Axioms for reified class overlap.
 *
 * @logic
 * - `overlappingWith(C1, C2)` ⇔ ∃x,w such that x ∈ C1 and x ∈ C2 in some world w.
 * - Symmetric: if C1 overlaps C2, then C2 overlaps C1.
 * - Reflexive: every class overlaps with itself (if it is a type).
 */
const overlapMlt = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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

/**
 * Compatibility axiom between disjointness and overlap.
 *
 * @logic
 * - If two reified classes are disjoint, then they cannot overlap.
 */
const disjointCantOverlapMlt = `% Disjoint classes cannot overlap
fof(ax_disjoint_implies_not_overlapping, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => ~overlappingWith(C1, C2))
)).`;

/**
 * Sortality constraint: all instances must belong to some Kind.
 *
 * @logic
 * - If x exists in some world w, then ∃C such that Kind(C) ∧ iof(x,C,w).
 * - Ensures that only kinds (ultimate sortals) can have instances.
 */
const allInstancesHaveAKindMlt = `
fof(ax_all_instances_have_a_kind, axiom, (
  ![X, W]: ( exists(X, W) => (
    ?[C]: ( kind(C) & iof(X, C, W) ) 
))
)).`


export const baseMltAxiom = //includesMlt + '\n'
                            disjointnessMlt + '\n' +
                            overlapMlt + '\n' + 
                            disjointCantOverlapMlt + '\n' +
                            //allInstancesHaveAKindMlt + '\n' +
                            '';



//connects(t1,t2,r,w)