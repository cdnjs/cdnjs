import { FilterService } from 'primevue/api';
import Checkbox from 'primevue/checkbox';
import CheckIcon from 'primevue/icons/check';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import SearchIcon from 'primevue/icons/search';
import SpinnerIcon from 'primevue/icons/spinner';
import TimesIcon from 'primevue/icons/times';
import TimesCircleIcon from 'primevue/icons/timescircle';
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import { UniqueComponentId, ZIndexUtils, ObjectUtils, DomHandler, ConnectedOverlayScrollHandler } from 'primevue/utils';
import VirtualScroller from 'primevue/virtualscroller';
import BaseComponent from 'primevue/basecomponent';
import MultiSelectStyle from 'primevue/multiselect/style';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, Fragment, createTextVNode, toDisplayString, renderList, normalizeClass, withModifiers, createBlock, createCommentVNode, resolveDynamicComponent, createVNode, withCtx, Transition, withDirectives, createSlots, normalizeProps, guardReactiveProps } from 'vue';

var script$1 = {
  name: 'BaseMultiSelect',
  "extends": BaseComponent,
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      "default": '200px'
    },
    placeholder: String,
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: Boolean,
    inputId: {
      type: String,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelClass: {
      type: String,
      "default": null
    },
    panelStyle: {
      type: null,
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    filterInputProps: {
      type: null,
      "default": null
    },
    closeButtonProps: {
      type: null,
      "default": null
    },
    dataKey: null,
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
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    display: {
      type: String,
      "default": 'comma'
    },
    selectedItemsLabel: {
      type: String,
      "default": '{0} items selected'
    },
    maxSelectedLabels: {
      type: Number,
      "default": null
    },
    selectionLimit: {
      type: Number,
      "default": null
    },
    showToggleAll: {
      type: Boolean,
      "default": true
    },
    loading: {
      type: Boolean,
      "default": false
    },
    checkboxIcon: {
      type: String,
      "default": undefined
    },
    closeIcon: {
      type: String,
      "default": undefined
    },
    dropdownIcon: {
      type: String,
      "default": undefined
    },
    filterIcon: {
      type: String,
      "default": undefined
    },
    loadingIcon: {
      type: String,
      "default": undefined
    },
    removeTokenIcon: {
      type: String,
      "default": undefined
    },
    selectAll: {
      type: Boolean,
      "default": null
    },
    resetFilterOnHide: {
      type: Boolean,
      "default": false
    },
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    autoOptionFocus: {
      type: Boolean,
      "default": false
    },
    autoFilterFocus: {
      type: Boolean,
      "default": false
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    highlightOnSelect: {
      type: Boolean,
      "default": false
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
  style: MultiSelectStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
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
  name: 'MultiSelect',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'before-show', 'before-hide', 'show', 'hide', 'filter', 'selectall-change'],
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  startRangeIndex: -1,
  searchTimeout: null,
  searchValue: '',
  selectOnFocus: false,
  data: function data() {
    return {
      id: this.$attrs.id,
      clicked: false,
      focused: false,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: false
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
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
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
    getOptionRenderKey: function getOptionRenderKey(option) {
      return this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
    },
    getHeaderCheckboxPTOptions: function getHeaderCheckboxPTOptions(key) {
      return this.ptm(key, {
        context: {
          selected: this.allSelected
        }
      });
    },
    getCheckboxPTOptions: function getCheckboxPTOptions(option, itemOptions, index, key) {
      return this.ptm(key, {
        context: {
          selected: this.isSelected(option),
          focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
          disabled: this.isOptionDisabled(option)
        }
      });
    },
    isOptionDisabled: function isOptionDisabled(option) {
      if (this.maxSelectionLimitReached && !this.isSelected(option)) {
        return true;
      }
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
    show: function show(isFocus) {
      this.$emit('before-show');
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    hide: function hide(isFocus) {
      var _this2 = this;
      var _hide = function _hide() {
        _this2.$emit('before-hide');
        _this2.overlayVisible = false;
        _this2.clicked = false;
        _this2.focusedOptionIndex = -1;
        _this2.searchValue = '';
        _this2.resetFilterOnHide && (_this2.filterValue = null);
        isFocus && DomHandler.focus(_this2.$refs.focusInput);
      };
      setTimeout(function () {
        _hide();
      }, 0); // For ScreenReaders
    },
    onFocus: function onFocus(event) {
      if (this.disabled) {
        // For ScreenReaders
        return;
      }
      this.focused = true;
      if (this.overlayVisible) {
        this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
        this.scrollInView(this.focusedOptionIndex);
      }
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.clicked = false;
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.searchValue = '';
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      var _this3 = this;
      if (this.disabled) {
        event.preventDefault();
        return;
      }
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
          this.onEnterKey(event);
          break;
        case 'Escape':
          this.onEscapeKey(event);
          break;
        case 'Tab':
          this.onTabKey(event);
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.onShiftKey(event);
          break;
        default:
          if (event.code === 'KeyA' && metaKey) {
            var value = this.visibleOptions.filter(function (option) {
              return _this3.isValidOption(option);
            }).map(function (option) {
              return _this3.getOptionValue(option);
            });
            this.updateModel(event, value);
            event.preventDefault();
            break;
          }
          if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
            !this.overlayVisible && this.show();
            this.searchOptions(event);
            event.preventDefault();
          }
          break;
      }
      this.clicked = false;
    },
    onContainerClick: function onContainerClick(event) {
      if (this.disabled || this.loading) {
        return;
      }
      if (!this.overlay || !this.overlay.contains(event.target)) {
        this.overlayVisible ? this.hide(true) : this.show(true);
      }
      this.clicked = true;
    },
    onFirstHiddenFocus: function onFirstHiddenFocus(event) {
      var focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getFirstFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onLastHiddenFocus: function onLastHiddenFocus(event) {
      var focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getLastFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onCloseClick: function onCloseClick() {
      this.hide(true);
    },
    onOptionSelect: function onOptionSelect(event, option) {
      var _this4 = this;
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var isFocus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (this.disabled || this.isOptionDisabled(option)) {
        return;
      }
      var selected = this.isSelected(option);
      var value = null;
      if (selected) value = this.modelValue.filter(function (val) {
        return !ObjectUtils.equals(val, _this4.getOptionValue(option), _this4.equalityKey);
      });else value = [].concat(_toConsumableArray(this.modelValue || []), [this.getOptionValue(option)]);
      this.updateModel(event, value);
      index !== -1 && (this.focusedOptionIndex = index);
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    onOptionMouseMove: function onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onOptionSelectRange: function onOptionSelectRange(event) {
      var _this5 = this;
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
      end === -1 && (end = this.findNearestSelectedOptionIndex(start));
      if (start !== -1 && end !== -1) {
        var rangeStart = Math.min(start, end);
        var rangeEnd = Math.max(start, end);
        var value = this.visibleOptions.slice(rangeStart, rangeEnd + 1).filter(function (option) {
          return _this5.isValidOption(option);
        }).map(function (option) {
          return _this5.getOptionValue(option);
        });
        this.updateModel(event, value);
      }
    },
    onFilterChange: function onFilterChange(event) {
      var value = event.target.value;
      this.filterValue = value;
      this.focusedOptionIndex = -1;
      this.$emit('filter', {
        originalEvent: event,
        value: value
      });
      !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown: function onFilterKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onArrowUpKey(event, true);
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
        case 'Escape':
          this.onEscapeKey(event);
          break;
        case 'Tab':
          this.onTabKey(event, true);
          break;
      }
    },
    onFilterBlur: function onFilterBlur() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated: function onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay();
      }
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown: function onOverlayKeyDown(event) {
      switch (event.code) {
        case 'Escape':
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      if (!this.overlayVisible) {
        this.show();
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
        if (event.shiftKey) {
          this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (event.altKey && !pressedInInputText) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
        if (event.shiftKey) {
          this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey: function onHomeKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var currentTarget = event.currentTarget;
      if (pressedInInputText) {
        var len = currentTarget.value.length;
        currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
        this.focusedOptionIndex = -1;
      } else {
        var metaKey = event.metaKey || event.ctrlKey;
        var optionIndex = this.findFirstOptionIndex();
        if (event.shiftKey && metaKey) {
          this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var currentTarget = event.currentTarget;
      if (pressedInInputText) {
        var len = currentTarget.value.length;
        currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
        this.focusedOptionIndex = -1;
      } else {
        var metaKey = event.metaKey || event.ctrlKey;
        var optionIndex = this.findLastOptionIndex();
        if (event.shiftKey && metaKey) {
          this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
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
      if (!this.overlayVisible) {
        this.focusedOptionIndex = -1; // reset
        this.onArrowDownKey(event);
      } else {
        if (this.focusedOptionIndex !== -1) {
          if (event.shiftKey) this.onOptionSelectRange(event, this.focusedOptionIndex);else this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
      }
      event.preventDefault();
    },
    onEscapeKey: function onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey: function onTabKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          DomHandler.focus(event.shiftKey ? this.$refs.lastHiddenFocusableElementOnOverlay : this.$refs.firstHiddenFocusableElementOnOverlay);
          event.preventDefault();
        } else {
          if (this.focusedOptionIndex !== -1) {
            this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
          }
          this.overlayVisible && this.hide(this.filter);
        }
      }
    },
    onShiftKey: function onShiftKey() {
      this.startRangeIndex = this.focusedOptionIndex;
    },
    onOverlayEnter: function onOverlayEnter(el) {
      ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      this.scrollInView();
      this.autoFilterFocus && DomHandler.focus(this.$refs.filterInput);
    },
    onOverlayAfterEnter: function onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit('show');
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit('hide');
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === 'self') {
        DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + 'px';
        DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this6 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this6.overlayVisible && _this6.isOutsideClicked(event)) {
            _this6.hide();
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this7 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, function () {
          if (_this7.overlayVisible) {
            _this7.hide();
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
      var _this8 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this8.overlayVisible && !DomHandler.isTouchDevice()) {
            _this8.hide();
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
    },
    isOutsideClicked: function isOutsideClicked(event) {
      return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
    },
    getLabelByValue: function getLabelByValue(value) {
      var _this9 = this;
      var options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      var matchedOption = options.find(function (option) {
        return !_this9.isOptionGroup(option) && ObjectUtils.equals(_this9.getOptionValue(option), value, _this9.equalityKey);
      });
      return matchedOption ? this.getOptionLabel(matchedOption) : null;
    },
    getSelectedItemsLabel: function getSelectedItemsLabel() {
      var pattern = /{(.*?)}/;
      var selectedItemsLabel = this.selectedItemsLabel || this.$primevue.config.locale.selectionMessage;
      if (pattern.test(selectedItemsLabel)) {
        return selectedItemsLabel.replace(selectedItemsLabel.match(pattern)[0], this.modelValue.length + '');
      }
      return selectedItemsLabel;
    },
    onToggleAll: function onToggleAll(event) {
      var _this10 = this;
      if (this.selectAll !== null) {
        this.$emit('selectall-change', {
          originalEvent: event,
          checked: !this.allSelected
        });
      } else {
        var value = this.allSelected ? [] : this.visibleOptions.filter(function (option) {
          return _this10.isValidOption(option);
        }).map(function (option) {
          return _this10.getOptionValue(option);
        });
        this.updateModel(event, value);
      }
    },
    removeOption: function removeOption(event, optionValue) {
      var _this11 = this;
      var value = this.modelValue.filter(function (val) {
        return !ObjectUtils.equals(val, optionValue, _this11.equalityKey);
      });
      this.updateModel(event, value);
    },
    clearFilter: function clearFilter() {
      this.filterValue = null;
    },
    hasFocusableElements: function hasFocusableElements() {
      return DomHandler.getFocusableElements(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
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
      var _this12 = this;
      var optionValue = this.getOptionValue(option);
      return (this.modelValue || []).some(function (value) {
        return _this12.isEquals(value, optionValue);
      });
    },
    findFirstOptionIndex: function findFirstOptionIndex() {
      var _this13 = this;
      return this.visibleOptions.findIndex(function (option) {
        return _this13.isValidOption(option);
      });
    },
    findLastOptionIndex: function findLastOptionIndex() {
      var _this14 = this;
      return ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
        return _this14.isValidOption(option);
      });
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var _this15 = this;
      var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
        return _this15.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var _this16 = this;
      var matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
        return _this16.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex: function findSelectedOptionIndex() {
      var _this17 = this;
      if (this.hasSelectedOption) {
        var _loop = function _loop() {
            var value = _this17.modelValue[index];
            var matchedOptionIndex = _this17.visibleOptions.findIndex(function (option) {
              return _this17.isValidSelectedOption(option) && _this17.isEquals(value, _this17.getOptionValue(option));
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
      }
      return -1;
    },
    findFirstSelectedOptionIndex: function findFirstSelectedOptionIndex() {
      var _this18 = this;
      return this.hasSelectedOption ? this.visibleOptions.findIndex(function (option) {
        return _this18.isValidSelectedOption(option);
      }) : -1;
    },
    findLastSelectedOptionIndex: function findLastSelectedOptionIndex() {
      var _this19 = this;
      return this.hasSelectedOption ? ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
        return _this19.isValidSelectedOption(option);
      }) : -1;
    },
    findNextSelectedOptionIndex: function findNextSelectedOptionIndex(index) {
      var _this20 = this;
      var matchedOptionIndex = this.hasSelectedOption && index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
        return _this20.isValidSelectedOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    },
    findPrevSelectedOptionIndex: function findPrevSelectedOptionIndex(index) {
      var _this21 = this;
      var matchedOptionIndex = this.hasSelectedOption && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
        return _this21.isValidSelectedOption(option);
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
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions: function searchOptions(event) {
      var _this22 = this;
      this.searchValue = (this.searchValue || '') + event.key;
      var optionIndex = -1;
      if (ObjectUtils.isNotEmpty(this.searchValue)) {
        if (this.focusedOptionIndex !== -1) {
          optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function (option) {
            return _this22.isOptionMatched(option);
          });
          optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function (option) {
            return _this22.isOptionMatched(option);
          }) : optionIndex + this.focusedOptionIndex;
        } else {
          optionIndex = this.visibleOptions.findIndex(function (option) {
            return _this22.isOptionMatched(option);
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
        _this22.searchValue = '';
        _this22.searchTimeout = null;
      }, 500);
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus) {
          this.onOptionSelect(event, this.visibleOptions[index]);
        }
      }
    },
    scrollInView: function scrollInView() {
      var _this23 = this;
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      this.$nextTick(function () {
        var id = index !== -1 ? "".concat(_this23.id, "_").concat(index) : _this23.focusedOptionId;
        var element = DomHandler.findSingle(_this23.list, "li[id=\"".concat(id, "\"]"));
        if (element) {
          element.scrollIntoView && element.scrollIntoView({
            block: 'nearest',
            inline: 'nearest'
          });
        } else if (!_this23.virtualScrollerDisabled) {
          _this23.virtualScroller && _this23.virtualScroller.scrollToIndex(index !== -1 ? index : _this23.focusedOptionIndex);
        }
      });
    },
    autoUpdateModel: function autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        var value = this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);
        this.updateModel(null, [value]);
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
      var _this24 = this;
      return (options || []).reduce(function (result, option, index) {
        result.push({
          optionGroup: option,
          group: true,
          index: index
        });
        var optionGroupChildren = _this24.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach(function (o) {
          return result.push(o);
        });
        return result;
      }, []);
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
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
      var _this25 = this;
      var options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      if (this.filterValue) {
        var filteredOptions = FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        if (this.optionGroupLabel) {
          var optionGroups = this.options || [];
          var filtered = [];
          optionGroups.forEach(function (group) {
            var groupChildren = _this25.getOptionGroupChildren(group);
            var filteredItems = groupChildren.filter(function (item) {
              return filteredOptions.includes(item);
            });
            if (filteredItems.length > 0) filtered.push(_objectSpread$1(_objectSpread$1({}, group), {}, _defineProperty$1({}, typeof _this25.optionGroupChildren === 'string' ? _this25.optionGroupChildren : 'items', _toConsumableArray(filteredItems))));
          });
          return this.flatOptions(filtered);
        }
        return filteredOptions;
      }
      return options;
    },
    label: function label() {
      // TODO: Refactor
      var label;
      if (this.modelValue && this.modelValue.length) {
        if (ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue.length > this.maxSelectedLabels) {
          return this.getSelectedItemsLabel();
        } else {
          label = '';
          for (var i = 0; i < this.modelValue.length; i++) {
            if (i !== 0) {
              label += ', ';
            }
            label += this.getLabelByValue(this.modelValue[i]);
          }
        }
      } else {
        label = this.placeholder;
      }
      return label;
    },
    chipSelectedItems: function chipSelectedItems() {
      return ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue && this.modelValue.length > this.maxSelectedLabels ? this.modelValue.slice(0, this.maxSelectedLabels) : this.modelValue;
    },
    allSelected: function allSelected() {
      var _this26 = this;
      return this.selectAll !== null ? this.selectAll : ObjectUtils.isNotEmpty(this.visibleOptions) && this.visibleOptions.every(function (option) {
        return _this26.isOptionGroup(option) || _this26.isOptionDisabled(option) || _this26.isSelected(option);
      });
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
    maxSelectionLimitReached: function maxSelectionLimitReached() {
      return this.selectionLimit && this.modelValue && this.modelValue.length === this.selectionLimit;
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
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', this.modelValue.length) : this.emptySelectionMessageText;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    ariaSetSize: function ariaSetSize() {
      var _this27 = this;
      return this.visibleOptions.filter(function (option) {
        return !_this27.isOptionGroup(option);
      }).length;
    },
    toggleAllAriaLabel: function toggleAllAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria[this.allSelected ? 'selectAll' : 'unselectAll'] : undefined;
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    Checkbox: Checkbox,
    VirtualScroller: VirtualScroller,
    Portal: Portal,
    TimesIcon: TimesIcon,
    SearchIcon: SearchIcon,
    TimesCircleIcon: TimesCircleIcon,
    ChevronDownIcon: ChevronDownIcon,
    SpinnerIcon: SpinnerIcon,
    CheckIcon: CheckIcon
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id", "disabled", "placeholder", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"];
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = ["id"];
var _hoisted_6 = ["id"];
var _hoisted_7 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focused", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TimesCircleIcon = resolveComponent("TimesCircleIcon");
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_Checkbox = resolveComponent("Checkbox");
  var _component_VirtualScroller = resolveComponent("VirtualScroller");
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    onClick: _cache[13] || (_cache[13] = function () {
      return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
    })
  }, _ctx.ptmi('root')), [createElementVNode("div", mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [createElementVNode("input", mergeProps({
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    readonly: "",
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.id + '_list',
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    "aria-invalid": _ctx.invalid || undefined,
    onFocus: _cache[0] || (_cache[0] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_1)], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('labelContainer')
  }, _ctx.ptm('labelContainer')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('label')
  }, _ctx.ptm('label')), [renderSlot(_ctx.$slots, "value", {
    value: _ctx.modelValue,
    placeholder: _ctx.placeholder
  }, function () {
    return [_ctx.display === 'comma' ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [createTextVNode(toDisplayString($options.label || 'empty'), 1)], 64)) : _ctx.display === 'chip' ? (openBlock(), createElementBlock(Fragment, {
      key: 1
    }, [(openBlock(true), createElementBlock(Fragment, null, renderList($options.chipSelectedItems, function (item) {
      return openBlock(), createElementBlock("div", mergeProps({
        key: $options.getLabelByValue(item),
        "class": _ctx.cx('token')
      }, _ctx.ptm('token')), [renderSlot(_ctx.$slots, "chip", {
        value: item
      }, function () {
        return [createElementVNode("span", mergeProps({
          "class": _ctx.cx('tokenLabel')
        }, _ctx.ptm('tokenLabel')), toDisplayString($options.getLabelByValue(item)), 17)];
      }), !_ctx.disabled ? renderSlot(_ctx.$slots, "removetokenicon", {
        key: 0,
        "class": normalizeClass(_ctx.cx('removeTokenIcon')),
        item: item,
        onClick: function onClick(event) {
          return $options.removeOption(event, item);
        },
        removeCallback: function removeCallback(event) {
          return $options.removeOption(event, item);
        }
      }, function () {
        return [_ctx.removeTokenIcon ? (openBlock(), createElementBlock("span", mergeProps({
          key: 0,
          "class": [_ctx.cx('removeTokenIcon'), _ctx.removeTokenIcon],
          onClick: withModifiers(function ($event) {
            return $options.removeOption($event, item);
          }, ["stop"])
        }, _ctx.ptm('removeTokenIcon')), null, 16, _hoisted_2)) : (openBlock(), createBlock(_component_TimesCircleIcon, mergeProps({
          key: 1,
          "class": _ctx.cx('removeTokenIcon'),
          onClick: withModifiers(function ($event) {
            return $options.removeOption($event, item);
          }, ["stop"])
        }, _ctx.ptm('removeTokenIcon')), null, 16, ["class", "onClick"]))];
      }) : createCommentVNode("", true)], 16);
    }), 128)), !_ctx.modelValue || _ctx.modelValue.length === 0 ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [createTextVNode(toDisplayString(_ctx.placeholder || 'empty'), 1)], 64)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)];
  })], 16)], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('trigger')
  }, _ctx.ptm('trigger')), [_ctx.loading ? renderSlot(_ctx.$slots, "loadingicon", {
    key: 0,
    "class": normalizeClass(_ctx.cx('loadingIcon'))
  }, function () {
    return [_ctx.loadingIcon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon],
      "aria-hidden": "true"
    }, _ctx.ptm('loadingIcon')), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
      key: 1,
      "class": _ctx.cx('loadingIcon'),
      spin: "",
      "aria-hidden": "true"
    }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
  }) : renderSlot(_ctx.$slots, "dropdownicon", {
    key: 1,
    "class": normalizeClass(_ctx.cx('dropdownIcon'))
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.dropdownIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
      "class": [_ctx.cx('dropdownIcon'), _ctx.dropdownIcon],
      "aria-hidden": "true"
    }, _ctx.ptm('dropdownIcon')), null, 16, ["class"]))];
  })], 16), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function () {
      return [createVNode(Transition, mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm('transition')), {
        "default": withCtx(function () {
          return [$data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            style: _ctx.panelStyle,
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            onClick: _cache[11] || (_cache[11] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[12] || (_cache[12] = function () {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [createElementVNode("span", mergeProps({
            ref: "firstHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            "class": "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: _cache[3] || (_cache[3] = function () {
              return $options.onFirstHiddenFocus && $options.onFirstHiddenFocus.apply($options, arguments);
            })
          }, _ctx.ptm('hiddenFirstFocusableEl'), {
            "data-p-hidden-accessible": true,
            "data-p-hidden-focusable": true
          }), null, 16), renderSlot(_ctx.$slots, "header", {
            value: _ctx.modelValue,
            options: $options.visibleOptions
          }), _ctx.showToggleAll && _ctx.selectionLimit == null || _ctx.filter ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx('header')
          }, _ctx.ptm('header')), [_ctx.showToggleAll && _ctx.selectionLimit == null ? (openBlock(), createBlock(_component_Checkbox, {
            key: 0,
            modelValue: $options.allSelected,
            binary: true,
            disabled: _ctx.disabled,
            variant: _ctx.variant,
            "aria-label": $options.toggleAllAriaLabel,
            onChange: $options.onToggleAll,
            unstyled: _ctx.unstyled,
            pt: $options.getHeaderCheckboxPTOptions('headerCheckbox')
          }, {
            icon: withCtx(function (slotProps) {
              return [_ctx.$slots.headercheckboxicon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.headercheckboxicon), {
                key: 0,
                checked: slotProps.checked,
                "class": normalizeClass(slotProps["class"])
              }, null, 8, ["checked", "class"])) : slotProps.checked ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.checkboxIcon ? 'span' : 'CheckIcon'), mergeProps({
                key: 1,
                "class": [slotProps["class"], _defineProperty({}, _ctx.checkboxIcon, slotProps.checked)]
              }, $options.getHeaderCheckboxPTOptions('headerCheckbox.icon')), null, 16, ["class"])) : createCommentVNode("", true)];
            }),
            _: 1
          }, 8, ["modelValue", "disabled", "variant", "aria-label", "onChange", "unstyled", "pt"])) : createCommentVNode("", true), _ctx.filter ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx('filterContainer')
          }, _ctx.ptm('filterContainer')), [createElementVNode("input", mergeProps({
            ref: "filterInput",
            type: "text",
            value: $data.filterValue,
            onVnodeMounted: _cache[4] || (_cache[4] = function () {
              return $options.onFilterUpdated && $options.onFilterUpdated.apply($options, arguments);
            }),
            onVnodeUpdated: _cache[5] || (_cache[5] = function () {
              return $options.onFilterUpdated && $options.onFilterUpdated.apply($options, arguments);
            }),
            "class": _ctx.cx('filterInput'),
            placeholder: _ctx.filterPlaceholder,
            role: "searchbox",
            autocomplete: "off",
            "aria-owns": $data.id + '_list',
            "aria-activedescendant": $options.focusedOptionId,
            onKeydown: _cache[6] || (_cache[6] = function () {
              return $options.onFilterKeyDown && $options.onFilterKeyDown.apply($options, arguments);
            }),
            onBlur: _cache[7] || (_cache[7] = function () {
              return $options.onFilterBlur && $options.onFilterBlur.apply($options, arguments);
            }),
            onInput: _cache[8] || (_cache[8] = function () {
              return $options.onFilterChange && $options.onFilterChange.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.filterInputProps), _ctx.ptm('filterInput'))), null, 16, _hoisted_3), renderSlot(_ctx.$slots, "filtericon", {
            "class": normalizeClass(_ctx.cx('filterIcon'))
          }, function () {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.filterIcon ? 'span' : 'SearchIcon'), mergeProps({
              "class": [_ctx.cx('filterIcon'), _ctx.filterIcon]
            }, _ctx.ptm('filterIcon')), null, 16, ["class"]))];
          })], 16)) : createCommentVNode("", true), _ctx.filter ? (openBlock(), createElementBlock("span", mergeProps({
            key: 2,
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm('hiddenFilterResult'), {
            "data-p-hidden-accessible": true
          }), toDisplayString($options.filterResultMessageText), 17)) : createCommentVNode("", true), withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx('closeButton'),
            "aria-label": $options.closeAriaLabel,
            onClick: _cache[9] || (_cache[9] = function () {
              return $options.onCloseClick && $options.onCloseClick.apply($options, arguments);
            }),
            type: "button"
          }, _objectSpread(_objectSpread({}, _ctx.closeButtonProps), _ctx.ptm('closeButton'))), [renderSlot(_ctx.$slots, "closeicon", {
            "class": normalizeClass(_ctx.cx('closeIcon'))
          }, function () {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
              "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
            }, _ctx.ptm('closeIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_4)), [[_directive_ripple]])], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
            "class": _ctx.cx('wrapper'),
            style: {
              'max-height': $options.virtualScrollerDisabled ? _ctx.scrollHeight : ''
            }
          }, _ctx.ptm('wrapper')), [createVNode(_component_VirtualScroller, mergeProps({
            ref: $options.virtualScrollerRef
          }, _ctx.virtualScrollerOptions, {
            items: $options.visibleOptions,
            style: {
              height: _ctx.scrollHeight
            },
            tabindex: -1,
            disabled: $options.virtualScrollerDisabled,
            pt: _ctx.ptm('virtualScroller')
          }), createSlots({
            content: withCtx(function (_ref2) {
              var styleClass = _ref2.styleClass,
                contentRef = _ref2.contentRef,
                items = _ref2.items,
                getItemOptions = _ref2.getItemOptions,
                contentStyle = _ref2.contentStyle,
                itemSize = _ref2.itemSize;
              return [createElementVNode("ul", mergeProps({
                ref: function ref(el) {
                  return $options.listRef(el, contentRef);
                },
                id: $data.id + '_list',
                "class": [_ctx.cx('list'), styleClass],
                style: contentStyle,
                role: "listbox",
                "aria-multiselectable": "true"
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
                })], 16, _hoisted_6)) : withDirectives((openBlock(), createElementBlock("li", mergeProps({
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
                    return $options.onOptionSelect($event, option, $options.getOptionIndex(i, getItemOptions), true);
                  },
                  onMousemove: function onMousemove($event) {
                    return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                  }
                }, $options.getCheckboxPTOptions(option, getItemOptions, i, 'item'), {
                  "data-p-highlight": $options.isSelected(option),
                  "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                  "data-p-disabled": $options.isOptionDisabled(option)
                }), [createVNode(_component_Checkbox, {
                  modelValue: $options.isSelected(option),
                  binary: true,
                  tabindex: -1,
                  variant: _ctx.variant,
                  unstyled: _ctx.unstyled,
                  pt: $options.getCheckboxPTOptions(option, getItemOptions, i, 'itemCheckbox')
                }, {
                  icon: withCtx(function (slotProps) {
                    return [_ctx.$slots.itemcheckboxicon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.itemcheckboxicon), {
                      key: 0,
                      checked: slotProps.checked,
                      "class": normalizeClass(slotProps["class"])
                    }, null, 8, ["checked", "class"])) : slotProps.checked ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.checkboxIcon ? 'span' : 'CheckIcon'), mergeProps({
                      key: 1,
                      "class": [slotProps["class"], _defineProperty({}, _ctx.checkboxIcon, slotProps.checked)]
                    }, $options.getCheckboxPTOptions(option, getItemOptions, i, 'itemCheckbox.icon')), null, 16, ["class"])) : createCommentVNode("", true)];
                  }),
                  _: 2
                }, 1032, ["modelValue", "variant", "unstyled", "pt"]), renderSlot(_ctx.$slots, "option", {
                  option: option,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function () {
                  return [createElementVNode("span", normalizeProps(guardReactiveProps(_ctx.ptm('option'))), toDisplayString($options.getOptionLabel(option)), 17)];
                })], 16, _hoisted_7)), [[_directive_ripple]])], 64);
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
              })], 16)) : createCommentVNode("", true)], 16, _hoisted_5)];
            }),
            _: 2
          }, [_ctx.$slots.loader ? {
            name: "loader",
            fn: withCtx(function (_ref4) {
              var options = _ref4.options;
              return [renderSlot(_ctx.$slots, "loader", {
                options: options
              })];
            }),
            key: "0"
          } : undefined]), 1040, ["items", "style", "disabled", "pt"])], 16), renderSlot(_ctx.$slots, "footer", {
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
            ref: "lastHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            "class": "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: _cache[10] || (_cache[10] = function () {
              return $options.onLastHiddenFocus && $options.onLastHiddenFocus.apply($options, arguments);
            })
          }, _ctx.ptm('hiddenLastFocusableEl'), {
            "data-p-hidden-accessible": true,
            "data-p-hidden-focusable": true
          }), null, 16)], 16)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}

script.render = render;

export { script as default };
