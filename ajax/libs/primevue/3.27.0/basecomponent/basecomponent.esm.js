import { ObjectUtils } from 'primevue/utils';

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
            const fKey = ObjectUtils.convertToFlatCase(key);

            return obj[Object.keys(obj).find((k) => ObjectUtils.convertToFlatCase(k) === fKey) || ''];
        },
        ptm(key = '', params = {}) {
            return ObjectUtils.getItemValue(this.getPTItem(this.pt, key), { props: this.$props, state: this.$data, ...params });
        },
        ptmo(obj = {}, key = '', params = {}) {
            return ObjectUtils.getItemValue(this.getPTItem(obj, key), params);
        }
    }
};

export { script as default };
