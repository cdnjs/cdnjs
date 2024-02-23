this.primevue = this.primevue || {};
this.primevue.avatargroup = (function (AvatarGroupStyle, BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var AvatarGroupStyle__default = /*#__PURE__*/_interopDefaultLegacy(AvatarGroupStyle);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script$1 = {
      name: 'BaseAvatarGroup',
      "extends": BaseComponent__default["default"],
      style: AvatarGroupStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'AvatarGroup',
      "extends": script$1,
      inheritAttrs: false
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
    }

    script.render = render;

    return script;

})(primevue.avatargroup.style, primevue.basecomponent, Vue);
