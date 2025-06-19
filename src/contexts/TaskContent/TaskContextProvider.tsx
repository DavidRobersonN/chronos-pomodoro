import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManage';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../util/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

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
    if (!state.activeTask) {
      worker.terminate();
    }
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
