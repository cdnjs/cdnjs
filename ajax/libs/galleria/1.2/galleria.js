/**
 * @preserve Galleria v 1.2 2011-02-18
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */

/*global jQuery, navigator, Galleria, Image */

(function( $ ) {

// some references
var undef,
    window = this,
    doc    = window.document,
    $doc   = $( doc ),

// internal constants
    DEBUG = false,
    NAV   = navigator.userAgent.toLowerCase(),
    HASH  = window.location.hash.replace(/#\//, ''),
    CLICK = function() {
        // use this to make touch devices snappier
        return Galleria.TOUCH ? 'touchstart' : 'click';
    },
    IE    = (function() {

        var v = 3,
            div = doc.createElement( 'div' ),
            all = div.getElementsByTagName( 'i' );

        do {
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
        } while ( all[0] );

        return v > 4 ? v : undef;

    }() ),
    DOM   = function() {
        return {
            html:  doc.documentElement,
            body:  doc.body,
            head:  doc.getElementsByTagName('head')[0],
            title: doc.title
        };
    },

    // list of Galleria events
    _eventlist = 'data ready thumbnail loadstart loadfinish image themeload play pause progress ' + 
              'fullscreen_enter fullscreen_exit idle_enter idle_exit rescale ' +
              'lightbox_open lightbox_close lightbox_image',

    _events = (function() {

        var evs = [];

        $.each( _eventlist.split(' '), function( i, ev ) {
            evs.push( ev );

            // legacy events
            if ( /_/.test( ev ) ) {
                evs.push( ev.replace( /_/g, '' ) );
            }
        });

        return evs;

    }()),

    // legacy options
    // allows the old my_setting syntax and converts it to camel case

    _legacyOptions = function( options ) {

        var n;

        if ( typeof options !== 'object' ) {

            // return whatever it was...
            return options;
        }

        $.each( options, function( key, value ) {
            if ( /^[a-z]+_/.test( key ) ) {
                n = '';
                $.each( key.split('_'), function( i, k ) {
                    n += i > 0 ? k.substr( 0, 1 ).toUpperCase() + k.substr( 1 ) : k;
                });
                options[ n ] = value;
                delete options[ key ];
            }
        });

        return options;
    },

    _patchEvent = function( type ) {

        // allow 'image' instead of Galleria.IMAGE
        if ( $.inArray( type, _events ) > -1 ) {
            return Galleria[ type.toUpperCase() ];
        }

        return type;
    },

    // the internal timeouts object
    // provides helper methods for controlling timeouts
    _timeouts = {

        trunk: {},

        add: function( id, fn, delay, loop ) {
            loop = loop || false;
            this.clear( id );
            if ( loop ) {
                var old = fn;
                fn = function() {
                    old();
                    _timeouts.add( id, fn, delay );
                };
            }
            this.trunk[ id ] = window.setTimeout( fn, delay );
        },

        clear: function( id ) {

            var del = function( i ) {
                window.clearTimeout( this.trunk[ i ] );
                delete this.trunk[ i ];
            }, i;

            if ( !!id && id in this.trunk ) {
                del.call( _timeouts, id );

            } else if ( typeof id === 'undefined' ) {
                for ( i in this.trunk ) {
                    if ( this.trunk.hasOwnProperty( i ) ) {
                        del.call( _timeouts, i );
                    }
                }
            }
        }
    },

    // the internal gallery holder
    _galleries = [],

    // the Utils singleton
    Utils = (function() {

        return {

            array : function( obj ) {
                return Array.prototype.slice.call(obj);
            },

            create : function( className, nodeName ) {
                nodeName = nodeName || 'div';
                var elem = doc.createElement( nodeName );
                elem.className = className;
                return elem;
            },

            forceStyles : function( elem, styles ) {
                elem = $(elem);
                if ( elem.attr( 'style' ) ) {
                    elem.data( 'styles', elem.attr( 'style' ) ).removeAttr( 'style' );
                }
                elem.css( styles );
            },

            revertStyles : function() {
                $.each( Utils.array( arguments ), function( i, elem ) {

                    elem = $( elem ).removeAttr( 'style' );

                    if ( elem.data( 'styles' ) ) {
                        elem.attr( 'style', elem.data('styles') ).data( 'styles', null );
                    }
                });
            },

            moveOut : function( elem ) {
                Utils.forceStyles( elem, {
                    position: 'absolute',
                    left: -10000
                });
            },

            moveIn : function() {
                Utils.revertStyles.apply( Utils, Utils.array( arguments ) );
            },

            hide : function( elem, speed, callback ) {
                elem = $(elem);

                // save the value if not exist
                if (! elem.data('opacity') ) {
                    elem.data('opacity', elem.css('opacity') );
                }

                // always hide
                var style = { opacity: 0 };

                if (speed) {
                    elem.stop().animate( style, speed, callback );
                } else {
                    elem.css( style );
                }
            },

            show : function( elem, speed, callback ) {
                elem = $(elem);

                // bring back saved opacity
                var saved = parseFloat( elem.data('opacity') ) || 1,
                    style = { opacity: saved };

                // reset save if opacity === 1
                if (saved === 1) {
                    elem.data('opacity', null);
                }

                // animate or toggle
                if (speed) {
                    elem.stop().animate( style, speed, callback );
                } else {
                    elem.css( style );
                }
            },

            addTimer : function() {
                _timeouts.add.apply( _timeouts, Utils.array( arguments ) );
                return this;
            },

            clearTimer : function() {
                _timeouts.clear.apply( _timeouts, Utils.array( arguments ) );
                return this;
            },

            wait : function(options) {
                options = $.extend({
                    until : function() { return false; },
                    success : function() {},
                    error : function() { Galleria.raise('Could not complete wait function.'); },
                    timeout: 3000
                }, options);

                var start = Utils.timestamp(),
                    elapsed,
                    now,
                    fn = function() {
                        now = Utils.timestamp();
                        elapsed = now - start;
                        if ( options.until( elapsed ) ) {
                            options.success();
                            return false;
                        }

                        if (now >= start + options.timeout) {
                            options.error();
                            return false;
                        }
                        window.setTimeout(fn, 2);
                    };

                window.setTimeout(fn, 2);
            },

            toggleQuality : function( img, force ) {

                if ( IE !== 7 || IE !== 8  || !img ) {
                    return;
                }

                if ( typeof force === 'undefined' ) {
                    force = img.style.msInterpolationMode === 'nearest-neighbor';
                }

                img.style.msInterpolationMode = force ? 'bicubic' : 'nearest-neighbor';
            },

            insertStyleTag : function( styles ) {
                var style = doc.createElement( 'style' );
                DOM().head.appendChild( style );

                if ( style.styleSheet ) { // IE
                    style.styleSheet.cssText = styles;
                } else {
                    var cssText = doc.createTextNode( styles );
                    style.appendChild( cssText );
                }
            },

            // a loadscript method that works for local scripts
            loadScript: function( url, callback ) {
                var done = false,
                    script = $('<scr'+'ipt>').attr({
                        src: url,
                        async: true
                    }).get(0);

               // Attach handlers for all browsers
               script.onload = script.onreadystatechange = function() {
                   if ( !done && (!this.readyState ||
                       this.readyState === 'loaded' || this.readyState === 'complete') ) {
                       done = true;

                       if (typeof callback === 'function') {
                           callback.call( this, this );
                       }

                       // Handle memory leak in IE
                       script.onload = script.onreadystatechange = null;
                   }
               };

               var s = doc.getElementsByTagName( 'script' )[0];
               s.parentNode.insertBefore( script, s );
            },

            // parse anything into a number
            parseValue: function( val ) {
                if (typeof val === 'number') {
                    return val;
                } else if (typeof val === 'string') {
                    var arr = val.match(/\-?\d/g);
                    return arr && arr.constructor === Array ? parseInt( arr.join(''), 10 ) : 0;
                } else {
                    return 0;
                }
            },

            // timestamp abstraction
            timestamp: function() {
                return new Date().getTime();
            },

            // this is pretty crap, but works for now
            // it will add a callback, but it can't guarantee that the styles can be fetched
            // using getComputedStyle further checking needed, possibly a dummy element
            loadCSS : function( href, id, callback ) {

                var link,
                    ready = false,
                    length;

                // look for manual css
                $('link[rel=stylesheet]').each(function() {
                    if ( new RegExp( href ).test( this.href ) ) {
                        link = this;
                        return false;
                    }
                });

                if ( typeof id === 'function' ) {
                    callback = id;
                    id = undef;
                }

                callback = callback || function() {}; // dirty

                // if already present, return
                if ( link ) {
                    callback.call( link, link );
                    return link;
                }

                // save the length of stylesheets to check against
                length = doc.styleSheets.length;

                // add timestamp if DEBUG is true
                if ( DEBUG ) {
                    href += '?' + Utils.timestamp();
                }

                // check for existing id
                if( $('#'+id).length ) {
                    $('#'+id).attr('href', href);
                    length--;
                    ready = true;
                } else {
                    link = $( '<link>' ).attr({
                        rel: 'stylesheet',
                        href: href,
                        id: id
                    }).get(0);

                    window.setTimeout(function() {
                        var styles = $('link[rel="stylesheet"], style');
                        if ( styles.length ) {
                            styles.get(0).parentNode.insertBefore( link, styles[0] );
                        } else {
                            DOM().head.appendChild( link );
                        }

                        if ( IE ) {
                            link.attachEvent( 'onreadystatechange', function(e) {
                                if( link.readyState === 'complete' ) {
                                    ready = true;
                                }
                            });
                        } else {
                            // what to do here? returning for now.
                            ready = true;
                        }
                    }, 10);
                }

                if ( typeof callback === 'function' ) {

                    Utils.wait({
                        until: function() {
                            return ready && doc.styleSheets.length > length;
                        },
                        success: function() {
                            Utils.addTimer( 'css', function() {
                                callback.call( link, link );
                            }, 100);
                        },
                        error: function() {
                            Galleria.raise( 'Theme CSS could not load' );
                        },
                        timeout: 1000
                    });
                }
                return link;
            }
        };
    }()),

    // the transitions holder
    _transitions = {

        fade: function(params, complete) {
            $(params.next).css('opacity', 0).show().animate({
                opacity: 1
            }, params.speed, complete);

            if (params.prev) {
                $(params.prev).css('opacity', 1).show().animate({
                    opacity: 0
                }, params.speed);
            }
        },

        flash: function(params, complete) {
            $(params.next).css('opacity', 0);
            if (params.prev) {
                $(params.prev).animate({
                    opacity: 0
                }, (params.speed / 2), function() {
                    $(params.next).animate({
                        opacity: 1
                    }, params.speed, complete);
                });
            } else {
                $(params.next).animate({
                    opacity: 1
                }, params.speed, complete);
            }
        },

        pulse: function(params, complete) {
            if (params.prev) {
                $(params.prev).hide();
            }
            $(params.next).css('opacity', 0).animate({
                opacity:1
            }, params.speed, complete);
        },

        slide: function(params, complete) {
            var image  = $(params.next).parent(),
                images = this.$('images'), // ??
                width  = this._stageWidth,
                easing = this.getOptions( 'easing' );

            image.css({
                left: width * ( params.rewind ? -1 : 1 )
            });
            images.animate({
                left: width * ( params.rewind ? 1 : -1 )
            }, {
                duration: params.speed,
                queue: false,
                easing: easing,
                complete: function() {
                    images.css('left', 0);
                    image.css('left', 0);
                    complete();
                }
            });
        },

        fadeslide: function(params, complete) {

            var x = 0,
                easing = this.getOptions('easing'),
                distance = this.getStageWidth();

            if (params.prev) {
                x = Utils.parseValue( $(params.prev).css('left') );
                $(params.prev).css({
                    opacity: 1,
                    left: x
                }).animate({
                    opacity: 0,
                    left: x + ( distance * ( params.rewind ? 1 : -1 ) )
                },{
                    duration: params.speed,
                    queue: false,
                    easing: easing
                });
            }

            x = Utils.parseValue( $(params.next).css('left') );

            $(params.next).css({
                left: x + ( distance * ( params.rewind ? -1 : 1 ) ),
                opacity: 0
            }).animate({
                opacity: 1,
                left: x
            }, {
                duration: params.speed,
                complete: complete,
                queue: false,
                easing: easing
            });
        }
    };

/**
    The main Galleria class

    @class
    @constructor

    @example var gallery = new Galleria();

    @author http://aino.se

    @requires jQuery

*/

var Galleria = function() {

    var self = this;

    // the theme used
    this._theme = undef;

    // internal options
    this._options = {};

    // flag for controlling play/pause
    this._playing = false;

    // internal interval for slideshow
    this._playtime = 5000;

    // internal variable for the currently active image
    this._active = null;

    // the internal queue, arrayified
    this._queue = { length: 0 };

    // the internal data array
    this._data = [];

    // the internal dom collection
    this._dom = {};

    // the internal thumbnails array
    this._thumbnails = [];

    // internal init flag
    this._initialized = false;

    // global stagewidth/height
    this._stageWidth = 0;
    this._stageHeight = 0;

    // target holder
    this._target = undef;

    // instance id
    this._id = Math.random();

    // add some elements
    var divs =  'container stage images image-nav image-nav-left image-nav-right ' +
                'info info-text info-title info-description info-author ' +
                'thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right ' +
                'loader counter tooltip',
        spans = 'current total';

    $.each( divs.split(' '), function( i, elemId ) {
        self._dom[ elemId ] = Utils.create( 'galleria-' + elemId );
    });

    $.each( spans.split(' '), function( i, elemId ) {
        self._dom[ elemId ] = Utils.create( 'galleria-' + elemId, 'span' );
    });

    // the internal keyboard object
    // keeps reference of the keybinds and provides helper methods for binding keys
    var keyboard = this._keyboard = {

        keys : {
            'UP': 38,
            'DOWN': 40,
            'LEFT': 37,
            'RIGHT': 39,
            'RETURN': 13,
            'ESCAPE': 27,
            'BACKSPACE': 8,
            'SPACE': 32
        },

        map : {},

        bound: false,

        press: function(e) {
            var key = e.keyCode || e.which;
            if ( key in keyboard.map && typeof keyboard.map[key] === 'function' ) {
                keyboard.map[key].call(self, e);
            }
        },

        attach: function(map) {

            var key, up;

            for( key in map ) {
                if ( map.hasOwnProperty( key ) ) {
                    up = key.toUpperCase();
                    if ( up in keyboard.keys ) {
                        keyboard.map[ keyboard.keys[up] ] = map[key];
                    }
                }
            }
            if ( !keyboard.bound ) {
                keyboard.bound = true;
                $doc.bind('keydown', keyboard.press);
            }
        },

        detach: function() {
            keyboard.bound = false;
            $doc.unbind('keydown', keyboard.press);
        }
    };

    // internal controls for keeping track of active / inactive images
    var controls = this._controls = {

        0: undef,

        1: undef,

        active : 0,

        swap : function() {
            controls.active = controls.active ? 0 : 1;
        },

        getActive : function() {
            return controls[ controls.active ];
        },

        getNext : function() {
            return controls[ 1 - controls.active ];
        }
    };

    // internal carousel object
    var carousel = this._carousel = {

        // shortcuts
        next: self.$('thumb-nav-right'),
        prev: self.$('thumb-nav-left'),

        // cache the width
        width: 0,

        // track the current position
        current: 0,

        // cache max value
        max: 0,

        // save all hooks for each width in an array
        hooks: [],

        // update the carousel
        // you can run this method anytime, f.ex on window.resize
        update: function() {
            var w = 0,
                h = 0,
                hooks = [0];

            $.each( self._thumbnails, function( i, thumb ) {
                if ( thumb.ready ) {
                    w += thumb.outerWidth || $( thumb.container ).outerWidth( true );
                    hooks[ i+1 ] = w;
                    h = Math.max( h, thumb.outerHeight || $( thumb.container).outerHeight( true ) );
                }
            });

            self.$( 'thumbnails' ).css({
                width: w,
                height: h
            });

            carousel.max = w;
            carousel.hooks = hooks;
            carousel.width = self.$( 'thumbnails-list' ).width();
            carousel.setClasses();

            self.$( 'thumbnails-container' ).toggleClass( 'galleria-carousel', w > carousel.width );

            // todo: fix so the carousel moves to the left
        },

        bindControls: function() {

            var i;

            carousel.next.bind( CLICK(), function(e) {
                e.preventDefault();

                if ( self._options.carouselSteps === 'auto' ) {

                    for ( i = carousel.current; i < carousel.hooks.length; i++ ) {
                        if ( carousel.hooks[i] - carousel.hooks[ carousel.current ] > carousel.width ) {
                            carousel.set(i - 2);
                            break;
                        }
                    }

                } else {
                    carousel.set( carousel.current + self._options.carouselSteps);
                }
            });

            carousel.prev.bind( CLICK(), function(e) {
                e.preventDefault();

                if ( self._options.carouselSteps === 'auto' ) {

                    for ( i = carousel.current; i >= 0; i-- ) {
                        if ( carousel.hooks[ carousel.current ] - carousel.hooks[i] > carousel.width ) {
                            carousel.set( i + 2 );
                            break;
                        } else if ( i === 0 ) {
                            carousel.set( 0 );
                            break;
                        }
                    }
                } else {
                    carousel.set( carousel.current - self._options.carouselSteps );
                }
            });
        },

        // calculate and set positions
        set: function( i ) {
            i = Math.max( i, 0 );
            while ( carousel.hooks[i - 1] + carousel.width >= carousel.max && i >= 0 ) {
                i--;
            }
            carousel.current = i;
            carousel.animate();
        },

        // get the last position
        getLast: function(i) {
            return ( i || carousel.current ) - 1;
        },

        // follow the active image
        follow: function(i) {

            //don't follow if position fits
            if ( i === 0 || i === carousel.hooks.length - 2 ) {
                carousel.set( i );
                return;
            }

            // calculate last position
            var last = carousel.current;
            while( carousel.hooks[last] - carousel.hooks[ carousel.current ] <
                   carousel.width && last <= carousel.hooks.length ) {
                last ++;
            }

            // set position
            if ( i - 1 < carousel.current ) {
                carousel.set( i - 1 );
            } else if ( i + 2 > last) {
                carousel.set( i - last + carousel.current + 2 );
            }
        },

        // helper for setting disabled classes
        setClasses: function() {
            carousel.prev.toggleClass( 'disabled', !carousel.current );
            carousel.next.toggleClass( 'disabled', carousel.hooks[ carousel.current ] + carousel.width >= carousel.max );
        },

        // the animation method
        animate: function(to) {
            carousel.setClasses();
            var num = carousel.hooks[ carousel.current ] * -1;

            if ( isNaN( num ) ) {
                return;
            }

            self.$( 'thumbnails' ).animate({
                left: num
            },{
                duration: self._options.carouselSpeed,
                easing: self._options.easing,
                queue: false
            });
        }
    };

    // tooltip control
    // added in 1.2
    var tooltip = this._tooltip = {

        initialized : false,

        open: false,

        init: function() {

            tooltip.initialized = true;

            var css = '.galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3' +
                      'opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}';

            Utils.insertStyleTag(css);

            self.$( 'tooltip' ).css('opacity', 0.8);
            Utils.hide( self.get('tooltip') );

        },

        // move handler
        move: function( e ) {
            var mouseX = self.getMousePosition(e).x,
                mouseY = self.getMousePosition(e).y,
                $elem = self.$( 'tooltip' ),
                x = mouseX,
                y = mouseY,
                height = $elem.outerHeight( true ) + 1,
                width = $elem.outerWidth( true ),
                limitY = height + 15;

            var maxX = self.$( 'container').width() - width - 2,
                maxY = self.$( 'container').height() - height - 2;

            if ( !isNaN(x) && !isNaN(y) ) {

                x += 10;
                y -= 30;

                x = Math.max( 0, Math.min( maxX, x ) );
                y = Math.max( 0, Math.min( maxY, y ) );

                if( mouseY < limitY ) {
                    y = limitY;
                }

                $elem.css({ left: x, top: y });
            }
        },

        // bind elements to the tooltip
        // you can bind multiple elementIDs using { elemID : function } or { elemID : string }
        // you can also bind single DOM elements using bind(elem, string)
        bind: function( elem, value ) {

            if (! tooltip.initialized ) {
                tooltip.init();
            }

            var hover = function( elem, value) {

                tooltip.define( elem, value );

                $( elem ).hover(function() {

                    Utils.clearTimer('switch_tooltip');
                    self.$('container').unbind( 'mousemove', tooltip.move ).bind( 'mousemove', tooltip.move ).trigger( 'mousemove' );
                    tooltip.show( elem );

                    Galleria.utils.addTimer( 'tooltip', function() {
                        self.$( 'tooltip' ).stop().show();
                        Utils.show( self.get( 'tooltip' ), 400 );
                        tooltip.open = true;

                    }, tooltip.open ? 0 : 500);

                }, function() {

                    self.$( 'container' ).unbind( 'mousemove', tooltip.move );
                    Utils.clearTimer( 'tooltip' );

                    self.$( 'tooltip' ).stop();

                    Utils.hide( self.get( 'tooltip' ), 200, function() {

                        self.$( 'tooltip' ).hide();

                        Utils.addTimer('switch_tooltip', function() {
                            tooltip.open = false;
                        }, 1000);
                    });
                });
            };

            if ( typeof value === 'string' ) {
                hover( ( elem in self._dom ? self.get( elem ) : elem ), value );
            } else {
                // asume elemID here
                $.each( elem, function( elemID, val ) {
                    hover( self.get(elemID), val );
                });
            }
        },

        show: function( elem ) {

            elem = $( elem in self._dom ? self.get(elem) : elem );

            var text = elem.data( 'tt' ),
                mouseup = function( e ) {

                    // attach a tiny settimeout to make sure the new tooltip is filled
                    window.setTimeout( (function( ev ) {
                        return function() {
                            tooltip.move( ev );
                        };
                    }( e )), 10);

                    elem.unbind( 'mouseup', mouseup );

                };

            text = typeof text === 'function' ? text() : text;

            if ( ! text ) {
                return;
            }

            self.$( 'tooltip' ).html( text.replace(/\s/, '&nbsp;') );

            // trigger mousemove on mouseup in case of click
            elem.bind( 'mouseup', mouseup );
        },

        define: function( elem, value ) {

            // we store functions, not strings
            if (typeof value !== 'function') {
                var s = value;
                value = function() {
                    return s;
                };
            }

            elem = $( elem in self._dom ? self.get(elem) : elem ).data('tt', value);

            tooltip.show( elem );

        }
    };

    // internal fullscreen control
    // added in 1.195
    // still kind of experimental
    var fullscreen = this._fullscreen = {
        scrolled: 0,
        active: false,
        enter: function(callback) {

            fullscreen.active = true;

            // hide the image until rescale is complete
            Utils.hide( self.getActiveImage() );

            self.$( 'container' ).addClass( 'fullscreen' );

            fullscreen.scrolled = $(window).scrollTop();

            // begin styleforce
            Utils.forceStyles(self.get('container'), {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10000
            });

            var htmlbody = {
                height: '100%',
                overflow: 'hidden',
                margin:0,
                padding:0
            };

            Utils.forceStyles( DOM().html, htmlbody );
            Utils.forceStyles( DOM().body, htmlbody );

            // attach some keys
            self.attachKeyboard({
                escape: self.exitFullscreen,
                right: self.next,
                left: self.prev
            });

            // init the first rescale and attach callbacks
            self.rescale(function() {

                Utils.addTimer('fullscreen_enter', function() {
                    // show the image after 50 ms
                    Utils.show( self.getActiveImage() );

                    if (typeof callback === 'function') {
                        callback.call( self );
                    }

                }, 100);

                self.trigger( Galleria.FULLSCREEN_ENTER );
            });

            // bind the scaling to the resize event
            $(window).resize( function() {
                fullscreen.scale();
            } );
        },

        scale : function() {
            self.rescale();
        },

        exit: function(callback) {

            fullscreen.active = false;

            Utils.hide( self.getActiveImage() );

            self.$('container').removeClass( 'fullscreen' );

            // revert all styles
            Utils.revertStyles( self.get('container'), DOM().html, DOM().body );

            // scroll back
            window.scrollTo(0, fullscreen.scrolled);

            // detach all keyboard events (is this good?)
            self.detachKeyboard();

            self.rescale(function() {
                Utils.addTimer('fullscreen_exit', function() {

                    // show the image after 50 ms
                    Utils.show( self.getActiveImage() );

                    if ( typeof callback === 'function' ) {
                        callback.call( self );
                    }

                }, 50);

                self.trigger( Galleria.FULLSCREEN_EXIT );
            });

            $(window).unbind('resize', fullscreen.scale);
        }
    };

    // the internal idle object for controlling idle states
    var idle = this._idle = {

        trunk: [],

        bound: false,

        add: function(elem, to) {
            if (!elem) {
                return;
            }
            if (!idle.bound) {
                idle.addEvent();
            }
            elem = $(elem);

            var from = {},
                style;

            for ( style in to ) {
                if ( to.hasOwnProperty( style ) ) {
                    from[ style ] = elem.css( style );
                }
            }
            elem.data('idle', {
                from: from,
                to: to,
                complete: true,
                busy: false
            });
            idle.addTimer();
            idle.trunk.push(elem);
        },

        remove: function(elem) {

            elem = jQuery(elem);

            $.each(idle.trunk, function(i, el) {
                if ( el.length && !el.not(elem).length ) {
                    self._idle.show(elem);
                    self._idle.trunk.splice(i, 1);
                }
            });

            if (!idle.trunk.length) {
                idle.removeEvent();
                Utils.clearTimer('idle');
            }
        },

        addEvent : function() {
            idle.bound = true;
            self.$('container').bind('mousemove click', idle.showAll );
        },

        removeEvent : function() {
            idle.bound = false;
            self.$('container').unbind('mousemove click', idle.showAll );
        },

        addTimer : function() {
            Utils.addTimer('idle', function() {
                self._idle.hide();
            }, self._options.idleTime );
        },

        hide : function() {
            self.trigger( Galleria.IDLE_ENTER );

            $.each( idle.trunk, function(i, elem) {

                var data = elem.data('idle');

                if (! data) {
                    return;
                }

                elem.data('idle').complete = false;

                elem.stop().animate(data.to, {
                    duration: self._options.idleSpeed,
                    queue: false,
                    easing: 'swing'
                });
            });
        },

        showAll : function() {

            Utils.clearTimer('idle');

            $.each(self._idle.trunk, function( i, elem ) {
                self._idle.show( elem );
            });
        },

        show: function(elem) {

            var data = elem.data('idle');

            if (!data.busy && !data.complete) {

                data.busy = true;

                self.trigger( Galleria.IDLE_EXIT );

                Utils.clearTimer( 'idle' );

                elem.stop().animate(data.from, {
                    duration: self._options.idleSpeed/2,
                    queue: false,
                    easing: 'swing',
                    complete: function() {
                        $(this).data('idle').busy = false;
                        $(this).data('idle').complete = true;
                    }
                });
            }
            idle.addTimer();
        }
    };

    // internal lightbox object
    // creates a predesigned lightbox for simple popups of images in galleria
    var lightbox = this._lightbox = {

        width : 0,

        height : 0,

        initialized : false,

        active : null,

        image : null,

        elems : {},

        init : function() {

            // trigger the event
            self.trigger( Galleria.LIGHTBOX_OPEN );

            if ( lightbox.initialized ) {
                return;
            }
            lightbox.initialized = true;

            // create some elements to work with
            var elems = 'overlay box content shadow title info close prevholder prev nextholder next counter image',
                el = {},
                op = self._options,
                css = '',
                abs = 'position:absolute;',
                prefix = 'lightbox-',
                cssMap = {
                    overlay:    'position:fixed;display:none;opacity:'+op.overlayOpacity+';filter:alpha(opacity='+(op.overlayOpacity*100)+
                                ');top:0;left:0;width:100%;height:100%;background:'+op.overlayBackground+';z-index:99990',
                    box:        'position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991',
                    shadow:     abs+'background:#000;width:100%;height:100%;',
                    content:    abs+'background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden',
                    info:       abs+'bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px',
                    close:      abs+'top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999',
                    image:      abs+'top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;',
                    prevholder: abs+'width:50%;top:0;bottom:40px;cursor:pointer;',
                    nextholder: abs+'width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;',
                    prev:       abs+'top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;line-height:40px;text-align:center;color:#000',
                    next:       abs+'top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;line-height:40px;text-align:center;color:#000',
                    title:      'float:left',
                    counter:    'float:right;margin-left:8px;'
                },
                hover = function(elem) {
                    return elem.hover(
                        function() { $(this).css( 'color', '#bbb' ); },
                        function() { $(this).css( 'color', '#444' ); }
                    );
                },
                appends = {};

            // IE8 fix for IE's transparent background event "feature"
            if ( IE === 8 ) {
                cssMap.nextholder += 'background:#000;filter:alpha(opacity=0);';
                cssMap.prevholder += 'background:#000;filter:alpha(opacity=0);';
            }

            // create and insert CSS
            $.each(cssMap, function( key, value ) {
                css += '.galleria-'+prefix+key+'{'+value+'}';
            });

            Utils.insertStyleTag( css );

            // create the elements
            $.each(elems.split(' '), function( i, elemId ) {
                self.addElement( 'lightbox-' + elemId );
                el[ elemId ] = lightbox.elems[ elemId ] = self.get( 'lightbox-' + elemId );
            });

            // initiate the image
            lightbox.image = new Galleria.Picture();

            // append the elements
            $.each({
                    box: 'shadow content close prevholder nextholder',
                    info: 'title counter',
                    content: 'info image',
                    prevholder: 'prev',
                    nextholder: 'next'
                }, function( key, val ) {
                    var arr = [];
                    $.each( val.split(' '), function( i, prop ) {
                        arr.push( prefix + prop );
                    });
                    appends[ prefix+key ] = arr;
            });

            self.append( appends );

            $( el.image ).append( lightbox.image.container );

            $( DOM().body ).append( el.overlay, el.box );

            // add the prev/next nav and bind some controls

            hover( $( el.close ).bind( CLICK(), lightbox.hide ).html('&#215;') );

            $.each( ['Prev','Next'], function(i, dir) {

                var $d = $( el[ dir.toLowerCase() ] ).html( /v/.test( dir ) ? '&#8249;&nbsp;' : '&nbsp;&#8250;' ),
                    $e = $( el[ dir.toLowerCase()+'holder'] );

                $e.bind( CLICK(), function() {
                    lightbox[ 'show' + dir ]();
                });

                // IE7 will simply show the nav
                if ( IE < 8 ) {
                    $d.show();
                    return;
                }

                $e.hover( function() {
                    $d.show();
                }, function(e) {
                    $d.stop().fadeOut( 200 );
                });

            });
            $( el.overlay ).bind( CLICK(), lightbox.hide );

        },

        rescale: function(event) {

            // calculate
             var width = Math.min( $(window).width()-40, lightbox.width ),
                height = Math.min( $(window).height()-60, lightbox.height ),
                ratio = Math.min( width / lightbox.width, height / lightbox.height ),
                destWidth = ( lightbox.width * ratio ) + 40,
                destHeight = ( lightbox.height * ratio ) + 60,
                to = {
                    width: destWidth,
                    height: destHeight,
                    marginTop: Math.ceil( destHeight / 2 ) *- 1,
                    marginLeft: Math.ceil( destWidth / 2 ) *- 1
                };

            // if rescale event, don't animate
            if ( event ) {
                $( lightbox.elems.box ).css( to );
            } else {
                $( lightbox.elems.box ).animate(
                    to,
                    self._options.lightboxTransitionSpeed,
                    self._options.easing,
                    function() {
                        var image = lightbox.image,
                            speed = self._options.lightboxFadeSpeed;

                        self.trigger({
                            type: Galleria.LIGHTBOX_IMAGE,
                            imageTarget: image.image
                        });

                        image.show();
                        Utils.show( image.image, speed );
                        Utils.show( lightbox.elems.info, speed );
                    }
                );
            }
        },

        hide: function() {

            // remove the image
            lightbox.image.image = null;

            $(window).unbind('resize', lightbox.rescale);

            $( lightbox.elems.box ).hide();

            Utils.hide( lightbox.elems.info );

            Utils.hide( lightbox.elems.overlay, 200, function() {
                $( this ).hide().css( 'opacity', self._options.overlayOpacity );
                self.trigger( Galleria.LIGHTBOX_CLOSE );
            });
        },

        showNext: function() {
            lightbox.show( self.getNext( lightbox.active ) );
        },

        showPrev: function() {
            lightbox.show( self.getPrev( lightbox.active ) );
        },

        show: function(index) {

            lightbox.active = index = typeof index === 'number' ? index : self.getIndex();

            if ( !lightbox.initialized ) {
                lightbox.init();
            }

            $(window).unbind('resize', lightbox.rescale );

            var data = self.getData(index),
                total = self.getDataLength();

            Utils.hide( lightbox.elems.info );

            lightbox.image.load( data.image, function( image ) {

                lightbox.width = image.original.width;
                lightbox.height = image.original.height;

                $( image.image ).css({
                    width: '100.5%',
                    height: '100.5%',
                    top: 0,
                    zIndex: 99998,
                    opacity: 0
                });

                lightbox.elems.title.innerHTML = data.title;
                lightbox.elems.counter.innerHTML = (index + 1) + ' / ' + total;
                $(window).resize( lightbox.rescale );
                lightbox.rescale();
            });

            $( lightbox.elems.overlay ).show();
            $( lightbox.elems.box ).show();
        }
    };

    return this;
};

// end Galleria constructor

Galleria.prototype = {

    // bring back the constructor reference

    constructor: Galleria,

    /**
        Use this function to initialize the gallery and start loading.
        Should only be called once per instance.

        @param {HTMLElement} target The target element
        @param {Object} options The gallery options

        @returns Instance
    */

    init: function( target, options ) {

        var self = this;

        options = _legacyOptions( options );

        // save the instance
        _galleries.push( this );

        // save the original ingredients
        this._original = {
            target: target,
            options: options,
            data: null
        };

        // save the target here
        this._target = this._dom.target = target.nodeName ? target : $( target ).get(0);

        // raise error if no target is detected
        if ( !this._target ) {
             Galleria.raise('Target not found.');
             return;
        }

        // apply options
        this._options = {
            autoplay: false,
            carousel: true,
            carouselFollow: true,
            carouselSpeed: 400,
            carouselSteps: 'auto',
            clicknext: false,
            dataConfig : function( elem ) { return {}; },
            dataSelector: 'img',
            dataSource: this._target,
            debug: undef,
            easing: 'galleria',
            extend: function(options) {},
            height: 'auto',
            idleTime: 3000,
            idleSpeed: 200,
            imageCrop: false,
            imageMargin: 0,
            imagePan: false,
            imagePanSmoothness: 12,
            imagePosition: '50%',
            keepSource: false,
            lightboxFadeSpeed: 200,
            lightboxTransition_speed: 500,
            linkSourceTmages: true,
            maxScaleRatio: undef,
            minScaleRatio: undef,
            overlayOpacity: 0.85,
            overlayBackground: '#0b0b0b',
            pauseOnInteraction: true,
            popupLinks: false,
            preload: 2,
            queue: true,
            show: 0,
            showInfo: true,
            showCounter: true,
            showImagenav: true,
            thumbCrop: true,
            thumbEventType: CLICK(),
            thumbFit: true,
            thumbMargin: 0,
            thumbQuality: 'auto',
            thumbnails: true,
            transition: 'fade',
            transitionInitial: undef,
            transitionSpeed: 400,
            width: 'auto'
        };

        // apply debug
        if ( options && options.debug === true ) {
            DEBUG = true;
        }

        // hide all content
        $( this._target ).children().hide();

        // now we just have to wait for the theme...
        // is 5 seconds enough?
        if ( Galleria.theme ) {
            this._init();
        } else {
            Utils.addTimer('themeload', function() {
                Galleria.raise( 'No theme found.', true);
            }, 5000);

            $doc.one( Galleria.THEMELOAD, function() {
                Utils.clearTimer( 'themeload' );
                self._init.call( self );
            });
        }
    },

    // the internal _init is called when the THEMELOAD event is triggered
    // this method should only be called once per instance
    // for manipulation of data, use the .load method

    _init: function() {
        var self = this;
        if ( this._initialized ) {
            Galleria.raise( 'Init failed: Gallery instance already initialized.' );
            return this;
        }

        this._initialized = true;

        if ( !Galleria.theme ) {
            Galleria.raise( 'Init failed: No theme found.' );
            return this;
        }

        // merge the theme & caller options
        $.extend( true, this._options, Galleria.theme.defaults, this._original.options );

        // bind the gallery to run when data is ready
        this.bind( Galleria.DATA, function() {

            // save the new data
            this._original.data = this._data;

            // lets show the counter here
            this.get('total').innerHTML = this.getDataLength();

            // cache the container
            var $container = this.$( 'container' );

            // the gallery is ready, let's just wait for the css
            var num = { width: 0, height: 0 };
            var testElem =  Utils.create('galleria-image');

            // check container and thumbnail height
            Utils.wait({
                until: function() {

                    // keep trying to get the value
                    $.each(['width', 'height'], function( i, m ) {

                        // first check if options is set

                        if ( self._options[ m ] && typeof self._options[ m ] === 'number' ) {
                            num[ m ] = self._options[ m ];
                        } else {

                            // else extract the measures in the following order:

                            num[m] = Utils.parseValue( $container.css( m ) ) ||         // 1. the container css
                                     Utils.parseValue( self.$( 'target' ).css( m ) ) || // 2. the target css
                                     $container[ m ]() ||                               // 3. the container jQuery method
                                     self.$( 'target' )[ m ]();                         // 4. the container jQuery method
                        }

                    });

                    var thumbHeight = function() {
                        return true;
                    };

                    // make sure thumbnails have a height as well
                    if ( self._options.thumbnails ) {
                        self.$('thumbnails').append( testElem );
                        thumbHeight = function() {
                            return !!$( testElem ).height();
                        };
                    }
                    return thumbHeight() && num.width && num.height > 50;

                },
                success: function() {

                    // remove the testElem
                    $( testElem ).remove();

                    // apply the new measures
                    $container.width( num.width );
                    $container.height( num.height );

                    // for some strange reason, webkit needs a single setTimeout to play ball
                    if ( Galleria.WEBKIT ) {
                        window.setTimeout( function() {
                            self._run();
                        }, 1);
                    } else {
                        
                        self._run();
                    }
                },
                error: function() {
                    // Height was probably not set, raise a hard error
                    Galleria.raise('Width & Height not found.', true);
                },
                timeout: 2000
            });
        });

        // postrun some stuff after the gallery is ready
        // make sure it only runs once
        var one = false;

        this.bind( Galleria.READY, (function(one) {

            return function() {

                // show counter
                Utils.show( this.$('counter') );

                // bind carousel nav
                if ( this._options.carousel ) {
                    this._carousel.bindControls();
                }

                // start autoplay
                if ( this._options.autoplay ) {

                    this.pause();

                    if ( typeof this._options.autoplay === 'number' ) {
                        this._playtime = this._options.autoplay;
                    }

                    this.trigger( Galleria.PLAY );
                    this._playing = true;
                }

                // if second load, just do the show and return
                if ( one ) {
                    if ( typeof this._options.show === 'number' ) {
                        this.show( this._options.show );
                    }
                    return;
                }

                one = true;

                // bind clicknext
                if ( this._options.clicknext ) {
                    $.each( this._data, function( i, data ) {
                        delete data.link;
                    });
                    this.$( 'stage' ).css({ cursor : 'pointer' }).bind( CLICK(), function(e) {
                        self.next();
                    });
                }

                // initialize the History plugin
                if ( Galleria.History ) {

                    // bind the show method
                    Galleria.History.change(function(e) {

                        // grab history ID
                        var val = parseInt( e.value.replace( /\//, '' ), 10 );

                        // if ID is NaN, the user pressed back from the first image
                        // return to previous address
                        if (isNaN(val)) {
                            window.history.go(-1);

                        // else show the image
                        } else {
                            self.show( val, undef, true );
                        }
                    });
                }

                // call the theme init method
                Galleria.theme.init.call( this, this._options );

                // call the extend option
                this._options.extend.call( this, this._options );

                // show the initial image
                // first test for permalinks in history
                if ( /^[0-9]{1,4}$/.test( HASH ) && Galleria.History ) {
                    this.show( HASH, undef, true );

                } else {
                    this.show( this._options.show );
                }
            };
        }( one )));

        // build the gallery frame
        this.append({
            'info-text' :
                ['info-title', 'info-description', 'info-author'],
            'info' :
                ['info-text'],
            'image-nav' :
                ['image-nav-right', 'image-nav-left'],
            'stage' :
                ['images', 'loader', 'counter', 'image-nav'],
            'thumbnails-list' :
                ['thumbnails'],
            'thumbnails-container' :
                ['thumb-nav-left', 'thumbnails-list', 'thumb-nav-right'],
            'container' :
                ['stage', 'thumbnails-container', 'info', 'tooltip']
        });

        Utils.hide( this.$( 'counter' ).append(
            this.get( 'current' ),
            ' / ',
            this.get( 'total' )
        ) );

        this.setCounter('&#8211;');
        
        Utils.hide( self.get('tooltip') );

        // add images to the controls
        $.each( new Array(2), function(i) {

            // create a new Picture instance
            var image = new Galleria.Picture();

            // apply some styles
            $( image.container ).css({
                position: 'absolute',
                top: 0,
                left: 0
            });

            // append the image
            self.$( 'images' ).append( image.container );

            // reload the controls
            self._controls[i] = image;

        });

        // some forced generic styling
        this.$( 'images' ).css({
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });

        this.$( 'thumbnails, thumbnails-list' ).css({
            overflow: 'hidden',
            position: 'relative'
        });

        // bind image navigation arrows
        this.$( 'image-nav-right, image-nav-left' ).bind( CLICK(), function(e) {

            // tune the clicknext option
            if ( self._options.clicknext ) {
                e.stopPropagation();
            }

            // pause if options is set
            if ( self._options.pause_on_interaction ) {
                self.pause();
            }

            // navigate
            var fn = /right/.test( this.className ) ? 'next' : 'prev';
            self[ fn ]();

        });

        // hide controls if chosen to
        $.each( ['info','counter','image-nav'], function( i, el ) {
            if ( self._options[ 'show_' + el.replace(/-/, '') ] === false ) {
                Utils.moveOut( self.get( el ) );
            }
        });

        // load up target content
        this.load();

        // now it's usually safe to remove the content
        // IE will never stop loading if we remove it, so let's keep it hidden for IE (it's usually fast enough anyway)
        if ( !this._options.keep_source && !IE ) {
            this._target.innerHTML = '';
        }

        // append the gallery frame
        this.$( 'target' ).append( this.get( 'container' ) );

        // parse the carousel on each thumb load
        if ( this._options.carousel ) {
            this.bind( Galleria.THUMBNAIL, function() {
                this.updateCarousel();
            });
        }

        return this;
    },

    // Creates the thumbnails and carousel
    // can be used at any time, f.ex when the data object is manipulated

    _createThumbnails : function() {

        var i,
            src,
            thumb,
            data,

            $container,

            self = this,
            o = this._options,

            // get previously active thumbnail, if exists
            active = (function() {
                var a = self.$('thumbnails').find('.active');
                if ( !a.length ) {
                    return false;
                }
                return a.find('img').attr('src');
            }()),

            // cache the thumbnail option
            optval = typeof o.thumbnails === 'string' ? o.thumbnails.toLowerCase() : null,

            // move some data into the instance
            // for some reason, jQuery cant handle css(property) when zooming in FF, breaking the gallery
            // so we resort to getComputedStyle for browsers who support it
            getStyle = function( prop ) {
                return doc.defaultView && doc.defaultView.getComputedStyle ?
                    doc.defaultView.getComputedStyle( thumb.container, null )[ prop ] :
                    $container.css( prop );
            },

            fake = function(image, index, container) {
                return function() {
                    $( container ).append( image );
                    self.trigger({
                        type: Galleria.THUMBNAIL,
                        thumbTarget: image,
                        index: index
                    });
                };
            },

            onThumbEvent = function( e ) {

                // pause if option is set
                if ( o.pauseOnInteraction ) {
                    self.pause();
                }

                // extract the index from the data
                var index = $( e.currentTarget ).data( 'index' );
                if ( self.getIndex() !== index ) {
                    self.show( index );
                }

                e.preventDefault();
            },

            onThumbLoad = function( thumb ) {

                // scale when ready
                thumb.scale({
                    width:    thumb.data.width,
                    height:   thumb.data.height,
                    crop:     o.thumbCrop,
                    margin:   o.thumbMargin,
                    complete: function( thumb ) {

                        // shrink thumbnails to fit
                        var top = ['left', 'top'],
                            arr = ['Width', 'Height'],
                            m,
                            css;

                        // calculate shrinked positions
                        $.each(arr, function( i, measure ) {
                            m = measure.toLowerCase();
                            if ( (o.thumbCrop !== true || o.thumbCrop === m ) && o.thumbFit ) {
                                css = {};
                                css[ m ] = thumb[ m ];
                                $( thumb.container ).css( css );
                                css = {};
                                css[ top[ i ] ] = 0;
                                $( thumb.image ).css( css );
                            }

                            // cache outer measures
                            thumb[ 'outer' + measure ] = $( thumb.container )[ 'outer' + measure ]( true );
                        });

                        // set high quality if downscale is moderate
                        Utils.toggleQuality( thumb.image,
                            o.thumbQuality === true ||
                            ( o.thumbQuality === 'auto' && thumb.original.width < thumb.width * 3 )
                        );

                        // trigger the THUMBNAIL event
                        self.trigger({
                            type: Galleria.THUMBNAIL,
                            thumbTarget: thumb.image,
                            index: thumb.data.order
                        });
                    }
                });
            };

        this._thumbnails = [];

        this.$( 'thumbnails' ).empty();

        // loop through data and create thumbnails
        for( i = 0; this._data[ i ]; i++ ) {

            data = this._data[ i ];

            if ( o.thumbnails === true ) {

                // add a new Picture instance
                thumb = new Galleria.Picture(i);

                // get source from thumb or image
                src = data.thumb || data.image;

                // append the thumbnail
                this.$( 'thumbnails' ).append( thumb.container );

                // cache the container
                $container = $( thumb.container );

                thumb.data = {
                    width  : Utils.parseValue( getStyle( 'width' ) ),
                    height : Utils.parseValue( getStyle( 'height' ) ),
                    order  : i
                };

                // grab & reset size for smoother thumbnail loads
                if ( o.thumbFit && o.thumbCrop !== true ) {
                    $container.css( { width: 0, height: 0 } );
                } else {
                    $container.css( { width: thumb.data.width, height: thumb.data.height } );
                }

                // load the thumbnail
                thumb.load( src, onThumbLoad );

                // preload all images here
                if ( o.preload === 'all' ) {
                    thumb.add( data.image );
                }

            // create empty spans if thumbnails is set to 'empty'
            } else if ( optval === 'empty' || optval === 'numbers' ) {

                thumb = {
                    container:  Utils.create( 'galleria-image' ),
                    image: Utils.create( 'img', 'span' ),
                    ready: true
                };

                // create numbered thumbnails
                if ( optval === 'numbers' ) {
                    $( thumb.image ).text( i + 1 );
                }

                this.$( 'thumbnails' ).append( thumb.container );

                // we need to "fake" a loading delay before we append and trigger
                // 50+ should be enough

                window.setTimeout( ( fake )( thumb.image, i, thumb.container ), 50 + ( i*20 ) );

            // create null object to silent errors
            } else {
                thumb = {
                    container: null,
                    image: null
                };
            }

            // add events for thumbnails
            // you can control the event type using thumb_event_type
            // we'll add the same event to the source if it's kept

            $( thumb.container ).add( o.keepSource && o.linkSourceImages ? data.original : null )
                .data('index', i).bind( o.thumbEventType, onThumbEvent );

            if (active === src) {
                $( thumb.container ).addClass( 'active' );
            }

            this._thumbnails.push( thumb );
        }
	},

    // the internal _run method should be called after loading data into galleria
    // makes sure the gallery has proper measurements before triggering ready
    _run : function() {

        var self = this;

		self._createThumbnails();

        // make sure we have a stageHeight && stageWidth

        Utils.wait({

            until: function() {
                
                // Opera crap
                if ( Galleria.OPERA ) {
                    self.$( 'stage' ).css( 'display', 'inline-block' );
                }
                
                self._stageWidth  = self.$( 'stage' ).width();
                self._stageHeight = self.$( 'stage' ).height();
                
                return( self._stageWidth && 
                        self._stageHeight > 50 ); // what is an acceptable height?
            },

            success: function() {
                self.trigger( Galleria.READY );
            },

            error: function() {
                Galleria.raise('Stage measures not found', true);
            }

        });
    },

    /**
        Loads data into the gallery.
        You can call this method on an existing gallery to reload the gallery with new data.

        @param {Array|string} source Optional JSON array of data or selector of where to find data in the document.
        Defaults to the Galleria target or dataSource option.

        @param {string} selector Optional element selector of what elements to parse.
        Defaults to 'img'.

        @param {Function} [config] Optional function to modify the data extraction proceedure from the selector.
        See the data_config option for more information.

        @returns Instance
    */

    load : function( source, selector, config ) {

        var self = this;

        // empty the data array
        this._data = [];

        // empty the thumbnails
        this._thumbnails = [];
        this.$('thumbnails').empty();

        // shorten the arguments
        if ( typeof selector === 'function' ) {
            config = selector;
            selector = null;
        }

        // use the source set by target
        source = source || this._options.dataSource;

        // use selector set by option
        selector = selector || this._options.dataSelector;

        // use the data_config set by option
        config = config || this._options.dataConfig;

        // check if the data is an array already
        if ( source.constructor === Array ) {
            if ( this.validate( source ) ) {

                this._data = source;
                this._parseData().trigger( Galleria.DATA );

            } else {
                Galleria.raise( 'Load failed: JSON Array not valid.' );
            }
            return this;
        }
        // loop through images and set data
        $( source ).find( selector ).each( function( i, img ) {
            img = $( img );
            var data = {},
                parent = img.parent(),
                href = parent.attr( 'href' );

            // check if it's a link to another image
            if ( /\.(png|gif|jpg|jpeg)(\?.*)?$/i.test(href) ) {
                data.image = href;

            // else assign the href as a link if it exists
            } else if ( href ) {
                data.link = href;
            }

            // mix default extractions with the hrefs and config
            // and push it into the data array
            self._data.push( $.extend({

                title:       img.attr('title'),
                thumb:       img.attr('src'),
                image:       img.attr('src'),
                description: img.attr('alt'),
                link:        img.attr('longdesc'),
                original:    img.get(0) // saved as a reference

            }, data, config( img ) ) );

        });
        // trigger the DATA event and return
        if ( this.getDataLength() ) {
            this.trigger( Galleria.DATA );
        } else {
            Galleria.raise('Load failed: no data found.');
        }
        return this;

    },

    // make sure the data works properly
    _parseData : function() {

        var self = this;

        // copy image as thumb if no thumb exists
        $.each( this._data, function( i, data ) {
            if ( 'thumb' in data === false ) {
                self._data[ i ].thumb = data.image;
            }
        });

        return this;
    },

    /**
        Adds and/or removes images from the gallery
		Works just like Array.splice
		https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice

        @example this.splice( 2, 4 ); // removes 4 images after the second image

        @returns Instance
    */

	splice: function() {
		Array.prototype.splice.apply( this._data, Utils.array( arguments ) );
		return this._parseData()._createThumbnails();
	},

	/**
        Append images to the gallery
		Works just like Array.push
		https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push

        @example this.push({
            image: 'image1.jpg'
        }); // appends the image to the gallery

        @returns Instance
    */

	push: function() {
		Array.prototype.push.apply( this._data, Utils.array( arguments ) );
		return this._parseData()._createThumbnails();
	},

    _getActive: function() {
        return this._controls.getActive();
    },

    validate : function( data ) {
        // todo: validate a custom data array
        return true;
    },

    /**
        Bind any event to Galleria

        @param {string} type The Event type to listen for
        @param {Function} fn The function to execute when the event is triggered

        @example this.bind( 'image', function() { Galleria.log('image shown') });

        @returns Instance
    */

    bind : function(type, fn) {

        // allow 'image' instead of Galleria.IMAGE
        type = _patchEvent( type );

        this.$( 'container' ).bind( type, this.proxy(fn) );
        return this;
    },

    /**
        Unbind any event to Galleria

        @param {string} type The Event type to forget

        @returns Instance
    */

    unbind : function(type) {

        type = _patchEvent( type );

        this.$( 'container' ).unbind( type );
        return this;
    },

    /**
        Manually trigger a Galleria event

        @param {string} type The Event to trigger

        @returns Instance
    */

    trigger : function( type ) {

        type = typeof type === 'object' ?
            $.extend( type, { scope: this } ) :
            { type: _patchEvent( type ), scope: this };

        this.$( 'container' ).trigger( type );

        return this;
    },

    /**
        Assign an "idle state" to any element.
        The idle state will be applied after a certain amount of idle time
        Useful to hide f.ex navigation when the gallery is inactive

        @param {HTMLElement|string} elem The Dom node or selector to apply the idle state to
        @param {Object} styles the CSS styles to apply

        @example addIdleState( this.get('image-nav'), { opacity: 0 });
        @example addIdleState( '.galleria-image-nav', { top: -200 });

        @returns Instance
    */

    addIdleState: function( elem, styles ) {
        this._idle.add.apply( this._idle, Utils.array( arguments ) );
        return this;
    },

    /**
        Removes any idle state previously set using addIdleState()

        @param {HTMLElement|string} elem The Dom node or selector to remove the idle state from.

        @returns Instance
    */

    removeIdleState: function( elem ) {
        this._idle.remove.apply( this._idle, Utils.array( arguments ) );
        return this;
    },

    /**
        Force Galleria to enter idle mode.

        @returns Instance
    */

    enterIdleMode: function() {
        this._idle.hide();
        return this;
    },

    /**
        Force Galleria to exit idle mode.

        @returns Instance
    */

    exitIdleMode: function() {
        this._idle.showAll();
        return this;
    },

    /**
        Enter FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns Instance
    */

    enterFullscreen: function( callback ) {
        this._fullscreen.enter.apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Exits FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns Instance
    */

    exitFullscreen: function( callback ) {
        this._fullscreen.exit.apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Toggle FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied or removed.

        @returns Instance
    */

    toggleFullscreen: function( callback ) {
        this._fullscreen[ this.isFullscreen() ? 'exit' : 'enter'].apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Adds a tooltip to any element.
        You can also call this method with an object as argument with elemID:value pairs to apply tooltips to (see examples)

        @param {HTMLElement} elem The DOM Node to attach the event to
        @param {string|Function} value The tooltip message. Can also be a function that returns a string.

        @example this.bindTooltip( this.get('thumbnails'), 'My thumbnails');
        @example this.bindTooltip( this.get('thumbnails'), function() { return 'My thumbs' });
        @example this.bindTooltip( { image_nav: 'Navigation' });

        @returns Instance
    */

    bindTooltip: function( elem, value ) {
        this._tooltip.bind.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Note: this method is deprecated. Use refreshTooltip() instead.

        Redefine a tooltip.
        Use this if you want to re-apply a tooltip value to an already bound tooltip element.

        @param {HTMLElement} elem The DOM Node to attach the event to
        @param {string|Function} value The tooltip message. Can also be a function that returns a string.

        @returns Instance
    */

    defineTooltip: function( elem, value ) {
        this._tooltip.define.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Refresh a tooltip value.
        Use this if you want to change the tooltip value at runtime, f.ex if you have a play/pause toggle.

        @param {HTMLElement} elem The DOM Node that has a tooltip that should be refreshed

        @returns Instance
    */

    refreshTooltip: function( elem ) {
        this._tooltip.show.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Open a pre-designed lightbox with the currently active image.
        You can control some visuals using gallery options.

        @returns Instance
    */

    openLightbox: function() {
        this._lightbox.show.apply( this._lightbox, Utils.array( arguments ) );
        return this;
    },

    /**
        Close the lightbox.

        @returns Instance
    */

    closeLightbox: function() {
        this._lightbox.hide.apply( this._lightbox, Utils.array( arguments ) );
        return this;
    },

    /**
        Get the currently active image element.

        @returns {HTMLElement} The image element
    */

    getActiveImage: function() {
        return this._getActive().image || undef;
    },

    /**
        Get the currently active thumbnail element.

        @returns {HTMLElement} The thumbnail element
    */

    getActiveThumb: function() {
        return this._thumbnails[ this._active ].image || undef;
    },

    /**
        Get the mouse position relative to the gallery container

        @param e The mouse event

        @example

var gallery = this;
$(document).mousemove(function(e) {
    console.log( gallery.getMousePosition(e).x );
});

        @returns {Object} Object with x & y of the relative mouse postion
    */

    getMousePosition : function(e) {
        return {
            x: e.pageX - this.$( 'container' ).offset().left,
            y: e.pageY - this.$( 'container' ).offset().top
        };
    },

    /**
        Adds a panning effect to the image

        @param img The optional image element. If not specified it takes the currently active image

        @returns Instance
    */

    addPan : function( img ) {

        if ( this._options.imageCrop === false ) {
            return;
        }

        img = $( img || this.getActiveImage() );

        // define some variables and methods
        var self   = this,
            x      = img.width() / 2,
            y      = img.height() / 2,
            destX  = parseInt( img.css( 'left' ), 10 ),
            destY  = parseInt( img.css( 'top' ), 10 ),
            curX   = destX || 0,
            curY   = destY || 0,
            distX  = 0,
            distY  = 0,
            active = false,
            ts     = Utils.timestamp(),
            cache  = 0,
            move   = 0,

            // positions the image
            position = function( dist, cur, pos ) {
                if ( dist > 0 ) {
                    move = Math.round( Math.max( dist * -1, Math.min( 0, cur ) ) );
                    if ( cache !== move ) {

                        cache = move;

                        if ( IE === 8 ) { // scroll is faster for IE
                            img.parent()[ 'scroll' + pos ]( move * -1 );
                        } else {
                            var css = {};
                            css[ pos.toLowerCase() ] = move;
                            img.css(css);
                        }
                    }
                }
            },

            // calculates mouse position after 50ms
            calculate = function(e) {
                if (Utils.timestamp() - ts < 50) {
                    return;
                }
                active = true;
                x = self.getMousePosition(e).x;
                y = self.getMousePosition(e).y;
            },

            // the main loop to check
            loop = function(e) {

                if (!active) {
                    return;
                }

                distX = img.width() - self._stageWidth;
                distY = img.height() - self._stageHeight;
                destX = x / self._stageWidth * distX * -1;
                destY = y / self._stageHeight * distY * -1;
                curX += ( destX - curX ) / self._options.imagePanSmoothness;
                curY += ( destY - curY ) / self._options.imagePanSmoothness;

                position( distY, curY, 'Top' );
                position( distX, curX, 'Left' );

            };

        // we need to use scroll in IE8 to speed things up
        if ( IE === 8 ) {

            img.parent().scrollTop( curY * -1 ).scrollLeft( curX * -1 );
            img.css({
                top: 0,
                left: 0
            });

        }

        // unbind and bind event
        this.$( 'stage' ).unbind( 'mousemove', calculate ).bind( 'mousemove', calculate );

        // loop the loop
        Utils.addTimer('pan', loop, 50, true);

        return this;
    },

    /**
        Brings the scope into any callback

        @param fn The callback to bring the scope into
        @param scope Optional scope to bring

        @example $('#fullscreen').click( this.proxy(function() { this.enterFullscreen(); }) )

        @returns {Function} Return the callback with the gallery scope
    */

    proxy : function( fn, scope ) {
        if ( typeof fn !== 'function' ) {
            return function() {};
        }
        scope = scope || this;
        return function() {
            return fn.apply( scope, Utils.array( arguments ) );
        };
    },

    /**
        Removes the panning effect set by addPan()

        @returns Instance
    */

    removePan: function() {

        // todo: doublecheck IE8

        this.$( 'stage' ).unbind( 'mousemove' );

        Utils.clearTimer( 'pan' );

        return this;
    },

    /**
        Adds an element to the Galleria DOM array.
        When you add an element here, you can access it using element ID in many API calls

        @param {string} id The element ID you wish to use. You can add many elements by adding more arguments.

        @example addElement('mybutton');
        @example addElement('mybutton','mylink');

        @returns Instance
    */

    addElement : function( id ) {

        var dom = this._dom;

        $.each( Utils.array(arguments), function( i, blueprint ) {
           dom[ blueprint ] = Utils.create( 'galleria-' + blueprint );
        });

        return this;
    },

    /**
        Attach keyboard events to Galleria

        @param {Object} map The map object of events.
        Possible keys are 'UP', 'DOWN', 'LEFT', 'RIGHT', 'RETURN', 'ESCAPE', 'BACKSPACE', and 'SPACE'.

        @example

this.attachKeyboard({
    right: this.next,
    left: this.prev,
    up: function() {
        console.log( 'up key pressed' )
    }
});

        @returns Instance
    */

    attachKeyboard : function( map ) {
        this._keyboard.attach.apply( this._keyboard, Utils.array( arguments ) );
        return this;
    },

    /**
        Detach all keyboard events to Galleria

        @returns Instance
    */

    detachKeyboard : function() {
        this._keyboard.detach.apply( this._keyboard, Utils.array( arguments ) );
        return this;
    },

    /**
        Fast helper for appending galleria elements that you added using addElement()

        @param {string} parentID The parent element ID where the element will be appended
        @param {string} childID the element ID that should be appended

        @example this.addElement('myElement');
        this.appendChild( 'info', 'myElement' );

        @returns Instance
    */

    appendChild : function( parentID, childID ) {
        this.$( parentID ).append( this.get( childID ) || childID );
        return this;
    },

    /**
        Fast helper for prepending galleria elements that you added using addElement()

        @param {string} parentID The parent element ID where the element will be prepended
        @param {string} childID the element ID that should be prepended

        @example

this.addElement('myElement');
this.prependChild( 'info', 'myElement' );

        @returns Instance
    */

    prependChild : function( parentID, childID ) {
        this.$( parentID ).prepend( this.get( childID ) || childID );
        return this;
    },

    /**
        Remove an element by blueprint

        @param {string} elemID The element to be removed.
        You can remove multiple elements by adding arguments.

        @returns Instance
    */

    remove : function( elemID ) {
        this.$( Utils.array( arguments ).join(',') ).remove();
        return this;
    },

    // a fast helper for building dom structures
    // leave this out of the API for now

    append : function( data ) {
        var i, j;
        for( i in data ) {
            if ( data.hasOwnProperty( i ) ) {
                if ( data[i].constructor === Array ) {
                    for( j = 0; data[i][j]; j++ ) {
                        this.appendChild( i, data[i][j] );
                    }
                } else {
                    this.appendChild( i, data[i] );
                }
            }
        }
        return this;
    },

    // an internal helper for scaling according to options
    _scaleImage : function( image, options ) {

        options = $.extend({
            width:    this._stageWidth,
            height:   this._stageHeight,
            crop:     this._options.imageCrop,
            max:      this._options.maxScaleRatio,
            min:      this._options.minScaleRatio,
            margin:   this._options.imageMargin,
            position: this._options.imagePosition
        }, options );

       ( image || this._controls.getActive() ).scale( options );

        return this;
    },

    /**
        Updates the carousel,
        useful if you resize the gallery and want to re-check if the carousel nav is needed.

        @returns Instance
    */

    updateCarousel : function() {
        this._carousel.update();
        return this;
    },

    /**
        Rescales the gallery

        @param {number} width The target width
        @param {number} height The target height
        @param {Function} complete The callback to be called when the scaling is complete

        @returns Instance
    */

    rescale : function( width, height, complete ) {

        var self = this;

        // allow rescale(fn)
        if ( typeof width === 'function' ) {
            complete = width;
            width = undef;
        }

        var scale = function() {

            // set stagewidth
            self._stageWidth = width || self.$( 'stage' ).width();
            self._stageHeight = height || self.$( 'stage' ).height();

            // scale the active image
            self._scaleImage();

            if ( self._options.carousel ) {
                self.updateCarousel();
            }

            self.trigger( Galleria.RESCALE );

            if ( typeof complete === 'function' ) {
                complete.call( self );
            }
        };

        if ( Galleria.WEBKIT && !width && !height ) {
            Utils.addTimer( 'scale', scale, 5 );// webkit is too fast
        } else {
            scale.call( self );
        }

        return this;
    },

    /**
        Refreshes the gallery.
        Useful if you change image options at runtime and want to apply the changes to the active image.

        @returns Instance
    */

    refreshImage : function() {
        this._scaleImage();
        if ( this._options.imagePan ) {
            this.addPan();
        }
        return this;
    },

    /**
        Shows an image by index

        @param {number|boolean} index The index to show
        @param {Boolean} rewind A boolean that should be true if you want the transition to go back

        @returns Instance
    */

    show : function( index, rewind, _history ) {

        // do nothing if index is false or queue is false and transition is in progress
        if ( index === false || ( !this._options.queue && this._queue.stalled ) ) {
            return;
        }

        index = Math.max( 0, Math.min( parseInt( index, 10 ), this.getDataLength() - 1 ) );

        rewind = typeof rewind !== 'undefined' ? !!rewind : index < this.getIndex();

        _history = _history || false;

        // do the history thing and return
        if ( !_history && Galleria.History ) {
            Galleria.History.value( index.toString() );
            return;
        }

        this._active = index;

        Array.prototype.push.call( this._queue, {
            index : index,
            rewind : rewind
        });
        if ( !this._queue.stalled ) {
            this._show();
        }

        return this;
    },

    // the internal _show method does the actual showing
    _show : function() {

        // shortcuts
        var self   = this,
            queue  = this._queue[ 0 ],
            data   = this.getData( queue.index );

        if ( !data ) {
            return;
        }

        var src    = data.image,
            active = this._controls.getActive(),
            next   = this._controls.getNext(),
            cached = next.isCached( src ),
            thumb  = this._thumbnails[ queue.index ];

        // to be fired when loading & transition is complete:
        var complete = function() {

            var win;

            // remove stalled
            self._queue.stalled = false;

            // optimize quality
            Utils.toggleQuality( next.image, self._options.imageQuality );

            // swap
            $( active.container ).css({
                zIndex: 0,
                opacity: 0
            });
            $( next.container ).css({
                zIndex: 1,
                opacity: 1
            });
            self._controls.swap();

            // add pan according to option
            if ( self._options.imagePan ) {
                self.addPan( next.image );
            }

            // make the image link
            if ( data.link ) {

                $( next.image ).css({
                    cursor: 'pointer'
                }).bind( CLICK(), function() {

                    // popup link
                    if ( self._options.popupLinks ) {
                        win = window.open( data.link, '_blank' );
                    } else {
                        window.location.href = data.link;
                    }
                });
            }

            // remove the queued image
            Array.prototype.shift.call( self._queue );

            // if we still have images in the queue, show it
            if ( self._queue.length ) {
                self._show();
            }

            // check if we are playing
            self._playCheck();

            // trigger IMAGE event
            self.trigger({
                type:        Galleria.IMAGE,
                index:       queue.index,
                imageTarget: next.image,
                thumbTarget: thumb.image
            });
        };

        // let the carousel follow
        if ( this._options.carousel && this._options.carouselFollow ) {
            this._carousel.follow( queue.index );
        }

        // preload images
        if ( this._options.preload ) {

            var p, i,
                n = this.getNext();

            try {
                for ( i = this._options.preload; i > 0; i-- ) {
                    p = new Galleria.Picture();
                    p.add( self.getData( n ).image );
                    n = self.getNext( n );
                }
            } catch(e) {}
        }

        // show the next image, just in case
        Utils.show( next.container );

        // add active classes
        $( self._thumbnails[ queue.index ].container )
            .addClass( 'active' )
            .siblings( '.active' )
            .removeClass( 'active' );

        // trigger the LOADSTART event
        self.trigger( {
            type: Galleria.LOADSTART,
            cached: cached,
            index: queue.index,
            imageTarget: next.image,
            thumbTarget: thumb.image
        });
        // begin loading the next image
        next.load( src, function( next ) {
            self._scaleImage( next, {

                complete: function( next ) {

                    Utils.show( next.container );

                    // toggle low quality for IE
                    if ( 'image' in active ) {
                        Utils.toggleQuality( active.image, false );
                    }
                    Utils.toggleQuality( next.image, false );

                    // stall the queue
                    self._queue.stalled = true;

                    // remove the image panning, if applied
                    // TODO: rethink if this is necessary
                    self.removePan();

                    // set the captions and counter
                    self.setInfo( queue.index );
                    self.setCounter( queue.index );

                    // trigger the LOADFINISH event
                    self.trigger({
                        type: Galleria.LOADFINISH,
                        cached: cached,
                        index: queue.index,
                        imageTarget: next.image,
                        thumbTarget: self._thumbnails[ queue.index ].image
                    });

                    var transition = active.image === null && self._options.transitionInitial ?
                        self._options.transition_Initial : self._options.transition;

                    // validate the transition
                    if ( transition in _transitions === false ) {

                        complete();

                    } else {
                        var params = {
                            prev:   active.image,
                            next:   next.image,
                            rewind: queue.rewind,
                            speed:  self._options.transitionSpeed || 400
                        };

                        // call the transition function and send some stuff
                        _transitions[ transition ].call(self, params, complete );

                    }
                }
            });
        });
    },

    /**
        Gets the next index

        @param {number} base Optional starting point

        @returns {number} the next index, or the first if you are at the first (looping)
    */

    getNext : function( base ) {
        base = typeof base === 'number' ? base : this.getIndex();
        return base === this.getDataLength() - 1 ? 0 : base + 1;
    },

    /**
        Gets the previous index

        @param {number} base Optional starting point

        @returns {number} the previous index, or the last if you are at the first (looping)
    */

    getPrev : function( base ) {
        base = typeof base === 'number' ? base : this.getIndex();
        return base === 0 ? this.getDataLength() - 1 : base - 1;
    },

    /**
        Shows the next image in line

        @returns Instance
    */

    next : function() {
        if ( this.getDataLength() > 1 ) {
            this.show( this.getNext(), false );
        }
        return this;
    },

    /**
        Shows the previous image in line

        @returns Instance
    */

    prev : function() {
        if ( this.getDataLength() > 1 ) {
            this.show( this.getPrev(), true );
        }
        return this;
    },

    /**
        Retrieve a DOM element by element ID

        @param {string} elemId The delement ID to fetch

        @returns {HTMLElement} The elements DOM node or null if not found.
    */

    get : function( elemId ) {
        return elemId in this._dom ? this._dom[ elemId ] : null;
    },

    /**
        Retrieve a data object

        @param {number} index The data index to retrieve.
        If no index specified it will take the currently active image

        @returns {Object} The data object
    */

    getData : function( index ) {
        return index in this._data ?
            this._data[ index ] : this._data[ this._active ];
    },

    /**
        Retrieve the number of data items

        @returns {number} The data length
    */
    getDataLength : function() {
        return this._data.length;
    },

    /**
        Retrieve the currently active index

        @returns {number|boolean} The active index or false if none found
    */

    getIndex : function() {
        return typeof this._active === 'number' ? this._active : false;
    },

    /**
        Retrieve the stage height

        @returns {number} The stage height
    */

    getStageHeight : function() {
        return this._stageHeight;
    },

    /**
        Retrieve the stage width

        @returns {number} The stage width
    */

    getStageWidth : function() {
        return this._stageWidth;
    },

    /**
        Retrieve the option

        @param {string} key The option key to retrieve. If no key specified it will return all options in an object.

        @returns option or options
    */

    getOptions : function( key ) {
        return typeof key === 'undefined' ? this._options : this._options[ key ];
    },

    /**
        Set options to the instance.
        You can set options using a key & value argument or a single object argument (see examples)

        @param {string} key The option key
        @param {string} value the the options value

        @example setOptions( 'autoplay', true )
        @example setOptions({ autoplay: true });

        @returns Instance
    */

    setOptions : function( key, value ) {
        if ( typeof key === 'object' ) {
            $.extend( this._options, key );
        } else {
            this._options[ key ] = value;
        }
        return this;
    },

    /**
        Starts playing the slideshow

        @param {number} delay Sets the slideshow interval in milliseconds.
        If you set it once, you can just call play() and get the same interval the next time.

        @returns Instance
    */

    play : function( delay ) {

        this._playing = true;

        this._playtime = delay || this._playtime;

        this._playCheck();

        this.trigger( Galleria.PLAY );

        return this;
    },

    /**
        Stops the slideshow if currently playing

        @returns Instance
    */

    pause : function() {

        this._playing = false;

        this.trigger( Galleria.PAUSE );

        return this;
    },

    /**
        Toggle between play and pause events.

        @param {number} delay Sets the slideshow interval in milliseconds.

        @returns Instance
    */

    playToggle : function( delay ) {
        return ( this._playing ) ? this.pause() : this.play( delay );
    },

    /**
        Checks if the gallery is currently playing

        @returns {Boolean}
    */

    isPlaying : function() {
        return this._playing;
    },

    /**
        Checks if the gallery is currently in fullscreen mode

        @returns {Boolean}
    */

    isFullscreen : function() {
        return this._fullscreen.active;
    },

    _playCheck : function() {
        var self = this,
            played = 0,
            interval = 20,
            now = Utils.timestamp(),
			timer_id = 'play' + this._id;

        if ( this._playing ) {

			Utils.clearTimer( timer_id );

            var fn = function() {

                played = Utils.timestamp() - now;
                if ( played >= self._playtime && self._playing ) {
                    Utils.clearTimer( timer_id );
                    self.next();
                    return;
                }
                if ( self._playing ) {

                    // trigger the PROGRESS event
                    self.trigger({
                        type:         Galleria.PROGRESS,
                        percent:      Math.ceil( played / self._playtime * 100 ),
                        seconds:      Math.floor( played / 1000 ),
                        milliseconds: played
                    });

                    Utils.addTimer( timer_id, fn, interval );
                }
            };
            Utils.addTimer( timer_id, fn, interval );
        }
    },

    setIndex: function( val ) {
        this._active = val;
        return this;
    },

    /**
        Manually modify the counter

        @param {number} index Optional data index to fectch,
        if no index found it assumes the currently active index

        @returns Instance
    */

    setCounter: function( index ) {

        if ( typeof index === 'number' ) {
            index++;
        } else if ( typeof index === 'undefined' ) {
            index = this.getIndex()+1;
        }

        this.get( 'current' ).innerHTML = index;

        if ( IE ) { // weird IE bug

            var count = this.$( 'counter' ),
                opacity = count.css( 'opacity' ),
                style = count.attr('style');

            if (opacity === 1) {
                count.attr('style', style.replace(/filter[^\;]+\;/i,''));
            } else {
                this.$( 'counter' ).css( 'opacity', opacity );
            }

        }

        return this;
    },

    /**
        Manually set captions

        @param {number} index Optional data index to fectch and apply as caption,
        if no index found it assumes the currently active index

        @returns Instance
    */

    setInfo : function( index ) {

        var self = this,
            data = this.getData( index );

        $.each( ['title','description','author'], function( i, type ) {

            var elem = self.$( 'info-' + type );

            if ( !!data[type] ) {
                elem[ data[ type ].length ? 'show' : 'hide' ]().html( data[ type ] );
            } else {
               elem.empty().hide();
            }
        });

        return this;
    },

    /**
        Checks if the data contains any captions

        @param {number} index Optional data index to fectch,
        if no index found it assumes the currently active index.

        @returns {boolean}
    */

    hasInfo : function( index ) {

        var check = 'title description'.split(' '),
            i;

        for ( i = 0; check[i]; i++ ) {
            if ( !!this.getData( index )[ check[i] ] ) {
                return true;
            }
        }
        return false;

    },

    jQuery : function( str ) {

        var self = this,
            ret = [];

        $.each( str.split(','), function( i, elemId ) {
            elemId = $.trim( elemId );

            if ( self.get( elemId ) ) {
                ret.push( elemId );
            }
        });

        var jQ = $( self.get( ret.shift() ) );

        $.each( ret, function( i, elemId ) {
            jQ = jQ.add( self.get( elemId ) );
        });

        return jQ;

    },

    /**
        Converts element IDs into a jQuery collection
        You can call for multiple IDs separated with commas.

        @param {string} str One or more element IDs (comma-separated)

        @returns jQuery

        @example this.$('info,container').hide();
    */

    $ : function( str ) {
        return this.jQuery.apply( this, Utils.array( arguments ) );
    }

};

// End of Galleria prototype

// Add events as static variables
$.each( _events, function( i, ev ) {

    // legacy events
    var type = /_/.test( ev ) ? ev.replace( /_/g, '' ) : ev;

    Galleria[ ev.toUpperCase() ] = 'galleria.'+type;

} );

$.extend( Galleria, {

    // Browser helpers
    IE9:     IE === 9,
    IE8:     IE === 8,
    IE7:     IE === 7,
    IE6:     IE === 6,
    IE:      !!IE,
    WEBKIT:  /webkit/.test( NAV ),
    SAFARI:  /safari/.test( NAV ),
    CHROME:  /chrome/.test( NAV ),
    QUIRK:   ( IE && doc.compatMode && doc.compatMode === "BackCompat" ),
    MAC:     /mac/.test( navigator.platform.toLowerCase() ),
    OPERA:   !!window.opera,
    IPHONE:  /iphone/.test( NAV ),
    IPAD:    /ipad/.test( NAV ),
    ANDROID: /android/.test( NAV ),

    // Todo detect touch devices in a better way, possibly using event detection
    TOUCH:   !!( /iphone/.test( NAV ) || /ipad/.test( NAV ) || /android/.test( NAV ) )

});

// Galleria static methods

/**
    Adds a theme that you can use for your Gallery

    @param {Object} theme Object that should contain all your theme settings.
    <ul>
        <li>name – name of the theme</li>
        <li>author - name of the author</li>
        <li>css - css file name (not path)</li>
        <li>defaults - default options to apply, including theme-specific options</li>
        <li>init - the init function</li>
    </ul>

    @returns {Object} theme
*/

Galleria.addTheme = function( theme ) {

    // make sure we have a name
    if ( !theme.name ) {
        Galleria.raise('No theme name specified');
    }

    if ( typeof theme.defaults !== 'object' ) {
        theme.defaults = {};
    } else {
        theme.defaults = _legacyOptions( theme.defaults );
    }

    var css = false,
        reg;
    
    if ( typeof theme.css === 'string' ) {
        
        // look for manually added CSS
        $('link').each(function( i, link ) {
            reg = new RegExp( theme.css );
            if ( reg.test( link.href ) ) {
                
                // we found the css
                css = true;
                Galleria.theme = theme;
                $doc.trigger( Galleria.THEMELOAD );
                
                return false;
            }
        });
        
        // else look for the absolute path and load the CSS dynamic
        if ( !css ) {

            $('script').each(function( i, script ) {

                // look for the theme script
                reg = new RegExp( 'galleria\\.' + theme.name.toLowerCase() + '\\.' );
                if( reg.test( script.src )) {

                    // we have a match
                    css = script.src.replace(/[^\/]*$/, '') + theme.css;

                    Utils.addTimer( "css", function() {
                        Utils.loadCSS( css, 'galleria-theme', function() {
                            Galleria.theme = theme;
                            $doc.trigger( Galleria.THEMELOAD );
                        });
                    }, 1);

                }
            });
        }

        if ( !css ) {
            Galleria.raise('No theme CSS loaded');
        }
    } else {
        
        // pass
        Galleria.theme = theme;
        $doc.trigger( Galleria.THEMELOAD );
    }
    return theme;
};

/**
    loadTheme loads a theme js file and attaches a load event to Galleria

    @param {string} src The relative path to the theme source file

    @param {Object} [options] Optional options you want to apply
*/

Galleria.loadTheme = function( src, options ) {

    var loaded = false,
        length = _galleries.length;

    // first clear the current theme, if exists
    Galleria.theme = undef;

    // load the theme
    Utils.loadScript( src, function() {
        loaded = true;
    } );

    // set a 1 sec timeout, then display a hard error if no theme is loaded
    Utils.wait({
        until: function() {
            return loaded;
        },
        error: function() {
            Galleria.raise( "Theme at " + src + " could not load, check theme path.", true );
        },
        success: function() {

            // check for existing galleries and reload them with the new theme
            if ( length ) {

                // temporary save the new galleries
                var refreshed = [];

                // refresh all instances
                // when adding a new theme to an existing gallery, all options will be resetted but the data will be kept
                // you can apply new options as a second argument
                $.each( Galleria.get(), function(i, instance) {

                    // mix the old data and options into the new instance
                    var op = $.extend( instance._original.options, {
                        data_source: instance._data
                    }, options);

                    // remove the old container
                    instance.$('container').remove();

                    // create a new instance
                    var g = new Galleria();

                    // move the id
                    g._id = instance._id;

                    // initialize the new instance
                    g.init( instance._original.target, op );

                    // push the new instance
                    refreshed.push( g );
                });

                // now overwrite the old holder with the new instances
                _galleries = refreshed;
            }
        },
        timeout: 2000
    });
};

/**
    Retrieves a Galleria instance.

    @param {number} [index] Optional index to retrieve.
    If no index is supplied, the method will return all instances in an array.

    @returns Instance or Array of instances
*/

Galleria.get = function( index ) {
    if ( !!_galleries[ index ] ) {
        return _galleries[ index ];
    } else if ( typeof index !== 'number' ) {
        return _galleries;
    } else {
        Galleria.raise('Gallery index ' + index + ' not found');
    }
};

/**
    Creates a transition to be used in your gallery

    @param {string} name The name of the transition that you will use as an option

    @param {Function} fn The function to be executed in the transition.
    The function contains two arguments, params and complete.
    Use the params Object to integrate the transition, and then call complete when you are done.

*/

Galleria.addTransition = function( name, fn ) {
    _transitions[name] = fn;
};

Galleria.utils = Utils;

/**
    A helper metod for cross-browser logging.
    It uses the console log if available otherwise it falls back to the opera
    debugger and finally <code>alert()</code>

    @example Galleria.log("hello", document.body, [1,2,3]);
*/

Galleria.log = function() {
    try {
        window.console.log.apply( window.console, Utils.array( arguments ) );
    } catch( e ) {
        try {
            window.opera.postError.apply( window.opera, arguments );
        } catch( er ) {
              window.alert( Utils.array( arguments ).split(', ') );
        }
    }
};

/**
    Method for raising errors

    @param {string} msg The message to throw

    @param {boolean} [fatal] Set this to true to override debug settings and display a fatal error
*/

Galleria.raise = function( msg, fatal ) {

    if ( DEBUG || fatal ) {
        var type = fatal ? 'Fatal error' : 'Error';
        throw new Error(type + ': ' + msg);
    }

};

/**
    Adds preload, cache, scale and crop functionality

    @constructor

    @requires jQuery

    @param {number} [id] Optional id to keep track of instances
*/

Galleria.Picture = function( id ) {

    // save the id
    this.id = id || null;

    // the image should be null until loaded
    this.image = null;

    // Create a new container
    this.container = Utils.create('galleria-image');

    // add container styles
    $( this.container ).css({
        overflow: 'hidden',
        position: 'relative' // for IE Standards mode
    });

    // saves the original measurements
    this.original = {
        width: 0,
        height: 0
    };

    // flag when the image is ready
    this.ready = false;

    // flag when the image is loaded
    this.loaded = false;

};

Galleria.Picture.prototype = {

    // the inherited cache object
    cache: {},

    // creates a new image and adds it to cache when loaded
    add: function( src ) {

        var i,
            self = this,

            // create the image
            image = new Image(),
            
            onload = function() {
                
                // force chrome to reload the image in case of cache bug
                // set a limit just in case
                if ( ( !this.width || !this.height ) && i < 1000 ) {
                    i++;
                    $( image ).load( onload ).attr( 'src', src+'?'+new Date().getTime() );
                }

                self.original = {
                    height: this.height,
                    width: this.width
                };

                self.cache[ src ] = src; // will override old cache
                self.loaded = true;
            };

        // force a block display
        $( image ).css( 'display', 'block');
        
        if ( self.cache[ src ] ) {
            // no need to onload if the image is cached
            image.src = src;
            onload.call( image );
            return image;
        }

        // begin preload and insert in cache when done
        $( image ).load( onload ).attr( 'src', src );

        return image;

    },

    // show the image on stage
    show: function() {
        Utils.show( this.image );
    },

    // hide the image
    hide: function() {
        Utils.moveOut( this.image );
    },

    clear: function() {
        this.image = null;
    },

    /**
        Checks if an image is in cache

        @param {string} src The image source path, ex '/path/to/img.jpg'

        @returns {boolean}
    */

    isCached: function( src ) {
        return !!this.cache[src];
    },

    /**
        Loads an image and call the callback when ready.
        Will also add the image to cache.

        @param {string} src The image source path, ex '/path/to/img.jpg'
        @param {Function} callback The function to be executed when the image is loaded & scaled

        @returns The image container (jQuery object)
    */

    load: function(src, callback) {

        // save the instance
        var self = this;

        $( this.container ).empty(true);

        // add the image to cache and hide it
        this.image = this.add( src );
        Utils.hide( this.image );

        // append the image into the container
        $( this.container ).append( this.image );

        // check for loaded image using a timeout
        Utils.wait({
            until: function() {
                // TODO this should be properly tested in Opera
                return self.loaded && self.image.complete && self.original.width && self.image.width;
            },
            success: function() {
                // call success
                window.setTimeout(function() { callback.call( self, self ); }, 50 );
            },
            error: function() {
                window.setTimeout(function() { callback.call( self, self ); }, 50 );
                Galleria.raise('image not loaded in 10 seconds: '+ src);
            },
            timeout: 10000
        });

        // return the container
        return this.container;
    },

    /**
        Scales and crops the image

        @param {Object} options The method takes an object with a number of options:

        <ul>
            <li>width - width of the container</li>
            <li>height - height of the container</li>
            <li>min - minimum scale ratio</li>
            <li>max - maximum scale ratio</li>
            <li>margin - distance in pixels from the image border to the container</li>
            <li>complete - a callback that fires when scaling is complete</li>
            <li>position - positions the image, works like the css background-image property.</li>
            <li>crop - defines how to crop. Can be true, false, 'width' or 'height'</li>
        </ul>

        @returns The image container object (jQuery)
    */

    scale: function( options ) {

        // extend some defaults
        options = $.extend({
            width: 0,
            height: 0,
            min: undef,
            max: undef,
            margin: 0,
            complete: function() {},
            position: 'center',
            crop: false
        }, options);

        // return the element if no image found
        if (!this.image) {
            return this.container;
        }

        // store locale variables of width & height
        var width,
            height,
            self = this,
            $container = $( self.container );

        // wait for the width/height
        Utils.wait({
            until: function() {

                width  = options.width
                    || $container.width()
                    || Utils.parseValue( $container.css('width') );

                height = options.height
                    || $container.height()
                    || Utils.parseValue( $container.css('height') );

                return width && height;
            },
            success: function() {
                // calculate some cropping
                var newWidth = ( width - options.margin * 2 ) / self.original.width,
                    newHeight = ( height - options.margin * 2 ) / self.original.height,
                    cropMap = {
                        'true'  : Math.max( newWidth, newHeight ),
                        'width' : newWidth,
                        'height': newHeight,
                        'false' : Math.min( newWidth, newHeight )
                    },
                    ratio = cropMap[ options.crop.toString() ];

                // allow max_scale_ratio
                if ( options.max ) {
                    ratio = Math.min( options.max, ratio );
                }

                // allow min_scale_ratio
                if ( options.min ) {
                    ratio = Math.max( options.min, ratio );
                }

                $( self.container ).width( width ).height( height );

                // round up the width / height
                $.each( ['width','height'], function( i, m ) {
                    $( self.image )[ m ]( self.image[m] = self[ m ] = Math.round( self.original[ m ] * ratio ) );
                });

                // calculate image_position
                var pos = {},
                    mix = {},
                    getPosition = function(value, measure, margin) {
                        var result = 0;
                        if (/\%/.test(value)) {
                            var flt = parseInt( value, 10 ) / 100,
                                m = self.image[ measure ] || $( self.image )[ measure ]();

                            result = Math.ceil( m * -1 * flt + margin * flt );
                        } else {
                            result = Utils.parseValue( value );
                        }
                        return result;
                    },
                    positionMap = {
                        'top': { top: 0 },
                        'left': { left: 0 },
                        'right': { left: '100%' },
                        'bottom': { top: '100%' }
                    };

                $.each( options.position.toLowerCase().split(' '), function( i, value ) {
                    if ( value === 'center' ) {
                        value = '50%';
                    }
                    pos[i ? 'top' : 'left'] = value;
                });

                $.each( pos, function( i, value ) {
                    if ( positionMap.hasOwnProperty( value ) ) {
                        $.extend( mix, positionMap[ value ] );
                    }
                });

                pos = pos.top ? $.extend( pos, mix ) : mix;

                pos = $.extend({
                    top: '50%',
                    left: '50%'
                }, pos);

                // apply position
                $( self.image ).css({
                    position : 'relative',
                    top :  getPosition(pos.top, 'height', height),
                    left : getPosition(pos.left, 'width', width)
                });

                // show the image
                self.show();

                // flag ready and call the callback
                self.ready = true;
                options.complete.call( self, self );
            },
            error: function() {
                Galleria.raise('Could not scale image: '+self.image.src);
            },
            timeout: 1000
        });
        return this;
    }
};

// our own easings 
$.extend( $.easing, {

    galleria: function (_, t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },

    galleriaIn: function (_, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },

    galleriaOut: function (_, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }

});

// the plugin initializer
$.fn.galleria = function( options ) {

    return this.each(function() {

        var gallery = new Galleria();
        gallery.init( this, options );

    });
};

// Expose
window.Galleria = Galleria;

// phew

}( jQuery ) );