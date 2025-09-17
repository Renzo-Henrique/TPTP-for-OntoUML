import {RelationStereotype } from 'ontouml-js';


export enum RelationStereotypeRefactoredStringsForAxioms {
    MATERIAL = "materialType", /// ---
    DERIVATION = "derivation", /// ---
    COMPARATIVE = "comparative", /// ---
    MEDIATION = "mediatesType", // baseRelationAxioms.ts
    CHARACTERIZATION = "characterizes",// baseRelationAxioms.ts
    EXTERNAL_DEPENDENCE = "externallyDependsOn", // OR existentiallyDependsOn ?
    COMPONENT_OF = "properPartOf",/// se properPartOf(X, Y) nesse caso é para checar a taxonomia de X?
    MEMBER_OF = "properPartOf", /// se properPartOf(X, Y) nesse caso é para checar a taxonomia de X?
    SUBCOLLECTION_OF = "properPartOf", /// se properPartOf(X, Y) nesse caso é para checar a taxonomia de X?
    SUBQUANTITY_OF = "properPartOf", /// se properPartOf(X, Y) nesse caso é para checar a taxonomia de X?
    INSTANTIATION = "instantiation",// iof/3
    TERMINATION = "ufo_b_type",/// UFO-B
    PARTICIPATIONAL = "ufo_b_type",/// UFO-B
    PARTICIPATION = "ufo_b_type",/// UFO-B
    HISTORICAL_DEPENDENCE = "ufo_b_type",/// UFO-B
    CREATION = "ufo_b_type",/// UFO-B
    MANIFESTATION = "manifests", /// TODO:: verify?
    BRINGS_ABOUT = "ufo_b_type",/// UFO-B
    TRIGGERS = "ufo_b_type"/// UFO-B
}

export function mapRelationStereotypeToRefactored(
  stereotype: RelationStereotype
): string {
  // pega a chave (ex: "COLLECTIVE")
  const key = Object.keys(RelationStereotype).find(
    k => (RelationStereotype as any)[k] === stereotype
  );

  if (!key) {
    throw new Error(`Stereotype não encontrado: ${stereotype}`);
  }

  // usa a mesma chave em ClassStereotypeRefactored
  return (RelationStereotypeRefactoredStringsForAxioms as any)[key];
}

// ///
// /// Constants
// ///
