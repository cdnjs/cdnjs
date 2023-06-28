this.primevue = this.primevue || {};
this.primevue.basecomponent = (function (utils) {
    'use strict';

    var script = {
        name: 'BaseComponent',
        props: {
            pt: {
                type: Object,
                default: undefined
            }
        },
        methods: {
            getPTItem(obj = {}, key = '') {
                const fKey = utils.ObjectUtils.convertToFlatCase(key);

                return obj[Object.keys(obj).find((k) => utils.ObjectUtils.convertToFlatCase(k) === fKey) || ''];
            },
            getPTValue(obj = {}, key = '', params = {}) {
                const self = utils.ObjectUtils.getItemValue(this.getPTItem(obj, key), params);
                const globalComponentPT = this.getPTItem(this.$primevue.config.pt, this.$.type.name);
                const global = utils.ObjectUtils.getItemValue(this.getPTItem(globalComponentPT, key), params);

                return { ...global, ...self };
            },
            ptm(key = '', params = {}) {
                return this.getPTValue(this.pt, key, { props: this.$props, state: this.$data, ...params });
            },
            ptmo(obj = {}, key = '', params = {}) {
                return this.getPTValue(obj, key, params);
            }
        }
    };

    return script;

})(primevue.utils);
