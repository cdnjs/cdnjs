import { defineComponent, resolveComponent, createElementBlock, openBlock, createElementVNode, createBlock, withCtx, Fragment, renderList, createTextVNode, createCommentVNode, toDisplayString, withDirectives, vShow, createVNode, normalizeClass, renderSlot, h, toHandlerKey, camelize, toRaw, mergeProps, normalizeStyle, withKeys, withModifiers, Transition } from 'vue';
import { getValueByPath, toCssWidth, removeElement, translateTouchAsDragEvent, isFragment, escapeRegExpChars, removeDiacriticsFromString, indexOf, multiColumnSort, isNil, createAbsoluteElement } from './helpers.js';
import { B as BPagination, d as debounce } from './Pagination-B-LAJQay.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { B as BCheckbox } from './Checkbox-KUMz0sfA.js';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { B as BInput } from './Input-C4L520az.js';
import { B as BLoading } from './Loading-tuQoo6TU.js';
import { B as BSlotComponent } from './SlotComponent-BwNpVnfH.js';
import { B as BSelect } from './Select-bl4qUzij.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './config-CKuo-p6e.js';
import './CheckRadioMixin-DSD_rjC8.js';
import './FormElementMixin-Dd_wkBN5.js';
import './ssr-C7yEpGLm.js';

var _sfc_main$3 = defineComponent({
  name: "BTableMobileSort",
  components: {
    BSelect,
    BIcon
  },
  props: {
    currentSortColumn: Object,
    sortMultipleData: Array,
    isAsc: Boolean,
    columns: Array,
    placeholder: String,
    iconPack: String,
    sortIcon: {
      type: String,
      default: "arrow-up"
    },
    sortIconSize: {
      type: String,
      default: "is-small"
    },
    sortMultiple: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    removePriority: (_column) => true,
    sort: (_column, _event) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      sortMultipleSelect: null,
      sortMultipleSelectIndex: -1,
      mobileSort: this.currentSortColumn,
      mobileSortIndex: this.columns ? this.columns.indexOf(this.currentSortColumn) : -1,
      defaultEvent: {
        shiftKey: true,
        altKey: true,
        ctrlKey: true
      },
      ignoreSort: false
    };
  },
  computed: {
    showPlaceholder() {
      return !this.columns || !this.columns.some((column) => column === this.mobileSort);
    },
    sortableColumns() {
      return this.columns && this.columns.filter((column) => column.sortable);
    }
  },
  watch: {
    sortMultipleSelect(column) {
      if (this.ignoreSort) {
        this.ignoreSort = false;
      } else {
        this.$emit("sort", column, this.defaultEvent);
      }
    },
    sortMultipleSelectIndex(index) {
      if (index !== -1) {
        this.sortMultipleSelect = this.columns[index];
      } else {
        this.sortMultipleSelect = null;
      }
    },
    mobileSort(column) {
      if (this.currentSortColumn === column) return;
      this.$emit("sort", column, this.defaultEvent);
    },
    mobileSortIndex(index) {
      if (index !== -1) {
        this.mobileSort = this.columns[index];
      }
    },
    currentSortColumn(column) {
      this.mobileSort = column;
      this.mobileSortIndex = this.columns ? this.columns.indexOf(column) : -1;
    },
    columns(newColumns) {
      if (this.sortMultiple) {
        this.sortMultipleSelectIndex = newColumns.indexOf(
          this.sortMultipleSelect
        );
      } else {
        this.mobileSortIndex = newColumns.indexOf(this.mobileSort);
      }
    }
  },
  methods: {
    removePriority() {
      this.$emit("removePriority", this.sortMultipleSelect);
      this.ignoreSort = true;
      const remainingFields = this.sortMultipleData.filter((data) => data.field !== this.sortMultipleSelect.field).map((data) => data.field);
      this.sortMultipleSelectIndex = this.columns.findIndex((column) => remainingFields.includes(column.field));
    },
    getSortingObjectOfColumn(column) {
      return this.sortMultipleData.filter((i) => i.field === column.field)[0];
    },
    columnIsDesc(column) {
      const sortingObject = column && this.getSortingObjectOfColumn(column);
      if (sortingObject) {
        return !!(sortingObject.order && sortingObject.order === "desc");
      }
      return true;
    },
    getLabel(column) {
      const sortingObject = this.getSortingObjectOfColumn(column);
      if (sortingObject) {
        return column.label + "(" + (this.sortMultipleData.indexOf(sortingObject) + 1) + ")";
      }
      return column.label;
    },
    sort() {
      this.$emit("sort", this.sortMultiple ? this.sortMultipleSelect : this.mobileSort, this.defaultEvent);
    }
  }
});

