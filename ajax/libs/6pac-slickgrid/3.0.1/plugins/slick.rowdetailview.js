/***
 * A plugin to add row detail panel
 * Original StackOverflow question & article making this possible (thanks to violet313)
 * https://stackoverflow.com/questions/10535164/can-slickgrids-row-height-be-dynamically-altered#29399927
 * http://violet313.org/slickgrids/#intro
 *
 * USAGE:
 * Add the slick.rowDetailView.(js|css) files and register the plugin with the grid.
 *
 * AVAILABLE ROW DETAIL OPTIONS:
 *    cssClass:               A CSS class to be added to the row detail
 *    expandedClass:          Extra classes to be added to the expanded Toggle
 *    expandableOverride:     callback method that user can override the default behavior of making every row an expandable row (the logic to show or not the expandable icon).
 *    collapsedClass:         Extra classes to be added to the collapse Toggle
 *    loadOnce:               Defaults to false, when set to True it will load the data once and then reuse it.
 *    preTemplate:            Template that will be used before the async process (typically used to show a spinner/loading)
 *    postTemplate:           Template that will be loaded once the async function finishes
 *    process:                Async server function call
 *    panelRows:              Row count to use for the template panel
 *    singleRowExpand:        Defaults to false, limit expanded row to 1 at a time.
 *    useRowClick:            Boolean flag, when True will open the row detail on a row click (from any column), default to False
 *    keyPrefix:              Defaults to '_', prefix used for all the plugin metadata added to the item object (meta e.g.: padding, collapsed, parent)
 *    collapseAllOnSort:      Defaults to true, which will collapse all row detail views when user calls a sort. Unless user implements a sort to deal with padding
 *    saveDetailViewOnScroll: Defaults to true, which will save the row detail view in a cache when it detects that it will become out of the viewport buffer
 *    useSimpleViewportCalc:  Defaults to false, which will use simplified calculation of out or back of viewport visibility
 *
 * AVAILABLE PUBLIC METHODS:
 *    init:                 initiliaze the plugin
 *    expandableOverride:   callback method that user can override the default behavior of making every row an expandable row (the logic to show or not the expandable icon).
 *    destroy:              destroy the plugin and it's events
 *    collapseAll:          collapse all opened row detail panel
 *    collapseDetailView:   collapse a row by passing the item object (row detail)
 *    expandDetailView:     expand a row by passing the item object (row detail)
 *    getColumnDefinition:  get the column definitions
 *    getExpandedRows:      get all the expanded rows
 *    getFilterItem:        takes in the item we are filtering and if it is an expanded row returns it's parents row to filter on
 *    getOptions:           get current plugin options
 *    resizeDetailView:     resize a row detail view, it will auto-calculate the number of rows it needs
 *    saveDetailView:       save a row detail view content by passing the row object
 *    setOptions:           set or change some of the plugin options
 *
 * THE PLUGIN EXPOSES THE FOLLOWING SLICK EVENTS:
 *    onAsyncResponse:  This event must be used with the "notify" by the end user once the Asynchronous Server call returns the item detail
 *      Event args:
 *        item:         Item detail returned from the async server call
 *        detailView:   An explicit view to use instead of template (Optional)
 *
 *    onAsyncEndUpdate: Fired when the async response finished
 *      Event args:
 *        grid:         Reference to the grid.
 *        item:         Item data context
 *
 *    onBeforeRowDetailToggle: Fired before the row detail gets toggled
 *      Event args:
 *        grid:         Reference to the grid.
 *        item:         Item data context
 *
 *    onAfterRowDetailToggle: Fired after the row detail gets toggled
 *      Event args:
 *        grid:         Reference to the grid.
 *        item:         Item data context
 *        expandedRows: Array of the Expanded Rows
 *
 *    onRowOutOfViewportRange: Fired after a row becomes out of viewport range (user can't see the row anymore)
 *      Event args:
 *        grid:         Reference to the grid.
 *        item:         Item data context
 *        rowId:        Id of the Row object (datacontext) in the Grid
 *        rowIndex:     Index of the Row in the Grid
 *        expandedRows: Array of the Expanded Rows
 *        rowIdsOutOfViewport: Array of the Out of viewport Range Rows
 *
 *    onRowBackToViewportRange: Fired after the row detail gets toggled
 *      Event args:
 *        grid:         Reference to the grid.
 *        item:         Item data context
 *        rowId:        Id of the Row object (datacontext) in the Grid
 *        rowIndex:     Index of the Row in the Grid
 *        expandedRows: Array of the Expanded Rows
 *        rowIdsOutOfViewport: Array of the Out of viewport Range Rows
 */
