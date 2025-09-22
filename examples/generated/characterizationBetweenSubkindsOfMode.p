
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Class_A != rf_Class_A_A &
			rf_Class_A != rf_Class_B &
			rf_Class_A != rf_Class_B_B &
			rf_Class_A != rf_default_name_2_association &
			rf_Class_A_A != rf_Class_B &
			rf_Class_A_A != rf_Class_B_B &
			rf_Class_A_A != rf_default_name_2_association &
			rf_Class_B != rf_Class_B_B &
			rf_Class_B != rf_default_name_2_association &
			rf_Class_B_B != rf_default_name_2_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        modeKind(rf_Class_A) & 
				subkind(rf_Class_A_A)& modeType(rf_Class_A_A) & 
				modeKind(rf_Class_B) & 
				subkind(rf_Class_B_B)& modeType(rf_Class_B_B)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_2_ax_proper_especialization_of_created_class_Class_A_A_generalizing_Class_A, axiom, (
    properSpecializes(rf_Class_A_A, rf_Class_A)
  )).
fof(id_3_ax_proper_especialization_of_created_class_Class_B_B_generalizing_Class_B, axiom, (
    properSpecializes(rf_Class_B_B, rf_Class_B)
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

fof(id_4_ax__ontology_relations_statement, axiom, (
    relationType(rf_default_name_2_association)
)).
fof(id_5_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_Class_A_A, rf_Class_B_B, rf_default_name_2_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_6_ax__ontology_relations_statement, axiom, (
        characterizes(rf_Class_A_A, rf_Class_B_B)
)).

