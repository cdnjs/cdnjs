/**
 * @preserve Copyright 2011, Cardinal Path and DigitalInc.
 *
 * GAS - Google Analytics on Steroids
 * https://github.com/CardinalPath/gas
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * Licensed under the GPLv3 license.
 */
(function(window, undefined) {
/**
 * GAS - Google Analytics on Steroids
 *
 * Helper Functions
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * GasHelper singleton class
 *
 * Should be called when ga.js is loaded to get the pageTracker.
 *
 * @constructor
 */
var GasHelper = function () {
    this._setDummyTracker();
};

GasHelper.prototype._setDummyTracker = function () {
    if (!this['tracker']) {
        var trackers = window['_gat']['_getTrackers']();
        if (trackers.length > 0) {
            this['tracker'] = trackers[0];
        }
    }
};

/**
 * Returns true if the element is found in the Array, false otherwise.
 *
 * @param {Array} obj Array to search at.
 * @param {object} item Item to search form.
 * @return {boolean} true if contains.
 */
GasHelper.prototype.inArray = function (obj, item) {
    if (obj && obj.length) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] === item) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Removes special characters and Lowercase String
 *
 * @param {string} str to be sanitized.
 * @param {boolean} strict_opt If we should remove any non ascii char.
 * @return {string} Sanitized string.
 */
GasHelper.prototype._sanitizeString = function (str, strict_opt) {
    str = str.toLowerCase()
        .replace(/^\ +/, '')
        .replace(/\ +$/, '')
        .replace(/\s+/g, '_')
        .replace(/[áàâãåäæª]/g, 'a')
        .replace(/[éèêëЄ€]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòôõöøº]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/[ç¢©]/g, 'c');

    if (strict_opt) {
        str = str.replace(/[^a-z0-9_-]/g, '_');
    }
    return str.replace(/_+/g, '_');
};

/**
 * Cross Browser helper to addEventListener.
 *
 * ga_next.js currently have a _addEventListener directive. So _gas will
 * allways prefer that if available, and will use this one only as a fallback
 *
 * @param {HTMLElement} obj The Element to attach event to.
 * @param {string} evt The event that will trigger the binded function.
 * @param {function(event)} ofnc The function to bind to the element.
 * @param {boolean} bubble true if event should be fired at bubble phase.
 * Defaults to false. Works only on W3C compliant browser. MSFT don't support
 * it.
 * @return {boolean} true if it was successfuly binded.
 */
GasHelper.prototype._addEventListener = function (obj, evt, ofnc, bubble) {
    var fnc = function (event) {
        if (!event || !event.target) {
            event = window.event;
            event.target = event.srcElement;
        }
        return ofnc.call(obj, event);
    };
    // W3C model
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, !!bubble);
        return true;
    }
    // M$ft model
    else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    // Browser doesn't support W3C or M$ft model. Time to go old school
    else {
        evt = 'on' + evt;
        if (typeof obj[evt] === 'function') {
            // Object already has a function on traditional
            // Let's wrap it with our own function inside another function
            fnc = (function (f1, f2) {
                return function () {
                    f1.apply(this, arguments);
                    f2.apply(this, arguments);
                };
            }(obj[evt], fnc));
        }
        obj[evt] = fnc;
        return true;
    }
};

/**
 * Cross Browser Helper to emulate jQuery.live
 *
 * Binds to the document root. Listens to all events of the specific type.
 * If event don't bubble it won't catch
 */
GasHelper.prototype._liveEvent = function (tag, evt, ofunc) {
    var gh = this;
    tag = tag.toUpperCase();
    tag = tag.split(',');

    gh._addEventListener(document, evt, function (me) {
        for (var el = me.target; el.nodeName !== 'HTML';
            el = el.parentNode)
        {
            if (gh.inArray(tag, el.nodeName) || el.parentNode === null) {
                break;
            }
        }
        if (el && gh.inArray(tag, el.nodeName)) {
            ofunc.call(el, me);
        }

    }, true);
};

/**
 * Cross Browser DomReady function.
 *
 * Inspired by: http://dean.edwards.name/weblog/2006/06/again/#comment367184
 *
 * @param {function(Event)} callback DOMReady callback.
 * @return {boolean} Ignore return value.
 */
GasHelper.prototype._DOMReady = function (callback) {
    var scp = this;
    function cb() {
        if (cb.done) return;
        cb.done = true;
        callback.apply(scp, arguments);
    }
    if (/^(interactive|complete)/.test(document.readyState)) return cb();
    this._addEventListener(document, 'DOMContentLoaded', cb, false);
    this._addEventListener(window, 'load', cb, false);
};

/**
 * GAS - Google Analytics on Steroids
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Google Analytics original _gaq.
 *
 * This never tries to do something that is not supposed to. So it won't break
 * in the future.
 */
window['_gaq'] = window['_gaq'] || [];

var _prev_gas = window['_gas'] || [];

// Avoid duplicate definition
if (_prev_gas._accounts_length >= 0) {
    return;
}

//Shortcuts, these speed up and compress the code
var document = window.document,
    toString = Object.prototype.toString,
    hasOwn = Object.prototype.hasOwnProperty,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    trim = String.prototype.trim,
    sindexOf = String.prototype.indexOf,
    url = document.location.href,
    documentElement = document.documentElement;

/**
 * GAS Sigleton
 * @constructor
 */
function GAS() {
    var self = this;
    self['version'] = '1.10.1';
    self._accounts = {};
    self._accounts_length = 0;
    self._queue = _prev_gas;
    self._default_tracker = '_gas1';
    self.gh = {};
    self._hooks = {
        '_addHook': [self._addHook]
    };
    // Need to be pushed to make sure tracker is done
    // Sets up helpers, very first thing pushed into gas
    self.push(function () {
        self.gh = new GasHelper();
    });
}

