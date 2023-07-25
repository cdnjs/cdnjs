'use strict';

var api = require('primevue/api');
var ArrowDownIcon = require('primevue/icons/arrowdown');
var ArrowUpIcon = require('primevue/icons/arrowup');
var SpinnerIcon = require('primevue/icons/spinner');
var Paginator = require('primevue/paginator');
var utils = require('primevue/utils');
var VirtualScroller = require('primevue/virtualscroller');
var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var vue = require('vue');
var BarsIcon = require('primevue/icons/bars');
var CheckIcon = require('primevue/icons/check');
var PencilIcon = require('primevue/icons/pencil');
var TimesIcon = require('primevue/icons/times');
var OverlayEventBus = require('primevue/overlayeventbus');
var Ripple = require('primevue/ripple');
var Button = require('primevue/button');
var Dropdown = require('primevue/dropdown');
var FocusTrap = require('primevue/focustrap');
var FilterIcon = require('primevue/icons/filter');
var FilterSlashIcon = require('primevue/icons/filterslash');
var PlusIcon = require('primevue/icons/plus');
var TrashIcon = require('primevue/icons/trash');
var Portal = require('primevue/portal');
var SortAltIcon = require('primevue/icons/sortalt');
var SortAmountDownIcon = require('primevue/icons/sortamountdown');
var SortAmountUpAltIcon = require('primevue/icons/sortamountupalt');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ArrowDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowDownIcon);
var ArrowUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowUpIcon);
var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
var Paginator__default = /*#__PURE__*/_interopDefaultLegacy(Paginator);
var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var BarsIcon__default = /*#__PURE__*/_interopDefaultLegacy(BarsIcon);
var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
var PencilIcon__default = /*#__PURE__*/_interopDefaultLegacy(PencilIcon);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(Dropdown);
var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
var FilterIcon__default = /*#__PURE__*/_interopDefaultLegacy(FilterIcon);
var FilterSlashIcon__default = /*#__PURE__*/_interopDefaultLegacy(FilterSlashIcon);
var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
var TrashIcon__default = /*#__PURE__*/_interopDefaultLegacy(TrashIcon);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var SortAltIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortAltIcon);
var SortAmountDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortAmountDownIcon);
var SortAmountUpAltIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortAmountUpAltIcon);

var styles = "\n.p-datatable {\n    position: relative;\n}\n\n.p-datatable-table {\n    border-spacing: 0px;\n    width: 100%;\n}\n\n.p-datatable .p-sortable-column {\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-datatable .p-sortable-column .p-column-title,\n.p-datatable .p-sortable-column .p-sortable-column-icon,\n.p-datatable .p-sortable-column .p-sortable-column-badge {\n    vertical-align: middle;\n}\n\n.p-datatable .p-sortable-column .p-sortable-column-badge {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-datatable-hoverable-rows .p-selectable-row {\n    cursor: pointer;\n}\n\n/* Scrollable */\n.p-datatable-scrollable > .p-datatable-wrapper {\n    position: relative;\n}\n\n.p-datatable-scrollable-table > .p-datatable-thead {\n    top: 0;\n    z-index: 1;\n}\n\n.p-datatable-scrollable-table > .p-datatable-frozen-tbody {\n    position: sticky;\n    z-index: 1;\n}\n\n.p-datatable-scrollable-table > .p-datatable-tfoot {\n    bottom: 0;\n    z-index: 1;\n}\n\n.p-datatable-scrollable .p-frozen-column {\n    position: sticky;\n    background: inherit;\n}\n\n.p-datatable-scrollable th.p-frozen-column {\n    z-index: 1;\n}\n\n.p-datatable-flex-scrollable {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n\n.p-datatable-flex-scrollable > .p-datatable-wrapper {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    height: 100%;\n}\n\n.p-datatable-scrollable-table > .p-datatable-tbody > .p-rowgroup-header {\n    position: sticky;\n    z-index: 1;\n}\n\n/* Resizable */\n.p-datatable-resizable-table > .p-datatable-thead > tr > th,\n.p-datatable-resizable-table > .p-datatable-tfoot > tr > td,\n.p-datatable-resizable-table > .p-datatable-tbody > tr > td {\n    overflow: hidden;\n    white-space: nowrap;\n}\n\n.p-datatable-resizable-table > .p-datatable-thead > tr > th.p-resizable-column:not(.p-frozen-column) {\n    background-clip: padding-box;\n    position: relative;\n}\n\n.p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-resizable-column:last-child .p-column-resizer {\n    display: none;\n}\n\n.p-datatable .p-column-resizer {\n    display: block;\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    margin: 0;\n    width: 0.5rem;\n    height: 100%;\n    padding: 0px;\n    cursor: col-resize;\n    border: 1px solid transparent;\n}\n\n.p-datatable .p-column-header-content {\n    display: flex;\n    align-items: center;\n}\n\n.p-datatable .p-column-resizer-helper {\n    width: 1px;\n    position: absolute;\n    z-index: 10;\n    display: none;\n}\n\n.p-datatable .p-row-editor-init,\n.p-datatable .p-row-editor-save,\n.p-datatable .p-row-editor-cancel {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Expand */\n.p-datatable .p-row-toggler {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Reorder */\n.p-datatable-reorder-indicator-up,\n.p-datatable-reorder-indicator-down {\n    position: absolute;\n    display: none;\n}\n\n.p-reorderable-column,\n.p-datatable-reorderablerow-handle {\n    cursor: move;\n}\n\n/* Loader */\n.p-datatable .p-datatable-loading-overlay {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 2;\n}\n\n/* Filter */\n.p-column-filter-row {\n    display: flex;\n    align-items: center;\n    width: 100%;\n}\n\n.p-column-filter-menu {\n    display: inline-flex;\n    margin-left: auto;\n}\n\n.p-column-filter-row .p-column-filter-element {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n.p-column-filter-menu-button,\n.p-column-filter-clear-button {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-column-filter-row-items {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.p-column-filter-row-item {\n    cursor: pointer;\n}\n\n.p-column-filter-add-button,\n.p-column-filter-remove-button {\n    justify-content: center;\n}\n\n.p-column-filter-add-button .p-button-label,\n.p-column-filter-remove-button .p-button-label {\n    flex-grow: 0;\n}\n\n.p-column-filter-buttonbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {\n    width: auto;\n}\n\n/* Responsive */\n.p-datatable .p-datatable-tbody > tr > td > .p-column-title {\n    display: none;\n}\n\n/* VirtualScroller */\n.p-datatable-virtualscroller-spacer {\n    display: flex;\n}\n\n.p-datatable .p-virtualscroller .p-virtualscroller-loading {\n    transform: none !important;\n    min-height: 0;\n    position: sticky;\n    top: 0;\n    left: 0;\n}\n";
var inlineStyles = {
  wrapper: {
    overflow: 'auto'
  },
  thead: {
    position: 'sticky'
  },
  tfoot: {
    position: 'sticky'
  }
};
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-datatable p-component', {
      'p-datatable-hoverable-rows': props.rowHover || props.selectionMode,
      'p-datatable-resizable': props.resizableColumns,
      'p-datatable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-datatable-scrollable': props.scrollable,
      'p-datatable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
      'p-datatable-responsive-stack': props.responsiveLayout === 'stack',
      'p-datatable-responsive-scroll': props.responsiveLayout === 'scroll',
      'p-datatable-striped': props.stripedRows,
      'p-datatable-gridlines': props.showGridlines,
      'p-datatable-grouped-header': instance.headerColumnGroup != null,
      'p-datatable-grouped-footer': instance.footerColumnGroup != null,
      'p-datatable-sm': props.size === 'small',
      'p-datatable-lg': props.size === 'large'
    }];
  },
  loadingOverlay: 'p-datatable-loading-overlay p-component-overlay',
  loadingIcon: 'p-datatable-loading-icon',
  header: 'p-datatable-header',
  paginator: function paginator(_ref2) {
    var instance = _ref2.instance;
    return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
  },
  wrapper: 'p-datatable-wrapper',
  table: function table(_ref3) {
    var props = _ref3.props;
    return ['p-datatable-table', {
      'p-datatable-scrollable-table': props.scrollable,
      'p-datatable-resizable-table': props.resizableColumns,
      'p-datatable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
    }];
  },
  //tablehead
  thead: 'p-datatable-thead',
  // headercell
  headerCell: function headerCell(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props,
      column = _ref4.column;
    return column && !instance.columnProp(column, 'hidden') && (props.rowGroupMode !== 'subheader' || props.groupRowsBy !== columnProp(column, 'field')) ? ['p-filter-column', {
      'p-frozen-column': instance.columnProp(column, 'frozen')
    }] : [{
      'p-sortable-column': instance.columnProp('sortable'),
      'p-resizable-column': instance.resizableColumns,
      'p-highlight': instance.isColumnSorted(),
      'p-filter-column': props.filterColumn,
      'p-frozen-column': instance.columnProp('frozen'),
      'p-reorderable-column': props.reorderableColumns
    }];
  },
  columnResizer: 'p-column-resizer',
  headerContent: 'p-column-header-content',
  headerTitle: 'p-column-title',
  sortIcon: 'p-sortable-column-icon',
  sortBadge: 'p-sortable-column-badge',
  //headercheckbox
  headerCheckboxWrapper: function headerCheckboxWrapper(_ref5) {
    var instance = _ref5.instance;
    return ['p-checkbox p-component', {
      'p-checkbox-focused': instance.focused,
      'p-disabled': instance.disabled
    }];
  },
  headerCheckbox: function headerCheckbox(_ref6) {
    var instance = _ref6.instance;
    return ['p-checkbox-box p-component', {
      'p-highlight': instance.checked,
      'p-disabled': instance.disabled,
      'p-focus': instance.focused
    }];
  },
  headerCheckboxIcon: 'p-checkbox-icon',
  // columnfilter
  columnFilter: function columnFilter(_ref7) {
    var props = _ref7.props;
    return ['p-column-filter p-fluid', {
      'p-column-filter-row': props.display === 'row',
      'p-column-filter-menu': props.display === 'menu'
    }];
  },
  filterInput: 'p-fluid p-column-filter-element',
  filterMenuButton: function filterMenuButton(_ref8) {
    var instance = _ref8.instance;
    return ['p-column-filter-menu-button p-link', {
      'p-column-filter-menu-button-open': instance.overlayVisible,
      'p-column-filter-menu-button-active': instance.hasFilter()
    }];
  },
  headerFilterClearButton: function headerFilterClearButton(_ref9) {
    var instance = _ref9.instance;
    return ['p-column-filter-clear-button p-link', {
      'p-hidden-space': !instance.hasRowFilter()
    }];
  },
  filterOverlay: function filterOverlay(_ref10) {
    var instance = _ref10.instance,
      props = _ref10.props;
    return [{
      'p-column-filter-overlay p-component p-fluid': true,
      'p-column-filter-overlay-menu': props.display === 'menu',
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  filterRowItems: 'p-column-filter-row-items',
  filterRowItem: function filterRowItem(_ref11) {
    var instance = _ref11.instance,
      matchMode = _ref11.matchMode;
    return ['p-column-filter-row-item', {
      'p-highlight': matchMode && instance.isRowMatchModeSelected(matchMode.value)
    }];
  },
  filterSeparator: 'p-column-filter-separator',
  filterOperator: 'p-column-filter-operator',
  filterOperatorDropdown: 'p-column-filter-operator-dropdown',
  filterConstraints: 'p-column-filter-constraints',
  filterConstraint: 'p-column-filter-constraint',
  filterMatchModeDropdown: 'p-column-filter-matchmode-dropdown',
  filterRemoveButton: 'p-column-filter-remove-button p-button-text p-button-danger p-button-sm',
  filterAddRule: 'p-column-filter-add-rule',
  filterAddRuleButton: 'p-column-filter-add-button p-button-text p-button-sm',
  filterButtonbar: 'p-column-filter-buttonbar',
  filterClearButton: 'p-button-outlined p-button-sm',
  filterApplyButton: 'p-button-sm',
  //tablebody
  tbody: function tbody(_ref12) {
    var props = _ref12.props;
    return props.frozenRow ? 'p-datatable-tbody p-datatable-frozen-tbody' : 'p-datatable-tbody';
  },
  rowgroupHeader: 'p-rowgroup-header',
  rowGroupToggler: 'p-row-toggler p-link',
  rowGroupTogglerIcon: 'p-row-toggler-icon',
  row: function row(_ref13) {
    var instance = _ref13.instance,
      props = _ref13.props,
      rowData = _ref13.rowData;
    var rowStyleClass = [];
    if (props.selectionMode) {
      rowStyleClass.push('p-selectable-row');
    }
    if (props.selection) {
      rowStyleClass.push({
        'p-highlight': instance.isSelected(rowData)
      });
    }
    if (props.contextMenuSelection) {
      rowStyleClass.push({
        'p-highlight-contextmenu': instance.isSelectedWithContextMenu(rowData)
      });
    }
    return rowStyleClass;
  },
  rowExpansion: 'p-datatable-row-expansion',
  rowgroupFooter: 'p-rowgroup-footer',
  emptyMessage: 'p-datatable-emptymessage',
  //bodycell
  bodyCell: function bodyCell(_ref14) {
    var instance = _ref14.instance;
    return [{
      'p-selection-column': instance.columnProp('selectionMode') != null,
      'p-editable-column': instance.isEditable(),
      'p-cell-editing': instance.d_editing,
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  columnTitle: 'p-column-title',
  rowReorderIcon: 'p-datatable-reorderablerow-handle',
  rowToggler: 'p-row-toggler p-link',
  rowTogglerIcon: 'p-row-toggler-icon',
  rowEditorInitButton: 'p-row-editor-init p-link',
  rowEditorInitIcon: 'p-row-editor-init-icon',
  rowEditorSaveButton: 'p-row-editor-save p-link',
  rowEditorSaveIcon: 'p-row-editor-save-icon',
  rowEditorCancelButton: 'p-row-editor-cancel p-link',
  rowEditorCancelIcon: 'p-row-editor-cancel-icon',
  //rowcheckbox
  checkboxWrapper: function checkboxWrapper(_ref15) {
    var instance = _ref15.instance;
    return ['p-checkbox p-component', {
      'p-checkbox-focused': instance.focused
    }];
  },
  checkbox: function checkbox(_ref16) {
    var instance = _ref16.instance;
    return ['p-checkbox-box p-component', {
      'p-highlight': instance.checked,
      'p-disabled': instance.$attrs.disabled,
      'p-focus': instance.focused
    }];
  },
  checkboxIcon: 'p-checkbox-icon',
  //rowradiobutton
  radiobuttonWrapper: function radiobuttonWrapper(_ref17) {
    var instance = _ref17.instance;
    return ['p-radiobutton p-component', {
      'p-radiobutton-focused': instance.focused
    }];
  },
  radiobutton: function radiobutton(_ref18) {
    var instance = _ref18.instance;
    return ['p-radiobutton-box p-component', {
      'p-highlight': instance.checked,
      'p-disabled': instance.$attrs.disabled,
      'p-focus': instance.focused
    }];
  },
  radiobuttonIcon: 'p-radiobutton-icon',
  //tablefooter
  tfoot: 'p-datatable-tfoot',
  //footercell
  footerCell: function footerCell(_ref19) {
    var instance = _ref19.instance;
    return [{
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  //datatable
  virtualScrollerSpacer: 'p-datatable-virtualscroller-spacer',
  footer: 'p-datatable-footer',
  resizeHelper: 'p-column-resizer-helper',
  reorderIndicatorUp: 'p-datatable-reorder-indicator-up',
  reorderIndicatorDown: 'p-datatable-reorder-indicator-down'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'datatable',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$b = {
  name: 'BaseDataTable',
  "extends": BaseComponent__default["default"],
  props: {
    value: {
      type: Array,
      "default": null
    },
    dataKey: {
      type: [String, Function],
      "default": null
    },
    rows: {
      type: Number,
      "default": 0
    },
    first: {
      type: Number,
      "default": 0
    },
    totalRecords: {
      type: Number,
      "default": 0
    },
    paginator: {
      type: Boolean,
      "default": false
    },
    paginatorPosition: {
      type: String,
      "default": 'bottom'
    },
    alwaysShowPaginator: {
      type: Boolean,
      "default": true
    },
    paginatorTemplate: {
      type: [Object, String],
      "default": 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
    },
    pageLinkSize: {
      type: Number,
      "default": 5
    },
    rowsPerPageOptions: {
      type: Array,
      "default": null
    },
    currentPageReportTemplate: {
      type: String,
      "default": '({currentPage} of {totalPages})'
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": undefined
    },
    sortField: {
      type: [String, Function],
      "default": null
    },
    sortOrder: {
      type: Number,
      "default": null
    },
    defaultSortOrder: {
      type: Number,
      "default": 1
    },
    multiSortMeta: {
      type: Array,
      "default": null
    },
    sortMode: {
      type: String,
      "default": 'single'
    },
    removableSort: {
      type: Boolean,
      "default": false
    },
    filters: {
      type: Object,
      "default": null
    },
    filterDisplay: {
      type: String,
      "default": null
    },
    globalFilterFields: {
      type: Array,
      "default": null
    },
    filterLocale: {
      type: String,
      "default": undefined
    },
    selection: {
      type: [Array, Object],
      "default": null
    },
    selectionMode: {
      type: String,
      "default": null
    },
    compareSelectionBy: {
      type: String,
      "default": 'deepEquals'
    },
    metaKeySelection: {
      type: Boolean,
      "default": true
    },
    contextMenu: {
      type: Boolean,
      "default": false
    },
    contextMenuSelection: {
      type: Object,
      "default": null
    },
    selectAll: {
      type: Boolean,
      "default": null
    },
    rowHover: {
      type: Boolean,
      "default": false
    },
    csvSeparator: {
      type: String,
      "default": ','
    },
    exportFilename: {
      type: String,
      "default": 'download'
    },
    exportFunction: {
      type: Function,
      "default": null
    },
    resizableColumns: {
      type: Boolean,
      "default": false
    },
    columnResizeMode: {
      type: String,
      "default": 'fit'
    },
    reorderableColumns: {
      type: Boolean,
      "default": false
    },
    expandedRows: {
      type: Array,
      "default": null
    },
    expandedRowIcon: {
      type: String,
      "default": undefined
    },
    collapsedRowIcon: {
      type: String,
      "default": undefined
    },
    rowGroupMode: {
      type: String,
      "default": null
    },
    groupRowsBy: {
      type: [Array, String, Function],
      "default": null
    },
    expandableRowGroups: {
      type: Boolean,
      "default": false
    },
    expandedRowGroups: {
      type: Array,
      "default": null
    },
    stateStorage: {
      type: String,
      "default": 'session'
    },
    stateKey: {
      type: String,
      "default": null
    },
    editMode: {
      type: String,
      "default": null
    },
    editingRows: {
      type: Array,
      "default": null
    },
    rowClass: {
      type: null,
      "default": null
    },
    rowStyle: {
      type: null,
      "default": null
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    scrollHeight: {
      type: String,
      "default": null
    },
    frozenValue: {
      type: Array,
      "default": null
    },
    responsiveLayout: {
      type: String,
      "default": 'scroll'
    },
    breakpoint: {
      type: String,
      "default": '960px'
    },
    showGridlines: {
      type: Boolean,
      "default": false
    },
    stripedRows: {
      type: Boolean,
      "default": false
    },
    size: {
      type: String,
      "default": null
    },
    tableStyle: {
      type: null,
      "default": null
    },
    tableClass: {
      type: String,
      "default": null
    },
    tableProps: {
      type: null,
      "default": null
    },
    filterInputProps: {
      type: null,
      "default": null
    }
  },
  css: {
    classes: classes,
    inlineStyles: inlineStyles,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$a = {
  name: 'RowCheckbox',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['change'],
  props: {
    value: null,
    checked: null,
    column: null,
    rowCheckboxIconTemplate: {
      type: Function,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    }
  },
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          checked: this.checked,
          focused: this.focused,
          disabled: this.$attrs.disabled
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onClick: function onClick(event) {
      if (!this.$attrs.disabled) {
        this.$emit('change', {
          originalEvent: event,
          data: this.value
        });
        utils.DomHandler.focus(this.$refs.input);
      }
      event.preventDefault();
    },
    onFocus: function onFocus() {
      this.focused = true;
    },
    onBlur: function onBlur() {
      this.focused = false;
    },
    onKeydown: function onKeydown(event) {
      switch (event.code) {
        case 'Space':
          {
            this.onClick(event);
            break;
          }
      }
    }
  },
  computed: {
    checkboxAriaLabel: function checkboxAriaLabel() {
      return this.$primevue.config.locale.aria ? this.checked ? this.$primevue.config.locale.aria.selectRow : this.$primevue.config.locale.aria.unselectRow : undefined;
    }
  },
  components: {
    CheckIcon: CheckIcon__default["default"]
  }
};

var _hoisted_1$7 = ["checked", "disabled", "tabindex", "aria-label"];
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = vue.resolveComponent("CheckIcon");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('checkboxWrapper'),
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    })
  }, $options.getColumnPT('checkboxWrapper')), [vue.createElementVNode("div", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, $options.getColumnPT('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    ref: "input",
    type: "checkbox",
    checked: $props.checked,
    disabled: _ctx.$attrs.disabled,
    tabindex: _ctx.$attrs.disabled ? null : '0',
    "aria-label": $options.checkboxAriaLabel,
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    }),
    onKeydown: _cache[2] || (_cache[2] = function () {
      return $options.onKeydown && $options.onKeydown.apply($options, arguments);
    })
  }, $options.getColumnPT('hiddenInput')), null, 16, _hoisted_1$7)], 16), vue.createElementVNode("div", vue.mergeProps({
    ref: "box",
    "class": _ctx.cx('checkbox')
  }, $options.getColumnPT('checkbox')), [$props.rowCheckboxIconTemplate ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.rowCheckboxIconTemplate), {
    key: 0,
    checked: $props.checked,
    "class": vue.normalizeClass(_ctx.cx('checkboxIcon'))
  }, null, 8, ["checked", "class"])) : !$props.rowCheckboxIconTemplate && !!$props.checked ? (vue.openBlock(), vue.createBlock(_component_CheckIcon, vue.mergeProps({
    key: 1,
    "class": _ctx.cx('checkboxIcon')
  }, $options.getColumnPT('checkboxIcon')), null, 16, ["class"])) : vue.createCommentVNode("", true)], 16)], 16);
}

script$a.render = render$a;

var script$9 = {
  name: 'RowRadioButton',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  inheritAttrs: false,
  emits: ['change'],
  props: {
    value: null,
    checked: null,
    name: null,
    column: null,
    index: {
      type: Number,
      "default": null
    }
  },
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          checked: this.checked,
          focused: this.focused,
          disabled: this.$attrs.disabled
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onClick: function onClick(event) {
      if (!this.disabled) {
        if (!this.checked) {
          this.$emit('change', {
            originalEvent: event,
            data: this.value
          });
          utils.DomHandler.focus(this.$refs.input);
        }
      }
    },
    onFocus: function onFocus() {
      this.focused = true;
    },
    onBlur: function onBlur() {
      this.focused = false;
    }
  }
};

var _hoisted_1$6 = ["checked", "disabled", "name"];
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('radiobuttonWrapper'),
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    })
  }, $options.getColumnPT('radiobuttonWrapper')), [vue.createElementVNode("div", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, $options.getColumnPT('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    ref: "input",
    type: "radio",
    checked: $props.checked,
    disabled: _ctx.$attrs.disabled,
    name: $props.name,
    tabindex: "0",
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    }),
    onKeydown: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }, ["prevent"]), ["space"]))
  }, $options.getColumnPT('hiddenInput')), null, 16, _hoisted_1$6)], 16), vue.createElementVNode("div", vue.mergeProps({
    ref: "box",
    "class": _ctx.cx('radiobutton')
  }, $options.getColumnPT('radiobutton')), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('radiobuttonIcon')
  }, $options.getColumnPT('radiobuttonIcon')), null, 16)], 16)], 16);
}

script$9.render = render$9;

