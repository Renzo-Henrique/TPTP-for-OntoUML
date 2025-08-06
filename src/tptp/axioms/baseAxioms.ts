export const worldAndEntity = `%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Existence of worlds and entities
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% There exists at least one world
fof(ax_exists_world, axiom,(
  ?[W]: world(W)
)).
% There exists at least one entity
fof(ax_exists_entity, axiom,(
  ?[E]: entity(E)
)).
% Entities are different from worlds
fof(ax_exists_has_entity_and_world, axiom, (
  ![X, W]: ( exists(X, W)  => (entity(X) & world(W)))
)).

% Everything must be an entity or a world
fof(ax_everything_is_world_or_entity, axiom, (
  ![Y]: ( entity(Y) | world(Y))
)).

% There is nothing that is both an entity and a world
fof(ax_entity_world_disjunction, axiom, (
  ~?[Y]: ( entity(Y) & world(Y))
)).

% Everything that is an entity must exist in some possible world
fof(ax_entity_exists_in_a_world, axiom, (
  ![X]: ( entity(X)  => 
          ?[W] : (exists(X, W))
          )
)).
`;
