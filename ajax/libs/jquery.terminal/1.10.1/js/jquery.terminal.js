/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/                              version 1.10.1
 *
 * This file is part of jQuery Terminal. http://terminal.jcubic.pl
 *
 * Copyright (c) 2010-2017 Jakub Jankiewicz <http://jcubic.pl/me>
 * Released under the MIT license
 *
 * Contains:
 *
 * Storage plugin Distributed under the MIT License
 * modified to work from Data URIs that block storage and cookies in Chrome
 * Copyright (c) 2010 Dave Schindler
 *
 * jQuery Timers licenced with the WTFPL
 * <http://jquery.offput.ca/timers/>
 *
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 *
 * jQuery Caret
 * Copyright (c) 2009, Gideon Sireling
 * 3 clause BSD License
 *
 * sprintf.js
 * Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro>
 * licensed under 3 clause BSD license
 *
 * Date: Thu, 09 Nov 2017 16:40:28 +0000
 */

/* TODO:
 *
 * Debug interpreters names in LocalStorage
 * onPositionChange event add to terminal ???
 * different command line history for each login users (add login if present to
 * localStorage key)
 *
 * TEST: login + promises/exec
 *       json-rpc/object + promises
 *
 * NOTE: json-rpc don't need promises and delegate resume/pause because only
 *       exec can call it and exec call interpreter that work with resume/pause
 */
/* global location, jQuery, setTimeout, window, global, localStorage, sprintf,
         setImmediate, IntersectionObserver, MutationObserver, wcwidth,
         module, require, define */
