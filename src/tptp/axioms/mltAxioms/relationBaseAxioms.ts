const relationReificated = `
fof(ax_relation_reificated_is_a_type, axiom, (
  ![R]: (relation_reificated(R) => ( type_(R) ) &                         
)).

fof(ax_relation_reificated_is_a_type_but_different, axiom, (
  ~?[X]: (  (relation_reificated(X) & endurantType(X)) 
          | (relation_reificated(X) & perdurantType(X))
          )                               
)).
`

const relationInstance = `
fof(ax_relation_instance_is_an_abstract_individual, axiom, (
  ![R]: (relation_instance(R) => (abstractIndividual(R))
)).

fof(ax_relation_instance_is_an_abstract_individual_but_different_than_the_others, axiom, (
  ~?[X]: (  (relation_instance(X) & quale(X)) 
          | (relation_instance(X) & set_(X)) 
          | (relation_instance(X) & world(X))
          )
)).
`

const connectsType = `
% t1 is connected to t2, through r in a world w
fof(ax_connection_of_types, axiom, (
  ![T1, T2, R]: (connectsType(T1, T2, R) =>
                      (type_(T1) & type_(T2) & relation_reificated(R))
                  )
)).
`

const connectsInstance = `
% X1 is connected to X2 through R in a world W
fof(ax_connection_of_individuals, axiom, (
  ![X1, X2, R, W]: (connectsInstance(X1, X2, R, W) =>
                      (individual(X1) & individual(X2) & world(W) & relation_instance(R))
                  )
)).
`

// Relation between the association of types and it's instances
const connectsTypeAndConnectsInstance = `
fof(ax_relation_reificated_and_relation_instance_mlt, axiom, (
  ![T1, T2, Rt]: (connectsType(T1, T2, R) =>
                      (?[W, X1, X2, Ri]: (iof(X1, T1, W) & iof(X2, T2, W) & iof(Ri, Rt, W)
                                            connectsInstance(X1, X2, Ri, W) )
                      )
                  )
)).
`


const connectsTypeSpecialization = `
% R1 being a relationSubType
% R2 being a relationSuperType
fof(ax_relation_reificated_specialization, axiom, (
  ![R1, R2]: ( properSpecializationOfRelation(R1, R2) <=> (
                properSpecialization(R1, R2) & relation_reificated(R1) & relation_reificated(R2))
)).

`

// // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // 
const associationDefinitions = `

%
% Association type as a reified type
%
% For every T,
% T is an association type if and only if:
% - T is a type, and
% - for every entity E in every world W,
%   if E is an instance of T in W, then E must be an association individual.
%
% Association types are therefore reified: they behave like types whose instances are always association individuals.
%
fof(ax_association_reificated_and_for_individuals, axiom , (
    ![T]: (associationType(T) <=> (
           type_(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (associationIndividual(E)))))
    )
)).

%
% Association type is also a type
%
% For every T,
% If T is an association type, then T must also be a type.
%
% Every association type is a type.
%
fof(ax_association_reificated_is_a_type, axiom, (
  ![T]: (associationType(T) => ( type_(T) ))                         
)).

%
% Association types are disjoint from endurant and perdurant types
%
% There does not exist an X such that:
% - X is both an association type and an endurant type, or
% - X is both an association type and a perdurant type.
%
% Association types are distinct from both endurant and perdurant types.
%
fof(ax_association_reificated_is_a_type_but_different, axiom, (
  ~?[X]: (  (associationType(X) & endurantType(X)) 
          | (associationType(X) & perdurantType(X))
          )                               
)).

%%%%%
%%%%%
%%%%%

%
% Association individual is an abstract individual
%
% For every X,
% If X is an association individual, then X must also be an abstract individual.
%
% Every association individual is abstract.
%
fof(ax_association_instance_is_an_abstract_individual, axiom, (
  ![X]: (associationIndividual(X) => (abstractIndividual(X)))
)).

%
% Association individuals are disjoint from other abstract categories
%
% There does not exist an X such that:
% - X is both an association individual and a quale, or
% - X is both an association individual and a set, or
% - X is both an association individual and a world.
%
% Association individuals are abstract, but they are different from quales, sets, and worlds.
%
fof(ax_association_instance_is_an_abstract_individual_but_different_than_the_others, axiom, (
  ~?[X]: (  (associationIndividual(X) & quale(X)) 
          | (associationIndividual(X) & set_(X)) 
          | (associationIndividual(X) & world(X))
          )
)).

`

const connectsDefinitions = `
%
% Connection of types
%
% For every pair of types T1 and T2 and a relation type R,
% If R is declared to connect T1 and T2 (connectsTypes(T1, T2, R)),
% Then T1 and T2 must be valid types, and R must be a valid association type.
% 
% T1 is connected to T2 through R
%
fof(ax_connection_of_types, axiom, (
  ![T1, T2, R]: (connectsTypes(T1, T2, R) =>
                      (type_(T1) & type_(T2) & associationType(R))
                  )
)).

%
% Connection of individuals
%
% For every pair of individuals X1 and X2, a relation individual R, and a world W,
% If X1 and X2 are connected through R in W (connectsIndividuals(X1, X2, R, W)),
% Then X1 and X2 must be valid individuals, W must be a valid world,
% and R must be a valid association individual.
%
% X1 is connected to X2 through R in a world W
%
fof(ax_connection_of_individuals, axiom, (
  ![X1, X2, R, W]: (connectsIndividuals(X1, X2, R, W) =>
                      (individual(X1) & individual(X2) & associationIndividual(R) & world(W))
                  )
)).


%
% Cardinality X..* to X..*
%
% Logic of connectsType and connectsIndividuals
%
% For every pair of types T1 and T2 and a relation type Rt,
% If Rt is declared to connect T1 and T2 (connectsTypes(T1,T2,Rt)),
% Then there must exist:
% - a world W,
% - an individual X1 that is an instance of T1 in W,
% - an individual X2 that is an instance of T2 in W,
% - and an individual relation Ri that is an instance of Rt in W,
% - such that X1 and X2 are connected through Ri in W (connectsIndividuals(X1, X2, Ri, W)).
%
% Every connection between types must have at least a world with a connection between individuals 
%     wich are instances of the types
%
fof(ax_connects_in_types_and_instances_cardinality, axiom, (
  ![T1, T2, Rt]: (connectsTypes(T1, T2, Rt) =>
                      (?[W, X1, X2, Ri]: (iof(X1, T1, W) & iof(X2, T2, W) & iof(Ri, Rt, W) &
                                            connectsIndividuals(X1, X2, Ri, W) )
                      )
                  )
)).
`

const connectsSpecialization = `
fof(ax_association_type_specialization, axiom, (
  ![T1, T2]: ( properSpecializationOfAssociation(R1, R2) <=> (
                properSpecialization(R1, R2) & associationType(R1) & associationType(R2))
)).

`

export const relationsDefinitions = associationDefinitions + '\n' +
                                    connectsDefinitions + '\n'
                                    '';