var script$8 = {
  name: 'BodyCell',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['cell-edit-init', 'cell-edit-complete', 'cell-edit-cancel', 'row-edit-init', 'row-edit-save', 'row-edit-cancel', 'row-toggle', 'radio-change', 'checkbox-change', 'editing-meta-change'],
  props: {
    rowData: {
      type: Object,
      "default": null
    },
    column: {
      type: Object,
      "default": null
    },
    frozenRow: {
      type: Boolean,
      "default": false
    },
    rowIndex: {
      type: Number,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    },
    isRowExpanded: {
      type: Boolean,
      "default": false
    },
    selected: {
      type: Boolean,
      "default": false
    },
    editing: {
      type: Boolean,
      "default": false
    },
    editingMeta: {
      type: Object,
      "default": null
    },
    editMode: {
      type: String,
      "default": null
    },
    responsiveLayout: {
      type: String,
      "default": 'stack'
    },
    virtualScrollerContentProps: {
      type: Object,
      "default": null
    },
    ariaControls: {
      type: String,
      "default": null
    },
    name: {
      type: String,
      "default": null
    },
    expandedRowIcon: {
      type: String,
      "default": null
    },
    collapsedRowIcon: {
      type: String,
      "default": null
    }
  },
  documentEditListener: null,
  selfClick: false,
  overlayEventListener: null,
  data: function data() {
    return {
      d_editing: this.editing,
      styleObject: {}
    };
  },
  watch: {
    editing: function editing(newValue) {
      this.d_editing = newValue;
    },
    '$data.d_editing': function $dataD_editing(newValue) {
      this.$emit('editing-meta-change', {
        data: this.rowData,
        field: this.field || "field_".concat(this.index),
        index: this.rowIndex,
        editing: newValue
      });
    }
  },
  mounted: function mounted() {
    if (this.columnProp('frozen')) {
      this.updateStickyPosition();
    }
  },
  updated: function updated() {
    var _this = this;
    if (this.columnProp('frozen')) {
      this.updateStickyPosition();
    }
    if (this.d_editing && (this.editMode === 'cell' || this.editMode === 'row' && this.columnProp('rowEditor'))) {
      setTimeout(function () {
        var focusableEl = utils.DomHandler.getFirstFocusableElement(_this.$el);
        focusableEl && focusableEl.focus();
      }, 1);
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.overlayEventListener) {
      OverlayEventBus__default["default"].off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    }
  },
  methods: {
    columnProp: function columnProp(prop) {
      return utils.ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance, _this$$parentInstance2;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size,
          showGridlines: (_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.showGridlines
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined;
    },
    resolveFieldData: function resolveFieldData() {
      return utils.ObjectUtils.resolveFieldData(this.rowData, this.field);
    },
    toggleRow: function toggleRow(event) {
      this.$emit('row-toggle', {
        originalEvent: event,
        data: this.rowData
      });
    },
    toggleRowWithRadio: function toggleRowWithRadio(event, index) {
      this.$emit('radio-change', {
        originalEvent: event.originalEvent,
        index: index,
        data: event.data
      });
    },
    toggleRowWithCheckbox: function toggleRowWithCheckbox(event, index) {
      this.$emit('checkbox-change', {
        originalEvent: event.originalEvent,
        index: index,
        data: event.data
      });
    },
    isEditable: function isEditable() {
      return this.column.children && this.column.children.editor != null;
    },
    bindDocumentEditListener: function bindDocumentEditListener() {
      var _this2 = this;
      if (!this.documentEditListener) {
        this.documentEditListener = function (event) {
          if (!_this2.selfClick) {
            _this2.completeEdit(event, 'outside');
          }
          _this2.selfClick = false;
        };
        document.addEventListener('click', this.documentEditListener);
      }
    },
    unbindDocumentEditListener: function unbindDocumentEditListener() {
      if (this.documentEditListener) {
        document.removeEventListener('click', this.documentEditListener);
        this.documentEditListener = null;
        this.selfClick = false;
      }
    },
    switchCellToViewMode: function switchCellToViewMode() {
      this.d_editing = false;
      this.unbindDocumentEditListener();
      OverlayEventBus__default["default"].off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    },
    onClick: function onClick(event) {
      var _this3 = this;
      if (this.editMode === 'cell' && this.isEditable()) {
        this.selfClick = true;
        if (!this.d_editing) {
          this.d_editing = true;
          this.bindDocumentEditListener();
          this.$emit('cell-edit-init', {
            originalEvent: event,
            data: this.rowData,
            field: this.field,
            index: this.rowIndex
          });
          this.overlayEventListener = function (e) {
            if (_this3.$el && _this3.$el.contains(e.target)) {
              _this3.selfClick = true;
            }
          };
          OverlayEventBus__default["default"].on('overlay-click', this.overlayEventListener);
        }
      }
    },
    completeEdit: function completeEdit(event, type) {
      var completeEvent = {
        originalEvent: event,
        data: this.rowData,
        newData: this.editingRowData,
        value: this.rowData[this.field],
        newValue: this.editingRowData[this.field],
        field: this.field,
        index: this.rowIndex,
        type: type,
        defaultPrevented: false,
        preventDefault: function preventDefault() {
          this.defaultPrevented = true;
        }
      };
      this.$emit('cell-edit-complete', completeEvent);
      if (!completeEvent.defaultPrevented) {
        this.switchCellToViewMode();
      }
    },
    onKeyDown: function onKeyDown(event) {
      if (this.editMode === 'cell') {
        switch (event.code) {
          case 'Enter':
            this.completeEdit(event, 'enter');
            break;
          case 'Escape':
            this.switchCellToViewMode();
            this.$emit('cell-edit-cancel', {
              originalEvent: event,
              data: this.rowData,
              field: this.field,
              index: this.rowIndex
            });
            break;
          case 'Tab':
            this.completeEdit(event, 'tab');
            if (event.shiftKey) this.moveToPreviousCell(event);else this.moveToNextCell(event);
            break;
        }
      }
    },
    moveToPreviousCell: function moveToPreviousCell(event) {
      var currentCell = this.findCell(event.target);
      var targetCell = this.findPreviousEditableColumn(currentCell);
      if (targetCell) {
        utils.DomHandler.invokeElementMethod(targetCell, 'click');
        event.preventDefault();
      }
    },
    moveToNextCell: function moveToNextCell(event) {
      var currentCell = this.findCell(event.target);
      var targetCell = this.findNextEditableColumn(currentCell);
      if (targetCell) {
        utils.DomHandler.invokeElementMethod(targetCell, 'click');
        event.preventDefault();
      }
    },
    findCell: function findCell(element) {
      if (element) {
        var cell = element;
        while (cell && !utils.DomHandler.getAttribute(cell, 'data-p-cell-editing')) {
          cell = cell.parentElement;
        }
        return cell;
      } else {
        return null;
      }
    },
    findPreviousEditableColumn: function findPreviousEditableColumn(cell) {
      var prevCell = cell.previousElementSibling;
      if (!prevCell) {
        var previousRow = cell.parentElement.previousElementSibling;
        if (previousRow) {
          prevCell = previousRow.lastElementChild;
        }
      }
      if (prevCell) {
        if (utils.DomHandler.getAttribute(prevCell, 'data-p-editable-column')) return prevCell;else return this.findPreviousEditableColumn(prevCell);
      } else {
        return null;
      }
    },
    findNextEditableColumn: function findNextEditableColumn(cell) {
      var nextCell = cell.nextElementSibling;
      if (!nextCell) {
        var nextRow = cell.parentElement.nextElementSibling;
        if (nextRow) {
          nextCell = nextRow.firstElementChild;
        }
      }
      if (nextCell) {
        if (utils.DomHandler.getAttribute(nextCell, 'data-p-editable-column')) return nextCell;else return this.findNextEditableColumn(nextCell);
      } else {
        return null;
      }
    },
    isEditingCellValid: function isEditingCellValid() {
      return utils.DomHandler.find(this.$el, '.p-invalid').length === 0;
    },
    onRowEditInit: function onRowEditInit(event) {
      this.$emit('row-edit-init', {
        originalEvent: event,
        data: this.rowData,
        newData: this.editingRowData,
        field: this.field,
        index: this.rowIndex
      });
    },
    onRowEditSave: function onRowEditSave(event) {
      this.$emit('row-edit-save', {
        originalEvent: event,
        data: this.rowData,
        newData: this.editingRowData,
        field: this.field,
        index: this.rowIndex
      });
    },
    onRowEditCancel: function onRowEditCancel(event) {
      this.$emit('row-edit-cancel', {
        originalEvent: event,
        data: this.rowData,
        newData: this.editingRowData,
        field: this.field,
        index: this.rowIndex
      });
    },
    editorInitCallback: function editorInitCallback(event) {
      this.$emit('row-edit-init', {
        originalEvent: event,
        data: this.rowData,
        newData: this.editingRowData,
        field: this.field,
        index: this.rowIndex
      });
    },
    editorSaveCallback: function editorSaveCallback(event) {
      if (this.editMode === 'row') {
        this.$emit('row-edit-save', {
          originalEvent: event,
          data: this.rowData,
          newData: this.editingRowData,
          field: this.field,
          index: this.rowIndex
        });
      } else {
        this.completeEdit(event, 'enter');
      }
    },
    editorCancelCallback: function editorCancelCallback(event) {
      if (this.editMode === 'row') {
        this.$emit('row-edit-cancel', {
          originalEvent: event,
          data: this.rowData,
          newData: this.editingRowData,
          field: this.field,
          index: this.rowIndex
        });
      } else {
        this.switchCellToViewMode();
        this.$emit('cell-edit-cancel', {
          originalEvent: event,
          data: this.rowData,
          field: this.field,
          index: this.rowIndex
        });
      }
    },
    updateStickyPosition: function updateStickyPosition() {
      if (this.columnProp('frozen')) {
        var align = this.columnProp('alignFrozen');
        if (align === 'right') {
          var right = 0;
          var next = this.$el.nextElementSibling;
          if (next) {
            right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + 'px';
        } else {
          var left = 0;
          var prev = this.$el.previousElementSibling;
          if (prev) {
            left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + 'px';
        }
      }
    },
    getVirtualScrollerProp: function getVirtualScrollerProp(option) {
      return this.virtualScrollerContentProps ? this.virtualScrollerContentProps[option] : null;
    }
  },
  computed: {
    editingRowData: function editingRowData() {
      return this.editingMeta[this.rowIndex] ? this.editingMeta[this.rowIndex].data : this.rowData;
    },
    field: function field() {
      return this.columnProp('field');
    },
    containerClass: function containerClass() {
      return [this.columnProp('bodyClass'), this.columnProp('class'), this.cx('bodyCell')];
    },
    containerStyle: function containerStyle() {
      var bodyStyle = this.columnProp('bodyStyle');
      var columnStyle = this.columnProp('style');
      return this.columnProp('frozen') ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    },
    loading: function loading() {
      return this.getVirtualScrollerProp('loading');
    },
    loadingOptions: function loadingOptions() {
      var getLoaderOptions = this.getVirtualScrollerProp('getLoaderOptions');
      return getLoaderOptions && getLoaderOptions(this.rowIndex, {
        cellIndex: this.index,
        cellFirst: this.index === 0,
        cellLast: this.index === this.getVirtualScrollerProp('columns').length - 1,
        cellEven: this.index % 2 === 0,
        cellOdd: this.index % 2 !== 0,
        column: this.column,
        field: this.field
      });
    },
    expandButtonAriaLabel: function expandButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.isRowExpanded ? this.$primevue.config.locale.aria.expandRow : this.$primevue.config.locale.aria.collapseRow : undefined;
    },
    initButtonAriaLabel: function initButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.editRow : undefined;
    },
    saveButtonAriaLabel: function saveButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.saveEdit : undefined;
    },
    cancelButtonAriaLabel: function cancelButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.cancelEdit : undefined;
    }
  },
  components: {
    DTRadioButton: script$9,
    DTCheckbox: script$a,
    ChevronDownIcon: ChevronDownIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"],
    BarsIcon: BarsIcon__default["default"],
    PencilIcon: PencilIcon__default["default"],
    CheckIcon: CheckIcon__default["default"],
    TimesIcon: TimesIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$9(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1$5 = ["data-p-selection-column", "data-p-editable-column", "data-p-cell-editing", "data-p-frozen-column"];
var _hoisted_2$2 = ["aria-expanded", "aria-controls", "aria-label"];
var _hoisted_3$2 = ["aria-label"];
var _hoisted_4$1 = ["aria-label"];
var _hoisted_5$1 = ["aria-label"];
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTRadioButton = vue.resolveComponent("DTRadioButton");
  var _component_DTCheckbox = vue.resolveComponent("DTCheckbox");
  var _component_BarsIcon = vue.resolveComponent("BarsIcon");
  var _component_ChevronDownIcon = vue.resolveComponent("ChevronDownIcon");
  var _component_ChevronRightIcon = vue.resolveComponent("ChevronRightIcon");
  var _directive_ripple = vue.resolveDirective("ripple");
  return $options.loading ? (vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
    key: 0,
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell"
  }, _objectSpread$9(_objectSpread$9({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell'))), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.loading), {
    data: $props.rowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow,
    loadingOptions: $options.loadingOptions
  }, null, 8, ["data", "column", "field", "index", "frozenRow", "loadingOptions"]))], 16)) : (vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
    key: 1,
    style: $options.containerStyle,
    "class": $options.containerClass,
    onClick: _cache[6] || (_cache[6] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[7] || (_cache[7] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    role: "cell"
  }, _objectSpread$9(_objectSpread$9({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell')), {
    "data-p-selection-column": $options.columnProp('selectionMode') != null,
    "data-p-editable-column": $options.isEditable(),
    "data-p-cell-editing": $data.d_editing,
    "data-p-frozen-column": $options.columnProp('frozen')
  }), [$props.responsiveLayout === 'stack' ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('columnTitle')
  }, $options.getColumnPT('columnTitle')), vue.toDisplayString($options.columnProp('header')), 17)) : vue.createCommentVNode("", true), $props.column.children && $props.column.children.body && !$data.d_editing ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.body), {
    key: 1,
    data: $props.rowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow,
    editorInitCallback: $options.editorInitCallback
  }, null, 8, ["data", "column", "field", "index", "frozenRow", "editorInitCallback"])) : $props.column.children && $props.column.children.editor && $data.d_editing ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.editor), {
    key: 2,
    data: $options.editingRowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow,
    editorSaveCallback: $options.editorSaveCallback,
    editorCancelCallback: $options.editorCancelCallback
  }, null, 8, ["data", "column", "field", "index", "frozenRow", "editorSaveCallback", "editorCancelCallback"])) : $props.column.children && $props.column.children.body && !$props.column.children.editor && $data.d_editing ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.body), {
    key: 3,
    data: $options.editingRowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow
  }, null, 8, ["data", "column", "field", "index", "frozenRow"])) : $options.columnProp('selectionMode') ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 4
  }, [$options.columnProp('selectionMode') === 'single' ? (vue.openBlock(), vue.createBlock(_component_DTRadioButton, {
    key: 0,
    value: $props.rowData,
    name: $props.name,
    checked: $props.selected,
    onChange: _cache[0] || (_cache[0] = function ($event) {
      return $options.toggleRowWithRadio($event, $props.rowIndex);
    }),
    column: $props.column,
    index: $props.index,
    unstyled: _ctx.unstyled,
    pt: _ctx.pt
  }, null, 8, ["value", "name", "checked", "column", "index", "unstyled", "pt"])) : $options.columnProp('selectionMode') === 'multiple' ? (vue.openBlock(), vue.createBlock(_component_DTCheckbox, {
    key: 1,
    value: $props.rowData,
    checked: $props.selected,
    rowCheckboxIconTemplate: $props.column.children && $props.column.children.rowcheckboxicon,
    "aria-selected": $props.selected ? true : undefined,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.toggleRowWithCheckbox($event, $props.rowIndex);
    }),
    column: $props.column,
    index: $props.index,
    unstyled: _ctx.unstyled,
    pt: _ctx.pt
  }, null, 8, ["value", "checked", "rowCheckboxIconTemplate", "aria-selected", "column", "index", "unstyled", "pt"])) : vue.createCommentVNode("", true)], 64)) : $options.columnProp('rowReorder') ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 5
  }, [$props.column.children && $props.column.children.rowreordericon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.rowreordericon), {
    key: 0,
    "class": vue.normalizeClass(_ctx.cx('rowReorderIcon'))
  }, null, 8, ["class"])) : $options.columnProp('rowReorderIcon') ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
    key: 1,
    "class": [_ctx.cx('rowReorderIcon'), $options.columnProp('rowReorderIcon')]
  }, $options.getColumnPT('rowReorderIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_BarsIcon, vue.mergeProps({
    key: 2,
    "class": _ctx.cx('rowReorderIcon')
  }, $options.getColumnPT('rowReorderIcon')), null, 16, ["class"]))], 64)) : $options.columnProp('expander') ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 6,
    "class": _ctx.cx('rowToggler'),
    type: "button",
    "aria-expanded": $props.isRowExpanded,
    "aria-controls": $props.ariaControls,
    "aria-label": $options.expandButtonAriaLabel,
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.toggleRow && $options.toggleRow.apply($options, arguments);
    })
  }, $options.getColumnPT('rowToggler')), [$props.column.children && $props.column.children.rowtogglericon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.rowtogglericon), {
    key: 0,
    rowExpanded: $props.isRowExpanded
  }, null, 8, ["rowExpanded"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, [$props.isRowExpanded && $props.expandedRowIcon ? (vue.openBlock(), vue.createElementBlock("span", {
    key: 0,
    "class": vue.normalizeClass([_ctx.cx('rowTogglerIcon'), $props.expandedRowIcon])
  }, null, 2)) : $props.isRowExpanded && !$props.expandedRowIcon ? (vue.openBlock(), vue.createBlock(_component_ChevronDownIcon, vue.mergeProps({
    key: 1,
    "class": _ctx.cx('rowTogglerIcon')
  }, $options.getColumnPT('rowTogglerIcon')), null, 16, ["class"])) : !$props.isRowExpanded && $props.collapsedRowIcon ? (vue.openBlock(), vue.createElementBlock("span", {
    key: 2,
    "class": vue.normalizeClass([_ctx.cx('rowTogglerIcon'), $props.collapsedRowIcon])
  }, null, 2)) : !$props.isRowExpanded && !$props.collapsedRowIcon ? (vue.openBlock(), vue.createBlock(_component_ChevronRightIcon, vue.mergeProps({
    key: 3,
    "class": _ctx.cx('rowTogglerIcon')
  }, $options.getColumnPT('rowTogglerIcon')), null, 16, ["class"])) : vue.createCommentVNode("", true)], 64))], 16, _hoisted_2$2)), [[_directive_ripple]]) : $props.editMode === 'row' && $options.columnProp('rowEditor') ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 7
  }, [!$data.d_editing ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('rowEditorInitButton'),
    type: "button",
    "aria-label": $options.initButtonAriaLabel,
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.onRowEditInit && $options.onRowEditInit.apply($options, arguments);
    })
  }, $options.getColumnPT('rowEditorInitButton')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children && $props.column.children.roweditoriniticon || 'PencilIcon'), vue.mergeProps({
    "class": _ctx.cx('rowEditorInitIcon')
  }, $options.getColumnPT('rowEditorInitIcon')), null, 16, ["class"]))], 16, _hoisted_3$2)), [[_directive_ripple]]) : vue.createCommentVNode("", true), $data.d_editing ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('rowEditorSaveButton'),
    type: "button",
    "aria-label": $options.saveButtonAriaLabel,
    onClick: _cache[4] || (_cache[4] = function () {
      return $options.onRowEditSave && $options.onRowEditSave.apply($options, arguments);
    })
  }, $options.getColumnPT('rowEditorSaveButton')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children && $props.column.children.roweditorsaveicon || 'CheckIcon'), vue.mergeProps({
    "class": _ctx.cx('rowEditorSaveIcon')
  }, $options.getColumnPT('rowEditorSaveIcon')), null, 16, ["class"]))], 16, _hoisted_4$1)), [[_directive_ripple]]) : vue.createCommentVNode("", true), $data.d_editing ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 2,
    "class": _ctx.cx('rowEditorCancelButton'),
    type: "button",
    "aria-label": $options.cancelButtonAriaLabel,
    onClick: _cache[5] || (_cache[5] = function () {
      return $options.onRowEditCancel && $options.onRowEditCancel.apply($options, arguments);
    })
  }, $options.getColumnPT('rowEditorCancelButton')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children && $props.column.children.roweditorcancelicon || 'TimesIcon'), vue.mergeProps({
    "class": _ctx.cx('rowEditorCancelIcon')
  }, $options.getColumnPT('rowEditorCancelIcon')), null, 16, ["class"]))], 16, _hoisted_5$1)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 8
  }, [vue.createTextVNode(vue.toDisplayString($options.resolveFieldData()), 1)], 64))], 16, _hoisted_1$5));
}

script$8.render = render$8;

