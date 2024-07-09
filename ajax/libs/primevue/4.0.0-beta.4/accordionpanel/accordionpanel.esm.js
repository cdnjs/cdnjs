import { mergeProps, openBlock, createBlock, resolveDynamicComponent, withCtx, renderSlot, normalizeClass } from 'vue';
import AccordionPanelStyle from 'primevue/accordionpanel/style';
import BaseComponent from 'primevue/basecomponent';

var script$1 = {
  name: 'BaseAccordionPanel',
  "extends": BaseComponent,
  props: {
    value: {
      type: String,
      "default": undefined
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    as: {
      type: String,
      "default": 'DIV'
    },
    asChild: {
      type: Boolean,
      "default": false
    }
  },
  style: AccordionPanelStyle,
  provide: function provide() {
    return {
      $pcAccordionPanel: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'AccordionPanel',
  "extends": script$1,
  inheritAttrs: false,
  inject: ['$pcAccordion'],
  computed: {
    active: function active() {
      return this.$pcAccordion.isItemActive(this.value);
    },
    attrs: function attrs() {
      return mergeProps(this.a11yAttrs, this.ptmi('root', this.ptParams));
    },
    a11yAttrs: function a11yAttrs() {
      return {
        'data-pc-name': 'accordionpanel',
        'data-p-disabled': this.disabled,
        'data-p-active': this.active
      };
    },
    ptParams: function ptParams() {
      return {
        context: {
          active: this.active
        }
      };
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return !_ctx.asChild ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.as), mergeProps({
    key: 0,
    "class": _ctx.cx('root')
  }, $options.attrs), {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
  }, 16, ["class"])) : renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": normalizeClass(_ctx.cx('root')),
    active: $options.active,
    a11yAttrs: $options.a11yAttrs
  });
}

script.render = render;

export { script as default };
