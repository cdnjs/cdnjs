'use client';
import * as React from 'react';
import { PrimeReactContext, ariaLabel as ariaLabel$1, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useUpdateEffect } from 'primereact/hooks';
import { classNames, ObjectUtils, IconUtils } from 'primereact/utils';
import { AngleDoubleLeftIcon } from 'primereact/icons/angledoubleleft';
import { Ripple } from 'primereact/ripple';
import { InputNumber } from 'primereact/inputnumber';
import { AngleDoubleRightIcon } from 'primereact/icons/angledoubleright';
import { AngleRightIcon } from 'primereact/icons/angleright';
import { AngleLeftIcon } from 'primereact/icons/angleleft';
import { Dropdown } from 'primereact/dropdown';

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

var classes = {
  root: 'p-paginator p-component',
  left: 'p-paginator-left-content',
  end: 'p-paginator-right-content',
  firstPageIcon: 'p-paginator-icon',
  firstPageButton: function firstPageButton(_ref) {
    var disabled = _ref.disabled;
    return classNames('p-paginator-first p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  prevPageIcon: 'p-paginator-icon',
  prevPageButton: function prevPageButton(_ref2) {
    var disabled = _ref2.disabled;
    return classNames('p-paginator-prev p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  nextPageIcon: 'p-paginator-icon',
  nextPageButton: function nextPageButton(_ref3) {
    var disabled = _ref3.disabled;
    return classNames('p-paginator-next p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  lastPageIcon: 'p-paginator-icon',
  lastPageButton: function lastPageButton(_ref4) {
    var disabled = _ref4.disabled;
    return classNames('p-paginator-last p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  pageButton: function pageButton(_ref5) {
    var pageLink = _ref5.pageLink,
      startPageInView = _ref5.startPageInView,
      endPageInView = _ref5.endPageInView,
      page = _ref5.page;
    return classNames('p-paginator-page p-paginator-element p-link', {
      'p-paginator-page-start': pageLink === startPageInView,
      'p-paginator-page-end': pageLink === endPageInView,
      'p-highlight': pageLink - 1 === page
    });
  },
  pages: 'p-paginator-pages'
};
var styles = "\n@layer primereact {\n    .p-paginator {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-paginator-left-content {\n        margin-right: auto;\n    }\n    \n    .p-paginator-right-content {\n        margin-left: auto;\n    }\n    \n    .p-paginator-page,\n    .p-paginator-next,\n    .p-paginator-last,\n    .p-paginator-first,\n    .p-paginator-prev,\n    .p-paginator-current {\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        line-height: 1;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-paginator-element:focus {\n        z-index: 1;\n        position: relative;\n    }\n}\n";
var PaginatorBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Paginator',
    __parentMetadata: null,
    totalRecords: 0,
    rows: 0,
    first: 0,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    alwaysShow: true,
    style: null,
    className: null,
    template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    onPageChange: null,
    leftContent: null,
    rightContent: null,
    dropdownAppendTo: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});
var CurrentPageReportBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'CurrentPageReport',
    pageCount: null,
    page: null,
    first: null,
    rows: null,
    totalRecords: null,
    reportTemplate: '({currentPage} of {totalPages})',
    template: null,
    children: undefined
  }
});
var FirstPageLinkBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FirstPageLink',
    disabled: false,
    onClick: null,
    template: null,
    firstPageLinkIcon: null,
    children: undefined
  }
});
var JumpToPageInputBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'JumpToPageInput',
    page: null,
    rows: null,
    pageCount: null,
    disabled: false,
    template: null,
    onChange: null,
    children: undefined,
    metaData: null,
    ptm: null
  }
});
var LastPageLinkBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'LastPageLink',
    disabled: false,
    onClick: null,
    template: null,
    lastPageLinkIcon: null,
    children: undefined
  }
});
var NextPageLinkBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'NextPageLink',
    disabled: false,
    onClick: null,
    template: null,
    nextPageLinkIcon: null,
    children: undefined
  }
});
var PageLinksBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'PageLinks',
    value: null,
    page: null,
    rows: null,
    pageCount: null,
    links: null,
    template: null,
    children: undefined
  }
});
var PrevPageLinkBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'PrevPageLink',
    disabled: false,
    onClick: null,
    template: null,
    prevPageLinkIcon: null,
    children: undefined
  }
});
var RowsPerPageDropdownBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'RowsPerPageDropdown',
    options: null,
    value: null,
    page: null,
    pageCount: null,
    totalRecords: 0,
    appendTo: null,
    onChange: null,
    template: null,
    disabled: false,
    children: undefined
  }
});

