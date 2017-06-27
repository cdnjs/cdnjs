/*! ie-fade transition plugin for Cycle2;  version: 20140219 */
(function($) {
"use strict";

function cleartype(before, opts, el) {
    if ( before && el.style.filter ) {
        opts._filter = el.style.filter;
        try { el.style.removeAttribute('filter'); }
        catch(smother) {} // handle old opera versions
    }
    else if ( !before && opts._filter ) {
        el.style.filter = opts._filter;
    }
}

$.extend($.fn.cycle.transitions, {
    fade: {
        before: function( opts, curr, next, fwd ) {
            var css = opts.API.getSlideOpts( opts.nextSlide ).slideCss || {};
            opts.API.stackSlides( curr, next, fwd );
            opts.cssBefore = $.extend(css, { opacity: 0, visibility: 'visible', display: 'block' });
            opts.animIn    = { opacity: 1 };
            opts.animOut   = { opacity: 0 };
            cleartype( true, opts, next );
        },
        after: function( opts, curr, next ) {
            cleartype( false, opts, next );
        }
    },
    fadeout: {
        before: function( opts , curr, next, fwd ) {
            var css = opts.API.getSlideOpts( opts.nextSlide ).slideCss || {};
            opts.API.stackSlides( curr, next, fwd );
            opts.cssAfter = $.extend(css, { opacity: 0, visibility: 'hidden' });
            opts.cssBefore = $.extend(css, { opacity: 1, visibility: 'visible', display: 'block' });
            opts.animOut = { opacity: 0 };
            cleartype( true, opts, next );
        },
        after: function( opts, curr, next ) {
            cleartype( false, opts, next );
        }
    }
});

})(jQuery);


