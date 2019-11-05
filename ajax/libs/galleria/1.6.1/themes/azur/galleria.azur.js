/**
 * Galleria Azur Theme
 *
 *
 * Copyright (c) 2010 - 2019 worse is better UG
 * Licensed under the MIT License.
 */

( function( window, factory ) {
    if ( typeof define == 'function' && define.amd ) {
        define( ['../galleria', 'jquery' ], function( Galleria, jQuery ) {
            return factory( window, Galleria, jQuery );
        });
    } else if ( typeof module == 'object' && module.exports ) {
        module.exports = factory(
            window,
            require('galleria'),
            require('jquery')
        );
    } else {
        factory(
            window,
            window.Galleria,
            window.jQuery
        );
    }
}( window, function factory( window, Galleria, $ ) {
    /*global jQuery, Galleria, window */

Galleria.addTheme({
    name: 'azur',
    version: 1.60,
    author: 'Galleria',
    css: 'galleria.azur.css',
    // begin site script
    defaults: {
        transition: 'fade',
        transitionSpeed: 500,
        imageCrop: true,
        thumbCrop: 'height',
        idleMode: 'hover',
        idleSpeed: 500,
        fullscreenTransition: false,

        _locale: {
            show_captions: 'Show captions',
            hide_captions: 'Hide captions',
            play: 'Play slideshow',
            pause: 'Pause slideshow',
            enter_fullscreen: 'Enter fullscreen',
            exit_fullscreen: 'Exit fullscreen',
            next: 'Next image',
            prev: 'Previous image',
            showing_image: 'Showing image %s of %s'
        },

        _toggleCaption: true,
        _showCaption: true,
        _showTooltip: true
    },
    init: function(options) {

        Galleria.requires( 1.6, 'This version of Azur theme requires Galleria version 1.6 or later');

        // add some elements
        this.addElement('bar','fullscreen','play','progress').append({
            'stage' : 'progress',
            'container': 'bar',
            'bar'   : ['fullscreen','play','thumbnails-container']
        }).prependChild( 'stage', 'info' ).appendChild( 'container', 'tooltip' );

        // copy the scope
        var gallery = this,
            document = window.document,
            lang = options._locale,
            canvSupport = ( 'getContext' in document.createElement('canvas') );

        // progress animation
        (function() {

            if ( !canvSupport ) {

                gallery.addElement( 'progressbar' ).appendChild( 'progress', 'progressbar' );
                gallery.$( 'progress' ).addClass('nocanvas');

                var w = gallery.$( 'progress' ).width();

                gallery.bind( 'progress', function(e) {
                    gallery.$( 'progressbar' ).width( e.percent/100 * w );
                });

                return;
            }

            var dim = 24,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                radius = function( degrees ) {
                    return degrees * ( Math.PI/180 );
                },
                arc = function( degrees, color ) {
                    ctx.strokeStyle = color || '#000';
                    ctx.lineWidth = 3;
                    ctx.clearRect( 0, 0, dim, dim );
                    ctx.beginPath();
                    ctx.arc( dim/2, dim/2, dim/2-2, radius(-90), radius(degrees-90), false );
                    ctx.stroke();
                    ctx.closePath();
                };

            canvas.width = dim;
            canvas.height = dim;

            $( canvas ).css({
                zIndex: 10000,
                position: 'absolute',
                right:10,
                top:10
            }).appendTo( gallery.get('container') );

            gallery.bind( 'progress', function(e) {
                $( canvas ).fadeIn(200);
                arc( e.percent*3.6, 'rgba(255,255,255,.7)' );
            });

            gallery.bind( 'pause', function() {
                $( canvas ).fadeOut( 200, function() {
                    ctx.clearRect( 0, 0, dim, dim );
                });
            });

        }());

        // loader
        (function() {

            var requestFrame = (function(){
                var r = 'RequestAnimationFrame';
                return window.requestAnimationFrame ||
                       window['webkit'+r] ||
                       window['moz'+r] ||
                       window['o'+r] ||
                       window['ms'+r] ||
                       function( callback ) {
                           window.setTimeout(callback, 1000 / 60);
                       };
            }());

            if ( !canvSupport ) {
                gallery.$( 'loader' ).addClass( 'nocanvas' );
                return;
            }

            var elem = document.createElement('canvas'),
                ctx = elem.getContext('2d'),
                M = Math,
                _restore = function( ctx, size, back ) {
                    var n = back ? -2 : 2;
                    ctx.translate( size/n, size/n );
                },
                step = 28;

            $(elem).hide().appendTo( gallery.get('loader') ).fadeIn(500);

            var draw = function( ctx, st ) {

                var size = 48,
                    lines = 28,
                    l;

                ctx.clearRect(0, 0, size, size);
                ctx.lineWidth = 1.5;

                for (var i=0; i < lines; i++) {

                    l = i+st >= lines ? i-lines+st : i+st;

                    ctx.strokeStyle = 'rgba(255,255,255,' + M.max(0, l/lines ) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();

                    ctx.moveTo( size/2, size/2-16 );
                    ctx.lineTo( size/2, 0 );
                    ctx.stroke();
                    _restore( ctx, size, false );
                    ctx.rotate( ( 360/lines ) * M.PI/180 );
                    _restore( ctx, size, true );
                }

                ctx.save();
                _restore( ctx, size, false );

                ctx.rotate( -1 * ( 360/lines/8 ) * M.PI/180 );
                _restore( ctx, size, true );
            };

           (function loop() {
                requestFrame(loop);
                draw(ctx, step);
                step = step === 0 ? 28 : step-1;
            }())
        }());

        var infoState = Galleria.IE < 9 ? { bottom: -100 } : { bottom: -50, opacity: 0 },
            counterState = Galleria.IE < 9 ? { top: -20 } : { opacity: 0, top: -20 };

        this.bind( 'play', function() {

            this.$( 'play' ).addClass( 'pause' );
            if ( !canvSupport ) {
                this.$( 'progress' ).show();
            }

        }).bind( 'pause', function() {

            this.$( 'play' ).removeClass( 'pause' );
            if ( !canvSupport ) {
                this.$( 'progress' ).hide();
            }

        }).bind( 'loadstart', function(e) {

            if ( !e.cached ) {
                this.$( 'loader' ).show();
            }

        }).bind( 'loadfinish', function(e) {

            if ( canvSupport ) {
                this.$( 'loader' ).fadeOut(100);
            } else {
                this.$( 'loader' ).hide();
            }

        });

        this.addIdleState( this.get('info'), infoState, Galleria.IE < 9 ? {} : { opacity: 1 }, true)
            .addIdleState( this.get('image-nav-left'), { opacity: 0, left: 0 }, { opacity: 1 }, true)
            .addIdleState( this.get('image-nav-right'), { opacity: 0, right: 0 }, { opacity: 1 }, true)
            .addIdleState( this.get('counter'), counterState, Galleria.IE < 9 ? {} : { opacity: 0.9 }, true);

        this.$( 'fullscreen' ).on('click:fast', function(e) {

            e.preventDefault();
            gallery.toggleFullscreen();

        });

        this.$( 'play' ).on('click:fast', function(e) {

            e.preventDefault();
            gallery.playToggle();

        });

        if ( options._toggleCaption ) {

            this.$( 'info' ).addClass( 'toggler' );
            this.addElement( 'captionopen' ).appendChild( 'stage', 'captionopen' );
            this.addElement( 'captionclose' ).appendChild( 'info', 'captionclose' );

            this.$( 'captionopen' ).on('click:fast', function() {
                gallery.$( 'info' ).addClass( 'open' );
                $(this).hide();
            }).html( lang.show_captions );

            this.bind( 'loadstart', function() {
                this.$( 'captionopen' ).toggle( !gallery.$( 'info' ).hasClass( 'open' ) && this.hasInfo() );
            });

            this.$( 'captionclose' ).on('click:fast', function() {
                gallery.$( 'info' ).removeClass( 'open' );
                if ( gallery.hasInfo() ) {
                    gallery.$( 'captionopen' ).show();
                }
            }).html('&#215;');

            if ( options._showCaption ) {
                this.$( 'captionopen' ).trigger('click:fast');
            }

        }

        if ( options._showTooltip ) {

            this.bindTooltip({

                'fullscreen': function() {
                    return gallery.isFullscreen() ? lang.exit_fullscreen : lang.enter_fullscreen;
                },

                'play': function() {
                    return gallery.isPlaying() ? lang.pause : lang.play;
                },

                'captionclose': lang.hide_captions,

                'image-nav-right': lang.next,

                'image-nav-left': lang.prev,

                'counter': function() {
                    return lang.showing_image.replace( /\%s/, gallery.getIndex() + 1 ).replace( /\%s/, gallery.getDataLength() );
                }
            });
        }
    }
    // end site script
});

    return Galleria;
}));
