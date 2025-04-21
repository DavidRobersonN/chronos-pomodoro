local da chave keygen.exe cat C:\Users\david/.ssh/id_ed25519.pub

# comando para marcar o texto nos arquivos .md

# 📝 Título Nível 1

## 🔹 Título Nível 2

### 🔸 Título Nível 3

---

**Negrito:**  
**Este texto está em negrito**

_Itálico:_  
_Este texto está em itálico_

**_Negrito + Itálico:_**  
**_Este texto está em negrito e itálico_**

---

🧾 **Lista ordenada:**

1. Primeiro item
2. Segundo item
   1. Subitem

📌 **Lista não ordenada:**

- Item 1
- Item 2
  - Subitem

---

💬 **Citação (blockquote):**

> Isso é uma citação em Markdown

---

💻 **Código Inline:**  
Use a crase: `console.log('Olá mundo');`

📦 **Bloco de Código com Linguagem:**

```javascript
function minhaFuncao() {
  console.log('Isso é um bloco de código!');
}
```

**Atalho para colocar emojis**

> tecla (WINDOWS + . )Abre a tela de emojis

# COMANDOS TERMINAL

**comando para instalar os pacotes de package.json**
  "npm install" comando para

**Para desabilitar a politica do power shell**
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

**Rodar o app**
  npm run dev

**Para comentar dentro de jsx**
  ctrl + / na linha selecionada



# Anotações sobre o GitHub

>Comando para limpar todas alterações feitas apos o ultimo commit git reset
  --hard

# Anotações

 O arquivo Principal que é chamado para renderizar a pagina, é o index.html,
neste exercicio, nossa app sera single page, ou seja apenas com uma pagina.

 >o arquivo main.tsx 
  Renderiza o primeiro componente do nosso app, no nosso caso
  inicial, estamos chamado o componente <App /> O componente é basicamente uma
  funçao ou classe, que retorna um arquivo jsx ele é exportado no seu arquivo, e
  importado no arquivo main.tsx.

>PROPS 
  As props sao elementos que os componentes podem receber

# HOOKS 
Todos as funcoes que comecam com use, por exemplo useState(); e um hook do
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

>observações
  Sempre que houver uma iteração, precisamos indicar para o react uma chave Key,
  para identificar o elemento, e saber que aquele elemento é único na página



# Anotações Sobre useReducer

>hook useReducer

```javascript
const [numero, dispatch] = useReducer((state, action) => { //dispatch é o nome da função, quando formos chama-lá... Numero é o estado
  switch (action) {
    case 'Increment': //Increment é o nome da chave que sta dentro de action... essa chave é passado quando chama-se a função
      return state + 1;
      case 'Decrement': //Increment é o nome da chave que sta dentro de action... essa chave é passado quando chama-se a função
      return state - 1;
  }
  return state;
}, 0);
```


# **Agora um exemplo usando action.type**

```javascript
type ActionType = {
  type: string;
  payload?: number; //payload opcional
};

const [myState, dispatch] = useReducer(
  (state, action: ActionType) => { //
  
  switch (action.type) {
    case 'Increment': //
      if (!action.payload) return state; //Quando o payload for opcional, precisa checar se ele existe
      return {
        ...state,
        secondsRemaing: state.secondsRemaing + action.payload, //payload seria uma constante que seria passada na hora da chamada da função
      };
  }
  return state;
}, 0);

//Agora utilizando a nossa função dispatch
<button onClick={()=> dispatch({ type: 'Increment', payload:1 })} //A vantagem agora, que podemos passar para a função, um valor com opor exemplo payload
```
  o useReducer, recebe o estado, e uma ação, e retorna um novo Estado com base na
ação que foi passado
