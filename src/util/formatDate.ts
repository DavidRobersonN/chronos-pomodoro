// Importa a função 'format' da biblioteca 'date-fns',
// que é usada para formatar datas de maneira simples.
import { format } from 'date-fns';

/**
 * Função que formata um timestamp (número de milissegundos desde 1970)
 * em uma string no formato 'dia/mês/ano horas:minutos'.
 *
 * Exemplo de retorno: '22/06/2025 15:30'
 *
 * @param timestamp - Data em formato timestamp (número)
 * @returns - String com a data formatada
 */
export function formatDate(timestamp: number) {
  // Cria um objeto Date a partir do timestamp recebido
  const date = new Date(timestamp);

  // Usa a função 'format' do date-fns para transformar a data
  // no formato 'dd/MM/yyyy HH:mm' (dia/mês/ano hora:minuto)
  return format(date, 'dd/MM/yyyy HH:mm');
}
