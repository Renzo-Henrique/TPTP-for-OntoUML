
///////////
/////////// Relation axioms
///////////
const relationTypeHasARelationIndividuals = `
% Relation types are therefore reified: they behave like types whose instances are always relation individuals.
fof(ax_relation_reificated_and_for_individuals, axiom , (
    ![T]: (relationType(T) <=> (
           type_(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (relationIndividual(E)))))
    )
)).
`

const relationTypeTaxonomy = `
% Every relation type is a type.
fof(ax_relation_reificated_is_a_type, axiom, (
  ![T]: (relationType(T) => ( type_(T) ))                         
)).

% Relation types are distinct from both endurant and perdurant types.
fof(ax_relation_reificated_is_a_type_but_different, axiom, (
  ~?[X]: (  (relationType(X) & endurantType(X)) 
          | (relationType(X) & perdurantType(X))
          )                               
)).
`
// Isso faz dar erro em mode.json
const relationIndividualHasARelationType = `
fof(ax_relation_reificated_and_for_individuals, axiom , (
    ![X]: (relationIndividual(X) <=> (
           abstractIndividual(X) & (![W, T]: ((world(W) & iof(X,T,W)) => (relationType(T)))))
    )
)).
`

const relationIndividualTaxonomy = `
% Every relation individual is an abstractIndividual.
fof(ax_relation_instance_is_an_abstract_individual, axiom, (
  ![X]: (relationIndividual(X) => (abstractIndividual(X)))
)).

% Relation individuals are abstract, but they are different from quales, sets, and worlds.
fof(ax_relation_instance_is_an_abstract_individual_but_different_than_the_others, axiom, (
  ~?[X]: (  (relationIndividual(X) & quale(X)) 
          | (relationIndividual(X) & set_(X)) 
          | (relationIndividual(X) & world(X))
          )
)).
`

const relationDefinitions = relationTypeHasARelationIndividuals + '\n'
                          + relationTypeTaxonomy + '\n'
                          //+ relationIndividualHasARelationType + '\n'
                          + relationIndividualTaxonomy + '\n';




/**
* Connection of types
*
* For every pair of types T1 and T2 and a relation type R,
* If R is declared to connect T1 and T2 (connectsTypes(T1, T2, R)),
* Then T1 and T2 must be valid types, and R must be a valid relation type.
*/ 
const connectsTypes = `
% T1 is connected to T2 through R
fof(ax_connection_of_types, axiom, (
  ![T1, T2, RT]: (connectsTypes(T1, T2, RT) =>
                      (type_(T1) & type_(T2) & relationType(RT))
                  )
)).
`

/**
* Connection of individuals
*
* For every pair of individuals X1 and X2, an relation individual R, and a world W,
* If X1 and X2 are connected through R in W (connectsIndividuals(X1, X2, R, W)),
* Then X1 and X2 must be valid individuals, W must be a valid world,
* and R must be a valid relation individual.
*/
const connectsIndividuals = `
% X1 is connected to X2 through R in a world W
fof(ax_connection_of_individuals, axiom, (
  ![X1, X2, R, W]: (connectsIndividuals(X1, X2, R, W) =>
                      (individual(X1) & individual(X2) & relationIndividual(R) & world(W))
                  )
)).

`

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
const connectsLogic = `
% Every connection between types must have at least a world with a connection between individuals 
%     wich are instances of the types
fof(ax_connects_in_types_and_instances_cardinality, axiom, (
  ![T1, T2, RT]: (connectsTypes(T1, T2, RT) =>
                      (?[W, X1, X2, RI]: (iof(X1, T1, W) & iof(X2, T2, W) & iof(RI, RT, W) &
                                            connectsIndividuals(X1, X2, RI, W) )
                      )
                  )
)).
`
const connectsSpecialization = `
% a relationType can only be a general of a relationType
fof(ax_relation_type_specialization, axiom, (
  ![RT1, RT2]: ( (specializes(RT1, RT2) & relationType(RT2) ) => (
                relationType(RT1) ))
)).

`

