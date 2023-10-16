'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');
var angledoubleleft = require('primereact/icons/angledoubleleft');
var ripple = require('primereact/ripple');
var inputnumber = require('primereact/inputnumber');
var angledoubleright = require('primereact/icons/angledoubleright');
var angleright = require('primereact/icons/angleright');
var angleleft = require('primereact/icons/angleleft');
var dropdown = require('primereact/dropdown');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

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
    return utils.classNames('p-paginator-first p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  prevPageIcon: 'p-paginator-icon',
  prevPageButton: function prevPageButton(_ref2) {
    var disabled = _ref2.disabled;
    return utils.classNames('p-paginator-prev p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  nextPageIcon: 'p-paginator-icon',
  nextPageButton: function nextPageButton(_ref3) {
    var disabled = _ref3.disabled;
    return utils.classNames('p-paginator-next p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  lastPageIcon: 'p-paginator-icon',
  lastPageButton: function lastPageButton(_ref4) {
    var disabled = _ref4.disabled;
    return utils.classNames('p-paginator-last p-paginator-element p-link', {
      'p-disabled': disabled
    });
  },
  pageButton: function pageButton(_ref5) {
    var pageLink = _ref5.pageLink,
      startPageInView = _ref5.startPageInView,
      endPageInView = _ref5.endPageInView,
      page = _ref5.page;
    return utils.classNames('p-paginator-page p-paginator-element p-link', {
      'p-paginator-page-start': pageLink === startPageInView,
      'p-paginator-page-end': pageLink === endPageInView,
      'p-highlight': pageLink - 1 === page
    });
  },
  pages: 'p-paginator-pages'
};
var styles = "\n@layer primereact {\n    .p-paginator {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-paginator-left-content {\n        margin-right: auto;\n    }\n    \n    .p-paginator-right-content {\n        margin-left: auto;\n    }\n    \n    .p-paginator-page,\n    .p-paginator-next,\n    .p-paginator-last,\n    .p-paginator-first,\n    .p-paginator-prev,\n    .p-paginator-current {\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        line-height: 1;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-paginator-element:focus {\n        z-index: 1;\n        position: relative;\n    }\n}\n";
var PaginatorBase = componentbase.ComponentBase.extend({
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
var CurrentPageReportBase = componentbase.ComponentBase.extend({
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
var FirstPageLinkBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FirstPageLink',
    disabled: false,
    onClick: null,
    template: null,
    firstPageLinkIcon: null,
    children: undefined
  }
});
var JumpToPageInputBase = componentbase.ComponentBase.extend({
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
var LastPageLinkBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'LastPageLink',
    disabled: false,
    onClick: null,
    template: null,
    lastPageLinkIcon: null,
    children: undefined
  }
});
var NextPageLinkBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'NextPageLink',
    disabled: false,
    onClick: null,
    template: null,
    nextPageLinkIcon: null,
    children: undefined
  }
});
var PageLinksBase = componentbase.ComponentBase.extend({
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
var PrevPageLinkBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'PrevPageLink',
    disabled: false,
    onClick: null,
    template: null,
    prevPageLinkIcon: null,
    children: undefined
  }
});
var RowsPerPageDropdownBase = componentbase.ComponentBase.extend({
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
var CurrentPageReport = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
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
  var currentProps = utils.mergeProps({
    className: 'p-paginator-current'
  }, props.ptm('current', {
    hostName: props.hostName
  }));
  var element = /*#__PURE__*/React__namespace.createElement("span", currentProps, text);
  if (props.template) {
    var defaultOptions = _objectSpread$5(_objectSpread$5({}, report), {
      className: 'p-paginator-current',
      element: element,
      props: props
    });
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
CurrentPageReport.displayName = 'CurrentPageReport';

function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var FirstPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
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
  var className = utils.classNames('p-paginator-first p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var firstPageIconProps = utils.mergeProps({
    className: cx('firstPageIcon')
  }, getPTOptions('firstPageIcon'));
  var icon = props.firstPageLinkIcon || /*#__PURE__*/React__namespace.createElement(angledoubleleft.AngleDoubleLeftIcon, firstPageIconProps);
  var firstPageLinkIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$4({}, firstPageIconProps), {
    props: props
  });
  var firstPageButtonProps = utils.mergeProps({
    type: 'button',
    className: cx('firstPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': api.ariaLabel('firstPageLabel')
  }, getPTOptions('firstPageButton'));
  var element = /*#__PURE__*/React__namespace.createElement("button", firstPageButtonProps, firstPageLinkIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      props: props
    };
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
FirstPageLink.displayName = 'FirstPageLink';

var JumpToPageInput = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = JumpToPageInputBase.getProps(inProps, context);
  var onChange = function onChange(event) {
    if (props.onChange) {
      props.onChange(props.rows * (event.value - 1), props.rows);
    }
  };
  var value = props.pageCount > 0 ? props.page + 1 : 0;
  var element = /*#__PURE__*/React__namespace.createElement(inputnumber.InputNumber, {
    value: value,
    onChange: onChange,
    className: "p-paginator-page-input",
    disabled: props.disabled,
    pt: props.ptm('JTPInput'),
    unstyled: props.unstyled,
    __parentMetadata: {
      parent: props.metaData
    }
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
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
JumpToPageInput.displayName = 'JumpToPageInput';

function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var LastPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
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
  var className = utils.classNames('p-paginator-last p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var lastPageIconProps = utils.mergeProps({
    className: cx('lastPageIcon')
  }, getPTOptions('lastPageIcon'));
  var icon = props.lastPageLinkIcon || /*#__PURE__*/React__namespace.createElement(angledoubleright.AngleDoubleRightIcon, lastPageIconProps);
  var lastPageLinkIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$3({}, lastPageIconProps), {
    props: props
  });
  var lastPageButtonProps = utils.mergeProps({
    type: 'button',
    className: cx('lastPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': api.ariaLabel('lastPageLabel')
  }, getPTOptions('lastPageButton'));
  var element = /*#__PURE__*/React__namespace.createElement("button", lastPageButtonProps, lastPageLinkIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      props: props
    };
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
LastPageLink.displayName = 'LastPageLink';

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var NextPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
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
  var className = utils.classNames('p-paginator-next p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var nextPageIconProps = utils.mergeProps({
    className: cx('nextPageIcon')
  }, getPTOptions('nextPageIcon'));
  var icon = props.nextPageLinkIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, nextPageIconProps);
  var nextPageLinkIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$2({}, nextPageIconProps), {
    props: props
  });
  var nextPageButtonProps = utils.mergeProps({
    type: 'button',
    className: cx('nextPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': api.ariaLabel('nextPageLabel')
  }, getPTOptions('nextPageButton'));
  var element = /*#__PURE__*/React__namespace.createElement("button", nextPageButtonProps, nextPageLinkIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
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
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
NextPageLink.displayName = 'NextPageLink';

var PageLinks = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
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
      var className = utils.classNames('p-paginator-page p-paginator-element p-link', {
        'p-paginator-page-start': pageLink === startPageInView,
        'p-paginator-page-end': pageLink === endPageInView,
        'p-highlight': pageLink - 1 === props.page
      });
      var pageButtonProps = utils.mergeProps({
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
        'aria-label': api.ariaLabel('pageLabel', {
          page: pageLink
        })
      }, getPTOptions(pageLink, 'pageButton'));
      var element = /*#__PURE__*/React__namespace.createElement("button", pageButtonProps, pageLink, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
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
        element = utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
      }
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: pageLink
      }, element);
    });
  }
  var pagesProps = utils.mergeProps({
    className: cx('pages')
  }, ptm('pages', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React__namespace.createElement("span", pagesProps, elements);
});
PageLinks.displayName = 'PageLinks';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PrevPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
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
  var className = utils.classNames('p-paginator-prev p-paginator-element p-link', {
    'p-disabled': props.disabled
  });
  var iconClassName = 'p-paginator-icon';
  var prevPageIconProps = utils.mergeProps({
    className: cx('prevPageIcon')
  }, getPTOptions('prevPageIcon'));
  var icon = props.prevPageLinkIcon || /*#__PURE__*/React__namespace.createElement(angleleft.AngleLeftIcon, prevPageIconProps);
  var prevPageLinkIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, prevPageIconProps), {
    props: props
  });
  var prevPageButtonProps = utils.mergeProps({
    type: 'button',
    className: cx('prevPageButton', {
      disabled: props.disabled
    }),
    onClick: props.onClick,
    disabled: props.disabled,
    'aria-label': api.ariaLabel('previousPageLabel')
  }, getPTOptions('prevPageButton'));
  var element = /*#__PURE__*/React__namespace.createElement("button", prevPageButtonProps, prevPageLinkIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  if (props.template) {
    var defaultOptions = {
      onClick: props.onClick,
      className: className,
      iconClassName: iconClassName,
      disabled: props.disabled,
      element: element,
      props: props
    };
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
PrevPageLink.displayName = 'PrevPageLink';

var RowsPerPageDropdown = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = RowsPerPageDropdownBase.getProps(inProps, context);
  var hasOptions = props.options && props.options.length > 0;
  var options = hasOptions ? props.options.map(function (opt) {
    return {
      label: String(opt),
      value: opt
    };
  }) : [];
  var ariaLabel = api.localeOption('choose');
  var element = hasOptions ? /*#__PURE__*/React__namespace.createElement(dropdown.Dropdown, {
    value: props.value,
    options: options,
    onChange: props.onChange,
    appendTo: props.appendTo,
    disabled: props.disabled,
    placeholder: ariaLabel,
    "aria-label": ariaLabel,
    pt: props.ptm('RPPDropdown'),
    unstyled: props.unstyled,
    __parentMetadata: {
      parent: props.metaData
    }
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
    return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
RowsPerPageDropdown.displayName = 'RowsPerPageDropdown';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Paginator = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = PaginatorBase.getProps(inProps, context);
  var metaData = _objectSpread({
    props: props
  }, props.__parentMetadata);
  var _PaginatorBase$setMet = PaginatorBase.setMetaData(metaData),
    ptm = _PaginatorBase$setMet.ptm,
    cx = _PaginatorBase$setMet.cx,
    isUnstyled = _PaginatorBase$setMet.isUnstyled;
  componentbase.useHandleStyle(PaginatorBase.css.styles, isUnstyled, {
    name: 'paginator'
  });
  var elementRef = React__namespace.useRef(null);
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
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useUpdateEffect(function () {
    if (page > 0 && props.first >= props.totalRecords) {
      changePage((pageCount - 1) * props.rows, props.rows);
    }
  }, [props.totalRecords]);
  var createElement = function createElement(key, template) {
    var element;
    switch (key) {
      case 'FirstPageLink':
        element = /*#__PURE__*/React__namespace.createElement(FirstPageLink, {
          hostName: "Paginator",
          key: key,
          onClick: changePageToFirst,
          disabled: isFirstPage || isEmpty,
          template: template,
          firstPageLinkIcon: props.firstPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'PrevPageLink':
        element = /*#__PURE__*/React__namespace.createElement(PrevPageLink, {
          hostName: "Paginator",
          key: key,
          onClick: changePageToPrev,
          disabled: isFirstPage || isEmpty,
          template: template,
          prevPageLinkIcon: props.prevPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'NextPageLink':
        element = /*#__PURE__*/React__namespace.createElement(NextPageLink, {
          hostName: "Paginator",
          key: key,
          onClick: changePageToNext,
          disabled: isLastPage || isEmpty,
          template: template,
          nextPageLinkIcon: props.nextPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'LastPageLink':
        element = /*#__PURE__*/React__namespace.createElement(LastPageLink, {
          hostName: "Paginator",
          key: key,
          onClick: changePageToLast,
          disabled: isLastPage || isEmpty,
          template: template,
          lastPageLinkIcon: props.lastPageLinkIcon,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'PageLinks':
        element = /*#__PURE__*/React__namespace.createElement(PageLinks, {
          hostName: "Paginator",
          key: key,
          value: updatePageLinks(),
          page: page,
          rows: props.rows,
          pageCount: pageCount,
          onClick: onPageLinkClick,
          template: template,
          ptm: ptm,
          cx: cx
        });
        break;
      case 'RowsPerPageDropdown':
        element = /*#__PURE__*/React__namespace.createElement(RowsPerPageDropdown, {
          hostName: "Paginator",
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
          unstyled: props.unstyled,
          ptm: ptm,
          cx: cx,
          metaData: metaData
        });
        break;
      case 'CurrentPageReport':
        element = /*#__PURE__*/React__namespace.createElement(CurrentPageReport, {
          hostName: "Paginator",
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
        element = /*#__PURE__*/React__namespace.createElement(JumpToPageInput, {
          hostName: "Paginator",
          key: key,
          rows: props.rows,
          page: page,
          pageCount: pageCount,
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
  if (!props.alwaysShow && pageCount <= 1) {
    return null;
  } else {
    var leftContent = utils.ObjectUtils.getJSXElement(props.leftContent, props);
    var rightContent = utils.ObjectUtils.getJSXElement(props.rightContent, props);
    var elements = createElements();
    var leftProps = utils.mergeProps({
      className: cx('left')
    }, ptm('left'));
    var leftElement = leftContent && /*#__PURE__*/React__namespace.createElement("div", leftProps, leftContent);
    var endProps = utils.mergeProps({
      className: cx('end')
    }, ptm('end'));
    var rightElement = rightContent && /*#__PURE__*/React__namespace.createElement("div", endProps, rightContent);
    var rootProps = utils.mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      style: props.style
    }, PaginatorBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, leftElement, elements, rightElement);
  }
}));
Paginator.displayName = 'Paginator';

exports.Paginator = Paginator;
