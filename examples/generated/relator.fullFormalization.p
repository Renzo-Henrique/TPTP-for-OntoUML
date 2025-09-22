% Thing

fof(ax_thing_taxonomy, axiom, (
  ![X]: ((type_(X) | individual(X)) <=> (thing(X)))
)).

fof(ax_thing_partition, axiom, (
  ~?[X]: (type_(X) & individual(X))
)).

% CHANGE:
% Inclusion of monadicType and relationType
% monadicType(X) only applies to individuals throught instantiation in a world
% relationType(X)(X) only applies to connect individuals in a world
fof(ax_type_taxonomy, axiom, (
  ![X]: ((monadicType(X) | relationType(X)) <=> (type_(X)))
)).

% CHANGE:
% nothing can be a monadicType an relation at the same time
fof(ax_type_partition, axiom, (
  ~?[X]: (monadicType(X) & relationType(X))
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
% Abstract Individual

fof(ax_abstractIndividual_taxonomy_quale, axiom, (
  ![X]: (quale(X) => (abstractIndividual(X)))
)).

fof(ax_abstractIndividual_taxonomy_set, axiom, (
  ![X]: (set_(X) => (abstractIndividual(X)))
)).

fof(ax_abstractIndividual_taxonomy_world, axiom, (
  ![X]: (world(X) => (abstractIndividual(X)))
)).

fof(ax_abstractIndividual_pairwiseDisjoint, axiom, (
  ~?[X]: ((quale(X) & set_(X)) | (quale(X) & world(X)) | (set_(X) & world(X)))
)).

% Set

fof(ax_set_taxonomy_qualityStructure, axiom, (
  ![X]: (qualityStructure(X) => (set_(X)))
)).

% Quality Structure

fof(ax_qualityStructure_taxonomy, axiom, (
  ![X]: ((qualityDimension(X) | qualitySpace(X)) <=> (qualityStructure(X)))
)).

fof(ax_qualityStructure_partition, axiom, (
  ~?[X]: (qualityDimension(X) & qualitySpace(X))
)).
% Endurant

fof(ax_endurant_taxonomy, axiom, (
  ![X]: ((substantial(X) | moment(X)) <=> (endurant(X)))
)).

fof(ax_endurant_partition, axiom, (
  ~?[X]: (substantial(X) & moment(X))
)).

% Substantial

fof(ax_substantial_taxonomy, axiom, (
  ![X]: ((object(X) | collective(X) | quantity(X)) <=> (substantial(X)))
)).

fof(ax_substantial_partition, axiom, (
  ~?[X]: ((object(X) & collective(X)) | (object(X) & quantity(X)) | (collective(X) & quantity(X)))
)).

% Moment

fof(ax_moment_taxonomy, axiom, (
  ![X]: ((intrinsicMoment(X) | relator(X)) <=> (moment(X)))
)).

fof(ax_moment_partition, axiom, (
  ~?[X]: (intrinsicMoment(X) & relator(X))
)).

% Intrinsic Moment

fof(ax_intrinsicMoment_taxonomy, axiom, (
  ![X]: ((quality(X) | mode(X)) <=> (intrinsicMoment(X)))
)).

fof(ax_intrinsicMoment_partition, axiom, (
  ~?[X]: (quality(X) & mode(X))
)).

% Mode

fof(ax_mode_taxonomy_disposition, axiom, (
  ![X]: (disposition(X) => (mode(X)))
)).

fof(ax_mode_taxonomy_externallyDependentMode, axiom, (
  ![X]: (externallyDependentMode(X) => (mode(X)))
)).

% Externally Dependent Mode

fof(ax_externallyDependentMode_taxonomy_quaIndividual, axiom, (
  ![X]: (quaIndividual(X) => (externallyDependentMode(X)))
)).
% Endurant Type (by ontological nature)

fof(ax_endurantType_taxonomy_nature, axiom, (
  ![X]: ((substantialType(X) | momentType(X)) <=> (endurantType(X)))
)).

fof(ax_endurantType_partition_nature, axiom, (
  ~?[X]: (substantialType(X) & momentType(X))
)).

% Substantial Type

fof(ax_substantialType_taxonomy, axiom, (
  ![X]: ((objectType(X) | collectiveType(X) | quantityType(X)) <=> (substantialType(X)))
)).

fof(ax_substantialType_partition, axiom, (
  ~?[X]: ((objectType(X) & collectiveType(X)) | (objectType(X) & quantityType(X)) | (collectiveType(X) & quantityType(X)))
)).

% Moment Type

fof(ax_momentType_taxonomy, axiom, (
  ![X]: ((intrinsicMomentType(X) | relatorType(X)) <=> (momentType(X)))
)).

fof(ax_momentType_partition, axiom, (
  ~?[X]: (intrinsicMomentType(X) & relatorType(X))
)).

% Intrinsic Moment Type

fof(ax_intrinsicMomentType_taxonomy, axiom, (
  ![X]: ((qualityType(X) | modeType(X)) <=> (intrinsicMomentType(X)))
)).

fof(ax_intrinsicMomentType_partition, axiom, (
  ~?[X]: (qualityType(X) & modeType(X))
)).
% Endurant Type (by modal properties of types)

fof(ax_endurantType_taxonomy_properties, axiom, (
  ![X]: ((sortal(X) | nonSortal(X)) <=> (endurantType(X)))
)).

fof(ax_endurantType_partition_properties, axiom, (
  ~?[X]: (sortal(X) & nonSortal(X))
)).

% Sortal

fof(ax_sortal_taxonomy, axiom, (
  ![X]: ((rigidSortal(X) | antiRigidSortal(X)) <=> (sortal(X)))
)).

fof(ax_sortal_partition, axiom, (
  ~?[X]: (rigidSortal(X) & antiRigidSortal(X))
)).

% Rigid Sortal

fof(ax_rigidSortal_taxonomy, axiom, (
  ![X]: ((kind(X) | subkind(X)) <=> (rigidSortal(X)))
)).

fof(ax_rigidSortal_partition, axiom, (
  ~?[X]: (kind(X) & subkind(X))
)).

% Anti-Rigid Sortal

fof(ax_antiRigidSortal_taxonomy, axiom, (
  ![X]: ((phase(X) | role(X)) <=> (antiRigidSortal(X)))
)).

fof(ax_antiRigidSortal_partition, axiom, (
  ~?[X]: (phase(X) & role(X))
)).

% Non-Sortal

fof(ax_nonSortal_taxonomy, axiom, (
  ![X]: ((rigidNonSortal(X) | semiRigidNonSortal(X) | antiRigidNonSortal(X)) <=> (nonSortal(X)))
)).

fof(ax_nonSortal_partition, axiom, (
  ~?[X]: ((rigidNonSortal(X) & semiRigidNonSortal(X)) | (rigidNonSortal(X) & antiRigidNonSortal(X)) | (semiRigidNonSortal(X) & antiRigidNonSortal(X)))
)).

% Category

fof(ax_rigidNonSortal_taxonomy, axiom, (
  ![X]: (rigidNonSortal(X) <=> (category(X)))
)).

% Mixin

fof(ax_semiRigidNonSortal_taxonomy, axiom, (
  ![X]: (semiRigidNonSortal(X) <=> (mixin(X)))
)).

% Anti-Rigid Non-Sortal

fof(ax_antiRigidNonSortal_taxonomy, axiom, (
  ![X]: ((phaseMixin(X) | roleMixin(X)) <=> (antiRigidNonSortal(X)))
)).

fof(ax_antiRigidNonSortal_partition, axiom, (
  ~?[X]: (phaseMixin(X) & roleMixin(X))
)).
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
  ![X,Y,W]: (iof(X,Y,W) => (monadicType(X) | individual(X)))
)).