const connectsDefinitions = connectsTypes + '\n'
                          + connectsIndividuals + '\n'
                          + connectsLogic + '\n'
                          + connectsSpecialization + '\n';
                          + '';



///////////
/////////// Estereotypes 
///////////

const mediationAxiom = `

% (47). mediation(U, UR) =def Universal(U) ∧ RelatorUniversal(UR) ∧ ∀x (x::U → ∃r r::UR ∧ m(r,x)) 
%
% RT mediates a type T
fof(ax_mediation_type_definition, axiom, (
  ![RT, T]: (mediatesType(RT, T) <=> (
            relatorType(RT) & type_(T)  & ![X, W]: (iof(X, T, W) => ?[R, W]: (iof(R, RT, W) & mediates(R, X)))
            )
          )

)).

% a mediation relation is reified as connecting R and T throught the mediation (Relation)
fof(ax_mediation_has_a_relation_type, axiom, (
  ![RelatorType, T]: (mediatesType(RelatorType, T) => ?[RelationType]: (connectsTypes(RelatorType, T, RelationType)))
)).
`


const characterizationAxiom = `
fof(ax_characterization_has_a_relation_type, axiom, (
  ![MT, ET]: (characterizes(MT,ET) => ?[RelationType]: (connectsTypes(MT, ET, RelationType)))
)).

`

const instantiationAxiom = `
fof(ax_instantiation_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (instantiation(T1,T2) => (type_(T1) & powerType(T2))
            )
)).

% TODO:: verificar se isso é correto
fof(ax_instantiation_relation_has_an_individual_type, axiom, (
  ![T1, T2]: (instantiation(T1,T2) => 
              ![X, W]: (iof(X, T1, W) => iof(X, T2, W)) 
  )
)).
`

///////////
/////////// UFO-B
///////////
const ufoBTypesAxiom = `
fof(ax_ufo_b_relation_has_a_relation_type, axiom, (
  ![T1, T2]: (ufo_b_type(T1,T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).
`

/**
 * TODO:: verificar necessidade do axioma abaixo se for incluir na formalização
 * 
fof(ax_manifestation_has_a_relation_type, axiom, (
![ET, PT]: (manifestsType(ET, PT) => (endurantType(ET) & perdurantType(PT))
          )
)).

---
fof(ax_manifestsInvolvedThings_a104, axiom, (
  ![E,P]: (manifests(E,P) => (endurant(E) & perdurant(P)))
)).
 */
const manifestationAxiom = `
fof(ax_manifestation_has_a_relation_type, axiom, (
![T1, T2]: (manifestsType(T1,T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).
`


///////////
/////////// Out of formalization
///////////
const materialAxiom = `
fof(ax_material_has_a_relation_type, axiom, (
![T1, T2]: (materialType(T1, T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).
`
const derivationAxiom = `
fof(ax_derivation_has_a_relation_type, axiom, (
![T1, T2]: (derivationType(T1, T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).
`

const comparativeAxiom = `
fof(ax_material_has_a_relation_type, axiom, (
![T1, T2]: (comparativeType(T1, T2) => ?[RT]: (connectsTypes(T1, T2, RT)))
)).
`

const estereotypesAxioms = mediationAxiom + '\n'
                          + characterizationAxiom + '\n'
                          + instantiationAxiom + '\n'
                          + ufoBTypesAxiom + '\n'
                          + manifestationAxiom + '\n'
                          + materialAxiom + '\n'
                          + derivationAxiom + '\n'
                          + comparativeAxiom + '\n';

///////////
/////////// Export
///////////

/**
 * String containing all axioms to introducing relations to the formalization
 */
export const relationBaseAxioms = relationDefinitions + '\n' +
                                  connectsDefinitions + '\n'
                                  + estereotypesAxioms + '\n'
                                  +'';
