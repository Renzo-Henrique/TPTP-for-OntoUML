%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Existência de mundos e entidades
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Existe pelo menos um mundo
fof(ax_exists_world, axiom,(
  ?[W]: world(W)
)).
% Existe pelo menos uma entidade
fof(ax_exists_entity, axiom,(
  ?[E]: entity(E)
)).
% Entidades são diferentes de mundos
fof(ax_entity_different_than_world, axiom, (
  ![X, W]: ( exists(X, W)  => (X != W & entity(X) & world(W)))
)).
% Tudo que existe deve ser instância de sortal
fof(ax_existence_of_sortal_instances, axiom, (
  ![X, W]: ( exists(X, W) => (cl_person(X,W)))
)).
% TODAS AS COISAS QUE SAO INSTANCIAS DE UM SORTAL EM ALGUM MUNDO
% CONTINUAM SENDO INSTÂNCIAS DO MESMO SORTAL EM TODOS OS MUNDOS NO QUAL EXISTAM
fof(ax_rigid_sortal_ex_cl_person, axiom, (
  ![X, W1]: (cl_person(X, W1) => ( 
              (exists(X, W1) &
            ![W2]: ((exists(X, W2) & W1 != W2) => (cl_person(X, W2)))
    )
  )
))).
% TODAS AS COISAS QUE SAO INSTANCIAS DE UM TIPO-ANTI-RIGIDO EM ALGUM MUNDO
% PODEM NÃO SE-LO EM OUTRO MUNDO
fof(ax_antirigid_ex_cl_child, axiom, (
  ![X, W1]: (cl_child(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_child(X, W2)))
    )
  )
)).
fof(ax_antirigid_ex_cl_teenager, axiom, (
  ![X, W1]: (cl_teenager(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_teenager(X, W2)))
    )
  )
)).
fof(ax_antirigid_ex_cl_adult, axiom, (
  ![X, W1]: (cl_adult(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_adult(X, W2)))
    )
  )
)).fof(ax_antirigid_ex_cl_student, axiom, (
  ![X, W1]: (cl_student(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_student(X, W2)))
    )
  )
)).
fof(ax_antirigid_ex_cl_graduationStudent, axiom, (
  ![X, W1]: (cl_graduationStudent(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_graduationStudent(X, W2)))
    )
  )
)).
fof(ax_antirigid_ex_cl_masterStudent, axiom, (
  ![X, W1]: (cl_masterStudent(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_masterStudent(X, W2)))
    )
  )
)).
fof(ax_antirigid_ex_cl_phdStudent, axiom, (
  ![X, W1]: (cl_phdStudent(X, W1) => (
            ?[W2]: (exists(X, W2) & W1 != W2 & (~cl_phdStudent(X, W2)))
    )
  )
)).
%%%%%%
%%%%%%
%%%%%%
%Especializações
fof(ax_especialization_of_created_class_cl_adult, axiom, (
  ![X, W]: (cl_adult(X, W)  => cl_person(X, W))
)).
fof(ax_especialization_of_created_class_cl_teenager, axiom, (
  ![X, W]: (cl_teenager(X, W)  => cl_person(X, W))
)).
fof(ax_especialization_of_created_class_cl_child, axiom, (
  ![X, W]: (cl_child(X, W)  => cl_person(X, W))
)).
fof(ax_especialization_of_created_class_cl_student, axiom, (
  ![X, W]: (cl_student(X, W)  => cl_person(X, W))
)).
fof(ax_especialization_of_created_class_cl_graduationStudent, axiom, (
  ![X, W]: (cl_graduationStudent(X, W)  => cl_student(X, W))
)).
fof(ax_especialization_of_created_class_cl_masterStudent, axiom, (
  ![X, W]: (cl_masterStudent(X, W)  => cl_student(X, W))
)).
fof(ax_especialization_of_created_class_cl_phdStudent, axiom, (
  ![X, W]: (cl_phdStudent(X, W)  => cl_student(X, W))
)).
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%% Genset
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
% Disjoint set of general -cl_person-
fof(ax_generalization_set_disjoint_personPhasesByAge, axiom, (
    ![X, W]: (~ (cl_child(X, W) & cl_teenager(X, W))& 
							~ (cl_child(X, W) & cl_adult(X, W))& 
							~ (cl_teenager(X, W) & cl_adult(X, W)))
)).
% Complete set of general -cl_person-
% Overlap set of general -cl_student-
% Incomplete set of general -cl_student-
fof(ax_generalization_set_incomplete_studentByDegreePursued, axiom, (
  ?[X, W]: (cl_student(X, W) & ~(cl_masterStudent(X, W) &
																cl_graduationStudent(X, W) &
																cl_phdStudent(X, W) )
			)
)).


%% NAO TENHO CERTEZA SE ISSO É NECESSÁRIO/CORRETO!?!? É PRA SIMULAÇÃO DE MUNDOS?
%% SE FOR, MELHOR DEIXAR NO FINAL E COM UM COMENTÁRIO EXPLICANDO
fof(ax_exists_at_least_one_of_cl_person, axiom,(
  ?[X, W]: (exists(X, W) & cl_person(X, W))
)).
fof(ax_exists_at_least_one_of_cl_child, axiom,(
  ?[X, W]: (exists(X, W) & cl_child(X, W))
)).
fof(ax_exists_at_least_one_of_cl_teenager, axiom,(
  ?[X, W]: (exists(X, W) & cl_teenager(X, W))
)).
fof(ax_exists_at_least_one_of_cl_adult, axiom,(
  ?[X, W]: (exists(X, W) & cl_adult(X, W))
)).
fof(ax_exists_at_least_one_of_cl_student, axiom,(
  ?[X, W]: (exists(X, W) & cl_student(X, W))
)).
fof(ax_exists_at_least_one_of_cl_graduationStudent, axiom,(
  ?[X, W]: (exists(X, W) & cl_graduationStudent(X, W))
)).
fof(ax_exists_at_least_one_of_cl_masterStudent, axiom,(
  ?[X, W]: (exists(X, W) & cl_masterStudent(X, W))
)).
fof(ax_exists_at_least_one_of_cl_phdStudent, axiom,(
  ?[X, W]: (exists(X, W) & cl_phdStudent(X, W))
)).