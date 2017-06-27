/*!
 * Shuffle.js by @Vestride
 * Categorize, sort, and filter a responsive grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2+
 * @license MIT license
 * @version 2.1.2
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'modernizr'], factory);
  } else {
    factory(window.jQuery, window.Modernizr);
  }
})(function($, Modernizr, undefined) {

'use strict';


// Validate Modernizr exists.
// Shuffle requires `csstransitions`, `csstransforms`, `csstransforms3d`,
// and `prefixed` to exist on the Modernizr object.
if (typeof Modernizr !== 'object') {
  throw new Error('Shuffle.js requires Modernizr.\n' +
      'http://vestride.github.io/Shuffle/#dependencies');
}


/**
 * Returns css prefixed properties like `-webkit-transition` or `box-sizing`
 * from `transition` or `boxSizing`, respectively.
 * @param {(string|boolean)} prop Property to be prefixed.
 * @return {string} The prefixed css property.
 */
function dashify( prop ) {
  if (!prop) {
    return '';
  }

  // Replace upper case with dash-lowercase,
  // then fix ms- prefixes because they're not capitalized.
  return prop.replace(/([A-Z])/g, function( str, m1 ) {
    return '-' + m1.toLowerCase();
  }).replace(/^ms-/,'-ms-');
}

// Constant, prefixed variables.
var TRANSITION = Modernizr.prefixed('transition');
var TRANSITION_DELAY = Modernizr.prefixed('transitionDelay');
var TRANSITION_DURATION = Modernizr.prefixed('transitionDuration');
var TRANSITIONEND = {
  'WebkitTransition' : 'webkitTransitionEnd',
  'transition' : 'transitionend'
}[ TRANSITION ];
var TRANSFORM = Modernizr.prefixed('transform');
var CSS_TRANSFORM = dashify(TRANSFORM);

// Constants
var CAN_TRANSITION_TRANSFORMS = Modernizr.csstransforms && Modernizr.csstransitions;
var HAS_TRANSFORMS_3D = Modernizr.csstransforms3d;
var SHUFFLE = 'shuffle';

// Configurable. You can change these constants to fit your application.
// The default scale and concealed scale, however, have to be different values.
var ALL_ITEMS = 'all';
var FILTER_ATTRIBUTE_KEY = 'groups';
var DEFAULT_SCALE = 1;
var CONCEALED_SCALE = 0.001;


