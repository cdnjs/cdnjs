(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "CheckboxSelectColumn": CheckboxSelectColumn
    }
  });


  function CheckboxSelectColumn(options) {
    var _grid;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _selectedRowsLookup = {};
    var _defaults = {
      columnId: "_checkbox_selector",
      cssClass: null,
      toolTip: "Select/Deselect All",
      width: 30
    };

    var _options = $.extend(true, {}, _defaults, options);

    function init(grid) {
      _grid = grid;
      _handler
        .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
        .subscribe(_grid.onClick, handleClick)
        .subscribe(_grid.onHeaderClick, handleHeaderClick)
        .subscribe(_grid.onKeyDown, handleKeyDown);
    }

    function destroy() {
      _handler.unsubscribeAll();
    }

    function handleSelectedRowsChanged(e, args) {
      var UID = createUID();
      var selectedRows = _grid.getSelectedRows();
      var lookup = {}, row, i;
      for (i = 0; i < selectedRows.length; i++) {
        row = selectedRows[i];
        lookup[row] = true;
        if (lookup[row] !== _selectedRowsLookup[row]) {
          _grid.invalidateRow(row);
          delete _selectedRowsLookup[row];
        }
      }
      for (i in _selectedRowsLookup) {
        _grid.invalidateRow(i);
      }
      _selectedRowsLookup = lookup;
      _grid.render();

      if (selectedRows.length && selectedRows.length == _grid.getDataLength()) {
        _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + UID + "' type='checkbox' checked='checked'><label for='header-selector" + UID + "'></label>", _options.toolTip);
      } else {
        _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + UID + "' type='checkbox'><label for='header-selector" + UID + "'></label>", _options.toolTip);
      }
    }

    function handleKeyDown(e, args) {
      if (e.which == 32) {
        if (_grid.getColumns()[args.cell].id === _options.columnId) {
          // if editing, try to commit
          if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
            toggleRowSelection(args.row);
          }
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }
    }

    function handleClick(e, args) {
      // clicking on a row select checkbox
      if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        toggleRowSelection(args.row);
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    function toggleRowSelection(row) {
      if (_selectedRowsLookup[row]) {
        _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
          return n != row
        }));
      } else {
        _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
      }
      _grid.setActiveCell(row, getCheckboxColumnCellIndex());
      _grid.focus();
    }

    function selectRows(rowArray) {
      var i, l=rowArray.length, addRows = [];
      for(i=0; i<l; i++) {
        if (!_selectedRowsLookup[rowArray[i]]) {
          addRows[addRows.length] = rowArray[i];
        }
      }
      _grid.setSelectedRows(_grid.getSelectedRows().concat(addRows));
    }

    function deSelectRows(rowArray) {
      var i, l=rowArray.length, removeRows = [];
      for(i=0; i<l; i++) {
        if (_selectedRowsLookup[rowArray[i]]) {
          removeRows[removeRows.length] = rowArray[i];
        }
      }
      _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
        return removeRows.indexOf(n)<0
      }));
    }

    function handleHeaderClick(e, args) {
      if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        if ($(e.target).is(":checked")) {
          var rows = [];
          for (var i = 0; i < _grid.getDataLength(); i++) {
            rows.push(i);
          }
          _grid.setSelectedRows(rows);
        } else {
          _grid.setSelectedRows([]);
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    var _checkboxColumnCellIndex = null;

    function getCheckboxColumnCellIndex() {
      if (_checkboxColumnCellIndex === null) {
        _checkboxColumnCellIndex = 0;
        var colArr = _grid.getColumns();
        for (var i=0; i < colArr.length; i++) {
          if (colArr[i].id == _options.columnId) {
            _checkboxColumnCellIndex = i;
          }
        }
      }
      return _checkboxColumnCellIndex;
    }

    function getColumnDefinition() {
      var UID = createUID();

      return {
        id: _options.columnId,
        name: "<input id='header-selector" + UID + "' type='checkbox'><label for='header-selector" + UID + "'></label>",
        toolTip: _options.toolTip,
        field: "sel",
        width: _options.width,
        resizable: false,
        sortable: false,
        cssClass: _options.cssClass,
        formatter: checkboxSelectionFormatter
      };
    }

    function createUID() {
      return Math.round(10000000 * Math.random());
    }

    function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
      var UID = createUID() + row;

      if (dataContext) {
        return _selectedRowsLookup[row]
            ? "<input id='selector" + UID + "' type='checkbox' checked='checked'><label for='selector" + UID + "'></label>"
            : "<input id='selector" + UID + "' type='checkbox'><label for='selector" + UID + "'></label>";
      }
      return null;
    }

    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "deSelectRows": deSelectRows,
      "selectRows": selectRows,
      "getColumnDefinition": getColumnDefinition
    });
  }
})(jQuery);