/* Cycle2 core engine */
;(function($) {
"use strict";

var version = '2.1.6';

$.fn.cycle = function( options ) {
    // fix mistakes with the ready state
    var o;
    if ( this.length === 0 && !$.isReady ) {
        o = { s: this.selector, c: this.context };
        $.fn.cycle.log('requeuing slideshow (dom not ready)');
        $(function() {
            $( o.s, o.c ).cycle(options);
        });
        return this;
    }

    return this.each(function() {
        var data, opts, shortName, val;
        var container = $(this);
        var log = $.fn.cycle.log;

        if ( container.data('cycle.opts') )
            return; // already initialized

        if ( container.data('cycle-log') === false || 
            ( options && options.log === false ) ||
            ( opts && opts.log === false) ) {
            log = $.noop;
        }

        log('--c2 init--');
        data = container.data();
        for (var p in data) {
            // allow props to be accessed sans 'cycle' prefix and log the overrides
            if (data.hasOwnProperty(p) && /^cycle[A-Z]+/.test(p) ) {
                val = data[p];
                shortName = p.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, lowerCase);
                log(shortName+':', val, '('+typeof val +')');
                data[shortName] = val;
            }
        }

        opts = $.extend( {}, $.fn.cycle.defaults, data, options || {});

        opts.timeoutId = 0;
        opts.paused = opts.paused || false; // #57
        opts.container = container;
        opts._maxZ = opts.maxZ;

        opts.API = $.extend ( { _container: container }, $.fn.cycle.API );
        opts.API.log = log;
        opts.API.trigger = function( eventName, args ) {
            opts.container.trigger( eventName, args );
            return opts.API;
        };

        container.data( 'cycle.opts', opts );
        container.data( 'cycle.API', opts.API );

        // opportunity for plugins to modify opts and API
        opts.API.trigger('cycle-bootstrap', [ opts, opts.API ]);

        opts.API.addInitialSlides();
        opts.API.preInitSlideshow();

        if ( opts.slides.length )
            opts.API.initSlideshow();
    });
};

$.fn.cycle.API = {
    opts: function() {
        return this._container.data( 'cycle.opts' );
    },
    addInitialSlides: function() {
        var opts = this.opts();
        var slides = opts.slides;
        opts.slideCount = 0;
        opts.slides = $(); // empty set
        
        // add slides that already exist
        slides = slides.jquery ? slides : opts.container.find( slides );

        if ( opts.random ) {
            slides.sort(function() {return Math.random() - 0.5;});
        }

        opts.API.add( slides );
    },

    preInitSlideshow: function() {
        var opts = this.opts();
        opts.API.trigger('cycle-pre-initialize', [ opts ]);
        var tx = $.fn.cycle.transitions[opts.fx];
        if (tx && $.isFunction(tx.preInit))
            tx.preInit( opts );
        opts._preInitialized = true;
    },

    postInitSlideshow: function() {
        var opts = this.opts();
        opts.API.trigger('cycle-post-initialize', [ opts ]);
        var tx = $.fn.cycle.transitions[opts.fx];
        if (tx && $.isFunction(tx.postInit))
            tx.postInit( opts );
    },

    initSlideshow: function() {
        var opts = this.opts();
        var pauseObj = opts.container;
        var slideOpts;
        opts.API.calcFirstSlide();

        if ( opts.container.css('position') == 'static' )
            opts.container.css('position', 'relative');

        $(opts.slides[opts.currSlide]).css({
            opacity: 1,
            display: 'block',
            visibility: 'visible'
        });
        opts.API.stackSlides( opts.slides[opts.currSlide], opts.slides[opts.nextSlide], !opts.reverse );

        if ( opts.pauseOnHover ) {
            // allow pauseOnHover to specify an element
            if ( opts.pauseOnHover !== true )
                pauseObj = $( opts.pauseOnHover );

            pauseObj.hover(
                function(){ opts.API.pause( true ); }, 
                function(){ opts.API.resume( true ); }
            );
        }

        // stage initial transition
        if ( opts.timeout ) {
            slideOpts = opts.API.getSlideOpts( opts.currSlide );
            opts.API.queueTransition( slideOpts, slideOpts.timeout + opts.delay );
        }

        opts._initialized = true;
        opts.API.updateView( true );
        opts.API.trigger('cycle-initialized', [ opts ]);
        opts.API.postInitSlideshow();
    },

    pause: function( hover ) {
        var opts = this.opts(),
            slideOpts = opts.API.getSlideOpts(),
            alreadyPaused = opts.hoverPaused || opts.paused;

        if ( hover )
            opts.hoverPaused = true; 
        else
            opts.paused = true;

        if ( ! alreadyPaused ) {
            opts.container.addClass('cycle-paused');
            opts.API.trigger('cycle-paused', [ opts ]).log('cycle-paused');

            if ( slideOpts.timeout ) {
                clearTimeout( opts.timeoutId );
                opts.timeoutId = 0;
                
                // determine how much time is left for the current slide
                opts._remainingTimeout -= ( $.now() - opts._lastQueue );
                if ( opts._remainingTimeout < 0 || isNaN(opts._remainingTimeout) )
                    opts._remainingTimeout = undefined;
            }
        }
    },

    resume: function( hover ) {
        var opts = this.opts(),
            alreadyResumed = !opts.hoverPaused && !opts.paused,
            remaining;

        if ( hover )
            opts.hoverPaused = false; 
        else
            opts.paused = false;

    
        if ( ! alreadyResumed ) {
            opts.container.removeClass('cycle-paused');
            // #gh-230; if an animation is in progress then don't queue a new transition; it will
            // happen naturally
            if ( opts.slides.filter(':animated').length === 0 )
                opts.API.queueTransition( opts.API.getSlideOpts(), opts._remainingTimeout );
            opts.API.trigger('cycle-resumed', [ opts, opts._remainingTimeout ] ).log('cycle-resumed');
        }
    },

    add: function( slides, prepend ) {
        var opts = this.opts();
        var oldSlideCount = opts.slideCount;
        var startSlideshow = false;
        var len;

        if ( $.type(slides) == 'string')
            slides = $.trim( slides );

        $( slides ).each(function(i) {
            var slideOpts;
            var slide = $(this);

            if ( prepend )
                opts.container.prepend( slide );
            else
                opts.container.append( slide );

            opts.slideCount++;
            slideOpts = opts.API.buildSlideOpts( slide );

            if ( prepend )
                opts.slides = $( slide ).add( opts.slides );
            else
                opts.slides = opts.slides.add( slide );

            opts.API.initSlide( slideOpts, slide, --opts._maxZ );

            slide.data('cycle.opts', slideOpts);
            opts.API.trigger('cycle-slide-added', [ opts, slideOpts, slide ]);
        });

        opts.API.updateView( true );

        startSlideshow = opts._preInitialized && (oldSlideCount < 2 && opts.slideCount >= 1);
        if ( startSlideshow ) {
            if ( !opts._initialized )
                opts.API.initSlideshow();
            else if ( opts.timeout ) {
                len = opts.slides.length;
                opts.nextSlide = opts.reverse ? len - 1 : 1;
                if ( !opts.timeoutId ) {
                    opts.API.queueTransition( opts );
                }
            }
        }
    },

    calcFirstSlide: function() {
        var opts = this.opts();
        var firstSlideIndex;
        firstSlideIndex = parseInt( opts.startingSlide || 0, 10 );
        if (firstSlideIndex >= opts.slides.length || firstSlideIndex < 0)
            firstSlideIndex = 0;

        opts.currSlide = firstSlideIndex;
        if ( opts.reverse ) {
            opts.nextSlide = firstSlideIndex - 1;
            if (opts.nextSlide < 0)
                opts.nextSlide = opts.slides.length - 1;
        }
        else {
            opts.nextSlide = firstSlideIndex + 1;
            if (opts.nextSlide == opts.slides.length)
                opts.nextSlide = 0;
        }
    },

    calcNextSlide: function() {
        var opts = this.opts();
        var roll;
        if ( opts.reverse ) {
            roll = (opts.nextSlide - 1) < 0;
            opts.nextSlide = roll ? opts.slideCount - 1 : opts.nextSlide-1;
            opts.currSlide = roll ? 0 : opts.nextSlide+1;
        }
        else {
            roll = (opts.nextSlide + 1) == opts.slides.length;
            opts.nextSlide = roll ? 0 : opts.nextSlide+1;
            opts.currSlide = roll ? opts.slides.length-1 : opts.nextSlide-1;
        }
    },

    calcTx: function( slideOpts, manual ) {
        var opts = slideOpts;
        var tx;

        if ( opts._tempFx )
            tx = $.fn.cycle.transitions[opts._tempFx];
        else if ( manual && opts.manualFx )
            tx = $.fn.cycle.transitions[opts.manualFx];

        if ( !tx )
            tx = $.fn.cycle.transitions[opts.fx];

        opts._tempFx = null;
        this.opts()._tempFx = null;

        if (!tx) {
            tx = $.fn.cycle.transitions.fade;
            opts.API.log('Transition "' + opts.fx + '" not found.  Using fade.');
        }
        return tx;
    },

    prepareTx: function( manual, fwd ) {
        var opts = this.opts();
        var after, curr, next, slideOpts, tx;

        if ( opts.slideCount < 2 ) {
            opts.timeoutId = 0;
            return;
        }
        if ( manual && ( !opts.busy || opts.manualTrump ) ) {
            opts.API.stopTransition();
            opts.busy = false;
            clearTimeout(opts.timeoutId);
            opts.timeoutId = 0;
        }
        if ( opts.busy )
            return;
        if ( opts.timeoutId === 0 && !manual )
            return;

        curr = opts.slides[opts.currSlide];
        next = opts.slides[opts.nextSlide];
        slideOpts = opts.API.getSlideOpts( opts.nextSlide );
        tx = opts.API.calcTx( slideOpts, manual );

        opts._tx = tx;

        if ( manual && slideOpts.manualSpeed !== undefined )
            slideOpts.speed = slideOpts.manualSpeed;

        // if ( opts.nextSlide === opts.currSlide )
        //     opts.API.calcNextSlide();

        // ensure that:
        //      1. advancing to a different slide
        //      2. this is either a manual event (prev/next, pager, cmd) or 
        //              a timer event and slideshow is not paused
        if ( opts.nextSlide != opts.currSlide && 
            (manual || (!opts.paused && !opts.hoverPaused && opts.timeout) )) { // #62

            opts.API.trigger('cycle-before', [ slideOpts, curr, next, fwd ]);
            if ( tx.before )
                tx.before( slideOpts, curr, next, fwd );

            after = function() {
                opts.busy = false;
                // #76; bail if slideshow has been destroyed
                if (! opts.container.data( 'cycle.opts' ) )
                    return;

                if (tx.after)
                    tx.after( slideOpts, curr, next, fwd );
                opts.API.trigger('cycle-after', [ slideOpts, curr, next, fwd ]);
                opts.API.queueTransition( slideOpts);
                opts.API.updateView( true );
            };

            opts.busy = true;
            if (tx.transition)
                tx.transition(slideOpts, curr, next, fwd, after);
            else
                opts.API.doTransition( slideOpts, curr, next, fwd, after);

            opts.API.calcNextSlide();
            opts.API.updateView();
        } else {
            opts.API.queueTransition( slideOpts );
        }
    },

    // perform the actual animation
    doTransition: function( slideOpts, currEl, nextEl, fwd, callback) {
        var opts = slideOpts;
        var curr = $(currEl), next = $(nextEl);
        var fn = function() {
            // make sure animIn has something so that callback doesn't trigger immediately
            next.animate(opts.animIn || { opacity: 1}, opts.speed, opts.easeIn || opts.easing, callback);
        };

        next.css(opts.cssBefore || {});
        curr.animate(opts.animOut || {}, opts.speed, opts.easeOut || opts.easing, function() {
            curr.css(opts.cssAfter || {});
            if (!opts.sync) {
                fn();
            }
        });
        if (opts.sync) {
            fn();
        }
    },

    queueTransition: function( slideOpts, specificTimeout ) {
        var opts = this.opts();
        var timeout = specificTimeout !== undefined ? specificTimeout : slideOpts.timeout;
        if (opts.nextSlide === 0 && --opts.loop === 0) {
            opts.API.log('terminating; loop=0');
            opts.timeout = 0;
            if ( timeout ) {
                setTimeout(function() {
                    opts.API.trigger('cycle-finished', [ opts ]);
                }, timeout);
            }
            else {
                opts.API.trigger('cycle-finished', [ opts ]);
            }
            // reset nextSlide
            opts.nextSlide = opts.currSlide;
            return;
        }
        if ( opts.continueAuto !== undefined ) {
            if ( opts.continueAuto === false || 
                ($.isFunction(opts.continueAuto) && opts.continueAuto() === false )) {
                opts.API.log('terminating automatic transitions');
                opts.timeout = 0;
                if ( opts.timeoutId )
                    clearTimeout(opts.timeoutId);
                return;
            }
        }
        if ( timeout ) {
            opts._lastQueue = $.now();
            if ( specificTimeout === undefined )
                opts._remainingTimeout = slideOpts.timeout;

            if ( !opts.paused && ! opts.hoverPaused ) {
                opts.timeoutId = setTimeout(function() { 
                    opts.API.prepareTx( false, !opts.reverse ); 
                }, timeout );
            }
        }
    },

    stopTransition: function() {
        var opts = this.opts();
        if ( opts.slides.filter(':animated').length ) {
            opts.slides.stop(false, true);
            opts.API.trigger('cycle-transition-stopped', [ opts ]);
        }

        if ( opts._tx && opts._tx.stopTransition )
            opts._tx.stopTransition( opts );
    },

    // advance slide forward or back
    advanceSlide: function( val ) {
        var opts = this.opts();
        clearTimeout(opts.timeoutId);
        opts.timeoutId = 0;
        opts.nextSlide = opts.currSlide + val;
        
        if (opts.nextSlide < 0)
            opts.nextSlide = opts.slides.length - 1;
        else if (opts.nextSlide >= opts.slides.length)
            opts.nextSlide = 0;

        opts.API.prepareTx( true,  val >= 0 );
        return false;
    },

    buildSlideOpts: function( slide ) {
        var opts = this.opts();
        var val, shortName;
        var slideOpts = slide.data() || {};
        for (var p in slideOpts) {
            // allow props to be accessed sans 'cycle' prefix and log the overrides
            if (slideOpts.hasOwnProperty(p) && /^cycle[A-Z]+/.test(p) ) {
                val = slideOpts[p];
                shortName = p.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, lowerCase);
                opts.API.log('['+(opts.slideCount-1)+']', shortName+':', val, '('+typeof val +')');
                slideOpts[shortName] = val;
            }
        }

        slideOpts = $.extend( {}, $.fn.cycle.defaults, opts, slideOpts );
        slideOpts.slideNum = opts.slideCount;

        try {
            // these props should always be read from the master state object
            delete slideOpts.API;
            delete slideOpts.slideCount;
            delete slideOpts.currSlide;
            delete slideOpts.nextSlide;
            delete slideOpts.slides;
        } catch(e) {
            // no op
        }
        return slideOpts;
    },

    getSlideOpts: function( index ) {
        var opts = this.opts();
        if ( index === undefined )
            index = opts.currSlide;

        var slide = opts.slides[index];
        var slideOpts = $(slide).data('cycle.opts');
        return $.extend( {}, opts, slideOpts );
    },
    
    initSlide: function( slideOpts, slide, suggestedZindex ) {
        var opts = this.opts();
        slide.css( slideOpts.slideCss || {} );
        if ( suggestedZindex > 0 )
            slide.css( 'zIndex', suggestedZindex );

        // ensure that speed settings are sane
        if ( isNaN( slideOpts.speed ) )
            slideOpts.speed = $.fx.speeds[slideOpts.speed] || $.fx.speeds._default;
        if ( !slideOpts.sync )
            slideOpts.speed = slideOpts.speed / 2;

        slide.addClass( opts.slideClass );
    },

    updateView: function( isAfter, isDuring, forceEvent ) {
        var opts = this.opts();
        if ( !opts._initialized )
            return;
        var slideOpts = opts.API.getSlideOpts();
        var currSlide = opts.slides[ opts.currSlide ];

        if ( ! isAfter && isDuring !== true ) {
            opts.API.trigger('cycle-update-view-before', [ opts, slideOpts, currSlide ]);
            if ( opts.updateView < 0 )
                return;
        }

        if ( opts.slideActiveClass ) {
            opts.slides.removeClass( opts.slideActiveClass )
                .eq( opts.currSlide ).addClass( opts.slideActiveClass );
        }

        if ( isAfter && opts.hideNonActive )
            opts.slides.filter( ':not(.' + opts.slideActiveClass + ')' ).css('visibility', 'hidden');

        if ( opts.updateView === 0 ) {
            setTimeout(function() {
                opts.API.trigger('cycle-update-view', [ opts, slideOpts, currSlide, isAfter ]);
            }, slideOpts.speed / (opts.sync ? 2 : 1) );
        }

        if ( opts.updateView !== 0 )
            opts.API.trigger('cycle-update-view', [ opts, slideOpts, currSlide, isAfter ]);
        
        if ( isAfter )
            opts.API.trigger('cycle-update-view-after', [ opts, slideOpts, currSlide ]);
    },

    getComponent: function( name ) {
        var opts = this.opts();
        var selector = opts[name];
        if (typeof selector === 'string') {
            // if selector is a child, sibling combinator, adjancent selector then use find, otherwise query full dom
            return (/^\s*[\>|\+|~]/).test( selector ) ? opts.container.find( selector ) : $( selector );
        }
        if (selector.jquery)
            return selector;
        
        return $(selector);
    },

    stackSlides: function( curr, next, fwd ) {
        var opts = this.opts();
        if ( !curr ) {
            curr = opts.slides[opts.currSlide];
            next = opts.slides[opts.nextSlide];
            fwd = !opts.reverse;
        }

        // reset the zIndex for the common case:
        // curr slide on top,  next slide beneath, and the rest in order to be shown
        $(curr).css('zIndex', opts.maxZ);

        var i;
        var z = opts.maxZ - 2;
        var len = opts.slideCount;
        if (fwd) {
            for ( i = opts.currSlide + 1; i < len; i++ )
                $( opts.slides[i] ).css( 'zIndex', z-- );
            for ( i = 0; i < opts.currSlide; i++ )
                $( opts.slides[i] ).css( 'zIndex', z-- );
        }
        else {
            for ( i = opts.currSlide - 1; i >= 0; i-- )
                $( opts.slides[i] ).css( 'zIndex', z-- );
            for ( i = len - 1; i > opts.currSlide; i-- )
                $( opts.slides[i] ).css( 'zIndex', z-- );
        }

        $(next).css('zIndex', opts.maxZ - 1);
    },

    getSlideIndex: function( el ) {
        return this.opts().slides.index( el );
    }

}; // API

