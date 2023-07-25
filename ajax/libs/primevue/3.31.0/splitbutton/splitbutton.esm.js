import Button from 'primevue/button';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import TieredMenu from 'primevue/tieredmenu';
import { UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { resolveComponent, openBlock, createElementBlock, mergeProps, renderSlot, createVNode, createSlots, withCtx, normalizeClass, createElementVNode, createBlock, resolveDynamicComponent } from 'vue';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = "\n.p-splitbutton {\n    display: inline-flex;\n    position: relative;\n}\n\n.p-splitbutton .p-splitbutton-defaultbutton,\n.p-splitbutton.p-button-rounded > .p-splitbutton-defaultbutton.p-button,\n.p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button {\n    flex: 1 1 auto;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-right: 0 none;\n}\n\n.p-splitbutton-menubutton,\n.p-splitbutton.p-button-rounded > .p-splitbutton-menubutton.p-button,\n.p-splitbutton.p-button-outlined > .p-splitbutton-menubutton.p-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n\n.p-splitbutton .p-menu {\n    min-width: 100%;\n}\n\n.p-fluid .p-splitbutton {\n    display: flex;\n}\n";
var classes = {
  root: function root(_ref) {
    var _ref2;
    var props = _ref.props;
    return ['p-splitbutton p-component', (_ref2 = {}, _defineProperty(_ref2, "p-button-".concat(props.severity), props.severity), _defineProperty(_ref2, 'p-button-raised', props.raised), _defineProperty(_ref2, 'p-button-rounded', props.rounded), _defineProperty(_ref2, 'p-button-text', props.text), _defineProperty(_ref2, 'p-button-outlined', props.outlined), _defineProperty(_ref2, 'p-button-sm', props.size === 'small'), _defineProperty(_ref2, 'p-button-lg', props.size === 'large'), _ref2)];
  },
  button: 'p-splitbutton-defaultbutton',
  menuButton: 'p-splitbutton-menubutton'
};
var _useStyle = useStyle(styles, {
    name: 'splitbutton',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
    onDropdownButtonClick: function onDropdownButtonClick() {
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
      "aria-label": _ctx.label,
      onClick: $options.onDefaultButtonClick,
      pt: _ctx.ptm('button')
    }, _ctx.buttonProps, {
      unstyled: _ctx.unstyled,
      "data-pc-section": "button"
    }), createSlots({
      _: 2
    }, [_ctx.icon ? {
      name: "icon",
      fn: withCtx(function (slotProps) {
        return [renderSlot(_ctx.$slots, "icon", {
          "class": normalizeClass(slotProps["class"])
        }, function () {
          return [createElementVNode("span", mergeProps({
            "class": [_ctx.icon, slotProps["class"]]
          }, _ctx.ptm('button')['icon']), null, 16)];
        })];
      }),
      key: "0"
    } : undefined]), 1040, ["class", "label", "disabled", "aria-label", "onClick", "pt", "unstyled"])];
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
    pt: _ctx.ptm('menuButton')
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
        }, _ctx.ptm('menuButton')['icon']), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["class", "disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown", "pt", "unstyled"]), createVNode(_component_PVSMenu, {
    ref: "menu",
    id: $options.ariaId + '_overlay',
    model: _ctx.model,
    popup: true,
    autoZIndex: _ctx.autoZIndex,
    baseZIndex: _ctx.baseZIndex,
    appendTo: _ctx.appendTo,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('menu')
  }, null, 8, ["id", "model", "autoZIndex", "baseZIndex", "appendTo", "unstyled", "pt"])], 16, _hoisted_1);
}

script.render = render;

export { script as default };
