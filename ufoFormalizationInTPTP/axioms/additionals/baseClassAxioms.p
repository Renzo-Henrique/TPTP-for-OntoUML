
fof(ax_powerType_estereotype, axiom, (
    ![T]: (powerType(T) => (monadicType(T)))
)).

% Intermediate type to describe what is a objectType from sortal and nonSortal generated classes
fof(ax_can_be_a_objectType, axiom, (
    ![T]: (
        (possibleObjectType(T) & ~(momentType(T) | quantityType(T) | collectiveType(T)) & 
            ~?[T2]: (properSpecializes(T, T2) & (momentType(T2) | quantityType(T2) | collectiveType(T2)))
            ) => objectType(T) )
)).


