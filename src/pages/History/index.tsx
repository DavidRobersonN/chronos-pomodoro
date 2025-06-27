import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './style.module.css';
import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { formatDate } from '../../util/formatDate';
import { getTaskStatus } from '../../util/getTaskStatus';
import { sortTasks, SortTasksOptions } from '../../util/sortTask';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TaskActionTypes } from '../../contexts/TaskContent/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  // Controla a confirmação do usuário para limpar o histórico
  const [confirmationClearHistory, setConfirmationClearHistory] =
    useState(false);

  // Acesso ao estado global e função de dispatch via contexto
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  // Estado local para opções de ordenação (campo, direção e lista de tarefas ordenadas)
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => ({
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    }),
  );

  // Dispara reset do histórico quando o usuário confirma
  useEffect(() => {
    if (!confirmationClearHistory) return;
    setConfirmationClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmationClearHistory, dispatch]);

  // Reordena a lista de tarefas sempre que o estado global de tarefas muda
  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  //useEffect criado apenas para resolver um bug, que deixava a janela de
  // confirmação para limpar o histórico aberta ao mudar para outras abas
  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  // Altera campo e direção da ordenação ao clicar em cabeçalhos
  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  // Abre diálogo de confirmação e atualiza estado conforme resposta
  function HandleResetHistory() {
    toast.dismiss(); // Fecha toasts ativos antes de abrir diálogo
    showMessage.confirm('Tem Certeza?', confirmation => {
      setConfirmationClearHistory(confirmation);
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo Histórico'
              title='Apagar Histórico'
              onClick={HandleResetHistory}
            />
          </span>
        </Heading>
      </Container>

      <Container>
        {hasTasks ? (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Heading>Histórico Limpo...</Heading>
        )}
      </Container>
    </MainTemplate>
  );
}