/**
 * First standard Hook that is responsible to add next Hooks
 *
 * _addHook calls always reurn false so they don't get pushed to _gaq
 * @param {string} fn The function you wish to add a Hook to.
 * @param {function()} cb The callback function to be appended to hooks.
 * @return {boolean} Always false.
 */
GAS.prototype._addHook = function (fn, cb) {
    if (typeof fn === 'string' && typeof cb === 'function') {
        if (typeof _gas._hooks[fn] === 'undefined') {
            _gas._hooks[fn] = [];
        }
        _gas._hooks[fn].push(cb);
    }
    return false;
};

/**
 * Construct the correct account name to be used on _gaq calls.
 *
 * The account name for the first unamed account pushed to _gas is the standard
 * account name. It's pushed without the account name to _gaq, so if someone
 * calls directly _gaq it works as expected.
 * @param {string} acct Account name.
 * @return {string} Correct account name to be used already with trailling dot.
 */
function _build_acct_name(acct) {
    return acct === _gas._default_tracker ? '' : acct + '.';
}

function _gaq_push(arr) {
    if (_gas.debug_mode) {
        try {
            console.log(arr);
        }catch (e) {}
    }
    return window['_gaq'].push(arr);
}

/**
 * Everything pushed to _gas is executed by this call.
 *
 * This function should not be called directly. Instead use _gas.push
 * @return {number} This is the same return as _gaq.push calls.
 */
GAS.prototype._execute = function () {
    var args = slice.call(arguments),
        self = this,
        sub = args.shift(),
        gaq_execute = true,
        i, foo, hooks, acct_name, repl_sub, return_val = 0;

    if (typeof sub === 'function') {
        // Pushed functions are executed right away
        return _gaq_push(
            (function (s, gh) {
                return function () {
                    // pushed functions receive helpers through this object
                    s.call(gh);
                };
            }(sub, self.gh))
        );

    } else if (typeof sub === 'object' && sub.length > 0) {
        foo = sub.shift();

        if (sindexOf.call(foo, '.') >= 0) {
            acct_name = foo.split('.')[0];
            foo = foo.split('.')[1];
        } else {
            acct_name = undefined;
        }

        // Execute hooks
        hooks = self._hooks[foo];
        if (hooks && hooks.length > 0) {
            for (i = 0; i < hooks.length; i++) {
                try {
                    repl_sub = hooks[i].apply(self.gh, sub);
                    if (repl_sub === false) {
                        // Returning false from a hook cancel the call
                        gaq_execute = false;
                    } else {
                        if (repl_sub && repl_sub.length > 0) {
                            // Returning an array changes the call parameters
                            sub = repl_sub;
                        }
                    }
                } catch (e) {
                    if (foo !== '_trackException') {
                        self.push(['_trackException', e]);
                    }
                }
            }
        }
        // Cancel execution on _gaq if any hook returned false
        if (gaq_execute === false) {
            return 1;
        }
        // Intercept _setAccount calls
        if (foo === '_setAccount') {

            for (i in self._accounts) {
                if (self._accounts[i] === sub[0]) {
                    // Repeated account
                    if (acct_name === undefined) {
                        return 1;
                    }
                }
            }
            acct_name = acct_name || '_gas' +
                String(self._accounts_length + 1);
            // Force that the first unamed account is _gas1
            if (typeof self._accounts['_gas1'] === 'undefined' &&
                sindexOf.call(acct_name, '_gas') !== -1) {
                acct_name = '_gas1';
            }
            self._accounts[acct_name] = sub[0];
            self._accounts_length += 1;
            acct_name = _build_acct_name(acct_name);
            return_val = _gaq_push([acct_name + foo, sub[0]]);
            // Must try t get the tracker if it's a _setAccount
            self.gh._setDummyTracker();
            return return_val;
        }

        // Intercept functions that can only be called once.
        if (foo === '_link' || foo === '_linkByPost' || foo === '_require' ||
            foo === '_anonymizeIp')
        {
            args = slice.call(sub);
            args.unshift(foo);
            return _gaq_push(args);
        }

        // If user provides account than trigger event for just that account.
        var acc_foo;
        if (acct_name && self._accounts[acct_name]) {
            acc_foo = _build_acct_name(acct_name) + foo;
            args = slice.call(sub);
            args.unshift(acc_foo);
            return _gaq_push(args);
        }

        // Call Original _gaq, for all accounts
        if (self._accounts_length > 0) {
            for (i in self._accounts) {
                if (hasOwn.call(self._accounts, i)) {
                    acc_foo = _build_acct_name(i) + foo;
                    args = slice.call(sub);
                    args.unshift(acc_foo);
                    return_val += _gaq_push(args);
                }
            }
        } else {
            // If there are no accounts we just push it to _gaq
            args = slice.call(sub);
            args.unshift(foo);
            return _gaq_push(args);
        }
        return return_val ? 1 : 0;
    }
};

/**
 * Standard method to execute GA commands.
 *
 * Everything pushed to _gas is in fact pushed back to _gaq. So Helpers are
 * ready for hooks. This creates _gaq as a series of functions that call
 * _gas._execute() with the same arguments.
 */
GAS.prototype.push = function () {
    var self = this;
    var args = slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        (function (arr, self) {
            window['_gaq'].push(function () {
                self._execute.call(self, arr);
            });
        }(args[i], self));
    }
};

/**
 * _gas main object.
 *
 * It's supposed to be used just like _gaq but here we extend it. In it's core
 * everything pushed to _gas is run through possible hooks and then pushed to
 * _gaq
 */
window['_gas'] = _gas = new GAS();


/**
 * Hook for _trackException
 *
 * Watchout for circular calls
 */
