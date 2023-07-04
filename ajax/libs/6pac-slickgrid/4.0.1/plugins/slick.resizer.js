/***
 * A Resizer plugin that can be used to auto-resize a grid and/or resize with fixed dimensions.
 * When fixed height is defined, it will auto-resize only the width and vice versa with the width defined.
 * You can also choose to use the flag "enableAutoSizeColumns" if you want to the plugin to
 * automatically call the grid "autosizeColumns()" method after each resize.
 *
 * USAGE:
 *
 * Add the "slick.resizer.js" file and register it with the grid.
 *
 * You can specify certain options as arguments when instantiating the plugin like so:
 * var resizer = new Slick.Plugins.Resizer({
 *   container: '#gridContainer',
 *   rightPadding: 15,
 *   bottomPadding: 20,
 *   minHeight: 180,
 *   minWidth: 300,
 * });
 * grid.registerPlugin(resizer);
 *
 *
 * The plugin exposes the following events:
 *
 *    onGridAfterResize:  Fired after the grid got resized.  You can customize the menu or dismiss it by returning false.
 *        Event args:
 *            grid:       Reference to the grid.
 *            dimensions: Resized grid dimensions used
 *
 *    onGridBeforeResize:   Fired before the grid gets resized.  You can customize the menu or dismiss it by returning false.
 *        Event args:
 *            grid:     Reference to the grid.
 *
 *
 * @param {Object} options available plugin options that can be passed in the constructor:
 *   container:      (REQUIRED) DOM element selector of the page container, basically what element in the page will be used to calculate the available space
 *   gridContainer:             DOM element selector of the grid container, optional but when provided it will be resized with same size as the grid (typically a container holding the grid and extra custom footer/pagination)
 *   applyResizeToContainer:    Defaults to false, do we want to apply the resized dimentions to the grid container as well?
 *   rightPadding:              Defaults to 0, right side padding to remove from the total dimension
 *   bottomPadding:             Defaults to 20, bottom padding to remove from the total dimension
 *   minHeight:                 Defaults to 180, minimum height of the grid
 *   minWidth:                  Defaults to 300, minimum width of the grid
 *   maxHeight:                 Maximum height of the grid
 *   maxWidth:                  Maximum width of the grid
 *   calculateAvailableSizeBy:  Defaults to "window", which DOM element ("container" or "window") are we using to calculate the available size for the grid?
 *
 * @class Slick.Plugins.Resizer
 * @constructor
 */

'use strict';

