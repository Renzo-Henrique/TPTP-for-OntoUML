
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Service != rf_Company &
			rf_Service != rf_For_profit_company &
			rf_Service != rf_For_profit_company_in_service &
			rf_Service != rf_default_name_2_association &
			rf_Company != rf_For_profit_company &
			rf_Company != rf_For_profit_company_in_service &
			rf_Company != rf_default_name_2_association &
			rf_For_profit_company != rf_For_profit_company_in_service &
			rf_For_profit_company != rf_default_name_2_association &
			rf_For_profit_company_in_service != rf_default_name_2_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        relatorKind(rf_Service) & 
				category(rf_Company)& objectType(rf_Company) & 
				kind(rf_For_profit_company)& objectType(rf_For_profit_company) & 
				role(rf_For_profit_company_in_service)& objectType(rf_For_profit_company_in_service)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_2_ax_proper_especialization_of_created_class_For_profit_company_generalizing_Company, axiom, (
    properSpecializes(rf_For_profit_company, rf_Company)
  )).
fof(id_3_ax_proper_especialization_of_created_class_For_profit_company_in_service_generalizing_For_profit_company, axiom, (
    properSpecializes(rf_For_profit_company_in_service, rf_For_profit_company)
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
        connectsTypes(rf_Service, rf_For_profit_company_in_service, rf_default_name_2_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_6_ax__ontology_relations_statement, axiom, (
        mediatesType(rf_Service, rf_For_profit_company_in_service)
)).

