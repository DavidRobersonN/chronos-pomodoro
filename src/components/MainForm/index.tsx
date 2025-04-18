import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { getNextCycle } from '../../util/getNextCycle';
import { getNextCycleType } from '../../util/getNextCycleType';
import { formatSecondsToMinutes } from '../../util/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
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
      //Apenas para gerar um dado único, para ser o id
      id: Date.now().toString(),
      // O nome da task, sera o que estiver dentro do input
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType, //proximo "workTime" | "shortBreakTime" | "longBreakTime"
    };

    const secondsRemaining = newTask.duration * 60;

    //Agora que a task foi criada, precisamos guardar ela no array de tasks
    setState(prevState => {
      return {
        ...prevState, // Copiando os dados antigos
        config: { ...prevState.config }, //Copiando para garantir o tipo da task
        //Acrescentando a nova task que foi criada, dentro do nosso array de tasks
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        //Copiando a task anterior, e adicionando a nova que criamos
        tasks: [...prevState.tasks, newTask],
      };
    });
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
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
