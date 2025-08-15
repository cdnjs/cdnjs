this.primereact = this.primereact || {};
this.primereact.dataview = (function (exports, React, PrimeReact, componentbase, hooks, bars, spinner, thlarge, paginator, ripple, utils) {
  'use strict';

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

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _arrayLikeToArray$1(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray$1(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray$1(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$1(r) || _nonIterableSpread();
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
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

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
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
      return utils.classNames('p-grid grid', {
        'p-nogutter grid-nogutter': !props.gutter
      });
    },
    root: function root(_ref2) {
      var props = _ref2.props;
      return utils.classNames('p-dataview p-component', _defineProperty(_defineProperty({}, "p-dataview-".concat(props.layout), !!props.layout), 'p-dataview-loading', props.loading));
    }
  };
  var styles = "\n@layer primereact {\n    .p-dataview-loading {\n        position: relative;\n        min-height: 4rem;\n    }\n\n    .p-dataview .p-dataview-loading-overlay {\n        position: absolute;\n        z-index: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n}\n";
  var DataViewBase = componentbase.ComponentBase.extend({
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
  var DataViewLayoutOptionsBase = componentbase.ComponentBase.extend({
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
          return utils.classNames('p-button p-button-icon-only', {
            'p-highlight': props.layout === 'list'
          });
        },
        gridButton: function gridButton(_ref4) {
          var props = _ref4.props;
          return utils.classNames('p-button p-button-icon-only', {
            'p-highlight': props.layout === 'grid'
          });
        }
      }
    }
  });

  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var DataViewLayoutOptions = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
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
    var listIcon = utils.IconUtils.getJSXIcon(props.listIcon || /*#__PURE__*/React__namespace.createElement(bars.BarsIcon, listIconProps), _objectSpread({}, listIconProps), {
      props: props
    });
    var gridIcon = utils.IconUtils.getJSXIcon(props.gridIcon || /*#__PURE__*/React__namespace.createElement(thlarge.ThLargeIcon, gridIconProps), _objectSpread({}, gridIconProps), {
      props: props
    });
    var rootProps = mergeProps({
      id: props.id,
      style: props.style,
      className: utils.classNames(props.className, cx('root'))
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
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("button", listButtonProps, listIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("button", gridButtonProps, gridIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
  });
  var DataViewItem = /*#__PURE__*/React__namespace.memo(function (props) {
    return props.template(props.item, props.layout);
  });
  var DataView = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = DataViewBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.first),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      firstState = _React$useState2[0],
      setFirstState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(props.rows),
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
    componentbase.useHandleStyle(DataViewBase.css.styles, isUnstyled, {
      name: 'dataview'
    });
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
        dropdownAppendTo: props.paginatorDropdownAppendTo,
        pt: ptm('paginator'),
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
        var comparator = utils.ObjectUtils.localeComparator(context && context.locale || PrimeReact__default["default"].locale);
        var value = _toConsumableArray(props.value);
        var _iterator = _createForOfIteratorHelper(value),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            lookupMap.set(item, utils.ObjectUtils.resolveFieldData(item, props.sortField));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        value.sort(function (data1, data2) {
          var value1 = lookupMap.get(data1);
          var value2 = lookupMap.get(data2);
          return utils.ObjectUtils.sort(value1, value2, props.sortOrder, comparator, context && context.nullSortOrder || PrimeReact__default["default"].nullSortOrder);
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
        var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
          spin: true
        }));
        var loadingIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
          props: props
        });
        var loadingOverlayProps = mergeProps({
          className: cx('loadingOverlay')
        }, ptm('loadingOverlay'));
        return /*#__PURE__*/React__namespace.createElement("div", loadingOverlayProps, loadingIcon);
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
        var emptyMessageProps = mergeProps({
          className: cx('emptyMessage')
        }, ptm('emptyMessage'));
        return /*#__PURE__*/React__namespace.createElement("div", emptyMessageProps, _content);
      }
      return null;
    };
    var createHeader = function createHeader() {
      if (props.header) {
        var headerProps = mergeProps({
          className: cx('header')
        }, ptm('header'));
        return /*#__PURE__*/React__namespace.createElement("div", headerProps, props.header);
      }
      return null;
    };
    var createFooter = function createFooter() {
      if (props.footer) {
        var footerProps = mergeProps({
          className: cx('footer')
        }, ptm('footer'));
        return /*#__PURE__*/React__namespace.createElement("div", footerProps, props.footer);
      }
      return null;
    };
    var createItems = function createItems(value) {
      if (utils.ObjectUtils.isNotEmpty(value)) {
        var items = getItems(value);
        return items.map(function (item, index) {
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
      var contentProps = mergeProps({
        className: cx('content')
      }, ptm('content'));
      var content = null;
      if (props.listTemplate) {
        var items = getItems(value);
        if (utils.ObjectUtils.isNotEmpty(items)) {
          content = utils.ObjectUtils.getJSXElement(props.listTemplate, items, props.layout);
        } else {
          content = createEmptyMessage();
        }
      } else {
        var _items = createItems(value);
        var gridProps = mergeProps({
          className: cx('grid')
        }, ptm('grid'));
        content = /*#__PURE__*/React__namespace.createElement("div", gridProps, _items);
      }
      return /*#__PURE__*/React__namespace.createElement("div", contentProps, content);
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
      className: utils.classNames(props.className, cx('root'))
    }, DataViewBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, loader, header, topPaginator, content, bottomPaginator, footer);
  }));
  DataViewLayoutOptions.displayName = 'DataViewLayoutOptions';
  DataViewItem.displayName = 'DataViewItem';
  DataView.displayName = 'DataView';

  exports.DataView = DataView;
  exports.DataViewItem = DataViewItem;
  exports.DataViewLayoutOptions = DataViewLayoutOptions;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.icons.bars, primereact.icons.spinner, primereact.icons.thlarge, primereact.paginator, primereact.ripple, primereact.utils);
