// idGenerator.ts
let idCounter = 0;
const prefix = 'id_';
const sufix = '_ax_';

export function getNextAxiomId(): string {
  return `${prefix}${idCounter++}${sufix}`;
}

export function resetAxiomId() {
  idCounter = 0;
}