(function ($) {

    $.fn.animateCSS = function (effect, delay, callback) {

        // Return this to maintain chainability
        return this.each(function () {

            // Cache $(this) for speed
            var $this = $(this);

            // Create a function we can call later
            function run() {

                // Add the animation effect with classes
                $this.addClass('animated ' + effect);

                // Check if the elemenr has been hidden to start with
                if ($this.css('visibility') == 'hidden') {

                    // If it has, show it (after the class has been added)
                    $this.css({
                        'visibility': 'visible'
                    });

                }

                // If the element is hidden
                if ($this.is(':hidden')) {

                    // Show it
                    $this.show();

                }

                // Event triggered when the animation has finished
                $this.bind('animationend webkitAnimationEnd oAnimationEnd', function () {
                
                    // Remove the classes so they can be added again later
                    $this.removeClass('animated ' + effect);

                    // Add a callback event
                    if (typeof callback == 'function') {

                        // Execute the callback
                        callback.call(this);

                        // Unbind the event handlers
                        $this.unbind('animationend webkitAnimationEnd oAnimationEnd');

                    }

                });

            }

            // Check if delay exists or if it's a callback
            if (!delay || typeof delay == 'function') {

                // If it's a callback, move it to callback so we can call it later
                callback = delay;

                // Run the animation (without delay)
                run();

            } else {

                // Start a counter so we can delay the animation if required
                var animation = setTimeout(function () {

                    // Run the animation (with delay)
                    run();

                // Specify the delay
                }, delay);

            }

        });

    };

})(jQuery);