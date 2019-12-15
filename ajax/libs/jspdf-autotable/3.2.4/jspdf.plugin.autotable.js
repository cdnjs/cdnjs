/*!
 * 
 *             jsPDF AutoTable plugin v3.2.4
 *             
 *             Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable
 *             Licensed under the MIT License.
 *             http://opensource.org/licenses/mit-license
 *             
 *             * /if (typeof window === 'object') window.jspdfAutoTableVersion = '" + newVersion + "';/*"
 *         
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jspdf"));
	else if(typeof define === 'function' && define.amd)
		define(["jspdf"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jspdf")) : factory(root["jsPDF"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultsDocument = null;
var previousTableState;
var tableState = null;
exports.globalDefaults = {};
exports.documentDefaults = {};
function default_1() {
    return tableState;
}
exports.default = default_1;
function getGlobalOptions() {
    return exports.globalDefaults;
}
exports.getGlobalOptions = getGlobalOptions;
function getDocumentOptions() {
    return exports.documentDefaults;
}
exports.getDocumentOptions = getDocumentOptions;
var TableState = /** @class */ (function () {
    function TableState(doc) {
        this.doc = doc;
    }
    TableState.prototype.pageHeight = function () {
        return this.pageSize().height;
    };
    ;
    TableState.prototype.pageWidth = function () {
        return this.pageSize().width;
    };
    ;
    TableState.prototype.pageSize = function () {
        var pageSize = this.doc.internal.pageSize;
        // JSPDF 1.4 uses get functions instead of properties on pageSize
        if (pageSize.width == null) {
            pageSize = {
                width: pageSize.getWidth(),
                height: pageSize.getHeight()
            };
        }
        return pageSize;
    };
    ;
    TableState.prototype.scaleFactor = function () {
        return this.doc.internal.scaleFactor;
    };
    ;
    TableState.prototype.pageNumber = function () {
        var pageInfo = this.doc.internal.getCurrentPageInfo();
        if (!pageInfo) {
            // Only recent versions of jspdf has pageInfo
            return this.doc.internal.getNumberOfPages();
        }
        return pageInfo.pageNumber;
    };
    return TableState;
}());
function setupState(doc) {
    previousTableState = tableState;
    tableState = new TableState(doc);
    if (doc !== defaultsDocument) {
        defaultsDocument = doc;
        exports.documentDefaults = {};
    }
}
exports.setupState = setupState;
function resetState() {
    tableState = previousTableState;
}
exports.resetState = resetState;
function setDefaults(defaults, doc) {
    if (doc === void 0) { doc = null; }
    if (doc) {
        exports.documentDefaults = defaults || {};
        defaultsDocument = doc;
    }
    else {
        exports.globalDefaults = defaults || {};
    }
}
exports.setDefaults = setDefaults;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(2);
var state_1 = __webpack_require__(0);
var polyfills_1 = __webpack_require__(3);
function getStringWidth(text, styles) {
    applyStyles(styles);
    var textArr = Array.isArray(text) ? text : [text];
    var doc = state_1.default().doc;
    var widestLineWidth = textArr
        .map(doc.getStringUnitWidth.bind(doc))
        // Shave off a few digits for potential improvement in width calculation
        .map(function (val) { return Math.floor(val * 10000) / 10000; })
        .reduce(Math.max, 0);
    var fontSize = styles.fontSize / state_1.default().scaleFactor();
    return widestLineWidth * fontSize;
}
exports.getStringWidth = getStringWidth;
/**
 * Ellipsize the text to fit in the width
 */
function ellipsize(text, width, styles, ellipsizeStr) {
    if (ellipsizeStr === void 0) { ellipsizeStr = '...'; }
    if (Array.isArray(text)) {
        var value_1 = [];
        text.forEach(function (str, i) {
            value_1[i] = ellipsize(str, width, styles, ellipsizeStr);
        });
        return value_1;
    }
    var precision = 10000 * state_1.default().scaleFactor();
    width = Math.ceil(width * precision) / precision;
    if (width >= getStringWidth(text, styles)) {
        return text;
    }
    while (width < getStringWidth(text + ellipsizeStr, styles)) {
        if (text.length <= 1) {
            break;
        }
        text = text.substring(0, text.length - 1);
    }
    return text.trim() + ellipsizeStr;
}
exports.ellipsize = ellipsize;
function addTableBorder() {
    var table = state_1.default().table;
    var styles = { lineWidth: table.settings.tableLineWidth, lineColor: table.settings.tableLineColor };
    applyStyles(styles);
    var fs = getFillStyle(styles);
    if (fs) {
        state_1.default().doc.rect(table.pageStartX, table.pageStartY, table.width, table.cursor.y - table.pageStartY, fs);
    }
}
exports.addTableBorder = addTableBorder;
function getFillStyle(styles) {
    var drawLine = styles.lineWidth > 0;
    var drawBackground = styles.fillColor || styles.fillColor === 0;
    if (drawLine && drawBackground) {
        return 'DF'; // Fill then stroke
    }
    else if (drawLine) {
        return 'S'; // Only stroke (transparent background)
    }
    else if (drawBackground) {
        return 'F'; // Only fill, no stroke
    }
    else {
        return false;
    }
}
exports.getFillStyle = getFillStyle;
function applyUserStyles() {
    applyStyles(state_1.default().table.userStyles);
}
exports.applyUserStyles = applyUserStyles;
function applyStyles(styles) {
    var doc = state_1.default().doc;
    var styleModifiers = {
        fillColor: doc.setFillColor,
        textColor: doc.setTextColor,
        fontStyle: doc.setFontStyle,
        lineColor: doc.setDrawColor,
        lineWidth: doc.setLineWidth,
        font: doc.setFont,
        fontSize: doc.setFontSize
    };
    Object.keys(styleModifiers).forEach(function (name) {
        var style = styles[name];
        var modifier = styleModifiers[name];
        if (typeof style !== 'undefined') {
            if (Array.isArray(style)) {
                modifier.apply(this, style);
            }
            else {
                modifier(style);
            }
        }
    });
}
exports.applyStyles = applyStyles;
// This is messy, only keep array and number format the next major version
function marginOrPadding(value, defaultValue) {
    var newValue = {};
    if (Array.isArray(value)) {
        if (value.length >= 4) {
            newValue = { 'top': value[0], 'right': value[1], 'bottom': value[2], 'left': value[3] };
        }
        else if (value.length === 3) {
            newValue = { 'top': value[0], 'right': value[1], 'bottom': value[2], 'left': value[1] };
        }
        else if (value.length === 2) {
            newValue = { 'top': value[0], 'right': value[1], 'bottom': value[0], 'left': value[1] };
        }
        else if (value.length === 1) {
            value = value[0];
        }
        else {
            value = defaultValue;
        }
    }
    else if (typeof value === 'object') {
        if (value['vertical']) {
            value['top'] = value['vertical'];
            value['bottom'] = value['vertical'];
        }
        if (value['horizontal']) {
            value['right'] = value['horizontal'];
            value['left'] = value['horizontal'];
        }
        for (var _i = 0, _a = ['top', 'right', 'bottom', 'left']; _i < _a.length; _i++) {
            var side = _a[_i];
            newValue[side] = (value[side] || value[side] === 0) ? value[side] : defaultValue;
        }
    }
    if (typeof value === 'number') {
        newValue = { 'top': value, 'right': value, 'bottom': value, 'left': value };
    }
    return newValue;
}
exports.marginOrPadding = marginOrPadding;
function styles(styles) {
    styles = Array.isArray(styles) ? styles : [styles];
    return polyfills_1.assign.apply(void 0, [config_1.defaultStyles()].concat(styles));
}
exports.styles = styles;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ratio between font size and font height. The number comes from jspdf's source code
 */
