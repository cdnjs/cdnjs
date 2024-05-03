import Button from 'primevue/button';
import MinusIcon from 'primevue/icons/minus';
import PlusIcon from 'primevue/icons/plus';
import Ripple from 'primevue/ripple';
import { UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import PanelStyle from 'primevue/panel/style';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeClass, toDisplayString, createCommentVNode, createBlock, withCtx, resolveDynamicComponent, createVNode, Transition, withDirectives, vShow } from 'vue';

var script$1 = {
  name: 'BasePanel',
  "extends": BaseComponent,
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
  style: PanelStyle,
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
      this.id = newValue || UniqueComponentId();
    },
    collapsed: function collapsed(newValue) {
      this.d_collapsed = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
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
    PlusIcon: PlusIcon,
    MinusIcon: MinusIcon,
    Button: Button
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [renderSlot(_ctx.$slots, "header", {
    id: $data.id + '_header',
    "class": normalizeClass(_ctx.cx('title'))
  }, function () {
    return [_ctx.header ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      id: $data.id + '_header',
      "class": _ctx.cx('title')
    }, _ctx.ptm('title')), toDisplayString(_ctx.header), 17, _hoisted_1)) : createCommentVNode("", true)];
  }), createElementVNode("div", mergeProps({
    "class": _ctx.cx('headerActions')
  }, _ctx.ptm('headerActions')), [renderSlot(_ctx.$slots, "icons"), _ctx.toggleable ? (openBlock(), createBlock(_component_Button, mergeProps({
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
    icon: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, _ctx.$slots.togglericon ? 'togglericon' : 'toggleicon', {
        collapsed: $data.d_collapsed
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), mergeProps({
          "class": slotProps["class"]
        }, _ctx.ptm('toggleButton')['icon']), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["id", "class", "aria-label", "aria-controls", "aria-expanded", "unstyled", "onClick", "onKeydown", "pt"])) : createCommentVNode("", true)], 16)], 16), createVNode(Transition, mergeProps({
    name: "p-toggleable-content"
  }, _ctx.ptm('transition')), {
    "default": withCtx(function () {
      return [withDirectives(createElementVNode("div", mergeProps({
        id: $data.id + '_content',
        "class": _ctx.cx('contentContainer'),
        role: "region",
        "aria-labelledby": $data.id + '_header'
      }, _ctx.ptm('contentContainer')), [createElementVNode("div", mergeProps({
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [renderSlot(_ctx.$slots, "default")], 16), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        "class": _ctx.cx('footer')
      }, _ctx.ptm('footer')), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 16, _hoisted_2), [[vShow, !$data.d_collapsed]])];
    }),
    _: 3
  }, 16)], 16);
}

script.render = render;

export { script as default };
