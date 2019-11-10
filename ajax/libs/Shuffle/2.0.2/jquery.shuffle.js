// IMPORTANT!
// If you're already using Modernizr, delete it from this file. If you don't know what Modernizr is, leave it :)

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);


// Shuffle Doesn't require this shuffle/debounce plugin, but it works better with it.

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/**
 * jQuery Shuffle Plugin
 * Uses CSS Transforms to filter down a grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2. Optionally throttle/debounce by Ben Alman
 * Inspired by Isotope http://isotope.metafizzy.co/
 * Modified 2013-08-19
 * @license MIT license
 * @author Glen Cheney <cheney.glen@gmail.com>
 * @version 2.0.1
 */
(function($, Modernizr, undefined) {

'use strict';

// You can return `undefined` from the `by` function to revert to DOM order
// This plugin does NOT return a jQuery object. It returns a plain array because
// jQuery sorts everything in DOM order.
$.fn.sorted = function(options) {
    var opts = $.extend({}, $.fn.sorted.defaults, options),
        arr = this.get(),
        revert = false;

    if ( !arr.length ) {
        return [];
    }

    if ( opts.randomize ) {
        return $.fn.sorted.randomize( arr );
    }

    // Sort the elements by the opts.by function.
    // If we don't have opts.by, default to DOM order
    if (opts.by !== $.noop && opts.by !== null && opts.by !== undefined) {
        arr.sort(function(a, b) {

            // Exit early if we already know we want to revert
            if ( revert ) {
                return 0;
            }

            var valA = opts.by($(a)),
                valB = opts.by($(b));

            // If both values are undefined, use the DOM order
            if ( valA === undefined && valB === undefined ) {
                revert = true;
                return 0;
            }

            if ( valA === 'sortFirst' || valB === 'sortLast' ) {
                return -1;
            }

            if ( valA === 'sortLast' || valB === 'sortFirst' ) {
                return 1;
            }

            return (valA < valB) ? -1 :
                (valA > valB) ? 1 : 0;
        });
    }

    // Revert to the original array if necessary
    if ( revert ) {
        return this.get();
    }

    if ( opts.reverse ) {
        arr.reverse();
    }

    return arr;

};

$.fn.sorted.defaults = {
    reverse: false, // Use array.reverse() to reverse the results
    by: null, // Sorting function
    randomize: false // If true, this will skip the sorting and return a randomized order in the array
};


// http://stackoverflow.com/a/962890/373422
$.fn.sorted.randomize = function( array ) {
    var top = array.length,
        tmp, current;

    if ( !top ) {
        return array;
    }

    while ( --top ) {
        current = Math.floor( Math.random() * (top + 1) );
        tmp = array[ current ];
        array[ current ] = array[ top ];
        array[ top ] = tmp;
    }

    return array;
};

// Used for unique instance variables
var id = 0;

var Shuffle = function( $container, options ) {
    var self = this;
    $.extend( self, Shuffle.options, options, Shuffle.settings );

    self.$container = $container;
    self.$window = $(window);
    self.unique = 'shuffle_' + id++;

    self._fire('loading');
    self._init();
    self._fire('done');
};

Shuffle.prototype = {

    _init : function() {
        var self = this,
            containerCSS,
            resizeFunction = $.proxy( self._onResize, self ),
            debouncedResize = self.throttle ? self.throttle( self.throttleTime, resizeFunction ) : resizeFunction,
            sort = self.initialSort ? self.initialSort : null;

        // Save variables needed later then add some classes
        self._setVars();

        // Zero out all columns
        self._resetCols();

        // Add classes and invalidate styles
        self._addClasses();

        // Set initial css for each item
        self._initItems();

        // Bind resize events (http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer)
        self.$window.on('resize.shuffle.' + self.unique, debouncedResize);

        // Get container css all in one request. Causes reflow
        containerCSS = self.$container.css(['paddingLeft', 'paddingRight', 'position', 'width']);

        // Position cannot be static.
        // This will cause an extra style layout if it has to be set and the sizer element is used.
        if ( containerCSS.position === 'static' ) {
            self.$container.css('position', 'relative');
        }

        // Get offset from container
        self.offset = {
            left: parseInt( containerCSS.paddingLeft, 10 ) || 0,
            top: parseInt( containerCSS.paddingTop, 10 ) || 0
        };

        // We already got the container's width above, no need to cause another reflow getting it again...
        // Calculate the number of columns there will be
        self._setColumns( parseInt( containerCSS.width, 10 ) );

        // Kick off!
        self.shuffle( self.group, sort );

        // The shuffle items haven't had transitions set on them yet
        // so the user doesn't see the first layout. Set them now that the first layout is done.
        if ( self.supported ) {
            setTimeout(function() {
                self._setTransitions();
                self.$container[0].style[ self.transitionName ] = 'height ' + self.speed + 'ms ' + self.easing;
            }, 0);
        }
    },

    // Will invalidate styles
    _addClasses : function() {
        var self = this;

        self.$container.addClass('shuffle');
        self.$items.addClass('shuffle-item filtered');

        return self;
    },

    _setVars : function() {
        var self = this;

        self.$items = self._getItems();
        self.transitionName = self.prefixed('transition'),
        self.transitionDelayName = self.prefixed('transitionDelay');
        self.transitionDuration = self.prefixed('transitionDuration');
        self.transform = self.getPrefixed('transform');

        // Get transitionend event name
        self.transitionend = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        }[ self.transitionName ];

        // If the columnWidth property is a function, then the grid is fluid
        self.isFluid = self.columnWidth && typeof self.columnWidth === 'function';

        // Column width is the default setting and sizer is not (meaning passed in)
        // Assume they meant column width to be the sizer
        if ( self.columnWidth === 0 && self.sizer !== null ) {
            self.columnWidth = self.sizer;
        }

        // If column width is a string, treat is as a selector and search for the
        // sizer element within the outermost container
        if ( typeof self.columnWidth === 'string' ) {
            self.$sizer = self.$container.find( self.columnWidth );

        // Check for an element
        } else if ( self.columnWidth && self.columnWidth.nodeType && self.columnWidth.nodeType === 1 ) {
            // Wrap it in jQuery
            self.$sizer = $( self.columnWidth );

        // Check for jQuery object
        } else if ( self.columnWidth && self.columnWidth.jquery ) {
            self.$sizer = self.columnWidth;
        }

        if ( self.$sizer && self.$sizer.length ) {
            self.useSizer = true;
            self.sizer = self.$sizer[0];
        }

        return self;
    },

    _filter : function( category, $collection ) {
        var self = this,
            isPartialSet = $collection !== undefined,
            $items = isPartialSet ? $collection : self.$items,
            $filtered = $();

        category = category || self.lastFilter;

        self._fire('filter');

        // Loop through each item and use provided function to determine
        // whether to hide it or not.
        if ( $.isFunction(category) ) {
            $items.each(function() {
                var $item = $(this),
                passes = category.call($item[0], $item, self);

                if ( passes ) {
                    $filtered = $filtered.add( $item );
                }
            });
        }

        // Otherwise we've been passed a category to filter by
        else {
            self.group = category;
            if (category !== 'all') {
                $items.each(function() {
                    var $this = $(this),
                    groups = $this.data('groups'),
                    keys = self.delimeter && !$.isArray( groups ) ? groups.split( self.delimeter ) : groups,
                    passes = $.inArray(category, keys) > -1;

                    if ( passes ) {
                        $filtered = $filtered.add( $this );
                    }
                });
            }

            // category === 'all', add filtered class to everything
            else {
                $filtered = $items;
            }
        }

        // Individually add/remove concealed/filtered classes
        self._toggleFilterClasses( $items, $filtered );

        $items = null;
        $collection = null;

        return $filtered;
    },


    _toggleFilterClasses : function( $items, $filtered ) {
        var concealed = 'concealed',
            filtered = 'filtered';

        $items.filter( $filtered ).each(function() {
            var $filteredItem = $(this);
            // Remove concealed if it's there
            if ( $filteredItem.hasClass( concealed ) ) {
                $filteredItem.removeClass( concealed );
            }
            // Add filtered class if it's not there
            if ( !$filteredItem.hasClass( filtered ) ) {
                $filteredItem.addClass( filtered );
            }
        });

        $items.not( $filtered ).each(function() {
            var $filteredItem = $(this);
            // Add concealed if it's not there
            if ( !$filteredItem.hasClass( concealed ) ) {
                $filteredItem.addClass( concealed );
            }
            // Remove filtered class if it's there
            if ( $filteredItem.hasClass( filtered ) ) {
                $filteredItem.removeClass( filtered );
            }
        });
    },

    /**
     * Set the initial css for each item
     * @param  {jQuery} $items optionally specifiy at set to initialize
     * @return {jQuery}        the items which were just set
     */
    _initItems : function( $items ) {
        $items = $items || this.$items;
        return $items.css( this.itemCss );
    },

    _updateItemCount : function() {
        this.visibleItems = this.$items.filter('.filtered').length;
        return this;
    },

    _setTransition : function( element ) {
        var self = this;
        element.style[ self.transitionName ] = self.transform + ' ' + self.speed + 'ms ' + self.easing + ', opacity ' + self.speed + 'ms ' + self.easing;
        return element;
    },

    _setTransitions : function( $items ) {
        var self = this;

        $items = $items || self.$items;
        $items.each(function() {
            self._setTransition( this );
        });
        return self;
    },

    _setSequentialDelay : function( $collection ) {
        var self = this;

        if ( !self.supported ) {
            return;
        }

        // $collection can be an array of dom elements or jquery object
        $.each( $collection, function(i) {
            // This works because the transition-property: transform, opacity;
            this.style[ self.transitionDelayName ] = '0ms,' + ((i + 1) * self.sequentialFadeDelay) + 'ms';

            // Set the delay back to zero after one transition
            $(this).one(self.transitionend, function() {
                this.style[ self.transitionDelayName ] = '0ms';
            });
        });
    },

    _getItems : function() {
        return this.$container.children( this.itemSelector );
    },

    _getPreciseDimension : function( element, style ) {
        var dimension;
        if ( window.getComputedStyle ) {
            dimension = window.getComputedStyle( element, null )[ style ];
        } else {
            dimension = $( element ).css( style );
        }
        return parseFloat( dimension );
    },

    // Calculate number of columns
    // Gets css if using sizer element
    _setColumns : function( theContainerWidth ) {
        var self = this,
            containerWidth = theContainerWidth || self.$container.width(),
            gutter = typeof self.gutterWidth === 'function' ?
                self.gutterWidth( containerWidth ) :
                self.useSizer ?
                    self._getPreciseDimension( self.sizer, 'marginLeft' ) :
                    self.gutterWidth,
            calculatedColumns;

        // use fluid columnWidth function if there
        self.colWidth = self.isFluid ? self.columnWidth( containerWidth ) :
            // columnWidth option isn't a function, are they using a sizing element?
            self.useSizer ? self._getPreciseDimension( self.sizer, 'width' ) :
            // if not, how about the explicitly set option?
            self.columnWidth ||
            // or use the size of the first item
            self.$items.outerWidth(true) ||
            // if there's no items, use size of container
            containerWidth;

        // Don't let them set a column width of zero.
        self.colWidth = self.colWidth || containerWidth;

        self.colWidth += gutter;

        calculatedColumns = (containerWidth + gutter) / self.colWidth;
        // Widths given from getComputedStyle are not precise enough...
        if ( Math.ceil(calculatedColumns) - calculatedColumns < 0.01 ) {
            // e.g. calculatedColumns = 11.998876
            calculatedColumns = Math.ceil( calculatedColumns );
        }
        self.cols = Math.floor( calculatedColumns );
        self.cols = Math.max( self.cols, 1 );

        self.containerWidth = containerWidth;
    },

    /**
     * Adjust the height of the grid
     */
    _setContainerSize : function() {
        var self = this,
        gridHeight = Math.max.apply( Math, self.colYs );
        self.$container.css( 'height', gridHeight + 'px' );
    },

    /**
     * Fire events with .shuffle namespace
     */
    _fire : function( name, args ) {
        this.$container.trigger( name + '.shuffle', args && args.length ? args : [ this ] );
    },


    /**
     * Loops through each item that should be shown
     * Calculates the x and y position and then transitions it
     * @param {array} items - array of items that will be shown/layed out in order in their array.
     *     Because jQuery collection are always ordered in DOM order, we can't pass a jq collection
     * @param {function} complete callback function
     * @param {boolean} isOnlyPosition set this to true to only trigger positioning of the items
     */
    _layout: function( items, fn, isOnlyPosition, isHide ) {
        var self = this;

        fn = fn || self.filterEnd;

        self.layoutTransitionEnded = false;
        $.each(items, function(index) {
            var $this = $(items[index]),
            //how many columns does this brick span
            colSpan = Math.ceil( $this.outerWidth(true) / self.colWidth );
            colSpan = Math.min( colSpan, self.cols );

            if ( colSpan === 1 ) {
                // if brick spans only one column, just like singleMode
                self._placeItem( $this, self.colYs, fn, isOnlyPosition, isHide );
            } else {
                // brick spans more than one column
                // how many different places could this brick fit horizontally
                var groupCount = self.cols + 1 - colSpan,
                    groupY = [],
                    groupColY,
                    i;

                // for each group potential horizontal position
                for ( i = 0; i < groupCount; i++ ) {
                    // make an array of colY values for that one group
                    groupColY = self.colYs.slice( i, i + colSpan );
                    // and get the max value of the array
                    groupY[i] = Math.max.apply( Math, groupColY );
                }

                self._placeItem( $this, groupY, fn, isOnlyPosition, isHide );
            }
        });

        // `_layout` always happens after `_shrink`, so it's safe to process the style
        // queue here with styles from the shrink method
        self._processStyleQueue();

        // Adjust the height of the container
        self._setContainerSize();
    },

    _resetCols : function() {
        // reset columns
        var i = this.cols;
        this.colYs = [];
        while (i--) {
            this.colYs.push( 0 );
        }
    },

    _reLayout : function( callback, isOnlyPosition ) {
        var self = this;
        callback = callback || self.filterEnd;
        self._resetCols();

        // If we've already sorted the elements, keep them sorted
        if ( self.keepSorted && self.lastSort ) {
            self.sort( self.lastSort, true, isOnlyPosition );
        } else {
            self._layout( self.$items.filter('.filtered').get(), self.filterEnd, isOnlyPosition );
        }
    },

    // worker method that places brick in the columnSet with the the minY
    _placeItem : function( $item, setY, callback, isOnlyPosition, isHide ) {
        // get the minimum Y value from the columns
        var self = this,
            minimumY = Math.min.apply( Math, setY ),
            shortCol = 0;

        // Find index of short column, the first from the left where this item will go
        // if ( setY[i] === minimumY ) requires items' height to be exact every time.
        // The buffer value is very useful when the height is a percentage of the width
        for (var i = 0, len = setY.length; i < len; i++) {
            if ( setY[i] >= minimumY - self.buffer && setY[i] <= minimumY + self.buffer ) {
                shortCol = i;
                break;
            }
        }

        // Position the item
        var x = self.colWidth * shortCol,
        y = minimumY;
        x = Math.round( x + self.offset.left );
        y = Math.round( y + self.offset.top );

        // Save data for shrink
        $item.data( {x: x, y: y} );

        // Apply setHeight to necessary columns
        var setHeight = minimumY + $item.outerHeight( true ),
        setSpan = self.cols + 1 - len;
        for ( i = 0; i < setSpan; i++ ) {
            self.colYs[ shortCol + i ] = setHeight;
        }

        var transitionObj = {
            from: 'layout',
            $this: $item,
            x: x,
            y: y,
            scale: 1
        };

        if ( isOnlyPosition ) {
            transitionObj.skipTransition = true;
        } else {
            transitionObj.opacity = 1;
            transitionObj.callback = callback;
        }

        if ( isHide ) {
            transitionObj.opacity = 0;
        }

        self.styleQueue.push( transitionObj );
    },

    /**
     * Hides the elements that don't match our filter
     */
    _shrink : function( $collection, fn ) {
        var self = this,
            $concealed = $collection || self.$items.filter('.concealed'),
            transitionObj = {},
            callback = fn || self.shrinkEnd;

        // Abort if no items
        if ( !$concealed.length ) {
            return;
        }

        self._fire('shrink');

        self.shrinkTransitionEnded = false;
        $concealed.each(function() {
            var $this = $(this),
                data = $this.data();

            transitionObj = {
                from: 'shrink',
                $this: $this,
                x: data.x,
                y: data.y,
                scale : 0.001,
                opacity: 0,
                callback: callback
            };

            self.styleQueue.push( transitionObj );
        });
    },

    _onResize : function() {
        var self = this,
            containerWidth;

        // If shuffle is disabled, destroyed, don't do anything
        if ( !self.enabled || self.destroyed ) {
            return;
        }

        // Will need to check height in the future if it's layed out horizontaly
        containerWidth = self.$container.width();

        // containerWidth hasn't changed, don't do anything
        if ( containerWidth === self.containerWidth ) {
            return;
        }

        self.resized();
    },


    /**
     * Uses Modernizr's prefixed() to get the correct vendor property name and sets it using jQuery .css()
     *
     * @param {jq} $el the jquery object to set the css on
     * @param {string} prop the property to set (e.g. 'transition')
     * @param {string} value the value of the prop
     */
    setPrefixedCss : function( $el, prop, value ) {
        $el.css( this.prefixed( prop ), value );
    },


    /**
     * Returns things like `-webkit-transition` or `box-sizing` from `transition` or `boxSizing`, respectively
     *
     * @param {string} property to be prefixed.
     * @return {string} the prefixed css property
     */
    getPrefixed : function( prop ) {
        var styleName = this.prefixed( prop );
        return styleName ? styleName.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-') : styleName;
    },

    /**
     * Transitions an item in the grid
     *
     * @param {object}  opts options
     * @param {jQuery}  opts.$this jQuery object representing the current item
     * @param {int}     opts.x translate's x
     * @param {int}     opts.y translate's y
     * @param {String}  opts.left left position (used when no transforms available)
     * @param {String}  opts.top top position (used when no transforms available)
     * @param {float}   opts.scale amount to scale the item
     * @param {float}   opts.opacity opacity of the item
     * @param {String}  opts.height the height of the item (used when no transforms available)
     * @param {String}  opts.width the width of the item (used when no transforms available)
     * @param {function} opts.callback complete function for the animation
     */
    transition: function(opts) {
        var self = this,
        transform,
        // Only fire callback once per collection's transition
        complete = function() {
            if ( !self.layoutTransitionEnded && opts.from === 'layout' ) {
                self._fire('layout');
                opts.callback.call( self );
                self.layoutTransitionEnded = true;
            } else if ( !self.shrinkTransitionEnded && opts.from === 'shrink' ) {
                opts.callback.call( self );
                self.shrinkTransitionEnded = true;
            }
        };

        opts.callback = opts.callback || $.noop;

        // Use CSS Transforms if we have them
        if ( self.supported ) {

            // Make scale one if it's not preset
            if ( opts.scale === undefined ) {
                opts.scale = 1;
            }

            if (self.threeD) {
                transform = 'translate3d(' + opts.x + 'px, ' + opts.y + 'px, 0) scale3d(' + opts.scale + ', ' + opts.scale + ', 1)';
            } else {
                transform = 'translate(' + opts.x + 'px, ' + opts.y + 'px) scale(' + opts.scale + ', ' + opts.scale + ')';
            }

            if ( opts.x !== undefined ) {
                self.setPrefixedCss(opts.$this, 'transform', transform);
            }

            if ( opts.opacity !== undefined ) {
                // Update css to trigger CSS Animation
                opts.$this.css('opacity' , opts.opacity);
            }

            opts.$this.one(self.transitionend, complete);
        } else {

            var cssObj = {
                left: opts.x,
                top: opts.y,
                opacity: opts.opacity
            };

            // Use jQuery to animate left/top
            opts.$this.stop( true ).animate( cssObj, self.speed, 'swing', complete);
        }
    },

    _processStyleQueue : function() {
        var self = this,
            queue = self.styleQueue;

        $.each( queue, function(i, transitionObj) {

            if ( transitionObj.skipTransition ) {
                self._skipTransition( transitionObj.$this[0], function() {
                    self.transition( transitionObj );
                });
            } else {
                self.transition( transitionObj );
            }
        });

        // Remove everything in the style queue
        self.styleQueue.length = 0;
    },

    shrinkEnd: function() {
        this._fire('shrunk');
    },

    filterEnd: function() {
        this._fire('filtered');
    },

    sortEnd: function() {
        this._fire('sorted');
    },

    /**
     * Change a property or execute a function which will not have a transition
     * @param  {Element}         element    DOM element that won't be transitioned
     * @param  {string|function} property   the new style property which will be set or a function which will be called
     * @param  {string}          [value]    the value that `property` should be.
     */
    _skipTransition : function( element, property, value ) {
        var self = this,
            reflow,
            durationName = self.transitionDuration,
            duration = element.style[ durationName ];

        // Set the duration to zero so it happens immediately
        element.style[ durationName ] = '0ms'; // ms needed for firefox!

        if ( $.isFunction( property ) ) {
            property();
        } else {
            element.style[ property ] = value;
        }

        // Force reflow
        reflow = element.offsetWidth;

        // Put the duration back
        element.style[ durationName ] = duration;
    },

    _addItems : function( $newItems, animateIn, isSequential ) {
        var self = this,
            $passed,
            passed;

        if ( !self.supported ) {
            animateIn = false;
        }

        $newItems.addClass('shuffle-item');
        self._initItems( $newItems );
        self._setTransitions( $newItems );
        self.$items = self._getItems();

        // Hide all items
        $newItems.css('opacity', 0);

        // Get ones that passed the current filter
        $passed = self._filter( undefined, $newItems );
        passed = $passed.get();

        // How many filtered elements?
        self._updateItemCount();

        if ( animateIn ) {
            self._layout( passed, null, true, true );

            if ( isSequential ) {
                self._setSequentialDelay( $passed );
            }

            self._revealAppended( $passed );
        } else {
            self._layout( passed );
        }
    },

    _revealAppended : function( $newFilteredItems ) {
        var self = this;

        setTimeout(function() {
            $newFilteredItems.each(function(i, el) {
                self.transition({
                    from: 'reveal',
                    $this: $(el),
                    opacity: 1
                });
            });
        }, self.revealAppendedDelay);
    },


    /**
     * Public Methods
     */

    /**
     * The magic. This is what makes the plugin 'shuffle'
     * @param  {String|Function} category category to filter by. Can be a function
     * @param {Object} [sortObj] A sort object which can sort the filtered set
     */
    shuffle : function( category, sortObj ) {
        var self = this;

        if ( !self.enabled ) {
            return;
        }

        if ( !category ) {
            category = 'all';
        }

        self._filter( category );
        // Save the last filter in case elements are appended.
        self.lastFilter = category;

        // How many filtered elements?
        self._updateItemCount();

        self._resetCols();

        // Shrink each concealed item
        self._shrink();

        // If given a valid sort object, save it so that _reLayout() will sort the items
        if ( sortObj ) {
            self.lastSort = sortObj;
        }
        // Update transforms on .filtered elements so they will animate to their new positions
        self._reLayout();
    },

    /**
     * Gets the .filtered elements, sorts them, and passes them to layout
     *
     * @param {object} opts the options object for the sorted plugin
     * @param {Boolean} [fromFilter] was called from Shuffle.filter method.
     */
    sort: function( opts, fromFilter, isOnlyPosition ) {
        var self = this,
            items = self.$items.filter('.filtered').sorted(opts);

        if ( !fromFilter ) {
            self._resetCols();
        }

        self._layout(items, function() {
            if (fromFilter) {
                self.filterEnd();
            }
            self.sortEnd();
        }, isOnlyPosition);

        self.lastSort = opts;
    },

    /**
     * Relayout everything
     */
    resized: function( isOnlyLayout ) {
        if ( this.enabled ) {

            if ( !isOnlyLayout ) {
                // Get updated colCount
                this._setColumns();
            }

            // Layout items
            this._reLayout();
        }
    },

    /**
     * Use this instead of `update()` if you don't need the columns and gutters updated
     * Maybe an image inside `shuffle` loaded (and now has a height), which means calculations
     * could be off.
     */
    layout : function() {
        this.update( true );
    },

    update : function( isOnlyLayout ) {
        this.resized( isOnlyLayout );
    },

    /**
     * New items have been appended to shuffle. Fade them in sequentially
     * @param  {jQuery}  $newItems    jQuery collection of new items
     * @param  {Boolean}  [animateIn]    If false, the new items won't animate in
     * @param  {Boolean} [isSequential] If false, new items won't sequentially fade in
     */
    appended : function( $newItems, animateIn, isSequential ) {
        // True if undefined
        animateIn = animateIn === false ? false : true;
        isSequential = isSequential === false ? false : true;

        this._addItems( $newItems, animateIn, isSequential );
    },

    /**
     * Disables shuffle from updating dimensions and layout on resize
     */
    disable : function() {
        this.enabled = false;
    },

    /**
     * Enables shuffle again
     * @param  {Boolean} isUpdateLayout if undefined, shuffle will update columns and gutters
     */
    enable : function( isUpdateLayout ) {
        this.enabled = true;
        if ( isUpdateLayout !== false ) {
            this.update();
        }
    },

    /**
     * Remove 1 or more shuffle items
     * @param  {jQuery} $collection a jQuery object containing one or more element in shuffle
     * @return {Shuffle}             the shuffle object
     */
    remove : function( $collection ) {

        // If this isn't a jquery object, exit
        if ( !$collection.length || !$collection.jquery ) {
            return;
        }

        var self = this;

        // Hide collection first
        self._shrink( $collection, function() {
            var shuffle = this;

            // Remove the collection in the callback
            $collection.remove();

            // Update the items, layout, count and fire off `removed` event
            setTimeout(function() {
                shuffle.$items = shuffle._getItems();
                shuffle.layout();
                shuffle._updateItemCount();
                shuffle._fire( 'removed', [ $collection, shuffle ] );

                // Let it get garbage collected
                $collection = null;
            }, 0);
        });

        // Process changes
        self._processStyleQueue();

        return self;
    },

    /**
     * Destroys shuffle, removes events, styles, and classes
     */
    destroy: function() {
        var self = this;

        // If there is more than one shuffle instance on the page,
        // removing the resize handler from the window would remove them
        // all. This is why a unique value is needed.
        self.$window.off('.' + self.unique);

        // Reset container styles
        self.$container
            .removeClass('shuffle')
            .removeAttr('style')
            .removeData('shuffle');

        // Reset individual item styles
        self.$items
            .removeAttr('style')
            .removeClass('concealed filtered shuffle-item');

        // Set a flag so if a debounced resize has been triggered,
        // it can first check if it is actually destroyed and not doing anything
        self.destroyed = true;
    }

};

// Overrideable options
Shuffle.options = {
    group: 'all', // Filter group
    speed: 250, // Transition/animation speed (milliseconds)
    easing: 'ease-out', // css easing function to use
    itemSelector: '', // e.g. '.picture-item'
    sizer: null, // sizer element. Can be anything columnWidth is
    gutterWidth: 0, // a static number or function that tells the plugin how wide the gutters between columns are (in pixels)
    columnWidth: 0, // a static number or function that returns a number which tells the plugin how wide the columns are (in pixels)
    delimeter: null, // if your group is not json, and is comma delimeted, you could set delimeter to ','
    buffer: 0, // useful for percentage based heights when they might not always be exactly the same (in pixels)
    initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method
    throttle: $.throttle || null, // By default, shuffle will try to throttle the resize event. This option will change the method it uses
    throttleTime: 300, // How often shuffle can be called on resize (in milliseconds)
    sequentialFadeDelay: 150, // Delay between each item that fades in when adding items
    supported: Modernizr.csstransforms && Modernizr.csstransitions // supports transitions and transforms
};

// Not overrideable
Shuffle.settings = {
    $sizer: null,
    useSizer: false,
    itemCss : { // default CSS for each item
        position: 'absolute',
        top: 0,
        left: 0
    },
    offset: { top: 0, left: 0 },
    revealAppendedDelay: 300,
    keepSorted : true, // Keep sorted when shuffling/layout
    enabled: true,
    destroyed: false,
    styleQueue: [],
    prefixed: Modernizr.prefixed,
    threeD: Modernizr.csstransforms3d // supports 3d transforms
};


// Plugin definition
$.fn.shuffle = function( opts ) {
    var args = Array.prototype.slice.call( arguments, 1 );
    return this.each(function() {
        var $this = $( this ),
            shuffle = $this.data( 'shuffle' );

        // If we don't have a stored shuffle, make a new one and save it
        if ( !shuffle ) {
            shuffle = new Shuffle( $this, opts );
            $this.data( 'shuffle', shuffle );
        }

        if ( typeof opts === 'string' && shuffle[ opts ] ) {
            shuffle[ opts ].apply( shuffle, args );
        }
    });
};

})(jQuery, Modernizr);
