(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Subject"), require("rxjs/operator/filter"), require("rxjs/BehaviorSubject"), require("rxjs/operator/let"), require("rxjs/operator/do"), require("rxjs/operator/switchMap"), require("rxjs/observable/fromEvent"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms", "rxjs/Subject", "rxjs/operator/filter", "rxjs/BehaviorSubject", "rxjs/operator/let", "rxjs/operator/do", "rxjs/operator/switchMap", "rxjs/observable/fromEvent"], factory);
	else if(typeof exports === 'object')
		exports["ngb"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Subject"), require("rxjs/operator/filter"), require("rxjs/BehaviorSubject"), require("rxjs/operator/let"), require("rxjs/operator/do"), require("rxjs/operator/switchMap"), require("rxjs/observable/fromEvent"));
	else
		root["ngb"] = factory(root["ng"]["core"], root["ng"]["common"], root["ng"]["forms"], root["Rx"], root["Rx"], root["Rx"], root["Rx"], root["Rx"], root["Rx"], root["Rx"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_77__, __WEBPACK_EXTERNAL_MODULE_78__, __WEBPACK_EXTERNAL_MODULE_82__, __WEBPACK_EXTERNAL_MODULE_83__, __WEBPACK_EXTERNAL_MODULE_84__, __WEBPACK_EXTERNAL_MODULE_85__, __WEBPACK_EXTERNAL_MODULE_86__) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function toInteger(value) {
    return parseInt("" + value, 10);
}
exports.toInteger = toInteger;
function toString(value) {
    return (value !== undefined && value !== null) ? "" + value : '';
}
exports.toString = toString;
function getValueInRange(value, max, min) {
    if (min === void 0) { min = 0; }
    return Math.max(Math.min(value, max), min);
}
exports.getValueInRange = getValueInRange;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return !isNaN(toInteger(value));
}
exports.isNumber = isNumber;
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
exports.isInteger = isInteger;
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function padNumber(value) {
    if (isNumber(value)) {
        return ("0" + value).slice(-2);
    }
    else {
        return '';
    }
}
exports.padNumber = padNumber;
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.regExpEscape = regExpEscape;
//# sourceMappingURL=util.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NgbDate = (function () {
    function NgbDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    NgbDate.from = function (date) {
        return date ? new NgbDate(date.year, date.month, date.day ? date.day : 1) : null;
    };
    NgbDate.prototype.equals = function (other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    };
    NgbDate.prototype.before = function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    };
    NgbDate.prototype.after = function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    };
    NgbDate.prototype.toStruct = function () { return { year: this.year, month: this.month, day: this.day }; };
    NgbDate.prototype.toString = function () { return this.year + "-" + this.month + "-" + this.day; };
    return NgbDate;
}());
exports.NgbDate = NgbDate;
//# sourceMappingURL=ngb-date.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngb_date_1 = __webpack_require__(3);
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
function fromJSDate(jsDate) {
    return new ngb_date_1.NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
function toJSDate(date) {
    var jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
var NgbCalendar = (function () {
    function NgbCalendar() {
    }
    NgbCalendar = __decorate([
        core_1.Injectable()
    ], NgbCalendar);
    return NgbCalendar;
}());
exports.NgbCalendar = NgbCalendar;
var NgbCalendarGregorian = (function (_super) {
    __extends(NgbCalendarGregorian, _super);
    function NgbCalendarGregorian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgbCalendarGregorian.prototype.getDaysPerWeek = function () { return 7; };
    NgbCalendarGregorian.prototype.getMonths = function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    NgbCalendarGregorian.prototype.getWeeksPerMonth = function () { return 6; };
    NgbCalendarGregorian.prototype.getNext = function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        var jsDate = toJSDate(date);
        switch (period) {
            case 'y':
                return new ngb_date_1.NgbDate(date.year + number, 1, 1);
            case 'm':
                jsDate = new Date(date.year, date.month + number - 1, 1, 12);
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                break;
            default:
                return date;
        }
        return fromJSDate(jsDate);
    };
    NgbCalendarGregorian.prototype.getPrev = function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        return this.getNext(date, period, -number);
    };
    NgbCalendarGregorian.prototype.getWeekday = function (date) {
        var jsDate = toJSDate(date);
        var day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    NgbCalendarGregorian.prototype.getWeekNumber = function (week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        var date = week[thursdayIndex];
        var jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        var time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    };
    NgbCalendarGregorian.prototype.getToday = function () { return fromJSDate(new Date()); };
    NgbCalendarGregorian.prototype.isValid = function (date) {
        if (!date || !util_1.isInteger(date.year) || !util_1.isInteger(date.month) || !util_1.isInteger(date.day)) {
            return false;
        }
        var jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    };
    NgbCalendarGregorian = __decorate([
        core_1.Injectable()
    ], NgbCalendarGregorian);
    return NgbCalendarGregorian;
}(NgbCalendar));
exports.NgbCalendarGregorian = NgbCalendarGregorian;
//# sourceMappingURL=ngb-calendar.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var WEEKDAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var MONTHS_FULL = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'
];
/**
 * Type of the service supplying month and weekday names to to NgbDatepicker component.
 * See the i18n demo for how to extend this class and define a custom provider for i18n.
 */
var NgbDatepickerI18n = (function () {
    function NgbDatepickerI18n() {
    }
    NgbDatepickerI18n = __decorate([
        core_1.Injectable()
    ], NgbDatepickerI18n);
    return NgbDatepickerI18n;
}());
exports.NgbDatepickerI18n = NgbDatepickerI18n;
var NgbDatepickerI18nDefault = (function (_super) {
    __extends(NgbDatepickerI18nDefault, _super);
    function NgbDatepickerI18nDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgbDatepickerI18nDefault.prototype.getWeekdayShortName = function (weekday) { return WEEKDAYS_SHORT[weekday - 1]; };
    NgbDatepickerI18nDefault.prototype.getMonthShortName = function (month) { return MONTHS_SHORT[month - 1]; };
    NgbDatepickerI18nDefault.prototype.getMonthFullName = function (month) { return MONTHS_FULL[month - 1]; };
    NgbDatepickerI18nDefault = __decorate([
        core_1.Injectable()
    ], NgbDatepickerI18nDefault);
    return NgbDatepickerI18nDefault;
}(NgbDatepickerI18n));
exports.NgbDatepickerI18nDefault = NgbDatepickerI18nDefault;
//# sourceMappingURL=datepicker-i18n.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
var Positioning = (function () {
    function Positioning() {
    }
    Positioning.prototype.getAllStyles = function (element) { return window.getComputedStyle(element); };
    Positioning.prototype.getStyle = function (element, prop) { return this.getAllStyles(element)[prop]; };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    };
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            var offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    };
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        var elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    };
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        var targetElStyles = this.getAllStyles(targetElement);
        var targetElBCR = targetElement.getBoundingClientRect();
        var placementPrimary = placement.split('-')[0] || 'top';
        var placementSecondary = placement.split('-')[1] || 'center';
        var targetElPosition = {
            'height': targetElBCR.height || targetElement.offsetHeight,
            'width': targetElBCR.width || targetElement.offsetWidth,
            'top': 0,
            'bottom': targetElBCR.height || targetElement.offsetHeight,
            'left': 0,
            'right': targetElBCR.width || targetElement.offsetWidth
        };
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top =
                    hostElPosition.top - (targetElement.offsetHeight + parseFloat(targetElStyles.marginBottom));
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height;
                break;
            case 'left':
                targetElPosition.left =
                    hostElPosition.left - (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width;
                break;
        }
        switch (placementSecondary) {
            case 'top':
                targetElPosition.top = hostElPosition.top;
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                break;
            case 'left':
                targetElPosition.left = hostElPosition.left;
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                break;
            case 'center':
                if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                    targetElPosition.left = hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2;
                }
                else {
                    targetElPosition.top = hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2;
                }
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    };
    // get the availble placements of the target element in the viewport dependeing on the host element
    Positioning.prototype.getAvailablePlacements = function (hostElement, targetElement) {
        var availablePlacements = [];
        var hostElemClientRect = hostElement.getBoundingClientRect();
        var targetElemClientRect = targetElement.getBoundingClientRect();
        var html = document.documentElement;
        // left: check if target width can be placed between host left and viewport start and also height of target is
        // inside viewport
        if (targetElemClientRect.width < hostElemClientRect.left) {
            // check for left only
            if ((hostElemClientRect.top + hostElemClientRect.height / 2 - targetElement.offsetHeight / 2) > 0) {
                availablePlacements.splice(availablePlacements.length, 1, 'left');
            }
            // check for left-top and left-bottom
            this.setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, 'left', availablePlacements);
        }
        // top: target height is less than host top
        if (targetElemClientRect.height < hostElemClientRect.top) {
            availablePlacements.splice(availablePlacements.length, 1, 'top');
            this.setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, 'top', availablePlacements);
        }
        // right: check if target width can be placed between host right and viewport end and also height of target is
        // inside viewport
        if ((window.innerWidth || html.clientWidth) - hostElemClientRect.right > targetElemClientRect.width) {
            // check for right only
            if ((hostElemClientRect.top + hostElemClientRect.height / 2 - targetElement.offsetHeight / 2) > 0) {
                availablePlacements.splice(availablePlacements.length, 1, 'right');
            }
            // check for right-top and right-bottom
            this.setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, 'right', availablePlacements);
        }
        // bottom: check if there is enough space between host bottom and viewport end for target height
        if ((window.innerHeight || html.clientHeight) - hostElemClientRect.bottom > targetElemClientRect.height) {
            availablePlacements.splice(availablePlacements.length, 1, 'bottom');
            this.setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, 'bottom', availablePlacements);
        }
        return availablePlacements;
    };
    /**
     * check if secondary placement for left and right are available i.e. left-top, left-bottom, right-top, right-bottom
     * primaryplacement: left|right
     * availablePlacementArr: array in which available placemets to be set
     */
    Positioning.prototype.setSecondaryPlacementForLeftRight = function (hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
        var html = document.documentElement;
        // check for left-bottom
        if (targetElemClientRect.height <= hostElemClientRect.bottom) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-bottom');
        }
        if ((window.innerHeight || html.clientHeight) - hostElemClientRect.top >= targetElemClientRect.height) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-top');
        }
    };
    /**
     * check if secondary placement for top and bottom are available i.e. top-left, top-right, bottom-left, bottom-right
     * primaryplacement: top|bottom
     * availablePlacementArr: array in which available placemets to be set
     */
    Positioning.prototype.setSecondaryPlacementForTopBottom = function (hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
        var html = document.documentElement;
        // check for left-bottom
        if ((window.innerWidth || html.clientWidth) - hostElemClientRect.left >= targetElemClientRect.width) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-left');
        }
        if (targetElemClientRect.width <= hostElemClientRect.right) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-right');
        }
    };
    return Positioning;
}());
exports.Positioning = Positioning;
var positionService = new Positioning();
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order 'top', 'bottom', 'left', 'right'.
 * */
function positionElements(hostElement, targetElement, placement, appendToBody) {
    var placementVals = Array.isArray(placement) ? placement : [placement];
    // replace auto placement with other placements
    var hasAuto = placementVals.findIndex(function (val) { return val === 'auto'; });
    if (hasAuto >= 0) {
        ['top', 'right', 'bottom', 'left'].forEach(function (obj) {
            if (placementVals.find(function (val) { return val.search('^' + obj + '|^' + obj + '-') !== -1; }) == null) {
                placementVals.splice(hasAuto++, 1, obj);
            }
        });
    }
    // coordinates where to position
    var topVal = 0, leftVal = 0;
    var appliedPlacement;
    // get available placements
    var availablePlacements = positionService.getAvailablePlacements(hostElement, targetElement);
    var _loop_1 = function (item, index) {
        // check if passed placement is present in the available placement or otherwise apply the last placement in the
        // passed placement list
        if ((availablePlacements.find(function (val) { return val === item; }) != null) || (placementVals.length === index + 1)) {
            appliedPlacement = item;
            var pos = positionService.positionElements(hostElement, targetElement, item, appendToBody);
            topVal = pos.top;
            leftVal = pos.left;
            return "break";
        }
    };
    // iterate over all the passed placements
    for (var _i = 0, _a = toItemIndexes(placementVals); _i < _a.length; _i++) {
        var _b = _a[_i], item = _b.item, index = _b.index;
        var state_1 = _loop_1(item, index);
        if (state_1 === "break")
            break;
    }
    targetElement.style.top = topVal + "px";
    targetElement.style.left = leftVal + "px";
    return appliedPlacement;
}
exports.positionElements = positionElements;
// function to get index and item of an array
function toItemIndexes(a) {
    return a.map(function (item, index) { return ({ item: item, index: index }); });
}
//# sourceMappingURL=positioning.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NgbButtonLabel = (function () {
    function NgbButtonLabel() {
    }
    NgbButtonLabel = __decorate([
        core_1.Directive({
            selector: '[ngbButtonLabel]',
            host: { '[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused' }
        })
    ], NgbButtonLabel);
    return NgbButtonLabel;
}());
exports.NgbButtonLabel = NgbButtonLabel;
//# sourceMappingURL=label.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Abstract type serving as a DI token for the service converting from your application Date model to internal
 * NgbDateStruct model.
 * A default implementation converting from and to NgbDateStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 */
var NgbDateAdapter = (function () {
    function NgbDateAdapter() {
    }
    NgbDateAdapter = __decorate([
        core_1.Injectable()
    ], NgbDateAdapter);
    return NgbDateAdapter;
}());
exports.NgbDateAdapter = NgbDateAdapter;
var NgbDateStructAdapter = (function (_super) {
    __extends(NgbDateStructAdapter, _super);
    function NgbDateStructAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param  {NgbDateStruct} value
     * @return {NgbDateStruct}
     */
    NgbDateStructAdapter.prototype.fromModel = function (date) {
        return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
    };
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param  {NgbDateStruct} value
     * @return {NgbDateStruct}
     */
    NgbDateStructAdapter.prototype.toModel = function (date) {
        return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
    };
    NgbDateStructAdapter = __decorate([
        core_1.Injectable()
    ], NgbDateStructAdapter);
    return NgbDateStructAdapter;
}(NgbDateAdapter));
exports.NgbDateStructAdapter = NgbDateStructAdapter;
//# sourceMappingURL=ngb-date-adapter.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ContentRef = (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());
exports.ContentRef = ContentRef;
var PopupService = (function () {
    function PopupService(type, _injector, _viewContainerRef, _renderer, componentFactoryResolver) {
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._windowFactory = componentFactoryResolver.resolveComponentFactory(type);
    }
    PopupService.prototype.open = function (content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef =
                this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    };
    PopupService.prototype.close = function () {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
        }
    };
    PopupService.prototype._getContentRef = function (content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof core_1.TemplateRef) {
            var viewRef = this._viewContainerRef.createEmbeddedView(content, context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText("" + content)]]);
        }
    };
    return PopupService;
}());
exports.PopupService = PopupService;
//# sourceMappingURL=popup.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbAccordion component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the accordions used in the application.
 */
var NgbAccordionConfig = (function () {
    function NgbAccordionConfig() {
        this.closeOthers = false;
    }
    NgbAccordionConfig = __decorate([
        core_1.Injectable()
    ], NgbAccordionConfig);
    return NgbAccordionConfig;
}());
exports.NgbAccordionConfig = NgbAccordionConfig;
//# sourceMappingURL=accordion-config.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbAlert component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the alerts used in the application.
 */
var NgbAlertConfig = (function () {
    function NgbAlertConfig() {
        this.dismissible = true;
        this.type = 'warning';
    }
    NgbAlertConfig = __decorate([
        core_1.Injectable()
    ], NgbAlertConfig);
    return NgbAlertConfig;
}());
exports.NgbAlertConfig = NgbAlertConfig;
//# sourceMappingURL=alert-config.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbCarousel component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the carousels used in the application.
 */
var NgbCarouselConfig = (function () {
    function NgbCarouselConfig() {
        this.interval = 5000;
        this.wrap = true;
        this.keyboard = true;
    }
    NgbCarouselConfig = __decorate([
        core_1.Injectable()
    ], NgbCarouselConfig);
    return NgbCarouselConfig;
}());
exports.NgbCarouselConfig = NgbCarouselConfig;
//# sourceMappingURL=carousel-config.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(5);
var ngb_calendar_1 = __webpack_require__(4);
var ngb_date_1 = __webpack_require__(3);
var datepicker_service_1 = __webpack_require__(15);
var datepicker_keymap_service_1 = __webpack_require__(79);
var datepicker_view_model_1 = __webpack_require__(41);
var util_1 = __webpack_require__(1);
var datepicker_config_1 = __webpack_require__(16);
var ngb_date_adapter_1 = __webpack_require__(9);
var datepicker_i18n_1 = __webpack_require__(6);
var datepicker_tools_1 = __webpack_require__(40);
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbDatepicker; }),
    multi: true
};
/**
 * A lightweight and highly configurable datepicker directive
 */
