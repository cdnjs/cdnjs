/**
 * Galleria Folio Theme
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
    name: 'folio',
    version: 1.60,
    author: 'Galleria',
    css: 'galleria.folio.css',
    defaults: {
        transition: 'pulse',
        thumbCrop: 'width',
        imageCrop: false,
        carousel: false,
        show: false,
        easing: 'galleriaOut',
        trueFullscreen: false,

        _webkitCursor: false,
        _animate: true,
        _center: false, /* Set this to false for now, for backwards compability */
        _onClick: null
    },
    init: function(options) {

        Galleria.requires( 1.6, 'This version of Folio theme requires Galleria version 1.6 or later');
        
        this.addElement( 'preloader', 'loaded', 'close' ).append({
            container: 'preloader',
            preloader: 'loaded',
            stage: 'close'
        });

        var self = this,
            stage = this.$('stage'),
            thumbnails = this.$('thumbnails'),
            thumbContainer = this.$('thumbnails-container'),
            images = this.$('images'),
            info = this.$('info'),
            loader = this.$('loader'),
            target = this.$('target'),
            len = 0,
            width = target.width(),
            center = options._center,
            colWidth = 0,
            colMargin = 0,

            HASH = window.location.hash.substr( 2 ),

            adjustInfo = function( width ) {
                self.$('info').css({
                    left: self.finger ? 20 : Math.max(20, ( $(window).width()/2 - width/2 + 10 ) )
                });
            },

            mi = function( arr ) { return Math.min.apply( window, arr ); },

            ma = function(arr) { return Math.max.apply( window, arr ); },

            masonry = function( elem, options ) {

                options = $.extend({
                    speed: 400,
                    width: 190,
                    onbrick: function(){},
                    onheight: function(){},
                    delay: 0,
                    debug: false
                }, options );

                elem = $(elem);

                var bricks = elem.children(),
                    width = elem.width(),
                    colCount = Math.floor( width / options.width ),
                    colHeight = [],
                    i,
                    thisCol,
                    sz,
                    mH,
                    css = {
                        'float': 'none',
                        position: 'absolute',
                        display: Galleria.SAFARI ? 'inline-block' : 'block'
                    };

                if ( center ) {
                  var width = thumbContainer.width();
                  var margin = (width-(colCount*colWidth-10))/2; // TODO calc margin dynamic
                  thumbnails.css('left', colCount ? margin : 0);
                }

                if ( elem.data('colCount') === colCount ) {
                    return;
                }

                elem.data( 'colCount', colCount );

                if ( !bricks.length ) {
                    return;
                }

                for ( i = 0; i < colCount; i++ ) {
                    colHeight[ i ] = 0;
                }

                elem.css( 'position', 'relative' );

                bricks.css( css ).each( function( j, brick ) {

                    brick = $( brick );

                    for ( i = colCount-1; i > -1; i-- ) {
                        if ( colHeight[ i ] === mi( colHeight ) ) {
                            thisCol = i;
                        }
                    }

                    sz = {
                        top: colHeight[ thisCol ],
                        left: options.width * thisCol
                    };

                    if ( typeof sz.top !== 'number' || typeof sz.left !== 'number' ) {
                        return;
                    }

                    if ( options.speed ) {

                        window.setTimeout((function( brick, options, sz ) {
                            return function(e) {
                                Galleria.utils.animate( brick, sz, {
                                    easing: 'galleriaOut',
                                    duration: options.speed,
                                    complete: options.onbrick
                                });
                            };
                        }( brick, options, sz )), j * options.delay );

                    } else {
                        brick.css( sz );
                        options.onbrick.call( brick );
                    }

                    if ( !brick.data( 'height' ) ) {
                        brick.data( 'height', brick.outerHeight( true ) );
                    }

                    colHeight[ thisCol ] += brick.data('height');

                });

                mH = ma( colHeight );

                if (mH < 0) {
                    return;
                }

                if (typeof mH !== 'number') {
                    return;
                }

                if ( options.speed ) {
                    elem.animate({ height: ma( colHeight ) }, options.speed, options.onheight );
                } else {
                    elem.height( ma( colHeight ) );
                    options.onheight.call( elem );
                }
            };

        if ( center ) {
          this.$('container').addClass('center');
        }

        this.bind( 'fullscreen_enter', function(e) {
            this.$('container').css('height','100%');
            if ( self.finger ) {
                $.each( self._controls.slides, function( i, slide ) {
                    $( slide.container ).show();
                });
            }
        });

        this.bind( 'fullscreen_exit', function(e) {

            if ( this.getData().iframe ) {
                $(this._controls.getActive().container).find('iframe').remove();
                this.$('container').removeClass('iframe');
            }
            Galleria.TOUCH || $( self._controls.getActive().container ).hide();
            if ( self.finger ) {
                $.each( self._controls.slides, function( i, slide ) {
                    $( slide.container ).hide();
                });
            }

        });

        this._fullscreen.beforeExit = function(ready) {
            info.hide();
            if ( Galleria.IE8 ) {
                Galleria.utils.animate( self.getActiveImage(), {
                    opacity: 0
                }, {
                    duration: 200
                });
            }
            Galleria.utils.animate( stage[0], {
                opacity: 0
            }, {
                duration: 200,
                complete: function() {
                    stage.css({
                        visibility: 'hidden',
                        opacity: 1
                    });
                    thumbnails.show();
                    Galleria.utils.animate(thumbnails[0], {
                        opacity: 1
                    }, {
                        duration: 200
                    });
                    ready();
                }
            });
        };

        this.bind( 'thumbnail', function(e) {

            this.addElement( 'plus' );

            var thumb = e.thumbTarget,
                plus = this.$( 'plus' ).css({
                    display:'block'
                }).insertAfter( thumb ),
                parent = $( thumb ).parent().data('index', e.index);

            if ( options.showInfo && this.hasInfo( e.index ) ) {
                plus.append( '<span>'+this.getData( e.index ).title+'</span>' );
            }

            colWidth = colWidth || $(thumb).parent().outerWidth(true);
            colMargin = colMargin || colWidth - $(thumb).width();

            $( thumb ).css( 'opacity', 0 );
            parent.off( options.thumbEventType );

            if (Galleria.IE) {
                plus.hide();
            } else {
                plus.css('opacity',0);
            }

            if ( !Galleria.TOUCH ) {

                parent.hover(function() {
                    if (Galleria.IE) {
                        plus.show();
                    } else {
                        plus.stop().css('opacity',1);
                    }
                }, function() {
                    if (Galleria.IE) {
                        plus.hide();
                    } else {
                        plus.stop().animate({opacity:0}, 300);
                    }
                });
            } else {
                parent.on('touchstart', function() {
                    plus.css('opacity',1);
                }).on( 'touchend', function() {
                    plus.hide();
                });
            }

            len++;

            this.$( 'loaded' ).css('width', ( len / this.getDataLength() * 100 ) + '%' );

            if ( len === this.getDataLength() ) {
                this.$( 'preloader' ).fadeOut( 100 );

                thumbnails.data('colCount', null);

                masonry( thumbnails, {
                    width: colWidth,
                    speed: options._animate ? 400 : 0,
                    onbrick: function() {

                        var el = this,
                            image = $( el ).find('img, .img');

                        window.setTimeout( (function(image) {

                            return function() {

                                Galleria.utils.animate( image, {
                                    opacity: 1
                                }, {
                                    duration: options.transition_speed,
                                    complete: function() {
                                        $(image).parent().css('background', '#000');
                                    }
                                });

                                image.parent().off( 'click:fast click' ).on('click:fast', function() {

                                    var index = $(this).data('index');

                                    if ( Galleria.IE < 9 ) {
                                        $(this).find('.galleria-plus').hide();
                                    }

                                    if ( $.isFunction( options._onClick ) ) {
                                        options._onClick.call(self, self.getData(index));
                                        return;
                                    }

                                    stage.css({
                                        visibility: 'visible',
                                        opacity: 0
                                    });

                                    self.$( 'target' ).height( self.$('target').height() );

                                    if ( self.finger ) {
                                        images.css( 'opacity', 0 );
                                    }

                                    Galleria.utils.animate(thumbnails[0], {
                                        opacity: 0
                                    }, {
                                        duration: 100,
                                        complete: function() {
                                            thumbnails.hide();
                                            self.enterFullscreen();
                                            Galleria.utils.animate( stage[0], {
                                                opacity: 1
                                            }, {
                                                duration: 200,
                                                complete: function() {
                                                    if ( self.finger ) {
                                                        images.animate({ opacity: 1 });
                                                        self.finger.moveTo( index );
                                                    }
                                                    if ( self.finger ) {
                                                        self.finger.setPosition( -index*self.finger.width );
                                                    }
                                                    self.show( index );
                                                }
                                            });
                                        }
                                    });
                                });
                            };
                        }( image )), options._animate ? image.parent().data('index')*100 : 0);
                    },
                    onheight: function() {
                        target.height( thumbnails.height() );
                    }
                });
            }
        });

        this.bind( 'loadstart', function(e) {
            if (! e.cached ) {
                loader.show();
            }
        });

        this.bind('data', function() {
            len = 0;
        });

        this.bind( 'loadfinish', function(e) {
            if ( !e.galleriaData ) {
                return;
            }
            loader.hide();
            this.finger || info.hide();
            if ( this.hasInfo() && options.showInfo && this.isFullscreen() && !this.finger ) {
                info.fadeIn( options.transition ? options.transitionSpeed : 0 );
            }

            adjustInfo( $(e.imageTarget).width() );
            this.finger && options.showInfo && info.show();
        });

        if ( !Galleria.TOUCH && !options._webkitCursor ) {

            this.addIdleState( this.get('image-nav-left'), { left: -100 });
            this.addIdleState( this.get('image-nav-right'), { right: -100 });
            this.addIdleState( this.get('info'), { opacity: 0 });
        }

        this.$('container').css({
            width: options.width,
            height: 'auto'
        });

        if (options._webkitCursor && Galleria.WEBKIT && !Galleria.TOUCH) {
            this.$('image-nav-right,image-nav-left').addClass('cur');
        }

        if (Galleria.TOUCH) {
            this.setOptions({
                transition: 'fadeslide',
                initialTransition: false
            });
        }

        this.$('close').on('click:fast', function() {
            self.exitFullscreen();
        });

        if ( Galleria.History && HASH ) {
            stage.css('visibility', 'visible');
            thumbnails.css('opacity', 0);
            this.$( 'preloader' ).hide();
            this.enterFullscreen(function() {
                this.show( parseInt(HASH, 10) );
            });
        }

        var timer = null;
        var onResize = function( e ) {
          timer = null;
          if ( self.isFullscreen() ) {
              if ( self.getActiveImage() ) {
                  adjustInfo( self.getActiveImage().width );
              }
              return;
          }

          var nw = thumbContainer.width();

          if( nw !== width ) {
              width = nw;
              masonry( thumbnails, {
                  width:colWidth,
                  delay: 50,
                  debug: true,
                  onheight: function() {
                      target.height( thumbnails.height() );
                  }
              });
          }
        }

        $(window).resize( function() {
            if ( timer ) {
                clearTimeout(timer);
            }
            timer = setTimeout(onResize, 200);
        })
        onResize();
    }
});

    return Galleria;
}));
