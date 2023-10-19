import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { BarsIcon } from 'primereact/icons/bars';
import { SpinnerIcon } from 'primereact/icons/spinner';
import { ThLargeIcon } from 'primereact/icons/thlarge';
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames, mergeProps, IconUtils, ObjectUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

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
    onPage: null,
    children: undefined
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
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DataViewLayoutOptions = /*#__PURE__*/React.memo(function (inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = DataViewLayoutOptionsBase.getProps(inProps, context);
  var _DataViewLayoutOption = DataViewLayoutOptionsBase.setMetaData({
      props: props
    }),
    ptm = _DataViewLayoutOption.ptm;
  var changeLayout = function changeLayout(event, layoutMode) {
    props.onChange({
      originalEvent: event,
      value: layoutMode
    });
    event.preventDefault();
  };
  var className = classNames('p-dataview-layout-options p-selectbutton p-buttonset', props.className);
  var buttonListClass = classNames('p-button p-button-icon-only', {
    'p-highlight': props.layout === 'list'
  });
  var buttonGridClass = classNames('p-button p-button-icon-only', {
    'p-highlight': props.layout === 'grid'
  });
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
    className: className
  }, DataViewLayoutOptionsBase.getOtherProps(props), ptm('root'));
  var listButtonProps = mergeProps({
    type: 'button',
    className: buttonListClass,
    onClick: function onClick(event) {
      return changeLayout(event, 'list');
    }
  }, ptm('listButton'));
  var gridButtonProps = mergeProps({
    type: 'button',
    className: buttonGridClass,
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
  var _classNames;
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
  var _DataViewBase$setMeta = DataViewBase.setMetaData({
      props: props,
      state: {
        first: firstState,
        rows: rowsState
      }
    }),
    ptm = _DataViewBase$setMeta.ptm;
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
      ptm: ptm('paginator')
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
  var sort = function sort() {
    if (props.value) {
      var value = _toConsumableArray(props.value);
      value.sort(function (data1, data2) {
        var value1 = ObjectUtils.resolveFieldData(data1, props.sortField);
        var value2 = ObjectUtils.resolveFieldData(data2, props.sortField);
        return ObjectUtils.sort(value1, value2, props.sortOrder, context && context.locale || PrimeReact.locale, context && context.nullSortOrder || PrimeReact.nullSortOrder);
      });
      return value;
    }
    return null;
  };
  var createLoader = function createLoader() {
    if (props.loading) {
      var iconClassName = 'p-dataview-loading-icon';
      var loadingIconProps = mergeProps({
        className: iconClassName
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React.createElement(SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      }));
      var loadingIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingOverlayProps = mergeProps({
        className: 'p-dataview-loading-overlay p-component-overlay'
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
        className: 'p-col-12 col-12 p-dataview-emptymessage'
      }, ptm('emptyMessage'));
      return /*#__PURE__*/React.createElement("div", emptyMessageProps, _content);
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var headerProps = mergeProps({
        className: 'p-dataview-header'
      }, ptm('header'));
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var footerProps = mergeProps({
        className: 'p-dataview-footer'
      }, ptm('footer'));
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createItems = function createItems(value) {
    if (ObjectUtils.isNotEmpty(value)) {
      if (props.paginator) {
        var currentFirst = props.lazy ? 0 : first;
        var totalRecords = getTotalRecords();
        var last = Math.min(rows + currentFirst, totalRecords);
        var items = [];
        for (var i = currentFirst; i < last; i++) {
          var val = value[i];
          val && items.push( /*#__PURE__*/React.createElement(DataViewItem, {
            key: getItemRenderKey(value) || i,
            template: props.itemTemplate,
            layout: props.layout,
            item: val
          }));
        }
        return items;
      }
      return value.map(function (item, index) {
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
    var items = createItems(value);
    var gridClassName = classNames('p-grid grid', {
      'p-nogutter grid-nogutter': !props.gutter
    });
    var gridProps = mergeProps({
      className: gridClassName
    }, ptm('grid'));
    var contentProps = mergeProps({
      className: 'p-dataview-content'
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement("div", gridProps, items));
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
  var className = classNames('p-dataview p-component', (_classNames = {}, _defineProperty(_classNames, "p-dataview-".concat(props.layout), !!props.layout), _defineProperty(_classNames, 'p-dataview-loading', props.loading), _classNames), props.className);
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
    className: className
  }, DataViewBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, loader, header, topPaginator, content, bottomPaginator, footer);
}));
DataViewLayoutOptions.displayName = 'DataViewLayoutOptions';
DataViewItem.displayName = 'DataViewItem';
DataView.displayName = 'DataView';

export { DataView, DataViewItem, DataViewLayoutOptions };
