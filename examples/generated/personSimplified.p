
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Person != rf_Child &
			rf_Person != rf_Teenager &
			rf_Person != rf_Adult &
			rf_Person != rf_Student &
			rf_Person != rf_GraduationStudent &
			rf_Person != rf_MasterStudent &
			rf_Person != rf_PhdStudent &
			rf_Person != rf_TechnicalStudent &
			rf_Person != rf_MixingAdultStudent &
			rf_Child != rf_Teenager &
			rf_Child != rf_Adult &
			rf_Child != rf_Student &
			rf_Child != rf_GraduationStudent &
			rf_Child != rf_MasterStudent &
			rf_Child != rf_PhdStudent &
			rf_Child != rf_TechnicalStudent &
			rf_Child != rf_MixingAdultStudent &
			rf_Teenager != rf_Adult &
			rf_Teenager != rf_Student &
			rf_Teenager != rf_GraduationStudent &
			rf_Teenager != rf_MasterStudent &
			rf_Teenager != rf_PhdStudent &
			rf_Teenager != rf_TechnicalStudent &
			rf_Teenager != rf_MixingAdultStudent &
			rf_Adult != rf_Student &
			rf_Adult != rf_GraduationStudent &
			rf_Adult != rf_MasterStudent &
			rf_Adult != rf_PhdStudent &
			rf_Adult != rf_TechnicalStudent &
			rf_Adult != rf_MixingAdultStudent &
			rf_Student != rf_GraduationStudent &
			rf_Student != rf_MasterStudent &
			rf_Student != rf_PhdStudent &
			rf_Student != rf_TechnicalStudent &
			rf_Student != rf_MixingAdultStudent &
			rf_GraduationStudent != rf_MasterStudent &
			rf_GraduationStudent != rf_PhdStudent &
			rf_GraduationStudent != rf_TechnicalStudent &
			rf_GraduationStudent != rf_MixingAdultStudent &
			rf_MasterStudent != rf_PhdStudent &
			rf_MasterStudent != rf_TechnicalStudent &
			rf_MasterStudent != rf_MixingAdultStudent &
			rf_PhdStudent != rf_TechnicalStudent &
			rf_PhdStudent != rf_MixingAdultStudent &
			rf_TechnicalStudent != rf_MixingAdultStudent)
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
				role(rf_GraduationStudent)& objectType(rf_GraduationStudent) & 
				role(rf_MasterStudent)& objectType(rf_MasterStudent) & 
				role(rf_PhdStudent)& objectType(rf_PhdStudent) & 
				role(rf_TechnicalStudent)& objectType(rf_TechnicalStudent) & 
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
fof(id_6_ax_proper_especialization_of_created_class_GraduationStudent_generalizing_Student, axiom, (
    properSpecializes(rf_GraduationStudent, rf_Student)
  )).
fof(id_7_ax_proper_especialization_of_created_class_MasterStudent_generalizing_Student, axiom, (
    properSpecializes(rf_MasterStudent, rf_Student)
  )).
fof(id_8_ax_proper_especialization_of_created_class_PhdStudent_generalizing_Student, axiom, (
    properSpecializes(rf_PhdStudent, rf_Student)
  )).
fof(id_9_ax_proper_especialization_of_created_class_TechnicalStudent_generalizing_Student, axiom, (
    properSpecializes(rf_TechnicalStudent, rf_Student)
  )).
fof(id_10_ax_proper_especialization_of_created_class_MixingAdultStudent_generalizing_Adult, axiom, (
    properSpecializes(rf_MixingAdultStudent, rf_Adult)
  )).
fof(id_11_ax_proper_especialization_of_created_class_MixingAdultStudent_generalizing_Student, axiom, (
    properSpecializes(rf_MixingAdultStudent, rf_Student)
  )).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Generalization Sets
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Mlt disjoint set of general -Person-
fof(id_12_ax_generalization_set_disjoint_class_disjoint__complete__personPhasesByAge, axiom, (
    disjointWith(rf_Teenager, rf_Child) &
		disjointWith(rf_Teenager, rf_Adult) &
		disjointWith(rf_Child, rf_Adult) 
)).
% Mlt complete set of general -Person-
fof(id_13_ax_generalization_set_complete_class_disjoint__complete__personPhasesByAge, axiom, (
    ![X, W]: (iof(X, rf_Person, W) => (
									iof(X, rf_Teenager, W) |
									iof(X, rf_Child, W) |
									iof(X, rf_Adult, W)
									))
)).
% Mlt overlap set of general -Student-
fof(id_14_ax_generalization_set_overlapping_class_overlapping__incomplete__studentByDegreePursued, axiom, (
    overlappingWith(rf_MasterStudent, rf_TechnicalStudent)&
		overlappingWith(rf_MasterStudent, rf_GraduationStudent)&
		overlappingWith(rf_MasterStudent, rf_PhdStudent)&
		overlappingWith(rf_TechnicalStudent, rf_GraduationStudent)&
		overlappingWith(rf_TechnicalStudent, rf_PhdStudent)&
		overlappingWith(rf_GraduationStudent, rf_PhdStudent)
)).

%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Relations
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%% Relation Estereotypes


