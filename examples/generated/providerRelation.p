
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC AXIOM'S FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Company_Provider != rf_Company &
			rf_Company_Provider != rf_Person &
			rf_Company_Provider != rf_Client &
			rf_Company_Provider != rf_Service_provider_relation &
			rf_Company_Provider != rf_Provider_Relation &
			rf_Company_Provider != rf_Product_provider_relation &
			rf_Company_Provider != rf_Product &
			rf_Company_Provider != rf_default_name_6_association &
			rf_Company_Provider != rf_default_name_7_association &
			rf_Company_Provider != rf_receives_a_service_or_product_by &
			rf_Company_Provider != rf_default_name_8_association &
			rf_Company_Provider != rf_default_name_9_association &
			rf_Company_Provider != rf_default_name_10_association &
			rf_Company != rf_Person &
			rf_Company != rf_Client &
			rf_Company != rf_Service_provider_relation &
			rf_Company != rf_Provider_Relation &
			rf_Company != rf_Product_provider_relation &
			rf_Company != rf_Product &
			rf_Company != rf_default_name_6_association &
			rf_Company != rf_default_name_7_association &
			rf_Company != rf_receives_a_service_or_product_by &
			rf_Company != rf_default_name_8_association &
			rf_Company != rf_default_name_9_association &
			rf_Company != rf_default_name_10_association &
			rf_Person != rf_Client &
			rf_Person != rf_Service_provider_relation &
			rf_Person != rf_Provider_Relation &
			rf_Person != rf_Product_provider_relation &
			rf_Person != rf_Product &
			rf_Person != rf_default_name_6_association &
			rf_Person != rf_default_name_7_association &
			rf_Person != rf_receives_a_service_or_product_by &
			rf_Person != rf_default_name_8_association &
			rf_Person != rf_default_name_9_association &
			rf_Person != rf_default_name_10_association &
			rf_Client != rf_Service_provider_relation &
			rf_Client != rf_Provider_Relation &
			rf_Client != rf_Product_provider_relation &
			rf_Client != rf_Product &
			rf_Client != rf_default_name_6_association &
			rf_Client != rf_default_name_7_association &
			rf_Client != rf_receives_a_service_or_product_by &
			rf_Client != rf_default_name_8_association &
			rf_Client != rf_default_name_9_association &
			rf_Client != rf_default_name_10_association &
			rf_Service_provider_relation != rf_Provider_Relation &
			rf_Service_provider_relation != rf_Product_provider_relation &
			rf_Service_provider_relation != rf_Product &
			rf_Service_provider_relation != rf_default_name_6_association &
			rf_Service_provider_relation != rf_default_name_7_association &
			rf_Service_provider_relation != rf_receives_a_service_or_product_by &
			rf_Service_provider_relation != rf_default_name_8_association &
			rf_Service_provider_relation != rf_default_name_9_association &
			rf_Service_provider_relation != rf_default_name_10_association &
			rf_Provider_Relation != rf_Product_provider_relation &
			rf_Provider_Relation != rf_Product &
			rf_Provider_Relation != rf_default_name_6_association &
			rf_Provider_Relation != rf_default_name_7_association &
			rf_Provider_Relation != rf_receives_a_service_or_product_by &
			rf_Provider_Relation != rf_default_name_8_association &
			rf_Provider_Relation != rf_default_name_9_association &
			rf_Provider_Relation != rf_default_name_10_association &
			rf_Product_provider_relation != rf_Product &
			rf_Product_provider_relation != rf_default_name_6_association &
			rf_Product_provider_relation != rf_default_name_7_association &
			rf_Product_provider_relation != rf_receives_a_service_or_product_by &
			rf_Product_provider_relation != rf_default_name_8_association &
			rf_Product_provider_relation != rf_default_name_9_association &
			rf_Product_provider_relation != rf_default_name_10_association &
			rf_Product != rf_default_name_6_association &
			rf_Product != rf_default_name_7_association &
			rf_Product != rf_receives_a_service_or_product_by &
			rf_Product != rf_default_name_8_association &
			rf_Product != rf_default_name_9_association &
			rf_Product != rf_default_name_10_association &
			rf_default_name_6_association != rf_default_name_7_association &
			rf_default_name_6_association != rf_receives_a_service_or_product_by &
			rf_default_name_6_association != rf_default_name_8_association &
			rf_default_name_6_association != rf_default_name_9_association &
			rf_default_name_6_association != rf_default_name_10_association &
			rf_default_name_7_association != rf_receives_a_service_or_product_by &
			rf_default_name_7_association != rf_default_name_8_association &
			rf_default_name_7_association != rf_default_name_9_association &
			rf_default_name_7_association != rf_default_name_10_association &
			rf_receives_a_service_or_product_by != rf_default_name_8_association &
			rf_receives_a_service_or_product_by != rf_default_name_9_association &
			rf_receives_a_service_or_product_by != rf_default_name_10_association &
			rf_default_name_8_association != rf_default_name_9_association &
			rf_default_name_8_association != rf_default_name_10_association &
			rf_default_name_9_association != rf_default_name_10_association)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        role(rf_Company_Provider)& objectType(rf_Company_Provider) & 
				kind(rf_Company)& objectType(rf_Company) & 
				kind(rf_Person)& objectType(rf_Person) & 
				role(rf_Client)& objectType(rf_Client) & 
				subkind(rf_Service_provider_relation)& relatorType(rf_Service_provider_relation) & 
				relatorKind(rf_Provider_Relation) & 
				subkind(rf_Product_provider_relation)& relatorType(rf_Product_provider_relation) & 
				mixin(rf_Product)
)).
%%%%%%%%%%%%%%%
%%%%Class Reification
%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%
%%%%Generalizations
%%%%%%%%%%%%%%%
fof(id_2_ax_proper_especialization_of_created_class_Company_Provider_generalizing_Company, axiom, (
    properSpecializes(rf_Company_Provider, rf_Company)
  )).
