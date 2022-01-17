/**
 * A plugin to add Custom Tooltip when hovering a cell, it subscribes to the cell "onMouseEnter" and "onMouseLeave" events.
 * The "customTooltip" is defined in the Column Definition OR Grid Options (the first found will have priority over the second)
 *
 * USAGE:
 *
 * Add the slick.customTooltip.(js|css) files and register it with the grid.
 *
 * To specify a tooltip when hovering a cell, extend the column definition like so:
 * var customTooltipPlugin = new Slick.Plugins.CustomTooltip(columns, grid options);
 *
 * Available plugin options (same options are available in both column definition and/or grid options)
 *
 * Example 1  - via Column Definition
 *  var columns = [
 *    {
 *      id: "action", name: "Action", field: "action", formatter: fakeButtonFormatter,
 *      customTooltip: {
 *        formatter: tooltipTaskFormatter,
 *        usabilityOverride: (args) => !!(args.dataContext.id % 2) // show it only every second row
 *      }
 *    }
 *  ];
 *
 *  OR Example 2 - via Grid Options (for all columns), NOTE: the column definition tooltip options will win over the options defined in the grid options
 *  var gridOptions = {
 *    enableCellNavigation: true,
 *    customTooltip: {
 *      formatter: tooltipTaskFormatter,
 *      usabilityOverride: (args) => !!(args.dataContext.id % 2) // show it only every second row
 *    },
 *  };
 *
 * Available options that can be defined from either a column definition or in grid options (column definition options as precendence)
 *   asyncParamsPropName:                 defaults to "__params", optionally change the property name that will be used to merge the data returned by the async method into the `dataContext` object
 *   asyncProcess:                        Async Post method returning a Promise, it must return an object with 1 or more properties. internally the data that will automatically be merged into the `dataContext` object under the `__params` property so that you can use it in your `asyncPostFormatter` formatter.
 *   asyncPostFormatter:                  Formatter to execute once the async process is completed, to displayed the actual text result (used when dealing with an Async API to get data to display later in the tooltip)
 *   hideArrow:                           defaults to False, should we hide the tooltip pointer arrow?
 *   className:                           defaults to "slick-custom-tooltip"
 *   formatter:                           Formatter to execute for displaying the data that will show in the tooltip. NOTE: when using `asyncProcess`, this formatter will be executed first and prior to the actual async process.
 *   headerFormatter:                     Formatter to execute when custom tooltip is over a header column
 *   headerRowFormatter:                  Formatter to execute when custom tooltip is over a heade row column (e.g. filter)
 *   maxHeight:                           optional maximum height number (in pixel) of the tooltip container
 *   maxWidth:                            optional maximum width number (in pixel) of the tooltip container
 *   offsetLeft:                          defaults to 0, optional left offset, it must be a positive/negative number (in pixel) that will be added to the offset position calculation of the tooltip container.
 *   offsetRight:                         defaults to 0, optional right offset, it must be a positive/negative number (in pixel) that will be added to the offset position calculation of the tooltip container.
 *   offsetTopBottom:                     defaults to 4, optional top or bottom offset (depending on which side it shows), it must be a positive/negative number (in pixel) that will be added to the offset position calculation of the tooltip container.
 *   position:                            defaults to "auto" (available options: 'auto' | 'top' | 'bottom' | 'left-align' | 'right-align'), allows to align the tooltip to the best logical position in the window, by default it will show on top left but if it calculates that it doesn't have enough space it will use bottom (same goes for each side align)
 *   regularTooltipWhiteSpace:            defaults to `pre-line`, optionally change the style `white-space` when displaying regular text tooltip. NOTE: when using a formatter it will use the `whiteSpace` setting instead
 *   whiteSpace:                          defaults to `normal`, optionally change the style `white-space` when displaying tooltip with formatter (tooltip or regular formatter)
 *   useRegularTooltip:                   defaults to False, when set to True it will try parse through the regular cell formatter and try to find a `title` attribute to show as a regular tooltip (also note: this has precedence over customTooltip formatter defined)
 *   useRegularTooltipFromFormatterOnly:  defaults to False, optionally force to retrieve the `title` from the Formatter result instead of the cell itself.
 *                                            for example, when used in combo with the AutoTooltip plugin we might want to force the tooltip to read the `title` attribute from the formatter result first instead of the cell itself,
 *                                            make the cell as a 2nd read, in other words check the formatter prior to the cell which the AutoTooltip might have filled.
 *   renderRegularTooltipAsHtml:          defaults to false, regular "title" tooltip won't be rendered as html unless specified via this flag (also "\r\n" will be replaced by <br>)
 *   tooltipTextMaxLength:                defaults to 700 (characters), when defined the text will be truncated to the max length characters provided
 *   usabilityOverride:                   callback method that user can override the default behavior of showing the tooltip. If it returns False, then the tooltip won't show
 *
 * @param options {Object} Custom Tooltip Options
 * @class Slick.Plugins.CustomTooltip
 * @varructor
 */
