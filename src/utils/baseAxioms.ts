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

export function existenceOfSortalInstances(names: string[]): string {
  const filtered = names.filter(name => name.trim() !== '');

  if (filtered.length === 0) {
    console.error('Erro: A ontologia não possui sortal para ser instanciada');
    process.exit(1);
  }

  const result = filtered
    .map(content => `${content}(X,W)`)
    .join(' | ');

  return `fof(ax_existence_of_sortal_instances, axiom, (
  ![X, W]: ( exists(X, W) => (${result}))
)).`;
}
