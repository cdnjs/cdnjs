this.primevue = this.primevue || {};
this.primevue.basecomponent = (function (utils) {
    'use strict';

    var script = {
        name: 'BaseComponent',
        props: {
            pt: {
                type: Object,
                value: {}
            }
        },
        methods: {
            getPTItem(obj = {}, key = '') {
                const fKey = utils.ObjectUtils.convertToFlatCase(key);

                return obj[Object.keys(obj).find((k) => utils.ObjectUtils.convertToFlatCase(k) === fKey) || ''];
            },
            ptm(key = '', params = {}) {
                return utils.ObjectUtils.getItemValue(this.getPTItem(this.pt, key), { props: this.$props, state: this.$data, ...params });
            },
            ptmo(obj = {}, key = '', params = {}) {
                return utils.ObjectUtils.getItemValue(this.getPTItem(obj, key), params);
            }
        }
    };

    return script;

})(primevue.utils);
