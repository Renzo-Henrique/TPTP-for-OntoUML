import { Project, Class, Generalization, GeneralizationSet, ClassStereotype } from 'ontouml-js';
import {camelCase} from 'lodash';

export const worldAndEntity = `%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Existência de mundos e entidades
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Existe pelo menos um mundo
fof(ax_exists_world, axiom,(
  ?[W]: world(W)
)).
% Existe pelo menos uma entidade
fof(ax_exists_entity, axiom,(
  ?[E]: entity(E)
)).
% Entidades são diferentes de mundos
fof(ax_entity_different_than_world, axiom, (
  ![X, W]: ( exists(X, W)  => (X != W & entity(X) & world(W)))
)).`;


const stereotypesWithoutDatatype = Object.values(ClassStereotype).filter(
  value => value !== ClassStereotype.DATATYPE
);

function checkEmptyForError(elements: any[], errorMessage: string): void{

  if(elements.length === 0) {
    console.error(errorMessage);
    process.exit(1);
  }
}

function refactorNames(project: Project): void {
  const classes = project.getAllClasses();

  for (const cls of classes) {
    const original = cls.getName();

    if (!original) continue;

    const camel = camelCase(original);
    const newName = `cl_${camel}`;
    cls.setName(newName);
  }
}

function printAllClasses(project: Project): void{
    const consoleOutput = project.model.getAllClasses()
    .map(content => `${content.getName()} :: ${content.stereotype}`)
    .join('\n');

    console.log(consoleOutput);
}

