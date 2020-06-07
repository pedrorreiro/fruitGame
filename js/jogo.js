var nome = window.prompt("Insira seu nome","");
checkCookieNome();

quadLeft = 0;
quadTop = 0;

heightArea = 0;
widthArea = 0;

areaQuad = 0;

segJogo = 0;
//segSpawn = 0;

pontos = 0;

//var tempodeSpawn //setInterval
var tempoJogo

// Cria fruta

var fruta = document.createElement("div");
fruta.id = 'fruta';
fruta.style.background = "red";
fruta.style.position = 'relative';

document.getElementById('area').appendChild(fruta);

// O tamanho da area do jogo é baseado na altura da tela do navegador
// Caso quiser reverter isso, é só comentar os métodos que estão com ( * )
// e alterar o tamanho na função playGame()

function playGame() {

    areaQuad = 10;
    widthArea = 500;
    heightArea = 500;
    pontos = 0;

    document.getElementById('pontos').innerHTML = pontos;

    fruta.style.height = areaQuad + 'px';
    fruta.style.width = areaQuad + 'px';
    fruta.style.display = 'block';

    setAreaSize(heightArea, widthArea);
    setQuadArea(areaQuad);

    fruta.style.left = widthArea/2 + 'px'; // inicializa a fruta no meio da área
    fruta.style.top = heightArea/2 + 'px';

    iniciaContador(50);

}
/*
function capturaTelaSize(){
    heightTela = parseInt(screen.availHeight * 0.7);
    //console.log(screen.availHeight)
    // widthTela = screen.width;
}
*/

function iniciaContador(tempoJogo) {

    segJogo = tempoJogo;
    //segSpawn = tempoSpawn;

    resetaQuadPos(); // posiciona o quadrado

    document.getElementById('seg').innerHTML = segJogo; // imprime contador do jogo na tela
   // document.getElementById('segSpawn').innerHTML = segSpawn; // imprime o contador da fruta na tela

    //tempodeSpawn = setInterval(spawnFruta, segSpawn * 1000) // SPANWANDO FRUTA

    tempoJogo = setInterval(function () { // INICIANDO TIMER DO GAME

        segJogo--;
        //segSpawn--;

       // if (segSpawn == 0) segSpawn = tempoSpawn; // se ele zerar, começa de novo 

        document.getElementById('seg').innerHTML = segJogo; // imprime contador do jogo na tela
        //document.getElementById('segSpawn').innerHTML = segSpawn; // imprime o contador da fruta na tela

        if (segJogo == 0) {
            clearInterval(tempoJogo); // tempo para de contar

            //clearInterval(tempodeSpawn); // para o spawn de fruta 

            //segSpawn = 0;

            //document.getElementById('segSpawn').innerHTML = segSpawn; // imprime o contador da fruta na tela

            fruta.style.display = 'none';
        }

    }, 1000);
}   

function atualizaHtml() {

    var quad = document.getElementById('quadrado');

    quad.style.left = quadLeft + 'px';
    quad.style.top = quadTop + 'px';
    quad.style.right = quadRight + 'px';
    quad.style.bottom = quadBottom + 'px';
}

function resetaQuadPos() {

    quadLeft = 0;
    quadTop = 0;
    quadRight = 0;
    quadBottom = 0;

    atualizaHtml();
}

function setAreaSize(height, width) {
    document.getElementById('area').style.height = height + 'px'
    document.getElementById('area').style.width = width + 'px'

    console.log('height: ' + height + ' width: ' + width)

    widthArea = width;
    heightArea = height;
}

function setQuadArea(area) {
    document.getElementById('quadrado').style.height = area + 'px'
    document.getElementById('quadrado').style.width = area + 'px'

    areaQuad = area;
}

function move(tecla) {

    var quad = document.getElementById('quadrado');

    switch (tecla) {
        case 37: // mover pra esquerda
            if (quadLeft > 0) quadLeft = quadLeft - areaQuad;
            break;
        case 38: //mover pra cima
            if (quadTop > 0) quadTop = quadTop - areaQuad;
            break;
        case 39: // mover para direita
            if (widthArea - quadLeft > areaQuad) quadLeft = quadLeft + areaQuad;
            // se o left do quadrado for menor que o tamanho max do quadrado. 
            // Ex: left é 500 e o quadrado tem 500px, chega no máximo
            break;
        case 40: // mover pra baixo
            if (heightArea - quadTop > areaQuad) quadTop = quadTop + areaQuad;
            break;
    }
    atualizaHtml();

    if (quadLeft + 'px' == fruta.style.left && quadTop - 10 + 'px' == fruta.style.top) { // o menos 10 é bug
        
        console.log('Ponto!')
        
        pontos++;

        document.getElementById('pontos').innerHTML = pontos;

        //clearInterval(tempodeSpawn);

        spawnFruta();

        salvaRecord();

        //document.getElementById('segSpawn').innerHTML = segSpawn; // imprime o contador da fruta na tela

/*
        setInterval(spawnFruta,segSpawn * 1000);


  */      
    }
}

function getEvent(e) {

    var tecla = e.keyCode;
    tecla = parseInt(tecla)

    if (tecla >= 37 && tecla <= 40) move(tecla);
}

function spawnFruta(){

    //document.getElementById('segSpawn').innerHTML = segSpawn; // imprime o contador da fruta na tela

    do {

        var x = Math.floor(Math.random() * heightArea - areaQuad); //valor de 0 até o tamanho da area menos
        var y = Math.floor(Math.random() * heightArea - areaQuad); // o tamanho do quad. 500-10 = top: 490

    } while (x % 10 != 0 || y % 10 != 0);

    if (x < 0) x = x * -1;
    if (y < 0) y = y * -1;


    fruta.style.left = x + 'px';
    fruta.style.top = y + 'px';

    console.log('Fruta X: ' + x + ' Y: ' + y);
}

// --------------------- COOKIES ---------------------

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookieNome() {
    var nome = getCookie("nome");
    if (nome != "") {
        alert("Bem vindo de volta, " + user + '!');
    } else {
        nome = prompt("Não encontramos seu registro, insira o seu nome:", "");
        if (nome != "" && nome != null) {
            setCookie("nome", nome, 365);
        }
    }
}

function checkCookiePontos() {
    var pontos = getCookie("pontos");
    if (pontos == "") {
        setCookie('pontos',pontos,365);
    } 
    
    else if(pontos > parseInt(getCookie("pontos"))) {
        setCookie('pontos',pontos,365);
    }
}


function salvaRecord(){
    checkCookieNome();

    checkCookiePontos()
 
}

function atualizaRecord(){
    document.getElementById('nomeRecord').innerHTML = getCookie('nome');
    document.getElementById('pontosRecord').innerHTML = getCookie('pontos');
}