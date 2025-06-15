import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { getNextCycle } from '../../util/getNextCycle';
import { getNextCycleType } from '../../util/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  //Ciclos...
  //NextCycleType é um numero de um a 8, com base no ciclo
  //getCycleType é uma função que configura o proximo ciclo
  const nextCycle = getNextCycle(state.currentCycle);
  //getNextCycleType utiliza o nextCycle, para definir no state o nextCycleType
  //nextCycleType: "workTime" | "shortBreakTime" | "longBreakTime"
  const nextCycleType = getNextCycleType(nextCycle);

  // Tips
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Foque por <b>{state.config.workTime}min </b>
      </span>
    ),
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Descanso longo</span>,
  };

  const tipsForNoWhenActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>Próximo ciclo é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Próximo descanso sera longo</span>,
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoWhenActiveTask[nextCycleType]}
    </>
  );
}
