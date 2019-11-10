/*! Ripple.js v1.2.1
 * The MIT License (MIT)
 * Copyright (c) 2014 Jacob Kelley */

;(function($, document, Math){
    $.ripple = function(selector, options) {

        var self = this;

        var _log = self.log = function() {
            if(self.defaults.debug && console && console.log) {
                console.log.apply(console, arguments);
            }
        };

        self.selector = selector;
        self.defaults = {
            debug: false,
            on: 'mousedown',

            opacity: 0.4,
            color: "auto",
            multi: false,

            duration: 0.7,
            rate: function(pxPerSecond) {
                return pxPerSecond;
            },

            easing: 'linear'
        };

        self.defaults = $.extend({}, self.defaults, options);

        var Trigger = function(e) {

            var $this = $(this);
            var $ripple;
            var settings;

            $this.addClass('has-ripple');

            // This instances settings
            settings = $.extend({}, self.defaults, $this.data());

            // Create the ripple element
            if ( settings.multi || (!settings.multi && $this.find(".ripple").length === 0) ) {
                $ripple = $("<span></span>").addClass("ripple");
                $ripple.appendTo($this);

                _log('Create: Ripple');

                // Set ripple size
                if (!$ripple.height() && !$ripple.width()) {
                    var size = Math.max($this.outerWidth(), $this.outerHeight());
                    $ripple.css({
                        height: size,
                        width: size
                    });
                    _log('Set: Ripple size');
                }

                // Give the user the ability to change the rate of the animation
                // based on element width
                if(settings.rate && typeof settings.rate == "function") {

                    // rate = pixels per second
                    var rate = Math.round( $ripple.width() / settings.duration );

                    // new amount of pixels per second
                    var filteredRate = settings.rate(rate);

                    // Determine the new duration for the animation
                    var newDuration = ( $ripple.width() / filteredRate);

                    // Set the new duration if it has not changed
                    if(settings.duration.toFixed(2) !== newDuration.toFixed(2)) {
                        _log('Update: Ripple Duration', {
                            from: settings.duration,
                            to: newDuration
                        });
                        settings.duration = newDuration;
                    }
                }

                // Set the color and opacity
                var color = (settings.color == "auto") ? $this.css('color') : settings.color;
                var css = {
                    animationDuration: (settings.duration).toString() + 's',
                    animationTimingFunction: settings.easing,
                    background: color,
                    opacity: settings.opacity
                };

                _log('Set: Ripple CSS', css);
                $ripple.css(css);
            }

            // Ensure we always have the ripple element
            if(!settings.multi) {
                _log('Set: Ripple Element');
                $ripple = $this.find(".ripple");
            }

            // Kill animation
            _log('Destroy: Ripple Animation');
            $ripple.removeClass("ripple-animate");


            // Retrieve coordinates
            var x = e.pageX - $this.offset().left - $ripple.width() / 2;
            var y = e.pageY - $this.offset().top - $ripple.height() / 2;

            /**
             * We want to delete the ripple elements if we allow multiple so we dont sacrifice any page
             * performance. We don't do this on single ripples because once it has rendered, we only
             * need to trigger paints thereafter.
             */
            if(settings.multi) {
                _log('Set: Ripple animationend event');
                $ripple.one('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                    _log('Note: Ripple animation ended');
                    _log('Destroy: Ripple');
                    $(this).remove();
                });
            }

            // Set position and animate
            _log('Set: Ripple location');
            _log('Set: Ripple animation');
            $ripple.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("ripple-animate");
        };

        $(document).on(self.defaults.on, self.selector, Trigger);
    };
})(jQuery, document, Math);
