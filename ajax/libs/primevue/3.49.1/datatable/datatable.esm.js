import { FilterOperator, FilterService, FilterMatchMode } from 'primevue/api';
import ArrowDownIcon from 'primevue/icons/arrowdown';
import ArrowUpIcon from 'primevue/icons/arrowup';
import SpinnerIcon from 'primevue/icons/spinner';
import Paginator from 'primevue/paginator';
import { DomHandler, ObjectUtils, UniqueComponentId, HelperSet, ZIndexUtils, ConnectedOverlayScrollHandler } from 'primevue/utils';
import VirtualScroller from 'primevue/virtualscroller';
import BaseComponent from 'primevue/basecomponent';
import DataTableStyle from 'primevue/datatable/style';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronRightIcon from 'primevue/icons/chevronright';
import { mergeProps, resolveComponent, openBlock, createBlock, withCtx, resolveDynamicComponent, normalizeClass, createCommentVNode, resolveDirective, createElementBlock, toDisplayString, Fragment, withDirectives, createTextVNode, createElementVNode, withModifiers, renderList, normalizeProps, guardReactiveProps, createVNode, Transition, withKeys, renderSlot, createSlots } from 'vue';
import BarsIcon from 'primevue/icons/bars';
import CheckIcon from 'primevue/icons/check';
import PencilIcon from 'primevue/icons/pencil';
import TimesIcon from 'primevue/icons/times';
import OverlayEventBus from 'primevue/overlayeventbus';
import Ripple from 'primevue/ripple';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import FocusTrap from 'primevue/focustrap';
import FilterIcon from 'primevue/icons/filter';
import FilterSlashIcon from 'primevue/icons/filterslash';
import PlusIcon from 'primevue/icons/plus';
import TrashIcon from 'primevue/icons/trash';
import Portal from 'primevue/portal';
import SortAltIcon from 'primevue/icons/sortalt';
import SortAmountDownIcon from 'primevue/icons/sortamountdown';
import SortAmountUpAltIcon from 'primevue/icons/sortamountupalt';

var script$c = {
  name: 'BaseDataTable',
  "extends": BaseComponent,
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
    nullSortOrder: {
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
      "default": false
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
      type: [Array, Object],
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
      type: [String, Object],
      "default": null
    },
    rowStyle: {
      type: Object,
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
    highlightOnSelect: {
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
      type: [String, Object],
      "default": null
    },
    tableProps: {
      type: Object,
      "default": null
    },
    filterInputProps: {
      type: null,
      "default": null
    }
  },
  style: DataTableStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$b = {
  name: 'RowCheckbox',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
  methods: {
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          checked: this.checked,
          disabled: this.$attrs.disabled
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onChange: function onChange(event) {
      if (!this.$attrs.disabled) {
        this.$emit('change', {
          originalEvent: event,
          data: this.value
        });
      }
    }
  },
  computed: {
    checkboxAriaLabel: function checkboxAriaLabel() {
      return this.$primevue.config.locale.aria ? this.checked ? this.$primevue.config.locale.aria.selectRow : this.$primevue.config.locale.aria.unselectRow : undefined;
    }
  },
  components: {
    CheckIcon: CheckIcon,
    Checkbox: Checkbox
  }
};

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  var _component_Checkbox = resolveComponent("Checkbox");
  return openBlock(), createBlock(_component_Checkbox, {
    modelValue: $props.checked,
    binary: true,
    disabled: _ctx.$attrs.disabled,
    "aria-label": $options.checkboxAriaLabel,
    onChange: $options.onChange,
    unstyled: _ctx.unstyled,
    pt: $options.getColumnPT('rowCheckbox')
  }, {
    icon: withCtx(function (slotProps) {
      return [$props.rowCheckboxIconTemplate ? (openBlock(), createBlock(resolveDynamicComponent($props.rowCheckboxIconTemplate), {
        key: 0,
        checked: slotProps.checked,
        "class": normalizeClass(slotProps["class"])
      }, null, 8, ["checked", "class"])) : !$props.rowCheckboxIconTemplate && slotProps.checked ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
        key: 1,
        "class": slotProps["class"]
      }, $options.getColumnPT('rowCheckbox.icon')), null, 16, ["class"])) : createCommentVNode("", true)];
    }),
    _: 1
  }, 8, ["modelValue", "disabled", "aria-label", "onChange", "unstyled", "pt"]);
}

script$b.render = render$b;

var script$a = {
  name: 'RowRadioButton',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
  methods: {
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          checked: this.checked,
          disabled: this.$attrs.disabled
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onChange: function onChange(event) {
      if (!this.$attrs.disabled) {
        this.$emit('change', {
          originalEvent: event,
          data: this.value
        });
      }
    }
  },
  components: {
    RadioButton: RadioButton
  }
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_RadioButton = resolveComponent("RadioButton");
  return openBlock(), createBlock(_component_RadioButton, {
    modelValue: $props.checked,
    binary: true,
    disabled: _ctx.$attrs.disabled,
    name: $props.name,
    onChange: $options.onChange,
    unstyled: _ctx.unstyled,
    pt: $options.getColumnPT('rowRadiobutton')
  }, null, 8, ["modelValue", "disabled", "name", "onChange", "unstyled", "pt"]);
}

script$a.render = render$a;

var script$9 = {
  name: 'BodyCell',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
        var focusableEl = DomHandler.getFirstFocusableElement(_this.$el);
        focusableEl && focusableEl.focus();
      }, 1);
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.overlayEventListener) {
      OverlayEventBus.off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    }
  },
  methods: {
    columnProp: function columnProp(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance, _this$$parentInstance2;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size,
          showGridlines: (_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.showGridlines
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined;
    },
    resolveFieldData: function resolveFieldData() {
      return ObjectUtils.resolveFieldData(this.rowData, this.field);
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
      OverlayEventBus.off('overlay-click', this.overlayEventListener);
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
          OverlayEventBus.on('overlay-click', this.overlayEventListener);
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
          case 'NumpadEnter':
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
        DomHandler.invokeElementMethod(targetCell, 'click');
        event.preventDefault();
      }
    },
    moveToNextCell: function moveToNextCell(event) {
      var currentCell = this.findCell(event.target);
      var targetCell = this.findNextEditableColumn(currentCell);
      if (targetCell) {
        DomHandler.invokeElementMethod(targetCell, 'click');
        event.preventDefault();
      }
    },
    findCell: function findCell(element) {
      if (element) {
        var cell = element;
        while (cell && !DomHandler.getAttribute(cell, 'data-p-cell-editing')) {
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
        if (DomHandler.getAttribute(prevCell, 'data-p-editable-column')) return prevCell;else return this.findPreviousEditableColumn(prevCell);
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
        if (DomHandler.getAttribute(nextCell, 'data-p-editable-column')) return nextCell;else return this.findNextEditableColumn(nextCell);
      } else {
        return null;
      }
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
    DTRadioButton: script$a,
    DTCheckbox: script$b,
    ChevronDownIcon: ChevronDownIcon,
    ChevronRightIcon: ChevronRightIcon,
    BarsIcon: BarsIcon,
    PencilIcon: PencilIcon,
    CheckIcon: CheckIcon,
    TimesIcon: TimesIcon
  },
  directives: {
    ripple: Ripple
  }
};

function _typeof$a(o) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$a(o); }
function ownKeys$a(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$a(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$a(Object(t), !0).forEach(function (r) { _defineProperty$a(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(t) { var i = _toPrimitive$a(t, "string"); return "symbol" == _typeof$a(i) ? i : String(i); }
function _toPrimitive$a(t, r) { if ("object" != _typeof$a(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$a(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$4 = ["colspan", "rowspan", "data-p-selection-column", "data-p-editable-column", "data-p-cell-editing", "data-p-frozen-column"];
var _hoisted_2$2 = ["aria-expanded", "aria-controls", "aria-label"];
var _hoisted_3$2 = ["aria-label"];
var _hoisted_4$1 = ["aria-label"];
var _hoisted_5$1 = ["aria-label"];
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTRadioButton = resolveComponent("DTRadioButton");
  var _component_DTCheckbox = resolveComponent("DTCheckbox");
  var _component_BarsIcon = resolveComponent("BarsIcon");
  var _component_ChevronDownIcon = resolveComponent("ChevronDownIcon");
  var _component_ChevronRightIcon = resolveComponent("ChevronRightIcon");
  var _directive_ripple = resolveDirective("ripple");
  return $options.loading ? (openBlock(), createElementBlock("td", mergeProps({
    key: 0,
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell"
  }, _objectSpread$a(_objectSpread$a({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell'))), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children.loading), {
    data: $props.rowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow,
    loadingOptions: $options.loadingOptions
  }, null, 8, ["data", "column", "field", "index", "frozenRow", "loadingOptions"]))], 16)) : (openBlock(), createElementBlock("td", mergeProps({
    key: 1,
    style: $options.containerStyle,
    "class": $options.containerClass,
    colspan: $options.columnProp('colspan'),
    rowspan: $options.columnProp('rowspan'),
    onClick: _cache[6] || (_cache[6] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[7] || (_cache[7] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    role: "cell"
  }, _objectSpread$a(_objectSpread$a({}, $options.getColumnPT('root')), $options.getColumnPT('bodyCell')), {
    "data-p-selection-column": $options.columnProp('selectionMode') != null,
    "data-p-editable-column": $options.isEditable(),
    "data-p-cell-editing": $data.d_editing,
    "data-p-frozen-column": $options.columnProp('frozen')
  }), [$props.responsiveLayout === 'stack' ? (openBlock(), createElementBlock("span", mergeProps({
    key: 0,
    "class": _ctx.cx('columnTitle')
  }, $options.getColumnPT('columnTitle')), toDisplayString($options.columnProp('header')), 17)) : createCommentVNode("", true), $props.column.children && $props.column.children.body && !$data.d_editing ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.body), {
    key: 1,
    data: $props.rowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow,
    editorInitCallback: $options.editorInitCallback,
    rowTogglerCallback: $options.toggleRow
  }, null, 8, ["data", "column", "field", "index", "frozenRow", "editorInitCallback", "rowTogglerCallback"])) : $props.column.children && $props.column.children.editor && $data.d_editing ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.editor), {
    key: 2,
    data: $options.editingRowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow,
    editorSaveCallback: $options.editorSaveCallback,
    editorCancelCallback: $options.editorCancelCallback
  }, null, 8, ["data", "column", "field", "index", "frozenRow", "editorSaveCallback", "editorCancelCallback"])) : $props.column.children && $props.column.children.body && !$props.column.children.editor && $data.d_editing ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.body), {
    key: 3,
    data: $options.editingRowData,
    column: $props.column,
    field: $options.field,
    index: $props.rowIndex,
    frozenRow: $props.frozenRow
  }, null, 8, ["data", "column", "field", "index", "frozenRow"])) : $options.columnProp('selectionMode') ? (openBlock(), createElementBlock(Fragment, {
    key: 4
  }, [$options.columnProp('selectionMode') === 'single' ? (openBlock(), createBlock(_component_DTRadioButton, {
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
  }, null, 8, ["value", "name", "checked", "column", "index", "unstyled", "pt"])) : $options.columnProp('selectionMode') === 'multiple' ? (openBlock(), createBlock(_component_DTCheckbox, {
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
  }, null, 8, ["value", "checked", "rowCheckboxIconTemplate", "aria-selected", "column", "index", "unstyled", "pt"])) : createCommentVNode("", true)], 64)) : $options.columnProp('rowReorder') ? (openBlock(), createElementBlock(Fragment, {
    key: 5
  }, [$props.column.children && $props.column.children.rowreordericon ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.rowreordericon), {
    key: 0,
    "class": normalizeClass(_ctx.cx('rowReorderIcon'))
  }, null, 8, ["class"])) : $options.columnProp('rowReorderIcon') ? (openBlock(), createElementBlock("i", mergeProps({
    key: 1,
    "class": [_ctx.cx('rowReorderIcon'), $options.columnProp('rowReorderIcon')]
  }, $options.getColumnPT('rowReorderIcon')), null, 16)) : (openBlock(), createBlock(_component_BarsIcon, mergeProps({
    key: 2,
    "class": _ctx.cx('rowReorderIcon')
  }, $options.getColumnPT('rowReorderIcon')), null, 16, ["class"]))], 64)) : $options.columnProp('expander') ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 6,
    "class": _ctx.cx('rowToggler'),
    type: "button",
    "aria-expanded": $props.isRowExpanded,
    "aria-controls": $props.ariaControls,
    "aria-label": $options.expandButtonAriaLabel,
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.toggleRow && $options.toggleRow.apply($options, arguments);
    })
  }, $options.getColumnPT('rowToggler'), {
    "data-pc-group-section": "rowactionbutton"
  }), [$props.column.children && $props.column.children.rowtogglericon ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.rowtogglericon), {
    key: 0,
    "class": normalizeClass(_ctx.cx('rowTogglerIcon')),
    rowExpanded: $props.isRowExpanded
  }, null, 8, ["class", "rowExpanded"])) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [$props.isRowExpanded && $props.expandedRowIcon ? (openBlock(), createElementBlock("span", {
    key: 0,
    "class": normalizeClass([_ctx.cx('rowTogglerIcon'), $props.expandedRowIcon])
  }, null, 2)) : $props.isRowExpanded && !$props.expandedRowIcon ? (openBlock(), createBlock(_component_ChevronDownIcon, mergeProps({
    key: 1,
    "class": _ctx.cx('rowTogglerIcon')
  }, $options.getColumnPT('rowTogglerIcon')), null, 16, ["class"])) : !$props.isRowExpanded && $props.collapsedRowIcon ? (openBlock(), createElementBlock("span", {
    key: 2,
    "class": normalizeClass([_ctx.cx('rowTogglerIcon'), $props.collapsedRowIcon])
  }, null, 2)) : !$props.isRowExpanded && !$props.collapsedRowIcon ? (openBlock(), createBlock(_component_ChevronRightIcon, mergeProps({
    key: 3,
    "class": _ctx.cx('rowTogglerIcon')
  }, $options.getColumnPT('rowTogglerIcon')), null, 16, ["class"])) : createCommentVNode("", true)], 64))], 16, _hoisted_2$2)), [[_directive_ripple]]) : $props.editMode === 'row' && $options.columnProp('rowEditor') ? (openBlock(), createElementBlock(Fragment, {
    key: 7
  }, [!$data.d_editing ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    "class": _ctx.cx('rowEditorInitButton'),
    type: "button",
    "aria-label": $options.initButtonAriaLabel,
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.onRowEditInit && $options.onRowEditInit.apply($options, arguments);
    })
  }, $options.getColumnPT('rowEditorInitButton'), {
    "data-pc-group-section": "rowactionbutton"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.roweditoriniticon || 'PencilIcon'), mergeProps({
    "class": _ctx.cx('rowEditorInitIcon')
  }, $options.getColumnPT('rowEditorInitIcon')), null, 16, ["class"]))], 16, _hoisted_3$2)), [[_directive_ripple]]) : createCommentVNode("", true), $data.d_editing ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 1,
    "class": _ctx.cx('rowEditorSaveButton'),
    type: "button",
    "aria-label": $options.saveButtonAriaLabel,
    onClick: _cache[4] || (_cache[4] = function () {
      return $options.onRowEditSave && $options.onRowEditSave.apply($options, arguments);
    })
  }, $options.getColumnPT('rowEditorSaveButton'), {
    "data-pc-group-section": "rowactionbutton"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.roweditorsaveicon || 'CheckIcon'), mergeProps({
    "class": _ctx.cx('rowEditorSaveIcon')
  }, $options.getColumnPT('rowEditorSaveIcon')), null, 16, ["class"]))], 16, _hoisted_4$1)), [[_directive_ripple]]) : createCommentVNode("", true), $data.d_editing ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 2,
    "class": _ctx.cx('rowEditorCancelButton'),
    type: "button",
    "aria-label": $options.cancelButtonAriaLabel,
    onClick: _cache[5] || (_cache[5] = function () {
      return $options.onRowEditCancel && $options.onRowEditCancel.apply($options, arguments);
    })
  }, $options.getColumnPT('rowEditorCancelButton'), {
    "data-pc-group-section": "rowactionbutton"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.roweditorcancelicon || 'TimesIcon'), mergeProps({
    "class": _ctx.cx('rowEditorCancelIcon')
  }, $options.getColumnPT('rowEditorCancelIcon')), null, 16, ["class"]))], 16, _hoisted_5$1)), [[_directive_ripple]]) : createCommentVNode("", true)], 64)) : (openBlock(), createElementBlock(Fragment, {
    key: 8
  }, [createTextVNode(toDisplayString($options.resolveFieldData()), 1)], 64))], 16, _hoisted_1$4));
}