fof(ax_twoLevelConstrained, axiom, (
  ~?[X,Y,Z,W]: (monadicType(X) & iof(X,Y,W) & iof(Y,Z,W))
)).

% CHANGE:
% X and Y are connected trought R in a world W
%
% Addition of connects individuals taxonomy
fof(ax_relationType_taxonomy, axiom, (
  ![X,Y,R,W]: (connects(X,Y,R,W) => (relationType(R) & world(W) & concreteIndividual(X) & concreteIndividual(Y)))
)).

% CHANGE:
% R can only be a relation if it connects 2 individuals
fof(ax_relationType_must_connect_individuals, axiom, (
  ![R]: (relationType(R) <=> ?[X,Y,W]:(connects(X,Y,R,W)))
)).

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
% Rigidity

fof(ax_dRigid_a18, axiom, (
  ![T]: (rigid(T) <=> (endurantType(T) & (
    ![X]: ((?[W1]: (world(W1) & iof(X,T,W1))) => (![W2]: (world(W2) => iof(X,T,W2))))
  )))
)).

fof(ax_dAntiRigid_a19, axiom, (
  ![T]: (antiRigid(T) <=> (endurantType(T) & (
    ![X]: ((?[W1]: (world(W1) & iof(X,T,W1))) => (?[W2]: (world(W2) & ~iof(X,T,W2)))
  ))))
)).

