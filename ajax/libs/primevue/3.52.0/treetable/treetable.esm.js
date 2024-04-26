import { FilterService } from 'primevue/api';
import SpinnerIcon from 'primevue/icons/spinner';
import Paginator from 'primevue/paginator';
import { ObjectUtils, DomHandler, HelperSet } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import TreeTableStyle from 'primevue/treetable/style';
import { mergeProps, openBlock, createElementBlock, createBlock, resolveDynamicComponent, createCommentVNode, createTextVNode, toDisplayString, normalizeProps, resolveComponent, resolveDirective, withDirectives, Fragment, normalizeClass, withCtx, createElementVNode, renderList, renderSlot, createSlots } from 'vue';
import SortAltIcon from 'primevue/icons/sortalt';
import SortAmountDownIcon from 'primevue/icons/sortamountdown';
import SortAmountUpAltIcon from 'primevue/icons/sortamountupalt';
import Checkbox from 'primevue/checkbox';
import CheckIcon from 'primevue/icons/check';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronRightIcon from 'primevue/icons/chevronright';
import MinusIcon from 'primevue/icons/minus';
import Ripple from 'primevue/ripple';

var script$5 = {
  name: 'BaseTreeTable',
  "extends": BaseComponent,
  props: {
    value: {
      type: null,
      "default": null
    },
    dataKey: {
      type: [String, Function],
      "default": 'key'
    },
    expandedKeys: {
      type: null,
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
    metaKeySelection: {
      type: Boolean,
      "default": false
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
      type: String,
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
    loadingMode: {
      type: String,
      "default": 'mask'
    },
    rowHover: {
      type: Boolean,
      "default": false
    },
    autoLayout: {
      type: Boolean,
      "default": false
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
    filterMode: {
      type: String,
      "default": 'lenient'
    },
    filterLocale: {
      type: String,
      "default": undefined
    },
    resizableColumns: {
      type: Boolean,
      "default": false
    },
    columnResizeMode: {
      type: String,
      "default": 'fit'
    },
    indentation: {
      type: Number,
      "default": 1
    },
    showGridlines: {
      type: Boolean,
      "default": false
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    scrollDirection: {
      type: String,
      "default": 'vertical'
    },
    scrollHeight: {
      type: String,
      "default": null
    },
    responsiveLayout: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    },
    tableProps: {
      type: Object,
      "default": null
    }
  },
  style: TreeTableStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$4 = {
  name: 'FooterCell',
  hostName: 'TreeTable',
  "extends": BaseComponent,
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
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          frozen: this.columnProp('frozen'),
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
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
          var next = DomHandler.getNextElementSibling(this.$el, '[data-p-frozen-column="true"]');
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + 'px';
        } else {
          var left = 0;
          var prev = DomHandler.getPreviousElementSibling(this.$el, '[data-p-frozen-column="true"]');
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
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

function _typeof$5(o) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$5(o); }
function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty$5(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(t) { var i = _toPrimitive$5(t, "string"); return "symbol" == _typeof$5(i) ? i : String(i); }
function _toPrimitive$5(t, r) { if ("object" != _typeof$5(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$5(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$4 = ["data-p-frozen-column"];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("td", mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell"
  }, _objectSpread$5(_objectSpread$5({}, $options.getColumnPT('root')), $options.getColumnPT('footerCell')), {
    "data-p-frozen-column": $options.columnProp('frozen')
  }), [$props.column.children && $props.column.children.footer ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.footer), {
    key: 0,
    column: $props.column
  }, null, 8, ["column"])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString($options.columnProp('footer')), 1)], 16, _hoisted_1$4);
}

script$4.render = render$4;

var script$3 = {
  name: 'HeaderCell',
  hostName: 'TreeTable',
  "extends": BaseComponent,
  emits: ['column-click', 'column-resizestart'],
  props: {
    column: {
      type: Object,
      "default": null
    },
    resizableColumns: {
      type: Boolean,
      "default": false
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
    sortMode: {
      type: String,
      "default": 'single'
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
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          sorted: this.isColumnSorted(),
          frozen: this.$parentInstance.scrollable && this.columnProp('frozen'),
          resizable: this.resizableColumns,
          scrollable: this.$parentInstance.scrollable,
          scrollDirection: this.$parentInstance.scrollDirection,
          showGridlines: this.$parentInstance.showGridlines,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    updateStickyPosition: function updateStickyPosition() {
      if (this.columnProp('frozen')) {
        var align = this.columnProp('alignFrozen');
        if (align === 'right') {
          var right = 0;
          var next = DomHandler.getNextElementSibling(this.$el, '[data-p-frozen-column="true"]');
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + 'px';
        } else {
          var left = 0;
          var prev = DomHandler.getPreviousElementSibling(this.$el, '[data-p-frozen-column="true"]');
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + 'px';
        }
        var filterRow = this.$el.parentElement.nextElementSibling;
        if (filterRow) {
          var index = DomHandler.index(this.$el);
          filterRow.children[index].style.left = this.styleObject.left;
          filterRow.children[index].style.right = this.styleObject.right;
        }
      }
    },
    onClick: function onClick(event) {
      this.$emit('column-click', {
        originalEvent: event,
        column: this.column
      });
    },
    onKeyDown: function onKeyDown(event) {
      if ((event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') && event.currentTarget.nodeName === 'TH' && DomHandler.getAttribute(event.currentTarget, 'data-p-sortable-column')) {
        this.$emit('column-click', {
          originalEvent: event,
          column: this.column
        });
        event.preventDefault();
      }
    },
    onResizeStart: function onResizeStart(event) {
      this.$emit('column-resizestart', event);
    },
    getMultiSortMetaIndex: function getMultiSortMetaIndex() {
      var index = -1;
      for (var i = 0; i < this.multiSortMeta.length; i++) {
        var meta = this.multiSortMeta[i];
        if (meta.field === this.columnProp('field') || meta.field === this.columnProp('sortField')) {
          index = i;
          break;
        }
      }
      return index;
    },
    isMultiSorted: function isMultiSorted() {
      return this.columnProp('sortable') && this.getMultiSortMetaIndex() > -1;
    },
    isColumnSorted: function isColumnSorted() {
      return this.sortMode === 'single' ? this.sortField && (this.sortField === this.columnProp('field') || this.sortField === this.columnProp('sortField')) : this.isMultiSorted();
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.columnProp('headerClass'), this.columnProp('class'), this.cx('headerCell')];
    },
    containerStyle: function containerStyle() {
      var headerStyle = this.columnProp('headerStyle');
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
      if (!sorted) return SortAltIcon;else if (sorted && sortOrder > 0) return SortAmountUpAltIcon;else if (sorted && sortOrder < 0) return SortAmountDownIcon;
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
    SortAltIcon: SortAltIcon,
    SortAmountUpAltIcon: SortAmountUpAltIcon,
    SortAmountDownIcon: SortAmountDownIcon
  }
};

function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty$4(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$4(i) ? i : String(i); }
function _toPrimitive$4(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$3 = ["tabindex", "aria-sort", "data-p-sortable-column", "data-p-resizable-column", "data-p-highlight", "data-p-frozen-column"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("th", mergeProps({
    "class": $options.containerClass,
    style: [$options.containerStyle],
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    tabindex: $options.columnProp('sortable') ? '0' : null,
    "aria-sort": $options.ariaSort,
    role: "columnheader"
  }, _objectSpread$4(_objectSpread$4({}, $options.getColumnPT('root')), $options.getColumnPT('headerCell')), {
    "data-p-sortable-column": $options.columnProp('sortable'),
    "data-p-resizable-column": $props.resizableColumns,
    "data-p-highlight": $options.isColumnSorted(),
    "data-p-frozen-column": $options.columnProp('frozen')
  }), [$props.resizableColumns && !$options.columnProp('frozen') ? (openBlock(), createElementBlock("span", mergeProps({
    key: 0,
    "class": _ctx.cx('columnResizer'),
    onMousedown: _cache[0] || (_cache[0] = function () {
      return $options.onResizeStart && $options.onResizeStart.apply($options, arguments);
    })
  }, $options.getColumnPT('columnResizer')), null, 16)) : createCommentVNode("", true), $props.column.children && $props.column.children.header ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.header), {
    key: 1,
    column: $props.column
  }, null, 8, ["column"])) : createCommentVNode("", true), $options.columnProp('header') ? (openBlock(), createElementBlock("span", mergeProps({
    key: 2,
    "class": _ctx.cx('headerTitle')
  }, $options.getColumnPT('headerTitle')), toDisplayString($options.columnProp('header')), 17)) : createCommentVNode("", true), $options.columnProp('sortable') ? (openBlock(), createElementBlock("span", normalizeProps(mergeProps({
    key: 3
  }, $options.getColumnPT('sort'))), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.sorticon || $options.sortableColumnIcon), mergeProps({
    sorted: $options.sortState.sorted,
    sortOrder: $options.sortState.sortOrder,
    "class": _ctx.cx('sortIcon')
  }, $options.getColumnPT('sortIcon')), null, 16, ["sorted", "sortOrder", "class"]))], 16)) : createCommentVNode("", true), $options.isMultiSorted() ? (openBlock(), createElementBlock("span", mergeProps({
    key: 4,
    "class": _ctx.cx('sortBadge')
  }, $options.getColumnPT('sortBadge')), toDisplayString($options.getMultiSortMetaIndex() + 1), 17)) : createCommentVNode("", true)], 16, _hoisted_1$3);
}