script$9.render = render$9;

function _typeof$9(o) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$9(o); }
function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$9(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$9(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$9(Object(t), !0).forEach(function (r) { _defineProperty$9(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(t) { var i = _toPrimitive$9(t, "string"); return "symbol" == _typeof$9(i) ? i : String(i); }
function _toPrimitive$9(t, r) { if ("object" != _typeof$9(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$9(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var script$8 = {
  name: 'BodyRow',
  hostName: 'DataTable',
  "extends": BaseComponent,
  emits: ['rowgroup-toggle', 'row-click', 'row-dblclick', 'row-rightclick', 'row-touchend', 'row-keydown', 'row-mousedown', 'row-dragstart', 'row-dragover', 'row-dragleave', 'row-dragend', 'row-drop', 'row-toggle', 'radio-change', 'checkbox-change', 'cell-edit-init', 'cell-edit-complete', 'cell-edit-cancel', 'row-edit-init', 'row-edit-save', 'row-edit-cancel', 'editing-meta-change'],
  props: {
    rowData: {
      type: Object,
      "default": null
    },
    index: {
      type: Number,
      "default": 0
    },
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
      type: [String, Function],
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
      type: [Array, Object],
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
    rowGroupHeaderStyle: {
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
    },
    expandedRowId: {
      type: String,
      "default": null
    },
    nameAttributeSelector: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      d_rowExpanded: false
    };
  },
  watch: {
    expandedRows: {
      immediate: true,
      handler: function handler(newValue) {
        var _this = this;
        this.d_rowExpanded = this.dataKey ? (newValue === null || newValue === void 0 ? void 0 : newValue[ObjectUtils.resolveFieldData(this.rowData, this.dataKey)]) !== undefined : newValue === null || newValue === void 0 ? void 0 : newValue.some(function (d) {
          return _this.equals(_this.rowData, d);
        });
      }
    }
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    //@todo - update this method
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.columnProp({}, 'pt'), key, columnMetaData));
    },
    //@todo - update this method
    getBodyRowPTOptions: function getBodyRowPTOptions(key) {
      var _this$$parentInstance;
      var datatable = (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.$parentInstance;
      return this.ptm(key, {
        context: {
          index: this.rowIndex,
          selectable: (datatable === null || datatable === void 0 ? void 0 : datatable.rowHover) || (datatable === null || datatable === void 0 ? void 0 : datatable.selectionMode),
          selected: this.isSelected,
          stripedRows: (datatable === null || datatable === void 0 ? void 0 : datatable.stripedRows) || false
        }
      });
    },
    shouldRenderBodyCell: function shouldRenderBodyCell(column) {
      var isHidden = this.columnProp(column, 'hidden');
      if (this.rowGroupMode && !isHidden) {
        var field = this.columnProp(column, 'field');
        if (this.rowGroupMode === 'subheader') {
          return this.groupRowsBy !== field;
        } else if (this.rowGroupMode === 'rowspan') {
          if (this.isGrouped(column)) {
            var prevRowData = this.value[this.rowIndex - 1];
            if (prevRowData) {
              var currentRowFieldData = ObjectUtils.resolveFieldData(this.value[this.rowIndex], field);
              var previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, field);
              return currentRowFieldData !== previousRowFieldData;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
        return !isHidden;
      }
    },
    calculateRowGroupSize: function calculateRowGroupSize(column) {
      if (this.isGrouped(column)) {
        var index = this.rowIndex;
        var field = this.columnProp(column, 'field');
        var currentRowFieldData = ObjectUtils.resolveFieldData(this.value[index], field);
        var nextRowFieldData = currentRowFieldData;
        var groupRowSpan = 0;
        while (currentRowFieldData === nextRowFieldData) {
          groupRowSpan++;
          var nextRowData = this.value[++index];
          if (nextRowData) {
            nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, field);
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
      var field = this.columnProp(column, 'field');
      if (this.groupRowsBy && field) {
        if (Array.isArray(this.groupRowsBy)) return this.groupRowsBy.indexOf(field) > -1;else return this.groupRowsBy === field;
      } else {
        return false;
      }
    },
    findIndexInSelection: function findIndexInSelection(data) {
      return this.findIndex(data, this.selection);
    },
    findIndex: function findIndex(data, collection) {
      var index = -1;
      if (collection && collection.length) {
        for (var i = 0; i < collection.length; i++) {
          if (this.equals(data, collection[i])) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    equals: function equals(data1, data2) {
      return this.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
    },
    onRowGroupToggle: function onRowGroupToggle(event) {
      this.$emit('rowgroup-toggle', {
        originalEvent: event,
        data: this.rowData
      });
    },
    onRowClick: function onRowClick(event) {
      this.$emit('row-click', {
        originalEvent: event,
        data: this.rowData,
        index: this.rowIndex
      });
    },
    onRowDblClick: function onRowDblClick(event) {
      this.$emit('row-dblclick', {
        originalEvent: event,
        data: this.rowData,
        index: this.rowIndex
      });
    },
    onRowRightClick: function onRowRightClick(event) {
      this.$emit('row-rightclick', {
        originalEvent: event,
        data: this.rowData,
        index: this.rowIndex
      });
    },
    onRowTouchEnd: function onRowTouchEnd(event) {
      this.$emit('row-touchend', event);
    },
    onRowKeyDown: function onRowKeyDown(event) {
      this.$emit('row-keydown', {
        originalEvent: event,
        data: this.rowData,
        index: this.rowIndex
      });
    },
    onRowMouseDown: function onRowMouseDown(event) {
      this.$emit('row-mousedown', event);
    },
    onRowDragStart: function onRowDragStart(event) {
      this.$emit('row-dragstart', {
        originalEvent: event,
        index: this.rowIndex
      });
    },
    onRowDragOver: function onRowDragOver(event) {
      this.$emit('row-dragover', {
        originalEvent: event,
        index: this.rowIndex
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
      this.d_rowExpanded = !this.d_rowExpanded;
      this.$emit('row-toggle', _objectSpread$9(_objectSpread$9({}, event), {}, {
        expanded: this.d_rowExpanded
      }));
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
    getVirtualScrollerProp: function getVirtualScrollerProp(option, options) {
      options = options || this.virtualScrollerContentProps;
      return options ? options[option] : null;
    }
  },
  computed: {
    rowIndex: function rowIndex() {
      var getItemOptions = this.getVirtualScrollerProp('getItemOptions');
      return getItemOptions ? getItemOptions(this.index).index : this.index;
    },
    rowStyles: function rowStyles() {
      var _this$rowStyle;
      return (_this$rowStyle = this.rowStyle) === null || _this$rowStyle === void 0 ? void 0 : _this$rowStyle.call(this, this.rowData);
    },
    rowClasses: function rowClasses() {
      var rowStyleClass = [];
      var columnSelectionMode = null;
      if (this.rowClass) {
        var rowClassValue = this.rowClass(this.rowData);
        if (rowClassValue) {
          rowStyleClass.push(rowClassValue);
        }
      }
      if (this.columns) {
        var _iterator = _createForOfIteratorHelper$2(this.columns),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var col = _step.value;
            var _selectionMode = this.columnProp(col, 'selectionMode');
            if (ObjectUtils.isNotEmpty(_selectionMode) && _selectionMode === 'multiple') {
              columnSelectionMode = _selectionMode;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return [this.cx('row', {
        rowData: this.rowData,
        index: this.rowIndex,
        columnSelectionMode: columnSelectionMode
      }), rowStyleClass];
    },
    rowTabindex: function rowTabindex() {
      if (this.selection === null && (this.selectionMode === 'single' || this.selectionMode === 'multiple')) {
        return this.rowIndex === 0 ? 0 : -1;
      }
      return -1;
    },
    isRowEditing: function isRowEditing() {
      if (this.rowData && this.editingRows) {
        if (this.dataKey) return this.editingRowKeys ? this.editingRowKeys[ObjectUtils.resolveFieldData(this.rowData, this.dataKey)] !== undefined : false;else return this.findIndex(this.rowData, this.editingRows) > -1;
      }
      return false;
    },
    isRowGroupExpanded: function isRowGroupExpanded() {
      if (this.expandableRowGroups && this.expandedRowGroups) {
        var groupFieldValue = ObjectUtils.resolveFieldData(this.rowData, this.groupRowsBy);
        return this.expandedRowGroups.indexOf(groupFieldValue) > -1;
      }
      return false;
    },
    isSelected: function isSelected() {
      if (this.rowData && this.selection) {
        if (this.dataKey) {
          return this.selectionKeys ? this.selectionKeys[ObjectUtils.resolveFieldData(this.rowData, this.dataKey)] !== undefined : false;
        } else {
          if (this.selection instanceof Array) return this.findIndexInSelection(this.rowData) > -1;else return this.equals(this.rowData, this.selection);
        }
      }
      return false;
    },
    isSelectedWithContextMenu: function isSelectedWithContextMenu() {
      if (this.rowData && this.contextMenuSelection) {
        return this.equals(this.rowData, this.contextMenuSelection, this.dataKey);
      }
      return false;
    },
    shouldRenderRowGroupHeader: function shouldRenderRowGroupHeader() {
      var currentRowFieldData = ObjectUtils.resolveFieldData(this.rowData, this.groupRowsBy);
      var prevRowData = this.value[this.rowIndex - 1];
      if (prevRowData) {
        var previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.groupRowsBy);
        return currentRowFieldData !== previousRowFieldData;
      } else {
        return true;
      }
    },
    shouldRenderRowGroupFooter: function shouldRenderRowGroupFooter() {
      if (this.expandableRowGroups && !this.isRowGroupExpanded) {
        return false;
      } else {
        var currentRowFieldData = ObjectUtils.resolveFieldData(this.rowData, this.groupRowsBy);
        var nextRowData = this.value[this.rowIndex + 1];
        if (nextRowData) {
          var nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.groupRowsBy);
          return currentRowFieldData !== nextRowFieldData;
        } else {
          return true;
        }
      }
    },
    columnsLength: function columnsLength() {
      var _this2 = this;
      if (this.columns) {
        var hiddenColLength = 0;
        this.columns.forEach(function (column) {
          if (_this2.columnProp(column, 'selectionMode') === 'single') hiddenColLength--;
          if (_this2.columnProp(column, 'hidden')) hiddenColLength++;
        });
        return this.columns.length - hiddenColLength;
      }
      return 0;
    }
  },
  components: {
    DTBodyCell: script$9,
    ChevronDownIcon: ChevronDownIcon,
    ChevronRightIcon: ChevronRightIcon
  }
};

function _typeof$8(o) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$8(o); }
function ownKeys$8(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$8(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$8(Object(t), !0).forEach(function (r) { _defineProperty$8(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(t) { var i = _toPrimitive$8(t, "string"); return "symbol" == _typeof$8(i) ? i : String(i); }
function _toPrimitive$8(t, r) { if ("object" != _typeof$8(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$8(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$3 = ["colspan"];
var _hoisted_2$1 = ["tabindex", "aria-selected", "data-p-index", "data-p-selectable-row", "data-p-highlight", "data-p-highlight-contextmenu"];
var _hoisted_3$1 = ["id"];
var _hoisted_4 = ["colspan"];
var _hoisted_5 = ["colspan"];
var _hoisted_6 = ["colspan"];
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ChevronDownIcon = resolveComponent("ChevronDownIcon");
  var _component_ChevronRightIcon = resolveComponent("ChevronRightIcon");
  var _component_DTBodyCell = resolveComponent("DTBodyCell");
  return !$props.empty ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [$props.templates['groupheader'] && $props.rowGroupMode === 'subheader' && $options.shouldRenderRowGroupHeader ? (openBlock(), createElementBlock("tr", mergeProps({
    key: 0,
    "class": _ctx.cx('rowGroupHeader'),
    style: $props.rowGroupHeaderStyle,
    role: "row"
  }, _ctx.ptm('rowGroupHeader')), [createElementVNode("td", mergeProps({
    colspan: $options.columnsLength - 1
  }, _objectSpread$8(_objectSpread$8({}, $options.getColumnPT('bodycell')), _ctx.ptm('rowGroupHeaderCell'))), [$props.expandableRowGroups ? (openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    "class": _ctx.cx('rowGroupToggler'),
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onRowGroupToggle && $options.onRowGroupToggle.apply($options, arguments);
    }),
    type: "button"
  }, _ctx.ptm('rowGroupToggler')), [$props.templates['rowgrouptogglericon'] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates['rowgrouptogglericon']), {
    key: 0,
    expanded: $options.isRowGroupExpanded
  }, null, 8, ["expanded"])) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [$options.isRowGroupExpanded && $props.expandedRowIcon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 0,
    "class": [_ctx.cx('rowGroupTogglerIcon'), $props.expandedRowIcon]
  }, _ctx.ptm('rowGroupTogglerIcon')), null, 16)) : $options.isRowGroupExpanded && !$props.expandedRowIcon ? (openBlock(), createBlock(_component_ChevronDownIcon, mergeProps({
    key: 1,
    "class": _ctx.cx('rowGroupTogglerIcon')
  }, _ctx.ptm('rowGroupTogglerIcon')), null, 16, ["class"])) : !$options.isRowGroupExpanded && $props.collapsedRowIcon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 2,
    "class": [_ctx.cx('rowGroupTogglerIcon'), $props.collapsedRowIcon]
  }, _ctx.ptm('rowGroupTogglerIcon')), null, 16)) : !$options.isRowGroupExpanded && !$props.collapsedRowIcon ? (openBlock(), createBlock(_component_ChevronRightIcon, mergeProps({
    key: 3,
    "class": _ctx.cx('rowGroupTogglerIcon')
  }, _ctx.ptm('rowGroupTogglerIcon')), null, 16, ["class"])) : createCommentVNode("", true)], 64))], 16)) : createCommentVNode("", true), (openBlock(), createBlock(resolveDynamicComponent($props.templates['groupheader']), {
    data: $props.rowData,
    index: $options.rowIndex
  }, null, 8, ["data", "index"]))], 16, _hoisted_1$3)], 16)) : createCommentVNode("", true), ($props.expandableRowGroups ? $options.isRowGroupExpanded : true) ? (openBlock(), createElementBlock("tr", mergeProps({
    key: 1,
    "class": $options.rowClasses,
    style: $options.rowStyles,
    tabindex: $options.rowTabindex,
    role: "row",
    "aria-selected": $props.selectionMode ? $options.isSelected : null,
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onRowClick && $options.onRowClick.apply($options, arguments);
    }),
    onDblclick: _cache[2] || (_cache[2] = function () {
      return $options.onRowDblClick && $options.onRowDblClick.apply($options, arguments);
    }),
    onContextmenu: _cache[3] || (_cache[3] = function () {
      return $options.onRowRightClick && $options.onRowRightClick.apply($options, arguments);
    }),
    onTouchend: _cache[4] || (_cache[4] = function () {
      return $options.onRowTouchEnd && $options.onRowTouchEnd.apply($options, arguments);
    }),
    onKeydown: _cache[5] || (_cache[5] = withModifiers(function () {
      return $options.onRowKeyDown && $options.onRowKeyDown.apply($options, arguments);
    }, ["self"])),
    onMousedown: _cache[6] || (_cache[6] = function () {
      return $options.onRowMouseDown && $options.onRowMouseDown.apply($options, arguments);
    }),
    onDragstart: _cache[7] || (_cache[7] = function () {
      return $options.onRowDragStart && $options.onRowDragStart.apply($options, arguments);
    }),
    onDragover: _cache[8] || (_cache[8] = function () {
      return $options.onRowDragOver && $options.onRowDragOver.apply($options, arguments);
    }),
    onDragleave: _cache[9] || (_cache[9] = function () {
      return $options.onRowDragLeave && $options.onRowDragLeave.apply($options, arguments);
    }),
    onDragend: _cache[10] || (_cache[10] = function () {
      return $options.onRowDragEnd && $options.onRowDragEnd.apply($options, arguments);
    }),
    onDrop: _cache[11] || (_cache[11] = function () {
      return $options.onRowDrop && $options.onRowDrop.apply($options, arguments);
    })
  }, $options.getBodyRowPTOptions('bodyRow'), {
    "data-p-index": $options.rowIndex,
    "data-p-selectable-row": $props.selectionMode ? true : false,
    "data-p-highlight": $props.selection && $options.isSelected,
    "data-p-highlight-contextmenu": $props.contextMenuSelection && $options.isSelectedWithContextMenu
  }), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, null, [$options.shouldRenderBodyCell(col) ? (openBlock(), createBlock(_component_DTBodyCell, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i,
      rowData: $props.rowData,
      column: col,
      rowIndex: $options.rowIndex,
      index: i,
      selected: $options.isSelected,
      frozenRow: $props.frozenRow,
      rowspan: $props.rowGroupMode === 'rowspan' ? $options.calculateRowGroupSize(col) : null,
      editMode: $props.editMode,
      editing: $props.editMode === 'row' && $options.isRowEditing,
      editingMeta: $props.editingMeta,
      responsiveLayout: $props.responsiveLayout,
      virtualScrollerContentProps: $props.virtualScrollerContentProps,
      ariaControls: $props.expandedRowId + '_' + $options.rowIndex + '_expansion',
      name: $props.nameAttributeSelector,
      isRowExpanded: $data.d_rowExpanded,
      expandedRowIcon: $props.expandedRowIcon,
      collapsedRowIcon: $props.collapsedRowIcon,
      onRadioChange: $options.onRadioChange,
      onCheckboxChange: $options.onCheckboxChange,
      onRowToggle: $options.onRowToggle,
      onCellEditInit: $options.onCellEditInit,
      onCellEditComplete: $options.onCellEditComplete,
      onCellEditCancel: $options.onCellEditCancel,
      onRowEditInit: $options.onRowEditInit,
      onRowEditSave: $options.onRowEditSave,
      onRowEditCancel: $options.onRowEditCancel,
      onEditingMetaChange: $options.onEditingMetaChange,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["rowData", "column", "rowIndex", "index", "selected", "frozenRow", "rowspan", "editMode", "editing", "editingMeta", "responsiveLayout", "virtualScrollerContentProps", "ariaControls", "name", "isRowExpanded", "expandedRowIcon", "collapsedRowIcon", "onRadioChange", "onCheckboxChange", "onRowToggle", "onCellEditInit", "onCellEditComplete", "onCellEditCancel", "onRowEditInit", "onRowEditSave", "onRowEditCancel", "onEditingMetaChange", "unstyled", "pt"])) : createCommentVNode("", true)], 64);
  }), 256))], 16, _hoisted_2$1)) : createCommentVNode("", true), $props.templates['expansion'] && $props.expandedRows && $data.d_rowExpanded ? (openBlock(), createElementBlock("tr", mergeProps({
    key: 2,
    id: $props.expandedRowId + '_' + $options.rowIndex + '_expansion',
    "class": _ctx.cx('rowExpansion'),
    role: "row"
  }, _ctx.ptm('rowExpansion')), [createElementVNode("td", mergeProps({
    colspan: $options.columnsLength
  }, _objectSpread$8(_objectSpread$8({}, $options.getColumnPT('bodycell')), _ctx.ptm('rowExpansionCell'))), [(openBlock(), createBlock(resolveDynamicComponent($props.templates['expansion']), {
    data: $props.rowData,
    index: $options.rowIndex
  }, null, 8, ["data", "index"]))], 16, _hoisted_4)], 16, _hoisted_3$1)) : createCommentVNode("", true), $props.templates['groupfooter'] && $props.rowGroupMode === 'subheader' && $options.shouldRenderRowGroupFooter ? (openBlock(), createElementBlock("tr", mergeProps({
    key: 3,
    "class": _ctx.cx('rowGroupFooter'),
    role: "row"
  }, _ctx.ptm('rowGroupFooter')), [createElementVNode("td", mergeProps({
    colspan: $options.columnsLength - 1
  }, _objectSpread$8(_objectSpread$8({}, $options.getColumnPT('bodycell')), _ctx.ptm('rowGroupFooterCell'))), [(openBlock(), createBlock(resolveDynamicComponent($props.templates['groupfooter']), {
    data: $props.rowData,
    index: $options.rowIndex
  }, null, 8, ["data", "index"]))], 16, _hoisted_5)], 16)) : createCommentVNode("", true)], 64)) : (openBlock(), createElementBlock("tr", mergeProps({
    key: 1,
    "class": _ctx.cx('emptyMessage'),
    role: "row"
  }, _ctx.ptm('emptyMessage')), [createElementVNode("td", mergeProps({
    colspan: $options.columnsLength
  }, _objectSpread$8(_objectSpread$8({}, $options.getColumnPT('bodycell')), _ctx.ptm('emptyMessageCell'))), [$props.templates.empty ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.empty), {
    key: 0
  })) : createCommentVNode("", true)], 16, _hoisted_6)], 16));
}

