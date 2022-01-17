(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "RowSelectionModel": RowSelectionModel
    }
  });

  function RowSelectionModel(options) {
    var _grid;
    var _ranges = [];
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _inHandler;
    var _options;
    var _selector;
    var _defaults = {
      selectActiveRow: true,
      cellRangeSelector: undefined
    };

    function init(grid) {
      _options = $.extend(true, {}, _defaults, options);
      _selector = _options.cellRangeSelector;
      _grid = grid;
      _handler.subscribe(_grid.onActiveCellChanged,
          wrapHandler(handleActiveCellChange));
      _handler.subscribe(_grid.onKeyDown,
          wrapHandler(handleKeyDown));
      _handler.subscribe(_grid.onClick,
          wrapHandler(handleClick));
      if (_selector) {
        grid.registerPlugin(_selector);
        _selector.onCellRangeSelecting.subscribe(handleCellRangeSelected);
        _selector.onCellRangeSelected.subscribe(handleCellRangeSelected);
        _selector.onBeforeCellRangeSelected.subscribe(handleBeforeCellRangeSelected);
      }
    }

    function destroy() {
      _handler.unsubscribeAll();
      if (_selector) {
        _selector.onCellRangeSelecting.unsubscribe(handleCellRangeSelected);
        _selector.onCellRangeSelected.unsubscribe(handleCellRangeSelected);
        _selector.onBeforeCellRangeSelected.unsubscribe(handleBeforeCellRangeSelected);
        _grid.unregisterPlugin(_selector);
        if (_selector.destroy) {
          _selector.destroy();
        }
      }
    }

    function wrapHandler(handler) {
      return function () {
        if (!_inHandler) {
          _inHandler = true;
          handler.apply(this, arguments);
          _inHandler = false;
        }
      };
    }

    function rangesToRows(ranges) {
      var rows = [];
      for (var i = 0; i < ranges.length; i++) {
        for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
          rows.push(j);
        }
      }
      return rows;
    }

    function rowsToRanges(rows) {
      var ranges = [];
      var lastCell = _grid.getColumns().length - 1;
      for (var i = 0; i < rows.length; i++) {
        ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
      }
      return ranges;
    }

    function getRowsRange(from, to) {
      var i, rows = [];
      for (i = from; i <= to; i++) {
        rows.push(i);
      }
      for (i = to; i < from; i++) {
        rows.push(i);
      }
      return rows;
    }

    function getSelectedRows() {
      return rangesToRows(_ranges);
    }

    function setSelectedRows(rows) {
      setSelectedRanges(rowsToRanges(rows), "SlickRowSelectionModel.setSelectedRows");
    }

    function setSelectedRanges(ranges, caller) {
      // simple check for: empty selection didn't change, prevent firing onSelectedRangesChanged
      if ((!_ranges || _ranges.length === 0) && (!ranges || ranges.length === 0)) { 
        return; 
      }
      _ranges = ranges;
      
      // provide extra "caller" argument through SlickEventData to avoid breaking pubsub event that only accepts an array of selected range
      var eventData = new Slick.EventData();
      Object.defineProperty(eventData, 'detail', { writable: true, configurable: true, value: { caller: caller || "SlickRowSelectionModel.setSelectedRanges" } });
      _self.onSelectedRangesChanged.notify(_ranges, eventData);
    }

    function getSelectedRanges() {
      return _ranges;
    }

    function handleActiveCellChange(e, data) {
      if (_options.selectActiveRow && data.row != null) {
        setSelectedRanges([new Slick.Range(data.row, 0, data.row, _grid.getColumns().length - 1)]);
      }
    }

    function handleKeyDown(e) {
      var activeRow = _grid.getActiveCell();
      if (_grid.getOptions().multiSelect && activeRow 
      && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey 
      && (e.which == Slick.keyCode.UP || e.which == Slick.keyCode.DOWN)) {
        var selectedRows = getSelectedRows();
        selectedRows.sort(function (x, y) {
          return x - y;
        });

        if (!selectedRows.length) {
          selectedRows = [activeRow.row];
        }

        var top = selectedRows[0];
        var bottom = selectedRows[selectedRows.length - 1];
        var active;

        if (e.which == Slick.keyCode.DOWN) {
          active = activeRow.row < bottom || top == bottom ? ++bottom : ++top;
        } else {
          active = activeRow.row < bottom ? --bottom : --top;
        }

        if (active >= 0 && active < _grid.getDataLength()) {
          _grid.scrollRowIntoView(active);
          var tempRanges = rowsToRanges(getRowsRange(top, bottom));
          setSelectedRanges(tempRanges);
        }

        e.preventDefault();
        e.stopPropagation();
      }
    }

    function handleClick(e) {
      var cell = _grid.getCellFromEvent(e);
      if (!cell || !_grid.canCellBeActive(cell.row, cell.cell)) {
        return false;
      }

      if (!_grid.getOptions().multiSelect || (
          !e.ctrlKey && !e.shiftKey && !e.metaKey)) {
        return false;
      }

      var selection = rangesToRows(_ranges);
      var idx = $.inArray(cell.row, selection);

      if (idx === -1 && (e.ctrlKey || e.metaKey)) {
        selection.push(cell.row);
        _grid.setActiveCell(cell.row, cell.cell);
      } else if (idx !== -1 && (e.ctrlKey || e.metaKey)) {
        selection = $.grep(selection, function (o, i) {
          return (o !== cell.row);
        });
        _grid.setActiveCell(cell.row, cell.cell);
      } else if (selection.length && e.shiftKey) {
        var last = selection.pop();
        var from = Math.min(cell.row, last);
        var to = Math.max(cell.row, last);
        selection = [];
        for (var i = from; i <= to; i++) {
          if (i !== last) {
            selection.push(i);
          }
        }
        selection.push(last);
        _grid.setActiveCell(cell.row, cell.cell);
      }

      var tempRanges = rowsToRanges(selection);
      setSelectedRanges(tempRanges);
      e.stopImmediatePropagation();

      return true;
    }

    function handleBeforeCellRangeSelected(e, cell) {
      if (_grid.getEditorLock().isActive()) {
        e.stopPropagation();
        return false;
      }
      _grid.setActiveCell(cell.row, cell.cell);
    }

    function handleCellRangeSelected(e, args) {
      if (!_grid.getOptions().multiSelect || !_options.selectActiveRow) {
        return false;
      }
      setSelectedRanges([new Slick.Range(args.range.fromRow, 0, args.range.toRow, _grid.getColumns().length - 1)])
    }

    $.extend(this, {
      "getSelectedRows": getSelectedRows,
      "setSelectedRows": setSelectedRows,

      "getSelectedRanges": getSelectedRanges,
      "setSelectedRanges": setSelectedRanges,

      "init": init,
      "destroy": destroy,
      "pluginName": "RowSelectionModel",

      "onSelectedRangesChanged": new Slick.Event()
    });
  }
})(jQuery);