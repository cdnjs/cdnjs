'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('primereact/utils');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var FilterMatchMode = Object.freeze({
  STARTS_WITH: 'startsWith',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  IN: 'in',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUAL_TO: 'lte',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUAL_TO: 'gte',
  BETWEEN: 'between',
  DATE_IS: 'dateIs',
  DATE_IS_NOT: 'dateIsNot',
  DATE_BEFORE: 'dateBefore',
  DATE_AFTER: 'dateAfter',
  CUSTOM: 'custom'
});

var FilterOperator = Object.freeze({
  AND: 'and',
  OR: 'or'
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var FilterService = {
  filter: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    var filteredItems = [];
    if (!value) {
      return filteredItems;
    }
    var _iterator = _createForOfIteratorHelper(value),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (typeof item === 'string') {
          if (this.filters[filterMatchMode](item, filterValue, filterLocale)) {
            filteredItems.push(item);
            continue;
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper(fields),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var field = _step2.value;
              var fieldValue = utils.ObjectUtils.resolveFieldData(item, field);
              if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return filteredItems;
  },
  filters: {
    startsWith: function startsWith(value, filter, filterLocale) {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: function contains(value, filter, filterLocale) {
      if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: function notContains(value, filter, filterLocale) {
      if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: function endsWith(value, filter, filterLocale) {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: function equals(value, filter, filterLocale) {
      if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) {
        return value.getTime() === filter.getTime();
      }
      return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) === utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: function notEquals(value, filter, filterLocale) {
      if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return true;
      }
      if (value.getTime && filter.getTime) {
        return value.getTime() !== filter.getTime();
      }
      return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) !== utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    "in": function _in(value, filter) {
      if (filter === undefined || filter === null || filter.length === 0) {
        return true;
      }
      for (var i = 0; i < filter.length; i++) {
        if (utils.ObjectUtils.equals(value, filter[i])) {
          return true;
        }
      }
      return false;
    },
    notIn: function notIn(value, filter) {
      if (filter === undefined || filter === null || filter.length === 0) {
        return true;
      }
      for (var i = 0; i < filter.length; i++) {
        if (utils.ObjectUtils.equals(value, filter[i])) {
          return false;
        }
      }
      return true;
    },
    between: function between(value, filter) {
      if (filter == null || filter[0] == null || filter[1] == null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      if (value.getTime) {
        return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
      }
      return filter[0] <= value && value <= filter[1];
    },
    lt: function lt(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) {
        return value.getTime() < filter.getTime();
      }
      return value < filter;
    },
    lte: function lte(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) {
        return value.getTime() <= filter.getTime();
      }
      return value <= filter;
    },
    gt: function gt(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) {
        return value.getTime() > filter.getTime();
      }
      return value > filter;
    },
    gte: function gte(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) {
        return value.getTime() >= filter.getTime();
      }
      return value >= filter;
    },
    dateIs: function dateIs(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.toDateString() === filter.toDateString();
    },
    dateIsNot: function dateIsNot(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.toDateString() !== filter.toDateString();
    },
    dateBefore: function dateBefore(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.getTime() < filter.getTime();
    },
    dateAfter: function dateAfter(value, filter) {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.getTime() > filter.getTime();
    }
  },
  register: function register(rule, fn) {
    this.filters[rule] = fn;
  }
};

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * @deprecated please use PrimeReactContext
 */
var PrimeReact$1 = /*#__PURE__*/_createClass(function PrimeReact() {
  _classCallCheck(this, PrimeReact);
});
_defineProperty(PrimeReact$1, "ripple", false);
_defineProperty(PrimeReact$1, "inputStyle", 'outlined');
_defineProperty(PrimeReact$1, "locale", 'en');
_defineProperty(PrimeReact$1, "appendTo", null);
_defineProperty(PrimeReact$1, "cssTransition", true);
_defineProperty(PrimeReact$1, "autoZIndex", true);
_defineProperty(PrimeReact$1, "hideOverlaysOnDocumentScrolling", false);
_defineProperty(PrimeReact$1, "nonce", null);
_defineProperty(PrimeReact$1, "nullSortOrder", 1);
_defineProperty(PrimeReact$1, "zIndex", {
  modal: 1100,
  overlay: 1000,
  menu: 1000,
  tooltip: 1100,
  toast: 1200
});
_defineProperty(PrimeReact$1, "pt", undefined);
_defineProperty(PrimeReact$1, "filterMatchModeOptions", {
  text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
  numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
  date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
});
_defineProperty(PrimeReact$1, "changeTheme", function (currentTheme, newTheme, linkElementId, callback) {
  var _linkElement$parentNo;
  var linkElement = document.getElementById(linkElementId);
  if (!linkElement) {
    throw Error("Element with id ".concat(linkElementId, " not found."));
  }
  var newThemeUrl = linkElement.getAttribute('href').replace(currentTheme, newTheme);
  var newLinkElement = document.createElement('link');
  newLinkElement.setAttribute('rel', 'stylesheet');
  newLinkElement.setAttribute('id', linkElementId);
  newLinkElement.setAttribute('href', newThemeUrl);
  newLinkElement.addEventListener('load', function () {
    if (callback) {
      callback();
    }
  });
  (_linkElement$parentNo = linkElement.parentNode) === null || _linkElement$parentNo === void 0 || _linkElement$parentNo.replaceChild(newLinkElement, linkElement);
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var locales = {
  en: {
    accept: 'Yes',
    addRule: 'Add Rule',
    am: 'AM',
    apply: 'Apply',
    cancel: 'Cancel',
    choose: 'Choose',
    chooseDate: 'Choose Date',
    chooseMonth: 'Choose Month',
    chooseYear: 'Choose Year',
    clear: 'Clear',
    completed: 'Completed',
    contains: 'Contains',
    custom: 'Custom',
    dateAfter: 'Date is after',
    dateBefore: 'Date is before',
    dateFormat: 'mm/dd/yy',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    emptyFilterMessage: 'No results found',
    emptyMessage: 'No available options',
    emptySearchMessage: 'No results found',
    emptySelectionMessage: 'No selected item',
    endsWith: 'Ends with',
    equals: 'Equals',
    fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    filter: 'Filter',
    firstDayOfWeek: 0,
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    lt: 'Less than',
    lte: 'Less than or equal to',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    medium: 'Medium',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    nextDecade: 'Next Decade',
    nextHour: 'Next Hour',
    nextMinute: 'Next Minute',
    nextMonth: 'Next Month',
    nextSecond: 'Next Second',
    nextYear: 'Next Year',
    noFilter: 'No Filter',
    notContains: 'Not contains',
    notEquals: 'Not equals',
    now: 'Now',
    passwordPrompt: 'Enter a password',
    pending: 'Pending',
    pm: 'PM',
    prevDecade: 'Previous Decade',
    prevHour: 'Previous Hour',
    prevMinute: 'Previous Minute',
    prevMonth: 'Previous Month',
    prevSecond: 'Previous Second',
    prevYear: 'Previous Year',
    reject: 'No',
    removeRule: 'Remove Rule',
    searchMessage: '{0} results are available',
    selectionMessage: '{0} items selected',
    showMonthAfterYear: false,
    startsWith: 'Starts with',
    strong: 'Strong',
    today: 'Today',
    upload: 'Upload',
    weak: 'Weak',
    weekHeader: 'Wk',
    aria: {
      cancelEdit: 'Cancel Edit',
      close: 'Close',
      collapseRow: 'Row Collapsed',
      editRow: 'Edit Row',
      expandRow: 'Row Expanded',
      falseLabel: 'False',
      filterConstraint: 'Filter Constraint',
      filterOperator: 'Filter Operator',
      firstPageLabel: 'First Page',
      gridView: 'Grid View',
      hideFilterMenu: 'Hide Filter Menu',
      jumpToPageDropdownLabel: 'Jump to Page Dropdown',
      jumpToPageInputLabel: 'Jump to Page Input',
      lastPageLabel: 'Last Page',
      listView: 'List View',
      moveAllToSource: 'Move All to Source',
      moveAllToTarget: 'Move All to Target',
      moveBottom: 'Move Bottom',
      moveDown: 'Move Down',
      moveToSource: 'Move to Source',
      moveToTarget: 'Move to Target',
      moveTop: 'Move Top',
      moveUp: 'Move Up',
      navigation: 'Navigation',
      next: 'Next',
      nextPageLabel: 'Next Page',
      nullLabel: 'Not Selected',
      pageLabel: 'Page {page}',
      otpLabel: 'Please enter one time password character {0}',
      passwordHide: 'Hide Password',
      passwordShow: 'Show Password',
      previous: 'Previous',
      previousPageLabel: 'Previous Page',
      rotateLeft: 'Rotate Left',
      rotateRight: 'Rotate Right',
      rowsPerPageLabel: 'Rows per page',
      saveEdit: 'Save Edit',
      scrollTop: 'Scroll Top',
      selectAll: 'All items selected',
      selectRow: 'Row Selected',
      showFilterMenu: 'Show Filter Menu',
      slide: 'Slide',
      slideNumber: '{slideNumber}',
      star: '1 star',
      stars: '{star} stars',
      trueLabel: 'True',
      unselectAll: 'All items unselected',
      unselectRow: 'Row Unselected',
      zoomImage: 'Zoom Image',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out'
    }
  }
};
function locale(locale) {
  locale && (PrimeReact$1.locale = locale);
  return {
    locale: PrimeReact$1.locale,
    options: locales[PrimeReact$1.locale]
  };
}
function addLocale(locale, options) {
  if (locale.includes('__proto__') || locale.includes('prototype')) {
    throw new Error('Unsafe locale detected');
  }
  locales[locale] = _objectSpread(_objectSpread({}, locales.en), options);
}
function updateLocaleOption(key, value, locale) {
  if (key.includes('__proto__') || key.includes('prototype')) {
    throw new Error('Unsafe key detected');
  }
  localeOptions(locale)[key] = value;
}
function updateLocaleOptions(options, locale) {
  if (locale.includes('__proto__') || locale.includes('prototype')) {
    throw new Error('Unsafe locale detected');
  }
  var _locale = locale || PrimeReact$1.locale;
  locales[_locale] = _objectSpread(_objectSpread({}, locales[_locale]), options);
}
function localeOption(key, locale) {
  if (key.includes('__proto__') || key.includes('prototype')) {
    throw new Error('Unsafe key detected');
  }
  var _locale = locale || PrimeReact$1.locale;
  try {
    return localeOptions(_locale)[key];
  } catch (error) {
    throw new Error("The ".concat(key, " option is not found in the current locale('").concat(_locale, "')."));
  }
}

/**
 * Find an ARIA label in the locale by key.  If options are passed it will replace all options:
 * ```ts
 * const ariaValue = "Page {page}, User {user}, Role {role}";
 * const options = { page: 2, user: "John", role: "Admin" };
 * const result = ariaLabel('yourLabel', { page: 2, user: "John", role: "Admin" })
 * console.log(result); // Output: Page 2, User John, Role Admin
 * ```
 * @param {string} ariaKey key of the ARIA label to look up in locale.
 * @param {any} options JSON options like { page: 2, user: "John", role: "Admin" }
 * @returns the ARIA label with replaced values
 */
function ariaLabel(ariaKey, options) {
  if (ariaKey.includes('__proto__') || ariaKey.includes('prototype')) {
    throw new Error('Unsafe ariaKey detected');
  }
  var _locale = PrimeReact$1.locale;
  try {
    var _ariaLabel = localeOptions(_locale).aria[ariaKey];
    if (_ariaLabel) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          _ariaLabel = _ariaLabel.replace("{".concat(key, "}"), options[key]);
        }
      }
    }
    return _ariaLabel;
  } catch (error) {
    throw new Error("The ".concat(ariaKey, " option is not found in the current locale('").concat(_locale, "')."));
  }
}
function localeOptions(locale) {
  var _locale = locale || PrimeReact$1.locale;
  if (_locale.includes('__proto__') || _locale.includes('prototype')) {
    throw new Error('Unsafe locale detected');
  }
  return locales[_locale];
}

var MessageSeverity = Object.freeze({
  SUCCESS: 'success',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  SECONDARY: 'secondary',
  CONTRAST: 'contrast'
});

var PrimeIcons = Object.freeze({
  ADDRESS_BOOK: 'pi pi-address-book',
  ALIGN_CENTER: 'pi pi-align-center',
  ALIGN_JUSTIFY: 'pi pi-align-justify',
  ALIGN_LEFT: 'pi pi-align-left',
  ALIGN_RIGHT: 'pi pi-align-right',
  AMAZON: 'pi pi-amazon',
  ANDROID: 'pi pi-android',
  ANGLE_DOUBLE_DOWN: 'pi pi-angle-double-down',
  ANGLE_DOUBLE_LEFT: 'pi pi-angle-double-left',
  ANGLE_DOUBLE_RIGHT: 'pi pi-angle-double-right',
  ANGLE_DOUBLE_UP: 'pi pi-angle-double-up',
  ANGLE_DOWN: 'pi pi-angle-down',
  ANGLE_LEFT: 'pi pi-angle-left',
  ANGLE_RIGHT: 'pi pi-angle-right',
  ANGLE_UP: 'pi pi-angle-up',
  APPLE: 'pi pi-apple',
  ARROW_CIRCLE_DOWN: 'pi pi-arrow-circle-down',
  ARROW_CIRCLE_LEFT: 'pi pi-arrow-circle-left',
  ARROW_CIRCLE_RIGHT: 'pi pi-arrow-circle-right',
  ARROW_CIRCLE_UP: 'pi pi-arrow-circle-up',
  ARROW_DOWN_LEFT_AND_ARROW_UP_RIGHT_TO_CENTER: 'pi pi-arrow-down-left-and-arrow-up-right-to-center',
  ARROW_DOWN_LEFT: 'pi pi-arrow-down-left',
  ARROW_DOWN_RIGHT: 'pi pi-arrow-down-right',
  ARROW_DOWN: 'pi pi-arrow-down',
  ARROW_LEFT: 'pi pi-arrow-left',
  ARROW_RIGHT_ARROW_LEFT: 'pi pi-arrow-right-arrow-left',
  ARROW_RIGHT: 'pi pi-arrow-right',
  ARROW_UP_LEFT: 'pi pi-arrow-up-left',
  ARROW_UP_RIGHT_AND_ARROW_DOWN_LEFT_FROM_CENTER: 'pi pi-arrow-up-right-and-arrow-down-left-from-center',
  ARROW_UP_RIGHT: 'pi pi-arrow-up-right',
  ARROW_UP: 'pi pi-arrow-up',
  ARROWS_ALT: 'pi pi-arrows-alt',
  ARROWS_H: 'pi pi-arrows-h',
  ARROWS_V: 'pi pi-arrows-v',
  ASTERISK: 'pi pi-asterisk',
  AT: 'pi pi-at',
  BACKWARD: 'pi pi-backward',
  BAN: 'pi pi-ban',
  BARCODE: 'pi pi-barcode',
  BARS: 'pi pi-bars',
  BELL_SLASH: 'pi pi-bell-slash',
  BELL: 'pi pi-bell',
  BITCOIN: 'pi pi-bitcoin',
  BOLT: 'pi pi-bolt',
  BOOK: 'pi pi-book',
  BOOKMARK_FILL: 'pi pi-bookmark-fill',
  BOOKMARK: 'pi pi-bookmark',
  BOX: 'pi pi-box',
  BRIEFCASE: 'pi pi-briefcase',
  BUILDING_COLUMNS: 'pi pi-building-columns',
  BUILDING: 'pi pi-building',
  BULLSEYE: 'pi pi-bullseye',
  CALCULATOR: 'pi pi-calculator',
  CALENDAR_CLOCK: 'pi pi-calendar-clock',
  CALENDAR_MINUS: 'pi pi-calendar-minus',
  CALENDAR_PLUS: 'pi pi-calendar-plus',
  CALENDAR_TIMES: 'pi pi-calendar-times',
  CALENDAR: 'pi pi-calendar',
  CAMERA: 'pi pi-camera',
  CAR: 'pi pi-car',
  CARET_DOWN: 'pi pi-caret-down',
  CARET_LEFT: 'pi pi-caret-left',
  CARET_RIGHT: 'pi pi-caret-right',
  CARET_UP: 'pi pi-caret-up',
  CART_ARROW_DOWN: 'pi pi-cart-arrow-down',
  CART_MINUS: 'pi pi-cart-minus',
  CART_PLUS: 'pi pi-cart-plus',
  CHART_BAR: 'pi pi-chart-bar',
  CHART_LINE: 'pi pi-chart-line',
  CHART_PIE: 'pi pi-chart-pie',
  CHART_SCATTER: 'pi pi-chart-scatter',
  CHECK_CIRCLE: 'pi pi-check-circle',
  CHECK_SQUARE: 'pi pi-check-square',
  CHECK: 'pi pi-check',
  CHEVRON_CIRCLE_DOWN: 'pi pi-chevron-circle-down',
  CHEVRON_CIRCLE_LEFT: 'pi pi-chevron-circle-left',
  CHEVRON_CIRCLE_RIGHT: 'pi pi-chevron-circle-right',
  CHEVRON_CIRCLE_UP: 'pi pi-chevron-circle-up',
  CHEVRON_DOWN: 'pi pi-chevron-down',
  CHEVRON_LEFT: 'pi pi-chevron-left',
  CHEVRON_RIGHT: 'pi pi-chevron-right',
  CHEVRON_UP: 'pi pi-chevron-up',
  CIRCLE_FILL: 'pi pi-circle-fill',
  CIRCLE_OFF: 'pi pi-circle-off',
  CIRCLE_ON: 'pi pi-circle-on',
  CIRCLE: 'pi pi-circle',
  CLIPBOARD: 'pi pi-clipboard',
  CLOCK: 'pi pi-clock',
  CLONE: 'pi pi-clone',
  CLOUD_DOWNLOAD: 'pi pi-cloud-download',
  CLOUD_UPLOAD: 'pi pi-cloud-upload',
  CLOUD: 'pi pi-cloud',
  CODE: 'pi pi-code',
  COG: 'pi pi-cog',
  COMMENT: 'pi pi-comment',
  COMMENTS: 'pi pi-comments',
  COMPASS: 'pi pi-compass',
  COPY: 'pi pi-copy',
  CREDIT_CARD: 'pi pi-credit-card',
  CROWN: 'pi pi-crown',
  DATABASE: 'pi pi-database',
  DELETE_LEFT: 'pi pi-delete-left',
  DESKTOP: 'pi pi-desktop',
  DIRECTIONS_ALT: 'pi pi-directions-alt',
  DIRECTIONS: 'pi pi-directions',
  DISCORD: 'pi pi-discord',
  DOLLAR: 'pi pi-dollar',
  DOWNLOAD: 'pi pi-download',
  EJECT: 'pi pi-eject',
  ELLIPSIS_H: 'pi pi-ellipsis-h',
  ELLIPSIS_V: 'pi pi-ellipsis-v',
  ENVELOPE: 'pi pi-envelope',
  EQUALS: 'pi pi-equals',
  ERASER: 'pi pi-eraser',
  ETHEREUM: 'pi pi-ethereum',
  EURO: 'pi pi-euro',
  EXCLAMATION_CIRCLE: 'pi pi-exclamation-circle',
  EXCLAMATION_TRIANGLE: 'pi pi-exclamation-triangle',
  EXPAND: 'pi pi-expand',
  EXTERNAL_LINK: 'pi pi-external-link',
  EYE_SLASH: 'pi pi-eye-slash',
  EYE: 'pi pi-eye',
  FACE_SMILE: 'pi pi-face-smile',
  FACEBOOK: 'pi pi-facebook',
  FAST_BACKWARD: 'pi pi-fast-backward',
  FAST_FORWARD: 'pi pi-fast-forward',
  FILE_ARROW_UP: 'pi pi-file-arrow-up',
  FILE_CHECK: 'pi pi-file-check',
  FILE_EDIT: 'pi pi-file-edit',
  FILE_EXCEL: 'pi pi-file-excel',
  FILE_EXPORT: 'pi pi-file-export',
  FILE_IMPORT: 'pi pi-file-import',
  FILE_O: 'pi pi-file-o',
  FILE_PDF: 'pi pi-file-pdf',
  FILE_PLUS: 'pi pi-file-plus',
  FILE_WORD: 'pi pi-file-word',
  FILE: 'pi pi-file',
  FILTER_FILL: 'pi pi-filter-fill',
  FILTER_SLASH: 'pi pi-filter-slash',
  FILTER: 'pi pi-filter',
  FLAG_FILL: 'pi pi-flag-fill',
  FLAG: 'pi pi-flag',
  FOLDER_OPEN: 'pi pi-folder-open',
  FOLDER_PLUS: 'pi pi-folder-plus',
  FOLDER: 'pi pi-folder',
  FORWARD: 'pi pi-forward',
  GAUGE: 'pi pi-gauge',
  GIFT: 'pi pi-gift',
  GITHUB: 'pi pi-github',
  GLOBE: 'pi pi-globe',
  GOOGLE: 'pi pi-google',
  GRADUATION_CAP: 'pi pi-graduation-cap',
  HAMMER: 'pi pi-hammer',
  HASHTAG: 'pi pi-hashtag',
  HEADPHONES: 'pi pi-headphones',
  HEART_FILL: 'pi pi-heart-fill',
  HEART: 'pi pi-heart',
  HISTORY: 'pi pi-history',
  HOME: 'pi pi-home',
  HOURGLASS: 'pi pi-hourglass',
  ID_CARD: 'pi pi-id-card',
  IMAGE: 'pi pi-image',
  IMAGES: 'pi pi-images',
  INBOX: 'pi pi-inbox',
  INDIAN_RUPEE: 'pi pi-indian-rupee',
  INFO_CIRCLE: 'pi pi-info-circle',
  INFO: 'pi pi-info',
  INSTAGRAM: 'pi pi-instagram',
  KEY: 'pi pi-key',
  LANGUAGE: 'pi pi-language',
  LIGHTBULB: 'pi pi-lightbulb',
  LINK: 'pi pi-link',
  LINKEDIN: 'pi pi-linkedin',
  LIST_CHECK: 'pi pi-list-check',
  LIST: 'pi pi-list',
  LOCK_OPEN: 'pi pi-lock-open',
  LOCK: 'pi pi-lock',
  MAP_MARKER: 'pi pi-map-marker',
  MAP: 'pi pi-map',
  MARS: 'pi pi-mars',
  MEGAPHONE: 'pi pi-megaphone',
  MICROCHIP_AI: 'pi pi-microchip-ai',
  MICROCHIP: 'pi pi-microchip',
  MICROPHONE: 'pi pi-microphone',
  MICROSOFT: 'pi pi-microsoft',
  MINUS_CIRCLE: 'pi pi-minus-circle',
  MINUS: 'pi pi-minus',
  MOBILE: 'pi pi-mobile',
  MONEY_BILL: 'pi pi-money-bill',
  MOON: 'pi pi-moon',
  OBJECTS_COLUMN: 'pi pi-objects-column',
  PALETTE: 'pi pi-palette',
  PAPERCLIP: 'pi pi-paperclip',
  PAUSE_CIRCLE: 'pi pi-pause-circle',
  PAUSE: 'pi pi-pause',
  PAYPAL: 'pi pi-paypal',
  PEN_TO_SQUARE: 'pi pi-pen-to-square',
  PENCIL: 'pi pi-pencil',
  PERCENTAGE: 'pi pi-percentage',
  PHONE: 'pi pi-phone',
  PINTEREST: 'pi pi-pinterest',
  PLAY_CIRCLE: 'pi pi-play-circle',
  PLAY: 'pi pi-play',
  PLUS_CIRCLE: 'pi pi-plus-circle',
  PLUS: 'pi pi-plus',
  POUND: 'pi pi-pound',
  POWER_OFF: 'pi pi-power-off',
  PRIME: 'pi pi-prime',
  PRINT: 'pi pi-print',
  QRCODE: 'pi pi-qrcode',
  QUESTION_CIRCLE: 'pi pi-question-circle',
  QUESTION: 'pi pi-question',
  RECEIPT: 'pi pi-receipt',
  REDDIT: 'pi pi-reddit',
  REFRESH: 'pi pi-refresh',
  REPLAY: 'pi pi-replay',
  REPLY: 'pi pi-reply',
  SAVE: 'pi pi-save',
  SEARCH_MINUS: 'pi pi-search-minus',
  SEARCH_PLUS: 'pi pi-search-plus',
  SEARCH: 'pi pi-search',
  SEND: 'pi pi-send',
  SERVER: 'pi pi-server',
  SHARE_ALT: 'pi pi-share-alt',
  SHIELD: 'pi pi-shield',
  SHOP: 'pi pi-shop',
  SHOPPING_BAG: 'pi pi-shopping-bag',
  SHOPPING_CART: 'pi pi-shopping-cart',
  SIGN_IN: 'pi pi-sign-in',
  SIGN_OUT: 'pi pi-sign-out',
  SITEMAP: 'pi pi-sitemap',
  SLACK: 'pi pi-slack',
  SLIDERS_H: 'pi pi-sliders-h',
  SLIDERS_V: 'pi pi-sliders-v',
  SORT_ALPHA_DOWN_ALT: 'pi pi-sort-alpha-down-alt',
  SORT_ALPHA_DOWN: 'pi pi-sort-alpha-down',
  SORT_ALPHA_UP_ALT: 'pi pi-sort-alpha-up-alt',
  SORT_ALPHA_UP: 'pi pi-sort-alpha-up',
  SORT_ALT_SLASH: 'pi pi-sort-alt-slash',
  SORT_ALT: 'pi pi-sort-alt',
  SORT_AMOUNT_DOWN_ALT: 'pi pi-sort-amount-down-alt',
  SORT_AMOUNT_DOWN: 'pi pi-sort-amount-down',
  SORT_AMOUNT_UP_ALT: 'pi pi-sort-amount-up-alt',
  SORT_AMOUNT_UP: 'pi pi-sort-amount-up',
  SORT_DOWN_FILL: 'pi pi-sort-down-fill',
  SORT_DOWN: 'pi pi-sort-down',
  SORT_NUMERIC_DOWN_ALT: 'pi pi-sort-numeric-down-alt',
  SORT_NUMERIC_DOWN: 'pi pi-sort-numeric-down',
  SORT_NUMERIC_UP_ALT: 'pi pi-sort-numeric-up-alt',
  SORT_NUMERIC_UP: 'pi pi-sort-numeric-up',
  SORT_UP_FILL: 'pi pi-sort-up-fill',
  SORT_UP: 'pi pi-sort-up',
  SORT: 'pi pi-sort',
  SPARKLES: 'pi pi-sparkles',
  SPINNER_DOTTED: 'pi pi-spinner-dotted',
  SPINNER: 'pi pi-spinner',
  STAR_FILL: 'pi pi-star-fill',
  STAR_HALF_FILL: 'pi pi-star-half-fill',
  STAR_HALF: 'pi pi-star-half',
  STAR: 'pi pi-star',
  STEP_BACKWARD_ALT: 'pi pi-step-backward-alt',
  STEP_BACKWARD: 'pi pi-step-backward',
  STEP_FORWARD_ALT: 'pi pi-step-forward-alt',
  STEP_FORWARD: 'pi pi-step-forward',
  STOP_CIRCLE: 'pi pi-stop-circle',
  STOP: 'pi pi-stop',
  STOPWATCH: 'pi pi-stopwatch',
  SUN: 'pi pi-sun',
  SYNC: 'pi pi-sync',
  TABLE: 'pi pi-table',
  TABLET: 'pi pi-tablet',
  TAG: 'pi pi-tag',
  TAGS: 'pi pi-tags',
  TELEGRAM: 'pi pi-telegram',
  TH_LARGE: 'pi pi-th-large',
  THUMBS_DOWN_FILL: 'pi pi-thumbs-down-fill',
  THUMBS_DOWN: 'pi pi-thumbs-down',
  THUMBS_UP_FILL: 'pi pi-thumbs-up-fill',
  THUMBS_UP: 'pi pi-thumbs-up',
  THUMBTACK: 'pi pi-thumbtack',
  TICKET: 'pi pi-ticket',
  TIKTOK: 'pi pi-tiktok',
  TIMES_CIRCLE: 'pi pi-times-circle',
  TIMES: 'pi pi-times',
  TRASH: 'pi pi-trash',
  TROPHY: 'pi pi-trophy',
  TRUCK: 'pi pi-truck',
  TURKISH_LIRA: 'pi pi-turkish-lira',
  TWITCH: 'pi pi-twitch',
  TWITTER: 'pi pi-twitter',
  UNDO: 'pi pi-undo',
  UNLOCK: 'pi pi-unlock',
  UPLOAD: 'pi pi-upload',
  USER_EDIT: 'pi pi-user-edit',
  USER_MINUS: 'pi pi-user-minus',
  USER_PLUS: 'pi pi-user-plus',
  USER: 'pi pi-user',
  USERS: 'pi pi-users',
  VENUS: 'pi pi-venus',
  VERIFIED: 'pi pi-verified',
  VIDEO: 'pi pi-video',
  VIMEO: 'pi pi-vimeo',
  VOLUME_DOWN: 'pi pi-volume-down',
  VOLUME_OFF: 'pi pi-volume-off',
  VOLUME_UP: 'pi pi-volume-up',
  WALLET: 'pi pi-wallet',
  WAREHOUSE: 'pi pi-warehouse',
  WAVE_PULSE: 'pi pi-wave-pulse',
  WHATSAPP: 'pi pi-whatsapp',
  WIFI: 'pi pi-wifi',
  WINDOW_MAXIMIZE: 'pi pi-window-maximize',
  WINDOW_MINIMIZE: 'pi pi-window-minimize',
  WRENCH: 'pi pi-wrench',
  YOUTUBE: 'pi pi-youtube'
});

var SortOrder = Object.freeze({
  DESC: -1,
  UNSORTED: 0,
  ASC: 1
});

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var PrimeReactContext = /*#__PURE__*/React__default["default"].createContext();
var PrimeReactProvider = function PrimeReactProvider(props) {
  var _props$value, _propsValue$ripple, _propsValue$inputStyl, _propsValue$locale, _propsValue$appendTo, _propsValue$styleCont, _propsValue$cssTransi, _propsValue$autoZInde, _propsValue$hideOverl, _propsValue$nonce, _propsValue$nullSortO, _propsValue$zIndex, _propsValue$ptOptions, _propsValue$pt, _propsValue$unstyled, _propsValue$filterMat;
  var propsValue = (_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : {};
  var _useState = React.useState((_propsValue$ripple = propsValue.ripple) !== null && _propsValue$ripple !== void 0 ? _propsValue$ripple : false),
    _useState2 = _slicedToArray(_useState, 2),
    ripple = _useState2[0],
    setRipple = _useState2[1];
  var _useState3 = React.useState((_propsValue$inputStyl = propsValue.inputStyle) !== null && _propsValue$inputStyl !== void 0 ? _propsValue$inputStyl : 'outlined'),
    _useState4 = _slicedToArray(_useState3, 2),
    inputStyle = _useState4[0],
    setInputStyle = _useState4[1];
  var _useState5 = React.useState((_propsValue$locale = propsValue.locale) !== null && _propsValue$locale !== void 0 ? _propsValue$locale : 'en'),
    _useState6 = _slicedToArray(_useState5, 2),
    locale = _useState6[0],
    setLocale = _useState6[1];
  var _useState7 = React.useState((_propsValue$appendTo = propsValue.appendTo) !== null && _propsValue$appendTo !== void 0 ? _propsValue$appendTo : null),
    _useState8 = _slicedToArray(_useState7, 2),
    appendTo = _useState8[0],
    setAppendTo = _useState8[1];
  var _useState9 = React.useState((_propsValue$styleCont = propsValue.styleContainer) !== null && _propsValue$styleCont !== void 0 ? _propsValue$styleCont : null),
    _useState10 = _slicedToArray(_useState9, 2),
    styleContainer = _useState10[0],
    setStyleContainer = _useState10[1];
  var _useState11 = React.useState((_propsValue$cssTransi = propsValue.cssTransition) !== null && _propsValue$cssTransi !== void 0 ? _propsValue$cssTransi : true),
    _useState12 = _slicedToArray(_useState11, 2),
    cssTransition = _useState12[0],
    setCssTransition = _useState12[1];
  var _useState13 = React.useState((_propsValue$autoZInde = propsValue.autoZIndex) !== null && _propsValue$autoZInde !== void 0 ? _propsValue$autoZInde : true),
    _useState14 = _slicedToArray(_useState13, 2),
    autoZIndex = _useState14[0],
    setAutoZIndex = _useState14[1];
  var _useState15 = React.useState((_propsValue$hideOverl = propsValue.hideOverlaysOnDocumentScrolling) !== null && _propsValue$hideOverl !== void 0 ? _propsValue$hideOverl : false),
    _useState16 = _slicedToArray(_useState15, 2),
    hideOverlaysOnDocumentScrolling = _useState16[0],
    setHideOverlaysOnDocumentScrolling = _useState16[1];
  var _useState17 = React.useState((_propsValue$nonce = propsValue.nonce) !== null && _propsValue$nonce !== void 0 ? _propsValue$nonce : null),
    _useState18 = _slicedToArray(_useState17, 2),
    nonce = _useState18[0],
    setNonce = _useState18[1];
  var _useState19 = React.useState((_propsValue$nullSortO = propsValue.nullSortOrder) !== null && _propsValue$nullSortO !== void 0 ? _propsValue$nullSortO : 1),
    _useState20 = _slicedToArray(_useState19, 2),
    nullSortOrder = _useState20[0],
    setNullSortOrder = _useState20[1];
  var _useState21 = React.useState((_propsValue$zIndex = propsValue.zIndex) !== null && _propsValue$zIndex !== void 0 ? _propsValue$zIndex : {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
      toast: 1200
    }),
    _useState22 = _slicedToArray(_useState21, 2),
    zIndex = _useState22[0],
    setZIndex = _useState22[1];
  var _useState23 = React.useState((_propsValue$ptOptions = propsValue.ptOptions) !== null && _propsValue$ptOptions !== void 0 ? _propsValue$ptOptions : {
      mergeSections: true,
      mergeProps: true
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    ptOptions = _useState24[0],
    setPtOptions = _useState24[1];
  var _useState25 = React.useState((_propsValue$pt = propsValue.pt) !== null && _propsValue$pt !== void 0 ? _propsValue$pt : undefined),
    _useState26 = _slicedToArray(_useState25, 2),
    pt = _useState26[0],
    setPt = _useState26[1];
  var _useState27 = React.useState((_propsValue$unstyled = propsValue.unstyled) !== null && _propsValue$unstyled !== void 0 ? _propsValue$unstyled : false),
    _useState28 = _slicedToArray(_useState27, 2),
    unstyled = _useState28[0],
    setUnstyled = _useState28[1];
  var _useState29 = React.useState((_propsValue$filterMat = propsValue.filterMatchModeOptions) !== null && _propsValue$filterMat !== void 0 ? _propsValue$filterMat : {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    }),
    _useState30 = _slicedToArray(_useState29, 2),
    filterMatchModeOptions = _useState30[0],
    setFilterMatchModeOptions = _useState30[1];
  var changeTheme = function changeTheme(currentTheme, newTheme, linkElementId, callback) {
    var _linkElement$parentNo;
    var linkElement = document.getElementById(linkElementId);
    if (!linkElement) {
      throw Error("Element with id ".concat(linkElementId, " not found."));
    }
    var newThemeUrl = linkElement.getAttribute('href').replace(currentTheme, newTheme);
    var newLinkElement = document.createElement('link');
    newLinkElement.setAttribute('rel', 'stylesheet');
    newLinkElement.setAttribute('id', linkElementId);
    newLinkElement.setAttribute('href', newThemeUrl);
    newLinkElement.addEventListener('load', function () {
      if (callback) {
        callback();
      }
    });
    (_linkElement$parentNo = linkElement.parentNode) === null || _linkElement$parentNo === void 0 || _linkElement$parentNo.replaceChild(newLinkElement, linkElement);
  };

  /**
   * @deprecated
   */
  React__default["default"].useEffect(function () {
    PrimeReact$1.ripple = ripple;
  }, [ripple]);

  /**
   * @deprecated
   */
  React__default["default"].useEffect(function () {
    PrimeReact$1.inputStyle = inputStyle;
  }, [inputStyle]);

  /**
   * @deprecated
   */
  React__default["default"].useEffect(function () {
    PrimeReact$1.locale = locale;
  }, [locale]);
  var value = {
    changeTheme: changeTheme,
    ripple: ripple,
    setRipple: setRipple,
    inputStyle: inputStyle,
    setInputStyle: setInputStyle,
    locale: locale,
    setLocale: setLocale,
    appendTo: appendTo,
    setAppendTo: setAppendTo,
    styleContainer: styleContainer,
    setStyleContainer: setStyleContainer,
    cssTransition: cssTransition,
    setCssTransition: setCssTransition,
    autoZIndex: autoZIndex,
    setAutoZIndex: setAutoZIndex,
    hideOverlaysOnDocumentScrolling: hideOverlaysOnDocumentScrolling,
    setHideOverlaysOnDocumentScrolling: setHideOverlaysOnDocumentScrolling,
    nonce: nonce,
    setNonce: setNonce,
    nullSortOrder: nullSortOrder,
    setNullSortOrder: setNullSortOrder,
    zIndex: zIndex,
    setZIndex: setZIndex,
    ptOptions: ptOptions,
    setPtOptions: setPtOptions,
    pt: pt,
    setPt: setPt,
    filterMatchModeOptions: filterMatchModeOptions,
    setFilterMatchModeOptions: setFilterMatchModeOptions,
    unstyled: unstyled,
    setUnstyled: setUnstyled
  };
  return /*#__PURE__*/React__default["default"].createElement(PrimeReactContext.Provider, {
    value: value
  }, props.children);
};

var PrimeReact = PrimeReact$1;

exports.FilterMatchMode = FilterMatchMode;
exports.FilterOperator = FilterOperator;
exports.FilterService = FilterService;
exports.MessageSeverity = MessageSeverity;
exports.PrimeIcons = PrimeIcons;
exports.PrimeReactContext = PrimeReactContext;
exports.PrimeReactProvider = PrimeReactProvider;
exports.SortOrder = SortOrder;
exports.addLocale = addLocale;
exports.ariaLabel = ariaLabel;
exports["default"] = PrimeReact;
exports.locale = locale;
exports.localeOption = localeOption;
exports.localeOptions = localeOptions;
exports.updateLocaleOption = updateLocaleOption;
exports.updateLocaleOptions = updateLocaleOptions;
