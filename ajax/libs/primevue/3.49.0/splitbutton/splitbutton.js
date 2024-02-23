this.primevue = this.primevue || {};
this.primevue.splitbutton = (function (Button, ChevronDownIcon, TieredMenu, utils, BaseComponent, SplitButtonStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var TieredMenu__default = /*#__PURE__*/_interopDefaultLegacy(TieredMenu);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var SplitButtonStyle__default = /*#__PURE__*/_interopDefaultLegacy(SplitButtonStyle);

    var script$1 = {
      name: 'BaseSplitButton',
      "extends": BaseComponent__default["default"],
      props: {
        label: {
          type: String,
          "default": null
        },
        icon: {
          type: String,
          "default": null
        },
        model: {
          type: Array,
          "default": null
        },
        autoZIndex: {
          type: Boolean,
          "default": true
        },
        baseZIndex: {
          type: Number,
          "default": 0
        },
        appendTo: {
          type: [String, Object],
          "default": 'body'
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        "class": {
          type: null,
          "default": null
        },
        style: {
          type: null,
          "default": null
        },
        buttonProps: {
          type: null,
          "default": null
        },
        menuButtonProps: {
          type: null,
          "default": null
        },
        menuButtonIcon: {
          type: String,
          "default": undefined
        },
        severity: {
          type: String,
          "default": null
        },
        raised: {
          type: Boolean,
          "default": false
        },
        rounded: {
          type: Boolean,
          "default": false
        },
        text: {
          type: Boolean,
          "default": false
        },
        outlined: {
          type: Boolean,
          "default": false
        },
        size: {
          type: String,
          "default": null
        },
        plain: {
          type: Boolean,
          "default": false
        }
      },
      style: SplitButtonStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'SplitButton',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['click'],
      data: function data() {
        return {
          id: this.$attrs.id,
          isExpanded: false
        };
      },
      watch: {
        '$attrs.id': function $attrsId(newValue) {
          this.id = newValue || utils.UniqueComponentId();
        }
      },
      mounted: function mounted() {
        var _this = this;
        this.id = this.id || utils.UniqueComponentId();
        this.$watch('$refs.menu.visible', function (newValue) {
          _this.isExpanded = newValue;
        });
      },
      methods: {
        onDropdownButtonClick: function onDropdownButtonClick(event) {
          if (event) {
            event.preventDefault();
          }
          this.$refs.menu.toggle({
            currentTarget: this.$el,
            relatedTarget: this.$refs.button.$el
          });
          this.isExpanded = this.$refs.menu.visible;
        },
        onDropdownKeydown: function onDropdownKeydown(event) {
          if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            this.onDropdownButtonClick();
            event.preventDefault();
          }
        },
        onDefaultButtonClick: function onDefaultButtonClick(event) {
          if (this.isExpanded) {
            this.$refs.menu.hide(event);
          }
          this.$emit('click', event);
        }
      },
      computed: {
        containerClass: function containerClass() {
          return [this.cx('root'), this["class"]];
        }
      },
      components: {
        PVSButton: Button__default["default"],
        PVSMenu: TieredMenu__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"]
      }
    };

    var _hoisted_1 = ["data-p-severity"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_PVSButton = vue.resolveComponent("PVSButton");
      var _component_PVSMenu = vue.resolveComponent("PVSMenu");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": $options.containerClass,
        style: _ctx.style
      }, _ctx.ptmi('root'), {
        "data-p-severity": _ctx.severity
      }), [vue.createVNode(_component_PVSButton, vue.mergeProps({
        type: "button",
        "class": _ctx.cx('button'),
        label: _ctx.label,
        disabled: _ctx.disabled,
        severity: _ctx.severity,
        text: _ctx.text,
        outlined: _ctx.outlined,
        size: _ctx.size,
        "aria-label": _ctx.label,
        onClick: $options.onDefaultButtonClick
      }, _ctx.buttonProps, {
        pt: _ctx.ptm('button'),
        unstyled: _ctx.unstyled
      }), vue.createSlots({
        "default": vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "default")];
        }),
        _: 2
      }, [_ctx.$slots.icon ? {
        name: "icon",
        fn: vue.withCtx(function (slotProps) {
          return [vue.renderSlot(_ctx.$slots, "icon", {
            "class": vue.normalizeClass(slotProps["class"])
          }, function () {
            return [vue.createElementVNode("span", vue.mergeProps({
              "class": [_ctx.icon, slotProps["class"]]
            }, _ctx.ptm('button')['icon'], {
              "data-pc-section": "buttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1040, ["class", "label", "disabled", "severity", "text", "outlined", "size", "aria-label", "onClick", "pt", "unstyled"]), vue.createVNode(_component_PVSButton, vue.mergeProps({
        ref: "button",
        type: "button",
        "class": _ctx.cx('menuButton'),
        disabled: _ctx.disabled,
        "aria-haspopup": "true",
        "aria-expanded": $data.isExpanded,
        "aria-controls": $data.id + '_overlay',
        onClick: $options.onDropdownButtonClick,
        onKeydown: $options.onDropdownKeydown,
        severity: _ctx.severity,
        text: _ctx.text,
        outlined: _ctx.outlined,
        size: _ctx.size
      }, _ctx.menuButtonProps, {
        pt: _ctx.ptm('menuButton'),
        unstyled: _ctx.unstyled
      }), {
        icon: vue.withCtx(function (slotProps) {
          return [vue.renderSlot(_ctx.$slots, "menubuttonicon", {
            "class": vue.normalizeClass(slotProps["class"])
          }, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.menuButtonIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
              "class": [_ctx.menuButtonIcon, slotProps["class"]]
            }, _ctx.ptm('menuButton')['icon'], {
              "data-pc-section": "menubuttonicon"
            }), null, 16, ["class"]))];
          })];
        }),
        _: 3
      }, 16, ["class", "disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown", "severity", "text", "outlined", "size", "pt", "unstyled"]), vue.createVNode(_component_PVSMenu, {
        ref: "menu",
        id: $data.id + '_overlay',
        model: _ctx.model,
        popup: true,
        autoZIndex: _ctx.autoZIndex,
        baseZIndex: _ctx.baseZIndex,
        appendTo: _ctx.appendTo,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('menu')
      }, vue.createSlots({
        _: 2
      }, [_ctx.$slots.menuitemicon ? {
        name: "itemicon",
        fn: vue.withCtx(function (slotProps) {
          return [vue.renderSlot(_ctx.$slots, "menuitemicon", {
            item: slotProps.item,
            "class": vue.normalizeClass(slotProps["class"])
          })];
        }),
        key: "0"
      } : undefined, _ctx.$slots.item ? {
        name: "item",
        fn: vue.withCtx(function (slotProps) {
          return [vue.renderSlot(_ctx.$slots, "item", {
            item: slotProps.item,
            hasSubmenu: slotProps.hasSubmenu,
            label: slotProps.label,
            props: slotProps.props
          })];
        }),
        key: "1"
      } : undefined]), 1032, ["id", "model", "autoZIndex", "baseZIndex", "appendTo", "unstyled", "pt"])], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.button, primevue.icons.chevrondown, primevue.tieredmenu, primevue.utils, primevue.basecomponent, primevue.splitbutton.style, Vue);
