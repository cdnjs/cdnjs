(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDataGrid"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Grid = __webpack_require__(49);
	var Row = __webpack_require__(15);
	var Cell = __webpack_require__(20);

	module.exports = Grid;
	module.exports.Row = Row;
	module.exports.Cell = Cell;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames() {
		var classes = '';
		var arg;

		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}

			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(28);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  getColumn: function getColumn(columns, idx) {
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },
	  spliceColumn: function spliceColumn(metrics, idx, column) {
	    if (Array.isArray(metrics.columns)) {
	      metrics.columns.splice(idx, 1, column);
	    } else if (typeof Immutable !== 'undefined') {
	      metrics.columns = metrics.columns.splice(idx, 1, column);
	    }
	    return metrics;
	  },
	  getSize: function getSize(columns) {
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  },


	  // Logic extented to allow for functions to be passed down in column.editable
	  // this allows us to deicde whether we can be edting from a cell level
	  canEdit: function canEdit(col, rowData, enableCellSelect) {
	    if (col.editable != null && typeof col.editable === 'function') {
	      return enableCellSelect === true && col.editable(rowData);
	    }
	    return enableCellSelect === true && (!!col.editor || !!col.editable);
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var ExcelColumnShape = {
	  name: React.PropTypes.node.isRequired,
	  key: React.PropTypes.string.isRequired,
	  width: React.PropTypes.number.isRequired,
	  filterable: React.PropTypes.bool
	};

	module.exports = ExcelColumnShape;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(79),
	    getValue = __webpack_require__(88);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(1).PropTypes;

	module.exports = {
	  selected: PropTypes.object.isRequired,
	  copied: PropTypes.object,
	  dragged: PropTypes.object,
	  onCellClick: PropTypes.func.isRequired,
	  onCellDoubleClick: PropTypes.func.isRequired,
	  onCommit: PropTypes.func.isRequired,
	  onCommitCancel: PropTypes.func.isRequired,
	  handleDragEnterRow: PropTypes.func.isRequired,
	  handleTerminateDrag: PropTypes.func.isRequired
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var shallowCloneObject = __webpack_require__(16);

	var contextTypes = {
	  metricsComputator: React.PropTypes.object
	};

	var MetricsComputatorMixin = {

	  childContextTypes: contextTypes,

	  getChildContext: function getChildContext() {
	    return { metricsComputator: this };
	  },
	  getMetricImpl: function getMetricImpl(name) {
	    return this._DOMMetrics.metrics[name].value;
	  },
	  registerMetricsImpl: function registerMetricsImpl(component, metrics) {
	    var getters = {};
	    var s = this._DOMMetrics;

	    for (var name in metrics) {
	      if (s.metrics[name] !== undefined) {
	        throw new Error('DOM metric ' + name + ' is already defined');
	      }
	      s.metrics[name] = { component: component, computator: metrics[name].bind(component) };
	      getters[name] = this.getMetricImpl.bind(null, name);
	    }

	    if (s.components.indexOf(component) === -1) {
	      s.components.push(component);
	    }

	    return getters;
	  },
	  unregisterMetricsFor: function unregisterMetricsFor(component) {
	    var s = this._DOMMetrics;
	    var idx = s.components.indexOf(component);

	    if (idx > -1) {
	      s.components.splice(idx, 1);

	      var name = void 0;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        if (metricsToDelete.hasOwnProperty(name)) {
	          delete s.metrics[name];
	        }
	      }
	    }
	  },
	  updateMetrics: function updateMetrics() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
	      if (!s.metrics.hasOwnProperty(name)) continue;

	      var newMetric = s.metrics[name].computator();
	      if (newMetric !== s.metrics[name].value) {
	        needUpdate = true;
	      }
	      s.metrics[name].value = newMetric;
	    }

	    if (needUpdate) {
	      for (var i = 0, len = s.components.length; i < len; i++) {
	        if (s.components[i].metricsUpdated) {
	          s.components[i].metricsUpdated();
	        }
	      }
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    this._DOMMetrics = {
	      metrics: {},
	      components: []
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    if (window.addEventListener) {
	      window.addEventListener('resize', this.updateMetrics);
	    } else {
	      window.attachEvent('resize', this.updateMetrics);
	    }
	    this.updateMetrics();
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this.updateMetrics);
	  }
	};

	var MetricsMixin = {

	  contextTypes: contextTypes,

	  componentWillMount: function componentWillMount() {
	    if (this.DOMMetrics) {
	      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

	      this.DOMMetrics = {};
	      for (var name in this._DOMMetricsDefs) {
	        if (!this._DOMMetricsDefs.hasOwnProperty(name)) continue;

	        this.DOMMetrics[name] = function () {};
	      }
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    if (this.DOMMetrics) {
	      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.registerMetricsImpl) {
	      return this.context.metricsComputator.unregisterMetricsFor(this);
	    }
	    if (this.hasOwnProperty('DOMMetrics')) {
	      delete this.DOMMetrics;
	    }
	  },
	  registerMetrics: function registerMetrics(metrics) {
	    if (this.registerMetricsImpl) {
	      return this.registerMetricsImpl(this, metrics);
	    }

	    return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	  },
	  getMetric: function getMetric(name) {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    }

	    return this.context.metricsComputator.getMetricImpl(name);
	  }
	};

	module.exports = {
	  MetricsComputatorMixin: MetricsComputatorMixin,
	  MetricsMixin: MetricsMixin
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(98),
	    listCacheDelete = __webpack_require__(99),
	    listCacheGet = __webpack_require__(100),
	    listCacheHas = __webpack_require__(101),
	    listCacheSet = __webpack_require__(102);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(31);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(95);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shallowCloneObject = __webpack_require__(16);
	var sameColumn = __webpack_require__(39);
	var ColumnUtils = __webpack_require__(5);
	var getScrollbarSize = __webpack_require__(24);

	function setColumnWidths(columns, totalWidth) {
	  return columns.map(function (column) {
	    var colInfo = Object.assign({}, column);
	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width.toString())) {
	        colInfo.width = Math.floor(column.width / 100 * totalWidth);
	      }
	    }
	    return colInfo;
	  });
	}

	function setDefferedColumnWidths(columns, unallocatedWidth, minColumnWidth) {
	  var defferedColumns = columns.filter(function (c) {
	    return !c.width;
	  });
	  return columns.map(function (column) {
	    if (!column.width) {
	      if (unallocatedWidth <= 0) {
	        column.width = minColumnWidth;
	      } else {
	        column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));
	      }
	    }
	    return column;
	  });
	}

	function setColumnOffsets(columns) {
	  var left = 0;
	  return columns.map(function (column) {
	    column.left = left;
	    left += column.width;
	    return column;
	  });
	}

	/**
	 * Update column metrics calculation.
	 *
	 * @param {ColumnMetricsType} metrics
	 */
	function recalculate(metrics) {
	  // compute width for columns which specify width
	  var columns = setColumnWidths(metrics.columns, metrics.totalWidth);

	  var unallocatedWidth = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w - column.width;
	  }, metrics.totalWidth);
	  unallocatedWidth -= getScrollbarSize();

	  var width = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w + column.width;
	  }, 0);

	  // compute width for columns which doesn't specify width
	  columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

	  // compute left offset
	  columns = setColumnOffsets(columns);

	  return {
	    columns: columns,
	    width: width,
	    totalWidth: metrics.totalWidth,
	    minColumnWidth: metrics.minColumnWidth
	  };
	}

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetricsType} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = ColumnUtils.getColumn(metrics.columns, index);
	  var metricsClone = shallowCloneObject(metrics);
	  metricsClone.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metricsClone.minColumnWidth);

	  metricsClone = ColumnUtils.spliceColumn(metricsClone, index, updatedColumn);

	  return recalculate(metricsClone);
	}

	function areColumnsImmutable(prevColumns, nextColumns) {
	  return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;
	}

	function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
	  var i = void 0;
	  var len = void 0;
	  var column = void 0;
	  var prevColumnsByKey = {};
	  var nextColumnsByKey = {};

	  if (ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)) {
	    return false;
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !isSameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }
	  return true;
	}

	function sameColumns(prevColumns, nextColumns, isSameColumn) {
	  if (areColumnsImmutable(prevColumns, nextColumns)) {
	    return prevColumns === nextColumns;
	  }

	  return compareEachColumn(prevColumns, nextColumns, isSameColumn);
	}

	module.exports = { recalculate: recalculate, resizeColumn: resizeColumn, sameColumn: sameColumn, sameColumns: sameColumns };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(3);
	var Cell = __webpack_require__(20);
	var ColumnMetrics = __webpack_require__(14);
	var ColumnUtilsMixin = __webpack_require__(5);
	var cellMetaDataShape = __webpack_require__(8);
	var PropTypes = React.PropTypes;

	var CellExpander = React.createClass({
	  displayName: 'CellExpander',
	  render: function render() {
	    return React.createElement(Cell, this.props);
	  }
	});

	var Row = React.createClass({
	  displayName: 'Row',


	  propTypes: {
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	    row: PropTypes.any.isRequired,
	    cellRenderer: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    isSelected: PropTypes.bool,
	    idx: PropTypes.number.isRequired,
	    expandedRows: PropTypes.arrayOf(PropTypes.object),
	    extraClasses: PropTypes.string,
	    forceUpdate: PropTypes.bool,
	    subRowDetails: PropTypes.object,
	    isRowHovered: PropTypes.bool
	  },

	  mixins: [ColumnUtilsMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      cellRenderer: Cell,
	      isSelected: false,
	      height: 35
	    };
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return !ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height || this.props.forceUpdate === true;
	  },
	  handleDragEnter: function handleDragEnter() {
	    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
	    if (handleDragEnterRow) {
	      handleDragEnterRow(this.props.idx);
	    }
	  },
	  getSelectedColumn: function getSelectedColumn() {
	    if (this.props.cellMetaData) {
	      var selected = this.props.cellMetaData.selected;
	      if (selected && selected.idx) {
	        return this.getColumn(this.props.columns, selected.idx);
	      }
	    }
	  },
	  getCellRenderer: function getCellRenderer(columnKey) {
	    var CellRenderer = this.props.cellRenderer;
	    if (this.props.subRowDetails && this.props.subRowDetails.field === columnKey) {
	      return CellExpander;
	    }
	    return CellRenderer;
	  },
	  getCells: function getCells() {
	    var _this = this;

	    var cells = [];
	    var lockedCells = [];
	    var selectedColumn = this.getSelectedColumn();

	    if (this.props.columns) {
	      this.props.columns.forEach(function (column, i) {
	        var CellRenderer = _this.props.cellRenderer;
	        var cell = React.createElement(CellRenderer, {
	          ref: i,
	          key: column.key + '-' + i,
	          idx: i,
	          rowIdx: _this.props.idx,
	          value: _this.getCellValue(column.key || i),
	          column: column,
	          height: _this.getRowHeight(),
	          formatter: column.formatter,
	          cellMetaData: _this.props.cellMetaData,
	          rowData: _this.props.row,
	          selectedColumn: selectedColumn,
	          isRowSelected: _this.props.isSelected,
	          expandableOptions: _this.getExpandableOptions(column.key) });
	        if (column.locked) {
	          lockedCells.push(cell);
	        } else {
	          cells.push(cell);
	        }
	      });
	    }

	    return cells.concat(lockedCells);
	  },
	  getRowHeight: function getRowHeight() {
	    var rows = this.props.expandedRows || null;
	    if (rows && this.props.idx) {
	      var row = rows[this.props.idx] || null;
	      if (row) {
	        return row.height;
	      }
	    }
	    return this.props.height;
	  },
	  getCellValue: function getCellValue(key) {
	    var val = void 0;
	    if (key === 'select-row') {
	      return this.props.isSelected;
	    } else if (typeof this.props.row.get === 'function') {
	      val = this.props.row.get(key);
	    } else {
	      val = this.props.row[key];
	    }
	    return val;
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var _this2 = this;

	    this.props.columns.forEach(function (column, i) {
	      if (column.locked) {
	        if (!_this2.refs[i]) return;
	        _this2.refs[i].setScrollLeft(scrollLeft);
	      }
	    });
	  },
	  doesRowContainSelectedCell: function doesRowContainSelectedCell(props) {
	    var selected = props.cellMetaData.selected;
	    if (selected && selected.rowIdx === props.idx) {
	      return true;
	    }

	    return false;
	  },
	  isContextMenuDisplayed: function isContextMenuDisplayed() {
	    if (this.props.cellMetaData) {
	      var selected = this.props.cellMetaData.selected;
	      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
	        return true;
	      }
	    }
	    return false;
	  },
	  willRowBeDraggedOver: function willRowBeDraggedOver(props) {
	    var dragged = props.cellMetaData.dragged;
	    return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
	  },
	  hasRowBeenCopied: function hasRowBeenCopied() {
	    var copied = this.props.cellMetaData.copied;
	    return copied != null && copied.rowIdx === this.props.idx;
	  },
	  getExpandableOptions: function getExpandableOptions(columnKey) {
	    return { canExpand: this.props.subRowDetails && this.props.subRowDetails.field === columnKey, expanded: this.props.subRowDetails && this.props.subRowDetails.expanded, children: this.props.subRowDetails && this.props.subRowDetails.children, treeDepth: this.props.subRowDetails ? this.props.subRowDetails.treeDepth : 0 };
	  },
	  renderCell: function renderCell(props) {
	    if (typeof this.props.cellRenderer === 'function') {
	      this.props.cellRenderer.call(this, props);
	    }
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return React.cloneElement(this.props.cellRenderer, props);
	    }

	    return this.props.cellRenderer(props);
	  },
	  render: function render() {
	    var className = joinClasses('react-grid-Row', 'react-grid-Row--' + (this.props.idx % 2 === 0 ? 'even' : 'odd'), {
	      'row-selected': this.props.isSelected,
	      'row-context-menu': this.isContextMenuDisplayed()
	    }, this.props.extraClasses);

	    var style = {
	      height: this.getRowHeight(this.props),
	      overflow: 'hidden'
	    };

	    var cells = this.getCells();
	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: className, style: style, onDragEnter: this.handleDragEnter }),
	      React.isValidElement(this.props.row) ? this.props.row : cells
	    );
	  }
	});

	module.exports = Row;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	function shallowCloneObject(obj) {
	  var result = {};
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) {
	      result[k] = obj[k];
	    }
	  }
	  return result;
	}

	module.exports = shallowCloneObject;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _isEqual = __webpack_require__(122);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var joinClasses = __webpack_require__(3);
	var EditorContainer = __webpack_require__(60);
	var ExcelColumn = __webpack_require__(6);
	var isFunction = __webpack_require__(23);
	var CellMetaDataShape = __webpack_require__(8);
	var SimpleCellFormatter = __webpack_require__(62);
	var ColumnUtils = __webpack_require__(5);

	var Cell = React.createClass({
	  displayName: 'Cell',


	  propTypes: {
	    rowIdx: React.PropTypes.number.isRequired,
	    idx: React.PropTypes.number.isRequired,
	    selected: React.PropTypes.shape({
	      idx: React.PropTypes.number.isRequired
	    }),
	    selectedColumn: React.PropTypes.object,
	    height: React.PropTypes.number,
	    tabIndex: React.PropTypes.number,
	    ref: React.PropTypes.string,
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    isExpanded: React.PropTypes.bool,
	    isRowSelected: React.PropTypes.bool,
	    cellMetaData: React.PropTypes.shape(CellMetaDataShape).isRequired,
	    handleDragStart: React.PropTypes.func,
	    className: React.PropTypes.string,
	    cellControls: React.PropTypes.any,
	    rowData: React.PropTypes.object.isRequired,
	    forceUpdate: React.PropTypes.bool,
	    expandableOptions: React.PropTypes.object.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      tabIndex: -1,
	      ref: 'cell',
	      isExpanded: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      isCellValueChanging: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.checkFocus();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      isCellValueChanging: this.props.value !== nextProps.value
	    });
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.checkFocus();
	    var dragged = this.props.cellMetaData.dragged;
	    if (dragged && dragged.complete === true) {
	      this.props.cellMetaData.handleTerminateDrag();
	    }
	    if (this.state.isCellValueChanging && this.props.selectedColumn != null) {
	      this.applyUpdateClass();
	    }
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected() || this.props.value !== nextProps.value || this.props.forceUpdate === true || this.props.className !== nextProps.className || this.hasChangedDependentValues(nextProps);
	  },
	  onCellClick: function onCellClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellClick && typeof meta.onCellClick === 'function') {
	      meta.onCellClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
	    }
	  },
	  onCellContextMenu: function onCellContextMenu() {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellContextMenu && typeof meta.onCellContextMenu === 'function') {
	      meta.onCellContextMenu({ rowIdx: this.props.rowIdx, idx: this.props.idx });
	    }
	  },
	  onCellDoubleClick: function onCellDoubleClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellDoubleClick && typeof meta.onCellDoubleClick === 'function') {
	      meta.onCellDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
	    }
	  },
	  onCellExpand: function onCellExpand(e) {
	    e.stopPropagation();
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellExpand != null) {
	      meta.onCellExpand({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.props.rowData, expandArgs: this.props.expandableOptions });
	    }
	  },
	  onCellKeyDown: function onCellKeyDown(e) {
	    if (this.canExpand() && e.key === 'Enter') {
	      this.onCellExpand(e);
	    }
	  },
	  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
	    e.stopPropagation();
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onDragHandleDoubleClick && typeof meta.onDragHandleDoubleClick === 'function') {
	      meta.onDragHandleDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.getRowData(), e: e });
	    }
	  },
	  onDragOver: function onDragOver(e) {
	    e.preventDefault();
	  },
	  getStyle: function getStyle() {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left
	    };
	    return style;
	  },
	  getFormatter: function getFormatter() {
	    var col = this.props.column;
	    if (this.isActive()) {
	      return React.createElement(EditorContainer, { rowData: this.getRowData(), rowIdx: this.props.rowIdx, idx: this.props.idx, cellMetaData: this.props.cellMetaData, column: col, height: this.props.height });
	    }

	    return this.props.column.formatter;
	  },
	  getRowData: function getRowData() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	    return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
	  },
	  getFormatterDependencies: function getFormatterDependencies() {
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
	    }
	  },
	  getCellClass: function getCellClass() {
	    var className = joinClasses(this.props.column.cellClass, 'react-grid-Cell', this.props.className, this.props.column.locked ? 'react-grid-Cell--locked' : null);
	    var extraClasses = joinClasses({
	      'row-selected': this.props.isRowSelected,
	      selected: this.isSelected() && !this.isActive() && this.isCellSelectEnabled(),
	      editing: this.isActive(),
	      copied: this.isCopied() || this.wasDraggedOver() || this.isDraggedOverUpwards() || this.isDraggedOverDownwards(),
	      'active-drag-cell': this.isSelected() || this.isDraggedOver(),
	      'is-dragged-over-up': this.isDraggedOverUpwards(),
	      'is-dragged-over-down': this.isDraggedOverDownwards(),
	      'was-dragged-over': this.wasDraggedOver()
	    });
	    return joinClasses(className, extraClasses);
	  },
	  getUpdateCellClass: function getUpdateCellClass() {
	    return this.props.column.getUpdateCellClass ? this.props.column.getUpdateCellClass(this.props.selectedColumn, this.props.column, this.state.isCellValueChanging) : '';
	  },
	  isColumnSelected: function isColumnSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.idx === this.props.idx;
	  },
	  isSelected: function isSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;
	  },
	  isActive: function isActive() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    return this.isSelected() && meta.selected.active === true;
	  },
	  isCellSelectionChanging: function isCellSelectionChanging(nextProps) {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    var nextSelected = nextProps.cellMetaData.selected;
	    if (meta.selected && nextSelected) {
	      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
	    }

	    return true;
	  },
	  isCellSelectEnabled: function isCellSelectEnabled() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    return meta.enableCellSelect;
	  },
	  hasChangedDependentValues: function hasChangedDependentValues(nextProps) {
	    var currentColumn = this.props.column;
	    var hasChangedDependentValues = false;

	    if (currentColumn.getRowMetaData) {
	      var currentRowMetaData = currentColumn.getRowMetaData(this.getRowData(), currentColumn);
	      var nextColumn = nextProps.column;
	      var nextRowMetaData = nextColumn.getRowMetaData(this.getRowData(nextProps), nextColumn);

	      hasChangedDependentValues = !(0, _isEqual2['default'])(currentRowMetaData, nextRowMetaData);
	    }

	    return hasChangedDependentValues;
	  },
	  applyUpdateClass: function applyUpdateClass() {
	    var updateCellClass = this.getUpdateCellClass();
	    // -> removing the class
	    if (updateCellClass != null && updateCellClass !== '') {
	      var cellDOMNode = ReactDOM.findDOMNode(this);
	      if (cellDOMNode.classList) {
	        cellDOMNode.classList.remove(updateCellClass);
	        // -> and re-adding the class
	        cellDOMNode.classList.add(updateCellClass);
	      } else if (cellDOMNode.className.indexOf(updateCellClass) === -1) {
	        // IE9 doesn't support classList, nor (I think) altering element.className
	        // without replacing it wholesale.
	        cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;
	      }
	    }
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var ctrl = this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
	    if (ctrl.isMounted()) {
	      var node = ReactDOM.findDOMNode(this);
	      var transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	      node.style.webkitTransform = transform;
	      node.style.transform = transform;
	    }
	  },
	  isCopied: function isCopied() {
	    var copied = this.props.cellMetaData.copied;
	    return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;
	  },
	  isDraggedOver: function isDraggedOver() {
	    var dragged = this.props.cellMetaData.dragged;
	    return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;
	  },
	  wasDraggedOver: function wasDraggedOver() {
	    var dragged = this.props.cellMetaData.dragged;
	    return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;
	  },
	  isDraggedCellChanging: function isDraggedCellChanging(nextProps) {
	    var isChanging = void 0;
	    var dragged = this.props.cellMetaData.dragged;
	    var nextDragged = nextProps.cellMetaData.dragged;
	    if (dragged) {
	      isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;
	      return isChanging;
	    }

	    return false;
	  },
	  isCopyCellChanging: function isCopyCellChanging(nextProps) {
	    var isChanging = void 0;
	    var copied = this.props.cellMetaData.copied;
	    var nextCopied = nextProps.cellMetaData.copied;
	    if (copied) {
	      isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;
	      return isChanging;
	    }
	    return false;
	  },
	  isDraggedOverUpwards: function isDraggedOverUpwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
	  },
	  isDraggedOverDownwards: function isDraggedOverDownwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
	  },
	  checkFocus: function checkFocus() {
	    if (this.isSelected() && !this.isActive()) {
	      // determine the parent viewport element of this cell
	      var parentViewport = ReactDOM.findDOMNode(this);
	      while (parentViewport != null && parentViewport.className.indexOf('react-grid-Viewport') === -1) {
	        parentViewport = parentViewport.parentElement;
	      }
	      var focusInGrid = false;
	      // if the focus is on the body of the document, the user won't mind if we focus them on a cell
	      if (document.activeElement == null || document.activeElement.nodeName && typeof document.activeElement.nodeName === 'string' && document.activeElement.nodeName.toLowerCase() === 'body') {
	        focusInGrid = true;
	        // otherwise
	      } else {
	        // only pull focus if the currently focused element is contained within the viewport
	        if (parentViewport) {
	          var focusedParent = document.activeElement;
	          while (focusedParent != null) {
	            if (focusedParent === parentViewport) {
	              focusInGrid = true;
	              break;
	            }
	            focusedParent = focusedParent.parentElement;
	          }
	        }
	      }
	      if (focusInGrid) {
	        ReactDOM.findDOMNode(this).focus();
	      }
	    }
	  },
	  canEdit: function canEdit() {
	    return this.props.column.editor != null || this.props.column.editable;
	  },
	  canExpand: function canExpand() {
	    return this.props.expandableOptions && this.props.expandableOptions.canExpand;
	  },
	  createColumEventCallBack: function createColumEventCallBack(onColumnEvent, info) {
	    return function (e) {
	      onColumnEvent(e, info);
	    };
	  },
	  createCellEventCallBack: function createCellEventCallBack(gridEvent, columnEvent) {
	    return function (e) {
	      gridEvent(e);
	      columnEvent(e);
	    };
	  },
	  createEventDTO: function createEventDTO(gridEvents, columnEvents, onColumnEvent) {
	    var allEvents = Object.assign({}, gridEvents);

	    for (var eventKey in columnEvents) {
	      if (columnEvents.hasOwnProperty(eventKey)) {
	        var event = columnEvents[event];
	        var eventInfo = { rowIdx: this.props.rowIdx, idx: this.props.idx, name: eventKey };
	        var eventCallback = this.createColumEventCallBack(onColumnEvent, eventInfo);

	        if (allEvents.hasOwnProperty(eventKey)) {
	          var currentEvent = allEvents[eventKey];
	          allEvents[eventKey] = this.createCellEventCallBack(currentEvent, eventCallback);
	        } else {
	          allEvents[eventKey] = eventCallback;
	        }
	      }
	    }

	    return allEvents;
	  },
	  getEvents: function getEvents() {
	    var columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
	    var onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
	    var gridEvents = {
	      onClick: this.onCellClick,
	      onDoubleClick: this.onCellDoubleClick,
	      onContextMenu: this.onCellContextMenu,
	      onDragOver: this.onDragOver
	    };

	    if (!columnEvents || !onColumnEvent) {
	      return gridEvents;
	    }

	    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
	  },
	  renderCellContent: function renderCellContent(props) {
	    var CellContent = void 0;
	    var Formatter = this.getFormatter();
	    if (React.isValidElement(Formatter)) {
	      props.dependentValues = this.getFormatterDependencies();
	      CellContent = React.cloneElement(Formatter, props);
	    } else if (isFunction(Formatter)) {
	      CellContent = React.createElement(Formatter, { value: this.props.value, dependentValues: this.getFormatterDependencies() });
	    } else {
	      CellContent = React.createElement(SimpleCellFormatter, { value: this.props.value });
	    }
	    var cellExpander = void 0;
	    var marginLeft = this.props.expandableOptions ? this.props.expandableOptions.treeDepth * 30 : 0;
	    if (this.canExpand()) {
	      cellExpander = React.createElement(
	        'span',
	        { style: { float: 'left', marginLeft: marginLeft }, onClick: this.onCellExpand },
	        this.props.expandableOptions.expanded ? String.fromCharCode('9660') : String.fromCharCode('9658')
	      );
	    }
	    return React.createElement(
	      'div',
	      { ref: 'cell',
	        className: 'react-grid-Cell__value' },
	      cellExpander,
	      React.createElement(
	        'span',
	        null,
	        CellContent
	      ),
	      ' ',
	      this.props.cellControls,
	      ' '
	    );
	  },
	  render: function render() {
	    var style = this.getStyle();

	    var className = this.getCellClass();

	    var cellContent = this.renderCellContent({
	      value: this.props.value,
	      column: this.props.column,
	      rowIdx: this.props.rowIdx,
	      isExpanded: this.props.isExpanded
	    });

	    var dragHandle = !this.isActive() && ColumnUtils.canEdit(this.props.column, this.props.rowData, this.props.cellMetaData.enableCellSelect) ? React.createElement(
	      'div',
	      { className: 'drag-handle', draggable: 'true', onDoubleClick: this.onDragHandleDoubleClick },
	      React.createElement('span', { style: { display: 'none' } })
	    ) : null;
	    var events = this.getEvents();

	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: className, style: style }, events),
	      cellContent,
	      dragHandle
	    );
	  }
	});

	module.exports = Cell;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var KeyboardHandlerMixin = {
	  onKeyDown: function onKeyDown(e) {
	    if (this.isCtrlKeyHeldDown(e)) {
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    } else if (this.isKeyExplicitlyHandled(e.key)) {
	      // break up individual keyPress events to have their own specific callbacks
	      // this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    } else if (this.isKeyPrintable(e.keyCode)) {
	      this.checkAndCall('onPressChar', e);
	    }

	    // Track which keys are currently down for shift clicking etc
	    this._keysDown = this._keysDown || {};
	    this._keysDown[e.keyCode] = true;

	    if (this.props.onGridKeyDown && typeof this.props.onGridKeyDown === 'function') {
	      this.props.onGridKeyDown(e);
	    }
	  },
	  onKeyUp: function onKeyUp(e) {
	    // Track which keys are currently down for shift clicking etc
	    this._keysDown = this._keysDown || {};
	    delete this._keysDown[e.keyCode];

	    if (this.props.onGridKeyUp && typeof this.props.onGridKeyUp === 'function') {
	      this.props.onGridKeyUp(e);
	    }
	  },
	  isKeyDown: function isKeyDown(keyCode) {
	    if (!this._keysDown) return false;
	    return keyCode in this._keysDown;
	  },
	  isSingleKeyDown: function isSingleKeyDown(keyCode) {
	    if (!this._keysDown) return false;
	    return keyCode in this._keysDown && Object.keys(this._keysDown).length === 1;
	  },


	  // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable: function isKeyPrintable(keycode) {
	    var valid = keycode > 47 && keycode < 58 || // number keys
	    keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
	    keycode > 64 && keycode < 91 || // letter keys
	    keycode > 95 && keycode < 112 || // numpad keys
	    keycode > 185 && keycode < 193 || // ;=,-./` (in order)
	    keycode > 218 && keycode < 223; // [\]' (in order)

	    return valid;
	  },
	  isKeyExplicitlyHandled: function isKeyExplicitlyHandled(key) {
	    return typeof this['onPress' + key] === 'function';
	  },
	  isCtrlKeyHeldDown: function isCtrlKeyHeldDown(e) {
	    return e.ctrlKey === true && e.key !== 'Control';
	  },
	  checkAndCall: function checkAndCall(methodName, args) {
	    if (typeof this[methodName] === 'function') {
	      this[methodName](args);
	    }
	  }
	};

	module.exports = KeyboardHandlerMixin;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var RowUtils = {
	  get: function get(row, property) {
	    if (typeof row.get === 'function') {
	      return row.get(property);
	    }

	    return row[property];
	  },
	  isRowSelected: function isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx) {
	    if (indexes && Object.prototype.toString.call(indexes) === '[object Array]') {
	      return indexes.indexOf(rowIdx) > -1;
	    } else if (keys && keys.rowKey && keys.values && Object.prototype.toString.call(keys.values) === '[object Array]') {
	      return keys.values.indexOf(rowData[keys.rowKey]) > -1;
	    } else if (isSelectedKey && rowData && typeof isSelectedKey === 'string') {
	      return rowData[isSelectedKey];
	    }
	    return false;
	  }
	};

	module.exports = RowUtils;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	var isFunction = function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	module.exports = isFunction;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var size = void 0;

	function getScrollbarSize() {
	  if (size === undefined) {
	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.clientWidth;
	    outer.style.overflowY = 'scroll';
	    var innerWidth = inner.clientWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(103),
	    mapCacheDelete = __webpack_require__(104),
	    mapCacheGet = __webpack_require__(105),
	    mapCacheHas = __webpack_require__(106),
	    mapCacheSet = __webpack_require__(107);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(69),
	    arraySome = __webpack_require__(75);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof (window) == 'object' && (window) && (window).Object === Object && (window);

	module.exports = freeGlobal;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(34),
	    isLength = __webpack_require__(35);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _keyMirror = __webpack_require__(64);

	var _keyMirror2 = _interopRequireDefault(_keyMirror);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var constants = {
	  UpdateActions: (0, _keyMirror2['default'])({
	    CELL_UPDATE: null,
	    COLUMN_FILL: null,
	    COPY_PASTE: null,
	    CELL_DRAG: null
	  })
	};

	exports['default'] = constants;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _shallowEqual = __webpack_require__(25);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _RowsContainer = __webpack_require__(52);

	var _RowsContainer2 = _interopRequireDefault(_RowsContainer);

	var _RowGroup = __webpack_require__(51);

	var _RowGroup2 = _interopRequireDefault(_RowGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var joinClasses = __webpack_require__(3);
	var PropTypes = React.PropTypes;
	var ScrollShim = __webpack_require__(53);
	var Row = __webpack_require__(15);
	var cellMetaDataShape = __webpack_require__(8);
	var RowUtils = __webpack_require__(22);


	var Canvas = React.createClass({
	  displayName: 'Canvas',

	  mixins: [ScrollShim],

	  propTypes: {
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    height: PropTypes.number.isRequired,
	    width: PropTypes.number,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    style: PropTypes.string,
	    className: PropTypes.string,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    rowsCount: PropTypes.number.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.array.isRequired]),
	    expandedRows: PropTypes.array,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	    cellMetaData: PropTypes.shape(cellMetaDataShape).isRequired,
	    selectedRows: PropTypes.array,
	    rowKey: React.PropTypes.string,
	    rowScrollTimeout: React.PropTypes.number,
	    contextMenu: PropTypes.element,
	    getSubRowDetails: PropTypes.func,
	    rowSelection: React.PropTypes.oneOfType([React.PropTypes.shape({
	      indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	    }), React.PropTypes.shape({
	      isSelectedKey: React.PropTypes.string.isRequired
	    }), React.PropTypes.shape({
	      keys: React.PropTypes.shape({
	        values: React.PropTypes.array.isRequired,
	        rowKey: React.PropTypes.string.isRequired
	      }).isRequired
	    })]),
	    rowGroupRenderer: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowRenderer: Row,
	      onRows: function onRows() {},
	      selectedRows: [],
	      rowScrollTimeout: 0
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd,
	      scrollingTimeout: null
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },
	  componentDidMount: function componentDidMount() {
	    this.onRows();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.displayStart !== this.state.displayStart || nextProps.displayEnd !== this.state.displayEnd) {
	      this.setState({
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd
	      });
	    }
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var shouldUpdate = nextState.displayStart !== this.state.displayStart || nextState.displayEnd !== this.state.displayEnd || nextState.scrollingTimeout !== this.state.scrollingTimeout || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !(0, _shallowEqual2['default'])(nextProps.style, this.props.style);
	    return shouldUpdate;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
	      this.setScrollLeft(this._scroll.scrollLeft);
	    }
	    this.onRows();
	  },
	  onRows: function onRows() {
	    if (this._currentRowsRange !== { start: 0, end: 0 }) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = { start: 0, end: 0 };
	    }
	  },
	  onScroll: function onScroll(e) {
	    var _this = this;

	    if (ReactDOM.findDOMNode(this) !== e.target) {
	      return;
	    }
	    this.appendScrollShim();
	    var scrollLeft = e.target.scrollLeft;
	    var scrollTop = e.target.scrollTop;
	    var scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
	    // check how far we have scrolled, and if this means we are being taken out of range
	    var scrollYRange = Math.abs(this._scroll.scrollTop - scroll.scrollTop) / this.props.rowHeight;
	    var scrolledOutOfRange = scrollYRange > this.props.displayEnd - this.props.displayStart;

	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	    // if we go out of range, we queue the actual render, just rendering cheap placeholders
	    // avoiding rendering anything expensive while a user scrolls down
	    if (scrolledOutOfRange && this.props.rowScrollTimeout > 0) {
	      var scrollTO = this.state.scrollingTimeout;
	      if (scrollTO) {
	        clearTimeout(scrollTO);
	      }
	      // queue up, and set state to clear the TO so we render the rows (not placeholders)
	      scrollTO = setTimeout(function () {
	        if (_this.state.scrollingTimeout !== null) {
	          _this.setState({ scrollingTimeout: null });
	        }
	      }, this.props.rowScrollTimeout);

	      this.setState({ scrollingTimeout: scrollTO });
	    }
	  },
	  getSubRows: function getSubRows(row) {
	    var subRowDetails = this.props.getSubRowDetails(row);
	    if (subRowDetails.expanded === true) {
	      return subRowDetails.children.map(function (r) {
	        return { row: r };
	      });
	    }
	  },
	  addSubRows: function addSubRows(rowsInput, row, i, displayEnd, treeDepth) {
	    var _this2 = this;

	    var subRowDetails = this.props.getSubRowDetails(row) || {};
	    var rows = rowsInput;
	    var increment = i;
	    if (increment < displayEnd) {
	      subRowDetails.treeDepth = treeDepth;
	      rows.push({ row: row, subRowDetails: subRowDetails });
	      increment++;
	    }
	    if (subRowDetails && subRowDetails.expanded) {
	      var subRows = this.getSubRows(row);
	      subRows.forEach(function (sr) {
	        var result = _this2.addSubRows(rows, sr.row, increment, displayEnd, treeDepth + 1);
	        rows = result.rows;
	        increment = result.increment;
	      });
	    }
	    return { rows: rows, increment: increment };
	  },
	  getRows: function getRows(displayStart, displayEnd) {
	    this._currentRowsRange = { start: displayStart, end: displayEnd };
	    if (Array.isArray(this.props.rowGetter)) {
	      return this.props.rowGetter.slice(displayStart, displayEnd);
	    }
	    var rows = [];
	    var rowFetchIndex = displayStart;
	    var i = displayStart;
	    while (i < displayEnd) {
	      var row = this.props.rowGetter(rowFetchIndex);
	      if (this.props.getSubRowDetails) {
	        var treeDepth = 0;
	        var result = this.addSubRows(rows, row, i, displayEnd, treeDepth);
	        rows = result.rows;
	        i = result.increment;
	      } else {
	        rows.push({ row: row });
	        i++;
	      }
	      rowFetchIndex++;
	    }
	    return rows;
	  },
	  getScrollbarWidth: function getScrollbarWidth() {
	    var scrollbarWidth = 0;
	    // Get the scrollbar width
	    var canvas = ReactDOM.findDOMNode(this);
	    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
	    return scrollbarWidth;
	  },
	  getScroll: function getScroll() {
	    var _ReactDOM$findDOMNode = ReactDOM.findDOMNode(this);

	    var scrollTop = _ReactDOM$findDOMNode.scrollTop;
	    var scrollLeft = _ReactDOM$findDOMNode.scrollLeft;

	    return { scrollTop: scrollTop, scrollLeft: scrollLeft };
	  },
	  isRowSelected: function isRowSelected(idx, row) {
	    var _this3 = this;

	    // Use selectedRows if set
	    if (this.props.selectedRows !== null) {
	      var selectedRows = this.props.selectedRows.filter(function (r) {
	        var rowKeyValue = row.get ? row.get(_this3.props.rowKey) : row[_this3.props.rowKey];
	        return r[_this3.props.rowKey] === rowKeyValue;
	      });
	      return selectedRows.length > 0 && selectedRows[0].isSelected;
	    }

	    // Else use new rowSelection props
	    if (this.props.rowSelection) {
	      var _props$rowSelection = this.props.rowSelection;
	      var keys = _props$rowSelection.keys;
	      var indexes = _props$rowSelection.indexes;
	      var isSelectedKey = _props$rowSelection.isSelectedKey;

	      return RowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
	    }

	    return false;
	  },


	  _currentRowsLength: 0,
	  _currentRowsRange: { start: 0, end: 0 },
	  _scroll: { scrollTop: 0, scrollLeft: 0 },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    if (this._currentRowsLength !== 0) {
	      if (!this.refs) return;
	      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
	        if (this.refs[i] && this.refs[i].setScrollLeft) {
	          this.refs[i].setScrollLeft(scrollLeft);
	        }
	      }
	    }
	  },
	  renderRow: function renderRow(props) {
	    var row = props.row;
	    if (row.__metaData && row.__metaData.isGroup) {
	      return React.createElement(_RowGroup2['default'], _extends({ name: row.name }, row.__metaData, { row: props.row, idx: props.idx, cellMetaData: this.props.cellMetaData, renderer: this.props.rowGroupRenderer }));
	    }
	    if (this.state.scrollingTimeout !== null) {
	      // in the midst of a rapid scroll, so we render placeholders
	      // the actual render is then queued (through a timeout)
	      // this avoids us redering a bunch of rows that a user is trying to scroll past
	      return this.renderScrollingPlaceholder(props);
	    }
	    var RowsRenderer = this.props.rowRenderer;
	    if (typeof RowsRenderer === 'function') {
	      return React.createElement(RowsRenderer, props);
	    }

	    if (React.isValidElement(this.props.rowRenderer)) {
	      return React.cloneElement(this.props.rowRenderer, props);
	    }
	  },
	  renderScrollingPlaceholder: function renderScrollingPlaceholder(props) {
	    // here we are just rendering empty cells
	    // we may want to allow a user to inject this, and/or just render the cells that are in view
	    // for now though we essentially are doing a (very lightweight) row + cell with empty content
	    var styles = {
	      row: { height: props.height, overflow: 'hidden' },
	      cell: { height: props.height, position: 'absolute' },
	      placeholder: { backgroundColor: 'rgba(211, 211, 211, 0.45)', width: '60%', height: Math.floor(props.height * 0.3) }
	    };
	    return React.createElement(
	      'div',
	      { key: props.key, style: styles.row, className: 'react-grid-Row' },
	      this.props.columns.map(function (col, idx) {
	        return React.createElement(
	          'div',
	          { style: Object.assign(styles.cell, { width: col.width, left: col.left }), key: idx, className: 'react-grid-Cell' },
	          React.createElement('div', { style: Object.assign(styles.placeholder, { width: Math.floor(col.width * 0.6) }) })
	        );
	      })
	    );
	  },
	  renderPlaceholder: function renderPlaceholder(key, height) {
	    // just renders empty cells
	    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	    return React.createElement(
	      'div',
	      { key: key, style: { height: height } },
	      this.props.columns.map(function (column, idx) {
	        return React.createElement('div', { style: { width: column.width }, key: idx });
	      })
	    );
	  },
	  render: function render() {
	    var _this4 = this;

	    var displayStart = this.state.displayStart;
	    var displayEnd = this.state.displayEnd;
	    var rowHeight = this.props.rowHeight;
	    var length = this.props.rowsCount;

	    var rows = this.getRows(displayStart, displayEnd).map(function (r, idx) {
	      return _this4.renderRow({
	        key: displayStart + idx,
	        ref: idx,
	        idx: displayStart + idx,
	        row: r.row,
	        height: rowHeight,
	        onMouseOver: _this4.onMouseOver,
	        columns: _this4.props.columns,
	        isSelected: _this4.isRowSelected(displayStart + idx, r.row, displayStart, displayEnd),
	        expandedRows: _this4.props.expandedRows,
	        cellMetaData: _this4.props.cellMetaData,
	        subRowDetails: r.subRowDetails
	      });
	    });

	    this._currentRowsLength = rows.length;

	    if (displayStart > 0) {
	      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
	    }

	    if (length - displayEnd > 0) {
	      rows.push(this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
	    }

	    var style = {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      overflowX: 'auto',
	      overflowY: 'scroll',
	      width: this.props.totalWidth,
	      height: this.props.height,
	      transform: 'translate3d(0, 0, 0)'
	    };

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        onScroll: this.onScroll,
	        className: joinClasses('react-grid-Canvas', this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) },
	      React.createElement(_RowsContainer2['default'], {
	        width: this.props.width,
	        rows: rows,
	        contextMenu: this.props.contextMenu,
	        rowIdx: this.props.cellMetaData.selected.rowIdx,
	        idx: this.props.cellMetaData.selected.idx })
	    );
	  }
	});

	module.exports = Canvas;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isValidElement = __webpack_require__(1).isValidElement;

	module.exports = function sameColumn(a, b) {
	  var k = void 0;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if (typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])) {
	        continue;
	      }
	      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
	        return false;
	      }
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ColumnMetrics = __webpack_require__(14);
	var DOMMetrics = __webpack_require__(9);
	Object.assign = __webpack_require__(36);
	var PropTypes = __webpack_require__(1).PropTypes;
	var ColumnUtils = __webpack_require__(5);

	var Column = function Column() {
	  _classCallCheck(this, Column);
	};

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.arrayOf(Column),
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func,
	    onColumnResize: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth: function gridWidth() {
	      return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      minColumnWidth: 80,
	      columnEquality: ColumnMetrics.sameColumn
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this._mounted = true;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.columns) {
	      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth) {
	        var columnMetrics = this.createColumnMetrics(nextProps);
	        this.setState({ columnMetrics: columnMetrics });
	      }
	    }
	  },
	  getTotalWidth: function getTotalWidth() {
	    var totalWidth = 0;
	    if (this._mounted) {
	      totalWidth = this.DOMMetrics.gridWidth();
	    } else {
	      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
	    }
	    return totalWidth;
	  },
	  getColumnMetricsType: function getColumnMetricsType(metrics) {
	    var totalWidth = metrics.totalWidth || this.getTotalWidth();
	    var currentMetrics = {
	      columns: metrics.columns,
	      totalWidth: totalWidth,
	      minColumnWidth: metrics.minColumnWidth
	    };
	    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
	    return updatedMetrics;
	  },
	  getColumn: function getColumn(idx) {
	    var columns = this.state.columnMetrics.columns;
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },
	  getSize: function getSize() {
	    var columns = this.state.columnMetrics.columns;
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  },
	  metricsUpdated: function metricsUpdated() {
	    var columnMetrics = this.createColumnMetrics();
	    this.setState({ columnMetrics: columnMetrics });
	  },
	  createColumnMetrics: function createColumnMetrics() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	    var gridColumns = this.setupGridColumns(props);
	    return this.getColumnMetricsType({
	      columns: gridColumns,
	      minColumnWidth: this.props.minColumnWidth,
	      totalWidth: props.minWidth
	    });
	  },
	  onColumnResize: function onColumnResize(index, width) {
	    var columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
	    this.setState({ columnMetrics: columnMetrics });
	    if (this.props.onColumnResize) {
	      this.props.onColumnResize(index, width);
	    }
	  }
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var PropTypes = React.PropTypes;

	var Draggable = React.createClass({
	  displayName: 'Draggable',

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onDragStart: function onDragStart() {
	        return true;
	      },
	      onDragEnd: function onDragEnd() {},
	      onDrag: function onDrag() {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      drag: null
	    };
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.cleanUp();
	  },
	  onMouseDown: function onMouseDown(e) {
	    var drag = this.props.onDragStart(e);

	    if (drag === null && e.button !== 0) {
	      return;
	    }

	    window.addEventListener('mouseup', this.onMouseUp);
	    window.addEventListener('mousemove', this.onMouseMove);
	    window.addEventListener('touchend', this.onMouseUp);
	    window.addEventListener('touchmove', this.onMouseMove);

	    this.setState({ drag: drag });
	  },
	  onMouseMove: function onMouseMove(e) {
	    if (this.state.drag === null) {
	      return;
	    }

	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    this.props.onDrag(e);
	  },
	  onMouseUp: function onMouseUp(e) {
	    this.cleanUp();
	    this.props.onDragEnd(e, this.state.drag);
	    this.setState({ drag: null });
	  },
	  cleanUp: function cleanUp() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	    window.removeEventListener('touchend', this.onMouseUp);
	    window.removeEventListener('touchmove', this.onMouseMove);
	  },
	  render: function render() {
	    return React.createElement('div', _extends({}, this.props, {
	      onMouseDown: this.onMouseDown,
	      onTouchStart: this.onMouseDown,
	      className: 'react-grid-HeaderCell__draggable' }));
	  }
	});

	module.exports = Draggable;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var PropTypes = React.PropTypes;
	var Header = __webpack_require__(44);
	var Viewport = __webpack_require__(54);
	var GridScrollMixin = __webpack_require__(43);
	var DOMMetrics = __webpack_require__(9);
	var cellMetaDataShape = __webpack_require__(8);

	var Grid = React.createClass({
	  displayName: 'Grid',

	  propTypes: {
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    columnMetrics: PropTypes.object,
	    minHeight: PropTypes.number,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowHeight: PropTypes.number,
	    rowRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	    emptyRowsView: PropTypes.func,
	    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowSelection: React.PropTypes.oneOfType([React.PropTypes.shape({
	      indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	    }), React.PropTypes.shape({
	      isSelectedKey: React.PropTypes.string.isRequired
	    }), React.PropTypes.shape({
	      keys: React.PropTypes.shape({
	        values: React.PropTypes.array.isRequired,
	        rowKey: React.PropTypes.string.isRequired
	      }).isRequired
	    })]),
	    rowsCount: PropTypes.number,
	    onRows: PropTypes.func,
	    sortColumn: React.PropTypes.string,
	    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
	    rowOffsetHeight: PropTypes.number.isRequired,
	    onViewportKeydown: PropTypes.func.isRequired,
	    onViewportKeyup: PropTypes.func,
	    onViewportDragStart: PropTypes.func.isRequired,
	    onViewportDragEnd: PropTypes.func.isRequired,
	    onViewportDoubleClick: PropTypes.func.isRequired,
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    rowKey: PropTypes.string.isRequired,
	    rowScrollTimeout: PropTypes.number,
	    contextMenu: PropTypes.element,
	    getSubRowDetails: PropTypes.func,
	    draggableHeaderCell: PropTypes.func,
	    getValidFilterValues: PropTypes.func,
	    rowGroupRenderer: PropTypes.func
	  },

	  mixins: [GridScrollMixin, DOMMetrics.MetricsComputatorMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  },


	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      outline: 0,
	      position: 'relative',
	      minHeight: this.props.minHeight
	    };
	  },

	  render: function render() {
	    var headerRows = this.props.headerRows || [{ ref: 'row' }];
	    var EmptyRowsView = this.props.emptyRowsView;

	    return React.createElement(
	      'div',
	      _extends({}, this.props, { style: this.getStyle(), className: 'react-grid-Grid' }),
	      React.createElement(Header, {
	        ref: 'header',
	        columnMetrics: this.props.columnMetrics,
	        onColumnResize: this.props.onColumnResize,
	        height: this.props.rowHeight,
	        totalWidth: this.props.totalWidth,
	        headerRows: headerRows,
	        sortColumn: this.props.sortColumn,
	        sortDirection: this.props.sortDirection,
	        draggableHeaderCell: this.props.draggableHeaderCell,
	        onSort: this.props.onSort,
	        onScroll: this.onHeaderScroll,
	        getValidFilterValues: this.props.getValidFilterValues
	      }),
	      this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView ? React.createElement(
	        'div',
	        { ref: 'viewPortContainer', tabIndex: '0', onKeyDown: this.props.onViewportKeydown, onKeyUp: this.props.onViewportKeyup, onDoubleClick: this.props.onViewportDoubleClick, onDragStart: this.props.onViewportDragStart, onDragEnd: this.props.onViewportDragEnd },
	        React.createElement(Viewport, {
	          ref: 'viewport',
	          rowKey: this.props.rowKey,
	          width: this.props.columnMetrics.width,
	          rowHeight: this.props.rowHeight,
	          rowRenderer: this.props.rowRenderer,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          selectedRows: this.props.selectedRows,
	          expandedRows: this.props.expandedRows,
	          columnMetrics: this.props.columnMetrics,
	          totalWidth: this.props.totalWidth,
	          onScroll: this.onScroll,
	          onRows: this.props.onRows,
	          cellMetaData: this.props.cellMetaData,
	          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,
	          minHeight: this.props.minHeight,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          contextMenu: this.props.contextMenu,
	          rowSelection: this.props.rowSelection,
	          getSubRowDetails: this.props.getSubRowDetails,
	          rowGroupRenderer: this.props.rowGroupRenderer
	        })
	      ) : React.createElement(
	        'div',
	        { ref: 'emptyView', className: 'react-grid-Empty' },
	        React.createElement(EmptyRowsView, null)
	      )
	    );
	  }
	});

	module.exports = Grid;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactDOM = __webpack_require__(2);

	module.exports = {
	  componentDidMount: function componentDidMount() {
	    this._scrollLeft = this.refs.viewport ? this.refs.viewport.getScroll().scrollLeft : 0;
	    this._onScroll();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._onScroll();
	  },
	  componentWillMount: function componentWillMount() {
	    this._scrollLeft = undefined;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._scrollLeft = undefined;
	  },
	  onScroll: function onScroll(props) {
	    if (this._scrollLeft !== props.scrollLeft) {
	      this._scrollLeft = props.scrollLeft;
	      this._onScroll();
	    }
	  },
	  onHeaderScroll: function onHeaderScroll(e) {
	    var scrollLeft = e.target.scrollLeft;
	    if (this._scrollLeft !== scrollLeft) {
	      this._scrollLeft = scrollLeft;
	      this.refs.header.setScrollLeft(scrollLeft);
	      var canvas = ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);
	      canvas.scrollLeft = scrollLeft;
	      this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);
	    }
	  },
	  _onScroll: function _onScroll() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      if (this.refs.viewport) {
	        this.refs.viewport.setScrollLeft(this._scrollLeft);
	      }
	    }
	  }
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var joinClasses = __webpack_require__(3);
	var shallowCloneObject = __webpack_require__(16);
	var ColumnMetrics = __webpack_require__(14);
	var ColumnUtils = __webpack_require__(5);
	var HeaderRow = __webpack_require__(47);
	var PropTypes = React.PropTypes;

	var Header = React.createClass({
	  displayName: 'Header',

	  propTypes: {
	    columnMetrics: PropTypes.shape({ width: PropTypes.number.isRequired, columns: PropTypes.any }).isRequired,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    headerRows: PropTypes.array.isRequired,
	    sortColumn: PropTypes.string,
	    sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
	    onSort: PropTypes.func,
	    onColumnResize: PropTypes.func,
	    onScroll: PropTypes.func,
	    draggableHeaderCell: PropTypes.func,
	    getValidFilterValues: PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return { resizing: null };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps() {
	    this.setState({ resizing: null });
	  },


	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var update = !ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn) || this.props.totalWidth !== nextProps.totalWidth || this.props.headerRows.length !== nextProps.headerRows.length || this.state.resizing !== nextState.resizing || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	    return update;
	  },

	  onColumnResize: function onColumnResize(column, width) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos != null) {
	      var _resizing = {
	        columnMetrics: shallowCloneObject(state.columnMetrics)
	      };
	      _resizing.columnMetrics = ColumnMetrics.resizeColumn(_resizing.columnMetrics, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (_resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
	        _resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
	      }

	      _resizing.column = ColumnUtils.getColumn(_resizing.columnMetrics.columns, pos);
	      this.setState({ resizing: _resizing });
	    }
	  },
	  onColumnResizeEnd: function onColumnResizeEnd(column, width) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },
	  getHeaderRows: function getHeaderRows() {
	    var _this = this;

	    var columnMetrics = this.getColumnMetrics();
	    var resizeColumn = void 0;
	    if (this.state.resizing) {
	      resizeColumn = this.state.resizing.column;
	    }
	    var headerRows = [];
	    this.props.headerRows.forEach(function (row, index) {
	      // To allow header filters to be visible
	      var rowHeight = 'auto';
	      if (row.rowType === 'filter') {
	        rowHeight = '500px';
	      }
	      var headerRowStyle = {
	        position: 'absolute',
	        top: _this.getCombinedHeaderHeights(index),
	        left: 0,
	        width: _this.props.totalWidth,
	        overflowX: 'hidden',
	        minHeight: rowHeight
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref,
	        ref: row.ref,
	        rowType: row.rowType,
	        style: headerRowStyle,
	        onColumnResize: _this.onColumnResize,
	        onColumnResizeEnd: _this.onColumnResizeEnd,
	        width: columnMetrics.width,
	        height: row.height || _this.props.height,
	        columns: columnMetrics.columns,
	        resizing: resizeColumn,
	        draggableHeaderCell: _this.props.draggableHeaderCell,
	        filterable: row.filterable,
	        onFilterChange: row.onFilterChange,
	        sortColumn: _this.props.sortColumn,
	        sortDirection: _this.props.sortDirection,
	        onSort: _this.props.onSort,
	        onScroll: _this.props.onScroll,
	        getValidFilterValues: _this.props.getValidFilterValues
	      }));
	    });
	    return headerRows;
	  },
	  getColumnMetrics: function getColumnMetrics() {
	    var columnMetrics = void 0;
	    if (this.state.resizing) {
	      columnMetrics = this.state.resizing.columnMetrics;
	    } else {
	      columnMetrics = this.props.columnMetrics;
	    }
	    return columnMetrics;
	  },
	  getColumnPosition: function getColumnPosition(column) {
	    var columnMetrics = this.getColumnMetrics();
	    var pos = -1;
	    columnMetrics.columns.forEach(function (c, idx) {
	      if (c.key === column.key) {
	        pos = idx;
	      }
	    });
	    return pos === -1 ? null : pos;
	  },
	  getCombinedHeaderHeights: function getCombinedHeaderHeights(until) {
	    var stopAt = this.props.headerRows.length;
	    if (typeof until !== 'undefined') {
	      stopAt = until;
	    }

	    var height = 0;
	    for (var index = 0; index < stopAt; index++) {
	      height += this.props.headerRows[index].height || this.props.height;
	    }
	    return height;
	  },
	  getStyle: function getStyle() {
	    return {
	      position: 'relative',
	      height: this.getCombinedHeaderHeights()
	    };
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = ReactDOM.findDOMNode(this.refs.row);
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	    if (this.refs.filterRow) {
	      var nodeFilters = ReactDOM.findDOMNode(this.refs.filterRow);
	      nodeFilters.scrollLeft = scrollLeft;
	      this.refs.filterRow.setScrollLeft(scrollLeft);
	    }
	  },
	  render: function render() {
	    var className = joinClasses({
	      'react-grid-Header': true,
	      'react-grid-Header--resizing': !!this.state.resizing
	    });
	    var headerRows = this.getHeaderRows();

	    return React.createElement(
	      'div',
	      _extends({}, this.props, { style: this.getStyle(), className: className }),
	      headerRows
	    );
	  }
	});

	module.exports = Header;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var joinClasses = __webpack_require__(3);
	var ExcelColumn = __webpack_require__(6);
	var ResizeHandle = __webpack_require__(50);
	var PropTypes = React.PropTypes;

	function simpleCellRenderer(objArgs) {
	  return React.createElement(
	    'div',
	    { className: 'widget-HeaderCell__value' },
	    objArgs.column.name
	  );
	}

	var HeaderCell = React.createClass({
	  displayName: 'HeaderCell',


	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.shape(ExcelColumn).isRequired,
	    onResize: PropTypes.func.isRequired,
	    height: PropTypes.number.isRequired,
	    onResizeEnd: PropTypes.func.isRequired,
	    className: PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },
	  getInitialState: function getInitialState() {
	    return { resizing: false };
	  },
	  onDragStart: function onDragStart(e) {
	    this.setState({ resizing: true });
	    // need to set dummy data for FF
	    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
	  },
	  onDrag: function onDrag(e) {
	    var resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
	    if (resize) {
	      var _width = this.getWidthFromMouseEvent(e);
	      if (_width > 0) {
	        resize(this.props.column, _width);
	      }
	    }
	  },
	  onDragEnd: function onDragEnd(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    this.props.onResizeEnd(this.props.column, width);
	    this.setState({ resizing: false });
	  },
	  getWidthFromMouseEvent: function getWidthFromMouseEvent(e) {
	    var right = e.pageX || e.touches && e.touches[0] && e.touches[0].pageX || e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX;
	    var left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
	    return right - left;
	  },
	  getCell: function getCell() {
	    if (React.isValidElement(this.props.renderer)) {
	      return React.cloneElement(this.props.renderer, { column: this.props.column, height: this.props.height });
	    }

	    return this.props.renderer({ column: this.props.column });
	  },
	  getStyle: function getStyle() {
	    return {
	      width: this.props.column.width,
	      left: this.props.column.left,
	      display: 'inline-block',
	      position: 'absolute',
	      height: this.props.height,
	      margin: 0,
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    };
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = ReactDOM.findDOMNode(this);
	    node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	    node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	  },
	  render: function render() {
	    var resizeHandle = void 0;
	    if (this.props.column.resizable) {
	      resizeHandle = React.createElement(ResizeHandle, {
	        onDrag: this.onDrag,
	        onDragStart: this.onDragStart,
	        onDragEnd: this.onDragEnd
	      });
	    }
	    var className = joinClasses({
	      'react-grid-HeaderCell': true,
	      'react-grid-HeaderCell--resizing': this.state.resizing,
	      'react-grid-HeaderCell--locked': this.props.column.locked
	    });
	    className = joinClasses(className, this.props.className, this.props.column.cellClass);
	    var cell = this.getCell();
	    return React.createElement(
	      'div',
	      { className: className, style: this.getStyle() },
	      cell,
	      resizeHandle
	    );
	  }
	});

	module.exports = HeaderCell;

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	var HeaderCellType = {
	  SORTABLE: 0,
	  FILTERABLE: 1,
	  NONE: 2,
	  CHECKBOX: 3
	};

	module.exports = HeaderCellType;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var shallowEqual = __webpack_require__(25);
	var BaseHeaderCell = __webpack_require__(45);
	var getScrollbarSize = __webpack_require__(24);
	var ExcelColumn = __webpack_require__(6);
	var ColumnUtilsMixin = __webpack_require__(5);
	var SortableHeaderCell = __webpack_require__(57);
	var FilterableHeaderCell = __webpack_require__(56);
	var HeaderCellType = __webpack_require__(46);

	var PropTypes = React.PropTypes;

	var HeaderRowStyle = {
	  overflow: React.PropTypes.string,
	  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	  height: React.PropTypes.number,
	  position: React.PropTypes.string
	};

	var DEFINE_SORT = ['ASC', 'DESC', 'NONE'];

	var HeaderRow = React.createClass({
	  displayName: 'HeaderRow',

	  propTypes: {
	    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func.isRequired,
	    onColumnResizeEnd: PropTypes.func,
	    style: PropTypes.shape(HeaderRowStyle),
	    sortColumn: PropTypes.string,
	    sortDirection: React.PropTypes.oneOf(DEFINE_SORT),
	    cellRenderer: PropTypes.func,
	    headerCellRenderer: PropTypes.func,
	    filterable: PropTypes.bool,
	    onFilterChange: PropTypes.func,
	    resizing: PropTypes.object,
	    onScroll: PropTypes.func,
	    rowType: PropTypes.string,
	    draggableHeaderCell: PropTypes.func
	  },

	  mixins: [ColumnUtilsMixin],

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style, this.props.style) || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	  },
	  getHeaderCellType: function getHeaderCellType(column) {
	    if (column.filterable) {
	      if (this.props.filterable) return HeaderCellType.FILTERABLE;
	    }

	    if (column.sortable) return HeaderCellType.SORTABLE;

	    return HeaderCellType.NONE;
	  },
	  getFilterableHeaderCell: function getFilterableHeaderCell(column) {
	    var FilterRenderer = FilterableHeaderCell;
	    if (column.filterRenderer !== undefined) {
	      FilterRenderer = column.filterRenderer;
	    }
	    return React.createElement(FilterRenderer, _extends({}, this.props, { onChange: this.props.onFilterChange }));
	  },
	  getSortableHeaderCell: function getSortableHeaderCell(column) {
	    var sortDirection = this.props.sortColumn === column.key ? this.props.sortDirection : DEFINE_SORT.NONE;
	    return React.createElement(SortableHeaderCell, { columnKey: column.key, onSort: this.props.onSort, sortDirection: sortDirection });
	  },
	  getHeaderRenderer: function getHeaderRenderer(column) {
	    var renderer = void 0;
	    if (column.headerRenderer) {
	      renderer = column.headerRenderer;
	    } else {
	      var headerCellType = this.getHeaderCellType(column);
	      switch (headerCellType) {
	        case HeaderCellType.SORTABLE:
	          renderer = this.getSortableHeaderCell(column);
	          break;
	        case HeaderCellType.FILTERABLE:
	          renderer = this.getFilterableHeaderCell(column);
	          break;
	        default:
	          break;
	      }
	    }
	    return renderer;
	  },
	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  },
	  getCells: function getCells() {
	    var cells = [];
	    var lockedCells = [];
	    for (var i = 0, len = this.getSize(this.props.columns); i < len; i++) {
	      var column = this.getColumn(this.props.columns, i);
	      var _renderer = this.getHeaderRenderer(column);
	      if (column.key === 'select-row' && this.props.rowType === 'filter') {
	        _renderer = React.createElement('div', null);
	      }
	      var _HeaderCell = column.draggable ? this.props.draggableHeaderCell : BaseHeaderCell;
	      var cell = React.createElement(_HeaderCell, {
	        ref: i,
	        key: i,
	        height: this.props.height,
	        column: column,
	        renderer: _renderer,
	        resizing: this.props.resizing === column,
	        onResize: this.props.onColumnResize,
	        onResizeEnd: this.props.onColumnResizeEnd
	      });
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var _this = this;

	    this.props.columns.forEach(function (column, i) {
	      if (column.locked) {
	        _this.refs[i].setScrollLeft(scrollLeft);
	      }
	    });
	  },
	  render: function render() {
	    var cellsStyle = {
	      width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
	      height: this.props.height,
	      whiteSpace: 'nowrap',
	      overflowX: 'hidden',
	      overflowY: 'hidden'
	    };

	    var cells = this.getCells();
	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: 'react-grid-HeaderRow', onScroll: this.props.onScroll }),
	      React.createElement(
	        'div',
	        { style: cellsStyle },
	        cells
	      )
	    );
	  }
	});

	module.exports = HeaderRow;

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  Backspace: 8,
	  Tab: 9,
	  Enter: 13,
	  Shift: 16,
	  Ctrl: 17,
	  Alt: 18,
	  PauseBreak: 19,
	  CapsLock: 20,
	  Escape: 27,
	  PageUp: 33,
	  PageDown: 34,
	  End: 35,
	  Home: 36,
	  LeftArrow: 37,
	  UpArrow: 38,
	  RightArrow: 39,
	  DownArrow: 40,
	  Insert: 45,
	  Delete: 46,
	  0: 48,
	  1: 49,
	  2: 50,
	  3: 51,
	  4: 52,
	  5: 53,
	  6: 54,
	  7: 55,
	  8: 56,
	  9: 57,
	  a: 65,
	  b: 66,
	  c: 67,
	  d: 68,
	  e: 69,
	  f: 70,
	  g: 71,
	  h: 72,
	  i: 73,
	  j: 74,
	  k: 75,
	  l: 76,
	  m: 77,
	  n: 78,
	  o: 79,
	  p: 80,
	  q: 81,
	  r: 82,
	  s: 83,
	  t: 84,
	  u: 85,
	  v: 86,
	  w: 87,
	  x: 88,
	  y: 89,
	  z: 90,
	  LeftWindowKey: 91,
	  RightWindowKey: 92,
	  SelectKey: 93,
	  NumPad0: 96,
	  NumPad1: 97,
	  NumPad2: 98,
	  NumPad3: 99,
	  NumPad4: 100,
	  NumPad5: 101,
	  NumPad6: 102,
	  NumPad7: 103,
	  NumPad8: 104,
	  NumPad9: 105,
	  Multiply: 106,
	  Add: 107,
	  Subtract: 109,
	  DecimalPoint: 110,
	  Divide: 111,
	  F1: 112,
	  F2: 113,
	  F3: 114,
	  F4: 115,
	  F5: 116,
	  F6: 117,
	  F7: 118,
	  F8: 119,
	  F9: 120,
	  F10: 121,
	  F12: 123,
	  NumLock: 144,
	  ScrollLock: 145,
	  SemiColon: 186,
	  EqualSign: 187,
	  Comma: 188,
	  Dash: 189,
	  Period: 190,
	  ForwardSlash: 191,
	  GraveAccent: 192,
	  OpenBracket: 219,
	  BackSlash: 220,
	  CloseBracket: 221,
	  SingleQuote: 222
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _AppConstants = __webpack_require__(37);

	var _AppConstants2 = _interopRequireDefault(_AppConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var BaseGrid = __webpack_require__(42);
	var Row = __webpack_require__(15);
	var ExcelColumn = __webpack_require__(6);
	var KeyboardHandlerMixin = __webpack_require__(21);
	var CheckboxEditor = __webpack_require__(58);
	var DOMMetrics = __webpack_require__(9);
	var ColumnMetricsMixin = __webpack_require__(40);
	var RowUtils = __webpack_require__(22);
	var ColumnUtils = __webpack_require__(5);
	var KeyCodes = __webpack_require__(48);


	if (!Object.assign) {
	  Object.assign = __webpack_require__(36);
	}

	var ReactDataGrid = React.createClass({
	  displayName: 'ReactDataGrid',


	  mixins: [ColumnMetricsMixin, DOMMetrics.MetricsComputatorMixin, KeyboardHandlerMixin],

	  propTypes: {
	    rowHeight: React.PropTypes.number.isRequired,
	    headerRowHeight: React.PropTypes.number,
	    minHeight: React.PropTypes.number.isRequired,
	    minWidth: React.PropTypes.number,
	    enableRowSelect: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
	    onRowUpdated: React.PropTypes.func,
	    rowGetter: React.PropTypes.func.isRequired,
	    rowsCount: React.PropTypes.number.isRequired,
	    toolbar: React.PropTypes.element,
	    enableCellSelect: React.PropTypes.bool,
	    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
	    onFilter: React.PropTypes.func,
	    onCellCopyPaste: React.PropTypes.func,
	    onCellsDragged: React.PropTypes.func,
	    onAddFilter: React.PropTypes.func,
	    onGridSort: React.PropTypes.func,
	    onDragHandleDoubleClick: React.PropTypes.func,
	    onGridRowsUpdated: React.PropTypes.func,
	    onRowSelect: React.PropTypes.func,
	    rowKey: React.PropTypes.string,
	    rowScrollTimeout: React.PropTypes.number,
	    onClearFilters: React.PropTypes.func,
	    contextMenu: React.PropTypes.element,
	    cellNavigationMode: React.PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
	    onCellSelected: React.PropTypes.func,
	    onCellDeSelected: React.PropTypes.func,
	    onCellExpand: React.PropTypes.func,
	    enableDragAndDrop: React.PropTypes.bool,
	    onRowExpandToggle: React.PropTypes.func,
	    draggableHeaderCell: React.PropTypes.func,
	    getValidFilterValues: React.PropTypes.func,
	    rowSelection: React.PropTypes.shape({
	      enableShiftSelect: React.PropTypes.bool,
	      onRowsSelected: React.PropTypes.func,
	      onRowsDeselected: React.PropTypes.func,
	      showCheckbox: React.PropTypes.bool,
	      selectBy: React.PropTypes.oneOfType([React.PropTypes.shape({
	        indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	      }), React.PropTypes.shape({
	        isSelectedKey: React.PropTypes.string.isRequired
	      }), React.PropTypes.shape({
	        keys: React.PropTypes.shape({
	          values: React.PropTypes.array.isRequired,
	          rowKey: React.PropTypes.string.isRequired
	        }).isRequired
	      })]).isRequired
	    }),
	    onRowClick: React.PropTypes.func,
	    onGridKeyUp: React.PropTypes.func,
	    onGridKeyDown: React.PropTypes.func,
	    rowGroupRenderer: React.PropTypes.func,
	    rowActionsCell: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      enableCellSelect: false,
	      tabIndex: -1,
	      rowHeight: 35,
	      enableRowSelect: false,
	      minHeight: 350,
	      rowKey: 'id',
	      rowScrollTimeout: 0,
	      cellNavigationMode: 'none'
	    };
	  },


	  getInitialState: function getInitialState() {
	    var columnMetrics = this.createColumnMetrics();
	    var initialState = { columnMetrics: columnMetrics, selectedRows: [], copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0, lastRowIdxUiSelected: -1 };
	    if (this.props.enableCellSelect) {
	      initialState.selected = { rowIdx: 0, idx: 0 };
	    } else {
	      initialState.selected = { rowIdx: -1, idx: -1 };
	    }
	    return initialState;
	  },

	  hasSelectedCellChanged: function hasSelectedCellChanged(selected) {
	    var previouslySelected = Object.assign({}, this.state.selected);
	    return previouslySelected.rowIdx !== selected.rowIdx || previouslySelected.idx !== selected.idx || previouslySelected.active === false;
	  },

	  onContextMenuHide: function onContextMenuHide() {
	    document.removeEventListener('click', this.onContextMenuHide);
	    var newSelected = Object.assign({}, this.state.selected, { contextMenuDisplayed: false });
	    this.setState({ selected: newSelected });
	  },

	  onColumnEvent: function onColumnEvent(ev, columnEvent) {
	    var idx = columnEvent.idx;
	    var name = columnEvent.name;


	    if (name && typeof idx !== 'undefined') {
	      var column = this.getColumn(idx);

	      if (column && column.events && column.events[name] && typeof column.events[name] === 'function') {
	        var eventArgs = {
	          rowIdx: columnEvent.rowIdx,
	          idx: idx,
	          column: column
	        };

	        column.events[name](ev, eventArgs);
	      }
	    }
	  },

	  onSelect: function onSelect(selected) {
	    var _this = this;

	    if (this.state.selected.rowIdx !== selected.rowIdx || this.state.selected.idx !== selected.idx || this.state.selected.active === false) {
	      var _idx = selected.idx;
	      var _rowIdx = selected.rowIdx;
	      if (_idx >= 0 && _rowIdx >= 0 && _idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && _rowIdx < this.props.rowsCount) {
	        (function () {
	          var oldSelection = _this.state.selected;
	          _this.setState({ selected: selected }, function () {
	            if (typeof _this.props.onCellDeSelected === 'function') {
	              _this.props.onCellDeSelected(oldSelection);
	            }
	            if (typeof _this.props.onCellSelected === 'function') {
	              _this.props.onCellSelected(selected);
	            }
	          });
	        })();
	      }
	    }
	  },

	  onCellClick: function onCellClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });

	    if (this.props.onRowClick && typeof this.props.onRowClick === 'function') {
	      this.props.onRowClick(cell.rowIdx, this.props.rowGetter(cell.rowIdx));
	    }
	  },

	  onCellContextMenu: function onCellContextMenu(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx, contextMenuDisplayed: this.props.contextMenu });
	    if (this.props.contextMenu) {
	      document.addEventListener('click', this.onContextMenuHide);
	    }
	  },

	  onCellDoubleClick: function onCellDoubleClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
	    this.setActive('Enter');
	  },

	  onViewportDoubleClick: function onViewportDoubleClick() {
	    this.setActive();
	  },

	  onPressArrowUp: function onPressArrowUp(e) {
	    this.moveSelectedCell(e, -1, 0);
	  },
	  onPressArrowDown: function onPressArrowDown(e) {
	    this.moveSelectedCell(e, 1, 0);
	  },
	  onPressArrowLeft: function onPressArrowLeft(e) {
	    this.moveSelectedCell(e, 0, -1);
	  },
	  onPressArrowRight: function onPressArrowRight(e) {
	    this.moveSelectedCell(e, 0, 1);
	  },
	  onPressTab: function onPressTab(e) {
	    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
	  },
	  onPressEnter: function onPressEnter(e) {
	    this.setActive(e.key);
	  },
	  onPressDelete: function onPressDelete(e) {
	    this.setActive(e.key);
	  },
	  onPressEscape: function onPressEscape(e) {
	    this.setInactive(e.key);
	  },
	  onPressBackspace: function onPressBackspace(e) {
	    this.setActive(e.key);
	  },
	  onPressChar: function onPressChar(e) {
	    if (this.isKeyPrintable(e.keyCode)) {
	      this.setActive(e.keyCode);
	    }
	  },
	  onPressKeyWithCtrl: function onPressKeyWithCtrl(e) {
	    var keys = {
	      KeyCode_c: 99,
	      KeyCode_C: 67,
	      KeyCode_V: 86,
	      KeyCode_v: 118
	    };

	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
	      if (e.keyCode === keys.KeyCode_c || e.keyCode === keys.KeyCode_C) {
	        var _value = this.getSelectedValue();
	        this.handleCopy({ value: _value });
	      } else if (e.keyCode === keys.KeyCode_v || e.keyCode === keys.KeyCode_V) {
	        this.handlePaste();
	      }
	    }
	  },
	  onGridRowsUpdated: function onGridRowsUpdated(cellKey, fromRow, toRow, updated, action) {
	    var rowIds = [];

	    for (var i = fromRow; i <= toRow; i++) {
	      rowIds.push(this.props.rowGetter(i)[this.props.rowKey]);
	    }

	    this.props.onGridRowsUpdated({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, rowIds: rowIds, updated: updated, action: action });
	  },
	  onCellCommit: function onCellCommit(commit) {
	    var selected = Object.assign({}, this.state.selected);
	    selected.active = false;
	    if (commit.key === 'Tab') {
	      selected.idx += 1;
	    }
	    var expandedRows = this.state.expandedRows;
	    // if(commit.changed && commit.changed.expandedHeight){
	    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	    // }
	    this.setState({ selected: selected, expandedRows: expandedRows });

	    if (this.props.onRowUpdated) {
	      this.props.onRowUpdated(commit);
	    }

	    var targetRow = commit.rowIdx;

	    if (this.props.onGridRowsUpdated) {
	      this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, _AppConstants2['default'].UpdateActions.CELL_UPDATE);
	    }
	  },
	  onDragStart: function onDragStart(e) {
	    var idx = this.state.selected.idx;
	    if (idx > -1) {
	      var _value2 = this.getSelectedValue();
	      this.handleDragStart({ idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: _value2 });
	      // need to set dummy data for FF
	      if (e && e.dataTransfer) {
	        if (e.dataTransfer.setData) {
	          e.dataTransfer.dropEffect = 'move';
	          e.dataTransfer.effectAllowed = 'move';
	          e.dataTransfer.setData('text/plain', 'dummy');
	        }
	      }
	    }
	  },
	  onToggleFilter: function onToggleFilter() {
	    var _this2 = this;

	    // setState() does not immediately mutate this.state but creates a pending state transition.
	    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	    this.setState({ canFilter: !this.state.canFilter }, function () {
	      if (_this2.state.canFilter === false && _this2.props.onClearFilters) {
	        _this2.props.onClearFilters();
	      }
	    });
	  },
	  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
	    if (this.props.onDragHandleDoubleClick) {
	      this.props.onDragHandleDoubleClick(e);
	    }

	    if (this.props.onGridRowsUpdated) {
	      var _onGridRowsUpdated;

	      var cellKey = this.getColumn(e.idx).key;
	      this.onGridRowsUpdated(cellKey, e.rowIdx, this.props.rowsCount - 1, (_onGridRowsUpdated = {}, _onGridRowsUpdated[cellKey] = e.rowData[cellKey], _onGridRowsUpdated), _AppConstants2['default'].UpdateActions.COLUMN_FILL);
	    }
	  },
	  onCellExpand: function onCellExpand(args) {
	    if (this.props.onCellExpand) {
	      this.props.onCellExpand(args);
	    }
	  },
	  onRowExpandToggle: function onRowExpandToggle(args) {
	    if (typeof this.props.onRowExpandToggle === 'function') {
	      this.props.onRowExpandToggle(args);
	    }
	  },
	  handleDragStart: function handleDragStart(dragged) {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var idx = dragged.idx;
	    var rowIdx = dragged.rowIdx;
	    if (idx >= 0 && rowIdx >= 0 && idx < this.getSize() && rowIdx < this.props.rowsCount) {
	      this.setState({ dragged: dragged });
	    }
	  },
	  handleDragEnd: function handleDragEnd() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var fromRow = void 0;
	    var toRow = void 0;
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    var cellKey = this.getColumn(this.state.selected.idx).key;
	    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    toRow = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    if (this.props.onCellsDragged) {
	      this.props.onCellsDragged({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value });
	    }

	    if (this.props.onGridRowsUpdated) {
	      var _onGridRowsUpdated2;

	      this.onGridRowsUpdated(cellKey, fromRow, toRow, (_onGridRowsUpdated2 = {}, _onGridRowsUpdated2[cellKey] = dragged.value, _onGridRowsUpdated2), _AppConstants2['default'].UpdateActions.CELL_DRAG);
	    }
	    this.setState({ dragged: { complete: true } });
	  },
	  handleDragEnter: function handleDragEnter(row) {
	    if (!this.dragEnabled() || this.state.dragged == null) {
	      return;
	    }
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	    this.setState({ dragged: dragged });
	  },
	  handleTerminateDrag: function handleTerminateDrag() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    this.setState({ dragged: null });
	  },
	  handlePaste: function handlePaste() {
	    if (!this.copyPasteEnabled()) {
	      return;
	    }
	    var selected = this.state.selected;
	    var cellKey = this.getColumn(this.state.selected.idx).key;
	    var textToCopy = this.state.textToCopy;
	    var toRow = selected.rowIdx;

	    if (this.props.onCellCopyPaste) {
	      this.props.onCellCopyPaste({ cellKey: cellKey, rowIdx: toRow, value: textToCopy, fromRow: this.state.copied.rowIdx, toRow: toRow });
	    }

	    if (this.props.onGridRowsUpdated) {
	      var _onGridRowsUpdated3;

	      this.onGridRowsUpdated(cellKey, toRow, toRow, (_onGridRowsUpdated3 = {}, _onGridRowsUpdated3[cellKey] = textToCopy, _onGridRowsUpdated3), _AppConstants2['default'].UpdateActions.COPY_PASTE);
	    }

	    this.setState({ copied: null });
	  },
	  handleCopy: function handleCopy(args) {
	    if (!this.copyPasteEnabled()) {
	      return;
	    }
	    var textToCopy = args.value;
	    var selected = this.state.selected;
	    var copied = { idx: selected.idx, rowIdx: selected.rowIdx };
	    this.setState({ textToCopy: textToCopy, copied: copied });
	  },


	  handleSort: function handleSort(columnKey, direction) {
	    this.setState({ sortDirection: direction, sortColumn: columnKey }, function () {
	      this.props.onGridSort(columnKey, direction);
	    });
	  },

	  getSelectedRow: function getSelectedRow(rows, key) {
	    var _this3 = this;

	    var selectedRow = rows.filter(function (r) {
	      if (r[_this3.props.rowKey] === key) {
	        return true;
	      }
	      return false;
	    });
	    if (selectedRow.length > 0) {
	      return selectedRow[0];
	    }
	  },
	  useNewRowSelection: function useNewRowSelection() {
	    return this.props.rowSelection && this.props.rowSelection.selectBy;
	  },

	  // return false if not a shift select so can be handled as normal row selection
	  handleShiftSelect: function handleShiftSelect(rowIdx) {
	    if (this.state.lastRowIdxUiSelected > -1 && this.isSingleKeyDown(KeyCodes.Shift)) {
	      var _props$rowSelection$s = this.props.rowSelection.selectBy;
	      var keys = _props$rowSelection$s.keys;
	      var indexes = _props$rowSelection$s.indexes;
	      var isSelectedKey = _props$rowSelection$s.isSelectedKey;

	      var isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, this.props.rowGetter(rowIdx), rowIdx);

	      if (isPreviouslySelected) return false;

	      var handled = false;

	      if (rowIdx > this.state.lastRowIdxUiSelected) {
	        var rowsSelected = [];

	        for (var i = this.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
	          rowsSelected.push({ rowIdx: i, row: this.props.rowGetter(i) });
	        }

	        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
	          this.props.rowSelection.onRowsSelected(rowsSelected);
	        }

	        handled = true;
	      } else if (rowIdx < this.state.lastRowIdxUiSelected) {
	        var _rowsSelected = [];

	        for (var _i = rowIdx; _i <= this.state.lastRowIdxUiSelected - 1; _i++) {
	          _rowsSelected.push({ rowIdx: _i, row: this.props.rowGetter(_i) });
	        }

	        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
	          this.props.rowSelection.onRowsSelected(_rowsSelected);
	        }

	        handled = true;
	      }

	      if (handled) {
	        this.setState({ lastRowIdxUiSelected: rowIdx });
	      }

	      return handled;
	    }

	    return false;
	  },
	  handleNewRowSelect: function handleNewRowSelect(rowIdx, rowData) {
	    var _props$rowSelection$s2 = this.props.rowSelection.selectBy;
	    var keys = _props$rowSelection$s2.keys;
	    var indexes = _props$rowSelection$s2.indexes;
	    var isSelectedKey = _props$rowSelection$s2.isSelectedKey;

	    var isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

	    this.setState({ lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: { rowIdx: rowIdx, idx: 0 } });

	    if (isPreviouslySelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
	      this.props.rowSelection.onRowsDeselected([{ rowIdx: rowIdx, row: rowData }]);
	    } else if (!isPreviouslySelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
	      this.props.rowSelection.onRowsSelected([{ rowIdx: rowIdx, row: rowData }]);
	    }
	  },

	  // columnKey not used here as this function will select the whole row,
	  // but needed to match the function signature in the CheckboxEditor
	  handleRowSelect: function handleRowSelect(rowIdx, columnKey, rowData, e) {
	    e.stopPropagation();

	    if (this.useNewRowSelection()) {
	      if (this.props.rowSelection.enableShiftSelect === true) {
	        if (!this.handleShiftSelect(rowIdx)) {
	          this.handleNewRowSelect(rowIdx, rowData);
	        }
	      } else {
	        this.handleNewRowSelect(rowIdx, rowData);
	      }
	    } else {
	      // Fallback to old onRowSelect handler
	      var _selectedRows = this.props.enableRowSelect === 'single' ? [] : this.state.selectedRows.slice(0);
	      var selectedRow = this.getSelectedRow(_selectedRows, rowData[this.props.rowKey]);
	      if (selectedRow) {
	        selectedRow.isSelected = !selectedRow.isSelected;
	      } else {
	        rowData.isSelected = true;
	        _selectedRows.push(rowData);
	      }
	      this.setState({ selectedRows: _selectedRows, selected: { rowIdx: rowIdx, idx: 0 } });
	      if (this.props.onRowSelect) {
	        this.props.onRowSelect(_selectedRows.filter(function (r) {
	          return r.isSelected === true;
	        }));
	      }
	    }
	  },


	  handleCheckboxChange: function handleCheckboxChange(e) {
	    var allRowsSelected = void 0;
	    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
	      allRowsSelected = true;
	    } else {
	      allRowsSelected = false;
	    }
	    if (this.useNewRowSelection()) {
	      var _props$rowSelection$s3 = this.props.rowSelection.selectBy;
	      var keys = _props$rowSelection$s3.keys;
	      var indexes = _props$rowSelection$s3.indexes;
	      var isSelectedKey = _props$rowSelection$s3.isSelectedKey;


	      if (allRowsSelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
	        var _selectedRows2 = [];
	        for (var i = 0; i < this.props.rowsCount; i++) {
	          var rowData = this.props.rowGetter(i);
	          if (!RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
	            _selectedRows2.push({ rowIdx: i, row: rowData });
	          }
	        }

	        if (_selectedRows2.length > 0) {
	          this.props.rowSelection.onRowsSelected(_selectedRows2);
	        }
	      } else if (!allRowsSelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
	        var deselectedRows = [];
	        for (var _i2 = 0; _i2 < this.props.rowsCount; _i2++) {
	          var _rowData = this.props.rowGetter(_i2);
	          if (RowUtils.isRowSelected(keys, indexes, isSelectedKey, _rowData, _i2)) {
	            deselectedRows.push({ rowIdx: _i2, row: _rowData });
	          }
	        }

	        if (deselectedRows.length > 0) {
	          this.props.rowSelection.onRowsDeselected(deselectedRows);
	        }
	      }
	    } else {
	      var _selectedRows3 = [];
	      for (var _i3 = 0; _i3 < this.props.rowsCount; _i3++) {
	        var row = Object.assign({}, this.props.rowGetter(_i3), { isSelected: allRowsSelected });
	        _selectedRows3.push(row);
	      }
	      this.setState({ selectedRows: _selectedRows3 });
	      if (typeof this.props.onRowSelect === 'function') {
	        this.props.onRowSelect(_selectedRows3.filter(function (r) {
	          return r.isSelected === true;
	        }));
	      }
	    }
	  },

	  getScrollOffSet: function getScrollOffSet() {
	    var scrollOffset = 0;
	    var canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
	    if (canvas) {
	      scrollOffset = canvas.offsetWidth - canvas.clientWidth;
	    }
	    this.setState({ scrollOffset: scrollOffset });
	  },
	  getRowOffsetHeight: function getRowOffsetHeight() {
	    var offsetHeight = 0;
	    this.getHeaderRows().forEach(function (row) {
	      return offsetHeight += parseFloat(row.height, 10);
	    });
	    return offsetHeight;
	  },
	  getHeaderRows: function getHeaderRows() {
	    var rows = [{ ref: 'row', height: this.props.headerRowHeight || this.props.rowHeight, rowType: 'header' }];
	    if (this.state.canFilter === true) {
	      rows.push({
	        ref: 'filterRow',
	        filterable: true,
	        onFilterChange: this.props.onAddFilter,
	        height: 45,
	        rowType: 'filter'
	      });
	    }
	    return rows;
	  },

	  getInitialSelectedRows: function getInitialSelectedRows() {
	    var selectedRows = [];
	    for (var i = 0; i < this.props.rowsCount; i++) {
	      selectedRows.push(false);
	    }
	    return selectedRows;
	  },
	  getRowSelectionProps: function getRowSelectionProps() {
	    if (this.props.rowSelection) {
	      return this.props.rowSelection.selectBy;
	    }

	    return null;
	  },
	  getSelectedRows: function getSelectedRows() {
	    if (this.props.rowSelection) {
	      return null;
	    }

	    return this.state.selectedRows.filter(function (r) {
	      return r.isSelected === true;
	    });
	  },
	  getSelectedValue: function getSelectedValue() {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    var cellKey = this.getColumn(idx).key;
	    var row = this.props.rowGetter(rowIdx);
	    return RowUtils.get(row, cellKey);
	  },
	  moveSelectedCell: function moveSelectedCell(e, rowDelta, cellDelta) {
	    // we need to prevent default as we control grid scroll
	    // otherwise it moves every time you left/right which is janky
	    e.preventDefault();
	    var rowIdx = void 0;
	    var idx = void 0;
	    var cellNavigationMode = this.props.cellNavigationMode;

	    if (cellNavigationMode !== 'none') {
	      var _calculateNextSelecti = this.calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta);

	      idx = _calculateNextSelecti.idx;
	      rowIdx = _calculateNextSelecti.rowIdx;
	    } else {
	      rowIdx = this.state.selected.rowIdx + rowDelta;
	      idx = this.state.selected.idx + cellDelta;
	    }
	    this.onSelect({ idx: idx, rowIdx: rowIdx });
	  },
	  getNbrColumns: function getNbrColumns() {
	    var _props = this.props;
	    var columns = _props.columns;
	    var enableRowSelect = _props.enableRowSelect;

	    return enableRowSelect ? columns.length + 1 : columns.length;
	  },
	  calculateNextSelectionPosition: function calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta) {
	    var _rowDelta = rowDelta;
	    var idx = this.state.selected.idx + cellDelta;
	    var nbrColumns = this.getNbrColumns();
	    if (cellDelta > 0) {
	      if (this.isAtLastCellInRow(nbrColumns)) {
	        if (cellNavigationMode === 'changeRow') {
	          _rowDelta = this.isAtLastRow() ? rowDelta : rowDelta + 1;
	          idx = this.isAtLastRow() ? idx : 0;
	        } else {
	          idx = 0;
	        }
	      }
	    } else if (cellDelta < 0) {
	      if (this.isAtFirstCellInRow()) {
	        if (cellNavigationMode === 'changeRow') {
	          _rowDelta = this.isAtFirstRow() ? rowDelta : rowDelta - 1;
	          idx = this.isAtFirstRow() ? 0 : nbrColumns - 1;
	        } else {
	          idx = nbrColumns - 1;
	        }
	      }
	    }
	    var rowIdx = this.state.selected.rowIdx + _rowDelta;
	    return { idx: idx, rowIdx: rowIdx };
	  },
	  isAtLastCellInRow: function isAtLastCellInRow(nbrColumns) {
	    return this.state.selected.idx === nbrColumns - 1;
	  },
	  isAtLastRow: function isAtLastRow() {
	    return this.state.selected.rowIdx === this.props.rowsCount - 1;
	  },
	  isAtFirstCellInRow: function isAtFirstCellInRow() {
	    return this.state.selected.idx === 0;
	  },
	  isAtFirstRow: function isAtFirstRow() {
	    return this.state.selected.rowIdx === 0;
	  },
	  openCellEditor: function openCellEditor(rowIdx, idx) {
	    var _this4 = this;

	    var row = this.props.rowGetter(rowIdx);
	    var col = this.getColumn(idx);

	    if (!ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
	      return;
	    }

	    var selected = { rowIdx: rowIdx, idx: idx };
	    if (this.hasSelectedCellChanged(selected)) {
	      this.setState({ selected: selected }, function () {
	        _this4.setActive('Enter');
	      });
	    } else {
	      this.setActive('Enter');
	    }
	  },
	  scrollToColumn: function scrollToColumn(colIdx) {
	    var canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
	    if (canvas) {
	      var left = 0;
	      var locked = 0;

	      for (var i = 0; i < colIdx; i++) {
	        var column = this.getColumn(i);
	        if (column) {
	          if (column.width) {
	            left += column.width;
	          }
	          if (column.locked) {
	            locked += column.width;
	          }
	        }
	      }

	      var selectedColumn = this.getColumn(colIdx);
	      if (selectedColumn) {
	        var scrollLeft = left - locked - canvas.scrollLeft;
	        var scrollRight = left + selectedColumn.width - canvas.scrollLeft;

	        if (scrollLeft < 0) {
	          canvas.scrollLeft += scrollLeft;
	        } else if (scrollRight > canvas.clientWidth) {
	          var scrollAmount = scrollRight - canvas.clientWidth;
	          canvas.scrollLeft += scrollAmount;
	        }
	      }
	    }
	  },
	  setActive: function setActive(keyPressed) {
	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && !this.isActive()) {
	      var _selected = Object.assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed });
	      this.setState({ selected: _selected }, this.scrollToColumn(idx));
	    }
	  },
	  setInactive: function setInactive() {
	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && this.isActive()) {
	      var _selected2 = Object.assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: false });
	      this.setState({ selected: _selected2 });
	    }
	  },
	  isActive: function isActive() {
	    return this.state.selected.active === true;
	  },


	  setupGridColumns: function setupGridColumns() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	    var cols = props.columns.slice(0);
	    var unshiftedCols = {};
	    if (this.props.rowActionsCell || props.enableRowSelect && !this.props.rowSelection || props.rowSelection && props.rowSelection.showCheckbox !== false) {
	      var headerRenderer = props.enableRowSelect === 'single' ? null : React.createElement(
	        'div',
	        { className: 'react-grid-checkbox-container' },
	        React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: 'select-all-checkbox', id: 'select-all-checkbox', onChange: this.handleCheckboxChange }),
	        React.createElement('label', { htmlFor: 'select-all-checkbox', className: 'react-grid-checkbox-label' })
	      );
	      var Formatter = this.props.rowActionsCell ? this.props.rowActionsCell : CheckboxEditor;
	      var selectColumn = {
	        key: 'select-row',
	        name: '',
	        formatter: React.createElement(Formatter, { rowSelection: this.props.rowSelection }),
	        onCellChange: this.handleRowSelect,
	        filterable: false,
	        headerRenderer: headerRenderer,
	        width: 60,
	        locked: true,
	        getRowMetaData: function getRowMetaData(rowData) {
	          return rowData;
	        },
	        cellClass: 'rdg-row-actions-cell'
	      };
	      unshiftedCols = cols.unshift(selectColumn);
	      cols = unshiftedCols > 0 ? cols : unshiftedCols;
	    }
	    return cols;
	  },

	  copyPasteEnabled: function copyPasteEnabled() {
	    return this.props.onCellCopyPaste !== null;
	  },

	  dragEnabled: function dragEnabled() {
	    return this.props.onCellsDragged !== undefined;
	  },

	  renderToolbar: function renderToolbar() {
	    var Toolbar = this.props.toolbar;
	    if (React.isValidElement(Toolbar)) {
	      return React.cloneElement(Toolbar, { columns: this.props.columns, onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount });
	    }
	  },
	  render: function render() {
	    var cellMetaData = {
	      selected: this.state.selected,
	      dragged: this.state.dragged,
	      hoveredRowIdx: this.state.hoveredRowIdx,
	      onCellClick: this.onCellClick,
	      onCellContextMenu: this.onCellContextMenu,
	      onCellDoubleClick: this.onCellDoubleClick,
	      onCommit: this.onCellCommit,
	      onCommitCancel: this.setInactive,
	      copied: this.state.copied,
	      handleDragEnterRow: this.handleDragEnter,
	      handleTerminateDrag: this.handleTerminateDrag,
	      enableCellSelect: this.props.enableCellSelect,
	      onColumnEvent: this.onColumnEvent,
	      openCellEditor: this.openCellEditor,
	      onDragHandleDoubleClick: this.onDragHandleDoubleClick,
	      onCellExpand: this.onCellExpand,
	      onRowExpandToggle: this.onRowExpandToggle,
	      onRowHover: this.onRowHover
	    };

	    var toolbar = this.renderToolbar();
	    var containerWidth = this.props.minWidth || this.DOMMetrics.gridWidth();
	    var gridWidth = containerWidth - this.state.scrollOffset;

	    // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	    // this also handles cases where it always returns undefined -- such as when inside a div with display:none
	    // eg Bootstrap tabs and collapses
	    if (typeof containerWidth === 'undefined' || isNaN(containerWidth) || containerWidth === 0) {
	      containerWidth = '100%';
	    }
	    if (typeof gridWidth === 'undefined' || isNaN(gridWidth) || gridWidth === 0) {
	      gridWidth = '100%';
	    }
	    return React.createElement(
	      'div',
	      { className: 'react-grid-Container', style: { width: containerWidth } },
	      toolbar,
	      React.createElement(
	        'div',
	        { className: 'react-grid-Main' },
	        React.createElement(BaseGrid, _extends({
	          ref: 'base'
	        }, this.props, {
	          rowKey: this.props.rowKey,
	          headerRows: this.getHeaderRows(),
	          columnMetrics: this.state.columnMetrics,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          rowHeight: this.props.rowHeight,
	          cellMetaData: cellMetaData,
	          selectedRows: this.getSelectedRows(),
	          rowSelection: this.getRowSelectionProps(),
	          expandedRows: this.state.expandedRows,
	          rowOffsetHeight: this.getRowOffsetHeight(),
	          sortColumn: this.state.sortColumn,
	          sortDirection: this.state.sortDirection,
	          onSort: this.handleSort,
	          minHeight: this.props.minHeight,
	          totalWidth: gridWidth,
	          onViewportKeydown: this.onKeyDown,
	          onViewportKeyup: this.onKeyUp,
	          onViewportDragStart: this.onDragStart,
	          onViewportDragEnd: this.handleDragEnd,
	          onViewportDoubleClick: this.onViewportDoubleClick,
	          onColumnResize: this.onColumnResize,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          contextMenu: this.props.contextMenu }))
	      )
	    );
	  }
	});

	module.exports = ReactDataGrid;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var Draggable = __webpack_require__(41);

	var ResizeHandle = React.createClass({
	  displayName: 'ResizeHandle',

	  style: {
	    position: 'absolute',
	    top: 0,
	    right: 0,
	    width: 6,
	    height: '100%'
	  },

	  render: function render() {
	    return React.createElement(Draggable, _extends({}, this.props, {
	      className: 'react-grid-HeaderCell__resizeHandle',
	      style: this.style
	    }));
	  }
	});

	module.exports = ResizeHandle;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RowGroup = function (_Component) {
	  _inherits(RowGroup, _Component);

	  function RowGroup() {
	    _classCallCheck(this, RowGroup);

	    var _this = _possibleConstructorReturn(this, _Component.call(this));

	    _this.checkFocus = _this.checkFocus.bind(_this);
	    _this.isSelected = _this.isSelected.bind(_this);
	    _this.onClick = _this.onClick.bind(_this);
	    _this.onRowExpandToggle = _this.onRowExpandToggle.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onRowExpandClick = _this.onRowExpandClick.bind(_this);
	    return _this;
	  }

	  RowGroup.prototype.componentDidMount = function componentDidMount() {
	    this.checkFocus();
	  };

	  RowGroup.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.checkFocus();
	  };

	  RowGroup.prototype.isSelected = function isSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.rowIdx === this.props.idx;
	  };

	  RowGroup.prototype.onClick = function onClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellClick && typeof meta.onCellClick === 'function') {
	      meta.onCellClick({ rowIdx: this.props.idx, idx: 0 }, e);
	    }
	  };

	  RowGroup.prototype.onKeyDown = function onKeyDown(e) {
	    if (e.key === 'ArrowLeft') {
	      this.onRowExpandToggle(false);
	    }
	    if (e.key === 'ArrowRight') {
	      this.onRowExpandToggle(true);
	    }
	    if (e.key === 'Enter') {
	      this.onRowExpandToggle(!this.props.isExpanded);
	    }
	  };

	  RowGroup.prototype.onRowExpandClick = function onRowExpandClick() {
	    this.onRowExpandToggle(!this.props.isExpanded);
	  };

	  RowGroup.prototype.onRowExpandToggle = function onRowExpandToggle(expand) {
	    var shouldExpand = expand == null ? !this.props.isExpanded : expand;
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onRowExpandToggle && typeof meta.onRowExpandToggle === 'function') {
	      meta.onRowExpandToggle({ rowIdx: this.props.idx, shouldExpand: shouldExpand, columnGroupName: this.props.columnGroupName, name: this.props.name });
	    }
	  };

	  RowGroup.prototype.getClassName = function getClassName() {
	    return (0, _classnames2['default'])('react-grid-row-group', 'react-grid-Row', { 'row-selected': this.isSelected() });
	  };

	  RowGroup.prototype.checkFocus = function checkFocus() {
	    if (this.isSelected()) {
	      _reactDom2['default'].findDOMNode(this).focus();
	    }
	  };

	  RowGroup.prototype.render = function render() {
	    var style = {
	      height: '50px',
	      overflow: 'hidden',
	      border: '1px solid #dddddd',
	      paddingTop: '15px',
	      paddingLeft: '5px'
	    };
	    var rowGroupRendererProps = Object.assign({ onRowExpandClick: this.onRowExpandClick }, this.props);

	    return _react2['default'].createElement(
	      'div',
	      { style: style, className: this.getClassName(), onClick: this.onClick, onKeyDown: this.onKeyDown, tabIndex: -1 },
	      _react2['default'].createElement(this.props.renderer, rowGroupRendererProps)
	    );
	  };

	  return RowGroup;
	}(_react.Component);

	RowGroup.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  columnGroupName: _react.PropTypes.string.isRequired,
	  isExpanded: _react.PropTypes.bool.isRequired,
	  treeDepth: _react.PropTypes.number.isRequired,
	  height: _react.PropTypes.number.isRequired,
	  cellMetaData: _react.PropTypes.object,
	  idx: _react.PropTypes.number.isRequired,
	  renderer: _react.PropTypes.func
	};

	var DefaultRowGroupRenderer = function DefaultRowGroupRenderer(props) {
	  var treeDepth = props.treeDepth || 0;
	  var marginLeft = treeDepth * 20;

	  return _react2['default'].createElement(
	    'div',
	    null,
	    _react2['default'].createElement(
	      'span',
	      { className: 'row-expand-icon', style: { float: 'left', marginLeft: marginLeft, cursor: 'pointer' }, onClick: props.onRowExpandClick },
	      props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')
	    ),
	    _react2['default'].createElement(
	      'strong',
	      null,
	      props.columnGroupName,
	      ' : ',
	      props.name
	    )
	  );
	};

	DefaultRowGroupRenderer.propTypes = {
	  onRowExpandClick: _react.PropTypes.func.isRequired,
	  isExpanded: _react.PropTypes.bool.isRequired,
	  treeDepth: _react.PropTypes.number.isRequired,
	  name: _react.PropTypes.string.isRequired,
	  columnGroupName: _react.PropTypes.string.isRequired
	};

	RowGroup.defaultProps = {
	  renderer: DefaultRowGroupRenderer
	};

	exports['default'] = RowGroup;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.SimpleRowsContainer = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleRowsContainer = function SimpleRowsContainer(props) {
	  return _react2['default'].createElement(
	    'div',
	    { style: { overflow: 'hidden' } },
	    props.rows
	  );
	};

	SimpleRowsContainer.propTypes = {
	  width: _react.PropTypes.number,
	  rows: _react.PropTypes.array
	};

	var RowsContainer = function (_React$Component) {
	  _inherits(RowsContainer, _React$Component);

	  function RowsContainer(props) {
	    _classCallCheck(this, RowsContainer);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.plugins = props.window ? props.window.ReactDataGridPlugins : window.ReactDataGridPlugins;
	    _this.hasContextMenu = _this.hasContextMenu.bind(_this);
	    _this.renderRowsWithContextMenu = _this.renderRowsWithContextMenu.bind(_this);
	    _this.getContextMenuContainer = _this.getContextMenuContainer.bind(_this);
	    _this.state = { ContextMenuContainer: _this.getContextMenuContainer(props) };
	    return _this;
	  }

	  RowsContainer.prototype.getContextMenuContainer = function getContextMenuContainer() {
	    if (this.hasContextMenu()) {
	      if (!this.plugins) {
	        throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
	      }
	      return this.plugins.Menu.ContextMenuLayer('reactDataGridContextMenu')(SimpleRowsContainer);
	    }
	  };

	  RowsContainer.prototype.hasContextMenu = function hasContextMenu() {
	    return this.props.contextMenu && _react2['default'].isValidElement(this.props.contextMenu);
	  };

	  RowsContainer.prototype.renderRowsWithContextMenu = function renderRowsWithContextMenu() {
	    var ContextMenuRowsContainer = this.state.ContextMenuContainer;
	    var newProps = { rowIdx: this.props.rowIdx, idx: this.props.idx };
	    var contextMenu = _react2['default'].cloneElement(this.props.contextMenu, newProps);
	    // Initialise the context menu if it is available
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(ContextMenuRowsContainer, this.props),
	      contextMenu
	    );
	  };

	  RowsContainer.prototype.render = function render() {
	    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : _react2['default'].createElement(SimpleRowsContainer, this.props);
	  };

	  return RowsContainer;
	}(_react2['default'].Component);

	RowsContainer.propTypes = {
	  contextMenu: _react.PropTypes.element,
	  rowIdx: _react.PropTypes.number,
	  idx: _react.PropTypes.number,
	  window: _react.PropTypes.object
	};

	exports['default'] = RowsContainer;
	exports.SimpleRowsContainer = SimpleRowsContainer;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ScrollShim = {
	  appendScrollShim: function appendScrollShim() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      if (shim.classList) {
	        shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
	      } else {
	        shim.className += ' react-grid-ScrollShim';
	      }
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = size.width + 'px';
	      shim.style.height = size.height + 'px';
	      _reactDom2['default'].findDOMNode(this).appendChild(shim);
	      this._scrollShim = shim;
	    }
	    this._scheduleRemoveScrollShim();
	  },
	  _scrollShimSize: function _scrollShimSize() {
	    return {
	      width: this.props.width,
	      height: this.props.length * this.props.rowHeight
	    };
	  },
	  _scheduleRemoveScrollShim: function _scheduleRemoveScrollShim() {
	    if (this._scheduleRemoveScrollShimTimer) {
	      clearTimeout(this._scheduleRemoveScrollShimTimer);
	    }
	    this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim, 200);
	  },
	  _removeScrollShim: function _removeScrollShim() {
	    if (this._scrollShim) {
	      this._scrollShim.parentNode.removeChild(this._scrollShim);
	      this._scrollShim = undefined;
	    }
	  }
	};

	module.exports = ScrollShim;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Canvas = __webpack_require__(38);
	var ViewportScroll = __webpack_require__(55);
	var cellMetaDataShape = __webpack_require__(8);
	var PropTypes = React.PropTypes;

	var Viewport = React.createClass({
	  displayName: 'Viewport',

	  mixins: [ViewportScroll],

	  propTypes: {
	    rowOffsetHeight: PropTypes.number.isRequired,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	    columnMetrics: PropTypes.object.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    selectedRows: PropTypes.array,
	    rowSelection: React.PropTypes.oneOfType([React.PropTypes.shape({
	      indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	    }), React.PropTypes.shape({
	      isSelectedKey: React.PropTypes.string.isRequired
	    }), React.PropTypes.shape({
	      keys: React.PropTypes.shape({
	        values: React.PropTypes.array.isRequired,
	        rowKey: React.PropTypes.string.isRequired
	      }).isRequired
	    })]),
	    expandedRows: PropTypes.array,
	    rowRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	    rowsCount: PropTypes.number.isRequired,
	    rowHeight: PropTypes.number.isRequired,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    minHeight: PropTypes.number,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    rowKey: PropTypes.string.isRequired,
	    rowScrollTimeout: PropTypes.number,
	    contextMenu: PropTypes.element,
	    getSubRowDetails: PropTypes.func,
	    rowGroupRenderer: PropTypes.func
	  },

	  onScroll: function onScroll(scroll) {
	    this.updateScroll(scroll.scrollTop, scroll.scrollLeft, this.state.height, this.props.rowHeight, this.props.rowsCount);

	    if (this.props.onScroll) {
	      this.props.onScroll({ scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft });
	    }
	  },
	  getScroll: function getScroll() {
	    return this.refs.canvas.getScroll();
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
	  },
	  render: function render() {
	    var style = {
	      padding: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      overflow: 'hidden',
	      position: 'absolute',
	      top: this.props.rowOffsetHeight
	    };
	    return React.createElement(
	      'div',
	      {
	        className: 'react-grid-Viewport',
	        style: style },
	      React.createElement(Canvas, {
	        ref: 'canvas',
	        rowKey: this.props.rowKey,
	        totalWidth: this.props.totalWidth,
	        width: this.props.columnMetrics.width,
	        rowGetter: this.props.rowGetter,
	        rowsCount: this.props.rowsCount,
	        selectedRows: this.props.selectedRows,
	        expandedRows: this.props.expandedRows,
	        columns: this.props.columnMetrics.columns,
	        rowRenderer: this.props.rowRenderer,
	        displayStart: this.state.displayStart,
	        displayEnd: this.state.displayEnd,
	        cellMetaData: this.props.cellMetaData,
	        height: this.state.height,
	        rowHeight: this.props.rowHeight,
	        onScroll: this.onScroll,
	        onRows: this.props.onRows,
	        rowScrollTimeout: this.props.rowScrollTimeout,
	        contextMenu: this.props.contextMenu,
	        rowSelection: this.props.rowSelection,
	        getSubRowDetails: this.props.getSubRowDetails,
	        rowGroupRenderer: this.props.rowGroupRenderer
	      })
	    );
	  }
	});

	module.exports = Viewport;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var DOMMetrics = __webpack_require__(9);
	var min = Math.min;
	var max = Math.max;
	var floor = Math.floor;
	var ceil = Math.ceil;

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight: function viewportHeight() {
	      return ReactDOM.findDOMNode(this).offsetHeight;
	    }
	  },

	  propTypes: {
	    rowHeight: React.PropTypes.number,
	    rowsCount: React.PropTypes.number.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 30
	    };
	  },
	  getInitialState: function getInitialState() {
	    return this.getGridState(this.props);
	  },
	  getGridState: function getGridState(props) {
	    var canvasHeight = props.minHeight - props.rowOffsetHeight;
	    var renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
	    var totalRowCount = min(renderedRowsCount * 2, props.rowsCount);
	    return {
	      displayStart: 0,
	      displayEnd: totalRowCount,
	      height: canvasHeight,
	      scrollTop: 0,
	      scrollLeft: 0
	    };
	  },
	  updateScroll: function updateScroll(scrollTop, scrollLeft, height, rowHeight, length) {
	    var renderedRowsCount = ceil(height / rowHeight);

	    var visibleStart = floor(scrollTop / rowHeight);

	    var visibleEnd = min(visibleStart + renderedRowsCount, length);

	    var displayStart = max(0, visibleStart - renderedRowsCount * 2);

	    var displayEnd = min(visibleStart + renderedRowsCount * 2, length);

	    var nextScrollState = {
	      visibleStart: visibleStart,
	      visibleEnd: visibleEnd,
	      displayStart: displayStart,
	      displayEnd: displayEnd,
	      height: height,
	      scrollTop: scrollTop,
	      scrollLeft: scrollLeft
	    };

	    this.setState(nextScrollState);
	  },
	  metricsUpdated: function metricsUpdated() {
	    var height = this.DOMMetrics.viewportHeight();
	    if (height) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, height, this.props.rowHeight, this.props.rowsCount);
	    }
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.rowsCount !== nextProps.rowsCount) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height, nextProps.rowHeight, nextProps.rowsCount);
	      // Added to fix the hiding of the bottom scrollbar when showing the filters.
	    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
	      // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
	      var _height = this.props.rowOffsetHeight - nextProps.rowOffsetHeight;

	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height + _height, nextProps.rowHeight, nextProps.rowsCount);
	    }
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ExcelColumn = __webpack_require__(6);

	var FilterableHeaderCell = React.createClass({
	  displayName: 'FilterableHeaderCell',


	  propTypes: {
	    onChange: React.PropTypes.func.isRequired,
	    column: React.PropTypes.shape(ExcelColumn)
	  },

	  getInitialState: function getInitialState() {
	    return { filterTerm: '' };
	  },
	  handleChange: function handleChange(e) {
	    var val = e.target.value;
	    this.setState({ filterTerm: val });
	    this.props.onChange({ filterTerm: val, column: this.props.column });
	  },


	  renderInput: function renderInput() {
	    if (this.props.column.filterable === false) {
	      return React.createElement('span', null);
	    }

	    var inputKey = 'header-filter-' + this.props.column.key;
	    return React.createElement('input', { key: inputKey, type: 'text', className: 'form-control input-sm', placeholder: 'Search', value: this.state.filterTerm, onChange: this.handleChange });
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'form-group' },
	        this.renderInput()
	      )
	    );
	  }
	});

	module.exports = FilterableHeaderCell;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(3);
	var DEFINE_SORT = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	  NONE: 'NONE'
	};

	var SortableHeaderCell = React.createClass({
	  displayName: 'SortableHeaderCell',

	  propTypes: {
	    columnKey: React.PropTypes.string.isRequired,
	    column: React.PropTypes.shape({ name: React.PropTypes.node }),
	    onSort: React.PropTypes.func.isRequired,
	    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE'])
	  },

	  onClick: function onClick() {
	    var direction = void 0;
	    switch (this.props.sortDirection) {
	      default:
	      case null:
	      case undefined:
	      case DEFINE_SORT.NONE:
	        direction = DEFINE_SORT.ASC;
	        break;
	      case DEFINE_SORT.ASC:
	        direction = DEFINE_SORT.DESC;
	        break;
	      case DEFINE_SORT.DESC:
	        direction = DEFINE_SORT.NONE;
	        break;
	    }
	    this.props.onSort(this.props.columnKey, direction);
	  },

	  getSortByText: function getSortByText() {
	    var unicodeKeys = {
	      ASC: '9650',
	      DESC: '9660',
	      NONE: ''
	    };
	    return String.fromCharCode(unicodeKeys[this.props.sortDirection]);
	  },

	  render: function render() {
	    var className = joinClasses({
	      'react-grid-HeaderCell-sortable': true,
	      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
	      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
	    });

	    return React.createElement(
	      'div',
	      { className: className,
	        onClick: this.onClick,
	        style: { cursor: 'pointer' } },
	      this.props.column.name,
	      React.createElement(
	        'span',
	        { className: 'pull-right' },
	        this.getSortByText()
	      )
	    );
	  }
	});

	module.exports = SortableHeaderCell;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var CheckboxEditor = React.createClass({
	  displayName: 'CheckboxEditor',


	  propTypes: {
	    value: React.PropTypes.bool,
	    rowIdx: React.PropTypes.number,
	    column: React.PropTypes.shape({
	      key: React.PropTypes.string,
	      onCellChange: React.PropTypes.func
	    }),
	    dependentValues: React.PropTypes.object
	  },

	  handleChange: function handleChange(e) {
	    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
	  },
	  render: function render() {
	    var checked = this.props.value != null ? this.props.value : false;
	    var checkboxName = 'checkbox' + this.props.rowIdx;
	    return React.createElement(
	      'div',
	      { className: 'react-grid-checkbox-container', onClick: this.handleChange },
	      React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: checkboxName, checked: checked }),
	      React.createElement('label', { htmlFor: checkboxName, className: 'react-grid-checkbox-label' })
	    );
	  }
	});

	module.exports = CheckboxEditor;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var ExcelColumn = __webpack_require__(6);

	var EditorBase = function (_React$Component) {
	  _inherits(EditorBase, _React$Component);

	  function EditorBase() {
	    _classCallCheck(this, EditorBase);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  EditorBase.prototype.getStyle = function getStyle() {
	    return {
	      width: '100%'
	    };
	  };

	  EditorBase.prototype.getValue = function getValue() {
	    var updated = {};
	    updated[this.props.column.key] = this.getInputNode().value;
	    return updated;
	  };

	  EditorBase.prototype.getInputNode = function getInputNode() {
	    var domNode = ReactDOM.findDOMNode(this);
	    if (domNode.tagName === 'INPUT') {
	      return domNode;
	    }

	    return domNode.querySelector('input:not([type=hidden])');
	  };

	  EditorBase.prototype.inheritContainerStyles = function inheritContainerStyles() {
	    return true;
	  };

	  return EditorBase;
	}(React.Component);

	EditorBase.propTypes = {
	  onKeyDown: React.PropTypes.func.isRequired,
	  value: React.PropTypes.any.isRequired,
	  onBlur: React.PropTypes.func.isRequired,
	  column: React.PropTypes.shape(ExcelColumn).isRequired,
	  commit: React.PropTypes.func.isRequired
	};

	module.exports = EditorBase;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(3);
	var keyboardHandlerMixin = __webpack_require__(21);
	var SimpleTextEditor = __webpack_require__(61);
	var isFunction = __webpack_require__(23);

	var EditorContainer = React.createClass({
	  displayName: 'EditorContainer',

	  mixins: [keyboardHandlerMixin],

	  propTypes: {
	    rowIdx: React.PropTypes.number,
	    rowData: React.PropTypes.object.isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    cellMetaData: React.PropTypes.shape({
	      selected: React.PropTypes.object.isRequired,
	      copied: React.PropTypes.object,
	      dragged: React.PropTypes.object,
	      onCellClick: React.PropTypes.func,
	      onCellDoubleClick: React.PropTypes.func,
	      onCommitCancel: React.PropTypes.func,
	      onCommit: React.PropTypes.func
	    }).isRequired,
	    column: React.PropTypes.object.isRequired,
	    height: React.PropTypes.number.isRequired
	  },

	  changeCommitted: false,

	  getInitialState: function getInitialState() {
	    return { isInvalid: false };
	  },


	  componentDidMount: function componentDidMount() {
	    var inputNode = this.getInputNode();
	    if (inputNode !== undefined) {
	      this.setTextInputFocus();
	      if (!this.getEditor().disableContainerStyles) {
	        inputNode.className += ' editor-main';
	        inputNode.style.height = this.props.height - 1 + 'px';
	      }
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.changeCommitted && !this.hasEscapeBeenPressed()) {
	      this.commit({ key: 'Enter' });
	    }
	  },

	  createEditor: function createEditor() {
	    var _this = this;

	    var editorRef = function editorRef(c) {
	      return _this.editor = c;
	    };
	    var editorProps = {
	      ref: editorRef,
	      column: this.props.column,
	      value: this.getInitialValue(),
	      onCommit: this.commit,
	      rowMetaData: this.getRowMetaData(),
	      rowData: this.props.rowData,
	      height: this.props.height,
	      onBlur: this.commit,
	      onOverrideKeyDown: this.onKeyDown
	    };

	    var CustomEditor = this.props.column.editor;
	    // return custom column editor or SimpleEditor if none specified
	    if (React.isValidElement(CustomEditor)) {
	      return React.cloneElement(CustomEditor, editorProps);
	    }
	    if (isFunction(CustomEditor)) {
	      return React.createElement(CustomEditor, _extends({ ref: editorRef }, editorProps));
	    }

	    return React.createElement(SimpleTextEditor, { ref: editorRef, column: this.props.column, value: this.getInitialValue(), onBlur: this.commit, rowMetaData: this.getRowMetaData(), onKeyDown: function onKeyDown() {}, commit: function commit() {} });
	  },
	  onPressEnter: function onPressEnter() {
	    this.commit({ key: 'Enter' });
	  },
	  onPressTab: function onPressTab() {
	    this.commit({ key: 'Tab' });
	  },
	  onPressEscape: function onPressEscape(e) {
	    if (!this.editorIsSelectOpen()) {
	      this.props.cellMetaData.onCommitCancel();
	    } else {
	      // prevent event from bubbling if editor has results to select
	      e.stopPropagation();
	    }
	  },
	  onPressArrowDown: function onPressArrowDown(e) {
	    if (this.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowUp: function onPressArrowUp(e) {
	    if (this.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowLeft: function onPressArrowLeft(e) {
	    // prevent event propogation. this disables left cell navigation
	    if (!this.isCaretAtBeginningOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowRight: function onPressArrowRight(e) {
	    // prevent event propogation. this disables right cell navigation
	    if (!this.isCaretAtEndOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  editorHasResults: function editorHasResults() {
	    if (isFunction(this.getEditor().hasResults)) {
	      return this.getEditor().hasResults();
	    }

	    return false;
	  },
	  editorIsSelectOpen: function editorIsSelectOpen() {
	    if (isFunction(this.getEditor().isSelectOpen)) {
	      return this.getEditor().isSelectOpen();
	    }

	    return false;
	  },
	  getRowMetaData: function getRowMetaData() {
	    // clone row data so editor cannot actually change this
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
	    }
	  },
	  getEditor: function getEditor() {
	    return this.editor;
	  },
	  getInputNode: function getInputNode() {
	    return this.getEditor().getInputNode();
	  },
	  getInitialValue: function getInitialValue() {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    if (keyCode === 'Delete' || keyCode === 'Backspace') {
	      return '';
	    } else if (keyCode === 'Enter') {
	      return this.props.value;
	    }

	    var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	    return text;
	  },
	  getContainerClass: function getContainerClass() {
	    return joinClasses({
	      'has-error': this.state.isInvalid === true
	    });
	  },
	  commit: function commit(args) {
	    var opts = args || {};
	    var updated = this.getEditor().getValue();
	    if (this.isNewValueValid(updated)) {
	      this.changeCommitted = true;
	      var cellKey = this.props.column.key;
	      this.props.cellMetaData.onCommit({ cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key });
	    }
	  },
	  isNewValueValid: function isNewValueValid(value) {
	    if (isFunction(this.getEditor().validate)) {
	      var isValid = this.getEditor().validate(value);
	      this.setState({ isInvalid: !isValid });

	      return isValid;
	    }

	    return true;
	  },
	  setCaretAtEndOfInput: function setCaretAtEndOfInput() {
	    var input = this.getInputNode();
	    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if (input.setSelectionRange) {
	      input.setSelectionRange(txtLength, txtLength);
	    } else if (input.createTextRange) {
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txtLength);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  },
	  isCaretAtBeginningOfInput: function isCaretAtBeginningOfInput() {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;
	  },
	  isCaretAtEndOfInput: function isCaretAtEndOfInput() {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.value.length;
	  },
	  setTextInputFocus: function setTextInputFocus() {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    var inputNode = this.getInputNode();
	    inputNode.focus();
	    if (inputNode.tagName === 'INPUT') {
	      if (!this.isKeyPrintable(keyCode)) {
	        inputNode.focus();
	        inputNode.select();
	      } else {
	        inputNode.select();
	      }
	    }
	  },
	  hasEscapeBeenPressed: function hasEscapeBeenPressed() {
	    var pressed = false;
	    var escapeKey = 27;
	    if (window.event) {
	      if (window.event.keyCode === escapeKey) {
	        pressed = true;
	      } else if (window.event.which === escapeKey) {
	        pressed = true;
	      }
	    }
	    return pressed;
	  },
	  renderStatusIcon: function renderStatusIcon() {
	    if (this.state.isInvalid === true) {
	      return React.createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback' });
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.getContainerClass(), onKeyDown: this.onKeyDown, commit: this.commit },
	      this.createEditor(),
	      this.renderStatusIcon()
	    );
	  }
	});

	module.exports = EditorContainer;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(1);
	var EditorBase = __webpack_require__(59);

	var SimpleTextEditor = function (_EditorBase) {
	  _inherits(SimpleTextEditor, _EditorBase);

	  function SimpleTextEditor() {
	    _classCallCheck(this, SimpleTextEditor);

	    return _possibleConstructorReturn(this, _EditorBase.apply(this, arguments));
	  }

	  SimpleTextEditor.prototype.render = function render() {
	    return React.createElement('input', { ref: 'input', type: 'text', onBlur: this.props.onBlur, className: 'form-control', defaultValue: this.props.value });
	  };

	  return SimpleTextEditor;
	}(EditorBase);

	module.exports = SimpleTextEditor;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var SimpleCellFormatter = React.createClass({
	  displayName: 'SimpleCellFormatter',

	  propTypes: {
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.value !== this.props.value;
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { title: this.props.value },
	      this.props.value
	    );
	  }
	});

	module.exports = SimpleCellFormatter;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(63);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function (obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ?  false ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(89),
	    hashDelete = __webpack_require__(90),
	    hashGet = __webpack_require__(91),
	    hashHas = __webpack_require__(92),
	    hashSet = __webpack_require__(93);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(26),
	    setCacheAdd = __webpack_require__(112),
	    setCacheHas = __webpack_require__(113);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(10),
	    stackClear = __webpack_require__(115),
	    stackDelete = __webpack_require__(116),
	    stackGet = __webpack_require__(117),
	    stackHas = __webpack_require__(118),
	    stackSet = __webpack_require__(119);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(82),
	    isArguments = __webpack_require__(120),
	    isArray = __webpack_require__(32),
	    isIndex = __webpack_require__(94);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(78),
	    isObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(19);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(70),
	    equalArrays = __webpack_require__(27),
	    equalByTag = __webpack_require__(85),
	    equalObjects = __webpack_require__(86),
	    getTag = __webpack_require__(87),
	    isArray = __webpack_require__(32),
	    isHostObject = __webpack_require__(29),
	    isTypedArray = __webpack_require__(123);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(34),
	    isHostObject = __webpack_require__(29),
	    isMasked = __webpack_require__(96),
	    isObject = __webpack_require__(18),
	    toSource = __webpack_require__(30);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(35),
	    isObjectLike = __webpack_require__(19);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(97),
	    nativeKeys = __webpack_require__(109);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(71),
	    Uint8Array = __webpack_require__(72),
	    eq = __webpack_require__(31),
	    equalArrays = __webpack_require__(27),
	    mapToArray = __webpack_require__(108),
	    setToArray = __webpack_require__(114);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(124);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(65),
	    Map = __webpack_require__(17),
	    Promise = __webpack_require__(67),
	    Set = __webpack_require__(68),
	    WeakMap = __webpack_require__(73),
	    baseGetTag = __webpack_require__(76),
	    toSource = __webpack_require__(30);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(13);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	module.exports = hashClear;


/***/ },
/* 90 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	module.exports = hashDelete;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(13);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(13);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(13);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(84);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	module.exports = listCacheClear;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(11);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(66),
	    ListCache = __webpack_require__(10),
	    Map = __webpack_require__(17);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(12);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	module.exports = mapCacheDelete;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(12);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(12);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(12);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(111);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(28);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(125)(module)))

/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(10);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	module.exports = stackClear;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(10),
	    Map = __webpack_require__(17),
	    MapCache = __webpack_require__(26);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(121);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(33),
	    isObjectLike = __webpack_require__(19);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(77);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	module.exports = isEqual;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(80),
	    baseUnary = __webpack_require__(83),
	    nodeUtil = __webpack_require__(110);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(74),
	    baseKeys = __webpack_require__(81),
	    isArrayLike = __webpack_require__(33);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;