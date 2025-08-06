import {ClassStereotype } from 'ontouml-js';

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
