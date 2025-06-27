// Importa o tipo das props que serão passadas para o componente de Toast personalizado
import { ToastContentProps } from 'react-toastify';

// Importa o botão padrão estilizado da aplicação
import { DefaultButton } from '../DefaultButton';

// Importa os ícones de "joinha positivo" e "joinha negativo" da biblioteca lucide-react
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

// Importa os estilos CSS do componente
import styles from './styles.module.css';

// Define o componente Dialog, que é um Toast personalizado
// Recebe `closeToast` (função para fechar o toast) e `data` (mensagem ou dado que será exibido)
export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      {/* Container principal do Toast personalizado */}
      <div className={styles.container}>
        {/* Exibe o conteúdo que foi passado para o Toast (ex: mensagem de confirmação) */}
        <p>{data}</p>

        {/* Container para os botões de ação (confirmar ou cancelar) */}
        <div className={styles.buttonsContainer}>
          {/* Botão de confirmação */}
          <DefaultButton
            onClick={() => closeToast(true)} // Ao clicar, fecha o toast e envia "true"
            icon={<ThumbsUpIcon />} // Ícone de joinha positivo
            aria-label='Confirmar ação e fechar' // Acessibilidade: descreve a ação do botão
            title='Confirmar ação e fechar' // Tooltip ao passar o mouse
          />

          {/* Botão de cancelamento */}
          <DefaultButton
            onClick={() => closeToast(false)} // Ao clicar, fecha o toast e envia "false"
            icon={<ThumbsDownIcon />} // Ícone de joinha negativo
            color='red' // Cor vermelha para indicar ação negativa
            aria-label='Cancelar ação e fechar' // Acessibilidade
            title='Cancelar ação e fechar' // Tooltip
          />
        </div>
      </div>
    </>
  );
}
