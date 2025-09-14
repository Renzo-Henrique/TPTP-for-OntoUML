const relationDefinitions = `

%
% Association type as a reified type
%
% For every T,
% T is an relation type if and only if:
% - T is a type, and
% - for every entity E in every world W,
%   if E is an instance of T in W, then E must be an relation individual.
%
% Association types are therefore reified: they behave like types whose instances are always relation individuals.
%
fof(ax_relation_reificated_and_for_individuals, axiom , (
    ![T]: (relationType(T) <=> (
           type_(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (relationIndividual(E)))))
    )
)).

%
% Association type is also a type
%
% For every T,
% If T is an relation type, then T must also be a type.
%
% Every relation type is a type.
%
fof(ax_relation_reificated_is_a_type, axiom, (
  ![T]: (relationType(T) => ( type_(T) ))                         
)).

%
% Association types are disjoint from endurant and perdurant types
%
% There does not exist an X such that:
% - X is both an relation type and an endurant type, or
% - X is both an relation type and a perdurant type.
%
% Association types are distinct from both endurant and perdurant types.
%
fof(ax_relation_reificated_is_a_type_but_different, axiom, (
  ~?[X]: (  (relationType(X) & endurantType(X)) 
          | (relationType(X) & perdurantType(X))
          )                               
)).

%%%%%
%%%%%
%%%%%

% TODO:: verificar, acho que isso restringe a criação de ontologias simplificadas de somente indivíduos
%
% For every X,
% X is an relation individual if and only if:
% - X is a abstract individual, and
% - for every type T in every world W,
%   if X is an instance of T in W, then T must be an relation type.
%
% Association types are therefore reified: they behave like types whose instances are always relation individuals.
%
fof(ax_relation_reificated_and_for_individuals, axiom , (
    ![X]: (relationIndividual(X) <=> (
           abstractIndividual(X) & (![W, T]: ((world(W) & iof(X,T,W)) => (relationType(T)))))
    )
)).

%
% Association individual is an abstract individual
%
% For every X,
% If X is an relation individual, then X must also be an abstract individual.
%
% Every relation individual is abstract.
%
fof(ax_relation_instance_is_an_abstract_individual, axiom, (
  ![X]: (relationIndividual(X) => (abstractIndividual(X)))
)).

%
% Association individuals are disjoint from other abstract categories
%
% There does not exist an X such that:
% - X is both an relation individual and a quale, or
% - X is both an relation individual and a set, or
% - X is both an relation individual and a world.
%
% Association individuals are abstract, but they are different from quales, sets, and worlds.
%
fof(ax_relation_instance_is_an_abstract_individual_but_different_than_the_others, axiom, (
  ~?[X]: (  (relationIndividual(X) & quale(X)) 
          | (relationIndividual(X) & set_(X)) 
          | (relationIndividual(X) & world(X))
          )
)).

`

const connectsDefinitions = `
%
% Connection of types
%
% For every pair of types T1 and T2 and a relation type R,
% If R is declared to connect T1 and T2 (connectsTypes(T1, T2, R)),
% Then T1 and T2 must be valid types, and R must be a valid relation type.
% 
% T1 is connected to T2 through R
%
fof(ax_connection_of_types, axiom, (
  ![T1, T2, R]: (connectsTypes(T1, T2, R) =>
                      (type_(T1) & type_(T2) & relationType(R))
                  )
)).

%
% Connection of individuals
%
% For every pair of individuals X1 and X2, an relation individual R, and a world W,
% If X1 and X2 are connected through R in W (connectsIndividuals(X1, X2, R, W)),
% Then X1 and X2 must be valid individuals, W must be a valid world,
% and R must be a valid relation individual.
%
% X1 is connected to X2 through R in a world W
%
fof(ax_connection_of_individuals, axiom, (
  ![X1, X2, R, W]: (connectsIndividuals(X1, X2, R, W) =>
                      (individual(X1) & individual(X2) & relationIndividual(R) & world(W))
                  )
)).


%
% Cardinality X..* to X..*
%
% Logic of connectsType and connectsIndividuals
%
% For every pair of types T1 and T2 and an relation type Rt,
% If Rt is declared to connect T1 and T2 (connectsTypes(T1,T2,Rt)),
% Then there must exist:
% - a world W,
% - an individual X1 that is an instance of T1 in W,
% - an individual X2 that is an instance of T2 in W,
% - and an relation individual Ri that is an instance of Rt in W,
% - such that X1 and X2 are connected through Ri in W (connectsIndividuals(X1, X2, R, W)).
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
fof(ax_relation_type_specialization, axiom, (
  ![R1, R2]: ( properSpecializationOfAssociation(R1, R2) <=> (
                properSpecialization(R1, R2) & relationType(R1) & relationType(R2))
)).

`

export const relationBaseAxioms = relationDefinitions + '\n' +
                                    connectsDefinitions + '\n'
                                    '';