script$3.render = render$3;

var script$2 = {
  name: 'BodyCell',
  hostName: 'TreeTable',
  "extends": BaseComponent,
  emits: ['node-toggle', 'checkbox-toggle'],
  props: {
    node: {
      type: Object,
      "default": null
    },
    column: {
      type: Object,
      "default": null
    },
    level: {
      type: Number,
      "default": 0
    },
    indentation: {
      type: Number,
      "default": 1
    },
    leaf: {
      type: Boolean,
      "default": false
    },
    expanded: {
      type: Boolean,
      "default": false
    },
    selectionMode: {
      type: String,
      "default": null
    },
    checked: {
      type: Boolean,
      "default": false
    },
    partialChecked: {
      type: Boolean,
      "default": false
    },
    templates: {
      type: Object,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    },
    loadingMode: {
      type: String,
      "default": 'mask'
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
    toggle: function toggle() {
      this.$emit('node-toggle', this.node);
    },
    columnProp: function columnProp(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          selectable: this.$parentInstance.rowHover || this.$parentInstance.rowSelectionMode,
          selected: this.$parent.selected,
          frozen: this.columnProp('frozen'),
          scrollable: this.$parentInstance.scrollable,
          scrollDirection: this.$parentInstance.scrollDirection,
          showGridlines: this.$parentInstance.showGridlines,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo
    },
    getColumnCheckboxPT: function getColumnCheckboxPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          checked: this.checked,
          partialChecked: this.partialChecked
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    updateStickyPosition: function updateStickyPosition() {
      if (this.columnProp('frozen')) {
        var align = this.columnProp('alignFrozen');
        if (align === 'right') {
          var right = 0;
          var next = DomHandler.getNextElementSibling(this.$el, '[data-p-frozen-column="true"]');
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + 'px';
        } else {
          var left = 0;
          var prev = DomHandler.getPreviousElementSibling(this.$el, '[data-p-frozen-column="true"]');
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + 'px';
        }
      }
    },
    resolveFieldData: function resolveFieldData(rowData, field) {
      return ObjectUtils.resolveFieldData(rowData, field);
    },
    toggleCheckbox: function toggleCheckbox() {
      this.$emit('checkbox-toggle');
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.columnProp('bodyClass'), this.columnProp('class'), this.cx('bodyCell')];
    },
    containerStyle: function containerStyle() {
      var bodyStyle = this.columnProp('bodyStyle');
      var columnStyle = this.columnProp('style');
      return this.columnProp('frozen') ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    },
    togglerStyle: function togglerStyle() {
      return {
        marginLeft: this.level * this.indentation + 'rem',
        visibility: this.leaf ? 'hidden' : 'visible'
      };
    },
    checkboxSelectionMode: function checkboxSelectionMode() {
      return this.selectionMode === 'checkbox';
    }
  },
  components: {
    Checkbox: Checkbox,
    ChevronRightIcon: ChevronRightIcon,
    ChevronDownIcon: ChevronDownIcon,
    CheckIcon: CheckIcon,
    MinusIcon: MinusIcon,
    SpinnerIcon: SpinnerIcon
  },
  directives: {
    ripple: Ripple
  }
};

function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty$3(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : String(i); }
function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$2 = ["data-p-frozen-column"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_Checkbox = resolveComponent("Checkbox");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("td", mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell"
  }, _objectSpread$3(_objectSpread$3({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell')), {
    "data-p-frozen-column": $options.columnProp('frozen')
  }), [$options.columnProp('expander') ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    type: "button",
    "class": _ctx.cx('rowToggler'),
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    style: $options.togglerStyle,
    tabindex: "-1"
  }, $options.getColumnPT('rowToggler'), {
    "data-pc-group-section": "rowactionbutton"
  }), [$props.node.loading && $props.loadingMode === 'icon' ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [$props.templates['nodetogglericon'] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates['nodetogglericon']), {
    key: 0,
    "class": normalizeClass(_ctx.cx('nodetogglericon'))
  }, null, 8, ["class"])) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
    key: 1,
    spin: "",
    "class": _ctx.cx('nodetogglericon')
  }, _ctx.ptm('nodetogglericon')), null, 16, ["class"]))], 64)) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [$props.column.children && $props.column.children.rowtogglericon ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.rowtogglericon), {
    key: 0,
    node: $props.node,
    expanded: $props.expanded,
    "class": normalizeClass(_ctx.cx('rowTogglerIcon'))
  }, null, 8, ["node", "expanded", "class"])) : $props.expanded ? (openBlock(), createBlock(resolveDynamicComponent($props.node.expandedIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
    key: 1,
    "class": _ctx.cx('rowTogglerIcon')
  }, $options.getColumnPT('rowTogglerIcon')), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.node.collapsedIcon ? 'span' : 'ChevronRightIcon'), mergeProps({
    key: 2,
    "class": _ctx.cx('rowTogglerIcon')
  }, $options.getColumnPT('rowTogglerIcon')), null, 16, ["class"]))], 64))], 16)), [[_directive_ripple]]) : createCommentVNode("", true), $options.checkboxSelectionMode && $options.columnProp('expander') ? (openBlock(), createBlock(_component_Checkbox, {
    key: 1,
    modelValue: $props.checked,
    binary: true,
    "class": normalizeClass(_ctx.cx('rowCheckbox')),
    onChange: $options.toggleCheckbox,
    tabindex: -1,
    unstyled: _ctx.unstyled,
    pt: $options.getColumnCheckboxPT('rowCheckbox'),
    "data-p-highlight": $props.checked,
    "data-p-checked": $props.checked,
    "data-p-partialchecked": $props.partialChecked
  }, {
    icon: withCtx(function (slotProps) {
      return [$props.templates['checkboxicon'] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates['checkboxicon']), {
        key: 0,
        checked: slotProps.checked,
        partialChecked: $props.partialChecked,
        "class": normalizeClass(slotProps["class"])
      }, null, 8, ["checked", "partialChecked", "class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.checked ? 'CheckIcon' : $props.partialChecked ? 'MinusIcon' : null), mergeProps({
        key: 1,
        "class": slotProps["class"]
      }, $options.getColumnCheckboxPT('rowCheckbox.icon')), null, 16, ["class"]))];
    }),
    _: 1
  }, 8, ["modelValue", "class", "onChange", "unstyled", "pt", "data-p-highlight", "data-p-checked", "data-p-partialchecked"])) : createCommentVNode("", true), $props.column.children && $props.column.children.body ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.body), {
    key: 2,
    node: $props.node,
    column: $props.column
  }, null, 8, ["node", "column"])) : (openBlock(), createElementBlock("span", normalizeProps(mergeProps({
    key: 3
  }, $options.getColumnPT('bodyCellContent'))), toDisplayString($options.resolveFieldData($props.node.data, $options.columnProp('field'))), 17))], 16, _hoisted_1$2);
}

