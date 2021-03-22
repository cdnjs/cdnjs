// powerbi-client v2.18.0
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["powerbi-client"] = factory();
	else
		root["powerbi-client"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/powerbi-client.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/http-post-message/dist/httpPostMessage.js":
/*!****************************************************************!*\
  !*** ./node_modules/http-post-message/dist/httpPostMessage.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! http-post-message v0.2.3 | (c) 2016 Microsoft Corporation MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	var HttpPostMessage = (function () {
	    function HttpPostMessage(windowPostMessageProxy, defaultHeaders, defaultTargetWindow) {
	        if (defaultHeaders === void 0) { defaultHeaders = {}; }
	        this.defaultHeaders = defaultHeaders;
	        this.defaultTargetWindow = defaultTargetWindow;
	        this.windowPostMessageProxy = windowPostMessageProxy;
	    }
	    // TODO: See if it's possible to share tracking properties interface?
	    // The responsibility of knowing how to configure windowPostMessageProxy for http should
	    // live in this http class, but the configuration would need ITrackingProperties
	    // interface which lives in WindowPostMessageProxy. Use <any> type as workaround
	    HttpPostMessage.addTrackingProperties = function (message, trackingProperties) {
	        message.headers = message.headers || {};
	        if (trackingProperties && trackingProperties.id) {
	            message.headers.id = trackingProperties.id;
	        }
	        return message;
	    };
	    HttpPostMessage.getTrackingProperties = function (message) {
	        return {
	            id: message.headers && message.headers.id
	        };
	    };
	    HttpPostMessage.isErrorMessage = function (message) {
	        if (typeof (message && message.statusCode) !== 'number') {
	            return false;
	        }
	        return !(200 <= message.statusCode && message.statusCode < 300);
	    };
	    HttpPostMessage.prototype.get = function (url, headers, targetWindow) {
	        if (headers === void 0) { headers = {}; }
	        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
	        return this.send({
	            method: "GET",
	            url: url,
	            headers: headers
	        }, targetWindow);
	    };
	    HttpPostMessage.prototype.post = function (url, body, headers, targetWindow) {
	        if (headers === void 0) { headers = {}; }
	        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
	        return this.send({
	            method: "POST",
	            url: url,
	            headers: headers,
	            body: body
	        }, targetWindow);
	    };
	    HttpPostMessage.prototype.put = function (url, body, headers, targetWindow) {
	        if (headers === void 0) { headers = {}; }
	        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
	        return this.send({
	            method: "PUT",
	            url: url,
	            headers: headers,
	            body: body
	        }, targetWindow);
	    };
	    HttpPostMessage.prototype.patch = function (url, body, headers, targetWindow) {
	        if (headers === void 0) { headers = {}; }
	        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
	        return this.send({
	            method: "PATCH",
	            url: url,
	            headers: headers,
	            body: body
	        }, targetWindow);
	    };
	    HttpPostMessage.prototype.delete = function (url, body, headers, targetWindow) {
	        if (body === void 0) { body = null; }
	        if (headers === void 0) { headers = {}; }
	        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
	        return this.send({
	            method: "DELETE",
	            url: url,
	            headers: headers,
	            body: body
	        }, targetWindow);
	    };
	    HttpPostMessage.prototype.send = function (request, targetWindow) {
	        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
	        request.headers = this.assign({}, this.defaultHeaders, request.headers);
	        if (!targetWindow) {
	            throw new Error("target window is not provided.  You must either provide the target window explicitly as argument to request, or specify default target window when constructing instance of this class.");
	        }
	        return this.windowPostMessageProxy.postMessage(targetWindow, request);
	    };
	    /**
	     * Object.assign() polyfill
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	     */
	    HttpPostMessage.prototype.assign = function (target) {
	        var sources = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            sources[_i - 1] = arguments[_i];
	        }
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	        var output = Object(target);
	        sources.forEach(function (source) {
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        });
	        return output;
	    };
	    return HttpPostMessage;
	}());
	exports.HttpPostMessage = HttpPostMessage;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=httpPostMessage.js.map

/***/ }),

/***/ "./node_modules/powerbi-models/dist/models.js":
/*!****************************************************!*\
  !*** ./node_modules/powerbi-models/dist/models.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// powerbi-models v1.9.0
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.validateCustomTheme = exports.validateCommandsSettings = exports.validateVisualSettings = exports.validateVisualHeader = exports.validateExportDataRequest = exports.validateQnaInterpretInputData = exports.validateLoadQnaConfiguration = exports.validateSaveAsParameters = exports.validateUpdateFiltersRequest = exports.validateFilter = exports.validatePage = exports.validateTileLoad = exports.validateDashboardLoad = exports.validateCreateReport = exports.validatePaginatedReportLoad = exports.validateReportLoad = exports.validateMenuGroupExtension = exports.validateExtension = exports.validateCustomPageSize = exports.validateVisualizationsPane = exports.validateSyncSlicersPane = exports.validateSelectionPane = exports.validatePageNavigationPane = exports.validateFieldsPane = exports.validateFiltersPane = exports.validateBookmarksPane = exports.validatePanes = exports.validateSettings = exports.validateCaptureBookmarkRequest = exports.validateApplyBookmarkStateRequest = exports.validateApplyBookmarkByNameRequest = exports.validateAddBookmarkRequest = exports.validatePlayBookmarkRequest = exports.validateSlicerState = exports.validateSlicer = exports.validateVisualSelector = exports.isIExtensionArray = exports.isIExtensions = exports.isGroupedMenuExtension = exports.isFlatMenuExtension = exports.isReportFiltersArray = exports.isOnLoadFilters = exports.VisualDataRoleKindPreference = exports.VisualDataRoleKind = exports.CommandDisplayOption = exports.SlicerTargetSelector = exports.VisualTypeSelector = exports.VisualSelector = exports.PageSelector = exports.Selector = exports.SortDirection = exports.LegendPosition = exports.TextAlignment = exports.CommonErrorCodes = exports.BookmarksPlayMode = exports.ExportDataType = exports.QnaMode = exports.PageNavigationPosition = exports.isColumnAggr = exports.isHierarchyLevelAggr = exports.isHierarchyLevel = exports.isColumn = exports.isMeasure = exports.getFilterType = exports.isBasicFilterWithKeys = exports.isFilterKeyColumnsTarget = exports.AdvancedFilter = exports.TupleFilter = exports.BasicFilterWithKeys = exports.BasicFilter = exports.RelativeTimeFilter = exports.RelativeDateFilter = exports.TopNFilter = exports.IncludeExcludeFilter = exports.NotSupportedFilter = exports.Filter = exports.RelativeDateOperators = exports.RelativeDateFilterTimeUnit = exports.FilterType = exports.FiltersLevel = exports.FiltersOperations = exports.MenuLocation = exports.ContrastMode = exports.TokenType = exports.ViewMode = exports.Permissions = exports.SectionVisibility = exports.HyperlinkClickBehavior = exports.LayoutType = exports.VisualContainerDisplayMode = exports.BackgroundType = exports.DisplayOption = exports.PageSizeType = exports.TraceType = void 0;
var validator_1 = __webpack_require__(1);
var TraceType;
(function (TraceType) {
    TraceType[TraceType["Information"] = 0] = "Information";
    TraceType[TraceType["Verbose"] = 1] = "Verbose";
    TraceType[TraceType["Warning"] = 2] = "Warning";
    TraceType[TraceType["Error"] = 3] = "Error";
    TraceType[TraceType["ExpectedError"] = 4] = "ExpectedError";
    TraceType[TraceType["UnexpectedError"] = 5] = "UnexpectedError";
    TraceType[TraceType["Fatal"] = 6] = "Fatal";
})(TraceType = exports.TraceType || (exports.TraceType = {}));
var PageSizeType;
(function (PageSizeType) {
    PageSizeType[PageSizeType["Widescreen"] = 0] = "Widescreen";
    PageSizeType[PageSizeType["Standard"] = 1] = "Standard";
    PageSizeType[PageSizeType["Cortana"] = 2] = "Cortana";
    PageSizeType[PageSizeType["Letter"] = 3] = "Letter";
    PageSizeType[PageSizeType["Custom"] = 4] = "Custom";
})(PageSizeType = exports.PageSizeType || (exports.PageSizeType = {}));
var DisplayOption;
(function (DisplayOption) {
    DisplayOption[DisplayOption["FitToPage"] = 0] = "FitToPage";
    DisplayOption[DisplayOption["FitToWidth"] = 1] = "FitToWidth";
    DisplayOption[DisplayOption["ActualSize"] = 2] = "ActualSize";
})(DisplayOption = exports.DisplayOption || (exports.DisplayOption = {}));
var BackgroundType;
(function (BackgroundType) {
    BackgroundType[BackgroundType["Default"] = 0] = "Default";
    BackgroundType[BackgroundType["Transparent"] = 1] = "Transparent";
})(BackgroundType = exports.BackgroundType || (exports.BackgroundType = {}));
var VisualContainerDisplayMode;
(function (VisualContainerDisplayMode) {
    VisualContainerDisplayMode[VisualContainerDisplayMode["Visible"] = 0] = "Visible";
    VisualContainerDisplayMode[VisualContainerDisplayMode["Hidden"] = 1] = "Hidden";
})(VisualContainerDisplayMode = exports.VisualContainerDisplayMode || (exports.VisualContainerDisplayMode = {}));
var LayoutType;
(function (LayoutType) {
    LayoutType[LayoutType["Master"] = 0] = "Master";
    LayoutType[LayoutType["Custom"] = 1] = "Custom";
    LayoutType[LayoutType["MobilePortrait"] = 2] = "MobilePortrait";
    LayoutType[LayoutType["MobileLandscape"] = 3] = "MobileLandscape";
})(LayoutType = exports.LayoutType || (exports.LayoutType = {}));
var HyperlinkClickBehavior;
(function (HyperlinkClickBehavior) {
    HyperlinkClickBehavior[HyperlinkClickBehavior["Navigate"] = 0] = "Navigate";
    HyperlinkClickBehavior[HyperlinkClickBehavior["NavigateAndRaiseEvent"] = 1] = "NavigateAndRaiseEvent";
    HyperlinkClickBehavior[HyperlinkClickBehavior["RaiseEvent"] = 2] = "RaiseEvent";
})(HyperlinkClickBehavior = exports.HyperlinkClickBehavior || (exports.HyperlinkClickBehavior = {}));
var SectionVisibility;
(function (SectionVisibility) {
    SectionVisibility[SectionVisibility["AlwaysVisible"] = 0] = "AlwaysVisible";
    SectionVisibility[SectionVisibility["HiddenInViewMode"] = 1] = "HiddenInViewMode";
})(SectionVisibility = exports.SectionVisibility || (exports.SectionVisibility = {}));
var Permissions;
(function (Permissions) {
    Permissions[Permissions["Read"] = 0] = "Read";
    Permissions[Permissions["ReadWrite"] = 1] = "ReadWrite";
    Permissions[Permissions["Copy"] = 2] = "Copy";
    Permissions[Permissions["Create"] = 4] = "Create";
    Permissions[Permissions["All"] = 7] = "All";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
var ViewMode;
(function (ViewMode) {
    ViewMode[ViewMode["View"] = 0] = "View";
    ViewMode[ViewMode["Edit"] = 1] = "Edit";
})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Aad"] = 0] = "Aad";
    TokenType[TokenType["Embed"] = 1] = "Embed";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var ContrastMode;
(function (ContrastMode) {
    ContrastMode[ContrastMode["None"] = 0] = "None";
    ContrastMode[ContrastMode["HighContrast1"] = 1] = "HighContrast1";
    ContrastMode[ContrastMode["HighContrast2"] = 2] = "HighContrast2";
    ContrastMode[ContrastMode["HighContrastBlack"] = 3] = "HighContrastBlack";
    ContrastMode[ContrastMode["HighContrastWhite"] = 4] = "HighContrastWhite";
})(ContrastMode = exports.ContrastMode || (exports.ContrastMode = {}));
var MenuLocation;
(function (MenuLocation) {
    MenuLocation[MenuLocation["Bottom"] = 0] = "Bottom";
    MenuLocation[MenuLocation["Top"] = 1] = "Top";
})(MenuLocation = exports.MenuLocation || (exports.MenuLocation = {}));
var FiltersOperations;
(function (FiltersOperations) {
    FiltersOperations[FiltersOperations["RemoveAll"] = 0] = "RemoveAll";
    FiltersOperations[FiltersOperations["ReplaceAll"] = 1] = "ReplaceAll";
    FiltersOperations[FiltersOperations["Add"] = 2] = "Add";
    FiltersOperations[FiltersOperations["Replace"] = 3] = "Replace";
})(FiltersOperations = exports.FiltersOperations || (exports.FiltersOperations = {}));
var FiltersLevel;
(function (FiltersLevel) {
    FiltersLevel[FiltersLevel["Report"] = 0] = "Report";
    FiltersLevel[FiltersLevel["Page"] = 1] = "Page";
    FiltersLevel[FiltersLevel["Visual"] = 2] = "Visual";
})(FiltersLevel = exports.FiltersLevel || (exports.FiltersLevel = {}));
var FilterType;
(function (FilterType) {
    FilterType[FilterType["Advanced"] = 0] = "Advanced";
    FilterType[FilterType["Basic"] = 1] = "Basic";
    FilterType[FilterType["Unknown"] = 2] = "Unknown";
    FilterType[FilterType["IncludeExclude"] = 3] = "IncludeExclude";
    FilterType[FilterType["RelativeDate"] = 4] = "RelativeDate";
    FilterType[FilterType["TopN"] = 5] = "TopN";
    FilterType[FilterType["Tuple"] = 6] = "Tuple";
    FilterType[FilterType["RelativeTime"] = 7] = "RelativeTime";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var RelativeDateFilterTimeUnit;
(function (RelativeDateFilterTimeUnit) {
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Days"] = 0] = "Days";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Weeks"] = 1] = "Weeks";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["CalendarWeeks"] = 2] = "CalendarWeeks";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Months"] = 3] = "Months";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["CalendarMonths"] = 4] = "CalendarMonths";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Years"] = 5] = "Years";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["CalendarYears"] = 6] = "CalendarYears";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Minutes"] = 7] = "Minutes";
    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Hours"] = 8] = "Hours";
})(RelativeDateFilterTimeUnit = exports.RelativeDateFilterTimeUnit || (exports.RelativeDateFilterTimeUnit = {}));
var RelativeDateOperators;
(function (RelativeDateOperators) {
    RelativeDateOperators[RelativeDateOperators["InLast"] = 0] = "InLast";
    RelativeDateOperators[RelativeDateOperators["InThis"] = 1] = "InThis";
    RelativeDateOperators[RelativeDateOperators["InNext"] = 2] = "InNext";
})(RelativeDateOperators = exports.RelativeDateOperators || (exports.RelativeDateOperators = {}));
var Filter = /** @class */ (function () {
    function Filter(target, filterType) {
        this.target = target;
        this.filterType = filterType;
    }
    Filter.prototype.toJSON = function () {
        var filter = {
            $schema: this.schemaUrl,
            target: this.target,
            filterType: this.filterType
        };
        // Add displaySettings only when defined
        if (this.displaySettings !== undefined) {
            filter.displaySettings = this.displaySettings;
        }
        return filter;
    };
    return Filter;
}());
exports.Filter = Filter;
var NotSupportedFilter = /** @class */ (function (_super) {
    __extends(NotSupportedFilter, _super);
    function NotSupportedFilter(target, message, notSupportedTypeName) {
        var _this = _super.call(this, target, FilterType.Unknown) || this;
        _this.message = message;
        _this.notSupportedTypeName = notSupportedTypeName;
        _this.schemaUrl = NotSupportedFilter.schemaUrl;
        return _this;
    }
    NotSupportedFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.message = this.message;
        filter.notSupportedTypeName = this.notSupportedTypeName;
        return filter;
    };
    NotSupportedFilter.schemaUrl = "http://powerbi.com/product/schema#notSupported";
    return NotSupportedFilter;
}(Filter));
exports.NotSupportedFilter = NotSupportedFilter;
var IncludeExcludeFilter = /** @class */ (function (_super) {
    __extends(IncludeExcludeFilter, _super);
    function IncludeExcludeFilter(target, isExclude, values) {
        var _this = _super.call(this, target, FilterType.IncludeExclude) || this;
        _this.values = values;
        _this.isExclude = isExclude;
        _this.schemaUrl = IncludeExcludeFilter.schemaUrl;
        return _this;
    }
    IncludeExcludeFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.isExclude = this.isExclude;
        filter.values = this.values;
        return filter;
    };
    IncludeExcludeFilter.schemaUrl = "http://powerbi.com/product/schema#includeExclude";
    return IncludeExcludeFilter;
}(Filter));
exports.IncludeExcludeFilter = IncludeExcludeFilter;
var TopNFilter = /** @class */ (function (_super) {
    __extends(TopNFilter, _super);
    function TopNFilter(target, operator, itemCount, orderBy) {
        var _this = _super.call(this, target, FilterType.TopN) || this;
        _this.operator = operator;
        _this.itemCount = itemCount;
        _this.schemaUrl = TopNFilter.schemaUrl;
        _this.orderBy = orderBy;
        return _this;
    }
    TopNFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.operator = this.operator;
        filter.itemCount = this.itemCount;
        filter.orderBy = this.orderBy;
        return filter;
    };
    TopNFilter.schemaUrl = "http://powerbi.com/product/schema#topN";
    return TopNFilter;
}(Filter));
exports.TopNFilter = TopNFilter;
var RelativeDateFilter = /** @class */ (function (_super) {
    __extends(RelativeDateFilter, _super);
    function RelativeDateFilter(target, operator, timeUnitsCount, timeUnitType, includeToday) {
        var _this = _super.call(this, target, FilterType.RelativeDate) || this;
        _this.operator = operator;
        _this.timeUnitsCount = timeUnitsCount;
        _this.timeUnitType = timeUnitType;
        _this.includeToday = includeToday;
        _this.schemaUrl = RelativeDateFilter.schemaUrl;
        return _this;
    }
    RelativeDateFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.operator = this.operator;
        filter.timeUnitsCount = this.timeUnitsCount;
        filter.timeUnitType = this.timeUnitType;
        filter.includeToday = this.includeToday;
        return filter;
    };
    RelativeDateFilter.schemaUrl = "http://powerbi.com/product/schema#relativeDate";
    return RelativeDateFilter;
}(Filter));
exports.RelativeDateFilter = RelativeDateFilter;
var RelativeTimeFilter = /** @class */ (function (_super) {
    __extends(RelativeTimeFilter, _super);
    function RelativeTimeFilter(target, operator, timeUnitsCount, timeUnitType) {
        var _this = _super.call(this, target, FilterType.RelativeTime) || this;
        _this.operator = operator;
        _this.timeUnitsCount = timeUnitsCount;
        _this.timeUnitType = timeUnitType;
        _this.schemaUrl = RelativeTimeFilter.schemaUrl;
        return _this;
    }
    RelativeTimeFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.operator = this.operator;
        filter.timeUnitsCount = this.timeUnitsCount;
        filter.timeUnitType = this.timeUnitType;
        return filter;
    };
    RelativeTimeFilter.schemaUrl = "http://powerbi.com/product/schema#relativeTime";
    return RelativeTimeFilter;
}(Filter));
exports.RelativeTimeFilter = RelativeTimeFilter;
var BasicFilter = /** @class */ (function (_super) {
    __extends(BasicFilter, _super);
    function BasicFilter(target, operator) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        var _this = _super.call(this, target, FilterType.Basic) || this;
        _this.operator = operator;
        _this.schemaUrl = BasicFilter.schemaUrl;
        if (values.length === 0 && operator !== "All") {
            throw new Error("values must be a non-empty array unless your operator is \"All\".");
        }
        /**
         * Accept values as array instead of as individual arguments
         * new BasicFilter('a', 'b', 1, 2);
         * new BasicFilter('a', 'b', [1,2]);
         */
        if (Array.isArray(values[0])) {
            _this.values = values[0];
        }
        else {
            _this.values = values;
        }
        return _this;
    }
    BasicFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.operator = this.operator;
        filter.values = this.values;
        filter.requireSingleSelection = !!this.requireSingleSelection;
        return filter;
    };
    BasicFilter.schemaUrl = "http://powerbi.com/product/schema#basic";
    return BasicFilter;
}(Filter));
exports.BasicFilter = BasicFilter;
var BasicFilterWithKeys = /** @class */ (function (_super) {
    __extends(BasicFilterWithKeys, _super);
    function BasicFilterWithKeys(target, operator, values, keyValues) {
        var _this = _super.call(this, target, operator, values) || this;
        _this.keyValues = keyValues;
        _this.target = target;
        var numberOfKeys = target.keys ? target.keys.length : 0;
        if (numberOfKeys > 0 && !keyValues) {
            throw new Error("You should pass the values to be filtered for each key. You passed: no values and " + numberOfKeys + " keys");
        }
        if (numberOfKeys === 0 && keyValues && keyValues.length > 0) {
            throw new Error("You passed key values but your target object doesn't contain the keys to be filtered");
        }
        for (var _i = 0, _a = _this.keyValues; _i < _a.length; _i++) {
            var keyValue = _a[_i];
            if (keyValue) {
                var lengthOfArray = keyValue.length;
                if (lengthOfArray !== numberOfKeys) {
                    throw new Error("Each tuple of key values should contain a value for each of the keys. You passed: " + lengthOfArray + " values and " + numberOfKeys + " keys");
                }
            }
        }
        return _this;
    }
    BasicFilterWithKeys.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.keyValues = this.keyValues;
        return filter;
    };
    return BasicFilterWithKeys;
}(BasicFilter));
exports.BasicFilterWithKeys = BasicFilterWithKeys;
var TupleFilter = /** @class */ (function (_super) {
    __extends(TupleFilter, _super);
    function TupleFilter(target, operator, values) {
        var _this = _super.call(this, target, FilterType.Tuple) || this;
        _this.operator = operator;
        _this.schemaUrl = TupleFilter.schemaUrl;
        _this.values = values;
        return _this;
    }
    TupleFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.operator = this.operator;
        filter.values = this.values;
        filter.target = this.target;
        return filter;
    };
    TupleFilter.schemaUrl = "http://powerbi.com/product/schema#tuple";
    return TupleFilter;
}(Filter));
exports.TupleFilter = TupleFilter;
var AdvancedFilter = /** @class */ (function (_super) {
    __extends(AdvancedFilter, _super);
    function AdvancedFilter(target, logicalOperator) {
        var conditions = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            conditions[_i - 2] = arguments[_i];
        }
        var _this = _super.call(this, target, FilterType.Advanced) || this;
        _this.schemaUrl = AdvancedFilter.schemaUrl;
        // Guard statements
        if (typeof logicalOperator !== "string" || logicalOperator.length === 0) {
            // TODO: It would be nicer to list out the possible logical operators.
            throw new Error("logicalOperator must be a valid operator, You passed: " + logicalOperator);
        }
        _this.logicalOperator = logicalOperator;
        var extractedConditions;
        /**
         * Accept conditions as array instead of as individual arguments
         * new AdvancedFilter('a', 'b', "And", { value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" });
         * new AdvancedFilter('a', 'b', "And", [{ value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" }]);
         */
        if (Array.isArray(conditions[0])) {
            extractedConditions = conditions[0];
        }
        else {
            extractedConditions = conditions;
        }
        if (extractedConditions.length === 0) {
            throw new Error("conditions must be a non-empty array. You passed: " + conditions);
        }
        if (extractedConditions.length > 2) {
            throw new Error("AdvancedFilters may not have more than two conditions. You passed: " + conditions.length);
        }
        if (extractedConditions.length === 1 && logicalOperator !== "And") {
            throw new Error("Logical Operator must be \"And\" when there is only one condition provided");
        }
        _this.conditions = extractedConditions;
        return _this;
    }
    AdvancedFilter.prototype.toJSON = function () {
        var filter = _super.prototype.toJSON.call(this);
        filter.logicalOperator = this.logicalOperator;
        filter.conditions = this.conditions;
        return filter;
    };
    AdvancedFilter.schemaUrl = "http://powerbi.com/product/schema#advanced";
    return AdvancedFilter;
}(Filter));
exports.AdvancedFilter = AdvancedFilter;
function isFilterKeyColumnsTarget(target) {
    return isColumn(target) && !!target.keys;
}
exports.isFilterKeyColumnsTarget = isFilterKeyColumnsTarget;
function isBasicFilterWithKeys(filter) {
    return getFilterType(filter) === FilterType.Basic && !!filter.keyValues;
}
exports.isBasicFilterWithKeys = isBasicFilterWithKeys;
function getFilterType(filter) {
    if (filter.filterType) {
        return filter.filterType;
    }
    var basicFilter = filter;
    var advancedFilter = filter;
    if ((typeof basicFilter.operator === "string")
        && (Array.isArray(basicFilter.values))) {
        return FilterType.Basic;
    }
    else if ((typeof advancedFilter.logicalOperator === "string")
        && (Array.isArray(advancedFilter.conditions))) {
        return FilterType.Advanced;
    }
    else {
        return FilterType.Unknown;
    }
}
exports.getFilterType = getFilterType;
function isMeasure(arg) {
    return arg.table !== undefined && arg.measure !== undefined;
}
exports.isMeasure = isMeasure;
function isColumn(arg) {
    return !!(arg.table && arg.column && !arg.aggregationFunction);
}
exports.isColumn = isColumn;
function isHierarchyLevel(arg) {
    return !!(arg.table && arg.hierarchy && arg.hierarchyLevel && !arg.aggregationFunction);
}
exports.isHierarchyLevel = isHierarchyLevel;
function isHierarchyLevelAggr(arg) {
    return !!(arg.table && arg.hierarchy && arg.hierarchyLevel && arg.aggregationFunction);
}
exports.isHierarchyLevelAggr = isHierarchyLevelAggr;
function isColumnAggr(arg) {
    return !!(arg.table && arg.column && arg.aggregationFunction);
}
exports.isColumnAggr = isColumnAggr;
var PageNavigationPosition;
(function (PageNavigationPosition) {
    PageNavigationPosition[PageNavigationPosition["Bottom"] = 0] = "Bottom";
    PageNavigationPosition[PageNavigationPosition["Left"] = 1] = "Left";
})(PageNavigationPosition = exports.PageNavigationPosition || (exports.PageNavigationPosition = {}));
var QnaMode;
(function (QnaMode) {
    QnaMode[QnaMode["Interactive"] = 0] = "Interactive";
    QnaMode[QnaMode["ResultOnly"] = 1] = "ResultOnly";
})(QnaMode = exports.QnaMode || (exports.QnaMode = {}));
var ExportDataType;
(function (ExportDataType) {
    ExportDataType[ExportDataType["Summarized"] = 0] = "Summarized";
    ExportDataType[ExportDataType["Underlying"] = 1] = "Underlying";
})(ExportDataType = exports.ExportDataType || (exports.ExportDataType = {}));
var BookmarksPlayMode;
(function (BookmarksPlayMode) {
    BookmarksPlayMode[BookmarksPlayMode["Off"] = 0] = "Off";
    BookmarksPlayMode[BookmarksPlayMode["Presentation"] = 1] = "Presentation";
})(BookmarksPlayMode = exports.BookmarksPlayMode || (exports.BookmarksPlayMode = {}));
// This is not an enum because enum strings require
// us to upgrade typeScript version and change SDK build definition
exports.CommonErrorCodes = {
    TokenExpired: 'TokenExpired',
    NotFound: 'PowerBIEntityNotFound',
    InvalidParameters: 'Invalid parameters',
    LoadReportFailed: 'LoadReportFailed',
    NotAuthorized: 'PowerBINotAuthorizedException',
    FailedToLoadModel: 'ExplorationContainer_FailedToLoadModel_DefaultDetails',
};
exports.TextAlignment = {
    Left: 'left',
    Center: 'center',
    Right: 'right',
};
exports.LegendPosition = {
    Top: 'Top',
    Bottom: 'Bottom',
    Right: 'Right',
    Left: 'Left',
    TopCenter: 'TopCenter',
    BottomCenter: 'BottomCenter',
    RightCenter: 'RightCenter',
    LeftCenter: 'LeftCenter',
};
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
    SortDirection[SortDirection["Descending"] = 2] = "Descending";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var Selector = /** @class */ (function () {
    function Selector(schema) {
        this.$schema = schema;
    }
    Selector.prototype.toJSON = function () {
        return {
            $schema: this.$schema
        };
    };
    return Selector;
}());
exports.Selector = Selector;
var PageSelector = /** @class */ (function (_super) {
    __extends(PageSelector, _super);
    function PageSelector(pageName) {
        var _this = _super.call(this, PageSelector.schemaUrl) || this;
        _this.pageName = pageName;
        return _this;
    }
    PageSelector.prototype.toJSON = function () {
        var selector = _super.prototype.toJSON.call(this);
        selector.pageName = this.pageName;
        return selector;
    };
    PageSelector.schemaUrl = "http://powerbi.com/product/schema#pageSelector";
    return PageSelector;
}(Selector));
exports.PageSelector = PageSelector;
var VisualSelector = /** @class */ (function (_super) {
    __extends(VisualSelector, _super);
    function VisualSelector(visualName) {
        var _this = _super.call(this, VisualSelector.schemaUrl) || this;
        _this.visualName = visualName;
        return _this;
    }
    VisualSelector.prototype.toJSON = function () {
        var selector = _super.prototype.toJSON.call(this);
        selector.visualName = this.visualName;
        return selector;
    };
    VisualSelector.schemaUrl = "http://powerbi.com/product/schema#visualSelector";
    return VisualSelector;
}(Selector));
exports.VisualSelector = VisualSelector;
var VisualTypeSelector = /** @class */ (function (_super) {
    __extends(VisualTypeSelector, _super);
    function VisualTypeSelector(visualType) {
        var _this = _super.call(this, VisualSelector.schemaUrl) || this;
        _this.visualType = visualType;
        return _this;
    }
    VisualTypeSelector.prototype.toJSON = function () {
        var selector = _super.prototype.toJSON.call(this);
        selector.visualType = this.visualType;
        return selector;
    };
    VisualTypeSelector.schemaUrl = "http://powerbi.com/product/schema#visualTypeSelector";
    return VisualTypeSelector;
}(Selector));
exports.VisualTypeSelector = VisualTypeSelector;
var SlicerTargetSelector = /** @class */ (function (_super) {
    __extends(SlicerTargetSelector, _super);
    function SlicerTargetSelector(target) {
        var _this = _super.call(this, VisualSelector.schemaUrl) || this;
        _this.target = target;
        return _this;
    }
    SlicerTargetSelector.prototype.toJSON = function () {
        var selector = _super.prototype.toJSON.call(this);
        selector.target = this.target;
        return selector;
    };
    SlicerTargetSelector.schemaUrl = "http://powerbi.com/product/schema#slicerTargetSelector";
    return SlicerTargetSelector;
}(Selector));
exports.SlicerTargetSelector = SlicerTargetSelector;
var CommandDisplayOption;
(function (CommandDisplayOption) {
    CommandDisplayOption[CommandDisplayOption["Enabled"] = 0] = "Enabled";
    CommandDisplayOption[CommandDisplayOption["Disabled"] = 1] = "Disabled";
    CommandDisplayOption[CommandDisplayOption["Hidden"] = 2] = "Hidden";
})(CommandDisplayOption = exports.CommandDisplayOption || (exports.CommandDisplayOption = {}));
/*
 * Visual CRUD
 */
