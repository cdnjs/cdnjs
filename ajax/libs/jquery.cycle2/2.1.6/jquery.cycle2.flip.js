/*! css3 flip transition plugin for Cycle2;  version: 20140128 */
/*! originally written by Laubeee (https://github.com/Laubeee) */
(function($) {
"use strict";

var backface,
    style = document.createElement('div').style,
    tx = $.fn.cycle.transitions,
    supported = style.transform !== undefined ||
        style.MozTransform !== undefined ||
        style.webkitTransform !== undefined ||
        style.oTransform !== undefined ||
        style.msTransform !== undefined;

if ( supported && style.msTransform !== undefined ) {
    style.msTransform = 'rotateY(0deg)';
    if ( ! style.msTransform )
        supported = false;
}

if ( supported ) {
    tx.flipHorz = getTransition( getRotate('Y') );
    tx.flipVert = getTransition( getRotate('X') );
    backface = {
        '-webkit-backface-visibility': 'hidden',
        '-moz-backface-visibility': 'hidden',
        '-o-backface-visibility': 'hidden',
        'backface-visibility': 'hidden'
    };
}
else {
    // fallback to scroll tx for browsers that don't support transforms
    tx.flipHorz = tx.scrollHorz;
    tx.flipVert = tx.scrollVert || tx.scrollHorz;
}

    
function getTransition( rotateFn ) {
    // return C2 transition object
    return {
        preInit: function( opts ) {
            opts.slides.css( backface );
        },
        transition: function( slideOpts, currEl, nextEl, fwd, callback ) {
            var opts = slideOpts,
                curr = $(currEl), 
                next = $(nextEl),
                speed = opts.speed / 2;

            // css before transition start
            rotateFn.call(next, -90);
            next.css({
                'display': 'block',
                'visibility': 'visible',
                'background-position': '-90px',
                'opacity': 1
            });

            curr.css('background-position', '0px');

            curr.animate({ backgroundPosition: 90 }, {
                step: rotateFn,
                duration: speed,
                easing: opts.easeOut || opts.easing,
                complete: function() {
                    slideOpts.API.updateView( false, true );
                    next.animate({ backgroundPosition: 0 }, {
                        step: rotateFn,
                        duration: speed,
                        easing: opts.easeIn || opts.easing,
                        complete: callback
                    });
                }
            });
        }
    };
}

function getRotate( dir ) {
    return function( degrees ) {
        /*jshint validthis:true */
        var el = $(this);
        el.css({
            '-webkit-transform': 'rotate'+dir+'('+degrees+'deg)',
            '-moz-transform': 'rotate'+dir+'('+degrees+'deg)', 
            '-ms-transform': 'rotate'+dir+'('+degrees+'deg)',
            '-o-transform': 'rotate'+dir+'('+degrees+'deg)',
            'transform': 'rotate'+dir+'('+degrees+'deg)'
        });
    };
}

})(jQuery);
