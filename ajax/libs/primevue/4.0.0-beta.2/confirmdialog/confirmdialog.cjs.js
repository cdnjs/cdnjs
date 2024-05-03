'use strict';

var Button = require('primevue/button');
var ConfirmationEventBus = require('primevue/confirmationeventbus');
var Dialog = require('primevue/dialog');
var BaseComponent = require('primevue/basecomponent');
var ConfirmDialogStyle = require('primevue/confirmdialog/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var ConfirmationEventBus__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmationEventBus);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ConfirmDialogStyle__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmDialogStyle);

var script$1 = {
  name: 'BaseConfirmDialog',
  "extends": BaseComponent__default["default"],
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
  style: ConfirmDialogStyle__default["default"],
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
    ConfirmationEventBus__default["default"].on('confirm', this.confirmListener);
    ConfirmationEventBus__default["default"].on('close', this.closeListener);
  },
  beforeUnmount: function beforeUnmount() {
    ConfirmationEventBus__default["default"].off('confirm', this.confirmListener);
    ConfirmationEventBus__default["default"].off('close', this.closeListener);
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
    Dialog: Dialog__default["default"],
    Button: Button__default["default"]
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = vue.resolveComponent("Button");
  var _component_Dialog = vue.resolveComponent("Dialog");
  return vue.openBlock(), vue.createBlock(_component_Dialog, {
    visible: $data.visible,
    "onUpdate:visible": [_cache[2] || (_cache[2] = function ($event) {
      return $data.visible = $event;
    }), $options.onHide],
    role: "alertdialog",
    "class": vue.normalizeClass(_ctx.cx('root')),
    modal: true,
    header: $options.header,
    blockScroll: $options.blockScroll,
    position: $options.position,
    breakpoints: _ctx.breakpoints,
    closeOnEscape: $options.closeOnEscape,
    draggable: _ctx.draggable,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, vue.createSlots({
    "default": vue.withCtx(function () {
      return [!_ctx.$slots.container ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: 0
      }, [!_ctx.$slots.message ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: 0
      }, [vue.renderSlot(_ctx.$slots, "icon", {}, function () {
        return [_ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
          key: 0,
          "class": vue.normalizeClass(_ctx.cx('icon'))
        }, null, 8, ["class"])) : $data.confirmation.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 1,
          "class": [$data.confirmation.icon, _ctx.cx('icon')]
        }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true)];
      }), vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('message')
      }, _ctx.ptm('message')), vue.toDisplayString($options.message), 17)], 64)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.message), {
        key: 1,
        message: $data.confirmation
      }, null, 8, ["message"]))], 64)) : vue.createCommentVNode("", true)];
    }),
    _: 2
  }, [_ctx.$slots.container ? {
    name: "container",
    fn: vue.withCtx(function (slotProps) {
      return [vue.renderSlot(_ctx.$slots, "container", {
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
    fn: vue.withCtx(function () {
      var _$data$confirmation$r;
      return [vue.createVNode(_component_Button, vue.mergeProps({
        "class": [_ctx.cx('rejectButton'), $data.confirmation.rejectClass],
        autofocus: $options.autoFocusReject,
        unstyled: _ctx.unstyled,
        text: ((_$data$confirmation$r = $data.confirmation.rejectProps) === null || _$data$confirmation$r === void 0 ? void 0 : _$data$confirmation$r.text) || false,
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.reject();
        })
      }, $data.confirmation.rejectProps, {
        label: $options.rejectLabel,
        pt: _ctx.ptm('rejectButton')
      }), vue.createSlots({
        _: 2
      }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
        name: "icon",
        fn: vue.withCtx(function (iconProps) {
          return [vue.renderSlot(_ctx.$slots, "rejecticon", {}, function () {
            return [vue.createElementVNode("span", vue.mergeProps({
              "class": [$options.rejectIcon, iconProps["class"]]
            }, _ctx.ptm('rejectButton')['icon'], {
              "data-pc-section": "rejectbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1040, ["class", "autofocus", "unstyled", "text", "label", "pt"]), vue.createVNode(_component_Button, vue.mergeProps({
        label: $options.acceptLabel,
        "class": [_ctx.cx('acceptButton'), $data.confirmation.acceptClass],
        autofocus: $options.autoFocusAccept,
        unstyled: _ctx.unstyled,
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.accept();
        })
      }, $data.confirmation.acceptProps, {
        pt: _ctx.ptm('acceptButton')
      }), vue.createSlots({
        _: 2
      }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
        name: "icon",
        fn: vue.withCtx(function (iconProps) {
          return [vue.renderSlot(_ctx.$slots, "accepticon", {}, function () {
            return [vue.createElementVNode("span", vue.mergeProps({
              "class": [$options.acceptIcon, iconProps["class"]]
            }, _ctx.ptm('acceptButton')['icon'], {
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

module.exports = script;
