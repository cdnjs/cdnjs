'use strict';

var Badge = require('primevue/badge');
var SpinnerIcon = require('primevue/icons/spinner');
var Ripple = require('primevue/ripple');
var BaseComponent = require('primevue/basecomponent');
var ButtonStyle = require('primevue/button/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Badge__default = /*#__PURE__*/_interopDefaultLegacy(Badge);
var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ButtonStyle__default = /*#__PURE__*/_interopDefaultLegacy(ButtonStyle);

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
    badgeSeverity: {
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
  style: ButtonStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Button',
  "extends": script$1,
  inheritAttrs: false,
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === 'root' ? this.ptmi : this.ptm;
      return _ptm(key, {
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
      return this.label ? this.label + (this.badge ? ' ' + this.badge : '') : this.$attrs.ariaLabel;
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

var _hoisted_1 = ["aria-label", "disabled", "data-p-severity"];
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
    "data-p-severity": _ctx.severity
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
      "class": vue.normalizeClass([_ctx.cx('icon')])
    }, function () {
      return [_ctx.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 0,
        "class": [_ctx.cx('icon'), _ctx.icon, _ctx.iconClass]
      }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true)];
    }), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('label')
    }, _ctx.ptm('label')), vue.toDisplayString(_ctx.label || ' '), 17), _ctx.badge ? (vue.openBlock(), vue.createBlock(_component_Badge, vue.mergeProps({
      key: 2,
      value: _ctx.badge,
      "class": _ctx.badgeClass,
      severity: _ctx.badgeSeverity,
      unstyled: _ctx.unstyled
    }, _ctx.ptm('badge')), null, 16, ["value", "class", "severity", "unstyled"])) : vue.createCommentVNode("", true)];
  })], 16, _hoisted_1)), [[_directive_ripple]]);
}

script.render = render;

module.exports = script;
