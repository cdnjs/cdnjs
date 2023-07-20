'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-splitter-panel {\n    flex-grow: 1;\n}\n\n.p-splitter-panel-nested {\n    display: flex;\n}\n\n.p-splitter-panel .p-splitter {\n    flex-grow: 1;\n    border: 0 none;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-splitter-panel', {
      'p-splitter-panel-nested': instance.isNested
    }];
  }
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'splitterpanel',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseSplitterPanel',
  "extends": BaseComponent__default["default"],
  props: {
    size: {
      type: Number,
      "default": null
    },
    minSize: {
      type: Number,
      "default": null
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
  name: 'SplitterPanel',
  "extends": script$1,
  computed: {
    isNested: function isNested() {
      return this.$slots["default"]().some(function (child) {
        return child.type.name === 'Splitter';
      });
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "splitterpanel"
  }), [vue.renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

module.exports = script;
