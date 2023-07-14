this.primevue = this.primevue || {};
this.primevue.cascadeselect = (function (AngleRightIcon, ChevronDownIcon, SpinnerIcon, OverlayEventBus, Portal, utils, BaseComponent, usestyle, Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var styles = "\n.p-cascadeselect {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-cascadeselect-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n\n.p-cascadeselect-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n\n.p-cascadeselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n\n.p-cascadeselect .p-cascadeselect-panel {\n    min-width: 100%;\n}\n\n.p-cascadeselect-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n}\n\n.p-cascadeselect-item-content {\n    display: flex;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-cascadeselect-group-icon {\n    margin-left: auto;\n}\n\n.p-cascadeselect-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    min-width: 100%;\n}\n\n.p-fluid .p-cascadeselect {\n    display: flex;\n}\n\n.p-fluid .p-cascadeselect .p-cascadeselect-label {\n    width: 1%;\n}\n\n.p-cascadeselect-sublist {\n    position: absolute;\n    min-width: 100%;\n    z-index: 1;\n    display: none;\n}\n\n.p-cascadeselect-item-active {\n    overflow: visible !important;\n}\n\n.p-cascadeselect-item-active > .p-cascadeselect-sublist {\n    display: block;\n    left: 100%;\n    top: 0;\n}\n";
    var inlineStyles = {
      root: function root(_ref) {
        var props = _ref.props;
        return {
          position: props.appendTo === 'self' ? 'relative' : undefined
        };
      }
    };
    var classes = {
      root: function root(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-cascadeselect p-component p-inputwrapper', {
          'p-disabled': props.disabled,
          'p-focus': instance.focused,
          'p-inputwrapper-filled': props.modelValue,
          'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
          'p-overlay-open': instance.overlayVisible
        }];
      },
      label: function label(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-cascadeselect-label p-inputtext', {
          'p-placeholder': instance.label === props.placeholder,
          'p-cascadeselect-label-empty': !instance.$slots['value'] && (instance.label === 'p-emptylabel' || instance.label.length === 0)
        }];
      },
      dropdownButton: 'p-cascadeselect-trigger',
      loadingIcon: 'p-cascadeselect-trigger-icon',
      dropdownIcon: 'p-cascadeselect-trigger-icon',
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-cascadeselect-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      wrapper: 'p-cascadeselect-items-wrapper',
      list: 'p-cascadeselect-panel p-cascadeselect-items',
      item: function item(_ref5) {
        var instance = _ref5.instance,
          processedOption = _ref5.processedOption;
        return ['p-cascadeselect-item', {
          'p-cascadeselect-item-group': instance.isOptionGroup(processedOption),
          'p-cascadeselect-item-active p-highlight': instance.isOptionActive(processedOption),
          'p-focus': instance.isOptionFocused(processedOption),
          'p-disabled': instance.isOptionDisabled(processedOption)
        }];
      },
      content: 'p-cascadeselect-item-content',
      text: 'p-cascadeselect-item-text',
      groupIcon: 'p-cascadeselect-group-icon',
      sublist: 'p-cascadeselect-sublist'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'cascadeselect',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$2 = {
      name: 'BaseCascadeSelect',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: null,
        options: Array,
        optionLabel: null,
        optionValue: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
        placeholder: String,
        disabled: Boolean,
        dataKey: null,
        inputId: {
          type: String,
          "default": null
        },
        inputClass: {
          type: [String, Object],
          "default": null
        },
        inputStyle: {
          type: Object,
          "default": null
        },
        inputProps: {
          type: null,
          "default": null
        },
        panelClass: {
          type: [String, Object],
          "default": null
        },
        panelStyle: {
          type: Object,
          "default": null
        },
        panelProps: {
          type: null,
          "default": null
        },
        appendTo: {
          type: String,
          "default": 'body'
        },
        loading: {
          type: Boolean,
          "default": false
        },
        dropdownIcon: {
          type: String,
          "default": undefined
        },
        loadingIcon: {
          type: String,
          "default": undefined
        },
        optionGroupIcon: {
          type: String,
          "default": undefined
        },
        autoOptionFocus: {
          type: Boolean,
          "default": true
        },
        selectOnFocus: {
          type: Boolean,
          "default": false
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
        emptyMessage: {
          type: String,
          "default": null
        },
        tabindex: {
          type: Number,
          "default": 0
        },
        'aria-labelledby': {
          type: String,
          "default": null
        },
        'aria-label': {
          type: String,
          "default": null
        }
      },
      css: {
        classes: classes,
        inlineStyles: inlineStyles,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script$1 = {
      name: 'CascadeSelectSub',
      hostName: 'CascadeSelect',
      "extends": BaseComponent__default["default"],
      emits: ['option-change'],
      props: {
        selectId: String,
        focusedOptionId: String,
        options: Array,
        optionLabel: String,
        optionValue: String,
        optionDisabled: null,
        optionGroupIcon: String,
        optionGroupLabel: String,
        optionGroupChildren: Array,
        activeOptionPath: Array,
        level: Number,
        templates: null
      },
      mounted: function mounted() {
        if (utils.ObjectUtils.isNotEmpty(this.parentKey)) {
          this.position();
        }
      },
      methods: {
        getOptionId: function getOptionId(processedOption) {
          return "".concat(this.selectId, "_").concat(processedOption.key);
        },
        getOptionLabel: function getOptionLabel(processedOption) {
          return this.optionLabel ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionLabel) : processedOption.option;
        },
        getOptionValue: function getOptionValue(processedOption) {
          return this.optionValue ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionValue) : processedOption.option;
        },
        isOptionDisabled: function isOptionDisabled(processedOption) {
          return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionDisabled) : false;
        },
        getOptionGroupLabel: function getOptionGroupLabel(processedOption) {
          return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionGroupLabel) : null;
        },
        getOptionGroupChildren: function getOptionGroupChildren(processedOption) {
          return processedOption.children;
        },
        isOptionGroup: function isOptionGroup(processedOption) {
          return utils.ObjectUtils.isNotEmpty(processedOption.children);
        },
        isOptionSelected: function isOptionSelected(processedOption) {
          return !this.isOptionGroup(processedOption) && this.isOptionActive(processedOption);
        },
        isOptionActive: function isOptionActive(processedOption) {
          return this.activeOptionPath.some(function (path) {
            return path.key === processedOption.key;
          });
        },
        isOptionFocused: function isOptionFocused(processedOption) {
          return this.focusedOptionId === this.getOptionId(processedOption);
        },
        getOptionLabelToRender: function getOptionLabelToRender(processedOption) {
          return this.isOptionGroup(processedOption) ? this.getOptionGroupLabel(processedOption) : this.getOptionLabel(processedOption);
        },
        onOptionClick: function onOptionClick(event, processedOption) {
          this.$emit('option-change', {
            originalEvent: event,
            processedOption: processedOption,
            isFocus: true
          });
        },
        onOptionChange: function onOptionChange(event) {
          this.$emit('option-change', event);
        },
        position: function position() {
          var parentItem = this.$el.parentElement;
          var containerOffset = utils.DomHandler.getOffset(parentItem);
          var viewport = utils.DomHandler.getViewport();
          var sublistWidth = this.$el.offsetParent ? this.$el.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(this.$el);
          var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);
          if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
            this.$el.style.left = '-100%';
          }
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      },
      components: {
        AngleRightIcon: AngleRightIcon__default["default"]
      }
    };

    var _hoisted_1$1 = ["id", "aria-label", "aria-selected", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset", "data-p-item-group", "data-p-highlight", "data-p-focus", "data-p-disabled"];
    var _hoisted_2 = ["onClick"];
    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_AngleRightIcon = vue.resolveComponent("AngleRightIcon");
      var _component_CascadeSelectSub = vue.resolveComponent("CascadeSelectSub", true);
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
        "class": _ctx.cx('list')
      }, $props.level === 0 ? _ctx.ptm('list') : _ctx.ptm('sublist')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.options, function (processedOption, index) {
        return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: $options.getOptionLabelToRender(processedOption),
          id: $options.getOptionId(processedOption),
          "class": _ctx.cx('item', {
            processedOption: processedOption
          }),
          role: "treeitem",
          "aria-label": $options.getOptionLabelToRender(processedOption),
          "aria-selected": $options.isOptionGroup(processedOption) ? undefined : $options.isOptionSelected(processedOption),
          "aria-expanded": $options.isOptionGroup(processedOption) ? $options.isOptionActive(processedOption) : undefined,
          "aria-level": $props.level + 1,
          "aria-setsize": $props.options.length,
          "aria-posinset": index + 1
        }, _ctx.ptm('item'), {
          "data-p-item-group": $options.isOptionGroup(processedOption),
          "data-p-highlight": $options.isOptionActive(processedOption),
          "data-p-focus": $options.isOptionFocused(processedOption),
          "data-p-disabled": $options.isOptionDisabled(processedOption)
        }), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          "class": _ctx.cx('content'),
          onClick: function onClick($event) {
            return $options.onOptionClick($event, processedOption);
          }
        }, _ctx.ptm('content')), [$props.templates['option'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['option']), {
          key: 0,
          option: processedOption.option
        }, null, 8, ["option"])) : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 1,
          "class": _ctx.cx('text')
        }, _ctx.ptm('text')), vue.toDisplayString($options.getOptionLabelToRender(processedOption)), 17)), $options.isOptionGroup(processedOption) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 2
        }, [$props.templates['optiongroupicon'] ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['optiongroupicon']), {
          key: 0,
          "aria-hidden": "true"
        })) : $props.optionGroupIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 1,
          "class": [_ctx.cx('groupIcon'), $props.optionGroupIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('groupIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_AngleRightIcon, vue.mergeProps({
          key: 2,
          "class": _ctx.cx('groupIcon'),
          "aria-hidden": "true"
        }, _ctx.ptm('groupIcon')), null, 16, ["class"]))], 64)) : vue.createCommentVNode("", true)], 16, _hoisted_2)), [[_directive_ripple]]), $options.isOptionGroup(processedOption) && $options.isOptionActive(processedOption) ? (vue.openBlock(), vue.createBlock(_component_CascadeSelectSub, {
          key: 0,
          role: "group",
          "class": vue.normalizeClass(_ctx.cx('sublist')),
          selectId: $props.selectId,
          focusedOptionId: $props.focusedOptionId,
          options: $options.getOptionGroupChildren(processedOption),
          activeOptionPath: $props.activeOptionPath,
          level: $props.level + 1,
          templates: $props.templates,
          optionLabel: $props.optionLabel,
          optionValue: $props.optionValue,
          optionDisabled: $props.optionDisabled,
          optionGroupIcon: $props.optionGroupIcon,
          optionGroupLabel: $props.optionGroupLabel,
          optionGroupChildren: $props.optionGroupChildren,
          onOptionChange: $options.onOptionChange,
          pt: _ctx.pt
        }, null, 8, ["class", "selectId", "focusedOptionId", "options", "activeOptionPath", "level", "templates", "optionLabel", "optionValue", "optionDisabled", "optionGroupIcon", "optionGroupLabel", "optionGroupChildren", "onOptionChange", "pt"])) : vue.createCommentVNode("", true)], 16, _hoisted_1$1);
      }), 128))], 16);
    }

    script$1.render = render$1;

    var script = {
      name: 'CascadeSelect',
      "extends": script$2,
      emits: ['update:modelValue', 'change', 'focus', 'blur', 'click', 'group-change', 'before-show', 'before-hide', 'hide', 'show'],
      outsideClickListener: null,
      scrollHandler: null,
      resizeListener: null,
      overlay: null,
      searchTimeout: null,
      searchValue: null,
      focusOnHover: false,
      data: function data() {
        return {
          id: this.$attrs.id,
          focused: false,
          focusedOptionInfo: {
            index: -1,
            level: 0,
            parentKey: ''
          },
          activeOptionPath: [],
          overlayVisible: false,
          dirty: false
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
        getOptionLabel: function getOptionLabel(option) {
          return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        },
        getOptionValue: function getOptionValue(option) {
          return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        },
        isOptionDisabled: function isOptionDisabled(option) {
          return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
        },
        getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
          return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
        },
        getOptionGroupChildren: function getOptionGroupChildren(optionGroup, level) {
          return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[level]);
        },
        isOptionGroup: function isOptionGroup(option, level) {
          return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
        },
        getProccessedOptionLabel: function getProccessedOptionLabel(processedOption) {
          var grouped = this.isProccessedOptionGroup(processedOption);
          return grouped ? this.getOptionGroupLabel(processedOption.option, processedOption.level) : this.getOptionLabel(processedOption.option);
        },
        isProccessedOptionGroup: function isProccessedOptionGroup(processedOption) {
          return utils.ObjectUtils.isNotEmpty(processedOption.children);
        },
        show: function show(isFocus) {
          this.$emit('before-show');
          this.overlayVisible = true;
          this.activeOptionPath = this.hasSelectedOption ? this.findOptionPathByValue(this.modelValue) : this.activeOptionPath;
          if (this.hasSelectedOption && utils.ObjectUtils.isNotEmpty(this.activeOptionPath)) {
            var processedOption = this.activeOptionPath[this.activeOptionPath.length - 1];
            this.focusedOptionInfo = {
              index: this.autoOptionFocus ? processedOption.index : -1,
              level: processedOption.level,
              parentKey: processedOption.parentKey
            };
          } else {
            this.focusedOptionInfo = {
              index: this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1,
              level: 0,
              parentKey: ''
            };
          }
          isFocus && utils.DomHandler.focus(this.$refs.focusInput);
        },
        hide: function hide(isFocus) {
          var _this = this;
          var _hide = function _hide() {
            _this.$emit('before-hide');
            _this.overlayVisible = false;
            _this.activeOptionPath = [];
            _this.focusedOptionInfo = {
              index: -1,
              level: 0,
              parentKey: ''
            };
            isFocus && utils.DomHandler.focus(_this.$refs.focusInput);
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
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.focused = false;
          this.focusedOptionInfo = {
            index: -1,
            level: 0,
            parentKey: ''
          };
          this.searchValue = '';
          this.$emit('blur', event);
        },
        onKeyDown: function onKeyDown(event) {
          if (this.disabled || this.loading) {
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
            case 'Space':
              this.onSpaceKey(event);
              break;
            case 'Enter':
              this.onEnterKey(event);
              break;
            case 'Escape':
              this.onEscapeKey(event);
              break;
            case 'Tab':
              this.onTabKey(event);
              break;
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
              //NOOP
              break;
            default:
              if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                !this.overlayVisible && this.show();
                this.searchOptions(event, event.key);
              }
              break;
          }
        },
        onOptionChange: function onOptionChange(event) {
          var originalEvent = event.originalEvent,
            processedOption = event.processedOption,
            isFocus = event.isFocus,
            isHide = event.isHide;
          if (utils.ObjectUtils.isEmpty(processedOption)) return;
          var index = processedOption.index,
            level = processedOption.level,
            parentKey = processedOption.parentKey,
            children = processedOption.children;
          var grouped = utils.ObjectUtils.isNotEmpty(children);
          var activeOptionPath = this.activeOptionPath.filter(function (p) {
            return p.parentKey !== parentKey;
          });
          activeOptionPath.push(processedOption);
          this.focusedOptionInfo = {
            index: index,
            level: level,
            parentKey: parentKey
          };
          this.activeOptionPath = activeOptionPath;
          grouped ? this.onOptionGroupSelect(originalEvent, processedOption) : this.onOptionSelect(originalEvent, processedOption, isHide);
          isFocus && utils.DomHandler.focus(this.$refs.focusInput);
        },
        onOptionSelect: function onOptionSelect(event, processedOption) {
          var isHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var value = this.getOptionValue(processedOption.option);
          this.activeOptionPath.forEach(function (p) {
            return p.selected = true;
          });
          this.updateModel(event, value);
          isHide && this.hide(true);
        },
        onOptionGroupSelect: function onOptionGroupSelect(event, processedOption) {
          this.dirty = true;
          this.$emit('group-change', {
            originalEvent: event,
            value: processedOption.option
          });
        },
        onContainerClick: function onContainerClick(event) {
          if (this.disabled || this.loading) {
            return;
          }
          if (!this.overlay || !this.overlay.contains(event.target)) {
            this.overlayVisible ? this.hide() : this.show();
            utils.DomHandler.focus(this.$refs.focusInput);
          }
          this.$emit('click', event);
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
          var optionIndex = this.focusedOptionInfo.index !== -1 ? this.findNextOptionIndex(this.focusedOptionInfo.index) : this.findFirstFocusedOptionIndex();
          this.changeFocusedOptionIndex(event, optionIndex);
          !this.overlayVisible && this.show();
          event.preventDefault();
        },
        onArrowUpKey: function onArrowUpKey(event) {
          if (event.altKey) {
            if (this.focusedOptionInfo.index !== -1) {
              var processedOption = this.visibleOptions[this.focusedOptionInfo.index];
              var grouped = this.isProccessedOptionGroup(processedOption);
              !grouped && this.onOptionChange({
                originalEvent: event,
                processedOption: processedOption
              });
            }
            this.overlayVisible && this.hide();
            event.preventDefault();
          } else {
            var optionIndex = this.focusedOptionInfo.index !== -1 ? this.findPrevOptionIndex(this.focusedOptionInfo.index) : this.findLastFocusedOptionIndex();
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
            event.preventDefault();
          }
        },
        onArrowLeftKey: function onArrowLeftKey(event) {
          var _this2 = this;
          if (this.overlayVisible) {
            var processedOption = this.visibleOptions[this.focusedOptionInfo.index];
            var parentOption = this.activeOptionPath.find(function (p) {
              return p.key === processedOption.parentKey;
            });
            var matched = this.focusedOptionInfo.parentKey === '' || parentOption && parentOption.key === this.focusedOptionInfo.parentKey;
            var root = utils.ObjectUtils.isEmpty(processedOption.parent);
            if (matched) {
              this.activeOptionPath = this.activeOptionPath.filter(function (p) {
                return p.parentKey !== _this2.focusedOptionInfo.parentKey;
              });
            }
            if (!root) {
              this.focusedOptionInfo = {
                index: -1,
                parentKey: parentOption ? parentOption.parentKey : ''
              };
              this.searchValue = '';
              this.onArrowDownKey(event);
            }
            event.preventDefault();
          }
        },
        onArrowRightKey: function onArrowRightKey(event) {
          if (this.overlayVisible) {
            var processedOption = this.visibleOptions[this.focusedOptionInfo.index];
            var grouped = this.isProccessedOptionGroup(processedOption);
            if (grouped) {
              var matched = this.activeOptionPath.some(function (p) {
                return processedOption.key === p.key;
              });
              if (matched) {
                this.focusedOptionInfo = {
                  index: -1,
                  parentKey: processedOption.key
                };
                this.searchValue = '';
                this.onArrowDownKey(event);
              } else {
                this.onOptionChange({
                  originalEvent: event,
                  processedOption: processedOption
                });
              }
            }
            event.preventDefault();
          }
        },
        onHomeKey: function onHomeKey(event) {
          this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
          !this.overlayVisible && this.show();
          event.preventDefault();
        },
        onEndKey: function onEndKey(event) {
          this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
          !this.overlayVisible && this.show();
          event.preventDefault();
        },
        onEnterKey: function onEnterKey(event) {
          if (!this.overlayVisible) {
            this.onArrowDownKey(event);
          } else {
            if (this.focusedOptionInfo.index !== -1) {
              var processedOption = this.visibleOptions[this.focusedOptionInfo.index];
              var grouped = this.isProccessedOptionGroup(processedOption);
              this.onOptionChange({
                originalEvent: event,
                processedOption: processedOption
              });
              !grouped && this.hide();
            }
          }
          event.preventDefault();
        },
        onSpaceKey: function onSpaceKey(event) {
          this.onEnterKey(event);
        },
        onEscapeKey: function onEscapeKey(event) {
          this.overlayVisible && this.hide(true);
          event.preventDefault();
        },
        onTabKey: function onTabKey(event) {
          if (this.focusedOptionInfo.index !== -1) {
            var processedOption = this.visibleOptions[this.focusedOptionInfo.index];
            var grouped = this.isProccessedOptionGroup(processedOption);
            !grouped && this.onOptionChange({
              originalEvent: event,
              processedOption: processedOption
            });
          }
          this.overlayVisible && this.hide();
        },
        onOverlayEnter: function onOverlayEnter(el) {
          utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
          utils.DomHandler.addStyles(el, {
            position: 'absolute',
            top: '0',
            left: '0'
          });
          this.alignOverlay();
          this.scrollInView();
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
          this.dirty = false;
        },
        onOverlayAfterLeave: function onOverlayAfterLeave(el) {
          utils.ZIndexUtils.clear(el);
        },
        alignOverlay: function alignOverlay() {
          if (this.appendTo === 'self') {
            utils.DomHandler.relativePosition(this.overlay, this.$el);
          } else {
            this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
            utils.DomHandler.absolutePosition(this.overlay, this.$el);
          }
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this3 = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this3.overlayVisible && _this3.overlay && !_this3.$el.contains(event.target) && !_this3.overlay.contains(event.target)) {
                _this3.hide();
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
          var _this4 = this;
          if (!this.scrollHandler) {
            this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
              if (_this4.overlayVisible) {
                _this4.hide();
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
          var _this5 = this;
          if (!this.resizeListener) {
            this.resizeListener = function () {
              if (_this5.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                _this5.hide();
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
        isOptionMatched: function isOptionMatched(processedOption) {
          return this.isValidOption(processedOption) && this.getProccessedOptionLabel(processedOption).toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
        },
        isValidOption: function isValidOption(processedOption) {
          return !!processedOption && !this.isOptionDisabled(processedOption.option);
        },
        isValidSelectedOption: function isValidSelectedOption(processedOption) {
          return this.isValidOption(processedOption) && this.isSelected(processedOption);
        },
        isSelected: function isSelected(processedOption) {
          return this.activeOptionPath.some(function (p) {
            return p.key === processedOption.key;
          });
        },
        findFirstOptionIndex: function findFirstOptionIndex() {
          var _this6 = this;
          return this.visibleOptions.findIndex(function (processedOption) {
            return _this6.isValidOption(processedOption);
          });
        },
        findLastOptionIndex: function findLastOptionIndex() {
          var _this7 = this;
          return utils.ObjectUtils.findLastIndex(this.visibleOptions, function (processedOption) {
            return _this7.isValidOption(processedOption);
          });
        },
        findNextOptionIndex: function findNextOptionIndex(index) {
          var _this8 = this;
          var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (processedOption) {
            return _this8.isValidOption(processedOption);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        },
        findPrevOptionIndex: function findPrevOptionIndex(index) {
          var _this9 = this;
          var matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (processedOption) {
            return _this9.isValidOption(processedOption);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findSelectedOptionIndex: function findSelectedOptionIndex() {
          var _this10 = this;
          return this.visibleOptions.findIndex(function (processedOption) {
            return _this10.isValidSelectedOption(processedOption);
          });
        },
        findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
          var selectedIndex = this.findSelectedOptionIndex();
          return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        },
        findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
          var selectedIndex = this.findSelectedOptionIndex();
          return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        },
        findOptionPathByValue: function findOptionPathByValue(value, processedOptions) {
          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          processedOptions = processedOptions || level === 0 && this.processedOptions;
          if (!processedOptions) return null;
          if (utils.ObjectUtils.isEmpty(value)) return [];
          for (var i = 0; i < processedOptions.length; i++) {
            var processedOption = processedOptions[i];
            if (utils.ObjectUtils.equals(value, this.getOptionValue(processedOption.option), this.equalityKey)) {
              return [processedOption];
            }
            var matchedOptions = this.findOptionPathByValue(value, processedOption.children, level + 1);
            if (matchedOptions) {
              matchedOptions.unshift(processedOption);
              return matchedOptions;
            }
          }
        },
        searchOptions: function searchOptions(event, _char) {
          var _this11 = this;
          this.searchValue = (this.searchValue || '') + _char;
          var optionIndex = -1;
          var matched = false;
          if (this.focusedOptionInfo.index !== -1) {
            optionIndex = this.visibleOptions.slice(this.focusedOptionInfo.index).findIndex(function (processedOption) {
              return _this11.isOptionMatched(processedOption);
            });
            optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionInfo.index).findIndex(function (processedOption) {
              return _this11.isOptionMatched(processedOption);
            }) : optionIndex + this.focusedOptionInfo.index;
          } else {
            optionIndex = this.visibleOptions.findIndex(function (processedOption) {
              return _this11.isOptionMatched(processedOption);
            });
          }
          if (optionIndex !== -1) {
            matched = true;
          }
          if (optionIndex === -1 && this.focusedOptionInfo.index === -1) {
            optionIndex = this.findFirstFocusedOptionIndex();
          }
          if (optionIndex !== -1) {
            this.changeFocusedOptionIndex(event, optionIndex);
          }
          if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
          }
          this.searchTimeout = setTimeout(function () {
            _this11.searchValue = '';
            _this11.searchTimeout = null;
          }, 500);
          return matched;
        },
        changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
          if (this.focusedOptionInfo.index !== index) {
            this.focusedOptionInfo.index = index;
            this.scrollInView();
            if (this.selectOnFocus) {
              this.onOptionChange({
                originalEvent: event,
                processedOption: this.visibleOptions[index],
                isHide: false
              });
            }
          }
        },
        scrollInView: function scrollInView() {
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
          var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedOptionId;
          var element = utils.DomHandler.findSingle(this.list, "li[id=\"".concat(id, "\"]"));
          if (element) {
            element.scrollIntoView && element.scrollIntoView({
              block: 'nearest',
              inline: 'start'
            });
          }
        },
        autoUpdateModel: function autoUpdateModel() {
          if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
            this.focusedOptionInfo.index = this.findFirstFocusedOptionIndex();
            this.onOptionChange({
              processedOption: this.visibleOptions[this.focusedOptionInfo.index],
              isHide: false
            });
            !this.overlayVisible && (this.focusedOptionInfo = {
              index: -1,
              level: 0,
              parentKey: ''
            });
          }
        },
        updateModel: function updateModel(event, value) {
          this.$emit('update:modelValue', value);
          this.$emit('change', {
            originalEvent: event,
            value: value
          });
        },
        createProcessedOptions: function createProcessedOptions(options) {
          var _this12 = this;
          var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
          var processedOptions = [];
          options && options.forEach(function (option, index) {
            var key = (parentKey !== '' ? parentKey + '_' : '') + index;
            var newOption = {
              option: option,
              index: index,
              level: level,
              key: key,
              parent: parent,
              parentKey: parentKey
            };
            newOption['children'] = _this12.createProcessedOptions(_this12.getOptionGroupChildren(option, level), level + 1, newOption, key);
            processedOptions.push(newOption);
          });
          return processedOptions;
        },
        overlayRef: function overlayRef(el) {
          this.overlay = el;
        }
      },
      computed: {
        hasSelectedOption: function hasSelectedOption() {
          return utils.ObjectUtils.isNotEmpty(this.modelValue);
        },
        label: function label() {
          var label = this.placeholder || 'p-emptylabel';
          if (this.hasSelectedOption) {
            var activeOptionPath = this.findOptionPathByValue(this.modelValue);
            var processedOption = utils.ObjectUtils.isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;
            return processedOption ? this.getOptionLabel(processedOption.option) : label;
          }
          return label;
        },
        processedOptions: function processedOptions() {
          return this.createProcessedOptions(this.options || []);
        },
        visibleOptions: function visibleOptions() {
          var _this13 = this;
          var processedOption = this.activeOptionPath.find(function (p) {
            return p.key === _this13.focusedOptionInfo.parentKey;
          });
          return processedOption ? processedOption.children : this.processedOptions;
        },
        equalityKey: function equalityKey() {
          return this.optionValue ? null : this.dataKey;
        },
        searchResultMessageText: function searchResultMessageText() {
          return utils.ObjectUtils.isNotEmpty(this.visibleOptions) ? this.searchMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptySearchMessageText;
        },
        searchMessageText: function searchMessageText() {
          return this.searchMessage || this.$primevue.config.locale.searchMessage || '';
        },
        emptySearchMessageText: function emptySearchMessageText() {
          return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || '';
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
          return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
        },
        focusedOptionId: function focusedOptionId() {
          return this.focusedOptionInfo.index !== -1 ? "".concat(this.id).concat(utils.ObjectUtils.isNotEmpty(this.focusedOptionInfo.parentKey) ? '_' + this.focusedOptionInfo.parentKey : '', "_").concat(this.focusedOptionInfo.index) : null;
        }
      },
      components: {
        CascadeSelectSub: script$1,
        Portal: Portal__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"],
        SpinnerIcon: SpinnerIcon__default["default"],
        AngleRightIcon: AngleRightIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["id", "disabled", "placeholder", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
      var _component_CascadeSelectSub = vue.resolveComponent("CascadeSelectSub");
      var _component_Portal = vue.resolveComponent("Portal");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        "class": _ctx.cx('root'),
        style: _ctx.sx('root'),
        onClick: _cache[5] || (_cache[5] = function ($event) {
          return $options.onContainerClick($event);
        })
      }, _ctx.ptm('root'), {
        "data-pc-name": "cascadeselect"
      }), [vue.createElementVNode("div", vue.mergeProps({
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenInputWrapper'), {
        "data-p-hidden-accessible": true
      }), [vue.createElementVNode("input", vue.mergeProps({
        ref: "focusInput",
        id: _ctx.inputId,
        type: "text",
        "class": _ctx.inputClass,
        style: _ctx.inputStyle,
        readonly: "",
        disabled: _ctx.disabled,
        placeholder: _ctx.placeholder,
        tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
        role: "combobox",
        "aria-label": _ctx.ariaLabel,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-haspopup": "tree",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $data.id + '_tree',
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        onFocus: _cache[0] || (_cache[0] = function () {
          return $options.onFocus && $options.onFocus.apply($options, arguments);
        }),
        onBlur: _cache[1] || (_cache[1] = function () {
          return $options.onBlur && $options.onBlur.apply($options, arguments);
        }),
        onKeydown: _cache[2] || (_cache[2] = function () {
          return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
        })
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), null, 16, _hoisted_1)], 16), vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('label')
      }, _ctx.ptm('label')), [vue.renderSlot(_ctx.$slots, "value", {
        value: _ctx.modelValue,
        placeholder: _ctx.placeholder
      }, function () {
        return [vue.createTextVNode(vue.toDisplayString($options.label), 1)];
      })], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('dropdownButton'),
        role: "button",
        tabindex: "-1",
        "aria-hidden": "true"
      }, _ctx.ptm('dropdownButton')), [_ctx.loading ? vue.renderSlot(_ctx.$slots, "loadingicon", {
        key: 0,
        "class": vue.normalizeClass(_ctx.cx('loadingIcon'))
      }, function () {
        return [_ctx.loadingIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('loadingIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
          key: 1,
          "class": _ctx.cx('loadingIcon'),
          spin: "",
          "aria-hidden": "true"
        }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
      }) : vue.renderSlot(_ctx.$slots, "dropdownicon", {
        key: 1,
        "class": vue.normalizeClass(_ctx.cx('dropdownIcon'))
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.dropdownIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
          "class": [_ctx.cx('dropdownIcon'), _ctx.dropdownIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('dropdownIcon')), null, 16, ["class"]))];
      })], 16), vue.createElementVNode("span", vue.mergeProps({
        role: "status",
        "aria-live": "polite",
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenSearchResult'), {
        "data-p-hidden-accessible": true
      }), vue.toDisplayString($options.searchResultMessageText), 17), vue.createVNode(_component_Portal, {
        appendTo: _ctx.appendTo
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(vue.Transition, {
            name: "p-connected-overlay",
            onEnter: $options.onOverlayEnter,
            onAfterEnter: $options.onOverlayAfterEnter,
            onLeave: $options.onOverlayLeave,
            onAfterLeave: $options.onOverlayAfterLeave
          }, {
            "default": vue.withCtx(function () {
              return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.overlayRef,
                "class": [_ctx.cx('panel'), _ctx.panelClass],
                style: _ctx.panelStyle,
                onClick: _cache[3] || (_cache[3] = function () {
                  return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
                }),
                onKeydown: _cache[4] || (_cache[4] = function () {
                  return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('wrapper')
              }, _ctx.ptm('wrapper')), [vue.createVNode(_component_CascadeSelectSub, {
                id: $data.id + '_tree',
                role: "tree",
                "aria-orientation": "horizontal",
                selectId: $data.id,
                focusedOptionId: $data.focused ? $options.focusedOptionId : undefined,
                options: $options.processedOptions,
                activeOptionPath: $data.activeOptionPath,
                level: 0,
                templates: _ctx.$slots,
                optionLabel: _ctx.optionLabel,
                optionValue: _ctx.optionValue,
                optionDisabled: _ctx.optionDisabled,
                optionGroupIcon: _ctx.optionGroupIcon,
                optionGroupLabel: _ctx.optionGroupLabel,
                optionGroupChildren: _ctx.optionGroupChildren,
                onOptionChange: $options.onOptionChange,
                pt: _ctx.pt
              }, null, 8, ["id", "selectId", "focusedOptionId", "options", "activeOptionPath", "templates", "optionLabel", "optionValue", "optionDisabled", "optionGroupIcon", "optionGroupLabel", "optionGroupChildren", "onOptionChange", "pt"])], 16), vue.createElementVNode("span", vue.mergeProps({
                role: "status",
                "aria-live": "polite",
                "class": "p-hidden-accessible"
              }, _ctx.ptm('hiddenSelectedMessage'), {
                "data-p-hidden-accessible": true
              }), vue.toDisplayString($options.selectedMessageText), 17)], 16)) : vue.createCommentVNode("", true)];
            }),
            _: 1
          }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
        }),
        _: 1
      }, 8, ["appendTo"])], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.angleright, primevue.icons.chevrondown, primevue.icons.spinner, primevue.overlayeventbus, primevue.portal, primevue.utils, primevue.basecomponent, primevue.usestyle, primevue.ripple, Vue);
