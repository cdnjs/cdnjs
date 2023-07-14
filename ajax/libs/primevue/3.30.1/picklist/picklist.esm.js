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
import { useStyle } from 'primevue/usestyle';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, renderSlot, createVNode, withCtx, normalizeProps, guardReactiveProps, createCommentVNode, createElementVNode, TransitionGroup, Fragment, renderList, withDirectives, createBlock, resolveDynamicComponent } from 'vue';

var styles = "\n.p-picklist {\n    display: flex;\n}\n\n.p-picklist-buttons {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n\n.p-picklist-list-wrapper {\n    flex: 1 1 50%;\n}\n\n.p-picklist-list {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    overflow: auto;\n    min-height: 12rem;\n    max-height: 24rem;\n}\n\n.p-picklist-item {\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-picklist-item.p-picklist-flip-enter-active.p-picklist-flip-enter-to,\n.p-picklist-item.p-picklist-flip-leave-active.p-picklist-flip-leave-to {\n    transition: none !important;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-picklist p-component', {
      'p-picklist-striped': props.stripedRows
    }];
  },
  sourceControls: 'p-picklist-buttons p-picklist-source-controls',
  sourceWrapper: 'p-picklist-list-wrapper p-picklist-source-wrapper',
  sourceHeader: 'p-picklist-header',
  sourceList: 'p-picklist-list p-picklist-source-list',
  buttons: 'p-picklist-buttons p-picklist-transfer-buttons',
  targetWrapper: 'p-picklist-list-wrapper p-picklist-target-wrapper',
  targetHeader: 'p-picklist-header',
  targetList: 'p-picklist-list p-picklist-target',
  item: function item(_ref2) {
    var instance = _ref2.instance,
      _item = _ref2.item,
      id = _ref2.id,
      listIndex = _ref2.listIndex;
    return ['p-picklist-item', {
      'p-highlight': instance.isSelected(_item, listIndex),
      'p-focus': id === instance.focusedOptionId
    }];
  },
  targetControls: 'p-picklist-buttons p-picklist-target-controls'
};
var _useStyle = useStyle(styles, {
    name: 'picklist',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
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
    breakpoint: function breakpoint(newValue) {
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
      var selectedFirstItem = DomHandler.findSingle(this.$refs[listType].$el, '[data-p-highlight="true"]');
      var findIndex = ObjectUtils.findIndexInList(selectedFirstItem, this.$refs[listType].$el.children);
      this.focused[listType] = true;
      var index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;
      this.changeFocusedOptionIndex(index, listType);
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event, listType) {
      this.focused[listType] = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onOptionMouseDown: function onOptionMouseDown(index, listType) {
      this.focused[listType] = true;
      this.focusedOptionIndex = index;
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
      var selectedIndex = ObjectUtils.findIndexInList(item, this.d_selection);
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
          this.onEnterKey(event, listType);
          break;
        case 'Space':
          this.onSpaceKey(event, listType);
          break;
        case 'KeyA':
          if (event.ctrlKey) {
            this.d_selection = _toConsumableArray(this.modelValue);
            this.$emit('update:selection', this.d_selection);
          }
      }
    },
    onArrowDownKey: function onArrowDownKey(event, listType) {
      var optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);
      this.changeFocusedOptionIndex(optionIndex, listType);
      if (event.shiftKey) {
        this.onEnterKey(event, listType);
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event, listType) {
      var optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);
      this.changeFocusedOptionIndex(optionIndex, listType);
      if (event.shiftKey) {
        this.onEnterKey(event, listType);
      }
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event, listType) {
      var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
      var focusedItem = DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=".concat(this.focusedOptionIndex, "]"));
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
        return item === focusedItem;
      });
      var listId = listType === 'sourceList' ? 0 : 1;
      this.onItemClick(event, this.modelValue[listId][matchedOptionIndex], matchedOptionIndex, listId);
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event, listType) {
      event.preventDefault();
      if (event.shiftKey) {
        var listId = listType === 'sourceList' ? 0 : 1;
        var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
        var selectedItemIndex = ObjectUtils.findIndexInList(this.d_selection[listId][0], _toConsumableArray(this.modelValue[listId]));
        var focusedItem = DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=".concat(this.focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
          return item === focusedItem;
        });
        this.d_selection[listId] = _toConsumableArray(this.modelValue[listId]).slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1);
        this.$emit('update:selection', this.d_selection);
      } else {
        this.onEnterKey(event, listType);
      }
    },
    onHomeKey: function onHomeKey(event, listType) {
      if (event.ctrlKey && event.shiftKey) {
        var listId = listType === 'sourceList' ? 0 : 1;
        var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
        var focusedItem = DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=".concat(this.focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
          return item === focusedItem;
        });
        this.d_selection[listId] = _toConsumableArray(this.modelValue[listId]).slice(0, matchedOptionIndex + 1);
        this.$emit('update:selection', this.d_selection);
      } else {
        this.changeFocusedOptionIndex(0, listType);
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event, listType) {
      var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
      if (event.ctrlKey && event.shiftKey) {
        var listId = listType === 'sourceList' ? 0 : 1;
        var focusedItem = DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=".concat(this.focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function (item) {
          return item === focusedItem;
        });
        this.d_selection[listId] = _toConsumableArray(this.modelValue[listId]).slice(matchedOptionIndex, items.length);
        this.$emit('update:selection', this.d_selection);
      } else {
        this.changeFocusedOptionIndex(items.length - 1, listType);
      }
      event.preventDefault();
    },
    findNextOptionIndex: function findNextOptionIndex(index, listType) {
      var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index, listType) {
      var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index, listType) {
      var items = DomHandler.find(this.$refs[listType].$el, '[data-pc-section="item"]');
      var order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = items[order].getAttribute('id');
      this.scrollInView(items[order].getAttribute('id'), listType);
    },
    scrollInView: function scrollInView(id, listType) {
      var element = DomHandler.findSingle(this.$refs[listType].$el, "[data-pc-section=\"item\"][id=\"".concat(id, "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start'
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
        this.$el.setAttribute(this.attributeSelector, '');
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
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
    moveSourceDisabled: function moveSourceDisabled() {
      return ObjectUtils.isEmpty(this.targetList);
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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id", "onClick", "onDblclick", "onMousedown", "aria-selected", "data-p-highlight", "data-p-focused"];
var _hoisted_2 = ["id", "onClick", "onDblclick", "onMousedown", "aria-selected", "data-p-highlight", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleUpIcon = resolveComponent("AngleUpIcon");
  var _component_PLButton = resolveComponent("PLButton");
  var _component_AngleDoubleUpIcon = resolveComponent("AngleDoubleUpIcon");
  var _component_AngleDownIcon = resolveComponent("AngleDownIcon");
  var _component_AngleDoubleDownIcon = resolveComponent("AngleDoubleDownIcon");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root')), [_ctx.showSourceControls ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('sourceControls')
  }, _ctx.ptm('sourceControls')), [renderSlot(_ctx.$slots, "sourcecontrolsstart"), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.moveUp($event, 0);
    }),
    pt: _ctx.ptm('sourceMoveUpButton')
  }, _ctx.moveUpButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [createVNode(_component_AngleUpIcon, normalizeProps(guardReactiveProps(_ctx.ptm('sourceMoveUpButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.moveTop($event, 0);
    }),
    pt: _ctx.ptm('sourceMoveTopButton')
  }, _ctx.moveTopButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [createVNode(_component_AngleDoubleUpIcon, normalizeProps(guardReactiveProps(_ctx.ptm('sourceMoveTopButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.moveDown($event, 0);
    }),
    pt: _ctx.ptm('sourceMoveDownButton')
  }, _ctx.moveDownButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [createVNode(_component_AngleDownIcon, normalizeProps(guardReactiveProps(_ctx.ptm('sourceMoveDownButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(0),
    type: "button",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.moveBottom($event, 0);
    }),
    pt: _ctx.ptm('sourceMoveBottomButton')
  }, _ctx.moveBottomButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [createVNode(_component_AngleDoubleDownIcon, normalizeProps(guardReactiveProps(_ctx.ptm('sourceMoveBottomButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "sourcecontrolsend")], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('sourceWrapper')
  }, _ctx.ptm('sourceWrapper')), [_ctx.$slots.sourceheader ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('sourceHeader')
  }, _ctx.ptm('sourceHeader')), [renderSlot(_ctx.$slots, "sourceheader")], 16)) : createCommentVNode("", true), createVNode(TransitionGroup, mergeProps({
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
  }, _objectSpread(_objectSpread({}, _ctx.sourceListProps), _ctx.ptm('sourceList'))), {
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
            return $options.onOptionMouseDown(i, 'sourceList');
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
  }, _ctx.ptm('buttons')), [renderSlot(_ctx.$slots, "movecontrolsstart"), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveToTargetAriaLabel,
    type: "button",
    onClick: $options.moveToTarget,
    disabled: $options.moveDisabled(0),
    pt: _ctx.ptm('moveToTargetButton')
  }, _ctx.moveToTargetProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetotargeticon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleDownIcon' : 'AngleRightIcon'), normalizeProps(guardReactiveProps(_ctx.ptm('moveToTargetButton')['icon'])), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveAllToTargetAriaLabel,
    type: "button",
    onClick: $options.moveAllToTarget,
    disabled: $options.moveAllDisabled('sourceList'),
    pt: _ctx.ptm('moveAllToTargetButton')
  }, _ctx.moveAllToTargetProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movealltotargeticon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleDoubleDownIcon' : 'AngleDoubleRightIcon'), normalizeProps(guardReactiveProps(_ctx.ptm('moveAllToTargetButton')['icon'])), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveToSourceAriaLabel,
    type: "button",
    onClick: $options.moveToSource,
    disabled: $options.moveDisabled(1),
    pt: _ctx.ptm('moveToSourceButton')
  }, _ctx.moveToSourceProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetosourceicon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleUpIcon' : 'AngleLeftIcon'), normalizeProps(guardReactiveProps(_ctx.ptm('moveToSourceButton')['icon'])), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveAllToSourceAriaLabel,
    type: "button",
    onClick: $options.moveAllToSource,
    disabled: $options.moveSourceDisabled('targetList'),
    pt: _ctx.ptm('moveAllToSourceButton')
  }, _ctx.moveAllToSourceProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movealltosourceicon", {
        viewChanged: $data.viewChanged
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.viewChanged ? 'AngleDoubleUpIcon' : 'AngleDoubleLeftIcon'), normalizeProps(guardReactiveProps(_ctx.ptm('moveAllToSourceButton')['icon'])), null, 16))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "movecontrolsend")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('targetWrapper')
  }, _ctx.ptm('targetWrapper')), [_ctx.$slots.targetheader ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('targetHeader')
  }, _ctx.ptm('targetHeader')), [renderSlot(_ctx.$slots, "targetheader")], 16)) : createCommentVNode("", true), createVNode(TransitionGroup, mergeProps({
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
  }, _objectSpread(_objectSpread({}, _ctx.targetListProps), _ctx.ptm('targetList'))), {
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
            return $options.onOptionMouseDown(i, 'targetList');
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
  }, _ctx.ptm('targetControls')), [renderSlot(_ctx.$slots, "targetcontrolsstart"), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[13] || (_cache[13] = function ($event) {
      return $options.moveUp($event, 1);
    }),
    pt: _ctx.ptm('targetMoveUpButton')
  }, _ctx.moveUpButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "moveupicon", {}, function () {
        return [createVNode(_component_AngleUpIcon, normalizeProps(guardReactiveProps(_ctx.ptm('targetMoveUpButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return $options.moveTop($event, 1);
    }),
    pt: _ctx.ptm('targetMoveTopButton')
  }, _ctx.moveTopButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movetopicon", {}, function () {
        return [createVNode(_component_AngleDoubleUpIcon, normalizeProps(guardReactiveProps(_ctx.ptm('targetMoveTopButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[15] || (_cache[15] = function ($event) {
      return $options.moveDown($event, 1);
    }),
    pt: _ctx.ptm('targetMoveDownButton')
  }, _ctx.moveDownButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movedownicon", {}, function () {
        return [createVNode(_component_AngleDownIcon, normalizeProps(guardReactiveProps(_ctx.ptm('targetMoveDownButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_PLButton, mergeProps({
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(1),
    type: "button",
    onClick: _cache[16] || (_cache[16] = function ($event) {
      return $options.moveBottom($event, 1);
    }),
    pt: _ctx.ptm('targetMoveBottomButton')
  }, _ctx.moveBottomButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "movebottomicon", {}, function () {
        return [createVNode(_component_AngleDoubleDownIcon, normalizeProps(guardReactiveProps(_ctx.ptm('targetMoveBottomButton')['icon'])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "targetcontrolsend")], 16)) : createCommentVNode("", true)], 16);
}

script.render = render;

export { script as default };
