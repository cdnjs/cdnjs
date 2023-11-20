this.primevue = this.primevue || {};
this.primevue.togglebutton = (function (Ripple, BaseComponent, ToggleButtonStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ToggleButtonStyle__default = /*#__PURE__*/_interopDefaultLegacy(ToggleButtonStyle);

    var script$1 = {
      name: 'BaseToggleButton',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: Boolean,
        onIcon: String,
        offIcon: String,
        onLabel: {
          type: String,
          "default": 'Yes'
        },
        offLabel: {
          type: String,
          "default": 'No'
        },
        iconPos: {
          type: String,
          "default": 'left'
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        tabindex: {
          type: Number,
          "default": null
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
        'aria-labelledby': {
          type: String,
          "default": null
        },
        'aria-label': {
          type: String,
          "default": null
        }
      },
      style: ToggleButtonStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ToggleButton',
      "extends": script$1,
      emits: ['update:modelValue', 'change', 'click', 'focus', 'blur'],
      outsideClickListener: null,
      data: function data() {
        return {
          focused: false
        };
      },
      mounted: function mounted() {
        this.bindOutsideClickListener();
      },
      beforeUnmount: function beforeUnmount() {
        this.unbindOutsideClickListener();
      },
      methods: {
        onClick: function onClick(event) {
          if (!this.disabled) {
            this.$emit('update:modelValue', !this.modelValue);
            this.$emit('change', event);
            this.$emit('click', event);
            this.focused = true;
          }
        },
        onFocus: function onFocus(event) {
          this.focused = true;
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.focused = false;
          this.$emit('blur', event);
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this.focused && !_this.$refs.container.contains(event.target)) {
                _this.focused = false;
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
        }
      },
      computed: {
        hasLabel: function hasLabel() {
          return this.onLabel && this.onLabel.length > 0 && this.offLabel && this.offLabel.length > 0;
        },
        hasIcon: function hasIcon() {
          return this.$slots.icon || this.onIcon && this.offIcon;
        },
        label: function label() {
          return this.hasLabel ? this.modelValue ? this.onLabel : this.offLabel : '&nbsp;';
        },
        getPTOptions: function getPTOptions() {
          return {
            context: {
              focused: this.focused,
              disabled: this.disabled,
              highlighted: this.modelValue === true
            }
          };
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["data-p-active"];
    var _hoisted_2 = ["id", "checked", "value", "aria-labelledby", "aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        "class": _ctx.cx('root'),
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.onClick($event);
        })
      }, _ctx.ptm('root', $options.getPTOptions), {
        "data-p-active": _ctx.modelValue === true,
        "data-pc-name": "togglebutton"
      }), [vue.createElementVNode("span", vue.mergeProps({
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenInputWrapper'), {
        "data-p-hidden-accessible": true
      }), [vue.createElementVNode("input", vue.mergeProps({
        id: _ctx.inputId,
        type: "checkbox",
        role: "switch",
        "class": _ctx.inputClass,
        style: _ctx.inputStyle,
        checked: _ctx.modelValue,
        value: _ctx.modelValue,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        onFocus: _cache[0] || (_cache[0] = function ($event) {
          return $options.onFocus($event);
        }),
        onBlur: _cache[1] || (_cache[1] = function ($event) {
          return $options.onBlur($event);
        })
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_2)], 16), vue.renderSlot(_ctx.$slots, "icon", {
        value: _ctx.modelValue,
        "class": vue.normalizeClass(_ctx.cx('icon'))
      }, function () {
        return [_ctx.onIcon || _ctx.offIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          "class": [_ctx.cx('icon'), _ctx.modelValue ? _ctx.onIcon : _ctx.offIcon]
        }, _ctx.ptm('icon', $options.getPTOptions)), null, 16)) : vue.createCommentVNode("", true)];
      }), vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('label')
      }, _ctx.ptm('label', $options.getPTOptions)), vue.toDisplayString($options.label), 17)], 16, _hoisted_1)), [[_directive_ripple]]);
    }

    script.render = render;

    return script;

})(primevue.ripple, primevue.basecomponent, primevue.togglebutton.style, Vue);
