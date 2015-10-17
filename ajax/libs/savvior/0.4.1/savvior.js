(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('enquire'));
    }
    else if(typeof define === 'function' && define.amd) {
        define('savvior', ['enquire'], factory);
    }
    else {
        root['savvior'] = factory(root.enquire);
    }
}(this, function(enquire) {

  /*jshint unused:false */

  function addToDataset(element, key, value) {
    // Use dataset function or a fallback for <IE10
    if (element.dataset) {
      element.dataset[key] = value;
    }
    else {
      element.setAttribute('data-'+ key, value);
    }

    return;
  }

  /**
   * Helper function for iterating over a collection
   *
   * @param collection
   * @param fn
   */
  function each(collection, fn) {
    var i = 0,
      length = collection.length,
      cont;

    for (i; i < length; i++) {
      cont = fn(collection[i], i);
      if(cont === false) {
        break; //allow early exit
      }
    }
  }

  /**
   * Helper function for determining whether target object is an array
   *
   * @param target the object under test
   * @return {Boolean} true if array, false otherwise
   */
  function isArray(target) {
    return Object.prototype.toString.apply(target) === '[object Array]';
  }

  /**
   * Helper function for determining whether target object is a function
   *
   * @param target the object under test
   * @return {Boolean} true if function, false otherwise
   */
  function isFunction(target) {
    return typeof target === 'function';
  }

  /**
   * Helper function to determine if an object or array is empty.
   *
   * @param  {[type]}  obj The object or array to check.
   * @return {Boolean}     TRUE if empty, FALSE if not.
   */
  function isEmpty(obj, p) {
    for (p in obj) {
      return !1;
    }
    return !0;
  }

  /**
   * CustomEvent polyfill
   */
  if (typeof window.CustomEvent !== 'function') {
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


  /**
   * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
   *
   * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * @see http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * @license MIT
   */
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }());
  /**
   * Implements the grid element and its internal manipulation features
   *
   * @param {Object} Grid
   * @param {String} Grid.columns  Stores the current number of columns
   * @param {Object} Grid.element  Stores the DOM object of the grid element
   * @param {Boolean} Grid.status  Pointer to maintain the Grid status
   * @constructor
   */
  function Grid(element) {
    this.columns = null;
    this.element = element;
    this.status = false;
  }

  Grid.prototype = {

    /**
     * Set up the grid element and add columns
     *
     * @param  {Integer} columns    The number of columns to create on init
     * @param  {Function} callback  Optional. Callback function to call when done
     */
    setup: function(columns, callback) {
      // Do not act on hidden elements or if set already
      if (!this.status) {
        // Retrieve the list of items from the grid itself.
        var self = this,
          range = document.createRange(),
          items = document.createElement('div');

        range.selectNodeContents(this.element);
        items.appendChild(range.extractContents());

        window.requestAnimationFrame(function() {
          addToDataset(items, 'columns', 0);
          self.addColumns(items, columns);
          self.status = true;

          isFunction(callback) && callback(self);
        });
      }
    },


    /**
     * Create columns with the configured classes and add a list of items to them.
     */
    addColumns: function(items, columns) {
      var columnClasses = ['column', 'size-1of'+ columns],
        columnsFragment = document.createDocumentFragment(),
        columnsItems = [],
        i = columns,
        childSelector;

      while (i-- !== 0) {
        childSelector = '[data-columns] > *:nth-child(' + columns + 'n-' + i + ')';
        columnsItems.push(items.querySelectorAll(childSelector));
      }

      each(columnsItems, function(rows) {
        var column = document.createElement('div'),
          rowsFragment = document.createDocumentFragment();

        column.className = columnClasses.join(' ');

        each(rows, function(row) {
          rowsFragment.appendChild(row);
        });
        column.appendChild(rowsFragment);
        columnsFragment.appendChild(column);
      });

      this.element.appendChild(columnsFragment);
      addToDataset(this.element, 'columns', columns);
      this.columns = columns;
    },


    /**
     * Remove all the columns from a grid and prepare it for populating again.
     *
     * @param  Object grid The grid element object
     * @return Object      A list of items sorted by the ordering of columns
     */
    removeColumns: function() {
      var range = document.createRange(),
        grid = this.element,
        columns;

      range.selectNodeContents(grid);

      columns = Array.prototype.filter.call(range.extractContents().childNodes, function filterElements(node) {
        return node instanceof window.HTMLElement;
      });

      var numberOfColumns = columns.length,
        numberOfRowsInFirstColumn = columns[0].childNodes.length,
        sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns);

      each(columns, function iterateColumns(column, columnIndex) {
        each(column.children, function iterateRows(row, rowIndex) {
          sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
        });
      });

      var container = document.createElement('div');
      addToDataset(container, 'columns', 0);

      sortedRows.filter(function(child) {
        return !!child;
      }).forEach(function(child) {
        container.appendChild(child);
      });

      return container;
    },


    /**
     * Remove all the columns from the grid, and add them again if the number of
     * columns have changed.
     *
     * @param  {[type]}   newColumns The number of columns to transform the Grid
     *   element to.
     * @param  {Function} callback   Optional. Callback function to call when done
     * @return {[type]}              [description]
     */
    redraw: function(newColumns, callback) {
      var self = this,
        eventDetails = {
          element: self.element,
          from: self.columns,
          to: newColumns
        },
        matchEvent = new CustomEvent('savvior:redraw', {detail: eventDetails});

      window.requestAnimationFrame(function() {
        if (self.columns !== newColumns) {
          self.addColumns(self.removeColumns(), newColumns);
        }

        window.dispatchEvent(matchEvent);
        isFunction(callback) && callback(self);
      });
    },


    /**
     * Restore the Grid element to its original state
     *
     * @param  {Function} callback  Optional. Callback function to call when done
     */
    restore: function(callback) {
      if (!this.status) {
        isFunction(callback) && callback(false);
        return false;
      }

      var self = this,
        eventDetails = {
          element: self.element,
          from: self.columns
        };

      window.requestAnimationFrame(function() {
        var fragment = document.createDocumentFragment(),
          container = self.removeColumns(),
          children = [],
          restoreEvent = new CustomEvent('savvior:restore', {detail: eventDetails});

        each(container.childNodes, function(item) {
          children.push(item);
        });
        children.forEach(function(child) {
          fragment.appendChild(child);
        });
        self.element.appendChild(fragment);
        self.element.removeAttribute('data-columns');


        window.dispatchEvent(restoreEvent);
        isFunction(callback) && callback(self);
      });
    }
  };
  /**
   * Implements the handling of a grid element.
   *
   * This performs operations via registered enquire handlers
   *
   * @param {Object} GridHandler
   * @param {String} GridHandler.selector Stores the selector of the Grid
   *   instance element
   * @param {Object} GridHandler.options  Defines the number of columns a grid
   *   should have for each media query registered
   * @param {Array} GridHandler.queryHandlers  Stores all registered enquire
   *   handlers so they are unregisterable
   * @param {Object} GridHandler.grid  The Grid object reference
   * @param {Boolean} GridHandler.ready  Pointer to maintain the Grid status
   * @constructor
   */
  function GridHandler(selector, options) {
    this.selector = selector;
    this.options = options;
    this.queryHandlers = [];
    this.grid = {};
    this.ready = false;
  }

  GridHandler.prototype = {

    /**
     * Register the Grid object instance and its enquire handlers
     */
    register: function() {
      var el = document.querySelector(this.selector);

      this.grid = new Grid(el, this.selector);

      for (var mq in this.options) {
        var handler = this.constructHandler(mq, this.options[mq]);
        this.queryHandlers.push(handler);
      }

      each(this.queryHandlers, function(h) {
        enquire.register(h.mq, h.handler);
      });

      this.ready = true;

      return this;
    },


    /**
     * Helper function to construct enquire handler objects
     *
     * @param  {String} mq The media query to register
     * @return {Object}    The handler object containing this.handler to
     *   register with enquire
     */
    constructHandler: function(mq) {
      var self = this;

      return {
        mq: mq,
        handler: {
          deferSetup: true,
          setup: function() {
            self.gridSetup(mq);
          },
          match: function() {
            self.gridMatch(mq);
          },
          destroy: function() {
            return;
          }
        }
      };
    },


    /**
     * Enquire setup callback
     *
     * @param  {[type]} mq The current query
     */
    gridSetup: function(mq) {
      var self = this;
      if (!self.grid.status) {
        self.grid.setup(self.options[mq].columns, function() {
          var eventDetails = {
              element: (self.grid) ? self.grid.element : null,
              columns: (self.grid) ? self.grid.columns : null,
            },
            evt = new CustomEvent('savvior:setup', {detail: eventDetails});
          window.dispatchEvent(evt);
        });
      }
    },


    /**
     * Enquire match callback
     *
     * @param  {[type]} mq The current query
     */
    gridMatch: function(mq) {
      var self = this,
        eventDetails = {
          element: self.grid.element,
          from: self.grid.columns,
          to: self.options[mq].columns,
          query: mq
        },
        evt = new CustomEvent('savvior:match', {detail: eventDetails});
      self.grid.redraw(self.options[mq].columns, function() {
        window.dispatchEvent(evt);
      });
    },


    /**
     * Restore the grid to its original state.
     *
     * This unregisters any previously registered enquire handlers and clears up
     * the object instance
     */
    unregister: function(callback) {
      each(this.queryHandlers, function(h) {
        enquire.unregister(h.mq, h.callbacks);
      });

      var self = this;
      this.grid.restore(function() {
        // Cleanup
        self.queryHandlers = [];
        delete self.grid;
        self.ready = false;

        isFunction(callback) && callback(self);
      });
    }
  };
  /**
   * Implements the top level registration of grid handlers and manages their
   * states.
   *
   * @param {Object} GridDispatch.grids  Collection of grid handlers
   * @constructor
   */
  function GridDispatch() {
    if (!enquire) {
      throw new Error('enquire.js not present, please load it before calling any methods');
    }

    this.grids = {};
  }

  GridDispatch.prototype = {

    /**
     * Registers a single grid handler
     *
     * @param  {String} selector The selector of the grid element
     * @param  {Object} options  Defines the number of columns a grid should have
     *   for each media query registered.
     * @return {Object}          The dispatch object instance
     */
    init: function(selector, options) {
      if (selector === undefined || options === undefined) {
        return false;
      }

      var evt = new CustomEvent('savvior:init'),
        grids = this.grids;

      if (!grids[selector]) {
        grids[selector] = new GridHandler(selector, options);
        grids[selector].selector = selector;
      }

      grids[selector].register(options);

      window.dispatchEvent(evt);

      return this;
    },

    /**
     * Restores one or all of the grids into their original state
     *
     * @param  {Array} selector     The selectors of the grids to destroy as given
     *   during the init call.
     * @param  {Function} callback  Optional. Callback function to call when done
     */
    destroy: function(selectors, callback) {
      var evt = new CustomEvent('savvior:destroy'),
        self = this,
        grids = (selectors === undefined || isEmpty(selectors)) ? Object.keys(this.grids) : selectors,
        total = grids.length,
        counter = 0,
        done = function(args) {
          delete self.grids[grids[counter]];
          if (++counter === total) {
            window.dispatchEvent(evt);
            isFunction(callback) && callback(args);
          }
        };

      each(grids, function(selector) {
        if (self.grids[selector] !== undefined) {
          self.grids[selector].unregister(done);
        }
      });
    },

    /**
     * Tells if one or all the grids are initialised
     *
     * @param  {String} selector Optional. The selector of the grid used in init()
     * @return {Boolean}         If selector is given, returns a boolean value, or
     *   undefined if selector does not exist. If called without an argument, an
     *   array of ready grids is returned.
     */
    ready: function(selector) {
      if (selector === undefined) {
        var grids = [];
        for (var key in this.grids) {
          if (this.grids[key].ready) {
            grids.push(key);
          }
        }
        return (grids.length > 0) ? grids : false;
      }

      if (!this.grids[selector]) {
        return false;
      }

      return this.grids[selector].ready;
    }
  };


  return new GridDispatch();

}));
