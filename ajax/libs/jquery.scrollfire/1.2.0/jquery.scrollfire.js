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

        // Executes CONTINUOUSLY when scrolling in either direction
        onScroll: function() {},

        // Executes CONTINUOUSLY when scrolling down WHILE element is in view
        onScrollDown: function() {},

        // Executes CONTINUOUSLY when scrolling up WHILE element is in view
        onScrollUp: function() {},

        // Executes CONTINUOUSLY when scrolling down
        onScrollDownAlways: function() {},

        // Executes CONTINUOUSLY when scrolling up
        onScrollUpAlways: function() {},

        // Executes ONCE when element comes in from TOP (DOWN)
        onTopIn: function() {},

        // Executes ONCE when element goes out the TOP (UP)
        onTopOut: function() {},

        // Executes ONCE when element comes in from the BOTTOM (DOWN)
        onBottomIn: function() {},

        // Executes ONCE when element goes out the BOTTOM (UP)
        onBottomOut: function() {},

        // Parallax object definition
        parallax: {

          // The element the parallax scroll is to be relative to
          childOf: null,

          // The speed differential relative to the rate of scroll
          speed: 1
        },

        // Offsets
        offset: 0,
        topInOffset: 0,
        topOutOffset: 0,
        bottomInOffset: 0,
        bottomOutOffset: 0
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
    this.options = $.extend( {}, defaults, options);
    this._defaults = defaults;
    this._name = plugin_name;
    this.init();
  }

  // Initialization - meat and potatoes
  Plugin.prototype.init = function() {
    var plugin = this;

    // Create a new scroll registration object
    var scroll_obj = {
      _guid: globals.guid,
      _element: plugin.element,
      _on_scroll: plugin.options.onScroll,
      _on_scroll_down: plugin.options.onScrollDown,
      _on_scroll_up: plugin.options.onScrollUp,
      _on_scroll_down_always: plugin.options.onScrollDownAlways,
      _on_scroll_up_always: plugin.options.onScrollUpAlways,
      _on_top_in: plugin.options.onTopIn,
      _on_top_in_once: true,
      _on_top_out: plugin.options.onTopOut,
      _on_top_out_once: true,
      _on_bottom_in: plugin.options.onBottomIn,
      _on_bottom_in_once: true,
      _on_bottom_out: plugin.options.onBottomOut,
      _on_bottom_out_once: true,
      _offset: plugin.options.offset,
      _top_in_offset: plugin.options.topInOffset,
      _top_out_offset: plugin.options.topOutOffset,
      _bottom_in_offset: plugin.options.bottomInOffset,
      _bottom_out_offset: plugin.options.bottomOutOffset,
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
        if (scroll_dir == 'down') {

          // Elements position from the top
          var elm_pos_top = $(value._element).offset().top;

          // Reference element position conditions
          var onTopOut_true = scroll_pos >= (elm_pos_top + (value._top_out_offset ? -value._top_out_offset : -value._offset));
          var onBottomIn_true = (scroll_pos + $(window).outerHeight()) >= (elm_pos_top + (value._bottom_in_offset ? value._bottom_in_offset : value._offset));

          // Reference conditions that tell us if an element is visible in the screen
          var visibleTop = (scroll_pos <= (elm_pos_top + $(value._element).outerHeight()));
          var visibleBottom = (scroll_pos + $(window).outerHeight()) > elm_pos_top;

          // Fire the registered onScroll callback
          value._on_scroll( value._element, scroll_diff, scroll_dir );

          // Fire the registered onScrollDownAlways callback
          value._on_scroll_down_always( value._element, scroll_diff );

          // Fire the registered onScrollDown callback and parallax functionality
          if ( visibleTop && visibleBottom ) {

            // For user convenience, it is useful to pass a value to the callback that is the percentage distance an
            // element is from going out of view at the top of the window.
            var window_height = $(window).outerHeight();
            var to_top_distance = (elm_pos_top + $(value._element).outerHeight()) - scroll_pos;
            var perc_from_top = (to_top_distance / window_height);
            perc_from_top = (perc_from_top > 1) ? 1.00 : perc_from_top.toFixed(2);

            // Fire callback
            value._on_scroll_down( value._element, scroll_diff, perc_from_top );

            // Execute parallax scroll relative to element
            if (value._parallax.childOf && (to_top_distance >= value._offset)) {

              // Parallax element's current position from top of container element
              var parallax_elm_from_top = $(value._element).position().top;

              // Position to move parallaxed element to
              var parallax_pos = (parallax_elm_from_top - (scroll_diff * value._parallax.speed));

              // Parallax scroll only while still within container element
              if (parallax_pos >= 0) {
                $(value._element).css('top', parallax_pos);
              }
            }
          }

          // Fire the registered onTopOut callback
          if (onTopOut_true && value._on_top_out_once) {
            value._on_top_in_once = true;
            value._on_top_out_once = false;
            value._on_top_out( value._element, scroll_diff );
          }

          // Fire the registered onBottomIn callback
          if (onBottomIn_true && value._on_bottom_in_once) {
            value._on_bottom_out_once = true;
            value._on_bottom_in_once = false;
            value._on_bottom_in( value._element, scroll_diff );
          }
        } else {

          // Bottom of element's position from the top
          var elm_pos_top = $(value._element).offset().top + $(value._element).outerHeight();

          // Reference element position conditions
          var onTopIn_true = scroll_pos <= (elm_pos_top + (value._top_in_offset ? -value._top_in_offset : -value._offset));
          var onBottomOut_true = (scroll_pos + $(window).outerHeight()) <= (elm_pos_top + (-value._bottom_out_offset ? -value._bottom_out_offset : value._offset));

          // Reference conditions that tell us if an element is visible in the screen
          var visibleTop = scroll_pos < elm_pos_top;
          var visibleBottom = ((scroll_pos + $(window).outerHeight()) + $(value._element).outerHeight()) > elm_pos_top;

          // Fire the registered onScroll callback
          value._on_scroll( value._element, scroll_diff, scroll_dir );

          // Fire the registered onScrollUpAlways callback
          value._on_scroll_up_always( value._element, scroll_diff );

          // Fire the registered onScrollUp callback
          if ( visibleTop && visibleBottom ) {

            // For user convenience, it is useful to pass a value to the callback that is the percentage distance an
            // element is from going out of view at the top of the window.
            var window_height = $(window).outerHeight();
            var to_top_distance = (elm_pos_top) - scroll_pos;
            var perc_from_top = (to_top_distance / window_height);
            perc_from_top = (perc_from_top > 1) ? 1.00 : perc_from_top.toFixed(2);

            // Fire callback
            value._on_scroll_up( value._element, scroll_diff, perc_from_top );

            // Execute parallax scroll relative to element
            if (value._parallax.childOf) {

              // Parallax element's current position from top of container element
              var parallax_elm_from_top = $(value._element).position().top;

              // Position to move parallaxed element to
              var parallax_pos = (parallax_elm_from_top + (scroll_diff * value._parallax.speed));

              // Calculate the position offset induced by element padding
              var container_padding = value._parallax.childOf.css('padding-bottom').replace(/px/g, "");
              var parallax_offset = (container_padding == '0') ? $(value._element).outerHeight() : $(value._element).height();

              // Parallax scroll only while still within container element
              if ((parallax_pos + parallax_offset - container_padding) <= value._parallax.childOf.height()) {
                $(value._element).css('top', parallax_pos);
              }
            }
          }

          // Fire the registered onTopIn callback
          if (onTopIn_true && value._on_top_in_once) {
            value._on_top_out_once = true;
            value._on_top_in_once = false;
            value._on_top_in( value._element, scroll_diff );
          }

          // Fire the registered onBottomOut callback
          if (onBottomOut_true && value._on_bottom_out_once) {
            value._on_bottom_in_once = true;
            value._on_bottom_out_once = false;
            value._on_bottom_out( value._element, scroll_diff );
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

    // Attach the scroll handler only once
    if (!globals.scroll_handler) {
      globals.scroll_handler = scrollFireHandler;
      $(window).bind('scroll', scrollFireHandler);
    }
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