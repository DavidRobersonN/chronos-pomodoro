import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg),
  info: (msg: string) => toast.info(msg),
  dismiss: () => toast.dismiss(),

  // Exibe um toast personalizado com botões de confirmação e cancelamento
  // Parâmetros:
  // - data: mensagem a ser exibida no corpo do toast
  // - onClosing: função callback executada com true (confirmado) ou false (cancelado)
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data, // Passa a mensagem para o componente Dialog via props

      // Executado automaticamente quando o toast é fechado (manualmente ou por interação)
      onClose: confirmation => {
        // Se o usuário confirmou (closeToast(true)), chama o callback com true
        if (confirmation) return onClosing(true);

        // Se o usuário cancelou (closeToast(false)) ou fechou sem ação, chama com false
        return onClosing(false);
      },

      // Toast permanece visível até o usuário tomar uma decisão
      autoClose: false,

      // Impede que o toast feche ao clicar fora dele
      closeOnClick: false,

      // Remove o botão de fechar padrão (X)
      closeButton: false,

      // Impede que o usuário arraste o toast pela tela
      draggable: false,
    }),
};