script$8.render = render$8;

var script$7 = {
  name: 'TableBody',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
      type: [String, Function],
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
      type: [Array, Object],
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
      rowGroupHeaderStyleObject: {}
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
    getRowKey: function getRowKey(rowData, rowIndex) {
      return this.dataKey ? ObjectUtils.resolveFieldData(rowData, this.dataKey) : rowIndex;
    },
    updateFrozenRowStickyPosition: function updateFrozenRowStickyPosition() {
      this.$el.style.top = DomHandler.getOuterHeight(this.$el.previousElementSibling) + 'px';
    },
    updateFrozenRowGroupHeaderStickyPosition: function updateFrozenRowGroupHeaderStickyPosition() {
      var tableHeaderHeight = DomHandler.getOuterHeight(this.$el.previousElementSibling);
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
    }
  },
  computed: {
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
    ptmTBodyOptions: function ptmTBodyOptions() {
      var _this$$parentInstance;
      return {
        context: {
          scrollable: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.scrollable
        }
      };
    },
    expandedRowId: function expandedRowId() {
      return UniqueComponentId();
    },
    nameAttributeSelector: function nameAttributeSelector() {
      return UniqueComponentId();
    }
  },
  components: {
    DTBodyRow: script$8
  }
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTBodyRow = resolveComponent("DTBodyRow");
  return openBlock(), createElementBlock("tbody", mergeProps({
    ref: $options.bodyRef,
    "class": _ctx.cx('tbody'),
    role: "rowgroup",
    style: $options.bodyStyle
  }, _ctx.ptm('tbody', $options.ptmTBodyOptions)), [!$props.empty ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($props.value, function (rowData, rowIndex) {
    return openBlock(), createBlock(_component_DTBodyRow, {
      key: $options.getRowKey(rowData, rowIndex),
      rowData: rowData,
      index: rowIndex,
      value: $props.value,
      columns: $props.columns,
      frozenRow: $props.frozenRow,
      empty: $props.empty,
      first: $props.first,
      dataKey: $props.dataKey,
      selection: $props.selection,
      selectionKeys: $props.selectionKeys,
      selectionMode: $props.selectionMode,
      contextMenu: $props.contextMenu,
      contextMenuSelection: $props.contextMenuSelection,
      rowGroupMode: $props.rowGroupMode,
      groupRowsBy: $props.groupRowsBy,
      expandableRowGroups: $props.expandableRowGroups,
      rowClass: $props.rowClass,
      rowStyle: $props.rowStyle,
      editMode: $props.editMode,
      compareSelectionBy: $props.compareSelectionBy,
      scrollable: $props.scrollable,
      expandedRowIcon: $props.expandedRowIcon,
      collapsedRowIcon: $props.collapsedRowIcon,
      expandedRows: $props.expandedRows,
      expandedRowGroups: $props.expandedRowGroups,
      editingRows: $props.editingRows,
      editingRowKeys: $props.editingRowKeys,
      templates: $props.templates,
      responsiveLayout: $props.responsiveLayout,
      virtualScrollerContentProps: $props.virtualScrollerContentProps,
      isVirtualScrollerDisabled: $props.isVirtualScrollerDisabled,
      editingMeta: $props.editingMeta,
      rowGroupHeaderStyle: $options.rowGroupHeaderStyle,
      expandedRowId: $options.expandedRowId,
      nameAttributeSelector: $options.nameAttributeSelector,
      onRowgroupToggle: _cache[0] || (_cache[0] = function ($event) {
        return _ctx.$emit('rowgroup-toggle', $event);
      }),
      onRowClick: _cache[1] || (_cache[1] = function ($event) {
        return _ctx.$emit('row-click', $event);
      }),
      onRowDblclick: _cache[2] || (_cache[2] = function ($event) {
        return _ctx.$emit('row-dblclick', $event);
      }),
      onRowRightclick: _cache[3] || (_cache[3] = function ($event) {
        return _ctx.$emit('row-rightclick', $event);
      }),
      onRowTouchend: _cache[4] || (_cache[4] = function ($event) {
        return _ctx.$emit('row-touchend', $event);
      }),
      onRowKeydown: _cache[5] || (_cache[5] = function ($event) {
        return _ctx.$emit('row-keydown', $event);
      }),
      onRowMousedown: _cache[6] || (_cache[6] = function ($event) {
        return _ctx.$emit('row-mousedown', $event);
      }),
      onRowDragstart: _cache[7] || (_cache[7] = function ($event) {
        return _ctx.$emit('row-dragstart', $event);
      }),
      onRowDragover: _cache[8] || (_cache[8] = function ($event) {
        return _ctx.$emit('row-dragover', $event);
      }),
      onRowDragleave: _cache[9] || (_cache[9] = function ($event) {
        return _ctx.$emit('row-dragleave', $event);
      }),
      onRowDragend: _cache[10] || (_cache[10] = function ($event) {
        return _ctx.$emit('row-dragend', $event);
      }),
      onRowDrop: _cache[11] || (_cache[11] = function ($event) {
        return _ctx.$emit('row-drop', $event);
      }),
      onRowToggle: _cache[12] || (_cache[12] = function ($event) {
        return _ctx.$emit('row-toggle', $event);
      }),
      onRadioChange: _cache[13] || (_cache[13] = function ($event) {
        return _ctx.$emit('radio-change', $event);
      }),
      onCheckboxChange: _cache[14] || (_cache[14] = function ($event) {
        return _ctx.$emit('checkbox-change', $event);
      }),
      onCellEditInit: _cache[15] || (_cache[15] = function ($event) {
        return _ctx.$emit('cell-edit-init', $event);
      }),
      onCellEditComplete: _cache[16] || (_cache[16] = function ($event) {
        return _ctx.$emit('cell-edit-complete', $event);
      }),
      onCellEditCancel: _cache[17] || (_cache[17] = function ($event) {
        return _ctx.$emit('cell-edit-cancel', $event);
      }),
      onRowEditInit: _cache[18] || (_cache[18] = function ($event) {
        return _ctx.$emit('row-edit-init', $event);
      }),
      onRowEditSave: _cache[19] || (_cache[19] = function ($event) {
        return _ctx.$emit('row-edit-save', $event);
      }),
      onRowEditCancel: _cache[20] || (_cache[20] = function ($event) {
        return _ctx.$emit('row-edit-cancel', $event);
      }),
      onEditingMetaChange: _cache[21] || (_cache[21] = function ($event) {
        return _ctx.$emit('editing-meta-change', $event);
      }),
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["rowData", "index", "value", "columns", "frozenRow", "empty", "first", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "virtualScrollerContentProps", "isVirtualScrollerDisabled", "editingMeta", "rowGroupHeaderStyle", "expandedRowId", "nameAttributeSelector", "unstyled", "pt"]);
  }), 128)) : (openBlock(), createBlock(_component_DTBodyRow, {
    key: 1,
    empty: $props.empty,
    columns: $props.columns,
    templates: $props.templates
  }, null, 8, ["empty", "columns", "templates"]))], 16);
}

