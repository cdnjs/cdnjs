'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var CheckIcon = require('primevue/icons/check');
var ExclamationTriangleIcon = require('primevue/icons/exclamationtriangle');
var InfoCircleIcon = require('primevue/icons/infocircle');
var TimesCircleIcon = require('primevue/icons/timescircle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
var ExclamationTriangleIcon__default = /*#__PURE__*/_interopDefaultLegacy(ExclamationTriangleIcon);
var InfoCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(InfoCircleIcon);
var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);

var styles = "\n.p-inline-message {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    vertical-align: top;\n}\n\n.p-inline-message-icon-only .p-inline-message-text {\n    visibility: hidden;\n    width: 0;\n}\n\n.p-fluid .p-inline-message {\n    display: flex;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      instance = _ref.instance;
    return ['p-inline-message p-component p-inline-message-' + props.severity, {
      'p-inline-message-icon-only': !instance.$slots["default"]
    }];
  },
  icon: function icon(_ref2) {
    var props = _ref2.props;
    return ['p-inline-message-icon', props.icon];
  },
  text: 'p-inline-message-text'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'inlinemessage',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseInlineMessage',
  "extends": BaseComponent__default["default"],
  props: {
    severity: {
      type: String,
      "default": 'error'
    },
    icon: {
      type: String,
      "default": undefined
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
  name: 'InlineMessage',
  "extends": script$1,
  timeout: null,
  data: function data() {
    return {
      visible: true
    };
  },
  mounted: function mounted() {
    var _this = this;
    if (!this.sticky) {
      setTimeout(function () {
        _this.visible = false;
      }, this.life);
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return {
        info: InfoCircleIcon__default["default"],
        success: CheckIcon__default["default"],
        warn: ExclamationTriangleIcon__default["default"],
        error: TimesCircleIcon__default["default"]
      }[this.severity];
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "aria-live": "polite",
    "class": _ctx.cx('root')
  }, _ctx.ptm('root')), [vue.renderSlot(_ctx.$slots, "icon", {}, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon ? 'span' : $options.iconComponent), vue.mergeProps({
      "class": _ctx.cx('icon')
    }, _ctx.ptm('icon')), null, 16, ["class"]))];
  }), vue.createElementVNode("span", vue.mergeProps({
    "class": _ctx.cx('text')
  }, _ctx.ptm('text')), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
    return [vue.createTextVNode(" ")];
  })], 16)], 16);
}

script.render = render;

module.exports = script;
