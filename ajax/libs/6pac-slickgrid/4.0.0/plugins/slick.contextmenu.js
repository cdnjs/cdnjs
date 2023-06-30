(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "Plugins": {
        "ContextMenu": ContextMenu
      }
    }
  });

  /***
   * A plugin to add Context Menu (mouse right+click), it subscribes to the cell "onContextMenu" event.
   * The "contextMenu" is defined in the Grid Options object
   * You can use it to change a data property (only 1) through a list of Options AND/OR through a list of Commands.
   * A good example of a Command would be an Export to CSV, that can be run from anywhere in the grid by doing a mouse right+click
   *
   * Note:
   *   There is only 1 list of Options, so typically that would be use for 1 column
   *   if you plan to use different Options for different columns, then the CellMenu plugin might be better suited.
   *
   * USAGE:
   *
   * Add the slick.contextmenu.(js|css) files and register it with the grid.
   *
   * To specify a menu in a column header, extend the column definition like so:
   * var contextMenuPlugin = new Slick.Plugins.ContextMenu(columns, grid, options);
   *
   * Available grid options, by defining a contextMenu object:
   *
   *  var options = {
   *    enableCellNavigation: true,
   *    contextMenu: {
   *      optionTitle: 'Change Priority',
   *      optionShownOverColumnIds: ["priority"],
   *      optionItems: [
   *        { option: 0, title: 'none', cssClass: 'italic' },
   *        { divider: true },
   *        "divider" // just the string is also accepted
   *        { option: 1, iconCssClass: 'fa fa-fire grey', title: 'Low' },
   *        { option: 3, iconCssClass: 'fa fa-fire red', title: 'High' },
   *        { option: 2, iconCssClass: 'fa fa-fire orange', title: 'Medium' },
   *        { option: 4, iconCssClass: 'fa fa-fire', title: 'Extreme', disabled: true },
   *      ],
   *      commandTitle: 'Commands',
   *      commandShownOverColumnIds: ["title", "complete", "start", "finish", "effortDriven"],
   *      commandItems: [
   *        { command: 'export-excel', title: 'Export to CSV', iconCssClass: 'fa fa-file-excel-o', cssClass: '' },
   *        { command: 'delete-row', title: 'Delete Row', cssClass: 'bold', textCssClass: 'red' },
   *        { command: 'help', title: 'Help', iconCssClass: 'fa fa-question-circle',},
   *        { divider: true },
   *      ],
   *    }
   *  };
   *
   *
   * Available contextMenu properties:
   *    commandTitle:               Title of the Command section (optional)
   *    commandItems:               Array of Command item objects (command/title pair)
   *    commandShownOverColumnIds:  Define which column to show the Commands list. If not defined (defaults), the menu will be shown over all columns
   *    optionTitle:                Title of the Option section (optional)
   *    optionItems:                Array of Options item objects (option/title pair)
   *    optionShownOverColumnIds:   Define which column to show the Options list. If not defined (defaults), the menu will be shown over all columns
   *    hideCloseButton:            Hide the Close button on top right (defaults to false)
   *    hideCommandSection:         Hide the Commands section even when the commandItems array is filled (defaults to false)
   *    hideMenuOnScroll:           Do we want to hide the Cell Menu when a scrolling event occurs (defaults to false)?
   *    hideOptionSection:          Hide the Options section even when the optionItems array is filled (defaults to false)
   *    maxHeight:                  Maximum height that the drop menu will have, can be a number (250) or text ("none")
   *    width:                      Width that the drop menu will have, can be a number (250) or text (defaults to "auto")
   *    autoAdjustDrop:             Auto-align dropup or dropdown menu to the left or right depending on grid viewport available space (defaults to true)
   *    autoAdjustDropOffset:       Optionally add an offset to the auto-align of the drop menu (defaults to -4)
   *    autoAlignSide:              Auto-align drop menu to the left or right depending on grid viewport available space (defaults to true)
   *    autoAlignSideOffset:        Optionally add an offset to the left/right side auto-align (defaults to 0)
   *    menuUsabilityOverride:      Callback method that user can override the default behavior of enabling/disabling the menu from being usable (must be combined with a custom formatter)
   *
   *
   * Available menu Command/Option item properties:
   *    action:                     Optionally define a callback function that gets executed when item is chosen (and/or use the onCommand event)
   *    command:                    A command identifier to be passed to the onCommand event handlers (when using "commandItems").
   *    option:                     An option to be passed to the onOptionSelected event handlers (when using "optionItems").
   *    title:                      Menu item text.
   *    divider:                    Boolean which tell if the current item is a divider, not an actual command. You could also pass "divider" instead of an object
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
   *            value:        Value of the cell we triggered the context menu from
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
   * @param options {Object} Context Menu Options
   * @class Slick.Plugins.ContextMenu
   * @constructor
   */
  function ContextMenu(optionProperties) {
    let _contextMenuProperties;
    let _currentCell = -1;
    let _currentRow = -1;
    let _grid;
    let _gridOptions;
    let _gridUid = "";
    let _handler = new Slick.EventHandler();
    let _self = this;
    let _optionTitleElm;
    let _commandTitleElm;
    let _menuElm;
    let _bindingEventService = new Slick.BindingEventService();

    let _defaults = {
      autoAdjustDrop: true,     // dropup/dropdown
      autoAlignSide: true,      // left/right
      autoAdjustDropOffset: -4,
      autoAlignSideOffset: 0,
      hideMenuOnScroll: false,
      maxHeight: "none",
      width: "auto",
      optionShownOverColumnIds: [],
      commandShownOverColumnIds: [],
    };

    function init(grid) {
      _grid = grid;
      _gridOptions = grid.getOptions();
      _contextMenuProperties = Slick.Utils.extend({}, _defaults, optionProperties);
      _gridUid = (grid && grid.getUID) ? grid.getUID() : "";
      _handler.subscribe(_grid.onContextMenu, handleOnContextMenu);
      if (_contextMenuProperties.hideMenuOnScroll) {
        _handler.subscribe(_grid.onScroll, destroyMenu);
      }
    }

    function setOptions(newOptions) {
      _contextMenuProperties = Slick.Utils.extend({}, _contextMenuProperties, newOptions);

      // on the array properties, we want to make sure to overwrite them and not just extending them
      if (newOptions.commandShownOverColumnIds) {
        _contextMenuProperties.commandShownOverColumnIds = newOptions.commandShownOverColumnIds;
      }
      if (newOptions.optionShownOverColumnIds) {
        _contextMenuProperties.optionShownOverColumnIds = newOptions.optionShownOverColumnIds;
      }
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
      if (e instanceof Slick.EventData) {
        e = e.getNativeEvent();
      }

      let targetEvent = e.touches ? e.touches[0] : e;
      let cell = _grid.getCellFromEvent(e);
      _currentCell = cell && cell.cell;
      _currentRow = cell && cell.row;
      let columnDef = _grid.getColumns()[_currentCell];
      let dataContext = _grid.getDataItem(_currentRow);

      let isColumnOptionAllowed = checkIsColumnAllowed(_contextMenuProperties.optionShownOverColumnIds, columnDef.id);
      let isColumnCommandAllowed = checkIsColumnAllowed(_contextMenuProperties.commandShownOverColumnIds, columnDef.id);
      let commandItems = _contextMenuProperties.commandItems || [];
      let optionItems = _contextMenuProperties.optionItems || [];

      // make sure there's at least something to show before creating the Context Menu
      if (!columnDef || (!isColumnCommandAllowed && !isColumnOptionAllowed) || (!commandItems.length && !optionItems.length)) {
        return;
      }

      // delete any prior context menu
      destroyMenu(e);

      // Let the user modify the menu or cancel altogether,
      // or provide alternative menu implementation.
      if (_self.onBeforeMenuShow.notify({
        "cell": _currentCell,
        "row": _currentRow,
        "grid": _grid
      }, e, _self).getReturnValue() == false) {
        return;
      }

      // create a new context menu
      let maxHeight = isNaN(_contextMenuProperties.maxHeight) ? _contextMenuProperties.maxHeight : _contextMenuProperties.maxHeight + "px";
      let width = isNaN(_contextMenuProperties.width) ? _contextMenuProperties.width : _contextMenuProperties.width + "px";

      _menuElm = document.createElement('div');
      _menuElm.className = `slick-context-menu ${_gridUid}`;
      _menuElm.role = 'menu';
      _menuElm.style.width = width;
      _menuElm.style.maxHeight = maxHeight;
      _menuElm.style.top = `${targetEvent.pageY}px`;
      _menuElm.style.left = `${targetEvent.pageX}px`;
      _menuElm.style.display = 'none';

      const closeButtonElm = document.createElement('button');
      closeButtonElm.type = 'button';
      closeButtonElm.className = 'close';
      closeButtonElm.dataset.dismiss = 'slick-context-menu';
      closeButtonElm.ariaLabel = 'Close';

      const spanCloseElm = document.createElement('span');
      spanCloseElm.className = 'close';
      spanCloseElm.ariaHidden = 'true';
      spanCloseElm.innerHTML = '&times;';
      closeButtonElm.appendChild(spanCloseElm);

      // -- Option List section
      if (!_contextMenuProperties.hideOptionSection && isColumnOptionAllowed && optionItems.length > 0) {
        const optionMenuElm = document.createElement('div');
        optionMenuElm.className = 'slick-context-menu-option-list';
        optionMenuElm.role = 'menu';

        if (!_contextMenuProperties.hideCloseButton) {
          _bindingEventService.bind(closeButtonElm, 'click', handleCloseButtonClicked);
          _menuElm.appendChild(closeButtonElm);
        }
        _menuElm.appendChild(optionMenuElm)

        populateOptionItems(
          _contextMenuProperties,
          optionMenuElm,
          optionItems,
          { cell: _currentCell, row: _currentRow, column: columnDef, dataContext: dataContext, grid: _grid }
        );
      }

      // -- Command List section
      if (!_contextMenuProperties.hideCommandSection && isColumnCommandAllowed && commandItems.length > 0) {
        const commandMenuElm = document.createElement('div');
        commandMenuElm.className = 'slick-context-menu-command-list';
        commandMenuElm.role = 'menu';

        if (!_contextMenuProperties.hideCloseButton && (!isColumnOptionAllowed || optionItems.length === 0 || _contextMenuProperties.hideOptionSection)) {
          _bindingEventService.bind(closeButtonElm, 'click', handleCloseButtonClicked);
          _menuElm.appendChild(closeButtonElm);
        }

        _menuElm.appendChild(commandMenuElm);
        populateCommandItems(
          _contextMenuProperties,
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
      _menuElm = _menuElm || document.querySelector(".slick-context-menu." + _gridUid);

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

    function checkIsColumnAllowed(columnIds, columnId) {
      let isAllowedColumn = false;

      if (columnIds && columnIds.length > 0) {
        for (let o = 0, ln = columnIds.length; o < ln; o++) {
          if (columnIds[o] === columnId) {
            isAllowedColumn = true;
          }
        }
      } else {
        isAllowedColumn = true;
      }
      return isAllowedColumn;
    }

    function handleOnContextMenu(e, args) {
      if(e instanceof Slick.EventData)
        e = e.getNativeEvent();

      e.preventDefault();

      let cell = _grid.getCellFromEvent(e);
      let columnDef = _grid.getColumns()[cell.cell];
      let dataContext = _grid.getDataItem(cell.row);

      // run the override function (when defined), if the result is false it won't go further
      if (!args) {
        args = {};
      }
      args.cell = cell.cell;
      args.row = cell.row;
      args.columnDef = columnDef;
      args.dataContext = dataContext;
      args.grid = _grid;

      if (!runOverrideFunctionWhenExists(_contextMenuProperties.menuUsabilityOverride, args)) {
        return;
      }

      // create the DOM element
      _menuElm = createMenu(e, args);

      // reposition the menu to where the user clicked
      if (_menuElm) {
        repositionMenu(e);
        _menuElm.style.display = 'block';
      }

      _bindingEventService.bind(document.body, 'click', (e) => {
        if (!e.defaultPrevented) {
          destroyMenu(e, { cell: _currentCell, row: _currentRow });
        }
      });
    }

    /** Construct the Option Items section. */
    function populateOptionItems(contextMenu, optionMenuElm, optionItems, args) {
      if (!args || !optionItems || !contextMenu) {
        return;
      }

      // user could pass a title on top of the Options section
      if (contextMenu && contextMenu.optionTitle) {
        _optionTitleElm = document.createElement('div');
        _optionTitleElm.className = 'title';
        _optionTitleElm.textContent = contextMenu.optionTitle;
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
        liElm.className = 'slick-context-menu-item';
        liElm.role = 'menuitem';

        if (item.divider || item === "divider") {
          liElm.classList.add("slick-context-menu-item-divider");
          addClickListener = false;
        }

        // if the item is disabled then add the disabled css class
        if (item.disabled || !isItemUsable) {
          liElm.classList.add("slick-context-menu-item-disabled");
        }

        // if the item is hidden then add the hidden css class
        if (item.hidden) {
          liElm.classList.add("slick-context-menu-item-hidden");
        }

        if (item.cssClass) {
          liElm.classList.add(item.cssClass);
        }

        if (item.tooltip) {
          liElm.title = item.tooltip;
        }

        const iconElm = document.createElement('div');
        iconElm.role = 'button';
        iconElm.className = 'slick-context-menu-icon';

        liElm.appendChild(iconElm);

        if (item.iconCssClass) {
          iconElm.classList.add(item.iconCssClass);
        }

        if (item.iconImage) {
          iconElm.style.backgroundImage = "url(" + item.iconImage + ")";
        }

        const textElm = document.createElement('span');
        textElm.className = 'slick-context-menu-content';
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
    function populateCommandItems(contextMenu, commandMenuElm, commandItems, args) {
      if (!args || !commandItems || !contextMenu) {
        return;
      }

      // user could pass a title on top of the Commands section
      if (contextMenu && contextMenu.commandTitle) {
        _commandTitleElm = document.createElement('div');
        _commandTitleElm.className = 'title';
        _commandTitleElm.textContent = contextMenu.commandTitle;
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
        liElm.className = 'slick-context-menu-item';
        liElm.role = 'menuitem';

        if (item.divider || item === "divider") {
          liElm.classList.add("slick-context-menu-item-divider");
          addClickListener = false;
        }

        // if the item is disabled then add the disabled css class
        if (item.disabled || !isItemUsable) {
          liElm.classList.add("slick-context-menu-item-disabled");
        }

        // if the item is hidden then add the hidden css class
        if (item.hidden) {
          liElm.classList.add("slick-context-menu-item-hidden");
        }

        if (item.cssClass) {
          liElm.classList.add(item.cssClass);
        }

        if (item.tooltip) {
          liElm.title = item.tooltip;
        }

        const iconElm = document.createElement('div');
        iconElm.className = 'slick-context-menu-icon';

        liElm.appendChild(iconElm);

        if (item.iconCssClass) {
          iconElm.classList.add(item.iconCssClass);
        }

        if (item.iconImage) {
          iconElm.style.backgroundImage = "url(" + item.iconImage + ")";
        }

        const textElm = document.createElement('span');
        textElm.className = 'slick-context-menu-content';
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
      if (!item || item.disabled || item.divider) {
        return;
      }

      const command = item.command || '';
      const row = _currentRow;
      const cell = _currentCell;
      let columnDef = _grid.getColumns()[cell];
      let dataContext = _grid.getDataItem(row);
      let cellValue;

      if (Object.prototype.hasOwnProperty.call(dataContext, columnDef && columnDef.field)) {
        cellValue = dataContext[columnDef.field];
      }

      if (command != null && command !== "") {
        // user could execute a callback through 2 ways
        // via the onCommand event and/or an action callback
        let callbackArgs = {
          "cell": cell,
          "row": row,
          "grid": _grid,
          "command": command,
          "item": item,
          "column": columnDef,
          "dataContext": dataContext,
          "value": cellValue
        };
        _self.onCommand.notify(callbackArgs, e, _self);

        // execute action callback when defined
        if (typeof item.action === "function") {
          item.action.call(this, e, callbackArgs);
        }
      }
    }

    function handleMenuItemOptionClick(item, e) {
      if (item.disabled || item.divider) {
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
        let callbackArgs = {
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
      }
    }

    /**
     * Reposition the menu drop (up/down) and the side (left/right)
     * @param {*} event
     */
    function repositionMenu(e) {
      const targetEvent = e.touches ? e.touches[0] : e;
      const parentElm = e.target.closest(".slick-cell");
      let menuOffsetLeft = targetEvent.pageX;
      let menuOffsetTop = parentElm ? Slick.Utils.offset(parentElm).top : targetEvent.pageY;
      const menuHeight = _menuElm && _menuElm.offsetHeight || 0;
      const menuWidth = _menuElm && _menuElm.offsetWidth || _contextMenuProperties.width || 0;
      let rowHeight = _gridOptions.rowHeight;
      let dropOffset = _contextMenuProperties.autoAdjustDropOffset;
      let sideOffset = _contextMenuProperties.autoAlignSideOffset;

      // if autoAdjustDrop is enable, we first need to see what position the drop will be located
      // without necessary toggling it's position just yet, we just want to know the future position for calculation
      if (_contextMenuProperties.autoAdjustDrop) {
        // since we reposition menu below slick cell, we need to take it in consideration and do our calculation from that element
        let spaceBottom = Slick.Utils.calculateAvailableSpace(parentElm).bottom;
        let spaceTop = Slick.Utils.calculateAvailableSpace(parentElm).top;
        let spaceBottomRemaining = spaceBottom + dropOffset - rowHeight;
        let spaceTopRemaining = spaceTop - dropOffset + rowHeight;
        let dropPosition = (spaceBottomRemaining < menuHeight && spaceTopRemaining > spaceBottomRemaining) ? 'top' : 'bottom';
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
      // if there isn't enough space on the right, it will automatically align the drop menu to the left
      // to simulate an align left, we actually need to know the width of the drop menu
      if (_contextMenuProperties.autoAlignSide) {
        let gridPos = _grid.getGridPosition();
        let dropSide = ((menuOffsetLeft + menuWidth) >= gridPos.width) ? 'left' : 'right';
        if (dropSide === 'left') {
          _menuElm.classList.remove('dropright');
          _menuElm.classList.add('dropleft');
          menuOffsetLeft = (menuOffsetLeft - menuWidth - sideOffset);
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
      "pluginName": "ContextMenu",
      "setOptions": setOptions,

      "onAfterMenuShow": new Slick.Event(),
      "onBeforeMenuShow": new Slick.Event(),
      "onBeforeMenuClose": new Slick.Event(),
      "onCommand": new Slick.Event(),
      "onOptionSelected": new Slick.Event()
    });
  }
})(window);
