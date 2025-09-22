
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Person != rf_Customer &
			rf_Person != rf_Company &
			rf_Person != rf_IndividualCustomer &
			rf_Person != rf_ForProfitCompany &
			rf_Person != rf_NonProfitCompany &
			rf_Person != rf_Woman &
			rf_Person != rf_Man &
			rf_Person != rf_CorporateCustomer &
			rf_Customer != rf_Company &
			rf_Customer != rf_IndividualCustomer &
			rf_Customer != rf_ForProfitCompany &
			rf_Customer != rf_NonProfitCompany &
			rf_Customer != rf_Woman &
			rf_Customer != rf_Man &
			rf_Customer != rf_CorporateCustomer &
			rf_Company != rf_IndividualCustomer &
			rf_Company != rf_ForProfitCompany &
			rf_Company != rf_NonProfitCompany &
			rf_Company != rf_Woman &
			rf_Company != rf_Man &
			rf_Company != rf_CorporateCustomer &
			rf_IndividualCustomer != rf_ForProfitCompany &
			rf_IndividualCustomer != rf_NonProfitCompany &
			rf_IndividualCustomer != rf_Woman &
			rf_IndividualCustomer != rf_Man &
			rf_IndividualCustomer != rf_CorporateCustomer &
			rf_ForProfitCompany != rf_NonProfitCompany &
			rf_ForProfitCompany != rf_Woman &
			rf_ForProfitCompany != rf_Man &
			rf_ForProfitCompany != rf_CorporateCustomer &
			rf_NonProfitCompany != rf_Woman &
			rf_NonProfitCompany != rf_Man &
			rf_NonProfitCompany != rf_CorporateCustomer &
			rf_Woman != rf_Man &
			rf_Woman != rf_CorporateCustomer &
			rf_Man != rf_CorporateCustomer)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        kind(rf_Person)& objectType(rf_Person) & 
				roleMixin(rf_Customer) & 
				category(rf_Company)& objectType(rf_Company) & 
				role(rf_IndividualCustomer)& objectType(rf_IndividualCustomer) & 
				kind(rf_ForProfitCompany)& objectType(rf_ForProfitCompany) & 
				kind(rf_NonProfitCompany)& objectType(rf_NonProfitCompany) & 
				subkind(rf_Woman)& objectType(rf_Woman) & 
				subkind(rf_Man)& objectType(rf_Man) & 
				roleMixin(rf_CorporateCustomer)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_2_ax_proper_especialization_of_created_class_IndividualCustomer_generalizing_Person, axiom, (
    properSpecializes(rf_IndividualCustomer, rf_Person)
  )).
fof(id_3_ax_proper_especialization_of_created_class_IndividualCustomer_generalizing_Customer, axiom, (
    properSpecializes(rf_IndividualCustomer, rf_Customer)
  )).
fof(id_4_ax_proper_especialization_of_created_class_ForProfitCompany_generalizing_Company, axiom, (
    properSpecializes(rf_ForProfitCompany, rf_Company)
  )).
fof(id_5_ax_proper_especialization_of_created_class_NonProfitCompany_generalizing_Company, axiom, (
    properSpecializes(rf_NonProfitCompany, rf_Company)
  )).
fof(id_6_ax_proper_especialization_of_created_class_Woman_generalizing_Person, axiom, (
    properSpecializes(rf_Woman, rf_Person)
  )).
fof(id_7_ax_proper_especialization_of_created_class_Man_generalizing_Person, axiom, (
    properSpecializes(rf_Man, rf_Person)
  )).
fof(id_8_ax_proper_especialization_of_created_class_CorporateCustomer_generalizing_Customer, axiom, (
    properSpecializes(rf_CorporateCustomer, rf_Customer)
  )).
fof(id_9_ax_proper_especialization_of_created_class_CorporateCustomer_generalizing_Company, axiom, (
    properSpecializes(rf_CorporateCustomer, rf_Company)
  )).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Generalization Sets
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Mlt disjoint set of general -Company-
fof(id_10_ax_generalization_set_disjoint_class_disjoint__complete__TypesOfCompanyByPurpose, axiom, (
    disjointWith(rf_ForProfitCompany, rf_NonProfitCompany) 
)).
% Mlt complete set of general -Company-
fof(id_11_ax_generalization_set_complete_class_disjoint__complete__TypesOfCompanyByPurpose, axiom, (
    ![X, W]: (iof(X, rf_Company, W) => (
									iof(X, rf_ForProfitCompany, W) |
									iof(X, rf_NonProfitCompany, W)
									))
)).
% Mlt disjoint set of general -Person-
fof(id_12_ax_generalization_set_disjoint_class_disjoint__incomplete__PersonByGender, axiom, (
    disjointWith(rf_Man, rf_Woman) 
)).

% Mlt disjoint set of general -Customer-
fof(id_13_ax_generalization_set_disjoint_class_disjoint__complete__CustomerTypes, axiom, (
    disjointWith(rf_CorporateCustomer, rf_IndividualCustomer) 
)).
% Mlt complete set of general -Customer-
fof(id_14_ax_generalization_set_complete_class_disjoint__complete__CustomerTypes, axiom, (
    ![X, W]: (iof(X, rf_Customer, W) => (
									iof(X, rf_CorporateCustomer, W) |
									iof(X, rf_IndividualCustomer, W)
									))
)).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Relations
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%% Relation Estereotypes


