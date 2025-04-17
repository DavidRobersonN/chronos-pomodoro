import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { getNextCycle } from '../../util/getNextCycle';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //Ciclos... utiliza a função que criamos para configurar o proximo ciclo, com
  //  base no atual
  const nextCycle = getNextCycle(state.currentCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
      duration: 1, //Depois vai vir do estado
      type: 'workTime', //Depois vai vir do estado
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState, // Copiando os dados antigo
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, //Conferir
        formattedSecondsRemaining: '00:00',
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

      <div className='formRow'></div>
      <Cycles />

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
