(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react/addons"));
	else
		root["ReactDataGrid"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	/* @flow */
	'use strict';

	var Grid = __webpack_require__(32);
	var Row  = __webpack_require__(6);
	var Cell = __webpack_require__(11);

	module.exports = Grid;
	module.exports.Row = Row;
	module.exports.Cell = Cell;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	function ExcelColumn(){"use strict";}
	               
	              
	                
	                                                                                                                                      
	                  


	module.exports = ExcelColumn;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow: mixins */
	/**
	 * @jsx React.DOM


	 */

	'use strict';

	var React = __webpack_require__(1);
	var Perf = React.addons.Perf;

	var hasPerfStarted = false;

	var KeyboardHandlerMixin = {

	  propTypes : {
	  },

	  onKeyDown:function(e                        ){
	    if(this.isCtrlKeyHeldDown(e)){
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    }
	    else if (this.isKeyIdentified(e.key)) {
	      //break up individual keyPress events to have their own specific callbacks
	      //this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    }else if(this.isKeyPrintable(e.keyCode)){
	      this.checkAndCall('onPressChar', e);
	    }
	  },

	  //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable:function(keycode        )         {
	    var valid =
	        (keycode > 47 && keycode < 58)   || // number keys
	        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
	        (keycode > 64 && keycode < 91)   || // letter keys
	        (keycode > 95 && keycode < 112)  || // numpad keys
	        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
	        (keycode > 218 && keycode < 223);   // [\]' (in order)

	    return valid;
	  },

	  isKeyIdentified:function(key        )         {
	    return key !== "Unidentified";
	  },

	  isCtrlKeyHeldDown:function(e                        )         {
	    return e.ctrlKey === true && e.key !== "Control";
	  },

	  checkAndCall:function(methodName        , args     ){
	    if(typeof this[methodName] === 'function'){
	      this[methodName](args);
	    }
	  }
	}



	module.exports = KeyboardHandlerMixin;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var shallowCloneObject            = __webpack_require__(8);
	var merge                         = __webpack_require__(9);
	var isValidElement = __webpack_require__(1).isValidElement;
	var sameColumn = __webpack_require__(16);

	                          
	                           
	                       
	                           
	  

	               
	              
	               
	                
	  

	/**
	 * Update column metrics calculation.
	 *
	 * @param {ColumnMetricsType} metrics
	 */
	function calculate(metrics                   )                    {
	  var width = 0;
	  var unallocatedWidth = metrics.totalWidth;

	  var deferredColumns = [];
	  var columns = metrics.columns.map(shallowCloneObject);

	  var i, len, column;

	  // compute width for columns which specify width
	  for (i = 0, len = columns.length; i < len; i++) {
	    column = columns[i];

	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width.toString())) {
	        column.width = Math.floor(
	          column.width / 100 * metrics.totalWidth);
	      }
	      unallocatedWidth -= column.width;
	      width += column.width;
	    } else {
	      deferredColumns.push(column);
	    }

	  }

	  // compute width for columns which doesn't specify width
	  for (i = 0, len = deferredColumns.length; i < len; i++) {
	    column = deferredColumns[i];

	    if (unallocatedWidth <= 0) {
	      column.width = metrics.minColumnWidth;
	    } else {
	      column.width = Math.floor(unallocatedWidth / deferredColumns.length);
	    }
	    width += column.width;
	  }

	  // compute left offset
	  var left = 0;
	  for (i = 0, len = columns.length; i < len; i++) {
	    column = columns[i];
	    column.left = left;
	    left += column.width;
	  }

	  return {
	    columns:columns,
	    width:width,
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
	function resizeColumn(metrics                   , index        , width        )                    {
	  var column = metrics.columns[index];
	  metrics = shallowCloneObject(metrics);
	  metrics.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

	  metrics.columns.splice(index, 1, updatedColumn);

	  return calculate(metrics);
	}

	function sameColumns(prevColumns               , nextColumns               , sameColumn                                   )          {
	  var i, len, column;
	  var prevColumnsByKey                           = {};
	  var nextColumnsByKey                           = {};


	  if(prevColumns.length !== nextColumns.length){
	    return false;
	  }

	  for (i = 0, len = prevColumns.length; i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = nextColumns.length; i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !sameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = prevColumns.length; i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = { calculate:calculate, resizeColumn:resizeColumn, sameColumn:sameColumn, sameColumns:sameColumns };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow mixin and invarient splat */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React               = __webpack_require__(1);
	var emptyFunction       = __webpack_require__(7);
	var shallowCloneObject  = __webpack_require__(8);

	var contextTypes = {
	  metricsComputator: React.PropTypes.object
	};

	var MetricsComputatorMixin = {

	  childContextTypes: contextTypes,

	  getChildContext:function()                           {
	    return {metricsComputator: this};
	  },

	  getMetricImpl:function(name        )      {
	    return this._DOMMetrics.metrics[name].value;
	  },

	  registerMetricsImpl:function(component                , metrics     )                      {
	    var getters = {};
	    var s = this._DOMMetrics;

	    for (var name in metrics) {
	      if(s.metrics[name] !== undefined) {
	          throw new Error('DOM metric ' + name + ' is already defined');
	      }
	      s.metrics[name] = {component:component, computator: metrics[name].bind(component)};
	      getters[name] = this.getMetricImpl.bind(null, name);
	    }

	    if (s.components.indexOf(component) === -1) {
	      s.components.push(component);
	    }

	    return getters;
	  },

	  unregisterMetricsFor:function(component                ) {
	    var s = this._DOMMetrics;
	    var idx = s.components.indexOf(component);

	    if (idx > -1) {
	      s.components.splice(idx, 1);

	      var name;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        delete s.metrics[name];
	      }
	    }
	  },

	  updateMetrics:function() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
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

	  componentWillMount:function() {
	    this._DOMMetrics = {
	      metrics: {},
	      components: []
	    };
	  },

	  componentDidMount:function() {
	    if(window.addEventListener){
	      window.addEventListener('resize', this.updateMetrics);
	    }else{
	      window.attachEvent('resize', this.updateMetrics);
	    }
	    this.updateMetrics();
	  },

	  componentWillUnmount:function() {
	    window.removeEventListener('resize', this.updateMetrics);
	  }

	};

	var MetricsMixin = {

	  contextTypes: contextTypes,

	  componentWillMount:function() {
	    if (this.DOMMetrics) {
	      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

	      this.DOMMetrics = {};
	      for (var name in this._DOMMetricsDefs) {
	        this.DOMMetrics[name] = emptyFunction;
	      }
	    }
	  },

	  componentDidMount:function() {
	    if (this.DOMMetrics) {
	      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
	    }
	  },

	  componentWillUnmount:function()      {
	    if (!this.registerMetricsImpl) {
	      return this.context.metricsComputator.unregisterMetricsFor(this);
	    }
	    if (this.hasOwnProperty('DOMMetrics')) {
	        delete this.DOMMetrics;
	    }
	  },

	  registerMetrics:function(metrics     )      {
	    if (this.registerMetricsImpl) {
	      return this.registerMetricsImpl(this, metrics);
	    } else {
	      return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	    }
	  },

	  getMetric:function(name        )      {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    } else {
	      return this.context.metricsComputator.getMetricImpl(name);
	    }
	  }
	};

	module.exports = {
	  MetricsComputatorMixin:MetricsComputatorMixin,
	  MetricsMixin:MetricsMixin
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow  */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var Cell           = __webpack_require__(11);
	var cloneWithProps = React.addons.cloneWithProps;
	var ColumnMetrics    = __webpack_require__(4);

	                     
	                 
	              
	               
	           
	                     
	                       
	  

	                  
	          
	                               
	                                              
	                              
	   
	  

	var Row = React.createClass({displayName: "Row",

	  propTypes: {
	    height: React.PropTypes.number.isRequired,
	    columns: React.PropTypes.array.isRequired,
	    row: React.PropTypes.object.isRequired,
	    cellRenderer: React.PropTypes.func,
	    isSelected: React.PropTypes.bool,
	    idx : React.PropTypes.number.isRequired,
	    expandedRows : React.PropTypes.arrayOf(React.PropTypes.object)
	  },

	  render:function()                {
	    var className = cx(
	      'react-grid-Row',
	      ("react-grid-Row--" + (this.props.idx % 2 === 0 ? 'even' : 'odd'))
	    );

	    var style = {
	      height: this.getRowHeight(this.props),
	      overflow: 'hidden'
	    };

	    var cells = this.getCells();
	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style, onDragEnter: this.handleDragEnter}), 
	        React.isValidElement(this.props.row) ?
	          this.props.row : cells
	      )
	    );
	  },

	  getCells:function()                      {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      var column = this.props.columns[i];
	      var cell = this.renderCell({
	        ref:i,
	        key:i,
	        idx:i,
	        rowIdx:this.props.idx,
	        value:this.getCellValue(column.key || i),
	        column:column,
	        height:this.getRowHeight(),
	        formatter:column.formatter,
	        cellMetaData : this.props.cellMetaData,
	        //TODO passing the row to the cell??
	        rowData : this.props.row});
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  getRowHeight:function()         {
	    var rows = this.props.expandedRows || null;
	    if(rows && this.props.key) {
	      var row = rows[this.props.key] || null;
	      if(row) {
	        return row.height;
	      }
	    }
	    return this.props.height;
	  },

	  getCellValue:function(key                 )      {
	    if(key === 'select-row'){
	      return this.props.isSelected;
	    }else{
	      return this.props.row[key]
	    }
	  },

	  renderCell:function(props     )               {
	    if(typeof this.props.cellRenderer == 'function') {
	      this.props.cellRenderer.call(this, props);
	    }
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return cloneWithProps(this.props.cellRenderer, props);
	    } else {
	      return this.props.cellRenderer(props);
	    }
	  },

	  getDefaultProps:function()                       {
	    return {
	      cellRenderer: Cell,
	      isSelected: false,
	      height : 35
	    };
	  },


	  setScrollLeft:function(scrollLeft        ) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  },

	  doesRowContainSelectedCell:function(props     )         {
	    var selected = props.cellMetaData.selected;
	    if(selected && selected.rowIdx === props.idx){
	      return true;
	    }else{
	      return false;
	    }
	  },

	  willRowBeDraggedOver:function(props     )         {
	    var dragged = props.cellMetaData.dragged;
	    return  dragged != null && (dragged.rowIdx || dragged.complete === true);
	  },

	  hasRowBeenCopied:function()         {
	    var copied = this.props.cellMetaData.copied;
	    return copied != null && copied.rowIdx === this.props.idx;
	  },

	  shouldComponentUpdate:function(nextProps     )          {
	    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
	    this.doesRowContainSelectedCell(this.props)          ||
	    this.doesRowContainSelectedCell(nextProps)           ||
	    this.willRowBeDraggedOver(nextProps)                 ||
	    nextProps.row !== this.props.row                     ||
	    this.hasRowBeenCopied()                              ||
	    nextProps.height !== this.props.height;
	  },

	  handleDragEnter:function(){
	    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
	    if(handleDragEnterRow){
	      handleDragEnterRow(this.props.idx);
	    }
	  }

	});

	module.exports = Row;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction

	 */
	'use strict';

	var copyProperties = __webpack_require__(34);

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});

	module.exports = emptyFunction;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	function shallowCloneObject(obj     )      {
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule merge

	 */

	"use strict";

	/**
	 * Shallow merges two structures into a return value, without mutating either.
	 *
	 * @param {?object} one Optional object with properties to merge from.
	 * @param {?object} two Optional object with properties to merge from.
	 * @return {object} The shallow extension of one by two.
	 */
	var merge = function(one     , two     )      {
	  var result = {};
	  if (one != null) {
	    Object.assign(result, one);
	  }
	  if (two != null) {
	    Object.assign(result, two);
	  }
	  return result;
	};

	function mergeFallback(obj1     ,obj2     )     {
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	}

	module.exports = Object.assign ? merge : mergeFallback;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	function shallowEqual(a     , b     )          {
	  if (a === b) {
	    return true;
	  }

	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k) &&
	        (!b.hasOwnProperty(k) || a[k] !== b[k])) {
	      return false;
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var cloneWithProps = React.addons.cloneWithProps;
	var EditorContainer = __webpack_require__(31);
	var ExcelColumn  = __webpack_require__(2);

	var Cell = React.createClass({displayName: "Cell",

	  propTypes : {
	    rowIdx : React.PropTypes.number.isRequired,
	    idx : React.PropTypes.number.isRequired,
	    selected : React.PropTypes.shape({
	      idx : React.PropTypes.number.isRequired,
	    }),
	    tabIndex : React.PropTypes.number,
	    ref : React.PropTypes.string,
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    isExpanded: React.PropTypes.bool,
	    cellMetaData: React.PropTypes.shape({selected: React.PropTypes.object.isRequired, copied: React.PropTypes.object, dragged: React.PropTypes.object, onCellClick: React.PropTypes.func}).isRequired,
	    handleDragStart: React.PropTypes.func,
	    className: React.PropTypes.string
	  },

	  getDefaultProps : function()                                                        {
	    return {
	      tabIndex : -1,
	      ref : "cell",
	      isExpanded: false
	    }
	  },

	  componentDidMount: function() {
	    this.checkFocus();
	  },

	  componentDidUpdate: function(prevProps     , prevState     ) {
	    this.checkFocus();
	    var dragged = this.props.cellMetaData.dragged;
	    if(dragged && dragged.complete === true){
	      this.props.cellMetaData.handleTerminateDrag();
	    }
	  },

	  shouldComponentUpdate:function(nextProps     , nextState     )          {
	    return this.props.column.width !== nextProps.column.width
	    || this.props.value !== nextProps.value
	    || this.props.height !== nextProps.height
	    || this.props.rowIdx !== nextProps.rowIdx
	    || this.isCellSelectionChanging(nextProps)
	    || this.isDraggedCellChanging(nextProps);
	  },

	  getStyle:function()                                                                 {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left
	    };
	    return style;
	  },

	  render:function()                {
	    var style = this.getStyle();

	    var className = this.getCellClass();

	    var cellContent = this.renderCellContent({
	      value : this.props.value,
	      column : this.props.column,
	      rowIdx : this.props.rowIdx,
	      isExpanded : this.props.isExpanded
	    });

	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: className, style: style, onClick: this.onCellClick}), 
	      cellContent, 
	      React.createElement("div", {className: "drag-handle", draggable: "true"}
	      )
	      )
	    );
	  },

	  renderCellContent:function(props     )               {
	    var CellContent;
	    var Formatter = this.getFormatter();
	    if(React.isValidElement(Formatter)){
	      CellContent = cloneWithProps(Formatter, props);
	    }else{
	      CellContent = React.createElement(SimpleCellFormatter, {value: this.props.value})
	    }
	    return (React.createElement("div", {
	      className: "react-grid-Cell__value"}, CellContent, " ", this.props.cellControls))
	    },

	  isSelected: function()          {
	    var meta = this.props.cellMetaData;
	    if(meta == null || meta.selected == null) { return false; }

	    return (
	      meta.selected
	      && meta.selected.rowIdx === this.props.rowIdx
	      && meta.selected.idx === this.props.idx
	    );
	  },

	  isActive:function()         {
	    var meta = this.props.cellMetaData;
	    if(meta == null || meta.selected == null) { return false; }
	    return this.isSelected() && meta.selected.active === true;
	  },

	  isCellSelectionChanging:function(nextProps                                                        )          {
	    var meta = this.props.cellMetaData;
	    if(meta == null || meta.selected == null) { return false; }
	    var nextSelected = nextProps.cellMetaData.selected;
	    if(meta.selected && nextSelected){
	      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
	    }else{
	      return true;
	    }
	  },

	  getFormatter:function()                {
	    var col = this.props.column;
	    if(this.isActive()){
	      return React.createElement(EditorContainer, {rowIdx: this.props.rowIdx, idx: this.props.idx, cellMetaData: this.props.cellMetaData, column: col, height: this.props.height});
	    }else{
	      return this.props.column.formatter;
	    }
	  },

	  onCellClick:function(){
	    var meta = this.props.cellMetaData;
	    if(meta != null && meta.onCellClick != null) {
	      meta.onCellClick({rowIdx : this.props.rowIdx, idx : this.props.idx});
	    }
	  },

	  checkFocus: function() {
	    if (this.isSelected() && !this.isActive()) {
	      this.getDOMNode().focus();
	    }
	  },

	  getCellClass : function()         {
	    var className = cx(
	      'react-grid-Cell',
	      this.props.className,
	      this.props.column.locked ? 'react-grid-Cell--locked' : null
	    );

	    var extraClasses = cx({
	      'selected' : this.isSelected() && !this.isActive() ,
	      'editing' : this.isActive(),
	      'copied' : this.isCopied(),
	      'active-drag-cell' : this.isSelected() || this.isDraggedOver(),
	      'is-dragged-over-up' :  this.isDraggedOverUpwards(),
	      'is-dragged-over-down' :  this.isDraggedOverDownwards(),
	      'was-dragged-over' : this.wasDraggedOver()
	    });
	    return className + ' ' + extraClasses;
	  },


	  setScrollLeft:function(scrollLeft        ) {
	    var ctrl      = this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
	    if (ctrl.isMounted()) {
	      var node = this.getDOMNode();
	      var transform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	      node.style.webkitTransform = transform;
	      node.style.transform = transform;
	    }
	  },

	  isCopied:function()         {
	    var copied = this.props.cellMetaData.copied;
	    return (
	      copied
	      && copied.rowIdx === this.props.rowIdx
	      && copied.idx === this.props.idx
	    );
	  },

	  isDraggedOver:function()         {
	  var dragged = this.props.cellMetaData.dragged;
	    return (

	      dragged &&
	      dragged.overRowIdx === this.props.rowIdx
	      && dragged.idx === this.props.idx
	    )
	  },

	  wasDraggedOver:function()         {
	    var dragged = this.props.cellMetaData.dragged;
	    return (
	      dragged
	      && ((dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx)
	      ||  (dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx))
	      && dragged.idx === this.props.idx
	    );
	  },

	  isDraggedCellChanging:function(nextProps     )         {
	    var isChanging;
	    var dragged = this.props.cellMetaData.dragged;
	    var nextDragged = nextProps.cellMetaData.dragged;
	    if(dragged){
	      isChanging = (nextDragged && this.props.idx === nextDragged.idx)
	      || (dragged && this.props.idx === dragged.idx);
	      return isChanging;
	    }else{
	      return false;
	    }
	  },

	  isDraggedOverUpwards:function()         {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
	  },

	  isDraggedOverDownwards:function()         {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
	  }

	});

	var SimpleCellFormatter = React.createClass({displayName: "SimpleCellFormatter",

	  propTypes : {
	    value :  React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
	  },

	  render:function()               {
	    return React.createElement("span", null, this.props.value)
	  }
	})

	module.exports = Cell;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var keyboardHandlerMixin    = __webpack_require__(3);
	var ExcelColumn             = __webpack_require__(2);

	var SimpleTextEditor = React.createClass({displayName: "SimpleTextEditor",

	  propTypes : {
	    onKeyDown : React.PropTypes.func.isRequired,
	    value : React.PropTypes.any.isRequired,
	    onBlur : React.PropTypes.func.isRequired,
	    column :  React.PropTypes.shape(ExcelColumn).isRequired
	  },

	  getValue:function()     {
	    var updated = {};
	    updated[this.props.column.key] = this.refs.input.getDOMNode().value;
	    return updated;
	  },

	  getInputNode:function()                  {
	    return this.getDOMNode();
	  },

	  render:function()                {
	    return (React.createElement("input", {ref: "input", type: "text", onBlur: this.props.onBlur, className: "form-control", defaultValue: this.props.value, onKeyDown: this.props.onKeyDown}));
	  }

	});

	module.exports = SimpleTextEditor;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM
	 */
	"use strict";

	var React          = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var PropTypes      = React.PropTypes;
	var cloneWithProps = React.addons.cloneWithProps;
	var shallowEqual   = __webpack_require__(10);
	var emptyFunction  = __webpack_require__(7);
	var ScrollShim     = __webpack_require__(24);
	var Row            = __webpack_require__(6);
	var ExcelColumn = __webpack_require__(2);
	var Canvas = React.createClass({displayName: "Canvas",
	  mixins: [ScrollShim],

	  propTypes: {
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    height: PropTypes.number.isRequired,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    rowsCount: PropTypes.number.isRequired,
	    rowGetter: PropTypes.oneOfType([
	      PropTypes.func.isRequired,
	      PropTypes.array.isRequired
	    ]),
	    onRows: PropTypes.func,
	    columns: PropTypes.arrayOf(ExcelColumn).isRequired
	  },

	  render:function()                {
	    var displayStart = this.state.displayStart;
	    var displayEnd = this.state.displayEnd;
	    var rowHeight = this.props.rowHeight;
	    var length = this.props.rowsCount;

	    var rows = this.getRows(displayStart, displayEnd)
	        .map(function(row, idx)  {return this.renderRow({
	          key: displayStart + idx,
	          ref: idx,
	          idx: displayStart + idx,
	          row: row,
	          height: rowHeight,
	          columns: this.props.columns,
	          isSelected : this.isRowSelected(displayStart + idx),
	          expandedRows : this.props.expandedRows,
	          cellMetaData : this.props.cellMetaData
	        });}.bind(this));

	    this._currentRowsLength = rows.length;

	    if (displayStart > 0) {
	      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
	    }

	    if (length - displayEnd > 0) {
	      rows.push(
	        this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
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

	    return (
	      React.createElement("div", {
	        style: style, 
	        onScroll: this.onScroll, 
	        className: cx("react-grid-Canvas", this.props.className)}, 
	        React.createElement("div", {style: {width: this.props.width, overflow: 'hidden'}}, 
	          rows
	        )
	      )
	    );
	  },

	  renderRow:function(props     ) {
	    var RowsRenderer = this.props.rowRenderer;
	    if(typeof RowsRenderer === 'function') {
	      return React.createElement(RowsRenderer, React.__spread({},  props));
	    }
	    else if (React.isValidElement(this.props.rowRenderer)) {
	      return cloneWithProps(this.props.rowRenderer, props);
	    }
	  },

	  renderPlaceholder:function(key        , height        )                {
	    return (
	      React.createElement("div", {key: key, style: {height: height}}, 
	        this.props.columns.map(
	          function(column, idx)  {return React.createElement("div", {style: {width: column.width}, key: idx});})
	      )
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      rowRenderer: Row,
	      onRows: emptyFunction
	    };
	  },

	  isRowSelected:function(rowIdx        )         {
	   return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;
	  },

	  _currentRowsLength : 0,
	  _currentRowsRange : { start: 0, end: 0 },
	  _scroll : { scrollTop : 0, scrollLeft: 0 },

	  getInitialState:function() {
	    return {
	      shouldUpdate: true,
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd
	    };
	  },

	  componentWillMount:function() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = {start: 0, end: 0};
	    this._scroll = {scrollTop : 0, scrollLeft: 0};
	  },

	  componentDidMount:function() {
	    this.onRows();
	  },

	  componentDidUpdate:function(nextProps     ) {
	    if (this._scroll !== {start: 0, end: 0}) {
	      this.setScrollLeft(this._scroll.scrollLeft);
	    }
	    this.onRows();
	  },

	  componentWillUnmount:function() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = {start: 0, end: 0};
	    this._scroll = {scrollTop : 0, scrollLeft: 0};
	  },

	  componentWillReceiveProps:function(nextProps     ) {
	    if(nextProps.rowsCount > this.props.rowsCount){
	      this.getDOMNode().scrollTop =nextProps.rowsCount * this.props.rowHeight;
	    }
	    var shouldUpdate = !(nextProps.visibleStart > this.state.displayStart
	                        && nextProps.visibleEnd < this.state.displayEnd)
	                        || nextProps.rowsCount !== this.props.rowsCount
	                        || nextProps.rowHeight !== this.props.rowHeight
	                        || nextProps.columns !== this.props.columns
	                        || nextProps.width !== this.props.width
	                        || !shallowEqual(nextProps.style, this.props.style);

	    if (shouldUpdate) {
	      this.setState({
	        shouldUpdate: true,
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd
	      });
	    } else {
	      this.setState({shouldUpdate: false});
	    }
	  },

	  shouldComponentUpdate:function(nextProps     , nextState     )          {
	    return !nextState || nextState.shouldUpdate;
	  },

	  onRows:function() {
	    if (this._currentRowsRange !== {start: 0, end: 0}) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = {start: 0, end: 0};
	    }
	  },

	  getRows:function(displayStart        , displayEnd        )             {
	    this._currentRowsRange = {start: displayStart, end: displayEnd};
	    if (Array.isArray(this.props.rowGetter)) {
	      return this.props.rowGetter.slice(displayStart, displayEnd);
	    } else {
	      var rows = [];
	      for (var i = displayStart; i <= displayEnd; i++){
	        rows.push(this.props.rowGetter(i));
	      }
	      return rows;
	    }
	  },

	  setScrollLeft:function(scrollLeft        ) {
	    if (this._currentRowsLength !== 0) {
	      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
	        if(this.refs[i]) {
	          this.refs[i].setScrollLeft(scrollLeft);
	        }
	      }
	    }
	  },

	  getScroll:function()                                          {
	    var $__0=   this.getDOMNode(),scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    return {scrollTop:scrollTop, scrollLeft:scrollLeft};
	  },

	  onScroll:function(e     ) {
	    this.appendScrollShim();
	    var $__0=   e.target,scrollTop=$__0.scrollTop,scrollLeft=$__0.scrollLeft;
	    var scroll = {scrollTop:scrollTop, scrollLeft:scrollLeft};
	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	  }
	});


	module.exports = Canvas;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow objects as a map */
	var isValidElement = __webpack_require__(1).isValidElement;
	module.exports =
	function sameColumn(a        , b        )          {
	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if ((typeof a[k] === 'function' && typeof b[k] === 'function') || (isValidElement(a[k]) && isValidElement(b[k]))) {
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow mixins */

	var ColumnMetrics        = __webpack_require__(4);
	var DOMMetrics           = __webpack_require__(5);
	Object.assign            = __webpack_require__(13);
	var PropTypes            = __webpack_require__(1).PropTypes;


	                          
	                           
	                       
	                           
	  

	function Column(){"use strict";}
	              
	               
	                
	;

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.arrayOf(Column),
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth:function()         {
	      return this.getDOMNode().offsetWidth - 2;
	    }
	  },

	  getDefaultProps:function()                                                                               {
	    return {
	      minColumnWidth: 80,
	      columnEquality: ColumnMetrics.sameColumn
	    };
	  },

	  getInitialState:function()                    {
	    return this.getColumnMetricsType(this.props, true);
	  },

	  componentWillReceiveProps:function(nextProps                   ) {
	    if (nextProps.columns) {
	      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)) {
	        this.setState(this.getColumnMetricsType(nextProps));
	      } else {
	        var index = {};
	        this.state.columns.columns.forEach(function(c)  {
	          index[c.key] = {width: c.width, left: c.left};
	        });
	        var nextColumns = Object.assign(this.state.columns, {
	          columns: nextProps.columns.map(function(c)  {return Object.assign(c, index[c.key]);})
	        });
	        this.setState({columns: nextColumns});
	      }
	    }
	  },

	  getColumnMetricsType:function(props                   , initial         )                                                    {
	    var totalWidth = initial ? initial : this.DOMMetrics.gridWidth();
	    return {
	      columns: ColumnMetrics.calculate({
	        columns: props.columns,
	        totalWidth: totalWidth,
	        minColumnWidth: props.minColumnWidth
	      }),
	      gridWidth: totalWidth
	    };
	  },

	  metricsUpdated:function() {
	    this.setState(this.getColumnMetricsType(this.props));
	  },

	  onColumnResize:function(index        , width        ) {
	    var columns = ColumnMetrics.resizeColumn(this.state.columns, index, width);
	    this.setState({columns:columns});
	  }
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow need   */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React         = __webpack_require__(1);
	var PropTypes     = React.PropTypes;
	var emptyFunction = __webpack_require__(7);

	var Draggable = React.createClass({displayName: "Draggable",

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
	  },

	  render:function()                {
	    var Component = this.props.component;
	    return (
	      React.createElement(Component, React.__spread({},  this.props, {onMouseDown: this.onMouseDown}))
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      component: React.DOM.div,
	      onDragStart: emptyFunction.thatReturnsTrue,
	      onDragEnd: emptyFunction,
	      onDrag: emptyFunction
	    };
	  },

	  getInitialState:function()               {
	    return {
	      drag: null
	    };
	  },

	  onMouseDown:function(e                     ) {
	    var drag = this.props.onDragStart(e);

	    if (drag === null && e.button !== 0) {
	      return;
	    }

	    window.addEventListener('mouseup', this.onMouseUp);
	    window.addEventListener('mousemove', this.onMouseMove);

	    this.setState({drag:drag});
	  },

	  onMouseMove:function(e                ) {
	    if (this.state.drag === null) {
	      return;
	    }

	    if (e.stopPropagation) {
	      e.stopPropagation();
	    }

	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    this.props.onDrag(e);
	  },

	  onMouseUp:function(e                ) {
	    this.cleanUp();
	    this.props.onDragEnd(e, this.state.drag);
	    this.setState({drag: null});
	  },

	  componentWillUnmount:function() {
	    this.cleanUp();
	  },

	  cleanUp:function() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	  }
	});

	module.exports = Draggable;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React                = __webpack_require__(1);
	var PropTypes            = React.PropTypes;
	var Header               = __webpack_require__(21);
	var Viewport             = __webpack_require__(25);
	var DOMMetrics           = __webpack_require__(5);
	var GridScrollMixin      = __webpack_require__(20);
	var ColumnMetricsMixin      = __webpack_require__(17);
	var ExcelColumn = __webpack_require__(2);

	var Grid = React.createClass({displayName: "Grid",
	  mixins: [
	    GridScrollMixin,
	    ColumnMetricsMixin,
	    DOMMetrics.MetricsComputatorMixin
	  ],

	  propTypes: {
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.arrayOf(ExcelColumn).isRequired,
	    minHeight: PropTypes.number,
	    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowHeight: PropTypes.number,
	    rowRenderer: PropTypes.func,
	    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowsCount: PropTypes.number,
	    onRows: PropTypes.func,
	    rowOffsetHeight: PropTypes.number.isRequired,
	    onViewportKeydown : PropTypes.func.isRequired,
	    onViewportDragStart : PropTypes.func.isRequired,
	    onViewportDragEnd : PropTypes.func.isRequired
	  },

	  getStyle: function()                                                                             {
	    return{
	      overflow: 'hidden',
	      outline: 0,
	      position: 'relative',
	      minHeight: this.props.minHeight
	    }
	  },

	  render:function()                {
	    var headerRows = this.props.headerRows || [{ref : 'row'}];
	    return (
	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: "react-grid-Grid"}), 
	        React.createElement(Header, {
	          ref: "header", 
	          columns: this.state.columns, 
	          onColumnResize: this.onColumnResize, 
	          height: this.props.rowHeight, 
	          totalWidth: this.DOMMetrics.gridWidth(), 
	          headerRows: headerRows}
	          ), 
	          React.createElement("div", {onKeyDown: this.props.onViewportKeydown, onDragStart: this.props.onViewportDragStart, onDragEnd: this.props.onViewportDragEnd}, 
	            React.createElement(Viewport, {
	              ref: "viewport", 
	              width: this.state.columns.width, 
	              rowHeight: this.props.rowHeight, 
	              rowRenderer: this.props.rowRenderer, 
	              rowGetter: this.props.rowGetter, 
	              rowsCount: this.props.rowsCount, 
	              selectedRows: this.props.selectedRows, 
	              expandedRows: this.props.expandedRows, 
	              columns: this.state.columns, 
	              totalWidth: this.DOMMetrics.gridWidth(), 
	              onScroll: this.onScroll, 
	              onRows: this.props.onRows, 
	              cellMetaData: this.props.cellMetaData, 
	              rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length, 
	              minHeight: this.props.minHeight}
	              )
	          )
	      )
	    );
	  },

	  getDefaultProps:function() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  },
	});

	module.exports = Grid;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow mixins */
	module.exports = {

	  componentDidMount:function() {
	    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
	    this._onScroll();
	  },

	  componentDidUpdate:function() {
	    this._onScroll();
	  },

	  componentWillMount:function() {
	    this._scrollLeft = undefined;
	  },

	  componentWillUnmount:function() {
	    this._scrollLeft = undefined;
	  },

	  onScroll:function(props                      ) {
	    if (this._scrollLeft !== props.scrollLeft) {
	      this._scrollLeft = props.scrollLeft;
	      this._onScroll();
	    }
	  },

	  _onScroll:function() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      this.refs.viewport.setScrollLeft(this._scrollLeft);
	    }
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React               = __webpack_require__(1);
	var cx                  = React.addons.classSet;
	var shallowCloneObject  = __webpack_require__(8);
	var ColumnMetrics       = __webpack_require__(4);
	var HeaderRow           = __webpack_require__(23);

	               
	               
	 

	var Header = React.createClass({displayName: "Header",
	  propTypes: {
	    columns: React.PropTypes.shape({  width: React.PropTypes.number.isRequired }).isRequired,
	    totalWidth: React.PropTypes.number,
	    height: React.PropTypes.number.isRequired,
	    headerRows : React.PropTypes.array.isRequired
	  },

	  render:function()                {
	    var state = this.state.resizing || this.props;

	    var className = cx({
	      'react-grid-Header': true,
	      'react-grid-Header--resizing': !!this.state.resizing
	    });
	    var headerRows = this.getHeaderRows();

	    return (

	      React.createElement("div", React.__spread({},  this.props, {style: this.getStyle(), className: className}), 
	        headerRows
	      )
	    );
	  },

	  shouldComponentUpdate : function(nextProps     , nextState     )         {
	    var update =  !(ColumnMetrics.sameColumns(this.props.columns.columns, nextProps.columns.columns, ColumnMetrics.sameColumn))
	    || this.props.totalWidth != nextProps.totalWidth
	    || (this.props.headerRows.length != nextProps.headerRows.length)
	    || (this.state.resizing != nextState.resizing);

	    return update;
	  },

	  getHeaderRows:function()                  {
	    var state = this.state.resizing || this.props;
	    var headerRows = [];
	    this.props.headerRows.forEach((function(row, index){
	      var headerRowStyle = {
	        position: 'absolute',
	        top: this.props.height * index,
	        left: 0,
	        width: this.props.totalWidth,
	        overflow : 'hidden'
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref, 
	        ref: row.ref, 
	        style: headerRowStyle, 
	        onColumnResize: this.onColumnResize, 
	        onColumnResizeEnd: this.onColumnResizeEnd, 
	        width: state.columns.width, 
	        height: row.height || this.props.height, 
	        columns: state.columns.columns, 
	        resizing: state.column, 
	        headerCellRenderer: row.headerCellRenderer}
	        ))
	    }).bind(this));
	    return headerRows;
	  },

	  getInitialState:function()                  {
	    return {resizing: null};
	  },

	  componentWillReceiveProps:function(nextProps     ) {
	    this.setState({resizing: null});
	  },

	  onColumnResize:function(column        , width        ) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos != null) {
	      var resizing = {
	        columns: shallowCloneObject(state.columns)
	      };
	      resizing.columns = ColumnMetrics.resizeColumn(
	          resizing.columns, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (resizing.columns.totalWidth < state.columns.totalWidth) {
	        resizing.columns.totalWidth = state.columns.totalWidth;
	      }

	      resizing.column = resizing.columns.columns[pos];
	      this.setState({resizing:resizing});
	    }
	  },

	  getColumnPosition:function(column        )          {
	    var state = this.state.resizing || this.props;
	    var pos = state.columns.columns.indexOf(column);
	    return pos === -1 ? null : pos;
	  },

	  onColumnResizeEnd:function(column        , width        ) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },

	  setScrollLeft:function(scrollLeft        ) {
	    var node = this.refs.row.getDOMNode();
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	  },

	  getStyle:function()                                     {
	    return {
	      position: 'relative',
	      height: this.props.height * this.props.headerRows.length,
	      overflow : 'hidden'
	    };
	  },
	});


	module.exports = Header;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow unkwon */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React       = __webpack_require__(1);
	var cx          = React.addons.classSet;
	var Draggable   = __webpack_require__(18);
	var PropTypes   = React.PropTypes;
	var ExcelColumn = __webpack_require__(2);
	var ResizeHandle = React.createClass({displayName: "ResizeHandle",

	  style: {
	    position: 'absolute',
	    top: 0,
	    right: 0,
	    width: 6,
	    height: '100%'
	  },

	  render:function()                {
	    return (
	      React.createElement(Draggable, React.__spread({},  this.props, 
	        {className: "react-grid-HeaderCell__resizeHandle", 
	        style: this.style})
	        )
	    );
	  }
	});

	var HeaderCell = React.createClass({displayName: "HeaderCell",

	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.shape(ExcelColumn).isRequired,
	    onResize: PropTypes.func
	  },

	  render:function()                {
	    var className = cx({
	      'react-grid-HeaderCell': true,
	      'react-grid-HeaderCell--resizing': this.state.resizing,
	      'react-grid-HeaderCell--locked': this.props.column.locked
	    });
	    className = cx(className, this.props.className);
	    var cell = this.getCell();
	    return (
	      React.createElement("div", {className: className, style: this.getStyle()}, 
	        cell, 
	        this.props.column.resizeable ?
	          React.createElement(ResizeHandle, {
	            onDrag: this.onDrag, 
	            onDragStart: this.onDragStart, 
	            onDragEnd: this.onDragEnd}
	            ) :
	          null
	      )
	    );
	  },

	  getCell:function()                 {
	    if (React.isValidElement(this.props.renderer)) {
	      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
	    } else {
	      return this.props.renderer({column: this.props.column});
	    }
	  },

	  getDefaultProps:function()                                                                                 {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },

	  getInitialState:function()                      {
	    return {resizing: false};
	  },

	  setScrollLeft:function(scrollLeft        ) {
	    var node = this.getDOMNode();
	    node.style.webkitTransform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	    node.style.transform = ("translate3d(" + scrollLeft + "px, 0px, 0px)");
	  },

	  getStyle:function()                                                                                                                                                               {
	    return {
	      width: this.props.column.width,
	      left: this.props.column.left,
	      display: 'inline-block',
	      position: 'absolute',
	      overflow: 'hidden',
	      height: this.props.height,
	      margin: 0,
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    };
	  },

	  onDragStart:function() {
	    this.setState({resizing: true});
	  },

	  onDrag:function(e                     ) {
	    var resize = this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
	    if(resize) {
	      var width = this.getWidthFromMouseEvent(e);
	      if (width > 0) {
	        resize(this.props.column, width);
	      }
	    }
	  },

	  onDragEnd:function(e                     ) {
	    var width = this.getWidthFromMouseEvent(e);
	    this.props.onResizeEnd(this.props.column, width);
	    this.setState({resizing: false});
	  },

	  getWidthFromMouseEvent:function(e                     )         {
	    var right = e.pageX;
	    var left = this.getDOMNode().getBoundingClientRect().left;
	    return right - left;
	  }
	});

	function simpleCellRenderer(props                          )               {
	  return React.createElement("div", {className: "widget-HeaderCell__value"}, props.column.name);
	}

	module.exports = HeaderCell;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM
	 */
	"use strict";

	var React             = __webpack_require__(1);
	var PropTypes         = React.PropTypes;
	var shallowEqual      = __webpack_require__(10);
	var HeaderCell        = __webpack_require__(22);
	var getScrollbarSize  = __webpack_require__(35);
	var ExcelColumn  = __webpack_require__(2);


	function HeaderRowStyle(){}
	                   
	                
	                 
	                   
	;

	var HeaderRow = React.createClass({displayName: "HeaderRow",

	  propTypes: {
	    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.arrayOf(ExcelColumn).isRequired,
	    onColumnResize: PropTypes.func,
	    style: PropTypes.shape(HeaderRowStyle)
	  },

	  render:function()                {
	    var cellsStyle = {
	      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
	      height: this.props.height,
	      whiteSpace: 'nowrap',
	      overflowX: 'hidden',
	      overflowY: 'hidden'
	    };

	    var cells = this.getCells();
	    return (
	      React.createElement("div", React.__spread({},  this.props, {className: "react-grid-HeaderRow"}), 
	        React.createElement("div", {style: cellsStyle}, 
	          cells
	        )
	      )
	    );
	  },

	  getCells:function()                    {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      var column = this.props.columns[i];
	      var cell = (
	        React.createElement(HeaderCell, {
	          ref: i, 
	          key: i, 
	          height: this.props.height, 
	          column: column, 
	          renderer: this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer, 
	          resizing: this.props.resizing === column, 
	          onResize: this.props.onColumnResize, 
	          onResizeEnd: this.props.onColumnResizeEnd}
	          )
	      );
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  setScrollLeft:function(scrollLeft        ) {
	    for (var i = 0, len = this.props.columns.length; i < len; i++) {
	      if (this.props.columns[i].locked) {
	        this.refs[i].setScrollLeft(scrollLeft);
	      }
	    }
	  },


	  shouldComponentUpdate:function(nextProps                                                                                                                        )          {
	    return (
	      nextProps.width !== this.props.width
	      || nextProps.height !== this.props.height
	      || nextProps.columns !== this.props.columns
	      || !shallowEqual(nextProps.style, this.props.style)
	    );
	  },

	  getStyle:function()                 {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  }

	});

	module.exports = HeaderRow;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow mixin not compatible and HTMLElement classList */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var ScrollShim = {

	  appendScrollShim:function() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      shim.classList.add('react-grid-ScrollShim'); //flow - not compatible with HTMLElement
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = (size.width + "px");
	      shim.style.height = (size.height + "px");
	      this.getDOMNode().appendChild(shim);
	      this._scrollShim = shim;
	    }
	    this._scheduleRemoveScrollShim();
	  },

	  _scrollShimSize:function()                                   {
	    return {
	      width: this.props.width,
	      height: this.props.length * this.props.rowHeight
	    };
	  },

	  _scheduleRemoveScrollShim:function() {
	    if (this._scheduleRemoveScrollShimTimer) {
	      clearTimeout(this._scheduleRemoveScrollShimTimer);
	    }
	    this._scheduleRemoveScrollShimTimer = setTimeout(
	      this._removeScrollShim, 200);
	  },

	  _removeScrollShim:function() {
	    if (this._scrollShim) {
	      this._scrollShim.parentNode.removeChild(this._scrollShim);
	      this._scrollShim = undefined;
	    }
	  }
	};

	module.exports = ScrollShim;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React             = __webpack_require__(1);
	var Canvas            = __webpack_require__(15);
	var PropTypes            = React.PropTypes;

	var ViewportScroll      = __webpack_require__(26);



	var Viewport = React.createClass({displayName: "Viewport",
	  mixins: [ViewportScroll],

	  propTypes: {
	    rowOffsetHeight: PropTypes.number.isRequired,
	    totalWidth: PropTypes.number.isRequired,
	    columns: PropTypes.shape({
	      width: PropTypes.number.isRequired,
	      columns: PropTypes.array.isRequired,
	    }),
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    selectedRows: PropTypes.array,
	    expandedRows: PropTypes.array,
	    rowRenderer: PropTypes.func,
	    rowsCount: PropTypes.number.isRequired,
	    rowHeight: PropTypes.number.isRequired,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    minHeight : PropTypes.number
	  },
	  render:function()                {
	    var style = {
	      padding: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      overflow: 'hidden',
	      position: 'absolute',
	      top: this.props.rowOffsetHeight
	    };
	    return (
	      React.createElement("div", {
	        className: "react-grid-Viewport", 
	        style: style}, 
	        React.createElement(Canvas, {
	          ref: "canvas", 
	          totalWidth: this.props.totalWidth, 
	          width: this.props.columns.width, 
	          rowGetter: this.props.rowGetter, 
	          rowsCount: this.props.rowsCount, 
	          selectedRows: this.props.selectedRows, 
	          expandedRows: this.props.expandedRows, 
	          columns: this.props.columns.columns, 
	          rowRenderer: this.props.rowRenderer, 
	          visibleStart: this.state.visibleStart, 
	          visibleEnd: this.state.visibleEnd, 
	          displayStart: this.state.displayStart, 
	          displayEnd: this.state.displayEnd, 
	          cellMetaData: this.props.cellMetaData, 
	          height: this.state.height, 
	          rowHeight: this.props.rowHeight, 
	          onScroll: this.onScroll, 
	          onRows: this.props.onRows}
	          )
	      )
	    );
	  },

	  getScroll:function()                                          {
	    return this.refs.canvas.getScroll();
	  },

	  onScroll:function(scroll                                         ) {
	    this.updateScroll(
	      scroll.scrollTop, scroll.scrollLeft,
	      this.state.height,
	      this.props.rowHeight,
	      this.props.rowsCount
	    );

	    if (this.props.onScroll) {
	      this.props.onScroll({scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft});
	    }
	  },

	  setScrollLeft:function(scrollLeft        ) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
	  }
	});

	module.exports = Viewport;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO@flow mixins */

	var React             = __webpack_require__(1);
	var DOMMetrics        = __webpack_require__(5);
	var getWindowSize     = __webpack_require__(36);

	var PropTypes            = React.PropTypes;
	var min   = Math.min;
	var max   = Math.max;
	var floor = Math.floor;
	var ceil  = Math.ceil;

	                            
	                       
	                     
	                 
	                    
	                     
	  

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight:function()         {
	      return this.getDOMNode().offsetHeight;
	    }
	  },

	  propTypes: {
	    rowHeight: React.PropTypes.number,
	    rowsCount: React.PropTypes.number.isRequired
	  },

	  getDefaultProps:function()                        {
	    return {
	      rowHeight: 30
	    };
	  },

	  getInitialState:function()                      {
	    return this.getGridState(this.props);
	  },

	  getGridState:function(props                     )                       {
	    var height = this.props.minHeight;
	    var renderedRowsCount = ceil(height / props.rowHeight);
	    return {
	      displayStart: 0,
	      displayEnd: renderedRowsCount * 2,
	      height: height,
	      scrollTop: 0,
	      scrollLeft: 0
	    };
	  },

	  updateScroll:function(scrollTop        , scrollLeft        , height        , rowHeight        , length        ) {
	    var renderedRowsCount = ceil(height / rowHeight);

	    var visibleStart = floor(scrollTop / rowHeight);

	    var visibleEnd = min(
	        visibleStart + renderedRowsCount,
	        length);

	    var displayStart = max(
	        0,
	        visibleStart - renderedRowsCount * 2);

	    var displayEnd = min(
	        visibleStart + renderedRowsCount * 2,
	        length);

	    var nextScrollState = {
	      visibleStart:visibleStart,
	      visibleEnd:visibleEnd,
	      displayStart:displayStart,
	      displayEnd:displayEnd,
	      height:height,
	      scrollTop:scrollTop,
	      scrollLeft:scrollLeft
	    };

	    this.setState(nextScrollState);
	  },

	  metricsUpdated:function() {
	    var height = this.DOMMetrics.viewportHeight();
	    if (height) {
	      this.updateScroll(
	        this.state.scrollTop,
	        this.state.scrollLeft,
	        height,
	        this.props.rowHeight,
	        this.props.rowsCount
	      );
	    }
	  },

	  componentWillReceiveProps:function(nextProps                                          ) {
	    if (this.props.rowHeight !== nextProps.rowHeight) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.totalRows !== nextProps.totalRows) {
	      this.updateScroll(
	        this.state.scrollTop,
	        this.state.scrollLeft,
	        this.state.height,
	        nextProps.rowHeight,
	        nextProps.totalRows
	      );
	    }
	  }
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// /* @flow */
	// /**
	//  * @jsx React.DOM
	//
	//
	//  */
	// 'use strict';
	//
	// var React                = require('react/addons');
	// var BaseCell             = require('../../Cell');
	// var EditableMixin        = require('./mixins/EditableMixin');
	// var CopyableMixin        = require('./mixins/CopyableMixin');
	// var DraggableMixin       = require('./mixins/DraggableMixin');
	// var MixinHelper          = require('../utils/MixinHelper');
	// var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
	// var isFunction           = require('../utils/isFunction');
	// var PropTypes            = React.PropTypes;
	// var cx                   = React.addons.classSet;
	// var cloneWithProps       = React.addons.cloneWithProps;
	// var ExcelColumn          = require('../grids/ExcelColumn');
	//
	//
	// var CellControls = React.createClass({
	//
	//   propTypes : {
	//     column : React.PropTypes.shape(ExcelColumn).isRequired,
	//     onClickEdit : React.PropTypes.func.isRequired,
	//     onShowMore : React.PropTypes.func.isRequired,
	//     onShowLess : React.PropTypes.func.isRequired,
	//     height : React.PropTypes.number.isRequired,
	//     value : React.PropTypes.any.isRequired,
	//     rowIdx : React.PropTypes.number.isRequired
	//   },
	//
	//   onClickEdit : function(e: Event){
	//     e.stopPropagation();
	//     e.preventDefault();
	//     this.props.onClickEdit();
	//   },
	//
	//   onShowMore : function(e: Event){
	//     e.stopPropagation();
	//     e.preventDefault();
	//     var newHeight = this.props.column.getExpandedHeight(this.props.value);
	//     this.props.onShowMore(this.props.rowIdx, newHeight);
	//   },
	//
	//   onShowLess : function(e: Event){
	//     e.stopPropagation();
	//     e.preventDefault();
	//     this.props.onShowLess(this.props.rowIdx);
	//   },
	//
	//   shouldComponentUpdate(nextProps: any, nextState: any){
	//     return this.props.height != nextProps.height;
	//   },
	//
	//   renderShowMoreButton(): ?ReactElement {
	//     if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
	//       var newHeight = this.props.column.getExpandedHeight(this.props.value);
	//       if(newHeight > this.props.height){
	//         return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowMore}>Show More</button>
	//       }else{
	//         return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowLess}>Show Less</button>
	//       }
	//     }else{
	//       return null;
	//     }
	//   },
	//
	//   render : function(): ?ReactElement {
	//     return (<div className="pull-right btn-group">
	//               {this.renderShowMoreButton()}
	//               <button onClick={this.onClickEdit} type="button" className="btn btn-link btn-xs">Edit</button>
	//             </div>)
	//   }
	//
	// })
	//
	//
	// var ExcelCell = React.createClass({
	//
	//     mixins : [SelectableMixin],
	//
	//     getCellClass : function(){
	//       return cx({
	//         'selected' : this.isSelected()
	//       });
	//     },
	//
	//   isActiveDragCell : function(): boolean{
	//     return (this.isSelected() || this.isDraggedOver()) && !this.isActive();
	//   },
	//
	//   isExpanded : function(): boolean{
	//     var isExpanded = false;
	//     if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
	//       var newHeight = this.props.column.getExpandedHeight(this.props.value);
	//       if(this.props.height >= newHeight){
	//         isExpanded = true;
	//       }else{
	//         isExpanded = false;
	//       }
	//     }
	//     return isExpanded;
	//   },
	//
	//
	//   shouldComponentUpdate(nextProps: any, nextState: any): boolean {
	//     return this.props.column.width !== nextProps.column.width
	//     || this.props.value !== nextProps.value
	//     || this.props.height !== nextProps.height
	//     || this.props.rowIdx !== nextProps.rowIdx
	//     || this.isCellSelectionChanging(nextProps);
	//   },
	//
	//
	//   render: function(): ?ReactElement {
	//     return (
	//       <BaseCell
	//         {...this.props}
	//         className={this.getCellClass()}
	//         onClick={this.onClick}
	//         onDoubleClick={this.onDoubleClick}
	//         formatter={this.getFormatter()}
	//         handleDragStart={this.handleDragStart}
	//         onDragEnter={this.handleDragEnter}
	//         onDragEnd={this.props.handleDragEnd}
	//         cellControls={this.props.column.showCellControls && !this.isActive() ? <CellControls height={this.props.height} value={this.props.value} rowIdx={this.props.rowIdx} column={this.props.column} onShowMore={this.props.onShowMore} onShowLess={this.props.onShowLess} onClickEdit={this.setActive}/> : null}
	//         isExpanded={this.isExpanded()}
	//       />)
	//   }
	//
	// })
	//
	// module.exports = ExcelCell;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow  */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React              = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var ExcelColumn = __webpack_require__(2);

	var FilterableHeaderCell = React.createClass({displayName: "FilterableHeaderCell",

	  propTypes: {
	    onChange: React.PropTypes.func.isRequired,
	    column: React.PropTypes.shape(ExcelColumn).isRequired
	  },

	  getInitialState:function()                      {
	    return {filterTerm : ''}
	  },

	  handleChange:function(e       ){
	    e.preventDefault();
	    e.stopPropagation();

	    var val = e.target.value;
	    this.setState({filterTerm : val });
	    this.props.onChange({filterTerm : val, columnKey : this.props.column.key});
	  },

	  componentDidUpdate:function(nextProps     ) {
	    var ele = this.getDOMNode();
	    if(ele) ele.focus();
	  },

	  render: function()                {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {className: "form-group"}, 
	          React.createElement(this.renderInput, null)
	        )
	      )
	    );
	  },

	  renderInput : function()                {
	    if(this.props.column.filterable === false){
	      return React.createElement("span", null);
	    }else{
	      return (React.createElement("input", {type: "text", className: "form-control input-sm", placeholder: "Search", value: this.state.filterTerm, onChange: this.handleChange}))
	    }

	  }
	});

	module.exports = FilterableHeaderCell;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React              = __webpack_require__(1);
	var cx             = React.addons.classSet;
	var ExcelColumn = __webpack_require__(2);

	var SortableHeaderCell = React.createClass({displayName: "SortableHeaderCell",
	  propTypes: {
	    column: React.PropTypes.shape(ExcelColumn).isRequired
	  },
	  onClick: function() {
	    this.props.column.sortBy(
	      this.props.column,
	      this.props.column.sorted);
	  },

	  getSortByClass : function(){
	    var sorted = this.props.column.sorted;
	    return cx({
	      'pull-right' : true,
	      'glyphicon glyphicon-arrow-up' : sorted === 'ASC',
	      'glyphicon glyphicon-arrow-down' : sorted === 'DESC'
	    });
	  },

	  render: function()                {

	    return (
	      React.createElement("div", {
	        onClick: this.onClick, 
	        style: {cursor: 'pointer'}}, 
	        this.props.column.name, 
	        React.createElement("span", {className: this.getSortByClass()})
	      )
	    );
	  }
	});

	module.exports = SortableHeaderCell;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM
	 */
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;

	var CheckBoxEditor = React.createClass({displayName: "CheckBoxEditor",


	  PropTypes : {
	    value : React.PropTypes.bool.isRequired,
	    rowIdx : React.PropTypes.number.isRequired
	  },

	  render:function()               {
	    return (React.createElement("input", {className: "react-grid-CheckBox", type: "checkbox", checked: this.props.value, onChange: this.handleChange}));
	  },

	  handleChange:function(e       ){
	    this.props.column.onRowSelect(this.props.rowIdx)
	  },

	  shouldComponentUpdate:function(nextProps     , nextState     )         {
	    return this.props.value != nextProps.value;
	  }

	});

	module.exports = CheckBoxEditor;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	* @jsx React.DOM


	*/
	'use strict';

	var React                   = __webpack_require__(1);
	var cx                      = React.addons.classSet;
	var keyboardHandlerMixin    = __webpack_require__(3);
	var SimpleTextEditor        = __webpack_require__(12);
	var isFunction              = __webpack_require__(33);
	var cloneWithProps          = React.addons.cloneWithProps;


	var EditorContainer = React.createClass({displayName: "EditorContainer",

	  mixins : [keyboardHandlerMixin],

	  propTypes : {
	    cellMetaData : React.PropTypes.func.isRequired,
	    column : React.PropTypes.object.isRequired
	  },

	  getInitialState:function(){
	    return {isInvalid : false}
	  },

	  componentWillMount:function(){
	      this.validateEditor();
	  },

	  componentDidMount: function() {
	    var inputNode = this.getInputNode();
	    if(inputNode !== undefined){
	      this.setTextInputFocus();
	      inputNode.className += ' editor-main';
	      inputNode.style.height = this.props.height - 1 + 'px';
	    }
	  },

	  validateEditor:function(){
	    var editor = this.props.column.editor;
	    if(editor){

	    }
	  },

	  createEditor:function()              {
	    var editorProps = {ref: 'editor', column : this.props.column, onKeyDown : this.onKeyDown, value : this.getInitialValue(), onCommit : this.commit, editorRowMetaData : this.getEditorRowMetaData(), height : this.props.height};
	    var customEditor = this.props.column.editor;
	    if(customEditor && React.isValidElement(customEditor)){
	      //return custom column editor or SimpleEditor if none specified
	      return React.addons.cloneWithProps(customEditor, editorProps);
	    }else{
	      return React.createElement(SimpleTextEditor, {ref: 'editor', column: this.props.column, onKeyDown: this.onKeyDown, value: this.getInitialValue(), onBlur: this.commit, editorRowMetaData: this.getEditorRowMetaData()});
	    }
	  },

	  getEditorRowMetaData:function()       {
	    //clone row data so editor cannot actually change this
	    var columnName = this.props.column.ItemId;
	    //convention based method to get corresponding Id or Name of any Name or Id property
	    if(typeof this.props.column.getEditorRowMetaData === 'function'){
	      return this.props.column.getEditorRowMetaData(this.props.rowData);
	    }
	  },

	  onPressEnter:function(e                        ){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Enter'});
	  },

	  onPressTab:function(e                        ){
	    e.stopPropagation();
	    e.preventDefault();
	    this.commit({key : 'Tab'});
	  },

	  onPressArrowDown:function(e                        ){
	    if(this.editorHasResults()){
	      e.stopPropagation();
	      e.preventDefault();
	    }
	  },

	  onPressArrowUp:function(e                        ){
	    if(this.editorHasResults()){
	      e.stopPropagation();
	      e.preventDefault();
	    }
	  },

	  onPressArrowLeft:function(e                        ){
	    //prevent event propogation. this disables left cell navigation
	    if(!this.isCaretAtBeginningOfInput()){
	      e.stopPropagation();
	    }
	  },

	  onPressArrowRight:function(e                        ){
	    //prevent event propogation. this disables right cell navigation
	    if(!this.isCaretAtEndOfInput()){
	      e.stopPropagation();
	    }
	  },

	  editorHasResults:function()         {
	    if(isFunction(this.getEditor().hasResults)){
	      return this.getEditor().hasResults();
	    }else{
	      return false;
	    }
	  },

	  getEditor:function()         {
	    //TODO need to check that this.refs.editor conforms to the type
	    //this function is basically just a type cast for the sake of flow
	    return this.refs.editor;
	  },

	  commit:function(args                ){
	    var updated = this.getEditor().getValue();
	    if(this.isNewValueValid(updated)){
	      var cellKey = this.props.column.key;
	      this.props.cellMetaData.onCommit({cellKey: cellKey, rowIdx: this.props.rowIdx, updated : updated, key : args.key});
	    }
	  },

	  isNewValueValid:function(value        )         {
	    if(isFunction(this.validate)){
	      var isValid = this.validate(value);
	      this.setState({isInvalid : !isValid});
	      return isValid;
	    }else{
	      return true;
	    }
	  },

	  getInputNode:function()                  {
	    return this.getEditor().getInputNode();
	  },

	  getInitialValue:function()        {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    if(keyCode === 'Delete' || keyCode === 'Backspace'){
	      return '';
	    }else if(keyCode === 'Enter'){
	      return this.props.value;
	    }else{
	      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	      return text;
	    }

	  },

	  getContainerClass:function(){
	    return cx({
	      'has-error' : this.state.isInvalid === true
	    })
	  },

	  renderStatusIcon:function()               {
	    if(this.state.isInvalid === true){
	      return React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback"})
	    }
	  },

	  render:function()               {
	  return (
	      React.createElement("div", {className: this.getContainerClass()}, 
	      this.createEditor(), 
	      this.renderStatusIcon()
	      )
	    )
	  },

	  setCaretAtEndOfInput:function(){
	    var input = this.getInputNode();
	    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if(input.setSelectionRange){
	      input.setSelectionRange(txtLength, txtLength);
	    }else if(input.createTextRange){
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txtLength);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  },

	  isCaretAtBeginningOfInput:function()         {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === 0;
	  },

	  isCaretAtEndOfInput:function()         {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.value.length;
	  },

	  setTextInputFocus:function(){
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    if(!this.isKeyPrintable(keyCode)){
	      this.getInputNode().focus();
	      this.setCaretAtEndOfInput();
	    }else{
	      this.getInputNode().select();
	    }
	  }

	});

	module.exports = EditorContainer;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM

	 */
	"use strict";

	var React                 = __webpack_require__(1);
	var PropTypes             = React.PropTypes;
	var BaseGrid              = __webpack_require__(19);
	var ExcelCell             = __webpack_require__(27);
	var Row                   = __webpack_require__(6);
	var ExcelColumn           = __webpack_require__(2);
	var merge                 = __webpack_require__(9);
	var KeyboardHandlerMixin  = __webpack_require__(3);
	var CheckboxEditor        = __webpack_require__(30);
	var SortableHeaderCell    = __webpack_require__(29);
	var FilterableHeaderCell  = __webpack_require__(28);

	var cloneWithProps = React.addons.cloneWithProps;

	                     
	                 
	              
	  

	                    
	              
	                 
	                
	  

	                           
	                    
	                    
	                            
	                            
	                              
	                              
	                    
	                
	                             
	                              
	                             
	                       
	  

	                                            
	var DEFINE_SORT = {
	  ASC : 'ASC',
	  DESC : 'DESC'
	}

	                       
	                  
	                                    
	                 
	  

	var ReactDataGrid = React.createClass({displayName: "ReactDataGrid",

	  propTypes: {
	    rowHeight: React.PropTypes.number.isRequired,
	    minHeight: React.PropTypes.number.isRequired,
	    enableRowSelect: React.PropTypes.bool,
	    onRowUpdated:React.PropTypes.func,
	    rowGetter: React.PropTypes.func.isRequired,
	    rowsCount : React.PropTypes.number.isRequired,
	    toolbar:React.PropTypes.element,
	    enableCellSelect : React.PropTypes.bool,
	    columns : React.PropTypes.arrayOf(React.PropTypes.shape(ExcelColumn)).isRequired,
	    onFilter : React.PropTypes.func,
	    onCellCopyPaste : React.PropTypes.func,
	    onCellsDragged : React.PropTypes.func
	  },

	  mixins : [KeyboardHandlerMixin],

	  getDefaultProps:function()                              {
	    return {
	      enableCellSelect : false,
	      tabIndex : -1,
	      ref : "cell",
	      rowHeight: 35,
	      enableRowSelect : false,
	      minHeight : 350
	    };
	  },

	  getInitialState: function()                                                                                                                                                                                                                                           {
	    var initialState = {selectedRows : [], copied : null, expandedRows : [], canFilter : false, columnFilters : {}, sortDirection: null, sortColumn: null, dragged : null}
	    if(this.props.enableCellSelect){
	      initialState.selected = {rowIdx: 0, idx: 0};
	    }else{
	      initialState.selected = {rowIdx: -1, idx: -1};
	    }
	    return initialState;
	  },

	  componentWillReceiveProps:function(nextProps                    ){
	    if(nextProps.rowsCount  === this.props.rowsCount + 1){
	      this.onAfterAddRow(nextProps.rowsCount + 1);
	    }
	  },

	  render: function()                {
	    var cellMetaData = {
	      selected : this.state.selected,
	      dragged : this.state.dragged,
	      onCellClick : this.onCellClick,
	      onCommit : this.onCellCommit,
	      copied : this.state.copied,
	      handleDragEnterRow : this.handleDragEnter,
	      handleTerminateDrag : this.handleTerminateDrag
	    }

	    var toolbar = this.renderToolbar();
	    return(
	      React.createElement("div", {className: "react-grid-Container"}, 
	      toolbar, 
	        React.createElement("div", {className: "react-grid-Main"}, 
	          React.createElement(BaseGrid, React.__spread({
	            ref: "base"}, 
	            this.props, 
	            {headerRows: this.getHeaderRows(), 
	            columns: this.getColumns(), 
	            rowGetter: this.props.rowGetter, 
	            rowsCount: this.props.rowsCount, 
	            cellMetaData: cellMetaData, 
	            selectedRows: this.state.selectedRows, 
	            expandedRows: this.state.expandedRows, 
	            rowOffsetHeight: this.getRowOffsetHeight(), 
	            minHeight: this.props.minHeight, 
	            onViewportKeydown: this.onKeyDown, 
	            onViewportDragStart: this.onDragStart, 
	            onViewportDragEnd: this.handleDragEnd}))
	          )
	        )
	      )
	  },

	  renderToolbar:function()               {
	    var Toolbar = this.props.toolbar;
	    if(React.isValidElement(Toolbar)){
	      return( React.addons.cloneWithProps(Toolbar, {onToggleFilter : this.onToggleFilter, numberOfRows : this.props.rowsCount}));
	    }

	  },

	  onSelect: function(selected              ) {
	    if(this.props.enableCellSelect){
	      var idx = selected.idx;
	      var rowIdx = selected.rowIdx;
	      if (
	        idx >= 0
	        && rowIdx >= 0
	        && idx < this.getColumns().length
	        && rowIdx < this.props.rowsCount
	      ) {
	        this.setState({selected: selected});
	      }
	    }
	  },

	  isSelected: function()          {
	    return (
	      this.props.selected
	      && this.props.selected.rowIdx === this.props.rowIdx
	      && this.props.selected.idx === this.props.idx
	    );
	  },

	  onCellClick: function(cell              ) {
	    this.onSelect({rowIdx: cell.rowIdx, idx: cell.idx});
	  },

	  onPressArrowUp:function(e                ){
	    this.moveSelectedCell(e, -1, 0);
	  },

	  onPressArrowDown:function(e                ){
	    this.moveSelectedCell(e, 1, 0);
	  },

	  onPressArrowLeft:function(e                ){
	    this.moveSelectedCell(e, 0, -1);
	  },

	  onPressArrowRight:function(e                ){
	    this.moveSelectedCell(e, 0, 1);
	  },

	  onPressTab:function(e                ){
	    this.moveSelectedCell(e, 0, 1);
	  },

	  onPressEnter:function(e                        ){
	    this.setActive(e.key);
	  },

	  onPressDelete:function(e                        ){
	    this.setActive(e.key);
	  },

	  onPressEscape:function(e                        ){
	    this.setInactive(e.key);
	  },

	  onPressBackspace:function(e                        ){
	    this.setActive(e.key);
	  },

	  onPressChar:function(e                        ){
	    if(this.isKeyPrintable(e.keyCode)){
	      this.setActive(e.keyCode);
	    }
	  },

	  onPressKeyWithCtrl:function(e                        ){
	    var keys = {
	      KeyCode_c : '99',
	      KeyCode_C : '67',
	      KeyCode_V : '86',
	      KeyCode_v : '118',
	    }

	    var idx = this.state.selected.idx
	    if(this.canEdit(idx)){
	      var value = this.getSelectedValue();
	      if(e.keyCode === keys.KeyCode_c || e.keyCode === keys.KeyCode_C){
	        this.handleCopy({value : value});
	      }else if(e.keyCode === keys.KeyCode_v || e.keyCode === keys.KeyCode_V){
	        this.handlePaste({value : value});
	      }
	    }
	  },

	  onDragStart:function(e                ){
	    if(e.target)
	    var value = this.getSelectedValue();
	    this.handleDragStart({idx: this.state.selected.idx, rowIdx : this.state.selected.rowIdx, value : value});
	  },

	  moveSelectedCell:function(e                , rowDelta        , cellDelta        ){
	    e.stopPropagation();
	    e.preventDefault();
	    var rowIdx = this.state.selected.rowIdx + rowDelta;
	    var idx = this.state.selected.idx + cellDelta;
	    this.onSelect({idx: idx, rowIdx: rowIdx});
	  },

	  getSelectedValue:function()        {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    var cellOffset = this.props.enableRowSelect ? 1 : 0;
	    var cellKey = this.props.columns[idx - cellOffset].key;
	    return this.props.rowGetter(rowIdx)[cellKey];
	  },

	  setActive:function(keyPressed        ){
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    if(this.props.columns[idx].key === 'select-row' && this.props.columns[idx].onRowSelect){
	      this.props.column.onRowSelect(rowIdx);
	    }
	    else if(this.canEdit(idx) && !this.isActive()){
	      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
	      this.setState({selected: selected});
	    }
	  },

	  setInactive:function(){
	    var rowIdx = this.state.selected.rowIdx;
	    var idx =this.state.selected.idx;
	    if(this.canEdit(idx) && this.isActive()){
	      var selected = Object.assign(this.state.selected, {idx: idx, rowIdx: rowIdx, active : false});
	      this.setState({selected: selected});
	    }
	  },

	  canEdit:function(idx        )         {
	    return (this.props.columns[idx].editor != null) || this.props.columns[idx].editable;
	  },

	  isActive:function()         {
	    return this.state.selected.active === true;
	  },

	  onCellCommit:function(commit                ){
	    var selected = Object.assign({}, this.state.selected);
	    selected.active = false;
	    if (commit.keyCode === 'Tab') {
	      selected.idx += 1;
	    }
	    var expandedRows = this.state.expandedRows;
	    if(commit.changed && commit.changed.expandedHeight){
	      expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	    }
	    this.setState({selected : selected, expandedRows : expandedRows});
	    this.props.onRowUpdated(commit);

	  },
	  getColumns : function()            {
	    var cols = this.getDecoratedColumns(this.props.columns)
	    if(this.props.enableRowSelect){
	        cols.unshift({
	          key: 'select-row',
	          name: '',
	          formatter : React.createElement(CheckboxEditor, null),
	          onRowSelect :this.handleRowSelect,
	          filterable : false,
	          headerRenderer : React.createElement("input", {type: "checkbox", onChange: this.handleCheckboxChange}),
	          width : 60
	        });
	      }
	      return cols;
	  },

	  handleCheckboxChange : function(e                ){
	    if(e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true){
	      var selectedRows = this.props.rows.map(function()  {return true;});
	      this.setState({selectedRows : selectedRows});
	    }else{
	      var selectedRows = this.props.rows.map(function()  {return false;});
	      this.setState({selectedRows : selectedRows});
	    }
	  },

	  handleRowSelect:function(row     ){
	    var selectedRows = this.state.selectedRows;
	    if(selectedRows[row] == null || selectedRows[row] == false){
	      selectedRows[row] = true;
	    }else{
	      selectedRows[row] = false;
	    }
	    this.setState({selectedRows : selectedRows});
	  },

	  expandRow:function(row     , newHeight        )            {
	    var expandedRows = this.state.expandedRows;
	    if(expandedRows[row]){
	      if(expandedRows[row]== null || expandedRows[row] < newHeight){
	        expandedRows[row] = newHeight;
	      }
	    }else{
	      expandedRows[row] = newHeight;
	    }
	    return expandedRows;
	  },

	  addRow:function(){

	  },

	  handleShowMore:function(row     , newHeight        ) {
	    var expandedRows = this.expandRow(row, newHeight);
	    this.setState({expandedRows : expandedRows});
	  },

	  handleShowLess:function(row     ){
	    var expandedRows = this.state.expandedRows;
	    if(expandedRows[row]){
	        expandedRows[row] = false;
	    }
	    this.setState({expandedRows : expandedRows});
	  },

	  expandAllRows:function(){

	  },

	  collapseAllRows:function(){

	  },

	  onAfterAddRow:function(numberOfRows        ){
	    this.setState({selected : {idx : 1, rowIdx : numberOfRows - 2}});
	  },

	  hasFilters:function()         {
	    var hasFilters = false;
	    Object.keys(this.state.columnFilters).every(function(key){
	      var filter = this.state.columnFilters[key];
	      if(filter != null && filter != undefined && filter != ''){
	        hasFilters = true;
	        return false;
	      }
	      return true;
	    }, this);
	    return hasFilters;
	  },

	  isRowDisplayed:function(row     )         {
	    var isRowDisplayed = null;
	    Object.keys(this.state.columnFilters).every(function(key){
	      var filter = this.state.columnFilters[key].toLowerCase();
	      var cellValue = row[key].toString().toLowerCase();
	      if(filter != null && filter != undefined && filter != '' && typeof cellValue === 'string'){
	        if(cellValue.indexOf(filter) > -1){
	          isRowDisplayed = true;
	        }else{
	          isRowDisplayed = false;
	          return false;
	        }
	      }
	      return true;
	    }, this);
	    return isRowDisplayed == null ? false : isRowDisplayed;
	  },

	  onToggleFilter:function(){
	    this.setState({canFilter : !this.state.canFilter});
	  },

	  handleAddFilter:function(filter                                          ){
	    var columnFilters = this.state.columnFilters;
	    columnFilters[filter.columnKey] = filter.filterTerm;
	    this.setState({columnFilters : columnFilters, selected : null});
	  },

	  getHeaderRows:function()                                        {
	    var rows = [{ref:"row", height: this.props.rowHeight}];
	    if(this.state.canFilter === true){
	      rows.push({
	        ref:"filterRow",
	        headerCellRenderer : React.createElement(FilterableHeaderCell, {onChange: this.handleAddFilter, column: this.props.column}),
	        height : 45
	      });
	    }
	    return rows;
	  },

	  getRowOffsetHeight:function()        {
	    var offsetHeight = 0;
	    this.getHeaderRows().forEach(function(row)  {return offsetHeight += parseFloat(row.height, 10);} );
	    return offsetHeight;
	  },

	  getDecoratedColumns: function(columns                    )                     {
	    return this.props.columns.map(function(column) {
	      column = Object.assign({}, column);
	      if (column.sortable) {
	        column.headerRenderer = React.createElement(SortableHeaderCell, {column: column});
	        column.sortBy = this.sortBy;
	        if (this.state.sortColumn === column.key) {
	          column.sorted = this.state.sortDirection;
	        }else{
	          column.sorted = DEFINE_SORT.NONE;
	        }
	      }
	      return column
	    }, this);
	  },

	  sortBy: function(column             , direction          ) {
	    switch(direction){
	      case null:
	      case undefined:
	        direction = DEFINE_SORT.ASC;
	      break;
	      case DEFINE_SORT.ASC:
	        direction = DEFINE_SORT.DESC;
	      break;
	      case DEFINE_SORT.DESC:
	        direction = null;
	      break;
	    }
	    this.setState({sortDirection: direction, sortColumn: column.key});
	  },

	  copyPasteEnabled: function()          {
	    return this.props.onCellCopyPaste !== null;
	  },

	  handleCopy:function(args                 ){
	    if(!this.copyPasteEnabled()) { return; }
	      var textToCopy = args.value;
	      var selected = this.state.selected;
	      var copied = {idx : selected.idx, rowIdx : selected.rowIdx};
	      this.setState({textToCopy:textToCopy, copied : copied});
	  },

	  handlePaste:function(){
	    if(!this.copyPasteEnabled()) { return; }
	      var selected = this.state.selected;
	      var cellKey = this.getColumns()[selected.idx].key;
	      if(this.props.onCellCopyPaste) {
	        this.props.onCellCopyPaste({cellKey: cellKey , rowIdx: selected.rowIdx, value : this.state.textToCopy, fromRow : this.state.copied.rowIdx, toRow : selected.rowIdx});
	      }
	      this.setState({copied : null});
	  },

	  dragEnabled: function()          {
	    return this.props.onCellsDragged !== null;
	  },

	  handleDragStart:function(dragged             ){
	    if(!this.dragEnabled()) { return; }
	      var idx = dragged.idx;
	      var rowIdx = dragged.rowIdx;
	      if (
	        idx >= 0
	        && rowIdx >= 0
	        && idx < this.getColumns().length
	        && rowIdx < this.props.rowsCount
	      ) {
	        this.setState({dragged: dragged});
	      }
	  },

	  handleDragEnter:function(row     ){
	    if(!this.dragEnabled()) { return; }
	      var selected = this.state.selected;
	      var dragged = this.state.dragged;
	      dragged.overRowIdx = row;
	      this.setState({dragged : dragged});
	  },

	  handleDragEnd:function(){
	    if(!this.dragEnabled()) { return; }
	      var fromRow, toRow;
	      var selected = this.state.selected;
	      var dragged = this.state.dragged;
	      var cellKey = this.getColumns()[this.state.selected.idx].key;
	      fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	      toRow   = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	      if(this.props.onCellsDragged) { this.props.onCellsDragged({cellKey: cellKey , fromRow: fromRow, toRow : toRow, value : dragged.value}); }
	        this.setState({dragged : {complete : true}});
	  },

	  handleTerminateDrag:function(){
	    if(!this.dragEnabled()) { return; }
	      this.setState({dragged: null});
	  }

	});


	module.exports = ReactDataGrid;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	var isFunction = function(functionToCheck     )         {
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	module.exports = isFunction;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties

	 */
	'use strict';

	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	  obj = obj || {};

	  if (process.env.NODE_ENV) {
	    if (f) {
	      throw new Error('Too many arguments passed to copyProperties');
	    }
	  }

	  var args = [a, b, c, d, e];
	  var ii = 0, v;
	  while (args[ii]) {
	    v = args[ii++];
	    for (var k in v) {
	      obj[k] = v[k];
	    }

	    // IE ignores toString in object iteration.. See:
	    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	      obj.toString = v.toString;
	    }
	  }

	  return obj;
	}

	module.exports = copyProperties;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow offsetWidth in HTMLElement */
	"use strict";

	var size;

	function getScrollbarSize() {
	  if (size === undefined) {

	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.overflowY = 'scroll';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.clientWidth;
	    var innerWidth = inner.clientWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	/**
	 * @jsx React.DOM



	 */
	'use strict';

	/**
	 * Return window's height and width
	 *
	 * @return {Object} height and width of the window
	 */
	function getWindowSize()                                  {
	    var width = window.innerWidth;
	    var height = window.innerHeight;

	    if (!width || !height) {
	        width = document.documentElement.clientWidth;
	        height = document.documentElement.clientHeight;
	    }

	    if (!width || !height) {
	        width = document.body.clientWidth;
	        height = document.body.clientHeight;
	    }

	    return {width:width, height:height};
	}

	module.exports = getWindowSize;


/***/ }
/******/ ])
});
;