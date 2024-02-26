'use strict';

var MinusIcon = require('primevue/icons/minus');
var PlusIcon = require('primevue/icons/plus');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var FieldsetStyle = require('primevue/fieldset/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var FieldsetStyle__default = /*#__PURE__*/_interopDefaultLegacy(FieldsetStyle);

var script$1 = {
  name: 'BaseFieldset',
  "extends": BaseComponent__default["default"],
  props: {
    legend: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: null,
      "default": null
    }
  },
  style: FieldsetStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Fieldset',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:collapsed', 'toggle'],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_collapsed: this.collapsed
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    collapsed: function collapsed(newValue) {
      this.d_collapsed = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
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
      if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
        this.toggle(event);
        event.preventDefault();
      }
    }
  },
  computed: {
    buttonAriaLabel: function buttonAriaLabel() {
      return this.toggleButtonProps && this.toggleButtonProps.ariaLabel ? this.toggleButtonProps.ariaLabel : this.legend;
    }
  },
  directives: {
    ripple: Ripple__default["default"]
  },
  components: {
    PlusIcon: PlusIcon__default["default"],
    MinusIcon: MinusIcon__default["default"]
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "aria-controls", "aria-expanded", "aria-label"];
var _hoisted_3 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("fieldset", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.createElementVNode("legend", vue.mergeProps({
    "class": _ctx.cx('legend')
  }, _ctx.ptm('legend')), [!_ctx.toggleable ? vue.renderSlot(_ctx.$slots, "legend", {
    key: 0
  }, function () {
    return [vue.createElementVNode("span", vue.mergeProps({
      id: $data.id + '_header',
      "class": _ctx.cx('legendtitle')
    }, _ctx.ptm('legendtitle')), vue.toDisplayString(_ctx.legend), 17, _hoisted_1)];
  }) : vue.createCommentVNode("", true), _ctx.toggleable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
    key: 1,
    id: $data.id + '_header',
    tabindex: "0",
    role: "button",
    "aria-controls": $data.id + '_content',
    "aria-expanded": !$data.d_collapsed,
    "aria-label": $options.buttonAriaLabel,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.toggleButtonProps), _ctx.ptm('toggler'))), [vue.renderSlot(_ctx.$slots, "togglericon", {
    collapsed: $data.d_collapsed
  }, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), vue.mergeProps({
      "class": _ctx.cx('togglericon')
    }, _ctx.ptm('togglericon')), null, 16, ["class"]))];
  }), vue.renderSlot(_ctx.$slots, "legend", {}, function () {
    return [vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('legendtitle')
    }, _ctx.ptm('legendtitle')), vue.toDisplayString(_ctx.legend), 17)];
  })], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16), vue.createVNode(vue.Transition, vue.mergeProps({
    name: "p-toggleable-content"
  }, _ctx.ptm('transition')), {
    "default": vue.withCtx(function () {
      return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
        id: $data.id + '_content',
        "class": _ctx.cx('toggleablecontent'),
        role: "region",
        "aria-labelledby": $data.id + '_header'
      }, _ctx.ptm('toggleablecontent')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)], 16, _hoisted_3), [[vue.vShow, !$data.d_collapsed]])];
    }),
    _: 3
  }, 16)], 16);
}

script.render = render;

module.exports = script;
