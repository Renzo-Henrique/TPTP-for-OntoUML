import {ClassStereotype } from 'ontouml-js';

///
/// Constants
///

export const AvailableInAxiomsClassStereotypes: ClassStereotype[] = Object.values(ClassStereotype).filter(
  value =>
    value !== ClassStereotype.ENUMERATION &&
    value !== ClassStereotype.DATATYPE &&
    value !== ClassStereotype.ABSTRACT
);

export const RigidSortalStereotypes = [
  ClassStereotype.KIND,
  ClassStereotype.SUBKIND
];

export const AntiRigidSortalStereotypes = [
  ClassStereotype.PHASE,
  ClassStereotype.ROLE
];

///
/// Functions
///
export function isAvailableInAxiomsClassStereotypes(stereotype: ClassStereotype): boolean {
  return AvailableInAxiomsClassStereotypes.includes(stereotype);
}

export function isRigidSortalStereotype(stereotype: ClassStereotype): boolean {
  return RigidSortalStereotypes.includes(stereotype);
}

export function isAntiRigidSortalStereotype(stereotype: ClassStereotype): boolean {
  return AntiRigidSortalStereotypes.includes(stereotype);
}