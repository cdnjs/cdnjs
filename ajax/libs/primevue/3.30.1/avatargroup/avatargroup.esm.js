import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var styles = "\n.p-avatar-group .p-avatar + .p-avatar {\n    margin-left: -1rem;\n}\n\n.p-avatar-group {\n    display: flex;\n    align-items: center;\n}\n";
var classes = {
  root: 'p-avatar-group p-component'
};
var _useStyle = useStyle(styles, {
    name: 'avatargroup',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseAvatarGroup',
  "extends": BaseComponent,
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
  name: 'AvatarGroup',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "avatargroup"
  }), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
