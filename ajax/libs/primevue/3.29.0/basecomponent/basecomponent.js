this.primevue = this.primevue || {};
this.primevue.basecomponent = (function (utils, vue) {
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
            getOption(obj = {}, key = '') {
                const fKey = utils.ObjectUtils.convertToFlatCase(key);

                return obj[Object.keys(obj).find((k) => utils.ObjectUtils.convertToFlatCase(k) === fKey) || ''];
            },
            getPTValue(obj = {}, key = '', params = {}) {
                const self = utils.ObjectUtils.getItemValue(this.getOption(obj, key), params);
                const globalPT = utils.ObjectUtils.getItemValue(this.getOption(this.defaultPT, key), params);
                const merged = vue.mergeProps(self, globalPT);

                return merged;
                /*
                 * @todo: The 'class' option in self can always be more powerful to style the component easily.
                 *
                 * return self && self['class'] ? { ...merged, ...{ class: self['class'] } } : merged;
                 */
            },
            ptm(key = '', params = {}) {
                return this.getPTValue(this.pt, key, { props: this.$props, state: this.$data, ...params });
            },
            ptmo(obj = {}, key = '', params = {}) {
                return this.getPTValue(obj, key, params);
            }
        },
        computed: {
            defaultPT() {
                return utils.ObjectUtils.getItemValue(this.getOption(this.$primevue.config.pt, this.$.type.name), this.defaultsParams);
            },
            defaultsParams() {
                return { instance: this.$ };
            }
        }
    };

    return script;

})(primevue.utils, Vue);
