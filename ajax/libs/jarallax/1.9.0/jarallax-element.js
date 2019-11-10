;(function() {
'use strict';

/*!
 * Name    : Elements Extension for Jarallax
 * Version : 1.0.0
 * Author  : nK http://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
(function () {
    if (typeof jarallax === 'undefined') {
        return;
    }

    // init events
    function addEventListener(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function () {
                handler.call(el);
            });
        }
    }

    var Jarallax = jarallax.constructor;

    // redefine default methods
    ['initImg', 'canInitParallax', 'init', 'destroy', 'clipContainer', 'coverImage', 'isVisible', 'onScroll', 'onResize'].forEach(function (key) {
        var def = Jarallax.prototype[key];
        Jarallax.prototype[key] = function () {
            var _this = this;
            var args = arguments || [];

            if (key === 'initImg' && _this.$item.getAttribute('data-jarallax-element') !== null) {
                _this.options.type = 'element';
                _this.pureOptions.speed = _this.$item.getAttribute('data-jarallax-element') || _this.pureOptions.speed;
            }
            if (_this.options.type !== 'element') {
                return def.apply(_this, args);
            }

            switch (key) {
                case 'init':
                    _this.options.speed = parseFloat(_this.pureOptions.speed) || 0;
                    _this.onResize();
                    _this.onScroll();
                    _this.addToParallaxList();
                    break;
                case 'onResize':
                    var defTransform = _this.css(_this.$item, 'transform');
                    _this.css(_this.$item, { transform: '' });
                    var rect = _this.$item.getBoundingClientRect();
                    _this.itemData = {
                        width: rect.width,
                        height: rect.height,
                        y: rect.top + _this.getWindowData().y,
                        x: rect.left
                    };
                    _this.css(_this.$item, { transform: defTransform });
                    break;
                case 'onScroll':
                    var wnd = _this.getWindowData();
                    var centerPercent = (wnd.y + wnd.height / 2 - _this.itemData.y) / (wnd.height / 2);
                    var move = centerPercent * _this.options.speed;
                    _this.css(_this.$item, { transform: 'translateY(' + move + 'px)' });
                    break;
                case 'initImg':
                case 'isVisible':
                case 'clipContainer':
                case 'coverImage':
                    return true;
                default:
                    return def.apply(_this, args);
            }
        };
    });

    // data-jarallax-element initialization
    addEventListener(window, 'DOMContentLoaded', function () {
        jarallax(document.querySelectorAll('[data-jarallax-element]'));
    });
})();
}());
