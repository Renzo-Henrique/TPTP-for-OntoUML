% CHANGE:
% type_ changed to monadicType
fof(ax_dIof, axiom, (
  ![X,Y,W]: (iof(X,Y,W) => (monadicType(Y) & world(W)))
)).

% CHANGE:
% type_ changed to monadicType
fof(ax_dType, axiom, (
  ![X]: (monadicType(X) <=> (?[Y,W]: iof(Y,X,W)))
)).

% CHANGE:
% An individual can't instantiate another individual and can't connect individuals
fof(ax_dIndividual, axiom, (
  ![X]: (individual(X) <=> (~?[Y,W]: iof(Y,X,W) & ~?[Y,Z,W]: connects(Y,Z,X,W) ))
)).

fof(ax_multiLevel, axiom, (
  ![X,Y,W]: (iof(X,Y,W) => (type_(X) | individual(X)))
)).

fof(ax_twoLevelConstrained, axiom, (
  ~?[X,Y,Z,W]: (type_(X) & iof(X,Y,W) & iof(Y,Z,W))
)).

% CHANGE:
% X and Y are connected trought R in a world W
%
% Addition of connects individuals taxonomy
fof(ax, axiom, (
  ![X,Y,R,W]: (connects(X,Y,R,W) => (relationType(R) & world(W) & concreteIndividual(X) & concreteIndividual(Y)))
)).

% CHANGE:
% R can only be a relation if it connects 2 individuals
fof(ax, axiom, (
  ![R]: (relationType(R) <=> ?[X,Y,W]:(connects(X,Y,R,W)))
)).
