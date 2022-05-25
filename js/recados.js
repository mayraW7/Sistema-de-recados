const form = document.querySelector("#infos-prod");
const divErro = document.querySelector("#msg-erro");
const tabela = document.querySelector("#tbody");
let idx = form.idx.value; 
let usuarioId = Number(sessionStorage.getItem('logado'));
//LOGCHECKED
const session = localStorage.getItem("session");

checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "index.html"
        return;
    }

    /*const dataUser = localStorage.getItem(logado);
    if(dataUser){
        data = JSON.parse(dataUser);
    }*/

}


console.log(usuarioId);

//salva no localstorage
const atualizarLocalStorage = (notas) => {
    localStorage.setItem("notas", JSON.stringify(notas));
};

//recupera de la
const recuperarLocalStorage = () => {
    const notas = JSON.parse(localStorage.getItem("notas") || "[]");
    return notas;
};

const salvarNota = (event) => {
    event.preventDefault();
    console.log("passou pelo evento");
    divErro.innerHTML = "";
    const titulo = form.titulo.value;
    const anotacao = (form.anotacao.value);
    // const prime = form.prime.checked;
    const erros = [];

    if (!titulo || titulo.length < 2) {
        erros.push("<p>Título inválido!</p>");
    }
    // if (!anotacao || anotacao <= 0) {
    //     erros.push("<p>Sem descrição!</p>");
    // }
    if (erros.length > 0) {
        divErro.innerHTML = erros.join(" ");
        return;
    }

    console.log(idx)

    if(idx == "novo"){
        const notas = recuperarLocalStorage();
        let i = 1;
        let idt = 0;
        for(const pro of notas){
            if(pro.usuarioId === usuarioId){
                //i+=1;
                idt = Number(pro.id);
            }
        }
//produtos.push({ id: produtos.length, nome, preco, prime, usuarioId});
        produtos.push({ id: idt+=1, titulo, anotacao, usuarioId});
        atualizarLocalStorage(notas);
        preencherTabela();
        form.reset();
        console.log(idx, "teste")
    }else{
        let nota = {
            id: idx, titulo, anotacao, usuarioId 
        }
        editar(idx, nota);
        preencherTabela();
        form.reset();
        idx = "novo";
        console.log('editar', idx);
    }
   
};

const preencherTabela = () => {
    const notas = recuperarLocalStorage();
    tabela.innerHTML = "";
    for (const nota of notas) {

        if(produto.usuarioId === usuarioId){
            tabela.innerHTML += `
        <tr>
            <th scope="row">${nota.id}</th>
            <td>R$ ${titulo.nome}</td>
            <td>R$ ${anotacao.preco}</td>
            <td>
                <img type="button" width="60" src="./img/delet.svg" onclick="removerNota(${nota.id})" />
                <img type="button" width="60" src="./img/editar.svg" onclick="atualizaNota(${nota.id})" />
            </td>
        </tr>
    `;
        }
    }
};

const removerNota = (id) => {
    const notas = recuperarLocalStorage();
    const indexNota = notas.findIndex((nota) => nota.id === id);
    if (indexNota < 0)
        return;
    notas.splice(indexNota, 1);
    atualizarLocalStorage(notas);
    alert("Nota removida com sucesso!");
    preencherTabela();
};

function editar(idx, nota){
    const notas = JSON.parse(localStorage.getItem("notas") || "[]");
    const indexNota = notas.findIndex((p) => p.id === idx);
    notas[indexNota] = nota;
    localStorage.setItem("notas", JSON.stringify(notas));
}

const atualizaNota = (id)=>{
    const notas = recuperarLocalStorage();
    const indexNota = notass.findIndex((nota) => nota.id === id);
    //console.log(produtos[indexProduto]);
    form.titulo.value = notas[indexNota].titulo;
    form.anotacao.value = notas[indexNota].anotacao;
    // form.prime.value = produtos[indexProduto].prime;
    idx = id;
    console.log(idx)
}

form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarNota);
document.addEventListener("DOMContentLoaded", preencherTabela);

let sair = document.querySelector('#sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");


    window.location.href = "index.html";
}

