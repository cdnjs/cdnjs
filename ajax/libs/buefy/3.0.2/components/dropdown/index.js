/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Dropdown = {}, global.Vue));
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
      defaultDropdownMobileModal: true,
      defaultTrapFocus: true};

    function removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function createAbsoluteElement(el) {
      const root = document.createElement("div");
      root.style.position = "absolute";
      root.style.left = "0px";
      root.style.top = "0px";
      root.style.width = "100%";
      const wrapper = document.createElement("div");
      root.appendChild(wrapper);
      wrapper.appendChild(el);
      document.body.appendChild(root);
      return root;
    }
    function toCssWidth(width) {
      return width === void 0 ? null : isNaN(+width) ? `${width}` : width + "px";
    }
    function isCustomElement(vm) {
      return vm.$root != null && "shadowRoot" in vm.$root.$options;
    }

    const DEFAULT_CLOSE_OPTIONS = ["escape", "outside"];
    const DROPDOWN_INJECTION_KEY = Symbol("bdropdown");
    var _sfc_main$1 = vue.defineComponent({
      name: "BDropdown",
      directives: {
        trapFocus: directive
      },
      provide() {
        return {
          [DROPDOWN_INJECTION_KEY]: this
        };
      },
      props: {
        modelValue: {
          type: [
            String,
            Number,
            Boolean,
            Object,
            Array,
            Function
          ],
          default: null
        },
        disabled: Boolean,
        inline: Boolean,
        scrollable: Boolean,
        maxHeight: {
          type: [String, Number],
          default: 200
        },
        position: {
          type: String,
          validator(value) {
            return [
              "is-top-right",
              "is-top-left",
              "is-bottom-left",
              "is-bottom-right"
            ].indexOf(value) > -1;
          }
        },
        triggers: {
          type: Array,
          default: () => ["click"]
        },
        mobileModal: {
          type: Boolean,
          default: () => {
            return config.defaultDropdownMobileModal;
          }
        },
        ariaRole: {
          type: String,
          validator(value) {
            return [
              "menu",
              "list",
              "dialog"
            ].indexOf(value) > -1;
          },
          default: null
        },
        animation: {
          type: String,
          default: "fade"
        },
        multiple: Boolean,
        trapFocus: {
          type: Boolean,
          default: () => {
            return config.defaultTrapFocus;
          }
        },
        closeOnClick: {
          type: Boolean,
          default: true
        },
        canClose: {
          type: [Array, Boolean],
          default: true
        },
        expanded: Boolean,
        appendToBody: Boolean,
        appendToBodyCopyParent: Boolean,
        triggerTabindex: {
          type: Number,
          default: 0
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "active-change": (_isActive) => true,
        change: (_selected) => true,
        "update:modelValue": (_value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          selected: this.modelValue,
          style: {},
          isActive: false,
          isHoverable: false,
          maybeTap: false,
          isTouchEnabled: false,
          _bodyEl: void 0,
          // Used to append to body
          timeOutID: void 0,
          timeOutID2: void 0
        };
      },
      computed: {
        rootClasses() {
          return [this.position, {
            "is-disabled": this.disabled,
            "is-hoverable": this.hoverable,
            "is-inline": this.inline,
            "is-active": this.isActive || this.inline,
            "is-mobile-modal": this.isMobileModal,
            "is-expanded": this.expanded,
            "is-touch-enabled": this.isTouchEnabled
          }];
        },
        isMobileModal() {
          return this.mobileModal && !this.inline;
        },
        cancelOptions() {
          return typeof this.canClose === "boolean" ? this.canClose ? DEFAULT_CLOSE_OPTIONS : [] : this.canClose;
        },
        contentStyle() {
          var _a;
          return {
            maxHeight: this.scrollable ? (_a = toCssWidth(this.maxHeight)) != null ? _a : void 0 : void 0,
            overflow: this.scrollable ? "auto" : void 0
          };
        },
        hoverable() {
          return this.triggers.indexOf("hover") >= 0;
        }
      },
      watch: {
        /*
        * When v-model is changed set the new selected item.
        */
        modelValue(value) {
          this.selected = value;
        },
        /*
        * Emit event when isActive value is changed.
        *
        * Also resets `isTouchEnabled` when it turns inactive.
        */
        isActive(value) {
          this.$emit("active-change", value);
          if (!value) {
            this.timeOutID = setTimeout(() => {
              if (!this.isActive) {
                this.isTouchEnabled = false;
              }
            }, 250);
          }
          this.handleScroll();
          if (this.appendToBody) {
            this.$nextTick(() => {
              this.updateAppendToBody();
            });
          }
        },
        isHoverable(value) {
          if (this.hoverable) {
            this.$emit("active-change", value);
          }
        }
      },
      methods: {
        handleScroll() {
          if (typeof window === "undefined") return;
          if (this.isMobileModal) {
            if (this.isActive) {
              document.documentElement.classList.add("is-clipped-touch");
            } else {
              document.documentElement.classList.remove("is-clipped-touch");
            }
          }
        },
        /*
         * Click listener from DropdownItem.
         *   1. Set new selected item.
         *   2. Emit input event to update the user v-model.
         *   3. Close the dropdown.
         */
        selectItem(value) {
          if (this.multiple) {
            if (this.selected) {
              const selected = this.selected;
              if (selected.indexOf(value) === -1) {
                this.selected = [...selected, value];
              } else {
                this.selected = selected.filter((val) => val !== value);
              }
            } else {
              this.selected = [value];
            }
            this.$emit("change", this.selected);
          } else {
            if (this.selected !== value) {
              this.selected = value;
              this.$emit("change", this.selected);
            }
          }
          this.$emit("update:modelValue", this.selected);
          if (!this.multiple) {
            this.isActive = !this.closeOnClick;
            if (this.hoverable && this.closeOnClick) {
              this.isHoverable = false;
            }
          }
        },
        /*
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
          if (el === this.$refs.dropdownMenu) return true;
          if (el === this.$refs.trigger) return true;
          if (this.$refs.dropdownMenu != null) {
            const children = this.$refs.dropdownMenu.querySelectorAll("*");
            for (const child of children) {
              if (el === child) {
                return true;
              }
            }
          }
          if (this.$refs.trigger != null) {
            const children = this.$refs.trigger.querySelectorAll("*");
            for (const child of children) {
              if (el === child) {
                return true;
              }
            }
          }
          return false;
        },
        /*
        * Close dropdown if clicked outside.
        */
        clickedOutside(event) {
          if (this.cancelOptions.indexOf("outside") < 0) return;
          if (this.inline) return;
          const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
          if (!this.isInWhiteList(target)) this.isActive = false;
        },
        /*
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
          if (this.isActive && (key === "Escape" || key === "Esc")) {
            if (this.cancelOptions.indexOf("escape") < 0) return;
            this.isActive = false;
          }
        },
        onClick() {
          if (this.triggers.indexOf("hover") !== -1) return;
          if (this.triggers.indexOf("click") < 0) return;
          this.toggle();
        },
        onContextMenu() {
          if (this.triggers.indexOf("contextmenu") < 0) return;
          this.toggle();
        },
        onHover() {
          if (this.triggers.indexOf("hover") < 0) return;
          if (this.isTouchEnabled) return;
          this.isHoverable = true;
        },
        // takes care of touch-enabled devices
        // - does nothing if hover trigger is disabled
        // - suppresses hover trigger by setting isTouchEnabled
        // - handles only a tap; i.e., touchstart on the trigger immediately
        //   folowed by touchend
        onTouchStart() {
          this.maybeTap = true;
        },
        onTouchMove() {
          this.maybeTap = false;
        },
        onTouchEnd(e) {
          if (this.triggers.indexOf("hover") === -1) return;
          if (!this.maybeTap) return;
          e.preventDefault();
          this.maybeTap = false;
          this.isTouchEnabled = true;
          this.toggle();
        },
        onFocus() {
          if (this.triggers.indexOf("focus") < 0) return;
          this.toggle();
        },
        /*
        * Toggle dropdown if it's not disabled.
        */
        toggle() {
          if (this.disabled) return;
          if (!this.isActive) {
            this.timeOutID2 = setTimeout(() => {
              const value = !this.isActive;
              this.isActive = value;
            });
          } else {
            this.isActive = !this.isActive;
          }
        },
        updateAppendToBody() {
          const dropdown = this.$refs.dropdown;
          const dropdownMenu = this.$refs.dropdownMenu;
          const trigger = this.$refs.trigger;
          if (dropdownMenu && trigger) {
            const dropdownWrapper = this.$data._bodyEl.children[0];
            dropdownWrapper.classList.forEach((item) => dropdownWrapper.classList.remove(item));
            dropdownWrapper.classList.add("dropdown");
            dropdownWrapper.classList.add("dropdown-menu-animation");
            this.rootClasses.forEach((item) => {
              if (item && typeof item === "object") {
                for (const key in item) {
                  if (item[key]) {
                    dropdownWrapper.classList.add(key);
                  }
                }
              }
            });
            if (this.appendToBodyCopyParent) {
              const parentNode = this.$refs.dropdown.parentNode;
              const parent = this.$data._bodyEl;
              parent.classList.forEach((item) => parent.classList.remove(item));
              parentNode.classList.forEach((item) => {
                parent.classList.add(item);
              });
            }
            const rect = trigger.getBoundingClientRect();
            let top = rect.top + window.scrollY;
            let left = rect.left + window.scrollX;
            if (!this.position || this.position.indexOf("bottom") >= 0) {
              top += trigger.clientHeight;
            } else {
              top -= dropdownMenu.clientHeight;
            }
            if (this.position && this.position.indexOf("left") >= 0) {
              left -= dropdownMenu.clientWidth - trigger.clientWidth;
            }
            this.style = {
              position: "absolute",
              top: `${top}px`,
              left: `${left}px`,
              zIndex: "99",
              width: this.expanded ? `${dropdown.offsetWidth}px` : void 0
            };
          }
        }
      },
      mounted() {
        if (this.appendToBody) {
          this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
          this.updateAppendToBody();
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("click", this.clickedOutside);
          document.addEventListener("keyup", this.keyPress);
        }
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("click", this.clickedOutside);
          document.removeEventListener("keyup", this.keyPress);
        }
        if (this.appendToBody) {
          removeElement(this.$data._bodyEl);
        }
        clearTimeout(this.timeOutID);
        clearTimeout(this.timeOutID2);
      }
    });

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const _hoisted_1$1 = ["tabindex"];
    const _hoisted_2$1 = ["aria-hidden"];
    const _hoisted_3$1 = ["aria-hidden"];
    const _hoisted_4 = ["role", "aria-modal"];
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_trap_focus = vue.resolveDirective("trap-focus");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["dropdown dropdown-menu-animation", _ctx.rootClasses]),
          ref: "dropdown",
          onMouseleave: _cache[7] || (_cache[7] = ($event) => _ctx.isHoverable = false)
        },
        [
          !_ctx.inline ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            tabindex: _ctx.disabled ? void 0 : _ctx.triggerTabindex,
            ref: "trigger",
            class: "dropdown-trigger",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
            onContextmenu: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args), ["prevent"])),
            onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
            onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
            onTouchstart: _cache[4] || (_cache[4] = (...args) => _ctx.onTouchStart && _ctx.onTouchStart(...args)),
            onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.onTouchMove && _ctx.onTouchMove(...args)),
            onTouchend: _cache[6] || (_cache[6] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
            "aria-haspopup": "true"
          }, [
            vue.renderSlot(_ctx.$slots, "trigger", { active: _ctx.isActive })
          ], 40, _hoisted_1$1)) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.Transition, { name: _ctx.animation }, {
            default: vue.withCtx(() => [
              _ctx.isMobileModal ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "background",
                "aria-hidden": !_ctx.isActive
              }, null, 8, _hoisted_2$1)), [
                [vue.vShow, _ctx.isActive]
              ]) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["name"]),
          vue.createVNode(vue.Transition, {
            name: _ctx.animation,
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                ref: "dropdownMenu",
                class: "dropdown-menu",
                style: vue.normalizeStyle(_ctx.style),
                "aria-hidden": !_ctx.isActive
              }, [
                vue.createElementVNode("div", {
                  class: "dropdown-content",
                  role: _ctx.ariaRole,
                  "aria-modal": !_ctx.inline,
                  style: vue.normalizeStyle(_ctx.contentStyle)
                }, [
                  vue.renderSlot(_ctx.$slots, "default")
                ], 12, _hoisted_4)
              ], 12, _hoisted_3$1)), [
                [vue.vShow, !_ctx.disabled && (_ctx.isActive || _ctx.isHoverable) || _ctx.inline],
                [_directive_trap_focus, _ctx.trapFocus]
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name"])
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    }
    var Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    var _sfc_main = vue.defineComponent({
      name: "BDropdownItem",
      inject: {
        parent: {
          from: DROPDOWN_INJECTION_KEY,
          default: void 0
        }
      },
      props: {
        value: {
          type: [String, Number, Boolean, Object, Array, Function],
          default: null
        },
        separator: Boolean,
        disabled: Boolean,
        custom: Boolean,
        focusable: {
          type: Boolean,
          default: true
        },
        paddingless: Boolean,
        hasLink: Boolean,
        ariaRole: {
          type: String,
          default: ""
        }
      },
      emits: {
        click: () => true
      },
      computed: {
        anchorClasses() {
          return {
            "is-disabled": this.parent.disabled || this.disabled,
            "is-paddingless": this.paddingless,
            "is-active": this.isActive
          };
        },
        itemClasses() {
          return {
            "dropdown-item": !this.hasLink,
            "is-disabled": this.disabled,
            "is-paddingless": this.paddingless,
            "is-active": this.isActive,
            "has-link": this.hasLink
          };
        },
        ariaRoleItem() {
          return this.ariaRole === "menuitem" || this.ariaRole === "listitem" ? this.ariaRole : void 0;
        },
        isClickable() {
          return !this.parent.disabled && !this.separator && !this.disabled && !this.custom;
        },
        isActive() {
          if (this.parent.selected === null) return false;
          if (this.parent.multiple) {
            return this.parent.selected.indexOf(this.value) >= 0;
          }
          return this.value === this.parent.selected;
        },
        isFocusable() {
          return this.hasLink ? false : this.focusable;
        }
      },
      methods: {
        /*
        * Click listener, select the item.
        */
        selectItem() {
          if (!this.isClickable) return;
          this.parent.selectItem(this.value);
          this.$emit("click");
        }
      }
    });

    const _hoisted_1 = {
      key: 0,
      class: "dropdown-divider"
    };
    const _hoisted_2 = ["role", "tabindex"];
    const _hoisted_3 = ["role", "tabindex"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return _ctx.separator ? (vue.openBlock(), vue.createElementBlock("hr", _hoisted_1)) : !_ctx.custom && !_ctx.hasLink ? (vue.openBlock(), vue.createElementBlock("a", {
        key: 1,
        class: vue.normalizeClass(["dropdown-item", _ctx.anchorClasses]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
        role: _ctx.ariaRoleItem,
        tabindex: _ctx.isFocusable ? 0 : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_2)) : (vue.openBlock(), vue.createElementBlock("div", {
        key: 2,
        class: vue.normalizeClass(_ctx.itemClasses),
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
        role: _ctx.ariaRoleItem,
        tabindex: _ctx.isFocusable ? 0 : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3));
    }
    var DropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Dropdown);
        registerComponent(Vue, DropdownItem);
      }
    };

    exports.BDropdown = Dropdown;
    exports.BDropdownItem = DropdownItem;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
