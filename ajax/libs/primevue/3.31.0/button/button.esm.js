import Badge from 'primevue/badge';
import SpinnerIcon from 'primevue/icons/spinner';
import Ripple from 'primevue/ripple';
import BaseComponent from 'primevue/basecomponent';
import { resolveComponent, resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, renderSlot, normalizeClass, createBlock, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

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
  "extends": BaseComponent,
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
    SpinnerIcon: SpinnerIcon,
    Badge: Badge
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1 = ["aria-label", "disabled", "data-pc-severity"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_Badge = resolveComponent("Badge");
  var _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", mergeProps({
    "class": _ctx.cx('root'),
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, $options.getPTOptions('root'), {
    "data-pc-name": "button",
    "data-pc-severity": _ctx.severity
  }), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [_ctx.loading ? renderSlot(_ctx.$slots, "loadingicon", {
      key: 0,
      "class": normalizeClass([_ctx.cx('loadingIcon'), _ctx.cx('icon')])
    }, function () {
      return [_ctx.loadingIcon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx('loadingIcon'), _ctx.cx('icon'), _ctx.loadingIcon]
      }, _ctx.ptm('loadingIcon')), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
        key: 1,
        "class": [_ctx.cx('loadingIcon'), _ctx.cx('icon')],
        spin: ""
      }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
    }) : renderSlot(_ctx.$slots, "icon", {
      key: 1,
      "class": normalizeClass(_ctx.cx('icon'))
    }, function () {
      return [_ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx('icon'), _ctx.icon]
      }, _ctx.ptm('icon')), null, 16)) : createCommentVNode("", true)];
    }), createElementVNode("span", mergeProps({
      "class": _ctx.cx('label')
    }, _ctx.ptm('label')), toDisplayString(_ctx.label || ' '), 17), _ctx.badge ? (openBlock(), createBlock(_component_Badge, mergeProps({
      key: 2,
      value: _ctx.badge,
      "class": _ctx.badgeClass,
      unstyled: _ctx.unstyled
    }, _ctx.ptm('badge')), null, 16, ["value", "class", "unstyled"])) : createCommentVNode("", true)];
  })], 16, _hoisted_1)), [[_directive_ripple]]);
}

script.render = render;

export { script as default };