(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Plugins": {
        "RowDetailView": RowDetailView
      }
    }
  });

  /** Constructor of the Row Detail View Plugin */
  function RowDetailView(options) {
    var _grid;
    var _gridOptions;
    var _gridUid;
    var _dataView;
    var _dataViewIdProperty = 'id';
    var _expandableOverride = null;
    var _self = this;
    var _lastRange = null;
    var _expandedRows = [];
    var _handler = new Slick.EventHandler();
    var _outsideRange = 5;
    var _visibleRenderedCellCount = 0;
    var _defaults = {
      columnId: '_detail_selector',
      cssClass: 'detailView-toggle',
      expandedClass: null,
      collapsedClass: null,
      keyPrefix: '_',
      loadOnce: false,
      collapseAllOnSort: true,
      saveDetailViewOnScroll: true,
      singleRowExpand: false,
      useSimpleViewportCalc: false,
      alwaysRenderColumn: true,
      toolTip: '',
      width: 30,
      maxRows: null
    };
    var _keyPrefix = _defaults.keyPrefix;
    var _gridRowBuffer = 0;
    var _rowIdsOutOfViewport = [];
    var _options = $.extend(true, {}, _defaults, options);

    // user could override the expandable icon logic from within the options or after instantiating the plugin
    if (typeof _options.expandableOverride === 'function') {
      expandableOverride(_options.expandableOverride);
    }

    /**
     * Initialize the plugin, which requires user to pass the SlickGrid Grid object
     * @param grid: SlickGrid Grid object
     */
    function init(grid) {
      if (!grid) {
        throw new Error('RowDetailView Plugin requires the Grid instance to be passed as argument to the "init()" method');
      }
      _grid = grid;
      _gridUid = grid.getUID();
      _gridOptions = grid.getOptions() || {};
      _dataView = _grid.getData();
      _keyPrefix = _options && _options.keyPrefix || '_';

      // Update the minRowBuffer so that the view doesn't disappear when it's at top of screen + the original default 3
      _gridRowBuffer = _grid.getOptions().minRowBuffer;
      _grid.getOptions().minRowBuffer = _options.panelRows + 3;

      _handler
        .subscribe(_grid.onClick, handleClick)
        .subscribe(_grid.onScroll, handleScroll);

      // Sort will, by default, Collapse all of the open items (unless user implements his own onSort which deals with open row and padding)
      if (_options.collapseAllOnSort) {
        _handler.subscribe(_grid.onSort, collapseAll);
        _expandedRows = [];
        _rowIdsOutOfViewport = [];
      }

      _handler.subscribe(_grid.getData().onRowCountChanged, function () {
        _grid.updateRowCount();
        _grid.render();
      });

      _handler.subscribe(_grid.getData().onRowsChanged, function (e, a) {
        _grid.invalidateRows(a.rows);
        _grid.render();
      });

      // subscribe to the onAsyncResponse so that the plugin knows when the user server side calls finished
      subscribeToOnAsyncResponse();

      // after data is set, let's get the DataView Id Property name used (defaults to "id")
      _handler.subscribe(_dataView.onSetItemsCalled, function (e, args) {
        _dataViewIdProperty = _dataView && _dataView.getIdPropertyName() || 'id';
      });

      // if we use the alternative & simpler calculation of the out of viewport range
      // we will need to know how many rows are rendered on the screen and we need to wait for grid to be rendered
      // unfortunately there is no triggered event for knowing when grid is finished, so we use 250ms delay and it's typically more than enough
      if (_options.useSimpleViewportCalc) {
        _handler.subscribe(_grid.onRendered, function (e, args) {
          if (args && args.endRow) {
            _visibleRenderedCellCount = args.endRow - args.startRow;
          }
        });
      }
    }

    /** destroy the plugin and it's events */
    function destroy() {
      _handler.unsubscribeAll();
      _self.onAsyncResponse.unsubscribe();
      _self.onAsyncEndUpdate.unsubscribe();
      _self.onAfterRowDetailToggle.unsubscribe();
      _self.onBeforeRowDetailToggle.unsubscribe();
      _self.onRowOutOfViewportRange.unsubscribe();
      _self.onRowBackToViewportRange.unsubscribe();
    }

    /** Get current plugin options */
    function getOptions() {
      return _options;
    }

    /** set or change some of the plugin options */
    function setOptions(options) {
      _options = $.extend(true, {}, _options, options);
      if (_options && _options.singleRowExpand) {
        collapseAll();
      }
    }

    /** Find a value in an array and return the index when (or -1 when not found) */
    function arrayFindIndex(sourceArray, value) {
      if (sourceArray) {
        for (var i = 0; i < sourceArray.length; i++) {
          if (sourceArray[i] === value) {
            return i;
          }
        }
      }
      return -1;
    }

    /** Handle mouse click event */
    function handleClick(e, args) {
      var dataContext = _grid.getDataItem(args.row);
      if (!checkExpandableOverride(args.row, dataContext, _grid)) {
        return;
      }

      // clicking on a row select checkbox
      if (_options.useRowClick || _grid.getColumns()[args.cell]['id'] === _options.columnId && $(e.target).hasClass(_options.cssClass)) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        // trigger an event before toggling
        _self.onBeforeRowDetailToggle.notify({
          'grid': _grid,
          'item': dataContext
        }, e, _self);

        toggleRowSelection(args.row, dataContext);

        // trigger an event after toggling
        _self.onAfterRowDetailToggle.notify({
          'grid': _grid,
          'item': dataContext,
          'expandedRows': _expandedRows,
        }, e, _self);

        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    /** If we scroll save detail views that go out of cache range */
    function handleScroll(e, args) {
      if (_options.useSimpleViewportCalc) {
        calculateOutOfRangeViewsSimplerVersion();
      } else {
        calculateOutOfRangeViews();
      }
    }

    /** Calculate when expanded rows become out of view range */
    function calculateOutOfRangeViews() {
      if (_grid) {
        var renderedRange = _grid.getRenderedRange();
        // Only check if we have expanded rows
        if (_expandedRows.length > 0) {
          // Assume scroll direction is down by default.
          var scrollDir = 'DOWN';
          if (_lastRange) {
            // Some scrolling isn't anything as the range is the same
            if (_lastRange.top === renderedRange.top && _lastRange.bottom === renderedRange.bottom) {
              return;
            }

            // If our new top is smaller we are scrolling up
            if (_lastRange.top > renderedRange.top ||
              // Or we are at very top but our bottom is increasing
              (_lastRange.top === 0 && renderedRange.top === 0) && _lastRange.bottom > renderedRange.bottom) {
              scrollDir = 'UP';
            }
          }
        }

        _expandedRows.forEach(function (row) {
          var rowIndex = _dataView.getRowById(row[_dataViewIdProperty]);

          var rowPadding = row[_keyPrefix + 'sizePadding'];
          var rowOutOfRange = arrayFindIndex(_rowIdsOutOfViewport, row[_dataViewIdProperty]) >= 0;

          if (scrollDir === 'UP') {
            // save the view when asked
            if (_options.saveDetailViewOnScroll) {
              // If the bottom item within buffer range is an expanded row save it.
              if (rowIndex >= renderedRange.bottom - _gridRowBuffer) {
                saveDetailView(row);
              }
            }

            // If the row expanded area is within the buffer notify that it is back in range
            if (rowOutOfRange && rowIndex - _outsideRange < renderedRange.top && rowIndex >= renderedRange.top) {
              notifyBackToViewportWhenDomExist(row, row[_dataViewIdProperty]);
            }

            // if our first expanded row is about to go off the bottom
            else if (!rowOutOfRange && (rowIndex + rowPadding) > renderedRange.bottom) {
              notifyOutOfViewport(row, row[_dataViewIdProperty]);
            }
          }
          else if (scrollDir === 'DOWN') {
            // save the view when asked
            if (_options.saveDetailViewOnScroll) {
              // If the top item within buffer range is an expanded row save it.
              if (rowIndex <= renderedRange.top + _gridRowBuffer) {
                saveDetailView(row);
              }
            }

            // If row index is i higher than bottom with some added value (To ignore top rows off view) and is with view and was our of range
            if (rowOutOfRange && (rowIndex + rowPadding + _outsideRange) > renderedRange.bottom && rowIndex < rowIndex + rowPadding) {
              notifyBackToViewportWhenDomExist(row, row[_dataViewIdProperty]);
            }

            // if our row is outside top of and the buffering zone but not in the array of outOfVisable range notify it
            else if (!rowOutOfRange && rowIndex < renderedRange.top) {
              notifyOutOfViewport(row, row[_dataViewIdProperty]);
            }
          }
        });
        _lastRange = renderedRange;
      }
    }

    /** This is an alternative & more simpler version of the Calculate when expanded rows become out of view range */
    function calculateOutOfRangeViewsSimplerVersion() {
      if (_grid) {
        var renderedRange = _grid.getRenderedRange();

        _expandedRows.forEach(function (row) {
          var rowIndex = _dataView.getRowById(row[_dataViewIdProperty]);
          var isOutOfVisibility = checkIsRowOutOfViewportRange(rowIndex, renderedRange);
          if (!isOutOfVisibility && arrayFindIndex(_rowIdsOutOfViewport, row[_dataViewIdProperty]) >= 0) {
            notifyBackToViewportWhenDomExist(row, row[_dataViewIdProperty]);
          } else if (isOutOfVisibility) {
            notifyOutOfViewport(row, row[_dataViewIdProperty]);
          }
        });
      }
    }

	  /**
     * Check if the row became out of visible range (when user can't see it anymore)
     * @param rowIndex
     * @param renderedRange from SlickGrid
     */
    function checkIsRowOutOfViewportRange(rowIndex, renderedRange) {
      if (Math.abs(renderedRange.bottom - _gridRowBuffer - rowIndex) > _visibleRenderedCellCount * 2) {
        return true;
      }
      return false;
    }

    /** Send a notification, through "onRowOutOfViewportRange", that is out of the viewport range */
    function notifyOutOfViewport(item, rowId) {
      var rowIndex = item.rowIndex || _dataView.getRowById(item[_dataViewIdProperty]);

      _self.onRowOutOfViewportRange.notify({
        'grid': _grid,
        'item': item,
        'rowId': rowId,
        'rowIndex': rowIndex,
        'expandedRows': _expandedRows,
        'rowIdsOutOfViewport': syncOutOfViewportArray(rowId, true)
      }, null, _self);
    }

    /** Send a notification, through "onRowBackToViewportRange", that a row came back to the viewport */
    function notifyBackToViewportWhenDomExist(item, rowId) {
      var rowIndex = item.rowIndex || _dataView.getRowById(item[_dataViewIdProperty]);

      setTimeout(function () {
        // make sure View Row DOM Element really exist before notifying that it's a row that is visible again
        if ($('.cellDetailView_' + item[_dataViewIdProperty]).length) {
          _self.onRowBackToViewportRange.notify({
            'grid': _grid,
            'item': item,
            'rowId': rowId,
            'rowIndex': rowIndex,
            'expandedRows': _expandedRows,
            'rowIdsOutOfViewport': syncOutOfViewportArray(rowId, false)
          }, null, _self);
        }
      }, 100);
    }

    /**
     * This function will sync the out of viewport array whenever necessary.
     * The sync can add a row (when necessary, no need to add again if it already exist) or delete a row from the array.
     * @param rowId: number
     * @param isAdding: are we adding or removing a row?
     */
    function syncOutOfViewportArray(rowId, isAdding) {
      var arrayRowIndex = arrayFindIndex(_rowIdsOutOfViewport, rowId);

      if (isAdding && arrayRowIndex < 0) {
        _rowIdsOutOfViewport.push(rowId);
      } else if (!isAdding && arrayRowIndex >= 0) {
        _rowIdsOutOfViewport.splice(arrayRowIndex, 1);
      }
      return _rowIdsOutOfViewport;
    }

    // Toggle between showing and hiding a row
    function toggleRowSelection(rowNumber, dataContext) {
      if (!checkExpandableOverride(rowNumber, dataContext, _grid)) {
        return;
      }

      _dataView.beginUpdate();
      handleAccordionShowHide(dataContext);
      _dataView.endUpdate();
    }

    /** Collapse all of the open items */
    function collapseAll() {
      _dataView.beginUpdate();
      for (var i = _expandedRows.length - 1; i >= 0; i--) {
        collapseDetailView(_expandedRows[i], true);
      }
      _dataView.endUpdate();
    }

    /** Colapse an Item so it is not longer seen */
    function collapseDetailView(item, isMultipleCollapsing) {
      if (!isMultipleCollapsing) {
        _dataView.beginUpdate();
      }
      // Save the details on the collapse assuming onetime loading
      if (_options.loadOnce) {
        saveDetailView(item);
      }

      item[_keyPrefix + 'collapsed'] = true;
      for (var idx = 1; idx <= item[_keyPrefix + 'sizePadding']; idx++) {
        _dataView.deleteItem(item[_dataViewIdProperty] + '.' + idx);
      }
      item[_keyPrefix + 'sizePadding'] = 0;
      _dataView.updateItem(item[_dataViewIdProperty], item);

      // Remove the item from the expandedRows
      _expandedRows = _expandedRows.filter(function (r) {
        return r[_dataViewIdProperty] !== item[_dataViewIdProperty];
      });

      if (!isMultipleCollapsing) {
        _dataView.endUpdate();
      }
    }

    /** Expand a row given the dataview item that is to be expanded */
    function expandDetailView(item) {
      if (_options && _options.singleRowExpand) {
        collapseAll();
      }

      item[_keyPrefix + 'collapsed'] = false;
      _expandedRows.push(item);

      // In the case something went wrong loading it the first time such a scroll of screen before loaded
      if (!item[_keyPrefix + 'detailContent']) item[_keyPrefix + 'detailViewLoaded'] = false;

      // display pre-loading template
      if (!item[_keyPrefix + 'detailViewLoaded'] || _options.loadOnce !== true) {
        item[_keyPrefix + 'detailContent'] = _options.preTemplate(item);
      } else {
        _self.onAsyncResponse.notify({
          'item': item,
          'itemDetail': item,
          'detailView': item[_keyPrefix + 'detailContent']
        }, undefined, this);
        applyTemplateNewLineHeight(item);
        _dataView.updateItem(item[_dataViewIdProperty], item);

        return;
      }

      applyTemplateNewLineHeight(item);
      _dataView.updateItem(item[_dataViewIdProperty], item);

      // async server call
      _options.process(item);
    }

    /** Saves the current state of the detail view */
    function saveDetailView(item) {
      var view = $('.' + _gridUid + ' .innerDetailView_' + item[_dataViewIdProperty]);
      if (view) {
        var html = $('.' + _gridUid + ' .innerDetailView_' + item[_dataViewIdProperty]).html();
        if (html !== undefined) {
          item[_keyPrefix + 'detailContent'] = html;
        }
      }
    }

    /**
     * subscribe to the onAsyncResponse so that the plugin knows when the user server side calls finished
     * the response has to be as "args.item" (or "args.itemDetail") with it's data back
     */
    function subscribeToOnAsyncResponse() {
      _self.onAsyncResponse.subscribe(function (e, args) {
        if (!args || (!args.item && !args.itemDetail)) {
          throw 'Slick.RowDetailView plugin requires the onAsyncResponse() to supply "args.item" property.';
        }

        // we accept item/itemDetail, just get the one which has data
        var itemDetail = args.item || args.itemDetail;

        // If we just want to load in a view directly we can use detailView property to do so
        if (args.detailView) {
          itemDetail[_keyPrefix + 'detailContent'] = args.detailView;
        } else {
          itemDetail[_keyPrefix + 'detailContent'] = _options.postTemplate(itemDetail);
        }

        itemDetail[_keyPrefix + 'detailViewLoaded'] = true;
        _dataView.updateItem(itemDetail[_dataViewIdProperty], itemDetail);

        // trigger an event once the post template is finished loading
        _self.onAsyncEndUpdate.notify({
          'grid': _grid,
          'item': itemDetail,
          'itemDetail': itemDetail
        }, e, _self);
      });
    }

    /** When row is getting toggled, we will handle the action of collapsing/expanding */
    function handleAccordionShowHide(item) {
      if (item) {
        if (!item[_keyPrefix + 'collapsed']) {
          collapseDetailView(item);
        } else {
          expandDetailView(item);
        }
      }
    }

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    /** Get the Row Detail padding (which are the rows dedicated to the detail panel) */
    var getPaddingItem = function (parent, offset) {
      var item = {};

      for (var prop in _grid.getData()) {
        item[prop] = null;
      }
      item[_dataViewIdProperty] = parent[_dataViewIdProperty] + '.' + offset;

      // additional hidden padding metadata fields
      item[_keyPrefix + 'collapsed'] = true;
      item[_keyPrefix + 'isPadding'] = true;
      item[_keyPrefix + 'parent'] = parent;
      item[_keyPrefix + 'offset'] = offset;

      return item;
    };

    //////////////////////////////////////////////////////////////
    // create the detail ctr node. this belongs to the dev & can be custom-styled as per
    //////////////////////////////////////////////////////////////
    function applyTemplateNewLineHeight(item) {
      // the height is calculated by the template row count (how many line of items does the template view have)
      var rowCount = _options.panelRows;

      // calculate padding requirements based on detail-content..
      // ie. worst-case: create an invisible dom node now & find it's height.
      var lineHeight = 13; // we know cuz we wrote the custom css init ;)
      item[_keyPrefix + 'sizePadding'] = Math.ceil(((rowCount * 2) * lineHeight) / _gridOptions.rowHeight);
      item[_keyPrefix + 'height'] = (item[_keyPrefix + 'sizePadding'] * _gridOptions.rowHeight);
      var idxParent = _dataView.getIdxById(item[_dataViewIdProperty]);
      for (var idx = 1; idx <= item[_keyPrefix + 'sizePadding']; idx++) {
        _dataView.insertItem(idxParent + idx, getPaddingItem(item, idx));
      }
    }

    /** Get the Column Definition of the first column dedicated to toggling the Row Detail View */
    function getColumnDefinition() {
      return {
        id: _options.columnId,
        name: '',
        toolTip: _options.toolTip,
        field: 'sel',
        width: _options.width,
        resizable: false,
        sortable: false,
        alwaysRenderColumn: _options.alwaysRenderColumn,
        cssClass: _options.cssClass,
        formatter: detailSelectionFormatter
      };
    }

    /** return the currently expanded rows */
    function getExpandedRows() {
      return _expandedRows;
    }

    /** The Formatter of the toggling icon of the Row Detail */
    function detailSelectionFormatter(row, cell, value, columnDef, dataContext, grid) {
      if (!checkExpandableOverride(row, dataContext, grid)) {
        return null;
      } else {
        if (dataContext[_keyPrefix + 'collapsed'] == undefined) {
          dataContext[_keyPrefix + 'collapsed'] = true;
          dataContext[_keyPrefix + 'sizePadding'] = 0;     //the required number of pading rows
          dataContext[_keyPrefix + 'height'] = 0;     //the actual height in pixels of the detail field
          dataContext[_keyPrefix + 'isPadding'] = false;
          dataContext[_keyPrefix + 'parent'] = undefined;
          dataContext[_keyPrefix + 'offset'] = 0;
        }

        if (dataContext[_keyPrefix + 'isPadding']) {
          // render nothing
        }
        else if (dataContext[_keyPrefix + 'collapsed']) {
          var collapsedClasses = _options.cssClass + ' expand ';
          if (_options.collapsedClass) {
            collapsedClasses += _options.collapsedClass;
          }
          return '<div class="' + collapsedClasses + '"></div>';
        }
        else {
          var html = [];
          var rowHeight = _gridOptions.rowHeight;

          var outterHeight = dataContext[_keyPrefix + 'sizePadding'] * _gridOptions.rowHeight;
          if (_options.maxRows !== null && dataContext[_keyPrefix + 'sizePadding'] > _options.maxRows) {
            outterHeight = _options.maxRows * rowHeight;
            dataContext[_keyPrefix + 'sizePadding'] = _options.maxRows;
          }

          //V313HAX:
          //putting in an extra closing div after the closing toggle div and ommiting a
          //final closing div for the detail ctr div causes the slickgrid renderer to
          //insert our detail div as a new column ;) ~since it wraps whatever we provide
          //in a generic div column container. so our detail becomes a child directly of
          //the row not the cell. nice =)  ~no need to apply a css change to the parent
          //slick-cell to escape the cell overflow clipping.

          //sneaky extra </div> inserted here-----------------v
          var expandedClasses = _options.cssClass + ' collapse ';
          if (_options.expandedClass) expandedClasses += _options.expandedClass;
          html.push('<div class="' + expandedClasses + '"></div></div>');

          html.push('<div class="dynamic-cell-detail cellDetailView_', dataContext[_dataViewIdProperty], '" ');   //apply custom css to detail
          html.push('style="height:', outterHeight, 'px;'); //set total height of padding
          html.push('top:', rowHeight, 'px">');             //shift detail below 1st row
          html.push('<div class="detail-container detailViewContainer_', dataContext[_dataViewIdProperty], '">'); //sub ctr for custom styling
          html.push('<div class="innerDetailView_', dataContext[_dataViewIdProperty], '">', dataContext[_keyPrefix + 'detailContent'], '</div></div>');
          // &omit a final closing detail container </div> that would come next

          return html.join('');
        }
      }
      return null;
    }

    /** Resize the Row Detail View */
    function resizeDetailView(item) {
      if (!item) {
        return;
      }

      // Grad each of the DOM elements
      var mainContainer = document.querySelector('.' + _gridUid + ' .detailViewContainer_' + item[_dataViewIdProperty]);
      var cellItem = document.querySelector('.' + _gridUid + ' .cellDetailView_' + item[_dataViewIdProperty]);
      var inner = document.querySelector('.' + _gridUid + ' .innerDetailView_' + item[_dataViewIdProperty]);

      if (!mainContainer || !cellItem || !inner) {
        return;
      }

      for (var idx = 1; idx <= item[_keyPrefix + 'sizePadding']; idx++) {
        _dataView.deleteItem(item[_dataViewIdProperty] + '.' + idx);
      }

      var rowHeight = _gridOptions.rowHeight; // height of a row
      var lineHeight = 13; // we know cuz we wrote the custom css innit ;)

      // remove the height so we can calculate the height
      mainContainer.style.minHeight = null;

      // Get the scroll height for the main container so we know the actual size of the view
      var itemHeight = mainContainer.scrollHeight;

      // Now work out how many rows
      var rowCount = Math.ceil(itemHeight / rowHeight);

      item[_keyPrefix + 'sizePadding'] = Math.ceil(((rowCount * 2) * lineHeight) / rowHeight);
      item[_keyPrefix + 'height'] = itemHeight;

      var outterHeight = (item[_keyPrefix + 'sizePadding'] * rowHeight);
      if (_options.maxRows !== null && item[_keyPrefix + 'sizePadding'] > _options.maxRows) {
        outterHeight = _options.maxRows * rowHeight;
        item[_keyPrefix + 'sizePadding'] = _options.maxRows;
      }

      // If the padding is now more than the original minRowBuff we need to increase it
      if (_grid.getOptions().minRowBuffer < item[_keyPrefix + 'sizePadding']) {
        // Update the minRowBuffer so that the view doesn't disappear when it's at top of screen + the original default 3
        _grid.getOptions().minRowBuffer = item[_keyPrefix + 'sizePadding'] + 3;
      }

      mainContainer.setAttribute('style', 'min-height: ' + item[_keyPrefix + 'height'] + 'px');
      if (cellItem) cellItem.setAttribute('style', 'height: ' + outterHeight + 'px; top:' + rowHeight + 'px');

      var idxParent = _dataView.getIdxById(item[_dataViewIdProperty]);
      for (var idx = 1; idx <= item[_keyPrefix + 'sizePadding']; idx++) {
        _dataView.insertItem(idxParent + idx, getPaddingItem(item, idx));
      }

      // Lastly save the updated state
      saveDetailView(item);
    }

    /** Takes in the item we are filtering and if it is an expanded row returns it's parents row to filter on */
    function getFilterItem(item) {
      if (item[_keyPrefix + 'isPadding'] && item[_keyPrefix + 'parent']) {
        item = item[_keyPrefix + 'parent'];
      }
      return item;
    }

    function checkExpandableOverride(row, dataContext, grid) {
      if (typeof _expandableOverride === 'function') {
        return _expandableOverride(row, dataContext, grid);
      }
      return true;
    }

    /**
     * Method that user can pass to override the default behavior or making every row an expandable row.
     * In order word, user can choose which rows to be an available row detail (or not) by providing his own logic.
     * @param overrideFn: override function callback
     */
    function expandableOverride(overrideFn) {
      _expandableOverride = overrideFn;
    }

    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "RowDetailView",

      "collapseAll": collapseAll,
      "collapseDetailView": collapseDetailView,
      "expandDetailView": expandDetailView,
      "expandableOverride": expandableOverride,
      "getColumnDefinition": getColumnDefinition,
      "getExpandedRows": getExpandedRows,
      "getFilterItem": getFilterItem,
      "getOptions": getOptions,
      "resizeDetailView": resizeDetailView,
      "saveDetailView": saveDetailView,
      "setOptions": setOptions,

      // events
      "onAsyncResponse": new Slick.Event(),
      "onAsyncEndUpdate": new Slick.Event(),
      "onAfterRowDetailToggle": new Slick.Event(),
      "onBeforeRowDetailToggle": new Slick.Event(),
      "onRowOutOfViewportRange": new Slick.Event(),
      "onRowBackToViewportRange": new Slick.Event()
    });
  }
})(jQuery);
