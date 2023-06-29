import BaseComponent from 'primevue/basecomponent';
import Button from 'primevue/button';
import ConfirmationEventBus from 'primevue/confirmationeventbus';
import Dialog from 'primevue/dialog';
import { resolveComponent, openBlock, createBlock, withCtx, createVNode, normalizeClass, renderSlot, createElementVNode, mergeProps, createElementBlock, Fragment, resolveDynamicComponent, createCommentVNode, toDisplayString } from 'vue';

var script = {
    name: 'ConfirmDialog',
    extends: BaseComponent,
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

        ConfirmationEventBus.on('confirm', this.confirmListener);
        ConfirmationEventBus.on('close', this.closeListener);
    },
    beforeUnmount() {
        ConfirmationEventBus.off('confirm', this.confirmListener);
        ConfirmationEventBus.off('close', this.closeListener);
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
        CDialog: Dialog,
        CDButton: Button
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CDButton = resolveComponent("CDButton");
  const _component_CDialog = resolveComponent("CDialog");

  return (openBlock(), createBlock(_component_CDialog, {
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
    footer: withCtx(() => [
      createVNode(_component_CDButton, {
        label: $options.rejectLabel,
        class: normalizeClass($options.rejectClass),
        iconPos: "left",
        onClick: _cache[0] || (_cache[0] = $event => ($options.reject())),
        autofocus: $options.autoFocusReject,
        pt: _ctx.ptm('rejectButton')
      }, {
        icon: withCtx((iconProps) => [
          renderSlot(_ctx.$slots, "rejecticon", {}, () => [
            createElementVNode("span", mergeProps({
              class: [$options.rejectIcon, iconProps.class]
            }, _ctx.ptm('rejectButton')['icon']), null, 16)
          ])
        ]),
        _: 3
      }, 8, ["label", "class", "autofocus", "pt"]),
      createVNode(_component_CDButton, {
        label: $options.acceptLabel,
        class: normalizeClass($options.acceptClass),
        iconPos: "left",
        onClick: _cache[1] || (_cache[1] = $event => ($options.accept())),
        autofocus: $options.autoFocusAccept,
        pt: _ctx.ptm('acceptButton')
      }, {
        icon: withCtx((iconProps) => [
          renderSlot(_ctx.$slots, "accepticon", {}, () => [
            createElementVNode("span", mergeProps({
              class: [$options.acceptIcon, iconProps.class]
            }, _ctx.ptm('acceptButton')['icon']), null, 16)
          ])
        ]),
        _: 3
      }, 8, ["label", "class", "autofocus", "pt"])
    ]),
    default: withCtx(() => [
      (!_ctx.$slots.message)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            renderSlot(_ctx.$slots, "icon", { class: "p-confirm-dialog-icon" }, () => [
              (_ctx.$slots.icon)
                ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
                    key: 0,
                    class: "p-confirm-dialog-icon"
                  }))
                : ($data.confirmation.icon)
                  ? (openBlock(), createElementBlock("span", mergeProps({
                      key: 1,
                      class: $options.iconClass
                    }, _ctx.ptm('icon')), null, 16))
                  : createCommentVNode("", true)
            ]),
            createElementVNode("span", mergeProps({ class: "p-confirm-dialog-message" }, _ctx.ptm('message')), toDisplayString($options.message), 17)
          ], 64))
        : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.message), {
            key: 1,
            message: $data.confirmation
          }, null, 8, ["message"]))
    ]),
    _: 3
  }, 8, ["visible", "header", "blockScroll", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt"]))
}

script.render = render;

export { script as default };
