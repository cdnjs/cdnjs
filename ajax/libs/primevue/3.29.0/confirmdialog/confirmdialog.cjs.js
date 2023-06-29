'use strict';

var BaseComponent = require('primevue/basecomponent');
var Button = require('primevue/button');
var ConfirmationEventBus = require('primevue/confirmationeventbus');
var Dialog = require('primevue/dialog');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var ConfirmationEventBus__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmationEventBus);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);

var script = {
    name: 'ConfirmDialog',
    extends: BaseComponent__default["default"],
    props: {
        group: String,
        breakpoints: {
            type: Object,
            default: null
        },
        draggable: {
            type: Boolean,
            default: true
        }
    },
    confirmListener: null,
    closeListener: null,
    data() {
        return {
            visible: false,
            confirmation: null
        };
    },
    mounted() {
        this.confirmListener = (options) => {
            if (!options) {
                return;
            }

            if (options.group === this.group) {
                this.confirmation = options;

                if (this.confirmation.onShow) {
                    this.confirmation.onShow();
                }

                this.visible = true;
            }
        };

        this.closeListener = () => {
            this.visible = false;
            this.confirmation = null;
        };

        ConfirmationEventBus__default["default"].on('confirm', this.confirmListener);
        ConfirmationEventBus__default["default"].on('close', this.closeListener);
    },
    beforeUnmount() {
        ConfirmationEventBus__default["default"].off('confirm', this.confirmListener);
        ConfirmationEventBus__default["default"].off('close', this.closeListener);
    },
    methods: {
        accept() {
            if (this.confirmation.accept) {
                this.confirmation.accept();
            }

            this.visible = false;
        },
        reject() {
            if (this.confirmation.reject) {
                this.confirmation.reject();
            }

            this.visible = false;
        },
        onHide() {
            if (this.confirmation.onHide) {
                this.confirmation.onHide();
            }

            this.visible = false;
        }
    },
    computed: {
        header() {
            return this.confirmation ? this.confirmation.header : null;
        },
        message() {
            return this.confirmation ? this.confirmation.message : null;
        },
        blockScroll() {
            return this.confirmation ? this.confirmation.blockScroll : true;
        },
        position() {
            return this.confirmation ? this.confirmation.position : null;
        },
        iconClass() {
            return ['p-confirm-dialog-icon', this.confirmation ? this.confirmation.icon : null];
        },
        acceptLabel() {
            return this.confirmation ? this.confirmation.acceptLabel || this.$primevue.config.locale.accept : null;
        },
        rejectLabel() {
            return this.confirmation ? this.confirmation.rejectLabel || this.$primevue.config.locale.reject : null;
        },
        acceptIcon() {
            return this.confirmation ? this.confirmation.acceptIcon : null;
        },
        rejectIcon() {
            return this.confirmation ? this.confirmation.rejectIcon : null;
        },
        acceptClass() {
            return ['p-confirm-dialog-accept', this.confirmation ? this.confirmation.acceptClass : null];
        },
        rejectClass() {
            return ['p-confirm-dialog-reject', this.confirmation ? this.confirmation.rejectClass || 'p-button-text' : null];
        },
        autoFocusAccept() {
            return this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept' ? true : false;
        },
        autoFocusReject() {
            return this.confirmation.defaultFocus === 'reject' ? true : false;
        },
        closeOnEscape() {
            return this.confirmation ? this.confirmation.closeOnEscape : true;
        }
    },
    components: {
        CDialog: Dialog__default["default"],
        CDButton: Button__default["default"]
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CDButton = vue.resolveComponent("CDButton");
  const _component_CDialog = vue.resolveComponent("CDialog");

  return (vue.openBlock(), vue.createBlock(_component_CDialog, {
    visible: $data.visible,
    "onUpdate:visible": [
      _cache[2] || (_cache[2] = $event => (($data.visible) = $event)),
      $options.onHide
    ],
    role: "alertdialog",
    class: "p-confirm-dialog",
    modal: true,
    header: $options.header,
    blockScroll: $options.blockScroll,
    position: $options.position,
    breakpoints: $props.breakpoints,
    closeOnEscape: $options.closeOnEscape,
    draggable: $props.draggable,
    pt: _ctx.pt
  }, {
    footer: vue.withCtx(() => [
      vue.createVNode(_component_CDButton, {
        label: $options.rejectLabel,
        class: vue.normalizeClass($options.rejectClass),
        iconPos: "left",
        onClick: _cache[0] || (_cache[0] = $event => ($options.reject())),
        autofocus: $options.autoFocusReject,
        pt: _ctx.ptm('rejectButton')
      }, {
        icon: vue.withCtx((iconProps) => [
          vue.renderSlot(_ctx.$slots, "rejecticon", {}, () => [
            vue.createElementVNode("span", vue.mergeProps({
              class: [$options.rejectIcon, iconProps.class]
            }, _ctx.ptm('rejectButton')['icon']), null, 16)
          ])
        ]),
        _: 3
      }, 8, ["label", "class", "autofocus", "pt"]),
      vue.createVNode(_component_CDButton, {
        label: $options.acceptLabel,
        class: vue.normalizeClass($options.acceptClass),
        iconPos: "left",
        onClick: _cache[1] || (_cache[1] = $event => ($options.accept())),
        autofocus: $options.autoFocusAccept,
        pt: _ctx.ptm('acceptButton')
      }, {
        icon: vue.withCtx((iconProps) => [
          vue.renderSlot(_ctx.$slots, "accepticon", {}, () => [
            vue.createElementVNode("span", vue.mergeProps({
              class: [$options.acceptIcon, iconProps.class]
            }, _ctx.ptm('acceptButton')['icon']), null, 16)
          ])
        ]),
        _: 3
      }, 8, ["label", "class", "autofocus", "pt"])
    ]),
    default: vue.withCtx(() => [
      (!_ctx.$slots.message)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.renderSlot(_ctx.$slots, "icon", { class: "p-confirm-dialog-icon" }, () => [
              (_ctx.$slots.icon)
                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
                    key: 0,
                    class: "p-confirm-dialog-icon"
                  }))
                : ($data.confirmation.icon)
                  ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                      key: 1,
                      class: $options.iconClass
                    }, _ctx.ptm('icon')), null, 16))
                  : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("span", vue.mergeProps({ class: "p-confirm-dialog-message" }, _ctx.ptm('message')), vue.toDisplayString($options.message), 17)
          ], 64))
        : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.message), {
            key: 1,
            message: $data.confirmation
          }, null, 8, ["message"]))
    ]),
    _: 3
  }, 8, ["visible", "header", "blockScroll", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt"]))
}

script.render = render;

module.exports = script;