script$7.render = render$7;

var script$6 = {
  name: 'FooterCell',
  hostName: 'DataTable',
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
      var _this$$parentInstance, _this$$parentInstance2;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size,
          showGridlines: ((_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.showGridlines) || false
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

function _typeof$7(o) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$7(o); }
function ownKeys$7(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$7(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$7(Object(t), !0).forEach(function (r) { _defineProperty$7(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(t) { var i = _toPrimitive$7(t, "string"); return "symbol" == _typeof$7(i) ? i : String(i); }
function _toPrimitive$7(t, r) { if ("object" != _typeof$7(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$7(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$2 = ["colspan", "rowspan", "data-p-frozen-column"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("td", mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell",
    colspan: $options.columnProp('colspan'),
    rowspan: $options.columnProp('rowspan')
  }, _objectSpread$7(_objectSpread$7({}, $options.getColumnPT('root')), $options.getColumnPT('footerCell')), {
    "data-p-frozen-column": $options.columnProp('frozen')
  }), [$props.column.children && $props.column.children.footer ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.footer), {
    key: 0,
    column: $props.column
  }, null, 8, ["column"])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString($options.columnProp('footer')), 1)], 16, _hoisted_1$2);
}

script$6.render = render$6;

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$5 = {
  name: 'TableFooter',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
  provide: function provide() {
    return {
      $rows: this.d_footerRows,
      $columns: this.d_footerColumns
    };
  },
  data: function data() {
    return {
      d_footerRows: new HelperSet({
        type: 'Row'
      }),
      d_footerColumns: new HelperSet({
        type: 'Column'
      })
    };
  },
  beforeUnmount: function beforeUnmount() {
    this.d_footerRows.clear();
    this.d_footerColumns.clear();
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    getColumnGroupPT: function getColumnGroupPT(key) {
      var columnGroupMetaData = {
        props: this.getColumnGroupProps(),
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          type: 'footer',
          scrollable: this.ptmTFootOptions.context.scrollable
        }
      };
      return mergeProps(this.ptm("columnGroup.".concat(key), {
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
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index
        }
      };
      return mergeProps(this.ptm("row.".concat(key), {
        row: rowMetaData
      }), this.ptm("row.".concat(key), rowMetaData), this.ptmo(this.getRowProp(row), key, rowMetaData));
    },
    getRowProp: function getRowProp(row) {
      return row.props && row.props.pt ? row.props.pt : undefined; //@todo
    },
    getFooterRows: function getFooterRows() {
      var _this$d_footerRows;
      return (_this$d_footerRows = this.d_footerRows) === null || _this$d_footerRows === void 0 ? void 0 : _this$d_footerRows.get(this.columnGroup, this.columnGroup.children);
    },
    getFooterColumns: function getFooterColumns(row) {
      var _this$d_footerColumns;
      return (_this$d_footerColumns = this.d_footerColumns) === null || _this$d_footerColumns === void 0 ? void 0 : _this$d_footerColumns.get(row, row.children);
    }
  },
  computed: {
    hasFooter: function hasFooter() {
      var hasFooter = false;
      if (this.columnGroup) {
        hasFooter = true;
      } else if (this.columns) {
        var _iterator = _createForOfIteratorHelper$1(this.columns),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var col = _step.value;
            if (this.columnProp(col, 'footer') || col.children && col.children.footer) {
              hasFooter = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
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

function _typeof$6(o) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$6(o); }
function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), !0).forEach(function (r) { _defineProperty$6(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(t) { var i = _toPrimitive$6(t, "string"); return "symbol" == _typeof$6(i) ? i : String(i); }
function _toPrimitive$6(t, r) { if ("object" != _typeof$6(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$6(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTFooterCell = resolveComponent("DTFooterCell");
  return $options.hasFooter ? (openBlock(), createElementBlock("tfoot", mergeProps({
    key: 0,
    "class": _ctx.cx('tfoot'),
    style: _ctx.sx('tfoot'),
    role: "rowgroup"
  }, $props.columnGroup ? _objectSpread$6(_objectSpread$6({}, _ctx.ptm('tfoot', $options.ptmTFootOptions)), $options.getColumnGroupPT('root')) : _ctx.ptm('tfoot', $options.ptmTFootOptions), {
    "data-pc-section": "tfoot"
  }), [!$props.columnGroup ? (openBlock(), createElementBlock("tr", mergeProps({
    key: 0,
    role: "row"
  }, _ctx.ptm('footerRow')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') ? (openBlock(), createBlock(_component_DTFooterCell, {
      key: 0,
      column: col,
      pt: _ctx.pt
    }, null, 8, ["column", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16)) : (openBlock(true), createElementBlock(Fragment, {
    key: 1
  }, renderList($options.getFooterRows(), function (row, i) {
    return openBlock(), createElementBlock("tr", mergeProps({
      key: i,
      role: "row"
    }, _objectSpread$6(_objectSpread$6({}, _ctx.ptm('footerRow')), $options.getRowPT(row, 'root', i))), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.getFooterColumns(row), function (col, j) {
      return openBlock(), createElementBlock(Fragment, {
        key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || j
      }, [!$options.columnProp(col, 'hidden') ? (openBlock(), createBlock(_component_DTFooterCell, {
        key: 0,
        column: col,
        index: i,
        pt: _ctx.pt
      }, null, 8, ["column", "index", "pt"])) : createCommentVNode("", true)], 64);
    }), 128))], 16);
  }), 128))], 16)) : createCommentVNode("", true);
}

script$5.render = render$5;

function _typeof$5(o) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$5(o); }
function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty$5(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(t) { var i = _toPrimitive$5(t, "string"); return "symbol" == _typeof$5(i) ? i : String(i); }
function _toPrimitive$5(t, r) { if ("object" != _typeof$5(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$5(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var script$4 = {
  name: 'ColumnFilter',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
      id: this.$attrs.id,
      overlayVisible: false,
      defaultMatchMode: null,
      defaultOperator: null
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
  },
  overlay: null,
  selfClick: false,
  overlayEventListener: null,
  beforeUnmount: function beforeUnmount() {
    if (this.overlayEventListener) {
      OverlayEventBus.off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.onOverlayHide();
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
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
          instance: this,
          props: this.$props,
          state: this.$data
        }
      }, params);
      return mergeProps(this.ptm("column.".concat(key), {
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
        case 'NumpadEnter':
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
      if (nextItem) return DomHandler.getAttribute(nextItem, 'data-pc-section') === 'filterseparator' ? this.findNextItem(nextItem) : nextItem;else return item.parentElement.firstElementChild;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return DomHandler.getAttribute(prevItem, 'data-pc-section') === 'filterseparator' ? this.findPrevItem(prevItem) : prevItem;else return item.parentElement.lastElementChild;
    },
    hide: function hide() {
      this.overlayVisible = false;
      DomHandler.focus(this.$refs.icon);
    },
    onContentClick: function onContentClick(event) {
      this.selfClick = true;
      OverlayEventBus.emit('overlay-click', {
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
        DomHandler.applyStyle(this.overlay, this.filterMenuStyle);
      }
      ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      DomHandler.absolutePosition(this.overlay, this.$refs.icon);
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.overlayEventListener = function (e) {
        if (!_this.isOutsideClicked(e.target)) {
          _this.selfClick = true;
        }
      };
      OverlayEventBus.on('overlay-click', this.overlayEventListener);
    },
    onOverlayAfterEnter: function onOverlayAfterEnter() {
      var _this$overlay;
      (_this$overlay = this.overlay) === null || _this$overlay === void 0 || (_this$overlay = _this$overlay.$focustrap) === null || _this$overlay === void 0 || _this$overlay.autoFocus();
    },
    onOverlayLeave: function onOverlayLeave() {
      this.onOverlayHide();
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    onOverlayHide: function onOverlayHide() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
      this.unbindScrollListener();
      this.overlay = null;
      OverlayEventBus.off('overlay-click', this.overlayEventListener);
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
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.icon, function () {
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
          if (_this4.overlayVisible && !DomHandler.isTouchDevice()) {
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
      return this.id + '_overlay';
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
        value: FilterOperator.AND
      }, {
        label: this.$primevue.config.locale.matchAny,
        value: FilterOperator.OR
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
    CFDropdown: Dropdown,
    CFButton: Button,
    Portal: Portal,
    FilterSlashIcon: FilterSlashIcon,
    FilterIcon: FilterIcon,
    TrashIcon: TrashIcon,
    PlusIcon: PlusIcon
  },
  directives: {
    focustrap: FocusTrap
  }
};

function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty$4(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$4(i) ? i : String(i); }
function _toPrimitive$4(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$1 = ["aria-label", "aria-expanded", "aria-controls"];
var _hoisted_2 = ["id", "aria-modal"];
var _hoisted_3 = ["onClick", "onKeydown", "tabindex"];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CFDropdown = resolveComponent("CFDropdown");
  var _component_CFButton = resolveComponent("CFButton");
  var _component_Portal = resolveComponent("Portal");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('columnFilter')
  }, $options.getColumnPT('columnFilter')), [$props.display === 'row' ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('filterInput')
  }, _objectSpread$4(_objectSpread$4({}, $props.filterInputProps), $options.getColumnPT('filterInput'))), [(openBlock(), createBlock(resolveDynamicComponent($props.filterElement), {
    field: $props.field,
    filterModel: $props.filters[$props.field],
    filterCallback: $options.filterCallback
  }, null, 8, ["field", "filterModel", "filterCallback"]))], 16)) : createCommentVNode("", true), $options.showMenuButton ? (openBlock(), createElementBlock("button", mergeProps({
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
  }, $options.getColumnPT('filterMenuButton', $options.ptmFilterMenuParams)), [(openBlock(), createBlock(resolveDynamicComponent($props.filterIconTemplate || 'FilterIcon'), normalizeProps(guardReactiveProps($options.getColumnPT('filterMenuIcon'))), null, 16))], 16, _hoisted_1$1)) : createCommentVNode("", true), $props.showClearButton && $props.display === 'row' ? (openBlock(), createElementBlock("button", mergeProps({
    key: 2,
    "class": _ctx.cx('headerFilterClearButton'),
    type: "button",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.clearFilter();
    })
  }, $options.getColumnPT('headerFilterClearButton', $options.ptmHeaderFilterClearParams)), [(openBlock(), createBlock(resolveDynamicComponent($props.filterClearIconTemplate || 'FilterSlashIcon'), normalizeProps(guardReactiveProps($options.getColumnPT('filterClearIcon'))), null, 16))], 16)) : createCommentVNode("", true), createVNode(_component_Portal, null, {
    "default": withCtx(function () {
      return [createVNode(Transition, mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, $options.getColumnPT('transition')), {
        "default": withCtx(function () {
          return [$data.overlayVisible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: $options.overlayId,
            "aria-modal": $data.overlayVisible,
            role: "dialog",
            "class": [_ctx.cx('filterOverlay'), $props.filterMenuClass],
            onKeydown: _cache[10] || (_cache[10] = withKeys(function () {
              return $options.hide && $options.hide.apply($options, arguments);
            }, ["escape"])),
            onClick: _cache[11] || (_cache[11] = function () {
              return $options.onContentClick && $options.onContentClick.apply($options, arguments);
            }),
            onMousedown: _cache[12] || (_cache[12] = function () {
              return $options.onContentMouseDown && $options.onContentMouseDown.apply($options, arguments);
            })
          }, $options.getColumnPT('filterOverlay')), [(openBlock(), createBlock(resolveDynamicComponent($props.filterHeaderTemplate), {
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.filterCallback
          }, null, 8, ["field", "filterModel", "filterCallback"])), $props.display === 'row' ? (openBlock(), createElementBlock("ul", mergeProps({
            key: 0,
            "class": _ctx.cx('filterRowItems')
          }, $options.getColumnPT('filterRowItems')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.matchModes, function (matchMode, i) {
            return openBlock(), createElementBlock("li", mergeProps({
              key: matchMode.label,
              "class": _ctx.cx('filterRowItem', {
                matchMode: matchMode
              }),
              onClick: function onClick($event) {
                return $options.onRowMatchModeChange(matchMode.value);
              },
              onKeydown: [_cache[3] || (_cache[3] = function ($event) {
                return $options.onRowMatchModeKeyDown($event);
              }), withKeys(withModifiers(function ($event) {
                return $options.onRowMatchModeChange(matchMode.value);
              }, ["prevent"]), ["enter"])],
              tabindex: i === 0 ? '0' : null
            }, $options.getColumnPT('filterRowItem', $options.ptmFilterRowItemOptions(matchMode))), toDisplayString(matchMode.label), 17, _hoisted_3);
          }), 128)), createElementVNode("li", mergeProps({
            "class": _ctx.cx('filterSeparator')
          }, $options.getColumnPT('filterSeparator')), null, 16), createElementVNode("li", mergeProps({
            "class": _ctx.cx('filterRowItem'),
            onClick: _cache[4] || (_cache[4] = function ($event) {
              return $options.clearFilter();
            }),
            onKeydown: [_cache[5] || (_cache[5] = function ($event) {
              return $options.onRowMatchModeKeyDown($event);
            }), _cache[6] || (_cache[6] = withKeys(function ($event) {
              return _ctx.onRowClearItemClick();
            }, ["enter"]))]
          }, $options.getColumnPT('filterRowItem')), toDisplayString($options.noFilterLabel), 17)], 16)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [$options.isShowOperator ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx('filterOperator')
          }, $options.getColumnPT('filterOperator')), [createVNode(_component_CFDropdown, {
            options: $options.operatorOptions,
            modelValue: $options.operator,
            "aria-label": $options.filterOperatorAriaLabel,
            "class": normalizeClass(_ctx.cx('filterOperatorDropdown')),
            optionLabel: "label",
            optionValue: "value",
            "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
              return $options.onOperatorChange($event);
            }),
            unstyled: _ctx.unstyled,
            pt: $options.getColumnPT('filterOperatorDropdown')
          }, null, 8, ["options", "modelValue", "aria-label", "class", "unstyled", "pt"])], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
            "class": _ctx.cx('filterConstraints')
          }, $options.getColumnPT('filterConstraints')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.fieldConstraints, function (fieldConstraint, i) {
            return openBlock(), createElementBlock("div", mergeProps({
              key: i,
              "class": _ctx.cx('filterConstraint')
            }, $options.getColumnPT('filterConstraint')), [$options.isShowMatchModes ? (openBlock(), createBlock(_component_CFDropdown, {
              key: 0,
              options: $options.matchModes,
              modelValue: fieldConstraint.matchMode,
              "class": normalizeClass(_ctx.cx('filterMatchModeDropdown')),
              optionLabel: "label",
              optionValue: "value",
              "aria-label": $options.filterConstraintAriaLabel,
              "onUpdate:modelValue": function onUpdateModelValue($event) {
                return $options.onMenuMatchModeChange($event, i);
              },
              unstyled: _ctx.unstyled,
              pt: $options.getColumnPT('filterMatchModeDropdown')
            }, null, 8, ["options", "modelValue", "class", "aria-label", "onUpdate:modelValue", "unstyled", "pt"])) : createCommentVNode("", true), $props.display === 'menu' ? (openBlock(), createBlock(resolveDynamicComponent($props.filterElement), {
              key: 1,
              field: $props.field,
              filterModel: fieldConstraint,
              filterCallback: $options.filterCallback,
              applyFilter: $options.applyFilter
            }, null, 8, ["field", "filterModel", "filterCallback", "applyFilter"])) : createCommentVNode("", true), createElementVNode("div", normalizeProps(guardReactiveProps($options.getColumnPT('filterRemove'))), [$options.showRemoveIcon ? (openBlock(), createBlock(_component_CFButton, {
              key: 0,
              type: "button",
              "class": normalizeClass(_ctx.cx('filterRemoveButton')),
              onClick: function onClick($event) {
                return $options.removeConstraint(i);
              },
              label: $options.removeRuleButtonLabel,
              unstyled: _ctx.unstyled,
              text: "",
              severity: "danger",
              size: "small",
              pt: $options.getColumnPT('filterRemoveButton')
            }, {
              icon: withCtx(function (iconProps) {
                return [(openBlock(), createBlock(resolveDynamicComponent($props.filterRemoveIconTemplate || 'TrashIcon'), mergeProps({
                  "class": iconProps["class"]
                }, $options.getColumnPT('filterRemoveButton')['icon']), null, 16, ["class"]))];
              }),
              _: 2
            }, 1032, ["class", "onClick", "label", "unstyled", "pt"])) : createCommentVNode("", true)], 16)], 16);
          }), 128))], 16), $options.isShowAddConstraint ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx('filterAddRule')
          }, $options.getColumnPT('filterAddRule')), [createVNode(_component_CFButton, {
            type: "button",
            label: $options.addRuleButtonLabel,
            iconPos: "left",
            "class": normalizeClass(_ctx.cx('filterAddRuleButton')),
            onClick: _cache[8] || (_cache[8] = function ($event) {
              return $options.addConstraint();
            }),
            unstyled: _ctx.unstyled,
            text: "",
            severity: "info",
            size: "small",
            pt: $options.getColumnPT('filterAddRuleButton')
          }, {
            icon: withCtx(function (iconProps) {
              return [(openBlock(), createBlock(resolveDynamicComponent($props.filterAddIconTemplate || 'PlusIcon'), mergeProps({
                "class": iconProps["class"]
              }, $options.getColumnPT('filterAddRuleButton')['icon']), null, 16, ["class"]))];
            }),
            _: 1
          }, 8, ["label", "class", "unstyled", "pt"])], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
            "class": _ctx.cx('filterButtonbar')
          }, $options.getColumnPT('filterButtonbar')), [!$props.filterClearTemplate && $props.showClearButton ? (openBlock(), createBlock(_component_CFButton, {
            key: 0,
            type: "button",
            "class": normalizeClass(_ctx.cx('filterClearButton')),
            label: $options.clearButtonLabel,
            onClick: $options.clearFilter,
            unstyled: _ctx.unstyled,
            size: "small",
            outlined: "",
            pt: $options.getColumnPT('filterClearButton')
          }, null, 8, ["class", "label", "onClick", "unstyled", "pt"])) : (openBlock(), createBlock(resolveDynamicComponent($props.filterClearTemplate), {
            key: 1,
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.clearFilter
          }, null, 8, ["field", "filterModel", "filterCallback"])), $props.showApplyButton ? (openBlock(), createElementBlock(Fragment, {
            key: 2
          }, [!$props.filterApplyTemplate ? (openBlock(), createBlock(_component_CFButton, {
            key: 0,
            type: "button",
            "class": normalizeClass(_ctx.cx('filterApplyButton')),
            label: $options.applyButtonLabel,
            onClick: _cache[9] || (_cache[9] = function ($event) {
              return $options.applyFilter();
            }),
            unstyled: _ctx.unstyled,
            size: "small",
            pt: $options.getColumnPT('filterApplyButton')
          }, null, 8, ["class", "label", "unstyled", "pt"])) : (openBlock(), createBlock(resolveDynamicComponent($props.filterApplyTemplate), {
            key: 1,
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.applyFilter
          }, null, 8, ["field", "filterModel", "filterCallback"]))], 64)) : createCommentVNode("", true)], 16)], 64)), (openBlock(), createBlock(resolveDynamicComponent($props.filterFooterTemplate), {
            field: $props.field,
            filterModel: $props.filters[$props.field],
            filterCallback: $options.filterCallback
          }, null, 8, ["field", "filterModel", "filterCallback"]))], 16, _hoisted_2)), [[_directive_focustrap]]) : createCommentVNode("", true)];
        }),
        _: 1
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 1
  })], 16);
}

