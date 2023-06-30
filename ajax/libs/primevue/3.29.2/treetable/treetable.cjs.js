'use strict';

var api = require('primevue/api');
var BaseComponent = require('primevue/basecomponent');
var SpinnerIcon = require('primevue/icons/spinner');
var Paginator = require('primevue/paginator');
var utils = require('primevue/utils');
var vue = require('vue');
var SortAltIcon = require('primevue/icons/sortalt');
var SortAmountDownIcon = require('primevue/icons/sortamountdown');
var SortAmountUpAltIcon = require('primevue/icons/sortamountupalt');
var CheckIcon = require('primevue/icons/check');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var MinusIcon = require('primevue/icons/minus');
var Ripple = require('primevue/ripple');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
var Paginator__default = /*#__PURE__*/_interopDefaultLegacy(Paginator);
var SortAltIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortAltIcon);
var SortAmountDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortAmountDownIcon);
var SortAmountUpAltIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortAmountUpAltIcon);
var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$4 = {
    name: 'FooterCell',
    extends: BaseComponent__default["default"],
    props: {
        column: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            styleObject: {}
        };
    },
    mounted() {
        if (this.columnProp('frozen')) {
            this.updateStickyPosition();
        }
    },
    updated() {
        if (this.columnProp('frozen')) {
            this.updateStickyPosition();
        }
    },
    methods: {
        columnProp(prop) {
            return utils.ObjectUtils.getVNodeProp(this.column, prop);
        },
        getColumnPTOptions(key) {
            return this.ptmo(this.getColumnProp(), key, {
                props: this.column.props,
                parent: {
                    props: this.$props,
                    state: this.$data
                }
            });
        },
        getColumnProp() {
            return this.column.props && this.column.props.pt ? this.column.props.pt : undefined;
        },
        updateStickyPosition() {
            if (this.columnProp('frozen')) {
                let align = this.columnProp('alignFrozen');

                if (align === 'right') {
                    let right = 0;
                    let next = this.$el.nextElementSibling;

                    if (next) {
                        right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
                    }

                    this.styleObject.right = right + 'px';
                } else {
                    let left = 0;
                    let prev = this.$el.previousElementSibling;

                    if (prev) {
                        left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
                    }

                    this.styleObject.left = left + 'px';
                }
            }
        }
    },
    computed: {
        containerClass() {
            return [
                this.columnProp('footerClass'),
                this.columnProp('class'),
                {
                    'p-frozen-column': this.columnProp('frozen')
                }
            ];
        },
        containerStyle() {
            let bodyStyle = this.columnProp('footerStyle');
            let columnStyle = this.columnProp('style');

            return this.columnProp('frozen') ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
        }
    }
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
    style: $options.containerStyle,
    class: $options.containerClass,
    role: "cell"
  }, { ...$options.getColumnPTOptions('root'), ...$options.getColumnPTOptions('footerCell') }), [
    ($props.column.children && $props.column.children.footer)
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.footer), {
          key: 0,
          column: $props.column
        }, null, 8, ["column"]))
      : vue.createCommentVNode("", true),
    vue.createTextVNode(" " + vue.toDisplayString($options.columnProp('footer')), 1)
  ], 16))
}

script$4.render = render$4;

var script$3 = {
    name: 'HeaderCell',
    extends: BaseComponent__default["default"],
    emits: ['column-click', 'column-resizestart'],
    props: {
        column: {
            type: Object,
            default: null
        },
        resizableColumns: {
            type: Boolean,
            default: false
        },
        sortField: {
            type: [String, Function],
            default: null
        },
        sortOrder: {
            type: Number,
            default: null
        },
        multiSortMeta: {
            type: Array,
            default: null
        },
        sortMode: {
            type: String,
            default: 'single'
        }
    },
    data() {
        return {
            styleObject: {}
        };
    },
    mounted() {
        if (this.columnProp('frozen')) {
            this.updateStickyPosition();
        }
    },
    updated() {
        if (this.columnProp('frozen')) {
            this.updateStickyPosition();
        }
    },
    methods: {
        columnProp(prop) {
            return utils.ObjectUtils.getVNodeProp(this.column, prop);
        },
        getColumnPTOptions(key) {
            return this.ptmo(this.getColumnProp(), key, {
                props: this.column.props,
                parent: {
                    props: this.$props,
                    state: this.$data
                }
            });
        },
        getColumnProp() {
            return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo:
        },
        updateStickyPosition() {
            if (this.columnProp('frozen')) {
                let align = this.columnProp('alignFrozen');

                if (align === 'right') {
                    let right = 0;
                    let next = this.$el.nextElementSibling;

                    if (next) {
                        right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
                    }

                    this.styleObject.right = right + 'px';
                } else {
                    let left = 0;
                    let prev = this.$el.previousElementSibling;

                    if (prev) {
                        left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
                    }

                    this.styleObject.left = left + 'px';
                }

                let filterRow = this.$el.parentElement.nextElementSibling;

                if (filterRow) {
                    let index = utils.DomHandler.index(this.$el);

                    filterRow.children[index].style.left = this.styleObject.left;
                    filterRow.children[index].style.right = this.styleObject.right;
                }
            }
        },
        onClick(event) {
            this.$emit('column-click', { originalEvent: event, column: this.column });
        },
        onKeyDown(event) {
            if ((event.code === 'Enter' || event.code === 'Space') && event.currentTarget.nodeName === 'TH' && utils.DomHandler.hasClass(event.currentTarget, 'p-sortable-column')) {
                this.$emit('column-click', { originalEvent: event, column: this.column });

                event.preventDefault();
            }
        },
        onResizeStart(event) {
            this.$emit('column-resizestart', event);
        },
        getMultiSortMetaIndex() {
            let index = -1;

            for (let i = 0; i < this.multiSortMeta.length; i++) {
                let meta = this.multiSortMeta[i];

                if (meta.field === this.columnProp('field') || meta.field === this.columnProp('sortField')) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        isMultiSorted() {
            return this.columnProp('sortable') && this.getMultiSortMetaIndex() > -1;
        },
        isColumnSorted() {
            return this.sortMode === 'single' ? this.sortField && (this.sortField === this.columnProp('field') || this.sortField === this.columnProp('sortField')) : this.isMultiSorted();
        }
    },
    computed: {
        containerClass() {
            return [
                this.columnProp('headerClass'),
                this.columnProp('class'),
                {
                    'p-sortable-column': this.columnProp('sortable'),
                    'p-resizable-column': this.resizableColumns,
                    'p-highlight': this.isColumnSorted(),
                    'p-frozen-column': this.columnProp('frozen')
                }
            ];
        },
        containerStyle() {
            let headerStyle = this.columnProp('headerStyle');
            let columnStyle = this.columnProp('style');

            return this.columnProp('frozen') ? [columnStyle, headerStyle, this.styleObject] : [columnStyle, headerStyle];
        },
        sortState() {
            let sorted = false;
            let sortOrder = null;

            if (this.sortMode === 'single') {
                sorted = this.sortField && (this.sortField === this.columnProp('field') || this.sortField === this.columnProp('sortField'));
                sortOrder = sorted ? this.sortOrder : 0;
            } else if (this.sortMode === 'multiple') {
                let metaIndex = this.getMultiSortMetaIndex();

                if (metaIndex > -1) {
                    sorted = true;
                    sortOrder = this.multiSortMeta[metaIndex].order;
                }
            }

            return {
                sorted,
                sortOrder
            };
        },
        sortableColumnIcon() {
            const { sorted, sortOrder } = this.sortState;

            if (!sorted) return SortAltIcon__default["default"];
            else if (sorted && sortOrder > 0) return SortAmountUpAltIcon__default["default"];
            else if (sorted && sortOrder < 0) return SortAmountDownIcon__default["default"];

            return null;
        },
        ariaSort() {
            if (this.columnProp('sortable')) {
                const { sorted, sortOrder } = this.sortState;

                if (sorted && sortOrder < 0) return 'descending';
                else if (sorted && sortOrder > 0) return 'ascending';
                else return 'none';
            } else {
                return null;
            }
        }
    },
    components: {
        SortAltIcon: SortAltIcon__default["default"],
        SortAmountUpAltIcon: SortAmountUpAltIcon__default["default"],
        SortAmountDownIcon: SortAmountDownIcon__default["default"]
    }
};

const _hoisted_1$2 = ["tabindex", "aria-sort"];

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
    style: [$options.containerStyle],
    class: $options.containerClass,
    onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
    onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
    tabindex: $options.columnProp('sortable') ? '0' : null,
    "aria-sort": $options.ariaSort,
    role: "columnheader"
  }, { ...$options.getColumnPTOptions('root'), ...$options.getColumnPTOptions('headerCell') }), [
    ($props.resizableColumns && !$options.columnProp('frozen'))
      ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          class: "p-column-resizer",
          onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.onResizeStart && $options.onResizeStart(...args)))
        }, $options.getColumnPTOptions('columnResizer')), null, 16))
      : vue.createCommentVNode("", true),
    ($props.column.children && $props.column.children.header)
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.header), {
          key: 1,
          column: $props.column
        }, null, 8, ["column"]))
      : vue.createCommentVNode("", true),
    ($options.columnProp('header'))
      ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 2,
          class: "p-column-title"
        }, $options.getColumnPTOptions('headerTitle')), vue.toDisplayString($options.columnProp('header')), 17))
      : vue.createCommentVNode("", true),
    ($options.columnProp('sortable'))
      ? (vue.openBlock(), vue.createElementBlock("span", vue.normalizeProps(vue.mergeProps({ key: 3 }, $options.getColumnPTOptions('sort'))), [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(($props.column.children && $props.column.children.sorticon) || $options.sortableColumnIcon), {
            sorted: $options.sortState.sorted,
            sortOrder: $options.sortState.sortOrder,
            class: "p-sortable-column-icon"
          }, null, 8, ["sorted", "sortOrder"]))
        ], 16))
      : vue.createCommentVNode("", true),
    ($options.isMultiSorted())
      ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 4,
          class: "p-sortable-column-badge"
        }, $options.getColumnPTOptions('sortBadge')), vue.toDisplayString($options.getMultiSortMetaIndex() + 1), 17))
      : vue.createCommentVNode("", true)
  ], 16, _hoisted_1$2))
}

