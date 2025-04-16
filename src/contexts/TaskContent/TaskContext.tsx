import { createContext } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';

//Aqui estamos criando o contexto da nossa app
type TaskContextProps = {
  state: TaskStateModel; //Passando o nosso modelo como estado
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>; //Passando o tipo da função set que vai receber
};

//Esse sera o estado inicial do nosso contexto
const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
