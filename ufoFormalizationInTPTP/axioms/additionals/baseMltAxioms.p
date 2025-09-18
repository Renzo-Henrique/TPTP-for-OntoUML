%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% Disjointness
%
% Axioms for reified class disjointness.
% 
% - `disjointWith(C1, C2)` ⇔ C1 ≠ C2 ∧ no instance belongs to both in any world.
% - Symmetric: if C1 is disjoint with C2, then C2 is disjoint with C1.
% - Irreflexive: no class is disjoint with itself.
%

% A class C1 is disjoint with C2 iff they are different and share no instance in any world
fof(ax_disjointWith, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) <=>
              (monadicType(C1) & monadicType(C2)  & (C1 != C2) & ~?[X,W]: (iof(X, C1, W) & iof(X, C2, W)))
  )
)).

% Disjointness is symmetric: if C1 is disjoint with C2, then C2 is disjoint with C1
fof(ax_disjointWith_symmetry, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => disjointWith(C2, C1))
)).

% No class is disjoint with itself (irreflexivity)
fof(ax_disjointWith_irreflexivity, axiom, (
  ![C1]: (~disjointWith(C1, C1))
)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% Overlap
%
% Axioms for reified class overlap.
%
% - `overlappingWith(C1, C2)` ⇔ ∃x,w such that x ∈ C1 and x ∈ C2 in some world w.
% - Symmetric: if C1 overlaps C2, then C2 overlaps C1.
% - Reflexive: every class overlaps with itself (if it is a type).
%

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
  ![C]: (monadicType(C) => overlappingWith(C, C))
)).

% Disjoint classes cannot overlap
fof(ax_disjoint_implies_not_overlapping, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => ~overlappingWith(C1, C2))
)).

