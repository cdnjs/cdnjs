this.primevue = this.primevue || {};
this.primevue.avatargroup = (function (BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-avatar-group .p-avatar + .p-avatar {\n    margin-left: -1rem;\n}\n\n.p-avatar-group {\n    display: flex;\n    align-items: center;\n}\n";
    var classes = {
      root: 'p-avatar-group p-component'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'avatargroup',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseAvatarGroup',
      "extends": BaseComponent__default["default"],
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
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptm('root'), {
        "data-pc-name": "avatargroup"
      }), [vue.renderSlot(_ctx.$slots, "default")], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.usestyle, Vue);
