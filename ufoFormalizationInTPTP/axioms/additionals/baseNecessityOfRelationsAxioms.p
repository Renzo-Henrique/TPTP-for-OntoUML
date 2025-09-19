%%%%%%%%%%%%%%%
%%%%% NECESSITY OF RELATIONS
%%%%%%%%%%%%%%%
fof(ax_momentType_must_have_a_relation_with_endurantType, axiom, (
    ![T1]: (momentType(T1) => 
        ?[T2, R]:(T1 != T2 & endurantType(T2) & (connectsType(T1, T2, R) | connectsType(T2, T1, R)))
        )
)).

fof(ax_perdurantType_must_have_a_relation_with_monadicType, axiom, (
    ![T1]: (perdurantType(T1) => 
        ?[T2, R]:(T1 != T2 & monadicType(T2) & (connectsType(T1, T2, R) | connectsType(T2, T1, R)))
        )
)).

fof(ax_powerType_must_have_instantiation, axiom, (
    ![PT]: (powerType(PT) => ?[T]: (instantiation(T, PT)))
)).