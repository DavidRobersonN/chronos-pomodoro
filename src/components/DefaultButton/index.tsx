import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: 'green' | `red`; //color?: vai utilizar a cor padrao, caso nao receber green ou red
} & React.ComponentProps<'button'>; // capturando os tipos padrões do React, para que eu possa utilizar no meu app.tsx dentro do button

export function DefaultButton({
  icon,
  color = 'green',
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
