const form = document.querySelector("#infos-nota");
const divErro = document.querySelector("#msg-erro");
const tabela = document.querySelector("#tbody");
let idx = form.idx.value; 
let usuarioId = Number(sessionStorage.getItem('logado'));

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

}

console.log(usuarioId);


const atualizarLocalStorage = (notas) => {
    localStorage.setItem("notas", JSON.stringify(notas));
};


const recuperarLocalStorage = () => {
    const notas = JSON.parse(localStorage.getItem("notas") || "[]");
    return notas;
};

const salvarNota = (event) => {
    event.preventDefault();
    console.log("passou pelo evento");
    divErro.innerHTML = "";
    const titulo = form.titulo.value;
    const anotacao = form.anotacao.value;

    const erros = [];

    if (!titulo || titulo.length < 2) {
        erros.push("<p>Título inválido!</p>");
    }

    if (erros.length > 0) {
        divErro.innerHTML = erros.join(" ");
        return;
    }

    console.log(idx)

    if(idx == "novo"){
        const notas = recuperarLocalStorage();
        let idt = 0;
        for(const pro of notas){
            if(pro.usuarioId === usuarioId){
                idt = Number(pro.id);
            }
        }

        notas.push({ id: idt+=1, titulo, anotacao, usuarioId});
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

        if(nota.usuarioId === usuarioId){
            tabela.innerHTML += `
        <tr>
            <th scope="row">${nota.id}</th>
            <td>${nota.titulo}</td>
            <td>${nota.anotacao}</td>
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
    const indexNota = notas.findIndex((nota) => nota.id === id);

    form.titulo.value = notas[indexNota].titulo;
    form.anotacao.value = notas[indexNota].anotacao;

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

