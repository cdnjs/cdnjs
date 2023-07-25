'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-avatar {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 2rem;\n    height: 2rem;\n    font-size: 1rem;\n}\n\n.p-avatar.p-avatar-image {\n    background-color: transparent;\n}\n\n.p-avatar.p-avatar-circle {\n    border-radius: 50%;\n}\n\n.p-avatar-circle img {\n    border-radius: 50%;\n}\n\n.p-avatar .p-avatar-icon {\n    font-size: 1rem;\n}\n\n.p-avatar img {\n    width: 100%;\n    height: 100%;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-avatar p-component', {
      'p-avatar-image': props.image != null,
      'p-avatar-circle': props.shape === 'circle',
      'p-avatar-lg': props.size === 'large',
      'p-avatar-xl': props.size === 'xlarge'
    }];
  },
  label: 'p-avatar-text',
  icon: 'p-avatar-icon'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'avatar',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
    'aria-labelledby': {
      type: String,
      "default": null
    },
    'aria-label': {
      type: String,
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
  name: 'Avatar',
  "extends": script$1,
  emits: ['error'],
  methods: {
    onError: function onError() {
      this.$emit('error');
    },
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        parent: {
          instance: this.$parent
        }
      });
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
  }, $options.getPTOptions('root'), {
    "data-pc-name": "avatar"
  }), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
    return [_ctx.label ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label')), vue.toDisplayString(_ctx.label), 17)) : _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
      key: 1,
      "class": vue.normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["class"])) : _ctx.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 2,
      "class": [_ctx.cx('icon'), _ctx.icon]
    }, $options.getPTOptions('icon')), null, 16)) : _ctx.image ? (vue.openBlock(), vue.createElementBlock("img", vue.mergeProps({
      key: 3,
      src: _ctx.image,
      alt: _ctx.ariaLabel,
      onError: _cache[0] || (_cache[0] = function () {
        return $options.onError && $options.onError.apply($options, arguments);
      })
    }, $options.getPTOptions('image')), null, 16, _hoisted_2)) : vue.createCommentVNode("", true)];
  })], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
