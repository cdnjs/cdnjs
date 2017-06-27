/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * The Browser History Manager provides the ability to use the back/forward
 * navigation buttons in a DHTML application. It also allows a DHTML
 * application to be bookmarked in a specific state.
 *
 * This library requires the following static markup:
 *
 * &lt;iframe id="yui-history-iframe" src="path-to-real-asset-in-same-domain"&gt;&lt;/iframe&gt;
 * &lt;input id="yui-history-field" type="hidden"&gt;
 *
 * @module history
 * @requires yahoo,event
 * @namespace YAHOO.util
 * @title Browser History Manager
 */

/**
 * The History class provides the ability to use the back/forward navigation
 * buttons in a DHTML application. It also allows a DHTML application to
 * be bookmarked in a specific state.
 *
 * @class History
 * @constructor
 */
YAHOO.util.History = (function () {

    /**
     * Our hidden IFrame used to store the browsing history.
     *
     * @property _histFrame
     * @type HTMLIFrameElement
     * @default null
     * @private
     */
    var _histFrame = null;

    /**
     * INPUT field (with type="hidden" or type="text") or TEXTAREA.
     * This field keeps the value of the initial state, current state
     * the list of all states across pages within a single browser session.
     *
     * @property _stateField
     * @type HTMLInputElement|HTMLTextAreaElement
     * @default null
     * @private
     */
    var _stateField = null;

    /**
     * Flag used to tell whether YAHOO.util.History.initialize has been called.
     *
     * @property _initialized
     * @type boolean
     * @default false
     * @private
     */
    var _initialized = false;

    /**
     * List of registered modules.
     *
     * @property _modules
     * @type array
     * @default []
     * @private
     */
    var _modules = [];

    /**
     * List of fully qualified states. This is used only by Safari.
     *
     * @property _fqstates
     * @type array
     * @default []
     * @private
     */
    var _fqstates = [];

    /**
     * location.hash is a bit buggy on Opera. I have seen instances where
     * navigating the history using the back/forward buttons, and hence
     * changing the URL, would not change location.hash. That's ok, the
     * implementation of an equivalent is trivial.
     *
     * @method _getHash
     * @return {string} The hash portion of the document's location
     * @private
     */
    function _getHash() {
        var i, href;
        href = self.location.href;
        i = href.indexOf("#");
        return i >= 0 ? href.substr(i + 1) : null;
    }

    /**
     * Stores all the registered modules' initial state and current state.
     * On Safari, we also store all the fully qualified states visited by
     * the application within a single browser session. The storage takes
     * place in the form field specified during initialization.
     *
     * @method _storeStates
     * @private
     */
    function _storeStates() {

        var moduleName, moduleObj, initialStates = [], currentStates = [];

        for (moduleName in _modules) {
            if (YAHOO.lang.hasOwnProperty(_modules, moduleName)) {
                moduleObj = _modules[moduleName];
                initialStates.push(moduleName + "=" + moduleObj.initialState);
                currentStates.push(moduleName + "=" + moduleObj.currentState);
            }
        }

        _stateField.value = initialStates.join("&") + "|" + currentStates.join("&");
    }

    /**
     * Sets the new currentState attribute of all modules depending on the new
     * fully qualified state. Also notifies the modules which current state has
     * changed.
     *
     * @method _handleFQStateChange
     * @param {string} fqstate Fully qualified state
     * @private
     */
    function _handleFQStateChange(fqstate) {

        var i, len, moduleName, moduleObj, modules, states, tokens, currentState;

        if (!fqstate) {
            // Notifies all modules
            for (moduleName in _modules) {
                if (YAHOO.lang.hasOwnProperty(_modules, moduleName)) {
                    moduleObj = _modules[moduleName];
                    moduleObj.currentState = moduleObj.initialState;
                    moduleObj.onStateChange(_decode(moduleObj.currentState));
                }
            }
            return;
        }

        modules = [];
        states = fqstate.split("&");
        for (i = 0, len = states.length; i < len; i++) {
            tokens = states[i].split("=");
            if (tokens.length === 2) {
                moduleName = tokens[0];
                currentState = tokens[1];
                modules[moduleName] = currentState;
            }
        }

        for (moduleName in _modules) {
            if (YAHOO.lang.hasOwnProperty(_modules, moduleName)) {
                moduleObj = _modules[moduleName];
                currentState = modules[moduleName];
                if (!currentState || moduleObj.currentState !== currentState) {
                    moduleObj.currentState = typeof currentState === 'undefined' ? moduleObj.initialState : currentState;
                    moduleObj.onStateChange(_decode(moduleObj.currentState));
                }
            }
        }
    }

    /**
     * Update the IFrame with our new state.
     *
     * @method _updateIFrame
     * @private
     * @return {boolean} true if successful. false otherwise.
     */
    function _updateIFrame (fqstate) {

        var html, doc;

        html = '<html><body><div id="state">' +
                    YAHOO.lang.escapeHTML(fqstate) +
               '</div></body></html>';

        try {
            doc = _histFrame.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Periodically checks whether our internal IFrame is ready to be used.
     *
     * @method _checkIframeLoaded
     * @private
     */
    function _checkIframeLoaded() {

        var doc, elem, fqstate, hash;

        if (!_histFrame.contentWindow || !_histFrame.contentWindow.document) {
            // Check again in 10 msec...
            setTimeout(_checkIframeLoaded, 10);
            return;
        }

        // Start the thread that will have the responsibility to
        // periodically check whether a navigate operation has been
        // requested on the main window. This will happen when
        // YAHOO.util.History.navigate has been called or after
        // the user has hit the back/forward button.

        doc = _histFrame.contentWindow.document;
        elem = doc.getElementById("state");
        // We must use innerText, and not innerHTML because our string contains
        // the "&" character (which would end up being escaped as "&amp;") and
        // the string comparison would fail...
        fqstate = elem ? elem.innerText : null;

        hash = _getHash();

        setInterval(function () {

            var newfqstate, states, moduleName, moduleObj, newHash, historyLength;

            doc = _histFrame.contentWindow.document;
            elem = doc.getElementById("state");
            // See my comment above about using innerText instead of innerHTML...
            newfqstate = elem ? elem.innerText : null;

            newHash = _getHash();

            if (newfqstate !== fqstate) {

                fqstate = newfqstate;
                _handleFQStateChange(fqstate);

                if (!fqstate) {
                    states = [];
                    for (moduleName in _modules) {
                        if (YAHOO.lang.hasOwnProperty(_modules, moduleName)) {
                            moduleObj = _modules[moduleName];
                            states.push(moduleName + "=" + moduleObj.initialState);
                        }
                    }
                    newHash = states.join("&");
                } else {
                    newHash = fqstate;
                }

                // Allow the state to be bookmarked by setting the top window's
                // URL fragment identifier. Note that here, we are on IE, and
                // IE does not touch the browser history when setting the hash
                // (unlike all the other browsers). I used to write:
                //     self.location.replace( "#" + hash );
                // but this had a side effect when the page was not the top frame.
                self.location.hash = newHash;
                hash = newHash;

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

        _initialized = true;
        YAHOO.util.History.onLoadEvent.fire();
    }

    /**
     * Finish up the initialization of the Browser History Manager.
     *
     * @method _initialize
     * @private
     */
    function _initialize() {

        var i, len, parts, tokens, moduleName, moduleObj, initialStates, initialState, currentStates, currentState, counter, hash;

        // Decode the content of our storage field...
        parts = _stateField.value.split("|");

        if (parts.length > 1) {

            initialStates = parts[0].split("&");
            for (i = 0, len = initialStates.length; i < len; i++) {
                tokens = initialStates[i].split("=");
                if (tokens.length === 2) {
                    moduleName = tokens[0];
                    initialState = tokens[1];

                    moduleObj = YAHOO.lang.hasOwnProperty(_modules, moduleName)
                            && _modules[moduleName];

                    if (moduleObj) {
                        moduleObj.initialState = initialState;
                    }
                }
            }

            currentStates = parts[1].split("&");
            for (i = 0, len = currentStates.length; i < len; i++) {
                tokens = currentStates[i].split("=");
                if (tokens.length >= 2) {
                    moduleName = tokens[0];
                    currentState = tokens[1];

                    moduleObj = YAHOO.lang.hasOwnProperty(_modules, moduleName)
                            && _modules[moduleName];

                    if (moduleObj) {
                        moduleObj.currentState = currentState;
                    }
                }
            }
        }

        if (parts.length > 2) {
            _fqstates = parts[2].split(",");
        }

        if (YAHOO.env.ua.ie) {

            if (typeof document.documentMode === "undefined" || document.documentMode < 8) {

                // IE < 8 or IE8 in quirks mode or IE7 standards mode
                _checkIframeLoaded();

            } else {

                // IE8 in IE8 standards mode
                YAHOO.util.Event.on(top, "hashchange",
                    function () {
                        var hash = _getHash();
                        _handleFQStateChange(hash);
                        _storeStates();
                    });

                _initialized = true;
                YAHOO.util.History.onLoadEvent.fire();

            }

        } else {

            // Start the thread that will have the responsibility to
            // periodically check whether a navigate operation has been
            // requested on the main window. This will happen when
            // YAHOO.util.History.navigate has been called or after
            // the user has hit the back/forward button.

            // On Gecko and Opera, we just need to watch the hash...
            hash = _getHash();

            setInterval(function () {

                var state, newHash, newCounter;

                newHash = _getHash();
                if (newHash !== hash) {
                    hash = newHash;
                    _handleFQStateChange(hash);
                    _storeStates();
                }

            }, 50);

            _initialized = true;
            YAHOO.util.History.onLoadEvent.fire();
        }
    }

    /**
     * Wrapper around <code>decodeURIComponent()</code> that also converts +
     * chars into spaces.
     *
     * @method _decode
     * @param {String} string string to decode
     * @return {String} decoded string
     * @private
     * @since 2.9.0
     */
    function _decode(string) {
        return decodeURIComponent(string.replace(/\+/g, ' '));
    }

    /**
     * Wrapper around <code>encodeURIComponent()</code> that converts spaces to
     * + chars.
     *
     * @method _encode
     * @param {String} string string to encode
     * @return {String} encoded string
     * @private
     * @since 2.9.0
     */
    function _encode(string) {
        return encodeURIComponent(string).replace(/%20/g, '+');
    }

    return {

        /**
         * Fired when the Browser History Manager is ready. If you subscribe to
         * this event after the Browser History Manager has been initialized,
         * it will not fire. Therefore, it is recommended to use the onReady
         * method instead.
         *
         * @event onLoadEvent
         * @see onReady
         */
        onLoadEvent: new YAHOO.util.CustomEvent("onLoad"),

        /**
         * Executes the supplied callback when the Browser History Manager is
         * ready. This will execute immediately if called after the Browser
         * History Manager onLoad event has fired.
         *
         * @method onReady
         * @param {function} fn what to execute when the Browser History Manager is ready.
         * @param {object} obj an optional object to be passed back as a parameter to fn.
         * @param {boolean|object} overrideContext If true, the obj passed in becomes fn's execution scope.
         * @see onLoadEvent
         */
        onReady: function (fn, obj, overrideContext) {

            if (_initialized) {

                setTimeout(function () {
                    var ctx = window;
                    if (overrideContext) {
                        if (overrideContext === true) {
                            ctx = obj;
                        } else {
                            ctx = overrideContext;
                        }
                    }
                    fn.call(ctx, "onLoad", [], obj);
                }, 0);

            } else {

                YAHOO.util.History.onLoadEvent.subscribe(fn, obj, overrideContext);

            }
        },

        /**
         * Registers a new module.
         *
         * @method register
         * @param {string} module Non-empty string uniquely identifying the
         *     module you wish to register.
         * @param {string} initialState The initial state of the specified
         *     module corresponding to its earliest history entry.
         * @param {function} onStateChange Callback called when the
         *     state of the specified module has changed.
         * @param {object} obj An arbitrary object that will be passed as a
         *     parameter to the handler.
         * @param {boolean} overrideContext If true, the obj passed in becomes the
         *     execution scope of the listener.
         */
        register: function (module, initialState, onStateChange, obj, overrideContext) {

            var scope, wrappedFn;

            if (typeof module !== "string" || YAHOO.lang.trim(module) === "" ||
                typeof initialState !== "string" ||
                typeof onStateChange !== "function") {
                throw new Error("Missing or invalid argument");
            }

            if (YAHOO.lang.hasOwnProperty(_modules, module)) {
                // Here, we used to throw an exception. However, users have
                // complained about this behavior, so we now just return.
                return;
            }

            // Note: A module CANNOT be registered after calling
            // YAHOO.util.History.initialize. Indeed, we set the initial state
            // of each registered module in YAHOO.util.History.initialize.
            // If you could register a module after initializing the Browser
            // History Manager, you would not read the correct state using
            // YAHOO.util.History.getCurrentState when coming back to the
            // page using the back button.
            if (_initialized) {
                throw new Error("All modules must be registered before calling YAHOO.util.History.initialize");
            }

            // Make sure the strings passed in do not contain our separators "," and "|"
            module = _encode(module);
            initialState = _encode(initialState);

            // If the user chooses to override the scope, we use the
            // custom object passed in as the execution scope.
            scope = null;
            if (overrideContext === true) {
                scope = obj;
            } else {
                scope = overrideContext;
            }

            wrappedFn = function (state) {
                return onStateChange.call(scope, state, obj);
            };

            _modules[module] = {
                name: module,
                initialState: initialState,
                currentState: initialState,
                onStateChange: wrappedFn
            };
        },

        /**
         * Initializes the Browser History Manager. Call this method
         * from a script block located right after the opening body tag.
         *
         * @method initialize
         * @param {string|HTML Element} stateField <input type="hidden"> used
         *     to store application states. Must be in the static markup.
         * @param {string|HTML Element} histFrame IFrame used to store
         *     the history (only required on Internet Explorer)
         * @public
         */
        initialize: function (stateField, histFrame) {

            if (_initialized) {
                // The browser history manager has already been initialized.
                return;
            }

            if (YAHOO.env.ua.opera && typeof history.navigationMode !== "undefined") {
                // Disable Opera's fast back/forward navigation mode and puts
                // it in compatible mode. This makes anchor-based history
                // navigation work after the page has been navigated away
                // from and re-activated, at the cost of slowing down
                // back/forward navigation to and from that page.
                history.navigationMode = "compatible";
            }

            if (typeof stateField === "string") {
                stateField = document.getElementById(stateField);
            }

            if (!stateField ||
                stateField.tagName.toUpperCase() !== "TEXTAREA" &&
                (stateField.tagName.toUpperCase() !== "INPUT" ||
                 stateField.type !== "hidden" &&
                 stateField.type !== "text")) {
                throw new Error("Missing or invalid argument");
            }

            _stateField = stateField;

            // IE < 8 or IE8 in quirks mode or IE7 standards mode
            if (YAHOO.env.ua.ie && (typeof document.documentMode === "undefined" || document.documentMode < 8)) {

                if (typeof histFrame === "string") {
                    histFrame = document.getElementById(histFrame);
                }

                if (!histFrame || histFrame.tagName.toUpperCase() !== "IFRAME") {
                    throw new Error("Missing or invalid argument");
                }

                _histFrame = histFrame;
            }

            // Note that the event utility MUST be included inline in the page.
            // If it gets loaded later (which you may want to do to improve the
            // loading speed of your site), the onDOMReady event never fires,
            // and the history library never gets fully initialized.
            YAHOO.util.Event.onDOMReady(_initialize);
        },

        /**
         * Call this method when you want to store a new entry in the browser's history.
         *
         * @method navigate
         * @param {string} module Non-empty string representing your module.
         * @param {string} state String representing the new state of the specified module.
         * @return {boolean} Indicates whether the new state was successfully added to the history.
         * @public
         */
        navigate: function (module, state) {

            var states;

            if (typeof module !== "string" || typeof state !== "string") {
                throw new Error("Missing or invalid argument");
            }

            states = {};
            states[module] = state;

            return YAHOO.util.History.multiNavigate(states);
        },

        /**
         * Call this method when you want to store a new entry in the browser's history.
         *
         * @method multiNavigate
         * @param {object} states Associative array of module-state pairs to set simultaneously.
         * @return {boolean} Indicates whether the new state was successfully added to the history.
         * @public
         */
        multiNavigate: function (states) {

            var currentStates, moduleName, moduleObj, currentState, fqstate;

            if (typeof states !== "object") {
                throw new Error("Missing or invalid argument");
            }

            if (!_initialized) {
                throw new Error("The Browser History Manager is not initialized");
            }

            for (moduleName in states) {
                if (!YAHOO.lang.hasOwnProperty(_modules, _encode(moduleName))) {
                    throw new Error("The following module has not been registered: " + moduleName);
                }
            }

            // Generate our new full state string mod1=xxx&mod2=yyy
            currentStates = [];

            for (moduleName in _modules) {
                if (YAHOO.lang.hasOwnProperty(_modules, moduleName)) {
                    moduleObj = _modules[moduleName];
                    if (YAHOO.lang.hasOwnProperty(states, moduleName)) {
                        currentState = states[_decode(moduleName)];
                    } else {
                        currentState = _decode(moduleObj.currentState);
                    }

                    // Make sure the strings passed in do not contain our separators "," and "|"
                    moduleName = _encode(moduleName);
                    currentState = _encode(currentState);

                    currentStates.push(moduleName + "=" + currentState);
                }
            }

            fqstate = currentStates.join("&");

            if (YAHOO.env.ua.ie && (typeof document.documentMode === "undefined" || document.documentMode < 8)) {

                return _updateIFrame(fqstate);

            } else {

                // Known bug: On Safari 1.x and 2.0, if you have tab browsing
                // enabled, Safari will show an endless loading icon in the
                // tab. This has apparently been fixed in recent WebKit builds.
                // One work around found by Dav Glass is to submit a form that
                // points to the same document. This indeed works on Safari 1.x
                // and 2.0 but creates bigger problems on WebKit. So for now,
                // we'll consider this an acceptable bug, and hope that Apple
                // comes out with their next version of Safari very soon.
                self.location.hash = fqstate;

                return true;
            }
        },

        /**
         * Returns the current state of the specified module.
         *
         * @method getCurrentState
         * @param {string} module Non-empty string representing your module.
         * @return {string} The current state of the specified module.
         * @public
         */
        getCurrentState: function (module) {

            var moduleObj;

            if (typeof module !== "string") {
                throw new Error("Missing or invalid argument");
            }

            if (!_initialized) {
                throw new Error("The Browser History Manager is not initialized");
            }

            moduleObj = YAHOO.lang.hasOwnProperty(_modules, module)
                    && _modules[module];

            if (!moduleObj) {
                throw new Error("No such registered module: " + module);
            }

            return _decode(moduleObj.currentState);
        },

        /**
         * Returns the state of a module according to the URL fragment
         * identifier. This method is useful to initialize your modules
         * if your application was bookmarked from a particular state.
         *
         * @method getBookmarkedState
         * @param {string} module Non-empty string representing your module.
         * @return {string} The bookmarked state of the specified module.
         * @public
         */
        getBookmarkedState: function (module) {

            var i, len, idx, hash, states, tokens, moduleName;

            if (typeof module !== "string") {
                throw new Error("Missing or invalid argument");
            }

            // Use location.href instead of location.hash which is already
            // URL-decoded, which creates problems if the state value
            // contained special characters...
            idx = self.location.href.indexOf("#");
            if (idx >= 0) {
                hash = self.location.href.substr(idx + 1);
                states = hash.split("&");
                for (i = 0, len = states.length; i < len; i++) {
                    tokens = states[i].split("=");
                    if (tokens.length === 2) {
                        moduleName = tokens[0];
                        if (moduleName === module) {
                            return _decode(tokens[1]);
                        }
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
         *
         * @method getQueryStringParameter
         * @param {string} paramName Name of the parameter we want to look up.
         * @param {string} queryString Optional URL to look at. If not specified,
         *     this method uses the URL in the address bar.
         * @return {string} The value of the specified parameter, or null.
         * @public
         */
        getQueryStringParameter: function (paramName, url) {

            var i, len, idx, queryString, params, tokens;

            url = url || self.location.href;

            idx = url.indexOf("?");
            queryString = idx >= 0 ? url.substr(idx + 1) : url;

            // Remove the hash if any
            idx = queryString.lastIndexOf("#");
            queryString = idx >= 0 ? queryString.substr(0, idx) : queryString;

            params = queryString.split("&");

            for (i = 0, len = params.length; i < len; i++) {
                tokens = params[i].split("=");
                if (tokens.length >= 2) {
                    if (tokens[0] === paramName) {
                        return _decode(tokens[1]);
                    }
                }
            }

            return null;
        }

    };

})();
YAHOO.register("history", YAHOO.util.History, {version: "2.9.0", build: "2800"});