fof(ax_dSemiRigid_a20, axiom, (
  ![T]: (semiRigid(T) <=> (endurantType(T) & ~rigid(T) & ~antiRigid(T)))
)).

% Sortality

fof(ax_endurantsKind_a21, axiom, (
  ![E]: (endurant(E) => (
    ?[U]: (kind(U) & (![W]: (world(W) => iof(E,U,W))))
  ))
)).

fof(ax_uniqueKind_a22, axiom, (
  ![E,U,W]: ((world(W) & kind(U) & iof(E,U,W)) => (
    ~?[U2,W2]: (kind(U2) & iof(E,U2,W2) & ~(U = U2))
  ))
)).

% Changing "ax_dSortal_a23" from the form it was defined in the paper to "sortals are endurant types that specialize some ultimate sortal" seem to express the same concept while speeding up the execution of SPASS considerably

% fof(ax_dSortal_a23, axiom, (
%   ![S]: (sortal(S) <=> (endurantType(S) & (?[U]: (kind(U) & (![E,W]: (iof(E,S,W) => iof(E,U,W)))))))
% )).

fof(ax_dSortal_a23, axiom, (
  ![S]: ((sortal(S)) <=> (endurantType(S) & (?[U]: (kind(U) & specializes(S,U)))))
)).

% Sortality + Rigidity

fof(ax_rigidSortalsAreRigidAndSortal_xx, axiom, (
  ![T]: ((rigidSortal(T)) <=> (rigid(T) & sortal(T)))
)).

fof(ax_antiRigidSortalsAreAntiRigidAndSortal_xx, axiom, (
  ![T]: ((antiRigidSortal(T)) <=> (antiRigid(T) & sortal(T)))
)).

fof(ax_rigidNonSortalsAreRigidAndNonSortal_xx, axiom, (
  ![T]: ((rigidNonSortal(T)) <=> (rigid(T) & nonSortal(T)))
)).

fof(ax_antiRigidNonSortalsAreAntiRigidAndNonSortal_xx, axiom, (
  ![T]: ((antiRigidNonSortal(T)) <=> (antiRigid(T) & nonSortal(T)))
)).

fof(ax_semiRigidNonSortalsAreSemiRigidAndNonSortal_xx, axiom, (
  ![T]: ((semiRigidNonSortal(T)) <=> (semiRigid(T) & nonSortal(T)))
)).

