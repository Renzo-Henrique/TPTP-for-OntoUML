
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Class != rf_Class2 &
			rf_Class != rf_Class3 &
			rf_Class != rf_default_name_0_association &
			rf_Class != rf_default_name_1_association &
			rf_Class2 != rf_Class3 &
			rf_Class2 != rf_default_name_0_association &
			rf_Class2 != rf_default_name_1_association &
			rf_Class3 != rf_default_name_0_association &
			rf_Class3 != rf_default_name_1_association &
			rf_default_name_0_association != rf_default_name_1_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        modeKind(rf_Class) & 
				kind(rf_Class2)& objectType(rf_Class2) & 
				kind(rf_Class3)& objectType(rf_Class3)
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
    relationType(rf_default_name_0_association) & 
				relationType(rf_default_name_1_association)
)).
fof(id_3_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_Class, rf_Class2, rf_default_name_0_association) & 
				connectsTypes(rf_Class, rf_Class3, rf_default_name_1_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_4_ax__ontology_relations_statement, axiom, (
        characterizes(rf_Class, rf_Class2) & 
				characterizes(rf_Class, rf_Class3)
)).

