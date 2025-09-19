%%%%%%%%%%%
% No axioma ax_endurantTypeCharacterizationByMomentTypes_a83 deveria ser da seguinte forma?

%% ORIGINAL
fof(ax_endurantTypeCharacterizationByMomentTypes_a83, axiom, (
  ![ET,MT]: (characterizes(MT,ET) => (
    endurantType(ET)
    & momentType(M)
    & (![E,W]: (iof(E,ET,W) => (?[M]: (iof(M,MT,W) & inheresIn(M,E)))))
    & (![M2,W2]: (iof(M2,MT,W2) => (?[E2]: (iof(E2,ET,W2) & inheresIn(M2,E2)))))
  ))
)).

%% CONSERTADO
fof(ax_endurantTypeCharacterizationByMomentTypes_a83, axiom, (
  ![ET,MT]: (characterizes(MT,ET) => (
    endurantType(ET)
    & momentType(MT) % M para MT
    & (![E,W]: (iof(E,ET,W) => (?[M]: (iof(M,MT,W) & inheresIn(M,E)))))
    & (![M2,W2]: (iof(M2,MT,W2) => (?[E2]: (iof(E2,ET,W2) & inheresIn(M2,E2)))))
  ))
)).

%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%
%%% No axioma ax_genericFunctionalDependence_a55 deveria ser da seguinte forma?

%% ORIGINAL
fof(ax_genericFunctionalDependence_a55, axiom, (
  ![T1,T2,W]: (gfd(T1,T2,W) <=> 
    ![E1]: ((iof(T1,E1,W) & functionsAs(T1,E1)) => ?[E2]: (~(E1=E2) & iof(T2,E2,W) & functionsAs(T2,E2))))
)).

%% CONSERTADO
fof(ax_genericFunctionalDependence_a55, axiom, (
  ![T1,T2,W]: (gfd(T1,T2,W) <=> 
    ![E1]: ((iof(E1,T1,W) & functionsAs(E1,T1)) => ?[E2]: (~(E1=E2) & iof(E2,T2,W) & functionsAs(E2,T2))))
)).

%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%
% Na formalização "foundationOf(x) = foundationOf(y)" aparece de duas formas:



%%% Primeira forma:
/*
    quaIndividualOf(x, y) ↔ 
               ∀z (O(z, x) ↔ (ExternallyDependentMode(z) ∧ inheresIn(z, y) ∧ foundationOf(z) = foundationOf(x)))
*/
%
fof(ax_dQuaIndividualOf_a75, axiom, (
  ![X,Y]: (quaIndividualOf(X,Y) <=> (![Z]: (overlap(Z,X) <=> (
    externallyDependentMode(Z) & inheresIn(Z,Y) & (![P]: (foundedBy(X,P) => foundedBy(Z,P)))
  ))))
)).

/*
    Relator(x) ∧ yPx → foundationOf(x) = foundationOf(y)
*/
fof(ax_thePartsOfARelatorShareTheFoundationOfTheWhole_a80, axiom, (
  ![X,Y,Z]: ((relator(X) & partOf(Z,X)) => (![P]: (foundedBy(Z,P) => foundedBy(X,P))))
)).

%%% Segunda forma:
/*
    Relator(x) ↔ ∃y(PP(y, x)) 
    ∧ 
    ∀y, z((PP(y, x) ∧ PP(z, x)) → 
            (QuaIndividual(y) ∧ QuaIndividual(z) ∧ (foundationOf(y) = foundationOf(z)) ∧ ed(y, z) ∧ ed(z, y))) 
    ∧
    ∀y, z((PP(y, x)∧ QuaIndividual(z)∧(foundationOf(y) = foundationOf(z)) ∧ ed(y, z) ∧ ed(z, y)) → PP(z, x))
*/
fof(ax_dRelator_a81, axiom, (
  ![R]: (relator(R) <=> (
    (?[X]: (properPartOf(X,R))
    & (![Y,Z]: ((properPartOf(Y,R) & properPartOf(Z,R)) => 
        (quaIndividual(Y) & quaIndividual(Z) & existentiallyDependsOn(Y,Z) & existentiallyDependsOn(Z,Y) 
            & (![P]: (foundedBy(Y,P) <=> foundedBy(Z,P))))
        ))
    & (![Y2,Z2]: (
        (properPartOf(Y2,R) & quaIndividual(Z2) & existentiallyDependsOn(Y2,Z2) & 
            existentiallyDependsOn(Z2,Y2) & (![P2]: (foundedBy(Y2,P2) <=> foundedBy(Z2,P2))) % Ocorrencia
        ) => (properPartOf(Z2,R))))
  )))
)).



%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%
% Na formalização dependência externa aparece como

%% ORIGINAL
fof(ax_externallyDependsOn_a71, axiom, (
  ~?[M,X]: (externallyDependsOn(M,X) <=> (existentiallyDependsOn(M,X) & (![Y]: (inheresIn(M,Y) => existentiallyIndependentOf(X,Y)))))
)).

%% CONSERTADO
fof(ax_externallyDependsOn_a71, axiom, (
  ![M,X]: (externallyDependsOn(M,X) <=> (existentiallyDependsOn(M,X) & (![Y]: (inheresIn(M,Y) => existentiallyIndependentOf(X,Y)))))
)).