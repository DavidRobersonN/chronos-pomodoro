import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { getNextCycle } from '../../util/getNextCycle';
import { getNextCycleType } from '../../util/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  //Trazendo o nosso estado c om useStateContext...
  const { state } = useTaskContext();
  //criando um array com o tamanho do nosso currentCycle
  const cycleStep = Array.from({ length: state.currentCycle });

  //Funcao para mapear os nomes que serao colocados em aria label, e tittle
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              //indicando um key para o react, pois vai ser um array, colocamos 2 elementos para garantir que nao vai se repetir...
              key={`${nextCycleType}_${nextCycle}`}
              //Aplicando css, com as nossas chaves "workTime" | "shortBreakTime" | "longBreakTime" que esta dentro de nextCycleType
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              //colocando os nome de aria-label e title, pela funcao que fizemos
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
