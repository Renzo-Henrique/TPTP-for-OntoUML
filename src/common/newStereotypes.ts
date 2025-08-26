import {ClassStereotype } from 'ontouml-js';


export enum ClassStereotypeRefactoredStringsForAxioms {
    TYPE = "type",
    HISTORICAL_ROLE = "historicalRole",
    HISTORICAL_ROLE_MIXIN = "historicalRoleMixin",
    EVENT = "event",
    SITUATION = "situation",
    CATEGORY = "category",
    MIXIN = "mixin",
    ROLE_MIXIN = "roleMixin",
    PHASE_MIXIN = "phaseMixin",
    KIND = "kind",
    COLLECTIVE = "collectiveKind",
    QUANTITY = "quantityKind",
    RELATOR = "relatorKind",
    QUALITY = "qualityKind",
    MODE = "modeKind",
    SUBKIND = "subkind",
    ROLE = "role",
    PHASE = "phase",
    ENUMERATION = "enumeration",
    DATATYPE = "datatype",
    ABSTRACT = "abstract"
}

export function mapStereotypeToRefactored(
  stereotype: ClassStereotype
): string {
  // pega a chave (ex: "COLLECTIVE")
  const key = Object.keys(ClassStereotype).find(
    k => (ClassStereotype as any)[k] === stereotype
  );

  if (!key) {
    throw new Error(`Stereotype não encontrado: ${stereotype}`);
  }

  // usa a mesma chave em ClassStereotypeRefactored
  return (ClassStereotypeRefactoredStringsForAxioms as any)[key];
}

// ///
// /// Constants
// ///

/**
 * Array of class stereotypes that are considered available for use in axioms.
 * Excludes ENUMERATION, DATATYPE, and ABSTRACT stereotypes.
 */
export const AvailableInAxiomsClassStereotypes: ClassStereotype[] = Object.values(ClassStereotype).filter(
  value =>
    value !== ClassStereotype.ENUMERATION &&
    value !== ClassStereotype.DATATYPE &&
    value !== ClassStereotype.ABSTRACT
);

// ///
// /// Functions
// ///
/**
 * Checks whether a given class stereotype is available for use in axioms.
 *
 * @param stereotype - The class stereotype to check.
 * @returns True if the stereotype is available in axioms, false otherwise.
 */
export function isAvailableInAxiomsClassStereotypes(stereotype: ClassStereotype): boolean {
  return AvailableInAxiomsClassStereotypes.includes(stereotype);
}