function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var CurrentPageReport = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = CurrentPageReportBase.getProps(inProps, context);
  var report = {
    currentPage: props.page + 1,
    totalPages: props.totalPages,
    first: Math.min(props.first + 1, props.totalRecords),
    last: Math.min(props.first + props.rows, props.totalRecords),
    rows: props.rows,
    totalRecords: props.totalRecords
  };
  var text = props.reportTemplate.replace('{currentPage}', report.currentPage).replace('{totalPages}', report.totalPages).replace('{first}', report.first).replace('{last}', report.last).replace('{rows}', report.rows).replace('{totalRecords}', report.totalRecords);
  var currentProps = mergeProps({
    'aria-live': 'polite',
    className: 'p-paginator-current'
  }, props.ptm('current', {
    hostName: props.hostName
  }));
  var element = /*#__PURE__*/React.createElement("span", currentProps, text);
  if (props.template) {
    var defaultOptions = _objectSpread$5(_objectSpread$5({}, report), {
      ariaLive: 'polite',
      className: 'p-paginator-current',
      element: element,
      props: props
    });
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
CurrentPageReport.displayName = 'CurrentPageReport';

function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var FirstPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = FirstPageLinkBase.getProps(inProps, context);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        disabled: props.disabled
      }
    });
  };
  var className = classNames('p-paginator-first p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var firstPageIconProps = mergeProps({
    className: cx('firstPageIcon')
  }, getPTOptions('firstPageIcon'));
  var icon = props.firstPageLinkIcon || /*#__PURE__*/React.createElement(AngleDoubleLeftIcon, firstPageIconProps);
  var firstPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$4({}, firstPageIconProps), {
    props: props
  });
  var firstPageButtonProps = mergeProps({
    type: 'button',
    className: cx('firstPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel$1('firstPageLabel')
  }, getPTOptions('firstPageButton'));
  var element = /*#__PURE__*/React.createElement("button", firstPageButtonProps, firstPageLinkIcon, /*#__PURE__*/React.createElement(Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
FirstPageLink.displayName = 'FirstPageLink';

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

/**
 * @deprecated please use PrimeReactContext
 */
var PrimeReact = /*#__PURE__*/_createClass(function PrimeReact() {
  _classCallCheck(this, PrimeReact);
});
_defineProperty(PrimeReact, "ripple", false);
_defineProperty(PrimeReact, "inputStyle", 'outlined');
_defineProperty(PrimeReact, "locale", 'en');
_defineProperty(PrimeReact, "appendTo", null);
_defineProperty(PrimeReact, "cssTransition", true);
_defineProperty(PrimeReact, "autoZIndex", true);
_defineProperty(PrimeReact, "hideOverlaysOnDocumentScrolling", false);
_defineProperty(PrimeReact, "nonce", null);
_defineProperty(PrimeReact, "nullSortOrder", 1);
_defineProperty(PrimeReact, "zIndex", {
  modal: 1100,
  overlay: 1000,
  menu: 1000,
  tooltip: 1100,
  toast: 1200
});
_defineProperty(PrimeReact, "pt", undefined);
_defineProperty(PrimeReact, "filterMatchModeOptions", {
  text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
  numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
  date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
});
_defineProperty(PrimeReact, "changeTheme", function (currentTheme, newTheme, linkElementId, callback) {
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
  var _locale = PrimeReact.locale;
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
  var _locale = locale || PrimeReact.locale;
  if (_locale.includes('__proto__') || _locale.includes('prototype')) {
    throw new Error('Unsafe locale detected');
  }
  return locales[_locale];
}

var JumpToPageInput = /*#__PURE__*/React.memo(function (inProps) {
  useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = JumpToPageInputBase.getProps(inProps, context);
  var ariaLabelValue = ariaLabel('jumpToPageInputLabel');
  var onChange = function onChange(event) {
    if (props.onChange) {
      props.onChange(props.rows * (event.value - 1), props.rows);
    }
  };
  var value = props.totalPages > 0 ? props.page + 1 : 0;
  var element = /*#__PURE__*/React.createElement(InputNumber, {
    value: value,
    onChange: onChange,
    className: "p-paginator-page-input",
    disabled: props.disabled,
    pt: props.ptm('JTPInput'),
    unstyled: props.unstyled,
    __parentMetadata: {
      parent: props.metaData
    },
    "aria-label": ariaLabelValue
  });
  if (props.template) {
    var defaultOptions = {
      value: value,
      onChange: onChange,
      disabled: props.disabled,
      className: 'p-paginator-page-input',
      'aria-label': ariaLabelValue,
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
JumpToPageInput.displayName = 'JumpToPageInput';

function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var LastPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = LastPageLinkBase.getProps(inProps, context);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        disabled: props.disabled
      }
    });
  };
  var className = classNames('p-paginator-last p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var lastPageIconProps = mergeProps({
    className: cx('lastPageIcon')
  }, getPTOptions('lastPageIcon'));
  var icon = props.lastPageLinkIcon || /*#__PURE__*/React.createElement(AngleDoubleRightIcon, lastPageIconProps);
  var lastPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$3({}, lastPageIconProps), {
    props: props
  });
  var lastPageButtonProps = mergeProps({
    type: 'button',
    className: cx('lastPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel$1('lastPageLabel')
  }, getPTOptions('lastPageButton'));
  var element = /*#__PURE__*/React.createElement("button", lastPageButtonProps, lastPageLinkIcon, /*#__PURE__*/React.createElement(Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
LastPageLink.displayName = 'LastPageLink';

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var NextPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = NextPageLinkBase.getProps(inProps, context);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        disabled: props.disabled
      }
    });
  };
  var className = classNames('p-paginator-next p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var nextPageIconProps = mergeProps({
    className: cx('nextPageIcon')
  }, getPTOptions('nextPageIcon'));
  var icon = props.nextPageLinkIcon || /*#__PURE__*/React.createElement(AngleRightIcon, nextPageIconProps);
  var nextPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$2({}, nextPageIconProps), {
    props: props
  });
  var nextPageButtonProps = mergeProps({
    type: 'button',
    className: cx('nextPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel$1('nextPageLabel')
  }, getPTOptions('nextPageButton'));
  var element = /*#__PURE__*/React.createElement("button", nextPageButtonProps, nextPageLinkIcon, /*#__PURE__*/React.createElement(Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      nextPageLinkIcon: nextPageLinkIcon,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
NextPageLink.displayName = 'NextPageLink';

var PageLinks = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = PageLinksBase.getProps(inProps, context);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(pageLink, key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        active: pageLink - 1 === props.page
      }
    });
  };
  var onPageLinkClick = function onPageLinkClick(event, pageLink) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        value: pageLink
      });
    }
    event.preventDefault();
  };
  var elements;
  if (props.value) {
    var startPageInView = props.value[0];
    var endPageInView = props.value[props.value.length - 1];
    elements = props.value.map(function (pageLink) {
      var className = classNames('p-paginator-page p-paginator-element p-link', {
        'p-paginator-page-start': pageLink === startPageInView,
        'p-paginator-page-end': pageLink === endPageInView,
        'p-highlight': pageLink - 1 === props.page
      });
      var pageButtonProps = mergeProps({
        type: 'button',
        onClick: function onClick(e) {
          return onPageLinkClick(e, pageLink);
        },
        className: cx('pageButton', {
          pageLink: pageLink,
          startPageInView: startPageInView,
          endPageInView: endPageInView,
          page: props.page
        }),
        disabled: props.disabled,
        'aria-label': ariaLabel$1('pageLabel', {
          page: pageLink
        }),
        'aria-current': pageLink - 1 === props.page ? 'true' : undefined
      }, getPTOptions(pageLink, 'pageButton'));
      var element = /*#__PURE__*/React.createElement("button", pageButtonProps, pageLink, /*#__PURE__*/React.createElement(Ripple, null));
      if (props.template) {
        var defaultOptions = {
          onClick: function onClick(e) {
            return onPageLinkClick(e, pageLink);
          },
          className: className,
          view: {
            startPage: startPageInView - 1,
            endPage: endPageInView - 1
          },
          page: pageLink - 1,
          currentPage: props.page,
          totalPages: props.totalPages,
          ariaLabel: ariaLabel$1('pageLabel', {
            page: pageLink
          }),
          ariaCurrent: pageLink - 1 === props.page ? 'true' : undefined,
          element: element,
          props: props
        };
        element = ObjectUtils.getJSXElement(props.template, defaultOptions);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: pageLink
      }, element);
    });
  }
  var pagesProps = mergeProps({
    className: cx('pages')
  }, ptm('pages', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React.createElement("span", pagesProps, elements);
});
PageLinks.displayName = 'PageLinks';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PrevPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = PrevPageLinkBase.getProps(inProps, context);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        disabled: props.disabled
      }
    });
  };
  var className = classNames('p-paginator-prev p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var prevPageIconProps = mergeProps({
    className: cx('prevPageIcon')
  }, getPTOptions('prevPageIcon'));
  var icon = props.prevPageLinkIcon || /*#__PURE__*/React.createElement(AngleLeftIcon, prevPageIconProps);
  var prevPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, prevPageIconProps), {
    props: props
  });
  var prevPageButtonProps = mergeProps({
    type: 'button',
    className: cx('prevPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel$1('previousPageLabel')
  }, getPTOptions('prevPageButton'));
  var element = /*#__PURE__*/React.createElement("button", prevPageButtonProps, prevPageLinkIcon, /*#__PURE__*/React.createElement(Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
PrevPageLink.displayName = 'PrevPageLink';

var RowsPerPageDropdown = /*#__PURE__*/React.memo(function (inProps) {
  useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = RowsPerPageDropdownBase.getProps(inProps, context);
  var hasOptions = props.options && props.options.length > 0;
  var options = hasOptions ? props.options.map(function (opt) {
    return {
      label: String(opt),
      value: opt
    };
  }) : [];
  var placeholderValue = localeOption('choose');
  var ariaLabelValue = ariaLabel('jumpToPageDropdownLabel');
  var element = hasOptions ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dropdown, {
    value: props.value,
    options: options,
    onChange: props.onChange,
    appendTo: props.appendTo,
    disabled: props.disabled,
    placeholder: placeholderValue,
    "aria-label": ariaLabelValue,
    pt: props.ptm('RPPDropdown'),
    unstyled: props.unstyled,
    __parentMetadata: {
      parent: props.metaData
    }
  })) : null;
  if (props.template) {
    var defaultOptions = {
      value: props.value,
      options: options,
      onChange: props.onChange,
      appendTo: props.appendTo,
      currentPage: props.page,
      totalPages: props.pageCount,
      totalRecords: props.totalRecords,
      disabled: props.disabled,
      ariaLabel: ariaLabelValue,
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
RowsPerPageDropdown.displayName = 'RowsPerPageDropdown';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Paginator = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = PaginatorBase.getProps(inProps, context);
  var metaData = _objectSpread({
    props: props
  }, props.__parentMetadata);
  var _PaginatorBase$setMet = PaginatorBase.setMetaData(metaData),
    ptm = _PaginatorBase$setMet.ptm,
    cx = _PaginatorBase$setMet.cx,
    isUnstyled = _PaginatorBase$setMet.isUnstyled;
  useHandleStyle(PaginatorBase.css.styles, isUnstyled, {
    name: 'paginator'
  });
  var elementRef = React.useRef(null);
  var page = Math.floor(props.first / props.rows);
  var totalPages = Math.ceil(props.totalRecords / props.rows);
  var isFirstPage = page === 0;
  var isLastPage = page === totalPages - 1;
  var isEmpty = totalPages === 0;
  var calculatePageLinkBoundaries = function calculatePageLinkBoundaries() {
    var numberOfPages = totalPages;
    var visiblePages = Math.min(props.pageLinkSize, numberOfPages);

    //calculate range, keep current in middle if necessary
    var start = Math.max(0, Math.ceil(page - visiblePages / 2));
    var end = Math.min(numberOfPages - 1, start + visiblePages - 1);

    //check when approaching to last page
    var delta = props.pageLinkSize - (end - start + 1);
    start = Math.max(0, start - delta);
    return [start, end];
  };
  var updatePageLinks = function updatePageLinks() {
    var pageLinks = [];
    var boundaries = calculatePageLinkBoundaries();
    var start = boundaries[0];
    var end = boundaries[1];
    for (var i = start; i <= end; i++) {
      pageLinks.push(i + 1);
    }
    return pageLinks;
  };
  var changePage = function changePage(first, rows) {
    var pc = totalPages;
    var p = Math.floor(first / rows);
    if (p >= 0 && p < pc) {
      var newPageState = {
        first: first,
        rows: rows,
        page: p,
        totalPages: pc
      };
      if (props.onPageChange) {
        props.onPageChange(newPageState);
      }
    }
  };
  var changePageToFirst = function changePageToFirst(event) {
    changePage(0, props.rows);
    event.preventDefault();
  };
  var changePageToPrev = function changePageToPrev(event) {
    changePage(props.first - props.rows, props.rows);
    event.preventDefault();
  };
  var onPageLinkClick = function onPageLinkClick(event) {
    changePage((event.value - 1) * props.rows, props.rows);
  };
  var changePageToNext = function changePageToNext(event) {
    changePage(props.first + props.rows, props.rows);
    event.preventDefault();
  };
  var changePageToLast = function changePageToLast(event) {
    changePage((totalPages - 1) * props.rows, props.rows);
    event.preventDefault();
  };
  var onRowsChange = function onRowsChange(event) {
    var rows = event.value;
    changePage(0, rows);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useUpdateEffect(function () {
    if (page > 0 && props.first >= props.totalRecords) {
      changePage((totalPages - 1) * props.rows, props.rows);
    }
  }, [props.totalRecords]);
  var createElement = function createElement(key, template) {
    var element;
    switch (key) {
      case 'FirstPageLink':
        element = /*#__PURE__*/React.createElement(FirstPageLink, {
          hostName: "Paginator",
          key: key,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          rows: props.rows,
          onClick: changePageToFirst,
          disabled: isFirstPage || isEmpty,
          template: template,
          firstPageLinkIcon: props.firstPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'PrevPageLink':
        element = /*#__PURE__*/React.createElement(PrevPageLink, {
          hostName: "Paginator",
          key: key,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          rows: props.rows,
          onClick: changePageToPrev,
          disabled: isFirstPage || isEmpty,
          template: template,
          prevPageLinkIcon: props.prevPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'NextPageLink':
        element = /*#__PURE__*/React.createElement(NextPageLink, {
          hostName: "Paginator",
          key: key,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          rows: props.rows,
          onClick: changePageToNext,
          disabled: isLastPage || isEmpty,
          template: template,
          nextPageLinkIcon: props.nextPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'LastPageLink':
        element = /*#__PURE__*/React.createElement(LastPageLink, {
          hostName: "Paginator",
          key: key,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          rows: props.rows,
          onClick: changePageToLast,
          disabled: isLastPage || isEmpty,
          template: template,
          lastPageLinkIcon: props.lastPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'PageLinks':
        element = /*#__PURE__*/React.createElement(PageLinks, {
          hostName: "Paginator",
          key: key,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          rows: props.rows,
          value: updatePageLinks(),
          onClick: onPageLinkClick,
          template: template,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'RowsPerPageDropdown':
        element = /*#__PURE__*/React.createElement(RowsPerPageDropdown, {
          hostName: "Paginator",
          key: key,
          value: props.rows,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          options: props.rowsPerPageOptions,
          onChange: onRowsChange,
          appendTo: props.dropdownAppendTo,
          template: template,
          disabled: isEmpty,
          unstyled: props.unstyled,
          ptm: ptm,
          cx: cx,
          metaData: metaData
        });
        break;
      case 'CurrentPageReport':
        element = /*#__PURE__*/React.createElement(CurrentPageReport, {
          hostName: "Paginator",
          reportTemplate: props.currentPageReportTemplate,
          key: key,
          page: page,
          totalPages: totalPages,
          totalRecords: props.totalRecords,
          rows: props.rows,
          first: props.first,
          template: template,
          ptm: ptm
        });
        break;
      case 'JumpToPageInput':
        element = /*#__PURE__*/React.createElement(JumpToPageInput, {
          hostName: "Paginator",
          key: key,
          rows: props.rows,
          page: page,
          totalPages: totalPages,
          onChange: changePage,
          disabled: isEmpty,
          template: template,
          ptm: ptm,
          unstyled: props.unstyled,
          metaData: metaData
        });
        break;
      default:
        element = null;
        break;
    }
    return element;
  };
  var createElements = function createElements() {
    var template = props.template;
    if (template) {
      if (_typeof(template) === 'object') {
        return template.layout ? template.layout.split(' ').map(function (value) {
          var key = value.trim();
          return createElement(key, template[key]);
        }) : Object.entries(template).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            _template = _ref2[1];
          return createElement(key, _template);
        });
      }
      return template.split(' ').map(function (value) {
        return createElement(value.trim());
      });
    }
    return null;
  };
  if (!props.alwaysShow && totalPages <= 1) {
    return null;
  }
  var leftContent = ObjectUtils.getJSXElement(props.leftContent, props);
  var rightContent = ObjectUtils.getJSXElement(props.rightContent, props);
  var elements = createElements();
  var leftProps = mergeProps({
    className: cx('left')
  }, ptm('left'));
  var leftElement = leftContent && /*#__PURE__*/React.createElement("div", leftProps, leftContent);
  var endProps = mergeProps({
    className: cx('end')
  }, ptm('end'));
  var rightElement = rightContent && /*#__PURE__*/React.createElement("div", endProps, rightContent);
  var rootProps = mergeProps({
    ref: elementRef,
    className: classNames(props.className, cx('root')),
    style: props.style
  }, PaginatorBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, leftElement, elements, rightElement);
}));
Paginator.displayName = 'Paginator';

export { Paginator };
