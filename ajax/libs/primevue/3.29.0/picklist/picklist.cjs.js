'use strict';

var BaseComponent = require('primevue/basecomponent');
var Button = require('primevue/button');
var AngleDoubleDownIcon = require('primevue/icons/angledoubledown');
var AngleDoubleLeftIcon = require('primevue/icons/angledoubleleft');
var AngleDoubleRightIcon = require('primevue/icons/angledoubleright');
var AngleDoubleUpIcon = require('primevue/icons/angledoubleup');
var AngleDownIcon = require('primevue/icons/angledown');
var AngleLeftIcon = require('primevue/icons/angleleft');
var AngleRightIcon = require('primevue/icons/angleright');
var AngleUpIcon = require('primevue/icons/angleup');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var AngleDoubleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleDownIcon);
var AngleDoubleLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleLeftIcon);
var AngleDoubleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleRightIcon);
var AngleDoubleUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleUpIcon);
var AngleDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDownIcon);
var AngleLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleLeftIcon);
var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
var AngleUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleUpIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script = {
    name: 'PickList',
    extends: BaseComponent__default["default"],
    emits: ['update:modelValue', 'reorder', 'update:selection', 'selection-change', 'move-to-target', 'move-to-source', 'move-all-to-target', 'move-all-to-source', 'focus', 'blur'],
    props: {
        modelValue: {
            type: Array,
            default: () => [[], []]
        },
        selection: {
            type: Array,
            default: () => [[], []]
        },
        dataKey: {
            type: String,
            default: null
        },
        listStyle: {
            type: null,
            default: null
        },
        metaKeySelection: {
            type: Boolean,
            default: true
        },
        responsive: {
            type: Boolean,
            default: true
        },
        breakpoint: {
            type: String,
            default: '960px'
        },
        stripedRows: {
            type: Boolean,
            default: false
        },
        showSourceControls: {
            type: Boolean,
            default: true
        },
        showTargetControls: {
            type: Boolean,
            default: true
        },
        targetListProps: {
            type: null,
            default: null
        },
        sourceListProps: {
            type: null,
            default: null
        },
        moveUpButtonProps: {
            type: null,
            default: null
        },
        moveTopButtonProps: {
            type: null,
            default: null
        },
        moveDownButtonProps: {
            type: null,
            default: null
        },
        moveBottomButtonProps: {
            type: null,
            default: null
        },
        moveToTargetProps: {
            type: null,
            default: null
        },
        moveAllToTargetProps: {
            type: null,
            default: null
        },
        moveToSourceProps: {
            type: null,
            default: null
        },
        moveAllToSourceProps: {
            type: null,
            default: null
        },
        tabindex: {
            type: Number,
            default: 0
        }
    },
    itemTouched: false,
    reorderDirection: null,
    styleElement: null,
    media: null,
    mediaChangeListener: null,
    data() {
        return {
            id: this.$attrs.id,
            d_selection: this.selection,
            focused: {
                sourceList: false,
                targetList: false
            },
            focusedOptionIndex: -1,
            viewChanged: false
        };
    },
    watch: {
        '$attrs.id': function (newValue) {
            this.id = newValue || utils.UniqueComponentId();
        },
        selection(newValue) {
            this.d_selection = newValue;
        },
        breakpoint(newValue) {
            this.destroyMedia();
            this.initMedia();
        }
    },
    updated() {
        if (this.reorderDirection) {
            this.updateListScroll(this.$refs.sourceList.$el);
            this.updateListScroll(this.$refs.targetList.$el);
            this.reorderDirection = null;
        }
    },
    beforeUnmount() {
        this.destroyStyle();
        this.destroyMedia();
    },
    mounted() {
        this.id = this.id || utils.UniqueComponentId();

        if (this.responsive) {
            this.createStyle();
            this.initMedia();
        }
    },
    methods: {
        getItemKey(item, index) {
            return this.dataKey ? utils.ObjectUtils.resolveFieldData(item, this.dataKey) : index;
        },
        getPTOptions(item, key) {
            return this.ptm(key, {
                context: {
                    active: this.isSelected(item),
                    focused: this.id === this.focusedOptionId
                }
            });
        },
        isSelected(item, listIndex) {
            return utils.ObjectUtils.findIndexInList(item, this.d_selection[listIndex]) != -1;
        },
        onListFocus(event, listType) {
            const selectedFirstItem = utils.DomHandler.findSingle(this.$refs[listType].$el, 'li.p-picklist-item.p-highlight');
            const findIndex = utils.ObjectUtils.findIndexInList(selectedFirstItem, this.$refs[listType].$el.children);

            this.focused[listType] = true;

            const index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;

            this.changeFocusedOptionIndex(index, listType);
            this.$emit('focus', event);
        },
        onListBlur(event, listType) {
            this.focused[listType] = false;
            this.focusedOptionIndex = -1;
            this.$emit('blur', event);
        },
        onOptionMouseDown(index, listType) {
            this.focused[listType] = true;
            this.focusedOptionIndex = index;
        },
        moveUp(event, listIndex) {
            if (this.d_selection && this.d_selection[listIndex]) {
                let valueList = [...this.modelValue[listIndex]];
                let selectionList = this.d_selection[listIndex];

                for (let i = 0; i < selectionList.length; i++) {
                    let selectedItem = selectionList[i];
                    let selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);

                    if (selectedItemIndex !== 0) {
                        let movedItem = valueList[selectedItemIndex];
                        let temp = valueList[selectedItemIndex - 1];

                        valueList[selectedItemIndex - 1] = movedItem;
                        valueList[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                let value = [...this.modelValue];

                value[listIndex] = valueList;

                this.reorderDirection = 'up';
                this.$emit('update:modelValue', value);
                this.$emit('reorder', {
                    originalEvent: event,
                    value: value,
                    direction: this.reorderDirection,
                    listIndex: listIndex
                });
            }
        },
        moveTop(event, listIndex) {
            if (this.d_selection) {
                let valueList = [...this.modelValue[listIndex]];
                let selectionList = this.d_selection[listIndex];

                for (let i = 0; i < selectionList.length; i++) {
                    let selectedItem = selectionList[i];
                    let selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);

                    if (selectedItemIndex !== 0) {
                        let movedItem = valueList.splice(selectedItemIndex, 1)[0];

                        valueList.unshift(movedItem);
                    } else {
                        break;
                    }
                }

                let value = [...this.modelValue];

                value[listIndex] = valueList;

                this.reorderDirection = 'top';
                this.$emit('update:modelValue', value);
                this.$emit('reorder', {
                    originalEvent: event,
                    value: value,
                    direction: this.reorderDirection,
                    listIndex: listIndex
                });
            }
        },
        moveDown(event, listIndex) {
            if (this.d_selection) {
                let valueList = [...this.modelValue[listIndex]];
                let selectionList = this.d_selection[listIndex];

                for (let i = selectionList.length - 1; i >= 0; i--) {
                    let selectedItem = selectionList[i];
                    let selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);

                    if (selectedItemIndex !== valueList.length - 1) {
                        let movedItem = valueList[selectedItemIndex];
                        let temp = valueList[selectedItemIndex + 1];

                        valueList[selectedItemIndex + 1] = movedItem;
                        valueList[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                let value = [...this.modelValue];

                value[listIndex] = valueList;

                this.reorderDirection = 'down';
                this.$emit('update:modelValue', value);
                this.$emit('reorder', {
                    originalEvent: event,
                    value: value,
                    direction: this.reorderDirection,
                    listIndex: listIndex
                });
            }
        },
        moveBottom(event, listIndex) {
            if (this.d_selection) {
                let valueList = [...this.modelValue[listIndex]];
                let selectionList = this.d_selection[listIndex];

                for (let i = selectionList.length - 1; i >= 0; i--) {
                    let selectedItem = selectionList[i];
                    let selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, valueList);

                    if (selectedItemIndex !== valueList.length - 1) {
                        let movedItem = valueList.splice(selectedItemIndex, 1)[0];

                        valueList.push(movedItem);
                    } else {
                        break;
                    }
                }

                let value = [...this.modelValue];

                value[listIndex] = valueList;

                this.reorderDirection = 'bottom';
                this.$emit('update:modelValue', value);
                this.$emit('reorder', {
                    originalEvent: event,
                    value: value,
                    direction: this.reorderDirection,
                    listIndex: listIndex
                });
            }
        },
        moveToTarget(event) {
            let selection = this.d_selection && this.d_selection[0] ? this.d_selection[0] : null;
            let sourceList = [...this.modelValue[0]];
            let targetList = [...this.modelValue[1]];

            if (selection) {
                for (let i = 0; i < selection.length; i++) {
                    let selectedItem = selection[i];

                    if (utils.ObjectUtils.findIndexInList(selectedItem, targetList) == -1) {
                        targetList.push(sourceList.splice(utils.ObjectUtils.findIndexInList(selectedItem, sourceList), 1)[0]);
                    }
                }

                let value = [...this.modelValue];

                value[0] = sourceList;
                value[1] = targetList;
                this.$emit('update:modelValue', value);

                this.$emit('move-to-target', {
                    originalEvent: event,
                    items: selection
                });

                this.d_selection[0] = [];
                this.$emit('update:selection', this.d_selection);
                this.$emit('selection-change', {
                    originalEvent: event,
                    value: this.d_selection
                });
            }
        },
        moveAllToTarget(event) {
            if (this.modelValue[0]) {
                let sourceList = [...this.modelValue[0]];
                let targetList = [...this.modelValue[1]];

                this.$emit('move-all-to-target', {
                    originalEvent: event,
                    items: sourceList
                });

                targetList = [...targetList, ...sourceList];
                sourceList = [];

                let value = [...this.modelValue];

                value[0] = sourceList;
                value[1] = targetList;
                this.$emit('update:modelValue', value);

                this.d_selection[0] = [];
                this.$emit('update:selection', this.d_selection);
                this.$emit('selection-change', {
                    originalEvent: event,
                    value: this.d_selection
                });
            }
        },
        moveToSource(event) {
            let selection = this.d_selection && this.d_selection[1] ? this.d_selection[1] : null;
            let sourceList = [...this.modelValue[0]];
            let targetList = [...this.modelValue[1]];

            if (selection) {
                for (let i = 0; i < selection.length; i++) {
                    let selectedItem = selection[i];

                    if (utils.ObjectUtils.findIndexInList(selectedItem, sourceList) == -1) {
                        sourceList.push(targetList.splice(utils.ObjectUtils.findIndexInList(selectedItem, targetList), 1)[0]);
                    }
                }

                let value = [...this.modelValue];

                value[0] = sourceList;
                value[1] = targetList;
                this.$emit('update:modelValue', value);

                this.$emit('move-to-source', {
                    originalEvent: event,
                    items: selection
                });

                this.d_selection[1] = [];
                this.$emit('update:selection', this.d_selection);
                this.$emit('selection-change', {
                    originalEvent: event,
                    value: this.d_selection
                });
            }
        },
        moveAllToSource(event) {
            if (this.modelValue[1]) {
                let sourceList = [...this.modelValue[0]];
                let targetList = [...this.modelValue[1]];

                this.$emit('move-all-to-source', {
                    originalEvent: event,
                    items: targetList
                });

                sourceList = [...sourceList, ...targetList];
                targetList = [];

                let value = [...this.modelValue];

                value[0] = sourceList;
                value[1] = targetList;
                this.$emit('update:modelValue', value);

                this.d_selection[1] = [];
                this.$emit('update:selection', this.d_selection);
                this.$emit('selection-change', {
                    originalEvent: event,
                    value: this.d_selection
                });
            }
        },
        onItemClick(event, item, index, listIndex) {
            const listType = listIndex === 0 ? 'sourceList' : 'targetList';

            this.itemTouched = false;
            const selectionList = this.d_selection[listIndex];
            const selectedIndex = utils.ObjectUtils.findIndexInList(item, this.d_selection);
            const selected = selectedIndex != -1;
            const metaSelection = this.itemTouched ? false : this.metaKeySelection;
            const selectedId = utils.DomHandler.find(this.$refs[listType].$el, '.p-picklist-item')[index].getAttribute('id');

            this.focusedOptionIndex = selectedId;
            let _selection;

            if (metaSelection) {
                let metaKey = event.metaKey || event.ctrlKey;

                if (selected && metaKey) {
                    _selection = selectionList.filter((val, index) => index !== selectedIndex);
                } else {
                    _selection = metaKey ? (selectionList ? [...selectionList] : []) : [];
                    _selection.push(item);
                }
            } else {
                if (selected) {
                    _selection = selectionList.filter((val, index) => index !== selectedIndex);
                } else {
                    _selection = selectionList ? [...selectionList] : [];
                    _selection.push(item);
                }
            }

            let newSelection = [...this.d_selection];

            newSelection[listIndex] = _selection;
            this.d_selection = newSelection;

            this.$emit('update:selection', this.d_selection);
            this.$emit('selection-change', {
                originalEvent: event,
                value: this.d_selection
            });
        },
        onItemDblClick(event, item, listIndex) {
            if (listIndex === 0) this.moveToTarget(event);
            else if (listIndex === 1) this.moveToSource(event);
        },
        onItemTouchEnd() {
            this.itemTouched = true;
        },
        onItemKeyDown(event, listType) {
            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event, listType);
                    break;

                case 'ArrowUp':
                    this.onArrowUpKey(event, listType);
                    break;

                case 'Home':
                    this.onHomeKey(event, listType);
                    break;

                case 'End':
                    this.onEndKey(event, listType);
                    break;

                case 'Enter':
                    this.onEnterKey(event, listType);
                    break;

                case 'Space':
                    this.onSpaceKey(event, listType);
                    break;

                case 'KeyA':
                    if (event.ctrlKey) {
                        this.d_selection = [...this.modelValue];
                        this.$emit('update:selection', this.d_selection);
                    }
            }
        },
        onArrowDownKey(event, listType) {
            const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);

            this.changeFocusedOptionIndex(optionIndex, listType);

            if (event.shiftKey) {
                this.onEnterKey(event, listType);
            }

            event.preventDefault();
        },
        onArrowUpKey(event, listType) {
            const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);

            this.changeFocusedOptionIndex(optionIndex, listType);

            if (event.shiftKey) {
                this.onEnterKey(event, listType);
            }

            event.preventDefault();
        },
        onEnterKey(event, listType) {
            const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');
            const focusedItem = utils.DomHandler.findSingle(this.$refs[listType].$el, `li.p-picklist-item[id=${this.focusedOptionIndex}]`);
            const matchedOptionIndex = [...items].findIndex((item) => item === focusedItem);
            const listId = listType === 'sourceList' ? 0 : 1;

            this.onItemClick(event, this.modelValue[listId][matchedOptionIndex], matchedOptionIndex, listId);

            event.preventDefault();
        },
        onSpaceKey(event, listType) {
            event.preventDefault();

            if (event.shiftKey) {
                const listId = listType === 'sourceList' ? 0 : 1;
                const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');
                const selectedItemIndex = utils.ObjectUtils.findIndexInList(this.d_selection[listId][0], [...this.modelValue[listId]]);
                const focusedItem = utils.DomHandler.findSingle(this.$refs[listType].$el, `li.p-picklist-item[id=${this.focusedOptionIndex}]`);
                const matchedOptionIndex = [...items].findIndex((item) => item === focusedItem);

                this.d_selection[listId] = [...this.modelValue[listId]].slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1);
                this.$emit('update:selection', this.d_selection);
            } else {
                this.onEnterKey(event, listType);
            }
        },
        onHomeKey(event, listType) {
            if (event.ctrlKey && event.shiftKey) {
                const listId = listType === 'sourceList' ? 0 : 1;
                const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');
                const focusedItem = utils.DomHandler.findSingle(this.$refs[listType].$el, `li.p-picklist-item[id=${this.focusedOptionIndex}]`);
                const matchedOptionIndex = [...items].findIndex((item) => item === focusedItem);

                this.d_selection[listId] = [...this.modelValue[listId]].slice(0, matchedOptionIndex + 1);
                this.$emit('update:selection', this.d_selection);
            } else {
                this.changeFocusedOptionIndex(0, listType);
            }

            event.preventDefault();
        },
        onEndKey(event, listType) {
            const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');

            if (event.ctrlKey && event.shiftKey) {
                const listId = listType === 'sourceList' ? 0 : 1;
                const focusedItem = utils.DomHandler.findSingle(this.$refs[listType].$el, `li.p-picklist-item[id=${this.focusedOptionIndex}]`);
                const matchedOptionIndex = [...items].findIndex((item) => item === focusedItem);

                this.d_selection[listId] = [...this.modelValue[listId]].slice(matchedOptionIndex, items.length);
                this.$emit('update:selection', this.d_selection);
            } else {
                this.changeFocusedOptionIndex(items.length - 1, listType);
            }

            event.preventDefault();
        },
        findNextOptionIndex(index, listType) {
            const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');

            const matchedOptionIndex = [...items].findIndex((link) => link.id === index);

            return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
        },
        findPrevOptionIndex(index, listType) {
            const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');
            const matchedOptionIndex = [...items].findIndex((link) => link.id === index);

            return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
        },
        changeFocusedOptionIndex(index, listType) {
            const items = utils.DomHandler.find(this.$refs[listType].$el, 'li.p-picklist-item');

            let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;

            this.focusedOptionIndex = items[order].getAttribute('id');
            this.scrollInView(items[order].getAttribute('id'), listType);
        },
        scrollInView(id, listType) {
            const element = utils.DomHandler.findSingle(this.$refs[listType].$el, `li[id="${id}"]`);

            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
            }
        },
        updateListScroll(listElement) {
            const listItems = utils.DomHandler.find(listElement, '.p-picklist-item.p-highlight');

            if (listItems && listItems.length) {
                switch (this.reorderDirection) {
                    case 'up':
                        utils.DomHandler.scrollInView(listElement, listItems[0]);
                        break;

                    case 'top':
                        listElement.scrollTop = 0;
                        break;

                    case 'down':
                        utils.DomHandler.scrollInView(listElement, listItems[listItems.length - 1]);
                        break;

                    case 'bottom':
                        listElement.scrollTop = listElement.scrollHeight;
                        break;
                }
            }
        },
        initMedia() {
            this.media = window.matchMedia(`(max-width: ${this.breakpoint})`);
            this.viewChanged = this.media.matches;
            this.bindMediaChangeListener();
        },
        destroyMedia() {
            this.unbindMediaChangeListener();
        },
        bindMediaChangeListener() {
            if (this.media && !this.mediaChangeListener) {
                this.mediaChangeListener = (event) => {
                    this.viewChanged = event.matches;
                };

                this.media.addEventListener('change', this.mediaChangeListener);
            }
        },
        unbindMediaChangeListener() {
            if (this.media && this.mediaChangeListener) {
                this.media.removeEventListener('change', this.mediaChangeListener);
                this.mediaChangeListener = null;
            }
        },
        createStyle() {
            if (!this.styleElement) {
                this.$el.setAttribute(this.attributeSelector, '');
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);

                let innerHTML = `
@media screen and (max-width: ${this.breakpoint}) {
    .p-picklist[${this.attributeSelector}] {
        flex-direction: column;
    }

    .p-picklist[${this.attributeSelector}] .p-picklist-buttons {
        padding: var(--content-padding);
        flex-direction: row;
    }

    .p-picklist[${this.attributeSelector}] .p-picklist-buttons .p-button {
        margin-right: var(--inline-spacing);
        margin-bottom: 0;
    }

    .p-picklist[${this.attributeSelector}] .p-picklist-buttons .p-button:last-child {
        margin-right: 0;
    }
}
`;

                this.styleElement.innerHTML = innerHTML;
            }
        },
        destroyStyle() {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
            }
        },
        moveDisabled(index) {
            if (!this.d_selection[index] || !this.d_selection[index].length) {
                return true;
            }
        },
        moveAllDisabled(list) {
            return utils.ObjectUtils.isEmpty(this[list]);
        },
        moveSourceDisabled() {
            return utils.ObjectUtils.isEmpty(this.targetList);
        },
        itemClass(item, id, listIndex) {
            return ['p-picklist-item', { 'p-highlight': this.isSelected(item, listIndex), 'p-focus': id === this.focusedOptionId }];
        }
    },
    computed: {
        idSource() {
            return `${this.id}_source`;
        },
        idTarget() {
            return `${this.id}_target`;
        },
        focusedOptionId() {
            return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
        },
        containerClass() {
            return [
                'p-picklist p-component',
                {
                    'p-picklist-striped': this.stripedRows
                }
            ];
        },
        sourceList() {
            return this.modelValue && this.modelValue[0] ? this.modelValue[0] : null;
        },
        targetList() {
            return this.modelValue && this.modelValue[1] ? this.modelValue[1] : null;
        },
        attributeSelector() {
            return utils.UniqueComponentId();
        },
        moveUpAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveUp : undefined;
        },
        moveTopAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveTop : undefined;
        },
        moveDownAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveDown : undefined;
        },
        moveBottomAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveBottom : undefined;
        },
        moveToTargetAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveToTarget : undefined;
        },
        moveAllToTargetAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveAllToTarget : undefined;
        },
        moveToSourceAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveToSource : undefined;
        },
        moveAllToSourceAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveAllToSource : undefined;
        }
    },
    components: {
        PLButton: Button__default["default"],
        AngleRightIcon: AngleRightIcon__default["default"],
        AngleLeftIcon: AngleLeftIcon__default["default"],
        AngleDownIcon: AngleDownIcon__default["default"],
        AngleUpIcon: AngleUpIcon__default["default"],
        AngleDoubleRightIcon: AngleDoubleRightIcon__default["default"],
        AngleDoubleLeftIcon: AngleDoubleLeftIcon__default["default"],
        AngleDoubleDownIcon: AngleDoubleDownIcon__default["default"],
        AngleDoubleUpIcon: AngleDoubleUpIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1 = ["id", "onClick", "onDblclick", "onMousedown", "aria-selected"];
const _hoisted_2 = ["id", "onClick", "onDblclick", "onMousedown", "aria-selected"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AngleUpIcon = vue.resolveComponent("AngleUpIcon");
  const _component_PLButton = vue.resolveComponent("PLButton");
  const _component_AngleDoubleUpIcon = vue.resolveComponent("AngleDoubleUpIcon");
  const _component_AngleDownIcon = vue.resolveComponent("AngleDownIcon");
  const _component_AngleDoubleDownIcon = vue.resolveComponent("AngleDoubleDownIcon");
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    ($props.showSourceControls)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 0,
          class: "p-picklist-buttons p-picklist-source-controls"
        }, _ctx.ptm('sourceControls')), [
          vue.renderSlot(_ctx.$slots, "sourcecontrolsstart"),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveUpAriaLabel,
            disabled: $options.moveDisabled(0),
            type: "button",
            onClick: _cache[0] || (_cache[0] = $event => ($options.moveUp($event, 0)))
          }, $props.moveUpButtonProps, {
            pt: _ctx.ptm('sourceMoveUpButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "moveupicon", {}, () => [
                vue.createVNode(_component_AngleUpIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('sourceMoveUpButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveTopAriaLabel,
            disabled: $options.moveDisabled(0),
            type: "button",
            onClick: _cache[1] || (_cache[1] = $event => ($options.moveTop($event, 0)))
          }, $props.moveTopButtonProps, {
            pt: _ctx.ptm('sourceMoveTopButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "movetopicon", {}, () => [
                vue.createVNode(_component_AngleDoubleUpIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('sourceMoveTopButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveDownAriaLabel,
            disabled: $options.moveDisabled(0),
            type: "button",
            onClick: _cache[2] || (_cache[2] = $event => ($options.moveDown($event, 0)))
          }, $props.moveDownButtonProps, {
            pt: _ctx.ptm('sourceMoveDownButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "movedownicon", {}, () => [
                vue.createVNode(_component_AngleDownIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('sourceMoveDownButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveBottomAriaLabel,
            disabled: $options.moveDisabled(0),
            type: "button",
            onClick: _cache[3] || (_cache[3] = $event => ($options.moveBottom($event, 0)))
          }, $props.moveBottomButtonProps, {
            pt: _ctx.ptm('sourceMoveBottomButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "movebottomicon", {}, () => [
                vue.createVNode(_component_AngleDoubleDownIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('sourceMoveBottomButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.renderSlot(_ctx.$slots, "sourcecontrolsend")
        ], 16))
      : vue.createCommentVNode("", true),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-picklist-list-wrapper p-picklist-source-wrapper" }, _ctx.ptm('sourceWrapper')), [
      (_ctx.$slots.sourceheader)
        ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            class: "p-picklist-header"
          }, _ctx.ptm('sourceHeader')), [
            vue.renderSlot(_ctx.$slots, "sourceheader")
          ], 16))
        : vue.createCommentVNode("", true),
      vue.createVNode(vue.TransitionGroup, vue.mergeProps({
        ref: "sourceList",
        id: $options.idSource + '_list',
        name: "p-picklist-flip",
        tag: "ul",
        class: "p-picklist-list p-picklist-source",
        style: $props.listStyle,
        role: "listbox",
        "aria-multiselectable": "true",
        "aria-activedescendant": $data.focused['sourceList'] ? $options.focusedOptionId : undefined,
        tabindex: $options.sourceList && $options.sourceList.length > 0 ? $props.tabindex : -1,
        onFocus: _cache[5] || (_cache[5] = $event => ($options.onListFocus($event, 'sourceList'))),
        onBlur: _cache[6] || (_cache[6] = $event => ($options.onListBlur($event, 'sourceList'))),
        onKeydown: _cache[7] || (_cache[7] = $event => ($options.onItemKeyDown($event, 'sourceList')))
      }, { ...$props.sourceListProps, ..._ctx.ptm('sourceList') }), {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.sourceList, (item, i) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: $options.getItemKey(item, i),
              id: $options.idSource + '_' + i,
              class: $options.itemClass(item, `${$options.idSource}_${i}`, 0),
              onClick: $event => ($options.onItemClick($event, item, i, 0)),
              onDblclick: $event => ($options.onItemDblClick($event, item, 0)),
              onTouchend: _cache[4] || (_cache[4] = (...args) => ($options.onItemTouchEnd && $options.onItemTouchEnd(...args))),
              onMousedown: $event => ($options.onOptionMouseDown(i, 'sourceList')),
              role: "option",
              "aria-selected": $options.isSelected(item, 0)
            }, $options.getPTOptions(item, 'item')), [
              vue.renderSlot(_ctx.$slots, "item", {
                item: item,
                index: i
              })
            ], 16, _hoisted_1)), [
              [_directive_ripple]
            ])
          }), 128))
        ]),
        _: 3
      }, 16, ["id", "style", "aria-activedescendant", "tabindex"])
    ], 16),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-picklist-buttons p-picklist-transfer-buttons" }, _ctx.ptm('buttons')), [
      vue.renderSlot(_ctx.$slots, "movecontrolsstart"),
      vue.createVNode(_component_PLButton, vue.mergeProps({
        "aria-label": $options.moveToTargetAriaLabel,
        type: "button",
        onClick: $options.moveToTarget,
        disabled: $options.moveDisabled(0)
      }, $props.moveToTargetProps, {
        pt: _ctx.ptm('moveToTargetButton')
      }), {
        icon: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "movetotargeticon", { viewChanged: $data.viewChanged }, () => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleDownIcon' : 'AngleRightIcon'), vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('moveToTargetButton')['icon'])), null, 16))
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "onClick", "disabled", "pt"]),
      vue.createVNode(_component_PLButton, vue.mergeProps({
        "aria-label": $options.moveAllToTargetAriaLabel,
        type: "button",
        onClick: $options.moveAllToTarget,
        disabled: $options.moveAllDisabled('sourceList')
      }, $props.moveAllToTargetProps, {
        pt: _ctx.ptm('moveAllToTargetButton')
      }), {
        icon: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "movealltotargeticon", { viewChanged: $data.viewChanged }, () => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleDoubleDownIcon' : 'AngleDoubleRightIcon'), vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('moveAllToTargetButton')['icon'])), null, 16))
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "onClick", "disabled", "pt"]),
      vue.createVNode(_component_PLButton, vue.mergeProps({
        "aria-label": $options.moveToSourceAriaLabel,
        type: "button",
        onClick: $options.moveToSource,
        disabled: $options.moveDisabled(1)
      }, $props.moveToSourceProps, {
        pt: _ctx.ptm('moveToSourceButton')
      }), {
        icon: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "movetosourceicon", { viewChanged: $data.viewChanged }, () => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleUpIcon' : 'AngleLeftIcon'), vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('moveToSourceButton')['icon'])), null, 16))
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "onClick", "disabled", "pt"]),
      vue.createVNode(_component_PLButton, vue.mergeProps({
        "aria-label": $options.moveAllToSourceAriaLabel,
        type: "button",
        onClick: $options.moveAllToSource,
        disabled: $options.moveSourceDisabled('targetList')
      }, $props.moveAllToSourceProps, {
        pt: _ctx.ptm('moveAllToSourceButton')
      }), {
        icon: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "movealltosourceicon", { viewChanged: $data.viewChanged }, () => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.viewChanged ? 'AngleDoubleUpIcon' : 'AngleDoubleLeftIcon'), vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('moveAllToSourceButton')['icon'])), null, 16))
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "onClick", "disabled", "pt"]),
      vue.renderSlot(_ctx.$slots, "movecontrolsend")
    ], 16),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-picklist-list-wrapper p-picklist-target-wrapper" }, _ctx.ptm('targetWrapper')), [
      (_ctx.$slots.targetheader)
        ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            class: "p-picklist-header"
          }, _ctx.ptm('targetHeader')), [
            vue.renderSlot(_ctx.$slots, "targetheader")
          ], 16))
        : vue.createCommentVNode("", true),
      vue.createVNode(vue.TransitionGroup, vue.mergeProps({
        ref: "targetList",
        id: $options.idTarget + '_list',
        name: "p-picklist-flip",
        tag: "ul",
        class: "p-picklist-list p-picklist-target",
        style: $props.listStyle,
        role: "listbox",
        "aria-multiselectable": "true",
        "aria-activedescendant": $data.focused['targetList'] ? $options.focusedOptionId : undefined,
        tabindex: $options.targetList && $options.targetList.length > 0 ? $props.tabindex : -1,
        onFocus: _cache[10] || (_cache[10] = $event => ($options.onListFocus($event, 'targetList'))),
        onBlur: _cache[11] || (_cache[11] = $event => ($options.onListBlur($event, 'targetList'))),
        onKeydown: _cache[12] || (_cache[12] = $event => ($options.onItemKeyDown($event, 'targetList')))
      }, { ...$props.targetListProps, ..._ctx.ptm('targetList') }), {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.targetList, (item, i) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: $options.getItemKey(item, i),
              id: $options.idTarget + '_' + i,
              class: $options.itemClass(item, `${$options.idTarget}_${i}`, 1),
              onClick: $event => ($options.onItemClick($event, item, i, 1)),
              onDblclick: $event => ($options.onItemDblClick($event, item, 1)),
              onKeydown: _cache[8] || (_cache[8] = $event => ($options.onItemKeyDown($event, 'targetList'))),
              onMousedown: $event => ($options.onOptionMouseDown(i, 'targetList')),
              onTouchend: _cache[9] || (_cache[9] = (...args) => ($options.onItemTouchEnd && $options.onItemTouchEnd(...args))),
              role: "option",
              "aria-selected": $options.isSelected(item, 1)
            }, $options.getPTOptions(item, 'item')), [
              vue.renderSlot(_ctx.$slots, "item", {
                item: item,
                index: i
              })
            ], 16, _hoisted_2)), [
              [_directive_ripple]
            ])
          }), 128))
        ]),
        _: 3
      }, 16, ["id", "style", "aria-activedescendant", "tabindex"])
    ], 16),
    ($props.showTargetControls)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 1,
          class: "p-picklist-buttons p-picklist-target-controls"
        }, _ctx.ptm('targetControls')), [
          vue.renderSlot(_ctx.$slots, "targetcontrolsstart"),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveUpAriaLabel,
            disabled: $options.moveDisabled(1),
            type: "button",
            onClick: _cache[13] || (_cache[13] = $event => ($options.moveUp($event, 1)))
          }, $props.moveUpButtonProps, {
            pt: _ctx.ptm('targetMoveUpButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "moveupicon", {}, () => [
                vue.createVNode(_component_AngleUpIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('targetMoveUpButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveTopAriaLabel,
            disabled: $options.moveDisabled(1),
            type: "button",
            onClick: _cache[14] || (_cache[14] = $event => ($options.moveTop($event, 1)))
          }, $props.moveTopButtonProps, {
            pt: _ctx.ptm('targetMoveTopButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "movetopicon", {}, () => [
                vue.createVNode(_component_AngleDoubleUpIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('targetMoveTopButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveDownAriaLabel,
            disabled: $options.moveDisabled(1),
            type: "button",
            onClick: _cache[15] || (_cache[15] = $event => ($options.moveDown($event, 1)))
          }, $props.moveDownButtonProps, {
            pt: _ctx.ptm('targetMoveDownButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "movedownicon", {}, () => [
                vue.createVNode(_component_AngleDownIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('targetMoveDownButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.createVNode(_component_PLButton, vue.mergeProps({
            "aria-label": $options.moveBottomAriaLabel,
            disabled: $options.moveDisabled(1),
            type: "button",
            onClick: _cache[16] || (_cache[16] = $event => ($options.moveBottom($event, 1)))
          }, $props.moveBottomButtonProps, {
            pt: _ctx.ptm('targetMoveBottomButton')
          }), {
            icon: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "movebottomicon", {}, () => [
                vue.createVNode(_component_AngleDoubleDownIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('targetMoveBottomButton')['icon'])), null, 16)
              ])
            ]),
            _: 3
          }, 16, ["aria-label", "disabled", "pt"]),
          vue.renderSlot(_ctx.$slots, "targetcontrolsend")
        ], 16))
      : vue.createCommentVNode("", true)
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

var css_248z = "\n.p-picklist {\n    display: flex;\n}\n.p-picklist-buttons {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n.p-picklist-list-wrapper {\n    flex: 1 1 50%;\n}\n.p-picklist-list {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    overflow: auto;\n    min-height: 12rem;\n    max-height: 24rem;\n}\n.p-picklist-item {\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n.p-picklist-item.p-picklist-flip-enter-active.p-picklist-flip-enter-to,\n.p-picklist-item.p-picklist-flip-leave-active.p-picklist-flip-leave-to {\n    transition: none !important;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
