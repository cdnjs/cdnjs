import { ObjectUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, renderSlot, createCommentVNode } from 'vue';

var styles = "\n.p-timeline {\n    display: flex;\n    flex-grow: 1;\n    flex-direction: column;\n}\n\n.p-timeline-left .p-timeline-event-opposite {\n    text-align: right;\n}\n\n.p-timeline-left .p-timeline-event-content {\n    text-align: left;\n}\n\n.p-timeline-right .p-timeline-event {\n    flex-direction: row-reverse;\n}\n\n.p-timeline-right .p-timeline-event-opposite {\n    text-align: left;\n}\n\n.p-timeline-right .p-timeline-event-content {\n    text-align: right;\n}\n\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {\n    flex-direction: row-reverse;\n}\n\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {\n    text-align: right;\n}\n\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {\n    text-align: left;\n}\n\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {\n    text-align: left;\n}\n\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {\n    text-align: right;\n}\n\n.p-timeline-event {\n    display: flex;\n    position: relative;\n    min-height: 70px;\n}\n\n.p-timeline-event:last-child {\n    min-height: 0;\n}\n\n.p-timeline-event-opposite {\n    flex: 1;\n    padding: 0 1rem;\n}\n\n.p-timeline-event-content {\n    flex: 1;\n    padding: 0 1rem;\n}\n\n.p-timeline-event-separator {\n    flex: 0;\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n}\n\n.p-timeline-event-marker {\n    display: flex;\n    align-self: baseline;\n}\n\n.p-timeline-event-connector {\n    flex-grow: 1;\n}\n\n.p-timeline-horizontal {\n    flex-direction: row;\n}\n\n.p-timeline-horizontal .p-timeline-event {\n    flex-direction: column;\n    flex: 1;\n}\n\n.p-timeline-horizontal .p-timeline-event:last-child {\n    flex: 0;\n}\n\n.p-timeline-horizontal .p-timeline-event-separator {\n    flex-direction: row;\n}\n\n.p-timeline-horizontal .p-timeline-event-connector {\n    width: 100%;\n}\n\n.p-timeline-bottom .p-timeline-event {\n    flex-direction: column-reverse;\n}\n\n.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {\n    flex-direction: column-reverse;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-timeline p-component', 'p-timeline-' + props.align, 'p-timeline-' + props.layout];
  },
  event: 'p-timeline-event',
  opposite: 'p-timeline-event-opposite',
  separator: 'p-timeline-event-separator',
  marker: 'p-timeline-event-marker',
  connector: 'p-timeline-event-connector',
  content: 'p-timeline-event-content'
};
var _useStyle = useStyle(styles, {
    name: 'timeline',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseTimeline',
  "extends": BaseComponent,
  props: {
    value: null,
    align: {
      mode: String,
      "default": 'left'
    },
    layout: {
      mode: String,
      "default": 'vertical'
    },
    dataKey: null
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
  name: 'Timeline',
  "extends": script$1,
  methods: {
    getKey: function getKey(item, index) {
      return this.dataKey ? ObjectUtils.resolveFieldData(item, this.dataKey) : index;
    },
    getPTOptions: function getPTOptions(key, index) {
      return this.ptm(key, {
        context: {
          index: index,
          count: this.value.length
        }
      });
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "timeline"
  }), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.value, function (item, index) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: $options.getKey(item, index),
      "class": _ctx.cx('event')
    }, $options.getPTOptions('event', index)), [createElementVNode("div", mergeProps({
      "class": _ctx.cx('opposite', {
        index: index
      })
    }, $options.getPTOptions('opposite', index)), [renderSlot(_ctx.$slots, "opposite", {
      item: item,
      index: index
    })], 16), createElementVNode("div", mergeProps({
      "class": _ctx.cx('separator')
    }, $options.getPTOptions('separator', index)), [renderSlot(_ctx.$slots, "marker", {
      item: item,
      index: index
    }, function () {
      return [createElementVNode("div", mergeProps({
        "class": _ctx.cx('marker')
      }, $options.getPTOptions('marker', index)), null, 16)];
    }), index !== _ctx.value.length - 1 ? renderSlot(_ctx.$slots, "connector", {
      key: 0,
      item: item,
      index: index
    }, function () {
      return [createElementVNode("div", mergeProps({
        "class": _ctx.cx('connector')
      }, $options.getPTOptions('connector', index)), null, 16)];
    }) : createCommentVNode("", true)], 16), createElementVNode("div", mergeProps({
      "class": _ctx.cx('content')
    }, $options.getPTOptions('content', index)), [renderSlot(_ctx.$slots, "content", {
      item: item,
      index: index
    })], 16)], 16);
  }), 128))], 16);
}

script.render = render;

export { script as default };
