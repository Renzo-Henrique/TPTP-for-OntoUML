import { Class} from 'ontouml-js';

/**
 * Generates a conjunction of negated conjunctions (disjunction) of pairs of classes,
 * expressing that any two classes in the list are disjoint (no individual can be instance of both).
 *
 * Example output (simplified):
 *    (~(A(X, W) & B(X, W))) & 
 *    (~(A(X, W) & C(X, W))) & 
 *    (~(B(X, W) & C(X, W)))
 *
 * @param classes - Array of OntoUML classes to generate disjunction formulas for.
 * @param tabs - String with tab characters to indent lines except the first.
 * @param entity - The variable name representing the individual (usually 'X').
 * @param world - The variable name representing the world/context (usually 'W').
 * @returns A string containing the conjunction of disjunction formulas.
 */
export function getDisjunctionsOfClassesFormula(classes: Class[], tabs: string, entity:string, world:string): string{
  const disjunctions: string[] = [];
  for (let i = 0; i < classes.length; i++) {
      for (let j = i + 1; j < classes.length; j++) {
        const a = classes[i];
        const b = classes[j];

        const disjunctionFormula = '~' + getAndFromClassesFormula([a,b], entity, world);
        i > 0 || j > 1 ?  disjunctions.push(tabs + disjunctionFormula) : 
                          disjunctions.push(disjunctionFormula);  
      }
    }
  
    return disjunctions
      .map(content => content)
      .join(' & \n');;
}

/**
 * Generates a logical OR formula for the given classes,
 * stating that the individual is instance of at least one of the classes.
 *
 * Example output:
 *   (ClassA(X, W) | ClassB(X, W) | ClassC(X, W))
 *
 * @param classes - Array of OntoUML classes.
 * @param entity - The variable name representing the individual.
 * @param world - The variable name representing the world/context.
 * @returns A string representing the disjunction formula.
 */
export function getOrFromClassesFormula(classes: Class[], entity:string, world:string): string{
  return '( ' + classes
  .map(content =>`${content.getName()}(${entity}, ${world})`)
  .join(' | ') + ' )';
}

/**
 * Generates a (logical AND formula for the given classes,
 * stating that the individual is instance of all the classes.
 *
 * Example output:
 *   (ClassA(X, W) & ClassB(X, W) & ClassC(X, W))
 *
 * @param classes - Array of OntoUML classes.
 * @param entity - The variable name representing the individual.
 * @param world - The variable name representing the world/context.
 * @returns A string representing the conjunction formula.
 */
export function getAndFromClassesFormula(classes: Class[], entity:string, world:string): string{
  return '( ' + classes
  .map(content =>`${content.getName()}(${entity}, ${world})`)
  .join(' & ') + ' )';
}

/**
 * Generates a disjunction of all conjunctions of every combination of at least two classes,
 * representing possible overlaps among classes.
 *
 * NOTE: This function currently has a TODO to fix overlap issues.
 *
 * Example output (for classes A, B, C):
 *   ( (A(X, W) & B(X, W) ) & (~ C(X, W)) ) | 
 *   ( (A(X, W) & C(X, W) ) & (~ B(X, W)) )| 
 *   ( (B(X, W) & C(X, W) ) & (~ A(X, W)))
 * 
 * Example output (for classes A, B, C, D):
 *   ( (A(X, W) & B(X, W) ) & (~ C(X, W)) ) |
 *   ( (A(X, W) & B(X, W) ) & (~ D(X, W)) ) |
 *   
 *   ( (A(X, W) & C(X, W) ) & (~ B(X, W)) ) |
 *   ( (A(X, W) & C(X, W) ) & (~ D(X, W)) ) |
 * 
 *   ( (A(X, W) & D(X, W) ) & (~ B(X, W)) ) |
 *   ( (A(X, W) & D(X, W) ) & (~ C(X, W)) ) |
 *    ....
 * 
 * @param classes - Array of OntoUML classes.
 * @param tabs - String with tab characters used for indenting lines after the first.
 * @param entity - The variable name representing the individual.
 * @param world - The variable name representing the world/context.
 * @returns A string representing the disjunction of conjunctions formula.
 */
export function getCombinationOfClassesFormula(classes: Class[], tabs: string, entity:string, world:string): string{
  
  //TODO:: reformular para corrigir o overlap  
  const combinationOfClasses = getCombinationsWithComplement(classes, classes.length - 1);

  return combinationOfClasses
  .map(content => `(${getAndFromClassesFormula(content[0], entity, world)} & ~(${getAndFromClassesFormula(content[1], entity, world)}) )`)
  .join(' | \n' + tabs) + ' | \n' + tabs + getAndFromClassesFormula(classes, entity, world);
}

//TODO:: Deve ter uma combinação de negações da segunda tupla também!
function getCombinationsWithComplement<T>(array: T[], k: number): [T[], T[]][] {
  const result: [T[], T[]][] = [];

  const combine = (start: number, path: T[]) => {
    // Sempre que path tiver tamanho entre 2 e k, adiciona resultado
    if (path.length >= 2 && path.length <= k) {
      const complement = array.filter(x => !path.includes(x));
      result.push([ [...path], complement ]);
    }

    if (path.length === k) {
      return; // não gera combinações maiores que k
    }

    for (let i = start; i < array.length; i++) {
      path.push(array[i]);
      combine(i + 1, path);
      path.pop();
    }
  };

  combine(0, []);
  return result;
}

/**
 * Gera combinações 2 a 2 (pares) da lista
 */
export function getPairCombinations<T>(array: T[]): [T, T][] {
  const result: [T, T][] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      result.push([array[i], array[j]]);
    }
  }

  return result;
}
