/*!
 * bootstrap-progressbar v0.6.0 by @minddust
 * Copyright (c) 2012-2013 Stephan Gross
 *
 * https://www.minddust.com/bootstrap-progressbar
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function($) {

    'use strict';

    // PROGRESSBAR CLASS DEFINITION
    // ============================

    var Progressbar = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Progressbar.defaults, options);
    };

    Progressbar.defaults = {
        transition_delay: 300,
        refresh_speed: 50,
        display_text: 'none',
        use_percentage: true,
        percent_format: function(percent) { return percent + '%'; },
        amount_format: function(amount_part, amount_total) { return amount_part + ' / ' + amount_total; },
        update: $.noop,
        done: $.noop,
        fail: $.noop
    };

    Progressbar.prototype.transition = function() {
        var $this = this.$element;
        var $parent = $this.parent();
        var $back_text = this.$back_text;
        var $front_text = this.$front_text;
        var options = this.options;
        var aria_valuetransitiongoal = $this.attr('aria-valuetransitiongoal');
        var aria_valuemin = $this.attr('aria-valuemin') || 0;
        var aria_valuemax = $this.attr('aria-valuemax') || 100;
        var is_vertical = $parent.hasClass('vertical');
        var update = options.update && typeof options.update === 'function' ? options.update : Progressbar.defaults.update;
        var done = options.done && typeof options.done === 'function' ? options.done : Progressbar.defaults.done;
        var fail = options.fail && typeof options.fail === 'function' ? options.fail : Progressbar.defaults.fail;

        if (!aria_valuetransitiongoal) {
            fail('aria-valuetransitiongoal not set');
            return;
        }
        var percentage = Math.round(100 * (aria_valuetransitiongoal - aria_valuemin) / (aria_valuemax - aria_valuemin));

        if (options.display_text === 'center' && !$back_text && !$front_text) {
            this.$back_text = $back_text = $('<span>', {class: 'progressbar-back-text'}).prependTo($parent);
            this.$front_text = $front_text = $('<span>', {class: 'progressbar-front-text'}).prependTo($this);

            var parent_size;

            if (is_vertical) {
                parent_size = $parent.css('height');
                $back_text.css({height: parent_size, 'line-height': parent_size});
                $front_text.css({height: parent_size, 'line-height': parent_size});

                $(window).resize(function() {
                    parent_size = $parent.css('height');
                    $back_text.css({height: parent_size, 'line-height': parent_size});
                    $front_text.css({height: parent_size, 'line-height': parent_size});
                }); // normal resizing would brick the structure because width is in px
            }
            else {
                parent_size = $parent.css('width');
                $front_text.css({width: parent_size});

                $(window).resize(function() {
                    parent_size = $parent.css('width');
                    $front_text.css({width: parent_size});
                }); // normal resizing would brick the structure because width is in px
            }
        }

        setTimeout(function() {
            var current_percentage;
            var current_value;
            var this_size;
            var parent_size;
            var text;

            if (is_vertical) {
                $this.css('height', percentage + '%');
            }
            else {
                $this.css('width', percentage + '%');
            }

            var progress = setInterval(function() {
                if (is_vertical) {
                    this_size = $this.height();
                    parent_size = $parent.height();
                }
                else {
                    this_size = $this.width();
                    parent_size = $parent.width();
                }

                current_percentage = Math.round(100 * this_size / parent_size);
                current_value = Math.round(this_size / parent_size * (aria_valuemax - aria_valuemin));

                if (current_percentage >= percentage) {
                    current_percentage = percentage;
                    current_value = aria_valuetransitiongoal;
                    done();
                    clearInterval(progress);
                }

                if (options.display_text !== 'none') {
                    text = options.use_percentage ? options.percent_format(current_percentage) : options.amount_format(current_value, aria_valuemax);

                    if (options.display_text === 'fill') {
                        $this.text(text);
                    }
                    else if (options.display_text === 'center') {
                        $back_text.text(text);
                        $front_text.text(text);
                    }
                }
                $this.attr('aria-valuenow', current_value);

                update(current_percentage);
            }, options.refresh_speed);
        }, options.transition_delay);
    };


    // PROGRESSBAR PLUGIN DEFINITION
    // =============================

    var old = $.fn.progressbar;

    $.fn.progressbar = function(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.progressbar');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('bs.progressbar', (data = new Progressbar(this, options)));
            }
            data.transition();
        });
    };

    $.fn.progressbar.Constructor = Progressbar;


    // PROGRESSBAR NO CONFLICT
    // =======================

    $.fn.progressbar.noConflict = function () {
        $.fn.progressbar = old;
        return this;
    };

})(window.jQuery);
