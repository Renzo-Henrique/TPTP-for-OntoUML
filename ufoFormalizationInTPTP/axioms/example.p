

fof(ax_perdurantTypeDefinition_a44, axiom, (
  ![T]: (perdurantType(T) <=> (
    type_(T) & (![P,W]: ((world(W) & iof(P,T,W)) => (perdurant(P))))
  ))
)).

fof(ax_function, axiom,  (
  ![X,Y]: (functionsAs(X,Y) => (endurant(X) & type_(Y)))
)).

fof(ax_genericConstitutionalDependence_a60, axiom, (
  ![T1,T2]: (genericConstitutionalDependence(T1,T2) <=> (
    type_(T1) & type_(T2) & ![E1,W]: (iof(E1,T1,W) => (
      ?[E2]: (constitutedBy(E1,E2,W) & iof(E2,T2,W)
    )))
  ))
)).

fof(ax_thingsInvolvedInInherence_a68, axiom, (
  ![M,X]: (inheresIn(M,X) => (moment(M) & (type_(X) | endurant(X))))
)).