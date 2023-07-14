this.primevue = this.primevue || {};
this.primevue.password = (function (EyeIcon, EyeSlashIcon, InputText, OverlayEventBus, Portal, utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var EyeIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeIcon);
    var EyeSlashIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeSlashIcon);
    var InputText__default = /*#__PURE__*/_interopDefaultLegacy(InputText);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-password {\n    display: inline-flex;\n}\n\n.p-password .p-password-panel {\n    min-width: 100%;\n}\n\n.p-password-meter {\n    height: 10px;\n}\n\n.p-password-strength {\n    height: 100%;\n    width: 0;\n    transition: width 1s ease-in-out;\n}\n\n.p-fluid .p-password {\n    display: flex;\n}\n\n.p-password-input::-ms-reveal,\n.p-password-input::-ms-clear {\n    display: none;\n}\n";
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
        return ['p-password p-component p-inputwrapper', {
          'p-inputwrapper-filled': instance.filled,
          'p-inputwrapper-focus': instance.focused,
          'p-input-icon-right': props.toggleMask
        }];
      },
      input: function input(_ref3) {
        var props = _ref3.props;
        return ['p-password-input', {
          'p-disabled': props.disabled
        }];
      },
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-password-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      meter: 'p-password-meter',
      meterLabel: function meterLabel(_ref5) {
        var instance = _ref5.instance;
        return "p-password-strength ".concat(instance.meter ? instance.meter.strength : '');
      },
      info: 'p-password-info'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'password',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BasePassword',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: String,
        promptLabel: {
          type: String,
          "default": null
        },
        mediumRegex: {
          type: String,
          "default": '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})' // eslint-disable-line
        },

        strongRegex: {
          type: String,
          "default": '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' // eslint-disable-line
        },

        weakLabel: {
          type: String,
          "default": null
        },
        mediumLabel: {
          type: String,
          "default": null
        },
        strongLabel: {
          type: String,
          "default": null
        },
        feedback: {
          type: Boolean,
          "default": true
        },
        appendTo: {
          type: String,
          "default": 'body'
        },
        toggleMask: {
          type: Boolean,
          "default": false
        },
        hideIcon: {
          type: String,
          "default": undefined
        },
        showIcon: {
          type: String,
          "default": undefined
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        placeholder: {
          type: String,
          "default": null
        },
        required: {
          type: Boolean,
          "default": false
        },
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
        panelId: {
          type: String,
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

    var script = {
      name: 'Password',
      "extends": script$1,
      emits: ['update:modelValue', 'change', 'focus', 'blur', 'invalid'],
      data: function data() {
        return {
          overlayVisible: false,
          meter: null,
          infoText: null,
          focused: false,
          unmasked: false
        };
      },
      mediumCheckRegExp: null,
      strongCheckRegExp: null,
      resizeListener: null,
      scrollHandler: null,
      overlay: null,
      mounted: function mounted() {
        this.infoText = this.promptText;
        this.mediumCheckRegExp = new RegExp(this.mediumRegex);
        this.strongCheckRegExp = new RegExp(this.strongRegex);
      },
      beforeUnmount: function beforeUnmount() {
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
        onOverlayEnter: function onOverlayEnter(el) {
          utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
          utils.DomHandler.addStyles(el, {
            position: 'absolute',
            top: '0',
            left: '0'
          });
          this.alignOverlay();
          this.bindScrollListener();
          this.bindResizeListener();
        },
        onOverlayLeave: function onOverlayLeave() {
          this.unbindScrollListener();
          this.unbindResizeListener();
          this.overlay = null;
        },
        onOverlayAfterLeave: function onOverlayAfterLeave(el) {
          utils.ZIndexUtils.clear(el);
        },
        alignOverlay: function alignOverlay() {
          if (this.appendTo === 'self') {
            utils.DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
          } else {
            this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$refs.input.$el) + 'px';
            utils.DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
          }
        },
        testStrength: function testStrength(str) {
          var level = 0;
          if (this.strongCheckRegExp.test(str)) level = 3;else if (this.mediumCheckRegExp.test(str)) level = 2;else if (str.length) level = 1;
          return level;
        },
        onInput: function onInput(event) {
          this.$emit('update:modelValue', event.target.value);
        },
        onFocus: function onFocus(event) {
          this.focused = true;
          if (this.feedback) {
            this.setPasswordMeter(this.modelValue);
            this.overlayVisible = true;
          }
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.focused = false;
          if (this.feedback) {
            this.overlayVisible = false;
          }
          this.$emit('blur', event);
        },
        onKeyUp: function onKeyUp(event) {
          if (this.feedback) {
            var value = event.target.value;
            var _this$checkPasswordSt = this.checkPasswordStrength(value),
              meter = _this$checkPasswordSt.meter,
              label = _this$checkPasswordSt.label;
            this.meter = meter;
            this.infoText = label;
            if (event.code === 'Escape') {
              this.overlayVisible && (this.overlayVisible = false);
              return;
            }
            if (!this.overlayVisible) {
              this.overlayVisible = true;
            }
          }
        },
        setPasswordMeter: function setPasswordMeter() {
          if (!this.modelValue) return;
          var _this$checkPasswordSt2 = this.checkPasswordStrength(this.modelValue),
            meter = _this$checkPasswordSt2.meter,
            label = _this$checkPasswordSt2.label;
          this.meter = meter;
          this.infoText = label;
          if (!this.overlayVisible) {
            this.overlayVisible = true;
          }
        },
        checkPasswordStrength: function checkPasswordStrength(value) {
          var label = null;
          var meter = null;
          switch (this.testStrength(value)) {
            case 1:
              label = this.weakText;
              meter = {
                strength: 'weak',
                width: '33.33%'
              };
              break;
            case 2:
              label = this.mediumText;
              meter = {
                strength: 'medium',
                width: '66.66%'
              };
              break;
            case 3:
              label = this.strongText;
              meter = {
                strength: 'strong',
                width: '100%'
              };
              break;
            default:
              label = this.promptText;
              meter = null;
              break;
          }
          return {
            label: label,
            meter: meter
          };
        },
        onInvalid: function onInvalid(event) {
          this.$emit('invalid', event);
        },
        bindScrollListener: function bindScrollListener() {
          var _this = this;
          if (!this.scrollHandler) {
            this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.input.$el, function () {
              if (_this.overlayVisible) {
                _this.overlayVisible = false;
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
          var _this2 = this;
          if (!this.resizeListener) {
            this.resizeListener = function () {
              if (_this2.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                _this2.overlayVisible = false;
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
        overlayRef: function overlayRef(el) {
          this.overlay = el;
        },
        onMaskToggle: function onMaskToggle() {
          this.unmasked = !this.unmasked;
        },
        onOverlayClick: function onOverlayClick(event) {
          OverlayEventBus__default["default"].emit('overlay-click', {
            originalEvent: event,
            target: this.$el
          });
        }
      },
      computed: {
        inputType: function inputType() {
          return this.unmasked ? 'text' : 'password';
        },
        filled: function filled() {
          return this.modelValue != null && this.modelValue.toString().length > 0;
        },
        weakText: function weakText() {
          return this.weakLabel || this.$primevue.config.locale.weak;
        },
        mediumText: function mediumText() {
          return this.mediumLabel || this.$primevue.config.locale.medium;
        },
        strongText: function strongText() {
          return this.strongLabel || this.$primevue.config.locale.strong;
        },
        promptText: function promptText() {
          return this.promptLabel || this.$primevue.config.locale.passwordPrompt;
        },
        panelUniqueId: function panelUniqueId() {
          return utils.UniqueComponentId() + '_panel';
        }
      },
      components: {
        PInputText: InputText__default["default"],
        Portal: Portal__default["default"],
        EyeSlashIcon: EyeSlashIcon__default["default"],
        EyeIcon: EyeIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["id"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_PInputText = vue.resolveComponent("PInputText");
      var _component_Portal = vue.resolveComponent("Portal");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        style: _ctx.sx('root')
      }, _ctx.ptm('root'), {
        "data-pc-name": "password"
      }), [vue.createVNode(_component_PInputText, vue.mergeProps({
        ref: "input",
        id: _ctx.inputId,
        type: $options.inputType,
        "class": [_ctx.cx('input'), _ctx.inputClass],
        style: _ctx.inputStyle,
        value: _ctx.modelValue,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        "aria-controls": _ctx.panelProps && _ctx.panelProps.id || _ctx.panelId || $options.panelUniqueId,
        "aria-expanded": $data.overlayVisible,
        "aria-haspopup": true,
        placeholder: _ctx.placeholder,
        required: _ctx.required,
        onInput: $options.onInput,
        onFocus: $options.onFocus,
        onBlur: $options.onBlur,
        onKeyup: $options.onKeyUp,
        onInvalid: $options.onInvalid
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input')), {
        unstyled: _ctx.unstyled
      }), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid", "unstyled"]), _ctx.toggleMask && $data.unmasked ? vue.renderSlot(_ctx.$slots, "hideicon", {
        key: 0,
        onClick: $options.onMaskToggle
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.hideIcon ? 'i' : 'EyeSlashIcon'), vue.mergeProps({
          "class": _ctx.hideIcon,
          onClick: $options.onMaskToggle
        }, _ctx.ptm('hideIcon')), null, 16, ["class", "onClick"]))];
      }) : vue.createCommentVNode("", true), _ctx.toggleMask && !$data.unmasked ? vue.renderSlot(_ctx.$slots, "showicon", {
        key: 1,
        onClick: $options.onMaskToggle
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showIcon ? 'i' : 'EyeIcon'), vue.mergeProps({
          "class": _ctx.showIcon,
          onClick: $options.onMaskToggle
        }, _ctx.ptm('showIcon')), null, 16, ["class", "onClick"]))];
      }) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
        "class": "p-hidden-accessible",
        "aria-live": "polite"
      }, _ctx.ptm('hiddenAccesible'), {
        "data-p-hidden-accessible": true
      }), vue.toDisplayString($data.infoText), 17), vue.createVNode(_component_Portal, {
        appendTo: _ctx.appendTo
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(vue.Transition, {
            name: "p-connected-overlay",
            onEnter: $options.onOverlayEnter,
            onLeave: $options.onOverlayLeave,
            onAfterLeave: $options.onOverlayAfterLeave
          }, {
            "default": vue.withCtx(function () {
              return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.overlayRef,
                id: _ctx.panelId || $options.panelUniqueId,
                "class": [_ctx.cx('panel'), _ctx.panelClass],
                style: _ctx.panelStyle,
                onClick: _cache[0] || (_cache[0] = function () {
                  return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.renderSlot(_ctx.$slots, "header"), vue.renderSlot(_ctx.$slots, "content", {}, function () {
                return [vue.createElementVNode("div", vue.mergeProps({
                  "class": _ctx.cx('meter')
                }, _ctx.ptm('meter')), [vue.createElementVNode("div", vue.mergeProps({
                  "class": _ctx.cx('meterLabel'),
                  style: {
                    width: $data.meter ? $data.meter.width : ''
                  }
                }, _ctx.ptm('meterLabel')), null, 16)], 16), vue.createElementVNode("div", vue.mergeProps({
                  "class": _ctx.cx('info')
                }, _ctx.ptm('info')), vue.toDisplayString($data.infoText), 17)];
              }), vue.renderSlot(_ctx.$slots, "footer")], 16, _hoisted_1)) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
        }),
        _: 3
      }, 8, ["appendTo"])], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.eye, primevue.icons.eyeslash, primevue.inputtext, primevue.overlayeventbus, primevue.portal, primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