// Underscore's throttle function.
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options = options || {};
  var later = function() {
    previous = options.leading === false ? 0 : $.now();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = $.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

// Used for unique instance variables
var id = 0;


/**
 * Categorize, sort, and filter a responsive grid of items.
 *
 * @param {Element|jQuery} element An element or a jQuery collection which
 *     is the parent container for the grid items.
 * @param {Object} [options=Shuffle.options] Options object.
 * @constructor
 */
var Shuffle = function( element, options ) {
  options = options || {};
  $.extend( this, Shuffle.options, options, Shuffle.settings );

  this.$el = $(element);
  this.$window = $(window);
  this.unique = 'shuffle_' + id++;

  this._fire( Shuffle.EventType.LOADING );
  this._init();

  // Dispatch the done event asynchronously so that people can bind to it after
  // Shuffle has been initialized.
  setTimeout( $.proxy(function() {
    this.initialized = true;
    this._fire( Shuffle.EventType.DONE );
  }, this), 16 );
};


/**
 * Events the container element emits with the .shuffle namespace.
 * For example, "done.shuffle".
 * @enum {string}
 */
Shuffle.EventType = {
  LOADING: 'loading',
  DONE: 'done',
  SHRINK: 'shrink',
  SHRUNK: 'shrunk',
  FILTER: 'filter',
  FILTERED: 'filtered',
  SORTED: 'sorted',
  LAYOUT: 'layout',
  REMOVED: 'removed'
};


Shuffle.prototype = {

  _init : function() {
    var self = this,
        containerCSS,
        containerWidth,
        resizeFunction = $.proxy( self._onResize, self ),
        debouncedResize = self.throttle ?
            self.throttle( resizeFunction, self.throttleTime ) :
            resizeFunction,
        sort = self.initialSort ? self.initialSort : null;


    self._layoutList = [];
    self._shrinkList = [];

    self._setVars();

    // Zero out all columns
    self._resetCols();

    // Add classes and invalidate styles
    self._addClasses();

    // Set initial css for each item
    self._initItems();

    // Bind resize events
    // http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
    self.$window.on('resize.' + SHUFFLE + '.' + self.unique, debouncedResize);

    // Get container css all in one request. Causes reflow
    containerCSS = self.$el.css(['paddingLeft', 'paddingRight', 'position']);
    containerWidth = self._getOuterWidth( self.$el[0] );

    // Position cannot be static.
    if ( containerCSS.position === 'static' ) {
      self.$el[0].style.position = 'relative';
    }

    // Get offset from container
    self.offset = {
      left: parseInt( containerCSS.paddingLeft, 10 ) || 0,
      top: parseInt( containerCSS.paddingTop, 10 ) || 0
    };

    // We already got the container's width above, no need to cause another reflow getting it again...
    // Calculate the number of columns there will be
    self._setColumns( parseInt( containerWidth, 10 ) );

    // Kick off!
    self.shuffle( self.group, sort );

    // The shuffle items haven't had transitions set on them yet
    // so the user doesn't see the first layout. Set them now that the first layout is done.
    if ( self.supported ) {
      setTimeout(function() {
        self._setTransitions();
        self.$el[0].style[ TRANSITION ] = 'height ' + self.speed + 'ms ' + self.easing;
      }, 0);
    }
  },

  // Will invalidate styles
  _addClasses : function() {
    this.$el.addClass( SHUFFLE );
    this.$items.addClass('shuffle-item filtered');
  },

  _setVars : function() {
    var self = this,
        columnWidth = self.columnWidth;

    self.$items = self._getItems();

    // Column width is the default setting and sizer is not (meaning passed in)
    // Assume they meant column width to be the sizer
    if ( columnWidth === 0 && self.sizer !== null ) {
      columnWidth = self.sizer;
    }

    // If column width is a string, treat is as a selector and search for the
    // sizer element within the outermost container
    if ( typeof columnWidth === 'string' ) {
      self.$sizer = self.$el.find( columnWidth );

    // Check for an element
    } else if ( columnWidth && columnWidth.nodeType && columnWidth.nodeType === 1 ) {
      // Wrap it in jQuery
      self.$sizer = $( columnWidth );

    // Check for jQuery object
    } else if ( columnWidth && columnWidth.jquery ) {
      self.$sizer = columnWidth;
    }

    if ( self.$sizer && self.$sizer.length ) {
      self.useSizer = true;
      self.sizer = self.$sizer[0];
    }
  },


  /**
   * Filter the elements by a category.
   * @param {string} [category] Category to filter by. If it's given, the last
   *     category will be used to filter the items.
   * @param {jQuery} [$collection] Optionally filter a collection. Defaults to
   *     all the items.
   * @return {jQuery} Filtered items.
   */
  _filter : function( category, $collection ) {
    var self = this,
        isPartialSet = $collection !== undefined,
        $items = isPartialSet ? $collection : self.$items,
        $filtered = $();

    category = category || self.lastFilter;

    self._fire( Shuffle.EventType.FILTER );

    // Loop through each item and use provided function to determine
    // whether to hide it or not.
    if ( $.isFunction( category ) ) {
      $items.each(function() {
        var $item = $(this);
        if ( category.call($item[0], $item, self) ) {
          $filtered = $filtered.add( $item );
        }
      });

    // Otherwise we've been passed a category to filter by
    } else {
      self.group = category;

      // category === 'all', add filtered class to everything
      if ( category === ALL_ITEMS ) {
        $filtered = $items;

      // Check each element's data-groups attribute against the given category.
      } else {
        $items.each(function() {
          var $item = $(this),
              groups = $item.data( FILTER_ATTRIBUTE_KEY ),
              keys = self.delimeter && !$.isArray( groups ) ?
                groups.split( self.delimeter ) :
                groups;

          if ( $.inArray(category, keys) > -1 ) {
            $filtered = $filtered.add( $item );
          }
        });
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
   * @param {jQuery} [$items] Optionally specifiy at set to initialize
   */
  _initItems : function( $items ) {
    $items = $items || this.$items;
    $items.css( this.itemCss ).data('position', {x: 0, y: 0});
  },

  _updateItemCount : function() {
    this.visibleItems = this.$items.filter('.filtered').length;
  },

  _setTransition : function( element ) {
    element.style[ TRANSITION ] = CSS_TRANSFORM + ' ' + this.speed + 'ms ' + this.easing + ', opacity ' + this.speed + 'ms ' + this.easing;
  },

  _setTransitions : function( $items ) {
    var self = this;

    $items = $items || self.$items;
    $items.each(function() {
      self._setTransition( this );
    });
  },

  _setSequentialDelay : function( $collection ) {
    var self = this;

    if ( !self.supported ) {
      return;
    }

    // $collection can be an array of dom elements or jquery object
    $.each($collection, function(i, el) {
      // This works because the transition-property: transform, opacity;
      el.style[ TRANSITION_DELAY ] = '0ms,' + ((i + 1) * self.sequentialFadeDelay) + 'ms';

      // Set the delay back to zero after one transition
      $(el).on(TRANSITIONEND + '.' + self.unique, function(evt) {
        var target = evt.currentTarget;
        if ( target === evt.target ) {
          target.style[ TRANSITION_DELAY ] = '0ms';
          $(target).off(TRANSITIONEND + '.' + self.unique);
        }
      });
    });
  },

  _getItems : function() {
    return this.$el.children( this.itemSelector );
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


  /**
   * Returns the outer width of an element, optionally including its margins.
   * @param {Element} element The element.
   * @param {boolean} [includeMargins] Whether to include margins. Default is false.
   * @return {number} The width.
   */
  _getOuterWidth : function( element, includeMargins ) {
    var width = element.offsetWidth;

    // Use jQuery here because it uses getComputedStyle internally and is
    // cross-browser. Using the style property of the element will only work
    // if there are inline styles.
    if (includeMargins) {
      var styles = $(element).css(['marginLeft', 'marginRight']);

      // Defaults to zero if parsing fails because IE will return 'auto' when
      // the element doesn't have margins instead of the computed style.
      var marginLeft = parseFloat(styles.marginLeft) || 0;
      var marginRight = parseFloat(styles.marginRight) || 0;
      width += marginLeft + marginRight;
    }

    return width;
  },


  /**
   * Returns the outer height of an element, optionally including its margins.
   * @param {Element} element The element.
   * @param {boolean} [includeMargins] Whether to include margins. Default is false.
   * @return {number} The height.
   */
  _getOuterHeight : function( element, includeMargins ) {
    var height = element.offsetHeight;

    if (includeMargins) {
      var styles = $(element).css(['marginTop', 'marginBottom']);
      var marginTop = parseFloat(styles.marginTop) || 0;
      var marginBottom = parseFloat(styles.marginBottom) || 0;
      height += marginTop + marginBottom;
    }

    return height;
  },


  _getColumnSize : function( gutterSize, containerWidth ) {
    var size;

    // If the columnWidth property is a function, then the grid is fluid
    if ( $.isFunction( this.columnWidth ) ) {
      size = this.columnWidth(containerWidth);

    // columnWidth option isn't a function, are they using a sizing element?
    } else if ( this.useSizer ) {
      size = this._getPreciseDimension(this.sizer, 'width');

    // if not, how about the explicitly set option?
    } else if ( this.columnWidth ) {
      size = this.columnWidth;

    // or use the size of the first item
    } else if ( this.$items.length > 0 ) {
      size = this._getOuterWidth(this.$items[0], true);

    // if there's no items, use size of container
    } else {
      size = containerWidth;
    }

    // Don't let them set a column width of zero.
    if ( size === 0 ) {
      size = containerWidth;
    }

    return size + gutterSize;
  },


  _getGutterSize : function( containerWidth ) {
    var size;
    if ( $.isFunction( this.gutterWidth ) ) {
      size = this.gutterWidth(containerWidth);
    } else if ( this.useSizer ) {
      size = this._getPreciseDimension(this.sizer, 'marginLeft');
    } else {
      size = this.gutterWidth;
    }

    return size;
  },


  /**
   * Calculate the number of columns to be used. Gets css if using sizer element.
   * @param {number} [theContainerWidth] Optionally specify a container width if it's already available.
   */
  _setColumns : function( theContainerWidth ) {
    var containerWidth = theContainerWidth || this._getOuterWidth(this.$el[0]);
    var gutter = this._getGutterSize(containerWidth);
    var columnWidth = this._getColumnSize(gutter, containerWidth);
    var calculatedColumns = (containerWidth + gutter) / columnWidth;

    // Widths given from getComputedStyle are not precise enough...
    if ( Math.abs(Math.round(calculatedColumns) - calculatedColumns) < 0.03 ) {
      // e.g. calculatedColumns = 11.998876
      calculatedColumns = Math.round( calculatedColumns );
    }

    this.cols = Math.max( Math.floor(calculatedColumns), 1 );
    this.containerWidth = containerWidth;
    this.colWidth = columnWidth;
  },

  /**
   * Adjust the height of the grid
   */
  _setContainerSize : function() {
    this.$el.css( 'height', Math.max.apply( Math, this.colYs ) );
  },

  /**
   * Fire events with .shuffle namespace
   */
  _fire : function( name, args ) {
    this.$el.trigger( name + '.' + SHUFFLE, args && args.length ? args : [ this ] );
  },


  /**
   * Loops through each item that should be shown and calculates the x, y position.
   * @param {Array.<Element>} items Array of items that will be shown/layed out in order in their array.
   *     Because jQuery collection are always ordered in DOM order, we can't pass a jq collection.
   * @param {function} fn Callback function.
   * @param {boolean} isOnlyPosition If true this will position the items with zero opacity.
   */
  _layout : function( items, fn, isOnlyPosition ) {
    var self = this;

    fn = fn || self._filterEnd;

    $.each(items, function(index, item) {
      var $item = $(item);
      var itemData = $item.data();
      var currPos = itemData.position;
      var pos = self._getItemPosition( $item );

      // Save data for shrink
      $item.data( 'position', pos );

      // If the item will not change its position, do not add it to the render
      // queue. Transitions don't fire when setting a property to the same value.
      if ( pos.x === currPos.x && pos.y === currPos.y && itemData.scale === DEFAULT_SCALE ) {
        return;
      }

      var transitionObj = {
        $item: $item,
        x: pos.x,
        y: pos.y,
        scale: DEFAULT_SCALE
      };

      if ( isOnlyPosition ) {
        transitionObj.skipTransition = true;
        transitionObj.opacity = 0;
      } else {
        transitionObj.opacity = 1;
        transitionObj.callback = fn;
      }

      self.styleQueue.push( transitionObj );
      self._layoutList.push( $item[0] );
    });

    // `_layout` always happens after `_shrink`, so it's safe to process the style
    // queue here with styles from the shrink method
    self._processStyleQueue();

    // Adjust the height of the container
    self._setContainerSize();
  },

  // Reset columns.
  _resetCols : function() {
    var i = this.cols;
    this.colYs = [];
    while (i--) {
      this.colYs.push( 0 );
    }
  },

  _reLayout : function() {
    this._resetCols();

    // If we've already sorted the elements, keep them sorted
    if ( this.lastSort ) {
      this.sort( this.lastSort, true );
    } else {
      this._layout( this.$items.filter('.filtered').get(), this._filterEnd );
    }
  },

  _getItemPosition : function( $item ) {
    var self = this;
    var itemWidth = self._getOuterWidth( $item[0], true );
    var columnSpan = itemWidth / self.colWidth;

    // If the difference between the rounded column span number and the
    // calculated column span number is really small, round the number to
    // make it fit.
    if ( Math.abs(Math.round(columnSpan) - columnSpan) < 0.03 ) {
      // e.g. columnSpan = 4.0089945390298745
      columnSpan = Math.round( columnSpan );
    }

    // How many columns does this item span. Ensure it's not more than the
    // amount of columns in the whole layout.
    var colSpan = Math.min( Math.ceil(columnSpan), self.cols );

    // The item spans only one column.
    if ( colSpan === 1 ) {
      return self._placeItem( $item, self.colYs );

    // The item spans more than one column, figure out how many different
    // places it could fit horizontally
    } else {
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

      return self._placeItem( $item, groupY );
    }
  },

  // worker method that places item in the columnSet with the the minY
  _placeItem : function( $item, setY ) {
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
    var position = {
      x: Math.round( (self.colWidth * shortCol) + self.offset.left ),
      y: Math.round( minimumY + self.offset.top )
    };

    // Apply setHeight to necessary columns
    var setHeight = minimumY + self._getOuterHeight( $item[0], true ),
    setSpan = self.cols + 1 - len;
    for ( i = 0; i < setSpan; i++ ) {
      self.colYs[ shortCol + i ] = setHeight;
    }

    return position;
  },

  /**
   * Hides the elements that don't match our filter.
   * @param {jQuery} $collection jQuery collection to shrink.
   * @param {Function} fn Callback function.
   * @private
   */
  _shrink : function( $collection, fn ) {
    var self = this,
        $concealed = $collection || self.$items.filter('.concealed');

    fn = fn || self._shrinkEnd;

    // Abort if no items
    if ( !$concealed.length ) {
      return;
    }

    self._fire( Shuffle.EventType.SHRINK );

    $concealed.each(function() {
      var $item = $(this);
      var itemData = $item.data();
      var alreadyShrunk = itemData.scale === CONCEALED_SCALE;

      // Continuing would add a transitionend event listener to the element, but
      // that listener would execute because the transform and opacity would
      // stay the same.
      if ( alreadyShrunk ) {
        return;
      }

      var transitionObj = {
        $item: $item,
        x: itemData.position.x,
        y: itemData.position.y,
        scale : CONCEALED_SCALE,
        opacity: 0,
        callback: fn
      };

      self.styleQueue.push( transitionObj );
      self._shrinkList.push( $item[0] );
    });
  },

  _onResize : function() {
    // If shuffle is disabled, destroyed, don't do anything
    if ( !this.enabled || this.destroyed ) {
      return;
    }

    // Will need to check height in the future if it's layed out horizontaly
    var containerWidth = this._getOuterWidth(this.$el[0]);

    // containerWidth hasn't changed, don't do anything
    if ( containerWidth === this.containerWidth ) {
      return;
    }

    this.resized();
  },


  /**
   * If the browser has 3d transforms available, build a string with those,
   * otherwise use 2d transforms.
   * @param {number} x X position.
   * @param {number} y Y position.
   * @param {number} scale Scale amount.
   * @return {string} A normalized string which can be used with the transform style.
   * @private
   */
  _getItemTransformString : function(x, y, scale) {
    if ( HAS_TRANSFORMS_3D ) {
      return 'translate3d(' + x + 'px, ' + y + 'px, 0) scale3d(' + scale + ', ' + scale + ', 1)';
    } else {
      return 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ', ' + scale + ')';
    }
  },

  _getStylesForTransition : function( opts ) {
    var styles = {
      opacity: opts.opacity
    };

    if ( this.supported ) {
      if ( opts.x !== undefined ) {
        styles[ TRANSFORM ] = this._getItemTransformString( opts.x, opts.y, opts.scale );
      }
    } else {
      styles.left = opts.x;
      styles.top = opts.y;
    }


    // Show the item if its opacity will be 1.
    if ( opts.opacity === 1 ) {
      styles.visibility = 'visible';
    }

    return styles;
  },

  /**
   * Transitions an item in the grid
   *
   * @param {Object}   opts options
   * @param {jQuery}   opts.$item jQuery object representing the current item
   * @param {number}   opts.x translate's x
   * @param {number}   opts.y translate's y
   * @param {number}   opts.scale amount to scale the item
   * @param {number}   opts.opacity opacity of the item
   * @param {Function} opts.callback complete function for the animation
   * @private
   */
  _transition : function( opts ) {
    opts.$item.data('scale', opts.scale);

    var styles = this._getStylesForTransition( opts );
    this._startItemAnimation( opts.$item, styles, opts.callback );
  },


  _startItemAnimation : function( $item, styles, callback ) {
    var willBeVisible = styles.opacity === 1;
    var complete = $.proxy( this._handleItemAnimationEnd, this,
        callback || $.noop, $item[0], willBeVisible );

    // Use CSS Transforms if we have them
    if ( this.supported ) {

      $item.css( styles );

      // Transitions are not set until shuffle has loaded to avoid the initial transition.
      if ( this.initialized ) {
        // Namespaced because the reveal appended function also wants to know
        // about the transition end event.
        $item.on( TRANSITIONEND + '.shuffleitem', complete );
      } else {
        complete();
      }

    // Use jQuery to animate left/top
    } else {
      // jQuery cannot animate visibility, set it immediately.
      if ( 'visibility' in styles ) {
        $item.css('visibility', styles.visibility);
        delete styles.visibility;
      }
      $item.stop( true ).animate( styles, this.speed, 'swing', complete );
    }
  },


  _handleItemAnimationEnd : function( callback, item, willBeVisible, evt ) {
    // Make sure this event handler has not bubbled up from a child.
    if ( evt ) {
      if ( evt.target === item ) {
        $( item ).off( '.shuffleitem' );
      } else {
        return;
      }
    }

    if ( this._layoutList.length > 0 && $.inArray( item, this._layoutList ) > -1 ) {
      this._fire( Shuffle.EventType.LAYOUT );
      callback.call( this );
      this._layoutList.length = 0;
    } else if ( this._shrinkList.length > 0 && $.inArray( item, this._shrinkList ) > -1 ) {
      callback.call( this );
      this._shrinkList.length = 0;
    }

    if ( !willBeVisible ) {
      item.style.visibility = 'hidden';
    }
  },

  _processStyleQueue : function() {
    var self = this;

    $.each(this.styleQueue, function(i, transitionObj) {

      if ( transitionObj.skipTransition ) {
        self._skipTransition(transitionObj.$item[0], function() {
          transitionObj.$item.css( self._getStylesForTransition( transitionObj ) );
        });
      } else {
        self._transition( transitionObj );
      }
    });

    // Remove everything in the style queue
    self.styleQueue.length = 0;
  },

  _shrinkEnd : function() {
    this._fire( Shuffle.EventType.SHRUNK );
  },

  _filterEnd : function() {
    this._fire( Shuffle.EventType.FILTERED );
  },

  _sortEnd : function() {
    this._fire( Shuffle.EventType.SORTED );
  },

  /**
   * Change a property or execute a function which will not have a transition
   * @param {Element} element DOM element that won't be transitioned
   * @param {(string|Function)} property The new style property which will be set or a function which will be called
   * @param {string} [value] The value that `property` should be.
   * @private
   */
  _skipTransition : function( element, property, value ) {
    var duration = element.style[ TRANSITION_DURATION ];

    // Set the duration to zero so it happens immediately
    element.style[ TRANSITION_DURATION ] = '0ms'; // ms needed for firefox!

    if ( $.isFunction( property ) ) {
      property();
    } else {
      element.style[ property ] = value;
    }

    // Force reflow
    var reflow = element.offsetWidth;
    // Avoid jshint warnings: unused variables and expressions.
    reflow = null;

    // Put the duration back
    element.style[ TRANSITION_DURATION ] = duration;
  },

  _addItems : function( $newItems, animateIn, isSequential ) {
    var self = this;

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
    var $passed = self._filter( undefined, $newItems );
    var passed = $passed.get();

    // How many filtered elements?
    self._updateItemCount();

    if ( animateIn ) {
      self._layout( passed, null, true );

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
        self._transition({
          $item: $(el),
          opacity: 1,
          scale: DEFAULT_SCALE
        });
      });
    }, self.revealAppendedDelay);
  },


  /**
   * Public Methods
   */

  /**
   * The magic. This is what makes the plugin 'shuffle'
   * @param {(string|Function)} [category] Category to filter by. Can be a function
   * @param {Object} [sortObj] A sort object which can sort the filtered set
   */
  shuffle : function( category, sortObj ) {
    var self = this;

    if ( !self.enabled ) {
      return;
    }

    if ( !category ) {
      category = ALL_ITEMS;
    }

    self._filter( category );
    // Save the last filter in case elements are appended.
    self.lastFilter = category;

    // How many filtered elements?
    self._updateItemCount();

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
   * @param {Object} opts the options object for the sorted plugin
   * @param {boolean} [fromFilter] was called from Shuffle.filter method.
   */
  sort : function( opts, fromFilter ) {
    var self = this,
        items = self.$items.filter('.filtered').sorted(opts);

    if ( !fromFilter ) {
      self._resetCols();
    }

    self._layout(items, function() {
      if (fromFilter) {
        self._filterEnd();
      }
      self._sortEnd();
    });

    self.lastSort = opts;
  },

  /**
   * Relayout everything
   */
  resized : function( isOnlyLayout ) {
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
   * @param {jQuery} $newItems jQuery collection of new items
   * @param {boolean} [animateIn] If false, the new items won't animate in
   * @param {boolean} [isSequential] If false, new items won't sequentially fade in
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
   * @param {boolean} [isUpdateLayout=true] if undefined, shuffle will update columns and gutters
   */
  enable : function( isUpdateLayout ) {
    this.enabled = true;
    if ( isUpdateLayout !== false ) {
      this.update();
    }
  },

  /**
   * Remove 1 or more shuffle items
   * @param {jQuery} $collection A jQuery object containing one or more element in shuffle
   * @return {Shuffle} The shuffle object
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
        shuffle._fire( Shuffle.EventType.REMOVED, [ $collection, shuffle ] );

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
  destroy : function() {
    var self = this;

    // If there is more than one shuffle instance on the page,
    // removing the resize handler from the window would remove them
    // all. This is why a unique value is needed.
    self.$window.off('.' + self.unique);

    // Reset container styles
    self.$el
        .removeClass( SHUFFLE )
        .removeAttr('style')
        .removeData( SHUFFLE );

    // Reset individual item styles
    self.$items
        .removeAttr('style')
        .removeClass('concealed filtered shuffle-item');

    // Null DOM references
    self.$window = null;
    self.$items = null;
    self.$el = null;
    self.$sizer = null;
    self.sizer = null;

    // Set a flag so if a debounced resize has been triggered,
    // it can first check if it is actually destroyed and not doing anything
    self.destroyed = true;
  }
};


// Overrideable options
Shuffle.options = {
  group: ALL_ITEMS, // Filter group
  speed: 250, // Transition/animation speed (milliseconds)
  easing: 'ease-out', // css easing function to use
  itemSelector: '', // e.g. '.picture-item'
  sizer: null, // sizer element. Can be anything columnWidth is
  gutterWidth: 0, // a static number or function that tells the plugin how wide the gutters between columns are (in pixels)
  columnWidth: 0, // a static number or function that returns a number which tells the plugin how wide the columns are (in pixels)
  delimeter: null, // if your group is not json, and is comma delimeted, you could set delimeter to ','
  buffer: 0, // useful for percentage based heights when they might not always be exactly the same (in pixels)
  initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method
  throttle: throttle, // By default, shuffle will try to throttle the resize event. This option will change the method it uses
  throttleTime: 300, // How often shuffle can be called on resize (in milliseconds)
  sequentialFadeDelay: 150, // Delay between each item that fades in when adding items
  supported: CAN_TRANSITION_TRANSFORMS // supports transitions and transforms
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
  enabled: true,
  destroyed: false,
  initialized: false,
  styleQueue: []
};


// Plugin definition
$.fn.shuffle = function( opts ) {
  var args = Array.prototype.slice.call( arguments, 1 );
  return this.each(function() {
    var $this = $( this ),
        shuffle = $this.data( SHUFFLE );

    // If we don't have a stored shuffle, make a new one and save it
    if ( !shuffle ) {
      shuffle = new Shuffle( $this, opts );
      $this.data( SHUFFLE, shuffle );
    }

    if ( typeof opts === 'string' && shuffle[ opts ] ) {
      shuffle[ opts ].apply( shuffle, args );
    }
  });
};


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

return Shuffle;

});
