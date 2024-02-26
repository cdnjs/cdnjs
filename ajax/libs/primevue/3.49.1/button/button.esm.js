import Badge from 'primevue/badge';
import SpinnerIcon from 'primevue/icons/spinner';
import Ripple from 'primevue/ripple';
import BaseComponent from 'primevue/basecomponent';
import ButtonStyle from 'primevue/button/style';
import { resolveComponent, resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, renderSlot, normalizeClass, createBlock, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

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
  style: ButtonStyle,
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
    SpinnerIcon: SpinnerIcon,
    Badge: Badge
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1 = ["aria-label", "disabled", "data-p-severity"];
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
    "data-p-severity": _ctx.severity
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
      "class": normalizeClass([_ctx.cx('icon')])
    }, function () {
      return [_ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx('icon'), _ctx.icon, _ctx.iconClass]
      }, _ctx.ptm('icon')), null, 16)) : createCommentVNode("", true)];
    }), createElementVNode("span", mergeProps({
      "class": _ctx.cx('label')
    }, _ctx.ptm('label')), toDisplayString(_ctx.label || ' '), 17), _ctx.badge ? (openBlock(), createBlock(_component_Badge, mergeProps({
      key: 2,
      value: _ctx.badge,
      "class": _ctx.badgeClass,
      severity: _ctx.badgeSeverity,
      unstyled: _ctx.unstyled
    }, _ctx.ptm('badge')), null, 16, ["value", "class", "severity", "unstyled"])) : createCommentVNode("", true)];
  })], 16, _hoisted_1)), [[_directive_ripple]]);
}

script.render = render;

export { script as default };