script$2.render = render$2;

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty$2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : String(i); }
function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$1 = {
  name: 'TreeTableRow',
  hostName: 'TreeTable',
  "extends": BaseComponent,
  emits: ['node-click', 'node-toggle', 'checkbox-change', 'nodeClick', 'nodeToggle', 'checkboxChange'],
  props: {
    node: {
      type: null,
      "default": null
    },
    dataKey: {
      type: [String, Function],
      "default": 'key'
    },
    parentNode: {
      type: null,
      "default": null
    },
    columns: {
      type: null,
      "default": null
    },
    expandedKeys: {
      type: null,
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
    level: {
      type: Number,
      "default": 0
    },
    indentation: {
      type: Number,
      "default": 1
    },
    tabindex: {
      type: Number,
      "default": -1
    },
    ariaSetSize: {
      type: Number,
      "default": null
    },
    ariaPosInset: {
      type: Number,
      "default": null
    },
    loadingMode: {
      type: String,
      "default": 'mask'
    },
    templates: {
      type: Object,
      "default": null
    }
  },
  nodeTouched: false,
  methods: {
    columnProp: function columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    toggle: function toggle() {
      this.$emit('node-toggle', this.node);
    },
    onClick: function onClick(event) {
      if (DomHandler.isClickable(event.target) || DomHandler.getAttribute(event.target, 'data-pc-section') === 'rowtoggler' || DomHandler.getAttribute(event.target, 'data-pc-section') === 'rowtogglericon' || event.target.tagName === 'path') {
        return;
      }
      this.setTabIndexForSelectionMode(event, this.nodeTouched);
      this.$emit('node-click', {
        originalEvent: event,
        nodeTouched: this.nodeTouched,
        node: this.node
      });
      this.nodeTouched = false;
    },
    onTouchEnd: function onTouchEnd() {
      this.nodeTouched = true;
    },
    nodeKey: function nodeKey(node) {
      return ObjectUtils.resolveFieldData(node, this.dataKey);
    },
    onKeyDown: function onKeyDown(event, item) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onArrowUpKey(event);
          break;
        case 'ArrowLeft':
          this.onArrowLeftKey(event);
          break;
        case 'ArrowRight':
          this.onArrowRightKey(event);
          break;
        case 'Home':
          this.onHomeKey(event);
          break;
        case 'End':
          this.onEndKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          if (!DomHandler.isClickable(event.target)) {
            this.onEnterKey(event, item);
          }
          break;
        case 'Tab':
          this.onTabKey(event);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var nextElementSibling = event.currentTarget.nextElementSibling;
      nextElementSibling && this.focusRowChange(event.currentTarget, nextElementSibling);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var previousElementSibling = event.currentTarget.previousElementSibling;
      previousElementSibling && this.focusRowChange(event.currentTarget, previousElementSibling);
      event.preventDefault();
    },
    onArrowRightKey: function onArrowRightKey(event) {
      var _this = this;
      var ishiddenIcon = DomHandler.findSingle(event.currentTarget, 'button').style.visibility === 'hidden';
      var togglerElement = DomHandler.findSingle(this.$refs.node, '[data-pc-section="rowtoggler"]');
      if (ishiddenIcon) return;
      !this.expanded && togglerElement.click();
      this.$nextTick(function () {
        _this.onArrowDownKey(event);
      });
      event.preventDefault();
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      if (this.level === 0 && !this.expanded) {
        return;
      }
      var currentTarget = event.currentTarget;
      var ishiddenIcon = DomHandler.findSingle(currentTarget, 'button').style.visibility === 'hidden';
      var togglerElement = DomHandler.findSingle(currentTarget, '[data-pc-section="rowtoggler"]');
      if (this.expanded && !ishiddenIcon) {
        togglerElement.click();
        return;
      }
      var target = this.findBeforeClickableNode(currentTarget);
      target && this.focusRowChange(currentTarget, target);
    },
    onHomeKey: function onHomeKey(event) {
      var findFirstElement = DomHandler.findSingle(event.currentTarget.parentElement, "tr[aria-level=\"".concat(this.level + 1, "\"]"));
      findFirstElement && DomHandler.focus(findFirstElement);
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var nodes = DomHandler.find(event.currentTarget.parentElement, "tr[aria-level=\"".concat(this.level + 1, "\"]"));
      var findFirstElement = nodes[nodes.length - 1];
      DomHandler.focus(findFirstElement);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      event.preventDefault();
      this.setTabIndexForSelectionMode(event, this.nodeTouched);
      if (this.selectionMode === 'checkbox') {
        this.toggleCheckbox();
        return;
      }
      this.$emit('node-click', {
        originalEvent: event,
        nodeTouched: this.nodeTouched,
        node: this.node
      });
      this.nodeTouched = false;
    },
    onTabKey: function onTabKey() {
      var rows = _toConsumableArray$1(DomHandler.find(this.$refs.node.parentElement, 'tr'));
      var hasSelectedRow = rows.some(function (row) {
        return DomHandler.getAttribute(row, 'data-p-highlight') || row.getAttribute('aria-checked') === 'true';
      });
      rows.forEach(function (row) {
        row.tabIndex = -1;
      });
      if (hasSelectedRow) {
        var selectedNodes = rows.filter(function (node) {
          return DomHandler.getAttribute(node, 'data-p-highlight') || node.getAttribute('aria-checked') === 'true';
        });
        selectedNodes[0].tabIndex = 0;
        return;
      }
      rows[0].tabIndex = 0;
    },
    focusRowChange: function focusRowChange(firstFocusableRow, currentFocusedRow) {
      firstFocusableRow.tabIndex = '-1';
      currentFocusedRow.tabIndex = '0';
      DomHandler.focus(currentFocusedRow);
    },
    findBeforeClickableNode: function findBeforeClickableNode(node) {
      var prevNode = node.previousElementSibling;
      if (prevNode) {
        var prevNodeButton = prevNode.querySelector('button');
        if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
          return prevNode;
        }
        return this.findBeforeClickableNode(prevNode);
      }
      return null;
    },
    toggleCheckbox: function toggleCheckbox() {
      var _selectionKeys = this.selectionKeys ? _objectSpread$2({}, this.selectionKeys) : {};
      var _check = !this.checked;
      this.propagateDown(this.node, _check, _selectionKeys);
      this.$emit('checkbox-change', {
        node: this.node,
        check: _check,
        selectionKeys: _selectionKeys
      });
    },
    propagateDown: function propagateDown(node, check, selectionKeys) {
      if (check) selectionKeys[this.nodeKey(node)] = {
        checked: true,
        partialChecked: false
      };else delete selectionKeys[this.nodeKey(node)];
      if (node.children && node.children.length) {
        var _iterator = _createForOfIteratorHelper$1(node.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            this.propagateDown(child, check, selectionKeys);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    propagateUp: function propagateUp(event) {
      var check = event.check;
      var _selectionKeys = _objectSpread$2({}, event.selectionKeys);
      var checkedChildCount = 0;
      var childPartialSelected = false;
      var _iterator2 = _createForOfIteratorHelper$1(this.node.children),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;
          if (_selectionKeys[this.nodeKey(child)] && _selectionKeys[this.nodeKey(child)].checked) checkedChildCount++;else if (_selectionKeys[this.nodeKey(child)] && _selectionKeys[this.nodeKey(child)].partialChecked) childPartialSelected = true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (check && checkedChildCount === this.node.children.length) {
        _selectionKeys[this.nodeKey(this.node)] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete _selectionKeys[this.nodeKey(this.node)];
        }
        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.node.children.length) _selectionKeys[this.nodeKey(this.node)] = {
          checked: false,
          partialChecked: true
        };else _selectionKeys[this.nodeKey(this.node)] = {
          checked: false,
          partialChecked: false
        };
      }
      this.$emit('checkbox-change', {
        node: event.node,
        check: event.check,
        selectionKeys: _selectionKeys
      });
    },
    onCheckboxChange: function onCheckboxChange(event) {
      var check = event.check;
      var _selectionKeys = _objectSpread$2({}, event.selectionKeys);
      var checkedChildCount = 0;
      var childPartialSelected = false;
      var _iterator3 = _createForOfIteratorHelper$1(this.node.children),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;
          if (_selectionKeys[this.nodeKey(child)] && _selectionKeys[this.nodeKey(child)].checked) checkedChildCount++;else if (_selectionKeys[this.nodeKey(child)] && _selectionKeys[this.nodeKey(child)].partialChecked) childPartialSelected = true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (check && checkedChildCount === this.node.children.length) {
        _selectionKeys[this.nodeKey(this.node)] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete _selectionKeys[this.nodeKey(this.node)];
        }
        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.node.children.length) _selectionKeys[this.nodeKey(this.node)] = {
          checked: false,
          partialChecked: true
        };else _selectionKeys[this.nodeKey(this.node)] = {
          checked: false,
          partialChecked: false
        };
      }
      this.$emit('checkbox-change', {
        node: event.node,
        check: event.check,
        selectionKeys: _selectionKeys
      });
    },
    setTabIndexForSelectionMode: function setTabIndexForSelectionMode(event, nodeTouched) {
      if (this.selectionMode !== null) {
        var elements = _toConsumableArray$1(DomHandler.find(this.$refs.node.parentElement, 'tr'));
        event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
        if (elements.every(function (element) {
          return element.tabIndex === -1;
        })) {
          elements[0].tabIndex = 0;
        }
      }
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.node.styleClass, this.cx('row')];
    },
    expanded: function expanded() {
      return this.expandedKeys && this.expandedKeys[this.nodeKey(this.node)] === true;
    },
    leaf: function leaf() {
      return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
    },
    selected: function selected() {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.nodeKey(this.node)] === true : false;
    },
    checked: function checked() {
      return this.selectionKeys ? this.selectionKeys[this.nodeKey(this.node)] && this.selectionKeys[this.nodeKey(this.node)].checked : false;
    },
    partialChecked: function partialChecked() {
      return this.selectionKeys ? this.selectionKeys[this.nodeKey(this.node)] && this.selectionKeys[this.nodeKey(this.node)].partialChecked : false;
    },
    getAriaSelected: function getAriaSelected() {
      return this.selectionMode === 'single' || this.selectionMode === 'multiple' ? this.selected : null;
    },
    ptmOptions: function ptmOptions() {
      return {
        context: {
          selectable: this.$parentInstance.rowHover || this.$parentInstance.rowSelectionMode,
          selected: this.selected,
          scrollable: this.$parentInstance.scrollable
        }
      };
    }
  },
  components: {
    TTBodyCell: script$2
  }
};