script$4.render = render$4;

var script$3 = {
  name: 'HeaderCheckbox',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
  methods: {
    getColumnPT: function getColumnPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
    },
    onChange: function onChange(event) {
      this.$emit('change', {
        originalEvent: event,
        checked: !this.checked
      });
    }
  },
  computed: {
    headerCheckboxAriaLabel: function headerCheckboxAriaLabel() {
      return this.$primevue.config.locale.aria ? this.checked ? this.$primevue.config.locale.aria.selectAll : this.$primevue.config.locale.aria.unselectAll : undefined;
    }
  },
  components: {
    CheckIcon: CheckIcon,
    Checkbox: Checkbox
  }
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  var _component_Checkbox = resolveComponent("Checkbox");
  return openBlock(), createBlock(_component_Checkbox, {
    modelValue: $props.checked,
    binary: true,
    disabled: $props.disabled,
    "aria-label": $options.headerCheckboxAriaLabel,
    onChange: $options.onChange,
    pt: $options.getColumnPT('headerCheckbox')
  }, {
    icon: withCtx(function (slotProps) {
      return [$props.headerCheckboxIconTemplate ? (openBlock(), createBlock(resolveDynamicComponent($props.headerCheckboxIconTemplate), {
        key: 0,
        checked: slotProps.checked,
        "class": normalizeClass(slotProps["class"])
      }, null, 8, ["checked", "class"])) : !$props.headerCheckboxIconTemplate && slotProps.checked ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
        key: 1,
        "class": slotProps["class"]
      }, $options.getColumnPT('headerCheckbox.icon')), null, 16, ["class"])) : createCommentVNode("", true)];
    }),
    _: 1
  }, 8, ["modelValue", "disabled", "aria-label", "onChange", "pt"]);
}

script$3.render = render$3;

var script$2 = {
  name: 'HeaderCell',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
      var _this$$parentInstance, _this$$parentInstance2;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          sortable: this.columnProp('sortable') === '' || this.columnProp('sortable'),
          sorted: this.isColumnSorted(),
          resizable: this.resizableColumns,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size,
          showGridlines: ((_this$$parentInstance2 = this.$parentInstance) === null || _this$$parentInstance2 === void 0 || (_this$$parentInstance2 = _this$$parentInstance2.$parentInstance) === null || _this$$parentInstance2 === void 0 ? void 0 : _this$$parentInstance2.showGridlines) || false
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
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
      if ((event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') && event.currentTarget.nodeName === 'TH' && DomHandler.getAttribute(event.currentTarget, 'data-p-sortable-column')) {
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
      this.$emit('column-dragstart', {
        originalEvent: event,
        column: this.column
      });
    },
    onDragOver: function onDragOver(event) {
      this.$emit('column-dragover', {
        originalEvent: event,
        column: this.column
      });
    },
    onDragLeave: function onDragLeave(event) {
      this.$emit('column-dragleave', {
        originalEvent: event,
        column: this.column
      });
    },
    onDrop: function onDrop(event) {
      this.$emit('column-drop', {
        originalEvent: event,
        column: this.column
      });
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
          if (filterRow.children[index]) {
            filterRow.children[index].style.left = this.styleObject.left;
            filterRow.children[index].style.right = this.styleObject.right;
          }
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
    DTHeaderCheckbox: script$3,
    DTColumnFilter: script$4,
    SortAltIcon: SortAltIcon,
    SortAmountUpAltIcon: SortAmountUpAltIcon,
    SortAmountDownIcon: SortAmountDownIcon
  }
};

function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty$3(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : String(i); }
function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["tabindex", "colspan", "rowspan", "aria-sort", "data-p-sortable-column", "data-p-resizable-column", "data-p-highlight", "data-p-filter-column", "data-p-frozen-column", "data-p-reorderable-column"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTHeaderCheckbox = resolveComponent("DTHeaderCheckbox");
  var _component_DTColumnFilter = resolveComponent("DTColumnFilter");
  return openBlock(), createElementBlock("th", mergeProps({
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
  }), [$props.resizableColumns && !$options.columnProp('frozen') ? (openBlock(), createElementBlock("span", mergeProps({
    key: 0,
    "class": _ctx.cx('columnResizer'),
    onMousedown: _cache[0] || (_cache[0] = function () {
      return $options.onResizeStart && $options.onResizeStart.apply($options, arguments);
    })
  }, $options.getColumnPT('columnResizer')), null, 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('headerContent')
  }, $options.getColumnPT('headerContent')), [$props.column.children && $props.column.children.header ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.header), {
    key: 0,
    column: $props.column
  }, null, 8, ["column"])) : createCommentVNode("", true), $options.columnProp('header') ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": _ctx.cx('headerTitle')
  }, $options.getColumnPT('headerTitle')), toDisplayString($options.columnProp('header')), 17)) : createCommentVNode("", true), $options.columnProp('sortable') ? (openBlock(), createElementBlock("span", normalizeProps(mergeProps({
    key: 2
  }, $options.getColumnPT('sort'))), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.sorticon || $options.sortableColumnIcon), mergeProps({
    sorted: $options.sortState.sorted,
    sortOrder: $options.sortState.sortOrder,
    "class": _ctx.cx('sortIcon')
  }, $options.getColumnPT('sorticon')), null, 16, ["sorted", "sortOrder", "class"]))], 16)) : createCommentVNode("", true), $options.isMultiSorted() ? (openBlock(), createElementBlock("span", mergeProps({
    key: 3,
    "class": _ctx.cx('sortBadge')
  }, $options.getColumnPT('sortBadge')), toDisplayString($options.getBadgeValue()), 17)) : createCommentVNode("", true), $options.columnProp('selectionMode') === 'multiple' && $props.filterDisplay !== 'row' ? (openBlock(), createBlock(_component_DTHeaderCheckbox, {
    key: 4,
    checked: $props.allRowsSelected,
    onChange: $options.onHeaderCheckboxChange,
    disabled: $props.empty,
    headerCheckboxIconTemplate: $props.column.children && $props.column.children.headercheckboxicon,
    column: $props.column,
    unstyled: _ctx.unstyled,
    pt: _ctx.pt
  }, null, 8, ["checked", "onChange", "disabled", "headerCheckboxIconTemplate", "column", "unstyled", "pt"])) : createCommentVNode("", true), $props.filterDisplay === 'menu' && $props.column.children && $props.column.children.filter ? (openBlock(), createBlock(_component_DTColumnFilter, {
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
  }, null, 8, ["field", "type", "showMenu", "filterElement", "filterHeaderTemplate", "filterFooterTemplate", "filterClearTemplate", "filterApplyTemplate", "filterIconTemplate", "filterAddIconTemplate", "filterRemoveIconTemplate", "filterClearIconTemplate", "filters", "filtersStore", "filterInputProps", "filterMenuStyle", "filterMenuClass", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "matchModeOptions", "maxConstraints", "column", "unstyled", "pt"])) : createCommentVNode("", true)], 16)], 16, _hoisted_1);
}