exports.FONT_ROW_RATIO = 1.15;
var state_1 = __webpack_require__(0);
function defaultConfig() {
    return {
        // Html content
        html: null,
        // Custom content
        head: null,
        body: null,
        foot: null,
        // Properties
        includeHiddenHtml: false,
        startY: null,
        margin: 40 / state_1.default().scaleFactor(),
        pageBreak: 'auto',
        rowPageBreak: 'auto',
        tableWidth: 'auto',
        showHead: 'everyPage',
        showFoot: 'everyPage',
        tableLineWidth: 0,
        tableLineColor: 200,
        tableId: null,
        // Styling
        theme: 'striped',
        useCss: false,
        styles: {},
        headStyles: {},
        bodyStyles: {},
        footStyles: {},
        alternateRowStyles: {},
        columnStyles: {},
        // Hooks
        // Use to change the content of the cell before width calculations etc are performed
        didParseCell: function (data) {
        },
        willDrawCell: function (data) {
        },
        // Use to draw additional content such as images in table cells
        didDrawCell: function (data) {
        },
        // Use to draw additional content to each page such as headers and footers
        didDrawPage: function (data) {
        },
    };
}
exports.defaultConfig = defaultConfig;
// Base style for all themes
function defaultStyles() {
    return {
        font: "helvetica",
        fontStyle: 'normal',
        overflow: 'linebreak',
        fillColor: false,
        textColor: 20,
        halign: 'left',
        valign: 'top',
        fontSize: 10,
        cellPadding: 5 / state_1.default().scaleFactor(),
        lineColor: 200,
        lineWidth: 0 / state_1.default().scaleFactor(),
        cellWidth: 'auto',
        minCellHeight: 0
    };
}
exports.defaultStyles = defaultStyles;
/**
 * Styles for the themes (overriding the default styles)
 */
