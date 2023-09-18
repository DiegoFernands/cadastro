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

function validarSenha(senha) {
    const regex = /^.{8,}$/;
    
    if (regex.test(senha)) {
      return true;
    } else {
      return false;
    }
}

function validarNome(nome) {
    if(nome.length < 3){
        return true;
    } else {
        return false;
    }
}

function minimoUsuario(usuario) {
    if(usuario.length <= 4){
        return true;
    } else {
        return false;
    }
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
    const minimoSenha = document.getElementById('minimoSenha');
    const minimoNome = document.getElementById('minimoNome');

    const verificaEmail = listaRecuperada.some(function(objeto) {
        return objeto.email === email;
    });
    
    const verificaUsuario = listaRecuperada.some(function(objeto) {
        return objeto.usuario === usuario;
    });
    
    minimoNome.textContent = '';
    minimoSenha.textContent = '';
    avisoUsuario.textContent = '';

    if(validarNome(nome) === true){
        minimoNome.textContent = 'Nome deve ter no minímo 3 caracteres.'
        return;
    }
    
    if(!validarEmail(email)){
        avisoEmail.textContent = 'Email inválido';
        return;
    }
    
    if(verificaEmail){
        avisoEmail.textContent = 'Email já existe.';
        return;
    }
    
    avisoEmail.textContent = ''
    
    if(minimoUsuario(usuario) === true) {
        avisoUsuario.textContent = 'Usuário deve ter no minímo 5 caracteres.'
    }

    if (verificaUsuario) {
        avisoUsuario.textContent = 'Usuário ja existe.'
        return;
    }
    
    if(validarSenha(senha) === false){
        minimoSenha.textContent = 'A senha deve ter no minímo 8 caracteres'
        return;
    }

    if(senha !== confirmaSenha){
        confereSenha.textContent = 'Senha não confere.';
        return;
    }
    
    criaUsuario(nome, email, usuario, senha);
    
    atualizaLocalStorage();
    
    window.location.href = '../cadastrado/cadastrado.html'
});

document.getElementById('span-senha_cadastro').addEventListener('click', () => {
    document.getElementById('confirmaSenha').type = 'text';
});
