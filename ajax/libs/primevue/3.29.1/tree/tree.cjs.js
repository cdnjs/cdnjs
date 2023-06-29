'use strict';

var BaseComponent = require('primevue/basecomponent');
var SearchIcon = require('primevue/icons/search');
var SpinnerIcon = require('primevue/icons/spinner');
var utils = require('primevue/utils');
var CheckIcon = require('primevue/icons/check');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var MinusIcon = require('primevue/icons/minus');
var Ripple = require('primevue/ripple');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var SearchIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchIcon);
var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$1 = {
    name: 'TreeNode',
    extends: BaseComponent__default["default"],
    emits: ['node-toggle', 'node-click', 'checkbox-change'],
    props: {
        node: {
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
        templates: {
            type: null,
            default: null
        },
        level: {
            type: Number,
            default: null
        },
        index: {
            type: Number,
            default: null
        }
    },
    nodeTouched: false,
    toggleClicked: false,
    mounted() {
        const hasTreeSelectParent = this.$refs.currentNode.closest('.p-treeselect-items-wrapper');

        if (hasTreeSelectParent) {
            this.setAllNodesTabIndexes();
        }
    },
    methods: {
        toggle() {
            this.$emit('node-toggle', this.node);
            this.toggleClicked = true;
        },
        label(node) {
            return typeof node.label === 'function' ? node.label() : node.label;
        },
        onChildNodeToggle(node) {
            this.$emit('node-toggle', node);
        },
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    expanded: this.expanded,
                    selected: this.selected,
                    checked: this.checked
                }
            });
        },
        onClick(event) {
            if (this.toggleClicked || utils.DomHandler.hasClass(event.target, 'p-tree-toggler') || utils.DomHandler.hasClass(event.target.parentElement, 'p-tree-toggler')) {
                this.toggleClicked = false;

                return;
            }

            if (this.isCheckboxSelectionMode()) {
                this.toggleCheckbox();
            } else {
                this.$emit('node-click', {
                    originalEvent: event,
                    nodeTouched: this.nodeTouched,
                    node: this.node
                });
            }

            this.nodeTouched = false;
        },
        onChildNodeClick(event) {
            this.$emit('node-click', event);
        },
        onTouchEnd() {
            this.nodeTouched = true;
        },
        onKeyDown(event) {
            if (!this.isSameNode(event)) return;

            switch (event.code) {
                case 'Tab':
                    this.onTabKey(event);

                    break;

                case 'ArrowDown':
                    this.onArrowDown(event);

                    break;

                case 'ArrowUp':
                    this.onArrowUp(event);

                    break;

                case 'ArrowRight':
                    this.onArrowRight(event);

                    break;

                case 'ArrowLeft':
                    this.onArrowLeft(event);

                    break;

                case 'Enter':
                case 'Space':
                    this.onEnterKey(event);

                    break;
            }
        },
        onArrowDown(event) {
            const nodeElement = event.target;
            const listElement = nodeElement.children[1];

            if (listElement) {
                this.focusRowChange(nodeElement, listElement.children[0]);
            } else {
                if (nodeElement.nextElementSibling) {
                    this.focusRowChange(nodeElement, nodeElement.nextElementSibling);
                } else {
                    let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);

                    if (nextSiblingAncestor) {
                        this.focusRowChange(nodeElement, nextSiblingAncestor);
                    }
                }
            }

            event.preventDefault();
        },
        onArrowUp(event) {
            const nodeElement = event.target;

            if (nodeElement.previousElementSibling) {
                this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
            } else {
                let parentNodeElement = this.getParentNodeElement(nodeElement);

                if (parentNodeElement) {
                    this.focusRowChange(nodeElement, parentNodeElement);
                }
            }

            event.preventDefault();
        },
        onArrowRight(event) {
            if (this.leaf || this.expanded) return;

            event.currentTarget.tabIndex = -1;

            this.$emit('node-toggle', this.node);
            this.$nextTick(() => {
                this.onArrowDown(event);
            });
        },
        onArrowLeft(event) {
            const togglerElement = utils.DomHandler.findSingle(event.currentTarget, '.p-tree-toggler');

            if (this.level === 0 && !this.expanded) {
                return false;
            }

            if (this.expanded && !this.leaf) {
                togglerElement.click();

                return false;
            }

            const target = this.findBeforeClickableNode(event.currentTarget);

            if (target) {
                this.focusRowChange(event.currentTarget, target);
            }
        },
        onEnterKey(event) {
            this.setTabIndexForSelectionMode(event, this.nodeTouched);
            this.onClick(event);

            event.preventDefault();
        },
        onTabKey() {
            this.setAllNodesTabIndexes();
        },
        setAllNodesTabIndexes() {
            const nodes = utils.DomHandler.find(this.$refs.currentNode.closest('.p-tree-container'), '.p-treenode');

            const hasSelectedNode = [...nodes].some((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');

            [...nodes].forEach((node) => {
                node.tabIndex = -1;
            });

            if (hasSelectedNode) {
                const selectedNodes = [...nodes].filter((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');

                selectedNodes[0].tabIndex = 0;

                return;
            }

            [...nodes][0].tabIndex = 0;
        },
        setTabIndexForSelectionMode(event, nodeTouched) {
            if (this.selectionMode !== null) {
                const elements = [...utils.DomHandler.find(this.$refs.currentNode.parentElement, '.p-treenode')];

                event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;

                if (elements.every((element) => element.tabIndex === -1)) {
                    elements[0].tabIndex = 0;
                }
            }
        },
        focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
            firstFocusableRow.tabIndex = '-1';
            currentFocusedRow.tabIndex = '0';

            this.focusNode(lastVisibleDescendant || currentFocusedRow);
        },
        findBeforeClickableNode(node) {
            const parentListElement = node.closest('ul').closest('li');

            if (parentListElement) {
                const prevNodeButton = utils.DomHandler.findSingle(parentListElement, 'button');

                if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
                    return parentListElement;
                }

                return this.findBeforeClickableNode(node.previousElementSibling);
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
                else delete _selectionKeys[this.node.key];
            }

            this.$emit('checkbox-change', {
                node: event.node,
                check: event.check,
                selectionKeys: _selectionKeys
            });
        },
        onChildCheckboxChange(event) {
            this.$emit('checkbox-change', event);
        },
        findNextSiblingOfAncestor(nodeElement) {
            let parentNodeElement = this.getParentNodeElement(nodeElement);

            if (parentNodeElement) {
                if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;
                else return this.findNextSiblingOfAncestor(parentNodeElement);
            } else {
                return null;
            }
        },
        findLastVisibleDescendant(nodeElement) {
            const childrenListElement = nodeElement.children[1];

            if (childrenListElement) {
                const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];

                return this.findLastVisibleDescendant(lastChildElement);
            } else {
                return nodeElement;
            }
        },
        getParentNodeElement(nodeElement) {
            const parentNodeElement = nodeElement.parentElement.parentElement;

            return utils.DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
        },
        focusNode(element) {
            element.focus();
        },
        isCheckboxSelectionMode() {
            return this.selectionMode === 'checkbox';
        },
        isSameNode(event) {
            return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('.p-treenode')));
        }
    },
    computed: {
        hasChildren() {
            return this.node.children && this.node.children.length > 0;
        },
        expanded() {
            return this.expandedKeys && this.expandedKeys[this.node.key] === true;
        },
        leaf() {
            return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
        },
        selectable() {
            return this.node.selectable === false ? false : this.selectionMode != null;
        },
        selected() {
            return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.node.key] === true : false;
        },
        containerClass() {
            return ['p-treenode', { 'p-treenode-leaf': this.leaf }];
        },
        contentClass() {
            return [
                'p-treenode-content',
                this.node.styleClass,
                {
                    'p-treenode-selectable': this.selectable,
                    'p-highlight': this.checkboxMode ? this.checked : this.selected
                }
            ];
        },
        icon() {
            return ['p-treenode-icon', this.node.icon];
        },
        checkboxClass() {
            return ['p-checkbox-box', { 'p-highlight': this.checked, 'p-indeterminate': this.partialChecked }];
        },
        checkboxMode() {
            return this.selectionMode === 'checkbox' && this.node.selectable !== false;
        },
        checked() {
            return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].checked : false;
        },
        partialChecked() {
            return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].partialChecked : false;
        },
        ariaChecked() {
            return this.selectionMode === 'single' || this.selectionMode === 'multiple' ? this.selected : undefined;
        },
        ariaSelected() {
            return this.checkboxMode ? this.checked : undefined;
        }
    },
    components: {
        ChevronDownIcon: ChevronDownIcon__default["default"],
        ChevronRightIcon: ChevronRightIcon__default["default"],
        CheckIcon: CheckIcon__default["default"],
        MinusIcon: MinusIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1$1 = ["aria-label", "aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-level", "aria-checked", "tabindex"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TreeNode = vue.resolveComponent("TreeNode", true);
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
    ref: "currentNode",
    class: $options.containerClass,
    role: "treeitem",
    "aria-label": $options.label($props.node),
    "aria-selected": $options.ariaSelected,
    "aria-expanded": $options.expanded,
    "aria-setsize": $props.node.children ? $props.node.children.length : 0,
    "aria-posinset": $props.index + 1,
    "aria-level": $props.level,
    "aria-checked": $options.ariaChecked,
    tabindex: $props.index === 0 ? 0 : -1,
    onKeydown: _cache[3] || (_cache[3] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
  }, $options.getPTOptions('node')), [
    vue.createElementVNode("div", vue.mergeProps({
      class: $options.contentClass,
      onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
      onTouchend: _cache[2] || (_cache[2] = (...args) => ($options.onTouchEnd && $options.onTouchEnd(...args))),
      style: $props.node.style
    }, $options.getPTOptions('content')), [
      vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        type: "button",
        class: "p-tree-toggler p-link",
        onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggle && $options.toggle(...args))),
        tabindex: "-1",
        "aria-hidden": "true"
      }, $options.getPTOptions('toggler')), [
        ($props.templates['togglericon'])
          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['togglericon']), {
              key: 0,
              node: $props.node,
              expanded: $options.expanded,
              class: "p-tree-toggler-icon"
            }, null, 8, ["node", "expanded"]))
          : ($options.expanded)
            ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.node.expandedIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
                key: 1,
                class: "p-tree-toggler-icon"
              }, $options.getPTOptions('togglerIcon')), null, 16))
            : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.node.collapsedIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
                key: 2,
                class: "p-tree-toggler-icon"
              }, $options.getPTOptions('togglerIcon')), null, 16))
      ], 16)), [
        [_directive_ripple]
      ]),
      ($options.checkboxMode)
        ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            class: "p-checkbox p-component",
            "aria-hidden": "true"
          }, $options.getPTOptions('checkboxContainer')), [
            vue.createElementVNode("div", vue.mergeProps({
              class: $options.checkboxClass,
              role: "checkbox"
            }, $options.getPTOptions('checkbox')), [
              ($props.templates['checkboxicon'])
                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['checkboxicon']), {
                    key: 0,
                    checked: $options.checked,
                    partialChecked: $options.partialChecked,
                    class: "p-checkbox-icon"
                  }, null, 8, ["checked", "partialChecked"]))
                : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.checked ? 'CheckIcon' : $options.partialChecked ? 'MinusIcon' : null), vue.mergeProps({
                    key: 1,
                    class: "p-checkbox-icon"
                  }, $options.getPTOptions('checkboxIcon')), null, 16))
            ], 16)
          ], 16))
        : vue.createCommentVNode("", true),
      vue.createElementVNode("span", vue.mergeProps({ class: $options.icon }, $options.getPTOptions('nodeIcon')), null, 16),
      vue.createElementVNode("span", vue.mergeProps({ class: "p-treenode-label" }, $options.getPTOptions('label')), [
        ($props.templates[$props.node.type] || $props.templates['default'])
          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates[$props.node.type] || $props.templates['default']), {
              key: 0,
              node: $props.node
            }, null, 8, ["node"]))
          : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createTextVNode(vue.toDisplayString($options.label($props.node)), 1)
            ], 64))
      ], 16)
    ], 16),
    ($options.hasChildren && $options.expanded)
      ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
          key: 0,
          class: "p-treenode-children",
          role: "group"
        }, _ctx.ptm('subgroup')), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.node.children, (childNode) => {
            return (vue.openBlock(), vue.createBlock(_component_TreeNode, {
              key: childNode.key,
              node: childNode,
              templates: $props.templates,
              level: $props.level + 1,
              expandedKeys: $props.expandedKeys,
              onNodeToggle: $options.onChildNodeToggle,
              onNodeClick: $options.onChildNodeClick,
              selectionMode: $props.selectionMode,
              selectionKeys: $props.selectionKeys,
              onCheckboxChange: $options.propagateUp,
              pt: _ctx.pt
            }, null, 8, ["node", "templates", "level", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "pt"]))
          }), 128))
        ], 16))
      : vue.createCommentVNode("", true)
  ], 16, _hoisted_1$1))
}