% Skipping (a29) because we leave the concept of semi-rigid sortals out of this ontology.
% Defining the taxonomy of types of ontological natures through the categorization of the taxonomy of concrete individuals

fof(ax_perdurantTypeDefinition_a44, axiom, (
  ![T]: (perdurantType(T) <=> (
    monadicType(T) & (![P,W]: ((world(W) & iof(P,T,W)) => (perdurant(P))))
  ))
)).

fof(ax_endurantTypeDefinition_a44, axiom, (
  ![T]: (endurantType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (endurant(E))))
  ))
)).

fof(ax_substantialTypeDefinition_a44, axiom, (
  ![T]: (substantialType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (substantial(E))))
  ))
)).

fof(ax_momentTypeDefinition_a44, axiom, (
  ![T]: (momentType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (moment(E))))
  ))
)).

fof(ax_objectTypeDefinition_a44, axiom, (
  ![T]: (objectType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (object(E))))
  ))
)).

fof(ax_collectiveTypeDefinition_a44, axiom, (
  ![T]: (collectiveType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (collective(E))))
  ))
)).

fof(ax_quantityTypeDefinition_a44, axiom, (
  ![T]: (quantityType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (quantity(E))))
  ))
)).

fof(ax_intrinsicMomentTypeDefinition_a44, axiom, (
  ![T]: (intrinsicMomentType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (intrinsicMoment(E))))
  ))
)).

fof(ax_relatorTypeDefinition_a44, axiom, (
  ![T]: (relatorType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (relator(E))))
  ))
)).

fof(ax_qualityTypeDefinition_a44, axiom, (
  ![T]: (qualityType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (quality(E))))
  ))
)).

fof(ax_modeTypeDefinition_a44, axiom, (
  ![T]: (modeType(T) <=> (
    monadicType(T) & (![E,W]: ((world(W) & iof(E,T,W)) => (mode(E))))
  ))
)).
% Ultimate Sortals Definitions (by ontological nature)

fof(ax_objectKindDefinition_a45, axiom, (
  ![T]: (objectKind(T) <=> (objectType(T) & kind(T)))
)).

fof(ax_collectiveKindDefinition_a45, axiom, (
  ![T]: (collectiveKind(T) <=> (collectiveType(T) & kind(T)))
)).

fof(ax_quantityKindDefinition_a45, axiom, (
  ![T]: (quantityKind(T) <=> (quantityType(T) & kind(T)))
)).

fof(ax_modeKindDefinition_a45, axiom, (
  ![T]: (modeKind(T) <=> (modeType(T) & kind(T)))
)).

fof(ax_qualityKindDefinition_a45, axiom, (
  ![T]: (qualityKind(T) <=> (qualityType(T) & kind(T)))
)).

fof(ax_relatorKindDefinition_a45, axiom, (
  ![T]: (relatorKind(T) <=> (relatorType(T) & kind(T)))
)).

% Skipping (t22) because (a21) makes it trivial
% TODO: review whether it is necessary to reduce mereology to concrete individuals; I am leaving this axiom out for the moment

% fof(ax_partArguments, axiom, (
%   ![X,Y]: (part(X,Y) => (concreteIndividual(X) & concreteIndividual(Y)))
% )).

fof(ax_reflexiveParthood, axiom, (
  ![X]: (partOf(X,X))
)).

fof(ax_antiSymmetricParthood_a47, axiom, (
  ![X,Y]: ((partOf(X,Y) & partOf(Y,X)) => (X=Y))
)).

fof(ax_antiSymmetricParthood_a48, axiom, (
  ![X,Y]: ((partOf(X,Y) & partOf(Y,X)) => (X=Y))
)).

fof(ax_transitiveParthood_a49, axiom, (
  ![X,Y,Z]: ((partOf(X,Y) & partOf(Y,Z)) => (partOf(X,Z)))
)).

