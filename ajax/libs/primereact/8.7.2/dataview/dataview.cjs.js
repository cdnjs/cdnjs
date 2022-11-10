'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var paginator = require('primereact/paginator');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

function _defineProperty(obj, key, value) {
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

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

var DataViewLayoutOptions = /*#__PURE__*/React__namespace.memo(function (props) {
  var changeLayout = function changeLayout(event, layoutMode) {
    props.onChange({
      originalEvent: event,
      value: layoutMode
    });
    event.preventDefault();
  };

  var otherProps = utils.ObjectUtils.findDiffKeys(props, DataViewLayoutOptions.defaultProps);
  var className = utils.classNames('p-dataview-layout-options p-selectbutton p-buttonset', props.className);
  var buttonListClass = utils.classNames('p-button p-button-icon-only', {
    'p-highlight': props.layout === 'list'
  });
  var buttonGridClass = utils.classNames('p-button p-button-icon-only', {
    'p-highlight': props.layout === 'grid'
  });
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    style: props.style,
    className: className
  }, otherProps), /*#__PURE__*/React__namespace.createElement("button", {
    type: "button",
    className: buttonListClass,
    onClick: function onClick(event) {
      return changeLayout(event, 'list');
    }
  }, /*#__PURE__*/React__namespace.createElement("i", {
    className: "pi pi-bars"
  }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("button", {
    type: "button",
    className: buttonGridClass,
    onClick: function onClick(event) {
      return changeLayout(event, 'grid');
    }
  }, /*#__PURE__*/React__namespace.createElement("i", {
    className: "pi pi-th-large"
  }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
});
var DataViewItem = /*#__PURE__*/React__namespace.memo(function (props) {
  return props.template(props.item, props.layout);
});
var DataView = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _classNames;

  var _React$useState = React__namespace.useState(props.first),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      firstState = _React$useState2[0],
      setFirstState = _React$useState2[1];

  var _React$useState3 = React__namespace.useState(props.rows),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      rowsState = _React$useState4[0],
      setRowsState = _React$useState4[1];

  var elementRef = React__namespace.useRef(null);
  var first = props.onPage ? props.first : firstState;
  var rows = props.onPage ? props.rows : rowsState;

  var getItemRenderKey = function getItemRenderKey(value) {
    return props.dataKey ? utils.ObjectUtils.resolveFieldData(value, props.dataKey) : null;
  };

  var getTotalRecords = function getTotalRecords() {
    return props.totalRecords ? props.totalRecords : props.value ? props.value.length : 0;
  };

  var createPaginator = function createPaginator(position) {
    var className = utils.classNames('p-paginator-' + position, props.paginatorClassName);
    var totalRecords = getTotalRecords();
    return /*#__PURE__*/React__namespace.createElement(paginator.Paginator, {
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
      dropdownAppendTo: props.paginatorDropdownAppendTo
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
        var value1 = utils.ObjectUtils.resolveFieldData(data1, props.sortField);
        var value2 = utils.ObjectUtils.resolveFieldData(data2, props.sortField);
        return utils.ObjectUtils.sort(value1, value2, props.sortOrder, PrimeReact__default["default"].locale, PrimeReact__default["default"].nullSortOrder);
      });
      return value;
    }

    return null;
  };

  var createLoader = function createLoader() {
    if (props.loading) {
      var iconClassName = utils.classNames('p-dataview-loading-icon pi-spin', props.loadingIcon);
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-dataview-loading-overlay p-component-overlay"
      }, /*#__PURE__*/React__namespace.createElement("i", {
        className: iconClassName
      }));
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
      var _content = props.emptyMessage || PrimeReact.localeOption('emptyMessage');

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-col-12 col-12 p-dataview-emptymessage"
      }, _content);
    }

    return null;
  };

  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-dataview-header"
      }, props.header);
    }

    return null;
  };

  var createFooter = function createFooter() {
    if (props.footer) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-dataview-footer"
      }, props.footer);
    }

    return null;
  };

  var createItems = function createItems(value) {
    if (utils.ObjectUtils.isNotEmpty(value)) {
      if (props.paginator) {
        var currentFirst = props.lazy ? 0 : first;
        var totalRecords = getTotalRecords();
        var last = Math.min(rows + currentFirst, totalRecords);
        var items = [];

        for (var i = currentFirst; i < last; i++) {
          var val = value[i];
          val && items.push( /*#__PURE__*/React__namespace.createElement(DataViewItem, {
            key: getItemRenderKey(value) || i,
            template: props.itemTemplate,
            layout: props.layout,
            item: val
          }));
        }

        return items;
      }

      return value.map(function (item, index) {
        return /*#__PURE__*/React__namespace.createElement(DataViewItem, {
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
    var gridClassName = utils.classNames('p-grid grid', {
      'p-nogutter grid-nogutter': !props.gutter
    });
    return /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-dataview-content"
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: gridClassName
    }, items));
  };

  var processData = function processData() {
    var data = props.value;

    if (utils.ObjectUtils.isNotEmpty(data) && props.sortField) {
      data = sort();
    }

    return data;
  };

  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var data = processData();
  var otherProps = utils.ObjectUtils.findDiffKeys(props, DataView.defaultProps);
  var className = utils.classNames('p-dataview p-component', (_classNames = {}, _defineProperty(_classNames, "p-dataview-".concat(props.layout), !!props.layout), _defineProperty(_classNames, 'p-dataview-loading', props.loading), _classNames), props.className);
  var loader = createLoader();
  var topPaginator = createTopPaginator();
  var bottomPaginator = createBottomPaginator();
  var header = createHeader();
  var footer = createFooter();
  var content = createContent(data);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className
  }, otherProps), loader, header, topPaginator, content, bottomPaginator, footer);
}));
DataViewLayoutOptions.displayName = 'DataViewLayoutOptions';
DataViewLayoutOptions.defaultProps = {
  __TYPE: 'DataViewLayoutOptions',
  id: null,
  style: null,
  className: null,
  layout: null,
  onChange: null
};
DataViewItem.displayName = 'DataViewItem';
DataView.displayName = 'DataView';
DataView.defaultProps = {
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
  loadingIcon: 'pi pi-spinner',
  gutter: false,
  itemTemplate: null,
  onPage: null
};

exports.DataView = DataView;
exports.DataViewItem = DataViewItem;
exports.DataViewLayoutOptions = DataViewLayoutOptions;
