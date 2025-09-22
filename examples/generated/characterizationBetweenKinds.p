
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Class_A != rf_Class_B &
			rf_Class_A != rf_default_name_0_association &
			rf_Class_B != rf_default_name_0_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        kind(rf_Class_A)& objectType(rf_Class_A) & 
				kind(rf_Class_B)& objectType(rf_Class_B)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%

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

fof(id_2_ax__ontology_relations_statement, axiom, (
    relationType(rf_default_name_0_association)
)).
fof(id_3_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_Class_A, rf_Class_B, rf_default_name_0_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_4_ax__ontology_relations_statement, axiom, (
        characterizes(rf_Class_A, rf_Class_B)
)).

