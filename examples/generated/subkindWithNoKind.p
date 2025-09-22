
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__ontology_classes_are_types, axiom, (
    ![T]: (type_(T) <=> (T = rf_Class6 | 
				T = rf_Class7 | 
				T = rf_Class8)) 
)).
fof(id_1_ax__reified_classes_are_different, axiom,
  (rf_Class6 != rf_Class7 &
			rf_Class6 != rf_Class8 &
			rf_Class7 != rf_Class8)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_2_ax__ontology_classes_estereotypes, axiom, (
        perdurantType(rf_Class6) & 
				subkind(rf_Class7) & 
				category(rf_Class8)& objectType(rf_Class8)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_3_ax_proper_especialization_of_created_class_Class6_generalizing_Class7, axiom, (
    properSpecializes(rf_Class6, rf_Class7)
  )).
fof(id_4_ax_proper_especialization_of_created_class_Class7_generalizing_Class8, axiom, (
    properSpecializes(rf_Class7, rf_Class8)
  )).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Generalization Sets
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Relations
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%% Relation Estereotypes


