import Button from 'primevue/button';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import TieredMenu from 'primevue/tieredmenu';
import { UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import SplitButtonStyle from 'primevue/splitbutton/style';
import { resolveComponent, openBlock, createElementBlock, mergeProps, renderSlot, createVNode, withCtx, normalizeClass, createElementVNode, createBlock, resolveDynamicComponent, createSlots } from 'vue';

var script$1 = {
  name: 'BaseSplitButton',
  "extends": BaseComponent,
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
      type: String,
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
  style: SplitButtonStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'SplitButton',
  "extends": script$1,
  emits: ['click'],
  data: function data() {
    return {
      isExpanded: false
    };
  },
  mounted: function mounted() {
    var _this = this;
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
    ariaId: function ariaId() {
      return UniqueComponentId();
    },
    containerClass: function containerClass() {
      return [this.cx('root'), this["class"]];
    }
  },
  components: {
    PVSButton: Button,
    PVSMenu: TieredMenu,
    ChevronDownIcon: ChevronDownIcon
  }
};

var _hoisted_1 = ["data-pc-severity"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PVSButton = resolveComponent("PVSButton");
  var _component_PVSMenu = resolveComponent("PVSMenu");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": $options.containerClass,
    style: _ctx.style
  }, _ctx.ptm('root'), {
    "data-pc-name": "splitbutton",
    "data-pc-severity": _ctx.severity
  }), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [createVNode(_component_PVSButton, mergeProps({
      type: "button",
      "class": _ctx.cx('button'),
      label: _ctx.label,
      disabled: _ctx.disabled,
      severity: _ctx.severity,
      text: _ctx.text,
      outlined: _ctx.outlined,
      size: _ctx.size,
      "aria-label": _ctx.label,
      onClick: $options.onDefaultButtonClick,
      pt: _ctx.ptm('button')
    }, _ctx.buttonProps, {
      unstyled: _ctx.unstyled,
      "data-pc-section": "button"
    }), {
      icon: withCtx(function (slotProps) {
        return [renderSlot(_ctx.$slots, "icon", {
          "class": normalizeClass(slotProps["class"])
        }, function () {
          return [createElementVNode("span", mergeProps({
            "class": [_ctx.icon, slotProps["class"]]
          }, _ctx.ptm('button')['icon'], {
            "data-pc-section": "buttonicon"
          }), null, 16)];
        })];
      }),
      "default": withCtx(function () {
        return [renderSlot(_ctx.$slots, "buttoncontent")];
      }),
      _: 3
    }, 16, ["class", "label", "disabled", "severity", "text", "outlined", "size", "aria-label", "onClick", "pt", "unstyled"])];
  }), createVNode(_component_PVSButton, mergeProps({
    ref: "button",
    type: "button",
    "class": _ctx.cx('menuButton'),
    disabled: _ctx.disabled,
    "aria-haspopup": "true",
    "aria-expanded": $data.isExpanded,
    "aria-controls": $options.ariaId + '_overlay',
    onClick: $options.onDropdownButtonClick,
    onKeydown: $options.onDropdownKeydown,
    pt: _ctx.ptm('menuButton'),
    severity: _ctx.severity,
    text: _ctx.text,
    outlined: _ctx.outlined,
    size: _ctx.size
  }, _ctx.menuButtonProps, {
    unstyled: _ctx.unstyled,
    "data-pc-section": "menubutton"
  }), {
    icon: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "menubuttonicon", {
        "class": normalizeClass(slotProps["class"])
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.menuButtonIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
          "class": [_ctx.menuButtonIcon, slotProps["class"]]
        }, _ctx.ptm('menuButton')['icon'], {
          "data-pc-section": "menubuttonicon"
        }), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["class", "disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown", "pt", "severity", "text", "outlined", "size", "unstyled"]), createVNode(_component_PVSMenu, {
    ref: "menu",
    id: $options.ariaId + '_overlay',
    model: _ctx.model,
    popup: true,
    autoZIndex: _ctx.autoZIndex,
    baseZIndex: _ctx.baseZIndex,
    appendTo: _ctx.appendTo,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('menu')
  }, createSlots({
    _: 2
  }, [_ctx.$slots.menuitemicon ? {
    name: "itemicon",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "menuitemicon", {
        item: slotProps.item,
        "class": normalizeClass(slotProps["class"])
      })];
    }),
    key: "0"
  } : undefined, _ctx.$slots.item ? {
    name: "item",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "item", {
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

export { script as default };
