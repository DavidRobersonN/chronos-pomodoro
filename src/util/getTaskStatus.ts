// Importa o tipo TaskModel, que representa a estrutura de uma tarefa
import { TaskModel } from '../models/TaskModel';

// Função que recebe uma tarefa (task) e a tarefa que está ativa no momento (activeTask) ou null
export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  // Se a tarefa possui uma data de conclusão, ela está completa
  if (task.completeDate) return 'Completa';

  // Se a tarefa possui uma data de interrupção, ela foi interrompida
  if (task.interruptDate) return 'Interrompida';

  // Se o id da tarefa for igual ao id da tarefa ativa, ela está em progresso
  if (task.id === activeTask?.id) return 'Em progresso';

  // Caso não se enquadre em nenhuma das condições acima, considera-se como abandonada
  return 'Abandonada';
}
