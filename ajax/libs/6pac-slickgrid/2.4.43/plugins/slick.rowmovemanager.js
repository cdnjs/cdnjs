/**
 * Row Move Manager options:
 *    cssClass:                 A CSS class to be added to the menu item container.
 *    columnId:                 Column definition id (defaults to "_move")
 *    cancelEditOnDrag:         Do we want to cancel any Editing while dragging a row (defaults to false)
 *    disableRowSelection:      Do we want to disable the row selection? (defaults to false)
 *    hideRowMoveShadow:        Do we want to hide the row move shadow clone? (defaults to true)
 *    rowMoveShadowMarginTop:   When row move shadow is shown, optional margin-top (defaults to 0)
 *    rowMoveShadowMarginLeft:  When row move shadow is shown, optional margin-left (defaults to 0)
 *    rowMoveShadowOpacity:     When row move shadow is shown, what is its opacity? (defaults to 0.95)
 *    rowMoveShadowScale:       When row move shadow is shown, what is its size scale? (default to 0.75)
 *    singleRowMove:            Do we want a single row move? Setting this to false means that it's a multple row move (defaults to false)
 *    width:                    Width of the column
 *    usabilityOverride:        Callback method that user can override the default behavior of the row being moveable or not
 *
 */
(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "RowMoveManager": RowMoveManager
    }
  });

  function RowMoveManager(options) {
    var _grid;
    var _canvas;
    var _dragging;
    var _self = this;
    var _usabilityOverride = null;
    var _handler = new Slick.EventHandler();
    var _defaults = {
      columnId: "_move",
      cssClass: null,
      cancelEditOnDrag: false,
      disableRowSelection: false,
      hideRowMoveShadow: true,
      rowMoveShadowMarginTop: 0,
      rowMoveShadowMarginLeft: 0,
      rowMoveShadowOpacity: 0.95,
      rowMoveShadowScale: 0.75,
      singleRowMove: false,
      width: 40,
    };

    // user could override the expandable icon logic from within the options or after instantiating the plugin
    if (options && typeof options.usabilityOverride === 'function') {
      usabilityOverride(options.usabilityOverride);
    }

    function init(grid) {
      options = $.extend(true, {}, _defaults, options);
      _grid = grid;
      _canvas = _grid.getCanvasNode();
      _handler
        .subscribe(_grid.onDragInit, handleDragInit)
        .subscribe(_grid.onDragStart, handleDragStart)
        .subscribe(_grid.onDrag, handleDrag)
        .subscribe(_grid.onDragEnd, handleDragEnd);
    }

    function destroy() {
      _handler.unsubscribeAll();
    }

    function setOptions(newOptions) {
      options = $.extend({}, options, newOptions);
    }

    function handleDragInit(e) {
      // prevent the grid from cancelling drag'n'drop by default
      e.stopImmediatePropagation();
    }

    function handleDragStart(e, dd) {
      var cell = _grid.getCellFromEvent(e);
      var currentRow = cell && cell.row;
      var dataContext = _grid.getDataItem(currentRow);

      if (!checkUsabilityOverride(currentRow, dataContext, _grid)) {
        return;
      }

      if (options.cancelEditOnDrag && _grid.getEditorLock().isActive()) {
        _grid.getEditorLock().cancelCurrentEdit();
      }

      if (_grid.getEditorLock().isActive() || !/move|selectAndMove/.test(_grid.getColumns()[cell.cell].behavior)) {
        return false;
      }

      _dragging = true;
      e.stopImmediatePropagation();

      // optionally create a shadow element of the row so that we can see all the time which row exactly we're dragging
      if (!options.hideRowMoveShadow) {
        var $slickRowElm = $(_grid.getCellNode(cell.row, cell.cell)).closest('.slick-row');
        if ($slickRowElm) {
          dd.clonedSlickRow = $slickRowElm.clone();
          dd.clonedSlickRow.addClass('slick-reorder-shadow-row')
            .css("marginTop", options.rowMoveShadowMarginTop || 0)
            .css("marginLeft", options.rowMoveShadowMarginLeft || 0)
            .css("opacity", options.rowMoveShadowOpacity || 0.95)
            .css("transform", "scale(" + options.rowMoveShadowScale + ")")
            .hide()
            .appendTo(_canvas);
        }
      }

      var selectedRows = options.singleRowMove ? [cell.row] : _grid.getSelectedRows();

      if (selectedRows.length === 0 || $.inArray(cell.row, selectedRows) == -1) {
        selectedRows = [cell.row];
        if (!options.disableRowSelection) {
          _grid.setSelectedRows(selectedRows);
        }
      }

      var rowHeight = _grid.getOptions().rowHeight;

      dd.selectedRows = selectedRows;

      dd.selectionProxy = $("<div class='slick-reorder-proxy'/>")
        .css("position", "absolute")
        .css("zIndex", "99999")
        .css("width", $(_canvas).innerWidth())
        .css("height", rowHeight * selectedRows.length)
        .hide()
        .appendTo(_canvas);

      dd.guide = $("<div class='slick-reorder-guide'/>")
        .css("position", "absolute")
        .css("zIndex", "99998")
        .css("width", $(_canvas).innerWidth())
        .css("top", -1000)
        .appendTo(_canvas);

      dd.insertBefore = -1;
    }

    function handleDrag(e, dd) {
      if (!_dragging) {
        return;
      }

      e.stopImmediatePropagation();

      var top = e.pageY - $(_canvas).offset().top;
      dd.selectionProxy.css("top", top - 5).show();

      // if the row move shadow is enabled, we'll also make it follow the mouse cursor
      if (dd.clonedSlickRow) {
        var offsetY = e.pageY - $(_canvas).offset().top;
        dd.clonedSlickRow.css("top", offsetY - 6).show();
      }

      var insertBefore = Math.max(0, Math.min(Math.round(top / _grid.getOptions().rowHeight), _grid.getDataLength()));
      if (insertBefore !== dd.insertBefore) {
        var eventData = {
          "grid": _grid,
          "rows": dd.selectedRows,
          "insertBefore": insertBefore
        };

        if (_self.onBeforeMoveRows.notify(eventData) === false) {
          dd.canMove = false;
        } else {
          dd.canMove = true;
        }

        // if there's a UsabilityOverride defined, we also need to verify that the condition is valid
        if (_usabilityOverride && dd.canMove) {
          var insertBeforeDataContext = _grid.getDataItem(insertBefore);
          dd.canMove = checkUsabilityOverride(insertBefore, insertBeforeDataContext, _grid);
        }

        // if the new target is possible we'll display the dark blue bar (representin the acceptability) at the target position
        // else it won't show up (it will be off the screen)
        if (!dd.canMove) {
          dd.guide.css("top", -1000);
        } else {
          dd.guide.css("top", insertBefore * _grid.getOptions().rowHeight);
        }

        dd.insertBefore = insertBefore;
      }
    }

    function handleDragEnd(e, dd) {
      if (!_dragging) {
        return;
      }
      _dragging = false;
      e.stopImmediatePropagation();

      dd.guide.remove();
      dd.selectionProxy.remove();
      if (dd.clonedSlickRow) {
        dd.clonedSlickRow.remove();
        dd.clonedSlickRow = null;
      }

      if (dd.canMove) {
        var eventData = {
          "grid": _grid,
          "rows": dd.selectedRows,
          "insertBefore": dd.insertBefore
        };
        // TODO:  _grid.remapCellCssClasses ?
        _self.onMoveRows.notify(eventData);
      }
    }

    function getColumnDefinition() {
      return {
        id: options.columnId || "_move",
        name: "",
        field: "move",
        width: options.width || 40,
        behavior: "selectAndMove",
        selectable: false,
        resizable: false,
        cssClass: options.cssClass,
        formatter: moveIconFormatter
      };
    }

    function moveIconFormatter(row, cell, value, columnDef, dataContext, grid) {
      if (!checkUsabilityOverride(row, dataContext, grid)) {
        return null;
      } else {
        return { addClasses: "cell-reorder dnd", text: "" };
      }
    }

    function checkUsabilityOverride(row, dataContext, grid) {
      if (typeof _usabilityOverride === 'function') {
        return _usabilityOverride(row, dataContext, grid);
      }
      return true;
    }

    /**
     * Method that user can pass to override the default behavior or making every row moveable.
     * In order word, user can choose which rows to be an available as moveable (or not) by providing his own logic show/hide icon and usability.
     * @param overrideFn: override function callback
     */
    function usabilityOverride(overrideFn) {
      _usabilityOverride = overrideFn;
    }

    $.extend(this, {
      "onBeforeMoveRows": new Slick.Event(),
      "onMoveRows": new Slick.Event(),

      "init": init,
      "destroy": destroy,
      "getColumnDefinition": getColumnDefinition,
      "setOptions": setOptions,
      "usabilityOverride": usabilityOverride,
      "pluginName": "RowMoveManager"
    });
  }
})(jQuery);
