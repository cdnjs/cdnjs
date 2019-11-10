/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.0.0
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
    // Adapted from https://gist.github.com/paulirish/1579671
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
        (document.body || document.documentElement).insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        (document.body || document.documentElement).removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }());


    // Jarallax instance
    var Jarallax = (function() {
        var instanceID = 0;

        function Jarallax(item, userOptions) {
            var _this = this,
                dataOptions;

            _this.$item      = $(item);

            _this.defaults   = {
                speed             : 0.5,
                imgSrc            : null,
                imgWidth          : null,
                imgHeight         : null,
                enableTransform   : true,
                zIndex            : -100
            };
            dataOptions      = _this.$item.data('jarallax') || {};
            _this.options    = $.extend({}, _this.defaults, dataOptions, userOptions);

            _this.instanceID = instanceID++;

            _this.image      = {
                src        : _this.options.imgSrc || null,
                $container : null,
                $item      : null,
                width      : _this.options.imgWidth || null,
                height     : _this.options.imgHeight || null
            }

            if(_this.initImg()) {
                _this.initEvents();

                _this.init();
            }
        }

        return Jarallax;
    }());

    Jarallax.prototype.initImg = function() {
        var _this = this;

        // get image src
        if(_this.image.src === null) {
            _this.image.src = _this.$item.css('background-image').replace(/^url\(['"]?/g,'').replace(/['"]?\)$/g,'');
        }
        if(!_this.image.src || _this.image.src === 'none') {
            return false;
        }
        return true;
    }

    Jarallax.prototype.init = function() {
        var _this = this;

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
                position              : 'fixed',
                'pointer-events'      : 'none',
                'background-position' : '50% 50%',
                'background-repeat'   : 'no-repeat no-repeat',
                'background-image'    : 'url(' + _this.image.src + ')'
            })
            .prependTo(_this.image.$container);

        // insert to item
        _this.image.$container
            .css({
                visibility : 'hidden',
                'z-index'  : _this.options.zIndex
            })
            .attr('id', 'jarallax-container-' + _this.instanceID)
            .prependTo(_this.$item)

        // cover image and init parallax position after image load
        _this.getImageSize(_this.image.src, function(width, height) {
            _this.image.width  = width;
            _this.image.height = height;

            window.requestAnimationFrame($.proxy(_this.coverImage, _this));
            window.requestAnimationFrame($.proxy(_this.clipContainer, _this));
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
                    _this.clipContainer();
                    _this.onScroll();
                });
            }, 100);
        });
    }

    Jarallax.prototype.destroy = function() {
        var _this = this;

        // remove additional styles for clip
        $('head #jarallax-clip-' + _this.instanceID).remove();

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

    // it will remove some image overlapping
    // overlapping occur due to an image position fixed inside absolute possition element (webkit based browsers works without any fix)
    Jarallax.prototype.clipContainer = function() {
        var _this  = this,
            width  = _this.image.$container.outerWidth(true),
            height = _this.image.$container.outerHeight(true);

        var $styles = $('head #jarallax-clip-' + _this.instanceID);
        if(!$styles.length) {
            $('head').append('<style type="text/css" id="jarallax-clip-' + _this.instanceID + '"></style>');
            $styles = $('head #jarallax-clip-' + _this.instanceID);
        }

        var css = [
            '#jarallax-container-' + _this.instanceID + ' {',
            '   clip: rect(0px ' + width + 'px ' + height + 'px 0);',
            '   clip: rect(0px, ' + width + 'px, ' + height + 'px, 0);',
            '}'
        ].join('\n');

        // add clip styles inline (this method need for support IE8 and less browsers)
        if ($styles[0].styleSheet) {
            $styles[0].styleSheet.cssText = css;
        } else {
            $styles.html(css);
        }
    }

    Jarallax.prototype.coverImage = function() {
        var _this = this;

        if(!_this.image.width || !_this.image.height) {
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

        if(!_this.image.width || !_this.image.height) {
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
        var position = - (scrollTop - sectionTop) * _this.options.speed;

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

    var oldJarallax = $.fn.jarallax;

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

    // no conflict
    $.fn.jarallax.noConflict = function () {
        $.fn.jarallax = oldJarallax;
        return this;
    };

    // data-jarallax initialization
    $(document).on('ready.data-jarallax', function () {
        $('[data-jarallax]').jarallax();
    });
}));