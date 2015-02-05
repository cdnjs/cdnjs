/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2011 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.6.0
 *
 */
(function($) {

    $.fn.lazyload = function(options) {
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            skip_invisible  : true
        };
                
        if(options) {
            /* Maintain BC for a couple of version. */
            if (null !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            
            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if (0 == settings.event.indexOf("scroll")) {
            $(settings.container).bind(settings.event, function(event) {
                var counter = 0;
                elements.each(function() {
                    if (settings.skip_invisible && !$(this).is(":visible")) return;
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                            /* Nothing. */
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $(this).trigger("appear");
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });

                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(elements, function(element) {
                    return !element.loaded;
                });
                elements = $(temp);

            });
        }
        
        this.each(function() {
            var self = this;            
            self.loaded = false;
            
            /* When appear is triggered load original image. */
            $(self).one("appear", function() {
                if (!this.loaded) {
                    $("<img />")
                        .bind("load", function() {
                            $(self)
                                .hide()
                                .attr("src", $(self).data("original"))
                                [settings.effect](settings.effectspeed);
                            self.loaded = true;
                        })
                        .attr("src", $(self).data("original"));
                };
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 != settings.event.indexOf("scroll")) {
                $(self).bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        
        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);
        
        return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0, container: window}) },
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0, container: window}) },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0, container: window}) },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0, container: window}) }
    });
    
})(jQuery);
