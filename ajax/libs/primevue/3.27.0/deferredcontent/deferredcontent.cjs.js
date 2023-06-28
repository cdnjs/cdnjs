'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'DeferredContent',
    extends: BaseComponent__default["default"],
    emits: ['load'],
    data() {
        return {
            loaded: false
        };
    },
    mounted() {
        if (!this.loaded) {
            if (this.shouldLoad()) this.load();
            else this.bindScrollListener();
        }
    },
    beforeUnmount() {
        this.unbindScrollListener();
    },
    methods: {
        bindScrollListener() {
            this.documentScrollListener = () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.unbindScrollListener();
                }
            };

            window.addEventListener('scroll', this.documentScrollListener);
        },
        unbindScrollListener() {
            if (this.documentScrollListener) {
                window.removeEventListener('scroll', this.documentScrollListener);
                this.documentScrollListener = null;
            }
        },
        shouldLoad() {
            if (this.loaded) {
                return false;
            } else {
                const rect = this.$refs.container.getBoundingClientRect();
                const docElement = document.documentElement;
                const winHeight = docElement.clientHeight;

                return winHeight >= rect.top;
            }
        },
        load(event) {
            this.loaded = true;
            this.$emit('load', event);
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ ref: "container" }, _ctx.ptm('root')), [
    ($data.loaded)
      ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
      : vue.createCommentVNode("", true)
  ], 16))
}

script.render = render;

module.exports = script;
