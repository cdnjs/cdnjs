this.primevue = this.primevue || {};
this.primevue.panel = (function (Button, MinusIcon, PlusIcon, Ripple, utils, BaseComponent, PanelStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
    var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var PanelStyle__default = /*#__PURE__*/_interopDefaultLegacy(PanelStyle);

    var script$1 = {
      name: 'BasePanel',
      "extends": BaseComponent__default["default"],
      props: {
        header: String,
        toggleable: Boolean,
        collapsed: Boolean,
        toggleButtonProps: {
          type: Object,
          "default": function _default() {
            return {
              severity: 'secondary',
              text: true,
              rounded: true
            };
          }
        }
      },
      style: PanelStyle__default["default"],
      provide: function provide() {
        return {
          $pcPanel: this,
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Panel',
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
          return this.toggleButtonProps && this.toggleButtonProps.ariaLabel ? this.toggleButtonProps.ariaLabel : this.header;
        }
      },
      components: {
        PlusIcon: PlusIcon__default["default"],
        MinusIcon: MinusIcon__default["default"],
        Button: Button__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    var _hoisted_1 = ["id"];
    var _hoisted_2 = ["id", "aria-labelledby"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_Button = vue.resolveComponent("Button");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('header')
      }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header", {
        id: $data.id + '_header',
        "class": vue.normalizeClass(_ctx.cx('title'))
      }, function () {
        return [_ctx.header ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          id: $data.id + '_header',
          "class": _ctx.cx('title')
        }, _ctx.ptm('title')), vue.toDisplayString(_ctx.header), 17, _hoisted_1)) : vue.createCommentVNode("", true)];
      }), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('headerActions')
      }, _ctx.ptm('headerActions')), [vue.renderSlot(_ctx.$slots, "icons"), _ctx.toggleable ? (vue.openBlock(), vue.createBlock(_component_Button, vue.mergeProps({
        key: 0,
        id: $data.id + '_header',
        "class": _ctx.cx('toggleButton'),
        "aria-label": $options.buttonAriaLabel,
        "aria-controls": $data.id + '_content',
        "aria-expanded": !$data.d_collapsed,
        unstyled: _ctx.unstyled,
        onClick: $options.toggle,
        onKeydown: $options.onKeyDown
      }, _ctx.toggleButtonProps, {
        pt: _ctx.ptm('toggleButton')
      }), {
        icon: vue.withCtx(function (slotProps) {
          return [vue.renderSlot(_ctx.$slots, _ctx.$slots.togglericon ? 'togglericon' : 'toggleicon', {
            collapsed: $data.d_collapsed
          }, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), vue.mergeProps({
              "class": slotProps["class"]
            }, _ctx.ptm('toggleButton')['icon']), null, 16, ["class"]))];
          })];
        }),
        _: 3
      }, 16, ["id", "class", "aria-label", "aria-controls", "aria-expanded", "unstyled", "onClick", "onKeydown", "pt"])) : vue.createCommentVNode("", true)], 16)], 16), vue.createVNode(vue.Transition, vue.mergeProps({
        name: "p-toggleable-content"
      }, _ctx.ptm('transition')), {
        "default": vue.withCtx(function () {
          return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
            id: $data.id + '_content',
            "class": _ctx.cx('contentContainer'),
            role: "region",
            "aria-labelledby": $data.id + '_header'
          }, _ctx.ptm('contentContainer')), [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('content')
          }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('footer')
          }, _ctx.ptm('footer')), [vue.renderSlot(_ctx.$slots, "footer")], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_2), [[vue.vShow, !$data.d_collapsed]])];
        }),
        _: 3
      }, 16)], 16);
    }

    script.render = render;

    return script;

})(primevue.button, primevue.icons.minus, primevue.icons.plus, primevue.ripple, primevue.utils, primevue.basecomponent, primevue.panel.style, Vue);
