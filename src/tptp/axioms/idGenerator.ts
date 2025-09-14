// idGenerator.ts
let idCounterAxiom = 0;
const prefix = 'id_';
const sufix = '_ax_';



/**
 * Generates a unique axiom identifier by combining a prefix, 
 * an incrementing counter, and a suffix.
 *
 * @returns A unique string identifier for an axiom (e.g., "id_0_ax_").
 */
export function getNextAxiomId(): string {
  return `${prefix}${idCounterAxiom++}${sufix}`;
}

/**
 * Resets the internal axiom ID counter to zero.
 * 
 * Useful for test cases or when regenerating axioms from scratch.
 */
export function resetAxiomId() {
  idCounterAxiom = 0;
}

export function getReifiedPrefix(): string{
  return 'rf_';
}

export function getClassPrefix(): string{
  return 'cl_';
}

