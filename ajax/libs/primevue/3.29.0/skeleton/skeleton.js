this.primevue = this.primevue || {};
this.primevue.skeleton = (function (BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'Skeleton',
        extends: BaseComponent__default["default"],
        props: {
            shape: {
                type: String,
                default: 'rectangle'
            },
            size: {
                type: String,
                default: null
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '1rem'
            },
            borderRadius: {
                type: String,
                default: null
            },
            animation: {
                type: String,
                default: 'wave'
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-skeleton p-component',
                    {
                        'p-skeleton-circle': this.shape === 'circle',
                        'p-skeleton-none': this.animation === 'none'
                    }
                ];
            },
            containerStyle() {
                if (this.size) return { width: this.size, height: this.size, borderRadius: this.borderRadius };
                else return { width: this.width, height: this.height, borderRadius: this.borderRadius };
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        style: $options.containerStyle,
        class: $options.containerClass,
        "aria-hidden": "true"
      }, _ctx.ptm('root')), null, 16))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-skeleton {\n    position: relative;\n    overflow: hidden;\n}\n.p-skeleton::after {\n    content: '';\n    animation: p-skeleton-animation 1.2s infinite;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n    transform: translateX(-100%);\n    z-index: 1;\n}\n.p-skeleton.p-skeleton-circle {\n    border-radius: 50%;\n}\n.p-skeleton-none::after {\n    animation: none;\n}\n@keyframes p-skeleton-animation {\nfrom {\n        transform: translateX(-100%);\n}\nto {\n        transform: translateX(100%);\n}\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, Vue);
