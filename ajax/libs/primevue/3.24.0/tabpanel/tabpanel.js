this.primevue = this.primevue || {};
this.primevue.tabpanel = (function (vue) {
    'use strict';

    var script = {
        name: 'TabPanel',
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

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.renderSlot(_ctx.$slots, "default")
    }

    script.render = render;

    return script;

})(Vue);
