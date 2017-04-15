/*!
 * Socialite v2.0 - Twitter extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // https://dev.twitter.com/docs/tweet-button/
    // https://dev.twitter.com/docs/intents/events/
    // https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial#twitter

    Socialite.setup({
        twitter: {
            lang: 'en'
        }
    });

    Socialite.network('twitter', {
        script: {
            src     : '//platform.twitter.com/widgets.js',
            id      : 'twitter-wjs',
            charset : 'utf-8'
        },
        append: function()
        {
            var notwttr  = (typeof window.twttr !== 'object'),
                settings = Socialite.settings.twitter,
                events   = ['click', 'tweet', 'retweet', 'favorite', 'follow'];
            if (notwttr) {
                window.twttr = (t = { _e: [], ready: function(f) { t._e.push(f); } });
            }
            window.twttr.ready(function(twttr)
            {
                for (var i = 0; i < events.length; i++) {
                    var e = events[i];
                    if (typeof settings['on' + e] === 'function') {
                        twttr.events.bind(e, settings['on' + e]);
                    }
                }
                Socialite.activateAll('twitter');
            });
            return notwttr;
        }
    });

    var twitterInit = function(instance)
    {
        var el = document.createElement('a');
        el.className = instance.widget.name + '-button';
        Socialite.copyDataAttributes(instance.el, el);
        el.setAttribute('href', instance.el.getAttribute('data-default-href'));
        el.setAttribute('data-lang', instance.el.getAttribute('data-lang') || Socialite.settings.twitter.lang);
        instance.el.appendChild(el);
    };

    var twitterActivate = function(instance)
    {
        if (window.twttr && typeof window.twttr.widgets === 'object' && typeof window.twttr.widgets.load === 'function') {
            window.twttr.widgets.load();
        }
    };

    Socialite.widget('twitter', 'share',   { init: twitterInit, activate: twitterActivate });
    Socialite.widget('twitter', 'follow',  { init: twitterInit, activate: twitterActivate });
    Socialite.widget('twitter', 'hashtag', { init: twitterInit, activate: twitterActivate });
    Socialite.widget('twitter', 'mention', { init: twitterInit, activate: twitterActivate });

    Socialite.widget('twitter', 'embed',   {
        process: function(instance)
        {
            instance.innerEl = instance.el;
            if (!instance.innerEl.getAttribute('data-lang')) {
                instance.innerEl.setAttribute('data-lang', Socialite.settings.twitter.lang);
            }
            instance.el = document.createElement('div');
            instance.el.className = instance.innerEl.className;
            instance.innerEl.className = '';
            instance.innerEl.parentNode.insertBefore(instance.el, instance.innerEl);
            instance.el.appendChild(instance.innerEl);
        },
        init: function(instance)
        {
            instance.innerEl.className = 'twitter-tweet';
        },
        activate: twitterActivate
    });

})(window, window.document, window.Socialite);
