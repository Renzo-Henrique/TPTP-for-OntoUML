
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_relatorSuper != rf_relatorSub &
			rf_relatorSuper != rf_kindExample &
			rf_relatorSuper != rf_modeSuper &
			rf_relatorSuper != rf_modeSub &
			rf_relatorSuper != rf_default_name_2_association &
			rf_relatorSuper != rf_default_name_3_association &
			rf_relatorSub != rf_kindExample &
			rf_relatorSub != rf_modeSuper &
			rf_relatorSub != rf_modeSub &
			rf_relatorSub != rf_default_name_2_association &
			rf_relatorSub != rf_default_name_3_association &
			rf_kindExample != rf_modeSuper &
			rf_kindExample != rf_modeSub &
			rf_kindExample != rf_default_name_2_association &
			rf_kindExample != rf_default_name_3_association &
			rf_modeSuper != rf_modeSub &
			rf_modeSuper != rf_default_name_2_association &
			rf_modeSuper != rf_default_name_3_association &
			rf_modeSub != rf_default_name_2_association &
			rf_modeSub != rf_default_name_3_association &
			rf_default_name_2_association != rf_default_name_3_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        relatorKind(rf_relatorSuper) & 
				subkind(rf_relatorSub)& relatorType(rf_relatorSub) & 
				kind(rf_kindExample)& objectType(rf_kindExample) & 
				modeKind(rf_modeSuper) & 
				subkind(rf_modeSub)& modeType(rf_modeSub)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_2_ax_proper_especialization_of_created_class_relatorSub_generalizing_relatorSuper, axiom, (
    properSpecializes(rf_relatorSub, rf_relatorSuper)
  )).
fof(id_3_ax_proper_especialization_of_created_class_modeSub_generalizing_modeSuper, axiom, (
    properSpecializes(rf_modeSub, rf_modeSuper)
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
    relationType(rf_default_name_2_association) & 
				relationType(rf_default_name_3_association)
)).
fof(id_5_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_relatorSub, rf_kindExample, rf_default_name_2_association) & 
				connectsTypes(rf_modeSub, rf_kindExample, rf_default_name_3_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_6_ax__ontology_relations_statement, axiom, (
        mediatesType(rf_relatorSub, rf_kindExample) & 
				characterizes(rf_modeSub, rf_kindExample)
)).

