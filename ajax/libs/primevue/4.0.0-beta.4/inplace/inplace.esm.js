import BaseComponent from 'primevue/basecomponent';
import InplaceStyle from 'primevue/inplace/style';
import { openBlock, createElementBlock, mergeProps, withKeys, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseInplace',
  "extends": BaseComponent,
  props: {
    active: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    displayProps: {
      type: null,
      "default": null
    }
  },
  style: InplaceStyle,
  provide: function provide() {
    return {
      $pcInplace: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Inplace',
  "extends": script$1,
  inheritAttrs: false,
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
      this.d_active = true;
      this.$emit('open', event);
      this.$emit('update:active', true);
    },
    close: function close(event) {
      var _this = this;
      this.d_active = false;
      this.$emit('close', event);
      this.$emit('update:active', false);
      setTimeout(function () {
        _this.$refs.display.focus();
      }, 0);
    }
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    "aria-live": "polite"
  }, _ctx.ptmi('root')), [!$data.d_active ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    ref: "display",
    "class": _ctx.cx('display'),
    tabindex: _ctx.$attrs.tabindex || '0',
    role: "button",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.open && $options.open.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = withKeys(function () {
      return $options.open && $options.open.apply($options, arguments);
    }, ["enter"]))
  }, _objectSpread(_objectSpread({}, _ctx.displayProps), _ctx.ptm('display'))), [renderSlot(_ctx.$slots, "display")], 16, _hoisted_1)) : (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx('content')
  }, _ctx.ptm('content')), [renderSlot(_ctx.$slots, "content", {
    closeCallback: $options.close
  })], 16))], 16);
}

script.render = render;

export { script as default };
