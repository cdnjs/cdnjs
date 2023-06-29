(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
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
   *    disabled:                 Whether the item/command is disabled.
   *    hidden:                   Whether the item/command is hidden.
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
    var _bindingEventService = new Slick.BindingEventService();
    var _defaults = {
      buttonCssClass: null,
      buttonImage: null,
      minWidth: 100,
      autoAlign: true,
      autoAlignOffset: 0
    };
    var _activeHeaderColumnElm;
    var _menuElm;

    function init(grid) {
      options = Slick.Utils.extend(true, {}, _defaults, options);
      _grid = grid;
      _handler
        .subscribe(_grid.onHeaderCellRendered, handleHeaderCellRendered)
        .subscribe(_grid.onBeforeHeaderCellDestroy, handleBeforeHeaderCellDestroy);

      // Force the grid to re-render the header now that the events are hooked up.
      _grid.setColumns(_grid.getColumns());

      // Hide the menu on outside click.
      _bindingEventService.bind(document.body, 'mousedown', handleBodyMouseDown.bind(this));
    }

    function setOptions(newOptions) {
      options = Slick.Utils.extend(true, {}, options, newOptions);
    }

    function getGridUidSelector() {
      const gridUid = _grid.getUID() || '';
      return gridUid ? `.${gridUid}` : '';
    }

    function destroy() {
      _handler.unsubscribeAll();
      _bindingEventService.unbindAll();
      _menuElm = _menuElm || document.body.querySelector(`.slick-header-menu${getGridUidSelector()}`);
      _menuElm && _menuElm.remove();
      _activeHeaderColumnElm = undefined;
    }

    function handleBodyMouseDown(e) {
      if ((_menuElm !== e.target && !(_menuElm && _menuElm.contains(e.target))) || e.target.className === 'close') {
        hideMenu();
      }
    }

    function hideMenu() {
      if (_menuElm) {
        _menuElm.remove();
        _menuElm = undefined;
      }
      _activeHeaderColumnElm && _activeHeaderColumnElm.classList.remove('slick-header-column-active');
    }

    function handleHeaderCellRendered(e, args) {
      var column = args.column;
      var menu = column.header && column.header.menu;

      if (menu) {
        // run the override function (when defined), if the result is false it won't go further
        if (!runOverrideFunctionWhenExists(options.menuUsabilityOverride, args)) {
          return;
        }

        const elm = document.createElement('div');
        elm.className = "slick-header-menubutton";
        elm.ariaLabel = 'Header Menu';
        elm.role = 'button';

        if (options.buttonCssClass) {
          elm.classList.add(options.buttonCssClass);
        }

        if (options.buttonImage) {
          elm.style.backgroundImage = "url(" + options.buttonImage + ")";
        }

        if (options.tooltip) {
          elm.title = options.tooltip;
        }

        _bindingEventService.bind(elm, 'click', (e) => showMenu(e, menu, args.column));
        args.node.appendChild(elm);
      }
    }

    function handleBeforeHeaderCellDestroy(e, args) {
      var column = args.column;

      if (column.header && column.header.menu) {
        args.node.querySelectorAll('.slick-header-menubutton').forEach(elm => elm.remove());
      }
    }


    function showMenu(event, menu, columnDef) {
      // Let the user modify the menu or cancel altogether,
      // or provide alternative menu implementation.
      var callbackArgs = {
        "grid": _grid,
        "column": columnDef,
        "menu": menu
      };
      if (_self.onBeforeMenuShow.notify(callbackArgs, event, _self).getReturnValue() == false) {
        return;
      }

      if (!_menuElm) {
        _menuElm = document.createElement('div');
        _menuElm.className = 'slick-header-menu';
        _menuElm.role = 'menu';
        _menuElm.style.minWidth = `${options.minWidth}px`;
        _menuElm.setAttribute('aria-expanded', 'true');
        const containerNode = _grid.getContainerNode();
        if (containerNode) {
          containerNode.appendChild(_menuElm);
        }
      }

      // make sure the menu element is an empty div before adding all list of commands
      Slick.Utils.emptyElement(this._menuElm);

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

        const menuItem = document.createElement('div');
        menuItem.className = 'slick-header-menuitem';
        menuItem.role = 'menuitem';

        if (item.divider || item === "divider") {
          menuItem.classList.add("slick-header-menuitem-divider");
          continue;
        }

        if (item.disabled) {
          menuItem.classList.add("slick-header-menuitem-disabled");
        }

        if (item.hidden) {
          menuItem.classList.add("slick-header-menuitem-hidden");
        }

        if (item.cssClass) {
          menuItem.classList.add(item.cssClass);
        }

        if (item.tooltip) {
          menuItem.title = item.tooltip;
        }

        const iconElm = document.createElement('div');
        iconElm.className = 'slick-header-menuicon';
        menuItem.appendChild(iconElm);

        if (item.iconCssClass) {
          iconElm.classList.add(item.iconCssClass);
        }

        if (item.iconImage) {
          iconElm.style.backgroundImage = "url(" + item.iconImage + ")";
        }

        const textElm = document.createElement('span');
        textElm.className = 'slick-header-menucontent';
        textElm.textContent = item.title;
        menuItem.appendChild(textElm);

        if (item.textCssClass) {
          textElm.classList.add(item.textCssClass);
        }

        _menuElm.appendChild(menuItem);
        _bindingEventService.bind(menuItem, 'click', handleMenuItemClick.bind(this, item, columnDef));
      }

      const buttonElm = event.target;
      const btnOffset = Slick.Utils.offset(buttonElm);
      const menuOffset = Slick.Utils.offset(_menuElm);
      let leftPos = (btnOffset && btnOffset.left) || 0;


      // when auto-align is set, it will calculate whether it has enough space in the viewport to show the drop menu on the right (default)
      // if there isn't enough space on the right, it will automatically align the drop menu to the left
      // to simulate an align left, we actually need to know the width of the drop menu
      if (options.autoAlign) {
        const gridPos = _grid.getGridPosition();
        if (leftPos + _menuElm.offsetWidth >= gridPos.width) {
          leftPos = leftPos + buttonElm.clientWidth - _menuElm.clientWidth + (options.autoAlignOffset || 0);
        }
      }

      _menuElm.style.top = `${(buttonElm.clientHeight || (btnOffset && btnOffset.top) || 0) + (options && options.menuOffsetTop || 0)}px`;
      _menuElm.style.left = `${leftPos - menuOffset.left}px`;

      // Mark the header as active to keep the highlighting.
      _activeHeaderColumnElm = _menuElm.closest('.slick-header-column');
      if (_activeHeaderColumnElm) {
        _activeHeaderColumnElm.classList.add('slick-header-column-active');
      }

      if (_self.onAfterMenuShow.notify(callbackArgs, event, _self).getReturnValue() == false) {
        return;
      }

      // Stop propagation so that it doesn't register as a header click event.
      event.preventDefault();
      event.stopPropagation();
    }

    function handleMenuItemClick(item, columnDef, e) {
      const command = item.command || '';

      if (item.disabled || item.divider || item === "divider") {
        return false;
      }

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

      if (!e.defaultPrevented) {
        hideMenu();
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

    Slick.Utils.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "HeaderMenu",
      "setOptions": setOptions,

      "onAfterMenuShow": new Slick.Event(),
      "onBeforeMenuShow": new Slick.Event(),
      "onCommand": new Slick.Event()
    });
  }
})(window);
