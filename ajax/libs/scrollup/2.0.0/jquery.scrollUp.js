/*

 scrollup v2.0.0
 Author: Mark Goodyear - http://markgoodyear.com
 Git: https://github.com/markgoodyear/scrollup

 Copyright 2013 Mark Goodyear.
 Licensed under the MIT license
 http://www.opensource.org/licenses/mit-license.php

 Twitter: @markgdyr

 */
(function($, window, document) {

    // Main function
    $.fn.scrollUp = function (options) {
        // Ensure that only one scrollUp exists
        if ( ! $.data( document.body, 'scrollUp' ) ) {
            $.data( document.body, 'scrollUp', true );
            $.fn.scrollUp.init(options);
        }
    };

    // Init
    $.fn.scrollUp.init = function(options) {
        // Apply any options to the settings, override the defaults
        var o = $.fn.scrollUp.settings = $.extend({}, $.fn.scrollUp.defaults, options),

        // Create element
        $self = $('<a/>', {
            id: o.scrollName,
            href: '#top',
            title: o.scrollText
        }).appendTo('body');

        // If not using an image display text
        if (!o.scrollImg) {
            $self.html(o.scrollText);
        }

        // Minimum CSS to make the magic happen
        $self.css({
            display: 'none',
            position: 'fixed',
            zIndex: o.zIndex
        });

        // Active point overlay
        if (o.activeOverlay) {
            $('<div/>', { id: o.scrollName + '-active' }).css({ position: 'absolute', 'top': o.scrollDistance + 'px', width: '100%', borderTop: '1px dotted' + o.activeOverlay, zIndex: o.zIndex }).appendTo('body');
        }

        // Scroll function
        scrollEvent = $(window).scroll(function() {
            // If from top or bottom
            if (o.scrollFrom === 'top') {
                scrollDis = o.scrollDistance;
            } else {
                scrollDis = $(document).height() - $(window).height() - o.scrollDistance;
            }

            // Switch animation type
            switch (o.animation) {
                case 'fade':
                    $( ($(window).scrollTop() > scrollDis) ? $self.fadeIn(o.animationInSpeed) : $self.fadeOut(o.animationOutSpeed) );
                    break;
                case 'slide':
                    $( ($(window).scrollTop() > scrollDis) ? $self.slideDown(o.animationInSpeed) : $self.slideUp(o.animationOutSpeed) );
                    break;
                default:
                    $( ($(window).scrollTop() > scrollDis) ? $self.show(0) : $self.hide(0) );
            }
        });

        // To the top
        $self.click(function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop:0
            }, o.topSpeed, o.easingType);
        });
    };

    // Defaults
    $.fn.scrollUp.defaults = {
        scrollName: 'scrollUp', // Element ID
        scrollDistance: 300, // Distance from top/bottom before showing element (px)
        scrollFrom: 'top', // 'top' or 'bottom'
        scrollSpeed: 300, // Speed back to top (ms)
        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: 'Scroll to top', // Text for element, can contain HTML
        scrollImg: false, // Set true to use image
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647 // Z-Index for the overlay
    };

    // Destroy scrollUp plugin and clean all modifications to the DOM
    $.fn.scrollUp.destroy = function (scrollEvent){
        $.removeData( document.body, 'scrollUp' );
        $( '#' + $.fn.scrollUp.settings.scrollName ).remove();
        $( '#' + $.fn.scrollUp.settings.scrollName + '-active' ).remove();

        // If 1.7 or above use the new .off()
        if ($.fn.jquery.split('.')[1] >= 7) {
            $(window).off( 'scroll', scrollEvent );

        // Else use the old .unbind()
        } else {
            $(window).unbind( 'scroll', scrollEvent );
        }
    };

    $.scrollUp = $.fn.scrollUp;

})(jQuery, window, document);