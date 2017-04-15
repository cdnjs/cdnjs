/*!
 * Socialite v2.0 - LinkedIn extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // http://developer.linkedin.com/plugins/share-button/

    Socialite.network('linkedin', {
        script: {
            src: '//platform.linkedin.com/in.js'
        }
    });

    var linkedinInit = function(instance)
    {
        var el = document.createElement('script');
        el.type = 'IN/' + instance.widget.intype;
        Socialite.copyDataAttributes(instance.el, el);
        instance.el.appendChild(el);
        if (typeof window.IN === 'object' && typeof window.IN.parse === 'function') {
            window.IN.parse(instance.el);
            Socialite.activateInstance(instance);
        }
    };

    Socialite.widget('linkedin', 'share',     { init: linkedinInit, intype: 'Share' });
    Socialite.widget('linkedin', 'recommend', { init: linkedinInit, intype: 'RecommendProduct' });

})(window, window.document, window.Socialite);
