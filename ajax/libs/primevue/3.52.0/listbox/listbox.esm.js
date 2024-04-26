import { FilterService } from 'primevue/api';
import SearchIcon from 'primevue/icons/search';
import Ripple from 'primevue/ripple';
import { UniqueComponentId, ObjectUtils, DomHandler } from 'primevue/utils';
import VirtualScroller from 'primevue/virtualscroller';
import BaseComponent from 'primevue/basecomponent';
import ListboxStyle from 'primevue/listbox/style';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, withDirectives, vModelText, normalizeClass, createBlock, resolveDynamicComponent, toDisplayString, createCommentVNode, createVNode, createSlots, withCtx, Fragment, renderList, createTextVNode } from 'vue';

var script$1 = {
  name: 'BaseListbox',
  "extends": BaseComponent,
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    listStyle: null,
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    dataKey: null,
    multiple: {
      type: Boolean,
      "default": false
    },
    metaKeySelection: {
      type: Boolean,
      "default": false
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      "default": 'contains'
    },
    filterFields: {
      type: Array,
      "default": null
    },
    filterInputProps: null,
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    autoOptionFocus: {
      type: Boolean,
      "default": true
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    filterMessage: {
      type: String,
      "default": null
    },
    selectionMessage: {
      type: String,
      "default": null
    },
    emptySelectionMessage: {
      type: String,
      "default": null
    },
    emptyFilterMessage: {
      type: String,
      "default": null
    },
    emptyMessage: {
      type: String,
      "default": null
    },
    filterIcon: {
      type: String,
      "default": undefined
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: ListboxStyle,
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
  name: 'Listbox',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'filter'],
  list: null,
  virtualScroller: null,
  optionTouched: false,
  startRangeIndex: -1,
  searchTimeout: null,
  searchValue: '',
  data: function data() {
    return {
      id: this.$attrs.id,
      filterValue: null,
      focused: false,
      focusedOptionIndex: -1
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    options: function options() {
      this.autoUpdateModel();
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    this.autoUpdateModel();
  },
  methods: {
    getOptionIndex: function getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)['index'];
    },
    getOptionLabel: function getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue: function getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey: function getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + '_' + index;
    },
    getPTOptions: function getPTOptions(option, itemOptions, index, key) {
      return this.ptm(key, {
        context: {
          selected: this.isSelected(option),
          focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
          disabled: this.isOptionDisabled(option)
        }
      });
    },
    isOptionDisabled: function isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup: function isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren: function getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset: function getAriaPosInset(index) {
      var _this = this;
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(function (option) {
        return _this.isOptionGroup(option);
      }).length : index) + 1;
    },
    onFirstHiddenFocus: function onFirstHiddenFocus() {
      DomHandler.focus(this.list);
      var firstFocusableEl = DomHandler.getFirstFocusableElement(this.$el, ':not([data-p-hidden-focusable="true"])');
      this.$refs.lastHiddenFocusableElement.tabIndex = DomHandler.isElement(firstFocusableEl) ? undefined : -1;
      this.$refs.firstHiddenFocusableElement.tabIndex = -1;
    },
    onLastHiddenFocus: function onLastHiddenFocus(event) {
      var relatedTarget = event.relatedTarget;
      if (relatedTarget === this.list) {
        var firstFocusableEl = DomHandler.getFirstFocusableElement(this.$el, ':not([data-p-hidden-focusable="true"])');
        DomHandler.focus(firstFocusableEl);
        this.$refs.firstHiddenFocusableElement.tabIndex = undefined;
      } else {
        DomHandler.focus(this.$refs.firstHiddenFocusableElement);
      }
      this.$refs.lastHiddenFocusableElement.tabIndex = -1;
    },
    onFocusout: function onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget) && this.$refs.lastHiddenFocusableElement && this.$refs.firstHiddenFocusableElement) {
        this.$refs.lastHiddenFocusableElement.tabIndex = this.$refs.firstHiddenFocusableElement.tabIndex = undefined;
      }
    },
    onListFocus: function onListFocus(event) {
      this.focused = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
      this.autoUpdateModel();
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = this.startRangeIndex = -1;
      this.searchValue = '';
      this.$emit('blur', event);
    },
    onListKeyDown: function onListKeyDown(event) {
      var _this2 = this;
      var metaKey = event.metaKey || event.ctrlKey;
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onArrowUpKey(event);
          break;
        case 'Home':
          this.onHomeKey(event);
          break;
        case 'End':
          this.onEndKey(event);
          break;
        case 'PageDown':
          this.onPageDownKey(event);
          break;
        case 'PageUp':
          this.onPageUpKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          this.onSpaceKey(event);
          break;
        case 'Tab':
          //NOOP
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.onShiftKey(event);
          break;
        default:
          if (this.multiple && event.code === 'KeyA' && metaKey) {
            var value = this.visibleOptions.filter(function (option) {
              return _this2.isValidOption(option);
            }).map(function (option) {
              return _this2.getOptionValue(option);
            });
            this.updateModel(event, value);
            event.preventDefault();
            break;
          }
          if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
            this.searchOptions(event, event.key);
            event.preventDefault();
          }
          break;
      }
    },
    onOptionSelect: function onOptionSelect(event, option) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (this.disabled || this.isOptionDisabled(option)) {
        return;
      }
      this.multiple ? this.onOptionSelectMultiple(event, option) : this.onOptionSelectSingle(event, option);
      this.optionTouched = false;
      index !== -1 && (this.focusedOptionIndex = index);
    },
    onOptionMouseDown: function onOptionMouseDown(event, index) {
      this.changeFocusedOptionIndex(event, index);
    },
    onOptionMouseMove: function onOptionMouseMove(event, index) {
      if (this.focusOnHover && this.focused) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onOptionTouchEnd: function onOptionTouchEnd() {
      if (this.disabled) {
        return;
      }
      this.optionTouched = true;
    },
    onOptionSelectSingle: function onOptionSelectSingle(event, option) {
      var selected = this.isSelected(option);
      var valueChanged = false;
      var value = null;
      var metaSelection = this.optionTouched ? false : this.metaKeySelection;
      if (metaSelection) {
        var metaKey = event && (event.metaKey || event.ctrlKey);
        if (selected) {
          if (metaKey) {
            value = null;
            valueChanged = true;
          }
        } else {
          value = this.getOptionValue(option);
          valueChanged = true;
        }
      } else {
        value = selected ? null : this.getOptionValue(option);
        valueChanged = true;
      }
      if (valueChanged) {
        this.updateModel(event, value);
      }
    },
    onOptionSelectMultiple: function onOptionSelectMultiple(event, option) {
      var selected = this.isSelected(option);
      var value = null;
      var metaSelection = this.optionTouched ? false : this.metaKeySelection;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected) {
          value = metaKey ? this.removeOption(option) : [this.getOptionValue(option)];
        } else {
          value = metaKey ? this.modelValue || [] : [];
          value = [].concat(_toConsumableArray(value), [this.getOptionValue(option)]);
        }
      } else {
        value = selected ? this.removeOption(option) : [].concat(_toConsumableArray(this.modelValue || []), [this.getOptionValue(option)]);
      }
      this.updateModel(event, value);
    },
    onOptionSelectRange: function onOptionSelectRange(event) {
      var _this3 = this;
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
      end === -1 && (end = this.findNearestSelectedOptionIndex(start));
      if (start !== -1 && end !== -1) {
        var rangeStart = Math.min(start, end);
        var rangeEnd = Math.max(start, end);
        var value = this.visibleOptions.slice(rangeStart, rangeEnd + 1).filter(function (option) {
          return _this3.isValidOption(option);
        }).map(function (option) {
          return _this3.getOptionValue(option);
        });
        this.updateModel(event, value);
      }
    },
    onFilterChange: function onFilterChange(event) {
      this.$emit('filter', {
        originalEvent: event,
        value: event.target.value
      });
      this.focusedOptionIndex = this.startRangeIndex = -1;
    },
    onFilterBlur: function onFilterBlur() {
      this.focusedOptionIndex = this.startRangeIndex = -1;
    },
    onFilterKeyDown: function onFilterKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onArrowUpKey(event);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          this.onArrowLeftKey(event, true);
          break;
        case 'Home':
          this.onHomeKey(event, true);
          break;
        case 'End':
          this.onEndKey(event, true);
          break;
        case 'Enter':
        case 'NumpadEnter':
          this.onEnterKey(event);
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.onShiftKey(event);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      if (this.multiple && event.shiftKey) {
        this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
      if (this.multiple && event.shiftKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      event.preventDefault();
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey: function onHomeKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (pressedInInputText) {
        event.currentTarget.setSelectionRange(0, 0);
        this.focusedOptionIndex = -1;
      } else {
        var metaKey = event.metaKey || event.ctrlKey;
        var optionIndex = this.findFirstOptionIndex();
        if (this.multiple && event.shiftKey && metaKey) {
          this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (pressedInInputText) {
        var target = event.currentTarget;
        var len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex = -1;
      } else {
        var metaKey = event.metaKey || event.ctrlKey;
        var optionIndex = this.findLastOptionIndex();
        if (this.multiple && event.shiftKey && metaKey) {
          this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
      }
      event.preventDefault();
    },
    onPageUpKey: function onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey: function onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (this.focusedOptionIndex !== -1) {
        if (this.multiple && event.shiftKey) this.onOptionSelectRange(event, this.focusedOptionIndex);else this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
      }
    },
    onSpaceKey: function onSpaceKey(event) {
      this.onEnterKey(event);
    },
    onShiftKey: function onShiftKey() {
      this.startRangeIndex = this.focusedOptionIndex;
    },
    isOptionMatched: function isOptionMatched(option) {
      var _this$getOptionLabel;
      return this.isValidOption(option) && ((_this$getOptionLabel = this.getOptionLabel(option)) === null || _this$getOptionLabel === void 0 ? void 0 : _this$getOptionLabel.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)));
    },
    isValidOption: function isValidOption(option) {
      return ObjectUtils.isNotEmpty(option) && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption: function isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isEquals: function isEquals(value1, value2) {
      return ObjectUtils.equals(value1, value2, this.equalityKey);
    },
    isSelected: function isSelected(option) {
      var _this4 = this;
      var optionValue = this.getOptionValue(option);
      if (this.multiple) return (this.modelValue || []).some(function (value) {
        return _this4.isEquals(value, optionValue);
      });else return this.isEquals(this.modelValue, optionValue);
    },
    findFirstOptionIndex: function findFirstOptionIndex() {
      var _this5 = this;
      return this.visibleOptions.findIndex(function (option) {
        return _this5.isValidOption(option);
      });
    },
    findLastOptionIndex: function findLastOptionIndex() {
      var _this6 = this;
      return ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
        return _this6.isValidOption(option);
      });
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var _this7 = this;
      var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
        return _this7.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var _this8 = this;
      var matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
        return _this8.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex: function findSelectedOptionIndex() {
      var _this9 = this;
      if (this.hasSelectedOption) {
        if (this.multiple) {
          var _loop = function _loop() {
              var value = _this9.modelValue[index];
              var matchedOptionIndex = _this9.visibleOptions.findIndex(function (option) {
                return _this9.isValidSelectedOption(option) && _this9.isEquals(value, _this9.getOptionValue(option));
              });
              if (matchedOptionIndex > -1) return {
                v: matchedOptionIndex
              };
            },
            _ret;
          for (var index = this.modelValue.length - 1; index >= 0; index--) {
            _ret = _loop();
            if (_ret) return _ret.v;
          }
        } else {
          return this.visibleOptions.findIndex(function (option) {
            return _this9.isValidSelectedOption(option);
          });
        }
      }
      return -1;
    },
    findFirstSelectedOptionIndex: function findFirstSelectedOptionIndex() {
      var _this10 = this;
      return this.hasSelectedOption ? this.visibleOptions.findIndex(function (option) {
        return _this10.isValidSelectedOption(option);
      }) : -1;
    },
    findLastSelectedOptionIndex: function findLastSelectedOptionIndex() {
      var _this11 = this;
      return this.hasSelectedOption ? ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
        return _this11.isValidSelectedOption(option);
      }) : -1;
    },
    findNextSelectedOptionIndex: function findNextSelectedOptionIndex(index) {
      var _this12 = this;
      var matchedOptionIndex = this.hasSelectedOption && index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
        return _this12.isValidSelectedOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    },
    findPrevSelectedOptionIndex: function findPrevSelectedOptionIndex(index) {
      var _this13 = this;
      var matchedOptionIndex = this.hasSelectedOption && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
        return _this13.isValidSelectedOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    },
    findNearestSelectedOptionIndex: function findNearestSelectedOptionIndex(index) {
      var firstCheckUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var matchedOptionIndex = -1;
      if (this.hasSelectedOption) {
        if (firstCheckUp) {
          matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
          matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
        } else {
          matchedOptionIndex = this.findNextSelectedOptionIndex(index);
          matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
        }
      }
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
      var selectedIndex = this.findFirstSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
      var selectedIndex = this.findLastSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions: function searchOptions(event, _char) {
      var _this14 = this;
      this.searchValue = (this.searchValue || '') + _char;
      var optionIndex = -1;
      if (ObjectUtils.isNotEmpty(this.searchValue)) {
        if (this.focusedOptionIndex !== -1) {
          optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function (option) {
            return _this14.isOptionMatched(option);
          });
          optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function (option) {
            return _this14.isOptionMatched(option);
          }) : optionIndex + this.focusedOptionIndex;
        } else {
          optionIndex = this.visibleOptions.findIndex(function (option) {
            return _this14.isOptionMatched(option);
          });
        }
        if (optionIndex === -1 && this.focusedOptionIndex === -1) {
          optionIndex = this.findFirstFocusedOptionIndex();
        }
        if (optionIndex !== -1) {
          this.changeFocusedOptionIndex(event, optionIndex);
        }
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(function () {
        _this14.searchValue = '';
        _this14.searchTimeout = null;
      }, 500);
    },
    removeOption: function removeOption(option) {
      var _this15 = this;
      return this.modelValue.filter(function (val) {
        return !ObjectUtils.equals(val, _this15.getOptionValue(option), _this15.equalityKey);
      });
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus && !this.multiple) {
          this.onOptionSelect(event, this.visibleOptions[index]);
        }
      }
    },
    scrollInView: function scrollInView() {
      var _this16 = this;
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      this.$nextTick(function () {
        var id = index !== -1 ? "".concat(_this16.id, "_").concat(index) : _this16.focusedOptionId;
        var element = DomHandler.findSingle(_this16.list, "li[id=\"".concat(id, "\"]"));
        if (element) {
          element.scrollIntoView && element.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
            behavior: 'smooth'
          });
        } else if (!_this16.virtualScrollerDisabled) {
          _this16.virtualScroller && _this16.virtualScroller.scrollToIndex(index !== -1 ? index : _this16.focusedOptionIndex);
        }
      });
    },
    autoUpdateModel: function autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption && !this.multiple && this.focused) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex]);
      }
    },
    updateModel: function updateModel(event, value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', {
        originalEvent: event,
        value: value
      });
    },
    flatOptions: function flatOptions(options) {
      var _this17 = this;
      return (options || []).reduce(function (result, option, index) {
        result.push({
          optionGroup: option,
          group: true,
          index: index
        });
        var optionGroupChildren = _this17.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach(function (o) {
          return result.push(o);
        });
        return result;
      }, []);
    },
    listRef: function listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el); // For VirtualScroller
    },
    virtualScrollerRef: function virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    visibleOptions: function visibleOptions() {
      var options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      return this.filterValue ? FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale) : options;
    },
    hasSelectedOption: function hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    equalityKey: function equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields: function searchFields() {
      return this.filterFields || [this.optionLabel];
    },
    filterResultMessageText: function filterResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText: function filterMessageText() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || '';
    },
    emptyFilterMessageText: function emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || '';
    },
    emptyMessageText: function emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || '';
    },
    selectionMessageText: function selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || '';
    },
    emptySelectionMessageText: function emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || '';
    },
    selectedMessageText: function selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', this.multiple ? this.modelValue.length : '1') : this.emptySelectionMessageText;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    ariaSetSize: function ariaSetSize() {
      var _this18 = this;
      return this.visibleOptions.filter(function (option) {
        return !_this18.isOptionGroup(option);
      }).length;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    VirtualScroller: VirtualScroller,
    SearchIcon: SearchIcon
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id"];
var _hoisted_2 = ["tabindex"];
var _hoisted_3 = ["placeholder", "aria-owns", "aria-activedescendant", "tabindex"];
var _hoisted_4 = ["id", "aria-multiselectable", "aria-label", "aria-labelledby", "aria-activedescendant", "aria-disabled"];
var _hoisted_5 = ["id"];
var _hoisted_6 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousedown", "onMousemove", "data-p-highlight", "data-p-focused", "data-p-disabled"];
var _hoisted_7 = ["tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_VirtualScroller = resolveComponent("VirtualScroller");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    id: $data.id,
    "class": _ctx.cx('root'),
    onFocusout: _cache[10] || (_cache[10] = function () {
      return $options.onFocusout && $options.onFocusout.apply($options, arguments);
    })
  }, _ctx.ptmi('root')), [createElementVNode("span", mergeProps({
    ref: "firstHiddenFocusableElement",
    role: "presentation",
    "aria-hidden": "true",
    "class": "p-hidden-accessible p-hidden-focusable",
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    onFocus: _cache[0] || (_cache[0] = function () {
      return $options.onFirstHiddenFocus && $options.onFirstHiddenFocus.apply($options, arguments);
    })
  }, _ctx.ptm('hiddenFirstFocusableEl'), {
    "data-p-hidden-accessible": true,
    "data-p-hidden-focusable": true
  }), null, 16, _hoisted_2), renderSlot(_ctx.$slots, "header", {
    value: _ctx.modelValue,
    options: $options.visibleOptions
  }), _ctx.filter ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('filterContainer')
  }, _ctx.ptm('filterContainer')), [withDirectives(createElementVNode("input", mergeProps({
    ref: "filterInput",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.filterValue = $event;
    }),
    type: "text",
    "class": _ctx.cx('filterInput'),
    placeholder: _ctx.filterPlaceholder,
    role: "searchbox",
    autocomplete: "off",
    "aria-owns": $data.id + '_list',
    "aria-activedescendant": $options.focusedOptionId,
    tabindex: !_ctx.disabled && !$data.focused ? _ctx.tabindex : -1,
    onInput: _cache[2] || (_cache[2] = function () {
      return $options.onFilterChange && $options.onFilterChange.apply($options, arguments);
    }),
    onBlur: _cache[3] || (_cache[3] = function () {
      return $options.onFilterBlur && $options.onFilterBlur.apply($options, arguments);
    }),
    onKeydown: _cache[4] || (_cache[4] = function () {
      return $options.onFilterKeyDown && $options.onFilterKeyDown.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.filterInputProps), _ctx.ptm('filterInput'))), null, 16, _hoisted_3), [[vModelText, $data.filterValue]]), renderSlot(_ctx.$slots, "filtericon", {
    "class": normalizeClass(_ctx.cx('filterIcon'))
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.filterIcon ? 'span' : 'SearchIcon'), mergeProps({
      "class": [_ctx.cx('filterIcon'), _ctx.filterIcon]
    }, _ctx.ptm('filterIcon')), null, 16, ["class"]))];
  })], 16), createElementVNode("span", mergeProps({
    role: "status",
    "aria-live": "polite",
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenFilterResult'), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.filterResultMessageText), 17)], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    ref: "listWrapper",
    "class": _ctx.cx('wrapper'),
    style: _ctx.listStyle
  }, _ctx.ptm('wrapper')), [createVNode(_component_VirtualScroller, mergeProps({
    ref: $options.virtualScrollerRef
  }, _ctx.virtualScrollerOptions, {
    style: _ctx.listStyle,
    items: $options.visibleOptions,
    tabindex: -1,
    disabled: $options.virtualScrollerDisabled,
    pt: _ctx.ptm('virtualScroller')
  }), createSlots({
    content: withCtx(function (_ref) {
      var styleClass = _ref.styleClass,
        contentRef = _ref.contentRef,
        items = _ref.items,
        getItemOptions = _ref.getItemOptions,
        contentStyle = _ref.contentStyle,
        itemSize = _ref.itemSize;
      return [createElementVNode("ul", mergeProps({
        ref: function ref(el) {
          return $options.listRef(el, contentRef);
        },
        id: $data.id + '_list',
        "class": [_ctx.cx('list'), styleClass],
        style: contentStyle,
        tabindex: -1,
        role: "listbox",
        "aria-multiselectable": _ctx.multiple,
        "aria-label": _ctx.ariaLabel,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        "aria-disabled": _ctx.disabled,
        onFocus: _cache[6] || (_cache[6] = function () {
          return $options.onListFocus && $options.onListFocus.apply($options, arguments);
        }),
        onBlur: _cache[7] || (_cache[7] = function () {
          return $options.onListBlur && $options.onListBlur.apply($options, arguments);
        }),
        onKeydown: _cache[8] || (_cache[8] = function () {
          return $options.onListKeyDown && $options.onListKeyDown.apply($options, arguments);
        })
      }, _ctx.ptm('list')), [(openBlock(true), createElementBlock(Fragment, null, renderList(items, function (option, i) {
        return openBlock(), createElementBlock(Fragment, {
          key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
        }, [$options.isOptionGroup(option) ? (openBlock(), createElementBlock("li", mergeProps({
          key: 0,
          id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
          style: {
            height: itemSize ? itemSize + 'px' : undefined
          },
          "class": _ctx.cx('itemGroup'),
          role: "option"
        }, _ctx.ptm('itemGroup')), [renderSlot(_ctx.$slots, "optiongroup", {
          option: option.optionGroup,
          index: $options.getOptionIndex(i, getItemOptions)
        }, function () {
          return [createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)];
        })], 16, _hoisted_5)) : withDirectives((openBlock(), createElementBlock("li", mergeProps({
          key: 1,
          id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
          style: {
            height: itemSize ? itemSize + 'px' : undefined
          },
          "class": _ctx.cx('item', {
            option: option,
            index: i,
            getItemOptions: getItemOptions
          }),
          role: "option",
          "aria-label": $options.getOptionLabel(option),
          "aria-selected": $options.isSelected(option),
          "aria-disabled": $options.isOptionDisabled(option),
          "aria-setsize": $options.ariaSetSize,
          "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
          onClick: function onClick($event) {
            return $options.onOptionSelect($event, option, $options.getOptionIndex(i, getItemOptions));
          },
          onMousedown: function onMousedown($event) {
            return $options.onOptionMouseDown($event, $options.getOptionIndex(i, getItemOptions));
          },
          onMousemove: function onMousemove($event) {
            return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
          },
          onTouchend: _cache[5] || (_cache[5] = function ($event) {
            return $options.onOptionTouchEnd();
          })
        }, $options.getPTOptions(option, getItemOptions, i, 'item'), {
          "data-p-highlight": $options.isSelected(option),
          "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
          "data-p-disabled": $options.isOptionDisabled(option)
        }), [renderSlot(_ctx.$slots, "option", {
          option: option,
          index: $options.getOptionIndex(i, getItemOptions)
        }, function () {
          return [createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)];
        })], 16, _hoisted_6)), [[_directive_ripple]])], 64);
      }), 128)), $data.filterValue && (!items || items && items.length === 0) ? (openBlock(), createElementBlock("li", mergeProps({
        key: 0,
        "class": _ctx.cx('emptyMessage'),
        role: "option"
      }, _ctx.ptm('emptyMessage')), [renderSlot(_ctx.$slots, "emptyfilter", {}, function () {
        return [createTextVNode(toDisplayString($options.emptyFilterMessageText), 1)];
      })], 16)) : !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (openBlock(), createElementBlock("li", mergeProps({
        key: 1,
        "class": _ctx.cx('emptyMessage'),
        role: "option"
      }, _ctx.ptm('emptyMessage')), [renderSlot(_ctx.$slots, "empty", {}, function () {
        return [createTextVNode(toDisplayString($options.emptyMessageText), 1)];
      })], 16)) : createCommentVNode("", true)], 16, _hoisted_4)];
    }),
    _: 2
  }, [_ctx.$slots.loader ? {
    name: "loader",
    fn: withCtx(function (_ref2) {
      var options = _ref2.options;
      return [renderSlot(_ctx.$slots, "loader", {
        options: options
      })];
    }),
    key: "0"
  } : undefined]), 1040, ["style", "items", "disabled", "pt"])], 16), renderSlot(_ctx.$slots, "footer", {
    value: _ctx.modelValue,
    options: $options.visibleOptions
  }), !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    role: "status",
    "aria-live": "polite",
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenEmptyMessage'), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.emptyMessageText), 17)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
    role: "status",
    "aria-live": "polite",
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenSelectedMessage'), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.selectedMessageText), 17), createElementVNode("span", mergeProps({
    ref: "lastHiddenFocusableElement",
    role: "presentation",
    "aria-hidden": "true",
    "class": "p-hidden-accessible p-hidden-focusable",
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    onFocus: _cache[9] || (_cache[9] = function () {
      return $options.onLastHiddenFocus && $options.onLastHiddenFocus.apply($options, arguments);
    })
  }, _ctx.ptm('hiddenLastFocusableEl'), {
    "data-p-hidden-accessible": true,
    "data-p-hidden-focusable": true
  }), null, 16, _hoisted_7)], 16, _hoisted_1);
}

script.render = render;

export { script as default };