// default logger
$.fn.cycle.log = function log() {
    /*global console:true */
    if (window.console && console.log)
        console.log('[cycle2] ' + Array.prototype.join.call(arguments, ' ') );
};

$.fn.cycle.version = function() { return 'Cycle2: ' + version; };

// helper functions

function lowerCase(s) {
    return (s || '').toLowerCase();
}

// expose transition object
$.fn.cycle.transitions = {
    custom: {
    },
    none: {
        before: function( opts, curr, next, fwd ) {
            opts.API.stackSlides( next, curr, fwd );
            opts.cssBefore = { opacity: 1, visibility: 'visible', display: 'block' };
        }
    },
    fade: {
        before: function( opts, curr, next, fwd ) {
            var css = opts.API.getSlideOpts( opts.nextSlide ).slideCss || {};
            opts.API.stackSlides( curr, next, fwd );
            opts.cssBefore = $.extend(css, { opacity: 0, visibility: 'visible', display: 'block' });
            opts.animIn = { opacity: 1 };
            opts.animOut = { opacity: 0 };
        }
    },
    fadeout: {
        before: function( opts , curr, next, fwd ) {
            var css = opts.API.getSlideOpts( opts.nextSlide ).slideCss || {};
            opts.API.stackSlides( curr, next, fwd );
            opts.cssBefore = $.extend(css, { opacity: 1, visibility: 'visible', display: 'block' });
            opts.animOut = { opacity: 0 };
        }
    },
    scrollHorz: {
        before: function( opts, curr, next, fwd ) {
            opts.API.stackSlides( curr, next, fwd );
            var w = opts.container.css('overflow','hidden').width();
            opts.cssBefore = { left: fwd ? w : - w, top: 0, opacity: 1, visibility: 'visible', display: 'block' };
            opts.cssAfter = { zIndex: opts._maxZ - 2, left: 0 };
            opts.animIn = { left: 0 };
            opts.animOut = { left: fwd ? -w : w };
        }
    }
};

// @see: http://jquery.malsup.com/cycle2/api
$.fn.cycle.defaults = {
    allowWrap:        true,
    autoSelector:     '.cycle-slideshow[data-cycle-auto-init!=false]',
    delay:            0,
    easing:           null,
    fx:              'fade',
    hideNonActive:    true,
    loop:             0,
    manualFx:         undefined,
    manualSpeed:      undefined,
    manualTrump:      true,
    maxZ:             100,
    pauseOnHover:     false,
    reverse:          false,
    slideActiveClass: 'cycle-slide-active',
    slideClass:       'cycle-slide',
    slideCss:         { position: 'absolute', top: 0, left: 0 },
    slides:          '> img',
    speed:            500,
    startingSlide:    0,
    sync:             true,
    timeout:          4000,
    updateView:       0
};

// automatically find and run slideshows
$(document).ready(function() {
    $( $.fn.cycle.defaults.autoSelector ).cycle();
});

})(jQuery);
