import { defineComponent, resolveComponent, resolveDirective, createBlock, openBlock, Transition, withCtx, withDirectives, createCommentVNode, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createVNode, renderSlot, Fragment, mergeProps, withKeys, vModelDynamic, createTextVNode, createApp, h } from 'vue';
import { d as directive } from './trapFocus-KHP_kCNE.js';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { M as Modal } from './Modal-EiR_KNGZ.js';
import { B as BButton } from './Button-DyUYShTZ.js';
import { c as config } from './config-CKuo-p6e.js';
import { removeElement, getComponentFromVNode, copyAppContext } from './helpers.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent, r as registerComponentProgrammatic } from './plugins-B172kuKE.js';

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
const Dialog$1 = defineComponent({
  name: "BDialog",
  components: {
    BIcon,
    BButton
  },
  directives: {
    trapFocus: directive
  },
  extends: Modal,
  props: {
    title: String,
    message: [String, Array],
    icon: String,
    iconPack: String,
    hasIcon: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    size: String,
    confirmText: {
      type: String,
      default: () => {
        return config.defaultDialogConfirmText ? config.defaultDialogConfirmText : "OK";
      }
    },
    cancelText: {
      type: String,
      default: () => {
        return config.defaultDialogCancelText ? config.defaultDialogCancelText : "Cancel";
      }
    },
    hasInput: Boolean,
    // Used internally to know if it's prompt
    inputAttrs: {
      type: Object,
      default: () => ({})
    },
    confirmCallback: {
      // I was not able to figure out how to specify the "self" type here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function,
      default: () => {
      }
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    container: {
      type: String,
      default: () => {
        return config.defaultContainerElement;
      }
    },
    focusOn: {
      type: String,
      default: "confirm"
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    // second parameter is the dialog instance but typed any
    // because I was not able to figure out how to specify the "self" type here
    confirm: (value, dialog) => true
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  },
  data() {
    const prompt = this.hasInput ? this.inputAttrs.value || "" : "";
    return {
      prompt,
      isActive: false,
      validationMessage: "",
      isCompositing: false,
      isLoading: false
    };
  },
  computed: {
    // `safeInputAttrs` is a shallow copy of `inputAttrs` except for `value`
    // `value` should not be specified to `v-bind` of the input element
    // because it inhibits `v-model` of the input on Vue 3
    safeInputAttrs() {
      const attrs = __spreadValues$1({}, this.inputAttrs);
      delete attrs.value;
      if (typeof attrs.required === "undefined") {
        attrs.required = true;
      }
      return attrs;
    },
    dialogClass() {
      return [this.size, {
        "has-custom-container": this.container !== null
      }];
    },
    /*
    * Icon name (MDI) based on the type.
    */
    iconByType() {
      switch (this.type) {
        case "is-info":
          return "information";
        case "is-success":
          return "check-circle";
        case "is-warning":
          return "alert";
        case "is-danger":
          return "alert-circle";
        default:
          return null;
      }
    },
    showCancel() {
      return this.cancelOptions.indexOf("button") >= 0;
    }
  },
  methods: {
    /*
    * If it's a prompt Dialog, validate the input.
    * Call the confirmCallback prop (function) and close the Dialog.
    */
    confirm() {
      const input = this.$refs.input;
      if (input != null) {
        if (this.isCompositing) return;
        if (!input.checkValidity()) {
          this.validationMessage = input.validationMessage;
          this.$nextTick(() => input.select());
          return;
        }
      }
      this.$emit("confirm", this.prompt, this);
      this.confirmCallback(this.prompt, this);
      if (this.closeOnConfirm) this.close();
    },
    /*
    * Close the Dialog.
    */
    close() {
      this.isActive = false;
      this.isLoading = false;
      setTimeout(() => {
        removeElement(this.$el);
      }, 150);
    },
    /*
    * Start the Loading.
    */
    startLoading() {
      this.isLoading = true;
    },
    /*
    * Cancel the Loading.
    */
    cancelLoading() {
      this.isLoading = false;
    }
  },
  beforeMount() {
    if (typeof window !== "undefined") {
      this.$nextTick(() => {
        const container = document.querySelector(this.container) || document.body;
        container.appendChild(this.$el);
      });
    }
  },
  mounted() {
    this.isActive = true;
    this.$nextTick(() => {
      if (this.hasInput) {
        this.$refs.input.focus();
      } else if (this.focusOn === "cancel" && this.showCancel) {
        this.$refs.cancelButton.$el.focus();
      } else {
        this.$refs.confirmButton.$el.focus();
      }
    });
  }
});

const _hoisted_1 = ["role", "aria-modal"];
const _hoisted_2 = { class: "modal-card animation-content" };
const _hoisted_3 = {
  key: 0,
  class: "modal-card-head"
};
const _hoisted_4 = { class: "modal-card-title" };
const _hoisted_5 = { class: "media" };
const _hoisted_6 = {
  key: 0,
  class: "media-left"
};
const _hoisted_7 = { class: "media-content" };
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = {
  key: 0,
  class: "field"
};
const _hoisted_10 = { class: "control" };
const _hoisted_11 = { class: "help is-danger" };
const _hoisted_12 = { class: "modal-card-foot" };
const _hoisted_13 = { class: "buttons" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_button = resolveComponent("b-button");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      _ctx.isActive ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["dialog modal is-active", _ctx.dialogClass]),
        role: _ctx.ariaRole,
        "aria-modal": _ctx.ariaModal
      }, [
        createElementVNode("div", {
          class: "modal-background",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
        }),
        createElementVNode("div", _hoisted_2, [
          _ctx.title ? (openBlock(), createElementBlock("header", _hoisted_3, [
            createElementVNode(
              "p",
              _hoisted_4,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ])) : createCommentVNode("v-if", true),
          createElementVNode(
            "section",
            {
              class: normalizeClass(["modal-card-body", { "is-titleless": !_ctx.title, "is-flex": _ctx.hasIcon }])
            },
            [
              createElementVNode("div", _hoisted_5, [
                _ctx.hasIcon && (_ctx.icon || _ctx.iconByType) ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  createVNode(_component_b_icon, {
                    icon: _ctx.icon ? _ctx.icon : _ctx.iconByType,
                    pack: _ctx.iconPack,
                    type: _ctx.type,
                    both: !_ctx.icon,
                    size: "is-large"
                  }, null, 8, ["icon", "pack", "type", "both"])
                ])) : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_7, [
                  createElementVNode("p", null, [
                    _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                        createElementVNode("div", { innerHTML: _ctx.message }, null, 8, _hoisted_8)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]),
                  _ctx.hasInput ? (openBlock(), createElementBlock("div", _hoisted_9, [
                    createElementVNode("div", _hoisted_10, [
                      withDirectives(createElementVNode(
                        "input",
                        mergeProps({
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.prompt = $event),
                          class: ["input", { "is-danger": _ctx.validationMessage }],
                          ref: "input"
                        }, _ctx.safeInputAttrs, {
                          onCompositionstart: _cache[2] || (_cache[2] = ($event) => _ctx.isCompositing = true),
                          onCompositionend: _cache[3] || (_cache[3] = ($event) => _ctx.isCompositing = false),
                          onKeydown: _cache[4] || (_cache[4] = withKeys((...args) => _ctx.confirm && _ctx.confirm(...args), ["enter"]))
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      ), [
                        [vModelDynamic, _ctx.prompt]
                      ])
                    ]),
                    createElementVNode(
                      "p",
                      _hoisted_11,
                      toDisplayString(_ctx.validationMessage),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true)
                ])
              ])
            ],
            2
            /* CLASS */
          ),
          createElementVNode("footer", _hoisted_12, [
            createElementVNode("div", _hoisted_13, [
              _ctx.showCancel ? (openBlock(), createBlock(_component_b_button, {
                key: 0,
                ref: "cancelButton",
                disabled: _ctx.isLoading,
                onClick: _cache[5] || (_cache[5] = ($event) => _ctx.cancel("button"))
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.cancelText),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])) : createCommentVNode("v-if", true),
              createVNode(_component_b_button, {
                type: _ctx.type,
                ref: "confirmButton",
                loading: _ctx.isLoading,
                onClick: _ctx.confirm
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.confirmText),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["type", "loading", "onClick"])
            ])
          ])
        ])
      ], 10, _hoisted_1)), [
        [_directive_trap_focus, _ctx.trapFocus]
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var Dialog = /* @__PURE__ */ _export_sfc(Dialog$1, [["render", _sfc_render]]);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
function open(propsData, app) {
  let slot;
  if (Array.isArray(propsData.message)) {
    slot = propsData.message;
    delete propsData.message;
  }
  function createDialog(onConfirm, onCancel) {
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          dialogVNode: null
        };
      },
      methods: {
        close() {
          const dialog = getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.close();
          }
        },
        startLoading() {
          const dialog = getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.startLoading();
          }
        },
        cancelLoading() {
          const dialog = getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.cancelLoading();
          }
        }
      },
      render() {
        this.dialogVNode = h(
          Dialog,
          __spreadProps(__spreadValues({}, propsData), {
            // intentionally overrides propsData.onConfirm
            // to prevent propsData.onConfirm from receiving a "confirm" event
            onConfirm: (value) => {
              if (onConfirm != null) {
                onConfirm(value);
              }
            },
            // intentionally override propsData.onCancel
            // to prevent propsData.onCancel from receiving a "cancel" event
            onCancel: (method) => {
              if (onCancel != null) {
                onCancel(method);
              }
              vueInstance.unmount();
            },
            confirmCallback: (value, dialog) => {
              if (propsData.onConfirm != null) {
                propsData.onConfirm(value, dialog);
              }
            },
            cancelCallback: (method) => {
              if (propsData.onCancel != null) {
                propsData.onCancel(method);
              }
            }
          }),
          slot ? { default: () => slot } : void 0
        );
        return this.dialogVNode;
      }
    });
    if (app) {
      copyAppContext(app, vueInstance);
    }
    return vueInstance.mount(container);
  }
  if (!config.defaultProgrammaticPromise) {
    return createDialog();
  } else {
    return new Promise((resolve) => {
      const dialog = createDialog(
        (event) => resolve({ result: event || true, dialog }),
        () => resolve({ result: false, dialog })
      );
    });
  }
}
class DialogProgrammatic {
  constructor(app) {
    __publicField(this, "app");
    this.app = app;
  }
  alert(params) {
    let newParams;
    if (typeof params === "string") {
      newParams = {
        message: params
      };
    } else {
      newParams = params;
    }
    newParams = __spreadValues({
      canCancel: false
    }, newParams);
    return open(newParams, this.app);
  }
  confirm(params) {
    return open(params, this.app);
  }
  prompt(params) {
    return open(__spreadValues({ hasInput: true }, params), this.app);
  }
}
const Plugin = {
  install(Vue) {
    registerComponent(Vue, Dialog);
    registerComponentProgrammatic(Vue, "dialog", new DialogProgrammatic(Vue));
  }
};

export { Dialog as BDialog, DialogProgrammatic, Plugin as default };
