/*!
 * Socialite v2.0
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
window.Socialite = (function(window, document, undefined)
{
    'use strict';

    var uid       = 0,
        instances = [ ],
        networks  = { },
        widgets   = { },
        rstate    = /^($|loaded|complete)/,
        euc       = window.encodeURIComponent;

    var socialite = {

        settings: { },

        trim: function(str)
        {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
        },

        hasClass: function(el, cn)
        {
            return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
        },

        addClass: function(el, cn)
        {
            if (!socialite.hasClass(el, cn)) {
                el.className = (el.className === '') ? cn : el.className + ' ' + cn;
            }
        },

        removeClass: function(el, cn)
        {
            el.className = socialite.trim(' ' + el.className + ' '.replace(' ' + cn + ' ', ' '));
        },

        /**
         * Copy properties of one object to another
         */
        extendObject: function(to, from, overwrite)
        {
            for (var prop in from) {
                var hasProp = to[prop] !== undefined;
                if (hasProp && typeof from[prop] === 'object') {
                    socialite.extendObject(to[prop], from[prop], overwrite);
                } else if (overwrite || !hasProp) {
                    to[prop] = from[prop];
                }
            }
        },

        /**
         * Return elements with a specific class
         *
         * @param context - containing element to search within
         * @param cn      - class name to search for
         *
         */
        getElements: function(context, cn)
        {
            // copy to a new array to avoid a live NodeList
            var i   = 0,
                el  = [ ],
                gcn = !!context.getElementsByClassName,
                all = gcn ? context.getElementsByClassName(cn) : context.getElementsByTagName('*');
            for (; i < all.length; i++) {
                if (gcn || socialite.hasClass(all[i], cn)) {
                    el.push(all[i]);
                }
            }
            return el;
        },

        /**
         * Return data-* attributes of element as a query string (or object)
         *
         * @param el       - the element
         * @param noprefix - (optional) if true, remove "data-" from attribute names
         * @param nostr    - (optional) if true, return attributes in an object
         *
         */
        getDataAttributes: function(el, noprefix, nostr)
        {
            var i    = 0,
                str  = '',
                obj  = { },
                attr = el.attributes;
            for (; i < attr.length; i++) {
                var key = attr[i].name,
                    val = attr[i].value;
                if (val.length && key.indexOf('data-') === 0) {
                    if (noprefix) {
                        key = key.substring(5);
                    }
                    if (nostr) {
                        obj[key] = val;
                    } else {
                        str += euc(key) + '=' + euc(val) + '&';
                    }
                }
            }
            return nostr ? obj : str;
        },

        /**
         * Copy data-* attributes from one element to another
         *
         * @param from     - element to copy from
         * @param to       - element to copy to
         * @param noprefix - (optional) if true, remove "data-" from attribute names
         * @param nohyphen - (optional) if true, convert hyphens to underscores in the attribute names
         *
         */
        copyDataAttributes: function(from, to, noprefix, nohyphen)
        {
            // `nohyphen` was needed for Facebook's <fb:like> elements - remove as no longer used?
            var attr = socialite.getDataAttributes(from, noprefix, true);
            for (var i in attr) {
                to.setAttribute(nohyphen ? i.replace(/-/g, '_') : i, attr[i]);
            }
        },

        /**
         * Create iframe element
         *
         * @param src      - iframe URL (src attribute)
         * @param instance - (optional) socialite instance to activate on iframe load
         *
         */
        createIframe: function(src, instance)
        {
            // Socialite v2 has slashed the amount of manual iframe creation, we should aim to avoid this entirely
            var iframe = document.createElement('iframe');
            iframe.style.cssText = 'overflow: hidden; border: none;';
            socialite.extendObject(iframe, { src: src, allowtransparency: 'true', frameborder: '0', scrolling: 'no' }, true);
            if (instance) {
                iframe.onload = iframe.onreadystatechange = function ()
                {
                    if (rstate.test(iframe.readyState || '')) {
                        iframe.onload = iframe.onreadystatechange = null;
                        socialite.activateInstance(instance);
                    }
                };
            }
            return iframe;
        },

        /**
         * Returns true if network script has loaded
         */
        networkReady: function(name)
        {
            return networks[name] ? networks[name].loaded : undefined;
        },

        /**
         * Append network script to the document
         */
        appendNetwork: function(network)
        {
            // the activation process is getting a little confusing for some networks
            // it would appear a script load event does not mean its global object exists yet
            // therefore the first call to `activateAll` may have no effect whereas the second call does, e.g. via `window.twttr.ready`

            if (!network || network.appended) {
                return;
            }
            // `network.append` and `network.onload` can cancel progress
            if (typeof network.append === 'function' && network.append(network) === false) {
                network.appended = network.loaded = true;
                socialite.activateAll(network);
                return;
            }

            if (network.script) {
                network.el = document.createElement('script');
                socialite.extendObject(network.el, network.script, true);
                network.el.async = true;
                network.el.onload = network.el.onreadystatechange = function()
                {
                    if (rstate.test(network.el.readyState || '')) {
                        network.el.onload = network.el.onreadystatechange = null;
                        network.loaded = true;
                        if (typeof network.onload === 'function' && network.onload(network) === false) {
                            return;
                        }
                        socialite.activateAll(network);
                    }
                };
                document.body.appendChild(network.el);
            }
            network.appended = true;
        },

        /**
         * Remove network script from the document
         */
        removeNetwork: function(network)
        {
            if (!socialite.networkReady(network.name)) {
                return false;
            }
            if (network.el.parentNode) {
                network.el.parentNode.removeChild(network.el);
            }
            return !(network.appended = network.loaded = false);
        },

        /**
         * Remove and re-append network script to the document
         */
        reloadNetwork: function(name)
        {
            // This is a last-ditch effort for half-baked scripts
            var network = networks[name];
            if (network && socialite.removeNetwork(network)) {
                socialite.appendNetwork(network);
            }
        },

        /**
         * Create new Socialite instance
         *
         * @param el     - parent element that will hold the new instance
         * @param widget - widget the instance belongs to
         *
         */
        createInstance: function(el, widget)
        {
            var proceed  = true,
                instance = {
                    el      : el,
                    uid     : uid++,
                    widget  : widget
                };
            instances.push(instance);
            if (widget.process !== undefined) {
                proceed = (typeof widget.process === 'function') ? widget.process(instance) : false;
            }
            if (proceed) {
                socialite.processInstance(instance);
            }
            instance.el.setAttribute('data-socialite', instance.uid);
            instance.el.className = 'socialite ' + widget.name + ' socialite-instance';
            return instance;
        },

        /**
         * Process a socialite instance to an intermediate state prior to load
         */
        processInstance: function(instance)
        {
            var el = instance.el;
            instance.el = document.createElement('div');
            instance.el.className = el.className;
            socialite.copyDataAttributes(el, instance.el);
            // stop over-zealous scripts from activating all instances
            if (el.nodeName.toLowerCase() === 'a' && !el.getAttribute('data-default-href')) {
                instance.el.setAttribute('data-default-href', el.getAttribute('href'));
            }
            var parent = el.parentNode;
            parent.insertBefore(instance.el, el);
            parent.removeChild(el);
        },

        /**
         * Activate a socialite instance
         */
        activateInstance: function(instance)
        {
            if (instance && !instance.loaded) {
                instance.loaded = true;
                if (typeof instance.widget.activate === 'function') {
                    instance.widget.activate(instance);
                }
                socialite.addClass(instance.el, 'socialite-loaded');
                return instance.onload ? instance.onload(instance.el) : null;
            }
        },

        /**
         * Activate all socialite instances belonging to a network
         */
        activateAll: function(network)
        {
            if (typeof network === 'string') {
                network = networks[network];
            }
            for (var i = 0; i < instances.length; i++) {
                var instance = instances[i];
                if (instance.init && instance.widget.network === network) {
                    socialite.activateInstance(instance);
                }
            }
        },

        /**
         * Load socialite instances
         *
         * @param context - (optional) containing element to search within
         * @param el      - (optional) individual or an array of elements to load
         * @param w       - (optional) widget name
         * @param onload  - (optional) function to call after each socialite instance has loaded
         * @param process - (optional) process but don't load network (if true)
         *
         */
        load: function(context, el, w, onload, process)
        {
            // use document as context if unspecified
            context = (context && typeof context === 'object' && context.nodeType === 1) ? context : document;

            // if no elements search within the context and recurse
            if (!el || typeof el !== 'object') {
                socialite.load(context, socialite.getElements(context, 'socialite'), w, onload, process);
                return;
            }

            var i;

            // if array of elements load each one individually
            if (/Array/.test(Object.prototype.toString.call(el))) {
                for (i = 0; i < el.length; i++) {
                    socialite.load(context, el[i], w, onload, process);
                }
                return;
            }

            // nothing was found...
            if (el.nodeType !== 1) {
                return;
            }

            // if widget name not specified search within the element classes
            if (!w || !widgets[w]) {
                w = null;
                var classes = el.className.split(' ');
                for (i = 0; i < classes.length; i++) {
                    if (widgets[classes[i]]) {
                        w = classes[i];
                        break;
                    }
                }
                if (!w) {
                    return;
                }
            }

            // find or create the Socialite instance
            var instance,
                widget = widgets[w],
                sid    = parseInt(el.getAttribute('data-socialite'), 10);
            if (!isNaN(sid)) {
                for (i = 0; i < instances.length; i++) {
                    if (instances[i].uid === sid) {
                        instance = instances[i];
                        break;
                    }
                }
            } else {
                instance = socialite.createInstance(el, widget);
            }

            // return if just processing (or no instance found)
            if (process || !instance) {
                return;
            }

            // initialise the instance
            if (!instance.init) {
                instance.init = true;
                instance.onload = (typeof onload === 'function') ? onload : null;
                widget.init(instance);
            }

            // append the parent network (all instances will be activated onload)
            // or activate immediately if network has already loaded
            if (!widget.network.appended) {
                socialite.appendNetwork(widget.network);
            } else {
                if (socialite.networkReady(widget.network.name)) {
                    socialite.activateInstance(instance);
                }
            }
        },

        /**
         * Load a single element
         *
         * @param el     - an individual element
         * @param w      - (optional) widget for this socialite instance
         * @param onload - (optional) function to call once each instance has loaded
         *
         */
        activate: function(el, w, onload)
        {
            // skip the first few steps
            window.Socialite.load(null, el, w, onload);
        },

        /**
         * Process elements to an intermediate state prior to load
         *
         * @param context - containing element to search within
         * @param el      - (optional) individual or an array of elements to load
         * @param w       - (optional) widget name
         *
         */
        process: function(context, el, w)
        {
            // stop before widget initialises instance
            window.Socialite.load(context, el, w, null, true);
        },

        /**
         * Add a new social network
         *
         * @param name   - unique name for network
         * @param params - additional data and callbacks
         *
         */
        network: function(n, params)
        {
            networks[n] = {
                name     : n,
                el       : null,
                appended : false,
                loaded   : false,
                widgets  : { }
            };
            if (params) {
                socialite.extendObject(networks[n], params);
            }
        },

        /**
         * Add a new social widget
         *
         * @param name   - name of owner network
         * @param w      - unique name for widget
         * @param params - additional data and callbacks
         *
         */
        widget: function(n, w, params)
        {
            params.name = n + '-' + w;
            if (!networks[n] || widgets[params.name]) {
                return;
            }
            params.network = networks[n];
            networks[n].widgets[w] = widgets[params.name] = params;
        },

        /**
         * Change the default Socialite settings for each network
         */
        setup: function(params)
        {
            socialite.extendObject(socialite.settings, params, true);
        }

    };

    return socialite;

})(window, window.document);

