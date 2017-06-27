(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function dedupe(deps) {
    var newDeps = [];
    for (var i = 0, l = deps.length; i < l; i++)
      if (indexOf.call(newDeps, deps[i]) == -1)
        newDeps.push(deps[i])
    return newDeps;
  }

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry; 

    entry.deps = dedupe(entry.deps);

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;
      exports[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          var importerIndex = indexOf.call(importerModule.dependencies, module);
          importerModule.setters[importerIndex](exports);
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      var hasOwnProperty = exports && exports.hasOwnProperty;
      entry.esModule = {};
      for (var p in exports) {
        if (!hasOwnProperty || exports.hasOwnProperty(p))
          entry.esModule[p] = exports[p];
      }
      entry.esModule['default'] = exports;
      entry.esModule.__useDefault = true;
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, declare) {
    return function(formatDetect) {
      formatDetect(function() {
        var System = {
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        declare(System);

        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], function(System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(factory);
  // etc UMD / module pattern
})*/

(['data-table.js'], function(System) {

(function(__global) {
  var hasOwnProperty = __global.hasOwnProperty;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function readMemberExpression(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
      value = value[pParts.shift()];
    return value;
  }

  // bare minimum ignores for IE8
  var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external'];

  var globalSnapshot;

  function forEachGlobal(callback) {
    if (Object.keys)
      Object.keys(__global).forEach(callback);
    else
      for (var g in __global) {
        if (!hasOwnProperty.call(__global, g))
          continue;
        callback(g);
      }
  }

  function forEachGlobalValue(callback) {
    forEachGlobal(function(globalName) {
      if (indexOf.call(ignoredGlobalProps, globalName) != -1)
        return;
      try {
        var value = __global[globalName];
      }
      catch (e) {
        ignoredGlobalProps.push(globalName);
      }
      callback(globalName, value);
    });
  }

  System.set('@@global-helpers', System.newModule({
    prepareGlobal: function(moduleName, exportName, globals) {
      // set globals
      var oldGlobals;
      if (globals) {
        oldGlobals = {};
        for (var g in globals) {
          oldGlobals[g] = globals[g];
          __global[g] = globals[g];
        }
      }

      // store a complete copy of the global object in order to detect changes
      if (!exportName) {
        globalSnapshot = {};

        forEachGlobalValue(function(name, value) {
          globalSnapshot[name] = value;
        });
      }

      // return function to retrieve global
      return function() {
        var globalValue;

        if (exportName) {
          globalValue = readMemberExpression(exportName, __global);
        }
        else {
          var singleGlobal;
          var multipleExports;
          var exports = {};

          forEachGlobalValue(function(name, value) {
            if (globalSnapshot[name] === value)
              return;
            if (typeof value == 'undefined')
              return;
            exports[name] = value;

            if (typeof singleGlobal != 'undefined') {
              if (!multipleExports && singleGlobal !== value)
                multipleExports = true;
            }
            else {
              singleGlobal = value;
            }
          });
          globalValue = multipleExports ? exports : singleGlobal;
        }

        // revert globals
        if (oldGlobals) {
          for (var g in oldGlobals)
            __global[g] = oldGlobals[g];
        }

        return globalValue;
      };
    }
  }));

})(typeof self != 'undefined' ? self : global);

System.registerDynamic("utils/polyfill.js", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    (function() {
      function polyfill(fnName) {
        if (!Array.prototype[fnName]) {
          Array.prototype[fnName] = function(predicate) {
            var i,
                len,
                test,
                thisArg = arguments[1];
            if (typeof predicate !== "function") {
              throw new TypeError();
            }
            test = !thisArg ? predicate : function() {
              return predicate.apply(thisArg, arguments);
            };
            for (i = 0, len = this.length; i < len; i++) {
              if (test(this[i], i, this) === true) {
                return fnName === "find" ? this[i] : i;
              }
            }
            if (fnName !== "find") {
              return -1;
            }
          };
        }
      }
      for (var i in {
        find: 1,
        findIndex: 1
      }) {
        polyfill(i);
      }
    }());
  })();
  return _retrieveGlobal();
});

System.register('utils/throttle.js', ['@empty'], function (_export) {
  'use strict';

  var angular;

  _export('debounce', debounce);

  /**
   * Debounce helper
   * @param  {function}
   * @param  {int}
   * @param  {boolean}
   */

  _export('throttle', throttle);

  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function later() {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  }

  /**
   * Throttle helper
   * @param  {function}
   * @param  {boolean}
   * @param  {object}
   */

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function later() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = new Date();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }],
    execute: function () {
      ;;
    }
  };
});
System.register('utils/resizable.js', [], function (_export) {
  /**
   * Resizable directive
   * http://stackoverflow.com/questions/18368485/angular-js-resizable-div-directive
   * @param {object}
   * @param {function}
   * @param {function}
   */
  'use strict';

  _export('Resizable', Resizable);

  function Resizable($document, debounce, $timeout) {
    return {
      restrict: 'AEC',
      scope: {
        isResizable: '=resizable',
        minWidth: '=',
        maxWidth: '=',
        onResize: '&'
      },
      link: function link($scope, $element, $attrs) {
        if ($scope.isResizable) {
          $element.addClass('resizable');
        }

        var handle = angular.element('<span class="dt-resize-handle" title="Resize"></span>'),
            parent = $element.parent();

        handle.on('mousedown', function (event) {
          if (!$element[0].classList.contains('resizable')) {
            return false;
          }

          event.stopPropagation();
          event.preventDefault();

          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          var width = parent[0].scrollWidth,
              newWidth = width + event.movementX;

          if ((!$scope.minWidth || newWidth >= $scope.minWidth) && (!$scope.maxWidth || newWidth <= $scope.maxWidth)) {
            parent.css({
              width: newWidth + 'px'
            });
          }
        }

        function mouseup() {
          if ($scope.onResize) {
            $timeout(function () {
              $scope.onResize({ width: parent[0].scrollWidth });
            });
          }

          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }

        $element.append(handle);
      }
    };
  }

  return {
    setters: [],
    execute: function () {
      ;
    }
  };
});
System.register('utils/sortable.js', ['@empty'], function (_export) {
  'use strict';

  var angular;

  _export('Sortable', Sortable);

  /**
   * Sortable Directive
   * http://jsfiddle.net/RubaXa/zLq5J/3/
   * https://jsfiddle.net/hrohxze0/6/
   * @param {function}
   */

  function Sortable($timeout) {
    return {
      restrict: 'AC',
      scope: {
        isSortable: '=sortable',
        onSortableSort: '&'
      },
      link: function link($scope, $element, $attrs) {
        var rootEl = $element[0],
            dragEl,
            nextEl,
            dropEl;

        $timeout(function () {
          angular.forEach(rootEl.children, function (el) {
            el.draggable = true;
          });
        });

        function isbefore(a, b) {
          if (a.parentNode == b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
              if (cur === b) {
                return true;
              }
            }
          }
          return false;
        };

        function onDragEnter(e) {
          var target = e.target;
          if (isbefore(dragEl, target)) {
            target.parentNode.insertBefore(dragEl, target);
          } else if (target.nextSibling && target.hasAttribute('draggable')) {
            target.parentNode.insertBefore(dragEl, target.nextSibling);
          }
        };

        function onDragEnd(evt) {
          evt.preventDefault();

          dragEl.classList.remove('dt-clone');

          $element.off('dragend', onDragEnd);
          $element.off('dragenter', onDragEnter);

          if (nextEl !== dragEl.nextSibling) {
            $scope.onSortableSort({
              event: evt,
              childScope: angular.element(dragEl).scope()
            });
          }
        };

        function onDragStart(evt) {
          if (!$scope.isSortable) return false;

          dragEl = evt.target;
          nextEl = dragEl.nextSibling;
          dragEl.classList.add('dt-clone');

          evt.dataTransfer.effectAllowed = 'move';
          evt.dataTransfer.setData('Text', dragEl.textContent);

          $element.on('dragenter', onDragEnter);
          $element.on('dragend', onDragEnd);
        };

        $element.on('dragstart', onDragStart);

        $scope.$on('$destroy', function () {
          $element.off('dragstart', onDragStart);
        });
      }
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }],
    execute: function () {}
  };
});
System.register('utils/utils.js', ['utils/math.js'], function (_export) {
  'use strict';

  var ColumnTotalWidth, requestAnimFrame, CamelCase;

  _export('ColumnsByPin', ColumnsByPin);

  _export('ColumnGroupWidths', ColumnGroupWidths);

  _export('DeepValueGetter', DeepValueGetter);

  /**
   * Returns the columns by pin.
   * @param {array} colsumns
   */

  function ColumnsByPin(cols) {
    var ret = {
      left: [],
      center: [],
      right: []
    };

    for (var i = 0, len = cols.length; i < len; i++) {
      var c = cols[i];
      if (c.frozenLeft) {
        ret.left.push(c);
      } else if (c.frozenRight) {
        ret.right.push(c);
      } else {
        ret.center.push(c);
      }
    }

    return ret;
  }

  /**
   * Returns the widths of all group sets of a column
   * @param {object} groups 
   * @param {array} all 
   */

  function ColumnGroupWidths(groups, all) {
    return {
      left: ColumnTotalWidth(groups.left),
      center: ColumnTotalWidth(groups.center),
      right: ColumnTotalWidth(groups.right),
      total: ColumnTotalWidth(all)
    };
  }

  /**
   * Returns a deep object given a string. zoo['animal.type']
   * @param {object} obj  
   * @param {string} path 
   */

  function DeepValueGetter(obj, path) {
    if (!obj || !path) return obj;

    var current = obj,
        split = path.split('.');

    if (split.length) {
      for (var i = 0, len = split.length; i < len; i++) {
        current = current[split[i]];
      }
    }

    return current;
  }

  return {
    setters: [function (_utilsMathJs) {
      ColumnTotalWidth = _utilsMathJs.ColumnTotalWidth;
    }],
    execute: function () {

      /**
       * Shim layer with setTimeout fallback
       * http://www.html5rocks.com/en/tutorials/speed/animations/
       */

      requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      _export('requestAnimFrame', requestAnimFrame);

      ;;

      /**
       * Converts strings from something to camel case
       * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
       * @param  {string} str 
       * @return {string} camel case string
       */

      CamelCase = function CamelCase(str) {
        // Replace special characters with a space
        str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
        // put a space before an uppercase letter
        str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
        // Lower case first character and some other stuff
        str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
        // uppercase characters preceded by a space or number
        str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
          return b.trim() + c.toUpperCase();
        });
        return str;
      };

      _export('CamelCase', CamelCase);
    }
  };
});
System.register('defaults.js', [], function (_export) {
  /**
   * Default Table Options
   * @type {object}
   */
  'use strict';

  var TableDefaults, ColumnDefaults;
  return {
    setters: [],
    execute: function () {
      TableDefaults = Object.freeze({

        // Enable vertical scrollbars
        scrollbarV: true,

        // Enable horz scrollbars
        // scrollbarH: true,

        // The row height, which is necessary
        // to calculate the height for the lazy rendering.
        rowHeight: 30,

        // Expands the columns to fill the given width.
        // Can NOT be used with flex grow attributes
        forceFillColumns: false,

        // Loading message presented when the array is undefined
        loadingMessage: 'Loading...',

        // Message to show when array is presented
        // but contains no values
        emptyMessage: 'No data to display',

        // The minimum header height in pixels.
        // pass falsey for no header
        headerHeight: 50,

        // The minimum footer height in pixels.
        // pass falsey for no footer
        footerHeight: 0,

        paging: {
          // if external paging is turned on
          externalPaging: false,

          // Page size
          size: undefined,

          // Total count
          count: 0,

          // Page offset
          offset: 0
        },

        // if users can select itmes
        selectable: false,

        // if users can select mutliple items
        multiSelect: false,

        // checkbox selection vs row click
        checkboxSelection: false,

        // if you can reorder columns
        reorderable: true,

        internal: {
          offsetX: 0,
          offsetY: 0,
          innerWidth: 0,
          bodyHeight: 300
        }

      });

      _export('TableDefaults', TableDefaults);

      /**
       * Default Column Options
       * @type {object}
       */
      ColumnDefaults = Object.freeze({

        // pinned to the left
        frozenLeft: false,

        // pinned to the right
        frozenRight: false,

        // body cell css class name
        className: undefined,

        // header cell css class name
        heaerClassName: undefined,

        // The grow factor relative to other columns. Same as the flex-grow
        // API from http://www.w3.org/TR/css3-flexbox/. Basically,
        // take any available extra width and distribute it proportionally
        // according to all columns' flexGrow values.
        flexGrow: 0,

        // Minimum width of the column.
        minWidth: undefined,

        //Maximum width of the column.
        maxWidth: undefined,

        // The width of the column, by default (in pixels).
        width: 150,

        // If yes then the column can be resized, otherwise it cannot.
        resizable: true,

        // Custom sort comparator
        // pass false if you want to server sort
        comparator: undefined,

        // If yes then the column can be sorted.
        sortable: true,

        // Default sort asecending/descending for the column
        sort: undefined,

        // The cell renderer that returns content for table column header
        headerRenderer: undefined,

        // The cell renderer function(scope, elm) that returns React-renderable content for table cell.
        cellRenderer: undefined,

        // The getter function(value) that returns the cell data for the cellRenderer.
        // If not provided, the cell data will be collected from row data instead.
        cellDataGetter: undefined,

        // Adds +/- button and makes a secondary call to load nested data
        isTreeColumn: false,

        // Adds the checkbox selection to the column
        isCheckboxColumn: false,

        // Toggles the checkbox column in the header
        // for selecting all values given to the grid
        headerCheckbox: false

      });

      _export('ColumnDefaults', ColumnDefaults);
    }
  };
});
System.register('components/header/header.js', ['@empty', 'utils/sortable.js'], function (_export) {
  'use strict';

  var angular, Sortable, HeaderController;

  _export('HeaderDirective', HeaderDirective);

  function HeaderDirective($timeout) {

    return {
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: 'header',
      scope: {
        options: '=',
        columns: '=',
        columnWidths: '=',
        onSort: '&',
        onResize: '&',
        onCheckboxChange: '&'
      },
      template: '\n      <div class="dt-header" ng-style="header.styles(this)">\n        <div class="dt-header-inner" ng-style="header.innerStyles(this)">\n          <div class="dt-row-left"\n               ng-style="header.stylesByGroup(this, \'left\')"\n               sortable="options.reorderable"\n               on-sortable-sort="columnsResorted(event, childScope)">\n            <dt-header-cell ng-repeat="column in columns[\'left\'] track by column.name" \n                            on-checkbox-change="header.onCheckboxChange(this)"\n                            on-sort="header.onSort(this, column)"\n                            on-resize="header.onResize(this, column, width)"\n                            selected="header.isSelected(this)"\n                            column="column">\n            </dt-header-cell>\n          </div>\n          <div class="dt-row-center" \n               sortable="options.reorderable"\n               ng-style="header.stylesByGroup(this, \'center\')"\n               on-sortable-sort="columnsResorted(event, childScope)">\n            <dt-header-cell ng-repeat="column in columns[\'center\'] track by column.name" \n                            on-checkbox-change="header.onCheckboxChange(this)"\n                            on-sort="header.onSort(this, column)"\n                            selected="header.isSelected(this)"\n                            on-resize="header.onResize(this, column, width)"\n                            column="column">\n            </dt-header-cell>\n          </div>\n          <div class="dt-row-right"\n               sortable="options.reorderable"\n               ng-style="header.stylesByGroup(this, \'right\')"\n               on-sortable-sort="columnsResorted(event, childScope)">\n            <dt-header-cell ng-repeat="column in columns[\'right\'] track by column.name" \n                            on-checkbox-change="header.onCheckboxChange(this)"\n                            on-sort="header.onSort(this, column)"\n                            selected="header.isSelected(this)"\n                            on-resize="header.onResize(this, column, width)"\n                            column="column">\n            </dt-header-cell>\n          </div>\n        </div>\n      </div>',
      replace: true,
      link: function link($scope, $elm, $attrs, ctrl) {

        $scope.columnsResorted = function (event, childScope) {
          var col = childScope.column,
              parent = angular.element(event.currentTarget),
              newIdx = -1;

          angular.forEach(parent.children(), function (c, i) {
            if (childScope === angular.element(c).scope()) {
              newIdx = i;
            }
          });

          $timeout(function () {
            angular.forEach($scope.columns, function (group) {
              var idx = group.indexOf(col);
              if (idx > -1) {
                group.splice(idx, 1);
                group.splice(newIdx, 0, col);
              }
            });
          });
        };
      }
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }, function (_utilsSortableJs) {
      Sortable = _utilsSortableJs.Sortable;
    }],
    execute: function () {
      HeaderController = (function () {
        function HeaderController() {
          babelHelpers.classCallCheck(this, HeaderController);
        }

        babelHelpers.createClass(HeaderController, [{
          key: 'styles',

          /**
           * Returns the styles for the header directive.
           * @param  {object} scope
           * @return {object} styles
           */
          value: function styles(scope) {
            return {
              width: scope.options.internal.innerWidth + 'px',
              height: scope.options.headerHeight + 'px'
            };
          }
        }, {
          key: 'innerStyles',

          /**
           * Returns the inner styles for the header directive
           * @param  {object} scope
           * @return {object} styles
           */
          value: function innerStyles(scope) {
            return {
              width: scope.columnWidths.total + 'px'
            };
          }
        }, {
          key: 'onSort',

          /**
           * Invoked when a column sort direction has changed
           * @param  {object} scope
           * @param  {object} column
           */
          value: function onSort(scope, column) {
            scope.onSort({
              column: column
            });
          }
        }, {
          key: 'stylesByGroup',

          /**
           * Returns the styles by group for the headers.
           * @param  {scope}
           * @param  {group}
           * @return {styles object}
           */
          value: function stylesByGroup(scope, group) {
            var styles = {
              width: scope.columnWidths[group] + 'px'
            };

            if (group === 'center') {
              styles['transform'] = 'translate3d(-' + scope.options.internal.offsetX + 'px, 0, 0)';
            } else if (group === 'right') {
              var offset = scope.columnWidths.total - scope.options.internal.innerWidth;
              styles.transform = 'translate3d(-' + offset + 'px, 0, 0)';
            }

            return styles;
          }
        }, {
          key: 'onCheckboxChange',

          /**
           * Invoked when the header cell directive's checkbox has changed.
           * @param  {scope}
           */
          value: function onCheckboxChange(scope) {
            scope.onCheckboxChange();
          }
        }, {
          key: 'onResize',

          /**
           * Occurs when a header cell directive triggered a resize
           * @param  {object} scope  
           * @param  {object} column 
           * @param  {int} width  
           */
          value: function onResize(scope, column, width) {
            scope.onResize({
              column: column,
              width: width
            });
          }
        }]);
        return HeaderController;
      })();

      _export('HeaderController', HeaderController);

      ;

      ;
    }
  };
});
System.register('components/header/header-cell.js', ['@empty', 'utils/resizable.js'], function (_export) {
  'use strict';

  var angular, Resizable, HeaderCellController;

  _export('HeaderCellDirective', HeaderCellDirective);

  function HeaderCellDirective($compile) {
    return {
      restrict: 'E',
      controller: 'HeaderCellController',
      controllerAs: 'hcell',
      scope: {
        column: '=',
        onCheckboxChange: '&',
        onSort: '&',
        onResize: '&',
        selected: '='
      },
      replace: true,
      template: '<div ng-class="hcell.cellClass(this)"\n            ng-style="hcell.styles(this)"\n            title="{{::column.name}}">\n        <div resizable="column.resizable" \n             on-resize="hcell.onResize(this, width, column)"\n             min-width="column.minWidth"\n             max-width="column.maxWidth">\n          <label ng-if="column.isCheckboxColumn && column.headerCheckbox" class="dt-checkbox">\n            <input type="checkbox" \n                   ng-checked="selected"\n                   ng-click="hcell.onCheckboxChange(this)" />\n          </label>\n          <span class="dt-header-cell-label" \n                ng-click="hcell.sort(this)">\n          </span>\n          <span ng-class="hcell.sortClass(this)"></span>\n        </div>\n      </div>',
      compile: function compile() {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var label = $elm[0].querySelector('.dt-header-cell-label');

            if ($scope.column.headerRenderer) {
              var elm = angular.element($scope.column.headerRenderer($scope, $elm));
              angular.element(label).append($compile(elm)($scope)[0]);
            } else {
              var val = $scope.column.name;
              if (val === undefined || val === null) val = '';
              label.innerHTML = val;
            }
          }
        };
      }
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }, function (_utilsResizableJs) {
      Resizable = _utilsResizableJs.Resizable;
    }],
    execute: function () {
      HeaderCellController = (function () {
        function HeaderCellController() {
          babelHelpers.classCallCheck(this, HeaderCellController);
        }

        babelHelpers.createClass(HeaderCellController, [{
          key: 'styles',

          /**
           * Calculates the styles for the header cell directive
           * @param  {scope}
           * @return {styles}
           */
          value: function styles(scope) {
            return {
              width: scope.column.width + 'px',
              minWidth: scope.column.minWidth + 'px',
              maxWidth: scope.column.maxWidth + 'px',
              height: scope.column.height + 'px'
            };
          }
        }, {
          key: 'cellClass',

          /**
           * Calculates the css classes for the header cell directive
           * @param  {scope}
           */
          value: function cellClass(scope) {
            var cls = {
              'sortable': scope.column.sortable,
              'dt-header-cell': true,
              'resizable': scope.column.resizable
            };

            if (scope.column.heaerClassName) {
              cls[scope.column.heaerClassName] = true;
            }

            return cls;
          }
        }, {
          key: 'sort',

          /**
           * Toggles the sorting on the column
           * @param  {scope}
           */
          value: function sort(scope) {
            if (scope.column.sortable) {
              if (!scope.column.sort) {
                scope.column.sort = 'asc';
              } else if (scope.column.sort === 'asc') {
                scope.column.sort = 'desc';
              } else if (scope.column.sort === 'desc') {
                scope.column.sort = undefined;
              }

              scope.onSort({
                column: scope.column
              });
            }
          }
        }, {
          key: 'sortClass',

          /**
           * Toggles the css class for the sort button
           * @param  {scope}
           */
          value: function sortClass(scope) {
            return {
              'sort-btn': true,
              'sort-asc icon-down': scope.column.sort === 'asc',
              'sort-desc icon-up': scope.column.sort === 'desc'
            };
          }
        }, {
          key: 'onResize',

          /**
           * Updates the column width on resize
           * @param  {width}
           * @param  {column}
           */
          value: function onResize(scope, width, column) {
            scope.onResize({
              column: column,
              width: width
            });
            //column.width = width;
          }
        }, {
          key: 'onCheckboxChange',

          /**
           * Invoked when the header cell directive checkbox was changed
           * @param  {object} scope angularjs scope
           */
          value: function onCheckboxChange(scope) {
            scope.onCheckboxChange();
          }
        }]);
        return HeaderCellController;
      })();

      _export('HeaderCellController', HeaderCellController);

      ;
    }
  };
});
System.register("utils/keys.js", [], function (_export) {
  /**
   * Shortcut for key handlers
   * @type {Object}
   */
  "use strict";

  var KEYS;
  return {
    setters: [],
    execute: function () {
      KEYS = {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46,
        COMMA: 188,
        PERIOD: 190,
        A: 65,
        Z: 90,
        ZERO: 48,
        NUMPAD_0: 96,
        NUMPAD_9: 105
      };

      _export("KEYS", KEYS);
    }
  };
});
System.register('components/body/row.js', ['@empty', 'utils/utils.js'], function (_export) {
  'use strict';

  var angular, DeepValueGetter, RowController;

  _export('RowDirective', RowDirective);

  function RowDirective() {
    return {
      restrict: 'E',
      controller: 'RowController',
      controllerAs: 'row',
      scope: {
        value: '=',
        columns: '=',
        columnWidths: '=',
        expanded: '=',
        selected: '=',
        hasChildren: '=',
        options: '=',
        onCheckboxChange: '&',
        onTreeToggle: '&'
      },
      template: '\n      <div class="dt-row">\n        <div class="dt-row-left dt-row-block" ng-style="row.stylesByGroup(this, \'left\')">\n          <dt-cell ng-repeat="column in columns[\'left\'] track by $index"\n                   on-tree-toggle="row.onTreeToggle(this, cell)"\n                   column="column"\n                   has-children="hasChildren"\n                   on-checkbox-change="row.onCheckboxChange(this)"\n                   selected="selected"\n                   expanded="expanded"\n                   value="row.getValue(this, column)">\n          </dt-cell>\n        </div>\n        <div class="dt-row-center dt-row-block" ng-style="row.stylesByGroup(this, \'center\')">\n          <dt-cell ng-repeat="column in columns[\'center\'] track by $index"\n                   on-tree-toggle="row.onTreeToggle(this, cell)"\n                   column="column"\n                   has-children="hasChildren"\n                   expanded="expanded"\n                   selected="selected"\n                   on-checkbox-change="row.onCheckboxChange(this)"\n                   value="row.getValue(this, column)">\n          </dt-cell>\n        </div>\n        <div class="dt-row-right dt-row-block" ng-style="row.stylesByGroup(this, \'right\')">\n          <dt-cell ng-repeat="column in columns[\'right\'] track by $index"\n                   on-tree-toggle="row.onTreeToggle(this, cell)"\n                   column="column"\n                   has-children="hasChildren"\n                   selected="selected"\n                   on-checkbox-change="row.onCheckboxChange(this)"\n                   expanded="expanded"\n                   value="row.getValue(this, column)">\n          </dt-cell>\n        </div>\n      </div>',
      replace: true
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }, function (_utilsUtilsJs) {
      DeepValueGetter = _utilsUtilsJs.DeepValueGetter;
    }],
    execute: function () {
      RowController = (function () {
        function RowController() {
          babelHelpers.classCallCheck(this, RowController);
        }

        babelHelpers.createClass(RowController, [{
          key: 'getValue',

          /**
           * Returns the value for a given column
           * @param  {scope}
           * @param  {col}
           * @return {value}
           */
          value: function getValue(scope, col) {
            return DeepValueGetter(scope.value, col.prop);
          }
        }, {
          key: 'onTreeToggle',

          /**
           * Invoked when a cell triggers the tree toggle
           * @param  {scope}
           * @param  {cell}
           */
          value: function onTreeToggle(scope, cell) {
            scope.onTreeToggle({
              cell: cell,
              row: scope.value
            });
          }
        }, {
          key: 'stylesByGroup',

          /**
           * Calculates the styles for a pin group
           * @param  {scope}
           * @param  {group}
           * @return {styles object}
           */
          value: function stylesByGroup(scope, group) {
            var styles = {
              width: scope.columnWidths[group] + 'px'
            };

            if (group === 'left') {
              styles.transform = 'translate3d(' + scope.options.internal.offsetX + 'px, 0, 0)';
            } else if (group === 'right') {
              var offset = scope.columnWidths.total - scope.options.internal.innerWidth - scope.options.internal.offsetX;
              styles.transform = 'translate3d(-' + offset + 'px, 0, 0)';
            }

            return styles;
          }
        }, {
          key: 'onCheckboxChange',

          /**
           * Invoked when the cell directive's checkbox changed state
           * @param  {scope}
           */
          value: function onCheckboxChange(scope) {
            scope.onCheckboxChange({
              row: scope.value
            });
          }
        }]);
        return RowController;
      })();

      _export('RowController', RowController);

      ;
    }
  };
});
System.register('components/body/group-row.js', ['@empty'], function (_export) {
  'use strict';

  var angular, GroupRowController;

  _export('GroupRowDirective', GroupRowDirective);

  function GroupRowDirective() {
    return {
      restrict: 'E',
      controller: 'GroupRowController',
      controllerAs: 'group',
      scope: {
        value: '=',
        onGroupToggle: '&',
        expanded: '='
      },
      replace: true,
      template: '\n      <div class="dt-group-row">\n        <span ng-class="group.treeClass(this)"\n              ng-click="group.onGroupToggle($event, this)">\n        </span>\n        <span class="dt-group-row-label">\n          {{value.name}}\n        </span>\n      </div>'
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }],
    execute: function () {
      GroupRowController = (function () {
        function GroupRowController() {
          babelHelpers.classCallCheck(this, GroupRowController);
        }

        babelHelpers.createClass(GroupRowController, [{
          key: 'onGroupToggle',
          value: function onGroupToggle(evt, scope) {
            evt.stopPropagation();
            scope.onGroupToggle({
              group: scope.value
            });
          }
        }, {
          key: 'treeClass',
          value: function treeClass(scope) {
            return {
              'dt-tree-toggle': true,
              'icon-right': !scope.expanded,
              'icon-down': scope.expanded
            };
          }
        }]);
        return GroupRowController;
      })();

      _export('GroupRowController', GroupRowController);

      ;
    }
  };
});
System.register('components/body/cell.js', ['@empty'], function (_export) {
  'use strict';

  var angular, CellController;

  _export('CellDirective', CellDirective);

  function CellDirective($rootScope, $compile, $log) {
    return {
      restrict: 'E',
      controller: 'CellController',
      controllerAs: 'cell',
      scope: {
        value: '=',
        selected: '=',
        column: '=',
        expanded: '=',
        hasChildren: '=',
        onTreeToggle: '&',
        onCheckboxChange: '&'
      },
      template: '<div class="dt-cell" \n            data-title="{{::column.name}}" \n            ng-style="cell.styles(column)"\n            ng-class="cell.cellClass(column)">\n        <label ng-if="column.isCheckboxColumn" class="dt-checkbox">\n          <input type="checkbox" \n                 ng-checked="selected"\n                 ng-click="cell.onCheckboxChange(this)" />\n        </label>\n        <span ng-if="column.isTreeColumn && hasChildren"\n              ng-class="cell.treeClass(this)"\n              ng-click="cell.onTreeToggle($event, this)"></span>\n        <span class="dt-cell-content"></span>\n      </div>',
      replace: true,
      compile: function compile() {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var content = angular.element($elm[0].querySelector('.dt-cell-content'));

            $scope.$watch('value', function () {
              content.empty();

              if ($scope.column.cellRenderer) {
                var elm = angular.element($scope.column.cellRenderer($scope, content));
                content.append($compile(elm)($scope));
              } else {
                content[0].innerHTML = ctrl.getValue($scope);
              }
            });
          }
        };
      }
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }],
    execute: function () {
      CellController = (function () {
        function CellController() {
          babelHelpers.classCallCheck(this, CellController);
        }

        babelHelpers.createClass(CellController, [{
          key: 'styles',

          /**
           * Calculates the styles for the Cell Directive
           * @param  {column}
           * @return {styles object}
           */
          value: function styles(col) {
            return {
              width: col.width + 'px'
            };
          }
        }, {
          key: 'cellClass',

          /**
           * Calculates the css classes for the cell directive
           * @param  {column}
           * @return {class object}
           */
          value: function cellClass(col) {
            var style = {
              'dt-tree-col': col.isTreeColumn
            };

            if (col.className) {
              style[col.className] = true;
            }

            return style;
          }
        }, {
          key: 'treeClass',

          /**
           * Calculates the tree class styles.
           * @param  {scope}
           * @return {css classes object}
           */
          value: function treeClass(scope) {
            return {
              'dt-tree-toggle': true,
              'icon-right': !scope.expanded,
              'icon-down': scope.expanded
            };
          }
        }, {
          key: 'onTreeToggle',

          /**
           * Invoked when the tree toggle button was clicked.
           * @param  {event}
           * @param  {scope}
           */
          value: function onTreeToggle(evt, scope) {
            evt.stopPropagation();
            scope.expanded = !scope.expanded;
            scope.onTreeToggle({
              cell: {
                value: scope.value,
                column: scope.column,
                expanded: scope.expanded
              }
            });
          }
        }, {
          key: 'onCheckboxChange',

          /**
           * Invoked when the checkbox was changed
           * @param  {object} scope 
           */
          value: function onCheckboxChange(scope) {
            scope.onCheckboxChange();
          }
        }, {
          key: 'getValue',

          /**
           * Returns the value in its fomatted form
           * @param  {object} scope 
           * @return {string} value
           */
          value: function getValue(scope) {
            var val = scope.column.cellDataGetter ? scope.column.cellDataGetter(scope.value) : scope.value;

            if (val === undefined || val === null) val = '';

            return val;
          }
        }]);
        return CellController;
      })();

      _export('CellController', CellController);

      ;

      ;
    }
  };
});
System.register('components/footer/footer.js', ['@empty'], function (_export) {
  'use strict';

  var angular, FooterController;

  _export('FooterDirective', FooterDirective);

  function FooterDirective() {
    return {
      restrict: 'E',
      controller: 'FooterController',
      controllerAs: 'footer',
      scope: {
        paging: '=',
        onPage: '&'
      },
      template: '<div class="dt-footer">\n        <div class="page-count">{{paging.count}} total</div>\n        <dt-pager page="page"\n               size="paging.size"\n               count="paging.count"\n               on-page="footer.onPage(this, page)"\n               ng-show="paging.count > 1">\n         </dt-pager>\n      </div>',
      replace: true
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }],
    execute: function () {
      FooterController = (function () {

        /**
         * Creates an instance of the Footer Controller
         * @param  {scope}
         * @return {[type]}
         */
        /*@ngInject*/

        function FooterController($scope) {
          var _this = this;

          babelHelpers.classCallCheck(this, FooterController);

          $scope.page = $scope.paging.offset + 1;
          $scope.$watch('paging.offset', function (newVal) {
            _this.offsetChanged($scope, newVal);
          });
        }

        babelHelpers.createClass(FooterController, [{
          key: 'offsetChanged',

          /**
           * The offset ( page ) changed externally, update the page
           * @param  {new offset}
           */
          value: function offsetChanged(scope, newVal) {
            scope.page = newVal + 1;
          }
        }, {
          key: 'onPage',

          /**
           * The pager was invoked
           * @param  {scope}
           */
          value: function onPage(scope, page) {
            scope.paging.offset = page - 1;
            scope.onPage({
              offset: scope.paging.offset,
              size: scope.paging.size
            });
          }
        }]);
        return FooterController;
      })();

      _export('FooterController', FooterController);

      ;

      ;
    }
  };
});
System.register('components/footer/pager.js', ['@empty'], function (_export) {
  'use strict';

  var angular, PagerController;

  _export('PagerDirective', PagerDirective);

  function PagerDirective() {
    return {
      restrict: 'E',
      controller: 'PagerController',
      controllerAs: 'pager',
      scope: {
        page: '=',
        size: '=',
        count: '=',
        onPage: '&'
      },
      template: '<div class="dt-pager">\n        <ul class="pager">\n          <li ng-class="{ disabled: !pager.canPrevious(this) }">\n            <a href ng-click="pager.selectPage(this, 1)" class="icon-left"></a>\n          </li>\n          <li ng-repeat="pg in pager.pages track by $index" ng-class="{ active: pg.active }">\n            <a href ng-click="pager.selectPage(this, pg.number)">{{pg.text}}</a>\n          </li>\n          <li ng-class="{ disabled: !pager.canNext(this) }">\n            <a href ng-click="pager.selectPage(this, pager.totalPages)" class="icon-right"></a>\n          </li>\n        </ul>\n      </div>',
      replace: true
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }],
    execute: function () {
      PagerController = (function () {

        /**
         * Creates an instance of the Pager Controller
         * @param  {object} $scope   
         */
        /*@ngInject*/

        function PagerController($scope) {
          var _this = this;

          babelHelpers.classCallCheck(this, PagerController);

          angular.extend(this, {
            size: $scope.size,
            count: $scope.count
          });

          this.totalPages = this.calcTotalPages();
          $scope.$watch('page', function (newVal) {
            if (newVal !== 0 && newVal <= _this.totalPages) {
              _this.getPages(newVal);
            }
          });
        }

        babelHelpers.createClass(PagerController, [{
          key: 'calcTotalPages',

          /**
           * Calculates the total number of pages given the count.
           * @return {int} page count
           */
          value: function calcTotalPages() {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
          }
        }, {
          key: 'selectPage',

          /**
           * Select a page
           * @param  {object} scope 
           * @param  {int} num   
           */
          value: function selectPage(scope, num) {
            if (num > 0 && num <= this.totalPages) {
              scope.page = num;
              scope.onPage({
                page: num
              });
            }
          }
        }, {
          key: 'canPrevious',

          /**
           * Determines if the pager can go previous
           * @param  {scope} scope 
           * @return {boolean}
           */
          value: function canPrevious(scope) {
            return scope.page !== 1;
          }
        }, {
          key: 'canNext',

          /**
           * Determines if the pager can go forward
           * @param  {object} scope 
           * @return {boolean}       
           */
          value: function canNext(scope) {
            return scope.page <= this.totalPages;
          }
        }, {
          key: 'getPages',

          /**
           * Gets the page set given the current page
           * @param  {int} page 
           */
          value: function getPages(page) {
            var pages = [],
                startPage = 1,
                endPage = this.totalPages,
                maxSize = 5,
                isMaxSized = maxSize < this.totalPages;

            if (isMaxSized) {
              startPage = (Math.ceil(page / maxSize) - 1) * maxSize + 1;
              endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }

            for (var number = startPage; number <= endPage; number++) {
              pages.push({
                number: number,
                text: number,
                active: number === page
              });
            }

            if (isMaxSized) {
              if (startPage > 1) {
                pages.unshift({
                  number: startPage - 1,
                  text: '...'
                });
              }

              if (endPage < this.totalPages) {
                pages.push({
                  number: endPage + 1,
                  text: '...'
                });
              }
            }

            this.pages = pages;
          }
        }]);
        return PagerController;
      })();

      _export('PagerController', PagerController);

      ;

      ;
    }
  };
});
System.register('utils/math.js', ['@empty', 'utils/utils.js'], function (_export) {
  'use strict';

  var angular, ColumnsByPin, ColumnGroupWidths;

  _export('ColumnTotalWidth', ColumnTotalWidth);

  /**
   * Calculates the total width of all columns and their groups
   * @param {int}
   */

  _export('GetTotalFlexGrow', GetTotalFlexGrow);

  /**
   * Calculates the Total Flex Grow width.
   * @param {array}
   */

  _export('DistributeFlexWidth', DistributeFlexWidth);

  /**
   * Distributes the flex widths to the columns
   * @param {array} columns
   * @param {int} flex width
   */

  _export('AdjustColumnWidths', AdjustColumnWidths);

  /**
   * Adjusts the column widths.
   * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
   * @param {array} all columns
   * @param {int} width
   */

  _export('ForceFillColumnWidths', ForceFillColumnWidths);

  /**
   * Forces the width of the columns to 
   * distribute equally but overflowing when nesc.
   * @param {array} allColumns 
   * @param {int} expectedWidth
   */

  function ColumnTotalWidth(columns) {
    var totalWidth = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        totalWidth += c.width;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return totalWidth;
  }

  function GetTotalFlexGrow(columns) {
    var totalFlexGrow = 0;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var c = _step2.value;

        totalFlexGrow += c.flexGrow || 0;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return totalFlexGrow;
  }

  function DistributeFlexWidth(columns, flexWidth) {
    if (flexWidth <= 0) {
      return {
        columns: columns,
        width: ColumnTotalWidth(columns)
      };
    }

    var remainingFlexGrow = GetTotalFlexGrow(columns),
        remainingFlexWidth = flexWidth,
        totalWidth = 0;

    for (var i = 0, len = columns.length; i < len; i++) {
      var column = columns[i];

      if (!column.flexGrow) {
        totalWidth += column.width;
        return;
      }

      var columnFlexWidth = Math.floor(column.flexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnWidth = Math.floor(column.width + columnFlexWidth);

      if (column.minWidth && newColumnWidth < column.minWidth) {
        newColumnWidth = column.minWidth;
      }

      if (column.maxWidth && newColumnWidth > column.maxWidth) {
        newColumnWidth = column.maxWidth;
      }

      totalWidth += newColumnWidth;
      remainingFlexGrow -= column.flexGrow;
      remainingFlexWidth -= columnFlexWidth;

      column.width = newColumnWidth;
    }

    return {
      width: totalWidth
    };
  }

  function AdjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = ColumnTotalWidth(allColumns),
        remainingFlexGrow = GetTotalFlexGrow(allColumns),
        remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0),
        colsByGroup = ColumnsByPin(allColumns);

    angular.forEach(colsByGroup, function (cols) {
      var columnGroupFlexGrow = GetTotalFlexGrow(cols),
          columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnSettings = DistributeFlexWidth(cols, columnGroupFlexWidth);

      remainingFlexGrow -= columnGroupFlexGrow;
      remainingFlexWidth -= columnGroupFlexWidth;
    });
  }

  function ForceFillColumnWidths(allColumns, expectedWidth) {
    var colsByGroup = ColumnsByPin(allColumns),
        widthsByGroup = ColumnGroupWidths(colsByGroup, allColumns),
        availableWidth = expectedWidth - (widthsByGroup.left + widthsByGroup.right);

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = colsByGroup.center[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _column = _step3.value;

        if (_column.$$oldWidth) {
          _column.width = _column.$$oldWidth;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var contentWidth = ColumnTotalWidth(colsByGroup.center),
        remainingWidth = availableWidth - contentWidth,
        additionWidthPerColumn = Math.floor(remainingWidth / colsByGroup.center.length),
        oldLargerThanNew = contentWidth > widthsByGroup.center;

    for (var i = 0, len = allColumns.length; i < len; i++) {
      var column = allColumns[i];
      if (!column.frozenLeft && !column.frozenRight) {
        // cache first size
        if (!column.$$oldWidth) {
          column.$$oldWidth = column.width;
        }

        var newSize = column.width + additionWidthPerColumn;
        column.width = oldLargerThanNew ? column.$$oldWidth : newSize;
      }
    }
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }, function (_utilsUtilsJs) {
      ColumnsByPin = _utilsUtilsJs.ColumnsByPin;
      ColumnGroupWidths = _utilsUtilsJs.ColumnGroupWidths;
    }],
    execute: function () {}
  };
});
System.register('components/body/body.js', ['@empty', 'utils/utils.js', 'utils/keys.js'], function (_export) {
  'use strict';

  var angular, requestAnimFrame, ColumnsByPin, KEYS, BodyController, BodyHelper;

  _export('BodyDirective', BodyDirective);

  function BodyDirective($timeout) {
    return {
      restrict: 'E',
      controller: 'BodyController',
      controllerAs: 'body',
      scope: {
        columns: '=',
        columnWidths: '=',
        rows: '=',
        options: '=',
        selected: '=?',
        expanded: '=?',
        onPage: '&',
        onTreeToggle: '&'
      },
      template: '\n      <div class="dt-body" ng-style="body.styles()">\n        <div class="dt-body-scroller" ng-style="body.scrollerStyles()">\n          <dt-group-row ng-repeat-start="r in body.tempRows track by $index"\n                        ng-if="r.group"\n                        ng-style="body.groupRowStyles(this, r)" \n                        on-group-toggle="body.onGroupToggle(this, group)"\n                        expanded="body.getRowExpanded(this, r)"\n                        tabindex="{{$index}}"\n                        value="r">\n          </dt-group-row>\n          <dt-row ng-repeat-end\n                  ng-if="!r.group"\n                  value="body.getRowValue($index)"\n                  tabindex="{{$index}}"\n                  columns="columns"\n                  column-widths="columnWidths"\n                  ng-keydown="body.keyDown($event, $index, r)"\n                  ng-click="body.rowClicked($event, $index, r)"\n                  on-tree-toggle="body.onTreeToggle(this, row, cell)"\n                  ng-class="body.rowClasses(this, r)"\n                  options="options"\n                  selected="body.isSelected(r)"\n                  on-checkbox-change="body.onCheckboxChange($index, row)"\n                  columns="body.columnsByPin"\n                  has-children="body.getRowHasChildren(r)"\n                  expanded="body.getRowExpanded(this, r)"\n                  ng-style="body.rowStyles(this, r)">\n          </dt-row>\n        </div>\n        <div ng-if="rows && !rows.length" \n             class="empty-row" \n             ng-bind="::options.emptyMessage">\n       </div>\n       <div ng-if="rows === undefined" \n             class="loading-row"\n             ng-bind="::options.loadingMessage">\n       </div>\n      </div>',
      replace: true,
      link: function link($scope, $elm, $attrs, ctrl) {
        var ticking = false,
            lastScrollY = 0,
            lastScrollX = 0,
            helper = BodyHelper.create($elm);

        function update() {
          $timeout(function () {
            $scope.options.internal.offsetY = lastScrollY;
            $scope.options.internal.offsetX = lastScrollX;
            ctrl.updatePage();
          });

          ticking = false;
        };

        function requestTick() {
          if (!ticking) {
            requestAnimFrame(update);
            ticking = true;
          }
        };

        $elm.on('scroll', function (ev) {
          lastScrollY = this.scrollTop;
          lastScrollX = this.scrollLeft;
          requestTick();
        });
      }
    };
  }

  return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }, function (_utilsUtilsJs) {
      requestAnimFrame = _utilsUtilsJs.requestAnimFrame;
      ColumnsByPin = _utilsUtilsJs.ColumnsByPin;
    }, function (_utilsKeysJs) {
      KEYS = _utilsKeysJs.KEYS;
    }],
    execute: function () {
      BodyController = (function () {

        /**
         * A tale body controller
         * @param  {$scope}
         * @param  {$timeout}
         * @param  {throttle}
         * @return {BodyController}
         */
        /*@ngInject*/

        function BodyController($scope, $timeout, throttle) {
          var _this = this;

          babelHelpers.classCallCheck(this, BodyController);

          angular.extend(this, {
            $scope: $scope,
            options: $scope.options,
            selected: $scope.selected
          });

          this.tempRows = [];
          this._viewportRowsStart = 0;
          this._viewportRowsEnd = 0;

          this.treeColumn = $scope.options.columns.find(function (c) {
            return c.isTreeColumn;
          });

          this.groupColumn = $scope.options.columns.find(function (c) {
            return c.group;
          });

          if (this.options.scrollbarV) {
            $scope.$watch('options.internal.offsetY', throttle(this.getRows.bind(this), 10));
          }

          $scope.$watchCollection('rows', function (newVal, oldVal) {
            if (newVal) {
              if (!_this.options.paging.externalPaging) {
                _this.options.paging.count = newVal.length;
              }

              _this.count = _this.options.paging.count;

              if (_this.treeColumn || _this.groupColumn) {
                _this.buildRowsByGroup();
              }

              if (_this.options.scrollbarV) {
                _this.getRows();
              } else {
                var _tempRows;

                var rows = $scope.rows;
                if (_this.treeColumn) {
                  rows = _this.buildTree();
                } else if (_this.groupColumn) {
                  rows = _this.buildGroups();
                }
                _this.tempRows.splice(0, _this.tempRows.length);
                (_tempRows = _this.tempRows).push.apply(_tempRows, babelHelpers.toConsumableArray(rows));
              }
            }
          });

          if (this.options.scrollbarV) {
            $scope.$watch('options.internal.offsetY', this.updatePage.bind(this));
            $scope.$watch('options.paging.offset', function (newVal) {
              $scope.onPage({
                offset: newVal,
                size: _this.options.paging.size
              });
            });
          }
        }

        babelHelpers.createClass(BodyController, [{
          key: 'getFirstLastIndexes',

          /**
           * Gets the first and last indexes based on the offset, row height, page size, and overall count.
           * @return {object}
           */
          value: function getFirstLastIndexes() {
            var firstRowIndex = Math.max(Math.floor((this.$scope.options.internal.offsetY || 0) / this.options.rowHeight, 0), 0),
                endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);

            return {
              first: firstRowIndex,
              last: endIndex
            };
          }
        }, {
          key: 'updatePage',

          /**
           * Updates the page's offset given the scroll position.
           * @param  {paging object}
           */
          value: function updatePage() {
            var idxs = this.getFirstLastIndexes(),
                curPage = Math.ceil(idxs.first / this.options.paging.size);
            this.options.paging.offset = curPage;
          }
        }, {
          key: 'buildRowsByGroup',

          /**
           * Matches groups to their respective parents by index.
           * 
           * Example:
           * 
           *  {
           *    "Acme" : [
           *      { name: "Acme Holdings", parent: "Acme" }
           *    ],
           *    "Acme Holdings": [
           *      { name: "Acme Ltd", parent: "Acme Holdings" }
           *    ]
           *  }
           * 
           */
          value: function buildRowsByGroup() {
            this.index = {};
            this.rowsByGroup = {};

            var parentProp = this.treeColumn ? this.treeColumn.relationProp : this.groupColumn.prop;

            for (var i = 0, len = this.$scope.rows.length; i < len; i++) {
              var row = this.$scope.rows[i];
              // build groups
              var relVal = row[parentProp];
              if (relVal) {
                if (this.rowsByGroup[relVal]) {
                  this.rowsByGroup[relVal].push(row);
                } else {
                  this.rowsByGroup[relVal] = [row];
                }
              }

              // build indexes
              if (this.treeColumn) {
                var prop = this.treeColumn.prop;
                this.index[row[prop]] = row;

                if (row[parentProp] === undefined) {
                  row.$$depth = 0;
                } else {
                  var parent = this.index[row[parentProp]];
                  row.$$depth = parent.$$depth + 1;
                  if (parent.$$children) {
                    parent.$$children.push(row[prop]);
                  } else {
                    parent.$$children = [row[prop]];
                  }
                }
              }
            }
          }
        }, {
          key: 'buildGroups',

          /**
           * Rebuilds the groups based on what is expanded.
           * This function needs some optimization, todo for future release.
           * @return {Array} the temp array containing expanded rows
           */
          value: function buildGroups() {
            var _this2 = this;

            var temp = [];

            angular.forEach(this.rowsByGroup, function (v, k) {
              temp.push({
                name: k,
                group: true
              });

              if (_this2.$scope.expanded[k]) {
                temp.push.apply(temp, babelHelpers.toConsumableArray(v));
              }
            });

            return temp;
          }
        }, {
          key: 'buildTree',

          /**
           * Creates a tree of the existing expanded values
           * @return {array} the built tree
           */
          value: function buildTree() {
            var count = 0,
                temp = [];

            for (var i = 0, len = this.$scope.rows.length; i < len; i++) {
              var row = this.$scope.rows[i],
                  relVal = row[this.treeColumn.relationProp],
                  keyVal = row[this.treeColumn.prop],
                  rows = this.rowsByGroup[keyVal],
                  expanded = this.$scope.expanded[keyVal];

              if (!relVal) {
                count++;
                temp.push(row);
              }

              if (rows && rows.length) {
                if (expanded) {
                  temp.push.apply(temp, babelHelpers.toConsumableArray(rows));
                  count = count + rows.length;
                }
              }
            }

            return temp;
          }
        }, {
          key: 'getRows',

          /**
           * Creates the intermediate collection that is shown in the view.
           * @param  {boolean} refresh - bust the tree/group cache
           */
          value: function getRows(refresh) {
            // only proceed when we have pre-aggregated the values
            if ((this.treeColumn || this.groupColumn) && !this.rowsByGroup) {
              return false;
            }

            var temp;

            if (this.treeColumn) {
              temp = this.treeTemp || [];
              // cache the tree build
              if (refresh || !this.treeTemp) {
                this.treeTemp = temp = this.buildTree();
                this.count = temp.length;

                // have to force reset, optimize this later
                this.tempRows.splice(0, this.tempRows.length);
              }
            } else if (this.groupColumn) {
              temp = this.groupsTemp || [];
              // cache the group build
              if (refresh || !this.groupsTemp) {
                this.groupsTemp = temp = this.buildGroups();
                this.count = temp.length;
              }
            } else {
              temp = this.$scope.rows;
            }

            var idx = 0,
                indexes = this.getFirstLastIndexes(),
                rowIndex = indexes.first;

            while (rowIndex < indexes.last || this.options.internal.bodyHeight < this._viewportHeight && rowIndex < this.count) {

              var row = temp[rowIndex];
              if (row) {
                row.$$index = rowIndex;
                this.tempRows[idx] = row;
              }

              idx++;
              this._viewportRowsEnd = rowIndex++;
            }
          }
        }, {
          key: 'styles',

          /**
           * Returns the styles for the table body directive.
           * @return {object}
           */
          value: function styles() {
            var styles = {
              width: this.options.internal.innerWidth + 'px'
            };

            if (!this.options.scrollbarV) {
              styles.overflowY = 'hidden';
            } else if (this.options.scrollbarH === false) {
              styles.overflowX = 'hidden';
            }

            if (this.options.scrollbarV) {
              styles.height = this.options.internal.bodyHeight + 'px';
            }

            return styles;
          }
        }, {
          key: 'rowStyles',

          /**
           * Returns the styles for the row diretive.
           * @param  {scope}
           * @param  {row}
           * @return {styles object}
           */
          value: function rowStyles(scope, row) {
            var styles = {
              height: scope.options.rowHeight + 'px'
            };

            if (scope.options.scrollbarV) {
              styles.transform = 'translate3d(0, ' + row.$$index * scope.options.rowHeight + 'px, 0)';
            }

            return styles;
          }
        }, {
          key: 'groupRowStyles',

          /**
           * Builds the styles for the row group directive
           * @param  {object} scope 
           * @param  {object} row   
           * @return {object} styles
           */
          value: function groupRowStyles(scope, row) {
            var styles = this.rowStyles(scope, row);
            styles.width = scope.columnWidths.total + 'px';
            return styles;
          }
        }, {
          key: 'rowClasses',

          /**
           * Returns the css classes for the row directive.
           * @param  {scope}
           * @param  {row}
           * @return {css class object}
           */
          value: function rowClasses(scope, row) {
            var styles = {
              'selected': this.isSelected(row)
            };

            if (this.treeColumn) {
              // if i am a child
              styles['dt-leaf'] = this.rowsByGroup[row[this.treeColumn.relationProp]];
              // if i have children
              styles['dt-has-leafs'] = this.rowsByGroup[row[this.treeColumn.prop]];
              // the depth
              styles['dt-depth-' + row.$$depth] = true;
            }

            return styles;
          }
        }, {
          key: 'isSelected',

          /**
           * Returns if the row is selected
           * @param  {row}
           * @return {Boolean}
           */
          value: function isSelected(row) {
            var selected = false;

            if (this.options.selectable) {
              if (this.options.multiSelect) {
                selected = this.selected.indexOf(row) > -1;
              } else {
                selected = this.selected === row;
              }
            }

            return selected;
          }
        }, {
          key: 'keyDown',

          /**
           * Handler for the keydown on a row
           * @param  {event}
           * @param  {index}
           * @param  {row}
           */
          value: function keyDown(ev, index, row) {
            ev.preventDefault();

            if (ev.keyCode === KEYS.DOWN) {
              var next = ev.target.nextElementSibling;
              if (next) {
                next.focus();
              }
            } else if (ev.keyCode === KEYS.UP) {
              var prev = ev.target.previousElementSibling;
              if (prev) {
                prev.focus();
              }
            } else if (ev.keyCode === KEYS.RETURN) {
              this.selectRow(index, row);
            }
          }
        }, {
          key: 'rowClicked',

          /**
           * Handler for the row click event
           * @param  {event}
           * @param  {index}
           * @param  {row}
           */
          value: function rowClicked(event, index, row) {
            if (!this.options.checkboxSelection) {
              event.preventDefault();

              this.selectRow(index, row);

              if (this.$scope.onSelect) {
                this.$scope.onSelect({ row: row });
              }
            }
          }
        }, {
          key: 'selectRow',

          /**
           * Selects a row and places in the selection collection
           * @param  {index}
           * @param  {row}
           */
          value: function selectRow(index, row) {
            if (this.options.selectable) {
              if (this.options.multiSelect) {
                var isCtrlKeyDown = event.ctrlKey || event.metaKey,
                    isShiftKeyDown = event.shiftKey;

                if (isShiftKeyDown) {
                  this.selectRowsBetween(index, row);
                } else {
                  var idx = this.selected.indexOf(row);
                  if (idx > -1) {
                    this.selected.splice(idx, 1);
                  } else {
                    this.selected.push(row);
                  }
                }
                this.prevIndex = index;
              } else {
                this.selected = row;
              }
            }
          }
        }, {
          key: 'selectRowsBetween',

          /**
           * Selectes the rows between a index.  Used for shift click selection.
           * @param  {index}
           */
          value: function selectRowsBetween(index) {
            var reverse = index < this.prevIndex;
            for (var i = 0, len = this.tempRows.length; i < len; i++) {
              var row = this.tempRows[i],
                  greater = i >= this.prevIndex && i <= index,
                  lesser = i <= this.prevIndex && i >= index;

              if (reverse && lesser || !reverse && greater) {
                var idx = this.selected.indexOf(row);
                if (idx === -1) {
                  this.selected.push(row);
                }
              }
            }
          }
        }, {
          key: 'scrollerStyles',

          /**
           * Returns the virtual row height.
           * @return {[height]}
           */
          value: function scrollerStyles() {
            return {
              height: this.count * this.options.rowHeight + 'px'
            };
          }
        }, {
          key: 'getRowValue',

          /**
           * Returns the row model for the index in the view.
           * @param  {index}
           * @return {row model}
           */
          value: function getRowValue(idx) {
            return this.tempRows[idx];
          }
        }, {
          key: 'getRowExpanded',

          /**
           * Calculates if a row is expanded or collasped for tree grids.
           * @param  {scope}
           * @param  {row}
           * @return {boolean}
           */
          value: function getRowExpanded(scope, row) {
            if (this.treeColumn) {
              return scope.expanded[row[this.treeColumn.prop]];
            } else if (this.groupColumn) {
              return scope.expanded[row.name];
            }
          }
        }, {
          key: 'getRowHasChildren',

          /**
           * Calculates if the row has children
           * @param  {row}
           * @return {boolean}
           */
          value: function getRowHasChildren(row) {
            if (!this.treeColumn) return;
            var children = this.rowsByGroup[row[this.treeColumn.prop]];
            return children !== undefined || children && !children.length;
          }
        }, {
          key: 'onTreeToggle',

          /**
           * Tree toggle event from a cell
           * @param  {scope}
           * @param  {row model}
           * @param  {cell model}
           */
          value: function onTreeToggle(scope, row, cell) {
            var val = row[this.treeColumn.prop];
            scope.expanded[val] = !scope.expanded[val];

            if (this.options.scrollbarV) {
              this.getRows(true);
            } else {
              var _tempRows2;

              var values = this.buildTree();
              this.tempRows.splice(0, this.tempRows.length);
              (_tempRows2 = this.tempRows).push.apply(_tempRows2, babelHelpers.toConsumableArray(values));
            }

            scope.onTreeToggle({
              row: row,
              cell: cell
            });
          }
        }, {
          key: 'onCheckboxChange',

          /**
           * Invoked when a row directive's checkbox was changed.
           * @param  {index}
           * @param  {row}
           */
          value: function onCheckboxChange(index, row) {
            this.selectRow(index, row);
          }
        }, {
          key: 'onGroupToggle',

          /**
           * Invoked when the row group directive was expanded
           * @param  {object} scope 
           * @param  {object} row   
           */
          value: function onGroupToggle(scope, row) {
            scope.expanded[row.name] = !scope.expanded[row.name];

            if (this.options.scrollbarV) {
              this.getRows(true);
            } else {
              var _tempRows3;

              var values = this.buildGroups();
              this.tempRows.splice(0, this.tempRows.length);
              (_tempRows3 = this.tempRows).push.apply(_tempRows3, babelHelpers.toConsumableArray(values));
            }
          }
        }]);
        return BodyController;
      })();

      _export('BodyController', BodyController);

      /**
       * A helper for scrolling the body to a specific scroll position
       * when the footer pager is invoked.
       */

      BodyHelper = (function () {
        var _elm;
        return {
          create: function create(elm) {
            _elm = elm;
          },
          setYOffset: function setYOffset(offsetY) {
            _elm[0].scrollTop = offsetY;
          }
        };
      })();

      _export('BodyHelper', BodyHelper);

      ;
    }
  };
});
System.register('data-table.js', ['@empty', 'utils/polyfill.js', 'utils/throttle.js', 'utils/resizable.js', 'utils/sortable.js', 'utils/math.js', 'utils/utils.js', 'defaults.js', 'components/header/header.js', 'components/header/header-cell.js', 'components/body/body.js', 'components/body/row.js', 'components/body/group-row.js', 'components/body/cell.js', 'components/footer/footer.js', 'components/footer/pager.js'], function (_export) {
  'use strict';

  var angular, debounce, throttle, Resizable, Sortable, AdjustColumnWidths, ForceFillColumnWidths, ColumnsByPin, ColumnGroupWidths, CamelCase, TableDefaults, ColumnDefaults, HeaderController, HeaderDirective, HeaderCellDirective, HeaderCellController, BodyController, BodyHelper, BodyDirective, RowController, RowDirective, GroupRowController, GroupRowDirective, CellController, CellDirective, FooterController, FooterDirective, PagerController, PagerDirective, DataTableController;

  function DataTableDirective($window, $timeout, throttle) {
    return {
      restrict: 'E',
      replace: true,
      controller: 'DataTable',
      scope: {
        options: '=',
        rows: '=',
        selected: '=?',
        expanded: '=?',
        onSelect: '&',
        onSort: '&',
        onTreeToggle: '&',
        onPage: '&'
      },
      controllerAs: 'dt',
      template: '<div class="dt" ng-class="dt.tableCss(this)">\n        <dt-header options="options"\n                   on-checkbox-change="dt.onHeaderCheckboxChange(this)"\n                   columns="dt.columnsByPin"\n                   column-widths="dt.columnWidths"\n                   ng-if="options.headerHeight"\n                   on-resize="dt.onResize(this, column, width)"\n                   selected="dt.isAllRowsSelected(this)"\n                   on-sort="dt.onSort(this)">\n        </dt-header>\n        <dt-body rows="rows"\n                 selected="selected"\n                 expanded="expanded"\n                 columns="dt.columnsByPin"\n                 column-widths="dt.columnWidths"\n                 options="options"\n                 on-page="dt.onBodyPage(this, offset, size)"\n                 on-tree-toggle="dt.onTreeToggle(this, row, cell)">\n         </dt-body>\n        <dt-footer ng-if="options.footerHeight"\n                   ng-style="{ height: options.footerHeight + \'px\' }"\n                   on-page="dt.onFooterPage(this, offset, size)"\n                   paging="options.paging">\n         </dt-footer>\n      </div>',
      compile: function compile(tElem, tAttrs) {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {

            function resize() {
              $scope.options.internal.innerWidth = $elm[0].offsetWidth;

              if ($scope.options.scrollbarV) {
                var height = $elm[0].offsetHeight;

                if ($scope.options.headerHeight) {
                  height = height - $scope.options.headerHeight;
                }

                if ($scope.options.footerHeight) {
                  height = height - $scope.options.footerHeight;
                }

                $scope.options.internal.bodyHeight = height;
              }

              ctrl.adjustColumns();
              ctrl.calculatePageSize();
            }

            resize();
            angular.element($window).bind('resize', throttle(function () {
              $timeout(resize);
            }));
          }
        };
      }
    };
  }return {
    setters: [function (_empty) {
      angular = _empty['default'];
    }, function (_utilsPolyfillJs) {}, function (_utilsThrottleJs) {
      debounce = _utilsThrottleJs.debounce;
      throttle = _utilsThrottleJs.throttle;
    }, function (_utilsResizableJs) {
      Resizable = _utilsResizableJs.Resizable;
    }, function (_utilsSortableJs) {
      Sortable = _utilsSortableJs.Sortable;
    }, function (_utilsMathJs) {
      AdjustColumnWidths = _utilsMathJs.AdjustColumnWidths;
      ForceFillColumnWidths = _utilsMathJs.ForceFillColumnWidths;
    }, function (_utilsUtilsJs) {
      ColumnsByPin = _utilsUtilsJs.ColumnsByPin;
      ColumnGroupWidths = _utilsUtilsJs.ColumnGroupWidths;
      CamelCase = _utilsUtilsJs.CamelCase;
    }, function (_defaultsJs) {
      TableDefaults = _defaultsJs.TableDefaults;
      ColumnDefaults = _defaultsJs.ColumnDefaults;
    }, function (_componentsHeaderHeaderJs) {
      HeaderController = _componentsHeaderHeaderJs.HeaderController;
      HeaderDirective = _componentsHeaderHeaderJs.HeaderDirective;
    }, function (_componentsHeaderHeaderCellJs) {
      HeaderCellDirective = _componentsHeaderHeaderCellJs.HeaderCellDirective;
      HeaderCellController = _componentsHeaderHeaderCellJs.HeaderCellController;
    }, function (_componentsBodyBodyJs) {
      BodyController = _componentsBodyBodyJs.BodyController;
      BodyHelper = _componentsBodyBodyJs.BodyHelper;
      BodyDirective = _componentsBodyBodyJs.BodyDirective;
    }, function (_componentsBodyRowJs) {
      RowController = _componentsBodyRowJs.RowController;
      RowDirective = _componentsBodyRowJs.RowDirective;
    }, function (_componentsBodyGroupRowJs) {
      GroupRowController = _componentsBodyGroupRowJs.GroupRowController;
      GroupRowDirective = _componentsBodyGroupRowJs.GroupRowDirective;
    }, function (_componentsBodyCellJs) {
      CellController = _componentsBodyCellJs.CellController;
      CellDirective = _componentsBodyCellJs.CellDirective;
    }, function (_componentsFooterFooterJs) {
      FooterController = _componentsFooterFooterJs.FooterController;
      FooterDirective = _componentsFooterFooterJs.FooterDirective;
    }, function (_componentsFooterPagerJs) {
      PagerController = _componentsFooterPagerJs.PagerController;
      PagerDirective = _componentsFooterPagerJs.PagerDirective;
    }],
    execute: function () {
      DataTableController = (function () {

        /**
         * Creates an instance of the DataTable Controller
         * @param  {scope}
         * @param  {filter}
         */
        /*@ngInject*/

        function DataTableController($scope, $filter, $log) {
          var _this = this;

          babelHelpers.classCallCheck(this, DataTableController);

          angular.extend(this, {
            $scope: $scope,
            $filter: $filter,
            $log: $log
          });

          this.defaults($scope);
          $scope.$watch('options.columns', function (newVal, oldVal) {
            if (newVal.length > oldVal.length) {
              _this.transposeColumnDefaults(newVal);
            }
            _this.calculateColumns(newVal);
          }, true);
        }

        babelHelpers.createClass(DataTableController, [{
          key: 'defaults',

          /**
           * Creates and extends default options for the grid control
           * @param  {scope}
           */
          value: function defaults($scope) {
            var _this2 = this;

            $scope.expanded = $scope.expanded || {};

            var options = angular.extend(angular.copy(TableDefaults), $scope.options);

            options.paging = angular.extend(angular.copy(TableDefaults.paging), $scope.options.paging);

            this.transposeColumnDefaults(options.columns);

            $scope.options = options;

            if ($scope.options.selectable && $scope.options.multiSelect) {
              $scope.selected = $scope.selected || [];
            }

            // default sort
            var watch = $scope.$watch('rows', function (newVal) {
              if (newVal) {
                watch();
                _this2.onSort($scope);
              }
            });
          }
        }, {
          key: 'transposeColumnDefaults',

          /**
           * On init or when a column is added, we need to
           * make sure all the columns added have the correct
           * defaults applied.
           * @param  {Object} columns
           */
          value: function transposeColumnDefaults(columns) {
            for (var i = 0, len = columns.length; i < len; i++) {
              var column = columns[i];
              column = angular.extend(angular.copy(ColumnDefaults), column);

              if (!column.name) {
                this.$log.warn('\'Name\' property expected but not defined.', column);
                column.name = new Date() + '';
              }

              if (column.name && !column.prop) {
                column.prop = CamelCase(column.name);
              }

              columns[i] = column;
            }
          }
        }, {
          key: 'calculateColumns',

          /**
           * Calculate column groups and widths
           * @param  {object} columns
           */
          value: function calculateColumns(columns) {
            this.columnsByPin = ColumnsByPin(columns);
            this.columnWidths = ColumnGroupWidths(this.columnsByPin, columns);
          }
        }, {
          key: 'tableCss',

          /**
           * Returns the css classes for the data table.
           * @param  {scope}
           * @return {style object}
           */
          value: function tableCss(scope) {
            return {
              'fixed': scope.options.scrollbarV,
              'selectable': scope.options.selectable,
              'checkboxable': scope.options.checkboxSelection
            };
          }
        }, {
          key: 'adjustColumns',

          /**
           * Adjusts the column widths to handle greed/etc.
           * @return {[type]}
           */
          value: function adjustColumns() {
            // todo: combine these
            if (this.$scope.options.forceFillColumns) {
              ForceFillColumnWidths(this.$scope.options.columns, this.$scope.options.internal.innerWidth);
            } else {
              AdjustColumnWidths(this.$scope.options.columns, this.$scope.options.internal.innerWidth);
            }
          }
        }, {
          key: 'calculatePageSize',

          /**
           * Calculates the page size given the height * row height.
           * @return {[type]}
           */
          value: function calculatePageSize() {
            this.$scope.options.paging.size = Math.ceil(this.$scope.options.internal.bodyHeight / this.$scope.options.rowHeight) + 1;
          }
        }, {
          key: 'onSort',

          /**
           * Sorts the values of the grid for client side sorting.
           * @param  {scope}
           */
          value: function onSort(scope) {
            if (!scope.rows) return;

            var sorts = scope.options.columns.filter(function (c) {
              return c.sort;
            });

            if (sorts.length) {
              if (this.$scope.onSort) {
                this.$scope.onSort({ sorts: sorts });
              }

              var clientSorts = [];
              for (var i = 0, len = sorts.length; i < len; i++) {
                var c = sorts[i];
                if (c.comparator !== false) {
                  var dir = c.sort === 'asc' ? '' : '-';
                  clientSorts.push(dir + c.prop);
                }
              }

              if (clientSorts.length) {
                var _scope$rows;

                // todo: more ideal to just resort vs splice and repush
                // but wasn't responding to this change ...
                var sortedValues = this.$filter('orderBy')(scope.rows, clientSorts);
                scope.rows.splice(0, scope.rows.length);
                (_scope$rows = scope.rows).push.apply(_scope$rows, babelHelpers.toConsumableArray(sortedValues));
              }
            }

            BodyHelper.setYOffset(0);
          }
        }, {
          key: 'onTreeToggle',

          /**
           * Invoked when a tree is collasped/expanded
           * @param  {scope}
           * @param  {row model}
           * @param  {cell model}
           */
          value: function onTreeToggle(scope, row, cell) {
            scope.onTreeToggle({
              row: row,
              cell: cell
            });
          }
        }, {
          key: 'onBodyPage',

          /**
           * Invoked when the body triggers a page change.
           * @param  {scope}
           * @param  {offset}
           * @param  {size}
           */
          value: function onBodyPage(scope, offset, size) {
            scope.onPage({
              offset: offset,
              size: size
            });
          }
        }, {
          key: 'onFooterPage',

          /**
           * Invoked when the footer triggers a page change.
           * @param  {scope}
           * @param  {offset}
           * @param  {size}
           */
          value: function onFooterPage(scope, offset, size) {
            var pageBlockSize = scope.options.rowHeight * size,
                offsetY = pageBlockSize * offset;

            BodyHelper.setYOffset(offsetY);
          }
        }, {
          key: 'onHeaderCheckboxChange',

          /**
           * Invoked when the header checkbox directive has changed.
           * @param  {scope}
           */
          value: function onHeaderCheckboxChange(scope) {
            if (scope.rows) {
              var matches = scope.selected.length === scope.rows.length;
              scope.selected.splice(0, scope.selected.length);

              if (!matches) {
                var _scope$selected;

                (_scope$selected = scope.selected).push.apply(_scope$selected, babelHelpers.toConsumableArray(scope.rows));
              }
            }
          }
        }, {
          key: 'isAllRowsSelected',

          /**
           * Returns if all the rows are selected
           * @param  {scope}  scope
           * @return {Boolean} if all selected
           */
          value: function isAllRowsSelected(scope) {
            if (!scope.rows) return false;
            return scope.selected.length === scope.rows.length;
          }
        }, {
          key: 'onResize',

          /**
           * Occurs when a header directive triggered a resize event
           * @param  {object} scope
           * @param  {object} column
           * @param  {int} width
           */
          value: function onResize(scope, column, width) {
            var idx = scope.options.columns.indexOf(column);
            if (idx > -1) {
              scope.options.columns[idx].width = width;
              this.calculateColumns(scope.options.columns);
            }
          }
        }]);
        return DataTableController;
      })();

      ;

      _export('default', angular.module('data-table', []).controller('DataTable', DataTableController).directive('dt', DataTableDirective).directive('resizable', Resizable).directive('sortable', Sortable).constant('debounce', debounce).constant('throttle', throttle).controller('HeaderController', HeaderController).directive('dtHeader', HeaderDirective).controller('HeaderCellController', HeaderCellController).directive('dtHeaderCell', HeaderCellDirective).controller('BodyController', BodyController).directive('dtBody', BodyDirective).controller('RowController', RowController).directive('dtRow', RowDirective).controller('GroupRowController', GroupRowController).directive('dtGroupRow', GroupRowDirective).controller('CellController', CellController).directive('dtCell', CellDirective).controller('FooterController', FooterController).directive('dtFooter', FooterDirective).controller('PagerController', PagerController).directive('dtPager', PagerDirective));
    }
  };
});
})
