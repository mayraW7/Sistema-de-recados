document.querySelector('#cadastro').addEventListener('click', (w)=>{
    w.preventDefault();
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#senha').value;

    salvar(email, senha);
});


function salvar(e, s){
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');

    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }
   
    db.push(usuario);
    
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'index.html';    
}
