'use strict';

var AvatarStyle = require('primevue/avatar/style');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var AvatarStyle__default = /*#__PURE__*/_interopDefaultLegacy(AvatarStyle);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseAvatar',
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
  style: AvatarStyle__default["default"],
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
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
    return [_ctx.label ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      "class": _ctx.cx('label')
    }, _ctx.ptm('label')), vue.toDisplayString(_ctx.label), 17)) : _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
      key: 1,
      "class": vue.normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["class"])) : _ctx.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 2,
      "class": [_ctx.cx('icon'), _ctx.icon]
    }, _ctx.ptm('icon')), null, 16)) : _ctx.image ? (vue.openBlock(), vue.createElementBlock("img", vue.mergeProps({
      key: 3,
      src: _ctx.image,
      alt: _ctx.ariaLabel,
      onError: _cache[0] || (_cache[0] = function () {
        return $options.onError && $options.onError.apply($options, arguments);
      })
    }, _ctx.ptm('image')), null, 16, _hoisted_2)) : vue.createCommentVNode("", true)];
  })], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
