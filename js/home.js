// Login adm

var user = 'pedrorreiro';
var senha = 'asdjkl'

var options = document.getElementsByName('userType');

function esconde(){
    
    //document.getElementById('campos').style.display = 'none';

    document.getElementsByName('form')[0].style.display = 'none';

}

function exibe(){
    document.getElementsByName('form')[0].style.display = 'block';
    //document.getElementById('campos').style.display = 'block'; // exibe campo de dados
    document.getElementById('erroDados').style.display = 'none'; // esconde msg de erro caso estiver visivel

}

function verificaLogin(){
    var auxLogin = document.getElementById('usuario');
    var auxSenha = document.getElementById('pass');

    if((auxLogin.value == user) && (auxSenha.value == senha)){
        window.location.replace('jogo.html')
    }

    else{
        document.getElementById('erroDados').style.display = 'block' // aparece erro
    }
}

function entrar(){
    if(options[0].checked == true){
        window.location.replace('jogo.html')
    }

    else{
        verificaLogin();
    }
}