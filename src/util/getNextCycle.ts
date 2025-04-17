export function getNextCycle(currentCycle: number) {
  //Se o currentCycle for igual a 1, ele vai virar 1,
  //  ou se ele for igual a 8, volta para 1 de novo
  //se ele for qualquer numero diferente do 1 ou 8, ele vai somar + 1
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}
