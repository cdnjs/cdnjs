/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 0.0.2
 * Author  : _nK http://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    // Jarallax instance
    var Jarallax = (function() {
        var instanceID = 0;

        function Jarallax(item, userOptions) {
            var _this = this,
                dataOptions;

            _this.$item      = $(item);

            _this.defaults   = {
                speed             : 0.5,
                src               : null,
                enableTransform   : true,
                forceAcceleration : false
            };
            dataOptions      = _this.$item.data('jarallax') || {};
            _this.options    = $.extend({}, _this.defaults, dataOptions, userOptions);

            _this.instanceID = instanceID++;

            _this.image      = {
                src        : _this.options.src || _this.$item.attr('data-jarallax-src') || null,
                $container : null,
                $item      : null,
                width      : null,
                height     : null,
                ready      : false
            }

            _this.initEvents();

            _this.init();
        }

        return Jarallax;
    }());

    Jarallax.prototype.init = function() {
        var _this = this;

        // get image src
        if(_this.image.src == null) {
            _this.image.src = _this.$item.css('background-image').replace(/^url\(['"]?/g,'').replace(/['"]?\)$/g,'');
        }
        if(!_this.image.src) {
            return;
        }

        // add force acceleration
        if(_this.options.forceAcceleration) {
            _this.forceAcceleration();
        }

        // container for parallax image
        _this.image.$container = $('<div>')
            .css({
                position         : 'absolute',
                top              : 0,
                left             : 0,
                width            : '100%',
                height           : '100%',
                overflow         : 'hidden',
                'pointer-events' : 'none',
                'transition'     : 'transform linear -1ms, -webkit-transform linear -1ms'
            })
            .prependTo(_this.$item);

        // item with background image (this will be moved to create parallax effect)
        _this.image.$item = _this.image.$container.clone()
            .css({
                'pointer-events'      : 'none',
                'background-position' : '50% 50%',
                'background-repeat'   : 'no-repeat no-repeat',
                'background-image'    : 'url(' + _this.image.src + ')'
            })
            .addClass('jarallax-container')
            .prependTo(_this.image.$container);

        // insert to item
        _this.image.$container
            .css({
                visibility : 'hidden',
                'z-index'  : -100
            })
            .addClass('jarallax-container')
            .prependTo(_this.$item)

        // cover image and init parallax position after image load
        _this.getImageSize(_this.image.src, function(width, height) {
            _this.image.ready  = true;
            _this.image.width  = width;
            _this.image.height = height;

            window.requestAnimationFrame($.proxy(_this.coverImage, _this));
            window.requestAnimationFrame($.proxy(_this.onScroll, _this));

            // remove default user background
            _this.$item.data('JarallaxOriginalStyles', _this.$item.attr('style'));

            // timeout to fix IE blinking
            setTimeout(function() {
                _this.$item.css({
                    'background-image'      : 'none',
                    'background-attachment' : 'scroll',
                    'background-size'       : 'auto'
                });
            }, 0);
        });
    };

    Jarallax.prototype.initEvents = function() {
        var _this = this;

        $(window).on('scroll.jarallax.jarallax-' + _this.instanceID, function() {
            window.requestAnimationFrame($.proxy(_this.onScroll, _this));
        });

        var timeout;
        $(window).on('resize.jarallax.jarallax-' + _this.instanceID + ' load.jarallax.jarallax-' + _this.instanceID + '', function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                window.requestAnimationFrame(function() {
                    _this.coverImage();
                    _this.onScroll();
                });
            }, 100);
        });
    }

    Jarallax.prototype.destroy = function() {
        var _this = this;

        // destroy force acceleration
        if(_this.options.forceAcceleration) {
            _this.forceAcceleration(true);
        }

        $(window).off('.jarallax-' + _this.instanceID);

        _this.$item.attr('style', _this.$item.data('JarallaxOriginalStyles'));
        _this.$item.removeData('JarallaxOriginalStyles');

        _this.image.$container.remove();

        delete _this.$item[0].jarallax;
    }

    Jarallax.prototype.getImageSize = function(src, callback) {
        if(!src || !callback) {
            return false;
        }

        var tempImg = new Image();
        tempImg.onload = function() {
            callback(tempImg.width, tempImg.height)
        }
        tempImg.src = src;
    }

    Jarallax.prototype.coverImage = function() {
        var _this = this;

        if(!_this.image.ready) {
            return;
        }

        var contW = _this.image.$container.outerWidth(true),
            contH = _this.image.$container.outerHeight(true),
            wndW  = $(window).outerWidth(true),
            whdH  = $(window).outerHeight(true),
            imgW  = _this.image.width,
            imgH  = _this.image.height;

        var css = {
            width  : Math.max(wndW, contW) * Math.max(_this.options.speed, 1),
            height : Math.max(whdH, contH) * Math.max(_this.options.speed, 1)
        };

        // cover by width
        if(css.width / css.height > imgW / imgH) {
            var h = css.width * imgH / imgW;
            css.backgroundSize = css.width + 'px ' + h + 'px';
        }

        // cover by height
        else {
            var w = css.height * imgW / imgH;
            css.backgroundSize = w + 'px ' + css.height + 'px';
        }

        _this.image.$item.css(css);
    };

    Jarallax.prototype.onScroll = function() {
        var _this = this;

        if(!_this.image.ready) {
            return;
        }

        var scrollTop     = $(window).scrollTop(),
            wndHeight     = $(window).height(),
            // starting position of each element to have parallax applied to it
            sectionTop    = _this.$item.offset().top,
            sectionHeight = _this.$item.outerHeight(true),
            css           = {
                visibility         : 'visible',
                backgroundPosition : '50% 50%'
            };

        // Check if totally above or totally below viewport
        if (sectionTop + sectionHeight < scrollTop || sectionTop > scrollTop + wndHeight) {
            return;
        }

        // calculate parallax
        var position = (scrollTop - sectionTop) * _this.options.speed;

        if(supportTransform && _this.options.enableTransform) {
            css.transform = 'translateY(' + position + 'px)';
            if(support3dtransform) {
                css.transform = 'translate3d(0, ' + position + 'px, 0)';
            }
        } else {
            css.backgroundPosition = '50% ' + Math.round(position) + 'px';
        }

        _this.image.$item.css(css);
    }

    Jarallax.prototype.forceAcceleration = function(destroy) {
        var _this = this;

        if(!_this.options.forceAcceleration) {
            return false;
        }

        var $styles = $('head #jarallax-force-acceleration');

        // add translate3d for <html> tag
        // prevent lags in some browsers
        if(!destroy) {
            if(!$styles.length) {
                $('head').append([
                    '<style type="text/css" id="jarallax-force-acceleration" data-jarallax-IDs="">',
                    '  html {',
                    '     -webkit-transform: translate3d(0,0,0);',
                    '     -moz-transform: translate3d(0,0,0);',
                    '     -ms-transform: translate3d(0,0,0);',
                    '     -o-transform: translate3d(0,0,0);',
                    '     transform: translate3d(0,0,0);',
                    '  }',
                    '</style>'
                ].join('\n'));
                $styles = $('head #jarallax-force-acceleration');
            }

            $styles.attr('data-jarallax-IDs', $styles.attr('data-jarallax-IDs') + _this.instanceID + ',');
        }

        // destroy
        else {
            var newDataAttr = $styles.attr('data-jarallax-IDs').replace(_this.instanceID + ',', '');

            if(newDataAttr == '' || newDataAttr == ' ') {
                $styles.remove();
            } else {
                $styles.attr('data-jarallax-IDs', newDataAttr);
            }
        }
    }

    $.fn.jarallax = function() {
        var items = this,
            options = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            len = items.length,
            k = 0,
            ret;

        for (k; k < len; k++) {
            if (typeof options === 'object' || typeof options === 'undefined')
                items[k].jarallax = new Jarallax(items[k], options);
            else
                ret = items[k].jarallax[options].apply(items[k].jarallax, args);
            if (typeof ret !== 'undefined') return ret;
        }

        return this;
    };

    /* test features support */
    var supportTransform = (function() {
        var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
        var div = document.createElement('div');
        for(var i = 0; i < prefixes.length; i++) {
            if(div && div.style[prefixes[i]] !== undefined) {
                return prefixes[i];
            }
        }
        return false;
    }());

    var support3dtransform = (function() {
        if (!window.getComputedStyle) {
            return false;
        }

        var el = document.createElement('p'), 
            has3d,
            transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }());
}));


// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };
if(!window.requestAnimationFrame)
    (function() {
        'use strict';
        
        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
            window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                       || window[vp+'CancelRequestAnimationFrame']);
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
            || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() { callback(lastTime = nextTime); },
                                  nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    }());