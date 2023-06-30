(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "CheckboxSelectColumn": CheckboxSelectColumn
    }
  });

  function CheckboxSelectColumn(options) {
    let _dataView;
    let _grid;
    let _isUsingDataView = false;
    let _selectableOverride = null;
    let _headerRowNode;
    let _selectAll_UID = createUID();
    let _handler = new Slick.EventHandler();
    let _selectedRowsLookup = {};
    let _defaults = {
      columnId: "_checkbox_selector",
      cssClass: null,
      hideSelectAllCheckbox: false,
      toolTip: "Select/Deselect All",
      width: 30,
      applySelectOnAllPages: false, // defaults to false, when that is enabled the "Select All" will be applied to all pages (when using Pagination)
      hideInColumnTitleRow: false,
      hideInFilterHeaderRow: true
    };
    let _isSelectAllChecked = false;

    let _bindingEventService = new Slick.BindingEventService();
    let _options = Slick.Utils.extend(true, {}, _defaults, options);

    // user could override the checkbox icon logic from within the options or after instantiating the plugin
    if (typeof _options.selectableOverride === 'function') {
      selectableOverride(_options.selectableOverride);
    }

    function init(grid) {
      _grid = grid;
      _isUsingDataView = !Array.isArray(grid.getData());
      if (_isUsingDataView) {
        _dataView = grid.getData();
      }
      _handler
        .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
        .subscribe(_grid.onClick, handleClick)
        .subscribe(_grid.onKeyDown, handleKeyDown);

      if (_isUsingDataView && _dataView && _options.applySelectOnAllPages) {
        _handler
          .subscribe(_dataView.onSelectedRowIdsChanged, handleDataViewSelectedIdsChanged)
          .subscribe(_dataView.onPagingInfoChanged, handleDataViewSelectedIdsChanged)
      }

      if (!_options.hideInFilterHeaderRow) {
        addCheckboxToFilterHeaderRow(grid);
      }
      if (!_options.hideInColumnTitleRow) {
        _handler.subscribe(_grid.onHeaderClick, handleHeaderClick);
      }
    }

    function destroy() {
      _handler.unsubscribeAll();
      _bindingEventService.unbindAll();
    }

    function getOptions() {
      return _options;
    }

    function setOptions(options) {
      _options = Slick.Utils.extend(true, {}, _options, options);

      if (_options.hideSelectAllCheckbox) {
        hideSelectAllFromColumnHeaderTitleRow();
        hideSelectAllFromColumnHeaderFilterRow();
      } else {
        if (!_options.hideInColumnTitleRow) {
          renderSelectAllCheckbox(_isSelectAllChecked);
          _handler.subscribe(_grid.onHeaderClick, handleHeaderClick);
        } else {
          hideSelectAllFromColumnHeaderTitleRow();
        }

        if (!_options.hideInFilterHeaderRow) {
          let selectAllContainerElm = _headerRowNode.querySelector("#filter-checkbox-selectall-container");
          if (selectAllContainerElm) {
            selectAllContainerElm.style.display = 'flex';
            const selectAllInputElm = selectAllContainerElm.querySelector('input[type="checkbox"]');
            if (selectAllInputElm) {
              selectAllInputElm.checked = _isSelectAllChecked;
            }
          }
        } else {
          hideSelectAllFromColumnHeaderFilterRow();
        }
      }
    }

    function hideSelectAllFromColumnHeaderTitleRow() {
      _grid.updateColumnHeader(_options.columnId, "", "");
    }

    function hideSelectAllFromColumnHeaderFilterRow() {
      const selectAllContainerElm = _headerRowNode && _headerRowNode.querySelector('#filter-checkbox-selectall-container');
      if (selectAllContainerElm) {
        selectAllContainerElm.style.display = 'none';
      }
    }

    function handleSelectedRowsChanged() {
      let selectedRows = _grid.getSelectedRows();
      let lookup = {}, row, i, k;
      let disabledCount = 0;
      if (typeof _selectableOverride === 'function') {
        for (k = 0; k < _grid.getDataLength(); k++) {
          // If we are allowed to select the row
          let dataItem = _grid.getDataItem(k);
          if (!checkSelectableOverride(i, dataItem, _grid)) {
            disabledCount++;
          }
        }
      }

      let removeList = [];
      for (i = 0; i < selectedRows.length; i++) {
        row = selectedRows[i];

        // If we are allowed to select the row
        let rowItem = _grid.getDataItem(row);
        if (checkSelectableOverride(i, rowItem, _grid)) {
          lookup[row] = true;
          if (lookup[row] !== _selectedRowsLookup[row]) {
            _grid.invalidateRow(row);
            delete _selectedRowsLookup[row];
          }
        }
        else {
          removeList.push(row);
        }
      }
      for (i in _selectedRowsLookup) {
        _grid.invalidateRow(i);
      }
      _selectedRowsLookup = lookup;
      _grid.render();
      _isSelectAllChecked = selectedRows && selectedRows.length + disabledCount >= _grid.getDataLength();

      if (!_isUsingDataView || !_options.applySelectOnAllPages) {
        if (!_options.hideInColumnTitleRow && !_options.hideSelectAllCheckbox) {
          renderSelectAllCheckbox(_isSelectAllChecked);
        }
        if (!_options.hideInFilterHeaderRow) {
          const selectAllElm = _headerRowNode && _headerRowNode.querySelector(`#header-filter-selector${_selectAll_UID}`);
          if (selectAllElm) {
            selectAllElm.checked = _isSelectAllChecked;
          }
        }
      }

      // Remove items that shouln't of been selected in the first place (Got here Ctrl + click)
      if (removeList.length > 0) {
        for (i = 0; i < removeList.length; i++) {
          let remIdx = selectedRows.indexOf(removeList[i]);
          selectedRows.splice(remIdx, 1);
        }
        _grid.setSelectedRows(selectedRows, "click.cleanup");
      }
    }

    function handleDataViewSelectedIdsChanged() {
      let selectedIds = _dataView.getAllSelectedFilteredIds();
      let filteredItems = _dataView.getFilteredItems();
      let disabledCount = 0;

      if (typeof _selectableOverride === 'function' && selectedIds.length > 0) {
        for (let k = 0; k < _dataView.getItemCount(); k++) {
          // If we are allowed to select the row
          let dataItem = _dataView.getItemByIdx(k);
          let idProperty = _dataView.getIdPropertyName();
          let dataItemId = dataItem[idProperty];
          let foundItemIdx = filteredItems.findIndex(function (item) {
            return item[idProperty] === dataItemId;
          });
          if (foundItemIdx >= 0 && !checkSelectableOverride(k, dataItem, _grid)) {
            disabledCount++;
          }
        }
      }
      _isSelectAllChecked = (selectedIds && selectedIds.length) + disabledCount >= filteredItems.length;

      if (!_options.hideInColumnTitleRow && !_options.hideSelectAllCheckbox) {
        renderSelectAllCheckbox(_isSelectAllChecked);
      }
      if (!_options.hideInFilterHeaderRow) {
        const selectAllElm = _headerRowNode && _headerRowNode.querySelector(`#header-filter-selector${_selectAll_UID}`);
        if (selectAllElm) {
          selectAllElm.checked = _isSelectAllChecked;
        }
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
      if (_grid.getColumns()[args.cell].id === _options.columnId && e.target.type === 'checkbox') {
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
      let dataContext = _grid.getDataItem(row);
      if (!checkSelectableOverride(row, dataContext, _grid)) {
        return;
      }

      if (_selectedRowsLookup[row]) {
        const newSelectedRows = _grid.getSelectedRows().filter((n) => n !== row);
        _grid.setSelectedRows(newSelectedRows, 'click.toggle');
      } else {
        _grid.setSelectedRows(_grid.getSelectedRows().concat(row), "click.toggle");
      }
      _grid.setActiveCell(row, getCheckboxColumnCellIndex());
    }

    function selectRows(rowArray) {
      let i, l = rowArray.length, addRows = [];
      for (i = 0; i < l; i++) {
        if (!_selectedRowsLookup[rowArray[i]]) {
          addRows[addRows.length] = rowArray[i];
        }
      }
      _grid.setSelectedRows(_grid.getSelectedRows().concat(addRows), "SlickCheckboxSelectColumn.selectRows");
    }

    function deSelectRows(rowArray) {
      let i, l = rowArray.length, removeRows = [];
      for (i = 0; i < l; i++) {
        if (_selectedRowsLookup[rowArray[i]]) {
          removeRows[removeRows.length] = rowArray[i];
        }
      }

      _grid.setSelectedRows(_grid.getSelectedRows().filter((n) => removeRows.indexOf(n) < 0), 'SlickCheckboxSelectColumn.deSelectRows');
    }

    function handleHeaderClick(e, args) {
      if (args.column.id == _options.columnId && e.target.type === 'checkbox') {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        let isAllSelected = e.target.checked;
        let caller = isAllSelected ? 'click.selectAll' : 'click.unselectAll';
        let rows = [];

        if (isAllSelected) {
          for (let i = 0; i < _grid.getDataLength(); i++) {
            // Get the row and check it's a selectable row before pushing it onto the stack
            let rowItem = _grid.getDataItem(i);
            if (!rowItem.__group && !rowItem.__groupTotals && checkSelectableOverride(i, rowItem, _grid)) {
              rows.push(i);
            }
          }
          isAllSelected = true;
        }
        if (_isUsingDataView && _dataView && _options.applySelectOnAllPages) {
          let ids = [];
          let filteredItems = _dataView.getFilteredItems();
          for (let j = 0; j < filteredItems.length; j++) {
            // Get the row and check it's a selectable ID (it could be in a different page) before pushing it onto the stack
            let dataviewRowItem = filteredItems[j];
            if (checkSelectableOverride(j, dataviewRowItem, _grid)) {
              ids.push(dataviewRowItem[_dataView.getIdPropertyName()]);
            }
          }
          _dataView.setSelectedIds(ids, { isRowBeingAdded: isAllSelected });
        }
        _grid.setSelectedRows(rows, caller);
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    let _checkboxColumnCellIndex = null;

    function getCheckboxColumnCellIndex() {
      if (_checkboxColumnCellIndex === null) {
        _checkboxColumnCellIndex = 0;
        let colArr = _grid.getColumns();
        for (let i = 0; i < colArr.length; i++) {
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
        toolTip: (_options.hideSelectAllCheckbox || _options.hideInColumnTitleRow) ? "" : _options.toolTip,
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
      _handler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
        if (args.column.field === "sel") {
          Slick.Utils.emptyElement(args.node);
          const spanElm = document.createElement('span');
          spanElm.id = 'filter-checkbox-selectall-container';

          const inputElm = document.createElement('input');
          inputElm.type = 'checkbox';
          inputElm.id = `header-filter-selector${_selectAll_UID}`;

          const labelElm = document.createElement('label');
          labelElm.htmlFor = `header-filter-selector${_selectAll_UID}`;

          spanElm.appendChild(inputElm);
          spanElm.appendChild(labelElm);
          args.node.appendChild(spanElm);
          _headerRowNode = args.node;

          _bindingEventService.bind(spanElm, 'click', ((e) => handleHeaderClick(e, args)));
        }
      });
    }

    function createUID() {
      return Math.round(10000000 * Math.random());
    }

    function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext, grid) {
      let UID = createUID() + row;

      if (dataContext) {
        if (!checkSelectableOverride(row, dataContext, grid)) {
          return null;
        } else {
          return _selectedRowsLookup[row]
            ? "<input id='selector" + UID + "' type='checkbox' checked='checked'><label for='selector" + UID + "'></label>"
            : "<input id='selector" + UID + "' type='checkbox'><label for='selector" + UID + "'></label>";
        }
      }
      return null;
    }

    function checkSelectableOverride(row, dataContext, grid) {
      if (typeof _selectableOverride === 'function') {
        return _selectableOverride(row, dataContext, grid);
      }
      return true;
    }

    function renderSelectAllCheckbox(isSelectAllChecked) {
      if (isSelectAllChecked) {
        _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox' checked='checked'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
      } else {
        _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
      }
    }

    /**
     * Method that user can pass to override the default behavior or making every row a selectable row.
     * In order word, user can choose which rows to be selectable or not by providing his own logic.
     * @param overrideFn: override function callback
     */
    function selectableOverride(overrideFn) {
      _selectableOverride = overrideFn;
    }


    Slick.Utils.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "CheckboxSelectColumn",

      "deSelectRows": deSelectRows,
      "selectRows": selectRows,
      "getColumnDefinition": getColumnDefinition,
      "getOptions": getOptions,
      "selectableOverride": selectableOverride,
      "setOptions": setOptions,
    });
  }
})(window);