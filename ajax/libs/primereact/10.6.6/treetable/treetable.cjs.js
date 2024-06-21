'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var componentbase = require('primereact/componentbase');
var utils = require('primereact/utils');
var hooks = require('primereact/hooks');
var arrowdown = require('primereact/icons/arrowdown');
var arrowup = require('primereact/icons/arrowup');
var spinner = require('primereact/icons/spinner');
var paginator = require('primereact/paginator');
var check = require('primereact/icons/check');
var chevrondown = require('primereact/icons/chevrondown');
var chevronright = require('primereact/icons/chevronright');
var minus = require('primereact/icons/minus');
var ripple = require('primereact/ripple');
var overlayservice = require('primereact/overlayservice');
var tooltip = require('primereact/tooltip');
var sortalt = require('primereact/icons/sortalt');
var sortamountdown = require('primereact/icons/sortamountdown');
var sortamountupalt = require('primereact/icons/sortamountupalt');
var inputtext = require('primereact/inputtext');

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

function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$4(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread();
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest();
}

var ColumnBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Column',
    align: null,
    alignFrozen: 'left',
    alignHeader: null,
    body: null,
    bodyClassName: null,
    bodyStyle: null,
    cellEditValidateOnClose: false,
    cellEditValidator: null,
    cellEditValidatorEvent: 'click',
    className: null,
    colSpan: null,
    columnKey: null,
    dataType: 'text',
    editor: null,
    excludeGlobalFilter: false,
    expander: false,
    exportField: null,
    exportable: true,
    field: null,
    filter: false,
    filterApply: null,
    filterClear: null,
    filterElement: null,
    filterField: null,
    filterFooter: null,
    filterFunction: null,
    filterHeader: null,
    filterHeaderClassName: null,
    filterHeaderStyle: null,
    filterMatchMode: null,
    filterMatchModeOptions: null,
    filterMaxLength: null,
    filterMenuClassName: null,
    filterMenuStyle: null,
    filterPlaceholder: null,
    filterType: 'text',
    footer: null,
    footerClassName: null,
    footerStyle: null,
    frozen: false,
    header: null,
    headerClassName: null,
    headerStyle: null,
    headerTooltip: null,
    headerTooltipOptions: null,
    hidden: false,
    maxConstraints: 2,
    onBeforeCellEditHide: null,
    onBeforeCellEditShow: null,
    onCellEditCancel: null,
    onCellEditComplete: null,
    onCellEditInit: null,
    onFilterApplyClick: null,
    onFilterClear: null,
    onFilterConstraintAdd: null,
    onFilterConstraintRemove: null,
    onFilterMatchModeChange: null,
    onFilterOperatorChange: null,
    reorderable: true,
    resizeable: true,
    rowEditor: false,
    rowReorder: false,
    rowReorderIcon: null,
    rowSpan: null,
    selectionMode: null,
    showAddButton: true,
    showApplyButton: true,
    showClearButton: true,
    showFilterMatchModes: true,
    showFilterMenu: true,
    showFilterMenuOptions: true,
    showFilterOperator: true,
    sortField: null,
    sortFunction: null,
    sortable: false,
    sortableDisabled: false,
    style: null,
    children: undefined
  },
  getCProp: function getCProp(column, name) {
    return utils.ObjectUtils.getComponentProp(column, name, ColumnBase.defaultProps);
  },
  getCProps: function getCProps(column) {
    return utils.ObjectUtils.getComponentProps(column, ColumnBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(column) {
    return utils.ObjectUtils.getComponentDiffProps(column, ColumnBase.defaultProps);
  }
});

var classes$1 = {
  root: function root(_ref) {
    var props = _ref.props,
      isRowSelectionMode = _ref.isRowSelectionMode;
    return utils.classNames('p-treetable p-component', {
      'p-treetable-hoverable-rows': props.rowHover,
      'p-treetable-selectable': isRowSelectionMode(),
      'p-treetable-resizable': props.resizableColumns,
      'p-treetable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-treetable-striped': props.stripedRows,
      'p-treetable-gridlines': props.showGridlines
    });
  },
  loadingIcon: 'p-treetable-loading-icon',
  loadingWrapper: 'p-treetable-loading',
  loadingOverlay: 'p-treetable-loading-overlay p-component-overlay',
  header: 'p-treetable-header',
  footer: 'p-treetable-footer',
  resizeHelper: 'p-column-resizer-helper',
  reorderIndicatorUp: 'p-treetable-reorder-indicator-up',
  reorderIndicatorDown: 'p-treetable-reorder-indicator-down',
  wrapper: 'p-treetable-wrapper',
  table: function table(_ref2) {
    var props = _ref2.props;
    return utils.classNames('p-treetable-table', {
      'p-treetable-scrollable-table': props.scrollable,
      'p-treetable-resizable-table': props.resizableColumns,
      'p-treetable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
    });
  },
  scrollableWrapper: 'p-treetable-wrapper p-treetable-scrollable-wrapper',
  thead: 'p-treetable-thead',
  tbody: 'p-treetable-tbody',
  tfoot: 'p-treetable-tfoot',
  emptyMessage: 'p-treetable-emptymessage',
  bodyCell: function bodyCell(_ref3) {
    var props = _ref3.bodyProps,
      editingState = _ref3.editingState,
      align = _ref3.align;
    return utils.classNames(_defineProperty({
      'p-editable-column': props.editor,
      'p-cell-editing': props.editor ? editingState : false
    }, "p-align-".concat(align), !!align));
  },
  sortBadge: 'p-sortable-column-badge',
  headerTitle: 'p-column-title',
  headerContent: 'p-column-header-content',
  headerCell: function headerCell(_ref4) {
    var props = _ref4.headerProps,
      frozen = _ref4.frozen,
      column = _ref4.column,
      options = _ref4.options,
      getColumnProp = _ref4.getColumnProp,
      sorted = _ref4.sorted,
      align = _ref4.align;
    return options.filterOnly ? utils.classNames('p-filter-column', {
      'p-frozen-column': frozen
    }) : utils.classNames(_defineProperty({
      'p-sortable-column': getColumnProp(column, 'sortable'),
      'p-highlight': sorted,
      'p-frozen-column': frozen,
      'p-resizable-column': props.resizableColumns && getColumnProp(column, 'resizeable'),
      'p-reorderable-column': props.reorderableColumns && getColumnProp(column, 'reorderable') && !frozen
    }, "p-align-".concat(align), !!align));
  },
  columnResizer: 'p-column-resizer p-clickable',
  sortIcon: 'p-sortable-column-icon',
  row: function row(_ref5) {
    var isSelected = _ref5.isSelected,
      props = _ref5.rowProps;
    return {
      'p-highlight': isSelected(),
      'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key,
      'p-row-odd': props.rowIndex % 2 !== 0
    };
  },
  rowCheckbox: function rowCheckbox(_ref6) {
    var partialChecked = _ref6.partialChecked;
    return utils.classNames('p-treetable-checkbox', {
      'p-indeterminate': partialChecked
    });
  },
  rowToggler: 'p-treetable-toggler p-link p-unselectable-text',
  rowTogglerIcon: 'p-treetable-toggler-icon',
  scrollableBody: 'p-treetable-scrollable-body',
  scrollableHeaderTable: 'p-treetable-scrollable-header-table',
  scrollableHeaderBox: 'p-treetable-scrollable-header-box',
  scrollableHeader: 'p-treetable-scrollable-header',
  scrollableBodyTable: 'p-treetable-scrollable-body-table',
  scrollableFooter: 'p-treetable-scrollable-footer',
  scrollableFooterBox: 'p-treetable-scrollable-footer-box',
  scrollableFooterTable: 'p-treetable-scrollable-footer-table',
  scrollable: function scrollable(_ref7) {
    var props = _ref7.scrolaableProps;
    return utils.classNames('p-treetable-scrollable-view', {
      'p-treetable-frozen-view': props.frozen,
      'p-treetable-unfrozen-view': !props.frozen && props.frozenWidth
    });
  },
  scrollableColgroup: 'p-treetable-scrollable-colgroup'
};
var TreeTableBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TreeTable',
    alwaysShowPaginator: true,
    checkboxIcon: null,
    className: null,
    columnResizeMode: 'fit',
    contextMenuSelectionKey: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    customRestoreState: null,
    customSaveState: null,
    defaultSortOrder: 1,
    emptyMessage: null,
    expandedKeys: null,
    filterDelay: 300,
    filterLocale: undefined,
    filterMode: 'lenient',
    filters: null,
    first: null,
    footer: null,
    footerColumnGroup: null,
    frozenFooterColumnGroup: null,
    frozenHeaderColumnGroup: null,
    frozenWidth: null,
    globalFilter: null,
    globalFilterMatchMode: PrimeReact.FilterMatchMode.CONTAINS,
    header: null,
    headerColumnGroup: null,
    id: null,
    lazy: false,
    loading: false,
    loadingIcon: null,
    metaKeySelection: false,
    multiSortMeta: null,
    onColReorder: null,
    onCollapse: null,
    onColumnResizeEnd: null,
    onContextMenu: null,
    onContextMenuSelectionChange: null,
    onExpand: null,
    onFilter: null,
    onPage: null,
    onRowClick: null,
    onRowMouseEnter: null,
    onRowMouseLeave: null,
    onSelect: null,
    onSelectionChange: null,
    onSort: null,
    onStateRestore: null,
    onStateSave: null,
    onToggle: null,
    onUnselect: null,
    onValueChange: null,
    pageLinkSize: 5,
    paginator: false,
    paginatorClassName: null,
    paginatorDropdownAppendTo: null,
    paginatorLeft: null,
    paginatorPosition: 'bottom',
    paginatorRight: null,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    propagateSelectionDown: true,
    propagateSelectionUp: true,
    removableSort: false,
    reorderIndicatorDownIcon: null,
    reorderIndicatorUpIcon: null,
    reorderableColumns: false,
    resizableColumns: false,
    rowClassName: null,
    rowHover: false,
    rows: null,
    rowsPerPageOptions: null,
    scrollHeight: null,
    scrollable: false,
    selectOnEdit: true,
    selectionKeys: null,
    selectionMode: null,
    showGridlines: false,
    sortField: null,
    sortIcon: null,
    sortMode: 'single',
    sortOrder: null,
    stateKey: null,
    stateStorage: null,
    stripedRows: false,
    style: null,
    tabIndex: 0,
    tableClassName: null,
    tableStyle: null,
    totalRecords: null,
    value: null,
    children: undefined
  },
  css: {
    classes: classes$1
  }
});

function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeTableBodyCell = function TreeTableBodyCell(props) {
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    editingState = _React$useState2[0],
    setEditingState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var keyHelperRef = React__namespace.useRef(null);
  var selfClick = React__namespace.useRef(false);
  var overlayEventListener = React__namespace.useRef(null);
  var tabIndexTimeout = React__namespace.useRef(null);
  var mergeProps = hooks.useMergeProps();
  var getColumnProp = function getColumnProp(name) {
    return ColumnBase.getCProp(props.column, name);
  };
  var getColumnProps = function getColumnProps(column) {
    return ColumnBase.getCProps(column);
  };
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var isSingleSelectionMode = props.metaData.props.selectionMode === 'single';
    var isMultipleSelectionMode = props.metaData.props.selectionMode === 'multiple';
    var cProps = getColumnProps(props.column);
    var columnMetadata = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        editing: editingState
      },
      context: {
        index: props.index,
        selectable: isSingleSelectionMode || isMultipleSelectionMode,
        selected: props.selected,
        scrollable: props.metaData.props.scrollable,
        frozen: getColumnProp('frozen'),
        showGridlines: props.metaData.props.showGridlines
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetadata
    }), ptm("column.".concat(key), columnMetadata), ptmo(cProps, key, columnMetadata));
  };
  var field = getColumnProp('field') || "field_".concat(props.index);
  var getCellParams = function getCellParams() {
    return {
      value: resolveFieldData(),
      field: field,
      rowData: props.rowData,
      rowIndex: props.rowIndex,
      cellIndex: props.index,
      selected: isSelected(),
      column: props.column,
      props: props
    };
  };
  var getCellCallbackParams = function getCellCallbackParams(event) {
    var params = getCellParams();
    return _objectSpread$6({
      originalEvent: event
    }, params);
  };
  var resolveFieldData = function resolveFieldData(data) {
    return utils.ObjectUtils.resolveFieldData(data || props.node.data, field);
  };
  var _useEventListener = hooks.useEventListener({
      type: 'click',
      listener: function listener(e) {
        if (!selfClick.current && isOutsideClicked(e.target)) {
          switchCellToViewMode(e);
        }
        selfClick.current = false;
      },
      when: getColumnProp('editor')
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var _onClick = function onClick(event) {
    if (getColumnProp('editor') && !editingState && (props.selectOnEdit || !props.selectOnEdit && props.selected)) {
      selfClick.current = true;
      var params = getCellCallbackParams(event);
      var onBeforeCellEditShow = getColumnProp('onBeforeCellEditShow');
      if (onBeforeCellEditShow) {
        // if user returns false do not show the editor
        if (onBeforeCellEditShow(params) === false) {
          return;
        }

        // if user prevents default stop the editor
        if (event && event.defaultPrevented) {
          return;
        }
      }
      setEditingState(true);
      var onCellEditInit = getColumnProp('onCellEditInit');
      if (onCellEditInit) {
        if (onCellEditInit(params) === false) {
          return;
        }

        // if user prevents default stop the editor
        if (event && event.defaultPrevented) {
          return;
        }
      }
      bindDocumentClickListener();
      overlayEventListener.current = function (e) {
        if (!isOutsideClicked(e.target)) {
          selfClick.current = true;
        }
      };
      overlayservice.OverlayService.on('overlay-click', overlayEventListener.current);
    }
  };
  var _onKeyDown = function onKeyDown(event) {
    if (event.which === 13 || event.which === 9) {
      switchCellToViewMode(event);
    }
  };
  var isOutsideClicked = function isOutsideClicked(target) {
    return elementRef.current && !(elementRef.current.isSameNode(target) || elementRef.current.contains(target));
  };
  var closeCell = function closeCell() {
    /* When using the 'tab' key, the focus event of the next cell is not called in IE. */
    setTimeout(function () {
      setEditingState(false);
      unbindDocumentClickListener();
      overlayservice.OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }, 1);
  };
  var onEditorFocus = function onEditorFocus(event) {
    _onClick(event);
  };
  var switchCellToViewMode = function switchCellToViewMode(event) {
    if (props.cellEditValidator) {
      var valid = props.cellEditValidator({
        originalEvent: event,
        columnProps: props
      });
      if (valid) {
        closeCell();
      }
    } else {
      closeCell();
    }
  };
  var isSelected = function isSelected() {
    return props.selection ? props.selection instanceof Array ? findIndex(props.selection) > -1 : equals(props.selection) : false;
  };
  React__namespace.useEffect(function () {
    if (elementRef.current && getColumnProp('editor')) {
      clearTimeout(tabIndexTimeout.current);
      if (editingState) {
        var focusable = utils.DomHandler.findSingle(elementRef.current, 'input');
        if (focusable && document.activeElement !== focusable && !focusable.hasAttribute('data-isCellEditing')) {
          focusable.setAttribute('data-isCellEditing', true);
          focusable.focus();
        }
        keyHelperRef.current.tabIndex = -1;
      } else {
        tabIndexTimeout.current = setTimeout(function () {
          if (keyHelperRef.current) {
            keyHelperRef.current.setAttribute('tabindex', 0);
          }
        }, 50);
      }
    }
  });
  hooks.useUnmountEffect(function () {
    if (overlayEventListener.current) {
      overlayservice.OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }
  });
  var bodyClassName = utils.ObjectUtils.getPropValue(props.bodyClassName, props.node.data, {
    field: props.field,
    rowIndex: props.rowIndex,
    props: props
  });
  var style = props.bodyStyle || props.style;
  var columnEditor = getColumnProp('editor');
  var content;
  if (editingState) {
    if (columnEditor) {
      content = utils.ObjectUtils.getJSXElement(columnEditor, {
        node: props.node,
        rowData: props.rowData,
        value: utils.ObjectUtils.resolveFieldData(props.node.data, props.field),
        field: props.field,
        rowIndex: props.rowIndex,
        props: props
      });
    } else {
      throw new Error('Editor is not found on column.');
    }
  } else if (props.body) {
    content = utils.ObjectUtils.getJSXElement(props.body, props.node, {
      field: props.field,
      rowIndex: props.rowIndex,
      props: props
    });
  } else {
    content = utils.ObjectUtils.resolveFieldData(props.node.data, props.field);
  }
  var editorKeyHelperProps = mergeProps({
    tabIndex: 0,
    ref: keyHelperRef,
    className: 'p-cell-editor-key-helper p-hidden-accessible',
    onFocus: function onFocus(e) {
      return onEditorFocus(e);
    }
  }, getColumnPTOptions('editorKeyHelperLabel'));
  var editorKeyHelperLabelProps = mergeProps(getColumnPTOptions('editorKeyHelper'));
  /* eslint-disable */
  var editorKeyHelper = columnEditor && /*#__PURE__*/React__namespace.createElement("a", editorKeyHelperProps, /*#__PURE__*/React__namespace.createElement("span", editorKeyHelperLabelProps));
  var align = getColumnProp('align');
  /* eslint-enable */
  var bodyCellProps = mergeProps({
    role: 'cell',
    className: utils.classNames(bodyClassName || props.className, cx('bodyCell', {
      bodyProps: props,
      editingState: editingState,
      align: align
    })),
    style: style,
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      return _onKeyDown(e);
    }
  }, getColumnPTOptions('root'), getColumnPTOptions('bodyCell'));
  return /*#__PURE__*/React__namespace.createElement("td", _extends({
    ref: elementRef
  }, bodyCellProps), props.children, editorKeyHelper, content);
};
TreeTableBodyCell.displayName = 'TreeTableBodyCell';

