import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManage';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../util/loadBeep';
import { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

// Cria um componente Provider para compartilhar o estado das tasks com toda a aplicação
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  // useReducer gerencia o estado das tasks. Na inicialização, ele executa a função de terceiro argumento
  const [state, dispatch] = useReducer(
    taskReducer, // Função reducer que define como o estado é atualizado
    initialTaskState, // Estado inicial caso não tenha nada salvo
    () => {
      // Função de inicialização, executada apenas na primeira renderização

      // Tenta buscar um estado salvo no localStorage
      const storeState = localStorage.getItem('state');

      // Se não encontrar nada no localStorage, retorna o estado inicial padrão
      if (storeState === null) return initialTaskState;

      // Se encontrou, faz o parse da string JSON para transformar em objeto
      const parsedStoreState = JSON.parse(storeState) as TaskStateModel;

      // Retorna o estado recuperado, mas sempre resetando a task ativa e o cronômetro,
      // pois não faz sentido manter uma contagem ativa após recarregar a página
      return {
        ...parsedStoreState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    },
  );

  // Criando uma referência para guardar o áudio gerado pela função loadBeep()
  // Informamos ao useRef que o tipo será o retorno da função loadBeep
  // (um objeto de áudio)
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        console.log('Tocando áudio...');
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  //Toda vez que o estado atualiza, o useEffect e chamado
  useEffect(() => {
    //Salva o estado atual no localStorage do navegador, convertendo o objeto
    //  'state' para uma string JSON
    localStorage.setItem('state', JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    //Se tem uma task ativa e playBeepRef ainda for null
    if (state.activeTask && playBeepRef.current === null) {
      console.log('Carregando áudio...');
      //Carregando o audio
      playBeepRef.current = loadBeep();
    } else {
      console.log('Zerando áudio...');
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