var script$7 = {
  name: 'TableBody',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['rowgroup-toggle', 'row-click', 'row-dblclick', 'row-rightclick', 'row-touchend', 'row-keydown', 'row-mousedown', 'row-dragstart', 'row-dragover', 'row-dragleave', 'row-dragend', 'row-drop', 'row-toggle', 'radio-change', 'checkbox-change', 'cell-edit-init', 'cell-edit-complete', 'cell-edit-cancel', 'row-edit-init', 'row-edit-save', 'row-edit-cancel', 'editing-meta-change'],
  props: {
    value: {
      type: Array,
      "default": null
    },
    columns: {
      type: null,
      "default": null
    },
    frozenRow: {
      type: Boolean,
      "default": false
    },
    empty: {
      type: Boolean,
      "default": false
    },
    rowGroupMode: {
      type: String,
      "default": null
    },
    groupRowsBy: {
      type: [Array, String, Function],
      "default": null
    },
    expandableRowGroups: {
      type: Boolean,
      "default": false
    },
    expandedRowGroups: {
      type: Array,
      "default": null
    },
    first: {
      type: Number,
      "default": 0
    },
    dataKey: {
      type: String,
      "default": null
    },
    expandedRowIcon: {
      type: String,
      "default": null
    },
    collapsedRowIcon: {
      type: String,
      "default": null
    },
    expandedRows: {
      type: Array,
      "default": null
    },
    expandedRowKeys: {
      type: null,
      "default": null
    },
    selection: {
      type: [Array, Object],
      "default": null
    },
    selectionKeys: {
      type: null,
      "default": null
    },
    selectionMode: {
      type: String,
      "default": null
    },
    contextMenu: {
      type: Boolean,
      "default": false
    },
    contextMenuSelection: {
      type: Object,
      "default": null
    },
    rowClass: {
      type: null,
      "default": null
    },
    rowStyle: {
      type: null,
      "default": null
    },
    editMode: {
      type: String,
      "default": null
    },
    compareSelectionBy: {
      type: String,
      "default": 'deepEquals'
    },
    editingRows: {
      type: Array,
      "default": null
    },
    editingRowKeys: {
      type: null,
      "default": null
    },
    editingMeta: {
      type: Object,
      "default": null
    },
    templates: {
      type: null,
      "default": null
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    responsiveLayout: {
      type: String,
      "default": 'stack'
    },
    virtualScrollerContentProps: {
      type: Object,
      "default": null
    },
    isVirtualScrollerDisabled: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      rowGroupHeaderStyleObject: {},
      tabindexArray: [],
      isARowSelected: false
    };
  },
  mounted: function mounted() {
    if (this.frozenRow) {
      this.updateFrozenRowStickyPosition();
    }
    if (this.scrollable && this.rowGroupMode === 'subheader') {
      this.updateFrozenRowGroupHeaderStickyPosition();
    }
  },
  updated: function updated() {
    if (this.frozenRow) {
      this.updateFrozenRowStickyPosition();
    }
    if (this.scrollable && this.rowGroupMode === 'subheader') {
      this.updateFrozenRowGroupHeaderStickyPosition();
    }
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return utils.ObjectUtils.getVNodeProp(col, prop);
    },
    getColumnPT: function getColumnPT(currentColumn, key) {
      var columnMetaData = {
        props: currentColumn.props,
        parent: {
          props: this.$props,
          state: this.$data
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(currentColumn), key, columnMetaData));
    },
    getColumnProp: function getColumnProp(column) {
      return column.props && column.props.pt ? column.props.pt : undefined; //@todo
    },
    getBodyRowPTOptions: function getBodyRowPTOptions(key, rowdata, index) {
      var _this$$parentInstance, _this$$parentInstance2, _this$$parentInstance3;
      return this.ptm(key, {
        context: {
          index: index,
          selectable: ((_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.rowHover) || ((_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.selectionMode),
          selected: this.isSelected(rowdata),
          stripedRows: ((_this$$parentInstance3 = this.$parentInstance) === null || _this$$parentInstance3 === void 0 || (_this$$parentInstance3 = _this$$parentInstance3.$parentInstance) === null || _this$$parentInstance3 === void 0 ? void 0 : _this$$parentInstance3.stripedRows) || false
        }
      });
    },
    shouldRenderRowGroupHeader: function shouldRenderRowGroupHeader(value, rowData, i) {
      var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
      var prevRowData = value[i - 1];
      if (prevRowData) {
        var previousRowFieldData = utils.ObjectUtils.resolveFieldData(prevRowData, this.groupRowsBy);
        return currentRowFieldData !== previousRowFieldData;
      } else {
        return true;
      }
    },
    getRowKey: function getRowKey(rowData, index) {
      return this.dataKey ? utils.ObjectUtils.resolveFieldData(rowData, this.dataKey) : this.getRowIndex(index);
    },
    getRowIndex: function getRowIndex(index) {
      var getItemOptions = this.getVirtualScrollerProp('getItemOptions');
      return getItemOptions ? getItemOptions(index).index : this.first + index;
    },
    getRowStyle: function getRowStyle(rowData) {
      if (this.rowStyle) {
        return this.rowStyle(rowData);
      }
    },
    getRowClass: function getRowClass(rowData) {
      var rowStyleClass = [];
      if (this.rowClass) {
        var rowClassValue = this.rowClass(rowData);
        if (rowClassValue) {
          rowStyleClass.push(rowClassValue);
        }
      }
      return [this.cx('row', {
        rowData: rowData
      }), rowStyleClass];
    },
    shouldRenderRowGroupFooter: function shouldRenderRowGroupFooter(value, rowData, i) {
      if (this.expandableRowGroups && !this.isRowGroupExpanded(rowData)) {
        return false;
      } else {
        var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
        var nextRowData = value[i + 1];
        if (nextRowData) {
          var nextRowFieldData = utils.ObjectUtils.resolveFieldData(nextRowData, this.groupRowsBy);
          return currentRowFieldData !== nextRowFieldData;
        } else {
          return true;
        }
      }
    },
    shouldRenderBodyCell: function shouldRenderBodyCell(value, column, i) {
      if (this.rowGroupMode) {
        if (this.rowGroupMode === 'subheader') {
          return this.groupRowsBy !== this.columnProp(column, 'field');
        } else if (this.rowGroupMode === 'rowspan') {
          if (this.isGrouped(column)) {
            var prevRowData = value[i - 1];
            if (prevRowData) {
              var currentRowFieldData = utils.ObjectUtils.resolveFieldData(value[i], this.columnProp(column, 'field'));
              var previousRowFieldData = utils.ObjectUtils.resolveFieldData(prevRowData, this.columnProp(column, 'field'));
              return currentRowFieldData !== previousRowFieldData;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
        return !this.columnProp(column, 'hidden');
      }
    },
    calculateRowGroupSize: function calculateRowGroupSize(value, column, index) {
      if (this.isGrouped(column)) {
        var currentRowFieldData = utils.ObjectUtils.resolveFieldData(value[index], this.columnProp(column, 'field'));
        var nextRowFieldData = currentRowFieldData;
        var groupRowSpan = 0;
        while (currentRowFieldData === nextRowFieldData) {
          groupRowSpan++;
          var nextRowData = value[++index];
          if (nextRowData) {
            nextRowFieldData = utils.ObjectUtils.resolveFieldData(nextRowData, this.columnProp(column, 'field'));
          } else {
            break;
          }
        }
        return groupRowSpan === 1 ? null : groupRowSpan;
      } else {
        return null;
      }
    },
    isGrouped: function isGrouped(column) {
      if (this.groupRowsBy && this.columnProp(column, 'field')) {
        if (Array.isArray(this.groupRowsBy)) return this.groupRowsBy.indexOf(column.props.field) > -1;else return this.groupRowsBy === column.props.field;
      } else {
        return false;
      }
    },
    isRowEditing: function isRowEditing(rowData) {
      if (rowData && this.editingRows) {
        if (this.dataKey) return this.editingRowKeys ? this.editingRowKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined : false;else return this.findIndex(rowData, this.editingRows) > -1;
      }
      return false;
    },
    isRowExpanded: function isRowExpanded(rowData) {
      if (rowData && this.expandedRows) {
        if (this.dataKey) return this.expandedRowKeys ? this.expandedRowKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined : false;else return this.findIndex(rowData, this.expandedRows) > -1;
      }
      return false;
    },
    isRowGroupExpanded: function isRowGroupExpanded(rowData) {
      if (this.expandableRowGroups && this.expandedRowGroups) {
        var groupFieldValue = utils.ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
        return this.expandedRowGroups.indexOf(groupFieldValue) > -1;
      }
      return false;
    },
    isSelected: function isSelected(rowData) {
      if (rowData && this.selection) {
        if (this.dataKey) {
          return this.selectionKeys ? this.selectionKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined : false;
        } else {
          if (this.selection instanceof Array) return this.findIndexInSelection(rowData) > -1;else return this.equals(rowData, this.selection);
        }
      }
      return false;
    },
    isSelectedWithContextMenu: function isSelectedWithContextMenu(rowData) {
      if (rowData && this.contextMenuSelection) {
        return this.equals(rowData, this.contextMenuSelection, this.dataKey);
      }
      return false;
    },
    findIndexInSelection: function findIndexInSelection(rowData) {
      return this.findIndex(rowData, this.selection);
    },
    findIndex: function findIndex(rowData, collection) {
      var index = -1;
      if (collection && collection.length) {
        for (var i = 0; i < collection.length; i++) {
          if (this.equals(rowData, collection[i])) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    equals: function equals(data1, data2) {
      return this.compareSelectionBy === 'equals' ? data1 === data2 : utils.ObjectUtils.equals(data1, data2, this.dataKey);
    },
    onRowGroupToggle: function onRowGroupToggle(event, data) {
      this.$emit('rowgroup-toggle', {
        originalEvent: event,
        data: data
      });
    },
    onRowClick: function onRowClick(event, rowData, rowIndex) {
      this.$emit('row-click', {
        originalEvent: event,
        data: rowData,
        index: rowIndex
      });
    },
    onRowDblClick: function onRowDblClick(event, rowData, rowIndex) {
      this.$emit('row-dblclick', {
        originalEvent: event,
        data: rowData,
        index: rowIndex
      });
    },
    onRowRightClick: function onRowRightClick(event, rowData, rowIndex) {
      this.$emit('row-rightclick', {
        originalEvent: event,
        data: rowData,
        index: rowIndex
      });
    },
    onRowTouchEnd: function onRowTouchEnd(event) {
      this.$emit('row-touchend', event);
    },
    onRowKeyDown: function onRowKeyDown(event, rowData, rowIndex) {
      this.$emit('row-keydown', {
        originalEvent: event,
        data: rowData,
        index: rowIndex
      });
    },
    onRowMouseDown: function onRowMouseDown(event) {
      this.$emit('row-mousedown', event);
    },
    onRowDragStart: function onRowDragStart(event, rowIndex) {
      this.$emit('row-dragstart', {
        originalEvent: event,
        index: rowIndex
      });
    },
    onRowDragOver: function onRowDragOver(event, rowIndex) {
      this.$emit('row-dragover', {
        originalEvent: event,
        index: rowIndex
      });
    },
    onRowDragLeave: function onRowDragLeave(event) {
      this.$emit('row-dragleave', event);
    },
    onRowDragEnd: function onRowDragEnd(event) {
      this.$emit('row-dragend', event);
    },
    onRowDrop: function onRowDrop(event) {
      this.$emit('row-drop', event);
    },
    onRowToggle: function onRowToggle(event) {
      this.$emit('row-toggle', event);
    },
    onRadioChange: function onRadioChange(event) {
      this.$emit('radio-change', event);
    },
    onCheckboxChange: function onCheckboxChange(event) {
      this.$emit('checkbox-change', event);
    },
    onCellEditInit: function onCellEditInit(event) {
      this.$emit('cell-edit-init', event);
    },
    onCellEditComplete: function onCellEditComplete(event) {
      this.$emit('cell-edit-complete', event);
    },
    onCellEditCancel: function onCellEditCancel(event) {
      this.$emit('cell-edit-cancel', event);
    },
    onRowEditInit: function onRowEditInit(event) {
      this.$emit('row-edit-init', event);
    },
    onRowEditSave: function onRowEditSave(event) {
      this.$emit('row-edit-save', event);
    },
    onRowEditCancel: function onRowEditCancel(event) {
      this.$emit('row-edit-cancel', event);
    },
    onEditingMetaChange: function onEditingMetaChange(event) {
      this.$emit('editing-meta-change', event);
    },
    updateFrozenRowStickyPosition: function updateFrozenRowStickyPosition() {
      this.$el.style.top = utils.DomHandler.getOuterHeight(this.$el.previousElementSibling) + 'px';
    },
    updateFrozenRowGroupHeaderStickyPosition: function updateFrozenRowGroupHeaderStickyPosition() {
      var tableHeaderHeight = utils.DomHandler.getOuterHeight(this.$el.previousElementSibling);
      this.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
    },
    getVirtualScrollerProp: function getVirtualScrollerProp(option, options) {
      options = options || this.virtualScrollerContentProps;
      return options ? options[option] : null;
    },
    bodyRef: function bodyRef(el) {
      // For VirtualScroller
      var contentRef = this.getVirtualScrollerProp('contentRef');
      contentRef && contentRef(el);
    },
    setRowTabindex: function setRowTabindex(index) {
      if (this.selection === null && (this.selectionMode === 'single' || this.selectionMode === 'multiple')) {
        return index === 0 ? 0 : -1;
      }
      return -1;
    }
  },
  computed: {
    columnsLength: function columnsLength() {
      var _this = this;
      var hiddenColLength = 0;
      this.columns.forEach(function (column) {
        if (_this.columnProp(column, 'selectionMode') === 'single') hiddenColLength--;
        if (_this.columnProp(column, 'hidden')) hiddenColLength++;
      });
      return this.columns ? this.columns.length - hiddenColLength : 0;
    },
    rowGroupHeaderStyle: function rowGroupHeaderStyle() {
      if (this.scrollable) {
        return {
          top: this.rowGroupHeaderStyleObject.top
        };
      }
      return null;
    },
    bodyStyle: function bodyStyle() {
      return this.getVirtualScrollerProp('contentStyle');
    },
    expandedRowId: function expandedRowId() {
      return utils.UniqueComponentId();
    },
    nameAttributeSelector: function nameAttributeSelector() {
      return utils.UniqueComponentId();
    },
    ptmTBodyOptions: function ptmTBodyOptions() {
      var _this$$parentInstance4;
      return {
        context: {
          scrollable: (_this$$parentInstance4 = this.$parentInstance) === null || _this$$parentInstance4 === void 0 || (_this$$parentInstance4 = _this$$parentInstance4.$parentInstance) === null || _this$$parentInstance4 === void 0 ? void 0 : _this$$parentInstance4.scrollable
        }
      };
    }
  },
  components: {
    DTBodyCell: script$8,
    ChevronDownIcon: ChevronDownIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"]
  }
};

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1$4 = ["colspan"];
var _hoisted_2$1 = ["onClick"];
var _hoisted_3$1 = ["tabindex", "aria-selected", "onClick", "onDblclick", "onContextmenu", "onKeydown", "onDragstart", "onDragover", "data-p-selectable-row", "data-p-highlight", "data-p-highlight-contextmenu"];
var _hoisted_4 = ["id"];
var _hoisted_5 = ["colspan"];
var _hoisted_6 = ["colspan"];
var _hoisted_7 = ["colspan"];
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ChevronDownIcon = vue.resolveComponent("ChevronDownIcon");
  var _component_ChevronRightIcon = vue.resolveComponent("ChevronRightIcon");
  var _component_DTBodyCell = vue.resolveComponent("DTBodyCell");
  return vue.openBlock(), vue.createElementBlock("tbody", vue.mergeProps({
    ref: $options.bodyRef,
    "class": _ctx.cx('tbody'),
    role: "rowgroup",
    style: $options.bodyStyle
  }, _ctx.ptm('tbody', $options.ptmTBodyOptions)), [!$props.empty ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, {
    key: 0
  }, vue.renderList($props.value, function (rowData, index) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [$props.templates['groupheader'] && $props.rowGroupMode === 'subheader' && $options.shouldRenderRowGroupHeader($props.value, rowData, $options.getRowIndex(index)) ? (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
      key: $options.getRowKey(rowData, $options.getRowIndex(index)) + '_subheader',
      "class": _ctx.cx('rowGroupHeader'),
      style: $options.rowGroupHeaderStyle,
      role: "row"
    }, _ctx.ptm('rowGroupHeader')), [vue.createElementVNode("td", vue.mergeProps({
      colspan: $options.columnsLength - 1
    }, _objectSpread$8(_objectSpread$8({}, _ctx.ptm('column.root')), _ctx.ptm('column.bodyCell')), {
      "data-pc-section": "bodycell"
    }), [$props.expandableRowGroups ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
      key: 0,
      "class": _ctx.cx('rowGroupToggler'),
      onClick: function onClick($event) {
        return $options.onRowGroupToggle($event, rowData);
      },
      type: "button"
    }, _ctx.ptm('rowGroupToggler')), [$props.templates['rowgrouptogglericon'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['rowgrouptogglericon']), {
      key: 0,
      expanded: $options.isRowGroupExpanded(rowData)
    }, null, 8, ["expanded"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 1
    }, [$options.isRowGroupExpanded(rowData) && $props.expandedRowIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      "class": [_ctx.cx('rowGroupTogglerIcon'), $props.expandedRowIcon]
    }, _ctx.ptm('rowGroupTogglerIcon')), null, 16)) : $options.isRowGroupExpanded(rowData) && !$props.expandedRowIcon ? (vue.openBlock(), vue.createBlock(_component_ChevronDownIcon, vue.mergeProps({
      key: 1,
      "class": _ctx.cx('rowGroupTogglerIcon')
    }, _ctx.ptm('rowGroupTogglerIcon')), null, 16, ["class"])) : !$options.isRowGroupExpanded(rowData) && $props.collapsedRowIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 2,
      "class": [_ctx.cx('rowGroupTogglerIcon'), $props.collapsedRowIcon]
    }, _ctx.ptm('rowGroupTogglerIcon')), null, 16)) : !$options.isRowGroupExpanded(rowData) && !$props.collapsedRowIcon ? (vue.openBlock(), vue.createBlock(_component_ChevronRightIcon, vue.mergeProps({
      key: 3,
      "class": _ctx.cx('rowGroupTogglerIcon')
    }, _ctx.ptm('rowGroupTogglerIcon')), null, 16, ["class"])) : vue.createCommentVNode("", true)], 64))], 16, _hoisted_2$1)) : vue.createCommentVNode("", true), (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['groupheader']), {
      data: rowData,
      index: $options.getRowIndex(index)
    }, null, 8, ["data", "index"]))], 16, _hoisted_1$4)], 16)) : vue.createCommentVNode("", true), ($props.expandableRowGroups ? $options.isRowGroupExpanded(rowData) : true) ? (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
      key: $options.getRowKey(rowData, $options.getRowIndex(index)),
      "class": $options.getRowClass(rowData),
      style: $options.getRowStyle(rowData),
      tabindex: $options.setRowTabindex(index),
      role: "row",
      "aria-selected": $props.selectionMode ? $options.isSelected(rowData) : null,
      onClick: function onClick($event) {
        return $options.onRowClick($event, rowData, $options.getRowIndex(index));
      },
      onDblclick: function onDblclick($event) {
        return $options.onRowDblClick($event, rowData, $options.getRowIndex(index));
      },
      onContextmenu: function onContextmenu($event) {
        return $options.onRowRightClick($event, rowData, $options.getRowIndex(index));
      },
      onTouchend: _cache[9] || (_cache[9] = function ($event) {
        return $options.onRowTouchEnd($event);
      }),
      onKeydown: function onKeydown($event) {
        return $options.onRowKeyDown($event, rowData, $options.getRowIndex(index));
      },
      onMousedown: _cache[10] || (_cache[10] = function ($event) {
        return $options.onRowMouseDown($event);
      }),
      onDragstart: function onDragstart($event) {
        return $options.onRowDragStart($event, $options.getRowIndex(index));
      },
      onDragover: function onDragover($event) {
        return $options.onRowDragOver($event, $options.getRowIndex(index));
      },
      onDragleave: _cache[11] || (_cache[11] = function ($event) {
        return $options.onRowDragLeave($event);
      }),
      onDragend: _cache[12] || (_cache[12] = function ($event) {
        return $options.onRowDragEnd($event);
      }),
      onDrop: _cache[13] || (_cache[13] = function ($event) {
        return $options.onRowDrop($event);
      })
    }, $options.getBodyRowPTOptions('bodyRow', rowData, index), {
      "data-p-selectable-row": $props.selectionMode ? true : false,
      "data-p-highlight": $props.selection && $options.isSelected(rowData),
      "data-p-highlight-contextmenu": $props.contextMenuSelection && $options.isSelectedWithContextMenu(rowData)
    }), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.columns, function (col, i) {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [$options.shouldRenderBodyCell($props.value, col, $options.getRowIndex(index)) ? (vue.openBlock(), vue.createBlock(_component_DTBodyCell, {
        key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i,
        rowData: rowData,
        column: col,
        rowIndex: $options.getRowIndex(index),
        index: i,
        selected: $options.isSelected(rowData),
        frozenRow: $props.frozenRow,
        rowspan: $props.rowGroupMode === 'rowspan' ? $options.calculateRowGroupSize($props.value, col, $options.getRowIndex(index)) : null,
        editMode: $props.editMode,
        editing: $props.editMode === 'row' && $options.isRowEditing(rowData),
        editingMeta: $props.editingMeta,
        responsiveLayout: $props.responsiveLayout,
        virtualScrollerContentProps: $props.virtualScrollerContentProps,
        ariaControls: $options.expandedRowId + '_' + index + '_expansion',
        name: $options.nameAttributeSelector,
        isRowExpanded: $options.isRowExpanded(rowData),
        expandedRowIcon: $props.expandedRowIcon,
        collapsedRowIcon: $props.collapsedRowIcon,
        onRadioChange: _cache[0] || (_cache[0] = function ($event) {
          return $options.onRadioChange($event);
        }),
        onCheckboxChange: _cache[1] || (_cache[1] = function ($event) {
          return $options.onCheckboxChange($event);
        }),
        onRowToggle: _cache[2] || (_cache[2] = function ($event) {
          return $options.onRowToggle($event);
        }),
        onCellEditInit: _cache[3] || (_cache[3] = function ($event) {
          return $options.onCellEditInit($event);
        }),
        onCellEditComplete: _cache[4] || (_cache[4] = function ($event) {
          return $options.onCellEditComplete($event);
        }),
        onCellEditCancel: _cache[5] || (_cache[5] = function ($event) {
          return $options.onCellEditCancel($event);
        }),
        onRowEditInit: _cache[6] || (_cache[6] = function ($event) {
          return $options.onRowEditInit($event);
        }),
        onRowEditSave: _cache[7] || (_cache[7] = function ($event) {
          return $options.onRowEditSave($event);
        }),
        onRowEditCancel: _cache[8] || (_cache[8] = function ($event) {
          return $options.onRowEditCancel($event);
        }),
        onEditingMetaChange: $options.onEditingMetaChange,
        unstyled: _ctx.unstyled,
        pt: _ctx.pt
      }, null, 8, ["rowData", "column", "rowIndex", "index", "selected", "frozenRow", "rowspan", "editMode", "editing", "editingMeta", "responsiveLayout", "virtualScrollerContentProps", "ariaControls", "name", "isRowExpanded", "expandedRowIcon", "collapsedRowIcon", "onEditingMetaChange", "unstyled", "pt"])) : vue.createCommentVNode("", true)], 64);
    }), 256))], 16, _hoisted_3$1)) : vue.createCommentVNode("", true), $props.templates['expansion'] && $props.expandedRows && $options.isRowExpanded(rowData) ? (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
      key: $options.getRowKey(rowData, $options.getRowIndex(index)) + '_expansion',
      id: $options.expandedRowId + '_' + index + '_expansion',
      "class": _ctx.cx('rowExpansion'),
      role: "row"
    }, _ctx.ptm('rowExpansion')), [vue.createElementVNode("td", vue.mergeProps({
      colspan: $options.columnsLength
    }, _objectSpread$8(_objectSpread$8({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell'))), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['expansion']), {
      data: rowData,
      index: $options.getRowIndex(index)
    }, null, 8, ["data", "index"]))], 16, _hoisted_5)], 16, _hoisted_4)) : vue.createCommentVNode("", true), $props.templates['groupfooter'] && $props.rowGroupMode === 'subheader' && $options.shouldRenderRowGroupFooter($props.value, rowData, $options.getRowIndex(index)) ? (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
      key: $options.getRowKey(rowData, $options.getRowIndex(index)) + '_subfooter',
      "class": _ctx.cx('rowGroupFooter'),
      role: "row"
    }, _ctx.ptm('rowGroupFooter')), [vue.createElementVNode("td", vue.mergeProps({
      colspan: $options.columnsLength - 1
    }, _objectSpread$8(_objectSpread$8({}, _ctx.ptm('column.root')), _ctx.ptm('column.footerCell')), {
      "data-pc-section": "footercell"
    }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['groupfooter']), {
      data: rowData,
      index: $options.getRowIndex(index)
    }, null, 8, ["data", "index"]))], 16, _hoisted_6)], 16)) : vue.createCommentVNode("", true)], 64);
  }), 256)) : (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('emptyMessage'),
    role: "row"
  }, _ctx.ptm('emptyMessage')), [vue.createElementVNode("td", vue.mergeProps({
    colspan: $options.columnsLength
  }, _objectSpread$8(_objectSpread$8({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell'))), [$props.templates.empty ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.empty), {
    key: 0
  })) : vue.createCommentVNode("", true)], 16, _hoisted_7)], 16))], 16);
}

script$7.render = render$7;

var script$6 = {
  name: 'FooterCell',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  props: {
    column: {
      type: Object,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    }
  },
  data: function data() {
    return {
      styleObject: {}
    };
  },
  mounted: function mounted() {
    if (this.columnProp('frozen')) {
      this.updateStickyPosition();
    }
  },
  updated: function updated() {
    if (this.columnProp('frozen')) {
      this.updateStickyPosition();
    }
  },
  methods: {
    columnProp: function columnProp(prop) {
      return utils.ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance, _this$$parentInstance2;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size,
          showGridlines: ((_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.showGridlines) || false
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined;
    },
    updateStickyPosition: function updateStickyPosition() {
      if (this.columnProp('frozen')) {
        var align = this.columnProp('alignFrozen');
        if (align === 'right') {
          var right = 0;
          var next = this.$el.nextElementSibling;
          if (next) {
            right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + 'px';
        } else {
          var left = 0;
          var prev = this.$el.previousElementSibling;
          if (prev) {
            left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + 'px';
        }
      }
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.columnProp('footerClass'), this.columnProp('class'), this.cx('footerCell')];
    },
    containerStyle: function containerStyle() {
      var bodyStyle = this.columnProp('footerStyle');
      var columnStyle = this.columnProp('style');
      return this.columnProp('frozen') ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    }
  }
};

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1$3 = ["colspan", "rowspan"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell",
    colspan: $options.columnProp('colspan'),
    rowspan: $options.columnProp('rowspan')
  }, _objectSpread$7(_objectSpread$7({}, $options.getColumnPT('root')), $options.getColumnPT('footerCell'))), [$props.column.children && $props.column.children.footer ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.footer), {
    key: 0,
    column: $props.column
  }, null, 8, ["column"])) : vue.createCommentVNode("", true), vue.createTextVNode(" " + vue.toDisplayString($options.columnProp('footer')), 1)], 16, _hoisted_1$3);
}

script$6.render = render$6;

function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$5 = {
  name: 'TableFooter',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  props: {
    columnGroup: {
      type: null,
      "default": null
    },
    columns: {
      type: Object,
      "default": null
    }
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return utils.ObjectUtils.getVNodeProp(col, prop);
    },
    getColumnGroupPT: function getColumnGroupPT(key) {
      var columnGroupMetaData = {
        props: this.getColumnGroupProps(),
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          type: 'footer',
          scrollable: this.ptmTFootOptions.context.scrollable
        }
      };
      return vue.mergeProps(this.ptm("columnGroup.".concat(key), {
        columnGroup: columnGroupMetaData
      }), this.ptm("columnGroup.".concat(key), columnGroupMetaData), this.ptmo(this.getColumnGroupProps(), key, columnGroupMetaData));
    },
    getColumnGroupProps: function getColumnGroupProps() {
      return this.columnGroup && this.columnGroup.props && this.columnGroup.props.pt ? this.columnGroup.props.pt : undefined; //@todo
    },
    getRowPT: function getRowPT(row, key, index) {
      var rowMetaData = {
        props: row.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index
        }
      };
      return vue.mergeProps(this.ptm("row.".concat(key), {
        row: rowMetaData
      }), this.ptm("row.".concat(key), rowMetaData), this.ptmo(this.getRowProp(row), key, rowMetaData));
    },
    getRowProp: function getRowProp(row) {
      return row.props && row.props.pt ? row.props.pt : undefined; //@todo
    },
    getFooterRows: function getFooterRows() {
      var rows = [];
      var columnGroup = this.columnGroup;
      if (columnGroup.children && columnGroup.children["default"]) {
        var _iterator = _createForOfIteratorHelper$2(columnGroup.children["default"]()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            if (child.type.name === 'Row') {
              rows.push(child);
            } else if (child.children && child.children instanceof Array) {
              rows = child.children;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return rows;
      }
    },
    getFooterColumns: function getFooterColumns(row) {
      var cols = [];
      if (row.children && row.children["default"]) {
        row.children["default"]().forEach(function (child) {
          if (child.children && child.children instanceof Array) cols = [].concat(_toConsumableArray$2(cols), _toConsumableArray$2(child.children));else if (child.type.name === 'Column') cols.push(child);
        });
        return cols;
      }
    }
  },
  computed: {
    hasFooter: function hasFooter() {
      var hasFooter = false;
      if (this.columnGroup) {
        hasFooter = true;
      } else if (this.columns) {
        var _iterator2 = _createForOfIteratorHelper$2(this.columns),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var col = _step2.value;
            if (this.columnProp(col, 'footer') || col.children && col.children.footer) {
              hasFooter = true;
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return hasFooter;
    },
    ptmTFootOptions: function ptmTFootOptions() {
      var _this$$parentInstance;
      return {
        context: {
          scrollable: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.scrollable
        }
      };
    }
  },
  components: {
    DTFooterCell: script$6
  }
};

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTFooterCell = vue.resolveComponent("DTFooterCell");
  return $options.hasFooter ? (vue.openBlock(), vue.createElementBlock("tfoot", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('tfoot'),
    style: _ctx.sx('tfoot'),
    role: "rowgroup"
  }, $props.columnGroup ? _objectSpread$6(_objectSpread$6({}, _ctx.ptm('tfoot', $options.ptmTFootOptions)), $options.getColumnGroupPT('root')) : _ctx.ptm('tfoot', $options.ptmTFootOptions), {
    "data-pc-section": "tfoot"
  }), [!$props.columnGroup ? (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
    key: 0,
    role: "row"
  }, _ctx.ptm('footerRow')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.columns, function (col, i) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') ? (vue.openBlock(), vue.createBlock(_component_DTFooterCell, {
      key: 0,
      column: col,
      pt: _ctx.pt
    }, null, 8, ["column", "pt"])) : vue.createCommentVNode("", true)], 64);
  }), 128))], 16)) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, vue.renderList($options.getFooterRows(), function (row, i) {
    return vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
      key: i,
      role: "row"
    }, _objectSpread$6(_objectSpread$6({}, _ctx.ptm('footerRow')), $options.getRowPT(row, 'root', i))), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getFooterColumns(row), function (col, j) {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || j
      }, [!$options.columnProp(col, 'hidden') ? (vue.openBlock(), vue.createBlock(_component_DTFooterCell, {
        key: 0,
        column: col,
        index: i,
        pt: _ctx.pt
      }, null, 8, ["column", "index", "pt"])) : vue.createCommentVNode("", true)], 64);
    }), 128))], 16);
  }), 128))], 16)) : vue.createCommentVNode("", true);
}

