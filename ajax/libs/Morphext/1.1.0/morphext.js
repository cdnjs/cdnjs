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

            $.each(this.element.text().split(this.settings.separator), function (key, value) {
                $that.phrases.push(value);
            });

            this.current = this.phrases[0];

            this.animate();

            setInterval(function () {
                $that.animate();
            }, this.settings.speed);
        },
        animate: function () {
            this._reset();

            if (typeof this.next !== "undefined" && this.next !== null)
                this.current = this.next;

            this.index = $.inArray(this.current, this.phrases);
            if ((this.index + 1) == this.phrases.length) // Loop
                this.index = -1;

            this.next = this.phrases[this.index + 1];

            $("<span class='animated " + this.settings.animation + "'>" + this.current + "</span>")
                .appendTo(this.element);
        },
        _reset: function () {
            this.element.html('');
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