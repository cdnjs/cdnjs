(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "Plugins": {
        "CellMenu": CellMenu
      }
    }
  });

  /***
   * A plugin to add Menu on a Cell click (click on the cell that has the cellMenu object defined)
   * The "cellMenu" is defined in a Column Definition object
   * Similar to the ContextMenu plugin (could be used in combo),
   * except that it subscribes to the cell "onClick" event (regular mouse click or touch).
   *
   * A general use of this plugin is for an Action Dropdown Menu to do certain things on the row that was clicked
   * You can use it to change the cell data property through a list of Options AND/OR through a list of Commands.
   *
   * USAGE:
   *
   * Add the slick.cellMenu.(js|css) files and register it with the grid.
   *
   * To specify a menu in a column header, extend the column definition like so:
   * var cellMenuPlugin = new Slick.Plugins.CellMenu(columns, grid, options);
   *
   * Available cellMenu options, by defining a cellMenu object:
   *
   *  var columns = [
   *    {
   *      id: "action", name: "Action", field: "action", formatter: fakeButtonFormatter,
   *      cellMenu: {
   *        optionTitle: "Change Effort Driven",
   *        optionItems: [
   *          { option: true, title: "True", iconCssClass: 'checkmark' },
   *          { option: false, title: "False" }
   *        ],
   *        commandTitle: "Commands",
   *        commandItems: [
   *          { command: "delete-row", title: "Delete Row", iconImage: "../images/delete.png", cssClass: 'bold', textCssClass: "red" },
   *          { divider: true },
   *          "divider" // you can pass "divider" as a string or an object
   *          { command: "help", title: "Help", iconCssClass: "icon-help" },
   *          { command: "help", title: "Disabled Command", disabled: true },
   *        ],
   *      }
   *    }
   *  ];
   *
   *
   * Available cellMenu properties:
   *    commandTitle:               Title of the Command section (optional)
   *    commandItems:               Array of Command item objects (command/title pair)
   *    optionTitle:                Title of the Option section (optional)
   *    optionItems:                Array of Options item objects (option/title pair)
   *    hideCloseButton:            Hide the Close button on top right (defaults to false)
   *    hideCommandSection:         Hide the Commands section even when the commandItems array is filled (defaults to false)
   *    hideMenuOnScroll:           Do we want to hide the Cell Menu when a scrolling event occurs (defaults to true)?
   *    hideOptionSection:          Hide the Options section even when the optionItems array is filled (defaults to false)
   *    maxHeight:                  Maximum height that the drop menu will have, can be a number (250) or text ("none")
   *    width:                      Width that the drop menu will have, can be a number (250) or text (defaults to "auto")
   *    autoAdjustDrop:             Auto-align dropup or dropdown menu to the left or right depending on grid viewport available space (defaults to true)
   *    autoAdjustDropOffset:       Optionally add an offset to the auto-align of the drop menu (defaults to 0)
   *    autoAlignSide:              Auto-align drop menu to the left or right depending on grid viewport available space (defaults to true)
   *    autoAlignSideOffset:        Optionally add an offset to the left/right side auto-align (defaults to 0)
   *    menuUsabilityOverride:      Callback method that user can override the default behavior of enabling/disabling the menu from being usable (must be combined with a custom formatter)
   *
   *
   * Available menu Command/Option item properties:
   *    action:                     Optionally define a callback function that gets executed when item is chosen (and/or use the onCommand event)
   *    command:                    A command identifier to be passed to the onCommand event handlers (when using "commandItems").
   *    option:                     An option to be passed to the onOptionSelected event handlers (when using "optionItems").
   *    title:                      Menu item text label.
   *    divider:                    Boolean which tells if the current item is a divider, not an actual command. You could also pass "divider" instead of an object
   *    disabled:                   Whether the item/command is disabled.
   *    hidden:                     Whether the item/command is hidden.
   *    tooltip:                    Item tooltip.
   *    cssClass:                   A CSS class to be added to the menu item container.
   *    iconCssClass:               A CSS class to be added to the menu item icon.
   *    textCssClass:               A CSS class to be added to the menu item text.
   *    iconImage:                  A url to the icon image.
   *    itemVisibilityOverride:     Callback method that user can override the default behavior of showing/hiding an item from the list
   *    itemUsabilityOverride:      Callback method that user can override the default behavior of enabling/disabling an item from the list
   *
   *
   * The plugin exposes the following events:
   *
   *    onAfterMenuShow: Fired after the menu is shown.  You can customize the menu or dismiss it by returning false.
   *        Event args:
   *            cell:         Cell or column index
   *            row:          Row index
   *            grid:         Reference to the grid.
   *
   *    onBeforeMenuShow: Fired before the menu is shown.  You can customize the menu or dismiss it by returning false.
   *        Event args:
   *            cell:         Cell or column index
   *            row:          Row index
   *            grid:         Reference to the grid.
   *
   *    onBeforeMenuClose: Fired when the menu is closing.
   *        Event args:
   *            cell:         Cell or column index
   *            row:          Row index
   *            grid:         Reference to the grid.
   *            menu:         Menu DOM element
   *
   *    onCommand: Fired on menu option clicked from the Command items list
   *        Event args:
   *            cell:         Cell or column index
   *            row:          Row index
   *            grid:         Reference to the grid.
   *            command:      Menu command identified.
   *            item:         Menu item selected
   *            column:    Cell Column definition
   *            dataContext:  Cell Data Context (data object)
   *
   *    onOptionSelected: Fired on menu option clicked from the Option items list
   *        Event args:
   *            cell:         Cell or column index
   *            row:          Row index
   *            grid:         Reference to the grid.
   *            option:       Menu option selected.
   *            item:         Menu item selected
   *            column:    Cell Column definition
   *            dataContext:  Cell Data Context (data object)
   *
   *
   * @param options {Object} Cell Menu Options
   * @class Slick.Plugins.CellMenu
   * @constructor
   */
  function CellMenu(optionProperties) {
    let _cellMenuProperties;
    let _currentCell = -1;
    let _currentRow = -1;
    let _grid;
    let _gridOptions;
    let _gridUid = "";
    let _handler = new Slick.EventHandler();
    let _self = this;
    let _commandTitleElm;
    let _optionTitleElm;
    let _menuElm;
    let _bindingEventService = new Slick.BindingEventService();

    let _defaults = {
      autoAdjustDrop: true,     // dropup/dropdown
      autoAlignSide: true,      // left/right
      autoAdjustDropOffset: 0,
      autoAlignSideOffset: 0,
      hideMenuOnScroll: true,
      maxHeight: "none",
      width: "auto",
    };

    function init(grid) {
      _grid = grid;
      _gridOptions = grid.getOptions();
      _cellMenuProperties = Slick.Utils.extend({}, _defaults, optionProperties);
      _gridUid = (grid && grid.getUID) ? grid.getUID() : "";
      _handler.subscribe(_grid.onClick, handleCellClick);
      if (_cellMenuProperties.hideMenuOnScroll) {
        _handler.subscribe(_grid.onScroll, destroyMenu);
      }
    }

    function setOptions(newOptions) {
      _cellMenuProperties = Slick.Utils.extend({}, _cellMenuProperties, newOptions);
    }

    function destroy() {
      _self.onAfterMenuShow.unsubscribe();
      _self.onBeforeMenuShow.unsubscribe();
      _self.onBeforeMenuClose.unsubscribe();
      _self.onCommand.unsubscribe();
      _self.onOptionSelected.unsubscribe();
      _handler.unsubscribeAll();
      _bindingEventService.unbindAll();

      if (_menuElm && _menuElm.remove) {
        _menuElm.remove();
      }
      _commandTitleElm = null;
      _optionTitleElm = null;
      _menuElm = null;
    }

    function createMenu(e) {
      let cell = _grid.getCellFromEvent(e);
      _currentCell = cell && cell.cell;
      _currentRow = cell && cell.row;
      let columnDef = _grid.getColumns()[_currentCell];
      let dataContext = _grid.getDataItem(_currentRow);

      let commandItems = _cellMenuProperties.commandItems || [];
      let optionItems = _cellMenuProperties.optionItems || [];

      // make sure there's at least something to show before creating the Cell Menu
      if (!columnDef || !columnDef.cellMenu || (!commandItems.length && !optionItems.length)) {
        return;
      }

      // delete any prior Cell Menu
      destroyMenu();

      // Let the user modify the menu or cancel altogether,
      // or provide alternative menu implementation.
      if (_self.onBeforeMenuShow.notify({
        "cell": _currentCell,
        "row": _currentRow,
        "grid": _grid
      }, e, _self).getReturnValue() == false) {
        return;
      }

      // create a new cell menu
      let maxHeight = isNaN(_cellMenuProperties.maxHeight) ? _cellMenuProperties.maxHeight : _cellMenuProperties.maxHeight + "px";
      let width = isNaN(_cellMenuProperties.width) ? _cellMenuProperties.width : _cellMenuProperties.width + "px";

      _menuElm = document.createElement('div');
      _menuElm.className = `slick-cell-menu ${_gridUid}`;
      _menuElm.role = 'menu';
      _menuElm.style.width = width;
      _menuElm.style.maxHeight = maxHeight;
      _menuElm.style.top = `${e.pageY + 5}px`;
      _menuElm.style.left = `${e.pageX}px`;
      _menuElm.style.display = 'none';

      const closeButtonElm = document.createElement('button');
      closeButtonElm.type = 'button';
      closeButtonElm.className = 'close';
      closeButtonElm.dataset.dismiss = 'slick-cell-menu';
      closeButtonElm.ariaLabel = 'Close';

      const spanCloseElm = document.createElement('span');
      spanCloseElm.className = 'close';
      spanCloseElm.ariaHidden = 'true';
      spanCloseElm.innerHTML = '&times;';
      closeButtonElm.appendChild(spanCloseElm);

      // -- Option List section
      if (!_cellMenuProperties.hideOptionSection && optionItems.length > 0) {
        const optionMenuElm = document.createElement('div');
        optionMenuElm.className = 'slick-cell-menu-option-list';
        optionMenuElm.role = 'menu';

        if (!_cellMenuProperties.hideCloseButton) {
          _bindingEventService.bind(closeButtonElm, 'click', handleCloseButtonClicked);
          _menuElm.appendChild(closeButtonElm);
        }
        _menuElm.appendChild(optionMenuElm)

        populateOptionItems(
          _cellMenuProperties,
          optionMenuElm,
          optionItems,
          { cell: _currentCell, row: _currentRow, column: columnDef, dataContext: dataContext, grid: _grid }
        );
      }

      // -- Command List section
      if (!_cellMenuProperties.hideCommandSection && commandItems.length > 0) {
        const commandMenuElm = document.createElement('div');
        commandMenuElm.className = 'slick-cell-menu-command-list';
        commandMenuElm.role = 'menu';

        if (!_cellMenuProperties.hideCloseButton && (optionItems.length === 0 || _cellMenuProperties.hideOptionSection)) {
          _bindingEventService.bind(closeButtonElm, 'click', handleCloseButtonClicked);
          _menuElm.appendChild(closeButtonElm);
        }

        _menuElm.appendChild(commandMenuElm);
        populateCommandItems(
          _cellMenuProperties,
          commandMenuElm,
          commandItems,
          { cell: _currentCell, row: _currentRow, column: columnDef, dataContext: dataContext, grid: _grid }
        );
      }

      _menuElm.style.display = 'block';
      document.body.appendChild(_menuElm);

      if (_self.onAfterMenuShow.notify({
        "cell": _currentCell,
        "row": _currentRow,
        "grid": _grid
      }, e, _self).getReturnValue() == false) {
        return;
      }

      return _menuElm;
    }

    function handleCloseButtonClicked(e) {
      if (!e.defaultPrevented) {
        destroyMenu(e);
      }
    }

    function destroyMenu(e, args) {
      _menuElm = _menuElm || document.querySelector(".slick-cell-menu." + _gridUid);

      if (_menuElm && _menuElm.remove) {
        if (_self.onBeforeMenuClose.notify({
          "cell": args && args.cell,
          "row": args && args.row,
          "grid": _grid,
          "menu": _menuElm
        }, e, _self).getReturnValue() == false) {
          return;
        }
        _menuElm.remove();
        _menuElm = null;
      }
    }

    /**
     * Reposition the menu drop (up/down) and the side (left/right)
     * @param {*} event
     */
    function repositionMenu(e) {
      const parentElm = e.target.closest('.slick-cell');
      const parentOffset = parentElm && Slick.Utils.offset(parentElm);
      let menuOffsetLeft = parentElm ? parentOffset.left : e.pageX;
      let menuOffsetTop = parentElm ? parentOffset.top : e.pageY;
      const parentCellWidth = parentElm.offsetWidth || 0;
      const menuHeight = _menuElm && _menuElm.offsetHeight || 0;
      const menuWidth = _menuElm && _menuElm.offsetWidth || _cellMenuProperties.width || 0;
      const rowHeight = _gridOptions.rowHeight;
      const dropOffset = _cellMenuProperties.autoAdjustDropOffset;
      const sideOffset = _cellMenuProperties.autoAlignSideOffset;

      // if autoAdjustDrop is enable, we first need to see what position the drop will be located (defaults to bottom)
      // without necessary toggling it's position just yet, we just want to know the future position for calculation
      if (_cellMenuProperties.autoAdjustDrop) {
        // since we reposition menu below slick cell, we need to take it in consideration and do our calculation from that element
        const spaceBottom = Slick.Utils.calculateAvailableSpace(parentElm).bottom;
        const spaceTop = Slick.Utils.calculateAvailableSpace(parentElm).top;
        const spaceBottomRemaining = spaceBottom + dropOffset - rowHeight;
        const spaceTopRemaining = spaceTop - dropOffset + rowHeight;
        const dropPosition = (spaceBottomRemaining < menuHeight && spaceTopRemaining > spaceBottomRemaining) ? 'top' : 'bottom';
        if (dropPosition === 'top') {
          _menuElm.classList.remove('dropdown');
          _menuElm.classList.add('dropup');
          menuOffsetTop = menuOffsetTop - menuHeight - dropOffset;
        } else {
          _menuElm.classList.remove('dropup');
          _menuElm.classList.add('dropdown');
          menuOffsetTop = menuOffsetTop + rowHeight + dropOffset;
        }
      }

      // when auto-align is set, it will calculate whether it has enough space in the viewport to show the drop menu on the right (default)
      // if there isn't enough space on the right, it will automatically align the drop menu to the left (defaults to the right)
      // to simulate an align left, we actually need to know the width of the drop menu
      if (_cellMenuProperties.autoAlignSide) {
        let gridPos = _grid.getGridPosition();
        let dropSide = ((menuOffsetLeft + menuWidth) >= gridPos.width) ? 'left' : 'right';
        if (dropSide === 'left') {
          _menuElm.classList.remove('dropright');
          _menuElm.classList.add('dropleft');
          menuOffsetLeft = (menuOffsetLeft - (menuWidth - parentCellWidth) - sideOffset);
        } else {
          _menuElm.classList.remove('dropleft');
          _menuElm.classList.add('dropright');
          menuOffsetLeft = menuOffsetLeft + sideOffset;
        }
      }

      // ready to reposition the menu
      _menuElm.style.top = `${menuOffsetTop}px`;
      _menuElm.style.left = `${menuOffsetLeft}px`;
    }

    function handleCellClick(e, args) {
      if(e instanceof Slick.EventData)
        e = e.getNativeEvent();

      let cell = _grid.getCellFromEvent(e);
      let dataContext = _grid.getDataItem(cell.row);
      let columnDef = _grid.getColumns()[cell.cell];

      // prevent event from bubbling but only on column that has a cell menu defined
      if (columnDef && columnDef.cellMenu) {
        e.preventDefault();
      }

      // merge the cellMenu of the column definition with the default properties
      _cellMenuProperties = Slick.Utils.extend({}, _cellMenuProperties, columnDef.cellMenu);

      // run the override function (when defined), if the result is false it won't go further
      if (!args) {
        args = {};
      }
      args.columnDef = columnDef;
      args.dataContext = dataContext;
      args.grid = _grid;
      if (!runOverrideFunctionWhenExists(_cellMenuProperties.menuUsabilityOverride, args)) {
        return;
      }

      // create the DOM element
      _menuElm = createMenu(e, args);

      // reposition the menu to where the user clicked
      if (_menuElm) {
        repositionMenu(e);
        _menuElm.setAttribute('aria-expanded', 'true');
        _menuElm.style.display = 'block';
      }

      // Hide the menu on outside click.
      _bindingEventService.bind(document.body, 'mousedown', handleBodyMouseDown.bind(this));
    }

    function handleBodyMouseDown(e) {
      if (_menuElm != e.target && !(_menuElm && _menuElm.contains(e.target))) {
        if (!e.defaultPrevented) {
          closeMenu(e, { cell: _currentCell, row: _currentRow });
        }
      }
    }

    function closeMenu(e, args) {
      if (_menuElm) {
        if (_self.onBeforeMenuClose.notify({
          "cell": args && args.cell,
          "row": args && args.row,
          "grid": _grid,
          "menu": _menuElm
        }, e, _self).getReturnValue() == false) {
          return;
        }
        if (_menuElm && _menuElm.remove) {
          _menuElm.remove();
          _menuElm = null;
        }
      }
    }

    /** Construct the Option Items section. */
    function populateOptionItems(cellMenu, optionMenuElm, optionItems, args) {
      if (!args || !optionItems || !cellMenu) {
        return;
      }

      // user could pass a title on top of the Options section
      if (cellMenu && cellMenu.optionTitle) {
        _optionTitleElm = document.createElement('div');
        _optionTitleElm.className = 'title';
        _optionTitleElm.textContent = cellMenu.optionTitle;
        optionMenuElm.appendChild(_optionTitleElm);
      }

      for (let i = 0, ln = optionItems.length; i < ln; i++) {
        let addClickListener = true;
        let item = optionItems[i];

        // run each override functions to know if the item is visible and usable
        let isItemVisible = runOverrideFunctionWhenExists(item.itemVisibilityOverride, args);
        let isItemUsable = runOverrideFunctionWhenExists(item.itemUsabilityOverride, args);

        // if the result is not visible then there's no need to go further
        if (!isItemVisible) {
          continue;
        }

        // when the override is defined, we need to use its result to update the disabled property
        // so that "handleMenuItemOptionClick" has the correct flag and won't trigger an option clicked event
        if (Object.prototype.hasOwnProperty.call(item, "itemUsabilityOverride")) {
          item.disabled = isItemUsable ? false : true;
        }

        const liElm = document.createElement('div');
        liElm.className = 'slick-cell-menu-item';
        liElm.role = 'menuitem';

        if (item.divider || item === "divider") {
          liElm.classList.add("slick-cell-menu-item-divider");
          addClickListener = false;
        }

        // if the item is disabled then add the disabled css class
        if (item.disabled || !isItemUsable) {
          liElm.classList.add("slick-cell-menu-item-disabled");
        }

        // if the item is hidden then add the hidden css class
        if (item.hidden) {
          liElm.classList.add("slick-cell-menu-item-hidden");
        }

        if (item.cssClass) {
          liElm.classList.add(item.cssClass);
        }

        if (item.tooltip) {
          liElm.title = item.tooltip;
        }

        const iconElm = document.createElement('div');
        iconElm.className = 'slick-cell-menu-icon';

        liElm.appendChild(iconElm);

        if (item.iconCssClass) {
          iconElm.classList.add(item.iconCssClass);
        }

        if (item.iconImage) {
          iconElm.style.backgroundImage = "url(" + item.iconImage + ")";
        }

        const textElm = document.createElement('span');
        textElm.className = 'slick-cell-menu-content';
        textElm.textContent = item.title;

        liElm.appendChild(textElm);

        if (item.textCssClass) {
          textElm.classList.add(item.textCssClass);
        }

        optionMenuElm.appendChild(liElm);

        if (addClickListener) {
          _bindingEventService.bind(liElm, 'click', handleMenuItemOptionClick.bind(this, item));
        }
      }
    }

    /** Construct the Command Items section. */
    function populateCommandItems(cellMenu, commandMenuElm, commandItems, args) {
      if (!args || !commandItems || !cellMenu) {
        return;
      }

      // user could pass a title on top of the Commands section
      if (cellMenu && cellMenu.commandTitle) {
        _commandTitleElm = document.createElement('div');
        _commandTitleElm.className = 'title';
        _commandTitleElm.textContent = cellMenu.commandTitle;
        commandMenuElm.appendChild(_commandTitleElm);
      }

      for (let i = 0, ln = commandItems.length; i < ln; i++) {
        let addClickListener = true;
        let item = commandItems[i];

        // run each override functions to know if the item is visible and usable
        let isItemVisible = runOverrideFunctionWhenExists(item.itemVisibilityOverride, args);
        let isItemUsable = runOverrideFunctionWhenExists(item.itemUsabilityOverride, args);

        // if the result is not visible then there's no need to go further
        if (!isItemVisible) {
          continue;
        }

        // when the override is defined, we need to use its result to update the disabled property
        // so that "handleMenuItemCommandClick" has the correct flag and won't trigger a command clicked event
        if (Object.prototype.hasOwnProperty.call(item, "itemUsabilityOverride")) {
          item.disabled = isItemUsable ? false : true;
        }

        const liElm = document.createElement('div');
        liElm.className = 'slick-cell-menu-item';
        liElm.role = 'menuitem';

        if (item.divider || item === "divider") {
          liElm.classList.add("slick-cell-menu-item-divider");
          addClickListener = false;
        }

        // if the item is disabled then add the disabled css class
        if (item.disabled || !isItemUsable) {
          liElm.classList.add("slick-cell-menu-item-disabled");
        }

        // if the item is hidden then add the hidden css class
        if (item.hidden) {
          liElm.classList.add("slick-cell-menu-item-hidden");
        }

        if (item.cssClass) {
          liElm.classList.add(item.cssClass);
        }

        if (item.tooltip) {
          liElm.title = item.tooltip;
        }

        const iconElm = document.createElement('div');
        iconElm.className = 'slick-cell-menu-icon';

        liElm.appendChild(iconElm);

        if (item.iconCssClass) {
          iconElm.classList.add(item.iconCssClass);
        }

        if (item.iconImage) {
          iconElm.style.backgroundImage = "url(" + item.iconImage + ")";
        }

        const textElm = document.createElement('span');
        textElm.className = 'slick-cell-menu-content';
        textElm.textContent = item.title;

        liElm.appendChild(textElm);

        if (item.textCssClass) {
          textElm.classList.add(item.textCssClass);
        }

        commandMenuElm.appendChild(liElm);

        if (addClickListener) {
          _bindingEventService.bind(liElm, 'click', handleMenuItemCommandClick.bind(this, item));
        }
      }
    }

    function handleMenuItemCommandClick(item, e) {
      if (!item || item.disabled || item.divider || item === "divider") {
        return;
      }

      const command = item.command || '';
      const row = _currentRow;
      const cell = _currentCell;
      let columnDef = _grid.getColumns()[cell];
      let dataContext = _grid.getDataItem(row);

      if (command !== null && command !== "") {
        // user could execute a callback through 2 ways
        // via the onCommand event and/or an action callback
        let callbackArgs = {
          "cell": cell,
          "row": row,
          "grid": _grid,
          "command": command,
          "item": item,
          "column": columnDef,
          "dataContext": dataContext
        };
        _self.onCommand.notify(callbackArgs, e, _self);

        // execute action callback when defined
        if (typeof item.action === "function") {
          item.action.call(this, e, callbackArgs);
        }

        if (!e.defaultPrevented) {
          closeMenu(e, { cell: cell, row: row });
        }
      }
    }

    function handleMenuItemOptionClick(item, e) {
      if (!item || item.disabled || item.divider || item === "divider") {
        return;
      }
      if (!_grid.getEditorLock().commitCurrentEdit()) {
        return;
      }

      const option = item.option !== undefined ? item.option : '';
      const row = _currentRow;
      const cell = _currentCell;
      const columnDef = _grid.getColumns()[cell];
      const dataContext = _grid.getDataItem(row);

      if (option !== undefined) {
        // user could execute a callback through 2 ways
        // via the onOptionSelected event and/or an action callback
        const callbackArgs = {
          "cell": cell,
          "row": row,
          "grid": _grid,
          "option": option,
          "item": item,
          "column": columnDef,
          "dataContext": dataContext
        };
        _self.onOptionSelected.notify(callbackArgs, e, _self);

        // execute action callback when defined
        if (typeof item.action === "function") {
          item.action.call(this, e, callbackArgs);
        }

        if (!e.defaultPrevented) {
          closeMenu(e, { cell: cell, row: row });
        }
      }
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
      "closeMenu": destroyMenu,
      "destroy": destroy,
      "pluginName": "CellMenu",
      "setOptions": setOptions,

      "onAfterMenuShow": new Slick.Event(),
      "onBeforeMenuShow": new Slick.Event(),
      "onBeforeMenuClose": new Slick.Event(),
      "onCommand": new Slick.Event(),
      "onOptionSelected": new Slick.Event()
    });
  }
})(window);
