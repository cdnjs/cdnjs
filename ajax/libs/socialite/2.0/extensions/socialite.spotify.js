/*!
 * Socialite v2.0 - Spotify extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // https://developer.spotify.com/technologies/spotify-play-button/

    Socialite.network('spotify');

    Socialite.widget('spotify', 'play', {
        process: null,
        init: function(instance)
        {
            Socialite.processInstance(instance);
            var src    = 'https://embed.spotify.com/?',
                width  = parseInt(instance.el.getAttribute('data-width'), 10),
                height = parseInt(instance.el.getAttribute('data-height'), 10);
            src += 'uri=' + (instance.el.getAttribute('data-default-href') || instance.el.getAttribute('data-href')) + '&';
            instance.el.setAttribute('data-href', '');
            instance.el.setAttribute('data-default-href', '');
            instance.el.setAttribute('data-socialite', '');
            src += Socialite.getDataAttributes(instance.el, true);
            var iframe = Socialite.createIframe(src, instance);
            iframe.style.width = (isNaN(width) ? 300 : width) + 'px';
            iframe.style.height = (isNaN(height) ? 380 : height) + 'px';
            instance.el.appendChild(iframe);
            Socialite.activateInstance(instance);
        }
    });

})(window, window.document, window.Socialite);
