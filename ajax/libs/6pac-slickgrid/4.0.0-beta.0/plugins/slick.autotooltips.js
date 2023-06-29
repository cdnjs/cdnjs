(function (window) {
  // Register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "AutoTooltips": AutoTooltips
    }
  });

  /**
   * AutoTooltips plugin to show/hide tooltips when columns are too narrow to fit content.
   * @constructor
   * @param {boolean} [options.enableForCells=true]        - Enable tooltip for grid cells
   * @param {boolean} [options.enableForHeaderCells=false] - Enable tooltip for header cells
   * @param {number}  [options.maxToolTipLength=null]      - The maximum length for a tooltip
   */
  function AutoTooltips(options) {
    var _grid;
    var _defaults = {
      enableForCells: true,
      enableForHeaderCells: false,
      maxToolTipLength: null,
      replaceExisting: true
    };

    /**
     * Initialize plugin.
     */
    function init(grid) {
      options = Slick.Utils.extend(true, {}, _defaults, options);
      _grid = grid;
      if (options.enableForCells) _grid.onMouseEnter.subscribe(handleMouseEnter);
      if (options.enableForHeaderCells) _grid.onHeaderMouseEnter.subscribe(handleHeaderMouseEnter);
    }

    /**
     * Destroy plugin.
     */
    function destroy() {
      if (options.enableForCells) _grid.onMouseEnter.unsubscribe(handleMouseEnter);
      if (options.enableForHeaderCells) _grid.onHeaderMouseEnter.unsubscribe(handleHeaderMouseEnter);
    }

    /**
     * Handle mouse entering grid cell to add/remove tooltip.
     * @param {MouseEvent} e - The event
     */
    function handleMouseEnter() {
      const cell = _grid.getCellFromEvent(event);
      if (cell) {
        let node = _grid.getCellNode(cell.row, cell.cell);
        let text;
        if (options && node && (!node.title || options && options.replaceExisting)) {
          if (node.clientWidth < node.scrollWidth) {
            text = node.textContent && node.textContent.trim() || '';
            if (options && (options.maxToolTipLength && text.length > options.maxToolTipLength)) {
              text = text.substring(0, options.maxToolTipLength - 3) + '...';
            }
          } else {
            text = '';
          }
          node.title = text;
        }
        node = null;
      }
    }

    /**
     * Handle mouse entering header cell to add/remove tooltip.
     * @param {MouseEvent} e     - The event
     * @param {object} args.column - The column definition
     */
    function handleHeaderMouseEnter(e, args) {
      const column = args.column;
      let node;
      const targetElm = (e.target);

      if (targetElm) {
        node = targetElm.closest < HTMLDivElement > ('.slick-header-column');
        if (node && !(column && column.toolTip)) {
          node.title = (targetElm.clientWidth < node.clientWidth) ? column && column.name || '' : '';
      }
      }
      node = null;
    }

    // Public API
    Slick.Utils.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "AutoTooltips"
    });
  }
})(window);
