YUI.add('history-base', function(Y) {

/**
 * Provides browser history management functionality using a simple
 * add/replace/get paradigm. This can be used to ensure that the browser's back
 * and forward buttons work as the user expects and to provide bookmarkable URLs
 * that return the user to the current application state, even in an Ajax
 * application that doesn't perform full-page refreshes.
 *
 * @module history
 * @since 3.2.0
 */

/**
 * Provides global state management backed by an object, but with no browser
 * history integration. For actual browser history integration and back/forward
 * support, use the history-html5 or history-hash modules.
 *
 * @module history
 * @submodule history-base
 * @class HistoryBase
 * @uses EventTarget
 * @constructor
 * @param {Object} config (optional) configuration object, which may contain
 *   zero or more of the following properties:
 *
 * <dl>
 *   <dt>initialState (Object)</dt>
 *   <dd>
 *     Initial state to set, as an object hash of key/value pairs. This will be
 *     merged into the current global state.
 *   </dd>
 * </dl>
 */

var Lang      = Y.Lang,
    Obj       = Y.Object,
    GlobalEnv = YUI.namespace('Env.History'),
    YArray    = Y.Array,

    doc       = Y.config.doc,
    docMode   = doc.documentMode,
    win       = Y.config.win,

    DEFAULT_OPTIONS = {merge: true},
    EVT_CHANGE      = 'change',
    SRC_ADD         = 'add',
    SRC_REPLACE     = 'replace';

function HistoryBase() {
    this._init.apply(this, arguments);
}

Y.augment(HistoryBase, Y.EventTarget, null, null, {
    emitFacade : true,
    prefix     : 'history',
    preventable: false,
    queueable  : true
});

if (!GlobalEnv._state) {
    GlobalEnv._state = {};
}

// -- Private Methods ----------------------------------------------------------

/**
 * Returns <code>true</code> if <i>value</i> is a simple object and not a
 * function or an array.
 *
 * @method _isSimpleObject
 * @param {mixed} value
 * @return {Boolean}
 * @private
 */
function _isSimpleObject(value) {
    return Lang.type(value) === 'object';
}

// -- Public Static Properties -------------------------------------------------

/**
 * Name of this component.
 *
 * @property NAME
 * @type String
 * @static
 */
HistoryBase.NAME = 'historyBase';

/**
 * Constant used to identify state changes originating from the
 * <code>add()</code> method.
 *
 * @property SRC_ADD
 * @type String
 * @static
 * @final
 */
HistoryBase.SRC_ADD = SRC_ADD;

/**
 * Constant used to identify state changes originating from the
 * <code>replace()</code> method.
 *
 * @property SRC_REPLACE
 * @type String
 * @static
 * @final
 */
HistoryBase.SRC_REPLACE = SRC_REPLACE;

/**
 * Whether or not this browser supports the HTML5 History API.
 *
 * @property html5
 * @type Boolean
 * @static
 */

// All HTML5-capable browsers except Gecko 2+ (Firefox 4+) correctly return
// true for 'onpopstate' in win. In order to support Gecko 2, we fall back to a
// UA sniff for now. (current as of Firefox 4.0b2)
HistoryBase.html5 = !!(win.history && win.history.pushState &&
        win.history.replaceState && ('onpopstate' in win || Y.UA.gecko >= 2));

/**
 * Whether or not this browser supports the <code>window.onhashchange</code>
 * event natively. Note that even if this is <code>true</code>, you may
 * still want to use HistoryHash's synthetic <code>hashchange</code> event
 * since it normalizes implementation differences and fixes spec violations
 * across various browsers.
 *
 * @property nativeHashChange
 * @type Boolean
 * @static
 */

// Most browsers that support hashchange expose it on the window. Opera 10.6+
// exposes it on the document (but you can still attach to it on the window).
//
// IE8 supports the hashchange event, but only in IE8 Standards
// Mode. However, IE8 in IE7 compatibility mode still defines the
// event but never fires it, so we can't just detect the event. We also can't
// just UA sniff for IE8, since other browsers support this event as well.
HistoryBase.nativeHashChange = ('onhashchange' in win || 'onhashchange' in doc) &&
        (!docMode || docMode > 7);

Y.mix(HistoryBase.prototype, {
    // -- Initialization -------------------------------------------------------

    /**
     * Initializes this HistoryBase instance. This method is called by the
     * constructor.
     *
     * @method _init
     * @param {Object} config configuration object
     * @protected
     */
    _init: function (config) {
        var initialState;

        /**
         * Configuration object provided by the user on instantiation, or an
         * empty object if one wasn't provided.
         *
         * @property _config
         * @type Object
         * @default {}
         * @protected
         */
        config = this._config = config || {};

        /**
         * Resolved initial state: a merge of the user-supplied initial state
         * (if any) and any initial state provided by a subclass. This may
         * differ from <code>_config.initialState</code>. If neither the config
         * nor a subclass supplies an initial state, this property will be
         * <code>null</code>.
         *
         * @property _initialState
         * @type Object|null
         * @default {}
         * @protected
         */
        initialState = this._initialState = this._initialState ||
                config.initialState || null;

        /**
         * Fired when the state changes. To be notified of all state changes
         * regardless of the History or YUI instance that generated them,
         * subscribe to this event on <code>Y.Global</code>. If you would rather
         * be notified only about changes generated by this specific History
         * instance, subscribe to this event on the instance.
         *
         * @event history:change
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *
         * <dl>
         *   <dt>changed (Object)</dt>
         *   <dd>
         *     Object hash of state items that have been added or changed. The
         *     key is the item key, and the value is an object containing
         *     <code>newVal</code> and <code>prevVal</code> properties
         *     representing the values of the item both before and after the
         *     change. If the item was newly added, <code>prevVal</code> will be
         *     <code>undefined</code>.
         *   </dd>
         *
         *   <dt>newVal (Object)</dt>
         *   <dd>
         *     Object hash of key/value pairs of all state items after the
         *     change.
         *   </dd>
         *
         *   <dt>prevVal (Object)</dt>
         *   <dd>
         *     Object hash of key/value pairs of all state items before the
         *     change.
         *   </dd>
         *
         *   <dt>removed (Object)</dt>
         *   <dd>
         *     Object hash of key/value pairs of state items that have been
         *     removed. Values are the old values prior to removal.
         *   </dd>
         *
         *   <dt>src (String)</dt>
         *   <dd>
         *     The source of the event. This can be used to selectively ignore
         *     events generated by certain sources.
         *   </dd>
         * </dl>
         */
        this.publish(EVT_CHANGE, {
            broadcast: 2,
            defaultFn: this._defChangeFn
        });

        // If initialState was provided, merge it into the current state.
        if (initialState) {
            this.add(initialState);
        }
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Adds a state entry with new values for the specified keys. By default,
     * the new state will be merged into the existing state, and new values will
     * override existing values. Specifying a <code>null</code> or
     * <code>undefined</code> value will cause that key to be removed from the
     * new state entry.
     *
     * @method add
     * @param {Object} state Object hash of key/value pairs.
     * @param {Object} options (optional) Zero or more of the following options:
     *   <dl>
     *     <dt>merge (Boolean)</dt>
     *     <dd>
     *       <p>
     *       If <code>true</code> (the default), the new state will be merged
     *       into the existing state. New values will override existing values,
     *       and <code>null</code> or <code>undefined</code> values will be
     *       removed from the state.
     *       </p>
     *
     *       <p>
     *       If <code>false</code>, the existing state will be discarded as a
     *       whole and the new state will take its place.
     *       </p>
     *     </dd>
     *   </dl>
     * @chainable
     */
    add: function () {
        var args = YArray(arguments, 0, true);
        args.unshift(SRC_ADD);
        return this._change.apply(this, args);
    },

    /**
     * Adds a state entry with a new value for a single key. By default, the new
     * value will be merged into the existing state values, and will override an
     * existing value with the same key if there is one. Specifying a
     * <code>null</code> or <code>undefined</code> value will cause the key to
     * be removed from the new state entry.
     *
     * @method addValue
     * @param {String} key State parameter key.
     * @param {String} value New value.
     * @param {Object} options (optional) Zero or more options. See
     *   <code>add()</code> for a list of supported options.
     * @chainable
     */
    addValue: function (key, value, options) {
        var state = {};
        state[key] = value;
        return this._change(SRC_ADD, state, options);
    },

    /**
     * Returns the current value of the state parameter specified by <i>key</i>,
     * or an object hash of key/value pairs for all current state parameters if
     * no key is specified.
     *
     * @method get
     * @param {String} key (optional) State parameter key.
     * @return {Object|String} Value of the specified state parameter, or an
     *   object hash of key/value pairs for all current state parameters.
     */
    get: function (key) {
        var state    = GlobalEnv._state,
            isObject = _isSimpleObject(state);

        if (key) {
            return isObject && Obj.owns(state, key) ? state[key] : undefined;
        } else {
            return isObject ? Y.mix({}, state, true) : state; // mix provides a fast shallow clone.
        }
    },

    /**
     * Same as <code>add()</code> except that a new browser history entry will
     * not be created. Instead, the current history entry will be replaced with
     * the new state.
     *
     * @method replace
     * @param {Object} state Object hash of key/value pairs.
     * @param {Object} options (optional) Zero or more options. See
     *   <code>add()</code> for a list of supported options.
     * @chainable
     */
    replace: function () {
        var args = YArray(arguments, 0, true);
        args.unshift(SRC_REPLACE);
        return this._change.apply(this, args);
    },

    /**
     * Same as <code>addValue()</code> except that a new browser history entry
     * will not be created. Instead, the current history entry will be replaced
     * with the new state.
     *
     * @method replaceValue
     * @param {String} key State parameter key.
     * @param {String} value New value.
     * @param {Object} options (optional) Zero or more options. See
     *   <code>add()</code> for a list of supported options.
     * @chainable
     */
    replaceValue: function (key, value, options) {
        var state = {};
        state[key] = value;
        return this._change(SRC_REPLACE, state, options);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Changes the state. This method provides a common implementation shared by
     * the public methods for changing state.
     *
     * @method _change
     * @param {String} src Source of the change, for inclusion in event facades
     *   to facilitate filtering.
     * @param {Object} state Object hash of key/value pairs.
     * @param {Object} options (optional) Zero or more options. See
     *   <code>add()</code> for a list of supported options.
     * @protected
     * @chainable
     */
    _change: function (src, state, options) {
        options = options ? Y.merge(DEFAULT_OPTIONS, options) : DEFAULT_OPTIONS;

        if (options.merge && _isSimpleObject(state) &&
                _isSimpleObject(GlobalEnv._state)) {
            state = Y.merge(GlobalEnv._state, state);
        }

        this._resolveChanges(src, state, options);
        return this;
    },

    /**
     * Called by _resolveChanges() when the state has changed. This method takes
     * care of actually firing the necessary events.
     *
     * @method _fireEvents
     * @param {String} src Source of the changes, for inclusion in event facades
     *   to facilitate filtering.
     * @param {Object} changes Resolved changes.
     * @param {Object} options Zero or more options. See <code>add()</code> for
     *   a list of supported options.
     * @protected
     */
    _fireEvents: function (src, changes, options) {
        // Fire the global change event.
        this.fire(EVT_CHANGE, {
            _options: options,
            changed : changes.changed,
            newVal  : changes.newState,
            prevVal : changes.prevState,
            removed : changes.removed,
            src     : src
        });

        // Fire change/remove events for individual items.
        Obj.each(changes.changed, function (value, key) {
            this._fireChangeEvent(src, key, value);
        }, this);

        Obj.each(changes.removed, function (value, key) {
            this._fireRemoveEvent(src, key, value);
        }, this);
    },

    /**
     * Fires a dynamic "[key]Change" event.
     *
     * @method _fireChangeEvent
     * @param {String} src source of the change, for inclusion in event facades
     *   to facilitate filtering
     * @param {String} key key of the item that was changed
     * @param {Object} value object hash containing <i>newVal</i> and
     *   <i>prevVal</i> properties for the changed item
     * @protected
     */
    _fireChangeEvent: function (src, key, value) {
        /**
         * <p>
         * Dynamic event fired when an individual history item is added or
         * changed. The name of this event depends on the name of the key that
         * changed. To listen to change events for a key named "foo", subscribe
         * to the <code>fooChange</code> event; for a key named "bar", subscribe
         * to <code>barChange</code>, etc.
         * </p>
         *
         * <p>
         * Key-specific events are only fired for instance-level changes; that
         * is, changes that were made via the same History instance on which the
         * event is subscribed. To be notified of changes made by other History
         * instances, subscribe to the global <code>history:change</code> event.
         * </p>
         *
         * @event [key]Change
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *
         * <dl>
         *   <dt>newVal (mixed)</dt>
         *   <dd>
         *     The new value of the item after the change.
         *   </dd>
         *
         *   <dt>prevVal (mixed)</dt>
         *   <dd>
         *     The previous value of the item before the change, or
         *     <code>undefined</code> if the item was just added and has no
         *     previous value.
         *   </dd>
         *
         *   <dt>src (String)</dt>
         *   <dd>
         *     The source of the event. This can be used to selectively ignore
         *     events generated by certain sources.
         *   </dd>
         * </dl>
         */
        this.fire(key + 'Change', {
            newVal : value.newVal,
            prevVal: value.prevVal,
            src    : src
        });
    },

    /**
     * Fires a dynamic "[key]Remove" event.
     *
     * @method _fireRemoveEvent
     * @param {String} src source of the change, for inclusion in event facades
     *   to facilitate filtering
     * @param {String} key key of the item that was removed
     * @param {mixed} value value of the item prior to its removal
     * @protected
     */
    _fireRemoveEvent: function (src, key, value) {
        /**
         * <p>
         * Dynamic event fired when an individual history item is removed. The
         * name of this event depends on the name of the key that was removed.
         * To listen to remove events for a key named "foo", subscribe to the
         * <code>fooRemove</code> event; for a key named "bar", subscribe to
         * <code>barRemove</code>, etc.
         * </p>
         *
         * <p>
         * Key-specific events are only fired for instance-level changes; that
         * is, changes that were made via the same History instance on which the
         * event is subscribed. To be notified of changes made by other History
         * instances, subscribe to the global <code>history:change</code> event.
         * </p>
         *
         * @event [key]Remove
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *
         * <dl>
         *   <dt>prevVal (mixed)</dt>
         *   <dd>
         *     The value of the item before it was removed.
         *   </dd>
         *
         *   <dt>src (String)</dt>
         *   <dd>
         *     The source of the event. This can be used to selectively ignore
         *     events generated by certain sources.
         *   </dd>
         * </dl>
         */
        this.fire(key + 'Remove', {
            prevVal: value,
            src    : src
        });
    },

    /**
     * Resolves the changes (if any) between <i>newState</i> and the current
     * state and fires appropriate events if things have changed.
     *
     * @method _resolveChanges
     * @param {String} src source of the changes, for inclusion in event facades
     *   to facilitate filtering
     * @param {Object} newState object hash of key/value pairs representing the
     *   new state
     * @param {Object} options Zero or more options. See <code>add()</code> for
     *   a list of supported options.
     * @protected
     */
    _resolveChanges: function (src, newState, options) {
        var changed   = {},
            isChanged,
            prevState = GlobalEnv._state,
            removed   = {};

        if (!newState) {
            newState = {};
        }

        if (!options) {
            options = {};
        }

        if (_isSimpleObject(newState) && _isSimpleObject(prevState)) {
            // Figure out what was added or changed.
            Obj.each(newState, function (newVal, key) {
                var prevVal = prevState[key];

                if (newVal !== prevVal) {
                    changed[key] = {
                        newVal : newVal,
                        prevVal: prevVal
                    };

                    isChanged = true;
                }
            }, this);

            // Figure out what was removed.
            Obj.each(prevState, function (prevVal, key) {
                if (!Obj.owns(newState, key) || newState[key] === null) {
                    delete newState[key];
                    removed[key] = prevVal;
                    isChanged = true;
                }
            }, this);
        } else {
            isChanged = newState !== prevState;
        }

        if (isChanged) {
            this._fireEvents(src, {
                changed  : changed,
                newState : newState,
                prevState: prevState,
                removed  : removed
            }, options);
        }
    },

    /**
     * Stores the specified state. Don't call this method directly; go through
     * _resolveChanges() to ensure that changes are resolved and all events are
     * fired properly.
     *
     * @method _storeState
     * @param {String} src source of the changes
     * @param {Object} newState new state to store
     * @param {Object} options Zero or more options. See <code>add()</code> for
     *   a list of supported options.
     * @protected
     */
    _storeState: function (src, newState) {
        // Note: the src and options params aren't used here, but they are used
        // by subclasses.
        GlobalEnv._state = newState || {};
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Default <code>history:change</code> event handler.
     *
     * @method _defChangeFn
     * @param {EventFacade} e state change event facade
     * @protected
     */
    _defChangeFn: function (e) {
        this._storeState(e.src, e.newVal, e._options);
    }
}, true);

Y.HistoryBase = HistoryBase;


}, '@VERSION@' ,{requires:['event-custom-complex']});
YUI.add('history-hash', function(Y) {

/**
 * Provides browser history management backed by
 * <code>window.location.hash</code>, as well as convenience methods for working
 * with the location hash and a synthetic <code>hashchange</code> event that
 * normalizes differences across browsers.
 *
 * @module history
 * @submodule history-hash
 * @since 3.2.0
 * @class HistoryHash
 * @extends HistoryBase
 * @constructor
 * @param {Object} config (optional) Configuration object. See the HistoryBase
 *   documentation for details.
 */

var HistoryBase = Y.HistoryBase,
    Lang        = Y.Lang,
    YArray      = Y.Array,
    GlobalEnv   = YUI.namespace('Env.HistoryHash'),

    SRC_HASH    = 'hash',

    hashNotifiers,
    oldHash,
    oldUrl,
    win             = Y.config.win,
    location        = win.location,
    useHistoryHTML5 = Y.config.useHistoryHTML5;

function HistoryHash() {
    HistoryHash.superclass.constructor.apply(this, arguments);
}

Y.extend(HistoryHash, HistoryBase, {
    // -- Initialization -------------------------------------------------------
    _init: function (config) {
        var bookmarkedState = HistoryHash.parseHash();

        // If an initialState was provided, merge the bookmarked state into it
        // (the bookmarked state wins).
        config = config || {};

        this._initialState = config.initialState ?
                Y.merge(config.initialState, bookmarkedState) : bookmarkedState;

        // Subscribe to the synthetic hashchange event (defined below) to handle
        // changes.
        Y.after('hashchange', Y.bind(this._afterHashChange, this), win);

        HistoryHash.superclass._init.apply(this, arguments);
    },

    // -- Protected Methods ----------------------------------------------------
    _storeState: function (src, newState) {
        var newHash = HistoryHash.createHash(newState);

        HistoryHash.superclass._storeState.apply(this, arguments);

        // Update the location hash with the changes, but only if the new hash
        // actually differs from the current hash (this avoids creating multiple
        // history entries for a single state).
        if (HistoryHash.getHash() !== newHash) {
            HistoryHash[src === HistoryBase.SRC_REPLACE ? 'replaceHash' : 'setHash'](newHash);
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Handler for hashchange events.
     *
     * @method _afterHashChange
     * @param {Event} e
     * @protected
     */
    _afterHashChange: function (e) {
        this._resolveChanges(SRC_HASH, HistoryHash.parseHash(e.newHash), {});
    }
}, {
    // -- Public Static Properties ---------------------------------------------
    NAME: 'historyHash',

    /**
     * Constant used to identify state changes originating from
     * <code>hashchange</code> events.
     *
     * @property SRC_HASH
     * @type String
     * @static
     * @final
     */
    SRC_HASH: SRC_HASH,

    /**
     * <p>
     * Prefix to prepend when setting the hash fragment. For example, if the
     * prefix is <code>!</code> and the hash fragment is set to
     * <code>#foo=bar&baz=quux</code>, the final hash fragment in the URL will
     * become <code>#!foo=bar&baz=quux</code>. This can be used to help make an
     * Ajax application crawlable in accordance with Google's guidelines at
     * <a href="http://code.google.com/web/ajaxcrawling/">http://code.google.com/web/ajaxcrawling/</a>.
     * </p>
     *
     * <p>
     * Note that this prefix applies to all HistoryHash instances. It's not
     * possible for individual instances to use their own prefixes since they
     * all operate on the same URL.
     * </p>
     *
     * @property hashPrefix
     * @type String
     * @default ''
     * @static
     */
    hashPrefix: '',

    // -- Protected Static Properties ------------------------------------------

    /**
     * Regular expression used to parse location hash/query strings.
     *
     * @property _REGEX_HASH
     * @type RegExp
     * @protected
     * @static
     * @final
     */
    _REGEX_HASH: /([^\?#&]+)=([^&]+)/g,

    // -- Public Static Methods ------------------------------------------------

    /**
     * Creates a location hash string from the specified object of key/value
     * pairs.
     *
     * @method createHash
     * @param {Object} params object of key/value parameter pairs
     * @return {String} location hash string
     * @static
     */
    createHash: function (params) {
        var encode = HistoryHash.encode,
            hash   = [];

        Y.Object.each(params, function (value, key) {
            if (Lang.isValue(value)) {
                hash.push(encode(key) + '=' + encode(value));
            }
        });

        return hash.join('&');
    },

    /**
     * Wrapper around <code>decodeURIComponent()</code> that also converts +
     * chars into spaces.
     *
     * @method decode
     * @param {String} string string to decode
     * @return {String} decoded string
     * @static
     */
    decode: function (string) {
        return decodeURIComponent(string.replace(/\+/g, ' '));
    },

    /**
     * Wrapper around <code>encodeURIComponent()</code> that converts spaces to
     * + chars.
     *
     * @method encode
     * @param {String} string string to encode
     * @return {String} encoded string
     * @static
     */
    encode: function (string) {
        return encodeURIComponent(string).replace(/%20/g, '+');
    },

    /**
     * Gets the raw (not decoded) current location hash, minus the preceding '#'
     * character and the hashPrefix (if one is set).
     *
     * @method getHash
     * @return {String} current location hash
     * @static
     */
    getHash: (Y.UA.gecko ? function () {
        // Gecko's window.location.hash returns a decoded string and we want all
        // encoding untouched, so we need to get the hash value from
        // window.location.href instead. We have to use UA sniffing rather than
        // feature detection, since the only way to detect this would be to
        // actually change the hash.
        var matches = /#(.*)$/.exec(location.href),
            hash    = matches && matches[1] || '',
            prefix  = HistoryHash.hashPrefix;

        return prefix && hash.indexOf(prefix) === 0 ?
                    hash.replace(prefix, '') : hash;
    } : function () {
        var hash   = location.hash.substr(1),
            prefix = HistoryHash.hashPrefix;

        // Slight code duplication here, but execution speed is of the essence
        // since getHash() is called every 50ms to poll for changes in browsers
        // that don't support native onhashchange. An additional function call
        // would add unnecessary overhead.
        return prefix && hash.indexOf(prefix) === 0 ?
                    hash.replace(prefix, '') : hash;
    }),

    /**
     * Gets the current bookmarkable URL.
     *
     * @method getUrl
     * @return {String} current bookmarkable URL
     * @static
     */
    getUrl: function () {
        return location.href;
    },

    /**
     * Parses a location hash string into an object of key/value parameter
     * pairs. If <i>hash</i> is not specified, the current location hash will
     * be used.
     *
     * @method parseHash
     * @param {String} hash (optional) location hash string
     * @return {Object} object of parsed key/value parameter pairs
     * @static
     */
    parseHash: function (hash) {
        var decode = HistoryHash.decode,
            i,
            len,
            matches,
            param,
            params = {},
            prefix = HistoryHash.hashPrefix,
            prefixIndex;

        hash = Lang.isValue(hash) ? hash : HistoryHash.getHash();

        if (prefix) {
            prefixIndex = hash.indexOf(prefix);

            if (prefixIndex === 0 || (prefixIndex === 1 && hash.charAt(0) === '#')) {
                hash = hash.replace(prefix, '');
            }
        }

        matches = hash.match(HistoryHash._REGEX_HASH) || [];

        for (i = 0, len = matches.length; i < len; ++i) {
            param = matches[i].split('=');
            params[decode(param[0])] = decode(param[1]);
        }

        return params;
    },

    /**
     * Replaces the browser's current location hash with the specified hash
     * and removes all forward navigation states, without creating a new browser
     * history entry. Automatically prepends the <code>hashPrefix</code> if one
     * is set.
     *
     * @method replaceHash
     * @param {String} hash new location hash
     * @static
     */
    replaceHash: function (hash) {
        if (hash.charAt(0) === '#') {
            hash = hash.substr(1);
        }

        location.replace('#' + (HistoryHash.hashPrefix || '') + hash);
    },

    /**
     * Sets the browser's location hash to the specified string. Automatically
     * prepends the <code>hashPrefix</code> if one is set.
     *
     * @method setHash
     * @param {String} hash new location hash
     * @static
     */
    setHash: function (hash) {
        if (hash.charAt(0) === '#') {
            hash = hash.substr(1);
        }

        location.hash = (HistoryHash.hashPrefix || '') + hash;
    }
});

// -- Synthetic hashchange Event -----------------------------------------------

// TODO: YUIDoc currently doesn't provide a good way to document synthetic DOM
// events. For now, we're just documenting the hashchange event on the YUI
// object, which is about the best we can do until enhancements are made to
// YUIDoc.

/**
 * <p>
 * Synthetic <code>window.onhashchange</code> event that normalizes differences
 * across browsers and provides support for browsers that don't natively support
 * <code>onhashchange</code>.
 * </p>
 *
 * <p>
 * This event is provided by the <code>history-hash</code> module.
 * </p>
 *
 * <p>
 * <strong>Usage example:</strong>
 * </p>
 *
 * <code><pre>
 * YUI().use('history-hash', function (Y) {
 * &nbsp;&nbsp;Y.on('hashchange', function (e) {
 * &nbsp;&nbsp;&nbsp;&nbsp;// Handle hashchange events on the current window.
 * &nbsp;&nbsp;}, Y.config.win);
 * });
 * </pre></code>
 *
 * @event hashchange
 * @param {EventFacade} e Event facade with the following additional
 *   properties:
 *
 * <dl>
 *   <dt>oldHash</dt>
 *   <dd>
 *     Previous hash fragment value before the change.
 *   </dd>
 *
 *   <dt>oldUrl</dt>
 *   <dd>
 *     Previous URL (including the hash fragment) before the change.
 *   </dd>
 *
 *   <dt>newHash</dt>
 *   <dd>
 *     New hash fragment value after the change.
 *   </dd>
 *
 *   <dt>newUrl</dt>
 *   <dd>
 *     New URL (including the hash fragment) after the change.
 *   </dd>
 * </dl>
 * @for YUI
 * @since 3.2.0
 */

hashNotifiers = GlobalEnv._notifiers;

if (!hashNotifiers) {
    hashNotifiers = GlobalEnv._notifiers = [];
}

Y.Event.define('hashchange', {
    on: function (node, subscriber, notifier) {
        // Ignore this subscription if the node is anything other than the
        // window or document body, since those are the only elements that
        // should support the hashchange event. Note that the body could also be
        // a frameset, but that's okay since framesets support hashchange too.
        if (node.compareTo(win) || node.compareTo(Y.config.doc.body)) {
            hashNotifiers.push(notifier);
        }
    },

    detach: function (node, subscriber, notifier) {
        var index = YArray.indexOf(hashNotifiers, notifier);

        if (index !== -1) {
            hashNotifiers.splice(index, 1);
        }
    }
});

oldHash = HistoryHash.getHash();
oldUrl  = HistoryHash.getUrl();

if (HistoryBase.nativeHashChange) {
    // Wrap the browser's native hashchange event.
    Y.Event.attach('hashchange', function (e) {
        var newHash = HistoryHash.getHash(),
            newUrl  = HistoryHash.getUrl();

        // Iterate over a copy of the hashNotifiers array since a subscriber
        // could detach during iteration and cause the array to be re-indexed.
        YArray.each(hashNotifiers.concat(), function (notifier) {
            notifier.fire({
                _event : e,
                oldHash: oldHash,
                oldUrl : oldUrl,
                newHash: newHash,
                newUrl : newUrl
            });
        });

        oldHash = newHash;
        oldUrl  = newUrl;
    }, win);
} else {
    // Begin polling for location hash changes if there's not already a global
    // poll running.
    if (!GlobalEnv._hashPoll) {
        if (Y.UA.webkit && !Y.UA.chrome &&
                navigator.vendor.indexOf('Apple') !== -1) {
            // Attach a noop unload handler to disable Safari's back/forward
            // cache. This works around a nasty Safari bug when the back button
            // is used to return from a page on another domain, but results in
            // slightly worse performance. This bug is not present in Chrome.
            //
            // Unfortunately a UA sniff is unavoidable here, but the
            // consequences of a false positive are minor.
            //
            // Current as of Safari 5.0 (6533.16).
            // See: https://bugs.webkit.org/show_bug.cgi?id=34679
            Y.on('unload', function () {}, win);
        }

        GlobalEnv._hashPoll = Y.later(50, null, function () {
            var newHash = HistoryHash.getHash(),
                newUrl;

            if (oldHash !== newHash) {
                newUrl = HistoryHash.getUrl();

                YArray.each(hashNotifiers, function (notifier) {
                    notifier.fire({
                        oldHash: oldHash,
                        oldUrl : oldUrl,
                        newHash: newHash,
                        newUrl : newUrl
                    });
                });

                oldHash = newHash;
                oldUrl  = newUrl;
            }
        }, null, true);
    }
}

Y.HistoryHash = HistoryHash;

// HistoryHash will never win over HistoryHTML5 unless useHistoryHTML5 is false.
if (useHistoryHTML5 === false || (!Y.History && useHistoryHTML5 !== true &&
        (!HistoryBase.html5 || !Y.HistoryHTML5))) {
    Y.History = HistoryHash;
}


}, '@VERSION@' ,{requires:['event-synthetic', 'history-base', 'yui-later']});
YUI.add('history-hash-ie', function(Y) {

/**
 * Improves IE6/7 support in history-hash by using a hidden iframe to create
 * entries in IE's browser history. This module is only needed if IE6/7 support
 * is necessary; it's not needed for any other browser.
 *
 * @module history
 * @submodule history-hash-ie
 * @since 3.2.0
 */

// Combination of a UA sniff to ensure this is IE (or a browser that wants us to
// treat it like IE) and feature detection for native hashchange support (false
// for IE < 8 or IE8/9 in IE7 mode).
if (Y.UA.ie && !Y.HistoryBase.nativeHashChange) {
    var Do          = Y.Do,
        GlobalEnv   = YUI.namespace('Env.HistoryHash'),
        HistoryHash = Y.HistoryHash,
        iframe      = GlobalEnv._iframe,
        win         = Y.config.win,
        location    = win.location;

    HistoryHash.getHash = function () {
        // The iframe's hash always wins over the parent frame's. This results
        // in the unfortunate edge case that changing the parent's hash without
        // using the YUI History API will not result in a hashchange event, but
        // this is a reasonable tradeoff. The only time the parent frame's hash
        // will be returned is if the iframe hasn't been created yet (i.e.,
        // before domready).
        var prefix = HistoryHash.hashPrefix,
            hash   = iframe ? iframe.contentWindow.location.hash.substr(1) :
                        location.hash.substr(1);

        return prefix && hash.indexOf(prefix) === 0 ?
                    hash.replace(prefix, '') : hash;
    };

    HistoryHash.getUrl = function () {
        var hash = HistoryHash.getHash();

        if (hash && hash !== location.hash.substr(1)) {
            return location.href.replace(/#.*$/, '') + '#' + hash;
        } else {
            return location.href;
        }
    };

    /**
     * Updates the history iframe with the specified hash.
     *
     * @method _updateIframe
     * @param {String} hash location hash
     * @param {Boolean} replace (optional) if <code>true</code>, the current
     *   history state will be replaced without adding a new history entry
     * @protected
     * @static
     * @for HistoryHash
     */
    HistoryHash._updateIframe = function (hash, replace) {
        var iframeDoc      = iframe.contentWindow.document,
            iframeLocation = iframeDoc.location;


        iframeDoc.open().close();

        if (replace) {
            iframeLocation.replace(hash.charAt(0) === '#' ? hash : '#' + hash);
        } else {
            iframeLocation.hash = hash;
        }
    };

    Do.after(HistoryHash._updateIframe, HistoryHash, 'replaceHash', HistoryHash, true);
    Do.after(HistoryHash._updateIframe, HistoryHash, 'setHash');

    if (!iframe) {
        Y.on('domready', function () {
            // Create a hidden iframe to store history state, following the
            // iframe-hiding recommendations from
            // http://www.paciellogroup.com/blog/?p=604.
            //
            // This iframe will allow history navigation within the current page
            // context. After navigating to another page, all but the most
            // recent history state will be lost.
            //
            // Earlier versions of the YUI History Utility attempted to work
            // around this limitation by having the iframe load a static
            // resource. This workaround was extremely fragile and tended to
            // break frequently (and silently) since it was entirely dependent
            // on IE's inconsistent handling of iframe history.
            //
            // Since this workaround didn't work much of the time anyway and
            // added significant complexity, it has been removed, and IE6 and 7
            // now get slightly degraded history support.

            iframe = GlobalEnv._iframe = Y.Node.getDOMNode(Y.Node.create(
                '<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>'
            ));

            // Append the iframe to the documentElement rather than the body.
            // Keeping it outside the body prevents scrolling on the initial
            // page load (hat tip to Ben Alman and jQuery BBQ for this
            // technique).
            Y.config.doc.documentElement.appendChild(iframe);

            // Update the iframe with the initial location hash, if any. This
            // will create an initial history entry that the user can return to
            // after the state has changed.
            HistoryHash._updateIframe(location.hash.substr(1));
        });

        // Listen for hashchange events and keep the parent window's location
        // hash in sync with the hash stored in the iframe.
        Y.on('hashchange', function (e) {
            if (location.hash.substr(1) !== e.newHash) {
                location.hash = e.newHash;
            }
        }, win);
    }
}


}, '@VERSION@' ,{requires:['history-hash', 'node-base']});
YUI.add('history-html5', function(Y) {

/**
 * Provides browser history management using the HTML5 history API.
 *
 * @module history
 * @submodule history-html5
 * @since 3.2.0
 */

/**
 * <p>
 * Provides browser history management using the HTML5 history API.
 * </p>
 *
 * <p>
 * When calling the <code>add()</code>, <code>addValue()</code>,
 * <code>replace()</code>, or <code>replaceValue()</code> methods on
 * <code>HistoryHTML5</code>, the following additional options are supported:
 * </p>
 *
 * <dl>
 *   <dt><strong>title (String)</strong></dt>
 *   <dd>
 *     Title to use for the new history entry. Browsers will typically display
 *     this title to the user in the detailed history window or in a dropdown
 *     menu attached to the back/forward buttons. If not specified, the title
 *     of the current document will be used.
 *   </dd>
 *
 *   <dt><strong>url (String)</strong></dt>
 *   <dd>
 *     URL to display to the user for the new history entry. This URL will be
 *     visible in the browser's address bar and will be the bookmarked URL if
 *     the user bookmarks the page. It may be a relative path ("foo/bar"), an
 *     absolute path ("/foo/bar"), or a full URL ("http://example.com/foo/bar").
 *     If you specify a full URL, the origin <i>must</i> be the same as the 
 *     origin of the current page, or an error will occur. If no URL is
 *     specified, the current URL will not be changed.
 *   </dd>
 * </dl>
 *
 * @class HistoryHTML5
 * @extends HistoryBase
 * @constructor
 * @param {Object} config (optional) Configuration object. The following
 *   <code>HistoryHTML5</code>-specific properties are supported in addition to
 *   those supported by <code>HistoryBase</code>:
 *
 * <dl>
 *   <dt><strong>enableSessionFallback (Boolean)</strong></dt>
 *   <dd>
 *     <p>
 *     Set this to <code>true</code> to store the most recent history state in
 *     sessionStorage in order to seamlessly restore the previous state (if any)
 *     when <code>HistoryHTML5</code> is instantiated after a
 *     <code>window.onpopstate</code> event has already fired.
 *     </p>
 *
 *     <p>
 *     By default, this setting is <code>false</code>.
 *     </p>
 *   </dd>
 * </dl>
 */

var HistoryBase     = Y.HistoryBase,
    doc             = Y.config.doc,
    win             = Y.config.win,
    sessionStorage,
    useHistoryHTML5 = Y.config.useHistoryHTML5,

    JSON = Y.JSON || win.JSON, // prefer YUI JSON, but fall back to native

    ENABLE_FALLBACK = 'enableSessionFallback',
    SESSION_KEY     = 'YUI_HistoryHTML5_state',
    SRC_POPSTATE    = 'popstate',
    SRC_REPLACE     = HistoryBase.SRC_REPLACE;

function HistoryHTML5() {
    HistoryHTML5.superclass.constructor.apply(this, arguments);
}

Y.extend(HistoryHTML5, HistoryBase, {
    // -- Initialization -------------------------------------------------------
    _init: function (config) {
        Y.on('popstate', this._onPopState, win, this);

        HistoryHTML5.superclass._init.apply(this, arguments);

        // If window.onload has already fired and the sessionStorage fallback is
        // enabled, try to restore the last state from sessionStorage. This
        // works around a shortcoming of the HTML5 history API: it's impossible
        // to get the current state if the popstate event fires before you've
        // subscribed to it. Since popstate fires immediately after onload,
        // the last state may be lost if you return to a page from another page.
        if (config && config[ENABLE_FALLBACK] && YUI.Env.windowLoaded) {
            // Gecko will throw an error if you attempt to reference
            // sessionStorage on a page served from a file:// URL, so we have to
            // be careful here.
            //
            // See http://yuilibrary.com/projects/yui3/ticket/2529165
            try {
                sessionStorage = win.sessionStorage;
            } catch (ex) {}

            this._loadSessionState();
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Returns a string unique to the current URL pathname that's suitable for
     * use as a session storage key.
     *
     * @method _getSessionKey
     * @return {String}
     * @protected
     */
    _getSessionKey: function () {
        return SESSION_KEY + '_' + win.location.pathname;
    },

    /**
     * Attempts to load a state entry stored in session storage.
     *
     * @method _loadSessionState
     * @protected
     */
    _loadSessionState: function () {
        var lastState = JSON && sessionStorage &&
                sessionStorage[this._getSessionKey()];

        if (lastState) {
            try {
                this._resolveChanges(SRC_POPSTATE, JSON.parse(lastState) || null);
            } catch (ex) {}
        }
    },

    /**
     * Stores the specified state entry in session storage if the
     * <code>enableSessionFallback</code> config property is <code>true</code>
     * and either <code>Y.JSON</code> or native JSON support is available and
     * session storage is supported.
     *
     * @method _storeSessionState
     * @param {mixed} state State to store. May be any type serializable to
     *   JSON.
     * @protected
     */
    _storeSessionState: function (state) {
        if (this._config[ENABLE_FALLBACK] && JSON && sessionStorage) {
            sessionStorage[this._getSessionKey()] = JSON.stringify(state || null);
        }
    },

    /**
     * Overrides HistoryBase's <code>_storeState()</code> and pushes or replaces
     * a history entry using the HTML5 history API when necessary.
     *
     * @method _storeState
     * @param {String} src Source of the changes.
     * @param {Object} newState New state to store.
     * @param {Object} options Zero or more options.
     * @protected
     */
    _storeState: function (src, newState, options) {
        if (src !== SRC_POPSTATE) {
            win.history[src === SRC_REPLACE ? 'replaceState' : 'pushState'](
                newState, options.title || doc.title || '', options.url || null
            );
        }

        this._storeSessionState(newState);
        HistoryHTML5.superclass._storeState.apply(this, arguments);
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Handler for popstate events.
     *
     * @method _onPopState
     * @param {Event} e
     * @protected
     */
    _onPopState: function (e) {
        var state = e._event.state;

        this._storeSessionState(state);
        this._resolveChanges(SRC_POPSTATE, state || null);
    }
}, {
    // -- Public Static Properties ---------------------------------------------
    NAME: 'historyhtml5',

    /**
     * Constant used to identify state changes originating from
     * <code>popstate</code> events.
     *
     * @property SRC_POPSTATE
     * @type String
     * @static
     * @final
     */
    SRC_POPSTATE: SRC_POPSTATE
});

if (!Y.Node.DOM_EVENTS.popstate) {
    Y.Node.DOM_EVENTS.popstate = 1;
}

Y.HistoryHTML5 = HistoryHTML5;

/**
 * <p>
 * If <code>true</code>, the <code>Y.History</code> alias will always point to
 * <code>Y.HistoryHTML5</code> when the history-html5 module is loaded, even if
 * the current browser doesn't support HTML5 history.
 * </p>
 *
 * <p>
 * If <code>false</code>, the <code>Y.History</code> alias will always point to
 * <code>Y.HistoryHash</code> when the history-hash module is loaded, even if
 * the current browser supports HTML5 history.
 * </p>
 *
 * <p>
 * If neither <code>true</code> nor <code>false</code>, the
 * <code>Y.History</code> alias will point to the best available history adapter
 * that the browser supports. This is the default behavior.
 * </p>
 *
 * @property useHistoryHTML5
 * @type boolean
 * @for config
 * @since 3.2.0
 */

// HistoryHTML5 will always win over HistoryHash unless useHistoryHTML5 is false
// or HTML5 history is not supported.
if (useHistoryHTML5 === true || (useHistoryHTML5 !== false &&
        HistoryBase.html5)) {
    Y.History = HistoryHTML5;
}


}, '@VERSION@' ,{optional:['json'], requires:['event-base', 'history-base', 'node-base']});


YUI.add('history', function(Y){}, '@VERSION@' ,{use:['history-base', 'history-hash', 'history-hash-ie', 'history-html5']});

