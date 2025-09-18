% Thing

fof(ax_thing_taxonomy, axiom, (
  ![X]: ((type_(X) | individual(X)) <=> (thing(X)))
)).

fof(ax_thing_partition, axiom, (
  ~?[X]: (type_(X) & individual(X))
)).

% CHANGE:
% Inclusion of monadicType and relation
% monadicType(X) only applies to individuals throught instantiation in a world
% relation(X) only applies to connect individuals in a world
fof(ax_type_taxonomy, axiom, (
  ![X]: ((monadicType(X) | relation(X)) <=> (type_(X)))
)).

% CHANGE:
% nothing can be a monadicType an relation at the same time
fof(ax_type_partition, axiom, (
  ~?[X]: (monadicType(X) & relation(X))
)).


% Individual

fof(ax_individual_taxonomy, axiom, (
  ![X]: ((concreteIndividual(X) | abstractIndividual(X)) <=> (individual(X)))
)).

fof(ax_individual_partition, axiom, (
  ~?[X]: (concreteIndividual(X) & abstractIndividual(X))
)).

% Concrete Individual

fof(ax_concreteIndividual_taxonomy, axiom, (
  ![X]: ((endurant(X) | perdurant(X)) <=> (concreteIndividual(X)))
)).

fof(ax_concreteIndividual_partition, axiom, (
  ~?[X]: (endurant(X) & perdurant(X))
)).

% Type

% CHANGE:
% type_ changed to monadicType
fof(ax_type_taxonomy, axiom, (
  ![X]: ((endurantType(X) | perdurantType(X)) => (monadicType(X)))
)).

fof(ax_type_partition, axiom, (
  ~?[X]: (endurantType(X) & perdurantType(X))
)).