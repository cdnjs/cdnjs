/*!
 * Morphext v2.0.0 - Text Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphext
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2013 Ian Lai and other contributors
 * Released under the MIT license
 * http://ian.mit-license.org/
 */
;(function ($, window, document, undefined) {
    var pluginName = "Morphext",
        defaults = {
            animation: "bounceIn",
            separator: ",",
            speed: 2000
        };

    function Plugin (element, options) {
        this.element = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $that = this;
            this.phrases = [];

            this.element.addClass('morphext');

            $.each(this.element.text().split(this.settings.separator), function (key, value) {
                $that.phrases.push(value);
            });

            this.element.html("<span>" + this.phrases.join('</span><span>') + "</span>");

            this.index = -1;
            this.animate();

            setInterval(function () {
                $that.animate();
            }, this.settings.speed);
        },
        animate: function () {
            if ((this.index + 1) === this.phrases.length)
                this.index = -1;

            ++this.index;

            this.element.find('span').removeClass().eq(this.index).addClass('animated ' + this.settings.animation);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);