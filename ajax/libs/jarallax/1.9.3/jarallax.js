/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.9.3
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
;(function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var supportTransform = function () {
    var prefixes = 'transform WebkitTransform MozTransform'.split(' ');
    var div = document.createElement('div');
    for (var i = 0; i < prefixes.length; i++) {
        if (div && div.style[prefixes[i]] !== undefined) {
            return prefixes[i];
        }
    }
    return false;
}();
var ua = navigator.userAgent;
var isAndroid = ua.toLowerCase().indexOf('android') > -1;
var isIOs = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

// requestAnimationFrame polyfill
var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 60);
};

// init events
function addEventListener(el, eventName, handler) {
    el.addEventListener(eventName, handler);
}

// Window data
var wndW = void 0;
var wndH = void 0;
var wndY = void 0;
var forceResizeParallax = false;
function updateWndVars(e) {
    wndW = window.innerWidth || document.documentElement.clientWidth;
    wndH = window.innerHeight || document.documentElement.clientHeight;
    if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && (e.type === 'load' || e.type === 'DOMContentLoaded')) {
        forceResizeParallax = true;
    }
}
updateWndVars();
addEventListener(window, 'resize', updateWndVars);
addEventListener(window, 'orientationchange', updateWndVars);
addEventListener(window, 'load', updateWndVars);
addEventListener(window, 'DOMContentLoaded', updateWndVars);

// list with all jarallax instances
// need to render all in one scroll/resize event
var jarallaxList = [];

