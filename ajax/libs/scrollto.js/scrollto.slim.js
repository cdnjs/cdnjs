/**
@Package - Scrollto.js;
@File - scrollto.slim.js;
@Release - Stable / 1.0;
@Developer - Thiago Costa Pereira - contato@tpereira.com.br
@License - GPLv3 - https://www.gnu.org/licenses/gpl-3.0.html
@Github - https://github.com/tpereira-com-br/scrollto.js/blob/master/src/1.0/scrollto.slim.js
*/
(function(){
    var move;
    //Escuta os elementos de clique no documento;
    this.addEventListener("click", function(e) {
        var e = e.target,
        attribute = "scrollto";
        //Verifica se o elemento clicado é um disparador;
        if (e.matches("["+attribute+"]")) {
            //Chama a função de scroll;
            (function(
                target = document.querySelector(e.getAttribute(attribute)),
                duration=1000,
                container = document.querySelector("html"),
                menu = document.querySelector(".menufixedtop"),
                margintop =  menu ?
                menu.getBoundingClientRect().height :
                0,
                moveinterval  = 10,
                movenumber = duration/moveinterval,
                initialdistance = target.offsetTop - container.scrollTop - margintop,
                initialvelocity = (initialdistance)/(movenumber),
                minimumvelocity = 5,
                maximumvelocity = Infinity,
                velocity = Math.abs(initialvelocity)<minimumvelocity ?
                minimumvelocity * Math.sign(initialvelocity) :
                Math.abs(initialvelocity)>maximumvelocity ?
                maximumvelocity * Math.sign(initialvelocity) :
                initialvelocity,
                ){
                    //Finaliza scrolls anteriores caso existam.
                    clearInterval(move);           
                    //Inicia o movimento a cada "moveinterval"ms.
                    move = setInterval(function(
                        currentdistance = target.offsetTop - container.scrollTop - margintop,
                        currentscrolltop = container.scrollTop,
                        ){
                        container.scrollTop = initialdistance*currentdistance<=0 ?
                        target.offsetTop - margintop:
                        container.scrollTop + velocity;
                        move = container.scrollTop == Math.round(target.offsetTop - margintop) || 
                        currentscrolltop == container.scrollTop ?
                        clearInterval(move) :
                        move;    
                    },moveinterval);  
                }
            )()
        }
    })
})();
