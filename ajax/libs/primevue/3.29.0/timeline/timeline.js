this.primevue = this.primevue || {};
this.primevue.timeline = (function (BaseComponent, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'Timeline',
        extends: BaseComponent__default["default"],
        props: {
            value: null,
            align: {
                mode: String,
                default: 'left'
            },
            layout: {
                mode: String,
                default: 'vertical'
            },
            dataKey: null
        },
        methods: {
            getKey(item, index) {
                return this.dataKey ? utils.ObjectUtils.resolveFieldData(item, this.dataKey) : index;
            }
        },
        computed: {
            containerClass() {
                return ['p-timeline p-component', 'p-timeline-' + this.align, 'p-timeline-' + this.layout];
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, (item, index) => {
          return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: $options.getKey(item, index),
            class: "p-timeline-event"
          }, _ctx.ptm('event')), [
            vue.createElementVNode("div", vue.mergeProps({ class: "p-timeline-event-opposite" }, _ctx.ptm('opposite')), [
              vue.renderSlot(_ctx.$slots, "opposite", {
                item: item,
                index: index
              })
            ], 16),
            vue.createElementVNode("div", vue.mergeProps({ class: "p-timeline-event-separator" }, _ctx.ptm('separator')), [
              vue.renderSlot(_ctx.$slots, "marker", {
                item: item,
                index: index
              }, () => [
                vue.createElementVNode("div", vue.mergeProps({ class: "p-timeline-event-marker" }, _ctx.ptm('marker')), null, 16)
              ]),
              (index !== $props.value.length - 1)
                ? vue.renderSlot(_ctx.$slots, "connector", {
                    key: 0,
                    item: item,
                    index: index
                  }, () => [
                    vue.createElementVNode("div", vue.mergeProps({ class: "p-timeline-event-connector" }, _ctx.ptm('connector')), null, 16)
                  ])
                : vue.createCommentVNode("", true)
            ], 16),
            vue.createElementVNode("div", vue.mergeProps({ class: "p-timeline-event-content" }, _ctx.ptm('content')), [
              vue.renderSlot(_ctx.$slots, "content", {
                item: item,
                index: index
              })
            ], 16)
          ], 16))
        }), 128))
      ], 16))
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

    var css_248z = "\n.p-timeline {\n    display: flex;\n    flex-grow: 1;\n    flex-direction: column;\n}\n.p-timeline-left .p-timeline-event-opposite {\n    text-align: right;\n}\n.p-timeline-left .p-timeline-event-content {\n    text-align: left;\n}\n.p-timeline-right .p-timeline-event {\n    flex-direction: row-reverse;\n}\n.p-timeline-right .p-timeline-event-opposite {\n    text-align: left;\n}\n.p-timeline-right .p-timeline-event-content {\n    text-align: right;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {\n    flex-direction: row-reverse;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {\n    text-align: right;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {\n    text-align: left;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {\n    text-align: left;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {\n    text-align: right;\n}\n.p-timeline-event {\n    display: flex;\n    position: relative;\n    min-height: 70px;\n}\n.p-timeline-event:last-child {\n    min-height: 0;\n}\n.p-timeline-event-opposite {\n    flex: 1;\n    padding: 0 1rem;\n}\n.p-timeline-event-content {\n    flex: 1;\n    padding: 0 1rem;\n}\n.p-timeline-event-separator {\n    flex: 0;\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n}\n.p-timeline-event-marker {\n    display: flex;\n    align-self: baseline;\n}\n.p-timeline-event-connector {\n    flex-grow: 1;\n}\n.p-timeline-horizontal {\n    flex-direction: row;\n}\n.p-timeline-horizontal .p-timeline-event {\n    flex-direction: column;\n    flex: 1;\n}\n.p-timeline-horizontal .p-timeline-event:last-child {\n    flex: 0;\n}\n.p-timeline-horizontal .p-timeline-event-separator {\n    flex-direction: row;\n}\n.p-timeline-horizontal .p-timeline-event-connector {\n    width: 100%;\n}\n.p-timeline-bottom .p-timeline-event {\n    flex-direction: column-reverse;\n}\n.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {\n    flex-direction: column-reverse;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.utils, Vue);
