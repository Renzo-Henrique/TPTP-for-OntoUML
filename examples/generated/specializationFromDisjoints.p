
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Person != rf_Child &
			rf_Person != rf_Teenager &
			rf_Person != rf_Adult &
			rf_Person != rf_Student &
			rf_Person != rf_MixingChildTeenager &
			rf_Person != rf_MixingAdultStudent &
			rf_Child != rf_Teenager &
			rf_Child != rf_Adult &
			rf_Child != rf_Student &
			rf_Child != rf_MixingChildTeenager &
			rf_Child != rf_MixingAdultStudent &
			rf_Teenager != rf_Adult &
			rf_Teenager != rf_Student &
			rf_Teenager != rf_MixingChildTeenager &
			rf_Teenager != rf_MixingAdultStudent &
			rf_Adult != rf_Student &
			rf_Adult != rf_MixingChildTeenager &
			rf_Adult != rf_MixingAdultStudent &
			rf_Student != rf_MixingChildTeenager &
			rf_Student != rf_MixingAdultStudent &
			rf_MixingChildTeenager != rf_MixingAdultStudent)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        kind(rf_Person)& objectType(rf_Person) & 
				phase(rf_Child)& objectType(rf_Child) & 
				phase(rf_Teenager)& objectType(rf_Teenager) & 
				phase(rf_Adult)& objectType(rf_Adult) & 
				role(rf_Student)& objectType(rf_Student) & 
				phase(rf_MixingChildTeenager)& objectType(rf_MixingChildTeenager) & 
				role(rf_MixingAdultStudent)& objectType(rf_MixingAdultStudent)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_2_ax_proper_especialization_of_created_class_Adult_generalizing_Person, axiom, (
    properSpecializes(rf_Adult, rf_Person)
  )).
fof(id_3_ax_proper_especialization_of_created_class_Teenager_generalizing_Person, axiom, (
    properSpecializes(rf_Teenager, rf_Person)
  )).
fof(id_4_ax_proper_especialization_of_created_class_Child_generalizing_Person, axiom, (
    properSpecializes(rf_Child, rf_Person)
  )).
fof(id_5_ax_proper_especialization_of_created_class_Student_generalizing_Person, axiom, (
    properSpecializes(rf_Student, rf_Person)
  )).
fof(id_6_ax_proper_especialization_of_created_class_MixingChildTeenager_generalizing_Child, axiom, (
    properSpecializes(rf_MixingChildTeenager, rf_Child)
  )).
fof(id_7_ax_proper_especialization_of_created_class_MixingChildTeenager_generalizing_Teenager, axiom, (
    properSpecializes(rf_MixingChildTeenager, rf_Teenager)
  )).
fof(id_8_ax_proper_especialization_of_created_class_MixingAdultStudent_generalizing_Student, axiom, (
    properSpecializes(rf_MixingAdultStudent, rf_Student)
  )).
fof(id_9_ax_proper_especialization_of_created_class_MixingAdultStudent_generalizing_Adult, axiom, (
    properSpecializes(rf_MixingAdultStudent, rf_Adult)
  )).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Generalization Sets
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Mlt disjoint set of general -Person-
fof(id_10_ax_generalization_set_disjoint_class_disjoint__complete__personPhasesByAge, axiom, (
    disjointWith(rf_Child, rf_Teenager) &
		disjointWith(rf_Child, rf_Adult) &
		disjointWith(rf_Teenager, rf_Adult) 
)).
% Mlt complete set of general -Person-
fof(id_11_ax_generalization_set_complete_class_disjoint__complete__personPhasesByAge, axiom, (
    ![X, W]: (iof(X, rf_Person, W) => (
									iof(X, rf_Child, W) |
									iof(X, rf_Teenager, W) |
									iof(X, rf_Adult, W)
									))
)).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Relations
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%% Relation Estereotypes