script$3.render = render$3;

var script$2 = {
    name: 'BodyCell',
    extends: BaseComponent__default["default"],
    emits: ['node-toggle', 'checkbox-toggle'],
    props: {
        node: {
            type: Object,
            default: null
        },
        column: {
            type: Object,
            default: null
        },
        level: {
            type: Number,
            default: 0
        },
        indentation: {
            type: Number,
            default: 1
        },
        leaf: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean,
            default: false
        },
        selectionMode: {
            type: String,
            default: null
        },
        checked: {
            type: Boolean,
            default: false
        },
        partialChecked: {
            type: Boolean,
            default: false
        },
        templates: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            styleObject: {},
            checkboxFocused: false
        };
    },
    mounted() {
        if (this.columnProp('frozen')) {
            this.updateStickyPosition();
        }
    },
    updated() {
        if (this.columnProp('frozen')) {
            this.updateStickyPosition();
        }
    },
    methods: {
        toggle() {
            this.$emit('node-toggle', this.node);
        },
        columnProp(prop) {
            return utils.ObjectUtils.getVNodeProp(this.column, prop);
        },
        getColumnPTOptions(key) {
            return this.ptmo(this.getColumnProp(), key, {
                props: this.column.props,
                parent: {
                    props: this.$props,
                    state: this.$data
                }
            });
        },
        getColumnCheckboxPTOptions(key) {
            return this.ptmo(this.getColumnProp(), key, {
                props: this.column.props,
                parent: {
                    props: this.$props,
                    state: this.$data
                },
                context: {
                    checked: this.checked,
                    focused: this.checkboxFocused,
                    partialChecked: this.partialChecked
                }
            });
        },
        getColumnProp() {
            return this.column.props && this.column.props.pt ? this.column.props.pt : undefined; //@todo
        },
        updateStickyPosition() {
            if (this.columnProp('frozen')) {
                let align = this.columnProp('alignFrozen');

                if (align === 'right') {
                    let right = 0;
                    let next = this.$el.nextElementSibling;

                    if (next) {
                        right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
                    }

                    this.styleObject.right = right + 'px';
                } else {
                    let left = 0;
                    let prev = this.$el.previousElementSibling;

                    if (prev) {
                        left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
                    }

                    this.styleObject.left = left + 'px';
                }
            }
        },
        resolveFieldData(rowData, field) {
            return utils.ObjectUtils.resolveFieldData(rowData, field);
        },
        toggleCheckbox() {
            this.$emit('checkbox-toggle');
        },
        onCheckboxFocus() {
            this.checkboxFocused = true;
        },
        onCheckboxBlur() {
            this.checkboxFocused = false;
        }
    },
    computed: {
        containerClass() {
            return [
                this.columnProp('bodyClass'),
                this.columnProp('class'),
                {
                    'p-frozen-column': this.columnProp('frozen')
                }
            ];
        },
        containerStyle() {
            let bodyStyle = this.columnProp('bodyStyle');
            let columnStyle = this.columnProp('style');

            return this.columnProp('frozen') ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
        },
        togglerStyle() {
            return {
                marginLeft: this.level * this.indentation + 'rem',
                visibility: this.leaf ? 'hidden' : 'visible'
            };
        },
        checkboxSelectionMode() {
            return this.selectionMode === 'checkbox';
        },
        checkboxClass() {
            return ['p-checkbox-box', { 'p-highlight': this.checked, 'p-focus': this.checkboxFocused, 'p-indeterminate': this.partialChecked }];
        }
    },
    components: {
        ChevronRightIcon: ChevronRightIcon__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"],
        CheckIcon: CheckIcon__default["default"],
        MinusIcon: MinusIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
    style: $options.containerStyle,
    class: $options.containerClass,
    role: "cell"
  }, { ...$options.getColumnPTOptions('root'), ...$options.getColumnPTOptions('bodyCell') }), [
    ($options.columnProp('expander'))
      ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
          key: 0,
          type: "button",
          class: "p-treetable-toggler p-link",
          onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggle && $options.toggle(...args))),
          style: $options.togglerStyle,
          tabindex: "-1"
        }, $options.getColumnPTOptions('rowToggler')), [
          ($props.templates['togglericon'])
            ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['togglericon']), {
                key: 0,
                node: $props.node,
                expanded: $props.expanded,
                class: "p-tree-toggler-icon"
              }, null, 8, ["node", "expanded"]))
            : ($props.expanded)
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.node.expandedIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
                  key: 1,
                  class: "p-tree-toggler-icon"
                }, $options.getColumnPTOptions('rowTogglerIcon')), null, 16))
              : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.node.collapsedIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
                  key: 2,
                  class: "p-tree-toggler-icon"
                }, $options.getColumnPTOptions('rowTogglerIcon')), null, 16))
        ], 16)), [
          [_directive_ripple]
        ])
      : vue.createCommentVNode("", true),
    ($options.checkboxSelectionMode && $options.columnProp('expander'))
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 1,
          class: ['p-checkbox p-treetable-checkbox p-component', { 'p-checkbox-focused': $data.checkboxFocused }],
          onClick: _cache[3] || (_cache[3] = (...args) => ($options.toggleCheckbox && $options.toggleCheckbox(...args)))
        }, $options.getColumnPTOptions('checkboxWrapper')), [
          vue.createElementVNode("div", vue.mergeProps({ class: "p-hidden-accessible" }, $options.getColumnPTOptions('hiddenInputWrapper')), [
            vue.createElementVNode("input", vue.mergeProps({
              type: "checkbox",
              onFocus: _cache[1] || (_cache[1] = (...args) => ($options.onCheckboxFocus && $options.onCheckboxFocus(...args))),
              onBlur: _cache[2] || (_cache[2] = (...args) => ($options.onCheckboxBlur && $options.onCheckboxBlur(...args))),
              tabindex: "-1"
            }, $options.getColumnPTOptions('hiddenInput')), null, 16)
          ], 16),
          vue.createElementVNode("div", vue.mergeProps({
            ref: "checkboxEl",
            class: $options.checkboxClass
          }, $options.getColumnCheckboxPTOptions('checkbox')), [
            ($props.templates['checkboxicon'])
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['checkboxicon']), {
                  key: 0,
                  checked: $props.checked,
                  partialChecked: $props.partialChecked,
                  class: "p-checkbox-icon"
                }, null, 8, ["checked", "partialChecked"]))
              : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.checked ? 'CheckIcon' : $props.partialChecked ? 'MinusIcon' : null), vue.mergeProps({
                  key: 1,
                  class: "p-checkbox-icon"
                }, $options.getColumnCheckboxPTOptions('checkboxIcon')), null, 16))
          ], 16)
        ], 16))
      : vue.createCommentVNode("", true),
    ($props.column.children && $props.column.children.body)
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.column.children.body), {
          key: 2,
          node: $props.node,
          column: $props.column
        }, null, 8, ["node", "column"]))
      : (vue.openBlock(), vue.createElementBlock("span", vue.normalizeProps(vue.mergeProps({ key: 3 }, $options.getColumnPTOptions('cellContent'))), vue.toDisplayString($options.resolveFieldData($props.node.data, $options.columnProp('field'))), 17))
  ], 16))
}

