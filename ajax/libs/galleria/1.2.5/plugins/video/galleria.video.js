/**
 * @preserve Galleria Video Plugin 2011-05-30
 * http://galleria.aino.se
 *
 * Copyright 2011, Aino
 * Licensed under the MIT license.
 */

/*global jQuery, Galleria, mejs */

(function($) {
    
    var scriptload = false,
        cssload = false,
        
        path = (function(src) {
            var slices = src.split('/');
            if (slices.length == 1) {
                return '';
            }
            slices.pop();
            return slices.join('/') + '/';
        }( $('script:last').attr('src') )),
        
        formats = ['mp4', 'webm', 'ogg'],

        data, elem, instance,
        
        onload = function() {

            this.addElement('video').prependChild('stage','video');
            
            var z = Galleria.utils.parseValue(this.$('image-nav-left').css('z-index'));

            var video = this.$('video').css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: z,
                    background: 'url(mediaelement/i/play.png) no-repeat 50% 50%'
                    
                }).hide(),

                insert = function() {
                    
                    var sources = [];
                    
                    $.each(data, function(key, val) {
                        if ( $.inArray( key, formats ) > -1 ) {
                            sources.push( $('<source>').attr({
                                type: 'video/'+key,
                                src: val
                            }));
                        }
                    });
                    
                    if ( sources.length ) {
                        elem = $('<video>', {
                            preload: 'none',
                            controls: true
                        }).appendTo( video );
                        
                        $.fn.append.apply( elem, sources );

                    } else {
                        elem = false;
                        instance = false;
                    }
                };

            this.bind('loadfinish', function(e) {

                data = this.getData(e.index);

                if (video.children().length) {
                    video.fadeOut(200, function() {
                        $(this).empty().hide();
                        insert();
                    });
                } else {
                    insert();
                }

            });

            this.bind('image', function( e ) {
                if ( elem ) {
                    
                    elem.attr({
                        width: this.getStageWidth(),
                        height: this.getStageHeight()
                    }).hide();
                    
                    video.show().bind('touchend mouseup', function() {
                        elem.fadeIn(200);
                        instance = new mejs.MediaElementPlayer(elem, {
                            features: ['playpause','progress','current','volume'],
                            success: function( player ) {
                                player.play();
                            }
                        });
                    });
                }
            });

            this.bind('rescale', function() {
                elem.attr({
                    width: this.getStageWidth(),
                    height: this.getStageHeight()
                });
                if (instance) {
                    instance.setControlsSize();
                }
            });
        };
    
    Galleria.utils.loadScript( path + 'mediaelement/mediaelement-and-player.min.js', function() {
        scriptload = true;
    });
    
    Galleria.utils.loadCSS( path + 'mediaelement/mediaelementplayer.css', function() {
        cssload = true;
    });

    Galleria.ready(onload);
        
}( jQuery ));