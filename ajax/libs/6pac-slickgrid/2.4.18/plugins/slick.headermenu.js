(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Plugins": {
        "HeaderMenu": HeaderMenu
      }
    }
  });

  /***
   * A plugin to add drop-down menus to column headers.
   *
   * USAGE:
   *
   * Add the plugin .js & .css files and register it with the grid.
   *
   * To specify a menu in a column header, extend the column definition like so:
   *
   *   var columns = [
   *     {
   *       id: 'myColumn',
   *       name: 'My column',
   *
   *       // This is the relevant part
   *       header: {
   *          menu: {
   *              items: [
   *                {
   *                  // menu item options
   *                },
   *                {
   *                  // menu item options
   *                }
   *              ]
   *          }
   *       }
   *     }
   *   ];
   *
   *
   * Available menu options:
   *    autoAlign:              Auto-align drop menu to the left when not enough viewport space to show on the right
   *    autoAlignOffset:        When drop menu is aligned to the left, it might not be perfectly aligned with the header menu icon, if that is the case you can add an offset (positive/negative number to move right/left)
   *    buttonCssClass:         an extra CSS class to add to the menu button
   *    buttonImage:            a url to the menu button image (default '../images/down.gif')
   *    menuUsabilityOverride:  Callback method that user can override the default behavior of enabling/disabling the menu from being usable (must be combined with a custom formatter)
   *    minWidth:               Minimum width that the drop menu will have
   *
   *
   * Available menu item options:
   *    action:                   Optionally define a callback function that gets executed when item is chosen (and/or use the onCommand event)
   *    title:                    Menu item text.
   *    divider:                  Whether the current item is a divider, not an actual command.
   *    disabled:                 Whether the item is disabled.
   *    tooltip:                  Item tooltip.
   *    command:                  A command identifier to be passed to the onCommand event handlers.
   *    cssClass:                 A CSS class to be added to the menu item container.
   *    iconCssClass:             A CSS class to be added to the menu item icon.
   *    iconImage:                A url to the icon image.
   *    textCssClass:             A CSS class to be added to the menu item text.
   *    itemVisibilityOverride:   Callback method that user can override the default behavior of showing/hiding an item from the list
   *    itemUsabilityOverride:    Callback method that user can override the default behavior of enabling/disabling an item from the list
   *
   *
   * The plugin exposes the following events:

   *    onAfterMenuShow:   Fired after the menu is shown.  You can customize the menu or dismiss it by returning false.
   *        Event args:
   *            grid:     Reference to the grid.
   *            column:   Column definition.
   *            menu:     Menu options.  Note that you can change the menu items here.
   * 
   *    onBeforeMenuShow:   Fired before the menu is shown.  You can customize the menu or dismiss it by returning false.
   *        Event args:
   *            grid:     Reference to the grid.
   *            column:   Column definition.
   *            menu:     Menu options.  Note that you can change the menu items here.
   *
   *    onCommand:    Fired on menu item click for buttons with 'command' specified.
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
   *    buttonCssClass:   an extra CSS class to add to the menu button
   *    buttonImage:      a url to the menu button image (default '../images/down.gif')
   * @class Slick.Plugins.HeaderButtons
   * @constructor
   */
  function HeaderMenu(options) {
    var _grid;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _defaults = {
      buttonCssClass: null,
      buttonImage: null,
      minWidth: 100,
      autoAlign: true,
      autoAlignOffset: 0
    };
    var $menu;
    var $activeHeaderColumn;


    function init(grid) {
      options = $.extend(true, {}, _defaults, options);
      _grid = grid;
      _handler
        .subscribe(_grid.onHeaderCellRendered, handleHeaderCellRendered)
        .subscribe(_grid.onBeforeHeaderCellDestroy, handleBeforeHeaderCellDestroy);

      // Force the grid to re-render the header now that the events are hooked up.
      _grid.setColumns(_grid.getColumns());

      // Hide the menu on outside click.
      $(document.body).on("mousedown", handleBodyMouseDown);
    }

    function setOptions(newOptions) {
      options = $.extend(true, {}, options, newOptions);
    }


    function destroy() {
      _handler.unsubscribeAll();
      $(document.body).off("mousedown", handleBodyMouseDown);
    }


    function handleBodyMouseDown(e) {
      if ($menu && $menu[0] != e.target && !$.contains($menu[0], e.target)) {
        hideMenu();
      }
    }


    function hideMenu() {
      if ($menu) {
        $menu.remove();
        $menu = null;
        $activeHeaderColumn
          .removeClass("slick-header-column-active");
      }
    }

    function handleHeaderCellRendered(e, args) {
      var column = args.column;
      var menu = column.header && column.header.menu;

      if (menu) {
        // run the override function (when defined), if the result is false it won't go further
        if (!runOverrideFunctionWhenExists(options.menuUsabilityOverride, args)) {
          return;
        }

        var $el = $("<div></div>")
          .addClass("slick-header-menubutton")
          .data("column", column)
          .data("menu", menu);

        if (options.buttonCssClass) {
          $el.addClass(options.buttonCssClass);
        }

        if (options.buttonImage) {
          $el.css("background-image", "url(" + options.buttonImage + ")");
        }

        if (menu.tooltip) {
          $el.attr("title", menu.tooltip);
        }

        $el
          .on("click", showMenu)
          .appendTo(args.node);
      }
    }


    function handleBeforeHeaderCellDestroy(e, args) {
      var column = args.column;

      if (column.header && column.header.menu) {
        $(args.node).find(".slick-header-menubutton").remove();
      }
    }


    function showMenu(e) {
      var $menuButton = $(this);
      var menu = $menuButton.data("menu");
      var columnDef = $menuButton.data("column");

      // Let the user modify the menu or cancel altogether,
      // or provide alternative menu implementation.
      var callbackArgs = {
        "grid": _grid,
        "column": columnDef,
        "menu": menu
      };
      if (_self.onBeforeMenuShow.notify(callbackArgs, e, _self) == false) {
        return;
      }


      if (!$menu) {
        $menu = $("<div class='slick-header-menu' style='min-width: " + options.minWidth + "px'></div>")
          .appendTo(_grid.getContainerNode());
      }
      $menu.empty();


      // Construct the menu items.
      for (var i = 0; i < menu.items.length; i++) {
        var item = menu.items[i];

        // run each override functions to know if the item is visible and usable
        var isItemVisible = runOverrideFunctionWhenExists(item.itemVisibilityOverride, callbackArgs);
        var isItemUsable = runOverrideFunctionWhenExists(item.itemUsabilityOverride, callbackArgs);

        // if the result is not visible then there's no need to go further
        if (!isItemVisible) {
          continue;
        }

        // when the override is defined, we need to use its result to update the disabled property
        // so that "handleMenuItemCommandClick" has the correct flag and won't trigger a command clicked event
        if (Object.prototype.hasOwnProperty.call(item, "itemUsabilityOverride")) {
          item.disabled = isItemUsable ? false : true;
        }

        var $li = $("<div class='slick-header-menuitem'></div>")
          .data("command", item.command || '')
          .data("column", columnDef)
          .data("item", item)
          .on("click", handleMenuItemClick)
          .appendTo($menu);

        if (item.divider || item === "divider") {
          $li.addClass("slick-header-menuitem-divider");
          continue;
        }

        if (item.disabled) {
          $li.addClass("slick-header-menuitem-disabled");
        }

        if (item.cssClass) {
          $li.addClass(item.cssClass);
        }

        if (item.tooltip) {
          $li.attr("title", item.tooltip);
        }

        var $icon = $("<div class='slick-header-menuicon'></div>")
          .appendTo($li);

        if (item.iconCssClass) {
          $icon.addClass(item.iconCssClass);
        }

        if (item.iconImage) {
          $icon.css("background-image", "url(" + item.iconImage + ")");
        }

        var $text = $("<span class='slick-header-menucontent'></span>")
          .text(item.title)
          .appendTo($li);

        if (item.textCssClass) {
          $text.addClass(item.textCssClass);
        }
      }

      var leftPos = $(this).offset().left;

      // when auto-align is set, it will calculate whether it has enough space in the viewport to show the drop menu on the right (default)
      // if there isn't enough space on the right, it will automatically align the drop menu to the left
      // to simulate an align left, we actually need to know the width of the drop menu
      if (options.autoAlign) {
        var gridPos = _grid.getGridPosition();
        if ((leftPos + options.minWidth) >= gridPos.width) {
          leftPos = leftPos - options.minWidth + options.autoAlignOffset;
        }
      }

      $menu
        .offset({ top: $(this).offset().top + $(this).height(), left: leftPos });


      // Mark the header as active to keep the highlighting.
      $activeHeaderColumn = $menuButton.closest(".slick-header-column");
      $activeHeaderColumn
        .addClass("slick-header-column-active");

      if (_self.onAfterMenuShow.notify(callbackArgs, e, _self) == false) {
        return;
      }

      // Stop propagation so that it doesn't register as a header click event.
      e.preventDefault();
      e.stopPropagation();
    }


    function handleMenuItemClick(e) {
      var command = $(this).data("command");
      var columnDef = $(this).data("column");
      var item = $(this).data("item");

      if (item.disabled || item.divider || item === "divider") {
        return;
      }

      hideMenu();

      if (command != null && command !== '') {
        var callbackArgs = {
          "grid": _grid,
          "column": columnDef,
          "command": command,
          "item": item
        };
        _self.onCommand.notify(callbackArgs, e, _self);

        // execute action callback when defined
        if (typeof item.action === "function") {
          item.action.call(this, e, callbackArgs);
        }
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
      "pluginName": "HeaderMenu",
      "setOptions": setOptions,

      "onAfterMenuShow": new Slick.Event(),
      "onBeforeMenuShow": new Slick.Event(),
      "onCommand": new Slick.Event()
    });
  }
})(jQuery);
