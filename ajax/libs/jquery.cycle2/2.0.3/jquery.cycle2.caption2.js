/*! caption2 plugin for Cycle2;  version: 20130708 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    captionFxOut:      'fadeOut',
    captionFxIn:       'fadeIn',
    captionFxSel:      undefined,
    overlayFxOut:      'fadeOut',
    overlayFxIn:       'fadeIn',
    overlayFxSel:      undefined
});    

$(document).on( 'cycle-bootstrap', function(e, opts) {
    opts.container.on( 'cycle-update-view-before', update );
    opts.container.one( 'cycle-update-view-after', init );
});

// $(document).on( 'cycle-destroy', function(e, opts) {
//     opts.container.off( 'cycle-update-view-before', update );
// });

function update( e, opts, slideOpts, currSlide, isAfter ) {
    if ( opts.captionPlugin !== 'caption2' )
        return;
    $.each(['caption','overlay'], function() {
        var fxBase = this + 'Fx',
            fx = opts[fxBase + 'Out'] || 'hide',
            template = slideOpts[this+'Template'],
            el = opts.API.getComponent( this ),
            sel = opts[fxBase+'Sel'],
            speed = opts.speed,
            animEl;

        if ( opts.sync )
            speed = speed/2;

        animEl = sel ? el.find( sel ) : el;

        if( el.length && template ) {
            if ( fx == 'hide')
                speed = 0;
            animEl[fx]( speed, function() {
                var content = opts.API.tmpl( template, slideOpts, opts, currSlide );
                el.html( content );
                animEl = sel ? el.find( sel ) : el;
                if ( sel )
                    animEl.hide();
                fx = opts[ fxBase + 'In'] || 'show';
                animEl[fx]( speed );
            });
        }
        else {
            el.hide();
        }
    });
}

function init( e, opts, slideOpts, currSlide, isAfter ) {
    if ( opts.captionPlugin !== 'caption2' )
        return;
    $.each(['caption','overlay'], function() {
        var template = slideOpts[this+'Template'],
            el = opts.API.getComponent( this );

        if( el.length && template )
            el.html( opts.API.tmpl( template, slideOpts, opts, currSlide ) );
    });
}

})(jQuery);