script$2.render = render$2;

var script$1 = {
  name: 'TableHeader',
  hostName: 'DataTable',
  "extends": BaseComponent,
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
    }
  },
  provide: function provide() {
    return {
      $rows: this.d_headerRows,
      $columns: this.d_headerColumns
    };
  },
  data: function data() {
    return {
      d_headerRows: new HelperSet({
        type: 'Row'
      }),
      d_headerColumns: new HelperSet({
        type: 'Column'
      })
    };
  },
  beforeUnmount: function beforeUnmount() {
    this.d_headerRows.clear();
    this.d_headerColumns.clear();
  },
  methods: {
    columnProp: function columnProp(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    getColumnGroupPT: function getColumnGroupPT(key) {
      var _this$$parentInstance;
      var columnGroupMetaData = {
        props: this.getColumnGroupProps(),
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          type: 'header',
          scrollable: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 || (_this$$parentInstance = _this$$parentInstance.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.scrollable
        }
      };
      return mergeProps(this.ptm("columnGroup.".concat(key), {
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
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index
        }
      };
      return mergeProps(this.ptm("row.".concat(key), {
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
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
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
      var _this$d_headerRows;
      return (_this$d_headerRows = this.d_headerRows) === null || _this$d_headerRows === void 0 ? void 0 : _this$d_headerRows.get(this.columnGroup, this.columnGroup.children);
    },
    getHeaderColumns: function getHeaderColumns(row) {
      var _this$d_headerColumns;
      return (_this$d_headerColumns = this.d_headerColumns) === null || _this$d_headerColumns === void 0 ? void 0 : _this$d_headerColumns.get(row, row.children);
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

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty$2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : String(i); }
function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DTHeaderCell = resolveComponent("DTHeaderCell");
  var _component_DTHeaderCheckbox = resolveComponent("DTHeaderCheckbox");
  var _component_DTColumnFilter = resolveComponent("DTColumnFilter");
  return openBlock(), createElementBlock("thead", mergeProps({
    "class": _ctx.cx('thead'),
    style: _ctx.sx('thead'),
    role: "rowgroup"
  }, $props.columnGroup ? _objectSpread$2(_objectSpread$2({}, _ctx.ptm('thead', $options.ptmTHeadOptions)), $options.getColumnGroupPT('root')) : _ctx.ptm('thead', $options.ptmTHeadOptions), {
    "data-pc-section": "thead"
  }), [!$props.columnGroup ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [createElementVNode("tr", mergeProps({
    role: "row"
  }, _ctx.ptm('headerRow')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') && ($props.rowGroupMode !== 'subheader' || $props.groupRowsBy !== $options.columnProp(col, 'field')) ? (openBlock(), createBlock(_component_DTHeaderCell, {
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
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["column", "index", "groupRowsBy", "groupRowSortField", "reorderableColumns", "resizableColumns", "sortMode", "sortField", "sortOrder", "multiSortMeta", "allRowsSelected", "empty", "filters", "filterDisplay", "filtersStore", "filterInputProps", "unstyled", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16), $props.filterDisplay === 'row' ? (openBlock(), createElementBlock("tr", mergeProps({
    key: 0,
    role: "row"
  }, _ctx.ptm('headerRow')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, function (col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
    }, [!$options.columnProp(col, 'hidden') && ($props.rowGroupMode !== 'subheader' || $props.groupRowsBy !== $options.columnProp(col, 'field')) ? (openBlock(), createElementBlock("th", mergeProps({
      key: 0,
      style: $options.getFilterColumnHeaderStyle(col),
      "class": $options.getFilterColumnHeaderClass(col)
    }, _objectSpread$2(_objectSpread$2({}, $options.getColumnPT(col, 'root', i)), $options.getColumnPT(col, 'headerCell', i))), [$options.columnProp(col, 'selectionMode') === 'multiple' ? (openBlock(), createBlock(_component_DTHeaderCheckbox, {
      key: 0,
      checked: $props.allRowsSelected,
      disabled: $props.empty,
      onChange: _cache[15] || (_cache[15] = function ($event) {
        return _ctx.$emit('checkbox-change', $event);
      }),
      column: col,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["checked", "disabled", "column", "unstyled", "pt"])) : createCommentVNode("", true), col.children && col.children.filter ? (openBlock(), createBlock(_component_DTColumnFilter, {
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
    }, null, 8, ["field", "type", "showMenu", "filterElement", "filterHeaderTemplate", "filterFooterTemplate", "filterClearTemplate", "filterApplyTemplate", "filterIconTemplate", "filterAddIconTemplate", "filterRemoveIconTemplate", "filterClearIconTemplate", "filters", "filtersStore", "filterInputProps", "filterMenuStyle", "filterMenuClass", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "matchModeOptions", "maxConstraints", "column", "unstyled", "pt"])) : createCommentVNode("", true)], 16)) : createCommentVNode("", true)], 64);
  }), 128))], 16)) : createCommentVNode("", true)], 64)) : (openBlock(true), createElementBlock(Fragment, {
    key: 1
  }, renderList($options.getHeaderRows(), function (row, i) {
    return openBlock(), createElementBlock("tr", mergeProps({
      key: i,
      role: "row"
    }, _objectSpread$2(_objectSpread$2({}, _ctx.ptm('headerRow')), $options.getRowPT(row, 'root', i))), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.getHeaderColumns(row), function (col, j) {
      return openBlock(), createElementBlock(Fragment, {
        key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || j
      }, [!$options.columnProp(col, 'hidden') && ($props.rowGroupMode !== 'subheader' || $props.groupRowsBy !== $options.columnProp(col, 'field')) && typeof col.children !== 'string' ? (openBlock(), createBlock(_component_DTHeaderCell, {
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
        unstyled: _ctx.unstyled,
        pt: _ctx.pt
      }, null, 8, ["column", "groupRowsBy", "groupRowSortField", "sortMode", "sortField", "sortOrder", "multiSortMeta", "allRowsSelected", "empty", "filters", "filterDisplay", "filtersStore", "unstyled", "pt"])) : createCommentVNode("", true)], 64);
    }), 128))], 16);
  }), 128))], 16);
}