script$5.render = render$5;

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var script$4 = {
  name: 'ColumnFilter',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['filter-change', 'filter-apply', 'operator-change', 'matchmode-change', 'constraint-add', 'constraint-remove', 'filter-clear', 'apply-click'],
  props: {
    field: {
      type: String,
      "default": null
    },
    type: {
      type: String,
      "default": 'text'
    },
    display: {
      type: String,
      "default": null
    },
    showMenu: {
      type: Boolean,
      "default": true
    },
    matchMode: {
      type: String,
      "default": null
    },
    showOperator: {
      type: Boolean,
      "default": true
    },
    showClearButton: {
      type: Boolean,
      "default": true
    },
    showApplyButton: {
      type: Boolean,
      "default": true
    },
    showMatchModes: {
      type: Boolean,
      "default": true
    },
    showAddButton: {
      type: Boolean,
      "default": true
    },
    matchModeOptions: {
      type: Array,
      "default": null
    },
    maxConstraints: {
      type: Number,
      "default": 2
    },
    filterElement: {
      type: Function,
      "default": null
    },
    filterHeaderTemplate: {
      type: Function,
      "default": null
    },
    filterFooterTemplate: {
      type: Function,
      "default": null
    },
    filterClearTemplate: {
      type: Function,
      "default": null
    },
    filterApplyTemplate: {
      type: Function,
      "default": null
    },
    filterIconTemplate: {
      type: Function,
      "default": null
    },
    filterAddIconTemplate: {
      type: Function,
      "default": null
    },
    filterRemoveIconTemplate: {
      type: Function,
      "default": null
    },
    filterClearIconTemplate: {
      type: Function,
      "default": null
    },
    filters: {
      type: Object,
      "default": null
    },
    filtersStore: {
      type: Object,
      "default": null
    },
    filterMenuClass: {
      type: String,
      "default": null
    },
    filterMenuStyle: {
      type: null,
      "default": null
    },
    filterInputProps: {
      type: null,
      "default": null
    },
    column: null
  },
  data: function data() {
    return {
      overlayVisible: false,
      defaultMatchMode: null,
      defaultOperator: null
    };
  },
  overlay: null,
  selfClick: false,
  overlayEventListener: null,
  beforeUnmount: function beforeUnmount() {
    if (this.overlayEventListener) {
      OverlayEventBus__default["default"].off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    }
    if (this.overlay) {
      utils.ZIndexUtils.clear(this.overlay);
      this.onOverlayHide();
    }
  },
  mounted: function mounted() {
    if (this.filters && this.filters[this.field]) {
      var fieldFilters = this.filters[this.field];
      if (fieldFilters.operator) {
        this.defaultMatchMode = fieldFilters.constraints[0].matchMode;
        this.defaultOperator = fieldFilters.operator;
      } else {
        this.defaultMatchMode = this.filters[this.field].matchMode;
      }
    }
  },
  methods: {
    getColumnPT: function getColumnPT(key, params) {
      var columnMetaData = _objectSpread$5({
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        }
      }, params);
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined;
    },
    ptmFilterRowItemOptions: function ptmFilterRowItemOptions(matchMode) {
      return {
        context: {
          highlighted: matchMode && this.isRowMatchModeSelected(matchMode.value)
        }
      };
    },
    clearFilter: function clearFilter() {
      var _filters = _objectSpread$5({}, this.filters);
      if (_filters[this.field].operator) {
        _filters[this.field].constraints.splice(1);
        _filters[this.field].operator = this.defaultOperator;
        _filters[this.field].constraints[0] = {
          value: null,
          matchMode: this.defaultMatchMode
        };
      } else {
        _filters[this.field].value = null;
        _filters[this.field].matchMode = this.defaultMatchMode;
      }
      this.$emit('filter-clear');
      this.$emit('filter-change', _filters);
      this.$emit('filter-apply');
      this.hide();
    },
    applyFilter: function applyFilter() {
      this.$emit('apply-click', {
        field: this.field,
        constraints: this.filters[this.field]
      });
      this.$emit('filter-apply');
      this.hide();
    },
    hasFilter: function hasFilter() {
      if (this.filtersStore) {
        var fieldFilter = this.filtersStore[this.field];
        if (fieldFilter) {
          if (fieldFilter.operator) return !this.isFilterBlank(fieldFilter.constraints[0].value);else return !this.isFilterBlank(fieldFilter.value);
        }
      }
      return false;
    },
    hasRowFilter: function hasRowFilter() {
      return this.filters[this.field] && !this.isFilterBlank(this.filters[this.field].value);
    },
    isFilterBlank: function isFilterBlank(filter) {
      if (filter !== null && filter !== undefined) {
        if (typeof filter === 'string' && filter.trim().length == 0 || filter instanceof Array && filter.length == 0) return true;else return false;
      }
      return true;
    },
    toggleMenu: function toggleMenu(event) {
      this.overlayVisible = !this.overlayVisible;
      event.preventDefault();
    },
    onToggleButtonKeyDown: function onToggleButtonKeyDown(event) {
      switch (event.code) {
        case 'Enter':
        case 'Space':
          this.toggleMenu(event);
          break;
        case 'Escape':
          this.overlayVisible = false;
          break;
      }
    },
    onRowMatchModeChange: function onRowMatchModeChange(matchMode) {
      var _filters = _objectSpread$5({}, this.filters);
      _filters[this.field].matchMode = matchMode;
      this.$emit('matchmode-change', {
        field: this.field,
        matchMode: matchMode
      });
      this.$emit('filter-change', _filters);
      this.$emit('filter-apply');
      this.hide();
    },
    onRowMatchModeKeyDown: function onRowMatchModeKeyDown(event) {
      var item = event.target;
      switch (event.code) {
        case 'ArrowDown':
          var nextItem = this.findNextItem(item);
          if (nextItem) {
            item.removeAttribute('tabindex');
            nextItem.tabIndex = '0';
            nextItem.focus();
          }
          event.preventDefault();
          break;
        case 'ArrowUp':
          var prevItem = this.findPrevItem(item);
          if (prevItem) {
            item.removeAttribute('tabindex');
            prevItem.tabIndex = '0';
            prevItem.focus();
          }
          event.preventDefault();
          break;
      }
    },
    isRowMatchModeSelected: function isRowMatchModeSelected(matchMode) {
      return this.filters[this.field].matchMode === matchMode;
    },
    onOperatorChange: function onOperatorChange(value) {
      var _filters = _objectSpread$5({}, this.filters);
      _filters[this.field].operator = value;
      this.$emit('filter-change', _filters);
      this.$emit('operator-change', {
        field: this.field,
        operator: value
      });
      if (!this.showApplyButton) {
        this.$emit('filter-apply');
      }
    },
    onMenuMatchModeChange: function onMenuMatchModeChange(value, index) {
      var _filters = _objectSpread$5({}, this.filters);
      _filters[this.field].constraints[index].matchMode = value;
      this.$emit('matchmode-change', {
        field: this.field,
        matchMode: value,
        index: index
      });
      if (!this.showApplyButton) {
        this.$emit('filter-apply');
      }
    },
    addConstraint: function addConstraint() {
      var _filters = _objectSpread$5({}, this.filters);
      var newConstraint = {
        value: null,
        matchMode: this.defaultMatchMode
      };
      _filters[this.field].constraints.push(newConstraint);
      this.$emit('constraint-add', {
        field: this.field,
        constraing: newConstraint
      });
      this.$emit('filter-change', _filters);
      if (!this.showApplyButton) {
        this.$emit('filter-apply');
      }
    },
    removeConstraint: function removeConstraint(index) {
      var _filters = _objectSpread$5({}, this.filters);
      var removedConstraint = _filters[this.field].constraints.splice(index, 1);
      this.$emit('constraint-remove', {
        field: this.field,
        constraing: removedConstraint
      });
      this.$emit('filter-change', _filters);
      if (!this.showApplyButton) {
        this.$emit('filter-apply');
      }
    },
    filterCallback: function filterCallback() {
      this.$emit('filter-apply');
    },
    findNextItem: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return utils.DomHandler.getAttribute(nextItem, 'data-pc-section') === 'filterseparator' ? this.findNextItem(nextItem) : nextItem;else return item.parentElement.firstElementChild;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return utils.DomHandler.getAttribute(prevItem, 'data-pc-section') === 'filterseparator' ? this.findPrevItem(prevItem) : prevItem;else return item.parentElement.lastElementChild;
    },
    hide: function hide() {
      this.overlayVisible = false;
      utils.DomHandler.focus(this.$refs.icon);
    },
    onContentClick: function onContentClick(event) {
      this.selfClick = true;
      OverlayEventBus__default["default"].emit('overlay-click', {
        originalEvent: event,
        target: this.overlay
      });
    },
    onContentMouseDown: function onContentMouseDown() {
      this.selfClick = true;
    },
    onOverlayEnter: function onOverlayEnter(el) {
      var _this = this;
      if (this.filterMenuStyle) {
        utils.DomHandler.applyStyle(this.overlay, this.filterMenuStyle);
      }
      utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      utils.DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      utils.DomHandler.absolutePosition(this.overlay, this.$refs.icon);
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.overlayEventListener = function (e) {
        if (!_this.isOutsideClicked(e.target)) {
          _this.selfClick = true;
        }
      };
      OverlayEventBus__default["default"].on('overlay-click', this.overlayEventListener);
    },
    onOverlayLeave: function onOverlayLeave() {
      this.onOverlayHide();
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      utils.ZIndexUtils.clear(el);
    },
    onOverlayHide: function onOverlayHide() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
      this.unbindScrollListener();
      this.overlay = null;
      OverlayEventBus__default["default"].off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    isOutsideClicked: function isOutsideClicked(target) {
      return !this.isTargetClicked(target) && this.overlay && !(this.overlay.isSameNode(target) || this.overlay.contains(target));
    },
    isTargetClicked: function isTargetClicked(target) {
      return this.$refs.icon && (this.$refs.icon.isSameNode(target) || this.$refs.icon.contains(target));
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this2 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this2.overlayVisible && !_this2.selfClick && _this2.isOutsideClicked(event.target)) {
            _this2.overlayVisible = false;
          }
          _this2.selfClick = false;
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
        this.selfClick = false;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this3 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.icon, function () {
          if (_this3.overlayVisible) {
            _this3.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this4 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this4.overlayVisible && !utils.DomHandler.isTouchDevice()) {
            _this4.hide();
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    }
  },
  computed: {
    showMenuButton: function showMenuButton() {
      return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
    },
    overlayId: function overlayId() {
      return utils.UniqueComponentId();
    },
    matchModes: function matchModes() {
      var _this5 = this;
      return this.matchModeOptions || this.$primevue.config.filterMatchModeOptions[this.type].map(function (key) {
        return {
          label: _this5.$primevue.config.locale[key],
          value: key
        };
      });
    },
    isShowMatchModes: function isShowMatchModes() {
      return this.type !== 'boolean' && this.showMatchModes && this.matchModes;
    },
    operatorOptions: function operatorOptions() {
      return [{
        label: this.$primevue.config.locale.matchAll,
        value: api.FilterOperator.AND
      }, {
        label: this.$primevue.config.locale.matchAny,
        value: api.FilterOperator.OR
      }];
    },
    noFilterLabel: function noFilterLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.noFilter : undefined;
    },
    isShowOperator: function isShowOperator() {
      return this.showOperator && this.filters[this.field].operator;
    },
    operator: function operator() {
      return this.filters[this.field].operator;
    },
    fieldConstraints: function fieldConstraints() {
      return this.filters[this.field].constraints || [this.filters[this.field]];
    },
    showRemoveIcon: function showRemoveIcon() {
      return this.fieldConstraints.length > 1;
    },
    removeRuleButtonLabel: function removeRuleButtonLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.removeRule : undefined;
    },
    addRuleButtonLabel: function addRuleButtonLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.addRule : undefined;
    },
    isShowAddConstraint: function isShowAddConstraint() {
      return this.showAddButton && this.filters[this.field].operator && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints;
    },
    clearButtonLabel: function clearButtonLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.clear : undefined;
    },
    applyButtonLabel: function applyButtonLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.apply : undefined;
    },
    filterMenuButtonAriaLabel: function filterMenuButtonAriaLabel() {
      return this.$primevue.config.locale ? this.overlayVisible ? this.$primevue.config.locale.showFilterMenu : this.$primevue.config.locale.hideFilterMenu : undefined;
    },
    filterOperatorAriaLabel: function filterOperatorAriaLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.filterOperator : undefined;
    },
    filterConstraintAriaLabel: function filterConstraintAriaLabel() {
      return this.$primevue.config.locale ? this.$primevue.config.locale.filterConstraint : undefined;
    },
    ptmHeaderFilterClearParams: function ptmHeaderFilterClearParams() {
      return {
        context: {
          hidden: this.hasRowFilter()
        }
      };
    },
    ptmFilterMenuParams: function ptmFilterMenuParams() {
      return {
        context: {
          overlayVisible: this.overlayVisible,
          active: this.hasFilter()
        }
      };
    }
  },
  components: {
    CFDropdown: Dropdown__default["default"],
    CFButton: Button__default["default"],
    Portal: Portal__default["default"],
    FilterSlashIcon: FilterSlashIcon__default["default"],
    FilterIcon: FilterIcon__default["default"],
    TrashIcon: TrashIcon__default["default"],
    PlusIcon: PlusIcon__default["default"]
  },
  directives: {
    focustrap: FocusTrap__default["default"]
  }
};

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1$2 = ["aria-label", "aria-expanded", "aria-controls"];
var _hoisted_2 = ["id", "aria-modal"];
var _hoisted_3 = ["onClick", "onKeydown", "tabindex"];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CFDropdown = vue.resolveComponent("CFDropdown");
  var _component_CFButton = vue.resolveComponent("CFButton");
  var _component_Portal = vue.resolveComponent("Portal");
  var _directive_focustrap = vue.resolveDirective("focustrap");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('columnFilter')
  }, $options.getColumnPT('columnFilter')), [$props.display === 'row' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('filterInput')
  }, _objectSpread$4(_objectSpread$4({}, $props.filterInputProps), $options.getColumnPT('filterInput'))), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterElement), {
    field: $props.field,
    filterModel: $props.filters[$props.field],
    filterCallback: $options.filterCallback
  }, null, 8, ["field", "filterModel", "filterCallback"]))], 16)) : vue.createCommentVNode("", true), $options.showMenuButton ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 1,
    ref: "icon",
    type: "button",
    "aria-label": $options.filterMenuButtonAriaLabel,
    "aria-haspopup": "true",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $options.overlayId,
    "class": _ctx.cx('filterMenuButton'),
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.toggleMenu($event);
    }),
    onKeydown: _cache[1] || (_cache[1] = function ($event) {
      return $options.onToggleButtonKeyDown($event);
    })
  }, $options.getColumnPT('filterMenuButton', $options.ptmFilterMenuParams)), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterIconTemplate || 'FilterIcon'), vue.normalizeProps(vue.guardReactiveProps($options.getColumnPT('filterMenuIcon'))), null, 16))], 16, _hoisted_1$2)) : vue.createCommentVNode("", true), $props.showClearButton && $props.display === 'row' ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 2,
    "class": _ctx.cx('headerFilterClearButton'),
    type: "button",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.clearFilter();
    })
  }, $options.getColumnPT('headerFilterClearButton', $options.ptmHeaderFilterClearParams)), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterClearIconTemplate || 'FilterSlashIcon'), vue.normalizeProps(vue.guardReactiveProps($options.getColumnPT('filterClearIcon'))), null, 16))], 16)) : vue.createCommentVNode("", true), vue.createVNode(_component_Portal, null, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, {
        "default": vue.withCtx(function () {
          return [$data.overlayVisible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: $options.overlayId,
            "aria-modal": $data.overlayVisible,
            role: "dialog",
            "class": [_ctx.cx('filterOverlay'), $props.filterMenuClass],
            onKeydown: _cache[10] || (_cache[10] = vue.withKeys(function () {
              return $options.hide && $options.hide.apply($options, arguments);
            }, ["escape"])),
            onClick: _cache[11] || (_cache[11] = function () {
              return $options.onContentClick && $options.onContentClick.apply($options, arguments);
            }),
            onMousedown: _cache[12] || (_cache[12] = function () {
              return $options.onContentMouseDown && $options.onContentMouseDown.apply($options, arguments);
            })
          }, $options.getColumnPT('filterOverlay')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterHeaderTemplate), {
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.filterCallback
          }, null, 8, ["field", "filterModel", "filterCallback"])), $props.display === 'row' ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('filterRowItems')
          }, $options.getColumnPT('filterRowItems')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.matchModes, function (matchMode, i) {
            return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: matchMode.label,
              "class": _ctx.cx('filterRowItem', {
                matchMode: matchMode
              }),
              onClick: function onClick($event) {
                return $options.onRowMatchModeChange(matchMode.value);
              },
              onKeydown: [_cache[3] || (_cache[3] = function ($event) {
                return $options.onRowMatchModeKeyDown($event);
              }), vue.withKeys(vue.withModifiers(function ($event) {
                return $options.onRowMatchModeChange(matchMode.value);
              }, ["prevent"]), ["enter"])],
              tabindex: i === 0 ? '0' : null
            }, $options.getColumnPT('filterRowItem', $options.ptmFilterRowItemOptions(matchMode))), vue.toDisplayString(matchMode.label), 17, _hoisted_3);
          }), 128)), vue.createElementVNode("li", vue.mergeProps({
            "class": _ctx.cx('filterSeparator')
          }, $options.getColumnPT('filterSeparator')), null, 16), vue.createElementVNode("li", vue.mergeProps({
            "class": _ctx.cx('filterRowItem'),
            onClick: _cache[4] || (_cache[4] = function ($event) {
              return $options.clearFilter();
            }),
            onKeydown: [_cache[5] || (_cache[5] = function ($event) {
              return $options.onRowMatchModeKeyDown($event);
            }), _cache[6] || (_cache[6] = vue.withKeys(function ($event) {
              return _ctx.onRowClearItemClick();
            }, ["enter"]))]
          }, $options.getColumnPT('filterRowItem')), vue.toDisplayString($options.noFilterLabel), 17)], 16)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: 1
          }, [$options.isShowOperator ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('filterOperator')
          }, $options.getColumnPT('filterOperator')), [vue.createVNode(_component_CFDropdown, {
            options: $options.operatorOptions,
            modelValue: $options.operator,
            "aria-label": $options.filterOperatorAriaLabel,
            "class": vue.normalizeClass(_ctx.cx('filterOperatorDropdown')),
            optionLabel: "label",
            optionValue: "value",
            "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
              return $options.onOperatorChange($event);
            }),
            unstyled: _ctx.unstyled,
            pt: $options.getColumnPT('filterOperatorDropdown'),
            "data-pc-section": "filteroperatordropdown"
          }, null, 8, ["options", "modelValue", "aria-label", "class", "unstyled", "pt"])], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('filterConstraints')
          }, $options.getColumnPT('filterConstraints')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.fieldConstraints, function (fieldConstraint, i) {
            return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: i,
              "class": _ctx.cx('filterConstraint')
            }, $options.getColumnPT('filterConstraint')), [$options.isShowMatchModes ? (vue.openBlock(), vue.createBlock(_component_CFDropdown, {
              key: 0,
              options: $options.matchModes,
              modelValue: fieldConstraint.matchMode,
              "class": vue.normalizeClass(_ctx.cx('filterMatchModeDropdown')),
              optionLabel: "label",
              optionValue: "value",
              "aria-label": $options.filterConstraintAriaLabel,
              "onUpdate:modelValue": function onUpdateModelValue($event) {
                return $options.onMenuMatchModeChange($event, i);
              },
              unstyled: _ctx.unstyled,
              pt: $options.getColumnPT('filterMatchModeDropdown'),
              "data-pc-section": "filtermatchmodedropdown"
            }, null, 8, ["options", "modelValue", "class", "aria-label", "onUpdate:modelValue", "unstyled", "pt"])) : vue.createCommentVNode("", true), $props.display === 'menu' ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterElement), {
              key: 1,
              field: $props.field,
              filterModel: fieldConstraint,
              filterCallback: $options.filterCallback
            }, null, 8, ["field", "filterModel", "filterCallback"])) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.normalizeProps(vue.guardReactiveProps($options.getColumnPT('filterRemove'))), [$options.showRemoveIcon ? (vue.openBlock(), vue.createBlock(_component_CFButton, {
              key: 0,
              type: "button",
              "class": vue.normalizeClass(_ctx.cx('filterRemoveButton')),
              onClick: function onClick($event) {
                return $options.removeConstraint(i);
              },
              label: $options.removeRuleButtonLabel,
              unstyled: _ctx.unstyled,
              text: "",
              severity: "danger",
              size: "small",
              pt: $options.getColumnPT('filterRemoveButton'),
              "data-pc-section": "filterremovebutton"
            }, {
              icon: vue.withCtx(function (iconProps) {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterRemoveIconTemplate || 'TrashIcon'), vue.mergeProps({
                  "class": iconProps["class"]
                }, $options.getColumnPT('filterRemoveButton')['icon']), null, 16, ["class"]))];
              }),
              _: 2
            }, 1032, ["class", "onClick", "label", "unstyled", "pt"])) : vue.createCommentVNode("", true)], 16)], 16);
          }), 128))], 16), $options.isShowAddConstraint ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 1,
            "class": _ctx.cx('filterAddRule')
          }, $options.getColumnPT('filterAddRule')), [vue.createVNode(_component_CFButton, {
            type: "button",
            label: $options.addRuleButtonLabel,
            iconPos: "left",
            "class": vue.normalizeClass(_ctx.cx('filterAddRuleButton')),
            onClick: _cache[8] || (_cache[8] = function ($event) {
              return $options.addConstraint();
            }),
            unstyled: _ctx.unstyled,
            text: "",
            severity: "info",
            size: "small",
            pt: $options.getColumnPT('filterAddRuleButton'),
            "data-pc-section": "filteraddrulebutton"
          }, {
            icon: vue.withCtx(function (iconProps) {
              return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterAddIconTemplate || 'PlusIcon'), vue.mergeProps({
                "class": iconProps["class"]
              }, $options.getColumnPT('filterAddRuleButton')['icon']), null, 16, ["class"]))];
            }),
            _: 1
          }, 8, ["label", "class", "unstyled", "pt"])], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('filterButtonbar')
          }, $options.getColumnPT('filterButtonbar')), [!$props.filterClearTemplate && $props.showClearButton ? (vue.openBlock(), vue.createBlock(_component_CFButton, {
            key: 0,
            type: "button",
            "class": vue.normalizeClass(_ctx.cx('filterClearButton')),
            label: $options.clearButtonLabel,
            onClick: $options.clearFilter,
            unstyled: _ctx.unstyled,
            size: "small",
            outlined: "",
            pt: $options.getColumnPT('filterClearButton'),
            "data-pc-section": "filterclearbutton"
          }, null, 8, ["class", "label", "onClick", "unstyled", "pt"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterClearTemplate), {
            key: 1,
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.clearFilter
          }, null, 8, ["field", "filterModel", "filterCallback"])), $props.showApplyButton ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: 2
          }, [!$props.filterApplyTemplate ? (vue.openBlock(), vue.createBlock(_component_CFButton, {
            key: 0,
            type: "button",
            "class": vue.normalizeClass(_ctx.cx('filterApplyButton')),
            label: $options.applyButtonLabel,
            onClick: _cache[9] || (_cache[9] = function ($event) {
              return $options.applyFilter();
            }),
            unstyled: _ctx.unstyled,
            size: "small",
            pt: $options.getColumnPT('filterApplyButton'),
            "data-pc-section": "filterapplybutton"
          }, null, 8, ["class", "label", "unstyled", "pt"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterApplyTemplate), {
            key: 1,
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.applyFilter
          }, null, 8, ["field", "filterModel", "filterCallback"]))], 64)) : vue.createCommentVNode("", true)], 16)], 64)), (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.filterFooterTemplate), {
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.filterCallback
          }, null, 8, ["field", "filterModel", "filterCallback"]))], 16, _hoisted_2)), [[_directive_focustrap, {
            autoFocus: true
          }]]) : vue.createCommentVNode("", true)];
        }),
        _: 1
      }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 1
  })], 16);
}

script$4.render = render$4;

var script$3 = {
  name: 'HeaderCheckbox',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['change'],
  props: {
    checked: null,
    disabled: null,
    column: null,
    headerCheckboxIconTemplate: {
      type: Function,
      "default": null
    }
  },
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          checked: this.checked,
          focused: this.focused,
          disabled: this.disabled
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onClick: function onClick(event) {
      if (!this.disabled) {
        this.$emit('change', {
          originalEvent: event,
          checked: !this.checked
        });
        utils.DomHandler.focus(this.$refs.input);
      }
    },
    onFocus: function onFocus() {
      this.focused = true;
    },
    onBlur: function onBlur() {
      this.focused = false;
    }
  },
  computed: {
    headerCheckboxAriaLabel: function headerCheckboxAriaLabel() {
      return this.$primevue.config.locale.aria ? this.checked ? this.$primevue.config.locale.aria.selectAll : this.$primevue.config.locale.aria.unselectAll : undefined;
    }
  },
  components: {
    CheckIcon: CheckIcon__default["default"]
  }
};

var _hoisted_1$1 = ["checked", "disabled", "tabindex", "aria-label"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = vue.resolveComponent("CheckIcon");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('headerCheckboxWrapper'),
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }, ["prevent"]), ["space"]))
  }, $options.getColumnPT('headerCheckboxWrapper')), [vue.createElementVNode("div", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, $options.getColumnPT('hiddenHeaderInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    ref: "input",
    type: "checkbox",
    checked: $props.checked,
    disabled: $props.disabled,
    tabindex: $props.disabled ? null : '0',
    "aria-label": $options.headerCheckboxAriaLabel,
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return $options.onBlur($event);
    })
  }, $options.getColumnPT('hiddenHeaderInput')), null, 16, _hoisted_1$1)], 16), vue.createElementVNode("div", vue.mergeProps({
    ref: "box",
    "class": _ctx.cx('headerCheckbox')
  }, $options.getColumnPT('headerCheckbox')), [$props.headerCheckboxIconTemplate ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.headerCheckboxIconTemplate), {
    key: 0,
    checked: $props.checked,
    "class": vue.normalizeClass(_ctx.cx('headerCheckboxIcon'))
  }, null, 8, ["checked", "class"])) : !$props.headerCheckboxIconTemplate && !!$props.checked ? (vue.openBlock(), vue.createBlock(_component_CheckIcon, vue.mergeProps({
    key: 1,
    "class": _ctx.cx('headerCheckboxIcon')
  }, $options.getColumnPT('headerCheckboxIcon')), null, 16, ["class"])) : vue.createCommentVNode("", true)], 16)], 16);
}

script$3.render = render$3;