var classes = {
  box: 'p-checkbox-box',
  input: 'p-checkbox-input',
  icon: 'p-checkbox-icon',
  root: function root(_ref) {
    var props = _ref.props,
      checked = _ref.checked,
      context = _ref.context;
    return utils.classNames('p-checkbox p-component', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  }
};
var CheckboxBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Checkbox',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    icon: null,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    name: null,
    onChange: null,
    onContextMenu: null,
    onMouseDown: null,
    readOnly: false,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    value: null,
    children: undefined
  },
  css: {
    classes: classes
  }
});

function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Checkbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = CheckboxBase.getProps(inProps, context);
  var _CheckboxBase$setMeta = CheckboxBase.setMetaData({
      props: props,
      context: {
        checked: props.checked === props.trueValue,
        disabled: props.disabled
      }
    }),
    ptm = _CheckboxBase$setMeta.ptm,
    cx = _CheckboxBase$setMeta.cx,
    isUnstyled = _CheckboxBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(CheckboxBase.css.styles, isUnstyled, {
    name: 'checkbox'
  });
  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
  };
  var _onChange = function onChange(event) {
    if (props.disabled || props.readonly) {
      return;
    }
    if (props.onChange) {
      var _props$onChange;
      var _checked = isChecked();
      var value = _checked ? props.falseValue : props.trueValue;
      var eventData = {
        originalEvent: event,
        value: props.value,
        checked: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          type: 'checkbox',
          name: props.name,
          id: props.id,
          value: props.value,
          checked: value
        }
      };
      props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, eventData);

      // do not continue if the user defined click wants to prevent
      if (event.defaultPrevented) {
        return;
      }
      utils.DomHandler.focus(inputRef.current);
    }
  };
  var _onFocus = function onFocus() {
    var _props$onFocus;
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props);
  };
  var _onBlur = function onBlur() {
    var _props$onBlur;
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props);
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return utils.DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  hooks.useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var checked = isChecked();
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var rootProps = mergeProps({
    id: props.id,
    className: utils.classNames(props.className, cx('root', {
      checked: checked,
      context: context
    })),
    style: props.style,
    'data-p-highlight': checked,
    'data-p-disabled': props.disabled,
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }, otherProps, ptm('root'));
  var createInputElement = function createInputElement() {
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var inputProps = mergeProps(_objectSpread$5({
      id: props.inputId,
      type: 'checkbox',
      className: cx('input'),
      name: props.name,
      tabIndex: props.tabIndex,
      onFocus: function onFocus(e) {
        return _onFocus();
      },
      onBlur: function onBlur(e) {
        return _onBlur();
      },
      onChange: function onChange(e) {
        return _onChange(e);
      },
      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required,
      'aria-invalid': props.invalid,
      checked: checked
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef
    }, inputProps));
  };
  var createBoxElement = function createBoxElement() {
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var boxProps = mergeProps({
      className: cx('box', {
        checked: checked
      }),
      'data-p-highlight': checked,
      'data-p-disabled': props.disabled
    }, ptm('box'));
    var icon = checked ? props.icon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps) : null;
    var checkboxIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$5({}, iconProps), {
      props: props,
      checked: checked
    });
    return /*#__PURE__*/React__namespace.createElement("div", boxProps, checkboxIcon);
  };
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Checkbox.displayName = 'Checkbox';

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeTableRow = /*#__PURE__*/React__namespace.memo(function (props) {
  var elementRef = React__namespace.useRef(null);
  React__namespace.useRef(null);
  React__namespace.useRef(null);
  var nodeTouched = React__namespace.useRef(false);
  var mergeProps = hooks.useMergeProps();
  var expanded = props.expandedKeys ? props.expandedKeys[props.node.key] !== undefined : false;
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var getColumnProps = function getColumnProps(column) {
    return ColumnBase.getCProps(column);
  };
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx,
    isUnstyled = _props$ptCallbacks.isUnstyled;
  var getColumnPTOptions = function getColumnPTOptions(column, key) {
    var cProps = getColumnProps(column);
    var columnMetadata = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      context: {
        index: props.rowIndex,
        selectable: props.node.selectable !== false,
        selected: isSelected(),
        frozen: getColumnProp(column, 'frozen'),
        scrollable: props.metaData.props.scrollable
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetadata
    }), ptm("column.".concat(key), columnMetadata), ptmo(cProps, key, columnMetadata));
  };
  var getColumnCheckboxPTOptions = function getColumnCheckboxPTOptions(column, key) {
    var cProps = getColumnProps(column);
    var columnMetadata = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      context: {
        checked: isChecked(),
        partialChecked: isPartialChecked()
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetadata
    }), ptm("column.".concat(key), columnMetadata), ptmo(cProps, key, columnMetadata));
  };
  var getRowPTOptions = function getRowPTOptions(key) {
    var rowMetadata = {
      hostName: props.hostName,
      context: {
        index: props.index,
        selected: isSelected(),
        selectable: props.node.selectable !== false,
        frozen: getColumnProp('frozen'),
        scrollable: props.metaData.props.scrollable,
        showGridlines: props.metaData.props.showGridlines
      }
    };
    return ptm(key, rowMetadata);
  };
  var onTogglerClick = function onTogglerClick(event) {
    expanded ? collapse(event) : expand(event);
    event.preventDefault();
    event.stopPropagation();
  };
  var expand = function expand(event) {
    var navigateFocusToChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var expandedKeys = props.expandedKeys ? _objectSpread$4({}, props.expandedKeys) : {};
    expandedKeys[props.node.key] = true;
    props.onToggle({
      originalEvent: event,
      value: expandedKeys,
      navigateFocusToChild: navigateFocusToChild
    });
    invokeToggleEvents(event, true);
  };
  var collapse = function collapse(event) {
    var expandedKeys = _objectSpread$4({}, props.expandedKeys);
    delete expandedKeys[props.node.key];
    props.onToggle({
      originalEvent: event,
      value: expandedKeys
    });
    invokeToggleEvents(event, false);
  };
  var invokeToggleEvents = function invokeToggleEvents(event, expanded) {
    if (expanded) {
      if (props.onExpand) {
        props.onExpand({
          originalEvent: event,
          node: props.node
        });
      }
    } else if (props.onCollapse) {
      props.onCollapse({
        originalEvent: event,
        node: props.node
      });
    }
  };
  var _onClick = function onClick(event) {
    if (props.onRowClick) {
      props.onRowClick(event, props.node);
    }
    nodeTouched.current = false;
  };
  var _onTouchEnd = function onTouchEnd() {
    nodeTouched.current = true;
  };
  var _onMouseEnter = function onMouseEnter(event) {
    if (props.onRowMouseEnter) {
      props.onRowMouseEnter({
        originalEvent: event,
        node: props.node,
        index: props.rowIndex
      });
    }
  };
  var _onMouseLeave = function onMouseLeave(event) {
    if (props.onRowMouseLeave) {
      props.onRowMouseLeave({
        originalEvent: event,
        node: props.node,
        index: props.rowIndex
      });
    }
  };
  var onCheckboxChange = function onCheckboxChange(event) {
    var checked = isChecked();
    var selectionKeys = props.selectionKeys ? _objectSpread$4({}, props.selectionKeys) : {};
    if (checked) {
      if (props.propagateSelectionDown) {
        propagateDown(props.node, false, selectionKeys);
      } else {
        delete selectionKeys[props.node.key];
      }
      if (props.propagateSelectionUp && props.onPropagateUp) {
        props.onPropagateUp({
          originalEvent: event,
          check: false,
          selectionKeys: selectionKeys
        });
      }
      if (props.onUnselect) {
        props.onUnselect({
          originalEvent: event,
          node: props.node
        });
      }
    } else {
      if (props.propagateSelectionDown) {
        propagateDown(props.node, true, selectionKeys);
      } else {
        selectionKeys[props.node.key] = {
          checked: true
        };
      }
      if (props.propagateSelectionUp && props.onPropagateUp) {
        props.onPropagateUp({
          originalEvent: event,
          check: true,
          selectionKeys: selectionKeys
        });
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          node: props.node
        });
      }
    }
    if (props.onSelectionChange) {
      props.onSelectionChange({
        originalEvent: event,
        value: selectionKeys
      });
    }
    utils.DomHandler.clearSelection();
  };
  var propagateUp = function propagateUp(event) {
    var check = event.check;
    var selectionKeys = event.selectionKeys;
    var checkedChildCount = 0;
    var _iterator = _createForOfIteratorHelper$3(props.node.children),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        if (selectionKeys[child.key] && selectionKeys[child.key].checked) {
          checkedChildCount++;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var parentKey = props.node.key;
    var children = utils.ObjectUtils.findChildrenByKey(props.originalOptions, parentKey);
    var isParentPartiallyChecked = children.some(function (ele) {
      return ele.key in selectionKeys;
    });
    var isCompletelyChecked = children.every(function (ele) {
      return ele.key in selectionKeys && selectionKeys[ele.key].checked;
    });
    if (isParentPartiallyChecked && !isCompletelyChecked) {
      selectionKeys[parentKey] = {
        checked: false,
        partialChecked: true
      };
    } else if (isCompletelyChecked) {
      selectionKeys[parentKey] = {
        checked: true,
        partialChecked: false
      };
    } else if (check) {
      selectionKeys[parentKey] = {
        checked: false,
        partialChecked: false
      };
    } else {
      delete selectionKeys[parentKey];
    }
    if (props.propagateSelectionUp && props.onPropagateUp) {
      props.onPropagateUp(event);
    }
  };
  var propagateDown = function propagateDown(node, check, selectionKeys) {
    if (check) {
      selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };
    } else {
      delete selectionKeys[node.key];
    }
    if (node.children && node.children.length) {
      for (var i = 0; i < node.children.length; i++) {
        propagateDown(node.children[i], check, selectionKeys);
      }
    }
  };
  var onRightClick = function onRightClick(event) {
    utils.DomHandler.clearSelection();
    if (props.onContextMenuSelectionChange) {
      props.onContextMenuSelectionChange({
        originalEvent: event,
        value: props.node.key
      });
    }
    if (props.onContextMenu) {
      props.onContextMenu({
        originalEvent: event,
        node: props.node
      });
    }
  };
  var _onKeyDown = function onKeyDown(event, item) {
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'ArrowUp':
        onArrowUpKey(event);
        break;
      case 'ArrowLeft':
        onArrowLeftKey(event);
        break;
      case 'ArrowRight':
        onArrowRightKey(event);
        break;
      case 'Home':
        onHomeKey(event);
        break;
      case 'End':
        onEndKey(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        if (!utils.DomHandler.isClickable(event.target)) {
          onEnterKey(event);
        }
        break;
      case 'Tab':
        onTabKey();
        break;
    }
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    var nextElementSibling = event.currentTarget.nextElementSibling;
    nextElementSibling && focusRowChange(event.currentTarget, nextElementSibling);
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    var previousElementSibling = event.currentTarget.previousElementSibling;
    previousElementSibling && focusRowChange(event.currentTarget, previousElementSibling);
    event.preventDefault();
  };
  var onArrowRightKey = function onArrowRightKey(event) {
    var ishiddenIcon = utils.DomHandler.findSingle(event.currentTarget, 'button').style.visibility === 'hidden';
    utils.DomHandler.findSingle(elementRef.current, '[data-pc-section="rowtoggler"]');
    if (ishiddenIcon) {
      return;
    }
    !expanded && expand(event, true);
    event.preventDefault();
  };
  var onArrowLeftKey = function onArrowLeftKey(event) {
    if (props.level === 0 && !expanded) {
      return;
    }
    var currentTarget = event.currentTarget;
    var ishiddenIcon = utils.DomHandler.findSingle(currentTarget, 'button').style.visibility === 'hidden';
    utils.DomHandler.findSingle(currentTarget, '[data-pc-section="rowtoggler"]');
    if (expanded && !ishiddenIcon) {
      collapse(event);
      return;
    }
    var target = findBeforeClickableNode(currentTarget);
    target && focusRowChange(currentTarget, target);
  };
  var onHomeKey = function onHomeKey(event) {
    var findFirstElement = utils.DomHandler.findSingle(event.currentTarget.parentElement, "tr[aria-level=\"".concat(props.level + 1, "\"]"));
    findFirstElement && utils.DomHandler.focus(findFirstElement);
    event.preventDefault();
  };
  var onEndKey = function onEndKey(event) {
    var nodes = utils.DomHandler.find(event.currentTarget.parentElement, "tr[aria-level=\"".concat(props.level + 1, "\"]"));
    var findFirstElement = nodes[nodes.length - 1];
    utils.DomHandler.focus(findFirstElement);
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    event.preventDefault();
    setTabIndexForSelectionMode(event, nodeTouched.current);
    if (props.selectionMode === 'checkbox') {
      onCheckboxChange(event);
      return;
    }
    props.onRowClick(event, props.node);
    nodeTouched.current = false;
  };
  var onTabKey = function onTabKey() {
    var rows = _toConsumableArray(utils.DomHandler.find(elementRef.current.parentElement, 'tr'));
    var hasSelectedRow = rows.some(function (row) {
      return utils.DomHandler.getAttribute(row, 'data-p-highlight') || row.getAttribute('aria-checked') === 'true';
    });
    rows.forEach(function (row) {
      row.tabIndex = -1;
    });
    if (hasSelectedRow) {
      var selectedNodes = rows.filter(function (node) {
        return utils.DomHandler.getAttribute(node, 'data-p-highlight') || node.getAttribute('aria-checked') === 'true';
      });
      selectedNodes[0].tabIndex = 0;
      return;
    }
    rows[0].tabIndex = 0;
  };
  var focusRowChange = function focusRowChange(firstFocusableRow, currentFocusedRow) {
    firstFocusableRow.tabIndex = '-1';
    currentFocusedRow.tabIndex = '0';
    utils.DomHandler.focus(currentFocusedRow);
  };
  var findBeforeClickableNode = function findBeforeClickableNode(node) {
    var prevNode = node.previousElementSibling;
    if (prevNode) {
      var prevNodeButton = prevNode.querySelector('button');
      if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
        return prevNode;
      }
      return findBeforeClickableNode(prevNode);
    }
    return null;
  };
  var setTabIndexForSelectionMode = function setTabIndexForSelectionMode(event, nodeTouched) {
    if (props.selectionMode !== null) {
      var elements = _toConsumableArray(utils.DomHandler.find(elementRef.current.parentElement, 'tr'));
      event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
      if (elements.every(function (element) {
        return element.tabIndex === -1;
      })) {
        elements[0].tabIndex = 0;
      }
    }
  };
  var isSelected = function isSelected() {
    if (props.selectionMode === 'single' || props.selectionMode === 'multiple' && props.selectionKeys) {
      return props.selectionMode === 'single' ? props.selectionKeys === props.node.key : props.selectionKeys[props.node.key] !== undefined;
    }
    return false;
  };
  var isChecked = function isChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].checked : false;
  };
  var isPartialChecked = function isPartialChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].partialChecked : false;
  };
  var createToggler = function createToggler(column) {
    var label = expanded ? PrimeReact.ariaLabel('collapseLabel') : PrimeReact.ariaLabel('expandLabel');
    var rowTogglerIconProps = mergeProps({
      className: cx('rowTogglerIcon'),
      'aria-hidden': true
    }, getColumnPTOptions(column, 'rowTogglerIcon'));
    var icon = expanded ? /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, rowTogglerIconProps) : /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, rowTogglerIconProps);
    var togglerIcon = utils.IconUtils.getJSXIcon(props.togglerIcon || icon, _objectSpread$4({}, rowTogglerIconProps), {
      props: props
    });
    var rowTogglerProps = mergeProps({
      type: 'button',
      className: cx('rowToggler'),
      onClick: function onClick(e) {
        return onTogglerClick(e);
      },
      tabIndex: -1,
      style: {
        marginLeft: props.level * 16 + 'px',
        visibility: props.node.leaf === false || props.node.children && props.node.children.length ? 'visible' : 'hidden'
      },
      'aria-label': label
    }, getColumnPTOptions(column, 'rowToggler'));
    var content = /*#__PURE__*/React__namespace.createElement("button", rowTogglerProps, togglerIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (props.togglerTemplate) {
      var defaultContentOptions = {
        onClick: onTogglerClick,
        containerClassName: 'p-treetable-toggler p-link',
        iconClassName: 'p-treetable-toggler-icon',
        element: content,
        props: props,
        expanded: expanded,
        buttonStyle: {
          marginLeft: props.level * 16 + 'px',
          visibility: props.node.leaf === false || props.node.children && props.node.children.length ? 'visible' : 'hidden'
        }
      };
      content = utils.ObjectUtils.getJSXElement(props.togglerTemplate, props.node, defaultContentOptions);
    }
    return content;
  };
  var createCheckbox = function createCheckbox(column) {
    if (props.selectionMode === 'checkbox' && props.node.selectable !== false) {
      var checked = isChecked();
      var partialChecked = isPartialChecked();
      var icon = checked ? props.checkboxIcon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, null) : partialChecked ? props.checkboxIcon || /*#__PURE__*/React__namespace.createElement(minus.MinusIcon, null) : null;
      var checkIcon = utils.IconUtils.getJSXIcon(icon, {}, {
        props: props,
        checked: checked,
        partialChecked: partialChecked
      });
      var rowCheckboxProps = mergeProps({
        className: cx('rowCheckbox'),
        checked: checked || partialChecked,
        onChange: onCheckboxChange,
        icon: checkIcon,
        unstyled: isUnstyled === null || isUnstyled === void 0 ? void 0 : isUnstyled(),
        tabIndex: -1,
        'data-p-highlight': checked,
        'data-p-checked': checked,
        'data-p-partialchecked': partialChecked
      }, getColumnCheckboxPTOptions(column, 'rowCheckbox'));
      return /*#__PURE__*/React__namespace.createElement(Checkbox, rowCheckboxProps);
    }
    return null;
  };
  var createCell = function createCell(column, index) {
    var toggler;
    var checkbox;
    if (getColumnProp(column, 'hidden')) {
      return null;
    }
    if (getColumnProp(column, 'expander')) {
      toggler = createToggler(column);
      checkbox = createCheckbox(column);
    }
    return /*#__PURE__*/React__namespace.createElement(TreeTableBodyCell, _extends({
      hostName: props.hostName,
      key: "".concat(getColumnProp(column, 'columnKey') || getColumnProp(column, 'field'), "_").concat(index)
    }, ColumnBase.getCProps(column), {
      index: index,
      column: column,
      selectOnEdit: props.selectOnEdit,
      selected: isSelected(),
      node: props.node,
      rowData: props.node && props.node.data,
      rowIndex: props.rowIndex,
      ptCallbacks: props.ptCallbacks,
      metaData: props.metaData
    }), toggler, checkbox);
  };
  var createChildren = function createChildren() {
    if (expanded && props.node.children) {
      return props.node.children.map(function (childNode, index) {
        return /*#__PURE__*/React__namespace.createElement(TreeTableRow, {
          hostName: props.hostName,
          key: "".concat(childNode.key || JSON.stringify(childNode.data), "_").concat(index),
          level: props.level + 1,
          rowIndex: props.rowIndex + '_' + index,
          node: childNode,
          originalOptions: props.originalOptions,
          checkboxIcon: props.checkboxIcon,
          columns: props.columns,
          expandedKeys: props.expandedKeys,
          selectOnEdit: props.selectOnEdit,
          onToggle: props.onToggle,
          togglerTemplate: props.togglerTemplate,
          onExpand: props.onExpand,
          onCollapse: props.onCollapse,
          selectionMode: props.selectionMode,
          selectionKeys: props.selectionKeys,
          onSelectionChange: props.onSelectionChange,
          metaKeySelection: props.metaKeySelection,
          onRowClick: props.onRowClick,
          onRowMouseEnter: props.onRowMouseEnter,
          onRowMouseLeave: props.onRowMouseLeave,
          onSelect: props.onSelect,
          onUnselect: props.onUnselect,
          propagateSelectionUp: props.propagateSelectionUp,
          propagateSelectionDown: props.propagateSelectionDown,
          onPropagateUp: propagateUp,
          rowClassName: props.rowClassName,
          contextMenuSelectionKey: props.contextMenuSelectionKey,
          onContextMenuSelectionChange: props.onContextMenuSelectionChange,
          onContextMenu: props.onContextMenu,
          ptCallbacks: props.ptCallbacks,
          metaData: props.metaData
        });
      });
    }
    return null;
  };
  var cells = props.columns.map(createCell);
  var children = createChildren();
  var rowClassName = null;
  if (props.rowClassName) {
    rowClassName = props.rowClassName(props.node);
  }
  var rowProps = mergeProps({
    tabIndex: 0,
    className: utils.classNames(cx('row', {
      isSelected: isSelected,
      rowProps: props
    })),
    'aria-expanded': expanded,
    'aria-level': props.level + 1,
    'aria-posinset': props.ariaPosInSet,
    'aria-setsize': props.ariaSetSize,
    'aria-checked': isChecked(),
    'aria-selected': isSelected(),
    style: props.node.style,
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onTouchEnd: function onTouchEnd(e) {
      return _onTouchEnd();
    },
    onContextMenu: function onContextMenu(e) {
      return onRightClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      return _onKeyDown(e);
    },
    onMouseEnter: function onMouseEnter(e) {
      return _onMouseEnter(e);
    },
    onMouseLeave: function onMouseLeave(e) {
      return _onMouseLeave(e);
    },
    'data-p-highlight': isSelected()
  }, getRowPTOptions('row'), {
    className: utils.classNames(rowClassName, props.node.className) // #5983 must be last so all unstyled merging takes place first
  });

  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("tr", _extends({
    ref: elementRef
  }, rowProps), cells), children);
});
TreeTableRow.displayName = 'TreeTableRow';

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeTableBody = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var isSingleSelectionMode = props.selectionMode === 'single';
  var isMultipleSelectionMode = props.selectionMode === 'multiple';
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    cx = _props$ptCallbacks.cx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$3({
      hostName: props.hostName
    }, options));
  };
  var flattenizeTree = function flattenizeTree(nodes) {
    var rows = [];
    nodes = nodes || props.value;
    var _iterator = _createForOfIteratorHelper$2(nodes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        rows.push(node.key);
        if (isExpandedKey(node.key)) {
          rows = rows.concat(flattenizeTree(node.children));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return rows;
  };
  var isExpandedKey = function isExpandedKey(key) {
    return props.expandedKeys && !!props.expandedKeys[key];
  };
  var onRowClick = function onRowClick(event, node) {
    if (props.onRowClick) {
      props.onRowClick({
        originalEvent: event,
        node: node
      });
    }
    var targetNode = event.target.nodeName;
    if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || utils.DomHandler.getAttribute(event.target, 'data-pc-section') === 'columnresizer') {
      return;
    }
    if ((isSingleSelectionMode || isMultipleSelectionMode) && node.selectable !== false) {
      var selectionKeys;
      var selected = isSelected(node);
      var metaSelection = props.metaKeySelection;
      var flatKeys = flattenizeTree();
      var rowIndex = flatKeys.findIndex(function (key) {
        return key === node.key;
      });
      if (isMultipleSelectionMode && event.shiftKey) {
        utils.DomHandler.clearSelection();

        // find first selected row
        var anchorRowIndex = flatKeys.findIndex(function (key) {
          return props.selectionKeys[key];
        });
        var rangeStart = Math.min(rowIndex, anchorRowIndex);
        var rangeEnd = Math.max(rowIndex, anchorRowIndex);
        selectionKeys = _objectSpread$3({}, props.selectionKeys);
        for (var i = rangeStart; i <= rangeEnd; i++) {
          var rowKey = flatKeys[i];
          selectionKeys[rowKey] = true;
        }
      } else {
        //anchorRowIndex = rowIndex;

        if (metaSelection) {
          var metaKey = event.metaKey || event.ctrlKey;
          if (selected && metaKey) {
            if (isSingleSelectionMode) {
              selectionKeys = null;
            } else {
              selectionKeys = _objectSpread$3({}, props.selectionKeys);
              delete selectionKeys[node.key];
            }
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: node
              });
            }
          } else {
            if (isSingleSelectionMode) {
              selectionKeys = node.key;
            } else if (isMultipleSelectionMode) {
              selectionKeys = !metaKey ? {} : props.selectionKeys ? _objectSpread$3({}, props.selectionKeys) : {};
              selectionKeys[node.key] = true;
            }
            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: node
              });
            }
          }
        } else if (isSingleSelectionMode) {
          if (selected) {
            selectionKeys = null;
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: node
              });
            }
          } else {
            selectionKeys = node.key;
            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: node
              });
            }
          }
        } else if (selected) {
          selectionKeys = _objectSpread$3({}, props.selectionKeys);
          delete selectionKeys[node.key];
          if (props.onUnselect) {
            props.onUnselect({
              originalEvent: event,
              node: node
            });
          }
        } else {
          selectionKeys = props.selectionKeys ? _objectSpread$3({}, props.selectionKeys) : {};
          selectionKeys[node.key] = true;
          if (props.onSelect) {
            props.onSelect({
              originalEvent: event,
              node: node
            });
          }
        }
      }
      if (props.onSelectionChange) {
        props.onSelectionChange({
          originalEvent: event,
          value: selectionKeys
        });
      }
    }
  };
  var isSelected = function isSelected(node) {
    if ((isSingleSelectionMode || isMultipleSelectionMode) && props.selectionKeys) {
      return isSingleSelectionMode ? props.selectionKeys === node.key : props.selectionKeys[node.key] !== undefined;
    }
    return false;
  };
  var createRow = function createRow(node, index) {
    return /*#__PURE__*/React__namespace.createElement(TreeTableRow, {
      hostName: props.hostName,
      key: "".concat(node.key || JSON.stringify(node.data), "_").concat(index),
      level: 0,
      rowIndex: index,
      ariaSetSize: props.value.length,
      ariaPosInSet: index + 1,
      selectOnEdit: props.selectOnEdit,
      node: node,
      originalOptions: props.originalOptions,
      checkboxIcon: props.checkboxIcon,
      columns: props.columns,
      expandedKeys: props.expandedKeys,
      onToggle: props.onToggle,
      togglerTemplate: props.togglerTemplate,
      onExpand: props.onExpand,
      onCollapse: props.onCollapse,
      selectionMode: props.selectionMode,
      selectionKeys: props.selectionKeys,
      onSelectionChange: props.onSelectionChange,
      metaKeySelection: props.metaKeySelection,
      onRowClick: onRowClick,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      onSelect: props.onSelect,
      onUnselect: props.onUnselect,
      propagateSelectionUp: props.propagateSelectionUp,
      propagateSelectionDown: props.propagateSelectionDown,
      rowClassName: props.rowClassName,
      contextMenuSelectionKey: props.contextMenuSelectionKey,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onContextMenu: props.onContextMenu,
      ptCallbacks: props.ptCallbacks,
      metaData: props.metaData
    });
  };
  var createRows = function createRows() {
    if (props.paginator && !props.lazy) {
      var rpp = props.rows || 0;
      var startIndex = props.first || 0;
      var endIndex = startIndex + rpp;
      var rows = [];
      for (var i = startIndex; i < endIndex; i++) {
        var rowData = props.value[i];
        if (rowData) {
          rows.push(createRow(props.value[i]));
        } else {
          break;
        }
      }
      return rows;
    }
    return props.value.map(createRow);
  };
  var createEmptyMessage = function createEmptyMessage() {
    if (props.loading) {
      return null;
    }
    var colSpan = props.columns ? props.columns.length : null;
    var content = utils.ObjectUtils.getJSXElement(props.emptyMessage, {
      props: props.tableProps
    }) || PrimeReact.localeOption('emptyMessage');
    var emptyMessageProps = mergeProps({
      className: cx('emptyMessage')
    }, getPTOptions('emptyMessage'));
    var emptyMessageCellProps = mergeProps({
      colSpan: colSpan
    }, getPTOptions('emptyMessageCell'));
    return /*#__PURE__*/React__namespace.createElement("tr", emptyMessageProps, /*#__PURE__*/React__namespace.createElement("td", emptyMessageCellProps, content));
  };
  var content = props.value && props.value.length ? createRows() : createEmptyMessage();
  var tbodyProps = mergeProps({
    role: 'rowgroup',
    className: cx('tbody')
  }, getPTOptions('tbody'));
  return /*#__PURE__*/React__namespace.createElement("tbody", tbodyProps, content);
});
TreeTableBody.displayName = 'TreeTableBody';

var ColumnGroupBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ColumnGroup',
    children: undefined
  },
  getCProp: function getCProp(group, name) {
    return utils.ObjectUtils.getComponentProp(group, name, ColumnGroupBase.defaultProps);
  },
  getCProps: function getCProps(group) {
    return utils.ObjectUtils.getComponentProps(group, ColumnGroupBase.defaultProps);
  }
});

var RowBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Row',
    style: null,
    className: null,
    children: undefined
  },
  getCProp: function getCProp(row, name) {
    return utils.ObjectUtils.getComponentProp(row, name, RowBase.defaultProps);
  }
});

var TreeTableFooter = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var getColumnProps = function getColumnProps(column) {
    return ColumnBase.getCProps(column);
  };
  var getColumnPTOptions = function getColumnPTOptions(column, key) {
    var cProps = getColumnProps(column);
    var columnMetadata = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetadata
    }), ptm("column.".concat(key), columnMetadata), ptmo(cProps, key, columnMetadata));
  };
  var createFooterCell = function createFooterCell(column, index) {
    var footerCellProps = mergeProps({
      key: column.field || index,
      className: getColumnProp(column, 'footerClassName') || getColumnProp(column, 'className'),
      style: getColumnProp(column, 'footerStyle') || getColumnProp(column, 'style'),
      rowSpan: getColumnProp(column, 'rowSpan'),
      colSpan: getColumnProp(column, 'colSpan')
    }, getColumnPTOptions(column, 'footerCell'));
    var content = utils.ObjectUtils.getJSXElement(getColumnProp(column, 'footer'), {
      props: getColumnProps(column)
    });
    return /*#__PURE__*/React__namespace.createElement("td", footerCellProps, content);
  };
  var createFooterRow = function createFooterRow(row, index) {
    var rowColumns = React__namespace.Children.toArray(RowBase.getCProp(row, 'children'));
    var rowFooterCells = rowColumns.map(createFooterCell);
    var footerRowProps = mergeProps(ptm('footerRow', {
      hostName: props.hostName,
      role: 'row'
    }));
    return /*#__PURE__*/React__namespace.createElement("tr", _extends({}, footerRowProps, {
      key: index
    }), rowFooterCells);
  };
  var createColumnGroup = function createColumnGroup() {
    var rows = React__namespace.Children.toArray(ColumnGroupBase.getCProp(props.columnGroup, 'children'));
    return rows.map(createFooterRow);
  };
  var createColumns = function createColumns(columns) {
    if (columns) {
      var headerCells = columns.map(createFooterCell);
      var footerRowProps = mergeProps(ptm('footerRow', {
        hostName: props.hostName
      }));
      return /*#__PURE__*/React__namespace.createElement("tr", footerRowProps, headerCells);
    }
    return null;
  };
  var hasFooter = function hasFooter() {
    return props.columnGroup ? true : props.columns ? props.columns.some(function (col) {
      return col && getColumnProp(col, 'footer');
    }) : false;
  };
  var content = props.columnGroup ? createColumnGroup() : createColumns(props.columns);
  if (hasFooter()) {
    var tfootProps = mergeProps({
      role: 'rowgroup',
      className: cx('tfoot')
    }, ptm('tfoot', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React__namespace.createElement("tfoot", tfootProps, content);
  }
  return null;
});
TreeTableFooter.displayName = 'TreeTableFooter';

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeTableHeader = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var filterTimeout = React__namespace.useRef(null);
  var getColumnProp = function getColumnProp(column) {
    return column ? typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'string' ? ColumnBase.getCProp(column, arguments.length <= 1 ? undefined : arguments[1]) : ColumnBase.getCProp((arguments.length <= 1 ? undefined : arguments[1]) || column, arguments.length <= 2 ? undefined : arguments[2]) : null;
  };
  var getColumnProps = function getColumnProps(column) {
    return ColumnBase.getCProps(column);
  };
  var getColumnPTOptions = function getColumnPTOptions(column, key, params) {
    var cProps = getColumnProps(column);
    var columnMetadata = _objectSpread$2({
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName
    }, params);
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetadata
    }), ptm("column.".concat(key), columnMetadata), ptmo(cProps, key, columnMetadata));
  };
  var onHeaderClick = function onHeaderClick(event, column) {
    if (getColumnProp(column, 'sortable')) {
      var targetNode = event.target;
      if (utils.DomHandler.getAttribute(targetNode, 'data-p-sortable-column') === true || utils.DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headertitle' || utils.DomHandler.getAttribute(targetNode, 'data-pc-section') === 'sorticon' || utils.DomHandler.getAttribute(targetNode.parentElement, 'data-pc-section') === 'sorticon' || targetNode.closest('[data-p-sortable-column="true"]') && !targetNode.closest('[data-pc-section="filtermenubutton"]')) {
        props.onSort({
          originalEvent: event,
          sortField: getColumnProp(column, 'sortField') || getColumnProp(column, 'field'),
          sortFunction: getColumnProp(column, 'sortFunction'),
          sortable: getColumnProp(column, 'sortable')
        });
        utils.DomHandler.clearSelection();
      }
    }
  };
  var onHeaderMouseDown = function onHeaderMouseDown(event, column) {
    if (props.reorderableColumns && getColumnProp(column, 'reorderable')) {
      if (event.target.nodeName !== 'INPUT') {
        event.currentTarget.draggable = true;
      } else if (event.target.nodeName === 'INPUT') {
        event.currentTarget.draggable = false;
      }
    }
  };
  var onHeaderKeyDown = function onHeaderKeyDown(event, column) {
    if (event.key === 'Enter' || event.code === 'Space') {
      onHeaderClick(event, column);
      event.preventDefault();
    }
  };
  var getMultiSortMetaDataIndex = function getMultiSortMetaDataIndex(column) {
    if (props.multiSortMeta) {
      for (var i = 0; i < props.multiSortMeta.length; i++) {
        if (props.multiSortMeta[i].field === getColumnProp(column, 'field')) {
          return i;
        }
      }
    }
    return -1;
  };
  var onResizerMouseDown = function onResizerMouseDown(event, column) {
    if (props.resizableColumns && props.onResizeStart) {
      props.onResizeStart({
        originalEvent: event,
        columnEl: event.target.parentElement,
        column: column
      });
    }
  };
  var _onDragStart = function onDragStart(event, column) {
    if (props.onDragStart) {
      props.onDragStart({
        originalEvent: event,
        column: column
      });
    }
  };
  var _onDragOver = function onDragOver(event, column) {
    if (props.onDragOver) {
      props.onDragOver({
        originalEvent: event,
        column: column
      });
    }
  };
  var _onDragLeave = function onDragLeave(event, column) {
    if (props.onDragLeave) {
      props.onDragLeave({
        originalEvent: event,
        column: column
      });
    }
  };
  var _onDrop = function onDrop(event, column) {
    if (props.onDrop) {
      props.onDrop({
        originalEvent: event,
        column: column
      });
    }
  };
  var onFilterInput = function onFilterInput(e, column) {
    if (getColumnProp(column, 'filter') && props.onFilter) {
      if (filterTimeout.current) {
        clearTimeout(filterTimeout.current);
      }
      var filterValue = e.target.value;
      filterTimeout.current = setTimeout(function () {
        props.onFilter({
          value: filterValue,
          field: getColumnProp(column, 'field'),
          matchMode: getColumnProp(column, 'filterMatchMode') || 'startsWith'
        });
        filterTimeout.current = null;
      }, props.filterDelay);
    }
  };
  var hasColumnFilter = function hasColumnFilter(columns) {
    if (columns) {
      var _iterator = _createForOfIteratorHelper$1(columns),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var col = _step.value;
          if (getColumnProp(col, 'filter')) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return false;
  };
  var getAriaSort = function getAriaSort(column, sorted, sortOrder) {
    if (getColumnProp(column, 'sortable')) {
      if (sorted && sortOrder < 0) {
        return 'descending';
      } else if (sorted && sortOrder > 0) {
        return 'ascending';
      }
      return 'none';
    }
    return null;
  };
  var createSortIcon = function createSortIcon(column, sorted, sortOrder) {
    if (getColumnProp(column, 'sortable')) {
      var sortIconProps = mergeProps({
        className: cx('sortIcon')
      }, getColumnPTOptions(column, 'sortIcon', {
        context: {
          sorted: sorted
        }
      }));
      var icon = sorted ? sortOrder < 0 ? /*#__PURE__*/React__namespace.createElement(sortamountdown.SortAmountDownIcon, sortIconProps) : /*#__PURE__*/React__namespace.createElement(sortamountupalt.SortAmountUpAltIcon, sortIconProps) : /*#__PURE__*/React__namespace.createElement(sortalt.SortAltIcon, sortIconProps);
      var sortIcon = utils.IconUtils.getJSXIcon(props.sortIcon || icon, _objectSpread$2({}, sortIconProps), {
        props: props,
        sorted: sorted,
        sortOrder: sortOrder
      });
      return sortIcon;
    }
    return null;
  };
  var createResizer = function createResizer(column) {
    if (props.resizableColumns) {
      var columnResizerProps = mergeProps({
        className: cx('columnResizer'),
        onMouseDown: function onMouseDown(e) {
          return onResizerMouseDown(e, column);
        }
      }, getColumnPTOptions(column, 'columnResizer'));
      return /*#__PURE__*/React__namespace.createElement("span", columnResizerProps);
    }
    return null;
  };
  var createSortBadge = function createSortBadge(column, sortMetaDataIndex) {
    if (sortMetaDataIndex !== -1 && props.multiSortMeta && props.multiSortMeta.length > 1) {
      var sortBadgeProps = mergeProps({
        className: cx('sortBadge')
      }, getColumnPTOptions(column, 'sortBadge'));
      return /*#__PURE__*/React__namespace.createElement("span", sortBadgeProps, sortMetaDataIndex + 1);
    }
    return null;
  };
  var createTitle = function createTitle(column, options) {
    var title = utils.ObjectUtils.getJSXElement(getColumnProp(column, 'header'), {
      props: options
    });
    var headerTitleProps = mergeProps({
      className: cx('headerTitle')
    }, getColumnPTOptions(column, 'headerTitle'));
    return /*#__PURE__*/React__namespace.createElement("span", headerTitleProps, title);
  };
  var createHeaderCell = function createHeaderCell(column, options) {
    var filterElement;
    if (getColumnProp(column, 'hidden')) {
      return null;
    }
    if (getColumnProp(column, 'filter') && options.renderFilter) {
      filterElement = getColumnProp(column, 'filterElement') || /*#__PURE__*/React__namespace.createElement(inputtext.InputText, {
        onInput: function onInput(e) {
          return onFilterInput(e, column);
        },
        type: props.filterType,
        defaultValue: props.filters && props.filters[getColumnProp(column, 'field')] ? props.filters[getColumnProp(column, 'field')].value : null,
        className: "p-column-filter",
        placeholder: getColumnProp(column, 'filterPlaceholder'),
        maxLength: getColumnProp(column, 'filterMaxLength'),
        pt: getColumnPTOptions(column, 'filterInput'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: props.metaData
        }
      });
    }
    if (options.filterOnly) {
      var _frozen = getColumnProp(column, 'frozen');
      var _headerCellProps = mergeProps({
        role: 'columnheader',
        key: getColumnProp(column, 'columnKey') || getColumnProp(column, 'field') || options.index,
        className: utils.classNames(cx('headerCell', {
          options: options,
          frozen: _frozen
        }), getColumnProp(column, 'filterHeaderClassName')),
        style: getColumnProp(column, 'filterHeaderStyle') || getColumnProp(column, 'style'),
        rowSpan: getColumnProp(column, 'rowSpan'),
        colSpan: getColumnProp(column, 'colSpan'),
        'data-p-sortable-column': getColumnProp(column, 'sortable'),
        'data-p-resizable-column': props.resizableColumns,
        'data-p-frozen-column': _frozen
      }, getColumnPTOptions(column, 'root'), getColumnPTOptions(column, 'headerCell', {
        context: {
          frozen: _frozen
        }
      }));
      return /*#__PURE__*/React__namespace.createElement("th", _headerCellProps, filterElement);
    }
    var headerCellRef = /*#__PURE__*/React__namespace.createRef(null);
    var sortMetaDataIndex = getMultiSortMetaDataIndex(column);
    var multiSortMetaData = sortMetaDataIndex !== -1 ? props.multiSortMeta[sortMetaDataIndex] : null;
    var singleSorted = getColumnProp(column, 'field') === props.sortField;
    var multipleSorted = multiSortMetaData !== null;
    var sorted = getColumnProp(column, 'sortable') && (singleSorted || multipleSorted);
    var frozen = getColumnProp(column, 'frozen');
    var align = getColumnProp(column, 'alignHeader');
    var sortOrder = 0;
    if (singleSorted) {
      sortOrder = props.sortOrder;
    } else if (multipleSorted) {
      sortOrder = multiSortMetaData.order;
    }
    var sortIconElement = createSortIcon(column, sorted, sortOrder);
    var ariaSortData = getAriaSort(column, sorted, sortOrder);
    var sortBadge = createSortBadge(column, sortMetaDataIndex);
    var ariaSort = sorted ? sortOrder ? sortOrder < 0 ? 'descending' : 'ascending' : 'none' : null;
    var headerTooltip = getColumnProp(column, 'headerTooltip');
    var hasTooltip = utils.ObjectUtils.isNotEmpty(headerTooltip);
    var title = createTitle(column, options);
    var resizer = createResizer(column);
    var sortable = getColumnProp(column, 'sortable');
    var headerCellProps = mergeProps(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      role: 'columnheader',
      className: utils.classNames(getColumnProp(column, 'headerClassName') || getColumnProp(column, 'className'), cx('headerCell', {
        headerProps: props,
        frozen: frozen,
        column: column,
        options: options,
        getColumnProp: getColumnProp,
        sorted: sorted,
        align: align
      })),
      style: getColumnProp(column, 'headerStyle') || getColumnProp(column, 'style'),
      tabIndex: sortable ? props.tabIndex : null,
      'aria-sort': ariaSort,
      onClick: function onClick(e) {
        return onHeaderClick(e, column);
      },
      onMouseDown: function onMouseDown(e) {
        return onHeaderMouseDown(e, column);
      },
      onKeyDown: function onKeyDown(e) {
        return onHeaderKeyDown(e, column);
      },
      rowSpan: getColumnProp(column, 'rowSpan'),
      colSpan: getColumnProp(column, 'colSpan')
    }, "aria-sort", ariaSortData), "onDragStart", function onDragStart(e) {
      return _onDragStart(e, column);
    }), "onDragOver", function onDragOver(e) {
      return _onDragOver(e, column);
    }), "onDragLeave", function onDragLeave(e) {
      return _onDragLeave(e, column);
    }), "onDrop", function onDrop(e) {
      return _onDrop(e, column);
    }), 'data-p-sortable-column', sortable), 'data-p-resizable-column', props.resizableColumns), 'data-p-highlight', sorted), 'data-p-frozen-column', getColumnProp(column, 'frozen')), getColumnPTOptions(column, 'root'), getColumnPTOptions(column, 'headerCell', {
      context: {
        sorted: sorted,
        frozen: frozen,
        resizable: props.resizableColumns
      }
    }));
    var headerContentProps = mergeProps({
      className: cx('headerContent')
    }, getColumnPTOptions(column, 'headerContent'));
    var header = /*#__PURE__*/React__namespace.createElement("div", headerContentProps, title, sortIconElement, sortBadge, filterElement);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
      key: column.columnKey || column.field || options.index
    }, /*#__PURE__*/React__namespace.createElement("th", _extends({
      ref: headerCellRef
    }, headerCellProps), resizer, header), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: headerCellRef,
      content: headerTooltip
    }, getColumnProp(column, 'headerTooltipOptions'), {
      unstyled: props.unstyled
    })));
  };
  var createHeaderRow = function createHeaderRow(row, index) {
    var rowColumns = React__namespace.Children.toArray(RowBase.getCProp(row, 'children'));
    var rowHeaderCells = rowColumns.map(function (col, i) {
      return createHeaderCell(col, {
        index: i,
        filterOnly: false,
        renderFilter: true
      });
    });
    var headerRowProps = mergeProps(ptm('headerRow', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React__namespace.createElement("tr", _extends({
      role: "row"
    }, headerRowProps, {
      key: index
    }), rowHeaderCells);
  };
  var createColumnGroup = function createColumnGroup() {
    var rows = React__namespace.Children.toArray(ColumnGroupBase.getCProp(props.columnGroup, 'children'));
    return rows.map(createHeaderRow);
  };
  var createColumns = function createColumns(columns) {
    if (columns) {
      var headerRowProps = mergeProps(ptm('headerRow', {
        hostName: props.hostName,
        role: 'row'
      }));
      if (hasColumnFilter(columns)) {
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("tr", headerRowProps, columns.map(function (col, i) {
          return createHeaderCell(col, {
            index: i,
            filterOnly: false,
            renderFilter: false
          });
        })), /*#__PURE__*/React__namespace.createElement("tr", headerRowProps, columns.map(function (col, i) {
          return createHeaderCell(col, {
            index: i,
            filterOnly: true,
            renderFilter: true
          });
        })));
      }
      return /*#__PURE__*/React__namespace.createElement("tr", _extends({
        role: "row"
      }, headerRowProps), columns.map(function (col, i) {
        return createHeaderCell(col, {
          index: i,
          filterOnly: false,
          renderFilter: false
        });
      }));
    }
    return null;
  };
  var content = props.columnGroup ? createColumnGroup() : createColumns(props.columns);
  var theadProps = mergeProps({
    role: 'rowgroup',
    className: cx('thead')
  }, ptm('thead', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React__namespace.createElement("thead", theadProps, content);
});
TreeTableHeader.displayName = 'TreeTableHeader';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeTableScrollableView = /*#__PURE__*/React__namespace.memo(function (props) {
  var elementRef = React__namespace.useRef(null);
  var scrollHeaderRef = React__namespace.useRef(null);
  var scrollHeaderBoxRef = React__namespace.useRef(null);
  var scrollBodyRef = React__namespace.useRef(null);
  var scrollTableRef = React__namespace.useRef(null);
  var scrollFooterRef = React__namespace.useRef(null);
  var scrollFooterBoxRef = React__namespace.useRef(null);
  var mergeProps = hooks.useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    cx = _props$ptCallbacks.cx,
    sx = _props$ptCallbacks.sx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var setScrollHeight = function setScrollHeight() {
    if (props.scrollHeight) {
      if (props.scrollHeight.indexOf('%') !== -1) {
        var datatableContainer = findDataTableContainer(elementRef.current);
        scrollBodyRef.current.style.visibility = 'hidden';
        scrollBodyRef.current.style.height = '100px'; //temporary height to calculate static height
        var containerHeight = utils.DomHandler.getOuterHeight(datatableContainer);
        var relativeHeight = utils.DomHandler.getOuterHeight(datatableContainer.parentElement) * parseInt(props.scrollHeight, 10) / 100;
        var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
        var scrollBodyHeight = relativeHeight - staticHeight;
        scrollBodyRef.current.style.height = 'auto';
        scrollBodyRef.current.style.maxHeight = scrollBodyHeight + 'px';
        scrollBodyRef.current.style.visibility = 'visible';
      } else {
        scrollBodyRef.current.style.maxHeight = props.scrollHeight;
      }
    }
  };
  var findDataTableContainer = function findDataTableContainer(element) {
    if (element) {
      var el = element;
      while (el && !(utils.DomHandler.getAttribute(el, 'data-pc-section') === 'root' || utils.DomHandler.getAttribute(el, 'data-pc-name') === 'treetable')) {
        el = el.parentElement;
      }
      return el;
    }
    return null;
  };
  var onHeaderScroll = function onHeaderScroll() {
    scrollHeaderRef.current.scrollLeft = 0;
  };
  var onBodyScroll = function onBodyScroll() {
    var frozenView = elementRef.current.previousElementSibling;
    var frozenScrollBody;
    if (frozenView) {
      frozenScrollBody = utils.DomHandler.findSingle(frozenView, '[data-pc-section="scrollablebody"]');
    }
    scrollHeaderBoxRef.current.style.transform = "translateX(-".concat(scrollBodyRef.current.scrollLeft, "px)");
    if (scrollFooterBoxRef.current) {
      scrollFooterBoxRef.current.style.transform = "translateX(-".concat(scrollBodyRef.current.scrollLeft, "px)");
    }
    if (frozenScrollBody) {
      frozenScrollBody.scrollTop = scrollBodyRef.current.scrollTop;
    }
  };
  hooks.useMountEffect(function () {
    var el = utils.DomHandler.find(findDataTableContainer(elementRef.current), '[data-pc-section="scrollablebody"]');
    el = el.length > 1 ? el[1] : el[0];
    var scrollBarWidth = utils.DomHandler.calculateScrollbarWidth(el);
    if (!props.frozen) {
      var _scrollBarWidth = utils.DomHandler.calculateScrollbarWidth();
      scrollHeaderBoxRef.current.style.marginRight = _scrollBarWidth + 'px';
      if (scrollFooterBoxRef.current) {
        scrollFooterBoxRef.current.style.marginRight = _scrollBarWidth + 'px';
      }
    } else {
      scrollBodyRef.current.style.paddingBottom = scrollBarWidth + 'px';
    }
  });
  React__namespace.useEffect(function () {
    setScrollHeight();
  });
  var createColGroup = function createColGroup() {
    if (utils.ObjectUtils.isNotEmpty(props.columns)) {
      var cols = props.columns.map(function (col, i) {
        return /*#__PURE__*/React__namespace.createElement("col", {
          key: col.field + '_' + i
        });
      });
      var scrollableColgroupProps = mergeProps({
        className: cx('scrollableColgroup')
      }, getPTOptions('scrollableColgroup'));
      return /*#__PURE__*/React__namespace.createElement("colgroup", scrollableColgroupProps, cols);
    }
    return null;
  };
  var width = props.frozen ? props.frozenWidth : 'calc(100% - ' + props.frozenWidth + ')';
  var left = props.frozen ? null : props.frozenWidth;
  var colGroup = createColGroup();
  var scrollableProps = mergeProps({
    className: cx('scrollable', {
      scrolaableProps: props
    }),
    style: {
      width: width,
      left: left
    }
  }, getPTOptions('scrollable'));
  var scrollableHeaderProps = mergeProps({
    className: cx('scrollableHeader'),
    onScroll: function onScroll(e) {
      return onHeaderScroll();
    }
  }, getPTOptions('scrollableHeader'));
  var scrollableHeaderBoxProps = mergeProps({
    className: cx('scrollableHeaderBox')
  }, getPTOptions('scrollableHeaderBox'));
  var scrollableHeaderTableProps = mergeProps({
    className: cx('scrollableHeaderTable')
  }, getPTOptions('scrollableHeaderTable'));
  var scrollableBodyProps = mergeProps({
    className: cx('scrollableBody'),
    style: !props.frozen && props.scrollHeight ? {
      overflowY: 'scroll'
    } : undefined,
    onScroll: function onScroll(e) {
      return onBodyScroll();
    }
  }, getPTOptions('scrollableBody'));
  var scrollableBodyTableProps = mergeProps({
    style: {
      top: '0'
    },
    className: cx('scrollableBodyTable')
  }, getPTOptions('scrollableBodyTable'));
  var scrollableFooterProps = mergeProps({
    className: cx('scrollableFooter')
  }, getPTOptions('scrollableFooter'));
  var scrollableFooterBoxProps = mergeProps({
    className: sx('scrollableFooterBox')
  }, getPTOptions('scrollableFooterBox'));
  var scrollableFooterTableProps = mergeProps({
    className: cx('scrollableFooterTable')
  }, getPTOptions('scrollableFooterTable'));
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, scrollableProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: scrollHeaderRef
  }, scrollableHeaderProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: scrollHeaderBoxRef
  }, scrollableHeaderBoxProps), /*#__PURE__*/React__namespace.createElement("table", scrollableHeaderTableProps, colGroup, props.header))), /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: scrollBodyRef
  }, scrollableBodyProps), /*#__PURE__*/React__namespace.createElement("table", _extends({
    ref: scrollTableRef
  }, scrollableBodyTableProps), colGroup, props.body)), /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: scrollFooterRef
  }, scrollableFooterProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: scrollFooterBoxRef
  }, scrollableFooterBoxProps), /*#__PURE__*/React__namespace.createElement("table", scrollableFooterTableProps, colGroup, props.footer))));
});
TreeTableScrollableView.displayName = 'TreeTableScrollableView';

