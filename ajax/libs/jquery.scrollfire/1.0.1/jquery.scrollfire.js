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

        // Plugin's callbacks
        onTopIn: function() {},
        onTopOut: function() {},
        onBottomIn: function() {},
        onBottomOut: function() {},

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
      _bottom_out_offset: plugin.options.bottomOutOffset
    };

    // Define the scroll handler
    var scrollFireHandler = function(e) {

      // Position of current scroll
      var scroll_pos = $(window).scrollTop();

      // Scrolling Down
      if (scroll_pos > globals.last_scroll_pos) {

        // Iterate over our registration objects
        $.each(globals.registry, function(index, value) {

          // Elements position from the top
          var elm_pos_top = $(value._element).offset().top;

          // Fire the registered onTopOut callback
          if (scroll_pos >= (elm_pos_top + (value._top_out_offset ? value._top_out_offset : value._offset)) && value._on_top_out_once) {
            value._on_top_in_once = true;
            value._on_top_out_once = false;
            value._on_top_out( value._element );
          }

          // Fire the registered onInBottom callback
          if ((scroll_pos + $(window).height()) >= (elm_pos_top + (value._bottom_in_offset ? value._bottom_in_offset : value._offset)) && value._on_bottom_in_once) {
            value._on_bottom_out_once = true;
            value._on_bottom_in_once = false;
            value._on_bottom_in( value._element );
          }
        });

      // Scrolling Up
      } else {

        // Iterate over our registration objects
        $.each(globals.registry, function(index, value) {

          // Bottom of element's position from the top
          var elm_pos_top = $(value._element).offset().top + $(value._element).outerHeight();

          // Fire the registered onTopIn callback
          if (scroll_pos <= (elm_pos_top + (value._top_in_offset ? value._top_in_offset : value._offset)) && value._on_top_in_once) {
            value._on_top_out_once = true;
            value._on_top_in_once = false;
            value._on_top_in( value._element );
          }

          // Fire the registered onBottomOut callback
          if ((scroll_pos + $(window).outerHeight()) <= (elm_pos_top + (value._bottom_out_offset ? value._bottom_out_offset : value._offset)) && value._on_bottom_out_once) {
            value._on_bottom_in_once = true;
            value._on_bottom_out_once = false;
            value._on_bottom_out( value._element );
          }
        });
      }

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