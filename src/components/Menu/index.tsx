import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react'; // Lucide, biblioteca de ícones
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

// declarando que posso usar apenas um dos dois tipos para o meu tema
type AvailableThemes = 'dark' | 'light';

export function Menu() {
  //Passando para useState minhas opções de temas padrões dark ou light
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    //Dentro de storageTheme buscamos com .getItem o valor theme
    const storageTheme = //Utilizando 'as' estamos forçando usar nossas opções de temas, ou dark, caso nao tenha valor na chave theme, por exemplo se for a primeira busca na pagina
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  // constante que guarda os ícones que serão chamados pela chave dark ou light
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

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
    localStorage.setItem('theme', theme); //Aqui esta acontecendo que, estamos buscando no html utilizando localStorage.setItem, a chave 'theme', e mudando o valor dela para theme, que vem lá de useState
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
        {/* escolhendo qual ícone vai aparecer, dependendo da chave que for passado, dark ou light */}
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