script$2.render = render$2;

var script$1 = {
    name: 'TreeTableRow',
    extends: BaseComponent__default["default"],
    emits: ['node-click', 'node-toggle', 'checkbox-change', 'nodeClick', 'nodeToggle', 'checkboxChange'],
    props: {
        node: {
            type: null,
            default: null
        },
        parentNode: {
            type: null,
            default: null
        },
        columns: {
            type: null,
            default: null
        },
        expandedKeys: {
            type: null,
            default: null
        },
        selectionKeys: {
            type: null,
            default: null
        },
        selectionMode: {
            type: String,
            default: null
        },
        level: {
            type: Number,
            default: 0
        },
        indentation: {
            type: Number,
            default: 1
        },
        tabindex: {
            type: Number,
            default: -1
        },
        ariaSetSize: {
            type: Number,
            default: null
        },
        ariaPosInset: {
            type: Number,
            default: null
        },
        templates: {
            type: Object,
            default: null
        }
    },
    nodeTouched: false,
    methods: {
        columnProp(col, prop) {
            return utils.ObjectUtils.getVNodeProp(col, prop);
        },
        toggle() {
            this.$emit('node-toggle', this.node);
        },
        onClick(event) {
            if (utils.DomHandler.isClickable(event.target) || utils.DomHandler.hasClass(event.target, 'p-treetable-toggler') || utils.DomHandler.hasClass(event.target.parentElement, 'p-treetable-toggler')) {
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
        onTouchEnd() {
            this.nodeTouched = true;
        },
        onKeyDown(event, item) {
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
                case 'Space':
                    this.onEnterKey(event, item);
                    break;

                case 'Tab':
                    this.onTabKey(event);
                    break;
            }
        },
        onArrowDownKey(event) {
            const nextElementSibling = event.currentTarget.nextElementSibling;

            nextElementSibling && this.focusRowChange(event.currentTarget, nextElementSibling);

            event.preventDefault();
        },
        onArrowUpKey(event) {
            const previousElementSibling = event.currentTarget.previousElementSibling;

            previousElementSibling && this.focusRowChange(event.currentTarget, previousElementSibling);

            event.preventDefault();
        },
        onArrowRightKey(event) {
            const ishiddenIcon = utils.DomHandler.findSingle(event.currentTarget, 'button').style.visibility === 'hidden';
            const togglerElement = utils.DomHandler.findSingle(this.$refs.node, '.p-treetable-toggler');

            if (ishiddenIcon) return;

            !this.expanded && togglerElement.click();

            this.$nextTick(() => {
                this.onArrowDownKey(event);
            });

            event.preventDefault();
        },
        onArrowLeftKey(event) {
            if (this.level === 0 && !this.expanded) {
                return;
            }

            const currentTarget = event.currentTarget;
            const ishiddenIcon = utils.DomHandler.findSingle(currentTarget, 'button').style.visibility === 'hidden';
            const togglerElement = utils.DomHandler.findSingle(currentTarget, '.p-treetable-toggler');

            if (this.expanded && !ishiddenIcon) {
                togglerElement.click();

                return;
            }

            const target = this.findBeforeClickableNode(currentTarget);

            target && this.focusRowChange(currentTarget, target);
        },
        onHomeKey(event) {
            const findFirstElement = utils.DomHandler.findSingle(event.currentTarget.parentElement, `tr[aria-level="${this.level + 1}"]`);

            findFirstElement && utils.DomHandler.focus(findFirstElement);

            event.preventDefault();
        },
        onEndKey(event) {
            const nodes = utils.DomHandler.find(event.currentTarget.parentElement, `tr[aria-level="${this.level + 1}"]`);
            const findFirstElement = nodes[nodes.length - 1];

            utils.DomHandler.focus(findFirstElement);

            event.preventDefault();
        },
        onEnterKey(event) {
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
        onTabKey() {
            const rows = [...utils.DomHandler.find(this.$refs.node.parentElement, 'tr')];
            const hasSelectedRow = rows.some((row) => utils.DomHandler.hasClass(row, 'p-highlight') || row.getAttribute('aria-checked') === 'true');

            rows.forEach((row) => {
                row.tabIndex = -1;
            });

            if (hasSelectedRow) {
                const selectedNodes = rows.filter((node) => utils.DomHandler.hasClass(node, 'p-highlight') || node.getAttribute('aria-checked') === 'true');

                selectedNodes[0].tabIndex = 0;

                return;
            }

            rows[0].tabIndex = 0;
        },
        focusRowChange(firstFocusableRow, currentFocusedRow) {
            firstFocusableRow.tabIndex = '-1';
            currentFocusedRow.tabIndex = '0';
            utils.DomHandler.focus(currentFocusedRow);
        },
        findBeforeClickableNode(node) {
            const prevNode = node.previousElementSibling;

            if (prevNode) {
                const prevNodeButton = prevNode.querySelector('button');

                if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
                    return prevNode;
                }

                return this.findBeforeClickableNode(prevNode);
            }

            return null;
        },
        toggleCheckbox() {
            let _selectionKeys = this.selectionKeys ? { ...this.selectionKeys } : {};
            const _check = !this.checked;

            this.propagateDown(this.node, _check, _selectionKeys);

            this.$emit('checkbox-change', {
                node: this.node,
                check: _check,
                selectionKeys: _selectionKeys
            });
        },
        propagateDown(node, check, selectionKeys) {
            if (check) selectionKeys[node.key] = { checked: true, partialChecked: false };
            else delete selectionKeys[node.key];

            if (node.children && node.children.length) {
                for (let child of node.children) {
                    this.propagateDown(child, check, selectionKeys);
                }
            }
        },
        propagateUp(event) {
            let check = event.check;
            let _selectionKeys = { ...event.selectionKeys };
            let checkedChildCount = 0;
            let childPartialSelected = false;

            for (let child of this.node.children) {
                if (_selectionKeys[child.key] && _selectionKeys[child.key].checked) checkedChildCount++;
                else if (_selectionKeys[child.key] && _selectionKeys[child.key].partialChecked) childPartialSelected = true;
            }

            if (check && checkedChildCount === this.node.children.length) {
                _selectionKeys[this.node.key] = { checked: true, partialChecked: false };
            } else {
                if (!check) {
                    delete _selectionKeys[this.node.key];
                }

                if (childPartialSelected || (checkedChildCount > 0 && checkedChildCount !== this.node.children.length)) _selectionKeys[this.node.key] = { checked: false, partialChecked: true };
                else _selectionKeys[this.node.key] = { checked: false, partialChecked: false };
            }

            this.$emit('checkbox-change', {
                node: event.node,
                check: event.check,
                selectionKeys: _selectionKeys
            });
        },
        onCheckboxChange(event) {
            let check = event.check;
            let _selectionKeys = { ...event.selectionKeys };
            let checkedChildCount = 0;
            let childPartialSelected = false;

            for (let child of this.node.children) {
                if (_selectionKeys[child.key] && _selectionKeys[child.key].checked) checkedChildCount++;
                else if (_selectionKeys[child.key] && _selectionKeys[child.key].partialChecked) childPartialSelected = true;
            }

            if (check && checkedChildCount === this.node.children.length) {
                _selectionKeys[this.node.key] = { checked: true, partialChecked: false };
            } else {
                if (!check) {
                    delete _selectionKeys[this.node.key];
                }

                if (childPartialSelected || (checkedChildCount > 0 && checkedChildCount !== this.node.children.length)) _selectionKeys[this.node.key] = { checked: false, partialChecked: true };
                else _selectionKeys[this.node.key] = { checked: false, partialChecked: false };
            }

            this.$emit('checkbox-change', {
                node: event.node,
                check: event.check,
                selectionKeys: _selectionKeys
            });
        },
        setTabIndexForSelectionMode(event, nodeTouched) {
            if (this.selectionMode !== null) {
                const elements = [...utils.DomHandler.find(this.$refs.node.parentElement, 'tr')];

                event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;

                if (elements.every((element) => element.tabIndex === -1)) {
                    elements[0].tabIndex = 0;
                }
            }
        }
    },
    computed: {
        containerClass() {
            return [
                this.node.styleClass,
                {
                    'p-highlight': this.selected
                }
            ];
        },
        expanded() {
            return this.expandedKeys && this.expandedKeys[this.node.key] === true;
        },
        leaf() {
            return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
        },
        selected() {
            return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.node.key] === true : false;
        },
        checked() {
            return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].checked : false;
        },
        partialChecked() {
            return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].partialChecked : false;
        },
        getAriaSelected() {
            return this.selectionMode === 'single' || this.selectionMode === 'multiple' ? this.selected : null;
        }
    },
    components: {
        TTBodyCell: script$2
    }
};