var script$2 = {
  name: 'HeaderCell',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['column-click', 'column-mousedown', 'column-dragstart', 'column-dragover', 'column-dragleave', 'column-drop', 'column-resizestart', 'checkbox-change', 'filter-change', 'filter-apply', 'operator-change', 'matchmode-change', 'constraint-add', 'constraint-remove', 'filter-clear', 'apply-click'],
  props: {
    column: {
      type: Object,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    },
    resizableColumns: {
      type: Boolean,
      "default": false
    },
    groupRowsBy: {
      type: [Array, String, Function],
      "default": null
    },
    sortMode: {
      type: String,
      "default": 'single'
    },
    groupRowSortField: {
      type: [String, Function],
      "default": null
    },
    sortField: {
      type: [String, Function],
      "default": null
    },
    sortOrder: {
      type: Number,
      "default": null
    },
    multiSortMeta: {
      type: Array,
      "default": null
    },
    allRowsSelected: {
      type: Boolean,
      "default": false
    },
    empty: {
      type: Boolean,
      "default": false
    },
    filterDisplay: {
      type: String,
      "default": null
    },
    filters: {
      type: Object,
      "default": null
    },
    filtersStore: {
      type: Object,
      "default": null
    },
    filterColumn: {
      type: Boolean,
      "default": false
    },
    reorderableColumns: {
      type: Boolean,
      "default": false
    },
    filterInputProps: {
      type: null,
      "default": null
    },
    headerCheckboxIconTemplate: {
      type: Function,
      "default": null
    }
  },
  data: function data() {
    return {
      styleObject: {}
    };
  },
  mounted: function mounted() {
    if (this.columnProp('frozen')) {
      this.updateStickyPosition();
    }
  },
  updated: function updated() {
    if (this.columnProp('frozen')) {
      this.updateStickyPosition();
    }
  },
  methods: {
    columnProp: function columnProp(prop) {
      return utils.ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance, _this$$parentInstance2;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          sorted: this.isColumnSorted(),
          resizable: this.resizableColumns,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size,
          showGridlines: ((_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.showGridlines) || false
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onClick: function onClick(event) {
      this.$emit('column-click', {
        originalEvent: event,
        column: this.column
      });
    },
    onKeyDown: function onKeyDown(event) {
      if ((event.code === 'Enter' || event.code === 'Space') && event.currentTarget.nodeName === 'TH' && utils.DomHandler.getAttribute(event.currentTarget, 'data-p-sortable-column')) {
        this.$emit('column-click', {
          originalEvent: event,
          column: this.column
        });
        event.preventDefault();
      }
    },
    onMouseDown: function onMouseDown(event) {
      this.$emit('column-mousedown', {
        originalEvent: event,
        column: this.column
      });
    },
    onDragStart: function onDragStart(event) {
      this.$emit('column-dragstart', event);
    },
    onDragOver: function onDragOver(event) {
      this.$emit('column-dragover', event);
    },
    onDragLeave: function onDragLeave(event) {
      this.$emit('column-dragleave', event);
    },
    onDrop: function onDrop(event) {
      this.$emit('column-drop', event);
    },
    onResizeStart: function onResizeStart(event) {
      this.$emit('column-resizestart', event);
    },
    getMultiSortMetaIndex: function getMultiSortMetaIndex() {
      var _this = this;
      return this.multiSortMeta.findIndex(function (meta) {
        return meta.field === _this.columnProp('field') || meta.field === _this.columnProp('sortField');
      });
    },
    getBadgeValue: function getBadgeValue() {
      var index = this.getMultiSortMetaIndex();
      return this.groupRowsBy && this.groupRowsBy === this.groupRowSortField && index > -1 ? index : index + 1;
    },
    isMultiSorted: function isMultiSorted() {
      return this.sortMode === 'multiple' && this.columnProp('sortable') && this.getMultiSortMetaIndex() > -1;
    },
    isColumnSorted: function isColumnSorted() {
      return this.sortMode === 'single' ? this.sortField && (this.sortField === this.columnProp('field') || this.sortField === this.columnProp('sortField')) : this.isMultiSorted();
    },
    updateStickyPosition: function updateStickyPosition() {
      if (this.columnProp('frozen')) {
        var align = this.columnProp('alignFrozen');
        if (align === 'right') {
          var right = 0;
          var next = this.$el.nextElementSibling;
          if (next) {
            right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + 'px';
        } else {
          var left = 0;
          var prev = this.$el.previousElementSibling;
          if (prev) {
            left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + 'px';
        }
        var filterRow = this.$el.parentElement.nextElementSibling;
        if (filterRow) {
          var index = utils.DomHandler.index(this.$el);
          filterRow.children[index].style.left = this.styleObject.left;
          filterRow.children[index].style.right = this.styleObject.right;
        }
      }
    },
    onHeaderCheckboxChange: function onHeaderCheckboxChange(event) {
      this.$emit('checkbox-change', event);
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.cx('headerCell'), this.filterColumn ? this.columnProp('filterHeaderClass') : this.columnProp('headerClass'), this.columnProp('class')];
    },
    containerStyle: function containerStyle() {
      var headerStyle = this.filterColumn ? this.columnProp('filterHeaderStyle') : this.columnProp('headerStyle');
      var columnStyle = this.columnProp('style');
      return this.columnProp('frozen') ? [columnStyle, headerStyle, this.styleObject] : [columnStyle, headerStyle];
    },
    sortState: function sortState() {
      var sorted = false;
      var sortOrder = null;
      if (this.sortMode === 'single') {
        sorted = this.sortField && (this.sortField === this.columnProp('field') || this.sortField === this.columnProp('sortField'));
        sortOrder = sorted ? this.sortOrder : 0;
      } else if (this.sortMode === 'multiple') {
        var metaIndex = this.getMultiSortMetaIndex();
        if (metaIndex > -1) {
          sorted = true;
          sortOrder = this.multiSortMeta[metaIndex].order;
        }
      }
      return {
        sorted: sorted,
        sortOrder: sortOrder
      };
    },
    sortableColumnIcon: function sortableColumnIcon() {
      var _this$sortState = this.sortState,
        sorted = _this$sortState.sorted,
        sortOrder = _this$sortState.sortOrder;
      if (!sorted) return SortAltIcon__default["default"];else if (sorted && sortOrder > 0) return SortAmountUpAltIcon__default["default"];else if (sorted && sortOrder < 0) return SortAmountDownIcon__default["default"];
      return null;
    },
    ariaSort: function ariaSort() {
      if (this.columnProp('sortable')) {
        var _this$sortState2 = this.sortState,
          sorted = _this$sortState2.sorted,
          sortOrder = _this$sortState2.sortOrder;
        if (sorted && sortOrder < 0) return 'descending';else if (sorted && sortOrder > 0) return 'ascending';else return 'none';
      } else {
        return null;
      }
    }
  },
  components: {
    DTHeaderCheckbox: script$3,
    DTColumnFilter: script$4,
    SortAltIcon: SortAltIcon__default["default"],
    SortAmountUpAltIcon: SortAmountUpAltIcon__default["default"],
    SortAmountDownIcon: SortAmountDownIcon__default["default"]
  }
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["tabindex", "colspan", "rowspan", "aria-sort", "data-p-sortable-column", "data-p-resizable-column", "data-p-highlight", "data-p-filter-column", "data-p-frozen-column", "data-p-reorderable-column"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTHeaderCheckbox = vue.resolveComponent("DTHeaderCheckbox");
  var _component_DTColumnFilter = vue.resolveComponent("DTColumnFilter");
  return vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    tabindex: $options.columnProp('sortable') ? '0' : null,
    role: "columnheader",
    colspan: $options.columnProp('colspan'),
    rowspan: $options.columnProp('rowspan'),
    "aria-sort": $options.ariaSort,
    onClick: _cache[8] || (_cache[8] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[9] || (_cache[9] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onMousedown: _cache[10] || (_cache[10] = function () {
      return $options.onMouseDown && $options.onMouseDown.apply($options, arguments);
    }),
    onDragstart: _cache[11] || (_cache[11] = function () {
      return $options.onDragStart && $options.onDragStart.apply($options, arguments);
    }),
    onDragover: _cache[12] || (_cache[12] = function () {
      return $options.onDragOver && $options.onDragOver.apply($options, arguments);
    }),
    onDragleave: _cache[13] || (_cache[13] = function () {
      return $options.onDragLeave && $options.onDragLeave.apply($options, arguments);
    }),
    onDrop: _cache[14] || (_cache[14] = function () {
      return $options.onDrop && $options.onDrop.apply($options, arguments);
    })
  }, _objectSpread$3(_objectSpread$3({}, $options.getColumnPT('root')), $options.getColumnPT('headerCell')), {
    "data-p-sortable-column": $options.columnProp('sortable'),
    "data-p-resizable-column": $props.resizableColumns,
    "data-p-highlight": $options.isColumnSorted(),
    "data-p-filter-column": $props.filterColumn,
    "data-p-frozen-column": $options.columnProp('frozen'),
    "data-p-reorderable-column": $props.reorderableColumns
  }), [$props.resizableColumns && !$options.columnProp('frozen') ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('columnResizer'),
    onMousedown: _cache[0] || (_cache[0] = function () {
      return $options.onResizeStart && $options.onResizeStart.apply($options, arguments);
    })
  }, $options.getColumnPT('columnResizer')), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('headerContent')
  }, $options.getColumnPT('headerContent')), [$props.column.children && $props.column.children.header ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.header), {
    key: 0,
    column: $props.column
  }, null, 8, ["column"])) : vue.createCommentVNode("", true), $options.columnProp('header') ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('headerTitle')
  }, $options.getColumnPT('headerTitle')), vue.toDisplayString($options.columnProp('header')), 17)) : vue.createCommentVNode("", true), $options.columnProp('sortable') ? (vue.openBlock(), vue.createElementBlock("span", vue.normalizeProps(vue.mergeProps({
    key: 2
  }, $options.getColumnPT('sort'))), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children && $props.column.children.sorticon || $options.sortableColumnIcon), vue.mergeProps({
    sorted: $options.sortState.sorted,
    sortOrder: $options.sortState.sortOrder,
    "data-pc-section": "sorticon",
    "class": _ctx.cx('sortIcon')
  }, $options.getColumnPT('sorticon')), null, 16, ["sorted", "sortOrder", "class"]))], 16)) : vue.createCommentVNode("", true), $options.isMultiSorted() ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 3,
    "class": _ctx.cx('sortBadge')
  }, $options.getColumnPT('sortBadge')), vue.toDisplayString($options.getBadgeValue()), 17)) : vue.createCommentVNode("", true), $options.columnProp('selectionMode') === 'multiple' && $props.filterDisplay !== 'row' ? (vue.openBlock(), vue.createBlock(_component_DTHeaderCheckbox, {
    key: 4,
    checked: $props.allRowsSelected,
    onChange: $options.onHeaderCheckboxChange,
    disabled: $props.empty,
    headerCheckboxIconTemplate: $props.headerCheckboxIconTemplate,
    column: $props.column,
    pt: _ctx.pt
  }, null, 8, ["checked", "onChange", "disabled", "headerCheckboxIconTemplate", "column", "pt"])) : vue.createCommentVNode("", true), $props.filterDisplay === 'menu' && $props.column.children && $props.column.children.filter ? (vue.openBlock(), vue.createBlock(_component_DTColumnFilter, {
    key: 5,
    field: $options.columnProp('filterField') || $options.columnProp('field'),
    type: $options.columnProp('dataType'),
    display: "menu",
    showMenu: $options.columnProp('showFilterMenu'),
    filterElement: $props.column.children && $props.column.children.filter,
    filterHeaderTemplate: $props.column.children && $props.column.children.filterheader,
    filterFooterTemplate: $props.column.children && $props.column.children.filterfooter,
    filterClearTemplate: $props.column.children && $props.column.children.filterclear,
    filterApplyTemplate: $props.column.children && $props.column.children.filterapply,
    filterIconTemplate: $props.column.children && $props.column.children.filtericon,
    filterAddIconTemplate: $props.column.children && $props.column.children.filteraddicon,
    filterRemoveIconTemplate: $props.column.children && $props.column.children.filterremoveicon,
    filterClearIconTemplate: $props.column.children && $props.column.children.filterclearicon,
    filters: $props.filters,
    filtersStore: $props.filtersStore,
    filterInputProps: $props.filterInputProps,
    onFilterChange: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('filter-change', $event);
    }),
    onFilterApply: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.$emit('filter-apply');
    }),
    filterMenuStyle: $options.columnProp('filterMenuStyle'),
    filterMenuClass: $options.columnProp('filterMenuClass'),
    showOperator: $options.columnProp('showFilterOperator'),
    showClearButton: $options.columnProp('showClearButton'),
    showApplyButton: $options.columnProp('showApplyButton'),
    showMatchModes: $options.columnProp('showFilterMatchModes'),
    showAddButton: $options.columnProp('showAddButton'),
    matchModeOptions: $options.columnProp('filterMatchModeOptions'),
    maxConstraints: $options.columnProp('maxConstraints'),
    onOperatorChange: _cache[3] || (_cache[3] = function ($event) {
      return _ctx.$emit('operator-change', $event);
    }),
    onMatchmodeChange: _cache[4] || (_cache[4] = function ($event) {
      return _ctx.$emit('matchmode-change', $event);
    }),
    onConstraintAdd: _cache[5] || (_cache[5] = function ($event) {
      return _ctx.$emit('constraint-add', $event);
    }),
    onConstraintRemove: _cache[6] || (_cache[6] = function ($event) {
      return _ctx.$emit('constraint-remove', $event);
    }),
    onApplyClick: _cache[7] || (_cache[7] = function ($event) {
      return _ctx.$emit('apply-click', $event);
    }),
    column: $props.column,
    unstyled: _ctx.unstyled,
    pt: _ctx.pt
  }, null, 8, ["field", "type", "showMenu", "filterElement", "filterHeaderTemplate", "filterFooterTemplate", "filterClearTemplate", "filterApplyTemplate", "filterIconTemplate", "filterAddIconTemplate", "filterRemoveIconTemplate", "filterClearIconTemplate", "filters", "filtersStore", "filterInputProps", "filterMenuStyle", "filterMenuClass", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "matchModeOptions", "maxConstraints", "column", "unstyled", "pt"])) : vue.createCommentVNode("", true)], 16)], 16, _hoisted_1);
}

script$2.render = render$2;

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$1 = {
  name: 'TableHeader',
  hostName: 'DataTable',
  "extends": BaseComponent__default["default"],
  emits: ['column-click', 'column-mousedown', 'column-dragstart', 'column-dragover', 'column-dragleave', 'column-drop', 'column-resizestart', 'checkbox-change', 'filter-change', 'filter-apply', 'operator-change', 'matchmode-change', 'constraint-add', 'constraint-remove', 'filter-clear', 'apply-click'],
  props: {
    columnGroup: {
      type: null,
      "default": null
    },
    columns: {
      type: null,
      "default": null
    },
    rowGroupMode: {
      type: String,
      "default": null
    },
    groupRowsBy: {
      type: [Array, String, Function],
      "default": null
    },
    resizableColumns: {
      type: Boolean,
      "default": false
    },
    allRowsSelected: {
      type: Boolean,
      "default": false
    },
    empty: {
      type: Boolean,
      "default": false
    },
    sortMode: {
      type: String,
      "default": 'single'
    },
    groupRowSortField: {
      type: [String, Function],
      "default": null
    },
    sortField: {
      type: [String, Function],
      "default": null
    },
    sortOrder: {
      type: Number,
      "default": null
    },
    multiSortMeta: {
      type: Array,
      "default": null
    },
    filterDisplay: {
      type: String,
      "default": null
    },
    filters: {
      type: Object,
      "default": null
    },
    filtersStore: {
      type: Object,
      "default": null
    },
    reorderableColumns: {
      type: Boolean,
      "default": false
    },
    filterInputProps: {
      type: null,
      "default": null
    },
    headerCheckboxIconTemplate: {
      type: Function,
      "default": null
    }
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return utils.ObjectUtils.getVNodeProp(col, prop);
    },
    getColumnGroupPT: function getColumnGroupPT(key) {
      var _this$$parentInstance;
      var columnGroupMetaData = {
        props: this.getColumnGroupProps(),
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          type: 'header',
          scrollable: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.scrollable
        }
      };
      return vue.mergeProps(this.ptm("columnGroup.".concat(key), {
        columnGroup: columnGroupMetaData
      }), this.ptm("columnGroup.".concat(key), columnGroupMetaData), this.ptmo(this.getColumnGroupProps(), key, columnGroupMetaData));
    },
    getColumnGroupProps: function getColumnGroupProps() {
      return this.columnGroup && this.columnGroup.props && this.columnGroup.props.pt ? this.columnGroup.props.pt : undefined; //@todo
    },
    getRowPT: function getRowPT(row, key, index) {
      var rowMetaData = {
        props: row.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index
        }
      };
      return vue.mergeProps(this.ptm("row.".concat(key), {
        row: rowMetaData
      }), this.ptm("row.".concat(key), rowMetaData), this.ptmo(this.getRowProp(row), key, rowMetaData));
    },
    getRowProp: function getRowProp(row) {
      return row.props && row.props.pt ? row.props.pt : undefined; //@todo
    },
    getColumnPT: function getColumnPT(column, key, index) {
      var columnMetaData = {
        props: column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index
        }
      };
      return vue.mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(column), key, columnMetaData));
    },
    getColumnProp: function getColumnProp(column) {
      return column.props && column.props.pt ? column.props.pt : undefined; //@todo
    },
    getFilterColumnHeaderClass: function getFilterColumnHeaderClass(column) {
      return [this.cx('headerCell', {
        column: column
      }), this.columnProp(column, 'filterHeaderClass'), this.columnProp(column, 'class')];
    },
    getFilterColumnHeaderStyle: function getFilterColumnHeaderStyle(column) {
      return [this.columnProp(column, 'filterHeaderStyle'), this.columnProp(column, 'style')];
    },
    getHeaderRows: function getHeaderRows() {
      var rows = [];
      var columnGroup = this.columnGroup;
      if (columnGroup.children && columnGroup.children["default"]) {
        var _iterator = _createForOfIteratorHelper$1(columnGroup.children["default"]()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            if (child.type.name === 'Row') {
              rows.push(child);
            } else if (child.children && child.children instanceof Array) {
              rows = child.children;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return rows;
      }
    },
    getHeaderColumns: function getHeaderColumns(row) {
      var cols = [];
      if (row.children && row.children["default"]) {
        row.children["default"]().forEach(function (child) {
          if (child.children && child.children instanceof Array) cols = [].concat(_toConsumableArray$1(cols), _toConsumableArray$1(child.children));else if (child.type.name === 'Column') cols.push(child);
        });
        return cols;
      }
    }
  },
  computed: {
    ptmTHeadOptions: function ptmTHeadOptions() {
      var _this$$parentInstance2;
      return {
        context: {
          scrollable: (_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.scrollable
        }
      };
    }
  },
  components: {
    DTHeaderCell: script$2,
    DTHeaderCheckbox: script$3,
    DTColumnFilter: script$4
  }
};

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTHeaderCell = vue.resolveComponent("DTHeaderCell");
  var _component_DTHeaderCheckbox = vue.resolveComponent("DTHeaderCheckbox");
  var _component_DTColumnFilter = vue.resolveComponent("DTColumnFilter");
  return vue.openBlock(), vue.createElementBlock("thead", vue.mergeProps({
    "class": _ctx.cx('thead'),
    style: _ctx.sx('thead'),
    role: "rowgroup"
  }, $props.columnGroup ? _objectSpread$2(_objectSpread$2({}, _ctx.ptm('thead', $options.ptmTHeadOptions)), $options.getColumnGroupPT('root')) : _ctx.ptm('thead', $options.ptmTHeadOptions), {
    "data-pc-section": "thead"
  }), [!$props.columnGroup ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 0
  }, [vue.createElementVNode("tr", vue.mergeProps({
    role: "row"
  }, _ctx.ptm('headerRow')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.columns, function (col, i) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') && ($props.rowGroupMode !== 'subheader' || $props.groupRowsBy !== $options.columnProp(col, 'field')) ? (vue.openBlock(), vue.createBlock(_component_DTHeaderCell, {
      key: 0,
      column: col,
      index: i,
      onColumnClick: _cache[0] || (_cache[0] = function ($event) {
        return _ctx.$emit('column-click', $event);
      }),
      onColumnMousedown: _cache[1] || (_cache[1] = function ($event) {
        return _ctx.$emit('column-mousedown', $event);
      }),
      onColumnDragstart: _cache[2] || (_cache[2] = function ($event) {
        return _ctx.$emit('column-dragstart', $event);
      }),
      onColumnDragover: _cache[3] || (_cache[3] = function ($event) {
        return _ctx.$emit('column-dragover', $event);
      }),
      onColumnDragleave: _cache[4] || (_cache[4] = function ($event) {
        return _ctx.$emit('column-dragleave', $event);
      }),
      onColumnDrop: _cache[5] || (_cache[5] = function ($event) {
        return _ctx.$emit('column-drop', $event);
      }),
      groupRowsBy: $props.groupRowsBy,
      groupRowSortField: $props.groupRowSortField,
      reorderableColumns: $props.reorderableColumns,
      resizableColumns: $props.resizableColumns,
      onColumnResizestart: _cache[6] || (_cache[6] = function ($event) {
        return _ctx.$emit('column-resizestart', $event);
      }),
      sortMode: $props.sortMode,
      sortField: $props.sortField,
      sortOrder: $props.sortOrder,
      multiSortMeta: $props.multiSortMeta,
      allRowsSelected: $props.allRowsSelected,
      empty: $props.empty,
      onCheckboxChange: _cache[7] || (_cache[7] = function ($event) {
        return _ctx.$emit('checkbox-change', $event);
      }),
      filters: $props.filters,
      filterDisplay: $props.filterDisplay,
      filtersStore: $props.filtersStore,
      filterInputProps: $props.filterInputProps,
      onFilterChange: _cache[8] || (_cache[8] = function ($event) {
        return _ctx.$emit('filter-change', $event);
      }),
      onFilterApply: _cache[9] || (_cache[9] = function ($event) {
        return _ctx.$emit('filter-apply');
      }),
      onOperatorChange: _cache[10] || (_cache[10] = function ($event) {
        return _ctx.$emit('operator-change', $event);
      }),
      onMatchmodeChange: _cache[11] || (_cache[11] = function ($event) {
        return _ctx.$emit('matchmode-change', $event);
      }),
      onConstraintAdd: _cache[12] || (_cache[12] = function ($event) {
        return _ctx.$emit('constraint-add', $event);
      }),
      onConstraintRemove: _cache[13] || (_cache[13] = function ($event) {
        return _ctx.$emit('constraint-remove', $event);
      }),
      onApplyClick: _cache[14] || (_cache[14] = function ($event) {
        return _ctx.$emit('apply-click', $event);
      }),
      headerCheckboxIconTemplate: $props.headerCheckboxIconTemplate,
      pt: _ctx.pt
    }, null, 8, ["column", "index", "groupRowsBy", "groupRowSortField", "reorderableColumns", "resizableColumns", "sortMode", "sortField", "sortOrder", "multiSortMeta", "allRowsSelected", "empty", "filters", "filterDisplay", "filtersStore", "filterInputProps", "headerCheckboxIconTemplate", "pt"])) : vue.createCommentVNode("", true)], 64);
  }), 128))], 16), $props.filterDisplay === 'row' ? (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
    key: 0,
    role: "row"
  }, _ctx.ptm('headerRow')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.columns, function (col, i) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') && ($props.rowGroupMode !== 'subheader' || $props.groupRowsBy !== $options.columnProp(col, 'field')) ? (vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
      key: 0,
      style: $options.getFilterColumnHeaderStyle(col),
      "class": $options.getFilterColumnHeaderClass(col)
    }, _objectSpread$2(_objectSpread$2({}, $options.getColumnPT(col, 'root', i)), $options.getColumnPT(col, 'headerCell', i))), [$options.columnProp(col, 'selectionMode') === 'multiple' ? (vue.openBlock(), vue.createBlock(_component_DTHeaderCheckbox, {
      key: 0,
      checked: $props.allRowsSelected,
      disabled: $props.empty,
      onChange: _cache[15] || (_cache[15] = function ($event) {
        return _ctx.$emit('checkbox-change', $event);
      }),
      column: col,
      pt: _ctx.pt
    }, null, 8, ["checked", "disabled", "column", "pt"])) : vue.createCommentVNode("", true), col.children && col.children.filter ? (vue.openBlock(), vue.createBlock(_component_DTColumnFilter, {
      key: 1,
      field: $options.columnProp(col, 'filterField') || $options.columnProp(col, 'field'),
      type: $options.columnProp(col, 'dataType'),
      display: "row",
      showMenu: $options.columnProp(col, 'showFilterMenu'),
      filterElement: col.children && col.children.filter,
      filterHeaderTemplate: col.children && col.children.filterheader,
      filterFooterTemplate: col.children && col.children.filterfooter,
      filterClearTemplate: col.children && col.children.filterclear,
      filterApplyTemplate: col.children && col.children.filterapply,
      filterIconTemplate: col.children && col.children.filtericon,
      filterAddIconTemplate: col.children && col.children.filteraddicon,
      filterRemoveIconTemplate: col.children && col.children.filterremoveicon,
      filterClearIconTemplate: col.children && col.children.filterclearicon,
      filters: $props.filters,
      filtersStore: $props.filtersStore,
      filterInputProps: $props.filterInputProps,
      onFilterChange: _cache[16] || (_cache[16] = function ($event) {
        return _ctx.$emit('filter-change', $event);
      }),
      onFilterApply: _cache[17] || (_cache[17] = function ($event) {
        return _ctx.$emit('filter-apply');
      }),
      filterMenuStyle: $options.columnProp(col, 'filterMenuStyle'),
      filterMenuClass: $options.columnProp(col, 'filterMenuClass'),
      showOperator: $options.columnProp(col, 'showFilterOperator'),
      showClearButton: $options.columnProp(col, 'showClearButton'),
      showApplyButton: $options.columnProp(col, 'showApplyButton'),
      showMatchModes: $options.columnProp(col, 'showFilterMatchModes'),
      showAddButton: $options.columnProp(col, 'showAddButton'),
      matchModeOptions: $options.columnProp(col, 'filterMatchModeOptions'),
      maxConstraints: $options.columnProp(col, 'maxConstraints'),
      onOperatorChange: _cache[18] || (_cache[18] = function ($event) {
        return _ctx.$emit('operator-change', $event);
      }),
      onMatchmodeChange: _cache[19] || (_cache[19] = function ($event) {
        return _ctx.$emit('matchmode-change', $event);
      }),
      onConstraintAdd: _cache[20] || (_cache[20] = function ($event) {
        return _ctx.$emit('constraint-add', $event);
      }),
      onConstraintRemove: _cache[21] || (_cache[21] = function ($event) {
        return _ctx.$emit('constraint-remove', $event);
      }),
      onApplyClick: _cache[22] || (_cache[22] = function ($event) {
        return _ctx.$emit('apply-click', $event);
      }),
      column: col,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["field", "type", "showMenu", "filterElement", "filterHeaderTemplate", "filterFooterTemplate", "filterClearTemplate", "filterApplyTemplate", "filterIconTemplate", "filterAddIconTemplate", "filterRemoveIconTemplate", "filterClearIconTemplate", "filters", "filtersStore", "filterInputProps", "filterMenuStyle", "filterMenuClass", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "matchModeOptions", "maxConstraints", "column", "unstyled", "pt"])) : vue.createCommentVNode("", true)], 16)) : vue.createCommentVNode("", true)], 64);
  }), 128))], 16)) : vue.createCommentVNode("", true)], 64)) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, vue.renderList($options.getHeaderRows(), function (row, i) {
    return vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
      key: i,
      role: "row"
    }, _objectSpread$2(_objectSpread$2({}, _ctx.ptm('headerRow')), $options.getRowPT(row, 'root', i))), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getHeaderColumns(row), function (col, j) {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || j
      }, [!$options.columnProp(col, 'hidden') && ($props.rowGroupMode !== 'subheader' || $props.groupRowsBy !== $options.columnProp(col, 'field')) && typeof col.children !== 'string' ? (vue.openBlock(), vue.createBlock(_component_DTHeaderCell, {
        key: 0,
        column: col,
        onColumnClick: _cache[23] || (_cache[23] = function ($event) {
          return _ctx.$emit('column-click', $event);
        }),
        onColumnMousedown: _cache[24] || (_cache[24] = function ($event) {
          return _ctx.$emit('column-mousedown', $event);
        }),
        groupRowsBy: $props.groupRowsBy,
        groupRowSortField: $props.groupRowSortField,
        sortMode: $props.sortMode,
        sortField: $props.sortField,
        sortOrder: $props.sortOrder,
        multiSortMeta: $props.multiSortMeta,
        allRowsSelected: $props.allRowsSelected,
        empty: $props.empty,
        onCheckboxChange: _cache[25] || (_cache[25] = function ($event) {
          return _ctx.$emit('checkbox-change', $event);
        }),
        filters: $props.filters,
        filterDisplay: $props.filterDisplay,
        filtersStore: $props.filtersStore,
        onFilterChange: _cache[26] || (_cache[26] = function ($event) {
          return _ctx.$emit('filter-change', $event);
        }),
        onFilterApply: _cache[27] || (_cache[27] = function ($event) {
          return _ctx.$emit('filter-apply');
        }),
        onOperatorChange: _cache[28] || (_cache[28] = function ($event) {
          return _ctx.$emit('operator-change', $event);
        }),
        onMatchmodeChange: _cache[29] || (_cache[29] = function ($event) {
          return _ctx.$emit('matchmode-change', $event);
        }),
        onConstraintAdd: _cache[30] || (_cache[30] = function ($event) {
          return _ctx.$emit('constraint-add', $event);
        }),
        onConstraintRemove: _cache[31] || (_cache[31] = function ($event) {
          return _ctx.$emit('constraint-remove', $event);
        }),
        onApplyClick: _cache[32] || (_cache[32] = function ($event) {
          return _ctx.$emit('apply-click', $event);
        }),
        headerCheckboxIconTemplate: $props.headerCheckboxIconTemplate,
        pt: _ctx.pt
      }, null, 8, ["column", "groupRowsBy", "groupRowSortField", "sortMode", "sortField", "sortOrder", "multiSortMeta", "allRowsSelected", "empty", "filters", "filterDisplay", "filtersStore", "headerCheckboxIconTemplate", "pt"])) : vue.createCommentVNode("", true)], 64);
    }), 128))], 16);
  }), 128))], 16);
}

