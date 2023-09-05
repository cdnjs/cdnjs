this.primevue = this.primevue || {};
this.primevue.progressspinner = (function (BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-progress-spinner {\n    position: relative;\n    margin: 0 auto;\n    width: 100px;\n    height: 100px;\n    display: inline-block;\n}\n\n.p-progress-spinner::before {\n    content: '';\n    display: block;\n    padding-top: 100%;\n}\n\n.p-progress-spinner-svg {\n    height: 100%;\n    transform-origin: center center;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n";
    var classes = {
      root: 'p-progress-spinner',
      spinner: 'p-progress-spinner-svg',
      circle: 'p-progress-spinner-circle'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'progressspinner',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseProgressSpinner',
      "extends": BaseComponent__default["default"],
      props: {
        strokeWidth: {
          type: String,
          "default": '2'
        },
        fill: {
          type: String,
          "default": 'none'
        },
        animationDuration: {
          type: String,
          "default": '2s'
        }
      },
      css: {
        classes: classes,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ProgressSpinner',
      "extends": script$1,
      computed: {
        svgStyle: function svgStyle() {
          return {
            'animation-duration': this.animationDuration
          };
        }
      }
    };

    var _hoisted_1 = ["fill", "stroke-width"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "progressbar"
      }, _ctx.ptm('root'), {
        "data-pc-name": "progressspinner"
      }), [(vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
        "class": _ctx.cx('spinner'),
        viewBox: "25 25 50 50",
        style: $options.svgStyle
      }, _ctx.ptm('spinner')), [vue.createElementVNode("circle", vue.mergeProps({
        "class": _ctx.cx('circle'),
        cx: "50",
        cy: "50",
        r: "20",
        fill: _ctx.fill,
        "stroke-width": _ctx.strokeWidth,
        strokeMiterlimit: "10"
      }, _ctx.ptm('circle')), null, 16, _hoisted_1)], 16))], 16);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.usestyle, Vue);
