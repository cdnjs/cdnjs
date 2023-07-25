this.primevue = this.primevue || {};
this.primevue.button = (function (Badge, SpinnerIcon, Ripple, BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Badge__default = /*#__PURE__*/_interopDefaultLegacy(Badge);
    var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var classes = {
      root: function root(_ref) {
        var _ref2;
        var instance = _ref.instance,
          props = _ref.props;
        return ['p-button p-component', (_ref2 = {
          'p-button-icon-only': instance.hasIcon && !props.label && !props.badge,
          'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
          'p-disabled': instance.$attrs.disabled || instance.$attrs.disabled === '' || props.loading,
          'p-button-loading': props.loading,
          'p-button-loading-label-only': props.loading && !instance.hasIcon && props.label,
          'p-button-link': props.link
        }, _defineProperty(_ref2, "p-button-".concat(props.severity), props.severity), _defineProperty(_ref2, 'p-button-raised', props.raised), _defineProperty(_ref2, 'p-button-rounded', props.rounded), _defineProperty(_ref2, 'p-button-text', props.text), _defineProperty(_ref2, 'p-button-outlined', props.outlined), _defineProperty(_ref2, 'p-button-sm', props.size === 'small'), _defineProperty(_ref2, 'p-button-lg', props.size === 'large'), _defineProperty(_ref2, 'p-button-plain', props.plain), _ref2)];
      },
      loadingIcon: 'p-button-loading-icon pi-spin',
      icon: function icon(_ref3) {
        var props = _ref3.props;
        return ['p-button-icon', {
          'p-button-icon-left': props.iconPos === 'left' && props.label,
          'p-button-icon-right': props.iconPos === 'right' && props.label,
          'p-button-icon-top': props.iconPos === 'top' && props.label,
          'p-button-icon-bottom': props.iconPos === 'bottom' && props.label
        }];
      },
      label: 'p-button-label'
    };
    var script$1 = {
      name: 'BaseButton',
      "extends": BaseComponent__default["default"],
      props: {
        label: {
          type: String,
          "default": null
        },
        icon: {
          type: String,
          "default": null
        },
        iconPos: {
          type: String,
          "default": 'left'
        },
        iconClass: {
          type: String,
          "default": null
        },
        badge: {
          type: String,
          "default": null
        },
        badgeClass: {
          type: String,
          "default": null
        },
        loading: {
          type: Boolean,
          "default": false
        },
        loadingIcon: {
          type: String,
          "default": undefined
        },
        link: {
          type: Boolean,
          "default": false
        },
        severity: {
          type: String,
          "default": null
        },
        raised: {
          type: Boolean,
          "default": false
        },
        rounded: {
          type: Boolean,
          "default": false
        },
        text: {
          type: Boolean,
          "default": false
        },
        outlined: {
          type: Boolean,
          "default": false
        },
        size: {
          type: String,
          "default": null
        },
        plain: {
          type: Boolean,
          "default": false
        }
      },
      css: {
        classes: classes
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Button',
      "extends": script$1,
      methods: {
        getPTOptions: function getPTOptions(key) {
          return this.ptm(key, {
            context: {
              disabled: this.disabled
            }
          });
        }
      },
      computed: {
        disabled: function disabled() {
          return this.$attrs.disabled || this.$attrs.disabled === '' || this.loading;
        },
        defaultAriaLabel: function defaultAriaLabel() {
          return this.label ? this.label + (this.badge ? ' ' + this.badge : '') : this.$attrs['aria-label'];
        },
        hasIcon: function hasIcon() {
          return this.icon || this.$slots.icon;
        }
      },
      components: {
        SpinnerIcon: SpinnerIcon__default["default"],
        Badge: Badge__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    var _hoisted_1 = ["aria-label", "disabled", "data-pc-severity"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
      var _component_Badge = vue.resolveComponent("Badge");
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        "class": _ctx.cx('root'),
        type: "button",
        "aria-label": $options.defaultAriaLabel,
        disabled: $options.disabled
      }, $options.getPTOptions('root'), {
        "data-pc-name": "button",
        "data-pc-severity": _ctx.severity
      }), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
        return [_ctx.loading ? vue.renderSlot(_ctx.$slots, "loadingicon", {
          key: 0,
          "class": vue.normalizeClass([_ctx.cx('loadingIcon'), _ctx.cx('icon')])
        }, function () {
          return [_ctx.loadingIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
            key: 0,
            "class": [_ctx.cx('loadingIcon'), _ctx.cx('icon'), _ctx.loadingIcon]
          }, _ctx.ptm('loadingIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
            key: 1,
            "class": [_ctx.cx('loadingIcon'), _ctx.cx('icon')],
            spin: ""
          }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
        }) : vue.renderSlot(_ctx.$slots, "icon", {
          key: 1,
          "class": vue.normalizeClass(_ctx.cx('icon'))
        }, function () {
          return [_ctx.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
            key: 0,
            "class": [_ctx.cx('icon'), _ctx.icon]
          }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true)];
        }), vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('label')
        }, _ctx.ptm('label')), vue.toDisplayString(_ctx.label || ' '), 17), _ctx.badge ? (vue.openBlock(), vue.createBlock(_component_Badge, vue.mergeProps({
          key: 2,
          value: _ctx.badge,
          "class": _ctx.badgeClass,
          unstyled: _ctx.unstyled
        }, _ctx.ptm('badge')), null, 16, ["value", "class", "unstyled"])) : vue.createCommentVNode("", true)];
      })], 16, _hoisted_1)), [[_directive_ripple]]);
    }

    script.render = render;

    return script;

})(primevue.badge, primevue.icons.spinner, primevue.ripple, primevue.basecomponent, Vue);