const _hoisted_1$1 = ["tabindex", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset", "aria-selected", "aria-checked"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TTBodyCell = vue.resolveComponent("TTBodyCell");
  const _component_TreeTableRow = vue.resolveComponent("TreeTableRow", true);

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("tr", vue.mergeProps({
      ref: "node",
      class: $options.containerClass,
      style: $props.node.style,
      tabindex: $props.tabindex,
      role: "row",
      "aria-expanded": $options.expanded,
      "aria-level": $props.level + 1,
      "aria-setsize": $props.ariaSetSize,
      "aria-posinset": $props.ariaPosInset,
      "aria-selected": $options.getAriaSelected,
      "aria-checked": $options.checked || undefined,
      onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
      onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
      onTouchend: _cache[3] || (_cache[3] = (...args) => ($options.onTouchEnd && $options.onTouchEnd(...args)))
    }, _ctx.ptm('row')), [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.columns, (col, i) => {
        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
        }, [
          (!$options.columnProp(col, 'hidden'))
            ? (vue.openBlock(), vue.createBlock(_component_TTBodyCell, {
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
                onNodeToggle: _cache[0] || (_cache[0] = $event => (_ctx.$emit('node-toggle', $event))),
                onCheckboxToggle: $options.toggleCheckbox,
                pt: _ctx.pt
              }, null, 8, ["column", "node", "level", "leaf", "indentation", "expanded", "selectionMode", "checked", "partialChecked", "templates", "onCheckboxToggle", "pt"]))
            : vue.createCommentVNode("", true)
        ], 64))
      }), 128))
    ], 16, _hoisted_1$1),
    ($options.expanded && $props.node.children && $props.node.children.length)
      ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($props.node.children, (childNode) => {
          return (vue.openBlock(), vue.createBlock(_component_TreeTableRow, {
            key: childNode.key,
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
            onNodeToggle: _cache[4] || (_cache[4] = $event => (_ctx.$emit('node-toggle', $event))),
            onNodeClick: _cache[5] || (_cache[5] = $event => (_ctx.$emit('node-click', $event))),
            onCheckboxChange: $options.onCheckboxChange,
            pt: _ctx.pt
          }, null, 8, ["columns", "node", "parentNode", "level", "expandedKeys", "selectionMode", "selectionKeys", "indentation", "ariaPosInset", "ariaSetSize", "templates", "onCheckboxChange", "pt"]))
        }), 128))
      : vue.createCommentVNode("", true)
  ], 64))
}

script$1.render = render$1;

