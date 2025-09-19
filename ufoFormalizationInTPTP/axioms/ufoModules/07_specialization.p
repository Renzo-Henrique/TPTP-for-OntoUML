fof(ax_dSpecializes, axiom, (
  ![X,Y]: (specializes(X,Y) => (type_(X) & type_(Y)))
)).

% CHANGE:
% including how a specialization of a relation works
fof(ax_specialization_a5, axiom, (
  ![T1,T2]: (specializes(T1,T2) <=> (
      (monadicType(T1) & monadicType(T2) & ![W]: (
        world(W) => ![E]: (iof(E,T1,W) => iof(E,T2,W))
        ))
    |
      (relationType(T1) & relationType(T2) & ![W]: (
        world(W) => ![E1,E2]: (connects(E1,E2,T1,W) => connects(E1,E2,T2,W))
        ))
  ))
)).


fof(ax_properSpecializes_d1, axiom, (
  ![X,Y]: (properSpecializes(X,Y) <=> (specializes(X,Y) & ~specializes(Y,X)))
)).

% CHANGE:
% including that only monadicTypes can have sharedSpecialization
fof(ax_sharedSpecializations_a6, axiom, (
  ![T1,T2]: ( (monadicType(T1) & monadicType(T2)) => (![X,W]: (
    (iof(X,T1,W) & iof(X,T2,W) & ~specializes(T1,T2) & ~specializes(T2,T1)) => (
      (?[T3]: (specializes(T1,T3) & specializes(T2,T3) & iof(X,T3,W)))
      | 
      (?[T3]: (specializes(T3,T1) & specializes(T3,T2) & iof(X,T3,W)))
      )
  )))
)).