/* eslint-disable */
(function(ctx) {
    var sprintf = function() {
        if (!sprintf.cache.hasOwnProperty(arguments[0])) {
            sprintf.cache[arguments[0]] = sprintf.parse(arguments[0]);
        }
        return sprintf.format.call(null, sprintf.cache[arguments[0]], arguments);
    };

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i]);
            if (node_type === 'string') {
                output.push(parse_tree[i]);
            }
            else if (node_type === 'array') {
                match = parse_tree[i]; // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor];
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
                        }
                        arg = arg[match[2][k]];
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]];
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++];
                }

                if (/[^s]/.test(match[8]) && (get_type(arg) !== 'number')) {
                    throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
                }
                switch (match[8]) {
                    case 'b': arg = arg.toString(2); break;
                    case 'c': arg = String.fromCharCode(arg); break;
                    case 'd': arg = parseInt(arg, 10); break;
                    case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
                    case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
                    case 'o': arg = arg.toString(8); break;
                    case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
                    case 'u': arg = arg >>> 0; break;
                    case 'x': arg = arg.toString(16); break;
                    case 'X': arg = arg.toString(16).toUpperCase(); break;
                }
                arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? ' +' + arg : arg);
                pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' ';
                pad_length = match[6] - String(arg).length;
                pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                output.push(match[5] ? arg + pad : pad + arg);
            }
        }
        return output.join('');
    };

    sprintf.cache = {};

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
        while (_fmt) {
            if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                parse_tree.push(match[0]);
            }
            else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                parse_tree.push('%');
            }
            else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1;
                    var field_list = [], replacement_field = match[2], field_match = [];
                    if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1]);
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            }
                            else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            }
                            else {
                                throw('[sprintf] huh?');
                            }
                        }
                    }
                    else {
                        throw('[sprintf] huh?');
                    }
                    match[2] = field_list;
                }
                else {
                    arg_names |= 2;
                }
                if (arg_names === 3) {
                    throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
                }
                parse_tree.push(match);
            }
            else {
                throw('[sprintf] huh?');
            }
            _fmt = _fmt.substring(match[0].length);
        }
        return parse_tree;
    };

    var vsprintf = function(fmt, argv, _argv) {
        _argv = argv.slice(0);
        _argv.splice(0, 0, fmt);
        return sprintf.apply(null, _argv);
    };

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    function str_repeat(input, multiplier) {
        for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
        return output.join('');
    }

    /**
     * export to either browser or node.js
     */
    ctx.sprintf = sprintf;
    ctx.vsprintf = vsprintf;
})(typeof global !== "undefined" ? global : window);
/* eslint-enable */
// UMD taken from https://github.com/umdjs/umd
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function($, undefined) {
    'use strict';
    // -----------------------------------------------------------------------
    // :: Replacemenet for jQuery 2 deferred objects
    // -----------------------------------------------------------------------
    function DelayQueue() {
        var callbacks = $.Callbacks();
        var resolved = false;
        this.resolve = function() {
            callbacks.fire();
            resolved = true;
        };
        this.add = function(fn) {
            if (resolved) {
                fn();
            } else {
                callbacks.add(fn);
            }
        };
    }
    // -----------------------------------------------------------------------
    // :: map object to object
    // -----------------------------------------------------------------------
    $.omap = function(o, fn) {
        var result = {};
        $.each(o, function(k, v) {
            result[k] = fn.call(o, k, v);
        });
        return result;
    };
    $.fn.text_length = function() {
        return this.map(function() {
            return $(this).text().length;
        }).get().reduce(function(a, b) {
            return a + b;
        }, 0);
    };
    // -----------------------------------------------------------------------
    // :: Deep clone of objects and arrays
    // -----------------------------------------------------------------------
    var Clone = {
        clone_object: function(object) {
            var tmp = {};
            if (typeof object === 'object') {
                if ($.isArray(object)) {
                    return this.clone_array(object);
                } else if (object === null) {
                    return object;
                } else {
                    for (var key in object) {
                        if ($.isArray(object[key])) {
                            tmp[key] = this.clone_array(object[key]);
                        } else if (typeof object[key] === 'object') {
                            tmp[key] = this.clone_object(object[key]);
                        } else {
                            tmp[key] = object[key];
                        }
                    }
                }
            }
            return tmp;
        },
        clone_array: function(array) {
            if (!$.isFunction(Array.prototype.map)) {
                throw new Error("Your browser don't support ES5 array map " +
                                'use es5-shim');
            }
            return array.slice(0).map(function(item) {
                if (typeof item === 'object') {
                    return this.clone_object(item);
                } else {
                    return item;
                }
            }.bind(this));
        }
    };
    var clone = function(object) {
        return Clone.clone_object(object);
    };

    /* eslint-disable */
    // -----------------------------------------------------------------------
    // :: Storage plugin
    // -----------------------------------------------------------------------
    var hasLS = function() {
        try {
            var testKey = 'test', storage = window.localStorage;
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    };
    var hasCookies = function() {
        try {
            document.cookie.split(';');
            return true;
        } catch (e) {
            return false;
        }
    };
    // Private data
    var isLS = hasLS();
    // Private functions
    function wls(n, v) {
        var c;
        if (typeof n === 'string' && typeof v === 'string') {
            localStorage[n] = v;
            return true;
        } else if (typeof n === 'object' && typeof v === 'undefined') {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    localStorage[c] = n[c];
                }
            }
            return true;
        }
        return false;
    }
    function wc(n, v) {
        var dt, e, c;
        dt = new Date();
        dt.setTime(dt.getTime() + 31536000000);
        e = '; expires=' + dt.toGMTString();
        if (typeof n === 'string' && typeof v === 'string') {
            document.cookie = n + '=' + v + e + '; path=/';
            return true;
        } else if (typeof n === 'object' && typeof v === 'undefined') {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    document.cookie = c + '=' + n[c] + e + '; path=/';
                }
            }
            return true;
        }
        return false;
    }
    function rls(n) {
        return localStorage[n];
    }
    function rc(n) {
        var nn, ca, i, c;
        nn = n + '=';
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nn) === 0) {
                return c.substring(nn.length, c.length);
            }
        }
        return null;
    }
    function dls(n) {
        return delete localStorage[n];
    }
    function dc(n) {
        return wc(n, '', -1);
    }
    /**
    * Public API
    * $.Storage.set("name", "value")
    * $.Storage.set({"name1":"value1", "name2":"value2", etc})
    * $.Storage.get("name")
    * $.Storage.remove("name")
    */
    var localStorage;
    if (!hasCookies() && !isLS) {
        localStorage = {};
        $.extend({
            Storage: {
                set: wls,
                get: rls,
                remove: dls
            }
        });
    } else {
        localStorage = window.localStorage;
        $.extend({
            Storage: {
                set: isLS ? wls : wc,
                get: isLS ? rls : rc,
                remove: isLS ? dls : dc
            }
        });
    }
    // -----------------------------------------------------------------------
    // :: jQuery Timers
    // -----------------------------------------------------------------------
    var jQuery = $;
    jQuery.fn.extend({
        everyTime: function(interval, label, fn, times, belay) {
            return this.each(function() {
                jQuery.timer.add(this, interval, label, fn, times, belay);
            });
        },
        oneTime: function(interval, label, fn) {
            return this.each(function() {
                jQuery.timer.add(this, interval, label, fn, 1);
            });
        },
        stopTime: function(label, fn) {
            return this.each(function() {
                jQuery.timer.remove(this, label, fn);
            });
        }
    });

    jQuery.extend({
        timer: {
            guid: 1,
            global: {},
            regex: /^([0-9]+)\s*(.*s)?$/,
            powers: {
                // Yeah this is major overkill...
                'ms': 1,
                'cs': 10,
                'ds': 100,
                's': 1000,
                'das': 10000,
                'hs': 100000,
                'ks': 1000000
            },
            timeParse: function(value) {
                if (value === undefined || value === null) {
                    return null;
                }
                var result = this.regex.exec(jQuery.trim(value.toString()));
                if (result[2]) {
                    var num = parseInt(result[1], 10);
                    var mult = this.powers[result[2]] || 1;
                    return num * mult;
                } else {
                    return value;
                }
            },
            add: function(element, interval, label, fn, times, belay) {
                var counter = 0;

                if (jQuery.isFunction(label)) {
                    if (!times) {
                        times = fn;
                    }
                    fn = label;
                    label = interval;
                }

                interval = jQuery.timer.timeParse(interval);

                if (typeof interval !== 'number' ||
                    isNaN(interval) ||
                    interval <= 0) {
                    return;
                }
                if (times && times.constructor !== Number) {
                    belay = !!times;
                    times = 0;
                }

                times = times || 0;
                belay = belay || false;

                if (!element.$timers) {
                    element.$timers = {};
                }
                if (!element.$timers[label]) {
                    element.$timers[label] = {};
                }
                fn.$timerID = fn.$timerID || this.guid++;

                var handler = function() {
                    if (belay && handler.inProgress) {
                        return;
                    }
                    handler.inProgress = true;
                    if ((++counter > times && times !== 0) ||
                        fn.call(element, counter) === false) {
                        jQuery.timer.remove(element, label, fn);
                    }
                    handler.inProgress = false;
                };

                handler.$timerID = fn.$timerID;

                if (!element.$timers[label][fn.$timerID]) {
                    element.$timers[label][fn.$timerID] = window.setInterval(handler, interval);
                }

                if (!this.global[label]) {
                    this.global[label] = [];
                }
                this.global[label].push(element);

            },
            remove: function(element, label, fn) {
                var timers = element.$timers, ret;

                if (timers) {

                    if (!label) {
                        for (var lab in timers) {
                            if (timers.hasOwnProperty(lab)) {
                                this.remove(element, lab, fn);
                            }
                        }
                    } else if (timers[label]) {
                        if (fn) {
                            if (fn.$timerID) {
                                window.clearInterval(timers[label][fn.$timerID]);
                                delete timers[label][fn.$timerID];
                            }
                        } else {
                            for (var _fn in timers[label]) {
                                if (timers[label].hasOwnProperty(_fn)) {
                                    window.clearInterval(timers[label][_fn]);
                                    delete timers[label][_fn];
                                }
                            }
                        }

                        for (ret in timers[label]) {
                            if (timers[label].hasOwnProperty(ret)) {
                                break;
                            }
                        }
                        if (!ret) {
                            ret = null;
                            delete timers[label];
                        }
                    }

                    for (ret in timers) {
                        if (timers.hasOwnProperty(ret)) {
                            break;
                        }
                    }
                    if (!ret) {
                        element.$timers = null;
                    }
                }
            }
        }
    });

    if (/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())) {
        jQuery(window).one('unload', function() {
            var global = jQuery.timer.global;
            for (var label in global) {
                if (global.hasOwnProperty(label)) {
                    var els = global[label], i = els.length;
                    while (--i) {
                        jQuery.timer.remove(els[i], label);
                    }
                }
            }
        });
    }
    // -----------------------------------------------------------------------
    // :: CROSS BROWSER SPLIT
    // -----------------------------------------------------------------------
    (function(undef) {

        // prevent double include

        if (!String.prototype.split.toString().match(/\[native/)) {
            return;
        }

        var nativeSplit = String.prototype.split,
        compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
        self;

        self = function(str, separator, limit) {
            // If `separator` is not a regex, use `nativeSplit`
            if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
                return nativeSplit.call(str, separator, limit);
            }
            var output = [],
            flags = (separator.ignoreCase ? "i" : "") +
                (separator.multiline  ? "m" : "") +
                (separator.extended   ? "x" : "") + // Proposed for ES6
                (separator.sticky     ? "y" : ""), // Firefox 3+
                lastLastIndex = 0,
            // Make `global` and avoid `lastIndex` issues by working with a copy
            separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + "g");
            str += ""; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            // ? Math.pow(2, 32) - 1 : ToUint32(limit)
            limit = limit === undef ? -1 >>> 0 : limit >>> 0;
            while (match = separator.exec(str)) {
                    // `separator.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        output.push(str.slice(lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            match[0].replace(separator2, function() {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (arguments[i] === undef) {
                                        match[i] = undef;
                                    }
                                }
                            });
                        }
                        if (match.length > 1 && match.index < str.length) {
                            Array.prototype.push.apply(output, match.slice(1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= limit) {
                            break;
                        }
                    }
                    if (separator.lastIndex === match.index) {
                        separator.lastIndex++; // Avoid an infinite loop
                    }
                }
            if (lastLastIndex === str.length) {
                if (lastLength || !separator.test("")) {
                    output.push("");
                }
            } else {
                output.push(str.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };

        // For convenience
        String.prototype.split = function(separator, limit) {
            return self(this, separator, limit);
        };

        return self;

    })();
    // -----------------------------------------------------------------------
    // :: jQuery Caret
    // -----------------------------------------------------------------------
    $.fn.caret = function(pos) {
        var target = this[0];
        var isContentEditable = target.contentEditable === 'true';
        //get
        if (arguments.length === 0) {
            //HTML5
            if (window.getSelection) {
                //contenteditable
                if (isContentEditable) {
                    target.focus();
                    var range1 = window.getSelection().getRangeAt(0),
                    range2 = range1.cloneRange();
                    range2.selectNodeContents(target);
                    range2.setEnd(range1.endContainer, range1.endOffset);
                    return range2.toString().length;
                }
                //textarea
                return target.selectionStart;
            }
            //IE<9
            if (document.selection) {
                target.focus();
                //contenteditable
                if (isContentEditable) {
                    var range1 = document.selection.createRange(),
                    range2 = document.body.createTextRange();
                    range2.moveToElementText(target);
                    range2.setEndPoint('EndToEnd', range1);
                    return range2.text.length;
                }
                //textarea
                var pos = 0,
                range = target.createTextRange(),
                range2 = document.selection.createRange().duplicate(),
                bookmark = range2.getBookmark();
                range.moveToBookmark(bookmark);
                while (range.moveStart('character', -1) !== 0) pos++;
                return pos;
            }
            //not supported
            return 0;
        }
        //set
        if (pos === -1)
            pos = this[isContentEditable? 'text' : 'val']().length;
        //HTML5
        if (window.getSelection) {
            //contenteditable
            if (isContentEditable) {
                target.focus();
                window.getSelection().collapse(target.firstChild, pos);
            }
            //textarea
            else
                target.setSelectionRange(pos, pos);
        }
        //IE<9
        else if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(target);
            range.moveStart('character', pos);
            range.collapse(true);
            range.select();
        }
        if (!isContentEditable)
            target.focus();
        return pos;
    };
    /* eslint-enable */
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(fn) {
            return setTimeout(fn, 20);
        };
    // -----------------------------------------------------------------------
    // :: Cross-browser resize element plugin
    // :: Taken from ResizeSensor.js file from marcj/css-element-queries (MIT license)
    // :: not all jQuerifided
    // -----------------------------------------------------------------------
    $.fn.resizer = function(callback) {
        var unbind = arguments[0] === "unbind";
        if (!unbind && !$.isFunction(callback)) {
            throw new Error(
                'Invalid argument, it need to a function or string "unbind".'
            );
        }
        return this.each(function() {
            var $this = $(this);
            if (unbind) {
                $(this).removeData('callbacks').find('.resizer').remove();
            } else if ($this.data('callbacks')) {
                $(this).data('callbacks').push(callback);
            } else {
                $this.data('callbacks', [callback]);
                var self = this;
                var resizer = $('<div/>').addClass('resizer').appendTo(this)[0];
                var style =
                    'position: absolute; left: 0; top: 0; right: 0; bottom: 0; ' +
                    'overflow: hidden; z-index: -1; visibility: hidden;';
                var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';
                resizer.style.cssText = style;
                resizer.innerHTML =
                    '<div class="resize-sensor-expand" style="' + style + '">' +
                    '<div style="' + styleChild + '"></div>' + "</div>" +
                    '<div class="resize-sensor-shrink" style="' + style + '">' +
                    '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
                    "</div>";

                var expand = resizer.childNodes[0];
                var expandChild = expand.childNodes[0];
                var shrink = resizer.childNodes[1];
                var dirty, rafId, newWidth, newHeight;
                var lastWidth = self.offsetWidth;
                var lastHeight = self.offsetHeight;

                var reset = function() {
                    expandChild.style.width = '100000px';
                    expandChild.style.height = '100000px';

                    expand.scrollLeft = 100000;
                    expand.scrollTop = 100000;

                    shrink.scrollLeft = 100000;
                    shrink.scrollTop = 100000;
                };

                reset();

                var onResized = function() {
                    rafId = 0;

                    if (!dirty) {
                        return;
                    }

                    lastWidth = newWidth;
                    lastHeight = newHeight;
                    var callbacks = $this.data('callbacks');
                    if (callbacks && callbacks.length) {
                        callbacks.forEach(function(fn) {
                            fn();
                        });
                    }
                };

                var onScroll = function() {
                    newWidth = self.offsetWidth;
                    newHeight = self.offsetHeight;
                    dirty = newWidth !== lastWidth || newHeight !== lastHeight;

                    if (dirty && !rafId) {
                        rafId = requestAnimationFrame(onResized);
                    }

                    reset();
                };
                $(expand).on("scroll", onScroll);
                $(shrink).on("scroll", onScroll);
            }
        });
    };
    // -----------------------------------------------------------------------
    // :: hide elements from screen readers
    // -----------------------------------------------------------------------
    function a11y_hide(element) {
        element.attr({
            role: 'presentation',
            'aria-hidden': 'true'
        });
    }
    // ---------------------------------------------------------------------
    // :: alert only first exception of type
    // ---------------------------------------------------------------------
    var excepctions = [];
    function alert_exception(label, e) {
        var message = (label ? label + ': ' : '') + exception_message(e);
        if (excepctions.indexOf(message) === -1) {
            excepctions.push(message);
            alert(message + (e.stack ? '\n' + e.stack : ''));
        }
    }
    // ---------------------------------------------------------------------
    // :; detect if mouse event happen on scrollbar
    // ---------------------------------------------------------------------
    function scrollbar_event(e, node) {
        var left = node.offset().left;
        return node.outerWidth() <= e.clientX - left;
    }
    // ---------------------------------------------------------------------
    // :: Return exception message as string
    // ---------------------------------------------------------------------
    function exception_message(e) {
        if (typeof e === 'string') {
            return e;
        } else if (typeof e.fileName === 'string') {
            return e.fileName + ': ' + e.message;
        } else {
            return e.message;
        }
    }
    // -----------------------------------------------------------------------
    // :: CYCLE DATA STRUCTURE
    // -----------------------------------------------------------------------
    function Cycle() {
        var data = [].slice.call(arguments);
        var pos = 0;
        $.extend(this, {
            get: function() {
                return data;
            },
            index: function() {
                return pos;
            },
            rotate: function(skip) {
                if (!skip) {
                    var defined = data.filter(function(item) {
                        return typeof item !== 'undefined';
                    });
                    if (!defined.length) {
                        return;
                    }
                }
                if (data.length === 1) {
                    return data[0];
                } else {
                    if (pos === data.length - 1) {
                        pos = 0;
                    } else {
                        ++pos;
                    }
                    if (typeof data[pos] !== 'undefined') {
                        return data[pos];
                    } else {
                        return this.rotate(true);
                    }
                }
            },
            length: function() {
                return data.length;
            },
            remove: function(index) {
                delete data[index];
            },
            set: function(item) {
                for (var i = data.length; i--;) {
                    if (data[i] === item) {
                        pos = i;
                        return;
                    }
                }
                this.append(item);
                pos = data.length - 1;
            },
            front: function() {
                if (data.length) {
                    var index = pos;
                    var restart = false;
                    while (!data[index]) {
                        index++;
                        if (index > data.length) {
                            if (restart) {
                                break;
                            }
                            index = 0;
                            restart = true;
                        }
                    }
                    return data[index];
                }
            },
            map: function(fn) {
                return data.filter(Boolean).map(fn);
            },
            forEach: function(fn) {
                data.filter(Boolean).forEach(fn);
            },
            append: function(item) {
                data.push(item);
            }
        });
    }
    // -----------------------------------------------------------------------
    // :: STACK DATA STRUCTURE
    // -----------------------------------------------------------------------
    function Stack(init) {
        var data = init instanceof Array ? init : init ? [init] : [];
        $.extend(this, {
            data: function() {
                return data;
            },
            map: function(fn) {
                return $.map(data, fn);
            },
            size: function() {
                return data.length;
            },
            pop: function() {
                if (data.length === 0) {
                    return null;
                } else {
                    var value = data[data.length - 1];
                    data = data.slice(0, data.length - 1);
                    return value;
                }
            },
            push: function(value) {
                data = data.concat([value]);
                return value;
            },
            top: function() {
                return data.length > 0 ? data[data.length - 1] : null;
            },
            clone: function() {
                return new Stack(data.slice(0));
            }
        });
    }
    // -------------------------------------------------------------------------
    // :: HISTORY CLASS
    // -------------------------------------------------------------------------
    function History(name, size, memory) {
        var enabled = true;
        var storage_key = '';
        if (typeof name === 'string' && name !== '') {
            storage_key = name + '_';
        }
        storage_key += 'commands';
        var data;
        if (memory) {
            data = [];
        } else {
            data = $.Storage.get(storage_key);
            data = data ? JSON.parse(data) : [];
        }
        var pos = data.length - 1;
        $.extend(this, {
            append: function(item) {
                if (enabled) {
                    if (data[data.length - 1] !== item) {
                        data.push(item);
                        if (size && data.length > size) {
                            data = data.slice(-size);
                        }
                        pos = data.length - 1;
                        if (!memory) {
                            $.Storage.set(storage_key, JSON.stringify(data));
                        }
                    }
                }
            },
            set: function(new_data) {
                if (new_data instanceof Array) {
                    data = new_data;
                    if (!memory) {
                        $.Storage.set(storage_key, JSON.stringify(data));
                    }
                }
            },
            data: function() {
                return data;
            },
            reset: function() {
                pos = data.length - 1;
            },
            last: function() {
                return data[data.length - 1];
            },
            end: function() {
                return pos === data.length - 1;
            },
            position: function() {
                return pos;
            },
            current: function() {
                return data[pos];
            },
            next: function() {
                var old = pos;
                if (pos < data.length - 1) {
                    ++pos;
                }
                if (old !== pos) {
                    return data[pos];
                }
            },
            previous: function() {
                var old = pos;
                if (pos > 0) {
                    --pos;
                }
                if (old !== pos) {
                    return data[pos];
                }
            },
            clear: function() {
                data = [];
                this.purge();
            },
            enabled: function() {
                return enabled;
            },
            enable: function() {
                enabled = true;
            },
            purge: function() {
                if (!memory) {
                    $.Storage.remove(storage_key);
                }
            },
            disable: function() {
                enabled = false;
            }
        });
    }
    // -------------------------------------------------------------------------
    // :: COMMAND LINE PLUGIN
    // -------------------------------------------------------------------------
    var cmd_index = 0;
    $.fn.cmd = function(options) {
        var self = this;
        var maybe_data = self.data('cmd');
        if (maybe_data) {
            return maybe_data;
        }
        var id = cmd_index++;
        self.addClass('cmd');
        self.append('<span class="prompt"></span>');
        self.append('<div class="cursor-line">' +
                    '<span></span>' +
                    '<span class="cursor">&nbsp;</span>' +
                    '<span></span>' +
                    '</div>');
        // a11y: don't read command it's in textarea that's in focus
        a11y_hide(self.find('.cursor-line'));
        // on mobile the only way to hide textarea on desktop it's needed because
        // textarea show up after focus
        //self.append('<span class="mask"></mask>');
        var clip = $('<textarea>').attr({
            autocapitalize: 'off',
            spellcheck: 'false',
            tabindex: 1
        }).addClass('clipboard').appendTo(self).val(' ');

        if (options.width) {
            self.width(options.width);
        }
        var num_chars; // calculated by draw_prompt
        var prompt_len;
        var prompt_node = self.find('.prompt');
        var reverse_search = false;
        var rev_search_str = '';
        var reverse_search_position = null;
        var backup_prompt;
        var mask = options.mask || false;
        var command = '';
        var last_command;
        // text from selection using CTRL+SHIFT+C (as in Xterm)
        var kill_text = ''; // text from command that kill part of the command
        var position = 0;
        var prompt;
        var enabled;
        var formatted_position = 0;
        var historySize = options.historySize || 60;
        var name, history;
        var cursor = self.find('.cursor');
        var animation;
        var paste_count = 0;
        function get_char_pos(e) {
            var node = $(e.target);
            if (node.is('span')) {
                return node.index() + node.parents('span').prevAll().text_length() +
                    node.closest('[role="presentation"]')
                    .prevUntil('.prompt').text_length();
            } else if (node.is('div[role="presentation"]')) {
                var index = node.index();
                var lines = command.split(/\n/).slice(0, index);
                return lines.reduce(function(pos, line) {
                    return pos + length(line);
                }, 0) + (lines.length - 1);
            }
        }
        // ie mapping
        var key_mapping = {
            'SPACEBAR': ' ',
            'UP': 'ARROWUP',
            'DOWN': 'ARROWDOWN',
            'LEFT': 'ARROWLEFT',
            'RIGHT': 'ARROWRIGHT',
            'DEL': 'DELETE'
        };
        function get_key(e) {
            if (e.key) {
                var key = e.key.toUpperCase();
                if (key_mapping[key]) {
                    key = key_mapping[key];
                }
                if (key === 'CONTROL') {
                    return 'CTRL';
                } else {
                    var combo = [];
                    if (e.ctrlKey) {
                        combo.push('CTRL');
                    }
                    if (e.metaKey && key !== 'META') {
                        combo.push('META');
                    }
                    if (e.shiftKey && key !== 'SHIFT') {
                        combo.push('SHIFT');
                    }
                    if (e.altKey && key !== 'ALT') {
                        combo.push('ALT');
                    }
                    if (combo.length && key === ' ') {
                        key = 'SPACEBAR';
                    }
                    if (e.key) {
                        combo.push(key);
                    }
                    return combo.join('+');
                }
            }
        }
        var keymap;
        var default_keymap = {
            'ALT+D': function() {
                self.set(command.slice(0, position) +
                         command.slice(position).
                         replace(/ *[^ ]+ *(?= )|[^ ]+$/, ''), true);
                // chrome jump to address bar
                return false;
            },
            'ENTER': function() {
                if (history && command && !mask &&
                    ($.isFunction(options.historyFilter) &&
                     options.historyFilter(command)) ||
                    (options.historyFilter instanceof RegExp &&
                     command.match(options.historyFilter)) ||
                    !options.historyFilter) {
                    history.append(command);
                }
                var tmp = command;
                history.reset();

                // for next input event on firefox/android with google keyboard
                prev_command = '';
                no_keydown = true;

                self.set('');
                if (options.commands) {
                    options.commands(tmp);
                }
                if ($.isFunction(prompt)) {
                    draw_prompt();
                }
                clip.val('');
                return false;
            },
            'SHIFT+ENTER': function() {
                self.insert('\n');
                return true;
            },
            'BACKSPACE': function() {
                if (reverse_search) {
                    rev_search_str = rev_search_str.slice(0, -1);
                    draw_reverse_prompt();
                } else if (command !== '' && position > 0) {
                    self['delete'](-1);
                }
                // for next input after naitve backspace
                // we need timeout because we don't want it to trigger
                // for current input but next one
                self.oneTime(1, function() {
                    no_keydown = true;
                });
            },
            'TAB': function() {
                self.insert('\t');
            },
            'CTRL+D': function() {
                self['delete'](1);
                return false;
            },
            'DELETE': function() {
                self['delete'](1);
                return true;
            },
            'ARROWUP': prev_history,
            'CTRL+P': prev_history,
            'ARROWDOWN': next_history,
            'CTRL+N': next_history,
            'ARROWLEFT': left,
            'CTRL+B': left,
            'CTRL+ARROWLEFT': function() {
                // jump to one character after last space before prevoius word
                var len = position - 1;
                var pos = 0;
                if (command[len] === ' ') {
                    --len;
                }
                for (var i = len; i > 0; --i) {
                    if (command[i] === ' ' && command[i + 1] !== ' ') {
                        pos = i + 1;
                        break;
                    } else if (command[i] === '\n' &&
                               command[i + 1] !== '\n') {
                        pos = i;
                        break;
                    }
                }
                self.position(pos);
            },
            'CTRL+R': function() {
                if (reverse_search) {
                    reverse_history_search(true);
                } else {
                    backup_prompt = prompt;
                    draw_reverse_prompt();
                    last_command = command;
                    self.set('');
                    redraw();
                    reverse_search = true;
                }
                return false;
            },
            'CTRL+G': function() {
                if (reverse_search) {
                    prompt = backup_prompt;
                    draw_prompt();
                    self.set(last_command);
                    redraw();
                    reverse_search = false;
                    rev_search_str = '';
                    return false;
                }
            },
            'ARROWRIGHT': right,
            'CTRL+F': right,
            'CTRL+ARROWRIGHT': function() {
                // jump to beginning or end of the word
                if (command[position] === ' ') {
                    ++position;
                }
                var re = /\S[\n\s]{2,}|[\n\s]+\S?/;
                var match = command.slice(position).match(re);
                if (!match || match[0].match(/^\s+$/)) {
                    self.position(command.length);
                } else if (match[0][0] !== ' ') {
                    position += match.index + 1;
                } else {
                    position += match.index + match[0].length - 1;
                    if (match[0][match[0].length - 1] !== ' ') {
                        --position;
                    }
                }
                redraw();
            },
            'F12': return_true, // Allow Firebug
            'END': end,
            'CTRL+E': end,
            'HOME': home,
            'CTRL+A': home,
            'SHIFT+INSERT': paste_event,
            'CTRL+SHIFT+T': return_true, // open closed tab
            'CTRL+W': function() {
                // don't work in Chromium (can't prevent close tab)
                if (command !== '' && position !== 0) {
                    var m = command.slice(0, position).match(/([^ ]+ *$)/);
                    if (m[0].length) {
                        kill_text = self['delete'](-m[0].length);
                        text_to_clipboard(self, kill_text);
                    }
                }
                return false;
            },
            'CTRL+H': function() {
                if (command !== '' && position > 0) {
                    self['delete'](-1);
                }
                return false;
            },
            'CTRL+X': return_true,
            'CTRL+C': return_true,
            'CTRL+T': return_true,
            'CTRL+Y': function() {
                if (kill_text !== '') {
                    self.insert(kill_text);
                }
            },
            'CTRL+V': paste_event,
            'META+V': paste_event,
            'CTRL+K': function() {
                if (command.length - position) {
                    kill_text = self['delete'](command.length - position);
                    text_to_clipboard(self, kill_text);
                }
                return false;
            },
            'CTRL+U': function() {
                if (command !== '' && position !== 0) {
                    kill_text = self['delete'](-position);
                    text_to_clipboard(self, kill_text);
                }
                return false;
            },
            'CTRL+TAB': function() {
                return false;
            },
            'META+`': return_true, // CMD+` switch browser window on Mac
            'META+R': return_true, // CMD+R page reload in Chrome Mac
            'META+L': return_true  // CLD+L jump into Ominbox on Chrome Mac
        };
        function return_true() {
            return true;
        }
        function paste_event() {
            clip.val('');
            paste_count = 0;
            if (self.isenabled() && !clip.is(':focus')) {
                clip.trigger('focus', [true]);
            }
            clip.one('input', paste);
            return true;
        }
        function prev_history() {
            if (first_up_history) {
                last_command = command;
                self.set(history.current());
            } else {
                self.set(history.previous());
            }
            first_up_history = false;
            return false;
        }
        function next_history() {
            self.set(history.end() ? last_command : history.next());
            return false;
        }
        function left() {
            if (position > 0) {
                self.position(-1, true);
                redraw();
            }
        }
        function right() {
            if (position < command.length) {
                self.position(1, true);
            }
            return false;
        }
        function home() {
            self.position(0);
        }
        function end() {
            self.position(command.length);
        }
        function mobile_focus() {
            //if (is_touch) {
            var focus = clip.is(':focus');
            if (enabled) {
                if (!focus) {
                    //clip.trigger('focus', [true]);
                }
                self.oneTime(10, function() {
                    if (!clip.is(':focus') && enabled) {
                        clip.trigger('focus', [true]);
                    }
                });
            } else if (focus && (is_mobile || !enabled)) {
                clip.trigger('blur', [true]);
            }
        }
        // on mobile you can't delete character if input is empty (event
        // will not fire) so we fake text entry, we could just put dummy
        // data but we put real command and position
        function fix_textarea(position_only) {
            // delay worked while experimenting
            self.oneTime(10, function() {
                // we use space before command to show select all context menu
                // idea taken from CodeMirror
                if (clip.val() !== command && !position_only) {
                    clip.val(' ' + command);
                }
                if (enabled) {
                    self.oneTime(10, function() {
                        try {
                            clip.caret(position + 1);
                        } catch (e) {
                            // firefox throw NS_ERROR_FAILURE ignore
                        }
                    });
                }
            });
        }
        // terminal animation don't work on andorid because they animate
        // 2 properties
        if (support_animations && !is_android) {
            animation = function(toggle) {
                if (toggle) {
                    cursor.addClass('blink');
                } else {
                    cursor.removeClass('blink');
                }
            };
        } else {
            var animating = false;
            animation = function(toggle) {
                if (toggle && !animating) {
                    animating = true;
                    cursor.addClass('inverted blink');
                    self.everyTime(500, 'blink', blink);
                } else if (animating && !toggle) {
                    animating = false;
                    self.stopTime('blink', blink);
                    cursor.removeClass('inverted blink');
                }
            };
        }
        // ---------------------------------------------------------------------
        // :: Blinking cursor function
        // ---------------------------------------------------------------------
        function blink() {
            cursor.toggleClass('inverted');
        }
        // ---------------------------------------------------------------------
        // :: Set prompt for reverse search
        // ---------------------------------------------------------------------
        function draw_reverse_prompt() {
            prompt = '(reverse-i-search)`' + rev_search_str + "': ";
            draw_prompt();
        }
        // ---------------------------------------------------------------------
        // :: Disable reverse search
        // ---------------------------------------------------------------------
        function clear_reverse_state() {
            prompt = backup_prompt;
            reverse_search = false;
            reverse_search_position = null;
            rev_search_str = '';
        }
        // ---------------------------------------------------------------------
        // :: Search through command line history. If next is not defined or
        // :: false it searches for the first item from the end. If true it
        // :: search for the next item
        // ---------------------------------------------------------------------
        function reverse_history_search(next) {
            var history_data = history.data();
            var regex, save_string;
            var len = history_data.length;
            if (next && reverse_search_position > 0) {
                len -= reverse_search_position;
            }
            if (rev_search_str.length > 0) {
                for (var j = rev_search_str.length; j > 0; j--) {
                    save_string = $.terminal.escape_regex(rev_search_str.substring(0, j));
                    regex = new RegExp(save_string);
                    for (var i = len; i--;) {
                        if (regex.test(history_data[i])) {
                            reverse_search_position = history_data.length - i;
                            self.position(history_data[i].indexOf(save_string));
                            self.set(history_data[i], true);
                            redraw();
                            if (rev_search_str.length !== j) {
                                rev_search_str = rev_search_str.substring(0, j);
                                draw_reverse_prompt();
                            }
                            return;
                        }
                    }
                }
            }
            rev_search_str = ''; // clear if not found any
        }
        // ---------------------------------------------------------------------
        // :: Recalculate number of characters in command line
        // ---------------------------------------------------------------------
        function change_num_chars() {
            var $prompt = self.find('.prompt').text('&nbsp;');
            var W = self.width();
            var w = $prompt[0].getBoundingClientRect().width;
            num_chars = Math.floor(W / w);
            draw_prompt();
        }
        // ---------------------------------------------------------------------
        // :: Split String that fit into command line where first line need to
        // :: fit next to prompt (need to have less characters)
        // ---------------------------------------------------------------------
        function get_splitted_command_line(string) {
            function split(string) {
                return $.terminal.split_equal(string, num_chars);
            }
            function skip_empty(array) {
                // we remove lines that are left overs after adding space at the end
                return array.filter(function(line) {
                    return !$.terminal.strip(line).match(/^ $/);
                });
            }
            var prompt = prompt_node.text();
            var re = new RegExp('^' + $.terminal.escape_regex(prompt));
            var array;
            if (string.match(/\n/)) {
                var tmp = string.split('\n');
                var first_len = num_chars - prompt_len - 1;
                for (var i = 0; i < tmp.length - 1; ++i) {
                    tmp[i] += ' ';
                }
                // split first line
                if (strlen(tmp[0]) > first_len) {
                    array = split(prompt + tmp[0]);
                    array[0] = array[0].replace(re, '');
                    array = skip_empty(array);
                } else {
                    array = [tmp[0]];
                }
                // process rest of the lines
                for (i = 1; i < tmp.length; ++i) {
                    if (strlen(tmp[i]) > num_chars) {
                        var splitted = split(tmp[i]);
                        if (i < tmp.length - 1) {
                            splitted = skip_empty(splitted);
                        }
                        array = array.concat(splitted);
                    } else {
                        array.push(tmp[i]);
                    }
                }
            } else {
                array = split(prompt + string, num_chars);
                array[0] = array[0].replace(re, '');
            }
            return array;
        }
        window.get_splitted_command_line = get_splitted_command_line;
        // ---------------------------------------------------------------------
        // :: use custom formatting
        // ---------------------------------------------------------------------
        function formatting(string) {
            // we don't want to format command when user type formatting in
            string = $.terminal.escape_formatting(string);
            try {
                return $.terminal.apply_formatters(string);
            } catch (e) {
                alert_exception('[Formatting]', e);
            }
        }
        // ---------------------------------------------------------------------
        // :: format end encode the string
        // ---------------------------------------------------------------------
        function format(string) {
            return $.terminal.format($.terminal.encode(wrap(string)));
        }
        // ---------------------------------------------------------------------
        // :: function create new string with all characters in it's own
        // :: formatting - it will only have style if the input is formatting
        // :: this function is not very usefull so it's not in $.terminal
        // ---------------------------------------------------------------------
        function wrap(string) {
            function formatting(string) {
                if ($.terminal.is_formatting(string)) {
                    if (string.match(/\]\\\]/)) {
                        string = string.replace(/\]\\\]/g, ']\\\\]');
                    }
                } else {
                    if (string.match(/\\$/)) {
                        string += '\\';
                    }
                    string = '[[;;]' + string + ']';
                }
                return string;
            }
            var len = length(string);
            if (len === 1) {
                return formatting(string);
            }
            var result = [];
            // len - 1 break the command line $.terminal.substring will return
            // empty string for out of bound indexes
            for (var i = 0; i < len; ++i) {
                var text = $.terminal.substring(string, i, i + 1);
                result.push(formatting(text));
            }
            return result.join('');
        }
        // ---------------------------------------------------------------------
        // :: shortcut helper
        // ---------------------------------------------------------------------
        function length(str) {
            return $.terminal.length(str);
        }
        function substring(str, start, end) {
            return $.terminal.substring(str, start, end);
        }
        // ---------------------------------------------------------------------
        // :: functions used to calculate position of cursor when formatting
        // :: change length of output text like with emoji demo
        // ---------------------------------------------------------------------
        // :: main function that return corrected cursor position on display
        // :: if cursor is in the middle of the word that is shorter the before
        // :: applying formatting then the corrected position is after the word
        // :: so it stay in place when you move real cursor in the middle
        // :: of the word
        // ---------------------------------------------------------------------
        function get_formatted_position(position) {
            // only regex formatters can change length of output string
            var formatters = $.terminal.defaults.formatters.filter(function(formatter) {
                return formatter instanceof Array;
            });
            if (position === 0) {
                return position;
            }
            if (formatters.length) {
                return formatters.reduce(function(result, frmt) {
                    var command = result[0];
                    var position = result[1];
                    return tracking_replace(command, frmt[0], frmt[1], position);
                }, [command, position])[1];
            }
            return position;
        }
        // ---------------------------------------------------------------------
        // :: source https://stackoverflow.com/a/46756077/387194
        // ---------------------------------------------------------------------
        function tracking_replace(string, rex, replacement, position) {
            var new_string = "";
            var match;
            var index = 0;
            var rep_string;
            var new_position = position;
            var start;
            rex.lastIndex = 0; // Just to be sure
            while (match = rex.exec(string)) {
                // Add any of the original string we just skipped
                var last_index = length(substring(string, 0, rex.lastIndex));
                start = last_index - length(match[0]);
                if (index < start) {
                    new_string += substring(string, index, start);
                }
                index = last_index;
                // Build the replacement string. This just handles $$ and $n,
                // you may want to add handling for $`, $', and $&.
                rep_string = replacement.replace(/\$(\$|\d)/g, function(m, c0) {
                    if (c0 === "$") {
                        return "$";
                    }
                    return match[c0];
                });
                // Add on the replacement
                new_string += rep_string;
                // If the position is affected...
                if (start < position) {
                    // ... update it:
                    if (last_index < position) {
                        // It's after the replacement, move it
                        new_position = Math.max(0,
                                                new_position +
                                                length(rep_string) -
                                                length(match[0]));
                    } else {
                        // It's *in* the replacement, put it just after
                        new_position += length(rep_string) - (position - start);
                    }
                }
            }
            // Add on any trailing text in the string
            if (index < length(string)) {
                new_string += substring(string, index);
            }
            // Return the string and the updated position
            return [new_string, new_position];
        }
        // ---------------------------------------------------------------------
        // :: Function that displays the command line. Split long lines and
        // :: place cursor in the right place
        // ---------------------------------------------------------------------
        var redraw = (function() {
            var before = cursor.prev();
            var after = cursor.next();
            var cursor_line = cursor.parent();
            // -----------------------------------------------------------------
            // :: Draw line with the cursor
            // -----------------------------------------------------------------
            function draw_cursor_line(string, position) {
                var len = length(string);
                if (position === len) {
                    before.html(format(string));
                    cursor.html('&nbsp;');
                    after.html('');
                } else if (position === 0) {
                    before.html('');
                    cursor.html(format(substring(string, 0, 1)));
                    after.html(format(substring(string, 1)));
                } else {
                    var before_str = $.terminal.substring(string, 0, position);
                    before.html(format(before_str));
                    var c = substring(string, position, position + 1);
                    cursor.html(format(c));
                    if (position === len - 1) {
                        after.html('');
                    } else {
                        after.html(format(substring(string, position + 1)));
                    }
                }
            }
            function div(string) {
                return '<div role="presentation" aria-hidden="true">' +
                    format(string) +
                    '</div>';
            }
            // -----------------------------------------------------------------
            // :: Display lines after the cursor
            // -----------------------------------------------------------------
            function lines_after(lines) {
                var last_ins = cursor_line;
                $.each(lines, function(i, line) {
                    last_ins = $(div(line)).insertAfter(last_ins);
                });
            }
            // -----------------------------------------------------------------
            // :: Display lines before the cursor
            // -----------------------------------------------------------------
            function lines_before(lines) {
                $.each(lines, function(i, line) {
                    cursor_line.before(div(line));
                });
            }
            // -----------------------------------------------------------------
            // :: Redraw function
            // -----------------------------------------------------------------
            return function() {
                var string;
                switch (typeof mask) {
                    case 'boolean':
                        string = mask ? command.replace(/./g, '*') : command;
                        break;
                    case 'string':
                        string = command.replace(/./g, mask);
                        break;
                }
                var pos = formatted_position;
                string = formatting(safe(string.replace(/&/g, '&amp;')));
                var i;
                self.find('div:not(.cursor-line,.clipboard-wrapper)').remove();
                before.html('');
                // long line
                if (strlen(text(string)) > num_chars - prompt_len - 1 ||
                    string.match(/\n/)) {
                    var tabs = string.match(/\t/g);
                    var tabs_rm = tabs ? tabs.length * 3 : 0;
                    //quick tabulation hack
                    if (tabs) {
                        string = string.replace(/\t/g, '\x00\x00\x00\x00');
                    }
                    var array = get_splitted_command_line(string);
                    if (tabs) {
                        array = $.map(array, function(line) {
                            return line.replace(/\x00\x00\x00\x00/g, '\t');
                        });
                    }
                    var first_len = length(array[0]);
                    //cursor in first line
                    if (first_len === 0 && array.length === 1) {
                        // skip empty line
                    } else if (pos < first_len) {
                        draw_cursor_line(array[0], pos);
                        lines_after(array.slice(1));
                    } else if (pos === first_len) {
                        cursor_line.before(div(array[0]));
                        draw_cursor_line(array[1] || '', 0);
                        if (array.length > 1) {
                            lines_after(array.slice(2));
                        }
                    } else if (pos < first_len) {
                        draw_cursor_line(array[0], pos);
                        lines_after(array.slice(1));
                    } else if (pos === first_len) {
                        cursor_line.before(div(array[0]));
                        draw_cursor_line(array[1], 0);
                        lines_after(array.slice(2));
                    } else {
                        var last = array.slice(-1)[0];
                        var len = length(string);
                        var from_last = len - pos - tabs_rm;
                        var last_len = length(last);
                        var new_pos = 0;
                        if (from_last === -1) {
                            from_last = 0;
                        }
                        if (from_last <= last_len) { // in last line
                            lines_before(array.slice(0, -1));
                            if (last_len === from_last) {
                                new_pos = 0;
                            } else {
                                new_pos = last_len - from_last;
                            }
                            draw_cursor_line(last, new_pos);
                        } else {
                            // more lines, cursor in the middle
                            var line_index;
                            var current;
                            new_pos = pos;
                            for (i = 0; i < array.length; ++i) {
                                var current_len = $.terminal.length(array[i]);
                                if (new_pos > current_len) {
                                    new_pos -= current_len;
                                } else {
                                    break;
                                }
                            }
                            current = array[i];
                            line_index = i;
                            // cursor on first character in line
                            if (new_pos === length(current)) {
                                new_pos = 0;
                                current = array[++line_index];
                                if (current === undefined) {
                                    //should never happen
                                    var msg = $.terminal.defaults.strings.redrawError;
                                    throw new Error(msg);
                                }
                            }
                            draw_cursor_line(current, new_pos);
                            lines_before(array.slice(0, line_index));
                            lines_after(array.slice(line_index + 1));
                        }
                    }
                } else if (string === '') {
                    before.html('');
                    cursor.html('&nbsp;');
                    after.html('');
                } else {
                    draw_cursor_line(string, pos);
                }
            };
        })();
        // ---------------------------------------------------------------------
        // :: Draw prompt that can be a function or a string
        // ---------------------------------------------------------------------
        var draw_prompt = (function() {
            function set(prompt) {
                var lines = $.terminal.split_equal(
                    $.terminal.encode(prompt),
                    num_chars
                );
                var last_line = $.terminal.format(lines[lines.length - 1]);
                var formatted = lines.slice(0, -1).map(function(line) {
                    return '<span class="line">' + $.terminal.format(line) + '</span>';
                }).concat([last_line]).join('\n');
                prompt_node.html(formatted);
                prompt_len = strlen($('<span>' + last_line + '</span>').text());
            }
            return function() {
                switch (typeof prompt) {
                    case 'string':
                        set(prompt);
                        break;
                    case 'function':
                        prompt(set);
                        break;
                }
            };
        })();
        // ---------------------------------------------------------------------
        // :: Paste content to terminal using hidden textarea
        // ---------------------------------------------------------------------
        function paste() {
            if (paste_count++ > 0) {
                return;
            }
            if (self.isenabled()) {
                //wait until Browser insert text to textarea
                self.oneTime(100, function() {
                    self.insert(clip.val());
                    clip.val(command);
                    fix_textarea();
                });
            }
        }
        function fire_change_command() {
            if ($.isFunction(options.onCommandChange)) {
                options.onCommandChange(command);
            }
        }
        function crlf(string) {
            return string.replace(/[\r\n]{2}/g, '\n');
        }
        // ---------------------------------------------------------------------
        // :: Command Line Methods
        // ---------------------------------------------------------------------
        $.extend(self, {
            name: function(string) {
                if (string !== undefined) {
                    name = string;
                    var enabled = history && history.enabled() || !history;
                    history = new History(
                        string,
                        historySize,
                        options.history === 'memory'
                    );
                    // disable new history if old was disabled
                    if (!enabled) {
                        history.disable();
                    }
                    return self;
                } else {
                    return name;
                }
            },
            purge: function() {
                history.clear();
                return self;
            },
            history: function() {
                return history;
            },
            'delete': function(n, stay) {
                var removed;
                if (n === 0) {
                    return self;
                } else if (n < 0) {
                    if (position > 0) {
                        // this may look weird but if n is negative we need
                        // to use +
                        removed = command.slice(0, position).slice(n);
                        command = command.slice(0, position + n) +
                            command.slice(position, command.length);
                        if (!stay) {
                            self.position(position + n);
                        }
                        fire_change_command();
                    }
                } else if (command !== '' && position < command.length) {
                    removed = command.slice(position).slice(0, n);
                    command = command.slice(0, position) +
                        command.slice(position + n, command.length);
                    fire_change_command();
                }
                redraw();
                fix_textarea();
                return removed;
            },
            set: function(string, stay) {
                if (string !== undefined) {
                    command = crlf(string);
                    if (!stay) {
                        self.position(command.length);
                    }
                    redraw();
                    fix_textarea();
                    fire_change_command();
                }
                return self;
            },
            keymap: function(new_keymap, value) {
                function wrap(key, fn) {
                    return function(e) {
                        // new keymap function will get default as 2nd argument
                        return fn(e, default_keymap[key]);
                    };
                }
                if (typeof new_keymap === 'undefined') {
                    return keymap;
                } else if (typeof new_keymap === 'string') {
                    if (typeof value === 'undefined') {
                        if (keymap[new_keymap]) {
                            return keymap[new_keymap];
                        } else if (default_keymap[new_keymap]) {
                            return default_keymap[new_keymap];
                        }
                    } else {
                        keymap[new_keymap] = wrap(new_keymap, value);
                    }
                } else {
                    keymap = $.extend(
                        {},
                        default_keymap,
                        $.omap(new_keymap || {}, wrap)
                    );
                    return self;
                }
            },
            insert: function(string, stay) {
                string = crlf(string);
                if (position === command.length) {
                    command += string;
                } else if (position === 0) {
                    command = string + command;
                } else {
                    command = command.slice(0, position) +
                        string + command.slice(position);
                }
                if (!stay) {
                    self.position(string.length, true);
                } else {
                    fix_textarea();
                }
                redraw();
                fire_change_command();
                fix_textarea();
                return self;
            },
            get: function() {
                return command;
            },
            commands: function(commands) {
                if (commands) {
                    options.commands = commands;
                    return self;
                } else {
                    return commands;
                }
            },
            destroy: function() {
                doc.unbind('keypress.cmd', keypress_event);
                doc.unbind('keydown.cmd', keydown_event);
                doc.unbind('input.cmd', input_event);
                self.stopTime('blink', blink);
                self.find('.cursor').next().remove().end().prev().remove().
                    end().remove();
                self.find('.prompt, .clipboard').remove();
                self.removeClass('cmd').removeData('cmd').off('.cmd');
                return self;
            },
            prompt: function(user_prompt) {
                if (user_prompt === undefined) {
                    return prompt;
                } else {
                    if (typeof user_prompt === 'string' ||
                        typeof user_prompt === 'function') {
                        prompt = user_prompt;
                    } else {
                        throw new Error('prompt must be a function or string');
                    }
                    draw_prompt();
                    // we could check if command is longer then numchars-new
                    // prompt
                    redraw();
                    return self;
                }
            },
            kill_text: function() {
                return kill_text;
            },
            position: function(n, relative) {
                if (typeof n === 'number') {
                    if (relative) {
                        position += n;
                    } else if (n < 0) {
                        position = 0;
                    } else if (n > command.length) {
                        position = command.length;
                    } else {
                        position = n;
                    }
                    formatted_position = get_formatted_position(position);
                    if ($.isFunction(options.onPositionChange)) {
                        options.onPositionChange(position);
                    }
                    redraw();
                    fix_textarea(true);
                    return self;
                } else {
                    return position;
                }
            },
            display_position: function(n, relative) {
                if (n === undefined) {
                    return formatted_position;
                } else {
                    var string = formatting(command);
                    var len = $.terminal.length(string);
                    var command_len = $.terminal.length(command);
                    if (len === command_len) {
                        return self.position(n);
                    } else {
                        var new_formatted_pos;
                        if (relative) {
                            new_formatted_pos = formatted_position + n;
                        } else if (n > len) {
                            new_formatted_pos = len;
                        } else {
                            new_formatted_pos = n;
                        }
                        // it's faster then reverse algorithm
                        if (new_formatted_pos === len) {
                            self.position($.terminal.length(command));
                        } else {
                            for (var i = 0; i < command_len; ++i) {
                                if (new_formatted_pos === get_formatted_position(i)) {
                                    self.position(i);
                                }
                            }
                        }
                    }
                    return self;
                }
            },
            visible: (function() {
                var visible = self.visible;
                return function() {
                    visible.apply(self, []);
                    redraw();
                    draw_prompt();
                };
            })(),
            show: (function() {
                var show = self.show;
                return function() {
                    show.apply(self, []);
                    redraw();
                    draw_prompt();
                };
            })(),
            resize: function(num) {
                if (num) {
                    num_chars = num;
                } else {
                    change_num_chars();
                }
                redraw();
                draw_prompt();
                return self;
            },
            enable: function() {
                if (!enabled) {
                    enabled = true;
                    self.addClass('enabled');
                    try {
                        clip.caret(position);
                    } catch (e) {
                        // firefox throw NS_ERROR_FAILURE ignore
                    }
                    animation(true);
                    draw_prompt();
                }
                mobile_focus();
                return self;
            },
            isenabled: function() {
                return enabled;
            },
            disable: function(focus) {
                enabled = false;
                self.removeClass('enabled');
                animation(false);
                if (!focus) {
                    mobile_focus();
                }
                return self;
            },
            mask: function(new_mask) {
                if (typeof new_mask === 'undefined') {
                    return mask;
                } else {
                    mask = new_mask;
                    redraw();
                    return self;
                }
            }
        });
        //debug_object(self, 'cmd')('display_position');
        // ---------------------------------------------------------------------
        // :: INIT
        // ---------------------------------------------------------------------
        self.name(options.name || options.prompt || '');
        if (typeof options.prompt === 'string') {
            prompt = options.prompt;
        } else {
            prompt = '> ';
        }
        draw_prompt();
        if (options.enabled === undefined || options.enabled === true) {
            self.enable();
        }
        if (!options.history) {
            history.disable();
        }
        var first_up_history = true;
        // prevent_keypress - hack for Android that was inserting characters on
        // backspace
        var prevent_keypress = false;
        var dead_key = false;
        var single_key = false;
        var no_keypress = false;
        var no_key = false;
        var no_keydown = true;
        var backspace = false;
        var process = false;
        var skip_insert;
        // we hold text before keydown to fix backspace for Android/Chrome/SwiftKey
        // keyboard that generate keycode 229 for all keys #296
        var prev_command = '';
        // ---------------------------------------------------------------------
        // :: Keydown Event Handler
        // ---------------------------------------------------------------------
        function keydown_event(e) {
            debug('keydown "' + e.key + '" ' + e.fake + ' ' + e.which);
            process = (e.key || '').toLowerCase() === 'process' || e.which === 0;
            var result;
            dead_key = no_keypress && single_key;
            // special keys don't trigger keypress fix #293
            try {
                if (!e.fake) {
                    single_key = e.key && e.key.length === 1 && !e.ctrlKey;
                    // chrome on android support key property but it's "Unidentified"
                    no_key = String(e.key).toLowerCase() === 'unidentified';
                    backspace = e.key.toUpperCase() === 'BACKSPACE' || e.which === 8;
                }
            } catch (exception) {}
            // keydown created in input will have text already inserted and we
            // want text before input
            if (e.key === "Unidentified") {
                no_keydown = true;
                // android swift keyboard have always which == 229 we will triger proper
                // event in input with e.fake == true
                return;
            }
            if (!e.fake) {
                no_keypress = true;
                no_keydown = false;
            }
            // Meta+V did bind input but it didin't happen because terminal paste
            // prevent native insert action
            clip.off('input', paste);
            var key = get_key(e);
            if ($.isFunction(options.keydown)) {
                result = options.keydown(e);
                if (result !== undefined) {
                    //prevent_keypress = true;
                    if (!result) {
                        skip_insert = true;
                    }
                    return result;
                }
            }
            if (enabled) {
                // CTRL+V don't fire keypress in IE11
                skip_insert = ['CTRL+V', 'META+V'].indexOf(key) !== -1;
                if (e.which !== 38 && !(e.which === 80 && e.ctrlKey)) {
                    first_up_history = true;
                }
                // arrows / Home / End / ENTER
                if (reverse_search && (e.which === 35 || e.which === 36 ||
                                       e.which === 37 || e.which === 38 ||
                                       e.which === 39 || e.which === 40 ||
                                       e.which === 13 || e.which === 27)) {
                    clear_reverse_state();
                    draw_prompt();
                    if (e.which === 27) { // ESC
                        self.set('');
                    }
                    redraw();
                    // finish reverse search and execute normal event handler
                    /* jshint validthis:true */
                    keydown_event.call(this, e);
                } else if ($.isFunction(keymap[key])) {
                    result = keymap[key]();
                    if (result === true) {
                        return;
                    }
                    if (result !== undefined) {
                        return result;
                    }
                } else if (e.altKey) {
                    return;
                } else {
                    prevent_keypress = false;
                    return;
                }
                // this will prevent for instance backspace to go back one page
                //prevent_keypress = true;
                //e.preventDefault();
            }
        }
        var doc = $(document.documentElement || window);
        self.keymap(options.keymap || {});
        function keypress_event(e) {
            debug('keypress "' + e.key + '" ' + e.fake);
            var result;
            if (!e.fake) {
                no_keypress = false;
            }
            if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                return;
            }
            if (prevent_keypress) {
                return;
            }
            if ($.isFunction(options.keypress)) {
                result = options.keypress(e);
                if (result !== undefined) {
                    if (!result) {
                        skip_insert = true;
                    }
                    return result;
                }
            }
            if (enabled) {
                if (e.fake) {
                    // event created in input, we prevent inserting text
                    // in different interpreter when keydown called pop
                    return;
                }
                // key polyfill is not correct for keypress
                // https://github.com/cvan/keyboardevent-key-polyfill/issues/15
                var key;
                if (is_key_native() || e.fake) {
                    key = e.key;
                }
                if (!key || no_key) {
                    key = String.fromCharCode(e.which);
                }
                if (key.toUpperCase() === 'SPACEBAR') {
                    key = ' ';
                }
                if ($.inArray(e.which, [13, 0, 8]) > -1) {
                    if (e.keyCode === 123) { // for F12 which === 0
                        return;
                    }
                    return false;
                    // which === 100 - d
                } else if (key && (!e.ctrlKey || (e.ctrlKey && e.ctrlKey)) &&
                           (!(e.altKey && e.which === 100) || e.altKey) &&
                           !dead_key) {
                    // dead_key are handled by input event
                    if (reverse_search) {
                        rev_search_str += key;
                        reverse_history_search();
                        draw_reverse_prompt();
                    } else {
                        self.insert(key);
                    }
                }
            }
        }
        function event(type, chr, which) {
            var event = $.Event(type);
            event.which = which;
            event.key = chr;
            event.fake = true;
            doc.trigger(event);
        }
        function debug(str) {
            if (false) {
                console.log(str);
                //$.terminal.active().echo(str);
            }
        }
        function input_event(e) {
            debug('input ' + no_keydown + ' || ' + process + ' ((' + no_keypress +
                  ' || ' + dead_key + ') && !' + skip_insert + ' && (' + single_key +
                  ' || ' + no_key + ') && !' + backspace + ')');
            debug(JSON.stringify({
                data: e.originalEvent.data,
                inputType: e.originalEvent.data
            }));
            // Some Androids don't fire keypress - #39
            // if there is dead_key we also need to grab real character #158
            // Firefox/Android with google keyboard don't fire keydown and keyup #319
            var val = clip.val();
            if ((no_keydown || process || ((no_keypress || dead_key) && !skip_insert &&
                                          (single_key || no_key) && !backspace)) &&
                val !== command) {
                var pos = position;
                // backspace is set in keydown if no keydown we need to get new one
                if (no_keydown) {
                    var cmd = prev_command;
                    backspace = cmd.substring(0, cmd.length - 1).length === val.length;
                }
                if (reverse_search) {
                    rev_search_str = val;
                    reverse_history_search();
                    draw_reverse_prompt();
                } else {
                    var chr = val.substring(position);
                    if (chr.length === 1 || backspace) {
                        // we trigger events so keypress and keydown callback work
                        if (no_keydown) {
                            var keycode;
                            if (backspace) {
                                keycode = 8;
                            } else {
                                keycode = chr.toUpperCase().charCodeAt(0);
                            }
                            event('keydown', backspace ? 'Backspace' : chr, keycode);
                        }
                        if (no_keypress && !backspace) {
                            event('keypress', chr, chr.charCodeAt(0));
                        }
                    }
                    if (backspace) {
                        prev_command = command;
                        return;
                    }
                    // if user return false in keydown we don't want to insert text
                    if (skip_insert) {
                        skip_insert = false;
                        return;
                    }
                    self.set(val);
                }
                if (backspace) {
                    self.position(pos - 1);
                } else {
                    // user enter more then one character if click on complete word
                    // on android
                    self.position(pos + Math.abs(val.length - prev_command.length));
                }
            }
            prev_command = command;
            skip_insert = false;
            no_keydown = true;
        }
        doc.bind('keypress.cmd', keypress_event).bind('keydown.cmd', keydown_event)
            .bind('input.cmd', input_event);
        (function() {
            var was_down = false;
            var count = 0;
            self.on('mousedown.cmd', function() {
                was_down = true;
            }).on('mouseup.cmd', function(e) {
                if (e.originalEvent.button === 0 && get_selected_text() === '') {
                    var name = 'click_' + id;
                    if (++count === 1) {
                        var down = was_down;
                        if (enabled) {
                            self.oneTime(options.clickTimeout, name, function() {
                                var $target = $(e.target);
                                if (!$target.is('.prompt') && down) {
                                    if (enabled) {
                                        if ($target.is('.cmd')) {
                                            self.position(command.length);
                                        } else {
                                            self.display_position(get_char_pos(e));
                                        }
                                    }
                                }
                                count = 0;
                            });
                        } else {
                            count = 0;
                        }
                    } else {
                        self.stopTime(name);
                        count = 0;
                    }
                }
                was_down = false;
            });
        })();
        self.data('cmd', self);
        if (!('KeyboardEvent' in window && 'key' in window.KeyboardEvent.prototype)) {
            setTimeout(function() {
                throw new Error('key event property not supported try ' +
                                'https://github.com/cvan/keyboardevent-key-polyfill');
            }, 0);
        }
        return self;
    }; // cmd plugin
    // -------------------------------------------------------------------------
    /* eslint-disable */
    // https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    var mobile_re = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
    var tablet_re = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
    var format_split_re = /(\[\[[!gbiuso]*;[^;]*;[^\]]*\](?:[^\]]*[^\\](\\\\)*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]?)/i;
    var format_parts_re = /\[\[([!gbiuso]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]?/gi;
    var format_re = /\[\[([!gbiuso]*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]?/gi;
    var format_exist_re = /\[\[([!gbiuso]*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]/gi;
    var format_full_re = /^\[\[([!gbiuso]*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]$/gi;
    var color_hex_re = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    var url_re = /(\bhttps?:\/\/(?:(?:(?!&[^;]+;)|(?=&amp;))[^\s"'<>\][)])+\b)/gi;
    var url_nf_re = /\b(https?:\/\/(?:(?:(?!&[^;]+;)|(?=&amp;))[^\s"'<>\][)])+)\b(?![^[\]]*])/gi;
    var email_re = /((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;
    var command_re = /((?:"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S))+)(?=\s|$)/gi;
    var format_begin_re = /(\[\[[!gbiuso]*;[^;]*;[^\]]*\])/i;
    var format_start_re = /^(\[\[[!gbiuso]*;[^;]*;[^\]]*\])/i;
    var format_end_re = /\[\[[!gbiuso]*;[^;]*;[^\]]*\]?$/i;
    var format_exec_re = /(\[\[(?:[^\]]|\\\])+\]\])/;
    var float_re = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
    var re_re = /^\/((?:\\\/|[^/]|\[[^\]]*\/[^\]]*\])+)\/([gimy]*)$/;
    var unclosed_strings_re = /^(?=((?:[^"']+|"[^"\\]*(?:\\[^][^"\\]*)*"|'[^'\\]*(?:\\[^][^'\\]*)*')*))\1./;
    /* eslint-enable */
    // -------------------------------------------------------------------------
    // :: TOOLS
    // -------------------------------------------------------------------------
    // taken from https://hacks.mozilla.org/2011/09/detecting-and-generating-
    // css-animations-in-javascript/
    var support_animations = (function() {
        var animation = false,
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            elm = document.createElement('div');
        if (elm.style.animationName) {
            animation = true;
        }
        if (animation === false) {
            for (var i = 0; i < domPrefixes.length; i++) {
                var name = domPrefixes[i] + 'AnimationName';
                if (elm.style[name] !== undefined) {
                    animation = true;
                    break;
                }
            }
        }
        elm = null;
        return animation;
    })();
    // -------------------------------------------------------------------------
    var is_android = navigator.userAgent.toLowerCase().indexOf('android') !== -1;
    // -------------------------------------------------------------------------
    var strlen = (function() {
        if (typeof wcwidth === 'undefined') {
            return function(string) {
                return string.length;
            };
        } else {
            return wcwidth;
        }
    })();
    function bare_text(string) {
        return $('<span>' + safe(string) + '</span>').text();
    }
    function text(string) {
        return bare_text($.terminal.strip(string));
    }
    function safe(string) {
        return string.replace(/>/g, '&gt;').replace(/</g, '&lt;');
    }
    // -------------------------------------------------------------------------
    var is_mobile = (function(a) {
        var check = false;
        if (mobile_re.test(a) || tablet_re.test(a.substr(0, 4))) {
            check = true;
        }
        return check;
    })(navigator.userAgent || navigator.vendor || window.opera);
    // ---------------------------------------------------------------------
    // :: Cross-Browser selection utils
    // ---------------------------------------------------------------------
    var get_selected_text = (function() {
        if (window.getSelection || document.getSelection) {
            return function() {
                var selection = (window.getSelection || document.getSelection)();
                if (selection.text) {
                    return selection.text;
                } else {
                    return selection.toString();
                }
            };
        } else if (document.selection && document.selection.type !== "Control") {
            return function() {
                return document.selection.createRange().text;
            };
        }
        return function() {
            return '';
        };
    })();
    // ---------------------------------------------------------------------
    function text_to_clipboard(container, text) {
        var $div = $('<div>' + text.replace(/\n/, '<br/>') + '<div>');
        $div.appendTo('body');
        select_all($div[0]);
        try {
            document.execCommand('copy');
        } catch (e) {}
        $div.remove();
    }
    // ---------------------------------------------------------------------
    var get_textarea_selection = (function() {
        var textarea = document.createElement('textarea');
        var selectionStart = 'selectionStart' in textarea;
        textarea = null;
        if (selectionStart) {
            return function(textarea) {
                var length = textarea.selectionEnd - textarea.selectionStart;
                return textarea.value.substr(textarea.selectionStart, length);
            };
        } else if (document.selection) {
            return function() {
                var range = document.selection.createRange();
                return range.text();
            };
        } else {
            return function() {
                return '';
            };
        }
    })();
    function clear_textarea_selection(textarea) {
        textarea.selectionStart = textarea.selectionEnd = 0;
    }
    // ---------------------------------------------------------------------
    var select = (function() {
        if (window.getSelection) {
            var selection = window.getSelection();
            if (selection.setBaseAndExtent) {
                return function(start, end) {
                    var selection = window.getSelection();
                    selection.setBaseAndExtent(start, 0, end, 1);
                };
            } else {
                return function(start, end) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.setStart(start, 0);
                    range.setEnd(end, end.childNodes.length);
                    selection.removeAllRanges();
                    selection.addRange(range);
                };
            }
        } else {
            return $.noop;
        }
    })();
    // ---------------------------------------------------------------------
    function select_all(element) {
        if (window.getSelection) {
            var selection = window.getSelection();
            if (selection.setBaseAndExtent) {
                selection.setBaseAndExtent(element, 0, element, 1);
            } else if (document.createRange) {
                var range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }
    // -------------------------------------------------------------------------
    function process_command(string, fn) {
        var array = string.match(command_re) || [];
        if (array.length) {
            var name = array.shift();
            var args = $.map(array, function(arg) {
                if (arg.match(/^["']/)) {
                    arg = arg.replace(/\n/g, '\\u0000\\u0000\\u0000\\u0000');
                    arg = fn(arg);
                    return arg.replace(/\x00\x00\x00\x00/g, '\n');
                }
                return fn(arg);
            });
            var quotes = $.map(array, function(arg) {
                var m = arg.match(/^(['"]).*\1$/);
                return m && m[1] || '';
            });
            var rest = string.substring(name.length).trim();
            return {
                command: string,
                name: name,
                args: args,
                args_quotes: quotes,
                rest: rest
            };
        } else {
            return {
                command: string,
                name: '',
                args: [],
                args_quotes: quotes,
                rest: ''
            };
        }
    }
    $.terminal = {
        version: '1.10.1',
        date: 'Thu, 09 Nov 2017 16:40:28 +0000',
        // colors from http://www.w3.org/wiki/CSS/Properties/color/keywords
        color_names: [
            'transparent', 'currentcolor', 'black', 'silver', 'gray', 'white',
            'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive',
            'yellow', 'navy', 'blue', 'teal', 'aqua', 'aliceblue',
            'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque',
            'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown',
            'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral',
            'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
            'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
            'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange',
            'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
            'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise',
            'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
            'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
            'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green',
            'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo',
            'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen',
            'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
            'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey',
            'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue',
            'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow',
            'lime', 'limegreen', 'linen', 'magenta', 'maroon',
            'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
            'mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
            'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream',
            'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive',
            'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
            'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
            'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red',
            'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown',
            'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
            'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan',
            'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat',
            'white', 'whitesmoke', 'yellow', 'yellowgreen'],
        // for unit tests
        Cycle: Cycle,
        History: History,
        Stack: Stack,
        // ---------------------------------------------------------------------
        // :: Validate html color (it can be name or hex)
        // ---------------------------------------------------------------------
        valid_color: function valid_color(color) {
            if (color.match(color_hex_re)) {
                return true;
            } else {
                return $.inArray(color.toLowerCase(),
                                 $.terminal.color_names) !== -1;
            }
        },
        // ---------------------------------------------------------------------
        // :: function check if given string contain invalid strings
        // ---------------------------------------------------------------------
        unclosed_strings: function unclosed_strings(string) {
            return !!string.match(unclosed_strings_re);
        },
        // ---------------------------------------------------------------------
        // :: Escape all special regex characters, so it can be use as regex to
        // :: match exact string that contain those characters
        // ---------------------------------------------------------------------
        escape_regex: function escape_regex(str) {
            if (typeof str === 'string') {
                var special = /([-\\^$[\]()+{}?*.|])/g;
                return str.replace(special, '\\$1');
            }
        },
        // ---------------------------------------------------------------------
        // :: test if string contain formatting
        // ---------------------------------------------------------------------
        have_formatting: function have_formatting(str) {
            return typeof str === 'string' && !!str.match(format_exist_re);
        },
        is_formatting: function is_formatting(str) {
            return typeof str === 'string' && !!str.match(format_full_re);
        },
        // ---------------------------------------------------------------------
        // :: return array of formatting and text between them
        // ---------------------------------------------------------------------
        format_split: function format_split(str) {
            return str.split(format_split_re).filter(Boolean);
        },
        // ---------------------------------------------------------------------
        // :: helper function used by substring and split_equal it loop over
        // :: string and execute callback with text count and other data
        // ---------------------------------------------------------------------
        iterate_formatting: function iterate_formatting(string, callback) {
            function is_space(i) {
                return string.substring(i - 6, i) === '&nbsp;' ||
                    string.substring(i - 1, i).match(/\s/);
            }
            function match_entity(index) {
                return string.substring(index).match(/^(&[^;]+;)/);
            }
            var formatting = false;
            var in_text = false;
            var count = 0;
            var match;
            var space = -1;
            var prev_space;
            var length = 0;
            for (var i = 0; i < string.length; i++) {
                match = string.substring(i).match(format_start_re);
                if (match) {
                    formatting = match[1];
                    in_text = false;
                } else if (formatting) {
                    if (string[i] === ']') {
                        if (in_text) {
                            formatting = '';
                            in_text = false;
                        } else {
                            in_text = true;
                        }
                    }
                } else {
                    in_text = true;
                }
                var not_formatting = (formatting && in_text) || !formatting;
                var opening = string[i] === '[' && string[i + 1] === '[';
                if (is_space(i) && (not_formatting || opening)) {
                    if (space === -1 && prev_space !== i || space !== -1) {
                        space = i;
                    }
                }
                var braket = string[i].match(/[[\]]/);
                if (not_formatting) {
                    // treat entity as one character
                    if (string[i] === '&') {
                        match = match_entity(i);
                        if (match) {
                            i += match[1].length - 2; // 2 because continue adds 1 to i
                            continue;
                        }
                        ++count;
                        ++length;
                    } else if (string[i] === ']' && string[i - 1] === '\\') {
                        // escape \] counts as one character
                        --count;
                        --length;
                    } else if (!braket) {
                        ++count;
                        ++length;
                    }
                }
                if (!braket && not_formatting) {
                    if (strlen(string[i]) === 2) {
                        length++;
                    }
                    var data = {
                        count: count,
                        index: i,
                        formatting: formatting,
                        length: length,
                        text: in_text,
                        space: space
                    };
                    var ret = callback(data);
                    if (ret === false) {
                        break;
                    } else if (ret) {
                        if (ret.count !== undefined) {
                            count = ret.count;
                        }
                        if (ret.length !== undefined) {
                            length = ret.length;
                        }
                        if (ret.space !== undefined) {
                            prev_space = space;
                            space = ret.space;
                        }
                        if (ret.index !== undefined) {
                            i = ret.index;

                        }
                    }
                }
            }
        },
        // ---------------------------------------------------------------------
        // :: formatting aware substring function
        // ---------------------------------------------------------------------
        substring: function substring(string, start_index, end_index) {
            if (text(string).substring(start_index, end_index) === '') {
                return '';
            }
            var start;
            var end = string.length;
            var start_formatting = '';
            var end_formatting = '';
            var prev_index;
            var re = /(&[^;]+);$/;
            $.terminal.iterate_formatting(string, function(data) {
                var m;
                if (start_index && data.count === start_index + 1) {
                    start = data.index;
                    m = string.substring(0, start + 1).match(re);
                    if (m) {
                        start -= m[1].length;
                    }
                    if (data.formatting) {
                        start_formatting = data.formatting;
                    }
                }
                if (end_index && data.count === end_index + 1) {
                    end = data.index;
                    m = string.substring(0, end + 1).match(re);
                    if (m) {
                        end -= m[1].length;
                    }
                    if (data.formatting) {
                        end = prev_index + 1;
                    }
                }
                if (end_index && data.count === end_index) {
                    end_formatting = data.formatting;
                    prev_index = data.index;
                }
            });
            if (start_index && !start) {
                return '';
            }
            string = start_formatting + string.substring(start, end);
            if (end_formatting) {
                string = string.replace(/(\[\[^\]]+)?\]$/, '');
                string += ']';
            }
            return string;
        },
        // ---------------------------------------------------------------------
        // :: add format text as 5th paramter to formatting it's used for
        // :: data attribute in format function
        // ---------------------------------------------------------------------
        normalize: function normalize(string) {
            return string.replace(format_re, function(_, format, text) {
                if (text === '') {
                    return '';
                }
                var semicolons = format.match(/;/g).length;
                // missing semicolons
                if (semicolons >= 4) {
                    var args = format.split(/;/);
                    var start = args.slice(0, 4).join(';');
                    var arg = args.slice(4).join(';');
                    return '[[' + start + ';' + (arg || text) + ']' + text + ']';
                } else if (semicolons === 2) {
                    semicolons = ';;';
                } else if (semicolons === 3) {
                    semicolons = ';';
                } else {
                    semicolons = '';
                }
                // return '[[' + format + ']' + text + ']';
                // closing braket will break formatting so we need to escape
                // those using html entity equvalent
                var safe = text.replace(/\\\]/g, '&#93;').replace(/\n/g, '\\n').
                    replace(/&nbsp;/g, ' ');
                return '[[' + format + semicolons + safe + ']' + text + ']';
            });
        },
        // ---------------------------------------------------------------------
        // :: split text into lines with equal length so each line can be
        // :: rendered separately (text formatting can be longer then a line).
        // ---------------------------------------------------------------------
        split_equal: function split_equal(str, length, keep_words) {
            var prev_format = '';
            var result = [];
            var array = $.terminal.normalize(str).split(/\n/g);
            for (var i = 0, len = array.length; i < len; ++i) {
                if (array[i] === '') {
                    result.push('');
                    continue;
                }
                var line = array[i];
                var first_index = 0;
                var output;
                var line_length = line.length;
                $.terminal.iterate_formatting(line, function(data) {
                    // we don't iterate over last closing bracket
                    var last_bracket = data.index === line_length - 2 &&
                        line[data.index + 1] === ']';
                    var last_iteraction = data.index === line_length - 1 || last_bracket;
                    if (data.length >= length || last_iteraction ||
                        (data.length === length - 1 &&
                         strlen(line[data.index + 1]) === 2)) {
                        var can_break = false;
                        if (keep_words && data.space !== -1) {
                            var stripped = $.terminal.strip(line.substring(data.space));
                            // replace html entities with characters
                            stripped = $('<span>' + stripped + '</span>').text();
                            // real length, not counting formatting
                            var text_len = stripped.length;
                            var limit = data.index + length + 1;
                            stripped = stripped.substring(0, limit);
                            if (stripped.match(/\s|&nbsp;/) || limit > text_len) {
                                can_break = true;
                            }
                        }
                        // if words is true we split at last space and make next loop
                        // continue where the space where located
                        if (keep_words && !last_bracket && data.space !== -1 &&
                            data.index !== line_length - 1 && can_break) {
                            output = line.substring(first_index, data.space);
                            var new_index = data.space - 1;
                        } else {
                            output = line.substring(first_index, data.index + 1);
                        }
                        if (keep_words) {
                            output = output.replace(/^(&nbsp;|\s)+|(&nbsp;|\s)+$/g, '');
                        }
                        first_index = (new_index || data.index) + 1;
                        if (prev_format) {
                            var closed_formatting = output.match(/^[^\]]*\]/);
                            output = prev_format + output;
                            if (closed_formatting) {
                                prev_format = '';
                            }
                        }
                        if (last_bracket) {
                            output += ']';
                            prev_format = '';
                        }
                        var matched = output.match(format_re);
                        if (matched) {
                            var last = matched[matched.length - 1];
                            if (last[last.length - 1] !== ']') {
                                prev_format = last.match(format_begin_re)[1];
                                output += ']';
                            } else if (output.match(format_end_re)) {
                                output = output.replace(format_end_re, '');
                                prev_format = last.match(format_begin_re)[1];
                            }
                        }
                        output = output.replace(/^(\[\[[^\]]+\])?\]/, '');
                        result.push(output);
                        // modify loop by returing new data
                        return {index: new_index, length: 0, space: -1};
                    }
                });
            }
            return result;
        },
        // ---------------------------------------------------------------------
        // :: Escape & that's not part of entity
        // ---------------------------------------------------------------------
        amp: function(str) {
            return str.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g, '&amp;');
        },
        // ---------------------------------------------------------------------
        // :: Encode formating as html for insertion into DOM
        // ---------------------------------------------------------------------
        encode: function encode(str) {
            return $.terminal.amp(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/ /g, '&nbsp;')
                .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        },
        // -----------------------------------------------------------------------
        // :: Default formatter that allow for nested formatting, example:
        // :: [[;;#000]hello [[;#f00;]red] world]
        // -----------------------------------------------------------------------
        nested_formatting: function nested_formatting(string) {
            if (!$.terminal.have_formatting(string)) {
                return string;
            }
            var stack = [];
            var re = /((?:\[\[(?:[^\]]|\\\])+\])?(?:[^\][]|\\\])*\]?)/;
            var format_re = /(\[\[(?:[^\]]|\\\])+\])[\s\S]*/;
            return string.split(re).filter(Boolean).map(function(string) {
                if (string.match(/^\[\[/)) {
                    if (!$.terminal.is_formatting(string)) {
                        string += ']';
                        stack.push(string.replace(format_re, '$1'));
                    }
                } else {
                    var pop = false;
                    if (string.match(/\]/)) {
                        pop = true;
                    }
                    if (stack.length) {
                        string = stack[stack.length - 1] + string;
                    }
                    if (pop) {
                        stack.pop();
                    } else if (stack.length) {
                        string += ']';
                    }
                }
                return string;
            }).join('');
        },
        // ---------------------------------------------------------------------
        // :: safe function that will render text as it is
        // ---------------------------------------------------------------------
        escape_formatting: function escape_formatting(string) {
            return $.terminal.escape_brackets(string);
        },
        // ---------------------------------------------------------------------
        // :: apply custom formatters only to text
        // ---------------------------------------------------------------------
        apply_formatters: function(string) {
            var formatters = $.terminal.defaults.formatters;
            var i = 0;
            try {
                return formatters.reduce(function(string, formatter) {
                    i++;
                    if (typeof formatter === 'function' && formatter.__meta__) {
                        var ret = formatter(string);
                        if (typeof ret === 'string') {
                            return ret;
                        }
                    } else {
                        return $.terminal.format_split(string).map(function(string) {
                            if ($.terminal.is_formatting(string)) {
                                return string;
                            } else {
                                if (formatter instanceof Array) {
                                    return string.replace(formatter[0], formatter[1]);
                                } else if (typeof formatter === 'function') {
                                    var ret = formatter(string);
                                    if (typeof ret === 'string') {
                                        return ret;
                                    }
                                }
                                return string;
                            }
                        }).join('');
                    }
                    return string;
                }, string);
            } catch (e) {
                throw new Error('Error in formatter [' + (i - 1) + ']');
            }
        },
        // ---------------------------------------------------------------------
        // :: Replace terminal formatting with html
        // ---------------------------------------------------------------------
        format: function format(str, options) {
            function safe_text(string) {
                return safe(string.replace(/(\\+)]/g, function(_, slashes) {
                    if (slashes.length % 2 === 1) {
                        return ']';
                    } else {
                        return slashes.replace(/../, '\\');
                    }
                }));
            }
            var settings = $.extend({}, {
                linksNoReferrer: false
            }, options || {});
            if (typeof str === 'string') {
                // support for formating foo[[u;;]bar]baz[[b;#fff;]quux]zzz
                var splitted = $.terminal.format_split(str);
                str = $.map(splitted, function(text) {
                    if (text === '') {
                        return text;
                    } else if ($.terminal.is_formatting(text)) {
                        // fix &nbsp; inside formatting because encode is called
                        // before format
                        text = text.replace(/\[\[[^\]]+\]/, function(text) {
                            return text.replace(/&nbsp;/g, ' ');
                        });
                        return text.replace(format_parts_re, function(s,
                                                                      style,
                                                                      color,
                                                                      background,
                                                                      _class,
                                                                      data_text,
                                                                      text) {
                            if (text === '') {
                                return ''; //'<span>&nbsp;</span>';
                            }
                            text = safe_text(text);
                            var style_str = '';
                            if (style.indexOf('b') !== -1) {
                                style_str += 'font-weight:bold;';
                            }
                            var text_decoration = [];
                            if (style.indexOf('u') !== -1) {
                                text_decoration.push('underline');
                            }
                            if (style.indexOf('s') !== -1) {
                                text_decoration.push('line-through');
                            }
                            if (style.indexOf('o') !== -1) {
                                text_decoration.push('overline');
                            }
                            if (text_decoration.length) {
                                style_str += 'text-decoration:' +
                                    text_decoration.join(' ') + ';';
                            }
                            if (style.indexOf('i') !== -1) {
                                style_str += 'font-style:italic;';
                            }
                            if (typeof wcwidth !== 'undefined') {
                                var len = strlen(bare_text(text));
                                if (len !== 1) {
                                    style_str += '--length: ' + len + ';';
                                }
                            }
                            if ($.terminal.valid_color(color)) {
                                style_str += 'color:' + color + ';';
                                if (style.indexOf('g') !== -1) {
                                    style_str += 'text-shadow:0 0 5px ' + color + ';';
                                }
                            }
                            if ($.terminal.valid_color(background)) {
                                style_str += 'background-color:' + background;
                            }
                            var data;
                            if (data_text === '') {
                                data = text;
                            } else {
                                data = data_text.replace(/&#93;/g, ']')
                                    .replace(/>/g, '&gt;').replace(/</g, '&lt;');
                            }
                            var result;
                            if (style.indexOf('!') !== -1) {
                                if (data.match(email_re)) {
                                    result = '<a href="mailto:' + data + '"';
                                } else {
                                    result = '<a target="_blank" href="' + data + '"';
                                    if (settings.linksNoReferrer) {
                                        result += ' rel="noreferrer noopener"';
                                    } else {
                                        result += ' rel="noopener"';
                                    }
                                }
                                // make focus to terminal textarea that will enable
                                // terminal when pressing tab and terminal is disabled
                                result += ' tabindex="1000"';
                            } else {
                                result = '<span';
                            }
                            if (style_str !== '') {
                                result += ' style="' + style_str + '"';
                            }
                            if (_class !== '') {
                                result += ' class="' + _class + '"';
                            }
                            if (style.indexOf('!') !== -1) {
                                result += '>' + text + '</a>';
                            } else {
                                result += ' data-text="' +
                                    data.replace(/"/g, '&quote;') + '">' +
                                    text + '</span>';
                            }
                            return result;
                        });
                    } else {
                        text = safe_text(text);
                        if (typeof wcwidth !== 'undefined') {
                            var len = strlen(bare_text(text));
                            var style = len !== 1 ? ' style="--length: ' + len + '"' : '';
                        } else {
                            style = '';
                        }
                        return '<span' + style + '>' + text + '</span>';
                    }
                }).join('');
                return str.replace(/<span><br\s*\/?><\/span>/gi, '<br/>');
            } else {
                return '';
            }
        },
        // ---------------------------------------------------------------------
        // :: Replace brackets with html entities
        // ---------------------------------------------------------------------
        escape_brackets: function escape_brackets(string) {
            return string.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
        },
        // ---------------------------------------------------------------------
        // :: return number of characters without formatting
        // ---------------------------------------------------------------------
        length: function(string) {
            return text(string).length;
        },
        // ---------------------------------------------------------------------
        // :: return string where array items are in columns padded spaces
        // ---------------------------------------------------------------------
        columns: function(array, cols, space) {
            var lengths = array.map(function(string) {
                return string.length;
            });
            var length = Math.max.apply(null, lengths) + space;
            if (typeof space === 'undefined') {
                space = 4;
            }
            var columns = Math.floor(cols / length);
            var lines = [];
            var line;
            function push(i) {
                var pad = new Array(length - array[i].length).join(' ');
                line.push(array[i] + ((i % columns === 0) ? '' : pad));
            }
            if (columns < 2) {
                return array.join('\n');
            }
            for (var i = 0; i < array.length; ++i) {
                if (i % columns === 0) {
                    if (line) {
                        push(i);
                        lines.push(line.join(''));
                    }
                    line = [];
                } else {
                    push(i);
                }
            }
            return lines.join('\n');
        },
        // ---------------------------------------------------------------------
        // :: Remove formatting from text
        // ---------------------------------------------------------------------
        strip: function strip(str) {
            str = str.replace(format_parts_re, '$6');
            return str.replace(/(\\?)([[\]])/g, function(whole, slash) {
                if (slash) {
                    return whole;
                } else {
                    return '';
                }
            });
        },
        // ---------------------------------------------------------------------
        // :: Return active terminal
        // ---------------------------------------------------------------------
        active: function active() {
            return terminals.front();
        },
        // ---------------------------------------------------------------------
        // :: Implmentation detail id is always length of terminals Cycle
        // ---------------------------------------------------------------------
        last_id: function last_id() {
            var len = terminals.length();
            if (len) {
                return len - 1;
            }
        },
        // ---------------------------------------------------------------------
        // :: Function that works with strings like 'asd' 'asd\' asd' "asd asd"
        // :: asd\ 123 -n -b / [^ ]+ / /\s+/ asd\ a it creates a regex and
        // :: numbers and replaces escape characters in double quotes
        // :: if strict is set to false it only strips single and double quotes
        // :: and escapes spaces
        // ---------------------------------------------------------------------
        parse_argument: function parse_argument(arg, strict) {
            function parse_string(string) {
                // remove quotes if before are even number of slashes
                // we don't remove slases becuase they are handled by JSON.parse
                //string = string.replace(/([^\\])['"]$/, '$1');
                if (string.match(/^['"]/)) {
                    var quote = string[0];
                    var re = new RegExp("((^|[^\\\\])(?:\\\\\\\\)*)" + quote, "g");
                    string = string.replace(re, "$1");
                }
                // use build in function to parse rest of escaped characters
                return JSON.parse('"' + string + '"');
            }
            if (strict === false) {
                if (arg[0] === "'" && arg[arg.length - 1] === "'") {
                    return arg.replace(/^'|'$/g, '');
                } else if (arg[0] === '"' && arg[arg.length - 1] === '"') {
                    return arg.replace(/^"|"$/g, '').replace(/\\([" ])/g, '$1');
                } else if (arg.match(/\/.*\/[gimy]*$/)) {
                    return arg;
                } else if (arg.match(/['"]]/)) {
                    // part of arg is in quote
                    return parse_string(arg);
                } else {
                    return arg.replace(/\\ /g, ' ');
                }
            }
            var regex = arg.match(re_re);
            if (regex) {
                return new RegExp(regex[1], regex[2]);
            } else if (arg.match(/['"]/)) {
                return parse_string(arg);
            } else if (arg.match(/^-?[0-9]+$/)) {
                return parseInt(arg, 10);
            } else if (arg.match(float_re)) {
                return parseFloat(arg);
            } else {
                return arg.replace(/\\(['"() ])/g, '$1');
            }
        },
        // ---------------------------------------------------------------------
        // :: function split and parse arguments
        // ---------------------------------------------------------------------
        parse_arguments: function parse_arguments(string) {
            return $.map(string.match(command_re) || [], $.terminal.parse_argument);
        },
        // ---------------------------------------------------------------------
        // :: Function split and strips single and double quotes
        // :: and escapes spaces
        // ---------------------------------------------------------------------
        split_arguments: function(string) {
            return $.map(string.match(command_re) || [], function(arg) {
                return $.terminal.parse_argument(arg, false);
            });
        },
        // ---------------------------------------------------------------------
        // :: Function that returns an object {name,args}. Arguments are parsed
        // :: using the function parse_arguments
        // ---------------------------------------------------------------------
        parse_command: function parse_command(string) {
            return process_command(string, $.terminal.parse_argument);
        },
        // ---------------------------------------------------------------------
        // :: Same as parse_command but arguments are parsed using split_arguments
        // ---------------------------------------------------------------------
        split_command: function(string) {
            return process_command(string, function(arg) {
                return $.terminal.parse_argument(arg, false);
            });
        },
        // ---------------------------------------------------------------------
        // :: function executed for each text inside [{ .... }]
        // ---------------------------------------------------------------------
        extended_command: function extended_command(term, string) {
            try {
                change_hash = false;
                term.exec(string, true).done(function() {
                    change_hash = true;
                });
            } catch (e) {
                // error is process in exec
            }
        },
        formatter: new (function() {
            try {
                this[Symbol.split] = function(string) {
                    return $.terminal.format_split(string);
                };
                this[Symbol.match] = function(string) {
                    return string.match(format_re);
                };
                this[Symbol.replace] = function(string, replacer) {
                    return string.replace(format_parts_re, replacer);
                };
                this[Symbol.search] = function(string) {
                    return string.search(format_re);
                };
            } catch (e) {
            }
        })()
    };
    // -----------------------------------------------------------------------
    // Helper plugins and functions
    // -----------------------------------------------------------------------
    $.fn.visible = function() {
        return this.css('visibility', 'visible');
    };
    $.fn.hidden = function() {
        return this.css('visibility', 'hidden');
    };
    // -----------------------------------------------------------------------
    // :: hack to get scroll element if terminal attached to the body
    // :: is better then userAgent sniffing because other browsers beside
    // :: chrome may use body as scroll element instead of html like
    // :: IE and FireFox
    // -----------------------------------------------------------------------
    $.fn.scroll_element = function() {
        var defaults = $.fn.scroll_element.defaults;
        return this.map(function() {
            var $this = $(this);
            if ($this.is('body')) {
                var html = $('html');
                var body = $('body');
                var scrollTop = body.scrollTop() || html.scrollTop();
                var pre = $('<pre/>').css(defaults.pre).appendTo('body');
                pre.html(new Array(defaults.lines).join('\n'));
                $('body,html').scrollTop(10);
                var scroll_object;
                if (body.scrollTop() === 10) {
                    body.scrollTop(scrollTop);
                    scroll_object = body[0];
                } else if (html.scrollTop() === 10) {
                    html.scrollTop(scrollTop);
                    scroll_object = html[0];
                }
                pre.remove();
                return scroll_object;
            } else {
                return this;
            }
        });
    };
    $.fn.scroll_element.defaults = {
        lines: 2000,
        pre: {
            'font-size': '100px',
            'white-space': 'pre' // just in case if user overwrite css for pre tag
        }
    };
    // -----------------------------------------------------------------------
    function is_key_native() {
        if (!('KeyboardEvent' in window && 'key' in window.KeyboardEvent.prototype)) {
            return false;
        }
        var proto = window.KeyboardEvent.prototype;
        var get = Object.getOwnPropertyDescriptor(proto, 'key').get;
        return get.toString().match(/\[native code\]/);
    }
    // -----------------------------------------------------------------------
    function warn(msg) {
        msg = '[jQuery Terminal] ' + msg;
        if (console && console.warn) {
            console.warn(msg);
        } else {
            // prevent catching in outer try..catch
            setTimeout(function() {
                throw new Error('WARN: ' + msg);
            }, 0);
        }
    }
    // -----------------------------------------------------------------------
    // JSON-RPC CALL
    // -----------------------------------------------------------------------
    var ids = {}; // list of url based ids of JSON-RPC
    $.jrpc = function(url, method, params, success, error) {
        var options;
        if ($.isPlainObject(url)) {
            options = url;
        } else {
            options = {
                url: url,
                method: method,
                params: params,
                success: success,
                error: error
            };
        }
        function validJSONRPC(response) {
            return $.isNumeric(response.id) &&
                (typeof response.result !== 'undefined' ||
                 typeof response.error !== 'undefined');
        }
        ids[options.url] = ids[options.url] || 0;
        var request = {
            'jsonrpc': '2.0',
            'method': options.method,
            'params': options.params,
            'id': ++ids[options.url]
        };
        return $.ajax({
            url: options.url,
            beforeSend: function beforeSend(jxhr, settings) {
                if ($.isFunction(options.request)) {
                    options.request(jxhr, request);
                }
                settings.data = JSON.stringify(request);
            },
            success: function success(response, status, jqXHR) {
                var content_type = jqXHR.getResponseHeader('Content-Type');
                if (!content_type.match(/(application|text)\/json/)) {
                    warn('Response Content-Type is neither application/json' +
                         ' nor text/json');
                }
                var json;
                try {
                    json = JSON.parse(response);
                } catch (e) {
                    if (options.error) {
                        options.error(jqXHR, 'Invalid JSON', e);
                    } else {
                        throw new Error('Invalid JSON');
                    }
                    return;
                }
                if ($.isFunction(options.response)) {
                    options.response(jqXHR, json);
                }
                if (validJSONRPC(json) || options.method === 'system.describe') {
                    // don't catch errors in success callback
                    options.success(json, status, jqXHR);
                } else if (options.error) {
                    options.error(jqXHR, 'Invalid JSON-RPC');
                } else {
                    throw new Error('Invalid JSON-RPC');
                }
            },
            error: options.error,
            contentType: 'application/json',
            dataType: 'text',
            async: true,
            cache: false,
            // timeout: 1,
            type: 'POST'
        });
    };

    // -----------------------------------------------------------------------
    /*
    function is_scrolled_into_view(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
    }
    */
    // -----------------------------------------------------------------------
    // :: Create fake terminal to calcualte the dimention of one character
    // :: this will make terminal work if terminal div is not added to the
    // :: DOM at init like with:
    // :: $('<div/>').terminal().echo('foo bar').appendTo('body');
    // -----------------------------------------------------------------------
    function get_char_size(div) {
        var temp = $('<div class="terminal temp"><div class="cmd"><span cla' +
                     'ss="prompt">&nbsp;</span></div></div>').appendTo('body');
        if (div) {
            temp.attr('style', div.attr('style'));
        }
        var rect = temp.find('span')[0].getBoundingClientRect();
        var result = {
            width: rect.width,
            height: rect.height
        };
        temp.remove();
        return result;
    }
    // -----------------------------------------------------------------------
    // :: calculate numbers of characters
    // -----------------------------------------------------------------------
    function get_num_chars(terminal, char_size) {
        var width = terminal.find('.terminal-fill').width();
        var result = Math.floor(width / char_size.width);
        // random number to not get NaN in node but big enough to not wrap exception
        return result || 1000;
    }
    // -----------------------------------------------------------------------
    // :: Calculate number of lines that fit without scroll
    // -----------------------------------------------------------------------
    function get_num_rows(terminal, char_size) {
        return Math.floor(terminal.find('.terminal-fill').height() / char_size.height);
    }
    // -----------------------------------------------------------------------
    // :: try to copy given DOM element text to clipboard
    // -----------------------------------------------------------------------
    function all(array, fn) {
        var same = array.filter(function(item) {
            return item[fn]() === item;
        });
        return same.length === array.length;
    }
    function string_case(string) {
        var array = string.split('');
        if (all(array, 'toLowerCase')) {
            return 'lower';
        } else if (all(array, 'toUpperCase')) {
            return 'upper';
        } else {
            return 'mixed';
        }
    }
    function same_case(string) {
        return string_case(string) !== 'mixed';
    }
    // -----------------------------------------------------------------------
    // :: TERMINAL PLUGIN CODE
    // -----------------------------------------------------------------------
    var version_set = !$.terminal.version.match(/^\{\{/);
    var copyright = 'Copyright (c) 2011-2017 Jakub Jankiewicz <http://jcubic' +
        '.pl/me>';
    var version_string = version_set ? ' v. ' + $.terminal.version : ' ';
    // regex is for placing version string aligned to the right
    var reg = new RegExp(' {' + version_string.length + '}$');
    var name_ver = 'jQuery Terminal Emulator' +
        (version_set ? version_string : '');
    // -----------------------------------------------------------------------
    // :: Terminal Signatures
    // -----------------------------------------------------------------------
    var signatures = [
        ['jQuery Terminal', '(c) 2011-2017 jcubic'],
        [name_ver, copyright.replace(/^Copyright | *<.*>/g, '')],
        [name_ver, copyright.replace(/^Copyright /, '')],
        [
            '      _______                 ________                        __',
            '     / / _  /_ ____________ _/__  ___/______________  _____  / /',
            ' __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /',
            '/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__',
            '\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/_/_/ /_/  \\/\\__\\_\\___/',
            '         \\/          /____/                                   '
                .replace(reg, ' ') + version_string,
            copyright
        ],
        [
            '      __ _____                     ________                            ' +
                '  __',
            '     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___ ' +
                ' / /',
            ' __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ ' +
                '\\/ /',
            '/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // ' +
                '/ /__',
            '\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\' +
                '__\\_\\___/',
            ('          \\/              /____/                                     ' +
             '     ').replace(reg, '') + version_string,
            copyright
        ]
    ];
    // -----------------------------------------------------------------------
    // :: Default options
    // -----------------------------------------------------------------------
    $.terminal.nested_formatting.__meta__ = true;
    $.terminal.defaults = {
        prompt: '> ',
        history: true,
        exit: true,
        clear: true,
        enabled: true,
        maskChar: '*',
        wrap: true,
        checkArity: true,
        raw: false,
        exceptionHandler: null,
        pauseEvents: true,
        softPause: false,
        memory: false,
        cancelableAjax: true,
        processArguments: true,
        linksNoReferrer: false,
        processRPCResponse: null,
        completionEscape: true,
        convertLinks: true,
        extra: {},
        tabs: 4,
        historySize: 60,
        historyState: false,
        importHistory: false,
        historyFilter: null,
        echoCommand: true,
        scrollOnEcho: true,
        login: null,
        outputLimit: -1,
        formatters: [$.terminal.nested_formatting],
        onAjaxError: null,
        pasteImage: true,
        scrollBottomOffset: 20,
        wordAutocomplete: true,
        caseSensitiveAutocomplete: true,
        clickTimeout: 200,
        request: $.noop,
        response: $.noop,
        describe: 'procs',
        onRPCError: null,
        completion: false,
        onInit: $.noop,
        onClear: $.noop,
        onBlur: $.noop,
        onFocus: $.noop,
        onTerminalChange: $.noop,
        onExit: $.noop,
        onPush: $.noop,
        onPop: $.noop,
        keypress: $.noop,
        keydown: $.noop,
        onAfterRedraw: $.noop,
        onEchoCommand: $.noop,
        onFlush: $.noop,
        strings: {
            comletionParameters: 'From version 1.0.0 completion function need to' +
                ' have two arguments',
            wrongPasswordTryAgain: 'Wrong password try again!',
            wrongPassword: 'Wrong password!',
            ajaxAbortError: 'Error while aborting ajax call!',
            wrongArity: "Wrong number of arguments. Function '%s' expects %s got" +
                ' %s!',
            commandNotFound: "Command '%s' Not Found!",
            oneRPCWithIgnore: 'You can use only one rpc with describe == false ' +
                'or rpc without system.describe',
            oneInterpreterFunction: "You can't use more than one function (rpc " +
                'without system.describe or with option describe == false count' +
                 's as one)',
            loginFunctionMissing: "You didn't specify a login function",
            noTokenError: 'Access denied (no token)',
            serverResponse: 'Server responded',
            wrongGreetings: 'Wrong value of greetings parameter',
            notWhileLogin: "You can't call `%s' function while in login",
            loginIsNotAFunction: 'Authenticate must be a function',
            canExitError: "You can't exit from main interpreter",
            invalidCompletion: 'Invalid completion',
            invalidSelector: 'Sorry, but terminal said that "%s" is not valid ' +
                'selector!',
            invalidTerminalId: 'Invalid Terminal ID',
            login: 'login',
            password: 'password',
            recursiveCall: 'Recursive call detected, skip',
            notAString: '%s function: argument is not a string',
            redrawError: 'Internal error, wrong position in cmd redraw',
            invalidStrings: 'Command %s have unclosed strings'
        }
    };
    // -------------------------------------------------------------------------
    // :: All terminal globals
    // -------------------------------------------------------------------------
    var requests = []; // for canceling on CTRL+D
    var terminals = new Cycle(); // list of terminals global in this scope
    // state for all terminals, terminals can't have own array fo state because
    // there is only one popstate event
    var save_state = []; // hold objects returned by export_view by history API
    var hash_commands;
    var change_hash = false; // don't change hash on Init
    var fire_hash_change = true;
    var first_instance = true; // used by history state
    $.fn.terminal = function(init_interpreter, options) {
        function StorageHelper(memory) {
            if (memory) {
                this.storage = {};
            }
            this.set = function(key, value) {
                if (memory) {
                    this.storage[key] = value;
                } else {
                    $.Storage.set(key, value);
                }
            };
            this.get = function(key) {
                if (memory) {
                    return this.storage[key];
                } else {
                    return $.Storage.get(key);
                }
            };
            this.remove = function(key) {
                if (memory) {
                    delete this.storage[key];
                } else {
                    $.Storage.remove(key);
                }
            };
        }
        // ---------------------------------------------------------------------
        // :: helper function
        // ---------------------------------------------------------------------
        function get_processed_command(command) {
            if ($.terminal.unclosed_strings(command)) {
                var string = $.terminal.escape_brackets(command);
                throw new Error(sprintf(strings().invalidStrings, "`" + string + "`"));
            } else if ($.isFunction(settings.processArguments)) {
                return process_command(command, settings.processArguments);
            } else if (settings.processArguments) {
                return $.terminal.parse_command(command);
            } else {
                return $.terminal.split_command(command);
            }
        }
        // ---------------------------------------------------------------------
        // :: Display object on terminal
        // ---------------------------------------------------------------------
        function display_object(object) {
            if (typeof object === 'string') {
                self.echo(object);
            } else if (object instanceof Array) {
                self.echo($.map(object, function(object) {
                    return JSON.stringify(object);
                }).join(' '));
            } else if (typeof object === 'object') {
                self.echo(JSON.stringify(object));
            } else {
                self.echo(object);
            }
        }
        // Display line code in the file if line numbers are present
        function print_line(url_spec) {
            var re = /(.*):([0-9]+):([0-9]+)$/;
            // google chrome have line and column after filename
            var m = url_spec.match(re);
            if (m) {
                // TODO: do we need to call pause/resume or return promise?
                self.pause(settings.softPause);
                $.get(m[1], function(response) {
                    var prefix = location.href.replace(/[^/]+$/, '');
                    var file = m[1].replace(prefix, '');
                    self.echo('[[b;white;]' + file + ']');
                    var code = response.split('\n');
                    var n = +m[2] - 1;
                    self.echo(code.slice(n - 2, n + 3).map(function(line, i) {
                        if (i === 2) {
                            line = '[[;#f00;]' +
                                $.terminal.escape_brackets(line) + ']';
                        }
                        return '[' + (n + i) + ']: ' + line;
                    }).join('\n')).resume();
                }, 'text');
            }
        }
        // ---------------------------------------------------------------------
        // :: Helper function
        // ---------------------------------------------------------------------
        function display_json_rpc_error(error) {
            if ($.isFunction(settings.onRPCError)) {
                settings.onRPCError.call(self, error);
            } else {
                self.error('&#91;RPC&#93; ' + error.message);
                if (error.error && error.error.message) {
                    error = error.error;
                    // more detailed error message
                    var msg = '\t' + error.message;
                    if (error.file) {
                        msg += ' in file "' + error.file.replace(/.*\//, '') + '"';
                    }
                    if (error.at) {
                        msg += ' at line ' + error.at;
                    }
                    self.error(msg);
                }
            }
        }
        // ---------------------------------------------------------------------
        // :: Create interpreter function from url string
        // ---------------------------------------------------------------------
        function make_basic_json_rpc(url, auth) {
            var interpreter = function(method, params) {
                self.pause(settings.softPause);
                $.jrpc({
                    url: url,
                    method: method,
                    params: params,
                    request: function(jxhr, request) {
                        try {
                            settings.request.call(self, jxhr, request, self);
                        } catch (e) {
                            display_exception(e, 'USER');
                        }
                    },
                    response: function(jxhr, response) {
                        try {
                            settings.response.call(self, jxhr, response, self);
                        } catch (e) {
                            display_exception(e, 'USER');
                        }
                    },
                    success: function success(json) {
                        if (json.error) {
                            display_json_rpc_error(json.error);
                        } else if ($.isFunction(settings.processRPCResponse)) {
                            settings.processRPCResponse.call(self, json.result, self);
                        } else {
                            display_object(json.result);
                        }
                        self.resume();
                    },
                    error: ajax_error
                });
            };
            // this is the interpreter function
            return function(command, terminal) {
                if (command === '') {
                    return;
                }
                try {
                    command = get_processed_command(command);
                } catch (e) {
                    // exception can be thrown on invalid regex
                    display_exception(e, 'TERMINAL (get_processed_command)');
                    return;
                    // throw e; // this will show stack in other try..catch
                }
                if (!auth || command.name === 'help') {
                    // allows to call help without a token
                    interpreter(command.name, command.args);
                } else {
                    var token = terminal.token();
                    if (token) {
                        interpreter(command.name, [token].concat(command.args));
                    } else {
                        // should never happen
                        terminal.error('&#91;AUTH&#93; ' + strings().noTokenError);
                    }
                }
            };
        }
        // ---------------------------------------------------------------------
        // :: Create interpreter function from Object. If the value is object
        // :: it will create nested interpreters
        // ---------------------------------------------------------------------
        function make_object_interpreter(object, arity, login, fallback) {
            // function that maps commands to object methods
            // it keeps terminal context
            return function(user_command, terminal) {
                if (user_command === '') {
                    return;
                }
                // command = split_command_line(command);
                var command;
                try {
                    command = get_processed_command(user_command);
                } catch (e) {
                    // exception can be thrown on invalid regex
                    if ($.isFunction(settings.exception)) {
                        settings.exception(e, self);
                    } else {
                        self.error(e.toString());
                    }
                    return;
                    // throw e; // this will show stack in other try..catch
                }
                /*
                if (login) {
                    var token = self.token(true);
                    if (token) {
                        command.args = [token].concat(command.args);
                    } else {
                        terminal.error('&#91;AUTH&#93; ' + strings.noTokenError);
                        return;
                    }
                }*/
                var val = object[command.name];
                var type = $.type(val);
                if (type === 'function') {
                    if (arity && val.length !== command.args.length) {
                        self.error('&#91;Arity&#93; ' +
                                   sprintf(strings().wrongArity,
                                           command.name,
                                           val.length,
                                           command.args.length));
                    } else {
                        return val.apply(self, command.args);
                    }
                } else if (type === 'object' || type === 'string') {
                    var commands = [];
                    if (type === 'object') {
                        commands = Object.keys(val);
                        val = make_object_interpreter(val,
                                                      arity,
                                                      login);
                    }
                    terminal.push(val, {
                        prompt: command.name + '> ',
                        name: command.name,
                        completion: type === 'object' ? commands : undefined
                    });
                } else if ($.isFunction(fallback)) {
                    fallback(user_command, self);
                } else if ($.isFunction(settings.onCommandNotFound)) {
                    settings.onCommandNotFound.call(self, user_command, self);
                } else {
                    terminal.error(sprintf(strings().commandNotFound, command.name));
                }
            };
        }
        // ---------------------------------------------------------------------
        function ajax_error(xhr, status, error) {
            self.resume(); // onAjaxError can use pause/resume call it first
            if ($.isFunction(settings.onAjaxError)) {
                settings.onAjaxError.call(self, xhr, status, error);
            } else if (status !== 'abort') {
                self.error('&#91;AJAX&#93; ' + status + ' - ' +
                           strings().serverResponse + ':\n' +
                           $.terminal.escape_brackets(xhr.responseText));
            }
        }
        // ---------------------------------------------------------------------
        function make_json_rpc_object(url, auth, success) {
            function jrpc_success(json) {
                if (json.error) {
                    display_json_rpc_error(json.error);
                } else if ($.isFunction(settings.processRPCResponse)) {
                    settings.processRPCResponse.call(self, json.result, self);
                } else {
                    display_object(json.result);
                }
                self.resume();
            }
            function jrpc_request(jxhr, request) {
                try {
                    settings.request.call(self, jxhr, request, self);
                } catch (e) {
                    display_exception(e, 'USER');
                }
            }
            function jrpc_response(jxhr, response) {
                try {
                    settings.response.call(self, jxhr, response, self);
                } catch (e) {
                    display_exception(e, 'USER');
                }
            }
            function response(response) {
                var procs = response;
                // we check if it's false before we call this function but
                // it don't hurt to be explicit here
                if (settings.describe !== '') {
                    settings.describe.split('.').forEach(function(field) {
                        procs = procs[field];
                    });
                }
                if (procs && procs.length) {
                    var interpreter_object = {};
                    $.each(procs, function(_, proc) {
                        interpreter_object[proc.name] = function() {
                            var append = auth && proc.name !== 'help';
                            var args = Array.prototype.slice.call(arguments);
                            var args_len = args.length + (append ? 1 : 0);
                            if (settings.checkArity && proc.params &&
                                proc.params.length !== args_len) {
                                self.error('&#91;Arity&#93; ' +
                                           sprintf(strings().wrongArity,
                                                   proc.name,
                                                   proc.params.length,
                                                   args_len));
                            } else {
                                self.pause(settings.softPause);
                                if (append) {
                                    var token = self.token(true);
                                    if (token) {
                                        args = [token].concat(args);
                                    } else {
                                        self.error('&#91;AUTH&#93; ' +
                                                   strings().noTokenError);
                                    }
                                }
                                $.jrpc({
                                    url: url,
                                    method: proc.name,
                                    params: args,
                                    request: jrpc_request,
                                    response: jrpc_response,
                                    success: jrpc_success,
                                    error: ajax_error
                                });
                            }
                        };
                    });
                    interpreter_object.help = interpreter_object.help || function(fn) {
                        if (typeof fn === 'undefined') {
                            var names = response.procs.map(function(proc) {
                                return proc.name;
                            }).join(', ') + ', help';
                            self.echo('Available commands: ' + names);
                        } else {
                            var found = false;
                            $.each(procs, function(_, proc) {
                                if (proc.name === fn) {
                                    found = true;
                                    var msg = '';
                                    msg += '[[bu;#fff;]' + proc.name + ']';
                                    if (proc.params) {
                                        msg += ' ' + proc.params.join(' ');
                                    }
                                    if (proc.help) {
                                        msg += '\n' + proc.help;
                                    }
                                    self.echo(msg);
                                    return false;
                                }
                            });
                            if (!found) {
                                if (fn === 'help') {
                                    self.echo('[[bu;#fff;]help] [method]\ndisplay help ' +
                                              'for the method or list of methods if not' +
                                              ' specified');
                                } else {
                                    var msg = 'Method `' + fn + "' not found ";
                                    self.error(msg);
                                }
                            }
                        }
                    };
                    success(interpreter_object);
                } else {
                    success(null);
                }
            }
            return $.jrpc({
                url: url,
                method: 'system.describe',
                params: [],
                success: response,
                request: jrpc_request,
                response: jrpc_response,
                error: function error() {
                    success(null);
                }
            });
        }
        // ---------------------------------------------------------------------
        function make_interpreter(user_intrp, login, finalize) {
            finalize = finalize || $.noop;
            var type = $.type(user_intrp);
            var object;
            var result = {};
            var rpc_count = 0; // only one rpc can be use for array
            var fn_interpreter;
            if (type === 'array') {
                object = {};
                // recur will be called when previous acync call is finished
                (function recur(interpreters, success) {
                    if (interpreters.length) {
                        var first = interpreters[0];
                        var rest = interpreters.slice(1);
                        var type = $.type(first);
                        if (type === 'string') {
                            self.pause(settings.softPause);
                            if (settings.describe === false) {
                                if (++rpc_count === 1) {
                                    fn_interpreter = make_basic_json_rpc(first, login);
                                } else {
                                    self.error(strings().oneRPCWithIgnore);
                                }
                                recur(rest, success);
                            } else {
                                make_json_rpc_object(first, login, function(new_obj) {
                                    if (new_obj) {
                                        $.extend(object, new_obj);
                                    } else if (++rpc_count === 1) {
                                        fn_interpreter = make_basic_json_rpc(
                                            first,
                                            login
                                        );
                                    } else {
                                        self.error(strings().oneRPCWithIgnore);
                                    }
                                    self.resume();
                                    recur(rest, success);
                                });
                            }
                        } else if (type === 'function') {
                            if (fn_interpreter) {
                                self.error(strings().oneInterpreterFunction);
                            } else {
                                fn_interpreter = first;
                            }
                            recur(rest, success);
                        } else if (type === 'object') {
                            $.extend(object, first);
                            recur(rest, success);
                        }
                    } else {
                        success();
                    }
                })(user_intrp, function() {
                    finalize({
                        interpreter: make_object_interpreter(object,
                                                             false,
                                                             login,
                                                             fn_interpreter.bind(self)),
                        completion: Object.keys(object)
                    });
                });
            } else if (type === 'string') {
                if (settings.ignoreSystemDescribe) {
                    object = {
                        interpreter: make_basic_json_rpc(user_intrp, login)
                    };
                    if ($.isArray(settings.completion)) {
                        object.completion = settings.completion;
                    }
                    finalize(object);
                } else {
                    self.pause(settings.softPause);
                    make_json_rpc_object(user_intrp, login, function(object) {
                        if (object) {
                            result.interpreter = make_object_interpreter(object,
                                                                         false,
                                                                         login);
                            result.completion = Object.keys(object);
                        } else {
                            // no procs in system.describe
                            result.interpreter = make_basic_json_rpc(user_intrp, login);
                        }
                        finalize(result);
                        self.resume();
                    });
                }
            } else if (type === 'object') {
                finalize({
                    interpreter: make_object_interpreter(user_intrp,
                                                         settings.checkArity),
                    completion: Object.keys(user_intrp)
                });
            } else {
                // allow $('<div/>').terminal();
                if (type === 'undefined') {
                    user_intrp = $.noop;
                } else if (type !== 'function') {
                    throw new Error(type + ' is invalid interpreter value');
                }
                // single function don't need bind
                finalize({
                    interpreter: user_intrp,
                    completion: settings.completion
                });
            }
        }
        // ---------------------------------------------------------------------
        // :: Create JSON-RPC authentication function
        // ---------------------------------------------------------------------
        function make_json_rpc_login(url, login) {
            var method = $.type(login) === 'boolean' ? 'login' : login;
            return function(user, passwd, callback) {
                self.pause(settings.softPause);
                $.jrpc({
                    url: url,
                    method: method,
                    params: [user, passwd],
                    request: function(jxhr, request) {
                        try {
                            settings.request.call(self, jxhr, request, self);
                        } catch (e) {
                            display_exception(e, 'USER');
                        }
                    },
                    response: function(jxhr, response) {
                        try {
                            settings.response.call(self, jxhr, response, self);
                        } catch (e) {
                            display_exception(e, 'USER');
                        }
                    },
                    success: function success(response) {
                        if (!response.error && response.result) {
                            callback(response.result);
                        } else {
                            // null will trigger message that login fail
                            callback(null);
                        }
                        self.resume();
                    },
                    error: ajax_error
                });
            };
            // default name is login so you can pass true
        }
        // ---------------------------------------------------------------------
        // :: display Exception on terminal
        // ---------------------------------------------------------------------
        function display_exception(e, label, silent) {
            if ($.isFunction(settings.exceptionHandler)) {
                settings.exceptionHandler.call(self, e, label);
            } else {
                self.exception(e, label);
                if (!silent) {
                    setTimeout(function() {
                        throw e;
                    }, 0);
                }
            }
        }
        // ---------------------------------------------------------------------
        function scroll_to_bottom() {
            var scrollHeight;
            if (scroll_object.prop) {
                scrollHeight = scroll_object.prop('scrollHeight');
            } else {
                scrollHeight = scroll_object.attr('scrollHeight');
            }
            scroll_object.scrollTop(scrollHeight);
        }
        // ---------------------------------------------------------------------
        // :: validating if object is a string or a function, call that function
        // :: and display the exeption if any
        // ---------------------------------------------------------------------
        function validate(label, object) {
            try {
                if ($.isFunction(object)) {
                    object.call(self, $.noop, self);
                } else if (typeof object !== 'string') {
                    var msg = label + ' must be string or function';
                    throw msg;
                }
            } catch (e) {
                display_exception(e, label.toUpperCase());
                return false;
            }
            return true;
        }
        // ---------------------------------------------------------------------
        // :: Draw line - can have line breaks and be longer than the width of
        // :: the terminal, there are 2 options raw and finalize
        // :: raw - will not encode the string and finalize if a function that
        // :: will have div container of the line as first argument
        // :: NOTE: it formats and appends lines to output_buffer. The actual
        // :: append to terminal output happens in the flush function
        // ---------------------------------------------------------------------
        var output_buffer = [];
        var NEW_LINE = 1;
        function buffer_line(string, options) {
            // urls should always have formatting to keep url if split
            var i, len;
            output_buffer.push(NEW_LINE);
            if (!options.raw && (strlen(string) > num_chars ||
                                 string.match(/\n/)) &&
                ((settings.wrap === true && options.wrap === undefined) ||
                  settings.wrap === false && options.wrap === true)) {
                var words = options.keepWords;
                var array = $.terminal.split_equal(string, num_chars, words);
                for (i = 0, len = array.length; i < len; ++i) {
                    if (array[i] === '' || array[i] === '\r') {
                        output_buffer.push('<span></span>');
                    } else if (options.raw) {
                        output_buffer.push(array[i]);
                    } else {
                        output_buffer.push($.terminal.format(array[i], {
                            linksNoReferrer: settings.linksNoReferrer
                        }));
                    }
                }
            } else if (!options.raw) {
                string = $.terminal.normalize(string);
                string = $.terminal.format(string, {
                    linksNoReferrer: settings.linksNoReferrer
                });
                string.split(/\n/).forEach(function(string) {
                    output_buffer.push(string);
                });
            } else {
                output_buffer.push(string);
            }
            output_buffer.push(options.finalize);
        }
        // ---------------------------------------------------------------------
        function process_line(line, options) {
            // prevent exception in display exception
            try {
                var line_settings = $.extend({
                    exec: true,
                    raw: false,
                    finalize: $.noop
                }, options || {});
                var string;
                var arg = $.type(line) === 'function' ? line() : line;
                if ($.type(arg) !== 'string') {
                    if ($.isFunction(settings.parseObject)) {
                        var ret = settings.parseObject(arg);
                        if ($.type(ret) === 'string') {
                            string = ret;
                        }
                    } else if (arg instanceof Array) {
                        string = $.terminal.columns(arg, self.cols(), settings.tabs);
                    } else {
                        string = String(arg);
                    }
                } else {
                    string = arg;
                }
                if (string !== '') {
                    string = $.map(string.split(format_exec_re), function(string) {
                        if (string && string.match(format_exec_re) &&
                            !$.terminal.is_formatting(string)) {
                            // redraw should not execute commands and it have
                            // and lines variable have all extended commands
                            string = string.replace(/^\[\[|\]\]$/g, '');
                            if (line_settings.exec) {
                                if (prev_command && prev_command.command === string) {
                                    self.error(strings().recursiveCall);
                                } else {
                                    $.terminal.extended_command(self, string);
                                }
                            }
                            return '';
                        } else {
                            return string;
                        }
                    }).join('');
                    if (string !== '') {
                        if (settings.convertLinks && !options.raw) {
                            string = string.replace(email_re, '[[!;;]$1]').
                                replace(url_nf_re, '[[!;;]$1]');
                        }
                        if (!options.raw) {
                            if (options.formatters) {
                                try {
                                    string = $.terminal.apply_formatters(string);
                                } catch (e) {
                                    display_exception(e, 'FORMATTING');
                                }
                            }
                            string = $.terminal.encode(string);
                        }
                        // string can be empty after removing extended commands
                        buffer_line(string, line_settings);
                    }
                }
            } catch (e) {
                output_buffer = [];
                // don't display exception if exception throw in terminal
                if ($.isFunction(settings.exceptionHandler)) {
                    settings.exceptionHandler.call(self, e, 'TERMINAL');
                } else {
                    alert_exception('[Internal Exception(process_line)]', e);
                }
            }
        }
        // ---------------------------------------------------------------------
        // :: Redraw all lines
        // ---------------------------------------------------------------------
        function redraw() {
            command_line.resize(num_chars);
            // we don't want reflow while processing lines
            var detached_output = output.empty().detach();
            var lines_to_show = [];
            // Dead code
            if (settings.outputLimit >= 0) {
                // flush will limit lines but if there is lot of
                // lines we don't need to show them and then remove
                // them from terminal
                var limit;
                if (settings.outputLimit === 0) {
                    limit = self.rows();
                } else {
                    limit = settings.outputLimit;
                }
                lines.forEach(function(line) {
                    var string = $.type(line[0]) === 'function' ? line[0]() : line[0];
                    string = $.type(string) === 'string' ? string : String(string);
                    if (strlen(string) > num_chars) {
                        var options = line[1];
                        var splitted = $.terminal.split_equal(
                            string,
                            num_chars,
                            options.keepWords
                        );
                        lines_to_show = lines_to_show.concat(splitted.map(function(line) {
                            return [line, options];
                        }));
                    } else {
                        lines_to_show.push(line);
                    }
                });
                lines_to_show = lines_to_show.slice(lines_to_show.length - limit - 1);
            } else {
                lines_to_show = lines;
            }
            try {
                output_buffer = [];
                $.each(lines_to_show, function(i, line) {
                    process_line.apply(null, line); // line is an array
                });
                command_line.before(detached_output); // reinsert output
                self.flush();
                settings.onAfterRedraw.call(self);
            } catch (e) {
                if ($.isFunction(settings.exceptionHandler)) {
                    settings.exceptionHandler.call(self, e, 'TERMINAL (redraw)');
                } else {
                    alert_exception('[redraw]', e);
                }
            }
        }
        // ---------------------------------------------------------------------
        // :: Display user greetings or terminal signature
        // ---------------------------------------------------------------------
        function show_greetings() {
            function echo(string) {
                self.echo(string, {finalize: a11y_hide, formatters: false});
            }
            if (settings.greetings === undefined) {
                // signature have ascii art so it's not suite for screen readers
                echo(self.signature);
            } else if (settings.greetings) {
                var type = typeof settings.greetings;
                if (type === 'string') {
                    echo(settings.greetings);
                } else if (type === 'function') {
                    settings.greetings.call(self, echo);
                } else {
                    self.error(strings().wrongGreetings);
                }
            }
        }
        // ---------------------------------------------------------------------
        // :: Display prompt and last command
        // ---------------------------------------------------------------------
        function echo_command(command) {
            if (typeof command === 'undefined') {
                command = self.get_command();
            }
            var prompt = command_line.prompt();
            var mask = command_line.mask();
            switch (typeof mask) {
                case 'string':
                    command = command.replace(/./g, mask);
                    break;
                case 'boolean':
                    if (mask) {
                        command = command.replace(/./g, settings.maskChar);
                    } else {
                        command = $.terminal.escape_formatting(command);
                    }
                    break;
            }
            var options = {
                finalize: function finalize(div) {
                    a11y_hide(div.addClass('command'));
                    try {
                        settings.onEchoCommand.call(self, div, command);
                    } catch (e) {
                        settings.onEchoCommand = $.noop;
                        self.exception(e);
                    }
                }
            };
            if ($.isFunction(prompt)) {
                var ret = prompt(function(string) {
                    self.echo(string + command, options);
                });
                if (ret && ret.then) {
                    ret.then(function(string) {
                        if (typeof string === 'string') {
                            self.echo(string + command, options);
                        }
                    });
                }
            } else {
                self.echo(prompt + command, options);
            }
        }
        // ---------------------------------------------------------------------
        // :: Helper function that restore state. Call import_view or exec
        // ---------------------------------------------------------------------
        function restore_state(spec) {
            // spec [terminal_id, state_index, command]
            var terminal = terminals.get()[spec[0]];
            if (!terminal) {
                throw new Error(strings().invalidTerminalId);
            }
            var command_idx = spec[1];
            if (save_state[command_idx]) { // state exists
                terminal.import_view(save_state[command_idx]);
            } else {
                // restore state
                change_hash = false;
                var command = spec[2];
                if (command) {
                    terminal.exec(command).done(function() {
                        change_hash = true;
                        save_state[command_idx] = terminal.export_view();
                    });
                }
            }
            /*if (spec[3].length) {
                restore_state(spec[3]);
            }*/
        }
        // ---------------------------------------------------------------------
        // :: Helper function
        // ---------------------------------------------------------------------
        function maybe_update_hash() {
            if (change_hash) {
                fire_hash_change = false;
                location.hash = '#' + JSON.stringify(hash_commands);
                setTimeout(function() {
                    fire_hash_change = true;
                }, 100);
            }
        }
        // ---------------------------------------------------------------------
        // :: Wrapper over interpreter, it implements exit and catches all
        // :: exeptions from user code and displays them on the terminal
        // ---------------------------------------------------------------------
        var first_command = true;
        var resume_callbacks = [];
        function commands(command, silent, exec) {
            // first command store state of the terminal before the command get
            // executed
            if (first_command) {
                first_command = false;
                // execHash need first empty command too
                if (settings.historyState || settings.execHash && exec) {
                    if (!save_state.length) {
                        // first command in first terminal don't have hash
                        self.save_state();
                    } else {
                        self.save_state(null);
                    }
                }
            }
            function after_exec() {
                // variables defined later in commands
                if (!exec) {
                    change_hash = true;
                    if (settings.historyState) {
                        self.save_state(command, false);
                    }
                    change_hash = saved_change_hash;
                }
                deferred.resolve();
                if ($.isFunction(settings.onAfterCommand)) {
                    settings.onAfterCommand.call(self, self, command);
                }
            }
            function show(result) {
                if (typeof result !== 'undefined') {
                    display_object(result);
                }
                after_exec();
                self.resume();
            }
            try {
                // this callback can disable commands
                if ($.isFunction(settings.onBeforeCommand)) {
                    if (settings.onBeforeCommand.call(self, self, command) === false) {
                        return;
                    }
                }
                if (!exec) {
                    prev_command = $.terminal.split_command(command);
                }
                if (!ghost()) {
                    // exec execute this function wihout the help of cmd plugin
                    // that add command to history on enter
                    if (exec && ($.isFunction(settings.historyFilter) &&
                                 settings.historyFilter(command) ||
                                 command.match(settings.historyFilter))) {
                        command_line.history().append(command);
                    }
                }
                var interpreter = interpreters.top();
                if (!silent && settings.echoCommand) {
                    echo_command(command);
                }
                // new promise will be returned to exec that will resolve his
                // returned promise
                var deferred = new $.Deferred();
                // we need to save sate before commands is deleyd because
                // execute_extended_command disable it and it can be executed
                // after delay
                var saved_change_hash = change_hash;
                if (command.match(/^\s*login\s*$/) && self.token(true)) {
                    if (self.level() > 1) {
                        self.logout(true);
                    } else {
                        self.logout();
                    }
                    after_exec();
                } else if (settings.exit && command.match(/^\s*exit\s*$/) &&
                           !in_login) {
                    var level = self.level();
                    if (level === 1 && self.get_token() || level > 1) {
                        if (self.get_token(true)) {
                            self.set_token(undefined, true);
                        }
                        self.pop();
                    }
                    after_exec();
                } else if (settings.clear && command.match(/^\s*clear\s*$/) &&
                           !in_login) {
                    self.clear();
                    after_exec();
                } else {
                    // Call user interpreter function
                    var result = interpreter.interpreter.call(self, command, self);
                    if (result) {
                        // auto pause/resume when user return promises
                        self.pause(settings.softPause);
                        // when for native Promise object work only in jQuery 3.x
                        if (result.then) {
                            result.then(show);
                        } else {
                            return $.when(result).done(show);
                        }
                    } else if (paused) {
                        resume_callbacks.push(function() {
                            // exec with resume/pause in user code
                            after_exec();
                        });
                    } else {
                        after_exec();
                    }
                }
                return deferred.promise();
            } catch (e) {
                display_exception(e, 'USER');
                self.resume();
            }
        }
        // ---------------------------------------------------------------------
        // :: The logout function removes Storage, disables history and runs
        // :: the login function. This function is called only when options.login
        // :: function is defined. The check for this is in the self.pop method
        // ---------------------------------------------------------------------
        function global_logout() {
            if ($.isFunction(settings.onBeforeLogout)) {
                try {
                    if (settings.onBeforeLogout.call(self, self) === false) {
                        return;
                    }
                } catch (e) {
                    display_exception(e, 'onBeforeLogout');
                }
            }
            clear_loging_storage();
            if ($.isFunction(settings.onAfterLogout)) {
                try {
                    settings.onAfterLogout.call(self, self);
                } catch (e) {
                    display_exception(e, 'onAfterlogout');
                }
            }
            self.login(settings.login, true, initialize);
        }
        // ---------------------------------------------------------------------
        function clear_loging_storage() {
            var name = self.prefix_name(true) + '_';
            storage.remove(name + 'token');
            storage.remove(name + 'login');
        }
        // ---------------------------------------------------------------------
        // :: Save the interpreter name for use with purge
        // ---------------------------------------------------------------------
        function maybe_append_name(interpreter_name) {
            var storage_key = self.prefix_name() + '_interpreters';
            var names = storage.get(storage_key);
            if (names) {
                names = JSON.parse(names);
            } else {
                names = [];
            }
            if ($.inArray(interpreter_name, names) === -1) {
                names.push(interpreter_name);
                storage.set(storage_key, JSON.stringify(names));
            }
        }
        // ---------------------------------------------------------------------
        // :: Function enables history, sets prompt, runs interpreter function
        // ---------------------------------------------------------------------
        function prepare_top_interpreter(silent) {
            var interpreter = interpreters.top();
            var name = self.prefix_name(true);
            if (!ghost()) {
                maybe_append_name(name);
            }
            command_line.name(name);
            if ($.isFunction(interpreter.prompt)) {
                command_line.prompt(function(callback) {
                    var ret = interpreter.prompt.call(self, callback, self);
                    if (ret && ret.then) {
                        ret.then(function(string) {
                            if (typeof string === 'string') {
                                callback(string);
                            }
                        });
                    }
                });
            } else {
                command_line.prompt(interpreter.prompt);
            }
            if ($.isPlainObject(interpreter.keymap)) {
                command_line.keymap($.omap(interpreter.keymap, function(name, fun) {
                    return function() {
                        var args = [].slice.call(arguments);
                        try {
                            return fun.apply(self, args);
                        } catch (e) {
                            display_exception(e, 'USER KEYMAP');
                        }
                    };
                }));
            }
            command_line.set('');
            init_queue.resolve();
            if (!silent && $.isFunction(interpreter.onStart)) {
                interpreter.onStart.call(self, self);
            }
        }
        // ---------------------------------------------------------------------
        function hashchange() {
            if (fire_hash_change && settings.execHash) {
                try {
                    if (location.hash) {
                        var hash = location.hash.replace(/^#/, '');
                        hash_commands = JSON.parse(decodeURIComponent(hash));
                    } else {
                        hash_commands = [];
                    }
                    if (hash_commands.length) {
                        restore_state(hash_commands[hash_commands.length - 1]);
                    } else if (save_state[0]) {
                        self.import_view(save_state[0]);
                    }
                } catch (e) {
                    display_exception(e, 'TERMINAL');
                }
            }
        }
        // ---------------------------------------------------------------------
        function initialize() {
            prepare_top_interpreter();
            show_greetings();
            if (lines.length) {
                redraw(); // for case when showing long error before init
            }
            // was_paused flag is workaround for case when user call exec before
            // login and pause in onInit, 3rd exec will have proper timing (will
            // execute after onInit resume)
            var was_paused = false;
            if ($.isFunction(settings.onInit)) {
                onPause = function() { // local in terminal
                    was_paused = true;
                };
                try {
                    settings.onInit.call(self, self);
                } catch (e) {
                    display_exception(e, 'OnInit');
                    // throw e; // it will be catched by terminal
                } finally {
                    onPause = $.noop;
                    if (!was_paused && self.enabled()) {
                        // resume login if user didn't call pause in onInit
                        // if user pause in onInit wait with exec until it
                        // resume
                        self.resume();
                    }
                }
            }
            if (first_instance) {
                first_instance = false;
                $(window).on('hashchange', hashchange);
            }
        }
        // ---------------------------------------------------------------------
        // :: If Ghost don't store anything in localstorage
        // ---------------------------------------------------------------------
        function ghost() {
            return in_login || command_line.mask() !== false;
        }
        // ---------------------------------------------------------------------
        // :: return string that are common in all elements of the array
        // ---------------------------------------------------------------------
        function common_string(string, array, matchCase) {
            if (!array.length) {
                return '';
            }
            var type = string_case(string);
            var result = [];
            for (var j = string.length; j < array[0].length; ++j) {
                var push = false;
                var candidate = array[0].charAt(j),
                    candidateLower = candidate.toLowerCase();

                for (var i = 1; i < array.length; ++i) {
                    push = true;
                    var current = array[i].charAt(j),
                        currentLower = current.toLowerCase();

                    if (candidate !== current) {
                        if (matchCase || type === 'mixed') {
                            push = false;
                            break;
                        } else if (candidateLower === currentLower) {
                            if (type === 'lower') {
                                candidate = candidate.toLowerCase();
                            } else if (type === 'upper') {
                                candidate = candidate.toUpperCase();
                            } else {
                                push = false;
                                break;
                            }
                        } else {
                            push = false;
                            break;
                        }
                    }
                }
                if (push) {
                    result.push(candidate);
                }
            }
            return string + result.join('');
        }
        // ---------------------------------------------------------------------
        // ---------------------------------------------------------------------
        function trigger_terminal_change(next) {
            terminals.forEach(function(term) {
                term.settings().onTerminalChange.call(next, next);
            });
        }
        // ---------------------------------------------------------------------
        // :: Keydown event handler
        // ---------------------------------------------------------------------
        function user_key_down(e) {
            var result, top = interpreters.top();
            if ($.isFunction(top.keydown)) {
                result = top.keydown.call(self, e, self);
                if (result !== undefined) {
                    return result;
                }
            } else if ($.isFunction(settings.keydown)) {
                result = settings.keydown.call(self, e, self);
                if (result !== undefined) {
                    return result;
                }
            }
        }
        var keymap = {
            'CTRL+D': function(e, original) {
                if (!in_login) {
                    if (command_line.get() === '') {
                        if (interpreters.size() > 1 ||
                            settings.login !== undefined) {
                            self.pop('');
                        } else {
                            self.resume();
                            self.echo('');
                        }
                    } else {
                        original();
                    }
                }
                return false;
            },
            'CTRL+C': function() {
                if (get_selected_text() === '') {
                    echo_command(self.get_command() + '^C');
                    self.set_command('');
                }
            },
            'CTRL+L': function() {
                self.clear();
            },
            'TAB': function(e, orignal) {
                // TODO: move this to cmd plugin
                //       add completion = array | function
                //       !!! Problem complete more then one key need terminal
                var top = interpreters.top(), completion, caseSensitive;
                if (typeof top.caseSensitiveAutocomplete !== 'undefined') {
                    caseSensitive = top.caseSensitiveAutocomplete;
                } else {
                    caseSensitive = settings.caseSensitiveAutocomplete;
                }
                if (settings.completion &&
                    $.type(settings.completion) !== 'boolean' &&
                    top.completion === undefined) {
                    completion = settings.completion;
                } else {
                    completion = top.completion;
                }
                if (completion === 'settings') {
                    completion = settings.completion;
                }
                if (completion) {
                    switch ($.type(completion)) {
                        case 'function':
                            var string = self.before_cursor(settings.wordAutocomplete);
                            if (completion.length === 3) {
                                var error = new Error(strings().comletionParameters);
                                display_exception(error, 'USER');
                                return false;
                            }
                            completion.call(self, string, function(commands) {
                                self.complete(commands, {
                                    echo: true,
                                    word: settings.wordAutocomplete,
                                    escape: settings.completionEscape,
                                    caseSensitive: caseSensitive
                                });
                            });
                            break;
                        case 'array':
                            self.complete(completion, {
                                echo: true,
                                word: settings.wordAutocomplete,
                                escape: settings.completionEscape,
                                caseSensitive: caseSensitive
                            });
                            break;
                        default:
                            throw new Error(strings().invalidCompletion);
                    }
                } else {
                    orignal();
                }
                return false;
            },
            'CTRL+V': function(e, original) {
                original(e);
                self.oneTime(200, function() {
                    scroll_to_bottom();
                });
                return true;
            },
            'CTRL+TAB': function() {
                if (terminals.length() > 1) {
                    self.focus(false);
                    return false;
                }
            },
            'PAGEDOWN': function() {
                self.scroll(self.height());
            },
            'PAGEUP': function() {
                self.scroll(-self.height());
            }
        };
        function key_down(e) {
            // Prevent to be executed by cmd: CTRL+D, TAB, CTRL+TAB (if more
            // then one terminal)
            var result, i;
            if (self.enabled()) {
                if (!self.paused()) {
                    result = user_key_down(e);
                    if (result !== undefined) {
                        return result;
                    }
                    if (e.which !== 9) { // not a TAB
                        tab_count = 0;
                    }
                    self.attr({scrollTop: self.attr('scrollHeight')});
                } else {
                    if (!settings.pauseEvents) {
                        result = user_key_down(e);
                        if (result !== undefined) {
                            return result;
                        }
                    }
                    if (e.which === 68 && e.ctrlKey) { // CTRL+D (if paused)
                        if (settings.pauseEvents) {
                            result = user_key_down(e);
                            if (result !== undefined) {
                                return result;
                            }
                        }
                        if (requests.length) {
                            for (i = requests.length; i--;) {
                                var r = requests[i];
                                if (r.readyState !== 4) {
                                    try {
                                        r.abort();
                                    } catch (error) {
                                        if ($.isFunction(settings.exceptionHandler)) {
                                            settings.exceptionHandler.call(self,
                                                                           e,
                                                                           'AJAX ABORT');
                                        } else {
                                            self.error(strings().ajaxAbortError);
                                        }
                                    }
                                }
                            }
                            requests = [];
                        }
                        self.resume();
                    }
                    return false;
                }
            }
        }
        function ready(queue) {
            return function(fun) {
                queue.add(fun);
            };
        }
        function strings() {
            return $.extend(
                {},
                $.terminal.defaults.strings,
                settings && settings.strings || {}
            );
        }
        // ---------------------------------------------------------------------
        var self = this;
        if (this.length > 1) {
            return this.each(function() {
                $.fn.terminal.call($(this),
                                   init_interpreter,
                                   $.extend({name: self.selector}, options));
            });
        }
        // terminal already exists
        if (self.data('terminal')) {
            return self.data('terminal');
        }
        if (self.length === 0) {
            throw new Error(sprintf(strings().invalidSelector, self.selector));
        }
        // var names = []; // stack if interpreter names
        var scroll_object;
        var prev_command; // used for name on the terminal if not defined
        var tab_count = 0; // for tab completion
        // array of line objects:
        // - function (called whenever necessary, result is printed)
        // - array (expected form: [line, settings])
        // - anything else (cast to string when painted)
        var lines = [];
        var output; // .terminal-output jquery object
        var terminal_id = terminals.length();
        var num_chars; // numer of chars in line
        var num_rows; // number of lines that fit without scrollbar
        var command; // for tab completion
        var logins = new Stack(); // stack of logins
        var command_queue = new DelayQueue();
        var init_queue = new DelayQueue();
        var when_ready = ready(init_queue);
        var char_size = get_char_size(self);
        var cmd_ready = ready(command_queue);
        var in_login = false;// some Methods should not be called when login
        // TODO: Try to use mutex like counter for pause/resume
        var onPause = $.noop;// used to indicate that user call pause onInit
        var old_width, old_height;
        var delayed_commands = []; // used when exec commands while paused
        var settings = $.extend({},
                                $.terminal.defaults,
                                {name: self.selector},
                                options || {});
        var storage = new StorageHelper(settings.memory);
        var enabled = settings.enabled, frozen = false;
        var paused = false;
        var autologin = true; // set to false if onBeforeLogin return false
        var interpreters;
        var command_line;
        var old_enabled;
        var visibility_observer;
        var mutation_observer;
        // -----------------------------------------------------------------
        // TERMINAL METHODS
        // -----------------------------------------------------------------
        $.extend(self, $.omap({
            id: function() {
                return terminal_id;
            },
            // -------------------------------------------------------------
            // :: Clear the output
            // -------------------------------------------------------------
            clear: function() {
                output.html('');
                lines = [];
                try {
                    settings.onClear.call(self, self);
                } catch (e) {
                    display_exception(e, 'onClear');
                }
                self.attr({scrollTop: 0});
                return self;
            },
            // -------------------------------------------------------------
            // :: Return an object that can be used with import_view to
            // :: restore the state
            // -------------------------------------------------------------
            export_view: function() {
                var user_export = {};
                if ($.isFunction(settings.onExport)) {
                    try {
                        user_export = settings.onExport.call(self);
                    } catch (e) {
                        display_exception(e, 'onExport');
                    }
                }
                return $.extend({}, {
                    focus: enabled,
                    mask: command_line.mask(),
                    prompt: self.get_prompt(),
                    command: self.get_command(),
                    position: command_line.position(),
                    lines: clone(lines),
                    interpreters: interpreters.clone(),
                    history: command_line.history().data
                }, user_export);
            },
            // -------------------------------------------------------------
            // :: Restore the state of the previous exported view
            // -------------------------------------------------------------
            import_view: function(view) {
                if (in_login) {
                    throw new Error(sprintf(strings().notWhileLogin, 'import_view'));
                }
                if ($.isFunction(settings.onImport)) {
                    try {
                        settings.onImport.call(self, view);
                    } catch (e) {
                        settings.onImport = $.noop;
                        display_exception(e, 'onImport');
                    }
                }
                when_ready(function ready() {
                    self.set_prompt(view.prompt);
                    self.set_command(view.command);
                    command_line.position(view.position);
                    command_line.mask(view.mask);
                    if (view.focus) {
                        self.focus();
                    }
                    lines = clone(view.lines);
                    interpreters = view.interpreters;
                    if (settings.importHistory) {
                        command_line.history().set(view.history);
                    }
                    redraw();
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Store current terminal state
            // -------------------------------------------------------------
            save_state: function(command, ignore_hash, index) {
                // save_state.push({view:self.export_view(), join:[]});
                if (typeof index !== 'undefined') {
                    save_state[index] = self.export_view();
                } else {
                    save_state.push(self.export_view());
                }
                if (!$.isArray(hash_commands)) {
                    hash_commands = [];
                }
                if (command !== undefined && !ignore_hash) {
                    var state = [
                        terminal_id,
                        save_state.length - 1,
                        command
                    ];
                    hash_commands.push(state);
                    maybe_update_hash();
                }
            },
            // -------------------------------------------------------------
            // :: Execute a command, it will handle commands that do AJAX
            // :: calls and have delays, if the second argument is set to
            // :: true it will not echo executed command
            // -------------------------------------------------------------
            exec: function(command, silent, deferred) {
                var d = deferred || new $.Deferred();
                cmd_ready(function ready() {
                    if ($.isArray(command)) {
                        (function recur() {
                            var cmd = command.shift();
                            if (cmd) {
                                self.exec(cmd, silent).done(recur);
                            } else {
                                d.resolve();
                            }
                        })();
                    } else if (paused) {
                        // both commands executed here (resume will call Term::exec)
                        // delay command multiple time
                        delayed_commands.push([command, silent, d]);
                    } else {
                        // commands may return promise from user code
                        // it will resolve exec promise when user promise
                        // is resolved
                        commands(command, silent, true).done(function() {
                            d.resolve(self);
                        });
                    }
                });
                // while testing it didn't executed last exec when using this
                // for resolved deferred
                return d.promise();
            },
            // -------------------------------------------------------------
            // :: bypass login function that wait untill you type user/pass
            // :: it hide implementation detail
            // -------------------------------------------------------------
            autologin: function(user, token, silent) {
                self.trigger('terminal.autologin', [user, token, silent]);
                return self;
            },
            // -------------------------------------------------------------
            // :: Function changes the prompt of the command line to login
            // :: with a password and calls the user login function with
            // :: the callback that expects a token. The login is successful
            // :: if the user calls it with value that is truthy
            // -------------------------------------------------------------
            login: function(auth, infinite, success, error) {
                logins.push([].slice.call(arguments));
                if (in_login) {
                    throw new Error(sprintf(strings().notWhileLogin, 'login'));
                }
                if (!$.isFunction(auth)) {
                    throw new Error(strings().loginIsNotAFunction);
                }
                in_login = true;
                if (self.token() && self.level() === 1 && !autologin) {
                    in_login = false; // logout will call login
                    self.logout(true);
                } else if (self.token(true) && self.login_name(true)) {
                    in_login = false;
                    if ($.isFunction(success)) {
                        success();
                    }
                    return self;
                }
                // don't store login data in history
                if (settings.history) {
                    command_line.history().disable();
                }
                // so we know how many times call pop
                var level = self.level();
                function login_callback(user, token, silent) {
                    if (token) {
                        while (self.level() > level) {
                            self.pop(undefined, true);
                        }
                        if (settings.history) {
                            command_line.history().enable();
                        }
                        var name = self.prefix_name(true) + '_';
                        storage.set(name + 'token', token);
                        storage.set(name + 'login', user);
                        in_login = false;
                        if ($.isFunction(success)) {
                            // will be used internaly since users know
                            // when login success (they decide when
                            // it happen by calling the callback -
                            // this funtion)
                            success();
                        }
                    } else {
                        if (infinite) {
                            if (!silent) {
                                self.error(strings().wrongPasswordTryAgain);
                            }
                            self.pop(undefined, true).set_mask(false);
                        } else {
                            in_login = false;
                            if (!silent) {
                                self.error(strings().wrongPassword);
                            }
                            self.pop(undefined, true).pop(undefined, true);
                        }
                        // used only to call pop in push
                        if ($.isFunction(error)) {
                            error();
                        }
                    }
                    self.off('terminal.autologin');
                }
                self.on('terminal.autologin', function(event, user, token, silent) {
                    login_callback(user, token, silent);
                });
                self.push(function(user) {
                    self.set_mask(settings.maskChar).push(function(pass) {
                        try {
                            auth.call(self, user, pass, function(token, silent) {
                                login_callback(user, token, silent);
                            });
                        } catch (e) {
                            display_exception(e, 'AUTH');
                        }
                    }, {
                        prompt: strings().password + ': ',
                        name: 'password'
                    });
                }, {
                    prompt: strings().login + ': ',
                    name: 'login'
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: User defined settings and defaults as well
            // -------------------------------------------------------------
            settings: function() {
                return settings;
            },
            // -------------------------------------------------------------
            // :: Get string before cursor
            // -------------------------------------------------------------
            before_cursor: function(word) {
                var pos = command_line.position();
                var command = command_line.get().substring(0, pos);
                var cmd_strings = command.split(' ');
                var string; // string before cursor that will be completed
                if (word) {
                    if (cmd_strings.length === 1) {
                        string = cmd_strings[0];
                    } else {
                        var m = command.match(/(\\?")/g);
                        var double_quotes = m ? m.filter(function(chr) {
                            return !chr.match(/^\\/);
                        }).length : 0;
                        m = command.match(/'/g);
                        var single_quote = m ? m.length : 0;
                        if (single_quote % 2 === 1) {
                            string = command.match(/('[^']*)$/)[0];
                        } else if (double_quotes % 2 === 1) {
                            string = command.match(/("(?:[^"]|\\")*)$/)[0];
                        } else {
                            string = cmd_strings[cmd_strings.length - 1];
                            for (i = cmd_strings.length - 1; i > 0; i--) {
                                // treat escape space as part of the string
                                var prev_string = cmd_strings[i - 1];
                                if (prev_string[prev_string.length - 1] === '\\') {
                                    string = cmd_strings[i - 1] + ' ' + string;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    string = command;
                }
                return string;
            },
            // -------------------------------------------------------------
            // :: complete word or command based on array of words
            // -------------------------------------------------------------
            complete: function(commands, options) {
                options = $.extend({
                    word: true,
                    echo: false,
                    escape: true,
                    caseSensitive: true
                }, options || {});
                var sensitive = options.caseSensitive;
                // cursor can be in the middle of the command
                // so we need to get the text before the cursor
                var string = self.before_cursor(options.word).replace(/\\"/g, '"');
                var quote = false;
                if (options.word) {
                    if (string.match(/^"/)) {
                        quote = '"';
                    } else if (string.match(/^'/)) {
                        quote = "'";
                    }
                    if (quote) {
                        string = string.replace(/^["']/, '');
                    }
                }
                // local copy
                commands = commands.slice();
                if (settings.clear && $.inArray('clear', commands) === -1) {
                    commands.push('clear');
                }
                if (settings.exit && $.inArray('exit', commands) === -1) {
                    commands.push('exit');
                }
                if (tab_count % 2 === 0) {
                    command = self.before_cursor(options.word);
                } else {
                    var test = self.before_cursor(options.word);
                    if (test !== command) {
                        // command line changed between TABS - ignore
                        return;
                    }
                }
                var safe = $.terminal.escape_regex(string);
                if (options.escape) {
                    safe = safe.replace(/(\\+)(["'() ])/g, function(_, slash, chr) {
                        if (chr.match(/[()]/)) {
                            return slash + '\\?\\' + chr;
                        } else {
                            return slash + '?' + chr;
                        }
                    });
                }
                function matched_strings() {
                    var matched = [];
                    for (var i = commands.length; i--;) {
                        if (regex.test(commands[i])) {
                            var match = commands[i];
                            if (quote === '"') {
                                match = match.replace(/"/g, '\\"');
                            }
                            if (!quote && options.escape) {
                                match = match.replace(/(["'() ])/g, '\\$1');
                            }
                            if (!sensitive && same_case(match)) {
                                if (string.toLowerCase() === string) {
                                    match = match.toLowerCase();
                                } else if (string.toUpperCase() === string) {
                                    match = match.toUpperCase();
                                }
                            }
                            matched.push(match);
                        }
                    }
                    return matched;
                }
                var flags = sensitive ? '' : 'i';
                var regex = new RegExp('^' + safe, flags);
                var matched = matched_strings();
                function replace(input, replacement) {
                    var text = self.get_command();
                    var pos = self.get_position();
                    var re = new RegExp('^' + input, 'i');
                    var pre = text.substring(0, pos);
                    var post = text.substring(pos);
                    var to_insert = replacement.replace(re, '') + (quote || '');
                    self.set_command(pre + to_insert + post);
                    self.set_position((pre + to_insert).length);
                }
                if (matched.length === 1) {
                    if (options.escape) {
                        replace(safe, matched[0]);
                    } else {
                        self.insert(matched[0].replace(regex, '') + (quote || ''));
                    }
                    command = self.before_cursor(options.word);
                    return true;
                } else if (matched.length > 1) {
                    if (++tab_count >= 2) {
                        tab_count = 0;
                        if (options.echo) {
                            echo_command();
                            var text = matched.reverse().join('\t');
                            self.echo($.terminal.escape_brackets(text), {
                                keepWords: true,
                                formatters: false
                            });
                            return true;
                        }
                    } else {
                        var common = common_string(string, matched, sensitive);
                        if (common) {
                            replace(string, common);
                            command = self.before_cursor(options.word);
                            return true;
                        }
                    }
                }
            },
            // -------------------------------------------------------------
            // :: Return commands function from top interpreter
            // -------------------------------------------------------------
            commands: function() {
                return interpreters.top().interpreter;
            },
            // -------------------------------------------------------------
            // :: Low Level method that overwrites interpreter
            // -------------------------------------------------------------
            set_interpreter: function(user_intrp, login) {
                function overwrite_interpreter() {
                    self.pause(settings.softPause);
                    make_interpreter(user_intrp, !!login, function(result) {
                        self.resume();
                        var top = interpreters.top();
                        $.extend(top, result);
                        prepare_top_interpreter(true);
                    });
                }
                if ($.type(user_intrp) === 'string' && login) {
                    self.login(make_json_rpc_login(user_intrp, login),
                               true,
                               overwrite_interpreter);
                } else {
                    overwrite_interpreter();
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Show user greetings or terminal signature
            // -------------------------------------------------------------
            greetings: function() {
                show_greetings();
                return self;
            },
            // -------------------------------------------------------------
            // :: Return true if terminal is paused false otherwise
            // -------------------------------------------------------------
            paused: function() {
                return paused;
            },
            // -------------------------------------------------------------
            // :: Pause the terminal, it should be used for ajax calls
            // -------------------------------------------------------------
            pause: function(visible) {
                cmd_ready(function ready() {
                    onPause();
                    paused = true;
                    command_line.disable(visible || is_android);
                    if (!visible) {
                        command_line.find('.prompt').hidden();
                    }
                    if ($.isFunction(settings.onPause)) {
                        settings.onPause.call(self);
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Resume the previously paused terminal
            // -------------------------------------------------------------
            resume: function() {
                cmd_ready(function ready() {
                    paused = false;
                    if (enabled && terminals.front() === self) {
                        command_line.enable();
                    }
                    command_line.find('.prompt').visible();
                    var original = delayed_commands;
                    delayed_commands = [];
                    for (var i = 0; i < original.length; ++i) {
                        self.exec.apply(self, original[i]);
                    }
                    self.trigger('resume');
                    var fn = resume_callbacks.shift();
                    if (fn) {
                        fn();
                    }
                    scroll_to_bottom();
                    if ($.isFunction(settings.onResume)) {
                        settings.onResume.call(self);
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Return the number of characters that fit into the width of
            // :: the terminal
            // -------------------------------------------------------------
            cols: function() {
                if (settings.numChars) {
                    return settings.numChars;
                }
                if (typeof num_chars === 'undefined') {
                    num_chars = get_num_chars(self, char_size);
                }
                return num_chars;
            },
            // -------------------------------------------------------------
            // :: Return the number of lines that fit into the height of the
            // :: terminal
            // -------------------------------------------------------------
            rows: function() {
                if (settings.numRows) {
                    return settings.numRows;
                }
                if (typeof num_rows === 'undefined') {
                    num_rows = get_num_rows(self, char_size);
                }
                return num_rows;
            },
            // -------------------------------------------------------------
            // :: Return the History object
            // -------------------------------------------------------------
            history: function() {
                return command_line.history();
            },
            // -------------------------------------------------------------
            // :: toggle recording of history state
            // -------------------------------------------------------------
            history_state: function(toggle) {
                function run() {
                    settings.historyState = true;
                    if (!save_state.length) {
                        self.save_state();
                    } else if (terminals.length() > 1) {
                        self.save_state(null);
                    }
                }
                if (toggle) {
                    // if set to true and if set from user command we need
                    // not to include the command
                    if (typeof window.setImmediate === 'undefined') {
                        setTimeout(run, 0);
                    } else {
                        setImmediate(run);
                    }
                } else {
                    settings.historyState = false;
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: clear the history state
            // -------------------------------------------------------------
            clear_history_state: function() {
                hash_commands = [];
                save_state = [];
                return self;
            },
            // -------------------------------------------------------------
            // :: Switch to the next terminal
            // -------------------------------------------------------------
            next: function() {
                if (terminals.length() === 1) {
                    return self;
                } else {
                    terminals.front().disable();
                    var next = terminals.rotate().enable();
                    // 50 provides buffer in viewport
                    var x = next.offset().top - 50;
                    $('html,body').animate({scrollTop: x}, 500);
                    try {
                        trigger_terminal_change(next);
                    } catch (e) {
                        display_exception(e, 'onTerminalChange');
                    }
                    return next;
                }
            },
            // -------------------------------------------------------------
            // :: Make the terminal in focus or blur depending on the first
            // :: argument. If there is more then one terminal it will
            // :: switch to next one, if the second argument is set to true
            // :: the events will be not fired. Used on init
            // -------------------------------------------------------------
            focus: function(toggle, silent) {
                cmd_ready(function ready() {
                    if (terminals.length() === 1) {
                        if (toggle === false) {
                            self.disable(silent);
                        } else {
                            self.enable(silent);
                        }
                    } else if (toggle === false) {
                        self.next();
                    } else {
                        var front = terminals.front();
                        if (front !== self) {
                            // there should be only from terminal enabled but tests
                            // sometime fail because there where more them one
                            // where cursor have blink class
                            terminals.forEach(function(terminal) {
                                if (terminal !== self && terminal.enabled()) {
                                    terminal.disable(silent);
                                }
                            });
                            if (!silent) {
                                try {
                                    trigger_terminal_change(self);
                                } catch (e) {
                                    display_exception(e, 'onTerminalChange');
                                }
                            }
                        }
                        terminals.set(self);
                    }
                    self.enable(silent);
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Disable/Enable terminal that can be enabled by click
            // -------------------------------------------------------------
            freeze: function(freeze) {
                when_ready(function ready() {
                    if (freeze) {
                        self.disable();
                        frozen = true;
                    } else {
                        frozen = false;
                        self.enable();
                    }
                });
            },
            // -------------------------------------------------------------
            // :: check if terminal is frozen
            // -------------------------------------------------------------
            frozen: function() {
                return frozen;
            },
            // -------------------------------------------------------------
            // :: Enable the terminal
            // -------------------------------------------------------------
            enable: function(silent) {
                if (!enabled && !frozen) {
                    if (num_chars === undefined) {
                        // enabling first time
                        self.resize();
                    }
                    cmd_ready(function ready() {
                        var ret;
                        if (!silent && !enabled) {
                            try {
                                ret = settings.onFocus.call(self, self);
                            } catch (e) {
                                settings.onFocus = $.noop;
                                display_exception(e, 'onFocus');
                            }
                        }
                        if (!silent && ret === undefined || silent) {
                            enabled = true;
                            if (!self.paused()) {
                                command_line.enable();
                            }
                        }
                    });
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Disable the terminal
            // -------------------------------------------------------------
            disable: function(silent) {
                cmd_ready(function ready() {
                    var ret;
                    if (!silent && enabled) {
                        try {
                            ret = settings.onBlur.call(self, self);
                        } catch (e) {
                            settings.onBlur = $.noop;
                            display_exception(e, 'onBlur');
                        }
                    }
                    if (!silent && ret === undefined || silent) {
                        enabled = false;
                        command_line.disable();
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: return true if the terminal is enabled
            // -------------------------------------------------------------
            enabled: function() {
                return enabled;
            },
            // -------------------------------------------------------------
            // :: Return the terminal signature depending on the size of the terminal
            // -------------------------------------------------------------
            signature: function() {
                var cols = self.cols();
                for (var i = signatures.length; i--;) {
                    var lenghts = signatures[i].map(function(line) {
                        return line.length;
                    });
                    if (Math.max.apply(null, lenghts) <= cols) {
                        return signatures[i].join('\n') + '\n';
                    }
                }
                return '';
            },
            // -------------------------------------------------------------
            // :: Return the version number
            // -------------------------------------------------------------
            version: function() {
                return $.terminal.version;
            },
            // -------------------------------------------------------------
            // :: Return actual command line object (jquery object with cmd
            // :: methods)
            // -------------------------------------------------------------
            cmd: function() {
                return command_line;
            },
            // -------------------------------------------------------------
            // :: Return the current command entered by terminal
            // -------------------------------------------------------------
            get_command: function() {
                return command_line.get();
            },
            // -------------------------------------------------------------
            // :: Change the command line to the new one
            // -------------------------------------------------------------
            set_command: function(command) {
                when_ready(function ready() {
                    command_line.set(command);
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Change position of the command line
            // -------------------------------------------------------------
            set_position: function(position, relative) {
                when_ready(function ready() {
                    command_line.position(position, relative);
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Return position of the command line
            // -------------------------------------------------------------
            get_position: function() {
                return command_line.position();
            },
            // -------------------------------------------------------------
            // :: Insert text into the command line after the cursor
            // -------------------------------------------------------------
            insert: function(string, stay) {
                if (typeof string === 'string') {
                    when_ready(function ready() {
                        var bottom = self.is_bottom();
                        command_line.insert(string, stay);
                        if (settings.scrollOnEcho || bottom) {
                            scroll_to_bottom();
                        }
                    });
                    return self;
                } else {
                    throw new Error(sprintf(strings().notAString, 'insert'));
                }
            },
            // -------------------------------------------------------------
            // :: Set the prompt of the command line
            // -------------------------------------------------------------
            set_prompt: function(prompt) {
                when_ready(function ready() {
                    if (validate('prompt', prompt)) {
                        if ($.isFunction(prompt)) {
                            command_line.prompt(function(callback) {
                                prompt(callback, self);
                            });
                        } else {
                            command_line.prompt(prompt);
                        }
                        interpreters.top().prompt = prompt;
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Return the prompt used by the terminal
            // -------------------------------------------------------------
            get_prompt: function() {
                return interpreters.top().prompt;
                // command_line.prompt(); - can be a wrapper
                // return command_line.prompt();
            },
            // -------------------------------------------------------------
            // :: Enable or Disable mask depedning on the passed argument
            // :: the mask can also be character (in fact it will work with
            // :: strings longer then one)
            // -------------------------------------------------------------
            set_mask: function(mask) {
                when_ready(function ready() {
                    command_line.mask(mask === true ? settings.maskChar : mask);
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Return the ouput of the terminal as text
            // -------------------------------------------------------------
            get_output: function(raw) {
                if (raw) {
                    return lines;
                } else {
                    return $.map(lines, function(item) {
                        return $.isFunction(item[0]) ? item[0]() : item[0];
                    }).join('\n');
                }
            },
            // -------------------------------------------------------------
            // :: Recalculate and redraw everything
            // -------------------------------------------------------------
            resize: function(width, height) {
                if (!self.is(':visible')) {
                    // delay resize if terminal not visible
                    self.stopTime('resize');
                    self.oneTime(500, 'resize', function() {
                        self.resize(width, height);
                    });
                } else {
                    if (width && height) {
                        self.width(width);
                        self.height(height);
                    }
                    width = self.width();
                    height = self.height();
                    if (typeof settings.numChars !== 'undefined' ||
                        typeof settings.numRows !== 'undefined') {
                        redraw();
                        scroll_to_bottom();
                        return;
                    }
                    char_size = get_char_size(self);
                    var new_num_chars = get_num_chars(self, char_size);
                    var new_num_rows = get_num_rows(self, char_size);
                    // only if number of chars changed
                    if (new_num_chars !== num_chars ||
                        new_num_rows !== num_rows) {
                        num_chars = new_num_chars;
                        num_rows = new_num_rows;
                        command_line.resize(num_chars);
                        self.refresh();
                        var top = interpreters.top();
                        if ($.isFunction(top.resize)) {
                            top.resize.call(self, self);
                        } else if ($.isFunction(settings.onResize)) {
                            settings.onResize.call(self, self);
                        }
                        scroll_to_bottom();
                    }
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: redraw the terminal
            // -------------------------------------------------------------
            refresh: function() {
                self[0].style.setProperty('--char-width', char_size.width);
                redraw();
                return self;
            },
            // -------------------------------------------------------------
            // :: Flush the output to the terminal
            // -------------------------------------------------------------
            flush: function() {
                try {
                    var bottom = self.is_bottom();
                    var wrapper;
                    // print all lines
                    $.each(output_buffer, function(i, line) {
                        if (line === NEW_LINE) {
                            wrapper = $('<div></div>');
                        } else if ($.isFunction(line)) {
                            // this is finalize function from echo
                            wrapper.appendTo(output);
                            line(wrapper);
                        } else {
                            $('<div/>').html(line)
                                .appendTo(wrapper).width('100%');
                        }
                    });
                    if (settings.outputLimit >= 0) {
                        var limit;
                        if (settings.outputLimit === 0) {
                            limit = self.rows();
                        } else {
                            limit = settings.outputLimit;
                        }
                        var $lines = output.find('div div');
                        if ($lines.length + 1 > limit) {
                            var max = $lines.length - limit + 1;
                            var for_remove = $lines.slice(0, max);
                            // you can't get parent if you remove the
                            // element so we first get the parent
                            var parents = for_remove.parent();
                            for_remove.remove();
                            parents.each(function() {
                                var $self = $(this);
                                if ($self.is(':empty')) {
                                    // there can be divs inside parent that
                                    // was not removed
                                    $self.remove();
                                }
                            });
                        }
                    }
                    try {
                        settings.onFlush.call(self, self);
                    } catch (e) {
                        settings.onFlush = $.noop;
                        display_exception(e, 'onFlush');
                    }
                    //num_rows = get_num_rows(self, char_size);
                    if (settings.scrollOnEcho || bottom) {
                        scroll_to_bottom();
                    }
                    output_buffer = [];
                } catch (e) {
                    if ($.isFunction(settings.exceptionHandler)) {
                        settings.exceptionHandler.call(self, e, 'TERMINAL (Flush)');
                    } else {
                        alert_exception('[Flush]', e);
                    }
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Update the output line - line number can be negative
            // -------------------------------------------------------------
            update: function(line, string) {
                when_ready(function ready() {
                    if (line < 0) {
                        line = lines.length + line; // yes +
                    }
                    if (!lines[line]) {
                        self.error('Invalid line number ' + line);
                    } else {
                        if (string === null) {
                            lines.splice(line, 1);
                        } else {
                            lines[line][0] = string;
                        }
                        // it would be hard to figure out which div need to be
                        // updated so we update everything
                        redraw();
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: return index of last line in case when you need to update
            // :: after something is echo on the terminal
            // -------------------------------------------------------------
            last_index: function() {
                return lines.length - 1;
            },
            // -------------------------------------------------------------
            // :: Print data to the terminal output. It can have two options
            // :: a function that is called with the container div that
            // :: holds the output (as a jquery object) every time the
            // :: output is printed (including resize and scrolling)
            // :: If the line is a function it will be called for every
            // :: redraw.
            // :: it use $.when so you can echo a promise
            // -------------------------------------------------------------
            echo: function(string, options) {
                function echo(arg) {
                    try {
                        var locals = $.extend({
                            flush: true,
                            raw: settings.raw,
                            finalize: $.noop,
                            keepWords: false,
                            formatters: true
                        }, options || {});
                        if (locals.raw) {
                            (function(finalize) {
                                locals.finalize = function(div) {
                                    div.addClass('raw');
                                    finalize(div);
                                };
                            })(locals.finalize);
                        }
                        if (locals.flush) {
                            // flush buffer if there was no flush after previous echo
                            if (output_buffer.length) {
                                self.flush();
                            }
                            output_buffer = [];
                        }
                        if (typeof arg === 'function') {
                            arg = arg.bind(self);
                        }
                        process_line(arg, locals);
                        // extended commands should be processed only
                        // once in echo and not on redraw
                        lines.push([arg, $.extend(locals, {
                            exec: false
                        })]);
                        if (locals.flush) {
                            self.flush();
                        }
                    } catch (e) {
                        // if echo throw exception we can't use error to
                        // display that exception
                        if ($.isFunction(settings.exceptionHandler)) {
                            settings.exceptionHandler.call(self, e, 'TERMINAL (echo)');
                        } else {
                            alert_exception('[Terminal.echo]', e);
                        }
                    }
                }
                try {
                    if (options && $.isFunction(options.finalize)) {
                        options.finalize($('<div/>'));
                    }
                    if ($.isFunction(string.then)) {
                        $.when(string).done(echo);
                    } else {
                        echo(string);
                    }
                } catch (e) {
                    display_exception(e, 'USER:echo(finalize)');
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: echo red text
            // -------------------------------------------------------------
            error: function(message, options) {
                options = $.extend({}, options, {raw: false, formatters: false});
                // quick hack to fix trailing backslash
                var str = $.terminal.escape_brackets(message).
                    replace(/\\$/, '&#92;').
                    replace(url_re, ']$1[[;;;error]');
                return self.echo('[[;;;error]' + str + ']', options);
            },
            // -------------------------------------------------------------
            // :: Display Exception on terminal
            // -------------------------------------------------------------
            exception: function(e, label) {
                var message = exception_message(e);
                if (label) {
                    message = '&#91;' + label + '&#93;: ' + message;
                }
                if (message) {
                    self.error(message, {
                        finalize: function(div) {
                            div.addClass('exception message');
                        },
                        keepWords: true
                    });
                }
                if (typeof e.fileName === 'string') {
                    // display filename and line which throw exeption
                    self.pause(settings.softPause);
                    $.get(e.fileName, function(file) {
                        var num = e.lineNumber - 1;
                        var line = file.split('\n')[num];
                        if (line) {
                            self.error('[' + e.lineNumber + ']: ' + line);
                        }
                        self.resume();
                    }, 'text');
                }
                if (e.stack) {
                    var stack = $.terminal.escape_brackets(e.stack);
                    self.echo(stack.split(/\n/g).map(function(trace) {
                        return '[[;;;error]' + trace.replace(url_re, function(url) {
                            return ']' + url + '[[;;;error]';
                        }) + ']';
                    }).join('\n'), {
                        finalize: function(div) {
                            div.addClass('exception stack-trace');
                        },
                        formatters: false
                    });
                }
            },
            // -------------------------------------------------------------
            // :: Scroll Div that holds the terminal
            // -------------------------------------------------------------
            scroll: function(amount) {
                var pos;
                amount = Math.round(amount);
                if (scroll_object.prop) { // work with jQuery > 1.6
                    if (amount > scroll_object.prop('scrollTop') && amount > 0) {
                        scroll_object.prop('scrollTop', 0);
                    }
                    pos = scroll_object.prop('scrollTop');
                    scroll_object.scrollTop(pos + amount);
                } else {
                    if (amount > scroll_object.attr('scrollTop') && amount > 0) {
                        scroll_object.attr('scrollTop', 0);
                    }
                    pos = scroll_object.attr('scrollTop');
                    scroll_object.scrollTop(pos + amount);
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Exit all interpreters and logout. The function will throw
            // :: exception if there is no login provided
            // -------------------------------------------------------------
            logout: function(local) {
                if (in_login) {
                    throw new Error(sprintf(strings().notWhileLogin, 'logout'));
                }
                when_ready(function ready() {
                    if (local) {
                        var login = logins.pop();
                        self.set_token(undefined, true);
                        self.login.apply(self, login);
                    } else if (interpreters.size() === 1 && self.token()) {
                        self.logout(true);
                    } else {
                        while (interpreters.size() > 1) {
                            // pop will call global_logout that will call login
                            // and size will be > 0; this is workaround the problem
                            if (self.token()) {
                                self.logout(true).pop().pop();
                            } else {
                                self.pop();
                            }
                        }
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Function returns the token returned by callback function
            // :: in login function. It does nothing (return undefined) if
            // :: there is no login
            // -------------------------------------------------------------
            token: function(local) {
                return storage.get(self.prefix_name(local) + '_token');
            },
            // -------------------------------------------------------------
            // :: Function sets the token to the supplied value. This function
            // :: works regardless of wherer settings.login is supplied
            // -------------------------------------------------------------
            set_token: function(token, local) {
                var name = self.prefix_name(local) + '_token';
                if (typeof token === 'undefined') {
                    storage.remove(name, token);
                } else {
                    storage.set(name, token);
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Function get the token either set by the login method or
            // :: by the set_token method.
            // -------------------------------------------------------------
            get_token: function(local) {
                return self.token(local);
            },
            // -------------------------------------------------------------
            // :: Function return Login name entered by the user
            // -------------------------------------------------------------
            login_name: function(local) {
                return storage.get(self.prefix_name(local) + '_login');
            },
            // -------------------------------------------------------------
            // :: Function returns the name of current interpreter
            // -------------------------------------------------------------
            name: function() {
                return interpreters.top().name;
            },
            // -------------------------------------------------------------
            // :: Function return prefix name for login/token
            // -------------------------------------------------------------
            prefix_name: function(local) {
                var name = (settings.name ? settings.name + '_' : '') +
                    terminal_id;
                if (local && interpreters.size() > 1) {
                    var local_name = interpreters.map(function(intrp) {
                        return intrp.name || '';
                    }).slice(1).join('_');
                    if (local_name) {
                        name += '_' + local_name;
                    }
                }
                return name;
            },
            // -------------------------------------------------------------
            // :: wrapper for common use case
            // -------------------------------------------------------------
            read: function(message, callback) {
                var d = new $.Deferred();
                self.push(function(text) {
                    self.pop();
                    if ($.isFunction(callback)) {
                        callback(text);
                    }
                    d.resolve(text);
                }, {
                    prompt: message
                });
                return d.promise();
            },
            // -------------------------------------------------------------
            // :: Push a new interenter on the Stack
            // -------------------------------------------------------------
            push: function(interpreter, options) {
                cmd_ready(function ready() {
                    options = options || {};
                    var defaults = {
                        infiniteLogin: false
                    };
                    var push_settings = $.extend({}, defaults, options);
                    if (!push_settings.name && prev_command) {
                        // push is called in login
                        push_settings.name = prev_command.name;
                    }
                    if (push_settings.prompt === undefined) {
                        push_settings.prompt = (push_settings.name || '>') + ' ';
                    }
                    // names.push(options.name);
                    var top = interpreters.top();
                    if (top) {
                        top.mask = command_line.mask();
                    }
                    var was_paused = paused;
                    function init() {
                        settings.onPush.call(self, top, interpreters.top(), self);
                        prepare_top_interpreter();
                    }
                    // self.pause();
                    make_interpreter(interpreter, !!options.login, function(ret) {
                        // result is object with interpreter and completion properties
                        interpreters.push($.extend({}, ret, push_settings));
                        if (push_settings.completion === true) {
                            if ($.isArray(ret.completion)) {
                                interpreters.top().completion = ret.completion;
                            } else if (!ret.completion) {
                                interpreters.top().completion = false;
                            }
                        }
                        if (push_settings.login) {
                            var error;
                            var type = $.type(push_settings.login);
                            if (type === 'function') {
                                error = push_settings.infiniteLogin ? $.noop : self.pop;
                                self.login(push_settings.login,
                                           push_settings.infiniteLogin,
                                           init,
                                           error);
                            } else if ($.type(interpreter) === 'string' &&
                                       type === 'string' || type === 'boolean') {
                                error = push_settings.infiniteLogin ? $.noop : self.pop;
                                self.login(make_json_rpc_login(interpreter,
                                                               push_settings.login),
                                           push_settings.infiniteLogin,
                                           init,
                                           error);
                            }
                        } else {
                            init();
                        }
                        if (!was_paused && self.enabled()) {
                            self.resume();
                        }
                    });
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Remove the last interpreter from the Stack
            // -------------------------------------------------------------
            pop: function(string, silent) {
                if (string !== undefined) {
                    echo_command(string);
                }
                var token = self.token(true);
                var top;
                if (interpreters.size() === 1) {
                    top = interpreters.top();
                    if (settings.login) {
                        if (!silent) {
                            settings.onPop.call(self, top, null, self);
                        }
                        global_logout();
                        if ($.isFunction(settings.onExit)) {
                            try {
                                settings.onExit.call(self, self);
                            } catch (e) {
                                settings.onExit = $.noop;
                                display_exception(e, 'onExit');
                            }
                        }
                    } else {
                        self.error(strings().canExitError);
                    }
                } else {
                    if (token) {
                        clear_loging_storage();
                    }
                    var current = interpreters.pop();
                    top = interpreters.top();
                    prepare_top_interpreter();
                    if (!silent) {
                        settings.onPop.call(self, current, top);
                    }
                    // we check in case if you don't pop from password interpreter
                    if (in_login && self.get_prompt() !== strings().login + ': ') {
                        in_login = false;
                    }
                    if ($.isFunction(current.onExit)) {
                        try {
                            current.onExit.call(self, self);
                        } catch (e) {
                            current.onExit = $.noop;
                            display_exception(e, 'onExit');
                        }
                    }
                    // restore mask
                    self.set_mask(top.mask);
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Change terminal option(s) at runtime
            // -------------------------------------------------------------
            option: function(object_or_name, value) {
                if (typeof value === 'undefined') {
                    if (typeof object_or_name === 'string') {
                        return settings[object_or_name];
                    } else if (typeof object_or_name === 'object') {
                        $.each(object_or_name, function(key, value) {
                            settings[key] = value;
                        });
                    }
                } else {
                    settings[object_or_name] = value;
                    if (object_or_name.match(/^num(Chars|Rows)$/)) {
                        redraw();
                    }
                }
                return self;
            },
            // -------------------------------------------------------------
            // :: Return how deep you are in nested interpreters
            // -------------------------------------------------------------
            level: function() {
                return interpreters.size();
            },
            // -------------------------------------------------------------
            // :: Reinitialize the terminal
            // -------------------------------------------------------------
            reset: function() {
                when_ready(function ready() {
                    self.clear();
                    while (interpreters.size() > 1) {
                        interpreters.pop();
                    }
                    initialize();
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Remove all local storage left by terminal, it will not
            // :: logout you until you refresh the browser
            // -------------------------------------------------------------
            purge: function() {
                when_ready(function ready() {
                    var prefix = self.prefix_name() + '_';
                    var names = storage.get(prefix + 'interpreters');
                    if (names) {
                        $.each(JSON.parse(names), function(_, name) {
                            storage.remove(name + '_commands');
                            storage.remove(name + '_token');
                            storage.remove(name + '_login');
                        });
                    }
                    command_line.purge();
                    storage.remove(prefix + 'interpreters');
                });
                return self;
            },
            // -------------------------------------------------------------
            // :: Remove all events and DOM nodes left by terminal, it will
            // :: not purge the terminal so you will have the same state
            // :: when you refresh the browser
            // -------------------------------------------------------------
            destroy: function() {
                when_ready(function ready() {
                    command_line.destroy().remove();
                    output.remove();
                    wrapper.remove();
                    $(document).unbind('.terminal_' + self.id());
                    $(window).unbind('.terminal_' + self.id());
                    self.unbind('click wheel mousewheel mousedown mouseup');
                    self.removeData('terminal').removeClass('terminal').
                        unbind('.terminal');
                    if (settings.width) {
                        self.css('width', '');
                    }
                    if (settings.height) {
                        self.css('height', '');
                    }
                    $(window).off('blur', blur_terminal).
                        off('focus', focus_terminal);
                    self.find('.terminal-fill').remove();
                    self.stopTime();
                    terminals.remove(terminal_id);
                    if (visibility_observer) {
                        visibility_observer.unobserve(self[0]);
                    }
                    if (mutation_observer) {
                        mutation_observer.disconnect();
                    }
                    self.resizer('unbind');
                    font_resizer.resizer('unbind').remove();
                    if (!terminals.length()) {
                        $(window).off('hashchange');
                    }
                });
                return self;
            },
            // -------------------------------------------------------------
            scroll_to_bottom: function() {
                scroll_to_bottom();
                return self;
            },
            // -------------------------------------------------------------
            // :: return true if terminal div or body is at the bottom
            // :: is use scrollBottomOffset option as margin for the check
            // -------------------------------------------------------------
            is_bottom: function() {
                if (settings.scrollBottomOffset === -1) {
                    return false;
                } else {
                    var scroll_height, scroll_top, height;
                    if (self.is('body')) {
                        scroll_height = $(document).height();
                        scroll_top = $(window).scrollTop();
                        height = window.innerHeight;
                    } else {
                        scroll_height = scroll_object[0].scrollHeight;
                        scroll_top = scroll_object.scrollTop();
                        height = scroll_object.outerHeight();
                    }
                    var limit = scroll_height - settings.scrollBottomOffset;
                    return scroll_top + height > limit;
                }
            }
        }, function(name, fun) {
            // wrap all functions and display execptions
            return function() {
                try {
                    return fun.apply(self, [].slice.apply(arguments));
                } catch (e) {
                    // exec catch by command (resume call exec)
                    if (name !== 'exec' && name !== 'resume') {
                        display_exception(e, 'TERMINAL', true);
                    }
                    if (!settings.exceptionHandler) {
                        throw e;
                    }
                }
            };
        }));

        // -----------------------------------------------------------------
        // INIT CODE
        // -----------------------------------------------------------------
        // backward compatibility
        if (settings.ignoreSystemDescribe === true) {
            settings.describe = false;
        }
        if (settings.width) {
            self.width(settings.width);
        }
        if (settings.height) {
            self.height(settings.height);
        }
        scroll_object = self.scroll_element();
        // register ajaxSend for cancel requests on CTRL+D
        $(document).bind('ajaxSend.terminal_' + self.id(), function(e, xhr) {
            requests.push(xhr);
        });
        var wrapper = $('<div class="terminal-wrapper"/>').appendTo(self);
        var font_resizer = $('<div class="font"/>').appendTo(self);
        $('<div class="terminal-fill"/>').appendTo(self);
        output = $('<div>').addClass('terminal-output').attr('role', 'log')
            .appendTo(wrapper);
        self.addClass('terminal');
        // before login event
        if (settings.login && $.isFunction(settings.onBeforeLogin)) {
            try {
                if (settings.onBeforeLogin.call(self, self) === false) {
                    autologin = false;
                }
            } catch (e) {
                settings.onBeforeLogin = $.noop;
                display_exception(e, 'onBeforeLogin');
            }
        }
        // create json-rpc authentication function
        var base_interpreter;
        if (typeof init_interpreter === 'string') {
            base_interpreter = init_interpreter;
        } else if (init_interpreter instanceof Array) {
            // first JSON-RPC
            for (var i = 0, len = init_interpreter.length; i < len; ++i) {
                if (typeof init_interpreter[i] === 'string') {
                    base_interpreter = init_interpreter[i];
                    break;
                }
            }
        }
        if (base_interpreter &&
            (typeof settings.login === 'string' || settings.login === true)) {
            settings.login = make_json_rpc_login(base_interpreter,
                                                 settings.login);
        }
        terminals.append(self);
        function focus_terminal() {
            if (old_enabled) {
                self.focus();
            }
        }
        function blur_terminal() {
            old_enabled = enabled;
            self.disable().find('textarea').trigger('blur', [true]);
        }
        function paste_event(e) {
            e = e.originalEvent;
            // we don't care about browser that don't support clipboard data
            // those browser simple will not have this feature normal paste
            // is cross-browser and it's handled by cmd plugin
            function is_type(item, type) {
                return item.type.indexOf(type) !== -1;
            }
            if (e.clipboardData) {
                if (self.enabled()) {
                    var items = e.clipboardData.items;
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            if (is_type(items[i], 'image') && settings.pasteImage) {
                                var blob = items[i].getAsFile();
                                var URL = window.URL || window.webkitURL;
                                var source = URL.createObjectURL(blob);
                                self.echo('<img src="' + source + '"/>', {raw: true});
                            } else if (is_type(items[i], 'text/plain')) {
                                items[i].getAsString(self.insert);
                            }
                        }
                    } else if (e.clipboardData.getData) {
                        var text = e.clipboardData.getData('text/plain');
                        self.insert(text);
                    }
                    return false;
                }
            }
        }
        $(document).on('paste.terminal_' + self.id(), paste_event);
        make_interpreter(init_interpreter, !!settings.login, function(itrp) {
            if (settings.completion && typeof settings.completion !== 'boolean' ||
                !settings.completion) {
                // overwrite interpreter completion by global setting #224
                // we use string to indicate that it need to be taken from settings
                // so we are able to change it using option API method
                itrp.completion = 'settings';
            }
            var new_keymap = $.extend(
                {},
                keymap,
                $.omap(settings.keymap || {}, function(key, fn) {
                    if (!keymap[key]) {
                        return fn.bind(self);
                    }
                    return function(e, original) {
                        // new keymap function will get default as 2nd argument
                        return fn.call(self, e, function() {
                            return keymap[key](e, original);
                        });
                    };
                })
            );
            interpreters = new Stack($.extend({}, settings.extra, {
                name: settings.name,
                prompt: settings.prompt,
                keypress: settings.keypress,
                keydown: settings.keydown,
                resize: settings.onResize,
                greetings: settings.greetings,
                mousewheel: settings.mousewheel,
                keymap: new_keymap
            }, itrp));
            // CREATE COMMAND LINE
            command_line = $('<div/>').appendTo(wrapper).cmd({
                prompt: settings.prompt,
                history: settings.memory ? 'memory' : settings.history,
                historyFilter: settings.historyFilter,
                historySize: settings.historySize,
                width: '100%',
                enabled: false,
                keydown: key_down,
                keymap: new_keymap,
                clickTimeout: settings.clickTimeout,
                keypress: function(e) {
                    var top = interpreters.top();
                    if (enabled && (!paused || !settings.pauseEvents)) {
                        if ($.isFunction(top.keypress)) {
                            return top.keypress.call(self, e, self);
                        } else if ($.isFunction(settings.keypress)) {
                            return settings.keypress.call(self, e, self);
                        }
                    }
                },
                onCommandChange: function(command) {
                    if ($.isFunction(settings.onCommandChange)) {
                        try {
                            settings.onCommandChange.call(self, command, self);
                        } catch (e) {
                            settings.onCommandChange = $.noop;
                            display_exception(e, 'onCommandChange');
                        }
                    }
                    scroll_to_bottom();
                },
                commands: commands
            });
            // touch devices need touch event to get virtual keyboard
            if (enabled && self.is(':visible') && !is_mobile) {
                self.focus(undefined, true);
            } else {
                self.disable();
            }
            function disable(e) {
                e = e.originalEvent;
                if (e) {
                    // e.terget is body when click outside of context menu to close it
                    // even if you click on terminal
                    var node = document.elementFromPoint(e.clientX, e.clientY);
                    if (!$(node).closest('.terminal').length && self.enabled()) {
                        // we only need to disable when click outside of terminal
                        // click on other terminal is handled by focus event
                        self.disable();
                    }
                }
            }
            self.oneTime(100, function() {
                $(document).bind('click.terminal_' + self.id(), disable).
                    bind('contextmenu.terminal_' + self.id(), disable);
            });
            var $win = $(window);
            // cordova application, if keyboard was open and we resume it will be
            // closed so we need to disable terminal so you can enable it with tap
            document.addEventListener("resume", function() {
                self.disable();
            });
            if (is_mobile) {
                self.click(function() {
                    if (!frozen) {
                        if (!self.enabled()) {
                            self.focus();
                            command_line.enable();
                        } else {
                            self.disable();
                        }
                    }
                });
            } else {
                // work weird on mobile
                $win.on('focus.terminal_' + self.id(), focus_terminal).
                    on('blur.terminal_' + self.id(), blur_terminal);
                // detect mouse drag
                (function() {
                    var count = 0;
                    var $target;
                    var name = 'click_' + self.id();
                    function position() {
                        if ($target.is('.terminal') ||
                            $target.is('.terminal-wrapper')) {
                            var len = self.get_command().length;
                            self.set_position(len);
                        } else if ($target.closest('.prompt').length) {
                            self.set_position(0);
                        }
                        reset();
                    }
                    function reset() {
                        count = 0;
                        $target = null;
                    }
                    var resizer = self.find('.terminal-fill');
                    self.mousedown(function(e) {
                        if (!scrollbar_event(e, resizer)) {
                            $target = $(e.target);
                        }
                    }).mouseup(function() {
                        if (get_selected_text() === '' && $target) {
                            if (++count === 1) {
                                if (!frozen) {
                                    if (!enabled) {
                                        self.focus();
                                    } else {
                                        var timeout = settings.clickTimeout;
                                        self.oneTime(timeout, name, position);
                                        return;
                                    }
                                }
                            } else {
                                self.stopTime(name);
                            }
                        }
                        reset();
                    }).dblclick(function() {
                        reset();
                        self.stopTime(name);
                    });
                })();
                (function() {
                    var clip = self.find('textarea');
                    self.on('contextmenu.terminal', function(e) {
                        if (get_selected_text() === '') {
                            if (!$(e.target).is('img,value,audio,object,canvas,a')) {
                                if (!self.enabled()) {
                                    self.enable();
                                }
                                var offset = command_line.offset();
                                clip.css({
                                    left: e.pageX - offset.left - 20,
                                    top: e.pageY - offset.top - 20,
                                    width: '5em',
                                    height: '4em'
                                });
                                if (!clip.is(':focus')) {
                                    clip.focus();
                                }
                                self.stopTime('textarea');
                                self.oneTime(100, 'textarea', function() {
                                    clip.css({
                                        left: '',
                                        top: '',
                                        width: '',
                                        height: ''
                                    });
                                });
                                self.stopTime('selection');
                                self.everyTime(20, 'selection', function() {
                                    if (clip[0].selection !== clip[0].value) {
                                        if (get_textarea_selection(clip[0])) {
                                            clear_textarea_selection(clip[0]);
                                            select(
                                                self.find('.terminal-output')[0],
                                                self.find('.cmd div:last-of-type')[0]
                                            );
                                            self.stopTime('selection');
                                        }
                                    }
                                });
                            }
                        }
                    });
                })();
            }
            self.delegate('.exception a', 'click', function(e) {
                // .on('click', '.exception a', function(e) {
                // in new jquery .delegate just call .on
                var href = $(this).attr('href');
                if (href.match(/:[0-9]+$/)) { // display line if specified
                    e.preventDefault();
                    print_line(href);
                }
            });
            if (self.is(':visible')) {
                num_chars = self.cols();
                command_line.resize(num_chars);
                if (!char_size) {
                    char_size = get_char_size(self);
                }
                num_rows = get_num_rows(self, char_size);
            }
            // -------------------------------------------------------------
            // Run Login
            command_queue.resolve();
            if (settings.login) {
                self.login(settings.login, true, initialize);
            } else {
                initialize();
            }
            function resize() {
                if (self.is(':visible')) {
                    var width = self.width();
                    var height = self.height();
                    // prevent too many calculations in IE
                    if (old_height !== height || old_width !== width) {
                        self.resize();
                    }
                    old_height = height;
                    old_width = width;
                }
            }
            function create_resizers() {
                self.resizer('unbind').resizer(resize);
                font_resizer.resizer('unbind').resizer(self.resize);
            }
            if (self.is(':visible')) {
                create_resizers();
            }
            function observe_visibility() {
                if (visibility_observer) {
                    visibility_observer.unobserve(self[0]);
                }
                var was_enabled;
                visibility_observer = new IntersectionObserver(function() {
                    if (self.is(':visible')) {
                        create_resizers();
                        resize();
                        if (was_enabled) {
                            self.enabled();
                        }
                    } else {
                        was_enabled = $.terminal.active() === self && self.enabled();
                        self.disable();
                    }
                }, {
                    root: document.body
                });
                visibility_observer.observe(self[0]);
            }
            var in_dom = !!self.closest('body').length;
            var MutationObsrv = window.MutationObserver || window.WebKitMutationObserver;
            if (window.IntersectionObserver) {
                if (MutationObsrv) {
                    mutation_observer = new MutationObsrv(function() {
                        if (self.closest('body').length) {
                            if (!in_dom) {
                                self.scroll_to_bottom();
                                observe_visibility();
                            }
                            in_dom = true;
                        } else if (in_dom) {
                            in_dom = false;
                        }
                    });
                    mutation_observer.observe(document.body, {childList: true});
                }
                // check if element is in the DOM if not running IntersectionObserver
                // don't make sense
                if (in_dom) {
                    observe_visibility();
                }

            }
            // -------------------------------------------------------------
            // :: helper
            function exec_spec(spec) {
                var terminal = terminals.get()[spec[0]];
                // execute if belong to this terminal
                if (terminal && terminal_id === terminal.id()) {
                    if (spec[2]) {
                        try {
                            if (paused) {
                                var defer = $.Deferred();
                                resume_callbacks.push(function() {
                                    return terminal.exec(spec[2]).done(function() {
                                        terminal.save_state(spec[2], true, spec[1]);
                                        defer.resolve();
                                    });
                                });
                                return defer.promise();
                            } else {
                                return terminal.exec(spec[2]).done(function() {
                                    terminal.save_state(spec[2], true, spec[1]);
                                });
                            }
                        } catch (e) {
                            var settings = terminal.settings();
                            if ($.isFunction(settings.exceptionHandler)) {
                                settings.exceptionHandler.call(self, e, 'EXEC HASH');
                            } else {
                                var cmd = $.terminal.escape_brackets(command);
                                var msg = 'Error while exec with command ' + cmd;
                                terminal.error(msg).exception(e);
                            }
                        }
                    }
                }
            }
            // exec from hash called in each terminal instance
            if (settings.execHash) {
                if (location.hash) {
                    // wait until login is initialized
                    setTimeout(function() {
                        try {
                            var hash = location.hash.replace(/^#/, '');
                            // yes no var - local inside terminal
                            hash_commands = JSON.parse(decodeURIComponent(hash));
                            var i = 0;
                            (function recur() {
                                var spec = hash_commands[i++];
                                if (spec) {
                                    exec_spec(spec).done(recur);
                                } else {
                                    change_hash = true;
                                }
                            })();// */
                        } catch (e) {
                            // invalid json - ignore
                        }
                    });
                } else {
                    change_hash = true;
                }
            } else {
                change_hash = true; // if enabled later
            }
            // change_hash = true; // exec can now change hash
            // -------------------------------------------------------------
            var shift = false;
            $(document).bind('keydown.terminal_' + self.id(), function(e) {
                if (e.shiftKey) {
                    shift = true;
                }
            }).bind('keyup.terminal_' + self.id(), function(e) {
                // in Google Chromium/Linux shiftKey is false
                if (e.shiftKey || e.which === 16) {
                    shift = false;
                }
            });
            // this could work without calling scroll on wheel event but we
            // need to for cases where you have mouse wheel work differently
            // like with less command that scroll text
            function mousewheel(event, delta) {
                if (!shift) {
                    var interpreter = interpreters.top();
                    var ret;
                    if ($.isFunction(interpreter.mousewheel)) {
                        ret = interpreter.mousewheel(event, delta, self);
                        if (ret === false) {
                            return;
                        }
                    } else if ($.isFunction(settings.mousewheel)) {
                        ret = settings.mousewheel(event, delta, self);
                        if (ret === false) {
                            return;
                        }
                    }
                    if (delta > 0) {
                        self.scroll(-40);
                    } else {
                        self.scroll(40);
                    }
                }
            }
            if ($.event.special.mousewheel) {
                // we keep mousewheel plugin just in case
                self.on('mousewheel', function(event, delta) {
                    mousewheel(event, delta);
                    event.preventDefault();
                });
            } else {
                // detection take from:
                // https://developer.mozilla.org/en-US/docs/Web/Events/wheel
                var event;
                var div = document.createElement("div");
                if ("onwheel" in div) {
                    event = "wheel"; // Modern browsers support "wheel"
                } else if (document.onmousewheel !== undefined) {
                    event = "mousewheel"; // Webkit and IE support at least "mousewheel"
                } else {
                    // let's assume that remaining browsers are older Firefox
                    event = "DOMMouseScroll";
                }
                div = null;
                self.on(event, function(e) {
                    var delta;
                    if (event === 'mousewheel') {
                        delta = - 1 / 40 * e.originalEvent.wheelDelta;
                    } else {
                        delta = e.originalEvent.deltaY || e.originalEvent.detail;
                    }
                    mousewheel(e, -delta);
                    e.preventDefault();
                });
            }
        }); // make_interpreter
        self.data('terminal', self);
        return self;
    }; // terminal plugin
});
