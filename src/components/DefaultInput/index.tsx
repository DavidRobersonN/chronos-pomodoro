type DefaultInputProps = {
  id: string; // Forçando utilizar uma string
} & React.ComponentProps<'input'>; // capturando os tipos padroes do React, para que eu possa utilizar no meu app.tsx dentro do input

export function DefaultInput({ id, type }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>task</label>
      <input id={id} type={type} />
    </>
  );
}
