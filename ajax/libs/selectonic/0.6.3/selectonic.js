/*! Selectonic - v0.6.3 - 2015-07-20
* https://github.com/anovi/selectonic
* Copyright (c) 2015 Alexey Novichkov; Licensed MIT */
(function($, window, undefined) {
  'use strict'; // remove this line, this script will be support running on IE6

  // Method for getting full elements height, jQuery's outerHeight is like Zepto's height
  var outerHeight = $.fn.outerHeight ? 'outerHeight' : 'height';
  if ( !$.fn.jquery && !$.fn.zepto ) { $.fn.zepto = true; }

  // From Underscore library - http://underscorejs.org/#throttle
  var _throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options = options || {};
    var later = function() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date();
      if (!previous && options.leading === false) { previous = now; }
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },

  __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) { if (this[i] === item) {return i;}  }
    return -1;
  },

  itContains = function( array, elem ) {
    if (array instanceof Array) { return __indexOf.call(array, elem) >= 0; }
    return false;
  },

  $document = $( window.document );

  /**
  * @class Options
  * @constructor
  * @for Selectonic
  * @param {Object} schema Options schema.
  * @param {Object} initial Initial options, will be mixed with schema's defaults.
  **/
  function Options ( schema, defaults, initial ) {
    this._schema    = schema;
    this._options   = {};
    this._callbacks = {};
    this.set( $.extend({}, defaults, initial||{}), true );
    return this;
  }

  Options.isCorrectType = function(val, schema) {
    var type = typeof val, isNullable = val === null && schema.nullable;
    return ( schema.type instanceof Array ) ? itContains(schema.type, type) || isNullable : type === schema.type || isNullable;
  };

  Options.prototype.set = function( obj, isNew ) {
    var option, callback;

    // Check options
    for ( option in obj ) {
      var val = obj[ option ],
      schema = this._schema[ option ];

      if ( schema !== undefined ) {
        // unchangeable
        if ( schema.unchangeable && !isNew ) {
          throw new Error( 'Option \"' + option + '\" could be setted once at the begining.' );
        }
        // wrong type
        if ( !Options.isCorrectType(val, schema) ) {
          var msg = 'Option \"' + option + '\" must be ' +
            ( schema.type instanceof Array ? schema.type.join(', ') : schema.type ) +
            ( schema.nullable ? ' or null.' : '.' );
          throw new TypeError( msg );
        }
        // out of values
        if ( schema.values && !itContains(schema.values, val) ) {
          throw new RangeError( 'Option \"' + option + '\" only could be in these values: \"' + schema.values.join('\", \"') + '\".' );
        }
      }
    }
    // Callbacks
    for ( option in obj ) {
      if ( (callback = this._callbacks[option]) ) {
        obj[option] = callback.call( this, obj[option] );
      }
    }
    this._options = $.extend( this._options, obj );
  };

  Options.prototype.get = function( opt ) {
    return opt ? this._options[ opt ] : $.extend( {}, this._options );
  };

  Options.prototype.on = function( option, cb ) {
    this._callbacks[ option ] = cb;
  };

  Options.prototype.off = function( option ) {
    if ( this._callbacks[ option ] ) { delete this._callbacks[option]; }
  };


  var defaults = {
    filter:         '> *',
    multi:          true,
    // Mouse
    mouseMode:      'standard',
    focusBlur:      false,
    selectionBlur:  false,
    handle:         null,
    textSelection:  false,
    focusOnHover:   false,
    // Keyboard
    keyboard:       false,
    keyboardMode:   'select',
    autoScroll:     true,
    loop:           false,
    preventInputs:  true,
    // Classes
    listClass:      'j-selectable',
    focusClass:     'j-focused',
    selectedClass:  'j-selected',
    disabledClass:  'j-disabled',
    // Callbacks
    create:         null,
    before:         null,
    focusLost:      null,
    select:         null,
    unselect:       null,
    unselectAll:    null,
    stop:           null,
    destroy:        null
  },
  schema = {
    filter:         { type:'string'                                         },
    multi:          { type:'boolean'                                        },
    // Mouse
    mouseMode:      { type:'string', values:['standard','mouseup','toggle'] },
    focusBlur:      { type:'boolean'                                        },
    selectionBlur:  { type:'boolean'                                        },
    handle:         { type:'string', nullable:true                          },
    textSelection:  { type:'boolean'                                        },
    focusOnHover:   { type:'boolean'                                        },
    // Keyboard
    keyboard:       { type:'boolean'                                        },
    keyboardMode:   { type:'string', values:['select','toggle'],            },
    autoScroll:     { type:['boolean','string']                             },
    loop:           { type:'boolean'                                        },
    preventInputs:  { type:'boolean'                                        },
    // Classes
    listClass:      { type:'string', unchangeable:true                      },
    focusClass:     { type:'string', unchangeable:true                      },
    selectedClass:  { type:'string', unchangeable:true                      },
    disabledClass:  { type:'string', unchangeable:true                      },
    // Callbacks
    create:         { type:'function', nullable:true                        },
    before:         { type:'function', nullable:true                        },
    focusLost:      { type:'function', nullable:true                        },
    select:         { type:'function', nullable:true                        },
    unselect:       { type:'function', nullable:true                        },
    unselectAll:    { type:'function', nullable:true                        },
    stop:           { type:'function', nullable:true                        },
    destroy:        { type:'function', nullable:true                        }
  };


  /**
  * @class Selectonic
  * @constructor
  * @param {HTMLElement} element
  * @param {Object} options will be mixed with default options
  **/
  function Plugin( element, options ) {
    this._name      = Plugin.pluginName;
    this.el         = element;
    this.$el        = $( element );
    this.ui         = {};   // Object for DOM elements
    this._selected  = 0;    // Amount of selected items
    this._isEnable  = true; // Flag that plugin is enabled - used by handlers
    this._keyModes  = {};   // to saving holding keys
    this.options    = new Options( schema, defaults, options );

    var _this = this;
    this.options.on('filter', function( value ) {
      // Cache items selector to compare it with clicked elements
      _this._itemsSelector = '.' + _this.options.get('listClass') + ' ' + value;
      return value;
    });
    this.options.on('autoScroll', function( value ) {
      _this._setScrolledElem( value ); // Set scrollable containter
      return value;
    });
    this._itemsSelector = '.' + this.options.get('listClass') + ' ' + this.options.get('filter');
    this._setScrolledElem( this.options.get('autoScroll') );
    this._init();
  }

  Plugin.pluginName = 'selectonic';
  Plugin.keyCode    = { DOWN:40, UP:38, SHIFT:16, END:35, HOME:36, PAGE_DOWN:34, PAGE_UP:33, A:65, SPACE:32, ENTER:13 };


  /**
  * Gets plugin's data object
  * @param {HTMLElement} el
  * @method getDataObject
  * @static
  * @private
  * @return {Object} Selectonic instance.
  **/
  Plugin.getDataObject = function( el ) {
    return $( el ).data( 'plugin_' + Plugin.pluginName );
  };



  /* ==============================================================================

  Core

  */
  /**
  * Initialisation method.
  * @method _init
  * @private
  **/
  Plugin.prototype._init = function() {
    this.$el.addClass( this.options.get('listClass') );   // Add class to box
    this._bindEvents();                                   // Attach handlers6
    this.$el.data( 'plugin_' + Plugin.pluginName, this ); // Save plugin's instance
    this._trigger('create');                              // Callback
  };


  /**
  * Set scrollable container.
  * @method _setScrolledElem
  * @private
  * @param {String|HTMLElement} selector Element or selector as scrollable elem.
  **/
  Plugin.prototype._setScrolledElem = function( selector ) {
    var elem;

    if ( null === selector || false === selector ) {
      delete this._scrolledElem;
      return;
    }
    if ( typeof selector === "string" ) {
      elem = $( selector );
      if (elem.length > 0) {
        this._scrolledElem = elem[0];
      } else {
        throw new Error('There are no elements that matches to selector - \"' + selector + '\"');
      }
      return;
    }
    this._scrolledElem = this.el;
  };


  /**
  * Cancel list changes in the current cycle or prevent them
  * if called in `before` callback.
  * @method _cancel
  * @private
  * @param {Object} event Event object.
  * @param {Object} params Current params.
  **/
  Plugin.prototype._cancel = function( e, params ) {
    if ( params.wasCancelled ) { return; }
    params.isCancellation = this._isPrevented = true;
    var _this = this;

    // Restores items states for each changed item
    $.each(
      $(params.changedItems),
      function( index, item ) {
        // there is boolean value in array prevItemsStates
        // with same index that item has in _changedItems
        if ( params.prevItemsStates[ index ] ) {
          _this._select( e, params, $(item), true );
        } else {
          _this._unselect( e, params, $(item), true );
        }
      }
    );
    // Restore old focus
    if ( params.prevFocus ) { this._setFocus( params.prevFocus ); }
    delete params.isCancellation;
    params.wasCancelled = true;
  };


  /**
  * Attath handlers for plugin instace.
  * @method _bindEvents
  * @private
  **/
  Plugin.prototype._bindEvents = function() {
    var _this = this, name = this._name;

    this._mouseEvent = function(e) {
      if ( _this._isEnable && e.which === 1) { _this._mouseHandler.call(_this, e); }
    };
    this._keyboardEvent = function(e) {
      if( _this.options.get('keyboard') && _this._isEnable ) { _this._keyHandler.call(_this, e); }
    };
    this._selectstartEvent = function() {
      if ( !_this.options.get('textSelection') ) { return false; }
    };
    this._mousemoveEvent = _throttle( function(e) {
      if( _this._isEnable && _this.options && _this.options.get('focusOnHover') ) { _this._mousemoveHandler.call(_this, e); }
    }, 20);

    $document.on( 'keydown.'+name       ,this._keyboardEvent    );
    $document.on( 'keyup.'+name         ,this._keyboardEvent    );
    $document.on( 'mousemove.'+name     ,this._mousemoveEvent   );
    $document.on( 'click.'+name         ,this._mouseEvent       );
    $document.on( 'mousedown.'+name     ,this._mouseEvent       );
    $document.on( 'mouseup.'+name       ,this._mouseEvent       );
    this.$el.on(  'selectstart.'+name   ,this._selectstartEvent );
  };


  /**
  * Detach instance handlers.
  * @method _unbindEvents
  * @private
  **/
  Plugin.prototype._unbindEvents = function() {
    var name = this._name;
    $document.off( 'keydown.'+name       ,this._keyboardEvent    );
    $document.off( 'keyup.'+name         ,this._keyboardEvent    );
    $document.off( 'mousemove.'+name     ,this._mousemoveEvent   );
    $document.off( 'click.'+name         ,this._mouseEvent       );
    $document.off( 'mousedown.'+name     ,this._mouseEvent       );
    $document.off( 'mouseup.'+name       ,this._mouseEvent       );
    this.$el.off(  'selectstart.'+name   ,this._selectstartEvent );
  };


  /**
  * Gets item, that was clicked
  * or null, if click was not on an item
  * @method _getTarget
  * @private
  * @param {Object} event Event object.
  * @return {HTMLElement|null} Targeted element if it has found of null.
  **/
  Plugin.prototype._getTarget = function( e ) {
    var elem = e.target,
      handle = this.options.get('handle'),
      $elem, target, handleElem;

    // While plugin's element or top of the DOM is achieved
    while ( elem !== null && elem !== this.el ) {
      $elem = $(elem);
      // Set context, because old (< 1.10.0) versions of jQuery gives wrong result.
      $elem.context = window.document;
      if( $elem.is(this._itemsSelector) ) { target = elem; }
      if( handle && $elem.is(handle) ) { handleElem = elem; }
      elem = elem.parentNode;
    }
    if( handle && elem && handleElem ) {
      return target;

    // If achieved $el of this instance of plugin's object
    } else if( !handle && elem ) {
      return target;
    }
    // has not clicked any selectable items of a list
    return null;
  };


  /**
  * Getter for list's items.
  * @method _getItems
  * @private
  * @param {Object} params Current params.
  * @param {String} [target] Find 'next' 'prev' 'pageup' 'pagedown' item
  *   relative to `elem` argument or 'first' or 'last' item of the list.
  * @param {HTMLElement} [elem] Element.
  * @return {jQuery object|null} Found element wrapped in jQuery or null.
  **/
  Plugin.prototype._getItems = function( params, target, elem ) {
    var items;

    switch( target ) {
    case 'next':
    case 'prev':
      var
      item = elem.jquery ? elem : $( elem ),
      find = $.fn[target];

      while (true) {
        item = find.call( item );
        if ( item.length === 0 ) { break; }
        // Set context, because old (< 1.10.0) versions of jQuery gives wrong result.
        item.context = window.document;
        if ( item.is(this._itemsSelector) ) { return item; }
      }
      return null;

    case 'pageup':
    case 'pagedown':
      return this._getNextPageElem( params, target, elem);

    case 'first':
      items = params.allItems ? params.allItems : this.$el.find( this.options.get('filter') );
      params.allItems = items;
      return items.first();

    case 'last':
      items = params.allItems ? params.allItems : this.$el.find( this.options.get('filter') );
      params.allItems = items;
      return items.last();

    default:
      items = params.allItems ? params.allItems : this.$el.find( this.options.get('filter') );
      params.allItems = items;
      if (target !== void 0 && $.isNumeric(target)) {
        return items.eq(target);
      }
      return items;
    }
  };


  /**
  * Used by _getItems
  * There are two versions of algorithm for searching target depending from page height.
  * Page's height is window's or _scrolledElem's height ( which is smaller ).
  * Both algorithms runs loop until total item's height reaches maximum possible value,
  * but lower than page height. But first version gets from DOM one next element every cycle,
  * and second version gets all items at the beginning and then iterates through them.
  * And it set allItems and rangeStart and rangeEnd for params. So second version used only
  * for Shift+pageUp/Down cases for performance and can be enabled by flag params.isShiftPageRange.
  *
  * @method _getNextPageElem
  * @private
  * @param {Object} params Current params.
  * @param {String} target Find 'pageup' 'pagedown' item relative to `elem` argument.
  * @param {HTMLElement} elem Element.
  * @return {jQuery object|null} Found element wrapped in jQuery or null.
  **/
  Plugin.prototype._getNextPageElem = function( params, target, elem ) {
    var
      _isOptimized  = params.isShiftPageRange,
      box           = this._scrolledElem || this.el,
      boxViewHeight = box.clientHeight,
      winViewHeight = $( window )[outerHeight](),
      $current      = $( elem ),
      isBoxBigger   = boxViewHeight > winViewHeight,
      pageHeight    = isBoxBigger ? winViewHeight : boxViewHeight,
      itemHeight    = $current[outerHeight](),
      currentHeight = itemHeight,
      itemsHeight   = itemHeight,
      direction     = (target === 'pageup') ? 'prev' : 'next',
      $candidate, candHeight, currentIndex, allItems, cand;

      if ( _isOptimized ) {
        direction = (target === 'pageup') ? -1 : 1;
        allItems = this._getItems( params );
        params.rangeStart = currentIndex = allItems.index( elem );
      }

    while( true ) {
      if ( _isOptimized ) {
        currentIndex = currentIndex + direction;
        cand = currentIndex >= 0 ? allItems.eq( currentIndex ) : null;
        $candidate = cand && cand.length > 0 ? cand : null;
      } else {
        $candidate = this._getItems( params, direction, $current );
      }

      if ( !$candidate && $current[0] === elem ) {
        break;
      } else if ( !$candidate  ) {
        if ( _isOptimized ) { params.rangeEnd = currentIndex - direction; }
        return $current;
      }

      candHeight = $candidate[outerHeight]();
      itemsHeight = itemsHeight + candHeight;

      if ( itemsHeight > pageHeight ) {
        // If two items bigger than page than it just will give next item
        if ( currentHeight + candHeight > pageHeight ) {
          if ( _isOptimized ) { params.rangeEnd = currentIndex; }
          return $candidate;
        }
        if ( _isOptimized ) { params.rangeEnd = currentIndex - direction; }
        return $current;
      }
      currentHeight = candHeight;
      $current = $candidate;
    }
    return null;
  };


  /**
  * Calls callbacks functions from options if it exists:
  * - Creates ui object with target, focus and changed items
  * - Passess to callback event or null and ui object
  * @method _trigger
  * @private
  * @param {String} name Name of callback.
  * @param {Object|null} event Event object
  * @param {Object} params Current params.
  **/
  Plugin.prototype._trigger = function( name, event, params ) {
    var ui, cb = this.options.get(name);
    if ( !cb ) { return; }
    if ( name === 'create' || name === 'destroy' ) {
      return cb.call( this.$el );
    }
    ui = {};
    if ( params.target ) { ui.target = params.target; }
    if ( this.ui.focus ) { ui.focus  = this.ui.focus; }

    switch ( name ) {
      case 'select':      ui.items = params.selected; break;
      case 'unselectAll':
      case 'unselect':    ui.items = params.unselected; break;
      case 'stop':        if ( !params.wasCancelled ) { ui.items = params.changedItems; } break;
    }
    // Pass to callback: elem, event object and new ui object
    cb.call( this.$el, event || null, ui );
  };


  /**
  * Control the state of a list.
  * It can be called from _keyHandler, _mouseHandler or API
  * and does list's changes depending from reseived params.
  * @method _controller
  * @private
  * @param {Object|null} event Event object
  * @param {Object} params Current params.
  **/
  Plugin.prototype._controller = function( e, params ) {
    var method;
    params.changedItems = [];
    params.prevItemsStates = [];
    delete this._isPrevented;
    this._trigger('before', e, params);

    if( this._isPrevented ) {
      this._cancel( e, params );
      this._stop( e, params );
      return;
    }
    params.wasSelected = ( this._selected > 0 );
    if ( params.target && params.isTargetWasSelected === undefined ) {
      params.isTargetWasSelected = this._getIsSelected( params.target );
    }

    if (
      params.isRangeSelect &&
      params.isTargetWasSelected &&
      params.target === this.ui.focus
    ) {
      // do nothing

    // Range
    } else if ( params.isRangeSelect ) {
      this._perfomRangeSelect( e, params);

    // Multi
    } else if ( params.isMultiSelect ) {
      method = params.isTargetWasSelected ? this._unselect : this._select;
      method.call( this, e, params, params.items );

    // Moving focus be mouse
    } else if ( params.target && !params.items && e.type === 'mouseover' ) {
      // do nothing - focus will be set

    // Single selection
    } else if ( params.target && params.items ) {

      // If there is one selected item and it is focused
      if ( this._selected && this._selected === 1 && this._getIsSelected(this.ui.focus) ) {
        /* It is case, when user moves cursor by keys or chooses single items by mouse
        - need just clear selection from focus - no need run go whole DOM of list */
        this._unselect( e, params, this.ui.focus, params.isTargetWasSelected );

      } else if (this._selected) {
        this._unselectAll( e, params );
      }
      // Select item. Callback 'select' calls only if target was selected
      this._select( e, params, params.items, params.isTargetWasSelected );

    } else if ( !params.target && this._selected > 0 && this.options.get('selectionBlur') ) {
      this._unselectAll( e, params );
    }

    if( !this._selected && params.wasSelected ) {
      this._trigger('unselectAll', e, params);
    }

    params.prevFocus = ( this.ui.focus ) ? this.ui.focus : null;

    if ( !params.target && this.options.get('focusBlur') ) {
      this._blur(e, params);
    } else if ( params.target && !params.wasCancelled ) {
      this._setFocus( params.target );
    }

    // End of the cycle
    this._stop( e, params );
  };


  /**
  * Used by _controller to perform range selection in the list.
  * @method _perfomRangeSelect
  * @private
  * @param {Object|null} event Event object
  * @param {Object} params Current params.
  **/
  Plugin.prototype._perfomRangeSelect = function( e, params ) {
    var method, items, initial, beforeStart, afterStart, beforeEnd, afterEnd,

    endAfterStart = params.rangeStart < params.rangeEnd,
    allItems      = this._getItems( params ),
    top           = ( endAfterStart ) ? params.rangeStart : params.rangeEnd,
    bot           = ( endAfterStart ) ? params.rangeEnd : params.rangeStart;

    // New solid selectioin
    if ( params.isNewSolidSelection ) {
      // Get items from top to first range item (not include)
      items = allItems.slice( 0, top );
      // Add items from last range item (not include) to the end of list
      items = items.add( allItems.slice( bot + 1 ) );
      this._unselect( e, params, items );
      this._select( e, params, params.items );

    // Existing Solid selection and target is not selected
    // and initial selection's elem is in current range
    } else if (
      this.ui.solidInitialElem &&
      !params.isTargetWasSelected &&
      (initial = params.items.index( this.ui.solidInitialElem )) >= 0
    ) {
      // Need to unselect items from start to initial elem and select from initial elem to the end
      initial     = ( endAfterStart ) ? params.rangeStart + initial : params.rangeEnd + initial;
      beforeStart = initial < params.rangeStart;
      afterStart  = params.rangeStart < initial;
      beforeEnd   = initial < params.rangeEnd;
      afterEnd    = params.rangeEnd < initial;

      if (( !beforeEnd && beforeStart ) || ( !afterEnd && afterStart)) {
        // Items from range start to initial solid selection elem (but not include)
        items = afterStart ? allItems.slice( top, initial ) : allItems.slice( initial+1, bot+1 );
        if (items.length > 0) {
          this._unselect( e, params, items );
        }
      }
      if (( afterEnd && !afterStart ) || ( beforeEnd && !beforeStart )) {
        // Items from range end to initial selection elem (but not include)
        items = afterEnd ? allItems.slice( top, initial ) : allItems.slice( initial+1, bot+1 );
        if (items.length > 0) {
          this._select( e, params, items );
        }
      }

    // Common range select
    } else {
      method = params.isTargetWasSelected ? this._unselect : this._select;
      method.call( this, e, params, params.items );
    }
  };


  /**
  * Changes items states from unselected to selected and back.
  * Used by _select and _unselect methods.
  * @method _changeItemsStates
  * @private
  * @param {jQuery collection} items jQuery collection of items that will be change.
  * @param {Nubmer} delta Ss number to modifying selection counter
  *   above zero `delta` from _select/ sub zero `delta` from _unselect
  * @param {Object} params Current params.
  **/
  Plugin.prototype._changeItemsStates = function( items, delta, params ) {
    var
      aboveZero = delta > 0,
      changedItems = [],
      _this = this;

    $( items ).each( function( index, item ) {
      var
        isSelected = _this._getIsSelected( item ),
        // Condition - if item is not selected (_select) or items is selected (_unselect)
        selectedCondition = ( aboveZero ) ? !isSelected : isSelected,
        isSelectedTarget = ( item === params.target && params.isTargetWasSelected );

      /*  If it's unselecting and item is selected target,
        and is not 'multi' or 'range' select mode
        - do nothing because state of selected target should not change
        - it is just unselecting other items  */
      if (isSelectedTarget && !aboveZero && !params.isMultiSelect && !params.isRangeSelect ) { return; }

      if( selectedCondition ) {
        if( !params.isCancellation ) {
          changedItems.push( item );
          params.prevItemsStates.push( isSelected );
        }
        _this._selected += delta;
      }
      $( item ).toggleClass( _this.options.get('selectedClass'), aboveZero );

    });

    if( !params.isCancellation ) {
      params[ (aboveZero?'selected':'unselected') ] = $( changedItems );
      params.changedItems = params.changedItems.concat( changedItems );
    }
  };


  /**
  * Select items.
  * @method _select
  * @private
  * @param {Object} event Event object.
  * @param {Object} params Current params.
  * @param {jQuery collection} items jQuery collection of items that will be selected.
  * @param {Boolean} [silent] If true then `select` callback won't be called.
  **/
  Plugin.prototype._select = function( e, params, items, silent ) {
    this._changeItemsStates( items, 1, params);
    if ( !silent ) { this._trigger('select', e, params); }
    if( this._isPrevented && !params.isCancellation ) { this._cancel( e, params ); }
  };


  /**
  * Unselect items.
  * @method _unselect
  * @private
  * @param {Object} event Event object.
  * @param {Object} params Current params.
  * @param {jQuery collection} items jQuery collection of items that will be unselected.
  * @param {Boolean} [silent] If true then `unselect` callback won't be called.
  **/
  Plugin.prototype._unselect = function( e, params, items, silent ) {
    this._changeItemsStates( items, -1, params );
    if ( !silent ) { this._trigger('unselect', e, params); }
    if( this._isPrevented && !params.isCancellation ) { this._cancel( e, params ); }
  };


  /**
  * Unselect all items.
  * @method _unselectAll
  * @private
  * @param {Object} event Event object.
  * @param {Object} params Current params.
  **/
  Plugin.prototype._unselectAll = function( e, params ) {
    var isOnlyTargetSelected, items;
    if( !this._selected || this._selected === 0 ) { return; }

    items = this._getItems( params );
    // target was only selected item ( flag used for preventing callback )
    isOnlyTargetSelected = params.target && params.isTargetWasSelected && this._selected === 1;
    this._unselect( e, params, items, isOnlyTargetSelected );
  };


  /**
  * Turn on multiselect mode.
  * @method _multiSelect
  * @private
  * @param {Object} params Current params.
  **/
  Plugin.prototype._multiSelect = function( params ) {
    params.isMultiSelect = true;
    return $( params.target );
  };


  /**
  * Turn on range select mode.
  * @method _rangeSelect
  * @private
  * @param {Object} params Current params.
  * @return {jQuery object} Range of items between focused and targeted elements (included).
  **/
  Plugin.prototype._rangeSelect = function( params ) {
    params.isRangeSelect = true;
    if( params.target === this.ui.focus ) { return $( params.target ); }

    // Detect position of target and focus in the list
    var arr = params.allItems ? params.allItems : this._getItems( params ),
      x = arr.index( params.target ),
      y = arr.index( this.ui.focus ),

    // Get array of items between focus and target
    subArr =     ( x < y ) ? arr.slice( x, y ) : arr.slice( y, x );
    subArr.push( ( x < y ) ? arr[ y ]          : arr[ x ] );

    params.allItems = arr;
    params.rangeStart = y;
    params.rangeEnd = x;
    return subArr;
  };


  /**
  * Check if element is selected.
  * @method _getIsSelected
  * @private
  * @param {HTMLElement} target
  * @return {Boolean} true if element is selected.
  **/
  Plugin.prototype._getIsSelected = function( target ) {
    var options = this.options.get();

    if( $(target).length <= 1 ) {
      return $( target ).hasClass( options.selectedClass );
    }
    return $.map( $(target), function( item ) {
      return $( item ).hasClass( options.selectedClass );
    });
  };


  /**
  * Clears focus of the list.
  * @method _blur
  * @private
  * @param {Object} event Event object.
  * @param {Object} params Current params.
  * @param {Boolean} [silent] If true `focusLost` callback won't be called.
  **/
  Plugin.prototype._blur = function( e, params, silent ) {
    if( !silent && this.ui.focus ) {
      this._trigger('focusLost', e, params);
    }
    if( this.ui.focus ) {
      $( this.ui.focus ).removeClass( this.options.get('focusClass') );
      delete this.ui.focus;
    }
  };


  /**
  * Set focus of the list.
  * @method _setFocus
  * @private
  * @param {HTMLElement} target
  **/
  Plugin.prototype._setFocus = function( target ) {
    if( !target ) { return; }
    if( this.ui.focus ) {
      $(this.ui.focus).removeClass( this.options.get('focusClass') );
    }
    this.ui.focus = target;
    $( this.ui.focus ).addClass( this.options.get('focusClass') );
    return this.ui.focus;
  };


  /**
  * Finalization function of every cycle.
  * @method _stop
  * @private
  * @param {Object} event Event object.
  * @param {Object} params Current params.
  **/
  Plugin.prototype._stop = function( e, params ) {
    this._trigger('stop', e, params);
    if( this._isPrevented ) { this._cancel( e, params ); }
  };


  /**
  * Checks if object is HTMLElement or element wrapped in jQuery
  * @method _checkIfElem
  * @private
  * @param {any} selector
  * @return {Boolean} True if `selector` is element of jQuery element.
  **/
  Plugin.prototype._checkIfElem = function( selector ) {
    var res;
    if ( selector && (selector.jquery || selector.zepto || selector.nodeType) ) {
      selector = (selector.jquery||selector.zepto) ? selector : $( selector );
      res = selector.filter( this._itemsSelector );
      return res.length > 0 ? res : null;
    } else { return false; }
  };


  /**
  * Checks if argument is a string and selector.
  * @method _checkIfSelector
  * @private
  * @param {any} selector
  * @return {jQuery object|false|null} If `selector` is a selector
  *   and match some elements then method return these elements.
  **/
  Plugin.prototype._checkIfSelector = function( selector ) {
    var res;
    if ( selector && typeof selector === 'string') {
      res = this.$el
        .find( selector )
        .filter( this._itemsSelector );
      return ( res.jquery && res.length > 0 ) ? res : null;

    } else { return false; }
  };



  /* ==============================================================================

  Keyboard

  */
  /**
  * Handles keyboard events and calls _controller.
  * @method _keyHandler
  * @private
  * @param {Object} event
  **/
  Plugin.prototype._keyHandler = function( e ) {

    if ( !this.options.get('keyboard') ) { return; }
    if ( this.options.get('preventInputs') && e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') { return; }
    var key = e.which, params = {}, target, isAllSelect, direction, page;

    if (e.type === 'keyup') {
      if ( key === Plugin.keyCode.SHIFT ) {
        delete this._shiftModeAction; // while SHIFT is held
        delete this._keyModes.shift; // arrow key (UP,DOWN) which pressed first in SHIFT mode
      }
      return;
    }
    if ( key === Plugin.keyCode.A && this._isMulti(e) && this.options.get('multi') ) {
      target = this._getItems( params );
      isAllSelect = true; // flag that is all items is selected

    } else {
      // Choose direction and try to find targeted item
      switch ( key ) {
      case Plugin.keyCode.DOWN:
        direction = 'next';
        target    = this._findNextTarget( 'next', params );
        break;
      case Plugin.keyCode.UP:
        direction = 'prev';
        target    = this._findNextTarget( 'prev', params );
        break;
      case Plugin.keyCode.HOME:
        direction = 'prev';
        target    = this._getItems( params, 'first');
        break;
      case Plugin.keyCode.END:
        direction = 'next';
        target    = this._getItems( params, 'last');
        break;
      case Plugin.keyCode.PAGE_DOWN:
      case Plugin.keyCode.PAGE_UP:
        var isDown = key === Plugin.keyCode.PAGE_DOWN;
        direction  = isDown ? 'next' : 'prev';
        page       = isDown ? 'pagedown' : 'pageup';
        params.isShiftPageRange = this.options.get('multi') && e.shiftKey && !isAllSelect;
        target = this._findNextTarget( page, params );
        break;
      case Plugin.keyCode.SPACE:
        target = $( this.ui.focus );
        break;
      case Plugin.keyCode.ENTER:
        if ( !this.options.get('multi') ) { target = $( this.ui.focus ); }
        break;
      }
    }

    // Disable default window scroll by arrows, PageUp, PageDown, Home, End
    if (direction) { e.preventDefault(); }

    // One of the arrows was pressed
    if ( target && target.length > 0 ) {
      params.target = target[0];
      params.items = target;

      // Toggle mode
      if ( this.options.get('keyboardMode') === 'toggle' ) {
        if (
          key !== Plugin.keyCode.SPACE &&
          !(key === Plugin.keyCode.ENTER && !this.options.get('multi'))
        ) {
          delete params.items;
        }
        if ( this.options.get('multi') ) { params.isMultiSelect = true; }
        delete this.ui.solidInitialElem;

      // SHIFT mode
      } else if ( this.ui.focus && this.options.get('multi') && e.shiftKey && !isAllSelect ) {
        // Call multiVariator or rangeVariator -
        // it set all needed params depends from arguments
        if (
          key === Plugin.keyCode.END     || key === Plugin.keyCode.HOME ||
          key === Plugin.keyCode.PAGE_UP || key === Plugin.keyCode.PAGE_DOWN
        ) {
          this._rangeVariator( params );
        } else {
          this._multiVariator( params, key, direction, target );
        }

        // Set solid selection
        if ( !this.ui.solidInitialElem && params.target !== this.ui.focus ) {
          this.ui.solidInitialElem = this.ui.focus;
          params.isNewSolidSelection = true;
        }

        // Set selection mode
        if ( !this._shiftModeAction ) { this._shiftModeAction = 'select'; }
        if ( !this._keyModes.shift  ) { this._keyModes.shift  = key;      }

      } else {
        delete this.ui.solidInitialElem;
      }
      this._controller( e, params );
      this.scroll();
    } else {
      params.prevItemsStates = [];
      this._trigger('before', e, params);
      this._trigger('stop', e, params);
    }
  };


  /**
  * Sets range or multi modes for selection depending from `params`.
  * @method _rangeVariator
  * @private
  * @param {Object} params Current params.
  **/
  Plugin.prototype._rangeVariator = function( params ) {
    var
      isFocusSelected = void 0 === params.isFocusSelected ? this._getIsSelected( this.ui.focus ) : params.isFocusSelected,
      isTargetSelected = params.isTargetWasSelected = this._getIsSelected( params.target );

    if ( !isFocusSelected && !isTargetSelected ) {
      // Only target will be selected
      params.target = params.items = this.ui.focus;
      params.isMultiSelect = true;
    } else {
      params.items = this._rangeSelect( params );
      // Cut target from end or begin because we do not want to unselect it
      if ( isTargetSelected ) {
        params.items = params.rangeStart < params.rangeEnd ? (
        params.items.slice(0, params.items.length-1)
        ) : (params.items.slice(1) );
      }
    }
  };


  /**
  * FOR SHIFT MODE ONLY
  * - turns on shift mode flags
  * - solves different situations with shift+arrows selection
  * @method _multiVariator
  * @private
  * @param {Object} params Current params.
  * @param {Number} key Keycode of pressed key.
  * @param {String} direction Indicates 'prev' or 'next' item to find.
  * @param {HTMLElement} target Targeted element.
  **/
  Plugin.prototype._multiVariator = function( params, key, direction, target ) {
    var
      isFocusSelected       = void 0 === params.isFocusSelected ? this._getIsSelected( this.ui.focus ) : params.isFocusSelected,
      isTargetSelected      = this._getIsSelected( params.target ),
      afterTarget           = this._getItems( params, direction, target ), // Search for next target in the same direction
      isSelectedAfterTarget = this._getIsSelected( afterTarget ), // Check if second target is selected
      prevItem;

    // If another arrow was pressed that means the direction was changed
    if ( this._keyModes.shift && this._keyModes.shift !== key ) {
      this._keyModes.shift = this._shiftModeAction = null;
    }

    if ( this._keyModes.shift && this._shiftModeAction === 'select' && isTargetSelected ) {
      /* When user select range of items by holding SHIFT and presses arrow key, there are already can be
      selected items - focus should jump through these selected items to first unselected item */

      // While first unselected item will be found or edge of the list will be reached
      while( this._getIsSelected(params.items) && params.items.length > 0 ) {
        prevItem = params.items;
        params.items = this._getItems( params, direction, params.items );
      }
      // If unselected item was found it becomes target item
      // target will be selected and get the focus
      params.target = params.items ? params.items : prevItem;

    } else if ( isTargetSelected && isFocusSelected && !isSelectedAfterTarget ) {
      /* Sitiation is possible when user unselect items by arrow key with holding SHIFT */

      // Clear flags of serial selection by SHIFT
      this._keyModes.shift = this._shiftModeAction = null;
      params.items = this.ui.focus;
      // Selection will be clear on the focus, focus will be set on target item

    } else if ( isFocusSelected && isTargetSelected ) {
      params.items = this.ui.focus;
      // If there is no SHIFT action (first pressing arrow key with holding SHIFT)
      // Set mode of selection
      if ( !this._shiftModeAction ) { this._shiftModeAction = 'unselect'; }
      // Selection will be clear on the focus, focus will be set on target item

    } else if ( !isFocusSelected ) {
      // Focus will be selected
      params.target = params.items = this.ui.focus;
    }
    params.isMultiSelect = true;
  };


  /**
  * Used by _keyHandler
  * when UP, DOWN, PageUp, PageDown keys has pressed - find target or first/last element of the list
  * @method _findNextTarget
  * @private
  * @param {String} direction Indicates 'prev' 'next' or 'pageup' 'pagedown' item to find
  *   relative to the focused element.
  * @param {Object} params Current params.
  * @return {jQuery object|null} Targeted element.
  **/
  Plugin.prototype._findNextTarget = function( direction, params ) {
    var edge = ( direction === 'next' || direction === "pagedown" ) ? 'first' : 'last', // extreme item of the list
      // If there is the focus - try to find next sibling
      // else get first|last item of the list - depends from direction
      res = ( this.ui.focus ) ? this._getItems( params, direction, this.ui.focus ) : this._getItems( params, edge );

    // If has not found any items and loop option is ON
    if ( (res === null || res.length === 0) && this.options.get('loop') ) {
      res = this._getItems( params, edge ); // find extreme item
    }
    return res;
  };


  /**
  * Used by _keyHandler or public scroll method.
  * Recalculates scroll position, if focused item is not visible in container's viewport.
  * @method _refreshBoxScroll
  * @private
  * @param {HTMLElement} box Container whose scroll will be calculated for showing focused element.
  **/
  Plugin.prototype._refreshBoxScroll = function( box ) {
    var
      $box          = $( box ),
      isWindow      = box === window,
      boxViewHeight = isWindow ? $box[outerHeight]() : box.clientHeight,
      boxScrollTop  = $box.scrollTop(),
      boxWindowY    = isWindow ? 0 : $box.offset().top,
      $item         = $( this.ui.focus ),
      itemHeight    = $item[outerHeight](),
      itemBoxTop    = isWindow ? $item.offset().top : ( $item.offset().top - boxWindowY + boxScrollTop );

    if ( itemBoxTop < boxScrollTop ) {
      $box.scrollTop( itemBoxTop );

    } else if ( (itemBoxTop + itemHeight) > (boxScrollTop + boxViewHeight) ) {
      // Scroll to bottom edge of elem -
      // bottom edges of item and viewport will be on the same Y
      $box.scrollTop( itemBoxTop + itemHeight - boxViewHeight );
    }
  };


  /**
  * @method _isRange
  * @private
  * @param {Object} event Event object.
  * @return {Boolean} True if it's range select with shift.
  **/
  Plugin.prototype._isRange = function( e ) {
    return e.shiftKey || (e.shiftKey && e.ctrlKey) || (e.shiftKey && e.metaKey);
  };


  /**
  * @method _isMulti
  * @private
  * @param {Object} event Event object.
  * @return {Boolean} True if it's multi-select with ctrl.
  **/
  Plugin.prototype._isMulti = function( e ) {
    return e.ctrlKey || e.metaKey;
  };



  /* ==============================================================================

  Mouse

  */
  /**
  * Mouse events handler - set necessary paramaters and calls _controller
  * @method _mouseHandler
  * @private
  * @param {Object} event Event object.
  **/
  Plugin.prototype._mouseHandler = function( e ) {
    var
    options = this.options.get(),
    type    = e.type,
    isMulti = this._isMulti(e),
    isRange = this._isRange(e),
    params  = {};

    /* Find target: */
    if (options.mouseMode === 'mouseup') {
      params.target = this._getTarget(e);
      if ( type === 'click' || (params.target && type === 'mousedown')) { return; }

    // because this click may be after mousedown in multi/range mode
    } else if (type === 'click' && !this._mousedownOnItem) {
      return;

    } else if (type === 'mousedown' || type === 'click') {
      params.target = this._getTarget(e);
      // Mousedown on item, except cases mathes all conditions:
      // - in multi/range modes
      // - with multi:true
      // - with mouseMode:'standard'
      if (type === 'mousedown' && params.target && !( options.multi && (isMulti||isRange) && options.mouseMode === 'standard' )) {
        this._mousedownOnItem = params.target;
        return;
      }
      delete this._mousedownOnItem;
      // to prevent blurring when mousedown on element and mouseup on another element
      if (!params.target && type === 'click') {return;}
    } else { return; }

    if( options.multi && params.target ) {

      // Range select
      if ( isRange && this.ui.focus ) {
        params.items = this._rangeSelect( params );

      // Add/subtract to selection
      } else if ( isMulti || options.mouseMode === 'toggle' ) {
        params.items = this._multiSelect( params );
      }
    }

    if ( params.target && !params.items ) { params.items = $( params.target ); }
    delete this.ui.solidInitialElem;
    this._controller( e, params );
  };


  /**
  * Tries to find target under cursor when mouse moves
  * @method _mousemoveHandler
  * @private
  * @param {Object} event Event object.
  **/
  Plugin.prototype._mousemoveHandler = function( e ) {
    if ( this._isFocusOnHoverPrevented ) { return; }
    var params = {}, target = this._getTarget(e);

    if ( target ) {
      delete this.ui.solidInitialElem;
      this._isHovered = true;
      if ( target !== this.ui.focus ) {
        params.target = target;
        this._controller( e, params );
      }
    } else if ( this._isHovered ) {
      this._isHovered = false;
      this._controller( e, params );
    }
  };


  /**
  * Prevent changing focus under cursor when user moves focus by keyboard
  * and list's element changes scroll position
  * @method _preventMouseMove
  * @private
  **/
  Plugin.prototype._preventMouseMove = function() {
    var _this = this;
    this._isFocusOnHoverPrevented = true;

    if ( this._focusHoverTimeout ) {
      clearTimeout( this._focusHoverTimeout );
      delete this._focusHoverTimeout;
    }
    this._focusHoverTimeout = setTimeout( function() {
      delete _this._isFocusOnHoverPrevented;
      delete _this._focusHoverTimeout;
    }, 250);
  };



  /* ==============================================================================

  Public API

  */
  /**
  * Searches public method and calls it if exists.
  * @method _callPublicMethod
  * @private
  * @param {String} method
  **/
  Plugin._callPublicMethod = function( method ) {
    var
      _this = Plugin.getDataObject( this ),
      publicMethod, args;

    if( null === _this || void 0 === _this ) {
      throw new Error( 'Element ' + this[0] + ' has no plugin ' + Plugin.pluginName );
    }
    // Try to find method
    if ( _this[method] && $.isFunction(_this[method]) ) {
      publicMethod = _this[method];
    }
    // If method exists and it is not private - call him
    if ( publicMethod && $.isFunction( publicMethod ) && method.charAt(0) !== '_' ) {
      args = Array.prototype.slice.call( arguments );
      args.shift();
      return publicMethod.apply( _this, args );
    }
    throw new Error( 'Plugin \"' + Plugin.pluginName + '\" has no method \"' + method + '\"' );
  };


  /**
  * @method isEnabled
  * @return {Boolean} True if selectable list is enabled.
  **/
  Plugin.prototype.isEnabled = function() {
    return this._isEnable;
  };


  /**
  * Sets plugin's instance options
  * @method option
  * @param {Object|String} option Hash of options or option name.
  * @param {any} [value] Value of an option if first argument is a string.
  * @return Option value if option name was passed as one argument.
  **/
  Plugin.prototype.option = function( option, value ) {
    var args = arguments.length;

    // Received string
    if( args > 0 && typeof option === 'string' ) {
      // Received strings and any argument
      if( args > 1 ) {
        var opt = {};
        opt[option] = value;
        this.options.set( opt );
        return this.$el;
      }
      // Return value of option
      return this.options.get( option );
    }
    // Received object
    if( args > 0 && $.isPlainObject( option ) ) {
      this.options.set( option );
      return this.$el;
    }
    // Return whole options object
    if ( args === 0 ) {
      return this.options.get();
    } else {
      throw new Error('Format of \"option\" could be: \"option\" or \"option\",\"name\" or \"option\",\"name\",val or \"option\",{}');
    }
  };


  /**
  * Destroy plugin's instance. Detaches event handlers and removes HTML-classes.
  * @method destroy
  **/
  Plugin.prototype.destroy = function() {
    this._trigger('destroy');
    this._unbindEvents();
    if ( this._focusHoverTimeout ) { clearTimeout(this._focusHoverTimeout); }
    if( this.ui.focus ) {
      $(this.ui.focus).removeClass( this.options.get('focusClass') );
      delete this.ui.focus;
    }
    if( this._selected > 0 ) {
      this.getSelected().removeClass( this.options.get('selectedClass') );
    }
    this.$el.removeClass( this.options.get('disabledClass') );
    this.$el.removeClass( this.options.get('listClass') );
    this.options.off();
    delete this.options;
    delete this._scrolledElem;
    delete this.ui.solidInitialElem;
    this.$el.removeData( 'plugin_' + Plugin.pluginName );
    this.$el = null;
    return;
  };


  /**
  * Uunselect one or more items in the list. It is multi-selection.
  * @method unselect
  * @param {HTMLElement|String} selector A selector or element or set of elements to select.
  **/
  Plugin.prototype.unselect = function( selector ) {
    return this.select( selector, true );
  };


  /**
  * Select/unselect one or more items in the list. It is multi-selection.
  * @method select
  * @param {HTMLElement|String} selector A selector or element or set of elements to select.
  * @param {Boolean} revert If true then method will work as `unselect`.
  **/
  Plugin.prototype.select = function( selector, revert ) {
    var $elem, params;

    if ( revert === true && selector === void 0 ) {
      // To unselecting all items
      params = {
        isTargetWasSelected: true,
        isMultiSelect: true
      };
      params.items = this._getItems( params );

    } else {
      params = {
        isTargetWasSelected: (revert) ? true : false,
        isMultiSelect: true
      };
      if (selector !== void 0 && $.isNumeric(selector)) {
        params.items = this._getItems( params, selector );
      } else {
        $elem = this._checkIfElem( selector );
        if ( $elem === false) { $elem = this._checkIfSelector( selector ); }
        if ( $elem === false) { throw new Error('You shold pass DOM element or selector to \"select\" method.'); }
        params.items = ( $elem === null) ? null : ( $elem.addClass ) ? $elem : $( $elem );
      }
    }

    delete this.ui.solidInitialElem;
    this._controller( null, params);
    return this.$el;
  };


  /**
  * Clear focus and selection of list's options allow that.
  * @method blur
  **/
  Plugin.prototype.blur = function() {
    this._controller( null, { target: null } );
    return this.$el;
  };


  /**
  * Get selected items in the list.
  * @method getSelected
  * @param {Boolean} [getIds] If true method return array of IDs of selcted elements.
  * @return {Array|jQuery object} Selected items as jQuery collection or array of IDs.
  **/
  Plugin.prototype.getSelected = function( getIds ) {
    var arr,
    items = this._getItems({}).filter( '.' + this.options.get('selectedClass') );

    if( getIds ) {
      arr = [];
      for (var i = 0; i < items.length; i++) { arr.push(items[i].id || null); }
      return (arr && arr.length > 0) ? arr : null;
    }
    return items;
  };


  /**
  * Get array of IDs of  selected items in the list.
  * @method getSelectedId
  * @return {Array} Selected items as array of IDs.
  **/
  Plugin.prototype.getSelectedId = function() {
    return this.getSelected( true );
  };


  /**
  * Focus one element.
  * @method focus
  * @param {HTMLElement|String} selector A selector or element to select.
  **/
  Plugin.prototype.focus = function( selector ) {
    var $elem;

    if ( arguments.length > 0 ) {
      if ( $.isNumeric(selector) ) {
        $elem = this._getItems( {}, selector );
      } else {
        $elem = ($elem = this._checkIfElem( selector )) === false ? this._checkIfSelector( selector ) : $elem;
      }
      if ( $elem && ($elem.jquery || $elem.zepto) ) {
        this._setFocus( $elem[0] );
      } else if ( $elem === false) {
        throw new Error( 'You shold pass DOM element or CSS selector to set focus or nothing to get it.' );
      }
      return this.$el;
    }

    if (this.ui.focus) { return this.ui.focus; } else { return null; }
  };


  /**
  * Recalculate scroll of scrollable element and window.
  * @method scroll
  **/
  Plugin.prototype.scroll = function() {
    this._preventMouseMove();
    if (this.ui.focus) {
      if ( this._scrolledElem ) { this._refreshBoxScroll( this._scrolledElem ); }
      this._refreshBoxScroll( window );
    }
  };


  /**
  * Enable disabled selectable list.
  * @method enable
  **/
  Plugin.prototype.enable = function() {
    this._isEnable = true;
    this.$el.removeClass( this.options.get('disabledClass') );
    return this.$el;
  };


  /**
  * Disable selectable list.
  * @method disable
  **/
  Plugin.prototype.disable = function() {
    this._isEnable = false;
    this._isHovered = false;
    this.$el.addClass( this.options.get('disabledClass') );
    return this.$el;
  };


  /**
  * Cancel changes in current cycle. This method
  * only could be invoked from callbacks function.
  * If called from `before` callback, then it will premvent any changes.
  * @method cancel
  **/
  Plugin.prototype.cancel = function() {
    this._isPrevented = true;
    return this.$el;
  };

  /**
  * Refresh plugins data. Sould be used when some selected
  * items was deleted from the list.
  * @method refresh
  **/
  Plugin.prototype.refresh = function() {
    var focus = this.ui.focus;
    if ( focus && !$(focus).is(':visible') ) { delete this.ui.focus; }
    this._selected = ( this.getSelected() ).length;
    return this.$el;
  };



  /* ==============================================================================

  Method of jQuery.fn

  */
  $.fn[Plugin.pluginName] = function( options ) {
    if( options && options.charAt ) {
      return Plugin._callPublicMethod.apply( this, arguments );
    }
    return this.each( function(key, elem) {
      if ( !Plugin.getDataObject(elem) ) { new Plugin( elem, options ); }
    });
  };

  $.fn[Plugin.pluginName].defaults = defaults;
}((window.jQuery || window.Zepto), window));
