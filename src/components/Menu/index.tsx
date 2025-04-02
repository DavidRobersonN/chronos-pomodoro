import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react'; // Lucide, biblioteca de ícones
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

// declarando que posso usar apenas um dos dois tipos para o meu tema
type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>('dark'); // Passando para o useState os meus valores pre-definidos.. e deixando como padrão Dark

  //função para fazer a troca do tema
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, // Evento que sera capturado
  ) {
    event.preventDefault(); // Nao carregue o link #

    //Lógica principal da função, onde faz a troca a cada click
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme; // Este é o valor que é retornado na minha useState, dentro de theme
    });
  }
  //para resolver o efeito colateral, utilizamos useEffect, para atualizar o valor de theme dentro da pagina
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); // essa função fica monitorando o valor de theme, e só é executada quando theme é alterado

  return (
    <nav className={styles.Menu}>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ir para Home'
        title='Ir para Home'
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Ver Histórico'
        title='Ver Histórico'
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange} // Nossa função de hooks useState, juntamento com  useEffect alterando o valor de theme
      >
        <SunIcon />
      </a>
    </nav>
  );
}
