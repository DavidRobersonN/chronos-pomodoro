//A partir do valor que vai receber em seconds, vai formatar para minutos e segundos
export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondMod = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${minutes}:${secondMod}`;
}
