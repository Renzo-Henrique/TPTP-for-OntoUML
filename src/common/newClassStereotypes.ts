import {ClassStereotype } from 'ontouml-js';


export enum ClassStereotypeRefactoredStringsForAxioms {
    TYPE = "type_",///
    HISTORICAL_ROLE = "perdurantType", /// UFO-B
    HISTORICAL_ROLE_MIXIN = "perdurantType",/// UFO-B
    EVENT = "perdurantType",/// UFO-B
    SITUATION = "perdurantType",/// UFO-B
    CATEGORY = "category", ///
    MIXIN = "mixin", ///
    ROLE_MIXIN = "roleMixin",///
    PHASE_MIXIN = "phaseMixin",///
    KIND = "kind", ///
    COLLECTIVE = "collectiveKind",
    QUANTITY = "quantityKind",
    RELATOR = "relatorKind",
    QUALITY = "qualityKind",
    MODE = "modeKind",
    SUBKIND = "subkind",///
    ROLE = "role",///
    PHASE = "phase",///
    ENUMERATION = "enumeration",// ERROR
    DATATYPE = "datatype",// ERROR
    ABSTRACT = "abstract"// ERROR
}

export function mapClassStereotypeToRefactored(
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
export const ClassStereotypesAvailableInAxioms: ClassStereotype[] = Object.values(ClassStereotype).filter(
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
export function isClassStereotypeAvailableInAxioms(stereotype: ClassStereotype): boolean {
  return ClassStereotypesAvailableInAxioms.includes(stereotype);
}
