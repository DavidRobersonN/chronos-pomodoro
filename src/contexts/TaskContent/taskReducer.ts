import { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../util/formatSecondsToMinutes';
import { getNextCycle } from '../../util/getNextCycle';
import { TaskActionModel, TaskActionTypes } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
  }
  return state;
}
