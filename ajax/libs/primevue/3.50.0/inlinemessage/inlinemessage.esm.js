import CheckIcon from 'primevue/icons/check';
import ExclamationTriangleIcon from 'primevue/icons/exclamationtriangle';
import InfoCircleIcon from 'primevue/icons/infocircle';
import TimesCircleIcon from 'primevue/icons/timescircle';
import BaseComponent from 'primevue/basecomponent';
import InlineMessageStyle from 'primevue/inlinemessage/style';
import { openBlock, createElementBlock, mergeProps, renderSlot, createBlock, resolveDynamicComponent, createElementVNode, createTextVNode } from 'vue';

var script$1 = {
  name: 'BaseInlineMessage',
  "extends": BaseComponent,
  props: {
    severity: {
      type: String,
      "default": 'error'
    },
    icon: {
      type: String,
      "default": undefined
    }
  },
  style: InlineMessageStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InlineMessage',
  "extends": script$1,
  inheritAttrs: false,
  timeout: null,
  data: function data() {
    return {
      visible: true
    };
  },
  mounted: function mounted() {
    var _this = this;
    if (!this.sticky) {
      setTimeout(function () {
        _this.visible = false;
      }, this.life);
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return {
        info: InfoCircleIcon,
        success: CheckIcon,
        warn: ExclamationTriangleIcon,
        error: TimesCircleIcon
      }[this.severity];
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true",
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "icon", {}, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? 'span' : $options.iconComponent), mergeProps({
      "class": _ctx.cx('icon')
    }, _ctx.ptm('icon')), null, 16, ["class"]))];
  }), createElementVNode("span", mergeProps({
    "class": _ctx.cx('text')
  }, _ctx.ptm('text')), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [createTextVNode(" ")];
  })], 16)], 16);
}

script.render = render;

export { script as default };