function getTheme(name) {
    var themes = {
        'striped': {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal' },
            head: { textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold' },
            body: {},
            foot: { textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold' },
            alternateRow: { fillColor: 245 }
        },
        'grid': {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal', lineWidth: 0.1 },
            head: { textColor: 255, fillColor: [26, 188, 156], fontStyle: 'bold', lineWidth: 0 },
            body: {},
            foot: { textColor: 255, fillColor: [26, 188, 156], fontStyle: 'bold', lineWidth: 0 },
            alternateRow: {}
        },
        'plain': {
            head: { fontStyle: 'bold' },
            foot: { fontStyle: 'bold' }
        }
    };
    return themes[name];
}
exports.getTheme = getTheme;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Include common small polyfills instead of requiring the user to to do it
 */
Object.defineProperty(exports, "__esModule", { value: true });
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target) {
    'use strict';
    var varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
    }
    if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
exports.assign = assign;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(2);
var state_1 = __webpack_require__(0);
var HookData_1 = __webpack_require__(10);
var common_1 = __webpack_require__(1);
var assign = __webpack_require__(5);
var CellHooks = /** @class */ (function () {
    function CellHooks() {
        this.didParseCell = [];
        this.willDrawCell = [];
        this.didDrawCell = [];
        this.didDrawPage = [];
    }
    return CellHooks;
}());
var Table = /** @class */ (function () {
    function Table() {
        this.columns = [];
        this.head = [];
        this.body = [];
        this.foot = [];
        this.height = 0;
        this.width = 0;
        this.preferredWidth = 0;
        this.wrappedWidth = 0;
        this.minWidth = 0;
        this.headHeight = 0;
        this.footHeight = 0;
        this.startPageNumber = 1;
        this.pageNumber = 1;
        this.styles = {
            styles: {},
            headStyles: {},
            bodyStyles: {},
            footStyles: {},
            alternateRowStyles: {},
            columnStyles: {},
        };
        this.cellHooks = new CellHooks();
    }
    Object.defineProperty(Table.prototype, "pageCount", {
        get: function () {
            return this.pageNumber;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.allRows = function () {
        return this.head.concat(this.body).concat(this.foot);
    };
    Table.prototype.callCellHooks = function (handlers, cell, row, column) {
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            if (handler(new HookData_1.CellHookData(cell, row, column)) === false) {
                return false;
            }
        }
        return true;
    };
    Table.prototype.callEndPageHooks = function () {
        common_1.applyUserStyles();
        for (var _i = 0, _a = this.cellHooks.didDrawPage; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(new HookData_1.HookData());
        }
    };
    Table.prototype.margin = function (side) {
        return common_1.marginOrPadding(this.settings.margin, config_1.defaultConfig().margin)[side];
    };
    return Table;
}());
exports.Table = Table;
var Row = /** @class */ (function () {
    function Row(raw, index, section) {
        this.cells = {};
        this.height = 0;
        this.maxCellHeight = 0;
        this.pageNumber = 1;
        this.spansMultiplePages = false;
        this.raw = raw;
        if (raw._element) {
            this.raw = raw._element;
        }
        this.index = index;
        this.section = section;
    }
    Object.defineProperty(Row.prototype, "pageCount", {
        get: function () {
            return this.pageNumber;
        },
        enumerable: true,
        configurable: true
    });
    Row.prototype.canEntireRowFit = function (height) {
        return this.maxCellHeight <= height;
    };
    Row.prototype.getMinimumRowHeight = function () {
        var _this = this;
        return state_1.default().table.columns.reduce(function (acc, column) {
            var cell = _this.cells[column.index];
            if (!cell)
                return 0;
            var fontHeight = cell.styles.fontSize / state_1.default().scaleFactor() * config_1.FONT_ROW_RATIO;
            var vPadding = cell.padding('vertical');
            var oneRowHeight = vPadding + fontHeight;
            return oneRowHeight > acc ? oneRowHeight : acc;
        }, 0);
    };
    return Row;
}());
exports.Row = Row;
var Cell = /** @class */ (function () {
    function Cell(raw, themeStyles, section) {
        this.contentHeight = 0;
        this.contentWidth = 0;
        this.wrappedWidth = 0;
        this.minWidth = 0;
        this.textPos = {};
        this.height = 0;
        this.width = 0;
        this.rowSpan = raw && raw.rowSpan || 1;
        this.colSpan = raw && raw.colSpan || 1;
        this.styles = assign(themeStyles, raw && raw.styles || {});
        this.section = section;
        var text;
        var content = raw && raw.content != null ? raw.content : raw;
        content = content && content.title != null ? content.title : content;
        this.raw = raw && raw._element ? raw._element : raw;
        // Stringify 0 and false, but not undefined or null
        text = content != null ? '' + content : '';
        var splitRegex = /\r\n|\r|\n/g;
        this.text = text.split(splitRegex);
        this.contentWidth = this.padding('horizontal') + common_1.getStringWidth(this.text, this.styles);
        if (typeof this.styles.cellWidth === 'number') {
            this.minWidth = this.styles.cellWidth;
            this.wrappedWidth = this.styles.cellWidth;
        }
        else if (this.styles.cellWidth === 'wrap') {
            this.minWidth = this.contentWidth;
            this.wrappedWidth = this.contentWidth;
        }
        else { // auto
            var defaultMinWidth = 10 / state_1.default().scaleFactor();
            this.minWidth = this.styles.minCellWidth || defaultMinWidth;
            this.wrappedWidth = this.contentWidth;
            if (this.minWidth > this.wrappedWidth) {
                this.wrappedWidth = this.minWidth;
            }
        }
    }
    Cell.prototype.getContentHeight = function () {
        var lineCount = Array.isArray(this.text) ? this.text.length : 1;
        var fontHeight = this.styles.fontSize / state_1.default().scaleFactor() * config_1.FONT_ROW_RATIO;
        return lineCount * fontHeight + this.padding('vertical');
    };
    Cell.prototype.padding = function (name) {
        var padding = common_1.marginOrPadding(this.styles.cellPadding, common_1.styles([]).cellPadding);
        if (name === 'vertical') {
            return padding.top + padding.bottom;
        }
        else if (name === 'horizontal') {
            return padding.left + padding.right;
        }
        else {
            return padding[name];
        }
    };
    return Cell;
}());
exports.Cell = Cell;
var Column = /** @class */ (function () {
    function Column(dataKey, raw, index) {
        this.preferredWidth = 0;
        this.minWidth = 0;
        this.wrappedWidth = 0;
        this.width = 0;
        this.dataKey = dataKey;
        this.raw = raw;
        this.index = index;
    }
    return Column;
}());
exports.Column = Column;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cssParser_1 = __webpack_require__(13);
var state_1 = __webpack_require__(0);
function parseHtml(input, includeHiddenHtml, useCss) {
    if (includeHiddenHtml === void 0) { includeHiddenHtml = false; }
    if (useCss === void 0) { useCss = false; }
    var tableElement;
    if (typeof input === 'string') {
        tableElement = window.document.querySelector(input);
    }
    else {
        tableElement = input;
    }
    if (!tableElement) {
        console.error("Html table could not be found with input: ", input);
        return;
    }
    var head = parseTableSection(window, tableElement.tHead, includeHiddenHtml, useCss);
    var body = [];
    for (var i = 0; i < tableElement.tBodies.length; i++) {
        body = body.concat(parseTableSection(window, tableElement.tBodies[i], includeHiddenHtml, useCss));
    }
    var foot = parseTableSection(window, tableElement.tFoot, includeHiddenHtml, useCss);
    return { head: head, body: body, foot: foot };
}
exports.parseHtml = parseHtml;
function parseTableSection(window, sectionElement, includeHidden, useCss) {
    var results = [];
    if (!sectionElement) {
        return results;
    }
    for (var i = 0; i < sectionElement.rows.length; i++) {
        var row = sectionElement.rows[i];
        var resultRow = [];
        var rowStyles = useCss ? cssParser_1.parseCss(row, state_1.default().scaleFactor(), ['cellPadding', 'lineWidth', 'lineColor']) : {};
        for (var i_1 = 0; i_1 < row.cells.length; i_1++) {
            var cell = row.cells[i_1];
            var style = window.getComputedStyle(cell);
            if (includeHidden || style.display !== 'none') {
                var cellStyles = useCss ? cssParser_1.parseCss(cell, state_1.default().scaleFactor()) : {};
                resultRow.push({
                    rowSpan: cell.rowSpan,
                    colSpan: cell.colSpan,
                    styles: useCss ? cellStyles : null,
                    _element: cell,
                    content: parseCellContent(cell)
                });
            }
        }
        if (resultRow.length > 0 && (includeHidden || rowStyles.display !== 'none')) {
            resultRow._element = row;
            results.push(resultRow);
        }
    }
    return results;
}
function parseCellContent(orgCell) {
    // Work on cloned node to make sure no changes are applied to html table
    var cell = orgCell.cloneNode(true);
    // Remove extra space and line breaks in markup to make it more similar to
    // what would be shown in html
    cell.innerHTML = cell.innerHTML
        .replace(/\n/g, '')
        .replace(/ +/g, ' ');
    // Preserve <br> tags as line breaks in the pdf
    cell.innerHTML = cell.innerHTML
        .split('<br>')
        .map(function (part) { return part.trim(); })
        .join('\n');
    // innerText for ie
    return cell.innerText || cell.textContent || '';
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tableDrawer_1 = __webpack_require__(9);
var widthCalculator_1 = __webpack_require__(11);
var inputParser_1 = __webpack_require__(12);
var state_1 = __webpack_require__(0);
__webpack_require__(15);
var common_1 = __webpack_require__(1);
var htmlParser_1 = __webpack_require__(6);
var jsPDF = __webpack_require__(7);
function autoTable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    state_1.setupState(this);
    // 1. Parse and unify user input
    var table = inputParser_1.parseInput(args);
    // 2. Calculate preliminary table, column, row and cell dimensions
    widthCalculator_1.calculateWidths(table);
    // 3. Output table to pdf
    tableDrawer_1.drawTable(table);
    table.finalY = table.cursor.y;
    this.previousAutoTable = table;
    this.lastAutoTable = table;
    this.autoTable.previous = table; // Deprecated
    common_1.applyUserStyles();
    state_1.resetState();
    return this;
}
jsPDF.API.autoTable = autoTable;
// Assign false to enable `doc.lastAutoTable.finalY || 40` sugar;
jsPDF.API.lastAutoTable = false;
jsPDF.API.previousAutoTable = false; // deprecated in v3
jsPDF.API.autoTable.previous = false; // deprecated in v3
jsPDF.API.autoTableSetDefaults = function (defaults) {
    state_1.setDefaults(defaults, this);
    return this;
};
jsPDF.autoTableSetDefaults = function (defaults, doc) {
    state_1.setDefaults(defaults, doc);
    return this;
};
jsPDF.API.autoTableHtmlToJson = function (tableElem, includeHiddenElements) {
    includeHiddenElements = includeHiddenElements || false;
    if (!tableElem || !(tableElem instanceof HTMLTableElement)) {
        console.error("A HTMLTableElement has to be sent to autoTableHtmlToJson");
        return null;
    }
    var _a = htmlParser_1.parseHtml(tableElem, includeHiddenElements, false), head = _a.head, body = _a.body, foot = _a.foot;
    var firstRow = head[0] || body[0] || foot[0];
    return { columns: firstRow, rows: body, data: body };
};
/**
 * @deprecated
 */
jsPDF.API.autoTableEndPosY = function () {
    console.error("Use of deprecated function: autoTableEndPosY. Use doc.previousAutoTable.finalY instead.");
    var prev = this.previousAutoTable;
    if (prev.cursor && typeof prev.cursor.y === 'number') {
        return prev.cursor.y;
    }
    else {
        return 0;
    }
};
/**
 * @deprecated
 */
jsPDF.API.autoTableAddPageContent = function (hook) {
    console.error("Use of deprecated function: autoTableAddPageContent. Use jsPDF.autoTableSetDefaults({didDrawPage: () => {}}) instead.");
    if (!jsPDF.API.autoTable.globalDefaults) {
        jsPDF.API.autoTable.globalDefaults = {};
    }
    jsPDF.API.autoTable.globalDefaults.addPageContent = hook;
    return this;
};
/**
 * @deprecated
 */
jsPDF.API.autoTableAddPage = function () {
    console.error("Use of deprecated function: autoTableAddPage. Use doc.addPage()");
    this.addPage();
    return this;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(2);
var common_1 = __webpack_require__(1);
var models_1 = __webpack_require__(4);
var state_1 = __webpack_require__(0);
var assign = __webpack_require__(5);
function drawTable(table) {
    var settings = table.settings;
    table.cursor = {
        x: table.margin('left'),
        y: settings.startY == null ? table.margin('top') : settings.startY
    };
    var minTableBottomPos = settings.startY + table.margin('bottom') + table.headHeight + table.footHeight;
    if (settings.pageBreak === 'avoid') {
        minTableBottomPos += table.height;
    }
    if (settings.pageBreak === 'always' || settings.startY != null && settings.startY !== false && minTableBottomPos > state_1.default().pageHeight()) {
        nextPage(state_1.default().doc);
        table.cursor.y = table.margin('top');
    }
    table.pageStartX = table.cursor.x;
    table.pageStartY = table.cursor.y;
    table.startPageNumber = state_1.default().pageNumber();
    // An empty row used to cached cells those break through page
    common_1.applyUserStyles();
    if (settings.showHead === true || settings.showHead === 'firstPage' || settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(row); });
    }
    common_1.applyUserStyles();
    table.body.forEach(function (row, index) {
        printFullRow(row, index === table.body.length - 1);
    });
    common_1.applyUserStyles();
    if (settings.showFoot === true || settings.showFoot === 'lastPage' || settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(row); });
    }
    common_1.addTableBorder();
    table.callEndPageHooks();
}
exports.drawTable = drawTable;
function getRemainingLineCount(cell, remainingPageSpace) {
    var fontHeight = cell.styles.fontSize / state_1.default().scaleFactor() * config_1.FONT_ROW_RATIO;
    var vPadding = cell.padding('vertical');
    var remainingLines = Math.floor((remainingPageSpace - vPadding) / fontHeight);
    return Math.max(0, remainingLines);
}
function modifyRowToFit(row, remainingPageSpace, table) {
    var remainderRow = new models_1.Row(row.raw, -1, row.section);
    remainderRow.spansMultiplePages = true;
    row.spansMultiplePages = true;
    row.height = 0;
    row.maxCellHeight = 0;
    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
        var column = _a[_i];
        var cell = row.cells[column.index];
        if (!cell)
            continue;
        if (!Array.isArray(cell.text)) {
            cell.text = [cell.text];
        }
        var remainderCell = new models_1.Cell(cell.raw, {}, cell.section);
        remainderCell = assign(remainderCell, cell);
        remainderCell.textPos = assign({}, cell.textPos);
        remainderCell.text = [];
        var remainingLineCount = getRemainingLineCount(cell, remainingPageSpace);
        if (cell.text.length > remainingLineCount) {
            remainderCell.text = cell.text.splice(remainingLineCount, cell.text.length);
        }
        cell.contentHeight = cell.getContentHeight();
        if (cell.contentHeight > row.height) {
            row.height = cell.contentHeight;
            row.maxCellHeight = cell.contentHeight;
        }
        remainderCell.contentHeight = remainderCell.getContentHeight();
        if (remainderCell.contentHeight > remainderRow.height) {
            remainderRow.height = remainderCell.contentHeight;
            remainderRow.maxCellHeight = remainderCell.contentHeight;
        }
        remainderRow.cells[column.index] = remainderCell;
    }
    for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
        var column = _c[_b];
        var remainderCell = remainderRow.cells[column.index];
        if (remainderCell) {
            remainderCell.height = remainderRow.height;
        }
        var cell = row.cells[column.index];
        if (cell) {
            cell.height = row.height;
        }
    }
    return remainderRow;
}
function shouldPrintOnCurrentPage(row, remainingPageSpace, table) {
    var pageHeight = state_1.default().pageHeight();
    var marginHeight = table.margin('top') - table.margin('bottom');
    var maxTableHeight = pageHeight - marginHeight;
    var minRowFits = row.getMinimumRowHeight() < remainingPageSpace;
    if (row.getMinimumRowHeight() > maxTableHeight) {
        console.error("Will not be able to print row " + row.index + " correctly since it's minimum height is larger than page height");
        return true;
    }
    var rowHasRowSpanCell = table.columns.filter(function (column) {
        var cell = row.cells[column.index];
        if (!cell)
            return false;
        return cell.rowSpan > 1;
    }).length > 0;
    if (!minRowFits) {
        return false;
    }
    var rowHigherThanPage = row.maxCellHeight > maxTableHeight;
    if (rowHigherThanPage) {
        if (rowHasRowSpanCell) {
            console.error("The content of row " + row.index + " will not be drawn correctly since drawing rows with a height larger than the page height and has cells with rowspans is not supported.");
        }
        return true;
    }
    if (rowHasRowSpanCell) {
        // Currently a new page is required whenever a rowspan row don't fit a page.
        return false;
    }
    if (table.settings.rowPageBreak === 'avoid') {
        return false;
    }
    // In all other cases print the row on current page
    return true;
}
function printFullRow(row, isLastRow) {
    var table = state_1.default().table;
    var remainingPageSpace = getRemainingPageSpace(isLastRow);
    if (row.canEntireRowFit(remainingPageSpace)) {
        printRow(row);
    }
    else {
        if (shouldPrintOnCurrentPage(row, remainingPageSpace, table)) {
            var remainderRow = modifyRowToFit(row, remainingPageSpace, table);
            printRow(row);
            addPage();
            printFullRow(remainderRow, isLastRow);
        }
        else {
            addPage();
            printFullRow(row, isLastRow);
        }
    }
}
function printRow(row) {
    var table = state_1.default().table;
    table.cursor.x = table.margin('left');
    row.y = table.cursor.y;
    row.x = table.cursor.x;
    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
        var column = _a[_i];
        var cell = row.cells[column.index];
        if (!cell) {
            table.cursor.x += column.width;
            continue;
        }
        common_1.applyStyles(cell.styles);
        cell.x = table.cursor.x;
        cell.y = row.y;
        if (cell.styles.valign === 'top') {
            cell.textPos.y = table.cursor.y + cell.padding('top');
        }
        else if (cell.styles.valign === 'bottom') {
            cell.textPos.y = table.cursor.y + cell.height - cell.padding('bottom');
        }
        else {
            cell.textPos.y = table.cursor.y + cell.height / 2;
        }
        if (cell.styles.halign === 'right') {
            cell.textPos.x = cell.x + cell.width - cell.padding('right');
        }
        else if (cell.styles.halign === 'center') {
            cell.textPos.x = cell.x + cell.width / 2;
        }
        else {
            cell.textPos.x = cell.x + cell.padding('left');
        }
        if (table.callCellHooks(table.cellHooks.willDrawCell, cell, row, column) === false) {
            table.cursor.x += column.width;
            continue;
        }
        var fillStyle = common_1.getFillStyle(cell.styles);
        if (fillStyle) {
            state_1.default().doc.rect(cell.x, table.cursor.y, cell.width, cell.height, fillStyle);
        }
        state_1.default().doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
            halign: cell.styles.halign,
            valign: cell.styles.valign,
            maxWidth: Math.ceil(cell.width - cell.padding('left') - cell.padding('right'))
        });
        table.callCellHooks(table.cellHooks.didDrawCell, cell, row, column);
        table.cursor.x += column.width;
    }
    table.cursor.y += row.height;
}
function getRemainingPageSpace(isLastRow) {
    var table = state_1.default().table;
    var bottomContentHeight = table.margin('bottom');
    var showFoot = table.settings.showFoot;
    if (showFoot === true || showFoot === 'everyPage' || (showFoot === 'lastPage' && isLastRow)) {
        bottomContentHeight += table.footHeight;
    }
    return state_1.default().pageHeight() - table.cursor.y - bottomContentHeight;
}
function addPage() {
    var table = state_1.default().table;
    common_1.applyUserStyles();
    if (table.settings.showFoot === true || table.settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(row); });
    }
    table.finalY = table.cursor.y;
    // Add user content just before adding new page ensure it will
    // be drawn above other things on the page
    table.callEndPageHooks();
    common_1.addTableBorder();
    nextPage(state_1.default().doc);
    table.pageNumber++;
    table.cursor = { x: table.margin('left'), y: table.margin('top') };
    table.pageStartX = table.cursor.x;
    table.pageStartY = table.cursor.y;
    if (table.settings.showHead === true || table.settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(row); });
    }
}
exports.addPage = addPage;
function nextPage(doc) {
    var current = state_1.default().pageNumber();
    doc.setPage(current + 1);
    var newCurrent = state_1.default().pageNumber();
    if (newCurrent === current) {
        doc.addPage();
    }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = __webpack_require__(0);
var HookData = /** @class */ (function () {
    function HookData() {
        var table = state_1.default().table;
        this.table = table;
        this.pageNumber = table.pageNumber;
        this.settings = table.settings;
        this.cursor = table.cursor;
        this.doc = state_1.default().doc;
    }
    Object.defineProperty(HookData.prototype, "pageCount", {
        get: function () {
            return this.pageNumber;
        },
        enumerable: true,
        configurable: true
    });
    return HookData;
}());
exports.HookData = HookData;
var CellHookData = /** @class */ (function (_super) {
    __extends(CellHookData, _super);
    function CellHookData(cell, row, column) {
        var _this = _super.call(this) || this;
        _this.cell = cell;
        _this.row = row;
        _this.column = column;
        _this.section = row.section;
        return _this;
    }
    return CellHookData;
}(HookData));
exports.CellHookData = CellHookData;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(1);
var state_1 = __webpack_require__(0);
/**
 * Calculate the column widths
 */
function calculateWidths(table) {
    var columnMinWidth = 10 / state_1.default().scaleFactor();
    if (columnMinWidth * table.columns.length > table.width) {
        console.error('Columns could not fit on page');
    }
    else if (table.minWidth > table.width) {
        // Would be nice to improve the user experience of this
        console.error("Column widths too wide and can't fit page");
    }
    var copy = table.columns.slice(0);
    var diffWidth = table.width - table.wrappedWidth;
    distributeWidth(copy, diffWidth, table.wrappedWidth);
    applyColSpans(table);
    fitContent(table);
    applyRowSpans(table);
}
exports.calculateWidths = calculateWidths;
function applyRowSpans(table) {
    var rowSpanCells = {};
    var colRowSpansLeft = 1;
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var data = rowSpanCells[column.index];
            if (colRowSpansLeft > 1) {
                colRowSpansLeft--;
                delete row.cells[column.index];
            }
            else if (data) {
                data.cell.height += row.height;
                if (data.cell.height > row.maxCellHeight) {
                    data.row.maxCellHeight = data.cell.height;
                }
                colRowSpansLeft = data.cell.colSpan;
                delete row.cells[column.index];
                data.left--;
                if (data.left <= 1) {
                    delete rowSpanCells[column.index];
                }
            }
            else {
                var cell = row.cells[column.index];
                if (!cell) {
                    continue;
                }
                cell.height = row.height;
                if (cell.rowSpan > 1) {
                    var remaining = all.length - rowIndex;
                    var left = cell.rowSpan > remaining ? remaining : cell.rowSpan;
                    rowSpanCells[column.index] = { cell: cell, left: left, row: row };
                }
            }
        }
        if (row.section === 'head') {
            table.headHeight += row.maxCellHeight;
        }
        if (row.section === 'foot') {
            table.footHeight += row.maxCellHeight;
        }
        table.height += row.height;
    }
}
function applyColSpans(table) {
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        var colSpanCell = null;
        var combinedColSpanWidth = 0;
        var colSpansLeft = 0;
        for (var columnIndex = 0; columnIndex < table.columns.length; columnIndex++) {
            var column = table.columns[columnIndex];
            var cell = null;
            // Width and colspan
            colSpansLeft -= 1;
            if (colSpansLeft > 1 && table.columns[columnIndex + 1]) {
                combinedColSpanWidth += column.width;
                delete row.cells[column.index];
                continue;
            }
            else if (colSpanCell) {
                cell = colSpanCell;
                delete row.cells[column.index];
                colSpanCell = null;
            }
            else {
                cell = row.cells[column.index];
                if (!cell)
                    continue;
                colSpansLeft = cell.colSpan;
                combinedColSpanWidth = 0;
                if (cell.colSpan > 1) {
                    colSpanCell = cell;
                    combinedColSpanWidth += column.width;
                    continue;
                }
            }
            cell.width = column.width + combinedColSpanWidth;
        }
    }
}
function fitContent(table) {
    var rowSpanHeight = { count: 0, height: 0 };
    for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
        var row = _a[_i];
        for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
            var column = _c[_b];
            var cell = row.cells[column.index];
            if (!cell)
                continue;
            common_1.applyStyles(cell.styles);
            var textSpace = cell.width - cell.padding('horizontal');
            if (cell.styles.overflow === 'linebreak') {
                // Add one pt to textSpace to fix rounding error
                cell.text = state_1.default().doc.splitTextToSize(cell.text, textSpace + 1 / (state_1.default().scaleFactor() || 1), { fontSize: cell.styles.fontSize });
            }
            else if (cell.styles.overflow === 'ellipsize') {
                cell.text = common_1.ellipsize(cell.text, textSpace, cell.styles);
            }
            else if (cell.styles.overflow === 'hidden') {
                cell.text = common_1.ellipsize(cell.text, textSpace, cell.styles, '');
            }
            else if (typeof cell.styles.overflow === 'function') {
                cell.text = cell.styles.overflow(cell.text, textSpace);
            }
            cell.contentHeight = cell.getContentHeight();
            if (cell.styles.minCellHeight > cell.contentHeight) {
                cell.contentHeight = cell.styles.minCellHeight;
            }
            var realContentHeight = cell.contentHeight / cell.rowSpan;
            if (cell.rowSpan > 1 && (rowSpanHeight.count * rowSpanHeight.height < realContentHeight * cell.rowSpan)) {
                rowSpanHeight = { height: realContentHeight, count: cell.rowSpan };
            }
            else if (rowSpanHeight && rowSpanHeight.count > 0) {
                if (rowSpanHeight.height > realContentHeight) {
                    realContentHeight = rowSpanHeight.height;
                }
            }
            if (realContentHeight > row.height) {
                row.height = realContentHeight;
                row.maxCellHeight = realContentHeight;
            }
        }
        rowSpanHeight.count--;
    }
}
function distributeWidth(autoColumns, diffWidth, wrappedAutoColumnsWidth) {
    for (var i = 0; i < autoColumns.length; i++) {
        var column = autoColumns[i];
        var ratio = column.wrappedWidth / wrappedAutoColumnsWidth;
        var suggestedChange = diffWidth * ratio;
        var suggestedWidth = column.wrappedWidth + suggestedChange;
        if (suggestedWidth >= column.minWidth) {
            column.width = suggestedWidth;
        }
        else {
            // We can't reduce the width of this column. Mark as none auto column and start over
            // Add 1 to minWidth as linebreaks calc otherwise sometimes made two rows
            column.width = column.minWidth + 1 / state_1.default().scaleFactor();
            wrappedAutoColumnsWidth -= column.wrappedWidth;
            autoColumns.splice(i, 1);
            distributeWidth(autoColumns, diffWidth, wrappedAutoColumnsWidth);
            break;
        }
    }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(4);
var config_1 = __webpack_require__(2);
var htmlParser_1 = __webpack_require__(6);
var polyfills_1 = __webpack_require__(3);
var common_1 = __webpack_require__(1);
var state_1 = __webpack_require__(0);
var inputValidator_1 = __webpack_require__(14);
/**
 * Create models from the user input
 */
function parseInput(args) {
    var tableOptions = parseUserArguments(args);
    var globalOptions = state_1.getGlobalOptions();
    var documentOptions = state_1.getDocumentOptions();
    var allOptions = [globalOptions, documentOptions, tableOptions];
    inputValidator_1.default(allOptions);
    var table = new models_1.Table();
    state_1.default().table = table;
    table.id = tableOptions.tableId;
    var doc = state_1.default().doc;
    table.userStyles = {
        // Setting to black for versions of jspdf without getTextColor
        textColor: doc.getTextColor ? doc.getTextColor() : 0,
        fontSize: doc.internal.getFontSize(),
        fontStyle: doc.internal.getFont().fontStyle,
        font: doc.internal.getFont().fontName
    };
    var _loop_1 = function (styleProp) {
        var styles = allOptions.map(function (opts) { return opts[styleProp] || {}; });
        table.styles[styleProp] = polyfills_1.assign.apply(void 0, [{}].concat(styles));
    };
    // Merge styles one level deeper
    for (var _i = 0, _a = Object.keys(table.styles); _i < _a.length; _i++) {
        var styleProp = _a[_i];
        _loop_1(styleProp);
    }
    // Append hooks
    for (var _b = 0, allOptions_1 = allOptions; _b < allOptions_1.length; _b++) {
        var opts = allOptions_1[_b];
        for (var _c = 0, _d = Object.keys(table.cellHooks); _c < _d.length; _c++) {
            var hookName = _d[_c];
            if (opts && typeof opts[hookName] === 'function') {
                table.cellHooks[hookName].push(opts[hookName]);
            }
        }
    }
    table.settings = polyfills_1.assign.apply(void 0, [{}, config_1.defaultConfig()].concat(allOptions));
    table.settings.margin = common_1.marginOrPadding(table.settings.margin, config_1.defaultConfig().margin);
    if (table.settings.theme === 'auto') {
        table.settings.theme = table.settings.useCss ? 'plain' : 'striped';
    }
    if (table.settings.startY === false) {
        delete table.settings.startY;
    }
    var previous = state_1.default().doc.previousAutoTable;
    var isSamePageAsPrevious = previous && previous.startPageNumber + previous.pageNumber - 1 === state_1.default().pageNumber();
    if (table.settings.startY == null && isSamePageAsPrevious) {
        table.settings.startY = previous.finalY + 20 / state_1.default().scaleFactor();
    }
    var htmlContent = {};
    if (table.settings.html) {
        htmlContent = htmlParser_1.parseHtml(table.settings.html, table.settings.includeHiddenHtml, table.settings.useCss) || {};
    }
    table.settings.head = htmlContent.head || table.settings.head || [];
    table.settings.body = htmlContent.body || table.settings.body || [];
    table.settings.foot = htmlContent.foot || table.settings.foot || [];
    parseContent(table);
    table.minWidth = table.columns.reduce(function (total, col) { return (total + col.minWidth); }, 0);
    table.wrappedWidth = table.columns.reduce(function (total, col) { return (total + col.wrappedWidth); }, 0);
    if (typeof table.settings.tableWidth === 'number') {
        table.width = table.settings.tableWidth;
    }
    else if (table.settings.tableWidth === 'wrap') {
        table.width = table.wrappedWidth;
    }
    else {
        table.width = state_1.default().pageWidth() - table.margin('left') - table.margin('right');
    }
    return table;
}
exports.parseInput = parseInput;
function parseUserArguments(args) {
    // Normal initialization on format doc.autoTable(options)
    if (args.length === 1) {
        return args[0];
    }
    else {
        // Deprecated initialization on format doc.autoTable(columns, body, [options])
        var opts = args[2] || {};
        opts.body = args[1];
        opts.columns = args[0];
        opts.columns.forEach(function (col) {
            // Support v2 title prop in v3
            if (typeof col === 'object' && col.header == null) {
                col.header = col.title;
            }
        });
        return opts;
    }
}
function parseContent(table) {
    var settings = table.settings;
    table.columns = getTableColumns(settings);
    var _loop_2 = function (sectionName) {
        var rowSpansLeftForColumn = {};
        var sectionRows = settings[sectionName];
        if (sectionRows.length === 0 && settings.columns && sectionName !== 'body') {
            // If no head or foot is set, try generating one with content in columns
            var sectionRow = generateSectionRowFromColumnData(table, sectionName);
            if (sectionRow) {
                sectionRows.push(sectionRow);
            }
        }
        sectionRows.forEach(function (rawRow, rowIndex) {
            var skippedRowForRowSpans = 0;
            var row = new models_1.Row(rawRow, rowIndex, sectionName);
            table[sectionName].push(row);
            var colSpansAdded = 0;
            var columnSpansLeft = 0;
            for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                if (rowSpansLeftForColumn[column.index] == null || rowSpansLeftForColumn[column.index].left === 0) {
                    if (columnSpansLeft === 0) {
                        var rawCell = void 0;
                        if (Array.isArray(rawRow)) {
                            rawCell = rawRow[column.index - colSpansAdded - skippedRowForRowSpans];
                        }
                        else {
                            rawCell = rawRow[column.dataKey];
                        }
                        var styles = cellStyles(sectionName, column, rowIndex);
                        var cell = new models_1.Cell(rawCell, styles, sectionName);
                        // dataKey is not used internally anymore but keep for backwards compat in hooks
                        row.cells[column.dataKey] = cell;
                        row.cells[column.index] = cell;
                        columnSpansLeft = cell.colSpan - 1;
                        rowSpansLeftForColumn[column.index] = { left: cell.rowSpan - 1, times: columnSpansLeft };
                    }
                    else {
                        columnSpansLeft--;
                        colSpansAdded++;
                    }
                }
                else {
                    rowSpansLeftForColumn[column.index].left--;
                    columnSpansLeft = rowSpansLeftForColumn[column.index].times;
                    skippedRowForRowSpans++;
                }
            }
        });
    };
    for (var _i = 0, _a = ['head', 'body', 'foot']; _i < _a.length; _i++) {
        var sectionName = _a[_i];
        _loop_2(sectionName);
    }
    table.allRows().forEach(function (row) {
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var cell = row.cells[column.index];
            // For now we ignore the minWidth and wrappedWidth of colspan cells when calculating colspan widths.
            // Could probably be improved upon however.
            if (cell && cell.colSpan === 1) {
                if (cell.wrappedWidth > column.wrappedWidth) {
                    column.wrappedWidth = cell.wrappedWidth;
                }
                if (cell.minWidth > column.minWidth) {
                    column.minWidth = cell.minWidth;
                }
            }
            else {
                // Respect cellWidth set in columnStyles even if there is no cells for this column
                // or of it the column only have colspan cells. Since the width of colspan cells
                // does not affect the width of columns, setting columnStyles cellWidth enables the
                // user to at least do it manually.
                // Note that this is not perfect for now since for example row and table styles are
                // not accounted for
                var columnStyles = table.styles.columnStyles[column.dataKey] || table.styles.columnStyles[column.index] || {};
                var cellWidth = columnStyles.cellWidth;
                if (cellWidth) {
                    column.minWidth = cellWidth;
                    column.wrappedWidth = cellWidth;
                }
            }
            // Make sure all columns get at least min width even though width calculations are not based on them
            if (cell && cell.colSpan > 1 && !column.minWidth) {
                column.minWidth = cell.minWidth;
            }
            if (cell && cell.colSpan > 1 && !column.wrappedWidth) {
                column.wrappedWidth = cell.minWidth;
            }
            table.callCellHooks(table.cellHooks.didParseCell, cell, row, column);
        }
    });
}
function generateSectionRowFromColumnData(table, sectionName) {
    var sectionRow = {};
    table.columns
        .forEach(function (col) {
        var columnData = col.raw;
        if (sectionName === 'head') {
            var val = columnData && columnData.header ? columnData.header : columnData;
            if (val) {
                sectionRow[col.dataKey] = val;
            }
        }
        else if (sectionName === 'foot' && columnData.footer) {
            sectionRow[col.dataKey] = columnData.footer;
        }
    });
    return Object.keys(sectionRow).length > 0 ? sectionRow : null;
}
function getTableColumns(settings) {
    if (settings.columns) {
        var cols = settings.columns.map(function (input, index) {
            var key = input.dataKey || input.key || index;
            return new models_1.Column(key, input, index);
        });
        return cols;
    }
    else {
        var firstRow_1 = settings.head[0] || settings.body[0] || settings.foot[0] || [];
        var columns_1 = [];
        Object.keys(firstRow_1)
            .filter(function (key) { return key !== '_element'; })
            .forEach(function (key) {
            var colSpan = firstRow_1[key].colSpan || 1;
            for (var i = 0; i < colSpan; i++) {
                var id = void 0;
                if (Array.isArray(firstRow_1)) {
                    id = columns_1.length;
                }
                else {
                    id = key + (i > 0 ? "_" + i : '');
                }
                columns_1.push(new models_1.Column(id, id, columns_1.length));
            }
        });
        return columns_1;
    }
}
function cellStyles(sectionName, column, rowIndex) {
    var table = state_1.default().table;
    var theme = config_1.getTheme(table.settings.theme);
    var otherStyles = [theme.table, theme[sectionName], table.styles.styles, table.styles[sectionName + "Styles"]];
    var columnStyles = table.styles.columnStyles[column.dataKey] || table.styles.columnStyles[column.index] || {};
    var colStyles = sectionName === 'body' ? columnStyles : {};
    var rowStyles = sectionName === 'body' && rowIndex % 2 === 0 ? polyfills_1.assign({}, theme.alternateRow, table.styles.alternateRowStyles) : {};
    return polyfills_1.assign.apply(void 0, [config_1.defaultStyles()].concat(otherStyles.concat([rowStyles, colStyles])));
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Limitations
// - No support for border spacing
// - No support for transparency
var common_1 = __webpack_require__(1);
var state_1 = __webpack_require__(0);
function parseCss(element, scaleFactor, ignored) {
    if (ignored === void 0) { ignored = []; }
    var result = {};
    var style = window.getComputedStyle(element);
    function assign(name, value, accepted) {
        if (accepted === void 0) { accepted = []; }
        if ((accepted.length === 0 || accepted.indexOf(value) !== -1) && ignored.indexOf(name) === -1) {
            if (value === 0 || value) {
                result[name] = value;
            }
        }
    }
    var pxScaleFactor = 96 / 72;
    assign('fillColor', parseColor(element, 'backgroundColor'));
    assign('fontStyle', parseFontStyle(style));
    assign('textColor', parseColor(element, 'color'));
    assign('halign', style.textAlign, ['left', 'right', 'center', 'justify']);
    assign('valign', style.verticalAlign, ['middle', 'bottom', 'top']);
    assign('fontSize', parseInt(style.fontSize || '') / pxScaleFactor);
    assign('cellPadding', parsePadding(style.padding, style.fontSize, style.lineHeight, scaleFactor));
    // style.borderWidth only works in chrome (borderTopWidth etc works in firefox and ie as well)
    assign('lineWidth', parseInt(style.borderTopWidth || '') / pxScaleFactor / scaleFactor);
    assign('lineColor', parseColor(element, 'borderTopColor'));
    var font = (style.fontFamily || '').toLowerCase();
    if (state_1.default().doc.getFontList()[font]) {
        assign('font', font);
    }
    return result;
}
exports.parseCss = parseCss;
function parseFontStyle(style) {
    var res = '';
    if (style.fontWeight === 'bold' || style.fontWeight === 'bolder' || parseInt(style.fontWeight) >= 700) {
        res += 'bold';
    }
    if (style.fontStyle === 'italic' || style.fontStyle === 'oblique') {
        res += 'italic';
    }
    return res;
}
function parseColor(element, colorProp) {
    var cssColor = realColor(element, colorProp);
    if (!cssColor)
        return null;
    var rgba = cssColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d*))?\)$/);
    if (!rgba || !Array.isArray(rgba)) {
        return null;
    }
    var color = [parseInt(rgba[1]), parseInt(rgba[2]), parseInt(rgba[3])];
    var alpha = parseInt(rgba[4]);
    if (alpha === 0 || isNaN(color[0]) || isNaN(color[1]) || isNaN(color[2])) {
        return null;
    }
    return color;
}
function realColor(elem, colorProp) {
    if (!elem)
        return null;
    var bg = window.getComputedStyle(elem)[colorProp];
    if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent' || bg === 'initial' || bg === 'inherit') {
        return realColor(elem.parentElement, colorProp);
    }
    else {
        return bg;
    }
}
function parsePadding(val, fontSize, lineHeight, scaleFactor) {
    if (!val)
        return null;
    var pxScaleFactor = (96 / (72 / scaleFactor));
    var linePadding = (parseInt(lineHeight) - parseInt(fontSize)) / scaleFactor / 2;
    var padding = val.split(' ').map(function (n) {
        return parseInt(n) / pxScaleFactor;
    });
    padding = common_1.marginOrPadding(padding, 0);
    if (linePadding > padding.top) {
        padding.top = linePadding;
    }
    if (linePadding > padding.bottom) {
        padding.bottom = linePadding;
    }
    return padding;
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(1);
function default_1(allOptions) {
    var _loop_1 = function (settings) {
        if (settings && typeof settings !== 'object') {
            console.error("The options parameter should be of type object, is: " + typeof settings);
        }
        if (typeof settings.extendWidth !== 'undefined') {
            settings.tableWidth = settings.extendWidth ? 'auto' : 'wrap';
            console.error("Use of deprecated option: extendWidth, use tableWidth instead.");
        }
        if (typeof settings.margins !== 'undefined') {
            if (typeof settings.margin === 'undefined')
                settings.margin = settings.margins;
            console.error("Use of deprecated option: margins, use margin instead.");
        }
        if (settings.startY && typeof settings.startY !== 'number') {
            console.error('Invalid value for startY option', settings.startY);
            delete settings.startY;
        }
        if (!settings.didDrawPage && (settings.afterPageContent || settings.beforePageContent || settings.afterPageAdd)) {
            console.error("The afterPageContent, beforePageContent and afterPageAdd hooks are deprecated. Use didDrawPage instead");
            settings.didDrawPage = function (data) {
                common_1.applyUserStyles();
                if (settings.beforePageContent)
                    settings.beforePageContent(data);
                common_1.applyUserStyles();
                if (settings.afterPageContent)
                    settings.afterPageContent(data);
                common_1.applyUserStyles();
                if (settings.afterPageAdd && data.pageNumber > 1) {
                    data.afterPageAdd(data);
                }
                common_1.applyUserStyles();
            };
        }
        ["createdHeaderCell", "drawHeaderRow", "drawRow", "drawHeaderCell"].forEach(function (name) {
            if (settings[name]) {
                console.error("The \"" + name + "\" hook has changed in version 3.0, check the changelog for how to migrate.");
            }
        });
        [['showFoot', 'showFooter'], ['showHead', 'showHeader'], ['didDrawPage', 'addPageContent'], ['didParseCell', 'createdCell'], ['headStyles', 'headerStyles']].forEach(function (_a) {
            var current = _a[0], deprecated = _a[1];
            if (settings[deprecated]) {
                console.error("Use of deprecated option " + deprecated + ". Use " + current + " instead");
                settings[current] = settings[deprecated];
            }
        });
        [['padding', 'cellPadding'], ['lineHeight', 'rowHeight'], 'fontSize', 'overflow'].forEach(function (o) {
            var deprecatedOption = typeof o === 'string' ? o : o[0];
            var style = typeof o === 'string' ? o : o[1];
            if (typeof settings[deprecatedOption] !== 'undefined') {
                if (typeof settings.styles[style] === 'undefined') {
                    settings.styles[style] = settings[deprecatedOption];
                }
                console.error("Use of deprecated option: " + deprecatedOption + ", use the style " + style + " instead.");
            }
        });
        for (var _i = 0, _a = ['styles', 'bodyStyles', 'headStyles', 'footStyles']; _i < _a.length; _i++) {
            var styleProp = _a[_i];
            checkStyles(settings[styleProp] || {});
        }
        var columnStyles = settings['columnStyles'] || {};
        for (var _b = 0, _c = Object.keys(columnStyles); _b < _c.length; _b++) {
            var key = _c[_b];
            checkStyles(columnStyles[key] || {});
        }
    };
    for (var _i = 0, allOptions_1 = allOptions; _i < allOptions_1.length; _i++) {
        var settings = allOptions_1[_i];
        _loop_1(settings);
    }
}
exports.default = default_1;
function checkStyles(styles) {
    if (styles.rowHeight) {
        console.error("Use of deprecated style rowHeight. It is renamed to minCellHeight.");
        if (!styles.minCellHeight) {
            styles.minCellHeight = styles.rowHeight;
        }
    }
    else if (styles.columnWidth) {
        console.error("Use of deprecated style columnWidth. It is renamed to cellWidth.");
        if (!styles.cellWidth) {
            styles.cellWidth = styles.columnWidth;
        }
    }
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var jsPDF = __webpack_require__(7);
/**
 * Improved text function with halign and valign support
 * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
 */
jsPDF.API.autoTableText = function (text, x, y, styles) {
    styles = styles || {};
    var FONT_ROW_RATIO = 1.15;
    if (typeof x !== 'number' || typeof y !== 'number') {
        console.error('The x and y parameters are required. Missing for text: ', text);
    }
    var k = this.internal.scaleFactor;
    var fontSize = this.internal.getFontSize() / k;
    var splitRegex = /\r\n|\r|\n/g;
    var splitText = null;
    var lineCount = 1;
    if (styles.valign === 'middle' || styles.valign === 'bottom' || styles.halign === 'center' || styles.halign === 'right') {
        splitText = typeof text === 'string' ? text.split(splitRegex) : text;
        lineCount = splitText.length || 1;
    }
    // Align the top
    y += fontSize * (2 - FONT_ROW_RATIO);
    if (styles.valign === 'middle')
        y -= (lineCount / 2) * fontSize * FONT_ROW_RATIO;
    else if (styles.valign === 'bottom')
        y -= lineCount * fontSize * FONT_ROW_RATIO;
    if (styles.halign === 'center' || styles.halign === 'right') {
        var alignSize = fontSize;
        if (styles.halign === 'center')
            alignSize *= 0.5;
        if (lineCount >= 1) {
            for (var iLine = 0; iLine < splitText.length; iLine++) {
                this.text(splitText[iLine], x - this.getStringUnitWidth(splitText[iLine]) * alignSize, y);
                y += fontSize * FONT_ROW_RATIO;
            }
            return this;
        }
        x -= this.getStringUnitWidth(text) * alignSize;
    }
    if (styles.halign === 'justify') {
        this.text(text, x, y, { maxWidth: styles.maxWidth || 100, align: 'justify' });
    }
    else {
        this.text(text, x, y);
    }
    return this;
};


/***/ })
/******/ ]);
});