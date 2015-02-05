YUI.add('history', function(Y) {

/*global YUI */

/**
 * The Browser History Utility provides the ability to use the back/forward
 * navigation buttons in a DHTML application. It also allows a DHTML
 * application to be bookmarked in a specific state.
 *
 * This utility requires the following static markup:
 *
 * &lt;iframe id="yui-history-iframe" src="path-to-real-asset-in-same-domain"&gt;&lt;/iframe&gt;
 * &lt;input id="yui-history-field" type="hidden"&gt;
 *
 * @module history
 */

/**
 * This class represents an instance of the browser history utility.
 * @class History
 * @constructor
 */

        // Shortcuts, etc.
    var win = Y.config.win,
        doc = Y.config.doc,

        encode = encodeURIComponent,
        decode = decodeURIComponent,

        H, G,

        // YUI Compressor helper...
        E_MISSING_OR_INVALID_ARG = 'Missing or invalid argument',

        // Regular expression used to parse query strings and such.
        REGEXP = /([^=&]+)=([^&]*)/g,

        // A few private variables...
        _useIFrame = false,
        _getHash,

        /**
         * @event history:ready
         * @description Fires when the browser history utility is ready
         * @type Event.Custom
         */
        EV_HISTORY_READY = 'history:ready',

        /**
         * @event history:globalStateChange
         * @description Fires when the global state of the page has changed (that is,
         *     when the state of at least one browser history module has changed)
         * @type Event.Custom
         */
        EV_HISTORY_GLOBAL_STATE_CHANGE = 'history:globalStateChange',

        /**
         * @event history:moduleStateChange
         * @description Fires when the state of a history module object has changed
         * @type Event.Custom
         */
        EV_HISTORY_MODULE_STATE_CHANGE = 'history:moduleStateChange';


    G = YUI.Env.history || {

        // Flag used to tell whether the history utility is ready to be used.
        ready: false,

        // List of registered modules.
        _modules: [],

        // INPUT field (with type="hidden" or type="text") or TEXTAREA.
        // This field keeps the value of the initial state, current state
        // the list of all states across pages within a single browser session.
        _stateField: null,

        // Hidden IFrame used to store the browsing history on IE6/7.
        _historyIFrame: null
    };

    YUI.Env.history = G;

    /**
     * Returns the portion of the hash after the '#' symbol.
     * @method _getHash
     * @return {string} The hash portion of the document's location
     * @private
     */
    if (Y.UA.gecko) {
        // We branch at runtime for Gecko since window.location.hash in Gecko
        // returns a decoded string, and we want all encoding untouched.
        _getHash = function () {
            var m = /#(.*)$/.exec(win.location.href);
            return m && m[1] ? m[1] : '';
        };
    } else {
        _getHash = function () {
            return win.location.hash.substr(1);
        };
    }

    /**
     * Stores the initial state and current state for all registered modules
     * in the (hidden) form field specified during initialization.
     * @method _storeStates
     * @private
     */
    function _storeStates() {
        var initialStates = [], currentStates = [];

        Y.Object.each(G._modules, function (module, moduleId) {
            initialStates.push(moduleId + '=' + module.initialState);
            currentStates.push(moduleId + '=' + module.currentState);
        });

        G._stateField.set('value', initialStates.join('&') + '|' + currentStates.join('&'));
    }

    /**
     * Sets the new currentState attribute of all modules depending on the new fully
     * qualified state. Also notifies the modules which current state has changed.
     * @method _handleFQStateChange
     * @param {string} fqstate fully qualified state
     * @private
     */
    function _handleFQStateChange(fqstate) {
        var m, states = [], globalStateChanged = false;

        if (fqstate) {

            REGEXP.lastIndex = 0;
            while ((m = REGEXP.exec(fqstate))) {
                states[m[1]] = m[2];
            }

            Y.Object.each(G._modules, function (module, moduleId) {
                var currentState = states[moduleId];

                if (!currentState || module.currentState !== currentState) {
                    module.currentState = currentState || module.initialState;
                    module.fire(EV_HISTORY_MODULE_STATE_CHANGE, decode(module.currentState));
                    globalStateChanged = true;
                }
            });

        } else {

            Y.Object.each(G._modules, function (module, moduleId) {
                if (module.currentState !== module.initialState) {
                    module.currentState = module.initialState;
                    module.fire(EV_HISTORY_MODULE_STATE_CHANGE, decode(module.currentState));
                    globalStateChanged = true;
                }
            });
        }

        if (globalStateChanged) {
            H.fire(EV_HISTORY_GLOBAL_STATE_CHANGE);
        }
    }

    /**
     * Update the IFrame with our new state.
     * @method _updateIFrame
     * @private
     * @return {boolean} true if successful. false otherwise.
     */
    function _updateIFrame(fqstate) {
        var html, doc;

        html = '<html><body>' +
                   fqstate.replace(/&/g,'&amp;').
                           replace(/</g,'&lt;').
                           replace(/>/g,'&gt;').
                           replace(/"/g,'&quot;') +
               '</body></html>';

        try {
            doc = G._historyIFrame.get('contentWindow.document');
            // TODO: The Node API should expose these methods in the very near future...
            doc.invoke('open');
            doc.invoke('write', html, '', '', '', ''); // see bug #2447937
            doc.invoke('close');
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Periodically checks whether our internal IFrame is ready to be used
     * @method _checkIframeLoaded
     * @private
     */
    function _checkIframeLoaded() {
        var elem, fqstate, hash;

        if (!G._historyIFrame.get('contentWindow.document')) {
            // Check again in 10 msec...
            setTimeout(_checkIframeLoaded, 10);
            return;
        }

        // Periodically check whether a navigate operation has been
        // requested on the main window. This will happen when
        // History.navigate has been called or after the user
        // has hit the back/forward button.
        elem = G._historyIFrame.get('contentWindow.document.body');
        // We must use innerText, and not innerHTML because our string contains
        // the "&" character (which would end up being escaped as "&amp;") and
        // the string comparison would fail...
        fqstate = elem ? elem.get('innerText') : null;

        hash = _getHash();

        setInterval(function () {
            var newfqstate, states, newHash;

            elem = G._historyIFrame.get('contentWindow.document.body');
            // See my comment above about using innerText instead of innerHTML...
            newfqstate = elem ? elem.get('innerText') : null;

            newHash = _getHash();

            if (newfqstate !== fqstate) {

                fqstate = newfqstate;
                _handleFQStateChange(fqstate);

                if (!fqstate) {
                    states = [];
                    Y.Object.each(G._modules, function (module, moduleId) {
                        states.push(moduleId + '=' + module.initialState);
                    });
                    newHash = states.join('&');
                } else {
                    newHash = fqstate;
                }

                // Allow the state to be bookmarked by setting the top window's
                // URL fragment identifier. Note that here, we are on IE < 8
                // which does not touch the browser history when changing the
                // hash (unlike all the other browsers).
                win.location.hash = hash = newHash;

                _storeStates();

            } else if (newHash !== hash) {

                // The hash has changed. The user might have clicked on a link,
                // or modified the URL directly, or opened the same application
                // bookmarked in a specific state using a bookmark. However, we
                // know the hash change was not caused by a hit on the back or
                // forward buttons, or by a call to navigate() (because it would
                // have been handled above) We must handle these cases, which is
                // why we also need to keep track of hash changes on IE!

                // Note that IE6 has some major issues with this kind of user
                // interaction (the history stack gets completely messed up)
                // but it seems to work fine on IE7.

                hash = newHash;

                // Now, store a new history entry. The following will cause the
                // code above to execute, doing all the dirty work for us...
                _updateIFrame(newHash);
            }

        }, 50);

        G.ready = true;
        H.fire(EV_HISTORY_READY);
    }

    /**
     * Finish up the initialization of the browser utility library.
     * @method _initialize
     * @private
     */
    function _initialize() {
        var m, parts, moduleId, module, initialState, currentState, hash;

        // Decode the content of our storage field...
        parts = G._stateField.get('value').split('|');

        if (parts.length > 1) {

            REGEXP.lastIndex = 0;
            while ((m = REGEXP.exec(parts[0]))) {
                moduleId = m[1];
                initialState = m[2];
                module = G._modules[moduleId];
                if (module) {
                    module.initialState = initialState;
                }
            }

            REGEXP.lastIndex = 0;
            while ((m = REGEXP.exec(parts[1]))) {
                moduleId = m[1];
                currentState = m[2];
                module = G._modules[moduleId];
                if (module) {
                    module.currentState = currentState;
                }
            }
        }

        // IE8 in IE7 mode defines window.onhashchange, but never fires it...
        if (!Y.Lang.isUndefined(win.onhashchange) &&
            (Y.Lang.isUndefined(doc.documentMode) || doc.documentMode > 7)) {

            // The HTML5 way of handling DHTML history...
            // @TODO This is case-insensitive, at least in IE (WHY? spec, please actually specify things)
            // bug #2528444
            win.onhashchange = function () {
                var hash = _getHash();
                _handleFQStateChange(hash);
                _storeStates();
            };

            G.ready = true;
            H.fire(EV_HISTORY_READY);

        } else if (_useIFrame) {

            // IE < 8 or IE8 in quirks mode or IE7 standards mode
            _checkIframeLoaded();

        } else {

            // Periodically check whether a navigate operation has been
            // requested on the main window. This will happen when
            // History.navigate has been called, or after the user
            // has hit the back/forward button.

            // On Gecko and Opera, we just need to watch the hash...
            hash = _getHash();

            setInterval(function () {
                var newHash = _getHash();
                if (newHash !== hash) {
                    hash = newHash;
                    _handleFQStateChange(hash);
                    _storeStates();
                }
            }, 50);

            G.ready = true;
            H.fire(EV_HISTORY_READY);
        }
    }


    H = Y.mix(new Y.EventTarget(), {

        /**
         * Registers a new module.
         * @method register
         * @param {string} moduleId Non-empty string uniquely identifying the
         *     module you wish to register.
         * @param {string} initialState The initial state of the specified
         *     module corresponding to its earliest history entry.
         * @return {History.Module} The newly registered module
         */
        register: function (moduleId, initialState) {
            var module;

            if (!Y.Lang.isString(moduleId) || Y.Lang.trim(moduleId) === '' || !Y.Lang.isString(initialState)) {
                throw new Error(E_MISSING_OR_INVALID_ARG);
            }

            moduleId = encode(moduleId);
            initialState = encode(initialState);

            if (G._modules[moduleId]) {
                // The module seems to have already been registered.
                return;
            }

            // Note: A module CANNOT be registered once the browser history
            // utility has been initialized. This is related to reading and
            // writing state values from/to the input field. Relaxing this
            // rule would potentially create situations rather complicated
            // to deal with.
            if (G.ready) {
                return null;
            }

            module = new H.Module(moduleId, initialState);
            G._modules[moduleId] = module;
            return module;
        },

        /**
         * Initializes the Browser History Manager. Call this method
         * from a script block located right after the opening body tag.
         * @method initialize
         * @param {string|HTML Element} stateField <input type="hidden"> used
         *     to store application states. Must be in the static markup.
         * @param {string|HTML Element} historyIFrame IFrame used to store
         *     the history (only required for IE6/7)
         * @public
         */
        initialize: function (stateField, historyIFrame) {
            var tagName, type;

            if (G.ready) {
                // The browser history utility has already been initialized.
                return true;
            }

            stateField = Y.one(stateField);
            if (!stateField) {
                throw new Error(E_MISSING_OR_INVALID_ARG);
            }

            tagName = stateField.get('tagName').toUpperCase();
            type = stateField.get('type');

            if (tagName !== 'TEXTAREA' && (tagName !== 'INPUT' || type !== 'hidden' && type !== 'text')) {
                throw new Error(E_MISSING_OR_INVALID_ARG);
            }

            // IE < 8 or IE8 in quirks mode or IE7 standards mode
            if (Y.UA.ie && (Y.Lang.isUndefined(doc.documentMode) || doc.documentMode < 8)) {
                _useIFrame = true;
                historyIFrame = Y.one(historyIFrame);
                if (!historyIFrame || historyIFrame.get('tagName').toUpperCase() !== 'IFRAME') {
                    throw new Error(E_MISSING_OR_INVALID_ARG);
                }
            }

            if (Y.UA.opera && !Y.Lang.isUndefined(win.history.navigationMode)) {
                // Disable Opera's fast back/forward navigation mode and put
                // it in compatible mode. This makes anchor-based history
                // navigation work after the page has been navigated away
                // from and re-activated, at the cost of slowing down
                // back/forward navigation to and from that page.
                win.history.navigationMode = 'compatible';
            }

            G._stateField = stateField;
            G._historyIFrame = historyIFrame;

            Y.on('domready', _initialize);
            return true;
        },

        /**
         * Stores a new entry in the browser history by changing the state of a registered module.
         * @method navigate
         * @param {string} module Non-empty string representing your module.
         * @param {string} state String representing the new state of the specified module.
         * @return {boolean} Indicates whether the new state was successfully added to the history.
         * @public
         */
        navigate: function (moduleId, state) {
            var states;

            if (!Y.Lang.isString(moduleId) || !Y.Lang.isString(state)) {
                throw new Error(E_MISSING_OR_INVALID_ARG);
            }

            // The ncoding of module id and state takes place in mutiNavigate.
            states = {};
            states[moduleId] = state;

            return H.multiNavigate(states);
        },

        /**
         * Stores a new entry in the browser history by changing the state
         * of several registered modules in one atomic operation.
         * @method multiNavigate
         * @param {object} states Associative array of module-state pairs to set simultaneously.
         * @return {boolean} Indicates whether the new state was successfully added to the history.
         * @public
         */
        multiNavigate: function (states) {
            var newStates = [], fqstate, globalStateChanged = false;

            if (!G.ready) {
                return false;
            }

            Y.Object.each(G._modules, function (module, moduleId) {
                var state, decodedModuleId = decode(moduleId);

                if (!states.hasOwnProperty(decodedModuleId)) {
                    // The caller did not wish to modify the state of this
                    // module. We must however include it in fqstate!
                    state = module.currentState;
                } else {
                    state = encode(states[decodedModuleId]);
                    if (state !== module.upcomingState) {
                        module.upcomingState = state;
                        globalStateChanged = true;
                    }
                }

                newStates.push(moduleId + '=' + state);
            });

            if (!globalStateChanged) {
                // Nothing changed, so don't do anything.
                return false;
            }

            fqstate = newStates.join('&');

            if (_useIFrame) {
                return _updateIFrame(fqstate);
            } else {
                win.location.hash = fqstate;
                return true;
            }
        },

        /**
         * Returns the current state of the specified module.
         * @method getCurrentState
         * @param {string} moduleId Non-empty string representing your module.
         * @return {string} The current state of the specified module.
         * @public
         */
        getCurrentState: function (moduleId) {
            var module;

            if (!Y.Lang.isString(moduleId)) {
                throw new Error(E_MISSING_OR_INVALID_ARG);
            }

            if (!G.ready) {
                return null;
            }

            moduleId = encode(moduleId);
            module = G._modules[moduleId];
            if (!module) {
                return null;
            }

            return decode(module.currentState);
        },

        /**
         * Returns the state of a module according to the URL fragment
         * identifier. This method is useful to initialize your modules
         * if your application was bookmarked from a particular state.
         * @method getBookmarkedState
         * @param {string} moduleId Non-empty string representing your module.
         * @return {string} The bookmarked state of the specified module.
         * @public
         */
        getBookmarkedState: function (moduleId) {
            var m, i, h;

            if (!Y.Lang.isString(moduleId)) {
                throw new Error(E_MISSING_OR_INVALID_ARG);
            }

            moduleId = encode(moduleId);

            // Use location.href instead of location.hash which is already
            // URL-decoded, which creates problems if the state value
            // contained special characters...
            h = win.location.href;
            i = h.indexOf('#');

            if (i >= 0) {
                h = h.substr(i + 1);
                REGEXP.lastIndex = 0;
                while ((m = REGEXP.exec(h))) {
                    if (m[1] === moduleId) {
                        return decode(m[2]);
                    }
                }
            }

            return null;
        },

        /**
         * Returns the value of the specified query string parameter.
         * This method is not used internally by the Browser History Manager.
         * However, it is provided here as a helper since many applications
         * using the Browser History Manager will want to read the value of
         * url parameters to initialize themselves.
         * @method getQueryStringParameter
         * @param {string} paramName Name of the parameter we want to look up.
         * @param {string} queryString Optional URL to look at. If not specified,
         *     this method uses the URL in the address bar.
         * @return {string} The value of the specified parameter, or null.
         * @public
         * @deprecated Use Y.QueryString.parse() in the querystring module.
         * This will be removed in 3.2.0.
         */
        getQueryStringParameter: function (paramName, url) {
            var m, q, i;

            url = url || win.location.href;

            i = url.indexOf('?');
            q = i >= 0 ? url.substr(i + 1) : url;

            // Remove the hash if any
            i = q.lastIndexOf('#');
            q = i >= 0 ? q.substr(0, i) : q;

            REGEXP.lastIndex = 0;
            while ((m = REGEXP.exec(q))) {
                if (m[1] === paramName) {
                    return decode(m[2]);
                }
            }

            return null;
        }
    });

    /**
     * This class represents a browser history module.
     * @class History.Module
     * @constructor
     * @param id {String} the module identifier
     * @param initialState {String} the module's initial state
     */
    H.Module = function (id, initialState) {

        /**
         * The module identifier
         * @type String
         * @final
         */
        this.id = id;

        /**
         * The module's initial state
         * @type String
         * @final
         */
        this.initialState = initialState;

        /**
         * The module's current state
         * @type String
         * @final
         */
        this.currentState = initialState;

        /**
         * The module's upcoming state. There can be a slight delay between the
         * time a state is changed, and the time a state change is detected.
         * This property allows us to not fire the module state changed event
         * multiple times, making client code simpler.
         * @type String
         * @private
         * @final
         */
        this.upcomingState = initialState;
    };

    Y.augment(H.Module, Y.EventTarget);

    Y.History = H;


}, '@VERSION@' ,{requires:['node-base'], skinnable:false});
