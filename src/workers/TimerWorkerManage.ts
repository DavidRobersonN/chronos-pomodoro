import { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  //Ao utilizar private constructor, garantimos que a classe timerWorkerManager
  //só pode ser instanciada uma vez, evitando múltiplas instâncias do worker.
  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }
  //Este é o método estático que retorna a instância única da classe
  // TimerWorkerManager.
  //Se a instância já existir, ela é retornada; caso contrário, uma nova
  // instância é criada.
  static getInstance() {
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    return instance;
  }

  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