(function ($) {
  // Register namespace
  $.extend(true, window, {
    "Slick": {
      "Plugins": {
        "CustomTooltip": CustomTooltip
      }
    }
  });

  /**
   * CustomTooltip plugin to show/hide tooltips when columns are too narrow to fit content.
   * @varructor
   * @param {boolean} [options.className="slick-custom-tooltip"]  - custom tooltip class name
   * @param {boolean} [options.offsetTop=5]                       - tooltip offset from the top
   */
  function CustomTooltip(options) {
    var _cancellablePromise;
    var _cellNodeElm;
    var _dataView;
    var _grid;
    var _gridOptions;
    var _tooltipElm;
    var _defaults = {
      className: 'slick-custom-tooltip',
      offsetLeft: 0,
      offsetRight: 0,
      offsetTopBottom: 4,
      hideArrow: false,
      tooltipTextMaxLength: 700,
      regularTooltipWhiteSpace: 'pre-line',
      whiteSpace: 'normal',
    };
    var _eventHandler = new Slick.EventHandler();
    var _cellTooltipOptions = {};
    var _options;

    /**
     * Initialize plugin.
     */
    function init(grid) {
      _grid = grid;
      var _data = grid && grid.getData() || [];
      _dataView = Array.isArray(_data) ? null : _data;
      _gridOptions = grid.getOptions() || {};
      _options = $.extend(true, {}, _defaults, _gridOptions.customTooltip, options);
      _eventHandler
        .subscribe(grid.onMouseEnter, handleOnMouseEnter)
        .subscribe(grid.onHeaderMouseEnter, handleOnHeaderMouseEnter)
        .subscribe(grid.onHeaderRowMouseEnter, handleOnHeaderRowMouseEnter)
        .subscribe(grid.onMouseLeave, hideTooltip)
        .subscribe(grid.onHeaderMouseLeave, hideTooltip)
        .subscribe(grid.onHeaderRowMouseLeave, hideTooltip);
    }

    /**
     * Destroy plugin.
     */
    function destroy() {
      hideTooltip();
      _eventHandler.unsubscribeAll();
    }

    /**
     * Handle mouse entering grid header title to show tooltip.
     * @param {jQuery.Event} e - The event
     */
    function handleOnHeaderMouseEnter(e, args) {
      handleOnHeaderMouseEnterByType(e, args, 'slick-header-column');
    }

    /**
     * Handle mouse entering grid cell header-row (filter) to show tooltip.
     * @param {jQuery.Event} e - The event
     */
    function handleOnHeaderRowMouseEnter(e, args) {
      handleOnHeaderMouseEnterByType(e, args, 'slick-headerrow-column');
    }

    /** depending on the selector type, execute the necessary handler code */
    function handleOnHeaderMouseEnterByType(e, args, selector) {
      // before doing anything, let's remove any previous tooltip before
      // and cancel any opened Promise/Observable when using async
      hideTooltip();

      var cell = {
        row: -1, // negative row to avoid pulling any dataContext while rendering
        cell: _grid.getColumns().findIndex(function (col) { return args && args.column && args.column.id === col.id })
      };
      var columnDef = args.column;
      var item = {};
      var isHeaderRowType = selector === 'slick-headerrow-column';

      // run the override function (when defined), if the result is false it won't go further
      if (!args) {
        args = {};
      }
      args.cell = cell.cell;
      args.row = cell.row;
      args.columnDef = columnDef;
      args.dataContext = item;
      args.grid = _grid;
      args.type = isHeaderRowType ? 'header-row' : 'header';

      _cellTooltipOptions = $.extend(true, {}, _options, columnDef.customTooltip);
      if ((columnDef && columnDef.disableTooltip) || !runOverrideFunctionWhenExists(_cellTooltipOptions.usabilityOverride, args)) {
        return;
      }

      if (columnDef && e.target) {
        _cellNodeElm = findClosestHeaderNode(e.target, selector);
        var isHeaderRowType = selector === 'slick-headerrow-column';
        var formatter = isHeaderRowType ? _cellTooltipOptions.headerRowFormatter : _cellTooltipOptions.headerFormatter;

        if (_cellTooltipOptions.useRegularTooltip || !formatter) {
          var formatterOrText = !isHeaderRowType ? columnDef.name : _cellTooltipOptions.useRegularTooltip ? null : formatter;
          renderRegularTooltip(formatterOrText, cell, null, columnDef, item);
        } else if (_cellNodeElm && typeof formatter === 'function') {
          renderTooltipFormatter(formatter, cell, null, columnDef, item);
        }
      }
    }

    function findClosestHeaderNode(elm, selector) {
      if (typeof elm.closest === 'function') {
        return elm.closest('.' + selector);
      }
      return elm.classList.contains(selector)
        ? elm : elm.parentElement.classList.contains(selector)
          ? elm.parentElement : null;
    }

    /**
     * Handle mouse entering grid cell to show tooltip.
     * @param {jQuery.Event} e - The event
     */
    function handleOnMouseEnter(e, args) {
      // before doing anything, let's remove any previous tooltip before
      // and cancel any opened Promise/Observable when using async
      hideTooltip();

      if (_grid && e) {
        var cell = _grid.getCellFromEvent(e);

        if (cell) {
          var item = _dataView ? _dataView.getItem(cell.row) : _grid.getDataItem(cell.row);
          var columnDef = _grid.getColumns()[cell.cell];
          _cellNodeElm = _grid.getCellNode(cell.row, cell.cell);
          _cellTooltipOptions = $.extend(true, {}, _options, columnDef.customTooltip);

          if (item && columnDef) {
            // run the override function (when defined), if the result is false it won't go further
            if (!args) {
              args = {};
            }
            args.cell = cell.cell;
            args.row = cell.row;
            args.columnDef = columnDef;
            args.dataContext = item;
            args.grid = _grid;
            args.type = 'cell';
            if ((columnDef && columnDef.disableTooltip) || !runOverrideFunctionWhenExists(_cellTooltipOptions.usabilityOverride, args)) {
              return;
            }

            var value = item.hasOwnProperty(columnDef.field) ? item[columnDef.field] : null;

            if (_cellTooltipOptions.useRegularTooltip || !_cellTooltipOptions.formatter) {
              renderRegularTooltip(columnDef.formatter, cell, value, columnDef, item);
            } else {
              if (typeof _cellTooltipOptions.formatter === 'function') {
                renderTooltipFormatter(_cellTooltipOptions.formatter, cell, value, columnDef, item);
              }
              if (typeof _cellTooltipOptions.asyncProcess === 'function') {
                var asyncProcess = _cellTooltipOptions.asyncProcess(cell.row, cell.cell, value, columnDef, item, _grid);
                if (!_cellTooltipOptions.asyncPostFormatter) {
                  throw new Error('[Slickgrid-Universal] when using "asyncProcess", you must also provide an "asyncPostFormatter" formatter');
                }

                if (asyncProcess instanceof Promise) {
                  // create a new cancellable promise which will resolve, unless it's cancelled, with the udpated `dataContext` object that includes the `__params`
                  _cancellablePromise = cancellablePromise(asyncProcess);
                  _cancellablePromise.promise
                    .then(function (asyncResult) {
                      asyncProcessCallback(asyncResult, cell, value, columnDef, item)
                    })
                    .catch(function (error) {
                      // we will throw back any errors, unless it's a cancelled promise which in that case will be disregarded (thrown by the promise wrapper cancel() call)
                      if (!(error.isPromiseCancelled)) {
                        throw error;
                      }
                    });
                }
              }
            }
          }
        }
      }
    }

    function findFirstElementAttribute(inputElm, attributes) {
      if (inputElm) {
        var outputAttrData;
        attributes.forEach(function (attribute) {
          var attrData = inputElm.getAttribute(attribute);
          if (attrData) {
            outputAttrData = attrData;
          }
        });
        return outputAttrData;
      }
      return null;
    }

    /**
     * Parse the cell formatter and assume it might be html
     * then create a temporary html element to easily retrieve the first [title=""] attribute text content
     * also clear the "title" attribute from the grid div text content so that it won't show also as a 2nd browser tooltip
     */
    function renderRegularTooltip(formatterOrText, cell, value, columnDef, item) {
      var tmpDiv = document.createElement('div');
      tmpDiv.innerHTML = parseFormatterAndSanitize(formatterOrText, cell, value, columnDef, item);
      var tooltipText = columnDef.toolTip || '';
      var tmpTitleElm;

      if (!tooltipText) {
        if ((_cellNodeElm && (_cellNodeElm.clientWidth < _cellNodeElm.scrollWidth)) && !_cellTooltipOptions.useRegularTooltipFromFormatterOnly) {
          tooltipText = (_cellNodeElm.textContent || '').trim() || '';
          if (_cellTooltipOptions.tooltipTextMaxLength && (tooltipText.length > _cellTooltipOptions.tooltipTextMaxLength)) {
            tooltipText = tooltipText.substr(0, _cellTooltipOptions.tooltipTextMaxLength - 3) + '...';
          }
          tmpTitleElm = _cellNodeElm;
        } else {
          if (_cellTooltipOptions.useRegularTooltipFromFormatterOnly) {
            tmpTitleElm = tmpDiv.querySelector('[title], [data-slick-tooltip]');
          } else {
            tmpTitleElm = findFirstElementAttribute(_cellNodeElm, ['title', 'data-slick-tooltip']) ? _cellNodeElm : tmpDiv.querySelector('[title], [data-slick-tooltip]');
            if ((!tmpTitleElm || !findFirstElementAttribute(tmpTitleElm, ['title', 'data-slick-tooltip'])) && _cellNodeElm) {
              tmpTitleElm = _cellNodeElm.querySelector('[title], [data-slick-tooltip]');
            }
          }
          if (!tooltipText || (typeof formatterOrText === 'function' && _cellTooltipOptions.useRegularTooltipFromFormatterOnly)) {
            tooltipText = findFirstElementAttribute(tmpTitleElm, ['title', 'data-slick-tooltip']) || '';
          }
        }
      }

      if (tooltipText !== '') {
        renderTooltipFormatter(formatterOrText, cell, value, columnDef, item, tooltipText);
      }

      // also clear any "title" attribute to avoid showing a 2nd browser tooltip
      swapAndClearTitleAttribute(tmpTitleElm, tooltipText);
    }

    /**
   * swap and copy the "title" attribute into a new custom attribute then clear the "title" attribute
   * from the grid div text content so that it won't show also as a 2nd browser tooltip
   */
    function swapAndClearTitleAttribute(inputTitleElm, tooltipText) {
      // the title attribute might be directly on the slick-cell container element (when formatter returns a result object)
      // OR in a child element (most commonly as a custom formatter)
      var titleElm = inputTitleElm || (_cellNodeElm && ((_cellNodeElm.hasAttribute('title') && _cellNodeElm.getAttribute('title')) ? _cellNodeElm : _cellNodeElm.querySelector('[title]')));

      // flip tooltip text from `title` to `data-slick-tooltip`
      if (titleElm) {
        titleElm.setAttribute('data-slick-tooltip', tooltipText || '');
        if (titleElm.hasAttribute('title')) {
          titleElm.setAttribute('title', '');
        }
      }
    }

    function asyncProcessCallback(asyncResult, cell, value, columnDef, dataContext) {
      hideTooltip();
      var itemWithAsyncData = $.extend(true, {}, dataContext, { [_cellTooltipOptions.asyncParamsPropName || '__params']: asyncResult });
      renderTooltipFormatter(_cellTooltipOptions.asyncPostFormatter, cell, value, columnDef, itemWithAsyncData);
    }


    function calculateAvailableSpaceTop(element) {
      var availableSpace = 0;
      var pageScrollTop = windowScrollPosition().top;
      var elmOffset = getHtmlElementOffset(element);
      if (elmOffset) {
        var elementOffsetTop = elmOffset.top;
        availableSpace = elementOffsetTop - pageScrollTop;
      }
      return availableSpace;
    }

    function cancellablePromise(inputPromise) {
      var hasCancelled = false;

      if (inputPromise instanceof Promise) {
        return {
          promise: inputPromise.then(function (result) {
            if (hasCancelled) {
              throw { isPromiseCancelled: true };
            }
            return result;
          }),
          cancel: function () {
            hasCancelled = true;
          }
        };
      }
      return inputPromise;
    }

    function windowScrollPosition() {
      return {
        left: window.pageXOffset || document.documentElement.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || 0,
      };
    }

    function getHtmlElementOffset(element) {
      if (!element) {
        return undefined;
      }
      var rect = element.getBoundingClientRect();
      var top = 0;
      var left = 0;
      var bottom = 0;
      var right = 0;

      if (rect.top !== undefined && rect.left !== undefined) {
        top = rect.top + window.pageYOffset;
        left = rect.left + window.pageXOffset;
        right = rect.right;
        bottom = rect.bottom;
      }
      return { top: top, left: left, bottom: bottom, right: right };
    }

    /**
     * hide (remove) tooltip from the DOM,
     * when using async process, it will also cancel any opened Promise/Observable that might still be opened/pending.
     */
    function hideTooltip() {
      if (_cancellablePromise && _cancellablePromise.cancel) {
        _cancellablePromise.cancel();
      }
      var prevTooltip = document.body.querySelector('.' + _cellTooltipOptions.className + '.' + _grid.getUID());
      if (prevTooltip && prevTooltip.remove) {
        prevTooltip.remove();
      }
    }

    /**
     * Reposition the Tooltip to be top-left position over the cell.
     * By default we use an "auto" mode which will allow to position the Tooltip to the best logical position in the window, also when we mention position, we are talking about the relative position against the grid cell.
     * We can assume that in 80% of the time the default position is top-right, the default is "auto" but we can also override it and use a specific position.
     * Most of the time positioning of the tooltip will be to the "top-right" of the cell is ok but if our column is completely on the right side then we'll want to change the position to "left" align.
     * Same goes for the top/bottom position, Most of the time positioning the tooltip to the "top" but if we are hovering a cell at the top of the grid and there's no room to display it then we might need to reposition to "bottom" instead.
     */
    function reposition(cell) {
      if (_tooltipElm) {
        _cellNodeElm = _cellNodeElm || _grid.getCellNode(cell.row, cell.cell);
        var cellPosition = getHtmlElementOffset(_cellNodeElm);
        var containerWidth = _cellNodeElm.offsetWidth;
        var calculatedTooltipHeight = _tooltipElm.getBoundingClientRect().height;
        var calculatedTooltipWidth = _tooltipElm.getBoundingClientRect().width;
        var calculatedBodyWidth = document.body.offsetWidth || window.innerWidth;

        // first calculate the default (top/left) position
        var newPositionTop = cellPosition.top - _tooltipElm.offsetHeight - (_cellTooltipOptions.offsetTopBottom || 0);
        var newPositionLeft = (cellPosition && cellPosition.left || 0) - (_cellTooltipOptions.offsetLeft || 0);

        // user could explicitely use a "left" position (when user knows his column is completely on the right)
        // or when using "auto" and we detect not enough available space then we'll position to the "left" of the cell
        var position = _cellTooltipOptions.position || 'auto';
        if (position === 'left-align' || (position === 'auto' && (newPositionLeft + calculatedTooltipWidth) > calculatedBodyWidth)) {
          newPositionLeft -= (calculatedTooltipWidth - containerWidth - (_cellTooltipOptions.offsetRight || 0));
          _tooltipElm.classList.remove('arrow-left-align');
          _tooltipElm.classList.add('arrow-right-align');
        } else {
          _tooltipElm.classList.add('arrow-left-align');
          _tooltipElm.classList.remove('arrow-right-align');
        }

        // do the same calculation/reposition with top/bottom (default is top of the cell or in other word starting from the cell going down)
        if (position === 'bottom' || (position === 'auto' && calculatedTooltipHeight > calculateAvailableSpaceTop(_cellNodeElm))) {
          newPositionTop = cellPosition.top + (_gridOptions.rowHeight || 0) + (_cellTooltipOptions.offsetTopBottom || 0);
          _tooltipElm.classList.remove('arrow-down');
          _tooltipElm.classList.add('arrow-up');
        } else {
          _tooltipElm.classList.add('arrow-down');
          _tooltipElm.classList.remove('arrow-up');
        }

        // reposition the tooltip over the cell (90% of the time this will end up using a position on the "right" of the cell)
        _tooltipElm.style.top = newPositionTop + 'px';
        _tooltipElm.style.left = newPositionLeft + 'px';
      }
    }

    /**
     * Parse the Custom Formatter (when provided) or return directly the text when it is already a string.
     * We will also sanitize the text in both cases before returning it so that it can be used safely.
     */
    function parseFormatterAndSanitize(formatterOrText, cell, value, columnDef, item) {
      if (typeof formatterOrText === 'function') {
        var tooltipText = formatterOrText(cell.row, cell.cell, value, columnDef, item, _grid);
        var formatterText = (typeof tooltipText === 'object' && tooltipText && tooltipText.text) ? tooltipText.text : (typeof tooltipText === 'string' ? tooltipText : '');
        return _grid.sanitizeHtmlString(formatterText);
      } else if (typeof formatterOrText === 'string') {
        return _grid.sanitizeHtmlString(formatterOrText);
      }
      return '';
    }


    function renderTooltipFormatter(formatter, cell, value, columnDef, item, tooltipText, inputTitleElm) {
      // create the tooltip DOM element with the text returned by the Formatter
      _tooltipElm = document.createElement('div');
      _tooltipElm.className = _cellTooltipOptions.className;
      _tooltipElm.classList.add(_grid.getUID());
      _tooltipElm.classList.add('l' + cell.cell);
      _tooltipElm.classList.add('r' + cell.cell);
      var outputText = tooltipText || parseFormatterAndSanitize(formatter, cell, value, columnDef, item) || '';
      outputText = (_cellTooltipOptions.tooltipTextMaxLength && outputText.length > _cellTooltipOptions.tooltipTextMaxLength) ? outputText.substr(0, _cellTooltipOptions.tooltipTextMaxLength - 3) + '...' : outputText;

      let finalOutputText = '';
      if (!tooltipText || (_cellTooltipOptions && _cellTooltipOptions.renderRegularTooltipAsHtml)) {
        finalOutputText = _grid.sanitizeHtmlString(outputText);
        _tooltipElm.innerHTML = finalOutputText;
        _tooltipElm.style.whiteSpace = (_cellTooltipOptions && _cellTooltipOptions.whiteSpace) || _defaultOptions.whiteSpace;
      } else {
        finalOutputText = outputText || '';
        _tooltipElm.textContent = finalOutputText;
        _tooltipElm.style.whiteSpace = (_cellTooltipOptions && _cellTooltipOptions.regularTooltipWhiteSpace) || _defaultOptions.regularTooltipWhiteSpace; // use `pre` so that sequences of white space are collapsed. Lines are broken at newline characters
      }

      // optional max height/width of the tooltip container
      if (_cellTooltipOptions.maxHeight) {
        _tooltipElm.style.maxHeight = _cellTooltipOptions.maxHeight + 'px';
      }
      if (_cellTooltipOptions.maxWidth) {
        _tooltipElm.style.maxWidth = _cellTooltipOptions.maxWidth + 'px';
      }

      // when do have text to show, then append the new tooltip to the html body & reposition the tooltip
      if (finalOutputText) {
        document.body.appendChild(_tooltipElm);

        // reposition the tooltip on top of the cell that triggered the mouse over event
        reposition(cell);

        // user could optionally hide the tooltip arrow (we can simply update the CSS variables, that's the only way we have to update CSS pseudo)
        if (!_cellTooltipOptions.hideArrow) {
          _tooltipElm.classList.add('tooltip-arrow');
        }

        // also clear any "title" attribute to avoid showing a 2nd browser tooltip
        swapAndClearTitleAttribute(inputTitleElm, outputText);
      }
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

    function setOptions(newOptions) {
      _options = $.extend({}, _options, newOptions);
    }

    // Public API
    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "hide": hideTooltip,
      "setOptions": setOptions,
      "pluginName": "CustomTooltip"
    });
  }
})(jQuery);