fof(ax_overlappingWholes_a50, axiom, (
  ![X,Y]: ((overlap(X,Y)) <=> (?[Z]: (partOf(Z,X) & partOf(Z,Y))))
)).

fof(ax_strongSupplementation_a51, axiom, (
  ![X,Y]: (~partOf(X,Y) <=> ?[Z]: (partOf(Z,X) & ~overlap(Z,Y)))
)).

fof(ax_properPart_a52, axiom, (
  ![X,Y]: (properPartOf(X,Y) <=> (partOf(X,Y) & ~partOf(Y,X)))
)).

fof(ax_binarySum_a53, axiom, (
  ![X,Y,Z]: (sum(Z,X,Y) <=> ![W]: (overlap(W,Z) <=> (overlap(W,X) | overlap(W,Y))))
)).
fof(ax_function, axiom,  (
  ![X,Y]: (functionsAs(X,Y) => (endurant(X) & monadicType(Y)))
)).

fof(ax_genericFunctionalDependence_a55, axiom, (
  ![T1,T2,W]: (gfd(T1,T2,W) <=> 
    ![E1]: ((iof(T1,E1,W) & functionsAs(T1,E1)) => ?[E2]: (~(E1=E2) & iof(T2,E2,W) & functionsAs(T2,E2))))
)).

fof(ax_individualFunctionalDependence_a56, axiom, (
  ![E1,T1,E2,T2,W]: (ifd(E1,T1,E2,T2,W) <=> (
    gfd(T1,T2,W) & iof(E1,T1,W) & iof(E2,T2,W) & (functionsAs(E1,T1) => functionsAs(E2,T2))
  ))
)).

fof(ax_componentOf_a57, axiom, (
  ![E1,T1,E2,T2,W]: (componentOf(E1,T1,E2,T2,W) <=> (properPartOf(E1,E2) & ifd(E1,T1,E2,T2,W)))
)).
fof(ax_constitutedByInvolvedNatures_a58, axiom, (
  ![X,Y,W]: (constitutedBy(X,Y,W) => ((endurant(X) <=> endurant(Y)) & (perdurant(X) <=> perdurant(Y)) & world(W)))
)).

fof(ax_constitutedByDifferentKinds_a59, axiom, (
  ![E1,E2,T1,T2,W]: ((constitutedBy(E1,E2,W) & iof(E1,T1,W) & iof(E2,T2,W) & kind(T1) & kind(T2)) => (~(T1=T2)))
)).

fof(ax_genericConstitutionalDependence_a60, axiom, (
  ![T1,T2]: (genericConstitutionalDependence(T1,T2) <=> (
    monadicType(T1) & monadicType(T2) & ![E1,W]: (iof(E1,T1,W) => (
      ?[E2]: (constitutedBy(E1,E2,W) & iof(E2,T2,W)
    )))
  ))
)).

fof(ax_constitution_a61, axiom, (
  ![E1,T1,E2,T2,W]: (constitution(E1,T1,E2,T2,W) <=> (
    iof(E1,T1,W) & iof(E2,T2,W) & genericConstitutionalDependence(T1,T2) & constitutedBy(E1,E2,W)
  ))
)).

fof(ax_wheneverAConstitutedPerdurantExistsTheConstitutedByRelationHolds_a62, axiom, (
  ![P1,P2,W1]: ((constitutedBy(P1,P2,W1) & perdurant(P1)) => (![W2]: (exists(P1,W2) => constitutedBy(P1,P2,W2))))
)).

fof(ax_constitutedByIsAsymmetric_a63, axiom, (
  ![E1,E2,W]: (constitutedBy(E1,E2,W) => ~constitutedBy(E2,E1,W))
)).
fof(ax_exists_a64, axiom, (
  ![X,W]: (exists(X,W) => (thing(X) & world(W)))
)).

fof(ax_existentiallyDependsOn_a65, axiom, (
  ![X,Y]: (existentiallyDependsOn(X,Y) <=> (![W]: (exists(X,W) => exists(Y,W))))
)).

