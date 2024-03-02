// Classe para fazer o menu para a versão mobile
class MobileNavbar {
    constructor(mobileMenu, listaNavBar, navLinks){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.listaNavBar = document.querySelector(listaNavBar);
        this.navLinks = document.querySelectorAll(navLinks);
        this.classeAtiva = "ativo";

        this.handleClick = this.handleClick.bind(this);
    }

    // Transição de clique no menu hamburguer
    animateLinks(){
        this.navLinks.forEach((link) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards 0.3s`);
        });
    }

    // Passando a função de clique para ativar e desativar a classe definida
    handleClick(){
        this.listaNavBar.classList.toggle(this.classeAtiva);
        this.mobileMenu.classList.toggle(this.classeAtiva);
        this.animateLinks();
    }

    // Acionando a função de clique
    addClickEvent(){
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    // Verificando se o menu existe para poder ser clicado e chamar a função
    init(){
        if(this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}

// Instancia de objeto da classe MobileNavBar
const mobileNavbar = new MobileNavbar(
    ".mobilemenu",
    ".listaNavBar",
    ".navbar li",
);

// Método da classe MobileNavBar
mobileNavbar.init();
    
// Classe aluno e métodos para armazenar e imprimir as informações do aluno
class Aluno{

    // Propriedades da classe
    nome;
    notaUm;
    notaDois;
    notaTres;
    notaQuatro;

    // Média individual
    media;

    // Resultado de cada aluno
    resultado = ''

    // Soma de todas as médias
    mediaSalaSoma = 0;

    // Média da turma
    mediaSala;

    // Array para armazenar cada uma das médias
    mediasTodosAlunos = []

    // Array de objetos que armazenará as informações de cada aluno
    arrDeAlunos = []

    // Método construtor
    constructor(nome, notaUm, notaDois, notaTres, notaQuatro){
        this.nome = nome;
        this.notaUm = notaUm;
        this.notaDois = notaDois;
        this.notaTres = notaTres;
        this.notaQuatro = notaQuatro;
    }

    // Calculando a media de cada aluno
    calcularMediaIndividual(){
        this.media = ((this.notaUm + this.notaDois + this.notaTres + this.notaQuatro) / 4).toFixed(2)
    }

    // Calculando a média da turma
    calcularMediaTurma(container){

        // Adicionando as médias individuais em um array
        this.arrDeAlunos.map(e => {
            this.mediasTodosAlunos.push(Number(e.media))
        })        

        // Somando os valores do array que contem as médias e colocando em uma variavel
        for(let i of this.mediasTodosAlunos){
            this.mediaSalaSoma += i;
        }

        // Calculando a média da turma
        this.mediaSala = this.mediaSalaSoma / this.mediasTodosAlunos.length;

        // Diminuindo o numero de casas decimais
        this.mediaSala = this.mediaSala.toFixed(2)

        // Criando uma div para imprimir a média da turma
        let newDiv = document.createElement('div');

        // Adicionando a div no HTML a partir de um container
        container.appendChild(newDiv);

        // Adicionando classe na div para estilizar
        newDiv.classList.add('containerMediaTurma');

        // Imprimindo as informações
        newDiv.innerHTML =
        `
            <span class=mediaTurma> Média da turma: ${this.mediaSala} </span>
        `
    }

    // Método que ira definir o resultado do aluno
    definirResultado(){
        if(this.media >= 70){
            this.resultado = 'Aprovado'
        }else if(this.media >= 50){
            this.resultado = 'Recuperação'
        }else{
            this.resultado = 'Reprovado'
        }
    }

    // Método para criar um novo objeto
    novoObj(){
        let obj = {
            nome : this.nome,
            notaUm : this.notaUm,
            notaDois : this.notaDois,
            notaTres : this.notaTres,
            notaQuatro : this.notaQuatro,
            media : this.media,
            resultado : this.resultado
        }
        // Armazenando esse objeto no array de objetos
        this.arrDeAlunos.push(obj);
        console.log(this.arrDeAlunos)
    }

    // Método para limpar os inputs
    limparInputs(){
        // Operador spread para transformar o HTMLCollection em um array para poder utilizar os métodos de array
        let inputs = [...document.querySelectorAll('input')];
        inputs.map(e => {
            e.value = ''
        })
    }

    // Método para limpar o container onde serão impressas as informações
    limparContainer(container){
        let filhos = [...container.children];
        filhos.map(e => {
            e.style.display = 'none'
        })
        container.style.cssText = 'min-height: 450px; overflow-y: scroll; overflow-x: hidden;'
    }

    // Método de impressão
    imprimir(container){

        // Para cada elemento dentro do array de objetos criamos uma div para armazenar esse elemento e suas propriedades
        this.arrDeAlunos.map(e => {
            // Criando a div pai do container que conterá as informações
            let newDiv = document.createElement('div');

            // Adicionando a nova div ao documento html dentro do container que foi passado como parametro
            container.appendChild(newDiv);

            // Criando uma classe para essa nova div para que seja estilizada
            newDiv.classList.add('containerAluno')

            // Imprimindo as informações dentro da nova div
            newDiv.innerHTML = `
                <div class=containerImpressao> 
                    <div class=containerNomeAluno> 
                        <h3 class=nomeAlunoImpressao> ${e.nome} </h3>
                    </div>
                    <div class=containerNotasImpressao>
                        <span class=spanNotas> Primeira nota do aluno: ${e.notaUm} </span>
                        <span class=spanNotas> Segunda nota do aluno: ${e.notaDois} </span>
                        <span class=spanNotas> Terceira nota do aluno: ${e.notaTres} </span>
                        <span class=spanNotas> Quarta nota do aluno: ${e.notaQuatro} </span>
                    </div>
                    <div class=resultado> 
                        <span> Média do aluno: ${e.media} </span>
                        <span> Resultado: ${e.resultado} </span>
                    </div>
                </div>
                `
            // Condicional para decidir qual estilo deve ser aplicado na nova div toda vez que ela for criada
            if(e.resultado == 'Aprovado'){
                newDiv.classList.add('backgroundAprovado')
            }
            if(e.resultado == 'Recuperação'){
                newDiv.classList.add('backgroundRec')
            }
            if(e.resultado == 'Reprovado'){
                newDiv.classList.add('backgroundReprovado')
            }
        
        })
        // Removendo o id do container para aplicar as informações da nova classe
        container.removeAttribute('id')
        container.classList.add('limpar')
    }

}   

// Criando as variaveis para clique e o container que armazena o formulario
let btnAdd = document.querySelector('#btnCadastro')
let btnImprimir = document.querySelector('#btnShow')
let container = document.querySelector('#container')

// Pegando o valor dos inputs (Erro ocorrendo ao utilizar a propriedade .value aqui)
let nome = document.getElementById('nomeAluno');
let notaUm = document.getElementById('primeiraNota');
let notaDois = document.getElementById('segundaNota');
let notaTres = document.getElementById('terceiraNota');
let notaQuatro = document.getElementById('quartaNota');

// Variavel com operador spread para fazer um array com todos os inputs, para que sejam limpos ao acionar o método limparInputs()
let inputs = [...document.querySelectorAll('input')]

// Instancia de objeto (Erro ao tentar passar as informações com o método construtor)
let aluno = new Aluno()

// Evento de clique para cadastrar um aluno
btnAdd.addEventListener('click', () => {

    // Utilizando a propriedade .value dentro do evento de clique para corrigir o primeiro erro que a propriedade retornou
    let nome1 = nome.value
    let nota1 = notaUm.value
    let nota2 = notaDois.value
    let nota3 = notaTres.value
    let nota4 = notaQuatro.value

    // Passando as propriedades para o novo objeto instanciado
    aluno.nome = nome1;
    aluno.notaUm = Number(nota1);
    aluno.notaDois = Number(nota2);
    aluno.notaTres = Number(nota3);
    aluno.notaQuatro = Number(nota4);

    //chamando o método para calcular a média do aluno
    aluno.calcularMediaIndividual();

    // Definindo a situação do aluno
    aluno.definirResultado();

    // Armazenando as informações desse aluno no array de objetos
    aluno.novoObj();

    // Limpando os inputs
    aluno.limparInputs(container);
})

// Evento de impressão para mostrar as informações
btnImprimir.addEventListener('click', ()=>{
    
    // Verificando se há algum objeto dentro do array
    if(aluno.arrDeAlunos.length == 0){
        alert('Escreva as informações e depois clique em cadastrar aluno')
        location.reload();
    }

    // Limpando o container onde aparecerão as informações
    aluno.limparContainer(container);

    // Calculando média da turma
    aluno.calcularMediaTurma(container);
    
    // Imprimindo as informações 
    aluno.imprimir(container)

;})