/**
 * Socialite Extensions - Pick 'n' Mix!
 */
(function(window, document, Socialite, undefined)
{

    // default to the Queen's English
    Socialite.setup({
        facebook: {
            lang: 'en_GB',
            appId: null
        },
        twitter: {
            lang: 'en'
        },
        googleplus: {
            lang: 'en-GB'
        }
    });


    // Facebook
    // http://developers.facebook.com/docs/reference/plugins/like/
    // http://developers.facebook.com/docs/reference/javascript/FB.init/

    Socialite.network('facebook', {
        script: {
            src : '//connect.facebook.net/{{language}}/all.js',
            id  : 'facebook-jssdk'
        },
        append: function(network)
        {
            var fb       = document.createElement('div'),
                settings = Socialite.settings.facebook,
                events   = { onlike: 'edge.create', onunlike: 'edge.remove', onsend: 'message.send' };
            fb.id = 'fb-root';
            document.body.appendChild(fb);
            network.script.src = network.script.src.replace('{{language}}', settings.lang);
            window.fbAsyncInit = function() {
                window.FB.init({
                      appId: settings.appId,
                      xfbml: true
                });
                for (var e in events) {
                    if (typeof settings[e] === 'function') {
                        window.FB.Event.subscribe(events[e], settings[e]);
                    }
                }
            };
        }
    });

    Socialite.widget('facebook', 'like', {
        init: function(instance)
        {
            var el = document.createElement('div');
            el.className = 'fb-like';
            Socialite.copyDataAttributes(instance.el, el);
            instance.el.appendChild(el);
            if (window.FB && window.FB.XFBML) {
                window.FB.XFBML.parse(instance.el);
            }
        }
    });


    // Twitter
    // https://dev.twitter.com/docs/tweet-button/
    // https://dev.twitter.com/docs/intents/events/
    // https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial#twitter

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

    Socialite.widget('twitter', 'embed', {
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


    // Google+
    // https://developers.google.com/+/plugins/+1button/
    // Google does not support IE7

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


    // LinkedIn
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

/**
 * Execute any queued functions (don't enqueue before the document has loaded!)
 */
(function() {
    var s = window._socialite;
    if (/Array/.test(Object.prototype.toString.call(s))) {
        for (var i = 0, len = s.length; i < len; i++) {
            if (typeof s[i] === 'function') {
                s[i]();
            }
        }
    }
})();
