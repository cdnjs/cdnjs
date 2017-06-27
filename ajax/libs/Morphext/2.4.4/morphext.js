/*!
 * Morphext - Text Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphext
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2014 Ian Lai and other contributors
 * Released under the MIT license
 * http://ian.mit-license.org/
 */

/*eslint-env browser */
/*global jQuery:false */
/*eslint-disable no-underscore-dangle */

(function ($) {
    "use strict";

    var pluginName = "Morphext",
        defaults = {
            animation: "bounceIn",
            separator: ",",
            speed: 2000,
            complete: $.noop
        };

    function Plugin (element, options) {
        this.element = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var $that = this;
            this.phrases = [];

            this.element.addClass("morphext");

            $.each(this.element.text().split(this.settings.separator), function (key, value) {
                $that.phrases.push($.trim(value));
            });

            this.index = -1;
            this.animate();
            this.start();
        },
        animate: function () {
            this.index = ++this.index % this.phrases.length;
            this.element[0].innerHTML = "<span class=\"animated " + this.settings.animation + "\">" + this.phrases[this.index] + "</span>";

            if ($.isFunction(this.settings.complete)) {
                this.settings.complete.call(this);
            }
        },
        start: function () {
            var $that = this;
            this._interval = setInterval(function () {
                $that.animate();
            }, this.settings.speed);
        },
        stop: function () {
            this._interval = clearInterval(this._interval);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery);