var VisualDataRoleKind;
(function (VisualDataRoleKind) {
    // Indicates that the role should be bound to something that evaluates to a grouping of values.
    VisualDataRoleKind[VisualDataRoleKind["Grouping"] = 0] = "Grouping";
    // Indicates that the role should be bound to something that evaluates to a single value in a scope.
    VisualDataRoleKind[VisualDataRoleKind["Measure"] = 1] = "Measure";
    // Indicates that the role can be bound to either Grouping or Measure.
    VisualDataRoleKind[VisualDataRoleKind["GroupingOrMeasure"] = 2] = "GroupingOrMeasure";
})(VisualDataRoleKind = exports.VisualDataRoleKind || (exports.VisualDataRoleKind = {}));
// Indicates the visual preference on Grouping or Measure. Only applicable if kind is GroupingOrMeasure.
var VisualDataRoleKindPreference;
(function (VisualDataRoleKindPreference) {
    VisualDataRoleKindPreference[VisualDataRoleKindPreference["Measure"] = 0] = "Measure";
    VisualDataRoleKindPreference[VisualDataRoleKindPreference["Grouping"] = 1] = "Grouping";
})(VisualDataRoleKindPreference = exports.VisualDataRoleKindPreference || (exports.VisualDataRoleKindPreference = {}));
function isOnLoadFilters(filters) {
    return filters && !isReportFiltersArray(filters);
}
exports.isOnLoadFilters = isOnLoadFilters;
function isReportFiltersArray(filters) {
    return Array.isArray(filters);
}
exports.isReportFiltersArray = isReportFiltersArray;
function isFlatMenuExtension(menuExtension) {
    return menuExtension && !isGroupedMenuExtension(menuExtension);
}
exports.isFlatMenuExtension = isFlatMenuExtension;
function isGroupedMenuExtension(menuExtension) {
    return menuExtension && !!menuExtension.groupName;
}
exports.isGroupedMenuExtension = isGroupedMenuExtension;
function isIExtensions(extensions) {
    return extensions && !isIExtensionArray(extensions);
}
exports.isIExtensions = isIExtensions;
function isIExtensionArray(extensions) {
    return Array.isArray(extensions);
}
exports.isIExtensionArray = isIExtensionArray;
function normalizeError(error) {
    var message = error.message;
    if (!message) {
        message = error.path + " is invalid. Not meeting " + error.keyword + " constraint";
    }
    return {
        message: message
    };
}
function validateVisualSelector(input) {
    var errors = validator_1.Validators.visualSelectorValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateVisualSelector = validateVisualSelector;
function validateSlicer(input) {
    var errors = validator_1.Validators.slicerValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateSlicer = validateSlicer;
function validateSlicerState(input) {
    var errors = validator_1.Validators.slicerStateValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateSlicerState = validateSlicerState;
function validatePlayBookmarkRequest(input) {
    var errors = validator_1.Validators.playBookmarkRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validatePlayBookmarkRequest = validatePlayBookmarkRequest;
function validateAddBookmarkRequest(input) {
    var errors = validator_1.Validators.addBookmarkRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateAddBookmarkRequest = validateAddBookmarkRequest;
function validateApplyBookmarkByNameRequest(input) {
    var errors = validator_1.Validators.applyBookmarkByNameRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateApplyBookmarkByNameRequest = validateApplyBookmarkByNameRequest;
function validateApplyBookmarkStateRequest(input) {
    var errors = validator_1.Validators.applyBookmarkStateRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateApplyBookmarkStateRequest = validateApplyBookmarkStateRequest;
function validateCaptureBookmarkRequest(input) {
    var errors = validator_1.Validators.captureBookmarkRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateCaptureBookmarkRequest = validateCaptureBookmarkRequest;
function validateSettings(input) {
    var errors = validator_1.Validators.settingsValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateSettings = validateSettings;
function validatePanes(input) {
    var errors = validator_1.Validators.reportPanesValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validatePanes = validatePanes;
function validateBookmarksPane(input) {
    var errors = validator_1.Validators.bookmarksPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateBookmarksPane = validateBookmarksPane;
function validateFiltersPane(input) {
    var errors = validator_1.Validators.filtersPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateFiltersPane = validateFiltersPane;
function validateFieldsPane(input) {
    var errors = validator_1.Validators.fieldsPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateFieldsPane = validateFieldsPane;
function validatePageNavigationPane(input) {
    var errors = validator_1.Validators.pageNavigationPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validatePageNavigationPane = validatePageNavigationPane;
function validateSelectionPane(input) {
    var errors = validator_1.Validators.selectionPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateSelectionPane = validateSelectionPane;
function validateSyncSlicersPane(input) {
    var errors = validator_1.Validators.syncSlicersPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateSyncSlicersPane = validateSyncSlicersPane;
function validateVisualizationsPane(input) {
    var errors = validator_1.Validators.visualizationsPaneValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateVisualizationsPane = validateVisualizationsPane;
function validateCustomPageSize(input) {
    var errors = validator_1.Validators.customPageSizeValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateCustomPageSize = validateCustomPageSize;
function validateExtension(input) {
    var errors = validator_1.Validators.extensionValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateExtension = validateExtension;
function validateMenuGroupExtension(input) {
    var errors = validator_1.Validators.menuGroupExtensionValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateMenuGroupExtension = validateMenuGroupExtension;
function validateReportLoad(input) {
    var errors = validator_1.Validators.reportLoadValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateReportLoad = validateReportLoad;
function validatePaginatedReportLoad(input) {
    var errors = validator_1.Validators.paginatedReportLoadValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validatePaginatedReportLoad = validatePaginatedReportLoad;
function validateCreateReport(input) {
    var errors = validator_1.Validators.reportCreateValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateCreateReport = validateCreateReport;
function validateDashboardLoad(input) {
    var errors = validator_1.Validators.dashboardLoadValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateDashboardLoad = validateDashboardLoad;
function validateTileLoad(input) {
    var errors = validator_1.Validators.tileLoadValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateTileLoad = validateTileLoad;
function validatePage(input) {
    var errors = validator_1.Validators.pageValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validatePage = validatePage;
function validateFilter(input) {
    var errors = validator_1.Validators.filterValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateFilter = validateFilter;
function validateUpdateFiltersRequest(input) {
    var errors = validator_1.Validators.updateFiltersRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateUpdateFiltersRequest = validateUpdateFiltersRequest;
function validateSaveAsParameters(input) {
    var errors = validator_1.Validators.saveAsParametersValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateSaveAsParameters = validateSaveAsParameters;
function validateLoadQnaConfiguration(input) {
    var errors = validator_1.Validators.loadQnaValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateLoadQnaConfiguration = validateLoadQnaConfiguration;
function validateQnaInterpretInputData(input) {
    var errors = validator_1.Validators.qnaInterpretInputDataValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateQnaInterpretInputData = validateQnaInterpretInputData;
function validateExportDataRequest(input) {
    var errors = validator_1.Validators.exportDataRequestValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateExportDataRequest = validateExportDataRequest;
function validateVisualHeader(input) {
    var errors = validator_1.Validators.visualHeaderValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateVisualHeader = validateVisualHeader;
function validateVisualSettings(input) {
    var errors = validator_1.Validators.visualSettingsValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateVisualSettings = validateVisualSettings;
function validateCommandsSettings(input) {
    var errors = validator_1.Validators.commandsSettingsValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateCommandsSettings = validateCommandsSettings;
function validateCustomTheme(input) {
    var errors = validator_1.Validators.customThemeValidator.validate(input);
    return errors ? errors.map(normalizeError) : undefined;
}
exports.validateCustomTheme = validateCustomTheme;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
var barsValidator_1 = __webpack_require__(2);
var bookmarkValidator_1 = __webpack_require__(5);
var commandsSettingsValidator_1 = __webpack_require__(6);
var customThemeValidator_1 = __webpack_require__(7);
var dashboardLoadValidator_1 = __webpack_require__(8);
var datasetBindingValidator_1 = __webpack_require__(9);
var exportDataValidator_1 = __webpack_require__(10);
var extensionsValidator_1 = __webpack_require__(11);
var filtersValidator_1 = __webpack_require__(12);
var layoutValidator_1 = __webpack_require__(13);
var pageValidator_1 = __webpack_require__(14);
var panesValidator_1 = __webpack_require__(15);
var qnaValidator_1 = __webpack_require__(16);
var reportCreateValidator_1 = __webpack_require__(17);
var reportLoadValidator_1 = __webpack_require__(18);
var paginatedReportLoadValidator_1 = __webpack_require__(19);
var saveAsParametersValidator_1 = __webpack_require__(20);
var selectorsValidator_1 = __webpack_require__(21);
var settingsValidator_1 = __webpack_require__(22);
var slicersValidator_1 = __webpack_require__(23);
var tileLoadValidator_1 = __webpack_require__(24);
var visualSettingsValidator_1 = __webpack_require__(25);
var anyOfValidator_1 = __webpack_require__(26);
var fieldForbiddenValidator_1 = __webpack_require__(27);
var fieldRequiredValidator_1 = __webpack_require__(28);
var mapValidator_1 = __webpack_require__(29);
var typeValidator_1 = __webpack_require__(4);
var parameterPanelValidator_1 = __webpack_require__(30);
exports.Validators = {
    addBookmarkRequestValidator: new bookmarkValidator_1.AddBookmarkRequestValidator(),
    advancedFilterTypeValidator: new typeValidator_1.EnumValidator([0]),
    advancedFilterValidator: new filtersValidator_1.AdvancedFilterValidator(),
    anyArrayValidator: new typeValidator_1.ArrayValidator([new anyOfValidator_1.AnyOfValidator([new typeValidator_1.StringValidator(), new typeValidator_1.NumberValidator(), new typeValidator_1.BooleanValidator()])]),
    anyFilterValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.BasicFilterValidator(), new filtersValidator_1.AdvancedFilterValidator(), new filtersValidator_1.IncludeExcludeFilterValidator(), new filtersValidator_1.NotSupportedFilterValidator(), new filtersValidator_1.RelativeDateFilterValidator(), new filtersValidator_1.TopNFilterValidator(), new filtersValidator_1.RelativeTimeFilterValidator()]),
    anyValueValidator: new anyOfValidator_1.AnyOfValidator([new typeValidator_1.StringValidator(), new typeValidator_1.NumberValidator(), new typeValidator_1.BooleanValidator()]),
    actionBarValidator: new barsValidator_1.ActionBarValidator(),
    applyBookmarkByNameRequestValidator: new bookmarkValidator_1.ApplyBookmarkByNameRequestValidator(),
    applyBookmarkStateRequestValidator: new bookmarkValidator_1.ApplyBookmarkStateRequestValidator(),
    applyBookmarkValidator: new anyOfValidator_1.AnyOfValidator([new bookmarkValidator_1.ApplyBookmarkByNameRequestValidator(), new bookmarkValidator_1.ApplyBookmarkStateRequestValidator()]),
    backgroundValidator: new typeValidator_1.EnumValidator([0, 1]),
    basicFilterTypeValidator: new typeValidator_1.EnumValidator([1]),
    basicFilterValidator: new filtersValidator_1.BasicFilterValidator(),
    booleanArrayValidator: new typeValidator_1.BooleanArrayValidator(),
    booleanValidator: new typeValidator_1.BooleanValidator(),
    bookmarksPaneValidator: new panesValidator_1.BookmarksPaneValidator(),
    captureBookmarkOptionsValidator: new bookmarkValidator_1.CaptureBookmarkOptionsValidator(),
    captureBookmarkRequestValidator: new bookmarkValidator_1.CaptureBookmarkRequestValidator(),
    commandDisplayOptionValidator: new typeValidator_1.EnumValidator([0, 1, 2]),
    commandExtensionSelectorValidator: new anyOfValidator_1.AnyOfValidator([new selectorsValidator_1.VisualSelectorValidator(), new selectorsValidator_1.VisualTypeSelectorValidator()]),
    commandExtensionArrayValidator: new typeValidator_1.ArrayValidator([new extensionsValidator_1.CommandExtensionValidator()]),
    commandExtensionValidator: new extensionsValidator_1.CommandExtensionValidator(),
    commandsSettingsArrayValidator: new typeValidator_1.ArrayValidator([new commandsSettingsValidator_1.CommandsSettingsValidator()]),
    commandsSettingsValidator: new commandsSettingsValidator_1.CommandsSettingsValidator(),
    conditionItemValidator: new filtersValidator_1.ConditionItemValidator(),
    contrastModeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4]),
    customLayoutDisplayOptionValidator: new typeValidator_1.EnumValidator([0, 1, 2]),
    customLayoutValidator: new layoutValidator_1.CustomLayoutValidator(),
    customPageSizeValidator: new pageValidator_1.CustomPageSizeValidator(),
    customThemeValidator: new customThemeValidator_1.CustomThemeValidator(),
    dashboardLoadValidator: new dashboardLoadValidator_1.DashboardLoadValidator(),
    datasetBindingValidator: new datasetBindingValidator_1.DatasetBindingValidator(),
    displayStateModeValidator: new typeValidator_1.EnumValidator([0, 1]),
    displayStateValidator: new layoutValidator_1.DisplayStateValidator(),
    exportDataRequestValidator: new exportDataValidator_1.ExportDataRequestValidator(),
    extensionArrayValidator: new typeValidator_1.ArrayValidator([new extensionsValidator_1.ExtensionValidator()]),
    extensionsValidator: new anyOfValidator_1.AnyOfValidator([new typeValidator_1.ArrayValidator([new extensionsValidator_1.ExtensionValidator()]), new extensionsValidator_1.ExtensionsValidator()]),
    extensionPointsValidator: new extensionsValidator_1.ExtensionPointsValidator(),
    extensionValidator: new extensionsValidator_1.ExtensionValidator(),
    fieldForbiddenValidator: new fieldForbiddenValidator_1.FieldForbiddenValidator(),
    fieldRequiredValidator: new fieldRequiredValidator_1.FieldRequiredValidator(),
    fieldsPaneValidator: new panesValidator_1.FieldsPaneValidator(),
    filterColumnTargetValidator: new filtersValidator_1.FilterColumnTargetValidator(),
    filterDisplaySettingsValidator: new filtersValidator_1.FilterDisplaySettingsValidator(),
    filterConditionsValidator: new typeValidator_1.ArrayValidator([new filtersValidator_1.ConditionItemValidator()]),
    filterHierarchyTargetValidator: new filtersValidator_1.FilterHierarchyTargetValidator(),
    filterMeasureTargetValidator: new filtersValidator_1.FilterMeasureTargetValidator(),
    filterTargetValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.FilterColumnTargetValidator(), new filtersValidator_1.FilterHierarchyTargetValidator(), new filtersValidator_1.FilterMeasureTargetValidator()]),
    filterValidator: new filtersValidator_1.FilterValidator(),
    filterTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4, 5, 6, 7]),
    filtersArrayValidator: new typeValidator_1.ArrayValidator([new filtersValidator_1.FilterValidator()]),
    filtersOperationsUpdateValidator: new typeValidator_1.EnumValidator([1, 2, 3]),
    filtersOperationsRemoveAllValidator: new typeValidator_1.EnumValidator([0]),
    filtersPaneValidator: new panesValidator_1.FiltersPaneValidator(),
    hyperlinkClickBehaviorValidator: new typeValidator_1.EnumValidator([0, 1, 2]),
    includeExcludeFilterValidator: new filtersValidator_1.IncludeExcludeFilterValidator(),
    includeExludeFilterTypeValidator: new typeValidator_1.EnumValidator([3]),
    layoutTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3]),
    loadQnaValidator: new qnaValidator_1.LoadQnaValidator(),
    menuExtensionValidator: new anyOfValidator_1.AnyOfValidator([new extensionsValidator_1.FlatMenuExtensionValidator(), new extensionsValidator_1.GroupedMenuExtensionValidator()]),
    menuGroupExtensionArrayValidator: new typeValidator_1.ArrayValidator([new extensionsValidator_1.MenuGroupExtensionValidator()]),
    menuGroupExtensionValidator: new extensionsValidator_1.MenuGroupExtensionValidator(),
    menuLocationValidator: new typeValidator_1.EnumValidator([0, 1]),
    notSupportedFilterTypeValidator: new typeValidator_1.EnumValidator([2]),
    notSupportedFilterValidator: new filtersValidator_1.NotSupportedFilterValidator(),
    numberArrayValidator: new typeValidator_1.NumberArrayValidator(),
    numberValidator: new typeValidator_1.NumberValidator(),
    onLoadFiltersBaseValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.OnLoadFiltersBaseValidator(), new filtersValidator_1.OnLoadFiltersBaseRemoveOperationValidator()]),
    pageLayoutValidator: new mapValidator_1.MapValidator([new typeValidator_1.StringValidator()], [new layoutValidator_1.VisualLayoutValidator()]),
    pageNavigationPaneValidator: new panesValidator_1.PageNavigationPaneValidator(),
    pageNavigationPositionValidator: new typeValidator_1.EnumValidator([0, 1]),
    pageSizeTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4, 5]),
    pageSizeValidator: new pageValidator_1.PageSizeValidator(),
    pageValidator: new pageValidator_1.PageValidator(),
    pageViewFieldValidator: new pageValidator_1.PageViewFieldValidator(),
    pagesLayoutValidator: new mapValidator_1.MapValidator([new typeValidator_1.StringValidator()], [new layoutValidator_1.PageLayoutValidator()]),
    paginatedReportCommandsValidator: new commandsSettingsValidator_1.PaginatedReportCommandsValidator(),
    paginatedReportLoadValidator: new paginatedReportLoadValidator_1.PaginatedReportLoadValidator(),
    paginatedReportsettingsValidator: new settingsValidator_1.PaginatedReportSettingsValidator(),
    parametersPanelValidator: new parameterPanelValidator_1.ParametersPanelValidator(),
    permissionsValidator: new typeValidator_1.EnumValidator([0, 1, 2, 4, 7]),
    playBookmarkRequestValidator: new bookmarkValidator_1.PlayBookmarkRequestValidator(),
    qnaInterpretInputDataValidator: new qnaValidator_1.QnaInterpretInputDataValidator(),
    qnaPanesValidator: new panesValidator_1.QnaPanesValidator(),
    qnaSettingValidator: new qnaValidator_1.QnaSettingsValidator(),
    relativeDateFilterOperatorValidator: new typeValidator_1.EnumValidator([0, 1, 2]),
    relativeDateFilterTimeUnitTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4, 5, 6]),
    relativeDateFilterTypeValidator: new typeValidator_1.EnumValidator([4]),
    relativeDateFilterValidator: new filtersValidator_1.RelativeDateFilterValidator(),
    relativeDateTimeFilterTypeValidator: new typeValidator_1.EnumValidator([4, 7]),
    relativeDateTimeFilterUnitTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    relativeTimeFilterTimeUnitTypeValidator: new typeValidator_1.EnumValidator([7, 8]),
    relativeTimeFilterTypeValidator: new typeValidator_1.EnumValidator([7]),
    relativeTimeFilterValidator: new filtersValidator_1.RelativeTimeFilterValidator(),
    reportBarsValidator: new barsValidator_1.ReportBarsValidator(),
    reportCreateValidator: new reportCreateValidator_1.ReportCreateValidator(),
    reportLoadFiltersValidator: new anyOfValidator_1.AnyOfValidator([new typeValidator_1.ArrayValidator([new filtersValidator_1.FilterValidator()]), new filtersValidator_1.OnLoadFiltersValidator()]),
    reportLoadValidator: new reportLoadValidator_1.ReportLoadValidator(),
    reportPanesValidator: new panesValidator_1.ReportPanesValidator(),
    saveAsParametersValidator: new saveAsParametersValidator_1.SaveAsParametersValidator(),
    selectionPaneValidator: new panesValidator_1.SelectionPaneValidator(),
    settingsValidator: new settingsValidator_1.SettingsValidator(),
    singleCommandSettingsValidator: new commandsSettingsValidator_1.SingleCommandSettingsValidator(),
    slicerSelectorValidator: new anyOfValidator_1.AnyOfValidator([new selectorsValidator_1.VisualSelectorValidator(), new selectorsValidator_1.SlicerTargetSelectorValidator()]),
    slicerStateValidator: new slicersValidator_1.SlicerStateValidator(),
    slicerTargetValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.FilterColumnTargetValidator(), new filtersValidator_1.FilterHierarchyTargetValidator(), new filtersValidator_1.FilterMeasureTargetValidator(), new filtersValidator_1.FilterKeyColumnsTargetValidator(), new filtersValidator_1.FilterKeyHierarchyTargetValidator()]),
    slicerValidator: new slicersValidator_1.SlicerValidator(),
    stringArrayValidator: new typeValidator_1.StringArrayValidator(),
    stringValidator: new typeValidator_1.StringValidator(),
    syncSlicersPaneValidator: new panesValidator_1.SyncSlicersPaneValidator(),
    tileLoadValidator: new tileLoadValidator_1.TileLoadValidator(),
    tokenTypeValidator: new typeValidator_1.EnumValidator([0, 1]),
    topNFilterTypeValidator: new typeValidator_1.EnumValidator([5]),
    topNFilterValidator: new filtersValidator_1.TopNFilterValidator(),
    updateFiltersRequestValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.UpdateFiltersRequestValidator(), new filtersValidator_1.RemoveFiltersRequestValidator()]),
    viewModeValidator: new typeValidator_1.EnumValidator([0, 1]),
    visualCommandSelectorValidator: new anyOfValidator_1.AnyOfValidator([new selectorsValidator_1.VisualSelectorValidator(), new selectorsValidator_1.VisualTypeSelectorValidator()]),
    visualHeaderSelectorValidator: new anyOfValidator_1.AnyOfValidator([new selectorsValidator_1.VisualSelectorValidator(), new selectorsValidator_1.VisualTypeSelectorValidator()]),
    visualHeaderSettingsValidator: new visualSettingsValidator_1.VisualHeaderSettingsValidator(),
    visualHeaderValidator: new visualSettingsValidator_1.VisualHeaderValidator(),
    visualHeadersValidator: new typeValidator_1.ArrayValidator([new visualSettingsValidator_1.VisualHeaderValidator()]),
    visualizationsPaneValidator: new panesValidator_1.VisualizationsPaneValidator(),
    visualLayoutValidator: new layoutValidator_1.VisualLayoutValidator(),
    visualSelectorValidator: new selectorsValidator_1.VisualSelectorValidator(),
    visualSettingsValidator: new visualSettingsValidator_1.VisualSettingsValidator(),
    visualTypeSelectorValidator: new selectorsValidator_1.VisualTypeSelectorValidator(),
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ActionBarValidator = exports.ReportBarsValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var ReportBarsValidator = /** @class */ (function (_super) {
    __extends(ReportBarsValidator, _super);
    function ReportBarsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportBarsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "actionBar",
                validators: [validator_1.Validators.actionBarValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ReportBarsValidator;
}(typeValidator_1.ObjectValidator));
exports.ReportBarsValidator = ReportBarsValidator;
var ActionBarValidator = /** @class */ (function (_super) {
    __extends(ActionBarValidator, _super);
    function ActionBarValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionBarValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ActionBarValidator;
}(typeValidator_1.ObjectValidator));
exports.ActionBarValidator = ActionBarValidator;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleFieldsValidator = void 0;
var MultipleFieldsValidator = /** @class */ (function () {
    function MultipleFieldsValidator(fieldValidatorsPairs) {
        this.fieldValidatorsPairs = fieldValidatorsPairs;
    }
    MultipleFieldsValidator.prototype.validate = function (input, path, field) {
        if (!this.fieldValidatorsPairs) {
            return null;
        }
        var fieldsPath = path ? path + "." + field : field;
        for (var _i = 0, _a = this.fieldValidatorsPairs; _i < _a.length; _i++) {
            var fieldValidators = _a[_i];
            for (var _b = 0, _c = fieldValidators.validators; _b < _c.length; _b++) {
                var validator = _c[_b];
                var errors = validator.validate(input[fieldValidators.field], fieldsPath, fieldValidators.field);
                if (errors) {
                    return errors;
                }
            }
        }
        return null;
    };
    return MultipleFieldsValidator;
}());
exports.MultipleFieldsValidator = MultipleFieldsValidator;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.NumberArrayValidator = exports.BooleanArrayValidator = exports.StringArrayValidator = exports.EnumValidator = exports.SchemaValidator = exports.ValueValidator = exports.NumberValidator = exports.BooleanValidator = exports.StringValidator = exports.TypeValidator = exports.ArrayValidator = exports.ObjectValidator = void 0;
var ObjectValidator = /** @class */ (function () {
    function ObjectValidator() {
    }
    ObjectValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        if (typeof input !== "object" || Array.isArray(input)) {
            return [{
                    message: field !== undefined ? field + " must be an object" : "input must be an object",
                    path: path,
                    keyword: "type"
                }];
        }
        return null;
    };
    return ObjectValidator;
}());
exports.ObjectValidator = ObjectValidator;
var ArrayValidator = /** @class */ (function () {
    function ArrayValidator(itemValidators) {
        this.itemValidators = itemValidators;
    }
    ArrayValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        if (!(Array.isArray(input))) {
            return [{
                    message: field + " property is invalid",
                    path: (path ? path + "." : "") + field,
                    keyword: "type"
                }];
        }
        for (var i = 0; i < input.length; i++) {
            var fieldsPath = (path ? path + "." : "") + field + "." + i;
            for (var _i = 0, _a = this.itemValidators; _i < _a.length; _i++) {
                var validator = _a[_i];
                var errors = validator.validate(input[i], fieldsPath, field);
                if (errors) {
                    return [{
                            message: field + " property is invalid",
                            path: (path ? path + "." : "") + field,
                            keyword: "type"
                        }];
                }
            }
        }
        return null;
    };
    return ArrayValidator;
}());
exports.ArrayValidator = ArrayValidator;
var TypeValidator = /** @class */ (function () {
    function TypeValidator(expectedType) {
        this.expectedType = expectedType;
    }
    TypeValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        if (!(typeof input === this.expectedType)) {
            return [{
                    message: field + " must be a " + this.expectedType,
                    path: (path ? path + "." : "") + field,
                    keyword: "type"
                }];
        }
        return null;
    };
    return TypeValidator;
}());
exports.TypeValidator = TypeValidator;
var StringValidator = /** @class */ (function (_super) {
    __extends(StringValidator, _super);
    function StringValidator() {
        return _super.call(this, "string") || this;
    }
    return StringValidator;
}(TypeValidator));
exports.StringValidator = StringValidator;
var BooleanValidator = /** @class */ (function (_super) {
    __extends(BooleanValidator, _super);
    function BooleanValidator() {
        return _super.call(this, "boolean") || this;
    }
    return BooleanValidator;
}(TypeValidator));
exports.BooleanValidator = BooleanValidator;
var NumberValidator = /** @class */ (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator() {
        return _super.call(this, "number") || this;
    }
    return NumberValidator;
}(TypeValidator));
exports.NumberValidator = NumberValidator;
var ValueValidator = /** @class */ (function () {
    function ValueValidator(possibleValues) {
        this.possibleValues = possibleValues;
    }
    ValueValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        if (this.possibleValues.indexOf(input) < 0) {
            return [{
                    message: field + " property is invalid",
                    path: (path ? path + "." : "") + field,
                    keyword: "invalid"
                }];
        }
        return null;
    };
    return ValueValidator;
}());
exports.ValueValidator = ValueValidator;
var SchemaValidator = /** @class */ (function (_super) {
    __extends(SchemaValidator, _super);
    function SchemaValidator(schemaValue) {
        var _this = _super.call(this, [schemaValue]) || this;
        _this.schemaValue = schemaValue;
        return _this;
    }
    SchemaValidator.prototype.validate = function (input, path, field) {
        return _super.prototype.validate.call(this, input, path, field);
    };
    return SchemaValidator;
}(ValueValidator));
exports.SchemaValidator = SchemaValidator;
var EnumValidator = /** @class */ (function (_super) {
    __extends(EnumValidator, _super);
    function EnumValidator(possibleValues) {
        var _this = _super.call(this) || this;
        _this.possibleValues = possibleValues;
        return _this;
    }
    EnumValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var valueValidator = new ValueValidator(this.possibleValues);
        return valueValidator.validate(input, path, field);
    };
    return EnumValidator;
}(NumberValidator));
exports.EnumValidator = EnumValidator;
var StringArrayValidator = /** @class */ (function (_super) {
    __extends(StringArrayValidator, _super);
    function StringArrayValidator() {
        return _super.call(this, [new StringValidator()]) || this;
    }
    StringArrayValidator.prototype.validate = function (input, path, field) {
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return [{
                    message: field + " must be an array of strings",
                    path: (path ? path + "." : "") + field,
                    keyword: "type"
                }];
        }
        return null;
    };
    return StringArrayValidator;
}(ArrayValidator));
exports.StringArrayValidator = StringArrayValidator;
var BooleanArrayValidator = /** @class */ (function (_super) {
    __extends(BooleanArrayValidator, _super);
    function BooleanArrayValidator() {
        return _super.call(this, [new BooleanValidator()]) || this;
    }
    BooleanArrayValidator.prototype.validate = function (input, path, field) {
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return [{
                    message: field + " must be an array of booleans",
                    path: (path ? path + "." : "") + field,
                    keyword: "type"
                }];
        }
        return null;
    };
    return BooleanArrayValidator;
}(ArrayValidator));
exports.BooleanArrayValidator = BooleanArrayValidator;
var NumberArrayValidator = /** @class */ (function (_super) {
    __extends(NumberArrayValidator, _super);
    function NumberArrayValidator() {
        return _super.call(this, [new NumberValidator()]) || this;
    }
    NumberArrayValidator.prototype.validate = function (input, path, field) {
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return [{
                    message: field + " must be an array of numbers",
                    path: (path ? path + "." : "") + field,
                    keyword: "type"
                }];
        }
        return null;
    };
    return NumberArrayValidator;
}(ArrayValidator));
exports.NumberArrayValidator = NumberArrayValidator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.CaptureBookmarkRequestValidator = exports.CaptureBookmarkOptionsValidator = exports.ApplyBookmarkStateRequestValidator = exports.ApplyBookmarkByNameRequestValidator = exports.AddBookmarkRequestValidator = exports.PlayBookmarkRequestValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var PlayBookmarkRequestValidator = /** @class */ (function (_super) {
    __extends(PlayBookmarkRequestValidator, _super);
    function PlayBookmarkRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayBookmarkRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "playMode",
                validators: [validator_1.Validators.fieldRequiredValidator, new typeValidator_1.EnumValidator([0, 1])]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PlayBookmarkRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.PlayBookmarkRequestValidator = PlayBookmarkRequestValidator;
var AddBookmarkRequestValidator = /** @class */ (function (_super) {
    __extends(AddBookmarkRequestValidator, _super);
    function AddBookmarkRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddBookmarkRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "state",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "displayName",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "apply",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return AddBookmarkRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.AddBookmarkRequestValidator = AddBookmarkRequestValidator;
var ApplyBookmarkByNameRequestValidator = /** @class */ (function (_super) {
    __extends(ApplyBookmarkByNameRequestValidator, _super);
    function ApplyBookmarkByNameRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplyBookmarkByNameRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "name",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ApplyBookmarkByNameRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.ApplyBookmarkByNameRequestValidator = ApplyBookmarkByNameRequestValidator;
var ApplyBookmarkStateRequestValidator = /** @class */ (function (_super) {
    __extends(ApplyBookmarkStateRequestValidator, _super);
    function ApplyBookmarkStateRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplyBookmarkStateRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "state",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ApplyBookmarkStateRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.ApplyBookmarkStateRequestValidator = ApplyBookmarkStateRequestValidator;
var CaptureBookmarkOptionsValidator = /** @class */ (function (_super) {
    __extends(CaptureBookmarkOptionsValidator, _super);
    function CaptureBookmarkOptionsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptureBookmarkOptionsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "personalizeVisuals",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "allPages",
                validators: [validator_1.Validators.booleanValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CaptureBookmarkOptionsValidator;
}(typeValidator_1.ObjectValidator));
exports.CaptureBookmarkOptionsValidator = CaptureBookmarkOptionsValidator;
var CaptureBookmarkRequestValidator = /** @class */ (function (_super) {
    __extends(CaptureBookmarkRequestValidator, _super);
    function CaptureBookmarkRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptureBookmarkRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "options",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.captureBookmarkOptionsValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CaptureBookmarkRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.CaptureBookmarkRequestValidator = CaptureBookmarkRequestValidator;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.PaginatedReportCommandsValidator = exports.SingleCommandSettingsValidator = exports.CommandsSettingsValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var CommandsSettingsValidator = /** @class */ (function (_super) {
    __extends(CommandsSettingsValidator, _super);
    function CommandsSettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandsSettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "copy",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "drill",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "drillthrough",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "expandCollapse",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "exportData",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "includeExclude",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "removeVisual",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "search",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "seeData",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "sort",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
            {
                field: "spotlight",
                validators: [validator_1.Validators.singleCommandSettingsValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CommandsSettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.CommandsSettingsValidator = CommandsSettingsValidator;
var SingleCommandSettingsValidator = /** @class */ (function (_super) {
    __extends(SingleCommandSettingsValidator, _super);
    function SingleCommandSettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleCommandSettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "displayOption",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.commandDisplayOptionValidator]
            },
            {
                field: "selector",
                validators: [validator_1.Validators.visualCommandSelectorValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SingleCommandSettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.SingleCommandSettingsValidator = SingleCommandSettingsValidator;
var PaginatedReportCommandsValidator = /** @class */ (function (_super) {
    __extends(PaginatedReportCommandsValidator, _super);
    function PaginatedReportCommandsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginatedReportCommandsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "parameterPanel",
                validators: [validator_1.Validators.parametersPanelValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PaginatedReportCommandsValidator;
}(typeValidator_1.ObjectValidator));
exports.PaginatedReportCommandsValidator = PaginatedReportCommandsValidator;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.CustomThemeValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var CustomThemeValidator = /** @class */ (function (_super) {
    __extends(CustomThemeValidator, _super);
    function CustomThemeValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomThemeValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "themeJson",
                validators: [new typeValidator_1.ObjectValidator()]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CustomThemeValidator;
}(typeValidator_1.ObjectValidator));
exports.CustomThemeValidator = CustomThemeValidator;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.DashboardLoadValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var DashboardLoadValidator = /** @class */ (function (_super) {
    __extends(DashboardLoadValidator, _super);
    function DashboardLoadValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardLoadValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "accessToken",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "id",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "pageView",
                validators: [validator_1.Validators.pageViewFieldValidator]
            },
            {
                field: "tokenType",
                validators: [validator_1.Validators.tokenTypeValidator]
            },
            {
                field: "embedUrl",
                validators: [validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return DashboardLoadValidator;
}(typeValidator_1.ObjectValidator));
exports.DashboardLoadValidator = DashboardLoadValidator;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.DatasetBindingValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var DatasetBindingValidator = /** @class */ (function (_super) {
    __extends(DatasetBindingValidator, _super);
    function DatasetBindingValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatasetBindingValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "datasetId",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return DatasetBindingValidator;
}(typeValidator_1.ObjectValidator));
exports.DatasetBindingValidator = DatasetBindingValidator;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ExportDataRequestValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var ExportDataRequestValidator = /** @class */ (function (_super) {
    __extends(ExportDataRequestValidator, _super);
    function ExportDataRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportDataRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "rows",
                validators: [new typeValidator_1.NumberValidator()]
            },
            {
                field: "exportDataType",
                validators: [new typeValidator_1.EnumValidator([0, 1])]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ExportDataRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.ExportDataRequestValidator = ExportDataRequestValidator;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ExtensionsValidator = exports.MenuGroupExtensionValidator = exports.ExtensionValidator = exports.CommandExtensionValidator = exports.ExtensionItemValidator = exports.ExtensionPointsValidator = exports.GroupedMenuExtensionValidator = exports.FlatMenuExtensionValidator = exports.MenuExtensionBaseValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var MenuExtensionBaseValidator = /** @class */ (function (_super) {
    __extends(MenuExtensionBaseValidator, _super);
    function MenuExtensionBaseValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuExtensionBaseValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "title",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "icon",
                validators: [validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return MenuExtensionBaseValidator;
}(typeValidator_1.ObjectValidator));
exports.MenuExtensionBaseValidator = MenuExtensionBaseValidator;
var FlatMenuExtensionValidator = /** @class */ (function (_super) {
    __extends(FlatMenuExtensionValidator, _super);
    function FlatMenuExtensionValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlatMenuExtensionValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "menuLocation",
                validators: [validator_1.Validators.menuLocationValidator]
            },
            {
                field: "groupName",
                validators: [validator_1.Validators.fieldForbiddenValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FlatMenuExtensionValidator;
}(MenuExtensionBaseValidator));
exports.FlatMenuExtensionValidator = FlatMenuExtensionValidator;
var GroupedMenuExtensionValidator = /** @class */ (function (_super) {
    __extends(GroupedMenuExtensionValidator, _super);
    function GroupedMenuExtensionValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupedMenuExtensionValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "groupName",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "menuLocation",
                validators: [validator_1.Validators.fieldForbiddenValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return GroupedMenuExtensionValidator;
}(MenuExtensionBaseValidator));
exports.GroupedMenuExtensionValidator = GroupedMenuExtensionValidator;
var ExtensionPointsValidator = /** @class */ (function (_super) {
    __extends(ExtensionPointsValidator, _super);
    function ExtensionPointsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionPointsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visualContextMenu",
                validators: [validator_1.Validators.menuExtensionValidator]
            },
            {
                field: "visualOptionsMenu",
                validators: [validator_1.Validators.menuExtensionValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ExtensionPointsValidator;
}(typeValidator_1.ObjectValidator));
exports.ExtensionPointsValidator = ExtensionPointsValidator;
var ExtensionItemValidator = /** @class */ (function (_super) {
    __extends(ExtensionItemValidator, _super);
    function ExtensionItemValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionItemValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "name",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "extend",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.extensionPointsValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ExtensionItemValidator;
}(typeValidator_1.ObjectValidator));
exports.ExtensionItemValidator = ExtensionItemValidator;
var CommandExtensionValidator = /** @class */ (function (_super) {
    __extends(CommandExtensionValidator, _super);
    function CommandExtensionValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandExtensionValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "title",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "icon",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "selector",
                validators: [validator_1.Validators.commandExtensionSelectorValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CommandExtensionValidator;
}(ExtensionItemValidator));
exports.CommandExtensionValidator = CommandExtensionValidator;
var ExtensionValidator = /** @class */ (function (_super) {
    __extends(ExtensionValidator, _super);
    function ExtensionValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "command",
                validators: [validator_1.Validators.commandExtensionValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ExtensionValidator;
}(typeValidator_1.ObjectValidator));
exports.ExtensionValidator = ExtensionValidator;
var MenuGroupExtensionValidator = /** @class */ (function (_super) {
    __extends(MenuGroupExtensionValidator, _super);
    function MenuGroupExtensionValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuGroupExtensionValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "name",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "title",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "menuLocation",
                validators: [validator_1.Validators.menuLocationValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return MenuGroupExtensionValidator;
}(typeValidator_1.ObjectValidator));
exports.MenuGroupExtensionValidator = MenuGroupExtensionValidator;
var ExtensionsValidator = /** @class */ (function (_super) {
    __extends(ExtensionsValidator, _super);
    function ExtensionsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "commands",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.commandExtensionArrayValidator]
            },
            {
                field: "groups",
                validators: [validator_1.Validators.menuGroupExtensionArrayValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ExtensionsValidator;
}(typeValidator_1.ObjectValidator));
exports.ExtensionsValidator = ExtensionsValidator;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.OnLoadFiltersValidator = exports.OnLoadFiltersBaseRemoveOperationValidator = exports.OnLoadFiltersBaseValidator = exports.ConditionItemValidator = exports.RemoveFiltersRequestValidator = exports.UpdateFiltersRequestValidator = exports.FilterValidator = exports.IncludeExcludeFilterValidator = exports.NotSupportedFilterValidator = exports.TopNFilterValidator = exports.RelativeTimeFilterValidator = exports.RelativeDateFilterValidator = exports.RelativeDateTimeFilterValidator = exports.AdvancedFilterValidator = exports.BasicFilterValidator = exports.FilterValidatorBase = exports.FilterDisplaySettingsValidator = exports.FilterMeasureTargetValidator = exports.FilterKeyHierarchyTargetValidator = exports.FilterHierarchyTargetValidator = exports.FilterKeyColumnsTargetValidator = exports.FilterColumnTargetValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var FilterColumnTargetValidator = /** @class */ (function (_super) {
    __extends(FilterColumnTargetValidator, _super);
    function FilterColumnTargetValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterColumnTargetValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "table",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "column",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterColumnTargetValidator;
}(typeValidator_1.ObjectValidator));
exports.FilterColumnTargetValidator = FilterColumnTargetValidator;
var FilterKeyColumnsTargetValidator = /** @class */ (function (_super) {
    __extends(FilterKeyColumnsTargetValidator, _super);
    function FilterKeyColumnsTargetValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterKeyColumnsTargetValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "keys",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringArrayValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterKeyColumnsTargetValidator;
}(FilterColumnTargetValidator));
exports.FilterKeyColumnsTargetValidator = FilterKeyColumnsTargetValidator;
var FilterHierarchyTargetValidator = /** @class */ (function (_super) {
    __extends(FilterHierarchyTargetValidator, _super);
    function FilterHierarchyTargetValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterHierarchyTargetValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "table",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "hierarchy",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "hierarchyLevel",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterHierarchyTargetValidator;
}(typeValidator_1.ObjectValidator));
exports.FilterHierarchyTargetValidator = FilterHierarchyTargetValidator;
var FilterKeyHierarchyTargetValidator = /** @class */ (function (_super) {
    __extends(FilterKeyHierarchyTargetValidator, _super);
    function FilterKeyHierarchyTargetValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterKeyHierarchyTargetValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "keys",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringArrayValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterKeyHierarchyTargetValidator;
}(FilterHierarchyTargetValidator));
exports.FilterKeyHierarchyTargetValidator = FilterKeyHierarchyTargetValidator;
var FilterMeasureTargetValidator = /** @class */ (function (_super) {
    __extends(FilterMeasureTargetValidator, _super);
    function FilterMeasureTargetValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterMeasureTargetValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "table",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "measure",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterMeasureTargetValidator;
}(typeValidator_1.ObjectValidator));
exports.FilterMeasureTargetValidator = FilterMeasureTargetValidator;
var FilterDisplaySettingsValidator = /** @class */ (function (_super) {
    __extends(FilterDisplaySettingsValidator, _super);
    function FilterDisplaySettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterDisplaySettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "isLockedInViewMode",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "isHiddenInViewMode",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "displayName",
                validators: [validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterDisplaySettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.FilterDisplaySettingsValidator = FilterDisplaySettingsValidator;
var FilterValidatorBase = /** @class */ (function (_super) {
    __extends(FilterValidatorBase, _super);
    function FilterValidatorBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterValidatorBase.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "target",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
            },
            {
                field: "$schema",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.filterTypeValidator]
            },
            {
                field: "displaySettings",
                validators: [validator_1.Validators.filterDisplaySettingsValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FilterValidatorBase;
}(typeValidator_1.ObjectValidator));
exports.FilterValidatorBase = FilterValidatorBase;
var BasicFilterValidator = /** @class */ (function (_super) {
    __extends(BasicFilterValidator, _super);
    function BasicFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "operator",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "values",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.anyArrayValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.basicFilterTypeValidator]
            },
            {
                field: "requireSingleSelection",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return BasicFilterValidator;
}(FilterValidatorBase));
exports.BasicFilterValidator = BasicFilterValidator;
var AdvancedFilterValidator = /** @class */ (function (_super) {
    __extends(AdvancedFilterValidator, _super);
    function AdvancedFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "logicalOperator",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "conditions",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterConditionsValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.advancedFilterTypeValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return AdvancedFilterValidator;
}(FilterValidatorBase));
exports.AdvancedFilterValidator = AdvancedFilterValidator;
var RelativeDateTimeFilterValidator = /** @class */ (function (_super) {
    __extends(RelativeDateTimeFilterValidator, _super);
    function RelativeDateTimeFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelativeDateTimeFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "operator",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.relativeDateFilterOperatorValidator]
            },
            {
                field: "timeUnitsCount",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "timeUnitType",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.relativeDateTimeFilterUnitTypeValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.relativeDateTimeFilterTypeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return RelativeDateTimeFilterValidator;
}(FilterValidatorBase));
exports.RelativeDateTimeFilterValidator = RelativeDateTimeFilterValidator;
var RelativeDateFilterValidator = /** @class */ (function (_super) {
    __extends(RelativeDateFilterValidator, _super);
    function RelativeDateFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelativeDateFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "includeToday",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.booleanValidator]
            },
            {
                field: "timeUnitType",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.relativeDateFilterTimeUnitTypeValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.relativeDateFilterTypeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return RelativeDateFilterValidator;
}(RelativeDateTimeFilterValidator));
exports.RelativeDateFilterValidator = RelativeDateFilterValidator;
var RelativeTimeFilterValidator = /** @class */ (function (_super) {
    __extends(RelativeTimeFilterValidator, _super);
    function RelativeTimeFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelativeTimeFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "timeUnitType",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.relativeTimeFilterTimeUnitTypeValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.relativeTimeFilterTypeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return RelativeTimeFilterValidator;
}(RelativeDateTimeFilterValidator));
exports.RelativeTimeFilterValidator = RelativeTimeFilterValidator;
var TopNFilterValidator = /** @class */ (function (_super) {
    __extends(TopNFilterValidator, _super);
    function TopNFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopNFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "operator",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "itemCount",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.numberValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.topNFilterTypeValidator]
            },
            {
                field: "orderBy",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return TopNFilterValidator;
}(FilterValidatorBase));
exports.TopNFilterValidator = TopNFilterValidator;
var NotSupportedFilterValidator = /** @class */ (function (_super) {
    __extends(NotSupportedFilterValidator, _super);
    function NotSupportedFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotSupportedFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "message",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "notSupportedTypeName",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.notSupportedFilterTypeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return NotSupportedFilterValidator;
}(FilterValidatorBase));
exports.NotSupportedFilterValidator = NotSupportedFilterValidator;
var IncludeExcludeFilterValidator = /** @class */ (function (_super) {
    __extends(IncludeExcludeFilterValidator, _super);
    function IncludeExcludeFilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IncludeExcludeFilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "isExclude",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.booleanValidator]
            },
            {
                field: "values",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.anyArrayValidator]
            },
            {
                field: "filterType",
                validators: [validator_1.Validators.includeExludeFilterTypeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return IncludeExcludeFilterValidator;
}(FilterValidatorBase));
exports.IncludeExcludeFilterValidator = IncludeExcludeFilterValidator;
var FilterValidator = /** @class */ (function (_super) {
    __extends(FilterValidator, _super);
    function FilterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        return validator_1.Validators.anyFilterValidator.validate(input, path, field);
    };
    return FilterValidator;
}(typeValidator_1.ObjectValidator));
exports.FilterValidator = FilterValidator;
var UpdateFiltersRequestValidator = /** @class */ (function (_super) {
    __extends(UpdateFiltersRequestValidator, _super);
    function UpdateFiltersRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateFiltersRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "filtersOperation",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filtersOperationsUpdateValidator]
            },
            {
                field: "filters",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filtersArrayValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return UpdateFiltersRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.UpdateFiltersRequestValidator = UpdateFiltersRequestValidator;
var RemoveFiltersRequestValidator = /** @class */ (function (_super) {
    __extends(RemoveFiltersRequestValidator, _super);
    function RemoveFiltersRequestValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveFiltersRequestValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "filtersOperation",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filtersOperationsRemoveAllValidator]
            },
            {
                field: "filters",
                validators: [validator_1.Validators.fieldForbiddenValidator, validator_1.Validators.filtersArrayValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return RemoveFiltersRequestValidator;
}(typeValidator_1.ObjectValidator));
exports.RemoveFiltersRequestValidator = RemoveFiltersRequestValidator;
var ConditionItemValidator = /** @class */ (function (_super) {
    __extends(ConditionItemValidator, _super);
    function ConditionItemValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionItemValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "value",
                validators: [validator_1.Validators.anyValueValidator]
            },
            {
                field: "operator",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ConditionItemValidator;
}(typeValidator_1.ObjectValidator));
exports.ConditionItemValidator = ConditionItemValidator;
var OnLoadFiltersBaseValidator = /** @class */ (function (_super) {
    __extends(OnLoadFiltersBaseValidator, _super);
    function OnLoadFiltersBaseValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OnLoadFiltersBaseValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "operation",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filtersOperationsUpdateValidator]
            },
            {
                field: "filters",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filtersArrayValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return OnLoadFiltersBaseValidator;
}(typeValidator_1.ObjectValidator));
exports.OnLoadFiltersBaseValidator = OnLoadFiltersBaseValidator;
var OnLoadFiltersBaseRemoveOperationValidator = /** @class */ (function (_super) {
    __extends(OnLoadFiltersBaseRemoveOperationValidator, _super);
    function OnLoadFiltersBaseRemoveOperationValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OnLoadFiltersBaseRemoveOperationValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "operation",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filtersOperationsRemoveAllValidator]
            },
            {
                field: "filters",
                validators: [validator_1.Validators.fieldForbiddenValidator, validator_1.Validators.filtersArrayValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return OnLoadFiltersBaseRemoveOperationValidator;
}(typeValidator_1.ObjectValidator));
exports.OnLoadFiltersBaseRemoveOperationValidator = OnLoadFiltersBaseRemoveOperationValidator;
var OnLoadFiltersValidator = /** @class */ (function (_super) {
    __extends(OnLoadFiltersValidator, _super);
    function OnLoadFiltersValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OnLoadFiltersValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "allPages",
                validators: [validator_1.Validators.onLoadFiltersBaseValidator]
            },
            {
                field: "currentPage",
                validators: [validator_1.Validators.onLoadFiltersBaseValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return OnLoadFiltersValidator;
}(typeValidator_1.ObjectValidator));
exports.OnLoadFiltersValidator = OnLoadFiltersValidator;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.PageLayoutValidator = exports.DisplayStateValidator = exports.VisualLayoutValidator = exports.CustomLayoutValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var CustomLayoutValidator = /** @class */ (function (_super) {
    __extends(CustomLayoutValidator, _super);
    function CustomLayoutValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomLayoutValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "pageSize",
                validators: [validator_1.Validators.pageSizeValidator]
            },
            {
                field: "displayOption",
                validators: [validator_1.Validators.customLayoutDisplayOptionValidator]
            },
            {
                field: "pagesLayout",
                validators: [validator_1.Validators.pagesLayoutValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CustomLayoutValidator;
}(typeValidator_1.ObjectValidator));
exports.CustomLayoutValidator = CustomLayoutValidator;
var VisualLayoutValidator = /** @class */ (function (_super) {
    __extends(VisualLayoutValidator, _super);
    function VisualLayoutValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualLayoutValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "x",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "y",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "z",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "width",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "height",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "displayState",
                validators: [validator_1.Validators.displayStateValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualLayoutValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualLayoutValidator = VisualLayoutValidator;
var DisplayStateValidator = /** @class */ (function (_super) {
    __extends(DisplayStateValidator, _super);
    function DisplayStateValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplayStateValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "mode",
                validators: [validator_1.Validators.displayStateModeValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return DisplayStateValidator;
}(typeValidator_1.ObjectValidator));
exports.DisplayStateValidator = DisplayStateValidator;
var PageLayoutValidator = /** @class */ (function (_super) {
    __extends(PageLayoutValidator, _super);
    function PageLayoutValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageLayoutValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visualsLayout",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.pageLayoutValidator]
            },
            {
                field: "defaultLayout",
                validators: [validator_1.Validators.visualLayoutValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PageLayoutValidator;
}(typeValidator_1.ObjectValidator));
exports.PageLayoutValidator = PageLayoutValidator;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.PageViewFieldValidator = exports.PageValidator = exports.CustomPageSizeValidator = exports.PageSizeValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var PageSizeValidator = /** @class */ (function (_super) {
    __extends(PageSizeValidator, _super);
    function PageSizeValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageSizeValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "type",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.pageSizeTypeValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PageSizeValidator;
}(typeValidator_1.ObjectValidator));
exports.PageSizeValidator = PageSizeValidator;
var CustomPageSizeValidator = /** @class */ (function (_super) {
    __extends(CustomPageSizeValidator, _super);
    function CustomPageSizeValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomPageSizeValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "width",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "height",
                validators: [validator_1.Validators.numberValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return CustomPageSizeValidator;
}(PageSizeValidator));
exports.CustomPageSizeValidator = CustomPageSizeValidator;
var PageValidator = /** @class */ (function (_super) {
    __extends(PageValidator, _super);
    function PageValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "name",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PageValidator;
}(typeValidator_1.ObjectValidator));
exports.PageValidator = PageValidator;
var PageViewFieldValidator = /** @class */ (function (_super) {
    __extends(PageViewFieldValidator, _super);
    function PageViewFieldValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageViewFieldValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var possibleValues = ["actualSize", "fitToWidth", "oneColumn"];
        if (possibleValues.indexOf(input) < 0) {
            return [{
                    message: "pageView must be a string with one of the following values: \"actualSize\", \"fitToWidth\", \"oneColumn\""
                }];
        }
        return null;
    };
    return PageViewFieldValidator;
}(typeValidator_1.StringValidator));
exports.PageViewFieldValidator = PageViewFieldValidator;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.VisualizationsPaneValidator = exports.SyncSlicersPaneValidator = exports.SelectionPaneValidator = exports.PageNavigationPaneValidator = exports.FiltersPaneValidator = exports.FieldsPaneValidator = exports.BookmarksPaneValidator = exports.QnaPanesValidator = exports.ReportPanesValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var ReportPanesValidator = /** @class */ (function (_super) {
    __extends(ReportPanesValidator, _super);
    function ReportPanesValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportPanesValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "bookmarks",
                validators: [validator_1.Validators.bookmarksPaneValidator]
            },
            {
                field: "fields",
                validators: [validator_1.Validators.fieldsPaneValidator]
            },
            {
                field: "filters",
                validators: [validator_1.Validators.filtersPaneValidator]
            },
            {
                field: "pageNavigation",
                validators: [validator_1.Validators.pageNavigationPaneValidator]
            },
            {
                field: "selection",
                validators: [validator_1.Validators.selectionPaneValidator]
            },
            {
                field: "syncSlicers",
                validators: [validator_1.Validators.syncSlicersPaneValidator]
            },
            {
                field: "visualizations",
                validators: [validator_1.Validators.visualizationsPaneValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ReportPanesValidator;
}(typeValidator_1.ObjectValidator));
exports.ReportPanesValidator = ReportPanesValidator;
var QnaPanesValidator = /** @class */ (function (_super) {
    __extends(QnaPanesValidator, _super);
    function QnaPanesValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QnaPanesValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "filters",
                validators: [validator_1.Validators.filtersPaneValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return QnaPanesValidator;
}(typeValidator_1.ObjectValidator));
exports.QnaPanesValidator = QnaPanesValidator;
var BookmarksPaneValidator = /** @class */ (function (_super) {
    __extends(BookmarksPaneValidator, _super);
    function BookmarksPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookmarksPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return BookmarksPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.BookmarksPaneValidator = BookmarksPaneValidator;
var FieldsPaneValidator = /** @class */ (function (_super) {
    __extends(FieldsPaneValidator, _super);
    function FieldsPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldsPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "expanded",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FieldsPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.FieldsPaneValidator = FieldsPaneValidator;
var FiltersPaneValidator = /** @class */ (function (_super) {
    __extends(FiltersPaneValidator, _super);
    function FiltersPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FiltersPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "expanded",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return FiltersPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.FiltersPaneValidator = FiltersPaneValidator;
var PageNavigationPaneValidator = /** @class */ (function (_super) {
    __extends(PageNavigationPaneValidator, _super);
    function PageNavigationPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageNavigationPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "position",
                validators: [validator_1.Validators.pageNavigationPositionValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PageNavigationPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.PageNavigationPaneValidator = PageNavigationPaneValidator;
var SelectionPaneValidator = /** @class */ (function (_super) {
    __extends(SelectionPaneValidator, _super);
    function SelectionPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SelectionPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.SelectionPaneValidator = SelectionPaneValidator;
var SyncSlicersPaneValidator = /** @class */ (function (_super) {
    __extends(SyncSlicersPaneValidator, _super);
    function SyncSlicersPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyncSlicersPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SyncSlicersPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.SyncSlicersPaneValidator = SyncSlicersPaneValidator;
var VisualizationsPaneValidator = /** @class */ (function (_super) {
    __extends(VisualizationsPaneValidator, _super);
    function VisualizationsPaneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualizationsPaneValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "expanded",
                validators: [validator_1.Validators.booleanValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualizationsPaneValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualizationsPaneValidator = VisualizationsPaneValidator;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.QnaInterpretInputDataValidator = exports.QnaSettingsValidator = exports.LoadQnaValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var LoadQnaValidator = /** @class */ (function (_super) {
    __extends(LoadQnaValidator, _super);
    function LoadQnaValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadQnaValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "accessToken",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "datasetIds",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringArrayValidator]
            },
            {
                field: "question",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "viewMode",
                validators: [validator_1.Validators.viewModeValidator]
            },
            {
                field: "settings",
                validators: [validator_1.Validators.qnaSettingValidator]
            },
            {
                field: "tokenType",
                validators: [validator_1.Validators.tokenTypeValidator]
            },
            {
                field: "groupId",
                validators: [validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return LoadQnaValidator;
}(typeValidator_1.ObjectValidator));
exports.LoadQnaValidator = LoadQnaValidator;
var QnaSettingsValidator = /** @class */ (function (_super) {
    __extends(QnaSettingsValidator, _super);
    function QnaSettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QnaSettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "filterPaneEnabled",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "hideErrors",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "panes",
                validators: [validator_1.Validators.qnaPanesValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return QnaSettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.QnaSettingsValidator = QnaSettingsValidator;
var QnaInterpretInputDataValidator = /** @class */ (function (_super) {
    __extends(QnaInterpretInputDataValidator, _super);
    function QnaInterpretInputDataValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QnaInterpretInputDataValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "datasetIds",
                validators: [validator_1.Validators.stringArrayValidator]
            },
            {
                field: "question",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return QnaInterpretInputDataValidator;
}(typeValidator_1.ObjectValidator));
exports.QnaInterpretInputDataValidator = QnaInterpretInputDataValidator;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ReportCreateValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var ReportCreateValidator = /** @class */ (function (_super) {
    __extends(ReportCreateValidator, _super);
    function ReportCreateValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportCreateValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "accessToken",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "datasetId",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "tokenType",
                validators: [validator_1.Validators.tokenTypeValidator]
            },
            {
                field: "theme",
                validators: [validator_1.Validators.customThemeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ReportCreateValidator;
}(typeValidator_1.ObjectValidator));
exports.ReportCreateValidator = ReportCreateValidator;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ReportLoadValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var ReportLoadValidator = /** @class */ (function (_super) {
    __extends(ReportLoadValidator, _super);
    function ReportLoadValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportLoadValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "accessToken",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "id",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "settings",
                validators: [validator_1.Validators.settingsValidator]
            },
            {
                field: "pageName",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "filters",
                validators: [validator_1.Validators.reportLoadFiltersValidator]
            },
            {
                field: "permissions",
                validators: [validator_1.Validators.permissionsValidator]
            },
            {
                field: "viewMode",
                validators: [validator_1.Validators.viewModeValidator]
            },
            {
                field: "tokenType",
                validators: [validator_1.Validators.tokenTypeValidator]
            },
            {
                field: "bookmark",
                validators: [validator_1.Validators.applyBookmarkValidator]
            },
            {
                field: "theme",
                validators: [validator_1.Validators.customThemeValidator]
            },
            {
                field: "embedUrl",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "datasetBinding",
                validators: [validator_1.Validators.datasetBindingValidator]
            },
            {
                field: "contrastMode",
                validators: [validator_1.Validators.contrastModeValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ReportLoadValidator;
}(typeValidator_1.ObjectValidator));
exports.ReportLoadValidator = ReportLoadValidator;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.PaginatedReportLoadValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var PaginatedReportLoadValidator = /** @class */ (function (_super) {
    __extends(PaginatedReportLoadValidator, _super);
    function PaginatedReportLoadValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginatedReportLoadValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "accessToken",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "id",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "settings",
                validators: [validator_1.Validators.paginatedReportsettingsValidator]
            },
            {
                field: "tokenType",
                validators: [validator_1.Validators.tokenTypeValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PaginatedReportLoadValidator;
}(typeValidator_1.ObjectValidator));
exports.PaginatedReportLoadValidator = PaginatedReportLoadValidator;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.SaveAsParametersValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var SaveAsParametersValidator = /** @class */ (function (_super) {
    __extends(SaveAsParametersValidator, _super);
    function SaveAsParametersValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveAsParametersValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "name",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SaveAsParametersValidator;
}(typeValidator_1.ObjectValidator));
exports.SaveAsParametersValidator = SaveAsParametersValidator;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.SlicerTargetSelectorValidator = exports.VisualTypeSelectorValidator = exports.VisualSelectorValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var typeValidator_2 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var VisualSelectorValidator = /** @class */ (function (_super) {
    __extends(VisualSelectorValidator, _super);
    function VisualSelectorValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualSelectorValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                // Not required for this selector only - Backward compatibility
                field: "$schema",
                validators: [validator_1.Validators.stringValidator, new typeValidator_2.SchemaValidator("http://powerbi.com/product/schema#visualSelector")]
            },
            {
                field: "visualName",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualSelectorValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualSelectorValidator = VisualSelectorValidator;
var VisualTypeSelectorValidator = /** @class */ (function (_super) {
    __extends(VisualTypeSelectorValidator, _super);
    function VisualTypeSelectorValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualTypeSelectorValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "$schema",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator, new typeValidator_2.SchemaValidator("http://powerbi.com/product/schema#visualTypeSelector")]
            },
            {
                field: "visualType",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualTypeSelectorValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualTypeSelectorValidator = VisualTypeSelectorValidator;
var SlicerTargetSelectorValidator = /** @class */ (function (_super) {
    __extends(SlicerTargetSelectorValidator, _super);
    function SlicerTargetSelectorValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlicerTargetSelectorValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "$schema",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator, new typeValidator_2.SchemaValidator("http://powerbi.com/product/schema#slicerTargetSelector")]
            },
            {
                field: "target",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.slicerTargetValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SlicerTargetSelectorValidator;
}(typeValidator_1.ObjectValidator));
exports.SlicerTargetSelectorValidator = SlicerTargetSelectorValidator;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.PaginatedReportSettingsValidator = exports.SettingsValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var SettingsValidator = /** @class */ (function (_super) {
    __extends(SettingsValidator, _super);
    function SettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "filterPaneEnabled",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "navContentPaneEnabled",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "bookmarksPaneEnabled",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "useCustomSaveAsDialog",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "extensions",
                validators: [validator_1.Validators.extensionsValidator]
            },
            {
                field: "layoutType",
                validators: [validator_1.Validators.layoutTypeValidator]
            },
            {
                field: "customLayout",
                validators: [validator_1.Validators.customLayoutValidator]
            },
            {
                field: "background",
                validators: [validator_1.Validators.backgroundValidator]
            },
            {
                field: "visualSettings",
                validators: [validator_1.Validators.visualSettingsValidator]
            },
            {
                field: "hideErrors",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "commands",
                validators: [validator_1.Validators.commandsSettingsArrayValidator]
            },
            {
                field: "hyperlinkClickBehavior",
                validators: [validator_1.Validators.hyperlinkClickBehaviorValidator]
            },
            {
                field: "bars",
                validators: [validator_1.Validators.reportBarsValidator]
            },
            {
                field: "panes",
                validators: [validator_1.Validators.reportPanesValidator]
            },
            {
                field: "personalBookmarksEnabled",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "persistentFiltersEnabled",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "visualRenderedEvents",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "authoringHintsEnabled",
                validators: [validator_1.Validators.booleanValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.SettingsValidator = SettingsValidator;
var PaginatedReportSettingsValidator = /** @class */ (function (_super) {
    __extends(PaginatedReportSettingsValidator, _super);
    function PaginatedReportSettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginatedReportSettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "commands",
                validators: [validator_1.Validators.paginatedReportCommandsValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return PaginatedReportSettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.PaginatedReportSettingsValidator = PaginatedReportSettingsValidator;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.SlicerStateValidator = exports.SlicerValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var SlicerValidator = /** @class */ (function (_super) {
    __extends(SlicerValidator, _super);
    function SlicerValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlicerValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "selector",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.slicerSelectorValidator]
            },
            {
                field: "state",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.slicerStateValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SlicerValidator;
}(typeValidator_1.ObjectValidator));
exports.SlicerValidator = SlicerValidator;
var SlicerStateValidator = /** @class */ (function (_super) {
    __extends(SlicerStateValidator, _super);
    function SlicerStateValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlicerStateValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "filters",
                validators: [validator_1.Validators.filtersArrayValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return SlicerStateValidator;
}(typeValidator_1.ObjectValidator));
exports.SlicerStateValidator = SlicerStateValidator;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.TileLoadValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var TileLoadValidator = /** @class */ (function (_super) {
    __extends(TileLoadValidator, _super);
    function TileLoadValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TileLoadValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "accessToken",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "id",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "dashboardId",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "pageView",
                validators: [validator_1.Validators.stringValidator]
            },
            {
                field: "tokenType",
                validators: [validator_1.Validators.tokenTypeValidator]
            },
            {
                field: "width",
                validators: [validator_1.Validators.numberValidator]
            },
            {
                field: "height",
                validators: [validator_1.Validators.numberValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return TileLoadValidator;
}(typeValidator_1.ObjectValidator));
exports.TileLoadValidator = TileLoadValidator;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.VisualHeaderValidator = exports.VisualHeaderSettingsValidator = exports.VisualSettingsValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var VisualSettingsValidator = /** @class */ (function (_super) {
    __extends(VisualSettingsValidator, _super);
    function VisualSettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualSettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visualHeaders",
                validators: [validator_1.Validators.visualHeadersValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualSettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualSettingsValidator = VisualSettingsValidator;
var VisualHeaderSettingsValidator = /** @class */ (function (_super) {
    __extends(VisualHeaderSettingsValidator, _super);
    function VisualHeaderSettingsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualHeaderSettingsValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "visible",
                validators: [validator_1.Validators.booleanValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualHeaderSettingsValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualHeaderSettingsValidator = VisualHeaderSettingsValidator;
var VisualHeaderValidator = /** @class */ (function (_super) {
    __extends(VisualHeaderValidator, _super);
    function VisualHeaderValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualHeaderValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "settings",
                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.visualHeaderSettingsValidator]
            },
            {
                field: "selector",
                validators: [validator_1.Validators.visualHeaderSelectorValidator]
            },
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return VisualHeaderValidator;
}(typeValidator_1.ObjectValidator));
exports.VisualHeaderValidator = VisualHeaderValidator;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyOfValidator = void 0;
var AnyOfValidator = /** @class */ (function () {
    function AnyOfValidator(validators) {
        this.validators = validators;
    }
    AnyOfValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var valid = false;
        for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
            var validator = _a[_i];
            var errors = validator.validate(input, path, field);
            if (!errors) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            return [{
                    message: field + " property is invalid",
                    path: (path ? path + "." : "") + field,
                    keyword: "invalid"
                }];
        }
        return null;
    };
    return AnyOfValidator;
}());
exports.AnyOfValidator = AnyOfValidator;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldForbiddenValidator = void 0;
var FieldForbiddenValidator = /** @class */ (function () {
    function FieldForbiddenValidator() {
    }
    FieldForbiddenValidator.prototype.validate = function (input, path, field) {
        if (input !== undefined) {
            return [{
                    message: field + " is forbidden",
                    path: (path ? path + "." : "") + field,
                    keyword: "forbidden"
                }];
        }
        return null;
    };
    return FieldForbiddenValidator;
}());
exports.FieldForbiddenValidator = FieldForbiddenValidator;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRequiredValidator = void 0;
var FieldRequiredValidator = /** @class */ (function () {
    function FieldRequiredValidator() {
    }
    FieldRequiredValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return [{
                    message: field + " is required",
                    path: (path ? path + "." : "") + field,
                    keyword: "required"
                }];
        }
        return null;
    };
    return FieldRequiredValidator;
}());
exports.FieldRequiredValidator = FieldRequiredValidator;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.MapValidator = void 0;
var typeValidator_1 = __webpack_require__(4);
var MapValidator = /** @class */ (function (_super) {
    __extends(MapValidator, _super);
    function MapValidator(keyValidators, valueValidators) {
        var _this = _super.call(this) || this;
        _this.keyValidators = keyValidators;
        _this.valueValidators = valueValidators;
        return _this;
    }
    MapValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                var fieldsPath = (path ? path + "." : "") + field + "." + key;
                for (var _i = 0, _a = this.keyValidators; _i < _a.length; _i++) {
                    var keyValidator = _a[_i];
                    errors = keyValidator.validate(key, fieldsPath, field);
                    if (errors) {
                        return errors;
                    }
                }
                for (var _b = 0, _c = this.valueValidators; _b < _c.length; _b++) {
                    var valueValidator = _c[_b];
                    errors = valueValidator.validate(input[key], fieldsPath, field);
                    if (errors) {
                        return errors;
                    }
                }
            }
        }
        return null;
    };
    return MapValidator;
}(typeValidator_1.ObjectValidator));
exports.MapValidator = MapValidator;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ParametersPanelValidator = void 0;
var multipleFieldsValidator_1 = __webpack_require__(3);
var typeValidator_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(1);
var ParametersPanelValidator = /** @class */ (function (_super) {
    __extends(ParametersPanelValidator, _super);
    function ParametersPanelValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParametersPanelValidator.prototype.validate = function (input, path, field) {
        if (input == null) {
            return null;
        }
        var errors = _super.prototype.validate.call(this, input, path, field);
        if (errors) {
            return errors;
        }
        var fields = [
            {
                field: "expanded",
                validators: [validator_1.Validators.booleanValidator]
            },
            {
                field: "enabled",
                validators: [validator_1.Validators.booleanValidator]
            }
        ];
        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    };
    return ParametersPanelValidator;
}(typeValidator_1.ObjectValidator));
exports.ParametersPanelValidator = ParametersPanelValidator;


/***/ })
/******/ ]);
});
//# sourceMappingURL=models.js.map

/***/ }),

/***/ "./node_modules/powerbi-router/dist/router.js":
/*!****************************************************!*\
  !*** ./node_modules/powerbi-router/dist/router.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! powerbi-router v0.1.5 | (c) 2016 Microsoft Corporation MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var RouteRecognizer = __webpack_require__(1);
	var Router = (function () {
	    function Router(handlers) {
	        this.handlers = handlers;
	        /**
	         * TODO: look at generating the router dynamically based on list of supported http methods
	         * instead of hardcoding the creation of these and the methods.
	         */
	        this.getRouteRecognizer = new RouteRecognizer();
	        this.patchRouteRecognizer = new RouteRecognizer();
	        this.postRouteRecognizer = new RouteRecognizer();
	        this.putRouteRecognizer = new RouteRecognizer();
	        this.deleteRouteRecognizer = new RouteRecognizer();
	    }
	    Router.prototype.get = function (url, handler) {
	        this.registerHandler(this.getRouteRecognizer, "GET", url, handler);
	        return this;
	    };
	    Router.prototype.patch = function (url, handler) {
	        this.registerHandler(this.patchRouteRecognizer, "PATCH", url, handler);
	        return this;
	    };
	    Router.prototype.post = function (url, handler) {
	        this.registerHandler(this.postRouteRecognizer, "POST", url, handler);
	        return this;
	    };
	    Router.prototype.put = function (url, handler) {
	        this.registerHandler(this.putRouteRecognizer, "PUT", url, handler);
	        return this;
	    };
	    Router.prototype.delete = function (url, handler) {
	        this.registerHandler(this.deleteRouteRecognizer, "DELETE", url, handler);
	        return this;
	    };
	    /**
	     * TODO: This method could use some refactoring.  There is conflict of interest between keeping clean separation of test and handle method
	     * Test method only returns boolean indicating if request can be handled, and handle method has opportunity to modify response and return promise of it.
	     * In the case of the router with route-recognizer where handlers are associated with routes, this already guarantees that only one handler is selected and makes the test method feel complicated
	     * Will leave as is an investigate cleaner ways at later time.
	     */
	    Router.prototype.registerHandler = function (routeRecognizer, method, url, handler) {
	        var routeRecognizerHandler = function (request) {
	            var response = new Response();
	            return Promise.resolve(handler(request, response))
	                .then(function (x) { return response; });
	        };
	        routeRecognizer.add([
	            { path: url, handler: routeRecognizerHandler }
	        ]);
	        var internalHandler = {
	            test: function (request) {
	                if (request.method !== method) {
	                    return false;
	                }
	                var matchingRoutes = routeRecognizer.recognize(request.url);
	                if (matchingRoutes === undefined) {
	                    return false;
	                }
	                /**
	                 * Copy parameters from recognized route to the request so they can be used within the handler function
	                 * This isn't ideal because it is side affect which modifies the request instead of strictly testing for true or false
	                 * but I don't see a better place to put this.  If we move it between the call to test and the handle it becomes part of the window post message proxy
	                 * even though it's responsibility is related to routing.
	                 */
	                var route = matchingRoutes[0];
	                request.params = route.params;
	                request.queryParams = matchingRoutes.queryParams;
	                request.handler = route.handler;
	                return true;
	            },
	            handle: function (request) {
	                return request.handler(request);
	            }
	        };
	        this.handlers.addHandler(internalHandler);
	    };
	    return Router;
	}());
	exports.Router = Router;
	var Response = (function () {
	    function Response() {
	        this.statusCode = 200;
	        this.headers = {};
	        this.body = null;
	    }
	    Response.prototype.send = function (statusCode, body) {
	        this.statusCode = statusCode;
	        this.body = body;
	    };
	    return Response;
	}());
	exports.Response = Response;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
	    "use strict";
	    function $$route$recognizer$dsl$$Target(path, matcher, delegate) {
	      this.path = path;
	      this.matcher = matcher;
	      this.delegate = delegate;
	    }
	
	    $$route$recognizer$dsl$$Target.prototype = {
	      to: function(target, callback) {
	        var delegate = this.delegate;
	
	        if (delegate && delegate.willAddRoute) {
	          target = delegate.willAddRoute(this.matcher.target, target);
	        }
	
	        this.matcher.add(this.path, target);
	
	        if (callback) {
	          if (callback.length === 0) { throw new Error("You must have an argument in the function passed to `to`"); }
	          this.matcher.addChild(this.path, target, callback, this.delegate);
	        }
	        return this;
	      }
	    };
	
	    function $$route$recognizer$dsl$$Matcher(target) {
	      this.routes = {};
	      this.children = {};
	      this.target = target;
	    }
	
	    $$route$recognizer$dsl$$Matcher.prototype = {
	      add: function(path, handler) {
	        this.routes[path] = handler;
	      },
	
	      addChild: function(path, target, callback, delegate) {
	        var matcher = new $$route$recognizer$dsl$$Matcher(target);
	        this.children[path] = matcher;
	
	        var match = $$route$recognizer$dsl$$generateMatch(path, matcher, delegate);
	
	        if (delegate && delegate.contextEntered) {
	          delegate.contextEntered(target, match);
	        }
	
	        callback(match);
	      }
	    };
	
	    function $$route$recognizer$dsl$$generateMatch(startingPath, matcher, delegate) {
	      return function(path, nestedCallback) {
	        var fullPath = startingPath + path;
	
	        if (nestedCallback) {
	          nestedCallback($$route$recognizer$dsl$$generateMatch(fullPath, matcher, delegate));
	        } else {
	          return new $$route$recognizer$dsl$$Target(startingPath + path, matcher, delegate);
	        }
	      };
	    }
	
	    function $$route$recognizer$dsl$$addRoute(routeArray, path, handler) {
	      var len = 0;
	      for (var i=0; i<routeArray.length; i++) {
	        len += routeArray[i].path.length;
	      }
	
	      path = path.substr(len);
	      var route = { path: path, handler: handler };
	      routeArray.push(route);
	    }
	
	    function $$route$recognizer$dsl$$eachRoute(baseRoute, matcher, callback, binding) {
	      var routes = matcher.routes;
	
	      for (var path in routes) {
	        if (routes.hasOwnProperty(path)) {
	          var routeArray = baseRoute.slice();
	          $$route$recognizer$dsl$$addRoute(routeArray, path, routes[path]);
	
	          if (matcher.children[path]) {
	            $$route$recognizer$dsl$$eachRoute(routeArray, matcher.children[path], callback, binding);
	          } else {
	            callback.call(binding, routeArray);
	          }
	        }
	      }
	    }
	
	    var $$route$recognizer$dsl$$default = function(callback, addRouteCallback) {
	      var matcher = new $$route$recognizer$dsl$$Matcher();
	
	      callback($$route$recognizer$dsl$$generateMatch("", matcher, this.delegate));
	
	      $$route$recognizer$dsl$$eachRoute([], matcher, function(route) {
	        if (addRouteCallback) { addRouteCallback(this, route); }
	        else { this.add(route); }
	      }, this);
	    };
	
	    var $$route$recognizer$$specials = [
	      '/', '.', '*', '+', '?', '|',
	      '(', ')', '[', ']', '{', '}', '\\'
	    ];
	
	    var $$route$recognizer$$escapeRegex = new RegExp('(\\' + $$route$recognizer$$specials.join('|\\') + ')', 'g');
	
	    function $$route$recognizer$$isArray(test) {
	      return Object.prototype.toString.call(test) === "[object Array]";
	    }
	
	    // A Segment represents a segment in the original route description.
	    // Each Segment type provides an `eachChar` and `regex` method.
	    //
	    // The `eachChar` method invokes the callback with one or more character
	    // specifications. A character specification consumes one or more input
	    // characters.
	    //
	    // The `regex` method returns a regex fragment for the segment. If the
	    // segment is a dynamic of star segment, the regex fragment also includes
	    // a capture.
	    //
	    // A character specification contains:
	    //
	    // * `validChars`: a String with a list of all valid characters, or
	    // * `invalidChars`: a String with a list of all invalid characters
	    // * `repeat`: true if the character specification can repeat
	
	    function $$route$recognizer$$StaticSegment(string) { this.string = string; }
	    $$route$recognizer$$StaticSegment.prototype = {
	      eachChar: function(currentState) {
	        var string = this.string, ch;
	
	        for (var i=0; i<string.length; i++) {
	          ch = string.charAt(i);
	          currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: ch });
	        }
	
	        return currentState;
	      },
	
	      regex: function() {
	        return this.string.replace($$route$recognizer$$escapeRegex, '\\$1');
	      },
	
	      generate: function() {
	        return this.string;
	      }
	    };
	
	    function $$route$recognizer$$DynamicSegment(name) { this.name = name; }
	    $$route$recognizer$$DynamicSegment.prototype = {
	      eachChar: function(currentState) {
	        return currentState.put({ invalidChars: "/", repeat: true, validChars: undefined });
	      },
	
	      regex: function() {
	        return "([^/]+)";
	      },
	
	      generate: function(params) {
	        return params[this.name];
	      }
	    };
	
	    function $$route$recognizer$$StarSegment(name) { this.name = name; }
	    $$route$recognizer$$StarSegment.prototype = {
	      eachChar: function(currentState) {
	        return currentState.put({ invalidChars: "", repeat: true, validChars: undefined });
	      },
	
	      regex: function() {
	        return "(.+)";
	      },
	
	      generate: function(params) {
	        return params[this.name];
	      }
	    };
	
	    function $$route$recognizer$$EpsilonSegment() {}
	    $$route$recognizer$$EpsilonSegment.prototype = {
	      eachChar: function(currentState) {
	        return currentState;
	      },
	      regex: function() { return ""; },
	      generate: function() { return ""; }
	    };
	
	    function $$route$recognizer$$parse(route, names, specificity) {
	      // normalize route as not starting with a "/". Recognition will
	      // also normalize.
	      if (route.charAt(0) === "/") { route = route.substr(1); }
	
	      var segments = route.split("/");
	      var results = new Array(segments.length);
	
	      // A routes has specificity determined by the order that its different segments
	      // appear in. This system mirrors how the magnitude of numbers written as strings
	      // works.
	      // Consider a number written as: "abc". An example would be "200". Any other number written
	      // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	      // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	      // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	      // leading symbol, "1".
	      // The rule is that symbols to the left carry more weight than symbols to the right
	      // when a number is written out as a string. In the above strings, the leading digit
	      // represents how many 100's are in the number, and it carries more weight than the middle
	      // number which represents how many 10's are in the number.
	      // This system of number magnitude works well for route specificity, too. A route written as
	      // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	      // `x`, irrespective of the other parts.
	      // Because of this similarity, we assign each type of segment a number value written as a
	      // string. We can find the specificity of compound routes by concatenating these strings
	      // together, from left to right. After we have looped through all of the segments,
	      // we convert the string to a number.
	      specificity.val = '';
	
	      for (var i=0; i<segments.length; i++) {
	        var segment = segments[i], match;
	
	        if (match = segment.match(/^:([^\/]+)$/)) {
	          results[i] = new $$route$recognizer$$DynamicSegment(match[1]);
	          names.push(match[1]);
	          specificity.val += '3';
	        } else if (match = segment.match(/^\*([^\/]+)$/)) {
	          results[i] = new $$route$recognizer$$StarSegment(match[1]);
	          specificity.val += '1';
	          names.push(match[1]);
	        } else if(segment === "") {
	          results[i] = new $$route$recognizer$$EpsilonSegment();
	          specificity.val += '2';
	        } else {
	          results[i] = new $$route$recognizer$$StaticSegment(segment);
	          specificity.val += '4';
	        }
	      }
	
	      specificity.val = +specificity.val;
	
	      return results;
	    }
	
	    // A State has a character specification and (`charSpec`) and a list of possible
	    // subsequent states (`nextStates`).
	    //
	    // If a State is an accepting state, it will also have several additional
	    // properties:
	    //
	    // * `regex`: A regular expression that is used to extract parameters from paths
	    //   that reached this accepting state.
	    // * `handlers`: Information on how to convert the list of captures into calls
	    //   to registered handlers with the specified parameters
	    // * `types`: How many static, dynamic or star segments in this route. Used to
	    //   decide which route to use if multiple registered routes match a path.
	    //
	    // Currently, State is implemented naively by looping over `nextStates` and
	    // comparing a character specification against a character. A more efficient
	    // implementation would use a hash of keys pointing at one or more next states.
	
	    function $$route$recognizer$$State(charSpec) {
	      this.charSpec = charSpec;
	      this.nextStates = [];
	      this.charSpecs = {};
	      this.regex = undefined;
	      this.handlers = undefined;
	      this.specificity = undefined;
	    }
	
	    $$route$recognizer$$State.prototype = {
	      get: function(charSpec) {
	        if (this.charSpecs[charSpec.validChars]) {
	          return this.charSpecs[charSpec.validChars];
	        }
	
	        var nextStates = this.nextStates;
	
	        for (var i=0; i<nextStates.length; i++) {
	          var child = nextStates[i];
	
	          var isEqual = child.charSpec.validChars === charSpec.validChars;
	          isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	          if (isEqual) {
	            this.charSpecs[charSpec.validChars] = child;
	            return child;
	          }
	        }
	      },
	
	      put: function(charSpec) {
	        var state;
	
	        // If the character specification already exists in a child of the current
	        // state, just return that state.
	        if (state = this.get(charSpec)) { return state; }
	
	        // Make a new state for the character spec
	        state = new $$route$recognizer$$State(charSpec);
	
	        // Insert the new state as a child of the current state
	        this.nextStates.push(state);
	
	        // If this character specification repeats, insert the new state as a child
	        // of itself. Note that this will not trigger an infinite loop because each
	        // transition during recognition consumes a character.
	        if (charSpec.repeat) {
	          state.nextStates.push(state);
	        }
	
	        // Return the new state
	        return state;
	      },
	
	      // Find a list of child states matching the next character
	      match: function(ch) {
	        var nextStates = this.nextStates,
	            child, charSpec, chars;
	
	        var returned = [];
	
	        for (var i=0; i<nextStates.length; i++) {
	          child = nextStates[i];
	
	          charSpec = child.charSpec;
	
	          if (typeof (chars = charSpec.validChars) !== 'undefined') {
	            if (chars.indexOf(ch) !== -1) { returned.push(child); }
	          } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	            if (chars.indexOf(ch) === -1) { returned.push(child); }
	          }
	        }
	
	        return returned;
	      }
	    };
	
	    // Sort the routes by specificity
	    function $$route$recognizer$$sortSolutions(states) {
	      return states.sort(function(a, b) {
	        return b.specificity.val - a.specificity.val;
	      });
	    }
	
	    function $$route$recognizer$$recognizeChar(states, ch) {
	      var nextStates = [];
	
	      for (var i=0, l=states.length; i<l; i++) {
	        var state = states[i];
	
	        nextStates = nextStates.concat(state.match(ch));
	      }
	
	      return nextStates;
	    }
	
	    var $$route$recognizer$$oCreate = Object.create || function(proto) {
	      function F() {}
	      F.prototype = proto;
	      return new F();
	    };
	
	    function $$route$recognizer$$RecognizeResults(queryParams) {
	      this.queryParams = queryParams || {};
	    }
	    $$route$recognizer$$RecognizeResults.prototype = $$route$recognizer$$oCreate({
	      splice: Array.prototype.splice,
	      slice:  Array.prototype.slice,
	      push:   Array.prototype.push,
	      length: 0,
	      queryParams: null
	    });
	
	    function $$route$recognizer$$findHandler(state, path, queryParams) {
	      var handlers = state.handlers, regex = state.regex;
	      var captures = path.match(regex), currentCapture = 1;
	      var result = new $$route$recognizer$$RecognizeResults(queryParams);
	
	      result.length = handlers.length;
	
	      for (var i=0; i<handlers.length; i++) {
	        var handler = handlers[i], names = handler.names, params = {};
	
	        for (var j=0; j<names.length; j++) {
	          params[names[j]] = captures[currentCapture++];
	        }
	
	        result[i] = { handler: handler.handler, params: params, isDynamic: !!names.length };
	      }
	
	      return result;
	    }
	
	    function $$route$recognizer$$decodeQueryParamPart(part) {
	      // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	      part = part.replace(/\+/gm, '%20');
	      var result;
	      try {
	        result = decodeURIComponent(part);
	      } catch(error) {result = '';}
	      return result;
	    }
	
	    // The main interface
	
	    var $$route$recognizer$$RouteRecognizer = function() {
	      this.rootState = new $$route$recognizer$$State();
	      this.names = {};
	    };
	
	
	    $$route$recognizer$$RouteRecognizer.prototype = {
	      add: function(routes, options) {
	        var currentState = this.rootState, regex = "^",
	            specificity = {},
	            handlers = new Array(routes.length), allSegments = [], name;
	
	        var isEmpty = true;
	
	        for (var i=0; i<routes.length; i++) {
	          var route = routes[i], names = [];
	
	          var segments = $$route$recognizer$$parse(route.path, names, specificity);
	
	          allSegments = allSegments.concat(segments);
	
	          for (var j=0; j<segments.length; j++) {
	            var segment = segments[j];
	
	            if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }
	
	            isEmpty = false;
	
	            // Add a "/" for the new segment
	            currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
	            regex += "/";
	
	            // Add a representation of the segment to the NFA and regex
	            currentState = segment.eachChar(currentState);
	            regex += segment.regex();
	          }
	          var handler = { handler: route.handler, names: names };
	          handlers[i] = handler;
	        }
	
	        if (isEmpty) {
	          currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
	          regex += "/";
	        }
	
	        currentState.handlers = handlers;
	        currentState.regex = new RegExp(regex + "$");
	        currentState.specificity = specificity;
	
	        if (name = options && options.as) {
	          this.names[name] = {
	            segments: allSegments,
	            handlers: handlers
	          };
	        }
	      },
	
	      handlersFor: function(name) {
	        var route = this.names[name];
	
	        if (!route) { throw new Error("There is no route named " + name); }
	
	        var result = new Array(route.handlers.length);
	
	        for (var i=0; i<route.handlers.length; i++) {
	          result[i] = route.handlers[i];
	        }
	
	        return result;
	      },
	
	      hasRoute: function(name) {
	        return !!this.names[name];
	      },
	
	      generate: function(name, params) {
	        var route = this.names[name], output = "";
	        if (!route) { throw new Error("There is no route named " + name); }
	
	        var segments = route.segments;
	
	        for (var i=0; i<segments.length; i++) {
	          var segment = segments[i];
	
	          if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }
	
	          output += "/";
	          output += segment.generate(params);
	        }
	
	        if (output.charAt(0) !== '/') { output = '/' + output; }
	
	        if (params && params.queryParams) {
	          output += this.generateQueryString(params.queryParams, route.handlers);
	        }
	
	        return output;
	      },
	
	      generateQueryString: function(params, handlers) {
	        var pairs = [];
	        var keys = [];
	        for(var key in params) {
	          if (params.hasOwnProperty(key)) {
	            keys.push(key);
	          }
	        }
	        keys.sort();
	        for (var i = 0; i < keys.length; i++) {
	          key = keys[i];
	          var value = params[key];
	          if (value == null) {
	            continue;
	          }
	          var pair = encodeURIComponent(key);
	          if ($$route$recognizer$$isArray(value)) {
	            for (var j = 0; j < value.length; j++) {
	              var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	              pairs.push(arrayPair);
	            }
	          } else {
	            pair += "=" + encodeURIComponent(value);
	            pairs.push(pair);
	          }
	        }
	
	        if (pairs.length === 0) { return ''; }
	
	        return "?" + pairs.join("&");
	      },
	
	      parseQueryString: function(queryString) {
	        var pairs = queryString.split("&"), queryParams = {};
	        for(var i=0; i < pairs.length; i++) {
	          var pair      = pairs[i].split('='),
	              key       = $$route$recognizer$$decodeQueryParamPart(pair[0]),
	              keyLength = key.length,
	              isArray = false,
	              value;
	          if (pair.length === 1) {
	            value = 'true';
	          } else {
	            //Handle arrays
	            if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
	              isArray = true;
	              key = key.slice(0, keyLength - 2);
	              if(!queryParams[key]) {
	                queryParams[key] = [];
	              }
	            }
	            value = pair[1] ? $$route$recognizer$$decodeQueryParamPart(pair[1]) : '';
	          }
	          if (isArray) {
	            queryParams[key].push(value);
	          } else {
	            queryParams[key] = value;
	          }
	        }
	        return queryParams;
	      },
	
	      recognize: function(path) {
	        var states = [ this.rootState ],
	            pathLen, i, l, queryStart, queryParams = {},
	            isSlashDropped = false;
	
	        queryStart = path.indexOf('?');
	        if (queryStart !== -1) {
	          var queryString = path.substr(queryStart + 1, path.length);
	          path = path.substr(0, queryStart);
	          queryParams = this.parseQueryString(queryString);
	        }
	
	        path = decodeURI(path);
	
	        if (path.charAt(0) !== "/") { path = "/" + path; }
	
	        pathLen = path.length;
	        if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	          path = path.substr(0, pathLen - 1);
	          isSlashDropped = true;
	        }
	
	        for (i=0; i<path.length; i++) {
	          states = $$route$recognizer$$recognizeChar(states, path.charAt(i));
	          if (!states.length) { break; }
	        }
	
	        var solutions = [];
	        for (i=0; i<states.length; i++) {
	          if (states[i].handlers) { solutions.push(states[i]); }
	        }
	
	        states = $$route$recognizer$$sortSolutions(solutions);
	
	        var state = solutions[0];
	
	        if (state && state.handlers) {
	          // if a trailing slash was dropped and a star segment is the last segment
	          // specified, put the trailing slash back
	          if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	            path = path + "/";
	          }
	          return $$route$recognizer$$findHandler(state, path, queryParams);
	        }
	      }
	    };
	
	    $$route$recognizer$$RouteRecognizer.prototype.map = $$route$recognizer$dsl$$default;
	
	    $$route$recognizer$$RouteRecognizer.VERSION = '0.1.11';
	
	    var $$route$recognizer$$default = $$route$recognizer$$RouteRecognizer;
	
	    /* global define:true module:true window: true */
	    if ( true && __webpack_require__(3)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return $$route$recognizer$$default; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = $$route$recognizer$$default;
	    } else if (typeof this !== 'undefined') {
	      this['RouteRecognizer'] = $$route$recognizer$$default;
	    }
	}).call(this);
	
	//# sourceMappingURL=route-recognizer.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ])
});
;
//# sourceMappingURL=router.js.map

/***/ }),

/***/ "./node_modules/window-post-message-proxy/dist/windowPostMessageProxy.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/window-post-message-proxy/dist/windowPostMessageProxy.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! window-post-message-proxy v0.2.6 | (c) 2016 Microsoft Corporation MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";
	var WindowPostMessageProxy = (function () {
	    function WindowPostMessageProxy(options) {
	        var _this = this;
	        if (options === void 0) { options = {
	            processTrackingProperties: {
	                addTrackingProperties: WindowPostMessageProxy.defaultAddTrackingProperties,
	                getTrackingProperties: WindowPostMessageProxy.defaultGetTrackingProperties
	            },
	            isErrorMessage: WindowPostMessageProxy.defaultIsErrorMessage,
	            receiveWindow: window,
	            name: WindowPostMessageProxy.createRandomString()
	        }; }
	        this.pendingRequestPromises = {};
	        // save options with defaults
	        this.addTrackingProperties = (options.processTrackingProperties && options.processTrackingProperties.addTrackingProperties) || WindowPostMessageProxy.defaultAddTrackingProperties;
	        this.getTrackingProperties = (options.processTrackingProperties && options.processTrackingProperties.getTrackingProperties) || WindowPostMessageProxy.defaultGetTrackingProperties;
	        this.isErrorMessage = options.isErrorMessage || WindowPostMessageProxy.defaultIsErrorMessage;
	        this.receiveWindow = options.receiveWindow || window;
	        this.name = options.name || WindowPostMessageProxy.createRandomString();
	        this.logMessages = options.logMessages || false;
	        this.eventSourceOverrideWindow = options.eventSourceOverrideWindow;
	        this.suppressWarnings = options.suppressWarnings || false;
	        if (this.logMessages) {
	            console.log("new WindowPostMessageProxy created with name: " + this.name + " receiving on window: " + this.receiveWindow.document.title);
	        }
	        // Initialize
	        this.handlers = [];
	        this.windowMessageHandler = function (event) { return _this.onMessageReceived(event); };
	        this.start();
	    }
	    // Static
	    WindowPostMessageProxy.defaultAddTrackingProperties = function (message, trackingProperties) {
	        message[WindowPostMessageProxy.messagePropertyName] = trackingProperties;
	        return message;
	    };
	    WindowPostMessageProxy.defaultGetTrackingProperties = function (message) {
	        return message[WindowPostMessageProxy.messagePropertyName];
	    };
	    WindowPostMessageProxy.defaultIsErrorMessage = function (message) {
	        return !!message.error;
	    };
	    /**
	     * Utility to create a deferred object.
	     */
	    // TODO: Look to use RSVP library instead of doing this manually.
	    // From what I searched RSVP would work better because it has .finally and .deferred; however, it doesn't have Typings information. 
	    WindowPostMessageProxy.createDeferred = function () {
	        var deferred = {
	            resolve: null,
	            reject: null,
	            promise: null
	        };
	        var promise = new Promise(function (resolve, reject) {
	            deferred.resolve = resolve;
	            deferred.reject = reject;
	        });
	        deferred.promise = promise;
	        return deferred;
	    };
	    /**
	     * Utility to generate random sequence of characters used as tracking id for promises.
	     */
	    WindowPostMessageProxy.createRandomString = function () {
	        // window.msCrypto for IE
	        var cryptoObj = window.crypto || window.msCrypto;
	        var randomValueArray = new Uint32Array(1);
	        cryptoObj.getRandomValues(randomValueArray);
	        return randomValueArray[0].toString(36).substring(1);
	    };
	    /**
	     * Adds handler.
	     * If the first handler whose test method returns true will handle the message and provide a response.
	     */
	    WindowPostMessageProxy.prototype.addHandler = function (handler) {
	        this.handlers.push(handler);
	    };
	    /**
	     * Removes handler.
	     * The reference must match the original object that was provided when adding the handler.
	     */
	    WindowPostMessageProxy.prototype.removeHandler = function (handler) {
	        var handlerIndex = this.handlers.indexOf(handler);
	        if (handlerIndex === -1) {
	            throw new Error("You attempted to remove a handler but no matching handler was found.");
	        }
	        this.handlers.splice(handlerIndex, 1);
	    };
	    /**
	     * Start listening to message events.
	     */
	    WindowPostMessageProxy.prototype.start = function () {
	        this.receiveWindow.addEventListener('message', this.windowMessageHandler);
	    };
	    /**
	     * Stops listening to message events.
	     */
	    WindowPostMessageProxy.prototype.stop = function () {
	        this.receiveWindow.removeEventListener('message', this.windowMessageHandler);
	    };
	    /**
	     * Post message to target window with tracking properties added and save deferred object referenced by tracking id.
	     */
	    WindowPostMessageProxy.prototype.postMessage = function (targetWindow, message) {
	        // Add tracking properties to indicate message came from this proxy
	        var trackingProperties = { id: WindowPostMessageProxy.createRandomString() };
	        this.addTrackingProperties(message, trackingProperties);
	        if (this.logMessages) {
	            console.log(this.name + " Posting message:");
	            console.log(JSON.stringify(message, null, '  '));
	        }
	        targetWindow.postMessage(message, "*");
	        var deferred = WindowPostMessageProxy.createDeferred();
	        this.pendingRequestPromises[trackingProperties.id] = deferred;
	        return deferred.promise;
	    };
	    /**
	     * Send response message to target window.
	     * Response messages re-use tracking properties from a previous request message.
	     */
	    WindowPostMessageProxy.prototype.sendResponse = function (targetWindow, message, trackingProperties) {
	        this.addTrackingProperties(message, trackingProperties);
	        if (this.logMessages) {
	            console.log(this.name + " Sending response:");
	            console.log(JSON.stringify(message, null, '  '));
	        }
	        targetWindow.postMessage(message, "*");
	    };
	    /**
	     * Message handler.
	     */
	    WindowPostMessageProxy.prototype.onMessageReceived = function (event) {
	        var _this = this;
	        if (this.logMessages) {
	            console.log(this.name + " Received message:");
	            console.log("type: " + event.type);
	            console.log(JSON.stringify(event.data, null, '  '));
	        }
	        var sendingWindow = this.eventSourceOverrideWindow || event.source;
	        var message = event.data;
	        if (typeof message !== "object") {
	            if (!this.suppressWarnings) {
	                console.warn("Proxy(" + this.name + "): Received message that was not an object. Discarding message");
	            }
	            return;
	        }
	        var trackingProperties;
	        try {
	            trackingProperties = this.getTrackingProperties(message);
	        }
	        catch (e) {
	            if (!this.suppressWarnings) {
	                console.warn("Proxy(" + this.name + "): Error occurred when attempting to get tracking properties from incoming message:", JSON.stringify(message, null, '  '), "Error: ", e);
	            }
	        }
	        var deferred;
	        if (trackingProperties) {
	            deferred = this.pendingRequestPromises[trackingProperties.id];
	        }
	        // If message does not have a known ID, treat it as a request
	        // Otherwise, treat message as response
	        if (!deferred) {
	            var handled = this.handlers.some(function (handler) {
	                var canMessageBeHandled = false;
	                try {
	                    canMessageBeHandled = handler.test(message);
	                }
	                catch (e) {
	                    if (!_this.suppressWarnings) {
	                        console.warn("Proxy(" + _this.name + "): Error occurred when handler was testing incoming message:", JSON.stringify(message, null, '  '), "Error: ", e);
	                    }
	                }
	                if (canMessageBeHandled) {
	                    var responseMessagePromise = void 0;
	                    try {
	                        responseMessagePromise = Promise.resolve(handler.handle(message));
	                    }
	                    catch (e) {
	                        if (!_this.suppressWarnings) {
	                            console.warn("Proxy(" + _this.name + "): Error occurred when handler was processing incoming message:", JSON.stringify(message, null, '  '), "Error: ", e);
	                        }
	                        responseMessagePromise = Promise.resolve();
	                    }
	                    responseMessagePromise
	                        .then(function (responseMessage) {
	                        if (!responseMessage) {
	                            var warningMessage = "Handler for message: " + JSON.stringify(message, null, '  ') + " did not return a response message. The default response message will be returned instead.";
	                            if (!_this.suppressWarnings) {
	                                console.warn("Proxy(" + _this.name + "): " + warningMessage);
	                            }
	                            responseMessage = {
	                                warning: warningMessage
	                            };
	                        }
	                        _this.sendResponse(sendingWindow, responseMessage, trackingProperties);
	                    });
	                    return true;
	                }
	            });
	            /**
	             * TODO: Consider returning an error message if nothing handled the message.
	             * In the case of the Report receiving messages all of them should be handled,
	             * however, in the case of the SDK receiving messages it's likely it won't register handlers
	             * for all events. Perhaps make this an option at construction time.
	             */
	            if (!handled && !this.suppressWarnings) {
	                console.warn("Proxy(" + this.name + ") did not handle message. Handlers: " + this.handlers.length + "  Message: " + JSON.stringify(message, null, '') + ".");
	            }
	        }
	        else {
	            /**
	             * If error message reject promise,
	             * Otherwise, resolve promise
	             */
	            var isErrorMessage = true;
	            try {
	                isErrorMessage = this.isErrorMessage(message);
	            }
	            catch (e) {
	                console.warn("Proxy(" + this.name + ") Error occurred when trying to determine if message is consider an error response. Message: ", JSON.stringify(message, null, ''), 'Error: ', e);
	            }
	            if (isErrorMessage) {
	                deferred.reject(message);
	            }
	            else {
	                deferred.resolve(message);
	            }
	            // TODO: Move to .finally clause up where promise is created for better maitenance like original proxy code.
	            delete this.pendingRequestPromises[trackingProperties.id];
	        }
	    };
	    WindowPostMessageProxy.messagePropertyName = "windowPostMessageProxy";
	    return WindowPostMessageProxy;
	}());
	exports.WindowPostMessageProxy = WindowPostMessageProxy;


/***/ })
/******/ ])
});
;
//# sourceMappingURL=windowPostMessageProxy.js.map

/***/ }),

/***/ "./src/bookmarksManager.ts":
/*!*********************************!*\
  !*** ./src/bookmarksManager.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarksManager = void 0;
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
var errors_1 = __webpack_require__(/*! ./errors */ "./src/errors.ts");
/**
 * Manages report bookmarks.
 *
 * @export
 * @class BookmarksManager
 * @implements {IBookmarksManager}
 */
var BookmarksManager = /** @class */ (function () {
    /**
     * @hidden
     */
    function BookmarksManager(service, config, iframe) {
        this.service = service;
        this.config = config;
        this.iframe = iframe;
    }
    /**
     * Gets bookmarks that are defined in the report.
     *
     * ```javascript
     * // Gets bookmarks that are defined in the report
     * bookmarksManager.getBookmarks()
     *   .then(bookmarks => {
     *     ...
     *   });
     * ```
     *
     * @returns {Promise<IReportBookmark[]>}
     */
    BookmarksManager.prototype.getBookmarks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.get("/report/bookmarks", { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Apply bookmark by name.
     *
     * ```javascript
     * bookmarksManager.apply(bookmarkName)
     * ```
     *
     * @param {string} bookmarkName The name of the bookmark to be applied
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    BookmarksManager.prototype.apply = function (bookmarkName) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        request = {
                            name: bookmarkName
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/bookmarks/applyByName", request, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_2 = _a.sent();
                        throw response_2.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Play bookmarks: Enter or Exit bookmarks presentation mode.
     *
     * ```javascript
     * // Enter presentation mode.
     * bookmarksManager.play(BookmarksPlayMode.Presentation)
     * ```
     *
     * @param {BookmarksPlayMode} playMode Play mode can be either `Presentation` or `Off`
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    BookmarksManager.prototype.play = function (playMode) {
        return __awaiter(this, void 0, void 0, function () {
            var playBookmarkRequest, response_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        playBookmarkRequest = {
                            playMode: playMode
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/bookmarks/play", playBookmarkRequest, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_3 = _a.sent();
                        throw response_3.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Capture bookmark from current state.
     *
     * ```javascript
     * bookmarksManager.capture(options)
     * ```
     *
     * @param {ICaptureBookmarkOptions} [options] Options for bookmark capturing
     * @returns {Promise<IReportBookmark>}
     */
    BookmarksManager.prototype.capture = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, response_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        request = {
                            options: options || {}
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/bookmarks/capture", request, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_4 = _a.sent();
                        throw response_4.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Apply bookmark state.
     *
     * ```javascript
     * bookmarksManager.applyState(bookmarkState)
     * ```
     *
     * @param {string} state A base64 bookmark state to be applied
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    BookmarksManager.prototype.applyState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        request = {
                            state: state
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/bookmarks/applyState", request, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_5 = _a.sent();
                        throw response_5.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BookmarksManager;
}());
exports.BookmarksManager = BookmarksManager;


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */ /** */
var config = {
    version: '2.18.0',
    type: 'js'
};
exports.default = config;


/***/ }),

/***/ "./src/create.ts":
/*!***********************!*\
  !*** ./src/create.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
var utils = __webpack_require__(/*! ./util */ "./src/util.ts");
/**
 * A Power BI Report creator component
 *
 * @export
 * @class Create
 * @extends {Embed}
 */
var Create = /** @class */ (function (_super) {
    __extends(Create, _super);
    /*
     * @hidden
     */
    function Create(service, element, config, phasedRender, isBootstrap) {
        return _super.call(this, service, element, config, /* iframe */ undefined, phasedRender, isBootstrap) || this;
    }
    /**
     * Gets the dataset ID from the first available location: createConfig or embed url.
     *
     * @returns {string}
     */
    Create.prototype.getId = function () {
        var datasetId = (this.createConfig && this.createConfig.datasetId) ? this.createConfig.datasetId : Create.findIdFromEmbedUrl(this.config.embedUrl);
        if (typeof datasetId !== 'string' || datasetId.length === 0) {
            throw new Error('Dataset id is required, but it was not found. You must provide an id either as part of embed configuration.');
        }
        return datasetId;
    };
    /**
     * Validate create report configuration.
     */
    Create.prototype.validate = function (config) {
        return powerbi_models_1.validateCreateReport(config);
    };
    /**
     * Handle config changes.
     *
     * @hidden
     * @returns {void}
     */
    Create.prototype.configChanged = function (isBootstrap) {
        if (isBootstrap) {
            return;
        }
        var config = this.config;
        this.createConfig = {
            accessToken: config.accessToken,
            datasetId: config.datasetId || this.getId(),
            groupId: config.groupId,
            settings: config.settings,
            tokenType: config.tokenType,
            theme: config.theme
        };
    };
    /**
     * @hidden
     * @returns {string}
     */
    Create.prototype.getDefaultEmbedUrlEndpoint = function () {
        return "reportEmbed";
    };
    /**
     * checks if the report is saved.
     *
     * ```javascript
     * report.isSaved()
     * ```
     *
     * @returns {Promise<boolean>}
     */
    Create.prototype.isSaved = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils.isSavedInternal(this.service.hpm, this.config.uniqueId, this.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adds the ability to get datasetId from url.
     * (e.g. http://embedded.powerbi.com/appTokenReportEmbed?datasetId=854846ed-2106-4dc2-bc58-eb77533bf2f1).
     *
     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the create configuration.
     *
     * @static
     * @param {string} url
     * @returns {string}
     * @hidden
     */
    Create.findIdFromEmbedUrl = function (url) {
        var datasetIdRegEx = /datasetId="?([^&]+)"?/;
        var datasetIdMatch = url.match(datasetIdRegEx);
        var datasetId;
        if (datasetIdMatch) {
            datasetId = datasetIdMatch[1];
        }
        return datasetId;
    };
    return Create;
}(embed_1.Embed));
exports.Create = Create;


/***/ }),

/***/ "./src/dashboard.ts":
/*!**************************!*\
  !*** ./src/dashboard.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
/**
 * A Power BI Dashboard embed component
 *
 * @export
 * @class Dashboard
 * @extends {Embed}
 * @implements {IDashboardNode}
 */
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    /**
     * Creates an instance of a Power BI Dashboard.
     *
     * @param {service.Service} service
     * @hidden
     * @param {HTMLElement} element
     */
    function Dashboard(service, element, config, phasedRender, isBootstrap) {
        var _this = _super.call(this, service, element, config, /* iframe */ undefined, phasedRender, isBootstrap) || this;
        _this.loadPath = "/dashboard/load";
        _this.phasedLoadPath = "/dashboard/prepare";
        Array.prototype.push.apply(_this.allowedEvents, Dashboard.allowedEvents);
        return _this;
    }
    /**
     * This adds backwards compatibility for older config which used the dashboardId query param to specify dashboard id.
     * E.g. https://powerbi-df.analysis-df.windows.net/dashboardEmbedHost?dashboardId=e9363c62-edb6-4eac-92d3-2199c5ca2a9e
     *
     * By extracting the id we can ensure id is always explicitly provided as part of the load configuration.
     *
     * @hidden
     * @static
     * @param {string} url
     * @returns {string}
     */
    Dashboard.findIdFromEmbedUrl = function (url) {
        var dashboardIdRegEx = /dashboardId="?([^&]+)"?/;
        var dashboardIdMatch = url.match(dashboardIdRegEx);
        var dashboardId;
        if (dashboardIdMatch) {
            dashboardId = dashboardIdMatch[1];
        }
        return dashboardId;
    };
    /**
     * Get dashboard id from first available location: options, attribute, embed url.
     *
     * @returns {string}
     */
    Dashboard.prototype.getId = function () {
        var config = this.config;
        var dashboardId = config.id || this.element.getAttribute(Dashboard.dashboardIdAttribute) || Dashboard.findIdFromEmbedUrl(config.embedUrl);
        if (typeof dashboardId !== 'string' || dashboardId.length === 0) {
            throw new Error("Dashboard id is required, but it was not found. You must provide an id either as part of embed configuration or as attribute '" + Dashboard.dashboardIdAttribute + "'.");
        }
        return dashboardId;
    };
    /**
     * Validate load configuration.
     *
     * @hidden
     */
    Dashboard.prototype.validate = function (baseConfig) {
        var config = baseConfig;
        var error = powerbi_models_1.validateDashboardLoad(config);
        return error ? error : this.validatePageView(config.pageView);
    };
    /**
     * Handle config changes.
     *
     * @hidden
     * @returns {void}
     */
    Dashboard.prototype.configChanged = function (isBootstrap) {
        if (isBootstrap) {
            return;
        }
        // Populate dashboard id into config object.
        this.config.id = this.getId();
    };
    /**
     * @hidden
     * @returns {string}
     */
    Dashboard.prototype.getDefaultEmbedUrlEndpoint = function () {
        return "dashboardEmbed";
    };
    /**
     * Validate that pageView has a legal value: if page view is defined it must have one of the values defined in PageView
     *
     * @hidden
     */
    Dashboard.prototype.validatePageView = function (pageView) {
        if (pageView && pageView !== "fitToWidth" && pageView !== "oneColumn" && pageView !== "actualSize") {
            return [{ message: "pageView must be one of the followings: fitToWidth, oneColumn, actualSize" }];
        }
    };
    /** @hidden */
    Dashboard.allowedEvents = ["tileClicked", "error"];
    /** @hidden */
    Dashboard.dashboardIdAttribute = 'powerbi-dashboard-id';
    /** @hidden */
    Dashboard.typeAttribute = 'powerbi-type';
    /** @hidden */
    Dashboard.type = "Dashboard";
    return Dashboard;
}(embed_1.Embed));
exports.Dashboard = Dashboard;


/***/ }),

/***/ "./src/embed.ts":
/*!**********************!*\
  !*** ./src/embed.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
var models = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
var sdkConfig = __webpack_require__(/*! ./config */ "./src/config.ts");
var errors_1 = __webpack_require__(/*! ./errors */ "./src/errors.ts");
/**
 * Base class for all Power BI embed components
 *
 * @export
 * @abstract
 * @hidden
 * @class Embed
 */
var Embed = /** @class */ (function () {
    /**
     * Creates an instance of Embed.
     *
     * Note: there is circular reference between embeds and the service, because
     * the service has a list of all embeds on the host page, and each embed has a reference to the service that created it.
     *
     * @param {service.Service} service
     * @param {HTMLElement} element
     * @param {IEmbedConfigurationBase} config
     * @hidden
     */
    function Embed(service, element, config, iframe, phasedRender, isBootstrap) {
        /** @hidden */
        this.allowedEvents = [];
        if (util_1.autoAuthInEmbedUrl(config.embedUrl)) {
            throw new Error(errors_1.EmbedUrlNotSupported);
        }
        Array.prototype.push.apply(this.allowedEvents, Embed.allowedEvents);
        this.eventHandlers = [];
        this.service = service;
        this.element = element;
        this.iframe = iframe;
        this.iframeLoaded = false;
        this.embedtype = config.type.toLowerCase();
        this.populateConfig(config, isBootstrap);
        if (this.embedtype === 'create') {
            this.setIframe(false /* set EventListener to call create() on 'load' event*/, phasedRender, isBootstrap);
        }
        else {
            this.setIframe(true /* set EventListener to call load() on 'load' event*/, phasedRender, isBootstrap);
        }
    }
    /**
     * Sends createReport configuration data.
     *
     * ```javascript
     * createReport({
     *   datasetId: '5dac7a4a-4452-46b3-99f6-a25915e0fe55',
     *   accessToken: 'eyJ0eXA ... TaE2rTSbmg',
     * ```
     *
     * @hidden
     * @param {models.IReportCreateConfiguration} config
     * @returns {Promise<void>}
     */
    Embed.prototype.createReport = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = models.validateCreateReport(config);
                        if (errors) {
                            throw errors;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/create", config, { uid: this.config.uniqueId, sdkSessionId: this.service.getSdkSessionId() }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Saves Report.
     *
     * @returns {Promise<void>}
     */
    Embed.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.post('/report/save', null, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_2 = _a.sent();
                        throw response_2.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * SaveAs Report.
     *
     * @returns {Promise<void>}
     */
    Embed.prototype.saveAs = function (saveAsParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.post('/report/saveAs', saveAsParameters, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_3 = _a.sent();
                        throw response_3.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the correlationId for the current embed session.
     *
     * ```javascript
     * // Get the correlationId for the current embed session
     * report.getCorrelationId()
     *   .then(correlationId => {
     *     ...
     *   });
     * ```
     *
     * @returns {Promise<string>}
     */
    Embed.prototype.getCorrelationId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.get("/getCorrelationId", { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_4 = _a.sent();
                        throw response_4.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sends load configuration data.
     *
     * ```javascript
     * report.load({
     *   type: 'report',
     *   id: '5dac7a4a-4452-46b3-99f6-a25915e0fe55',
     *   accessToken: 'eyJ0eXA ... TaE2rTSbmg',
     *   settings: {
     *     navContentPaneEnabled: false
     *   },
     *   pageName: "DefaultPage",
     *   filters: [
     *     {
     *        ...  DefaultReportFilter ...
     *     }
     *   ]
     * })
     *   .catch(error => { ... });
     * ```
     *
     * @hidden
     * @param {models.ILoadConfiguration} config
     * @param {boolean} phasedRender
     * @returns {Promise<void>}
     */
    Embed.prototype.load = function (phasedRender) {
        return __awaiter(this, void 0, void 0, function () {
            var path, headers, timeNow, response, response_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.accessToken) {
                            console.debug("Power BI SDK iframe is loaded but powerbi.embed is not called yet.");
                            return [2 /*return*/];
                        }
                        if (!this.iframeLoaded) {
                            console.debug("Power BI SDK is trying to post /report/load before iframe is ready.");
                            return [2 /*return*/];
                        }
                        path = phasedRender && this.config.type === 'report' ? this.phasedLoadPath : this.loadPath;
                        headers = {
                            uid: this.config.uniqueId,
                            sdkSessionId: this.service.getSdkSessionId(),
                            bootstrapped: this.config.bootstrapped,
                            sdkVersion: sdkConfig.default.version
                        };
                        timeNow = new Date();
                        if (this.lastLoadRequest && util_1.getTimeDiffInMilliseconds(this.lastLoadRequest, timeNow) < 100) {
                            console.debug("Power BI SDK sent more than two /report/load requests in the last 100ms interval.");
                            return [2 /*return*/];
                        }
                        this.lastLoadRequest = timeNow;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post(path, this.config, headers, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_5 = _a.sent();
                        throw response_5.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes one or more event handlers from the list of handlers.
     * If a reference to the existing handle function is specified, remove the specific handler.
     * If the handler is not specified, remove all handlers for the event name specified.
     *
     * ```javascript
     * report.off('pageChanged')
     *
     * or
     *
     * const logHandler = function (event) {
     *    console.log(event);
     * };
     *
     * report.off('pageChanged', logHandler);
     * ```
     *
     * @template T
     * @param {string} eventName
     * @param {IEventHandler<T>} [handler]
     */
    Embed.prototype.off = function (eventName, handler) {
        var _this = this;
        var fakeEvent = { name: eventName, type: null, id: null, value: null };
        if (handler) {
            util_1.remove(function (eventHandler) { return eventHandler.test(fakeEvent) && (eventHandler.handle === handler); }, this.eventHandlers);
            this.element.removeEventListener(eventName, handler);
        }
        else {
            var eventHandlersToRemove = this.eventHandlers
                .filter(function (eventHandler) { return eventHandler.test(fakeEvent); });
            eventHandlersToRemove
                .forEach(function (eventHandlerToRemove) {
                util_1.remove(function (eventHandler) { return eventHandler === eventHandlerToRemove; }, _this.eventHandlers);
                _this.element.removeEventListener(eventName, eventHandlerToRemove.handle);
            });
        }
    };
    /**
     * Adds an event handler for a specific event.
     *
     * ```javascript
     * report.on('pageChanged', (event) => {
     *   console.log('PageChanged: ', event.page.name);
     * });
     * ```
     *
     * @template T
     * @param {string} eventName
     * @param {service.IEventHandler<T>} handler
     */
    Embed.prototype.on = function (eventName, handler) {
        if (this.allowedEvents.indexOf(eventName) === -1) {
            throw new Error("eventName must be one of " + this.allowedEvents + ". You passed: " + eventName);
        }
        this.eventHandlers.push({
            test: function (event) { return event.name === eventName; },
            handle: handler
        });
        this.element.addEventListener(eventName, handler);
    };
    /**
     * Reloads embed using existing configuration.
     * E.g. For reports this effectively clears all filters and makes the first page active which simulates resetting a report back to loaded state.
     *
     * ```javascript
     * report.reload();
     * ```
     */
    Embed.prototype.reload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Set accessToken.
     *
     * @returns {Promise<void>}
     */
    Embed.prototype.setAccessToken = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var embedType, response, response_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        embedType = this.config.type;
                        embedType = (embedType === 'create' || embedType === 'visual' || embedType === 'qna') ? 'report' : embedType;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post('/' + embedType + '/token', accessToken, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        this.config.accessToken = accessToken;
                        this.element.setAttribute(Embed.accessTokenAttribute, accessToken);
                        this.service.accessToken = accessToken;
                        return [2 /*return*/, response.body];
                    case 3:
                        response_6 = _a.sent();
                        throw response_6.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets an access token from the first available location: config, attribute, global.
     *
     * @private
     * @param {string} globalAccessToken
     * @returns {string}
     * @hidden
     */
    Embed.prototype.getAccessToken = function (globalAccessToken) {
        var accessToken = this.config.accessToken || this.element.getAttribute(Embed.accessTokenAttribute) || globalAccessToken;
        if (!accessToken) {
            throw new Error("No access token was found for element. You must specify an access token directly on the element using attribute '" + Embed.accessTokenAttribute + "' or specify a global token at: powerbi.accessToken.");
        }
        return accessToken;
    };
    /**
     * Populate config for create and load
     *
     * @hidden
     * @param {IEmbedConfiguration}
     * @returns {void}
     */
    Embed.prototype.populateConfig = function (config, isBootstrap) {
        if (this.bootstrapConfig) {
            this.config = util_1.assign({}, this.bootstrapConfig, config);
            // reset bootstrapConfig because we do not want to merge it in re-embed scenario.
            this.bootstrapConfig = null;
        }
        else {
            // Copy config - important for multiple iframe scenario.
            // Otherwise, if a user uses the same config twice, same unique Id which will be used in different iframes.
            this.config = util_1.assign({}, config);
        }
        this.config.embedUrl = this.getEmbedUrl(isBootstrap);
        this.config.groupId = this.getGroupId();
        this.addLocaleToEmbedUrl(config);
        this.config.uniqueId = this.getUniqueId();
        if (isBootstrap) {
            // save current config in bootstrapConfig to be able to merge it on next call to powerbi.embed
            this.bootstrapConfig = this.config;
            this.bootstrapConfig.bootstrapped = true;
        }
        else {
            this.config.accessToken = this.getAccessToken(this.service.accessToken);
        }
        this.configChanged(isBootstrap);
    };
    /**
     * Adds locale parameters to embedUrl
     *
     * @private
     * @param {IEmbedConfiguration | models.ICommonEmbedConfiguration} config
     * @hidden
     */
    Embed.prototype.addLocaleToEmbedUrl = function (config) {
        if (!config.settings) {
            return;
        }
        var localeSettings = config.settings.localeSettings;
        if (localeSettings && localeSettings.language) {
            this.config.embedUrl = util_1.addParamToUrl(this.config.embedUrl, 'language', localeSettings.language);
        }
        if (localeSettings && localeSettings.formatLocale) {
            this.config.embedUrl = util_1.addParamToUrl(this.config.embedUrl, 'formatLocale', localeSettings.formatLocale);
        }
    };
    /**
     * Gets an embed url from the first available location: options, attribute.
     *
     * @private
     * @returns {string}
     * @hidden
     */
    Embed.prototype.getEmbedUrl = function (isBootstrap) {
        var embedUrl = this.config.embedUrl || this.element.getAttribute(Embed.embedUrlAttribute);
        if (isBootstrap && !embedUrl) {
            // Prepare flow, embed url was not provided, use hostname to build embed url.
            embedUrl = this.getDefaultEmbedUrl(this.config.hostname);
        }
        if (typeof embedUrl !== 'string' || embedUrl.length === 0) {
            throw new Error("Embed Url is required, but it was not found. You must provide an embed url either as part of embed configuration or as attribute '" + Embed.embedUrlAttribute + "'.");
        }
        return embedUrl;
    };
    /**
     * @hidden
     */
    Embed.prototype.getDefaultEmbedUrl = function (hostname) {
        if (!hostname) {
            hostname = Embed.defaultEmbedHostName;
        }
        var endpoint = this.getDefaultEmbedUrlEndpoint();
        // Trim spaces to fix user mistakes.
        hostname = hostname.toLowerCase().trim();
        if (hostname.indexOf("http://") === 0) {
            throw new Error("HTTP is not allowed. HTTPS is required");
        }
        if (hostname.indexOf("https://") === 0) {
            return hostname + "/" + endpoint;
        }
        return "https://" + hostname + "/" + endpoint;
    };
    /**
     * Gets a unique ID from the first available location: options, attribute.
     * If neither is provided generate a unique string.
     *
     * @private
     * @returns {string}
     * @hidden
     */
    Embed.prototype.getUniqueId = function () {
        return this.config.uniqueId || this.element.getAttribute(Embed.nameAttribute) || util_1.createRandomString();
    };
    /**
     * Gets the group ID from the first available location: options, embeddedUrl.
     *
     * @private
     * @returns {string}
     * @hidden
     */
    Embed.prototype.getGroupId = function () {
        return this.config.groupId || Embed.findGroupIdFromEmbedUrl(this.config.embedUrl);
    };
    /**
     * Requests the browser to render the component's iframe in fullscreen mode.
     */
    Embed.prototype.fullscreen = function () {
        var requestFullScreen = this.iframe.requestFullscreen || this.iframe.msRequestFullscreen || this.iframe.mozRequestFullScreen || this.iframe.webkitRequestFullscreen;
        requestFullScreen.call(this.iframe);
    };
    /**
     * Requests the browser to exit fullscreen mode.
     */
    Embed.prototype.exitFullscreen = function () {
        if (!this.isFullscreen(this.iframe)) {
            return;
        }
        var exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exitFullscreen.call(document);
    };
    /**
     * Returns true if the iframe is rendered in fullscreen mode,
     * otherwise returns false.
     *
     * @private
     * @param {HTMLIFrameElement} iframe
     * @returns {boolean}
     * @hidden
     */
    Embed.prototype.isFullscreen = function (iframe) {
        var options = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullscreenScreenElement', 'msFullscreenElement'];
        return options.some(function (option) { return document[option] === iframe; });
    };
    /**
     * Sets Iframe for embed
     *
     * @hidden
     */
    Embed.prototype.setIframe = function (isLoad, phasedRender, isBootstrap) {
        var _this = this;
        if (!this.iframe) {
            var iframeContent = document.createElement("iframe");
            var embedUrl = this.config.uniqueId ? util_1.addParamToUrl(this.config.embedUrl, 'uid', this.config.uniqueId) : this.config.embedUrl;
            iframeContent.style.width = '100%';
            iframeContent.style.height = '100%';
            iframeContent.setAttribute("src", embedUrl);
            iframeContent.setAttribute("scrolling", "no");
            iframeContent.setAttribute("allowfullscreen", "true");
            var node = this.element;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            node.appendChild(iframeContent);
            this.iframe = node.firstChild;
        }
        if (isLoad) {
            if (!isBootstrap) {
                // Validate config if it's not a bootstrap case.
                var errors = this.validate(this.config);
                if (errors) {
                    throw errors;
                }
            }
            this.iframe.addEventListener('load', function () {
                _this.iframeLoaded = true;
                _this.load(phasedRender);
            }, false);
            if (this.service.getNumberOfComponents() <= Embed.maxFrontLoadTimes) {
                this.frontLoadHandler = function () {
                    _this.frontLoadSendConfig(_this.config);
                };
                // 'ready' event is fired by the embedded element (not by the iframe)
                this.element.addEventListener('ready', this.frontLoadHandler, false);
            }
        }
        else {
            this.iframe.addEventListener('load', function () { return _this.createReport(_this.createConfig); }, false);
        }
    };
    /**
     * Set the component title for accessibility. In case of iframes, this method will change the iframe title.
     */
    Embed.prototype.setComponentTitle = function (title) {
        if (!this.iframe) {
            return;
        }
        if (title == null) {
            this.iframe.removeAttribute("title");
        }
        else {
            this.iframe.setAttribute("title", title);
        }
    };
    /**
     * Sets element's tabindex attribute
     */
    Embed.prototype.setComponentTabIndex = function (tabIndex) {
        if (!this.element) {
            return;
        }
        this.element.setAttribute("tabindex", (tabIndex == null) ? "0" : tabIndex.toString());
    };
    /**
     * Removes element's tabindex attribute
     */
    Embed.prototype.removeComponentTabIndex = function (_tabIndex) {
        if (!this.element) {
            return;
        }
        this.element.removeAttribute("tabindex");
    };
    /**
     * Adds the ability to get groupId from url.
     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the load configuration.
     *
     * @hidden
     * @static
     * @param {string} url
     * @returns {string}
     */
    Embed.findGroupIdFromEmbedUrl = function (url) {
        var groupIdRegEx = /groupId="?([^&]+)"?/;
        var groupIdMatch = url.match(groupIdRegEx);
        var groupId;
        if (groupIdMatch) {
            groupId = groupIdMatch[1];
        }
        return groupId;
    };
    /**
     * Sends the config for front load calls, after 'ready' message is received from the iframe
     *
     * @hidden
     */
    Embed.prototype.frontLoadSendConfig = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, response, response_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!config.accessToken) {
                            return [2 /*return*/];
                        }
                        errors = this.validate(config);
                        if (errors) {
                            throw errors;
                        }
                        // contentWindow must be initialized
                        if (this.iframe.contentWindow == null) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/frontload/config", config, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_7 = _a.sent();
                        throw response_7.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** @hidden */
    Embed.allowedEvents = ["loaded", "saved", "rendered", "saveAsTriggered", "error", "dataSelected", "buttonClicked"];
    /** @hidden */
    Embed.accessTokenAttribute = 'powerbi-access-token';
    /** @hidden */
    Embed.embedUrlAttribute = 'powerbi-embed-url';
    /** @hidden */
    Embed.nameAttribute = 'powerbi-name';
    /** @hidden */
    Embed.typeAttribute = 'powerbi-type';
    /** @hidden */
    Embed.defaultEmbedHostName = "https://app.powerbi.com";
    /** @hidden */
    Embed.maxFrontLoadTimes = 2;
    return Embed;
}());
exports.Embed = Embed;


/***/ }),

/***/ "./src/errors.ts":
/*!***********************!*\
  !*** ./src/errors.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedUrlNotSupported = exports.APINotSupportedForRDLError = void 0;
exports.APINotSupportedForRDLError = "This API is currently not supported for RDL reports";
exports.EmbedUrlNotSupported = "Embed URL is invalid for this scenario. Please use Power BI REST APIs to get the valid URL";


/***/ }),

/***/ "./src/factories.ts":
/*!**************************!*\
  !*** ./src/factories.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerFactory = exports.wpmpFactory = exports.hpmFactory = void 0;
/**
 * TODO: Need to find better place for these factory functions or refactor how we handle dependency injection
 */
var window_post_message_proxy_1 = __webpack_require__(/*! window-post-message-proxy */ "./node_modules/window-post-message-proxy/dist/windowPostMessageProxy.js");
var http_post_message_1 = __webpack_require__(/*! http-post-message */ "./node_modules/http-post-message/dist/httpPostMessage.js");
var powerbi_router_1 = __webpack_require__(/*! powerbi-router */ "./node_modules/powerbi-router/dist/router.js");
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var hpmFactory = function (wpmp, defaultTargetWindow, sdkVersion, sdkType) {
    if (sdkVersion === void 0) { sdkVersion = config_1.default.version; }
    if (sdkType === void 0) { sdkType = config_1.default.type; }
    return new http_post_message_1.HttpPostMessage(wpmp, {
        'x-sdk-type': sdkType,
        'x-sdk-version': sdkVersion
    }, defaultTargetWindow);
};
exports.hpmFactory = hpmFactory;
var wpmpFactory = function (name, logMessages, eventSourceOverrideWindow) {
    return new window_post_message_proxy_1.WindowPostMessageProxy({
        processTrackingProperties: {
            addTrackingProperties: http_post_message_1.HttpPostMessage.addTrackingProperties,
            getTrackingProperties: http_post_message_1.HttpPostMessage.getTrackingProperties,
        },
        isErrorMessage: http_post_message_1.HttpPostMessage.isErrorMessage,
        suppressWarnings: true,
        name: name,
        logMessages: logMessages,
        eventSourceOverrideWindow: eventSourceOverrideWindow
    });
};
exports.wpmpFactory = wpmpFactory;
var routerFactory = function (wpmp) {
    return new powerbi_router_1.Router(wpmp);
};
exports.routerFactory = routerFactory;


/***/ }),

/***/ "./src/page.ts":
/*!*********************!*\
  !*** ./src/page.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var visualDescriptor_1 = __webpack_require__(/*! ./visualDescriptor */ "./src/visualDescriptor.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
var errors_1 = __webpack_require__(/*! ./errors */ "./src/errors.ts");
/**
 * A Power BI report page
 *
 * @export
 * @class Page
 * @implements {IPageNode}
 * @implements {IFilterable}
 */
var Page = /** @class */ (function () {
    /**
     * Creates an instance of a Power BI report page.
     *
     * @param {IReportNode} report
     * @param {string} name
     * @param {string} [displayName]
     * @param {boolean} [isActivePage]
     * @param {SectionVisibility} [visibility]
     * @hidden
     */
    function Page(report, name, displayName, isActivePage, visibility, defaultSize, defaultDisplayOption) {
        this.report = report;
        this.name = name;
        this.displayName = displayName;
        this.isActive = isActivePage;
        this.visibility = visibility;
        this.defaultSize = defaultSize;
        this.defaultDisplayOption = defaultDisplayOption;
    }
    /**
     * Gets all page level filters within the report.
     *
     * ```javascript
     * page.getFilters()
     *  .then(filters => { ... });
     * ```
     *
     * @returns {(Promise<IFilter[]>)}
     */
    Page.prototype.getFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.report.service.hpm.get("/report/pages/" + this.name + "/filters", { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update the filters for the current page according to the operation: Add, replace all, replace by target or remove.
     *
     * ```javascript
     * page.updateFilters(FiltersOperations.Add, filters)
     *   .catch(errors => { ... });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Page.prototype.updateFilters = function (operation, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var updateFiltersRequest, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateFiltersRequest = {
                            filtersOperation: operation,
                            filters: filters
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.report.service.hpm.post("/report/pages/" + this.name + "/filters", updateFiltersRequest, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_2 = _a.sent();
                        throw response_2.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes all filters from this page of the report.
     *
     * ```javascript
     * page.removeFilters();
     * ```
     *
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Page.prototype.removeFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateFilters(powerbi_models_1.FiltersOperations.RemoveAll)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sets all filters on the current page.
     *
     * ```javascript
     * page.setFilters(filters)
     *   .catch(errors => { ... });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Page.prototype.setFilters = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var response_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.report.service.hpm.put("/report/pages/" + this.name + "/filters", filters, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        response_3 = _a.sent();
                        throw response_3.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete the page from the report
     *
     * ```javascript
     * // Delete the page from the report
     * page.delete();
     * ```
     *
     * @returns {Promise<void>}
     */
    Page.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.report.service.hpm.delete("/report/pages/" + this.name, {}, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_4 = _a.sent();
                        throw response_4.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Makes the current page the active page of the report.
     *
     * ```javascript
     * page.setActive();
     * ```
     *
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Page.prototype.setActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, response_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = {
                            name: this.name,
                            displayName: null,
                            isActive: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.report.service.hpm.put('/report/pages/active', page, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_5 = _a.sent();
                        throw response_5.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set displayName to the current page.
     *
     * ```javascript
     * page.setName(displayName);
     * ```
     *
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Page.prototype.setDisplayName = function (displayName) {
        return __awaiter(this, void 0, void 0, function () {
            var page, response_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = {
                            name: this.name,
                            displayName: displayName,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.report.service.hpm.put("/report/pages/" + this.name + "/name", page, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_6 = _a.sent();
                        throw response_6.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets all the visuals on the page.
     *
     * ```javascript
     * page.getVisuals()
     *   .then(visuals => { ... });
     * ```
     *
     * @returns {Promise<VisualDescriptor[]>}
     */
    Page.prototype.getVisuals = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.report.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.report.service.hpm.get("/report/pages/" + this.name + "/visuals", { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body
                                .map(function (visual) { return new visualDescriptor_1.VisualDescriptor(_this, visual.name, visual.title, visual.type, visual.layout); })];
                    case 3:
                        response_7 = _a.sent();
                        throw response_7.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if page has layout.
     *
     * ```javascript
     * page.hasLayout(layoutType)
     *  .then(hasLayout: boolean => { ... });
     * ```
     *
     * @returns {(Promise<boolean>)}
     */
    Page.prototype.hasLayout = function (layoutType) {
        return __awaiter(this, void 0, void 0, function () {
            var layoutTypeEnum, response, response_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.report.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        layoutTypeEnum = powerbi_models_1.LayoutType[layoutType];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.report.service.hpm.get("/report/pages/" + this.name + "/layoutTypes/" + layoutTypeEnum, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_8 = _a.sent();
                        throw response_8.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Page;
}());
exports.Page = Page;


/***/ }),

/***/ "./src/powerbi-client.ts":
/*!*******************************!*\
  !*** ./src/powerbi-client.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualDescriptor = exports.Visual = exports.Qna = exports.Page = exports.Embed = exports.Tile = exports.Dashboard = exports.Report = exports.models = exports.factories = exports.service = void 0;
/**
 * @hidden
 */
var models = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
exports.models = models;
var service = __webpack_require__(/*! ./service */ "./src/service.ts");
exports.service = service;
var factories = __webpack_require__(/*! ./factories */ "./src/factories.ts");
exports.factories = factories;
var report_1 = __webpack_require__(/*! ./report */ "./src/report.ts");
Object.defineProperty(exports, "Report", { enumerable: true, get: function () { return report_1.Report; } });
var dashboard_1 = __webpack_require__(/*! ./dashboard */ "./src/dashboard.ts");
Object.defineProperty(exports, "Dashboard", { enumerable: true, get: function () { return dashboard_1.Dashboard; } });
var tile_1 = __webpack_require__(/*! ./tile */ "./src/tile.ts");
Object.defineProperty(exports, "Tile", { enumerable: true, get: function () { return tile_1.Tile; } });
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
Object.defineProperty(exports, "Embed", { enumerable: true, get: function () { return embed_1.Embed; } });
var page_1 = __webpack_require__(/*! ./page */ "./src/page.ts");
Object.defineProperty(exports, "Page", { enumerable: true, get: function () { return page_1.Page; } });
var qna_1 = __webpack_require__(/*! ./qna */ "./src/qna.ts");
Object.defineProperty(exports, "Qna", { enumerable: true, get: function () { return qna_1.Qna; } });
var visual_1 = __webpack_require__(/*! ./visual */ "./src/visual.ts");
Object.defineProperty(exports, "Visual", { enumerable: true, get: function () { return visual_1.Visual; } });
var visualDescriptor_1 = __webpack_require__(/*! ./visualDescriptor */ "./src/visualDescriptor.ts");
Object.defineProperty(exports, "VisualDescriptor", { enumerable: true, get: function () { return visualDescriptor_1.VisualDescriptor; } });
/**
 * Makes Power BI available to the global object for use in applications that don't have module loading support.
 *
 * Note: create an instance of the class with the default configuration for normal usage, or save the class so that you can create an instance of the service.
 */
var powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
window.powerbi = powerbi;


/***/ }),

/***/ "./src/qna.ts":
/*!********************!*\
  !*** ./src/qna.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Qna = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
/**
 * The Power BI Q&A embed component
 *
 * @export
 * @class Qna
 * @extends {Embed}
 */
var Qna = /** @class */ (function (_super) {
    __extends(Qna, _super);
    /**
     * @hidden
     */
    function Qna(service, element, config, phasedRender, isBootstrap) {
        var _this = _super.call(this, service, element, config, /* iframe */ undefined, phasedRender, isBootstrap) || this;
        _this.loadPath = "/qna/load";
        _this.phasedLoadPath = "/qna/prepare";
        Array.prototype.push.apply(_this.allowedEvents, Qna.allowedEvents);
        return _this;
    }
    /**
     * The ID of the Q&A embed component
     *
     * @returns {string}
     */
    Qna.prototype.getId = function () {
        return null;
    };
    /**
     * Change the question of the Q&A embed component
     *
     * @param {string} question - question which will render Q&A data
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Qna.prototype.setQuestion = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var qnaData, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qnaData = {
                            question: question
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post('/qna/interpret', qnaData, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handle config changes.
     *
     * @returns {void}
     */
    Qna.prototype.configChanged = function (_isBootstrap) {
        // Nothing to do in Q&A embed.
    };
    /**
     * @hidden
     * @returns {string}
     */
    Qna.prototype.getDefaultEmbedUrlEndpoint = function () {
        return "qnaEmbed";
    };
    /**
     * Validate load configuration.
     */
    Qna.prototype.validate = function (config) {
        return powerbi_models_1.validateLoadQnaConfiguration(config);
    };
    /** @hidden */
    Qna.type = "Qna";
    /** @hidden */
    Qna.allowedEvents = ["loaded", "visualRendered"];
    return Qna;
}(embed_1.Embed));
exports.Qna = Qna;


/***/ }),

/***/ "./src/report.ts":
/*!***********************!*\
  !*** ./src/report.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
var errors_1 = __webpack_require__(/*! ./errors */ "./src/errors.ts");
var page_1 = __webpack_require__(/*! ./page */ "./src/page.ts");
var bookmarksManager_1 = __webpack_require__(/*! ./bookmarksManager */ "./src/bookmarksManager.ts");
/**
 * The Power BI Report embed component
 *
 * @export
 * @class Report
 * @extends {Embed}
 * @implements {IReportNode}
 * @implements {IFilterable}
 */
var Report = /** @class */ (function (_super) {
    __extends(Report, _super);
    /**
     * Creates an instance of a Power BI Report.
     *
     * @param {Service} service
     * @param {HTMLElement} element
     * @param {IEmbedConfiguration} config
     * @hidden
     */
    function Report(service, element, baseConfig, phasedRender, isBootstrap, iframe) {
        var _this = this;
        var config = baseConfig;
        _this = _super.call(this, service, element, config, iframe, phasedRender, isBootstrap) || this;
        _this.loadPath = "/report/load";
        _this.phasedLoadPath = "/report/prepare";
        Array.prototype.push.apply(_this.allowedEvents, Report.allowedEvents);
        _this.bookmarksManager = new bookmarksManager_1.BookmarksManager(service, config, _this.iframe);
        return _this;
    }
    /**
     * Adds backwards compatibility for the previous load configuration, which used the reportId query parameter to specify the report ID
     * (e.g. http://embedded.powerbi.com/appTokenReportEmbed?reportId=854846ed-2106-4dc2-bc58-eb77533bf2f1).
     *
     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the load configuration.
     *
     * @hidden
     * @static
     * @param {string} url
     * @returns {string}
     */
    Report.findIdFromEmbedUrl = function (url) {
        var reportIdRegEx = /reportId="?([^&]+)"?/;
        var reportIdMatch = url.match(reportIdRegEx);
        var reportId;
        if (reportIdMatch) {
            reportId = reportIdMatch[1];
        }
        return reportId;
    };
    /**
     * Render a preloaded report, using phased embedding API
     *
     * ```javascript
     * // Load report
     * var report = powerbi.load(element, config);
     *
     * ...
     *
     * // Render report
     * report.render()
     * ```
     *
     * @returns {Promise<void>}
     */
    Report.prototype.render = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.post("/report/render", config, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Add an empty page to the report
     *
     * ```javascript
     * // Add a page to the report with "Sales" as the page display name
     * report.addPage("Sales");
     * ```
     *
     * @returns {Promise<Page>}
     */
    Report.prototype.addPage = function (displayName) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, page, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            displayName: displayName
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/addPage", request, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        page = response.body;
                        return [2 /*return*/, new page_1.Page(this, page.name, page.displayName, page.isActive, page.visibility, page.defaultSize, page.defaultDisplayOption)];
                    case 3:
                        response_2 = _a.sent();
                        throw response_2.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a page from a report
     *
     * ```javascript
     * // Delete a page from a report by pageName (PageName is different than the display name and can be acquired from the getPages API)
     * report.deletePage("ReportSection145");
     * ```
     *
     * @returns {Promise<void>}
     */
    Report.prototype.deletePage = function (pageName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.delete("/report/pages/" + pageName, {}, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_3 = _a.sent();
                        throw response_3.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Rename a page from a report
     *
     * ```javascript
     * // Rename a page from a report by changing displayName (pageName is different from the display name and can be acquired from the getPages API)
     * report.renamePage("ReportSection145", "Sales");
     * ```
     *
     * @returns {Promise<void>}
     */
    Report.prototype.renamePage = function (pageName, displayName) {
        return __awaiter(this, void 0, void 0, function () {
            var page, response, response_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = {
                            name: pageName,
                            displayName: displayName,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.put("/report/pages/" + pageName + "/name", page, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_4 = _a.sent();
                        throw response_4.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets filters that are applied at the report level.
     *
     * ```javascript
     * // Get filters applied at report level
     * report.getFilters()
     *   .then(filters => {
     *     ...
     *   });
     * ```
     *
     * @returns {Promise<IFilter[]>}
     */
    Report.prototype.getFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.get("/report/filters", { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_5 = _a.sent();
                        throw response_5.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update the filters at the report level according to the operation: Add, replace all, replace by target or remove.
     *
     * ```javascript
     * report.updateFilters(FiltersOperations.Add, filters)
     *   .catch(errors => { ... });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Report.prototype.updateFilters = function (operation, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var updateFiltersRequest, response_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateFiltersRequest = {
                            filtersOperation: operation,
                            filters: filters
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post("/report/filters", updateFiltersRequest, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_6 = _a.sent();
                        throw response_6.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes all filters at the report level.
     *
     * ```javascript
     * report.removeFilters();
     * ```
     *
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Report.prototype.removeFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (util_1.isRDLEmbed(this.config.embedUrl)) {
                    return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                }
                return [2 /*return*/, this.updateFilters(powerbi_models_1.FiltersOperations.RemoveAll)];
            });
        });
    };
    /**
     * Sets filters at the report level.
     *
     * ```javascript
     * const filters: [
     *    ...
     * ];
     *
     * report.setFilters(filters)
     *  .catch(errors => {
     *    ...
     *  });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Report.prototype.setFilters = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var response_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.put("/report/filters", filters, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_7 = _a.sent();
                        throw response_7.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the report ID from the first available location: options, attribute, embed url.
     *
     * @returns {string}
     */
    Report.prototype.getId = function () {
        var config = this.config;
        var reportId = config.id || this.element.getAttribute(Report.reportIdAttribute) || Report.findIdFromEmbedUrl(config.embedUrl);
        if (typeof reportId !== 'string' || reportId.length === 0) {
            throw new Error("Report id is required, but it was not found. You must provide an id either as part of embed configuration or as attribute '" + Report.reportIdAttribute + "'.");
        }
        return reportId;
    };
    /**
     * Gets the list of pages within the report.
     *
     * ```javascript
     * report.getPages()
     *  .then(pages => {
     *      ...
     *  });
     * ```
     *
     * @returns {Promise<Page[]>}
     */
    Report.prototype.getPages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.get('/report/pages', { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body
                                .map(function (page) { return new page_1.Page(_this, page.name, page.displayName, page.isActive, page.visibility, page.defaultSize, page.defaultDisplayOption); })];
                    case 3:
                        response_8 = _a.sent();
                        throw response_8.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates an instance of a Page.
     *
     * Normally you would get Page objects by calling `report.getPages()`, but in the case
     * that the page name is known and you want to perform an action on a page without having to retrieve it
     * you can create it directly.
     *
     * Note: Because you are creating the page manually there is no guarantee that the page actually exists in the report, and subsequent requests could fail.
     *
     * @param {string} name
     * @param {string} [displayName]
     * @param {boolean} [isActive]
     * @returns {Page}
     * @hidden
     */
    Report.prototype.page = function (name, displayName, isActive, visibility) {
        return new page_1.Page(this, name, displayName, isActive, visibility);
    };
    /**
     * Prints the active page of the report by invoking `window.print()` on the embed iframe component.
     */
    Report.prototype.print = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post('/report/print', null, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_9 = _a.sent();
                        throw response_9.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the active page of the report.
     *
     * ```javascript
     * report.setPage("page2")
     *  .catch(error => { ... });
     * ```
     *
     * @param {string} pageName
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Report.prototype.setPage = function (pageName) {
        return __awaiter(this, void 0, void 0, function () {
            var page, response_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        page = {
                            name: pageName,
                            displayName: null,
                            isActive: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.put('/report/pages/active', page, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_10 = _a.sent();
                        throw response_10.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates visibility settings for the filter pane and the page navigation pane.
     *
     * ```javascript
     * const newSettings = {
     *   panes: {
     *     filters: {
     *       visible: false
     *     }
     *   }
     * };
     *
     * report.updateSettings(newSettings)
     *   .catch(error => { ... });
     * ```
     *
     * @param {ISettings} settings
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Report.prototype.updateSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var response_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl) && settings.customLayout != null) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.patch('/report/settings', settings, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_11 = _a.sent();
                        throw response_11.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Validate load configuration.
     *
     * @hidden
     */
    Report.prototype.validate = function (config) {
        if (util_1.isRDLEmbed(this.config.embedUrl)) {
            return powerbi_models_1.validatePaginatedReportLoad(config);
        }
        return powerbi_models_1.validateReportLoad(config);
    };
    /**
     * Handle config changes.
     *
     * @returns {void}
     */
    Report.prototype.configChanged = function (isBootstrap) {
        var config = this.config;
        if (this.isMobileSettings(config.settings)) {
            config.embedUrl = util_1.addParamToUrl(config.embedUrl, "isMobile", "true");
        }
        // Calculate settings from HTML element attributes if available.
        var filterPaneEnabledAttribute = this.element.getAttribute(Report.filterPaneEnabledAttribute);
        var navContentPaneEnabledAttribute = this.element.getAttribute(Report.navContentPaneEnabledAttribute);
        var elementAttrSettings = {
            filterPaneEnabled: (filterPaneEnabledAttribute == null) ? undefined : (filterPaneEnabledAttribute !== "false"),
            navContentPaneEnabled: (navContentPaneEnabledAttribute == null) ? undefined : (navContentPaneEnabledAttribute !== "false")
        };
        // Set the settings back into the config.
        this.config.settings = util_1.assign({}, elementAttrSettings, config.settings);
        if (isBootstrap) {
            return;
        }
        config.id = this.getId();
    };
    /**
     * @hidden
     * @returns {string}
     */
    Report.prototype.getDefaultEmbedUrlEndpoint = function () {
        return "reportEmbed";
    };
    /**
     * Switch Report view mode.
     *
     * @returns {Promise<void>}
     */
    Report.prototype.switchMode = function (viewMode) {
        return __awaiter(this, void 0, void 0, function () {
            var newMode, url, response, response_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof viewMode === "string") {
                            newMode = viewMode;
                        }
                        else {
                            newMode = this.viewModeToString(viewMode);
                        }
                        url = '/report/switchMode/' + newMode;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post(url, null, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_12 = _a.sent();
                        throw response_12.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refreshes data sources for the report.
     *
     * ```javascript
     * report.refresh();
     * ```
     */
    Report.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.post('/report/refresh', null, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_13 = _a.sent();
                        throw response_13.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * checks if the report is saved.
     *
     * ```javascript
     * report.isSaved()
     * ```
     *
     * @returns {Promise<boolean>}
     */
    Report.prototype.isSaved = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        return [4 /*yield*/, util_1.isSavedInternal(this.service.hpm, this.config.uniqueId, this.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Apply a theme to the report
     *
     * ```javascript
     * report.applyTheme(theme);
     * ```
     */
    Report.prototype.applyTheme = function (theme) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        return [4 /*yield*/, this.applyThemeInternal(theme)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Reset and apply the default theme of the report
     *
     * ```javascript
     * report.resetTheme();
     * ```
     */
    Report.prototype.resetTheme = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (util_1.isRDLEmbed(this.config.embedUrl)) {
                            return [2 /*return*/, Promise.reject(errors_1.APINotSupportedForRDLError)];
                        }
                        return [4 /*yield*/, this.applyThemeInternal({})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Reset user's filters, slicers, and other data view changes to the default state of the report
     *
     * ```javascript
     * report.resetPersistentFilters();
     * ```
     */
    Report.prototype.resetPersistentFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.delete("/report/userState", null, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        response_14 = _a.sent();
                        throw response_14.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Save user's filters, slicers, and other data view changes of the report
     *
     * ```javascript
     * report.savePersistentFilters();
     * ```
     */
    Report.prototype.savePersistentFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.post("/report/userState", null, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        response_15 = _a.sent();
                        throw response_15.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns if there are user's filters, slicers, or other data view changes applied on the report.
     * If persistent filters is disable, returns false.
     *
     * ```javascript
     * report.arePersistentFiltersApplied();
     * ```
     *
     * @returns {Promise<boolean>}
     */
    Report.prototype.arePersistentFiltersApplied = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.get("/report/isUserStateApplied", { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_16 = _a.sent();
                        throw response_16.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @hidden
     */
    Report.prototype.applyThemeInternal = function (theme) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.hpm.put('/report/theme', theme, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_17 = _a.sent();
                        throw response_17.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @hidden
     */
    Report.prototype.viewModeToString = function (viewMode) {
        var mode;
        switch (viewMode) {
            case powerbi_models_1.ViewMode.Edit:
                mode = "edit";
                break;
            case powerbi_models_1.ViewMode.View:
                mode = "view";
                break;
        }
        return mode;
    };
    /**
     * @hidden
     */
    Report.prototype.isMobileSettings = function (settings) {
        return settings && (settings.layoutType === powerbi_models_1.LayoutType.MobileLandscape || settings.layoutType === powerbi_models_1.LayoutType.MobilePortrait);
    };
    /** @hidden */
    Report.allowedEvents = ["filtersApplied", "pageChanged", "commandTriggered", "swipeStart", "swipeEnd", "bookmarkApplied", "dataHyperlinkClicked", "visualRendered", "visualClicked", "selectionChanged"];
    /** @hidden */
    Report.reportIdAttribute = 'powerbi-report-id';
    /** @hidden */
    Report.filterPaneEnabledAttribute = 'powerbi-settings-filter-pane-enabled';
    /** @hidden */
    Report.navContentPaneEnabledAttribute = 'powerbi-settings-nav-content-pane-enabled';
    /** @hidden */
    Report.typeAttribute = 'powerbi-type';
    /** @hidden */
    Report.type = "Report";
    return Report;
}(embed_1.Embed));
exports.Report = Report;


/***/ }),

/***/ "./src/service.ts":
/*!************************!*\
  !*** ./src/service.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
var report_1 = __webpack_require__(/*! ./report */ "./src/report.ts");
var create_1 = __webpack_require__(/*! ./create */ "./src/create.ts");
var dashboard_1 = __webpack_require__(/*! ./dashboard */ "./src/dashboard.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/tile.ts");
var page_1 = __webpack_require__(/*! ./page */ "./src/page.ts");
var qna_1 = __webpack_require__(/*! ./qna */ "./src/qna.ts");
var visual_1 = __webpack_require__(/*! ./visual */ "./src/visual.ts");
var utils = __webpack_require__(/*! ./util */ "./src/util.ts");
/**
 * The Power BI Service embed component, which is the entry point to embed all other Power BI components into your application
 *
 * @export
 * @class Service
 * @implements {IService}
 */
var Service = /** @class */ (function () {
    /**
     * Creates an instance of a Power BI Service.
     *
     * @param {IHpmFactory} hpmFactory The http post message factory used in the postMessage communication layer
     * @param {IWpmpFactory} wpmpFactory The window post message factory used in the postMessage communication layer
     * @param {IRouterFactory} routerFactory The router factory used in the postMessage communication layer
     * @param {IServiceConfiguration} [config={}]
     * @hidden
     */
    function Service(hpmFactory, wpmpFactory, routerFactory, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        this.wpmp = wpmpFactory(config.wpmpName, config.logMessages);
        this.hpm = hpmFactory(this.wpmp, null, config.version, config.type);
        this.router = routerFactory(this.wpmp);
        this.uniqueSessionId = utils.generateUUID();
        /**
         * Adds handler for report events.
         */
        this.router.post("/reports/:uniqueId/events/:eventName", function (req, _res) {
            var event = {
                type: 'report',
                id: req.params.uniqueId,
                name: req.params.eventName,
                value: req.body
            };
            _this.handleEvent(event);
        });
        this.router.post("/reports/:uniqueId/pages/:pageName/events/:eventName", function (req, _res) {
            var event = {
                type: 'report',
                id: req.params.uniqueId,
                name: req.params.eventName,
                value: req.body
            };
            _this.handleEvent(event);
        });
        this.router.post("/reports/:uniqueId/pages/:pageName/visuals/:visualName/events/:eventName", function (req, _res) {
            var event = {
                type: 'report',
                id: req.params.uniqueId,
                name: req.params.eventName,
                value: req.body
            };
            _this.handleEvent(event);
        });
        this.router.post("/dashboards/:uniqueId/events/:eventName", function (req, _res) {
            var event = {
                type: 'dashboard',
                id: req.params.uniqueId,
                name: req.params.eventName,
                value: req.body
            };
            _this.handleEvent(event);
        });
        this.router.post("/tile/:uniqueId/events/:eventName", function (req, _res) {
            var event = {
                type: 'tile',
                id: req.params.uniqueId,
                name: req.params.eventName,
                value: req.body
            };
            _this.handleEvent(event);
        });
        /**
         * Adds handler for Q&A events.
         */
        this.router.post("/qna/:uniqueId/events/:eventName", function (req, _res) {
            var event = {
                type: 'qna',
                id: req.params.uniqueId,
                name: req.params.eventName,
                value: req.body
            };
            _this.handleEvent(event);
        });
        /**
         * Adds handler for front load 'ready' message.
         */
        this.router.post("/ready/:uniqueId", function (req, _res) {
            var event = {
                type: 'report',
                id: req.params.uniqueId,
                name: 'ready',
                value: req.body
            };
            _this.handleEvent(event);
        });
        this.embeds = [];
        // TODO: Change when Object.assign is available.
        this.config = utils.assign({}, Service.defaultConfig, config);
        if (this.config.autoEmbedOnContentLoaded) {
            this.enableAutoEmbed();
        }
    }
    /**
     * Creates new report
     *
     * @param {HTMLElement} element
     * @param {IEmbedConfiguration} [config={}]
     * @returns {Embed}
     */
    Service.prototype.createReport = function (element, config) {
        config.type = 'create';
        var powerBiElement = element;
        var component = new create_1.Create(this, powerBiElement, config);
        powerBiElement.powerBiEmbed = component;
        this.addOrOverwriteEmbed(component, element);
        return component;
    };
    /**
     * TODO: Add a description here
     *
     * @param {HTMLElement} [container]
     * @param {IEmbedConfiguration} [config=undefined]
     * @returns {Embed[]}
     * @hidden
     */
    Service.prototype.init = function (container, config) {
        var _this = this;
        if (config === void 0) { config = undefined; }
        container = (container && container instanceof HTMLElement) ? container : document.body;
        var elements = Array.prototype.slice.call(container.querySelectorAll("[" + embed_1.Embed.embedUrlAttribute + "]"));
        return elements.map(function (element) { return _this.embed(element, config); });
    };
    /**
     * Given a configuration based on an HTML element,
     * if the component has already been created and attached to the element, reuses the component instance and existing iframe,
     * otherwise creates a new component instance.
     *
     * @param {HTMLElement} element
     * @param {IEmbedConfigurationBase} [config={}]
     * @returns {Embed}
     */
    Service.prototype.embed = function (element, config) {
        if (config === void 0) { config = {}; }
        return this.embedInternal(element, config);
    };
    /**
     * Given a configuration based on an HTML element,
     * if the component has already been created and attached to the element, reuses the component instance and existing iframe,
     * otherwise creates a new component instance.
     * This is used for the phased embedding API, once element is loaded successfully, one can call 'render' on it.
     *
     * @param {HTMLElement} element
     * @param {IEmbedConfigurationBase} [config={}]
     * @returns {Embed}
     */
    Service.prototype.load = function (element, config) {
        if (config === void 0) { config = {}; }
        return this.embedInternal(element, config, /* phasedRender */ true, /* isBootstrap */ false);
    };
    /**
     * Given an HTML element and entityType, creates a new component instance, and bootstrap the iframe for embedding.
     *
     * @param {HTMLElement} element
     * @param {IBootstrapEmbedConfiguration} config: a bootstrap config which is an embed config without access token.
     */
    Service.prototype.bootstrap = function (element, config) {
        return this.embedInternal(element, config, /* phasedRender */ false, /* isBootstrap */ true);
    };
    /** @hidden */
    Service.prototype.embedInternal = function (element, config, phasedRender, isBootstrap) {
        if (config === void 0) { config = {}; }
        var component;
        var powerBiElement = element;
        if (powerBiElement.powerBiEmbed) {
            if (isBootstrap) {
                throw new Error("Attempted to bootstrap element " + element.outerHTML + ", but the element is already a powerbi element.");
            }
            component = this.embedExisting(powerBiElement, config, phasedRender);
        }
        else {
            component = this.embedNew(powerBiElement, config, phasedRender, isBootstrap);
        }
        return component;
    };
    /** @hidden */
    Service.prototype.getNumberOfComponents = function () {
        if (!this.embeds) {
            return 0;
        }
        return this.embeds.length;
    };
    /** @hidden */
    Service.prototype.getSdkSessionId = function () {
        return this.uniqueSessionId;
    };
    /**
     * Given a configuration based on a Power BI element, saves the component instance that reference the element for later lookup.
     *
     * @private
     * @param {IPowerBiElement} element
     * @param {IEmbedConfigurationBase} config
     * @returns {Embed}
     * @hidden
     */
    Service.prototype.embedNew = function (element, config, phasedRender, isBootstrap) {
        var componentType = config.type || element.getAttribute(embed_1.Embed.typeAttribute);
        if (!componentType) {
            throw new Error("Attempted to embed using config " + JSON.stringify(config) + " on element " + element.outerHTML + ", but could not determine what type of component to embed. You must specify a type in the configuration or as an attribute such as '" + embed_1.Embed.typeAttribute + "=\"" + report_1.Report.type.toLowerCase() + "\"'.");
        }
        // Saves the type as part of the configuration so that it can be referenced later at a known location.
        config.type = componentType;
        var Component = utils.find(function (embedComponent) { return componentType === embedComponent.type.toLowerCase(); }, Service.components);
        if (!Component) {
            throw new Error("Attempted to embed component of type: " + componentType + " but did not find any matching component.  Please verify the type you specified is intended.");
        }
        var component = new Component(this, element, config, phasedRender, isBootstrap);
        element.powerBiEmbed = component;
        this.addOrOverwriteEmbed(component, element);
        return component;
    };
    /**
     * Given an element that already contains an embed component, load with a new configuration.
     *
     * @private
     * @param {IPowerBiElement} element
     * @param {IEmbedConfigurationBase} config
     * @returns {Embed}
     * @hidden
     */
    Service.prototype.embedExisting = function (element, config, phasedRender) {
        var component = utils.find(function (x) { return x.element === element; }, this.embeds);
        if (!component) {
            throw new Error("Attempted to embed using config " + JSON.stringify(config) + " on element " + element.outerHTML + " which already has embedded component associated, but could not find the existing component in the list of active components. This could indicate the embeds list is out of sync with the DOM, or the component is referencing the incorrect HTML element.");
        }
        // TODO: Multiple embedding to the same iframe is not supported in QnA
        if (config.type && config.type.toLowerCase() === "qna") {
            return this.embedNew(element, config);
        }
        /**
         * TODO: Dynamic embed type switching could be supported but there is work needed to prepare the service state and DOM cleanup.
         * remove all event handlers from the DOM, then reset the element to initial state which removes iframe, and removes from list of embeds
         * then we can call the embedNew function which would allow setting the proper embedUrl and construction of object based on the new type.
         */
        if (typeof config.type === "string" && config.type !== component.config.type) {
            /**
             * When loading report after create we want to use existing Iframe to optimize load period
             */
            if (config.type === "report" && component.config.type === "create") {
                var report = new report_1.Report(this, element, config, /* phasedRender */ false, /* isBootstrap */ false, element.powerBiEmbed.iframe);
                component.populateConfig(config, /* isBootstrap */ false);
                report.load();
                element.powerBiEmbed = report;
                this.addOrOverwriteEmbed(component, element);
                return report;
            }
            throw new Error("Embedding on an existing element with a different type than the previous embed object is not supported.  Attempted to embed using config " + JSON.stringify(config) + " on element " + element.outerHTML + ", but the existing element contains an embed of type: " + this.config.type + " which does not match the new type: " + config.type);
        }
        component.populateConfig(config, /* isBootstrap */ false);
        component.load(phasedRender);
        return component;
    };
    /**
     * Adds an event handler for DOMContentLoaded, which searches the DOM for elements that have the 'powerbi-embed-url' attribute,
     * and automatically attempts to embed a powerbi component based on information from other powerbi-* attributes.
     *
     * Note: Only runs if `config.autoEmbedOnContentLoaded` is true when the service is created.
     * This handler is typically useful only for applications that are rendered on the server so that all required data is available when the handler is called.
     *
     * @hidden
     */
    Service.prototype.enableAutoEmbed = function () {
        var _this = this;
        window.addEventListener('DOMContentLoaded', function (_event) { return _this.init(document.body); }, false);
    };
    /**
     * Returns an instance of the component associated with the element.
     *
     * @param {HTMLElement} element
     * @returns {(Report | Tile)}
     */
    Service.prototype.get = function (element) {
        var powerBiElement = element;
        if (!powerBiElement.powerBiEmbed) {
            throw new Error("You attempted to get an instance of powerbi component associated with element: " + element.outerHTML + " but there was no associated instance.");
        }
        return powerBiElement.powerBiEmbed;
    };
    /**
     * Finds an embed instance by the name or unique ID that is provided.
     *
     * @param {string} uniqueId
     * @returns {(Report | Tile)}
     * @hidden
     */
    Service.prototype.find = function (uniqueId) {
        return utils.find(function (x) { return x.config.uniqueId === uniqueId; }, this.embeds);
    };
    /**
     * Removes embed components whose container element is same as the given element
     *
     * @param {Embed} component
     * @param {HTMLElement} element
     * @returns {void}
     * @hidden
     */
    Service.prototype.addOrOverwriteEmbed = function (component, element) {
        // remove embeds over the same div element.
        this.embeds = this.embeds.filter(function (embed) {
            return embed.element !== element;
        });
        this.embeds.push(component);
    };
    /**
     * Given an HTML element that has a component embedded within it, removes the component from the list of embedded components, removes the association between the element and the component, and removes the iframe.
     *
     * @param {HTMLElement} element
     * @returns {void}
     */
    Service.prototype.reset = function (element) {
        var powerBiElement = element;
        if (!powerBiElement.powerBiEmbed) {
            return;
        }
        /** Removes the element frontLoad listener if exists. */
        var embedElement = powerBiElement.powerBiEmbed;
        if (embedElement.frontLoadHandler) {
            embedElement.element.removeEventListener('ready', embedElement.frontLoadHandler, false);
        }
        /** Removes all event handlers. */
        embedElement.allowedEvents.forEach(function (eventName) {
            embedElement.off(eventName);
        });
        /** Removes the component from an internal list of components. */
        utils.remove(function (x) { return x === powerBiElement.powerBiEmbed; }, this.embeds);
        /** Deletes a property from the HTML element. */
        delete powerBiElement.powerBiEmbed;
        /** Removes the iframe from the element. */
        var iframe = element.querySelector('iframe');
        if (iframe) {
            if (iframe.remove !== undefined) {
                iframe.remove();
            }
            else {
                /** Workaround for IE: unhandled rejection TypeError: object doesn't support property or method 'remove' */
                iframe.parentElement.removeChild(iframe);
            }
        }
    };
    /**
     * handles tile events
     *
     * @param {IEvent<any>} event
     * @hidden
     */
    Service.prototype.handleTileEvents = function (event) {
        if (event.type === 'tile') {
            this.handleEvent(event);
        }
    };
    /**
     * Given an event object, finds the embed component with the matching type and ID, and invokes its handleEvent method with the event object.
     *
     * @private
     * @param {IEvent<any>} event
     * @hidden
     */
    Service.prototype.handleEvent = function (event) {
        var embed = utils.find(function (embed) {
            return (embed.config.uniqueId === event.id);
        }, this.embeds);
        if (embed) {
            var value = event.value;
            if (event.name === 'pageChanged') {
                var pageKey = 'newPage';
                var page = value[pageKey];
                if (!page) {
                    throw new Error("Page model not found at 'event.value." + pageKey + "'.");
                }
                value[pageKey] = new page_1.Page(embed, page.name, page.displayName, true /* isActive */);
            }
            utils.raiseCustomEvent(embed.element, event.name, value);
        }
    };
    /**
     * API for warm starting powerbi embedded endpoints.
     * Use this API to preload Power BI Embedded in the background.
     *
     * @public
     * @param {IEmbedConfigurationBase} [config={}]
     * @param {HTMLElement} [element=undefined]
     */
    Service.prototype.preload = function (config, element) {
        var iframeContent = document.createElement("iframe");
        iframeContent.setAttribute("style", "display:none;");
        iframeContent.setAttribute("src", config.embedUrl);
        iframeContent.setAttribute("scrolling", "no");
        iframeContent.setAttribute("allowfullscreen", "false");
        var node = element;
        if (!node) {
            node = document.getElementsByTagName("body")[0];
        }
        node.appendChild(iframeContent);
        iframeContent.onload = function () {
            utils.raiseCustomEvent(iframeContent, "preloaded", {});
        };
        return iframeContent;
    };
    /**
     * A list of components that this service can embed
     */
    Service.components = [
        tile_1.Tile,
        report_1.Report,
        dashboard_1.Dashboard,
        qna_1.Qna,
        visual_1.Visual
    ];
    /**
     * The default configuration for the service
     */
    Service.defaultConfig = {
        autoEmbedOnContentLoaded: false,
        onError: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.log(args[0], args.slice(1));
        }
    };
    return Service;
}());
exports.Service = Service;


/***/ }),

/***/ "./src/tile.ts":
/*!*********************!*\
  !*** ./src/tile.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var embed_1 = __webpack_require__(/*! ./embed */ "./src/embed.ts");
/**
 * The Power BI tile embed component
 *
 * @export
 * @class Tile
 * @extends {Embed}
 */
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    /**
     * @hidden
     */
    function Tile(service, element, baseConfig, phasedRender, isBootstrap) {
        var _this = this;
        var config = baseConfig;
        _this = _super.call(this, service, element, config, /* iframe */ undefined, phasedRender, isBootstrap) || this;
        _this.loadPath = "/tile/load";
        Array.prototype.push.apply(_this.allowedEvents, Tile.allowedEvents);
        return _this;
    }
    /**
     * The ID of the tile
     *
     * @returns {string}
     */
    Tile.prototype.getId = function () {
        var config = this.config;
        var tileId = config.id || Tile.findIdFromEmbedUrl(this.config.embedUrl);
        if (typeof tileId !== 'string' || tileId.length === 0) {
            throw new Error("Tile id is required, but it was not found. You must provide an id either as part of embed configuration.");
        }
        return tileId;
    };
    /**
     * Validate load configuration.
     */
    Tile.prototype.validate = function (config) {
        var embedConfig = config;
        return powerbi_models_1.validateTileLoad(embedConfig);
    };
    /**
     * Handle config changes.
     *
     * @returns {void}
     */
    Tile.prototype.configChanged = function (isBootstrap) {
        if (isBootstrap) {
            return;
        }
        // Populate tile id into config object.
        this.config.id = this.getId();
    };
    /**
     * @hidden
     * @returns {string}
     */
    Tile.prototype.getDefaultEmbedUrlEndpoint = function () {
        return "tileEmbed";
    };
    /**
     * Adds the ability to get tileId from url.
     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the load configuration.
     *
     * @hidden
     * @static
     * @param {string} url
     * @returns {string}
     */
    Tile.findIdFromEmbedUrl = function (url) {
        var tileIdRegEx = /tileId="?([^&]+)"?/;
        var tileIdMatch = url.match(tileIdRegEx);
        var tileId;
        if (tileIdMatch) {
            tileId = tileIdMatch[1];
        }
        return tileId;
    };
    /** @hidden */
    Tile.type = "Tile";
    /** @hidden */
    Tile.allowedEvents = ["tileClicked", "tileLoaded"];
    return Tile;
}(embed_1.Embed));
exports.Tile = Tile;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeDiffInMilliseconds = exports.getRandomValue = exports.autoAuthInEmbedUrl = exports.isRDLEmbed = exports.isSavedInternal = exports.addParamToUrl = exports.generateUUID = exports.createRandomString = exports.assign = exports.remove = exports.find = exports.findIndex = exports.raiseCustomEvent = void 0;
/**
 * Raises a custom event with event data on the specified HTML element.
 *
 * @export
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {*} eventData
 */
function raiseCustomEvent(element, eventName, eventData) {
    var customEvent;
    if (typeof CustomEvent === 'function') {
        customEvent = new CustomEvent(eventName, {
            detail: eventData,
            bubbles: true,
            cancelable: true
        });
    }
    else {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(eventName, true, true, eventData);
    }
    element.dispatchEvent(customEvent);
}
exports.raiseCustomEvent = raiseCustomEvent;
/**
 * Finds the index of the first value in an array that matches the specified predicate.
 *
 * @export
 * @template T
 * @param {(x: T) => boolean} predicate
 * @param {T[]} xs
 * @returns {number}
 */
function findIndex(predicate, xs) {
    if (!Array.isArray(xs)) {
        throw new Error("You attempted to call find with second parameter that was not an array. You passed: " + xs);
    }
    var index;
    xs.some(function (x, i) {
        if (predicate(x)) {
            index = i;
            return true;
        }
    });
    return index;
}
exports.findIndex = findIndex;
/**
 * Finds the first value in an array that matches the specified predicate.
 *
 * @export
 * @template T
 * @param {(x: T) => boolean} predicate
 * @param {T[]} xs
 * @returns {T}
 */
function find(predicate, xs) {
    var index = findIndex(predicate, xs);
    return xs[index];
}
exports.find = find;
function remove(predicate, xs) {
    var index = findIndex(predicate, xs);
    xs.splice(index, 1);
}
exports.remove = remove;
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// TODO: replace in favor of using polyfill
/**
 * Copies the values of all enumerable properties from one or more source objects to a target object, and returns the target object.
 *
 * @export
 * @param {any} args
 * @returns
 */
function assign() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var target = args[0];
    'use strict';
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                }
            }
        }
    }
    return output;
}
exports.assign = assign;
/**
 * Generates a random 5 to 6 character string.
 *
 * @export
 * @returns {string}
 */
function createRandomString() {
    return getRandomValue().toString(36).substring(1);
}
exports.createRandomString = createRandomString;
/**
 * Generates a 20 character uuid.
 *
 * @export
 * @returns {string}
 */
function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // Generate a random number, scaled from 0 to 15.
        var r = (getRandomValue() % 16);
        // Shift 4 times to divide by 16
        d >>= 4;
        return r.toString(16);
    });
}
exports.generateUUID = generateUUID;
/**
 * Adds a parameter to the given url
 *
 * @export
 * @param {string} url
 * @param {string} paramName
 * @param {string} value
 * @returns {string}
 */
function addParamToUrl(url, paramName, value) {
    var parameterPrefix = url.indexOf('?') > 0 ? '&' : '?';
    url += parameterPrefix + paramName + '=' + value;
    return url;
}
exports.addParamToUrl = addParamToUrl;
/**
 * Checks if the report is saved.
 *
 * @export
 * @param {HttpPostMessage} hpm
 * @param {string} uid
 * @param {Window} contentWindow
 * @returns {Promise<boolean>}
 */
function isSavedInternal(hpm, uid, contentWindow) {
    return __awaiter(this, void 0, void 0, function () {
        var response, response_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, hpm.get('/report/hasUnsavedChanges', { uid: uid }, contentWindow)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, !response.body];
                case 2:
                    response_1 = _a.sent();
                    throw response_1.body;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isSavedInternal = isSavedInternal;
/**
 * Checks if the embed url is for RDL report.
 *
 * @export
 * @param {string} embedUrl
 * @returns {boolean}
 */
function isRDLEmbed(embedUrl) {
    return embedUrl.toLowerCase().indexOf("/rdlembed?") >= 0;
}
exports.isRDLEmbed = isRDLEmbed;
/**
 * Checks if the embed url contains autoAuth=true.
 *
 * @export
 * @param {string} embedUrl
 * @returns {boolean}
 */
function autoAuthInEmbedUrl(embedUrl) {
    return embedUrl && decodeURIComponent(embedUrl).toLowerCase().indexOf("autoauth=true") >= 0;
}
exports.autoAuthInEmbedUrl = autoAuthInEmbedUrl;
/**
 * Returns random number
 */
function getRandomValue() {
    // window.msCrypto for IE
    var cryptoObj = window.crypto || window.msCrypto;
    var randomValueArray = new Uint32Array(1);
    cryptoObj.getRandomValues(randomValueArray);
    return randomValueArray[0];
}
exports.getRandomValue = getRandomValue;
/**
 * Returns the time interval between two dates in milliseconds
 *
 * @export
 * @param {Date} start
 * @param {Date} end
 * @returns {number}
 */
function getTimeDiffInMilliseconds(start, end) {
    return Math.abs(start.getTime() - end.getTime());
}
exports.getTimeDiffInMilliseconds = getTimeDiffInMilliseconds;


/***/ }),

/***/ "./src/visual.ts":
/*!***********************!*\
  !*** ./src/visual.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visual = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
var report_1 = __webpack_require__(/*! ./report */ "./src/report.ts");
var visualDescriptor_1 = __webpack_require__(/*! ./visualDescriptor */ "./src/visualDescriptor.ts");
/**
 * The Power BI Visual embed component
 *
 * @export
 * @class Visual
 */
var Visual = /** @class */ (function (_super) {
    __extends(Visual, _super);
    /**
     * Creates an instance of a Power BI Single Visual.
     *
     * @param {Service} service
     * @param {HTMLElement} element
     * @param {IEmbedConfiguration} config
     * @hidden
     */
    function Visual(service, element, baseConfig, phasedRender, isBootstrap, iframe) {
        return _super.call(this, service, element, baseConfig, phasedRender, isBootstrap, iframe) || this;
    }
    /**
     * @hidden
     */
    Visual.prototype.load = function (phasedRender) {
        var config = this.config;
        if (!config.accessToken) {
            // bootstrap flow.
            return;
        }
        if (typeof config.pageName !== 'string' || config.pageName.length === 0) {
            throw new Error("Page name is required when embedding a visual.");
        }
        if (typeof config.visualName !== 'string' || config.visualName.length === 0) {
            throw new Error("Visual name is required, but it was not found. You must provide a visual name as part of embed configuration.");
        }
        // calculate custom layout settings and override config.
        var width = config.width ? config.width : this.iframe.offsetWidth;
        var height = config.height ? config.height : this.iframe.offsetHeight;
        var pageSize = {
            type: powerbi_models_1.PageSizeType.Custom,
            width: width,
            height: height,
        };
        var pagesLayout = {};
        pagesLayout[config.pageName] = {
            defaultLayout: {
                displayState: {
                    mode: powerbi_models_1.VisualContainerDisplayMode.Hidden
                }
            },
            visualsLayout: {}
        };
        pagesLayout[config.pageName].visualsLayout[config.visualName] = {
            displayState: {
                mode: powerbi_models_1.VisualContainerDisplayMode.Visible
            },
            x: 1,
            y: 1,
            z: 1,
            width: pageSize.width,
            height: pageSize.height
        };
        config.settings = config.settings || {};
        config.settings.filterPaneEnabled = false;
        config.settings.navContentPaneEnabled = false;
        config.settings.layoutType = powerbi_models_1.LayoutType.Custom;
        config.settings.customLayout = {
            displayOption: powerbi_models_1.DisplayOption.FitToPage,
            pageSize: pageSize,
            pagesLayout: pagesLayout
        };
        this.config = config;
        return _super.prototype.load.call(this, phasedRender);
    };
    /**
     * Gets the list of pages within the report - not supported in visual
     *
     * @returns {Promise<Page[]>}
     */
    Visual.prototype.getPages = function () {
        throw Visual.GetPagesNotSupportedError;
    };
    /**
     * Sets the active page of the report - not supported in visual
     *
     * @param {string} pageName
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Visual.prototype.setPage = function (_pageName) {
        throw Visual.SetPageNotSupportedError;
    };
    /**
     * Render a preloaded report, using phased embedding API
     *
     * @hidden
     * @returns {Promise<void>}
     */
    Visual.prototype.render = function (_config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw Visual.RenderNotSupportedError;
            });
        });
    };
    /**
     * Gets the embedded visual descriptor object that contains the visual name, type, etc.
     *
     * ```javascript
     * visual.getVisualDescriptor()
     *   .then(visualDetails => { ... });
     * ```
     *
     * @returns {Promise<VisualDescriptor>}
     */
    Visual.prototype.getVisualDescriptor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, response, embeddedVisuals, visualNotFoundError, embeddedVisual, currentPage, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.config;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.get("/report/pages/" + config.pageName + "/visuals", { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        embeddedVisuals = response.body.filter(function (pageVisual) { return pageVisual.name === config.visualName; });
                        if (embeddedVisuals.length === 0) {
                            visualNotFoundError = {
                                message: "visualNotFound",
                                detailedMessage: "Visual not found"
                            };
                            throw visualNotFoundError;
                        }
                        embeddedVisual = embeddedVisuals[0];
                        currentPage = this.page(config.pageName);
                        return [2 /*return*/, new visualDescriptor_1.VisualDescriptor(currentPage, embeddedVisual.name, embeddedVisual.title, embeddedVisual.type, embeddedVisual.layout)];
                    case 3:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets filters that are applied to the filter level.
     * Default filter level is visual level.
     *
     * ```javascript
     * visual.getFilters(filtersLevel)
     *   .then(filters => {
     *     ...
     *   });
     * ```
     *
     * @returns {Promise<IFilter[]>}
     */
    Visual.prototype.getFilters = function (filtersLevel) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getFiltersLevelUrl(filtersLevel);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.get(url, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_2 = _a.sent();
                        throw response_2.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates filters at the filter level.
     * Default filter level is visual level.
     *
     * ```javascript
     * const filters: [
     *    ...
     * ];
     *
     * visual.updateFilters(FiltersOperations.Add, filters, filtersLevel)
     *  .catch(errors => {
     *    ...
     *  });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Visual.prototype.updateFilters = function (operation, filters, filtersLevel) {
        return __awaiter(this, void 0, void 0, function () {
            var updateFiltersRequest, url, response_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateFiltersRequest = {
                            filtersOperation: operation,
                            filters: filters
                        };
                        url = this.getFiltersLevelUrl(filtersLevel);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.post(url, updateFiltersRequest, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_3 = _a.sent();
                        throw response_3.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets filters at the filter level.
     * Default filter level is visual level.
     *
     * ```javascript
     * const filters: [
     *    ...
     * ];
     *
     * visual.setFilters(filters, filtersLevel)
     *  .catch(errors => {
     *    ...
     *  });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Visual.prototype.setFilters = function (filters, filtersLevel) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getFiltersLevelUrl(filtersLevel);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.hpm.put(url, filters, { uid: this.config.uniqueId }, this.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_4 = _a.sent();
                        throw response_4.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes all filters from the current filter level.
     * Default filter level is visual level.
     *
     * ```javascript
     * visual.removeFilters(filtersLevel);
     * ```
     *
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    Visual.prototype.removeFilters = function (filtersLevel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateFilters(powerbi_models_1.FiltersOperations.RemoveAll, undefined, filtersLevel)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @hidden
     */
    Visual.prototype.getFiltersLevelUrl = function (filtersLevel) {
        var config = this.config;
        switch (filtersLevel) {
            case powerbi_models_1.FiltersLevel.Report:
                return "/report/filters";
            case powerbi_models_1.FiltersLevel.Page:
                return "/report/pages/" + config.pageName + "/filters";
            default:
                return "/report/pages/" + config.pageName + "/visuals/" + config.visualName + "/filters";
        }
    };
    /** @hidden */
    Visual.type = "visual";
    /** @hidden */
    Visual.GetPagesNotSupportedError = "Get pages is not supported while embedding a visual.";
    /** @hidden */
    Visual.SetPageNotSupportedError = "Set page is not supported while embedding a visual.";
    /** @hidden */
    Visual.RenderNotSupportedError = "render is not supported while embedding a visual.";
    return Visual;
}(report_1.Report));
exports.Visual = Visual;


/***/ }),

/***/ "./src/visualDescriptor.ts":
/*!*********************************!*\
  !*** ./src/visualDescriptor.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualDescriptor = void 0;
var powerbi_models_1 = __webpack_require__(/*! powerbi-models */ "./node_modules/powerbi-models/dist/models.js");
/**
 * A Power BI visual within a page
 *
 * @export
 * @class VisualDescriptor
 * @implements {IVisualNode}
 */
var VisualDescriptor = /** @class */ (function () {
    /**
     * @hidden
     */
    function VisualDescriptor(page, name, title, type, layout) {
        this.name = name;
        this.title = title;
        this.type = type;
        this.layout = layout;
        this.page = page;
    }
    /**
     * Gets all visual level filters of the current visual.
     *
     * ```javascript
     * visual.getFilters()
     *  .then(filters => { ... });
     * ```
     *
     * @returns {(Promise<IFilter[]>)}
     */
    VisualDescriptor.prototype.getFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.report.service.hpm.get("/report/pages/" + this.page.name + "/visuals/" + this.name + "/filters", { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_1 = _a.sent();
                        throw response_1.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update the filters for the current visual according to the operation: Add, replace all, replace by target or remove.
     *
     * ```javascript
     * visual.updateFilters(FiltersOperations.Add, filters)
     *   .catch(errors => { ... });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    VisualDescriptor.prototype.updateFilters = function (operation, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var updateFiltersRequest, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateFiltersRequest = {
                            filtersOperation: operation,
                            filters: filters
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.page.report.service.hpm.post("/report/pages/" + this.page.name + "/visuals/" + this.name + "/filters", updateFiltersRequest, { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        response_2 = _a.sent();
                        throw response_2.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes all filters from the current visual.
     *
     * ```javascript
     * visual.removeFilters();
     * ```
     *
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    VisualDescriptor.prototype.removeFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateFilters(powerbi_models_1.FiltersOperations.RemoveAll)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sets the filters on the current visual to 'filters'.
     *
     * ```javascript
     * visual.setFilters(filters);
     *   .catch(errors => { ... });
     * ```
     *
     * @param {(IFilter[])} filters
     * @returns {Promise<IHttpPostMessageResponse<void>>}
     */
    VisualDescriptor.prototype.setFilters = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var response_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.report.service.hpm.put("/report/pages/" + this.page.name + "/visuals/" + this.name + "/filters", filters, { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        response_3 = _a.sent();
                        throw response_3.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Exports Visual data.
     * Can export up to 30K rows.
     *
     * @param rows: Optional. Default value is 30K, maximum value is 30K as well.
     * @param exportDataType: Optional. Default is ExportDataType.Summarized.
     * ```javascript
     * visual.exportData()
     *  .then(data => { ... });
     * ```
     *
     * @returns {(Promise<IExportDataResult>)}
     */
    VisualDescriptor.prototype.exportData = function (exportDataType, rows) {
        return __awaiter(this, void 0, void 0, function () {
            var exportDataRequestBody, response, response_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exportDataRequestBody = {
                            rows: rows,
                            exportDataType: exportDataType
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.page.report.service.hpm.post("/report/pages/" + this.page.name + "/visuals/" + this.name + "/exportData", exportDataRequestBody, { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 3:
                        response_4 = _a.sent();
                        throw response_4.body;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set slicer state.
     * Works only for visuals of type slicer.
     *
     * @param state: A new state which contains the slicer filters.
     * ```javascript
     * visual.setSlicerState()
     *  .then(() => { ... });
     * ```
     */
    VisualDescriptor.prototype.setSlicerState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var response_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.report.service.hpm.put("/report/pages/" + this.page.name + "/visuals/" + this.name + "/slicer", state, { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        response_5 = _a.sent();
                        throw response_5.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get slicer state.
     * Works only for visuals of type slicer.
     *
     * ```javascript
     * visual.getSlicerState()
     *  .then(state => { ... });
     * ```
     *
     * @returns {(Promise<ISlicerState>)}
     */
    VisualDescriptor.prototype.getSlicerState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.report.service.hpm.get("/report/pages/" + this.page.name + "/visuals/" + this.name + "/slicer", { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_6 = _a.sent();
                        throw response_6.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clone existing visual to a new instance.
     *
     * @returns {(Promise<ICloneVisualResponse>)}
     */
    VisualDescriptor.prototype.clone = function (request) {
        if (request === void 0) { request = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, response_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.report.service.hpm.post("/report/pages/" + this.page.name + "/visuals/" + this.name + "/clone", request, { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.body];
                    case 2:
                        response_7 = _a.sent();
                        throw response_7.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sort a visual by dataField and direction.
     *
     * @param request: Sort by visual request.
     *
     * ```javascript
     * visual.sortBy(request)
     *  .then(() => { ... });
     * ```
     */
    VisualDescriptor.prototype.sortBy = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.report.service.hpm.put("/report/pages/" + this.page.name + "/visuals/" + this.name + "/sortBy", request, { uid: this.page.report.config.uniqueId }, this.page.report.iframe.contentWindow)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        response_8 = _a.sent();
                        throw response_8.body;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VisualDescriptor;
}());
exports.VisualDescriptor = VisualDescriptor;


/***/ })

/******/ });
});
//# sourceMappingURL=powerbi.js.map