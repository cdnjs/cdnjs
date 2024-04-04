this.primevue = this.primevue || {};
this.primevue.accordiontab = (function (AccordionTabStyle, BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var AccordionTabStyle__default = /*#__PURE__*/_interopDefaultLegacy(AccordionTabStyle);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script$1 = {
      name: 'BaseAccordionTab',
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
      },
      style: AccordionTabStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'AccordionTab',
      "extends": script$1,
      inheritAttrs: false
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.renderSlot(_ctx.$slots, "default");
    }

    script.render = render;

    return script;

})(primevue.accordiontab.style, primevue.basecomponent, Vue);