_gas.push(['_addHook', '_trackException', function (exception, message) {
    _gas.push(['_trackEvent',
        'Exception ' + (exception.name || 'Error'),
        message || exception.message || exception,
        url
    ]);
    return false;
}]);

/**
 * Hook to enable Debug Mode
 */
_gas.push(['_addHook', '_setDebug', function (set_debug) {
    _gas.debug_mode = !!set_debug;
}]);

/**
 * Hook to Remove other Hooks
 *
 * It will remove the last inserted hook from a _gas function.
 *
 * @param {string} func _gas Function Name to remove Hooks from.
 * @return {boolean} Always returns false.
 */
_gas.push(['_addHook', '_popHook', function (func) {
    var arr = _gas._hooks[func];
    if (arr && arr.pop) {
        arr.pop();
    }
    return false;
}]);

/**
 * Hook to set the default tracker.
 *
 * The default tracker is the nameless tracker that is pushed into _gaq_push
 */
_gas.push(['_addHook', '_gasSetDefaultTracker', function (tname) {
    _gas._default_tracker = tname;
    return false;
}]);
/**
 * This is kept just for backward compatibility since it's now supported
 * natively in _gaq.
 */
_gas.push(['_addHook', '_trackPageview', function () {
    var args = slice.call(arguments);
    if (args.length >= 2 &&
        typeof args[0] === 'string' && typeof args[1] === 'string')
    {
        return [{
            'page': args[0],
            'title': args[1]
        }];
    }
    return args;
}]);

/**
 * GAS - Google Analytics on Steroids
 *
 * Download Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Extracts the file extension and check it against a list
 *
 * Will extract the extensions from a url and check if it matches one of
 * possible options. Used to verify if a url corresponds to a download link.
 *
 * @this {GasHelper} GA Helper object.
 * @param {string} src The url to check.
 * @param {Array} extensions an Array with strings containing the possible
 * extensions.
 * @return {boolean|string} the file extension or false.
 */
function _checkFile(src, extensions) {
    if (typeof src !== 'string') {
        return false;
    }
    var ext = src.split('?')[0];
    ext = ext.split('.');
    ext = ext[ext.length - 1];
    if (ext && this.inArray(extensions, ext)) {
        return ext;
    }
    return false;
}

/**
 * Register the event to listen to downloads
 *
 * @this {GasHelper} GA Helper object.
 * @param {Array|object} opts List of possible extensions for download
 * links.
 */
