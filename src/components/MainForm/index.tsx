import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { getNextCycle } from '../../util/getNextCycle';
import { getNextCycleType } from '../../util/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContent/taskActions';
//import { formatSecondsToMinutes } from '../../util/formatSecondsToMinutes';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //Ciclos...
  //NextCycleType é um numero de um a 8, com base no ciclo
  //getCycleType é uma função que configura o proximo ciclo
  const nextCycle = getNextCycle(state.currentCycle);
  //getNextCycleType utiliza o nextCycle, para definir no state o nextCycleType
  //nextCycleType: "workTime" | "shortBreakTime" | "longBreakTime"
  const nextCycleType = getNextCycleType(nextCycle);

  //Capturando o evento de submeter o formulário
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //Se o campo input for vazio null... return
    if (taskNameInput.current === null) return;

    //Dentro de taskName, estamos colocando o que capturamos com o useRef
    //  e colocamos dentro de taskNameInput..
    const taskName = taskNameInput.current.value.trim(); // e ao mesmo tempo
    // aplicando trim, para retirar espaços sobrando

    // Caso o input for vazio, abrira um alerta
    if (!taskName) {
      alert('digite o nome da tarefa');
      return;
    }
    //Se tudo bem, Essa sera a nova task que sera criada
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType, //proximo "workTime" | "shortBreakTime" | "longBreakTime"
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask(
    //Utilizei esse preventDefault para nao deixar enviar o formulario, caso o
    //React confunda os botoes
    //Para resolver, poderia em vez de usar o if ternário... e então colocar dois &&
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    // setState(prevState => {
    //   return {
    //     ...prevState,
    //     activeTask: null,
    //     secondsRemaining: 0,
    //     formattedSecondsRemaining: '00:00',
    //     tasks: prevState.tasks.map(task => {
    //       //Se o primeiro elemento existir e o segundo for verdadeiro
    //       if (prevState.activeTask && prevState.activeTask.id === task.id) {
    //         return { ...task, interruptDate: Date.now() };
    //       }
    //       return task;
    //     }),
    //   };
    // });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='meuInput'
          type='text'
          labelText='task'
          placeholder='Digite algo'
          ref={taskNameInput} //Referencia para useRef
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {/*Caso nao haja cyclos, nao apresentara esta div */}
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            aria-label='Interromper tarefa Atual'
            title='Interromper tarefa Atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            //Passamos a funcao que criamos para onClick, que vai ser executado quando o botao for clicado
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