const _hoisted_1$2 = { class: "field table-mobile-sort" };
const _hoisted_2$2 = { class: "field has-addons" };
const _hoisted_3$2 = ["value"];
const _hoisted_4$2 = ["value"];
const _hoisted_5$1 = { class: "control" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_select = resolveComponent("b-select");
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("div", _hoisted_2$2, [
      _ctx.sortMultiple ? (openBlock(), createBlock(_component_b_select, {
        key: 0,
        modelValue: _ctx.sortMultipleSelectIndex,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.sortMultipleSelectIndex = $event),
        expanded: ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.sortableColumns, (column, index) => {
              return openBlock(), createElementBlock("option", {
                key: index,
                value: index
              }, [
                createTextVNode(
                  toDisplayString(_ctx.getLabel(column)) + " ",
                  1
                  /* TEXT */
                ),
                _ctx.getSortingObjectOfColumn(column) ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    _ctx.columnIsDesc(column) ? (openBlock(), createElementBlock(
                      Fragment,
                      { key: 0 },
                      [
                        createTextVNode(" ↓ ")
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (openBlock(), createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createTextVNode(" ↑ ")
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : createCommentVNode("v-if", true)
              ], 8, _hoisted_3$2);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])) : (openBlock(), createBlock(_component_b_select, {
        key: 1,
        modelValue: _ctx.mobileSortIndex,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.mobileSortIndex = $event),
        expanded: ""
      }, {
        default: withCtx(() => [
          _ctx.placeholder ? withDirectives((openBlock(), createElementBlock(
            "option",
            {
              key: 0,
              value: {},
              selected: "",
              disabled: "",
              hidden: ""
            },
            toDisplayString(_ctx.placeholder),
            513
            /* TEXT, NEED_PATCH */
          )), [
            [vShow, _ctx.showPlaceholder]
          ]) : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.sortableColumns, (column, index) => {
              return openBlock(), createElementBlock("option", {
                key: index,
                value: index
              }, toDisplayString(column.label), 9, _hoisted_4$2);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])),
      createElementVNode("div", _hoisted_5$1, [
        _ctx.sortMultiple && _ctx.sortMultipleData.length > 0 ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            createElementVNode("button", {
              class: "button is-primary",
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.sort && _ctx.sort(...args))
            }, [
              createVNode(_component_b_icon, {
                class: normalizeClass({ "is-desc": _ctx.columnIsDesc(_ctx.sortMultipleSelect) }),
                icon: _ctx.sortIcon,
                pack: _ctx.iconPack,
                size: _ctx.sortIconSize,
                both: ""
              }, null, 8, ["class", "icon", "pack", "size"])
            ]),
            createElementVNode("button", {
              class: "button is-primary",
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.removePriority && _ctx.removePriority(...args))
            }, [
              createVNode(_component_b_icon, {
                icon: "delete",
                size: _ctx.sortIconSize,
                both: ""
              }, null, 8, ["size"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        )) : !_ctx.sortMultiple ? (openBlock(), createElementBlock("button", {
          key: 1,
          class: "button is-primary",
          onClick: _cache[4] || (_cache[4] = (...args) => _ctx.sort && _ctx.sort(...args))
        }, [
          withDirectives(createVNode(_component_b_icon, {
            class: normalizeClass({ "is-desc": !_ctx.isAsc }),
            icon: _ctx.sortIcon,
            pack: _ctx.iconPack,
            size: _ctx.sortIconSize,
            both: ""
          }, null, 8, ["class", "icon", "pack", "size"]), [
            [vShow, _ctx.currentSortColumn === _ctx.mobileSort]
          ])
        ])) : createCommentVNode("v-if", true)
      ])
    ])
  ]);
}
var BTableMobileSort = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);

var _sfc_main$2 = defineComponent({
  name: "BTablePagination",
  components: {
    BPagination
  },
  props: {
    paginated: Boolean,
    total: [Number, String],
    perPage: [Number, String],
    currentPage: [Number, String],
    paginationSimple: Boolean,
    paginationSize: String,
    rounded: Boolean,
    iconPack: String,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    pageInput: Boolean,
    paginationOrder: String,
    pageInputPosition: String,
    debouncePageInput: [Number, String]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "page-change": (_page) => true,
    "update:currentPage": (_page) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newCurrentPage: this.currentPage
    };
  },
  watch: {
    currentPage(newVal) {
      this.newCurrentPage = newVal;
    }
  },
  methods: {
    /*
    * Paginator change listener.
    */
    pageChanged(page) {
      this.newCurrentPage = page > 0 ? page : 1;
      this.$emit("update:currentPage", this.newCurrentPage);
      this.$emit("page-change", this.newCurrentPage);
    }
  }
});

const _hoisted_1$1 = { class: "top level" };
const _hoisted_2$1 = { class: "level-left" };
const _hoisted_3$1 = { class: "level-right" };
const _hoisted_4$1 = {
  key: 0,
  class: "level-item"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_pagination = resolveComponent("b-pagination");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createElementVNode("div", _hoisted_3$1, [
      _ctx.paginated ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
        createVNode(_component_b_pagination, {
          "icon-pack": _ctx.iconPack,
          total: _ctx.total,
          "per-page": _ctx.perPage,
          simple: _ctx.paginationSimple,
          size: _ctx.paginationSize,
          "model-value": _ctx.newCurrentPage,
          rounded: _ctx.rounded,
          onChange: _ctx.pageChanged,
          "aria-next-label": _ctx.ariaNextLabel,
          "aria-previous-label": _ctx.ariaPreviousLabel,
          "aria-page-label": _ctx.ariaPageLabel,
          "aria-current-label": _ctx.ariaCurrentLabel,
          "page-input": _ctx.pageInput,
          order: _ctx.paginationOrder,
          "page-input-position": _ctx.pageInputPosition,
          "debounce-page-input": _ctx.debouncePageInput
        }, null, 8, ["icon-pack", "total", "per-page", "simple", "size", "model-value", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "order", "page-input-position", "debounce-page-input"])
      ])) : createCommentVNode("v-if", true)
    ])
  ]);
}
var BTablePagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function mockTableColumn(table, column) {
  const defaultProps = {
    label: void 0,
    customKey: void 0,
    field: void 0,
    meta: void 0,
    width: void 0,
    numeric: void 0,
    centered: void 0,
    searchable: void 0,
    sortable: void 0,
    visible: true,
    subheading: void 0,
    customSort: void 0,
    customSearch: void 0,
    sticky: void 0,
    headerSelectable: void 0,
    headerClass: void 0,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    thAttrs: () => ({}),
    tdAttrs: () => ({})
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
  return __spreadProps(__spreadValues(__spreadValues({}, defaultProps), column), {
    // data
    newKey: column.customKey || column.label,
    _isTableColumn: true,
    // public computed
    get thClasses() {
      const attrs = this.thAttrs(this);
      const classes = [this.headerClass, {
        "is-sortable": this.sortable,
        "is-sticky": this.sticky,
        "is-unselectable": this.isHeaderUnSelectable
      }];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    get thStyle() {
      const attrs = this.thAttrs(this);
      const style = [this.style];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    },
    get thWrapStyle() {
      return this.style;
    },
    get style() {
      var _a;
      return {
        width: (_a = toCssWidth(this.width)) != null ? _a : void 0
        // null → undefined to satisfy StyleValue
      };
    },
    getRootClasses(row) {
      const attrs = this.tdAttrs(row, this);
      const classes = [this.rootClasses];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    getRootStyle(row) {
      const attrs = this.tdAttrs(row, this);
      const style = [];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    },
    $slots: {
      default: (props) => {
        const vnode = h("span", {
          innerHTML: getValueByPath(props.row, column.field)
        });
        return [vnode];
      }
    },
    // private properties
    get rootClasses() {
      return [this.cellClass, {
        "has-text-right": this.numeric && !this.centered,
        "has-text-centered": this.centered,
        "is-sticky": this.sticky
      }];
    },
    get isHeaderUnSelectable() {
      return !this.headerSelectable && !!this.sortable;
    }
  });
}

const BLANK_COLUMN = {
  thAttrs: () => ({}),
  tdAttrs: () => ({}),
  getRootClasses: () => [],
  getRootStyle: () => void 0,
  $slots: {}
};
var _sfc_main$1 = defineComponent({
  name: "BTable",
  components: {
    BCheckbox,
    BIcon,
    BInput,
    BLoading,
    BSlotComponent,
    BTableMobileSort,
    BTablePagination
  },
  mixins: [CompatFallthroughMixin],
  provide() {
    return {
      $table: this
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    bordered: Boolean,
    striped: Boolean,
    narrowed: Boolean,
    hoverable: Boolean,
    loading: Boolean,
    detailed: Boolean,
    checkable: Boolean,
    headerCheckable: {
      type: Boolean,
      default: true
    },
    checkboxType: {
      type: String,
      default: "is-primary"
    },
    checkboxPosition: {
      type: String,
      default: "left",
      validator: (value) => {
        return [
          "left",
          "right"
        ].indexOf(value) >= 0;
      }
    },
    stickyCheckbox: {
      type: Boolean,
      default: false
    },
    selected: Object,
    isRowSelectable: {
      type: Function,
      default: () => true
    },
    focusable: Boolean,
    customIsChecked: Function,
    isRowCheckable: {
      type: Function,
      default: () => true
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    mobileCards: {
      type: Boolean,
      default: true
    },
    defaultSort: [String, Array],
    defaultSortDirection: {
      type: String,
      default: "asc"
    },
    sortIcon: {
      type: String,
      default: "arrow-up"
    },
    sortIconSize: {
      type: String,
      default: "is-small"
    },
    sortMultiple: {
      type: Boolean,
      default: false
    },
    sortMultipleData: {
      type: Array,
      default: () => []
    },
    sortMultipleKey: {
      type: String,
      default: null
    },
    paginated: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: [Number, String],
      default: 20
    },
    showDetailIcon: {
      type: Boolean,
      default: true
    },
    detailIcon: {
      type: String,
      default: "chevron-right"
    },
    paginationPosition: {
      type: String,
      default: "bottom",
      validator: (value) => {
        return [
          "bottom",
          "top",
          "both"
        ].indexOf(value) >= 0;
      }
    },
    paginationRounded: Boolean,
    backendSorting: Boolean,
    backendFiltering: Boolean,
    rowClass: {
      type: Function,
      default: () => ""
    },
    openedDetailed: {
      type: Array,
      default: () => []
    },
    hasDetailedVisible: {
      type: Function,
      default: () => true
    },
    detailKey: {
      type: String,
      default: ""
    },
    detailTransition: {
      type: String,
      default: ""
    },
    customDetailRow: {
      type: Boolean,
      default: false
    },
    backendPagination: Boolean,
    total: {
      type: [Number, String],
      default: 0
    },
    iconPack: String,
    mobileSortPlaceholder: String,
    customRowKey: String,
    draggable: {
      type: Boolean,
      default: false
    },
    draggableColumn: {
      type: Boolean,
      default: false
    },
    scrollable: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    stickyHeader: Boolean,
    height: [Number, String],
    filtersEvent: {
      type: String,
      default: ""
    },
    cardLayout: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    debounceSearch: Number,
    caption: String,
    showCaption: {
      type: Boolean,
      default: true
    },
    pageInput: {
      type: Boolean,
      default: false
    },
    paginationOrder: String,
    pageInputPosition: String,
    debouncePageInput: [Number, String]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    cellclick: (_row, _column, _rowIndex, _colIndex) => true,
    check: (_checkedRows, _row) => true,
    "check-all": (_rows) => true,
    click: (_row) => true,
    columndragend: (_event) => true,
    columndragleave: (_event) => true,
    columndragover: (_event) => true,
    columndragstart: (_event) => true,
    columndrop: (_event) => true,
    contextmenu: (_row, _event) => true,
    dblclick: (_row) => true,
    "details-close": (_row) => true,
    "details-open": (_row) => true,
    dragend: (_event) => true,
    dragleave: (_event) => true,
    dragover: (_event) => true,
    dragstart: (_event) => true,
    drop: (_event) => true,
    "filters-change": (_value) => true,
    "page-change": (_page) => true,
    select: (_new, _old) => true,
    sort: (_field, _order, _event) => true,
    "sorting-priority-removed": (_field) => true,
    "update:checkedRows": (_rows) => true,
    "update:currentPage": (_page) => true,
    "update:openedDetailed": (_rows) => true,
    "update:selected": (_row) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      sortMultipleDataLocal: [],
      getValueByPath,
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: [...this.checkedRows],
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: true,
      filters: {},
      defaultSlots: [],
      firstTimeSort: true,
      // Used by first time initSort
      isDraggingRow: false,
      isDraggingColumn: false,
      debouncedHandleFiltersChange: void 0,
      // for touch-enabled devices
      _selectedRow: null,
      mayBeTouchDragging: false,
      touchDragoverTarget: null,
      _draggedCellEl: void 0,
      draggedCellContent: ""
    };
  },
  computed: {
    sortMultipleDataComputed() {
      return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal;
    },
    tableClasses() {
      return {
        "is-bordered": this.bordered,
        "is-striped": this.striped,
        "is-narrow": this.narrowed,
        "is-hoverable": (this.hoverable || this.focusable) && this.visibleData.length
      };
    },
    tableWrapperClasses() {
      return {
        "has-mobile-cards": this.mobileCards,
        "has-sticky-header": this.stickyHeader,
        "is-card-list": this.cardLayout,
        "table-container": this.isScrollable
      };
    },
    tableStyle() {
      return {
        height: toCssWidth(this.height)
      };
    },
    touchDraggedCellClasses() {
      return {
        "has-mobile-cards": this.mobileCards
      };
    },
    /*
    * Splitted data based on the pagination.
    */
    visibleData() {
      if (!this.paginated) return this.newData;
      const currentPage = this.newCurrentPage;
      const perPage = +this.perPage;
      if (this.newData.length <= perPage) {
        return this.newData;
      } else {
        const start = (currentPage - 1) * perPage;
        const end = parseInt(start + "", 10) + parseInt(perPage + "", 10);
        return this.newData.slice(start, end);
      }
    },
    visibleColumns() {
      if (!this.newColumns) return this.newColumns;
      return this.newColumns.filter((column) => {
        return column.visible || column.visible === void 0;
      });
    },
    /*
    * Check if all rows in the page are checked.
    */
    isAllChecked() {
      const validVisibleData = this.visibleData.filter(
        (row) => this.isRowCheckable(row)
      );
      if (validVisibleData.length === 0) return false;
      const isAllChecked = validVisibleData.some((currentVisibleRow) => {
        return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0;
      });
      return !isAllChecked;
    },
    /*
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable() {
      const validVisibleData = this.visibleData.filter(
        (row) => this.isRowCheckable(row)
      );
      return validVisibleData.length === 0;
    },
    /*
    * Check if has any sortable column.
    */
    hasSortablenewColumns() {
      return this.newColumns.some((column) => {
        return column.sortable;
      });
    },
    /*
    * Check if has any searchable column.
    */
    hasSearchablenewColumns() {
      return this.newColumns.some((column) => {
        return column.searchable;
      });
    },
    /*
    * Check if has any column using subheading.
    */
    hasCustomSubheadings() {
      if (this.$slots && this.$slots.subheading) return true;
      return this.newColumns.some((column) => {
        return column.subheading || column.$slots.subheading;
      });
    },
    /*
    * Return total column count based if it's checkable or expanded
    */
    columnCount() {
      let count = this.visibleColumns.length;
      count += this.checkable ? 1 : 0;
      count += this.detailed && this.showDetailIcon ? 1 : 0;
      return count;
    },
    /*
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon() {
      return this.detailed && this.showDetailIcon;
    },
    /*
    * return if scrollable table
    */
    isScrollable() {
      if (this.scrollable) return true;
      if (!this.newColumns) return false;
      return this.newColumns.some((column) => {
        return column.sticky;
      });
    },
    newColumns() {
      if (this.columns && this.columns.length) {
        return this.columns.map((column) => {
          return mockTableColumn(this, column);
        });
      }
      return this.defaultSlots;
    },
    canDragRow() {
      return this.draggable && !this.isDraggingColumn;
    },
    canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow;
    }
  },
  watch: {
    /*
    * When data prop change:
    *   1. Update internal value.
    *   2. Filter data if it's not backend-filtered.
    *   3. Sort again if it's not backend-sorted.
    *   4. Set new total if it's not backend-paginated.
    */
    data(value) {
      this.newData = value;
      if (!this.backendFiltering) {
        this.newData = value.filter(
          (row) => this.isRowFiltered(row)
        );
      }
      if (!this.backendSorting) {
        this.sort(this.currentSortColumn, true);
      }
      if (!this.backendPagination) {
        this.newDataTotal = this.newData.length;
      }
    },
    /*
    * When Pagination total change, update internal total
    * only if it's backend-paginated.
    */
    total(newTotal) {
      if (!this.backendPagination) return;
      this.newDataTotal = newTotal;
    },
    currentPage(newVal) {
      this.newCurrentPage = newVal;
    },
    newCurrentPage(newVal) {
      this.$emit("update:currentPage", newVal);
    },
    /*
    * When checkedRows prop change, update internal value without
    * mutating original data.
    */
    checkedRows(rows) {
      this.newCheckedRows = [...rows];
    },
    debounceSearch: {
      handler(value) {
        this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
      },
      immediate: true
    },
    filters: {
      handler(value) {
        if (this.debounceSearch) {
          this.debouncedHandleFiltersChange(value);
        } else {
          this.handleFiltersChange(value);
        }
      },
      deep: true
    },
    /*
    * When the user wants to control the detailed rows via props.
    * Or wants to open the details of certain row with the router for example.
    */
    openedDetailed(expandedRows) {
      this.visibleDetailRows = expandedRows;
    }
  },
  methods: {
    onFiltersEvent(event) {
      this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
    },
    handleFiltersChange(value) {
      if (this.backendFiltering) {
        this.$emit("filters-change", value);
      } else {
        this.newData = this.data.filter(
          (row) => this.isRowFiltered(row)
        );
        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length;
        }
        if (!this.backendSorting) {
          if (this.sortMultiple && this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
            this.doSortMultiColumn();
          } else if (Object.keys(this.currentSortColumn).length > 0) {
            this.doSortSingleColumn(this.currentSortColumn);
          }
        }
      }
    },
    findIndexOfSortData(column) {
      const sortObj = this.sortMultipleDataComputed.filter((i) => i.field === column.field)[0];
      return this.sortMultipleDataComputed.indexOf(sortObj) + 1;
    },
    removeSortingPriority(column) {
      if (this.backendSorting) {
        this.$emit("sorting-priority-removed", column.field);
      } else {
        this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
          (priority) => priority.field !== column.field
        );
        if (this.sortMultipleDataLocal.length === 0) {
          this.resetMultiSorting();
        } else {
          this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal);
        }
      }
    },
    resetMultiSorting() {
      this.sortMultipleDataLocal = [];
      this.currentSortColumn = BLANK_COLUMN;
      this.newData = this.data;
    },
    /*
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy(array, key, fn, isAsc) {
      let sorted = [];
      if (fn && typeof fn === "function") {
        sorted = [...array].sort((a, b) => fn(a, b, isAsc));
      } else {
        sorted = [...array].sort((a, b) => {
          let newA = getValueByPath(a, key);
          let newB = getValueByPath(b, key);
          if (typeof newA === "boolean" && typeof newB === "boolean") {
            return isAsc ? +newA - +newB : +newB - +newA;
          }
          if (!isNil(newB) && isNil(newA)) return isAsc ? 1 : -1;
          if (!isNil(newA) && isNil(newB)) return isAsc ? -1 : 1;
          if (newA === newB) return 0;
          newA = typeof newA === "string" ? newA.toUpperCase() : newA;
          newB = typeof newB === "string" ? newB.toUpperCase() : newB;
          return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
        });
      }
      return sorted;
    },
    sortMultiColumn(column) {
      this.currentSortColumn = BLANK_COLUMN;
      if (!this.backendSorting) {
        const existingPriority = this.sortMultipleDataLocal.filter((i) => i.field === column.field)[0];
        if (existingPriority) {
          existingPriority.order = existingPriority.order === "desc" ? "asc" : "desc";
        } else {
          this.sortMultipleDataLocal.push({
            field: column.field,
            order: this.isAsc ? "asc" : "desc",
            customSort: column.customSort
          });
        }
        this.doSortMultiColumn();
      }
    },
    doSortMultiColumn() {
      this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal);
    },
    /*
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort(column, updatingData = false, event = null) {
      if (!column || !column.sortable) return;
      if (
        // if backend sorting is enabled, just emit the sort press like usual
        // if the correct key combination isnt pressed, sort like usual
        !this.backendSorting && this.sortMultiple && (this.sortMultipleKey && event[this.sortMultipleKey] || !this.sortMultipleKey)
      ) {
        if (updatingData) {
          this.doSortMultiColumn();
        } else {
          this.sortMultiColumn(column);
        }
      } else {
        if (this.sortMultiple) {
          this.sortMultipleDataLocal = [];
        }
        if (!updatingData) {
          this.isAsc = toRaw(column) === toRaw(this.currentSortColumn) ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== "desc";
        }
        if (!this.firstTimeSort) {
          this.$emit("sort", column.field, this.isAsc ? "asc" : "desc", event);
        }
        if (!this.backendSorting) {
          this.doSortSingleColumn(column);
        }
        this.currentSortColumn = column;
      }
    },
    doSortSingleColumn(column) {
      this.newData = this.sortBy(
        this.newData,
        column.field,
        column.customSort,
        this.isAsc
      );
    },
    isRowSelected(row, selected) {
      if (!selected) {
        return false;
      }
      if (this.customRowKey) {
        return row[this.customRowKey] === selected[this.customRowKey];
      }
      return row === selected;
    },
    /*
    * Check if the row is checked (is added to the array).
    */
    isRowChecked(row) {
      return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
    },
    /*
    * Remove a checked row from the array.
    */
    removeCheckedRow(row) {
      const index = indexOf(this.newCheckedRows, row, this.customIsChecked);
      if (index >= 0) {
        this.newCheckedRows.splice(index, 1);
      }
    },
    /*
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll() {
      const isAllChecked = this.isAllChecked;
      this.visibleData.forEach((currentRow) => {
        if (this.isRowCheckable(currentRow)) {
          this.removeCheckedRow(currentRow);
        }
        if (!isAllChecked) {
          if (this.isRowCheckable(currentRow)) {
            this.newCheckedRows.push(currentRow);
          }
        }
      });
      this.$emit("check", this.newCheckedRows);
      this.$emit("check-all", this.newCheckedRows);
      this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /*
    * Row checkbox click listener.
    */
    checkRow(row, index, event) {
      if (!this.isRowCheckable(row)) return;
      const lastIndex = this.lastCheckedRowIndex;
      this.lastCheckedRowIndex = index;
      if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
        this.shiftCheckRow(row, index, lastIndex);
      } else if (!this.isRowChecked(row)) {
        this.newCheckedRows.push(row);
      } else {
        this.removeCheckedRow(row);
      }
      this.$emit("check", this.newCheckedRows, row);
      this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /*
     * Check row when shift is pressed.
     */
    shiftCheckRow(row, index, lastCheckedRowIndex) {
      const subset = this.visibleData.slice(
        Math.min(index, lastCheckedRowIndex),
        Math.max(index, lastCheckedRowIndex) + 1
      );
      const shouldCheck = !this.isRowChecked(row);
      subset.forEach((item) => {
        this.removeCheckedRow(item);
        if (shouldCheck && this.isRowCheckable(item)) {
          this.newCheckedRows.push(item);
        }
      });
    },
    /*
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow(row) {
      this.$emit("click", row);
      this._selectedRow = row;
      if (this.selected === row) return;
      if (!this.isRowSelectable(row)) return;
      this.$emit("select", row, this.selected);
      this.$emit("update:selected", row);
    },
    /*
    * Toggle to show/hide details slot
    */
    toggleDetails(obj) {
      const found = this.isVisibleDetailRow(obj);
      if (found) {
        this.closeDetailRow(obj);
        this.$emit("details-close", obj);
      } else {
        this.openDetailRow(obj);
        this.$emit("details-open", obj);
      }
      this.$emit("update:openedDetailed", this.visibleDetailRows);
    },
    openDetailRow(obj) {
      const index = this.handleDetailKey(obj);
      this.visibleDetailRows.push(index);
    },
    closeDetailRow(obj) {
      const index = this.handleDetailKey(obj);
      const i = this.visibleDetailRows.indexOf(index);
      if (i >= 0) {
        this.visibleDetailRows.splice(i, 1);
      }
    },
    isVisibleDetailRow(obj) {
      const index = this.handleDetailKey(obj);
      return this.visibleDetailRows.indexOf(index) >= 0;
    },
    isActiveDetailRow(row) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isActiveCustomDetailRow(row) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isRowFiltered(row) {
      for (const key in this.filters) {
        if (!this.filters[key]) continue;
        const input = this.filters[key];
        const column = this.newColumns.filter((c) => c.field === key)[0];
        if (column && column.customSearch && typeof column.customSearch === "function") {
          if (!column.customSearch(row, input)) return false;
        } else {
          const value = this.getValueByPath(row, key);
          if (value == null) return false;
          if (Number.isInteger(value)) {
            if (value !== Number(input)) return false;
          } else {
            const re = new RegExp(escapeRegExpChars(input + ""), "i");
            if (Array.isArray(value)) {
              const valid = value.some(
                (val) => re.test(removeDiacriticsFromString(val)) || re.test(val)
              );
              if (!valid) return false;
            } else {
              if (!re.test(removeDiacriticsFromString(value)) && !re.test(value)) {
                return false;
              }
            }
          }
        }
      }
      return true;
    },
    /*
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey(index) {
      const key = this.detailKey;
      return !key.length || !index ? index : index[key];
    },
    checkPredefinedDetailedRows() {
      const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
      if (defaultExpandedRowsDefined && !this.detailKey.length) {
        throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
      }
    },
    /*
    * Call initSort only first time (For example async data).
    */
    checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.newColumns.length) {
        if (toRaw(this.currentSortColumn) !== BLANK_COLUMN) {
          for (let i = 0; i < this.newColumns.length; i++) {
            if (this.newColumns[i].field === this.currentSortColumn.field) {
              this.currentSortColumn = this.newColumns[i];
              break;
            }
          }
        }
      }
    },
    /*
    * Check if footer slot has custom content.
    *
    * Assumes that `$slots.footer` is specified.
    */
    hasCustomFooterSlot() {
      var _a;
      const footer = this.$slots.footer();
      if (footer.length > 1) return true;
      if (isFragment(footer[0])) return true;
      const tag = (_a = footer[0].el) == null ? void 0 : _a.tag;
      if (tag !== "th" && tag !== "td") return false;
      return true;
    },
    /*
    * Check if bottom-left slot exists.
    */
    hasBottomLeftSlot() {
      return typeof this.$slots["bottom-left"] !== "undefined";
    },
    /*
    * Table arrow keys listener, change selection.
    */
    pressedArrow(pos) {
      if (!this.visibleData.length) return;
      let index = this.visibleData.indexOf(this.selected) + pos;
      index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
      const row = this.visibleData[index];
      if (!this.isRowSelectable(row)) {
        let newIndex = null;
        if (pos > 0) {
          for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
          }
        } else {
          for (let i = index; i >= 0 && newIndex === null; i--) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
          }
        }
        if (newIndex >= 0) {
          this.selectRow(this.visibleData[newIndex]);
        }
      } else {
        this.selectRow(row);
      }
    },
    /*
    * Focus table element if has selected prop.
    */
    focus() {
      if (!this.focusable) return;
      this.$el.querySelector("table").focus();
    },
    /*
    * Initial sorted column based on the default-sort prop.
    */
    initSort() {
      if (this.sortMultiple && this.sortMultipleData) {
        this.sortMultipleData.forEach((column) => {
          this.sortMultiColumn(column);
        });
      } else {
        if (!this.defaultSort) return;
        let sortField = "";
        let sortDirection = this.defaultSortDirection;
        if (Array.isArray(this.defaultSort)) {
          sortField = this.defaultSort[0];
          if (this.defaultSort[1]) {
            sortDirection = this.defaultSort[1];
          }
        } else {
          sortField = this.defaultSort;
        }
        const sortColumn = this.newColumns.filter(
          (column) => column.field === sortField
        )[0];
        if (sortColumn) {
          this.isAsc = sortDirection.toLowerCase() !== "desc";
          this.sort(sortColumn, true);
        }
      }
    },
    /*
    * Emits drag start event (row)
    */
    handleDragStart(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = true;
      this.$emit("dragstart", { event, row, index });
    },
    /*
    * Emits drag leave event (row)
    */
    handleDragEnd(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = false;
      this.$emit("dragend", { event, row, index });
    },
    /*
    * Emits drop event (row)
    */
    handleDrop(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit("drop", { event, row, index });
    },
    /*
    * Emits drag over event (row)
    */
    handleDragOver(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit("dragover", { event, row, index });
    },
    /*
    * Emits drag leave event (row)
    */
    handleDragLeave(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit("dragleave", { event, row, index });
    },
    // this method is for "mouseenter", and "mouseleave" events.
    // the original idea of this method was introduced by the PR
    // https://github.com/buefy/buefy/pull/2150
    // to address some performance issues related to these events.
    // I am not sure whether the justification made at the PR is still
    // relevant to Vue 3.
    // btw, this function was made by the PR https://github.com/buefy/buefy/pull/3236
    emitEventForRow(eventName, event, row) {
      const listener = this.$attrs[toHandlerKey(eventName)] || this.$attrs[toHandlerKey(camelize(eventName))];
      return listener != null ? this.$emit(eventName, row, event) : null;
    },
    /*
    * Emits drag start event (column)
    */
    handleColumnDragStart(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = true;
      this.$emit("columndragstart", { event, column, index });
    },
    /*
    * Emits drag leave event (column)
    */
    handleColumnDragEnd(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = false;
      this.$emit("columndragend", { event, column, index });
    },
    /*
    * Emits drop event (column)
    */
    handleColumnDrop(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit("columndrop", { event, column, index });
    },
    /*
    * Emits drag over event (column)
    */
    handleColumnDragOver(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit("columndragover", { event, column, index });
    },
    /*
    * Emits drag leave event (column)
    */
    handleColumnDragLeave(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit("columndragleave", { event, column, index });
    },
    /*
    * Starts monitoring drag-by-touch events (row on touch-enabled devices)
    */
    handleTouchStart(event, row) {
      if (!this.canDragRow) return;
      if (this.isDraggingColumn) return;
      if (this._selectedRow !== row) return;
      event.preventDefault();
      this.mayBeTouchDragging = true;
    },
    /*
    * Emits dragover and dragleave events (row on touch-enabled devices)
    *
    * Emits also dragstart if this is the first touchmove after touchstart.
    */
    handleTouchMove(event) {
      if (!this.canDragRow) return;
      if (!this.mayBeTouchDragging) return;
      if (!this.isDraggingRow) {
        const eventTarget = event.target;
        const tr = eventTarget.closest("tr");
        this.draggedCellContent = tr ? `<table class="table"><tr>${tr.innerHTML}</tr></table>` : eventTarget.innerHTML;
        this.$refs.draggedCell.style.width = tr ? `${tr.offsetWidth}px` : `${eventTarget.offsetWidth}px`;
        eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragstart"
        }));
      }
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target != null) {
        if (target !== this.touchDragoverTarget) {
          if (this.touchDragoverTarget != null) {
            this.touchDragoverTarget.dispatchEvent(
              translateTouchAsDragEvent(event, {
                type: "dragleave",
                target: this.touchDragoverTarget
              })
            );
          }
          this.touchDragoverTarget = target;
          target.dispatchEvent(
            translateTouchAsDragEvent(event, {
              type: "dragover",
              target
            })
          );
        }
      } else if (this.touchDragoverTarget != null) {
        this.touchDragoverTarget.dispatchEvent(
          translateTouchAsDragEvent(event, {
            type: "dragleave",
            target: this.touchDragoverTarget
          })
        );
        this.touchDragoverTarget = null;
      }
      this.updateDraggedCell(touch);
    },
    /*
    * Emits drop and dragend events (row on touch-enabled devices)
    */
    handleTouchEnd(event) {
      if (!this.canDragRow) return;
      if (this.isDraggingRow) {
        const touch = event.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target != null) {
          target.dispatchEvent(translateTouchAsDragEvent(event, {
            type: "drop",
            target
          }));
        }
        event.target.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragend"
        }));
        this._selectedRow = null;
      }
      this.mayBeTouchDragging = false;
    },
    /*
    * Starts monitoring drag-by-touch events (column on touch-enabled devices)
    */
    handleColumnTouchStart(event) {
      if (!this.canDragColumn) return;
      if (this.isDraggingRow) return;
      event.preventDefault();
      this.mayBeTouchDragging = true;
    },
    /*
    * Emits dragover and dragleave events (column on touch-enabled devices)
    *
    * Also emits dragstart if this is the first touchmove after touchstart.
    */
    handleColumnTouchMove(event) {
      if (!this.canDragColumn) return;
      if (!this.mayBeTouchDragging) return;
      if (!this.isDraggingColumn) {
        const eventTarget = event.target;
        this.draggedCellContent = eventTarget.innerHTML;
        this.$refs.draggedCell.style.width = `${eventTarget.offsetWidth}px`;
        eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragstart"
        }));
      }
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target != null) {
        if (target !== this.touchDragoverTarget) {
          if (this.touchDragoverTarget != null) {
            this.touchDragoverTarget.dispatchEvent(
              translateTouchAsDragEvent(event, {
                type: "dragleave",
                target: this.touchDragoverTarget
              })
            );
          }
          this.touchDragoverTarget = target;
          target.dispatchEvent(
            translateTouchAsDragEvent(event, {
              type: "dragover",
              target
            })
          );
        }
      } else if (this.touchDragoverTarget != null) {
        this.touchDragoverTarget.dispatchEvent(
          translateTouchAsDragEvent(event, {
            type: "dragleave",
            target: this.touchDragoverTarget
          })
        );
        this.touchDragoverTarget = null;
      }
      this.updateDraggedCell(touch);
    },
    /*
    * Emits drop and dragend events (column on touch-enabled devices)
    */
    handleColumnTouchEnd(event) {
      if (!this.canDragColumn) return;
      if (this.isDraggingColumn) {
        const touch = event.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target != null) {
          target.dispatchEvent(translateTouchAsDragEvent(event, {
            type: "drop",
            target
          }));
        }
        event.target.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragend"
        }));
      }
      this.mayBeTouchDragging = false;
    },
    updateDraggedCell({ clientX, clientY }) {
      const cellRect = this.$refs.draggedCell.getBoundingClientRect();
      const top = clientY + window.scrollY - cellRect.height / 2;
      const left = clientX + window.scrollX - cellRect.width / 2;
      this.$refs.draggedCell.style.top = `calc(${top}px)`;
      this.$refs.draggedCell.style.left = `calc(${left}px)`;
    },
    _registerTableColumn(column) {
      if (column._isTableColumn) {
        this.defaultSlots.push(column);
      }
    },
    _unregisterTableColumn(column) {
      const index = this.defaultSlots.indexOf(column);
      if (index !== -1) {
        this.defaultSlots.splice(index, 1);
      }
    }
  },
  mounted() {
    this.checkPredefinedDetailedRows();
    this.checkSort();
    const prepareDraggedCell = (isDraggable) => {
      if (isDraggable && this.$data._draggedCellEl == null) {
        this.$data._draggedCellEl = createAbsoluteElement(this.$refs.draggedCell);
      }
    };
    this.$watch("draggable", prepareDraggedCell, { immediate: true });
    this.$watch("draggableColumn", prepareDraggedCell, { immediate: true });
  },
  beforeUnmount() {
    if (this.$data._draggedCellEl) {
      removeElement(this.$data._draggedCellEl);
    }
  }
});

