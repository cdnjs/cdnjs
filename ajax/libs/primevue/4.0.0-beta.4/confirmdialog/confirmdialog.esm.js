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
      $pcConfirmDialog: this,
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
      if (this.confirmation) {
        var confirmation = this.confirmation;
        return confirmation.acceptLabel ? confirmation.acceptLabel : confirmation.acceptProps ? confirmation.acceptProps.label || this.$primevue.config.locale.accept : null;
      }
      return null;
    },
    rejectLabel: function rejectLabel() {
      if (this.confirmation) {
        var confirmation = this.confirmation;
        return confirmation.rejectLabel ? confirmation.rejectLabel : confirmation.rejectProps ? confirmation.rejectProps.label || this.$primevue.config.locale.reject : null;
      }
      return null;
    },
    acceptIcon: function acceptIcon() {
      var _this$confirmation;
      return this.confirmation ? this.confirmation.acceptIcon : (_this$confirmation = this.confirmation) !== null && _this$confirmation !== void 0 && _this$confirmation.acceptProps ? this.confirmation.acceptProps.icon : null;
    },
    rejectIcon: function rejectIcon() {
      var _this$confirmation2;
      return this.confirmation ? this.confirmation.rejectIcon : (_this$confirmation2 = this.confirmation) !== null && _this$confirmation2 !== void 0 && _this$confirmation2.rejectProps ? this.confirmation.rejectProps.icon : null;
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
    Dialog: Dialog,
    Button: Button
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  var _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createBlock(_component_Dialog, {
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
      var _$data$confirmation$r;
      return [createVNode(_component_Button, mergeProps({
        "class": [_ctx.cx('pcRejectButton'), $data.confirmation.rejectClass],
        autofocus: $options.autoFocusReject,
        unstyled: _ctx.unstyled,
        text: ((_$data$confirmation$r = $data.confirmation.rejectProps) === null || _$data$confirmation$r === void 0 ? void 0 : _$data$confirmation$r.text) || false,
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.reject();
        })
      }, $data.confirmation.rejectProps, {
        label: $options.rejectLabel,
        pt: _ctx.ptm('pcRejectButton')
      }), createSlots({
        _: 2
      }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
        name: "icon",
        fn: withCtx(function (iconProps) {
          return [renderSlot(_ctx.$slots, "rejecticon", {}, function () {
            return [createElementVNode("span", mergeProps({
              "class": [$options.rejectIcon, iconProps["class"]]
            }, _ctx.ptm('pcRejectButton')['icon'], {
              "data-pc-section": "rejectbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1040, ["class", "autofocus", "unstyled", "text", "label", "pt"]), createVNode(_component_Button, mergeProps({
        label: $options.acceptLabel,
        "class": [_ctx.cx('pcAcceptButton'), $data.confirmation.acceptClass],
        autofocus: $options.autoFocusAccept,
        unstyled: _ctx.unstyled,
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.accept();
        })
      }, $data.confirmation.acceptProps, {
        pt: _ctx.ptm('pcAcceptButton')
      }), createSlots({
        _: 2
      }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
        name: "icon",
        fn: withCtx(function (iconProps) {
          return [renderSlot(_ctx.$slots, "accepticon", {}, function () {
            return [createElementVNode("span", mergeProps({
              "class": [$options.acceptIcon, iconProps["class"]]
            }, _ctx.ptm('pcAcceptButton')['icon'], {
              "data-pc-section": "acceptbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1040, ["label", "class", "autofocus", "unstyled", "pt"])];
    }),
    key: "1"
  } : undefined]), 1032, ["visible", "class", "header", "blockScroll", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt", "unstyled"]);
}

script.render = render;

export { script as default };
