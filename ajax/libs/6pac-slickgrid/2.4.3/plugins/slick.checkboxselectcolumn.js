(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "CheckboxSelectColumn": CheckboxSelectColumn
    }
  });


  function CheckboxSelectColumn(options) {
    var _grid;
    var _selectAll_UID = createUID();
    var _handler = new Slick.EventHandler();
    var _selectedRowsLookup = {};
    var _defaults = {
      columnId: "_checkbox_selector",
      cssClass: null,
      hideSelectAllCheckbox: false,
      toolTip: "Select/Deselect All",
      width: 30,
      hideInColumnTitleRow: false,
      hideInFilterHeaderRow: true
    };
    var _isSelectAllChecked = false;

    var _options = $.extend(true, {}, _defaults, options);

    function init(grid) {
      _grid = grid;
      _handler
      .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
      .subscribe(_grid.onClick, handleClick)
      .subscribe(_grid.onKeyDown, handleKeyDown);
      
      if (!_options.hideInFilterHeaderRow) {
        addCheckboxToFilterHeaderRow(grid);
      }
      if (!_options.hideInColumnTitleRow) {
        _handler.subscribe(_grid.onHeaderClick, handleHeaderClick)
      }
    }

    function destroy() {
      _handler.unsubscribeAll();
    }

    function getOptions() {
      return _options;
    }

    function setOptions(options) {
      _options = $.extend(true, {}, _options, options);
      
      if (_options.hideSelectAllCheckbox) {
        hideSelectAllFromColumnHeaderTitleRow();
        hideSelectAllFromColumnHeaderFilterRow();
      } else {
        if (!_options.hideInColumnTitleRow) {
          if (_isSelectAllChecked) {
            _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox' checked='checked'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
          } else {
            _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
          }
          _handler.subscribe(_grid.onHeaderClick, handleHeaderClick);
        } else {
          hideSelectAllFromColumnHeaderTitleRow();
        }

        if (!_options.hideInFilterHeaderRow) {
          var selectAllContainer = $("#filter-checkbox-selectall-container");
          selectAllContainer.show();
          selectAllContainer.find('input[type="checkbox"]').prop("checked", _isSelectAllChecked);
        } else {
          hideSelectAllFromColumnHeaderFilterRow();
        }
      } 
    }

    function hideSelectAllFromColumnHeaderTitleRow() {
      _grid.updateColumnHeader(_options.columnId, "", "");
    }

    function hideSelectAllFromColumnHeaderFilterRow() {
      $("#filter-checkbox-selectall-container").hide();
    }

    function handleSelectedRowsChanged(e, args) {
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
      _isSelectAllChecked = selectedRows.length && selectedRows.length == _grid.getDataLength();

      if (!_options.hideInColumnTitleRow && !_options.hideSelectAllCheckbox) {
        if (_isSelectAllChecked) {
          _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox' checked='checked'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
        } else {
          _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
        }
      } 
      if (!_options.hideInFilterHeaderRow) {
        var selectAllElm = $("#header-filter-selector" + _selectAll_UID);
        selectAllElm.prop("checked", _isSelectAllChecked);
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
      return {
        id: _options.columnId,
        name: (_options.hideSelectAllCheckbox || _options.hideInColumnTitleRow) ? "" : "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>",
        toolTip: _options.toolTip,
        field: "sel",
        width: _options.width,
        resizable: false,
        sortable: false,
        cssClass: _options.cssClass,
        hideSelectAllCheckbox: _options.hideSelectAllCheckbox,
        formatter: checkboxSelectionFormatter
      };
    }

    function addCheckboxToFilterHeaderRow(grid) {
      grid.onHeaderRowCellRendered.subscribe(function(e, args) {
        if (args.column.field === "sel") {
          $(args.node).empty();
          $("<span id='filter-checkbox-selectall-container'><input id='header-filter-selector" + _selectAll_UID + "' type='checkbox'><label for='header-filter-selector" + _selectAll_UID + "'></label></span>")
            .appendTo(args.node)
            .on('click', function(evnt) { 
              handleHeaderClick(evnt, args) 
            });
        }
      });
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
      "getColumnDefinition": getColumnDefinition,
      "getOptions": getOptions,
      "setOptions": setOptions,
    });
  }
})(jQuery);