const _hoisted_1 = ["tabindex"];
const _hoisted_2 = { key: 1 };
const _hoisted_3 = {
  key: 0,
  width: "40px"
};
const _hoisted_4 = ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"];
const _hoisted_5 = {
  key: 0,
  class: "multi-sort-icons"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 0,
  class: "is-subheading"
};
const _hoisted_8 = {
  key: 0,
  width: "40px"
};
const _hoisted_9 = { key: 1 };
const _hoisted_10 = { key: 2 };
const _hoisted_11 = { key: 1 };
const _hoisted_12 = {
  key: 0,
  width: "40px"
};
const _hoisted_13 = { key: 1 };
const _hoisted_14 = { key: 2 };
const _hoisted_15 = ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave", "onTouchstart"];
const _hoisted_16 = {
  key: 0,
  class: "chevron-cell"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = {
  key: 0,
  class: "detail"
};
const _hoisted_19 = ["colspan"];
const _hoisted_20 = { class: "detail-container" };
const _hoisted_21 = {
  key: 0,
  class: "is-empty"
};
const _hoisted_22 = ["colspan"];
const _hoisted_23 = { key: 2 };
const _hoisted_24 = { class: "table-footer" };
const _hoisted_25 = ["colspan"];
const _hoisted_26 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_table_mobile_sort = resolveComponent("b-table-mobile-sort");
  const _component_b_table_pagination = resolveComponent("b-table-pagination");
  const _component_b_checkbox = resolveComponent("b-checkbox");
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");
  const _component_b_loading = resolveComponent("b-loading");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({ class: "b-table" }, _ctx.rootAttrs),
    [
      renderSlot(_ctx.$slots, "default"),
      _ctx.mobileCards && _ctx.hasSortablenewColumns ? (openBlock(), createBlock(_component_b_table_mobile_sort, {
        key: 0,
        "current-sort-column": _ctx.currentSortColumn,
        "sort-multiple": _ctx.sortMultiple,
        "sort-multiple-data": _ctx.sortMultipleDataComputed,
        "is-asc": _ctx.isAsc,
        columns: _ctx.newColumns,
        placeholder: _ctx.mobileSortPlaceholder,
        "icon-pack": _ctx.iconPack,
        "sort-icon": _ctx.sortIcon,
        "sort-icon-size": _ctx.sortIconSize,
        onSort: _cache[0] || (_cache[0] = (column, event) => _ctx.sort(column, null, event)),
        onRemovePriority: _cache[1] || (_cache[1] = (column) => _ctx.removeSortingPriority(column))
      }, null, 8, ["current-sort-column", "sort-multiple", "sort-multiple-data", "is-asc", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size"])) : createCommentVNode("v-if", true),
      _ctx.paginated && (_ctx.paginationPosition === "top" || _ctx.paginationPosition === "both") ? renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
        createVNode(_component_b_table_pagination, mergeProps(_ctx.fallthroughAttrs, {
          "per-page": _ctx.perPage,
          paginated: _ctx.paginated,
          rounded: _ctx.paginationRounded,
          "icon-pack": _ctx.iconPack,
          total: _ctx.newDataTotal,
          "current-page": _ctx.newCurrentPage,
          "onUpdate:currentPage": _cache[2] || (_cache[2] = ($event) => _ctx.newCurrentPage = $event),
          "aria-next-label": _ctx.ariaNextLabel,
          "aria-previous-label": _ctx.ariaPreviousLabel,
          "aria-page-label": _ctx.ariaPageLabel,
          "aria-current-label": _ctx.ariaCurrentLabel,
          onPageChange: _cache[3] || (_cache[3] = (event) => _ctx.$emit("page-change", event)),
          "page-input": _ctx.pageInput,
          "pagination-order": _ctx.paginationOrder,
          "page-input-position": _ctx.pageInputPosition,
          "debounce-page-input": _ctx.debouncePageInput
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "top-left")
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "pagination-order", "page-input-position", "debounce-page-input"])
      ]) : createCommentVNode("v-if", true),
      createElementVNode(
        "div",
        {
          class: normalizeClass(["table-wrapper", _ctx.tableWrapperClasses]),
          style: normalizeStyle(_ctx.tableStyle)
        },
        [
          createElementVNode("table", {
            class: normalizeClass(["table", _ctx.tableClasses]),
            tabindex: !_ctx.focusable ? void 0 : 0,
            onKeydown: [
              _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => _ctx.pressedArrow(-1), ["self", "prevent"]), ["up"])),
              _cache[10] || (_cache[10] = withKeys(withModifiers(($event) => _ctx.pressedArrow(1), ["self", "prevent"]), ["down"]))
            ]
          }, [
            _ctx.caption ? withDirectives((openBlock(), createElementBlock(
              "caption",
              { key: 0 },
              toDisplayString(_ctx.caption),
              513
              /* TEXT, NEED_PATCH */
            )), [
              [vShow, _ctx.showCaption]
            ]) : createCommentVNode("v-if", true),
            _ctx.newColumns.length && _ctx.showHeader ? (openBlock(), createElementBlock("thead", _hoisted_2, [
              createElementVNode("tr", null, [
                _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("th", _hoisted_3)) : createCommentVNode("v-if", true),
                _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock(
                  "th",
                  {
                    key: 1,
                    class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                  },
                  [
                    _ctx.headerCheckable ? renderSlot(_ctx.$slots, "check-all", {
                      key: 0,
                      isAllChecked: _ctx.isAllChecked,
                      isAllUncheckable: _ctx.isAllUncheckable,
                      checkAll: _ctx.checkAll
                    }, () => [
                      createVNode(_component_b_checkbox, {
                        autocomplete: "off",
                        "model-value": _ctx.isAllChecked,
                        type: _ctx.checkboxType,
                        disabled: _ctx.isAllUncheckable,
                        onChange: _ctx.checkAll
                      }, null, 8, ["model-value", "type", "disabled", "onChange"])
                    ]) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.visibleColumns, (column, index) => {
                    return openBlock(), createElementBlock("th", mergeProps({
                      key: column.newKey + ":" + index + "header"
                    }, column.thAttrs(column), {
                      class: [column.thClasses, {
                        "is-current-sort": !_ctx.sortMultiple && _ctx.currentSortColumn === column
                      }],
                      style: column.thStyle,
                      onClick: withModifiers(($event) => _ctx.sort(column, null, $event), ["stop"]),
                      draggable: _ctx.canDragColumn,
                      onDragstart: ($event) => _ctx.handleColumnDragStart($event, column, index),
                      onDragend: ($event) => _ctx.handleColumnDragEnd($event, column, index),
                      onDrop: ($event) => _ctx.handleColumnDrop($event, column, index),
                      onDragover: ($event) => _ctx.handleColumnDragOver($event, column, index),
                      onDragleave: ($event) => _ctx.handleColumnDragLeave($event, column, index),
                      onTouchstart: _cache[4] || (_cache[4] = ($event) => _ctx.handleColumnTouchStart($event)),
                      onTouchmove: _cache[5] || (_cache[5] = ($event) => _ctx.handleColumnTouchMove($event)),
                      onTouchend: _cache[6] || (_cache[6] = ($event) => _ctx.handleColumnTouchEnd($event))
                    }), [
                      createElementVNode(
                        "div",
                        {
                          class: normalizeClass(["th-wrap is-relative", {
                            "is-numeric": column.numeric,
                            "is-centered": column.centered
                          }]),
                          style: normalizeStyle(column.thWrapStyle)
                        },
                        [
                          column.$slots.header ? (openBlock(), createBlock(_component_b_slot_component, {
                            key: 0,
                            component: column,
                            scoped: "",
                            name: "header",
                            tag: "span",
                            props: { column, index }
                          }, null, 8, ["component", "props"])) : (openBlock(), createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              createTextVNode(
                                toDisplayString(column.label) + " ",
                                1
                                /* TEXT */
                              ),
                              _ctx.sortMultiple && _ctx.sortMultipleDataComputed && _ctx.sortMultipleDataComputed.length > 0 && _ctx.sortMultipleDataComputed.filter((i) => i.field === column.field).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_5, [
                                createVNode(_component_b_icon, {
                                  icon: _ctx.sortIcon,
                                  pack: _ctx.iconPack,
                                  both: "",
                                  size: _ctx.sortIconSize,
                                  class: normalizeClass({
                                    "is-desc": _ctx.sortMultipleDataComputed.filter((i) => i.field === column.field)[0].order === "desc"
                                  })
                                }, null, 8, ["icon", "pack", "size", "class"]),
                                createTextVNode(
                                  " " + toDisplayString(_ctx.findIndexOfSortData(column)) + " ",
                                  1
                                  /* TEXT */
                                ),
                                createElementVNode("button", {
                                  class: "delete is-small multi-sort-cancel-icon",
                                  type: "button",
                                  onClick: withModifiers(($event) => _ctx.removeSortingPriority(column), ["stop"])
                                }, null, 8, _hoisted_6)
                              ])) : (openBlock(), createBlock(_component_b_icon, {
                                key: 1,
                                icon: _ctx.sortIcon,
                                pack: _ctx.iconPack,
                                both: "",
                                size: _ctx.sortIconSize,
                                class: normalizeClass(["sort-icon", {
                                  "is-desc": !_ctx.isAsc,
                                  "is-invisible": _ctx.currentSortColumn !== column
                                }])
                              }, null, 8, ["icon", "pack", "size", "class"]))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ],
                        6
                        /* CLASS, STYLE */
                      )
                    ], 16, _hoisted_4);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock(
                  "th",
                  {
                    key: 2,
                    class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                  },
                  [
                    _ctx.headerCheckable ? renderSlot(_ctx.$slots, "check-all", {
                      key: 0,
                      isAllChecked: _ctx.isAllChecked,
                      isAllUncheckable: _ctx.isAllUncheckable,
                      checkAll: _ctx.checkAll
                    }, () => [
                      createVNode(_component_b_checkbox, {
                        autocomplete: "off",
                        "model-value": _ctx.isAllChecked,
                        type: _ctx.checkboxType,
                        disabled: _ctx.isAllUncheckable,
                        onChange: _ctx.checkAll
                      }, null, 8, ["model-value", "type", "disabled", "onChange"])
                    ]) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : createCommentVNode("v-if", true)
              ]),
              _ctx.hasCustomSubheadings ? (openBlock(), createElementBlock("tr", _hoisted_7, [
                _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("th", _hoisted_8)) : createCommentVNode("v-if", true),
                _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock("th", _hoisted_9)) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.visibleColumns, (column, index) => {
                    return openBlock(), createElementBlock(
                      "th",
                      {
                        key: column.newKey + ":" + index + "subheading",
                        style: normalizeStyle(column.style)
                      },
                      [
                        createElementVNode(
                          "div",
                          {
                            class: normalizeClass(["th-wrap", {
                              "is-numeric": column.numeric,
                              "is-centered": column.centered
                            }]),
                            style: normalizeStyle(column.thWrapStyle)
                          },
                          [
                            column.$slots.subheading ? (openBlock(), createBlock(_component_b_slot_component, {
                              key: 0,
                              component: column,
                              scoped: "",
                              name: "subheading",
                              tag: "span",
                              props: { column, index }
                            }, null, 8, ["component", "props"])) : (openBlock(), createElementBlock(
                              Fragment,
                              { key: 1 },
                              [
                                createTextVNode(
                                  toDisplayString(column.subheading),
                                  1
                                  /* TEXT */
                                )
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      4
                      /* STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock("th", _hoisted_10)) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              _ctx.hasSearchablenewColumns ? (openBlock(), createElementBlock("tr", _hoisted_11, [
                _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("th", _hoisted_12)) : createCommentVNode("v-if", true),
                _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock("th", _hoisted_13)) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.visibleColumns, (column, index) => {
                    return openBlock(), createElementBlock(
                      "th",
                      mergeProps({
                        key: column.newKey + ":" + index + "searchable"
                      }, column.thAttrs(column), {
                        style: column.thStyle,
                        class: { "is-sticky": column.sticky }
                      }),
                      [
                        createElementVNode(
                          "div",
                          {
                            class: "th-wrap",
                            style: normalizeStyle(column.thWrapStyle)
                          },
                          [
                            column.searchable ? (openBlock(), createElementBlock(
                              Fragment,
                              { key: 0 },
                              [
                                column.$slots.searchable ? (openBlock(), createBlock(_component_b_slot_component, {
                                  key: 0,
                                  component: column,
                                  scoped: true,
                                  name: "searchable",
                                  tag: "span",
                                  props: { column, filters: _ctx.filters }
                                }, null, 8, ["component", "props"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
                                  key: 1,
                                  [toHandlerKey(_ctx.filtersEvent)]: _ctx.onFiltersEvent
                                }, {
                                  modelValue: _ctx.filters[column.field],
                                  "onUpdate:modelValue": ($event) => _ctx.filters[column.field] = $event,
                                  type: column.numeric ? "number" : "text"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "type"]))
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            )) : createCommentVNode("v-if", true)
                          ],
                          4
                          /* STYLE */
                        )
                      ],
                      16
                      /* FULL_PROPS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock("th", _hoisted_14)) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true),
            createElementVNode("tbody", null, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.visibleData, (row, index) => {
                  return openBlock(), createElementBlock(
                    Fragment,
                    {
                      key: _ctx.customRowKey ? row[_ctx.customRowKey] : index
                    },
                    [
                      createElementVNode("tr", {
                        class: normalizeClass([_ctx.rowClass(row, index), {
                          "is-selected": _ctx.isRowSelected(row, _ctx.selected),
                          "is-checked": _ctx.isRowChecked(row)
                        }]),
                        onClick: ($event) => _ctx.selectRow(row),
                        onDblclick: ($event) => _ctx.$emit("dblclick", row),
                        onMouseenter: ($event) => _ctx.emitEventForRow("mouseenter", $event, row),
                        onMouseleave: ($event) => _ctx.emitEventForRow("mouseleave", $event, row),
                        onContextmenu: ($event) => _ctx.$emit("contextmenu", row, $event),
                        draggable: _ctx.canDragRow,
                        onDragstart: ($event) => _ctx.handleDragStart($event, row, index),
                        onDragend: ($event) => _ctx.handleDragEnd($event, row, index),
                        onDrop: ($event) => _ctx.handleDrop($event, row, index),
                        onDragover: ($event) => _ctx.handleDragOver($event, row, index),
                        onDragleave: ($event) => _ctx.handleDragLeave($event, row, index),
                        onTouchstart: ($event) => _ctx.handleTouchStart($event, row),
                        onTouchmove: _cache[7] || (_cache[7] = ($event) => _ctx.handleTouchMove($event)),
                        onTouchend: _cache[8] || (_cache[8] = ($event) => _ctx.handleTouchEnd($event))
                      }, [
                        _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("td", _hoisted_16, [
                          _ctx.hasDetailedVisible(row) ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            role: "button",
                            onClick: withModifiers(($event) => _ctx.toggleDetails(row), ["stop"])
                          }, [
                            createVNode(_component_b_icon, {
                              icon: _ctx.detailIcon,
                              pack: _ctx.iconPack,
                              both: "",
                              class: normalizeClass({ "is-expanded": _ctx.isVisibleDetailRow(row) })
                            }, null, 8, ["icon", "pack", "class"])
                          ], 8, _hoisted_17)) : createCommentVNode("v-if", true)
                        ])) : createCommentVNode("v-if", true),
                        _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock(
                          "td",
                          {
                            key: 1,
                            class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                          },
                          [
                            createVNode(_component_b_checkbox, {
                              autocomplete: "off",
                              "model-value": _ctx.isRowChecked(row),
                              type: _ctx.checkboxType,
                              disabled: !_ctx.isRowCheckable(row),
                              onClick: withModifiers(($event) => _ctx.checkRow(row, index, $event), ["prevent", "stop"])
                            }, null, 8, ["model-value", "type", "disabled", "onClick"])
                          ],
                          2
                          /* CLASS */
                        )) : createCommentVNode("v-if", true),
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(_ctx.visibleColumns, (column, colindex) => {
                            return openBlock(), createElementBlock(
                              Fragment,
                              {
                                key: column.newKey + ":" + index + ":" + colindex
                              },
                              [
                                column.$slots.default ? (openBlock(), createBlock(_component_b_slot_component, mergeProps({
                                  key: 0,
                                  component: column
                                }, column.tdAttrs(row, column), {
                                  scoped: "",
                                  name: "default",
                                  tag: "td",
                                  class: column.getRootClasses(row),
                                  style: column.getRootStyle(row),
                                  "data-label": column.label,
                                  props: {
                                    row,
                                    column,
                                    index,
                                    colindex,
                                    toggleDetails: _ctx.toggleDetails,
                                    isActiveDetailRow: _ctx.isActiveDetailRow
                                  },
                                  onClick: ($event) => _ctx.$emit("cellclick", row, column, index, colindex)
                                }), null, 16, ["component", "class", "style", "data-label", "props", "onClick"])) : createCommentVNode("v-if", true)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock(
                          "td",
                          {
                            key: 2,
                            class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                          },
                          [
                            createVNode(_component_b_checkbox, {
                              autocomplete: "off",
                              "model-value": _ctx.isRowChecked(row),
                              type: _ctx.checkboxType,
                              disabled: !_ctx.isRowCheckable(row),
                              onClick: withModifiers(($event) => _ctx.checkRow(row, index, $event), ["prevent", "stop"])
                            }, null, 8, ["model-value", "type", "disabled", "onClick"])
                          ],
                          2
                          /* CLASS */
                        )) : createCommentVNode("v-if", true)
                      ], 42, _hoisted_15),
                      createVNode(Transition, { name: _ctx.detailTransition }, {
                        default: withCtx(() => [
                          _ctx.isActiveDetailRow(row) ? (openBlock(), createElementBlock("tr", _hoisted_18, [
                            createElementVNode("td", { colspan: _ctx.columnCount }, [
                              createElementVNode("div", _hoisted_20, [
                                renderSlot(_ctx.$slots, "detail", {
                                  row,
                                  index
                                })
                              ])
                            ], 8, _hoisted_19)
                          ])) : createCommentVNode("v-if", true)
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["name"]),
                      _ctx.isActiveCustomDetailRow(row) ? renderSlot(_ctx.$slots, "detail", {
                        key: 0,
                        row,
                        index
                      }) : createCommentVNode("v-if", true)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              !_ctx.visibleData.length ? (openBlock(), createElementBlock("tr", _hoisted_21, [
                createElementVNode("td", { colspan: _ctx.columnCount }, [
                  renderSlot(_ctx.$slots, "empty")
                ], 8, _hoisted_22)
              ])) : createCommentVNode("v-if", true)
            ]),
            _ctx.$slots.footer !== void 0 ? (openBlock(), createElementBlock("tfoot", _hoisted_23, [
              createElementVNode("tr", _hoisted_24, [
                _ctx.hasCustomFooterSlot() ? renderSlot(_ctx.$slots, "footer", { key: 0 }) : (openBlock(), createElementBlock("th", {
                  key: 1,
                  colspan: _ctx.columnCount
                }, [
                  renderSlot(_ctx.$slots, "footer")
                ], 8, _hoisted_25))
              ])
            ])) : createCommentVNode("v-if", true)
          ], 42, _hoisted_1),
          _ctx.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            createVNode(_component_b_loading, {
              "is-full-page": false,
              "model-value": _ctx.loading
            }, null, 8, ["model-value"])
          ]) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      ),
      _ctx.checkable && _ctx.hasBottomLeftSlot() || _ctx.paginated && (_ctx.paginationPosition === "bottom" || _ctx.paginationPosition === "both") ? renderSlot(_ctx.$slots, "pagination", { key: 2 }, () => [
        createVNode(_component_b_table_pagination, mergeProps(_ctx.fallthroughAttrs, {
          "per-page": _ctx.perPage,
          paginated: _ctx.paginated,
          rounded: _ctx.paginationRounded,
          "icon-pack": _ctx.iconPack,
          total: _ctx.newDataTotal,
          "current-page": _ctx.newCurrentPage,
          "onUpdate:currentPage": _cache[11] || (_cache[11] = ($event) => _ctx.newCurrentPage = $event),
          "aria-next-label": _ctx.ariaNextLabel,
          "aria-previous-label": _ctx.ariaPreviousLabel,
          "aria-page-label": _ctx.ariaPageLabel,
          "aria-current-label": _ctx.ariaCurrentLabel,
          onPageChange: _cache[12] || (_cache[12] = (event) => _ctx.$emit("page-change", event)),
          "page-input": _ctx.pageInput,
          "pagination-order": _ctx.paginationOrder,
          "page-input-position": _ctx.pageInputPosition,
          "debounce-page-input": _ctx.debouncePageInput
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "bottom-left")
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "pagination-order", "page-input-position", "debounce-page-input"])
      ]) : createCommentVNode("v-if", true),
      createCommentVNode(" eslint-disable vue/no-v-html "),
      withDirectives(createElementVNode("div", {
        ref: "draggedCell",
        class: normalizeClass(["touch-dragged-cell", _ctx.touchDraggedCellClasses]),
        innerHTML: _ctx.draggedCellContent
      }, null, 10, _hoisted_26), [
        [vShow, _ctx.mayBeTouchDragging && (_ctx.isDraggingRow || _ctx.isDraggingColumn)]
      ]),
      createCommentVNode(" eslint-enable vue/no-v-html ")
    ],
    16
    /* FULL_PROPS */
  );
}
var Table = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);

var _sfc_main = defineComponent({
  name: "BTableColumn",
  inject: {
    $table: { name: "$table", default: false }
  },
  props: {
    label: String,
    customKey: [String, Number],
    field: String,
    meta: [String, Number, Boolean, Function, Object, Array],
    width: [Number, String],
    numeric: Boolean,
    centered: Boolean,
    searchable: Boolean,
    sortable: Boolean,
    visible: {
      type: Boolean,
      default: true
    },
    subheading: [String, Number],
    customSort: Function,
    customSearch: Function,
    sticky: Boolean,
    headerSelectable: Boolean,
    headerClass: String,
    cellClass: String,
    thAttrs: {
      type: Function,
      default: () => ({})
    },
    tdAttrs: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      newKey: this.customKey || this.label,
      _isTableColumn: true
    };
  },
  computed: {
    thClasses() {
      const attrs = this.thAttrs(this);
      const classes = [this.headerClass, {
        "is-sortable": this.sortable,
        "is-sticky": this.sticky,
        "is-unselectable": this.isHeaderUnSelectable
      }];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    thStyle() {
      const attrs = this.thAttrs(this);
      const style = [this.style];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    },
    thWrapStyle() {
      const width = toCssWidth(this.width);
      if (width != null && !width.trim().endsWith("%")) {
        return { width };
      } else {
        return {};
      }
    },
    rootClasses() {
      return [this.cellClass, {
        "has-text-right": this.numeric && !this.centered,
        "has-text-centered": this.centered,
        "is-sticky": this.sticky
      }];
    },
    style() {
      var _a;
      return {
        width: (_a = toCssWidth(this.width)) != null ? _a : void 0
        // null → undefined to satisfy StyleValue
      };
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    /*
     * Return if column header is un-selectable
     */
    isHeaderUnSelectable() {
      return !this.headerSelectable && this.sortable;
    }
  },
  methods: {
    getRootClasses(row) {
      const attrs = this.tdAttrs(row, this);
      const classes = [this.rootClasses];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    getRootStyle(row) {
      const attrs = this.tdAttrs(row, this);
      const style = [];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    }
  },
  created() {
    if (!this.$table) {
      throw new Error("You should wrap bTableColumn on a bTable");
    }
    this.$table._registerTableColumn(this);
  },
  beforeUnmount() {
    this.$table._unregisterTableColumn(this);
  },
  render() {
    return null;
  }
});

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Table);
    registerComponent(Vue, _sfc_main);
  }
};

export { Table as BTable, _sfc_main as BTableColumn, Plugin as default };
