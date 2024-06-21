'use client';
import * as React from 'react';
import React__default from 'react';
import PrimeReact$1, { FilterMatchMode as FilterMatchMode$1, PrimeReactContext, ariaLabel as ariaLabel$1, localeOption, FilterOperator, FilterService } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { ObjectUtils, classNames, DomHandler, IconUtils, UniqueComponentId, ZIndexUtils } from 'primereact/utils';
import { useMergeProps, useUpdateEffect, useMountEffect, useEventListener, useUnmountEffect, useStyle, useOverlayListener, usePrevious } from 'primereact/hooks';
import { ArrowDownIcon } from 'primereact/icons/arrowdown';
import { ArrowUpIcon } from 'primereact/icons/arrowup';
import { SpinnerIcon } from 'primereact/icons/spinner';
import { Paginator } from 'primereact/paginator';
import { VirtualScroller } from 'primereact/virtualscroller';
import { BarsIcon } from 'primereact/icons/bars';
import { CheckIcon } from 'primereact/icons/check';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { PencilIcon } from 'primereact/icons/pencil';
import { TimesIcon } from 'primereact/icons/times';
import { OverlayService } from 'primereact/overlayservice';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { CSSTransition } from 'primereact/csstransition';
import { Dropdown } from 'primereact/dropdown';
import { FilterIcon } from 'primereact/icons/filter';
import { FilterSlashIcon } from 'primereact/icons/filterslash';
import { PlusIcon } from 'primereact/icons/plus';
import { TrashIcon } from 'primereact/icons/trash';
import { InputText } from 'primereact/inputtext';
import { Portal } from 'primereact/portal';
import { SortAltIcon } from 'primereact/icons/sortalt';
import { SortAmountDownIcon } from 'primereact/icons/sortamountdown';
import { SortAmountUpAltIcon } from 'primereact/icons/sortamountupalt';

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