script$1.render = render$1;

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'DataTable',
  "extends": script$b,
  emits: ['value-change', 'update:first', 'update:rows', 'page', 'update:sortField', 'update:sortOrder', 'update:multiSortMeta', 'sort', 'filter', 'row-click', 'row-dblclick', 'update:selection', 'row-select', 'row-unselect', 'update:contextMenuSelection', 'row-contextmenu', 'row-unselect-all', 'row-select-all', 'select-all-change', 'column-resize-end', 'column-reorder', 'row-reorder', 'update:expandedRows', 'row-collapse', 'row-expand', 'update:expandedRowGroups', 'rowgroup-collapse', 'rowgroup-expand', 'update:filters', 'state-restore', 'state-save', 'cell-edit-init', 'cell-edit-complete', 'cell-edit-cancel', 'update:editingRows', 'row-edit-init', 'row-edit-save', 'row-edit-cancel'],
  data: function data() {
    return {
      d_first: this.first,
      d_rows: this.rows,
      d_sortField: this.sortField,
      d_sortOrder: this.sortOrder,
      d_multiSortMeta: this.multiSortMeta ? _toConsumableArray(this.multiSortMeta) : [],
      d_groupRowsSortMeta: null,
      d_selectionKeys: null,
      d_expandedRowKeys: null,
      d_columnOrder: null,
      d_editingRowKeys: null,
      d_editingMeta: {},
      d_filters: this.cloneFilters(this.filters)
    };
  },
  rowTouched: false,
  anchorRowIndex: null,
  rangeRowIndex: null,
  documentColumnResizeListener: null,
  documentColumnResizeEndListener: null,
  lastResizeHelperX: null,
  resizeColumnElement: null,
  columnResizing: false,
  colReorderIconWidth: null,
  colReorderIconHeight: null,
  draggedColumn: null,
  draggedRowIndex: null,
  droppedRowIndex: null,
  rowDragging: null,
  columnWidthsState: null,
  tableWidthState: null,
  columnWidthsRestored: false,
  watch: {
    first: function first(newValue) {
      this.d_first = newValue;
    },
    rows: function rows(newValue) {
      this.d_rows = newValue;
    },
    sortField: function sortField(newValue) {
      this.d_sortField = newValue;
    },
    sortOrder: function sortOrder(newValue) {
      this.d_sortOrder = newValue;
    },
    multiSortMeta: function multiSortMeta(newValue) {
      this.d_multiSortMeta = newValue;
    },
    selection: {
      immediate: true,
      handler: function handler(newValue) {
        if (this.dataKey) {
          this.updateSelectionKeys(newValue);
        }
      }
    },
    expandedRows: function expandedRows(newValue) {
      if (this.dataKey) {
        this.updateExpandedRowKeys(newValue);
      }
    },
    editingRows: function editingRows(newValue) {
      if (this.dataKey) {
        this.updateEditingRowKeys(newValue);
      }
    },
    filters: {
      deep: true,
      handler: function handler(newValue) {
        this.d_filters = this.cloneFilters(newValue);
      }
    }
  },
  beforeMount: function beforeMount() {
    if (this.isStateful()) {
      this.restoreState();
    }
  },
  mounted: function mounted() {
    this.$el.setAttribute(this.attributeSelector, '');
    if (this.responsiveLayout === 'stack' && !this.scrollable && !this.unstyled) {
      this.createResponsiveStyle();
    }
    if (this.isStateful() && this.resizableColumns) {
      this.restoreColumnWidths();
    }
    if (this.editMode === 'row' && this.dataKey && !this.d_editingRowKeys) {
      this.updateEditingRowKeys(this.editingRows);
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindColumnResizeEvents();
    this.destroyStyleElement();
    this.destroyResponsiveStyle();
  },
  updated: function updated() {
    if (this.isStateful()) {
      this.saveState();
    }
    if (this.editMode === 'row' && this.dataKey && !this.d_editingRowKeys) {
      this.updateEditingRowKeys(this.editingRows);
    }
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return utils.ObjectUtils.getVNodeProp(col, prop);
    },
    onPage: function onPage(event) {
      this.clearEditingMetaData();
      this.d_first = event.first;
      this.d_rows = event.rows;
      var pageEvent = this.createLazyLoadEvent(event);
      pageEvent.pageCount = event.pageCount;
      pageEvent.page = event.page;
      this.$emit('update:first', this.d_first);
      this.$emit('update:rows', this.d_rows);
      this.$emit('page', pageEvent);
      this.$emit('value-change', this.processedData);
    },
    onColumnHeaderClick: function onColumnHeaderClick(e) {
      var event = e.originalEvent;
      var column = e.column;
      if (this.columnProp(column, 'sortable')) {
        var targetNode = event.target;
        var columnField = this.columnProp(column, 'sortField') || this.columnProp(column, 'field');
        if (utils.DomHandler.getAttribute(targetNode, 'data-p-sortable-column') === true || utils.DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headertitle' || utils.DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headercontent' || utils.DomHandler.getAttribute(targetNode, 'data-pc-section') === 'sorticon' || utils.DomHandler.getAttribute(targetNode.parentElement, 'data-pc-section') === 'sorticon' || utils.DomHandler.getAttribute(targetNode.parentElement.parentElement, 'data-pc-section') === 'sorticon') {
          utils.DomHandler.clearSelection();
          if (this.sortMode === 'single') {
            if (this.d_sortField === columnField) {
              if (this.removableSort && this.d_sortOrder * -1 === this.defaultSortOrder) {
                this.d_sortOrder = null;
                this.d_sortField = null;
              } else {
                this.d_sortOrder = this.d_sortOrder * -1;
              }
            } else {
              this.d_sortOrder = this.defaultSortOrder;
              this.d_sortField = columnField;
            }
            this.$emit('update:sortField', this.d_sortField);
            this.$emit('update:sortOrder', this.d_sortOrder);
            this.resetPage();
          } else if (this.sortMode === 'multiple') {
            var metaKey = event.metaKey || event.ctrlKey;
            if (!metaKey) {
              this.d_multiSortMeta = this.d_multiSortMeta.filter(function (meta) {
                return meta.field === columnField;
              });
            }
            this.addMultiSortField(columnField);
            this.$emit('update:multiSortMeta', this.d_multiSortMeta);
          }
          this.$emit('sort', this.createLazyLoadEvent(event));
          this.$emit('value-change', this.processedData);
        }
      }
    },
    sortSingle: function sortSingle(value) {
      var _this = this;
      this.clearEditingMetaData();
      if (this.groupRowsBy && this.groupRowsBy === this.sortField) {
        this.d_multiSortMeta = [{
          field: this.sortField,
          order: this.sortOrder || this.defaultSortOrder
        }, {
          field: this.d_sortField,
          order: this.d_sortOrder
        }];
        return this.sortMultiple(value);
      }
      var data = _toConsumableArray(value);
      data.sort(function (data1, data2) {
        var value1 = utils.ObjectUtils.resolveFieldData(data1, _this.d_sortField);
        var value2 = utils.ObjectUtils.resolveFieldData(data2, _this.d_sortField);
        var result = null;
        if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
          numeric: true
        });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return _this.d_sortOrder * result;
      });
      return data;
    },
    sortMultiple: function sortMultiple(value) {
      var _this2 = this;
      this.clearEditingMetaData();
      if (this.groupRowsBy && (this.d_groupRowsSortMeta || this.d_multiSortMeta.length && this.groupRowsBy === this.d_multiSortMeta[0].field)) {
        var firstSortMeta = this.d_multiSortMeta[0];
        !this.d_groupRowsSortMeta && (this.d_groupRowsSortMeta = firstSortMeta);
        if (firstSortMeta.field !== this.d_groupRowsSortMeta.field) {
          this.d_multiSortMeta = [this.d_groupRowsSortMeta].concat(_toConsumableArray(this.d_multiSortMeta));
        }
      }
      var data = _toConsumableArray(value);
      data.sort(function (data1, data2) {
        return _this2.multisortField(data1, data2, 0);
      });
      return data;
    },
    multisortField: function multisortField(data1, data2, index) {
      var value1 = utils.ObjectUtils.resolveFieldData(data1, this.d_multiSortMeta[index].field);
      var value2 = utils.ObjectUtils.resolveFieldData(data2, this.d_multiSortMeta[index].field);
      var result = null;
      if (typeof value1 === 'string' || value1 instanceof String) {
        if (value1.localeCompare && value1 !== value2) {
          return this.d_multiSortMeta[index].order * value1.localeCompare(value2, undefined, {
            numeric: true
          });
        }
      } else {
        result = value1 < value2 ? -1 : 1;
      }
      if (value1 === value2) {
        return this.d_multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, index + 1) : 0;
      }
      return this.d_multiSortMeta[index].order * result;
    },
    addMultiSortField: function addMultiSortField(field) {
      var index = this.d_multiSortMeta.findIndex(function (meta) {
        return meta.field === field;
      });
      if (index >= 0) {
        if (this.removableSort && this.d_multiSortMeta[index].order * -1 === this.defaultSortOrder) this.d_multiSortMeta.splice(index, 1);else this.d_multiSortMeta[index] = {
          field: field,
          order: this.d_multiSortMeta[index].order * -1
        };
      } else {
        this.d_multiSortMeta.push({
          field: field,
          order: this.defaultSortOrder
        });
      }
      this.d_multiSortMeta = _toConsumableArray(this.d_multiSortMeta);
    },
    filter: function filter(data) {
      var _this3 = this;
      if (!data) {
        return;
      }
      this.clearEditingMetaData();
      var globalFilterFieldsArray;
      if (this.filters['global']) {
        globalFilterFieldsArray = this.globalFilterFields || this.columns.map(function (col) {
          return _this3.columnProp(col, 'filterField') || _this3.columnProp(col, 'field');
        });
      }
      var filteredValue = [];
      for (var i = 0; i < data.length; i++) {
        var localMatch = true;
        var globalMatch = false;
        var localFiltered = false;
        for (var prop in this.filters) {
          if (Object.prototype.hasOwnProperty.call(this.filters, prop) && prop !== 'global') {
            localFiltered = true;
            var filterField = prop;
            var filterMeta = this.filters[filterField];
            if (filterMeta.operator) {
              var _iterator = _createForOfIteratorHelper(filterMeta.constraints),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var filterConstraint = _step.value;
                  localMatch = this.executeLocalFilter(filterField, data[i], filterConstraint);
                  if (filterMeta.operator === api.FilterOperator.OR && localMatch || filterMeta.operator === api.FilterOperator.AND && !localMatch) {
                    break;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            } else {
              localMatch = this.executeLocalFilter(filterField, data[i], filterMeta);
            }
            if (!localMatch) {
              break;
            }
          }
        }
        if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
          for (var j = 0; j < globalFilterFieldsArray.length; j++) {
            var globalFilterField = globalFilterFieldsArray[j];
            globalMatch = api.FilterService.filters[this.filters['global'].matchMode || api.FilterMatchMode.CONTAINS](utils.ObjectUtils.resolveFieldData(data[i], globalFilterField), this.filters['global'].value, this.filterLocale);
            if (globalMatch) {
              break;
            }
          }
        }
        var matches = void 0;
        if (this.filters['global']) {
          matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
        } else {
          matches = localFiltered && localMatch;
        }
        if (matches) {
          filteredValue.push(data[i]);
        }
      }
      if (filteredValue.length === this.value.length) {
        filteredValue = data;
      }
      var filterEvent = this.createLazyLoadEvent();
      filterEvent.filteredValue = filteredValue;
      this.$emit('filter', filterEvent);
      this.$emit('value-change', filteredValue);
      return filteredValue;
    },
    executeLocalFilter: function executeLocalFilter(field, rowData, filterMeta) {
      var filterValue = filterMeta.value;
      var filterMatchMode = filterMeta.matchMode || api.FilterMatchMode.STARTS_WITH;
      var dataFieldValue = utils.ObjectUtils.resolveFieldData(rowData, field);
      var filterConstraint = api.FilterService.filters[filterMatchMode];
      return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    },
    onRowClick: function onRowClick(e) {
      var event = e.originalEvent;
      var index = e.index;
      var body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
      var focusedItem = utils.DomHandler.findSingle(body, 'tr[data-p-selectable-row="true"][tabindex="0"]');
      if (utils.DomHandler.isClickable(event.target)) {
        return;
      }
      this.$emit('row-click', e);
      if (this.selectionMode) {
        var rowData = e.data;
        var rowIndex = this.d_first + e.index;
        if (this.isMultipleSelectionMode() && event.shiftKey && this.anchorRowIndex != null) {
          utils.DomHandler.clearSelection();
          this.rangeRowIndex = rowIndex;
          this.selectRange(event);
        } else {
          var selected = this.isSelected(rowData);
          var metaSelection = this.rowTouched ? false : this.metaKeySelection;
          this.anchorRowIndex = rowIndex;
          this.rangeRowIndex = rowIndex;
          if (metaSelection) {
            var metaKey = event.metaKey || event.ctrlKey;
            if (selected && metaKey) {
              if (this.isSingleSelectionMode()) {
                this.$emit('update:selection', null);
              } else {
                var selectionIndex = this.findIndexInSelection(rowData);
                var _selection = this.selection.filter(function (val, i) {
                  return i != selectionIndex;
                });
                this.$emit('update:selection', _selection);
              }
              this.$emit('row-unselect', {
                originalEvent: event,
                data: rowData,
                index: rowIndex,
                type: 'row'
              });
            } else {
              if (this.isSingleSelectionMode()) {
                this.$emit('update:selection', rowData);
              } else if (this.isMultipleSelectionMode()) {
                var _selection2 = metaKey ? this.selection || [] : [];
                _selection2 = [].concat(_toConsumableArray(_selection2), [rowData]);
                this.$emit('update:selection', _selection2);
              }
              this.$emit('row-select', {
                originalEvent: event,
                data: rowData,
                index: rowIndex,
                type: 'row'
              });
            }
          } else {
            if (this.selectionMode === 'single') {
              if (selected) {
                this.$emit('update:selection', null);
                this.$emit('row-unselect', {
                  originalEvent: event,
                  data: rowData,
                  index: rowIndex,
                  type: 'row'
                });
              } else {
                this.$emit('update:selection', rowData);
                this.$emit('row-select', {
                  originalEvent: event,
                  data: rowData,
                  index: rowIndex,
                  type: 'row'
                });
              }
            } else if (this.selectionMode === 'multiple') {
              if (selected) {
                var _selectionIndex = this.findIndexInSelection(rowData);
                var _selection3 = this.selection.filter(function (val, i) {
                  return i != _selectionIndex;
                });
                this.$emit('update:selection', _selection3);
                this.$emit('row-unselect', {
                  originalEvent: event,
                  data: rowData,
                  index: rowIndex,
                  type: 'row'
                });
              } else {
                var _selection4 = this.selection ? [].concat(_toConsumableArray(this.selection), [rowData]) : [rowData];
                this.$emit('update:selection', _selection4);
                this.$emit('row-select', {
                  originalEvent: event,
                  data: rowData,
                  index: rowIndex,
                  type: 'row'
                });
              }
            }
          }
        }
      }
      this.rowTouched = false;
      if (focusedItem) {
        focusedItem.tabIndex = '-1';
        utils.DomHandler.find(body, 'tr[data-p-selectable-row="true"]')[index].tabIndex = '0';
      }
    },
    onRowDblClick: function onRowDblClick(e) {
      var event = e.originalEvent;
      if (utils.DomHandler.isClickable(event.target)) {
        return;
      }
      this.$emit('row-dblclick', e);
    },
    onRowRightClick: function onRowRightClick(event) {
      if (this.contextMenu) {
        utils.DomHandler.clearSelection();
        event.originalEvent.target.focus();
      }
      this.$emit('update:contextMenuSelection', event.data);
      this.$emit('row-contextmenu', event);
    },
    onRowTouchEnd: function onRowTouchEnd() {
      this.rowTouched = true;
    },
    onRowKeyDown: function onRowKeyDown(e, slotProps) {
      var event = e.originalEvent;
      var rowData = e.data;
      var rowIndex = e.index;
      var metaKey = event.metaKey || event.ctrlKey;
      if (this.selectionMode) {
        var row = event.target;
        switch (event.code) {
          case 'ArrowDown':
            this.onArrowDownKey(event, row, rowIndex, slotProps);
            break;
          case 'ArrowUp':
            this.onArrowUpKey(event, row, rowIndex, slotProps);
            break;
          case 'Home':
            this.onHomeKey(event, row, rowIndex, slotProps);
            break;
          case 'End':
            this.onEndKey(event, row, rowIndex, slotProps);
            break;
          case 'Enter':
            this.onEnterKey(event, rowData, rowIndex);
            break;
          case 'Space':
            this.onSpaceKey(event, rowData, rowIndex, slotProps);
            break;
          case 'Tab':
            this.onTabKey(event, rowIndex);
            break;
          default:
            if (event.code === 'KeyA' && metaKey) {
              var data = this.dataToRender(slotProps.rows);
              this.$emit('update:selection', data);
            }
            break;
        }
      }
    },
    onArrowDownKey: function onArrowDownKey(event, row, rowIndex, slotProps) {
      var nextRow = this.findNextSelectableRow(row);
      nextRow && this.focusRowChange(row, nextRow);
      if (event.shiftKey) {
        var data = this.dataToRender(slotProps.rows);
        var nextRowIndex = rowIndex + 1 >= data.length ? data.length - 1 : rowIndex + 1;
        this.onRowClick({
          originalEvent: event,
          data: data[nextRowIndex],
          index: nextRowIndex
        });
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event, row, rowIndex, slotProps) {
      var prevRow = this.findPrevSelectableRow(row);
      prevRow && this.focusRowChange(row, prevRow);
      if (event.shiftKey) {
        var data = this.dataToRender(slotProps.rows);
        var prevRowIndex = rowIndex - 1 <= 0 ? 0 : rowIndex - 1;
        this.onRowClick({
          originalEvent: event,
          data: data[prevRowIndex],
          index: prevRowIndex
        });
      }
      event.preventDefault();
    },
    onHomeKey: function onHomeKey(event, row, rowIndex, slotProps) {
      var firstRow = this.findFirstSelectableRow();
      firstRow && this.focusRowChange(row, firstRow);
      if (event.ctrlKey && event.shiftKey) {
        var data = this.dataToRender(slotProps.rows);
        this.$emit('update:selection', data.slice(0, rowIndex + 1));
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event, row, rowIndex, slotProps) {
      var lastRow = this.findLastSelectableRow();
      lastRow && this.focusRowChange(row, lastRow);
      if (event.ctrlKey && event.shiftKey) {
        var data = this.dataToRender(slotProps.rows);
        this.$emit('update:selection', data.slice(rowIndex, data.length));
      }
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event, rowData, rowIndex) {
      this.onRowClick({
        originalEvent: event,
        data: rowData,
        index: rowIndex
      });
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event, rowData, rowIndex, slotProps) {
      this.onEnterKey(event, rowData, rowIndex);
      if (event.shiftKey && this.selection !== null) {
        var data = this.dataToRender(slotProps.rows);
        var index;
        if (this.selection.length > 0) {
          var firstSelectedRowIndex, lastSelectedRowIndex;
          firstSelectedRowIndex = utils.ObjectUtils.findIndexInList(this.selection[0], data);
          lastSelectedRowIndex = utils.ObjectUtils.findIndexInList(this.selection[this.selection.length - 1], data);
          index = rowIndex <= firstSelectedRowIndex ? lastSelectedRowIndex : firstSelectedRowIndex;
        } else {
          index = utils.ObjectUtils.findIndexInList(this.selection, data);
        }
        var _selection = index !== rowIndex ? data.slice(Math.min(index, rowIndex), Math.max(index, rowIndex) + 1) : rowData;
        this.$emit('update:selection', _selection);
      }
    },
    onTabKey: function onTabKey(event, rowIndex) {
      var body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
      var rows = utils.DomHandler.find(body, 'tr[data-p-selectable-row="true"]');
      if (event.code === 'Tab' && rows && rows.length > 0) {
        var firstSelectedRow = utils.DomHandler.findSingle(body, 'tr[data-p-highlight="true"]');
        var focusedItem = utils.DomHandler.findSingle(body, 'tr[data-p-selectable-row="true"][tabindex="0"]');
        if (firstSelectedRow) {
          firstSelectedRow.tabIndex = '0';
          focusedItem && focusedItem !== firstSelectedRow && (focusedItem.tabIndex = '-1');
        } else {
          rows[0].tabIndex = '0';
          focusedItem !== rows[0] && (rows[rowIndex].tabIndex = '-1');
        }
      }
    },
    findNextSelectableRow: function findNextSelectableRow(row) {
      var nextRow = row.nextElementSibling;
      if (nextRow) {
        if (utils.DomHandler.getAttribute(nextRow, 'data-p-selectable-row') === true) return nextRow;else return this.findNextSelectableRow(nextRow);
      } else {
        return null;
      }
    },
    findPrevSelectableRow: function findPrevSelectableRow(row) {
      var prevRow = row.previousElementSibling;
      if (prevRow) {
        if (utils.DomHandler.getAttribute(prevRow, 'data-p-selectable-row') === true) return prevRow;else return this.findPrevSelectableRow(prevRow);
      } else {
        return null;
      }
    },
    findFirstSelectableRow: function findFirstSelectableRow() {
      var firstRow = utils.DomHandler.findSingle(this.$refs.table, 'tr[data-p-selectable-row="true"]');
      return firstRow;
    },
    findLastSelectableRow: function findLastSelectableRow() {
      var rows = utils.DomHandler.find(this.$refs.table, 'tr[data-p-selectable-row="true"]');
      return rows ? rows[rows.length - 1] : null;
    },
    focusRowChange: function focusRowChange(firstFocusableRow, currentFocusedRow) {
      firstFocusableRow.tabIndex = '-1';
      currentFocusedRow.tabIndex = '0';
      utils.DomHandler.focus(currentFocusedRow);
    },
    toggleRowWithRadio: function toggleRowWithRadio(event) {
      var rowData = event.data;
      if (this.isSelected(rowData)) {
        this.$emit('update:selection', null);
        this.$emit('row-unselect', {
          originalEvent: event.originalEvent,
          data: rowData,
          index: event.index,
          type: 'radiobutton'
        });
      } else {
        this.$emit('update:selection', rowData);
        this.$emit('row-select', {
          originalEvent: event.originalEvent,
          data: rowData,
          index: event.index,
          type: 'radiobutton'
        });
      }
    },
    toggleRowWithCheckbox: function toggleRowWithCheckbox(event) {
      var rowData = event.data;
      if (this.isSelected(rowData)) {
        var selectionIndex = this.findIndexInSelection(rowData);
        var _selection = this.selection.filter(function (val, i) {
          return i != selectionIndex;
        });
        this.$emit('update:selection', _selection);
        this.$emit('row-unselect', {
          originalEvent: event.originalEvent,
          data: rowData,
          index: event.index,
          type: 'checkbox'
        });
      } else {
        var _selection5 = this.selection ? _toConsumableArray(this.selection) : [];
        _selection5 = [].concat(_toConsumableArray(_selection5), [rowData]);
        this.$emit('update:selection', _selection5);
        this.$emit('row-select', {
          originalEvent: event.originalEvent,
          data: rowData,
          index: event.index,
          type: 'checkbox'
        });
      }
    },
    toggleRowsWithCheckbox: function toggleRowsWithCheckbox(event) {
      if (this.selectAll !== null) {
        this.$emit('select-all-change', event);
      } else {
        var originalEvent = event.originalEvent,
          checked = event.checked;
        var _selection = [];
        if (checked) {
          _selection = this.frozenValue ? [].concat(_toConsumableArray(this.frozenValue), _toConsumableArray(this.processedData)) : this.processedData;
          this.$emit('row-select-all', {
            originalEvent: originalEvent,
            data: _selection
          });
        } else {
          this.$emit('row-unselect-all', {
            originalEvent: originalEvent
          });
        }
        this.$emit('update:selection', _selection);
      }
    },
    isSingleSelectionMode: function isSingleSelectionMode() {
      return this.selectionMode === 'single';
    },
    isMultipleSelectionMode: function isMultipleSelectionMode() {
      return this.selectionMode === 'multiple';
    },
    isSelected: function isSelected(rowData) {
      if (rowData && this.selection) {
        if (this.dataKey) {
          return this.d_selectionKeys ? this.d_selectionKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined : false;
        } else {
          if (this.selection instanceof Array) return this.findIndexInSelection(rowData) > -1;else return this.equals(rowData, this.selection);
        }
      }
      return false;
    },
    findIndexInSelection: function findIndexInSelection(rowData) {
      return this.findIndex(rowData, this.selection);
    },
    findIndex: function findIndex(rowData, collection) {
      var index = -1;
      if (collection && collection.length) {
        for (var i = 0; i < collection.length; i++) {
          if (this.equals(rowData, collection[i])) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    updateSelectionKeys: function updateSelectionKeys(selection) {
      this.d_selectionKeys = {};
      if (Array.isArray(selection)) {
        var _iterator2 = _createForOfIteratorHelper(selection),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var data = _step2.value;
            this.d_selectionKeys[String(utils.ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        this.d_selectionKeys[String(utils.ObjectUtils.resolveFieldData(selection, this.dataKey))] = 1;
      }
    },
    updateExpandedRowKeys: function updateExpandedRowKeys(expandedRows) {
      if (expandedRows && expandedRows.length) {
        this.d_expandedRowKeys = {};
        var _iterator3 = _createForOfIteratorHelper(expandedRows),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var data = _step3.value;
            this.d_expandedRowKeys[String(utils.ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else {
        this.d_expandedRowKeys = null;
      }
    },
    updateEditingRowKeys: function updateEditingRowKeys(editingRows) {
      if (editingRows && editingRows.length) {
        this.d_editingRowKeys = {};
        var _iterator4 = _createForOfIteratorHelper(editingRows),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var data = _step4.value;
            this.d_editingRowKeys[String(utils.ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else {
        this.d_editingRowKeys = null;
      }
    },
    equals: function equals(data1, data2) {
      return this.compareSelectionBy === 'equals' ? data1 === data2 : utils.ObjectUtils.equals(data1, data2, this.dataKey);
    },
    selectRange: function selectRange(event) {
      var rangeStart, rangeEnd;
      if (this.rangeRowIndex > this.anchorRowIndex) {
        rangeStart = this.anchorRowIndex;
        rangeEnd = this.rangeRowIndex;
      } else if (this.rangeRowIndex < this.anchorRowIndex) {
        rangeStart = this.rangeRowIndex;
        rangeEnd = this.anchorRowIndex;
      } else {
        rangeStart = this.rangeRowIndex;
        rangeEnd = this.rangeRowIndex;
      }
      if (this.lazy && this.paginator) {
        rangeStart -= this.first;
        rangeEnd -= this.first;
      }
      var value = this.processedData;
      var _selection = [];
      for (var i = rangeStart; i <= rangeEnd; i++) {
        var rangeRowData = value[i];
        _selection.push(rangeRowData);
        this.$emit('row-select', {
          originalEvent: event,
          data: rangeRowData,
          type: 'row'
        });
      }
      this.$emit('update:selection', _selection);
    },
    exportCSV: function exportCSV(options, data) {
      var _this4 = this;
      var csv = "\uFEFF";
      if (!data) {
        data = this.processedData;
        if (options && options.selectionOnly) data = this.selection || [];else if (this.frozenValue) data = data ? [].concat(_toConsumableArray(this.frozenValue), _toConsumableArray(data)) : this.frozenValue;
      }

      //headers
      var headerInitiated = false;
      for (var i = 0; i < this.columns.length; i++) {
        var column = this.columns[i];
        if (this.columnProp(column, 'exportable') !== false && this.columnProp(column, 'field')) {
          if (headerInitiated) csv += this.csvSeparator;else headerInitiated = true;
          csv += '"' + (this.columnProp(column, 'exportHeader') || this.columnProp(column, 'header') || this.columnProp(column, 'field')) + '"';
        }
      }

      //body
      if (data) {
        data.forEach(function (record) {
          csv += '\n';
          var rowInitiated = false;
          for (var _i = 0; _i < _this4.columns.length; _i++) {
            var _column = _this4.columns[_i];
            if (_this4.columnProp(_column, 'exportable') !== false && _this4.columnProp(_column, 'field')) {
              if (rowInitiated) csv += _this4.csvSeparator;else rowInitiated = true;
              var cellData = utils.ObjectUtils.resolveFieldData(record, _this4.columnProp(_column, 'field'));
              if (cellData != null) {
                if (_this4.exportFunction) {
                  cellData = _this4.exportFunction({
                    data: cellData,
                    field: _this4.columnProp(_column, 'field')
                  });
                } else cellData = String(cellData).replace(/"/g, '""');
              } else cellData = '';
              csv += '"' + cellData + '"';
            }
          }
        });
      }

      //footers
      var footerInitiated = false;
      for (var _i2 = 0; _i2 < this.columns.length; _i2++) {
        var _column2 = this.columns[_i2];
        if (_i2 === 0) csv += '\n';
        if (this.columnProp(_column2, 'exportable') !== false && this.columnProp(_column2, 'exportFooter')) {
          if (footerInitiated) csv += this.csvSeparator;else footerInitiated = true;
          csv += '"' + (this.columnProp(_column2, 'exportFooter') || this.columnProp(_column2, 'footer') || this.columnProp(_column2, 'field')) + '"';
        }
      }
      utils.DomHandler.exportCSV(csv, this.exportFilename);
    },
    resetPage: function resetPage() {
      this.d_first = 0;
      this.$emit('update:first', this.d_first);
    },
    onColumnResizeStart: function onColumnResizeStart(event) {
      var containerLeft = utils.DomHandler.getOffset(this.$el).left;
      this.resizeColumnElement = event.target.parentElement;
      this.columnResizing = true;
      this.lastResizeHelperX = event.pageX - containerLeft + this.$el.scrollLeft;
      this.bindColumnResizeEvents();
    },
    onColumnResize: function onColumnResize(event) {
      var containerLeft = utils.DomHandler.getOffset(this.$el).left;
      this.$el.setAttribute('data-p-unselectable-text', 'true');
      !this.isUnstyled && utils.DomHandler.addClass(this.$el, 'p-unselectable-text');
      this.$refs.resizeHelper.style.height = this.$el.offsetHeight + 'px';
      this.$refs.resizeHelper.style.top = 0 + 'px';
      this.$refs.resizeHelper.style.left = event.pageX - containerLeft + this.$el.scrollLeft + 'px';
      this.$refs.resizeHelper.style.display = 'block';
    },
    onColumnResizeEnd: function onColumnResizeEnd() {
      var delta = this.$refs.resizeHelper.offsetLeft - this.lastResizeHelperX;
      var columnWidth = this.resizeColumnElement.offsetWidth;
      var newColumnWidth = columnWidth + delta;
      var minWidth = this.resizeColumnElement.style.minWidth || 15;
      if (columnWidth + delta > parseInt(minWidth, 10)) {
        if (this.columnResizeMode === 'fit') {
          var nextColumn = this.resizeColumnElement.nextElementSibling;
          var nextColumnWidth = nextColumn.offsetWidth - delta;
          if (newColumnWidth > 15 && nextColumnWidth > 15) {
            this.resizeTableCells(newColumnWidth, nextColumnWidth);
          }
        } else if (this.columnResizeMode === 'expand') {
          var tableWidth = this.$refs.table.offsetWidth + delta + 'px';
          var updateTableWidth = function updateTableWidth(el) {
            !!el && (el.style.width = el.style.minWidth = tableWidth);
          };
          updateTableWidth(this.$refs.table);
          if (!this.virtualScrollerDisabled) {
            var body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
            var frozenBody = this.$refs.frozenBodyRef && this.$refs.frozenBodyRef.$el;
            updateTableWidth(body);
            updateTableWidth(frozenBody);
          }
          this.resizeTableCells(newColumnWidth);
        }
        this.$emit('column-resize-end', {
          element: this.resizeColumnElement,
          delta: delta
        });
      }
      this.$refs.resizeHelper.style.display = 'none';
      this.resizeColumn = null;
      this.$el.setAttribute('data-p-unselectable-text', 'true');
      !this.isUnstyled && utils.DomHandler.removeClass(this.$el, 'p-unselectable-text');
      this.unbindColumnResizeEvents();
      if (this.isStateful()) {
        this.saveState();
      }
    },
    resizeTableCells: function resizeTableCells(newColumnWidth, nextColumnWidth) {
      var colIndex = utils.DomHandler.index(this.resizeColumnElement);
      var widths = [];
      var headers = utils.DomHandler.find(this.$refs.table, 'thead[data-pc-section="thead"] > tr > th');
      headers.forEach(function (header) {
        return widths.push(utils.DomHandler.getOuterWidth(header));
      });
      this.destroyStyleElement();
      this.createStyleElement();
      var innerHTML = '';
      var selector = "[data-pc-name=\"datatable\"][".concat(this.attributeSelector, "] > [data-pc-section=\"wrapper\"] ").concat(this.virtualScrollerDisabled ? '' : '> [data-pc-section="virtualscroller"]', " > table[data-pc-section=\"table\"]");
      widths.forEach(function (width, index) {
        var colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
        var style = "width: ".concat(colWidth, "px !important; max-width: ").concat(colWidth, "px !important");
        innerHTML += "\n                    ".concat(selector, " > thead[data-pc-section=\"thead\"] > tr > th:nth-child(").concat(index + 1, "),\n                    ").concat(selector, " > tbody[data-pc-section=\"tbody\"] > tr > td:nth-child(").concat(index + 1, "),\n                    ").concat(selector, " > tfoot[data-pc-section=\"tfoot\"] > tr > td:nth-child(").concat(index + 1, ") {\n                        ").concat(style, "\n                    }\n                ");
      });
      this.styleElement.innerHTML = innerHTML;
    },
    bindColumnResizeEvents: function bindColumnResizeEvents() {
      var _this5 = this;
      if (!this.documentColumnResizeListener) {
        this.documentColumnResizeListener = document.addEventListener('mousemove', function () {
          if (_this5.columnResizing) {
            _this5.onColumnResize(event);
          }
        });
      }
      if (!this.documentColumnResizeEndListener) {
        this.documentColumnResizeEndListener = document.addEventListener('mouseup', function () {
          if (_this5.columnResizing) {
            _this5.columnResizing = false;
            _this5.onColumnResizeEnd();
          }
        });
      }
    },
    unbindColumnResizeEvents: function unbindColumnResizeEvents() {
      if (this.documentColumnResizeListener) {
        document.removeEventListener('document', this.documentColumnResizeListener);
        this.documentColumnResizeListener = null;
      }
      if (this.documentColumnResizeEndListener) {
        document.removeEventListener('document', this.documentColumnResizeEndListener);
        this.documentColumnResizeEndListener = null;
      }
    },
    onColumnHeaderMouseDown: function onColumnHeaderMouseDown(e) {
      var event = e.originalEvent;
      var column = e.column;
      if (this.reorderableColumns && this.columnProp(column, 'reorderableColumn') !== false) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || utils.DomHandler.getAttribute(event.target, '[data-pc-section="columnresizer"]')) event.currentTarget.draggable = false;else event.currentTarget.draggable = true;
      }
    },
    onColumnHeaderDragStart: function onColumnHeaderDragStart(event) {
      if (this.columnResizing) {
        event.preventDefault();
        return;
      }
      this.colReorderIconWidth = utils.DomHandler.getHiddenElementOuterWidth(this.$refs.reorderIndicatorUp);
      this.colReorderIconHeight = utils.DomHandler.getHiddenElementOuterHeight(this.$refs.reorderIndicatorUp);
      this.draggedColumn = this.findParentHeader(event.target);
      event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    },
    onColumnHeaderDragOver: function onColumnHeaderDragOver(event) {
      var dropHeader = this.findParentHeader(event.target);
      if (this.reorderableColumns && this.draggedColumn && dropHeader) {
        event.preventDefault();
        var containerOffset = utils.DomHandler.getOffset(this.$el);
        var dropHeaderOffset = utils.DomHandler.getOffset(dropHeader);
        if (this.draggedColumn !== dropHeader) {
          var targetLeft = dropHeaderOffset.left - containerOffset.left;
          var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
          this.$refs.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.colReorderIconHeight - 1) + 'px';
          this.$refs.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
          if (event.pageX > columnCenter) {
            this.$refs.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.$refs.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.dropPosition = 1;
          } else {
            this.$refs.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.$refs.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.dropPosition = -1;
          }
          this.$refs.reorderIndicatorUp.style.display = 'block';
          this.$refs.reorderIndicatorDown.style.display = 'block';
        }
      }
    },
    onColumnHeaderDragLeave: function onColumnHeaderDragLeave(event) {
      if (this.reorderableColumns && this.draggedColumn) {
        event.preventDefault();
        this.$refs.reorderIndicatorUp.style.display = 'none';
        this.$refs.reorderIndicatorDown.style.display = 'none';
      }
    },
    onColumnHeaderDrop: function onColumnHeaderDrop(event) {
      event.preventDefault();
      if (this.draggedColumn) {
        var dragIndex = utils.DomHandler.index(this.draggedColumn);
        var dropIndex = utils.DomHandler.index(this.findParentHeader(event.target));
        var allowDrop = dragIndex !== dropIndex;
        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
          allowDrop = false;
        }
        if (allowDrop) {
          utils.ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
          this.updateReorderableColumns();
          this.$emit('column-reorder', {
            originalEvent: event,
            dragIndex: dragIndex,
            dropIndex: dropIndex
          });
        }
        this.$refs.reorderIndicatorUp.style.display = 'none';
        this.$refs.reorderIndicatorDown.style.display = 'none';
        this.draggedColumn.draggable = false;
        this.draggedColumn = null;
        this.dropPosition = null;
      }
    },
    findParentHeader: function findParentHeader(element) {
      if (element.nodeName === 'TH') {
        return element;
      } else {
        var parent = element.parentElement;
        while (parent.nodeName !== 'TH') {
          parent = parent.parentElement;
          if (!parent) break;
        }
        return parent;
      }
    },
    findColumnByKey: function findColumnByKey(columns, key) {
      if (columns && columns.length) {
        for (var i = 0; i < columns.length; i++) {
          var column = columns[i];
          if (this.columnProp(column, 'columnKey') === key || this.columnProp(column, 'field') === key) {
            return column;
          }
        }
      }
      return null;
    },
    onRowMouseDown: function onRowMouseDown(event) {
      if (utils.DomHandler.getAttribute(event.target, 'data-pc-section') === 'rowreordericon') event.currentTarget.draggable = true;else event.currentTarget.draggable = false;
    },
    onRowDragStart: function onRowDragStart(e) {
      var event = e.originalEvent;
      var index = e.index;
      this.rowDragging = true;
      this.draggedRowIndex = index;
      event.dataTransfer.setData('text', 'b'); // For firefox
    },
    onRowDragOver: function onRowDragOver(e) {
      var event = e.originalEvent;
      var index = e.index;
      if (this.rowDragging && this.draggedRowIndex !== index) {
        var rowElement = event.currentTarget;
        var rowY = utils.DomHandler.getOffset(rowElement).top + utils.DomHandler.getWindowScrollTop();
        var pageY = event.pageY;
        var rowMidY = rowY + utils.DomHandler.getOuterHeight(rowElement) / 2;
        var prevRowElement = rowElement.previousElementSibling;
        if (pageY < rowMidY) {
          rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
          !this.isUnstyled && utils.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
          this.droppedRowIndex = index;
          if (prevRowElement) {
            prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'true');
            !this.isUnstyled && utils.DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
          } else {
            rowElement.setAttribute('data-p-datatable-dragpoint-top', 'true');
            !this.isUnstyled && utils.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          }
        } else {
          if (prevRowElement) {
            prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
            !this.isUnstyled && utils.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
          } else {
            rowElement.setAttribute('data-p-datatable-dragpoint-top', 'true');
            !this.isUnstyled && utils.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          }
          this.droppedRowIndex = index + 1;
          rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'true');
          !this.isUnstyled && utils.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
        }
        event.preventDefault();
      }
    },
    onRowDragLeave: function onRowDragLeave(event) {
      var rowElement = event.currentTarget;
      var prevRowElement = rowElement.previousElementSibling;
      if (prevRowElement) {
        prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
        !this.isUnstyled && utils.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
      }
      rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
      !this.isUnstyled && utils.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
      rowElement.setAttribute('data-p-datatable-dragpoint-top', 'false');
      !this.isUnstyled && utils.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    },
    onRowDragEnd: function onRowDragEnd(event) {
      this.rowDragging = false;
      this.draggedRowIndex = null;
      this.droppedRowIndex = null;
      event.currentTarget.draggable = false;
    },
    onRowDrop: function onRowDrop(event) {
      if (this.droppedRowIndex != null) {
        var dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
        var processedData = _toConsumableArray(this.processedData);
        utils.ObjectUtils.reorderArray(processedData, this.draggedRowIndex + this.d_first, dropIndex + this.d_first);
        this.$emit('row-reorder', {
          originalEvent: event,
          dragIndex: this.draggedRowIndex,
          dropIndex: dropIndex,
          value: processedData
        });
      }

      //cleanup
      this.onRowDragLeave(event);
      this.onRowDragEnd(event);
      event.preventDefault();
    },
    toggleRow: function toggleRow(event) {
      var rowData = event.data;
      var expanded;
      var expandedRowIndex;
      var _expandedRows = this.expandedRows ? _toConsumableArray(this.expandedRows) : [];
      if (this.dataKey) {
        expanded = this.d_expandedRowKeys ? this.d_expandedRowKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined : false;
      } else {
        expandedRowIndex = this.findIndex(rowData, this.expandedRows);
        expanded = expandedRowIndex > -1;
      }
      if (expanded) {
        if (expandedRowIndex == null) {
          expandedRowIndex = this.findIndex(rowData, this.expandedRows);
        }
        _expandedRows.splice(expandedRowIndex, 1);
        this.$emit('update:expandedRows', _expandedRows);
        this.$emit('row-collapse', event);
      } else {
        _expandedRows.push(rowData);
        this.$emit('update:expandedRows', _expandedRows);
        this.$emit('row-expand', event);
      }
    },
    toggleRowGroup: function toggleRowGroup(e) {
      var event = e.originalEvent;
      var data = e.data;
      var groupFieldValue = utils.ObjectUtils.resolveFieldData(data, this.groupRowsBy);
      var _expandedRowGroups = this.expandedRowGroups ? _toConsumableArray(this.expandedRowGroups) : [];
      if (this.isRowGroupExpanded(data)) {
        _expandedRowGroups = _expandedRowGroups.filter(function (group) {
          return group !== groupFieldValue;
        });
        this.$emit('update:expandedRowGroups', _expandedRowGroups);
        this.$emit('rowgroup-collapse', {
          originalEvent: event,
          data: groupFieldValue
        });
      } else {
        _expandedRowGroups.push(groupFieldValue);
        this.$emit('update:expandedRowGroups', _expandedRowGroups);
        this.$emit('rowgroup-expand', {
          originalEvent: event,
          data: groupFieldValue
        });
      }
    },
    isRowGroupExpanded: function isRowGroupExpanded(rowData) {
      if (this.expandableRowGroups && this.expandedRowGroups) {
        var groupFieldValue = utils.ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
        return this.expandedRowGroups.indexOf(groupFieldValue) > -1;
      }
      return false;
    },
    isStateful: function isStateful() {
      return this.stateKey != null;
    },
    getStorage: function getStorage() {
      switch (this.stateStorage) {
        case 'local':
          return window.localStorage;
        case 'session':
          return window.sessionStorage;
        default:
          throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
      }
    },
    saveState: function saveState() {
      var storage = this.getStorage();
      var state = {};
      if (this.paginator) {
        state.first = this.d_first;
        state.rows = this.d_rows;
      }
      if (this.d_sortField) {
        state.sortField = this.d_sortField;
        state.sortOrder = this.d_sortOrder;
      }
      if (this.d_multiSortMeta) {
        state.multiSortMeta = this.d_multiSortMeta;
      }
      if (this.hasFilters) {
        state.filters = this.filters;
      }
      if (this.resizableColumns) {
        this.saveColumnWidths(state);
      }
      if (this.reorderableColumns) {
        state.columnOrder = this.d_columnOrder;
      }
      if (this.expandedRows) {
        state.expandedRows = this.expandedRows;
        state.expandedRowKeys = this.d_expandedRowKeys;
      }
      if (this.expandedRowGroups) {
        state.expandedRowGroups = this.expandedRowGroups;
      }
      if (this.selection) {
        state.selection = this.selection;
        state.selectionKeys = this.d_selectionKeys;
      }
      if (Object.keys(state).length) {
        storage.setItem(this.stateKey, JSON.stringify(state));
      }
      this.$emit('state-save', state);
    },
    restoreState: function restoreState() {
      var storage = this.getStorage();
      var stateString = storage.getItem(this.stateKey);
      var dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
      var reviver = function reviver(key, value) {
        if (typeof value === 'string' && dateFormat.test(value)) {
          return new Date(value);
        }
        return value;
      };
      if (stateString) {
        var restoredState = JSON.parse(stateString, reviver);
        if (this.paginator) {
          this.d_first = restoredState.first;
          this.d_rows = restoredState.rows;
        }
        if (restoredState.sortField) {
          this.d_sortField = restoredState.sortField;
          this.d_sortOrder = restoredState.sortOrder;
        }
        if (restoredState.multiSortMeta) {
          this.d_multiSortMeta = restoredState.multiSortMeta;
        }
        if (restoredState.filters) {
          this.$emit('update:filters', restoredState.filters);
        }
        if (this.resizableColumns) {
          this.columnWidthsState = restoredState.columnWidths;
          this.tableWidthState = restoredState.tableWidth;
        }
        if (this.reorderableColumns) {
          this.d_columnOrder = restoredState.columnOrder;
        }
        if (restoredState.expandedRows) {
          this.d_expandedRowKeys = restoredState.expandedRowKeys;
          this.$emit('update:expandedRows', restoredState.expandedRows);
        }
        if (restoredState.expandedRowGroups) {
          this.$emit('update:expandedRowGroups', restoredState.expandedRowGroups);
        }
        if (restoredState.selection) {
          this.d_selectionKeys = restoredState.d_selectionKeys;
          this.$emit('update:selection', restoredState.selection);
        }
        this.$emit('state-restore', restoredState);
      }
    },
    saveColumnWidths: function saveColumnWidths(state) {
      var widths = [];
      var headers = utils.DomHandler.find(this.$el, 'thead[data-pc-section="thead"] > tr > th');
      headers.forEach(function (header) {
        return widths.push(utils.DomHandler.getOuterWidth(header));
      });
      state.columnWidths = widths.join(',');
      if (this.columnResizeMode === 'expand') {
        state.tableWidth = utils.DomHandler.getOuterWidth(this.$refs.table) + 'px';
      }
    },
    restoreColumnWidths: function restoreColumnWidths() {
      if (this.columnWidthsState) {
        var widths = this.columnWidthsState.split(',');
        if (this.columnResizeMode === 'expand' && this.tableWidthState) {
          this.$refs.table.style.width = this.tableWidthState;
          this.$refs.table.style.minWidth = this.tableWidthState;
          this.$el.style.width = this.tableWidthState;
        }
        if (utils.ObjectUtils.isNotEmpty(widths)) {
          this.createStyleElement();
          var innerHTML = '';
          var selector = "[data-pc-name=\"datatable\"][".concat(this.attributeSelector, "] > [data-pc-section=\"wrapper\"] ").concat(this.virtualScrollerDisabled ? '' : '> [data-pc-section="virtualscroller"]', " > table[data-pc-section=\"table\"]");
          widths.forEach(function (width, index) {
            var style = "width: ".concat(width, "px !important; max-width: ").concat(width, "px !important");
            innerHTML += "\n                            ".concat(selector, " > thead[data-pc-section=\"thead\"] > tr > th:nth-child(").concat(index + 1, "),\n                            ").concat(selector, " > tbody[data-pc-section=\"tbody\"] > tr > td:nth-child(").concat(index + 1, "),\n                            ").concat(selector, " > tfoot[data-pc-section=\"tfoot\"] > tr > td:nth-child(").concat(index + 1, ") {\n                                ").concat(style, "\n                            }\n                        ");
          });
          this.styleElement.innerHTML = innerHTML;
        }
      }
    },
    onCellEditInit: function onCellEditInit(event) {
      this.$emit('cell-edit-init', event);
    },
    onCellEditComplete: function onCellEditComplete(event) {
      this.$emit('cell-edit-complete', event);
    },
    onCellEditCancel: function onCellEditCancel(event) {
      this.$emit('cell-edit-cancel', event);
    },
    onRowEditInit: function onRowEditInit(event) {
      var _editingRows = this.editingRows ? _toConsumableArray(this.editingRows) : [];
      _editingRows.push(event.data);
      this.$emit('update:editingRows', _editingRows);
      this.$emit('row-edit-init', event);
    },
    onRowEditSave: function onRowEditSave(event) {
      var _editingRows = _toConsumableArray(this.editingRows);
      _editingRows.splice(this.findIndex(event.data, _editingRows), 1);
      this.$emit('update:editingRows', _editingRows);
      this.$emit('row-edit-save', event);
    },
    onRowEditCancel: function onRowEditCancel(event) {
      var _editingRows = _toConsumableArray(this.editingRows);
      _editingRows.splice(this.findIndex(event.data, _editingRows), 1);
      this.$emit('update:editingRows', _editingRows);
      this.$emit('row-edit-cancel', event);
    },
    onEditingMetaChange: function onEditingMetaChange(event) {
      var data = event.data,
        field = event.field,
        index = event.index,
        editing = event.editing;
      var editingMeta = _objectSpread$1({}, this.d_editingMeta);
      var meta = editingMeta[index];
      if (editing) {
        !meta && (meta = editingMeta[index] = {
          data: _objectSpread$1({}, data),
          fields: []
        });
        meta['fields'].push(field);
      } else if (meta) {
        var fields = meta['fields'].filter(function (f) {
          return f !== field;
        });
        !fields.length ? delete editingMeta[index] : meta['fields'] = fields;
      }
      this.d_editingMeta = editingMeta;
    },
    clearEditingMetaData: function clearEditingMetaData() {
      if (this.editMode) {
        this.d_editingMeta = {};
      }
    },
    createLazyLoadEvent: function createLazyLoadEvent(event) {
      return {
        originalEvent: event,
        first: this.d_first,
        rows: this.d_rows,
        sortField: this.d_sortField,
        sortOrder: this.d_sortOrder,
        multiSortMeta: this.d_multiSortMeta,
        filters: this.d_filters
      };
    },
    hasGlobalFilter: function hasGlobalFilter() {
      return this.filters && Object.prototype.hasOwnProperty.call(this.filters, 'global');
    },
    getChildren: function getChildren() {
      return this.$slots["default"] ? this.$slots["default"]() : null;
    },
    onFilterChange: function onFilterChange(filters) {
      this.d_filters = filters;
    },
    onFilterApply: function onFilterApply() {
      this.d_first = 0;
      this.$emit('update:first', this.d_first);
      this.$emit('update:filters', this.d_filters);
      if (this.lazy) {
        this.$emit('filter', this.createLazyLoadEvent());
      }
    },
    cloneFilters: function cloneFilters() {
      var cloned = {};
      if (this.filters) {
        Object.entries(this.filters).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            prop = _ref2[0],
            value = _ref2[1];
          cloned[prop] = value.operator ? {
            operator: value.operator,
            constraints: value.constraints.map(function (constraint) {
              return _objectSpread$1({}, constraint);
            })
          } : _objectSpread$1({}, value);
        });
      }
      return cloned;
    },
    updateReorderableColumns: function updateReorderableColumns() {
      var _this6 = this;
      var columnOrder = [];
      this.columns.forEach(function (col) {
        return columnOrder.push(_this6.columnProp(col, 'columnKey') || _this6.columnProp(col, 'field'));
      });
      this.d_columnOrder = columnOrder;
    },
    createStyleElement: function createStyleElement() {
      this.styleElement = document.createElement('style');
      this.styleElement.type = 'text/css';
      document.head.appendChild(this.styleElement);
    },
    createResponsiveStyle: function createResponsiveStyle() {
      if (!this.responsiveStyleElement) {
        this.responsiveStyleElement = document.createElement('style');
        this.responsiveStyleElement.type = 'text/css';
        document.head.appendChild(this.responsiveStyleElement);
        var tableSelector = ".p-datatable-wrapper ".concat(this.virtualScrollerDisabled ? '' : '> .p-virtualscroller', " > .p-datatable-table");
        var selector = ".p-datatable[".concat(this.attributeSelector, "] > ").concat(tableSelector);
        var gridLinesSelector = ".p-datatable[".concat(this.attributeSelector, "].p-datatable-gridlines > ").concat(tableSelector);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    ").concat(selector, " > .p-datatable-thead > tr > th,\n    ").concat(selector, " > .p-datatable-tfoot > tr > td {\n        display: none !important;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td {\n        display: flex;\n        width: 100% !important;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td:not(:last-child) {\n        border: 0 none;\n    }\n\n    ").concat(gridLinesSelector, " > .p-datatable-tbody > tr > td:last-child {\n        border-top: 0;\n        border-right: 0;\n        border-left: 0;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td > .p-column-title {\n        display: block;\n    }\n}\n");
        this.responsiveStyleElement.innerHTML = innerHTML;
      }
    },
    destroyResponsiveStyle: function destroyResponsiveStyle() {
      if (this.responsiveStyleElement) {
        document.head.removeChild(this.responsiveStyleElement);
        this.responsiveStyleElement = null;
      }
    },
    destroyStyleElement: function destroyStyleElement() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    recursiveGetChildren: function recursiveGetChildren(children, results) {
      var _this7 = this;
      if (!results) {
        results = [];
      }
      if (children && children.length) {
        children.forEach(function (child) {
          if (child.children instanceof Array) {
            results.concat(_this7.recursiveGetChildren(child.children, results));
          } else if (child.type.name == 'Column') {
            results.push(child);
          }
        });
      }
      return results;
    },
    dataToRender: function dataToRender(data) {
      var _data = data || this.processedData;
      if (_data && this.paginator) {
        var first = this.lazy ? 0 : this.d_first;
        return _data.slice(first, first + this.d_rows);
      }
      return _data;
    },
    getVirtualScrollerRef: function getVirtualScrollerRef() {
      return this.$refs.virtualScroller;
    },
    hasSpacerStyle: function hasSpacerStyle(style) {
      return utils.ObjectUtils.isNotEmpty(style);
    }
  },
  computed: {
    columns: function columns() {
      var children = this.getChildren();
      if (!children) {
        return;
      }
      var cols = this.recursiveGetChildren(children, []);
      if (this.reorderableColumns && this.d_columnOrder) {
        var orderedColumns = [];
        var _iterator5 = _createForOfIteratorHelper(this.d_columnOrder),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var columnKey = _step5.value;
            var column = this.findColumnByKey(cols, columnKey);
            if (column && !this.columnProp(column, 'hidden')) {
              orderedColumns.push(column);
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        return [].concat(orderedColumns, _toConsumableArray(cols.filter(function (item) {
          return orderedColumns.indexOf(item) < 0;
        })));
      }
      return cols;
    },
    headerColumnGroup: function headerColumnGroup() {
      var children = this.getChildren();
      if (children) {
        var _iterator6 = _createForOfIteratorHelper(children),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var child = _step6.value;
            if (child.type.name === 'ColumnGroup' && this.columnProp(child, 'type') === 'header') {
              return child;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
      return null;
    },
    footerColumnGroup: function footerColumnGroup() {
      var children = this.getChildren();
      if (children) {
        var _iterator7 = _createForOfIteratorHelper(children),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var child = _step7.value;
            if (child.type.name === 'ColumnGroup' && this.columnProp(child, 'type') === 'footer') {
              return child;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
      return null;
    },
    hasFilters: function hasFilters() {
      return this.filters && Object.keys(this.filters).length > 0 && this.filters.constructor === Object;
    },
    processedData: function processedData() {
      var data = this.value || [];
      if (!this.lazy) {
        if (data && data.length) {
          if (this.hasFilters) {
            data = this.filter(data);
          }
          if (this.sorted) {
            if (this.sortMode === 'single') data = this.sortSingle(data);else if (this.sortMode === 'multiple') data = this.sortMultiple(data);
          }
        }
      }
      return data;
    },
    totalRecordsLength: function totalRecordsLength() {
      if (this.lazy) {
        return this.totalRecords;
      } else {
        var data = this.processedData;
        return data ? data.length : 0;
      }
    },
    empty: function empty() {
      var data = this.processedData;
      return !data || data.length === 0;
    },
    paginatorTop: function paginatorTop() {
      return this.paginator && (this.paginatorPosition !== 'bottom' || this.paginatorPosition === 'both');
    },
    paginatorBottom: function paginatorBottom() {
      return this.paginator && (this.paginatorPosition !== 'top' || this.paginatorPosition === 'both');
    },
    sorted: function sorted() {
      return this.d_sortField || this.d_multiSortMeta && this.d_multiSortMeta.length > 0;
    },
    allRowsSelected: function allRowsSelected() {
      var _this8 = this;
      if (this.selectAll !== null) {
        return this.selectAll;
      } else {
        var val = this.frozenValue ? [].concat(_toConsumableArray(this.frozenValue), _toConsumableArray(this.processedData)) : this.processedData;
        return utils.ObjectUtils.isNotEmpty(val) && this.selection && Array.isArray(this.selection) && val.every(function (v) {
          return _this8.selection.some(function (s) {
            return _this8.equals(s, v);
          });
        });
      }
    },
    attributeSelector: function attributeSelector() {
      return utils.UniqueComponentId();
    },
    groupRowSortField: function groupRowSortField() {
      return this.sortMode === 'single' ? this.sortField : this.d_groupRowsSortMeta ? this.d_groupRowsSortMeta.field : null;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return utils.ObjectUtils.isEmpty(this.virtualScrollerOptions) || !this.scrollable;
    }
  },
  components: {
    DTPaginator: Paginator__default["default"],
    DTTableHeader: script$1,
    DTTableBody: script$7,
    DTTableFooter: script$5,
    DTVirtualScroller: VirtualScroller__default["default"],
    ArrowDownIcon: ArrowDownIcon__default["default"],
    ArrowUpIcon: ArrowUpIcon__default["default"],
    SpinnerIcon: SpinnerIcon__default["default"]
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
  var _component_DTPaginator = vue.resolveComponent("DTPaginator");
  var _component_DTTableHeader = vue.resolveComponent("DTTableHeader");
  var _component_DTTableBody = vue.resolveComponent("DTTableBody");
  var _component_DTTableFooter = vue.resolveComponent("DTTableFooter");
  var _component_DTVirtualScroller = vue.resolveComponent("DTVirtualScroller");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    "data-scrollselectors": ".p-datatable-wrapper"
  }, _ctx.ptm('root'), {
    "data-pc-name": "datatable"
  }), [vue.renderSlot(_ctx.$slots, "default"), _ctx.loading ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('loadingOverlay')
  }, _ctx.ptm('loadingOverlay')), [_ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", {
    key: 0
  }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, [_ctx.$slots.loadingicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.loadingicon), {
    key: 0,
    "class": vue.normalizeClass(_ctx.cx('loadingIcon'))
  }, null, 8, ["class"])) : _ctx.loadingIcon ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
    key: 1,
    "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon]
  }, _ctx.ptm('loadingIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
    key: 2,
    spin: "",
    "class": _ctx.cx('loadingIcon')
  }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))], 64))], 16)) : vue.createCommentVNode("", true), _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header")], 16)) : vue.createCommentVNode("", true), $options.paginatorTop ? (vue.openBlock(), vue.createBlock(_component_DTPaginator, {
    key: 2,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": vue.normalizeClass(_ctx.cx('paginator')),
    onPage: _cache[0] || (_cache[0] = function ($event) {
      return $options.onPage($event);
    }),
    alwaysShow: _ctx.alwaysShowPaginator,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('paginator')
  }, vue.createSlots({
    _: 2
  }, [_ctx.$slots.paginatorstart ? {
    name: "start",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "0"
  } : undefined, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "1"
  } : undefined, _ctx.$slots.paginatorfirstpagelinkicon ? {
    name: "firstpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon")];
    }),
    key: "2"
  } : undefined, _ctx.$slots.paginatorprevpagelinkicon ? {
    name: "prevpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorprevpagelinkicon")];
    }),
    key: "3"
  } : undefined, _ctx.$slots.paginatornextpagelinkicon ? {
    name: "nextpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatornextpagelinkicon")];
    }),
    key: "4"
  } : undefined, _ctx.$slots.paginatorlastpagelinkicon ? {
    name: "lastpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorlastpagelinkicon")];
    }),
    key: "5"
  } : undefined]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('wrapper'),
    style: [_ctx.sx('wrapper'), {
      maxHeight: $options.virtualScrollerDisabled ? _ctx.scrollHeight : ''
    }]
  }, _ctx.ptm('wrapper')), [vue.createVNode(_component_DTVirtualScroller, vue.mergeProps({
    ref: "virtualScroller"
  }, _ctx.virtualScrollerOptions, {
    items: $options.processedData,
    columns: $options.columns,
    style: _ctx.scrollHeight !== 'flex' ? {
      height: _ctx.scrollHeight
    } : undefined,
    scrollHeight: _ctx.scrollHeight !== 'flex' ? undefined : '100%',
    disabled: $options.virtualScrollerDisabled,
    loaderDisabled: "",
    inline: "",
    autoSize: "",
    showSpacer: false,
    pt: _ctx.ptm('virtualScroller')
  }), {
    content: vue.withCtx(function (slotProps) {
      return [vue.createElementVNode("table", vue.mergeProps({
        ref: "table",
        role: "table",
        "class": [_ctx.cx('table'), _ctx.tableClass],
        style: [_ctx.tableStyle, slotProps.spacerStyle]
      }, _objectSpread(_objectSpread({}, _ctx.tableProps), _ctx.ptm('table'))), [vue.createVNode(_component_DTTableHeader, {
        columnGroup: $options.headerColumnGroup,
        columns: slotProps.columns,
        rowGroupMode: _ctx.rowGroupMode,
        groupRowsBy: _ctx.groupRowsBy,
        groupRowSortField: $options.groupRowSortField,
        reorderableColumns: _ctx.reorderableColumns,
        resizableColumns: _ctx.resizableColumns,
        allRowsSelected: $options.allRowsSelected,
        empty: $options.empty,
        sortMode: _ctx.sortMode,
        sortField: $data.d_sortField,
        sortOrder: $data.d_sortOrder,
        multiSortMeta: $data.d_multiSortMeta,
        filters: $data.d_filters,
        filtersStore: _ctx.filters,
        filterDisplay: _ctx.filterDisplay,
        filterInputProps: _ctx.filterInputProps,
        headerCheckboxIconTemplate: _ctx.$slots.headercheckboxicon,
        onColumnClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.onColumnHeaderClick($event);
        }),
        onColumnMousedown: _cache[2] || (_cache[2] = function ($event) {
          return $options.onColumnHeaderMouseDown($event);
        }),
        onFilterChange: $options.onFilterChange,
        onFilterApply: $options.onFilterApply,
        onColumnDragstart: _cache[3] || (_cache[3] = function ($event) {
          return $options.onColumnHeaderDragStart($event);
        }),
        onColumnDragover: _cache[4] || (_cache[4] = function ($event) {
          return $options.onColumnHeaderDragOver($event);
        }),
        onColumnDragleave: _cache[5] || (_cache[5] = function ($event) {
          return $options.onColumnHeaderDragLeave($event);
        }),
        onColumnDrop: _cache[6] || (_cache[6] = function ($event) {
          return $options.onColumnHeaderDrop($event);
        }),
        onColumnResizestart: _cache[7] || (_cache[7] = function ($event) {
          return $options.onColumnResizeStart($event);
        }),
        onCheckboxChange: _cache[8] || (_cache[8] = function ($event) {
          return $options.toggleRowsWithCheckbox($event);
        }),
        unstyled: _ctx.unstyled,
        pt: _ctx.pt
      }, null, 8, ["columnGroup", "columns", "rowGroupMode", "groupRowsBy", "groupRowSortField", "reorderableColumns", "resizableColumns", "allRowsSelected", "empty", "sortMode", "sortField", "sortOrder", "multiSortMeta", "filters", "filtersStore", "filterDisplay", "filterInputProps", "headerCheckboxIconTemplate", "onFilterChange", "onFilterApply", "unstyled", "pt"]), _ctx.frozenValue ? (vue.openBlock(), vue.createBlock(_component_DTTableBody, {
        key: 0,
        ref: "frozenBodyRef",
        value: _ctx.frozenValue,
        frozenRow: true,
        columns: slotProps.columns,
        first: $data.d_first,
        dataKey: _ctx.dataKey,
        selection: _ctx.selection,
        selectionKeys: $data.d_selectionKeys,
        selectionMode: _ctx.selectionMode,
        contextMenu: _ctx.contextMenu,
        contextMenuSelection: _ctx.contextMenuSelection,
        rowGroupMode: _ctx.rowGroupMode,
        groupRowsBy: _ctx.groupRowsBy,
        expandableRowGroups: _ctx.expandableRowGroups,
        rowClass: _ctx.rowClass,
        rowStyle: _ctx.rowStyle,
        editMode: _ctx.editMode,
        compareSelectionBy: _ctx.compareSelectionBy,
        scrollable: _ctx.scrollable,
        expandedRowIcon: _ctx.expandedRowIcon,
        collapsedRowIcon: _ctx.collapsedRowIcon,
        expandedRows: _ctx.expandedRows,
        expandedRowKeys: $data.d_expandedRowKeys,
        expandedRowGroups: _ctx.expandedRowGroups,
        editingRows: _ctx.editingRows,
        editingRowKeys: $data.d_editingRowKeys,
        templates: _ctx.$slots,
        responsiveLayout: _ctx.responsiveLayout,
        isVirtualScrollerDisabled: true,
        onRowgroupToggle: $options.toggleRowGroup,
        onRowClick: _cache[9] || (_cache[9] = function ($event) {
          return $options.onRowClick($event);
        }),
        onRowDblclick: _cache[10] || (_cache[10] = function ($event) {
          return $options.onRowDblClick($event);
        }),
        onRowRightclick: _cache[11] || (_cache[11] = function ($event) {
          return $options.onRowRightClick($event);
        }),
        onRowTouchend: $options.onRowTouchEnd,
        onRowKeydown: $options.onRowKeyDown,
        onRowMousedown: $options.onRowMouseDown,
        onRowDragstart: _cache[12] || (_cache[12] = function ($event) {
          return $options.onRowDragStart($event);
        }),
        onRowDragover: _cache[13] || (_cache[13] = function ($event) {
          return $options.onRowDragOver($event);
        }),
        onRowDragleave: _cache[14] || (_cache[14] = function ($event) {
          return $options.onRowDragLeave($event);
        }),
        onRowDragend: _cache[15] || (_cache[15] = function ($event) {
          return $options.onRowDragEnd($event);
        }),
        onRowDrop: _cache[16] || (_cache[16] = function ($event) {
          return $options.onRowDrop($event);
        }),
        onRowToggle: _cache[17] || (_cache[17] = function ($event) {
          return $options.toggleRow($event);
        }),
        onRadioChange: _cache[18] || (_cache[18] = function ($event) {
          return $options.toggleRowWithRadio($event);
        }),
        onCheckboxChange: _cache[19] || (_cache[19] = function ($event) {
          return $options.toggleRowWithCheckbox($event);
        }),
        onCellEditInit: _cache[20] || (_cache[20] = function ($event) {
          return $options.onCellEditInit($event);
        }),
        onCellEditComplete: _cache[21] || (_cache[21] = function ($event) {
          return $options.onCellEditComplete($event);
        }),
        onCellEditCancel: _cache[22] || (_cache[22] = function ($event) {
          return $options.onCellEditCancel($event);
        }),
        onRowEditInit: _cache[23] || (_cache[23] = function ($event) {
          return $options.onRowEditInit($event);
        }),
        onRowEditSave: _cache[24] || (_cache[24] = function ($event) {
          return $options.onRowEditSave($event);
        }),
        onRowEditCancel: _cache[25] || (_cache[25] = function ($event) {
          return $options.onRowEditCancel($event);
        }),
        editingMeta: $data.d_editingMeta,
        onEditingMetaChange: $options.onEditingMetaChange,
        unstyled: _ctx.unstyled,
        pt: _ctx.pt
      }, null, 8, ["value", "columns", "first", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowKeys", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "onRowgroupToggle", "onRowTouchend", "onRowKeydown", "onRowMousedown", "editingMeta", "onEditingMetaChange", "unstyled", "pt"])) : vue.createCommentVNode("", true), vue.createVNode(_component_DTTableBody, {
        ref: "bodyRef",
        value: $options.dataToRender(slotProps.rows),
        "class": vue.normalizeClass(slotProps.styleClass),
        columns: slotProps.columns,
        empty: $options.empty,
        first: $data.d_first,
        dataKey: _ctx.dataKey,
        selection: _ctx.selection,
        selectionKeys: $data.d_selectionKeys,
        selectionMode: _ctx.selectionMode,
        contextMenu: _ctx.contextMenu,
        contextMenuSelection: _ctx.contextMenuSelection,
        rowGroupMode: _ctx.rowGroupMode,
        groupRowsBy: _ctx.groupRowsBy,
        expandableRowGroups: _ctx.expandableRowGroups,
        rowClass: _ctx.rowClass,
        rowStyle: _ctx.rowStyle,
        editMode: _ctx.editMode,
        compareSelectionBy: _ctx.compareSelectionBy,
        scrollable: _ctx.scrollable,
        expandedRowIcon: _ctx.expandedRowIcon,
        collapsedRowIcon: _ctx.collapsedRowIcon,
        expandedRows: _ctx.expandedRows,
        expandedRowKeys: $data.d_expandedRowKeys,
        expandedRowGroups: _ctx.expandedRowGroups,
        editingRows: _ctx.editingRows,
        editingRowKeys: $data.d_editingRowKeys,
        templates: _ctx.$slots,
        responsiveLayout: _ctx.responsiveLayout,
        virtualScrollerContentProps: slotProps,
        isVirtualScrollerDisabled: $options.virtualScrollerDisabled,
        onRowgroupToggle: $options.toggleRowGroup,
        onRowClick: _cache[26] || (_cache[26] = function ($event) {
          return $options.onRowClick($event);
        }),
        onRowDblclick: _cache[27] || (_cache[27] = function ($event) {
          return $options.onRowDblClick($event);
        }),
        onRowRightclick: _cache[28] || (_cache[28] = function ($event) {
          return $options.onRowRightClick($event);
        }),
        onRowTouchend: $options.onRowTouchEnd,
        onRowKeydown: function onRowKeydown($event) {
          return $options.onRowKeyDown($event, slotProps);
        },
        onRowMousedown: $options.onRowMouseDown,
        onRowDragstart: _cache[29] || (_cache[29] = function ($event) {
          return $options.onRowDragStart($event);
        }),
        onRowDragover: _cache[30] || (_cache[30] = function ($event) {
          return $options.onRowDragOver($event);
        }),
        onRowDragleave: _cache[31] || (_cache[31] = function ($event) {
          return $options.onRowDragLeave($event);
        }),
        onRowDragend: _cache[32] || (_cache[32] = function ($event) {
          return $options.onRowDragEnd($event);
        }),
        onRowDrop: _cache[33] || (_cache[33] = function ($event) {
          return $options.onRowDrop($event);
        }),
        onRowToggle: _cache[34] || (_cache[34] = function ($event) {
          return $options.toggleRow($event);
        }),
        onRadioChange: _cache[35] || (_cache[35] = function ($event) {
          return $options.toggleRowWithRadio($event);
        }),
        onCheckboxChange: _cache[36] || (_cache[36] = function ($event) {
          return $options.toggleRowWithCheckbox($event);
        }),
        onCellEditInit: _cache[37] || (_cache[37] = function ($event) {
          return $options.onCellEditInit($event);
        }),
        onCellEditComplete: _cache[38] || (_cache[38] = function ($event) {
          return $options.onCellEditComplete($event);
        }),
        onCellEditCancel: _cache[39] || (_cache[39] = function ($event) {
          return $options.onCellEditCancel($event);
        }),
        onRowEditInit: _cache[40] || (_cache[40] = function ($event) {
          return $options.onRowEditInit($event);
        }),
        onRowEditSave: _cache[41] || (_cache[41] = function ($event) {
          return $options.onRowEditSave($event);
        }),
        onRowEditCancel: _cache[42] || (_cache[42] = function ($event) {
          return $options.onRowEditCancel($event);
        }),
        editingMeta: $data.d_editingMeta,
        onEditingMetaChange: $options.onEditingMetaChange,
        unstyled: _ctx.unstyled,
        pt: _ctx.pt
      }, null, 8, ["value", "class", "columns", "empty", "first", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowKeys", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "virtualScrollerContentProps", "isVirtualScrollerDisabled", "onRowgroupToggle", "onRowTouchend", "onRowKeydown", "onRowMousedown", "editingMeta", "onEditingMetaChange", "unstyled", "pt"]), $options.hasSpacerStyle(slotProps.spacerStyle) ? (vue.openBlock(), vue.createElementBlock("tbody", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('virtualScrollerSpacer'),
        style: {
          height: "calc(".concat(slotProps.spacerStyle.height, " - ").concat(slotProps.rows.length * slotProps.itemSize, "px)")
        }
      }, _ctx.ptm('virtualScrollerSpacer')), null, 16)) : vue.createCommentVNode("", true), vue.createVNode(_component_DTTableFooter, {
        columnGroup: $options.footerColumnGroup,
        columns: slotProps.columns,
        pt: _ctx.pt
      }, null, 8, ["columnGroup", "columns", "pt"])], 16)];
    }),
    _: 1
  }, 16, ["items", "columns", "style", "scrollHeight", "disabled", "pt"])], 16), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 3,
    "class": _ctx.cx('footer')
  }, _ctx.ptm('footer')), [vue.renderSlot(_ctx.$slots, "footer")], 16)) : vue.createCommentVNode("", true), $options.paginatorBottom ? (vue.openBlock(), vue.createBlock(_component_DTPaginator, {
    key: 4,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": vue.normalizeClass(_ctx.cx('paginator')),
    onPage: _cache[43] || (_cache[43] = function ($event) {
      return $options.onPage($event);
    }),
    alwaysShow: _ctx.alwaysShowPaginator,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('paginator')
  }, vue.createSlots({
    _: 2
  }, [_ctx.$slots.paginatorstart ? {
    name: "start",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "0"
  } : undefined, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "1"
  } : undefined, _ctx.$slots.paginatorfirstpagelinkicon ? {
    name: "firstpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon")];
    }),
    key: "2"
  } : undefined, _ctx.$slots.paginatorprevpagelinkicon ? {
    name: "prevpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorprevpagelinkicon")];
    }),
    key: "3"
  } : undefined, _ctx.$slots.paginatornextpagelinkicon ? {
    name: "nextpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatornextpagelinkicon")];
    }),
    key: "4"
  } : undefined, _ctx.$slots.paginatorlastpagelinkicon ? {
    name: "lastpagelinkicon",
    fn: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "paginatorlastpagelinkicon")];
    }),
    key: "5"
  } : undefined]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    ref: "resizeHelper",
    "class": _ctx.cx('resizeHelper'),
    style: {
      "display": "none"
    }
  }, _ctx.ptm('resizeHelper')), null, 16), _ctx.reorderableColumns ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 5,
    ref: "reorderIndicatorUp",
    "class": _ctx.cx('reorderIndicatorUp'),
    style: {
      "position": "absolute",
      "display": "none"
    }
  }, _ctx.ptm('reorderIndicatorUp')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.reorderindicatorupicon || 'ArrowDownIcon')))], 16)) : vue.createCommentVNode("", true), _ctx.reorderableColumns ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 6,
    ref: "reorderIndicatorDown",
    "class": _ctx.cx('reorderIndicatorDown'),
    style: {
      "position": "absolute",
      "display": "none"
    }
  }, _ctx.ptm('reorderIndicatorDown')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.reorderindicatordownicon || 'ArrowUpIcon')))], 16)) : vue.createCommentVNode("", true)], 16);
}

script.render = render;

module.exports = script;
