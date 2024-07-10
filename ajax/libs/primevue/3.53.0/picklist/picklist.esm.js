import Button from 'primevue/button';
import AngleDoubleDownIcon from 'primevue/icons/angledoubledown';
import AngleDoubleLeftIcon from 'primevue/icons/angledoubleleft';
import AngleDoubleRightIcon from 'primevue/icons/angledoubleright';
import AngleDoubleUpIcon from 'primevue/icons/angledoubleup';
import AngleDownIcon from 'primevue/icons/angledown';
import AngleLeftIcon from 'primevue/icons/angleleft';
import AngleRightIcon from 'primevue/icons/angleright';
import AngleUpIcon from 'primevue/icons/angleup';
import Ripple from 'primevue/ripple';
import { UniqueComponentId, ObjectUtils, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import PickListStyle from 'primevue/picklist/style';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, renderSlot, createVNode, withCtx, createCommentVNode, createElementVNode, TransitionGroup, Fragment, renderList, withDirectives, createBlock, resolveDynamicComponent } from 'vue';

var script$1 = {
  name: 'BasePickList',
  "extends": BaseComponent,
  props: {
    modelValue: {
      type: Array,
      "default": function _default() {
        return [[], []];
      }
    },
    selection: {
      type: Array,
      "default": function _default() {
        return [[], []];
      }
    },
    dataKey: {
      type: String,
      "default": null
    },
    listStyle: {
      type: null,
      "default": null
    },
    metaKeySelection: {
      type: Boolean,
      "default": false
    },
    autoOptionFocus: {
      type: Boolean,
      "default": true
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    responsive: {
      type: Boolean,
      "default": true
    },
    breakpoint: {
      type: String,
      "default": '960px'
    },
    stripedRows: {
      type: Boolean,
      "default": false
    },
    showSourceControls: {
      type: Boolean,
      "default": true
    },
    showTargetControls: {
      type: Boolean,
      "default": true
    },
    targetListProps: {
      type: null,
      "default": null
    },
    sourceListProps: {
      type: null,
      "default": null
    },
    moveUpButtonProps: {
      type: null,
      "default": null
    },
    moveTopButtonProps: {
      type: null,
      "default": null
    },
    moveDownButtonProps: {
      type: null,
      "default": null
    },
    moveBottomButtonProps: {
      type: null,
      "default": null
    },
    moveToTargetProps: {
      type: null,
      "default": null
    },
    moveAllToTargetProps: {
      type: null,
      "default": null
    },
    moveToSourceProps: {
      type: null,
      "default": null
    },
    moveAllToSourceProps: {
      type: null,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    }
  },
  style: PickListStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'PickList',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'reorder', 'update:selection', 'selection-change', 'move-to-target', 'move-to-source', 'move-all-to-target', 'move-all-to-source', 'focus', 'blur'],
  itemTouched: false,
  reorderDirection: null,
  styleElement: null,
  media: null,
  mediaChangeListener: null,
  data: function data() {
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
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    selection: function selection(newValue) {
      this.d_selection = newValue;
    },
    breakpoint: function breakpoint() {
      this.destroyMedia();
      this.initMedia();
    }
  },
  updated: function updated() {
    if (this.reorderDirection) {
      this.updateListScroll(this.$refs.sourceList.$el);
      this.updateListScroll(this.$refs.targetList.$el);
      this.reorderDirection = null;
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.destroyStyle();
    this.destroyMedia();
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    if (this.responsive) {
      this.createStyle();
      this.initMedia();
    }
  },
  methods: {
    getItemKey: function getItemKey(item, index) {
      return this.dataKey ? ObjectUtils.resolveFieldData(item, this.dataKey) : index;
    },
    getPTOptions: function getPTOptions(item, key, id, listIndex) {
      return this.ptm(key, {
        context: {
          active: this.isSelected(item, listIndex),
          focused: id === this.focusedOptionId
        }
      });
    },
    isSelected: function isSelected(item, listIndex) {
      return ObjectUtils.findIndexInList(item, this.d_selection[listIndex]) != -1;
    },
    onListFocus: function onListFocus(event, listType) {
      this.focused[listType] = true;
      this.findCurrentFocusedIndex(listType);
      this.scrollInView(this.focusedOptionIndex, listType);
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event, listType) {
      this.focused[listType] = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onOptionMouseDown: function onOptionMouseDown(event, index, listType) {
      this.focused[listType] = true;
      this.focusedOptionIndex = index;
    },
    onOptionMouseMove: function onOptionMouseMove(index, listType) {
      if (this.focusOnHover && this.focused[listType]) {
        this.changeFocusedOptionIndex(index, listType);
      }
    },
    moveUp: function moveUp(event, listIndex) {
      if (this.d_selection && this.d_selection[listIndex]) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = 0; i < selectionList.length; i++) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== 0) {
            var movedItem = valueList[selectedItemIndex];
            var temp = valueList[selectedItemIndex - 1];
            valueList[selectedItemIndex - 1] = movedItem;
            valueList[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
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
    moveTop: function moveTop(event, listIndex) {
      if (this.d_selection) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = 0; i < selectionList.length; i++) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== 0) {
            var movedItem = valueList.splice(selectedItemIndex, 1)[0];
            valueList.unshift(movedItem);
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
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
    moveDown: function moveDown(event, listIndex) {
      if (this.d_selection) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = selectionList.length - 1; i >= 0; i--) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== valueList.length - 1) {
            var movedItem = valueList[selectedItemIndex];
            var temp = valueList[selectedItemIndex + 1];
            valueList[selectedItemIndex + 1] = movedItem;
            valueList[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
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
    moveBottom: function moveBottom(event, listIndex) {
      if (this.d_selection) {
        var valueList = _toConsumableArray(this.modelValue[listIndex]);
        var selectionList = this.d_selection[listIndex];
        for (var i = selectionList.length - 1; i >= 0; i--) {
          var selectedItem = selectionList[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, valueList);
          if (selectedItemIndex !== valueList.length - 1) {
            var movedItem = valueList.splice(selectedItemIndex, 1)[0];
            valueList.push(movedItem);
          } else {
            break;
          }
        }
        var value = _toConsumableArray(this.modelValue);
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
    moveToTarget: function moveToTarget(event) {
      var selection = this.d_selection && this.d_selection[0] ? this.d_selection[0] : null;
      var sourceList = _toConsumableArray(this.modelValue[0]);
      var targetList = _toConsumableArray(this.modelValue[1]);
      if (selection) {
        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];
          if (ObjectUtils.findIndexInList(selectedItem, targetList) == -1) {
            targetList.push(sourceList.splice(ObjectUtils.findIndexInList(selectedItem, sourceList), 1)[0]);
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[0] = sourceList;
        value[1] = targetList;
        this.$emit('update:modelValue', value);
        this.$emit('move-to-target', {
          originalEvent: event,
          items: _toConsumableArray(new Set(selection))
        });
        this.d_selection[0] = [];
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      }
    },
    moveAllToTarget: function moveAllToTarget(event) {
      if (this.modelValue[0]) {
        var sourceList = _toConsumableArray(this.modelValue[0]);
        var targetList = _toConsumableArray(this.modelValue[1]);
        this.$emit('move-all-to-target', {
          originalEvent: event,
          items: sourceList
        });
        targetList = [].concat(_toConsumableArray(targetList), _toConsumableArray(sourceList));
        sourceList = [];
        var value = _toConsumableArray(this.modelValue);
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
    moveToSource: function moveToSource(event) {
      var selection = this.d_selection && this.d_selection[1] ? this.d_selection[1] : null;
      var sourceList = _toConsumableArray(this.modelValue[0]);
      var targetList = _toConsumableArray(this.modelValue[1]);
      if (selection) {
        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];
          if (ObjectUtils.findIndexInList(selectedItem, sourceList) == -1) {
            sourceList.push(targetList.splice(ObjectUtils.findIndexInList(selectedItem, targetList), 1)[0]);
          }
        }
        var value = _toConsumableArray(this.modelValue);
        value[0] = sourceList;
        value[1] = targetList;
        this.$emit('update:modelValue', value);
        this.$emit('move-to-source', {
          originalEvent: event,
          items: _toConsumableArray(new Set(selection))
        });
        this.d_selection[1] = [];
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      }
    },
    moveAllToSource: function moveAllToSource(event) {
      if (this.modelValue[1]) {
        var sourceList = _toConsumableArray(this.modelValue[0]);
        var targetList = _toConsumableArray(this.modelValue[1]);
        this.$emit('move-all-to-source', {
          originalEvent: event,
          items: targetList
        });
        sourceList = [].concat(_toConsumableArray(sourceList), _toConsumableArray(targetList));
        targetList = [];
        var value = _toConsumableArray(this.modelValue);
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
    onItemClick: function onItemClick(event, item, index, listIndex) {
      var listType = listIndex === 0 ? 'sourceList' : 'targetList';
      this.itemTouched = false;
      var selectionList = this.d_selection[listIndex];
      var selectedIndex = ObjectUtils.findIndexInList(item, selectionList);
      var selected = selectedIndex != -1;
      var metaSelection = this.itemTouched ? false : this.metaKeySelection;
      var selectedId = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]')[index].getAttribute('id');
      this.focusedOptionIndex = selectedId;
      var _selection;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected && metaKey) {
          _selection = selectionList.filter(function (val, index) {
            return index !== selectedIndex;
          });
        } else {
          _selection = metaKey ? selectionList ? _toConsumableArray(selectionList) : [] : [];
          _selection.push(item);
        }
      } else {
        if (selected) {
          _selection = selectionList.filter(function (val, index) {
            return index !== selectedIndex;
          });
        } else {
          _selection = selectionList ? _toConsumableArray(selectionList) : [];
          _selection.push(item);
        }
      }
      var newSelection = _toConsumableArray(this.d_selection);
      newSelection[listIndex] = _selection;
      this.d_selection = newSelection;
      this.$emit('update:selection', this.d_selection);
      this.$emit('selection-change', {
        originalEvent: event,
        value: this.d_selection
      });
    },
    onItemDblClick: function onItemDblClick(event, item, listIndex) {
      if (listIndex === 0) this.moveToTarget(event);else if (listIndex === 1) this.moveToSource(event);
    },
    onItemTouchEnd: function onItemTouchEnd() {
      this.itemTouched = true;
    },
    onItemKeyDown: function onItemKeyDown(event, listType) {
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
        case 'NumpadEnter':
          this.onEnterKey(event, listType);
          break;
        case 'Space':
          this.onSpaceKey(event, listType);
          break;
        case 'KeyA':
          if (event.ctrlKey) {
            this.d_selection = _toConsumableArray(this.modelValue);
            this.$emit('update:selection', this.d_selection);
            event.preventDefault();
          }
      }
    },
    onArrowDownKey: function onArrowDownKey(event, listType) {
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(listType) : this.findFirstSelectedOptionIndex(listType);
      this.changeFocusedOptionIndex(optionIndex, listType);
      if (event.shiftKey) {
        this.onEnterKey(event, listType);
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event, listType) {
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(listType) : this.findLastSelectedOptionIndex(listType);
      this.changeFocusedOptionIndex(optionIndex, listType);
      if (event.shiftKey) {
        this.onEnterKey(event, listType);
      }
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event, listType) {
      var listId = listType === 'sourceList' ? 0 : 1;
      var matchedOptionIndex = this.findMatchedOptionIndex(listType);
      this.onItemClick(event, this.modelValue[listId][matchedOptionIndex], matchedOptionIndex, listId);
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event, listType) {
      event.preventDefault();
      if (event.shiftKey && this.d_selection && this.d_selection.length > 0) {
        var listId = listType === 'sourceList' ? 0 : 1;
        var selectedItemIndex = ObjectUtils.findIndexInList(this.d_selection[listId][0], _toConsumableArray(this.modelValue[listId]));
        var matchedOptionIndex = this.findMatchedOptionIndex(listType);
        this.d_selection[listId] = _toConsumableArray(this.modelValue[listId]).slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1);
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      } else {
        this.onEnterKey(event, listType);
      }
    },
    onHomeKey: function onHomeKey(event, listType) {
      if (event.ctrlKey && event.shiftKey) {
        var listId = listType === 'sourceList' ? 0 : 1;
        var matchedOptionIndex = this.findMatchedOptionIndex(listType);
        this.d_selection[listId] = _toConsumableArray(this.modelValue[listId]).slice(0, matchedOptionIndex + 1);
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      } else {
        this.changeFocusedOptionIndex(0, listType);
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event, listType) {
      var items = this.findAllItems(listType);
      if (event.ctrlKey && event.shiftKey) {
        var listId = listType === 'sourceList' ? 0 : 1;
        var matchedOptionIndex = this.findMatchedOptionIndex(listType);
        this.d_selection[listId] = _toConsumableArray(this.modelValue[listId]).slice(matchedOptionIndex, items.length);
        this.$emit('update:selection', this.d_selection);
        this.$emit('selection-change', {
          originalEvent: event,
          value: this.d_selection
        });
      } else {
        this.changeFocusedOptionIndex(items.length - 1, listType);
      }
      event.preventDefault();
    },
    findAllItems: function findAllItems(listType) {
      return DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
    },
    findFocusedItem: function findFocusedItem(listType) {
      return DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=".concat(this.focusedOptionIndex, "]"));
    },
    findCurrentFocusedIndex: function findCurrentFocusedIndex(listType) {
      if (this.focusedOptionIndex === -1) {
        this.focusedOptionIndex = this.findFirstSelectedOptionIndex(listType);
        if (this.autoOptionFocus && this.focusedOptionIndex === -1) {
          this.focusedOptionIndex = this.findFirstFocusedOptionIndex(listType);
        }
      }
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex(listType) {
      var firstFocusableItem = DomHandler.findSingle(this.$refs[listType].$el, '[data-pc-section="item"]');
      return DomHandler.getAttribute(firstFocusableItem, 'id');
    },
    findFirstSelectedOptionIndex: function findFirstSelectedOptionIndex(listType) {
      if (this.hasSelectedOption(listType)) {
        var selectedFirstItem = DomHandler.findSingle(this.$refs[listType].$el, '[data-p-highlight="true"]');
        return DomHandler.getAttribute(selectedFirstItem, 'id');
      }
      return -1;
    },
    findLastSelectedOptionIndex: function findLastSelectedOptionIndex(listType) {
      if (this.hasSelectedOption(listType)) {
        var selectedItems = DomHandler.find(this.$refs[listType].$el, '[data-p-highlight="true"]');
        return ObjectUtils.findIndexInList(selectedItems[selectedItems.length - 1], this.list.children);
      }
      return -1;
    },
    findMatchedOptionIndex: function findMatchedOptionIndex(listType) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.focusedOptionIndex;
      var items = this.findAllItems(listType);
      return _toConsumableArray(items).findIndex(function (link) {
        return link.id === id;
      });
    },
    findNextOptionIndex: function findNextOptionIndex(listType) {
      var matchedOptionIndex = this.findMatchedOptionIndex(listType);
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(listType) {
      var matchedOptionIndex = this.findMatchedOptionIndex(listType);
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index, listType) {
      var items = this.findAllItems(listType);
      var order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = items[order].getAttribute('id');
      this.scrollInView(items[order].getAttribute('id'), listType);
    },
    scrollInView: function scrollInView(id, listType) {
      var element = DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=\"".concat(id, "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start',
          behavior: 'smooth'
        });
      }
    },
    updateListScroll: function updateListScroll(listElement) {
      var listItems = DomHandler.find(listElement, '[data-pc-section="item"][data-p-highlight="true"]');
      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case 'up':
            DomHandler.scrollInView(listElement, listItems[0]);
            break;
          case 'top':
            listElement.scrollTop = 0;
            break;
          case 'down':
            DomHandler.scrollInView(listElement, listItems[listItems.length - 1]);
            break;
          case 'bottom':
            listElement.scrollTop = listElement.scrollHeight;
            break;
        }
      }
    },
    initMedia: function initMedia() {
      this.media = window.matchMedia("(max-width: ".concat(this.breakpoint, ")"));
      this.viewChanged = this.media.matches;
      this.bindMediaChangeListener();
    },
    destroyMedia: function destroyMedia() {
      this.unbindMediaChangeListener();
    },
    bindMediaChangeListener: function bindMediaChangeListener() {
      var _this = this;
      if (this.media && !this.mediaChangeListener) {
        this.mediaChangeListener = function (event) {
          _this.viewChanged = event.matches;
        };
        this.media.addEventListener('change', this.mediaChangeListener);
      }
    },
    unbindMediaChangeListener: function unbindMediaChangeListener() {
      if (this.media && this.mediaChangeListener) {
        this.media.removeEventListener('change', this.mediaChangeListener);
        this.mediaChangeListener = null;
      }
    },
    createStyle: function createStyle() {
      if (!this.styleElement && !this.isUnstyled) {
        var _this$$primevue;
        this.$el.setAttribute(this.attributeSelector, '');
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
        DomHandler.setAttribute(this.styleElement, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
        document.head.appendChild(this.styleElement);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    .p-picklist[").concat(this.attributeSelector, "] {\n        flex-direction: column;\n    }\n\n    .p-picklist[").concat(this.attributeSelector, "] .p-picklist-buttons {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-picklist[").concat(this.attributeSelector, "] .p-picklist-buttons .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-picklist[").concat(this.attributeSelector, "] .p-picklist-buttons .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle: function destroyStyle() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    moveDisabled: function moveDisabled(index) {
      if (!this.d_selection[index] || !this.d_selection[index].length) {
        return true;
      }
    },
    moveAllDisabled: function moveAllDisabled(list) {
      return ObjectUtils.isEmpty(this[list]);
    },
    hasSelectedOption: function hasSelectedOption(listType) {
      return listType === 'sourceList' ? ObjectUtils.isNotEmpty(this.d_selection[0]) : ObjectUtils.isNotEmpty(this.d_selection[1]);
    }
  },
  computed: {
    idSource: function idSource() {
      return "".concat(this.id, "_source");
    },
    idTarget: function idTarget() {
      return "".concat(this.id, "_target");
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    },
    sourceList: function sourceList() {
      return this.modelValue && this.modelValue[0] ? this.modelValue[0] : null;
    },
    targetList: function targetList() {
      return this.modelValue && this.modelValue[1] ? this.modelValue[1] : null;
    },
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    moveUpAriaLabel: function moveUpAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveUp : undefined;
    },
    moveTopAriaLabel: function moveTopAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveTop : undefined;
    },
    moveDownAriaLabel: function moveDownAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveDown : undefined;
    },
    moveBottomAriaLabel: function moveBottomAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveBottom : undefined;
    },
    moveToTargetAriaLabel: function moveToTargetAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveToTarget : undefined;
    },
    moveAllToTargetAriaLabel: function moveAllToTargetAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveAllToTarget : undefined;
    },
    moveToSourceAriaLabel: function moveToSourceAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveToSource : undefined;
    },
    moveAllToSourceAriaLabel: function moveAllToSourceAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveAllToSource : undefined;
    }
  },
  components: {
    PLButton: Button,
    AngleRightIcon: AngleRightIcon,
    AngleLeftIcon: AngleLeftIcon,
    AngleDownIcon: AngleDownIcon,
    AngleUpIcon: AngleUpIcon,
    AngleDoubleRightIcon: AngleDoubleRightIcon,
    AngleDoubleLeftIcon: AngleDoubleLeftIcon,
    AngleDoubleDownIcon: AngleDoubleDownIcon,
    AngleDoubleUpIcon: AngleDoubleUpIcon
  },
  directives: {
    ripple: Ripple
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id", "onClick", "onDblclick", "onMousedown", "onMousemove", "aria-selected", "data-p-highlight", "data-p-focused"];
var _hoisted_2 = ["id", "onClick", "onDblclick", "onMousedown", "onMousemove", "aria-selected", "data-p-highlight", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleUpIcon = resolveComponent("AngleUpIcon");
  var _component_PLButton = resolveComponent("PLButton");
  var _component_AngleDoubleUpIcon = resolveComponent("AngleDoubleUpIcon");
  var _component_AngleDownIcon = resolveComponent("AngleDownIcon");
  var _component_AngleDoubleDownIcon = resolveComponent("AngleDoubleDownIcon");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [_ctx.showSourceControls ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('sourceControls')
  }, _ctx.ptm('sourceControls'), {
    "data-pc-group-section": "controls"
  }), [renderSlot(_ctx.$slots, "sourcecontrolsstart"), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.moveUp($event, 0);
    })
  }, _ctx.moveUpButtonProps, {
    pt: _ctx.ptm('sourceMoveUpButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [createVNode(_component_AngleUpIcon, mergeProps(_ctx.ptm('sourceMoveUpButton')['icon'], {
          "data-pc-section": "moveupicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.moveTop($event, 0);
    })
  }, _ctx.moveTopButtonProps, {
    pt: _ctx.ptm('sourceMoveTopButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [createVNode(_component_AngleDoubleUpIcon, mergeProps(_ctx.ptm('sourceMoveTopButton')['icon'], {
          "data-pc-section": "movetopicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.moveDown($event, 0);
    })
  }, _ctx.moveDownButtonProps, {
    pt: _ctx.ptm('sourceMoveDownButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [createVNode(_component_AngleDownIcon, mergeProps(_ctx.ptm('sourceMoveDownButton')['icon'], {
          "data-pc-section": "movedownicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.moveBottom($event, 0);
    })
  }, _ctx.moveBottomButtonProps, {
    pt: _ctx.ptm('sourceMoveBottomButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [createVNode(_component_AngleDoubleDownIcon, mergeProps(_ctx.ptm('sourceMoveBottomButton')['icon'], {
          "data-pc-section": "movebottomicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "sourcecontrolsend")], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('sourceWrapper')
  }, _ctx.ptm('sourceWrapper'), {
    "data-pc-group-section": "listwrapper"
  }), [_ctx.$slots.sourceheader ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('sourceHeader')
  }, _ctx.ptm('sourceHeader'), {
    "data-pc-group-section": "header"
  }), [renderSlot(_ctx.$slots, "sourceheader")], 16)) : createCommentVNode("", true), createVNode(TransitionGroup, mergeProps({
    ref: "sourceList",
    id: $options.idSource + '_list',
    name: "p-picklist-flip",
    tag: "ul",
    "class": _ctx.cx('sourceList'),
    style: _ctx.listStyle,
    role: "listbox",
    "aria-multiselectable": "true",
    "aria-activedescendant": $data.focused['sourceList'] ? $options.focusedOptionId : undefined,
    tabindex: $options.sourceList && $options.sourceList.length > 0 ? _ctx.tabindex : -1,
    onFocus: _cache[5] || (_cache[5] = function ($event) {
      return $options.onListFocus($event, 'sourceList');
    }),
    onBlur: _cache[6] || (_cache[6] = function ($event) {
      return $options.onListBlur($event, 'sourceList');
    }),
    onKeydown: _cache[7] || (_cache[7] = function ($event) {
      return $options.onItemKeyDown($event, 'sourceList');
    })
  }, _objectSpread(_objectSpread(_objectSpread({}, _ctx.sourceListProps), _ctx.ptm('sourceList')), _ctx.ptm('transition')), {
    "data-pc-group-section": "list"
  }), {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList($options.sourceList, function (item, i) {
        return withDirectives((openBlock(), createElementBlock("li", mergeProps({
          key: $options.getItemKey(item, i),
          id: $options.idSource + '_' + i,
          "class": _ctx.cx('item', {
            item: item,
            id: "".concat($options.idSource, "_").concat(i),
            listIndex: 0
          }),
          onClick: function onClick($event) {
            return $options.onItemClick($event, item, i, 0);
          },
          onDblclick: function onDblclick($event) {
            return $options.onItemDblClick($event, item, 0);
          },
          onTouchend: _cache[4] || (_cache[4] = function () {
            return $options.onItemTouchEnd && $options.onItemTouchEnd.apply($options, arguments);
          }),
          onMousedown: function onMousedown($event) {
            return $options.onOptionMouseDown($event, i, 'sourceList');
          },
          onMousemove: function onMousemove($event) {
            return $options.onOptionMouseMove(i, 'sourceList');
          },
          role: "option",
          "aria-selected": $options.isSelected(item, 0)
        }, $options.getPTOptions(item, 'item', "".concat($options.idSource, "_").concat(i), 0), {
          "data-p-highlight": $options.isSelected(item, 0),
          "data-p-focused": "".concat($options.idSource, "_").concat(i) === $options.focusedOptionId
        }), [renderSlot(_ctx.$slots, "item", {
          item: item,
          index: i
        })], 16, _hoisted_1)), [[_directive_ripple]]);
      }), 128))];
    }),
    _: 3
  }, 16, ["id", "class", "style", "aria-activedescendant", "tabindex"])], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('buttons')
  }, _ctx.ptm('buttons'), {
    "data-pc-group-section": "controls"
  }), [renderSlot(_ctx.$slots, "movecontrolsstart"), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveToTargetAriaLabel,
    type: "button",
    onClick: $options.moveToTarget,
    disabled: $options.moveDisabled(0)
  }, _ctx.moveToTargetProps, {
    pt: _ctx.ptm('moveToTargetButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetotargeticon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleDownIcon' : 'AngleRightIcon'), mergeProps(_ctx.ptm('moveToTargetButton')['icon'], {
          "data-pc-section": "movetotargeticon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveAllToTargetAriaLabel,
    type: "button",
    onClick: $options.moveAllToTarget,
    disabled: $options.moveAllDisabled('sourceList')
  }, _ctx.moveAllToTargetProps, {
    pt: _ctx.ptm('moveAllToTargetButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movealltotargeticon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleDoubleDownIcon' : 'AngleDoubleRightIcon'), mergeProps(_ctx.ptm('moveAllToTargetButton')['icon'], {
          "data-pc-section": "movealltotargeticon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveToSourceAriaLabel,
    type: "button",
    onClick: $options.moveToSource,
    disabled: $options.moveDisabled(1)
  }, _ctx.moveToSourceProps, {
    pt: _ctx.ptm('moveToSourceButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetosourceicon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleUpIcon' : 'AngleLeftIcon'), mergeProps(_ctx.ptm('moveToSourceButton')['icon'], {
          "data-pc-section": "movetosourceicon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveAllToSourceAriaLabel,
    type: "button",
    onClick: $options.moveAllToSource,
    disabled: $options.moveAllDisabled('targetList')
  }, _ctx.moveAllToSourceProps, {
    pt: _ctx.ptm('moveAllToSourceButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movealltosourceicon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleDoubleUpIcon' : 'AngleDoubleLeftIcon'), mergeProps(_ctx.ptm('moveAllToSourceButton')['icon'], {
          "data-pc-section": "movealltosourceicon"
        }), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "movecontrolsend")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('targetWrapper')
  }, _ctx.ptm('targetWrapper'), {
    "data-pc-group-section": "listwrapper"
  }), [_ctx.$slots.targetheader ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('targetHeader')
  }, _ctx.ptm('targetHeader'), {
    "data-pc-group-section": "header"
  }), [renderSlot(_ctx.$slots, "targetheader")], 16)) : createCommentVNode("", true), createVNode(TransitionGroup, mergeProps({
    ref: "targetList",
    id: $options.idTarget + '_list',
    name: "p-picklist-flip",
    tag: "ul",
    "class": _ctx.cx('targetList'),
    style: _ctx.listStyle,
    role: "listbox",
    "aria-multiselectable": "true",
    "aria-activedescendant": $data.focused['targetList'] ? $options.focusedOptionId : undefined,
    tabindex: $options.targetList && $options.targetList.length > 0 ? _ctx.tabindex : -1,
    onFocus: _cache[10] || (_cache[10] = function ($event) {
      return $options.onListFocus($event, 'targetList');
    }),
    onBlur: _cache[11] || (_cache[11] = function ($event) {
      return $options.onListBlur($event, 'targetList');
    }),
    onKeydown: _cache[12] || (_cache[12] = function ($event) {
      return $options.onItemKeyDown($event, 'targetList');
    })
  }, _objectSpread(_objectSpread(_objectSpread({}, _ctx.targetListProps), _ctx.ptm('targetList')), _ctx.ptm('transition')), {
    "data-pc-group-section": "list"
  }), {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList($options.targetList, function (item, i) {
        return withDirectives((openBlock(), createElementBlock("li", mergeProps({
          key: $options.getItemKey(item, i),
          id: $options.idTarget + '_' + i,
          "class": _ctx.cx('item', {
            item: item,
            id: "".concat($options.idTarget, "_").concat(i),
            listIndex: 1
          }),
          onClick: function onClick($event) {
            return $options.onItemClick($event, item, i, 1);
          },
          onDblclick: function onDblclick($event) {
            return $options.onItemDblClick($event, item, 1);
          },
          onKeydown: _cache[8] || (_cache[8] = function ($event) {
            return $options.onItemKeyDown($event, 'targetList');
          }),
          onMousedown: function onMousedown($event) {
            return $options.onOptionMouseDown($event, i, 'targetList');
          },
          onMousemove: function onMousemove($event) {
            return $options.onOptionMouseMove(i, 'targetList');
          },
          onTouchend: _cache[9] || (_cache[9] = function () {
            return $options.onItemTouchEnd && $options.onItemTouchEnd.apply($options, arguments);
          }),
          role: "option",
          "aria-selected": $options.isSelected(item, 1)
        }, $options.getPTOptions(item, 'item', "".concat($options.idTarget, "_").concat(i), 1), {
          "data-p-highlight": $options.isSelected(item, 1),
          "data-p-focused": "".concat($options.idTarget, "_").concat(i) === $options.focusedOptionId
        }), [renderSlot(_ctx.$slots, "item", {
          item: item,
          index: i
        })], 16, _hoisted_2)), [[_directive_ripple]]);
      }), 128))];
    }),
    _: 3
  }, 16, ["id", "class", "style", "aria-activedescendant", "tabindex"])], 16), _ctx.showTargetControls ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('targetControls')
  }, _ctx.ptm('targetControls'), {
    "data-pc-group-section": "controls"
  }), [renderSlot(_ctx.$slots, "targetcontrolsstart"), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[13] || (_cache[13] = function ($event) {
      return $options.moveUp($event, 1);
    })
  }, _ctx.moveUpButtonProps, {
    pt: _ctx.ptm('targetMoveUpButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [createVNode(_component_AngleUpIcon, mergeProps(_ctx.ptm('targetMoveUpButton')['icon'], {
          "data-pc-section": "moveupicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return $options.moveTop($event, 1);
    })
  }, _ctx.moveTopButtonProps, {
    pt: _ctx.ptm('targetMoveTopButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [createVNode(_component_AngleDoubleUpIcon, mergeProps(_ctx.ptm('targetMoveTopButton')['icon'], {
          "data-pc-section": "movetopicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[15] || (_cache[15] = function ($event) {
      return $options.moveDown($event, 1);
    })
  }, _ctx.moveDownButtonProps, {
    pt: _ctx.ptm('targetMoveDownButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [createVNode(_component_AngleDownIcon, mergeProps(_ctx.ptm('targetMoveDownButton')['icon'], {
          "data-pc-section": "movedownicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[16] || (_cache[16] = function ($event) {
      return $options.moveBottom($event, 1);
    })
  }, _ctx.moveBottomButtonProps, {
    pt: _ctx.ptm('targetMoveBottomButton'),
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [createVNode(_component_AngleDoubleDownIcon, mergeProps(_ctx.ptm('targetMoveBottomButton')['icon'], {
          "data-pc-section": "movebottomicon"
        }), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "targetcontrolsend")], 16)) : createCommentVNode("", true)], 16);
}

script.render = render;

export { script as default };