var _hoisted_1$1 = ["tabindex", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset", "aria-selected", "aria-checked", "data-p-highlight"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TTBodyCell = resolveComponent("TTBodyCell");
  var _component_TreeTableRow = resolveComponent("TreeTableRow", true);
  return openBlock(), createElementBlock(Fragment, null, [createElementVNode("tr", mergeProps({
    ref: "node",
    "class": $options.containerClass,
    style: $props.node.style,
    tabindex: $props.tabindex,
    role: "row",
    "aria-expanded": $props.node.children && $props.node.children.length ? $options.expanded : undefined,
    "aria-level": $props.level + 1,
    "aria-setsize": $props.ariaSetSize,
    "aria-posinset": $props.ariaPosInset,
    "aria-selected": $options.getAriaSelected,
    "aria-checked": $options.checked || undefined,
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onTouchend: _cache[3] || (_cache[3] = function () {
      return $options.onTouchEnd && $options.onTouchEnd.apply($options, arguments);
    })
  }, _ctx.ptm('row', $options.ptmOptions), {
    "data-p-highlight": $options.selected
  }), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') ? (openBlock(), createBlock(_component_TTBodyCell, {
      key: 0,
      column: col,
      node: $props.node,
      level: $props.level,
      leaf: $options.leaf,
      indentation: $props.indentation,
      expanded: $options.expanded,
      selectionMode: $props.selectionMode,
      checked: $options.checked,
      partialChecked: $options.partialChecked,
      templates: $props.templates,
      onNodeToggle: _cache[0] || (_cache[0] = function ($event) {
        return _ctx.$emit('node-toggle', $event);
      }),
      onCheckboxToggle: $options.toggleCheckbox,
      index: i,
      loadingMode: $props.loadingMode,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["column", "node", "level", "leaf", "indentation", "expanded", "selectionMode", "checked", "partialChecked", "templates", "onCheckboxToggle", "index", "loadingMode", "unstyled", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1$1), $options.expanded && $props.node.children && $props.node.children.length ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($props.node.children, function (childNode) {
    return openBlock(), createBlock(_component_TreeTableRow, {
      key: $options.nodeKey(childNode),
      dataKey: $props.dataKey,
      columns: $props.columns,
      node: childNode,
      parentNode: $props.node,
      level: $props.level + 1,
      expandedKeys: $props.expandedKeys,
      selectionMode: $props.selectionMode,
      selectionKeys: $props.selectionKeys,
      indentation: $props.indentation,
      ariaPosInset: $props.node.children.indexOf(childNode) + 1,
      ariaSetSize: $props.node.children.length,
      templates: $props.templates,
      onNodeToggle: _cache[4] || (_cache[4] = function ($event) {
        return _ctx.$emit('node-toggle', $event);
      }),
      onNodeClick: _cache[5] || (_cache[5] = function ($event) {
        return _ctx.$emit('node-click', $event);
      }),
      onCheckboxChange: $options.onCheckboxChange,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["dataKey", "columns", "node", "parentNode", "level", "expandedKeys", "selectionMode", "selectionKeys", "indentation", "ariaPosInset", "ariaSetSize", "templates", "onCheckboxChange", "unstyled", "pt"]);
  }), 128)) : createCommentVNode("", true)], 64);
}

