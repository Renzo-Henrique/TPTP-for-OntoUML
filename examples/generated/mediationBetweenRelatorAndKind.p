
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Class_A != rf_Class_A_A &
			rf_Class_A != rf_Class_B &
			rf_Class_A != rf_Class_B_B &
			rf_Class_A != rf_default_name_3_association &
			rf_Class_A != rf_default_name_4_association &
			rf_Class_A_A != rf_Class_B &
			rf_Class_A_A != rf_Class_B_B &
			rf_Class_A_A != rf_default_name_3_association &
			rf_Class_A_A != rf_default_name_4_association &
			rf_Class_B != rf_Class_B_B &
			rf_Class_B != rf_default_name_3_association &
			rf_Class_B != rf_default_name_4_association &
			rf_Class_B_B != rf_default_name_3_association &
			rf_Class_B_B != rf_default_name_4_association &
			rf_default_name_3_association != rf_default_name_4_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        relatorKind(rf_Class_A) & 
				subkind(rf_Class_A_A)& relatorType(rf_Class_A_A) & 
				kind(rf_Class_B)& objectType(rf_Class_B) & 
				subkind(rf_Class_B_B)& objectType(rf_Class_B_B)
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
fof(id_4_ax_proper_especialization_of_created_class_default_name_3_association_generalizing_default_name_4_association, axiom, (
    properSpecializes(rf_default_name_3_association, rf_default_name_4_association)
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

fof(id_5_ax__ontology_relations_statement, axiom, (
    relationType(rf_default_name_3_association) & 
				relationType(rf_default_name_4_association)
)).
fof(id_6_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_Class_A_A, rf_Class_B_B, rf_default_name_3_association) & 
				connectsTypes(rf_Class_A, rf_Class_B, rf_default_name_4_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_7_ax__ontology_relations_statement, axiom, (
        mediatesType(rf_Class_A_A, rf_Class_B_B) & 
				mediatesType(rf_Class_A, rf_Class_B)
)).

