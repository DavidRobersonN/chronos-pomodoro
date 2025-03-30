import styles from './styles.module.css';

type DefaultInputProps = {
  id: string; // Forçando utilizar uma string
  labelText?: string; //a interrogação significa que o label é opcional
} & React.ComponentProps<'input'>; // capturando os tipos padrões do React, para que eu possa utilizar no meu app.tsx dentro do input

export function DefaultInput({
  labelText,
  id,
  type,
  ...rest //para poder utilizar qualquer opção do input
}: DefaultInputProps) {
  return (
    <>
      {/* se  houver label "&&", carregue o label*/}
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
