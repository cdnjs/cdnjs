this.primevue = this.primevue || {};
this.primevue.skeleton = (function (BaseComponent, SkeletonStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var SkeletonStyle__default = /*#__PURE__*/_interopDefaultLegacy(SkeletonStyle);

    var script$1 = {
      name: 'BaseSkeleton',
      "extends": BaseComponent__default["default"],
      props: {
        shape: {
          type: String,
          "default": 'rectangle'
        },
        size: {
          type: String,
          "default": null
        },
        width: {
          type: String,
          "default": '100%'
        },
        height: {
          type: String,
          "default": '1rem'
        },
        borderRadius: {
          type: String,
          "default": null
        },
        animation: {
          type: String,
          "default": 'wave'
        }
      },
      style: SkeletonStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Skeleton',
      "extends": script$1,
      inheritAttrs: false,
      computed: {
        containerStyle: function containerStyle() {
          if (this.size) return {
            width: this.size,
            height: this.size,
            borderRadius: this.borderRadius
          };else return {
            width: this.width,
            height: this.height,
            borderRadius: this.borderRadius
          };
        }
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        style: [_ctx.sx('root'), $options.containerStyle],
        "aria-hidden": "true"
      }, _ctx.ptmi('root')), null, 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.skeleton.style, Vue);
