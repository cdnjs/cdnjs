import Button from 'primevue/button';
import ConfirmationEventBus from 'primevue/confirmationeventbus';
import Dialog from 'primevue/dialog';
import BaseComponent from 'primevue/basecomponent';
import ConfirmDialogStyle from 'primevue/confirmdialog/style';
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, createElementBlock, Fragment, renderSlot, resolveDynamicComponent, mergeProps, createCommentVNode, createElementVNode, toDisplayString, createVNode } from 'vue';

var script$1 = {
  name: 'BaseConfirmDialog',
  "extends": BaseComponent,
  props: {
    group: String,
    breakpoints: {
      type: Object,
      "default": null
    },
    draggable: {
      type: Boolean,
      "default": true
    }
  },
  style: ConfirmDialogStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ConfirmDialog',
  "extends": script$1,
  confirmListener: null,
  closeListener: null,
  data: function data() {
    return {
      visible: false,
      confirmation: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.confirmListener = function (options) {
      if (!options) {
        return;
      }
      if (options.group === _this.group) {
        _this.confirmation = options;
        if (_this.confirmation.onShow) {
          _this.confirmation.onShow();
        }
        _this.visible = true;
      }
    };
    this.closeListener = function () {
      _this.visible = false;
      _this.confirmation = null;
    };
    ConfirmationEventBus.on('confirm', this.confirmListener);
    ConfirmationEventBus.on('close', this.closeListener);
  },
  beforeUnmount: function beforeUnmount() {
    ConfirmationEventBus.off('confirm', this.confirmListener);
    ConfirmationEventBus.off('close', this.closeListener);
  },
  methods: {
    accept: function accept() {
      if (this.confirmation.accept) {
        this.confirmation.accept();
      }
      this.visible = false;
    },
    reject: function reject() {
      if (this.confirmation.reject) {
        this.confirmation.reject();
      }
      this.visible = false;
    },
    onHide: function onHide() {
      if (this.confirmation.onHide) {
        this.confirmation.onHide();
      }
      this.visible = false;
    },
    getCXOptions: function getCXOptions(icon, iconProps) {
      return {
        contenxt: {
          icon: icon,
          iconClass: iconProps["class"]
        }
      };
    }
  },
  computed: {
    header: function header() {
      return this.confirmation ? this.confirmation.header : null;
    },
    message: function message() {
      return this.confirmation ? this.confirmation.message : null;
    },
    blockScroll: function blockScroll() {
      return this.confirmation ? this.confirmation.blockScroll : true;
    },
    position: function position() {
      return this.confirmation ? this.confirmation.position : null;
    },
    acceptLabel: function acceptLabel() {
      return this.confirmation ? this.confirmation.acceptLabel || this.$primevue.config.locale.accept : null;
    },
    rejectLabel: function rejectLabel() {
      return this.confirmation ? this.confirmation.rejectLabel || this.$primevue.config.locale.reject : null;
    },
    acceptIcon: function acceptIcon() {
      return this.confirmation ? this.confirmation.acceptIcon : null;
    },
    rejectIcon: function rejectIcon() {
      return this.confirmation ? this.confirmation.rejectIcon : null;
    },
    autoFocusAccept: function autoFocusAccept() {
      return this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept' ? true : false;
    },
    autoFocusReject: function autoFocusReject() {
      return this.confirmation.defaultFocus === 'reject' ? true : false;
    },
    closeOnEscape: function closeOnEscape() {
      return this.confirmation ? this.confirmation.closeOnEscape : true;
    }
  },
  components: {
    CDialog: Dialog,
    CDButton: Button
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CDButton = resolveComponent("CDButton");
  var _component_CDialog = resolveComponent("CDialog");
  return openBlock(), createBlock(_component_CDialog, {
    visible: $data.visible,
    "onUpdate:visible": [_cache[2] || (_cache[2] = function ($event) {
      return $data.visible = $event;
    }), $options.onHide],
    role: "alertdialog",
    "class": normalizeClass(_ctx.cx('root')),
    modal: true,
    header: $options.header,
    blockScroll: $options.blockScroll,
    position: $options.position,
    breakpoints: _ctx.breakpoints,
    closeOnEscape: $options.closeOnEscape,
    draggable: _ctx.draggable,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, createSlots({
    "default": withCtx(function () {
      return [!_ctx.$slots.container ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [!_ctx.$slots.message ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [renderSlot(_ctx.$slots, "icon", {}, function () {
        return [_ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
          key: 0,
          "class": normalizeClass(_ctx.cx('icon'))
        }, null, 8, ["class"])) : $data.confirmation.icon ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": [$data.confirmation.icon, _ctx.cx('icon')]
        }, _ctx.ptm('icon')), null, 16)) : createCommentVNode("", true)];
      }), createElementVNode("span", mergeProps({
        "class": _ctx.cx('message')
      }, _ctx.ptm('message')), toDisplayString($options.message), 17)], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.message), {
        key: 1,
        message: $data.confirmation
      }, null, 8, ["message"]))], 64)) : createCommentVNode("", true)];
    }),
    _: 2
  }, [_ctx.$slots.container ? {
    name: "container",
    fn: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "container", {
        message: $data.confirmation,
        onClose: slotProps.onClose,
        onAccept: $options.accept,
        onReject: $options.reject,
        closeCallback: slotProps.onclose,
        acceptCallback: $options.accept,
        rejectCallback: $options.reject
      })];
    }),
    key: "0"
  } : undefined, !_ctx.$slots.container ? {
    name: "footer",
    fn: withCtx(function () {
      return [createVNode(_component_CDButton, {
        label: $options.rejectLabel,
        "class": normalizeClass([_ctx.cx('rejectButton'), $data.confirmation.rejectClass]),
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.reject();
        }),
        autofocus: $options.autoFocusReject,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('rejectButton')
      }, createSlots({
        _: 2
      }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
        name: "icon",
        fn: withCtx(function (iconProps) {
          return [renderSlot(_ctx.$slots, "rejecticon", {}, function () {
            return [createElementVNode("span", mergeProps({
              "class": [$options.rejectIcon, iconProps["class"]]
            }, _ctx.ptm('rejectButton')['icon'], {
              "data-pc-section": "rejectbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1032, ["label", "class", "autofocus", "unstyled", "pt"]), createVNode(_component_CDButton, {
        label: $options.acceptLabel,
        "class": normalizeClass([_ctx.cx('acceptButton'), $data.confirmation.acceptClass]),
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.accept();
        }),
        autofocus: $options.autoFocusAccept,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('acceptButton')
      }, createSlots({
        _: 2
      }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
        name: "icon",
        fn: withCtx(function (iconProps) {
          return [renderSlot(_ctx.$slots, "accepticon", {}, function () {
            return [createElementVNode("span", mergeProps({
              "class": [$options.acceptIcon, iconProps["class"]]
            }, _ctx.ptm('acceptButton')['icon'], {
              "data-pc-section": "acceptbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1032, ["label", "class", "autofocus", "unstyled", "pt"])];
    }),
    key: "1"
  } : undefined]), 1032, ["visible", "class", "header", "blockScroll", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt", "unstyled"]);
}

script.render = render;

export { script as default };