(function (window) {
  // register namespace
  Slick.Utils.extend(true, window, {
    "Slick": {
      "Plugins": {
        "Resizer": Resizer
      }
    }
  });

  function Resizer(_options, fixedDimensions) {
    // global variables, height/width are in pixels
    let DATAGRID_MIN_HEIGHT = 180;
    let DATAGRID_MIN_WIDTH = 300;
    let DATAGRID_BOTTOM_PADDING = 20;

    let _self = this;
    let _fixedHeight;
    let _fixedWidth;
    let _grid;
    let _gridOptions;
    let _gridUid;
    let _lastDimensions;
    let _timer;
    let _resizePaused = false;
    let _gridDomElm;
    let _pageContainerElm;
    let _gridContainerElm;
    let _defaults = {
      bottomPadding: 20,
      applyResizeToContainer: false,
      minHeight: 180,
      minWidth: 300,
      rightPadding: 0
    };

    let options = {};
    let _bindingEventService = new Slick.BindingEventService();

    function setOptions(_newOptions){
      options = Slick.Utils.extend(true, {}, _defaults, options, _newOptions);
    }

    function init(grid) {
      setOptions(_options);
      _grid = grid;
      _gridOptions = _grid.getOptions();
      _gridUid = _grid.getUID();
      _gridDomElm = _grid.getContainerNode();

      if (typeof _options.container === 'string') {
        _pageContainerElm = typeof _options.container === 'string' ? document.querySelector(_options.container) : _options.container;
      } else {
        _pageContainerElm = _options.container;
      }

      if (options.gridContainer) {
        _gridContainerElm = options.gridContainer;
      }

      if (fixedDimensions) {
        _fixedHeight = fixedDimensions.height;
        _fixedWidth = fixedDimensions.width;
      }

      if (_gridOptions) {
        bindAutoResizeDataGrid();
      }
    }

    /** Bind an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
    * Options: we could also provide a % factor to resize on each height/width independently
    */
    function bindAutoResizeDataGrid(newSizes) {
      const gridElmOffset = Slick.Utils.offset(_gridDomElm);

      // if we can't find the grid to resize, return without binding anything
      if (_gridDomElm !== undefined || gridElmOffset !== undefined) {
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        resizeGrid(0, newSizes, null);

        // -- 2nd bind a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- bind auto-resize to Window object only if it exist
        _bindingEventService.bind(window, 'resize', function (event) {
          _self.onGridBeforeResize.notify({ grid: _grid }, event, _self);

          // unless the resizer is paused, let's go and resize the grid
          if (!_resizePaused) {
            // for some yet unknown reason, calling the resize twice removes any stuttering/flickering
            // when changing the height and makes it much smoother experience
            resizeGrid(0, newSizes, event);
            resizeGrid(0, newSizes, event);
          }
        });
      }
    }

   /**
    * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
    */
    function calculateGridNewDimensions() {
      const gridElmOffset = Slick.Utils.offset(_gridDomElm);

      if (!window || _pageContainerElm === undefined || _gridDomElm === undefined || gridElmOffset === undefined) {
        return null;
      }

      // calculate bottom padding
      let bottomPadding = (options && options.bottomPadding !== undefined) ? options.bottomPadding : DATAGRID_BOTTOM_PADDING;

      let gridHeight = 0;
      let gridOffsetTop = 0;

      // which DOM element are we using to calculate the available size for the grid?
      // defaults to "window"
      if (options.calculateAvailableSizeBy === 'container') {
        // uses the container's height to calculate grid height without any top offset
        gridHeight = Slick.Utils.innerSize(_pageContainerElm, 'height') || 0;
      } else {
        // uses the browser's window height with its top offset to calculate grid height
        gridHeight = window.innerHeight || 0;
        gridOffsetTop = (gridElmOffset !== undefined) ? gridElmOffset.top : 0;
      }

      let availableHeight = gridHeight - gridOffsetTop - bottomPadding;
      let availableWidth = Slick.Utils.innerSize(_pageContainerElm, 'width') || window.innerWidth || 0;
      let maxHeight = options && options.maxHeight || undefined;
      let minHeight = (options && options.minHeight !== undefined) ? options.minHeight : DATAGRID_MIN_HEIGHT;
      let maxWidth = options && options.maxWidth || undefined;
      let minWidth = (options && options.minWidth !== undefined) ? options.minWidth : DATAGRID_MIN_WIDTH;

      let newHeight = availableHeight;
      let newWidth = (options && options.rightPadding) ? availableWidth - options.rightPadding : availableWidth;

      // optionally (when defined), make sure that grid height & width are within their thresholds
      if (newHeight < minHeight) {
        newHeight = minHeight;
      }
      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
      }
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      if (maxWidth && newWidth > maxWidth) {
        newWidth = maxWidth;
      }

      // return the new dimensions unless a fixed height/width was defined
      return {
        height: _fixedHeight || newHeight,
        width: _fixedWidth || newWidth
      };
    }

    /** Destroy function when element is destroyed */
    function destroy() {
      _self.onGridBeforeResize.unsubscribe();
      _self.onGridAfterResize.unsubscribe();
      _bindingEventService.unbindAll();
    }

    /**
    * Return the last resize dimensions used by the service
    * @return {object} last dimensions (height: number, width: number)
    */
    function getLastResizeDimensions() {
      return _lastDimensions;
    }

    /**
     * Provide the possibility to pause the resizer for some time, until user decides to re-enabled it later if he wish to.
     * @param {boolean} isResizePaused are we pausing the resizer?
     */
    function pauseResizer(isResizePaused) {
      _resizePaused = isResizePaused;
    }

    /**
     * Resize the datagrid to fit the browser height & width.
     * @param {number} delay to wait before resizing, defaults to 0 (in milliseconds)
     * @param {object} newSizes can optionally be passed (height: number, width: number)
     * @param {object} event that triggered the resize, defaults to null
     * @return If the browser supports it, we can return a Promise that would resolve with the new dimensions
     */
    function resizeGrid(delay, newSizes, event) {
      // because of the javascript async nature, we might want to delay the resize a little bit
      delay = delay || 0;

      // return a Promise when supported by the browser
      if (typeof Promise === 'function') {
        return new Promise(function (resolve) {
          if (delay > 0) {
            clearTimeout(_timer);
            _timer = setTimeout(function () {
              resolve(resizeGridCallback(newSizes, event));
            }, delay);
          } else {
            resolve(resizeGridCallback(newSizes, event));
          }
        });
      } else {
        // OR no return when Promise isn't supported
        if (delay > 0) {
          clearTimeout(_timer);
          _timer = setTimeout(function () {
            resizeGridCallback(newSizes, event);
          }, delay);
        } else {
          resizeGridCallback(newSizes, event);
        }
      }
    }

    function resizeGridCallback(newSizes, event) {
      let lastDimensions = resizeGridWithDimensions(newSizes);
      _self.onGridAfterResize.notify({ grid: _grid, dimensions: lastDimensions }, event, _self);
      return lastDimensions;
    }

    function resizeGridWithDimensions(newSizes) {
      // calculate the available sizes with minimum height defined as a varant
      let availableDimensions = calculateGridNewDimensions();

      if ((newSizes || availableDimensions) && _gridDomElm) {
        try {
          // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
          // basically if user passes 1 of the dimension, let say he passes just the height,
          // we will use the height as a fixed height but the width will be resized by it's available space
          let newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
          let newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;

          // apply these new height/width to the datagrid
          if (!_gridOptions.autoHeight) {
            _gridDomElm.style.height = `${newHeight}px`;
          }
          _gridDomElm.style.width = `${newWidth}px`;
          if (_gridContainerElm) {
            _gridContainerElm.style.width = `${newWidth}px`;
          }

          // resize the slickgrid canvas on all browser except some IE versions
          // exclude all IE below IE11
          // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
          if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && _grid && _grid.resizeCanvas) {
            _grid.resizeCanvas();
          }

          // also call the grid auto-size columns so that it takes available when going bigger
          if (_gridOptions && _gridOptions.enableAutoSizeColumns && _grid.autosizeColumns) {
            // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree) to avoid SlickGrid error "missing stylesheet"
            if (_gridUid && document.querySelector(`.${_gridUid}`)) {
              _grid.autosizeColumns();
            }
          }

          // keep last resized dimensions & resolve them to the Promise
          _lastDimensions = {
            height: newHeight,
            width: newWidth
          };
        } catch (e) {
          destroy();
        }
      }

      return _lastDimensions;
    }

    Slick.Utils.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "Resizer",
      "bindAutoResizeDataGrid": bindAutoResizeDataGrid,
      "getLastResizeDimensions": getLastResizeDimensions,
      "pauseResizer": pauseResizer,
      "resizeGrid": resizeGrid,
      "setOptions": setOptions,

      "onGridAfterResize": new Slick.Event(),
      "onGridBeforeResize": new Slick.Event()
    });
  }
})(window);
