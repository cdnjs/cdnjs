/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Clockpicker = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultLocale: void 0,
      defaultInputAutocomplete: "on",
      defaultTimepickerMobileNative: true,
      defaultTimepickerMobileModal: true,
      defaultInputHasCounter: true,
      defaultCompatFallthrough: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultTrapFocus: true,
      defaultStatusIcon: true};

    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __objRest = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    var CompatFallthroughMixin = vue.defineComponent({
      inheritAttrs: false,
      props: {
        compatFallthrough: {
          type: Boolean,
          default: () => config.defaultCompatFallthrough
        }
      },
      computed: {
        rootAttrs() {
          return this.compatFallthrough ? {
            class: this.$attrs.class,
            style: this.$attrs.style,
            id: this.$attrs.id
          } : {};
        },
        fallthroughAttrs() {
          if (this.compatFallthrough) {
            const _a = this.$attrs, { style: _1, class: _2, id: _3 } = _a, rest = __objRest(_a, ["style", "class", "id"]);
            return rest;
          } else {
            return this.$attrs;
          }
        }
      }
    });

    const isMobile = {
      Android: function() {
        return typeof window !== "undefined" && window.navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return typeof window !== "undefined" && window.navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return typeof window !== "undefined" && (window.navigator.userAgent.match(/iPhone|iPad|iPod/i) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
      },
      Opera: function() {
        return typeof window !== "undefined" && window.navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return typeof window !== "undefined" && window.navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
      }
    };
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
    function matchWithGroups(pattern, str) {
      const matches = str.match(pattern);
      const groupNames = pattern.toString().match(/<(.+?)>/g);
      if (groupNames == null) {
        throw new RangeError("pattern must contain at least one group");
      }
      return groupNames.map((group) => {
        const groupMatches = group.match(/<(.+)>/);
        return groupMatches[1];
      }).reduce((acc, curr, index) => {
        if (matches && matches.length > index) {
          acc[curr] = matches[index + 1];
        } else {
          acc[curr] = null;
        }
        return acc;
      }, {});
    }
    function isCustomElement(vm) {
      return vm.$root != null && "shadowRoot" in vm.$root.$options;
    }

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const FormElementMixin = vue.defineComponent({
      props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        icon: String,
        iconPack: String,
        maxlength: [Number, String],
        useHtml5Validation: {
          type: Boolean,
          default: () => config.defaultUseHtml5Validation
        },
        validationMessage: String,
        locale: {
          type: [String, Array],
          default: () => {
            return config.defaultLocale;
          }
        },
        statusIcon: {
          type: Boolean,
          default: () => {
            return config.defaultStatusIcon;
          }
        }
      },
      emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        blur: (event) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        focus: (event) => true
      },
      data() {
        return {
          isValid: true,
          isFocused: false,
          newIconPack: this.iconPack || config.defaultIconPack,
          // host component must override this
          _elementRef: ""
        };
      },
      computed: {
        /*
         * Find parent Field, max 3 levels deep.
         */
        parentField() {
          let parent = this.$parent;
          for (let i = 0; i < 3; i++) {
            if (parent && !parent.$data._isField) {
              parent = parent.$parent;
            }
          }
          return parent;
        },
        /*
         * Get the type prop from parent if it's a Field.
         */
        statusType() {
          const { newType } = this.parentField || {};
          if (!newType) return;
          if (typeof newType === "string") {
            return newType;
          } else {
            for (const key in newType) {
              if (newType[key]) {
                return key;
              }
            }
          }
          return void 0;
        },
        /*
         * Get the message prop from parent if it's a Field.
         */
        statusMessage() {
          if (!this.parentField) return;
          return this.parentField.newMessage || this.parentField.$slots.message;
        },
        /*
         * Fix icon size for inputs, large was too big
         */
        iconSize() {
          switch (this.size) {
            case "is-small":
              return this.size;
            case "is-medium":
              return;
            case "is-large":
              return this.newIconPack === "mdi" ? "is-medium" : "";
          }
          return void 0;
        }
      },
      methods: {
        /*
         * Focus method that work dynamically depending on the component.
         */
        focus() {
          const el = this.getElement();
          if (el === void 0) return;
          this.$nextTick(() => {
            if (el) el.focus();
          });
        },
        onBlur($event) {
          this.isFocused = false;
          this.$emit("blur", $event);
          this.checkHtml5Validity();
        },
        onFocus($event) {
          this.isFocused = true;
          this.$emit("focus", $event);
        },
        getElement() {
          let el = this.$refs[this.$data._elementRef];
          while (el != null && typeof el === "object" && "$refs" in el) {
            const form = el;
            el = form.$refs[form.$data._elementRef];
          }
          return el;
        },
        setInvalid() {
          const type = "is-danger";
          const message = this.validationMessage || this.getElement().validationMessage;
          this.setValidity(type, message);
        },
        setValidity(type, message) {
          this.$nextTick(() => {
            if (this.parentField) {
              if (!this.parentField.type) {
                this.parentField.newType = type;
              }
              if (!this.parentField.message) {
                this.parentField.newMessage = message;
              }
            }
          });
        },
        /*
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity() {
          if (!this.useHtml5Validation) {
            return false;
          }
          const el = this.getElement();
          if (el == null) {
            return false;
          }
          if (!el.checkValidity()) {
            this.setInvalid();
            this.isValid = false;
          } else {
            this.setValidity(null, null);
            this.isValid = true;
          }
          return this.isValid;
        }
      }
    });

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

    const DEFAULT_CLOSE_OPTIONS = ["escape", "outside"];
    const DROPDOWN_INJECTION_KEY = Symbol("bdropdown");
    var _sfc_main$4 = vue.defineComponent({
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

    const _hoisted_1$3 = ["tabindex"];
    const _hoisted_2$2 = ["aria-hidden"];
    const _hoisted_3$2 = ["aria-hidden"];
    const _hoisted_4$2 = ["role", "aria-modal"];
    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
          ], 40, _hoisted_1$3)) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.Transition, { name: _ctx.animation }, {
            default: vue.withCtx(() => [
              _ctx.isMobileModal ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "background",
                "aria-hidden": !_ctx.isActive
              }, null, 8, _hoisted_2$2)), [
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
                ], 12, _hoisted_4$2)
              ], 12, _hoisted_3$2)), [
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
    var BDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

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

    var _sfc_main$3 = vue.defineComponent({
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

    var _sfc_main$2 = vue.defineComponent({
      name: "BInput",
      components: { BIcon },
      mixins: [CompatFallthroughMixin, FormElementMixin],
      props: {
        modelValue: {
          type: [Number, String]
        },
        type: {
          type: String,
          default: "text"
        },
        lazy: {
          type: Boolean,
          default: false
        },
        passwordReveal: Boolean,
        iconClickable: Boolean,
        hasCounter: {
          type: Boolean,
          default: () => config.defaultInputHasCounter
        },
        customClass: {
          type: String,
          default: ""
        },
        iconRight: String,
        iconRightClickable: Boolean,
        iconRightType: String,
        // Native options to use in HTML5 validation
        autocomplete: String
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "icon-click": (event) => true,
        "icon-right-click": (event) => true,
        "update:modelValue": (value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          newValue: this.modelValue,
          newType: this.type,
          newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
          isPasswordVisible: false,
          _elementRef: this.type === "textarea" ? "textarea" : "input"
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.newValue;
          },
          set(value) {
            this.newValue = value;
            this.$emit("update:modelValue", value);
          }
        },
        rootClasses() {
          return [
            this.iconPosition,
            this.size,
            {
              "is-expanded": this.expanded,
              "is-loading": this.loading,
              "is-clearfix": !this.hasMessage
            }
          ];
        },
        inputClasses() {
          return [
            this.statusType,
            this.size,
            { "is-rounded": this.rounded }
          ];
        },
        hasIconRight() {
          return this.passwordReveal || this.loading || this.statusIcon && this.statusTypeIcon || this.iconRight;
        },
        rightIcon() {
          if (this.passwordReveal) {
            return this.passwordVisibleIcon;
          } else if (this.iconRight) {
            return this.iconRight;
          }
          return this.statusTypeIcon;
        },
        rightIconType() {
          if (this.passwordReveal) {
            return "is-primary";
          } else if (this.iconRight) {
            return this.iconRightType || void 0;
          }
          return this.statusType;
        },
        /*
        * Position of the icon or if it's both sides.
        */
        iconPosition() {
          let iconClasses = "";
          if (this.icon) {
            iconClasses += "has-icons-left ";
          }
          if (this.hasIconRight) {
            iconClasses += "has-icons-right";
          }
          return iconClasses;
        },
        /*
        * Icon name (MDI) based on the type.
        */
        statusTypeIcon() {
          switch (this.statusType) {
            case "is-success":
              return "check";
            case "is-danger":
              return "alert-circle";
            case "is-info":
              return "information";
            case "is-warning":
              return "alert";
            default:
              return void 0;
          }
        },
        /*
        * Check if have any message prop from parent if it's a Field.
        */
        hasMessage() {
          return !!this.statusMessage;
        },
        /*
        * Current password-reveal icon name.
        */
        passwordVisibleIcon() {
          return !this.isPasswordVisible ? "eye" : "eye-off";
        },
        /*
        * Get value length
        */
        valueLength() {
          if (typeof this.computedValue === "string") {
            return Array.from(this.computedValue).length;
          } else if (typeof this.computedValue === "number") {
            return this.computedValue.toString().length;
          }
          return 0;
        }
      },
      watch: {
        /*
        * When v-model is changed:
        *   1. Set internal value.
        *   2. Validate it if the value came from outside;
        *      i.e., not equal to computedValue
        */
        modelValue(value) {
          const fromOutside = this.computedValue != value;
          this.newValue = value;
          if (fromOutside) {
            this.$nextTick(() => {
              !this.isValid && this.checkHtml5Validity();
            });
          }
        },
        type(type) {
          this.newType = type;
        }
      },
      methods: {
        /*
        * Toggle the visibility of a password-reveal input
        * by changing the type and focus the input right away.
        */
        togglePasswordVisibility() {
          this.isPasswordVisible = !this.isPasswordVisible;
          this.newType = this.isPasswordVisible ? "text" : "password";
          this.$nextTick(() => {
            this.focus();
          });
        },
        iconClick(emit, event) {
          this.$emit(emit, event);
          this.$nextTick(() => {
            this.focus();
          });
        },
        rightIconClick(event) {
          if (this.passwordReveal) {
            this.togglePasswordVisibility();
          } else if (this.iconRightClickable) {
            this.iconClick("icon-right-click", event);
          }
        },
        onInput() {
          if (!this.lazy) {
            this.revalidate();
          }
        },
        onChange() {
          if (this.lazy) {
            this.revalidate();
          }
        },
        revalidate() {
          !this.isValid && this.checkHtml5Validity();
        }
      }
    });

    const _hoisted_1$2 = ["type", "autocomplete", "maxlength"];
    const _hoisted_2$1 = ["maxlength"];
    const _hoisted_3$1 = ["type", "autocomplete", "maxlength"];
    const _hoisted_4$1 = ["maxlength"];
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["control", _ctx.rootClasses]
        }, _ctx.rootAttrs),
        [
          _ctx.lazy ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              _ctx.type !== "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
                key: 0,
                ref: "input",
                class: ["input", [_ctx.inputClasses, _ctx.customClass]],
                type: _ctx.newType,
                autocomplete: _ctx.newAutocomplete,
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[4] || (_cache[4] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_1$2)), [
                [
                  vue.vModelDynamic,
                  _ctx.computedValue,
                  void 0,
                  { lazy: true }
                ]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
                key: 1,
                ref: "textarea",
                class: ["textarea", [_ctx.inputClasses, _ctx.customClass]],
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[6] || (_cache[6] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[7] || (_cache[7] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[8] || (_cache[8] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[9] || (_cache[9] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_2$1)), [
                [
                  vue.vModelText,
                  _ctx.computedValue,
                  void 0,
                  { lazy: true }
                ]
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.type !== "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
                key: 0,
                ref: "input",
                class: ["input", [_ctx.inputClasses, _ctx.customClass]],
                type: _ctx.newType,
                autocomplete: _ctx.newAutocomplete,
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[11] || (_cache[11] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[12] || (_cache[12] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[13] || (_cache[13] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[14] || (_cache[14] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_3$1)), [
                [vue.vModelDynamic, _ctx.computedValue]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
                key: 1,
                ref: "textarea",
                class: ["textarea", [_ctx.inputClasses, _ctx.customClass]],
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[16] || (_cache[16] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[17] || (_cache[17] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[18] || (_cache[18] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[19] || (_cache[19] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_4$1)), [
                [vue.vModelText, _ctx.computedValue]
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 2,
            class: vue.normalizeClass(["is-left", { "is-clickable": _ctx.iconClickable }]),
            icon: _ctx.icon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize,
            onClick: _cache[20] || (_cache[20] = ($event) => _ctx.iconClick("icon-click", $event))
          }, null, 8, ["class", "icon", "pack", "size"])) : vue.createCommentVNode("v-if", true),
          !_ctx.loading && _ctx.hasIconRight && _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            class: vue.normalizeClass(["is-right", { "is-clickable": _ctx.passwordReveal || _ctx.iconRightClickable }]),
            icon: _ctx.rightIcon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize,
            type: _ctx.rightIconType,
            both: "",
            onClick: _ctx.rightIconClick
          }, null, 8, ["class", "icon", "pack", "size", "type", "onClick"])) : vue.createCommentVNode("v-if", true),
          _ctx.maxlength && _ctx.hasCounter && _ctx.type !== "number" ? (vue.openBlock(), vue.createElementBlock(
            "small",
            {
              key: 4,
              class: vue.normalizeClass(["help counter", { "is-invisible": !_ctx.isFocused }])
            },
            vue.toDisplayString(_ctx.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    }
    var BInput = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

    const AM = "AM";
    const PM = "PM";
    const HOUR_FORMAT_24 = "24";
    const HOUR_FORMAT_12 = "12";
    const defaultTimeFormatter = (date, vm) => {
      return vm.dtf.format(date);
    };
    const defaultTimeParser = (timeString, vm) => {
      if (timeString) {
        let d = null;
        if (vm.computedValue && !isNaN(vm.computedValue.valueOf())) {
          d = new Date(vm.computedValue);
        } else {
          d = vm.timeCreator();
          d.setMilliseconds(0);
        }
        if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
          const formatRegex = vm.dtf.formatToParts(d).map((part) => {
            if (part.type === "literal") {
              return part.value.replace(/ /g, "\\s?");
            } else if (part.type === "dayPeriod") {
              return `((?!=<${part.type}>)(${vm.amString}|${vm.pmString}|${AM}|${PM}|${AM.toLowerCase()}|${PM.toLowerCase()})?)`;
            }
            return `((?!=<${part.type}>)\\d+)`;
          }).join("");
          const timeGroups = matchWithGroups(formatRegex, timeString);
          timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour + "", 10) : null;
          timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute + "", 10) : null;
          timeGroups.second = timeGroups.second ? parseInt(timeGroups.second + "", 10) : null;
          if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
            const dayPeriod = timeGroups.dayPeriod;
            if (dayPeriod && (dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || dayPeriod.toLowerCase() === PM.toLowerCase()) && timeGroups.hour < 12) {
              timeGroups.hour += 12;
            }
            d.setHours(timeGroups.hour);
            d.setMinutes(timeGroups.minute);
            d.setSeconds(timeGroups.second || 0);
            return d;
          }
        }
        let am = false;
        if (vm.hourFormat === HOUR_FORMAT_12) {
          const dateString12 = timeString.split(" ");
          timeString = dateString12[0];
          am = dateString12[1] === vm.amString || dateString12[1] === AM;
        }
        const time = timeString.split(":");
        let hours = parseInt(time[0], 10);
        const minutes = parseInt(time[1], 10);
        const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;
        if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
          return null;
        }
        d.setSeconds(seconds);
        d.setMinutes(minutes);
        if (vm.hourFormat === HOUR_FORMAT_12) {
          if (am && hours === 12) {
            hours = 0;
          } else if (!am && hours !== 12) {
            hours += 12;
          }
        }
        d.setHours(hours);
        return new Date(d.getTime());
      }
      return null;
    };
    var TimepickerMixin = vue.defineComponent({
      mixins: [CompatFallthroughMixin, FormElementMixin],
      props: {
        modelValue: [Date, null],
        inline: Boolean,
        minTime: [Date, null],
        maxTime: [Date, null],
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        hourFormat: {
          type: String,
          validator: (value) => {
            return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
          }
        },
        incrementHours: {
          type: Number,
          default: 1
        },
        incrementMinutes: {
          type: Number,
          default: 1
        },
        incrementSeconds: {
          type: Number,
          default: 1
        },
        timeFormatter: {
          type: Function,
          default: (date, vm) => {
            {
              return defaultTimeFormatter(date, vm);
            }
          }
        },
        timeParser: {
          type: Function,
          default: (date, vm) => {
            {
              return defaultTimeParser(date, vm);
            }
          }
        },
        mobileNative: {
          type: Boolean,
          default: () => config.defaultTimepickerMobileNative
        },
        mobileModal: {
          type: Boolean,
          default: () => config.defaultTimepickerMobileModal
        },
        timeCreator: {
          type: Function,
          default: () => {
            {
              return /* @__PURE__ */ new Date();
            }
          }
        },
        position: String,
        unselectableTimes: Array,
        openOnFocus: Boolean,
        enableSeconds: Boolean,
        defaultMinutes: Number,
        defaultSeconds: Number,
        focusable: {
          type: Boolean,
          default: true
        },
        tzOffset: {
          type: Number,
          default: 0
        },
        appendToBody: Boolean,
        resetOnMeridianChange: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "update:modelValue": (_value) => true
      },
      data() {
        return {
          dateSelected: this.modelValue,
          hoursSelected: null,
          minutesSelected: null,
          secondsSelected: null,
          meridienSelected: null,
          _elementRef: "input",
          AM,
          PM,
          HOUR_FORMAT_24,
          HOUR_FORMAT_12
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.dateSelected;
          },
          set(value) {
            this.dateSelected = value;
            this.$emit("update:modelValue", this.dateSelected);
          }
        },
        localeOptions() {
          return new Intl.DateTimeFormat(this.locale, {
            hour: "numeric",
            minute: "numeric",
            second: this.enableSeconds ? "numeric" : void 0
          }).resolvedOptions();
        },
        dtf() {
          return new Intl.DateTimeFormat(this.locale, {
            hour: this.localeOptions.hour || "numeric",
            minute: this.localeOptions.minute || "numeric",
            second: this.enableSeconds ? this.localeOptions.second || "numeric" : void 0,
            // Fixes 12 hour display github.com/buefy/buefy/issues/3418
            hourCycle: !this.isHourFormat24 ? "h12" : "h23"
          });
        },
        newHourFormat() {
          return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
        },
        sampleTime() {
          const d = this.timeCreator();
          d.setHours(10);
          d.setSeconds(0);
          d.setMinutes(0);
          d.setMilliseconds(0);
          return d;
        },
        hourLiteral() {
          if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
            const d = this.sampleTime;
            const parts = this.dtf.formatToParts(d);
            const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "hour");
            if (literal) {
              return literal.value;
            }
          }
          return ":";
        },
        minuteLiteral() {
          if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
            const d = this.sampleTime;
            const parts = this.dtf.formatToParts(d);
            const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "minute");
            if (literal) {
              return literal.value;
            }
          }
          return ":";
        },
        secondLiteral() {
          if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
            const d = this.sampleTime;
            const parts = this.dtf.formatToParts(d);
            const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "second");
            if (literal) {
              return literal.value;
            }
          }
          return void 0;
        },
        amString() {
          if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
            const d = this.sampleTime;
            d.setHours(10);
            const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
            if (dayPeriod) {
              return dayPeriod.value;
            }
          }
          return AM;
        },
        pmString() {
          if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
            const d = this.sampleTime;
            d.setHours(20);
            const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
            if (dayPeriod) {
              return dayPeriod.value;
            }
          }
          return PM;
        },
        hours() {
          if (!this.incrementHours || this.incrementHours < 1) throw new Error("Hour increment cannot be null or less than 1.");
          const hours = [];
          const numberOfHours = this.isHourFormat24 ? 24 : 12;
          for (let i = 0; i < numberOfHours; i += this.incrementHours) {
            let value = i;
            let label = value;
            if (!this.isHourFormat24) {
              value = i + 1;
              label = value;
              if (this.meridienSelected === this.amString) {
                if (value === 12) {
                  value = 0;
                }
              } else if (this.meridienSelected === this.pmString) {
                if (value !== 12) {
                  value += 12;
                }
              }
            }
            hours.push({
              label: this.formatNumber(label),
              value
            });
          }
          return hours;
        },
        minutes() {
          if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error("Minute increment cannot be null or less than 1.");
          const minutes = [];
          for (let i = 0; i < 60; i += this.incrementMinutes) {
            minutes.push({
              label: this.formatNumber(i, true),
              value: i
            });
          }
          return minutes;
        },
        seconds() {
          if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error("Second increment cannot be null or less than 1.");
          const seconds = [];
          for (let i = 0; i < 60; i += this.incrementSeconds) {
            seconds.push({
              label: this.formatNumber(i, true),
              value: i
            });
          }
          return seconds;
        },
        meridiens() {
          return [this.amString, this.pmString];
        },
        isMobile() {
          return this.mobileNative && isMobile.any();
        },
        isHourFormat24() {
          return this.newHourFormat === HOUR_FORMAT_24;
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
        }
      },
      watch: {
        hourFormat() {
          if (this.hoursSelected !== null) {
            this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
          }
        },
        locale() {
          if (!this.modelValue) {
            this.meridienSelected = this.amString;
          }
        },
        /*
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue: {
          handler(value) {
            this.updateInternalState(value);
            !this.isValid && this.$refs.input.checkHtml5Validity();
          },
          immediate: true
        }
      },
      methods: {
        onMeridienChange(value) {
          if (this.hoursSelected !== null && this.resetOnMeridianChange) {
            this.hoursSelected = null;
            this.minutesSelected = null;
            this.secondsSelected = null;
            this.computedValue = null;
          } else if (this.hoursSelected !== null) {
            if (value === this.pmString) {
              this.hoursSelected += 12;
            } else if (value === this.amString) {
              this.hoursSelected -= 12;
            }
          }
          this.updateDateSelected(
            this.hoursSelected,
            this.minutesSelected,
            this.enableSeconds ? this.secondsSelected : 0,
            value
          );
        },
        onHoursChange(value) {
          if (!this.minutesSelected && typeof this.defaultMinutes !== "undefined") {
            this.minutesSelected = this.defaultMinutes;
          }
          if (!this.secondsSelected && typeof this.defaultSeconds !== "undefined") {
            this.secondsSelected = this.defaultSeconds;
          }
          this.updateDateSelected(
            parseInt(`${value}`, 10),
            this.minutesSelected,
            this.enableSeconds ? this.secondsSelected : 0,
            this.meridienSelected
          );
        },
        onMinutesChange(value) {
          if (!this.secondsSelected && this.defaultSeconds) {
            this.secondsSelected = this.defaultSeconds;
          }
          this.updateDateSelected(
            this.hoursSelected,
            parseInt(`${value}`, 10),
            this.enableSeconds ? this.secondsSelected : 0,
            this.meridienSelected
          );
        },
        onSecondsChange(value) {
          this.updateDateSelected(
            this.hoursSelected,
            this.minutesSelected,
            parseInt(`${value}`, 10),
            this.meridienSelected
          );
        },
        updateDateSelected(hours, minutes, seconds, meridiens) {
          if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
            let time = null;
            if (this.computedValue && !isNaN(this.computedValue.valueOf())) {
              time = new Date(this.computedValue);
            } else {
              time = this.timeCreator();
              time.setMilliseconds(0);
            }
            time.setHours(hours);
            time.setMinutes(minutes);
            time.setSeconds(seconds);
            if (!isNaN(time.getTime())) this.computedValue = new Date(time.getTime());
          }
        },
        updateInternalState(value) {
          if (value) {
            this.hoursSelected = value.getHours();
            this.minutesSelected = value.getMinutes();
            this.secondsSelected = value.getSeconds();
            this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
          } else {
            this.hoursSelected = null;
            this.minutesSelected = null;
            this.secondsSelected = null;
            this.meridienSelected = this.amString;
          }
          this.dateSelected = value;
        },
        isHourDisabled(hour) {
          let disabled = false;
          if (this.minTime) {
            const minHours = this.minTime.getHours();
            const noMinutesAvailable = this.minutes.every((minute) => {
              return this.isMinuteDisabledForHour(hour, minute.value);
            });
            disabled = hour < minHours || noMinutesAvailable;
          }
          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours();
              disabled = hour > maxHours;
            }
          }
          if (this.unselectableTimes) {
            if (!disabled) {
              const unselectable = this.unselectableTimes.filter((time) => {
                if (this.enableSeconds && this.secondsSelected !== null) {
                  return time.getHours() === hour && time.getMinutes() === this.minutesSelected && time.getSeconds() === this.secondsSelected;
                } else if (this.minutesSelected !== null) {
                  return time.getHours() === hour && time.getMinutes() === this.minutesSelected;
                }
                return false;
              });
              if (unselectable.length > 0) {
                disabled = true;
              } else {
                disabled = this.minutes.every((minute) => {
                  return this.unselectableTimes.filter((time) => {
                    return time.getHours() === hour && time.getMinutes() === minute.value;
                  }).length > 0;
                });
              }
            }
          }
          return disabled;
        },
        isMinuteDisabledForHour(hour, minute) {
          let disabled = false;
          if (this.minTime) {
            const minHours = this.minTime.getHours();
            const minMinutes = this.minTime.getMinutes();
            disabled = hour === minHours && minute < minMinutes;
          }
          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours();
              const maxMinutes = this.maxTime.getMinutes();
              disabled = hour === maxHours && minute > maxMinutes;
            }
          }
          return disabled;
        },
        isMinuteDisabled(minute) {
          let disabled = false;
          if (this.hoursSelected !== null) {
            if (this.isHourDisabled(this.hoursSelected)) {
              disabled = true;
            } else {
              disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
            }
            if (this.unselectableTimes) {
              if (!disabled) {
                const unselectable = this.unselectableTimes.filter((time) => {
                  if (this.enableSeconds && this.secondsSelected !== null) {
                    return time.getHours() === this.hoursSelected && time.getMinutes() === minute && time.getSeconds() === this.secondsSelected;
                  } else {
                    return time.getHours() === this.hoursSelected && time.getMinutes() === minute;
                  }
                });
                disabled = unselectable.length > 0;
              }
            }
          }
          return disabled;
        },
        isSecondDisabled(second) {
          let disabled = false;
          if (this.minutesSelected !== null) {
            if (this.isMinuteDisabled(this.minutesSelected)) {
              disabled = true;
            } else {
              if (this.minTime) {
                const minHours = this.minTime.getHours();
                const minMinutes = this.minTime.getMinutes();
                const minSeconds = this.minTime.getSeconds();
                disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
              }
              if (this.maxTime) {
                if (!disabled) {
                  const maxHours = this.maxTime.getHours();
                  const maxMinutes = this.maxTime.getMinutes();
                  const maxSeconds = this.maxTime.getSeconds();
                  disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
                }
              }
            }
            if (this.unselectableTimes) {
              if (!disabled) {
                const unselectable = this.unselectableTimes.filter((time) => {
                  return time.getHours() === this.hoursSelected && time.getMinutes() === this.minutesSelected && time.getSeconds() === second;
                });
                disabled = unselectable.length > 0;
              }
            }
          }
          return disabled;
        },
        /*
         * Parse string into date
         */
        onChange(value) {
          const date = this.timeParser(value, this);
          this.updateInternalState(date);
          if (date && !isNaN(date.valueOf())) {
            this.computedValue = date;
          } else {
            this.computedValue = null;
            this.$refs.input.newValue = this.computedValue;
          }
        },
        /*
         * Toggle timepicker
         */
        toggle(active) {
          if (this.$refs.dropdown) {
            this.$refs.dropdown.isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
          }
        },
        /*
         * Close timepicker
         */
        close() {
          this.toggle(false);
        },
        /*
         * Call default onFocus method and show timepicker
         */
        handleOnFocus() {
          this.onFocus();
          if (this.openOnFocus) {
            this.toggle(true);
          }
        },
        /*
         * Format date into string 'HH-MM-SS'
         */
        formatHHMMSS(value) {
          const date = new Date(value);
          if (value && !isNaN(date.valueOf())) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return this.formatNumber(hours, true) + ":" + this.formatNumber(minutes, true) + ":" + this.formatNumber(seconds, true);
          }
          return "";
        },
        /*
         * Parse time from string
         */
        onChangeNativePicker(event) {
          const date = event.target.value;
          if (date) {
            let time = null;
            if (this.computedValue && !isNaN(this.computedValue.valueOf())) {
              time = new Date(this.computedValue);
            } else {
              time = /* @__PURE__ */ new Date();
              time.setMilliseconds(0);
            }
            const t = date.split(":");
            time.setHours(parseInt(t[0], 10));
            time.setMinutes(parseInt(t[1], 10));
            time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
            this.computedValue = new Date(time.getTime());
          } else {
            this.computedValue = null;
          }
        },
        formatNumber(value, prependZero) {
          return this.isHourFormat24 || prependZero ? this.pad(value) : `${value}`;
        },
        pad(value) {
          return (value < 10 ? "0" : "") + value;
        },
        /*
         * Format date into string
         */
        formatValue(date) {
          if (date && !isNaN(date.valueOf())) {
            return this.timeFormatter(date, this);
          } else {
            return null;
          }
        },
        /*
         * Keypress event that is bound to the document.
         */
        keyPress({ key }) {
          if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
            this.toggle(false);
          }
        },
        /*
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
          if (!value) {
            this.onBlur();
          }
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
        }
      },
      beforeUnmounted() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
        }
      }
    });

    const indicatorSize = 40;
    const paddingInner = 5;
    var _sfc_main$1 = vue.defineComponent({
      name: "BClockpickerFace",
      props: {
        pickerSize: Number,
        min: Number,
        max: Number,
        double: Boolean,
        value: Number,
        faceNumbers: Array,
        disabledValues: Function
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        change: (_value) => true,
        input: (_value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          isDragging: false,
          inputValue: this.value,
          prevAngle: 720
        };
      },
      computed: {
        /*
        * How many number indicators are shown on the face
        */
        count() {
          return this.max - this.min + 1;
        },
        /*
        * How many number indicators are shown per ring on the face
        */
        countPerRing() {
          return this.double ? this.count / 2 : this.count;
        },
        /*
        * Radius of the clock face
        */
        radius() {
          return this.pickerSize / 2;
        },
        /*
        * Radius of the outer ring of number indicators
        */
        outerRadius() {
          return this.radius - paddingInner - indicatorSize / 2;
        },
        /*
        * Radius of the inner ring of number indicators
        */
        innerRadius() {
          return Math.max(
            this.outerRadius * 0.6,
            this.outerRadius - paddingInner - indicatorSize
          );
        },
        /*
        * The angle for each selectable value
        * For hours this ends up being 30 degrees, for minutes 6 degrees
        */
        degreesPerUnit() {
          return 360 / this.countPerRing;
        },
        /*
        * Used for calculating x/y grid location based on degrees
        */
        degrees() {
          return this.degreesPerUnit * Math.PI / 180;
        },
        /*
        * Calculates the angle the clock hand should be rotated for the
        * selected value
        */
        handRotateAngle() {
          let currentAngle = this.prevAngle;
          while (currentAngle < 0) currentAngle += 360;
          const targetAngle = this.calcHandAngle(this.displayedValue);
          const degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
          const angle = this.prevAngle + degreesDiff;
          return angle;
        },
        /*
        * Determines how long the selector hand is based on if the
        * selected value is located along the outer or inner ring
        */
        handScale() {
          return this.calcHandScale(this.displayedValue);
        },
        handStyle() {
          return {
            transform: `rotate(${this.handRotateAngle}deg) scaleY(${this.handScale})`,
            transition: ".3s cubic-bezier(.25,.8,.50,1)"
          };
        },
        /*
        * The value the hand should be pointing at
        */
        displayedValue() {
          return this.inputValue == null ? this.min : this.inputValue;
        }
      },
      watch: {
        value(value) {
          if (value !== this.inputValue) {
            this.prevAngle = this.handRotateAngle;
          }
          this.inputValue = value;
        }
      },
      methods: {
        isDisabled(value) {
          return this.disabledValues && this.disabledValues(value);
        },
        /*
        * Calculates the distance between two points
        */
        euclidean(p0, p1) {
          const dx = p1.x - p0.x;
          const dy = p1.y - p0.y;
          return Math.sqrt(dx * dx + dy * dy);
        },
        shortestDistanceDegrees(start, stop) {
          const modDiff = (stop - start) % 360;
          const shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
          return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1;
        },
        /*
        * Calculates the angle of the line from the center point
        * to the given point.
        */
        coordToAngle(center, p1) {
          const value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
          return Math.abs(value * 180 / Math.PI);
        },
        /*
        * Generates the inline style translate() property for a
        * number indicator, which determines it's location on the
        * clock face
        */
        getNumberTranslate(value) {
          const { x, y } = this.getNumberCoords(value);
          return `translate(${x}px, ${y}px)`;
        },
        /*
        * Calculates the coordinates on the clock face for a number
        * indicator value
        */
        getNumberCoords(value) {
          const radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
          return {
            x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
            y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
          };
        },
        getFaceNumberClasses(num) {
          return {
            active: num.value === this.displayedValue,
            disabled: this.isDisabled(num.value)
          };
        },
        /*
        * Determines if a value resides on the inner ring
        */
        isInnerRing(value) {
          return this.double && value - this.min >= this.countPerRing;
        },
        calcHandAngle(value) {
          let angle = this.degreesPerUnit * (value - this.min);
          if (this.isInnerRing(value)) angle -= 360;
          return angle;
        },
        calcHandScale(value) {
          return this.isInnerRing(value) ? this.innerRadius / this.outerRadius : 1;
        },
        onMouseDown(e) {
          e.preventDefault();
          this.isDragging = true;
          this.onDragMove(e);
        },
        onMouseUp() {
          this.isDragging = false;
          if (!this.isDisabled(this.inputValue)) {
            this.$emit("change", this.inputValue);
          }
        },
        onDragMove(e) {
          e.preventDefault();
          if (!this.isDragging && e.type !== "click") return;
          const { width, top, left } = this.$refs.clock.getBoundingClientRect();
          const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
          const center = { x: width / 2, y: -width / 2 };
          const coords = { x: clientX - left, y: top - clientY };
          const handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
          const insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;
          let value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.countPerRing : 0);
          if (handAngle >= 360 - this.degreesPerUnit / 2) {
            value = insideClick ? this.max : this.min;
          }
          this.update(value);
        },
        update(value) {
          if (this.inputValue !== value && !this.isDisabled(value)) {
            this.prevAngle = this.handRotateAngle;
            this.inputValue = value;
            this.$emit("input", value);
          }
        }
      }
    });

    const _hoisted_1$1 = {
      class: "b-clockpicker-face-outer-ring",
      ref: "clock"
    };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: "b-clockpicker-face",
          onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
          onMouseup: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
          onMousemove: _cache[2] || (_cache[2] = (...args) => _ctx.onDragMove && _ctx.onDragMove(...args)),
          onTouchstart: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
          onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
          onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.onDragMove && _ctx.onDragMove(...args))
        },
        [
          vue.createElementVNode(
            "div",
            _hoisted_1$1,
            [
              vue.createElementVNode(
                "div",
                {
                  class: "b-clockpicker-face-hand",
                  style: vue.normalizeStyle(_ctx.handStyle)
                },
                null,
                4
                /* STYLE */
              ),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.faceNumbers, (num, index) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "span",
                    {
                      key: index,
                      class: vue.normalizeClass(["b-clockpicker-face-number", _ctx.getFaceNumberClasses(num)]),
                      style: vue.normalizeStyle({ transform: _ctx.getNumberTranslate(num.value) })
                    },
                    [
                      vue.createElementVNode(
                        "span",
                        null,
                        vue.toDisplayString(num.label),
                        1
                        /* TEXT */
                      )
                    ],
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          )
        ],
        32
        /* NEED_HYDRATION */
      );
    }
    var BClockpickerFace = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    const outerPadding = 12;
    var _sfc_main = vue.defineComponent({
      name: "BClockpicker",
      components: {
        BClockpickerFace,
        BInput,
        BDropdown
      },
      mixins: [TimepickerMixin],
      props: {
        pickerSize: {
          type: Number,
          default: 290
        },
        incrementMinutes: {
          type: Number,
          default: 5
        },
        type: {
          type: String,
          default: "is-primary"
        },
        hoursLabel: {
          type: String,
          default: () => "Hours"
        },
        minutesLabel: {
          type: String,
          default: () => "Min"
        }
      },
      data() {
        return {
          isSelectingHour: true,
          isDragging: false,
          _isClockpicker: true
        };
      },
      computed: {
        hoursDisplay() {
          if (this.hoursSelected == null) return "--";
          if (this.isHourFormat24) return this.pad(this.hoursSelected);
          let display = this.hoursSelected;
          if (this.meridienSelected === this.pmString) {
            display -= 12;
          }
          if (display === 0) display = 12;
          return display;
        },
        minutesDisplay() {
          return this.minutesSelected == null ? "--" : this.pad(this.minutesSelected);
        },
        minFaceValue() {
          return this.isSelectingHour && !this.isHourFormat24 && this.meridienSelected === this.pmString ? 12 : 0;
        },
        maxFaceValue() {
          return this.isSelectingHour ? !this.isHourFormat24 && this.meridienSelected === this.amString ? 11 : 23 : 59;
        },
        faceSize() {
          return this.pickerSize - outerPadding * 2;
        },
        faceDisabledValues() {
          return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled;
        }
      },
      methods: {
        onClockInput(value) {
          if (this.isSelectingHour) {
            this.hoursSelected = value;
            this.onHoursChange(value);
          } else {
            this.minutesSelected = value;
            this.onMinutesChange(value);
          }
        },
        onClockChange() {
          if (this.isSelectingHour) {
            this.isSelectingHour = !this.isSelectingHour;
          } else {
            this.toggle(false);
          }
        },
        /*
         * Toggle clockpicker
         */
        toggle(active) {
          if (this.$refs.dropdown) {
            const dropdown = this.$refs.dropdown;
            dropdown.isActive = active != null ? active : !dropdown.isActive;
            if (dropdown.isActive) {
              this.isSelectingHour = true;
            }
          }
        },
        onMeridienClick(value) {
          if (this.meridienSelected !== value) {
            this.meridienSelected = value;
            this.onMeridienChange(value);
          }
        },
        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
          if (this.$refs.dropdown.isActive) {
            event.stopPropagation();
          }
        }
      }
    });

    const _hoisted_1 = ["disabled"];
    const _hoisted_2 = {
      key: 0,
      class: "card-header"
    };
    const _hoisted_3 = { class: "b-clockpicker-header card-header-title" };
    const _hoisted_4 = { class: "b-clockpicker-time" };
    const _hoisted_5 = {
      key: 0,
      class: "b-clockpicker-period"
    };
    const _hoisted_6 = { class: "card-content" };
    const _hoisted_7 = {
      key: 0,
      class: "b-clockpicker-time"
    };
    const _hoisted_8 = {
      key: 1,
      class: "b-clockpicker-period"
    };
    const _hoisted_9 = {
      key: 1,
      class: "b-clockpicker-footer card-footer"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_input = vue.resolveComponent("b-input");
      const _component_b_clockpicker_face = vue.resolveComponent("b-clockpicker-face");
      const _component_b_dropdown = vue.resolveComponent("b-dropdown");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["b-clockpicker control", [_ctx.size, _ctx.type, { "is-expanded": _ctx.expanded }]]
        }, _ctx.rootAttrs),
        [
          !_ctx.isMobile || _ctx.inline ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
            key: 0,
            ref: "dropdown",
            position: _ctx.position,
            disabled: _ctx.disabledOrUndefined,
            inline: _ctx.inline,
            "mobile-modal": _ctx.mobileModal,
            "append-to-body": _ctx.appendToBody,
            "append-to-body-copy-parent": "",
            onActiveChange: _ctx.onActiveChange
          }, vue.createSlots({
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "card",
                disabled: _ctx.disabledOrUndefined,
                custom: ""
              }, [
                _ctx.inline ? (vue.openBlock(), vue.createElementBlock("header", _hoisted_2, [
                  vue.createElementVNode("div", _hoisted_3, [
                    vue.createElementVNode("div", _hoisted_4, [
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(["b-clockpicker-btn", { active: _ctx.isSelectingHour }]),
                          onClick: _cache[3] || (_cache[3] = ($event) => _ctx.isSelectingHour = true)
                        },
                        vue.toDisplayString(_ctx.hoursDisplay),
                        3
                        /* TEXT, CLASS */
                      ),
                      vue.createElementVNode(
                        "span",
                        null,
                        vue.toDisplayString(_ctx.hourLiteral),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(["b-clockpicker-btn", { active: !_ctx.isSelectingHour }]),
                          onClick: _cache[4] || (_cache[4] = ($event) => _ctx.isSelectingHour = false)
                        },
                        vue.toDisplayString(_ctx.minutesDisplay),
                        3
                        /* TEXT, CLASS */
                      )
                    ]),
                    !_ctx.isHourFormat24 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(["b-clockpicker-btn", {
                            active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                          }]),
                          onClick: _cache[5] || (_cache[5] = ($event) => _ctx.onMeridienClick(_ctx.amString))
                        },
                        vue.toDisplayString(_ctx.amString),
                        3
                        /* TEXT, CLASS */
                      ),
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(["b-clockpicker-btn", {
                            active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                          }]),
                          onClick: _cache[6] || (_cache[6] = ($event) => _ctx.onMeridienClick(_ctx.pmString))
                        },
                        vue.toDisplayString(_ctx.pmString),
                        3
                        /* TEXT, CLASS */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", _hoisted_6, [
                  vue.createElementVNode(
                    "div",
                    {
                      class: "b-clockpicker-body",
                      style: vue.normalizeStyle({ width: _ctx.faceSize + "px", height: _ctx.faceSize + "px" })
                    },
                    [
                      !_ctx.inline ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                        vue.createElementVNode(
                          "div",
                          {
                            class: vue.normalizeClass(["b-clockpicker-btn", { active: _ctx.isSelectingHour }]),
                            onClick: _cache[7] || (_cache[7] = ($event) => _ctx.isSelectingHour = true)
                          },
                          vue.toDisplayString(_ctx.hoursLabel),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.createElementVNode(
                          "span",
                          {
                            class: vue.normalizeClass(["b-clockpicker-btn", { active: !_ctx.isSelectingHour }]),
                            onClick: _cache[8] || (_cache[8] = ($event) => _ctx.isSelectingHour = false)
                          },
                          vue.toDisplayString(_ctx.minutesLabel),
                          3
                          /* TEXT, CLASS */
                        )
                      ])) : vue.createCommentVNode("v-if", true),
                      !_ctx.isHourFormat24 && !_ctx.inline ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
                        vue.createElementVNode(
                          "div",
                          {
                            class: vue.normalizeClass(["b-clockpicker-btn", {
                              active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                            }]),
                            onClick: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienClick(_ctx.amString))
                          },
                          vue.toDisplayString(_ctx.amString),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.createElementVNode(
                          "div",
                          {
                            class: vue.normalizeClass(["b-clockpicker-btn", {
                              active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                            }]),
                            onClick: _cache[10] || (_cache[10] = ($event) => _ctx.onMeridienClick(_ctx.pmString))
                          },
                          vue.toDisplayString(_ctx.pmString),
                          3
                          /* TEXT, CLASS */
                        )
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createVNode(_component_b_clockpicker_face, {
                        ref: "clockpickerFace",
                        "picker-size": _ctx.faceSize,
                        min: _ctx.minFaceValue,
                        max: _ctx.maxFaceValue,
                        "face-numbers": _ctx.isSelectingHour ? _ctx.hours : _ctx.minutes,
                        "disabled-values": _ctx.faceDisabledValues,
                        double: _ctx.isSelectingHour && _ctx.isHourFormat24,
                        value: _ctx.isSelectingHour ? _ctx.hoursSelected ?? void 0 : _ctx.minutesSelected ?? void 0,
                        onInput: _ctx.onClockInput,
                        onChange: _ctx.onClockChange
                      }, null, 8, ["picker-size", "min", "max", "face-numbers", "disabled-values", "double", "value", "onInput", "onChange"])
                    ],
                    4
                    /* STYLE */
                  )
                ]),
                _ctx.$slots.default !== void 0 && _ctx.$slots.default([]).length ? (vue.openBlock(), vue.createElementBlock("footer", _hoisted_9, [
                  vue.renderSlot(_ctx.$slots, "default")
                ])) : vue.createCommentVNode("v-if", true)
              ], 8, _hoisted_1)
            ]),
            _: 2
            /* DYNAMIC */
          }, [
            !_ctx.inline ? {
              name: "trigger",
              fn: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "trigger", {}, () => [
                  vue.createVNode(_component_b_input, vue.mergeProps({
                    ref: "input",
                    autocomplete: "off",
                    "model-value": _ctx.formatValue(_ctx.computedValue),
                    placeholder: _ctx.placeholder,
                    size: _ctx.size,
                    icon: _ctx.icon,
                    "icon-pack": _ctx.iconPack,
                    loading: _ctx.loading,
                    disabled: _ctx.disabledOrUndefined,
                    readonly: !_ctx.editable,
                    rounded: _ctx.rounded
                  }, _ctx.fallthroughAttrs, {
                    "use-html5-validation": _ctx.useHtml5Validation,
                    onClick: _ctx.onInputClick,
                    onKeyup: _cache[0] || (_cache[0] = vue.withKeys(($event) => _ctx.toggle(true), ["enter"])),
                    onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
                    onFocus: _ctx.handleOnFocus,
                    onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.checkHtml5Validity())
                  }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onClick", "onFocus"])
                ])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["position", "disabled", "inline", "mobile-modal", "append-to-body", "onActiveChange"])) : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
            key: 1,
            ref: "input",
            type: "time",
            autocomplete: "off",
            "model-value": _ctx.formatHHMMSS(_ctx.computedValue),
            placeholder: _ctx.placeholder,
            size: _ctx.size,
            icon: _ctx.icon,
            "icon-pack": _ctx.iconPack,
            loading: _ctx.loading,
            max: _ctx.formatHHMMSS(_ctx.maxTime),
            min: _ctx.formatHHMMSS(_ctx.minTime),
            disabled: _ctx.disabledOrUndefined,
            readonly: false
          }, _ctx.fallthroughAttrs, {
            "use-html5-validation": _ctx.useHtml5Validation,
            onClick: _cache[11] || (_cache[11] = vue.withModifiers(($event) => _ctx.toggle(true), ["stop"])),
            onKeyup: _cache[12] || (_cache[12] = vue.withKeys(($event) => _ctx.toggle(true), ["enter"])),
            onChange: _ctx.onChangeNativePicker,
            onFocus: _ctx.handleOnFocus,
            onBlur: _cache[13] || (_cache[13] = ($event) => _ctx.onBlur() && _ctx.checkHtml5Validity())
          }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus"]))
        ],
        16
        /* FULL_PROPS */
      );
    }
    var Clockpicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Clockpicker);
      }
    };

    exports.BClockpicker = Clockpicker;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
