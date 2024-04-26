'use strict';

var Button = require('primevue/button');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var SpinnerIcon = require('primevue/icons/spinner');
var TimesCircleIcon = require('primevue/icons/timescircle');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var VirtualScroller = require('primevue/virtualscroller');
var AutoCompleteStyle = require('primevue/autocomplete/style');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);
var AutoCompleteStyle__default = /*#__PURE__*/_interopDefaultLegacy(AutoCompleteStyle);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseAutoComplete',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    suggestions: {
      type: Array,
      "default": null
    },
    field: {
      // TODO: Deprecated since v3.16.0
      type: [String, Function],
      "default": null
    },
    optionLabel: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      "default": '200px'
    },
    dropdown: {
      type: Boolean,
      "default": false
    },
    dropdownMode: {
      type: String,
      "default": 'blank'
    },
    autoHighlight: {
      // TODO: Deprecated since v3.16.0. Use selectOnFocus property instead.
      type: Boolean,
      "default": false
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    loading: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    dataKey: {
      type: String,
      "default": null
    },
    minLength: {
      type: Number,
      "default": 1
    },
    delay: {
      type: Number,
      "default": 300
    },
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    forceSelection: {
      type: Boolean,
      "default": false
    },
    completeOnFocus: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    dropdownIcon: {
      type: String,
      "default": undefined
    },
    dropdownClass: {
      type: [String, Object],
      "default": null
    },
    loadingIcon: {
      type: String,
      "default": undefined
    },
    removeTokenIcon: {
      type: String,
      "default": undefined
    },
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    autoOptionFocus: {
      type: Boolean,
      "default": false
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    searchLocale: {
      type: String,
      "default": undefined
    },
    searchMessage: {
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
    emptySearchMessage: {
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
  style: AutoCompleteStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'AutoComplete',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'item-select', 'item-unselect', 'dropdown-click', 'clear', 'complete', 'before-show', 'before-hide', 'show', 'hide'],
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  virtualScroller: null,
  searchTimeout: null,
  dirty: false,
  data: function data() {
    return {
      id: this.$attrs.id,
      clicked: false,
      focused: false,
      focusedOptionIndex: -1,
      focusedMultipleOptionIndex: -1,
      overlayVisible: false,
      searching: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    suggestions: function suggestions() {
      if (this.searching) {
        this.show();
        this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.searching = false;
      }
      this.autoUpdateModel();
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
    this.autoUpdateModel();
  },
  updated: function updated() {
    if (this.overlayVisible) {
      this.alignOverlay();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      utils.ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex: function getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)['index'];
    },
    getOptionLabel: function getOptionLabel(option) {
      return this.field || this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.field || this.optionLabel) : option;
    },
    getOptionValue: function getOptionValue(option) {
      return option; // TODO: The 'optionValue' properties can be added.
    },
    getOptionRenderKey: function getOptionRenderKey(option, index) {
      return (this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + '_' + index;
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
      return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup: function isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren: function getOptionGroupChildren(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset: function getAriaPosInset(index) {
      var _this = this;
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(function (option) {
        return _this.isOptionGroup(option);
      }).length : index) + 1;
    },
    show: function show(isFocus) {
      this.$emit('before-show');
      this.dirty = true;
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && utils.DomHandler.focus(this.$refs.focusInput);
    },
    hide: function hide(isFocus) {
      var _this2 = this;
      var _hide = function _hide() {
        _this2.$emit('before-hide');
        _this2.dirty = isFocus;
        _this2.overlayVisible = false;
        _this2.clicked = false;
        _this2.focusedOptionIndex = -1;
        isFocus && utils.DomHandler.focus(_this2.$refs.focusInput);
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
      if (!this.dirty && this.completeOnFocus) {
        this.search(event, event.target.value, 'focus');
      }
      this.dirty = true;
      this.focused = true;
      if (this.overlayVisible) {
        this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.scrollInView(this.focusedOptionIndex);
      }
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.dirty = false;
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
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
        case 'PageDown':
          this.onPageDownKey(event);
          break;
        case 'PageUp':
          this.onPageUpKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
          this.onEnterKey(event);
          break;
        case 'Escape':
          this.onEscapeKey(event);
          break;
        case 'Tab':
          this.onTabKey(event);
          break;
        case 'Backspace':
          this.onBackspaceKey(event);
          break;
      }
      this.clicked = false;
    },
    onInput: function onInput(event) {
      var _this3 = this;
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      var query = event.target.value;
      if (!this.multiple) {
        this.updateModel(event, query);
      }
      if (query.length === 0) {
        this.hide();
        this.$emit('clear');
      } else {
        if (query.length >= this.minLength) {
          this.focusedOptionIndex = -1;
          this.searchTimeout = setTimeout(function () {
            _this3.search(event, query, 'input');
          }, this.delay);
        } else {
          this.hide();
        }
      }
    },
    onChange: function onChange(event) {
      var _this4 = this;
      if (this.forceSelection) {
        var valid = false;

        // when forceSelection is on, prevent called twice onOptionSelect()
        if (this.visibleOptions && !this.multiple) {
          var matchedValue = this.visibleOptions.find(function (option) {
            return _this4.isOptionMatched(option, _this4.$refs.focusInput.value || '');
          });
          if (matchedValue !== undefined) {
            valid = true;
            !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
          }
        }
        if (!valid) {
          this.$refs.focusInput.value = '';
          this.$emit('clear');
          !this.multiple && this.updateModel(event, null);
        }
      }
    },
    onMultipleContainerFocus: function onMultipleContainerFocus() {
      if (this.disabled) {
        // For ScreenReaders
        return;
      }
      this.focused = true;
    },
    onMultipleContainerBlur: function onMultipleContainerBlur() {
      this.focusedMultipleOptionIndex = -1;
      this.focused = false;
    },
    onMultipleContainerKeyDown: function onMultipleContainerKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      switch (event.code) {
        case 'ArrowLeft':
          this.onArrowLeftKeyOnMultiple(event);
          break;
        case 'ArrowRight':
          this.onArrowRightKeyOnMultiple(event);
          break;
        case 'Backspace':
          this.onBackspaceKeyOnMultiple(event);
          break;
      }
    },
    onContainerClick: function onContainerClick(event) {
      this.clicked = true;
      if (this.disabled || this.searching || this.loading || this.isInputClicked(event) || this.isDropdownClicked(event)) {
        return;
      }
      if (!this.overlay || !this.overlay.contains(event.target)) {
        utils.DomHandler.focus(this.$refs.focusInput);
      }
    },
    onDropdownClick: function onDropdownClick(event) {
      var query = undefined;
      if (this.overlayVisible) {
        this.hide(true);
      } else {
        utils.DomHandler.focus(this.$refs.focusInput);
        query = this.$refs.focusInput.value;
        if (this.dropdownMode === 'blank') this.search(event, '', 'dropdown');else if (this.dropdownMode === 'current') this.search(event, query, 'dropdown');
      }
      this.$emit('dropdown-click', {
        originalEvent: event,
        query: query
      });
    },
    onOptionSelect: function onOptionSelect(event, option) {
      var isHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var value = this.getOptionValue(option);
      if (this.multiple) {
        this.$refs.focusInput.value = '';
        if (!this.isSelected(option)) {
          this.updateModel(event, [].concat(_toConsumableArray(this.modelValue || []), [value]));
        }
      } else {
        this.updateModel(event, value);
      }
      this.$emit('item-select', {
        originalEvent: event,
        value: option
      });
      isHide && this.hide(true);
    },
    onOptionMouseMove: function onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus__default["default"].emit('overlay-click', {
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
        return;
      }
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      if (event.altKey) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var target = event.currentTarget;
      this.focusedOptionIndex = -1;
      if (this.multiple) {
        if (utils.ObjectUtils.isEmpty(target.value) && this.hasSelectedOption) {
          utils.DomHandler.focus(this.$refs.multiContainer);
          this.focusedMultipleOptionIndex = this.modelValue.length;
        } else {
          event.stopPropagation(); // To prevent onArrowLeftKeyOnMultiple method
        }
      }
    },
    onArrowRightKey: function onArrowRightKey(event) {
      this.focusedOptionIndex = -1;
      this.multiple && event.stopPropagation(); // To prevent onArrowRightKeyOnMultiple method
    },
    onHomeKey: function onHomeKey(event) {
      var currentTarget = event.currentTarget;
      var len = currentTarget.value.length;
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var currentTarget = event.currentTarget;
      var len = currentTarget.value.length;
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex = -1;
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
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
    },
    onEscapeKey: function onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey: function onTabKey(event) {
      if (this.focusedOptionIndex !== -1) {
        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
      }
      this.overlayVisible && this.hide();
    },
    onBackspaceKey: function onBackspaceKey(event) {
      if (this.multiple) {
        if (utils.ObjectUtils.isNotEmpty(this.modelValue) && !this.$refs.focusInput.value) {
          var removedValue = this.modelValue[this.modelValue.length - 1];
          var newValue = this.modelValue.slice(0, -1);
          this.$emit('update:modelValue', newValue);
          this.$emit('item-unselect', {
            originalEvent: event,
            value: removedValue
          });
        }
        event.stopPropagation(); // To prevent onBackspaceKeyOnMultiple method
      }
    },
    onArrowLeftKeyOnMultiple: function onArrowLeftKeyOnMultiple() {
      this.focusedMultipleOptionIndex = this.focusedMultipleOptionIndex < 1 ? 0 : this.focusedMultipleOptionIndex - 1;
    },
    onArrowRightKeyOnMultiple: function onArrowRightKeyOnMultiple() {
      this.focusedMultipleOptionIndex++;
      if (this.focusedMultipleOptionIndex > this.modelValue.length - 1) {
        this.focusedMultipleOptionIndex = -1;
        utils.DomHandler.focus(this.$refs.focusInput);
      }
    },
    onBackspaceKeyOnMultiple: function onBackspaceKeyOnMultiple(event) {
      if (this.focusedMultipleOptionIndex !== -1) {
        this.removeOption(event, this.focusedMultipleOptionIndex);
      }
    },
    onOverlayEnter: function onOverlayEnter(el) {
      utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      utils.DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
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
      utils.ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      var target = this.multiple ? this.$refs.multiContainer : this.$refs.focusInput;
      if (this.appendTo === 'self') {
        utils.DomHandler.relativePosition(this.overlay, target);
      } else {
        this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(target) + 'px';
        utils.DomHandler.absolutePosition(this.overlay, target);
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this5 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this5.overlayVisible && _this5.overlay && _this5.isOutsideClicked(event)) {
            _this5.hide();
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
      var _this6 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
          if (_this6.overlayVisible) {
            _this6.hide();
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
      var _this7 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this7.overlayVisible && !utils.DomHandler.isTouchDevice()) {
            _this7.hide();
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
      return !this.overlay.contains(event.target) && !this.isInputClicked(event) && !this.isDropdownClicked(event);
    },
    isInputClicked: function isInputClicked(event) {
      if (this.multiple) return event.target === this.$refs.multiContainer || this.$refs.multiContainer.contains(event.target);else return event.target === this.$refs.focusInput;
    },
    isDropdownClicked: function isDropdownClicked(event) {
      return this.$refs.dropdownButton ? event.target === this.$refs.dropdownButton || this.$refs.dropdownButton.$el.contains(event.target) : false;
    },
    isOptionMatched: function isOptionMatched(option, value) {
      var _this$getOptionLabel;
      return this.isValidOption(option) && ((_this$getOptionLabel = this.getOptionLabel(option)) === null || _this$getOptionLabel === void 0 ? void 0 : _this$getOptionLabel.toLocaleLowerCase(this.searchLocale)) === value.toLocaleLowerCase(this.searchLocale);
    },
    isValidOption: function isValidOption(option) {
      return utils.ObjectUtils.isNotEmpty(option) && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption: function isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isEquals: function isEquals(value1, value2) {
      return utils.ObjectUtils.equals(value1, value2, this.equalityKey);
    },
    isSelected: function isSelected(option) {
      var _this8 = this;
      var optionValue = this.getOptionValue(option);
      return this.multiple ? (this.modelValue || []).some(function (value) {
        return _this8.isEquals(value, optionValue);
      }) : this.isEquals(this.modelValue, this.getOptionValue(option));
    },
    findFirstOptionIndex: function findFirstOptionIndex() {
      var _this9 = this;
      return this.visibleOptions.findIndex(function (option) {
        return _this9.isValidOption(option);
      });
    },
    findLastOptionIndex: function findLastOptionIndex() {
      var _this10 = this;
      return utils.ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
        return _this10.isValidOption(option);
      });
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var _this11 = this;
      var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
        return _this11.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var _this12 = this;
      var matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
        return _this12.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex: function findSelectedOptionIndex() {
      var _this13 = this;
      return this.hasSelectedOption ? this.visibleOptions.findIndex(function (option) {
        return _this13.isValidSelectedOption(option);
      }) : -1;
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    search: function search(event, query, source) {
      //allow empty string but not undefined or null
      if (query === undefined || query === null) {
        return;
      }

      //do not search blank values on input change
      if (source === 'input' && query.trim().length === 0) {
        return;
      }
      this.searching = true;
      this.$emit('complete', {
        originalEvent: event,
        query: query
      });
    },
    removeOption: function removeOption(event, index) {
      var _this14 = this;
      var removedOption = this.modelValue[index];
      var value = this.modelValue.filter(function (_, i) {
        return i !== index;
      }).map(function (option) {
        return _this14.getOptionValue(option);
      });
      this.updateModel(event, value);
      this.$emit('item-unselect', {
        originalEvent: event,
        value: removedOption
      });
      this.dirty = true;
      utils.DomHandler.focus(this.$refs.focusInput);
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus || this.autoHighlight) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView: function scrollInView() {
      var _this15 = this;
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      this.$nextTick(function () {
        var id = index !== -1 ? "".concat(_this15.id, "_").concat(index) : _this15.focusedOptionId;
        var element = utils.DomHandler.findSingle(_this15.list, "li[id=\"".concat(id, "\"]"));
        if (element) {
          element.scrollIntoView && element.scrollIntoView({
            block: 'nearest',
            inline: 'start'
          });
        } else if (!_this15.virtualScrollerDisabled) {
          _this15.virtualScroller && _this15.virtualScroller.scrollToIndex(index !== -1 ? index : _this15.focusedOptionIndex);
        }
      });
    },
    autoUpdateModel: function autoUpdateModel() {
      if ((this.selectOnFocus || this.autoHighlight) && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
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
      var _this16 = this;
      return (options || []).reduce(function (result, option, index) {
        result.push({
          optionGroup: option,
          group: true,
          index: index
        });
        var optionGroupChildren = _this16.getOptionGroupChildren(option);
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
      return this.optionGroupLabel ? this.flatOptions(this.suggestions) : this.suggestions || [];
    },
    inputValue: function inputValue() {
      if (utils.ObjectUtils.isNotEmpty(this.modelValue)) {
        if (_typeof$1(this.modelValue) === 'object') {
          var label = this.getOptionLabel(this.modelValue);
          return label != null ? label : this.modelValue;
        } else {
          return this.modelValue;
        }
      } else {
        return '';
      }
    },
    hasSelectedOption: function hasSelectedOption() {
      return utils.ObjectUtils.isNotEmpty(this.modelValue);
    },
    equalityKey: function equalityKey() {
      return this.dataKey; // TODO: The 'optionValue' properties can be added.
    },
    searchResultMessageText: function searchResultMessageText() {
      return utils.ObjectUtils.isNotEmpty(this.visibleOptions) && this.overlayVisible ? this.searchMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptySearchMessageText;
    },
    searchMessageText: function searchMessageText() {
      return this.searchMessage || this.$primevue.config.locale.searchMessage || '';
    },
    emptySearchMessageText: function emptySearchMessageText() {
      return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || '';
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
    listAriaLabel: function listAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listLabel : undefined;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    focusedMultipleOptionId: function focusedMultipleOptionId() {
      return this.focusedMultipleOptionIndex !== -1 ? "".concat(this.id, "_multiple_option_").concat(this.focusedMultipleOptionIndex) : null;
    },
    ariaSetSize: function ariaSetSize() {
      var _this17 = this;
      return this.visibleOptions.filter(function (option) {
        return !_this17.isOptionGroup(option);
      }).length;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  components: {
    Button: Button__default["default"],
    VirtualScroller: VirtualScroller__default["default"],
    Portal: Portal__default["default"],
    ChevronDownIcon: ChevronDownIcon__default["default"],
    SpinnerIcon: SpinnerIcon__default["default"],
    TimesCircleIcon: TimesCircleIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"];
var _hoisted_2 = ["aria-activedescendant"];
var _hoisted_3 = ["id", "aria-label", "aria-setsize", "aria-posinset"];
var _hoisted_4 = ["id", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"];
var _hoisted_5 = ["id", "aria-label"];
var _hoisted_6 = ["id"];
var _hoisted_7 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focus", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
  var _component_Button = vue.resolveComponent("Button");
  var _component_VirtualScroller = vue.resolveComponent("VirtualScroller");
  var _component_Portal = vue.resolveComponent("Portal");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    style: _ctx.sx('root'),
    onClick: _cache[15] || (_cache[15] = function () {
      return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
    })
  }, _ctx.ptmi('root')), [!_ctx.multiple ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
    key: 0,
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    "class": [_ctx.cx('input'), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: $options.inputValue,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    disabled: _ctx.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
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
    }),
    onInput: _cache[3] || (_cache[3] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onChange: _cache[4] || (_cache[4] = function () {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), null, 16, _hoisted_1)) : vue.createCommentVNode("", true), _ctx.multiple ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
    key: 1,
    ref: "multiContainer",
    "class": _ctx.cx('container'),
    tabindex: "-1",
    role: "listbox",
    "aria-orientation": "horizontal",
    "aria-activedescendant": $data.focused ? $options.focusedMultipleOptionId : undefined,
    onFocus: _cache[10] || (_cache[10] = function () {
      return $options.onMultipleContainerFocus && $options.onMultipleContainerFocus.apply($options, arguments);
    }),
    onBlur: _cache[11] || (_cache[11] = function () {
      return $options.onMultipleContainerBlur && $options.onMultipleContainerBlur.apply($options, arguments);
    }),
    onKeydown: _cache[12] || (_cache[12] = function () {
      return $options.onMultipleContainerKeyDown && $options.onMultipleContainerKeyDown.apply($options, arguments);
    })
  }, _ctx.ptm('container')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.modelValue, function (option, i) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: i,
      id: $data.id + '_multiple_option_' + i,
      "class": _ctx.cx('token', {
        i: i
      }),
      role: "option",
      "aria-label": $options.getOptionLabel(option),
      "aria-selected": true,
      "aria-setsize": _ctx.modelValue.length,
      "aria-posinset": i + 1
    }, _ctx.ptm('token')), [vue.renderSlot(_ctx.$slots, "chip", {
      value: option
    }, function () {
      return [vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('tokenLabel')
      }, _ctx.ptm('tokenLabel')), vue.toDisplayString($options.getOptionLabel(option)), 17)];
    }), vue.renderSlot(_ctx.$slots, "removetokenicon", {
      "class": vue.normalizeClass(_ctx.cx('removeTokenIcon')),
      index: i,
      onClick: function onClick(event) {
        return $options.removeOption(event, i);
      },
      removeCallback: function removeCallback(event) {
        return $options.removeOption(event, i);
      }
    }, function () {
      return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.removeTokenIcon ? 'span' : 'TimesCircleIcon'), vue.mergeProps({
        "class": [_ctx.cx('removeTokenIcon'), _ctx.removeTokenIcon],
        onClick: function onClick($event) {
          return $options.removeOption($event, i);
        },
        "aria-hidden": "true"
      }, _ctx.ptm('removeTokenIcon')), null, 16, ["class", "onClick"]))];
    })], 16, _hoisted_3);
  }), 128)), vue.createElementVNode("li", vue.mergeProps({
    "class": _ctx.cx('inputToken'),
    role: "option"
  }, _ctx.ptm('inputToken')), [vue.createElementVNode("input", vue.mergeProps({
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    style: _ctx.inputStyle,
    "class": _ctx.inputClass,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    disabled: _ctx.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.id + '_list',
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    "aria-invalid": _ctx.invalid || undefined,
    onFocus: _cache[5] || (_cache[5] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[6] || (_cache[6] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[7] || (_cache[7] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onInput: _cache[8] || (_cache[8] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onChange: _cache[9] || (_cache[9] = function () {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), null, 16, _hoisted_4)], 16)], 16, _hoisted_2)) : vue.createCommentVNode("", true), $data.searching || _ctx.loading ? vue.renderSlot(_ctx.$slots, "loadingicon", {
    key: 2,
    "class": vue.normalizeClass(_ctx.cx('loadingIcon'))
  }, function () {
    return [_ctx.loadingIcon ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
      key: 0,
      "class": ['pi-spin', _ctx.cx('loadingIcon'), _ctx.loadingIcon],
      "aria-hidden": "true"
    }, _ctx.ptm('loadingIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
      key: 1,
      "class": [_ctx.cx('loadingIcon'), _ctx.loadingIcon],
      spin: "",
      "aria-hidden": "true"
    }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
  }) : vue.createCommentVNode("", true), _ctx.dropdown ? (vue.openBlock(), vue.createBlock(_component_Button, {
    key: 3,
    ref: "dropdownButton",
    type: "button",
    tabindex: "-1",
    "class": vue.normalizeClass([_ctx.cx('dropdownButton'), _ctx.dropdownClass]),
    disabled: _ctx.disabled,
    "aria-hidden": "true",
    onClick: $options.onDropdownClick,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('dropdownButton')
  }, {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "dropdownicon", {
        "class": vue.normalizeClass(_ctx.dropdownIcon)
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.dropdownIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
          "class": _ctx.dropdownIcon
        }, _ctx.ptm('dropdownButton')['icon'], {
          "data-pc-section": "dropdownicon"
        }), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 8, ["class", "disabled", "onClick", "unstyled", "pt"])) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
    role: "status",
    "aria-live": "polite",
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenSearchResult'), {
    "data-p-hidden-accessible": true
  }), vue.toDisplayString($options.searchResultMessageText), 17), vue.createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, vue.mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm('transition')), {
        "default": vue.withCtx(function () {
          return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.overlayRef,
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            style: _objectSpread(_objectSpread({}, _ctx.panelStyle), {}, {
              'max-height': $options.virtualScrollerDisabled ? _ctx.scrollHeight : ''
            }),
            onClick: _cache[13] || (_cache[13] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[14] || (_cache[14] = function () {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.renderSlot(_ctx.$slots, "header", {
            value: _ctx.modelValue,
            suggestions: $options.visibleOptions
          }), vue.createVNode(_component_VirtualScroller, vue.mergeProps({
            ref: $options.virtualScrollerRef
          }, _ctx.virtualScrollerOptions, {
            style: {
              height: _ctx.scrollHeight
            },
            items: $options.visibleOptions,
            tabindex: -1,
            disabled: $options.virtualScrollerDisabled,
            pt: _ctx.ptm('virtualScroller')
          }), vue.createSlots({
            content: vue.withCtx(function (_ref) {
              var styleClass = _ref.styleClass,
                contentRef = _ref.contentRef,
                items = _ref.items,
                getItemOptions = _ref.getItemOptions,
                contentStyle = _ref.contentStyle,
                itemSize = _ref.itemSize;
              return [vue.createElementVNode("ul", vue.mergeProps({
                ref: function ref(el) {
                  return $options.listRef(el, contentRef);
                },
                id: $data.id + '_list',
                "class": [_ctx.cx('list'), styleClass],
                style: contentStyle,
                role: "listbox",
                "aria-label": $options.listAriaLabel
              }, _ctx.ptm('list')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(items, function (option, i) {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                }, [$options.isOptionGroup(option) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                  key: 0,
                  id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize ? itemSize + 'px' : undefined
                  },
                  "class": _ctx.cx('itemGroup'),
                  role: "option"
                }, _ctx.ptm('itemGroup')), [vue.renderSlot(_ctx.$slots, "optiongroup", {
                  option: option.optionGroup,
                  item: option.optionGroup,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function () {
                  return [vue.createTextVNode(vue.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)];
                })], 16, _hoisted_6)) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                  key: 1,
                  id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize ? itemSize + 'px' : undefined
                  },
                  "class": _ctx.cx('item', {
                    option: option,
                    i: i,
                    getItemOptions: getItemOptions
                  }),
                  role: "option",
                  "aria-label": $options.getOptionLabel(option),
                  "aria-selected": $options.isSelected(option),
                  "aria-disabled": $options.isOptionDisabled(option),
                  "aria-setsize": $options.ariaSetSize,
                  "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                  onClick: function onClick($event) {
                    return $options.onOptionSelect($event, option);
                  },
                  onMousemove: function onMousemove($event) {
                    return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                  },
                  "data-p-highlight": $options.isSelected(option),
                  "data-p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                  "data-p-disabled": $options.isOptionDisabled(option)
                }, $options.getPTOptions(option, getItemOptions, i, 'item')), [_ctx.$slots.option ? vue.renderSlot(_ctx.$slots, "option", {
                  key: 0,
                  option: option,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function () {
                  return [vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)];
                }) : vue.renderSlot(_ctx.$slots, "item", {
                  key: 1,
                  item: option,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function () {
                  return [vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)];
                })], 16, _hoisted_7)), [[_directive_ripple]])], 64);
              }), 128)), !items || items && items.length === 0 ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('emptyMessage'),
                role: "option"
              }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty", {}, function () {
                return [vue.createTextVNode(vue.toDisplayString($options.searchResultMessageText), 1)];
              })], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_5)];
            }),
            _: 2
          }, [_ctx.$slots.loader ? {
            name: "loader",
            fn: vue.withCtx(function (_ref2) {
              var options = _ref2.options;
              return [vue.renderSlot(_ctx.$slots, "loader", {
                options: options
              })];
            }),
            key: "0"
          } : undefined]), 1040, ["style", "items", "disabled", "pt"]), vue.renderSlot(_ctx.$slots, "footer", {
            value: _ctx.modelValue,
            suggestions: $options.visibleOptions
          }), vue.createElementVNode("span", vue.mergeProps({
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm('hiddenSelectedMessage'), {
            "data-p-hidden-accessible": true
          }), vue.toDisplayString($options.selectedMessageText), 17)], 16)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}

script.render = render;

module.exports = script;
