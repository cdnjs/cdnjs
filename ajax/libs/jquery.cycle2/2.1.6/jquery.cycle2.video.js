/*! youtube plugin for Cycle2;  version: 20130708 */
(function($) {
"use strict";

var template = '<div class=cycle-youtube><object width="640" height="360">' +
    '<param name="movie" value="{{url}}"></param>' +
    '<param name="allowFullScreen" value="{{allowFullScreen}}"></param>' +
    '<param name="allowscriptaccess" value="always"></param>' +
    '<param name="wmode" value="opaque"></param>' +
    '<embed src="{{url}}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="{{allowFullScreen}}" wmode="opaque"></embed>' +
'</object></div>';

$.extend($.fn.cycle.defaults, {
    youtubeAllowFullScreen: true,
    youtubeAutostart: false,
    youtubeAutostop:  true
});    

$(document).on( 'cycle-bootstrap', function( e, opts ) {
    if ( ! opts.youtube )
        return;

    // don't hide inactive slides; hiding video causes reload when it's shown again
    opts.hideNonActive = false; 

    opts.container.find( opts.slides ).each(function(i) {
        // convert anchors to template markup
        if ( $(this).attr('href') === undefined )
            return;
        var markup, slide = $(this), url = slide.attr( 'href' );
        var fs = opts.youtubeAllowFullScreen ? 'true' : 'false';
        url += ( /\?/.test( url ) ? '&' : '?') + 'enablejsapi=1';
        if ( opts.youtubeAutostart && opts.startingSlide === i )
            url += '&autoplay=1';
        markup = opts.API.tmpl( template, { url: url, allowFullScreen: fs });
        slide.replaceWith( markup );
    });
    opts.slides = opts.slides.replace(/(\b>?a\b)/,'div.cycle-youtube');

    if ( opts.youtubeAutostart ) {
        opts.container.on( 'cycle-initialized cycle-after', function( e, opts ) {
            var index = e.type == 'cycle-initialized' ? opts.currSlide : opts.nextSlide;
            $( opts.slides[ index ] ).find('object,embed').each( play );
        });
    }

    if ( opts.youtubeAutostop ) {
        opts.container.on( 'cycle-before', function( e, opts ) {
            $( opts.slides[ opts.currSlide ] ).find('object,embed').each( pause );
        });
    }
});

function play() {
    /*jshint validthis:true */
    try {
        this.playVideo();
    }
    catch( ignore ) {}
}
function pause() {
    /*jshint validthis:true */
    try {
        this.pauseVideo();
    }
    catch( ignore ) {}
}

})(jQuery);
