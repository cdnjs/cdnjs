'use strict';

var Button = require('primevue/button');
var FocusTrap = require('primevue/focustrap');
var TimesIcon = require('primevue/icons/times');
var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-inplace .p-inplace-display {\n    display: inline;\n    cursor: pointer;\n}\n\n.p-inplace .p-inplace-content {\n    display: inline;\n}\n\n.p-fluid .p-inplace.p-inplace-closable .p-inplace-content {\n    display: flex;\n}\n\n.p-fluid .p-inplace.p-inplace-closable .p-inplace-content > .p-inputtext {\n    flex: 1 1 auto;\n    width: 1%;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-inplace p-component', {
      'p-inplace-closable': props.closable
    }];
  },
  display: function display(_ref2) {
    var props = _ref2.props;
    return ['p-inplace-display', {
      'p-disabled': props.disabled
    }];
  },
  content: 'p-inplace-content'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'inplace',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseInplace',
  "extends": BaseComponent__default["default"],
  props: {
    closable: {
      type: Boolean,
      "default": false
    },
    active: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    closeIcon: {
      type: String,
      "default": undefined
    },
    displayProps: {
      type: null,
      "default": null
    },
    closeButtonProps: {
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
  name: 'Inplace',
  "extends": script$1,
  emits: ['open', 'close', 'update:active'],
  data: function data() {
    return {
      d_active: this.active
    };
  },
  watch: {
    active: function active(newValue) {
      this.d_active = newValue;
    }
  },
  methods: {
    open: function open(event) {
      if (this.disabled) {
        return;
      }
      this.$emit('open', event);
      this.d_active = true;
      this.$emit('update:active', true);
    },
    close: function close(event) {
      var _this = this;
      this.$emit('close', event);
      this.d_active = false;
      this.$emit('update:active', false);
      setTimeout(function () {
        _this.$refs.display.focus();
      }, 0);
    }
  },
  computed: {
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    }
  },
  components: {
    IPButton: Button__default["default"],
    TimesIcon: TimesIcon__default["default"]
  },
  directives: {
    focustrap: FocusTrap__default["default"]
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_IPButton = vue.resolveComponent("IPButton");
  var _directive_focustrap = vue.resolveDirective("focustrap");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    "aria-live": "polite"
  }, _ctx.ptm('root'), {
    "data-pc-name": "inplace"
  }), [!$data.d_active ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    ref: "display",
    "class": _ctx.cx('display'),
    tabindex: _ctx.$attrs.tabindex || '0',
    role: "button",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.open && $options.open.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = vue.withKeys(function () {
      return $options.open && $options.open.apply($options, arguments);
    }, ["enter"]))
  }, _objectSpread(_objectSpread({}, _ctx.displayProps), _ctx.ptm('display'))), [vue.renderSlot(_ctx.$slots, "display")], 16, _hoisted_1)) : (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('content')
  }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "content"), _ctx.closable ? (vue.openBlock(), vue.createBlock(_component_IPButton, vue.mergeProps({
    key: 0,
    "aria-label": $options.closeAriaLabel,
    onClick: $options.close,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('closeButton')
  }, _ctx.closeButtonProps), {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "closeicon", {}, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
          "class": _ctx.closeIcon
        }, _ctx.ptm('closeButton')['icon']), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "unstyled", "pt"])) : vue.createCommentVNode("", true)], 16))], 16)), [[_directive_focustrap]]);
}

script.render = render;

module.exports = script;
