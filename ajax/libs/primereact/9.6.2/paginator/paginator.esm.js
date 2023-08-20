import * as React from 'react';
import { useUpdateEffect } from 'primereact/hooks';
import { mergeProps, ObjectUtils, classNames, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext, ariaLabel, localeOption } from 'primereact/api';
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

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

var PaginatorBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Paginator',
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
    children: undefined
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

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CurrentPageReport = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = CurrentPageReportBase.getProps(inProps, context);
  var report = {
    currentPage: props.page + 1,
    totalPages: props.pageCount,
    first: Math.min(props.first + 1, props.totalRecords),
    last: Math.min(props.first + props.rows, props.totalRecords),
    rows: props.rows,
    totalRecords: props.totalRecords
  };
  var text = props.reportTemplate.replace('{currentPage}', report.currentPage).replace('{totalPages}', report.totalPages).replace('{first}', report.first).replace('{last}', report.last).replace('{rows}', report.rows).replace('{totalRecords}', report.totalRecords);
  var currentProps = mergeProps({
    className: 'p-paginator-current'
  }, props.ptm('current'));
  var element = /*#__PURE__*/React.createElement("span", currentProps, text);
  if (props.template) {
    var defaultOptions = _objectSpread$4(_objectSpread$4({}, report), {
      className: 'p-paginator-current',
      element: element,
      props: props
    });
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
CurrentPageReport.displayName = 'CurrentPageReport';

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var FirstPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = FirstPageLinkBase.getProps(inProps, context);
  var getPTOptions = function getPTOptions(key) {
    return props.ptm(key, {
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
    className: iconClassName
  }, getPTOptions('firstPageIcon'));
  var icon = props.firstPageLinkIcon || /*#__PURE__*/React.createElement(AngleDoubleLeftIcon, firstPageIconProps);
  var firstPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$3({}, firstPageIconProps), {
    props: props
  });
  var firstPageButtonProps = mergeProps({
    type: 'button',
    className: className,
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel('firstPageLabel')
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

var JumpToPageInput = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = JumpToPageInputBase.getProps(inProps, context);
  var onChange = function onChange(event) {
    if (props.onChange) {
      props.onChange(props.rows * (event.value - 1), props.rows);
    }
  };
  var value = props.pageCount > 0 ? props.page + 1 : 0;
  var element = /*#__PURE__*/React.createElement(InputNumber, {
    value: value,
    onChange: onChange,
    className: "p-paginator-page-input",
    disabled: props.disabled,
    pt: props.ptm('JTPInput')
  });
  if (props.template) {
    var defaultOptions = {
      value: value,
      onChange: onChange,
      disabled: props.disabled,
      className: 'p-paginator-page-input',
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
JumpToPageInput.displayName = 'JumpToPageInput';

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var LastPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = LastPageLinkBase.getProps(inProps, context);
  var getPTOptions = function getPTOptions(key) {
    return props.ptm(key, {
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
    className: iconClassName
  }, getPTOptions('lastPageIcon'));
  var icon = props.lastPageLinkIcon || /*#__PURE__*/React.createElement(AngleDoubleRightIcon, lastPageIconProps);
  var lastPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$2({}, lastPageIconProps), {
    props: props
  });
  var lastPageButtonProps = mergeProps({
    type: 'button',
    className: className,
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel('lastPageLabel')
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

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var NextPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = NextPageLinkBase.getProps(inProps, context);
  var getPTOptions = function getPTOptions(key) {
    return props.ptm(key, {
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
    className: iconClassName
  }, getPTOptions('nextPageIcon'));
  var icon = props.nextPageLinkIcon || /*#__PURE__*/React.createElement(AngleRightIcon, nextPageIconProps);
  var nextPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, nextPageIconProps), {
    props: props
  });
  var nextPageButtonProps = mergeProps({
    type: 'button',
    className: className,
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel('nextPageLabel')
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
  var context = React.useContext(PrimeReactContext);
  var props = PageLinksBase.getProps(inProps, context);
  var getPTOptions = function getPTOptions(pageLink, key) {
    return props.ptm(key, {
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
        className: className,
        disabled: props.disabled,
        'aria-label': ariaLabel('pageLabel', {
          page: pageLink + 1
        })
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
          totalPages: props.pageCount,
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
    className: 'p-paginator-pages'
  }, props.ptm('pages'));
  return /*#__PURE__*/React.createElement("span", pagesProps, elements);
});
PageLinks.displayName = 'PageLinks';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PrevPageLink = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = PrevPageLinkBase.getProps(inProps, context);
  var getPTOptions = function getPTOptions(key) {
    return props.ptm(key, {
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
    className: iconClassName
  }, getPTOptions('prevPageIcon'));
  var icon = props.prevPageLinkIcon || /*#__PURE__*/React.createElement(AngleLeftIcon, prevPageIconProps);
  var prevPageLinkIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, prevPageIconProps), {
    props: props
  });
  var prevPageButtonProps = mergeProps({
    type: 'button',
    className: className,
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': ariaLabel('previousPageLabel')
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
  var context = React.useContext(PrimeReactContext);
  var props = RowsPerPageDropdownBase.getProps(inProps, context);
  var hasOptions = props.options && props.options.length > 0;
  var options = hasOptions ? props.options.map(function (opt) {
    return {
      label: String(opt),
      value: opt
    };
  }) : [];
  var ariaLabel = localeOption('choose');
  var element = hasOptions ? /*#__PURE__*/React.createElement(Dropdown, {
    value: props.value,
    options: options,
    onChange: props.onChange,
    appendTo: props.appendTo,
    disabled: props.disabled,
    placeholder: ariaLabel,
    "aria-label": ariaLabel,
    pt: props.ptm('RPPDropdown')
  }) : null;
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
      element: element,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
RowsPerPageDropdown.displayName = 'RowsPerPageDropdown';

var Paginator = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = PaginatorBase.getProps(inProps, context);
  var _PaginatorBase$setMet = PaginatorBase.setMetaData({
      props: props
    }),
    ptm = _PaginatorBase$setMet.ptm;
  var elementRef = React.useRef(null);
  var page = Math.floor(props.first / props.rows);
  var pageCount = Math.ceil(props.totalRecords / props.rows);
  var isFirstPage = page === 0;
  var isLastPage = page === pageCount - 1;
  var isEmpty = pageCount === 0;
  var calculatePageLinkBoundaries = function calculatePageLinkBoundaries() {
    var numberOfPages = pageCount;
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
    var pc = pageCount;
    var p = Math.floor(first / rows);
    if (p >= 0 && p < pc) {
      var newPageState = {
        first: first,
        rows: rows,
        page: p,
        pageCount: pc
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
    changePage((pageCount - 1) * props.rows, props.rows);
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
      changePage((pageCount - 1) * props.rows, props.rows);
    }
  }, [props.totalRecords]);
  var createElement = function createElement(key, template) {
    var element;
    switch (key) {
      case 'FirstPageLink':
        element = /*#__PURE__*/React.createElement(FirstPageLink, {
          key: key,
          onClick: changePageToFirst,
          disabled: isFirstPage || isEmpty,
          template: template,
          firstPageLinkIcon: props.firstPageLinkIcon,
          ptm: ptm
        });
        break;
      case 'PrevPageLink':
        element = /*#__PURE__*/React.createElement(PrevPageLink, {
          key: key,
          onClick: changePageToPrev,
          disabled: isFirstPage || isEmpty,
          template: template,
          prevPageLinkIcon: props.prevPageLinkIcon,
          ptm: ptm
        });
        break;
      case 'NextPageLink':
        element = /*#__PURE__*/React.createElement(NextPageLink, {
          key: key,
          onClick: changePageToNext,
          disabled: isLastPage || isEmpty,
          template: template,
          nextPageLinkIcon: props.nextPageLinkIcon,
          ptm: ptm
        });
        break;
      case 'LastPageLink':
        element = /*#__PURE__*/React.createElement(LastPageLink, {
          key: key,
          onClick: changePageToLast,
          disabled: isLastPage || isEmpty,
          template: template,
          lastPageLinkIcon: props.lastPageLinkIcon,
          ptm: ptm
        });
        break;
      case 'PageLinks':
        element = /*#__PURE__*/React.createElement(PageLinks, {
          key: key,
          value: updatePageLinks(),
          page: page,
          rows: props.rows,
          pageCount: pageCount,
          onClick: onPageLinkClick,
          template: template,
          ptm: ptm
        });
        break;
      case 'RowsPerPageDropdown':
        element = /*#__PURE__*/React.createElement(RowsPerPageDropdown, {
          key: key,
          value: props.rows,
          page: page,
          pageCount: pageCount,
          totalRecords: props.totalRecords,
          options: props.rowsPerPageOptions,
          onChange: onRowsChange,
          appendTo: props.dropdownAppendTo,
          template: template,
          disabled: isEmpty,
          ptm: ptm
        });
        break;
      case 'CurrentPageReport':
        element = /*#__PURE__*/React.createElement(CurrentPageReport, {
          reportTemplate: props.currentPageReportTemplate,
          key: key,
          page: page,
          pageCount: pageCount,
          first: props.first,
          rows: props.rows,
          totalRecords: props.totalRecords,
          template: template,
          ptm: ptm
        });
        break;
      case 'JumpToPageInput':
        element = /*#__PURE__*/React.createElement(JumpToPageInput, {
          key: key,
          rows: props.rows,
          page: page,
          pageCount: pageCount,
          onChange: changePage,
          disabled: isEmpty,
          template: template,
          ptm: ptm
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
  if (!props.alwaysShow && pageCount <= 1) {
    return null;
  } else {
    var className = classNames('p-paginator p-component', props.className);
    var leftContent = ObjectUtils.getJSXElement(props.leftContent, props);
    var rightContent = ObjectUtils.getJSXElement(props.rightContent, props);
    var elements = createElements();
    var leftProps = mergeProps({
      className: 'p-paginator-left-content'
    }, ptm('left'));
    var leftElement = leftContent && /*#__PURE__*/React.createElement("div", leftProps, leftContent);
    var endProps = mergeProps({
      className: 'p-paginator-right-content'
    }, ptm('end'));
    var rightElement = rightContent && /*#__PURE__*/React.createElement("div", endProps, rightContent);
    var rootProps = mergeProps({
      ref: elementRef,
      className: className,
      style: props.style
    }, PaginatorBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React.createElement("div", rootProps, leftElement, elements, rightElement);
  }
}));
Paginator.displayName = 'Paginator';

export { Paginator };
