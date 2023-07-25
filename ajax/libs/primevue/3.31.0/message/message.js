this.primevue = this.primevue || {};
this.primevue.message = (function (CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesIcon, TimesCircleIcon, Ripple, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
    var ExclamationTriangleIcon__default = /*#__PURE__*/_interopDefaultLegacy(ExclamationTriangleIcon);
    var InfoCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(InfoCircleIcon);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-message-wrapper {\n    display: flex;\n    align-items: center;\n}\n\n.p-message-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-message-enter-from {\n    opacity: 0;\n}\n\n.p-message-enter-active {\n    transition: opacity 0.3s;\n}\n\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n\n.p-message-leave-active {\n    overflow: hidden;\n    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;\n}\n\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return 'p-message p-component p-message-' + props.severity;
      },
      wrapper: 'p-message-wrapper',
      icon: 'p-message-icon',
      text: 'p-message-text',
      closeButton: 'p-message-close p-link',
      closeIcon: 'p-message-close-icon'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'message',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseMessage',
      "extends": BaseComponent__default["default"],
      props: {
        severity: {
          type: String,
          "default": 'info'
        },
        closable: {
          type: Boolean,
          "default": true
        },
        sticky: {
          type: Boolean,
          "default": true
        },
        life: {
          type: Number,
          "default": 3000
        },
        icon: {
          type: String,
          "default": undefined
        },
        closeIcon: {
          type: String,
          "default": undefined
        },
        closeButtonProps: {
          type: null,
          "default": null
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

    var script = {
      name: 'Message',
      "extends": script$1,
      emits: ['close'],
      timeout: null,
      data: function data() {
        return {
          visible: true
        };
      },
      mounted: function mounted() {
        if (!this.sticky) {
          this.closeAfterDelay();
        }
      },
      methods: {
        close: function close(event) {
          this.visible = false;
          this.$emit('close', event);
        },
        closeAfterDelay: function closeAfterDelay() {
          var _this = this;
          setTimeout(function () {
            _this.visible = false;
          }, this.life);
        }
      },
      computed: {
        iconComponent: function iconComponent() {
          return {
            info: InfoCircleIcon__default["default"],
            success: CheckIcon__default["default"],
            warn: ExclamationTriangleIcon__default["default"],
            error: TimesCircleIcon__default["default"]
          }[this.severity];
        },
        closeAriaLabel: function closeAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      },
      components: {
        TimesIcon: TimesIcon__default["default"],
        InfoCircleIcon: InfoCircleIcon__default["default"],
        CheckIcon: CheckIcon__default["default"],
        ExclamationTriangleIcon: ExclamationTriangleIcon__default["default"],
        TimesCircleIcon: TimesCircleIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_TimesIcon = vue.resolveComponent("TimesIcon");
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: "p-message",
        appear: ""
      }, {
        "default": vue.withCtx(function () {
          return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('root'),
            role: "alert",
            "aria-live": "assertive",
            "aria-atomic": "true"
          }, _ctx.ptm('root'), {
            "data-pc-name": "message"
          }), [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('wrapper')
          }, _ctx.ptm('wrapper')), [vue.renderSlot(_ctx.$slots, "messageicon", {
            "class": "p-message-icon"
          }, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon ? 'span' : $options.iconComponent), vue.mergeProps({
              "class": [_ctx.cx('icon'), _ctx.icon]
            }, _ctx.ptm('icon')), null, 16, ["class"]))];
          }), vue.createElementVNode("div", vue.mergeProps({
            "class": ["p-message-text", _ctx.cx('text')]
          }, _ctx.ptm('text')), [vue.renderSlot(_ctx.$slots, "default")], 16), _ctx.closable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('closeButton'),
            "aria-label": $options.closeAriaLabel,
            type: "button",
            onClick: _cache[0] || (_cache[0] = function ($event) {
              return $options.close($event);
            })
          }, _objectSpread(_objectSpread(_objectSpread({}, _ctx.closeButtonProps), _ctx.ptm('button')), _ctx.ptm('closeButton'))), [vue.renderSlot(_ctx.$slots, "closeicon", {}, function () {
            return [_ctx.closeIcon ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
              key: 0,
              "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
            }, _objectSpread(_objectSpread({}, _ctx.ptm('buttonIcon')), _ctx.ptm('closeIcon'))), null, 16)) : (vue.openBlock(), vue.createBlock(_component_TimesIcon, vue.mergeProps({
              key: 1,
              "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
            }, _objectSpread(_objectSpread({}, _ctx.ptm('buttonIcon')), _ctx.ptm('closeIcon'))), null, 16, ["class"]))];
          })], 16, _hoisted_1)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16)], 16), [[vue.vShow, $data.visible]])];
        }),
        _: 3
      });
    }

    script.render = render;

    return script;

})(primevue.icons.check, primevue.icons.exclamationtriangle, primevue.icons.infocircle, primevue.icons.times, primevue.icons.timescircle, primevue.ripple, primevue.basecomponent, primevue.usestyle, Vue);
