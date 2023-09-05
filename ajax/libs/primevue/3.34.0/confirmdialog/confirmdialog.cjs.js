'use strict';

var Button = require('primevue/button');
var ConfirmationEventBus = require('primevue/confirmationeventbus');
var Dialog = require('primevue/dialog');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var ConfirmationEventBus__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmationEventBus);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var classes = {
  root: 'p-confirm-dialog',
  icon: function icon(_ref) {
    var instance = _ref.instance;
    return ['p-confirm-dialog-icon', instance.confirmation ? instance.confirmation.icon : null];
  },
  message: 'p-confirm-dialog-message',
  rejectButton: function rejectButton(_ref2) {
    var instance = _ref2.instance;
    return ['p-confirm-dialog-reject', instance.confirmation ? instance.confirmation.rejectClass || 'p-button-text' : null];
  },
  acceptButton: function acceptButton(_ref3) {
    var instance = _ref3.instance;
    return ['p-confirm-dialog-accept', instance.confirmation ? instance.confirmation.acceptClass : null];
  }
};
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
  css: {
    classes: classes
  },
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
    CDialog: Dialog__default["default"],
    CDButton: Button__default["default"]
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CDButton = vue.resolveComponent("CDButton");
  var _component_CDialog = vue.resolveComponent("CDialog");
  return vue.openBlock(), vue.createBlock(_component_CDialog, {
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
  }, {
    footer: vue.withCtx(function () {
      return [vue.createVNode(_component_CDButton, {
        label: $options.rejectLabel,
        "class": vue.normalizeClass(_ctx.cx('rejectButton')),
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.reject();
        }),
        autofocus: $options.autoFocusReject,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('rejectButton'),
        "data-pc-name": "rejectbutton"
      }, vue.createSlots({
        _: 2
      }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
        name: "icon",
        fn: vue.withCtx(function (iconProps) {
          return [vue.renderSlot(_ctx.$slots, "rejecticon", {}, function () {
            return [vue.createElementVNode("span", vue.mergeProps({
              "class": [$options.rejectIcon, iconProps["class"]]
            }, _ctx.ptm('rejectButton')['icon'], {
              "data-pc-name": "rejectbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1032, ["label", "class", "autofocus", "unstyled", "pt"]), vue.createVNode(_component_CDButton, {
        label: $options.acceptLabel,
        "class": vue.normalizeClass(_ctx.cx('acceptButton')),
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.accept();
        }),
        autofocus: $options.autoFocusAccept,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('acceptButton'),
        "data-pc-name": "acceptbutton"
      }, vue.createSlots({
        _: 2
      }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
        name: "icon",
        fn: vue.withCtx(function (iconProps) {
          return [vue.renderSlot(_ctx.$slots, "accepticon", {}, function () {
            return [vue.createElementVNode("span", vue.mergeProps({
              "class": [$options.acceptIcon, iconProps["class"]]
            }, _ctx.ptm('acceptButton')['icon'], {
              "data-pc-name": "acceptbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : undefined]), 1032, ["label", "class", "autofocus", "unstyled", "pt"])];
    }),
    "default": vue.withCtx(function () {
      return [!_ctx.$slots.message ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: 0
      }, [vue.renderSlot(_ctx.$slots, "icon", {}, function () {
        return [_ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
          key: 0,
          "class": vue.normalizeClass(_ctx.cx('icon'))
        }, null, 8, ["class"])) : $data.confirmation.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 1,
          "class": _ctx.cx('icon')
        }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true)];
      }), vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('message')
      }, _ctx.ptm('message')), vue.toDisplayString($options.message), 17)], 64)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.message), {
        key: 1,
        message: $data.confirmation
      }, null, 8, ["message"]))];
    }),
    _: 3
  }, 8, ["visible", "class", "header", "blockScroll", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt", "unstyled"]);
}

script.render = render;

module.exports = script;
