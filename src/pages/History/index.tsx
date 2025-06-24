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
import { TaskActionTypes } from '../../contexts/TaskContent/taskActions';
import { useEffect, useState } from 'react';

export function History() {
  const { state, dispatch } = useTaskContext();
  // Cria um estado chamado sortTasksOptions e uma função para atualizá-lo (setSortTaskOptions)
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    // Valor inicial do estado, definido usando uma função (lazy initializer)
    () => {
      return {
        // tasks: chama a função sortTasks passando o array de tasks atual do estado
        // Isso retorna as tarefas já ordenadas conforme a lógica definida dentro de sortTasks
        tasks: sortTasks({ tasks: state.tasks }),

        // field: campo que será usado para ordenar inicialmente, neste caso, pela 'startDate' (data de início)
        field: 'startDate',

        // direction: direção da ordenação, onde 'desc' significa ordem decrescente (do mais recente para o mais antigo)
        direction: 'desc',
      };
    },
  );

  // useEffect executa um efeito colateral sempre que o array de dependências muda
  useEffect(() => {
    // Atualiza o estado sortTasksOptions com uma nova lista de tarefas ordenadas
    setSortTaskOptions(prevState => ({
      // Mantém todas as outras propriedades que já estavam no estado anterior
      ...prevState,

      // Atualiza apenas a lista de tarefas, reordenando ela
      tasks: sortTasks({
        tasks: state.tasks, // Usa as tarefas atuais do estado global/contexto
        direction: prevState.direction, // Mantém a direção atual de ordenação (asc ou desc)
        field: prevState.field, // Mantém o campo atual de ordenação (ex: startDate, title, etc.)
      }),
    }));
    // Esse efeito é executado sempre que state.tasks mudar (ex: uma tarefa for adicionada, editada ou removida)
  }, [state.tasks]);

  // 🔧 Função responsável por ordenar as tarefas quando o usuário clica em um cabeçalho, por exemplo
  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    // 🧠 Verifica a direção atual de ordenação.
    // Se for 'desc' (decrescente), troca para 'asc' (crescente).
    // Se for 'asc', troca para 'desc'.
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    // 🚀 Atualiza o estado sortTasksOptions com as novas configurações de ordenação
    setSortTaskOptions({
      // 🔄 Atualiza a lista de tarefas, aplicando a ordenação com:
      // - O novo campo (field) que foi clicado
      // - A nova direção (asc ou desc)
      tasks: sortTasks({
        direction: newDirection, // 👉 Nova direção da ordenação
        tasks: sortTasksOptions.tasks, // 👉 Usa as tarefas que já estão no estado atual (não pega do state global aqui)
        field, // 👉 Campo escolhido para ordenação (ex.: 'startDate', 'title', etc.)
      }),

      // 🔧 Atualiza no estado qual é a direção da ordenação (para que a UI saiba, e para alternar da próxima vez)
      direction: newDirection,

      // 🔧 Atualiza no estado qual é o campo que está sendo usado para ordenar
      field,
    });
  }

  function HandleReset() {
    dispatch({
      type: TaskActionTypes.RESET_STATE,
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
              onClick={HandleReset}
            />
          </span>
        </Heading>
      </Container>

      <Container>
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
      </Container>
    </MainTemplate>
  );
}
