const form = document.getElementById('formCadastro');
const listaRecuperada = JSON.parse(localStorage.getItem('listaDeUsuario')) || [];

let listaDeUsuario = []
function atualizaLocalStorage() {
    localStorage.setItem('listaDeUsuario', JSON.stringify(listaDeUsuario));
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


function criaUsuario(nome, email, usuario, senha) {
    
    listaDeUsuario.push({
        nome: nome,
        email: email,
        usuario: usuario,
        senha: senha
    })
}

if(listaRecuperada) {
    listaDeUsuario = listaRecuperada;
}


form.addEventListener('submit', event => {
    event.preventDefault()
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const avisoEmail = document.getElementById('avisoEmail');
    const avisoUsuario = document.getElementById('avisoUsuario');
    const confereSenha = document.getElementById('avisoSenha');

    const verificaEmail = listaRecuperada.some(function(objeto) {
        return objeto.email === email;
    });
    
    const verificaUsuario = listaRecuperada.some(function(objeto) {
        return objeto.usuario === usuario;
    });
    
    avisoUsuario.textContent = ''

    if(!validarEmail(email)){
        avisoEmail.textContent = 'Email invalido';
        return;
    }

    if(verificaEmail){
        avisoEmail.textContent = 'Email já existente.';
        return;
    }
    
    avisoEmail.textContent = ''
    
    if (verificaUsuario) {
        avisoUsuario.textContent = 'Usuário ja existe.'
        return;
    }
    
    if(senha !== confirmaSenha){
        confereSenha.textContent = 'Senha não é igual';
        return;
    }
    
    criaUsuario(nome, email, usuario, senha);
    
    atualizaLocalStorage();
    
    window.location.href = '../cadastrado/cadastrado.html'
});

document.getElementById('teste').addEventListener('click', () => {
    document.getElementById('confirmaSenha').type = 'text';
});