var _trackDownloads = function (opts) {
    var gh = this;

    if (!gh._downloadTracked) {
        gh._downloadTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    if (!opts) {
        opts = {'extensions': []};
    } else if (typeof opts === 'string') {
        // support legacy opts as String of extensions
        opts = {'extensions': opts.split(',')};
    } else if (opts.length >= 1) {
        // support legacy opts Array of extensions
        opts = {'extensions': opts};
    }
    opts['category'] = opts['category'] || 'Download';

    var ext = 'xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip';
    ext += ',rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv';
    ext = ext.split(',');
    opts['extensions'] = opts['extensions'].concat(ext);

    gh._liveEvent('a', 'mousedown', function (e) {
        var el = this;
        if (el.href) {
            var ext = _checkFile.call(gh,
                el.href, opts['extensions']
            );
            if (ext) {
                _gas.push(['_trackEvent',
                    opts['category'], ext, el.href
                ]);
            }
        }
    });
    return false;
};

/**
 * GAA Hook, receive the extensions to extend default extensions. And trigger
 * the binding of the events.
 *
 * @param {string|Array|object} opts GAs Options. Also backward compatible
 * with array or string of extensions.
 */
_gas.push(['_addHook', '_gasTrackDownloads', _trackDownloads]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackDownloads', _trackDownloads]);

/**
 * GAS - Google Analytics on Steroids
 *
 * Ecommerce Meta
 *
 * Copyright 2012, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

function _gasMetaEcommerce() {
    var i, meta,
        f_trans = 0,
        f_item = 0,
        metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name === 'ga_trans') {
            // Fire transaction
            meta = metas[i].content.split('^');
            if (meta.length < 3) {
                // 3 is the minimum for transaction
                break;
            }
            // Add default values for remaining params
            while (meta.length < 8) {
                meta.push('');
            }
            _gas.push(['_addTrans',
                    meta[0],
                    meta[1],
                    meta[2],
                    meta[3],
                    meta[4],
                    meta[5],
                    meta[6],
                    meta[7]
                    ]);
            f_trans++;
        }
        else if (metas[i].name === 'ga_item') {
            // Fire item
            meta = metas[i].content.split('^');
            if (meta.length === 6) {
                _gas.push(['_addItem',
                        meta[0],
                        meta[1],
                        meta[2],
                        meta[3],
                        meta[4],
                        meta[5]
                        ]);
                f_item++;
            }
        }
    }
    if (f_trans > 0 && f_item > 0) {
        _gas.push(['_trackTrans']);
        //_gas.push(['_clearTrans']);
    }
}

_gas.push(['_addHook', '_gasMetaEcommerce', _gasMetaEcommerce]);

/**
 * Hook to sanity check trackEvents
 *
 * The value is rounded and parsed to integer.
 * Negative values are sent as zero.
 * If val is NaN than it is sent as zero.
 */
_gas.push(['_addHook', '_trackEvent', function () {
    var args = slice.call(arguments);
    if (args[3]) {
        args[3] = (args[3] < 0 ? 0 : Math.round(args[3])) || 0;
    }
    return args;
}]);

/**
 * GAS - Google Analytics on Steroids
 *
 * Form Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * get the form name for a specific elemet
 *
 * @param {DOMElemet} el Dom Element.
 * @return {String} Form Name or Id.
 */
function getFormName(el) {
    while (el && el.nodeName !== 'HTML') {
        if (el.nodeName === 'FORM') {break; }
        el = el.parentNode;
    }
    if (el.nodeName === 'FORM') {
        return el.name || el.id || 'none';
    }
    return 'none';
}

var _gasTrackForms = function (opts) {
    if (!this._formTracked) {
        this._formTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    var scp = this;
    if (typeof opts !== 'object') {
        opts = {};
    }

    // Make sure required attrs are defined or fallback to default
    opts['category'] = opts['category'] || 'Form Tracking';
    //opts['live'] = opts['live'] || true; //Ignored

    var trackField = function (e) {
        var el = e.target,
            el_name = el.name || el.id || el.type || el.nodeName,
            form_name = getFormName(el),
            action = 'form (' + form_name + ')',
            label = el_name + ' (' + e.type + ')';

        _gas.push(['_trackEvent', opts['category'], action, label]);
    };

    scp._DOMReady(function () {
        var changeTags = ['input', 'select', 'textarea', 'hidden'];
        var submitTags = ['form'];
        var elements = [];
        var i, j;
        for (i = 0; i < changeTags.length; i++) {
            elements = document.getElementsByTagName(changeTags[i]);
            for (j = 0; j < elements.length; j++) {
                scp._addEventListener(elements[j], 'change', trackField);
            }
        }
        for (i = 0; i < submitTags.length; i++) {
            elements = document.getElementsByTagName(submitTags[i]);
            for (j = 0; j < elements.length; j++) {
                scp._addEventListener(elements[j], 'submit', trackField);
            }
        }
    });
};

_gas.push(['_addHook', '_gasTrackForms', _gasTrackForms]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackForms', _gasTrackForms]);
/**
 * GAS - Google Analytics on Steroids
 *
 * HTML5 Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Triggers the actual video/audio GA events
 *
 * To be used as a callback for the HTML5 media events
 *
 * @param {Event} e A reference to the HTML event fired.
 * @this {HTMLMediaElement} The HTML element firing the event
 */
function _trackMediaElement(e) {
    _gas.push(['_trackEvent', this.tagName, e.type, this.currentSrc]);
}

/**
 * Triggers the HTML5 Video Tracking on the page

 * @param {String} tag Either 'audio' or 'video'.
 * @this {GasHelper} GA Helper object.
 */
var _trackMedia = function (tag) {
    var self = this;
    self._liveEvent(tag, 'play', _trackMediaElement);
    self._liveEvent(tag, 'pause', _trackMediaElement);
    self._liveEvent(tag, 'ended', _trackMediaElement);
};

var _trackVideo = function () {
    if (!this._videoTracked) {
        this._videoTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    _trackMedia.call(this, 'video');
};

var _trackAudio = function () {
    if (!this._audioTracked) {
        this._audioTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    _trackMedia.call(this, 'audio');
};

_gas.push(['_addHook', '_gasTrackVideo', _trackVideo]);
_gas.push(['_addHook', '_gasTrackAudio', _trackAudio]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackVideo', _trackVideo]);
_gas.push(['_addHook', '_trackAudio', _trackAudio]);

/**
 * GAS - Google Analytics on Steroids
 *
 * HTML Markup Plugin
 *
 * Copyright 2012, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Sets Default pagename and Custom Vars based on Meta
 *
 * If a meta name='ga_vpv' is availalbe on the page use that as a page
 * replacement if the pageview is not passed as parameter.
 *
 * If meta name="ga_custom_var" the 4 values for a custom var must be on
 * content separated by a caret (^).
 */
function _gasMeta() {
    var i, meta,
        metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name === 'ga_vpv') {
            meta = metas[i].content;
            (function (vpv) {
                window._gas.push(['_addHook', '_trackPageview', function (p) {
                    if (p === undefined) {
                        return [vpv];
                    }
                }]);
            }(meta));
        } else if (metas[i].name === 'ga_custom_var') {
            meta = metas[i].content.split('^');
            if (meta.length === 4) {
                window._gas.push(['_setCustomVar',
                    parseInt(meta[0], 10),
                    meta[1],
                    meta[2],
                    parseInt(meta[3], 10)
                ]);
            }
        }
    }
}

/**
 * Listens to all clicks and looks for a tagged element on it.
 *
 * Events have the following params:
 *   x-ga-event-category (required) – The category of the event specified in
 * the solution design document
 *   x-ga-event-action (required) – The action of the event specified in the
 * solution design document
 *   x-ga-event-label (optional) – The label of the event specified in the
 * solution design document.  If no label is specified in the solution design
 * document, this attribute can be omitted
 *   x-ga-event-value (optional) – The value (integer) of the event specified
 * in the solution design document.  If no value is specified in the solution
 * design document, this attribute can be omitted
 *   x-ga-event-noninteractive (optional) – Boolean (true/false) value
 * specified in the solution design document.  If the non-interactive value is
 * not specified, this attribute can be omitted
 *
 * Social Actions have the following params:
 *   x-ga-social-network (required) – The network of the social interaction
 * specified in the solution design document
 *   x-ga-social-action (required) – The action of the social interaction
 * specified in the solution design document
 *   x-ga-social-target (optional) – The target of the social interaction
 * specified in the solution design document.  If no target is specified, this
 * attribute can be omitted
 *   x-ga-social-pagepath (optional) – The page path of the social interaction
 * specified in the solution design document.  If no page path is specified,
 * this attribute can be omitted
 */
function _gasHTMLMarkup() {
    var gh = this;

    gh._addEventListener(document, 'mousedown', function (me) {
        var el;
        for (el = me.target; el.nodeName !== 'HTML';
             el = el.parentNode) {
            if (el.getAttribute('x-ga-event-category')) {
                // Event element clicked, fire the _trackEvent
                window._gas.push(['_trackEvent',
                  el.getAttribute('x-ga-event-category'),
                  el.getAttribute('x-ga-event-action'),
                  el.getAttribute('x-ga-event-label') || undefined,
                  parseInt(el.getAttribute('x-ga-event-value'), 10) || 0,
                  el.getAttribute('x-ga-event-noninteractive') === 'true' ? true : false
                ]);
            }
            if (el.getAttribute('x-ga-social-network')) {
                // Social Action Clicked fire _trackSocial
                window._gas.push(['_trackSocial',
                  el.getAttribute('x-ga-social-network'),
                  el.getAttribute('x-ga-social-action'),
                  el.getAttribute('x-ga-social-target') || undefined,
                  el.getAttribute('x-ga-social-pagepath') || undefined
                ]);
            }

            if (el.parentNode === null) {
                break;
            }
        }
    }, true);
}

_gas.push(['_addHook', '_gasMeta', _gasMeta]);
_gas.push(['_addHook', '_gasHTMLMarkup', _gasHTMLMarkup]);

/**
 * GAS - Google Analytics on Steroids
 *
 * MailTo tracking plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 */

/**
 * GAS plugin to track mailto: links
 *
 * @param {object} opts GAS Options.
 */
var _gasTrackMailto = function (opts) {
    if (!this._mailtoTracked) {
        this._mailtoTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }

    if (!opts) {
        opts = {};
    }
    opts['category'] = opts['category'] || 'Mailto';

    this._liveEvent('a', 'mousedown', function (e) {
        var el = e.target;
        if (el && el.href && el.href.toLowerCase &&
          sindexOf.call(el.href.toLowerCase(), 'mailto:') === 0) {
            _gas.push(['_trackEvent', opts['category'], el.href.substr(7)]);
        }
    });
    return false;
};
_gas.push(['_addHook', '_gasTrackMailto', _gasTrackMailto]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackMailto', _gasTrackMailto]);

/**
 * GAS - Google Analytics on Steroids
 *
 * Max-Scroll Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

var _maxScrollOpts;

/**
 * Get current browser viewpane heigtht
 *
 * @return {number} height.
 */
function _get_window_height() {
    return window.innerHeight || documentElement.clientHeight ||
        document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 *
 * @return {number} YScroll.
 */
function _get_window_Yscroll() {
    return window.pageYOffset || document.body.scrollTop ||
        documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 *
 * @return {number} Current document height.
 */
function _get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, documentElement.clientHeight || 0
    );
}


/**
 * Get current vertical scroll percentage
 *
 * @return {number} Current vertical scroll percentage.
 */
function _get_scroll_percentage() {
    return (
        (_get_window_Yscroll() + _get_window_height()) / _get_doc_height()
    ) * 100;
}

var _t = null;
var _max_scroll = 0;
function _update_scroll_percentage(now) {
    if (_t) {
        clearTimeout(_t);
    }
    if (now === true) {
        _max_scroll = Math.max(_get_scroll_percentage(), _max_scroll);
        return;
    }
    _t = setTimeout(function () {
        _max_scroll = Math.max(_get_scroll_percentage(), _max_scroll);
    }, 400);
}

function _sendMaxScroll() {
    _update_scroll_percentage(true);
    _max_scroll = Math.floor(_max_scroll);
    if (_max_scroll <= 0 || _max_scroll > 100) return;
    var bucket = (_max_scroll > 10 ? 1 : 0) * (
        Math.floor((_max_scroll - 1) / 10) * 10 + 1
    );
    bucket = String(bucket) + '-' +
        String(Math.ceil(_max_scroll / 10) * 10);

    _gas.push(['_trackEvent',
        _maxScrollOpts['category'],
        url,
        bucket,
        Math.floor(_max_scroll),
        true // non-interactive
    ]);
}

/**
 * Tracks the max Scroll on the page.
 *
 * @param {object} opts GAS Options to be used.
 * @this {GasHelper} The Ga Helper object
 */
function _trackMaxScroll(opts) {
    if (!this._maxScrollTracked) {
        this._maxScrollTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    _maxScrollOpts = opts || {};
    _maxScrollOpts['category'] = _maxScrollOpts['category'] || 'Max Scroll';

    this._addEventListener(window, 'scroll', _update_scroll_percentage);
    this._addEventListener(window, 'beforeunload', _sendMaxScroll);
}

_gas.push(['_addHook', '_gasTrackMaxScroll', _trackMaxScroll]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackMaxScroll', _trackMaxScroll]);

/**
 * GAS - Google Analytics on Steroids
 *
 * Multi-Domain Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Private variable to store allowAnchor choice
 */
_gas._allowAnchor = false;

/**
 * _setAllowAnchor Hook to store choice for easier use of Anchor
 *
 * This stored value is used on _getLinkerUrl, _link and _linkByPost so it's
 * used the same by default
 */
_gas.push(['_addHook', '_setAllowAnchor', function (val) {
    _gas._allowAnchor = !!val;
}]);

/**
 * _link Hook to use stored allowAnchor value.
 */
_gas.push(['_addHook', '_link', function (url, use_anchor) {
    if (use_anchor === undefined) {
        use_anchor = _gas._allowAnchor;
    }
    return [url, use_anchor];
}]);

/**
 * _linkByPost Hook to use stored allowAnchor value.
 */
_gas.push(['_addHook', '_linkByPost', function (url, use_anchor) {
    if (use_anchor === undefined) {
        use_anchor = _gas._allowAnchor;
    }
    return [url, use_anchor];
}]);

/**
 * Store all domains pushed by _setDomainName that don't match current domain.
 *
 * @type {Array.<string>}
 */
var _external_domains = [];

/**
 * Store the internal domain name
 *
 * @type string
 */
var _internal_domain;

/**
 * _setDomainName Hook to add pushed domains to _external_domains if it doesn't
 * match current domain.
 *
 * This Hook let you call _setDomainName multiple times. So _gas will only
 * apply the one that matches the current domain and the other ones will be
 * used to track external domains with cookie data.
 */
_gas.push(['_addHook', '_setDomainName', function (domainName) {
    if (sindexOf.call('.' + document.location.hostname, domainName) < 0) {
        _external_domains.push(domainName);
        return false;
    }
    _internal_domain = domainName;
}]);

/**
 * _addExternalDomainName Hook.
 *
 * This hook let you add external domains so that urls on current page to this
 * domain are marked to send cookies.
 * You should use _setDomainName for this in most of the cases.
 */
_gas.push(['_addHook', '_addExternalDomainName', function (domainName) {
    _external_domains.push(domainName);
    return false;
}]);

/**
 * Function to mark links on the current pages to send links
 *
 * This function is used to make it easy to implement multi-domain-tracking.
 * @param {string} event_used Should be 'now', 'click' or 'mousedown'. Default
 * 'click'.
 * @this {GasHelper} GAS Helper functions
 * @return {boolean} Returns false to avoid this is puhed to _gaq.
 */
function track_links(event_used) {
    if (!this._multidomainTracked) {
        this._multidomainTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    var internal = document.location.hostname,
        gh = this,
        i, j, el,
        links = document.getElementsByTagName('a');
    if (event_used !== 'now' && event_used !== 'mousedown') {
        event_used = 'click';
    }
    for (i = 0; i < links.length; i++) {
        el = links[i];
        if (sindexOf.call(el.href, 'http') === 0) {
            // Check to see if it's a internal link
            if (el.hostname === internal ||
              sindexOf.call(el.hostname, _internal_domain) >= 0) {
                continue;
            }
            // Tag external Links either now or on mouse event.
            for (j = 0; j < _external_domains.length; j++) {
                if (sindexOf.call(el.hostname, _external_domains[j]) >= 0) {
                    if (event_used === 'now') {
                        el.href = gh['tracker']['_getLinkerUrl'](
                            el.href,
                            _gas._allowAnchor
                        );
                    } else {
                        if (event_used === 'click') {
                            this._addEventListener(el, event_used, function (e) {
                                if (this.target && this.target === '_blank') {
                                    window.open(
                                        gh['tracker']['_getLinkerUrl'](
                                            this.href, _gas._allowAnchor
                                        )
                                    );
                                } else {
                                    _gas.push(
                                        ['_link', this.href, _gas._allowAnchor]
                                    );
                                }
                                if (e.preventDefault)
                                    e.preventDefault();
                                else
                                    e.returnValue = false;
                                return false; //needed for ie7
                            });
                        } else {
                            this._addEventListener(el, event_used, function () {
                                this.href = gh['tracker']['_getLinkerUrl'](
                                    this.href,
                                    _gas._allowAnchor
                                );
                            });
                        }
                    }
                }
            }
        }
    }
    return false;
}

var _gasMultiDomain = function () {
    var gh = this;
    var args = slice.call(arguments);
    if (gh && gh._DOMReady) {
        gh._DOMReady(function () {
            track_links.apply(gh, args);
        });
    }
};

/**
 * Registers Hook to _setMultiDomain
 */
_gas.push(['_addHook', '_gasMultiDomain', _gasMultiDomain]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_setMultiDomain', _gasMultiDomain]);

/**
 * GAS - Google Analytics on Steroids
 *
 * Outbound Link Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Triggers the Outbound Link Tracking on the page
 *
 * @this {object} GA Helper object.
 * @param {object} opts Custom options for Outbound Links.
 */
var _gasTrackOutboundLinks = function (opts) {
    if (!this._outboundTracked) {
        this._outboundTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    var gh = this;
    if (!opts) {
        opts = {};
    }
    opts['category'] = opts['category'] || 'Outbound';

    gh._liveEvent('a', 'mousedown', function (e) {
        var l = this;
        if (
            (l.protocol === 'http:' || l.protocol === 'https:') &&
            sindexOf.call(l.hostname, document.location.hostname) === -1)
        {
            var path = (l.pathname + l.search + ''),
                utm = sindexOf.call(path, '__utm');
            if (utm !== -1) {
                path = path.substring(0, utm);
            }
            _gas.push(['_trackEvent',
                opts['category'],
                l.hostname,
                path
            ]);
        }

    });
};

_gas.push(['_addHook', '_gasTrackOutboundLinks', _gasTrackOutboundLinks]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackOutboundLinks', _gasTrackOutboundLinks]);


/**
 * GAS - Google Analytics on Steroids
 *
 * Vimeo Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

var _vimeoTimeTriggers = [];
var _vimeoPoolMaps = {};

/**
 * Cached urls for vimeo players on the page.
 *
 * @type {object}
 */
var _vimeo_urls = {};

function _vimeoPool(data) {
    if (!_vimeoPoolMaps[data.player_id]) {
        _vimeoPoolMaps[data.player_id] = {};
        _vimeoPoolMaps[data.player_id].timeTriggers = slice.call(
            _vimeoTimeTriggers
        );
    }
    if (_vimeoPoolMaps[data.player_id].timeTriggers.length > 0) {
        if (data.data.percent * 100 >=
            _vimeoPoolMaps[data.player_id].timeTriggers[0])
        {
            var action = _vimeoPoolMaps[data.player_id].timeTriggers.shift();
            _gas.push([
                '_trackEvent',
                'Vimeo Video',
                action + '%',
                _vimeo_urls[data.player_id]
            ]);
        }
    }
}

/**
 * Helper function to post messages to a vimeo player
 *
 * @param {string} method The method from the vimeo API.
 * @param {string} params to be passed as the value of the method.
 * @param {object} target Iframe DOM Element for the Vimeo player.
 * @return {boolean} true if it worked or false otherwise.
 */
function _vimeoPostMessage(method, params, target) {
    if (!target.contentWindow || !target.contentWindow.postMessage || !JSON) {
        return false;
    }
    var url = target.getAttribute('src').split('?')[0],
        data = JSON.stringify({
            method: method,
            value: params
        });
    target.contentWindow.postMessage(data, url);
    return true;
}


/**
 * Flag that indicates if the global listener has been bind to the window
 * @type {boolean}
 */
var _has_vimeo_window_event = false;

var _vimeoOpts;

/**
 * postMessage Listener
 * @param {Object} event The Vimeo API return event.
 */
function _vimeoPostMessageListener(event) {
    if (sindexOf.call(event.origin, '//player.vimeo.com') > -1) {
        var data = JSON.parse(event.data);
        if (data.event === 'ready') {
            _trackVimeo.call(_gas.gh); // Force rerun since a player is ready
        } else if (data.method) {
            if (data.method === 'getVideoUrl') {
                _vimeo_urls[data.player_id] = data.value;
            }
        } else if (data.event === 'playProgress') {
            _vimeoPool(data);
        } else {
            _gas.push(['_trackEvent', _vimeoOpts['category'],
                data.event, _vimeo_urls[data.player_id]]);
        }
    }

}

/**
 * Triggers the Vimeo Tracking on the page
 *
 * Only works for the Universal Tag from Vimeo (iframe). The video must have
 * the parameter api=1 on the url in order to make the tracking work.
 *
 * @this {GasHelper} GA Helper object.
 */
function _trackVimeo() {
    var iframes = document.getElementsByTagName('iframe');
    var vimeo_videos = 0;
    var player_id;
    var player_src;
    var separator;
    var force = _vimeoOpts['force'];
    var partials = _vimeoOpts['percentages'];
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//player.vimeo.com') > -1) {
            player_id = 'gas_vimeo_' + i;
            player_src = iframes[i].src;
            separator = '?';
            if (sindexOf.call(player_src, '?') > -1) {
                separator = '&';
            }
            if (sindexOf.call(player_src, 'api=1') < 0) {
                if (force) {
                    // Reload the video enabling the api
                    player_src += separator + 'api=1&player_id=' + player_id;
                } else {
                    // We won't track players that don't have api enabled.
                    continue;
                }
            } else {
                if (sindexOf.call(player_src, 'player_id=') < -1) {
                    player_src += separator + 'player_id=' + player_id;
                }
            }
            vimeo_videos++;
            iframes[i].id = player_id;
            if (iframes[i].src !== player_src) {
                iframes[i].src = player_src;
                break; // break to wait until it is ready since we reloaded it.
            }
            // We need to cache the video url since vimeo won't provide it
            // in the event
            _vimeoPostMessage('getVideoUrl', '', iframes[i]);
            _vimeoPostMessage('addEventListener', 'play', iframes[i]);
            _vimeoPostMessage('addEventListener', 'pause', iframes[i]);
            _vimeoPostMessage('addEventListener', 'finish', iframes[i]);
            if (partials) {
                _vimeoTimeTriggers = partials;
                _vimeoPostMessage('addEventListener', 'playProgress',
                    iframes[i]);
            }
        }
    }
    if (vimeo_videos > 0 && _has_vimeo_window_event === false) {
        this._addEventListener(window, 'message',
            _vimeoPostMessageListener, false
        );
        _has_vimeo_window_event = true;
    }
}

var _gasTrackVimeo = function (opts) {
    var gh = this;
    // Support
    if (typeof opts === 'boolean' || opts === 'force') {
        opts = {'force': !!opts};
    }
    opts = opts || {};
    opts['category'] = opts['category'] || 'Vimeo Video';
    opts['percentages'] = opts['percentages'] || [];
    opts['force'] = opts['force'] || false;
    _vimeoOpts = opts;
    gh._DOMReady(function () {
        _trackVimeo.call(gh);
    });
    return false;
};

_gas.push(['_addHook', '_gasTrackVimeo', _gasTrackVimeo]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackVimeo', _gasTrackVimeo]);

/**
 * GAS - Google Analytics on Steroids
 *
 * YouTube Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Array of percentage to fire events.
 */
var _ytTimeTriggers = [];
var _ytOpts;


/**
 * Used to map each vid to a set of timeTriggers and it's pool timer
 */
var _ytPoolMaps = {};

function _ytPool(target, hash) {
    if (_ytPoolMaps[hash] === undefined ||
        _ytPoolMaps[hash].timeTriggers.length <= 0) {
        return false;
    }
    var p = target['getCurrentTime']() / target['getDuration']() * 100;
    if (p >= _ytPoolMaps[hash].timeTriggers[0]) {
        var action = _ytPoolMaps[hash].timeTriggers.shift();
        _gas.push([
            '_trackEvent',
            _ytOpts['category'],
            action + '%',
            target['getVideoUrl']()
        ]);
    }
    _ytPoolMaps[hash].timer = setTimeout(_ytPool, 1000, target, hash);
}

function _ytStopPool(target) {
    var h = target['getVideoUrl']();
    if (_ytPoolMaps[h] && _ytPoolMaps[h].timer) {
        _ytPool(target, h); // Pool one last time before clearing it.
        clearTimeout(_ytPoolMaps[h].timer);
    }
}

function _ytStartPool(target) {
    if (_ytTimeTriggers && _ytTimeTriggers.length) {
        var h = target['getVideoUrl']();
        if (_ytPoolMaps[h]) {
            _ytStopPool(target);
        }else {
            _ytPoolMaps[h] = {};
            _ytPoolMaps[h].timeTriggers = slice.call(_ytTimeTriggers);
        }
        _ytPoolMaps[h].timer = setTimeout(_ytPool, 1000, target, h);
    }
}


/**
 * Called when the Video State changes
 *
 * We are currently tracking only finish, play and pause events
 *
 * @param {Object} event the event passed by the YT api.
 */
function _ytStateChange(event) {
    var action = '';
    switch (event['data']) {
    case 0:
        action = 'finish';
        _ytStopPool(event['target']);
        break;
    case 1:
        action = 'play';
        _ytStartPool(event['target']);
        break;
    case 2:
        action = 'pause';
        _ytStopPool(event['target']);
        break;
    }
    if (action) {
        _gas.push(['_trackEvent',
            _ytOpts['category'], action, event['target']['getVideoUrl']()
        ]);
    }
}

/**
 * Called when the player fires an Error Event
 *
 * @param {Object} event the event passed by the YT api.
 */
function _ytError(event) {
    _gas.push(['_trackEvent',
        _ytOpts['category'],
        'error (' + event['data'] + ')',
        event['target']['getVideoUrl']()
    ]);
}

/**
 * Looks for object/embed youtube videos and migrate them to the iframe method
 *  so it tries to track them
 */
function _ytMigrateObjectEmbed() {
    var objs = document.getElementsByTagName('object');
    var pars, ifr, ytid;
    var r = /(https?:\/\/www\.youtube(-nocookie)?\.com[^\/]*).*\/v\/([^&?]+)/;
    for (var i = 0; i < objs.length; i++) {
        pars = objs[i].getElementsByTagName('param');
        for (var j = 0; j < pars.length; j++) {
            if (pars[j].name === 'movie' && pars[j].value) {
                // Replace the object with an iframe
                ytid = pars[j].value.match(r);
                if (ytid && ytid[1] && ytid[3]) {
                    ifr = document.createElement('iframe');
                    ifr.src = ytid[1] + '/embed/' + ytid[3] + '?enablejsapi=1';
                    ifr.width = objs[i].width;
                    ifr.height = objs[i].height;
                    ifr.setAttribute('frameBorder', '0');
                    ifr.setAttribute('allowfullscreen', '');
                    objs[i].parentNode.insertBefore(ifr, objs[i]);
                    objs[i].parentNode.removeChild(objs[i]);
                    // Since we removed the object the Array changed
                    i--;
                }
                break;
            }
        }
    }
}

/**
 * Triggers the YouTube Tracking on the page
 *
 * Only works for the iframe tag. The video must have the parameter
 * enablejsapi=1 on the url in order to make the tracking work.
 *
 * @param {(object)} opts GAS Options object.
 */
function _trackYoutube(opts) {
    var force = opts['force'];
    var opt_timeTriggers = opts['percentages'];
    if (force) {
        try {
            _ytMigrateObjectEmbed();
        }catch (e) {
            _gas.push(['_trackException', e,
                'GAS Error on youtube.js:_ytMigrateObjectEmbed'
            ]);
        }
    }

    var youtube_videos = [];
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//www.youtube.com/embed') > -1) {
            if (sindexOf.call(iframes[i].src, 'enablejsapi=1') < 0) {
                if (force) {
                    // Reload the video enabling the api
                    if (sindexOf.call(iframes[i].src, '?') < 0) {
                        iframes[i].src += '?enablejsapi=1';
                    } else {
                        iframes[i].src += '&enablejsapi=1';
                    }
                } else {
                    // We can't track players that don't have api enabled.
                    continue;
                }
            }
            youtube_videos.push(iframes[i]);
        }
    }
    if (youtube_videos.length > 0) {
        if (opt_timeTriggers && opt_timeTriggers.length) {
            _ytTimeTriggers = opt_timeTriggers;
        }
        // this function will be called when the youtube api loads
        window['onYouTubePlayerAPIReady'] = function () {
            var p;
            for (var i = 0; i < youtube_videos.length; i++) {
                p = new window['YT']['Player'](youtube_videos[i]);
                p.addEventListener('onStateChange', _ytStateChange);
                p.addEventListener('onError', _ytError);
            }
        };
        // load the youtube player api
        var tag = document.createElement('script');
        //XXX use document.location.protocol
        var protocol = 'http:';
        if (document.location.protocol === 'https:') {
            protocol = 'https:';
        }
        tag.src = protocol + '//www.youtube.com/player_api';
        tag.type = 'text/javascript';
        tag.async = true;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

var _gasTrackYoutube = function (opts) {
    // Support for legacy parameters
    var args = slice.call(arguments);
    if (args[0] && (typeof args[0] === 'boolean' || args[0] === 'force')) {
        opts = {'force': !!args[0]};
        if (args[1] && args[1].length) {
            opts['percentages'] = args[1];
        }
    }

    opts = opts || {};
    opts['force'] = opts['force'] || false;
    opts['category'] = opts['category'] || 'YouTube Video';
    opts['percentages'] = opts['percentages'] || [];

    _ytOpts = opts;
    var gh = this;
    gh._DOMReady(function () {
        _trackYoutube.call(gh, opts);
    });
    return false;
};

_gas.push(['_addHook', '_gasTrackYoutube', _gasTrackYoutube]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackYoutube', _gasTrackYoutube]);

/**
 * Wrap-up
 */
// Execute previous functions
while (_gas._queue.length > 0) {
    _gas.push(_gas._queue.shift());
}

// Import ga.js
if (_gaq && _gaq.length >= 0) {
    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = (
            'https:' === document.location.protocol ?
                'https://ssl' :
                'http://www'
        ) +
            '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }());
}

})(window);