fof(ax_existentiallyIndependentOf_a66, axiom, (
  ![X,Y]: (existentiallyIndependentOf(X,Y) <=> (~existentiallyDependsOn(X,Y) & ~existentiallyDependsOn(Y,X)))
)).

% TODO: introduce transitivity and anti-symmetry of existential dependence
% TODO: introduce continuity of existence with perdurants never ceasing to exist
%  Inherence

fof(ax_inherenceImpliesExistentialDependence_a67, axiom, (
  ![M,X]: (inheresIn(M,X) => existentiallyDependsOn(M,X))
)).

fof(ax_thingsInvolvedInInherence_a68, axiom, (
  ![M,X]: (inheresIn(M,X) => (moment(M) & (monadicType(X) | endurant(X))))
)).

% TODO: add definition (d5) for the "bearer" axiom

fof(ax_irreflexiveInherence, axiom, (
  ![X]: (~inheresIn(X,X))
)).

fof(ax_asymmetricInherence, axiom, (
  ![X,Y]: (inheresIn(X,Y) => ~inheresIn(Y,X))
)).

fof(ax_intransitiveInherence, axiom, (
  ![X,Y,Z]: ((inheresIn(X,Y) & inheresIn(Y,Z)) => ~inheresIn(X,Z))
)).

fof(ax_uniqueInherence_a69, axiom, (
  ![X,Y,Z]: ((inheresIn(X,Y) & inheresIn(X,Z)) => (Y=Z))
)).

% Moments

fof(ax_dMomentOf_d6, axiom, (
  ![M,X]: (momentOf(M,X) <=> (inheresIn(M,X) | (
    ?[M2]: (inheresIn(M,M2) & momentOf(M2,X))
  )))
)).

fof(ax_dUltimateBearerOf_d7, axiom, (
  ![B,M]: (ultimateBearerOf(B,M) <=> (~moment(B) & momentOf(M,B)))
)).

fof(ax_everyMomentHasUniqueAUltimateBearer_a70, axiom, (
  ![M]: (moment(M) => (?[B]: (ultimateBearerOf(B,M) & (
    ![B2]: (ultimateBearerOf(B2,M) <=> (B=B2))
  ))))
)).

fof(ax_noMomentOfCycles, axiom, (
  ~?[M]: momentOf(M,M)
)).
% External Dependence and Externally Dependent Modes

fof(ax_externallyDependsOn_a71, axiom, (
  ~?[M,X]: (externallyDependsOn(M,X) <=> (existentiallyDependsOn(M,X) & (![Y]: (inheresIn(M,Y) => existentiallyIndependentOf(X,Y)))))
)).

% CHANGED:
% removed to simplify the formalization
% fof(ax_dExternallyDependentMode_a72, axiom, (
%   ![M]: (externallyDependentMode(M) <=> (mode(M) & (?[X]: (externallyDependsOn(M,X)))))
% )).

% Founded by
% CHANGED:
% removed to simplify the formalization
% fof(ax_foundedByInvolvedThings_a73, axiom, (
%   ![M,P]: (foundedBy(M,P) <=> ((externallyDependentMode(M) | relator(M)) & perdurant(P)))
% )).

% CHANGED:
% removed to simplify the formalization
% fof(ax_relationalModesHaveAFoundationEvent_a74, axiom, (
%   ![M]: ((externallyDependentMode(M) | relator(M)) => (?[P]: (foundedBy(M,P))))
% )).

% CHANGED:
% removed to simplify the formalization
% fof(ax_uniqueFoundationEvents_a74, axiom, (
%   ![M,P1,P2]: ((foundedBy(M,P1) & foundedBy(M,P2)) => (P1=P2))
% )).

% Qua Individual

