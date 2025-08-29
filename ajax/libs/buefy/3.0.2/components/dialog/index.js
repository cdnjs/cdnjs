/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Dialog = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    const findFocusable = (element, programmatic = false) => {
      if (!element) {
        return null;
      }
      if (programmatic) {
        return element.querySelectorAll('*[tabindex="-1"]');
      }
      return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`);
    };
    let onKeyDown;
    const beforeMount = (el, { value = true }) => {
      if (value) {
        let focusable = findFocusable(el);
        let focusableProg = findFocusable(el, true);
        if (focusable && focusable.length > 0) {
          onKeyDown = (event) => {
            focusable = findFocusable(el);
            focusableProg = findFocusable(el, true);
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            if (event.target === firstFocusable && event.shiftKey && event.key === "Tab") {
              event.preventDefault();
              lastFocusable.focus();
            } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === "Tab") {
              event.preventDefault();
              firstFocusable.focus();
            }
          };
          el.addEventListener("keydown", onKeyDown);
        }
      }
    };
    const unmounted = (el) => {
      el.removeEventListener("keydown", onKeyDown);
    };
    const directive = {
      beforeMount,
      unmounted
    };

    let config = {
      defaultContainerElement: null,
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultModalCanCancel: ["escape", "x", "outside", "button"],
      defaultTrapFocus: true,
      defaultAutoFocus: true,
      defaultButtonRounded: false,
      defaultLinkTags: [
        "a",
        "button",
        "input",
        "router-link",
        "nuxt-link",
        "n-link",
        "RouterLink",
        "NuxtLink",
        "NLink"
      ]};

    function removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function getComponentFromVNode(vnode) {
      if (!vnode) {
        return void 0;
      }
      const { component } = vnode;
      if (!component) {
        return void 0;
      }
      return component.exposed && component.exposeProxy || component.proxy;
    }
    function copyAppContext(src, dest) {
      const { _context: srcContext } = src;
      const { _context: destContext } = dest;
      destContext.config = srcContext.config;
      destContext.mixins = srcContext.mixins;
      destContext.components = srcContext.components;
      destContext.directives = srcContext.directives;
      destContext.provides = srcContext.provides;
      destContext.optionsCache = srcContext.optionsCache;
      destContext.propsCache = srcContext.propsCache;
      destContext.emitsCache = srcContext.emitsCache;
      if ("__VUE_I18N_SYMBOL__" in src) {
        dest.__VUE_I18N_SYMBOL__ = src.__VUE_I18N_SYMBOL__;
      }
    }

    const mdiIcons = {
      sizes: {
        default: "mdi-24px",
        "is-small": null,
        "is-medium": "mdi-36px",
        "is-large": "mdi-48px"
      },
      iconPrefix: "mdi-"
    };
    const faIcons = () => {
      const faIconPrefix = "fa-";
      return {
        sizes: {
          default: null,
          "is-small": null,
          "is-medium": faIconPrefix + "lg",
          "is-large": faIconPrefix + "2x"
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
          information: "info-circle",
          alert: "exclamation-triangle",
          "alert-circle": "exclamation-circle",
          "chevron-right": "angle-right",
          "chevron-left": "angle-left",
          "chevron-down": "angle-down",
          "eye-off": "eye-slash",
          "menu-down": "caret-down",
          "menu-up": "caret-up",
          "close-circle": "times-circle"
        }
      };
    };
    const getIcons = () => {
      let icons = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons(),
        "fa-solid": faIcons(),
        "fa-regular": faIcons(),
        "fa-light": faIcons(),
        "fa-thin": faIcons(),
        "fa-duotone": faIcons(),
        "fa-brands": faIcons()
      };
      return icons;
    };

    var _sfc_main$1 = vue.defineComponent({
      name: "BIcon",
      props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: {
          type: String,
          required: true
        },
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean
        // This is used internally to show both MDI and FA icon
      },
      computed: {
        iconConfig() {
          const allIcons = getIcons();
          return allIcons[this.newPack];
        },
        iconPrefix() {
          if (this.iconConfig && this.iconConfig.iconPrefix) {
            return this.iconConfig.iconPrefix;
          }
          return "";
        },
        /*
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
          return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
        },
        newPack() {
          return this.pack || config.defaultIconPack;
        },
        newType() {
          if (!this.type) return;
          let splitType = [];
          if (typeof this.type === "string") {
            splitType = this.type.split("-");
          } else {
            for (const key in this.type) {
              if (this.type[key]) {
                splitType = key.split("-");
                break;
              }
            }
          }
          if (splitType.length <= 1) return;
          const [, ...type] = splitType;
          return `has-text-${type.join("-")}`;
        },
        newCustomSize() {
          return this.customSize || this.customSizeByPack;
        },
        customSizeByPack() {
          if (this.iconConfig && this.iconConfig.sizes) {
            if (this.size && this.iconConfig.sizes[this.size] !== void 0) {
              return this.iconConfig.sizes[this.size];
            } else if (this.iconConfig.sizes.default) {
              return this.iconConfig.sizes.default;
            }
          }
          return null;
        },
        useIconComponent() {
          return this.component || config.defaultIconComponent;
        }
      },
      methods: {
        /*
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
          if (!this.both) {
            return value;
          }
          if (this.iconConfig == null) {
            return value;
          }
          const maybeInternal = this.iconConfig;
          if (maybeInternal && maybeInternal.internalIcons && maybeInternal.internalIcons[value]) {
            return maybeInternal.internalIcons[value];
          }
          return value;
        }
      }
    });

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          class: vue.normalizeClass(["icon", [_ctx.newType, _ctx.size]])
        },
        [
          !_ctx.useIconComponent ? (vue.openBlock(), vue.createElementBlock(
            "i",
            {
              key: 0,
              class: vue.normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
            },
            null,
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.useIconComponent), {
            key: 1,
            icon: [_ctx.newPack, _ctx.newIcon],
            size: _ctx.newCustomSize,
            class: vue.normalizeClass([_ctx.customClass])
          }, null, 8, ["icon", "size", "class"]))
        ],
        2
        /* CLASS */
      );
    }
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$3]]);

    const MODAL_SCROLLS = ["clip", "keep"];
    const MODAL_ARIA_ROLES = ["dialog", "alertdialog"];
    const Modal$1 = vue.defineComponent({
      name: "BModal",
      directives: {
        trapFocus: directive
      },
      props: {
        modelValue: Boolean,
        component: [Object, Function, String],
        content: {
          type: [String, Object, Array]
        },
        programmatic: Boolean,
        props: Object,
        events: {
          type: Object,
          default() {
            return {};
          }
        },
        width: {
          type: [String, Number],
          default: 960
        },
        hasModalCard: Boolean,
        animation: {
          type: String,
          default: "zoom-out"
        },
        canCancel: {
          type: [Array, Boolean],
          default: () => {
            return config.defaultModalCanCancel;
          }
        },
        cancelCallback: {
          type: Function,
          default: () => {
          }
        },
        scroll: {
          type: String,
          default: () => {
            return "clip";
          },
          validator: (value) => {
            return MODAL_SCROLLS.indexOf(value) >= 0;
          }
        },
        fullScreen: Boolean,
        trapFocus: {
          type: Boolean,
          default: () => {
            return config.defaultTrapFocus;
          }
        },
        autoFocus: {
          type: Boolean,
          default: () => {
            return config.defaultAutoFocus;
          }
        },
        customClass: String,
        customContentClass: [String, Array, Object],
        ariaRole: {
          type: String,
          validator: (value) => {
            return MODAL_ARIA_ROLES.indexOf(value) >= 0;
          }
        },
        ariaModal: Boolean,
        ariaLabel: {
          type: String,
          validator: (value) => {
            return Boolean(value);
          }
        },
        closeButtonAriaLabel: {
          type: String,
          default: "close"
        },
        destroyOnHide: {
          type: Boolean,
          default: true
        },
        renderOnMounted: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        "after-enter": () => true,
        "after-leave": () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cancel: (method) => true,
        close: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "update:modelValue": (active) => true
      },
      data() {
        return {
          isActive: this.modelValue || false,
          savedScrollTop: null,
          newWidth: typeof this.width === "number" ? this.width + "px" : this.width,
          animating: !this.modelValue,
          destroyed: !(this.modelValue || this.renderOnMounted)
        };
      },
      computed: {
        cancelOptions() {
          return typeof this.canCancel === "boolean" ? this.canCancel ? config.defaultModalCanCancel : [] : this.canCancel;
        },
        showX() {
          return this.cancelOptions.indexOf("x") >= 0;
        },
        customStyle() {
          if (!this.fullScreen) {
            return { maxWidth: this.newWidth };
          }
          return null;
        }
      },
      watch: {
        modelValue(value) {
          this.isActive = value;
        },
        isActive(value) {
          if (value) this.destroyed = false;
          this.handleScroll();
          this.$nextTick(() => {
            if (value && this.$el && this.$el.focus && this.autoFocus) {
              this.$el.focus();
            }
          });
        }
      },
      methods: {
        handleScroll() {
          if (typeof window === "undefined") return;
          if (this.scroll === "clip") {
            if (this.isActive) {
              document.documentElement.classList.add("is-clipped");
            } else {
              document.documentElement.classList.remove("is-clipped");
            }
            return;
          }
          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          if (this.isActive) {
            document.body.classList.add("is-noscroll");
          } else {
            document.body.classList.remove("is-noscroll");
          }
          if (this.isActive) {
            document.body.style.top = `-${this.savedScrollTop}px`;
            return;
          }
          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = "";
          this.savedScrollTop = null;
        },
        /*
        * Close the Modal if canCancel and call the cancelCallback prop (function).
        */
        cancel(method) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          this.$emit("cancel", method);
          this.cancelCallback.apply(null, [method]);
          this.close();
        },
        /*
        * Call the cancelCallback prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
          this.$emit("close");
          this.$emit("update:modelValue", false);
          if (this.programmatic) {
            this.isActive = false;
            setTimeout(() => {
              removeElement(this.$el);
            }, 150);
          }
        },
        /*
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
          if (this.isActive && (key === "Escape" || key === "Esc")) this.cancel("escape");
        },
        /*
        * Transition after-enter hook
        */
        afterEnter() {
          this.animating = false;
          this.$emit("after-enter");
        },
        /*
        * Transition before-leave hook
        */
        beforeLeave() {
          this.animating = true;
        },
        /*
        * Transition after-leave hook
        */
        afterLeave() {
          if (this.destroyOnHide) {
            this.destroyed = true;
          }
          this.$emit("after-leave");
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
        }
      },
      mounted() {
        if (this.programmatic) {
          document.body.appendChild(this.$el);
          this.isActive = true;
        } else if (this.isActive) this.handleScroll();
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
          document.documentElement.classList.remove("is-clipped");
          const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          document.body.classList.remove("is-noscroll");
          document.documentElement.scrollTop = savedScrollTop;
          document.body.style.top = "";
        }
      }
    });

    const _hoisted_1$2 = ["role", "aria-label", "aria-modal"];
    const _hoisted_2$2 = ["innerHTML"];
    const _hoisted_3$1 = ["aria-label"];
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_trap_focus = vue.resolveDirective("trap-focus");
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: _ctx.animation,
        onAfterEnter: _ctx.afterEnter,
        onBeforeLeave: _ctx.beforeLeave,
        onAfterLeave: _ctx.afterLeave
      }, {
        default: vue.withCtx(() => [
          !_ctx.destroyed ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(["modal is-active", [{ "is-full-screen": _ctx.fullScreen }, _ctx.customClass]]),
            tabindex: "-1",
            role: _ctx.ariaRole,
            "aria-label": _ctx.ariaLabel,
            "aria-modal": _ctx.ariaModal || void 0
          }, [
            vue.createElementVNode("div", {
              class: "modal-background",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
            }),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(["animation-content", [{ "modal-content": !_ctx.hasModalCard }, _ctx.customContentClass]]),
                style: vue.normalizeStyle(_ctx.customStyle)
              },
              [
                _ctx.component ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.component), vue.mergeProps({ key: 0 }, _ctx.props, vue.toHandlers(_ctx.events), {
                  "can-cancel": _ctx.canCancel,
                  onClose: _ctx.close
                }), null, 16, ["can-cancel", "onClose"])) : _ctx.content ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                    vue.createElementVNode("div", { innerHTML: _ctx.content }, null, 8, _hoisted_2$2)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.renderSlot(_ctx.$slots, "default", {
                  key: 2,
                  canCancel: _ctx.canCancel,
                  close: _ctx.close
                })
              ],
              6
              /* CLASS, STYLE */
            ),
            _ctx.showX ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              class: "modal-close is-large",
              "aria-label": _ctx.closeButtonAriaLabel,
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.cancel("x"))
            }, null, 8, _hoisted_3$1)), [
              [vue.vShow, !_ctx.animating]
            ]) : vue.createCommentVNode("v-if", true)
          ], 10, _hoisted_1$2)), [
            [vue.vShow, _ctx.isActive],
            [_directive_trap_focus, _ctx.trapFocus]
          ]) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]);
    }
    var Modal = /* @__PURE__ */ _export_sfc(Modal$1, [["render", _sfc_render$2]]);

    const NATIVE_TYPES = [
      "button",
      "submit",
      "reset"
    ];
    var _sfc_main = vue.defineComponent({
      name: "BButton",
      components: { BIcon },
      inheritAttrs: false,
      props: {
        type: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
          type: Boolean,
          default: () => {
            return config.defaultButtonRounded;
          }
        },
        loading: Boolean,
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
          type: String,
          default: "button",
          validator: (value) => {
            return NATIVE_TYPES.indexOf(value) >= 0;
          }
        },
        tag: {
          type: [String, Object],
          default: "button",
          validator: (value) => {
            return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
          }
        }
      },
      computed: {
        computedTag() {
          if (this.$attrs.disabled !== void 0 && this.$attrs.disabled !== false) {
            return "button";
          }
          return this.tag;
        },
        iconSize() {
          if (!this.size || this.size === "is-medium") {
            return "is-small";
          } else if (this.size === "is-large") {
            return "is-medium";
          }
          return this.size;
        }
      }
    });

    const _hoisted_1$1 = { key: 1 };
    const _hoisted_2$1 = { key: 2 };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.computedTag), vue.mergeProps({ class: "button" }, _ctx.$attrs, {
        type: typeof _ctx.computedTag === "string" && ["button", "input"].includes(_ctx.computedTag) ? _ctx.nativeType : void 0,
        class: [_ctx.size, _ctx.type, {
          "is-rounded": _ctx.rounded,
          "is-loading": _ctx.loading,
          "is-outlined": _ctx.outlined,
          "is-fullwidth": _ctx.expanded,
          "is-inverted": _ctx.inverted,
          "is-focused": _ctx.focused,
          "is-active": _ctx.active,
          "is-hovered": _ctx.hovered,
          "is-selected": _ctx.selected
        }]
      }), {
        default: vue.withCtx(() => [
          _ctx.iconLeft ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            pack: _ctx.iconPack,
            icon: _ctx.iconLeft,
            size: _ctx.iconSize
          }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true),
          _ctx.label ? (vue.openBlock(), vue.createElementBlock(
            "span",
            _hoisted_1$1,
            vue.toDisplayString(_ctx.label),
            1
            /* TEXT */
          )) : _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$1, [
            vue.renderSlot(_ctx.$slots, "default")
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.iconRight ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            pack: _ctx.iconPack,
            icon: _ctx.iconRight,
            size: _ctx.iconSize
          }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["type", "class"]);
    }
    var BButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render$1]]);

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
            return "OK";
          }
        },
        cancelText: {
          type: String,
          default: () => {
            return "Cancel";
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
    var Dialog = /* @__PURE__ */ _export_sfc(Dialog$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };
    const registerComponentProgrammatic = (Vue, property, component) => {
      if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
      Vue.config.globalProperties.$buefy[property] = component;
    };

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
            this.dialogVNode = vue.h(
              Dialog,
              __spreadProps(__spreadValues({}, propsData), {
                // intentionally overrides propsData.onConfirm
                // to prevent propsData.onConfirm from receiving a "confirm" event
                onConfirm: (value) => {
                },
                // intentionally override propsData.onCancel
                // to prevent propsData.onCancel from receiving a "cancel" event
                onCancel: (method) => {
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
      {
        return createDialog();
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

    exports.BDialog = Dialog;
    exports.DialogProgrammatic = DialogProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