fof(id_3_ax_proper_especialization_of_created_class_Client_generalizing_Person, axiom, (
    properSpecializes(rf_Client, rf_Person)
  )).
fof(id_4_ax_proper_especialization_of_created_class_Product_provider_relation_generalizing_Provider_Relation, axiom, (
    properSpecializes(rf_Product_provider_relation, rf_Provider_Relation)
  )).
fof(id_5_ax_proper_especialization_of_created_class_Service_provider_relation_generalizing_Provider_Relation, axiom, (
    properSpecializes(rf_Service_provider_relation, rf_Provider_Relation)
  )).
fof(id_6_ax_proper_especialization_of_created_class_default_name_6_association_generalizing_default_name_9_association, axiom, (
    properSpecializes(rf_default_name_6_association, rf_default_name_9_association)
  )).
fof(id_7_ax_proper_especialization_of_created_class_default_name_7_association_generalizing_default_name_8_association, axiom, (
    properSpecializes(rf_default_name_7_association, rf_default_name_8_association)
  )).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Generalization Sets
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Mlt disjoint set of general -Provider_Relation-
fof(id_8_ax_generalization_set_disjoint_class_disjoint__complete__ProviderRelationTypes, axiom, (
    disjointWith(rf_Product_provider_relation, rf_Service_provider_relation) 
)).
% Mlt complete set of general -Provider_Relation-
fof(id_9_ax_generalization_set_complete_class_disjoint__complete__ProviderRelationTypes, axiom, (
    ![X, W]: (iof(X, rf_Provider_Relation, W) => (
									iof(X, rf_Product_provider_relation, W) |
									iof(X, rf_Service_provider_relation, W)
									))
)).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Relations
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%

fof(id_10_ax__ontology_relations_statement, axiom, (
    relationType(rf_default_name_6_association) & 
				relationType(rf_default_name_7_association) & 
				relationType(rf_receives_a_service_or_product_by) & 
				relationType(rf_default_name_8_association) & 
				relationType(rf_default_name_9_association) & 
				relationType(rf_default_name_10_association)
)).
fof(id_11_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_Product_provider_relation, rf_Client, rf_default_name_6_association) & 
				connectsTypes(rf_Product_provider_relation, rf_Company_Provider, rf_default_name_7_association) & 
				connectsTypes(rf_Client, rf_Company_Provider, rf_receives_a_service_or_product_by) & 
				connectsTypes(rf_Provider_Relation, rf_Company_Provider, rf_default_name_8_association) & 
				connectsTypes(rf_Provider_Relation, rf_Client, rf_default_name_9_association) & 
				connectsTypes(rf_Product_provider_relation, rf_Product, rf_default_name_10_association)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_12_ax__ontology_relations_statement, axiom, (
        mediatesType(rf_Product_provider_relation, rf_Client) & 
				mediatesType(rf_Product_provider_relation, rf_Company_Provider) & 
				mediatesType(rf_Provider_Relation, rf_Company_Provider) & 
				mediatesType(rf_Provider_Relation, rf_Client) & 
				mediatesType(rf_Product_provider_relation, rf_Product)
)).
fof(id_13_ax__ontology_relations_statement_without_estereotype, axiom, (
        relationType(rf_receives_a_service_or_product_by)
)).
