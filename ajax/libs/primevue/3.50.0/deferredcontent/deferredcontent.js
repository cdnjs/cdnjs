this.primevue = this.primevue || {};
this.primevue.deferredcontent = (function (BaseComponent, DeferredContentStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var DeferredContentStyle__default = /*#__PURE__*/_interopDefaultLegacy(DeferredContentStyle);

    var script = {
      name: 'DeferredContent',
      "extends": BaseComponent__default["default"],
      inheritAttrs: false,
      emits: ['load'],
      style: DeferredContentStyle__default["default"],
      data: function data() {
        return {
          loaded: false
        };
      },
      mounted: function mounted() {
        if (!this.loaded) {
          if (this.shouldLoad()) this.load();else this.bindScrollListener();
        }
      },
      beforeUnmount: function beforeUnmount() {
        this.unbindScrollListener();
      },
      methods: {
        bindScrollListener: function bindScrollListener() {
          var _this = this;
          this.documentScrollListener = function () {
            if (_this.shouldLoad()) {
              _this.load();
              _this.unbindScrollListener();
            }
          };
          window.addEventListener('scroll', this.documentScrollListener);
        },
        unbindScrollListener: function unbindScrollListener() {
          if (this.documentScrollListener) {
            window.removeEventListener('scroll', this.documentScrollListener);
            this.documentScrollListener = null;
          }
        },
        shouldLoad: function shouldLoad() {
          if (this.loaded) {
            return false;
          } else {
            var rect = this.$refs.container.getBoundingClientRect();
            var docElement = document.documentElement;
            var winHeight = docElement.clientHeight;
            return winHeight >= rect.top;
          }
        },
        load: function load(event) {
          this.loaded = true;
          this.$emit('load', event);
        }
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container"
      }, _ctx.ptmi('root')), [$data.loaded ? vue.renderSlot(_ctx.$slots, "default", {
        key: 0
      }) : vue.createCommentVNode("", true)], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.deferredcontent.style, Vue);
