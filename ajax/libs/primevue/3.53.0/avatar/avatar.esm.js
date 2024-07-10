import AvatarStyle from 'primevue/avatar/style';
import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, renderSlot, toDisplayString, createBlock, resolveDynamicComponent, normalizeClass, createCommentVNode } from 'vue';

var script$1 = {
  name: 'BaseAvatar',
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
    image: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": 'normal'
    },
    shape: {
      type: String,
      "default": 'square'
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: AvatarStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Avatar',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['error'],
  methods: {
    onError: function onError(event) {
      this.$emit('error', event);
    }
  }
};

var _hoisted_1 = ["aria-labelledby", "aria-label"];
var _hoisted_2 = ["src", "alt"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [_ctx.label ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": _ctx.cx('label')
    }, _ctx.ptm('label')), toDisplayString(_ctx.label), 17)) : _ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
      key: 1,
      "class": normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 2,
      "class": [_ctx.cx('icon'), _ctx.icon]
    }, _ctx.ptm('icon')), null, 16)) : _ctx.image ? (openBlock(), createElementBlock("img", mergeProps({
      key: 3,
      src: _ctx.image,
      alt: _ctx.ariaLabel,
      onError: _cache[0] || (_cache[0] = function () {
        return $options.onError && $options.onError.apply($options, arguments);
      })
    }, _ctx.ptm('image')), null, 16, _hoisted_2)) : createCommentVNode("", true)];
  })], 16, _hoisted_1);
}

script.render = render;

export { script as default };