export function generateTptpAxioms(project: Project): string[]{
  printAllClasses(project);
  //----------
  refactorNames(project);
  const formulas: string[] = [];

  formulas.push(worldAndEntity);

  //
  //const kinds = getNamesFromClasses(project.getClassesWithKindStereotype());
  //const subkinds = getNamesFromClasses(project.getClassesWithSubkindStereotype());
  //const rigidSortals = kinds.concat(subkinds);

  //const phases = getNamesFromClasses(project.getClassesWithPhaseStereotype());
  //const roles = getNamesFromClasses(project.getClassesWithRoleStereotype());
  //const antiRigidSortals = phases.concat(roles);

  var formulaComment = `% Tudo que existe deve ser instância de sortal`;
  formulas.push(formulaComment);
  formulas.push(existenceOfSortalInstancesAxiom(project));

  formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM SORTAL EM ALGUM MUNDO`;
  formulaComment += `\n% CONTINUAM SENDO INSTÂNCIAS DO MESMO SORTAL EM TODOS OS MUNDOS NO QUAL EXISTAM`;
  formulas.push(formulaComment);
  formulas.push(existenceOfRigidSortalClassesAxioms(project));

  formulaComment = `% TODAS AS COISAS QUE SAO INSTANCIAS DE UM TIPO-ANTI-RIGIDO EM ALGUM MUNDO`;
  formulaComment += `\n% PODEM NÃO SE-LO EM OUTRO MUNDO`;
  formulas.push(formulaComment);
  formulas.push(existenceOfAntiRigidSortalClassesAxioms(project));


  formulaComment = `%%%%%%\n%%%%%%\n%%%%%%\n%Especializações`;
  formulas.push(formulaComment);
  formulas.push(generalizationAxioms(project));

  formulaComment = `%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%\n%%% Genset\n%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%`;
  formulas.push(formulaComment);
  formulas.push(generalizationSetAllAxioms(project));

  
  formulaComment = `\n\n%% NAO TENHO CERTEZA SE ISSO É NECESSÁRIO/CORRETO!?!? É PRA SIMULAÇÃO DE MUNDOS?`;
  formulaComment += `\n%% SE FOR, MELHOR DEIXAR NO FINAL E COM UM COMENTÁRIO EXPLICANDO`;
  formulas.push(formulaComment);
  formulas.push(existenceOfAtLeastOneOfEachClassAxioms(project));
  
  return formulas;
}



///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
function existenceOfSortalInstancesAxiom(project: Project): string {

  const errorMessage = 'Erro: A ontologia não possui sortal para ser instanciada'
  checkEmptyForError(project.getClassesWithKindStereotype(), errorMessage);

  const result = project.getClassesWithKindStereotype()
    .map(content => `${content.getName()}(X,W)`)
    .join(' | ');

  return `fof(ax_existence_of_sortal_instances, axiom, (
  ![X, W]: ( exists(X, W) => (${result}))
)).`;
}

function existenceOfRigidSortalClassesAxioms(project: Project): string {
  const errorMessage = 'Erro: A ontologia não possui rigid sortals';
  const rigidSortal: Class[] = project.getClassesWithKindStereotype().concat(project.getClassesWithSubkindStereotype());

  checkEmptyForError(rigidSortal, errorMessage);

  return rigidSortal
    .map(content => existenceOfRigidSortalClassAxiom(content))
    .join('\n');
}

function existenceOfRigidSortalClassAxiom(projectClass: Class): string{
  return `fof(ax_rigid_sortal_ex_${projectClass.getName()}, axiom, (
  ![X, W1]: (${projectClass.getName()}(X, W1) => ( 
              (exists(X, W1) &
            ![W2]: ((exists(X, W2) & W1 != W2) => (${projectClass.getName()}(X, W2)))
    )
  )
))).`
}

function existenceOfAntiRigidSortalClassesAxioms(project: Project): string {
  const phaseAxioms = project.getClassesWithPhaseStereotype()
                  .map(content => existenceOfAntiRigidSortalClassAxiom(content))
                  .join('\n');

  const roleAxioms = project.getClassesWithRoleStereotype()
                  .map(content => existenceOfAntiRigidSortalClassAxiom(content))
                  .join('\n');

  return phaseAxioms.concat(roleAxioms);
}

function existenceOfAntiRigidSortalClassAxiom(projectClass: Class): string{
  return `fof(ax_antirigid_ex_${projectClass.getName()}, axiom, (
  ![X, W1]: (${projectClass.getName()}(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~${projectClass.getName()}(X, W2)))
    )
  )
)).`
}

function generalizationAxioms(project: Project): string {
  return project.getAllGeneralizations()
    .map(content => generalizationAxiom(content))
    .join('\n');
}

function generalizationAxiom(generalization: Generalization): string{
  return `fof(ax_especialization_of_created_class_${generalization.specific.getName()}, axiom, (
  ![X, W]: (${generalization.specific.getName()}(X, W)  => ${generalization.general.getName()}(X, W))
)).`
}

function existenceOfAtLeastOneOfEachClassAxioms(project: Project): string {
  const errorMessage = 'Erro: Pelo menos uma classe deveria existir ';
  checkEmptyForError(project.getAllClassesByStereotype(stereotypesWithoutDatatype), errorMessage);
  //return '';
  return project.getAllClassesByStereotype(stereotypesWithoutDatatype)
    .map(content => existenceOfAtLeastOneOfClassAxiom(content))
    .join('\n');
}

function existenceOfAtLeastOneOfClassAxiom(projectClass: Class): string{
  return `fof(ax_exists_at_least_one_of_${projectClass.getName()}, axiom,(
  ?[X, W]: (exists(X, W) & ${projectClass.getName()}(X, W))
)).`
}

/////////////
/////////////
/////////////
/////////////
/////////////
function getDisjunctionsOfClassesFormula(classes: Class[], tabs: string, entity:string, world:string): string{
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

function getOrFromClassesFormula(classes: Class[], entity:string, world:string): string{
  return '(' + classes
  .map(content =>`${content.getName()}(${entity}, ${world})`)
  .join(' | ') + ')';
}

function getCombinationOfClassesFormula(classes: Class[], tabs: string, entity:string, world:string): string{
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

function generalizationSetAllAxioms(project: Project): string {
  
  return project.getAllGeneralizationSets()
    .map(content => generalizationSetAxiom(content))
    .join('\n');
}

function generalizationSetAxiom(generalizationSet: GeneralizationSet): string{

  function disjointGeneralizationSetAxiom(): string{
    const comment = `% Disjoint set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t';
    
   const disjunctionAxiom = getDisjunctionsOfClassesFormula(generalizationSet.getSpecificClasses(), additionalTabs, 'X', 'W');
    return comment + `fof(ax_generalization_set_disjoint_${generalizationSet.getName()}, axiom, (
    ![X, W]: (${disjunctionAxiom})\n)).`;
  }

  function overlapGeneralizationSetAxiom(): string{
    const comment = `% Overlap set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t';
    const combinationOfClasses = getCombinationOfClassesFormula(generalizationSet.getSpecificClasses(), additionalTabs, 'X', 'W');

    return comment + `fof(ax_generalization_set_overlap_${generalizationSet.getName()}, axiom, (
    ?[X, W]: (${combinationOfClasses})\n)).`;
  }

  function completeGeneralizationSetAxiom(): string{
    const comment = `% Complete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;

    return comment + `fof(ax_generalization_set_complete_PhasesOfPerson, axiom, (
    ![X, W]: (${generalizationSet.getGeneralClass().getName()}(X, W) => ${getOrFromClassesFormula(generalizationSet.getSpecificClasses(), 'X', 'W')})\n)).`;
  }

  function incompleteGeneralizationSetAxiom(): string{
    const comment = `% Incomplete set of general -${generalizationSet.getGeneralClass().getName()}-\n`;
    const additionalTabs = '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
    const incompleteAxiom = generalizationSet.getSpecificClasses()
      .map(content => `${content.getName()}(X, W)`)
      .join(` &\n${additionalTabs}`);


    return comment + `fof(ax_generalization_set_incomplete_${generalizationSet.getName()}, axiom, (
  ?[X, W]: (${generalizationSet.getGeneralClass().getName()}(X, W) & ~(${incompleteAxiom} )\n\t\t\t)\n)).`;
  }


  const disjointOrOverlap = generalizationSet.isDisjoint ? disjointGeneralizationSetAxiom() : overlapGeneralizationSetAxiom();
  const incompleteOrComplete = generalizationSet.isComplete ? completeGeneralizationSetAxiom() : incompleteGeneralizationSetAxiom();
  
  return disjointOrOverlap + '\n' + incompleteOrComplete;
}

