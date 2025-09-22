
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_Company != rf_Service &
			rf_Company != rf_receiver &
			rf_Company != rf_provider &
			rf_Service != rf_receiver &
			rf_Service != rf_provider &
			rf_receiver != rf_provider)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        category(rf_Company)& objectType(rf_Company) & 
				relatorKind(rf_Service)
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
    relationType(rf_receiver) & 
				relationType(rf_provider)
)).
fof(id_3_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_Service, rf_Company, rf_receiver) & 
				connectsTypes(rf_Service, rf_Company, rf_provider)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_4_ax__ontology_relations_statement, axiom, (
        mediatesType(rf_Service, rf_Company) & 
				mediatesType(rf_Service, rf_Company)
)).

