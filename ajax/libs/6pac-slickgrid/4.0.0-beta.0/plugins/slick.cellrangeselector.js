(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "CellRangeSelector": CellRangeSelector
    }
  });

  function CellRangeSelector(options) {
    var _grid;
    var _currentlySelectedRange;
    var _canvas;
    var _gridOptions;
    var _activeCanvas;
    var _dragging;
    var _decorator;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _defaults = {
      autoScroll: true,
      minIntervalToShowNextCell: 30,
      maxIntervalToShowNextCell: 600, // better to a multiple of minIntervalToShowNextCell
      accelerateInterval: 5,          // increase 5ms when cursor 1px outside the viewport.
      selectionCss: {
        "border": "2px dashed blue"
      }
    };

    // Frozen row & column variables
    var _rowOffset;
    var _columnOffset;
    var _isRightCanvas;
    var _isBottomCanvas;

    // autoScroll related variables
    var _activeViewport;
    var _viewportWidth;
    var _viewportHeight;
    var _draggingMouseOffset;
    var _moveDistanceForOneCell;
    var _autoScrollTimerId;
    var _xDelayForNextCell;
    var _yDelayForNextCell;
    var _isRowMoveRegistered = false;

    // Scrollings
    var _scrollTop = 0;
    var _scrollLeft = 0;

    function init(grid) {
      if (typeof Slick.Draggable === "undefined") {
        throw new Error('Slick.Draggable is undefined, make sure to import "slick.interactions.js"');
      }

      options = Slick.Utils.extend(true, {}, _defaults, options);
      _decorator = options.cellDecorator || new Slick.CellRangeDecorator(grid, options);
      _grid = grid;
      _canvas = _grid.getCanvasNode();
      _gridOptions = _grid.getOptions();
      _handler
        .subscribe(_grid.onScroll, handleScroll)
        .subscribe(_grid.onDragInit, handleDragInit)
        .subscribe(_grid.onDragStart, handleDragStart)
        .subscribe(_grid.onDrag, handleDrag)
        .subscribe(_grid.onDragEnd, handleDragEnd);
    }

    function destroy() {
      _handler.unsubscribeAll();
      _activeCanvas = null;
      _activeViewport = null;
      _canvas = null;
      if (_decorator && _decorator.destroy) {
        _decorator.destroy();
      }
    }

    function getCellDecorator() {
      return _decorator;
    }

    function handleScroll(e, args) {
      _scrollTop = args.scrollTop;
      _scrollLeft = args.scrollLeft;
    }

    function handleDragInit(e) {
      // Set the active canvas node because the decorator needs to append its
      // box to the correct canvas
      _activeCanvas = _grid.getActiveCanvasNode(e);
      _activeViewport = _grid.getActiveViewportNode(e);

      var scrollbarDimensions = _grid.getDisplayedScrollbarDimensions()
      _viewportWidth = _activeViewport.offsetWidth - scrollbarDimensions.width;
      _viewportHeight = _activeViewport.offsetHeight - scrollbarDimensions.height;

      _moveDistanceForOneCell = {
        x: _grid.getAbsoluteColumnMinWidth() / 2,
        y: _grid.getOptions().rowHeight / 2
      }
      _isRowMoveRegistered = hasRowMoveManager();

      _rowOffset = 0;
      _columnOffset = 0;
      _isBottomCanvas = _activeCanvas.classList.contains('grid-canvas-bottom');

      if (_gridOptions.frozenRow > -1 && _isBottomCanvas) {
        const canvasSelector = `.${_grid.getUID()} .grid-canvas-${_gridOptions.frozenBottom ? 'bottom' : 'top'}`;
        const canvasElm = document.querySelector(canvasSelector);
        if (canvasElm) {
          _rowOffset = canvasElm.clientHeight || 0;
        }
      }

      _isRightCanvas = _activeCanvas.classList.contains('grid-canvas-right');

      if (_gridOptions.frozenColumn > -1 && _isRightCanvas) {
        const canvasLeftElm = document.querySelector(`.${_grid.getUID()} .grid-canvas-left`);
        if (canvasLeftElm) {
          _columnOffset = canvasLeftElm.clientWidth || 0;
        }
      }

      // prevent the grid from cancelling drag'n'drop by default
      e.stopImmediatePropagation();
      e.preventDefault();
    }

    function handleDragStart(e, dd) {
      var cell = _grid.getCellFromEvent(e);
      if (_self.onBeforeCellRangeSelected.notify(cell) !== false) {
        if (_grid.canCellBeSelected(cell.row, cell.cell)) {
          _dragging = true;
          e.stopImmediatePropagation();
        }
      }
      if (!_dragging) {
        return;
      }

      _grid.focus();

      let canvasOffset = Slick.Utils.offset(_canvas);

      let startX = dd.startX - (canvasOffset.left || 0);
      if (_gridOptions.frozenColumn >= 0 && _isRightCanvas) {
        startX += _scrollLeft;
      }

      let startY = dd.startY - (canvasOffset.top || 0);
      if (_gridOptions.frozenRow >= 0 && _isBottomCanvas) {
        startY += _scrollTop;
      }

      var start = _grid.getCellFromPoint(startX, startY);

      dd.range = { start: start, end: {} };
      _currentlySelectedRange = dd.range;
      return _decorator.show(new Slick.Range(start.row, start.cell));
    }

    function handleDrag(evt, dd) {
      if (!_dragging && !_isRowMoveRegistered) {
        return;
      }
      if (!_isRowMoveRegistered) {
        evt.stopImmediatePropagation();
      }

      const e = evt.getNativeEvent();
      if (options.autoScroll) {
        _draggingMouseOffset = getMouseOffsetViewport(e, dd);
        if (_draggingMouseOffset.isOutsideViewport) {
          return handleDragOutsideViewport();
        }
      }
      stopIntervalTimer();
      handleDragTo(e, dd);
    }

    function getMouseOffsetViewport(e, dd) {
      var targetEvent = e.touches ? e.touches[0] : e;
      var viewportLeft = _activeViewport.scrollLeft;
      var viewportTop = _activeViewport.scrollTop;
      var viewportRight = viewportLeft + _viewportWidth;
      var viewportBottom = viewportTop + _viewportHeight;

      var viewportOffset = Slick.Utils.offset(_activeViewport);
      var viewportOffsetLeft = viewportOffset.left || 0;
      var viewportOffsetTop = viewportOffset.top || 0;
      var viewportOffsetRight = viewportOffsetLeft + _viewportWidth;
      var viewportOffsetBottom = viewportOffsetTop + _viewportHeight;

      var result = {
        e: e,
        dd: dd,
        viewport: {
          left: viewportLeft,
          top: viewportTop,
          right: viewportRight,
          bottom: viewportBottom,
          offset: {
            left: viewportOffsetLeft,
            top: viewportOffsetTop,
            right: viewportOffsetRight,
            bottom: viewportOffsetBottom
          }
        },
        // Consider the viewport as the origin, the `offset` is based on the coordinate system:
        // the cursor is on the viewport's left/bottom when it is less than 0, and on the right/top when greater than 0.
        offset: {
          x: 0,
          y: 0
        },
        isOutsideViewport: false
      }
      // ... horizontal
      if (targetEvent.pageX < viewportOffsetLeft) {
        result.offset.x = targetEvent.pageX - viewportOffsetLeft;
      } else if (targetEvent.pageX > viewportOffsetRight) {
        result.offset.x = targetEvent.pageX - viewportOffsetRight;
      }
      // ... vertical
      if (targetEvent.pageY < viewportOffsetTop) {
        result.offset.y = viewportOffsetTop - targetEvent.pageY;
      } else if (targetEvent.pageY > viewportOffsetBottom) {
        result.offset.y = viewportOffsetBottom - targetEvent.pageY;
      }
      result.isOutsideViewport = !!result.offset.x || !!result.offset.y;
      return result;
    }

    function handleDragOutsideViewport() {
      _xDelayForNextCell = options.maxIntervalToShowNextCell - Math.abs(_draggingMouseOffset.offset.x) * options.accelerateInterval;
      _yDelayForNextCell = options.maxIntervalToShowNextCell - Math.abs(_draggingMouseOffset.offset.y) * options.accelerateInterval;
      // only one timer is created to handle the case that cursor outside the viewport
      if (!_autoScrollTimerId) {
        var xTotalDelay = 0;
        var yTotalDelay = 0;
        _autoScrollTimerId = setInterval(function () {
          var xNeedUpdate = false;
          var yNeedUpdate = false;
          // ... horizontal
          if (_draggingMouseOffset.offset.x) {
            xTotalDelay += options.minIntervalToShowNextCell;
            xNeedUpdate = xTotalDelay >= _xDelayForNextCell;
          } else {
            xTotalDelay = 0;
          }
          // ... vertical
          if (_draggingMouseOffset.offset.y) {
            yTotalDelay += options.minIntervalToShowNextCell;
            yNeedUpdate = yTotalDelay >= _yDelayForNextCell;
          } else {
            yTotalDelay = 0;
          }
          if (xNeedUpdate || yNeedUpdate) {
            if (xNeedUpdate) {
              xTotalDelay = 0;
            }
            if (yNeedUpdate) {
              yTotalDelay = 0;
            }
            handleDragToNewPosition(xNeedUpdate, yNeedUpdate);
          }
        }, options.minIntervalToShowNextCell);
      }
    }

    function handleDragToNewPosition(xNeedUpdate, yNeedUpdate) {
      var pageX = _draggingMouseOffset.e.pageX;
      var pageY = _draggingMouseOffset.e.pageY;
      var mouseOffsetX = _draggingMouseOffset.offset.x;
      var mouseOffsetY = _draggingMouseOffset.offset.y;
      var viewportOffset = _draggingMouseOffset.viewport.offset;
      // ... horizontal
      if (xNeedUpdate && mouseOffsetX) {
        if (mouseOffsetX > 0) {
          pageX = viewportOffset.right + _moveDistanceForOneCell.x;
        } else {
          pageX = viewportOffset.left - _moveDistanceForOneCell.x;
        }
      }
      // ... vertical
      if (yNeedUpdate && mouseOffsetY) {
        if (mouseOffsetY > 0) {
          pageY = viewportOffset.top - _moveDistanceForOneCell.y;
        } else {
          pageY = viewportOffset.bottom + _moveDistanceForOneCell.y;
        }
      }
      handleDragTo({
        pageX: pageX,
        pageY: pageY
      }, _draggingMouseOffset.dd);
    }

    function stopIntervalTimer() {
      clearInterval(_autoScrollTimerId);
      _autoScrollTimerId = null;
    }

    function handleDragTo(e, dd) {
      let targetEvent = e.touches ? e.touches[0] : e;
      let canvasOffset = Slick.Utils.offset(_activeCanvas);
      let end = _grid.getCellFromPoint(
        targetEvent.pageX - (canvasOffset && canvasOffset.left || 0) + _columnOffset,
        targetEvent.pageY - (canvasOffset && canvasOffset.top || 0) + _rowOffset
      );

      // ... frozen column(s),
      if ( _gridOptions.frozenColumn >= 0 && (!_isRightCanvas && (end.cell > _gridOptions.frozenColumn)) || (_isRightCanvas && (end.cell <= _gridOptions.frozenColumn)) ) {
        return;
      }

      // ... or frozen row(s)
      if ( _gridOptions.frozenRow >= 0 && (!_isBottomCanvas && (end.row >= _gridOptions.frozenRow)) || (_isBottomCanvas && (end.row < _gridOptions.frozenRow)) ) {
        return;
      }

      // scrolling the viewport to display the target `end` cell if it is not fully displayed
      if (options.autoScroll && _draggingMouseOffset) {
        var endCellBox = _grid.getCellNodeBox(end.row, end.cell);
        if (!endCellBox) {
          return;
        }
        var viewport = _draggingMouseOffset.viewport;
        if (endCellBox.left < viewport.left || endCellBox.right > viewport.right
          || endCellBox.top < viewport.top || endCellBox.bottom > viewport.bottom) {
          _grid.scrollCellIntoView(end.row, end.cell);
        }
      }

      // ... or regular grid (without any frozen options)
      if (!_grid.canCellBeSelected(end.row, end.cell)) {
        return;
      }

      if (dd && dd.range) {
        dd.range.end = end;

        var range = new Slick.Range(dd.range.start.row, dd.range.start.cell, end.row, end.cell);
        _decorator.show(range);
        _self.onCellRangeSelecting.notify({
          range: range
        });
      }
    }

    function hasRowMoveManager() {
      return !!(_grid.getPluginByName('RowMoveManager') || _grid.getPluginByName('CrossGridRowMoveManager'));
    }

    function handleDragEnd(e, dd) {
      if (!_dragging) {
        return;
      }

      _dragging = false;
      e.stopImmediatePropagation();

      stopIntervalTimer();
      _decorator.hide();
      _self.onCellRangeSelected.notify({
        range: new Slick.Range(
          dd.range.start.row,
          dd.range.start.cell,
          dd.range.end.row,
          dd.range.end.cell
        )
      });
    }

    function getCurrentRange() {
      return _currentlySelectedRange;
    }

    Slick.Utils.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "CellRangeSelector",

      "getCellDecorator": getCellDecorator,
      "getCurrentRange": getCurrentRange,

      "onBeforeCellRangeSelected": new Slick.Event(),
      "onCellRangeSelected": new Slick.Event(),
      "onCellRangeSelecting": new Slick.Event()
    });
  }
})(window);
