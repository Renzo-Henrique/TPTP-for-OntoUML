
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% ESPECIFIC FOR THE ONTOLOGY
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% WORLD CONSTRAINTS
%%%%%%%%%%%%%%%%%
fof(id_0_ax__reified_classes_are_different, axiom,
  (rf_tipoA != rf_tipoB &
			rf_tipoA != rf_TipoC &
			rf_tipoA != rf_TipoD &
			rf_tipoA != rf_TipoE &
			rf_tipoA != rf_TipoF &
			rf_tipoA != rf_source_A &
			rf_tipoA != rf_source_C &
			rf_tipoA != rf_source_F &
			rf_tipoB != rf_TipoC &
			rf_tipoB != rf_TipoD &
			rf_tipoB != rf_TipoE &
			rf_tipoB != rf_TipoF &
			rf_tipoB != rf_source_A &
			rf_tipoB != rf_source_C &
			rf_tipoB != rf_source_F &
			rf_TipoC != rf_TipoD &
			rf_TipoC != rf_TipoE &
			rf_TipoC != rf_TipoF &
			rf_TipoC != rf_source_A &
			rf_TipoC != rf_source_C &
			rf_TipoC != rf_source_F &
			rf_TipoD != rf_TipoE &
			rf_TipoD != rf_TipoF &
			rf_TipoD != rf_source_A &
			rf_TipoD != rf_source_C &
			rf_TipoD != rf_source_F &
			rf_TipoE != rf_TipoF &
			rf_TipoE != rf_source_A &
			rf_TipoE != rf_source_C &
			rf_TipoE != rf_source_F &
			rf_TipoF != rf_source_A &
			rf_TipoF != rf_source_C &
			rf_TipoF != rf_source_F &
			rf_source_A != rf_source_C &
			rf_source_A != rf_source_F &
			rf_source_C != rf_source_F)
).
%%%%%%%%%%%%%%%
%%%%Classes Statements
%%%%%%%%%%%%%%%
fof(id_1_ax__ontology_classes_estereotypes, axiom, (
        powerType(rf_tipoA) & 
				powerType(rf_tipoB) & 
				powerType(rf_TipoC) & 
				powerType(rf_TipoD) & 
				powerType(rf_TipoE) & 
				powerType(rf_TipoF)
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
    relationType(rf_source_A) & 
				relationType(rf_source_C) & 
				relationType(rf_source_F)
)).
fof(id_3_ax__ontology_relations_with_types, axiom, (
        connectsTypes(rf_tipoA, rf_tipoB, rf_source_A) & 
				connectsTypes(rf_TipoC, rf_TipoD, rf_source_C) & 
				connectsTypes(rf_TipoF, rf_TipoE, rf_source_F)
)).
%%%%%%%%%%%%%% Relation Estereotypes
fof(id_4_ax__ontology_relations_statement, axiom, (
        instantiation(rf_tipoA, rf_tipoB) & 
				instantiation(rf_TipoC, rf_TipoD) & 
				instantiation(rf_TipoF, rf_TipoE)
)).