var NgbDatepicker = (function () {
    function NgbDatepicker(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter) {
        var _this = this;
        this._keyMapService = _keyMapService;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._cd = _cd;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new core_1.EventEmitter();
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDateStruct.
         */
        this.select = new core_1.EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.dayTemplate = config.dayTemplate;
        this.displayMonths = config.displayMonths;
        this.firstDayOfWeek = config.firstDayOfWeek;
        this.markDisabled = config.markDisabled;
        this.minDate = config.minDate;
        this.maxDate = config.maxDate;
        this.navigation = config.navigation;
        this.outsideDays = config.outsideDays;
        this.showWeekdays = config.showWeekdays;
        this.showWeekNumbers = config.showWeekNumbers;
        this.startDate = config.startDate;
        this._selectSubscription = _service.select$.subscribe(function (date) { _this.select.emit(date.toStruct()); });
        this._subscription = _service.model$.subscribe(function (model) {
            var newDate = model.firstDate;
            var oldDate = _this.model ? _this.model.firstDate : null;
            var newSelectedDate = model.selectedDate;
            var oldSelectedDate = _this.model ? _this.model.selectedDate : null;
            _this.model = model;
            // handling selection change
            if (datepicker_tools_1.isChangedDate(newSelectedDate, oldSelectedDate)) {
                _this.onTouched();
                _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                _this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month }
                });
            }
            _cd.markForCheck();
        });
    }
    /**
     * Manually focus the datepicker
     */
    NgbDatepicker.prototype.focus = function () { this._elementRef.nativeElement.focus(); };
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    NgbDatepicker.prototype.navigateTo = function (date) {
        this._service.open(date ? new ngb_date_1.NgbDate(date.year, date.month, 1) : this._calendar.getToday());
    };
    NgbDatepicker.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this._selectSubscription.unsubscribe();
    };
    NgbDatepicker.prototype.ngOnInit = function () {
        if (this.model === undefined) {
            this._service.displayMonths = util_1.toInteger(this.displayMonths);
            this._service.markDisabled = this.markDisabled;
            this._service.firstDayOfWeek = this.firstDayOfWeek;
            this._service.navigation = this.navigation;
            this._setDates();
        }
    };
    NgbDatepicker.prototype.ngOnChanges = function (changes) {
        if (changes['displayMonths']) {
            this._service.displayMonths = util_1.toInteger(this.displayMonths);
        }
        if (changes['markDisabled']) {
            this._service.markDisabled = this.markDisabled;
        }
        if (changes['firstDayOfWeek']) {
            this._service.firstDayOfWeek = this.firstDayOfWeek;
        }
        if (changes['navigation']) {
            this._service.navigation = this.navigation;
        }
        this._setDates();
    };
    NgbDatepicker.prototype.onDateSelect = function (date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    };
    NgbDatepicker.prototype.onKeyDown = function (event) { this._keyMapService.processKey(event); };
    NgbDatepicker.prototype.onNavigateDateSelect = function (date) { this._service.open(date); };
    NgbDatepicker.prototype.onNavigateEvent = function (event) {
        switch (event) {
            case datepicker_view_model_1.NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case datepicker_view_model_1.NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    };
    NgbDatepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbDatepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbDatepicker.prototype.setDisabledState = function (isDisabled) { this._service.disabled = isDisabled; };
    NgbDatepicker.prototype.showFocus = function (focusVisible) { this._service.focusVisible = focusVisible; };
    NgbDatepicker.prototype.writeValue = function (value) { this._service.select(ngb_date_1.NgbDate.from(this._ngbDateAdapter.fromModel(value))); };
    NgbDatepicker.prototype._setDates = function () {
        var startDate = this._service.toValidDate(this.startDate, this._calendar.getToday());
        var minDate = this._service.toValidDate(this.minDate, this._calendar.getPrev(startDate, 'y', 10));
        var maxDate = this._service.toValidDate(this.maxDate, this._calendar.getPrev(this._calendar.getNext(startDate, 'y', 11)));
        this.minDate = { year: minDate.year, month: minDate.month, day: minDate.day };
        this.maxDate = { year: maxDate.year, month: maxDate.month, day: maxDate.day };
        this._service.minDate = minDate;
        this._service.maxDate = maxDate;
        this.navigateTo(startDate);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], NgbDatepicker.prototype, "dayTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbDatepicker.prototype, "displayMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbDatepicker.prototype, "firstDayOfWeek", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgbDatepicker.prototype, "markDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepicker.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepicker.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbDatepicker.prototype, "navigation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbDatepicker.prototype, "outsideDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepicker.prototype, "showWeekdays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepicker.prototype, "showWeekNumbers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepicker.prototype, "startDate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDatepicker.prototype, "navigate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDatepicker.prototype, "select", void 0);
    NgbDatepicker = __decorate([
        core_1.Component({
            exportAs: 'ngbDatepicker',
            selector: 'ngb-datepicker',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: {
                'tabindex': '0',
                '[attr.tabindex]': 'model.disabled ? undefined : "0"',
                '(blur)': 'showFocus(false)',
                '(focus)': 'showFocus(true)',
                '(keydown)': 'onKeyDown($event)'
            },
            styles: ["\n    :host {\n      border: 1px solid rgba(0, 0, 0, 0.125);\n      border-radius: 0.25rem;\n      display: inline-block;\n    }\n    .ngb-dp-month {\n      pointer-events: none;\n    }\n    .ngb-dp-header {\n      border-bottom: 0px;\n      border-radius: .25rem 0.25rem 0rem 0rem;\n      padding-top: 0.25rem;\n    }\n    ngb-datepicker-month-view {\n      pointer-events: auto;\n    }\n    .ngb-dp-month-name {\n      font-size: larger;\n      height: 2rem;\n      line-height: 2rem;\n      text-align: center;\n    }\n    /deep/ .ngb-dp-month + .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week {\n      padding-left: 1rem;\n    }\n    /deep/ .ngb-dp-month + .ngb-dp-month > .ngb-dp-month-name {\n      padding-left: 1rem;\n    }\n    /deep/ .ngb-dp-month:last-child .ngb-dp-week {\n      padding-right: .25rem;\n    }\n    /deep/ .ngb-dp-month:first-child .ngb-dp-week {\n      padding-left: .25rem;\n    }\n    /deep/ .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week:last-child {\n      padding-bottom: .25rem;\n    }\n    .ngb-dp-months {\n      display: flex;\n    }\n  "],
            template: "\n    <ng-template #dt let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\" let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header bg-light\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate\"\n        [minDate]=\"model.minDate\"\n        [maxDate]=\"model.maxDate\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showWeekNumbers]=\"showWeekNumbers\"\n        [showSelect]=\"model.navigation === 'select'\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div class=\"ngb-dp-months\">\n      <ng-template ngFor let-month [ngForOf]=\"model.months\" let-i=\"index\">\n        <div class=\"ngb-dp-month d-block\">\n          <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\"\n                class=\"ngb-dp-month-name bg-light\">\n            {{ i18n.getMonthFullName(month.number) }} {{ month.year }}\n          </div>\n          <ngb-datepicker-month-view\n            [month]=\"month\"\n            [dayTemplate]=\"dayTemplate || dt\"\n            [showWeekdays]=\"showWeekdays\"\n            [showWeekNumbers]=\"showWeekNumbers\"\n            [outsideDays]=\"(displayMonths === 1 ? outsideDays : 'hidden')\"\n            (select)=\"onDateSelect($event)\">\n          </ngb-datepicker-month-view>\n        </div>\n      </ng-template>\n    </div>\n  ",
            providers: [NGB_DATEPICKER_VALUE_ACCESSOR, datepicker_service_1.NgbDatepickerService, datepicker_keymap_service_1.NgbDatepickerKeyMapService]
        }),
        __metadata("design:paramtypes", [datepicker_keymap_service_1.NgbDatepickerKeyMapService, datepicker_service_1.NgbDatepickerService,
            ngb_calendar_1.NgbCalendar, datepicker_i18n_1.NgbDatepickerI18n, datepicker_config_1.NgbDatepickerConfig,
            core_1.ChangeDetectorRef, core_1.ElementRef, ngb_date_adapter_1.NgbDateAdapter])
    ], NgbDatepicker);
    return NgbDatepicker;
}());
exports.NgbDatepicker = NgbDatepicker;
//# sourceMappingURL=datepicker.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngb_calendar_1 = __webpack_require__(4);
var ngb_date_1 = __webpack_require__(3);
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var Subject_1 = __webpack_require__(77);
var datepicker_tools_1 = __webpack_require__(40);
var filter_1 = __webpack_require__(78);
var NgbDatepickerService = (function () {
    function NgbDatepickerService(_calendar) {
        this._calendar = _calendar;
        this._model$ = new Subject_1.Subject();
        this._select$ = new Subject_1.Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            selectedDate: null
        };
    }
    Object.defineProperty(NgbDatepickerService.prototype, "model$", {
        get: function () {
            return filter_1.filter.call(this._model$.asObservable(), function (model) { return model.months.length > 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "select$", {
        get: function () { return filter_1.filter.call(this._select$.asObservable(), function (date) { return date !== null; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "disabled", {
        set: function (disabled) {
            if (this._state.disabled !== disabled) {
                this._nextState({ disabled: disabled });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "displayMonths", {
        set: function (months) {
            if (util_1.isInteger(months) && months > 0 && this._state.displayMonths !== months) {
                this._nextState({ displayMonths: months });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "firstDayOfWeek", {
        set: function (firstDayOfWeek) {
            if (util_1.isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                this._nextState({ firstDayOfWeek: firstDayOfWeek });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "focusVisible", {
        set: function (focusVisible) {
            if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                this._nextState({ focusVisible: focusVisible });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "maxDate", {
        set: function (date) {
            if (date === undefined || this._calendar.isValid(date) && datepicker_tools_1.isChangedDate(this._state.maxDate, date)) {
                this._nextState({ maxDate: date });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "markDisabled", {
        set: function (markDisabled) {
            if (this._state.markDisabled !== markDisabled) {
                this._nextState({ markDisabled: markDisabled });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "minDate", {
        set: function (date) {
            if (date === undefined || this._calendar.isValid(date) && datepicker_tools_1.isChangedDate(this._state.minDate, date)) {
                this._nextState({ minDate: date });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "navigation", {
        set: function (navigation) {
            if (this._state.navigation !== navigation) {
                this._nextState({ navigation: navigation });
            }
        },
        enumerable: true,
        configurable: true
    });
    NgbDatepickerService.prototype.focus = function (date) {
        if (!this._state.disabled && this._calendar.isValid(date) && datepicker_tools_1.isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    };
    NgbDatepickerService.prototype.focusMove = function (period, number) {
        this.focus(this._calendar.getNext(this._state.focusDate, period, number));
    };
    NgbDatepickerService.prototype.focusSelect = function () {
        if (datepicker_tools_1.isDateSelectable(this._state.focusDate, this._state.minDate, this._state.maxDate, this._state.disabled, this._state.markDisabled)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    };
    NgbDatepickerService.prototype.open = function (date) {
        if (!this._state.disabled && this._calendar.isValid(date)) {
            this._nextState({ firstDate: date });
        }
    };
    NgbDatepickerService.prototype.select = function (date, options) {
        if (options === void 0) { options = {}; }
        var validDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (datepicker_tools_1.isChangedDate(this._state.selectedDate, validDate)) {
                this._nextState({ selectedDate: validDate });
            }
            if (options.emitEvent &&
                datepicker_tools_1.isDateSelectable(validDate, this._state.minDate, this._state.maxDate, this._state.disabled, this._state.markDisabled)) {
                this._select$.next(validDate);
            }
        }
    };
    NgbDatepickerService.prototype.toValidDate = function (date, defaultValue) {
        var ngbDate = ngb_date_1.NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    };
    NgbDatepickerService.prototype._nextState = function (patch) {
        var newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    };
    NgbDatepickerService.prototype._patchContexts = function (state) {
        state.months.forEach(function (month) {
            month.weeks.forEach(function (week) {
                week.days.forEach(function (day) {
                    // patch focus flag
                    if (state.focusDate) {
                        day.context.focused = state.focusDate.equals(day.date) && state.focusVisible;
                    }
                    // override context disabled
                    if (state.disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (state.selectedDate !== undefined) {
                        day.context.selected = state.selectedDate !== null && state.selectedDate.equals(day.date);
                    }
                });
            });
        });
    };
    NgbDatepickerService.prototype._updateState = function (patch) {
        // patching fields
        var state = Object.assign({}, this._state, patch);
        var startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            datepicker_tools_1.checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = datepicker_tools_1.checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = datepicker_tools_1.checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = datepicker_tools_1.checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = datepicker_tools_1.checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            var forceRebuild = 'firstDayOfWeek' in patch || 'markDisabled' in patch || 'minDate' in patch ||
                'maxDate' in patch || 'disabled' in patch;
            var months = datepicker_tools_1.buildMonths(this._calendar, state.months, startDate, state.minDate, state.maxDate, state.displayMonths, state.firstDayOfWeek, state.markDisabled, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && state.selectedDate !== null) {
                if (!datepicker_tools_1.isDateSelectable(state.selectedDate, state.minDate, state.maxDate, state.disabled, state.markDisabled)) {
                    state.selectedDate = null;
                }
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
        }
        return state;
    };
    NgbDatepickerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngb_calendar_1.NgbCalendar])
    ], NgbDatepickerService);
    return NgbDatepickerService;
}());
exports.NgbDatepickerService = NgbDatepickerService;
//# sourceMappingURL=datepicker-service.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbDatepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
var NgbDatepickerConfig = (function () {
    function NgbDatepickerConfig() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
    NgbDatepickerConfig = __decorate([
        core_1.Injectable()
    ], NgbDatepickerConfig);
    return NgbDatepickerConfig;
}());
exports.NgbDatepickerConfig = NgbDatepickerConfig;
//# sourceMappingURL=datepicker-config.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(1);
/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 */
var NgbDateParserFormatter = (function () {
    function NgbDateParserFormatter() {
    }
    return NgbDateParserFormatter;
}());
exports.NgbDateParserFormatter = NgbDateParserFormatter;
var NgbDateISOParserFormatter = (function (_super) {
    __extends(NgbDateISOParserFormatter, _super);
    function NgbDateISOParserFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgbDateISOParserFormatter.prototype.parse = function (value) {
        if (value) {
            var dateParts = value.trim().split('-');
            if (dateParts.length === 1 && util_1.isNumber(dateParts[0])) {
                return { year: util_1.toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && util_1.isNumber(dateParts[0]) && util_1.isNumber(dateParts[1])) {
                return { year: util_1.toInteger(dateParts[0]), month: util_1.toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && util_1.isNumber(dateParts[0]) && util_1.isNumber(dateParts[1]) && util_1.isNumber(dateParts[2])) {
                return { year: util_1.toInteger(dateParts[0]), month: util_1.toInteger(dateParts[1]), day: util_1.toInteger(dateParts[2]) };
            }
        }
        return null;
    };
    NgbDateISOParserFormatter.prototype.format = function (date) {
        return date ?
            date.year + "-" + (util_1.isNumber(date.month) ? util_1.padNumber(date.month) : '') + "-" + (util_1.isNumber(date.day) ? util_1.padNumber(date.day) : '') :
            '';
    };
    return NgbDateISOParserFormatter;
}(NgbDateParserFormatter));
exports.NgbDateISOParserFormatter = NgbDateISOParserFormatter;
//# sourceMappingURL=ngb-date-parser-formatter.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbDropdown directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
var NgbDropdownConfig = (function () {
    function NgbDropdownConfig() {
        this.autoClose = true;
        this.placement = 'bottom-left';
    }
    NgbDropdownConfig = __decorate([
        core_1.Injectable()
    ], NgbDropdownConfig);
    return NgbDropdownConfig;
}());
exports.NgbDropdownConfig = NgbDropdownConfig;
//# sourceMappingURL=dropdown-config.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbPagination component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
var NgbPaginationConfig = (function () {
    function NgbPaginationConfig() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
    NgbPaginationConfig = __decorate([
        core_1.Injectable()
    ], NgbPaginationConfig);
    return NgbPaginationConfig;
}());
exports.NgbPaginationConfig = NgbPaginationConfig;
//# sourceMappingURL=pagination-config.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbPopover directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
var NgbPopoverConfig = (function () {
    function NgbPopoverConfig() {
        this.placement = 'top';
        this.triggers = 'click';
    }
    NgbPopoverConfig = __decorate([
        core_1.Injectable()
    ], NgbPopoverConfig);
    return NgbPopoverConfig;
}());
exports.NgbPopoverConfig = NgbPopoverConfig;
//# sourceMappingURL=popover-config.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbProgressbar component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
var NgbProgressbarConfig = (function () {
    function NgbProgressbarConfig() {
        this.max = 100;
        this.animated = false;
        this.striped = false;
        this.showValue = false;
    }
    NgbProgressbarConfig = __decorate([
        core_1.Injectable()
    ], NgbProgressbarConfig);
    return NgbProgressbarConfig;
}());
exports.NgbProgressbarConfig = NgbProgressbarConfig;
//# sourceMappingURL=progressbar-config.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbRating component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
var NgbRatingConfig = (function () {
    function NgbRatingConfig() {
        this.max = 10;
        this.readonly = false;
        this.resettable = false;
    }
    NgbRatingConfig = __decorate([
        core_1.Injectable()
    ], NgbRatingConfig);
    return NgbRatingConfig;
}());
exports.NgbRatingConfig = NgbRatingConfig;
//# sourceMappingURL=rating-config.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
var NgbTabsetConfig = (function () {
    function NgbTabsetConfig() {
        this.justify = 'start';
        this.orientation = 'horizontal';
        this.type = 'tabs';
    }
    NgbTabsetConfig = __decorate([
        core_1.Injectable()
    ], NgbTabsetConfig);
    return NgbTabsetConfig;
}());
exports.NgbTabsetConfig = NgbTabsetConfig;
//# sourceMappingURL=tabset-config.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbTimepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
var NgbTimepickerConfig = (function () {
    function NgbTimepickerConfig() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
    NgbTimepickerConfig = __decorate([
        core_1.Injectable()
    ], NgbTimepickerConfig);
    return NgbTimepickerConfig;
}());
exports.NgbTimepickerConfig = NgbTimepickerConfig;
//# sourceMappingURL=timepicker-config.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbTooltip directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
var NgbTooltipConfig = (function () {
    function NgbTooltipConfig() {
        this.placement = 'top';
        this.triggers = 'hover';
    }
    NgbTooltipConfig = __decorate([
        core_1.Injectable()
    ], NgbTooltipConfig);
    return NgbTooltipConfig;
}());
exports.NgbTooltipConfig = NgbTooltipConfig;
//# sourceMappingURL=tooltip-config.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var NgbTypeaheadWindow = (function () {
    function NgbTypeaheadWindow() {
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = util_1.toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new core_1.EventEmitter();
        this.activeChangeEvent = new core_1.EventEmitter();
    }
    NgbTypeaheadWindow.prototype.getActive = function () { return this.results[this.activeIdx]; };
    NgbTypeaheadWindow.prototype.markActive = function (activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype.next = function () {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype.prev = function () {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype.select = function (item) { this.selectEvent.emit(item); };
    NgbTypeaheadWindow.prototype.ngOnInit = function () {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype._activeChanged = function () {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTypeaheadWindow.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTypeaheadWindow.prototype, "focusFirst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTypeaheadWindow.prototype, "results", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTypeaheadWindow.prototype, "term", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTypeaheadWindow.prototype, "formatter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], NgbTypeaheadWindow.prototype, "resultTemplate", void 0);
    __decorate([
        core_1.Output('select'),
        __metadata("design:type", Object)
    ], NgbTypeaheadWindow.prototype, "selectEvent", void 0);
    __decorate([
        core_1.Output('activeChange'),
        __metadata("design:type", Object)
    ], NgbTypeaheadWindow.prototype, "activeChangeEvent", void 0);
    NgbTypeaheadWindow = __decorate([
        core_1.Component({
            selector: 'ngb-typeahead-window',
            exportAs: 'ngbTypeaheadWindow',
            host: { 'class': 'dropdown-menu', 'style': 'display: block', 'role': 'listbox', '[id]': 'id' },
            template: "\n    <ng-template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </ng-template>\n    <ng-template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n      <button type=\"button\" class=\"dropdown-item\" role=\"option\"\n        [id]=\"id + '-' + idx\"\n        [class.active]=\"idx === activeIdx\"\n        (mouseenter)=\"markActive(idx)\"\n        (click)=\"select(result)\">\n          <ng-template [ngTemplateOutlet]=\"resultTemplate || rt\"\n          [ngTemplateOutletContext]=\"{result: result, term: term, formatter: formatter}\"></ng-template>\n      </button>\n    </ng-template>\n  "
        })
    ], NgbTypeaheadWindow);
    return NgbTypeaheadWindow;
}());
exports.NgbTypeaheadWindow = NgbTypeaheadWindow;
//# sourceMappingURL=typeahead-window.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Configuration service for the NgbTypeahead component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
var NgbTypeaheadConfig = (function () {
    function NgbTypeaheadConfig() {
        this.editable = true;
        this.focusFirst = true;
        this.showHint = false;
        this.placement = 'bottom-left';
    }
    NgbTypeaheadConfig = __decorate([
        core_1.Injectable()
    ], NgbTypeaheadConfig);
    return NgbTypeaheadConfig;
}());
exports.NgbTypeaheadConfig = NgbTypeaheadConfig;
//# sourceMappingURL=typeahead-config.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var accordion_1 = __webpack_require__(29);
var accordion_config_1 = __webpack_require__(11);
var accordion_2 = __webpack_require__(29);
exports.NgbAccordion = accordion_2.NgbAccordion;
exports.NgbPanel = accordion_2.NgbPanel;
exports.NgbPanelTitle = accordion_2.NgbPanelTitle;
exports.NgbPanelContent = accordion_2.NgbPanelContent;
var accordion_config_2 = __webpack_require__(11);
exports.NgbAccordionConfig = accordion_config_2.NgbAccordionConfig;
var NGB_ACCORDION_DIRECTIVES = [accordion_1.NgbAccordion, accordion_1.NgbPanel, accordion_1.NgbPanelTitle, accordion_1.NgbPanelContent];
var NgbAccordionModule = (function () {
    function NgbAccordionModule() {
    }
    NgbAccordionModule_1 = NgbAccordionModule;
    NgbAccordionModule.forRoot = function () { return { ngModule: NgbAccordionModule_1, providers: [accordion_config_1.NgbAccordionConfig] }; };
    NgbAccordionModule = NgbAccordionModule_1 = __decorate([
        core_1.NgModule({ declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [common_1.CommonModule] })
    ], NgbAccordionModule);
    return NgbAccordionModule;
    var NgbAccordionModule_1;
}());
exports.NgbAccordionModule = NgbAccordionModule;
//# sourceMappingURL=accordion.module.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var accordion_config_1 = __webpack_require__(11);
var nextId = 0;
/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
var NgbPanelTitle = (function () {
    function NgbPanelTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelTitle = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbPanelTitle]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbPanelTitle);
    return NgbPanelTitle;
}());
exports.NgbPanelTitle = NgbPanelTitle;
/**
 * This directive must be used to wrap accordion panel content.
 */
var NgbPanelContent = (function () {
    function NgbPanelContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelContent = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbPanelContent]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbPanelContent);
    return NgbPanelContent;
}());
exports.NgbPanelContent = NgbPanelContent;
/**
 * The NgbPanel directive represents an individual panel with the title and collapsible
 * content
 */
var NgbPanel = (function () {
    function NgbPanel() {
        /**
         *  A flag determining whether the panel is disabled or not.
         *  When disabled, the panel cannot be toggled.
         */
        this.disabled = false;
        /**
         *  An optional id for the panel. The id should be unique.
         *  If not provided, it will be auto-generated.
         */
        this.id = "ngb-panel-" + nextId++;
        /**
         * A flag telling if the panel is currently open
         */
        this.isOpen = false;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbPanel.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbPanel.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPanel.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPanel.prototype, "type", void 0);
    __decorate([
        core_1.ContentChild(NgbPanelContent),
        __metadata("design:type", NgbPanelContent)
    ], NgbPanel.prototype, "contentTpl", void 0);
    __decorate([
        core_1.ContentChild(NgbPanelTitle),
        __metadata("design:type", NgbPanelTitle)
    ], NgbPanel.prototype, "titleTpl", void 0);
    NgbPanel = __decorate([
        core_1.Directive({ selector: 'ngb-panel' })
    ], NgbPanel);
    return NgbPanel;
}());
exports.NgbPanel = NgbPanel;
/**
 * The NgbAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
var NgbAccordion = (function () {
    function NgbAccordion(config) {
        /**
         * An array or comma separated strings of panel identifiers that should be opened
         */
        this.activeIds = [];
        /**
         * Whether the closed panels should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
         */
        this.panelChange = new core_1.EventEmitter();
        this.type = config.type;
        this.closeOtherPanels = config.closeOthers;
    }
    /**
     * Programmatically toggle a panel with a given id.
     */
    NgbAccordion.prototype.toggle = function (panelId) {
        var panel = this.panels.find(function (p) { return p.id === panelId; });
        if (panel && !panel.disabled) {
            var defaultPrevented_1 = false;
            this.panelChange.emit({ panelId: panelId, nextState: !panel.isOpen, preventDefault: function () { defaultPrevented_1 = true; } });
            if (!defaultPrevented_1) {
                panel.isOpen = !panel.isOpen;
                if (this.closeOtherPanels) {
                    this._closeOthers(panelId);
                }
                this._updateActiveIds();
            }
        }
    };
    NgbAccordion.prototype.ngAfterContentChecked = function () {
        var _this = this;
        // active id updates
        if (util_1.isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach(function (panel) { return panel.isOpen = !panel.disabled && _this.activeIds.indexOf(panel.id) > -1; });
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    };
    NgbAccordion.prototype._closeOthers = function (panelId) {
        this.panels.forEach(function (panel) {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        });
    };
    NgbAccordion.prototype._updateActiveIds = function () {
        this.activeIds = this.panels.filter(function (panel) { return panel.isOpen && !panel.disabled; }).map(function (panel) { return panel.id; });
    };
    __decorate([
        core_1.ContentChildren(NgbPanel),
        __metadata("design:type", core_1.QueryList)
    ], NgbAccordion.prototype, "panels", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbAccordion.prototype, "activeIds", void 0);
    __decorate([
        core_1.Input('closeOthers'),
        __metadata("design:type", Boolean)
    ], NgbAccordion.prototype, "closeOtherPanels", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbAccordion.prototype, "destroyOnHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbAccordion.prototype, "type", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbAccordion.prototype, "panelChange", void 0);
    NgbAccordion = __decorate([
        core_1.Component({
            selector: 'ngb-accordion',
            exportAs: 'ngbAccordion',
            host: { 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
            template: "\n    <ng-template ngFor let-panel [ngForOf]=\"panels\">\n      <div class=\"card\">\n        <div role=\"tab\" id=\"{{panel.id}}-header\"\n          [class]=\"'card-header ' + (panel.type ? 'card-'+panel.type: type ? 'card-'+type : '')\" [class.active]=\"panel.isOpen\">\n          <a href (click)=\"!!toggle(panel.id)\" [class.text-muted]=\"panel.disabled\" [attr.tabindex]=\"(panel.disabled ? '-1' : null)\"\n            [attr.aria-expanded]=\"panel.isOpen\" [attr.aria-controls]=\"(panel.isOpen ? panel.id : null)\"\n            [attr.aria-disabled]=\"panel.disabled\">\n            {{panel.title}}<ng-template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></ng-template>\n          </a>\n        </div>\n        <div id=\"{{panel.id}}\" role=\"tabpanel\" [attr.aria-labelledby]=\"panel.id + '-header'\"\n             class=\"card-body collapse {{panel.isOpen ? 'show' : null}}\" *ngIf=\"!destroyOnHide || panel.isOpen\">\n             <ng-template [ngTemplateOutlet]=\"panel.contentTpl.templateRef\"></ng-template>\n        </div>\n      </div>\n    </ng-template>\n  "
        }),
        __metadata("design:paramtypes", [accordion_config_1.NgbAccordionConfig])
    ], NgbAccordion);
    return NgbAccordion;
}());
exports.NgbAccordion = NgbAccordion;
//# sourceMappingURL=accordion.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var alert_1 = __webpack_require__(31);
var alert_config_1 = __webpack_require__(12);
var alert_2 = __webpack_require__(31);
exports.NgbAlert = alert_2.NgbAlert;
var alert_config_2 = __webpack_require__(12);
exports.NgbAlertConfig = alert_config_2.NgbAlertConfig;
var NgbAlertModule = (function () {
    function NgbAlertModule() {
    }
    NgbAlertModule_1 = NgbAlertModule;
    NgbAlertModule.forRoot = function () { return { ngModule: NgbAlertModule_1, providers: [alert_config_1.NgbAlertConfig] }; };
    NgbAlertModule = NgbAlertModule_1 = __decorate([
        core_1.NgModule({ declarations: [alert_1.NgbAlert], exports: [alert_1.NgbAlert], imports: [common_1.CommonModule], entryComponents: [alert_1.NgbAlert] })
    ], NgbAlertModule);
    return NgbAlertModule;
    var NgbAlertModule_1;
}());
exports.NgbAlertModule = NgbAlertModule;
//# sourceMappingURL=alert.module.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var alert_config_1 = __webpack_require__(12);
/**
 * Alerts can be used to provide feedback messages.
 */
var NgbAlert = (function () {
    function NgbAlert(config) {
        /**
         * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
         */
        this.close = new core_1.EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
    }
    NgbAlert.prototype.closeHandler = function () { this.close.emit(null); };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbAlert.prototype, "dismissible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbAlert.prototype, "type", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbAlert.prototype, "close", void 0);
    NgbAlert = __decorate([
        core_1.Component({
            selector: 'ngb-alert',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div [class]=\"'alert alert-' + type + (dismissible ? ' alert-dismissible' : '')\" role=\"alert\">\n      <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeHandler()\">\n            <span aria-hidden=\"true\">&times;</span>\n      </button>\n      <ng-content></ng-content>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [alert_config_1.NgbAlertConfig])
    ], NgbAlert);
    return NgbAlert;
}());
exports.NgbAlert = NgbAlert;
//# sourceMappingURL=alert.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var label_1 = __webpack_require__(8);
var checkbox_1 = __webpack_require__(33);
var radio_1 = __webpack_require__(34);
var label_2 = __webpack_require__(8);
exports.NgbButtonLabel = label_2.NgbButtonLabel;
var checkbox_2 = __webpack_require__(33);
exports.NgbCheckBox = checkbox_2.NgbCheckBox;
var radio_2 = __webpack_require__(34);
exports.NgbRadio = radio_2.NgbRadio;
exports.NgbRadioGroup = radio_2.NgbRadioGroup;
var NGB_BUTTON_DIRECTIVES = [label_1.NgbButtonLabel, checkbox_1.NgbCheckBox, radio_1.NgbRadioGroup, radio_1.NgbRadio];
var NgbButtonsModule = (function () {
    function NgbButtonsModule() {
    }
    NgbButtonsModule_1 = NgbButtonsModule;
    NgbButtonsModule.forRoot = function () { return { ngModule: NgbButtonsModule_1, providers: [] }; };
    NgbButtonsModule = NgbButtonsModule_1 = __decorate([
        core_1.NgModule({ declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES })
    ], NgbButtonsModule);
    return NgbButtonsModule;
    var NgbButtonsModule_1;
}());
exports.NgbButtonsModule = NgbButtonsModule;
//# sourceMappingURL=buttons.module.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(5);
var label_1 = __webpack_require__(8);
var NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbCheckBox; }),
    multi: true
};
/**
 * Easily create Bootstrap-style checkbox buttons. A value of a checked button is bound to a variable
 * specified via ngModel.
 */
var NgbCheckBox = (function () {
    function NgbCheckBox(_label) {
        this._label = _label;
        /**
         * A flag indicating if a given checkbox button is disabled.
         */
        this.disabled = false;
        /**
         * Value to be propagated as model when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * Value to be propagated as model when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NgbCheckBox.prototype, "focused", {
        set: function (isFocused) {
            this._label.focused = isFocused;
            if (!isFocused) {
                this.onTouched();
            }
        },
        enumerable: true,
        configurable: true
    });
    NgbCheckBox.prototype.onInputChange = function ($event) {
        var modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    };
    NgbCheckBox.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbCheckBox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbCheckBox.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    };
    NgbCheckBox.prototype.writeValue = function (value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbCheckBox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbCheckBox.prototype, "valueChecked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbCheckBox.prototype, "valueUnChecked", void 0);
    NgbCheckBox = __decorate([
        core_1.Directive({
            selector: '[ngbButton][type=checkbox]',
            host: {
                'autocomplete': 'off',
                '[checked]': 'checked',
                '[disabled]': 'disabled',
                '(change)': 'onInputChange($event)',
                '(focus)': 'focused = true',
                '(blur)': 'focused = false'
            },
            providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [label_1.NgbButtonLabel])
    ], NgbCheckBox);
    return NgbCheckBox;
}());
exports.NgbCheckBox = NgbCheckBox;
//# sourceMappingURL=checkbox.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(5);
var label_1 = __webpack_require__(8);
var NGB_RADIO_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbRadioGroup; }),
    multi: true
};
var nextId = 0;
/**
 * Easily create Bootstrap-style radio buttons. A value of a selected button is bound to a variable
 * specified via ngModel.
 */
var NgbRadioGroup = (function () {
    function NgbRadioGroup() {
        this._radios = new Set();
        this._value = null;
        /**
         * The name of the group. Unless enclosed inputs specify a name, this name is used as the name of the
         * enclosed inputs. If not specified, a name is generated automatically.
         */
        this.name = "ngb-radio-" + nextId++;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NgbRadioGroup.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (isDisabled) { this.setDisabledState(isDisabled); },
        enumerable: true,
        configurable: true
    });
    NgbRadioGroup.prototype.onRadioChange = function (radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    };
    NgbRadioGroup.prototype.onRadioValueUpdate = function () { this._updateRadiosValue(); };
    NgbRadioGroup.prototype.register = function (radio) { this._radios.add(radio); };
    NgbRadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbRadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbRadioGroup.prototype.setDisabledState = function (isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    };
    NgbRadioGroup.prototype.unregister = function (radio) { this._radios.delete(radio); };
    NgbRadioGroup.prototype.writeValue = function (value) {
        this._value = value;
        this._updateRadiosValue();
    };
    NgbRadioGroup.prototype._updateRadiosValue = function () {
        var _this = this;
        this._radios.forEach(function (radio) { return radio.updateValue(_this._value); });
    };
    NgbRadioGroup.prototype._updateRadiosDisabled = function () { this._radios.forEach(function (radio) { return radio.updateDisabled(); }); };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbRadioGroup.prototype, "name", void 0);
    NgbRadioGroup = __decorate([
        core_1.Directive({ selector: '[ngbRadioGroup]', host: { 'role': 'group' }, providers: [NGB_RADIO_VALUE_ACCESSOR] })
    ], NgbRadioGroup);
    return NgbRadioGroup;
}());
exports.NgbRadioGroup = NgbRadioGroup;
/**
 * Marks an input of type "radio" as part of the NgbRadioGroup.
 */
var NgbRadio = (function () {
    function NgbRadio(_group, _label, _renderer, _element) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._value = null;
        this._group.register(this);
    }
    Object.defineProperty(NgbRadio.prototype, "value", {
        get: function () { return this._value; },
        /**
         * You can specify model value of a given radio by binding to the value property.
         */
        set: function (value) {
            this._value = value;
            var stringValue = value ? value.toString() : '';
            this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
            this._group.onRadioValueUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "disabled", {
        get: function () { return this._group.disabled || this._disabled; },
        /**
         * A flag indicating if a given radio button is disabled.
         */
        set: function (isDisabled) {
            this._disabled = isDisabled !== false;
            this.updateDisabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "focused", {
        set: function (isFocused) {
            if (this._label) {
                this._label.focused = isFocused;
            }
            if (!isFocused) {
                this._group.onTouched();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "checked", {
        get: function () { return this._checked; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "nameAttr", {
        get: function () { return this.name || this._group.name; },
        enumerable: true,
        configurable: true
    });
    NgbRadio.prototype.ngOnDestroy = function () { this._group.unregister(this); };
    NgbRadio.prototype.onChange = function () { this._group.onRadioChange(this); };
    NgbRadio.prototype.updateValue = function (value) {
        this._checked = this.value === value;
        this._label.active = this._checked;
    };
    NgbRadio.prototype.updateDisabled = function () { this._label.disabled = this.disabled; };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbRadio.prototype, "name", void 0);
    __decorate([
        core_1.Input('value'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgbRadio.prototype, "value", null);
    __decorate([
        core_1.Input('disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NgbRadio.prototype, "disabled", null);
    NgbRadio = __decorate([
        core_1.Directive({
            selector: '[ngbButton][type=radio]',
            host: {
                '[checked]': 'checked',
                '[disabled]': 'disabled',
                '[name]': 'nameAttr',
                '(change)': 'onChange()',
                '(focus)': 'focused = true',
                '(blur)': 'focused = false'
            }
        }),
        __metadata("design:paramtypes", [NgbRadioGroup, label_1.NgbButtonLabel, core_1.Renderer2,
            core_1.ElementRef])
    ], NgbRadio);
    return NgbRadio;
}());
exports.NgbRadio = NgbRadio;
//# sourceMappingURL=radio.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var carousel_1 = __webpack_require__(36);
var carousel_config_1 = __webpack_require__(13);
var carousel_2 = __webpack_require__(36);
exports.NgbCarousel = carousel_2.NgbCarousel;
exports.NgbSlide = carousel_2.NgbSlide;
var carousel_config_2 = __webpack_require__(13);
exports.NgbCarouselConfig = carousel_config_2.NgbCarouselConfig;
var NgbCarouselModule = (function () {
    function NgbCarouselModule() {
    }
    NgbCarouselModule_1 = NgbCarouselModule;
    NgbCarouselModule.forRoot = function () { return { ngModule: NgbCarouselModule_1, providers: [carousel_config_1.NgbCarouselConfig] }; };
    NgbCarouselModule = NgbCarouselModule_1 = __decorate([
        core_1.NgModule({ declarations: carousel_1.NGB_CAROUSEL_DIRECTIVES, exports: carousel_1.NGB_CAROUSEL_DIRECTIVES, imports: [common_1.CommonModule] })
    ], NgbCarouselModule);
    return NgbCarouselModule;
    var NgbCarouselModule_1;
}());
exports.NgbCarouselModule = NgbCarouselModule;
//# sourceMappingURL=carousel.module.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var carousel_config_1 = __webpack_require__(13);
var nextId = 0;
/**
 * Represents an individual slide to be used within a carousel.
 */
var NgbSlide = (function () {
    function NgbSlide(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = "ngb-slide-" + nextId++;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbSlide.prototype, "id", void 0);
    NgbSlide = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbSlide]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbSlide);
    return NgbSlide;
}());
exports.NgbSlide = NgbSlide;
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
var NgbCarousel = (function () {
    function NgbCarousel(config) {
        /**
         * A carousel slide event fired when the slide transition is completed.
         * See NgbSlideEvent for payload details
         */
        this.slide = new core_1.EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
    }
    NgbCarousel.prototype.ngAfterContentChecked = function () {
        var activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    };
    NgbCarousel.prototype.ngOnInit = function () { this._startTimer(); };
    NgbCarousel.prototype.ngOnChanges = function (changes) {
        if ('interval' in changes && !changes['interval'].isFirstChange()) {
            this._restartTimer();
        }
    };
    NgbCarousel.prototype.ngOnDestroy = function () { clearInterval(this._slideChangeInterval); };
    /**
     * Navigate to a slide with the specified identifier.
     */
    NgbCarousel.prototype.select = function (slideId) {
        this.cycleToSelected(slideId, this.getSlideEventDirection(this.activeId, slideId));
        this._restartTimer();
    };
    /**
     * Navigate to the next slide.
     */
    NgbCarousel.prototype.prev = function () {
        this.cycleToPrev();
        this._restartTimer();
    };
    /**
     * Navigate to the next slide.
     */
    NgbCarousel.prototype.next = function () {
        this.cycleToNext();
        this._restartTimer();
    };
    /**
     * Stops the carousel from cycling through items.
     */
    NgbCarousel.prototype.pause = function () { this._stopTimer(); };
    /**
     * Restarts cycling through the carousel slides from left to right.
     */
    NgbCarousel.prototype.cycle = function () { this._startTimer(); };
    NgbCarousel.prototype.cycleToNext = function () { this.cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT); };
    NgbCarousel.prototype.cycleToPrev = function () { this.cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT); };
    NgbCarousel.prototype.cycleToSelected = function (slideIdx, direction) {
        var selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide) {
            if (selectedSlide.id !== this.activeId) {
                this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction });
            }
            this.activeId = selectedSlide.id;
        }
    };
    NgbCarousel.prototype.getSlideEventDirection = function (currentActiveSlideId, nextActiveSlideId) {
        var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    };
    NgbCarousel.prototype.keyPrev = function () {
        if (this.keyboard) {
            this.prev();
        }
    };
    NgbCarousel.prototype.keyNext = function () {
        if (this.keyboard) {
            this.next();
        }
    };
    NgbCarousel.prototype._restartTimer = function () {
        this._stopTimer();
        this._startTimer();
    };
    NgbCarousel.prototype._startTimer = function () {
        var _this = this;
        if (this.interval > 0) {
            this._slideChangeInterval = setInterval(function () { _this.cycleToNext(); }, this.interval);
        }
    };
    NgbCarousel.prototype._stopTimer = function () { clearInterval(this._slideChangeInterval); };
    NgbCarousel.prototype._getSlideById = function (slideId) {
        var slideWithId = this.slides.filter(function (slide) { return slide.id === slideId; });
        return slideWithId.length ? slideWithId[0] : null;
    };
    NgbCarousel.prototype._getSlideIdxById = function (slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    };
    NgbCarousel.prototype._getNextSlide = function (currentSlideId) {
        var slideArr = this.slides.toArray();
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        var isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    };
    NgbCarousel.prototype._getPrevSlide = function (currentSlideId) {
        var slideArr = this.slides.toArray();
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        var isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    };
    __decorate([
        core_1.ContentChildren(NgbSlide),
        __metadata("design:type", core_1.QueryList)
    ], NgbCarousel.prototype, "slides", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbCarousel.prototype, "interval", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbCarousel.prototype, "wrap", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbCarousel.prototype, "keyboard", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbCarousel.prototype, "activeId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbCarousel.prototype, "slide", void 0);
    NgbCarousel = __decorate([
        core_1.Component({
            selector: 'ngb-carousel',
            exportAs: 'ngbCarousel',
            host: {
                'class': 'carousel slide',
                '[style.display]': '"block"',
                'tabIndex': '0',
                '(mouseenter)': 'pause()',
                '(mouseleave)': 'cycle()',
                '(keydown.arrowLeft)': 'keyPrev()',
                '(keydown.arrowRight)': 'keyNext()'
            },
            template: "\n    <ol class=\"carousel-indicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\"\n          (click)=\"cycleToSelected(slide.id, getSlideEventDirection(activeId, slide.id))\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"cycleToPrev()\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"cycleToNext()\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n    "
        }),
        __metadata("design:paramtypes", [carousel_config_1.NgbCarouselConfig])
    ], NgbCarousel);
    return NgbCarousel;
}());
exports.NgbCarousel = NgbCarousel;
/**
 * Enum to define the carousel slide event direction
 */
var NgbSlideEventDirection;
(function (NgbSlideEventDirection) {
    NgbSlideEventDirection[NgbSlideEventDirection["LEFT"] = 'left'] = "LEFT";
    NgbSlideEventDirection[NgbSlideEventDirection["RIGHT"] = 'right'] = "RIGHT";
})(NgbSlideEventDirection = exports.NgbSlideEventDirection || (exports.NgbSlideEventDirection = {}));
exports.NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=carousel.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var collapse_1 = __webpack_require__(38);
var collapse_2 = __webpack_require__(38);
exports.NgbCollapse = collapse_2.NgbCollapse;
var NgbCollapseModule = (function () {
    function NgbCollapseModule() {
    }
    NgbCollapseModule_1 = NgbCollapseModule;
    NgbCollapseModule.forRoot = function () { return { ngModule: NgbCollapseModule_1, providers: [] }; };
    NgbCollapseModule = NgbCollapseModule_1 = __decorate([
        core_1.NgModule({ declarations: [collapse_1.NgbCollapse], exports: [collapse_1.NgbCollapse] })
    ], NgbCollapseModule);
    return NgbCollapseModule;
    var NgbCollapseModule_1;
}());
exports.NgbCollapseModule = NgbCollapseModule;
//# sourceMappingURL=collapse.module.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * The NgbCollapse directive provides a simple way to hide and show an element with animations.
 */
var NgbCollapse = (function () {
    function NgbCollapse() {
        /**
         * A flag indicating collapsed (true) or open (false) state.
         */
        this.collapsed = false;
    }
    __decorate([
        core_1.Input('ngbCollapse'),
        __metadata("design:type", Object)
    ], NgbCollapse.prototype, "collapsed", void 0);
    NgbCollapse = __decorate([
        core_1.Directive({
            selector: '[ngbCollapse]',
            exportAs: 'ngbCollapse',
            host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
        })
    ], NgbCollapse);
    return NgbCollapse;
}());
exports.NgbCollapse = NgbCollapse;
//# sourceMappingURL=collapse.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var datepicker_1 = __webpack_require__(14);
var datepicker_month_view_1 = __webpack_require__(42);
var datepicker_navigation_1 = __webpack_require__(43);
var datepicker_input_1 = __webpack_require__(44);
var forms_1 = __webpack_require__(5);
var datepicker_day_view_1 = __webpack_require__(45);
var datepicker_i18n_1 = __webpack_require__(6);
var ngb_calendar_1 = __webpack_require__(4);
var ngb_date_parser_formatter_1 = __webpack_require__(17);
var ngb_date_adapter_1 = __webpack_require__(9);
var datepicker_navigation_select_1 = __webpack_require__(46);
var datepicker_config_1 = __webpack_require__(16);
var datepicker_2 = __webpack_require__(14);
exports.NgbDatepicker = datepicker_2.NgbDatepicker;
var datepicker_input_2 = __webpack_require__(44);
exports.NgbInputDatepicker = datepicker_input_2.NgbInputDatepicker;
var ngb_calendar_2 = __webpack_require__(4);
exports.NgbCalendar = ngb_calendar_2.NgbCalendar;
var ngb_calendar_islamic_civil_1 = __webpack_require__(47);
exports.NgbCalendarIslamicCivil = ngb_calendar_islamic_civil_1.NgbCalendarIslamicCivil;
var ngb_calendar_islamic_umalqura_1 = __webpack_require__(80);
exports.NgbCalendarIslamicUmalqura = ngb_calendar_islamic_umalqura_1.NgbCalendarIslamicUmalqura;
var datepicker_month_view_2 = __webpack_require__(42);
exports.NgbDatepickerMonthView = datepicker_month_view_2.NgbDatepickerMonthView;
var datepicker_day_view_2 = __webpack_require__(45);
exports.NgbDatepickerDayView = datepicker_day_view_2.NgbDatepickerDayView;
var datepicker_navigation_2 = __webpack_require__(43);
exports.NgbDatepickerNavigation = datepicker_navigation_2.NgbDatepickerNavigation;
var datepicker_navigation_select_2 = __webpack_require__(46);
exports.NgbDatepickerNavigationSelect = datepicker_navigation_select_2.NgbDatepickerNavigationSelect;
var datepicker_config_2 = __webpack_require__(16);
exports.NgbDatepickerConfig = datepicker_config_2.NgbDatepickerConfig;
var datepicker_i18n_2 = __webpack_require__(6);
exports.NgbDatepickerI18n = datepicker_i18n_2.NgbDatepickerI18n;
var ngb_date_adapter_2 = __webpack_require__(9);
exports.NgbDateAdapter = ngb_date_adapter_2.NgbDateAdapter;
var ngb_date_parser_formatter_2 = __webpack_require__(17);
exports.NgbDateParserFormatter = ngb_date_parser_formatter_2.NgbDateParserFormatter;
var NgbDatepickerModule = (function () {
    function NgbDatepickerModule() {
    }
    NgbDatepickerModule_1 = NgbDatepickerModule;
    NgbDatepickerModule.forRoot = function () {
        return {
            ngModule: NgbDatepickerModule_1,
            providers: [
                { provide: ngb_calendar_1.NgbCalendar, useClass: ngb_calendar_1.NgbCalendarGregorian },
                { provide: datepicker_i18n_1.NgbDatepickerI18n, useClass: datepicker_i18n_1.NgbDatepickerI18nDefault },
                { provide: ngb_date_parser_formatter_1.NgbDateParserFormatter, useClass: ngb_date_parser_formatter_1.NgbDateISOParserFormatter },
                { provide: ngb_date_adapter_1.NgbDateAdapter, useClass: ngb_date_adapter_1.NgbDateStructAdapter }, datepicker_config_1.NgbDatepickerConfig
            ]
        };
    };
    NgbDatepickerModule = NgbDatepickerModule_1 = __decorate([
        core_1.NgModule({
            declarations: [
                datepicker_1.NgbDatepicker, datepicker_month_view_1.NgbDatepickerMonthView, datepicker_navigation_1.NgbDatepickerNavigation, datepicker_navigation_select_1.NgbDatepickerNavigationSelect, datepicker_day_view_1.NgbDatepickerDayView,
                datepicker_input_1.NgbInputDatepicker
            ],
            exports: [datepicker_1.NgbDatepicker, datepicker_input_1.NgbInputDatepicker],
            imports: [common_1.CommonModule, forms_1.FormsModule],
            entryComponents: [datepicker_1.NgbDatepicker]
        })
    ], NgbDatepickerModule);
    return NgbDatepickerModule;
    var NgbDatepickerModule_1;
}());
exports.NgbDatepickerModule = NgbDatepickerModule;
//# sourceMappingURL=datepicker.module.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ngb_date_1 = __webpack_require__(3);
var util_1 = __webpack_require__(1);
function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
exports.isChangedDate = isChangedDate;
function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
exports.dateComparator = dateComparator;
function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error("'maxDate' " + maxDate + " should be greater than 'minDate' " + minDate);
    }
}
exports.checkMinBeforeMax = checkMinBeforeMax;
function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return ngb_date_1.NgbDate.from(minDate);
    }
    if (date && maxDate && date.after(maxDate)) {
        return ngb_date_1.NgbDate.from(maxDate);
    }
    return date;
}
exports.checkDateInRange = checkDateInRange;
function isDateSelectable(date, minDate, maxDate, isDisabled, markDisabled) {
    // clang-format off
    return !(!util_1.isDefined(date) ||
        isDisabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
    // clang-format on
}
exports.isDateSelectable = isDateSelectable;
function buildMonths(calendar, months, date, minDate, maxDate, displayMonths, firstDayOfWeek, markDisabled, force) {
    var newMonths = [];
    var _loop_1 = function (i) {
        var newDate = calendar.getNext(date, 'm', i);
        var index = months.findIndex(function (month) { return month.firstDate.equals(newDate); });
        if (force || index === -1) {
            newMonths.push(buildMonth(calendar, newDate, minDate, maxDate, firstDayOfWeek, markDisabled));
        }
        else {
            newMonths.push(months[index]);
        }
    };
    for (var i = 0; i < displayMonths; i++) {
        _loop_1(i);
    }
    return newMonths;
}
exports.buildMonths = buildMonths;
function buildMonth(calendar, date, minDate, maxDate, firstDayOfWeek, markDisabled) {
    var month = { firstDate: null, lastDate: null, number: date.month, year: date.year, weeks: [], weekdays: [] };
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // month has weeks
    for (var week = 0; week < calendar.getWeeksPerMonth(); week++) {
        var days = [];
        // week has days
        for (var day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0) {
                month.weekdays.push(calendar.getWeekday(date));
            }
            var newDate = new ngb_date_1.NgbDate(date.year, date.month, date.day);
            var nextDate = calendar.getNext(newDate);
            // marking date as disabled
            var disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            days.push({
                date: newDate,
                context: {
                    date: { year: newDate.year, month: newDate.month, day: newDate.day },
                    currentMonth: month.number,
                    disabled: disabled,
                    focused: false,
                    selected: false
                }
            });
            date = nextDate;
        }
        month.weeks.push({ number: calendar.getWeekNumber(days.map(function (day) { return ngb_date_1.NgbDate.from(day.date); }), firstDayOfWeek), days: days });
    }
    return month;
}
exports.buildMonth = buildMonth;
function getFirstViewDate(calendar, date, firstDayOfWeek) {
    var currentMonth = date.month;
    var today = new ngb_date_1.NgbDate(date.year, date.month, date.day);
    var yesterday = calendar.getPrev(today);
    var firstDayOfCurrentMonthIsAlsoFirstDayOfWeek = function () { return today.month !== yesterday.month && firstDayOfWeek === calendar.getWeekday(today); };
    var reachedTheFirstDayOfTheLastWeekOfPreviousMonth = function () { return today.month !== currentMonth && firstDayOfWeek === calendar.getWeekday(today); };
    // going back in time
    while (!reachedTheFirstDayOfTheLastWeekOfPreviousMonth() && !firstDayOfCurrentMonthIsAlsoFirstDayOfWeek()) {
        today = new ngb_date_1.NgbDate(yesterday.year, yesterday.month, yesterday.day);
        yesterday = calendar.getPrev(yesterday);
    }
    return today;
}
exports.getFirstViewDate = getFirstViewDate;
//# sourceMappingURL=datepicker-tools.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// clang-format on
var NavigationEvent;
(function (NavigationEvent) {
    NavigationEvent[NavigationEvent["PREV"] = 0] = "PREV";
    NavigationEvent[NavigationEvent["NEXT"] = 1] = "NEXT";
})(NavigationEvent = exports.NavigationEvent || (exports.NavigationEvent = {}));
//# sourceMappingURL=datepicker-view-model.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ngb_date_1 = __webpack_require__(3);
var datepicker_i18n_1 = __webpack_require__(6);
var NgbDatepickerMonthView = (function () {
    function NgbDatepickerMonthView(i18n) {
        this.i18n = i18n;
        this.select = new core_1.EventEmitter();
    }
    NgbDatepickerMonthView.prototype.doSelect = function (day) {
        if (!day.context.disabled && !this.isHidden(day)) {
            this.select.emit(ngb_date_1.NgbDate.from(day.date));
        }
    };
    NgbDatepickerMonthView.prototype.isCollapsed = function (week) {
        return this.outsideDays === 'collapsed' && week.days[0].date.month !== this.month.number &&
            week.days[week.days.length - 1].date.month !== this.month.number;
    };
    NgbDatepickerMonthView.prototype.isHidden = function (day) {
        return (this.outsideDays === 'hidden' || this.outsideDays === 'collapsed') && this.month.number !== day.date.month;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], NgbDatepickerMonthView.prototype, "dayTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepickerMonthView.prototype, "month", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbDatepickerMonthView.prototype, "outsideDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepickerMonthView.prototype, "showWeekdays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepickerMonthView.prototype, "showWeekNumbers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDatepickerMonthView.prototype, "select", void 0);
    NgbDatepickerMonthView = __decorate([
        core_1.Component({
            selector: 'ngb-datepicker-month-view',
            host: { 'class': 'd-block' },
            styles: ["\n    .ngb-dp-weekday, .ngb-dp-week-number {\n      line-height: 2rem;\n    }\n    .ngb-dp-weekday {\n      color: #5bc0de;\n    }\n    .ngb-dp-week {\n        border-radius: 0.25rem;\n        display: flex;\n    }\n    .ngb-dp-weekdays {\n      border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n      border-radius: 0rem;\n    }\n    .ngb-dp-day, .ngb-dp-weekday, .ngb-dp-week-number {\n      width: 2rem;\n      height: 2rem;\n    }\n    .ngb-dp-day {\n      cursor: pointer;\n    }\n    .ngb-dp-day.disabled, .ngb-dp-day.hidden {\n      cursor: default;\n    }\n  "],
            template: "\n    <div *ngIf=\"showWeekdays\" class=\"ngb-dp-week ngb-dp-weekdays bg-light\">\n      <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-weekday ngb-dp-showweek\"></div>\n      <div *ngFor=\"let w of month.weekdays\" class=\"ngb-dp-weekday small text-center font-italic\">\n        {{ i18n.getWeekdayShortName(w) }}\n      </div>\n    </div>\n    <ng-template ngFor let-week [ngForOf]=\"month.weeks\">\n      <div *ngIf=\"!isCollapsed(week)\" class=\"ngb-dp-week\">\n        <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-week-number small text-center font-italic text-muted\">{{ week.number }}</div>\n        <div *ngFor=\"let day of week.days\" (click)=\"doSelect(day)\" class=\"ngb-dp-day\" [class.disabled]=\"day.context.disabled\"\n         [class.hidden]=\"isHidden(day)\">\n          <ng-template [ngIf]=\"!isHidden(day)\">\n            <ng-template [ngTemplateOutlet]=\"dayTemplate\" [ngTemplateOutletContext]=\"day.context\"></ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </ng-template>\n  "
        }),
        __metadata("design:paramtypes", [datepicker_i18n_1.NgbDatepickerI18n])
    ], NgbDatepickerMonthView);
    return NgbDatepickerMonthView;
}());
exports.NgbDatepickerMonthView = NgbDatepickerMonthView;
//# sourceMappingURL=datepicker-month-view.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var datepicker_view_model_1 = __webpack_require__(41);
var ngb_date_1 = __webpack_require__(3);
var datepicker_i18n_1 = __webpack_require__(6);
var ngb_calendar_1 = __webpack_require__(4);
var NgbDatepickerNavigation = (function () {
    function NgbDatepickerNavigation(i18n, _calendar) {
        this.i18n = i18n;
        this._calendar = _calendar;
        this.navigation = datepicker_view_model_1.NavigationEvent;
        this.months = [];
        this.navigate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    NgbDatepickerNavigation.prototype.doNavigate = function (event) { this.navigate.emit(event); };
    NgbDatepickerNavigation.prototype.nextDisabled = function () {
        return this.disabled || (this.maxDate && this._calendar.getNext(this.date, 'm').after(this.maxDate));
    };
    NgbDatepickerNavigation.prototype.prevDisabled = function () {
        var prevDate = this._calendar.getPrev(this.date, 'm');
        return this.disabled || (this.minDate && prevDate.year <= this.minDate.year && prevDate.month < this.minDate.month);
    };
    NgbDatepickerNavigation.prototype.selectDate = function (date) { this.select.emit(date); };
    __decorate([
        core_1.Input(),
        __metadata("design:type", ngb_date_1.NgbDate)
    ], NgbDatepickerNavigation.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerNavigation.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", ngb_date_1.NgbDate)
    ], NgbDatepickerNavigation.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", ngb_date_1.NgbDate)
    ], NgbDatepickerNavigation.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgbDatepickerNavigation.prototype, "months", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerNavigation.prototype, "showSelect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerNavigation.prototype, "showWeekNumbers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDatepickerNavigation.prototype, "navigate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDatepickerNavigation.prototype, "select", void 0);
    NgbDatepickerNavigation = __decorate([
        core_1.Component({
            selector: 'ngb-datepicker-navigation',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ["\n    :host {\n      height: 2rem;\n      line-height: 1.85rem;\n      display: flex;\n    }\n    .ngb-dp-navigation-chevron::before {\n      border-style: solid;\n      border-width: 0.2em 0.2em 0 0;\n      content: '';\n      display: inline-block;\n      width: 0.75em;\n      height: 0.75em;\n      transform: rotate(-135deg);\n      -webkit-transform: rotate(-135deg);\n      -ms-transform: rotate(-135deg);\n    }\n    .right .ngb-dp-navigation-chevron:before {\n      -webkit-transform: rotate(45deg);\n      -ms-transform: rotate(45deg);\n      transform: rotate(45deg);\n    }\n    .ngb-dp-arrow {\n      display: flex;\n      flex-basis: auto;\n      flex-grow: 1;\n      padding-right: 0px;\n      padding-left: 0px;\n      margin: 0px;\n      width: 2rem;\n      height: 2rem;\n    }\n    .ngb-dp-arrow.right {\n      justify-content: flex-end;\n    }\n    .ngb-dp-arrow-btn {\n      padding: 0rem 1rem;\n    }\n    .ngb-dp-month-name {\n      font-size: larger;\n      height: 2rem;\n      line-height: 2rem;\n      text-align: center;\n    }\n    .ngb-dp-navigation-select {\n      flex-grow: 1;\n      flex-basis: 9rem;\n    }\n  "],
            template: "\n  <div class=\"ngb-dp-arrow\">\n    <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\"\n            (click)=\"!!doNavigate(navigation.PREV)\" [disabled]=\"prevDisabled()\" tabindex=\"-1\">\n      <span class=\"ngb-dp-navigation-chevron\"></span>\n    </button>\n  </div>\n    <ngb-datepicker-navigation-select *ngIf=\"showSelect\" class=\"d-block ngb-dp-navigation-select\"\n      [date]=\"date\"\n      [minDate]=\"minDate\"\n      [maxDate]=\"maxDate\"\n      [disabled] = \"disabled\"\n      (select)=\"selectDate($event)\">\n    </ngb-datepicker-navigation-select>\n\n    <ng-template *ngIf=\"!showSelect\" ngFor let-month [ngForOf]=\"months\" let-i=\"index\">\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i > 0\"></div>\n      <div class=\"ngb-dp-month-name d-block\">\n        {{ i18n.getMonthFullName(month.number) }} {{ month.year }}\n      </div>\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i !== months.length - 1\"></div>\n    </ng-template>\n    <div class=\"ngb-dp-arrow right\">\n    <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\"\n            (click)=\"!!doNavigate(navigation.NEXT)\" [disabled]=\"nextDisabled()\" tabindex=\"-1\">\n      <span class=\"ngb-dp-navigation-chevron\"></span>\n    </button>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [datepicker_i18n_1.NgbDatepickerI18n, ngb_calendar_1.NgbCalendar])
    ], NgbDatepickerNavigation);
    return NgbDatepickerNavigation;
}());
exports.NgbDatepickerNavigation = NgbDatepickerNavigation;
//# sourceMappingURL=datepicker-navigation.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(5);
var ngb_date_1 = __webpack_require__(3);
var datepicker_1 = __webpack_require__(14);
var ngb_date_parser_formatter_1 = __webpack_require__(17);
var positioning_1 = __webpack_require__(7);
var ngb_date_adapter_1 = __webpack_require__(9);
var ngb_calendar_1 = __webpack_require__(4);
var datepicker_service_1 = __webpack_require__(15);
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbInputDatepicker; }),
    multi: true
};
var NGB_DATEPICKER_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return NgbInputDatepicker; }),
    multi: true
};
/**
 * A directive that makes it possible to have datepickers on input fields.
 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
 */
var NgbInputDatepicker = (function () {
    function NgbInputDatepicker(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, ngZone, _service, _calendar, _ngbDateAdapter) {
        var _this = this;
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._cfr = _cfr;
        this._service = _service;
        this._calendar = _calendar;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._cRef = null;
        this._disabled = false;
        /**
            * Placement of a datepicker popup accepts:
            *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
            *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
            * and array of above values.
            */
        this.placement = 'bottom-left';
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new core_1.EventEmitter();
        this._onChange = function (_) { };
        this._onTouched = function () { };
        this._validatorChange = function () { };
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this._cRef) {
                positioning_1.positionElements(_this._elRef.nativeElement, _this._cRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    Object.defineProperty(NgbInputDatepicker.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value === '' || (value && value !== 'false');
            if (this.isOpen()) {
                this._cRef.instance.setDisabledState(this._disabled);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgbInputDatepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    NgbInputDatepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    NgbInputDatepicker.prototype.registerOnValidatorChange = function (fn) { this._validatorChange = fn; };
    ;
    NgbInputDatepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    NgbInputDatepicker.prototype.validate = function (c) {
        var value = c.value;
        if (value === null || value === undefined) {
            return null;
        }
        var ngbDate = this._fromDateStruct(this._ngbDateAdapter.fromModel(value));
        if (!this._calendar.isValid(ngbDate)) {
            return { 'ngbDate': { invalid: c.value } };
        }
        if (this.minDate && ngbDate.before(ngb_date_1.NgbDate.from(this.minDate))) {
            return { 'ngbDate': { requiredBefore: this.minDate } };
        }
        if (this.maxDate && ngbDate.after(ngb_date_1.NgbDate.from(this.maxDate))) {
            return { 'ngbDate': { requiredAfter: this.maxDate } };
        }
    };
    NgbInputDatepicker.prototype.writeValue = function (value) {
        this._model = this._fromDateStruct(this._ngbDateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    };
    NgbInputDatepicker.prototype.manualDateChange = function (value, updateView) {
        if (updateView === void 0) { updateView = false; }
        this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        this._onChange(this._model ? this._ngbDateAdapter.toModel(this._model) : (value === '' ? null : value));
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    };
    NgbInputDatepicker.prototype.isOpen = function () { return !!this._cRef; };
    /**
     * Opens the datepicker with the selected date indicated by the ngModel value.
     */
    NgbInputDatepicker.prototype.open = function () {
        var _this = this;
        if (!this.isOpen()) {
            var cf = this._cfr.resolveComponentFactory(datepicker_1.NgbDatepicker);
            this._cRef = this._vcRef.createComponent(cf);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._ngbDateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange(function (selectedDate) {
                _this.writeValue(selectedDate);
                _this._onChange(selectedDate);
                _this.close();
            });
            // focus handling
            this._cRef.instance.focus();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
        }
    };
    /**
     * Closes the datepicker popup.
     */
    NgbInputDatepicker.prototype.close = function () {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
        }
    };
    /**
     * Toggles the datepicker popup (opens when closed and closes when opened).
     */
    NgbInputDatepicker.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    NgbInputDatepicker.prototype.navigateTo = function (date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    };
    NgbInputDatepicker.prototype.onBlur = function () { this._onTouched(); };
    NgbInputDatepicker.prototype.ngOnChanges = function (changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
        }
    };
    NgbInputDatepicker.prototype.ngOnDestroy = function () {
        this.close();
        this._zoneSubscription.unsubscribe();
    };
    NgbInputDatepicker.prototype._applyDatepickerInputs = function (datepickerInstance) {
        var _this = this;
        ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
            'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
            .forEach(function (optionName) {
            if (_this[optionName] !== undefined) {
                datepickerInstance[optionName] = _this[optionName];
            }
        });
        datepickerInstance.startDate = this.startDate || this._model;
    };
    NgbInputDatepicker.prototype._applyPopupStyling = function (nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.setStyle(nativeElement, 'padding', '0');
    };
    NgbInputDatepicker.prototype._subscribeForDatepickerOutputs = function (datepickerInstance) {
        var _this = this;
        datepickerInstance.navigate.subscribe(function (date) { return _this.navigate.emit(date); });
        datepickerInstance.select.subscribe(function () { _this.close(); });
    };
    NgbInputDatepicker.prototype._writeModelValue = function (model) {
        this._renderer.setProperty(this._elRef.nativeElement, 'value', this._parserFormatter.format(model));
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._ngbDateAdapter.toModel(model));
            this._onTouched();
        }
    };
    NgbInputDatepicker.prototype._fromDateStruct = function (date) {
        var ngbDate = date ? new ngb_date_1.NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], NgbInputDatepicker.prototype, "dayTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbInputDatepicker.prototype, "displayMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbInputDatepicker.prototype, "firstDayOfWeek", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgbInputDatepicker.prototype, "markDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbInputDatepicker.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbInputDatepicker.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbInputDatepicker.prototype, "navigation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbInputDatepicker.prototype, "outsideDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbInputDatepicker.prototype, "placement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbInputDatepicker.prototype, "showWeekdays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbInputDatepicker.prototype, "showWeekNumbers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbInputDatepicker.prototype, "startDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbInputDatepicker.prototype, "container", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbInputDatepicker.prototype, "navigate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgbInputDatepicker.prototype, "disabled", null);
    NgbInputDatepicker = __decorate([
        core_1.Directive({
            selector: 'input[ngbDatepicker]',
            exportAs: 'ngbDatepicker',
            host: {
                '(input)': 'manualDateChange($event.target.value)',
                '(change)': 'manualDateChange($event.target.value, true)',
                '(keyup.esc)': 'close()',
                '(blur)': 'onBlur()',
                '[disabled]': 'disabled'
            },
            providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NGB_DATEPICKER_VALIDATOR, datepicker_service_1.NgbDatepickerService]
        }),
        __metadata("design:paramtypes", [ngb_date_parser_formatter_1.NgbDateParserFormatter, core_1.ElementRef, core_1.ViewContainerRef,
            core_1.Renderer2, core_1.ComponentFactoryResolver, core_1.NgZone,
            datepicker_service_1.NgbDatepickerService, ngb_calendar_1.NgbCalendar,
            ngb_date_adapter_1.NgbDateAdapter])
    ], NgbInputDatepicker);
    return NgbInputDatepicker;
}());
exports.NgbInputDatepicker = NgbInputDatepicker;
//# sourceMappingURL=datepicker-input.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NgbDatepickerDayView = (function () {
    function NgbDatepickerDayView() {
    }
    NgbDatepickerDayView.prototype.isMuted = function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbDatepickerDayView.prototype, "currentMonth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDatepickerDayView.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerDayView.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerDayView.prototype, "focused", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerDayView.prototype, "selected", void 0);
    NgbDatepickerDayView = __decorate([
        core_1.Component({
            selector: '[ngbDatepickerDayView]',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ["\n    :host {\n      text-align: center;\n      width: 2rem;\n      height: 2rem;\n      line-height: 2rem;\n      border-radius: 0.25rem;\n      background: transparent;\n    }\n    :host.outside {\n      opacity: 0.5;\n    }\n  "],
            host: {
                'class': 'btn-light',
                '[class.bg-primary]': 'selected',
                '[class.text-white]': 'selected',
                '[class.text-muted]': 'isMuted()',
                '[class.outside]': 'isMuted()',
                '[class.active]': 'focused'
            },
            template: "{{ date.day }}"
        })
    ], NgbDatepickerDayView);
    return NgbDatepickerDayView;
}());
exports.NgbDatepickerDayView = NgbDatepickerDayView;
//# sourceMappingURL=datepicker-day-view.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ngb_date_1 = __webpack_require__(3);
var util_1 = __webpack_require__(1);
var datepicker_i18n_1 = __webpack_require__(6);
var ngb_calendar_1 = __webpack_require__(4);
var NgbDatepickerNavigationSelect = (function () {
    function NgbDatepickerNavigationSelect(i18n, calendar) {
        this.i18n = i18n;
        this.calendar = calendar;
        this.years = [];
        this.select = new core_1.EventEmitter();
        this.months = calendar.getMonths();
    }
    NgbDatepickerNavigationSelect.prototype.ngOnChanges = function (changes) {
        if (changes['maxDate'] || changes['minDate'] || changes['date']) {
            this._generateYears();
            this._generateMonths();
        }
    };
    NgbDatepickerNavigationSelect.prototype.changeMonth = function (month) { this.select.emit(new ngb_date_1.NgbDate(this.date.year, util_1.toInteger(month), 1)); };
    NgbDatepickerNavigationSelect.prototype.changeYear = function (year) { this.select.emit(new ngb_date_1.NgbDate(util_1.toInteger(year), this.date.month, 1)); };
    NgbDatepickerNavigationSelect.prototype._generateMonths = function () {
        var _this = this;
        this.months = this.calendar.getMonths();
        if (this.date && this.date.year === this.minDate.year) {
            var index = this.months.findIndex(function (month) { return month === _this.minDate.month; });
            this.months = this.months.slice(index);
        }
        if (this.date && this.date.year === this.maxDate.year) {
            var index = this.months.findIndex(function (month) { return month === _this.maxDate.month; });
            this.months = this.months.slice(0, index + 1);
        }
    };
    NgbDatepickerNavigationSelect.prototype._generateYears = function () {
        var _this = this;
        this.years = Array.from({ length: this.maxDate.year - this.minDate.year + 1 }, function (e, i) { return _this.minDate.year + i; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", ngb_date_1.NgbDate)
    ], NgbDatepickerNavigationSelect.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbDatepickerNavigationSelect.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", ngb_date_1.NgbDate)
    ], NgbDatepickerNavigationSelect.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", ngb_date_1.NgbDate)
    ], NgbDatepickerNavigationSelect.prototype, "minDate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDatepickerNavigationSelect.prototype, "select", void 0);
    NgbDatepickerNavigationSelect = __decorate([
        core_1.Component({
            selector: 'ngb-datepicker-navigation-select',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ["\n    :host>select {\n      /* to align with btn-sm */\n      padding: 0.25rem 0.5rem;\n      font-size: 0.875rem;\n      line-height: 1.25;\n      /* to cancel the custom height set by custom-select */\n      height: inherit;\n      width: 50%;\n      display: inline-block;\n    }\n  "],
            template: "\n    <select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.month\"\n      (change)=\"changeMonth($event.target.value)\"\n      tabindex=\"-1\">\n        <option *ngFor=\"let m of months\" [value]=\"m\">{{ i18n.getMonthShortName(m) }}</option>\n    </select><select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.year\"\n      (change)=\"changeYear($event.target.value)\"\n      tabindex=\"-1\">\n        <option *ngFor=\"let y of years\" [value]=\"y\">{{ y }}</option>\n    </select>\n  "
        }),
        __metadata("design:paramtypes", [datepicker_i18n_1.NgbDatepickerI18n, ngb_calendar_1.NgbCalendar])
    ], NgbDatepickerNavigationSelect);
    return NgbDatepickerNavigationSelect;
}());
exports.NgbDatepickerNavigationSelect = NgbDatepickerNavigationSelect;
//# sourceMappingURL=datepicker-navigation-select.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngb_calendar_hijri_1 = __webpack_require__(48);
var ngb_date_1 = __webpack_require__(3);
var core_1 = __webpack_require__(0);
function isGregorianLeapYear(date) {
    var year = date.getFullYear();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 */
var GREGORIAN_EPOCH = 1721425.5;
var ISLAMIC_EPOCH = 1948439.5;
var NgbCalendarIslamicCivil = (function (_super) {
    __extends(NgbCalendarIslamicCivil, _super);
    function NgbCalendarIslamicCivil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gdate` is a JS Date to be converted to Hijri.
     */
    NgbCalendarIslamicCivil.prototype.fromGregorian = function (gdate) {
        var date = new Date(gdate);
        var gYear = date.getFullYear(), gMonth = date.getMonth(), gDay = date.getDate();
        var julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(date) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        var days = julianDay - ISLAMIC_EPOCH;
        var hYear = Math.floor((30 * days + 10646) / 10631.0);
        var hMonth = Math.ceil((days - 29 - this._getYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        var hDay = Math.ceil(days - this._getMonthStart(hYear, hMonth)) + 1;
        return new ngb_date_1.NgbDate(hYear, hMonth + 1, hDay);
    };
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hijriDate` is an islamic(civil) date to be converted to Gregorian.
     */
    NgbCalendarIslamicCivil.prototype.toGregorian = function (hijriDate) {
        var hYear = hijriDate.year;
        var hMonth = hijriDate.month - 1;
        var hDate = hijriDate.day;
        var julianDay = hDate + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        var wjd = Math.floor(julianDay - 0.5) + 0.5, depoch = wjd - GREGORIAN_EPOCH, quadricent = Math.floor(depoch / 146097), dqc = mod(depoch, 146097), cent = Math.floor(dqc / 36524), dcent = mod(dqc, 36524), quad = Math.floor(dcent / 1461), dquad = mod(dcent, 1461), yindex = Math.floor(dquad / 365);
        var year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        var gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        var yearday = wjd - gYearStart;
        var tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
        var leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
        var month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        var tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                1);
        var day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    };
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    NgbCalendarIslamicCivil.prototype.getDaysInIslamicMonth = function (month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        var length = 29 + month % 2;
        if (month === 12 && this._isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    };
    NgbCalendarIslamicCivil.prototype.getNext = function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        date = ngb_date_1.NgbDate.from(date);
        switch (period) {
            case 'y':
                date = this.setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this.setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this.setDay(date, date.day + number);
            default:
                return date;
        }
    };
    NgbCalendarIslamicCivil.prototype.getPrev = function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        return this.getNext(date, period, -number);
    };
    NgbCalendarIslamicCivil.prototype.getWeekday = function (date) {
        var day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    NgbCalendarIslamicCivil.prototype.getWeekNumber = function (week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        var date = week[thursdayIndex];
        var jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        var time = jsDate.getTime();
        var MuhDate = this.toGregorian(new ngb_date_1.NgbDate(date.year, 1, 1)); // Compare with Muharram 1
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    };
    NgbCalendarIslamicCivil.prototype.getToday = function () { return this.fromGregorian(new Date()); };
    NgbCalendarIslamicCivil = __decorate([
        core_1.Injectable()
    ], NgbCalendarIslamicCivil);
    return NgbCalendarIslamicCivil;
}(ngb_calendar_hijri_1.NgbCalendarHijri));
exports.NgbCalendarIslamicCivil = NgbCalendarIslamicCivil;
//# sourceMappingURL=ngb-calendar-islamic-civil.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngb_calendar_1 = __webpack_require__(4);
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var NgbCalendarHijri = (function (_super) {
    __extends(NgbCalendarHijri, _super);
    function NgbCalendarHijri() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgbCalendarHijri.prototype.getDaysPerWeek = function () { return 7; };
    NgbCalendarHijri.prototype.getMonths = function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    NgbCalendarHijri.prototype.getWeeksPerMonth = function () { return 6; };
    NgbCalendarHijri.prototype.isValid = function (date) {
        return date && util_1.isNumber(date.year) && util_1.isNumber(date.month) && util_1.isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    };
    NgbCalendarHijri.prototype.setDay = function (date, day) {
        day = +day;
        var mDays = this.getDaysInIslamicMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this.setMonth(date, date.month - 1);
                mDays = this.getDaysInIslamicMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this.setMonth(date, date.month + 1);
                mDays = this.getDaysInIslamicMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    };
    NgbCalendarHijri.prototype.setMonth = function (date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    };
    NgbCalendarHijri.prototype.setYear = function (date, yearValue) {
        date.year = +yearValue;
        return date;
    };
    NgbCalendarHijri.prototype._isIslamicLeapYear = function (year) { return (14 + 11 * year) % 30 < 11; };
    /**
     * Returns the start of Hijri Month.
     * `month` is 0 for Muharram, 1 for Safar, etc.
     * `year` is any Hijri year.
     */
    NgbCalendarHijri.prototype._getMonthStart = function (year, month) {
        return Math.ceil(29.5 * month) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
    };
    /**
     * Returns the start of Hijri year.
     * `year` is any Hijri year.
     */
    NgbCalendarHijri.prototype._getYearStart = function (year) { return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0); };
    NgbCalendarHijri = __decorate([
        core_1.Injectable()
    ], NgbCalendarHijri);
    return NgbCalendarHijri;
}(ngb_calendar_1.NgbCalendar));
exports.NgbCalendarHijri = NgbCalendarHijri;
//# sourceMappingURL=ngb-calendar-hijri.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var dropdown_1 = __webpack_require__(50);
var dropdown_config_1 = __webpack_require__(18);
var dropdown_2 = __webpack_require__(50);
exports.NgbDropdown = dropdown_2.NgbDropdown;
exports.NgbDropdownToggle = dropdown_2.NgbDropdownToggle;
exports.NgbDropdownMenu = dropdown_2.NgbDropdownMenu;
var dropdown_config_2 = __webpack_require__(18);
exports.NgbDropdownConfig = dropdown_config_2.NgbDropdownConfig;
var NGB_DROPDOWN_DIRECTIVES = [dropdown_1.NgbDropdown, dropdown_1.NgbDropdownToggle, dropdown_1.NgbDropdownMenu];
var NgbDropdownModule = (function () {
    function NgbDropdownModule() {
    }
    NgbDropdownModule_1 = NgbDropdownModule;
    NgbDropdownModule.forRoot = function () { return { ngModule: NgbDropdownModule_1, providers: [dropdown_config_1.NgbDropdownConfig] }; };
    NgbDropdownModule = NgbDropdownModule_1 = __decorate([
        core_1.NgModule({ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES })
    ], NgbDropdownModule);
    return NgbDropdownModule;
    var NgbDropdownModule_1;
}());
exports.NgbDropdownModule = NgbDropdownModule;
//# sourceMappingURL=dropdown.module.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var dropdown_config_1 = __webpack_require__(18);
var positioning_1 = __webpack_require__(7);
/**
 */
var NgbDropdownMenu = (function () {
    function NgbDropdownMenu(dropdown, _elementRef, _renderer) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.placement = 'bottom';
        this.isOpen = false;
    }
    NgbDropdownMenu.prototype.isEventFrom = function ($event) { return this._elementRef.nativeElement.contains($event.target); };
    NgbDropdownMenu.prototype.position = function (triggerEl, placement) {
        this.applyPlacement(positioning_1.positionElements(triggerEl, this._elementRef.nativeElement, placement));
    };
    NgbDropdownMenu.prototype.applyPlacement = function (_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropup');
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        this.placement = _placement;
        /**
         * apply the new placement
         * in case of top use up-arrow or down-arrow otherwise
         */
        if (_placement.search('^top') !== -1) {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropup');
        }
        else {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        }
    };
    NgbDropdownMenu = __decorate([
        core_1.Directive({ selector: '[ngbDropdownMenu]', host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()' } }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return NgbDropdown; }))),
        __metadata("design:paramtypes", [Object, core_1.ElementRef,
            core_1.Renderer2])
    ], NgbDropdownMenu);
    return NgbDropdownMenu;
}());
exports.NgbDropdownMenu = NgbDropdownMenu;
/**
 * Allows the dropdown to be toggled via click. This directive is optional.
 */
var NgbDropdownToggle = (function () {
    function NgbDropdownToggle(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    NgbDropdownToggle.prototype.toggleOpen = function () { this.dropdown.toggle(); };
    NgbDropdownToggle.prototype.isEventFrom = function ($event) { return this._elementRef.nativeElement.contains($event.target); };
    NgbDropdownToggle = __decorate([
        core_1.Directive({
            selector: '[ngbDropdownToggle]',
            host: {
                'class': 'dropdown-toggle',
                'aria-haspopup': 'true',
                '[attr.aria-expanded]': 'dropdown.isOpen()',
                '(click)': 'toggleOpen()'
            }
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return NgbDropdown; }))),
        __metadata("design:paramtypes", [Object, core_1.ElementRef])
    ], NgbDropdownToggle);
    return NgbDropdownToggle;
}());
exports.NgbDropdownToggle = NgbDropdownToggle;
/**
 * Transforms a node into a dropdown.
 */
var NgbDropdown = (function () {
    function NgbDropdown(config, ngZone) {
        var _this = this;
        /**
         *  Defines whether or not the dropdown-menu is open initially.
         */
        this._open = false;
        /**
         *  An event fired when the dropdown is opened or closed.
         *  Event's payload equals whether dropdown is open.
         */
        this.openChange = new core_1.EventEmitter();
        this.placement = config.placement;
        this.autoClose = config.autoClose;
        this._zoneSubscription = ngZone.onStable.subscribe(function () { _this._positionMenu(); });
    }
    NgbDropdown.prototype.ngOnInit = function () {
        if (this._menu) {
            this._menu.applyPlacement(Array.isArray(this.placement) ? (this.placement[0]) : this.placement);
        }
    };
    /**
     * Checks if the dropdown menu is open or not.
     */
    NgbDropdown.prototype.isOpen = function () { return this._open; };
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    NgbDropdown.prototype.open = function () {
        if (!this._open) {
            this._open = true;
            this._positionMenu();
            this.openChange.emit(true);
        }
    };
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    NgbDropdown.prototype.close = function () {
        if (this._open) {
            this._open = false;
            this.openChange.emit(false);
        }
    };
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    NgbDropdown.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    NgbDropdown.prototype.closeFromClick = function ($event) {
        if (this.autoClose && $event.button !== 2 && !this._isEventFromToggle($event)) {
            if (this.autoClose === true) {
                this.close();
            }
            else if (this.autoClose === 'inside' && this._isEventFromMenu($event)) {
                this.close();
            }
            else if (this.autoClose === 'outside' && !this._isEventFromMenu($event)) {
                this.close();
            }
        }
    };
    NgbDropdown.prototype.closeFromOutsideEsc = function () {
        if (this.autoClose) {
            this.close();
        }
    };
    NgbDropdown.prototype.ngOnDestroy = function () { this._zoneSubscription.unsubscribe(); };
    NgbDropdown.prototype._isEventFromToggle = function ($event) { return this._toggle ? this._toggle.isEventFrom($event) : false; };
    NgbDropdown.prototype._isEventFromMenu = function ($event) { return this._menu ? this._menu.isEventFrom($event) : false; };
    NgbDropdown.prototype._positionMenu = function () {
        if (this.isOpen() && this._menu && this._toggle) {
            this._menu.position(this._toggle.anchorEl, this.placement);
        }
    };
    __decorate([
        core_1.ContentChild(NgbDropdownMenu),
        __metadata("design:type", NgbDropdownMenu)
    ], NgbDropdown.prototype, "_menu", void 0);
    __decorate([
        core_1.ContentChild(NgbDropdownToggle),
        __metadata("design:type", NgbDropdownToggle)
    ], NgbDropdown.prototype, "_toggle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDropdown.prototype, "autoClose", void 0);
    __decorate([
        core_1.Input('open'),
        __metadata("design:type", Object)
    ], NgbDropdown.prototype, "_open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbDropdown.prototype, "placement", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbDropdown.prototype, "openChange", void 0);
    NgbDropdown = __decorate([
        core_1.Directive({
            selector: '[ngbDropdown]',
            exportAs: 'ngbDropdown',
            host: {
                '[class.show]': 'isOpen()',
                '(keyup.esc)': 'closeFromOutsideEsc()',
                '(document:click)': 'closeFromClick($event)'
            }
        }),
        __metadata("design:paramtypes", [dropdown_config_1.NgbDropdownConfig, core_1.NgZone])
    ], NgbDropdown);
    return NgbDropdown;
}());
exports.NgbDropdown = NgbDropdown;
//# sourceMappingURL=dropdown.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var modal_backdrop_1 = __webpack_require__(52);
var modal_window_1 = __webpack_require__(53);
var modal_stack_1 = __webpack_require__(55);
var modal_1 = __webpack_require__(57);
var modal_2 = __webpack_require__(57);
exports.NgbModal = modal_2.NgbModal;
var modal_ref_1 = __webpack_require__(56);
exports.NgbModalRef = modal_ref_1.NgbModalRef;
exports.NgbActiveModal = modal_ref_1.NgbActiveModal;
var modal_dismiss_reasons_1 = __webpack_require__(54);
exports.ModalDismissReasons = modal_dismiss_reasons_1.ModalDismissReasons;
var NgbModalModule = (function () {
    function NgbModalModule() {
    }
    NgbModalModule_1 = NgbModalModule;
    NgbModalModule.forRoot = function () { return { ngModule: NgbModalModule_1, providers: [modal_1.NgbModal, modal_stack_1.NgbModalStack] }; };
    NgbModalModule = NgbModalModule_1 = __decorate([
        core_1.NgModule({
            declarations: [modal_backdrop_1.NgbModalBackdrop, modal_window_1.NgbModalWindow],
            entryComponents: [modal_backdrop_1.NgbModalBackdrop, modal_window_1.NgbModalWindow],
            providers: [modal_1.NgbModal]
        })
    ], NgbModalModule);
    return NgbModalModule;
    var NgbModalModule_1;
}());
exports.NgbModalModule = NgbModalModule;
//# sourceMappingURL=modal.module.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NgbModalBackdrop = (function () {
    function NgbModalBackdrop() {
    }
    NgbModalBackdrop = __decorate([
        core_1.Component({ selector: 'ngb-modal-backdrop', template: '', host: { 'class': 'modal-backdrop fade show' } })
    ], NgbModalBackdrop);
    return NgbModalBackdrop;
}());
exports.NgbModalBackdrop = NgbModalBackdrop;
//# sourceMappingURL=modal-backdrop.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var modal_dismiss_reasons_1 = __webpack_require__(54);
var NgbModalWindow = (function () {
    function NgbModalWindow(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new core_1.EventEmitter();
    }
    NgbModalWindow.prototype.backdropClick = function ($event) {
        if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
            this.dismiss(modal_dismiss_reasons_1.ModalDismissReasons.BACKDROP_CLICK);
        }
    };
    NgbModalWindow.prototype.escKey = function ($event) {
        if (this.keyboard && !$event.defaultPrevented) {
            this.dismiss(modal_dismiss_reasons_1.ModalDismissReasons.ESC);
        }
    };
    NgbModalWindow.prototype.dismiss = function (reason) { this.dismissEvent.emit(reason); };
    NgbModalWindow.prototype.ngOnInit = function () {
        this._elWithFocus = document.activeElement;
        this._renderer.addClass(document.body, 'modal-open');
    };
    NgbModalWindow.prototype.ngAfterViewInit = function () {
        if (!this._elRef.nativeElement.contains(document.activeElement)) {
            this._elRef.nativeElement['focus'].apply(this._elRef.nativeElement, []);
        }
    };
    NgbModalWindow.prototype.ngOnDestroy = function () {
        var body = document.body;
        var elWithFocus = this._elWithFocus;
        var elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        elementToFocus['focus'].apply(elementToFocus, []);
        this._elWithFocus = null;
        this._renderer.removeClass(body, 'modal-open');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbModalWindow.prototype, "backdrop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbModalWindow.prototype, "keyboard", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbModalWindow.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbModalWindow.prototype, "windowClass", void 0);
    __decorate([
        core_1.Output('dismiss'),
        __metadata("design:type", Object)
    ], NgbModalWindow.prototype, "dismissEvent", void 0);
    NgbModalWindow = __decorate([
        core_1.Component({
            selector: 'ngb-modal-window',
            host: {
                '[class]': '"modal fade show" + (windowClass ? " " + windowClass : "")',
                'role': 'dialog',
                'tabindex': '-1',
                'style': 'display: block;',
                '(keyup.esc)': 'escKey($event)',
                '(click)': 'backdropClick($event)'
            },
            template: "\n    <div [class]=\"'modal-dialog' + (size ? ' modal-' + size : '')\" role=\"document\">\n        <div class=\"modal-content\"><ng-content></ng-content></div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], NgbModalWindow);
    return NgbModalWindow;
}());
exports.NgbModalWindow = NgbModalWindow;
//# sourceMappingURL=modal-window.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModalDismissReasons;
(function (ModalDismissReasons) {
    ModalDismissReasons[ModalDismissReasons["BACKDROP_CLICK"] = 0] = "BACKDROP_CLICK";
    ModalDismissReasons[ModalDismissReasons["ESC"] = 1] = "ESC";
})(ModalDismissReasons = exports.ModalDismissReasons || (exports.ModalDismissReasons = {}));
//# sourceMappingURL=modal-dismiss-reasons.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var popup_1 = __webpack_require__(10);
var util_1 = __webpack_require__(1);
var modal_backdrop_1 = __webpack_require__(52);
var modal_window_1 = __webpack_require__(53);
var modal_ref_1 = __webpack_require__(56);
var NgbModalStack = (function () {
    function NgbModalStack(_applicationRef, _injector, _componentFactoryResolver) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._backdropFactory = _componentFactoryResolver.resolveComponentFactory(modal_backdrop_1.NgbModalBackdrop);
        this._windowFactory = _componentFactoryResolver.resolveComponentFactory(modal_window_1.NgbModalWindow);
    }
    NgbModalStack.prototype.open = function (moduleCFR, contentInjector, content, options) {
        var containerSelector = options.container || 'body';
        var containerEl = document.querySelector(containerSelector);
        if (!containerEl) {
            throw new Error("The specified modal container \"" + containerSelector + "\" was not found in the DOM.");
        }
        var activeModal = new modal_ref_1.NgbActiveModal();
        var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
        var windowCmptRef;
        var backdropCmptRef;
        var ngbModalRef;
        if (options.backdrop !== false) {
            backdropCmptRef = this._backdropFactory.create(this._injector);
            this._applicationRef.attachView(backdropCmptRef.hostView);
            containerEl.appendChild(backdropCmptRef.location.nativeElement);
        }
        windowCmptRef = this._windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        ngbModalRef = new modal_ref_1.NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        activeModal.close = function (result) { ngbModalRef.close(result); };
        activeModal.dismiss = function (reason) { ngbModalRef.dismiss(reason); };
        this._applyWindowOptions(windowCmptRef.instance, options);
        return ngbModalRef;
    };
    NgbModalStack.prototype._applyWindowOptions = function (windowInstance, options) {
        ['backdrop', 'keyboard', 'size', 'windowClass'].forEach(function (optionName) {
            if (util_1.isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    };
    NgbModalStack.prototype._getContentRef = function (moduleCFR, contentInjector, content, context) {
        if (!content) {
            return new popup_1.ContentRef([]);
        }
        else if (content instanceof core_1.TemplateRef) {
            var viewRef = content.createEmbeddedView(context);
            this._applicationRef.attachView(viewRef);
            return new popup_1.ContentRef([viewRef.rootNodes], viewRef);
        }
        else if (util_1.isString(content)) {
            return new popup_1.ContentRef([[document.createTextNode("" + content)]]);
        }
        else {
            var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
            var modalContentInjector = core_1.ReflectiveInjector.resolveAndCreate([{ provide: modal_ref_1.NgbActiveModal, useValue: context }], contentInjector);
            var componentRef = contentCmptFactory.create(modalContentInjector);
            this._applicationRef.attachView(componentRef.hostView);
            return new popup_1.ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
    };
    NgbModalStack = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ApplicationRef, core_1.Injector,
            core_1.ComponentFactoryResolver])
    ], NgbModalStack);
    return NgbModalStack;
}());
exports.NgbModalStack = NgbModalStack;
//# sourceMappingURL=modal-stack.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
var NgbActiveModal = (function () {
    function NgbActiveModal() {
    }
    /**
     * Can be used to close a modal, passing an optional result.
     */
    NgbActiveModal.prototype.close = function (result) { };
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    NgbActiveModal.prototype.dismiss = function (reason) { };
    return NgbActiveModal;
}());
exports.NgbActiveModal = NgbActiveModal;
/**
 * A reference to a newly opened modal.
 */
var NgbModalRef = (function () {
    function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        var _this = this;
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
        this.result = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this.result.then(null, function () { });
    }
    Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
        /**
         * The instance of component used as modal's content.
         * Undefined when a TemplateRef is used as modal's content.
         */
        get: function () {
            if (this._contentRef.componentRef) {
                return this._contentRef.componentRef.instance;
            }
        },
        // only needed to keep TS1.8 compatibility
        set: function (instance) { },
        enumerable: true,
        configurable: true
    });
    /**
     * Can be used to close a modal, passing an optional result.
     */
    NgbModalRef.prototype.close = function (result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    };
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    NgbModalRef.prototype.dismiss = function (reason) {
        if (this._windowCmptRef) {
            if (!this._beforeDismiss || this._beforeDismiss() !== false) {
                this._reject(reason);
                this._removeModalElements();
            }
        }
    };
    NgbModalRef.prototype._removeModalElements = function () {
        var windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            var backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    };
    return NgbModalRef;
}());
exports.NgbModalRef = NgbModalRef;
//# sourceMappingURL=modal-ref.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var modal_stack_1 = __webpack_require__(55);
/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
var NgbModal = (function () {
    function NgbModal(_moduleCFR, _injector, _modalStack) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
    }
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     */
    NgbModal.prototype.open = function (content, options) {
        if (options === void 0) { options = {}; }
        return this._modalStack.open(this._moduleCFR, this._injector, content, options);
    };
    NgbModal = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.Injector, modal_stack_1.NgbModalStack])
    ], NgbModal);
    return NgbModal;
}());
exports.NgbModal = NgbModal;
//# sourceMappingURL=modal.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var pagination_1 = __webpack_require__(59);
var pagination_config_1 = __webpack_require__(19);
var pagination_2 = __webpack_require__(59);
exports.NgbPagination = pagination_2.NgbPagination;
var pagination_config_2 = __webpack_require__(19);
exports.NgbPaginationConfig = pagination_config_2.NgbPaginationConfig;
var NgbPaginationModule = (function () {
    function NgbPaginationModule() {
    }
    NgbPaginationModule_1 = NgbPaginationModule;
    NgbPaginationModule.forRoot = function () { return { ngModule: NgbPaginationModule_1, providers: [pagination_config_1.NgbPaginationConfig] }; };
    NgbPaginationModule = NgbPaginationModule_1 = __decorate([
        core_1.NgModule({ declarations: [pagination_1.NgbPagination], exports: [pagination_1.NgbPagination], imports: [common_1.CommonModule] })
    ], NgbPaginationModule);
    return NgbPaginationModule;
    var NgbPaginationModule_1;
}());
exports.NgbPaginationModule = NgbPaginationModule;
//# sourceMappingURL=pagination.module.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var pagination_config_1 = __webpack_require__(19);
/**
 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
 */
var NgbPagination = (function () {
    function NgbPagination(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  Current page.
         */
        this.page = 0;
        /**
         *  An event fired when the page is changed.
         *  Event's payload equals to the newly selected page.
         */
        this.pageChange = new core_1.EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    NgbPagination.prototype.hasPrevious = function () { return this.page > 1; };
    NgbPagination.prototype.hasNext = function () { return this.page < this.pageCount; };
    NgbPagination.prototype.selectPage = function (pageNumber) { this._updatePages(pageNumber); };
    NgbPagination.prototype.ngOnChanges = function (changes) { this._updatePages(this.page); };
    NgbPagination.prototype.isEllipsis = function (pageNumber) { return pageNumber === -1; };
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    NgbPagination.prototype._applyEllipses = function (start, end) {
        if (this.ellipses) {
            if (start > 0) {
                if (start > 1) {
                    this.pages.unshift(-1);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                if (end < (this.pageCount - 1)) {
                    this.pages.push(-1);
                }
                this.pages.push(this.pageCount);
            }
        }
    };
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    NgbPagination.prototype._applyRotation = function () {
        var start = 0;
        var end = this.pageCount;
        var leftOffset = Math.floor(this.maxSize / 2);
        var rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    };
    /**
     * Paginates page numbers based on maxSize items per page
     */
    NgbPagination.prototype._applyPagination = function () {
        var page = Math.ceil(this.page / this.maxSize) - 1;
        var start = page * this.maxSize;
        var end = start + this.maxSize;
        return [start, end];
    };
    NgbPagination.prototype._setPageInRange = function (newPageNo) {
        var prevPageNo = this.page;
        this.page = util_1.getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo) {
            this.pageChange.emit(this.page);
        }
    };
    NgbPagination.prototype._updatePages = function (newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!util_1.isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (var i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            var start = 0;
            var end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                _a = this._applyRotation(), start = _a[0], end = _a[1];
            }
            else {
                _b = this._applyPagination(), start = _b[0], end = _b[1];
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
        var _a, _b;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbPagination.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbPagination.prototype, "boundaryLinks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbPagination.prototype, "directionLinks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbPagination.prototype, "ellipses", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbPagination.prototype, "rotate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbPagination.prototype, "collectionSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbPagination.prototype, "maxSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbPagination.prototype, "page", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbPagination.prototype, "pageSize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbPagination.prototype, "pageChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPagination.prototype, "size", void 0);
    NgbPagination = __decorate([
        core_1.Component({
            selector: 'ngb-pagination',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: { 'role': 'navigation' },
            template: "\n    <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\"\n        [class.disabled]=\"!hasPrevious() || disabled\">\n        <a aria-label=\"First\" class=\"page-link\" href (click)=\"!!selectPage(1)\" [attr.tabindex]=\"(hasPrevious() ? null : '-1')\">\n          <span aria-hidden=\"true\">&laquo;&laquo;</span>\n        </a>\n      </li>\n\n      <li *ngIf=\"directionLinks\" class=\"page-item\"\n        [class.disabled]=\"!hasPrevious() || disabled\">\n        <a aria-label=\"Previous\" class=\"page-link\" href (click)=\"!!selectPage(page-1)\" [attr.tabindex]=\"(hasPrevious() ? null : '-1')\">\n          <span aria-hidden=\"true\">&laquo;</span>\n        </a>\n      </li>\n      <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\"\n        [class.disabled]=\"isEllipsis(pageNumber) || disabled\">\n        <a *ngIf=\"isEllipsis(pageNumber)\" class=\"page-link\">...</a>\n        <a *ngIf=\"!isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"!!selectPage(pageNumber)\">\n          {{pageNumber}}\n          <span *ngIf=\"pageNumber === page\" class=\"sr-only\">(current)</span>\n        </a>\n      </li>\n      <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasNext() || disabled\">\n        <a aria-label=\"Next\" class=\"page-link\" href (click)=\"!!selectPage(page+1)\" [attr.tabindex]=\"(hasNext() ? null : '-1')\">\n          <span aria-hidden=\"true\">&raquo;</span>\n        </a>\n      </li>\n\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasNext() || disabled\">\n        <a aria-label=\"Last\" class=\"page-link\" href (click)=\"!!selectPage(pageCount)\" [attr.tabindex]=\"(hasNext() ? null : '-1')\">\n          <span aria-hidden=\"true\">&raquo;&raquo;</span>\n        </a>\n      </li>\n    </ul>\n  "
        }),
        __metadata("design:paramtypes", [pagination_config_1.NgbPaginationConfig])
    ], NgbPagination);
    return NgbPagination;
}());
exports.NgbPagination = NgbPagination;
//# sourceMappingURL=pagination.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var popover_1 = __webpack_require__(61);
var popover_config_1 = __webpack_require__(20);
var popover_2 = __webpack_require__(61);
exports.NgbPopover = popover_2.NgbPopover;
var popover_config_2 = __webpack_require__(20);
exports.NgbPopoverConfig = popover_config_2.NgbPopoverConfig;
var NgbPopoverModule = (function () {
    function NgbPopoverModule() {
    }
    NgbPopoverModule_1 = NgbPopoverModule;
    NgbPopoverModule.forRoot = function () { return { ngModule: NgbPopoverModule_1, providers: [popover_config_1.NgbPopoverConfig] }; };
    NgbPopoverModule = NgbPopoverModule_1 = __decorate([
        core_1.NgModule({ declarations: [popover_1.NgbPopover, popover_1.NgbPopoverWindow], exports: [popover_1.NgbPopover], entryComponents: [popover_1.NgbPopoverWindow] })
    ], NgbPopoverModule);
    return NgbPopoverModule;
    var NgbPopoverModule_1;
}());
exports.NgbPopoverModule = NgbPopoverModule;
//# sourceMappingURL=popover.module.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var triggers_1 = __webpack_require__(62);
var positioning_1 = __webpack_require__(7);
var popup_1 = __webpack_require__(10);
var popover_config_1 = __webpack_require__(20);
var nextId = 0;
var NgbPopoverWindow = (function () {
    function NgbPopoverWindow(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.placement = 'top';
    }
    NgbPopoverWindow.prototype.applyPlacement = function (_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
        this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
        // set the new placement classes
        this.placement = _placement;
        // apply the new placement
        this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
        this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPopoverWindow.prototype, "placement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPopoverWindow.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPopoverWindow.prototype, "id", void 0);
    NgbPopoverWindow = __decorate([
        core_1.Component({
            selector: 'ngb-popover-window',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: {
                '[class]': '"popover bs-popover-" + placement.split("-")[0]+" bs-popover-" + placement',
                'role': 'tooltip',
                '[id]': 'id'
            },
            template: "\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-header\">{{title}}</h3><div class=\"popover-body\"><ng-content></ng-content></div>",
            styles: ["\n    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {\n      left: 50%;\n      margin-left: -5px;\n    }\n\n    :host.bs-popover-top-left .arrow, :host.bs-popover-bottom-left .arrow {\n      left: 2em;\n    }\n\n    :host.bs-popover-top-right .arrow, :host.bs-popover-bottom-right .arrow {\n      left: auto;\n      right: 2em;\n    }\n\n    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {\n      top: 50%;\n      margin-top: -5px;\n    }\n    \n    :host.bs-popover-left-top .arrow, :host.bs-popover-right-top .arrow {\n      top: 0.7em;\n    }\n\n    :host.bs-popover-left-bottom .arrow, :host.bs-popover-right-bottom .arrow {\n      top: auto;\n      bottom: 0.7em;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], NgbPopoverWindow);
    return NgbPopoverWindow;
}());
exports.NgbPopoverWindow = NgbPopoverWindow;
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var NgbPopover = (function () {
    function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, ngZone) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new core_1.EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new core_1.EventEmitter();
        this._ngbPopoverWindowId = "ngb-popover-" + nextId++;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this._popupService = new popup_1.PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this._windowRef) {
                _this._windowRef.instance.applyPlacement(positioning_1.positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body'));
            }
        });
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     */
    NgbPopover.prototype.open = function (context) {
        if (!this._windowRef) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.detectChanges();
            this._windowRef.changeDetectorRef.markForCheck();
            // position popover along the element
            this._windowRef.instance.applyPlacement(positioning_1.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            this.shown.emit();
        }
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     */
    NgbPopover.prototype.close = function () {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     */
    NgbPopover.prototype.toggle = function () {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Returns whether or not the popover is currently being shown
     */
    NgbPopover.prototype.isOpen = function () { return this._windowRef != null; };
    NgbPopover.prototype.ngOnInit = function () {
        this._unregisterListenersFn = triggers_1.listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    };
    NgbPopover.prototype.ngOnDestroy = function () {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbPopover.prototype, "ngbPopover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPopover.prototype, "popoverTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbPopover.prototype, "placement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPopover.prototype, "triggers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbPopover.prototype, "container", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbPopover.prototype, "shown", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbPopover.prototype, "hidden", void 0);
    NgbPopover = __decorate([
        core_1.Directive({ selector: '[ngbPopover]', exportAs: 'ngbPopover' }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, core_1.Injector,
            core_1.ComponentFactoryResolver, core_1.ViewContainerRef, popover_config_1.NgbPopoverConfig,
            core_1.NgZone])
    ], NgbPopover);
    return NgbPopover;
}());
exports.NgbPopover = NgbPopover;
//# sourceMappingURL=popover.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Trigger = (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    Trigger.prototype.isManual = function () { return this.open === 'manual' || this.close === 'manual'; };
    return Trigger;
}());
exports.Trigger = Trigger;
var DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave']
};
function parseTriggers(triggers, aliases) {
    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    var parsedTriggers = trimmedTriggers.split(/\s+/).map(function (trigger) { return trigger.split(':'); }).map(function (triggerPair) {
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    var manualTriggers = parsedTriggers.filter(function (triggerPair) { return triggerPair.isManual(); });
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
exports.parseTriggers = parseTriggers;
var noopFn = function () { };
function listenToTriggers(renderer, nativeElement, triggers, openFn, closeFn, toggleFn) {
    var parsedTriggers = parseTriggers(triggers);
    var listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return noopFn;
    }
    parsedTriggers.forEach(function (trigger) {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
        }
        else {
            listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
        }
    });
    return function () { listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); }); };
}
exports.listenToTriggers = listenToTriggers;
//# sourceMappingURL=triggers.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var progressbar_1 = __webpack_require__(64);
var progressbar_config_1 = __webpack_require__(21);
var progressbar_2 = __webpack_require__(64);
exports.NgbProgressbar = progressbar_2.NgbProgressbar;
var progressbar_config_2 = __webpack_require__(21);
exports.NgbProgressbarConfig = progressbar_config_2.NgbProgressbarConfig;
var NgbProgressbarModule = (function () {
    function NgbProgressbarModule() {
    }
    NgbProgressbarModule_1 = NgbProgressbarModule;
    NgbProgressbarModule.forRoot = function () { return { ngModule: NgbProgressbarModule_1, providers: [progressbar_config_1.NgbProgressbarConfig] }; };
    NgbProgressbarModule = NgbProgressbarModule_1 = __decorate([
        core_1.NgModule({ declarations: [progressbar_1.NgbProgressbar], exports: [progressbar_1.NgbProgressbar], imports: [common_1.CommonModule] })
    ], NgbProgressbarModule);
    return NgbProgressbarModule;
    var NgbProgressbarModule_1;
}());
exports.NgbProgressbarModule = NgbProgressbarModule;
//# sourceMappingURL=progressbar.module.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var progressbar_config_1 = __webpack_require__(21);
/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
var NgbProgressbar = (function () {
    function NgbProgressbar(config) {
        /**
         * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    NgbProgressbar.prototype.getValue = function () { return util_1.getValueInRange(this.value, this.max); };
    NgbProgressbar.prototype.getPercentValue = function () { return 100 * this.getValue() / this.max; };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbProgressbar.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbProgressbar.prototype, "animated", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbProgressbar.prototype, "striped", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbProgressbar.prototype, "showValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbProgressbar.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbProgressbar.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbProgressbar.prototype, "height", void 0);
    NgbProgressbar = __decorate([
        core_1.Component({
            selector: 'ngb-progressbar',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"progress\" [style.height]=\"height\">\n      <div class=\"progress-bar{{type ? ' bg-' + type : ''}}{{animated ? ' progress-bar-animated' : ''}}{{striped ?\n    ' progress-bar-striped' : ''}}\" role=\"progressbar\" [style.width.%]=\"getPercentValue()\"\n    [attr.aria-valuenow]=\"getValue()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\">\n        <span *ngIf=\"showValue\">{{getPercentValue()}}%</span><ng-content></ng-content>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [progressbar_config_1.NgbProgressbarConfig])
    ], NgbProgressbar);
    return NgbProgressbar;
}());
exports.NgbProgressbar = NgbProgressbar;
//# sourceMappingURL=progressbar.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var rating_config_1 = __webpack_require__(22);
var rating_1 = __webpack_require__(66);
var rating_2 = __webpack_require__(66);
exports.NgbRating = rating_2.NgbRating;
var rating_config_2 = __webpack_require__(22);
exports.NgbRatingConfig = rating_config_2.NgbRatingConfig;
var NgbRatingModule = (function () {
    function NgbRatingModule() {
    }
    NgbRatingModule_1 = NgbRatingModule;
    NgbRatingModule.forRoot = function () { return { ngModule: NgbRatingModule_1, providers: [rating_config_1.NgbRatingConfig] }; };
    NgbRatingModule = NgbRatingModule_1 = __decorate([
        core_1.NgModule({ declarations: [rating_1.NgbRating], exports: [rating_1.NgbRating], imports: [common_1.CommonModule] })
    ], NgbRatingModule);
    return NgbRatingModule;
    var NgbRatingModule_1;
}());
exports.NgbRatingModule = NgbRatingModule;
//# sourceMappingURL=rating.module.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var rating_config_1 = __webpack_require__(22);
var util_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(5);
var Key;
(function (Key) {
    Key[Key["End"] = 35] = "End";
    Key[Key["Home"] = 36] = "Home";
    Key[Key["ArrowLeft"] = 37] = "ArrowLeft";
    Key[Key["ArrowUp"] = 38] = "ArrowUp";
    Key[Key["ArrowRight"] = 39] = "ArrowRight";
    Key[Key["ArrowDown"] = 40] = "ArrowDown";
})(Key || (Key = {}));
var NGB_RATING_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbRating; }),
    multi: true
};
/**
 * Rating directive that will take care of visualising a star rating bar.
 */
var NgbRating = (function () {
    function NgbRating(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over.
         */
        this.hover = new core_1.EventEmitter();
        /**
         * An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over.
         */
        this.leave = new core_1.EventEmitter();
        /**
         * An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating.
         */
        this.rateChange = new core_1.EventEmitter(true);
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.max = config.max;
        this.readonly = config.readonly;
    }
    NgbRating.prototype.ariaValueText = function () { return this.nextRate + " out of " + this.max; };
    NgbRating.prototype.enter = function (value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    };
    NgbRating.prototype.handleBlur = function () { this.onTouched(); };
    NgbRating.prototype.handleClick = function (value) { this.update(this.resettable && this.rate === value ? 0 : value); };
    NgbRating.prototype.handleKeyDown = function (event) {
        if (Key[util_1.toString(event.which)]) {
            event.preventDefault();
            switch (event.which) {
                case Key.ArrowDown:
                case Key.ArrowLeft:
                    this.update(this.rate - 1);
                    break;
                case Key.ArrowUp:
                case Key.ArrowRight:
                    this.update(this.rate + 1);
                    break;
                case Key.Home:
                    this.update(0);
                    break;
                case Key.End:
                    this.update(this.max);
                    break;
            }
        }
    };
    NgbRating.prototype.ngOnChanges = function (changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    };
    NgbRating.prototype.ngOnInit = function () {
        this.contexts = Array.from({ length: this.max }, function (v, k) { return ({ fill: 0, index: k }); });
        this._updateState(this.rate);
    };
    NgbRating.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbRating.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbRating.prototype.reset = function () {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    };
    NgbRating.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    NgbRating.prototype.update = function (value, internalChange) {
        if (internalChange === void 0) { internalChange = true; }
        var newRate = util_1.getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    };
    NgbRating.prototype.writeValue = function (value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    };
    NgbRating.prototype._getFillValue = function (index) {
        var diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return Number.parseInt((diff * 100).toFixed(2));
        }
        return 0;
    };
    NgbRating.prototype._updateState = function (nextValue) {
        var _this = this;
        this.nextRate = nextValue;
        this.contexts.forEach(function (context, index) { return context.fill = _this._getFillValue(index); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbRating.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbRating.prototype, "rate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbRating.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbRating.prototype, "resettable", void 0);
    __decorate([
        core_1.Input(), core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], NgbRating.prototype, "starTemplate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbRating.prototype, "hover", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbRating.prototype, "leave", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbRating.prototype, "rateChange", void 0);
    NgbRating = __decorate([
        core_1.Component({
            selector: 'ngb-rating',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: {
                'class': 'd-inline-flex',
                'tabindex': '0',
                'role': 'slider',
                'aria-valuemin': '0',
                '[attr.aria-valuemax]': 'max',
                '[attr.aria-valuenow]': 'nextRate',
                '[attr.aria-valuetext]': 'ariaValueText()',
                '[attr.aria-disabled]': 'readonly ? true : null',
                '(blur)': 'handleBlur()',
                '(keydown)': 'handleKeyDown($event)',
                '(mouseleave)': 'reset()'
            },
            template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"readonly || disabled ? 'default' : 'pointer'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || t\" [ngTemplateOutletContext]=\"contexts[index]\"></ng-template>\n      </span>\n    </ng-template>\n  ",
            providers: [NGB_RATING_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [rating_config_1.NgbRatingConfig, core_1.ChangeDetectorRef])
    ], NgbRating);
    return NgbRating;
}());
exports.NgbRating = NgbRating;
//# sourceMappingURL=rating.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var tabset_1 = __webpack_require__(68);
var tabset_config_1 = __webpack_require__(23);
var tabset_2 = __webpack_require__(68);
exports.NgbTabset = tabset_2.NgbTabset;
exports.NgbTab = tabset_2.NgbTab;
exports.NgbTabContent = tabset_2.NgbTabContent;
exports.NgbTabTitle = tabset_2.NgbTabTitle;
var tabset_config_2 = __webpack_require__(23);
exports.NgbTabsetConfig = tabset_config_2.NgbTabsetConfig;
var NGB_TABSET_DIRECTIVES = [tabset_1.NgbTabset, tabset_1.NgbTab, tabset_1.NgbTabContent, tabset_1.NgbTabTitle];
var NgbTabsetModule = (function () {
    function NgbTabsetModule() {
    }
    NgbTabsetModule_1 = NgbTabsetModule;
    NgbTabsetModule.forRoot = function () { return { ngModule: NgbTabsetModule_1, providers: [tabset_config_1.NgbTabsetConfig] }; };
    NgbTabsetModule = NgbTabsetModule_1 = __decorate([
        core_1.NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [common_1.CommonModule] })
    ], NgbTabsetModule);
    return NgbTabsetModule;
    var NgbTabsetModule_1;
}());
exports.NgbTabsetModule = NgbTabsetModule;
//# sourceMappingURL=tabset.module.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var tabset_config_1 = __webpack_require__(23);
var nextId = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
var NgbTabTitle = (function () {
    function NgbTabTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabTitle = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbTabTitle]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbTabTitle);
    return NgbTabTitle;
}());
exports.NgbTabTitle = NgbTabTitle;
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
var NgbTabContent = (function () {
    function NgbTabContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabContent = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbTabContent]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbTabContent);
    return NgbTabContent;
}());
exports.NgbTabContent = NgbTabContent;
/**
 * A directive representing an individual tab.
 */
var NgbTab = (function () {
    function NgbTab() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = "ngb-tab-" + nextId++;
        /**
         * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
         */
        this.disabled = false;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTab.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTab.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTab.prototype, "disabled", void 0);
    __decorate([
        core_1.ContentChild(NgbTabContent),
        __metadata("design:type", NgbTabContent)
    ], NgbTab.prototype, "contentTpl", void 0);
    __decorate([
        core_1.ContentChild(NgbTabTitle),
        __metadata("design:type", NgbTabTitle)
    ], NgbTab.prototype, "titleTpl", void 0);
    NgbTab = __decorate([
        core_1.Directive({ selector: 'ngb-tab' })
    ], NgbTab);
    return NgbTab;
}());
exports.NgbTab = NgbTab;
/**
 * A component that makes it easy to create tabbed interface.
 */
var NgbTabset = (function () {
    function NgbTabset(config) {
        /**
         * Whether the closed tabs should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
         */
        this.tabChange = new core_1.EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
        this.orientation = config.orientation;
    }
    Object.defineProperty(NgbTabset.prototype, "justify", {
        /**
         * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill' or
         * 'justified'
         * The default value is 'start'.
         */
        set: function (className) {
            if (className === 'fill' || className === 'justified') {
                this.justifyClass = "nav-" + className;
            }
            else {
                this.justifyClass = "justify-content-" + className;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     */
    NgbTabset.prototype.select = function (tabId) {
        var selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            var defaultPrevented_1 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: function () { defaultPrevented_1 = true; } });
            if (!defaultPrevented_1) {
                this.activeId = selectedTab.id;
            }
        }
    };
    NgbTabset.prototype.ngAfterContentChecked = function () {
        // auto-correct activeId that might have been set incorrectly as input
        var activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    };
    NgbTabset.prototype._getTabById = function (id) {
        var tabsWithId = this.tabs.filter(function (tab) { return tab.id === id; });
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    __decorate([
        core_1.ContentChildren(NgbTab),
        __metadata("design:type", core_1.QueryList)
    ], NgbTabset.prototype, "tabs", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "activeId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTabset.prototype, "destroyOnHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NgbTabset.prototype, "justify", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "type", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbTabset.prototype, "tabChange", void 0);
    NgbTabset = __decorate([
        core_1.Component({
            selector: 'ngb-tabset',
            exportAs: 'ngbTabset',
            template: "\n    <ul [class]=\"'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          href (click)=\"!!select(tab.id)\" role=\"tab\" [attr.tabindex]=\"(tab.disabled ? '-1': undefined)\"\n          [attr.aria-controls]=\"(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)\"\n          [attr.aria-expanded]=\"tab.id === activeId\" [attr.aria-disabled]=\"tab.disabled\">\n          {{tab.title}}<ng-template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></ng-template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n        <div\n          class=\"tab-pane {{tab.id === activeId ? 'active' : null}}\"\n          *ngIf=\"!destroyOnHide || tab.id === activeId\"\n          role=\"tabpanel\"\n          [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\"\n          [attr.aria-expanded]=\"tab.id === activeId\">\n          <ng-template [ngTemplateOutlet]=\"tab.contentTpl.templateRef\"></ng-template>\n        </div>\n      </ng-template>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [tabset_config_1.NgbTabsetConfig])
    ], NgbTabset);
    return NgbTabset;
}());
exports.NgbTabset = NgbTabset;
//# sourceMappingURL=tabset.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var timepicker_1 = __webpack_require__(70);
var timepicker_config_1 = __webpack_require__(24);
var timepicker_2 = __webpack_require__(70);
exports.NgbTimepicker = timepicker_2.NgbTimepicker;
var timepicker_config_2 = __webpack_require__(24);
exports.NgbTimepickerConfig = timepicker_config_2.NgbTimepickerConfig;
var NgbTimepickerModule = (function () {
    function NgbTimepickerModule() {
    }
    NgbTimepickerModule_1 = NgbTimepickerModule;
    NgbTimepickerModule.forRoot = function () { return { ngModule: NgbTimepickerModule_1, providers: [timepicker_config_1.NgbTimepickerConfig] }; };
    NgbTimepickerModule = NgbTimepickerModule_1 = __decorate([
        core_1.NgModule({ declarations: [timepicker_1.NgbTimepicker], exports: [timepicker_1.NgbTimepicker], imports: [common_1.CommonModule] })
    ], NgbTimepickerModule);
    return NgbTimepickerModule;
    var NgbTimepickerModule_1;
}());
exports.NgbTimepickerModule = NgbTimepickerModule;
//# sourceMappingURL=timepicker.module.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(5);
var util_1 = __webpack_require__(1);
var ngb_time_1 = __webpack_require__(81);
var timepicker_config_1 = __webpack_require__(24);
var NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbTimepicker; }),
    multi: true
};
/**
 * A lightweight & configurable timepicker directive.
 */
var NgbTimepicker = (function () {
    function NgbTimepicker(config) {
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.meridian = config.meridian;
        this.spinners = config.spinners;
        this.seconds = config.seconds;
        this.hourStep = config.hourStep;
        this.minuteStep = config.minuteStep;
        this.secondStep = config.secondStep;
        this.disabled = config.disabled;
        this.readonlyInputs = config.readonlyInputs;
        this.size = config.size;
    }
    NgbTimepicker.prototype.writeValue = function (value) {
        this.model = value ? new ngb_time_1.NgbTime(value.hour, value.minute, value.second) : new ngb_time_1.NgbTime();
        if (!this.seconds && (!value || !util_1.isNumber(value.second))) {
            this.model.second = 0;
        }
    };
    NgbTimepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbTimepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbTimepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    NgbTimepicker.prototype.changeHour = function (step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.changeMinute = function (step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.changeSecond = function (step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateHour = function (newVal) {
        var isPM = this.model.hour >= 12;
        var enteredHour = util_1.toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateMinute = function (newVal) {
        this.model.updateMinute(util_1.toInteger(newVal));
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateSecond = function (newVal) {
        this.model.updateSecond(util_1.toInteger(newVal));
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.toggleMeridian = function () {
        if (this.meridian) {
            this.changeHour(12);
        }
    };
    NgbTimepicker.prototype.formatHour = function (value) {
        if (util_1.isNumber(value)) {
            if (this.meridian) {
                return util_1.padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return util_1.padNumber(value % 24);
            }
        }
        else {
            return util_1.padNumber(NaN);
        }
    };
    NgbTimepicker.prototype.formatMinSec = function (value) { return util_1.padNumber(value); };
    NgbTimepicker.prototype.setFormControlSize = function () { return { 'form-control-sm': this.size === 'small', 'form-control-lg': this.size === 'large' }; };
    NgbTimepicker.prototype.setButtonSize = function () { return { 'btn-sm': this.size === 'small', 'btn-lg': this.size === 'large' }; };
    NgbTimepicker.prototype.ngOnChanges = function (changes) {
        if (changes['seconds'] && !this.seconds && this.model && !util_1.isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    };
    NgbTimepicker.prototype.propagateModelChange = function (touched) {
        if (touched === void 0) { touched = true; }
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange({ hour: this.model.hour, minute: this.model.minute, second: this.model.second });
        }
        else {
            this.onChange(null);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTimepicker.prototype, "meridian", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTimepicker.prototype, "spinners", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTimepicker.prototype, "seconds", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbTimepicker.prototype, "hourStep", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbTimepicker.prototype, "minuteStep", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbTimepicker.prototype, "secondStep", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTimepicker.prototype, "readonlyInputs", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTimepicker.prototype, "size", void 0);
    NgbTimepicker = __decorate([
        core_1.Component({
            selector: 'ngb-timepicker',
            styles: ["\n    .ngb-tp {\n      display: flex;\n      align-items: center;\n    }\n\n    .ngb-tp-hour, .ngb-tp-minute, .ngb-tp-second, .ngb-tp-meridian {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-around;\n    }\n\n    .ngb-tp-spacer {\n      width: 1em;\n      text-align: center;\n    }\n\n    .chevron::before {\n      border-style: solid;\n      border-width: 0.29em 0.29em 0 0;\n      content: '';\n      display: inline-block;\n      height: 0.69em;\n      left: 0.05em;\n      position: relative;\n      top: 0.15em;\n      transform: rotate(-45deg);\n      -webkit-transform: rotate(-45deg);\n      -ms-transform: rotate(-45deg);\n      vertical-align: middle;\n      width: 0.71em;\n    }\n\n    .chevron.bottom:before {\n      top: -.3em;\n      -webkit-transform: rotate(135deg);\n      -ms-transform: rotate(135deg);\n      transform: rotate(135deg);\n    }\n\n    input {\n      text-align: center;\n      display: inline-block;\n      width: auto;\n    }\n  "],
            template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-hour\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeHour(hourStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n            <span class=\"sr-only\">Increment hours</span>\n          </button>\n          <input type=\"text\" class=\"form-control\" [ngClass]=\"setFormControlSize()\" maxlength=\"2\" size=\"2\" placeholder=\"HH\"\n            [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Hours\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeHour(-hourStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n            <span class=\"sr-only\">Decrement hours</span>\n          </button>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-minute\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeMinute(minuteStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n            <span class=\"sr-only\">Increment minutes</span>\n          </button>\n          <input type=\"text\" class=\"form-control\" [ngClass]=\"setFormControlSize()\" maxlength=\"2\" size=\"2\" placeholder=\"MM\"\n            [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Minutes\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeMinute(-minuteStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n            <span class=\"sr-only\">Decrement minutes</span>\n          </button>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-second\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeSecond(secondStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n            <span class=\"sr-only\">Increment seconds</span>\n          </button>\n          <input type=\"text\" class=\"form-control\" [ngClass]=\"setFormControlSize()\" maxlength=\"2\" size=\"2\" placeholder=\"SS\"\n            [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Seconds\">\n          <button *ngIf=\"spinners\" type=\"button\" class=\"btn btn-link\" [ngClass]=\"setButtonSize()\" (click)=\"changeSecond(-secondStep)\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n            <span class=\"sr-only\">Decrement seconds</span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-outline-primary\" [ngClass]=\"setButtonSize()\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\"\n            (click)=\"toggleMeridian()\">{{model?.hour >= 12 ? 'PM' : 'AM'}}</button>\n        </div>\n      </div>\n    </fieldset>\n  ",
            providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [timepicker_config_1.NgbTimepickerConfig])
    ], NgbTimepicker);
    return NgbTimepicker;
}());
exports.NgbTimepicker = NgbTimepicker;
//# sourceMappingURL=timepicker.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var tooltip_1 = __webpack_require__(72);
var tooltip_config_1 = __webpack_require__(25);
var tooltip_config_2 = __webpack_require__(25);
exports.NgbTooltipConfig = tooltip_config_2.NgbTooltipConfig;
var tooltip_2 = __webpack_require__(72);
exports.NgbTooltip = tooltip_2.NgbTooltip;
var NgbTooltipModule = (function () {
    function NgbTooltipModule() {
    }
    NgbTooltipModule_1 = NgbTooltipModule;
    NgbTooltipModule.forRoot = function () { return { ngModule: NgbTooltipModule_1, providers: [tooltip_config_1.NgbTooltipConfig] }; };
    NgbTooltipModule = NgbTooltipModule_1 = __decorate([
        core_1.NgModule({ declarations: [tooltip_1.NgbTooltip, tooltip_1.NgbTooltipWindow], exports: [tooltip_1.NgbTooltip], entryComponents: [tooltip_1.NgbTooltipWindow] })
    ], NgbTooltipModule);
    return NgbTooltipModule;
    var NgbTooltipModule_1;
}());
exports.NgbTooltipModule = NgbTooltipModule;
//# sourceMappingURL=tooltip.module.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var triggers_1 = __webpack_require__(62);
var positioning_1 = __webpack_require__(7);
var popup_1 = __webpack_require__(10);
var tooltip_config_1 = __webpack_require__(25);
var nextId = 0;
var NgbTooltipWindow = (function () {
    function NgbTooltipWindow(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.placement = 'top';
    }
    NgbTooltipWindow.prototype.applyPlacement = function (_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
        this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
        // set the new placement classes
        this.placement = _placement;
        // apply the new placement
        this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
        this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTooltipWindow.prototype, "placement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTooltipWindow.prototype, "id", void 0);
    NgbTooltipWindow = __decorate([
        core_1.Component({
            selector: 'ngb-tooltip-window',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: {
                '[class]': '"tooltip show bs-tooltip-" + placement.split("-")[0]+" bs-tooltip-" + placement',
                'role': 'tooltip',
                '[id]': 'id'
            },
            template: "<div class=\"arrow\"></div><div class=\"tooltip-inner\"><ng-content></ng-content></div>",
            styles: ["\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: calc(50% - 0.4rem);\n    }\n\n    :host.bs-tooltip-top-left .arrow, :host.bs-tooltip-bottom-left .arrow {\n      left: 1em;\n    }\n\n    :host.bs-tooltip-top-right .arrow, :host.bs-tooltip-bottom-right .arrow {\n      left: auto;\n      right: 0.8rem;\n    }\n\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: calc(50% - 0.4rem);\n    }\n    \n    :host.bs-tooltip-left-top .arrow, :host.bs-tooltip-right-top .arrow {\n      top: 0.4rem;\n    }\n\n    :host.bs-tooltip-left-bottom .arrow, :host.bs-tooltip-right-bottom .arrow {\n      top: auto;\n      bottom: 0.4rem;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], NgbTooltipWindow);
    return NgbTooltipWindow;
}());
exports.NgbTooltipWindow = NgbTooltipWindow;
/**
 * A lightweight, extensible directive for fancy tooltip creation.
 */
var NgbTooltip = (function () {
    function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, ngZone) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new core_1.EventEmitter();
        /**
         * Emits an event when the tooltip is hidden
         */
        this.hidden = new core_1.EventEmitter();
        this._ngbTooltipWindowId = "ngb-tooltip-" + nextId++;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this._popupService = new popup_1.PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this._windowRef) {
                _this._windowRef.instance.applyPlacement(positioning_1.positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body'));
            }
        });
    }
    Object.defineProperty(NgbTooltip.prototype, "ngbTooltip", {
        get: function () { return this._ngbTooltip; },
        /**
         * Content to be displayed as tooltip. If falsy, the tooltip won't open.
         */
        set: function (value) {
            this._ngbTooltip = value;
            if (!value && this._windowRef) {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     */
    NgbTooltip.prototype.open = function (context) {
        if (!this._windowRef && this._ngbTooltip) {
            this._windowRef = this._popupService.open(this._ngbTooltip, context);
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._windowRef.instance.placement = Array.isArray(this.placement) ? this.placement[0] : this.placement;
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.detectChanges();
            this._windowRef.changeDetectorRef.markForCheck();
            // position tooltip along the element
            this._windowRef.instance.applyPlacement(positioning_1.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            this.shown.emit();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     */
    NgbTooltip.prototype.close = function () {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     */
    NgbTooltip.prototype.toggle = function () {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    NgbTooltip.prototype.isOpen = function () { return this._windowRef != null; };
    NgbTooltip.prototype.ngOnInit = function () {
        this._unregisterListenersFn = triggers_1.listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    };
    NgbTooltip.prototype.ngOnDestroy = function () {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTooltip.prototype, "placement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTooltip.prototype, "triggers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTooltip.prototype, "container", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbTooltip.prototype, "shown", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbTooltip.prototype, "hidden", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgbTooltip.prototype, "ngbTooltip", null);
    NgbTooltip = __decorate([
        core_1.Directive({ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, core_1.Injector,
            core_1.ComponentFactoryResolver, core_1.ViewContainerRef, tooltip_config_1.NgbTooltipConfig,
            core_1.NgZone])
    ], NgbTooltip);
    return NgbTooltip;
}());
exports.NgbTooltip = NgbTooltip;
//# sourceMappingURL=tooltip.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var highlight_1 = __webpack_require__(74);
var typeahead_window_1 = __webpack_require__(26);
var typeahead_1 = __webpack_require__(75);
var typeahead_config_1 = __webpack_require__(27);
var highlight_2 = __webpack_require__(74);
exports.NgbHighlight = highlight_2.NgbHighlight;
var typeahead_window_2 = __webpack_require__(26);
exports.NgbTypeaheadWindow = typeahead_window_2.NgbTypeaheadWindow;
var typeahead_config_2 = __webpack_require__(27);
exports.NgbTypeaheadConfig = typeahead_config_2.NgbTypeaheadConfig;
var typeahead_2 = __webpack_require__(75);
exports.NgbTypeahead = typeahead_2.NgbTypeahead;
var NgbTypeaheadModule = (function () {
    function NgbTypeaheadModule() {
    }
    NgbTypeaheadModule_1 = NgbTypeaheadModule;
    NgbTypeaheadModule.forRoot = function () { return { ngModule: NgbTypeaheadModule_1, providers: [typeahead_config_1.NgbTypeaheadConfig] }; };
    NgbTypeaheadModule = NgbTypeaheadModule_1 = __decorate([
        core_1.NgModule({
            declarations: [typeahead_1.NgbTypeahead, highlight_1.NgbHighlight, typeahead_window_1.NgbTypeaheadWindow],
            exports: [typeahead_1.NgbTypeahead, highlight_1.NgbHighlight],
            imports: [common_1.CommonModule],
            entryComponents: [typeahead_window_1.NgbTypeaheadWindow]
        })
    ], NgbTypeaheadModule);
    return NgbTypeaheadModule;
    var NgbTypeaheadModule_1;
}());
exports.NgbTypeaheadModule = NgbTypeaheadModule;
//# sourceMappingURL=typeahead.module.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var NgbHighlight = (function () {
    function NgbHighlight() {
        this.highlightClass = 'ngb-highlight';
    }
    NgbHighlight.prototype.ngOnChanges = function (changes) {
        var resultStr = util_1.toString(this.result);
        var resultLC = resultStr.toLowerCase();
        var termLC = util_1.toString(this.term).toLowerCase();
        var currentIdx = 0;
        if (termLC.length > 0) {
            this.parts = resultLC.split(new RegExp("(" + util_1.regExpEscape(termLC) + ")")).map(function (part) {
                var originalPart = resultStr.substr(currentIdx, part.length);
                currentIdx += part.length;
                return originalPart;
            });
        }
        else {
            this.parts = [resultStr];
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbHighlight.prototype, "highlightClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbHighlight.prototype, "result", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbHighlight.prototype, "term", void 0);
    NgbHighlight = __decorate([
        core_1.Component({
            selector: 'ngb-highlight',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
                "<span *ngIf=\"isOdd\" class=\"{{highlightClass}}\">{{part}}</span><ng-template [ngIf]=\"!isOdd\">{{part}}</ng-template>" +
                "</ng-template>",
            styles: ["\n    .ngb-highlight {\n      font-weight: bold;\n    }\n  "]
        })
    ], NgbHighlight);
    return NgbHighlight;
}());
exports.NgbHighlight = NgbHighlight;
//# sourceMappingURL=highlight.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(5);
var BehaviorSubject_1 = __webpack_require__(82);
var let_1 = __webpack_require__(83);
var do_1 = __webpack_require__(84);
var switchMap_1 = __webpack_require__(85);
var fromEvent_1 = __webpack_require__(86);
var positioning_1 = __webpack_require__(7);
var typeahead_window_1 = __webpack_require__(26);
var popup_1 = __webpack_require__(10);
var util_1 = __webpack_require__(1);
var typeahead_config_1 = __webpack_require__(27);
var Key;
(function (Key) {
    Key[Key["Tab"] = 9] = "Tab";
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Escape"] = 27] = "Escape";
    Key[Key["ArrowUp"] = 38] = "ArrowUp";
    Key[Key["ArrowDown"] = 40] = "ArrowDown";
})(Key || (Key = {}));
var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NgbTypeahead; }),
    multi: true
};
var nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
var NgbTypeahead = (function () {
    function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._injector = _injector;
        /** Placement of a typeahead accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         * and array of above values.
        */
        this.placement = 'bottom-left';
        /**
         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
         */
        this.selectItem = new core_1.EventEmitter();
        this.popupId = "ngb-typeahead-" + nextWindowId++;
        this._onTouched = function () { };
        this._onChange = function (_) { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent_1.fromEvent(_elementRef.nativeElement, 'input', function ($event) { return $event.target.value; });
        this._resubscribeTypeahead = new BehaviorSubject_1.BehaviorSubject(null);
        this._popupService = new popup_1.PopupService(typeahead_window_1.NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this.isPopupOpen()) {
                positioning_1.positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    NgbTypeahead.prototype.ngOnInit = function () {
        var _this = this;
        var inputValues$ = do_1._do.call(this._valueChanges, function (value) {
            _this._inputValueBackup = value;
            if (_this.editable) {
                _this._onChange(value);
            }
        });
        var results$ = let_1.letProto.call(inputValues$, this.ngbTypeahead);
        var processedResults$ = do_1._do.call(results$, function () {
            if (!_this.editable) {
                _this._onChange(undefined);
            }
        });
        var userInput$ = switchMap_1.switchMap.call(this._resubscribeTypeahead, function () { return processedResults$; });
        this._subscription = this._subscribeToUserInput(userInput$);
    };
    NgbTypeahead.prototype.ngOnDestroy = function () {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    };
    NgbTypeahead.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    NgbTypeahead.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    NgbTypeahead.prototype.writeValue = function (value) { this._writeInputValue(this._formatItemForInput(value)); };
    NgbTypeahead.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    NgbTypeahead.prototype.onDocumentClick = function (event) {
        if (event.target !== this._elementRef.nativeElement) {
            this.dismissPopup();
        }
    };
    /**
     * Dismisses typeahead popup window
     */
    NgbTypeahead.prototype.dismissPopup = function () {
        if (this.isPopupOpen()) {
            this._closePopup();
            this._writeInputValue(this._inputValueBackup);
        }
    };
    /**
     * Returns true if the typeahead popup window is displayed
     */
    NgbTypeahead.prototype.isPopupOpen = function () { return this._windowRef != null; };
    NgbTypeahead.prototype.handleBlur = function () {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    };
    NgbTypeahead.prototype.handleKeyDown = function (event) {
        if (!this.isPopupOpen()) {
            return;
        }
        if (Key[util_1.toString(event.which)]) {
            switch (event.which) {
                case Key.ArrowDown:
                    event.preventDefault();
                    this._windowRef.instance.next();
                    this._showHint();
                    break;
                case Key.ArrowUp:
                    event.preventDefault();
                    this._windowRef.instance.prev();
                    this._showHint();
                    break;
                case Key.Enter:
                case Key.Tab:
                    var result = this._windowRef.instance.getActive();
                    if (util_1.isDefined(result)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this._selectResult(result);
                    }
                    this._closePopup();
                    break;
                case Key.Escape:
                    event.preventDefault();
                    this._resubscribeTypeahead.next(null);
                    this.dismissPopup();
                    break;
            }
        }
    };
    NgbTypeahead.prototype._openPopup = function () {
        var _this = this;
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
            this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
        }
    };
    NgbTypeahead.prototype._closePopup = function () {
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    };
    NgbTypeahead.prototype._selectResult = function (result) {
        var defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    };
    NgbTypeahead.prototype._selectResultClosePopup = function (result) {
        this._selectResult(result);
        this._closePopup();
    };
    NgbTypeahead.prototype._showHint = function () {
        if (this.showHint && this._inputValueBackup != null) {
            var userInputLowerCase = this._inputValueBackup.toLowerCase();
            var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this.writeValue(this._windowRef.instance.getActive());
            }
        }
    };
    NgbTypeahead.prototype._formatItemForInput = function (item) {
        return item && this.inputFormatter ? this.inputFormatter(item) : util_1.toString(item);
    };
    NgbTypeahead.prototype._writeInputValue = function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', util_1.toString(value));
    };
    NgbTypeahead.prototype._subscribeToUserInput = function (userInput$) {
        var _this = this;
        return userInput$.subscribe(function (results) {
            if (!results || results.length === 0) {
                _this._closePopup();
            }
            else {
                _this._openPopup();
                _this._windowRef.instance.focusFirst = _this.focusFirst;
                _this._windowRef.instance.results = results;
                _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                if (_this.resultFormatter) {
                    _this._windowRef.instance.formatter = _this.resultFormatter;
                }
                if (_this.resultTemplate) {
                    _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                }
                _this._showHint();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                _this._windowRef.changeDetectorRef.detectChanges();
            }
        });
    };
    NgbTypeahead.prototype._unsubscribeFromUserInput = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTypeahead.prototype, "container", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTypeahead.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTypeahead.prototype, "focusFirst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgbTypeahead.prototype, "inputFormatter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgbTypeahead.prototype, "ngbTypeahead", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgbTypeahead.prototype, "resultFormatter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], NgbTypeahead.prototype, "resultTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgbTypeahead.prototype, "showHint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTypeahead.prototype, "placement", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbTypeahead.prototype, "selectItem", void 0);
    NgbTypeahead = __decorate([
        core_1.Directive({
            selector: 'input[ngbTypeahead]',
            exportAs: 'ngbTypeahead',
            host: {
                '(blur)': 'handleBlur()',
                '[class.open]': 'isPopupOpen()',
                '(document:click)': 'onDocumentClick($event)',
                '(keydown)': 'handleKeyDown($event)',
                'autocomplete': 'off',
                'autocapitalize': 'off',
                'autocorrect': 'off',
                'role': 'combobox',
                'aria-multiline': 'false',
                '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                '[attr.aria-activedescendant]': 'activeDescendant',
                '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                '[attr.aria-expanded]': 'isPopupOpen()'
            },
            providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.ViewContainerRef, core_1.Renderer2,
            core_1.Injector, core_1.ComponentFactoryResolver, typeahead_config_1.NgbTypeaheadConfig,
            core_1.NgZone])
    ], NgbTypeahead);
    return NgbTypeahead;
}());
exports.NgbTypeahead = NgbTypeahead;
//# sourceMappingURL=typeahead.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var accordion_module_1 = __webpack_require__(28);
var alert_module_1 = __webpack_require__(30);
var buttons_module_1 = __webpack_require__(32);
var carousel_module_1 = __webpack_require__(35);
var collapse_module_1 = __webpack_require__(37);
var datepicker_module_1 = __webpack_require__(39);
var dropdown_module_1 = __webpack_require__(49);
var modal_module_1 = __webpack_require__(51);
var pagination_module_1 = __webpack_require__(58);
var popover_module_1 = __webpack_require__(60);
var progressbar_module_1 = __webpack_require__(63);
var rating_module_1 = __webpack_require__(65);
var tabset_module_1 = __webpack_require__(67);
var timepicker_module_1 = __webpack_require__(69);
var tooltip_module_1 = __webpack_require__(71);
var typeahead_module_1 = __webpack_require__(73);
var accordion_module_2 = __webpack_require__(28);
exports.NgbAccordionModule = accordion_module_2.NgbAccordionModule;
exports.NgbAccordionConfig = accordion_module_2.NgbAccordionConfig;
exports.NgbAccordion = accordion_module_2.NgbAccordion;
exports.NgbPanel = accordion_module_2.NgbPanel;
exports.NgbPanelTitle = accordion_module_2.NgbPanelTitle;
exports.NgbPanelContent = accordion_module_2.NgbPanelContent;
var alert_module_2 = __webpack_require__(30);
exports.NgbAlertModule = alert_module_2.NgbAlertModule;
exports.NgbAlertConfig = alert_module_2.NgbAlertConfig;
exports.NgbAlert = alert_module_2.NgbAlert;
var buttons_module_2 = __webpack_require__(32);
exports.NgbButtonsModule = buttons_module_2.NgbButtonsModule;
exports.NgbCheckBox = buttons_module_2.NgbCheckBox;
exports.NgbRadioGroup = buttons_module_2.NgbRadioGroup;
var carousel_module_2 = __webpack_require__(35);
exports.NgbCarouselModule = carousel_module_2.NgbCarouselModule;
exports.NgbCarouselConfig = carousel_module_2.NgbCarouselConfig;
exports.NgbCarousel = carousel_module_2.NgbCarousel;
exports.NgbSlide = carousel_module_2.NgbSlide;
var collapse_module_2 = __webpack_require__(37);
exports.NgbCollapseModule = collapse_module_2.NgbCollapseModule;
exports.NgbCollapse = collapse_module_2.NgbCollapse;
var datepicker_module_2 = __webpack_require__(39);
exports.NgbCalendar = datepicker_module_2.NgbCalendar;
exports.NgbCalendarIslamicCivil = datepicker_module_2.NgbCalendarIslamicCivil;
exports.NgbCalendarIslamicUmalqura = datepicker_module_2.NgbCalendarIslamicUmalqura;
exports.NgbDatepickerModule = datepicker_module_2.NgbDatepickerModule;
exports.NgbDatepickerI18n = datepicker_module_2.NgbDatepickerI18n;
exports.NgbDatepickerConfig = datepicker_module_2.NgbDatepickerConfig;
exports.NgbDateParserFormatter = datepicker_module_2.NgbDateParserFormatter;
exports.NgbDateAdapter = datepicker_module_2.NgbDateAdapter;
exports.NgbDatepicker = datepicker_module_2.NgbDatepicker;
exports.NgbInputDatepicker = datepicker_module_2.NgbInputDatepicker;
var dropdown_module_2 = __webpack_require__(49);
exports.NgbDropdownModule = dropdown_module_2.NgbDropdownModule;
exports.NgbDropdownConfig = dropdown_module_2.NgbDropdownConfig;
exports.NgbDropdown = dropdown_module_2.NgbDropdown;
var modal_module_2 = __webpack_require__(51);
exports.NgbModalModule = modal_module_2.NgbModalModule;
exports.NgbModal = modal_module_2.NgbModal;
exports.NgbActiveModal = modal_module_2.NgbActiveModal;
exports.NgbModalRef = modal_module_2.NgbModalRef;
exports.ModalDismissReasons = modal_module_2.ModalDismissReasons;
var pagination_module_2 = __webpack_require__(58);
exports.NgbPaginationModule = pagination_module_2.NgbPaginationModule;
exports.NgbPaginationConfig = pagination_module_2.NgbPaginationConfig;
exports.NgbPagination = pagination_module_2.NgbPagination;
var popover_module_2 = __webpack_require__(60);
exports.NgbPopoverModule = popover_module_2.NgbPopoverModule;
exports.NgbPopoverConfig = popover_module_2.NgbPopoverConfig;
exports.NgbPopover = popover_module_2.NgbPopover;
var progressbar_module_2 = __webpack_require__(63);
exports.NgbProgressbarModule = progressbar_module_2.NgbProgressbarModule;
exports.NgbProgressbarConfig = progressbar_module_2.NgbProgressbarConfig;
exports.NgbProgressbar = progressbar_module_2.NgbProgressbar;
var rating_module_2 = __webpack_require__(65);
exports.NgbRatingModule = rating_module_2.NgbRatingModule;
exports.NgbRatingConfig = rating_module_2.NgbRatingConfig;
exports.NgbRating = rating_module_2.NgbRating;
var tabset_module_2 = __webpack_require__(67);
exports.NgbTabsetModule = tabset_module_2.NgbTabsetModule;
exports.NgbTabsetConfig = tabset_module_2.NgbTabsetConfig;
exports.NgbTabset = tabset_module_2.NgbTabset;
exports.NgbTab = tabset_module_2.NgbTab;
exports.NgbTabContent = tabset_module_2.NgbTabContent;
exports.NgbTabTitle = tabset_module_2.NgbTabTitle;
var timepicker_module_2 = __webpack_require__(69);
exports.NgbTimepickerModule = timepicker_module_2.NgbTimepickerModule;
exports.NgbTimepickerConfig = timepicker_module_2.NgbTimepickerConfig;
exports.NgbTimepicker = timepicker_module_2.NgbTimepicker;
var tooltip_module_2 = __webpack_require__(71);
exports.NgbTooltipModule = tooltip_module_2.NgbTooltipModule;
exports.NgbTooltipConfig = tooltip_module_2.NgbTooltipConfig;
exports.NgbTooltip = tooltip_module_2.NgbTooltip;
var typeahead_module_2 = __webpack_require__(73);
exports.NgbHighlight = typeahead_module_2.NgbHighlight;
exports.NgbTypeaheadModule = typeahead_module_2.NgbTypeaheadModule;
exports.NgbTypeaheadConfig = typeahead_module_2.NgbTypeaheadConfig;
exports.NgbTypeahead = typeahead_module_2.NgbTypeahead;
var NGB_MODULES = [
    accordion_module_1.NgbAccordionModule, alert_module_1.NgbAlertModule, buttons_module_1.NgbButtonsModule, carousel_module_1.NgbCarouselModule, collapse_module_1.NgbCollapseModule, datepicker_module_1.NgbDatepickerModule,
    dropdown_module_1.NgbDropdownModule, modal_module_1.NgbModalModule, pagination_module_1.NgbPaginationModule, popover_module_1.NgbPopoverModule, progressbar_module_1.NgbProgressbarModule, rating_module_1.NgbRatingModule,
    tabset_module_1.NgbTabsetModule, timepicker_module_1.NgbTimepickerModule, tooltip_module_1.NgbTooltipModule, typeahead_module_1.NgbTypeaheadModule
];
var NgbRootModule = (function () {
    function NgbRootModule() {
    }
    NgbRootModule = __decorate([
        core_1.NgModule({
            imports: [
                alert_module_1.NgbAlertModule.forRoot(), buttons_module_1.NgbButtonsModule.forRoot(), collapse_module_1.NgbCollapseModule.forRoot(), progressbar_module_1.NgbProgressbarModule.forRoot(),
                tooltip_module_1.NgbTooltipModule.forRoot(), typeahead_module_1.NgbTypeaheadModule.forRoot(), accordion_module_1.NgbAccordionModule.forRoot(), carousel_module_1.NgbCarouselModule.forRoot(),
                datepicker_module_1.NgbDatepickerModule.forRoot(), dropdown_module_1.NgbDropdownModule.forRoot(), modal_module_1.NgbModalModule.forRoot(), pagination_module_1.NgbPaginationModule.forRoot(),
                popover_module_1.NgbPopoverModule.forRoot(), progressbar_module_1.NgbProgressbarModule.forRoot(), rating_module_1.NgbRatingModule.forRoot(), tabset_module_1.NgbTabsetModule.forRoot(),
                timepicker_module_1.NgbTimepickerModule.forRoot(), tooltip_module_1.NgbTooltipModule.forRoot()
            ],
            exports: NGB_MODULES
        })
    ], NgbRootModule);
    return NgbRootModule;
}());
exports.NgbRootModule = NgbRootModule;
var NgbModule = (function () {
    function NgbModule() {
    }
    NgbModule.forRoot = function () { return { ngModule: NgbRootModule }; };
    NgbModule = __decorate([
        core_1.NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
    ], NgbModule);
    return NgbModule;
}());
exports.NgbModule = NgbModule;
//# sourceMappingURL=index.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_77__;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_78__;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var datepicker_service_1 = __webpack_require__(15);
var ngb_calendar_1 = __webpack_require__(4);
var util_1 = __webpack_require__(1);
var Key;
(function (Key) {
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Space"] = 32] = "Space";
    Key[Key["PageUp"] = 33] = "PageUp";
    Key[Key["PageDown"] = 34] = "PageDown";
    Key[Key["End"] = 35] = "End";
    Key[Key["Home"] = 36] = "Home";
    Key[Key["ArrowLeft"] = 37] = "ArrowLeft";
    Key[Key["ArrowUp"] = 38] = "ArrowUp";
    Key[Key["ArrowRight"] = 39] = "ArrowRight";
    Key[Key["ArrowDown"] = 40] = "ArrowDown";
})(Key || (Key = {}));
var NgbDatepickerKeyMapService = (function () {
    function NgbDatepickerKeyMapService(_service, _calendar) {
        var _this = this;
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(function (model) {
            _this._minDate = model.minDate;
            _this._maxDate = model.maxDate;
            _this._firstViewDate = model.firstDate;
            _this._lastViewDate = model.lastDate;
        });
    }
    NgbDatepickerKeyMapService.prototype.processKey = function (event) {
        if (Key[util_1.toString(event.which)]) {
            switch (event.which) {
                case Key.PageUp:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                    break;
                case Key.PageDown:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                    break;
                case Key.End:
                    this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                    break;
                case Key.Home:
                    this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                    break;
                case Key.ArrowLeft:
                    this._service.focusMove('d', -1);
                    break;
                case Key.ArrowUp:
                    this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                    break;
                case Key.ArrowRight:
                    this._service.focusMove('d', 1);
                    break;
                case Key.ArrowDown:
                    this._service.focusMove('d', this._calendar.getDaysPerWeek());
                    break;
                case Key.Enter:
                case Key.Space:
                    this._service.focusSelect();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            event.stopPropagation();
        }
    };
    NgbDatepickerKeyMapService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [datepicker_service_1.NgbDatepickerService, ngb_calendar_1.NgbCalendar])
    ], NgbDatepickerKeyMapService);
    return NgbDatepickerKeyMapService;
}());
exports.NgbDatepickerKeyMapService = NgbDatepickerKeyMapService;
//# sourceMappingURL=datepicker-keymap-service.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngb_calendar_islamic_civil_1 = __webpack_require__(47);
var ngb_calendar_hijri_1 = __webpack_require__(48);
var ngb_date_1 = __webpack_require__(3);
var core_1 = __webpack_require__(0);
/**
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 */
var GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
var GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
var HIJRI_BEGIN = 1300;
var HIJRI_END = 1600;
var ONE_DAY = 1000 * 60 * 60 * 24;
var ISLAMIC_CIVIL = new ngb_calendar_islamic_civil_1.NgbCalendarIslamicCivil();
var MONTH_LENGTH = [
    // 1300-1304
    '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
    // 1305-1309
    '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
    // 1310-1314
    '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
    // 1315-1319
    '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
    // 1320-1324
    '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
    // 1325-1329
    '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
    // 1330-1334
    '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
    // 1335-1339
    '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
    // 1340-1344
    '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
    // 1345-1349
    '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
    // 1350-1354
    '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
    // 1355-1359
    '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
    // 1360-1364
    '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
    // 1365-1369
    '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
    // 1370-1374
    '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
    // 1375-1379
    '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
    // 1380-1384
    '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
    // 1385-1389
    '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
    // 1390-1394
    '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
    // 1395-1399
    '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
    // 1400-1404
    '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
    // 1405-1409
    '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
    // 1410-1414
    '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
    // 1415-1419
    '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
    // 1420-1424
    '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
    // 1425-1429
    '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
    // 1430-1434
    '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
    // 1435-1439
    '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
    // 1440-1444
    '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
    // 1445-1449
    '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
    // 1450-1454
    '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
    // 1455-1459
    '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
    // 1460-1464
    '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
    // 1465-1469
    '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
    // 1470-1474
    '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
    // 1475-1479
    '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
    // 1480-1484
    '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
    // 1485-1489
    '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
    // 1490-1494
    '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
    // 1495-1499
    '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
    // 1500-1504
    '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
    // 1505-1509
    '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
    // 1510-1514
    '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
    // 1515-1519
    '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
    // 1520-1524
    '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
    // 1525-1529
    '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
    // 1530-1534
    '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
    // 1535-1539
    '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
    // 1540-1544
    '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
    // 1545-1549
    '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
    // 1550-1554
    '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
    // 1555-1559
    '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
    // 1560-1564
    '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
    // 1565-1569
    '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
    // 1570-1574
    '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
    // 1575-1579
    '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
    // 1580-1584
    '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
    // 1585-1589
    '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
    // 1590-1594
    '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
    // 1595-1599
    '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
    // 1600
    '001010011101'
];
function getDaysDiff(date1, date2) {
    var diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / ONE_DAY);
}
var NgbCalendarIslamicUmalqura = (function (_super) {
    __extends(NgbCalendarIslamicUmalqura, _super);
    function NgbCalendarIslamicUmalqura() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
    * `gdate` is s JS Date to be converted to Hijri.
    */
    NgbCalendarIslamicUmalqura.prototype.fromGregorian = function (gDate) {
        var hDay = 1, hMonth = 0, hYear = 1300;
        var daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            var year = 1300;
            for (var i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (var j = 0; j < 12; j++) {
                    var numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new ngb_date_1.NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
        }
        else {
            return ISLAMIC_CIVIL.fromGregorian(gDate);
        }
    };
    /**
    * Converts the current Hijri date to Gregorian.
    */
    NgbCalendarIslamicUmalqura.prototype.toGregorian = function (hijriDate) {
        var hYear = hijriDate.year;
        var hMonth = hijriDate.month - 1;
        var hDay = hijriDate.day;
        var gDate = new Date(GREGORIAN_FIRST_DATE);
        var dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (var y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (var m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (var m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = ISLAMIC_CIVIL.toGregorian(hijriDate);
        }
        return gDate;
    };
    /**
    * Returns the number of days in a specific Hijri month.
    * `month` is 1 for Muharram, 2 for Safar, etc.
    * `year` is any Hijri year.
    */
    NgbCalendarIslamicUmalqura.prototype.getDaysInIslamicMonth = function (month, year) {
        if (year >= HIJRI_BEGIN && year <= HIJRI_END) {
            var pos = year - HIJRI_BEGIN;
            return MONTH_LENGTH[pos].charAt(month - 1) === '1' ? 30 : 29;
        }
        return ISLAMIC_CIVIL.getDaysInIslamicMonth(month, year);
    };
    NgbCalendarIslamicUmalqura.prototype.getNext = function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        date = ngb_date_1.NgbDate.from(date);
        switch (period) {
            case 'y':
                date = this.setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this.setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this.setDay(date, date.day + number);
            default:
                return date;
        }
    };
    NgbCalendarIslamicUmalqura.prototype.getPrev = function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        return this.getNext(date, period, -number);
    };
    NgbCalendarIslamicUmalqura.prototype.getWeekday = function (date) {
        var day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    NgbCalendarIslamicUmalqura.prototype.getWeekNumber = function (week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        var date = week[thursdayIndex];
        var jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        var time = jsDate.getTime();
        var MuhDate = this.toGregorian(new ngb_date_1.NgbDate(date.year, 1, 1)); // Compare with Muharram 1
        return Math.floor(Math.round((time - MuhDate.getTime()) / ONE_DAY) / 7) + 1;
    };
    NgbCalendarIslamicUmalqura.prototype.getToday = function () { return this.fromGregorian(new Date()); };
    NgbCalendarIslamicUmalqura = __decorate([
        core_1.Injectable()
    ], NgbCalendarIslamicUmalqura);
    return NgbCalendarIslamicUmalqura;
}(ngb_calendar_hijri_1.NgbCalendarHijri));
exports.NgbCalendarIslamicUmalqura = NgbCalendarIslamicUmalqura;
//# sourceMappingURL=ngb-calendar-islamic-umalqura.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(1);
var NgbTime = (function () {
    function NgbTime(hour, minute, second) {
        this.hour = util_1.toInteger(hour);
        this.minute = util_1.toInteger(minute);
        this.second = util_1.toInteger(second);
    }
    NgbTime.prototype.changeHour = function (step) {
        if (step === void 0) { step = 1; }
        this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
    };
    NgbTime.prototype.updateHour = function (hour) {
        if (util_1.isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    };
    NgbTime.prototype.changeMinute = function (step) {
        if (step === void 0) { step = 1; }
        this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
    };
    NgbTime.prototype.updateMinute = function (minute) {
        if (util_1.isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    };
    NgbTime.prototype.changeSecond = function (step) {
        if (step === void 0) { step = 1; }
        this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
    };
    NgbTime.prototype.updateSecond = function (second) {
        if (util_1.isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    };
    NgbTime.prototype.isValid = function (checkSecs) {
        if (checkSecs === void 0) { checkSecs = true; }
        return util_1.isNumber(this.hour) && util_1.isNumber(this.minute) && (checkSecs ? util_1.isNumber(this.second) : true);
    };
    NgbTime.prototype.toString = function () { return (this.hour || 0) + ":" + (this.minute || 0) + ":" + (this.second || 0); };
    return NgbTime;
}());
exports.NgbTime = NgbTime;
//# sourceMappingURL=ngb-time.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_82__;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_83__;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_84__;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_85__;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_86__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ng-bootstrap.js.map