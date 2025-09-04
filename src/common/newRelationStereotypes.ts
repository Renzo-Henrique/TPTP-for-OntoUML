import {RelationStereotype } from 'ontouml-js';


export enum RelationStereotypeRefactoredStringsForAxioms {
    MATERIAL = "material", /// ERROR
    DERIVATION = "derivation", /// ERROR
    COMPARATIVE = "comparative", /// ERROR
    MEDIATION = "mediates",
    CHARACTERIZATION = "characterizes",
    EXTERNAL_DEPENDENCE = "externallyDependsOn",
    COMPONENT_OF = "componentOf",// componentOf/4
    MEMBER_OF = "memberOf", /// ERROR
    SUBCOLLECTION_OF = "subCollectionOf", /// ERROR
    SUBQUANTITY_OF = "subQuantityOf", /// ERROR
    INSTANTIATION = "iof",// iof/3
    TERMINATION = "termination",/// ERROR
    PARTICIPATIONAL = "participational",/// ERROR
    PARTICIPATION = "participation",/// ERROR
    HISTORICAL_DEPENDENCE = "historicalDependence",/// ERROR
    CREATION = "creation",/// ERROR
    MANIFESTATION = "manifests",
    BRINGS_ABOUT = "bringsAbout",/// ERROR
    TRIGGERS = "triggers"/// ERROR
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
