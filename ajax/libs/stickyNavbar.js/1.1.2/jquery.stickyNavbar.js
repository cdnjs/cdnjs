/*
 * stickyNavbar.js v1.1.2
 * https://github.com/jbutko/stickyNavbar.js
 * Fancy sticky navigation jQuery plugin with smart anchor links highlighting
 *
 * Developed and maintenained under MIT licence by Jozef Butko - www.jozefbutko.com
 * http://www.opensource.org/licenses/MIT

 * Original jquery-browser code Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * CREDITS:
 * Daniel Eden for Animate.CSS:
 * http://daneden.github.io/animate.css/
 * jQuery easing plugin:
 * http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * COPYRIGHT (C) 2014 Jozef Butko
 * https://github.com/jbutko
 * LAST UPDATE: 25/08/2014
 *
 */
/* The semi-colon before function invocation is a safety net against concatenated
   scripts and/or other plugins which may not be closed properly. */
;
(function ($, window, document) {

    'use strict';

    $.fn.stickyNavbar = function (prop) {

        // Set default values
        var options = $.extend({
            activeClass: "active", // Class to be added to highlight nav elements
            sectionSelector: "scrollto", // Class of the section that is interconnected with nav links
            animDuration: 350, // Duration of jQuery animation as well as jQuery scrolling duration
            startAt: 0, // Stick the menu at XXXpx from the top of the this() (nav container)
            easing: "swing", // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
            animateCSS: true, // AnimateCSS effect on/off
            animateCSSRepeat: false, // Repeat animation everytime user scrolls
            cssAnimation: "fadeInDown", // AnimateCSS class that will be added to selector
            jqueryEffects: false, // jQuery animation on/off
            jqueryAnim: "slideDown", // jQuery animation type: fadeIn, show or slideDown
            selector: "a", // Selector to which activeClass will be added, either "a" or "li"
            mobile: false, // If false, nav will not stick under viewport width of 480px (default) or user defined mobileWidth
            mobileWidth: 480, // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due user usability on mobile)
            zindex: 9999, // The zindex value to apply to the element: default 9999, other option is "auto"
            stickyModeClass: "sticky", // Class that will be applied to 'this' in sticky mode
            unstickyModeClass: "unsticky" // Class that will be applied to 'this' in non-sticky mode
        }, prop),
            section = $('.' + options.sectionSelector);


        return this.each(function () {

            /* Cache variables */
            var $self = $(this),
                $selfPosition = $self.css("position"), // Initial position of this,
                $selfZindex = $self.css("zIndex"), // Z-index of this
                $selfScrollTop = $self.offset().top, // scrollTop position of this
                $topOffset = $self.css("top") === 'auto' ? 0 : $self.css("top"), // Top property of this: if not set = 0
                menuItems = options.selector === "a" ? $self.find('li a') : $self.find('li'), // Navigation lists or links
                menuItemsHref = $self.find('li a[href*=#]'), // href attributes of navigation links
                thisHeight = $self.outerHeight(true); // Height of navigation wrapper

            /* Smooth scrolling to the desired section: get clicked href attribute, measure offset from top and then animate  */
            /* v1.0.3: Fix for overlapping content by navigation */
            /* If we first first time or we get back to home substract thisHeight 2 times */
            var clicks = 0;

            /* Smooth scrolling logic */
            menuItems.click(function(e) {
                /* v1.1.2: Ignore external links and just let them open - pull request #15 by Globegitter */
                var href = $(this).attr("href");
                if (href.substring(0, 4) === 'http' || href.substring(0, 7) === 'mailto:') {
                    return true;
                }

                /* Get index of clicked nav link */
                var index = menuItems.index(this),
                    section = href; // Get href attr of clicked nav link

                /* On every nav link click increment counter */
                ++clicks;

                /* If user click on first link (home) reset counter */
                if (index === "0") {
                    clicks = 0;
                }

                /* Prevent default click behaviour */
                e.preventDefault();

                /* v1.0.5: Inaccurate scrolling fix */
                /* v1.1.0: Added animation duration and easing */
                /* If it is first click and we are left 1st section and want to go downward then add 'this' height just once */
                if (clicks === 1 && ($self.offset().top > $selfScrollTop)) {

                    $("html, body").stop().animate({
                        scrollTop: $(section).offset().top - thisHeight + 2 + 'px'
                    }, {
                        duration: options.animDuration,
                        easing: options.easing
                    });

                    /* v1.0.3: Overlapping fix */
                    /* If it is first click after page load or we are at the top of the page or user return back on home: Then add 'this' height 2 times to fix overlapping */
                } else if (clicks === 1 || $self.offset().top === $selfScrollTop || index === 0) {

                    $("html, body").stop().animate({
                        scrollTop: $(section).offset().top - 2 * thisHeight + 2 + 'px'
                    }, {
                        duration: options.animDuration,
                        easing: options.easing
                    });

                    /* v1.0.5: Inaccurate scrolling fix */
                    /* If it is second click and we are scrolling upwards then add 'this' height just once */
                } else if (clicks === 2 && ($self.offset().top < $selfScrollTop)) {

                    $("html, body").stop().animate({
                        scrollTop: $(section).offset().top + 2 + 'px'
                    }, {
                        duration: options.animDuration,
                        easing: options.easing
                    });

                    /* Else add 'this' height just once */
                } else {

                    $("html, body").stop().animate({
                        scrollTop: $(section).offset().top - thisHeight + 2 + 'px'
                    }, {
                        duration: options.animDuration,
                        easing: options.easing
                    });

                } // Smooth scrolling logic End

            }); // menuItems.click(function(e) END


            /* v1.1.0: Main function, then on bottom called window.scroll, ready and resize */
            var mainFunc = function() {

                /* Cache window and window position from the top */
                var win = $(window),
                    windowPosition = win.scrollTop(),
                    windowWidth = win.width(),
                    windowHeight = win.height();

                /* v1.1.0: Optional mobileWidth */
                if (!options.mobile && windowWidth < options.mobileWidth) {
                    $self.css('position', $selfPosition);
                    return;
                }

                /* Everytime we scroll remove the activeClass. Later on we add it if needed. */
                menuItems.removeClass(options.activeClass);

                /* Add activeClass to the div that is passing the top of the window */
                section.each(function () {
                    var top = $(this).offset().top - thisHeight,
                        bottom = $(this).outerHeight(true) + top;

                    if ((windowPosition >= top) && (windowPosition <= bottom)) {
                        if (options.selector === "a") {
                            $self.find('li a[href~="#' + this.id + '"]').addClass(options.activeClass);
                        } else {
                            $self.find('li a[href~="#' + this.id + '"]').parent().addClass(options.activeClass);
                        }
                    }
                });


                /* 1.) As soon as we start scrolling */
                if (windowPosition >= $selfScrollTop + options.startAt) {

                    /* v.1.1.0: sticky/unsticky class */
                    /* Add 'sticky' class to this as soon as 'this' is in sticky mode */
                    $self.removeClass(options.unstickyModeClass).addClass(' ' + options.stickyModeClass);

                    /* As soons as scrolling starts set position of this() to fixed */
                    $self.css({
                        'position': 'fixed',
                        "zIndex": options.zindex
                    }).stop();

                    /* If jQuery effects are turned on */
                    if (options.jqueryEffects) {
                        if (!options.animateCSSRepeat) {
                            $self.hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
                        }
                        $self.hide().stop()[options.jqueryAnim](options.animDuration, options.easing);

                        /* If animateCSS are turned on */
                    } else if (options.animateCSS) {

                        /* If animateCSSRepeat == true animation will repeat on each scroll  */
                        if (options.animateCSSRepeat) {

                            /* v1.0.5: animateCSSRepeat Fix */
                            /* Restart the animation */
                            $self.addClass(options.cssAnimation + ' animated').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e) {
                                $self.removeClass(options.cssAnimation + ' animated');
                            });

                        /* v1.0.5: animateCSSRepeat Fix */
                        } else {

                            /* Restart the animation just once */
                            $self.addClass(options.cssAnimation + ' animated').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
                        }

                        /* Else if jQuery and animateCSS are turned off */
                    } else {
                        $self.stop(); /* Pin navigation to the top */
                    }

                    /* If top of the window is over this() (nav container) */
                } else {
                    /* v.1.1.0: sticky/unsticky class */
                    /* Add 'sticky' class to this as soon as 'this' is in sticky mode */
                    $self.css({
                        'position': options.$selfPosition,
                        "zIndex": $selfZindex
                    }).removeClass(options.stickyModeClass).addClass(' ' + options.unstickyModeClass);
                }


                /* 2.) As soon as we hit the bottom of the page */
                if (win.scrollTop() + windowHeight >= $(document).height()) {

                    /* v1.1.0: Removed bottomAnimation */

                    /* Remove activeClass from menuItem before the last and add activeClass to the lastests one */
                    menuItems.removeClass(options.activeClass).last().addClass(options.activeClass);

                }

                /* 3.) As soon as we get back to the top of the page */
                /* If top of the window is over this() (nav container) */
                if (windowPosition <= $selfScrollTop) {
                    $self.removeClass(options.cssAnimation + ' animated');

                    /* If jQuery effects are turned on */
                    if (options.jqueryEffects) {

                        /* If we are at the very top of the page remove active class */
                        /* If we are the top of the page */
                        if (windowPosition === 0) {
                            menuItems.removeClass(options.activeClass);
                        }

                        /* If the top of the window is under the this() stick the nav and start the animation */
                        if (windowPosition >= $selfScrollTop) {
                            $self.css({
                                'position': 'fixed',
                                "zIndex": options.zindex
                            }).hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
                        } else {
                            $self.css({
                                'position': $selfPosition,
                                "zIndex": options.zindex
                            });
                        }

                        /* If jQuery effects are turned off */
                    } else {

                        /* If we are at the very top of the page remove active class */
                        if (windowPosition === 0) {
                            menuItems.removeClass(options.activeClass);
                        }

                        /* Set initial position of this() and initial CSS top property */
                        $self.css({
                            'position': $selfPosition,
                            'top': $topOffset
                        }).stop().animate({
                            top: $topOffset
                        }, options.animDuration, options.easing);
                    }
                } // ( windowPosition <= $selfScrollTop ) end

            }

            $(window).scroll(mainFunc); // scroll fn end
            $(window).ready(mainFunc);
            $(window).resize(mainFunc);

        }); // return this.each end
    }; // $.fn.stickyNavbar end
})(jQuery, window, document); // document ready end