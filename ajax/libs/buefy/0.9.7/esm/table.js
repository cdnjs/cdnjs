import { _ as _defineProperty, d as _toConsumableArray, b as _typeof } from './chunk-1fafdf15.js';
import { toCssWidth, getValueByPath, indexOf, multiColumnSort, escapeRegExpChars } from './helpers.js';
import { V as VueInstance, s as setVueInstance } from './chunk-953eb524.js';
import './chunk-9c9b9c25.js';
import { I as Icon } from './chunk-87d126e7.js';
import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-cca88db8.js';
import { I as Input } from './chunk-4422ad31.js';
import './chunk-2793447b.js';
import { C as Checkbox } from './chunk-d6bb2470.js';
import { S as Select } from './chunk-2c6bf841.js';
import './chunk-b9bdb0e4.js';
import { L as Loading } from './chunk-db791352.js';
import { P as Pagination } from './chunk-026c6b7f.js';
import { S as SlotComponent } from './chunk-85ab24d6.js';

function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var _components;
var script = {
  name: 'BTableMobileSort',
  components: (_components = {}, _defineProperty(_components, Select.name, Select), _defineProperty(_components, Icon.name, Icon), _components),
  props: {
    currentSortColumn: Object,
    sortMultipleData: Array,
    isAsc: Boolean,
    columns: Array,
    placeholder: String,
    iconPack: String,
    sortIcon: {
      type: String,
      default: 'arrow-up'
    },
    sortIconSize: {
      type: String,
      default: 'is-small'
    },
    sortMultiple: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      sortMultipleSelect: '',
      mobileSort: this.currentSortColumn,
      defaultEvent: {
        shiftKey: true,
        altKey: true,
        ctrlKey: true
      },
      ignoreSort: false
    };
  },
  computed: {
    showPlaceholder: function showPlaceholder() {
      var _this = this;

      return !this.columns || !this.columns.some(function (column) {
        return column === _this.mobileSort;
      });
    }
  },
  watch: {
    sortMultipleSelect: function sortMultipleSelect(column) {
      if (this.ignoreSort) {
        this.ignoreSort = false;
      } else {
        this.$emit('sort', column, this.defaultEvent);
      }
    },
    mobileSort: function mobileSort(column) {
      if (this.currentSortColumn === column) return;
      this.$emit('sort', column, this.defaultEvent);
    },
    currentSortColumn: function currentSortColumn(column) {
      this.mobileSort = column;
    }
  },
  methods: {
    removePriority: function removePriority() {
      var _this2 = this;

      this.$emit('removePriority', this.sortMultipleSelect); // ignore the watcher to sort when we just change whats displayed in the select
      // otherwise the direction will be flipped
      // The sort event is already triggered by the emit

      this.ignoreSort = true; // Select one of the other options when we reset one

      var remainingFields = this.sortMultipleData.filter(function (data) {
        return data.field !== _this2.sortMultipleSelect.field;
      }).map(function (data) {
        return data.field;
      });
      this.sortMultipleSelect = this.columns.filter(function (column) {
        return remainingFields.includes(column.field);
      })[0];
    },
    getSortingObjectOfColumn: function getSortingObjectOfColumn(column) {
      return this.sortMultipleData.filter(function (i) {
        return i.field === column.field;
      })[0];
    },
    columnIsDesc: function columnIsDesc(column) {
      var sortingObject = this.getSortingObjectOfColumn(column);

      if (sortingObject) {
        return !!(sortingObject.order && sortingObject.order === 'desc');
      }

      return true;
    },
    getLabel: function getLabel(column) {
      var sortingObject = this.getSortingObjectOfColumn(column);

      if (sortingObject) {
        return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')';
      }

      return column.label;
    },
    sort: function sort() {
      this.$emit('sort', this.sortMultiple ? this.sortMultipleSelect : this.mobileSort, this.defaultEvent);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field table-mobile-sort"},[_c('div',{staticClass:"field has-addons"},[(_vm.sortMultiple)?_c('b-select',{attrs:{"expanded":""},model:{value:(_vm.sortMultipleSelect),callback:function ($$v) {_vm.sortMultipleSelect=$$v;},expression:"sortMultipleSelect"}},_vm._l((_vm.columns),function(column,index){return (column.sortable)?_c('option',{key:index,domProps:{"value":column}},[_vm._v(" "+_vm._s(_vm.getLabel(column))+" "),(_vm.getSortingObjectOfColumn(column))?[(_vm.columnIsDesc(column))?[_vm._v(" ↓ ")]:[_vm._v(" ↑ ")]]:_vm._e()],2):_vm._e()}),0):_c('b-select',{attrs:{"expanded":""},model:{value:(_vm.mobileSort),callback:function ($$v) {_vm.mobileSort=$$v;},expression:"mobileSort"}},[(_vm.placeholder)?[_c('option',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPlaceholder),expression:"showPlaceholder"}],attrs:{"selected":"","disabled":"","hidden":""},domProps:{"value":{}}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")])]:_vm._e(),_vm._l((_vm.columns),function(column,index){return (column.sortable)?_c('option',{key:index,domProps:{"value":column}},[_vm._v(" "+_vm._s(column.label)+" ")]):_vm._e()})],2),_c('div',{staticClass:"control"},[(_vm.sortMultiple && _vm.sortMultipleData.length > 0)?[_c('button',{staticClass:"button is-primary",on:{"click":_vm.sort}},[_c('b-icon',{class:{ 'is-desc': _vm.columnIsDesc(_vm.sortMultipleSelect) },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"size":_vm.sortIconSize,"both":""}})],1),_c('button',{staticClass:"button is-primary",on:{"click":_vm.removePriority}},[_c('b-icon',{attrs:{"icon":"delete","size":_vm.sortIconSize,"both":""}})],1)]:(!_vm.sortMultiple)?_c('button',{staticClass:"button is-primary",on:{"click":_vm.sort}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentSortColumn === _vm.mobileSort),expression:"currentSortColumn === mobileSort"}],class:{ 'is-desc': !_vm.isAsc },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"size":_vm.sortIconSize,"both":""}})],1):_vm._e()],2)],1)])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TableMobileSort = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var script$1 = {
  name: 'BTableColumn',
  inject: {
    $table: {
      name: '$table',
      default: false
    }
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
      default: function _default() {
        return {};
      }
    },
    tdAttrs: {
      type: Function,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      newKey: this.customKey || this.label,
      _isTableColumn: true
    };
  },
  computed: {
    thClasses: function thClasses() {
      var attrs = this.thAttrs(this);
      var classes = [this.headerClass, {
        'is-sortable': this.sortable,
        'is-sticky': this.sticky,
        'is-unselectable': this.isHeaderUnSelectable
      }];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },
    thStyle: function thStyle() {
      var attrs = this.thAttrs(this);
      var style = [this.style];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    },
    rootClasses: function rootClasses() {
      return [this.cellClass, {
        'has-text-right': this.numeric && !this.centered,
        'has-text-centered': this.centered,
        'is-sticky': this.sticky
      }];
    },
    style: function style() {
      return {
        width: toCssWidth(this.width)
      };
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },

    /**
     * Return if column header is un-selectable
     */
    isHeaderUnSelectable: function isHeaderUnSelectable() {
      return !this.headerSelectable && this.sortable;
    }
  },
  methods: {
    getRootClasses: function getRootClasses(row) {
      var attrs = this.tdAttrs(row, this);
      var classes = [this.rootClasses];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },
    getRootStyle: function getRootStyle(row) {
      var attrs = this.tdAttrs(row, this);
      var style = [];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    }
  },
  created: function created() {
    if (!this.$table) {
      this.$destroy();
      throw new Error('You should wrap bTableColumn on a bTable');
    }

    this.$table.refreshSlots();
  },
  render: function render(createElement) {
    // renderless
    return null;
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TableColumn = __vue_normalize__(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var script$2 = {
  name: 'BTablePagination',
  components: _defineProperty({}, Pagination.name, Pagination),
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
    ariaCurrentLabel: String
  },
  data: function data() {
    return {
      newCurrentPage: this.currentPage
    };
  },
  watch: {
    currentPage: function currentPage(newVal) {
      this.newCurrentPage = newVal;
    }
  },
  methods: {
    /**
    * Paginator change listener.
    */
    pageChanged: function pageChanged(page) {
      this.newCurrentPage = page > 0 ? page : 1;
      this.$emit('update:currentPage', this.newCurrentPage);
      this.$emit('page-change', this.newCurrentPage);
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"top level"},[_c('div',{staticClass:"level-left"},[_vm._t("default")],2),_c('div',{staticClass:"level-right"},[(_vm.paginated)?_c('div',{staticClass:"level-item"},[_c('b-pagination',{attrs:{"icon-pack":_vm.iconPack,"total":_vm.total,"per-page":_vm.perPage,"simple":_vm.paginationSimple,"size":_vm.paginationSize,"current":_vm.newCurrentPage,"rounded":_vm.rounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"change":_vm.pageChanged}})],1):_vm._e()])])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TablePagination = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var _components$1;
var script$3 = {
  name: 'BTable',
  components: (_components$1 = {}, _defineProperty(_components$1, Checkbox.name, Checkbox), _defineProperty(_components$1, Icon.name, Icon), _defineProperty(_components$1, Input.name, Input), _defineProperty(_components$1, Loading.name, Loading), _defineProperty(_components$1, SlotComponent.name, SlotComponent), _defineProperty(_components$1, TableMobileSort.name, TableMobileSort), _defineProperty(_components$1, TableColumn.name, TableColumn), _defineProperty(_components$1, TablePagination.name, TablePagination), _components$1),
  inheritAttrs: false,
  provide: function provide() {
    return {
      $table: this
    };
  },
  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
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
    checkboxPosition: {
      type: String,
      default: 'left',
      validator: function validator(value) {
        return ['left', 'right'].indexOf(value) >= 0;
      }
    },
    stickyCheckbox: {
      type: Boolean,
      default: false
    },
    selected: Object,
    isRowSelectable: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    focusable: Boolean,
    customIsChecked: Function,
    isRowCheckable: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    checkedRows: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    mobileCards: {
      type: Boolean,
      default: true
    },
    defaultSort: [String, Array],
    defaultSortDirection: {
      type: String,
      default: 'asc'
    },
    sortIcon: {
      type: String,
      default: 'arrow-up'
    },
    sortIconSize: {
      type: String,
      default: 'is-small'
    },
    sortMultiple: {
      type: Boolean,
      default: false
    },
    sortMultipleData: {
      type: Array,
      default: function _default() {
        return [];
      }
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
    paginationPosition: {
      type: String,
      default: 'bottom',
      validator: function validator(value) {
        return ['bottom', 'top', 'both'].indexOf(value) >= 0;
      }
    },
    paginationRounded: Boolean,
    backendSorting: Boolean,
    backendFiltering: Boolean,
    rowClass: {
      type: Function,
      default: function _default() {
        return '';
      }
    },
    openedDetailed: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    hasDetailedVisible: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    detailKey: {
      type: String,
      default: ''
    },
    detailTransition: {
      type: String,
      default: ''
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
      default: ''
    },
    cardLayout: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    debounceSearch: Number
  },
  data: function data() {
    return {
      sortMultipleDataLocal: [],
      getValueByPath: getValueByPath,
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: _toConsumableArray(this.checkedRows),
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: true,
      filters: {},
      defaultSlots: [],
      firstTimeSort: true,
      // Used by first time initSort
      _isTable: true,
      // Used by TableColumn
      isDraggingRow: false,
      isDraggingColumn: false
    };
  },
  computed: {
    sortMultipleDataComputed: function sortMultipleDataComputed() {
      return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal;
    },
    tableClasses: function tableClasses() {
      return {
        'is-bordered': this.bordered,
        'is-striped': this.striped,
        'is-narrow': this.narrowed,
        'is-hoverable': (this.hoverable || this.focusable) && this.visibleData.length
      };
    },
    tableWrapperClasses: function tableWrapperClasses() {
      return {
        'has-mobile-cards': this.mobileCards,
        'has-sticky-header': this.stickyHeader,
        'is-card-list': this.cardLayout,
        'table-container': this.isScrollable
      };
    },
    tableStyle: function tableStyle() {
      return {
        height: toCssWidth(this.height)
      };
    },

    /**
    * Splitted data based on the pagination.
    */
    visibleData: function visibleData() {
      if (!this.paginated) return this.newData;
      var currentPage = this.newCurrentPage;
      var perPage = this.perPage;

      if (this.newData.length <= perPage) {
        return this.newData;
      } else {
        var start = (currentPage - 1) * perPage;
        var end = parseInt(start, 10) + parseInt(perPage, 10);
        return this.newData.slice(start, end);
      }
    },
    visibleColumns: function visibleColumns() {
      if (!this.newColumns) return this.newColumns;
      return this.newColumns.filter(function (column) {
        return column.visible || column.visible === undefined;
      });
    },

    /**
    * Check if all rows in the page are checked.
    */
    isAllChecked: function isAllChecked() {
      var _this = this;

      var validVisibleData = this.visibleData.filter(function (row) {
        return _this.isRowCheckable(row);
      });
      if (validVisibleData.length === 0) return false;
      var isAllChecked = validVisibleData.some(function (currentVisibleRow) {
        return indexOf(_this.newCheckedRows, currentVisibleRow, _this.customIsChecked) < 0;
      });
      return !isAllChecked;
    },

    /**
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable: function isAllUncheckable() {
      var _this2 = this;

      var validVisibleData = this.visibleData.filter(function (row) {
        return _this2.isRowCheckable(row);
      });
      return validVisibleData.length === 0;
    },

    /**
    * Check if has any sortable column.
    */
    hasSortablenewColumns: function hasSortablenewColumns() {
      return this.newColumns.some(function (column) {
        return column.sortable;
      });
    },

    /**
    * Check if has any searchable column.
    */
    hasSearchablenewColumns: function hasSearchablenewColumns() {
      return this.newColumns.some(function (column) {
        return column.searchable;
      });
    },

    /**
    * Check if has any column using subheading.
    */
    hasCustomSubheadings: function hasCustomSubheadings() {
      if (this.$scopedSlots && this.$scopedSlots.subheading) return true;
      return this.newColumns.some(function (column) {
        return column.subheading || column.$scopedSlots && column.$scopedSlots.subheading;
      });
    },

    /**
    * Return total column count based if it's checkable or expanded
    */
    columnCount: function columnCount() {
      var count = this.visibleColumns.length;
      count += this.checkable ? 1 : 0;
      count += this.detailed && this.showDetailIcon ? 1 : 0;
      return count;
    },

    /**
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon: function showDetailRowIcon() {
      return this.detailed && this.showDetailIcon;
    },

    /**
    * return if scrollable table
    */
    isScrollable: function isScrollable() {
      if (this.scrollable) return true;
      if (!this.newColumns) return false;
      return this.newColumns.some(function (column) {
        return column.sticky;
      });
    },
    newColumns: function newColumns() {
      var _this3 = this;

      if (this.columns && this.columns.length) {
        return this.columns.map(function (column) {
          var TableColumnComponent = VueInstance.extend(TableColumn);
          var component = new TableColumnComponent({
            parent: _this3,
            propsData: column
          });
          component.$scopedSlots = {
            default: function _default(props) {
              var vnode = component.$createElement('span', {
                domProps: {
                  innerHTML: getValueByPath(props.row, column.field)
                }
              });
              return [vnode];
            }
          };
          return component;
        });
      }

      return this.defaultSlots.filter(function (vnode) {
        return vnode.componentInstance && vnode.componentInstance.$data && vnode.componentInstance.$data._isTableColumn;
      }).map(function (vnode) {
        return vnode.componentInstance;
      });
    },
    canDragRow: function canDragRow() {
      return this.draggable && !this.isDraggingColumn;
    },
    canDragColumn: function canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow;
    }
  },
  watch: {
    /**
    * When data prop change:
    *   1. Update internal value.
    *   2. Filter data if it's not backend-filtered.
    *   3. Sort again if it's not backend-sorted.
    *   4. Set new total if it's not backend-paginated.
    */
    data: function data(value) {
      var _this4 = this;

      this.newData = value;

      if (!this.backendFiltering) {
        this.newData = value.filter(function (row) {
          return _this4.isRowFiltered(row);
        });
      }

      if (!this.backendSorting) {
        this.sort(this.currentSortColumn, true);
      }

      if (!this.backendPagination) {
        this.newDataTotal = this.newData.length;
      }
    },

    /**
    * When Pagination total change, update internal total
    * only if it's backend-paginated.
    */
    total: function total(newTotal) {
      if (!this.backendPagination) return;
      this.newDataTotal = newTotal;
    },
    currentPage: function currentPage(newVal) {
      this.newCurrentPage = newVal;
    },
    newCurrentPage: function newCurrentPage(newVal) {
      this.$emit('update:currentPage', newVal);
    },

    /**
    * When checkedRows prop change, update internal value without
    * mutating original data.
    */
    checkedRows: function checkedRows(rows) {
      this.newCheckedRows = _toConsumableArray(rows);
    },

    /*
    newColumns(value) {
        this.checkSort()
    },
    */
    debounceSearch: {
      handler: function handler(value) {
        this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
      },
      immediate: true
    },
    filters: {
      handler: function handler(value) {
        if (this.debounceSearch) {
          this.debouncedHandleFiltersChange(value);
        } else {
          this.handleFiltersChange(value);
        }
      },
      deep: true
    },

    /**
    * When the user wants to control the detailed rows via props.
    * Or wants to open the details of certain row with the router for example.
    */
    openedDetailed: function openedDetailed(expandedRows) {
      this.visibleDetailRows = expandedRows;
    }
  },
  methods: {
    onFiltersEvent: function onFiltersEvent(event) {
      this.$emit("filters-event-".concat(this.filtersEvent), {
        event: event,
        filters: this.filters
      });
    },
    handleFiltersChange: function handleFiltersChange(value) {
      var _this5 = this;

      if (this.backendFiltering) {
        this.$emit('filters-change', value);
      } else {
        this.newData = this.data.filter(function (row) {
          return _this5.isRowFiltered(row);
        });

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
    findIndexOfSortData: function findIndexOfSortData(column) {
      var sortObj = this.sortMultipleDataComputed.filter(function (i) {
        return i.field === column.field;
      })[0];
      return this.sortMultipleDataComputed.indexOf(sortObj) + 1;
    },
    removeSortingPriority: function removeSortingPriority(column) {
      if (this.backendSorting) {
        this.$emit('sorting-priority-removed', column.field);
      } else {
        this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(function (priority) {
          return priority.field !== column.field;
        });
        var formattedSortingPriority = this.sortMultipleDataLocal.map(function (i) {
          return (i.order && i.order === 'desc' ? '-' : '') + i.field;
        });
        this.newData = multiColumnSort(this.newData, formattedSortingPriority);
      }
    },
    resetMultiSorting: function resetMultiSorting() {
      this.sortMultipleDataLocal = [];
      this.currentSortColumn = {};
      this.newData = this.data;
    },

    /**
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy: function sortBy(array, key, fn, isAsc) {
      var sorted = []; // Sorting without mutating original data

      if (fn && typeof fn === 'function') {
        sorted = _toConsumableArray(array).sort(function (a, b) {
          return fn(a, b, isAsc);
        });
      } else {
        sorted = _toConsumableArray(array).sort(function (a, b) {
          // Get nested values from objects
          var newA = getValueByPath(a, key);
          var newB = getValueByPath(b, key); // sort boolean type

          if (typeof newA === 'boolean' && typeof newB === 'boolean') {
            return isAsc ? newA - newB : newB - newA;
          }

          if (!newA && newA !== 0) return 1;
          if (!newB && newB !== 0) return -1;
          if (newA === newB) return 0;
          newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
          newB = typeof newB === 'string' ? newB.toUpperCase() : newB;
          return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
        });
      }

      return sorted;
    },
    sortMultiColumn: function sortMultiColumn(column) {
      this.currentSortColumn = {};

      if (!this.backendSorting) {
        var existingPriority = this.sortMultipleDataLocal.filter(function (i) {
          return i.field === column.field;
        })[0];

        if (existingPriority) {
          existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc';
        } else {
          this.sortMultipleDataLocal.push({
            field: column.field,
            order: column.isAsc
          });
        }

        this.doSortMultiColumn();
      }
    },
    doSortMultiColumn: function doSortMultiColumn() {
      var formattedSortingPriority = this.sortMultipleDataLocal.map(function (i) {
        return (i.order && i.order === 'desc' ? '-' : '') + i.field;
      });
      this.newData = multiColumnSort(this.newData, formattedSortingPriority);
    },

    /**
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort: function sort(column) {
      var updatingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if ( // if backend sorting is enabled, just emit the sort press like usual
      // if the correct key combination isnt pressed, sort like usual
      !this.backendSorting && this.sortMultiple && (this.sortMultipleKey && event[this.sortMultipleKey] || !this.sortMultipleKey)) {
        if (updatingData) {
          this.doSortMultiColumn();
        } else {
          this.sortMultiColumn(column);
        }
      } else {
        if (!column || !column.sortable) return; // sort multiple is enabled but the correct key combination isnt pressed so reset

        if (this.sortMultiple) {
          this.sortMultipleDataLocal = [];
        }

        if (!updatingData) {
          this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
        }

        if (!this.firstTimeSort) {
          this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
        }

        if (!this.backendSorting) {
          this.doSortSingleColumn(column);
        }

        this.currentSortColumn = column;
      }
    },
    doSortSingleColumn: function doSortSingleColumn(column) {
      this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
    },
    isRowSelected: function isRowSelected(row, selected) {
      if (!selected) {
        return false;
      }

      if (this.customRowKey) {
        return row[this.customRowKey] === selected[this.customRowKey];
      }

      return row === selected;
    },

    /**
    * Check if the row is checked (is added to the array).
    */
    isRowChecked: function isRowChecked(row) {
      return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
    },

    /**
    * Remove a checked row from the array.
    */
    removeCheckedRow: function removeCheckedRow(row) {
      var index = indexOf(this.newCheckedRows, row, this.customIsChecked);

      if (index >= 0) {
        this.newCheckedRows.splice(index, 1);
      }
    },

    /**
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll: function checkAll() {
      var _this6 = this;

      var isAllChecked = this.isAllChecked;
      this.visibleData.forEach(function (currentRow) {
        if (_this6.isRowCheckable(currentRow)) {
          _this6.removeCheckedRow(currentRow);
        }

        if (!isAllChecked) {
          if (_this6.isRowCheckable(currentRow)) {
            _this6.newCheckedRows.push(currentRow);
          }
        }
      });
      this.$emit('check', this.newCheckedRows);
      this.$emit('check-all', this.newCheckedRows); // Emit checked rows to update user variable

      this.$emit('update:checkedRows', this.newCheckedRows);
    },

    /**
    * Row checkbox click listener.
    */
    checkRow: function checkRow(row, index, event) {
      if (!this.isRowCheckable(row)) return;
      var lastIndex = this.lastCheckedRowIndex;
      this.lastCheckedRowIndex = index;

      if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
        this.shiftCheckRow(row, index, lastIndex);
      } else if (!this.isRowChecked(row)) {
        this.newCheckedRows.push(row);
      } else {
        this.removeCheckedRow(row);
      }

      this.$emit('check', this.newCheckedRows, row); // Emit checked rows to update user variable

      this.$emit('update:checkedRows', this.newCheckedRows);
    },

    /**
     * Check row when shift is pressed.
     */
    shiftCheckRow: function shiftCheckRow(row, index, lastCheckedRowIndex) {
      var _this7 = this;

      // Get the subset of the list between the two indicies
      var subset = this.visibleData.slice(Math.min(index, lastCheckedRowIndex), Math.max(index, lastCheckedRowIndex) + 1); // Determine the operation based on the state of the clicked checkbox

      var shouldCheck = !this.isRowChecked(row);
      subset.forEach(function (item) {
        _this7.removeCheckedRow(item);

        if (shouldCheck && _this7.isRowCheckable(item)) {
          _this7.newCheckedRows.push(item);
        }
      });
    },

    /**
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow: function selectRow(row, index) {
      this.$emit('click', row);
      if (this.selected === row) return;
      if (!this.isRowSelectable(row)) return; // Emit new and old row

      this.$emit('select', row, this.selected); // Emit new row to update user variable

      this.$emit('update:selected', row);
    },

    /**
    * Toggle to show/hide details slot
    */
    toggleDetails: function toggleDetails(obj) {
      var found = this.isVisibleDetailRow(obj);

      if (found) {
        this.closeDetailRow(obj);
        this.$emit('details-close', obj);
      } else {
        this.openDetailRow(obj);
        this.$emit('details-open', obj);
      } // Syncs the detailed rows with the parent component


      this.$emit('update:openedDetailed', this.visibleDetailRows);
    },
    openDetailRow: function openDetailRow(obj) {
      var index = this.handleDetailKey(obj);
      this.visibleDetailRows.push(index);
    },
    closeDetailRow: function closeDetailRow(obj) {
      var index = this.handleDetailKey(obj);
      var i = this.visibleDetailRows.indexOf(index);
      this.visibleDetailRows.splice(i, 1);
    },
    isVisibleDetailRow: function isVisibleDetailRow(obj) {
      var index = this.handleDetailKey(obj);
      var result = this.visibleDetailRows.indexOf(index) >= 0;
      return result;
    },
    isActiveDetailRow: function isActiveDetailRow(row) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isActiveCustomDetailRow: function isActiveCustomDetailRow(row) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isRowFiltered: function isRowFiltered(row) {
      var _this8 = this;

      var _loop = function _loop(key) {
        // remove key if empty
        if (!_this8.filters[key]) {
          delete _this8.filters[key];
          return {
            v: true
          };
        }

        var input = _this8.filters[key];

        var column = _this8.newColumns.filter(function (c) {
          return c.field === key;
        })[0];

        if (column && column.customSearch && typeof column.customSearch === 'function') {
          return {
            v: column.customSearch(row, input)
          };
        } else {
          var value = _this8.getValueByPath(row, key);

          if (value == null) return {
            v: false
          };

          if (Number.isInteger(value)) {
            if (value !== Number(input)) return {
              v: false
            };
          } else {
            var re = new RegExp(escapeRegExpChars(input), 'i');
            if (!re.test(value)) return {
              v: false
            };
          }
        }
      };

      for (var key in this.filters) {
        var _ret = _loop(key);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return true;
    },

    /**
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey: function handleDetailKey(index) {
      var key = this.detailKey;
      return !key.length || !index ? index : index[key];
    },
    checkPredefinedDetailedRows: function checkPredefinedDetailedRows() {
      var defaultExpandedRowsDefined = this.openedDetailed.length > 0;

      if (defaultExpandedRowsDefined && !this.detailKey.length) {
        throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
      }
    },

    /**
    * Call initSort only first time (For example async data).
    */
    checkSort: function checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.newColumns.length) {
        if (Object.keys(this.currentSortColumn).length > 0) {
          for (var i = 0; i < this.newColumns.length; i++) {
            if (this.newColumns[i].field === this.currentSortColumn.field) {
              this.currentSortColumn = this.newColumns[i];
              break;
            }
          }
        }
      }
    },

    /**
    * Check if footer slot has custom content.
    */
    hasCustomFooterSlot: function hasCustomFooterSlot() {
      if (this.$slots.footer.length > 1) return true;
      var tag = this.$slots.footer[0].tag;
      if (tag !== 'th' && tag !== 'td') return false;
      return true;
    },

    /**
    * Check if bottom-left slot exists.
    */
    hasBottomLeftSlot: function hasBottomLeftSlot() {
      return typeof this.$slots['bottom-left'] !== 'undefined';
    },

    /**
    * Table arrow keys listener, change selection.
    */
    pressedArrow: function pressedArrow(pos) {
      if (!this.visibleData.length) return;
      var index = this.visibleData.indexOf(this.selected) + pos; // Prevent from going up from first and down from last

      index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
      var row = this.visibleData[index];

      if (!this.isRowSelectable(row)) {
        var newIndex = null;

        if (pos > 0) {
          for (var i = index; i < this.visibleData.length && newIndex === null; i++) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
          }
        } else {
          for (var _i = index; _i >= 0 && newIndex === null; _i--) {
            if (this.isRowSelectable(this.visibleData[_i])) newIndex = _i;
          }
        }

        if (newIndex >= 0) {
          this.selectRow(this.visibleData[newIndex]);
        }
      } else {
        this.selectRow(row);
      }
    },

    /**
    * Focus table element if has selected prop.
    */
    focus: function focus() {
      if (!this.focusable) return;
      this.$el.querySelector('table').focus();
    },

    /**
    * Initial sorted column based on the default-sort prop.
    */
    initSort: function initSort() {
      var _this9 = this;

      if (this.sortMultiple && this.sortMultipleData) {
        this.sortMultipleData.forEach(function (column) {
          _this9.sortMultiColumn(column);
        });
      } else {
        if (!this.defaultSort) return;
        var sortField = '';
        var sortDirection = this.defaultSortDirection;

        if (Array.isArray(this.defaultSort)) {
          sortField = this.defaultSort[0];

          if (this.defaultSort[1]) {
            sortDirection = this.defaultSort[1];
          }
        } else {
          sortField = this.defaultSort;
        }

        var sortColumn = this.newColumns.filter(function (column) {
          return column.field === sortField;
        })[0];

        if (sortColumn) {
          this.isAsc = sortDirection.toLowerCase() !== 'desc';
          this.sort(sortColumn, true);
        }
      }
    },

    /**
    * Emits drag start event (row)
    */
    handleDragStart: function handleDragStart(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = true;
      this.$emit('dragstart', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drag leave event (row)
    */
    handleDragEnd: function handleDragEnd(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = false;
      this.$emit('dragend', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drop event (row)
    */
    handleDrop: function handleDrop(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit('drop', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drag over event (row)
    */
    handleDragOver: function handleDragOver(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit('dragover', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drag leave event (row)
    */
    handleDragLeave: function handleDragLeave(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit('dragleave', {
        event: event,
        row: row,
        index: index
      });
    },
    emitEventForRow: function emitEventForRow(eventName, event, row) {
      return this.$listeners[eventName] ? this.$emit(eventName, row, event) : null;
    },

    /**
    * Emits drag start event (column)
    */
    handleColumnDragStart: function handleColumnDragStart(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = true;
      this.$emit('columndragstart', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drag leave event (column)
    */
    handleColumnDragEnd: function handleColumnDragEnd(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = false;
      this.$emit('columndragend', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drop event (column)
    */
    handleColumnDrop: function handleColumnDrop(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit('columndrop', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drag over event (column)
    */
    handleColumnDragOver: function handleColumnDragOver(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit('columndragover', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drag leave event (column)
    */
    handleColumnDragLeave: function handleColumnDragLeave(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit('columndragleave', {
        event: event,
        column: column,
        index: index
      });
    },
    refreshSlots: function refreshSlots() {
      this.defaultSlots = this.$slots.default || [];
    }
  },
  mounted: function mounted() {
    this.refreshSlots();
    this.checkPredefinedDetailedRows();
    this.checkSort();
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-table"},[_vm._t("default"),(_vm.mobileCards && _vm.hasSortablenewColumns)?_c('b-table-mobile-sort',{attrs:{"current-sort-column":_vm.currentSortColumn,"sort-multiple":_vm.sortMultiple,"sort-multiple-data":_vm.sortMultipleDataComputed,"is-asc":_vm.isAsc,"columns":_vm.newColumns,"placeholder":_vm.mobileSortPlaceholder,"icon-pack":_vm.iconPack,"sort-icon":_vm.sortIcon,"sort-icon-size":_vm.sortIconSize},on:{"sort":function (column, event) { return _vm.sort(column, null, event); },"removePriority":function (column) { return _vm.removeSortingPriority(column); }}}):_vm._e(),(_vm.paginated && (_vm.paginationPosition === 'top' || _vm.paginationPosition === 'both'))?[_vm._t("pagination",[_c('b-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"rounded":_vm.paginationRounded,"icon-pack":_vm.iconPack,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage=$event;},"update:current-page":function($event){_vm.newCurrentPage=$event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'b-table-pagination',_vm.$attrs,false),[_vm._t("top-left")],2)])]:_vm._e(),_c('div',{staticClass:"table-wrapper",class:_vm.tableWrapperClasses,style:(_vm.tableStyle)},[_c('table',{staticClass:"table",class:_vm.tableClasses,attrs:{"tabindex":!_vm.focusable ? false : 0},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(-1)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(1)}]}},[(_vm.newColumns.length && _vm.showHeader)?_c('thead',[_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('b-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'header',class:[column.thClasses, {
                            'is-current-sort': !_vm.sortMultiple && _vm.currentSortColumn === column,
                        }],style:(column.thStyle),attrs:{"draggable":_vm.canDragColumn},on:{"click":function($event){$event.stopPropagation();return _vm.sort(column, null, $event)},"dragstart":function($event){return _vm.handleColumnDragStart($event, column, index)},"dragend":function($event){return _vm.handleColumnDragEnd($event, column, index)},"drop":function($event){return _vm.handleColumnDrop($event, column, index)},"dragover":function($event){return _vm.handleColumnDragOver($event, column, index)},"dragleave":function($event){return _vm.handleColumnDragLeave($event, column, index)}}},'th',column.thAttrs(column),false),[_c('div',{staticClass:"th-wrap",class:{
                                'is-numeric': column.numeric,
                                'is-centered': column.centered
                        }},[(column.$scopedSlots && column.$scopedSlots.header)?[_c('b-slot-component',{attrs:{"component":column,"scoped":"","name":"header","tag":"span","props":{ column: column, index: index }}})]:[_c('span',{staticClass:"is-relative"},[_vm._v(" "+_vm._s(column.label)+" "),(_vm.sortMultiple &&
                                            _vm.sortMultipleDataComputed &&
                                            _vm.sortMultipleDataComputed.length > 0 &&
                                            _vm.sortMultipleDataComputed.filter(function (i) { return i.field === column.field; }).length > 0)?[_c('b-icon',{class:{
                                                'is-desc': _vm.sortMultipleDataComputed.filter(function (i) { return i.field === column.field; })[0].order === 'desc'},attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize}}),_vm._v(" "+_vm._s(_vm.findIndexOfSortData(column))+" "),_c('button',{staticClass:"delete is-small multi-sort-cancel-icon",attrs:{"type":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.removeSortingPriority(column)}}})]:_c('b-icon',{staticClass:"sort-icon",class:{
                                            'is-desc': !_vm.isAsc,
                                            'is-invisible': _vm.currentSortColumn !== column
                                        },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize}})],2)]],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('b-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e()],2),(_vm.hasCustomSubheadings)?_c('tr',{staticClass:"is-subheading"},[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',{key:column.newKey + ':' + index + 'subheading',style:(column.style)},[_c('div',{staticClass:"th-wrap",class:{
                                'is-numeric': column.numeric,
                                'is-centered': column.centered
                        }},[(column.$scopedSlots && column.$scopedSlots.subheading)?[_c('b-slot-component',{attrs:{"component":column,"scoped":"","name":"subheading","tag":"span","props":{ column: column, index: index }}})]:[_vm._v(_vm._s(column.subheading))]],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e(),(_vm.hasSearchablenewColumns)?_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'searchable',class:{'is-sticky': column.sticky},style:(column.thStyle)},'th',column.thAttrs(column),false),[_c('div',{staticClass:"th-wrap"},[(column.searchable)?[(column.$scopedSlots
                                    && column.$scopedSlots.searchable)?[_c('b-slot-component',{attrs:{"component":column,"scoped":true,"name":"searchable","tag":"span","props":{ column: column, filters: _vm.filters }}})]:_c('b-input',{attrs:{"type":column.numeric ? 'number' : 'text'},nativeOn:_vm._d({},[_vm.filtersEvent,function($event){return _vm.onFiltersEvent($event)}]),model:{value:(_vm.filters[column.field]),callback:function ($$v) {_vm.$set(_vm.filters, column.field, $$v);},expression:"filters[column.field]"}})]:_vm._e()],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e()]):_vm._e(),_c('tbody',[_vm._l((_vm.visibleData),function(row,index){return [_c('tr',{key:_vm.customRowKey ? row[_vm.customRowKey] : index,class:[_vm.rowClass(row, index), {
                            'is-selected': _vm.isRowSelected(row, _vm.selected),
                            'is-checked': _vm.isRowChecked(row),
                        }],attrs:{"draggable":_vm.canDragRow},on:{"click":function($event){return _vm.selectRow(row)},"dblclick":function($event){return _vm.$emit('dblclick', row)},"mouseenter":function($event){return _vm.emitEventForRow('mouseenter', $event, row)},"mouseleave":function($event){return _vm.emitEventForRow('mouseleave', $event, row)},"contextmenu":function($event){return _vm.$emit('contextmenu', row, $event)},"dragstart":function($event){return _vm.handleDragStart($event, row, index)},"dragend":function($event){return _vm.handleDragEnd($event, row, index)},"drop":function($event){return _vm.handleDrop($event, row, index)},"dragover":function($event){return _vm.handleDragOver($event, row, index)},"dragleave":function($event){return _vm.handleDragLeave($event, row, index)}}},[(_vm.showDetailRowIcon)?_c('td',{staticClass:"chevron-cell"},[(_vm.hasDetailedVisible(row))?_c('a',{attrs:{"role":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.toggleDetails(row)}}},[_c('b-icon',{class:{'is-expanded': _vm.isVisibleDetailRow(row)},attrs:{"icon":"chevron-right","pack":_vm.iconPack,"both":""}})],1):_vm._e()]):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('td',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[_c('b-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e(),_vm._l((_vm.visibleColumns),function(column,colindex){return [(column.$scopedSlots && column.$scopedSlots.default)?[_c('b-slot-component',_vm._b({key:column.newKey + ':' + index + ':' + colindex,class:column.getRootClasses(row),style:(column.getRootStyle(row)),attrs:{"component":column,"scoped":"","name":"default","tag":"td","data-label":column.label,"props":{ row: row, column: column, index: index, colindex: colindex, toggleDetails: _vm.toggleDetails }},nativeOn:{"click":function($event){return _vm.$emit('cellclick',row,column,index,colindex)}}},'b-slot-component',column.tdAttrs(row, column),false))]:_vm._e()]}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('td',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[_c('b-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e()],2),_c('transition',{key:(_vm.customRowKey ? row[_vm.customRowKey] : index) + 'detail',attrs:{"name":_vm.detailTransition}},[(_vm.isActiveDetailRow(row))?_c('tr',{staticClass:"detail"},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_c('div',{staticClass:"detail-container"},[_vm._t("detail",null,{"row":row,"index":index})],2)])]):_vm._e()]),(_vm.isActiveCustomDetailRow(row))?_vm._t("detail",null,{"row":row,"index":index}):_vm._e()]}),(!_vm.visibleData.length)?_c('tr',{staticClass:"is-empty"},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("empty")],2)]):_vm._e()],2),(_vm.$slots.footer !== undefined)?_c('tfoot',[_c('tr',{staticClass:"table-footer"},[(_vm.hasCustomFooterSlot())?_vm._t("footer"):_c('th',{attrs:{"colspan":_vm.columnCount}},[_vm._t("footer")],2)],2)]):_vm._e()]),(_vm.loading)?[_vm._t("loading",[_c('b-loading',{attrs:{"is-full-page":false,"active":_vm.loading},on:{"update:active":function($event){_vm.loading=$event;}}})])]:_vm._e()],2),((_vm.checkable && _vm.hasBottomLeftSlot()) ||
        (_vm.paginated && (_vm.paginationPosition === 'bottom' || _vm.paginationPosition === 'both')))?[_vm._t("pagination",[_c('b-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"rounded":_vm.paginationRounded,"icon-pack":_vm.iconPack,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage=$event;},"update:current-page":function($event){_vm.newCurrentPage=$event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'b-table-pagination',_vm.$attrs,false),[_vm._t("bottom-left")],2)])]:_vm._e()],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Table = __vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    // individual import + extend method into Table.vue
    if (typeof VueInstance === 'undefined') {
      setVueInstance(Vue);
    }

    registerComponent(Vue, Table);
    registerComponent(Vue, TableColumn);
  }
};
use(Plugin);

export default Plugin;
export { Table as BTable, TableColumn as BTableColumn };
