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

function checkEmpty(strs: string[]):boolean{
  return strs.filter(name => name.trim() !== '').length === 0;
}

function checkEmptyForError(strs: string[], errorMessage: string): void{

  if(checkEmpty(strs)) {
    console.error(errorMessage);
    process.exit(1);
  }
}

export function existenceOfSortalInstancesAxiom(names: string[]): string {
  const errorMessage = 'Erro: A ontologia não possui sortal para ser instanciada'
  checkEmptyForError(names, errorMessage);

  const result = names
    .map(content => `${content}(X,W)`)
    .join(' | ');

  return `fof(ax_existence_of_sortal_instances, axiom, (
  ![X, W]: ( exists(X, W) => (${result}))
)).`;
}

export function existenceOfRigidSortalClassesAxiom(names: string[]): string {
  const errorMessage = 'Erro: function-- rigidSortalExistenceClass';
  checkEmptyForError(names, errorMessage);

  return names
    .map(content => existenceOfRigidSortalClassAxiom(content))
    .join('\n');
}

function existenceOfRigidSortalClassAxiom(name: string): string{
  return `fof(ax_rigid_sortal_ex_${name}, axiom, (
  ![X, W1]: (${name}(X, W1) => ( 
              (exists(X, W1) &
            ![W2]: ((exists(X, W2) & W1 != W2) => (${name}(X, W2)))
    )
  )
))).`
}

export function existenceOfAntiRigidSortalClassesAxiom(names: string[]): string {
  if(checkEmpty(names)) return '';
  return names
    .map(content => existenceOfAntiRigidSortalClassAxiom(content))
    .join('\n');
}

function existenceOfAntiRigidSortalClassAxiom(name: string): string{
  return `fof(ax_antirigid_ex_${name}, axiom, (
  ![X, W1]: (${name}(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~${name}(X, W2)))
    )
  )
)).`
}

export function existenceOfAtLeastOneOfEachClasses(names: string[]): string {
  if(checkEmpty(names)) return '';
  return names
    .map(content => existenceOfAtLeastOneOfClass(content))
    .join('\n');
}

function existenceOfAtLeastOneOfClass(name: string): string{
  return `fof(ax_exists_at_least_one_of_${name}, axiom,(
  ?[X, W]: (exists(X, W) & ${name}(X, W))
)).`
}