% CHANGED:
% removed to simplify the formalization
% fof(ax_dQuaIndividualOf_a75, axiom, (
%   ![X,Y]: (quaIndividualOf(X,Y) <=> (![Z]: (overlap(Z,X) <=> (
%     ?[X1, X2]: ((externallyDependsOn(Z,X1) & foundedBy(Z,X2)) & inheresIn(Z,Y) & (![P]: (foundedBy(X,P) => foundedBy(Z,P)))
%   )))))
% )).

% CHANGED:
% removed to simplify the formalization
% fof(ax_dQuaIndividual_a76, axiom, (
%   ![X]: (quaIndividual(X) <=> ?[Y]: (quaIndividualOf(X,Y)))
% )).

% Qua Individual is already defined as a subtype of Externally Dependent Mode in the taxonomy; skipping (a78)

% Skipping (a79); already defined in (a74)

% CHANGED:
% removed to simplify the formalization
% fof(ax_thePartsOfARelatorShareTheFoundationOfTheWhole_a80, axiom, (
%   ![X,Y,Z]: ((relator(X) & partOf(Z,X)) => (![P]: (foundedBy(Z,P) => foundedBy(X,P))))
% )).

% CHANGE:
% removed to simplify the formalization. It is generating conflicts when defining relatorKind(X)
% fof(ax_dRelator_a81, axiom, (
%   ![R]: (relator(R) <=> (
%     (?[X]: (properPartOf(X,R))
%     & (![Y,Z]: ((properPartOf(Y,R) & properPartOf(Z,R)) => (quaIndividual(Y) & quaIndividual(Z) & existentiallyDependsOn(Y,Z) & existentiallyDependsOn(Z,Y) & (![P]: (foundedBy(Y,P) <=> foundedBy(Z,P))))))
%     & (![Y2,Z2]: ((properPartOf(Y2,R) & quaIndividual(Z2) & existentiallyDependsOn(Y2,Z2) & existentiallyDependsOn(Z2,Y2) & (![P2]: (foundedBy(Y2,P2) <=> foundedBy(Z2,P2)))) => (properPartOf(Z2,R))))
%   )))
% )).

% CHANGE:
% not necessary a quaIndividualOf and only the taxonomy of the involved things
fof(ax_dMediates_a82, axiom, (
  ![R,E]: (mediates(R,E) => (relator(R) & endurant(E)))
)).

fof(ax_relator_has_mediates, axiom, (
  ![R]: (relator(R) => ?[E1,E2]:(E1!=E2 & E1!=R & E2!=R & endurant(E1) & endurant(E2) & mediates(R, E1) & mediates(R, E2)))
)).

%%%%%%%%%%%%%%%%%%%% Characterization %%%%%%%%%%%%%%%%%%%%

% CHANGE:
% momentType(M) to momentType(MT)
fof(ax_endurantTypeCharacterizationByMomentTypes_a83, axiom, (
  ![ET,MT]: (characterizes(MT,ET) => (
    endurantType(ET)
    & momentType(MT)
    & (![E,W]: (iof(E,ET,W) => (?[M]: (iof(M,MT,W) & inheresIn(M,E)))))
    & (![M2,W2]: (iof(M2,MT,W2) => (?[E2]: (iof(E2,ET,W2) & inheresIn(M2,E2)))))
  ))
)).
%%%%%%%%%%%% Qualities and Quality Structures %%%%%%%%%%%%

% Skipping (a85); previously introduced in the taxonomy
% Skipping (a86); previously introduced in the taxonomy
% Skipping (a87); previously introduced in the taxonomy

% Quality Structures

fof(ax_dQualityStructure_d10, axiom, (
  ![QS]: (qualityStructure(QS) <=> (?[QT]: (qualityType(QT) & associatedWith(QS,QT))))
)).

fof(ax_dQualityStructure_d10, axiom, (
  ![QS]: (qualityStructure(QS) <=> (?[QT]: (qualityType(QT) & associatedWith(QS,QT))))
)).
%%%%%%%%%%%%%%%% Endurants and Perdurants %%%%%%%%%%%%%%%%

