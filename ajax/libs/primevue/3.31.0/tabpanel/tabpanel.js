this.primevue = this.primevue || {};
this.primevue.tabpanel = (function (BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script$1 = {
      name: 'BaseTabPanel',
      "extends": BaseComponent__default["default"],
      props: {
        header: null,
        headerStyle: null,
        headerClass: null,
        headerProps: null,
        headerActionProps: null,
        contentStyle: null,
        contentClass: null,
        contentProps: null,
        disabled: Boolean
      }
    };

    var script = {
      name: 'TabPanel',
      "extends": script$1
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.renderSlot(_ctx.$slots, "default");
    }

    script.render = render;

    return script;

})(primevue.basecomponent, Vue);
