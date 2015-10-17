// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
;// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

if (typeof window.CustomEvent !== "function") {
  (function() {
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
     }

    window.CustomEvent = CustomEvent;

    CustomEvent.prototype = window.CustomEvent.prototype;
  })();
}
;var savvior = (function(global, document, undefined) {
  "use strict";

  var self = {},
    addToDataset = function(element, key, value) {
      // Use dataset function or a fallback for <IE10
      if (element.dataset) {
        element.dataset[key] = value;
      }
      else {
        element.setAttribute("data-"+ key, value);
      }

      return;
    };

  self.settings = self.settings || {};

  self.ready = self.ready || false;

  self.registered = self.registered || {};

  self.currentMQ = self.currentMQ || null;

  self.handlers = self.handlers || [];


  /**
   * Create columns with the configured classes and add a list of items to them.
   *
   * @param Object grid     The grid element object
   * @param Object items    The column element object
   * @param String selector String selector The element selector of the grid
   */
  self.addColumns = function addColumns(grid, items, selector) {
    var numberOfColumns = self.settings[selector][self.currentMQ].columns,
      columnClasses = ["column", "size-1of"+ numberOfColumns],
      columnsItems = new Array(+numberOfColumns),
      columnsFragment = document.createDocumentFragment(),
      i = numberOfColumns,
      childSelector;

    while (i-- !== 0) {
      childSelector = "[data-columns] > *:nth-child(" + numberOfColumns + "n-" + i + ")";
      columnsItems.push(items.querySelectorAll(childSelector));
    }

    columnsItems.forEach(function appendToGridFragment(rows) {
      var column = document.createElement("div"),
        rowsFragment = document.createDocumentFragment();

      column.className = columnClasses.join(" ");

      Array.prototype.forEach.call(rows, function appendToColumn(row) {
        rowsFragment.appendChild(row);
      });
      column.appendChild(rowsFragment);
      columnsFragment.appendChild(column);
    });

    grid.appendChild(columnsFragment);
    addToDataset(grid, 'columns', numberOfColumns);
  };


  /**
   * Remove all the columns from a grid and prepare it for populating again.
   *
   * @param  Object grid The grid element object
   * @return Object      A list of items sorted by the ordering of columns
   */
  self.removeColumns = function removeColumns(grid) {
    var range = document.createRange();
    range.selectNodeContents(grid);

    var columns = Array.prototype.filter.call(range.extractContents().childNodes, function filterElements(node) {
      return node instanceof global.HTMLElement;
    });

    var numberOfColumns = columns.length,
      numberOfRowsInFirstColumn = columns[0].childNodes.length,
      sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns);

    Array.prototype.forEach.call(columns, function iterateColumns(column, columnIndex) {
      Array.prototype.forEach.call(column.children, function iterateRows(row, rowIndex) {
        sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
      });
    });

    var container = document.createElement("div");
    addToDataset(container, 'columns', 0);

    sortedRows.filter(function filterNonNull(child) {
      return !!child;
    }).forEach(function appendRow(child) {
      container.appendChild(child);
    });

    return container;
  };


  /**
   * Remove all the columns from the grid, and add them again, but only if the
   * number of columns have changed.
   *
   * @param  Object grid The grid element object
   */
  self.recreateColumns = function recreateColumns(grid, selector) {
    global.requestAnimationFrame(function renderOnChange() {
      var newColumns = self.settings[selector][self.currentMQ].columns,
        oldColumns = parseInt(grid.getAttribute("data-columns"));

      if (newColumns !== oldColumns) {
        var savviorMatchEvent = new CustomEvent("savvior:match", {detail: grid});
        self.addColumns(grid, self.removeColumns(grid), selector);
        global.dispatchEvent(savviorMatchEvent);
      }
    });
  };


  /**
   * Register the grid element and add the configured number of columns.
   *
   * @param  Object grid     The grid element object
   * @param  String selector The element selector of the grid
   */
  self.registerGrid = function registerGrid(grid, selector) {
    if (global.getComputedStyle(grid).display === "none") {
      return;
    }

    // Only process the grid once.
    if (typeof self.registered[selector] === "undefined") {
      // Retrieve the list of items from the grid itself.
      var range = document.createRange(),
        items = document.createElement("div");

      range.selectNodeContents(grid);
      items.appendChild(range.extractContents());

      addToDataset(items, 'columns', 0);
      self.addColumns(grid, items, selector);
      self.registered[selector] = true;
    }
  };


  /**
   * Register enquire event handlers for the configured grid element and media
   * query.
   *
   * @param  Object grid     The grid element object
   * @param  String selector The element selector of the grid
   * @param  String mq       The media query to match
   */
  self.register = function register(grid, selector, mq) {
    var handler = {
      mq: mq,
      selector: selector,
      grid: grid,
      callbacks: {
        deferSetup: true,
        setup: function savviorSetup() {
          // Set current media query.
          self.currentMQ = mq;
          // Register the grid element.
          self.registerGrid(grid, selector);
        },
        match: function savviorMatch() {
          // Set current media query.
          if (self.currentMQ !== mq)
            self.currentMQ = mq;
          // Recreate columns if it is already registered.
          if (self.registered[selector] === true)
            self.recreateColumns(grid, selector);
        },
        destroy: function() {
          return;
        }
      },
    };
    enquire.register(handler.mq, handler.callbacks);
    self.handlers.push(handler);
  };

  /**
   * Destroy columns and restore original DOM in grid
   * @return {[type]} [description]
   */
  self.destroy = function destroy() {
    // Unregister enquire handlers.
    Array.prototype.forEach.call(self.handlers, function(handler) {
      enquire.unregister(handler.mq, handler.callbacks);
    });
    self.currentMQ = null;
    self.handlers = [];

    // Restore columns.
    for (var selector in self.settings) {
      if (self.registered[selector]) {
        var grids = document.querySelectorAll(selector);
        Array.prototype.forEach.call(grids, function(grid) {
          var containerFragment = document.createDocumentFragment(),
            container = self.removeColumns(grid),
            children = [];

          Array.prototype.forEach.call(container.childNodes, function(item) {
            children.push(item);
          });
          children.forEach(function(child) {
            containerFragment.appendChild(child);
          });
          grid.appendChild(containerFragment);
          grid.removeAttribute("data-columns");
          self.registered[selector] = false;
        });
      }
    }
    // Set ready state.
    self.ready = false;
  };

  /**
   * Initialisation.
   *
   * @param  Object settings The settings object for each grid element
   */
  self.init = function init(settings) {
    if (typeof settings === "undefined") {
      return false;
    }

    var savviorInitEvent = new CustomEvent("savvior:init"),
      gridElements = [];

    self.settings = settings;

    // Iterate over each selector from settings.
    for (var selector in self.settings) {
      if (self.settings.hasOwnProperty(selector)) {
        // Get all elements matching the selector.
        gridElements = document.querySelectorAll(selector);
        // Register each grid element for each media query change.
        Array.prototype.forEach.call(gridElements, function processMediaQueries(grid) {
          for (var mq in self.settings[selector]) {
            if (self.settings[selector].hasOwnProperty(mq)) {
              self.register(grid, selector, mq);
            }
          }
        });
      }
    }

    self.ready = true;
    global.dispatchEvent(savviorInitEvent);
  };

  return {
    init: function(settings) {
      return self.init(settings);
    },
    destroy: function() {
      return self.destroy();
    },
    ready: function() {
      return self.ready;
    }
  };

})(window, window.document);
