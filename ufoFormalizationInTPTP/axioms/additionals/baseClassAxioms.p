
% fof(ax_powerType_estereotype, axiom, (
%     ![T]: (powerType(T) => (monadicType(T)))
% )).
% fof(ax_powerType_specializes, axiom, (
%     ![T1, T2]: ((powerType(T1) & specializes(T1, T2) ) => (powerType(T2)))
% )).

% fof(ax_subkind_specializes_exactly_one_kind, axiom,
%     ![T1]: (subkind(T1) => (![T2,T3]: (
%                 (kind(T2) & kind(T3) & specializes(T1,T2) & specializes(T1,T3))
%                    => T2 = T3
%                 )
%            )
%     )
% ).

