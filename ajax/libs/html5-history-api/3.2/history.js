/*
 * history API JavaScript Library v3.2.6
 *
 * Support: IE6+, FF3+, Opera 9+, Safari, Chrome, Firefox and other
 *
 * Copyright 2011-2013, Dmitrii Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 26-04-2013
 */
(function(window, True, False, Null, undefined) {

    "use strict";

    var // Symlink for document
        document = window.document,
        // HTML tag
        documentElement = document.documentElement,
        // preserve original object of History
        windowHistory = window.history || {},
        // obtain a reference to the Location object
        windowLocation = window.location,
        // Check support HTML5 History API
        api = !!windowHistory.pushState,
        // If the first event is triggered when the page loads
        // This behavior is obvious for Chrome and Safari
        initialState = api && windowHistory.state === undefined,
        initialFire = windowLocation.href,
        // Just a reference to the methods
        JSON = window.JSON || {},
        defineProp = Object.defineProperty,
        defineGetter = Object.prototype.__defineGetter__,
        defineSetter = Object.prototype.__defineSetter__,
        historyPushState = windowHistory.pushState,
        historyReplaceState = windowHistory.replaceState,
        sessionStorage = window.sessionStorage,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        toString = Object.prototype.toString,
        // if we are in Internet Explorer
        msie = +(((window['eval'] && eval("/*@cc_on 1;@*/") && /msie (\d+)/i.exec(navigator.userAgent)) || [])[1] || 0),
        // unique ID of the library needed to run VBScript in IE
        libID = (new Date()).getTime(),
        // counter of created classes in VBScript
        VBInc = (defineProp || defineGetter) && (!msie || msie > 8) ? 0 : 1,
        // If IE version 7 or lower to add iframe in DOM
        iframe = msie < 8 ? document.createElement('iframe') : False,

        // original methods text links
        _a, _r, _d,
        // prefix to names of events
        eventPrefix = "",
        // saving originals event methods
        addEvent = (_a = "addEventListener", window[_a]) || (_a = "attachEvent", eventPrefix = "on", window[_a]),
        removeEvent = (_r = "removeEventListener", window[_r]) || (_r = "detachEvent", window[_r]),
        fireEvent = (_d = "dispatchEvent", window[_d]) || (_d = "fireEvent", window[_d]),

        // scopes for event listeners
        eventsListPopState = [],
        eventsListHashChange = [],

        skipHashChange = 0,

        eventsList = {
            "onpopstate": eventsListPopState,
            "popstate": eventsListPopState,
            "onhashchange": eventsListHashChange,
            "hashchange": eventsListHashChange
        },

        // get external settings for this library
        sets = (function() {

            var i, m, s, config = {"basepath": '/', "redirect": 0, "type": '/'},
                el = document.getElementsByTagName("SCRIPT");

            // parse GET parameters for internal settings.
            for(i = 0; el[i]; i++) {
                if (m = /(.*)\/(?:history|spike)(?:\.iegte8)?(?:-\d\.\d(?:\.\d)?\w?)?(?:\.min)?.js\?(.*)$/i.exec(el[i].src) ||
                    (i === el.length - 1 && (m = el[i].src.split("?")).length === 2 && (m[2] = m[1]) && m)) {
                    for(i = 0, s = m[2].split("&"); s[i];) {
                        m = s[i++].split("=");
                        config[m[0]] = m[1] == 'true' ? True : m[1] == 'false' ? False : m[1] || '';
                    }
                    config["basepath"] = config["basepath"] || "/";
                    break;
                }
            }
            return config;
        })(),

        // function for the preparation of URL-links for further work
        normalizeUrl = (function(a) {

            var _href, relative, special, nohash, host, port, pathname;

            return function(href, test) {

                var re = new RegExp("^" + sets["basepath"], "i");

                if (!href) {

                    href = windowLocation.href;

                    if (!api || test) {
                        // form the absolute link from the hash
                        href = windowLocation.protocol + "//" +
                            windowLocation.host + sets["basepath"] +
                            (href.replace(/^[^#]*/, '') || "#").
                                replace(new RegExp("^#[\/]?(?:" + sets["type"] + ")?"), "");
                    }
                } else if (!api || msie) {

                    var current = normalizeUrl(),
                        _pathname = current._pathname,
                        _protocol = current._protocol;

                    // convert relative link to the absolute
                    href = /^(?:[\w0-9]+\:)?\/\//.test(href) ?
                        href.indexOf("/") === 0 ? _protocol + href :
                            href : _protocol + "//" + current._host + (
                        href.indexOf("/") === 0 ? href :
                            href.indexOf("?") === 0 ? _pathname + href :
                                href.indexOf("#") === 0 ? _pathname + current._search + href :
                                    _pathname.replace(/[^\/]+$/g, '') + href
                        );
                }

                // no need to transform what is already converted the last time
                if (_href !== href) {

                    // parse to part with a browser
                    a.href = _href = href;

                    port = a.port;
                    host = a.host;
                    pathname = a.pathname;

                    // Internet Explorer adds the port number to standard protocols
                    if ((a.protocol === "http:" && port == 80) ||
                        (a.protocol === "https:" && port == 443)) {
                        host = a.hostname;
                        port = "";
                    }

                    // Internet Explorer removes the slash at the beginning the way, we need to add it back
                    pathname = pathname.indexOf("/") === 0 ? pathname : "/" + pathname;
                    // relative link, no protocol, no host
                    relative = pathname + a.search + a.hash;
                    // special links for set to hash-link, if browser not support History API
                    nohash = pathname.replace(re, sets["type"]) + a.search;
                    special = nohash + a.hash;
                }

                // added first symbol for Closure Compiler to advanced optimization
                return {
                    _href: a.protocol + "//" + host + relative,
                    _protocol: a.protocol,
                    _host: host,
                    _hostname: a.hostname || windowLocation.hostname,
                    _port: port || windowLocation.port,
                    _pathname: pathname,
                    _search: a.search,
                    _hash: a.hash,
                    _relative: relative,
                    _nohash: nohash,
                    _special: special
                }
            }
        })(document.createElement("a")),

        // modifiable object of History
        History = !VBInc ? windowHistory : {
            // properties to create an object in IE
            "back": windowHistory.back,
            "forward": windowHistory.forward,
            "go": windowHistory.go,
            "pushState": Null,
            "replaceState": Null,
            "emulate": !api,
            "toString": function() {
                return "[object History]";
            }
        },

        // Accessors for the object History
        HistoryAccessors = {
            "state": {
                get: function() {
                    return iframe && iframe["storage"] || historyStorage()[History.location.href] || Null;
                }
            },
            "length": {
                get: function() {
                    return windowHistory.length;
                }
            },
            "location": {
                set: function(val) {
                    window.location = val;
                },
                get: function() {
                    return api ? windowLocation : Location;
                }
            }
        },

        // The new Location object to add it to the object of History
        Location = {
            "assign": function(url) {
                windowLocation.assign(api || url.indexOf("#") !== 0 ? url : "#" + normalizeUrl()._nohash + url);
            },
            "reload": windowLocation.reload,
            "replace": function(url) {
                windowLocation.replace(api || url.indexOf("#") !== 0 ? url : "#" + normalizeUrl()._nohash + url);
            },
            "toString": function() {
                return this.href;
            }
        },

        // Accessors for the object Location
        LocationAccessors = {
            "href": {
                set: function(val) {
                    windowLocation.href = val;
                },
                get: function() {
                    return normalizeUrl()._href;
                }
            },
            "protocol": {
                set: function(val) {
                    windowLocation.protocol = val;
                },
                get: function() {
                    return windowLocation.protocol;
                }
            },
            "host": {
                set: function(val) {
                    windowLocation.host = val;
                },
                get: function() {
                    return windowLocation.host;
                }
            },
            "hostname": {
                set: function(val) {
                    windowLocation.hostname = val;
                },
                get: function() {
                    return windowLocation.hostname;
                }
            },
            "port": {
                set: function(val) {
                    windowLocation.port = val;
                },
                get: function() {
                    return windowLocation.port;
                }
            },
            "pathname": {
                set: function(val) {
                    windowLocation.pathname = val;
                },
                get: function() {
                    return normalizeUrl()._pathname;
                }
            },
            "search": {
                set: function(val) {
                    windowLocation.search = val;
                },
                get: function() {
                    return normalizeUrl()._search;
                }
            },
            "hash": {
                set: function(val) {

                    var hash = (val.indexOf("#") === 0 ? val : "#" + val),
                        urlObject = normalizeUrl();

                    if (iframe) {

                        if (hash != urlObject._hash) {

                            History.pushState(Null, Null, urlObject._nohash + hash);

                            hashChanged({
                                oldURL: urlObject._href
                            });
                        }
                    } else {

                        windowLocation.hash = "#" + urlObject._nohash + hash;
                    }
                },
                get: function() {
                    return normalizeUrl()._hash;
                }
            }
        },

        // defineProperties for static objects
        createStaticObject = function(obj, props, novb) {

            var tmp = obj, key, vb = False;

            if (defineProp || defineGetter) {
                for(key in props) {
                    if (hasOwnProperty.call(props, key)) {
                        if (defineGetter) {
                            props[key].get &&
                            defineGetter.call(obj, key, props[key].get);
                            props[key].set &&
                            defineSetter.call(obj, key, props[key].set);
                        } else if (defineProp) {
                            try {
                                defineProp(obj, key, props[key]);
                            } catch(_e_) {
                                if (novb) {
                                    return False;
                                }
                                vb = True;
                                break;
                            }
                        }
                    }
                }
            } else {
                vb = True;
            }

            if (vb && VBInc) {

                var staticClass = "StaticClass" + libID + VBInc++,
                    parts = ["Class " + staticClass];

                // functions for VBScript
                if (!("execVB" in window)) {
                    execScript('Function execVB(c) ExecuteGlobal(c) End Function', 'VBScript');
                }
                if (!("VBCVal" in window)) {
                    execScript('Function VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function', 'VBScript');
                }

                for(key in obj) {
                    parts[parts.length] = "Public [" + key + "]";
                }

                if (hasOwnProperty.call(obj, "toString")) {
                    if (!obj.propertyIsEnumerable('toString')) {
                        parts[parts.length] = "Public [toString]";
                    }
                    props["(toString)"] = {
                        get: function() {
                            return this.toString.call(this);
                        }
                    }
                }

                for(key in props) {
                    if (hasOwnProperty.call(props, key)) {
                        if (props[key].get) {
                            obj["get " + key] = props[key].get;
                            parts.push(
                                "Public [get " + key + "]",
                                "Public " + (key === "(toString)" ? "Default " : "") + "Property Get [" + key + "]",
                                "Call VBCVal(me.[get " + key + "].call(me),[" + key + "])",
                                "End Property"
                            );

                        }
                        if (props[key].set) {
                            obj["set " + key] = props[key].set;
                            parts.push(
                                "Public [set " + key + "]",
                                "Public Property Let [" + key + "](v)",
                                "Call me.[set " + key + "].call(me,v)",
                                "End Property",
                                "Public Property Set [" + key + "](v)",
                                "Call me.[set " + key + "].call(me,v)",
                                "End Property"
                            );
                        }
                    }
                }

                parts.push(
                    "End Class",
                    "Function " + staticClass + "Factory()",
                    "Set " + staticClass + "Factory=New " + staticClass,
                    "End Function"
                );

                window['execVB'](parts.join("\n"));

                tmp = window[staticClass + "Factory"]();

                for(key in obj) {
                    tmp[key] = obj[key];
                }
                if (hasOwnProperty.call(obj, "toString")) {
                    tmp.toString = obj.toString;
                }
            }

            return tmp;
        },

        JSONStringify = JSON.stringify || (function(undefined) {

            function quote(string) {

                var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'};

                escapable.lastIndex = 0;

                return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            }

            var str = function(value) {

                var isArray, result, k,
                    n = (typeof value).charCodeAt(2);

                // string
                return n === 114 ? quote(value) :
                    // number
                    n === 109 ? isFinite(value) ? String(value) : 'null' :
                    // boolean, null
                    n === 111 || n === 108 ? String(value) :
                    // object
                    n === 106 ? function() {

                        if (!value) return 'null';

                        isArray = toString.apply(value) === '[object Array]';

                        result = isArray ? "[" : "{";

                        if (isArray) {
                            for(k = 0; k < value.length; k++) {
                                result += (k == 0 ? "" : ",") + str(value[k]);
                            }
                        } else {
                            for(k in value) {
                                if (hasOwnProperty.call(value, k) && value[k] !== undefined) {
                                    result += (result.length == 1 ? "" : ",") + quote(k) + ":" + str(value[k]);
                                }
                            }
                        }

                        return result + (isArray ? "]" : "}");

                    }() : undefined;
            }

            return str;
        })(),

        JSONParse = (function() {
            var parse = JSON.parse;
            return function(source) {
                return source ? parse ? parse(source) : (new Function("return " + source))() : Null;
            }
        })(),

        historyStorage = function(state) {
            return sessionStorage ? state ? sessionStorage.setItem('__hitoryapi__', JSONStringify(state)) :
                JSONParse(sessionStorage.getItem('__hitoryapi__')) || {} : {};
        },

        fireStateChange = function(type, oldURL, newURL) {

            var winHndl = type === 2 ? window.onhashchange : window.onpopstate,
                name = type === 2 ? 'hashchange' : 'popstate',
                e = document.createEvent ? document.createEvent('Events') : document.createEventObject(),
                o = {}, list = eventsList[name];

            for(var key in e) {
                o[key] = typeof e[key] === 'function' ? function() {} : e[key];
            }

            o.target = o.currentTarget = o.srcElement = window;
            o.type = name;
            o.state = History.state;
            o.oldURL = oldURL;
            o.newURL = newURL;

            if (winHndl) {
                winHndl.call(window, o);
            }

            for(var i = 0, len = list.length; i < len; i++) {
                list[i].call(window, o);
            }
        },

        hashChanged = (function() {

            var windowPopState = window.onpopstate || Null,
                windowHashChange = window.onhashchange || Null,
                popstateFired = 0,
                initialStateHandler = Null,
                urlObject = normalizeUrl(),
                oldURL = urlObject._href,

                fireInitialState = function() {
                    if (initialFire && !(initialFire = 0) && urlObject._relative !== sets["basepath"]) {
                        clearInterval(initialStateHandler);
                        setTimeout(fireStateChange, 10);
                    }
                },

                change = function(e) {

                    var urlObject = normalizeUrl();

                    if (skipHashChange) {
                        oldURL = urlObject._href;
                        return skipHashChange = 0;
                    }

                    var oldUrl = e.oldURL || oldURL,
                        newUrl = oldURL = e.newURL || urlObject._href,
                        oldHash = oldUrl.replace(/^.*?(#|$)/, ""),
                        newHash = newUrl.replace(/^.*?(#|$)/, "");

                    if (oldUrl != newUrl && !popstateFired) {
                        // fire popstate
                        fireStateChange();
                    }

                    popstateFired = 0;
                    initialFire = 0;

                    if (oldHash != newHash) {
                        // fire hashchange
                        fireStateChange(2, oldUrl, newUrl);
                    }
                }

            addEvent(eventPrefix + "hashchange", change, False);

            addEvent(eventPrefix + "popstate", function() {

                // popstate ignore the event when the document is loaded
                if (initialFire === windowLocation.href) {
                    return initialFire = 0;
                }

                initialFire = 0;

                fireStateChange(popstateFired = 1);

            }, False);

            History["redirect"] = function(type, basepath) {

                sets["type"] = type == Null ? sets["type"] : type;
                sets["basepath"] = basepath = basepath == Null ? sets["basepath"] : basepath;

                if (window.top == window.self) {

                    var relative = normalizeUrl(Null, True)._relative,
                        search = windowLocation.search,
                        path = windowLocation.pathname;

                    if (api) {

                        if (relative != basepath && (new RegExp("^" + basepath + "$", "i")).test(path)) {
                            windowLocation.href = relative;
                        }

                        if ((new RegExp("^" + basepath + "$", "i")).test(path + '/')) {
                            windowLocation.href = basepath;
                        } else if (!(new RegExp("^" + basepath, "i")).test(path)) {
                            windowLocation.href = path.replace(/^\//, basepath) + search;
                        }
                    } else if (path != basepath) {
                        windowLocation.href = basepath + '#' + path.
                            replace(new RegExp("^" + basepath, "i"), sets["type"]) + search + windowLocation.hash;
                    }
                }
            }

            History = createStaticObject(History, VBInc ? HistoryAccessors : windowHistory.state === undefined ? {
                // Safari does not support the built-in object state
                state: HistoryAccessors.state,
                // add a location object inside the object History
                location: HistoryAccessors.location
            } : {
                // for all other browsers that work correctly with the history
                location: HistoryAccessors.location
            });

            Location = createStaticObject(Location, LocationAccessors);

            // overwrite addEventListener/attachEvent
            window[_a] = function(event, listener, capture) {

                if (eventsList[event]) {
                    eventsList[event].push(listener);
                    if (!api && eventsListPopState === eventsList[event]) {
                        fireInitialState();
                    }
                } else {
                    // FireFox support non-standart four argument aWantsUntrusted
                    // https://github.com/devote/HTML5-History-API/issues/13
                    if (arguments.length > 3) {
                        addEvent(event, listener, capture, arguments[3]);
                    } else {
                        addEvent(event, listener, capture);
                    }
                }
            }

            // overwrite removeEventListener/detachEvent
            window[_r] = function(event, listener, capture) {

                var list = eventsList[event];

                if (list) {
                    for(var i = list.length; --i;) {
                        if (list[i] === listener) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    removeEvent(event, listener, capture);
                }
            }

            // overwrite dispatchEvent/fireEvent
            window[_d] = function(event, eventObject) {

                var list = eventsList[event],
                    winHndl = list === eventsListPopState ? window.onpopstate : window.onhashchange;

                if (list) {
                    eventObject = eventObject || (typeof event == "string" ? window.event : event);
                    try {
                        eventObject && (eventObject.target = window);
                    } catch(_e_) {
                        try {
                            eventObject.srcElement = window;
                        } catch(_e_) {
                        }
                    }
                    if (winHndl) {
                        winHndl.call(window, eventObject);
                    }
                    for(var i = 0, len = list.length; i < len; i++) {
                        list[i].call(window, eventObject);
                    }
                    return True;
                } else {
                    return fireEvent(event, eventObject);
                }
            }

            if (VBInc) {
                // override global History object and onhashchange property in window
                execScript('Public history, onhashchange', 'VBScript');
            }

            if (((!defineProp && !defineGetter) || !createStaticObject(window, {
                "onhashchange": {
                    get: function() {
                        return windowHashChange;
                    },
                    set: function(val) {
                        windowHashChange = val || Null;
                    }
                },
                "onpopstate": {
                    get: function() {
                        return windowPopState;
                    },
                    set: function(val) {
                        if (windowPopState = (val || Null)) {
                            !api && fireInitialState();
                        }
                    }
                }
            }, 1)) && !api) {
                initialStateHandler = setInterval(function() {
                    if (window.onpopstate) {
                        fireInitialState();
                    }
                }, 100);
            }

            if (sets["redirect"]) {
                History["redirect"]();
            }

            if (!api) {
                //
                document[_a](eventPrefix + "click", function(e) {
                    var event = e || window.event,
                        target = event.target || event.srcElement,
                        defaultPrevented = "defaultPrevented" in event ? event.defaultPrevented : event.returnValue === False;

                    if (target && target.nodeName === "A" && !defaultPrevented) {

                        e = normalizeUrl(target.getAttribute("href", 2), True);

                        if (e._hash && e._hash !== "#" && e._hash === e._href.replace(normalizeUrl()._href.split("#").shift(), "")) {

                            history.location.hash = e._hash;

                            e = e._hash.replace(/^#/, '');

                            if ((target = document.getElementById(e)) && target.id === e && target.nodeName === "A") {
                                var rect = target.getBoundingClientRect();
                                window.scrollTo((documentElement.scrollLeft || 0),
                                    rect.top + (documentElement.scrollTop || 0) - (documentElement.clientTop || 0));
                            }

                            if (event.preventDefault) {
                                event.preventDefault();
                            } else {
                                event.returnValue = false;
                            }
                        }
                    }
                }, False);
            } else {
                addEvent(eventPrefix + "load", function() {
                    setTimeout(function() {
                        initialFire = 0
                    }, 0);
                }, False);
            }

            return change;
        })();

    var pushState = function(state, title, url, replace) {

        var
            stateObject = historyStorage(),
            currentHref = normalizeUrl()._href,
            urlObject = url && normalizeUrl(url);

        url = urlObject ? urlObject._href : currentHref;

        if (replace && stateObject[currentHref]) {
            delete stateObject[currentHref];
        }

        if ((!api || initialState) && sessionStorage && state) {
            stateObject[url] = state;
            historyStorage(stateObject);
            state = Null;
        }

        if (historyPushState && historyReplaceState) {
            if (replace) {
                historyReplaceState.call(History, state, title, url);
            } else {
                historyPushState.call(History, state, title, url);
            }
        } else if (urlObject && urlObject._relative != normalizeUrl()._relative) {
            skipHashChange = 1;
            if (replace) {
                windowLocation.replace("#" + urlObject._special);
            } else {
                windowLocation.hash = urlObject._special;
            }
        }
    }

    History.replaceState = function(state, title, url) {
        pushState(state, title, url, 1);
    }

    if (VBInc) {
        // replace the original History object in IE
        window.history = History;

        // If IE version 7 or lower to the enable iframe navigation
        (function(cookie, currentHref) {

            if (!iframe) return;

            var hashCheckerHandler,

                checker = function() {
                    var href = normalizeUrl()._href;
                    if (currentHref != href) {
                        hashChanged({
                            oldURL: currentHref,
                            newURL: currentHref = href
                        });
                    }
                }

            // starting interval for check hash
            hashCheckerHandler = setInterval(checker, 100);

            iframe.src = "javascript:true;";
            iframe = documentElement.firstChild.appendChild(iframe).contentWindow;

            pushState = function(state, title, url, replace, lfirst) {

                var i = iframe.document,
                    content = ['<script>', 'lfirst=1;', , 'storage=' + JSONStringify(state) + ';', '</script>'],
                    urlObject = url && normalizeUrl(url);

                if (!urlObject) {
                    iframe["storage"] = state;
                    return;
                }

                if (!lfirst) {
                    clearInterval(hashCheckerHandler);
                }

                if (replace) {
                    if (iframe["lfirst"]) {
                        history.back();
                        pushState(state, title, urlObject._href, 0, 1);
                    } else {
                        iframe["storage"] = state;
                        windowLocation.replace("#" + urlObject._special);
                    }
                } else if (urlObject._href != currentHref || lfirst) {
                    if (!iframe["lfirst"]) {
                        iframe["lfirst"] = 1;
                        pushState(iframe["storage"], title, currentHref, 0, 1);
                    }
                    content[2] = 'parent.location.hash="' + urlObject._special.replace(/"/g, '\\"') + '";';
                    i.open();
                    i.write(content.join(""));
                    i.close();
                }

                if (!lfirst) {
                    currentHref = normalizeUrl()._href;
                    hashCheckerHandler = setInterval(checker, 100);
                }
            }

            addEvent(eventPrefix + "unload", function() {
                if (iframe["storage"]) {
                    var state = {};
                    state[normalizeUrl()._href] = iframe["storage"];
                    document.cookie = "_historyAPI=" + escape(JSONStringify(state));
                }
                clearInterval(hashCheckerHandler);
            }, False);

            if (cookie.length > 1) {
                cookie = unescape(cookie.pop().split(";").shift());
                try {
                    iframe["storage"] = JSONParse(cookie)[normalizeUrl()._href];
                } catch(_e_) {
                }
            }

            if (!JSON.parse && !JSON.stringify) {
                JSON.parse = JSONParse;
                JSON.stringify = JSONStringify;
                window.JSON = JSON;
            }

        })(document.cookie.split("_historyAPI="), normalizeUrl()._href);

    } else {
        // Add other browsers to emulate variable
        // The object of History, thus, we can learn
        // If the browser has native support for working with history
        window.history["emulate"] = !api;
    }

    History.pushState = pushState;

})(window, true, false, null);