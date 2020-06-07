quadLeft = 0;
quadTop = 0;
quadRight = 0;
quadBottom = 0;

heightArea = 0;
widthArea = 0;

areaQuad = 0

heightTela = 0;
widthTela = 0;

// O tamanho da area do jogo é baseado na altura da tela do navegador
// Caso quiser reverter isso, é só comentar os métodos que estão com ( * )
// e alterar o tamanho na função playGame()

function playGame(){
    capturaTelaSize();
    
    areaQuad = heightTela/40;
    widthTela = heightTela;

    setAreaSize(heightTela,heightTela);
    setQuadArea(areaQuad);
    resetaQuadPos();
}

function capturaTelaSize(){
    heightTela = parseInt(screen.availHeight * 0.7);
    //console.log(screen.availHeight)
    // widthTela = screen.width;
}

function atualizaHtml(){

    var quad = document.getElementById('quadrado');

    quad.style.left = quadLeft + 'px';
    quad.style.top = quadTop + 'px';
    quad.style.right = quadRight + 'px';
    quad.style.bottom = quadBottom + 'px';
}

function resetaQuadPos(){
    
    quadLeft = 0;
    quadTop = 0;
    quadRight = 0;
    quadBottom = 0;

    atualizaHtml();
}

function setAreaSize(height,width){
    document.getElementById('area').style.height = height + 'px'
    document.getElementById('area').style.width = width + 'px'

    widthArea = width;
    heightArea = height;
}

function setQuadArea(area){
    document.getElementById('quadrado').style.height = area + 'px'
    document.getElementById('quadrado').style.width = area + 'px'

    areaQuad = area;
}

function move(tecla){

    var quad = document.getElementById('quadrado');

    switch(tecla){
        case 37: // mover pra esquerda
            if(quadLeft > 0) quadLeft = quadLeft - areaQuad;
            break;
        case 38: //mover pra cima
            if(quadTop > 0) quadTop = quadTop - areaQuad;
            break;
        case 39: // mover para direita
        if(quadLeft+areaQuad < widthArea - areaQuad) quadLeft = quadLeft + areaQuad;
            // se o left do quadrado for menor que o tamanho max do quadrado. 
            // Ex: left é 500 e o quadrado tem 500px, chega no máximo
            break;
        case 40: // mover pra baixo
            if(quadTop+areaQuad < heightArea - areaQuad) quadTop = quadTop + areaQuad;
            break;
    }
    atualizaHtml();
}

function getEvent(e){
    
    var tecla = e.keyCode;
    tecla = parseInt(tecla)
    
    if(tecla >= 37 && tecla <= 40 ) move(tecla);
}