script$1.render = render$1;

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
var _excluded = ["expanded"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'DataTable',
  "extends": script$c,
  inheritAttrs: false,
  emits: ['value-change', 'update:first', 'update:rows', 'page', 'update:sortField', 'update:sortOrder', 'update:multiSortMeta', 'sort', 'filter', 'row-click', 'row-dblclick', 'update:selection', 'row-select', 'row-unselect', 'update:contextMenuSelection', 'row-contextmenu', 'row-unselect-all', 'row-select-all', 'select-all-change', 'column-resize-end', 'column-reorder', 'row-reorder', 'update:expandedRows', 'row-collapse', 'row-expand', 'update:expandedRowGroups', 'rowgroup-collapse', 'rowgroup-expand', 'update:filters', 'state-restore', 'state-save', 'cell-edit-init', 'cell-edit-complete', 'cell-edit-cancel', 'update:editingRows', 'row-edit-init', 'row-edit-save', 'row-edit-cancel'],
  provide: function provide() {
    return {
      $columns: this.d_columns,
      $columnGroups: this.d_columnGroups
    };
  },
  data: function data() {
    return {
      d_first: this.first,
      d_rows: this.rows,
      d_sortField: this.sortField,
      d_sortOrder: this.sortOrder,
      d_nullSortOrder: this.nullSortOrder,
      d_multiSortMeta: this.multiSortMeta ? _toConsumableArray(this.multiSortMeta) : [],
      d_groupRowsSortMeta: null,
      d_selectionKeys: null,
      d_columnOrder: null,
      d_editingRowKeys: null,
      d_editingMeta: {},
      d_filters: this.cloneFilters(this.filters),
      d_columns: new HelperSet({
        type: 'Column'
      }),
      d_columnGroups: new HelperSet({
        type: 'ColumnGroup'
      })
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
  draggedColumnElement: null,
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
    nullSortOrder: function nullSortOrder(newValue) {
      this.d_nullSortOrder = newValue;
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
    editingRows: {
      immediate: true,
      handler: function handler(newValue) {
        if (this.dataKey) {
          this.updateEditingRowKeys(newValue);
        }
      }
    },
    filters: {
      deep: true,
      handler: function handler(newValue) {
        this.d_filters = this.cloneFilters(newValue);
      }
    }
  },
  mounted: function mounted() {
    this.$el.setAttribute(this.attributeSelector, '');
    if (this.responsiveLayout === 'stack' && !this.scrollable && !this.unstyled) {
      this.createResponsiveStyle();
    }
    if (this.isStateful()) {
      this.restoreState();
      this.resizableColumns && this.restoreColumnWidths();
    }
    if (this.editMode === 'row' && this.dataKey && !this.d_editingRowKeys) {
      this.updateEditingRowKeys(this.editingRows);
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindColumnResizeEvents();
    this.destroyStyleElement();
    this.destroyResponsiveStyle();
    this.d_columns.clear();
    this.d_columnGroups.clear();
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
      return ObjectUtils.getVNodeProp(col, prop);
    },
    onPage: function onPage(event) {
      var _this = this;
      this.clearEditingMetaData();
      this.d_first = event.first;
      this.d_rows = event.rows;
      var pageEvent = this.createLazyLoadEvent(event);
      pageEvent.pageCount = event.pageCount;
      pageEvent.page = event.page;
      this.$emit('update:first', this.d_first);
      this.$emit('update:rows', this.d_rows);
      this.$emit('page', pageEvent);
      this.$nextTick(function () {
        _this.$emit('value-change', _this.processedData);
      });
    },
    onColumnHeaderClick: function onColumnHeaderClick(e) {
      var _this2 = this;
      var event = e.originalEvent;
      var column = e.column;
      if (this.columnProp(column, 'sortable')) {
        var targetNode = event.target;
        var columnField = this.columnProp(column, 'sortField') || this.columnProp(column, 'field');
        if (DomHandler.getAttribute(targetNode, 'data-p-sortable-column') === true || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headertitle' || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'headercontent' || DomHandler.getAttribute(targetNode, 'data-pc-section') === 'sorticon' || DomHandler.getAttribute(targetNode.parentElement, 'data-pc-section') === 'sorticon' || DomHandler.getAttribute(targetNode.parentElement.parentElement, 'data-pc-section') === 'sorticon' || targetNode.closest('[data-p-sortable-column="true"]') && !targetNode.closest('[data-pc-section="filtermenubutton"]') && !DomHandler.isClickable(event.target)) {
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
          this.$nextTick(function () {
            _this2.$emit('value-change', _this2.processedData);
          });
        }
      }
    },
    sortSingle: function sortSingle(value) {
      var _this3 = this;
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
      var resolvedFieldData = new Map();
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          resolvedFieldData.set(item, ObjectUtils.resolveFieldData(item, this.d_sortField));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var comparer = ObjectUtils.localeComparator();
      data.sort(function (data1, data2) {
        var value1 = resolvedFieldData.get(data1);
        var value2 = resolvedFieldData.get(data2);
        return ObjectUtils.sort(value1, value2, _this3.d_sortOrder, comparer, _this3.d_nullSortOrder);
      });
      return data;
    },
    sortMultiple: function sortMultiple(value) {
      var _this4 = this;
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
        return _this4.multisortField(data1, data2, 0);
      });
      return data;
    },
    multisortField: function multisortField(data1, data2, index) {
      var value1 = ObjectUtils.resolveFieldData(data1, this.d_multiSortMeta[index].field);
      var value2 = ObjectUtils.resolveFieldData(data2, this.d_multiSortMeta[index].field);
      var comparer = ObjectUtils.localeComparator();
      if (value1 === value2) {
        return this.d_multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, index + 1) : 0;
      }
      return ObjectUtils.sort(value1, value2, this.d_multiSortMeta[index].order, comparer, this.d_nullSortOrder);
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
    getActiveFilters: function getActiveFilters(filters) {
      var removeEmptyFilters = function removeEmptyFilters(_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        if (value.constraints) {
          var filteredConstraints = value.constraints.filter(function (constraint) {
            return constraint.value !== null;
          });
          if (filteredConstraints.length > 0) {
            return [key, _objectSpread$1(_objectSpread$1({}, value), {}, {
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
    },
    filter: function filter(data) {
      var _this5 = this;
      if (!data) {
        return;
      }
      this.clearEditingMetaData();
      var activeFilters = this.getActiveFilters(this.filters);
      var globalFilterFieldsArray;
      if (activeFilters['global']) {
        globalFilterFieldsArray = this.globalFilterFields || this.columns.map(function (col) {
          return _this5.columnProp(col, 'filterField') || _this5.columnProp(col, 'field');
        });
      }
      var filteredValue = [];
      for (var i = 0; i < data.length; i++) {
        var localMatch = true;
        var globalMatch = false;
        var localFiltered = false;
        for (var prop in activeFilters) {
          if (Object.prototype.hasOwnProperty.call(activeFilters, prop) && prop !== 'global') {
            localFiltered = true;
            var filterField = prop;
            var filterMeta = activeFilters[filterField];
            if (filterMeta.operator) {
              var _iterator2 = _createForOfIteratorHelper(filterMeta.constraints),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var filterConstraint = _step2.value;
                  localMatch = this.executeLocalFilter(filterField, data[i], filterConstraint);
                  if (filterMeta.operator === FilterOperator.OR && localMatch || filterMeta.operator === FilterOperator.AND && !localMatch) {
                    break;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            } else {
              localMatch = this.executeLocalFilter(filterField, data[i], filterMeta);
            }
            if (!localMatch) {
              break;
            }
          }
        }
        if (localMatch && activeFilters['global'] && !globalMatch && globalFilterFieldsArray) {
          for (var j = 0; j < globalFilterFieldsArray.length; j++) {
            var globalFilterField = globalFilterFieldsArray[j];
            globalMatch = FilterService.filters[activeFilters['global'].matchMode || FilterMatchMode.CONTAINS](ObjectUtils.resolveFieldData(data[i], globalFilterField), activeFilters['global'].value, this.filterLocale);
            if (globalMatch) {
              break;
            }
          }
        }
        var matches = void 0;
        if (activeFilters['global']) {
          matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
        } else {
          matches = localFiltered && localMatch;
        }
        if (matches) {
          filteredValue.push(data[i]);
        }
      }
      if (filteredValue.length === this.value.length || Object.keys(activeFilters).length == 0) {
        filteredValue = data;
      }
      var filterEvent = this.createLazyLoadEvent();
      filterEvent.filteredValue = filteredValue;
      this.$emit('filter', filterEvent);
      this.$nextTick(function () {
        _this5.$emit('value-change', _this5.processedData);
      });
      return filteredValue;
    },
    executeLocalFilter: function executeLocalFilter(field, rowData, filterMeta) {
      var filterValue = filterMeta.value;
      var filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
      var dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
      var filterConstraint = FilterService.filters[filterMatchMode];
      return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    },
    onRowClick: function onRowClick(e) {
      var event = e.originalEvent;
      var body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
      var focusedItem = DomHandler.findSingle(body, 'tr[data-p-selectable-row="true"][tabindex="0"]');
      if (DomHandler.isClickable(event.target)) {
        return;
      }
      this.$emit('row-click', e);
      if (this.selectionMode) {
        var rowData = e.data;
        var rowIndex = this.d_first + e.index;
        if (this.isMultipleSelectionMode() && event.shiftKey && this.anchorRowIndex != null) {
          DomHandler.clearSelection();
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
        var _event$target, _event$target2, _event$target3;
        if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.getAttribute('data-pc-section')) === 'rowtogglericon' || ((_event$target2 = event.target) === null || _event$target2 === void 0 || (_event$target2 = _event$target2.parentElement) === null || _event$target2 === void 0 ? void 0 : _event$target2.getAttribute('data-pc-section')) === 'rowtogglericon') return;
        var targetRow = (_event$target3 = event.target) === null || _event$target3 === void 0 ? void 0 : _event$target3.closest('tr[data-p-selectable-row="true"]');
        focusedItem.tabIndex = '-1';
        targetRow.tabIndex = '0';
      }
    },
    onRowDblClick: function onRowDblClick(e) {
      var event = e.originalEvent;
      if (DomHandler.isClickable(event.target)) {
        return;
      }
      this.$emit('row-dblclick', e);
    },
    onRowRightClick: function onRowRightClick(event) {
      if (this.contextMenu) {
        DomHandler.clearSelection();
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
          case 'NumpadEnter':
            this.onEnterKey(event, rowData, rowIndex);
            break;
          case 'Space':
            this.onSpaceKey(event, rowData, rowIndex, slotProps);
            break;
          case 'Tab':
            this.onTabKey(event, rowIndex);
            break;
          default:
            if (event.code === 'KeyA' && metaKey && this.isMultipleSelectionMode()) {
              var data = this.dataToRender(slotProps.rows);
              this.$emit('update:selection', data);
            }
            event.preventDefault();
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
          firstSelectedRowIndex = ObjectUtils.findIndexInList(this.selection[0], data);
          lastSelectedRowIndex = ObjectUtils.findIndexInList(this.selection[this.selection.length - 1], data);
          index = rowIndex <= firstSelectedRowIndex ? lastSelectedRowIndex : firstSelectedRowIndex;
        } else {
          index = ObjectUtils.findIndexInList(this.selection, data);
        }
        var _selection = index !== rowIndex ? data.slice(Math.min(index, rowIndex), Math.max(index, rowIndex) + 1) : rowData;
        this.$emit('update:selection', _selection);
      }
    },
    onTabKey: function onTabKey(event, rowIndex) {
      var body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
      var rows = DomHandler.find(body, 'tr[data-p-selectable-row="true"]');
      if (event.code === 'Tab' && rows && rows.length > 0) {
        var firstSelectedRow = DomHandler.findSingle(body, 'tr[data-p-highlight="true"]');
        var focusedItem = DomHandler.findSingle(body, 'tr[data-p-selectable-row="true"][tabindex="0"]');
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
        if (DomHandler.getAttribute(nextRow, 'data-p-selectable-row') === true) return nextRow;else return this.findNextSelectableRow(nextRow);
      } else {
        return null;
      }
    },
    findPrevSelectableRow: function findPrevSelectableRow(row) {
      var prevRow = row.previousElementSibling;
      if (prevRow) {
        if (DomHandler.getAttribute(prevRow, 'data-p-selectable-row') === true) return prevRow;else return this.findPrevSelectableRow(prevRow);
      } else {
        return null;
      }
    },
    findFirstSelectableRow: function findFirstSelectableRow() {
      var firstRow = DomHandler.findSingle(this.$refs.table, 'tr[data-p-selectable-row="true"]');
      return firstRow;
    },
    findLastSelectableRow: function findLastSelectableRow() {
      var rows = DomHandler.find(this.$refs.table, 'tr[data-p-selectable-row="true"]');
      return rows ? rows[rows.length - 1] : null;
    },
    focusRowChange: function focusRowChange(firstFocusableRow, currentFocusedRow) {
      firstFocusableRow.tabIndex = '-1';
      currentFocusedRow.tabIndex = '0';
      DomHandler.focus(currentFocusedRow);
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
          return this.d_selectionKeys ? this.d_selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined : false;
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
        var _iterator3 = _createForOfIteratorHelper(selection),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var data = _step3.value;
            this.d_selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else {
        this.d_selectionKeys[String(ObjectUtils.resolveFieldData(selection, this.dataKey))] = 1;
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
            this.d_editingRowKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
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
      return this.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
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
      var _this6 = this;
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
          for (var _i = 0; _i < _this6.columns.length; _i++) {
            var _column = _this6.columns[_i];
            if (_this6.columnProp(_column, 'exportable') !== false && _this6.columnProp(_column, 'field')) {
              if (rowInitiated) csv += _this6.csvSeparator;else rowInitiated = true;
              var cellData = ObjectUtils.resolveFieldData(record, _this6.columnProp(_column, 'field'));
              if (cellData != null) {
                if (_this6.exportFunction) {
                  cellData = _this6.exportFunction({
                    data: cellData,
                    field: _this6.columnProp(_column, 'field')
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
      DomHandler.exportCSV(csv, this.exportFilename);
    },
    resetPage: function resetPage() {
      this.d_first = 0;
      this.$emit('update:first', this.d_first);
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
            this.resizeTableCells(newColumnWidth, nextColumnWidth);
          }
        } else if (this.columnResizeMode === 'expand') {
          var tableWidth = this.$refs.table.offsetWidth + delta + 'px';
          var updateTableWidth = function updateTableWidth(el) {
            !!el && (el.style.width = el.style.minWidth = tableWidth);
          };

          // Reasoning: resize table cells before updating the table width so that it can use existing computed cell widths and adjust only the one column.
          this.resizeTableCells(newColumnWidth);
          updateTableWidth(this.$refs.table);
          if (!this.virtualScrollerDisabled) {
            var body = this.$refs.bodyRef && this.$refs.bodyRef.$el;
            var frozenBody = this.$refs.frozenBodyRef && this.$refs.frozenBodyRef.$el;
            updateTableWidth(body);
            updateTableWidth(frozenBody);
          }
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
      if (this.isStateful()) {
        this.saveState();
      }
    },
    resizeTableCells: function resizeTableCells(newColumnWidth, nextColumnWidth) {
      var colIndex = DomHandler.index(this.resizeColumnElement);
      var widths = [];
      var headers = DomHandler.find(this.$refs.table, 'thead[data-pc-section="thead"] > tr > th');
      headers.forEach(function (header) {
        return widths.push(DomHandler.getOuterWidth(header));
      });
      this.destroyStyleElement();
      this.createStyleElement();
      var innerHTML = '';
      var selector = "[data-pc-name=\"datatable\"][".concat(this.attributeSelector, "] > [data-pc-section=\"wrapper\"] ").concat(this.virtualScrollerDisabled ? '' : '> [data-pc-name="virtualscroller"]', " > table[data-pc-section=\"table\"]");
      widths.forEach(function (width, index) {
        var colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
        var style = "width: ".concat(colWidth, "px !important; max-width: ").concat(colWidth, "px !important");
        innerHTML += "\n                    ".concat(selector, " > thead[data-pc-section=\"thead\"] > tr > th:nth-child(").concat(index + 1, "),\n                    ").concat(selector, " > tbody[data-pc-section=\"tbody\"] > tr > td:nth-child(").concat(index + 1, "),\n                    ").concat(selector, " > tfoot[data-pc-section=\"tfoot\"] > tr > td:nth-child(").concat(index + 1, ") {\n                        ").concat(style, "\n                    }\n                ");
      });
      this.styleElement.innerHTML = innerHTML;
    },
    bindColumnResizeEvents: function bindColumnResizeEvents() {
      var _this7 = this;
      if (!this.documentColumnResizeListener) {
        this.documentColumnResizeListener = document.addEventListener('mousemove', function () {
          if (_this7.columnResizing) {
            _this7.onColumnResize(event);
          }
        });
      }
      if (!this.documentColumnResizeEndListener) {
        this.documentColumnResizeEndListener = document.addEventListener('mouseup', function () {
          if (_this7.columnResizing) {
            _this7.columnResizing = false;
            _this7.onColumnResizeEnd();
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
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.getAttribute(event.target, '[data-pc-section="columnresizer"]')) event.currentTarget.draggable = false;else event.currentTarget.draggable = true;
      }
    },
    onColumnHeaderDragStart: function onColumnHeaderDragStart(e) {
      var event = e.originalEvent,
        column = e.column;
      if (this.columnResizing) {
        event.preventDefault();
        return;
      }
      this.colReorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.$refs.reorderIndicatorUp);
      this.colReorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.$refs.reorderIndicatorUp);
      this.draggedColumn = column;
      this.draggedColumnElement = this.findParentHeader(event.target);
      event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    },
    onColumnHeaderDragOver: function onColumnHeaderDragOver(e) {
      var event = e.originalEvent,
        column = e.column;
      var dropHeader = this.findParentHeader(event.target);
      if (this.reorderableColumns && this.draggedColumnElement && dropHeader && !this.columnProp(column, 'frozen')) {
        event.preventDefault();
        var containerOffset = DomHandler.getOffset(this.$el);
        var dropHeaderOffset = DomHandler.getOffset(dropHeader);
        if (this.draggedColumnElement !== dropHeader) {
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
    onColumnHeaderDragLeave: function onColumnHeaderDragLeave(e) {
      var event = e.originalEvent;
      if (this.reorderableColumns && this.draggedColumnElement) {
        event.preventDefault();
        this.$refs.reorderIndicatorUp.style.display = 'none';
        this.$refs.reorderIndicatorDown.style.display = 'none';
      }
    },
    onColumnHeaderDrop: function onColumnHeaderDrop(e) {
      var _this8 = this;
      var event = e.originalEvent,
        column = e.column;
      event.preventDefault();
      if (this.draggedColumnElement) {
        var dragIndex = DomHandler.index(this.draggedColumnElement);
        var dropIndex = DomHandler.index(this.findParentHeader(event.target));
        var allowDrop = dragIndex !== dropIndex;
        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
          allowDrop = false;
        }
        if (allowDrop) {
          var isSameColumn = function isSameColumn(col1, col2) {
            return _this8.columnProp(col1, 'columnKey') || _this8.columnProp(col2, 'columnKey') ? _this8.columnProp(col1, 'columnKey') === _this8.columnProp(col2, 'columnKey') : _this8.columnProp(col1, 'field') === _this8.columnProp(col2, 'field');
          };
          var dragColIndex = this.columns.findIndex(function (child) {
            return isSameColumn(child, _this8.draggedColumn);
          });
          var dropColIndex = this.columns.findIndex(function (child) {
            return isSameColumn(child, column);
          });
          var widths = [];
          var headers = DomHandler.find(this.$el, 'thead[data-pc-section="thead"] > tr > th');
          headers.forEach(function (header) {
            return widths.push(DomHandler.getOuterWidth(header));
          });
          var movedItem = widths.find(function (_, index) {
            return index === dragColIndex;
          });
          var remainingItems = widths.filter(function (_, index) {
            return index !== dragColIndex;
          });
          var reorderedWidths = [].concat(_toConsumableArray(remainingItems.slice(0, dropColIndex)), [movedItem], _toConsumableArray(remainingItems.slice(dropColIndex)));
          this.addColumnWidthStyles(reorderedWidths);
          if (dropColIndex < dragColIndex && this.dropPosition === 1) {
            dropColIndex++;
          }
          if (dropColIndex > dragColIndex && this.dropPosition === -1) {
            dropColIndex--;
          }
          ObjectUtils.reorderArray(this.columns, dragColIndex, dropColIndex);
          this.updateReorderableColumns();
          this.$emit('column-reorder', {
            originalEvent: event,
            dragIndex: dragColIndex,
            dropIndex: dropColIndex
          });
        }
        this.$refs.reorderIndicatorUp.style.display = 'none';
        this.$refs.reorderIndicatorDown.style.display = 'none';
        this.draggedColumnElement.draggable = false;
        this.draggedColumnElement = null;
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
      if (DomHandler.getAttribute(event.target, 'data-pc-section') === 'rowreordericon' || DomHandler.getAttribute(event.target.parentElement, 'data-pc-section') === 'rowreordericon') event.currentTarget.draggable = true;else event.currentTarget.draggable = false;
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
        var rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
        var pageY = event.pageY;
        var rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
        var prevRowElement = rowElement.previousElementSibling;
        if (pageY < rowMidY) {
          rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
          !this.isUnstyled && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
          this.droppedRowIndex = index;
          if (prevRowElement) {
            prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'true');
            !this.isUnstyled && DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
          } else {
            rowElement.setAttribute('data-p-datatable-dragpoint-top', 'true');
            !this.isUnstyled && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          }
        } else {
          if (prevRowElement) {
            prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
            !this.isUnstyled && DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
          } else {
            rowElement.setAttribute('data-p-datatable-dragpoint-top', 'true');
            !this.isUnstyled && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          }
          this.droppedRowIndex = index + 1;
          rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'true');
          !this.isUnstyled && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
        }
        event.preventDefault();
      }
    },
    onRowDragLeave: function onRowDragLeave(event) {
      var rowElement = event.currentTarget;
      var prevRowElement = rowElement.previousElementSibling;
      if (prevRowElement) {
        prevRowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
        !this.isUnstyled && DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
      }
      rowElement.setAttribute('data-p-datatable-dragpoint-bottom', 'false');
      !this.isUnstyled && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
      rowElement.setAttribute('data-p-datatable-dragpoint-top', 'false');
      !this.isUnstyled && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
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
        ObjectUtils.reorderArray(processedData, this.draggedRowIndex + this.d_first, dropIndex + this.d_first);
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
      var _this9 = this;
      var expanded = event.expanded,
        rest = _objectWithoutProperties(event, _excluded);
      var rowData = event.data;
      var expandedRows;
      if (this.dataKey) {
        var value = ObjectUtils.resolveFieldData(rowData, this.dataKey);
        expandedRows = this.expandedRows ? _objectSpread$1({}, this.expandedRows) : {};
        expanded ? expandedRows[value] = true : delete expandedRows[value];
      } else {
        expandedRows = this.expandedRows ? _toConsumableArray(this.expandedRows) : [];
        expanded ? expandedRows.push(rowData) : expandedRows = expandedRows.filter(function (d) {
          return !_this9.equals(rowData, d);
        });
      }
      this.$emit('update:expandedRows', expandedRows);
      expanded ? this.$emit('row-expand', rest) : this.$emit('row-collapse', rest);
    },
    toggleRowGroup: function toggleRowGroup(e) {
      var event = e.originalEvent;
      var data = e.data;
      var groupFieldValue = ObjectUtils.resolveFieldData(data, this.groupRowsBy);
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
        var groupFieldValue = ObjectUtils.resolveFieldData(rowData, this.groupRowsBy);
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
      var headers = DomHandler.find(this.$el, 'thead[data-pc-section="thead"] > tr > th');
      headers.forEach(function (header) {
        return widths.push(DomHandler.getOuterWidth(header));
      });
      state.columnWidths = widths.join(',');
      if (this.columnResizeMode === 'expand') {
        state.tableWidth = DomHandler.getOuterWidth(this.$refs.table) + 'px';
      }
    },
    addColumnWidthStyles: function addColumnWidthStyles(widths) {
      this.createStyleElement();
      var innerHTML = '';
      var selector = "[data-pc-name=\"datatable\"][".concat(this.attributeSelector, "] > [data-pc-section=\"wrapper\"] ").concat(this.virtualScrollerDisabled ? '' : '> [data-pc-name="virtualscroller"]', " > table[data-pc-section=\"table\"]");
      widths.forEach(function (width, index) {
        var style = "width: ".concat(width, "px !important; max-width: ").concat(width, "px !important");
        innerHTML += "\n        ".concat(selector, " > thead[data-pc-section=\"thead\"] > tr > th:nth-child(").concat(index + 1, "),\n        ").concat(selector, " > tbody[data-pc-section=\"tbody\"] > tr > td:nth-child(").concat(index + 1, "),\n        ").concat(selector, " > tfoot[data-pc-section=\"tfoot\"] > tr > td:nth-child(").concat(index + 1, ") {\n            ").concat(style, "\n        }\n    ");
      });
      this.styleElement.innerHTML = innerHTML;
    },
    restoreColumnWidths: function restoreColumnWidths() {
      if (this.columnWidthsState) {
        var widths = this.columnWidthsState.split(',');
        if (this.columnResizeMode === 'expand' && this.tableWidthState) {
          this.$refs.table.style.width = this.tableWidthState;
          this.$refs.table.style.minWidth = this.tableWidthState;
        }
        if (ObjectUtils.isNotEmpty(widths)) {
          this.addColumnWidthStyles(widths);
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
        Object.entries(this.filters).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            prop = _ref4[0],
            value = _ref4[1];
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
      var _this10 = this;
      var columnOrder = [];
      this.columns.forEach(function (col) {
        return columnOrder.push(_this10.columnProp(col, 'columnKey') || _this10.columnProp(col, 'field'));
      });
      this.d_columnOrder = columnOrder;
    },
    createStyleElement: function createStyleElement() {
      var _this$$primevue;
      this.styleElement = document.createElement('style');
      this.styleElement.type = 'text/css';
      DomHandler.setAttribute(this.styleElement, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
      document.head.appendChild(this.styleElement);
    },
    createResponsiveStyle: function createResponsiveStyle() {
      if (!this.responsiveStyleElement) {
        var _this$$primevue2;
        this.responsiveStyleElement = document.createElement('style');
        this.responsiveStyleElement.type = 'text/css';
        DomHandler.setAttribute(this.responsiveStyleElement, 'nonce', (_this$$primevue2 = this.$primevue) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.config) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.csp) === null || _this$$primevue2 === void 0 ? void 0 : _this$$primevue2.nonce);
        document.head.appendChild(this.responsiveStyleElement);
        var tableSelector = ".p-datatable-wrapper ".concat(this.virtualScrollerDisabled ? '' : '> .p-virtualscroller', " > .p-datatable-table");
        var selector = ".p-datatable[".concat(this.attributeSelector, "] > ").concat(tableSelector);
        var gridLinesSelector = ".p-datatable[".concat(this.attributeSelector, "].p-datatable-gridlines > ").concat(tableSelector);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    ").concat(selector, " > .p-datatable-thead > tr > th,\n    ").concat(selector, " > .p-datatable-tfoot > tr > td {\n        display: none;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td {\n        display: flex;\n        width: 100%;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td:not(:last-child) {\n        border: 0 none;\n    }\n\n    ").concat(gridLinesSelector, " > .p-datatable-tbody > tr > td:last-child {\n        border-top: 0;\n        border-right: 0;\n        border-left: 0;\n    }\n\n    ").concat(selector, " > .p-datatable-tbody > tr > td > .p-column-title {\n        display: block;\n    }\n}\n");
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
      return ObjectUtils.isNotEmpty(style);
    }
  },
  computed: {
    columns: function columns() {
      var cols = this.d_columns.get(this);
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
    columnGroups: function columnGroups() {
      return this.d_columnGroups.get(this);
    },
    headerColumnGroup: function headerColumnGroup() {
      var _this$columnGroups,
        _this11 = this;
      return (_this$columnGroups = this.columnGroups) === null || _this$columnGroups === void 0 ? void 0 : _this$columnGroups.find(function (group) {
        return _this11.columnProp(group, 'type') === 'header';
      });
    },
    footerColumnGroup: function footerColumnGroup() {
      var _this$columnGroups2,
        _this12 = this;
      return (_this$columnGroups2 = this.columnGroups) === null || _this$columnGroups2 === void 0 ? void 0 : _this$columnGroups2.find(function (group) {
        return _this12.columnProp(group, 'type') === 'footer';
      });
    },
    hasFilters: function hasFilters() {
      return this.filters && Object.keys(this.filters).length > 0 && this.filters.constructor === Object;
    },
    processedData: function processedData() {
      var _this$virtualScroller;
      var data = this.value || [];
      if (!this.lazy && !((_this$virtualScroller = this.virtualScrollerOptions) !== null && _this$virtualScroller !== void 0 && _this$virtualScroller.lazy)) {
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
      var _this13 = this;
      if (this.selectAll !== null) {
        return this.selectAll;
      } else {
        var val = this.frozenValue ? [].concat(_toConsumableArray(this.frozenValue), _toConsumableArray(this.processedData)) : this.processedData;
        return ObjectUtils.isNotEmpty(val) && this.selection && Array.isArray(this.selection) && val.every(function (v) {
          return _this13.selection.some(function (s) {
            return _this13.equals(s, v);
          });
        });
      }
    },
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    groupRowSortField: function groupRowSortField() {
      return this.sortMode === 'single' ? this.sortField : this.d_groupRowsSortMeta ? this.d_groupRowsSortMeta.field : null;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return ObjectUtils.isEmpty(this.virtualScrollerOptions) || !this.scrollable;
    }
  },
  components: {
    DTPaginator: Paginator,
    DTTableHeader: script$1,
    DTTableBody: script$7,
    DTTableFooter: script$5,
    DTVirtualScroller: VirtualScroller,
    ArrowDownIcon: ArrowDownIcon,
    ArrowUpIcon: ArrowUpIcon,
    SpinnerIcon: SpinnerIcon
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_DTPaginator = resolveComponent("DTPaginator");
  var _component_DTTableHeader = resolveComponent("DTTableHeader");
  var _component_DTTableBody = resolveComponent("DTTableBody");
  var _component_DTTableFooter = resolveComponent("DTTableFooter");
  var _component_DTVirtualScroller = resolveComponent("DTVirtualScroller");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    "data-scrollselectors": ".p-datatable-wrapper"
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default"), _ctx.loading ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('loadingOverlay')
  }, _ctx.ptm('loadingOverlay')), [_ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", {
    key: 0
  }) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [_ctx.$slots.loadingicon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.loadingicon), {
    key: 0,
    "class": normalizeClass(_ctx.cx('loadingIcon'))
  }, null, 8, ["class"])) : _ctx.loadingIcon ? (openBlock(), createElementBlock("i", mergeProps({
    key: 1,
    "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon]
  }, _ctx.ptm('loadingIcon')), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
    key: 2,
    spin: "",
    "class": _ctx.cx('loadingIcon')
  }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))], 64))], 16)) : createCommentVNode("", true), _ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), $options.paginatorTop ? (openBlock(), createBlock(_component_DTPaginator, {
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
    style: [_ctx.sx('wrapper'), {
      maxHeight: $options.virtualScrollerDisabled ? _ctx.scrollHeight : ''
    }]
  }, _ctx.ptm('wrapper')), [createVNode(_component_DTVirtualScroller, mergeProps({
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
    content: withCtx(function (slotProps) {
      return [createElementVNode("table", mergeProps({
        ref: "table",
        role: "table",
        "class": [_ctx.cx('table'), _ctx.tableClass],
        style: [_ctx.tableStyle, slotProps.spacerStyle]
      }, _objectSpread(_objectSpread({}, _ctx.tableProps), _ctx.ptm('table'))), [createVNode(_component_DTTableHeader, {
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
      }, null, 8, ["columnGroup", "columns", "rowGroupMode", "groupRowsBy", "groupRowSortField", "reorderableColumns", "resizableColumns", "allRowsSelected", "empty", "sortMode", "sortField", "sortOrder", "multiSortMeta", "filters", "filtersStore", "filterDisplay", "filterInputProps", "onFilterChange", "onFilterApply", "unstyled", "pt"]), _ctx.frozenValue ? (openBlock(), createBlock(_component_DTTableBody, {
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
      }, null, 8, ["value", "columns", "first", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "onRowgroupToggle", "onRowTouchend", "onRowKeydown", "onRowMousedown", "editingMeta", "onEditingMetaChange", "unstyled", "pt"])) : createCommentVNode("", true), createVNode(_component_DTTableBody, {
        ref: "bodyRef",
        value: $options.dataToRender(slotProps.rows),
        "class": normalizeClass(slotProps.styleClass),
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
      }, null, 8, ["value", "class", "columns", "empty", "first", "dataKey", "selection", "selectionKeys", "selectionMode", "contextMenu", "contextMenuSelection", "rowGroupMode", "groupRowsBy", "expandableRowGroups", "rowClass", "rowStyle", "editMode", "compareSelectionBy", "scrollable", "expandedRowIcon", "collapsedRowIcon", "expandedRows", "expandedRowGroups", "editingRows", "editingRowKeys", "templates", "responsiveLayout", "virtualScrollerContentProps", "isVirtualScrollerDisabled", "onRowgroupToggle", "onRowTouchend", "onRowKeydown", "onRowMousedown", "editingMeta", "onEditingMetaChange", "unstyled", "pt"]), $options.hasSpacerStyle(slotProps.spacerStyle) ? (openBlock(), createElementBlock("tbody", mergeProps({
        key: 1,
        "class": _ctx.cx('virtualScrollerSpacer'),
        style: {
          height: "calc(".concat(slotProps.spacerStyle.height, " - ").concat(slotProps.rows.length * slotProps.itemSize, "px)")
        }
      }, _ctx.ptm('virtualScrollerSpacer')), null, 16)) : createCommentVNode("", true), createVNode(_component_DTTableFooter, {
        columnGroup: $options.footerColumnGroup,
        columns: slotProps.columns,
        pt: _ctx.pt
      }, null, 8, ["columnGroup", "columns", "pt"])], 16)];
    }),
    _: 1
  }, 16, ["items", "columns", "style", "scrollHeight", "disabled", "pt"])], 16), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 3,
    "class": _ctx.cx('footer')
  }, _ctx.ptm('footer')), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true), $options.paginatorBottom ? (openBlock(), createBlock(_component_DTPaginator, {
    key: 4,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx('paginator')),
    onPage: _cache[43] || (_cache[43] = function ($event) {
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
    ref: "resizeHelper",
    "class": _ctx.cx('resizeHelper'),
    style: {
      "display": "none"
    }
  }, _ctx.ptm('resizeHelper')), null, 16), _ctx.reorderableColumns ? (openBlock(), createElementBlock("span", mergeProps({
    key: 5,
    ref: "reorderIndicatorUp",
    "class": _ctx.cx('reorderIndicatorUp'),
    style: {
      "position": "absolute",
      "display": "none"
    }
  }, _ctx.ptm('reorderIndicatorUp')), [(openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.reorderindicatorupicon || 'ArrowDownIcon')))], 16)) : createCommentVNode("", true), _ctx.reorderableColumns ? (openBlock(), createElementBlock("span", mergeProps({
    key: 6,
    ref: "reorderIndicatorDown",
    "class": _ctx.cx('reorderIndicatorDown'),
    style: {
      "position": "absolute",
      "display": "none"
    }
  }, _ctx.ptm('reorderIndicatorDown')), [(openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.reorderindicatordownicon || 'ArrowUpIcon')))], 16)) : createCommentVNode("", true)], 16);
}

script.render = render;

export { script as default };
