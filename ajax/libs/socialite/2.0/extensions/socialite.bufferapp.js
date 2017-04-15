/*!
 * Socialite v2.0 - Bufferapp extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // http://bufferapp.com/extras/button

    Socialite.network('bufferapp', {
        script: {
            src: '//static.bufferapp.com/js/button.js'
        }
    });

    Socialite.widget('bufferapp', 'button', {
        reappend: null,
        init: function(instance)
        {
            var el = document.createElement('a');
            el.className = 'buffer-add-button';
            Socialite.copyDataAttributes(instance.el, el);
            el.setAttribute('href', instance.el.getAttribute('data-default-href'));
            instance.el.appendChild(el);
        },
        activate: function(instance)
        {
            var w = instance.widget,
                n = w.network.name;
            if (Socialite.networkReady(n)) {
                if (w.reappend) {
                    clearTimeout(w.reappend);
                }
                w.reappend = setTimeout(function() {
                    Socialite.reloadNetwork(n);
                }, 50);
            }
        }
    });

})(window, window.document, window.Socialite);