script$1.render = render$1;

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'TreeTable',
  "extends": script$5,
  inheritAttrs: false,
  emits: ['node-expand', 'node-collapse', 'update:expandedKeys', 'update:selectionKeys', 'node-select', 'node-unselect', 'update:first', 'update:rows', 'page', 'update:sortField', 'update:sortOrder', 'update:multiSortMeta', 'sort', 'filter', 'column-resize-end'],
  provide: function provide() {
    return {
      $columns: this.d_columns
    };
  },
  data: function data() {
    return {
      d_expandedKeys: this.expandedKeys || {},
      d_first: this.first,
      d_rows: this.rows,
      d_sortField: this.sortField,
      d_sortOrder: this.sortOrder,
      d_multiSortMeta: this.multiSortMeta ? _toConsumableArray(this.multiSortMeta) : [],
      hasASelectedNode: false,
      d_columns: new HelperSet({
        type: 'Column'
      })
    };
  },
  documentColumnResizeListener: null,
  documentColumnResizeEndListener: null,
  lastResizeHelperX: null,
  resizeColumnElement: null,
  watch: {
    expandedKeys: function expandedKeys(newValue) {
      this.d_expandedKeys = newValue;
    },
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
    }
  },
  mounted: function mounted() {
    if (this.scrollable && this.scrollDirection !== 'vertical') {
      this.updateScrollWidth();
    }
  },
  updated: function updated() {
    if (this.scrollable && this.scrollDirection !== 'vertical') {
      this.updateScrollWidth();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.d_columns.clear();
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    ptHeaderCellOptions: function ptHeaderCellOptions(column) {
      return {
        context: {
          frozen: this.columnProp(column, 'frozen')
        }
      };
    },
    onNodeToggle: function onNodeToggle(node) {
      var key = this.nodeKey(node);
      if (this.d_expandedKeys[key]) {
        delete this.d_expandedKeys[key];
        this.$emit('node-collapse', node);
      } else {
        this.d_expandedKeys[key] = true;
        this.$emit('node-expand', node);
      }
      this.d_expandedKeys = _objectSpread$1({}, this.d_expandedKeys);
      this.$emit('update:expandedKeys', this.d_expandedKeys);
    },
    onNodeClick: function onNodeClick(event) {
      if (this.rowSelectionMode && event.node.selectable !== false) {
        var metaSelection = event.nodeTouched ? false : this.metaKeySelection;
        var _selectionKeys = metaSelection ? this.handleSelectionWithMetaKey(event) : this.handleSelectionWithoutMetaKey(event);
        this.$emit('update:selectionKeys', _selectionKeys);
      }
    },
    nodeKey: function nodeKey(node) {
      return ObjectUtils.resolveFieldData(node, this.dataKey);
    },
    handleSelectionWithMetaKey: function handleSelectionWithMetaKey(event) {
      var originalEvent = event.originalEvent;
      var node = event.node;
      var nodeKey = this.nodeKey(node);
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      var selected = this.isNodeSelected(node);
      var _selectionKeys;
      if (selected && metaKey) {
        if (this.isSingleSelectionMode()) {
          _selectionKeys = {};
        } else {
          _selectionKeys = _objectSpread$1({}, this.selectionKeys);
          delete _selectionKeys[nodeKey];
        }
        this.$emit('node-unselect', node);
      } else {
        if (this.isSingleSelectionMode()) {
          _selectionKeys = {};
        } else if (this.isMultipleSelectionMode()) {
          _selectionKeys = !metaKey ? {} : this.selectionKeys ? _objectSpread$1({}, this.selectionKeys) : {};
        }
        _selectionKeys[nodeKey] = true;
        this.$emit('node-select', node);
      }
      return _selectionKeys;
    },
    handleSelectionWithoutMetaKey: function handleSelectionWithoutMetaKey(event) {
      var node = event.node;
      var nodeKey = this.nodeKey(node);
      var selected = this.isNodeSelected(node);
      var _selectionKeys;
      if (this.isSingleSelectionMode()) {
        if (selected) {
          _selectionKeys = {};
          this.$emit('node-unselect', node);
        } else {
          _selectionKeys = {};
          _selectionKeys[nodeKey] = true;
          this.$emit('node-select', node);
        }
      } else {
        if (selected) {
          _selectionKeys = _objectSpread$1({}, this.selectionKeys);
          delete _selectionKeys[nodeKey];
          this.$emit('node-unselect', node);
        } else {
          _selectionKeys = this.selectionKeys ? _objectSpread$1({}, this.selectionKeys) : {};
          _selectionKeys[nodeKey] = true;
          this.$emit('node-select', node);
        }
      }
      return _selectionKeys;
    },
    onCheckboxChange: function onCheckboxChange(event) {
      this.$emit('update:selectionKeys', event.selectionKeys);
      if (event.check) this.$emit('node-select', event.node);else this.$emit('node-unselect', event.node);
    },
    isSingleSelectionMode: function isSingleSelectionMode() {
      return this.selectionMode === 'single';
    },
    isMultipleSelectionMode: function isMultipleSelectionMode() {
      return this.selectionMode === 'multiple';
    },
    onPage: function onPage(event) {
      this.d_first = event.first;
      this.d_rows = event.rows;
      var pageEvent = this.createLazyLoadEvent(event);
      pageEvent.pageCount = event.pageCount;
      pageEvent.page = event.page;
      this.d_expandedKeys = {};
      this.$emit('update:expandedKeys', this.d_expandedKeys);
      this.$emit('update:first', this.d_first);
      this.$emit('update:rows', this.d_rows);
      this.$emit('page', pageEvent);
    },
    resetPage: function resetPage() {
      this.d_first = 0;
      this.$emit('update:first', this.d_first);
    },
    getFilterColumnHeaderClass: function getFilterColumnHeaderClass(column) {
      return [this.cx('headerCell', {
        column: column
      }), this.columnProp(column, 'filterHeaderClass')];
    },
    onColumnHeaderClick: function onColumnHeaderClick(e) {
      var event = e.originalEvent;
      var column = e.column;
      if (this.columnProp(column, 'sortable')) {
        var targetNode = event.target;
        var columnField = this.columnProp(column, 'sortField') || this.columnProp(column, 'field');
        if (DomHandler.getAttribute(targetNode, 'data-p-sortable-column') === true || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headertitle' || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'sorticon' || DomHandler.getAttribute(targetNode.parentElement, 'data-pc-section') === 'sorticon' || DomHandler.getAttribute(targetNode.parentElement.parentElement, 'data-pc-section') === 'sorticon' || targetNode.closest('[data-p-sortable-column="true"]')) {
          DomHandler.clearSelection();
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
        }
      }
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
    sortSingle: function sortSingle(nodes) {
      return this.sortNodesSingle(nodes);
    },
    sortNodesSingle: function sortNodesSingle(nodes) {
      var _this = this;
      var _nodes = _toConsumableArray(nodes);
      var comparer = ObjectUtils.localeComparator();
      _nodes.sort(function (node1, node2) {
        var value1 = ObjectUtils.resolveFieldData(node1.data, _this.d_sortField);
        var value2 = ObjectUtils.resolveFieldData(node2.data, _this.d_sortField);
        return ObjectUtils.sort(value1, value2, _this.d_sortOrder, comparer);
      });
      return _nodes;
    },
    sortMultiple: function sortMultiple(nodes) {
      return this.sortNodesMultiple(nodes);
    },
    sortNodesMultiple: function sortNodesMultiple(nodes) {
      var _this2 = this;
      var _nodes = _toConsumableArray(nodes);
      _nodes.sort(function (node1, node2) {
        return _this2.multisortField(node1, node2, 0);
      });
      return _nodes;
    },
    multisortField: function multisortField(node1, node2, index) {
      var value1 = ObjectUtils.resolveFieldData(node1.data, this.d_multiSortMeta[index].field);
      var value2 = ObjectUtils.resolveFieldData(node2.data, this.d_multiSortMeta[index].field);
      var comparer = ObjectUtils.localeComparator();
      if (value1 === value2) {
        return this.d_multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, index + 1) : 0;
      }
      return ObjectUtils.sort(value1, value2, this.d_multiSortMeta[index].order, comparer);
    },
    filter: function filter(value) {
      var filteredNodes = [];
      var strict = this.filterMode === 'strict';
      var _iterator = _createForOfIteratorHelper(value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          var copyNode = _objectSpread$1({}, node);
          var localMatch = true;
          var globalMatch = false;
          for (var j = 0; j < this.columns.length; j++) {
            var col = this.columns[j];
            var filterField = this.columnProp(col, 'filterField') || this.columnProp(col, 'field');

            //local
            if (Object.prototype.hasOwnProperty.call(this.filters, filterField)) {
              var filterMatchMode = this.columnProp(col, 'filterMatchMode') || 'startsWith';
              var filterValue = this.filters[filterField];
              var filterConstraint = FilterService.filters[filterMatchMode];
              var paramsWithoutNode = {
                filterField: filterField,
                filterValue: filterValue,
                filterConstraint: filterConstraint,
                strict: strict
              };
              if (strict && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode)) || !strict && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))) {
                localMatch = false;
              }
              if (!localMatch) {
                break;
              }
            }

            //global
            if (this.hasGlobalFilter() && !globalMatch) {
              var copyNodeForGlobal = _objectSpread$1({}, copyNode);
              var _filterValue = this.filters['global'];
              var _filterConstraint = FilterService.filters['contains'];
              var globalFilterParamsWithoutNode = {
                filterField: filterField,
                filterValue: _filterValue,
                filterConstraint: _filterConstraint,
                strict: strict
              };
              if (strict && (this.findFilteredNodes(copyNodeForGlobal, globalFilterParamsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, globalFilterParamsWithoutNode)) || !strict && (this.isFilterMatched(copyNodeForGlobal, globalFilterParamsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, globalFilterParamsWithoutNode))) {
                globalMatch = true;
                copyNode = copyNodeForGlobal;
              }
            }
          }
          var matches = localMatch;
          if (this.hasGlobalFilter()) {
            matches = localMatch && globalMatch;
          }
          if (matches) {
            filteredNodes.push(copyNode);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var filterEvent = this.createLazyLoadEvent(event);
      filterEvent.filteredValue = filteredNodes;
      this.$emit('filter', filterEvent);
      return filteredNodes;
    },
    findFilteredNodes: function findFilteredNodes(node, paramsWithoutNode) {
      if (node) {
        var matched = false;
        if (node.children) {
          var childNodes = _toConsumableArray(node.children);
          node.children = [];
          var _iterator2 = _createForOfIteratorHelper(childNodes),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var childNode = _step2.value;
              var copyChildNode = _objectSpread$1({}, childNode);
              if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                matched = true;
                node.children.push(copyChildNode);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        if (matched) {
          return true;
        }
      }
    },
    isFilterMatched: function isFilterMatched(node, _ref) {
      var filterField = _ref.filterField,
        filterValue = _ref.filterValue,
        filterConstraint = _ref.filterConstraint,
        strict = _ref.strict;
      var matched = false;
      var dataFieldValue = ObjectUtils.resolveFieldData(node.data, filterField);
      if (filterConstraint(dataFieldValue, filterValue, this.filterLocale)) {
        matched = true;
      }
      if (!matched || strict && !this.isNodeLeaf(node)) {
        matched = this.findFilteredNodes(node, {
          filterField: filterField,
          filterValue: filterValue,
          filterConstraint: filterConstraint,
          strict: strict
        }) || matched;
      }
      return matched;
    },
    isNodeSelected: function isNodeSelected(node) {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.nodeKey(node)] === true : false;
    },
    isNodeLeaf: function isNodeLeaf(node) {
      return node.leaf === false ? false : !(node.children && node.children.length);
    },
    createLazyLoadEvent: function createLazyLoadEvent(event) {
      var _this3 = this;
      var filterMatchModes;
      if (this.hasFilters()) {
        filterMatchModes = {};
        this.columns.forEach(function (col) {
          if (_this3.columnProp(col, 'field')) {
            filterMatchModes[col.props.field] = _this3.columnProp(col, 'filterMatchMode');
          }
        });
      }
      return {
        originalEvent: event,
        first: this.d_first,
        rows: this.d_rows,
        sortField: this.d_sortField,
        sortOrder: this.d_sortOrder,
        multiSortMeta: this.d_multiSortMeta,
        filters: this.filters,
        filterMatchModes: filterMatchModes
      };
    },
    onColumnResizeStart: function onColumnResizeStart(event) {
      var containerLeft = DomHandler.getOffset(this.$el).left;
      this.resizeColumnElement = event.target.parentElement;
      this.columnResizing = true;
      this.lastResizeHelperX = event.pageX - containerLeft + this.$el.scrollLeft;
      this.bindColumnResizeEvents();
    },
    onColumnResize: function onColumnResize(event) {
      var containerLeft = DomHandler.getOffset(this.$el).left;
      this.$el.setAttribute('data-p-unselectable-text', 'true');
      !this.isUnstyled && DomHandler.addClass(this.$el, 'p-unselectable-text');
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
            if (!this.scrollable) {
              this.resizeColumnElement.style.width = newColumnWidth + 'px';
              if (nextColumn) {
                nextColumn.style.width = nextColumnWidth + 'px';
              }
            } else {
              this.resizeTableCells(newColumnWidth, nextColumnWidth);
            }
          }
        } else if (this.columnResizeMode === 'expand') {
          this.$refs.table.style.width = this.$refs.table.offsetWidth + delta + 'px';
          if (!this.scrollable) this.resizeColumnElement.style.width = newColumnWidth + 'px';else this.resizeTableCells(newColumnWidth);
        }
        this.$emit('column-resize-end', {
          element: this.resizeColumnElement,
          delta: delta
        });
      }
      this.$refs.resizeHelper.style.display = 'none';
      this.resizeColumn = null;
      this.$el.removeAttribute('data-p-unselectable-text');
      !this.isUnstyled && DomHandler.removeClass(this.$el, 'p-unselectable-text');
      this.unbindColumnResizeEvents();
    },
    resizeTableCells: function resizeTableCells(newColumnWidth, nextColumnWidth) {
      var colIndex = DomHandler.index(this.resizeColumnElement);
      var children = this.$refs.table.children;
      var _iterator3 = _createForOfIteratorHelper(children),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;
          var _iterator4 = _createForOfIteratorHelper(child.children),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var row = _step4.value;
              var resizeCell = row.children[colIndex];
              resizeCell.style.flex = '0 0 ' + newColumnWidth + 'px';
              if (this.columnResizeMode === 'fit') {
                var nextCell = resizeCell.nextElementSibling;
                if (nextCell) {
                  nextCell.style.flex = '0 0 ' + nextColumnWidth + 'px';
                }
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    bindColumnResizeEvents: function bindColumnResizeEvents() {
      var _this4 = this;
      if (!this.documentColumnResizeListener) {
        this.documentColumnResizeListener = document.addEventListener('mousemove', function (event) {
          if (_this4.columnResizing) {
            _this4.onColumnResize(event);
          }
        });
      }
      if (!this.documentColumnResizeEndListener) {
        this.documentColumnResizeEndListener = document.addEventListener('mouseup', function () {
          if (_this4.columnResizing) {
            _this4.columnResizing = false;
            _this4.onColumnResizeEnd();
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
    onColumnKeyDown: function onColumnKeyDown(event, col) {
      if ((event.code === 'Enter' || event.code === 'NumpadEnter') && event.currentTarget.nodeName === 'TH' && DomHandler.getAttribute(event.currentTarget, 'data-p-sortable-column')) {
        this.onColumnHeaderClick(event, col);
      }
    },
    hasColumnFilter: function hasColumnFilter() {
      if (this.columns) {
        var _iterator5 = _createForOfIteratorHelper(this.columns),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var col = _step5.value;
            if (col.children && col.children.filter) {
              return true;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      return false;
    },
    hasFilters: function hasFilters() {
      return this.filters && Object.keys(this.filters).length > 0 && this.filters.constructor === Object;
    },
    hasGlobalFilter: function hasGlobalFilter() {
      return this.filters && Object.prototype.hasOwnProperty.call(this.filters, 'global');
    },
    updateScrollWidth: function updateScrollWidth() {
      this.$refs.table.style.width = this.$refs.table.scrollWidth + 'px';
    },
    getItemLabel: function getItemLabel(node) {
      return node.data.name;
    },
    setTabindex: function setTabindex(node, index) {
      if (this.isNodeSelected(node)) {
        this.hasASelectedNode = true;
        return 0;
      }
      if (this.selectionMode) {
        if (!this.isNodeSelected(node) && index === 0 && !this.hasASelectedNode) return 0;
      } else if (!this.selectionMode && index === 0) {
        return 0;
      }
      return -1;
    }
  },
  computed: {
    columns: function columns() {
      return this.d_columns.get(this);
    },
    processedData: function processedData() {
      if (this.lazy) {
        return this.value;
      } else {
        if (this.value && this.value.length) {
          var data = this.value;
          if (this.sorted) {
            if (this.sortMode === 'single') data = this.sortSingle(data);else if (this.sortMode === 'multiple') data = this.sortMultiple(data);
          }
          if (this.hasFilters()) {
            data = this.filter(data);
          }
          return data;
        } else {
          return null;
        }
      }
    },
    dataToRender: function dataToRender() {
      var data = this.processedData;
      if (this.paginator) {
        var first = this.lazy ? 0 : this.d_first;
        return data.slice(first, first + this.d_rows);
      } else {
        return data;
      }
    },
    empty: function empty() {
      var data = this.processedData;
      return !data || data.length === 0;
    },
    sorted: function sorted() {
      return this.d_sortField || this.d_multiSortMeta && this.d_multiSortMeta.length > 0;
    },
    hasFooter: function hasFooter() {
      var hasFooter = false;
      var _iterator6 = _createForOfIteratorHelper(this.columns),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var col = _step6.value;
          if (this.columnProp(col, 'footer') || col.children && col.children.footer) {
            hasFooter = true;
            break;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return hasFooter;
    },
    paginatorTop: function paginatorTop() {
      return this.paginator && (this.paginatorPosition !== 'bottom' || this.paginatorPosition === 'both');
    },
    paginatorBottom: function paginatorBottom() {
      return this.paginator && (this.paginatorPosition !== 'top' || this.paginatorPosition === 'both');
    },
    singleSelectionMode: function singleSelectionMode() {
      return this.selectionMode && this.selectionMode === 'single';
    },
    multipleSelectionMode: function multipleSelectionMode() {
      return this.selectionMode && this.selectionMode === 'multiple';
    },
    rowSelectionMode: function rowSelectionMode() {
      return this.singleSelectionMode || this.multipleSelectionMode;
    },
    totalRecordsLength: function totalRecordsLength() {
      if (this.lazy) {
        return this.totalRecords;
      } else {
        var data = this.processedData;
        return data ? data.length : 0;
      }
    }
  },
  components: {
    TTRow: script$1,
    TTPaginator: Paginator,
    TTHeaderCell: script$3,
    TTFooterCell: script$4,
    SpinnerIcon: SpinnerIcon
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["colspan"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TTPaginator = resolveComponent("TTPaginator");
  var _component_TTHeaderCell = resolveComponent("TTHeaderCell");
  var _component_TTRow = resolveComponent("TTRow");
  var _component_TTFooterCell = resolveComponent("TTFooterCell");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    "data-scrollselectors": ".p-treetable-scrollable-body",
    role: "table"
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default"), _ctx.loading && _ctx.loadingMode === 'mask' ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('loadingWrapper')
  }, _ctx.ptm('loadingWrapper')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('loadingOverlay')
  }, _ctx.ptm('loadingOverlay')), [renderSlot(_ctx.$slots, "loadingicon", {
    "class": normalizeClass(_ctx.cx('loadingIcon'))
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon ? 'span' : 'SpinnerIcon'), mergeProps({
      spin: "",
      "class": [_ctx.cx('loadingIcon'), _ctx.loadingIcon]
    }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
  })], 16)], 16)) : createCommentVNode("", true), _ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), $options.paginatorTop ? (openBlock(), createBlock(_component_TTPaginator, {
    key: 2,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx('paginator')),
    onPage: _cache[0] || (_cache[0] = function ($event) {
      return $options.onPage($event);
    }),
    alwaysShow: _ctx.alwaysShowPaginator,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('paginator')
  }, createSlots({
    _: 2
  }, [_ctx.$slots.paginatorstart ? {
    name: "start",
    fn: withCtx(function () {
      return [renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "0"
  } : undefined, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: withCtx(function () {
      return [renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "1"
  } : undefined, _ctx.$slots.paginatorfirstpagelinkicon ? {
    name: "firstpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "2"
  } : undefined, _ctx.$slots.paginatorprevpagelinkicon ? {
    name: "prevpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorprevpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "3"
  } : undefined, _ctx.$slots.paginatornextpagelinkicon ? {
    name: "nextpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatornextpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "4"
  } : undefined, _ctx.$slots.paginatorlastpagelinkicon ? {
    name: "lastpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorlastpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "5"
  } : undefined, _ctx.$slots.paginatorjumptopagedropdownicon ? {
    name: "jumptopagedropdownicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorjumptopagedropdownicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "6"
  } : undefined, _ctx.$slots.paginatorrowsperpagedropdownicon ? {
    name: "rowsperpagedropdownicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorrowsperpagedropdownicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "7"
  } : undefined]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('wrapper'),
    style: {
      maxHeight: _ctx.scrollHeight
    }
  }, _ctx.ptm('wrapper')), [createElementVNode("table", mergeProps({
    ref: "table",
    role: "table"
  }, _objectSpread(_objectSpread({}, _ctx.tableProps), _ctx.ptm('table'))), [createElementVNode("thead", mergeProps({
    "class": _ctx.cx('thead'),
    role: "rowgroup"
  }, _ctx.ptm('thead')), [createElementVNode("tr", mergeProps({
    role: "row"
  }, _ctx.ptm('headerRow')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') ? (openBlock(), createBlock(_component_TTHeaderCell, {
      key: 0,
      column: col,
      resizableColumns: _ctx.resizableColumns,
      sortField: $data.d_sortField,
      sortOrder: $data.d_sortOrder,
      multiSortMeta: $data.d_multiSortMeta,
      sortMode: _ctx.sortMode,
      onColumnClick: $options.onColumnHeaderClick,
      onColumnResizestart: $options.onColumnResizeStart,
      index: i,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["column", "resizableColumns", "sortField", "sortOrder", "multiSortMeta", "sortMode", "onColumnClick", "onColumnResizestart", "index", "unstyled", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16), $options.hasColumnFilter() ? (openBlock(), createElementBlock("tr", normalizeProps(mergeProps({
    key: 0
  }, _ctx.ptm('headerRow'))), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') ? (openBlock(), createElementBlock("th", mergeProps({
      key: 0,
      "class": $options.getFilterColumnHeaderClass(col),
      style: [$options.columnProp(col, 'style'), $options.columnProp(col, 'filterHeaderStyle')]
    }, _ctx.ptm('headerCell', $options.ptHeaderCellOptions(col))), [col.children && col.children.filter ? (openBlock(), createBlock(resolveDynamicComponent(col.children.filter), {
      key: 0,
      column: col,
      index: i
    }, null, 8, ["column", "index"])) : createCommentVNode("", true)], 16)) : createCommentVNode("", true)], 64);
  }), 128))], 16)) : createCommentVNode("", true)], 16), createElementVNode("tbody", mergeProps({
    "class": _ctx.cx('tbody'),
    role: "rowgroup"
  }, _ctx.ptm('tbody')), [!$options.empty ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($options.dataToRender, function (node, index) {
    return openBlock(), createBlock(_component_TTRow, {
      key: $options.nodeKey(node),
      dataKey: _ctx.dataKey,
      columns: $options.columns,
      node: node,
      level: 0,
      expandedKeys: $data.d_expandedKeys,
      indentation: _ctx.indentation,
      selectionMode: _ctx.selectionMode,
      selectionKeys: _ctx.selectionKeys,
      ariaSetSize: $options.dataToRender.length,
      ariaPosInset: index + 1,
      tabindex: $options.setTabindex(node, index),
      loadingMode: _ctx.loadingMode,
      templates: _ctx.$slots,
      onNodeToggle: $options.onNodeToggle,
      onNodeClick: $options.onNodeClick,
      onCheckboxChange: $options.onCheckboxChange,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["dataKey", "columns", "node", "expandedKeys", "indentation", "selectionMode", "selectionKeys", "ariaSetSize", "ariaPosInset", "tabindex", "loadingMode", "templates", "onNodeToggle", "onNodeClick", "onCheckboxChange", "unstyled", "pt"]);
  }), 128)) : (openBlock(), createElementBlock("tr", mergeProps({
    key: 1,
    "class": _ctx.cx('emptyMessage')
  }, _ctx.ptm('emptyMessage')), [createElementVNode("td", mergeProps({
    colspan: $options.columns.length
  }, _ctx.ptm('emptyMessageCell')), [renderSlot(_ctx.$slots, "empty")], 16, _hoisted_1)], 16))], 16), $options.hasFooter ? (openBlock(), createElementBlock("tfoot", mergeProps({
    key: 0,
    "class": _ctx.cx('tfoot'),
    role: "rowgroup"
  }, _ctx.ptm('tfoot')), [createElementVNode("tr", mergeProps({
    role: "row"
  }, _ctx.ptm('footerRow')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') ? (openBlock(), createBlock(_component_TTFooterCell, {
      key: 0,
      column: col,
      index: i,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["column", "index", "unstyled", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16)], 16)) : createCommentVNode("", true)], 16)], 16), $options.paginatorBottom ? (openBlock(), createBlock(_component_TTPaginator, {
    key: 3,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx('paginator')),
    onPage: _cache[1] || (_cache[1] = function ($event) {
      return $options.onPage($event);
    }),
    alwaysShow: _ctx.alwaysShowPaginator,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('paginator')
  }, createSlots({
    _: 2
  }, [_ctx.$slots.paginatorstart ? {
    name: "start",
    fn: withCtx(function () {
      return [renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "0"
  } : undefined, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: withCtx(function () {
      return [renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "1"
  } : undefined, _ctx.$slots.paginatorfirstpagelinkicon ? {
    name: "firstpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "2"
  } : undefined, _ctx.$slots.paginatorprevpagelinkicon ? {
    name: "prevpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorprevpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "3"
  } : undefined, _ctx.$slots.paginatornextpagelinkicon ? {
    name: "nextpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatornextpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "4"
  } : undefined, _ctx.$slots.paginatorlastpagelinkicon ? {
    name: "lastpagelinkicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorlastpagelinkicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "5"
  } : undefined, _ctx.$slots.paginatorjumptopagedropdownicon ? {
    name: "jumptopagedropdownicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorjumptopagedropdownicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "6"
  } : undefined, _ctx.$slots.paginatorrowsperpagedropdownicon ? {
    name: "rowsperpagedropdownicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorrowsperpagedropdownicon", {
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "7"
  } : undefined]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : createCommentVNode("", true), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 4,
    "class": _ctx.cx('footer')
  }, _ctx.ptm('footer')), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    ref: "resizeHelper",
    "class": _ctx.cx('resizeHelper'),
    style: {
      "display": "none"
    }
  }, _ctx.ptm('resizeHelper')), null, 16)], 16);
}

script.render = render;

export { script as default };
