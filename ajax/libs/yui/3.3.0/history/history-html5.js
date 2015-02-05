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
