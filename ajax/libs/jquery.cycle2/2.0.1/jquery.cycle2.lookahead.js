/*! Cycle2 lookahead plugin; Copyright (c) M.Alsup, 2013; version: 20130317 */
(function($) {
"use strict";

$(document).on( 'cycle-initialized', function(e, opts) {
    var key = 'cycle-look-ahead';

    opts.container.on( 'cycle-before', function( e, opts, outgoing, incoming, fwd ) {
        var index = fwd ? (opts.nextSlide + 1) : (opts.nextSlide - 1),
            slide = $( opts.slides[ index ] ),
            images;

        if ( slide.length && ! slide.data( key ) ) {
            slide.data( key, true );
            // handle both cases: 1) slide is an image, 2) slide contains one or more images
            images = slide.is( 'img[data-cycle-src]' ) ? slide : slide.find( 'img[data-cycle-src]' );
            images.each(function() {
                var img = $(this);
                img.attr( 'src', img.attr('data-cycle-src') );
                img.removeAttr( 'data-cycle-src' );
            });
        }
    });

});

})(jQuery);
