this.primevue = this.primevue || {};
this.primevue.inlinemessage = (function (CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesCircleIcon, BaseComponent, InlineMessageStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
    var ExclamationTriangleIcon__default = /*#__PURE__*/_interopDefaultLegacy(ExclamationTriangleIcon);
    var InfoCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(InfoCircleIcon);
    var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var InlineMessageStyle__default = /*#__PURE__*/_interopDefaultLegacy(InlineMessageStyle);

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
      style: InlineMessageStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'InlineMessage',
      "extends": script$1,
      inheritAttrs: false,
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
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "icon", {}, function () {
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

    return script;

})(primevue.icons.check, primevue.icons.exclamationtriangle, primevue.icons.infocircle, primevue.icons.timescircle, primevue.basecomponent, primevue.inlinemessage.style, Vue);
