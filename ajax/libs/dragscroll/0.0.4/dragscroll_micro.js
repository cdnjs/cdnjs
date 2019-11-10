/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.4 micro
 * 
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


window.addEventListener("load", function() {
    var addEventListener = 'addEventListener';
    var elems = document.getElementsByClassName('dragscroll');
    for (var i = 0; i < elems.length;) {
        (function(elem, lastClientX, lastClientY, pushed) {
            elem[addEventListener]('mousedown', function(e) {
                pushed = 1;
                lastClientX = e.clientX;
                lastClientY = e.clientY;

                e.preventDefault();
                e.stopPropagation();
            }, 0);
            
            window[addEventListener]('mousemove', function(e) {
                if (pushed) {
                    elem.scrollLeft -=
                        (- lastClientX + (lastClientX=e.clientX));
                    elem.scrollTop -=
                        (- lastClientY + (lastClientY=e.clientY));
                }
            }, 0);
             
            window[addEventListener]('mouseup', function(){
                pushed = 0;
            }, 0);

         })(elems[i++]);
    }
}, 0);

