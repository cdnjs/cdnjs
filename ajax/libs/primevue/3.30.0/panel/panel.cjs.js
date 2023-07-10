'use strict';

var MinusIcon = require('primevue/icons/minus');
var PlusIcon = require('primevue/icons/plus');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-panel-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.p-panel-title {\n    line-height: 1;\n}\n\n.p-panel-header-icon {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-panel p-component', {
      'p-panel-toggleable': props.toggleable
    }];
  },
  header: 'p-panel-header',
  title: 'p-panel-title',
  icons: 'p-panel-icons',
  toggler: 'p-panel-header-icon p-panel-toggler p-link',
  toggleablecontent: 'p-toggleable-content',
  content: 'p-panel-content',
  footer: 'p-panel-footer'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'panel',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BasePanel',
  "extends": BaseComponent__default["default"],
  props: {
    header: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: null,
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
  name: 'Panel',
  "extends": script$1,
  emits: ['update:collapsed', 'toggle'],
  data: function data() {
    return {
      d_collapsed: this.collapsed
    };
  },
  watch: {
    collapsed: function collapsed(newValue) {
      this.d_collapsed = newValue;
    }
  },
  methods: {
    toggle: function toggle(event) {
      this.d_collapsed = !this.d_collapsed;
      this.$emit('update:collapsed', this.d_collapsed);
      this.$emit('toggle', {
        originalEvent: event,
        value: this.d_collapsed
      });
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === 'Enter' || event.code === 'Space') {
        this.toggle(event);
        event.preventDefault();
      }
    }
  },
  computed: {
    ariaId: function ariaId() {
      return utils.UniqueComponentId();
    },
    buttonAriaLabel: function buttonAriaLabel() {
      return this.toggleButtonProps && this.toggleButtonProps['aria-label'] ? this.toggleButtonProps['aria-label'] : this.header;
    }
  },
  components: {
    PlusIcon: PlusIcon__default["default"],
    MinusIcon: MinusIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "aria-label", "aria-controls", "aria-expanded"];
var _hoisted_3 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "panel"
  }), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header", {
    id: $options.ariaId + '_header',
    "class": vue.normalizeClass(_ctx.cx('title'))
  }, function () {
    return [_ctx.header ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      id: $options.ariaId + '_header',
      "class": _ctx.cx('title')
    }, _ctx.ptm('title')), vue.toDisplayString(_ctx.header), 17, _hoisted_1)) : vue.createCommentVNode("", true)];
  }), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('icons')
  }, _ctx.ptm('icons')), [vue.renderSlot(_ctx.$slots, "icons"), _ctx.toggleable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 0,
    id: $options.ariaId + '_header',
    type: "button",
    role: "button",
    "class": _ctx.cx('toggler'),
    "aria-label": $options.buttonAriaLabel,
    "aria-controls": $options.ariaId + '_content',
    "aria-expanded": !$data.d_collapsed,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.toggleButtonProps), _ctx.ptm('toggler'))), [vue.renderSlot(_ctx.$slots, "togglericon", {
    collapsed: $data.d_collapsed
  }, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('togglericon'))), null, 16))];
  })], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16)], 16), vue.createVNode(vue.Transition, {
    name: "p-toggleable-content"
  }, {
    "default": vue.withCtx(function () {
      return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
        id: $options.ariaId + '_content',
        "class": _ctx.cx('toggleablecontent'),
        role: "region",
        "aria-labelledby": $options.ariaId + '_header'
      }, _ctx.ptm('toggleablecontent')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('footer')
      }, _ctx.ptm('footer')), [vue.renderSlot(_ctx.$slots, "footer")], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_3), [[vue.vShow, !$data.d_collapsed]])];
    }),
    _: 3
  })], 16);
}

script.render = render;

module.exports = script;