fof(ax_manifestsInvolvedThings_a104, axiom, (
  ![E,P]: (manifests(E,P) => (endurant(E) & perdurant(P)))
)).

fof(ax_lifeOfInvolvedThings_a105, axiom, (
  ![E,P]: (lifeOf(P,E) => (
    endurant(E)
    & (![P2]: (overlap(P2,P) <=> (perdurant(P2) & manifests(E,P2))))
  ))
)).

% TODO: review ax_lifeOfInvolvedThings_a105 and its translation of the small sigma predicate schema in (a105)

fof(ax_meetsInvolvedThings_a106, axiom, (
  ![P1,P2]: (meets(P1,P2) => (perdurant(P1) & perdurant(P2)))
)).

% fof(ax_powerType_estereotype, axiom, (
%     ![T]: (powerType(T) => (monadicType(T)))
% )).
% fof(ax_powerType_specializes, axiom, (
%     ![T1, T2]: ((powerType(T1) & specializes(T1, T2) ) => (powerType(T2)))
% )).

% fof(ax_subkind_specializes_exactly_one_kind, axiom,
%     ![T1]: (subkind(T1) => (![T2,T3]: (
%                 (kind(T2) & kind(T3) & specializes(T1,T2) & specializes(T1,T3))
%                    => T2 = T3
%                 )
%            )
%     )
% ).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% Disjointness
%
% Axioms for reified class disjointness.
% 
% - `disjointWith(C1, C2)` ⇔ C1 ≠ C2 ∧ no instance belongs to both in any world.
% - Symmetric: if C1 is disjoint with C2, then C2 is disjoint with C1.
% - Irreflexive: no class is disjoint with itself.
%

% A class C1 is disjoint with C2 iff they are different and share no instance in any world
fof(ax_disjointWith, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) <=>
              (monadicType(C1) & monadicType(C2)  & (C1 != C2) & ~?[X,W]: (iof(X, C1, W) & iof(X, C2, W)))
  )
)).

% Disjointness is symmetric: if C1 is disjoint with C2, then C2 is disjoint with C1
fof(ax_disjointWith_symmetry, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => disjointWith(C2, C1))
)).

% No class is disjoint with itself (irreflexivity)
fof(ax_disjointWith_irreflexivity, axiom, (
  ![C1]: (~disjointWith(C1, C1))
)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% Overlap
%
% Axioms for reified class overlap.
%
% - `overlappingWith(C1, C2)` ⇔ ∃x,w such that x ∈ C1 and x ∈ C2 in some world w.
% - Symmetric: if C1 overlaps C2, then C2 overlaps C1.
% - Reflexive: every class overlaps with itself (if it is a type).
%

% Two classes overlap iff there exists an individual that is instance of both in some world
fof(ax_overlappingWith, axiom, (
  ![C1, C2]: (overlappingWith(C1, C2) <=>
              ( monadicType(C1) & monadicType(C2) & ?[X,W]: (iof(X, C1, W) & iof(X, C2, W)))
  )
)).

% Overlapping is symmetric
fof(ax_overlapping_symmetry, axiom, (
  ![C1, C2]: (overlappingWith(C1, C2) => overlappingWith(C2, C1))
)).

% Any class overlaps with itself (reflexivity)
fof(ax_overlapping_reflexivity, axiom, (
  ![C]: (monadicType(C) => overlappingWith(C, C))
)).

% Disjoint classes cannot overlap
fof(ax_disjoint_implies_not_overlapping, axiom, (
  ![C1, C2]: (disjointWith(C1, C2) => ~overlappingWith(C1, C2))
)).


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
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_0_ax__ontology_classes_estereotypes, axiom, (
        relatorKind(rf_Class)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Generalization Sets
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Relations
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%% Relation Estereotypes


