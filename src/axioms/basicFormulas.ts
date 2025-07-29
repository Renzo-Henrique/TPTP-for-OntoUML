import { Class} from 'ontouml-js';

export function getDisjunctionsOfClassesFormula(classes: Class[], tabs: string, entity:string, world:string): string{
  const disjunctions: string[] = [];
  for (let i = 0; i < classes.length; i++) {
      for (let j = i + 1; j < classes.length; j++) {
        const a = classes[i].getName();
        const b = classes[j].getName();


        i > 0 || j > 1 ?  disjunctions.push(`${tabs}~ (${a}(${entity}, ${world}) & ${b}(${entity}, ${world}))`) : 
                          disjunctions.push(`~ (${a}(${entity}, ${world}) & ${b}(${entity}, ${world}))`);

        
        
      }
    }
  
    return disjunctions
      .map(content => content)
      .join('& \n');;
}

export function getOrFromClassesFormula(classes: Class[], entity:string, world:string): string{
  return '(' + classes
  .map(content =>`${content.getName()}(${entity}, ${world})`)
  .join(' | ') + ')';
}

export function getCombinationOfClassesFormula(classes: Class[], tabs: string, entity:string, world:string): string{
  const combinationOfClasses = getCombinations(classes);

  return combinationOfClasses
    .map(content => '(' +content
      .map(content2 => `${content2.getName()}(${entity}, ${world}) `)
      .join('& ') 
      
      + ')'

    )
    .join(' | \n' + tabs) + '\n';
}

function getCombinations<T>(array: T[]): T[][] {
  const result: T[][] = [];

  const combine = (start: number, path: T[]) => {
    if (path.length >= 2) {
      result.push([...path]);
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