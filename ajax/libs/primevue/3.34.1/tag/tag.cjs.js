'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-tag {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-tag-icon,\n.p-tag-value,\n.p-tag-icon.pi {\n    line-height: 1.5;\n}\n\n.p-tag.p-tag-rounded {\n    border-radius: 10rem;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-tag p-component', {
      'p-tag-info': props.severity === 'info',
      'p-tag-success': props.severity === 'success',
      'p-tag-warning': props.severity === 'warning',
      'p-tag-danger': props.severity === 'danger',
      'p-tag-rounded': props.rounded
    }];
  },
  icon: 'p-tag-icon',
  value: 'p-tag-value'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'tag',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseTag',
  "extends": BaseComponent__default["default"],
  props: {
    value: null,
    severity: null,
    rounded: Boolean,
    icon: String
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
  name: 'Tag',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "tag"
  }), [_ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), vue.mergeProps({
    key: 0,
    "class": _ctx.cx('icon')
  }, _ctx.ptm('icon')), null, 16, ["class"])) : _ctx.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 1,
    "class": [_ctx.cx('icon'), _ctx.icon]
  }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "default", {}, function () {
    return [vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('value')
    }, _ctx.ptm('value')), vue.toDisplayString(_ctx.value), 17)];
  })], 16);
}

script.render = render;

module.exports = script;