var ColumnBase = ComponentBase.extend({
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
    return ObjectUtils.getComponentProp(column, name, ColumnBase.defaultProps);
  },
  getCProps: function getCProps(column) {
    return ObjectUtils.getComponentProps(column, ColumnBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(column) {
    return ObjectUtils.getComponentDiffProps(column, ColumnBase.defaultProps);
  }
});

function ownKeys$e(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$e(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$e(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var styles$1 = "\n@layer primereact {\n    .p-datatable {\n        position: relative;\n    }\n\n    .p-datatable > .p-datatable-wrapper {\n        overflow: auto;\n    }\n\n    .p-datatable-table {\n        border-spacing: 0px;\n        width: 100%;\n    }\n\n    .p-datatable .p-sortable-disabled {\n        cursor: auto;\n    }\n\n    .p-datatable .p-sortable-column {\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-datatable .p-sortable-column .p-column-title,\n    .p-datatable .p-sortable-column .p-sortable-column-icon,\n    .p-datatable .p-sortable-column .p-sortable-column-badge {\n        vertical-align: middle;\n    }\n\n    .p-datatable .p-sortable-column .p-sortable-column-badge {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-datatable-selectable .p-selectable-row,\n    .p-datatable-selectable-cell .p-selectable-cell {\n        cursor: pointer;\n    }\n\n    .p-datatable-drag-selection-helper {\n        position: absolute;\n        z-index: 99999999;\n    }\n\n    /* Scrollable */\n    .p-datatable-scrollable > .p-datatable-wrapper {\n        position: relative;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-thead {\n        position: sticky;\n        top: 0;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {\n        position: sticky;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-tfoot {\n        position: sticky;\n        bottom: 0;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable .p-frozen-column {\n        position: sticky;\n        background: inherit;\n    }\n\n    .p-datatable-scrollable th.p-frozen-column {\n        z-index: 1;\n    }\n\n    .p-datatable-flex-scrollable {\n        display: flex;\n        flex-direction: column;\n        height: 100%;\n    }\n\n    .p-datatable-flex-scrollable > .p-datatable-wrapper {\n        display: flex;\n        flex-direction: column;\n        flex: 1;\n        height: 100%;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-tbody > .p-rowgroup-header {\n        position: sticky;\n        z-index: 1;\n    }\n\n    /* Resizable */\n    .p-datatable-resizable-table > .p-datatable-thead > tr > th,\n    .p-datatable-resizable-table > .p-datatable-tfoot > tr > td,\n    .p-datatable-resizable-table > .p-datatable-tbody > tr > td {\n        overflow: hidden;\n        white-space: nowrap;\n    }\n\n    .p-datatable-resizable-table > .p-datatable-thead > tr > th.p-resizable-column:not(.p-frozen-column) {\n        background-clip: padding-box;\n        position: relative;\n    }\n\n    .p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-resizable-column:last-child .p-column-resizer {\n        display: none;\n    }\n\n    .p-datatable .p-column-resizer {\n        display: block;\n        position: absolute;\n        top: 0;\n        right: 0;\n        margin: 0;\n        width: 0.5rem;\n        height: 100%;\n        padding: 0px;\n        cursor: col-resize;\n        border: 1px solid transparent;\n    }\n\n    .p-datatable .p-column-header-content {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-datatable .p-column-resizer-helper {\n        width: 1px;\n        position: absolute;\n        z-index: 10;\n        display: none;\n    }\n\n    .p-datatable .p-row-editor-init,\n    .p-datatable .p-row-editor-save,\n    .p-datatable .p-row-editor-cancel {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Expand */\n    .p-datatable .p-row-toggler {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Reorder */\n    .p-datatable-reorder-indicator-up,\n    .p-datatable-reorder-indicator-down {\n        position: absolute;\n        display: none;\n    }\n\n    .p-reorderable-column,\n    .p-datatable-reorderablerow-handle {\n        cursor: move;\n    }\n\n    /* Loader */\n    .p-datatable .p-datatable-loading-overlay {\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 2;\n    }\n\n    /* Filter */\n    .p-column-filter-row {\n        display: flex;\n        align-items: center;\n        width: 100%;\n    }\n\n    .p-column-filter-menu {\n        display: inline-flex;\n        margin-left: auto;\n    }\n\n    .p-column-filter-row .p-column-filter-element {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n\n    .p-column-filter-menu-button,\n    .p-column-filter-clear-button {\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-column-filter-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n\n    .p-column-filter-row-items {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-column-filter-row-item {\n        cursor: pointer;\n    }\n\n    .p-column-filter-add-button,\n    .p-column-filter-remove-button {\n        justify-content: center;\n    }\n\n    .p-column-filter-add-button .p-button-label,\n    .p-column-filter-remove-button .p-button-label {\n        flex-grow: 0;\n    }\n\n    .p-column-filter-buttonbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {\n        width: auto;\n    }\n\n    /* Responsive */\n    .p-datatable .p-datatable-tbody > tr > td > .p-column-title {\n        display: none;\n    }\n\n    /* VirtualScroller */\n    .p-datatable-virtualscroller-spacer {\n        display: flex;\n    }\n\n    .p-datatable .p-virtualscroller .p-virtualscroller-loading {\n        transform: none;\n        min-height: 0;\n        position: sticky;\n        top: 0;\n        left: 0;\n    }\n\n    /* Alignment */\n    .p-datatable .p-datatable-thead > tr > th.p-align-left > .p-column-header-content,\n    .p-datatable .p-datatable-tbody > tr > td.p-align-left,\n    .p-datatable .p-datatable-tfoot > tr > td.p-align-left {\n        text-align: left;\n        justify-content: flex-start;\n    }\n\n    .p-datatable .p-datatable-thead > tr > th.p-align-right > .p-column-header-content,\n    .p-datatable .p-datatable-tbody > tr > td.p-align-right,\n    .p-datatable .p-datatable-tfoot > tr > td.p-align-right {\n        text-align: right;\n        justify-content: flex-end;\n    }\n\n    .p-datatable .p-datatable-thead > tr > th.p-align-center > .p-column-header-content,\n    .p-datatable .p-datatable-tbody > tr > td.p-align-center,\n    .p-datatable .p-datatable-tfoot > tr > td.p-align-center {\n        text-align: center;\n        justify-content: center;\n    }\n}\n";
var classes$2 = {
  root: function root(_ref) {
    var props = _ref.props,
      selectable = _ref.selectable;
    return classNames('p-datatable p-component', {
      'p-datatable-hoverable-rows': props.rowHover,
      'p-datatable-selectable': selectable && !props.cellSelection,
      'p-datatable-selectable-cell': selectable && props.cellSelection,
      'p-datatable-resizable': props.resizableColumns,
      'p-datatable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-datatable-scrollable': props.scrollable,
      'p-datatable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
      'p-datatable-responsive-stack': props.responsiveLayout === 'stack',
      'p-datatable-responsive-scroll': props.responsiveLayout === 'scroll',
      'p-datatable-striped': props.stripedRows,
      'p-datatable-gridlines': props.showGridlines,
      'p-datatable-grouped-header': props.headerColumnGroup != null,
      'p-datatable-grouped-footer': props.footerColumnGroup != null,
      'p-datatable-sm': props.size === 'small',
      'p-datatable-lg': props.size === 'large'
    });
  },
  loadingIcon: 'p-datatable-loading-icon',
  loadingOverlay: 'p-datatable-loading-overlay p-component-overlay',
  header: 'p-datatable-header',
  wrapper: 'p-datatable-wrapper',
  table: function table(_ref2) {
    var props = _ref2.props;
    return classNames('p-datatable-table', {
      'p-datatable-scrollable-table': props.scrollable,
      'p-datatable-resizable-table': props.resizableColumns,
      'p-datatable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
    });
  },
  thead: 'p-datatable-thead',
  tfoot: 'p-datatable-tfoot',
  footer: 'p-datatable-footer',
  checkIcon: 'p-checkbox-icon',
  resizeHelper: 'p-column-resizer-helper',
  reorderIndicatorUp: 'p-datatable-reorder-indicator-up',
  reorderIndicatorDown: 'p-datatable-reorder-indicator-down',
  paginator: function paginator(_ref3) {
    var position = _ref3.position;
    return classNames('p-paginator-' + position);
  },
  bodyCell: function bodyCell(_ref4) {
    var selectionMode = _ref4.selectionMode,
      editor = _ref4.editor,
      editingState = _ref4.editingState,
      frozen = _ref4.frozen,
      cellSelected = _ref4.cellSelected,
      align = _ref4.align,
      props = _ref4.bodyProps,
      getCellParams = _ref4.getCellParams;
    return classNames(_defineProperty({
      'p-selection-column': selectionMode !== null,
      'p-editable-column': editor,
      'p-cell-editing': editor && editingState,
      'p-frozen-column': frozen,
      'p-selectable-cell': props.allowCellSelection && props.isSelectable({
        data: getCellParams(),
        index: props.rowIndex
      }),
      'p-highlight': cellSelected
    }, "p-align-".concat(align), !!align));
  },
  columnTitle: 'p-column-title',
  bodyRow: function bodyRow(_ref5) {
    var props = _ref5.rowProps;
    return classNames({
      'p-highlight': !props.allowCellSelection && props.selected || props.contextMenuSelected,
      'p-highlight-contextmenu': props.contextMenuSelected,
      'p-selectable-row': props.allowRowSelection && props.isSelectable({
        data: props.rowData,
        index: props.rowIndex
      }),
      'p-row-odd': props.rowIndex % 2 !== 0
    });
  },
  rowGroupTogglerIcon: 'p-row-toggler-icon',
  rowGroupToggler: 'p-row-toggler p-link',
  rowGroupHeader: 'p-rowgroup-header',
  rowGroupHeaderName: 'p-rowgroup-header-name',
  rowGroupFooter: 'p-rowgroup-footer',
  rowReorderIcon: 'p-datatable-reorderablerow-handle',
  rowTogglerIcon: 'p-row-toggler-icon',
  rowToggler: 'p-row-toggler p-link',
  rowEditorSaveIcon: 'p-row-editor-save-icon',
  rowEditorSaveButton: 'p-row-editor-save p-link',
  rowEditorCancelIcon: 'p-row-editor-cancel-icon',
  rowEditorCancelButton: 'p-row-editor-cancel p-link',
  rowEditorInitIcon: 'p-row-editor-init-icon',
  rowEditorInitButton: 'p-row-editor-init p-link',
  rowExpansion: 'p-datatable-row-expansion',
  virtualScrollerSpacer: function virtualScrollerSpacer(_ref6) {
    var className = _ref6.className;
    return className;
  },
  tbody: function tbody(_ref7) {
    var className = _ref7.className;
    return className;
  },
  filterInput: 'p-fluid p-column-filter-element',
  filterMenuButton: function filterMenuButton(_ref8) {
    var overlayVisibleState = _ref8.overlayVisibleState,
      hasFilter = _ref8.hasFilter;
    return classNames('p-column-filter-menu-button p-link', {
      'p-column-filter-menu-button-open': overlayVisibleState,
      'p-column-filter-menu-button-active': hasFilter()
    });
  },
  headerFilterClearButton: function headerFilterClearButton(_ref9) {
    var hasRowFilter = _ref9.hasRowFilter;
    return classNames('p-column-filter-clear-button p-link', {
      'p-hidden-space': !hasRowFilter()
    });
  },
  filterSeparator: 'p-column-filter-separator',
  filterRowItem: function filterRowItem(_ref10) {
    var isRowMatchModeSelected = _ref10.isRowMatchModeSelected,
      isShowMatchModes = _ref10.isShowMatchModes,
      value = _ref10.value;
    return isShowMatchModes() ? classNames('p-column-filter-row-item', {
      'p-highlight': value && isRowMatchModeSelected(value)
    }) : undefined;
  },
  filterRowItems: 'p-column-filter-row-items',
  filterOperator: 'p-column-filter-operator',
  filterConstraints: 'p-column-filter-constraints',
  filterConstraint: 'p-column-filter-constraint',
  filterAddRule: 'p-column-filter-add-rule',
  filterButtonBar: 'p-column-filter-buttonbar',
  filterOverlay: function filterOverlay(_ref11) {
    var props = _ref11.columnFilterProps,
      context = _ref11.context,
      getColumnProp = _ref11.getColumnProp;
    return classNames('p-column-filter-overlay p-component p-fluid', getColumnProp('filterMenuClassName'), {
      'p-column-filter-overlay-menu': props.display === 'menu',
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact$1.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact$1.ripple === false
    });
  },
  columnFilter: function columnFilter(_ref12) {
    var props = _ref12.columnFilterProps;
    return classNames('p-column-filter p-fluid', {
      'p-column-filter-row': props.display === 'row',
      'p-column-filter-menu': props.display === 'menu'
    });
  },
  columnResizer: 'p-column-resizer',
  emptyMessage: 'p-datatable-emptymessage',
  sortBadge: 'p-sortable-column-badge',
  sortIcon: 'p-sortable-column-icon',
  headerTitle: 'p-column-title',
  headerContent: 'p-column-header-content',
  headerCell: function headerCell(_ref13) {
    var props = _ref13.headerProps,
      frozen = _ref13.frozen,
      sortMeta = _ref13.sortMeta,
      align = _ref13.align,
      _isSortableDisabled = _ref13._isSortableDisabled,
      getColumnProp = _ref13.getColumnProp;
    return ObjectUtils.isEmpty(props) ? classNames('p-filter-column', {
      'p-frozen-column': frozen
    }) : classNames(_defineProperty({
      'p-filter-column': !props.headerColumnGroup && props.filterDisplay === 'row',
      'p-sortable-column': getColumnProp('sortable'),
      'p-resizable-column': props.resizableColumns && getColumnProp('resizeable'),
      'p-highlight': sortMeta.sorted,
      'p-frozen-column': frozen,
      'p-selection-column': getColumnProp('selectionMode'),
      'p-sortable-disabled': getColumnProp('sortable') && _isSortableDisabled,
      'p-reorderable-column': props.reorderableColumns && getColumnProp('reorderable') && !frozen
    }, "p-align-".concat(align), !!align));
  },
  footerCell: function footerCell(_ref14) {
    var getColumnProp = _ref14.getColumnProp,
      align = _ref14.align;
    return classNames(_defineProperty({
      'p-frozen-column': getColumnProp('frozen')
    }, "p-align-".concat(align), !!align));
  },
  transition: 'p-connected-overlay'
};
var inlineStyles = {
  wrapper: {
    overflow: 'auto'
  },
  resizeHelper: {
    display: 'none'
  },
  reorderIndicatorUp: function reorderIndicatorUp(_ref15) {
    var style = _ref15.style;
    return _objectSpread$e({}, style);
  },
  reorderIndicatorDown: function reorderIndicatorDown(_ref16) {
    var style = _ref16.style;
    return _objectSpread$e({}, style);
  }
};
var DataTableBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataTable',
    alwaysShowPaginator: true,
    breakpoint: '960px',
    cellClassName: null,
    cellSelection: false,
    checkIcon: null,
    className: null,
    collapsedRowIcon: null,
    columnResizeMode: 'fit',
    compareSelectionBy: 'deepEquals',
    contextMenuSelection: null,
    csvSeparator: ',',
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    customRestoreState: null,
    customSaveState: null,
    dataKey: null,
    defaultSortOrder: 1,
    dragSelection: false,
    editMode: null,
    editingRows: null,
    emptyMessage: null,
    expandableRowGroups: false,
    expandedRowIcon: null,
    expandedRows: null,
    exportFilename: 'download',
    exportFunction: null,
    filterClearIcon: null,
    filterDelay: 300,
    filterDisplay: 'menu',
    filterIcon: null,
    filterLocale: undefined,
    filters: null,
    first: 0,
    footer: null,
    footerColumnGroup: null,
    frozenRow: false,
    frozenValue: null,
    frozenWidth: null,
    globalFilter: null,
    globalFilterFields: null,
    globalFilterMatchMode: FilterMatchMode$1.CONTAINS,
    groupRowsBy: null,
    header: null,
    headerColumnGroup: null,
    id: null,
    isDataSelectable: null,
    lazy: false,
    loading: false,
    loadingIcon: null,
    metaKeySelection: false,
    multiSortMeta: null,
    onAllRowsSelect: null,
    onAllRowsUnselect: null,
    onCellClick: null,
    onCellSelect: null,
    onCellUnselect: null,
    onColReorder: null,
    onColumnResizeEnd: null,
    onColumnResizerClick: null,
    onColumnResizerDoubleClick: null,
    onContextMenu: null,
    onContextMenuSelectionChange: null,
    onFilter: null,
    onPage: null,
    onRowClick: null,
    onRowCollapse: null,
    onRowDoubleClick: null,
    onRowEditCancel: null,
    onRowEditChange: null,
    onRowEditComplete: null,
    onRowEditInit: null,
    onRowEditSave: null,
    onRowExpand: null,
    onRowMouseEnter: null,
    onRowMouseLeave: null,
    onRowPointerDown: null,
    onRowPointerUp: null,
    onRowReorder: null,
    onRowSelect: null,
    onRowToggle: null,
    onRowUnselect: null,
    onSelectAllChange: null,
    onSelectionChange: null,
    onSort: null,
    onStateRestore: null,
    onStateSave: null,
    onValueChange: null,
    pageLinkSize: 5,
    paginator: false,
    paginatorClassName: null,
    paginatorDropdownAppendTo: null,
    paginatorLeft: null,
    paginatorPosition: 'bottom',
    paginatorRight: null,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    removableSort: false,
    reorderIndicatorDownIcon: null,
    reorderIndicatorUpIcon: null,
    reorderableColumns: false,
    reorderableRows: false,
    resizableColumns: false,
    responsiveLayout: 'scroll',
    rowClassName: null,
    rowEditValidator: null,
    rowEditorCancelIcon: null,
    rowEditorInitIcon: null,
    rowEditorSaveIcon: null,
    rowExpansionTemplate: null,
    rowGroupFooterTemplate: null,
    rowGroupHeaderTemplate: null,
    rowGroupMode: null,
    rowHover: false,
    rows: null,
    rowsPerPageOptions: null,
    scrollHeight: null,
    scrollable: false,
    selectAll: false,
    selectOnEdit: true,
    selection: null,
    selectionAriaLabel: null,
    selectionAutoFocus: true,
    selectionMode: null,
    selectionPageOnly: false,
    showGridlines: false,
    showHeaders: true,
    showRowReorderElement: null,
    showSelectAll: true,
    showSelectionElement: null,
    size: 'normal',
    sortField: null,
    sortIcon: null,
    sortMode: 'single',
    sortOrder: null,
    stateKey: null,
    stateStorage: 'session',
    stripedRows: false,
    style: null,
    tabIndex: 0,
    tableClassName: null,
    tableStyle: null,
    totalRecords: null,
    value: null,
    virtualScrollerOptions: null,
    children: undefined
  },
  css: {
    styles: styles$1,
    classes: classes$2,
    inlineStyles: inlineStyles
  }
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

var classes$1 = {
  box: 'p-checkbox-box',
  input: 'p-checkbox-input',
  icon: 'p-checkbox-icon',
  root: function root(_ref) {
    var props = _ref.props,
      checked = _ref.checked,
      context = _ref.context;
    return classNames('p-checkbox p-component', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  }
};
var CheckboxBase = ComponentBase.extend({
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
    classes: classes$1
  }
});

function ownKeys$d(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$d(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$d(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Checkbox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
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
  useHandleStyle(CheckboxBase.css.styles, isUnstyled, {
    name: 'checkbox'
  });
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
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
      DomHandler.focus(inputRef.current);
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
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var checked = isChecked();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var rootProps = mergeProps({
    id: props.id,
    className: classNames(props.className, cx('root', {
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
    var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
    var inputProps = mergeProps(_objectSpread$d({
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
    return /*#__PURE__*/React.createElement("input", _extends({
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
    var icon = checked ? props.icon || /*#__PURE__*/React.createElement(CheckIcon, iconProps) : null;
    var checkboxIcon = IconUtils.getJSXIcon(icon, _objectSpread$d({}, iconProps), {
      props: props,
      checked: checked
    });
    return /*#__PURE__*/React.createElement("div", boxProps, checkboxIcon);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Checkbox.displayName = 'Checkbox';

function ownKeys$c(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$c(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$c(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var RowCheckbox = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var columnMetaData = {
      props: getColumnProps(),
      parent: props.metaData,
      hostName: props.hostName,
      state: {},
      context: {
        index: props.tabIndex,
        checked: props.checked,
        disabled: props.disabled
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(getColumnProps(), key, columnMetaData));
  };
  var onChange = function onChange(event) {
    if (!props.disabled) {
      props.onChange(event);
    }
  };
  var checkboxIconProps = mergeProps({
    className: cx('checkIcon')
  }, getColumnPTOptions('rowCheckbox.icon'));
  var icon = props.checked ? props.checkIcon || /*#__PURE__*/React.createElement(CheckIcon, checkboxIconProps) : null;
  var checkIcon = IconUtils.getJSXIcon(icon, _objectSpread$c({}, checkboxIconProps), {
    props: props
  });
  var tabIndex = props.disabled ? null : '0';
  var checkboxProps = mergeProps({
    role: 'checkbox',
    'aria-checked': props.checked,
    tabIndex: tabIndex,
    onChange: onChange,
    'aria-label': props.ariaLabel,
    checked: props.checked,
    icon: checkIcon,
    disabled: props.disabled
  }, getColumnPTOptions('rowCheckbox'));
  return /*#__PURE__*/React.createElement(Checkbox, checkboxProps);
});
RowCheckbox.displayName = 'RowCheckbox';

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context;
    return classNames('p-radiobutton p-component', {
      'p-highlight': props.checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  },
  box: 'p-radiobutton-box',
  input: 'p-radiobutton-input',
  icon: 'p-radiobutton-icon'
};
var RadioButtonBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'RadioButton',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    name: null,
    onChange: null,
    onClick: null,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    value: null,
    children: undefined
  },
  css: {
    classes: classes
  }
});

function ownKeys$b(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$b(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$b(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var RadioButton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = RadioButtonBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var _RadioButtonBase$setM = RadioButtonBase.setMetaData({
      props: props
    }),
    ptm = _RadioButtonBase$setM.ptm,
    cx = _RadioButtonBase$setM.cx,
    isUnstyled = _RadioButtonBase$setM.isUnstyled;
  useHandleStyle(RadioButtonBase.css.styles, isUnstyled, {
    name: 'radiobutton'
  });
  var select = function select(event) {
    onChange(event);
  };
  var onChange = function onChange(event) {
    if (props.disabled || props.readonly) {
      return;
    }
    if (props.onChange) {
      var checked = props.checked;
      var radioClicked = event.target instanceof HTMLDivElement;
      var inputClicked = event.target === inputRef.current;
      var isInputToggled = inputClicked && event.target.checked !== checked;
      var isRadioToggled = radioClicked && (DomHandler.hasClass(elementRef.current, 'p-radiobutton-checked') === checked ? !checked : false);
      var value = !checked;
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
          type: 'radio',
          name: props.name,
          id: props.id,
          value: props.value,
          checked: value
        }
      };
      if (isInputToggled || isRadioToggled) {
        var _props$onChange;
        props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, eventData);

        // do not continue if the user defined click wants to prevent
        if (event.defaultPrevented) {
          return;
        }
        if (isRadioToggled) {
          inputRef.current.checked = value;
        }
      }
      DomHandler.focus(inputRef.current);
    }
  };
  var onFocus = function onFocus(event) {
    var _props$onFocus;
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, event);
  };
  var onBlur = function onBlur(event) {
    var _props$onBlur;
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, event);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      select: select,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    if (inputRef.current) {
      inputRef.current.checked = props.checked;
    }
  }, [props.checked]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = RadioButtonBase.getOtherProps(props);
  var rootProps = mergeProps({
    id: props.id,
    className: classNames(props.className, cx('root', {
      context: context
    })),
    style: props.style,
    'data-p-checked': props.checked
  }, RadioButtonBase.getOtherProps(props), ptm('root'));
  var createInputElement = function createInputElement() {
    var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
    var inputProps = mergeProps(_objectSpread$b({
      id: props.inputId,
      type: 'radio',
      name: props.name,
      defaultChecked: props.checked,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: onChange,
      disabled: props.disabled,
      readOnly: props.readonly,
      required: props.required,
      tabIndex: props.tabIndex,
      className: cx('input')
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React.createElement("input", _extends({
      ref: inputRef
    }, inputProps));
  };
  var createBoxElement = function createBoxElement() {
    var boxProps = mergeProps({
      className: cx('box')
    }, ptm('box'));
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    return /*#__PURE__*/React.createElement("div", boxProps, /*#__PURE__*/React.createElement("div", iconProps));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
RadioButton.displayName = 'RadioButton';

var RowRadioButton = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo;
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var columnMetaData = {
      props: getColumnProps(),
      parent: props.metaData,
      hostName: props.hostName,
      state: {},
      context: {
        index: props.tabIndex,
        checked: props.checked,
        disabled: props.disabled
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(getColumnProps(), key, columnMetaData));
  };
  var onChange = function onChange(event) {
    if (!props.disabled) {
      props.onChange(event);
    }
  };
  var radioButtonProps = mergeProps({
    role: 'radio',
    'aria-checked': props.checked,
    checked: props.checked,
    disabled: props.disabled,
    name: "".concat(props.tableSelector, "_dt_radio"),
    onChange: onChange
  }, getColumnPTOptions('radiobutton'));
  return /*#__PURE__*/React.createElement(RadioButton, radioButtonProps);
});
RowRadioButton.displayName = 'RowRadioButton';

function ownKeys$a(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$a(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$a(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var BodyCell = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var _React$useState = React.useState(props.editing),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    editingState = _React$useState2[0],
    setEditingState = _React$useState2[1];
  var _React$useState3 = React.useState(props.rowData),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    editingRowDataState = _React$useState4[0],
    setEditingRowDataState = _React$useState4[1];
  var _React$useState5 = React.useState({}),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    styleObjectState = _React$useState6[0],
    setStyleObjectState = _React$useState6[1];
  var elementRef = React.useRef(null);
  var keyHelperRef = React.useRef(null);
  var overlayEventListener = React.useRef(null);
  var selfClick = React.useRef(false);
  var tabindexTimeout = React.useRef(null);
  var initFocusTimeout = React.useRef(null);
  var editingRowDataStateRef = React.useRef(null);
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnProp = function getColumnProp(name) {
    return ColumnBase.getCProp(props.column, name);
  };
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var cProps = getColumnProps();
    var columnMetaData = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        styleObject: styleObjectState,
        editing: editingState,
        editingRowData: editingRowDataState
      },
      context: {
        index: props.index,
        size: props.metaData.props.size,
        showGridlines: props.metaData.props.showGridlines
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var field = getColumnProp('field') || "field_".concat(props.index);
  var editingKey = props.dataKey ? props.rowData && props.rowData[props.dataKey] || props.rowIndex : props.rowIndex;
  var isEditable = function isEditable() {
    return getColumnProp('editor');
  };
  var cellEditValidateOnClose = function cellEditValidateOnClose() {
    return getColumnProp('cellEditValidateOnClose');
  };
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(e) {
        if (!selfClick.current && isOutsideClicked(e.target)) {
          // #2666 for overlay components and outside is clicked
          setTimeout(function () {
            switchCellToViewMode(e, true);
          }, 0);
        }
        selfClick.current = false;
      },
      options: true,
      when: isEditable()
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var isSelected = function isSelected() {
    return props.selection ? props.selection instanceof Array ? findIndex(props.selection) > -1 : equals(props.selection) : false;
  };
  var equalsData = function equalsData(data) {
    return props.compareSelectionBy === 'equals' ? data === props.rowData : ObjectUtils.equals(data, props.rowData, props.dataKey);
  };
  var equals = function equals(selectedCell) {
    return selectedCell && (selectedCell.rowIndex === props.rowIndex || equalsData(selectedCell.rowData)) && (selectedCell.field === field || selectedCell.cellIndex === props.index);
  };
  var isOutsideClicked = function isOutsideClicked(target) {
    return elementRef.current && !(elementRef.current.isSameNode(target) || elementRef.current.contains(target));
  };
  var getVirtualScrollerOption = function getVirtualScrollerOption(option) {
    return props.virtualScrollerOptions ? props.virtualScrollerOptions[option] : null;
  };
  var getStyle = function getStyle() {
    var bodyStyle = getColumnProp('bodyStyle');
    var columnStyle = getColumnProp('style');
    return getColumnProp('frozen') ? Object.assign({}, columnStyle, bodyStyle, styleObjectState) : Object.assign({}, columnStyle, bodyStyle);
  };
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
    return _objectSpread$a({
      originalEvent: event
    }, params);
  };
  var resolveFieldData = function resolveFieldData(data) {
    return ObjectUtils.resolveFieldData(data || props.rowData, field);
  };
  var getEditingRowData = function getEditingRowData() {
    return props.editingMeta && props.editingMeta[editingKey] ? props.editingMeta[editingKey].data : props.rowData;
  };
  var getTabIndex = function getTabIndex(cellSelected) {
    return props.allowCellSelection ? cellSelected ? 0 : props.rowIndex === 0 && props.index === 0 ? props.tabIndex : -1 : null;
  };
  var findIndex = function findIndex(collection) {
    return (collection || []).findIndex(function (data) {
      return equals(data);
    });
  };
  var closeCell = function closeCell(event) {
    var params = getCellCallbackParams(event);
    var onBeforeCellEditHide = getColumnProp('onBeforeCellEditHide');
    if (onBeforeCellEditHide) {
      onBeforeCellEditHide(params);
    }

    /* When using the 'tab' key, the focus event of the next cell is not called in IE. */
    setTimeout(function () {
      setEditingState(false);
      unbindDocumentClickListener();
      OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
      editingRowDataStateRef.current = null;
      selfClick.current = false;
    }, 1);
  };
  var switchCellToViewMode = function switchCellToViewMode(event, submit) {
    var callbackParams = getCellCallbackParams(event);
    var newRowData = _objectSpread$a({}, editingRowDataStateRef.current);
    var newValue = resolveFieldData(newRowData);
    var params = _objectSpread$a(_objectSpread$a({}, callbackParams), {}, {
      newRowData: newRowData,
      newValue: newValue
    });
    var onCellEditCancel = getColumnProp('onCellEditCancel');
    var cellEditValidator = getColumnProp('cellEditValidator');
    var onCellEditComplete = getColumnProp('onCellEditComplete');
    if (!submit && onCellEditCancel) {
      onCellEditCancel(params);
    }
    var valid = true;
    if ((!submit || cellEditValidateOnClose()) && cellEditValidator) {
      valid = cellEditValidator(params);
    }
    if (valid) {
      if (submit && onCellEditComplete) {
        onCellEditComplete(params);
      }
      closeCell(event);
    } else {
      event.preventDefault();
    }
    setEditingRowDataState(newRowData);
  };
  var findNextSelectableCell = function findNextSelectableCell(cell) {
    var nextCell = cell.nextElementSibling;
    return nextCell ? DomHandler.getAttribute(nextCell, 'data-p-selectable-cell') ? nextCell : findNextSelectableCell(nextCell) : null;
  };
  var findPrevSelectableCell = function findPrevSelectableCell(cell) {
    var prevCell = cell.previousElementSibling;
    return prevCell ? DomHandler.getAttribute(prevCell, 'data-p-selectable-cell') ? prevCell : findPrevSelectableCell(prevCell) : null;
  };
  var findDownSelectableCell = function findDownSelectableCell(cell) {
    var downRow = cell.parentElement.nextElementSibling;
    var downCell = downRow ? downRow.children[props.index] : null;
    return downRow && downCell ? DomHandler.getAttribute(downRow, 'data-p-selectable-row') && DomHandler.getAttribute(downCell, 'data-p-selectable-cell') ? downCell : findDownSelectableCell(downCell) : null;
  };
  var findUpSelectableCell = function findUpSelectableCell(cell) {
    var upRow = cell.parentElement.previousElementSibling;
    var upCell = upRow ? upRow.children[props.index] : null;
    return upRow && upCell ? DomHandler.getAttribute(upRow, 'data-p-selectable-row') && DomHandler.getAttribute(upCell, 'data-p-selectable-cell') ? upCell : findUpSelectableCell(upCell) : null;
  };
  var changeTabIndex = function changeTabIndex(currentCell, nextCell) {
    if (currentCell && nextCell) {
      currentCell.tabIndex = -1;
      nextCell.tabIndex = props.tabIndex;
    }
  };
  var focusOnElement = function focusOnElement() {
    clearTimeout(tabindexTimeout.current);
    tabindexTimeout.current = setTimeout(function () {
      if (editingState) {
        var focusableEl = props.editMode === 'cell' ? DomHandler.getFirstFocusableElement(elementRef.current, ':not([data-pc-section="editorkeyhelperlabel"])') : DomHandler.findSingle(elementRef.current, '[data-p-row-editor-save="true"]');
        focusableEl && focusableEl.focus();
      }
      keyHelperRef.current && (keyHelperRef.current.tabIndex = editingState ? -1 : 0);
    }, 1);
  };
  var focusOnInit = function focusOnInit() {
    clearTimeout(initFocusTimeout.current);
    initFocusTimeout.current = setTimeout(function () {
      var focusableEl = props.editMode === 'row' ? DomHandler.findSingle(elementRef.current, '[data-p-row-editor-init="true"]') : null;
      focusableEl && focusableEl.focus();
    }, 1);
  };
  var updateStickyPosition = function updateStickyPosition() {
    if (getColumnProp('frozen')) {
      var styleObject = _objectSpread$a({}, styleObjectState);
      var align = getColumnProp('alignFrozen');
      if (align === 'right') {
        var right = 0;
        var next = elementRef.current && elementRef.current.nextElementSibling;
        if (next) {
          right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
        }
        styleObject.right = right + 'px';
      } else {
        var left = 0;
        var prev = elementRef.current && elementRef.current.previousElementSibling;
        if (prev) {
          left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
        }
        styleObject.left = left + 'px';
      }
      var isSameStyle = styleObjectState.left === styleObject.left && styleObjectState.right === styleObject.right;
      !isSameStyle && setStyleObjectState(styleObject);
    }
  };
  var editorCallback = function editorCallback(val) {
    var editingRowData = _objectSpread$a({}, editingRowDataState);
    ObjectUtils.mutateFieldData(editingRowData, field, val);
    setEditingRowDataState(editingRowData);

    // update editing meta for complete methods on row mode
    var currentData = getEditingRowData();
    if (currentData) {
      ObjectUtils.mutateFieldData(currentData, field, val);
    }
  };
  var _onClick = function onClick(event) {
    var params = getCellCallbackParams(event);
    if (props.editMode !== 'row' && isEditable() && !editingState && (props.selectOnEdit || !props.selectOnEdit && props.selected)) {
      selfClick.current = true;
      var onBeforeCellEditShow = getColumnProp('onBeforeCellEditShow');
      var onCellEditInit = getColumnProp('onCellEditInit');
      var cellEditValidatorEvent = getColumnProp('cellEditValidatorEvent');
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

      // If the data is sorted using sort icon, it has been added to wait for the sort operation when any cell is wanted to be opened.
      setTimeout(function () {
        setEditingState(true);
        if (onCellEditInit) {
          if (onCellEditInit(params) === false) {
            return;
          }

          // if user prevents default stop the editor
          if (event && event.defaultPrevented) {
            return;
          }
        }
        if (cellEditValidatorEvent === 'click') {
          bindDocumentClickListener();
          overlayEventListener.current = function (e) {
            if (!isOutsideClicked(e.target)) {
              selfClick.current = true;
            }
          };
          OverlayService.on('overlay-click', overlayEventListener.current);
        }
      }, 1);
    }
    if (props.allowCellSelection && props.onClick) {
      props.onClick(params);
    }
  };
  var _onMouseDown = function onMouseDown(event) {
    var params = getCellCallbackParams(event);
    props.onMouseDown && props.onMouseDown(params);
  };
  var _onMouseUp = function onMouseUp(event) {
    var params = getCellCallbackParams(event);
    props.onMouseUp && props.onMouseUp(params);
  };
  var _onKeyDown = function onKeyDown(event) {
    if (props.editMode !== 'row') {
      if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Tab') {
        switchCellToViewMode(event, true);
      }
      if (event.code === 'Escape') {
        switchCellToViewMode(event, false);
      }
    }
    if (props.allowCellSelection) {
      var target = event.target,
        cell = event.currentTarget;
      switch (event.code) {
        case 'ArrowLeft':
          var prevCell = findPrevSelectableCell(cell);
          if (prevCell) {
            changeTabIndex(cell, prevCell);
            prevCell.focus();
          }
          event.preventDefault();
          break;
        case 'ArrowRight':
          var nextCell = findNextSelectableCell(cell);
          if (nextCell) {
            changeTabIndex(cell, nextCell);
            nextCell.focus();
          }
          event.preventDefault();
          break;
        case 'ArrowUp':
          var upCell = findUpSelectableCell(cell);
          if (upCell) {
            changeTabIndex(cell, upCell);
            upCell.focus();
          }
          event.preventDefault();
          break;
        case 'ArrowDown':
          var downCell = findDownSelectableCell(cell);
          if (downCell) {
            changeTabIndex(cell, downCell);
            downCell.focus();
          }
          event.preventDefault();
          break;
        case 'Enter':
        case 'NumpadEnter':
          if (event.shiftKey || event.ctrlKey) ; else if (!DomHandler.isClickable(target)) {
            _onClick(event);
            event.preventDefault();
          }
          break;
        case 'Space':
          if (!DomHandler.isClickable(target) && !target.readOnly) {
            _onClick(event);
            event.preventDefault();
          }
          break;
      }
    }
  };
  var _onBlur = function onBlur(event) {
    selfClick.current = false;
    if (props.editMode !== 'row' && editingState && getColumnProp('cellEditValidatorEvent') === 'blur') {
      switchCellToViewMode(event, true);
    }
  };
  var onEditorFocus = function onEditorFocus(event) {
    _onClick(event);
  };
  var onRadioChange = function onRadioChange(event) {
    props.onRadioChange({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var onCheckboxChange = function onCheckboxChange(event) {
    props.onCheckboxChange({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var onRowToggle = function onRowToggle(event) {
    props.onRowToggle({
      originalEvent: event,
      data: props.rowData
    });
    event.preventDefault();
    event.stopPropagation();
  };
  var onRowEditInit = function onRowEditInit(event) {
    props.onRowEditInit({
      originalEvent: event,
      data: props.rowData,
      newData: getEditingRowData(),
      field: field,
      index: props.rowIndex
    });
  };
  var onRowEditSave = function onRowEditSave(event) {
    props.onRowEditSave({
      originalEvent: event,
      data: props.rowData,
      newData: getEditingRowData(),
      field: field,
      index: props.rowIndex
    });
    focusOnInit();
  };
  var onRowEditCancel = function onRowEditCancel(event) {
    props.onRowEditCancel({
      originalEvent: event,
      data: props.rowData,
      newData: getEditingRowData(),
      field: field,
      index: props.rowIndex
    });
    focusOnInit();
  };
  React.useEffect(function () {
    if (getColumnProp('frozen')) {
      updateStickyPosition();
    }
    if (props.editMode === 'cell' || props.editMode === 'row') {
      focusOnElement();
    }
  });
  React.useEffect(function () {
    if (props.editMode === 'row' && props.editing !== editingState) {
      setEditingState(props.editing);
    }
  }, [props.editMode, props.editing, editingState]);
  useUpdateEffect(function () {
    if (props.editMode === 'cell' || props.editMode === 'row') {
      setEditingRowDataState(getEditingRowData());
    }
  }, [props.editingMeta]);
  React.useEffect(function () {
    if (editingRowDataState) {
      editingRowDataStateRef.current = editingRowDataState;
    }
  }, [editingRowDataState]);
  React.useEffect(function () {
    if (props.editMode === 'cell' || props.editMode === 'row') {
      var callbackParams = getCellCallbackParams();
      var params = _objectSpread$a(_objectSpread$a({}, callbackParams), {}, {
        editing: editingState,
        editingKey: editingKey
      });
      props.onEditingMetaChange(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingState]);
  useUnmountEffect(function () {
    if (overlayEventListener.current) {
      OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }
  });
  var createLoading = function createLoading() {
    var options = getVirtualScrollerOption('getLoaderOptions')(props.rowIndex, {
      cellIndex: props.index,
      cellFirst: props.index === 0,
      cellLast: props.index === getVirtualScrollerOption('columns').length - 1,
      cellEven: props.index % 2 === 0,
      cellOdd: props.index % 2 !== 0,
      column: props.column,
      field: field
    });
    var content = ObjectUtils.getJSXElement(getVirtualScrollerOption('loadingTemplate'), options);
    var bodyCellProps = mergeProps(getColumnPTOptions('bodyCell'), {
      role: 'cell'
    });
    return /*#__PURE__*/React.createElement("td", bodyCellProps, content);
  };
  var createElement = function createElement() {
    var content;
    var editorKeyHelper;
    var cellSelected = props.allowCellSelection && isSelected();
    var isRowEditor = props.editMode === 'row';
    var tabIndex = getTabIndex(cellSelected);
    var selectionMode = getColumnProp('selectionMode');
    var rowReorder = getColumnProp('rowReorder');
    var header = getColumnProp('header');
    var body = getColumnProp('body');
    var editor = getColumnProp('editor');
    var frozen = getColumnProp('frozen');
    var align = getColumnProp('align');
    var value = resolveFieldData();
    var columnBodyOptions = {
      column: props.column,
      field: field,
      rowIndex: props.rowIndex,
      frozenRow: props.frozenRow,
      props: props.tableProps
    };
    var rowEditor = ObjectUtils.getPropValue(getColumnProp('rowEditor'), props.rowData, columnBodyOptions);
    var expander = ObjectUtils.getPropValue(getColumnProp('expander'), props.rowData, columnBodyOptions);
    var cellClassName = ObjectUtils.getPropValue(props.cellClassName, value, columnBodyOptions);
    var bodyClassName = ObjectUtils.getPropValue(getColumnProp('bodyClassName'), props.rowData, columnBodyOptions);
    var style = getStyle();
    var columnTitleProps = mergeProps({
      className: cx('columnTitle')
    }, getColumnPTOptions('columnTitle'));
    var title = props.responsiveLayout === 'stack' && /*#__PURE__*/React.createElement("span", columnTitleProps, ObjectUtils.getJSXElement(header, {
      props: props.tableProps
    }));
    if (selectionMode) {
      var showSelection = props.showSelectionElement ? props.showSelectionElement(props.rowData, {
        rowIndex: props.rowIndex,
        props: props.tableProps
      }) : true;
      var label;
      if (showSelection) {
        var ariaLabelField = props.selectionAriaLabel || props.tableProps.dataKey;
        var ariaLabelText = ObjectUtils.resolveFieldData(props.rowData, ariaLabelField);
        label = "".concat(props.selected ? ariaLabel$1('unselectLabel') : ariaLabel$1('selectLabel'), " ").concat(ariaLabelText);
      }
      content = showSelection && /*#__PURE__*/React.createElement(React.Fragment, null, selectionMode === 'single' && /*#__PURE__*/React.createElement(RowRadioButton, {
        hostName: props.hostName,
        column: props.column,
        checked: props.selected,
        disabled: !props.isSelectable({
          data: props.rowData,
          index: props.rowIndex
        }),
        onChange: onRadioChange,
        tabIndex: props.tabIndex,
        tableSelector: props.tableSelector,
        ariaLabel: label,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData
      }), selectionMode === 'multiple' && /*#__PURE__*/React.createElement(RowCheckbox, {
        hostName: props.hostName,
        column: props.column,
        checked: props.selected,
        disabled: !props.isSelectable({
          data: props.rowData,
          index: props.rowIndex
        }),
        onChange: onCheckboxChange,
        tabIndex: props.tabIndex,
        ariaLabel: label,
        checkIcon: props.checkIcon,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData
      }));
    } else if (rowReorder) {
      var showReorder = props.showRowReorderElement ? props.showRowReorderElement(props.rowData, {
        rowIndex: props.rowIndex,
        props: props.tableProps
      }) : true;
      var customIcon = getColumnProp('rowReorderIcon');
      var rowReorderIconProps = mergeProps({
        className: cx('rowReorderIcon')
      }, customIcon ? null : getColumnPTOptions('rowReorderIcon'));
      var rowReorderIcon = customIcon || /*#__PURE__*/React.createElement(BarsIcon, rowReorderIconProps);
      content = showReorder ? IconUtils.getJSXIcon(rowReorderIcon, _objectSpread$a({}, rowReorderIconProps), {
        props: props
      }) : null;
    } else if (expander) {
      var rowTogglerIconProps = mergeProps({
        className: cx('rowTogglerIcon'),
        'aria-hidden': true
      }, getColumnPTOptions('rowTogglerIcon'));
      var icon = props.expanded ? props.expandedRowIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, rowTogglerIconProps) : props.collapsedRowIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, rowTogglerIconProps);
      var togglerIcon = IconUtils.getJSXIcon(icon, _objectSpread$a({}, rowTogglerIconProps), {
        props: props
      });
      var ariaControls = "".concat(props.tableSelector, "_content_").concat(props.rowIndex, "_expanded");
      var _ariaLabelField = props.selectionAriaLabel || props.tableProps.dataKey;
      var _ariaLabelText = ObjectUtils.resolveFieldData(props.rowData, _ariaLabelField);
      var _label = "".concat(props.expanded ? ariaLabel$1('collapseLabel') : ariaLabel$1('expandLabel'), " ").concat(_ariaLabelText);
      var expanderProps = {
        onClick: onRowToggle,
        className: cx('rowToggler')
      };
      var rowTogglerProps = mergeProps(_objectSpread$a(_objectSpread$a({}, expanderProps), {}, {
        type: 'button',
        'aria-expanded': props.expanded,
        'aria-controls': ariaControls,
        tabIndex: props.tabIndex,
        'aria-label': _label
      }), getColumnPTOptions('rowToggler'));
      content = /*#__PURE__*/React.createElement("button", rowTogglerProps, togglerIcon, /*#__PURE__*/React.createElement(Ripple, null));
      if (body) {
        expanderProps.element = content;
        content = ObjectUtils.getJSXElement(body, props.rowData, {
          column: props.column,
          field: field,
          rowIndex: props.rowIndex,
          frozenRow: props.frozenRow,
          props: props.tableProps,
          expander: expanderProps
        });
      }
    } else if (isRowEditor && rowEditor) {
      var rowEditorProps = {};
      var rowEditorSaveIconProps = mergeProps({
        className: cx('rowEditorSaveIcon')
      }, getColumnPTOptions('rowEditorSaveIcon'));
      var rowEditorCancelIconProps = mergeProps({
        className: cx('rowEditorCancelIcon')
      }, getColumnPTOptions('rowEditorCancelIcon'));
      var rowEditorInitIconProps = mergeProps({
        className: cx('rowEditorInitIcon')
      }, getColumnPTOptions('rowEditorInitIcon'));
      var rowEditorSaveIcon = IconUtils.getJSXIcon(props.rowEditorSaveIcon || /*#__PURE__*/React.createElement(CheckIcon, rowEditorSaveIconProps), _objectSpread$a({}, rowEditorSaveIconProps), {
        props: props
      });
      var rowEditorCancelIcon = IconUtils.getJSXIcon(props.rowEditorCancelIcon || /*#__PURE__*/React.createElement(TimesIcon, rowEditorCancelIconProps), _objectSpread$a({}, rowEditorCancelIconProps), {
        props: props
      });
      var rowEditorInitIcon = IconUtils.getJSXIcon(props.rowEditorInitIcon || /*#__PURE__*/React.createElement(PencilIcon, rowEditorInitIconProps), _objectSpread$a({}, rowEditorInitIconProps), {
        props: props
      });
      if (editingState) {
        rowEditorProps = {
          editing: true,
          onSaveClick: onRowEditSave,
          saveClassName: cx('rowEditorSaveButton'),
          onCancelClick: onRowEditCancel,
          cancelClassName: cx('rowEditorCancelButton')
        };
        var rowEditorSaveButtonProps = mergeProps({
          type: 'button',
          name: 'row-save',
          'aria-label': ariaLabel$1('saveEdit'),
          onClick: rowEditorProps.onSaveClick,
          className: rowEditorProps.saveClassName,
          tabIndex: props.tabIndex,
          'data-p-row-editor-save': true
        }, getColumnPTOptions('rowEditorSaveButton'));
        var rowEditorCancelButtonProps = mergeProps({
          type: 'button',
          name: 'row-cancel',
          'aria-label': ariaLabel$1('cancelEdit'),
          onClick: rowEditorProps.onCancelClick,
          className: rowEditorProps.cancelClassName,
          tabIndex: props.tabIndex
        }, getColumnPTOptions('rowEditorCancelButton'));
        content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", rowEditorSaveButtonProps, rowEditorSaveIcon, /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("button", rowEditorCancelButtonProps, rowEditorCancelIcon, /*#__PURE__*/React.createElement(Ripple, null)));
      } else {
        rowEditorProps = {
          editing: false,
          onInitClick: onRowEditInit,
          initClassName: cx('rowEditorInitButton')
        };
        var rowEditorInitButtonProps = mergeProps({
          type: 'button',
          name: 'row-edit',
          'aria-label': ariaLabel$1('editRow'),
          onClick: rowEditorProps.onInitClick,
          className: rowEditorProps.initClassName,
          tabIndex: props.tabIndex,
          'data-p-row-editor-init': true
        }, getColumnPTOptions('rowEditorInitButton'));
        content = /*#__PURE__*/React.createElement("button", rowEditorInitButtonProps, rowEditorInitIcon, /*#__PURE__*/React.createElement(Ripple, null));
      }
      if (body) {
        rowEditorProps.element = content;
        content = ObjectUtils.getJSXElement(body, props.rowData, {
          column: props.column,
          field: field,
          rowIndex: props.rowIndex,
          frozenRow: props.frozenRow,
          props: props.tableProps,
          rowEditor: rowEditorProps
        });
      }
    } else if (body && (!editingState || !editor)) {
      content = body ? ObjectUtils.getJSXElement(body, props.rowData, {
        column: props.column,
        field: field,
        rowIndex: props.rowIndex,
        frozenRow: props.frozenRow,
        props: props.tableProps
      }) : value;
    } else if (editor && editingState) {
      content = ObjectUtils.getJSXElement(editor, {
        rowData: editingRowDataState,
        value: resolveFieldData(editingRowDataState),
        column: props.column,
        field: field,
        rowIndex: props.rowIndex,
        frozenRow: props.frozenRow,
        props: props.tableProps,
        editorCallback: editorCallback
      });
    } else {
      content = value;
    }
    content = typeof content === 'boolean' ? content.toString() : content;
    if (!isRowEditor && editor) {
      var editorKeyHelperProps = mergeProps({
        tabIndex: '0',
        className: 'p-cell-editor-key-helper p-hidden-accessible',
        onFocus: function onFocus(e) {
          return onEditorFocus(e);
        }
      }, getColumnPTOptions('editorKeyHelperLabel'));
      var editorKeyHelperLabelProps = mergeProps(getColumnPTOptions('editorKeyHelper'));
      /* eslint-disable */
      editorKeyHelper = /*#__PURE__*/React.createElement("a", _extends({
        ref: keyHelperRef
      }, editorKeyHelperProps), /*#__PURE__*/React.createElement("span", editorKeyHelperLabelProps));
      /* eslint-enable */
    }

    var bodyCellProps = mergeProps({
      style: style,
      className: classNames(bodyClassName, getColumnProp('className'), cellClassName, cx('bodyCell', {
        selectionMode: selectionMode,
        editor: editor,
        editingState: editingState,
        frozen: frozen,
        cellSelected: cellSelected,
        align: align,
        bodyProps: props,
        getCellParams: getCellParams
      })),
      rowSpan: props.rowSpan,
      tabIndex: tabIndex,
      role: 'cell',
      onClick: function onClick(e) {
        return _onClick(e);
      },
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onBlur: function onBlur(e) {
        return _onBlur(e);
      },
      onMouseDown: function onMouseDown(e) {
        return _onMouseDown(e);
      },
      onMouseUp: function onMouseUp(e) {
        return _onMouseUp(e);
      },
      'data-p-selectable-cell': props.allowCellSelection && props.isSelectable({
        data: getCellParams(),
        index: props.rowIndex
      }),
      'data-p-selection-column': getColumnProp('selectionMode') != null,
      'data-p-editable-column': isEditable() != null,
      'data-p-cell-editing': editingState,
      'data-p-frozen-column': frozen
    }, getColumnPTOptions('root'), getColumnPTOptions('bodyCell'));
    return /*#__PURE__*/React.createElement("td", _extends({
      ref: elementRef
    }, bodyCellProps), editorKeyHelper, title, content);
  };
  return getVirtualScrollerOption('loading') ? createLoading() : createElement();
});
BodyCell.displayName = 'BodyCell';

function ownKeys$9(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$9(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$9(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var BodyRow = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    editingState = _React$useState2[0],
    setEditingState = _React$useState2[1];
  var editing = props.onRowEditChange ? props.editing : editingState;
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    cx = _props$ptCallbacks.cx;
  var getBodyRowPTOptions = function getBodyRowPTOptions(key) {
    return ptm(key, {
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        editing: editing
      },
      context: {
        index: props.index,
        selectable: props.allowRowSelection && props.isSelectable({
          data: props.rowData,
          index: props.rowIndex
        }),
        selected: !props.allowCellSelection && props.selected || props.contextMenuSelected,
        stripedRows: props.metaData.props.stripedRows
      }
    });
  };
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var isFocusable = function isFocusable() {
    return props.selectionMode && props.selectionModeInColumn !== 'single' && props.selectionModeInColumn !== 'multiple';
  };
  var isGrouped = function isGrouped(column) {
    var columnField = getColumnProp(column, 'field');
    if (props.groupRowsBy && columnField) {
      return Array.isArray(props.groupRowsBy) ? props.groupRowsBy.indexOf(columnField) > -1 : props.groupRowsBy === columnField;
    }
    return false;
  };
  var equals = function equals(data1, data2) {
    return props.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, props.dataKey);
  };
  var getTabIndex = function getTabIndex() {
    return isFocusable() && !props.allowCellSelection ? props.rowIndex === 0 ? props.tabIndex : -1 : null;
  };
  var findIndex = function findIndex(collection, rowData) {
    return (collection || []).findIndex(function (data) {
      return equals(rowData, data);
    });
  };
  var changeTabIndex = function changeTabIndex(currentRow, nextRow) {
    if (currentRow && nextRow) {
      currentRow.tabIndex = -1;
      nextRow.tabIndex = props.tabIndex;
    }
  };
  var findFirstSelectableRow = function findFirstSelectableRow(row) {
    var firstRow = DomHandler.findSingle(row.parentNode, 'tr[data-p-selectable-row]');
    return firstRow ? firstRow : null;
  };
  var findNextSelectableRow = function findNextSelectableRow(row) {
    var nextRow = row.nextElementSibling;
    return nextRow ? DomHandler.getAttribute(nextRow, 'data-p-selectable-row') === true ? nextRow : findNextSelectableRow(nextRow) : null;
  };
  var findPrevSelectableRow = function findPrevSelectableRow(row) {
    var prevRow = row.previousElementSibling;
    return prevRow ? DomHandler.getAttribute(prevRow, 'data-p-selectable-row') === true ? prevRow : findPrevSelectableRow(prevRow) : null;
  };
  var findLastSelectableRow = function findLastSelectableRow(row) {
    var lastRow = DomHandler.findSingle(row.parentNode, 'tr[data-p-selectable-row]:last-child');
    return lastRow ? lastRow : null;
  };
  var shouldRenderBodyCell = function shouldRenderBodyCell(value, column, i) {
    if (getColumnProp(column, 'hidden')) {
      return false;
    } else if (props.rowGroupMode && props.rowGroupMode === 'rowspan' && isGrouped(column)) {
      var prevRowData = value[i - 1];
      if (prevRowData) {
        var currentRowFieldData = ObjectUtils.resolveFieldData(value[i], getColumnProp(column, 'field'));
        var previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, getColumnProp(column, 'field'));
        return currentRowFieldData !== previousRowFieldData;
      }
    }
    return true;
  };
  var calculateRowGroupSize = function calculateRowGroupSize(value, column, index) {
    if (isGrouped(column)) {
      var currentRowFieldData = ObjectUtils.resolveFieldData(value[index], getColumnProp(column, 'field'));
      var nextRowFieldData = currentRowFieldData;
      var groupRowSpan = 0;
      while (currentRowFieldData === nextRowFieldData) {
        groupRowSpan++;
        var nextRowData = value[++index];
        if (nextRowData) {
          nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, getColumnProp(column, 'field'));
        } else {
          break;
        }
      }
      return groupRowSpan === 1 ? null : groupRowSpan;
    }
    return null;
  };
  var _onClick = function onClick(event) {
    props.onRowClick({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onDoubleClick = function onDoubleClick(event) {
    props.onRowDoubleClick({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onPointerDown = function onPointerDown(event) {
    props.onRowPointerDown({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onPointerUp = function onPointerUp(event) {
    props.onRowPointerUp({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var onRightClick = function onRightClick(event) {
    props.onRowRightClick({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onMouseEnter = function onMouseEnter(event) {
    props.onRowMouseEnter({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onMouseLeave = function onMouseLeave(event) {
    props.onRowMouseLeave({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onTouchEnd = function onTouchEnd(event) {
    props.onRowTouchEnd(event);
  };
  var _onKeyDown = function onKeyDown(event) {
    if (isFocusable() && !props.allowCellSelection) {
      var target = event.target,
        row = event.currentTarget;
      switch (event.code) {
        case 'ArrowDown':
          onArrowDownKey(row, event);
          break;
        case 'ArrowUp':
          onArrowUpKey(row, event);
          break;
        case 'Home':
          onHomeKey(row, event);
          break;
        case 'End':
          onEndKey(row, event);
          break;
        case 'Enter':
        case 'NumpadEnter':
          onEnterKey(row, event, target);
          break;
        case 'Space':
          onSpaceKey(row, event, target);
          break;
        case 'Tab':
          onTabKey(row, event);
          break;
      }
    }
  };
  var onArrowDownKey = function onArrowDownKey(row, event) {
    var nextRow = findNextSelectableRow(row);
    if (nextRow) {
      changeTabIndex(row, nextRow);
      nextRow.focus();
    }
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(row, event) {
    var prevRow = findPrevSelectableRow(row);
    if (prevRow) {
      changeTabIndex(row, prevRow);
      prevRow.focus();
    }
    event.preventDefault();
  };
  var onHomeKey = function onHomeKey(row, event) {
    var firstRow = findFirstSelectableRow(row);
    if (firstRow) {
      changeTabIndex(row, firstRow);
      firstRow.focus();
    }
    event.preventDefault();
  };
  var onEndKey = function onEndKey(row, event) {
    var lastRow = findLastSelectableRow(row);
    if (lastRow) {
      changeTabIndex(row, lastRow);
      lastRow.focus();
    }
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(row, event, target) {
    if (!DomHandler.isClickable(target)) {
      _onClick(event);
      event.preventDefault();
    }
  };
  var onSpaceKey = function onSpaceKey(row, event, target) {
    if (!DomHandler.isClickable(target) && !target.readOnly) {
      _onClick(event);
      event.preventDefault();
    }
  };
  var onTabKey = function onTabKey(row, event) {
    var parent = row.parentNode;
    var rows = DomHandler.find(parent, 'tr[data-p-selectable-row="true"]');
    if (event.code === 'Tab' && rows && rows.length > 0) {
      var firstSelectedRow = DomHandler.findSingle(parent, 'tr[data-p-highlight="true"]');
      var focusedItem = DomHandler.findSingle(parent, 'tr[data-p-selectable-row="true"][tabindex="0"]');
      if (firstSelectedRow) {
        firstSelectedRow.tabIndex = '0';
        focusedItem && focusedItem !== firstSelectedRow && (focusedItem.tabIndex = '-1');
      } else {
        rows[0].tabIndex = '0';
        focusedItem !== rows[0] && (rows[props.rowIndex].tabIndex = '-1');
      }
    }
  };
  var _onMouseDown = function onMouseDown(event) {
    props.onRowMouseDown({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onMouseUp = function onMouseUp(event) {
    props.onRowMouseUp({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onDragStart = function onDragStart(event) {
    props.onRowDragStart({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onDragOver = function onDragOver(event) {
    props.onRowDragOver({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onDragLeave = function onDragLeave(event) {
    props.onRowDragLeave({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onDragEnd = function onDragEnd(event) {
    props.onRowDragEnd({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var _onDrop = function onDrop(event) {
    props.onRowDrop({
      originalEvent: event,
      data: props.rowData,
      index: props.rowIndex
    });
  };
  var onEditChange = function onEditChange(e, isEditing) {
    if (props.onRowEditChange) {
      var editingRows;
      var dataKey = props.dataKey;
      var originalEvent = e.originalEvent,
        data = e.data,
        index = e.index,
        newData = e.newData;
      if (dataKey) {
        var dataKeyValue = String(ObjectUtils.resolveFieldData(data, dataKey));
        editingRows = props.editingRows ? _objectSpread$9({}, props.editingRows) : {};
        if (!isEditing) {
          delete editingRows[dataKeyValue];
          // if the key value was changed, stop editing for the new key value too
          var newDataKeyValue = String(ObjectUtils.resolveFieldData(newData, dataKey));
          delete editingRows[newDataKeyValue];
        } else {
          editingRows[dataKeyValue] = true;
        }
      } else {
        var editingRowIndex = findIndex(props.editingRows, data);
        editingRows = props.editingRows ? _toConsumableArray(props.editingRows) : [];
        if (editingRowIndex !== -1) {
          editingRows = editingRows.filter(function (val, i) {
            return i !== editingRowIndex;
          });
        } else {
          editingRows.push(data);
        }
      }
      props.onRowEditChange({
        originalEvent: originalEvent,
        data: editingRows,
        index: index
      });
    } else {
      setEditingState(isEditing);
    }
  };
  var onEditInit = function onEditInit(e) {
    var event = e.originalEvent;
    if (props.onRowEditInit) {
      props.onRowEditInit({
        originalEvent: event,
        data: props.rowData,
        index: props.rowIndex
      });
    }
    onEditChange(e, true);
    event.preventDefault();
  };
  var onEditSave = function onEditSave(e) {
    var event = e.originalEvent,
      newData = e.newData;
    var valid = props.rowEditValidator ? props.rowEditValidator(newData, {
      props: props.tableProps,
      rowIndex: props.rowIndex
    }) : true;
    if (props.onRowEditSave) {
      props.onRowEditSave({
        originalEvent: event,
        data: props.rowData,
        index: props.rowIndex,
        newData: newData,
        valid: valid
      });
    }
    if (valid) {
      if (props.onRowEditComplete) {
        props.onRowEditComplete(e);
      }
      onEditChange(e, false);
    }
    event.preventDefault();
  };
  var onEditCancel = function onEditCancel(e) {
    var event = e.originalEvent;
    if (props.onRowEditCancel) {
      props.onRowEditCancel({
        originalEvent: event,
        data: props.rowData,
        index: props.rowIndex
      });
    }
    onEditChange(e, false);
    event.preventDefault();
  };
  var createContent = function createContent() {
    return props.columns.map(function (col, i) {
      if (shouldRenderBodyCell(props.value, col, props.index)) {
        var key = "".concat(props.rowIndex, "_").concat(getColumnProp(col, 'columnKey') || getColumnProp(col, 'field'), "_").concat(i);
        var rowSpan = props.rowGroupMode === 'rowspan' ? calculateRowGroupSize(props.value, col, props.index) : null;
        return /*#__PURE__*/React.createElement(BodyCell, {
          hostName: props.hostName,
          key: key,
          allowCellSelection: props.allowCellSelection,
          cellClassName: props.cellClassName,
          checkIcon: props.checkIcon,
          collapsedRowIcon: props.collapsedRowIcon,
          column: col,
          compareSelectionBy: props.compareSelectionBy,
          dataKey: props.dataKey,
          editMode: props.editMode,
          editing: editing,
          editingMeta: props.editingMeta,
          expanded: props.expanded,
          expandedRowIcon: props.expandedRowIcon,
          frozenRow: props.frozenRow,
          index: i,
          isSelectable: props.isSelectable,
          onCheckboxChange: props.onCheckboxChange,
          onClick: props.onCellClick,
          onEditingMetaChange: props.onEditingMetaChange,
          onMouseDown: props.onCellMouseDown,
          onMouseUp: props.onCellMouseUp,
          onRadioChange: props.onRadioChange,
          onRowEditCancel: onEditCancel,
          onRowEditInit: onEditInit,
          onRowEditSave: onEditSave,
          onRowToggle: props.onRowToggle,
          responsiveLayout: props.responsiveLayout,
          rowData: props.rowData,
          rowEditorCancelIcon: props.rowEditorCancelIcon,
          rowEditorInitIcon: props.rowEditorInitIcon,
          rowEditorSaveIcon: props.rowEditorSaveIcon,
          rowIndex: props.rowIndex,
          rowSpan: rowSpan,
          selectOnEdit: props.selectOnEdit,
          selected: props.selected,
          selection: props.selection,
          selectionAriaLabel: props.tableProps.selectionAriaLabel,
          showRowReorderElement: props.showRowReorderElement,
          showSelectionElement: props.showSelectionElement,
          tabIndex: props.tabIndex,
          tableProps: props.tableProps,
          tableSelector: props.tableSelector,
          value: props.value,
          virtualScrollerOptions: props.virtualScrollerOptions,
          ptCallbacks: props.ptCallbacks,
          metaData: props.metaData
        });
      }
      return null;
    });
  };
  var rowClassName = ObjectUtils.getPropValue(props.rowClassName, props.rowData, {
    props: props.tableProps
  });
  var style = {
    height: props.virtualScrollerOptions ? props.virtualScrollerOptions.itemSize : undefined
  };
  var content = createContent();
  var tabIndex = getTabIndex();
  var rowProps = mergeProps({
    role: 'row',
    tabIndex: tabIndex,
    className: classNames(cx('bodyRow', {
      rowProps: props
    })),
    style: style,
    onMouseDown: function onMouseDown(e) {
      return _onMouseDown(e);
    },
    onMouseUp: function onMouseUp(e) {
      return _onMouseUp(e);
    },
    onMouseEnter: function onMouseEnter(e) {
      return _onMouseEnter(e);
    },
    onMouseLeave: function onMouseLeave(e) {
      return _onMouseLeave(e);
    },
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onDoubleClick: function onDoubleClick(e) {
      return _onDoubleClick(e);
    },
    onPointerDown: function onPointerDown(e) {
      return _onPointerDown(e);
    },
    onPointerUp: function onPointerUp(e) {
      return _onPointerUp(e);
    },
    onContextMenu: function onContextMenu(e) {
      return onRightClick(e);
    },
    onTouchEnd: function onTouchEnd(e) {
      return _onTouchEnd(e);
    },
    onKeyDown: function onKeyDown(e) {
      return _onKeyDown(e);
    },
    onDragStart: function onDragStart(e) {
      return _onDragStart(e);
    },
    onDragOver: function onDragOver(e) {
      return _onDragOver(e);
    },
    onDragLeave: function onDragLeave(e) {
      return _onDragLeave(e);
    },
    onDragEnd: function onDragEnd(e) {
      return _onDragEnd(e);
    },
    onDrop: function onDrop(e) {
      return _onDrop(e);
    },
    'aria-selected': props !== null && props !== void 0 && props.selectionMode ? props.selected : null,
    'data-p-selectable-row': props.allowRowSelection && props.isSelectable({
      data: props.rowData,
      index: props.rowIndex
    }),
    'data-p-highlight': props.selected,
    'data-p-highlight-contextmenu': props.contextMenuSelected
  }, getBodyRowPTOptions('bodyRow'), {
    className: classNames(rowClassName) // #5983 must be last so all unstyled merging takes place first
  });

  return /*#__PURE__*/React.createElement("tr", rowProps, content);
});
BodyRow.displayName = 'BodyRow';

function ownKeys$8(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$8(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$8(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var RowTogglerButton = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var _onClick = function onClick(event) {
    props.onClick({
      originalEvent: event,
      data: props.rowData
    });
  };
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var cProps = getColumnProps();
    var columnMetaData = {
      props: getColumnProps(),
      parent: props.metaData,
      hostName: props.hostName
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var rowGroupTogglerIconProps = mergeProps({
    className: cx('rowGroupTogglerIcon'),
    'aria-hidden': true
  }, getColumnPTOptions('rowGroupTogglerIcon'));
  var icon = props.expanded ? props.expandedRowIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, rowGroupTogglerIconProps) : props.collapsedRowIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, rowGroupTogglerIconProps);
  var togglerIcon = IconUtils.getJSXIcon(icon, _objectSpread$8({}, rowGroupTogglerIconProps), {
    props: props
  });
  var label = props.expanded ? ariaLabel$1('collapseLabel') : ariaLabel$1('expandLabel');
  var rowGroupTogglerProps = mergeProps({
    type: 'button',
    onClick: function onClick(e) {
      return _onClick(e);
    },
    className: cx('rowGroupToggler'),
    tabIndex: props.tabIndex,
    'aria-label': label
  }, getColumnPTOptions('rowGroupToggler'));
  return /*#__PURE__*/React.createElement("button", rowGroupTogglerProps, togglerIcon, /*#__PURE__*/React.createElement(Ripple, null));
});
RowTogglerButton.displayName = 'RowTogglerButton';

var _excluded = ["originalEvent"];
function ownKeys$7(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$7(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$7(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TableBody = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx,
    isUnsyled = _props$ptCallbacks.isUnsyled;
  var _React$useState = React.useState({}),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    rowGroupHeaderStyleObjectState = _React$useState2[0],
    setRowGroupHeaderStyleObjectState = _React$useState2[1];
  var getColumnProps = function getColumnProps(column) {
    return ColumnBase.getCProps(column);
  };
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var cProps = getColumnProps(props.column);
    var columnMetaData = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        rowGroupHeaderStyleObject: rowGroupHeaderStyleObjectState
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var elementRef = React.useRef(null);
  var refCallback = React.useCallback(function (el) {
    elementRef.current = el;
    props.virtualScrollerContentRef && props.virtualScrollerContentRef(el);
  }, [props]);
  var dragSelectionHelper = React.useRef(null);
  var initialDragPosition = React.useRef(null);
  var anchorRowIndex = React.useRef(null);
  var anchorCellIndex = React.useRef(null);
  var rangeRowIndex = React.useRef(null);
  var anchorRowFirst = React.useRef(null);
  var rowTouched = React.useRef(false);
  var rowDragging = React.useRef(false);
  var draggedRowIndex = React.useRef(null);
  var droppedRowIndex = React.useRef(null);
  var isSubheaderGrouping = props.rowGroupMode && props.rowGroupMode === 'subheader';
  var isRadioSelectionMode = props.selectionMode === 'radiobutton';
  var isCheckboxSelectionMode = props.selectionMode === 'checkbox';
  var isRadioSelectionModeInColumn = props.selectionModeInColumn === 'single';
  var isCheckboxSelectionModeInColumn = props.selectionModeInColumn === 'multiple';
  var equals = function equals(data1, data2) {
    if (allowCellSelection()) {
      return (data1.rowIndex === data2.rowIndex || data1.rowData === data2.rowData) && (data1.field === data2.field || data1.cellIndex === data2.cellIndex);
    }
    return props.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, props.dataKey);
  };
  var isSelectionEnabled = function isSelectionEnabled() {
    return props.selectionMode || props.selectionModeInColumn !== null || props.columns && props.columns.some(function (col) {
      return col && !!getColumnProp(col, 'selectionMode');
    });
  };
  var isSingleSelection = function isSingleSelection() {
    return props.selectionMode === 'single' && !isCheckboxSelectionModeInColumn || !isRadioSelectionMode && isRadioSelectionModeInColumn;
  };
  var isMultipleSelection = function isMultipleSelection() {
    return props.selectionMode === 'multiple' && !isRadioSelectionModeInColumn || isCheckboxSelectionModeInColumn;
  };
  var isRadioOnlySelection = function isRadioOnlySelection() {
    return isRadioSelectionMode && isRadioSelectionModeInColumn;
  };
  var isCheckboxOnlySelection = function isCheckboxOnlySelection() {
    return isCheckboxSelectionMode && isCheckboxSelectionModeInColumn;
  };
  var isSelected = function isSelected(rowData) {
    if (rowData && props.selection) {
      return props.selection instanceof Array ? findIndex(props.selection, rowData) > -1 : equals(rowData, props.selection);
    }
    return false;
  };
  var isContextMenuSelected = function isContextMenuSelected(rowData) {
    if (rowData && props.contextMenuSelection) {
      return equals(rowData, props.contextMenuSelection);
    }
    return false;
  };
  var isSelectable = function isSelectable(options) {
    return props.isDataSelectable ? props.isDataSelectable(options) : true;
  };
  var isRowExpanded = function isRowExpanded(rowData) {
    if (rowData && props.expandedRows) {
      if (isSubheaderGrouping && props.expandableRowGroups) {
        return isRowGroupExpanded(rowData);
      }
      if (props.dataKey) {
        var rowId = ObjectUtils.resolveFieldData(rowData, props.dataKey);
        var expanded = false;
        if (props.expandedRows) {
          if (Array.isArray(props.expandedRows)) {
            expanded = props.expandedRows.some(function (row) {
              return ObjectUtils.resolveFieldData(row, props.dataKey) === rowId;
            });
          } else {
            expanded = props.expandedRows[rowId] !== undefined;
          }
        }
        return expanded;
      }
      return findIndex(props.expandedRows, rowData) !== -1;
    }
    return false;
  };
  var isRowGroupExpanded = function isRowGroupExpanded(rowData) {
    if (props.dataKey === props.groupRowsBy) {
      return Object.keys(props.expandedRows).some(function (data) {
        return ObjectUtils.equals(data, ObjectUtils.resolveFieldData(rowData, props.dataKey));
      });
    }
    return props.expandedRows.some(function (data) {
      return ObjectUtils.equals(data, rowData, props.groupRowsBy);
    });
  };
  var isRowEditing = function isRowEditing(rowData) {
    if (props.editMode === 'row' && rowData && props.editingRows) {
      if (props.dataKey) {
        return props.editingRows ? props.editingRows[ObjectUtils.resolveFieldData(rowData, props.dataKey)] !== undefined : false;
      }
      return findIndex(props.editingRows, rowData) !== -1;
    }
    return false;
  };
  var allowDrag = function allowDrag(event) {
    return props.dragSelection && isMultipleSelection() && !event.originalEvent.shiftKey;
  };
  var allowRowDrag = function allowRowDrag(event) {
    return !allowCellSelection() && allowDrag(event) || props.reorderableRows;
  };
  var allowCellDrag = function allowCellDrag(event) {
    return allowCellSelection() && allowDrag(event);
  };
  var allowSelection = function allowSelection(event) {
    return !DomHandler.isClickable(event.originalEvent.target);
  };
  var allowMetaKeySelection = function allowMetaKeySelection(event) {
    return !rowTouched.current && (!props.metaKeySelection || props.metaKeySelection && (event.originalEvent.metaKey || event.originalEvent.ctrlKey));
  };
  var allowRangeSelection = function allowRangeSelection(event) {
    return isMultipleSelection() && event.originalEvent.shiftKey && anchorRowIndex.current !== null;
  };
  var allowRowSelection = function allowRowSelection() {
    return (props.selectionMode || props.selectionModeInColumn) && !isRadioOnlySelection() && !isCheckboxOnlySelection();
  };
  var allowCellSelection = function allowCellSelection() {
    return props.cellSelection && !isRadioSelectionModeInColumn && !isCheckboxSelectionModeInColumn;
  };
  var getColumnsLength = function getColumnsLength() {
    return props.columns ? props.columns.length : 0;
  };
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var getVirtualScrollerOption = function getVirtualScrollerOption(option, options) {
    options = options || props.virtualScrollerOptions;
    return options ? options[option] : null;
  };
  var findIndex = function findIndex(collection, rowData) {
    return (collection || []).findIndex(function (data) {
      return equals(rowData, data);
    });
  };
  var rowGroupHeaderStyle = function rowGroupHeaderStyle() {
    if (props.scrollable) {
      return {
        top: rowGroupHeaderStyleObjectState.top
      };
    }
    return null;
  };
  var getRowKey = function getRowKey(rowData, index) {
    return props.dataKey ? ObjectUtils.resolveFieldData(rowData, props.dataKey) : index;
  };
  var shouldRenderRowGroupHeader = function shouldRenderRowGroupHeader(value, rowData, i) {
    var currentRowFieldData = ObjectUtils.resolveFieldData(rowData, props.groupRowsBy);
    var prevRowData = value[i - 1];
    if (prevRowData) {
      var previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, props.groupRowsBy);
      return !ObjectUtils.deepEquals(currentRowFieldData, previousRowFieldData);
    }
    return true;
  };
  var shouldRenderRowGroupFooter = function shouldRenderRowGroupFooter(value, rowData, i, expanded) {
    if (props.expandableRowGroups && !expanded) {
      return false;
    }
    var currentRowFieldData = ObjectUtils.resolveFieldData(rowData, props.groupRowsBy);
    var nextRowData = value[i + 1];
    if (nextRowData) {
      var nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, props.groupRowsBy);
      return !ObjectUtils.deepEquals(currentRowFieldData, nextRowFieldData);
    }
    return true;
  };
  var updateFrozenRowStickyPosition = function updateFrozenRowStickyPosition() {
    elementRef.current.style.top = DomHandler.getOuterHeight(elementRef.current.previousElementSibling) + 'px';
  };
  var updateFrozenRowGroupHeaderStickyPosition = function updateFrozenRowGroupHeaderStickyPosition() {
    var tableHeaderHeight = DomHandler.getOuterHeight(elementRef.current.previousElementSibling);
    var top = tableHeaderHeight + 'px';
    if (rowGroupHeaderStyleObjectState.top !== top) {
      setRowGroupHeaderStyleObjectState({
        top: top
      });
    }
  };
  var onSingleSelection = function onSingleSelection(_ref) {
    var originalEvent = _ref.originalEvent,
      data = _ref.data,
      index = _ref.index,
      toggleable = _ref.toggleable,
      type = _ref.type;
    if (!isSelectable({
      data: data,
      index: index
    })) {
      return;
    }
    var selected = isSelected(data);
    var selection = props.selection;
    if (selected) {
      if (toggleable) {
        selection = null;
        onUnselect({
          originalEvent: originalEvent,
          data: data,
          type: type
        });
      }
    } else {
      selection = data;
      onSelect({
        originalEvent: originalEvent,
        data: data,
        type: type
      });
    }
    focusOnElement(originalEvent, true);
    if (props.onSelectionChange && selection !== props.selection) {
      props.onSelectionChange({
        originalEvent: originalEvent,
        value: selection,
        type: type
      });
    }
  };
  var onMultipleSelection = function onMultipleSelection(_ref2) {
    var originalEvent = _ref2.originalEvent,
      data = _ref2.data,
      index = _ref2.index,
      toggleable = _ref2.toggleable,
      type = _ref2.type;
    if (!isSelectable({
      data: data,
      index: index
    })) {
      return;
    }
    var selected = isSelected(data);
    var selection = props.selection || [];
    if (selected) {
      if (toggleable) {
        var selectionIndex = findIndex(selection, data);
        selection = props.selection.filter(function (val, i) {
          return i !== selectionIndex;
        });
        onUnselect({
          originalEvent: originalEvent,
          data: data,
          type: type
        });
      } else if (selection.length) {
        props.selection.forEach(function (d) {
          return onUnselect({
            originalEvent: originalEvent,
            data: d,
            type: type
          });
        });
        selection = [data];
        onSelect({
          originalEvent: originalEvent,
          data: data,
          type: type
        });
      }
    } else {
      selection = ObjectUtils.isObject(selection) ? [selection] : selection;
      selection = toggleable && isMultipleSelection() ? [].concat(_toConsumableArray(selection), [data]) : [data];
      onSelect({
        originalEvent: originalEvent,
        data: data,
        type: type
      });
    }
    if (props.onSelectionChange && selection !== props.selection) {
      props.onSelectionChange({
        originalEvent: originalEvent,
        value: selection,
        type: type
      });
    }
  };
  var onRangeSelection = function onRangeSelection(event, type) {
    DomHandler.clearSelection();
    rangeRowIndex.current = allowCellSelection() ? event.rowIndex : event.index;
    var selection = selectRange(event);
    if (props.onSelectionChange && selection !== props.selection) {
      props.onSelectionChange({
        originalEvent: event.originalEvent,
        value: selection,
        type: type
      });
    }
    anchorRowIndex.current = rangeRowIndex.current;
    anchorCellIndex.current = event.cellIndex;
  };
  var selectRange = function selectRange(event) {
    var rangeStart;
    var rangeEnd;
    var selectedSize;
    var isAllowCellSelection = allowCellSelection();
    var index = ObjectUtils.findIndexInList(event.data, props.value, props.dataKey);
    if (rangeRowIndex.current > anchorRowIndex.current) {
      rangeStart = anchorRowIndex.current;
      rangeEnd = rangeRowIndex.current;
      if (!isAllowCellSelection) {
        selectedSize = rangeEnd - rangeStart;
        rangeEnd = index;
        rangeStart = index - selectedSize;
      }
    } else if (rangeRowIndex.current < anchorRowIndex.current) {
      rangeStart = rangeRowIndex.current;
      rangeEnd = anchorRowIndex.current;
      if (!isAllowCellSelection) {
        selectedSize = rangeEnd - rangeStart;
        rangeStart = index;
        rangeEnd = index + selectedSize;
      }
    } else {
      rangeStart = rangeEnd = rangeRowIndex.current;
    }
    return isAllowCellSelection ? selectRangeOnCell(event, rangeStart, rangeEnd) : selectRangeOnRow(event, rangeStart, rangeEnd);
  };
  var selectRangeOnRow = function selectRangeOnRow(event, rowRangeStart, rowRangeEnd) {
    var value = props.value;
    var selection = [];
    for (var i = rowRangeStart; i <= rowRangeEnd; i++) {
      var rangeRowData = value[i];
      if (!isSelectable({
        data: rangeRowData,
        index: i
      })) {
        continue;
      }
      selection.push(rangeRowData);
      onSelect({
        originalEvent: event.originalEvent,
        data: rangeRowData,
        type: 'row'
      });
    }
    return selection;
  };
  var selectRangeOnCell = function selectRangeOnCell(event, rowRangeStart, rowRangeEnd) {
    var cellRangeStart;
    var cellRangeEnd;
    var cellIndex = event.cellIndex;
    if (cellIndex > anchorCellIndex.current) {
      cellRangeStart = anchorCellIndex.current;
      cellRangeEnd = cellIndex;
    } else if (cellIndex < anchorCellIndex.current) {
      cellRangeStart = cellIndex;
      cellRangeEnd = anchorCellIndex.current;
    } else {
      cellRangeStart = cellRangeEnd = cellIndex;
    }
    var value = props.value;
    var selection = [];
    for (var i = rowRangeStart; i <= rowRangeEnd; i++) {
      var rowData = value[i];
      var columns = props.columns;
      var rowIndex = props.paginator ? i + props.first : i;
      for (var j = cellRangeStart; j <= cellRangeEnd; j++) {
        var field = getColumnProp(columns[j], 'field');
        var _value = ObjectUtils.resolveFieldData(rowData, field);
        var rangeRowData = {
          value: _value,
          field: field,
          rowData: rowData,
          rowIndex: rowIndex,
          cellIndex: j,
          selected: true
        };
        if (!isSelectable({
          data: rangeRowData,
          index: i
        })) {
          continue;
        }
        selection.push(rangeRowData);
        onSelect({
          originalEvent: event.originalEvent,
          data: rangeRowData,
          type: 'cell'
        });
      }
    }
    return selection;
  };
  var onSelect = function onSelect(event) {
    if (allowCellSelection()) {
      props.onCellSelect && props.onCellSelect(_objectSpread$7(_objectSpread$7({
        originalEvent: event.originalEvent
      }, event.data), {}, {
        type: event.type
      }));
    } else {
      props.onRowSelect && props.onRowSelect(event);
    }
  };
  var onUnselect = function onUnselect(event) {
    if (allowCellSelection()) {
      props.onCellUnselect && props.onCellUnselect(_objectSpread$7(_objectSpread$7({
        originalEvent: event.originalEvent
      }, event.data), {}, {
        type: event.type
      }));
    } else {
      props.onRowUnselect && props.onRowUnselect(event);
    }
  };
  var enableDragSelection = function enableDragSelection(event) {
    if (props.dragSelection && !dragSelectionHelper.current) {
      dragSelectionHelper.current = document.createElement('div');
      dragSelectionHelper.current.setAttribute('p-datatable-drag-selection-helper', 'true');
      !isUnsyled && DomHandler.addClass(dragSelectionHelper.current, 'p-datatable-drag-selection-helper');
      initialDragPosition.current = {
        x: event.clientX,
        y: event.clientY
      };
      dragSelectionHelper.current.style.top = "".concat(event.pageY, "px");
      dragSelectionHelper.current.style.left = "".concat(event.pageX, "px");
      bindDragSelectionEvents();
    }
  };
  var focusOnElement = function focusOnElement(event, isFocused) {
    var target = event.currentTarget;
    if (!allowCellSelection() && props.selectionAutoFocus) {
      if (isCheckboxSelectionModeInColumn) {
        var checkbox = DomHandler.findSingle(target, 'td[data-p-selection-column="true"] [data-pc-section="checkbox"]');
        checkbox && checkbox.focus();
      } else if (isRadioSelectionModeInColumn) {
        var radio = DomHandler.findSingle(target, 'td[data-p-selection-column="true"] input[type="radio"]');
        radio && radio.focus();
      }
    }
    !isFocused && target && target.focus();
  };
  var changeTabIndex = function changeTabIndex(event, type) {
    var target = event.currentTarget;
    var isSelectable = DomHandler.getAttribute(target, type === 'cell' ? 'data-p-selectable-cell' : 'data-p-selectable-row') === true;
    if (isSelectable) {
      var selector = type === 'cell' ? 'tr > td' : 'tr';
      var tabbableEl = DomHandler.findSingle(elementRef.current, "".concat(selector, "[tabindex=\"").concat(props.tabIndex, "\"]"));
      if (tabbableEl && target) {
        tabbableEl.tabIndex = -1;
        target.tabIndex = props.tabIndex;
      }
    }
  };
  var onRowClick = function onRowClick(event) {
    if (event.defaultPrevented || event.originalEvent && event.originalEvent.defaultPrevented || allowCellSelection() || !allowSelection(event)) {
      return;
    }
    props.onRowClick && props.onRowClick(event);
    if (allowRowSelection()) {
      if (allowRangeSelection(event)) {
        onRangeSelection(event, 'row');
      } else {
        var toggleable = isRadioSelectionModeInColumn || isCheckboxSelectionModeInColumn || allowMetaKeySelection(event);
        anchorRowIndex.current = event.index;
        rangeRowIndex.current = event.index;
        anchorRowFirst.current = props.first;
        if (isSingleSelection()) {
          onSingleSelection(_objectSpread$7(_objectSpread$7({}, event), {}, {
            toggleable: toggleable,
            type: 'row'
          }));
        } else {
          onMultipleSelection(_objectSpread$7(_objectSpread$7({}, event), {}, {
            toggleable: toggleable,
            type: 'row'
          }));
        }
      }
      changeTabIndex(event.originalEvent, 'row');
    } else {
      focusOnElement(event.originalEvent);
    }
    rowTouched.current = false;
  };
  var onRowDoubleClick = function onRowDoubleClick(e) {
    var event = e.originalEvent;
    if (DomHandler.isClickable(event.target)) {
      return;
    }
    if (props.onRowDoubleClick) {
      props.onRowDoubleClick(e);
    }
  };
  var onRowPointerDown = function onRowPointerDown(e) {
    var event = e.originalEvent;
    if (DomHandler.isClickable(event.target)) {
      return;
    }
    if (props.onRowPointerDown) {
      props.onRowPointerDown(e);
    }
  };
  var onRowPointerUp = function onRowPointerUp(e) {
    var event = e.originalEvent;
    if (DomHandler.isClickable(event.target)) {
      return;
    }
    if (props.onRowPointerUp) {
      props.onRowPointerUp(e);
    }
  };
  var onRowRightClick = function onRowRightClick(event) {
    if (props.onContextMenu || props.onContextMenuSelectionChange) {
      var hasSelection = ObjectUtils.isNotEmpty(props.selection);
      var data = event.data;
      if (hasSelection) {
        DomHandler.clearSelection();
      }
      if (props.onContextMenuSelectionChange) {
        props.onContextMenuSelectionChange({
          originalEvent: event.originalEvent,
          value: data,
          index: event.index
        });
      }
      if (props.onContextMenu) {
        props.onContextMenu({
          originalEvent: event.originalEvent,
          data: data,
          index: event.index
        });
      }
      event.originalEvent.preventDefault();
    }
  };
  var onRowMouseEnter = function onRowMouseEnter(event) {
    props.onRowMouseEnter && props.onRowMouseEnter(event);
  };
  var onRowMouseLeave = function onRowMouseLeave(event) {
    props.onRowMouseLeave && props.onRowMouseLeave(event);
  };
  var onRowTouchEnd = function onRowTouchEnd() {
    rowTouched.current = true;
  };
  var onRowMouseDown = function onRowMouseDown(e) {
    var event = e.originalEvent;
    if (!isUnsyled && DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle')) {
      event.currentTarget.draggable = true;
      event.target.draggable = false;
    } else {
      event.currentTarget.draggable = false;
    }
    if (allowRowDrag(e)) {
      enableDragSelection(event);
      anchorRowIndex.current = e.index;
      rangeRowIndex.current = e.index;
      anchorRowFirst.current = props.first;
    }
  };
  var onRowMouseUp = function onRowMouseUp(event) {
    var isSameRow = event.index === anchorRowIndex.current;
    if (allowRowDrag(event) && !isSameRow) {
      onRangeSelection(event, 'row');
    }
  };
  var onRowToggle = function onRowToggle(event) {
    var expandedRows;
    var dataKey = props.dataKey;
    var hasDataKey = props.groupRowsBy ? dataKey === props.groupRowsBy : !!dataKey;
    if (hasDataKey) {
      var dataKeyValue = String(ObjectUtils.resolveFieldData(event.data, dataKey));
      expandedRows = props.expandedRows ? _objectSpread$7({}, props.expandedRows) : {};
      if (expandedRows[dataKeyValue] != null) {
        delete expandedRows[dataKeyValue];
        if (props.onRowCollapse) {
          props.onRowCollapse({
            originalEvent: event,
            data: event.data
          });
        }
      } else {
        expandedRows[dataKeyValue] = true;
        if (props.onRowExpand) {
          props.onRowExpand({
            originalEvent: event,
            data: event.data
          });
        }
      }
    } else {
      var expandedRowIndex = findIndex(props.expandedRows, event.data);
      expandedRows = props.expandedRows ? _toConsumableArray(props.expandedRows) : [];
      if (expandedRowIndex !== -1) {
        expandedRows = expandedRows.filter(function (_, i) {
          return i !== expandedRowIndex;
        });
        if (props.onRowCollapse) {
          props.onRowCollapse({
            originalEvent: event,
            data: event.data
          });
        }
      } else {
        expandedRows.push(event.data);
        if (props.onRowExpand) {
          props.onRowExpand({
            originalEvent: event,
            data: event.data
          });
        }
      }
    }
    if (props.onRowToggle) {
      props.onRowToggle({
        data: expandedRows
      });
    }
  };
  var onRowDragStart = function onRowDragStart(e) {
    var event = e.originalEvent,
      index = e.index;
    if (allowRowDrag(event)) {
      rowDragging.current = true;
      draggedRowIndex.current = index;
      event.dataTransfer.setData('text', 'b'); // For firefox
    }
  };

  var onRowDragOver = function onRowDragOver(e) {
    var event = e.originalEvent,
      index = e.index;
    if (rowDragging.current && draggedRowIndex.current !== index) {
      var rowElement = event.currentTarget;
      var rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
      var pageY = event.pageY + window.scrollY;
      var rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
      var prevRowElement = rowElement.previousElementSibling;
      if (pageY < rowMidY) {
        rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
        !isUnsyled && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        droppedRowIndex.current = index;
        if (prevRowElement) {
          prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'true');
          !isUnsyled && DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        } else {
          rowElement.setAttribute('data-p-datatable-dragpoint-top', 'true');
          !isUnsyled && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
        }
      } else {
        if (prevRowElement) {
          prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
          !isUnsyled && DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        } else {
          rowElement.setAttribute('data-p-datatable-dragpoint-top', 'true');
          !isUnsyled && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
        }
        droppedRowIndex.current = index + 1;
        rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'true');
        !isUnsyled && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
      }
    }
    event.preventDefault();
  };
  var onRowDragLeave = function onRowDragLeave(e) {
    var event = e.originalEvent;
    var rowElement = event.currentTarget;
    var prevRowElement = rowElement.previousElementSibling;
    if (prevRowElement) {
      prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
      !isUnsyled && DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
    }
    rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
    !isUnsyled && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
    rowElement.setAttribute('data-p-datatable-dragpoint-top', 'false');
    !isUnsyled && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
  };
  var onRowDragEnd = function onRowDragEnd(e) {
    var event = e.originalEvent;
    rowDragging.current = false;
    draggedRowIndex.current = null;
    droppedRowIndex.current = null;
    event.currentTarget.draggable = false;
  };
  var onRowDrop = function onRowDrop(e) {
    var event = e.originalEvent;
    if (droppedRowIndex.current != null) {
      var dropIndex = draggedRowIndex.current > droppedRowIndex.current ? droppedRowIndex.current : droppedRowIndex.current === 0 ? 0 : droppedRowIndex.current - 1;
      var val = _toConsumableArray(props.tableProps.value);
      ObjectUtils.reorderArray(val, draggedRowIndex.current, dropIndex);
      if (props.onRowReorder) {
        props.onRowReorder({
          originalEvent: event,
          value: val,
          dragIndex: draggedRowIndex.current,
          dropIndex: dropIndex
        });
      }
    }

    //cleanup
    onRowDragLeave(e);
    onRowDragEnd(e);
    event.preventDefault();
  };
  var onRadioChange = function onRadioChange(event) {
    onSingleSelection(_objectSpread$7(_objectSpread$7({}, event), {}, {
      toggleable: true,
      type: 'radio'
    }));
  };
  var onCheckboxChange = function onCheckboxChange(event) {
    onMultipleSelection(_objectSpread$7(_objectSpread$7({}, event), {}, {
      toggleable: true,
      type: 'checkbox'
    }));
  };
  var onDragSelectionMouseMove = function onDragSelectionMouseMove(event) {
    var _initialDragPosition$ = initialDragPosition.current,
      x = _initialDragPosition$.x,
      y = _initialDragPosition$.y;
    var dx = event.clientX - x;
    var dy = event.clientY - y;
    if (dy < 0) {
      dragSelectionHelper.current.style.top = "".concat(event.pageY + 5, "px");
    }
    if (dx < 0) {
      dragSelectionHelper.current.style.left = "".concat(event.pageX + 5, "px");
    }
    dragSelectionHelper.current.style.height = "".concat(Math.abs(dy), "px");
    dragSelectionHelper.current.style.width = "".concat(Math.abs(dx), "px");
    event.preventDefault();
  };
  var onDragSelectionMouseUp = function onDragSelectionMouseUp() {
    if (dragSelectionHelper.current) {
      dragSelectionHelper.current.remove();
      dragSelectionHelper.current = null;
    }
    document.removeEventListener('mousemove', onDragSelectionMouseMove);
    document.removeEventListener('mouseup', onDragSelectionMouseUp);
  };
  var onCellClick = function onCellClick(event) {
    if (!allowSelection(event)) {
      return;
    }
    props.onCellClick && props.onCellClick(event);
    if (allowCellSelection()) {
      if (allowRangeSelection(event)) {
        onRangeSelection(event, 'cell');
      } else {
        var toggleable = allowMetaKeySelection(event);
        var originalEvent = event.originalEvent,
          data = _objectWithoutProperties(event, _excluded);
        anchorRowIndex.current = event.rowIndex;
        rangeRowIndex.current = event.rowIndex;
        anchorRowFirst.current = props.first;
        anchorCellIndex.current = event.cellIndex;
        if (isSingleSelection()) {
          onSingleSelection({
            originalEvent: originalEvent,
            data: data,
            index: event.rowIndex,
            toggleable: toggleable,
            type: 'cell'
          });
        } else {
          onMultipleSelection({
            originalEvent: originalEvent,
            data: data,
            index: event.rowIndex,
            toggleable: toggleable,
            type: 'cell'
          });
        }
      }
      changeTabIndex(event.originalEvent, 'cell');
    }
    rowTouched.current = false;
  };
  var onCellMouseDown = function onCellMouseDown(event) {
    if (allowCellDrag(event)) {
      enableDragSelection(event.originalEvent);
      anchorRowIndex.current = event.rowIndex;
      rangeRowIndex.current = event.rowIndex;
      anchorRowFirst.current = props.first;
      anchorCellIndex.current = event.cellIndex;
    }
  };
  var onCellMouseUp = function onCellMouseUp(event) {
    var isSameCell = event.rowIndex === anchorRowIndex.current && event.cellIndex === anchorCellIndex.current;
    if (allowCellDrag(event) && !isSameCell) {
      onRangeSelection(event, 'cell');
    }
  };
  var bindDragSelectionEvents = function bindDragSelectionEvents() {
    document.addEventListener('mousemove', onDragSelectionMouseMove);
    document.addEventListener('mouseup', onDragSelectionMouseUp);
    document.body.appendChild(dragSelectionHelper.current);
  };
  var unbindDragSelectionEvents = function unbindDragSelectionEvents() {
    onDragSelectionMouseUp();
  };
  React.useEffect(function () {
    if (props.frozenRow) {
      updateFrozenRowStickyPosition();
    }
    if (props.scrollable && props.rowGroupMode === 'subheader') {
      updateFrozenRowGroupHeaderStickyPosition();
    }
  });
  useUpdateEffect(function () {
    if (props.paginator && isMultipleSelection()) {
      anchorRowIndex.current = null;
    }
  }, [props.first]);
  useUnmountEffect(function () {
    if (props.dragSelection) {
      unbindDragSelectionEvents();
    }
  });
  var createEmptyContent = function createEmptyContent() {
    if (!props.loading) {
      var colSpan = getColumnsLength();
      var _content = ObjectUtils.getJSXElement(props.emptyMessage, {
        props: props.tableProps,
        frozen: props.frozenRow
      }) || localeOption('emptyMessage');
      var emptyMessageProps = mergeProps({
        className: cx('emptyMessage'),
        role: 'row'
      }, getColumnPTOptions('emptyMessage'));
      var bodyCellProps = mergeProps({
        colSpan: colSpan,
        role: 'cell'
      }, getColumnPTOptions('root'), getColumnPTOptions('bodyCell'));
      return /*#__PURE__*/React.createElement("tr", emptyMessageProps, /*#__PURE__*/React.createElement("td", bodyCellProps, _content));
    }
    return null;
  };
  var createGroupHeader = function createGroupHeader(rowData, rowIndex, expanded, colSpan) {
    if (isSubheaderGrouping && shouldRenderRowGroupHeader(props.value, rowData, rowIndex - props.first)) {
      var style = rowGroupHeaderStyle();
      var toggler = props.expandableRowGroups && /*#__PURE__*/React.createElement(RowTogglerButton, {
        hostName: props.hostName,
        onClick: onRowToggle,
        rowData: rowData,
        expanded: expanded,
        expandedRowIcon: props.expandedRowIcon,
        collapsedRowIcon: props.collapsedRowIcon,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData
      });
      var options = {
        index: rowIndex,
        props: props.tableProps,
        customRendering: false
      };
      var _content2 = ObjectUtils.getJSXElement(props.rowGroupHeaderTemplate, rowData, options);

      // check if the user wants complete control of the rendering
      if (!options.customRendering) {
        var bodyCellProps = mergeProps({
          colSpan: colSpan
        }, getColumnPTOptions('root'), getColumnPTOptions('bodyCell'));
        var rowGroupHeaderNameProps = mergeProps({
          className: cx('rowGroupHeaderName')
        }, getColumnPTOptions('rowGroupHeaderName'));
        _content2 = /*#__PURE__*/React.createElement("td", bodyCellProps, toggler, /*#__PURE__*/React.createElement("span", rowGroupHeaderNameProps, _content2));
      }
      var rowGroupHeaderProps = mergeProps({
        className: cx('rowGroupHeader'),
        style: style,
        role: 'row'
      }, getColumnPTOptions('rowGroupHeader'));
      return /*#__PURE__*/React.createElement("tr", rowGroupHeaderProps, _content2);
    }
    return null;
  };
  var createRow = function createRow(rowData, rowIndex, index, expanded) {
    if (!props.expandableRowGroups || expanded) {
      var selected = isSelectionEnabled() ? isSelected(rowData) : false;
      var contextMenuSelected = isContextMenuSelected(rowData);
      var _allowRowSelection = allowRowSelection();
      var _allowCellSelection = allowCellSelection();
      var editing = isRowEditing(rowData);
      return /*#__PURE__*/React.createElement(BodyRow, {
        hostName: props.hostName,
        allowCellSelection: _allowCellSelection,
        allowRowSelection: _allowRowSelection,
        cellClassName: props.cellClassName,
        checkIcon: props.checkIcon,
        collapsedRowIcon: props.collapsedRowIcon,
        columns: props.columns,
        compareSelectionBy: props.compareSelectionBy,
        contextMenuSelected: contextMenuSelected,
        dataKey: props.dataKey,
        editMode: props.editMode,
        editing: editing,
        editingMeta: props.editingMeta,
        editingRows: props.editingRows,
        expanded: expanded,
        expandedRowIcon: props.expandedRowIcon,
        frozenRow: props.frozenRow,
        groupRowsBy: props.groupRowsBy,
        index: index,
        isSelectable: isSelectable,
        onCellClick: onCellClick,
        onCellMouseDown: onCellMouseDown,
        onCellMouseUp: onCellMouseUp,
        onCheckboxChange: onCheckboxChange,
        onEditingMetaChange: props.onEditingMetaChange,
        onRadioChange: onRadioChange,
        onRowClick: onRowClick,
        onRowDoubleClick: onRowDoubleClick,
        onRowPointerDown: onRowPointerDown,
        onRowPointerUp: onRowPointerUp,
        onRowDragEnd: onRowDragEnd,
        onRowDragLeave: onRowDragLeave,
        onRowDragOver: onRowDragOver,
        onRowDragStart: onRowDragStart,
        onRowDrop: onRowDrop,
        onRowEditCancel: props.onRowEditCancel,
        onRowEditChange: props.onRowEditChange,
        onRowEditComplete: props.onRowEditComplete,
        onRowEditInit: props.onRowEditInit,
        onRowEditSave: props.onRowEditSave,
        onRowMouseDown: onRowMouseDown,
        onRowMouseEnter: onRowMouseEnter,
        onRowMouseLeave: onRowMouseLeave,
        onRowMouseUp: onRowMouseUp,
        onRowRightClick: onRowRightClick,
        onRowToggle: onRowToggle,
        onRowTouchEnd: onRowTouchEnd,
        responsiveLayout: props.responsiveLayout,
        rowClassName: props.rowClassName,
        rowData: rowData,
        rowEditValidator: props.rowEditValidator,
        rowEditorCancelIcon: props.rowEditorCancelIcon,
        rowEditorInitIcon: props.rowEditorInitIcon,
        rowEditorSaveIcon: props.rowEditorSaveIcon,
        rowGroupMode: props.rowGroupMode,
        rowIndex: rowIndex,
        selectOnEdit: props.selectOnEdit,
        selected: selected,
        selection: props.selection,
        selectionMode: props.selectionMode,
        selectionModeInColumn: props.selectionModeInColumn,
        showRowReorderElement: props.showRowReorderElement,
        showSelectionElement: props.showSelectionElement,
        tabIndex: props.tabIndex,
        tableProps: props.tableProps,
        tableSelector: props.tableSelector,
        value: props.value,
        virtualScrollerOptions: props.virtualScrollerOptions,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData
      });
    }
  };
  var createExpansion = function createExpansion(rowData, rowIndex, expanded, colSpan) {
    if (expanded && !(isSubheaderGrouping && props.expandableRowGroups)) {
      var id = "".concat(props.tableSelector, "_content_").concat(rowIndex, "_expanded");
      var options = {
        index: rowIndex,
        customRendering: false
      };
      var _content3 = ObjectUtils.getJSXElement(props.rowExpansionTemplate, rowData, options);

      // check if the user wants complete control of the rendering
      if (!options.customRendering) {
        var bodyCellProps = mergeProps({
          colSpan: colSpan,
          role: 'cell'
        }, getColumnPTOptions('root'), getColumnPTOptions('bodyCell'));
        _content3 = /*#__PURE__*/React.createElement("td", bodyCellProps, _content3);
      }
      var rowExpansionProps = mergeProps({
        id: id,
        className: cx('rowExpansion'),
        role: 'row'
      }, getColumnPTOptions('rowExpansion'));
      return /*#__PURE__*/React.createElement("tr", rowExpansionProps, _content3);
    }
    return null;
  };
  var createGroupFooter = function createGroupFooter(rowData, rowIndex, expanded, colSpan) {
    if (isSubheaderGrouping && shouldRenderRowGroupFooter(props.value, rowData, rowIndex - props.first, expanded)) {
      var _content4 = ObjectUtils.getJSXElement(props.rowGroupFooterTemplate, rowData, {
        index: rowIndex,
        colSpan: colSpan,
        props: props.tableProps
      });
      var rowGroupFooterProps = mergeProps({
        className: cx('rowGroupFooter'),
        role: 'row'
      }, getColumnPTOptions('rowGroupFooter'));
      return /*#__PURE__*/React.createElement("tr", rowGroupFooterProps, _content4);
    }
    return null;
  };
  var createContent = function createContent() {
    return props.value && props.value.map(function (rowData, index) {
      var rowIndex = getVirtualScrollerOption('getItemOptions') ? getVirtualScrollerOption('getItemOptions')(index).index : props.first + index;
      var key = getRowKey(rowData, rowIndex);
      var expanded = isRowExpanded(rowData);
      var colSpan = getColumnsLength();
      var groupHeader = createGroupHeader(rowData, rowIndex, expanded, colSpan);
      var row = createRow(rowData, rowIndex, index, expanded);
      var expansion = createExpansion(rowData, rowIndex, expanded, colSpan);
      var groupFooter = createGroupFooter(rowData, rowIndex, expanded, colSpan);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: key
      }, groupHeader, row, expansion, groupFooter);
    });
  };
  var content = props.empty ? createEmptyContent() : createContent();
  var ptKey = props.className === 'p-datatable-virtualscroller-spacer' ? 'virtualScrollerSpacer' : 'tbody';
  var tbodyProps = mergeProps({
    style: props.style,
    className: cx(ptKey, {
      className: props.className
    }),
    role: ' rowgroup'
  }, ptm(ptKey, {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React.createElement("tbody", _extends({
    ref: refCallback
  }, tbodyProps), content);
}));
TableBody.displayName = 'TableBody';

var ColumnGroupBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ColumnGroup',
    children: undefined
  },
  getCProp: function getCProp(group, name) {
    return ObjectUtils.getComponentProp(group, name, ColumnGroupBase.defaultProps);
  },
  getCProps: function getCProps(group) {
    return ObjectUtils.getComponentProps(group, ColumnGroupBase.defaultProps);
  }
});

var RowBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Row',
    style: null,
    className: null,
    children: undefined
  },
  getCProp: function getCProp(row, name) {
    return ObjectUtils.getComponentProp(row, name, RowBase.defaultProps);
  }
});

function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var FooterCell = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState({}),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    styleObjectState = _React$useState2[0],
    setStyleObjectState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var mergeProps = useMergeProps();
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var cProps = getColumnProps();
    var columnMetaData = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        styleObject: styleObjectState
      },
      context: {
        index: props.index,
        size: props.metaData.props.size,
        showGridlines: props.metaData.props.showGridlines
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var getColumnProp = function getColumnProp(name) {
    return ColumnBase.getCProp(props.column, name);
  };
  var getStyle = function getStyle() {
    var footerStyle = getColumnProp('footerStyle');
    var columnStyle = getColumnProp('style');
    return getColumnProp('frozen') ? Object.assign({}, columnStyle, footerStyle, styleObjectState) : Object.assign({}, columnStyle, footerStyle);
  };
  var updateStickyPosition = function updateStickyPosition() {
    if (getColumnProp('frozen')) {
      var styleObject = _objectSpread$6({}, styleObjectState);
      var _align = getColumnProp('alignFrozen');
      if (_align === 'right') {
        var right = 0;
        var next = elementRef.current.nextElementSibling;
        if (next) {
          right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
        }
        styleObject.right = right + 'px';
      } else {
        var left = 0;
        var prev = elementRef.current.previousElementSibling;
        if (prev) {
          left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
        }
        styleObject.left = left + 'px';
      }
      var isSameStyle = styleObjectState.left === styleObject.left && styleObjectState.right === styleObject.right;
      !isSameStyle && setStyleObjectState(styleObject);
    }
  };
  React.useEffect(function () {
    if (getColumnProp('frozen')) {
      updateStickyPosition();
    }
  });
  var style = getStyle();
  var align = getColumnProp('align');
  var colSpan = getColumnProp('colSpan');
  var rowSpan = getColumnProp('rowSpan');
  var content = ObjectUtils.getJSXElement(getColumnProp('footer'), {
    props: props.tableProps
  });
  var footerCellProps = mergeProps({
    style: style,
    className: classNames(getColumnProp('footerClassName'), getColumnProp('className'), cx('footerCell', {
      getColumnProp: getColumnProp,
      align: align
    })),
    role: 'cell',
    colSpan: colSpan,
    rowSpan: rowSpan
  }, getColumnPTOptions('root'), getColumnPTOptions('footerCell'));
  return /*#__PURE__*/React.createElement("td", _extends({
    ref: elementRef
  }, footerCellProps), content);
});
FooterCell.displayName = 'FooterCell';

var TableFooter = /*#__PURE__*/React.memo(function (props) {
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var mergeProps = useMergeProps();
  var getRowProps = function getRowProps(row) {
    return ColumnGroupBase.getCProps(row);
  };
  var getColumnGroupProps = function getColumnGroupProps() {
    return props.footerColumnGroup ? ColumnGroupBase.getCProps(props.footerColumnGroup) : undefined;
  };
  var getRowPTOptions = function getRowPTOptions(row, key) {
    var rProps = getRowProps(row);
    var rowMetaData = {
      props: rProps,
      parent: props.metaData,
      hostName: props.hostName
    };
    return mergeProps(ptm("row.".concat(key), {
      row: rowMetaData
    }), ptm("row.".concat(key), rowMetaData), ptmo(rProps, key, rowMetaData));
  };
  var getColumnGroupPTOptions = function getColumnGroupPTOptions(key) {
    var cGProps = getColumnGroupProps();
    var columnGroupMetaData = {
      props: getColumnGroupProps(),
      parent: props.metaData,
      hostName: props.hostName
    };
    return mergeProps(ptm("columnGroup.".concat(key), {
      columnGroup: columnGroupMetaData
    }), ptm("columnGroup.".concat(key), columnGroupMetaData), ptmo(cGProps, key, columnGroupMetaData));
  };
  var hasFooter = function hasFooter() {
    return props.footerColumnGroup ? true : props.columns ? props.columns.some(function (col) {
      return col && getColumnProp(col, 'footer');
    }) : false;
  };
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var createGroupFooterCells = function createGroupFooterCells(row) {
    var columns = React.Children.toArray(RowBase.getCProp(row, 'children'));
    return createFooterCells(columns);
  };
  var createFooterCells = function createFooterCells(columns) {
    return React.Children.map(columns, function (col, i) {
      var isVisible = col ? !getColumnProp(col, 'hidden') : true;
      var key = col ? getColumnProp(col, 'columnKey') || getColumnProp(col, 'field') || i : i;
      return isVisible && /*#__PURE__*/React.createElement(FooterCell, {
        hostName: props.hostName,
        key: key,
        tableProps: props.tableProps,
        column: col,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData
      });
    });
  };
  var createContent = function createContent() {
    if (props.footerColumnGroup) {
      var rows = React.Children.toArray(ColumnGroupBase.getCProp(props.footerColumnGroup, 'children'));
      return rows.map(function (row, i) {
        var rootProps = mergeProps({
          role: 'row'
        }, getRowPTOptions(row, 'root'));
        return /*#__PURE__*/React.createElement("tr", _extends({}, rootProps, {
          key: i
        }), createGroupFooterCells(row));
      });
    }
    var footerRowProps = mergeProps({
      role: 'row'
    }, ptm('footerRow', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React.createElement("tr", footerRowProps, createFooterCells(props.columns));
  };
  if (hasFooter()) {
    var content = createContent();
    var tfootProps = mergeProps({
      className: cx('tfoot'),
      role: 'rowgroup'
    }, getColumnGroupPTOptions('root'), ptm('tfoot', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React.createElement("tfoot", tfootProps, content);
  }
  return null;
});
TableFooter.displayName = 'TableFooter';

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
  (_linkElement$parentNo = linkElement.parentNode) === null || _linkElement$parentNo === void 0 || _linkElement$parentNo.insertBefore(cloneLinkElement, linkElement.nextSibling);
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

var styles = '';
var FocusTrapBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FocusTrap',
    children: undefined
  },
  css: {
    styles: styles
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, FocusTrapBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, FocusTrapBase.defaultProps);
  }
});

function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var FocusTrap = /*#__PURE__*/React__default.memo( /*#__PURE__*/React__default.forwardRef(function (inProps, ref) {
  var targetRef = React__default.useRef(null);
  var firstFocusableElementRef = React__default.useRef(null);
  var lastFocusableElementRef = React__default.useRef(null);
  var context = React__default.useContext(PrimeReactContext);
  var props = FocusTrapBase.getProps(inProps, context);
  var metaData = {
    props: props
  };
  useStyle(FocusTrapBase.css.styles, {
    name: 'focustrap'
  });
  var _FocusTrapBase$setMet = FocusTrapBase.setMetaData(_objectSpread$5({}, metaData));
    _FocusTrapBase$setMet.ptm;
  React__default.useImperativeHandle(ref, function () {
    return {
      props: props,
      getInk: function getInk() {
        return firstFocusableElementRef.current;
      },
      getTarget: function getTarget() {
        return targetRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (!props.disabled) {
      targetRef.current = getTarget();
      setAutoFocus(targetRef.current);
    }
  });
  var getTarget = function getTarget() {
    return firstFocusableElementRef.current && firstFocusableElementRef.current.parentElement;
  };
  var setAutoFocus = function setAutoFocus(target) {
    var _ref = props || {},
      _ref$autoFocusSelecto = _ref.autoFocusSelector,
      autoFocusSelector = _ref$autoFocusSelecto === void 0 ? '' : _ref$autoFocusSelecto,
      _ref$firstFocusableSe = _ref.firstFocusableSelector,
      firstFocusableSelector = _ref$firstFocusableSe === void 0 ? '' : _ref$firstFocusableSe,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus;
    var focusableElement = DomHandler.getFirstFocusableElement(target, "[autofocus]".concat(getComputedSelector(autoFocusSelector)));
    autoFocus && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(target, getComputedSelector(firstFocusableSelector)));
    DomHandler.focus(focusableElement);
  };
  var getComputedSelector = function getComputedSelector(selector) {
    return ":not(.p-hidden-focusable):not([data-p-hidden-focusable=\"true\"])".concat(selector !== null && selector !== void 0 ? selector : '');
  };
  var onFirstHiddenElementFocus = function onFirstHiddenElementFocus(event) {
    var _targetRef$current;
    var currentTarget = event.currentTarget,
      relatedTarget = event.relatedTarget;
    var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_targetRef$current = targetRef.current) !== null && _targetRef$current !== void 0 && _targetRef$current.contains(relatedTarget)) ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
    DomHandler.focus(focusableElement);
  };
  var onLastHiddenElementFocus = function onLastHiddenElementFocus(event) {
    var _targetRef$current2;
    var currentTarget = event.currentTarget,
      relatedTarget = event.relatedTarget;
    var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_targetRef$current2 = targetRef.current) !== null && _targetRef$current2 !== void 0 && _targetRef$current2.contains(relatedTarget)) ? DomHandler.getLastFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
    DomHandler.focus(focusableElement);
  };
  var createHiddenFocusableElements = function createHiddenFocusableElements() {
    var _ref2 = props || {},
      _ref2$tabIndex = _ref2.tabIndex,
      tabIndex = _ref2$tabIndex === void 0 ? 0 : _ref2$tabIndex;
    var createFocusableElement = function createFocusableElement(onFocus, section) {
      return /*#__PURE__*/React__default.createElement("span", {
        ref: section === 'firstfocusableelement' ? firstFocusableElementRef : lastFocusableElementRef,
        className: 'p-hidden-accessible p-hidden-focusable',
        tabIndex: tabIndex,
        role: 'presentation',
        "aria-hidden": true,
        "data-p-hidden-accessible": true,
        "data-p-hidden-focusable": true,
        onFocus: onFocus,
        "data-pc-section": section
      });
    };
    var firstFocusableElement = createFocusableElement(onFirstHiddenElementFocus, 'firstfocusableelement');
    var lastFocusableElement = createFocusableElement(onLastHiddenElementFocus, 'lastfocusableelement');
    if (firstFocusableElement.ref.current && lastFocusableElement.ref.current) {
      firstFocusableElement.ref.current.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement.ref.current;
      lastFocusableElement.ref.current.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement.ref.current;
    }
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, firstFocusableElement, props.children, lastFocusableElement);
  };
  return createHiddenFocusableElements();
}));
var FocusTrap$1 = FocusTrap;

function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ColumnFilter = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var overlayRef = React.useRef(null);
  var overlayId = React.useRef(null);
  var iconRef = React.useRef(null);
  var selfClick = React.useRef(false);
  var overlayEventListener = React.useRef(null);
  var mergeProps = useMergeProps();
  var getColumnProp = function getColumnProp(name) {
    return ColumnBase.getCProp(props.column, name);
  };
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var context = React.useContext(PrimeReactContext);
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnPTOptions = function getColumnPTOptions(key, params) {
    var cProps = getColumnProps();
    var columnMetadata = _objectSpread$4({
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        overlayVisible: overlayVisibleState
      }
    }, params);
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetadata
    }), ptm("column.".concat(key), columnMetadata), ptmo(cProps, key, columnMetadata));
  };
  var field = getColumnProp('filterField') || getColumnProp('field');
  var filterModel = props.filters[field];
  var filterStoreModel = props.filtersStore && props.filtersStore[field];
  var _useOverlayListener = useOverlayListener({
      target: iconRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? !selfClick.current && !isTargetClicked(event.target) && hide() : hide();
        }
        selfClick.current = false;
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var hasFilter = function hasFilter() {
    if (!filterStoreModel || !filterModel) {
      return false;
    }
    return filterStoreModel.operator ? !isFilterBlank(filterModel.constraints[0].value) : !isFilterBlank(filterModel.value);
  };
  var hasRowFilter = function hasRowFilter() {
    return filterModel && !isFilterBlank(filterModel.value);
  };
  var isFilterBlank = function isFilterBlank(filter) {
    return ObjectUtils.isEmpty(filter);
  };
  var isRowMatchModeSelected = function isRowMatchModeSelected(matchMode) {
    return filterModel && filterModel.matchMode === matchMode;
  };
  var matchModes = function matchModes() {
    return getColumnProp('filterMatchModeOptions') || context && context.filterMatchModeOptions[findDataType()].map(function (key) {
      return {
        label: localeOption(key),
        value: key
      };
    }) || PrimeReact$1.filterMatchModeOptions[findDataType()].map(function (key) {
      return {
        label: localeOption(key),
        value: key
      };
    });
  };
  var isShowMenuButton = function isShowMenuButton() {
    return getColumnProp('showFilterMenu') && (props.display === 'row' ? getColumnProp('dataType') !== 'boolean' : true);
  };
  var isShowClearButton = function isShowClearButton() {
    return getColumnProp('showClearButton') && props.display === 'row';
  };
  var isShowMatchModes = function isShowMatchModes() {
    return getColumnProp('dataType') !== 'boolean' && getColumnProp('showFilterMatchModes') && matchModes() && getColumnProp('showFilterMenuOptions');
  };
  var isShowOperator = function isShowOperator() {
    return getColumnProp('showFilterOperator') && filterModel && filterModel.operator && getColumnProp('showFilterMenuOptions');
  };
  var showRemoveIcon = function showRemoveIcon() {
    return fieldConstraints().length > 1;
  };
  var isShowAddConstraint = function isShowAddConstraint() {
    return getColumnProp('showAddButton') && filterModel && filterModel.operator && fieldConstraints() && fieldConstraints().length < getColumnProp('maxConstraints') && getColumnProp('showFilterMenuOptions');
  };
  var isOutsideClicked = function isOutsideClicked(target) {
    return !isTargetClicked(target) && overlayRef.current && !(overlayRef.current.isSameNode(target) || overlayRef.current.contains(target));
  };
  var isTargetClicked = function isTargetClicked(target) {
    return iconRef.current && (iconRef.current.isSameNode(target) || iconRef.current.contains(target));
  };
  var getDefaultConstraint = function getDefaultConstraint() {
    if (filterStoreModel) {
      if (filterStoreModel.operator) {
        return {
          matchMode: filterStoreModel.constraints[0].matchMode,
          operator: filterStoreModel.operator
        };
      }
      return {
        matchMode: filterStoreModel.matchMode
      };
    }
  };
  var findDataType = function findDataType() {
    var dataType = getColumnProp('dataType');
    var matchMode = getColumnProp('filterMatchMode');
    var hasMatchMode = function hasMatchMode(key) {
      return context && context.filterMatchModeOptions[key].some(function (mode) {
        return mode === matchMode;
      }) || PrimeReact$1.filterMatchModeOptions[key].some(function (mode) {
        return mode === matchMode;
      });
    };
    if (matchMode === 'custom' && !hasMatchMode(dataType)) {
      context && context.filterMatchModeOptions[dataType].push(FilterMatchMode$1.CUSTOM) || PrimeReact$1.filterMatchModeOptions[dataType].push(FilterMatchMode$1.CUSTOM);
      return dataType;
    } else if (matchMode) {
      return Object.keys(context && context.filterMatchModeOptions || PrimeReact$1.filterMatchModeOptions).find(function (key) {
        return hasMatchMode(key);
      }) || dataType;
    }
    return dataType;
  };
  var clearFilter = function clearFilter() {
    var filterClearCallback = getColumnProp('onFilterClear');
    var defaultConstraint = getDefaultConstraint();
    var filters = _objectSpread$4({}, props.filters);
    if (filters[field].operator) {
      filters[field].constraints.splice(1);
      filters[field].operator = defaultConstraint.operator;
      filters[field].constraints[0] = {
        value: null,
        matchMode: defaultConstraint.matchMode
      };
    } else {
      filters[field].value = null;
      filters[field].matchMode = defaultConstraint.matchMode;
    }
    filterClearCallback && filterClearCallback();
    props.onFilterChange(filters);
    props.onFilterApply();
    hide();
  };
  var applyFilter = function applyFilter() {
    var filterApplyClickCallback = getColumnProp('onFilterApplyClick');
    filterApplyClickCallback && filterApplyClickCallback({
      field: field,
      constraints: filterModel
    });
    props.onFilterApply();
    hide();
  };
  var toggleMenu = function toggleMenu() {
    setOverlayVisibleState(function (prevVisible) {
      return !prevVisible;
    });
  };
  var onToggleButtonKeyDown = function onToggleButtonKeyDown(event) {
    switch (event.key) {
      case 'Escape':
      case 'Tab':
        hide();
        break;
      case 'ArrowDown':
        if (overlayVisibleState) {
          var focusable = DomHandler.getFirstFocusableElement(overlayRef.current);
          focusable && focusable.focus();
          event.preventDefault();
        } else if (event.altKey) {
          setOverlayVisibleState(true);
          event.preventDefault();
        }
        break;
    }
  };
  var onContentKeyDown = function onContentKeyDown(event) {
    if (event.key === 'Escape') {
      hide();
      iconRef.current && iconRef.current.focus();
    }
  };
  var onInputChange = function onInputChange(event, index) {
    var filters = _objectSpread$4({}, props.filters);
    var value = event.target.value;
    var filterField = filters[field];
    if (props.display === 'menu' && ObjectUtils.isNotEmpty(filterField.constraints)) {
      filterField.constraints[index].value = value;
    } else {
      filterField.value = value;
    }
    props.onFilterChange(filters);
    if (!getColumnProp('showApplyButton') || props.display === 'row') {
      props.onFilterApply();
    }
  };
  var onInputKeydown = function onInputKeydown(event, _index) {
    if (event.key === 'Enter') {
      if (!getColumnProp('showApplyButton') || props.display === 'menu') {
        applyFilter();
      }
    }
  };
  var onRowMatchModeChange = function onRowMatchModeChange(matchMode) {
    var filterMatchModeChangeCallback = getColumnProp('onFilterMatchModeChange');
    var filters = _objectSpread$4({}, props.filters);
    filters[field].matchMode = matchMode;
    filterMatchModeChangeCallback && filterMatchModeChangeCallback({
      field: field,
      matchMode: matchMode
    });
    props.onFilterChange(filters);
    props.onFilterApply();
    hide();
  };
  var onRowMatchModeKeyDown = function onRowMatchModeKeyDown(event, matchMode, clear) {
    var item = event.target;
    switch (event.key) {
      case 'ArrowDown':
        var nextItem = findNextItem(item);
        if (nextItem) {
          item.removeAttribute('tabindex');
          nextItem.tabIndex = 0;
          nextItem.focus();
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        var prevItem = findPrevItem(item);
        if (prevItem) {
          item.removeAttribute('tabindex');
          prevItem.tabIndex = 0;
          prevItem.focus();
        }
        event.preventDefault();
        break;
      case 'Enter':
        clear ? clearFilter() : onRowMatchModeChange(matchMode.value);
        event.preventDefault();
        break;
    }
  };
  var onOperatorChange = function onOperatorChange(e) {
    var filterOperationChangeCallback = getColumnProp('onFilterOperatorChange');
    var value = e.value;
    var filters = _objectSpread$4({}, props.filters);
    filters[field].operator = value;
    props.onFilterChange(filters);
    filterOperationChangeCallback && filterOperationChangeCallback({
      field: field,
      operator: value
    });
    if (!getColumnProp('showApplyButton')) {
      props.onFilterApply();
    }
  };
  var onMenuMatchModeChange = function onMenuMatchModeChange(value, index) {
    var filterMatchModeChangeCallback = getColumnProp('onFilterMatchModeChange');
    var filters = _objectSpread$4({}, props.filters);
    var filterField = filters[field];
    if (props.display === 'menu' && ObjectUtils.isNotEmpty(filterField.constraints)) {
      filterField.constraints[index].matchMode = value;
    } else {
      filterField.matchMode = value;
    }
    props.onFilterChange(filters);
    filterMatchModeChangeCallback && filterMatchModeChangeCallback({
      field: field,
      matchMode: value,
      index: index
    });
    if (!getColumnProp('showApplyButton')) {
      props.onFilterApply();
    }
  };
  var addConstraint = function addConstraint() {
    var filterConstraintAddCallback = getColumnProp('onFilterConstraintAdd');
    var defaultConstraint = getDefaultConstraint();
    var filters = _objectSpread$4({}, props.filters);
    var newConstraint = {
      value: null,
      matchMode: defaultConstraint.matchMode
    };
    filters[field].constraints.push(newConstraint);
    filterConstraintAddCallback && filterConstraintAddCallback({
      field: field,
      constraint: newConstraint
    });
    props.onFilterChange(filters);
    if (!getColumnProp('showApplyButton')) {
      props.onFilterApply();
    }
  };
  var removeConstraint = function removeConstraint(index) {
    var filterConstraintRemoveCallback = getColumnProp('onFilterConstraintRemove');
    var filters = _objectSpread$4({}, props.filters);
    var removedConstraint = filters[field].constraints.splice(index, 1);
    filterConstraintRemoveCallback && filterConstraintRemoveCallback({
      field: field,
      constraint: removedConstraint
    });
    props.onFilterChange(filters);
    if (!getColumnProp('showApplyButton')) {
      props.onFilterApply();
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.getAttribute(nextItem, 'data-p-column-filter-separator') === true ? findNextItem(nextItem) : nextItem : item.parentElement.firstElementChild;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.getAttribute(prevItem, 'data-p-column-filter-separator') === true ? findPrevItem(prevItem) : prevItem : item.parentElement.lastElementChild;
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var onContentClick = function onContentClick(event) {
    selfClick.current = true;
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: overlayRef.current
    });
  };
  var onContentMouseDown = function onContentMouseDown() {
    selfClick.current = true;
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact$1.autoZIndex, context && context.zIndex.overlay || PrimeReact$1.zIndex.overlay);
    DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    DomHandler.alignOverlay(overlayRef.current, iconRef.current, context && context.appendTo || PrimeReact$1.appendTo, false);
    overlayEventListener.current = function (e) {
      if (!isOutsideClicked(e.target)) {
        selfClick.current = true;
      }
    };
    OverlayService.on('overlay-click', overlayEventListener.current);
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
  };
  var onOverlayExit = function onOverlayExit() {
    onOverlayHide();
  };
  var onOverlayExited = function onOverlayExited() {
    ZIndexUtils.clear(overlayRef.current);
  };
  var onOverlayHide = function onOverlayHide() {
    unbindOverlayListener();
    OverlayService.off('overlay-click', overlayEventListener.current);
    overlayEventListener.current = null;
    selfClick.current = false;
  };
  var fieldConstraints = function fieldConstraints() {
    return filterModel ? filterModel.constraints || [filterModel] : [];
  };
  var operator = function operator() {
    return filterModel.operator;
  };
  var operatorOptions = function operatorOptions() {
    return [{
      label: localeOption('matchAll'),
      value: FilterOperator.AND
    }, {
      label: localeOption('matchAny'),
      value: FilterOperator.OR
    }];
  };
  var noFilterLabel = function noFilterLabel() {
    return localeOption('noFilter');
  };
  var removeRuleButtonLabel = function removeRuleButtonLabel() {
    return localeOption('removeRule');
  };
  var addRuleButtonLabel = function addRuleButtonLabel() {
    return localeOption('addRule');
  };
  var clearButtonLabel = function clearButtonLabel() {
    return localeOption('clear');
  };
  var applyButtonLabel = function applyButtonLabel() {
    return localeOption('apply');
  };
  var filterCallback = function filterCallback(value) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var filters = _objectSpread$4({}, props.filters);
    var meta = filters[field];
    props.display === 'menu' && meta && meta.operator ? filters[field].constraints[index].value = value : filters[field].value = value;
    props.onFilterChange(filters);
  };
  var filterApplyCallback = function filterApplyCallback() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    args && filterCallback(args[0], args[1]);
    props.onFilterApply();
  };
  useUpdateEffect(function () {
    if (props.display === 'menu' && overlayVisibleState) {
      DomHandler.alignOverlay(overlayRef.current, iconRef.current, context && context.appendTo || PrimeReact$1.appendTo, false);
    }
  });
  useMountEffect(function () {
    if (!overlayId.current) {
      overlayId.current = UniqueComponentId();
    }
  });
  useUnmountEffect(function () {
    if (overlayEventListener.current) {
      OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }
    if (overlayRef.current) {
      ZIndexUtils.clear(overlayRef.current);
      onOverlayHide();
    }
  });
  var createFilterElement = function createFilterElement(model, index) {
    var value = model ? model.value : null;
    return getColumnProp('filterElement') ? ObjectUtils.getJSXElement(getColumnProp('filterElement'), {
      field: field,
      index: index,
      filterModel: model,
      value: value,
      filterApplyCallback: filterApplyCallback,
      filterCallback: filterCallback
    }) : /*#__PURE__*/React.createElement(InputText, {
      type: getColumnProp('filterType'),
      value: value || '',
      onChange: function onChange(e) {
        return onInputChange(e, index);
      },
      onKeyDown: function onKeyDown(e) {
        return onInputKeydown(e);
      },
      className: "p-column-filter",
      placeholder: getColumnProp('filterPlaceholder'),
      maxLength: getColumnProp('filterMaxLength'),
      "aria-label": getColumnProp('filterPlaceholder'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: props.metaData
      }
    });
  };
  var createRowFilterElement = function createRowFilterElement() {
    if (props.display === 'row') {
      var content = createFilterElement(filterModel, 0);
      var filterInputProps = mergeProps({
        className: cx('filterInput')
      }, getColumnPTOptions('filterInput'));
      return /*#__PURE__*/React.createElement("div", filterInputProps, content);
    }
    return null;
  };
  var createMenuFilterElement = function createMenuFilterElement(fieldConstraint, index) {
    return props.display === 'menu' ? createFilterElement(fieldConstraint, index) : null;
  };
  var createMenuButton = function createMenuButton() {
    if (!isShowMenuButton()) {
      return null;
    }
    var filterIconProps = mergeProps({
      'aria-hidden': true
    }, getColumnPTOptions('filterIcon'));
    var icon = props.filterIcon || /*#__PURE__*/React.createElement(FilterIcon, filterIconProps);
    var columnFilterIcon = IconUtils.getJSXIcon(icon, _objectSpread$4({}, filterIconProps), {
      props: props
    });
    var label = overlayVisibleState ? ariaLabel('hideFilterMenu') : ariaLabel('showFilterMenu');
    var filterMenuButtonProps = mergeProps({
      type: 'button',
      className: cx('filterMenuButton', {
        overlayVisibleState: overlayVisibleState,
        hasFilter: hasFilter
      }),
      'aria-haspopup': true,
      'aria-expanded': overlayVisibleState,
      'aria-label': label,
      'aria-controls': overlayId.current,
      onClick: function onClick(e) {
        return toggleMenu();
      },
      onKeyDown: function onKeyDown(e) {
        return onToggleButtonKeyDown(e);
      }
    }, getColumnPTOptions('filterMenuButton', {
      context: {
        active: hasFilter()
      }
    }));
    return /*#__PURE__*/React.createElement("button", _extends({
      ref: iconRef
    }, filterMenuButtonProps), columnFilterIcon, /*#__PURE__*/React.createElement(Ripple, null));
  };
  var createClearButton = function createClearButton() {
    if (!isShowClearButton()) {
      return null;
    }
    var filterClearIconProps = mergeProps({
      'aria-hidden': true
    }, getColumnPTOptions('filterClearIcon'));
    var icon = props.filterClearIcon || /*#__PURE__*/React.createElement(FilterSlashIcon, filterClearIconProps);
    var filterClearIcon = IconUtils.getJSXIcon(icon, _objectSpread$4({}, filterClearIconProps), {
      props: props
    });
    var clearLabel = clearButtonLabel();
    var headerFilterClearButtonProps = mergeProps({
      className: cx('headerFilterClearButton', {
        hasRowFilter: hasRowFilter
      }),
      type: 'button',
      onClick: function onClick(e) {
        return clearFilter();
      },
      'aria-label': clearLabel
    }, getColumnPTOptions('headerFilterClearButton', {
      context: {
        hidden: hasRowFilter()
      }
    }));
    return /*#__PURE__*/React.createElement("button", headerFilterClearButtonProps, filterClearIcon, /*#__PURE__*/React.createElement(Ripple, null));
  };
  var createRowItems = function createRowItems() {
    if (isShowMatchModes()) {
      var _matchModes = matchModes();
      var _noFilterLabel = noFilterLabel();
      var filterSeparatorProps = mergeProps({
        className: cx('filterSeparator'),
        'data-p-column-filter-separator': true
      }, getColumnPTOptions('filterSeparator'));
      var filterRowItemProps = mergeProps({
        className: cx('filterRowItem', {
          isRowMatchModeSelected: isRowMatchModeSelected,
          isShowMatchModes: isShowMatchModes
        }),
        onClick: function onClick(e) {
          return clearFilter();
        },
        onKeyDown: function onKeyDown(e) {
          return onRowMatchModeKeyDown(e, null, true);
        }
      }, getColumnPTOptions('filterRowItem'));
      var filterRowItemsProps = mergeProps({
        className: cx('filterRowItems')
      }, getColumnPTOptions('filterRowItems'));
      return /*#__PURE__*/React.createElement("ul", filterRowItemsProps, _matchModes.map(function (matchMode, i) {
        var value = matchMode.value,
          label = matchMode.label;
        var tabIndex = i === 0 ? 0 : null;
        var filterRowItemProps = mergeProps({
          className: cx('filterRowItem', {
            isRowMatchModeSelected: isRowMatchModeSelected,
            isShowMatchModes: isShowMatchModes,
            value: value
          }),
          onClick: function onClick() {
            return onRowMatchModeChange(value);
          },
          onKeyDown: function onKeyDown(e) {
            return onRowMatchModeKeyDown(e, matchMode);
          },
          tabIndex: tabIndex
        }, getColumnPTOptions('filterRowItem', {
          context: {
            highlighted: matchMode && isRowMatchModeSelected(value)
          }
        }));
        return /*#__PURE__*/React.createElement("li", _extends({}, filterRowItemProps, {
          key: label
        }), label);
      }), /*#__PURE__*/React.createElement("li", filterSeparatorProps), /*#__PURE__*/React.createElement("li", filterRowItemProps, _noFilterLabel));
    }
    return null;
  };
  var createOperator = function createOperator() {
    if (isShowOperator()) {
      var options = operatorOptions();
      var value = operator();
      var filterOperatorProps = mergeProps({
        className: cx('filterOperator')
      }, getColumnPTOptions('filterOperator'));
      return /*#__PURE__*/React.createElement("div", filterOperatorProps, /*#__PURE__*/React.createElement(Dropdown, {
        options: options,
        value: value,
        onChange: onOperatorChange,
        className: "p-column-filter-operator-dropdown",
        pt: getColumnPTOptions('filterOperatorDropdown'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: props.metaData
        },
        "aria-label": ariaLabel('filterOperator')
      }));
    }
    return null;
  };
  var createMatchModeDropdown = function createMatchModeDropdown(constraint, index) {
    if (isShowMatchModes()) {
      var options = matchModes();
      return /*#__PURE__*/React.createElement(Dropdown, {
        options: options,
        value: constraint.matchMode,
        onChange: function onChange(e) {
          return onMenuMatchModeChange(e.value, index);
        },
        className: "p-column-filter-matchmode-dropdown",
        pt: getColumnPTOptions('filterMatchModeDropdown'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: props.metaData
        },
        "aria-label": ariaLabel('filterConstraint')
      });
    }
    return null;
  };
  var createRemoveButton = function createRemoveButton(index) {
    if (showRemoveIcon()) {
      var removeRuleLabel = removeRuleButtonLabel();
      return /*#__PURE__*/React.createElement(Button, {
        type: "button",
        icon: props.filterRemoveIcon || /*#__PURE__*/React.createElement(TrashIcon, null),
        className: "p-column-filter-remove-button p-button-text p-button-danger p-button-sm",
        onClick: function onClick() {
          return removeConstraint(index);
        },
        label: removeRuleLabel,
        pt: getColumnPTOptions('filterRemoveButton'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: props.metaData
        }
      });
    }
    return null;
  };
  var createConstraints = function createConstraints() {
    var _fieldConstraints = fieldConstraints();
    var filterConstraintsProps = mergeProps({
      className: cx('filterConstraints')
    }, getColumnPTOptions('filterConstraints'));
    var filterConstraintProps = mergeProps({
      className: cx('filterConstraint')
    }, getColumnPTOptions('filterConstraint'));
    return /*#__PURE__*/React.createElement("div", filterConstraintsProps, _fieldConstraints.map(function (fieldConstraint, i) {
      var matchModeDropdown = createMatchModeDropdown(fieldConstraint, i);
      var menuFilterElement = createMenuFilterElement(fieldConstraint, i);
      var removeButton = createRemoveButton(i);
      var filterRemoveProps = mergeProps(getColumnPTOptions('filterRemove'));
      return /*#__PURE__*/React.createElement("div", _extends({}, filterConstraintProps, {
        key: i
      }), matchModeDropdown, menuFilterElement, /*#__PURE__*/React.createElement("div", filterRemoveProps, removeButton));
    }));
  };
  var createAddRule = function createAddRule() {
    if (isShowAddConstraint()) {
      var addRuleLabel = addRuleButtonLabel();
      var filterAddRuleProps = mergeProps({
        className: cx('filterAddRule')
      }, getColumnPTOptions('filterAddRule'));
      return /*#__PURE__*/React.createElement("div", filterAddRuleProps, /*#__PURE__*/React.createElement(Button, {
        type: "button",
        label: addRuleLabel,
        icon: props.filterAddIcon || /*#__PURE__*/React.createElement(PlusIcon, null),
        className: "p-column-filter-add-button p-button-text p-button-sm",
        onClick: addConstraint,
        pt: getColumnPTOptions('filterAddRuleButton'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: props.metaData
        }
      }));
    }
    return null;
  };
  var createFilterClearButton = function createFilterClearButton() {
    if (getColumnProp('showClearButton')) {
      if (!getColumnProp('filterClear')) {
        var clearLabel = clearButtonLabel();
        return /*#__PURE__*/React.createElement(Button, {
          type: "button",
          outlined: true,
          size: "small",
          onClick: clearFilter,
          label: clearLabel,
          pt: getColumnPTOptions('filterClearButton'),
          unstyled: props.unstyled,
          __parentMetadata: {
            parent: props.metaData
          }
        });
      }
      return ObjectUtils.getJSXElement(getColumnProp('filterClear'), {
        field: field,
        filterModel: filterModel,
        filterClearCallback: clearFilter
      });
    }
    return null;
  };
  var createFilterApplyButton = function createFilterApplyButton() {
    if (getColumnProp('showApplyButton')) {
      if (!getColumnProp('filterApply')) {
        var applyLabel = applyButtonLabel();
        return /*#__PURE__*/React.createElement(Button, {
          type: "button",
          size: "small",
          onClick: applyFilter,
          label: applyLabel,
          pt: getColumnPTOptions('filterApplyButton'),
          unstyled: props.unstyled,
          __parentMetadata: {
            parent: props.metaData
          }
        });
      }
      return ObjectUtils.getJSXElement(getColumnProp('filterApply'), {
        field: field,
        filterModel: filterModel,
        filterApplyCallback: applyFilter
      });
    }
    return null;
  };
  var createButtonBar = function createButtonBar() {
    var clearButton = createFilterClearButton();
    var applyButton = createFilterApplyButton();
    var filterButtonbarProps = mergeProps({
      className: cx('filterButtonBar')
    }, getColumnPTOptions('filterButtonBar'));
    return /*#__PURE__*/React.createElement("div", filterButtonbarProps, clearButton, applyButton);
  };
  var createItems = function createItems() {
    var operator = createOperator();
    var constraints = createConstraints();
    var addRule = createAddRule();
    var buttonBar = createButtonBar();
    return /*#__PURE__*/React.createElement(React.Fragment, null, operator, constraints, addRule, buttonBar);
  };
  var createOverlay = function createOverlay() {
    var style = getColumnProp('filterMenuStyle');
    var filterHeader = ObjectUtils.getJSXElement(getColumnProp('filterHeader'), {
      field: field,
      filterModel: filterModel,
      filterApplyCallback: filterApplyCallback
    });
    var filterFooter = ObjectUtils.getJSXElement(getColumnProp('filterFooter'), {
      field: field,
      filterModel: filterModel,
      filterApplyCallback: filterApplyCallback
    });
    var items = props.display === 'row' ? createRowItems() : createItems();
    var filterOverlayProps = mergeProps({
      style: style,
      className: cx('filterOverlay', {
        columnFilterProps: props,
        context: context,
        getColumnProp: getColumnProp
      }),
      onKeyDown: function onKeyDown(e) {
        return onContentKeyDown(e);
      },
      onClick: function onClick(e) {
        return onContentClick(e);
      },
      onMouseDown: function onMouseDown(e) {
        return onContentMouseDown();
      },
      id: overlayId.current,
      'aria-modal': overlayVisibleState,
      role: 'dialog'
    }, getColumnPTOptions('filterOverlay'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": overlayVisibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      unmountOnExit: true,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, getColumnPTOptions('transition'));
    return /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: overlayRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: overlayRef
    }, filterOverlayProps), /*#__PURE__*/React.createElement(FocusTrap$1, {
      autoFocus: true
    }, filterHeader, items, filterFooter))));
  };
  var rowFilterElement = createRowFilterElement();
  var menuButton = createMenuButton();
  var clearButton = createClearButton();
  var overlay = createOverlay();
  var columnFilter = mergeProps({
    className: cx('columnFilter', {
      columnFilterProps: props
    })
  }, getColumnPTOptions('columnFilter'));
  return /*#__PURE__*/React.createElement("div", columnFilter, rowFilterElement, menuButton, clearButton, overlay);
});
ColumnFilter.displayName = 'ColumnFilter';

function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var HeaderCheckbox = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var cProps = getColumnProps();
    var columnMetaData = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {},
      context: {
        checked: props.checked,
        disabled: props.disabled
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var onChange = function onChange(event) {
    if (!props.disabled) {
      props.onChange({
        originalEvent: event,
        checked: !props.checked
      });
    }
  };
  var headerCheckboxIconProps = mergeProps({
    className: cx('checkIcon')
  }, getColumnPTOptions('headerCheckbox.icon'));
  var icon = props.checked ? props.checkIcon || /*#__PURE__*/React.createElement(CheckIcon, headerCheckboxIconProps) : null;
  var checkIcon = IconUtils.getJSXIcon(icon, _objectSpread$3({}, headerCheckboxIconProps), {
    props: props
  });
  var tabIndex = props.disabled ? null : 0;
  var headerCheckboxProps = mergeProps({
    role: 'checkbox',
    'aria-checked': props.checked,
    'aria-label': props.checked ? ariaLabel('selectAll') : ariaLabel('unselectAll'),
    tabIndex: tabIndex,
    onChange: onChange,
    icon: checkIcon,
    checked: props.checked,
    disabled: props.disabled
  }, getColumnPTOptions('headerCheckbox'));
  return /*#__PURE__*/React.createElement(Checkbox, headerCheckboxProps);
});
HeaderCheckbox.displayName = 'HeaderCheckbox';

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var HeaderCell = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState({}),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    styleObjectState = _React$useState2[0],
    setStyleObjectState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var prevColumn = usePrevious(props.column);
  var mergeProps = useMergeProps();
  var parentMetaData = props.metaData,
    ptCallbacks = props.ptCallbacks,
    index = props.index;
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
    cx = _props$ptCallbacks.cx;
  var params = {
    index: index
  };
  var parentParams = _objectSpread$2(_objectSpread$2({}, parentMetaData), params);
  var getColumnProps = function getColumnProps() {
    return ColumnBase.getCProps(props.column);
  };
  var getColumnPTOptions = function getColumnPTOptions(key) {
    var cProps = getColumnProps();
    var columnMetaData = {
      props: cProps,
      parent: parentParams,
      hostName: props.hostName,
      state: {
        styleObject: styleObjectState
      },
      context: {
        index: props.index,
        sorted: getSortMeta().sorted,
        resizable: props.resizableColumns,
        size: props.metaData.props.size,
        showGridlines: props.metaData.props.showGridlines
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var isBadgeVisible = function isBadgeVisible() {
    return props.multiSortMeta && props.multiSortMeta.length > 1;
  };
  var isSortableDisabled = function isSortableDisabled() {
    return !getColumnProp('sortable') || getColumnProp('sortable') && (props.allSortableDisabled || getColumnProp('sortableDisabled'));
  };
  var getColumnProp = function getColumnProp() {
    return props.column ? typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string' ? ColumnBase.getCProp(props.column, arguments.length <= 0 ? undefined : arguments[0]) : ColumnBase.getCProp((arguments.length <= 0 ? undefined : arguments[0]) || props.column, arguments.length <= 1 ? undefined : arguments[1]) : null;
  };
  var getStyle = function getStyle() {
    var headerStyle = getColumnProp('headerStyle');
    var columnStyle = getColumnProp('style');
    return getColumnProp('frozen') ? Object.assign({}, columnStyle, headerStyle, styleObjectState) : Object.assign({}, columnStyle, headerStyle);
  };
  var getMultiSortMetaIndex = function getMultiSortMetaIndex() {
    return props.multiSortMeta.findIndex(function (meta) {
      return meta.field === getColumnProp('field') || meta.field === getColumnProp('sortField');
    });
  };
  var getSortMeta = function getSortMeta() {
    var sorted = false;
    var sortOrder = 0;
    var metaIndex = -1;
    if (props.sortMode === 'single') {
      sorted = props.sortField && (props.sortField === getColumnProp('field') || props.sortField === getColumnProp('sortField'));
      sortOrder = sorted ? props.sortOrder : 0;
    } else if (props.sortMode === 'multiple') {
      metaIndex = getMultiSortMetaIndex();
      if (metaIndex > -1) {
        sorted = true;
        sortOrder = props.multiSortMeta[metaIndex].order;
      }
    }
    return {
      sorted: sorted,
      sortOrder: sortOrder,
      metaIndex: metaIndex
    };
  };
  var getAriaSort = function getAriaSort(_ref) {
    var sorted = _ref.sorted,
      sortOrder = _ref.sortOrder;
    if (getColumnProp('sortable')) {
      if (sorted && sortOrder < 0) {
        return 'descending';
      } else if (sorted && sortOrder > 0) {
        return 'ascending';
      }
      return 'none';
    }
    return null;
  };
  var updateStickyPosition = function updateStickyPosition() {
    if (getColumnProp('frozen')) {
      var styleObject = _objectSpread$2({}, styleObjectState);
      var align = getColumnProp('alignFrozen');
      if (align === 'right') {
        var right = 0;
        var next = elementRef.current.nextElementSibling;
        if (next) {
          right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
        }
        styleObject.right = right + 'px';
      } else {
        var left = 0;
        var prev = elementRef.current.previousElementSibling;
        if (prev) {
          left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
        }
        styleObject.left = left + 'px';
      }
      var filterRow = elementRef.current.parentElement.nextElementSibling;
      if (filterRow) {
        var _index = DomHandler.index(elementRef.current);
        filterRow.children[_index].style.left = styleObject.left;
        filterRow.children[_index].style.right = styleObject.right;
      }
      var isSameStyle = styleObjectState.left === styleObject.left && styleObjectState.right === styleObject.right;
      !isSameStyle && setStyleObjectState(styleObject);
    }
  };
  var updateSortableDisabled = function updateSortableDisabled(prevColumn) {
    if (getColumnProp(prevColumn, 'sortableDisabled') !== getColumnProp('sortableDisabled') || getColumnProp(prevColumn, 'sortable') !== getColumnProp('sortable')) {
      props.onSortableChange();
    }
  };
  var _onClick = function onClick(event) {
    if (!isSortableDisabled()) {
      var targetNode = event.target;
      if (DomHandler.getAttribute(targetNode, 'data-p-sortable-column') === true || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headertitle' || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headercontent' || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'sortIcon' || DomHandler.getAttribute(targetNode.parentElement, 'data-pc-section') === 'sortIcon' || targetNode.closest('[data-p-sortable-column="true"]') && !targetNode.closest('[data-pc-section="filtermenubutton"]')) {
        DomHandler.clearSelection();
        props.onSortChange({
          originalEvent: event,
          column: props.column,
          sortableDisabledFields: props.sortableDisabledFields
        });
      }
    }
  };
  var _onMouseDown = function onMouseDown(event) {
    props.onColumnMouseDown({
      originalEvent: event,
      column: props.column
    });
  };
  var _onKeyDown = function onKeyDown(event) {
    if ((event.code == 'Enter' || event.code === 'NumpadEnter' || event.code == 'Space') && event.currentTarget === elementRef.current && DomHandler.getAttribute(event.currentTarget, 'data-p-sortable-column') === 'true') {
      _onClick(event);
      event.preventDefault();
    }
  };
  var _onDragStart = function onDragStart(event) {
    props.onColumnDragStart({
      originalEvent: event,
      column: props.column
    });
  };
  var _onDragOver = function onDragOver(event) {
    props.onColumnDragOver({
      originalEvent: event,
      column: props.column
    });
  };
  var _onDragLeave = function onDragLeave(event) {
    props.onColumnDragLeave({
      originalEvent: event,
      column: props.column
    });
  };
  var _onDrop = function onDrop(event) {
    props.onColumnDrop({
      originalEvent: event,
      column: props.column
    });
  };
  var onResizerMouseDown = function onResizerMouseDown(event) {
    props.onColumnResizeStart({
      originalEvent: event,
      column: props.column
    });
  };
  var onResizerClick = function onResizerClick(event) {
    if (props.onColumnResizerClick) {
      props.onColumnResizerClick({
        originalEvent: event,
        element: event.currentTarget.parentElement,
        column: props.column
      });
      event.preventDefault();
    }
  };
  var onResizerDoubleClick = function onResizerDoubleClick(event) {
    if (props.onColumnResizerDoubleClick) {
      props.onColumnResizerDoubleClick({
        originalEvent: event,
        element: event.currentTarget.parentElement,
        column: props.column
      });
      event.preventDefault();
    }
  };
  React.useEffect(function () {
    if (getColumnProp('frozen')) {
      updateStickyPosition();
    }
    updateSortableDisabled(prevColumn);
  });
  var createResizer = function createResizer() {
    if (props.resizableColumns && !getColumnProp('frozen')) {
      var columnResizerProps = mergeProps({
        className: cx('columnResizer'),
        onMouseDown: function onMouseDown(e) {
          return onResizerMouseDown(e);
        },
        onClick: function onClick(e) {
          return onResizerClick(e);
        },
        onDoubleClick: function onDoubleClick(e) {
          return onResizerDoubleClick(e);
        }
      }, getColumnPTOptions('columnResizer'));
      return /*#__PURE__*/React.createElement("span", columnResizerProps);
    }
    return null;
  };
  var createTitle = function createTitle() {
    var title = ObjectUtils.getJSXElement(getColumnProp('header'), {
      props: props.tableProps
    });
    var headerTitleProps = mergeProps({
      className: cx('headerTitle')
    }, getColumnPTOptions('headerTitle'));
    return /*#__PURE__*/React.createElement("span", headerTitleProps, title);
  };
  var createSortIcon = function createSortIcon(_ref2) {
    var sorted = _ref2.sorted,
      sortOrder = _ref2.sortOrder;
    if (getColumnProp('sortable')) {
      var sortIconProps = mergeProps({
        className: cx('sortIcon')
      }, getColumnPTOptions('sortIcon'));
      var sortProps = mergeProps(getColumnPTOptions('sort'));
      var icon = sorted ? sortOrder < 0 ? /*#__PURE__*/React.createElement(SortAmountDownIcon, sortIconProps) : /*#__PURE__*/React.createElement(SortAmountUpAltIcon, sortIconProps) : /*#__PURE__*/React.createElement(SortAltIcon, sortIconProps);
      var sortIcon = IconUtils.getJSXIcon(props.sortIcon || icon, _objectSpread$2({}, sortIconProps), {
        props: props,
        sorted: sorted,
        sortOrder: sortOrder
      });
      return /*#__PURE__*/React.createElement("span", sortProps, sortIcon);
    }
    return null;
  };
  var createBadge = function createBadge(_ref3) {
    var metaIndex = _ref3.metaIndex;
    if (metaIndex !== -1 && isBadgeVisible()) {
      var value = props.groupRowsBy && props.groupRowsBy === props.groupRowSortField ? metaIndex : metaIndex + 1;
      var sortBadgeProps = mergeProps({
        className: cx('sortBadge')
      }, getColumnPTOptions('root'), getColumnPTOptions('sortBadge'));
      return /*#__PURE__*/React.createElement("span", sortBadgeProps, value);
    }
    return null;
  };
  var createCheckbox = function createCheckbox() {
    if (props.showSelectAll && getColumnProp('selectionMode') === 'multiple' && props.filterDisplay !== 'row') {
      var allRowsSelected = props.allRowsSelected(props.value);
      return /*#__PURE__*/React.createElement(HeaderCheckbox, {
        hostName: props.hostName,
        checked: allRowsSelected,
        onChange: props.onColumnCheckboxChange,
        disabled: props.empty,
        ptCallbacks: ptCallbacks,
        metaData: parentMetaData
      });
    }
    return null;
  };
  var createFilter = function createFilter() {
    if (props.filterDisplay === 'menu' && getColumnProp('filter')) {
      return /*#__PURE__*/React.createElement(ColumnFilter, {
        hostName: props.hostName,
        display: "menu",
        column: props.column,
        filters: props.filters,
        onFilterChange: props.onFilterChange,
        onFilterApply: props.onFilterApply,
        filtersStore: props.filtersStore,
        filterIcon: props.filterIcon,
        filterClearIcon: props.filterClearIcon,
        ptCallbacks: ptCallbacks,
        metaData: parentMetaData,
        unstyled: props.unstyled
      });
    }
    return null;
  };
  var createHeader = function createHeader(sortMeta) {
    var title = createTitle();
    var sortIcon = createSortIcon(sortMeta);
    var badge = createBadge(sortMeta);
    var checkbox = createCheckbox();
    var filter = createFilter();
    var headerContentProps = mergeProps({
      className: cx('headerContent')
    }, getColumnPTOptions('headerContent'));
    return /*#__PURE__*/React.createElement("div", headerContentProps, title, sortIcon, badge, checkbox, filter);
  };
  var createElement = function createElement() {
    var _isSortableDisabled = isSortableDisabled();
    var sortMeta = getSortMeta();
    var style = getStyle();
    var align = getColumnProp('alignHeader') || getColumnProp('align');
    var frozen = getColumnProp('frozen');
    var tabIndex = getColumnProp('sortable') && !_isSortableDisabled ? props.tabIndex : null;
    var colSpan = getColumnProp('colSpan');
    var rowSpan = getColumnProp('rowSpan');
    var ariaSort = getAriaSort(sortMeta);
    var headerTooltip = getColumnProp('headerTooltip');
    var headerClassName = getColumnProp('headerClassName');
    var hasTooltip = ObjectUtils.isNotEmpty(headerTooltip);
    var headerTooltipOptions = getColumnProp('headerTooltipOptions');
    var resizer = createResizer();
    var header = createHeader(sortMeta);
    var headerCellProps = mergeProps({
      className: classNames(headerClassName, cx('headerCell', {
        headerProps: props,
        frozen: frozen,
        sortMeta: sortMeta,
        align: align,
        _isSortableDisabled: _isSortableDisabled,
        getColumnProp: getColumnProp
      })),
      style: style,
      role: 'columnheader',
      onClick: function onClick(e) {
        return _onClick(e);
      },
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onMouseDown: function onMouseDown(e) {
        return _onMouseDown(e);
      },
      onDragStart: function onDragStart(e) {
        return _onDragStart(e);
      },
      onDragOver: function onDragOver(e) {
        return _onDragOver(e);
      },
      onDragLeave: function onDragLeave(e) {
        return _onDragLeave(e);
      },
      onDrop: function onDrop(e) {
        return _onDrop(e);
      },
      tabIndex: tabIndex,
      colSpan: colSpan,
      rowSpan: rowSpan,
      'aria-sort': ariaSort,
      'data-p-sortable-column': getColumnProp('sortable'),
      'data-p-resizable-column': props.resizableColumns,
      'data-p-highlight': sortMeta.sorted,
      'data-p-filter-column': !props.metaData.props.headerColumnGroup && props.filterDisplay === 'row',
      'data-p-frozen-column': getColumnProp('frozen'),
      'data-p-reorderable-column': props.reorderableColumns
    }, getColumnPTOptions('root'), getColumnPTOptions('headerCell'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("th", _extends({
      ref: elementRef
    }, headerCellProps), resizer, header), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
      target: elementRef,
      content: headerTooltip,
      pt: getColumnPTOptions('tooltip'),
      unstyled: props.unstyled
    }, headerTooltipOptions)));
  };
  var element = createElement();
  return element;
});
HeaderCell.displayName = 'HeaderCell';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TableHeader = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sortableDisabledFieldsState = _React$useState2[0],
    setSortableDisabledFieldsState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    allSortableDisabledState = _React$useState4[0],
    setAllSortableDisabledState = _React$useState4[1];
  var mergeProps = useMergeProps();
  var isSingleSort = props.sortMode === 'single';
  var isMultipleSort = props.sortMode === 'multiple';
  var isAllSortableDisabled = isSingleSort && allSortableDisabledState;
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
  var getRowProps = function getRowProps(row) {
    return ColumnGroupBase.getCProps(row);
  };
  var getColumnGroupProps = function getColumnGroupProps() {
    return props.headerColumnGroup ? ptmo(ColumnGroupBase.getCProps(props.headerColumnGroup)) : undefined;
  };
  var getColumnGroupPTOptions = function getColumnGroupPTOptions(key) {
    var cGProps = getColumnGroupProps();
    var columnGroupMetaData = {
      props: cGProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        sortableDisabledFields: sortableDisabledFieldsState,
        allSortableDisabled: allSortableDisabledState
      }
    };
    return mergeProps(ptm("columnGroup.".concat(key), {
      columnGroup: columnGroupMetaData
    }), ptm("columnGroup.".concat(key), columnGroupMetaData), ptmo(cGProps, key, columnGroupMetaData));
  };
  var getColumnPTOptions = function getColumnPTOptions(column, key) {
    var cProps = getColumnProps(column);
    var columnMetaData = {
      props: cProps,
      parent: props.metaData,
      hostName: props.hostName,
      state: {
        sortableDisabledFields: sortableDisabledFieldsState,
        allSortableDisabled: allSortableDisabledState
      }
    };
    return mergeProps(ptm("column.".concat(key), {
      column: columnMetaData
    }), ptm("column.".concat(key), columnMetaData), ptmo(cProps, key, columnMetaData));
  };
  var getRowPTOptions = function getRowPTOptions(row, key) {
    var rProps = getRowProps(row);
    var rowMetaData = {
      props: rProps,
      parent: props.metaData,
      hostName: props.hostName
    };
    return mergeProps(ptm("row.".concat(key), {
      row: rowMetaData
    }), ptm("row.".concat(key), rowMetaData), ptmo(rProps, key, rowMetaData));
  };
  var isColumnSorted = function isColumnSorted(column) {
    return props.sortField !== null ? getColumnProp(column, 'field') === props.sortField || getColumnProp(column, 'sortField') === props.sortField : false;
  };
  var updateSortableDisabled = function updateSortableDisabled() {
    if (isSingleSort || isMultipleSort && props.onSortChange) {
      var sortableDisabledFields = [];
      var allSortableDisabled = false;
      props.columns.forEach(function (column) {
        if (getColumnProp(column, 'sortableDisabled')) {
          sortableDisabledFields.push(getColumnProp(column, 'sortField') || getColumnProp(column, 'field'));
          if (!allSortableDisabled && isColumnSorted(column)) {
            allSortableDisabled = true;
          }
        }
      });
      setSortableDisabledFieldsState(sortableDisabledFields);
      setAllSortableDisabledState(allSortableDisabled);
    }
  };
  var onSortableChange = function onSortableChange() {
    updateSortableDisabled();
  };
  var onCheckboxChange = function onCheckboxChange(e) {
    props.onColumnCheckboxChange(e, props.value);
  };
  useMountEffect(function () {
    updateSortableDisabled();
  });
  var createGroupHeaderCells = function createGroupHeaderCells(row) {
    var columns = React.Children.toArray(RowBase.getCProp(row, 'children'));
    return createHeaderCells(columns);
  };
  var createHeaderCells = function createHeaderCells(columns) {
    return React.Children.map(columns, function (col, i) {
      var isVisible = col ? !getColumnProp(col, 'hidden') : true;
      var key = col ? getColumnProp(col, 'columnKey') || getColumnProp(col, 'field') || i : i;
      return isVisible && /*#__PURE__*/React.createElement(HeaderCell, {
        hostName: props.hostName,
        allRowsSelected: props.allRowsSelected,
        allSortableDisabled: isAllSortableDisabled,
        column: col,
        index: i,
        empty: props.empty,
        filterClearIcon: props.filterClearIcon,
        filterDisplay: props.filterDisplay,
        filterIcon: props.filterIcon,
        filters: props.filters,
        filtersStore: props.filtersStore,
        groupRowSortField: props.groupRowSortField,
        groupRowsBy: props.groupRowsBy,
        key: key,
        multiSortMeta: props.multiSortMeta,
        onColumnCheckboxChange: onCheckboxChange,
        onColumnDragLeave: props.onColumnDragLeave,
        onColumnDragOver: props.onColumnDragOver,
        onColumnDragStart: props.onColumnDragStart,
        onColumnDrop: props.onColumnDrop,
        onColumnMouseDown: props.onColumnMouseDown,
        onColumnResizeStart: props.onColumnResizeStart,
        onColumnResizerClick: props.onColumnResizerClick,
        onColumnResizerDoubleClick: props.onColumnResizerDoubleClick,
        onFilterApply: props.onFilterApply,
        onFilterChange: props.onFilterChange,
        onSortChange: props.onSortChange,
        onSortableChange: onSortableChange,
        reorderableColumns: props.reorderableColumns,
        resizableColumns: props.resizableColumns,
        showSelectAll: props.showSelectAll,
        sortField: props.sortField,
        sortIcon: props.sortIcon,
        sortMode: props.sortMode,
        sortOrder: props.sortOrder,
        sortableDisabledFields: sortableDisabledFieldsState,
        tabIndex: props.tabIndex,
        tableProps: props.tableProps,
        value: props.value,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData,
        unstyled: props.unstyled
      });
    });
  };
  var createCheckbox = function createCheckbox(selectionMode) {
    if (props.showSelectAll && selectionMode === 'multiple') {
      var allRowsSelected = props.allRowsSelected(props.value);
      return /*#__PURE__*/React.createElement(HeaderCheckbox, {
        hostName: props.hostName,
        checked: allRowsSelected,
        onChange: onCheckboxChange,
        disabled: props.empty,
        ptCallbacks: props.ptCallbacks,
        metaData: props.metaData
      });
    }
    return null;
  };
  var createFilter = function createFilter(column, filter) {
    if (filter) {
      return /*#__PURE__*/React.createElement(ColumnFilter, {
        hostName: props.hostName,
        display: "row",
        column: column,
        filterClearIcon: props.filterClearIcon,
        filterIcon: props.filterIcon,
        filters: props.filters,
        filtersStore: props.filtersStore,
        metaData: props.metaData,
        onFilterApply: props.onFilterApply,
        onFilterChange: props.onFilterChange,
        ptCallbacks: props.ptCallbacks,
        unstyled: props.unstyled
      });
    }
    return null;
  };
  var createFilterCells = function createFilterCells() {
    return React.Children.map(props.columns, function (col, i) {
      var isVisible = !getColumnProp(col, 'hidden');
      if (isVisible) {
        var _ColumnBase$getCProps = ColumnBase.getCProps(col),
          filterHeaderStyle = _ColumnBase$getCProps.filterHeaderStyle,
          style = _ColumnBase$getCProps.style,
          filterHeaderClassName = _ColumnBase$getCProps.filterHeaderClassName,
          className = _ColumnBase$getCProps.className,
          frozen = _ColumnBase$getCProps.frozen,
          columnKey = _ColumnBase$getCProps.columnKey,
          field = _ColumnBase$getCProps.field,
          selectionMode = _ColumnBase$getCProps.selectionMode,
          filter = _ColumnBase$getCProps.filter;
        var colStyle = _objectSpread$1(_objectSpread$1({}, filterHeaderStyle || {}), style || {});
        var colKey = columnKey || field || i;
        var checkbox = createCheckbox(selectionMode);
        var filterRow = createFilter(col, filter);
        var headerCellProps = mergeProps({
          style: colStyle,
          className: classNames(filterHeaderClassName, className, cx('headerCell', {
            frozen: frozen,
            column: col
          })),
          key: colKey
        }, getColumnPTOptions(col, 'root'), getColumnPTOptions(col, 'headerCell'));
        return /*#__PURE__*/React.createElement("th", headerCellProps, checkbox, filterRow);
      }
      return null;
    });
  };
  var createContent = function createContent() {
    if (props.headerColumnGroup) {
      var rows = React.Children.toArray(ColumnGroupBase.getCProp(props.headerColumnGroup, 'children'));
      return rows.map(function (row, i) {
        var headerRowProps = mergeProps({
          role: 'row'
        }, getRowPTOptions(row, 'root'));
        return /*#__PURE__*/React.createElement("tr", _extends({}, headerRowProps, {
          key: i
        }), createGroupHeaderCells(row));
      });
    }
    var headerRowProps = mergeProps({
      role: 'row'
    }, ptm('headerRow', {
      hostName: props.hostName
    }));
    var headerRow = /*#__PURE__*/React.createElement("tr", headerRowProps, createHeaderCells(props.columns));
    var filterRow = props.filterDisplay === 'row' && /*#__PURE__*/React.createElement("tr", headerRowProps, createFilterCells());
    return /*#__PURE__*/React.createElement(React.Fragment, null, headerRow, filterRow);
  };
  var content = createContent();
  var theadProps = mergeProps({
    className: cx('thead'),
    role: 'rowgroup'
  }, getColumnGroupPTOptions('root'), ptm('thead', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React.createElement("thead", theadProps, content);
});
TableHeader.displayName = 'TableHeader';

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DataTable = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var mergeProps = useMergeProps();
  var props = DataTableBase.getProps(inProps, context);
  var _React$useState = React.useState(props.first),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    firstState = _React$useState2[0],
    setFirstState = _React$useState2[1];
  var _React$useState3 = React.useState(props.rows),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    rowsState = _React$useState4[0],
    setRowsState = _React$useState4[1];
  var _React$useState5 = React.useState(props.sortField),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sortFieldState = _React$useState6[0],
    setSortFieldState = _React$useState6[1];
  var _React$useState7 = React.useState(props.sortOrder),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    sortOrderState = _React$useState8[0],
    setSortOrderState = _React$useState8[1];
  var _React$useState9 = React.useState(props.multiSortMeta),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    multiSortMetaState = _React$useState10[0],
    setMultiSortMetaState = _React$useState10[1];
  var _React$useState11 = React.useState(props.filters),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    filtersState = _React$useState12[0],
    setFiltersState = _React$useState12[1];
  var _React$useState13 = React.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    columnOrderState = _React$useState14[0],
    setColumnOrderState = _React$useState14[1];
  var _React$useState15 = React.useState(null),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    groupRowsSortMetaState = _React$useState16[0],
    setGroupRowsSortMetaState = _React$useState16[1];
  var _React$useState17 = React.useState({}),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    editingMetaState = _React$useState18[0],
    setEditingMetaState = _React$useState18[1];
  var _React$useState19 = React.useState(props.rows),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    d_rowsState = _React$useState20[0],
    setD_rowsState = _React$useState20[1];
  var _React$useState21 = React.useState({}),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    d_filtersState = _React$useState22[0],
    setD_filtersState = _React$useState22[1];
  var metaData = {
    props: props,
    state: {
      first: firstState,
      rows: rowsState,
      sortField: sortFieldState,
      sortOrder: sortOrderState,
      multiSortMeta: multiSortMetaState,
      filters: filtersState,
      columnOrder: columnOrderState,
      groupRowsSortMeta: groupRowsSortMetaState,
      editingMeta: editingMetaState,
      d_rows: d_rowsState,
      d_filters: d_filtersState
    },
    context: {
      scrollable: props.scrollable
    }
  };
  var ptCallbacks = DataTableBase.setMetaData(metaData);
  useHandleStyle(DataTableBase.css.styles, ptCallbacks.isUnstyled, {
    name: 'datatable'
  });
  var attributeSelector = React.useRef('');
  var elementRef = React.useRef(null);
  var tableRef = React.useRef(null);
  var wrapperRef = React.useRef(null);
  var bodyRef = React.useRef(null);
  var frozenBodyRef = React.useRef(null);
  var virtualScrollerRef = React.useRef(null);
  var reorderIndicatorUpRef = React.useRef(null);
  var reorderIndicatorDownRef = React.useRef(null);
  var colReorderIconWidth = React.useRef(null);
  var colReorderIconHeight = React.useRef(null);
  var resizeHelperRef = React.useRef(null);
  var draggedColumnElement = React.useRef(null);
  var draggedColumn = React.useRef(null);
  var dropPosition = React.useRef(null);
  var styleElement = React.useRef(null);
  var responsiveStyleElement = React.useRef(null);
  var beforeResizeStyleElement = React.useRef(null);
  var columnWidthsState = React.useRef(null);
  var tableWidthState = React.useRef(null);
  var resizeColumn = React.useRef(null);
  var resizeColumnElement = React.useRef(null);
  var columnResizing = React.useRef(false);
  var lastResizeHelperX = React.useRef(null);
  var columnSortable = React.useRef(false);
  var columnSortFunction = React.useRef(null);
  var columnField = React.useRef(null);
  var filterTimeout = React.useRef(null);
  if (props.rows !== d_rowsState && !props.onPage) {
    setRowsState(props.rows);
    setD_rowsState(props.rows);
  }
  var _useEventListener = useEventListener({
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
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      listener: function listener() {
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
  var isVirtualScrollerDisabled = function isVirtualScrollerDisabled() {
    return ObjectUtils.isEmpty(props.virtualScrollerOptions) || !props.scrollable;
  };
  var isEquals = function isEquals(data1, data2) {
    return props.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, props.dataKey);
  };
  var hasFilter = function hasFilter() {
    return ObjectUtils.isNotEmpty(getFilters()) || props.globalFilter;
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
  var getColumnProp = function getColumnProp(column, name) {
    return ColumnBase.getCProp(column, name);
  };
  var getColumns = function getColumns(ignoreReorderable) {
    var columns = React.Children.toArray(props.children);
    if (!columns) {
      return null;
    }
    if (!ignoreReorderable && props.reorderableColumns && columnOrderState) {
      var orderedColumns = columnOrderState.reduce(function (arr, columnKey) {
        var column = findColumnByKey(columns, columnKey);
        column && arr.push(column);
        return arr;
      }, []);
      return [].concat(_toConsumableArray(orderedColumns), _toConsumableArray(columns.filter(function (col) {
        return orderedColumns.indexOf(col) < 0;
      })));
    }
    return columns;
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
    if (props.resizableColumns) {
      saveColumnWidths(state);
    }
    if (props.reorderableColumns) {
      state.columnOrder = columnOrderState;
    }
    if (props.expandedRows) {
      state.expandedRows = props.expandedRows;
    }
    if (props.selection && props.onSelectionChange) {
      state.selection = props.selection;
    }
    if (isCustomStateStorage()) {
      if (props.customSaveState) {
        props.customSaveState(state);
      }
    } else {
      var storage = getStorage(props.stateStorage);
      if (ObjectUtils.isNotEmpty(state)) {
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
    if (ObjectUtils.isNotEmpty(restoredState)) {
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
        setD_filtersState(cloneFilters(restoredState.filters));
        if (props.onFilter) {
          props.onFilter(createEvent({
            filters: restoredState.filters
          }));
        } else {
          setFiltersState(cloneFilters(restoredState.filters));
        }
      }
      if (props.resizableColumns) {
        columnWidthsState.current = restoredState.columnWidths;
        tableWidthState.current = restoredState.tableWidth;
        restoreColumnWidths();
      }
      if (props.reorderableColumns) {
        setColumnOrderState(restoredState.columnOrder);
      }
      if (restoredState.expandedRows && props.onRowToggle) {
        props.onRowToggle({
          data: restoredState.expandedRows
        });
      }
      if (restoredState.selection && props.onSelectionChange) {
        props.onSelectionChange({
          value: restoredState.selection
        });
      }
      if (props.onStateRestore) {
        props.onStateRestore(restoredState);
      }
    }
  };
  var saveColumnWidths = function saveColumnWidths(state) {
    var widths = [];
    var headers = DomHandler.find(elementRef.current, '[data-pc-section="thead"] > tr > th');
    headers.forEach(function (header) {
      return widths.push(DomHandler.getOuterWidth(header));
    });
    state.columnWidths = widths.join(',');
    if (props.columnResizeMode === 'expand') {
      state.tableWidth = DomHandler.getOuterWidth(tableRef.current) + 'px';
    }
  };
  var addColumnWidthStyles = function addColumnWidthStyles(widths) {
    createStyleElement();
    var innerHTML = '';
    var selector = "[data-pc-name=\"datatable\"][".concat(attributeSelector.current, "] > [data-pc-section=\"wrapper\"] ").concat(isVirtualScrollerDisabled() ? '' : '> [data-pc-name="virtualscroller"]', " > [data-pc-section=\"table\"]");
    widths.forEach(function (width, index) {
      var style = "width: ".concat(width, "px !important; max-width: ").concat(width, "px !important");
      innerHTML = innerHTML + "\n                ".concat(selector, " > [data-pc-section=\"thead\"] > tr > th:nth-child(").concat(index + 1, "),\n                ").concat(selector, " > [data-pc-section=\"tbody\"] > tr > td:nth-child(").concat(index + 1, "),\n                ").concat(selector, " > [data-pc-section=\"tfoot\"] > tr > td:nth-child(").concat(index + 1, ") {\n                    ").concat(style, "\n                }\n            ");
    });
    styleElement.current.innerHTML = innerHTML;
  };
  var restoreColumnWidths = function restoreColumnWidths() {
    if (columnWidthsState.current) {
      var widths = columnWidthsState.current.split(',');
      if (props.columnResizeMode === 'expand' && tableWidthState.current) {
        tableRef.current.style.width = tableWidthState.current;
        tableRef.current.style.minWidth = tableWidthState.current;
      }
      if (ObjectUtils.isNotEmpty(widths)) {
        addColumnWidthStyles(widths);
      }
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
  var getGroupRowSortField = function getGroupRowSortField() {
    return props.sortMode === 'single' ? props.sortField : groupRowsSortMetaState ? groupRowsSortMetaState.field : null;
  };
  var getSelectableData = function getSelectableData(val) {
    if (props.showSelectionElement || props.isDataSelectable) {
      return val.filter(function (data, index) {
        var isSelectable = true;
        if (props.showSelectionElement) {
          isSelectable = props.showSelectionElement({
            rowIndex: index,
            props: props
          });
        }
        if (props.isDataSelectable && isSelectable) {
          isSelectable = props.isDataSelectable({
            data: data,
            index: index
          });
        }
        return isSelectable;
      });
    }
    return val;
  };
  var allRowsSelected = function allRowsSelected(processedData) {
    if (props.onSelectAllChange) {
      return props.selectAll;
    }
    var data = props.selectionPageOnly ? dataToRender(processedData) : processedData;
    var val = ObjectUtils.isNotEmpty(props.frozenValue) ? [].concat(_toConsumableArray(props.frozenValue), _toConsumableArray(data)) : data;
    var selectableVal = getSelectableData(val);
    return ObjectUtils.isNotEmpty(selectableVal) && props.selection && selectableVal.every(function (sv) {
      return ObjectUtils.isArray(props.selection) && props.selection.some(function (s) {
        return isEquals(s, sv);
      });
    });
  };
  var getSelectionModeInColumn = function getSelectionModeInColumn(columns) {
    if (columns) {
      var col = columns.find(function (c) {
        return !!getColumnProp(c, 'selectionMode');
      });
      return col ? getColumnProp(col, 'selectionMode') : null;
    }
    return null;
  };
  var findColumnByKey = function findColumnByKey(columns, key) {
    return ObjectUtils.isNotEmpty(columns) ? columns.find(function (col) {
      return getColumnProp(col, 'columnKey') === key || getColumnProp(col, 'field') === key;
    }) : null;
  };
  var getTotalRecords = function getTotalRecords(data) {
    return props.lazy ? props.totalRecords : data ? data.length : 0;
  };
  var onEditingMetaChange = function onEditingMetaChange(e) {
    var rowData = e.rowData,
      field = e.field,
      editingKey = e.editingKey;
      e.rowIndex;
      var editing = e.editing;
    var editingMeta = _objectSpread({}, editingMetaState);
    var meta = editingMeta[editingKey];
    if (editing) {
      !meta && (meta = editingMeta[editingKey] = {
        data: _objectSpread({}, rowData),
        fields: []
      });
      meta.fields.push(field);
    } else if (meta) {
      var fields = meta.fields.filter(function (f) {
        return f !== field;
      });
      !fields.length ? delete editingMeta[editingKey] : meta.fields = fields;
    }
    setEditingMetaState(editingMeta);
  };
  var clearEditingMetaData = function clearEditingMetaData() {
    if (props.editMode && ObjectUtils.isNotEmpty(editingMetaState)) {
      setEditingMetaState({});
    }
  };
  var onColumnResizeStart = function onColumnResizeStart(e) {
    createBeforeResizeStyleElement();
    var event = e.originalEvent,
      column = e.column;
    var containerLeft = DomHandler.getOffset(elementRef.current).left;
    resizeColumn.current = column;
    resizeColumnElement.current = event.currentTarget.parentElement;
    columnResizing.current = true;
    lastResizeHelperX.current = event.pageX - containerLeft + elementRef.current.scrollLeft;
    bindColumnResizeEvents();
  };
  var onColumnResize = function onColumnResize(event) {
    var containerLeft = DomHandler.getOffset(elementRef.current).left;
    elementRef.current.setAttribute('data-p-unselectable-text', true);
    resizeHelperRef.current.style.height = elementRef.current.offsetHeight + 'px';
    resizeHelperRef.current.style.top = 0 + 'px';
    resizeHelperRef.current.style.left = event.pageX - containerLeft + elementRef.current.scrollLeft + 'px';
    resizeHelperRef.current.style.display = 'block';
  };
  var onColumnResizeEnd = function onColumnResizeEnd() {
    var delta = resizeHelperRef.current.offsetLeft - lastResizeHelperX.current;
    var columnWidth = resizeColumnElement.current.offsetWidth;
    var newColumnWidth = columnWidth + delta;
    var minWidth = resizeColumnElement.current.style.minWidth || 15;
    if (columnWidth + delta > parseInt(minWidth, 10)) {
      if (props.columnResizeMode === 'fit') {
        var nextColumn = resizeColumnElement.current.nextElementSibling;
        var nextColumnWidth = nextColumn.offsetWidth - delta;
        if (newColumnWidth > 15 && nextColumnWidth > 15) {
          resizeTableCells(newColumnWidth, nextColumnWidth);
        }
      } else if (props.columnResizeMode === 'expand') {
        var tableWidth = tableRef.current.offsetWidth + delta + 'px';
        var updateTableWidth = function updateTableWidth(el) {
          !!el && (el.style.width = el.style.minWidth = tableWidth);
        };

        // https://github.com/primefaces/primereact/issues/3970 Reasoning: resize table cells before updating the table width so that it can use existing computed cell widths and adjust only the one column.
        resizeTableCells(newColumnWidth);
        updateTableWidth(tableRef.current);
        if (!isVirtualScrollerDisabled()) {
          updateTableWidth(bodyRef.current);
          updateTableWidth(frozenBodyRef.current);
          if (wrapperRef.current) {
            updateTableWidth(DomHandler.findSingle(wrapperRef.current, '[data-pc-name="virtualscroller"] > table > tbody'));
          }
        }
      }
      if (props.onColumnResizeEnd) {
        props.onColumnResizeEnd({
          element: resizeColumnElement.current,
          column: resizeColumn.current,
          delta: delta
        });
      }
      if (isStateful()) {
        saveState();
      }
    }
    resizeHelperRef.current.style.display = 'none';
    resizeColumn.current = null;
    resizeColumnElement.current = null;
    elementRef.current.setAttribute('data-p-unselectable-text', 'true');
    destroyBeforeResizeStyleElement();
    unbindColumnResizeEvents();
  };
  var resizeTableCells = function resizeTableCells(newColumnWidth, nextColumnWidth) {
    var widths = [];
    var colIndex = DomHandler.index(resizeColumnElement.current);
    var headers = DomHandler.find(tableRef.current, '[data-pc-section="thead"] > tr > th');
    headers.forEach(function (header) {
      return widths.push(DomHandler.getOuterWidth(header));
    });
    destroyStyleElement();
    createStyleElement();
    var innerHTML = '';
    var selector = "[data-pc-name=\"datatable\"][".concat(attributeSelector.current, "] > [data-pc-section=\"wrapper\"] ").concat(isVirtualScrollerDisabled() ? '' : '> [data-pc-name="virtualscroller"]', " > [data-pc-section=\"table\"]");
    widths.forEach(function (width, index) {
      var colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
      var style = "width: ".concat(colWidth, "px !important; max-width: ").concat(colWidth, "px !important");
      innerHTML = innerHTML + "\n                 ".concat(selector, " > [data-pc-section=\"thead\"] > tr > th:nth-child(").concat(index + 1, "),\n                ").concat(selector, " > [data-pc-section=\"tbody\"] > tr > td:nth-child(").concat(index + 1, "),\n                ").concat(selector, " > [data-pc-section=\"tfoot\"] > tr > td:nth-child(").concat(index + 1, ") {\n                    ").concat(style, "\n                }\n            ");
    });
    styleElement.current.innerHTML = innerHTML;
  };
  var bindColumnResizeEvents = function bindColumnResizeEvents() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };
  var unbindColumnResizeEvents = function unbindColumnResizeEvents() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };
  var onColumnHeaderMouseDown = function onColumnHeaderMouseDown(e) {
    DomHandler.clearSelection();
    var event = e.originalEvent,
      column = e.column;
    if (props.reorderableColumns && getColumnProp(column, 'reorderable') !== false && !getColumnProp(column, 'frozen')) {
      if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.getAttribute(event.target, '[data-pc-section="columnresizer"]')) {
        event.currentTarget.draggable = false;
      } else {
        event.currentTarget.draggable = true;
      }
    }
  };
  var onColumnHeaderCheckboxChange = function onColumnHeaderCheckboxChange(e, processedData) {
    if (props.onSelectAllChange) {
      props.onSelectAllChange(e);
    } else {
      var originalEvent = e.originalEvent,
        checked = e.checked;
      var _data = props.selectionPageOnly ? dataToRender(processedData) : processedData;
      var selection = props.selectionPageOnly && props.selection ? props.selection.filter(function (s) {
        return !_data.some(function (d) {
          return isEquals(s, d);
        });
      }) : [];
      if (checked) {
        selection = ObjectUtils.isNotEmpty(props.frozenValue) ? [].concat(_toConsumableArray(selection), _toConsumableArray(props.frozenValue), _toConsumableArray(_data)) : [].concat(_toConsumableArray(selection), _toConsumableArray(_data));
        selection = getSelectableData(selection);
        props.onAllRowsSelect && props.onAllRowsSelect({
          originalEvent: originalEvent,
          data: selection,
          type: 'all'
        });
      } else {
        props.onAllRowsUnselect && props.onAllRowsUnselect({
          originalEvent: originalEvent,
          data: selection,
          type: 'all'
        });
      }
      if (props.onSelectionChange) {
        props.onSelectionChange({
          originalEvent: originalEvent,
          value: selection,
          type: 'all'
        });
      }
    }
  };
  var onColumnHeaderDragStart = function onColumnHeaderDragStart(e) {
    var event = e.originalEvent,
      column = e.column;
    if (columnResizing.current) {
      event.preventDefault();
      return;
    }
    if (!props.reorderableColumns) {
      return;
    }
    colReorderIconWidth.current = DomHandler.getHiddenElementOuterWidth(reorderIndicatorUpRef.current);
    colReorderIconHeight.current = DomHandler.getHiddenElementOuterHeight(reorderIndicatorUpRef.current);
    draggedColumn.current = column;
    draggedColumnElement.current = findParentHeader(event.currentTarget);
    event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
  };

  var onColumnHeaderDragOver = function onColumnHeaderDragOver(e) {
    var event = e.originalEvent,
      column = e.column;
    var dropHeader = findParentHeader(event.currentTarget);
    if (props.reorderableColumns && draggedColumnElement.current && dropHeader && !getColumnProp(column, 'frozen')) {
      event.preventDefault();
      if (draggedColumnElement.current !== dropHeader) {
        var containerOffset = DomHandler.getOffset(elementRef.current);
        var dropHeaderOffset = DomHandler.getOffset(dropHeader);
        var targetLeft = dropHeaderOffset.left - containerOffset.left;
        var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
        var dragIndex = DomHandler.index(draggedColumnElement.current);
        var dropIndex = DomHandler.index(findParentHeader(event.currentTarget));
        reorderIndicatorUpRef.current.style.top = dropHeaderOffset.top - containerOffset.top - (colReorderIconHeight.current - 1) + 'px';
        reorderIndicatorDownRef.current.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
        if (event.pageX > columnCenter && dragIndex < dropIndex) {
          reorderIndicatorUpRef.current.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(colReorderIconWidth.current / 2) + 'px';
          reorderIndicatorDownRef.current.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(colReorderIconWidth.current / 2) + 'px';
          dropPosition.current = 1;
        } else if (dragIndex > dropIndex) {
          reorderIndicatorUpRef.current.style.left = targetLeft - Math.ceil(colReorderIconWidth.current / 2) + 'px';
          reorderIndicatorDownRef.current.style.left = targetLeft - Math.ceil(colReorderIconWidth.current / 2) + 'px';
          dropPosition.current = -1;
        }
        reorderIndicatorUpRef.current.style.display = 'block';
        reorderIndicatorDownRef.current.style.display = 'block';
      }
    }
  };
  var onColumnHeaderDragLeave = function onColumnHeaderDragLeave(e) {
    var event = e.originalEvent;
    if (props.reorderableColumns && draggedColumnElement.current) {
      event.preventDefault();
      reorderIndicatorUpRef.current.style.display = 'none';
      reorderIndicatorDownRef.current.style.display = 'none';
    }
  };
  var onColumnHeaderDrop = function onColumnHeaderDrop(e) {
    var event = e.originalEvent,
      column = e.column;
    event.preventDefault();
    if (draggedColumnElement.current) {
      var dragIndex = DomHandler.index(draggedColumnElement.current);
      var dropIndex = DomHandler.index(findParentHeader(event.currentTarget));
      var allowDrop = dragIndex !== dropIndex;
      if (allowDrop && (dropIndex - dragIndex === 1 && dropPosition.current === -1 || dragIndex - dropIndex === 1 && dropPosition.current === 1)) {
        allowDrop = false;
      }
      if (allowDrop) {
        var _columns = getColumns();
        var isSameColumn = function isSameColumn(col1, col2) {
          return getColumnProp(col1, 'columnKey') || getColumnProp(col2, 'columnKey') ? ObjectUtils.equals(col1.props, col2.props, 'columnKey') : ObjectUtils.equals(col1.props, col2.props, 'field');
        };
        var dragColIndex = _columns.findIndex(function (child) {
          return isSameColumn(child, draggedColumn.current);
        });
        var dropColIndex = _columns.findIndex(function (child) {
          return isSameColumn(child, column);
        });
        var widths = [];
        var headers = DomHandler.find(tableRef.current, '[data-pc-section="thead"] > tr > th');
        headers.forEach(function (header) {
          return widths.push(DomHandler.getOuterWidth(header));
        });
        var movedItem = widths.find(function (items, index) {
          return index === dragColIndex;
        });
        var remainingItems = widths.filter(function (items, index) {
          return index !== dragColIndex;
        });
        var reorderedWidths = [].concat(_toConsumableArray(remainingItems.slice(0, dropColIndex)), [movedItem], _toConsumableArray(remainingItems.slice(dropColIndex)));
        addColumnWidthStyles(reorderedWidths);
        if (dropColIndex < dragColIndex && dropPosition.current === 1) {
          dropColIndex++;
        }
        if (dropColIndex > dragColIndex && dropPosition.current === -1) {
          dropColIndex--;
        }
        ObjectUtils.reorderArray(_columns, dragColIndex, dropColIndex);
        var columnOrder = _columns.reduce(function (orders, col) {
          orders.push(getColumnProp(col, 'columnKey') || getColumnProp(col, 'field'));
          return orders;
        }, []);
        setColumnOrderState(columnOrder);
        if (props.onColReorder) {
          props.onColReorder({
            originalEvent: event,
            dragIndex: dragColIndex,
            dropIndex: dropColIndex,
            columns: _columns
          });
        }
      }
      reorderIndicatorUpRef.current.style.display = 'none';
      reorderIndicatorDownRef.current.style.display = 'none';
      draggedColumnElement.current.draggable = false;
      draggedColumnElement.current = null;
      draggedColumn.current = null;
      dropPosition.current = null;
    }
  };
  var createBeforeResizeStyleElement = function createBeforeResizeStyleElement() {
    beforeResizeStyleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact$1.nonce, context && context.styleContainer);
    var innerHTML = "\n[data-pc-name=\"datatable\"][".concat(attributeSelector.current, "] {\n    user-select:none;\n}\n        ");
    beforeResizeStyleElement.current.innerHTML = innerHTML;
  };
  var createStyleElement = function createStyleElement() {
    styleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact$1.nonce, context && context.styleContainer);
  };
  var createResponsiveStyle = function createResponsiveStyle() {
    if (!responsiveStyleElement.current) {
      responsiveStyleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact$1.nonce, context && context.styleContainer);
      var tableSelector = ".p-datatable-wrapper ".concat(isVirtualScrollerDisabled() ? '' : '> .p-virtualscroller', " > .p-datatable-table");
      var selector = ".p-datatable[".concat(attributeSelector.current, "] > ").concat(tableSelector);
      var gridLinesSelector = ".p-datatable[".concat(attributeSelector.current, "].p-datatable-gridlines > ").concat(tableSelector);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    ").concat(selector, " > .p-datatable-thead > tr > th,\n    ").concat(selector, " > .p-datatable-tfoot > tr > td {\n        display: none;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td {\n        display: flex;\n        width: 100%;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td:not(:last-child) {\n        border: 0 none;\n    }\n\n    ").concat(gridLinesSelector, " > .p-datatable-tbody > tr > td:last-child {\n        border-top: 0;\n        border-right: 0;\n        border-left: 0;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td > .p-column-title {\n        display: block;\n    }\n}\n");
      responsiveStyleElement.current.innerHTML = innerHTML;
    }
  };
  var destroyResponsiveStyle = function destroyResponsiveStyle() {
    responsiveStyleElement.current = DomHandler.removeInlineStyle(responsiveStyleElement.current);
  };
  var destroyStyleElement = function destroyStyleElement() {
    styleElement.current = DomHandler.removeInlineStyle(styleElement.current);
  };
  var destroyBeforeResizeStyleElement = function destroyBeforeResizeStyleElement() {
    beforeResizeStyleElement.current = DomHandler.removeInlineStyle(beforeResizeStyleElement.current);
  };
  var onPageChange = function onPageChange(e) {
    clearEditingMetaData();
    if (props.onPage) {
      props.onPage(createEvent(e));
    } else {
      setFirstState(e.first);
      setRowsState(e.rows);
    }
    if (props.onValueChange) {
      props.onValueChange(processedData());
    }
  };
  var onSortChange = function onSortChange(e) {
    clearEditingMetaData();
    var event = e.originalEvent,
      column = e.column,
      sortableDisabledFields = e.sortableDisabledFields;
    var sortField = getColumnProp(column, 'sortField') || getColumnProp(column, 'field');
    var sortOrder = props.defaultSortOrder;
    var multiSortMeta;
    var eventMeta;
    columnSortable.current = getColumnProp(column, 'sortable');
    columnSortFunction.current = getColumnProp(column, 'sortFunction');
    columnField.current = sortField;
    if (props.sortMode === 'multiple') {
      var metaKey = event.metaKey || event.ctrlKey;
      multiSortMeta = _toConsumableArray(getMultiSortMeta());
      var sortMeta = multiSortMeta.find(function (sortMeta) {
        return sortMeta.field === sortField;
      });
      sortOrder = sortMeta ? getCalculatedSortOrder(sortMeta.order) : sortOrder;
      var newMetaData = {
        field: sortField,
        order: sortOrder
      };
      if (sortOrder) {
        multiSortMeta = metaKey ? multiSortMeta : multiSortMeta.filter(function (meta) {
          return sortableDisabledFields.some(function (field) {
            return field === meta.field;
          });
        });
        addSortMeta(newMetaData, multiSortMeta);
      } else if (props.removableSort) {
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
      props.onSort(createEvent(eventMeta));
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
  var compareValuesOnSort = function compareValuesOnSort(value1, value2, comparator, order) {
    return ObjectUtils.sort(value1, value2, order, comparator, context && context.nullSortOrder || PrimeReact$1.nullSortOrder);
  };
  var addSortMeta = function addSortMeta(meta, multiSortMeta) {
    var index = multiSortMeta.findIndex(function (sortMeta) {
      return sortMeta.field === meta.field;
    });
    if (index >= 0) {
      multiSortMeta[index] = meta;
    } else {
      multiSortMeta.push(meta);
    }
  };
  var removeSortMeta = function removeSortMeta(meta, multiSortMeta) {
    var index = multiSortMeta.findIndex(function (sortMeta) {
      return sortMeta.field === meta.field;
    });
    if (index >= 0) {
      multiSortMeta.splice(index, 1);
    }
    multiSortMeta = multiSortMeta.length > 0 ? multiSortMeta : null;
  };
  var sortSingle = function sortSingle(data, field, order) {
    if (props.groupRowsBy && props.groupRowsBy === props.sortField) {
      var multiSortMeta = [{
        field: props.sortField,
        order: props.sortOrder || props.defaultSortOrder
      }];
      props.sortField !== field && multiSortMeta.push({
        field: field,
        order: order
      });
      return sortMultiple(data, multiSortMeta);
    }
    var value = _toConsumableArray(data);
    if (columnSortable.current && columnSortFunction.current) {
      value = columnSortFunction.current({
        data: data,
        field: field,
        order: order
      });
    } else {
      // performance optimization to prevent resolving field data in each loop
      var lookupMap = new Map();
      var comparator = ObjectUtils.localeComparator(context && context.locale || PrimeReact$1.locale);
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          lookupMap.set(item, ObjectUtils.resolveFieldData(item, field));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      value.sort(function (data1, data2) {
        var value1 = lookupMap.get(data1);
        var value2 = lookupMap.get(data2);
        return compareValuesOnSort(value1, value2, comparator, order);
      });
    }
    return value;
  };
  var sortMultiple = function sortMultiple(data) {
    var multiSortMeta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (props.groupRowsBy && (groupRowsSortMetaState || multiSortMeta.length && props.groupRowsBy === multiSortMeta[0].field)) {
      var groupRowsSortMeta = groupRowsSortMetaState;
      var firstSortMeta = multiSortMeta[0];
      if (!groupRowsSortMeta) {
        groupRowsSortMeta = firstSortMeta;
        setGroupRowsSortMetaState(groupRowsSortMeta);
      }
      if (firstSortMeta.field !== groupRowsSortMeta.field) {
        multiSortMeta = [groupRowsSortMeta].concat(_toConsumableArray(multiSortMeta));
      }
    }
    var value = _toConsumableArray(data);
    if (columnSortable.current && columnSortFunction.current) {
      var meta = multiSortMeta.find(function (meta) {
        return meta.field === columnField.current;
      });
      var field = columnField.current;
      var order = meta ? meta.order : props.defaultSortOrder;
      value = columnSortFunction.current({
        data: data,
        field: field,
        order: order,
        multiSortMeta: multiSortMeta
      });
    } else {
      var comparator = ObjectUtils.localeComparator(context && context.locale || PrimeReact$1.locale);
      value.sort(function (data1, data2) {
        return multisortField(data1, data2, multiSortMeta, 0, comparator);
      });
    }
    return value;
  };
  var multisortField = function multisortField(data1, data2, multiSortMeta, index, comparator) {
    if (!multiSortMeta || !multiSortMeta[index]) {
      return;
    }
    var value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
    var value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);

    // check if they are equal handling dates and locales
    if (ObjectUtils.compare(value1, value2, comparator) === 0) {
      return multiSortMeta.length - 1 > index ? multisortField(data1, data2, multiSortMeta, index + 1, comparator) : 0;
    }
    return compareValuesOnSort(value1, value2, comparator, multiSortMeta[index].order);
  };
  var onFilterChange = function onFilterChange(filters) {
    clearEditingMetaData();
    setD_filtersState(filters);
  };
  var onFilterApply = function onFilterApply(filtersToApply) {
    clearTimeout(filterTimeout.current);
    filterTimeout.current = setTimeout(function () {
      var filters = cloneFilters(filtersToApply || d_filtersState);
      if (props.onFilter) {
        props.onFilter(createEvent({
          filters: filters
        }));
      } else {
        setFirstState(0);
        setFiltersState(filters);
      }
      if (props.onValueChange) {
        props.onValueChange(processedData({
          filters: filters
        }));
      }
    }, props.filterDelay);
  };
  var getActiveFilters = function getActiveFilters(filters) {
    var removeEmptyFilters = function removeEmptyFilters(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (value.constraints) {
        var filteredConstraints = value.constraints.filter(function (constraint) {
          return constraint.value !== null;
        });
        if (filteredConstraints.length > 0) {
          return [key, _objectSpread(_objectSpread({}, value), {}, {
            constraints: filteredConstraints
          })];
        }
      } else if (value.value !== null) {
        return [key, value];
      }
      return undefined;
    };
    var filterValidEntries = function filterValidEntries(entry) {
      return entry !== undefined;
    };
    var entries = Object.entries(filters).map(removeEmptyFilters).filter(filterValidEntries);
    return Object.fromEntries(entries);
  };
  var filterLocal = function filterLocal(data, filters) {
    if (!data) {
      return;
    }
    var activeFilters = filters ? getActiveFilters(filters) : {};
    var columns = getColumns();
    var filteredValue = [];
    var isGlobalFilter = activeFilters.global || props.globalFilter;
    var globalFilterFieldsArray;
    if (isGlobalFilter) {
      globalFilterFieldsArray = props.globalFilterFields || columns.filter(function (col) {
        return !getColumnProp(col, 'excludeGlobalFilter');
      }).map(function (col) {
        return getColumnProp(col, 'filterField') || getColumnProp(col, 'field');
      });
    }
    for (var i = 0; i < data.length; i++) {
      var localMatch = true;
      var globalMatch = false;
      var localFiltered = false;
      for (var prop in activeFilters) {
        if (prop === 'null') {
          continue;
        }
        if (Object.prototype.hasOwnProperty.call(activeFilters, prop) && prop !== 'global') {
          localFiltered = true;
          var filterField = prop;
          var filterMeta = activeFilters[filterField];
          if (filterMeta.operator) {
            for (var j = 0; j < filterMeta.constraints.length; j++) {
              var filterConstraint = filterMeta.constraints[j];
              localMatch = executeLocalFilter(filterField, data[i], filterConstraint, j);
              if (filterMeta.operator === FilterOperator.OR && localMatch || filterMeta.operator === FilterOperator.AND && !localMatch) {
                break;
              }
            }
          } else {
            localMatch = executeLocalFilter(filterField, data[i], filterMeta, 0);
          }
          if (!localMatch) {
            break;
          }
        }
      }
      if (localMatch && isGlobalFilter && !globalMatch && globalFilterFieldsArray) {
        for (var _j = 0; _j < globalFilterFieldsArray.length; _j++) {
          var globalFilterField = globalFilterFieldsArray[_j];
          var matchMode = activeFilters.global ? activeFilters.global.matchMode : props.globalFilterMatchMode;
          var value = activeFilters.global ? activeFilters.global.value : props.globalFilter;
          globalMatch = FilterService.filters[matchMode](ObjectUtils.resolveFieldData(data[i], globalFilterField), value, props.filterLocale);
          if (globalMatch) {
            break;
          }
        }
      }
      var matches = void 0;
      if (isGlobalFilter) {
        matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
      } else {
        matches = localFiltered && localMatch;
      }
      if (matches) {
        filteredValue.push(data[i]);
      }
    }
    if (filteredValue.length === props.value.length || Object.keys(activeFilters).length === 0) {
      filteredValue = data;
    }
    return filteredValue;
  };
  var executeLocalFilter = function executeLocalFilter(field, rowData, filterMeta, index) {
    var filterValue = filterMeta.value;
    var filterMatchMode = filterMeta.matchMode === 'custom' ? "custom_".concat(field) : filterMeta.matchMode || FilterMatchMode$1.STARTS_WITH;
    var dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
    var filterConstraint = FilterService.filters[filterMatchMode];
    return ObjectUtils.isFunction(filterConstraint) && filterConstraint(dataFieldValue, filterValue, props.filterLocale, index);
  };
  var cloneFilters = function cloneFilters(filters) {
    filters = filters || props.filters;
    var cloned = {};
    if (filters) {
      Object.entries(filters).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          prop = _ref4[0],
          value = _ref4[1];
        cloned[prop] = value.operator ? {
          operator: value.operator,
          constraints: value.constraints.map(function (constraint) {
            return _objectSpread({}, constraint);
          })
        } : _objectSpread({}, value);
      });
    } else {
      var _columns2 = getColumns();
      cloned = _columns2.reduce(function (filters, col) {
        var field = getColumnProp(col, 'filterField') || getColumnProp(col, 'field');
        var filterFunction = getColumnProp(col, 'filterFunction');
        var dataType = getColumnProp(col, 'dataType');
        var matchMode = getColumnProp(col, 'filterMatchMode') || (context && context.filterMatchModeOptions[dataType] || PrimeReact$1.filterMatchModeOptions[dataType] ? context && context.filterMatchModeOptions[dataType][0] || PrimeReact$1.filterMatchModeOptions[dataType][0] : FilterMatchMode$1.STARTS_WITH);
        var constraint = {
          value: null,
          matchMode: matchMode
        };
        if (filterFunction) {
          FilterService.register("custom_".concat(field), function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return filterFunction.apply(void 0, args.concat([{
              column: col
            }]));
          });
        }
        filters[field] = props.filterDisplay === 'menu' ? {
          operator: FilterOperator.AND,
          constraints: [constraint]
        } : constraint;
        return filters;
      }, {});
    }
    return cloned;
  };
  var filter = function filter(value, field, matchMode) {
    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var filters = _objectSpread({}, d_filtersState);
    var meta = filters[field];
    var constraint = meta && meta.operator ? meta.constraints[index] : meta;
    constraint = meta ? {
      value: value,
      matchMode: matchMode || constraint.matchMode
    } : {
      value: value,
      matchMode: matchMode
    };
    props.filterDisplay === 'menu' && meta && meta.operator ? filters[field].constraints[index] = constraint : filters[field] = constraint;
    setD_filtersState(filters);
    onFilterApply(filters);
  };
  var reset = function reset() {
    setD_rowsState(props.rows);
    setD_filtersState(cloneFilters(props.filters));
    setGroupRowsSortMetaState(null);
    setEditingMetaState({});
    if (!props.onPage) {
      setFirstState(props.first);
      setRowsState(props.rows);
    }
    if (!props.onSort) {
      setSortFieldState(props.sortField);
      setSortOrderState(props.sortOrder);
      setMultiSortMetaState(props.multiSortMeta);
    }
    if (!props.onFilter) {
      setFiltersState(props.filters);
    }
    resetColumnOrder();
  };
  var resetScroll = function resetScroll() {
    if (wrapperRef.current) {
      var scrollableContainer = !isVirtualScrollerDisabled() ? DomHandler.findSingle(wrapperRef.current, '[data-pc-name="virtualscroller"]') : wrapperRef.current;
      scrollableContainer.scrollTo(0, 0);
    }
  };
  var resetResizeColumnsWidth = function resetResizeColumnsWidth() {
    destroyStyleElement();
  };
  var resetColumnOrder = function resetColumnOrder() {
    var columns = getColumns(true);
    var columnOrder = [];
    if (columns) {
      columnOrder = columns.reduce(function (orders, col) {
        orders.push(getColumnProp(col, 'columnKey') || getColumnProp(col, 'field'));
        return orders;
      }, []);
    }
    setColumnOrderState(columnOrder);
  };
  var exportCSV = function exportCSV(options) {
    var data;
    var csv = "\uFEFF";
    var columns = getColumns();
    if (options && options.selectionOnly) {
      data = props.selection || [];
    } else {
      data = [].concat(_toConsumableArray(props.frozenValue || []), _toConsumableArray(processedData() || []));
    }

    //headers
    columns.forEach(function (column, i) {
      var _ref5 = [getColumnProp(column, 'field'), getColumnProp(column, 'header'), getColumnProp(column, 'exportHeader'), getColumnProp(column, 'exportable')],
        field = _ref5[0],
        header = _ref5[1],
        exportHeader = _ref5[2],
        exportable = _ref5[3];
      if (exportable && field) {
        var columnHeader = String(exportHeader || header || field).replace(/"/g, '""').replace(/\n/g, "\u2028");
        csv = csv + ('"' + columnHeader + '"');
        if (i < columns.length - 1) {
          csv = csv + props.csvSeparator;
        }
      }
    });

    //body
    data.forEach(function (record) {
      csv = csv + '\n';
      columns.forEach(function (column, i) {
        var _ref6 = [getColumnProp(column, 'field'), getColumnProp(column, 'exportField'), getColumnProp(column, 'exportable')],
          colField = _ref6[0],
          exportField = _ref6[1],
          exportable = _ref6[2];
        var field = exportField || colField;
        if (exportable && field) {
          var cellData = ObjectUtils.resolveFieldData(record, field);
          if (cellData != null) {
            if (props.exportFunction) {
              cellData = props.exportFunction({
                data: cellData,
                field: field,
                rowData: record,
                column: column
              });
            } else {
              cellData = String(cellData).replace(/"/g, '""').replace(/\n/g, "\u2028");
            }
          } else {
            cellData = '';
          }
          csv = csv + ('"' + cellData + '"');
          if (i < columns.length - 1) {
            csv = csv + props.csvSeparator;
          }
        }
      });
    });
    DomHandler.exportCSV(csv, props.exportFilename);
  };
  var closeEditingCell = function closeEditingCell() {
    if (props.editMode !== 'row') {
      document.body.click();
    }
  };
  var closeEditingRows = function closeEditingRows() {
    DomHandler.find(document.body, '[data-pc-section="roweditorcancelbuttonprops"]').forEach(function (button, index) {
      setTimeout(function () {
        button.click();
      }, index * 5);
    });
  };
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
  var processedData = function processedData(localState) {
    var data = props.value || [];
    if (!props.lazy) {
      if (data && data.length) {
        var filters = localState && localState.filters || getFilters();
        var sortField = localState && localState.sortField || getSortField();
        var sortOrder = localState && localState.sortOrder || getSortOrder();
        var multiSortMeta = localState && localState.multiSortMeta || getMultiSortMeta();
        var _columns3 = getColumns();
        var sortColumn = _columns3.find(function (col) {
          return getColumnProp(col, 'field') === sortField;
        });
        if (sortColumn) {
          columnSortable.current = getColumnProp(sortColumn, 'sortable');
          columnSortFunction.current = getColumnProp(sortColumn, 'sortFunction');
        }
        if (ObjectUtils.isNotEmpty(filters) || props.globalFilter) {
          data = filterLocal(data, filters);
        }
        if (sortField || ObjectUtils.isNotEmpty(multiSortMeta)) {
          if (props.sortMode === 'single') {
            data = sortSingle(data, sortField, sortOrder);
          } else if (props.sortMode === 'multiple') {
            data = sortMultiple(data, multiSortMeta);
          }
        }
      }
    }
    return data;
  };
  var dataToRender = function dataToRender(data) {
    if (data && props.paginator) {
      var first = props.lazy ? 0 : getFirst();
      return data.slice(first, first + getRows());
    }
    return data;
  };
  useMountEffect(function () {
    if (elementRef.current) {
      attributeSelector.current = UniqueComponentId();
      elementRef.current.setAttribute(attributeSelector.current, '');
    }

    //setFiltersState(cloneFilters(props.filters)); // Github #4248
    setD_filtersState(cloneFilters(props.filters));
    if (isStateful()) {
      restoreState();
      if (props.resizableColumns) {
        restoreColumnWidths();
      }
    }
  });
  useUpdateEffect(function () {
    if (props.responsiveLayout === 'stack' && !props.scrollable) {
      createResponsiveStyle();
    }
    return function () {
      destroyResponsiveStyle();
    };
  }, [props.breakpoint]);
  useUpdateEffect(function () {
    var filters = cloneFilters(props.filters);
    setFiltersState(filters);
    setD_filtersState(cloneFilters(props.filters));
    if (props.onValueChange) {
      props.onValueChange(processedData({
        filters: filters
      }));
    }
  }, [props.filters]);
  useUpdateEffect(function () {
    if (isStateful()) {
      saveState();
    }
  });
  useUpdateEffect(function () {
    destroyResponsiveStyle();
    if (props.responsiveLayout === 'stack' && !props.scrollable) {
      createResponsiveStyle();
    }
  }, [props.responsiveLayout, props.scrollable]);
  useUpdateEffect(function () {
    if (props.globalFilter) {
      filter(props.globalFilter, 'global', props.globalFilterMatchMode);
    } else {
      // #3819 was filtering but now reset filter state
      setFiltersState(props.filters);
    }
  }, [props.globalFilter, props.globalFilterMatchMode]);
  useUnmountEffect(function () {
    unbindColumnResizeEvents();
    destroyStyleElement();
    destroyResponsiveStyle();
    destroyBeforeResizeStyleElement();
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      clearState: clearState,
      closeEditingCell: closeEditingCell,
      closeEditingRows: closeEditingRows,
      exportCSV: exportCSV,
      filter: filter,
      reset: reset,
      resetColumnOrder: resetColumnOrder,
      resetScroll: resetScroll,
      resetResizeColumnsWidth: resetResizeColumnsWidth,
      restoreColumnWidths: restoreColumnWidths,
      restoreState: restoreState,
      restoreTableState: restoreTableState,
      saveState: saveState,
      getFilterMeta: function getFilterMeta() {
        return filtersState;
      },
      setFilterMeta: function setFilterMeta(filters) {
        return setFiltersState(filters);
      },
      getSortMeta: function getSortMeta() {
        return multiSortMetaState;
      },
      setSortMeta: function setSortMeta(sorts) {
        return setMultiSortMetaState(sorts);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getTable: function getTable() {
        return tableRef.current;
      },
      getVirtualScroller: function getVirtualScroller() {
        return virtualScrollerRef.current;
      }
    };
  });
  var createLoader = function createLoader() {
    if (props.loading) {
      var loadingIconProps = mergeProps({
        className: ptCallbacks.cx('loadingIcon')
      }, ptCallbacks.ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React.createElement(SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      }));
      var loadingIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingOverlayProps = mergeProps({
        className: ptCallbacks.cx('loadingOverlay')
      }, ptCallbacks.ptm('loadingOverlay'));
      return /*#__PURE__*/React.createElement("div", loadingOverlayProps, loadingIcon);
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var _content = ObjectUtils.getJSXElement(props.header, {
        props: props
      });
      var headerProps = mergeProps({
        className: ptCallbacks.cx('header')
      }, ptCallbacks.ptm('header'));
      return /*#__PURE__*/React.createElement("div", headerProps, _content);
    }
    return null;
  };
  var createTableHeader = function createTableHeader(options, empty, _isVirtualScrollerDisabled) {
    if (props.showHeaders === false) {
      return null;
    }
    var sortField = getSortField();
    var sortOrder = getSortOrder();
    var multiSortMeta = _toConsumableArray(getMultiSortMeta());
    var groupRowSortField = getGroupRowSortField();
    var filters = d_filtersState;
    var filtersStore = !props.onFilter && props.filters || getFilters();
    var processedData = options.items,
      virtualScrollerProps = options.props,
      columns = options.columns;
    var data = _isVirtualScrollerDisabled || virtualScrollerProps.lazy ? processedData : virtualScrollerProps.items;
    return /*#__PURE__*/React.createElement(TableHeader, {
      hostName: "DataTable",
      value: data,
      tableProps: props,
      columns: columns,
      tabIndex: props.tabIndex,
      empty: empty,
      headerColumnGroup: props.headerColumnGroup,
      resizableColumns: props.resizableColumns,
      onColumnResizeStart: onColumnResizeStart,
      onColumnResizerClick: props.onColumnResizerClick,
      onColumnResizerDoubleClick: props.onColumnResizerDoubleClick,
      sortMode: props.sortMode,
      sortField: sortField,
      sortIcon: props.sortIcon,
      sortOrder: sortOrder,
      multiSortMeta: multiSortMeta,
      groupRowsBy: props.groupRowsBy,
      groupRowSortField: groupRowSortField,
      onSortChange: onSortChange,
      filterDisplay: props.filterDisplay,
      filters: filters,
      filtersStore: filtersStore,
      filterIcon: props.filterIcon,
      filterClearIcon: props.filterClearIcon,
      onFilterChange: onFilterChange,
      onFilterApply: onFilterApply,
      showSelectAll: props.showSelectAll,
      allRowsSelected: allRowsSelected,
      onColumnCheckboxChange: onColumnHeaderCheckboxChange,
      onColumnMouseDown: onColumnHeaderMouseDown,
      onColumnDragStart: onColumnHeaderDragStart,
      onColumnDragOver: onColumnHeaderDragOver,
      onColumnDragLeave: onColumnHeaderDragLeave,
      onColumnDrop: onColumnHeaderDrop,
      rowGroupMode: props.rowGroupMode,
      reorderableColumns: props.reorderableColumns,
      ptCallbacks: ptCallbacks,
      metaData: metaData,
      unstyled: props.unstyled
    });
  };
  var createTableBody = function createTableBody(options, selectionModeInColumn, empty, isVirtualScrollerDisabled) {
    var first = getFirst();
    var rows = options.rows,
      columns = options.columns,
      contentRef = options.contentRef,
      style = options.style,
      className = options.className,
      spacerStyle = options.spacerStyle,
      itemSize = options.itemSize;
    var frozenBody = ObjectUtils.isNotEmpty(props.frozenValue) && /*#__PURE__*/React.createElement(TableBody, {
      hostName: "DataTable",
      ref: frozenBodyRef,
      cellClassName: props.cellClassName,
      cellSelection: props.cellSelection,
      checkIcon: props.checkIcon,
      className: "p-datatable-tbody p-datatable-frozen-tbody",
      collapsedRowIcon: props.collapsedRowIcon,
      columns: columns,
      compareSelectionBy: props.compareSelectionBy,
      contextMenuSelection: props.contextMenuSelection,
      dataKey: props.dataKey,
      dragSelection: props.dragSelection,
      editMode: props.editMode,
      editingMeta: editingMetaState,
      editingRows: props.editingRows,
      emptyMessage: props.emptyMessage,
      expandableRowGroups: props.expandableRowGroups,
      expandedRowIcon: props.expandedRowIcon,
      expandedRows: props.expandedRows,
      first: first,
      frozenRow: true,
      groupRowsBy: props.groupRowsBy,
      isDataSelectable: props.isDataSelectable,
      isVirtualScrollerDisabled: true,
      lazy: props.lazy,
      loading: props.loading,
      metaKeySelection: props.metaKeySelection,
      onCellClick: props.onCellClick,
      onCellSelect: props.onCellSelect,
      onCellUnselect: props.onCellUnselect,
      onContextMenu: props.onContextMenu,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onEditingMetaChange: onEditingMetaChange,
      onRowClick: props.onRowClick,
      onRowCollapse: props.onRowCollapse,
      onRowDoubleClick: props.onRowDoubleClick,
      onRowPointerDown: props.onRowPointerDown,
      onRowPointerUp: props.onRowPointerUp,
      onRowEditCancel: props.onRowEditCancel,
      onRowEditChange: props.onRowEditChange,
      onRowEditComplete: props.onRowEditComplete,
      onRowEditInit: props.onRowEditInit,
      onRowEditSave: props.onRowEditSave,
      onRowExpand: props.onRowExpand,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      onRowReorder: props.onRowReorder,
      onRowSelect: props.onRowSelect,
      onRowToggle: props.onRowToggle,
      onRowUnselect: props.onRowUnselect,
      onSelectionChange: props.onSelectionChange,
      paginator: props.paginator,
      reorderableRows: props.reorderableRows,
      responsiveLayout: props.responsiveLayout,
      rowClassName: props.rowClassName,
      rowEditValidator: props.rowEditValidator,
      rowEditorCancelIcon: props.rowEditorCancelIcon,
      rowEditorInitIcon: props.rowEditorInitIcon,
      rowEditorSaveIcon: props.rowEditorSaveIcon,
      rowExpansionTemplate: props.rowExpansionTemplate,
      rowGroupFooterTemplate: props.rowGroupFooterTemplate,
      rowGroupHeaderTemplate: props.rowGroupHeaderTemplate,
      rowGroupMode: props.rowGroupMode,
      scrollable: props.scrollable,
      selectOnEdit: props.selectOnEdit,
      selection: props.selection,
      selectionAutoFocus: props.selectionAutoFocus,
      selectionMode: props.selectionMode,
      selectionModeInColumn: selectionModeInColumn,
      showRowReorderElement: props.showRowReorderElement,
      showSelectionElement: props.showSelectionElement,
      tabIndex: props.tabIndex,
      tableProps: props,
      tableSelector: attributeSelector.current,
      value: props.frozenValue,
      virtualScrollerOptions: options,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    });
    var body = /*#__PURE__*/React.createElement(TableBody, {
      hostName: "DataTable",
      ref: bodyRef,
      cellClassName: props.cellClassName,
      cellSelection: props.cellSelection,
      checkIcon: props.checkIcon,
      className: classNames('p-datatable-tbody', className),
      collapsedRowIcon: props.collapsedRowIcon,
      columns: columns,
      compareSelectionBy: props.compareSelectionBy,
      contextMenuSelection: props.contextMenuSelection,
      dataKey: props.dataKey,
      dragSelection: props.dragSelection,
      editMode: props.editMode,
      editingMeta: editingMetaState,
      editingRows: props.editingRows,
      empty: empty,
      emptyMessage: props.emptyMessage,
      expandableRowGroups: props.expandableRowGroups,
      expandedRowIcon: props.expandedRowIcon,
      expandedRows: props.expandedRows,
      first: first,
      frozenRow: false,
      groupRowsBy: props.groupRowsBy,
      isDataSelectable: props.isDataSelectable,
      isVirtualScrollerDisabled: isVirtualScrollerDisabled,
      lazy: props.lazy,
      loading: props.loading,
      metaKeySelection: props.metaKeySelection,
      onCellClick: props.onCellClick,
      onCellSelect: props.onCellSelect,
      onCellUnselect: props.onCellUnselect,
      onContextMenu: props.onContextMenu,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onEditingMetaChange: onEditingMetaChange,
      onRowClick: props.onRowClick,
      onRowCollapse: props.onRowCollapse,
      onRowDoubleClick: props.onRowDoubleClick,
      onRowEditCancel: props.onRowEditCancel,
      onRowEditChange: props.onRowEditChange,
      onRowEditComplete: props.onRowEditComplete,
      onRowEditInit: props.onRowEditInit,
      onRowEditSave: props.onRowEditSave,
      onRowExpand: props.onRowExpand,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      onRowPointerDown: props.onRowPointerDown,
      onRowPointerUp: props.onRowPointerUp,
      onRowReorder: props.onRowReorder,
      onRowSelect: props.onRowSelect,
      onRowToggle: props.onRowToggle,
      onRowUnselect: props.onRowUnselect,
      onSelectionChange: props.onSelectionChange,
      paginator: props.paginator,
      reorderableRows: props.reorderableRows,
      responsiveLayout: props.responsiveLayout,
      rowClassName: props.rowClassName,
      rowEditValidator: props.rowEditValidator,
      rowEditorCancelIcon: props.rowEditorCancelIcon,
      rowEditorInitIcon: props.rowEditorInitIcon,
      rowEditorSaveIcon: props.rowEditorSaveIcon,
      rowExpansionTemplate: props.rowExpansionTemplate,
      rowGroupFooterTemplate: props.rowGroupFooterTemplate,
      rowGroupHeaderTemplate: props.rowGroupHeaderTemplate,
      rowGroupMode: props.rowGroupMode,
      scrollable: props.scrollable,
      selectOnEdit: props.selectOnEdit,
      selection: props.selection,
      selectionAutoFocus: props.selectionAutoFocus,
      selectionMode: props.selectionMode,
      selectionModeInColumn: selectionModeInColumn,
      showRowReorderElement: props.showRowReorderElement,
      showSelectionElement: props.showSelectionElement,
      style: style,
      tabIndex: props.tabIndex,
      tableProps: props,
      tableSelector: attributeSelector.current,
      value: dataToRender(rows),
      virtualScrollerContentRef: contentRef,
      virtualScrollerOptions: options,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    });
    var spacerBody = ObjectUtils.isNotEmpty(spacerStyle) ? /*#__PURE__*/React.createElement(TableBody, {
      hostName: "DataTable",
      style: {
        height: "calc(".concat(spacerStyle.height, " - ").concat(rows.length * itemSize, "px)")
      },
      className: "p-datatable-virtualscroller-spacer",
      ptCallbacks: ptCallbacks,
      metaData: metaData
    }) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, frozenBody, body, spacerBody);
  };
  var createTableFooter = function createTableFooter(options) {
    var columns = options.columns;
    return /*#__PURE__*/React.createElement(TableFooter, {
      hostName: "DataTable",
      tableProps: props,
      columns: columns,
      footerColumnGroup: props.footerColumnGroup,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    });
  };
  var createContent = function createContent(processedData, columns, selectionModeInColumn, empty) {
    if (!columns) {
      return;
    }
    var _isVirtualScrollerDisabled = isVirtualScrollerDisabled();
    var virtualScrollerOptions = props.virtualScrollerOptions || {};
    var wrapperProps = mergeProps({
      className: ptCallbacks.cx('wrapper'),
      style: _objectSpread(_objectSpread({}, ptCallbacks.sx('wrapper')), {}, {
        maxHeight: _isVirtualScrollerDisabled ? props.scrollHeight : null
      })
    }, ptCallbacks.ptm('wrapper'));
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: wrapperRef
    }, wrapperProps), /*#__PURE__*/React.createElement(VirtualScroller, _extends({
      ref: virtualScrollerRef
    }, virtualScrollerOptions, {
      items: processedData,
      columns: columns,
      style: _objectSpread(_objectSpread({}, virtualScrollerOptions.style), {
        height: props.scrollHeight !== 'flex' ? props.scrollHeight : undefined
      }),
      scrollHeight: props.scrollHeight !== 'flex' ? undefined : '100%',
      disabled: _isVirtualScrollerDisabled,
      loaderDisabled: true,
      inline: true,
      autoSize: true,
      pt: ptCallbacks.ptm('virtualScroller'),
      __parentMetadata: {
        parent: metaData
      },
      showSpacer: false,
      contentTemplate: function contentTemplate(options) {
        var ref = function ref(el) {
          tableRef.current = el;
          options.spacerRef && options.spacerRef(el);
        };
        var tableHeader = createTableHeader(options, empty, _isVirtualScrollerDisabled);
        var tableBody = createTableBody(options, selectionModeInColumn, empty, _isVirtualScrollerDisabled);
        var tableFooter = createTableFooter(options);
        var tableProps = mergeProps({
          className: classNames(props.tableClassName, ptCallbacks.cx('table')),
          style: props.tableStyle,
          role: 'table'
        }, ptCallbacks.ptm('table'));
        return /*#__PURE__*/React.createElement("table", _extends({
          ref: ref
        }, tableProps), tableHeader, tableBody, tableFooter);
      }
    })));
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var _content2 = ObjectUtils.getJSXElement(props.footer, {
        props: props
      });
      var footerProps = mergeProps({
        className: ptCallbacks.cx('footer')
      }, ptCallbacks.ptm('footer'));
      return /*#__PURE__*/React.createElement("div", footerProps, _content2);
    }
    return null;
  };
  var createPaginator = function createPaginator(position, totalRecords) {
    return /*#__PURE__*/React.createElement(Paginator, {
      first: getFirst(),
      rows: getRows(),
      pageLinkSize: props.pageLinkSize,
      className: classNames(props.paginatorClassName, ptCallbacks.cx('paginator', {
        position: position
      })),
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
  var createPaginatorTop = function createPaginatorTop(totalRecords) {
    if (props.paginator && props.paginatorPosition !== 'bottom') {
      return createPaginator('top', totalRecords);
    }
    return null;
  };
  var createPaginatorBottom = function createPaginatorBottom(totalRecords) {
    if (props.paginator && props.paginatorPosition !== 'top') {
      return createPaginator('bottom', totalRecords);
    }
    return null;
  };
  var createResizeHelper = function createResizeHelper() {
    if (props.resizableColumns) {
      var resizeHelperProps = mergeProps({
        className: ptCallbacks.cx('resizeHelper'),
        style: ptCallbacks.sx('resizeHelper')
      }, ptCallbacks.ptm('resizeHelper'));
      return /*#__PURE__*/React.createElement("div", _extends({
        ref: resizeHelperRef
      }, resizeHelperProps));
    }
    return null;
  };
  var createReorderIndicators = function createReorderIndicators() {
    if (props.reorderableColumns) {
      var style = {
        position: 'absolute',
        display: 'none'
      };
      var reorderIndicatorUpProps = mergeProps({
        className: ptCallbacks.cx('reorderIndicatorUp'),
        style: ptCallbacks.sx('reorderIndicatorUp', {
          style: style
        })
      }, ptCallbacks.ptm('reorderIndicatorUp'));
      var reorderIndicatorUpIconProps = mergeProps(ptCallbacks.ptm('reorderIndicatorUpIcon'));
      var reorderIndicatorUpIcon = IconUtils.getJSXIcon(props.reorderIndicatorUpIcon || /*#__PURE__*/React.createElement(ArrowDownIcon, reorderIndicatorUpIconProps), _objectSpread({}, reorderIndicatorUpIconProps), {
        props: props
      });
      var reorderIndicatorDownProps = mergeProps({
        className: ptCallbacks.cx('reorderIndicatorDown'),
        style: ptCallbacks.sx('reorderIndicatorDown', {
          style: style
        })
      }, ptCallbacks.ptm('reorderIndicatorDown'));
      var reorderIndicatorDownIconProps = mergeProps(ptCallbacks.ptm('reorderIndicatorDownIcon'));
      var reorderIndicatorDownIcon = IconUtils.getJSXIcon(props.reorderIndicatorDownIcon || /*#__PURE__*/React.createElement(ArrowUpIcon, reorderIndicatorDownIconProps), _objectSpread({}, reorderIndicatorDownIconProps), {
        props: props
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", _extends({
        ref: reorderIndicatorUpRef
      }, reorderIndicatorUpProps), reorderIndicatorUpIcon), /*#__PURE__*/React.createElement("span", _extends({
        ref: reorderIndicatorDownRef
      }, reorderIndicatorDownProps), reorderIndicatorDownIcon));
    }
    return null;
  };
  var data = processedData();
  var columns = getColumns();
  var totalRecords = getTotalRecords(data);
  var empty = ObjectUtils.isEmpty(data);
  var selectionModeInColumn = getSelectionModeInColumn(columns);
  var selectable = props.selectionMode || selectionModeInColumn;
  var loader = createLoader();
  var header = createHeader();
  var paginatorTop = createPaginatorTop(totalRecords);
  var content = createContent(data, columns, selectionModeInColumn, empty);
  var paginatorBottom = createPaginatorBottom(totalRecords);
  var footer = createFooter();
  var resizeHelper = createResizeHelper();
  var reorderIndicators = createReorderIndicators();
  var rootProps = mergeProps({
    id: props.id,
    className: classNames(props.className, ptCallbacks.cx('root', {
      selectable: selectable
    })),
    style: props.style,
    'data-scrollselectors': '.p-datatable-wrapper',
    'data-showgridlines': props.showGridlines
  }, DataTableBase.getOtherProps(props), ptCallbacks.ptm('root'));
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, rootProps), loader, header, paginatorTop, content, paginatorBottom, footer, resizeHelper, reorderIndicators);
});
DataTable.displayName = 'DataTable';

export { DataTable };
