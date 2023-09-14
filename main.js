document.getElementById('loginForm').addEventListener('submit', evento => {
    evento.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('password').value;
    const lista = JSON.parse(localStorage.getItem('listaDeUsuario'));
    const avisoUsuario =  document.getElementById('avisoUsuario');

    function login(usuario, senha){
        const usuarioEncontrado = lista.find(u => u.usuario === usuario && u.senha === senha);
        if(usuarioEncontrado){
            window.location.href = './logado/index.html'
        }else {
            avisoUsuario.textContent = 'Usuário inválido ou senha inválida.'
        }
    }
    login(usuario, senha);

});

document.querySelector('span').addEventListener('click', () => {
    document.getElementById('password').type = 'text';
});

