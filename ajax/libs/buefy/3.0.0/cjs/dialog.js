'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var trapFocus = require('./trapFocus-BlX6xykt.js');
var Icon = require('./Icon-lsDKE2wQ.js');
var Modal = require('./Modal-D1aZUehE.js');
var Button = require('./Button-Cq7yqI8p.js');
var config = require('./config-DR826Ki2.js');
var helpers = require('./helpers.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');

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
const Dialog$1 = vue.defineComponent({
  name: "BDialog",
  components: {
    BIcon: Icon.BIcon,
    BButton: Button.BButton
  },
  directives: {
    trapFocus: trapFocus.directive
  },
  extends: Modal.Modal,
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
        return config.config.defaultDialogConfirmText ? config.config.defaultDialogConfirmText : "OK";
      }
    },
    cancelText: {
      type: String,
      default: () => {
        return config.config.defaultDialogCancelText ? config.config.defaultDialogCancelText : "Cancel";
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
        return config.config.defaultContainerElement;
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
        helpers.removeElement(this.$el);
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
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_b_button = vue.resolveComponent("b-button");
  const _directive_trap_focus = vue.resolveDirective("trap-focus");
  return vue.openBlock(), vue.createBlock(vue.Transition, { name: _ctx.animation }, {
    default: vue.withCtx(() => [
      _ctx.isActive ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass(["dialog modal is-active", _ctx.dialogClass]),
        role: _ctx.ariaRole,
        "aria-modal": _ctx.ariaModal
      }, [
        vue.createElementVNode("div", {
          class: "modal-background",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
        }),
        vue.createElementVNode("div", _hoisted_2, [
          _ctx.title ? (vue.openBlock(), vue.createElementBlock("header", _hoisted_3, [
            vue.createElementVNode(
              "p",
              _hoisted_4,
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "section",
            {
              class: vue.normalizeClass(["modal-card-body", { "is-titleless": !_ctx.title, "is-flex": _ctx.hasIcon }])
            },
            [
              vue.createElementVNode("div", _hoisted_5, [
                _ctx.hasIcon && (_ctx.icon || _ctx.iconByType) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                  vue.createVNode(_component_b_icon, {
                    icon: _ctx.icon ? _ctx.icon : _ctx.iconByType,
                    pack: _ctx.iconPack,
                    type: _ctx.type,
                    both: !_ctx.icon,
                    size: "is-large"
                  }, null, 8, ["icon", "pack", "type", "both"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", _hoisted_7, [
                  vue.createElementVNode("p", null, [
                    _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 1 },
                      [
                        vue.createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                        vue.createElementVNode("div", { innerHTML: _ctx.message }, null, 8, _hoisted_8)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]),
                  _ctx.hasInput ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
                    vue.createElementVNode("div", _hoisted_10, [
                      vue.withDirectives(vue.createElementVNode(
                        "input",
                        vue.mergeProps({
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.prompt = $event),
                          class: ["input", { "is-danger": _ctx.validationMessage }],
                          ref: "input"
                        }, _ctx.safeInputAttrs, {
                          onCompositionstart: _cache[2] || (_cache[2] = ($event) => _ctx.isCompositing = true),
                          onCompositionend: _cache[3] || (_cache[3] = ($event) => _ctx.isCompositing = false),
                          onKeydown: _cache[4] || (_cache[4] = vue.withKeys((...args) => _ctx.confirm && _ctx.confirm(...args), ["enter"]))
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      ), [
                        [vue.vModelDynamic, _ctx.prompt]
                      ])
                    ]),
                    vue.createElementVNode(
                      "p",
                      _hoisted_11,
                      vue.toDisplayString(_ctx.validationMessage),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode("footer", _hoisted_12, [
            vue.createElementVNode("div", _hoisted_13, [
              _ctx.showCancel ? (vue.openBlock(), vue.createBlock(_component_b_button, {
                key: 0,
                ref: "cancelButton",
                disabled: _ctx.isLoading,
                onClick: _cache[5] || (_cache[5] = ($event) => _ctx.cancel("button"))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(_ctx.cancelText),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_b_button, {
                type: _ctx.type,
                ref: "confirmButton",
                loading: _ctx.isLoading,
                onClick: _ctx.confirm
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(_ctx.confirmText),
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
      ]) : vue.createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var Dialog = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Dialog$1, [["render", _sfc_render]]);

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
    const vueInstance = vue.createApp({
      data() {
        return {
          dialogVNode: null
        };
      },
      methods: {
        close() {
          const dialog = helpers.getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.close();
          }
        },
        startLoading() {
          const dialog = helpers.getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.startLoading();
          }
        },
        cancelLoading() {
          const dialog = helpers.getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.cancelLoading();
          }
        }
      },
      render() {
        this.dialogVNode = vue.h(
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
      helpers.copyAppContext(app, vueInstance);
    }
    return vueInstance.mount(container);
  }
  if (!config.config.defaultProgrammaticPromise) {
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
    plugins.registerComponent(Vue, Dialog);
    plugins.registerComponentProgrammatic(Vue, "dialog", new DialogProgrammatic(Vue));
  }
};

exports.BDialog = Dialog;
exports.DialogProgrammatic = DialogProgrammatic;
exports.default = Plugin;
