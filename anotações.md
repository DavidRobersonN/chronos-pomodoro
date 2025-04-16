local da chave keygen.exe cat C:\Users\david/.ssh/id_ed25519.pub

comando para instalar os pacotes de package.json "npm install" comando para
rodar o app "npm run dev"

Para desabilitar a politica do power shell Set-ExecutionPolicy -Scope Process
-ExecutionPolicy Bypass

Para comentar dentro de jsx ctrl + / na linha selecionada

Anotações sobre o GitHub Comando para limpar todas alterações feitas apos o
ultimo commit git reset --hard

Anotações O arquivo Principal que é chamado para renderizar a pagina, é o
index.html, neste exercicio, nossa app sera single page, ou seja apenas com uma
pagina.

o arquivo main.tsx renderiza o primeiro componente do nosso app, no nosso caso
inicial, estamos chamado o componente <App /> O componente é basicamente uma
funçao ou classe, que retorna um arquivo jsx ele é exportado no seu arquivo, e
importado no arquivo main.tsx.

PROPS As props sao elementos que os componentes podem receber

HOOKS Todos as funcoes que comecam com use, por exemplo useState(); e um hook do
React Ao trabalharmos com hooks, podemos nos deparar com efeitos colaterais..
entao utilizamos useEffect Exemplo de useEffect:

      // Executado todas as vezes que o componente renderiza na tela
      useEffect(() => {
        console.log('useEffect sem depencias', Date.now());
      });


      //Executado apenas quando o react monta o componente na tela pela primeira vez
      useEffect(() => {
        console.log('useEffect com ARRAY dependencias VAZIO', Date.now());
      }, []); //sem passar dependencias


      //Executa apenas quando o valor de theme muda
      useEffect(() => {
        console.log('useEffect COM ARRAY de dependências', Date.now());
      }, [theme]);

    Para evitar o Prop Drilling, utilizaremos reduce.. PropDrilling seria a ação de
    ficar enviando as as propriedades de um componente para o outro, para atualizar o estado

    utilizando useRef, podemos salvar dados, sem precisar renderizar o componente na tela...
      na proxima vez que realmente precisar renderizar o componente, vira com o valor atualizado

CONTEXTO primeiro passo é criar um contexto, esse contexto precisa de um valor
inicial esse valor inicial só sera usado, caso eu nao utilize um provider
(Sempre vamos utilizar um provider)

Provider O provider é que prove o valor para os componentes que estão envolvidos
por ele, ex:

# observações

Sempre que houver uma iteração, precisamos indicar para o react uma chave Key,
para identificar o elemento, e saber que aquele elemento é único na página
