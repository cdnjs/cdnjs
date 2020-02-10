(function ($) {
  // register namespace
  $.extend(true, window, {
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
   *    disabled:                   Whether the item is disabled.
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
    var _contextMenuProperties;
    var _currentCell = -1;
    var _currentRow = -1;
    var _grid;
    var _gridOptions;
    var _gridUid = "";
    var _handler = new Slick.EventHandler();
    var _self = this;
    var $optionTitleElm;
    var $commandTitleElm;
    var $menu;

    var _defaults = {
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
      _contextMenuProperties = $.extend({}, _defaults, optionProperties);
      _gridUid = (grid && grid.getUID) ? grid.getUID() : "";
      _handler.subscribe(_grid.onContextMenu, handleOnContextMenu);
      if (_contextMenuProperties.hideMenuOnScroll) {
        _handler.subscribe(_grid.onScroll, destroyMenu);
      }
    }

    function setOptions(newOptions) {
      _contextMenuProperties = $.extend({}, _contextMenuProperties, newOptions);

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
      if ($menu && $menu.remove) {
        $menu.remove();
      }
    }

    function createMenu(e) {
      var cell = _grid.getCellFromEvent(e);
      _currentCell = cell && cell.cell;
      _currentRow = cell && cell.row;
      var columnDef = _grid.getColumns()[_currentCell];
      var dataContext = _grid.getDataItem(_currentRow);

      var isColumnOptionAllowed = checkIsColumnAllowed(_contextMenuProperties.optionShownOverColumnIds, columnDef.id);
      var isColumnCommandAllowed = checkIsColumnAllowed(_contextMenuProperties.commandShownOverColumnIds, columnDef.id);
      var commandItems = _contextMenuProperties.commandItems || [];
      var optionItems = _contextMenuProperties.optionItems || [];

      // make sure there's at least something to show before creating the Context Menu
      if (!columnDef || (!isColumnCommandAllowed && !isColumnOptionAllowed) || (!commandItems.length && optionItems.length)) {
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
      }, e, _self) == false) {
        return;
      }

      // create a new context menu
      var maxHeight = isNaN(_contextMenuProperties.maxHeight) ? _contextMenuProperties.maxHeight : _contextMenuProperties.maxHeight + "px";
      var width = isNaN(_contextMenuProperties.width) ? _contextMenuProperties.width : _contextMenuProperties.width + "px";
      var menuStyle = "width: " + width + "; max-height: " + maxHeight;
      var menu = $('<div class="slick-context-menu ' + _gridUid + '" style="' + menuStyle + '" />')
        .css("top", e.pageY)
        .css("left", e.pageX)
        .css("display", "none");

      var closeButtonHtml = '<button type="button" class="close" data-dismiss="slick-context-menu" aria-label="Close">'
        + '<span class="close" aria-hidden="true">&times;</span></button>';

      // -- Option List section
      if (!_contextMenuProperties.hideOptionSection && isColumnOptionAllowed && optionItems.length > 0) {
        var $optionMenu = $('<div class="slick-context-menu-option-list" />');
        if (!_contextMenuProperties.hideCloseButton) {
          $(closeButtonHtml).on("click", destroyMenu).appendTo(menu);
        }
        $optionMenu.appendTo(menu);
        populateOptionItems(
          _contextMenuProperties,
          $optionMenu,
          optionItems,
          { cell: _currentCell, row: _currentRow, column: columnDef, dataContext: dataContext, grid: _grid }
        );
      }

      // -- Command List section
      if (!_contextMenuProperties.hideCommandSection && isColumnCommandAllowed && commandItems.length > 0) {
        var $commandMenu = $('<div class="slick-context-menu-command-list" />');
        if (!_contextMenuProperties.hideCloseButton && (!isColumnOptionAllowed || optionItems.length === 0 || _contextMenuProperties.hideOptionSection)) {
          $(closeButtonHtml).on("click", destroyMenu).appendTo(menu);
        }
        $commandMenu.appendTo(menu);
        populateCommandItems(
          _contextMenuProperties,
          $commandMenu,
          commandItems,
          { cell: _currentCell, row: _currentRow, column: columnDef, dataContext: dataContext, grid: _grid }
        );
      }

      menu.show();
      menu.appendTo("body");

      if (_self.onAfterMenuShow.notify({
        "cell": _currentCell,
        "row": _currentRow,
        "grid": _grid
      }, e, _self) == false) {
        return;
      }

      return menu;
    }

    function destroyMenu(e, args) {
      $menu = $menu || $(".slick-context-menu." + _gridUid);

      if ($menu && $menu.length > 0) {
        if (_self.onBeforeMenuClose.notify({
          "cell": args && args.cell,
          "row": args && args.row,
          "grid": _grid,
          "menu": $menu
        }, e, _self) == false) {
          return;
        }
        if ($menu && $menu.remove) {
          $menu.remove();
          $menu = null;
        }
      }
    }

    function checkIsColumnAllowed(columnIds, columnId) {
      var isAllowedColumn = false;

      if (columnIds && columnIds.length > 0) {
        for (var o = 0, ln = columnIds.length; o < ln; o++) {
          if (columnIds[o] === columnId) {
            isAllowedColumn = true;
          }
        }
      } else {
        isAllowedColumn = true;
      }
      return isAllowedColumn;
    }

    function calculateAvailableSpaceBottom(element) {
      var windowHeight = $(window).innerHeight() || 0;
      var pageScroll = $(window).scrollTop() || 0;
      if (element && element.offset && element.length > 0) {
        var elementOffsetTop = element.offset().top;
        return windowHeight - (elementOffsetTop - pageScroll);
      }
      return 0;
    }

    function calculateAvailableSpaceTop(element) {
      var pageScroll = $(window).scrollTop() || 0;
      if (element && element.offset && element.length > 0) {
        var elementOffsetTop = element.offset().top;
        return elementOffsetTop - pageScroll;
      }
      return 0;
    }

    function handleOnContextMenu(e, args) {
      e.preventDefault();

      var cell = _grid.getCellFromEvent(e);
      var columnDef = _grid.getColumns()[cell.cell];
      var dataContext = _grid.getDataItem(cell.row);

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
      $menu = createMenu(e, args);

      // reposition the menu to where the user clicked
      if ($menu) {
        repositionMenu(e);
        $menu
          .data("cell", _currentCell)
          .data("row", _currentRow)
          .show();
      }

      $("body").one("click", function (e) {
        destroyMenu(e, { cell: _currentCell, row: _currentRow });
      });
    }

    /** Construct the Option Items section. */
    function populateOptionItems(contextMenu, optionMenuElm, optionItems, args) {
      if (!args || !optionItems || !contextMenu) {
        return;
      }

      // user could pass a title on top of the Options section
      if (contextMenu && contextMenu.optionTitle) {
        $optionTitleElm = $('<div class="title"/>').append(contextMenu.optionTitle);
        $optionTitleElm.appendTo(optionMenuElm);
      }

      for (var i = 0, ln = optionItems.length; i < ln; i++) {
        var item = optionItems[i];

        // run each override functions to know if the item is visible and usable
        var isItemVisible = runOverrideFunctionWhenExists(item.itemVisibilityOverride, args);
        var isItemUsable = runOverrideFunctionWhenExists(item.itemUsabilityOverride, args);

        // if the result is not visible then there's no need to go further
        if (!isItemVisible) {
          continue;
        }

        // when the override is defined, we need to use its result to update the disabled property
        // so that "handleMenuItemOptionClick" has the correct flag and won't trigger an option clicked event
        if (Object.prototype.hasOwnProperty.call(item, "itemUsabilityOverride")) {
          item.disabled = isItemUsable ? false : true;
        }

        var $li = $('<div class="slick-context-menu-item"></div>')
          .data("option", item.option || "")
          .data("item", item)
          .on("click", handleMenuItemOptionClick)
          .appendTo(optionMenuElm);

        if (item.divider || item === "divider") {
          $li.addClass("slick-context-menu-item-divider");
          continue;
        }

        // if the item is disabled then add the disabled css class
        if (item.disabled || !isItemUsable) {
          $li.addClass("slick-context-menu-item-disabled");
        }

        if (item.cssClass) {
          $li.addClass(item.cssClass);
        }

        if (item.tooltip) {
          $li.attr("title", item.tooltip);
        }

        var $icon = $('<div class="slick-context-menu-icon"></div>')
          .appendTo($li);

        if (item.iconCssClass) {
          $icon.addClass(item.iconCssClass);
        }

        if (item.iconImage) {
          $icon.css("background-image", "url(" + item.iconImage + ")");
        }

        var $text = $('<span class="slick-context-menu-content"></span>')
          .text(item.title)
          .appendTo($li);

        if (item.textCssClass) {
          $text.addClass(item.textCssClass);
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
        $commandTitleElm = $('<div class="title"/>').append(contextMenu.commandTitle);
        $commandTitleElm.appendTo(commandMenuElm);
      }

      for (var i = 0, ln = commandItems.length; i < ln; i++) {
        var item = commandItems[i];

        // run each override functions to know if the item is visible and usable
        var isItemVisible = runOverrideFunctionWhenExists(item.itemVisibilityOverride, args);
        var isItemUsable = runOverrideFunctionWhenExists(item.itemUsabilityOverride, args);

        // if the result is not visible then there's no need to go further
        if (!isItemVisible) {
          continue;
        }

        // when the override is defined, we need to use its result to update the disabled property
        // so that "handleMenuItemCommandClick" has the correct flag and won't trigger a command clicked event
        if (Object.prototype.hasOwnProperty.call(item, "itemUsabilityOverride")) {
          item.disabled = isItemUsable ? false : true;
        }

        var $li = $('<div class="slick-context-menu-item"></div>')
          .data("command", item.command || "")
          .data("item", item)
          .on("click", handleMenuItemCommandClick)
          .appendTo(commandMenuElm);

        if (item.divider || item === "divider") {
          $li.addClass("slick-context-menu-item-divider");
          continue;
        }

        // if the item is disabled then add the disabled css class
        if (item.disabled || !isItemUsable) {
          $li.addClass("slick-context-menu-item-disabled");
        }

        if (item.cssClass) {
          $li.addClass(item.cssClass);
        }

        if (item.tooltip) {
          $li.attr("title", item.tooltip);
        }

        var $icon = $('<div class="slick-context-menu-icon"></div>')
          .appendTo($li);

        if (item.iconCssClass) {
          $icon.addClass(item.iconCssClass);
        }

        if (item.iconImage) {
          $icon.css("background-image", "url(" + item.iconImage + ")");
        }

        var $text = $('<span class="slick-context-menu-content"></span>')
          .text(item.title)
          .appendTo($li);

        if (item.textCssClass) {
          $text.addClass(item.textCssClass);
        }
      }
    }

    function handleMenuItemCommandClick(e) {
      var command = $(this).data("command");
      var item = $(this).data("item");

      if (!item || item.disabled || item.divider) {
        return;
      }

      var row = $menu.data("row");
      var cell = $menu.data("cell");

      var columnDef = _grid.getColumns()[cell];
      var dataContext = _grid.getDataItem(row);
      var cellValue;
      if (Object.prototype.hasOwnProperty.call(dataContext, columnDef && columnDef.field)) {
        cellValue = dataContext[columnDef.field];
      }

      if (command != null && command !== "") {
        // user could execute a callback through 2 ways
        // via the onCommand event and/or an action callback
        var callbackArgs = {
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

    function handleMenuItemOptionClick(e) {
      var option = $(this).data("option");
      var item = $(this).data("item");

      if (item.disabled || item.divider) {
        return;
      }
      if (!_grid.getEditorLock().commitCurrentEdit()) {
        return;
      }

      var row = $menu.data("row");
      var cell = $menu.data("cell");

      var columnDef = _grid.getColumns()[cell];
      var dataContext = _grid.getDataItem(row);

      if (option !== undefined) {
        // user could execute a callback through 2 ways
        // via the onOptionSelected event and/or an action callback
        var callbackArgs = {
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
      var $parent = $(e.target).closest(".slick-cell");
      var menuOffsetLeft = e.pageX;
      var menuOffsetTop = $parent ? $parent.offset().top : e.pageY;
      var menuHeight = $menu.outerHeight() || 0;
      var menuWidth = $menu.outerWidth() || _contextMenuProperties.width || 0;
      var rowHeight = _gridOptions.rowHeight;
      var dropOffset = _contextMenuProperties.autoAdjustDropOffset;
      var sideOffset = _contextMenuProperties.autoAlignSideOffset;

      // if autoAdjustDrop is enable, we first need to see what position the drop will be located
      // without necessary toggling it's position just yet, we just want to know the future position for calculation
      if (_contextMenuProperties.autoAdjustDrop) {
        // since we reposition menu below slick cell, we need to take it in consideration and do our calculation from that element
        var spaceBottom = calculateAvailableSpaceBottom($parent);
        var spaceTop = calculateAvailableSpaceTop($parent);
        var spaceBottomRemaining = spaceBottom + dropOffset - rowHeight;
        var spaceTopRemaining = spaceTop - dropOffset + rowHeight;
        var dropPosition = (spaceBottomRemaining < menuHeight && spaceTopRemaining > spaceBottomRemaining) ? 'top' : 'bottom';
        if (dropPosition === 'top') {
          $menu.removeClass("dropdown").addClass("dropup");
          menuOffsetTop = menuOffsetTop - menuHeight - dropOffset;
        } else {
          $menu.removeClass("dropup").addClass("dropdown");
          menuOffsetTop = menuOffsetTop + rowHeight + dropOffset;
        }
      }

      // when auto-align is set, it will calculate whether it has enough space in the viewport to show the drop menu on the right (default)
      // if there isn't enough space on the right, it will automatically align the drop menu to the left
      // to simulate an align left, we actually need to know the width of the drop menu
      if (_contextMenuProperties.autoAlignSide) {
        var gridPos = _grid.getGridPosition();
        var dropSide = ((menuOffsetLeft + menuWidth) >= gridPos.width) ? 'left' : 'right';
        if (dropSide === 'left') {
          $menu.removeClass("dropright").addClass("dropleft");
          menuOffsetLeft = (menuOffsetLeft - menuWidth - sideOffset);
        } else {
          $menu.removeClass("dropleft").addClass("dropright");
          menuOffsetLeft = menuOffsetLeft + sideOffset;
        }
      }

      // ready to reposition the menu
      $menu.css("top", menuOffsetTop);
      $menu.css("left", menuOffsetLeft);
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
})(jQuery);
