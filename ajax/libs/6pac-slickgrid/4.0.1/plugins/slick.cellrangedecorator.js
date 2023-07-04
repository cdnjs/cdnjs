(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "CellRangeDecorator": CellRangeDecorator
    }
  });

  /***
   * Displays an overlay on top of a given cell range.
   *
   * TODO:
   * Currently, it blocks mouse events to DOM nodes behind it.
   * Use FF and WebKit-specific "pointer-events" CSS style, or some kind of event forwarding.
   * Could also construct the borders separately using 4 individual DIVs.
   *
   * @param {Grid} grid
   * @param {Object} options
   */
  function CellRangeDecorator(grid, options) {
    var _elem;
    var _defaults = {
      selectionCssClass: 'slick-range-decorator',
      selectionCss: {
        "zIndex": "9999",
        "border": "2px dashed red"
      },
      offset: { top: -1, left: -1, height: -2, width: -2 }
    };

    options = Slick.Utils.extend(true, {}, _defaults, options);

    function show(range) {
      if (!_elem) {
        _elem = document.createElement('div')
        _elem.className = options.selectionCssClass;
        Object.keys(options.selectionCss).forEach((cssStyleKey) => {
          _elem.style[cssStyleKey] = options.selectionCss[cssStyleKey];
        });
        _elem.style.position = 'absolute';
        const canvasNode = grid.getActiveCanvasNode();
        if (canvasNode) {
          canvasNode.appendChild(_elem);
        }
      }

      var from = grid.getCellNodeBox(range.fromRow, range.fromCell);
      var to = grid.getCellNodeBox(range.toRow, range.toCell);

      if (from && to && options && options.offset) {
        _elem.style.top = `${from.top + options.offset.top}px`;
        _elem.style.left = `${from.left + options.offset.left}px`;
        _elem.style.height = `${to.bottom - from.top + options.offset.height}px`;
        _elem.style.width = `${to.right - from.left + options.offset.width}px`;
      }

      return _elem;
    }

    function destroy() {
      hide();
    }

    function hide() {
      if (_elem) {
        _elem.remove();
        _elem = null;
      }
    }

    Slick.Utils.extend(this, {
      "pluginName": "CellRangeDecorator",
      "show": show,
      "hide": hide,
      "destroy": destroy
    });
  }
})(window);
