
%%%%%%
%%%%%% Relation axioms
%%%%%%


/**
* Connection of types
*
* For every pair of types T1 and T2 and a relation type R,
* If R is declared to connect T1 and T2 (connectsType(T1, T2, R)),
* Then T1 and T2 must be valid types, and R must be a valid relation type.
*/ 
% T1 is connected to T2 through R
fof(ax_connection_of_types, axiom, (
  ![T1, T2, RT]: (connectsType(T1, T2, RT) =>
                      (monadicType(T1) & monadicType(T2) & relationType(RT))
                  )
)).

/**
* Connection of individuals
*
* For every pair of individuals X1 and X2, an relation type R, and a world W,
* If X1 and X2 are connected through R in W (connects(X1, X2, R, W)),
* Then X1 and X2 must be valid individuals, W must be a valid world,
* and R must be a valid relation individual.
*/

% X1 is connected to X2 through R in a world W

% Already introduced
% fof(ax_connection_of_individuals, axiom, (
%   ![X1, X2, R, W]: (connects(X1, X2, R, W) =>
%                       (individual(X1) & individual(X2) & relationType(R) & world(W))
%                   )
% )).

/**
* Cardinality X..* to X..*
*
* Logic of connectsType and connectsIndividuals
*
* For every pair of types T1 and T2 and an relation type RT,
* If RT is declared to connect T1 and T2 (connectsType(T1,T2,RT)),
* Then there must exist:
* - a world W,
* - an individual X1 that is an instance of T1 in W,
* - an individual X2 that is an instance of T2 in W,
* - and an relation individual RI that is an instance of RT in W,
* - such that X1 and X2 are connected through RI in W (connectsIndividuals(X1, X2, R, W)).
*/
% Every connection between types must have at least a world with a connection between individuals 
%     wich are instances of the types
fof(ax_connects_in_types_and_instances_cardinality, axiom, (
  ![T1, T2, RT]: (connectsType(T1, T2, RT) =>
                      (?[W, X1, X2]: (iof(X1, T1, W) & iof(X2, T2, W) &
                                            connects(X1, X2, RT, W) )
                      )
                  )
)).

fof(ax_connects_in_types_and_instances_2, axiom, (
  ![T1, T2, RT]: (connectsType(T1, T2, RT) =>
                      (![X1, X2, W]: (connects(X1, X2, RT, W) => (iof(X1, T1, W) & iof(X2, T2, W))))
                  )
                  
)).




%%%%%%
%%%%%% Estereotypes 
%%%%%%

% (47). mediation(U, UR) =def Universal(U) ∧ RelatorUniversal(UR) ∧ ∀x (x::U → ∃r r::UR ∧ m(r,x)) 
%
% RT mediates a type T
fof(ax_mediation_type_taxonomy, axiom, (
  ![RT, T]: (mediatesType(RT, T) => (
              relatorType(RT) & endurantType(T))
            )
)).

fof(ax_mediation_type_definition, axiom, (
  ![RT, T]: (mediatesType(RT, T) <=> (
              relatorType(RT) & endurantType(T)  & ![X, W]: (iof(X, T, W) => ?[R, W]: (iof(R, RT, W) & mediates(R, X)))
              )
            )
)).

% verify /3 type relation
% fof(ax_mediation_type_definition, axiom, (
%   ![RT, T, RelationType]: (mediatesType(RT, T, RelationType) <=> (
%               relatorType(RT) & endurantType(T)  & ![X, W]: (iof(X, T, W) => ?[R, W]: (iof(R, RT, W) & mediates(R, X) & connects(R, X, RelationType, W)))
%               )
%             )
% )).


% a mediation relation is reified as connecting R and T throught the mediation (Relation)
fof(ax_mediation_has_a_relation_type, axiom, (
  ![RelatorType, T]: (mediatesType(RelatorType, T) => ?[RelationType]: (connectsType(RelatorType, T, RelationType)))
)).


fof(ax_characterization_taxonomy, axiom, (
  ![MT, ET]: (characterizes(MT,ET) => (endurantType(ET) & momentType(MT)))
)).

fof(ax_characterization_has_a_relation_type, axiom, (
  ![MT, ET]: (characterizes(MT,ET) => ?[RelationType]: (connectsType(MT, ET, RelationType)))
)).


/*

∀t iof(t, 1stOT) ↔ (∃y iof(y,t) ∧ (∀x iof(x,t) → iof(x,Individual)))
∀t iof(t, 2ndOT) ↔ (∃y iof(y,t) ∧ (∀t1 iof(t1,t) → iof(t1,2ndOT)))
∀t iof(t, 3rdOT) ↔ (∃y iof(y,t) ∧ (∀t1 iof(t1,t) → iof(t1,3rdOT)))


*/
fof(ax_instantiation_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (instantiation(T1,T2) => (monadicType(T1) & powerType(T2)))
)).

fof(ax_ufo_b_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (instantiation(T1,T2) => ?[RT]: (connectsType(T1, T2, RT)))
)).



/*
categorizes(t1, t2) ↔ Type(t1) ∧ ∀t3(t3 :: t1 → t3 < t2)26

esse t3 :: t1 também é no nível de tipos? Se sim, então é outro instantiation

% instantiation target is the powertype, so
fof(ax_categorizes_definition, axiom, (
    ![T1, T2]: (
        categorizes(T1, T2) <=> (powerType(T2) & ![T3]:(instantiation(T3, T2) => properSpecializes(T3, T1)))
    )
)).
*/



%%%%%%
%%%%%% UFO-B
%%%%%%
fof(ax_ufo_b_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (ufo_b_type(T1,T2) => ?[RT]: (connectsType(T1, T2, RT)))
)).


% TODO:: verificar necessidade do axioma abaixo se for incluir na formalização
% 
fof(ax_manifestation_has_a_relation_type, axiom, (
![ET, PT]: (manifestsType(ET, PT) => (endurantType(ET) & perdurantType(PT))
          )
)).

% ---
% fof(ax_manifestsInvolvedThings_a104, axiom, (
%   ![E,P]: (manifests(E,P) => (endurant(E) & perdurant(P)))
% )).
 
fof(ax_manifestation_has_a_relation_type, axiom, (
![T1, T2]: (manifestsType(T1,T2) => ?[RT]: (connectsType(T1, T2, RT)))
)).


%%%%%%
%%%%%% Out of formalization
%%%%%%

fof(ax_material_has_a_relation_type, axiom, (
![T1, T2]: (materialType(T1, T2) => ?[RT]: (connectsType(T1, T2, RT)))
)).


fof(ax_derivation_has_a_relation_type, axiom, (
![T1, T2]: (derivationType(T1, T2) => ?[RT]: (connectsType(T1, T2, RT)))
)).


fof(ax_material_has_a_relation_type, axiom, (
![T1, T2]: (comparativeType(T1, T2) => ?[RT]: (connectsType(T1, T2, RT)))
)).