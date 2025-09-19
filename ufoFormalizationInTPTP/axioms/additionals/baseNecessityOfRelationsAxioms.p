%%%%%%%%%%%%%%%
%%%%% NECESSITY OF RELATIONS
%%%%%%%%%%%%%%%
% fof(ax_momentType_must_have_a_relation_with_endurantType, axiom, (
%     ![T1]: (momentType(T1) => 
%             ?[ET, R]:(T1 != ET & endurantType(ET) & (
%                 (connectsType(T1, ET, R) | connectsType(ET, T1, R))
%                 |
%                 ?[T2]: (T1 != T2 & (properSpecializes(T1, T2) | properSpecializes(T2, T1)) & (connectsType(T2, ET, R) | connectsType(ET, T2, R)))
%                 ))
%         )
% )).


% Todo momentType t1 deve possuir um connectsType entre ele ou na árvore de especializações dele



fof(ax_momentType_must_have_a_relation_with_endurantType, axiom, (
    ![T1]: (momentType(T1) => 
            ?[ET, R]:(T1 != ET & endurantType(ET) & (connectsType(T1, ET, R) | connectsType(ET, T1, R))) 
    )
)).


%%% DESCOMENTAR
% fof(ax_perdurantType_must_have_a_relation_with_monadicType, axiom, (
%     ![T1]: (perdurantType(T1) => 
%         ?[T2, R]:(T1 != T2 & monadicType(T2) & (connectsType(T1, T2, R) | connectsType(T2, T1, R)))
%         )
% )).

% fof(ax_powerType_must_have_instantiation, axiom, (
%     ![PT]: (powerType(PT) => ?[T]: (instantiation(T, PT)))
% )).