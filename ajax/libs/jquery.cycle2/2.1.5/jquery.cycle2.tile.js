/*! tile transition plugin for Cycle2;  version: 20140128 */
(function ($) {
"use strict";

$.fn.cycle.transitions.tileSlide =
$.fn.cycle.transitions.tileBlind = {

    before: function( opts, curr, next, fwd ) {
        opts.API.stackSlides( curr, next, fwd );
        $(curr).css({
            display: 'block',
            visibility: 'visible'
        });
        opts.container.css('overflow', 'hidden');
        // set defaults
        opts.tileDelay = opts.tileDelay || opts.fx == 'tileSlide' ? 100 : 125;
        opts.tileCount = opts.tileCount || 7;
        opts.tileVertical = opts.tileVertical !== false;

        if (!opts.container.data('cycleTileInitialized')) {
            opts.container.on('cycle-destroyed', $.proxy(this.onDestroy, opts.API));
            opts.container.data('cycleTileInitialized', true);
        }
    },

    transition: function( opts, curr, next, fwd, callback ) {
        opts.slides.not(curr).not(next).css('visibility','hidden');

        var tiles = $();
        var $curr = $(curr), $next = $(next);
        var tile, tileWidth, tileHeight, lastTileWidth, lastTileHeight,
            num = opts.tileCount,
            vert = opts.tileVertical,
            height = opts.container.height(),
            width = opts.container.width();

        if ( vert ) {
            tileWidth = Math.floor(width / num);
            lastTileWidth = width - (tileWidth * (num - 1));
            tileHeight = lastTileHeight = height;
        }
        else {
            tileWidth = lastTileWidth = width;
            tileHeight = Math.floor(height / num);
            lastTileHeight = height - (tileHeight * (num - 1));
        }

        // opts.speed = opts.speed / 2;
        opts.container.find('.cycle-tiles-container').remove();

        var animCSS;
        var tileCSS = { left: 0, top: 0, overflow: 'hidden', position: 'absolute', margin: 0, padding: 0 };
        if ( vert ) {
            animCSS = opts.fx == 'tileSlide' ? { top: height } : { width: 0 };
        }
        else {
            animCSS = opts.fx == 'tileSlide' ? { left: width } : { height: 0 };
        }

        var tilesContainer = $('<div class="cycle-tiles-container"></div>');
        tilesContainer.css({
            zIndex: $curr.css('z-index'),
            overflow: 'visible',
            position: 'absolute', 
            top: 0,
            left: 0,
            direction: 'ltr' // #250
        });
        tilesContainer.insertBefore( next );

        for (var i = 0; i < num; i++) {
            tile = $('<div></div>')
            .css( tileCSS )
            .css({
                width:  ((num - 1 === i) ? lastTileWidth  : tileWidth),
                height: ((num - 1 === i) ? lastTileHeight : tileHeight),
                marginLeft: vert ? ((i * tileWidth)) : 0,
                marginTop:  vert ? 0 : (i * tileHeight)
            })
            .append($curr.clone().css({
                position: 'relative',
                maxWidth: 'none',
                width: $curr.width(),
                margin: 0, padding: 0,
                marginLeft: vert ? -(i * tileWidth) : 0,
                marginTop: vert ? 0 : -(i * tileHeight)
            }));
            tiles = tiles.add(tile);
        }

        tilesContainer.append(tiles);
        $curr.css('visibility','hidden');
        $next.css({
            opacity: 1,
            display: 'block',
            visibility: 'visible'
        });
        animateTile(fwd ? 0 : num - 1);
        
        opts._tileAniCallback = function() {
            $next.css({
                display: 'block',
                visibility: 'visible'
            });
            $curr.css('visibility','hidden');
            tilesContainer.remove();
            callback();
        };

        function animateTile(i) {
            tiles.eq(i).animate( animCSS, {
                duration: opts.speed,
                easing: opts.easing,
                complete: function () {
                    if (fwd ? (num - 1 === i) : (0 === i)) {
                        opts._tileAniCallback();
                    }
                }
            });

            setTimeout(function () {
                if (fwd ? (num - 1 !== i) : (0 !== i)) {
                    animateTile(fwd ? (i + 1) : (i - 1));
                }
            }, opts.tileDelay);
        }
    },

    // tx API impl
    stopTransition: function( opts ) {
        opts.container.find('*').stop( true, true );
        if (opts._tileAniCallback)
            opts._tileAniCallback();
    },

    // core API supplement
    onDestroy: function( e ) {
        var opts = this.opts();
        opts.container.find('.cycle-tiles-container').remove();
    }
};

})(jQuery);
