
%%%%%%
%%%%%% Relation axioms
%%%%%%


/**
* Connection of types
*
* For every pair of types T1 and T2 and a relation type R,
* If R is declared to connect T1 and T2 (connectsTypes(T1, T2, R)),
* Then T1 and T2 must be valid types, and R must be a valid relation type.
*/ 
% T1 is connected to T2 through R
fof(ax_connection_of_types, axiom, (
  ![T1, T2, RT]: (connectsType(T1, T2, RT) =>
                      (monadicType(T1) & monadicType(T2) & relationType(RT))
                  )
)).



/**
* Cardinality X..* to X..*
*
* Logic of connectsType and connectsIndividuals
*
* For every pair of types T1 and T2 and an relation type RT,
* If RT is declared to connect T1 and T2 (connectsTypes(T1,T2,RT)),
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
  ![T1, T2, RT]: (connectsTypes(T1, T2, RT) =>
                      (?[W, X1, X2, RI]: (iof(X1, T1, W) & iof(X2, T2, W) &
                                            connects(X1, X2, RT, W) )
                      )
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

% a mediation relation is reified as connecting R and T throught the mediation (Relation)
fof(ax_mediation_has_a_relation_type, axiom, (
  ![RelatorType, T]: (mediatesType(RelatorType, T) => ?[RelationType]: (connectsTypes(RelatorType, T, RelationType)))
)).


fof(ax_characterization_taxonomy, axiom, (
  ![MT, ET]: (characterizes(MT,ET) => (endurantType(ET) & momentType(MT)))
)).

fof(ax_characterization_has_a_relation_type, axiom, (
  ![MT, ET]: (characterizes(MT,ET) => ?[RelationType]: (connectsTypes(MT, ET, RelationType)))
)).


fof(ax_instantiation_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (instantiation(T1,T2) => (monadicType(T1) & powerType(T2)))
)).

% TODO:: verificar se isso é correto
fof(ax_instantiation_relation_has_an_individual_type, axiom, (
  ![T1, T2]: (instantiation(T1,T2) => 
              ![X, W]: (iof(X, T1, W) => iof(X, T2, W)) 
  )
)).

%%%%%%
%%%%%% UFO-B
%%%%%%
fof(ax_ufo_b_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (ufo_b_type(T1,T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).


% TODO:: verificar necessidade do axioma abaixo se for incluir na formalização
% 
% fof(ax_manifestation_has_a_relation_type, axiom, (
% ![ET, PT]: (manifestsType(ET, PT) => (endurantType(ET) & perdurantType(PT))
%           )
% )).

% ---
% fof(ax_manifestsInvolvedThings_a104, axiom, (
%   ![E,P]: (manifests(E,P) => (endurant(E) & perdurant(P)))
% )).
 
fof(ax_manifestation_has_a_relation_type, axiom, (
![T1, T2]: (manifestsType(T1,T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).



%%%%%%
%%%%%% Out of formalization
%%%%%%

fof(ax_material_has_a_relation_type, axiom, (
![T1, T2]: (materialType(T1, T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).


fof(ax_derivation_has_a_relation_type, axiom, (
![T1, T2]: (derivationType(T1, T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).


fof(ax_material_has_a_relation_type, axiom, (
![T1, T2]: (comparativeType(T1, T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).


%%%%%
%%%%% Additional axioms
%%%%%
fof(ax_momentType_must_have_a_relation_with_endurantType, axiom, (
    ![T1]: (momentType(T1) => 
        ?[T2, R]:(T1 != T2 & endurantType(T2) & (connectsType(T1, T2, R) | connectsType(T2, T1, R)))
        )
)).

fof(ax_perdurantType_must_have_a_relation_with_monadicType, axiom, (
    ![T1]: (perdurantType(T1) => 
        ?[T2, R]:(T1 != T2 & monadicType(T2) & (connectsType(T1, T2, R) | connectsType(T2, T1, R)))
        )
)).