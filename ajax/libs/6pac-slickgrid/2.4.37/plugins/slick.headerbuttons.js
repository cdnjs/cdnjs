(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Plugins": {
        "HeaderButtons": HeaderButtons
      }
    }
  });


  /***
   * A plugin to add custom buttons to column headers.
   *
   * USAGE:
   *
   * Add the plugin .js & .css files and register it with the grid.
   *
   * To specify a custom button in a column header, extend the column definition like so:
   *
   *   var columns = [
   *     {
   *       id: 'myColumn',
   *       name: 'My column',
   *
   *       // This is the relevant part
   *       header: {
   *          buttons: [
   *              {
   *                // button options
   *              },
   *              {
   *                // button options
   *              }
   *          ]
   *       }
   *     }
   *   ];
   *
   * Available button options:
   *    cssClass:     CSS class to add to the button.
   *    image:        Relative button image path.
   *    disabled:     Whether the item is disabled.
   *    tooltip:      Button tooltip.
   *    showOnHover:  Only show the button on hover.
   *    handler:      Button click handler.
   *    command:      A command identifier to be passed to the onCommand event handlers.
   *
   * Available menu item options:
   *    action:                   Optionally define a callback function that gets executed when item is chosen (and/or use the onCommand event)
   *    command:                  A command identifier to be passed to the onCommand event handlers.
   *    cssClass:                 CSS class to add to the button.
   *    handler:                  Button click handler.
   *    image:                    Relative button image path.
   *    showOnHover:              Only show the button on hover.
   *    tooltip:                  Button tooltip.
   *    itemVisibilityOverride:   Callback method that user can override the default behavior of showing/hiding an item from the list
   *    itemUsabilityOverride:    Callback method that user can override the default behavior of enabling/disabling an item from the list
   *
   * The plugin exposes the following events:
   *    onCommand:    Fired on button click for buttons with 'command' specified.
   *        Event args:
   *            grid:     Reference to the grid.
   *            column:   Column definition.
   *            command:  Button command identified.
   *            button:   Button options.  Note that you can change the button options in your
   *                      event handler, and the column header will be automatically updated to
   *                      reflect them.  This is useful if you want to implement something like a
   *                      toggle button.
   *
   *
   * @param options {Object} Options:
   *    buttonCssClass:   a CSS class to use for buttons (default 'slick-header-button')
   * @class Slick.Plugins.HeaderButtons
   * @constructor
   */
  function HeaderButtons(options) {
    var _grid;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _defaults = {
      buttonCssClass: "slick-header-button"
    };


    function init(grid) {
      options = $.extend(true, {}, _defaults, options);
      _grid = grid;
      _handler
        .subscribe(_grid.onHeaderCellRendered, handleHeaderCellRendered)
        .subscribe(_grid.onBeforeHeaderCellDestroy, handleBeforeHeaderCellDestroy);

      // Force the grid to re-render the header now that the events are hooked up.
      _grid.setColumns(_grid.getColumns());
    }


    function destroy() {
      _handler.unsubscribeAll();
    }


    function handleHeaderCellRendered(e, args) {
      var column = args.column;

      if (column.header && column.header.buttons) {
        // Append buttons in reverse order since they are floated to the right.
        var i = column.header.buttons.length;
        while (i--) {
          var button = column.header.buttons[i];

          // run each override functions to know if the item is visible and usable
          var isItemVisible = runOverrideFunctionWhenExists(button.itemVisibilityOverride, args);
          var isItemUsable = runOverrideFunctionWhenExists(button.itemUsabilityOverride, args);

          // if the result is not visible then there's no need to go further
          if (!isItemVisible) {
            continue;
          }

          // when the override is defined, we need to use its result to update the disabled property
          // so that "handleMenuItemCommandClick" has the correct flag and won't trigger a command clicked event
          if (Object.prototype.hasOwnProperty.call(button, "itemUsabilityOverride")) {
            button.disabled = isItemUsable ? false : true;
          }

          var btn = $("<div></div>")
            .addClass(options.buttonCssClass)
            .data("column", column)
            .data("button", button);

          if (button.disabled) {
            btn.addClass("slick-header-button-disabled");
          }

          if (button.showOnHover) {
            btn.addClass("slick-header-button-hidden");
          }

          if (button.image) {
            btn.css("backgroundImage", "url(" + button.image + ")");
          }

          if (button.cssClass) {
            btn.addClass(button.cssClass);
          }

          if (button.tooltip) {
            btn.attr("title", button.tooltip);
          }

          if (button.command) {
            btn.data("command", button.command);
          }

          if (button.handler) {
            btn.on("click", button.handler);
          }

          btn
            .on("click", handleButtonClick)
            .appendTo(args.node);
        }
      }
    }


    function handleBeforeHeaderCellDestroy(e, args) {
      var column = args.column;

      if (column.header && column.header.buttons) {
        // Removing buttons via jQuery will also clean up any event handlers and data.
        // NOTE: If you attach event handlers directly or using a different framework,
        //       you must also clean them up here to avoid memory leaks.
        $(args.node).find("." + options.buttonCssClass).remove();
      }
    }


    function handleButtonClick(e) {
      var command = $(this).data("command");
      var columnDef = $(this).data("column");
      var button = $(this).data("button");

      var callbackArgs = {
        "grid": _grid,
        "column": columnDef,
        "button": button
      };

      if (command != null) {
        callbackArgs.command = command;
      }

      // execute action callback when defined
      if (typeof button.action === "function") {
        button.action.call(this, e, callbackArgs);
      }

      if (command != null && !button.disabled) {
        _self.onCommand.notify(callbackArgs, e, _self);

        // Update the header in case the user updated the button definition in the handler.
        _grid.updateColumnHeader(columnDef.id);
      }

      // Stop propagation so that it doesn't register as a header click event.
      e.preventDefault();
      e.stopPropagation();
    }

    /**
     * Method that user can pass to override the default behavior.
     * In order word, user can choose or an item is (usable/visible/enable) by providing his own logic.
     * @param overrideFn: override function callback
     * @param args: multiple arguments provided to the override (cell, row, columnDef, dataContext, grid)
     */
    function runOverrideFunctionWhenExists(overrideFn, args) {
      if (typeof overrideFn === 'function') {
        return overrideFn.call(this, args);
      }
      return true;
    }

    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "HeaderButtons",

      "onCommand": new Slick.Event()
    });
  }
})(jQuery);
