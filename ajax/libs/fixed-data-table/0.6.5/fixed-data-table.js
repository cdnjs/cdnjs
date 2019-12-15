/**
 * FixedDataTable v0.6.5 
 *
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FixedDataTable"] = factory(require("react"), require("react-dom"));
	else
		root["FixedDataTable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_58__) {
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
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(11);
	__webpack_require__(13);
	__webpack_require__(15);
	__webpack_require__(17);
	__webpack_require__(19);
	__webpack_require__(21);
	__webpack_require__(23);
	module.exports = __webpack_require__(25);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRoot
	 */

	'use strict';

	var FixedDataTable = __webpack_require__(26);
	var FixedDataTableCellDefault = __webpack_require__(78);
	var FixedDataTableColumn = __webpack_require__(76);
	var FixedDataTableColumnGroup = __webpack_require__(75);

	var FixedDataTableRoot = {
	  Cell: FixedDataTableCellDefault,
	  Column: FixedDataTableColumn,
	  ColumnGroup: FixedDataTableColumnGroup,
	  Table: FixedDataTable
	};

	FixedDataTableRoot.version = '0.6.5';
	module.exports = FixedDataTableRoot;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTable.react
	 */

	/**
	 * TRANSITION SHIM
	 * This acts to provide an intermediate mapping from the old API to the new API
	 *
	 * Remove this entire file and replace the two lines in FixedDataTableRoot
	 * when ready to continue to the new API.
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);

	var ReactChildren = React.Children;

	var PropTypes = __webpack_require__(37);

	// New Table API
	var Table = __webpack_require__(42);
	var Column = __webpack_require__(86);
	var ColumnGroup = __webpack_require__(87);

	// Transition Cell
	var TransitionCell = __webpack_require__(88);

	var NEXT_VERSION = '0.7.0';
	var DOCUMENTATION_URL = 'https://fburl.com/FixedDataTable-v0.6';

	var EMPTY_OBJECT = {};

	/**
	 * Notify in console that some prop has been deprecated.
	 */
	var notified = {};
	function notifyDeprecated(prop, reason) {
	  if (true) {
	    if (!notified[prop]) {
	      console.warn('`' + prop + '` will be DEPRECATED in version ' + NEXT_VERSION + ' of FixedDataTable and beyond. \n' + reason + '\n' + 'Read the docs at: ' + DOCUMENTATION_URL);
	      notified[prop] = true;
	    }
	  }
	}

	/**
	 * Data grid component with fixed or scrollable header and columns.
	 *
	 * This is currently in a transition mode, as the new API is used.
	 * DEPRECATED endpoints work, but will not be supported in later versions.
	 *
	 * The layout of the data table is as follows:
	 *
	 * ```
	 * +---------------------------------------------------+
	 * | Fixed Column Group    | Scrollable Column Group   |
	 * | Header                | Header                    |
	 * |                       |                           |
	 * +---------------------------------------------------+
	 * |                       |                           |
	 * | Fixed Header Columns  | Scrollable Header Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Body Columns    | Scrollable Body Columns   |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Footer Columns  | Scrollable Footer Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * ```
	 *
	 * - Fixed Column Group Header: These are the headers for a group
	 *   of columns if included in the table that do not scroll
	 *   vertically or horizontally.
	 *
	 * - Scrollable Column Group Header: The header for a group of columns
	 *   that do not move while scrolling vertically, but move horizontally
	 *   with the horizontal scrolling.
	 *
	 * - Fixed Header Columns: The header columns that do not move while scrolling
	 *   vertically or horizontally.
	 *
	 * - Scrollable Header Columns: The header columns that do not move
	 *   while scrolling vertically, but move horizontally with the horizontal
	 *   scrolling.
	 *
	 * - Fixed Body Columns: The body columns that do not move while scrolling
	 *   horizontally, but move vertically with the vertical scrolling.
	 *
	 * - Scrollable Body Columns: The body columns that move while scrolling
	 *   vertically or horizontally.
	 */
	var TransitionTable = createReactClass({
	  propTypes: {
	    /**
	     * Pixel width of table. If all columns do not fit,
	     * a horizontal scrollbar will appear.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    height: PropTypes.number,

	    /**
	     * Maximum pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    maxHeight: PropTypes.number,

	    /**
	     * Pixel height of table's owner, this is used in a managed scrolling
	     * situation when you want to slide the table up from below the fold
	     * without having to constantly update the height on every scroll tick.
	     * Instead, vary this property on scroll. By using `ownerHeight`, we
	     * over-render the table while making sure the footer and horizontal
	     * scrollbar of the table are visible when the current space for the table
	     * in view is smaller than the final, over-flowing height of table. It
	     * allows us to avoid resizing and reflowing table when it is moving in the
	     * view.
	     *
	     * This is used if `ownerHeight < height` (or `maxHeight`).
	     */
	    ownerHeight: PropTypes.number,

	    overflowX: PropTypes.oneOf(['hidden', 'auto']),
	    overflowY: PropTypes.oneOf(['hidden', 'auto']),

	    /**
	     * Number of rows in the table.
	     */
	    rowsCount: PropTypes.number.isRequired,

	    /**
	     * Pixel height of rows unless `rowHeightGetter` is specified and returns
	     * different value.
	     */
	    rowHeight: PropTypes.number.isRequired,

	    /**
	     * If specified, `rowHeightGetter(index)` is called for each row and the
	     * returned value overrides `rowHeight` for particular row.
	     */
	    rowHeightGetter: PropTypes.func,

	    /**
	     * DEPRECATED
	     *
	     * To get rows to display in table, `rowGetter(index)`
	     * is called. `rowGetter` should be smart enough to handle async
	     * fetching of data and return temporary objects
	     * while data is being fetched.
	     */
	    rowGetter: PropTypes.func,

	    /**
	     * To get any additional CSS classes that should be added to a row,
	     * `rowClassNameGetter(index)` is called.
	     */
	    rowClassNameGetter: PropTypes.func,

	    /**
	     * Pixel height of the column group header.
	     */
	    groupHeaderHeight: PropTypes.number,

	    /**
	     * Pixel height of header.
	     */
	    headerHeight: PropTypes.number.isRequired,

	    /**
	     * DEPRECATED
	     *
	     * Function that is called to get the data for the header row.
	     * If the function returns null, the header will be set to the
	     * Column's label property.
	     */
	    headerDataGetter: PropTypes.func,

	    /**
	     * Pixel height of footer.
	     */
	    footerHeight: PropTypes.number,

	    /**
	     * DEPRECATED - use footerDataGetter instead.
	     * Data that will be passed to footer cell renderers.
	     */
	    footerData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

	    /**
	     * DEPRECATED
	     *
	     * Function that is called to get the data for the footer row.
	     */
	    footerDataGetter: PropTypes.func,

	    /**
	     * Value of horizontal scroll.
	     */
	    scrollLeft: PropTypes.number,

	    /**
	     * Index of column to scroll to.
	     */
	    scrollToColumn: PropTypes.number,

	    /**
	     * Value of vertical scroll.
	     */
	    scrollTop: PropTypes.number,

	    /**
	     * Index of row to scroll to.
	     */
	    scrollToRow: PropTypes.number,

	    /**
	     * Callback that is called when scrolling starts with current horizontal
	     * and vertical scroll values.
	     */
	    onScrollStart: PropTypes.func,

	    /**
	     * Callback that is called when scrolling ends or stops with new horizontal
	     * and vertical scroll values.
	     */
	    onScrollEnd: PropTypes.func,

	    /**
	     * Callback that is called when `rowHeightGetter` returns a different height
	     * for a row than the `rowHeight` prop. This is necessary because initially
	     * table estimates heights of some parts of the content.
	     */
	    onContentHeightChange: PropTypes.func,

	    /**
	     * Callback that is called when a row is clicked.
	     */
	    onRowClick: PropTypes.func,

	    /**
	     * Callback that is called when a row is double clicked.
	     */
	    onRowDoubleClick: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-down event happens on a row.
	     */
	    onRowMouseDown: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-enter event happens on a row.
	     */
	    onRowMouseEnter: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-leave event happens on a row.
	     */
	    onRowMouseLeave: PropTypes.func,

	    /**
	     * Callback that is called when resizer has been released
	     * and column needs to be updated.
	     *
	     * Required if the isResizable property is true on any column.
	     *
	     * ```
	     * function(
	     *   newColumnWidth: number,
	     *   dataKey: string,
	     * )
	     * ```
	     */
	    onColumnResizeEndCallback: PropTypes.func,

	    /**
	     * Whether a column is currently being resized.
	     */
	    isColumnResizing: PropTypes.bool
	  },

	  getInitialState: function getInitialState() {
	    // Throw warnings on deprecated props.
	    var state = {};
	    state.needsMigration = this._checkDeprecations();

	    return state;
	  },

	  _checkDeprecations: function _checkDeprecations() {
	    var needsMigration = false;

	    if (this.props.rowGetter) {
	      notifyDeprecated('rowGetter', 'Please use the cell API in Column to fetch data for your cells.');

	      // ROWGETTER??? You need to migrate.
	      needsMigration = true;
	    }

	    if (this.props.headerDataGetter) {
	      notifyDeprecated('headerDataGetter', 'Please use the header API in Column to ' + 'fetch data for your header cells.');
	    }

	    if (this.props.footerData) {
	      notifyDeprecated('footerData', 'Please use the footer API in Column to ' + 'fetch data for your footer cells.');
	    }

	    if (this.props.footerDataGetter) {
	      notifyDeprecated('footerDataGetter', 'Please use the footer API in Column to ' + 'fetch data for your footer cells.');
	    }

	    ReactChildren.forEach(this.props.children, function (child) {
	      if (!child || !child.props) {
	        return;
	      }

	      var props = child.props;

	      if (props.label) {
	        notifyDeprecated('label', 'Please use `header` instead.');
	      }

	      if (props.dataKey) {
	        notifyDeprecated('dataKey', 'Please use the `cell` API to pass in a dataKey');
	      }

	      if (props.cellRenderer) {
	        notifyDeprecated('cellRenderer', 'Please use the `cell` API to pass in a React Element instead.');
	      }

	      if (props.headerRenderer) {
	        notifyDeprecated('headerRenderer', 'Please use the `header` API to pass in a React Element instead.');
	      }

	      if (props.columnData) {
	        notifyDeprecated('columnData', 'Please pass data in through props to your header, cell or footer.');
	      }

	      if (props.groupHeaderRenderer) {
	        notifyDeprecated('groupHeaderRenderer', 'Please use the `header` API in ColumnGroup to ' + 'pass in a React Element instead of a function that creates one.');
	      }

	      if (props.groupHeaderData) {
	        notifyDeprecated('groupHeaderData', 'Please pass in any data through props to your header.');
	      }
	    });

	    return needsMigration;
	  },

	  // Wrapper for onRow callbacks, since we don't have rowData at that level.
	  _onRowAction: function _onRowAction(props, callback) {
	    if (!callback) {
	      return undefined;
	    }

	    return function (e, rowIndex) {
	      callback(e, rowIndex, props.rowGetter && props.rowGetter(rowIndex) || EMPTY_OBJECT);
	    };
	  },

	  _transformColumn: function _transformColumn(column, tableProps, key) {

	    var props = column.props;

	    if (column.type.__TableColumn__) {
	      // Constuct the cell to be used using the rowGetter
	      return React.createElement(Column, _extends({
	        key: 'column_' + key
	      }, props, {
	        header: React.createElement(TransitionCell, {
	          isHeaderCell: true,
	          label: props.label,
	          width: props.width,
	          dataKey: props.dataKey,
	          className: props.headerClassName,
	          columnData: props.columnData || EMPTY_OBJECT,
	          cellRenderer: props.headerRenderer,
	          headerDataGetter: tableProps.headerDataGetter
	        }),
	        columnKey: props.dataKey,
	        cell: React.createElement(TransitionCell, {
	          dataKey: props.dataKey,
	          className: props.cellClassName,
	          rowGetter: tableProps.rowGetter,
	          width: props.width,
	          columnData: props.columnData || EMPTY_OBJECT,
	          cellDataGetter: props.cellDataGetter,
	          cellRenderer: props.cellRenderer
	        }),
	        footer: React.createElement(TransitionCell, {
	          isFooterCell: true,
	          className: props.footerClassName,
	          dataKey: props.dataKey,
	          cellRenderer: props.footerRenderer,
	          footerDataGetter: tableProps.footerDataGetter,
	          footerData: tableProps.footerData || EMPTY_OBJECT
	        })
	      }));
	    }
	  },

	  _transformColumnGroup: function _transformColumnGroup(group, tableProps, key, labels) {
	    var _this = this;

	    var props = group.props;

	    var j = 0;
	    var columns = ReactChildren.map(props.children, function (child) {
	      j++;
	      return _this._transformColumn(child, tableProps, key + '_' + j);
	    });

	    return React.createElement(
	      ColumnGroup,
	      _extends({}, props, {
	        key: 'group_' + key,
	        header: React.createElement(TransitionCell, {
	          isHeaderCell: true,
	          label: group.props.label,
	          dataKey: key,
	          groupHeaderRenderer: props.groupHeaderRenderer,
	          groupHeaderLabels: labels,
	          groupHeaderData: props.columnGroupData || EMPTY_OBJECT
	        }) }),
	      columns
	    );
	  },

	  _convertedColumns: function _convertedColumns(needsMigration) {
	    var _this2 = this;

	    // If we don't need to migrate, map directly to the new API.
	    if (!needsMigration) {
	      return ReactChildren.map(this.props.children, function (child) {

	        if (!child) {
	          return null;
	        }

	        if (child.type.__TableColumn__) {
	          return React.createElement(Column, child.props);
	        }

	        if (child.type.__TableColumnGroup__) {
	          return React.createElement(ColumnGroup, child.props);
	        }
	      });
	    }

	    var tableProps = this.props;

	    // Otherwise, if a migration is needed, we need to transform each Column
	    // or ColumnGroup.
	    var i = 0;
	    return ReactChildren.map(this.props.children, function (child) {

	      if (!child) {
	        return null;
	      }

	      if (child.type.__TableColumn__) {
	        child = _this2._transformColumn(child, tableProps, i);
	      }

	      if (child.type.__TableColumnGroup__) {
	        // Since we apparently give an array of labels to groupHeaderRenderer
	        var labels = [];
	        ReactChildren.forEach(_this2.props.children, function (child) {
	          labels.push(child.props.label);
	        });

	        child = _this2._transformColumnGroup(child, tableProps, i, labels);
	      }

	      i++;
	      return child;
	    });
	  },

	  render: function render() {
	    var props = this.props;
	    return React.createElement(
	      Table,
	      _extends({}, props, {
	        onRowMouseDown: this._onRowAction(props, props.onRowMouseDown),
	        onRowClick: this._onRowAction(props, props.onRowClick),
	        onRowDoubleClick: this._onRowAction(props, props.onRowDoubleClick),
	        onRowMouseEnter: this._onRowAction(props, props.onRowMouseEnter),
	        onRowMouseLeave: this._onRowAction(props, props.onRowMouseLeave)
	      }),
	      this._convertedColumns(this.state.needsMigration)
	    );
	  }
	});

	module.exports = TransitionTable;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	module.exports = __webpack_require__(28);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(28);
	var factory = __webpack_require__(30);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(32);

	var emptyObject = __webpack_require__(33);
	var _invariant = __webpack_require__(34);

	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(35);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
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

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(36);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(38)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(41)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(36);
	var invariant = __webpack_require__(34);
	var warning = __webpack_require__(35);
	var assign = __webpack_require__(32);

	var ReactPropTypesSecret = __webpack_require__(39);
	var checkPropTypes = __webpack_require__(40);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(34);
	  var warning = __webpack_require__(35);
	  var ReactPropTypesSecret = __webpack_require__(39);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(36);
	var invariant = __webpack_require__(34);
	var ReactPropTypesSecret = __webpack_require__(39);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableNew.react
	 * @typechecks
	 * @noflow
	 */

	/*eslint no-bitwise:1*/

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var ReactComponentWithPureRenderMixin = __webpack_require__(43);
	var ReactWheelHandler = __webpack_require__(44);
	var Scrollbar = __webpack_require__(52);
	var FixedDataTableBufferedRows = __webpack_require__(66);
	var FixedDataTableColumnResizeHandle = __webpack_require__(80);
	var FixedDataTableRow = __webpack_require__(71);
	var FixedDataTableScrollHelper = __webpack_require__(81);
	var FixedDataTableWidthHelper = __webpack_require__(83);

	var cx = __webpack_require__(60);
	var debounceCore = __webpack_require__(84);
	var emptyFunction = __webpack_require__(45);
	var invariant = __webpack_require__(65);
	var joinClasses = __webpack_require__(79);
	var shallowEqual = __webpack_require__(85);
	var translateDOMPositionXY = __webpack_require__(61);

	var PropTypes = __webpack_require__(37);
	var ReactChildren = React.Children;

	var EMPTY_OBJECT = {};
	var BORDER_HEIGHT = 1;
	var HEADER = 'header';
	var FOOTER = 'footer';
	var CELL = 'cell';

	/**
	 * Data grid component with fixed or scrollable header and columns.
	 *
	 * The layout of the data table is as follows:
	 *
	 * ```
	 * +---------------------------------------------------+
	 * | Fixed Column Group    | Scrollable Column Group   |
	 * | Header                | Header                    |
	 * |                       |                           |
	 * +---------------------------------------------------+
	 * |                       |                           |
	 * | Fixed Header Columns  | Scrollable Header Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Body Columns    | Scrollable Body Columns   |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Footer Columns  | Scrollable Footer Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * ```
	 *
	 * - Fixed Column Group Header: These are the headers for a group
	 *   of columns if included in the table that do not scroll
	 *   vertically or horizontally.
	 *
	 * - Scrollable Column Group Header: The header for a group of columns
	 *   that do not move while scrolling vertically, but move horizontally
	 *   with the horizontal scrolling.
	 *
	 * - Fixed Header Columns: The header columns that do not move while scrolling
	 *   vertically or horizontally.
	 *
	 * - Scrollable Header Columns: The header columns that do not move
	 *   while scrolling vertically, but move horizontally with the horizontal
	 *   scrolling.
	 *
	 * - Fixed Body Columns: The body columns that do not move while scrolling
	 *   horizontally, but move vertically with the vertical scrolling.
	 *
	 * - Scrollable Body Columns: The body columns that move while scrolling
	 *   vertically or horizontally.
	 */
	var FixedDataTable = createReactClass({

	  propTypes: {

	    /**
	     * Pixel width of table. If all columns do not fit,
	     * a horizontal scrollbar will appear.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    height: PropTypes.number,

	    /**
	     * Maximum pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    maxHeight: PropTypes.number,

	    /**
	     * Pixel height of table's owner, this is used in a managed scrolling
	     * situation when you want to slide the table up from below the fold
	     * without having to constantly update the height on every scroll tick.
	     * Instead, vary this property on scroll. By using `ownerHeight`, we
	     * over-render the table while making sure the footer and horizontal
	     * scrollbar of the table are visible when the current space for the table
	     * in view is smaller than the final, over-flowing height of table. It
	     * allows us to avoid resizing and reflowing table when it is moving in the
	     * view.
	     *
	     * This is used if `ownerHeight < height` (or `maxHeight`).
	     */
	    ownerHeight: PropTypes.number,

	    overflowX: PropTypes.oneOf(['hidden', 'auto']),
	    overflowY: PropTypes.oneOf(['hidden', 'auto']),

	    /**
	     * Number of rows in the table.
	     */
	    rowsCount: PropTypes.number.isRequired,

	    /**
	     * Pixel height of rows unless `rowHeightGetter` is specified and returns
	     * different value.
	     */
	    rowHeight: PropTypes.number.isRequired,

	    /**
	     * If specified, `rowHeightGetter(index)` is called for each row and the
	     * returned value overrides `rowHeight` for particular row.
	     */
	    rowHeightGetter: PropTypes.func,

	    /**
	     * To get any additional CSS classes that should be added to a row,
	     * `rowClassNameGetter(index)` is called.
	     */
	    rowClassNameGetter: PropTypes.func,

	    /**
	     * Pixel height of the column group header.
	     */
	    groupHeaderHeight: PropTypes.number,

	    /**
	     * Pixel height of header.
	     */
	    headerHeight: PropTypes.number.isRequired,

	    /**
	     * Pixel height of footer.
	     */
	    footerHeight: PropTypes.number,

	    /**
	     * Value of horizontal scroll.
	     */
	    scrollLeft: PropTypes.number,

	    /**
	     * Index of column to scroll to.
	     */
	    scrollToColumn: PropTypes.number,

	    /**
	     * Value of vertical scroll.
	     */
	    scrollTop: PropTypes.number,

	    /**
	     * Index of row to scroll to.
	     */
	    scrollToRow: PropTypes.number,

	    /**
	     * Callback that is called when scrolling starts with current horizontal
	     * and vertical scroll values.
	     */
	    onScrollStart: PropTypes.func,

	    /**
	     * Callback that is called when scrolling ends or stops with new horizontal
	     * and vertical scroll values.
	     */
	    onScrollEnd: PropTypes.func,

	    /**
	     * Callback that is called when `rowHeightGetter` returns a different height
	     * for a row than the `rowHeight` prop. This is necessary because initially
	     * table estimates heights of some parts of the content.
	     */
	    onContentHeightChange: PropTypes.func,

	    /**
	     * Callback that is called when a row is clicked.
	     */
	    onRowClick: PropTypes.func,

	    /**
	     * Callback that is called when a row is double clicked.
	     */
	    onRowDoubleClick: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-down event happens on a row.
	     */
	    onRowMouseDown: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-enter event happens on a row.
	     */
	    onRowMouseEnter: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-leave event happens on a row.
	     */
	    onRowMouseLeave: PropTypes.func,

	    /**
	     * Callback that is called when resizer has been released
	     * and column needs to be updated.
	     *
	     * Required if the isResizable property is true on any column.
	     *
	     * ```
	     * function(
	     *   newColumnWidth: number,
	     *   columnKey: string,
	     * )
	     * ```
	     */
	    onColumnResizeEndCallback: PropTypes.func,

	    /**
	     * Whether a column is currently being resized.
	     */
	    isColumnResizing: PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      footerHeight: 0,
	      groupHeaderHeight: 0,
	      headerHeight: 0,
	      scrollLeft: 0,
	      scrollTop: 0
	    };
	  },

	  getInitialState: function getInitialState() /*object*/{
	    var props = this.props;
	    var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
	    this._scrollHelper = new FixedDataTableScrollHelper(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter);
	    if (props.scrollTop) {
	      this._scrollHelper.scrollTo(props.scrollTop);
	    }
	    this._didScrollStop = debounceCore(this._didScrollStop, 200, this);

	    return this._calculateState(this.props);
	  },

	  componentWillMount: function componentWillMount() {
	    var scrollToRow = this.props.scrollToRow;
	    if (scrollToRow !== undefined && scrollToRow !== null) {
	      this._rowToScrollTo = scrollToRow;
	    }
	    var scrollToColumn = this.props.scrollToColumn;
	    if (scrollToColumn !== undefined && scrollToColumn !== null) {
	      this._columnToScrollTo = scrollToColumn;
	    }
	    this._wheelHandler = new ReactWheelHandler(this._onWheel, this._shouldHandleWheelX, this._shouldHandleWheelY);
	  },

	  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
	    if (this.props.overflowX === 'hidden') {
	      return false;
	    }

	    delta = Math.round(delta);
	    if (delta === 0) {
	      return false;
	    }

	    return delta < 0 && this.state.scrollX > 0 || delta >= 0 && this.state.scrollX < this.state.maxScrollX;
	  },

	  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
	    if (this.props.overflowY === 'hidden' || delta === 0) {
	      return false;
	    }

	    delta = Math.round(delta);
	    if (delta === 0) {
	      return false;
	    }

	    return delta < 0 && this.state.scrollY > 0 || delta >= 0 && this.state.scrollY < this.state.maxScrollY;
	  },

	  _reportContentHeight: function _reportContentHeight() {
	    var scrollContentHeight = this.state.scrollContentHeight;
	    var reservedHeight = this.state.reservedHeight;
	    var requiredHeight = scrollContentHeight + reservedHeight;
	    var contentHeight;
	    var useMaxHeight = this.props.height === undefined;
	    if (useMaxHeight && this.props.maxHeight > requiredHeight) {
	      contentHeight = requiredHeight;
	    } else if (this.state.height > requiredHeight && this.props.ownerHeight) {
	      contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
	    } else {
	      contentHeight = this.state.height + this.state.maxScrollY;
	    }
	    if (contentHeight !== this._contentHeight && this.props.onContentHeightChange) {
	      this.props.onContentHeightChange(contentHeight);
	    }
	    this._contentHeight = contentHeight;
	  },

	  componentDidMount: function componentDidMount() {
	    this._reportContentHeight();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    var scrollToRow = nextProps.scrollToRow;
	    if (scrollToRow !== undefined && scrollToRow !== null) {
	      this._rowToScrollTo = scrollToRow;
	    }
	    var scrollToColumn = nextProps.scrollToColumn;
	    if (scrollToColumn !== undefined && scrollToColumn !== null) {
	      this._columnToScrollTo = scrollToColumn;
	    }

	    var newOverflowX = nextProps.overflowX;
	    var newOverflowY = nextProps.overflowY;
	    if (newOverflowX !== this.props.overflowX || newOverflowY !== this.props.overflowY) {
	      this._wheelHandler = new ReactWheelHandler(this._onWheel, newOverflowX !== 'hidden', // Should handle horizontal scroll
	      newOverflowY !== 'hidden' // Should handle vertical scroll
	      );
	    }

	    // In the case of controlled scrolling, notify.
	    if (this.props.ownerHeight !== nextProps.ownerHeight || this.props.scrollTop !== nextProps.scrollTop) {
	      this._didScrollStart();
	    }
	    this._didScrollStop();

	    this.setState(this._calculateState(nextProps, this.state));
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._reportContentHeight();
	  },

	  render: function render() /*object*/{
	    var state = this.state;
	    var props = this.props;

	    var groupHeader;
	    if (state.useGroupHeader) {
	      groupHeader = React.createElement(FixedDataTableRow, {
	        key: 'group_header',
	        isScrolling: this._isScrolling,
	        className: joinClasses(cx('fixedDataTableLayout/header'), cx('public/fixedDataTable/header')),
	        width: state.width,
	        height: state.groupHeaderHeight,
	        index: 0,
	        zIndex: 1,
	        offsetTop: 0,
	        scrollLeft: state.scrollX,
	        fixedColumns: state.groupHeaderFixedColumns,
	        scrollableColumns: state.groupHeaderScrollableColumns,
	        onColumnResize: this._onColumnResize
	      });
	    }

	    var maxScrollY = this.state.maxScrollY;
	    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden';
	    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden';
	    var scrollbarXHeight = showScrollbarX ? Scrollbar.SIZE : 0;
	    var scrollbarYHeight = state.height - scrollbarXHeight - 2 * BORDER_HEIGHT - state.footerHeight;

	    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
	    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
	    scrollbarYHeight -= bodyOffsetTop;
	    var bottomSectionOffset = 0;
	    var footOffsetTop = props.maxHeight != null ? bodyOffsetTop + state.bodyHeight : bodyOffsetTop + scrollbarYHeight;
	    var rowsContainerHeight = footOffsetTop + state.footerHeight;

	    if (props.ownerHeight !== undefined && props.ownerHeight < state.height) {
	      bottomSectionOffset = props.ownerHeight - state.height;

	      footOffsetTop = Math.min(footOffsetTop, props.ownerHeight - state.footerHeight - scrollbarXHeight);

	      scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
	    }

	    var verticalScrollbar;
	    if (showScrollbarY) {
	      verticalScrollbar = React.createElement(Scrollbar, {
	        size: scrollbarYHeight,
	        contentSize: scrollbarYHeight + maxScrollY,
	        onScroll: this._onVerticalScroll,
	        verticalTop: bodyOffsetTop,
	        position: state.scrollY
	      });
	    }

	    var horizontalScrollbar;
	    if (showScrollbarX) {
	      var scrollbarXWidth = state.width;
	      horizontalScrollbar = React.createElement(HorizontalScrollbar, {
	        contentSize: scrollbarXWidth + state.maxScrollX,
	        offset: bottomSectionOffset,
	        onScroll: this._onHorizontalScroll,
	        position: state.scrollX,
	        size: scrollbarXWidth
	      });
	    }

	    var dragKnob = React.createElement(FixedDataTableColumnResizeHandle, {
	      height: state.height,
	      initialWidth: state.columnResizingData.width || 0,
	      minWidth: state.columnResizingData.minWidth || 0,
	      maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE,
	      visible: !!state.isColumnResizing,
	      leftOffset: state.columnResizingData.left || 0,
	      knobHeight: state.headerHeight,
	      initialEvent: state.columnResizingData.initialEvent,
	      onColumnResizeEnd: props.onColumnResizeEndCallback,
	      columnKey: state.columnResizingData.key
	    });

	    var footer = null;
	    if (state.footerHeight) {
	      footer = React.createElement(FixedDataTableRow, {
	        key: 'footer',
	        isScrolling: this._isScrolling,
	        className: joinClasses(cx('fixedDataTableLayout/footer'), cx('public/fixedDataTable/footer')),
	        width: state.width,
	        height: state.footerHeight,
	        index: -1,
	        zIndex: 1,
	        offsetTop: footOffsetTop,
	        fixedColumns: state.footFixedColumns,
	        scrollableColumns: state.footScrollableColumns,
	        scrollLeft: state.scrollX
	      });
	    }

	    var rows = this._renderRows(bodyOffsetTop);

	    var header = React.createElement(FixedDataTableRow, {
	      key: 'header',
	      isScrolling: this._isScrolling,
	      className: joinClasses(cx('fixedDataTableLayout/header'), cx('public/fixedDataTable/header')),
	      width: state.width,
	      height: state.headerHeight,
	      index: -1,
	      zIndex: 1,
	      offsetTop: headerOffsetTop,
	      scrollLeft: state.scrollX,
	      fixedColumns: state.headFixedColumns,
	      scrollableColumns: state.headScrollableColumns,
	      onColumnResize: this._onColumnResize
	    });

	    var topShadow;
	    var bottomShadow;
	    if (state.scrollY) {
	      topShadow = React.createElement('div', {
	        className: joinClasses(cx('fixedDataTableLayout/topShadow'), cx('public/fixedDataTable/topShadow')),
	        style: { top: bodyOffsetTop }
	      });
	    }

	    if (state.ownerHeight != null && state.ownerHeight < state.height && state.scrollContentHeight + state.reservedHeight > state.ownerHeight || state.scrollY < maxScrollY) {
	      bottomShadow = React.createElement('div', {
	        className: joinClasses(cx('fixedDataTableLayout/bottomShadow'), cx('public/fixedDataTable/bottomShadow')),
	        style: { top: footOffsetTop }
	      });
	    }

	    return React.createElement(
	      'div',
	      {
	        className: joinClasses(cx('fixedDataTableLayout/main'), cx('public/fixedDataTable/main')),
	        onWheel: this._wheelHandler.onWheel,
	        style: { height: state.height, width: state.width } },
	      React.createElement(
	        'div',
	        {
	          className: cx('fixedDataTableLayout/rowsContainer'),
	          style: { height: rowsContainerHeight, width: state.width } },
	        dragKnob,
	        groupHeader,
	        header,
	        rows,
	        footer,
	        topShadow,
	        bottomShadow
	      ),
	      verticalScrollbar,
	      horizontalScrollbar
	    );
	  },

	  _renderRows: function _renderRows( /*number*/offsetTop) /*object*/{
	    var state = this.state;

	    return React.createElement(FixedDataTableBufferedRows, {
	      isScrolling: this._isScrolling,
	      defaultRowHeight: state.rowHeight,
	      firstRowIndex: state.firstRowIndex,
	      firstRowOffset: state.firstRowOffset,
	      fixedColumns: state.bodyFixedColumns,
	      height: state.bodyHeight,
	      offsetTop: offsetTop,
	      onRowClick: state.onRowClick,
	      onRowDoubleClick: state.onRowDoubleClick,
	      onRowMouseDown: state.onRowMouseDown,
	      onRowMouseEnter: state.onRowMouseEnter,
	      onRowMouseLeave: state.onRowMouseLeave,
	      rowClassNameGetter: state.rowClassNameGetter,
	      rowsCount: state.rowsCount,
	      rowGetter: state.rowGetter,
	      rowHeightGetter: state.rowHeightGetter,
	      scrollLeft: state.scrollX,
	      scrollableColumns: state.bodyScrollableColumns,
	      showLastRowBorder: true,
	      width: state.width,
	      rowPositionGetter: this._scrollHelper.getRowPosition
	    });
	  },

	  /**
	   * This is called when a cell that is in the header of a column has its
	   * resizer knob clicked on. It displays the resizer and puts in the correct
	   * location on the table.
	   */
	  _onColumnResize: function _onColumnResize(
	  /*number*/combinedWidth,
	  /*number*/leftOffset,
	  /*number*/cellWidth,
	  /*?number*/cellMinWidth,
	  /*?number*/cellMaxWidth,
	  /*number|string*/columnKey,
	  /*object*/event) {
	    this.setState({
	      isColumnResizing: true,
	      columnResizingData: {
	        left: leftOffset + combinedWidth - cellWidth,
	        width: cellWidth,
	        minWidth: cellMinWidth,
	        maxWidth: cellMaxWidth,
	        initialEvent: {
	          clientX: event.clientX,
	          clientY: event.clientY,
	          preventDefault: emptyFunction
	        },
	        key: columnKey
	      }
	    });
	  },

	  _areColumnSettingsIdentical: function _areColumnSettingsIdentical(oldColumns, newColumns) {
	    if (oldColumns.length !== newColumns.length) {
	      return false;
	    }
	    for (var index = 0; index < oldColumns.length; ++index) {
	      if (!shallowEqual(oldColumns[index].props, newColumns[index].props)) {
	        return false;
	      }
	    }
	    return true;
	  },

	  _populateColumnsAndColumnData: function _populateColumnsAndColumnData(columns, columnGroups, oldState) {
	    var canReuseColumnSettings = false;
	    var canReuseColumnGroupSettings = false;

	    if (oldState && oldState.columns) {
	      canReuseColumnSettings = this._areColumnSettingsIdentical(columns, oldState.columns);
	    }
	    if (oldState && oldState.columnGroups && columnGroups) {
	      canReuseColumnGroupSettings = this._areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
	    }

	    var columnInfo = {};
	    if (canReuseColumnSettings) {
	      columnInfo.bodyFixedColumns = oldState.bodyFixedColumns;
	      columnInfo.bodyScrollableColumns = oldState.bodyScrollableColumns;
	      columnInfo.headFixedColumns = oldState.headFixedColumns;
	      columnInfo.headScrollableColumns = oldState.headScrollableColumns;
	      columnInfo.footFixedColumns = oldState.footFixedColumns;
	      columnInfo.footScrollableColumns = oldState.footScrollableColumns;
	    } else {
	      var bodyColumnTypes = this._splitColumnTypes(columns);
	      columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
	      columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

	      var headColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columns));
	      columnInfo.headFixedColumns = headColumnTypes.fixed;
	      columnInfo.headScrollableColumns = headColumnTypes.scrollable;

	      var footColumnTypes = this._splitColumnTypes(this._selectColumnElement(FOOTER, columns));
	      columnInfo.footFixedColumns = footColumnTypes.fixed;
	      columnInfo.footScrollableColumns = footColumnTypes.scrollable;
	    }

	    if (canReuseColumnGroupSettings) {
	      columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
	      columnInfo.groupHeaderScrollableColumns = oldState.groupHeaderScrollableColumns;
	    } else {
	      if (columnGroups) {
	        var groupHeaderColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columnGroups));
	        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
	        columnInfo.groupHeaderScrollableColumns = groupHeaderColumnTypes.scrollable;
	      }
	    }

	    return columnInfo;
	  },

	  _calculateState: function _calculateState( /*object*/props, /*?object*/oldState) /*object*/{
	    invariant(props.height !== undefined || props.maxHeight !== undefined, 'You must set either a height or a maxHeight');

	    var children = [];
	    ReactChildren.forEach(props.children, function (child, index) {
	      if (child == null) {
	        return;
	      }
	      invariant(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or ' + '<FixedDataTableColumnGroup />');
	      children.push(child);
	    });

	    var useGroupHeader = false;
	    if (children.length && children[0].type.__TableColumnGroup__) {
	      useGroupHeader = true;
	    }

	    var firstRowIndex = oldState && oldState.firstRowIndex || 0;
	    var firstRowOffset = oldState && oldState.firstRowOffset || 0;
	    var scrollX, scrollY;
	    if (oldState && props.overflowX !== 'hidden') {
	      scrollX = oldState.scrollX;
	    } else {
	      scrollX = props.scrollLeft;
	    }
	    if (oldState && props.overflowY !== 'hidden') {
	      scrollY = oldState.scrollY;
	    } else {
	      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    }

	    if (this._rowToScrollTo !== undefined) {
	      scrollState = this._scrollHelper.scrollRowIntoView(this._rowToScrollTo);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	      delete this._rowToScrollTo;
	    }

	    var groupHeaderHeight = useGroupHeader ? props.groupHeaderHeight : 0;

	    if (oldState && props.rowsCount !== oldState.rowsCount) {
	      // Number of rows changed, try to scroll to the row from before the
	      // change
	      var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
	      this._scrollHelper = new FixedDataTableScrollHelper(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter);
	      var scrollState = this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    } else if (oldState && props.rowHeightGetter !== oldState.rowHeightGetter) {
	      this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
	    }

	    var columnResizingData;
	    if (props.isColumnResizing) {
	      columnResizingData = oldState && oldState.columnResizingData;
	    } else {
	      columnResizingData = EMPTY_OBJECT;
	    }

	    var columns;
	    var columnGroups;

	    if (useGroupHeader) {
	      var columnGroupSettings = FixedDataTableWidthHelper.adjustColumnGroupWidths(children, props.width);
	      columns = columnGroupSettings.columns;
	      columnGroups = columnGroupSettings.columnGroups;
	    } else {
	      columns = FixedDataTableWidthHelper.adjustColumnWidths(children, props.width);
	    }

	    var columnInfo = this._populateColumnsAndColumnData(columns, columnGroups, oldState);

	    if (this._columnToScrollTo !== undefined) {
	      // If selected column is a fixed column, don't scroll
	      var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
	      if (this._columnToScrollTo >= fixedColumnsCount) {
	        var totalFixedColumnsWidth = 0;
	        var i, column;
	        for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
	          column = columnInfo.bodyFixedColumns[i];
	          totalFixedColumnsWidth += column.props.width;
	        }

	        var scrollableColumnIndex = Math.min(this._columnToScrollTo - fixedColumnsCount, columnInfo.bodyScrollableColumns.length - 1);

	        var previousColumnsWidth = 0;
	        for (i = 0; i < scrollableColumnIndex; ++i) {
	          column = columnInfo.bodyScrollableColumns[i];
	          previousColumnsWidth += column.props.width;
	        }

	        var availableScrollWidth = props.width - totalFixedColumnsWidth;
	        var selectedColumnWidth = columnInfo.bodyScrollableColumns[scrollableColumnIndex].props.width;
	        var minAcceptableScrollPosition = previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

	        if (scrollX < minAcceptableScrollPosition) {
	          scrollX = minAcceptableScrollPosition;
	        }

	        if (scrollX > previousColumnsWidth) {
	          scrollX = previousColumnsWidth;
	        }
	      }
	      delete this._columnToScrollTo;
	    }

	    var useMaxHeight = props.height === undefined;
	    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
	    var totalHeightReserved = props.footerHeight + props.headerHeight + groupHeaderHeight + 2 * BORDER_HEIGHT;
	    var bodyHeight = height - totalHeightReserved;
	    var scrollContentHeight = this._scrollHelper.getContentHeight();
	    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
	    var scrollContentWidth = FixedDataTableWidthHelper.getTotalWidth(columns);

	    var horizontalScrollbarVisible = scrollContentWidth > props.width && props.overflowX !== 'hidden';

	    if (horizontalScrollbarVisible) {
	      bodyHeight -= Scrollbar.SIZE;
	      totalHeightNeeded += Scrollbar.SIZE;
	      totalHeightReserved += Scrollbar.SIZE;
	    }

	    var maxScrollX = Math.max(0, scrollContentWidth - props.width);
	    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
	    scrollX = Math.min(scrollX, maxScrollX);
	    scrollY = Math.min(scrollY, maxScrollY);

	    if (!maxScrollY) {
	      // no vertical scrollbar necessary, use the totals we tracked so we
	      // can shrink-to-fit vertically
	      if (useMaxHeight) {
	        height = totalHeightNeeded;
	      }
	      bodyHeight = totalHeightNeeded - totalHeightReserved;
	    }

	    this._scrollHelper.setViewportHeight(bodyHeight);

	    // The order of elements in this object metters and bringing bodyHeight,
	    // height or useGroupHeader to the top can break various features
	    var newState = _extends({
	      isColumnResizing: oldState && oldState.isColumnResizing
	    }, columnInfo, props, {

	      columns: columns,
	      columnGroups: columnGroups,
	      columnResizingData: columnResizingData,
	      firstRowIndex: firstRowIndex,
	      firstRowOffset: firstRowOffset,
	      horizontalScrollbarVisible: horizontalScrollbarVisible,
	      maxScrollX: maxScrollX,
	      maxScrollY: maxScrollY,
	      reservedHeight: totalHeightReserved,
	      scrollContentHeight: scrollContentHeight,
	      scrollX: scrollX,
	      scrollY: scrollY,

	      // These properties may overwrite properties defined in
	      // columnInfo and props
	      bodyHeight: bodyHeight,
	      height: height,
	      groupHeaderHeight: groupHeaderHeight,
	      useGroupHeader: useGroupHeader
	    });

	    return newState;
	  },

	  _selectColumnElement: function _selectColumnElement( /*string*/type, /*array*/columns) /*array*/{
	    var newColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      var column = columns[i];
	      newColumns.push(React.cloneElement(column, {
	        cell: type ? column.props[type] : column.props[CELL]
	      }));
	    }
	    return newColumns;
	  },

	  _splitColumnTypes: function _splitColumnTypes( /*array*/columns) /*object*/{
	    var fixedColumns = [];
	    var scrollableColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      if (columns[i].props.fixed) {
	        fixedColumns.push(columns[i]);
	      } else {
	        scrollableColumns.push(columns[i]);
	      }
	    }
	    return {
	      fixed: fixedColumns,
	      scrollable: scrollableColumns
	    };
	  },

	  _onWheel: function _onWheel( /*number*/deltaX, /*number*/deltaY) {
	    if (this.isMounted()) {
	      if (!this._isScrolling) {
	        this._didScrollStart();
	      }
	      var x = this.state.scrollX;
	      if (Math.abs(deltaY) > Math.abs(deltaX) && this.props.overflowY !== 'hidden') {
	        var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
	        var maxScrollY = Math.max(0, scrollState.contentHeight - this.state.bodyHeight);
	        this.setState({
	          firstRowIndex: scrollState.index,
	          firstRowOffset: scrollState.offset,
	          scrollY: scrollState.position,
	          scrollContentHeight: scrollState.contentHeight,
	          maxScrollY: maxScrollY
	        });
	      } else if (deltaX && this.props.overflowX !== 'hidden') {
	        x += deltaX;
	        x = x < 0 ? 0 : x;
	        x = x > this.state.maxScrollX ? this.state.maxScrollX : x;
	        this.setState({
	          scrollX: x
	        });
	      }

	      this._didScrollStop();
	    }
	  },

	  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
	    if (this.isMounted() && scrollPos !== this.state.scrollX) {
	      if (!this._isScrolling) {
	        this._didScrollStart();
	      }
	      this.setState({
	        scrollX: scrollPos
	      });
	      this._didScrollStop();
	    }
	  },

	  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
	    if (this.isMounted() && scrollPos !== this.state.scrollY) {
	      if (!this._isScrolling) {
	        this._didScrollStart();
	      }
	      var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));
	      this.setState({
	        firstRowIndex: scrollState.index,
	        firstRowOffset: scrollState.offset,
	        scrollY: scrollState.position,
	        scrollContentHeight: scrollState.contentHeight
	      });
	      this._didScrollStop();
	    }
	  },

	  _didScrollStart: function _didScrollStart() {
	    if (this.isMounted() && !this._isScrolling) {
	      this._isScrolling = true;
	      if (this.props.onScrollStart) {
	        this.props.onScrollStart(this.state.scrollX, this.state.scrollY);
	      }
	    }
	  },

	  _didScrollStop: function _didScrollStop() {
	    if (this.isMounted() && this._isScrolling) {
	      this._isScrolling = false;
	      this.setState({ redraw: true });
	      if (this.props.onScrollEnd) {
	        this.props.onScrollEnd(this.state.scrollX, this.state.scrollY);
	      }
	    }
	  }
	});

	var HorizontalScrollbar = createReactClass({
	  mixins: [ReactComponentWithPureRenderMixin],
	  propTypes: {
	    contentSize: PropTypes.number.isRequired,
	    offset: PropTypes.number.isRequired,
	    onScroll: PropTypes.func.isRequired,
	    position: PropTypes.number.isRequired,
	    size: PropTypes.number.isRequired
	  },

	  render: function render() /*object*/{
	    var outerContainerStyle = {
	      height: Scrollbar.SIZE,
	      width: this.props.size
	    };
	    var innerContainerStyle = {
	      height: Scrollbar.SIZE,
	      position: 'absolute',
	      overflow: 'hidden',
	      width: this.props.size
	    };
	    translateDOMPositionXY(innerContainerStyle, 0, this.props.offset);

	    return React.createElement(
	      'div',
	      {
	        className: joinClasses(cx('fixedDataTableLayout/horizontalScrollbar'), cx('public/fixedDataTable/horizontalScrollbar')),
	        style: outerContainerStyle },
	      React.createElement(
	        'div',
	        { style: innerContainerStyle },
	        React.createElement(Scrollbar, _extends({}, this.props, {
	          isOpaque: true,
	          orientation: 'horizontal',
	          offset: undefined
	        }))
	      )
	    );
	  }
	});

	module.exports = FixedDataTable;
	// isColumnResizing should be overwritten by value from props if
	// avaialble

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */

	'use strict';

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is utility that hanlds onWheel events and calls provided wheel
	 * callback with correct frame rate.
	 *
	 * @providesModule ReactWheelHandler
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var emptyFunction = __webpack_require__(45);
	var normalizeWheel = __webpack_require__(46);
	var requestAnimationFramePolyfill = __webpack_require__(50);

	var ReactWheelHandler = (function () {
	  /**
	   * onWheel is the callback that will be called with right frame rate if
	   * any wheel events happened
	   * onWheel should is to be called with two arguments: deltaX and deltaY in
	   * this order
	   */

	  function ReactWheelHandler(
	  /*function*/onWheel,
	  /*boolean|function*/handleScrollX,
	  /*boolean|function*/handleScrollY,
	  /*?boolean|?function*/stopPropagation) {
	    _classCallCheck(this, ReactWheelHandler);

	    this._animationFrameID = null;
	    this._deltaX = 0;
	    this._deltaY = 0;
	    this._didWheel = this._didWheel.bind(this);
	    if (typeof handleScrollX !== 'function') {
	      handleScrollX = handleScrollX ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
	    }

	    if (typeof handleScrollY !== 'function') {
	      handleScrollY = handleScrollY ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
	    }

	    if (typeof stopPropagation !== 'function') {
	      stopPropagation = stopPropagation ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
	    }

	    this._handleScrollX = handleScrollX;
	    this._handleScrollY = handleScrollY;
	    this._stopPropagation = stopPropagation;
	    this._onWheelCallback = onWheel;
	    this.onWheel = this.onWheel.bind(this);
	  }

	  _createClass(ReactWheelHandler, [{
	    key: 'onWheel',
	    value: function onWheel( /*object*/event) {
	      var normalizedEvent = normalizeWheel(event);
	      var deltaX = this._deltaX + normalizedEvent.pixelX;
	      var deltaY = this._deltaY + normalizedEvent.pixelY;
	      var handleScrollX = this._handleScrollX(deltaX, deltaY);
	      var handleScrollY = this._handleScrollY(deltaY, deltaX);
	      if (!handleScrollX && !handleScrollY) {
	        return;
	      }

	      this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
	      this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
	      event.preventDefault();

	      var changed;
	      if (this._deltaX !== 0 || this._deltaY !== 0) {
	        if (this._stopPropagation()) {
	          event.stopPropagation();
	        }
	        changed = true;
	      }

	      if (changed === true && this._animationFrameID === null) {
	        this._animationFrameID = requestAnimationFramePolyfill(this._didWheel);
	      }
	    }
	  }, {
	    key: '_didWheel',
	    value: function _didWheel() {
	      this._animationFrameID = null;
	      this._onWheelCallback(this._deltaX, this._deltaY);
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }
	  }]);

	  return ReactWheelHandler;
	})();

	module.exports = ReactWheelHandler;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule normalizeWheel
	 * @typechecks
	 */

	'use strict';

	var UserAgent_DEPRECATED = __webpack_require__(47);

	var isEventSupported = __webpack_require__(48);

	// Reasonable defaults
	var PIXEL_STEP = 10;
	var LINE_HEIGHT = 40;
	var PAGE_HEIGHT = 800;

	/**
	 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
	 * complicated, thus this doc is long and (hopefully) detailed enough to answer
	 * your questions.
	 *
	 * If you need to react to the mouse wheel in a predictable way, this code is
	 * like your bestest friend. * hugs *
	 *
	 * As of today, there are 4 DOM event types you can listen to:
	 *
	 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
	 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
	 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
	 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
	 *
	 * So what to do?  The is the best:
	 *
	 *   normalizeWheel.getEventType();
	 *
	 * In your event callback, use this code to get sane interpretation of the
	 * deltas.  This code will return an object with properties:
	 *
	 *   spinX   -- normalized spin speed (use for zoom) - x plane
	 *   spinY   -- " - y plane
	 *   pixelX  -- normalized distance (to pixels) - x plane
	 *   pixelY  -- " - y plane
	 *
	 * Wheel values are provided by the browser assuming you are using the wheel to
	 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
	 * significantly on different platforms and browsers, forgetting that you can
	 * scroll at different speeds.  Some devices (like trackpads) emit more events
	 * at smaller increments with fine granularity, and some emit massive jumps with
	 * linear speed or acceleration.
	 *
	 * This code does its best to normalize the deltas for you:
	 *
	 *   - spin is trying to normalize how far the wheel was spun (or trackpad
	 *     dragged).  This is super useful for zoom support where you want to
	 *     throw away the chunky scroll steps on the PC and make those equal to
	 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
	 *     resolve a single slow step on a wheel to 1.
	 *
	 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
	 *     get the crazy differences between browsers, but at least it'll be in
	 *     pixels!
	 *
	 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
	 *     should translate to positive value zooming IN, negative zooming OUT.
	 *     This matches the newer 'wheel' event.
	 *
	 * Why are there spinX, spinY (or pixels)?
	 *
	 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
	 *     with a mouse.  It results in side-scrolling in the browser by default.
	 *
	 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
	 *
	 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
	 *     probably is by browsers in conjunction with fancy 3D controllers .. but
	 *     you know.
	 *
	 * Implementation info:
	 *
	 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
	 * average mouse:
	 *
	 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
	 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
	 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
	 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
	 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
	 *
	 * On the trackpad:
	 *
	 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
	 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
	 *
	 * On other/older browsers.. it's more complicated as there can be multiple and
	 * also missing delta values.
	 *
	 * The 'wheel' event is more standard:
	 *
	 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
	 *
	 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
	 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
	 * backward compatibility with older events.  Those other values help us
	 * better normalize spin speed.  Example of what the browsers provide:
	 *
	 *                          | event.wheelDelta | event.detail
	 *        ------------------+------------------+--------------
	 *          Safari v5/OS X  |       -120       |       0
	 *          Safari v5/Win7  |       -120       |       0
	 *         Chrome v17/OS X  |       -120       |       0
	 *         Chrome v17/Win7  |       -120       |       0
	 *                IE9/Win7  |       -120       |   undefined
	 *         Firefox v4/OS X  |     undefined    |       1
	 *         Firefox v4/Win7  |     undefined    |       3
	 *
	 */
	function normalizeWheel( /*object*/event) /*object*/{
	  var sX = 0,
	      sY = 0,
	      // spinX, spinY
	  pX = 0,
	      pY = 0; // pixelX, pixelY

	  // Legacy
	  if ('detail' in event) {
	    sY = event.detail;
	  }
	  if ('wheelDelta' in event) {
	    sY = -event.wheelDelta / 120;
	  }
	  if ('wheelDeltaY' in event) {
	    sY = -event.wheelDeltaY / 120;
	  }
	  if ('wheelDeltaX' in event) {
	    sX = -event.wheelDeltaX / 120;
	  }

	  // side scrolling on FF with DOMMouseScroll
	  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
	    sX = sY;
	    sY = 0;
	  }

	  pX = sX * PIXEL_STEP;
	  pY = sY * PIXEL_STEP;

	  if ('deltaY' in event) {
	    pY = event.deltaY;
	  }
	  if ('deltaX' in event) {
	    pX = event.deltaX;
	  }

	  if ((pX || pY) && event.deltaMode) {
	    if (event.deltaMode == 1) {
	      // delta in LINE units
	      pX *= LINE_HEIGHT;
	      pY *= LINE_HEIGHT;
	    } else {
	      // delta in PAGE units
	      pX *= PAGE_HEIGHT;
	      pY *= PAGE_HEIGHT;
	    }
	  }

	  // Fall-back if spin cannot be determined
	  if (pX && !sX) {
	    sX = pX < 1 ? -1 : 1;
	  }
	  if (pY && !sY) {
	    sY = pY < 1 ? -1 : 1;
	  }

	  return { spinX: sX,
	    spinY: sY,
	    pixelX: pX,
	    pixelY: pY };
	}

	/**
	 * The best combination if you prefer spinX + spinY normalization.  It favors
	 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
	 * 'wheel' event, making spin speed determination impossible.
	 */
	normalizeWheel.getEventType = function () /*string*/{
	  return UserAgent_DEPRECATED.firefox() ? 'DOMMouseScroll' : isEventSupported('wheel') ? 'wheel' : 'mousewheel';
	};

	module.exports = normalizeWheel;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2004-present Facebook. All Rights Reserved.
	 *
	 * @providesModule UserAgent_DEPRECATED
	 */

	/**
	 *  Provides entirely client-side User Agent and OS detection. You should prefer
	 *  the non-deprecated UserAgent module when possible, which exposes our
	 *  authoritative server-side PHP-based detection to the client.
	 *
	 *  Usage is straightforward:
	 *
	 *    if (UserAgent_DEPRECATED.ie()) {
	 *      //  IE
	 *    }
	 *
	 *  You can also do version checks:
	 *
	 *    if (UserAgent_DEPRECATED.ie() >= 7) {
	 *      //  IE7 or better
	 *    }
	 *
	 *  The browser functions will return NaN if the browser does not match, so
	 *  you can also do version compares the other way:
	 *
	 *    if (UserAgent_DEPRECATED.ie() < 7) {
	 *      //  IE6 or worse
	 *    }
	 *
	 *  Note that the version is a float and may include a minor version number,
	 *  so you should always use range operators to perform comparisons, not
	 *  strict equality.
	 *
	 *  **Note:** You should **strongly** prefer capability detection to browser
	 *  version detection where it's reasonable:
	 *
	 *    http://www.quirksmode.org/js/support.html
	 *
	 *  Further, we have a large number of mature wrapper functions and classes
	 *  which abstract away many browser irregularities. Check the documentation,
	 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
	 *  another copy of "event || window.event".
	 *
	 */

	'use strict';

	var _populated = false;

	// Browsers
	var _ie, _firefox, _opera, _webkit, _chrome;

	// Actual IE browser for compatibility mode
	var _ie_real_version;

	// Platforms
	var _osx, _windows, _linux, _android;

	// Architectures
	var _win64;

	// Devices
	var _iphone, _ipad, _native;

	var _mobile;

	function _populate() {
	  if (_populated) {
	    return;
	  }

	  _populated = true;

	  // To work around buggy JS libraries that can't handle multi-digit
	  // version numbers, Opera 10's user agent string claims it's Opera
	  // 9, then later includes a Version/X.Y field:
	  //
	  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
	  var uas = navigator.userAgent;
	  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
	  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

	  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
	  _ipad = /\b(iP[ao]d)/.exec(uas);
	  _android = /Android/i.exec(uas);
	  _native = /FBAN\/\w+;/i.exec(uas);
	  _mobile = /Mobile/i.exec(uas);

	  // Note that the IE team blog would have you believe you should be checking
	  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
	  // from either x64 or ia64;  so ultimately, you should just check for Win64
	  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
	  // Windows will send 'WOW64' instead.
	  _win64 = !!/Win64/.exec(uas);

	  if (agent) {
	    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
	    // IE compatibility mode
	    if (_ie && document && document.documentMode) {
	      _ie = document.documentMode;
	    }
	    // grab the "true" ie version from the trident token if available
	    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
	    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

	    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
	    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
	    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
	    if (_webkit) {
	      // We do not add the regexp to the above test, because it will always
	      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
	      // the userAgent string.
	      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
	      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
	    } else {
	      _chrome = NaN;
	    }
	  } else {
	    _ie = _firefox = _opera = _chrome = _webkit = NaN;
	  }

	  if (os) {
	    if (os[1]) {
	      // Detect OS X version.  If no version number matches, set _osx to true.
	      // Version examples:  10, 10_6_1, 10.7
	      // Parses version number as a float, taking only first two sets of
	      // digits.  If only one set of digits is found, returns just the major
	      // version number.
	      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

	      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
	    } else {
	      _osx = false;
	    }
	    _windows = !!os[2];
	    _linux = !!os[3];
	  } else {
	    _osx = _windows = _linux = false;
	  }
	}

	var UserAgent_DEPRECATED = {

	  /**
	   *  Check if the UA is Internet Explorer.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  ie: function ie() {
	    return _populate() || _ie;
	  },

	  /**
	   * Check if we're in Internet Explorer compatibility mode.
	   *
	   * @return bool true if in compatibility mode, false if
	   * not compatibility mode or not ie
	   */
	  ieCompatibilityMode: function ieCompatibilityMode() {
	    return _populate() || _ie_real_version > _ie;
	  },

	  /**
	   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
	   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
	   * this when we don't need it -- tracked by #601957.
	   */
	  ie64: function ie64() {
	    return UserAgent_DEPRECATED.ie() && _win64;
	  },

	  /**
	   *  Check if the UA is Firefox.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  firefox: function firefox() {
	    return _populate() || _firefox;
	  },

	  /**
	   *  Check if the UA is Opera.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  opera: function opera() {
	    return _populate() || _opera;
	  },

	  /**
	   *  Check if the UA is WebKit.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  webkit: function webkit() {
	    return _populate() || _webkit;
	  },

	  /**
	   *  For Push
	   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
	   */
	  safari: function safari() {
	    return UserAgent_DEPRECATED.webkit();
	  },

	  /**
	   *  Check if the UA is a Chrome browser.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  chrome: function chrome() {
	    return _populate() || _chrome;
	  },

	  /**
	   *  Check if the user is running Windows.
	   *
	   *  @return bool `true' if the user's OS is Windows.
	   */
	  windows: function windows() {
	    return _populate() || _windows;
	  },

	  /**
	   *  Check if the user is running Mac OS X.
	   *
	   *  @return float|bool   Returns a float if a version number is detected,
	   *                       otherwise true/false.
	   */
	  osx: function osx() {
	    return _populate() || _osx;
	  },

	  /**
	   * Check if the user is running Linux.
	   *
	   * @return bool `true' if the user's OS is some flavor of Linux.
	   */
	  linux: function linux() {
	    return _populate() || _linux;
	  },

	  /**
	   * Check if the user is running on an iPhone or iPod platform.
	   *
	   * @return bool `true' if the user is running some flavor of the
	   *    iPhone OS.
	   */
	  iphone: function iphone() {
	    return _populate() || _iphone;
	  },

	  mobile: function mobile() {
	    return _populate() || _iphone || _ipad || _android || _mobile;
	  },

	  nativeApp: function nativeApp() {
	    // webviews inside of the native apps
	    return _populate() || _native;
	  },

	  android: function android() {
	    return _populate() || _android;
	  },

	  ipad: function ipad() {
	    return _populate() || _ipad;
	  }
	};

	module.exports = UserAgent_DEPRECATED;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isEventSupported
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(49);

	var useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  useHasFeature = document.implementation && document.implementation.hasFeature &&
	  // always returns true in newer browsers as per the standard.
	  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	  document.implementation.hasFeature('', '') !== true;
	}

	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
	    return false;
	  }

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = (eventName in document);

	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  return isSupported;
	}

	module.exports = isEventSupported;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule requestAnimationFramePolyfill
	 */

	'use strict';

	var emptyFunction = __webpack_require__(45);
	var nativeRequestAnimationFrame = __webpack_require__(51);

	var lastTime = 0;

	/**
	 * Here is the native and polyfill version of requestAnimationFrame.
	 * Please don't use it directly and use requestAnimationFrame module instead.
	 */
	var requestAnimationFrame = nativeRequestAnimationFrame || function (callback) {
	  var currTime = Date.now();
	  var timeDelay = Math.max(0, 16 - (currTime - lastTime));
	  lastTime = currTime + timeDelay;
	  return global.setTimeout(function () {
	    callback(Date.now());
	  }, timeDelay);
	};

	// Works around a rare bug in Safari 6 where the first request is never invoked.
	requestAnimationFrame(emptyFunction);

	module.exports = requestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule nativeRequestAnimationFrame
	 */

	"use strict";

	var nativeRequestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame;

	module.exports = nativeRequestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Scrollbar.react
	 * @typechecks
	 */

	'use strict';

	var DOMMouseMoveTracker = __webpack_require__(53);
	var Keys = __webpack_require__(56);
	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var ReactDOM = __webpack_require__(57);
	var ReactComponentWithPureRenderMixin = __webpack_require__(43);
	var ReactWheelHandler = __webpack_require__(44);

	var cssVar = __webpack_require__(59);
	var cx = __webpack_require__(60);
	var emptyFunction = __webpack_require__(45);
	var translateDOMPositionXY = __webpack_require__(61);

	var PropTypes = __webpack_require__(37);

	var UNSCROLLABLE_STATE = {
	  position: 0,
	  scrollable: false
	};

	var FACE_MARGIN = parseInt(cssVar('scrollbar-face-margin'), 10);
	var FACE_MARGIN_2 = FACE_MARGIN * 2;
	var FACE_SIZE_MIN = 30;
	var KEYBOARD_SCROLL_AMOUNT = 40;

	var _lastScrolledScrollbar = null;

	var Scrollbar = createReactClass({
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    contentSize: PropTypes.number.isRequired,
	    defaultPosition: PropTypes.number,
	    isOpaque: PropTypes.bool,
	    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
	    onScroll: PropTypes.func,
	    position: PropTypes.number,
	    size: PropTypes.number.isRequired,
	    trackColor: PropTypes.oneOf(['gray']),
	    zIndex: PropTypes.number,
	    verticalTop: PropTypes.number
	  },

	  getInitialState: function getInitialState() /*object*/{
	    var props = this.props;
	    return this._calculateState(props.position || props.defaultPosition || 0, props.size, props.contentSize, props.orientation);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    var controlledPosition = nextProps.position;
	    if (controlledPosition === undefined) {
	      this._setNextState(this._calculateState(this.state.position, nextProps.size, nextProps.contentSize, nextProps.orientation));
	    } else {
	      this._setNextState(this._calculateState(controlledPosition, nextProps.size, nextProps.contentSize, nextProps.orientation), nextProps);
	    }
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      defaultPosition: 0,
	      isOpaque: false,
	      onScroll: emptyFunction,
	      orientation: 'vertical',
	      zIndex: 99
	    };
	  },

	  render: function render() /*?object*/{
	    if (!this.state.scrollable) {
	      return null;
	    }

	    var size = this.props.size;
	    var mainStyle;
	    var faceStyle;
	    var isHorizontal = this.state.isHorizontal;
	    var isVertical = !isHorizontal;
	    var isActive = this.state.focused || this.state.isDragging;
	    var faceSize = this.state.faceSize;
	    var isOpaque = this.props.isOpaque;
	    var verticalTop = this.props.verticalTop || 0;

	    var mainClassName = cx({
	      'ScrollbarLayout/main': true,
	      'ScrollbarLayout/mainVertical': isVertical,
	      'ScrollbarLayout/mainHorizontal': isHorizontal,
	      'public/Scrollbar/main': true,
	      'public/Scrollbar/mainOpaque': isOpaque,
	      'public/Scrollbar/mainActive': isActive
	    });

	    var faceClassName = cx({
	      'ScrollbarLayout/face': true,
	      'ScrollbarLayout/faceHorizontal': isHorizontal,
	      'ScrollbarLayout/faceVertical': isVertical,
	      'public/Scrollbar/faceActive': isActive,
	      'public/Scrollbar/face': true
	    });

	    var position = this.state.position * this.state.scale + FACE_MARGIN;

	    if (isHorizontal) {
	      mainStyle = {
	        width: size
	      };
	      faceStyle = {
	        width: faceSize - FACE_MARGIN_2
	      };
	      translateDOMPositionXY(faceStyle, position, 0);
	    } else {
	      mainStyle = {
	        top: verticalTop,
	        height: size
	      };
	      faceStyle = {
	        height: faceSize - FACE_MARGIN_2
	      };
	      translateDOMPositionXY(faceStyle, 0, position);
	    }

	    mainStyle.zIndex = this.props.zIndex;

	    if (this.props.trackColor === 'gray') {
	      mainStyle.backgroundColor = cssVar('fbui-desktop-background-light');
	    }

	    return React.createElement(
	      'div',
	      {
	        onFocus: this._onFocus,
	        onBlur: this._onBlur,
	        onKeyDown: this._onKeyDown,
	        onMouseDown: this._onMouseDown,
	        onWheel: this._wheelHandler.onWheel,
	        className: mainClassName,
	        style: mainStyle,
	        tabIndex: 0 },
	      React.createElement('div', {
	        ref: 'face',
	        className: faceClassName,
	        style: faceStyle
	      })
	    );
	  },

	  componentWillMount: function componentWillMount() {
	    var isHorizontal = this.props.orientation === 'horizontal';
	    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

	    this._wheelHandler = new ReactWheelHandler(onWheel, this._shouldHandleX, // Should hanlde horizontal scroll
	    this._shouldHandleY // Should handle vertical scroll
	    );
	  },

	  componentDidMount: function componentDidMount() {
	    this._mouseMoveTracker = new DOMMouseMoveTracker(this._onMouseMove, this._onMouseMoveEnd, document.documentElement);

	    if (this.props.position !== undefined && this.state.position !== this.props.position) {
	      this._didScroll();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    if (_lastScrolledScrollbar === this) {
	      _lastScrolledScrollbar = null;
	    }
	    delete this._mouseMoveTracker;
	  },

	  scrollBy: function scrollBy( /*number*/delta) {
	    this._onWheel(delta);
	  },

	  _shouldHandleX: function _shouldHandleX( /*number*/delta) /*boolean*/{
	    return this.props.orientation === 'horizontal' ? this._shouldHandleChange(delta) : false;
	  },

	  _shouldHandleY: function _shouldHandleY( /*number*/delta) /*boolean*/{
	    return this.props.orientation !== 'horizontal' ? this._shouldHandleChange(delta) : false;
	  },

	  _shouldHandleChange: function _shouldHandleChange( /*number*/delta) /*boolean*/{
	    var nextState = this._calculateState(this.state.position + delta, this.props.size, this.props.contentSize, this.props.orientation);
	    return nextState.position !== this.state.position;
	  },

	  _calculateState: function _calculateState(
	  /*number*/position,
	  /*number*/size,
	  /*number*/contentSize,
	  /*string*/orientation) /*object*/{
	    if (size < 1 || contentSize <= size) {
	      return UNSCROLLABLE_STATE;
	    }

	    var stateKey = position + '_' + size + '_' + contentSize + '_' + orientation;
	    if (this._stateKey === stateKey) {
	      return this._stateForKey;
	    }

	    // There are two types of positions here.
	    // 1) Phisical position: changed by mouse / keyboard
	    // 2) Logical position: changed by props.
	    // The logical position will be kept as as internal state and the `render()`
	    // function will translate it into physical position to render.

	    var isHorizontal = orientation === 'horizontal';
	    var scale = size / contentSize;
	    var faceSize = size * scale;

	    if (faceSize < FACE_SIZE_MIN) {
	      scale = (size - FACE_SIZE_MIN) / (contentSize - size);
	      faceSize = FACE_SIZE_MIN;
	    }

	    var scrollable = true;
	    var maxPosition = contentSize - size;

	    if (position < 0) {
	      position = 0;
	    } else if (position > maxPosition) {
	      position = maxPosition;
	    }

	    var isDragging = this._mouseMoveTracker ? this._mouseMoveTracker.isDragging() : false;

	    // This function should only return flat values that can be compared quiclky
	    // by `ReactComponentWithPureRenderMixin`.
	    var state = {
	      faceSize: faceSize,
	      isDragging: isDragging,
	      isHorizontal: isHorizontal,
	      position: position,
	      scale: scale,
	      scrollable: scrollable
	    };

	    // cache the state for later use.
	    this._stateKey = stateKey;
	    this._stateForKey = state;
	    return state;
	  },

	  _onWheelY: function _onWheelY( /*number*/deltaX, /*number*/deltaY) {
	    this._onWheel(deltaY);
	  },

	  _onWheelX: function _onWheelX( /*number*/deltaX, /*number*/deltaY) {
	    this._onWheel(deltaX);
	  },

	  _onWheel: function _onWheel( /*number*/delta) {
	    var props = this.props;

	    // The mouse may move faster then the animation frame does.
	    // Use `requestAnimationFrame` to avoid over-updating.
	    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
	  },

	  _onMouseDown: function _onMouseDown( /*object*/event) {
	    var nextState;

	    if (event.target !== ReactDOM.findDOMNode(this.refs.face)) {
	      // Both `offsetX` and `layerX` are non-standard DOM property but they are
	      // magically available for browsers somehow.
	      var nativeEvent = event.nativeEvent;
	      var position = this.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX : nativeEvent.offsetY || nativeEvent.layerY;

	      // MouseDown on the scroll-track directly, move the center of the
	      // scroll-face to the mouse position.
	      var props = this.props;
	      position /= this.state.scale;
	      nextState = this._calculateState(position - this.state.faceSize * 0.5 / this.state.scale, props.size, props.contentSize, props.orientation);
	    } else {
	      nextState = {};
	    }

	    nextState.focused = true;
	    this._setNextState(nextState);

	    this._mouseMoveTracker.captureMouseMoves(event);
	    // Focus the node so it may receive keyboard event.
	    ReactDOM.findDOMNode(this).focus();
	  },

	  _onMouseMove: function _onMouseMove( /*number*/deltaX, /*number*/deltaY) {
	    var props = this.props;
	    var delta = this.state.isHorizontal ? deltaX : deltaY;
	    delta /= this.state.scale;

	    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
	  },

	  _onMouseMoveEnd: function _onMouseMoveEnd() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.setState({ isDragging: false });
	  },

	  _onKeyDown: function _onKeyDown( /*object*/event) {
	    var keyCode = event.keyCode;

	    if (keyCode === Keys.TAB) {
	      // Let focus move off the scrollbar.
	      return;
	    }

	    var distance = KEYBOARD_SCROLL_AMOUNT;
	    var direction = 0;

	    if (this.state.isHorizontal) {
	      switch (keyCode) {
	        case Keys.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case Keys.LEFT:
	          direction = -1;
	          break;

	        case Keys.RIGHT:
	          direction = 1;
	          break;

	        default:
	          return;
	      }
	    }

	    if (!this.state.isHorizontal) {
	      switch (keyCode) {
	        case Keys.SPACE:
	          if (event.shiftKey) {
	            direction = -1;
	          } else {
	            direction = 1;
	          }
	          break;

	        case Keys.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case Keys.UP:
	          direction = -1;
	          break;

	        case Keys.DOWN:
	          direction = 1;
	          break;

	        case Keys.PAGE_UP:
	          direction = -1;
	          distance = this.props.size;
	          break;

	        case Keys.PAGE_DOWN:
	          direction = 1;
	          distance = this.props.size;
	          break;

	        default:
	          return;
	      }
	    }

	    event.preventDefault();

	    var props = this.props;
	    this._setNextState(this._calculateState(this.state.position + distance * direction, props.size, props.contentSize, props.orientation));
	  },

	  _onFocus: function _onFocus() {
	    this.setState({
	      focused: true
	    });
	  },

	  _onBlur: function _onBlur() {
	    this.setState({
	      focused: false
	    });
	  },

	  _blur: function _blur() {
	    if (this.isMounted()) {
	      try {
	        this._onBlur();
	        ReactDOM.findDOMNode(this).blur();
	      } catch (oops) {
	        // pass
	      }
	    }
	  },

	  _setNextState: function _setNextState( /*object*/nextState, /*?object*/props) {
	    props = props || this.props;
	    var controlledPosition = props.position;
	    var willScroll = this.state.position !== nextState.position;
	    if (controlledPosition === undefined) {
	      var callback = willScroll ? this._didScroll : undefined;
	      this.setState(nextState, callback);
	    } else if (controlledPosition === nextState.position) {
	      this.setState(nextState);
	    } else {
	      // Scrolling is controlled. Don't update the state and let the owner
	      // to update the scrollbar instead.
	      if (nextState.position !== undefined && nextState.position !== this.state.position) {
	        this.props.onScroll(nextState.position);
	      }
	      return;
	    }

	    if (willScroll && _lastScrolledScrollbar !== this) {
	      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
	      _lastScrolledScrollbar = this;
	    }
	  },

	  _didScroll: function _didScroll() {
	    this.props.onScroll(this.state.position);
	  }
	});

	Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
	Scrollbar.SIZE = parseInt(cssVar('scrollbar-size'), 10);

	module.exports = Scrollbar;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This class listens to events on the document and then updates a react
	 * component through callbacks.
	 * Please note that captureMouseMove must be called in
	 * order to initialize listeners on mousemove and mouseup.
	 * releaseMouseMove must be called to remove them. It is important to
	 * call releaseMouseMoves since mousemove is expensive to listen to.
	 *
	 * @providesModule DOMMouseMoveTracker
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EventListener = __webpack_require__(54);

	var cancelAnimationFramePolyfill = __webpack_require__(55);
	var requestAnimationFramePolyfill = __webpack_require__(50);

	var DOMMouseMoveTracker = (function () {
	  /**
	   * onMove is the callback that will be called on every mouse move.
	   * onMoveEnd is called on mouse up when movement has ended.
	   */

	  function DOMMouseMoveTracker(
	  /*function*/onMove,
	  /*function*/onMoveEnd,
	  /*DOMElement*/domNode) {
	    _classCallCheck(this, DOMMouseMoveTracker);

	    this._isDragging = false;
	    this._animationFrameID = null;
	    this._domNode = domNode;
	    this._onMove = onMove;
	    this._onMoveEnd = onMoveEnd;
	    this._onMouseMove = this._onMouseMove.bind(this);
	    this._onMouseUp = this._onMouseUp.bind(this);
	    this._didMouseMove = this._didMouseMove.bind(this);
	  }

	  /**
	   * This is to set up the listeners for listening to mouse move
	   * and mouse up signaling the movement has ended. Please note that these
	   * listeners are added at the document.body level. It takes in an event
	   * in order to grab inital state.
	   */

	  _createClass(DOMMouseMoveTracker, [{
	    key: 'captureMouseMoves',
	    value: function captureMouseMoves( /*object*/event) {
	      if (!this._eventMoveToken && !this._eventUpToken) {
	        this._eventMoveToken = EventListener.listen(this._domNode, 'mousemove', this._onMouseMove);
	        this._eventUpToken = EventListener.listen(this._domNode, 'mouseup', this._onMouseUp);
	      }

	      if (!this._isDragging) {
	        this._deltaX = 0;
	        this._deltaY = 0;
	        this._isDragging = true;
	        this._x = event.clientX;
	        this._y = event.clientY;
	      }
	      event.preventDefault();
	    }

	    /**
	     * These releases all of the listeners on document.body.
	     */
	  }, {
	    key: 'releaseMouseMoves',
	    value: function releaseMouseMoves() {
	      if (this._eventMoveToken && this._eventUpToken) {
	        this._eventMoveToken.remove();
	        this._eventMoveToken = null;
	        this._eventUpToken.remove();
	        this._eventUpToken = null;
	      }

	      if (this._animationFrameID !== null) {
	        cancelAnimationFramePolyfill(this._animationFrameID);
	        this._animationFrameID = null;
	      }

	      if (this._isDragging) {
	        this._isDragging = false;
	        this._x = null;
	        this._y = null;
	      }
	    }

	    /**
	     * Returns whether or not if the mouse movement is being tracked.
	     */
	  }, {
	    key: 'isDragging',
	    value: function isDragging() /*boolean*/{
	      return this._isDragging;
	    }

	    /**
	     * Calls onMove passed into constructor and updates internal state.
	     */
	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove( /*object*/event) {
	      var x = event.clientX;
	      var y = event.clientY;

	      this._deltaX += x - this._x;
	      this._deltaY += y - this._y;

	      if (this._animationFrameID === null) {
	        // The mouse may move faster then the animation frame does.
	        // Use `requestAnimationFramePolyfill` to avoid over-updating.
	        this._animationFrameID = requestAnimationFramePolyfill(this._didMouseMove);
	      }

	      this._x = x;
	      this._y = y;
	      event.preventDefault();
	    }
	  }, {
	    key: '_didMouseMove',
	    value: function _didMouseMove() {
	      this._animationFrameID = null;
	      this._onMove(this._deltaX, this._deltaY);
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }

	    /**
	     * Calls onMoveEnd passed into constructor and updates internal state.
	     */
	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp() {
	      if (this._animationFrameID) {
	        this._didMouseMove();
	      }
	      this._onMoveEnd();
	    }
	  }]);

	  return DOMMouseMoveTracker;
	})();

	module.exports = DOMMouseMoveTracker;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventListener
	 * @typechecks
	 */

	'use strict';

	var emptyFunction = __webpack_require__(45);

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function capture(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    } else {
	      if (true) {
	        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
	      }
	      return {
	        remove: emptyFunction
	      };
	    }
	  },

	  registerDefault: function registerDefault() {}
	};

	module.exports = EventListener;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cancelAnimationFramePolyfill
	 */

	/**
	 * Here is the native and polyfill version of cancelAnimationFrame.
	 * Please don't use it directly and use cancelAnimationFrame module instead.
	 */
	"use strict";

	var cancelAnimationFrame = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame || global.clearTimeout;

	module.exports = cancelAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Keys
	 */

	"use strict";

	module.exports = {
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

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOM
	 */

	'use strict';

	module.exports = __webpack_require__(58);

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_58__;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cssVar
	 * @typechecks
	 */

	"use strict";

	var CSS_VARS = {
	  'scrollbar-face-active-color': '#7d7d7d',
	  'scrollbar-face-color': '#c2c2c2',
	  'scrollbar-face-margin': '4px',
	  'scrollbar-face-radius': '6px',
	  'scrollbar-size': '15px',
	  'scrollbar-size-large': '17px',
	  'scrollbar-track-color': 'rgba(255, 255, 255, 0.8)',
	  'fbui-white': '#fff',
	  'fbui-desktop-background-light': '#f6f7f8'
	};

	/**
	 * @param {string} name
	 */
	function cssVar(name) {
	  if (CSS_VARS.hasOwnProperty(name)) {
	    return CSS_VARS[name];
	  }

	  throw new Error('cssVar' + '("' + name + '"): Unexpected class transformation.');
	}

	cssVar.CSS_VARS = CSS_VARS;

	module.exports = cssVar;

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	'use strict';

	var slashReplaceRegex = /\//g;
	var cache = {};

	function getClassName(className) {
	  if (cache[className]) {
	    return cache[className];
	  }

	  cache[className] = className.replace(slashReplaceRegex, '_');
	  return cache[className];
	}

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  var classNamesArray;
	  if (typeof classNames == 'object') {
	    classNamesArray = Object.keys(classNames).filter(function (className) {
	      return classNames[className];
	    });
	  } else {
	    classNamesArray = Array.prototype.slice.call(arguments);
	  }

	  return classNamesArray.map(getClassName).join(' ');
	}

	module.exports = cx;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule translateDOMPositionXY
	 * @typechecks
	 */

	'use strict';

	var BrowserSupportCore = __webpack_require__(62);

	var getVendorPrefixedName = __webpack_require__(63);

	var TRANSFORM = getVendorPrefixedName('transform');
	var BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

	var translateDOMPositionXY = (function () {
	  if (BrowserSupportCore.hasCSSTransforms()) {
	    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
	    var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
	    // It appears that Safari messes up the composition order
	    // of GPU-accelerated layers
	    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
	    // Use 2D translation instead.
	    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
	      return function ( /*object*/style, /*number*/x, /*number*/y) {
	        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
	        style[BACKFACE_VISIBILITY] = 'hidden';
	      };
	    } else {
	      return function ( /*object*/style, /*number*/x, /*number*/y) {
	        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
	      };
	    }
	  } else {
	    return function ( /*object*/style, /*number*/x, /*number*/y) {
	      style.left = x + 'px';
	      style.top = y + 'px';
	    };
	  }
	})();

	module.exports = translateDOMPositionXY;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BrowserSupportCore
	 */

	'use strict';

	var getVendorPrefixedName = __webpack_require__(63);

	var BrowserSupportCore = {
	  /**
	   * @return {bool} True if browser supports css animations.
	   */
	  hasCSSAnimations: function hasCSSAnimations() {
	    return !!getVendorPrefixedName('animationName');
	  },

	  /**
	   * @return {bool} True if browser supports css transforms.
	   */
	  hasCSSTransforms: function hasCSSTransforms() {
	    return !!getVendorPrefixedName('transform');
	  },

	  /**
	   * @return {bool} True if browser supports css 3d transforms.
	   */
	  hasCSS3DTransforms: function hasCSS3DTransforms() {
	    return !!getVendorPrefixedName('perspective');
	  },

	  /**
	   * @return {bool} True if browser supports css transitions.
	   */
	  hasCSSTransitions: function hasCSSTransitions() {
	    return !!getVendorPrefixedName('transition');
	  }
	};

	module.exports = BrowserSupportCore;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getVendorPrefixedName
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(49);

	var camelize = __webpack_require__(64);
	var invariant = __webpack_require__(65);

	var memoized = {};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
	var testStyle = ExecutionEnvironment.canUseDOM ? document.createElement('div').style : {};

	function getWithPrefix(name) {
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixedName = prefixes[i] + name;
	    if (prefixedName in testStyle) {
	      return prefixedName;
	    }
	  }
	  return null;
	}

	/**
	 * @param {string} property Name of a css property to check for.
	 * @return {?string} property name supported in the browser, or null if not
	 * supported.
	 */
	function getVendorPrefixedName(property) {
	  var name = camelize(property);
	  if (memoized[name] === undefined) {
	    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	    if (prefixRegex.test(capitalizedName)) {
	      invariant(false, 'getVendorPrefixedName must only be called with unprefixed' + 'CSS property names. It was called with %s', property);
	    }
	    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
	  }
	  return memoized[name];
	}

	module.exports = getVendorPrefixedName;

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	"use strict";

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

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

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (true) {
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
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableBufferedRows.react
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var FixedDataTableRowBuffer = __webpack_require__(67);
	var FixedDataTableRow = __webpack_require__(71);

	var cx = __webpack_require__(60);
	var emptyFunction = __webpack_require__(45);
	var joinClasses = __webpack_require__(79);
	var translateDOMPositionXY = __webpack_require__(61);

	var PropTypes = __webpack_require__(37);

	var FixedDataTableBufferedRows = createReactClass({

	  propTypes: {
	    isScrolling: PropTypes.bool,
	    defaultRowHeight: PropTypes.number.isRequired,
	    firstRowIndex: PropTypes.number.isRequired,
	    firstRowOffset: PropTypes.number.isRequired,
	    fixedColumns: PropTypes.array.isRequired,
	    height: PropTypes.number.isRequired,
	    offsetTop: PropTypes.number.isRequired,
	    onRowClick: PropTypes.func,
	    onRowDoubleClick: PropTypes.func,
	    onRowMouseDown: PropTypes.func,
	    onRowMouseEnter: PropTypes.func,
	    onRowMouseLeave: PropTypes.func,
	    rowClassNameGetter: PropTypes.func,
	    rowsCount: PropTypes.number.isRequired,
	    rowHeightGetter: PropTypes.func,
	    rowPositionGetter: PropTypes.func.isRequired,
	    scrollLeft: PropTypes.number.isRequired,
	    scrollableColumns: PropTypes.array.isRequired,
	    showLastRowBorder: PropTypes.bool,
	    width: PropTypes.number.isRequired
	  },

	  getInitialState: function getInitialState() /*object*/{
	    this._rowBuffer = new FixedDataTableRowBuffer(this.props.rowsCount, this.props.defaultRowHeight, this.props.height, this._getRowHeight);
	    return {
	      rowsToRender: this._rowBuffer.getRows(this.props.firstRowIndex, this.props.firstRowOffset)
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this._staticRowArray = [];
	  },

	  componentDidMount: function componentDidMount() {
	    setTimeout(this._updateBuffer, 1000);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    if (nextProps.rowsCount !== this.props.rowsCount || nextProps.defaultRowHeight !== this.props.defaultRowHeight || nextProps.height !== this.props.height) {
	      this._rowBuffer = new FixedDataTableRowBuffer(nextProps.rowsCount, nextProps.defaultRowHeight, nextProps.height, this._getRowHeight);
	    }
	    if (this.props.isScrolling && !nextProps.isScrolling) {
	      this._updateBuffer();
	    } else {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRows(nextProps.firstRowIndex, nextProps.firstRowOffset)
	      });
	    }
	  },

	  _updateBuffer: function _updateBuffer() {
	    if (this.isMounted()) {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer()
	      });
	    }
	  },

	  shouldComponentUpdate: function shouldComponentUpdate() /*boolean*/{
	    // Don't add PureRenderMixin to this component please.
	    return true;
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._staticRowArray.length = 0;
	  },

	  render: function render() /*object*/{
	    var props = this.props;
	    var rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
	    var rowPositionGetter = props.rowPositionGetter;

	    var rowsToRender = this.state.rowsToRender;
	    this._staticRowArray.length = rowsToRender.length;

	    for (var i = 0; i < rowsToRender.length; ++i) {
	      var rowIndex = rowsToRender[i];
	      var currentRowHeight = this._getRowHeight(rowIndex);
	      var rowOffsetTop = rowPositionGetter(rowIndex);

	      var hasBottomBorder = rowIndex === props.rowsCount - 1 && props.showLastRowBorder;

	      this._staticRowArray[i] = React.createElement(FixedDataTableRow, {
	        key: i,
	        isScrolling: props.isScrolling,
	        index: rowIndex,
	        width: props.width,
	        height: currentRowHeight,
	        scrollLeft: Math.round(props.scrollLeft),
	        offsetTop: Math.round(rowOffsetTop),
	        fixedColumns: props.fixedColumns,
	        scrollableColumns: props.scrollableColumns,
	        onClick: props.onRowClick,
	        onDoubleClick: props.onRowDoubleClick,
	        onMouseDown: props.onRowMouseDown,
	        onMouseEnter: props.onRowMouseEnter,
	        onMouseLeave: props.onRowMouseLeave,
	        className: joinClasses(rowClassNameGetter(rowIndex), cx('public/fixedDataTable/bodyRow'), cx({
	          'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
	          'public/fixedDataTable/hasBottomBorder': hasBottomBorder
	        }))
	      });
	    }

	    var firstRowPosition = props.rowPositionGetter(props.firstRowIndex);

	    var style = {
	      position: 'absolute',
	      pointerEvents: props.isScrolling ? 'none' : 'auto'
	    };

	    translateDOMPositionXY(style, 0, props.firstRowOffset - firstRowPosition + props.offsetTop);

	    return React.createElement(
	      'div',
	      { style: style },
	      this._staticRowArray
	    );
	  },

	  _getRowHeight: function _getRowHeight( /*number*/index) /*number*/{
	    return this.props.rowHeightGetter ? this.props.rowHeightGetter(index) : this.props.defaultRowHeight;
	  }
	});

	module.exports = FixedDataTableBufferedRows;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRowBuffer
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var IntegerBufferSet = __webpack_require__(68);

	var clamp = __webpack_require__(70);
	var invariant = __webpack_require__(65);
	var MIN_BUFFER_ROWS = 3;
	var MAX_BUFFER_ROWS = 6;

	// FixedDataTableRowBuffer is a helper class that executes row buffering
	// logic for FixedDataTable. It figures out which rows should be rendered
	// and in which positions.

	var FixedDataTableRowBuffer = (function () {
	  function FixedDataTableRowBuffer(
	  /*number*/rowsCount,
	  /*number*/defaultRowHeight,
	  /*number*/viewportHeight,
	  /*?function*/rowHeightGetter) {
	    _classCallCheck(this, FixedDataTableRowBuffer);

	    invariant(defaultRowHeight !== 0, "defaultRowHeight musn't be equal 0 in FixedDataTableRowBuffer");

	    this._bufferSet = new IntegerBufferSet();
	    this._defaultRowHeight = defaultRowHeight;
	    this._viewportRowsBegin = 0;
	    this._viewportRowsEnd = 0;
	    this._maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;
	    this._bufferRowsCount = clamp(Math.floor(this._maxVisibleRowCount / 2), MIN_BUFFER_ROWS, MAX_BUFFER_ROWS);
	    this._rowsCount = rowsCount;
	    this._rowHeightGetter = rowHeightGetter;
	    this._rows = [];
	    this._viewportHeight = viewportHeight;

	    this.getRows = this.getRows.bind(this);
	    this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this);
	  }

	  _createClass(FixedDataTableRowBuffer, [{
	    key: 'getRowsWithUpdatedBuffer',
	    value: function getRowsWithUpdatedBuffer() /*array*/{
	      var remainingBufferRows = 2 * this._bufferRowsCount;
	      var bufferRowIndex = Math.max(this._viewportRowsBegin - this._bufferRowsCount, 0);
	      while (bufferRowIndex < this._viewportRowsBegin) {
	        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
	        bufferRowIndex++;
	        remainingBufferRows--;
	      }
	      bufferRowIndex = this._viewportRowsEnd;
	      while (bufferRowIndex < this._rowsCount && remainingBufferRows > 0) {
	        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
	        bufferRowIndex++;
	        remainingBufferRows--;
	      }
	      return this._rows;
	    }
	  }, {
	    key: 'getRows',
	    value: function getRows(
	    /*number*/firstRowIndex,
	    /*number*/firstRowOffset) /*array*/{
	      var top = firstRowOffset;
	      var totalHeight = top;
	      var rowIndex = firstRowIndex;
	      var endIndex = Math.min(firstRowIndex + this._maxVisibleRowCount, this._rowsCount);

	      this._viewportRowsBegin = firstRowIndex;
	      while (rowIndex < endIndex || totalHeight < this._viewportHeight && rowIndex < this._rowsCount) {
	        this._addRowToBuffer(rowIndex, firstRowIndex, endIndex - 1);
	        totalHeight += this._rowHeightGetter(rowIndex);
	        ++rowIndex;
	        // Store index after the last viewport row as end, to be able to
	        // distinguish when there are no rows rendered in viewport
	        this._viewportRowsEnd = rowIndex;
	      }

	      return this._rows;
	    }
	  }, {
	    key: '_addRowToBuffer',
	    value: function _addRowToBuffer(
	    /*number*/rowIndex,
	    /*number*/firstViewportRowIndex,
	    /*number*/lastViewportRowIndex) {
	      var rowPosition = this._bufferSet.getValuePosition(rowIndex);
	      var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
	      var allowedRowsCount = viewportRowsCount + this._bufferRowsCount * 2;
	      if (rowPosition === null && this._bufferSet.getSize() >= allowedRowsCount) {
	        rowPosition = this._bufferSet.replaceFurthestValuePosition(firstViewportRowIndex, lastViewportRowIndex, rowIndex);
	      }
	      if (rowPosition === null) {
	        // We can't reuse any of existing positions for this row. We have to
	        // create new position
	        rowPosition = this._bufferSet.getNewPositionForValue(rowIndex);
	        this._rows[rowPosition] = rowIndex;
	      } else {
	        // This row already is in the table with rowPosition position or it
	        // can replace row that is in that position
	        this._rows[rowPosition] = rowIndex;
	      }
	    }
	  }]);

	  return FixedDataTableRowBuffer;
	})();

	module.exports = FixedDataTableRowBuffer;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule IntegerBufferSet
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Heap = __webpack_require__(69);

	var invariant = __webpack_require__(65);

	// Data structure that allows to store values and assign positions to them
	// in a way to minimize changing positions of stored values when new ones are
	// added or when some values are replaced. Stored elements are alwasy assigned
	// a consecutive set of positoins startin from 0 up to count of elements less 1
	// Following actions can be executed
	// * get position assigned to given value (null if value is not stored)
	// * create new entry for new value and get assigned position back
	// * replace value that is furthest from specified value range with new value
	//   and get it's position back
	// All operations take amortized log(n) time where n is number of elements in
	// the set.

	var IntegerBufferSet = (function () {
	  function IntegerBufferSet() {
	    _classCallCheck(this, IntegerBufferSet);

	    this._valueToPositionMap = {};
	    this._size = 0;
	    this._smallValues = new Heap([], // Initial data in the heap
	    this._smallerComparator);
	    this._largeValues = new Heap([], // Initial data in the heap
	    this._greaterComparator);

	    this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
	    this.getValuePosition = this.getValuePosition.bind(this);
	    this.getSize = this.getSize.bind(this);
	    this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this);
	  }

	  _createClass(IntegerBufferSet, [{
	    key: 'getSize',
	    value: function getSize() /*number*/{
	      return this._size;
	    }
	  }, {
	    key: 'getValuePosition',
	    value: function getValuePosition( /*number*/value) /*?number*/{
	      if (this._valueToPositionMap[value] === undefined) {
	        return null;
	      }
	      return this._valueToPositionMap[value];
	    }
	  }, {
	    key: 'getNewPositionForValue',
	    value: function getNewPositionForValue( /*number*/value) /*number*/{
	      invariant(this._valueToPositionMap[value] === undefined, "Shouldn't try to find new position for value already stored in BufferSet");
	      var newPosition = this._size;
	      this._size++;
	      this._pushToHeaps(newPosition, value);
	      this._valueToPositionMap[value] = newPosition;
	      return newPosition;
	    }
	  }, {
	    key: 'replaceFurthestValuePosition',
	    value: function replaceFurthestValuePosition(
	    /*number*/lowValue,
	    /*number*/highValue,
	    /*number*/newValue) /*?number*/{
	      invariant(this._valueToPositionMap[newValue] === undefined, "Shouldn't try to replace values with value already stored value in " + "BufferSet");

	      this._cleanHeaps();
	      if (this._smallValues.empty() || this._largeValues.empty()) {
	        // Threre are currently no values stored. We will have to create new
	        // position for this value.
	        return null;
	      }

	      var minValue = this._smallValues.peek().value;
	      var maxValue = this._largeValues.peek().value;
	      if (minValue >= lowValue && maxValue <= highValue) {
	        // All values currently stored are necessary, we can't reuse any of them.
	        return null;
	      }

	      var valueToReplace;
	      if (lowValue - minValue > maxValue - highValue) {
	        // minValue is further from provided range. We will reuse it's position.
	        valueToReplace = minValue;
	        this._smallValues.pop();
	      } else {
	        valueToReplace = maxValue;
	        this._largeValues.pop();
	      }
	      var position = this._valueToPositionMap[valueToReplace];
	      delete this._valueToPositionMap[valueToReplace];
	      this._valueToPositionMap[newValue] = position;
	      this._pushToHeaps(position, newValue);

	      return position;
	    }
	  }, {
	    key: '_pushToHeaps',
	    value: function _pushToHeaps( /*number*/position, /*number*/value) {
	      var element = {
	        position: position,
	        value: value
	      };
	      // We can reuse the same object in both heaps, because we don't mutate them
	      this._smallValues.push(element);
	      this._largeValues.push(element);
	    }
	  }, {
	    key: '_cleanHeaps',
	    value: function _cleanHeaps() {
	      // We not usually only remove object from one heap while moving value.
	      // Here we make sure that there is no stale data on top of heaps.
	      this._cleanHeap(this._smallValues);
	      this._cleanHeap(this._largeValues);
	      var minHeapSize = Math.min(this._smallValues.size(), this._largeValues.size());
	      var maxHeapSize = Math.max(this._smallValues.size(), this._largeValues.size());
	      if (maxHeapSize > 10 * minHeapSize) {
	        // There are many old values in one of heaps. We nned to get rid of them
	        // to not use too avoid memory leaks
	        this._recreateHeaps();
	      }
	    }
	  }, {
	    key: '_recreateHeaps',
	    value: function _recreateHeaps() {
	      var sourceHeap = this._smallValues.size() < this._largeValues.size() ? this._smallValues : this._largeValues;
	      var newSmallValues = new Heap([], // Initial data in the heap
	      this._smallerComparator);
	      var newLargeValues = new Heap([], // Initial datat in the heap
	      this._greaterComparator);
	      while (!sourceHeap.empty()) {
	        var element = sourceHeap.pop();
	        // Push all stil valid elements to new heaps
	        if (this._valueToPositionMap[element.value] !== undefined) {
	          newSmallValues.push(element);
	          newLargeValues.push(element);
	        }
	      }
	      this._smallValues = newSmallValues;
	      this._largeValues = newLargeValues;
	    }
	  }, {
	    key: '_cleanHeap',
	    value: function _cleanHeap( /*object*/heap) {
	      while (!heap.empty() && this._valueToPositionMap[heap.peek().value] === undefined) {
	        heap.pop();
	      }
	    }
	  }, {
	    key: '_smallerComparator',
	    value: function _smallerComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
	      return lhs.value < rhs.value;
	    }
	  }, {
	    key: '_greaterComparator',
	    value: function _greaterComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
	      return lhs.value > rhs.value;
	    }
	  }]);

	  return IntegerBufferSet;
	})();

	module.exports = IntegerBufferSet;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Heap
	 * @typechecks
	 * @preventMunge
	 */

	'use strict';

	/*
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function defaultComparator(a, b) {
	  return a < b;
	}

	var Heap = (function () {
	  function Heap(items, comparator) {
	    _classCallCheck(this, Heap);

	    this._items = items || [];
	    this._size = this._items.length;
	    this._comparator = comparator || defaultComparator;
	    this._heapify();
	  }

	  /*
	   * @return {boolean}
	   */

	  _createClass(Heap, [{
	    key: 'empty',
	    value: function empty() {
	      return this._size === 0;
	    }

	    /*
	     * @return {*}
	     */
	  }, {
	    key: 'pop',
	    value: function pop() {
	      if (this._size === 0) {
	        return;
	      }

	      var elt = this._items[0];

	      var lastElt = this._items.pop();
	      this._size--;

	      if (this._size > 0) {
	        this._items[0] = lastElt;
	        this._sinkDown(0);
	      }

	      return elt;
	    }

	    /*
	     * @param {*} item
	     */
	  }, {
	    key: 'push',
	    value: function push(item) {
	      this._items[this._size++] = item;
	      this._bubbleUp(this._size - 1);
	    }

	    /*
	     * @return {number}
	     */
	  }, {
	    key: 'size',
	    value: function size() {
	      return this._size;
	    }

	    /*
	     * @return {*}
	     */
	  }, {
	    key: 'peek',
	    value: function peek() {
	      if (this._size === 0) {
	        return;
	      }

	      return this._items[0];
	    }
	  }, {
	    key: '_heapify',
	    value: function _heapify() {
	      for (var index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
	        this._sinkDown(index);
	      }
	    }

	    /*
	     * @parent {number} index
	     */
	  }, {
	    key: '_bubbleUp',
	    value: function _bubbleUp(index) {
	      var elt = this._items[index];
	      while (index > 0) {
	        var parentIndex = Math.floor((index + 1) / 2) - 1;
	        var parentElt = this._items[parentIndex];

	        // if parentElt < elt, stop
	        if (this._comparator(parentElt, elt)) {
	          return;
	        }

	        // swap
	        this._items[parentIndex] = elt;
	        this._items[index] = parentElt;
	        index = parentIndex;
	      }
	    }

	    /*
	     * @parent {number} index
	     */
	  }, {
	    key: '_sinkDown',
	    value: function _sinkDown(index) {
	      var elt = this._items[index];

	      while (true) {
	        var leftChildIndex = 2 * (index + 1) - 1;
	        var rightChildIndex = 2 * (index + 1);
	        var swapIndex = -1;

	        if (leftChildIndex < this._size) {
	          var leftChild = this._items[leftChildIndex];
	          if (this._comparator(leftChild, elt)) {
	            swapIndex = leftChildIndex;
	          }
	        }

	        if (rightChildIndex < this._size) {
	          var rightChild = this._items[rightChildIndex];
	          if (this._comparator(rightChild, elt)) {
	            if (swapIndex === -1 || this._comparator(rightChild, this._items[swapIndex])) {
	              swapIndex = rightChildIndex;
	            }
	          }
	        }

	        // if we don't have a swap, stop
	        if (swapIndex === -1) {
	          return;
	        }

	        this._items[index] = this._items[swapIndex];
	        this._items[swapIndex] = elt;
	        index = swapIndex;
	      }
	    }
	  }]);

	  return Heap;
	})();

	module.exports = Heap;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule clamp
	 * @typechecks
	 */

	/**
	 * Clamps (or clips or confines) the value to be between min and max.
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	"use strict";

	function clamp(value, min, max) {
	  if (value < min) {
	    return min;
	  }
	  if (value > max) {
	    return max;
	  }
	  return value;
	}

	module.exports = clamp;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRow.react
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var FixedDataTableCellGroup = __webpack_require__(72);

	var cx = __webpack_require__(60);
	var joinClasses = __webpack_require__(79);
	var translateDOMPositionXY = __webpack_require__(61);

	var PropTypes = __webpack_require__(37);

	/**
	 * Component that renders the row for <FixedDataTable />.
	 * This component should not be used directly by developer. Instead,
	 * only <FixedDataTable /> should use the component internally.
	 */
	var FixedDataTableRowImpl = createReactClass({

	  propTypes: {

	    isScrolling: PropTypes.bool,

	    /**
	     * Array of <FixedDataTableColumn /> for the fixed columns.
	     */
	    fixedColumns: PropTypes.array.isRequired,

	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * The row index.
	     */
	    index: PropTypes.number.isRequired,

	    /**
	     * Array of <FixedDataTableColumn /> for the scrollable columns.
	     */
	    scrollableColumns: PropTypes.array.isRequired,

	    /**
	     * The distance between the left edge of the table and the leftmost portion
	     * of the row currently visible in the table.
	     */
	    scrollLeft: PropTypes.number.isRequired,

	    /**
	     * Width of the row.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Fire when a row is clicked.
	     */
	    onClick: PropTypes.func,

	    /**
	     * Fire when a row is double clicked.
	     */
	    onDoubleClick: PropTypes.func,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number leftOffset
	     * @param number cellWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: PropTypes.func
	  },

	  render: function render() /*object*/{
	    var style = {
	      width: this.props.width,
	      height: this.props.height
	    };

	    var className = cx({
	      'fixedDataTableRowLayout/main': true,
	      'public/fixedDataTableRow/main': true,
	      'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
	      'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
	      'public/fixedDataTableRow/even': this.props.index % 2 === 0
	    });

	    var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
	    var fixedColumns = React.createElement(FixedDataTableCellGroup, {
	      key: 'fixed_cells',
	      isScrolling: this.props.isScrolling,
	      height: this.props.height,
	      left: 0,
	      width: fixedColumnsWidth,
	      zIndex: 2,
	      columns: this.props.fixedColumns,
	      onColumnResize: this.props.onColumnResize,
	      rowHeight: this.props.height,
	      rowIndex: this.props.index
	    });
	    var columnsShadow = this._renderColumnsShadow(fixedColumnsWidth);
	    var scrollableColumns = React.createElement(FixedDataTableCellGroup, {
	      key: 'scrollable_cells',
	      isScrolling: this.props.isScrolling,
	      height: this.props.height,
	      left: this.props.scrollLeft,
	      offsetLeft: fixedColumnsWidth,
	      width: this.props.width - fixedColumnsWidth,
	      zIndex: 0,
	      columns: this.props.scrollableColumns,
	      onColumnResize: this.props.onColumnResize,
	      rowHeight: this.props.height,
	      rowIndex: this.props.index
	    });

	    return React.createElement(
	      'div',
	      {
	        className: joinClasses(className, this.props.className),
	        onClick: this.props.onClick ? this._onClick : null,
	        onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
	        onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
	        onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
	        onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
	        style: style },
	      React.createElement(
	        'div',
	        { className: cx('fixedDataTableRowLayout/body') },
	        fixedColumns,
	        scrollableColumns,
	        columnsShadow
	      )
	    );
	  },

	  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
	    var width = 0;
	    for (var i = 0; i < columns.length; ++i) {
	      width += columns[i].props.width;
	    }
	    return width;
	  },

	  _renderColumnsShadow: function _renderColumnsShadow( /*number*/left) /*?object*/{
	    if (left > 0) {
	      var className = cx({
	        'fixedDataTableRowLayout/fixedColumnsDivider': true,
	        'fixedDataTableRowLayout/columnsShadow': this.props.scrollLeft > 0,
	        'public/fixedDataTableRow/fixedColumnsDivider': true,
	        'public/fixedDataTableRow/columnsShadow': this.props.scrollLeft > 0
	      });
	      var style = {
	        left: left,
	        height: this.props.height
	      };
	      return React.createElement('div', { className: className, style: style });
	    }
	  },

	  _onClick: function _onClick( /*object*/event) {
	    this.props.onClick(event, this.props.index);
	  },

	  _onDoubleClick: function _onDoubleClick( /*object*/event) {
	    this.props.onDoubleClick(event, this.props.index);
	  },

	  _onMouseDown: function _onMouseDown( /*object*/event) {
	    this.props.onMouseDown(event, this.props.index);
	  },

	  _onMouseEnter: function _onMouseEnter( /*object*/event) {
	    this.props.onMouseEnter(event, this.props.index);
	  },

	  _onMouseLeave: function _onMouseLeave( /*object*/event) {
	    this.props.onMouseLeave(event, this.props.index);
	  }
	});

	var FixedDataTableRow = createReactClass({

	  propTypes: {

	    isScrolling: PropTypes.bool,

	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: PropTypes.number,

	    /**
	     * The vertical position where the row should render itself
	     */
	    offsetTop: PropTypes.number.isRequired,

	    /**
	     * Width of the row.
	     */
	    width: PropTypes.number.isRequired
	  },

	  render: function render() /*object*/{
	    var style = {
	      width: this.props.width,
	      height: this.props.height,
	      zIndex: this.props.zIndex ? this.props.zIndex : 0
	    };
	    translateDOMPositionXY(style, 0, this.props.offsetTop);

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        className: cx('fixedDataTableRowLayout/rowWrapper') },
	      React.createElement(FixedDataTableRowImpl, _extends({}, this.props, {
	        offsetTop: undefined,
	        zIndex: undefined
	      }))
	    );
	  }
	});

	module.exports = FixedDataTableRow;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellGroup.react
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var FixedDataTableHelper = __webpack_require__(73);
	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var FixedDataTableCell = __webpack_require__(77);

	var cx = __webpack_require__(60);
	var translateDOMPositionXY = __webpack_require__(61);

	var PropTypes = __webpack_require__(37);

	var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

	var FixedDataTableCellGroupImpl = createReactClass({

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {

	    /**
	     * Array of <FixedDataTableColumn />.
	     */
	    columns: PropTypes.array.isRequired,

	    isScrolling: PropTypes.bool,

	    left: PropTypes.number,

	    onColumnResize: PropTypes.func,

	    rowHeight: PropTypes.number.isRequired,

	    rowIndex: PropTypes.number.isRequired,

	    width: PropTypes.number.isRequired,

	    zIndex: PropTypes.number.isRequired
	  },

	  render: function render() /*object*/{
	    var props = this.props;
	    var columns = props.columns;
	    var cells = new Array(columns.length);

	    var currentPosition = 0;
	    for (var i = 0, j = columns.length; i < j; i++) {
	      var columnProps = columns[i].props;
	      if (!columnProps.allowCellsRecycling || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
	        var key = 'cell_' + i;
	        cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, currentPosition, key);
	      }
	      currentPosition += columnProps.width;
	    }

	    var contentWidth = this._getColumnsWidth(columns);

	    var style = {
	      height: props.height,
	      position: 'absolute',
	      width: contentWidth,
	      zIndex: props.zIndex
	    };
	    translateDOMPositionXY(style, -1 * DIR_SIGN * props.left, 0);

	    return React.createElement(
	      'div',
	      {
	        className: cx('fixedDataTableCellGroupLayout/cellGroup'),
	        style: style },
	      cells
	    );
	  },

	  _renderCell: function _renderCell(
	  /*number*/rowIndex,
	  /*number*/height,
	  /*object*/columnProps,
	  /*number*/left,
	  /*string*/key) /*object*/{

	    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
	    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

	    var className = columnProps.cellClassName;

	    return React.createElement(FixedDataTableCell, {
	      isScrolling: this.props.isScrolling,
	      align: columnProps.align,
	      className: className,
	      height: height,
	      key: key,
	      maxWidth: columnProps.maxWidth,
	      minWidth: columnProps.minWidth,
	      onColumnResize: onColumnResize,
	      rowIndex: rowIndex,
	      columnKey: columnProps.columnKey,
	      width: columnProps.width,
	      left: left,
	      cell: columnProps.cell
	    });
	  },

	  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
	    var width = 0;
	    for (var i = 0; i < columns.length; ++i) {
	      width += columns[i].props.width;
	    }
	    return width;
	  }
	});

	var FixedDataTableCellGroup = createReactClass({

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {
	    isScrolling: PropTypes.bool,
	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    offsetLeft: PropTypes.number,

	    left: PropTypes.number,
	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: PropTypes.number.isRequired
	  },

	  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) /*boolean*/{
	    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      offsetLeft: 0
	    };
	  },

	  render: function render() /*object*/{
	    var _props = this.props;
	    var offsetLeft = _props.offsetLeft;

	    var props = _objectWithoutProperties(_props, ['offsetLeft']);

	    var style = {
	      height: props.height
	    };

	    if (DIR_SIGN === 1) {
	      style.left = offsetLeft;
	    } else {
	      style.right = offsetLeft;
	    }

	    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        className: cx('fixedDataTableCellGroupLayout/cellGroupWrapper') },
	      React.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
	        onColumnResize: onColumnResize
	      }))
	    );
	  },

	  _onColumnResize: function _onColumnResize(
	  /*number*/left,
	  /*number*/width,
	  /*?number*/minWidth,
	  /*?number*/maxWidth,
	  /*string|number*/columnKey,
	  /*object*/event) {
	    this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, left - this.props.left + width, width, minWidth, maxWidth, columnKey, event);
	  }
	});

	module.exports = FixedDataTableCellGroup;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableHelper
	 * @typechecks
	 */

	'use strict';

	var Locale = __webpack_require__(74);
	var React = __webpack_require__(27);
	var FixedDataTableColumnGroup = __webpack_require__(75);
	var FixedDataTableColumn = __webpack_require__(76);

	var DIR_SIGN = Locale.isRTL() ? -1 : +1;
	// A cell up to 5px outside of the visible area will still be considered visible
	var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

	function renderToString(value) /*string*/{
	  if (value === null || value === undefined) {
	    return '';
	  } else {
	    return String(value);
	  }
	}

	/**
	 * Helper method to execute a callback against all columns given the children
	 * of a table.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column.
	 */
	function forEachColumn(children, callback) {
	  React.Children.forEach(children, function (child) {
	    if (child.type === FixedDataTableColumnGroup) {
	      forEachColumn(child.props.children, callback);
	    } else if (child.type === FixedDataTableColumn) {
	      callback(child);
	    }
	  });
	}

	/**
	 * Helper method to map columns to new columns. This takes into account column
	 * groups and will generate a new column group if its columns change.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column and should
	 *    return a result column.
	 */
	function mapColumns(children, callback) {
	  var newChildren = [];
	  React.Children.forEach(children, function (originalChild) {
	    var newChild = originalChild;

	    // The child is either a column group or a column. If it is a column group
	    // we need to iterate over its columns and then potentially generate a
	    // new column group
	    if (originalChild.type === FixedDataTableColumnGroup) {
	      var haveColumnsChanged = false;
	      var newColumns = [];

	      forEachColumn(originalChild.props.children, function (originalcolumn) {
	        var newColumn = callback(originalcolumn);
	        if (newColumn !== originalcolumn) {
	          haveColumnsChanged = true;
	        }
	        newColumns.push(newColumn);
	      });

	      // If the column groups columns have changed clone the group and supply
	      // new children
	      if (haveColumnsChanged) {
	        newChild = React.cloneElement(originalChild, {
	          children: newColumns
	        });
	      }
	    } else if (originalChild.type === FixedDataTableColumn) {
	      newChild = callback(originalChild);
	    }

	    newChildren.push(newChild);
	  });

	  return newChildren;
	}

	var FixedDataTableHelper = {
	  DIR_SIGN: DIR_SIGN,
	  CELL_VISIBILITY_TOLERANCE: CELL_VISIBILITY_TOLERANCE,
	  renderToString: renderToString,
	  forEachColumn: forEachColumn,
	  mapColumns: mapColumns
	};

	module.exports = FixedDataTableHelper;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Locale
	 */

	"use strict";

	// Hard code this for now.
	var Locale = {
	  isRTL: function isRTL() {
	    return false;
	  },
	  getDirection: function getDirection() {
	    return 'LTR';
	  }
	};

	module.exports = Locale;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnGroup.react
	 */

	/**
	 * TRANSITION SHIM
	 * This provides an intermediate mapping from the old API to the new API.
	 *
	 * When ready, remove this file and rename the providesModule in
	 * FixedDataTableColumnNew.react
	 */

	'use strict';

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);

	var TransitionColumnGroup = createReactClass({
	  statics: {
	    __TableColumnGroup__: true
	  },

	  render: function render() {
	    if (true) {
	      throw new Error('Component <TransitionColumnGroup /> should never render');
	    }
	    return null;
	  }
	});

	module.exports = TransitionColumnGroup;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumn.react
	 */

	/**
	 * TRANSITION SHIM
	 * This acts to provide an intermediate mapping from the old API to the new API.
	 *
	 * When ready, remove this file and rename the providesModule in
	 * FixedDataTableColumnNew.react
	 */

	'use strict';

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);

	var TransitionColumn = createReactClass({
	  statics: {
	    __TableColumn__: true
	  },

	  render: function render() {
	    if (true) {
	      throw new Error('Component <TransitionColumn /> should never render');
	    }
	    return null;
	  }
	});

	module.exports = TransitionColumn;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCell.react
	 * @typechecks
	 */

	'use strict';

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var FixedDataTableCellDefault = __webpack_require__(78);
	var FixedDataTableHelper = __webpack_require__(73);
	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var cx = __webpack_require__(60);
	var joinClasses = __webpack_require__(79);

	var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

	var PropTypes = __webpack_require__(37);

	var DEFAULT_PROPS = {
	  align: 'left',
	  highlighted: false
	};

	var FixedDataTableCell = createReactClass({

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {
	    isScrolling: PropTypes.bool,
	    align: PropTypes.oneOf(['left', 'center', 'right']),
	    className: PropTypes.string,
	    highlighted: PropTypes.bool,
	    width: PropTypes.number.isRequired,
	    minWidth: PropTypes.number,
	    maxWidth: PropTypes.number,
	    height: PropTypes.number.isRequired,

	    cell: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),

	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	    /**
	     * The row index that will be passed to `cellRenderer` to render.
	     */
	    rowIndex: PropTypes.number.isRequired,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number left
	     * @param number width
	     * @param number minWidth
	     * @param number maxWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: PropTypes.func,

	    /**
	     * The left offset in pixels of the cell.
	     */
	    left: PropTypes.number
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex;
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return DEFAULT_PROPS;
	  },

	  render: function render() /*object*/{
	    var _props = this.props;
	    var height = _props.height;
	    var width = _props.width;
	    var columnKey = _props.columnKey;

	    var props = _objectWithoutProperties(_props, ['height', 'width', 'columnKey']);

	    var style = {
	      height: height,
	      width: width
	    };

	    if (DIR_SIGN === 1) {
	      style.left = props.left;
	    } else {
	      style.right = props.left;
	    }

	    var className = joinClasses(cx({
	      'fixedDataTableCellLayout/main': true,
	      'fixedDataTableCellLayout/lastChild': props.lastChild,
	      'fixedDataTableCellLayout/alignRight': props.align === 'right',
	      'fixedDataTableCellLayout/alignCenter': props.align === 'center',
	      'public/fixedDataTableCell/alignRight': props.align === 'right',
	      'public/fixedDataTableCell/highlighted': props.highlighted,
	      'public/fixedDataTableCell/main': true
	    }), props.className);

	    var columnResizerComponent;
	    if (props.onColumnResize) {
	      var columnResizerStyle = {
	        height: height
	      };
	      columnResizerComponent = React.createElement(
	        'div',
	        {
	          className: cx('fixedDataTableCellLayout/columnResizerContainer'),
	          style: columnResizerStyle,
	          onMouseDown: this._onColumnResizerMouseDown },
	        React.createElement('div', {
	          className: joinClasses(cx('fixedDataTableCellLayout/columnResizerKnob'), cx('public/fixedDataTableCell/columnResizerKnob')),
	          style: columnResizerStyle
	        })
	      );
	    }

	    var cellProps = {
	      columnKey: columnKey,
	      height: height,
	      width: width
	    };

	    if (props.rowIndex >= 0) {
	      cellProps.rowIndex = props.rowIndex;
	    }

	    var content;
	    if (React.isValidElement(props.cell)) {
	      content = React.cloneElement(props.cell, cellProps);
	    } else if (typeof props.cell === 'function') {
	      content = props.cell(cellProps);
	    } else {
	      content = React.createElement(
	        FixedDataTableCellDefault,
	        cellProps,
	        props.cell
	      );
	    }

	    return React.createElement(
	      'div',
	      { className: className, style: style },
	      columnResizerComponent,
	      content
	    );
	  },

	  _onColumnResizerMouseDown: function _onColumnResizerMouseDown( /*object*/event) {
	    this.props.onColumnResize(this.props.left, this.props.width, this.props.minWidth, this.props.maxWidth, this.props.columnKey, event);
	  }
	});

	module.exports = FixedDataTableCell;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellDefault.react
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);

	var cx = __webpack_require__(60);
	var joinClasses = __webpack_require__(79);

	var PropTypes = __webpack_require__(37);

	/**
	 * Component that handles default cell layout and styling.
	 *
	 * All props unless specified below will be set onto the top level `div`
	 * rendered by the cell.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *   <Column
	 *     cell={({rowIndex, width, height}) => (
	 *       <Cell
	 *         width={width}
	 *         height={height}
	 *         className="my-class">
	 *         Cell number: <span>{rowIndex}</span>
	*        </Cell>
	 *     )}
	 *     width={100}
	 *   />
	 * );
	 * ```
	 */
	var FixedDataTableCellDefault = createReactClass({
	  propTypes: {

	    /**
	     * Outer height of the cell.
	     */
	    height: PropTypes.number,

	    /**
	     * Outer width of the cell.
	     */
	    width: PropTypes.number,

	    /**
	     * Optional prop that if specified on the `Column` will be passed to the
	     * cell. It can be used to uniquely identify which column is the cell is in.
	     */
	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	  },

	  render: function render() {
	    var _props = this.props;
	    var height = _props.height;
	    var width = _props.width;
	    var style = _props.style;
	    var className = _props.className;
	    var children = _props.children;
	    var columnKey = _props.columnKey;
	    var // Unused but should not be passed through
	    rowIndex = _props.rowIndex;

	    var props = _objectWithoutProperties(_props, ['height', 'width', 'style', 'className', 'children', 'columnKey', 'rowIndex']);

	    var innerStyle = _extends({
	      height: height,
	      width: width
	    }, style);

	    return React.createElement(
	      'div',
	      _extends({}, props, {
	        className: joinClasses(cx('fixedDataTableCellLayout/wrap1'), cx('public/fixedDataTableCell/wrap1'), className),
	        style: innerStyle }),
	      React.createElement(
	        'div',
	        {
	          className: joinClasses(cx('fixedDataTableCellLayout/wrap2'), cx('public/fixedDataTableCell/wrap2')) },
	        React.createElement(
	          'div',
	          {
	            className: joinClasses(cx('fixedDataTableCellLayout/wrap3'), cx('public/fixedDataTableCell/wrap3')) },
	          React.createElement(
	            'div',
	            { className: cx('public/fixedDataTableCell/cellContent') },
	            children
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = FixedDataTableCellDefault;
	// Unused but should not be passed through

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} className
	 * @return {string}
	 */
	function joinClasses(className /*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is to be used with the FixedDataTable. It is a read line
	 * that when you click on a column that is resizable appears and allows
	 * you to resize the corresponding column.
	 *
	 * @providesModule FixedDataTableColumnResizeHandle.react
	 * @typechecks
	 */

	'use strict';

	var DOMMouseMoveTracker = __webpack_require__(53);
	var Locale = __webpack_require__(74);
	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);
	var ReactComponentWithPureRenderMixin = __webpack_require__(43);

	var clamp = __webpack_require__(70);
	var cx = __webpack_require__(60);

	var PropTypes = __webpack_require__(37);

	var FixedDataTableColumnResizeHandle = createReactClass({
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    visible: PropTypes.bool.isRequired,

	    /**
	     * This is the height of the line
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * Offset from left border of the table, please note
	     * that the line is a border on diff. So this is really the
	     * offset of the column itself.
	     */
	    leftOffset: PropTypes.number.isRequired,

	    /**
	     * Height of the clickable region of the line.
	     * This is assumed to be at the top of the line.
	     */
	    knobHeight: PropTypes.number.isRequired,

	    /**
	     * The line is a border on a diff, so this is essentially
	     * the width of column.
	     */
	    initialWidth: PropTypes.number,

	    /**
	     * The minimum width this dragger will collapse to
	     */
	    minWidth: PropTypes.number,

	    /**
	     * The maximum width this dragger will collapse to
	     */
	    maxWidth: PropTypes.number,

	    /**
	     * Initial click event on the header cell.
	     */
	    initialEvent: PropTypes.object,

	    /**
	     * When resizing is complete this is called.
	     */
	    onColumnResizeEnd: PropTypes.func,

	    /**
	     * Column key for the column being resized.
	     */
	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	  },

	  getInitialState: function getInitialState() /*object*/{
	    return {
	      width: 0,
	      cursorDelta: 0
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {
	    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
	      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
	      this.setState({
	        width: newProps.initialWidth,
	        cursorDelta: newProps.initialWidth
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this._mouseMoveTracker = new DOMMouseMoveTracker(this._onMove, this._onColumnResizeEnd, document.body);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this._mouseMoveTracker = null;
	  },

	  render: function render() /*object*/{
	    var style = {
	      width: this.state.width,
	      height: this.props.height
	    };
	    if (Locale.isRTL()) {
	      style.right = this.props.leftOffset;
	    } else {
	      style.left = this.props.leftOffset;
	    }
	    return React.createElement(
	      'div',
	      {
	        className: cx({
	          'fixedDataTableColumnResizerLineLayout/main': true,
	          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
	          'public/fixedDataTableColumnResizerLine/main': true
	        }),
	        style: style },
	      React.createElement('div', {
	        className: cx('fixedDataTableColumnResizerLineLayout/mouseArea'),
	        style: { height: this.props.height }
	      })
	    );
	  },

	  _onMove: function _onMove( /*number*/deltaX) {
	    if (Locale.isRTL()) {
	      deltaX = -deltaX;
	    }
	    var newWidth = this.state.cursorDelta + deltaX;
	    var newColumnWidth = clamp(newWidth, this.props.minWidth, this.props.maxWidth);

	    // Please note cursor delta is the different between the currently width
	    // and the new width.
	    this.setState({
	      width: newColumnWidth,
	      cursorDelta: newWidth
	    });
	  },

	  _onColumnResizeEnd: function _onColumnResizeEnd() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.props.onColumnResizeEnd(this.state.width, this.props.columnKey);
	  }
	});

	module.exports = FixedDataTableColumnResizeHandle;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableScrollHelper
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PrefixIntervalTree = __webpack_require__(82);
	var clamp = __webpack_require__(70);

	var BUFFER_ROWS = 5;
	var NO_ROWS_SCROLL_RESULT = {
	  index: 0,
	  offset: 0,
	  position: 0,
	  contentHeight: 0
	};

	var FixedDataTableScrollHelper = (function () {
	  function FixedDataTableScrollHelper(
	  /*number*/rowCount,
	  /*number*/defaultRowHeight,
	  /*number*/viewportHeight,
	  /*?function*/rowHeightGetter) {
	    _classCallCheck(this, FixedDataTableScrollHelper);

	    this._rowOffsets = PrefixIntervalTree.uniform(rowCount, defaultRowHeight);
	    this._storedHeights = new Array(rowCount);
	    for (var i = 0; i < rowCount; ++i) {
	      this._storedHeights[i] = defaultRowHeight;
	    }
	    this._rowCount = rowCount;
	    this._position = 0;
	    this._contentHeight = rowCount * defaultRowHeight;
	    this._defaultRowHeight = defaultRowHeight;
	    this._rowHeightGetter = rowHeightGetter ? rowHeightGetter : function () {
	      return defaultRowHeight;
	    };
	    this._viewportHeight = viewportHeight;
	    this.scrollRowIntoView = this.scrollRowIntoView.bind(this);
	    this.setViewportHeight = this.setViewportHeight.bind(this);
	    this.scrollBy = this.scrollBy.bind(this);
	    this.scrollTo = this.scrollTo.bind(this);
	    this.scrollToRow = this.scrollToRow.bind(this);
	    this.setRowHeightGetter = this.setRowHeightGetter.bind(this);
	    this.getContentHeight = this.getContentHeight.bind(this);
	    this.getRowPosition = this.getRowPosition.bind(this);

	    this._updateHeightsInViewport(0, 0);
	  }

	  _createClass(FixedDataTableScrollHelper, [{
	    key: 'setRowHeightGetter',
	    value: function setRowHeightGetter( /*function*/rowHeightGetter) {
	      this._rowHeightGetter = rowHeightGetter;
	    }
	  }, {
	    key: 'setViewportHeight',
	    value: function setViewportHeight( /*number*/viewportHeight) {
	      this._viewportHeight = viewportHeight;
	    }
	  }, {
	    key: 'getContentHeight',
	    value: function getContentHeight() /*number*/{
	      return this._contentHeight;
	    }
	  }, {
	    key: '_updateHeightsInViewport',
	    value: function _updateHeightsInViewport(
	    /*number*/firstRowIndex,
	    /*number*/firstRowOffset) {
	      var top = firstRowOffset;
	      var index = firstRowIndex;
	      while (top <= this._viewportHeight && index < this._rowCount) {
	        this._updateRowHeight(index);
	        top += this._storedHeights[index];
	        index++;
	      }
	    }
	  }, {
	    key: '_updateHeightsAboveViewport',
	    value: function _updateHeightsAboveViewport( /*number*/firstRowIndex) {
	      var index = firstRowIndex - 1;
	      while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
	        var delta = this._updateRowHeight(index);
	        this._position += delta;
	        index--;
	      }
	    }
	  }, {
	    key: '_updateRowHeight',
	    value: function _updateRowHeight( /*number*/rowIndex) /*number*/{
	      if (rowIndex < 0 || rowIndex >= this._rowCount) {
	        return 0;
	      }
	      var newHeight = this._rowHeightGetter(rowIndex);
	      if (newHeight !== this._storedHeights[rowIndex]) {
	        var change = newHeight - this._storedHeights[rowIndex];
	        this._rowOffsets.set(rowIndex, newHeight);
	        this._storedHeights[rowIndex] = newHeight;
	        this._contentHeight += change;
	        return change;
	      }
	      return 0;
	    }
	  }, {
	    key: 'getRowPosition',
	    value: function getRowPosition( /*number*/rowIndex) /*number*/{
	      this._updateRowHeight(rowIndex);
	      return this._rowOffsets.sumUntil(rowIndex);
	    }
	  }, {
	    key: 'scrollBy',
	    value: function scrollBy( /*number*/delta) /*object*/{
	      if (this._rowCount === 0) {
	        return NO_ROWS_SCROLL_RESULT;
	      }
	      var firstRow = this._rowOffsets.greatestLowerBound(this._position);
	      firstRow = clamp(firstRow, 0, Math.max(this._rowCount - 1, 0));
	      var firstRowPosition = this._rowOffsets.sumUntil(firstRow);
	      var rowIndex = firstRow;
	      var position = this._position;

	      var rowHeightChange = this._updateRowHeight(rowIndex);
	      if (firstRowPosition !== 0) {
	        position += rowHeightChange;
	      }
	      var visibleRowHeight = this._storedHeights[rowIndex] - (position - firstRowPosition);

	      if (delta >= 0) {

	        while (delta > 0 && rowIndex < this._rowCount) {
	          if (delta < visibleRowHeight) {
	            position += delta;
	            delta = 0;
	          } else {
	            delta -= visibleRowHeight;
	            position += visibleRowHeight;
	            rowIndex++;
	          }
	          if (rowIndex < this._rowCount) {
	            this._updateRowHeight(rowIndex);
	            visibleRowHeight = this._storedHeights[rowIndex];
	          }
	        }
	      } else if (delta < 0) {
	        delta = -delta;
	        var invisibleRowHeight = this._storedHeights[rowIndex] - visibleRowHeight;

	        while (delta > 0 && rowIndex >= 0) {
	          if (delta < invisibleRowHeight) {
	            position -= delta;
	            delta = 0;
	          } else {
	            position -= invisibleRowHeight;
	            delta -= invisibleRowHeight;
	            rowIndex--;
	          }
	          if (rowIndex >= 0) {
	            var change = this._updateRowHeight(rowIndex);
	            invisibleRowHeight = this._storedHeights[rowIndex];
	            position += change;
	          }
	        }
	      }

	      var maxPosition = this._contentHeight - this._viewportHeight;
	      position = clamp(position, 0, maxPosition);
	      this._position = position;
	      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
	      firstRowIndex = clamp(firstRowIndex, 0, Math.max(this._rowCount - 1, 0));
	      firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
	      var firstRowOffset = firstRowPosition - position;

	      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
	      this._updateHeightsAboveViewport(firstRowIndex);

	      return {
	        index: firstRowIndex,
	        offset: firstRowOffset,
	        position: this._position,
	        contentHeight: this._contentHeight
	      };
	    }
	  }, {
	    key: '_getRowAtEndPosition',
	    value: function _getRowAtEndPosition( /*number*/rowIndex) /*number*/{
	      // We need to update enough rows above the selected one to be sure that when
	      // we scroll to selected position all rows between first shown and selected
	      // one have most recent heights computed and will not resize
	      this._updateRowHeight(rowIndex);
	      var currentRowIndex = rowIndex;
	      var top = this._storedHeights[currentRowIndex];
	      while (top < this._viewportHeight && currentRowIndex >= 0) {
	        currentRowIndex--;
	        if (currentRowIndex >= 0) {
	          this._updateRowHeight(currentRowIndex);
	          top += this._storedHeights[currentRowIndex];
	        }
	      }
	      var position = this._rowOffsets.sumTo(rowIndex) - this._viewportHeight;
	      if (position < 0) {
	        position = 0;
	      }
	      return position;
	    }
	  }, {
	    key: 'scrollTo',
	    value: function scrollTo( /*number*/position) /*object*/{
	      if (this._rowCount === 0) {
	        return NO_ROWS_SCROLL_RESULT;
	      }
	      if (position <= 0) {
	        // If position less than or equal to 0 first row should be fully visible
	        // on top
	        this._position = 0;
	        this._updateHeightsInViewport(0, 0);

	        return {
	          index: 0,
	          offset: 0,
	          position: this._position,
	          contentHeight: this._contentHeight
	        };
	      } else if (position >= this._contentHeight - this._viewportHeight) {
	        // If position is equal to or greater than max scroll value, we need
	        // to make sure to have bottom border of last row visible.
	        var rowIndex = this._rowCount - 1;
	        position = this._getRowAtEndPosition(rowIndex);
	      }
	      this._position = position;

	      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
	      firstRowIndex = clamp(firstRowIndex, 0, Math.max(this._rowCount - 1, 0));
	      var firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
	      var firstRowOffset = firstRowPosition - position;

	      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
	      this._updateHeightsAboveViewport(firstRowIndex);

	      return {
	        index: firstRowIndex,
	        offset: firstRowOffset,
	        position: this._position,
	        contentHeight: this._contentHeight
	      };
	    }

	    /**
	     * Allows to scroll to selected row with specified offset. It always
	     * brings that row to top of viewport with that offset
	     */
	  }, {
	    key: 'scrollToRow',
	    value: function scrollToRow( /*number*/rowIndex, /*number*/offset) /*object*/{
	      rowIndex = clamp(rowIndex, 0, Math.max(this._rowCount - 1, 0));
	      offset = clamp(offset, -this._storedHeights[rowIndex], 0);
	      var firstRow = this._rowOffsets.sumUntil(rowIndex);
	      return this.scrollTo(firstRow - offset);
	    }

	    /**
	     * Allows to scroll to selected row by bringing it to viewport with minimal
	     * scrolling. This that if row is fully visible, scroll will not be changed.
	     * If top border of row is above top of viewport it will be scrolled to be
	     * fully visible on the top of viewport. If the bottom border of row is
	     * below end of viewport, it will be scrolled up to be fully visible on the
	     * bottom of viewport.
	     */
	  }, {
	    key: 'scrollRowIntoView',
	    value: function scrollRowIntoView( /*number*/rowIndex) /*object*/{
	      rowIndex = clamp(rowIndex, 0, Math.max(this._rowCount - 1, 0));
	      var rowBegin = this._rowOffsets.sumUntil(rowIndex);
	      var rowEnd = rowBegin + this._storedHeights[rowIndex];
	      if (rowBegin < this._position) {
	        return this.scrollTo(rowBegin);
	      } else if (this._position + this._viewportHeight < rowEnd) {
	        var position = this._getRowAtEndPosition(rowIndex);
	        return this.scrollTo(position);
	      }
	      return this.scrollTo(this._position);
	    }
	  }]);

	  return FixedDataTableScrollHelper;
	})();

	module.exports = FixedDataTableScrollHelper;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PrefixIntervalTree
	 * 
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(65);

	var parent = function parent(node) {
	  return Math.floor(node / 2);
	};

	var Int32Array = global.Int32Array || function (size) {
	  var xs = [];
	  for (var i = size - 1; i >= 0; --i) {
	    xs[i] = 0;
	  }
	  return xs;
	};

	/**
	 * Computes the next power of 2 after or equal to x.
	 */
	function ceilLog2(x) {
	  var y = 1;
	  while (y < x) {
	    y *= 2;
	  }
	  return y;
	}

	/**
	 * A prefix interval tree stores an numeric array and the partial sums of that
	 * array. It is optimized for updating the values of the array without
	 * recomputing all of the partial sums.
	 *
	 *   - O(ln n) update
	 *   - O(1) lookup
	 *   - O(ln n) compute a partial sum
	 *   - O(n) space
	 *
	 * Note that the sequence of partial sums is one longer than the array, so that
	 * the first partial sum is always 0, and the last partial sum is the sum of the
	 * entire array.
	 */

	var PrefixIntervalTree = (function () {
	  function PrefixIntervalTree(xs) {
	    _classCallCheck(this, PrefixIntervalTree);

	    this._size = xs.length;
	    this._half = ceilLog2(this._size);
	    this._heap = new Int32Array(2 * this._half);

	    var i;
	    for (i = 0; i < this._size; ++i) {
	      this._heap[this._half + i] = xs[i];
	    }

	    for (i = this._half - 1; i > 0; --i) {
	      this._heap[i] = this._heap[2 * i] + this._heap[2 * i + 1];
	    }
	  }

	  _createClass(PrefixIntervalTree, [{
	    key: 'set',
	    value: function set(index, value) {
	      invariant(0 <= index && index < this._size, 'Index out of range %s', index);

	      var node = this._half + index;
	      this._heap[node] = value;

	      node = parent(node);
	      for (; node !== 0; node = parent(node)) {
	        this._heap[node] = this._heap[2 * node] + this._heap[2 * node + 1];
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get(index) {
	      invariant(0 <= index && index < this._size, 'Index out of range %s', index);

	      var node = this._half + index;
	      return this._heap[node];
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	      return this._size;
	    }

	    /**
	     * Returns the sum get(0) + get(1) + ... + get(end - 1).
	     */
	  }, {
	    key: 'sumUntil',
	    value: function sumUntil(end) {
	      invariant(0 <= end && end < this._size + 1, 'Index out of range %s', end);

	      if (end === 0) {
	        return 0;
	      }

	      var node = this._half + end - 1;
	      var sum = this._heap[node];
	      for (; node !== 1; node = parent(node)) {
	        if (node % 2 === 1) {
	          sum += this._heap[node - 1];
	        }
	      }

	      return sum;
	    }

	    /**
	     * Returns the sum get(0) + get(1) + ... + get(inclusiveEnd).
	     */
	  }, {
	    key: 'sumTo',
	    value: function sumTo(inclusiveEnd) {
	      invariant(0 <= inclusiveEnd && inclusiveEnd < this._size, 'Index out of range %s', inclusiveEnd);
	      return this.sumUntil(inclusiveEnd + 1);
	    }

	    /**
	     * Returns the sum get(begin) + get(begin + 1) + ... + get(end - 1).
	     */
	  }, {
	    key: 'sum',
	    value: function sum(begin, end) {
	      invariant(begin <= end, 'Begin must precede end');
	      return this.sumUntil(end) - this.sumUntil(begin);
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) <= t, or
	     * -1 if no such i exists.
	     */
	  }, {
	    key: 'greatestLowerBound',
	    value: function greatestLowerBound(t) {
	      if (t < 0) {
	        return -1;
	      }

	      var node = 1;
	      if (this._heap[node] <= t) {
	        return this._size;
	      }

	      while (node < this._half) {
	        var leftSum = this._heap[2 * node];
	        if (t < leftSum) {
	          node = 2 * node;
	        } else {
	          node = 2 * node + 1;
	          t -= leftSum;
	        }
	      }

	      return node - this._half;
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) < t, or
	     * -1 if no such i exists.
	     */
	  }, {
	    key: 'greatestStrictLowerBound',
	    value: function greatestStrictLowerBound(t) {
	      if (t <= 0) {
	        return -1;
	      }

	      var node = 1;
	      if (this._heap[node] < t) {
	        return this._size;
	      }

	      while (node < this._half) {
	        var leftSum = this._heap[2 * node];
	        if (t <= leftSum) {
	          node = 2 * node;
	        } else {
	          node = 2 * node + 1;
	          t -= leftSum;
	        }
	      }

	      return node - this._half;
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and t <= sumUntil(i), or
	     * size + 1 if no such i exists.
	     */
	  }, {
	    key: 'leastUpperBound',
	    value: function leastUpperBound(t) {
	      return this.greatestStrictLowerBound(t) + 1;
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and t < sumUntil(i), or
	     * size + 1 if no such i exists.
	     */
	  }, {
	    key: 'leastStrictUpperBound',
	    value: function leastStrictUpperBound(t) {
	      return this.greatestLowerBound(t) + 1;
	    }
	  }], [{
	    key: 'uniform',
	    value: function uniform(size, initialValue) {
	      var xs = [];
	      for (var i = size - 1; i >= 0; --i) {
	        xs[i] = initialValue;
	      }

	      return new PrefixIntervalTree(xs);
	    }
	  }, {
	    key: 'empty',
	    value: function empty(size) {
	      return PrefixIntervalTree.uniform(size, 0);
	    }
	  }]);

	  return PrefixIntervalTree;
	})();

	module.exports = PrefixIntervalTree;

	/**
	 * Number of elements in the array
	 */

	/**
	 * Half the size of the heap. It is also the number of non-leaf nodes, and the
	 * index of the first element in the heap. Always a power of 2.
	 */

	/**
	 * Binary heap
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableWidthHelper
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(27);

	function getTotalWidth( /*array*/columns) /*number*/{
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalWidth += columns[i].props.width;
	  }
	  return totalWidth;
	}

	function getTotalFlexGrow( /*array*/columns) /*number*/{
	  var totalFlexGrow = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalFlexGrow += columns[i].props.flexGrow || 0;
	  }
	  return totalFlexGrow;
	}

	function distributeFlexWidth(
	/*array*/columns,
	/*number*/flexWidth) /*object*/{
	  if (flexWidth <= 0) {
	    return {
	      columns: columns,
	      width: getTotalWidth(columns)
	    };
	  }
	  var remainingFlexGrow = getTotalFlexGrow(columns);
	  var remainingFlexWidth = flexWidth;
	  var newColumns = [];
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    var column = columns[i];
	    if (!column.props.flexGrow) {
	      totalWidth += column.props.width;
	      newColumns.push(column);
	      continue;
	    }
	    var columnFlexWidth = Math.floor(column.props.flexGrow / remainingFlexGrow * remainingFlexWidth);
	    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
	    totalWidth += newColumnWidth;

	    remainingFlexGrow -= column.props.flexGrow;
	    remainingFlexWidth -= columnFlexWidth;

	    newColumns.push(React.cloneElement(column, { width: newColumnWidth }));
	  }

	  return {
	    columns: newColumns,
	    width: totalWidth
	  };
	}

	function adjustColumnGroupWidths(
	/*array*/columnGroups,
	/*number*/expectedWidth) /*object*/{
	  var allColumns = [];
	  var i;
	  for (i = 0; i < columnGroups.length; ++i) {
	    React.Children.forEach(columnGroups[i].props.children, function (column) {
	      allColumns.push(column);
	    });
	  }
	  var columnsWidth = getTotalWidth(allColumns);
	  var remainingFlexGrow = getTotalFlexGrow(allColumns);
	  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

	  var newAllColumns = [];
	  var newColumnGroups = [];

	  for (i = 0; i < columnGroups.length; ++i) {
	    var columnGroup = columnGroups[i];
	    var currentColumns = [];

	    React.Children.forEach(columnGroup.props.children, function (column) {
	      currentColumns.push(column);
	    });

	    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
	    var columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth);

	    var newColumnSettings = distributeFlexWidth(currentColumns, columnGroupFlexWidth);

	    remainingFlexGrow -= columnGroupFlexGrow;
	    remainingFlexWidth -= columnGroupFlexWidth;

	    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
	      newAllColumns.push(newColumnSettings.columns[j]);
	    }

	    newColumnGroups.push(React.cloneElement(columnGroup, { width: newColumnSettings.width }));
	  }

	  return {
	    columns: newAllColumns,
	    columnGroups: newColumnGroups
	  };
	}

	function adjustColumnWidths(
	/*array*/columns,
	/*number*/expectedWidth) /*array*/{
	  var columnsWidth = getTotalWidth(columns);
	  if (columnsWidth < expectedWidth) {
	    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
	  }
	  return columns;
	}

	var FixedDataTableWidthHelper = {
	  getTotalWidth: getTotalWidth,
	  getTotalFlexGrow: getTotalFlexGrow,
	  distributeFlexWidth: distributeFlexWidth,
	  adjustColumnWidths: adjustColumnWidths,
	  adjustColumnGroupWidths: adjustColumnGroupWidths
	};

	module.exports = FixedDataTableWidthHelper;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule debounceCore
	 * @typechecks
	 */

	/**
	 * Invokes the given callback after a specified number of milliseconds have
	 * elapsed, ignoring subsequent calls.
	 *
	 * For example, if you wanted to update a preview after the user stops typing
	 * you could do the following:
	 *
	 *   elem.addEventListener('keyup', debounce(this.updatePreview, 250), false);
	 *
	 * The returned function has a reset method which can be called to cancel a
	 * pending invocation.
	 *
	 *   var debouncedUpdatePreview = debounce(this.updatePreview, 250);
	 *   elem.addEventListener('keyup', debouncedUpdatePreview, false);
	 *
	 *   // later, to cancel pending calls
	 *   debouncedUpdatePreview.reset();
	 *
	 * @param {function} func - the function to debounce
	 * @param {number} wait - how long to wait in milliseconds
	 * @param {*} context - optional context to invoke the function in
	 * @param {?function} setTimeoutFunc - an implementation of setTimeout
	 *  if nothing is passed in the default setTimeout function is used
	  * @param {?function} clearTimeoutFunc - an implementation of clearTimeout
	 *  if nothing is passed in the default clearTimeout function is used
	 */
	"use strict";

	function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
	  setTimeoutFunc = setTimeoutFunc || setTimeout;
	  clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
	  var timeout;

	  function debouncer() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    debouncer.reset();

	    var callback = function callback() {
	      func.apply(context, args);
	    };
	    callback.__SMmeta = func.__SMmeta;
	    timeout = setTimeoutFunc(callback, wait);
	  }

	  debouncer.reset = function () {
	    clearTimeoutFunc(timeout);
	  };

	  return debouncer;
	}

	module.exports = debounce;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
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

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnNew.react
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);

	var PropTypes = __webpack_require__(37);

	/**
	 * Component that defines the attributes of table column.
	 */
	var FixedDataTableColumn = createReactClass({
	  statics: {
	    __TableColumn__: true
	  },

	  propTypes: {
	    /**
	     * The horizontal alignment of the table cell content.
	     */
	    align: PropTypes.oneOf(['left', 'center', 'right']),

	    /**
	     * Controls if the column is fixed when scrolling in the X axis.
	     */
	    fixed: PropTypes.bool,

	    /**
	     * The header cell for this column.
	     * This can either be a string a React element, or a function that generates
	     * a React Element. Passing in a string will render a default header cell
	     * with that string. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   columnKey: string // (of the column, if given)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

	    /**
	     * This is the body cell that will be cloned for this column.
	     * This can either be a string a React element, or a function that generates
	     * a React Element. Passing in a string will render a default header cell
	     * with that string. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   rowIndex; number // (the row index of the cell)
	     *   columnKey: string // (of the column, if given)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

	    /**
	     * This is the footer cell for this column.
	     * This can either be a string a React element, or a function that generates
	     * a React Element. Passing in a string will render a default header cell
	     * with that string. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   columnKey: string // (of the column, if given)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

	    /**
	     * This is used to uniquely identify the column, and is not required unless
	     * you a resizing columns. This will be the key given in the
	     * `onColumnResizeEndCallback` on the Table.
	     */
	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	    /**
	     * The pixel width of the column.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * If this is a resizable column this is its minimum pixel width.
	     */
	    minWidth: PropTypes.number,

	    /**
	     * If this is a resizable column this is its maximum pixel width.
	     */
	    maxWidth: PropTypes.number,

	    /**
	     * The grow factor relative to other columns. Same as the flex-grow API
	     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
	     * extra width and distribute it proportionally according to all columns'
	     * flexGrow values. Defaults to zero (no-flexing).
	     */
	    flexGrow: PropTypes.number,

	    /**
	     * Whether the column can be resized with the
	     * FixedDataTableColumnResizeHandle. Please note that if a column
	     * has a flex grow, once you resize the column this will be set to 0.
	     *
	     * This property only provides the UI for the column resizing. If this
	     * is set to true, you will need to set the onColumnResizeEndCallback table
	     * property and render your columns appropriately.
	     */
	    isResizable: PropTypes.bool,

	    /**
	     * Whether cells in this column can be removed from document when outside
	     * of viewport as a result of horizontal scrolling.
	     * Setting this property to true allows the table to not render cells in
	     * particular column that are outside of viewport for visible rows. This
	     * allows to create table with many columns and not have vertical scrolling
	     * performance drop.
	     * Setting the property to false will keep previous behaviour and keep
	     * cell rendered if the row it belongs to is visible.
	     */
	    allowCellsRecycling: PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      allowCellsRecycling: false,
	      fixed: false
	    };
	  },

	  render: function render() {
	    if (true) {
	      throw new Error('Component <FixedDataTableColumn /> should never render');
	    }
	    return null;
	  }
	});

	module.exports = FixedDataTableColumn;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnGroupNew.react
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(27);
	var createReactClass = __webpack_require__(29);

	var PropTypes = __webpack_require__(37);

	/**
	 * Component that defines the attributes of a table column group.
	 */
	var FixedDataTableColumnGroup = createReactClass({
	  statics: {
	    __TableColumnGroup__: true
	  },

	  propTypes: {
	    /**
	     * The horizontal alignment of the table cell content.
	     */
	    align: PropTypes.oneOf(['left', 'center', 'right']),

	    /**
	     * Controls if the column group is fixed when scrolling in the X axis.
	     */
	    fixed: PropTypes.bool,

	    /**
	     * This is the header cell for this column group.
	     * This can either be a string or a React element. Passing in a string
	     * will render a default footer cell with that string. By default, the React
	     * element passed in can expect to receive the following props:
	     *
	     * ```
	     * props: {
	     *   height: number // (supplied from the groupHeaderHeight)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * You can also pass in a function that returns a react elemnt, with the
	     * props object above passed in as the first parameter.
	     */
	    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func])

	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      fixed: false
	    };
	  },

	  render: function render() {
	    if (true) {
	      throw new Error('Component <FixedDataTableColumnGroup /> should never render');
	    }
	    return null;
	  }
	});

	module.exports = FixedDataTableColumnGroup;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellTransition.react
	 */

	/**
	 * TRANSITION SHIM
	 * This acts to provide an intermediate mapping from the old API to the new API.
	 *
	 * When ready, remove this file and rename the providesModule in
	 * FixedDataTableCellNew.react and dependency in FixedDataTableCellGroup.react
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(27);
	var PropTypes = __webpack_require__(37);
	var createReactClass = __webpack_require__(29);

	var cx = __webpack_require__(60);
	var joinClasses = __webpack_require__(79);
	var shallowEqual = __webpack_require__(85);

	var CellDefault = __webpack_require__(78);

	var TransitionCell = createReactClass({

	  propTypes: {
	    label: PropTypes.string, // header, footer
	    className: PropTypes.string,
	    rowIndex: PropTypes.number,
	    rowGetter: PropTypes.func, // cell
	    dataKey: PropTypes.oneOfType([// cell, footer
	    PropTypes.string, PropTypes.number]),
	    cellRenderer: PropTypes.func,
	    cellDataGetter: PropTypes.func,
	    footerDataGetter: PropTypes.func, // footer
	    footerData: PropTypes.any, // footer
	    columnData: PropTypes.any, // cell, header
	    width: PropTypes.number,
	    height: PropTypes.number,
	    isHeaderCell: PropTypes.bool, // header
	    isFooterCell: PropTypes.bool },

	  // footer
	  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) {
	    var update = false;
	    var rowData;
	    if (nextProps.rowGetter) {
	      rowData = nextProps.rowGetter(nextProps.rowIndex);
	      if (this._rowData !== rowData) {
	        update = true;
	      }
	    }

	    var cellData;
	    if (nextProps.dataKey != null) {
	      if (nextProps.cellDataGetter) {
	        cellData = nextProps.cellDataGetter(nextProps.dataKey, rowData);
	      }
	      if (!cellData && rowData) {
	        cellData = rowData[nextProps.dataKey];
	      }
	    }
	    if (this._cellData !== cellData) {
	      update = true;
	    }
	    this._rowData = rowData;
	    this._cellData = cellData;

	    return update || !shallowEqual(nextProps, this.props);
	  },

	  _getCellData: function _getCellData(props) {
	    var dataKey = props.dataKey;
	    if (dataKey == null) {
	      return null;
	    }

	    var rowData;
	    if (props.rowGetter) {
	      rowData = props.rowGetter(props.rowIndex);
	    }

	    if (props.cellDataGetter) {
	      return props.cellDataGetter(dataKey, rowData);
	    }

	    if (rowData) {
	      return rowData[dataKey];
	    }

	    if (props.footerDataGetter) {
	      return props.footerDataGetter()[dataKey];
	    }

	    if (props.footerData) {
	      return props.footerData[dataKey];
	    }

	    if (props.headerDataGetter) {
	      return props.headerDataGetter[dataKey];
	    }
	  },

	  _getRowData: function _getRowData(props) {
	    if (props.rowGetter) {
	      return props.rowGetter(props.rowIndex) || {};
	    }

	    if (props.footerDataGetter) {
	      return props.footerDataGetter() || {};
	    }

	    if (props.footerData) {
	      return props.footerData || {};
	    }

	    return {};
	  },

	  render: function render() {
	    var props = this.props;

	    var cellData = this._getCellData(props);
	    var content = cellData;
	    var rowData = this._getRowData(props);
	    var usingRenderer = !!(props.cellRenderer || props.groupHeaderRenderer);

	    if (props.isHeaderCell || props.isFooterCell) {
	      content = content || props.label;
	    }

	    if (props.cellRenderer) {
	      if (props.isHeaderCell || props.isFooterCell) {
	        content = props.cellRenderer(props.label, props.dataKey, props.columnData, rowData, props.width) || props.label;
	      } else {
	        content = props.cellRenderer(cellData, props.dataKey, rowData, props.rowIndex, props.columnData, props.width);
	      }
	    }

	    if (props.groupHeaderRenderer) {
	      content = props.groupHeaderRenderer(props.label, props.dataKey, // index in children
	      props.groupHeaderData, props.groupHeaderLabels, props.width) || content;
	    }

	    var contentClass = cx('public/fixedDataTableCell/cellContent');

	    if (React.isValidElement(content) && usingRenderer) {
	      content = React.cloneElement(content, {
	        className: joinClasses(content.props.className, contentClass)
	      });
	    } else {
	      return React.createElement(
	        CellDefault,
	        props,
	        content
	      );
	    }

	    var innerStyle = _extends({
	      height: props.height,
	      width: props.width
	    }, props.style);

	    return React.createElement(
	      'div',
	      _extends({}, this.props, {
	        className: joinClasses(cx('fixedDataTableCellLayout/wrap1'), cx('public/fixedDataTableCell/wrap1'), this.props.className),
	        style: innerStyle }),
	      React.createElement(
	        'div',
	        {
	          className: joinClasses(cx('fixedDataTableCellLayout/wrap2'), cx('public/fixedDataTableCell/wrap2')) },
	        React.createElement(
	          'div',
	          {
	            className: joinClasses(cx('fixedDataTableCellLayout/wrap3'), cx('public/fixedDataTableCell/wrap3')) },
	          content
	        )
	      )
	    );
	  }
	});

	module.exports = TransitionCell;

/***/ })
/******/ ])
});
;