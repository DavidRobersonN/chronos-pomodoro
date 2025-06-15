let isRunning = false;

self.onmessage = function (event) {
  //Verificando se há um Running ativo
  if (isRunning) return;

  isRunning = true;

  //Pegando o state
  const state = event.data;
  //Pegando activeTask, secondsRemaining do meu state
  const { activeTask, secondsRemaining } = state;

  //Definindo o tempo final, ou seja quantos segundos faltam para o término
  const endDate = activeTask.startDate + secondsRemaining * 1000;

  //Definindo quantos segundos faltam para o término
  const now = Date.now();
  let countDownSeconds = Math.ceil((endDate - now) / 1000);

  //Função que será executada a cada segundo
  function tick() {
    self.postMessage(countDownSeconds);
    //hora atual
    const now = Date.now();
    //Calculando os Segundos restantes
    countDownSeconds = Math.floor((endDate - now) / 1000);

    //Chamando a função novamente se countDownSeconds for maior que 0
    setTimeout(tick, 1000);
  }

  tick();
};
