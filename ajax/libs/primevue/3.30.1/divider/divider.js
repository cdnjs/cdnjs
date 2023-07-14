this.primevue = this.primevue || {};
this.primevue.divider = (function (BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-divider-horizontal {\n    display: flex;\n    width: 100%;\n    position: relative;\n    align-items: center;\n}\n\n.p-divider-horizontal:before {\n    position: absolute;\n    display: block;\n    top: 50%;\n    left: 0;\n    width: 100%;\n    content: '';\n}\n\n.p-divider-horizontal.p-divider-left {\n    justify-content: flex-start;\n}\n\n.p-divider-horizontal.p-divider-right {\n    justify-content: flex-end;\n}\n\n.p-divider-horizontal.p-divider-center {\n    justify-content: center;\n}\n\n.p-divider-content {\n    z-index: 1;\n}\n\n.p-divider-vertical {\n    min-height: 100%;\n    margin: 0 1rem;\n    display: flex;\n    position: relative;\n    justify-content: center;\n}\n\n.p-divider-vertical:before {\n    position: absolute;\n    display: block;\n    top: 0;\n    left: 50%;\n    height: 100%;\n    content: '';\n}\n\n.p-divider-vertical.p-divider-top {\n    align-items: flex-start;\n}\n\n.p-divider-vertical.p-divider-center {\n    align-items: center;\n}\n\n.p-divider-vertical.p-divider-bottom {\n    align-items: flex-end;\n}\n\n.p-divider-solid.p-divider-horizontal:before {\n    border-top-style: solid;\n}\n\n.p-divider-solid.p-divider-vertical:before {\n    border-left-style: solid;\n}\n\n.p-divider-dashed.p-divider-horizontal:before {\n    border-top-style: dashed;\n}\n\n.p-divider-dashed.p-divider-vertical:before {\n    border-left-style: dashed;\n}\n\n.p-divider-dotted.p-divider-horizontal:before {\n    border-top-style: dotted;\n}\n\n.p-divider-dotted.p-divider-vertical:before {\n    border-left-style: dotted;\n}\n";
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-divider p-component', 'p-divider-' + props.layout, 'p-divider-' + props.type, {
          'p-divider-left': props.layout === 'horizontal' && (!props.align || props.align === 'left')
        }, {
          'p-divider-center': props.layout === 'horizontal' && props.align === 'center'
        }, {
          'p-divider-right': props.layout === 'horizontal' && props.align === 'right'
        }, {
          'p-divider-top': props.layout === 'vertical' && props.align === 'top'
        }, {
          'p-divider-center': props.layout === 'vertical' && (!props.align || props.align === 'center')
        }, {
          'p-divider-bottom': props.layout === 'vertical' && props.align === 'bottom'
        }];
      },
      content: 'p-divider-content'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'divider',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseDivider',
      "extends": BaseComponent__default["default"],
      props: {
        align: {
          type: String,
          "default": null
        },
        layout: {
          type: String,
          "default": 'horizontal'
        },
        type: {
          type: String,
          "default": 'solid'
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
      name: 'Divider',
      "extends": script$1
    };

    var _hoisted_1 = ["aria-orientation"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "separator",
        "aria-orientation": _ctx.layout
      }, _ctx.ptm('root'), {
        "data-pc-name": "divider"
      }), [_ctx.$slots["default"] ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.usestyle, Vue);
