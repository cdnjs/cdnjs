this.primevue = this.primevue || {};
this.primevue.listbox = (function (api, IconField, BlankIcon, CheckIcon, SearchIcon, InputIcon, InputText, Ripple, utils, VirtualScroller, BaseComponent, ListboxStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var IconField__default = /*#__PURE__*/_interopDefaultLegacy(IconField);
    var BlankIcon__default = /*#__PURE__*/_interopDefaultLegacy(BlankIcon);
    var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
    var SearchIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchIcon);
    var InputIcon__default = /*#__PURE__*/_interopDefaultLegacy(InputIcon);
    var InputText__default = /*#__PURE__*/_interopDefaultLegacy(InputText);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ListboxStyle__default = /*#__PURE__*/_interopDefaultLegacy(ListboxStyle);

    var script$1 = {
      name: 'BaseListbox',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: null,
        options: Array,
        optionLabel: null,
        optionValue: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
        listStyle: null,
        scrollHeight: {
          type: String,
          "default": '14rem'
        },
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
        highlightOnSelect: {
          type: Boolean,
          "default": true
        },
        checkmark: {
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
        filterIcon: {
          type: String,
          "default": undefined
        },
        stripedRows: {
          type: Boolean,
          "default": false
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
      style: ListboxStyle__default["default"],
      provide: function provide() {
        return {
          $pcListbox: this,
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
      emits: ['update:modelValue', 'change', 'focus', 'blur', 'filter', 'item-dblclick', 'option-dblclick'],
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
          this.id = newValue || utils.UniqueComponentId();
        },
        options: function options() {
          this.autoUpdateModel();
        }
      },
      mounted: function mounted() {
        this.id = this.id || utils.UniqueComponentId();
        this.autoUpdateModel();
      },
      methods: {
        getOptionIndex: function getOptionIndex(index, fn) {
          return this.virtualScrollerDisabled ? index : fn && fn(index)['index'];
        },
        getOptionLabel: function getOptionLabel(option) {
          return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : typeof option === 'string' ? option : null;
        },
        getOptionValue: function getOptionValue(option) {
          return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
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
        onFirstHiddenFocus: function onFirstHiddenFocus() {
          utils.DomHandler.focus(this.list);
          var firstFocusableEl = utils.DomHandler.getFirstFocusableElement(this.$el, ':not([data-p-hidden-focusable="true"])');
          this.$refs.lastHiddenFocusableElement.tabIndex = utils.DomHandler.isElement(firstFocusableEl) ? undefined : -1;
          this.$refs.firstHiddenFocusableElement.tabIndex = -1;
        },
        onLastHiddenFocus: function onLastHiddenFocus(event) {
          var relatedTarget = event.relatedTarget;
          if (relatedTarget === this.list) {
            var firstFocusableEl = utils.DomHandler.getFirstFocusableElement(this.$el, ':not([data-p-hidden-focusable="true"])');
            utils.DomHandler.focus(firstFocusableEl);
            this.$refs.firstHiddenFocusableElement.tabIndex = undefined;
          } else {
            utils.DomHandler.focus(this.$refs.firstHiddenFocusableElement);
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
              if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
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
        onOptionDblClick: function onOptionDblClick(event, item) {
          this.$emit('item-dblclick', {
            originalEvent: event,
            value: item
          });
          this.$emit('option-dblclick', {
            originalEvent: event,
            value: item
          });
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
          event.preventDefault();
          this.onEnterKey(event);
        },
        onShiftKey: function onShiftKey() {
          this.startRangeIndex = this.focusedOptionIndex;
        },
        isOptionMatched: function isOptionMatched(option) {
          var _this$getOptionLabel;
          return this.isValidOption(option) && typeof this.getOptionLabel(option) === 'string' && ((_this$getOptionLabel = this.getOptionLabel(option)) === null || _this$getOptionLabel === void 0 ? void 0 : _this$getOptionLabel.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)));
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
          return utils.ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
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
          var matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
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
          return this.hasSelectedOption ? utils.ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
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
          var matchedOptionIndex = this.hasSelectedOption && index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
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
          if (utils.ObjectUtils.isNotEmpty(this.searchValue)) {
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
            return !utils.ObjectUtils.equals(val, _this15.getOptionValue(option), _this15.equalityKey);
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
            var element = utils.DomHandler.findSingle(_this16.list, "li[id=\"".concat(id, "\"]"));
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
          return this.filterValue ? api.FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale) : options;
        },
        hasSelectedOption: function hasSelectedOption() {
          return utils.ObjectUtils.isNotEmpty(this.modelValue);
        },
        equalityKey: function equalityKey() {
          return this.optionValue ? null : this.dataKey;
        },
        searchFields: function searchFields() {
          return this.filterFields || [this.optionLabel];
        },
        filterResultMessageText: function filterResultMessageText() {
          return utils.ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptyFilterMessageText;
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
        ripple: Ripple__default["default"]
      },
      components: {
        InputText: InputText__default["default"],
        VirtualScroller: VirtualScroller__default["default"],
        InputIcon: InputIcon__default["default"],
        IconField: IconField__default["default"],
        SearchIcon: SearchIcon__default["default"],
        CheckIcon: CheckIcon__default["default"],
        BlankIcon: BlankIcon__default["default"]
      }
    };

    var _hoisted_1 = ["id"];
    var _hoisted_2 = ["tabindex"];
    var _hoisted_3 = ["id", "aria-multiselectable", "aria-label", "aria-labelledby", "aria-activedescendant", "aria-disabled"];
    var _hoisted_4 = ["id"];
    var _hoisted_5 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousedown", "onMousemove", "onDblclick", "data-p-highlight", "data-p-focused", "data-p-disabled"];
    var _hoisted_6 = ["tabindex"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_InputText = vue.resolveComponent("InputText");
      var _component_SearchIcon = vue.resolveComponent("SearchIcon");
      var _component_InputIcon = vue.resolveComponent("InputIcon");
      var _component_IconField = vue.resolveComponent("IconField");
      var _component_CheckIcon = vue.resolveComponent("CheckIcon");
      var _component_BlankIcon = vue.resolveComponent("BlankIcon");
      var _component_VirtualScroller = vue.resolveComponent("VirtualScroller");
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        id: $data.id,
        "class": _ctx.cx('root'),
        onFocusout: _cache[7] || (_cache[7] = function () {
          return $options.onFocusout && $options.onFocusout.apply($options, arguments);
        })
      }, _ctx.ptmi('root')), [vue.createElementVNode("span", vue.mergeProps({
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
      }), null, 16, _hoisted_2), _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        "class": vue.normalizeClass(_ctx.cx('header'))
      }, [vue.renderSlot(_ctx.$slots, "header", {
        value: _ctx.modelValue,
        options: $options.visibleOptions
      })], 2)) : vue.createCommentVNode("", true), _ctx.filter ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('header')
      }, _ctx.ptm('header')), [vue.createVNode(_component_IconField, vue.mergeProps({
        unstyled: _ctx.unstyled
      }, _ctx.ptm('pcFilterContainer')), {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_InputText, {
            modelValue: $data.filterValue,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
              return $data.filterValue = $event;
            }),
            type: "text",
            "class": vue.normalizeClass(_ctx.cx('pcFilter')),
            placeholder: _ctx.filterPlaceholder,
            role: "searchbox",
            autocomplete: "off",
            invalid: _ctx.invalid,
            disabled: _ctx.disabled,
            unstyled: _ctx.unstyled,
            "aria-owns": $data.id + '_list',
            "aria-activedescendant": $options.focusedOptionId,
            tabindex: !_ctx.disabled && !$data.focused ? _ctx.tabindex : -1,
            onInput: $options.onFilterChange,
            onBlur: $options.onFilterBlur,
            onKeydown: $options.onFilterKeyDown,
            pt: _ctx.ptm('pcFilter')
          }, null, 8, ["modelValue", "class", "placeholder", "invalid", "disabled", "unstyled", "aria-owns", "aria-activedescendant", "tabindex", "onInput", "onBlur", "onKeydown", "pt"]), vue.createVNode(_component_InputIcon, vue.mergeProps({
            unstyled: _ctx.unstyled
          }, _ctx.ptm('pcFilterIconContainer')), {
            "default": vue.withCtx(function () {
              return [vue.renderSlot(_ctx.$slots, "filtericon", {}, function () {
                return [_ctx.filterIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                  key: 0,
                  "class": _ctx.filterIcon
                }, _ctx.ptm('filterIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SearchIcon, vue.normalizeProps(vue.mergeProps({
                  key: 1
                }, _ctx.ptm('filterIcon'))), null, 16))];
              })];
            }),
            _: 3
          }, 16, ["unstyled"])];
        }),
        _: 3
      }, 16, ["unstyled"]), vue.createElementVNode("span", vue.mergeProps({
        role: "status",
        "aria-live": "polite",
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenFilterResult'), {
        "data-p-hidden-accessible": true
      }), vue.toDisplayString($options.filterResultMessageText), 17)], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('listContainer'),
        style: [{
          'max-height': $options.virtualScrollerDisabled ? _ctx.scrollHeight : ''
        }, _ctx.listStyle]
      }, _ctx.ptm('listContainer')), [vue.createVNode(_component_VirtualScroller, vue.mergeProps({
        ref: $options.virtualScrollerRef
      }, _ctx.virtualScrollerOptions, {
        items: $options.visibleOptions,
        style: [{
          height: _ctx.scrollHeight
        }, _ctx.listStyle],
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
            tabindex: -1,
            role: "listbox",
            "aria-multiselectable": _ctx.multiple,
            "aria-label": _ctx.ariaLabel,
            "aria-labelledby": _ctx.ariaLabelledby,
            "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
            "aria-disabled": _ctx.disabled,
            onFocus: _cache[3] || (_cache[3] = function () {
              return $options.onListFocus && $options.onListFocus.apply($options, arguments);
            }),
            onBlur: _cache[4] || (_cache[4] = function () {
              return $options.onListBlur && $options.onListBlur.apply($options, arguments);
            }),
            onKeydown: _cache[5] || (_cache[5] = function () {
              return $options.onListKeyDown && $options.onListKeyDown.apply($options, arguments);
            })
          }, _ctx.ptm('list')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(items, function (option, i) {
            return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
              key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
            }, [$options.isOptionGroup(option) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: 0,
              id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
              style: {
                height: itemSize ? itemSize + 'px' : undefined
              },
              "class": _ctx.cx('optionGroup'),
              role: "option",
              ref_for: true
            }, _ctx.ptm('optionGroup')), [vue.renderSlot(_ctx.$slots, "optiongroup", {
              option: option.optionGroup,
              index: $options.getOptionIndex(i, getItemOptions)
            }, function () {
              return [vue.createTextVNode(vue.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)];
            })], 16, _hoisted_4)) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: 1,
              id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
              style: {
                height: itemSize ? itemSize + 'px' : undefined
              },
              "class": _ctx.cx('option', {
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
              onTouchend: _cache[2] || (_cache[2] = function ($event) {
                return $options.onOptionTouchEnd();
              }),
              onDblclick: function onDblclick($event) {
                return $options.onOptionDblClick($event, option);
              },
              ref_for: true
            }, $options.getPTOptions(option, getItemOptions, i, 'option'), {
              "data-p-highlight": $options.isSelected(option),
              "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
              "data-p-disabled": $options.isOptionDisabled(option)
            }), [_ctx.checkmark ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
              key: 0
            }, [$options.isSelected(option) ? (vue.openBlock(), vue.createBlock(_component_CheckIcon, vue.mergeProps({
              key: 0,
              "class": _ctx.cx('optionCheckIcon'),
              ref_for: true
            }, _ctx.ptm('optionCheckIcon')), null, 16, ["class"])) : (vue.openBlock(), vue.createBlock(_component_BlankIcon, vue.mergeProps({
              key: 1,
              "class": _ctx.cx('optionBlankIcon'),
              ref_for: true
            }, _ctx.ptm('optionBlankIcon')), null, 16, ["class"]))], 64)) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "option", {
              option: option,
              index: $options.getOptionIndex(i, getItemOptions)
            }, function () {
              return [vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)];
            })], 16, _hoisted_5)), [[_directive_ripple]])], 64);
          }), 128)), $data.filterValue && (!items || items && items.length === 0) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('emptyMessage'),
            role: "option"
          }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "emptyfilter", {}, function () {
            return [vue.createTextVNode(vue.toDisplayString($options.emptyFilterMessageText), 1)];
          })], 16)) : !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
            key: 1,
            "class": _ctx.cx('emptyMessage'),
            role: "option"
          }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty", {}, function () {
            return [vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)];
          })], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_3)];
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
      } : undefined]), 1040, ["items", "style", "disabled", "pt"])], 16), vue.renderSlot(_ctx.$slots, "footer", {
        value: _ctx.modelValue,
        options: $options.visibleOptions
      }), !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 2,
        role: "status",
        "aria-live": "polite",
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenEmptyMessage'), {
        "data-p-hidden-accessible": true
      }), vue.toDisplayString($options.emptyMessageText), 17)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
        role: "status",
        "aria-live": "polite",
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenSelectedMessage'), {
        "data-p-hidden-accessible": true
      }), vue.toDisplayString($options.selectedMessageText), 17), vue.createElementVNode("span", vue.mergeProps({
        ref: "lastHiddenFocusableElement",
        role: "presentation",
        "aria-hidden": "true",
        "class": "p-hidden-accessible p-hidden-focusable",
        tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
        onFocus: _cache[6] || (_cache[6] = function () {
          return $options.onLastHiddenFocus && $options.onLastHiddenFocus.apply($options, arguments);
        })
      }, _ctx.ptm('hiddenLastFocusableEl'), {
        "data-p-hidden-accessible": true,
        "data-p-hidden-focusable": true
      }), null, 16, _hoisted_6)], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.api, primevue.iconfield, primevue.icons.blank, primevue.icons.check, primevue.icons.search, primevue.inputicon, primevue.inputtext, primevue.ripple, primevue.utils, primevue.virtualscroller, primevue.basecomponent, primevue.listbox.style, Vue);
