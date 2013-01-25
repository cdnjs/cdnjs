/*!
 * Socialite v2.0 - GooglePlus extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // https://developers.google.com/+/plugins/+1button/
    // Google does not support IE7

    Socialite.setup({
        googleplus: {
            lang: 'en-GB'
        }
    });

    Socialite.network('googleplus', {
        script: {
            src: '//apis.google.com/js/plusone.js'
        },
        append: function(network)
        {
            if (window.gapi) {
                return false;
            }
            window.___gcfg = {
                lang: Socialite.settings.googleplus.lang,
                parsetags: 'explicit'
            };
        }
    });

    var googleplusInit = function(instance)
    {
        var el = document.createElement('div');
        el.className = 'g-' + instance.widget.gtype;
        Socialite.copyDataAttributes(instance.el, el);
        instance.el.appendChild(el);
        instance.gplusEl = el;
    };

    var googleplusEvent = function(instance, callback) {
        return (typeof callback !== 'function') ? null : function(data) {
            callback(instance.el, data);
        };
    };

    var googleplusActivate = function(instance)
    {
        var type = instance.widget.gtype;
        if (window.gapi && window.gapi[type]) {
            var settings = Socialite.settings.googleplus,
                params   = Socialite.getDataAttributes(instance.el, true, true),
                events   = ['onstartinteraction', 'onendinteraction', 'callback'];
            for (var i = 0; i < events.length; i++) {
                params[events[i]] = googleplusEvent(instance, settings[events[i]]);
            }
            window.gapi[type].render(instance.gplusEl, params);
        }
    };

    Socialite.widget('googleplus', 'one',   { init: googleplusInit, activate: googleplusActivate, gtype: 'plusone' });
    Socialite.widget('googleplus', 'share', { init: googleplusInit, activate: googleplusActivate, gtype: 'plus' });
    Socialite.widget('googleplus', 'badge', { init: googleplusInit, activate: googleplusActivate, gtype: 'plus' });

})(window, window.document, window.Socialite);
