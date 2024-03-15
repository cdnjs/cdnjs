'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var api = require('primevue/api');
var vue = require('vue');

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  locale: {
    startsWith: 'Starts with',
    contains: 'Contains',
    notContains: 'Not contains',
    endsWith: 'Ends with',
    equals: 'Equals',
    notEquals: 'Not equals',
    noFilter: 'No Filter',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dateBefore: 'Date is before',
    dateAfter: 'Date is after',
    clear: 'Clear',
    apply: 'Apply',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    addRule: 'Add Rule',
    removeRule: 'Remove Rule',
    accept: 'Yes',
    reject: 'No',
    choose: 'Choose',
    upload: 'Upload',
    cancel: 'Cancel',
    completed: 'Completed',
    pending: 'Pending',
    fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    chooseYear: 'Choose Year',
    chooseMonth: 'Choose Month',
    chooseDate: 'Choose Date',
    prevDecade: 'Previous Decade',
    nextDecade: 'Next Decade',
    prevYear: 'Previous Year',
    nextYear: 'Next Year',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    prevHour: 'Previous Hour',
    nextHour: 'Next Hour',
    prevMinute: 'Previous Minute',
    nextMinute: 'Next Minute',
    prevSecond: 'Previous Second',
    nextSecond: 'Next Second',
    am: 'am',
    pm: 'pm',
    today: 'Today',
    weekHeader: 'Wk',
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: 'mm/dd/yy',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
    emptyFilterMessage: 'No results found',
    // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: '{0} results are available',
    selectionMessage: '{0} items selected',
    emptySelectionMessage: 'No selected item',
    emptySearchMessage: 'No results found',
    emptyMessage: 'No available options',
    aria: {
      trueLabel: 'True',
      falseLabel: 'False',
      nullLabel: 'Not Selected',
      star: '1 star',
      stars: '{star} stars',
      selectAll: 'All items selected',
      unselectAll: 'All items unselected',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      navigation: 'Navigation',
      scrollTop: 'Scroll Top',
      moveTop: 'Move Top',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      moveBottom: 'Move Bottom',
      moveToTarget: 'Move to Target',
      moveToSource: 'Move to Source',
      moveAllToTarget: 'Move All to Target',
      moveAllToSource: 'Move All to Source',
      pageLabel: 'Page {page}',
      firstPageLabel: 'First Page',
      lastPageLabel: 'Last Page',
      nextPageLabel: 'Next Page',
      prevPageLabel: 'Previous Page',
      rowsPerPageLabel: 'Rows per page',
      jumpToPageDropdownLabel: 'Jump to Page Dropdown',
      jumpToPageInputLabel: 'Jump to Page Input',
      selectRow: 'Row Selected',
      unselectRow: 'Row Unselected',
      expandRow: 'Row Expanded',
      collapseRow: 'Row Collapsed',
      showFilterMenu: 'Show Filter Menu',
      hideFilterMenu: 'Hide Filter Menu',
      filterOperator: 'Filter Operator',
      filterConstraint: 'Filter Constraint',
      editRow: 'Row Edit',
      saveEdit: 'Save Edit',
      cancelEdit: 'Cancel Edit',
      listView: 'List View',
      gridView: 'Grid View',
      slide: 'Slide',
      slideNumber: '{slideNumber}',
      zoomImage: 'Zoom Image',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      rotateRight: 'Rotate Right',
      rotateLeft: 'Rotate Left'
    }
  },
  filterMatchModeOptions: {
    text: [api.FilterMatchMode.STARTS_WITH, api.FilterMatchMode.CONTAINS, api.FilterMatchMode.NOT_CONTAINS, api.FilterMatchMode.ENDS_WITH, api.FilterMatchMode.EQUALS, api.FilterMatchMode.NOT_EQUALS],
    numeric: [api.FilterMatchMode.EQUALS, api.FilterMatchMode.NOT_EQUALS, api.FilterMatchMode.LESS_THAN, api.FilterMatchMode.LESS_THAN_OR_EQUAL_TO, api.FilterMatchMode.GREATER_THAN, api.FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [api.FilterMatchMode.DATE_IS, api.FilterMatchMode.DATE_IS_NOT, api.FilterMatchMode.DATE_BEFORE, api.FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100
  },
  pt: undefined,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  unstyled: false,
  csp: {
    nonce: undefined
  }
};
var PrimeVueSymbol = Symbol();
function usePrimeVue() {
  var PrimeVue = vue.inject(PrimeVueSymbol);
  if (!PrimeVue) {
    throw new Error('PrimeVue is not installed!');
  }
  return PrimeVue;
}
function switchTheme(currentTheme, newTheme, linkElementId, callback) {
  if (currentTheme !== newTheme) {
    var linkElement = document.getElementById(linkElementId);
    var cloneLinkElement = linkElement.cloneNode(true);
    var newThemeUrl = linkElement.getAttribute('href').replace(currentTheme, newTheme);
    cloneLinkElement.setAttribute('id', linkElementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', function () {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', linkElementId);
      if (callback) {
        callback();
      }
    });
    linkElement.parentNode && linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  }
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = options ? _objectSpread(_objectSpread({}, defaultOptions), options) : _objectSpread({}, defaultOptions);
    var PrimeVue = {
      config: vue.reactive(configOptions),
      changeTheme: switchTheme
    };
    app.config.globalProperties.$primevue = PrimeVue;
    app.provide(PrimeVueSymbol, PrimeVue);
  }
};

exports["default"] = PrimeVue;
exports.defaultOptions = defaultOptions;
exports.usePrimeVue = usePrimeVue;
