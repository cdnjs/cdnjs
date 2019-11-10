window.addEventListener("load", function() {
    var addEventListener = 'addEventListener';
    var clientX = 'clientX';
    var clientY = 'clientY';
    var elems = document.getElementsByClassName('dragscroll');
    for (var i = 0; i < elems.length; i++) {
        (function(elem, lastClientX, lastClientY, pushed) {
            elem[addEventListener]('mousedown', function(e) {
                pushed = true;
                lastClientX = e[clientX];
                lastClientY = e[clientY];

                e.preventDefault();
                e.stopPropagation();
            }, false);
            
            window[addEventListener]('mousemove', function(e) {
                if (pushed) {
                    elem.scrollLeft -= (e[clientX] - lastClientX);
                    elem.scrollTop -= (e[clientY] - lastClientY);

                    lastClientX = e[clientX];
                    lastClientY = e[clientY];
                }
            }, false);
             
            window[addEventListener]('mouseup', function(){
                pushed = false;
            }, false);

         })(elems[i]);
    }
}, false);

