import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import styles from './styles.module.css';

export function CountDown() {
  const { state } = useTaskContext();
  return (
    <div className={styles.countDown}>{state.formattedSecondsRemaining}</div>
  );
}
