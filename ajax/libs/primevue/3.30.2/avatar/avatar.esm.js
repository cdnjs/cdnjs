import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, renderSlot, toDisplayString, createBlock, resolveDynamicComponent, normalizeClass, createCommentVNode } from 'vue';

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
var _useStyle = useStyle(styles, {
    name: 'avatar',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, $options.getPTOptions('root'), {
    "data-pc-name": "avatar"
  }), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [_ctx.label ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label')), toDisplayString(_ctx.label), 17)) : _ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
      key: 1,
      "class": normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 2,
      "class": [_ctx.cx('icon'), _ctx.icon]
    }, $options.getPTOptions('icon')), null, 16)) : _ctx.image ? (openBlock(), createElementBlock("img", mergeProps({
      key: 3,
      src: _ctx.image,
      alt: _ctx.ariaLabel,
      onError: _cache[0] || (_cache[0] = function () {
        return $options.onError && $options.onError.apply($options, arguments);
      })
    }, $options.getPTOptions('image')), null, 16, _hoisted_2)) : createCommentVNode("", true)];
  })], 16, _hoisted_1);
}

script.render = render;

export { script as default };