var script = {
    name: 'TreeTable',
    extends: BaseComponent__default["default"],
    emits: [
        'node-expand',
        'node-collapse',
        'update:expandedKeys',
        'update:selectionKeys',
        'node-select',
        'node-unselect',
        'update:first',
        'update:rows',
        'page',
        'update:sortField',
        'update:sortOrder',
        'update:multiSortMeta',
        'sort',
        'filter',
        'column-resize-end'
    ],
    props: {
        value: {
            type: null,
            default: null
        },
        expandedKeys: {
            type: null,
            default: null
        },
        selectionKeys: {
            type: null,
            default: null
        },
        selectionMode: {
            type: String,
            default: null
        },
        metaKeySelection: {
            type: Boolean,
            default: true
        },
        rows: {
            type: Number,
            default: 0
        },
        first: {
            type: Number,
            default: 0
        },
        totalRecords: {
            type: Number,
            default: 0
        },
        paginator: {
            type: Boolean,
            default: false
        },
        paginatorPosition: {
            type: String,
            default: 'bottom'
        },
        alwaysShowPaginator: {
            type: Boolean,
            default: true
        },
        paginatorTemplate: {
            type: String,
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
        },
        pageLinkSize: {
            type: Number,
            default: 5
        },
        rowsPerPageOptions: {
            type: Array,
            default: null
        },
        currentPageReportTemplate: {
            type: String,
            default: '({currentPage} of {totalPages})'
        },
        lazy: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingIcon: {
            type: String,
            default: undefined
        },
        rowHover: {
            type: Boolean,
            default: false
        },
        autoLayout: {
            type: Boolean,
            default: false
        },
        sortField: {
            type: [String, Function],
            default: null
        },
        sortOrder: {
            type: Number,
            default: null
        },
        defaultSortOrder: {
            type: Number,
            default: 1
        },
        multiSortMeta: {
            type: Array,
            default: null
        },
        sortMode: {
            type: String,
            default: 'single'
        },
        removableSort: {
            type: Boolean,
            default: false
        },
        filters: {
            type: Object,
            default: null
        },
        filterMode: {
            type: String,
            default: 'lenient'
        },
        filterLocale: {
            type: String,
            default: undefined
        },
        resizableColumns: {
            type: Boolean,
            default: false
        },
        columnResizeMode: {
            type: String,
            default: 'fit'
        },
        indentation: {
            type: Number,
            default: 1
        },
        showGridlines: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        scrollDirection: {
            type: String,
            default: 'vertical'
        },
        scrollHeight: {
            type: String,
            default: null
        },
        responsiveLayout: {
            type: String,
            default: null
        },
        tableProps: {
            type: Object,
            default: null
        }
    },
    documentColumnResizeListener: null,
    documentColumnResizeEndListener: null,
    lastResizeHelperX: null,
    resizeColumnElement: null,
    data() {
        return {
            d_expandedKeys: this.expandedKeys || {},
            d_first: this.first,
            d_rows: this.rows,
            d_sortField: this.sortField,
            d_sortOrder: this.sortOrder,
            d_multiSortMeta: this.multiSortMeta ? [...this.multiSortMeta] : [],
            hasASelectedNode: false
        };
    },
    watch: {
        expandedKeys(newValue) {
            this.d_expandedKeys = newValue;
        },
        first(newValue) {
            this.d_first = newValue;
        },
        rows(newValue) {
            this.d_rows = newValue;
        },
        sortField(newValue) {
            this.d_sortField = newValue;
        },
        sortOrder(newValue) {
            this.d_sortOrder = newValue;
        },
        multiSortMeta(newValue) {
            this.d_multiSortMeta = newValue;
        }
    },
    mounted() {
        if (this.scrollable && this.scrollDirection !== 'vertical') {
            this.updateScrollWidth();
        }
    },
    updated() {
        if (this.scrollable && this.scrollDirection !== 'vertical') {
            this.updateScrollWidth();
        }
    },
    methods: {
        columnProp(col, prop) {
            return utils.ObjectUtils.getVNodeProp(col, prop);
        },
        onNodeToggle(node) {
            const key = node.key;

            if (this.d_expandedKeys[key]) {
                delete this.d_expandedKeys[key];
                this.$emit('node-collapse', node);
            } else {
                this.d_expandedKeys[key] = true;
                this.$emit('node-expand', node);
            }

            this.d_expandedKeys = { ...this.d_expandedKeys };
            this.$emit('update:expandedKeys', this.d_expandedKeys);
        },
        onNodeClick(event) {
            if (this.rowSelectionMode && event.node.selectable !== false) {
                const metaSelection = event.nodeTouched ? false : this.metaKeySelection;
                const _selectionKeys = metaSelection ? this.handleSelectionWithMetaKey(event) : this.handleSelectionWithoutMetaKey(event);

                this.$emit('update:selectionKeys', _selectionKeys);
            }
        },
        handleSelectionWithMetaKey(event) {
            const originalEvent = event.originalEvent;
            const node = event.node;
            const metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            const selected = this.isNodeSelected(node);
            let _selectionKeys;

            if (selected && metaKey) {
                if (this.isSingleSelectionMode()) {
                    _selectionKeys = {};
                } else {
                    _selectionKeys = { ...this.selectionKeys };
                    delete _selectionKeys[node.key];
                }

                this.$emit('node-unselect', node);
            } else {
                if (this.isSingleSelectionMode()) {
                    _selectionKeys = {};
                } else if (this.isMultipleSelectionMode()) {
                    _selectionKeys = !metaKey ? {} : this.selectionKeys ? { ...this.selectionKeys } : {};
                }

                _selectionKeys[node.key] = true;
                this.$emit('node-select', node);
            }

            return _selectionKeys;
        },
        handleSelectionWithoutMetaKey(event) {
            const node = event.node;
            const selected = this.isNodeSelected(node);
            let _selectionKeys;

            if (this.isSingleSelectionMode()) {
                if (selected) {
                    _selectionKeys = {};
                    this.$emit('node-unselect', node);
                } else {
                    _selectionKeys = {};
                    _selectionKeys[node.key] = true;
                    this.$emit('node-select', node);
                }
            } else {
                if (selected) {
                    _selectionKeys = { ...this.selectionKeys };
                    delete _selectionKeys[node.key];

                    this.$emit('node-unselect', node);
                } else {
                    _selectionKeys = this.selectionKeys ? { ...this.selectionKeys } : {};
                    _selectionKeys[node.key] = true;

                    this.$emit('node-select', node);
                }
            }

            return _selectionKeys;
        },
        onCheckboxChange(event) {
            this.$emit('update:selectionKeys', event.selectionKeys);

            if (event.check) this.$emit('node-select', event.node);
            else this.$emit('node-unselect', event.node);
        },
        isSingleSelectionMode() {
            return this.selectionMode === 'single';
        },
        isMultipleSelectionMode() {
            return this.selectionMode === 'multiple';
        },
        onPage(event) {
            this.d_first = event.first;
            this.d_rows = event.rows;

            let pageEvent = this.createLazyLoadEvent(event);

            pageEvent.pageCount = event.pageCount;
            pageEvent.page = event.page;

            this.$emit('update:first', this.d_first);
            this.$emit('update:rows', this.d_rows);
            this.$emit('page', pageEvent);
        },
        resetPage() {
            this.d_first = 0;
            this.$emit('update:first', this.d_first);
        },
        getFilterColumnHeaderClass(column) {
            return [
                'p-filter-column',
                this.columnProp(column, 'filterHeaderClass'),
                {
                    'p-frozen-column': this.columnProp(column, 'frozen')
                }
            ];
        },
        onColumnHeaderClick(e) {
            let event = e.originalEvent;
            let column = e.column;

            if (this.columnProp(column, 'sortable')) {
                const targetNode = event.target;
                const columnField = this.columnProp(column, 'sortField') || this.columnProp(column, 'field');

                if (
                    utils.DomHandler.hasClass(targetNode, 'p-sortable-column') ||
                    utils.DomHandler.hasClass(targetNode, 'p-column-title') ||
                    utils.DomHandler.hasClass(targetNode, 'p-sortable-column-icon') ||
                    utils.DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')
                ) {
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
                        let metaKey = event.metaKey || event.ctrlKey;

                        if (!metaKey) {
                            this.d_multiSortMeta = this.d_multiSortMeta.filter((meta) => meta.field === columnField);
                        }

                        this.addMultiSortField(columnField);
                        this.$emit('update:multiSortMeta', this.d_multiSortMeta);
                    }

                    this.$emit('sort', this.createLazyLoadEvent(event));
                }
            }
        },
        addMultiSortField(field) {
            let index = this.d_multiSortMeta.findIndex((meta) => meta.field === field);

            if (index >= 0) {
                if (this.removableSort && this.d_multiSortMeta[index].order * -1 === this.defaultSortOrder) this.d_multiSortMeta.splice(index, 1);
                else this.d_multiSortMeta[index] = { field: field, order: this.d_multiSortMeta[index].order * -1 };
            } else {
                this.d_multiSortMeta.push({ field: field, order: this.defaultSortOrder });
            }

            this.d_multiSortMeta = [...this.d_multiSortMeta];
        },
        sortSingle(nodes) {
            return this.sortNodesSingle(nodes);
        },
        sortNodesSingle(nodes) {
            let _nodes = [...nodes];

            _nodes.sort((node1, node2) => {
                const value1 = utils.ObjectUtils.resolveFieldData(node1.data, this.d_sortField);
                const value2 = utils.ObjectUtils.resolveFieldData(node2.data, this.d_sortField);
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return this.d_sortOrder * result;
            });

            return _nodes;
        },
        sortMultiple(nodes) {
            return this.sortNodesMultiple(nodes);
        },
        sortNodesMultiple(nodes) {
            let _nodes = [...nodes];

            _nodes.sort((node1, node2) => {
                return this.multisortField(node1, node2, 0);
            });

            return _nodes;
        },
        multisortField(node1, node2, index) {
            const value1 = utils.ObjectUtils.resolveFieldData(node1.data, this.d_multiSortMeta[index].field);
            const value2 = utils.ObjectUtils.resolveFieldData(node2.data, this.d_multiSortMeta[index].field);
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else {
                if (value1 === value2) {
                    return this.d_multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, index + 1) : 0;
                } else {
                    if ((typeof value1 === 'string' || value1 instanceof String) && (typeof value2 === 'string' || value2 instanceof String)) return this.d_multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true });
                    else result = value1 < value2 ? -1 : 1;
                }
            }

            return this.d_multiSortMeta[index].order * result;
        },
        filter(value) {
            let filteredNodes = [];
            const strict = this.filterMode === 'strict';

            for (let node of value) {
                let copyNode = { ...node };
                let localMatch = true;
                let globalMatch = false;

                for (let j = 0; j < this.columns.length; j++) {
                    let col = this.columns[j];
                    let filterField = this.columnProp(col, 'field');

                    //local
                    if (Object.prototype.hasOwnProperty.call(this.filters, this.columnProp(col, 'field'))) {
                        let filterMatchMode = this.columnProp(col, 'filterMatchMode') || 'startsWith';
                        let filterValue = this.filters[this.columnProp(col, 'field')];
                        let filterConstraint = api.FilterService.filters[filterMatchMode];
                        let paramsWithoutNode = { filterField, filterValue, filterConstraint, strict };

                        if (
                            (strict && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                            (!strict && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))
                        ) {
                            localMatch = false;
                        }

                        if (!localMatch) {
                            break;
                        }
                    }

                    //global
                    if (this.hasGlobalFilter() && !globalMatch) {
                        let copyNodeForGlobal = { ...copyNode };
                        let filterValue = this.filters['global'];
                        let filterConstraint = api.FilterService.filters['contains'];
                        let globalFilterParamsWithoutNode = { filterField, filterValue, filterConstraint, strict };

                        if (
                            (strict && (this.findFilteredNodes(copyNodeForGlobal, globalFilterParamsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, globalFilterParamsWithoutNode))) ||
                            (!strict && (this.isFilterMatched(copyNodeForGlobal, globalFilterParamsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, globalFilterParamsWithoutNode)))
                        ) {
                            globalMatch = true;
                            copyNode = copyNodeForGlobal;
                        }
                    }
                }

                let matches = localMatch;

                if (this.hasGlobalFilter()) {
                    matches = localMatch && globalMatch;
                }

                if (matches) {
                    filteredNodes.push(copyNode);
                }
            }

            let filterEvent = this.createLazyLoadEvent(event);

            filterEvent.filteredValue = filteredNodes;
            this.$emit('filter', filterEvent);

            return filteredNodes;
        },
        findFilteredNodes(node, paramsWithoutNode) {
            if (node) {
                let matched = false;

                if (node.children) {
                    let childNodes = [...node.children];

                    node.children = [];

                    for (let childNode of childNodes) {
                        let copyChildNode = { ...childNode };

                        if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                            matched = true;
                            node.children.push(copyChildNode);
                        }
                    }
                }

                if (matched) {
                    return true;
                }
            }
        },
        isFilterMatched(node, { filterField, filterValue, filterConstraint, strict }) {
            let matched = false;
            let dataFieldValue = utils.ObjectUtils.resolveFieldData(node.data, filterField);

            if (filterConstraint(dataFieldValue, filterValue, this.filterLocale)) {
                matched = true;
            }

            if (!matched || (strict && !this.isNodeLeaf(node))) {
                matched = this.findFilteredNodes(node, { filterField, filterValue, filterConstraint, strict }) || matched;
            }

            return matched;
        },
        isNodeSelected(node) {
            return this.selectionMode && this.selectionKeys ? this.selectionKeys[node.key] === true : false;
        },
        isNodeLeaf(node) {
            return node.leaf === false ? false : !(node.children && node.children.length);
        },
        createLazyLoadEvent(event) {
            let filterMatchModes;

            if (this.hasFilters()) {
                filterMatchModes = {};
                this.columns.forEach((col) => {
                    if (this.columnProp(col, 'field')) {
                        filterMatchModes[col.props.field] = this.columnProp(col, 'filterMatchMode');
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
        onColumnResizeStart(event) {
            let containerLeft = utils.DomHandler.getOffset(this.$el).left;

            this.resizeColumnElement = event.target.parentElement;
            this.columnResizing = true;
            this.lastResizeHelperX = event.pageX - containerLeft + this.$el.scrollLeft;

            this.bindColumnResizeEvents();
        },
        onColumnResize(event) {
            let containerLeft = utils.DomHandler.getOffset(this.$el).left;

            utils.DomHandler.addClass(this.$el, 'p-unselectable-text');
            this.$refs.resizeHelper.style.height = this.$el.offsetHeight + 'px';
            this.$refs.resizeHelper.style.top = 0 + 'px';
            this.$refs.resizeHelper.style.left = event.pageX - containerLeft + this.$el.scrollLeft + 'px';

            this.$refs.resizeHelper.style.display = 'block';
        },
        onColumnResizeEnd() {
            let delta = this.$refs.resizeHelper.offsetLeft - this.lastResizeHelperX;
            let columnWidth = this.resizeColumnElement.offsetWidth;
            let newColumnWidth = columnWidth + delta;
            let minWidth = this.resizeColumnElement.style.minWidth || 15;

            if (columnWidth + delta > parseInt(minWidth, 10)) {
                if (this.columnResizeMode === 'fit') {
                    let nextColumn = this.resizeColumnElement.nextElementSibling;
                    let nextColumnWidth = nextColumn.offsetWidth - delta;

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

                    if (!this.scrollable) this.resizeColumnElement.style.width = newColumnWidth + 'px';
                    else this.resizeTableCells(newColumnWidth);
                }

                this.$emit('column-resize-end', {
                    element: this.resizeColumnElement,
                    delta: delta
                });
            }

            this.$refs.resizeHelper.style.display = 'none';
            this.resizeColumn = null;
            utils.DomHandler.removeClass(this.$el, 'p-unselectable-text');

            this.unbindColumnResizeEvents();
        },
        resizeTableCells(newColumnWidth, nextColumnWidth) {
            let colIndex = utils.DomHandler.index(this.resizeColumnElement);
            let children = this.$refs.table.children;

            for (let child of children) {
                for (let row of child.children) {
                    let resizeCell = row.children[colIndex];

                    resizeCell.style.flex = '0 0 ' + newColumnWidth + 'px';

                    if (this.columnResizeMode === 'fit') {
                        let nextCell = resizeCell.nextElementSibling;

                        if (nextCell) {
                            nextCell.style.flex = '0 0 ' + nextColumnWidth + 'px';
                        }
                    }
                }
            }
        },
        bindColumnResizeEvents() {
            if (!this.documentColumnResizeListener) {
                this.documentColumnResizeListener = document.addEventListener('mousemove', (event) => {
                    if (this.columnResizing) {
                        this.onColumnResize(event);
                    }
                });
            }

            if (!this.documentColumnResizeEndListener) {
                this.documentColumnResizeEndListener = document.addEventListener('mouseup', () => {
                    if (this.columnResizing) {
                        this.columnResizing = false;
                        this.onColumnResizeEnd();
                    }
                });
            }
        },
        unbindColumnResizeEvents() {
            if (this.documentColumnResizeListener) {
                document.removeEventListener('document', this.documentColumnResizeListener);
                this.documentColumnResizeListener = null;
            }

            if (this.documentColumnResizeEndListener) {
                document.removeEventListener('document', this.documentColumnResizeEndListener);
                this.documentColumnResizeEndListener = null;
            }
        },
        onColumnKeyDown(event, col) {
            if (event.code === 'Enter' && event.currentTarget.nodeName === 'TH' && utils.DomHandler.hasClass(event.currentTarget, 'p-sortable-column')) {
                this.onColumnHeaderClick(event, col);
            }
        },
        hasColumnFilter() {
            if (this.columns) {
                for (let col of this.columns) {
                    if (col.children && col.children.filter) {
                        return true;
                    }
                }
            }

            return false;
        },
        hasFilters() {
            return this.filters && Object.keys(this.filters).length > 0 && this.filters.constructor === Object;
        },
        hasGlobalFilter() {
            return this.filters && Object.prototype.hasOwnProperty.call(this.filters, 'global');
        },
        updateScrollWidth() {
            this.$refs.table.style.width = this.$refs.table.scrollWidth + 'px';
        },
        getItemLabel(node) {
            return node.data.name;
        },
        setTabindex(node, index) {
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
        containerClass() {
            return [
                'p-treetable p-component',
                {
                    'p-treetable-hoverable-rows': this.rowHover || this.rowSelectionMode,
                    'p-treetable-auto-layout': this.autoLayout,
                    'p-treetable-resizable': this.resizableColumns,
                    'p-treetable-resizable-fit': this.resizableColumns && this.columnResizeMode === 'fit',
                    'p-treetable-gridlines': this.showGridlines,
                    'p-treetable-scrollable': this.scrollable,
                    'p-treetable-scrollable-vertical': this.scrollable && this.scrollDirection === 'vertical',
                    'p-treetable-scrollable-horizontal': this.scrollable && this.scrollDirection === 'horizontal',
                    'p-treetable-scrollable-both': this.scrollable && this.scrollDirection === 'both',
                    'p-treetable-flex-scrollable': this.scrollable && this.scrollHeight === 'flex',
                    'p-treetable-responsive-scroll': this.responsiveLayout === 'scroll'
                }
            ];
        },
        columns() {
            let cols = [];
            let children = this.$slots.default();

            children.forEach((child) => {
                if (child.children && child.children instanceof Array) cols = [...cols, ...child.children];
                else if (child.type.name === 'Column') cols.push(child);
            });

            return cols;
        },
        processedData() {
            if (this.lazy) {
                return this.value;
            } else {
                if (this.value && this.value.length) {
                    let data = this.value;

                    if (this.sorted) {
                        if (this.sortMode === 'single') data = this.sortSingle(data);
                        else if (this.sortMode === 'multiple') data = this.sortMultiple(data);
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
        dataToRender() {
            const data = this.processedData;

            if (this.paginator) {
                const first = this.lazy ? 0 : this.d_first;

                return data.slice(first, first + this.d_rows);
            } else {
                return data;
            }
        },
        empty() {
            const data = this.processedData;

            return !data || data.length === 0;
        },
        sorted() {
            return this.d_sortField || (this.d_multiSortMeta && this.d_multiSortMeta.length > 0);
        },
        hasFooter() {
            let hasFooter = false;

            for (let col of this.columns) {
                if (this.columnProp(col, 'footer') || (col.children && col.children.footer)) {
                    hasFooter = true;
                    break;
                }
            }

            return hasFooter;
        },
        paginatorTop() {
            return this.paginator && (this.paginatorPosition !== 'bottom' || this.paginatorPosition === 'both');
        },
        paginatorBottom() {
            return this.paginator && (this.paginatorPosition !== 'top' || this.paginatorPosition === 'both');
        },
        singleSelectionMode() {
            return this.selectionMode && this.selectionMode === 'single';
        },
        multipleSelectionMode() {
            return this.selectionMode && this.selectionMode === 'multiple';
        },
        rowSelectionMode() {
            return this.singleSelectionMode || this.multipleSelectionMode;
        },
        totalRecordsLength() {
            if (this.lazy) {
                return this.totalRecords;
            } else {
                const data = this.processedData;

                return data ? data.length : 0;
            }
        }
    },
    components: {
        TTRow: script$1,
        TTPaginator: Paginator__default["default"],
        TTHeaderCell: script$3,
        TTFooterCell: script$4,
        SpinnerIcon: SpinnerIcon__default["default"]
    }
};

const _hoisted_1 = ["colspan"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TTPaginator = vue.resolveComponent("TTPaginator");
  const _component_TTHeaderCell = vue.resolveComponent("TTHeaderCell");
  const _component_TTRow = vue.resolveComponent("TTRow");
  const _component_TTFooterCell = vue.resolveComponent("TTFooterCell");

  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: $options.containerClass,
    "data-scrollselectors": ".p-treetable-scrollable-body",
    role: "table"
  }, _ctx.ptm('root')), [
    ($props.loading)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 0,
          class: "p-treetable-loading"
        }, _ctx.ptm('loadingWrapper')), [
          vue.createElementVNode("div", vue.mergeProps({ class: "p-treetable-loading-overlay p-component-overlay" }, _ctx.ptm('loadingOverlay')), [
            vue.renderSlot(_ctx.$slots, "loadingicon", {}, () => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.loadingIcon ? 'span' : 'SpinnerIcon'), vue.mergeProps({
                spin: "",
                class: ['p-treetable-loading-icon', $props.loadingIcon]
              }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))
            ])
          ], 16)
        ], 16))
      : vue.createCommentVNode("", true),
    (_ctx.$slots.header)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 1,
          class: "p-treetable-header"
        }, _ctx.ptm('header')), [
          vue.renderSlot(_ctx.$slots, "header")
        ], 16))
      : vue.createCommentVNode("", true),
    ($options.paginatorTop)
      ? (vue.openBlock(), vue.createBlock(_component_TTPaginator, {
          key: 2,
          rows: $data.d_rows,
          first: $data.d_first,
          totalRecords: $options.totalRecordsLength,
          pageLinkSize: $props.pageLinkSize,
          template: $props.paginatorTemplate,
          rowsPerPageOptions: $props.rowsPerPageOptions,
          currentPageReportTemplate: $props.currentPageReportTemplate,
          class: "p-paginator-top",
          onPage: _cache[0] || (_cache[0] = $event => ($options.onPage($event))),
          alwaysShow: $props.alwaysShowPaginator,
          pt: _ctx.ptm('paginator')
        }, vue.createSlots({ _: 2 }, [
          (_ctx.$slots.paginatorstart)
            ? {
                name: "start",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorstart")
                ]),
                key: "0"
              }
            : undefined,
          (_ctx.$slots.paginatorend)
            ? {
                name: "end",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorend")
                ]),
                key: "1"
              }
            : undefined,
          (_ctx.$slots.paginatorfirstpagelinkicon)
            ? {
                name: "firstpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon")
                ]),
                key: "2"
              }
            : undefined,
          (_ctx.$slots.paginatorprevpagelinkicon)
            ? {
                name: "prevpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorprevpagelinkicon")
                ]),
                key: "3"
              }
            : undefined,
          (_ctx.$slots.paginatornextpagelinkicon)
            ? {
                name: "nextpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatornextpagelinkicon")
                ]),
                key: "4"
              }
            : undefined,
          (_ctx.$slots.paginatorlastpagelinkicon)
            ? {
                name: "lastpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorlastpagelinkicon")
                ]),
                key: "5"
              }
            : undefined
        ]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "alwaysShow", "pt"]))
      : vue.createCommentVNode("", true),
    vue.createElementVNode("div", vue.mergeProps({
      class: "p-treetable-wrapper",
      style: { maxHeight: $props.scrollHeight }
    }, _ctx.ptm('wrapper')), [
      vue.createElementVNode("table", vue.mergeProps({
        ref: "table",
        role: "table"
      }, { ...$props.tableProps, ..._ctx.ptm('table') }), [
        vue.createElementVNode("thead", vue.mergeProps({
          class: "p-treetable-thead",
          role: "rowgroup"
        }, _ctx.ptm('thead')), [
          vue.createElementVNode("tr", vue.mergeProps({ role: "row" }, _ctx.ptm('headerRow')), [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.columns, (col, i) => {
              return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
              }, [
                (!$options.columnProp(col, 'hidden'))
                  ? (vue.openBlock(), vue.createBlock(_component_TTHeaderCell, {
                      key: 0,
                      column: col,
                      resizableColumns: $props.resizableColumns,
                      sortField: $data.d_sortField,
                      sortOrder: $data.d_sortOrder,
                      multiSortMeta: $data.d_multiSortMeta,
                      sortMode: $props.sortMode,
                      onColumnClick: $options.onColumnHeaderClick,
                      onColumnResizestart: $options.onColumnResizeStart,
                      pt: _ctx.pt
                    }, null, 8, ["column", "resizableColumns", "sortField", "sortOrder", "multiSortMeta", "sortMode", "onColumnClick", "onColumnResizestart", "pt"]))
                  : vue.createCommentVNode("", true)
              ], 64))
            }), 128))
          ], 16),
          ($options.hasColumnFilter())
            ? (vue.openBlock(), vue.createElementBlock("tr", vue.normalizeProps(vue.mergeProps({ key: 0 }, _ctx.ptm('headerRow'))), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.columns, (col, i) => {
                  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                    key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
                  }, [
                    (!$options.columnProp(col, 'hidden'))
                      ? (vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
                          key: 0,
                          class: $options.getFilterColumnHeaderClass(col),
                          style: [$options.columnProp(col, 'style'), $options.columnProp(col, 'filterHeaderStyle')]
                        }, _ctx.ptm('headerCell')), [
                          (col.children && col.children.filter)
                            ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(col.children.filter), {
                                key: 0,
                                column: col
                              }, null, 8, ["column"]))
                            : vue.createCommentVNode("", true)
                        ], 16))
                      : vue.createCommentVNode("", true)
                  ], 64))
                }), 128))
              ], 16))
            : vue.createCommentVNode("", true)
        ], 16),
        vue.createElementVNode("tbody", vue.mergeProps({
          class: "p-treetable-tbody",
          role: "rowgroup"
        }, _ctx.ptm('tbody')), [
          (!$options.empty)
            ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($options.dataToRender, (node, index) => {
                return (vue.openBlock(), vue.createBlock(_component_TTRow, {
                  key: node.key,
                  columns: $options.columns,
                  node: node,
                  level: 0,
                  expandedKeys: $data.d_expandedKeys,
                  indentation: $props.indentation,
                  selectionMode: $props.selectionMode,
                  selectionKeys: $props.selectionKeys,
                  ariaSetSize: $options.dataToRender.length,
                  ariaPosInset: index + 1,
                  tabindex: $options.setTabindex(node, index),
                  templates: _ctx.$slots,
                  onNodeToggle: $options.onNodeToggle,
                  onNodeClick: $options.onNodeClick,
                  onCheckboxChange: $options.onCheckboxChange,
                  pt: _ctx.pt
                }, null, 8, ["columns", "node", "expandedKeys", "indentation", "selectionMode", "selectionKeys", "ariaSetSize", "ariaPosInset", "tabindex", "templates", "onNodeToggle", "onNodeClick", "onCheckboxChange", "pt"]))
              }), 128))
            : (vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
                key: 1,
                class: "p-treetable-emptymessage"
              }, _ctx.ptm('emptyMessage')), [
                vue.createElementVNode("td", vue.mergeProps({
                  colspan: $options.columns.length
                }, _ctx.ptm('bodyCell')), [
                  vue.renderSlot(_ctx.$slots, "empty")
                ], 16, _hoisted_1)
              ], 16))
        ], 16),
        ($options.hasFooter)
          ? (vue.openBlock(), vue.createElementBlock("tfoot", vue.mergeProps({
              key: 0,
              class: "p-treetable-tfoot",
              role: "rowgroup"
            }, _ctx.ptm('tfoot')), [
              vue.createElementVNode("tr", vue.mergeProps({ role: "row" }, _ctx.ptm('footerRow')), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.columns, (col, i) => {
                  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                    key: $options.columnProp(col, 'columnKey') || $options.columnProp(col, 'field') || i
                  }, [
                    (!$options.columnProp(col, 'hidden'))
                      ? (vue.openBlock(), vue.createBlock(_component_TTFooterCell, {
                          key: 0,
                          column: col,
                          pt: _ctx.pt
                        }, null, 8, ["column", "pt"]))
                      : vue.createCommentVNode("", true)
                  ], 64))
                }), 128))
              ], 16)
            ], 16))
          : vue.createCommentVNode("", true)
      ], 16)
    ], 16),
    ($options.paginatorBottom)
      ? (vue.openBlock(), vue.createBlock(_component_TTPaginator, {
          key: 3,
          rows: $data.d_rows,
          first: $data.d_first,
          totalRecords: $options.totalRecordsLength,
          pageLinkSize: $props.pageLinkSize,
          template: $props.paginatorTemplate,
          rowsPerPageOptions: $props.rowsPerPageOptions,
          currentPageReportTemplate: $props.currentPageReportTemplate,
          class: "p-paginator-bottom",
          onPage: _cache[1] || (_cache[1] = $event => ($options.onPage($event))),
          alwaysShow: $props.alwaysShowPaginator,
          pt: _ctx.pt
        }, vue.createSlots({ _: 2 }, [
          (_ctx.$slots.paginatorstart)
            ? {
                name: "start",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorstart")
                ]),
                key: "0"
              }
            : undefined,
          (_ctx.$slots.paginatorend)
            ? {
                name: "end",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorend")
                ]),
                key: "1"
              }
            : undefined,
          (_ctx.$slots.paginatorfirstpagelinkicon)
            ? {
                name: "firstpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon")
                ]),
                key: "2"
              }
            : undefined,
          (_ctx.$slots.paginatorprevpagelinkicon)
            ? {
                name: "prevpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorprevpagelinkicon")
                ]),
                key: "3"
              }
            : undefined,
          (_ctx.$slots.paginatornextpagelinkicon)
            ? {
                name: "nextpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatornextpagelinkicon")
                ]),
                key: "4"
              }
            : undefined,
          (_ctx.$slots.paginatorlastpagelinkicon)
            ? {
                name: "lastpagelinkicon",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "paginatorlastpagelinkicon")
                ]),
                key: "5"
              }
            : undefined
        ]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "alwaysShow", "pt"]))
      : vue.createCommentVNode("", true),
    (_ctx.$slots.footer)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 4,
          class: "p-treetable-footer"
        }, _ctx.ptm('footer')), [
          vue.renderSlot(_ctx.$slots, "footer")
        ], 16))
      : vue.createCommentVNode("", true),
    vue.createElementVNode("div", vue.mergeProps({
      ref: "resizeHelper",
      class: "p-column-resizer-helper p-highlight",
      style: {"display":"none"}
    }, _ctx.ptm('resizeHelper')), null, 16)
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-treetable {\n    position: relative;\n}\n.p-treetable table {\n    border-collapse: collapse;\n    width: 100%;\n    table-layout: fixed;\n}\n.p-treetable .p-sortable-column {\n    cursor: pointer;\n    user-select: none;\n}\n.p-treetable-responsive-scroll > .p-treetable-wrapper {\n    overflow-x: auto;\n}\n.p-treetable-responsive-scroll > .p-treetable-wrapper > table,\n.p-treetable-auto-layout > .p-treetable-wrapper > table {\n    table-layout: auto;\n}\n.p-treetable-hoverable-rows .p-treetable-tbody > tr {\n    cursor: pointer;\n}\n.p-treetable-toggler {\n    cursor: pointer;\n    user-select: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    vertical-align: middle;\n    overflow: hidden;\n    position: relative;\n}\n.p-treetable-toggler + .p-checkbox {\n    vertical-align: middle;\n}\n.p-treetable-toggler + .p-checkbox + span {\n    vertical-align: middle;\n}\n\n/* Resizable */\n.p-treetable-resizable > .p-treetable-wrapper {\n    overflow-x: auto;\n}\n.p-treetable-resizable .p-treetable-thead > tr > th,\n.p-treetable-resizable .p-treetable-tfoot > tr > td,\n.p-treetable-resizable .p-treetable-tbody > tr > td {\n    overflow: hidden;\n}\n.p-treetable-resizable .p-resizable-column:not(.p-frozen-column) {\n    background-clip: padding-box;\n    position: relative;\n}\n.p-treetable-resizable-fit .p-resizable-column:last-child .p-column-resizer {\n    display: none;\n}\n.p-treetable .p-column-resizer {\n    display: block;\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    margin: 0;\n    width: 0.5rem;\n    height: 100%;\n    padding: 0px;\n    cursor: col-resize;\n    border: 1px solid transparent;\n}\n.p-treetable .p-column-resizer-helper {\n    width: 1px;\n    position: absolute;\n    z-index: 10;\n    display: none;\n}\n.p-treetable .p-treetable-loading-overlay {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 2;\n}\n\n/* Scrollable */\n.p-treetable-scrollable .p-treetable-wrapper {\n    position: relative;\n    overflow: auto;\n}\n.p-treetable-scrollable .p-treetable-table {\n    display: block;\n}\n.p-treetable-scrollable .p-treetable-thead,\n.p-treetable-scrollable .p-treetable-tbody,\n.p-treetable-scrollable .p-treetable-tfoot {\n    display: block;\n}\n.p-treetable-scrollable .p-treetable-thead > tr,\n.p-treetable-scrollable .p-treetable-tbody > tr,\n.p-treetable-scrollable .p-treetable-tfoot > tr {\n    display: flex;\n    flex-wrap: nowrap;\n    width: 100%;\n}\n.p-treetable-scrollable .p-treetable-thead > tr > th,\n.p-treetable-scrollable .p-treetable-tbody > tr > td,\n.p-treetable-scrollable .p-treetable-tfoot > tr > td {\n    display: flex;\n    flex: 1 1 0;\n    align-items: center;\n}\n.p-treetable-scrollable .p-treetable-thead {\n    position: sticky;\n    top: 0;\n    z-index: 1;\n}\n.p-treetable-scrollable .p-treetable-tfoot {\n    position: sticky;\n    bottom: 0;\n    z-index: 1;\n}\n.p-treetable-scrollable .p-frozen-column {\n    position: sticky;\n    background: inherit;\n}\n.p-treetable-scrollable th.p-frozen-column {\n    z-index: 1;\n}\n.p-treetable-scrollable-both .p-treetable-thead > tr > th,\n.p-treetable-scrollable-both .p-treetable-tbody > tr > td,\n.p-treetable-scrollable-both .p-treetable-tfoot > tr > td,\n.p-treetable-scrollable-horizontal .p-treetable-thead > tr > th .p-treetable-scrollable-horizontal .p-treetable-tbody > tr > td,\n.p-treetable-scrollable-horizontal .p-treetable-tfoot > tr > td {\n    flex: 0 0 auto;\n}\n.p-treetable-flex-scrollable {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n.p-treetable-flex-scrollable .p-treetable-wrapper {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    height: 100%;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
