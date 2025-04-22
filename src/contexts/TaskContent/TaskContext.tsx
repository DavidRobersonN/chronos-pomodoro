import { createContext } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import { TaskActionModel } from './taskActions';

//Aqui estamos criando o contexto da nossa app
type TaskContextProps = {
  state: TaskStateModel; //Passando o nosso modelo como estado
  dispatch: React.Dispatch<TaskActionModel>; //Passando o tipo da função set que vai receber
};

//Esse sera o estado inicial do nosso contexto
const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