var getStorage = function getStorage(stateStorageProp) {
  switch (stateStorageProp) {
    case 'local':
      return window.localStorage;
    case 'session':
      return window.sessionStorage;
    case 'custom':
      return null;
    default:
      throw new Error(stateStorageProp + ' is not a valid value for the state storage, supported values are "local", "session" and "custom".');
  }
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var TreeTable = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = TreeTableBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.expandedKeys),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    expandedKeysState = _React$useState2[0],
    setExpandedKeysState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(props.first),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    firstState = _React$useState4[0],
    setFirstState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(props.rows),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    rowsState = _React$useState6[0],
    setRowsState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(props.sortField),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    sortFieldState = _React$useState8[0],
    setSortFieldState = _React$useState8[1];
  var _React$useState9 = React__namespace.useState(props.sortOrder),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    sortOrderState = _React$useState10[0],
    setSortOrderState = _React$useState10[1];
  var _React$useState11 = React__namespace.useState(props.multiSortMeta),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    multiSortMetaState = _React$useState12[0],
    setMultiSortMetaState = _React$useState12[1];
  var _React$useState13 = React__namespace.useState(props.filters),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    filtersState = _React$useState14[0],
    setFiltersState = _React$useState14[1];
  var _React$useState15 = React__namespace.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    columnOrderState = _React$useState16[0],
    setColumnOrderState = _React$useState16[1];
  var metaData = {
    props: props,
    state: {
      expandedKeys: expandedKeysState,
      first: firstState,
      rows: rowsState,
      sortField: sortFieldState,
      sortOrder: sortOrderState,
      multiSortMeta: multiSortMetaState,
      filters: filtersState,
      columnOrder: columnOrderState
    },
    context: {
      scrollable: props.scrollable
    }
  };
  var ptCallbacks = TreeTableBase.setMetaData(metaData);
  componentbase.useHandleStyle(TreeTableBase.css.styles, ptCallbacks.isUnstyled, {
    name: 'treetable'
  });
  var elementRef = React__namespace.useRef(null);
  var tableRef = React__namespace.useRef(null);
  var resizerHelperRef = React__namespace.useRef(null);
  var reorderIndicatorUpRef = React__namespace.useRef(null);
  var reorderIndicatorDownRef = React__namespace.useRef(null);
  var columnResizing = React__namespace.useRef(null);
  var resizeColumn = React__namespace.useRef(null);
  var resizeColumnProps = React__namespace.useRef(null);
  var lastResizerHelperX = React__namespace.useRef(0);
  var iconWidth = React__namespace.useRef(0);
  var iconHeight = React__namespace.useRef(0);
  var draggedColumnEl = React__namespace.useRef(null);
  var draggedColumn = React__namespace.useRef(null);
  var dropPosition = React__namespace.useRef(null);
  var columnSortable = React__namespace.useRef(null);
  var columnSortFunction = React__namespace.useRef(null);
  var columnField = React__namespace.useRef(null);
  var childFocusEvent = React__namespace.useRef(null);
  var _useEventListener = hooks.useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        if (columnResizing.current) {
          onColumnResize(event);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = hooks.useEventListener({
      type: 'mouseup',
      listener: function listener(event) {
        if (columnResizing.current) {
          columnResizing.current = false;
          onColumnResizeEnd();
        }
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var isCustomStateStorage = function isCustomStateStorage() {
    return props.stateStorage === 'custom';
  };
  var isStateful = function isStateful() {
    return props.stateKey != null || isCustomStateStorage();
  };
  var saveState = function saveState() {
    var state = {};
    if (props.paginator) {
      state.first = getFirst();
      state.rows = getRows();
    }
    var sortField = getSortField();
    if (sortField) {
      state.sortField = sortField;
      state.sortOrder = getSortOrder();
    }
    var multiSortMeta = getMultiSortMeta();
    if (multiSortMeta) {
      state.multiSortMeta = multiSortMeta;
    }
    if (hasFilter()) {
      state.filters = getFilters();
    }
    if (props.reorderableColumns) {
      state.columnOrder = columnOrderState;
    }
    state.expandedKeysState = expandedKeysState;
    if (props.selectionKeys && props.onSelectionChange) {
      state.selectionKeys = props.selectionKeys;
    }
    if (isCustomStateStorage()) {
      if (props.customSaveState) {
        props.customSaveState(state);
      }
    } else {
      var storage = getStorage(props.stateStorage);
      if (utils.ObjectUtils.isNotEmpty(state)) {
        storage.setItem(props.stateKey, JSON.stringify(state));
      }
    }
    if (props.onStateSave) {
      props.onStateSave(state);
    }
  };
  var clearState = function clearState() {
    var storage = getStorage(props.stateStorage);
    if (storage && props.stateKey) {
      storage.removeItem(props.stateKey);
    }
  };
  var restoreState = function restoreState() {
    var restoredState = {};
    if (isCustomStateStorage()) {
      if (props.customRestoreState) {
        restoredState = props.customRestoreState();
      }
    } else {
      var storage = getStorage(props.stateStorage);
      var stateString = storage.getItem(props.stateKey);
      var dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
      var reviver = function reviver(key, value) {
        return typeof value === 'string' && dateFormat.test(value) ? new Date(value) : value;
      };
      if (stateString) {
        restoredState = JSON.parse(stateString, reviver);
      }
    }
    _restoreState(restoredState);
  };
  var restoreTableState = function restoreTableState(restoredState) {
    _restoreState(restoredState);
  };
  var _restoreState = function _restoreState() {
    var restoredState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (utils.ObjectUtils.isNotEmpty(restoredState)) {
      if (props.paginator) {
        if (props.onPage) {
          var getOnPageParams = function getOnPageParams(first, rows) {
            var totalRecords = getTotalRecords(processedData());
            var pageCount = Math.ceil(totalRecords / rows) || 1;
            var page = Math.floor(first / rows);
            return {
              first: first,
              rows: rows,
              page: page,
              pageCount: pageCount
            };
          };
          props.onPage(createEvent(getOnPageParams(restoredState.first, restoredState.rows)));
        } else {
          setFirstState(restoredState.first);
          setRowsState(restoredState.rows);
        }
      }
      if (restoredState.sortField) {
        if (props.onSort) {
          props.onSort(createEvent({
            sortField: restoredState.sortField,
            sortOrder: restoredState.sortOrder
          }));
        } else {
          setSortFieldState(restoredState.sortField);
          setSortOrderState(restoredState.sortOrder);
        }
      }
      if (restoredState.multiSortMeta) {
        if (props.onSort) {
          props.onSort(createEvent({
            multiSortMeta: restoredState.multiSortMeta
          }));
        } else {
          setMultiSortMetaState(restoredState.multiSortMeta);
        }
      }
      if (restoredState.filters) {
        if (props.onFilter) {
          props.onFilter(createEvent({
            filters: restoredState.filters
          }));
        } else {
          setFiltersState(cloneFilters(restoredState.filters));
        }
      }
      if (props.reorderableColumns) {
        setColumnOrderState(restoredState.columnOrder);
      }
      if (restoredState.expandedKeysState) {
        if (props.onToggle) {
          props.onRowToggle({
            data: restoredState.expandedKeysState
          });
        } else {
          setExpandedKeysState(restoredState.expandedKeysState);
        }
      }
      if (restoredState.selectionKeys && props.onSelectionChange) {
        props.onSelectionChange({
          value: restoredState.selectionKeys
        });
      }
      if (props.onStateRestore) {
        props.onStateRestore(restoredState);
      }
    }
  };
  var onToggle = function onToggle(event) {
    var originalEvent = event.originalEvent,
      value = event.value,
      navigateFocusToChild = event.navigateFocusToChild;
    if (props.onToggle) {
      props.onToggle({
        originalEvent: originalEvent,
        value: value
      });
    } else {
      if (navigateFocusToChild) {
        childFocusEvent.current = originalEvent;
      }
      setExpandedKeysState(value);
    }
  };
  var onPageChange = function onPageChange(event) {
    if (props.onPage) {
      props.onPage(event);
    } else {
      setFirstState(event.first);
      setRowsState(event.rows);
    }
    if (props.onValueChange) {
      props.onValueChange(processedData());
    }
  };
  var onSort = function onSort(event) {
    var sortField = event.sortField;
    var sortOrder = props.defaultSortOrder;
    var multiSortMeta;
    var eventMeta;
    columnSortable.current = event.sortable;
    columnSortFunction.current = event.sortFunction;
    columnField.current = event.sortField;
    if (props.sortMode === 'multiple') {
      var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
      multiSortMeta = _toConsumableArray(getMultiSortMeta());
      if (multiSortMeta && multiSortMeta instanceof Array) {
        var sortMeta = multiSortMeta.find(function (sortMeta) {
          return sortMeta.field === sortField;
        });
        sortOrder = sortMeta ? getCalculatedSortOrder(sortMeta.order) : sortOrder;
      }
      var newMetaData = {
        field: sortField,
        order: sortOrder
      };
      if (sortOrder) {
        if (!multiSortMeta || !metaKey) {
          multiSortMeta = [];
        }
        addSortMeta(newMetaData, multiSortMeta);
      } else if (props.removableSort && multiSortMeta) {
        removeSortMeta(newMetaData, multiSortMeta);
      }
      eventMeta = {
        multiSortMeta: multiSortMeta
      };
    } else {
      sortOrder = getSortField() === sortField ? getCalculatedSortOrder(getSortOrder()) : sortOrder;
      if (props.removableSort) {
        sortField = sortOrder ? sortField : null;
      }
      eventMeta = {
        sortField: sortField,
        sortOrder: sortOrder
      };
    }
    if (props.onSort) {
      props.onSort(eventMeta);
    } else {
      setFirstState(0);
      setSortFieldState(eventMeta.sortField);
      setSortOrderState(eventMeta.sortOrder);
      setMultiSortMetaState(eventMeta.multiSortMeta);
    }
    if (props.onValueChange) {
      props.onValueChange(processedData({
        sortField: sortField,
        sortOrder: sortOrder,
        multiSortMeta: multiSortMeta
      }));
    }
  };
  var getCalculatedSortOrder = function getCalculatedSortOrder(currentOrder) {
    return props.removableSort ? props.defaultSortOrder === currentOrder ? currentOrder * -1 : 0 : currentOrder * -1;
  };
  var addSortMeta = function addSortMeta(meta, multiSortMeta) {
    var index = -1;
    for (var i = 0; i < multiSortMeta.length; i++) {
      if (multiSortMeta[i].field === meta.field) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      multiSortMeta[index] = meta;
    } else {
      multiSortMeta.push(meta);
    }
  };
  var removeSortMeta = function removeSortMeta(meta, multiSortMeta) {
    var index = -1;
    for (var i = 0; i < multiSortMeta.length; i++) {
      if (multiSortMeta[i].field === meta.field) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      multiSortMeta.splice(index, 1);
    }
    multiSortMeta = multiSortMeta.length > 0 ? multiSortMeta : null;
  };
  var sortSingle = function sortSingle(data) {
    return sortNodes(data);
  };
  var sortNodes = function sortNodes(data) {
    var value = _toConsumableArray(data);
    if (columnSortable.current && columnSortFunction.current) {
      value = columnSortFunction.current({
        data: data,
        field: getSortField(),
        order: getSortOrder()
      });
    } else {
      // performance optimization to prevent resolving field data in each loop
      var lookupMap = new Map();
      var sortField = getSortField();
      var comparator = utils.ObjectUtils.localeComparator(context && context.locale || PrimeReact__default["default"].locale);
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          lookupMap.set(node.data, utils.ObjectUtils.resolveFieldData(node.data, sortField));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      value.sort(function (node1, node2) {
        var value1 = lookupMap.get(node1.data);
        var value2 = lookupMap.get(node2.data);
        return compareValuesOnSort(value1, value2, comparator, getSortOrder());
      });
      for (var i = 0; i < value.length; i++) {
        if (value[i].children && value[i].children.length) {
          value[i].children = sortNodes(value[i].children);
        }
      }
    }
    return value;
  };
  var sortMultiple = function sortMultiple(data) {
    var multiSortMeta = getMultiSortMeta();
    if (multiSortMeta) {
      return sortMultipleNodes(data, multiSortMeta);
    }
    return data;
  };
  var sortMultipleNodes = function sortMultipleNodes(data, multiSortMeta) {
    var value = _toConsumableArray(data);
    var comparator = utils.ObjectUtils.localeComparator(context && context.locale || PrimeReact__default["default"].locale);
    value.sort(function (node1, node2) {
      return multisortField(node1, node2, multiSortMeta, 0, comparator);
    });
    for (var i = 0; i < value.length; i++) {
      if (value[i].children && value[i].children.length) {
        value[i].children = sortMultipleNodes(value[i].children, multiSortMeta);
      }
    }
    return value;
  };
  var multisortField = function multisortField(node1, node2, multiSortMeta, index, comparator) {
    if (!multiSortMeta || !multiSortMeta[index]) {
      return;
    }
    var value1 = utils.ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
    var value2 = utils.ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);

    // check if they are equal handling dates and locales
    if (utils.ObjectUtils.compare(value1, value2, comparator) === 0) {
      return multiSortMeta.length - 1 > index ? multisortField(node1, node2, multiSortMeta, index + 1, comparator) : 0;
    }
    return compareValuesOnSort(value1, value2, comparator, multiSortMeta[index].order);
  };
  var compareValuesOnSort = function compareValuesOnSort(value1, value2, comparator, order) {
    return utils.ObjectUtils.sort(value1, value2, order, comparator, context && context.nullSortOrder || PrimeReact__default["default"].nullSortOrder);
  };
  var filter = function filter(value, field, mode) {
    onFilter({
      value: value,
      field: field,
      matchMode: mode
    });
  };
  var onFilter = function onFilter(event) {
    var filters = getFilters();
    var newFilters = filters ? _objectSpread({}, filters) : {};
    if (!isFilterBlank(event.value)) {
      newFilters[event.field] = {
        value: event.value,
        matchMode: event.matchMode
      };
    } else if (newFilters[event.field]) {
      delete newFilters[event.field];
    }
    if (props.onFilter) {
      props.onFilter({
        filters: newFilters
      });
    } else {
      setFirstState(0);
      setFiltersState(newFilters);
    }
    if (props.onValueChange) {
      props.onValueChange(processedData({
        filters: filters
      }));
    }
  };
  var cloneFilters = function cloneFilters(filters) {
    filters = filters || props.filters;
    var cloned = {};
    if (filters) {
      Object.entries(filters).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          prop = _ref2[0],
          value = _ref2[1];
        cloned[prop] = value;
      });
    } else {
      var columns = getColumns();
      cloned = columns.reduce(function (filters, col) {
        var field = getColumnProp(col, 'filterField') || getColumnProp(col, 'field');
        var filterFunction = getColumnProp(col, 'filterFunction');
        var dataType = getColumnProp(col, 'dataType');
        var matchMode = getColumnProp(col, 'filterMatchMode') || (context && context.filterMatchModeOptions[dataType] || PrimeReact__default["default"].filterMatchModeOptions[dataType] ? context && context.filterMatchModeOptions[dataType][0] || PrimeReact__default["default"].filterMatchModeOptions[dataType][0] : PrimeReact.FilterMatchMode.STARTS_WITH);
        var constraint = {
          value: null,
          matchMode: matchMode
        };
        if (filterFunction) {
          PrimeReact.FilterService.register("custom_".concat(field), function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return filterFunction.apply(void 0, args.concat([{
              column: col
            }]));
          });
        }
        filters[field] = constraint;
        return filters;
      }, {});
    }
    return cloned;
  };
  var hasFilter = function hasFilter() {
    return utils.ObjectUtils.isNotEmpty(getFilters());
  };
  var isFilterBlank = function isFilterBlank(filter) {
    if (filter !== null && filter !== undefined) {
      if (typeof filter === 'string' && filter.trim().length === 0 || filter instanceof Array && filter.length === 0) {
        return true;
      }
      return false;
    }
    return true;
  };
  var onColumnResizeStart = function onColumnResizeStart(event) {
    var containerLeft = utils.DomHandler.getOffset(elementRef.current).left;
    resizeColumn.current = event.columnEl;
    resizeColumnProps.current = event.column;
    columnResizing.current = true;
    lastResizerHelperX.current = event.originalEvent.pageX - containerLeft + elementRef.current.scrollLeft;
    bindColumnResizeEvents();
  };
  var onColumnResize = function onColumnResize(event) {
    var containerLeft = utils.DomHandler.getOffset(elementRef.current).left;
    !ptCallbacks.isUnstyled() && utils.DomHandler.addClass(elementRef.current, 'p-unselectable-text');
    resizerHelperRef.current.style.height = elementRef.current.offsetHeight + 'px';
    resizerHelperRef.current.style.top = 0 + 'px';
    resizerHelperRef.current.style.left = event.pageX - containerLeft + elementRef.current.scrollLeft + 'px';
    resizerHelperRef.current.style.display = 'block';
  };
  var onColumnResizeEnd = function onColumnResizeEnd(event) {
    var delta = resizerHelperRef.current.offsetLeft - lastResizerHelperX.current;
    var columnWidth = resizeColumn.current.offsetWidth;
    var newColumnWidth = columnWidth + delta;
    var minWidth = resizeColumn.current.style.minWidth || 15;
    if (columnWidth + delta > parseInt(minWidth, 10)) {
      if (props.columnResizeMode === 'fit') {
        var nextColumn = resizeColumn.current.nextElementSibling;
        var nextColumnWidth = nextColumn.offsetWidth - delta;
        if (newColumnWidth > 15 && nextColumnWidth > 15) {
          if (props.scrollable) {
            var scrollableView = findParentScrollableView(resizeColumn.current);
            var scrollableBodyTable = utils.DomHandler.findSingle(scrollableView, 'table[data-pc-section="scrollablebodytable"]');
            var scrollableHeaderTable = utils.DomHandler.findSingle(scrollableView, 'table[data-pc-section="scrollableheadertable"]');
            var scrollableFooterTable = utils.DomHandler.findSingle(scrollableView, 'table[data-pc-section="scrollablefootertable"]');
            var resizeColumnIndex = utils.DomHandler.index(resizeColumn.current);
            resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
          } else {
            resizeColumn.current.style.width = newColumnWidth + 'px';
            if (nextColumn) {
              nextColumn.style.width = nextColumnWidth + 'px';
            }
          }
        }
      } else if (props.columnResizeMode === 'expand') {
        if (props.scrollable) {
          var _scrollableView = findParentScrollableView(resizeColumn.current);
          var _scrollableBodyTable = utils.DomHandler.findSingle(_scrollableView, 'table[data-pc-section="scrollablebodytable"]');
          var _scrollableHeaderTable = utils.DomHandler.findSingle(_scrollableView, 'table[data-pc-section="scrollableheadertable"]');
          var _scrollableFooterTable = utils.DomHandler.findSingle(_scrollableView, 'table[data-pc-section="scrollablefootertable"]');
          _scrollableBodyTable.style.width = _scrollableBodyTable.offsetWidth + delta + 'px';
          _scrollableHeaderTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
          if (_scrollableFooterTable) {
            _scrollableFooterTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
          }
          var _resizeColumnIndex = utils.DomHandler.index(resizeColumn.current);
          resizeColGroup(_scrollableHeaderTable, _resizeColumnIndex, newColumnWidth, null);
          resizeColGroup(_scrollableBodyTable, _resizeColumnIndex, newColumnWidth, null);
          resizeColGroup(_scrollableFooterTable, _resizeColumnIndex, newColumnWidth, null);
        } else {
          tableRef.current.style.width = tableRef.current.offsetWidth + delta + 'px';
          resizeColumn.current.style.width = newColumnWidth + 'px';
        }
      }
      if (props.onColumnResizeEnd) {
        props.onColumnResizeEnd({
          element: resizeColumn.current,
          column: resizeColumnProps.current,
          delta: delta
        });
      }
      if (isStateful()) {
        saveState();
      }
    }
    resizerHelperRef.current.style.display = 'none';
    resizeColumn.current = null;
    resizeColumnProps.current = null;
    utils.DomHandler.removeClass(elementRef.current, 'p-unselectable-text');
    unbindColumnResizeEvents();
  };
  var findParentScrollableView = function findParentScrollableView(column) {
    if (column) {
      var parent = column.parentElement;
      while (parent && utils.DomHandler.getAttribute(parent, 'data-pc-section') !== 'scrollable') {
        parent = parent.parentElement;
      }
      return parent;
    }
    return null;
  };
  var resizeColGroup = function resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
    if (table) {
      var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
      if (colGroup) {
        var col = colGroup.children[resizeColumnIndex];
        var nextCol = col.nextElementSibling;
        col.style.width = newColumnWidth + 'px';
        if (nextCol && nextColumnWidth) {
          nextCol.style.width = nextColumnWidth + 'px';
        }
      } else {
        throw new Error('Scrollable tables require a colgroup to support resizable columns');
      }
    }
  };
  var bindColumnResizeEvents = function bindColumnResizeEvents() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };
  var unbindColumnResizeEvents = function unbindColumnResizeEvents() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };
  var onColumnDragStart = function onColumnDragStart(e) {
    var event = e.originalEvent,
      column = e.column;
    if (columnResizing.current) {
      event.preventDefault();
      return;
    }
    iconWidth.current = utils.DomHandler.getHiddenElementOuterWidth(reorderIndicatorUpRef.current);
    iconHeight.current = utils.DomHandler.getHiddenElementOuterHeight(reorderIndicatorUpRef.current);
    draggedColumnEl.current = findParentHeader(event.currentTarget);
    draggedColumn.current = column;
    event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
  };

  var onColumnDragOver = function onColumnDragOver(e) {
    var event = e.originalEvent,
      column = e.column;
    var dropHeader = findParentHeader(event.currentTarget);
    if (props.reorderableColumns && draggedColumnEl.current && dropHeader && !getColumnProp(column, 'frozen')) {
      event.preventDefault();
      var containerOffset = utils.DomHandler.getOffset(elementRef.current);
      var dropHeaderOffset = utils.DomHandler.getOffset(dropHeader);
      if (draggedColumnEl.current !== dropHeader) {
        var targetLeft = dropHeaderOffset.left - containerOffset.left;
        //let targetTop =  containerOffset.top - dropHeaderOffset.top;
        var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
        reorderIndicatorUpRef.current.style.top = dropHeaderOffset.top - containerOffset.top - (iconHeight.current - 1) + 'px';
        reorderIndicatorDownRef.current.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
        if (event.pageX > columnCenter) {
          reorderIndicatorUpRef.current.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(iconWidth.current / 2) + 'px';
          reorderIndicatorDownRef.current.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(iconWidth.current / 2) + 'px';
          dropPosition.current = 1;
        } else {
          reorderIndicatorUpRef.current.style.left = targetLeft - Math.ceil(iconWidth.current / 2) + 'px';
          reorderIndicatorDownRef.current.style.left = targetLeft - Math.ceil(iconWidth.current / 2) + 'px';
          dropPosition.current = -1;
        }
        reorderIndicatorUpRef.current.style.display = 'block';
        reorderIndicatorDownRef.current.style.display = 'block';
      }
    }
  };
  var onColumnDragLeave = function onColumnDragLeave(e) {
    var event = e.originalEvent;
    if (props.reorderableColumns && draggedColumnEl.current) {
      event.preventDefault();
      reorderIndicatorUpRef.current.style.display = 'none';
      reorderIndicatorDownRef.current.style.display = 'none';
    }
  };
  var onColumnDrop = function onColumnDrop(e) {
    var event = e.originalEvent,
      column = e.column;
    event.preventDefault();
    if (draggedColumnEl.current) {
      var dragIndex = utils.DomHandler.index(draggedColumnEl.current);
      var dropIndex = utils.DomHandler.index(findParentHeader(event.currentTarget));
      var allowDrop = dragIndex !== dropIndex;
      if (allowDrop && (dropIndex - dragIndex === 1 && dropPosition.current === -1 || dragIndex - dropIndex === 1 && dropPosition.current === 1)) {
        allowDrop = false;
      }
      if (allowDrop) {
        var columns = columnOrderState ? getColumns() : React__namespace.Children.toArray(props.children);
        var isSameColumn = function isSameColumn(col1, col2) {
          return getColumnProp(col1, 'columnKey') || getColumnProp(col2, 'columnKey') ? utils.ObjectUtils.equals(col1, col2, 'props.columnKey') : utils.ObjectUtils.equals(col1, col2, 'props.field');
        };
        var dragColIndex = columns.findIndex(function (child) {
          return isSameColumn(child, draggedColumn.current);
        });
        var dropColIndex = columns.findIndex(function (child) {
          return isSameColumn(child, column);
        });
        if (dropColIndex < dragColIndex && dropPosition.current === 1) {
          dropColIndex++;
        }
        if (dropColIndex > dragColIndex && dropPosition.current === -1) {
          dropColIndex--;
        }
        utils.ObjectUtils.reorderArray(columns, dragColIndex, dropColIndex);
        var columnOrder = [];
        var _iterator2 = _createForOfIteratorHelper(columns),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _column = _step2.value;
            columnOrder.push(getColumnProp(_column, 'columnKey') || getColumnProp(_column, 'field'));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        setColumnOrderState(columnOrder);
        if (props.onColReorder) {
          props.onColReorder({
            dragIndex: dragColIndex,
            dropIndex: dropColIndex,
            columns: columns
          });
        }
      }
      reorderIndicatorUpRef.current.style.display = 'none';
      reorderIndicatorDownRef.current.style.display = 'none';
      draggedColumnEl.current.draggable = false;
      draggedColumnEl.current = null;
      dropPosition.current = null;
    }
  };
  var findParentHeader = function findParentHeader(element) {
    if (element.nodeName === 'TH') {
      return element;
    }
    var parent = element.parentElement;
    while (parent.nodeName !== 'TH') {
      parent = parent.parentElement;
      if (!parent) {
        break;
      }
    }
    return parent;
  };
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var getExpandedKeys = function getExpandedKeys() {
    return props.onToggle ? props.expandedKeys : expandedKeysState;
  };
  var getFirst = function getFirst() {
    return props.onPage ? props.first : firstState;
  };
  var getRows = function getRows() {
    return props.onPage ? props.rows : rowsState;
  };
  var getSortField = function getSortField() {
    return props.onSort ? props.sortField : sortFieldState;
  };
  var getSortOrder = function getSortOrder() {
    return props.onSort ? props.sortOrder : sortOrderState;
  };
  var getMultiSortMeta = function getMultiSortMeta() {
    return (props.onSort ? props.multiSortMeta : multiSortMetaState) || [];
  };
  var getFilters = function getFilters() {
    return props.onFilter ? props.filters : filtersState;
  };
  var findColumnByKey = function findColumnByKey(columns, key) {
    if (columns && columns.length) {
      for (var i = 0; i < columns.length; i++) {
        var child = columns[i];
        if (getColumnProp(child, 'columnKey') === key || getColumnProp(child, 'field') === key) {
          return child;
        }
      }
    }
    return null;
  };
  var getColumns = function getColumns() {
    var columns = React__namespace.Children.toArray(props.children);
    if (columns && columns.length) {
      if (props.reorderableColumns && columnOrderState) {
        var orderedColumns = [];
        var _iterator3 = _createForOfIteratorHelper(columnOrderState),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var columnKey = _step3.value;
            var column = findColumnByKey(columns, columnKey);
            if (column) {
              orderedColumns.push(column);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return [].concat(orderedColumns, _toConsumableArray(columns.filter(function (item) {
          return orderedColumns.indexOf(item) < 0;
        })));
      }
      return columns;
    }
    return null;
  };
  var getTotalRecords = function getTotalRecords(data) {
    return props.lazy ? props.totalRecords : data ? data.length : 0;
  };
  var isSingleSelectionMode = function isSingleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'single';
  };
  var isMultipleSelectionMode = function isMultipleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'multiple';
  };
  var isRowSelectionMode = function isRowSelectionMode() {
    return isSingleSelectionMode() || isMultipleSelectionMode();
  };
  var getFrozenColumns = function getFrozenColumns(columns) {
    var frozenColumns = null;
    var _iterator4 = _createForOfIteratorHelper(columns),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var col = _step4.value;
        if (getColumnProp(col, 'frozen')) {
          frozenColumns = frozenColumns || [];
          frozenColumns.push(col);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return frozenColumns;
  };
  var getScrollableColumns = function getScrollableColumns(columns) {
    var scrollableColumns = null;
    var _iterator5 = _createForOfIteratorHelper(columns),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var col = _step5.value;
        if (!getColumnProp(col, 'frozen')) {
          scrollableColumns = scrollableColumns || [];
          scrollableColumns.push(col);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return scrollableColumns;
  };
  var filterLocal = function filterLocal(value) {
    var filteredNodes = [];
    var filters = getFilters();
    var columns = React__namespace.Children.toArray(props.children);
    var isStrictMode = props.filterMode === 'strict';
    var _iterator6 = _createForOfIteratorHelper(value),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var node = _step6.value;
        var copyNode = _objectSpread({}, node);
        var localMatch = true;
        var globalMatch = false;
        for (var j = 0; j < columns.length; j++) {
          var col = columns[j];
          var filterMeta = filters ? filters[getColumnProp(col, 'field')] : null;
          var filterField = getColumnProp(col, 'field');
          var filterValue = void 0;
          var filterConstraint = void 0;
          var paramsWithoutNode = void 0;
          var options = void 0;

          //local
          if (filterMeta) {
            var filterMatchMode = filterMeta.matchMode || getColumnProp(col, 'filterMatchMode') || 'startsWith';
            filterValue = filterMeta.value;
            filterConstraint = filterMatchMode === 'custom' ? getColumnProp(col, 'filterFunction') : PrimeReact.FilterService.filters[filterMatchMode];
            options = {
              rowData: node,
              filters: filters,
              props: props,
              column: {
                filterMeta: filterMeta,
                filterField: filterField,
                props: ColumnBase.getCProps(col)
              }
            };
            paramsWithoutNode = {
              filterField: filterField,
              filterValue: filterValue,
              filterConstraint: filterConstraint,
              isStrictMode: isStrictMode,
              options: options
            };
            if (isStrictMode && !(findFilteredNodes(copyNode, paramsWithoutNode) || isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && !(isFilterMatched(copyNode, paramsWithoutNode) || findFilteredNodes(copyNode, paramsWithoutNode))) {
              localMatch = false;
            }
            if (!localMatch) {
              break;
            }
          }

          //global
          if (props.globalFilter && !globalMatch) {
            var copyNodeForGlobal = _objectSpread({}, copyNode);
            filterValue = props.globalFilter;
            filterConstraint = PrimeReact.FilterService.filters[props.globalFilterMatchMode];
            paramsWithoutNode = {
              filterField: filterField,
              filterValue: filterValue,
              filterConstraint: filterConstraint,
              isStrictMode: isStrictMode
            };
            if (isStrictMode && (findFilteredNodes(copyNodeForGlobal, paramsWithoutNode) || isFilterMatched(copyNodeForGlobal, paramsWithoutNode)) || !isStrictMode && (isFilterMatched(copyNodeForGlobal, paramsWithoutNode) || findFilteredNodes(copyNodeForGlobal, paramsWithoutNode))) {
              globalMatch = true;
              copyNode = copyNodeForGlobal;
            }
          }
        }
        var matches = localMatch;
        if (props.globalFilter) {
          matches = localMatch && globalMatch;
        }
        if (matches) {
          filteredNodes.push(copyNode);
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return filteredNodes;
  };
  var findFilteredNodes = function findFilteredNodes(node, paramsWithoutNode) {
    if (node) {
      var matched = false;
      if (node.children) {
        var childNodes = _toConsumableArray(node.children);
        node.children = [];
        var _iterator7 = _createForOfIteratorHelper(childNodes),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var childNode = _step7.value;
            var copyChildNode = _objectSpread({}, childNode);
            if (isFilterMatched(copyChildNode, paramsWithoutNode)) {
              matched = true;
              node.children.push(copyChildNode);
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
      if (matched) {
        return true;
      }
    }
  };
  var isFilterMatched = function isFilterMatched(node, _ref3) {
    var filterField = _ref3.filterField,
      filterValue = _ref3.filterValue,
      filterConstraint = _ref3.filterConstraint,
      isStrictMode = _ref3.isStrictMode,
      options = _ref3.options;
    var matched = false;
    var dataFieldValue = utils.ObjectUtils.resolveFieldData(node.data, filterField);
    if (filterConstraint(dataFieldValue, filterValue, props.filterLocale, options)) {
      matched = true;
    }
    if (!matched || isStrictMode && !isNodeLeaf(node)) {
      matched = findFilteredNodes(node, {
        filterField: filterField,
        filterValue: filterValue,
        filterConstraint: filterConstraint,
        isStrictMode: isStrictMode
      }) || matched;
    }
    return matched;
  };
  var isNodeLeaf = function isNodeLeaf(node) {
    return node.leaf === false ? false : !(node.children && node.children.length);
  };
  var processedData = function processedData(localState) {
    var data = props.value || [];
    if (!props.lazy) {
      if (data && data.length) {
        var filters = localState && localState.filters || getFilters();
        var sortField = localState && localState.sortField || getSortField();
        var multiSortMeta = localState && localState.multiSortMeta || getMultiSortMeta();
        var columns = getColumns();
        var sortColumn = columns.find(function (col) {
          return getColumnProp(col, 'field') === sortField;
        });
        if (sortColumn) {
          columnSortable.current = getColumnProp(sortColumn, 'sortable');
          columnSortFunction.current = getColumnProp(sortColumn, 'sortFunction');
        }
        if (utils.ObjectUtils.isNotEmpty(filters) || props.globalFilter) {
          data = filterLocal(data);
        }
        if (sortField || utils.ObjectUtils.isNotEmpty(multiSortMeta)) {
          if (props.sortMode === 'single') {
            data = sortSingle(data);
          } else if (props.sortMode === 'multiple') {
            data = sortMultiple(data);
          }
        }
      }
    }
    return data;
  };
  hooks.useMountEffect(function () {
    if (isStateful()) {
      restoreState();
    }
  });
  hooks.useUpdateEffect(function () {
    if (isStateful()) {
      saveState();
    }
  });
  hooks.useUpdateEffect(function () {
    if (childFocusEvent.current) {
      var nodeElement = childFocusEvent.current.target;
      var nextElementSibling = nodeElement.nextElementSibling;
      if (nextElementSibling) {
        nodeElement.tabIndex = '-1';
        nextElementSibling.tabIndex = '0';
        utils.DomHandler.focus(nextElementSibling);
      }
    }
  }, [expandedKeysState]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      clearState: clearState,
      filter: filter,
      getElement: function getElement() {
        return elementRef.current;
      },
      restoreState: restoreState,
      restoreTableState: restoreTableState,
      saveState: saveState
    };
  });
  var createEvent = function createEvent(event) {
    return _objectSpread({
      first: getFirst(),
      rows: getRows(),
      sortField: getSortField(),
      sortOrder: getSortOrder(),
      multiSortMeta: getMultiSortMeta(),
      filters: getFilters()
    }, event);
  };
  var createTableHeader = function createTableHeader(columns, columnGroup) {
    var sortField = getSortField();
    var sortOrder = getSortOrder();
    var multiSortMeta = _toConsumableArray(getMultiSortMeta());
    var filters = getFilters();
    return /*#__PURE__*/React__namespace.createElement(TreeTableHeader, {
      hostName: "TreeTable",
      columns: columns,
      columnGroup: columnGroup,
      tabIndex: props.tabIndex,
      onSort: onSort,
      sortField: sortField,
      sortIcon: props.sortIcon,
      sortOrder: sortOrder,
      multiSortMeta: multiSortMeta,
      resizableColumns: props.resizableColumns,
      onResizeStart: onColumnResizeStart,
      reorderableColumns: props.reorderableColumns,
      onDragStart: onColumnDragStart,
      onDragOver: onColumnDragOver,
      onDragLeave: onColumnDragLeave,
      onDrop: onColumnDrop,
      onFilter: onFilter,
      filters: filters,
      filterDelay: props.filterDelay,
      ptCallbacks: ptCallbacks,
      metaData: metaData,
      unstyled: props.unstyled
    });
  };
  var createTableFooter = function createTableFooter(columns, columnGroup) {
    return /*#__PURE__*/React__namespace.createElement(TreeTableFooter, {
      hostName: "TreeTable",
      columns: columns,
      columnGroup: columnGroup,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    });
  };
  var createTableBody = function createTableBody(value, columns) {
    return /*#__PURE__*/React__namespace.createElement(TreeTableBody, {
      hostName: "TreeTable",
      checkboxIcon: props.checkboxIcon,
      columns: columns,
      contextMenuSelectionKey: props.contextMenuSelectionKey,
      emptyMessage: props.emptyMessage,
      expandedKeys: getExpandedKeys(),
      first: getFirst(),
      lazy: props.lazy,
      loading: props.loading,
      metaData: metaData,
      metaKeySelection: props.metaKeySelection,
      onCollapse: props.onCollapse,
      onContextMenu: props.onContextMenu,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onExpand: props.onExpand,
      onRowClick: props.onRowClick,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      onSelect: props.onSelect,
      onSelectionChange: props.onSelectionChange,
      onToggle: onToggle,
      onUnselect: props.onUnselect,
      originalOptions: props.value,
      paginator: props.paginator,
      propagateSelectionDown: props.propagateSelectionDown,
      propagateSelectionUp: props.propagateSelectionUp,
      ptCallbacks: ptCallbacks,
      rowClassName: props.rowClassName,
      rows: getRows(),
      selectOnEdit: props.selectOnEdit,
      selectionKeys: props.selectionKeys,
      selectionMode: props.selectionMode,
      togglerTemplate: props.togglerTemplate,
      value: value
    });
  };
  var createPaginator = function createPaginator(position, totalRecords) {
    var className = utils.classNames('p-paginator-' + position, props.paginatorClassName);
    return /*#__PURE__*/React__namespace.createElement(paginator.Paginator, {
      first: getFirst(),
      rows: getRows(),
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
      pt: ptCallbacks.ptm('paginator'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: metaData
      }
    });
  };
  var createScrollableView = function createScrollableView(value, columns, frozen, headerColumnGroup, footerColumnGroup) {
    var header = createTableHeader(columns, headerColumnGroup);
    var footer = createTableFooter(columns, footerColumnGroup);
    var body = createTableBody(value, columns);
    return /*#__PURE__*/React__namespace.createElement(TreeTableScrollableView, {
      hostName: "TreeTable",
      columns: columns,
      header: header,
      body: body,
      footer: footer,
      scrollHeight: props.scrollHeight,
      frozen: frozen,
      frozenWidth: props.frozenWidth,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    });
  };
  var createScrollableTable = function createScrollableTable(value) {
    var columns = getColumns();
    var frozenColumns = getFrozenColumns(columns);
    var scrollableColumns = frozenColumns ? getScrollableColumns(columns) : columns;
    var frozenView;
    var scrollableView;
    if (frozenColumns) {
      frozenView = createScrollableView(value, frozenColumns, true, props.frozenHeaderColumnGroup, props.frozenFooterColumnGroup);
    }
    scrollableView = createScrollableView(value, scrollableColumns, false, props.headerColumnGroup, props.footerColumnGroup);
    var scrollableWrapperProps = mergeProps({
      className: ptCallbacks.cx('scrollableWrapper')
    }, ptCallbacks.ptm('scrollableWrapper'));
    return /*#__PURE__*/React__namespace.createElement("div", scrollableWrapperProps, frozenView, scrollableView);
  };
  var createRegularTable = function createRegularTable(value) {
    var columns = getColumns();
    var header = createTableHeader(columns, props.headerColumnGroup);
    var footer = createTableFooter(columns, props.footerColumnGroup);
    var body = createTableBody(value, columns);
    var wrapperProps = mergeProps({
      className: ptCallbacks.cx('wrapper')
    }, ptCallbacks.ptm('wrapper'));
    var tableProps = mergeProps({
      role: 'table',
      style: props.tableStyle,
      className: utils.classNames(props.tableClassName, ptCallbacks.cx('table'))
    }, ptCallbacks.ptm('table'));
    return /*#__PURE__*/React__namespace.createElement("div", wrapperProps, /*#__PURE__*/React__namespace.createElement("table", _extends({
      ref: tableRef
    }, tableProps), header, footer, body));
  };
  var createTable = function createTable(value) {
    return props.scrollable ? createScrollableTable(value) : createRegularTable(value);
  };
  var createLoader = function createLoader() {
    if (props.loading) {
      var loadingIconProps = mergeProps({
        className: ptCallbacks.cx('loadingIcon')
      }, ptCallbacks.ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      }));
      var loadingIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingWrapperProps = mergeProps({
        className: ptCallbacks.cx('loadingWrapper')
      }, ptCallbacks.ptm('loadingWrapper'));
      var loadingOverlayProps = mergeProps({
        className: ptCallbacks.cx('loadingOverlay')
      }, ptCallbacks.ptm('loadingOverlay'));
      return /*#__PURE__*/React__namespace.createElement("div", loadingWrapperProps, /*#__PURE__*/React__namespace.createElement("div", loadingOverlayProps, loadingIcon));
    }
    return null;
  };
  var data = processedData();
  var table = createTable(data);
  var totalRecords = getTotalRecords(data);
  var headerProps = mergeProps({
    className: ptCallbacks.cx('header')
  }, ptCallbacks.ptm('header'));
  var footerProps = mergeProps({
    className: ptCallbacks.cx('footer')
  }, ptCallbacks.ptm('footer'));
  var resizeHelperProps = mergeProps({
    className: ptCallbacks.cx('resizeHelper'),
    style: {
      display: 'none'
    }
  }, ptCallbacks.ptm('resizeHelper'));
  var headerFacet = props.header && /*#__PURE__*/React__namespace.createElement("div", headerProps, props.header);
  var footerFacet = props.footer && /*#__PURE__*/React__namespace.createElement("div", footerProps, props.footer);
  var paginatorTop = props.paginator && props.paginatorPosition !== 'bottom' && createPaginator('top', totalRecords);
  var paginatorBottom = props.paginator && props.paginatorPosition !== 'top' && createPaginator('bottom', totalRecords);
  var loader = createLoader();
  var resizeHelper = props.resizableColumns && /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: resizerHelperRef
  }, resizeHelperProps));
  var reorderIndicatorUpProps = mergeProps({
    className: ptCallbacks.cx('reorderIndicatorUp'),
    style: {
      position: 'absolute',
      display: 'none'
    }
  }, ptCallbacks.ptm('reorderIndicatorUp'));
  var reorderIndicatorUpIconProps = mergeProps(ptCallbacks.ptm('reorderIndicatorUpIcon'));
  var reorderIndicatorUpIcon = props.reorderableColumns && utils.IconUtils.getJSXIcon(props.reorderIndicatorUpIcon || /*#__PURE__*/React__namespace.createElement(arrowdown.ArrowDownIcon, reorderIndicatorUpIconProps), _objectSpread({}, reorderIndicatorUpIconProps), {
    props: props
  });
  var reorderIndicatorUp = props.reorderableColumns && /*#__PURE__*/React__namespace.createElement("span", _extends({
    ref: reorderIndicatorUpRef
  }, reorderIndicatorUpProps), reorderIndicatorUpIcon);
  var reorderIndicatorDownProps = {
    className: ptCallbacks.sx('reorderIndicatorDown'),
    style: {
      position: 'absolute',
      display: 'none'
    }
  };
  var reorderIndicatorDownIconProps = mergeProps(ptCallbacks.ptm('reorderIndicatorDownIcon'));
  var reorderIndicatorDownIcon = utils.IconUtils.getJSXIcon(props.reorderIndicatorDownIcon || /*#__PURE__*/React__namespace.createElement(arrowup.ArrowUpIcon, reorderIndicatorDownIconProps), _objectSpread({}, reorderIndicatorDownIconProps), {
    props: props
  });
  var reorderIndicatorDown = props.reorderableColumns && /*#__PURE__*/React__namespace.createElement("span", _extends({
    ref: reorderIndicatorDownRef
  }, reorderIndicatorDownProps), reorderIndicatorDownIcon);
  var rootProps = mergeProps({
    role: 'table',
    id: props.id,
    className: utils.classNames(props.className, ptCallbacks.cx('root', {
      isRowSelectionMode: isRowSelectionMode
    })),
    style: props.style,
    'data-scrollselectors': '.p-treetable-wrapper'
  }, utils.ObjectUtils.findDiffKeys(props, TreeTable.defaultProps), ptCallbacks.ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, rootProps), loader, headerFacet, paginatorTop, table, paginatorBottom, footerFacet, resizeHelper, reorderIndicatorUp, reorderIndicatorDown);
});
TreeTable.displayName = 'TreeTable';

exports.TreeTable = TreeTable;
