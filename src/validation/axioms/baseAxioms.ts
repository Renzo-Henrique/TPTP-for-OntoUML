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
  ![X, W]: ( exists(X, W)  => (entity(X) & world(W)))
)).

% Tudo que existe deve ser entidade ou mundo
fof(ax_entity_world__, axiom, (
  ![Y]: ( entity(Y) | world(Y))
)).

% Não existe algo que seja entidade e mundo
fof(ax_entity_world_disjunction, axiom, (
  ~?[Y]: ( entity(Y) & world(Y))
)).

% Tudo que é entidade deve existir em um mundo possível
fof(ax_entity_different____, axiom, (
  ![X]: ( entity(X)  => 
          ?[W] : (exists(X, W))
          )
)).
`;

export const existentiallyDependesOn = `fof(ax_existentiallyDependsOn, axiom, (
  ![X,Y]: (existentiallyDependsOn(X,Y) <=> (![W]: (exists(X,W) => exists(Y,W))))
)).`