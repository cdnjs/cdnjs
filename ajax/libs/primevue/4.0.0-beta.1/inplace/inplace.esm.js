import Button from 'primevue/button';
import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import BaseComponent from 'primevue/basecomponent';
import InplaceStyle from 'primevue/inplace/style';
import { resolveComponent, resolveDirective, withDirectives, openBlock, createElementBlock, mergeProps, withKeys, renderSlot, createBlock, withCtx, resolveDynamicComponent, createCommentVNode } from 'vue';

var script$1 = {
  name: 'BaseInplace',
  "extends": BaseComponent,
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
  style: InplaceStyle,
  provide: function provide() {
    return {
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
    IPButton: Button,
    TimesIcon: TimesIcon
  },
  directives: {
    focustrap: FocusTrap
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_IPButton = resolveComponent("IPButton");
  var _directive_focustrap = resolveDirective("focustrap");
  return withDirectives((openBlock(), createElementBlock("div", mergeProps({
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
  }, _ctx.ptm('content')), [renderSlot(_ctx.$slots, "content"), _ctx.closable ? (openBlock(), createBlock(_component_IPButton, mergeProps({
    key: 0,
    "aria-label": $options.closeAriaLabel,
    onClick: $options.close,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('closeButton')
  }, _ctx.closeButtonProps), {
    icon: withCtx(function () {
      return [renderSlot(_ctx.$slots, "closeicon", {}, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
          "class": _ctx.closeIcon
        }, _ctx.ptm('closeButton')['icon'], {
          "data-pc-section": "closebuttonicon"
        }), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["aria-label", "onClick", "unstyled", "pt"])) : createCommentVNode("", true)], 16))], 16)), [[_directive_focustrap]]);
}

script.render = render;

export { script as default };