script$1.render = render$1;

var script = {
    name: 'Tree',
    extends: BaseComponent__default["default"],
    emits: ['node-expand', 'node-collapse', 'update:expandedKeys', 'update:selectionKeys', 'node-select', 'node-unselect'],
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
        loading: {
            type: Boolean,
            default: false
        },
        loadingIcon: {
            type: String,
            default: undefined
        },
        filter: {
            type: Boolean,
            default: false
        },
        filterBy: {
            type: String,
            default: 'label'
        },
        filterMode: {
            type: String,
            default: 'lenient'
        },
        filterPlaceholder: {
            type: String,
            default: null
        },
        filterLocale: {
            type: String,
            default: undefined
        },
        scrollHeight: {
            type: String,
            default: null
        },
        level: {
            type: Number,
            default: 0
        },
        'aria-labelledby': {
            type: String,
            default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    data() {
        return {
            d_expandedKeys: this.expandedKeys || {},
            filterValue: null
        };
    },
    watch: {
        expandedKeys(newValue) {
            this.d_expandedKeys = newValue;
        }
    },
    methods: {
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
            if (this.selectionMode != null && event.node.selectable !== false) {
                const metaSelection = event.nodeTouched ? false : this.metaKeySelection;
                const _selectionKeys = metaSelection ? this.handleSelectionWithMetaKey(event) : this.handleSelectionWithoutMetaKey(event);

                this.$emit('update:selectionKeys', _selectionKeys);
            }
        },
        onCheckboxChange(event) {
            this.$emit('update:selectionKeys', event.selectionKeys);

            if (event.check) this.$emit('node-select', event.node);
            else this.$emit('node-unselect', event.node);
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
        isSingleSelectionMode() {
            return this.selectionMode === 'single';
        },
        isMultipleSelectionMode() {
            return this.selectionMode === 'multiple';
        },
        isNodeSelected(node) {
            return this.selectionMode && this.selectionKeys ? this.selectionKeys[node.key] === true : false;
        },
        isChecked(node) {
            return this.selectionKeys ? this.selectionKeys[node.key] && this.selectionKeys[node.key].checked : false;
        },
        isNodeLeaf(node) {
            return node.leaf === false ? false : !(node.children && node.children.length);
        },
        onFilterKeydown(event) {
            if (event.which === 13) {
                event.preventDefault();
            }
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
        isFilterMatched(node, { searchFields, filterText, strict }) {
            let matched = false;

            for (let field of searchFields) {
                let fieldValue = String(utils.ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(this.filterLocale);

                if (fieldValue.indexOf(filterText) > -1) {
                    matched = true;
                }
            }

            if (!matched || (strict && !this.isNodeLeaf(node))) {
                matched = this.findFilteredNodes(node, { searchFields, filterText, strict }) || matched;
            }

            return matched;
        }
    },
    computed: {
        containerClass() {
            return [
                'p-tree p-component',
                {
                    'p-tree-selectable': this.selectionMode != null,
                    'p-tree-loading': this.loading,
                    'p-tree-flex-scrollable': this.scrollHeight === 'flex'
                }
            ];
        },
        filteredValue() {
            let filteredNodes = [];
            const searchFields = this.filterBy.split(',');
            const filterText = this.filterValue.trim().toLocaleLowerCase(this.filterLocale);
            const strict = this.filterMode === 'strict';

            for (let node of this.value) {
                let _node = { ...node };
                let paramsWithoutNode = { searchFields, filterText, strict };

                if (
                    (strict && (this.findFilteredNodes(_node, paramsWithoutNode) || this.isFilterMatched(_node, paramsWithoutNode))) ||
                    (!strict && (this.isFilterMatched(_node, paramsWithoutNode) || this.findFilteredNodes(_node, paramsWithoutNode)))
                ) {
                    filteredNodes.push(_node);
                }
            }

            return filteredNodes;
        },
        valueToRender() {
            if (this.filterValue && this.filterValue.trim().length > 0) return this.filteredValue;
            else return this.value;
        }
    },
    components: {
        TreeNode: script$1,
        SearchIcon: SearchIcon__default["default"],
        SpinnerIcon: SpinnerIcon__default["default"]
    }
};

const _hoisted_1 = ["placeholder"];
const _hoisted_2 = ["aria-labelledby", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
  const _component_SearchIcon = vue.resolveComponent("SearchIcon");
  const _component_TreeNode = vue.resolveComponent("TreeNode");

  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    ($props.loading)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 0,
          class: "p-tree-loading-overlay p-component-overlay"
        }, _ctx.ptm('loadingOverlay')), [
          vue.renderSlot(_ctx.$slots, "loadingicon", {}, () => [
            ($props.loadingIcon)
              ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
                  key: 0,
                  class: ['p-tree-loading-icon pi-spin', $props.loadingIcon]
                }, _ctx.ptm('loadingIcon')), null, 16))
              : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
                  key: 1,
                  spin: "",
                  class: "p-tree-loading-icon"
                }, _ctx.ptm('loadingIcon')), null, 16))
          ])
        ], 16))
      : vue.createCommentVNode("", true),
    ($props.filter)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 1,
          class: "p-tree-filter-container"
        }, _ctx.ptm('filterContainer')), [
          vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.filterValue) = $event)),
            type: "text",
            autocomplete: "off",
            class: "p-tree-filter p-inputtext p-component",
            placeholder: $props.filterPlaceholder,
            onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onFilterKeydown && $options.onFilterKeydown(...args)))
          }, _ctx.ptm('input')), null, 16, _hoisted_1), [
            [vue.vModelText, $data.filterValue]
          ]),
          vue.renderSlot(_ctx.$slots, "searchicon", {}, () => [
            vue.createVNode(_component_SearchIcon, vue.mergeProps({ class: "p-tree-filter-icon" }, _ctx.ptm('searchIcon')), null, 16)
          ])
        ], 16))
      : vue.createCommentVNode("", true),
    vue.createElementVNode("div", vue.mergeProps({
      class: "p-tree-wrapper",
      style: { maxHeight: $props.scrollHeight }
    }, _ctx.ptm('wrapper')), [
      vue.createElementVNode("ul", vue.mergeProps({
        class: "p-tree-container",
        role: "tree",
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel
      }, _ctx.ptm('container')), [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.valueToRender, (node, index) => {
          return (vue.openBlock(), vue.createBlock(_component_TreeNode, {
            key: node.key,
            node: node,
            templates: _ctx.$slots,
            level: $props.level + 1,
            index: index,
            expandedKeys: $data.d_expandedKeys,
            onNodeToggle: $options.onNodeToggle,
            onNodeClick: $options.onNodeClick,
            selectionMode: $props.selectionMode,
            selectionKeys: $props.selectionKeys,
            onCheckboxChange: $options.onCheckboxChange,
            pt: _ctx.pt
          }, null, 8, ["node", "templates", "level", "index", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "pt"]))
        }), 128))
      ], 16, _hoisted_2)
    ], 16)
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

var css_248z = "\n.p-tree-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    overflow: auto;\n}\n.p-treenode-children {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-tree-wrapper {\n    overflow: auto;\n}\n.p-treenode-selectable {\n    cursor: pointer;\n    user-select: none;\n}\n.p-tree-toggler {\n    cursor: pointer;\n    user-select: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    flex-shrink: 0;\n}\n.p-treenode-leaf > .p-treenode-content .p-tree-toggler {\n    visibility: hidden;\n}\n.p-treenode-content {\n    display: flex;\n    align-items: center;\n}\n.p-tree-filter {\n    width: 100%;\n}\n.p-tree-filter-container {\n    position: relative;\n    display: block;\n    width: 100%;\n}\n.p-tree-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-tree-loading {\n    position: relative;\n    min-height: 4rem;\n}\n.p-tree .p-tree-loading-overlay {\n    position: absolute;\n    z-index: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-tree-flex-scrollable {\n    display: flex;\n    flex: 1;\n    height: 100%;\n    flex-direction: column;\n}\n.p-tree-flex-scrollable .p-tree-wrapper {\n    flex: 1;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