// Animate if changed window size or scrolled page
var oldPageData = false;
function updateParallax() {
    if (!jarallaxList.length) {
        return;
    }

    if (window.pageYOffset !== undefined) {
        wndY = window.pageYOffset;
    } else {
        wndY = (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    var isResized = forceResizeParallax || !oldPageData || oldPageData.width !== wndW || oldPageData.height !== wndH;
    var isScrolled = isResized || !oldPageData || oldPageData.y !== wndY;

    forceResizeParallax = false;

    if (isResized || isScrolled) {
        jarallaxList.forEach(function (item) {
            if (isResized) {
                item.onResize();
            }
            if (isScrolled) {
                item.onScroll();
            }
        });

        oldPageData = {
            width: wndW,
            height: wndH,
            y: wndY
        };
    }

    rAF(updateParallax);
}

var instanceID = 0;

// Jarallax class

var Jarallax = function () {
    function Jarallax(item, userOptions) {
        _classCallCheck(this, Jarallax);

        var self = this;

        self.instanceID = instanceID++;

        self.$item = item;

        self.defaults = {
            type: 'scroll', // type of parallax: scroll, scale, opacity, scale-opacity, scroll-opacity
            speed: 0.5, // supported value from -1 to 2
            imgSrc: null,
            imgElement: '.jarallax-img',
            imgSize: 'cover',
            imgPosition: '50% 50%',
            imgRepeat: 'no-repeat', // supported only for background, not for <img> tag
            keepImg: false, // keep <img> tag in it's default place
            elementInViewport: null,
            zIndex: -100,
            noAndroid: false,
            noIos: false,

            // video
            videoSrc: null,
            videoStartTime: 0,
            videoEndTime: 0,
            videoVolume: 0,
            videoPlayOnlyVisible: true,

            // events
            onScroll: null, // function(calculations) {}
            onInit: null, // function() {}
            onDestroy: null, // function() {}
            onCoverImage: null // function() {}
        };

        // DEPRECATED: old data-options
        var deprecatedDataAttribute = self.$item.getAttribute('data-jarallax');
        var oldDataOptions = JSON.parse(deprecatedDataAttribute || '{}');
        if (deprecatedDataAttribute) {
            console.warn('Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53');
        }

        // prepare data-options
        var dataOptions = self.$item.dataset || {};
        var pureDataOptions = {};
        Object.keys(dataOptions).forEach(function (key) {
            var loweCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
            if (loweCaseOption && typeof self.defaults[loweCaseOption] !== 'undefined') {
                pureDataOptions[loweCaseOption] = dataOptions[key];
            }
        });

        self.options = self.extend({}, self.defaults, oldDataOptions, pureDataOptions, userOptions);
        self.pureOptions = self.extend({}, self.options);

        // prepare 'true' and 'false' strings to boolean
        Object.keys(self.options).forEach(function (key) {
            if (self.options[key] === 'true') {
                self.options[key] = true;
            } else if (self.options[key] === 'false') {
                self.options[key] = false;
            }
        });

        // fix speed option [-1.0, 2.0]
        self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)));

        // custom element to check if parallax in viewport
        var elementInVP = self.options.elementInViewport;
        // get first item from array
        if (elementInVP && (typeof elementInVP === 'undefined' ? 'undefined' : _typeof(elementInVP)) === 'object' && typeof elementInVP.length !== 'undefined') {
            elementInVP = elementInVP[0];
        }
        // check if dom element
        if (!(elementInVP instanceof Element)) {
            elementInVP = null;
        }
        self.options.elementInViewport = elementInVP;

        self.image = {
            src: self.options.imgSrc || null,
            $container: null,
            useImgTag: false,

            // position fixed is needed for the most of browsers because absolute position have glitches
            // on MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
            // on mobile devices better scrolled with absolute position
            position: isAndroid || isIOs ? 'absolute' : 'fixed'
        };

        if (self.initImg() && self.canInitParallax()) {
            self.init();
        }
    }

    // add styles to element


    _createClass(Jarallax, [{
        key: 'css',
        value: function css(el, styles) {
            if (typeof styles === 'string') {
                return window.getComputedStyle(el).getPropertyValue(styles);
            }

            // add transform property with vendor prefix
            if (styles.transform && supportTransform) {
                styles[supportTransform] = styles.transform;
            }

            Object.keys(styles).forEach(function (key) {
                el.style[key] = styles[key];
            });
            return el;
        }

        // Extend like jQuery.extend

    }, {
        key: 'extend',
        value: function extend(out) {
            var _arguments = arguments;

            out = out || {};
            Object.keys(arguments).forEach(function (i) {
                if (!_arguments[i]) {
                    return;
                }
                Object.keys(_arguments[i]).forEach(function (key) {
                    out[key] = _arguments[i][key];
                });
            });
            return out;
        }

        // get window size and scroll position. Useful for extensions

    }, {
        key: 'getWindowData',
        value: function getWindowData() {
            return {
                width: wndW,
                height: wndH,
                y: wndY
            };
        }

        // Jarallax functions

    }, {
        key: 'initImg',
        value: function initImg() {
            var self = this;

            // find image element
            var $imgElement = self.options.imgElement;
            if ($imgElement && typeof $imgElement === 'string') {
                $imgElement = self.$item.querySelector($imgElement);
            }
            // check if dom element
            if (!($imgElement instanceof Element)) {
                $imgElement = null;
            }

            if ($imgElement) {
                if (self.options.keepImg) {
                    self.image.$item = $imgElement.cloneNode(true);
                } else {
                    self.image.$item = $imgElement;
                    self.image.$itemParent = $imgElement.parentNode;
                }
                self.image.useImgTag = true;
            }

            // true if there is img tag
            if (self.image.$item) {
                return true;
            }

            // get image src
            if (self.image.src === null) {
                self.image.src = self.css(self.$item, 'background-image').replace(/^url\(['"]?/g, '').replace(/['"]?\)$/g, '');
            }
            return !(!self.image.src || self.image.src === 'none');
        }
    }, {
        key: 'canInitParallax',
        value: function canInitParallax() {
            return supportTransform && !(isAndroid && this.options.noAndroid) && !(isIOs && this.options.noIos);
        }
    }, {
        key: 'init',
        value: function init() {
            var self = this;
            var containerStyles = {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none'
            };
            var imageStyles = {};

            if (!self.options.keepImg) {
                // save default user styles
                var curStyle = self.$item.getAttribute('style');
                if (curStyle) {
                    self.$item.setAttribute('data-jarallax-original-styles', curStyle);
                }
                if (self.image.useImgTag) {
                    var curImgStyle = self.image.$item.getAttribute('style');
                    if (curImgStyle) {
                        self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
                    }
                }
            }

            // set relative position and z-index to the parent
            if (self.css(self.$item, 'position') === 'static') {
                self.css(self.$item, {
                    position: 'relative'
                });
            }
            if (self.css(self.$item, 'z-index') === 'auto') {
                self.css(self.$item, {
                    zIndex: 0
                });
            }

            // container for parallax image
            self.image.$container = document.createElement('div');
            self.css(self.image.$container, containerStyles);
            self.css(self.image.$container, {
                'z-index': self.options.zIndex
            });
            self.image.$container.setAttribute('id', 'jarallax-container-' + self.instanceID);
            self.$item.appendChild(self.image.$container);

            // use img tag
            if (self.image.useImgTag) {
                imageStyles = self.extend({
                    'object-fit': self.options.imgSize,
                    'object-position': self.options.imgPosition,
                    // support for plugin https://github.com/bfred-it/object-fit-images
                    'font-family': 'object-fit: ' + self.options.imgSize + '; object-position: ' + self.options.imgPosition + ';',
                    'max-width': 'none'
                }, containerStyles, imageStyles);

                // use div with background image
            } else {
                self.image.$item = document.createElement('div');
                imageStyles = self.extend({
                    'background-position': self.options.imgPosition,
                    'background-size': self.options.imgSize,
                    'background-repeat': self.options.imgRepeat,
                    'background-image': 'url("' + self.image.src + '")'
                }, containerStyles, imageStyles);
            }

            if (self.options.type === 'opacity' || self.options.type === 'scale' || self.options.type === 'scale-opacity' || self.options.speed === 1) {
                self.image.position = 'absolute';
            }

            // check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
            // discussion - https://github.com/nk-o/jarallax/issues/9
            if (self.image.position === 'fixed') {
                var parentWithTransform = 0;
                var $itemParents = self.$item;
                while ($itemParents !== null && $itemParents !== document && parentWithTransform === 0) {
                    var parentTransform = self.css($itemParents, '-webkit-transform') || self.css($itemParents, '-moz-transform') || self.css($itemParents, 'transform');
                    if (parentTransform && parentTransform !== 'none') {
                        parentWithTransform = 1;
                        self.image.position = 'absolute';
                    }
                    $itemParents = $itemParents.parentNode;
                }
            }

            // add position to parallax block
            imageStyles.position = self.image.position;

            // insert parallax image
            self.css(self.image.$item, imageStyles);
            self.image.$container.appendChild(self.image.$item);

            // set initial position and size
            self.coverImage();
            self.clipContainer();
            self.onScroll(true);

            // call onInit event
            if (self.options.onInit) {
                self.options.onInit.call(self);
            }

            // remove default user background
            if (self.css(self.$item, 'background-image') !== 'none') {
                self.css(self.$item, {
                    'background-image': 'none'
                });
            }

            self.addToParallaxList();
        }

        // add to parallax instances list

    }, {
        key: 'addToParallaxList',
        value: function addToParallaxList() {
            jarallaxList.push(this);

            if (jarallaxList.length === 1) {
                updateParallax();
            }
        }

        // remove from parallax instances list

    }, {
        key: 'removeFromParallaxList',
        value: function removeFromParallaxList() {
            var self = this;

            jarallaxList.forEach(function (item, key) {
                if (item.instanceID === self.instanceID) {
                    jarallaxList.splice(key, 1);
                }
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var self = this;

            self.removeFromParallaxList();

            // return styles on container as before jarallax init
            var originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
            self.$item.removeAttribute('data-jarallax-original-styles');
            // null occurs if there is no style tag before jarallax init
            if (!originalStylesTag) {
                self.$item.removeAttribute('style');
            } else {
                self.$item.setAttribute('style', originalStylesTag);
            }

            if (self.image.useImgTag) {
                // return styles on img tag as before jarallax init
                var originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
                self.image.$item.removeAttribute('data-jarallax-original-styles');
                // null occurs if there is no style tag before jarallax init
                if (!originalStylesImgTag) {
                    self.image.$item.removeAttribute('style');
                } else {
                    self.image.$item.setAttribute('style', originalStylesTag);
                }

                // move img tag to its default position
                if (self.image.$itemParent) {
                    self.image.$itemParent.appendChild(self.image.$item);
                }
            }

            // remove additional dom elements
            if (self.$clipStyles) {
                self.$clipStyles.parentNode.removeChild(self.$clipStyles);
            }
            if (self.image.$container) {
                self.image.$container.parentNode.removeChild(self.image.$container);
            }

            // call onDestroy event
            if (self.options.onDestroy) {
                self.options.onDestroy.call(self);
            }

            // delete jarallax from item
            delete self.$item.jarallax;
        }

        // it will remove some image overlapping
        // overlapping occur due to an image position fixed inside absolute position element

    }, {
        key: 'clipContainer',
        value: function clipContainer() {
            // needed only when background in fixed position
            if (this.image.position !== 'fixed') {
                return;
            }

            var self = this;
            var rect = self.image.$container.getBoundingClientRect();
            var width = rect.width;
            var height = rect.height;

            if (!self.$clipStyles) {
                self.$clipStyles = document.createElement('style');
                self.$clipStyles.setAttribute('type', 'text/css');
                self.$clipStyles.setAttribute('id', 'jarallax-clip-' + self.instanceID);
                var head = document.head || document.getElementsByTagName('head')[0];
                head.appendChild(self.$clipStyles);
            }

            var styles = '#jarallax-container-' + self.instanceID + ' {\n           clip: rect(0 ' + width + 'px ' + height + 'px 0);\n           clip: rect(0, ' + width + 'px, ' + height + 'px, 0);\n        }';

            // add clip styles inline (this method need for support IE8 and less browsers)
            if (self.$clipStyles.styleSheet) {
                self.$clipStyles.styleSheet.cssText = styles;
            } else {
                self.$clipStyles.innerHTML = styles;
            }
        }
    }, {
        key: 'coverImage',
        value: function coverImage() {
            var self = this;

            var rect = self.image.$container.getBoundingClientRect();
            var contH = rect.height;
            var speed = self.options.speed;
            var isScroll = self.options.type === 'scroll' || self.options.type === 'scroll-opacity';
            var scrollDist = 0;
            var resultH = contH;
            var resultMT = 0;

            // scroll parallax
            if (isScroll) {
                // scroll distance and height for image
                if (speed < 0) {
                    scrollDist = speed * Math.max(contH, wndH);
                } else {
                    scrollDist = speed * (contH + wndH);
                }

                // size for scroll parallax
                if (speed > 1) {
                    resultH = Math.abs(scrollDist - wndH);
                } else if (speed < 0) {
                    resultH = scrollDist / speed + Math.abs(scrollDist);
                } else {
                    resultH += Math.abs(wndH - contH) * (1 - speed);
                }

                scrollDist /= 2;
            }

            // store scroll distance
            self.parallaxScrollDistance = scrollDist;

            // vertical center
            if (isScroll) {
                resultMT = (wndH - resultH) / 2;
            } else {
                resultMT = (contH - resultH) / 2;
            }

            // apply result to item
            self.css(self.image.$item, {
                height: resultH + 'px',
                marginTop: resultMT + 'px',
                left: self.image.position === 'fixed' ? rect.left + 'px' : '0',
                width: rect.width + 'px'
            });

            // call onCoverImage event
            if (self.options.onCoverImage) {
                self.options.onCoverImage.call(self);
            }

            // return some useful data. Used in the video cover function
            return {
                image: {
                    height: resultH,
                    marginTop: resultMT
                },
                container: rect
            };
        }
    }, {
        key: 'isVisible',
        value: function isVisible() {
            return this.isElementInViewport || false;
        }
    }, {
        key: 'onScroll',
        value: function onScroll(force) {
            var self = this;

            var rect = self.$item.getBoundingClientRect();
            var contT = rect.top;
            var contH = rect.height;
            var styles = {};

            // check if in viewport
            var viewportRect = rect;
            if (self.options.elementInViewport) {
                viewportRect = self.options.elementInViewport.getBoundingClientRect();
            }
            self.isElementInViewport = viewportRect.bottom >= 0 && viewportRect.right >= 0 && viewportRect.top <= wndH && viewportRect.left <= wndW;

            // stop calculations if item is not in viewport
            if (force ? false : !self.isElementInViewport) {
                return;
            }

            // calculate parallax helping variables
            var beforeTop = Math.max(0, contT);
            var beforeTopEnd = Math.max(0, contH + contT);
            var afterTop = Math.max(0, -contT);
            var beforeBottom = Math.max(0, contT + contH - wndH);
            var beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
            var afterBottom = Math.max(0, -contT + wndH - contH);
            var fromViewportCenter = 1 - 2 * (wndH - contT) / (wndH + contH);

            // calculate on how percent of section is visible
            var visiblePercent = 1;
            if (contH < wndH) {
                visiblePercent = 1 - (afterTop || beforeBottom) / contH;
            } else if (beforeTopEnd <= wndH) {
                visiblePercent = beforeTopEnd / wndH;
            } else if (beforeBottomEnd <= wndH) {
                visiblePercent = beforeBottomEnd / wndH;
            }

            // opacity
            if (self.options.type === 'opacity' || self.options.type === 'scale-opacity' || self.options.type === 'scroll-opacity') {
                styles.transform = 'translate3d(0,0,0)';
                styles.opacity = visiblePercent;
            }

            // scale
            if (self.options.type === 'scale' || self.options.type === 'scale-opacity') {
                var scale = 1;
                if (self.options.speed < 0) {
                    scale -= self.options.speed * visiblePercent;
                } else {
                    scale += self.options.speed * (1 - visiblePercent);
                }
                styles.transform = 'scale(' + scale + ') translate3d(0,0,0)';
            }

            // scroll
            if (self.options.type === 'scroll' || self.options.type === 'scroll-opacity') {
                var positionY = self.parallaxScrollDistance * fromViewportCenter;

                // fix if parallax block in absolute position
                if (self.image.position === 'absolute') {
                    positionY -= contT;
                }

                styles.transform = 'translate3d(0,' + positionY + 'px,0)';
            }

            self.css(self.image.$item, styles);

            // call onScroll event
            if (self.options.onScroll) {
                self.options.onScroll.call(self, {
                    section: rect,

                    beforeTop: beforeTop,
                    beforeTopEnd: beforeTopEnd,
                    afterTop: afterTop,
                    beforeBottom: beforeBottom,
                    beforeBottomEnd: beforeBottomEnd,
                    afterBottom: afterBottom,

                    visiblePercent: visiblePercent,
                    fromViewportCenter: fromViewportCenter
                });
            }
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.coverImage();
            this.clipContainer();
        }
    }]);

    return Jarallax;
}();

// global definition


var plugin = function plugin(items) {
    // check for dom element
    // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? items instanceof HTMLElement : items && (typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null && items.nodeType === 1 && typeof items.nodeName === 'string') {
        items = [items];
    }

    var options = arguments[1];
    var args = Array.prototype.slice.call(arguments, 2);
    var len = items.length;
    var k = 0;
    var ret = void 0;

    for (k; k < len; k++) {
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' || typeof options === 'undefined') {
            if (!items[k].jarallax) {
                items[k].jarallax = new Jarallax(items[k], options);
            }
        } else if (items[k].jarallax) {
            // eslint-disable-next-line prefer-spread
            ret = items[k].jarallax[options].apply(items[k].jarallax, args);
        }
        if (typeof ret !== 'undefined') {
            return ret;
        }
    }

    return items;
};
plugin.constructor = Jarallax;

// no conflict
var oldPlugin = window.jarallax;
window.jarallax = plugin;
window.jarallax.noConflict = function () {
    window.jarallax = oldPlugin;
    return this;
};

// jQuery support
if (typeof jQuery !== 'undefined') {
    var jQueryPlugin = function jQueryPlugin() {
        var args = arguments || [];
        Array.prototype.unshift.call(args, this);
        var res = plugin.apply(window, args);
        return (typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object' ? res : this;
    };
    jQueryPlugin.constructor = Jarallax;

    // no conflict
    var oldJqPlugin = jQuery.fn.jarallax;
    jQuery.fn.jarallax = jQueryPlugin;
    jQuery.fn.jarallax.noConflict = function () {
        jQuery.fn.jarallax = oldJqPlugin;
        return this;
    };
}

// data-jarallax initialization
addEventListener(window, 'DOMContentLoaded', function () {
    plugin(document.querySelectorAll('[data-jarallax]'));
});
}());
