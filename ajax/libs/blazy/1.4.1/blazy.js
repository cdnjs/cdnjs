
/*!
  hey, [be]Lazy.js - v1.4.1 - 2015.10.12
  A lazy loading and multi-serving image script
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;
(function(root, blazy) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register bLazy as an anonymous module
        define(blazy);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = blazy();
    } else {
        // Browser globals. Register bLazy on window
        root.Blazy = blazy();
    }
})(this, function() {
    'use strict';

    //private vars
    var source, viewport, isRetina;

    // constructor
    return function Blazy(options) {
        //IE7- fallback for missing querySelectorAll support
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(r, c, i, j, a) {
                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            };
        }

        //options and helper vars
        var scope = this;
        var util = scope._util = {};
        util.images = [];
        util.destroyed = true;
        scope.options = options || {};
        scope.options.error = scope.options.error || false;
        scope.options.offset = scope.options.offset || 100;
        scope.options.success = scope.options.success || false;
        scope.options.selector = scope.options.selector || '.b-lazy';
        scope.options.separator = scope.options.separator || '|';
        scope.options.container = scope.options.container ? document.querySelectorAll(scope.options.container) : false;
        scope.options.errorClass = scope.options.errorClass || 'b-error';
        scope.options.breakpoints = scope.options.breakpoints || false;
        scope.options.successClass = scope.options.successClass || 'b-loaded';
        scope.options.src = source = scope.options.src || 'data-src';
        isRetina = window.devicePixelRatio > 1;
        viewport = {};
        viewport.top = 0 - scope.options.offset;
        viewport.left = 0 - scope.options.offset;


        /* public functions
         ************************************/
        scope.revalidate = function() {
            initialize(this);
        };
        scope.load = function(element, force) {
            if (!isElementLoaded(element, this.options)) loadImage(element, force, this.options);
        };
        scope.destroy = function() {
            var self = this;
            var util = self._util;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    unbindEvent(object, 'scroll', util.validateT);
                });
            }
            unbindEvent(window, 'scroll', util.validateT);
            unbindEvent(window, 'resize', util.validateT);
            unbindEvent(window, 'resize', util.saveViewportOffsetT);
            util.count = 0;
            util.images.length = 0;
            util.destroyed = true;
        };

        //throttle, ensures that we don't call the functions too often
        util.validateT = throttle(function() {
            validate(scope);
        }, 25, scope);
        util.saveViewportOffsetT = throttle(function() {
            saveViewportOffset(scope.options.offset);
        }, 50, scope);
        saveViewportOffset(scope.options.offset);

        //handle multi-served image src
        each(scope.options.breakpoints, function(object) {
            if (object.width >= window.screen.width) {
                source = object.src;
                return false;
            }
        });

        // start lazy load
        initialize(scope);
    };


    /* Private helper functions
     ************************************/
    function initialize(self) {
        var util = self._util;
        // First we create an array of images to lazy load
        util.images = createImageArray(self.options.selector);
        util.count = util.images.length;
        // Then we bind resize and scroll events if not already binded
        if (util.destroyed) {
            util.destroyed = false;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    bindEvent(object, 'scroll', util.validateT);
                });
            }
            bindEvent(window, 'resize', util.saveViewportOffsetT);
            bindEvent(window, 'resize', util.validateT);
            bindEvent(window, 'scroll', util.validateT);
        }
        // And finally, we start to lazy load. Should bLazy ensure domready?
        validate(self);
    }

    function validate(self) {
        var util = self._util;
        for (var i = 0; i < util.count; i++) {
            var image = util.images[i];
            if (elementInView(image) || isElementLoaded(image, self.options)) {
                self.load(image);
                util.images.splice(i, 1);
                util.count--;
                i--;
            }
        }
        if (util.count === 0) {
            self.destroy();
        }
    }

    function elementInView(ele) {
        var rect = ele.getBoundingClientRect();
        return (
            // Intersection
            rect.right >= viewport.left && rect.bottom >= viewport.top && rect.left <= viewport.right && rect.top <= viewport.bottom
        );
    }

    function loadImage(ele, force, options) {
        // if element is visible or forced
        if (force || (ele.offsetWidth > 0 && ele.offsetHeight > 0)) {
            var dataSrc = ele.getAttribute(source) || ele.getAttribute(options.src); // fallback to default data-src
            if (dataSrc) {
                var dataSrcSplitted = dataSrc.split(options.separator);
                var src = dataSrcSplitted[isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
                var img = new Image();
                // cleanup markup, remove data source attributes
                each(options.breakpoints, function(object) {
                    ele.removeAttribute(object.src);
                });
                ele.removeAttribute(options.src);
                img.onerror = function() {
                    if (options.error) options.error(ele, "invalid");
                    ele.className = ele.className + ' ' + options.errorClass;
                };
                img.onload = function() {
                    // Is element an image or should we add the src as a background image?
                    ele.nodeName.toLowerCase() === 'img' ? ele.src = src : ele.style.backgroundImage = 'url("' + src + '")';
                    ele.className = ele.className + ' ' + options.successClass;
                    if (options.success) options.success(ele);
                };
                img.src = src; //preload image
            } else {
                if (options.error) options.error(ele, "missing");
                ele.className = ele.className + ' ' + options.errorClass;
            }
        }
    }

    function isElementLoaded(ele, options) {
        return (' ' + ele.className + ' ').indexOf(' ' + options.successClass + ' ') !== -1;
    }

    function createImageArray(selector) {
        return [].slice.call(document.querySelectorAll(selector));
    }

    function saveViewportOffset(offset) {
        viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
        viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
    }

    function bindEvent(ele, type, fn) {
        if (ele.attachEvent) {
            ele.attachEvent && ele.attachEvent('on' + type, fn);
        } else {
            ele.addEventListener(type, fn, false);
        }
    }

    function unbindEvent(ele, type, fn) {
        if (ele.detachEvent) {
            ele.detachEvent && ele.detachEvent('on' + type, fn);
        } else {
            ele.removeEventListener(type, fn, false);
        }
    }

    function each(object, fn) {
        if (object && fn) {
            var l = object.length;
            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
        }
    }

    function throttle(fn, minDelay, scope) {
        var lastCall = 0;
        return function() {
            var now = +new Date();
            if (now - lastCall < minDelay) {
                return;
            }
            lastCall = now;
            fn.apply(scope, arguments);
        };
    }
});
