'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { BarsIcon } from 'primereact/icons/bars';
import { SpinnerIcon } from 'primereact/icons/spinner';
import { ThLargeIcon } from 'primereact/icons/thlarge';
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames, IconUtils, ObjectUtils } from 'primereact/utils';
import { useMergeProps } from 'primereact/hooks';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
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
  loadingIcon: 'p-dataview-loading-icon',
  loadingOverlay: 'p-dataview-loading-overlay p-component-overlay',
  emptyMessage: 'p-dataview-emptymessage',
  header: 'p-dataview-header',
  footer: 'p-dataview-footer',
  content: 'p-dataview-content',
  grid: function grid(_ref) {
    var props = _ref.props;
    return classNames('p-grid grid', {
      'p-nogutter grid-nogutter': !props.gutter
    });
  },
  root: function root(_ref2) {
    var props = _ref2.props;
    return classNames('p-dataview p-component', _defineProperty(_defineProperty({}, "p-dataview-".concat(props.layout), !!props.layout), 'p-dataview-loading', props.loading));
  }
};
var styles = "\n@layer primereact {\n    .p-dataview-loading {\n        position: relative;\n        min-height: 4rem;\n    }\n\n    .p-dataview .p-dataview-loading-overlay {\n        position: absolute;\n        z-index: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n}\n";
var DataViewBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataView',
    id: null,
    header: null,
    footer: null,
    value: null,
    layout: 'list',
    dataKey: null,
    rows: null,
    first: 0,
    totalRecords: null,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorClassName: null,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    paginatorLeft: null,
    paginatorRight: null,
    paginatorDropdownAppendTo: null,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    emptyMessage: null,
    sortField: null,
    sortOrder: null,
    style: null,
    className: null,
    lazy: false,
    loading: false,
    loadingIcon: null,
    gutter: false,
    itemTemplate: null,
    listTemplate: null,
    onPage: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});
var DataViewLayoutOptionsBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataViewLayoutOptions',
    id: null,
    style: null,
    className: null,
    layout: null,
    listIcon: null,
    gridIcon: null,
    onChange: null,
    children: undefined
  },
  css: {
    classes: {
      root: 'p-dataview p-component p-dataview-layout-options p-selectbutton p-button-group',
      listButton: function listButton(_ref3) {
        var props = _ref3.props;
        return classNames('p-button p-button-icon-only', {
          'p-highlight': props.layout === 'list'
        });
      },
      gridButton: function gridButton(_ref4) {
        var props = _ref4.props;
        return classNames('p-button p-button-icon-only', {
          'p-highlight': props.layout === 'grid'
        });
      }
    }
  }
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DataViewLayoutOptions = /*#__PURE__*/React.memo(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = DataViewLayoutOptionsBase.getProps(inProps, context);
  var _DataViewLayoutOption = DataViewLayoutOptionsBase.setMetaData({
      props: props
    }),
    ptm = _DataViewLayoutOption.ptm,
    cx = _DataViewLayoutOption.cx;
  var changeLayout = function changeLayout(event, layoutMode) {
    props.onChange({
      originalEvent: event,
      value: layoutMode
    });
    event.preventDefault();
  };
  var listIconProps = mergeProps(ptm('list'));
  var gridIconProps = mergeProps(ptm('grid'));
  var listIcon = IconUtils.getJSXIcon(props.listIcon || /*#__PURE__*/React.createElement(BarsIcon, listIconProps), _objectSpread({}, listIconProps), {
    props: props
  });
  var gridIcon = IconUtils.getJSXIcon(props.gridIcon || /*#__PURE__*/React.createElement(ThLargeIcon, gridIconProps), _objectSpread({}, gridIconProps), {
    props: props
  });
  var rootProps = mergeProps({
    id: props.id,
    style: props.style,
    className: classNames(props.className, cx('root'))
  }, DataViewLayoutOptionsBase.getOtherProps(props), ptm('root'));
  var listButtonProps = mergeProps({
    type: 'button',
    className: cx('listButton'),
    onClick: function onClick(event) {
      return changeLayout(event, 'list');
    }
  }, ptm('listButton'));
  var gridButtonProps = mergeProps({
    type: 'button',
    className: cx('gridButton'),
    onClick: function onClick(event) {
      return changeLayout(event, 'grid');
    }
  }, ptm('gridButton'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("button", listButtonProps, listIcon, /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("button", gridButtonProps, gridIcon, /*#__PURE__*/React.createElement(Ripple, null)));
});
var DataViewItem = /*#__PURE__*/React.memo(function (props) {
  return props.template(props.item, props.layout);
});
var DataView = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = DataViewBase.getProps(inProps, context);
  var _React$useState = React.useState(props.first),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    firstState = _React$useState2[0],
    setFirstState = _React$useState2[1];
  var _React$useState3 = React.useState(props.rows),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    rowsState = _React$useState4[0],
    setRowsState = _React$useState4[1];
  var metaData = {
    props: props,
    state: {
      first: firstState,
      rows: rowsState
    }
  };
  var _DataViewBase$setMeta = DataViewBase.setMetaData(metaData),
    ptm = _DataViewBase$setMeta.ptm,
    cx = _DataViewBase$setMeta.cx,
    isUnstyled = _DataViewBase$setMeta.isUnstyled;
  useHandleStyle(DataViewBase.css.styles, isUnstyled, {
    name: 'dataview'
  });
  var elementRef = React.useRef(null);
  var first = props.onPage ? props.first : firstState;
  var rows = props.onPage ? props.rows : rowsState;
  var getItemRenderKey = function getItemRenderKey(value) {
    return props.dataKey ? ObjectUtils.resolveFieldData(value, props.dataKey) : null;
  };
  var getTotalRecords = function getTotalRecords() {
    return props.totalRecords ? props.totalRecords : props.value ? props.value.length : 0;
  };
  var createPaginator = function createPaginator(position) {
    var className = classNames('p-paginator-' + position, props.paginatorClassName);
    var totalRecords = getTotalRecords();
    return /*#__PURE__*/React.createElement(Paginator, {
      first: first,
      rows: rows,
      pageLinkSize: props.pageLinkSize,
      className: className,
      onPageChange: onPageChange,
      template: props.paginatorTemplate,
      totalRecords: totalRecords,
      rowsPerPageOptions: props.rowsPerPageOptions,
      currentPageReportTemplate: props.currentPageReportTemplate,
      leftContent: props.paginatorLeft,
      rightContent: props.paginatorRight,
      alwaysShow: props.alwaysShowPaginator,
      dropdownAppendTo: props.paginatorDropdownAppendTo,
      ptm: ptm('paginator'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: metaData
      }
    });
  };
  var onPageChange = function onPageChange(event) {
    if (props.onPage) {
      props.onPage(event);
    } else {
      setFirstState(event.first);
      setRowsState(event.rows);
    }
  };
  var getItems = function getItems(value) {
    if (props.paginator) {
      var currentFirst = props.lazy ? 0 : first;
      var totalRecords = getTotalRecords();
      var last = Math.min(rows + currentFirst, totalRecords);
      return value.slice(currentFirst, last) || [];
    }
    return value;
  };
  var sort = function sort() {
    if (props.value) {
      // performance optimization to prevent resolving field data in each loop
      var lookupMap = new Map();
      var comparator = ObjectUtils.localeComparator(context && context.locale || PrimeReact.locale);
      var value = _toConsumableArray(props.value);
      var _iterator = _createForOfIteratorHelper(value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          lookupMap.set(item, ObjectUtils.resolveFieldData(item, props.sortField));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      value.sort(function (data1, data2) {
        var value1 = lookupMap.get(data1);
        var value2 = lookupMap.get(data2);
        return ObjectUtils.sort(value1, value2, props.sortOrder, comparator, context && context.nullSortOrder || PrimeReact.nullSortOrder);
      });
      return value;
    }
    return null;
  };
  var createLoader = function createLoader() {
    if (props.loading) {
      var loadingIconProps = mergeProps({
        className: cx('loadingIcon')
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React.createElement(SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      }));
      var loadingIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingOverlayProps = mergeProps({
        className: cx('loadingOverlay')
      }, ptm('loadingOverlay'));
      return /*#__PURE__*/React.createElement("div", loadingOverlayProps, loadingIcon);
    }
    return null;
  };
  var createTopPaginator = function createTopPaginator() {
    if (props.paginator && (props.paginatorPosition !== 'bottom' || props.paginatorPosition === 'both')) {
      return createPaginator('top');
    }
    return null;
  };
  var createBottomPaginator = function createBottomPaginator() {
    if (props.paginator && (props.paginatorPosition !== 'top' || props.paginatorPosition === 'both')) {
      return createPaginator('bottom');
    }
    return null;
  };
  var createEmptyMessage = function createEmptyMessage() {
    if (!props.loading) {
      var _content = props.emptyMessage || localeOption('emptyMessage');
      var emptyMessageProps = mergeProps({
        className: cx('emptyMessage')
      }, ptm('emptyMessage'));
      return /*#__PURE__*/React.createElement("div", emptyMessageProps, _content);
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var headerProps = mergeProps({
        className: cx('header')
      }, ptm('header'));
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var footerProps = mergeProps({
        className: cx('footer')
      }, ptm('footer'));
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createItems = function createItems(value) {
    if (ObjectUtils.isNotEmpty(value)) {
      var items = getItems(value);
      return items.map(function (item, index) {
        return /*#__PURE__*/React.createElement(DataViewItem, {
          key: getItemRenderKey(item) || index,
          template: props.itemTemplate,
          layout: props.layout,
          item: item
        });
      });
    }
    return createEmptyMessage();
  };
  var createContent = function createContent(value) {
    var contentProps = mergeProps({
      className: cx('content')
    }, ptm('content'));
    var content = null;
    if (props.listTemplate) {
      var items = getItems(value);
      content = ObjectUtils.getJSXElement(props.listTemplate, items, props.layout);
    } else {
      var _items = createItems(value);
      var gridProps = mergeProps({
        className: cx('grid')
      }, ptm('grid'));
      content = /*#__PURE__*/React.createElement("div", gridProps, _items);
    }
    return /*#__PURE__*/React.createElement("div", contentProps, content);
  };
  var processData = function processData() {
    var data = props.value;
    if (ObjectUtils.isNotEmpty(data) && props.sortField) {
      data = sort();
    }
    return data;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var data = processData();
  var loader = createLoader();
  var topPaginator = createTopPaginator();
  var bottomPaginator = createBottomPaginator();
  var header = createHeader();
  var footer = createFooter();
  var content = createContent(data);
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames(props.className, cx('root'))
  }, DataViewBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, loader, header, topPaginator, content, bottomPaginator, footer);
}));
DataViewLayoutOptions.displayName = 'DataViewLayoutOptions';
DataViewItem.displayName = 'DataViewItem';
DataView.displayName = 'DataView';

export { DataView, DataViewItem, DataViewLayoutOptions };
