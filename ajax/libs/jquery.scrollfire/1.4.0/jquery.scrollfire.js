/**
 * jQuery.scrollfire()
 *
 * (a) Wil Neeley, Trestle Media, LLC.
 * Code may be freely distributed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

  var

      // The plugin's name
      plugin_name = 'scrollfire',

      // Ref to plugin itself
      plugin_ref = null,

      // The plugin's defaults
      defaults = {

        // Executes ONCE when element comes in from TOP (DOWN)
        onTopIn: function() {},

        // Executes ONCE when element goes out the TOP (UP)
        onTopOut: function() {},

        // Executes ONCE when element comes in from the BOTTOM (DOWN)
        onBottomIn: function() {},

        // Executes ONCE when element goes out the BOTTOM (UP)
        onBottomOut: function() {},

        // Executes ONCE when element goes out the TOP (UP) and is completely hidden
        onTopHidden: function() {},

        // Executes ONCE when element comes in from the BOTTOM (DOWN) and is completely in view
        onBottomVisible: function() {},

        // Executes ONCE when element goes out the BOTTOM (UP) and is completely hidden
        onBottomHidden: function() {},

        // Executes ONCE when element comes in from TOP (DOWN) and is completely in view
        onTopVisible: function() {},

        // Executes CONTINUOUSLY when scrolling in either direction WHILE element is in view
        onScroll: function() {},

        // Executes CONTINUOUSLY when scrolling down WHILE element is in view
        onScrollDown: function() {},

        // Executes CONTINUOUSLY when scrolling up WHILE element is in view
        onScrollUp: function() {},

        // Executes CONTINUOUSLY when scrolling in either direction
        onScrollAlways: function() {},

        // Executes CONTINUOUSLY when scrolling down
        onScrollDownAlways: function() {},

        // Executes CONTINUOUSLY when scrolling up
        onScrollUpAlways: function() {},

        // Offset (constrain the top and bottom of the viewport by a pixel value)
        offset: 0,

        // Top Offset (constrain the top of the viewport by a pixel value)
        topOffset: 0,

        // Bottom Offset (constrain the bottom of the viewport by a pixel value)
        bottomOffset: 0,

        // Parallax object definition
        parallax: {

          // Are we to parallax this element?
          active: false,

          // The element the parallax scroll is to be relative to
          parent: null,

          // Respect the parallax elements margins as a boundary within the parent
          bound: false,

          // The animation duration of the parallax
          speed: 10,

          // The animation easing of the parallax
          easing: 'linear',

          // Invert the Y-axis parallax direction
          invert: false,

          // Multiplies the scroll distance by this factor, increasing/decreasing parallax distance
          scalar: 1
        }
      },

      // The plugin's globals
      globals = {

        // A place to store references to scrollfire elements
        registry: {},

        // A starting unique ID
        guid: 0,

        // Helps us determine which direction is being scrolled
        last_scroll_pos: 0,

        // Referene the scroll fire scroll event handler
        scroll_handler: null
      };


  // Plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.options = $.extend(true, {}, defaults, options);
    this._defaults = defaults;
    this._name = plugin_name;
    this.init();
  }

  // Initialization - meat and potatoes
  Plugin.prototype.init = function() {
    var plugin = this;

    // Create a new scroll registration object
    var scroll_obj = {

      // Reference to the element itself
      _element: plugin.element,

      // The element's unique ID
      _guid: globals.guid,

      // Handlers for entry/exit of elements
      _on_top_in: plugin.options.onTopIn,
      _on_top_in_once: true,
      _on_top_out: plugin.options.onTopOut,
      _on_top_out_once: true,
      _on_bottom_in: plugin.options.onBottomIn,
      _on_bottom_in_once: true,
      _on_bottom_out: plugin.options.onBottomOut,
      _on_bottom_out_once: true,

      // Callbacks for element fully in-view/out-of-view top/bottom
      _on_top_hidden: plugin.options.onTopHidden,
      _on_top_hidden_once: true,
      _on_bottom_visible: plugin.options.onBottomVisible,
      _on_bottom_visible_once: true,
      _on_bottom_hidden: plugin.options.onBottomHidden,
      _on_bottom_hidden_once: true,
      _on_top_visible: plugin.options.onTopVisible,
      _on_top_visible_once: true,

      // Handler for continuous scroll while element is in view
      _on_scroll: plugin.options.onScroll,
      _on_scroll_down: plugin.options.onScrollDown,
      _on_scroll_up: plugin.options.onScrollUp,

      // Handler for scroll direction (regardless if element is in view)
      _on_scroll_always: plugin.options.onScrollAlways,
      _on_scroll_down_always: plugin.options.onScrollDownAlways,
      _on_scroll_up_always: plugin.options.onScrollUpAlways,

      // Offset boundary properties
      _offset: plugin.options.offset,
      _top_offset: plugin.options.topOffset,
      _bottom_offset: plugin.options.bottomOffset,

      // Parallax object property implementation
      _parallax: plugin.options.parallax
    };

    // Define the scroll handler
    var scrollFireHandler = function(e) {

      // Position of current scroll
      var scroll_pos = $(window).scrollTop();

      // Reference the scroll direction
      var scroll_dir = (scroll_pos > globals.last_scroll_pos) ? 'down' : 'up';

      // Calculate the scroll difference (distance scrolled since last scroll event)
      var scroll_diff = Math.abs(globals.last_scroll_pos - scroll_pos);

      // Fire callbacks on the registration objects
      $.each(globals.registry, function(index, value) {

        // Determine offset values
        var offset = ($.isFunction(value._offset)) ? value._offset() : value._offset;
        var topOffset = ($.isFunction(value._top_offset)) ? value._top_offset() : value._top_offset;
        var bottomOffset = ($.isFunction(value._bottom_offset)) ? value._bottom_offset() : value._bottom_offset;

        // Reference the target element
        var elm = $(value._element);

        // Change our reference during parallax to the container element instead of selected element
        if (value._parallax.active) {
          elm = value._parallax.parent || elm.parent();
        }

        // Viewport dimensions
        var viewport_height = $(window).height();

        // Element dimensions
        var elm_height = elm.outerHeight();

        // Elements position from the top
        var elm_pos_top = elm.offset().top;

        // Bottom of element position from the top
        var elm_pos_bot = elm.offset().top + elm_height;

        // Fire the onScrollAlways callback constantly
        value._on_scroll_always( value._element, scroll_diff, value );

        // Execute down scrolling callbacks
        if (scroll_dir == 'down') {

          // When scrolling down determine the true top offset
          offset = (topOffset) ? topOffset : offset;

          // Conditions for when element is PARTIALLY visible in the viewport (inclusive of offset)
          var partiallyVisibleTop = scroll_pos <= (elm_pos_top + elm_height - offset);
          var partiallyVisibleBottom = (scroll_pos + viewport_height) >= (elm_pos_top + offset);

          // Conditions for when element is FULLY visible in the viewport (inclusive of offset)
          var fullyVisibleTop = scroll_pos <= (elm_pos_top - offset);
          var fullyVisibleBottom = (scroll_pos + viewport_height) >= (elm_pos_top + elm_height + offset);

          // Conditions stipulating if element is within the viewport/offset boundaries
          var partiallyInBounds = (partiallyVisibleTop && partiallyVisibleBottom);
          var fullyInBounds = (fullyVisibleTop && fullyVisibleBottom);

          // Conditions for when element begins to go out/come in the viewport (inclusive of offset)
          var onTopOut = scroll_pos >= (elm_pos_top - offset);
          var onBottomIn = (scroll_pos + viewport_height) >= (elm_pos_top + offset);

          // Fire the registered onTopOut callback
          if (onTopOut && value._on_top_out_once) {
            value._on_top_in_once = true;
            value._on_top_visible_once = true;
            value._on_top_out_once = false;
            value._on_top_out( value._element, scroll_diff, value );
          }

          // Fire the registered onBottomIn callback
          if (onBottomIn && value._on_bottom_in_once) {
            value._on_bottom_out_once = true;
            value._on_bottom_hidden_once = true;
            value._on_bottom_in_once = false;
            value._on_bottom_in( value._element, scroll_diff, value );
          }

          // Fire the registered onScrollDownAlways callback
          value._on_scroll_down_always( value._element, scroll_diff, value );

          // Fire callbacks that should occur when element is PARTIALLY in viewport
          if (partiallyInBounds) {

            // Fire the registered onScroll callback
            value._on_scroll( value._element, scroll_diff, value );

            // Fire callback
            value._on_scroll_down( value._element, scroll_diff, value );
          }

          // Calculate point at which element becomes visible from the bottom
          var to_top_distance_vis = (elm_pos_top + elm_height) - scroll_pos;
          var perc_from_top_vis = ((to_top_distance_vis + offset) / viewport_height);
          perc_from_top_vis = (perc_from_top_vis > 1) ? 1.00 : perc_from_top_vis.toFixed(2);

          // Calculate the point at which the element becomes hidden at the top
          var to_top_distance_hid = (elm_pos_top + elm_height) - scroll_pos;
          var perc_from_top_hid = ((to_top_distance_hid - offset) / viewport_height);
          perc_from_top_hid = (perc_from_top_hid > 1) ? 1.00 : perc_from_top_hid.toFixed(2);

          // Fire the onBottomVisible callback when element is completely in view
          if (perc_from_top_vis < 1 && perc_from_top_hid <= 0 && value._on_bottom_visible_once) {
            value._on_bottom_visible_once = false;
            value._on_bottom_visible( value._element, scroll_diff, value );
          }

          // Fire onTopHidden callback when element is completely out of view
          if (perc_from_top_hid <= 0 && perc_from_top_vis < 1 && value._on_top_hidden_once) {
            value._on_top_hidden_once = false;
            value._on_top_hidden( value._element, scroll_diff, value );
          }

          // Execute parallax when active
          if (value._parallax.active) {
            initParallax( value._parallax, $(value._element), offset, scroll_pos, viewport_height );
          }

        // Execute up scrolling callbacks
        } else {

          // When scrolling down determine the true top offset
          offset = (bottomOffset) ? bottomOffset : offset;

          // Conditions for when element is PARTIALLY visible in the viewport (inclusive of offset)
          var partiallyVisibleTop = scroll_pos <= (elm_pos_top + elm_height - offset);
          var partiallyVisibleBottom = (scroll_pos + viewport_height) >= (elm_pos_top + offset);

          // Conditions for when element is FULLY visible in the viewport (inclusive of offset)
          var fullyVisibleTop = scroll_pos <= (elm_pos_top - offset);
          var fullyVisibleBottom = (scroll_pos + viewport_height) >= (elm_pos_top + elm_height + offset);

          // Conditions stipulating if element is within the viewport/offset boundaries
          var partiallyInBounds = (partiallyVisibleTop && partiallyVisibleBottom);
          var fullyInBounds = (fullyVisibleTop && fullyVisibleBottom);

          // Conditions for when elements begin to come in/go out the viewport (inclusive of offset)
          var onTopIn = scroll_pos <= (elm_pos_bot - offset);
          var onBottomOut = (scroll_pos + viewport_height) <= (elm_pos_bot + offset);

          // Fire the registered onTopIn callback
          if (onTopIn && value._on_top_in_once) {
            value._on_top_out_once = true;
            value._on_top_hidden_once = true;
            value._on_top_in_once = false;
            value._on_top_in( value._element, scroll_diff, value );
          }

          // Fire the registered onBottomOut callback
          if (onBottomOut && value._on_bottom_out_once) {
            value._on_bottom_in_once = true;
            value._on_bottom_visible_once = true;
            value._on_bottom_out_once = false;
            value._on_bottom_out( value._element, scroll_diff, value );
          }

          // Fire the registered onScrollUpAlways callback
          value._on_scroll_up_always( value._element, scroll_diff, value );

          // Fire callbacks that should occur when element is PARTIALLY in viewport
          if (partiallyInBounds) {

            // Fire the registered onScroll callback
            value._on_scroll( value._element, scroll_diff, value );

            // Fire callback
            value._on_scroll_up( value._element, scroll_diff, value );
          }

          // Calculate point at which element becomes visible from the top
          var to_top_distance_vis = (elm_pos_top + elm_height) - (scroll_pos + elm_height + offset);
          var perc_from_top_vis = (to_top_distance_vis / viewport_height);
          perc_from_top_vis = (perc_from_top_vis > 1) ? 1.00 : perc_from_top_vis.toFixed(2);

          // Calculate point at which element becomes hidden at the bottom
          var to_top_distance_hid = (elm_pos_top + elm_height) - (scroll_pos + elm_height - offset);
          var perc_from_top_hid = (to_top_distance_hid / viewport_height);
          perc_from_top_hid = (perc_from_top_hid > 1) ? 1.00 : perc_from_top_hid.toFixed(2);

          // Fire onTopVisible when element is completely in view
          if (perc_from_top_vis >= 0 && perc_from_top_hid >= 1 && value._on_top_visible_once) {
            value._on_top_visible_once = false;
            value._on_top_visible( value._element, scroll_diff, value );
          }

          // Fire the onBottomHidden callback when element is completely out of view
          if (perc_from_top_hid >= 1 && perc_from_top_vis >= 0 && value._on_bottom_hidden_once) {
            value._on_bottom_hidden_once = false;
            value._on_bottom_hidden( value._element, scroll_diff, value );
          }

          // Execute parallax when active
          if (value._parallax.active) {
            initParallax( value._parallax, $(value._element), offset, scroll_pos, viewport_height );
          }
        }
      });

      // Update the global scroll position
      globals.last_scroll_pos = scroll_pos;
    };

    // Reference the scroll event handler in the registration object
    scroll_obj['_scroll_handler'] = scrollFireHandler;

    // Register our element(s)
    globals.registry[globals.guid] = scroll_obj;

    // Update the unique IDs associated with the current element(s)
    if (!$.data(plugin.element, 'uids')) {
      $.data(plugin.element, 'uids', [globals.guid]);
    } else {
      var uids = $.data(plugin.element, 'uids');
      uids.push(globals.guid);
      $.data(plugin.element, 'uids', uids);
    }

    // Increment the global unique ID for our next round
    globals.guid++;

    // Attach the scroll handler only once to both the scroll and resize events
    if (!globals.scroll_handler) {
      globals.scroll_handler = scrollFireHandler;
      $(window).bind('scroll resize load', scrollFireHandler);
    }
  };

  /**
   * Returns an elements margin on the specified side ('top', 'right', 'bottom', 'left').
   * @param elm
   * @param side
   */
  var getElementMargin = function( elm, side ) {
    return parseInt(elm.css('margin-'+side).replace(/px|em|%|auto|inherit/g, ""));
  };

  /**
   * Initializes and controls parallax effect on elements.
   * @param conf
   * @param elm
   * @param offset
   * @param scroll_pos
   * @param viewport_height
   */
  var initParallax = function( conf, elm, offset, scroll_pos, viewport_height ) {

    // Reference parallax elements' container
    var c_elm = conf.parent || elm.parent();
    var c_height = c_elm.outerHeight();
    var c_top = c_elm.offset().top;

    // The margin of the element
    var m_diff = getElementMargin(elm, 'top');

    // Percentage distance container is from starting to go in/out of view
    var c_dist = (c_top) - scroll_pos;
    var c_pos = ((c_dist - offset) / (viewport_height - c_height)) * conf.scalar;

    // When the parallax direction is inverted
    if (conf.invert) {
      c_pos = ((c_pos - 1) * -1) * conf.scalar;
    }

    // Calculate the move to position including margin bounds
    var p_pos = (c_height - elm.outerHeight(conf.bound)) * c_pos;

    // Determine the location to move to
    var moveTo = 0;
    if (c_pos >= 0 && c_pos <= 1) {
      moveTo = (p_pos - (conf.bound ? 0 : m_diff));
    } else if (c_pos < 0 && conf.scalar == 1) {
      moveTo = (conf.bound ? 0 : -m_diff);
    } else if (c_pos > 1 && conf.scalar == 1) {
      moveTo = c_height - (conf.bound ? 0 : m_diff) - elm.outerHeight() - (conf.bound ? (m_diff * 2) : 0);
    }

    // Animate the parallax element
    elm.stop().animate(
        { top: moveTo },
        { duration: conf.speed, easing: conf.easing }
    );
  };

  // Public methods
  var public_methods = {

    /**
     * Removes elements from scrollfire handler.
     */
    remove: function( elms ) {
      elms.each(function(index, value) {
        var uid = $(value).data('uids');
        if (uid) {
          delete globals.registry[uid];
        }
      });
      return plugin_ref;
    }
  };

  // Plugin wrapper around constructor
  $.fn[plugin_name] = function ( options ) {

    // Reference the plugin globally
    plugin_ref = this;

    // Call methods or init plugin as appropriate
    if (typeof options == 'string') {
      var method_name = options;
      var args = $(arguments).toArray();
      args.shift();
      args.unshift(this);
      return public_methods[method_name].apply(this, args);
    } else {
      return this.each(function () {
        $.data(this, 'plugin_' + plugin_name, new Plugin( this, options ));
      });
    }
  };

})( jQuery, window, document );