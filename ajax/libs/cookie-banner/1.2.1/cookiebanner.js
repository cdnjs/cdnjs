/*global window:false, setTimeout:true, console:true */
/*
Copyright (C) 2013-2015 Good Code and Cookie Banner contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function(context) {
    'use strict';

    var win = context, doc = win.document;

    var global_instance_name = 'cbinstance';

    /*eslint-disable */
    /*!
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     *
     */
    // @win window reference
    // @fn function reference
    function contentLoaded(win, fn) {
        var done = false, top = true,
        doc = win.document, root = doc.documentElement,

        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    }
    /*eslint-enable */

    var Cookies = {
        get: function (key) {
            return decodeURIComponent(doc.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
        },
        set: function (key, val, end, path, domain, secure) {
            if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
                return false;
            }
            var expires = '';
            if (end) {
                switch (end.constructor) {
                    case Number:
                        expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
                        break;
                    case String:
                        expires = '; expires=' + end;
                    break;
                    case Date:
                        expires = '; expires=' + end.toUTCString();
                    break;
                }
            }
            doc.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(val) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
            return true;
        },
        has: function (key) {
            return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(doc.cookie);
        },
        remove: function (key, path, domain) {
            if (!key || !this.has(key)) { return false; }
            doc.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '') + ( path ? '; path=' + path : '');
            return true;
        }
    };

    var Utils = {

        // merge objects and whatnot
        merge: function() {
            var obj = {},
                i = 0,
                al = arguments.length,
                key;
            if (0 === al) {
                return obj;
            }
            for (; i < al; i++) {
                for (key in arguments[i]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                        obj[key] = arguments[i][key];
                    }
                }
            }
            return obj;
        },

        str2bool: function(str) {
            str = String(str);
            switch (str.toLowerCase()) {
                case 'false':
                case 'no':
                case '0':
                case '':
                    return false;
                default:
                    return true;
                }
        },

        fade_in: function(el) {
            if (el.style.opacity < 1) {
                el.style.opacity = (parseFloat(el.style.opacity) + 0.05).toFixed(2);
                win.setTimeout(function(){
                    Utils.fade_in(el);
                }, 50);
            }
        },

        get_data_attribs: function(script) {
            var data = {};
            if (Object.prototype.hasOwnProperty.call(script, 'dataset')) {
                data = script.dataset;
            } else {
                var attribs = script.attributes;
                var key;
                for (key in attribs) {
                    if (Object.prototype.hasOwnProperty.call(attribs, key)) {
                        var attr = attribs[key];
                        if (/^data-/.test(attr.name)) {
                            var camelized = Utils.camelize(attr.name.substr(5));
                            data[camelized] = attr.value;
                        }
                    }
                }
            }
            return data;
        },

        /**
        * "Standardizes" the options keys by converting and removing
        * any potential "dashed-property-name" into "dashedPropertyName".
        * In case both are present, the dashedPropertyName wins.
        */
        normalize_keys: function(options_object) {
            var camelized = {};
            for (var key in options_object) {
                if (Object.prototype.hasOwnProperty.call(options_object, key)) {
                    var camelized_key = Utils.camelize(key);
                    // TODO: could this break for "falsy" values within options_object?
                    // avoiding "dashed-property-name" overriding a potentially existing "dashedPropertyName"
                    camelized[camelized_key] = options_object[camelized_key] ? options_object[camelized_key] : options_object[key];
                }
            }
            return camelized;
        },

        camelize: function(str) {
            var separator = '-',
                match = str.indexOf(separator);
            while (match !== -1) {
                var last = (match === (str.length - 1)),
                    next = last ? '' : str[match + 1],
                    upnext = next.toUpperCase(),
                    sep_substr = last ? separator : separator + next;
                str = str.replace(sep_substr, upnext);
                match = str.indexOf(separator);
            }
            return str;
        },

        find_script_by_id: function(id) {
            var scripts = doc.getElementsByTagName('script');
            for (var i = 0, l = scripts.length; i < l; i++) {
                if (id === scripts[i].id) {
                    return scripts[i];
                }
            }
            return null;
        }

    };

    var script_el_invoker = Utils.find_script_by_id('cookiebanner');

    var Cookiebanner = context.Cookiebanner = function(opts) {
        this.init(opts);
    };

    Cookiebanner.prototype = {

        // for testing stuff from the outside mostly
        cookiejar: Cookies,

        init: function(opts) {

            this.inserted = false;
            this.closed = false;
            this.test_mode = false; // TODO: implement

            var default_text = 'We use cookies to enhance your experience. ' +
                'By continuing to visit this site you agree to our use of cookies.';
            var default_link = 'Learn more';

            this.default_options = {
                // autorun: true,
                cookie: 'cookiebanner-accepted',
                closeText: '&#10006;',
                closeStyle: 'float:right;padding-left:5px;',
                closePrecedes: true,
                cookiePath: '/',
                cookieDomain: null,
                cookieSecure: false,
                debug: false,
                expires: Infinity,
                zindex: 255,
                mask: false,
                maskOpacity: 0.5,
                maskBackground: '#000',
                height: 'auto',
                minHeight: '21px',
                bg: '#000',
                fg: '#ddd',
                link: '#aaa',
                position: 'bottom',
                message: default_text,
                linkmsg: default_link,
                moreinfo: 'http://aboutcookies.org',
                moreinfoTarget: '_blank',
                moreinfoRel: 'noopener noreferrer',
                moreinfoDecoration: 'none',
                moreinfoFontWeight: 'normal',
                moreinfoFontSize: null,
                effect: null,
                fontSize: '14px',
                fontFamily: 'arial, sans-serif',
                instance: global_instance_name,
                textAlign: 'center',
                acceptOnScroll: false,
                acceptOnClick: false,
                acceptOnTimeout: null,
                acceptOnFirstVisit: false
            };

            this.options = this.default_options;
            this.script_el = script_el_invoker;

            if (this.script_el) {
                var data_options = Utils.get_data_attribs(this.script_el);
                this.options = Utils.merge(this.options, data_options);
            }

            // allowing opts passed to the ctor to override everything
            if (opts) {
                // mimics the "data-option-name" HTML attribute becoming
                // this.options.optionName
                opts = Utils.normalize_keys(opts);
                this.options = Utils.merge(this.options, opts);
            }

            // allows customizing the global instance name via options too
            global_instance_name = this.options.instance;

            // TODO: parse/validate other options that can benefit
            this.options.zindex = parseInt(this.options.zindex, 10);
            this.options.mask = Utils.str2bool(this.options.mask);
            this.options.closePrecedes = Utils.str2bool(this.options.closePrecedes);

            // check for a possible global callback specified as a string
            if ('string' === typeof this.options.expires) {
                if ('function' === typeof context[this.options.expires]) {
                    this.options.expires = context[this.options.expires];
                }
            }

            // check if expires is a callback
            if ('function' === typeof this.options.expires) {
                // TODO: this might not always be as simple as this
                this.options.expires = this.options.expires();
            }

            // Proceed with our plans only if we're invoked via a <script> element
            // that has the required id attribute.
            // For manually created instances one must call run() explicitly.
            if (this.script_el) {
                this.run();
            }
        },

        log: function() {
            /* eslint-disable no-console */
            if ('undefined' !== typeof console) {
                console.log.apply(console, arguments);
            }
            /* eslint-enable no-console */
        },

        run: function() {
            if (!this.agreed()) {
                var self = this;
                contentLoaded(win, function(){
                    self.insert();
                });
            }
        },

        build_viewport_mask: function() {
            var mask = null;
            if (true === this.options.mask) {
                var mask_opacity = this.options.maskOpacity;
                var bg = this.options.maskBackground;
                var mask_markup = '<div id="cookiebanner-mask" style="' +
                    'position:fixed;top:0;left:0;width:100%;height:100%;' +
                    'background:' + bg + ';zoom:1;filter:alpha(opacity=' +
                    (mask_opacity * 100) +');opacity:' + mask_opacity +';' +
                    'z-index:' + this.options.zindex +';"></div>';
                var el = doc.createElement('div');
                el.innerHTML = mask_markup;
                mask = el.firstChild;
            }
            return mask;
        },

        agree: function() {
            this.cookiejar.set(this.options.cookie, 1, this.options.expires, this.options.cookiePath, (this.options.cookieDomain !== '' ? this.options.cookieDomain : ''), (this.options.cookieSecure ? true : false));
            return true;
        },

        agreed: function() {
            return this.cookiejar.has(this.options.cookie);
        },

        close: function() {
            if (this.inserted) {
                if (!this.closed) {
                    if (this.element) {
                        this.element.parentNode.removeChild(this.element);
                    }
                    if (this.element_mask) {
                        this.element_mask.parentNode.removeChild(this.element_mask);
                    }
                    this.closed = true;
                }
            }/* else {
                throw new Error("Not inserted but closing?!");
            }*/
            return this.closed;
        },

        agree_and_close:function() {
            this.agree();
            return this.close();
        },

        // close and remove every trace of ourselves completely
        cleanup: function() {
            this.close();
            return this.unload();
        },

        unload: function() {
            if (this.script_el) {
                this.script_el.parentNode.removeChild(this.script_el);
            }
            context[global_instance_name] = undefined;
            // delete context[global_instance_name];
            return true;
        },

        insert: function() {
            this.element_mask = this.build_viewport_mask();

            var zidx = this.options.zindex;

            if (this.element_mask) {
                // bump notice element's zindex so it's above the mask
                zidx += 1;
            }

            var el = doc.createElement('div');
            el.className = 'cookiebanner';
            el.style.position = 'fixed';
            el.style.left = 0;
            el.style.right = 0;
            el.style.height = this.options.height;
            el.style.minHeight = this.options.minHeight;
            el.style.zIndex = zidx;
            el.style.background = this.options.bg;
            el.style.color = this.options.fg;
            el.style.lineHeight = el.style.minHeight;

            el.style.padding = '5px 16px';

            el.style.fontFamily = this.options.fontFamily;
            el.style.fontSize = this.options.fontSize;
            el.style.textAlign = this.options.textAlign;

            if ('top' === this.options.position) {
                el.style.top = 0;
            } else {
                el.style.bottom = 0;
            }

            var closeHtml = '<div class="cookiebanner-close" style="' + this.options.closeStyle + '">' +
                this.options.closeText + '</div>';
            var messageHtml = '<span>' + this.options.message + (this.options.linkmsg ? ' <a>' + this.options.linkmsg + '</a>' : '') + '</span>';

            if (this.options.closePrecedes) {
                el.innerHTML = closeHtml + messageHtml;
            } else {
                el.innerHTML = messageHtml + closeHtml;
            }

            this.element = el;

            var el_a = el.getElementsByTagName('a')[0];
            el_a.href = this.options.moreinfo;
            el_a.target = this.options.moreinfoTarget;
            if (this.options.moreinfoRel && '' !== this.options.moreinfoRel) {
                el_a.rel = this.options.moreinfoRel;
            }
            el_a.style.textDecoration = this.options.moreinfoDecoration;
            el_a.style.color = this.options.link;
            el_a.style.fontWeight = this.options.moreinfoFontWeight;

            if ('' !== this.options.moreinfoFontSize) {
                el_a.style.fontSize = this.options.moreinfoFontSize;
            }

            var el_x = el.getElementsByTagName('div')[0];
            el_x.style.cursor = 'pointer';

            function on(el, ev, fn) {
                var add = el.addEventListener ? 'addEventListener' : 'attachEvent',
                    pre = el.addEventListener ? '' : 'on';
                el[add](pre + ev, fn, false);
            }

            var self = this;
            on(el_x, 'click', function(){
                self.agree_and_close();
            });

            if (this.element_mask) {
                on(this.element_mask, 'click', function(){
                    self.agree_and_close();
                });
                doc.body.appendChild(this.element_mask);
            }

            // Agree and close banner on window scroll if `acceptOnScroll` option is set `true`
            if (this.options.acceptOnScroll) {
                on(window, 'scroll', function(){
                    self.agree_and_close();
                });
            }

            // Agree and close banner on click (no matter where) if `acceptOnClick` option is set `true`
            if (this.options.acceptOnClick) {
                on(window, 'click', function(){
                    self.agree_and_close();
                });
            }

            // Agree and close banner after N milliseconds
            if (this.options.acceptOnTimeout) {
                // Validate this.options.acceptOnTimeout as numeric
                if (!isNaN(parseFloat(this.options.acceptOnTimeout)) && isFinite(this.options.acceptOnTimeout)) {
                    setTimeout(function() { self.agree_and_close(); }, this.options.acceptOnTimeout);
                }
            }

            // Agree on first time the user visits a page (but do not close the cookiebanner window)
            if (this.options.acceptOnFirstVisit) {
                self.agree();
            }

            doc.body.appendChild(this.element);
            this.inserted = true;

            if ('fade' === this.options.effect) {
                this.element.style.opacity = 0;
                Utils.fade_in(this.element);
            } else {
                this.element.style.opacity = 1;
            }
        }
    };

    if (script_el_invoker) {
        if (!context[global_instance_name]) {
            context[global_instance_name] = new Cookiebanner();
        }
    }

})(window);
