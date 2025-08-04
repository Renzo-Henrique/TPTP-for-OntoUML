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

export const existentiallyDependesOn = `fof(ax_existentiallyDependsOn, axiom, (
  ![X,Y]: (existentiallyDependsOn(X,Y) <=> (![W]: (exists(X,W) => exists(Y,W))))
)).`