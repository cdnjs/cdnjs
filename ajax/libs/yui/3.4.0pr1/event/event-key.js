YUI.add('event-key', function(Y) {

/**
 * Functionality to listen for one or more specific key combinations.
 * @module event
 * @submodule event-key
 */

var ALT      = "+alt",
    CTRL     = "+ctrl",
    META     = "+meta",
    SHIFT    = "+shift",

    isString = Y.Lang.isString,
    trim     = Y.Lang.trim,

    eventDef = {
        KEY_MAP: {
            enter    : 13,
            esc      : 27,
            backspace: 8,
            tab      : 9,
            pageup   : 33,
            pagedown : 34
        },

        _typeRE: /^(up|down|press):/,

        processArgs: function (args) {
            var spec = args.splice(3,1)[0],
                mods = Y.Array.hash(spec.match(/\+(?:alt|ctrl|meta|shift)\b/g) || []),
                config = {
                    type: this._typeRE.test(spec) ? RegExp.$1 : null,
                    keys: null
                },
                bits = spec
                        .replace(/^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g, '')
                        .split(/,/),
                chr, uc, lc, i;

            spec = spec.replace(this._typeRE, '');

            if (bits.length) {
                config.keys = {};

                // FIXME: need to support '65,esc' => keypress, keydown
                for (i = bits.length - 1; i >= 0; --i) {
                    chr = trim(bits[i]);

                    // non-numerics are single characters or key names
                    if (+chr == chr) {
                        config.keys[chr] = mods;
                    } else {
                        lc = chr.toLowerCase();

                        if (this.KEY_MAP[lc]) {
                            config.keys[this.KEY_MAP[lc]] = mods;
                            // FIXME: '65,enter' defaults to keydown for both
                            if (!config.type) {
                                config.type = "down"; // safest
                            }
                        } else {
                            uc = chr.charAt(0).toUpperCase();
                            lc = lc.charAt(0);

                            // FIXME: possibly stupid assumption that
                            // the keycode of the lower case == the
                            // charcode of the upper case
                            // a (key:65,char:97), A (key:65,char:65)
                            config.keys[uc.charCodeAt(0)] =
                                (lc !== uc && chr === uc) ?
                                    // upper case chars get +shift free
                                    Y.merge(mods, { "+shift": true }) :
                                    mods;
                        }
                    }
                }
            }

            if (!config.type) {
                config.type = "press";
            }

            return config;
        },

        on: function (node, sub, notifier, filter) {
            var spec   = sub._extra,
                type   = "key" + spec.type,
                keys   = spec.keys,
                method = (filter) ? "delegate" : "on";

            if (keys) {
                sub._detach = node[method](type, function (e) {
                    var key = keys[e.keyCode];

                    if (key &&
                        (!key[ALT]   || (key[ALT]   && e.altKey)) &&
                        (!key[CTRL]  || (key[CTRL]  && e.ctrlKey)) &&
                        (!key[META]  || (key[META]  && e.metaKey)) &&
                        (!key[SHIFT] || (key[SHIFT] && e.shiftKey)))
                    {
                        notifier.fire(e);
                    }
                }, filter);
            } else {
                // Pass through to a plain old key(up|down|press)
                // Note: this is horribly inefficient, but I can't abort this
                // subscription for a simple Y.on('keypress', ...);
                sub._detach = node[method](type,
                    Y.bind(notifier.fire, notifier),
                    filter);
            }
        },

        detach: function (node, sub, notifier) {
            sub._detach.detach();
        }
    };

eventDef.delegate = eventDef.on;
eventDef.detachDelegate = eventDef.detach;

/**
 * <p>Add a key listener.  The listener will only be notified if the
 * keystroke detected meets the supplied specification.  The
 * specification is a string that is defined as:</p>
 * 
 * <dl>
 *   <dt>spec</dt>
 *   <dd><code>[{type}:]{code}[,{code}]*</dd>
 *   <dt>type</dt>
 *   <dd><code>"down", "up", or "press"</code></dd>
 *   <dt>code</dt>
 *   <dd><code>{keyCode|character|keyName}[+{modifier}]*</code></dd>
 *   <dt>modifier</dt>
 *   <dd><code>"shift", "ctrl", "alt", or "meta"</code></dd>
 *   <dt>keyName</dt>
 *   <dd><code>"enter", "backspace", "esc", "tab", "pageup", or "pagedown"</code></dd>
 * </dl>
 *
 * <p>Examples:</p>
 * <ul>
 *   <li><code>Y.on("key", callback, "press:12,65+shift+ctrl", "#my-input");</code></li>
 *   <li><code>Y.delegate("key", preventSubmit, "enter", "#forms", "input[type=text]");</code></li>
 *   <li><code>Y.one("doc").on("key", viNav, "j,k,l,;");</code></li>
 * </ul>
 *   
 * @event key
 * @for YUI
 * @param type {string} 'key'
 * @param fn {function} the function to execute
 * @param id {string|HTMLElement|collection} the element(s) to bind
 * @param spec {string} the keyCode and modifier specification
 * @param o optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {Event.Handle} the detach handle
 */
Y.Event.define('key', eventDef, true);


}, '@VERSION@' ,{requires:['event-synthetic']});
