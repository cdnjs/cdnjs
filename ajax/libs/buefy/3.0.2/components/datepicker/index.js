/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Datepicker = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultIconPrev: "chevron-left",
      defaultIconNext: "chevron-right",
      defaultLocale: void 0,
      defaultInputAutocomplete: "on",
      defaultDayNames: null,
      defaultMonthNames: null,
      defaultUnselectableDaysOfWeek: null,
      defaultDatepickerMobileNative: true,
      defaultInputHasCounter: true,
      defaultCompatFallthrough: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultFieldLabelPosition: null,
      defaultDatepickerYearsRange: [-100, 10],
      defaultDatepickerNearbyMonthDays: true,
      defaultDatepickerNearbySelectableMonthDays: false,
      defaultDatepickerShowWeekNumber: false,
      defaultDatepickerWeekNumberClickable: false,
      defaultDatepickerMobileModal: true,
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
    function getMonthNames(locale, format = "long") {
      const dates = [];
      for (let i = 0; i < 12; i++) {
        dates.push(new Date(2e3, i, 15));
      }
      const dtf = new Intl.DateTimeFormat(locale, {
        month: format
      });
      return dates.map((d) => dtf.format(d));
    }
    function getWeekdayNames(locale, format = "narrow") {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const dt = new Date(2e3, 0, i + 1);
        dates[dt.getDay()] = dt;
      }
      const dtf = new Intl.DateTimeFormat(locale, { weekday: format });
      return dates.map((d) => dtf.format(d));
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
    const isDefined = (d) => d !== void 0;
    function isTag(vnode) {
      return vnode.type !== vue.Comment && vnode.type !== vue.Text && vnode.type !== vue.Static;
    }

    var _sfc_main$9 = vue.defineComponent({
      name: "BFieldBody",
      inject: {
        parent: {
          from: "BField",
          default: null
        }
      },
      props: {
        message: {
          type: [String, Array]
        },
        type: {
          type: [String, Object]
        }
      },
      render() {
        let first = true;
        let children = typeof this.$slots.default === "function" ? this.$slots.default() : this.$slots.default;
        if (children != null && children.length === 1 && children[0].type === vue.Fragment) {
          children = children[0].children;
        }
        return vue.h(
          "div",
          { class: "field-body" },
          {
            default: () => {
              return children != null && children.map((element) => {
                if (element.type === vue.Comment || element.type === vue.Text) {
                  return element;
                }
                let message;
                if (first) {
                  message = this.message;
                  first = false;
                }
                const parentField = this.parent;
                return vue.h(
                  // parentField.$.type is supposed to be BField
                  // it falls back to `resolveComponent('b-field')`
                  // but won't work unless `BField` is globally registered
                  // should not be a problem as long as `BFieldBody` is properly used
                  parentField ? parentField.$.type : vue.resolveComponent("b-field"),
                  {
                    type: this.type,
                    message
                  },
                  () => element
                );
              });
            }
          }
        );
      }
    });

    const Field = vue.defineComponent({
      name: "BField",
      components: { BFieldBody: _sfc_main$9 },
      provide() {
        return {
          BField: this
        };
      },
      inject: {
        parent: {
          from: "BField",
          default: false
        }
      },
      // Used internally only when using Field in Field
      props: {
        type: {
          type: [String, Object],
          default: void 0
        },
        label: String,
        labelFor: String,
        message: {
          type: [String, Array, Object],
          default: void 0
        },
        grouped: Boolean,
        groupMultiline: Boolean,
        position: String,
        expanded: Boolean,
        horizontal: Boolean,
        addons: {
          type: Boolean,
          default: true
        },
        customClass: String,
        labelPosition: {
          type: String,
          default: () => {
            return config.defaultFieldLabelPosition;
          }
        }
      },
      data() {
        return {
          newType: this.type,
          newMessage: this.message,
          fieldLabelSize: null,
          numberInputClasses: [],
          _isField: true
          // Used internally by Input and Select
        };
      },
      computed: {
        rootClasses() {
          return [
            {
              "is-expanded": this.expanded,
              "is-horizontal": this.horizontal,
              "is-floating-in-label": this.hasLabel && !this.horizontal && this.labelPosition === "inside",
              "is-floating-label": this.hasLabel && !this.horizontal && this.labelPosition === "on-border"
            },
            this.numberInputClasses
          ];
        },
        innerFieldClasses() {
          return [
            this.fieldType(),
            this.newPosition,
            {
              "is-grouped-multiline": this.groupMultiline
            }
          ];
        },
        hasInnerField() {
          return this.grouped || this.groupMultiline || this.hasAddons();
        },
        /*
        * Correct Bulma class for the side of the addon or group.
        *
        * This is not kept like the others (is-small, etc.),
        * because since 'has-addons' is set automatically it
        * doesn't make sense to teach users what addons are exactly.
        */
        newPosition() {
          if (this.position === void 0) return;
          const position = this.position.split("-");
          if (position.length < 1) return;
          const prefix = this.grouped ? "is-grouped-" : "has-addons-";
          if (this.position) return prefix + position[1];
          return void 0;
        },
        /*
        * Formatted message in case it's an array
        * (each element is separated by <br> tag)
        */
        formattedMessage() {
          const parentField = this.parent;
          if (parentField && parentField.hasInnerField) {
            return "";
          }
          if (typeof this.newMessage === "string") {
            return [this.newMessage];
          }
          const messages = [];
          if (Array.isArray(this.newMessage)) {
            this.newMessage.forEach((message) => {
              if (typeof message === "string") {
                messages.push(message);
              } else {
                for (const key in message) {
                  if (message[key]) {
                    messages.push(key);
                  }
                }
              }
            });
          } else {
            for (const key in this.newMessage) {
              if (this.newMessage[key]) {
                messages.push(key);
              }
            }
          }
          return messages.filter((m) => !!m);
        },
        hasLabel() {
          return this.label || this.$slots.label;
        },
        hasMessage() {
          const parentField = this.parent;
          return (!parentField || !parentField.hasInnerField) && this.newMessage || this.$slots.message;
        }
      },
      watch: {
        /*
        * Set internal type when prop change.
        */
        type(value) {
          this.newType = value;
        },
        /*
        * Set internal message when prop change.
        */
        message(value) {
          if (JSON.stringify(value) !== JSON.stringify(this.newMessage)) {
            this.newMessage = value;
          }
        },
        /*
        * Set parent message if we use Field in Field.
        */
        newMessage(value) {
          const parentField = this.parent;
          if (parentField && parentField.hasInnerField) {
            if (!parentField.type) {
              parentField.newType = this.newType;
            }
            if (!parentField.message) {
              parentField.newMessage = value;
            }
          }
        }
      },
      methods: {
        /*
        * Field has addons if there are more than one slot
        * (element / component) in the Field.
        * Or is grouped when prop is set.
        * Is a method to be called when component re-render.
        */
        fieldType() {
          if (this.grouped) return "is-grouped";
          if (this.hasAddons()) return "has-addons";
        },
        hasAddons() {
          let renderedNode = 0;
          if (this.$slots.default) {
            renderedNode = this.$slots.default().reduce((i, node) => isTag(node) ? i + 1 : i, 0);
          }
          return renderedNode > 1 && this.addons && !this.horizontal;
        },
        // called by a number input if it is a direct child.
        wrapNumberinput({ controlsPosition, size }) {
          const classes = ["has-numberinput"];
          if (controlsPosition) {
            classes.push(`has-numberinput-${controlsPosition}`);
          }
          if (size) {
            classes.push(`has-numberinput-${size}`);
          }
          this.numberInputClasses = classes;
        }
      },
      mounted() {
        if (this.horizontal) {
          const elements = this.$el.querySelectorAll(".input, .select, .button, .textarea, .b-slider");
          if (elements.length > 0) {
            this.fieldLabelSize = "is-normal";
          }
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

    const _hoisted_1$8 = ["for"];
    const _hoisted_2$8 = ["for"];
    const _hoisted_3$6 = {
      key: 3,
      class: "field-body"
    };
    function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_field_body = vue.resolveComponent("b-field-body");
      const _component_b_field = vue.resolveComponent("b-field");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["field", _ctx.rootClasses])
        },
        [
          _ctx.horizontal ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(["field-label", [_ctx.customClass, _ctx.fieldLabelSize]])
            },
            [
              _ctx.hasLabel ? (vue.openBlock(), vue.createElementBlock("label", {
                key: 0,
                for: _ctx.labelFor,
                class: vue.normalizeClass([_ctx.customClass, "label"])
              }, [
                _ctx.$slots.label ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.label),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ], 10, _hoisted_1$8)) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.hasLabel ? (vue.openBlock(), vue.createElementBlock("label", {
                key: 0,
                for: _ctx.labelFor,
                class: vue.normalizeClass([_ctx.customClass, "label"])
              }, [
                _ctx.$slots.label ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.label),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ], 10, _hoisted_2$8)) : vue.createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          _ctx.horizontal ? (vue.openBlock(), vue.createBlock(_component_b_field_body, {
            key: 2,
            message: _ctx.newMessage ? _ctx.formattedMessage : "",
            type: _ctx.newType
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["message", "type"])) : _ctx.hasInnerField ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$6, [
            vue.createVNode(_component_b_field, {
              addons: false,
              type: _ctx.type,
              class: vue.normalizeClass(_ctx.innerFieldClasses)
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["type", "class"])
          ])) : vue.renderSlot(_ctx.$slots, "default", { key: 4 }),
          _ctx.hasMessage && !_ctx.horizontal ? (vue.openBlock(), vue.createElementBlock(
            "p",
            {
              key: 5,
              class: vue.normalizeClass(["help", _ctx.newType])
            },
            [
              _ctx.$slots.message ? vue.renderSlot(_ctx.$slots, "message", {
                key: 0,
                messages: _ctx.formattedMessage
              }) : (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                vue.renderList(_ctx.formattedMessage, (mess, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    [
                      vue.createTextVNode(
                        vue.toDisplayString(mess) + " ",
                        1
                        /* TEXT */
                      ),
                      i + 1 < _ctx.formattedMessage.length ? (vue.openBlock(), vue.createElementBlock("br", { key: i })) : vue.createCommentVNode("v-if", true)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    }
    var BField = /* @__PURE__ */ _export_sfc(Field, [["render", _sfc_render$9]]);

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
    var _sfc_main$8 = vue.defineComponent({
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

    const _hoisted_1$7 = ["tabindex"];
    const _hoisted_2$7 = ["aria-hidden"];
    const _hoisted_3$5 = ["aria-hidden"];
    const _hoisted_4$4 = ["role", "aria-modal"];
    function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
          ], 40, _hoisted_1$7)) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.Transition, { name: _ctx.animation }, {
            default: vue.withCtx(() => [
              _ctx.isMobileModal ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "background",
                "aria-hidden": !_ctx.isActive
              }, null, 8, _hoisted_2$7)), [
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
                ], 12, _hoisted_4$4)
              ], 12, _hoisted_3$5)), [
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
    var BDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);

    var _sfc_main$7 = vue.defineComponent({
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

    const _hoisted_1$6 = {
      key: 0,
      class: "dropdown-divider"
    };
    const _hoisted_2$6 = ["role", "tabindex"];
    const _hoisted_3$4 = ["role", "tabindex"];
    function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
      return _ctx.separator ? (vue.openBlock(), vue.createElementBlock("hr", _hoisted_1$6)) : !_ctx.custom && !_ctx.hasLink ? (vue.openBlock(), vue.createElementBlock("a", {
        key: 1,
        class: vue.normalizeClass(["dropdown-item", _ctx.anchorClasses]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
        role: _ctx.ariaRoleItem,
        tabindex: _ctx.isFocusable ? 0 : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_2$6)) : (vue.openBlock(), vue.createElementBlock("div", {
        key: 2,
        class: vue.normalizeClass(_ctx.itemClasses),
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
        role: _ctx.ariaRoleItem,
        tabindex: _ctx.isFocusable ? 0 : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3$4));
    }
    var BDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);

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

    var _sfc_main$6 = vue.defineComponent({
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

    function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);

    var _sfc_main$5 = vue.defineComponent({
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

    const _hoisted_1$5 = ["type", "autocomplete", "maxlength"];
    const _hoisted_2$5 = ["maxlength"];
    const _hoisted_3$3 = ["type", "autocomplete", "maxlength"];
    const _hoisted_4$3 = ["maxlength"];
    function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
              }), null, 16, _hoisted_1$5)), [
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
              }), null, 16, _hoisted_2$5)), [
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
              }), null, 16, _hoisted_3$3)), [
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
              }), null, 16, _hoisted_4$3)), [
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
    var BInput = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);

    var _sfc_main$4 = vue.defineComponent({
      name: "BSelect",
      components: {
        BIcon
      },
      mixins: [CompatFallthroughMixin, FormElementMixin],
      props: {
        modelValue: {
          type: [
            String,
            Number,
            Boolean,
            Object,
            Array,
            Function,
            Date,
            null
          ],
          default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        blur: (_event) => true,
        focus: (_event) => true,
        "update:modelValue": (_value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          selected: this.modelValue,
          _elementRef: "select"
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.selected;
          },
          set(value) {
            this.selected = value;
            this.$emit("update:modelValue", value);
            !this.isValid && this.checkHtml5Validity();
          }
        },
        spanClasses() {
          return [this.size, this.statusType, {
            "is-fullwidth": this.expanded,
            "is-loading": this.loading,
            "is-multiple": this.multiple,
            "is-rounded": this.rounded,
            "is-empty": this.selected === null
          }];
        }
      },
      watch: {
        /*
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
          this.selected = value;
          !this.isValid && this.checkHtml5Validity();
        }
      }
    });

    const _hoisted_1$4 = ["multiple", "size"];
    const _hoisted_2$4 = {
      key: 0,
      value: null,
      disabled: "",
      hidden: ""
    };
    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["control", { "is-expanded": _ctx.expanded, "has-icons-left": _ctx.icon }]
        }, _ctx.rootAttrs),
        [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(["select", _ctx.spanClasses])
            },
            [
              vue.withDirectives(vue.createElementVNode("select", vue.mergeProps({
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
                ref: "select",
                multiple: _ctx.multiple,
                size: _ctx.nativeSize
              }, _ctx.fallthroughAttrs, {
                onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("focus", $event))
              }), [
                _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    _ctx.computedValue == null ? (vue.openBlock(), vue.createElementBlock(
                      "option",
                      _hoisted_2$4,
                      vue.toDisplayString(_ctx.placeholder),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.renderSlot(_ctx.$slots, "default")
              ], 16, _hoisted_1$4), [
                [vue.vModelSelect, _ctx.computedValue]
              ])
            ],
            2
            /* CLASS */
          ),
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            class: "is-left",
            icon: _ctx.icon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize
          }, null, 8, ["icon", "pack", "size"])) : vue.createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    }
    var BSelect = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);

    var _sfc_main$3 = vue.defineComponent({
      name: "BDatepickerTableRow",
      inject: {
        $datepicker: { name: "$datepicker", default: false }
      },
      props: {
        selectedDate: {
          type: [Date, Array]
        },
        hoveredDateRange: Array,
        day: {
          type: Number
        },
        week: {
          type: Array,
          required: true
        },
        month: {
          type: Number,
          required: true
        },
        minDate: [Date, null],
        maxDate: [Date, null],
        disabled: Boolean,
        unselectableDates: [Array, Function, null],
        unselectableDaysOfWeek: [Array, null],
        selectableDates: [Array, Function, null],
        events: Array,
        indicators: String,
        dateCreator: Function,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        range: Boolean,
        multiple: Boolean,
        rulesForFirstWeek: Number,
        firstDayOfWeek: [Number, null]
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "change-focus": (_day) => true,
        rangeHoverEndDate: (_day) => true,
        select: (_day) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      watch: {
        day(day) {
          const refName = `day-${this.month}-${day}`;
          this.$nextTick(() => {
            let cell;
            if (Array.isArray(this.$refs[refName])) {
              cell = this.$refs[refName][0];
            } else {
              cell = this.$refs[refName];
            }
            if (cell) {
              cell.focus();
            }
          });
        }
      },
      methods: {
        firstWeekOffset(year, dow, doy) {
          const fwd = 7 + dow - doy;
          const firstJanuary = new Date(year, 0, fwd);
          const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        },
        daysInYear(year) {
          return this.isLeapYear(year) ? 366 : 365;
        },
        isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },
        getSetDayOfYear(input) {
          return Math.round((+input - +new Date(input.getFullYear(), 0, 1)) / 864e5) + 1;
        },
        weeksInYear(year, dow, doy) {
          const weekOffset = this.firstWeekOffset(year, dow, doy);
          const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
          return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        },
        getWeekNumber(mom) {
          const dow = this.firstDayOfWeek;
          const doy = this.rulesForFirstWeek;
          const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
          const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
          let resWeek;
          let resYear;
          if (week < 1) {
            resYear = mom.getFullYear() - 1;
            resWeek = week + this.weeksInYear(resYear, dow, doy);
          } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
            resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
            resYear = mom.getFullYear() + 1;
          } else {
            resYear = mom.getFullYear();
            resWeek = week;
          }
          return { week: resWeek, year: resYear };
        },
        clickWeekNumber(weekData) {
          if (this.weekNumberClickable) {
            this.$datepicker.$emit("week-number-click", weekData.week, weekData.year);
          }
        },
        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
          const validity = [];
          if (this.minDate) {
            validity.push(day >= this.minDate);
          }
          if (this.maxDate) {
            validity.push(day <= this.maxDate);
          }
          if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
            validity.push(day.getMonth() === this.month);
          }
          if (this.selectableDates) {
            if (typeof this.selectableDates === "function") {
              if (this.selectableDates(day)) {
                return true;
              } else {
                validity.push(false);
              }
            } else {
              for (let i = 0; i < this.selectableDates.length; i++) {
                const enabledDate = this.selectableDates[i];
                if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                  return true;
                } else {
                  validity.push(false);
                }
              }
            }
          }
          if (this.unselectableDates) {
            if (typeof this.unselectableDates === "function") {
              validity.push(!this.unselectableDates(day));
            } else {
              for (let i = 0; i < this.unselectableDates.length; i++) {
                const disabledDate = this.unselectableDates[i];
                validity.push(
                  day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
                );
              }
            }
          }
          if (this.unselectableDaysOfWeek) {
            for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
              const dayOfWeek = this.unselectableDaysOfWeek[i];
              validity.push(day.getDay() !== dayOfWeek);
            }
          }
          return validity.indexOf(false) < 0;
        },
        /*
        * Emit select event with chosen date as payload
        */
        emitChosenDate(day) {
          if (this.disabled) return;
          if (this.selectableDate(day)) {
            this.$emit("select", day);
          }
        },
        // TODO: return undefined instead of boolean if no events
        eventsDateMatch(day) {
          if (!this.events || !this.events.length) return false;
          const dayEvents = [];
          for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].date.getDay() === day.getDay()) {
              dayEvents.push(this.events[i]);
            }
          }
          if (!dayEvents.length) {
            return false;
          }
          return dayEvents;
        },
        /*
        * Build classObject for cell using validations
        */
        classObject(day) {
          function dateMatch(dateOne, dateTwo, multiple) {
            if (!dateOne || !dateTwo || multiple) {
              return false;
            }
            if (Array.isArray(dateTwo)) {
              return dateTwo.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
            }
            return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
          }
          function dateWithin(dateOne, dates, multiple) {
            if (!Array.isArray(dates) || multiple) {
              return false;
            }
            return dateOne > dates[0] && dateOne < dates[1];
          }
          return {
            "is-selected": dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple),
            "is-first-selected": dateMatch(
              day,
              Array.isArray(this.selectedDate) ? this.selectedDate[0] : void 0,
              this.multiple
            ),
            "is-within-selected": dateWithin(day, this.selectedDate, this.multiple),
            "is-last-selected": dateMatch(
              day,
              Array.isArray(this.selectedDate) ? this.selectedDate[1] : void 0,
              this.multiple
            ),
            "is-within-hovered-range": this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
            "is-first-hovered": dateMatch(
              day,
              Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : void 0
            ),
            "is-within-hovered": dateWithin(day, this.hoveredDateRange),
            "is-last-hovered": dateMatch(
              day,
              Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : void 0
            ),
            "is-today": dateMatch(day, this.dateCreator()),
            "is-selectable": this.selectableDate(day) && !this.disabled,
            "is-unselectable": !this.selectableDate(day) || this.disabled,
            "is-invisible": !this.nearbyMonthDays && day.getMonth() !== this.month,
            "is-nearby": this.nearbySelectableMonthDays && day.getMonth() !== this.month,
            "has-event": this.eventsDateMatch(day),
            [this.indicators]: this.eventsDateMatch(day)
          };
        },
        setRangeHoverEndDate(day) {
          if (this.range) {
            this.$emit("rangeHoverEndDate", day);
          }
        },
        manageKeydown(event, weekDay) {
          const { key } = event;
          let preventDefault = true;
          switch (key) {
            case "Tab": {
              preventDefault = false;
              break;
            }
            case " ":
            case "Space":
            case "Spacebar":
            case "Enter": {
              this.emitChosenDate(weekDay);
              break;
            }
            case "ArrowLeft":
            case "Left": {
              this.changeFocus(weekDay, -1);
              break;
            }
            case "ArrowRight":
            case "Right": {
              this.changeFocus(weekDay, 1);
              break;
            }
            case "ArrowUp":
            case "Up": {
              this.changeFocus(weekDay, -7);
              break;
            }
            case "ArrowDown":
            case "Down": {
              this.changeFocus(weekDay, 7);
              break;
            }
          }
          if (preventDefault) {
            event.preventDefault();
          }
        },
        changeFocus(day, inc) {
          const nextDay = new Date(day.getTime());
          nextDay.setDate(day.getDate() + inc);
          while ((!this.minDate || nextDay > this.minDate) && (!this.maxDate || nextDay < this.maxDate) && !this.selectableDate(nextDay)) {
            nextDay.setDate(nextDay.getDate() + Math.sign(inc));
          }
          this.setRangeHoverEndDate(nextDay);
          this.$emit("change-focus", nextDay);
        }
      }
    });

    const _hoisted_1$3 = { class: "datepicker-row" };
    const _hoisted_2$3 = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
    const _hoisted_3$2 = {
      key: 0,
      class: "events"
    };
    const _hoisted_4$2 = {
      key: 0,
      class: "events"
    };
    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        [
          vue.createCommentVNode(" eslint-disable max-len "),
          vue.createElementVNode("div", _hoisted_1$3, [
            _ctx.showWeekNumber ? (vue.openBlock(), vue.createElementBlock(
              "a",
              {
                key: 0,
                class: vue.normalizeClass(["datepicker-cell is-week-number", { "is-clickable": _ctx.weekNumberClickable }]),
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.clickWeekNumber(_ctx.getWeekNumber(_ctx.week[6])), ["prevent"]))
              },
              [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString(_ctx.getWeekNumber(_ctx.week[6]).week),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.week, (weekDay, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: index },
                  [
                    _ctx.selectableDate(weekDay) && !_ctx.disabled ? (vue.openBlock(), vue.createElementBlock("a", {
                      key: 0,
                      ref_for: true,
                      ref: `day-${weekDay.getMonth()}-${weekDay.getDate()}`,
                      class: vue.normalizeClass([_ctx.classObject(weekDay), "datepicker-cell"]),
                      role: "button",
                      href: "#",
                      disabled: _ctx.disabled || void 0,
                      onClick: vue.withModifiers(($event) => _ctx.emitChosenDate(weekDay), ["prevent"]),
                      onMouseenter: ($event) => _ctx.setRangeHoverEndDate(weekDay),
                      onKeydown: ($event) => _ctx.manageKeydown($event, weekDay),
                      tabindex: _ctx.day === weekDay.getDate() && _ctx.month === weekDay.getMonth() ? void 0 : -1
                    }, [
                      vue.createElementVNode(
                        "span",
                        null,
                        vue.toDisplayString(weekDay.getDate()),
                        1
                        /* TEXT */
                      ),
                      _ctx.eventsDateMatch(weekDay) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$2, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(_ctx.eventsDateMatch(weekDay), (event, evIdx) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "div",
                              {
                                class: vue.normalizeClass(["event", event.type]),
                                key: evIdx
                              },
                              null,
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : vue.createCommentVNode("v-if", true)
                    ], 42, _hoisted_2$3)) : (vue.openBlock(), vue.createElementBlock(
                      "div",
                      {
                        key: 1,
                        class: vue.normalizeClass([_ctx.classObject(weekDay), "datepicker-cell"])
                      },
                      [
                        vue.createElementVNode(
                          "span",
                          null,
                          vue.toDisplayString(weekDay.getDate()),
                          1
                          /* TEXT */
                        ),
                        _ctx.eventsDateMatch(weekDay) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(_ctx.eventsDateMatch(weekDay), (event, evIdx) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "div",
                                {
                                  class: vue.normalizeClass(["event", event.type]),
                                  key: evIdx
                                },
                                null,
                                2
                                /* CLASS */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" eslint-enable max-len ")
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      );
    }
    var BDatepickerTableRow = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

    var _sfc_main$2 = vue.defineComponent({
      name: "BDatepickerTable",
      components: {
        BDatepickerTableRow
      },
      props: {
        modelValue: {
          type: [Date, Array, null]
        },
        dayNames: [Array, null],
        monthNames: [Array, null],
        firstDayOfWeek: [Number, null],
        events: Array,
        indicators: String,
        minDate: [Date, null],
        maxDate: [Date, null],
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: [Array, Function, null],
        unselectableDaysOfWeek: [Array, null],
        selectableDates: [Array, Function, null],
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        rulesForFirstWeek: Number,
        range: Boolean,
        multiple: Boolean
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "range-end": (_date) => true,
        "range-start": (_date) => true,
        "update:focused": (_focused) => true,
        "update:modelValue": (_value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          selectedBeginDate: void 0,
          selectedEndDate: void 0,
          hoveredEndDate: void 0
        };
      },
      computed: {
        multipleSelectedDates: {
          get() {
            return this.multiple && this.modelValue ? this.modelValue : [];
          },
          set(value) {
            this.$emit("update:modelValue", value);
          }
        },
        visibleDayNames() {
          const visibleDayNames = [];
          let index = this.firstDayOfWeek;
          while (visibleDayNames.length < this.dayNames.length) {
            const currentDayName = this.dayNames[index % this.dayNames.length];
            visibleDayNames.push(currentDayName);
            index++;
          }
          if (this.showWeekNumber) visibleDayNames.unshift("");
          return visibleDayNames;
        },
        hasEvents() {
          return this.events && this.events.length;
        },
        /*
        * Return array of all events in the specified month
        */
        eventsInThisMonth() {
          if (!this.events) return [];
          const monthEvents = [];
          for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            if (!Object.prototype.hasOwnProperty.call(event, "date")) {
              event = { date: event, type: "is-primary" };
            }
            if (!Object.prototype.hasOwnProperty.call(event, "type")) {
              event.type = "is-primary";
            }
            if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
              monthEvents.push(event);
            }
          }
          return monthEvents;
        },
        /*
        * Return array of all weeks in the specified month
        */
        weeksInThisMonth() {
          this.validateFocusedDay();
          const month = this.focused.month;
          const year = this.focused.year;
          const weeksInThisMonth = [];
          let startingDay = 1;
          while (weeksInThisMonth.length < 6) {
            const newWeek = this.weekBuilder(startingDay, month, year);
            weeksInThisMonth.push(newWeek);
            startingDay += 7;
          }
          return weeksInThisMonth;
        },
        hoveredDateRange() {
          var _a, _b;
          if (!this.range) {
            return [];
          }
          if (!isNaN((_b = (_a = this.selectedEndDate) == null ? void 0 : _a.valueOf()) != null ? _b : NaN)) {
            return [];
          }
          if (this.hoveredEndDate < this.selectedBeginDate) {
            return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
          }
          return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
        }
      },
      methods: {
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
          if (!this.range && !this.multiple) {
            this.$emit("update:modelValue", date);
          } else if (this.range) {
            this.handleSelectRangeDate(date);
          } else if (this.multiple) {
            this.handleSelectMultipleDates(date);
          }
        },
        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
          if (this.selectedBeginDate && this.selectedEndDate) {
            this.selectedBeginDate = date;
            this.selectedEndDate = void 0;
            this.$emit("range-start", date);
          } else if (this.selectedBeginDate && !this.selectedEndDate) {
            if (this.selectedBeginDate > date) {
              this.selectedEndDate = this.selectedBeginDate;
              this.selectedBeginDate = date;
            } else {
              this.selectedEndDate = date;
            }
            this.$emit("range-end", date);
            this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
          } else {
            this.selectedBeginDate = date;
            this.$emit("range-start", date);
          }
        },
        /*
        * If selected date already exists list of selected dates, remove it from the list
        * Otherwise, add date to list of selected dates
        */
        handleSelectMultipleDates(date) {
          const multipleSelect = this.multipleSelectedDates.filter(
            (selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()
          );
          if (multipleSelect.length) {
            this.multipleSelectedDates = this.multipleSelectedDates.filter(
              (selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth()
            );
          } else {
            this.multipleSelectedDates = [...this.multipleSelectedDates, date];
          }
        },
        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate, month, year) {
          const thisMonth = new Date(year, month);
          const thisWeek = [];
          const dayOfWeek = new Date(year, month, startingDate).getDay();
          const end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
          let daysAgo = 1;
          for (let i = 0; i < end; i++) {
            thisWeek.unshift(
              new Date(
                thisMonth.getFullYear(),
                thisMonth.getMonth(),
                startingDate - daysAgo
              )
            );
            daysAgo++;
          }
          thisWeek.push(new Date(year, month, startingDate));
          let daysForward = 1;
          while (thisWeek.length < 7) {
            thisWeek.push(new Date(year, month, startingDate + daysForward));
            daysForward++;
          }
          return thisWeek;
        },
        validateFocusedDay() {
          const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
          if (this.selectableDate(focusedDate)) return;
          let day = 0;
          const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
          let firstFocusable = null;
          while (!firstFocusable && ++day < monthDays) {
            const date = new Date(this.focused.year, this.focused.month, day);
            if (this.selectableDate(date)) {
              firstFocusable = focusedDate;
              const focused = {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
              };
              this.$emit("update:focused", focused);
            }
          }
        },
        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
          const validity = [];
          if (this.minDate) {
            validity.push(day >= this.minDate);
          }
          if (this.maxDate) {
            validity.push(day <= this.maxDate);
          }
          if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
            validity.push(day.getMonth() === this.focused.month);
          }
          if (this.selectableDates) {
            if (typeof this.selectableDates === "function") {
              if (this.selectableDates(day)) {
                return true;
              } else {
                validity.push(false);
              }
            } else {
              for (let i = 0; i < this.selectableDates.length; i++) {
                const enabledDate = this.selectableDates[i];
                if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                  return true;
                } else {
                  validity.push(false);
                }
              }
            }
          }
          if (this.unselectableDates) {
            if (typeof this.unselectableDates === "function") {
              validity.push(!this.unselectableDates(day));
            } else {
              for (let i = 0; i < this.unselectableDates.length; i++) {
                const disabledDate = this.unselectableDates[i];
                validity.push(
                  day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
                );
              }
            }
          }
          if (this.unselectableDaysOfWeek) {
            for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
              const dayOfWeek = this.unselectableDaysOfWeek[i];
              validity.push(day.getDay() !== dayOfWeek);
            }
          }
          return validity.indexOf(false) < 0;
        },
        eventsInThisWeek(week) {
          return this.eventsInThisMonth.filter((event) => {
            const stripped = new Date(Date.parse(event.date + ""));
            stripped.setHours(0, 0, 0, 0);
            const timed = stripped.getTime();
            return week.some((weekDate) => weekDate.getTime() === timed);
          });
        },
        setRangeHoverEndDate(day) {
          this.hoveredEndDate = day;
        },
        changeFocus(day) {
          const focused = {
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear()
          };
          this.$emit("update:focused", focused);
        }
      }
    });

    const _hoisted_1$2 = { class: "datepicker-table" };
    const _hoisted_2$2 = { class: "datepicker-header" };
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_datepicker_table_row = vue.resolveComponent("b-datepicker-table-row");
      return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$2, [
        vue.createElementVNode("header", _hoisted_2$2, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.visibleDayNames, (day, index) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: index,
                class: "datepicker-cell"
              }, [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString(day),
                  1
                  /* TEXT */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(["datepicker-body", { "has-events": _ctx.hasEvents }])
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.weeksInThisMonth, (week, index) => {
                return vue.openBlock(), vue.createBlock(_component_b_datepicker_table_row, {
                  key: index,
                  "selected-date": _ctx.modelValue ?? void 0,
                  day: _ctx.focused.day,
                  week,
                  month: _ctx.focused.month,
                  "min-date": _ctx.minDate,
                  "max-date": _ctx.maxDate,
                  disabled: _ctx.disabledOrUndefined,
                  "unselectable-dates": _ctx.unselectableDates,
                  "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                  "selectable-dates": _ctx.selectableDates,
                  events: _ctx.eventsInThisWeek(week),
                  indicators: _ctx.indicators,
                  "date-creator": _ctx.dateCreator,
                  "nearby-month-days": _ctx.nearbyMonthDays,
                  "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
                  "show-week-number": _ctx.showWeekNumber,
                  "week-number-clickable": _ctx.weekNumberClickable,
                  "first-day-of-week": _ctx.firstDayOfWeek,
                  "rules-for-first-week": _ctx.rulesForFirstWeek,
                  range: _ctx.range,
                  "hovered-date-range": _ctx.hoveredDateRange,
                  onSelect: _ctx.updateSelectedDate,
                  onRangeHoverEndDate: _ctx.setRangeHoverEndDate,
                  multiple: _ctx.multiple,
                  onChangeFocus: _ctx.changeFocus
                }, null, 8, ["selected-date", "day", "week", "month", "min-date", "max-date", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "first-day-of-week", "rules-for-first-week", "range", "hovered-date-range", "onSelect", "onRangeHoverEndDate", "multiple", "onChangeFocus"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ]);
    }
    var BDatepickerTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

    var _sfc_main$1 = vue.defineComponent({
      name: "BDatepickerMonth",
      props: {
        modelValue: {
          type: [Date, Array, null]
        },
        monthNames: [Array, null],
        events: Array,
        indicators: String,
        minDate: [Date, null],
        maxDate: [Date, null],
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: [Array, Function, null],
        unselectableDaysOfWeek: [Array, null],
        selectableDates: [Array, Function, null],
        range: Boolean,
        multiple: Boolean
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "change-focus": (_date) => true,
        "range-end": (_date) => true,
        "range-start": (_date) => true,
        "update:modelValue": (_date) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          selectedBeginDate: void 0,
          selectedEndDate: void 0,
          hoveredEndDate: void 0,
          multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
        };
      },
      computed: {
        hasEvents() {
          return this.events && this.events.length;
        },
        /*
        * Return array of all events in the specified month
        */
        eventsInThisYear() {
          if (!this.events) return [];
          const yearEvents = [];
          for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            if (!Object.prototype.hasOwnProperty.call(event, "date")) {
              event = { date: event, type: "is-primary" };
            }
            if (!Object.prototype.hasOwnProperty.call(event, "type")) {
              event.type = "is-primary";
            }
            if (event.date.getFullYear() === this.focused.year) {
              yearEvents.push(event);
            }
          }
          return yearEvents;
        },
        monthDates() {
          const year = this.focused.year;
          const months = [];
          for (let i = 0; i < 12; i++) {
            const d = new Date(year, i, 1);
            d.setHours(0, 0, 0, 0);
            months.push(d);
          }
          return months;
        },
        focusedMonth() {
          return this.focused.month;
        },
        hoveredDateRange() {
          var _a, _b;
          if (!this.range) {
            return [];
          }
          if (!isNaN((_b = (_a = this.selectedEndDate) == null ? void 0 : _a.valueOf()) != null ? _b : NaN)) {
            return [];
          }
          if (this.hoveredEndDate < this.selectedBeginDate) {
            return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
          }
          return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
        }
      },
      watch: {
        focusedMonth(month) {
          const refName = `month-${month}`;
          this.$nextTick(() => {
            let cell;
            if (Array.isArray(this.$refs[refName])) {
              cell = this.$refs[refName][0];
            } else {
              cell = this.$refs[refName];
            }
            if (cell) {
              cell.focus();
            }
          });
        }
      },
      methods: {
        selectMultipleDates(date) {
          const multipleSelect = this.multipleSelectedDates.filter(
            (selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()
          );
          if (multipleSelect.length) {
            this.multipleSelectedDates = this.multipleSelectedDates.filter(
              (selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth()
            );
          } else {
            this.multipleSelectedDates.push(date);
          }
          this.$emit("update:modelValue", this.multipleSelectedDates);
        },
        selectableDate(day) {
          const validity = [];
          if (this.minDate) {
            validity.push(day >= this.minDate);
          }
          if (this.maxDate) {
            validity.push(day <= this.maxDate);
          }
          validity.push(day.getFullYear() === this.focused.year);
          if (this.selectableDates) {
            if (typeof this.selectableDates === "function") {
              if (this.selectableDates(day)) {
                return true;
              } else {
                validity.push(false);
              }
            } else {
              for (let i = 0; i < this.selectableDates.length; i++) {
                const enabledDate = this.selectableDates[i];
                if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                  return true;
                } else {
                  validity.push(false);
                }
              }
            }
          }
          if (this.unselectableDates) {
            if (typeof this.unselectableDates === "function") {
              validity.push(!this.unselectableDates(day));
            } else {
              for (let i = 0; i < this.unselectableDates.length; i++) {
                const disabledDate = this.unselectableDates[i];
                validity.push(
                  day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
                );
              }
            }
          }
          if (this.unselectableDaysOfWeek) {
            for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
              const dayOfWeek = this.unselectableDaysOfWeek[i];
              validity.push(day.getDay() !== dayOfWeek);
            }
          }
          return validity.indexOf(false) < 0;
        },
        // TODO: return undefined instead of false if no events
        eventsDateMatch(day) {
          if (!this.eventsInThisYear.length) return false;
          const monthEvents = [];
          for (let i = 0; i < this.eventsInThisYear.length; i++) {
            if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
              monthEvents.push(this.events[i]);
            }
          }
          if (!monthEvents.length) {
            return false;
          }
          return monthEvents;
        },
        /*
        * Build classObject for cell using validations
        */
        classObject(day) {
          function dateMatch(dateOne, dateTwo, multiple) {
            if (!dateOne || !dateTwo || multiple) {
              return false;
            }
            if (Array.isArray(dateTwo)) {
              return dateTwo.some((date) => dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
            }
            return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
          }
          function dateWithin(dateOne, dates, multiple) {
            if (!Array.isArray(dates) || multiple) {
              return false;
            }
            return dateOne > dates[0] && dateOne < dates[1];
          }
          function dateMultipleSelected(dateOne, dates, multiple) {
            if (!Array.isArray(dates) || !multiple) {
              return false;
            }
            return dates.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
          }
          return {
            "is-selected": dateMatch(day, this.modelValue, this.multiple) || dateWithin(day, this.modelValue, this.multiple) || dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
            "is-first-selected": dateMatch(
              day,
              Array.isArray(this.modelValue) ? this.modelValue[0] : void 0,
              this.multiple
            ),
            "is-within-selected": dateWithin(day, this.modelValue, this.multiple),
            "is-last-selected": dateMatch(
              day,
              Array.isArray(this.modelValue) ? this.modelValue[1] : void 0,
              this.multiple
            ),
            "is-within-hovered-range": this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
            "is-first-hovered": dateMatch(
              day,
              Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : void 0
            ),
            "is-within-hovered": dateWithin(day, this.hoveredDateRange),
            "is-last-hovered": dateMatch(
              day,
              Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : void 0
            ),
            "is-today": dateMatch(day, this.dateCreator()),
            "is-selectable": this.selectableDate(day) && !this.disabled,
            "is-unselectable": !this.selectableDate(day) || this.disabled
          };
        },
        manageKeydown({ key }, date) {
          switch (key) {
            case " ":
            case "Space":
            case "Spacebar":
            case "Enter": {
              this.updateSelectedDate(date);
              break;
            }
            case "ArrowLeft":
            case "Left": {
              this.changeFocus(date, -1);
              break;
            }
            case "ArrowRight":
            case "Right": {
              this.changeFocus(date, 1);
              break;
            }
            case "ArrowUp":
            case "Up": {
              this.changeFocus(date, -3);
              break;
            }
            case "ArrowDown":
            case "Down": {
              this.changeFocus(date, 3);
              break;
            }
          }
        },
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
          if (!this.range && !this.multiple) {
            this.emitChosenDate(date);
          } else if (this.range) {
            this.handleSelectRangeDate(date);
          } else if (this.multiple) {
            this.selectMultipleDates(date);
          }
        },
        /*
         * Emit select event with chosen date as payload
         */
        emitChosenDate(day) {
          if (this.disabled) return;
          if (!this.multiple) {
            if (this.selectableDate(day)) {
              this.$emit("update:modelValue", day);
            }
          } else {
            this.selectMultipleDates(day);
          }
        },
        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
          if (this.disabled) return;
          if (this.selectedBeginDate && this.selectedEndDate) {
            this.selectedBeginDate = date;
            this.selectedEndDate = void 0;
            this.$emit("range-start", date);
          } else if (this.selectedBeginDate && !this.selectedEndDate) {
            if (this.selectedBeginDate > date) {
              this.selectedEndDate = this.selectedBeginDate;
              this.selectedBeginDate = date;
            } else {
              this.selectedEndDate = date;
            }
            this.$emit("range-end", date);
            this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
          } else {
            this.selectedBeginDate = date;
            this.$emit("range-start", date);
          }
        },
        setRangeHoverEndDate(day) {
          if (this.range) {
            this.hoveredEndDate = day;
          }
        },
        changeFocus(month, inc) {
          const nextMonth = month;
          nextMonth.setMonth(month.getMonth() + inc);
          this.$emit("change-focus", nextMonth);
        }
      }
    });

    const _hoisted_1$1 = { class: "datepicker-table" };
    const _hoisted_2$1 = { class: "datepicker-months" };
    const _hoisted_3$1 = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
    const _hoisted_4$1 = {
      key: 0,
      class: "events"
    };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$1, [
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(["datepicker-body", { "has-events": _ctx.hasEvents }])
          },
          [
            vue.createElementVNode("div", _hoisted_2$1, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.monthDates, (date, index) => {
                  return vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: index },
                    [
                      _ctx.selectableDate(date) && !_ctx.disabled ? (vue.openBlock(), vue.createElementBlock("a", {
                        key: 0,
                        ref_for: true,
                        ref: `month-${date.getMonth()}`,
                        class: vue.normalizeClass([[
                          _ctx.classObject(date),
                          { "has-event": _ctx.eventsDateMatch(date) },
                          _ctx.indicators
                        ], "datepicker-cell"]),
                        role: "button",
                        href: "#",
                        disabled: _ctx.disabledOrUndefined,
                        onClick: vue.withModifiers(($event) => _ctx.updateSelectedDate(date), ["prevent"]),
                        onMouseenter: ($event) => _ctx.setRangeHoverEndDate(date),
                        onKeydown: vue.withModifiers(($event) => _ctx.manageKeydown($event, date), ["prevent"]),
                        tabindex: _ctx.focused.month === date.getMonth() ? void 0 : -1
                      }, [
                        vue.createTextVNode(
                          vue.toDisplayString(_ctx.monthNames[date.getMonth()]) + " ",
                          1
                          /* TEXT */
                        ),
                        _ctx.eventsDateMatch(date) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(_ctx.eventsDateMatch(date), (event, evIdx) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "div",
                                {
                                  class: vue.normalizeClass(["event", event.type]),
                                  key: evIdx
                                },
                                null,
                                2
                                /* CLASS */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])) : vue.createCommentVNode("v-if", true)
                      ], 42, _hoisted_3$1)) : (vue.openBlock(), vue.createElementBlock(
                        "div",
                        {
                          key: 1,
                          class: vue.normalizeClass([_ctx.classObject(date), "datepicker-cell"])
                        },
                        vue.toDisplayString(_ctx.monthNames[date.getMonth()]),
                        3
                        /* TEXT, CLASS */
                      ))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          2
          /* CLASS */
        )
      ]);
    }
    var BDatepickerMonth = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    const defaultDateFormatter = (date, vm) => {
      const targetDates = Array.isArray(date) ? date : [date];
      const dates = targetDates.map((date2) => {
        const d = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 12);
        return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
      });
      return !vm.multiple ? dates.join(" - ") : dates.join(", ");
    };
    const defaultDateParser = (date, vm) => {
      if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
        const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf).formatToParts(new Date(2e3, 11, 25)).map((part) => {
          if (part.type === "literal") {
            return part.value;
          }
          return `((?!=<${part.type}>)\\d+)`;
        }).join("");
        const dateGroups = matchWithGroups(formatRegex, date);
        if (dateGroups.year && dateGroups.year.length === 4 && dateGroups.month && +dateGroups.month <= 12) {
          if (vm.isTypeMonth) return new Date(+dateGroups.year, +dateGroups.month - 1);
          else if (dateGroups.day && +dateGroups.day <= 31) {
            return new Date(+dateGroups.year, +dateGroups.month - 1, +dateGroups.day, 12);
          }
        }
      }
      if (!vm.isTypeMonth) return new Date(Date.parse(date));
      if (date) {
        const s = date.split("/");
        const year = s[0].length === 4 ? s[0] : s[1];
        const month = s[0].length === 2 ? s[0] : s[1];
        if (year && month) {
          return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
        }
      }
      return null;
    };
    var _sfc_main = vue.defineComponent({
      name: "BDatepicker",
      components: {
        BDatepickerTable,
        BDatepickerMonth,
        BInput,
        BField,
        BSelect,
        BIcon,
        BDropdown,
        BDropdownItem
      },
      mixins: [CompatFallthroughMixin, FormElementMixin],
      provide() {
        return {
          $datepicker: this
        };
      },
      props: {
        modelValue: {
          type: [Date, Array, null]
        },
        dayNames: {
          type: [Array, null],
          default: () => {
            if (!Array.isArray(config.defaultDayNames)) {
              return void 0;
            }
            return config.defaultDayNames;
          }
        },
        monthNames: {
          type: [Array, null],
          default: () => {
            if (!Array.isArray(config.defaultMonthNames)) {
              return void 0;
            }
            return config.defaultMonthNames;
          }
        },
        firstDayOfWeek: {
          type: Number,
          default: () => {
            {
              return 0;
            }
          }
        },
        inline: Boolean,
        minDate: [Date, null],
        maxDate: [Date, null],
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        horizontalTimePicker: Boolean,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: {
          type: [Array, null],
          default: () => config.defaultUnselectableDaysOfWeek
        },
        selectableDates: [Array, Function],
        dateFormatter: {
          type: Function,
          default: (date, vm) => {
            {
              return defaultDateFormatter(date, vm);
            }
          }
        },
        dateParser: {
          type: Function,
          default: (date, vm) => {
            {
              return defaultDateParser(date, vm);
            }
          }
        },
        dateCreator: {
          type: Function,
          default: () => {
            {
              return /* @__PURE__ */ new Date();
            }
          }
        },
        mobileNative: {
          type: Boolean,
          default: () => config.defaultDatepickerMobileNative
        },
        position: String,
        iconRight: String,
        iconRightClickable: Boolean,
        events: Array,
        indicators: {
          type: String,
          default: "dots"
        },
        openOnFocus: Boolean,
        iconPrev: {
          type: String,
          default: () => config.defaultIconPrev
        },
        iconNext: {
          type: String,
          default: () => config.defaultIconNext
        },
        yearsRange: {
          type: Array,
          default: () => config.defaultDatepickerYearsRange
        },
        type: {
          type: String,
          validator: (value) => {
            return [
              "month"
            ].indexOf(value) >= 0;
          }
        },
        nearbyMonthDays: {
          type: Boolean,
          default: () => config.defaultDatepickerNearbyMonthDays
        },
        nearbySelectableMonthDays: {
          type: Boolean,
          default: () => config.defaultDatepickerNearbySelectableMonthDays
        },
        showWeekNumber: {
          type: Boolean,
          default: () => config.defaultDatepickerShowWeekNumber
        },
        weekNumberClickable: {
          type: Boolean,
          default: () => config.defaultDatepickerWeekNumberClickable
        },
        rulesForFirstWeek: {
          type: Number,
          default: () => 4
        },
        range: {
          type: Boolean,
          default: false
        },
        closeOnClick: {
          type: Boolean,
          default: true
        },
        multiple: {
          type: Boolean,
          default: false
        },
        mobileModal: {
          type: Boolean,
          default: () => config.defaultDatepickerMobileModal
        },
        focusable: {
          type: Boolean,
          default: true
        },
        trapFocus: {
          type: Boolean,
          default: () => config.defaultTrapFocus
        },
        appendToBody: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "active-change": (_active) => true,
        "change-month": (_month) => true,
        "change-year": (_year) => true,
        "icon-right-click": (_event) => true,
        "range-end": (_date) => true,
        "range-start": (_date) => true,
        "update:modelValue": (_value) => true,
        "week-number-click": (_week, _year) => true
        // emitted by `DatepickerTableRow`
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        const focusedDate = (Array.isArray(this.modelValue) ? this.modelValue[0] : this.modelValue) || this.focusedDate || this.dateCreator();
        if (!this.modelValue && this.maxDate && this.maxDate.getFullYear() < focusedDate.getFullYear()) {
          focusedDate.setFullYear(this.maxDate.getFullYear());
        }
        return {
          dateSelected: this.modelValue,
          focusedDateData: {
            day: focusedDate.getDate(),
            month: focusedDate.getMonth(),
            year: focusedDate.getFullYear()
          },
          _elementRef: "input",
          _isDatepicker: true
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.dateSelected;
          },
          set(value) {
            this.updateInternalState(value);
            if (!this.multiple) this.togglePicker(false);
            this.$emit("update:modelValue", value);
            if (this.useHtml5Validation) {
              this.$nextTick(() => {
                this.checkHtml5Validity();
              });
            }
          }
        },
        formattedValue() {
          return this.formatValue(this.computedValue);
        },
        localeOptions() {
          return new Intl.DateTimeFormat(this.locale, {
            year: "numeric",
            month: "numeric"
          }).resolvedOptions();
        },
        dtf() {
          return new Intl.DateTimeFormat(this.locale);
        },
        dtfMonth() {
          return new Intl.DateTimeFormat(this.locale, {
            year: this.localeOptions.year || "numeric",
            month: this.localeOptions.month || "2-digit"
          });
        },
        newMonthNames() {
          if (Array.isArray(this.monthNames)) {
            return this.monthNames;
          }
          return getMonthNames(this.locale);
        },
        newDayNames() {
          if (Array.isArray(this.dayNames)) {
            return this.dayNames;
          }
          return getWeekdayNames(this.locale);
        },
        listOfMonths() {
          let minMonth = 0;
          let maxMonth = 12;
          if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
            minMonth = this.minDate.getMonth();
          }
          if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
            maxMonth = this.maxDate.getMonth();
          }
          return this.newMonthNames.map((name, index) => {
            return {
              name,
              index,
              disabled: index < minMonth || index > maxMonth
            };
          });
        },
        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
          let latestYear = this.focusedDateData.year + this.yearsRange[1];
          if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
            latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
          }
          let earliestYear = this.focusedDateData.year + this.yearsRange[0];
          if (this.minDate && this.minDate.getFullYear() > earliestYear) {
            earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
          }
          const arrayOfYears = [];
          for (let i = earliestYear; i <= latestYear; i++) {
            arrayOfYears.push(i);
          }
          return arrayOfYears.reverse();
        },
        showPrev() {
          if (!this.minDate) return false;
          if (this.isTypeMonth) {
            return this.focusedDateData.year <= this.minDate.getFullYear();
          }
          const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
          const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
          return dateToCheck <= date;
        },
        showNext() {
          if (!this.maxDate) return false;
          if (this.isTypeMonth) {
            return this.focusedDateData.year >= this.maxDate.getFullYear();
          }
          const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
          const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
          return dateToCheck >= date;
        },
        isMobile() {
          return this.mobileNative && isMobile.any();
        },
        isTypeMonth() {
          return this.type === "month";
        },
        ariaRole() {
          if (!this.inline) {
            return "dialog";
          } else {
            return void 0;
          }
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
        }
      },
      watch: {
        /*
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
          this.updateInternalState(value);
          if (!this.multiple) this.togglePicker(false);
        },
        focusedDate(value) {
          if (value) {
            this.focusedDateData = {
              day: value.getDate(),
              month: value.getMonth(),
              year: value.getFullYear()
            };
          }
        },
        /*
         * Emit input event on month and/or year change
         */
        "focusedDateData.month"(value) {
          this.$emit("change-month", value);
        },
        "focusedDateData.year"(value) {
          this.$emit("change-year", value);
        }
      },
      methods: {
        /*
         * Parse string into date
         */
        onChange(value) {
          const date = this.dateParser(value, this);
          if (date && (!isNaN(date.valueOf()) || Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1]))) {
            this.computedValue = date;
          } else {
            this.computedValue = null;
            if (this.$refs.input) {
              this.$refs.input.newValue = this.computedValue;
            }
          }
        },
        /*
         * Format date into string
         */
        formatValue(value) {
          if (Array.isArray(value)) {
            const isArrayWithValidDates = Array.isArray(value) && value.every((v) => {
              var _a;
              return !isNaN((_a = v == null ? void 0 : v.valueOf()) != null ? _a : NaN);
            });
            return isArrayWithValidDates ? this.dateFormatter([...value], this) : null;
          }
          return value && !isNaN(value.valueOf()) ? this.dateFormatter(value, this) : null;
        },
        /*
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December) or decrement year when 'month'
         */
        prev() {
          if (this.disabled) return;
          if (this.isTypeMonth) {
            this.focusedDateData.year -= 1;
          } else {
            if (this.focusedDateData.month > 0) {
              this.focusedDateData.month -= 1;
            } else {
              this.focusedDateData.month = 11;
              this.focusedDateData.year -= 1;
            }
          }
        },
        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January) or increment year when 'month'
         */
        next() {
          if (this.disabled) return;
          if (this.isTypeMonth) {
            this.focusedDateData.year += 1;
          } else {
            if (this.focusedDateData.month < 11) {
              this.focusedDateData.month += 1;
            } else {
              this.focusedDateData.month = 0;
              this.focusedDateData.year += 1;
            }
          }
        },
        formatNative(value) {
          return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
        },
        /*
         * Format date into string 'YYYY-MM-DD'
         */
        formatYYYYMMDD(value) {
          const date = new Date(value);
          if (value && !isNaN(date.valueOf())) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day);
          }
          return "";
        },
        /*
         * Format date into string 'YYYY-MM'
         */
        formatYYYYMM(value) {
          const date = new Date(value);
          if (value && !isNaN(date.valueOf())) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return year + "-" + ((month < 10 ? "0" : "") + month);
          }
          return "";
        },
        /*
         * Parse date from string
         */
        onChangeNativePicker(event) {
          const date = event.target.value;
          const s = date ? date.split("-") : [];
          if (s.length === 3) {
            const year = parseInt(s[0], 10);
            const month = parseInt(s[1]) - 1;
            const day = parseInt(s[2]);
            this.computedValue = new Date(year, month, day);
          } else {
            this.computedValue = null;
          }
        },
        updateInternalState(value) {
          if (this.dateSelected === value) return;
          const isArray = Array.isArray(value);
          const currentDate = isArray ? !value.length ? this.dateCreator() : value[value.length - 1] : !value ? this.dateCreator() : value;
          if (!isArray || this.dateSelected && value.length > this.dateSelected.length) {
            this.focusedDateData = {
              day: currentDate.getDate(),
              month: currentDate.getMonth(),
              year: currentDate.getFullYear()
            };
          }
          this.dateSelected = value;
        },
        /*
         * Toggle datepicker
         */
        togglePicker(active) {
          if (this.$refs.dropdown) {
            const isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
            if (isActive) {
              this.$refs.dropdown.isActive = isActive;
            } else if (this.closeOnClick) {
              this.$refs.dropdown.isActive = isActive;
            }
          }
        },
        /*
         * Call default onFocus method and show datepicker
         */
        handleOnFocus(event) {
          this.onFocus(event);
          if (this.openOnFocus) {
            this.togglePicker(true);
          }
        },
        /*
         * Toggle dropdown
         */
        toggle() {
          if (this.mobileNative && this.isMobile) {
            const input = this.$refs.input.$refs.input;
            input.focus();
            input.click();
            return;
          }
          this.$refs.dropdown.toggle();
        },
        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
          if (this.$refs.dropdown.isActive) {
            event.stopPropagation();
          }
        },
        /*
         * Keypress event that is bound to the document.
         */
        keyPress({ key }) {
          if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
            this.togglePicker(false);
          }
        },
        /*
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
          if (!value) {
            this.onBlur();
          }
          this.$emit("active-change", value);
        },
        changeFocus(day) {
          this.focusedDateData = {
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear()
          };
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
        }
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
        }
      }
    });

    const _hoisted_1 = { class: "datepicker-header" };
    const _hoisted_2 = ["disabled", "aria-label"];
    const _hoisted_3 = ["disabled", "aria-label"];
    const _hoisted_4 = { class: "pagination-list" };
    const _hoisted_5 = ["value", "disabled"];
    const _hoisted_6 = ["value"];
    const _hoisted_7 = { key: 1 };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_input = vue.resolveComponent("b-input");
      const _component_b_icon = vue.resolveComponent("b-icon");
      const _component_b_select = vue.resolveComponent("b-select");
      const _component_b_field = vue.resolveComponent("b-field");
      const _component_b_datepicker_table = vue.resolveComponent("b-datepicker-table");
      const _component_b_datepicker_month = vue.resolveComponent("b-datepicker-month");
      const _component_b_dropdown_item = vue.resolveComponent("b-dropdown-item");
      const _component_b_dropdown = vue.resolveComponent("b-dropdown");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["datepicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]]
        }, _ctx.rootAttrs),
        [
          !_ctx.isMobile || _ctx.inline ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
            key: 0,
            ref: "dropdown",
            position: _ctx.position,
            disabled: _ctx.disabledOrUndefined,
            inline: _ctx.inline,
            "mobile-modal": _ctx.mobileModal,
            "trap-focus": _ctx.trapFocus,
            "aria-role": _ctx.ariaRole,
            "append-to-body": _ctx.appendToBody,
            "append-to-body-copy-parent": "",
            onActiveChange: _ctx.onActiveChange,
            "trigger-tabindex": -1
          }, vue.createSlots({
            default: vue.withCtx(() => [
              vue.createVNode(_component_b_dropdown_item, {
                disabled: _ctx.disabledOrUndefined,
                focusable: _ctx.focusable,
                custom: "",
                class: vue.normalizeClass({ "dropdown-horizontal-timepicker": _ctx.horizontalTimePicker })
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", null, [
                    vue.createElementVNode("header", _hoisted_1, [
                      _ctx.$slots.header !== void 0 && _ctx.$slots.header([]).length ? vue.renderSlot(_ctx.$slots, "header", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                        "div",
                        {
                          key: 1,
                          class: vue.normalizeClass(["pagination field is-centered", _ctx.size])
                        },
                        [
                          vue.withDirectives(vue.createElementVNode("a", {
                            class: "pagination-previous",
                            role: "button",
                            href: "#",
                            disabled: _ctx.disabledOrUndefined,
                            "aria-label": _ctx.ariaPreviousLabel,
                            onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"])),
                            onKeydown: [
                              _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["enter"])),
                              _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["space"]))
                            ]
                          }, [
                            vue.createVNode(_component_b_icon, {
                              icon: _ctx.iconPrev,
                              pack: _ctx.iconPack,
                              both: "",
                              type: "is-primary is-clickable"
                            }, null, 8, ["icon", "pack"])
                          ], 40, _hoisted_2), [
                            [vue.vShow, !_ctx.showPrev && !_ctx.disabled]
                          ]),
                          vue.withDirectives(vue.createElementVNode("a", {
                            class: "pagination-next",
                            role: "button",
                            href: "#",
                            disabled: _ctx.disabledOrUndefined,
                            "aria-label": _ctx.ariaNextLabel,
                            onClick: _cache[6] || (_cache[6] = vue.withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"])),
                            onKeydown: [
                              _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["enter"])),
                              _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["space"]))
                            ]
                          }, [
                            vue.createVNode(_component_b_icon, {
                              icon: _ctx.iconNext,
                              pack: _ctx.iconPack,
                              both: "",
                              type: "is-primary is-clickable"
                            }, null, 8, ["icon", "pack"])
                          ], 40, _hoisted_3), [
                            [vue.vShow, !_ctx.showNext && !_ctx.disabled]
                          ]),
                          vue.createElementVNode("div", _hoisted_4, [
                            vue.createVNode(_component_b_field, null, {
                              default: vue.withCtx(() => [
                                !_ctx.isTypeMonth ? (vue.openBlock(), vue.createBlock(_component_b_select, {
                                  key: 0,
                                  modelValue: _ctx.focusedDateData.month,
                                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.focusedDateData.month = $event),
                                  disabled: _ctx.disabledOrUndefined,
                                  size: _ctx.size
                                }, {
                                  default: vue.withCtx(() => [
                                    (vue.openBlock(true), vue.createElementBlock(
                                      vue.Fragment,
                                      null,
                                      vue.renderList(_ctx.listOfMonths, (month) => {
                                        return vue.openBlock(), vue.createElementBlock("option", {
                                          value: month.index,
                                          key: month.name,
                                          disabled: month.disabled || void 0
                                        }, vue.toDisplayString(month.name), 9, _hoisted_5);
                                      }),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["modelValue", "disabled", "size"])) : vue.createCommentVNode("v-if", true),
                                vue.createVNode(_component_b_select, {
                                  modelValue: _ctx.focusedDateData.year,
                                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.focusedDateData.year = $event),
                                  disabled: _ctx.disabledOrUndefined,
                                  size: _ctx.size
                                }, {
                                  default: vue.withCtx(() => [
                                    (vue.openBlock(true), vue.createElementBlock(
                                      vue.Fragment,
                                      null,
                                      vue.renderList(_ctx.listOfYears, (year) => {
                                        return vue.openBlock(), vue.createElementBlock("option", {
                                          value: year,
                                          key: year
                                        }, vue.toDisplayString(year), 9, _hoisted_6);
                                      }),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["modelValue", "disabled", "size"])
                              ]),
                              _: 1
                              /* STABLE */
                            })
                          ])
                        ],
                        2
                        /* CLASS */
                      ))
                    ]),
                    !_ctx.isTypeMonth ? (vue.openBlock(), vue.createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: vue.normalizeClass(["datepicker-content", { "content-horizontal-timepicker": _ctx.horizontalTimePicker }])
                      },
                      [
                        vue.createVNode(_component_b_datepicker_table, {
                          modelValue: _ctx.computedValue,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.computedValue = $event),
                          "day-names": _ctx.newDayNames,
                          "month-names": _ctx.newMonthNames,
                          "first-day-of-week": _ctx.firstDayOfWeek,
                          "rules-for-first-week": _ctx.rulesForFirstWeek,
                          "min-date": _ctx.minDate,
                          "max-date": _ctx.maxDate,
                          focused: _ctx.focusedDateData,
                          disabled: _ctx.disabledOrUndefined,
                          "unselectable-dates": _ctx.unselectableDates,
                          "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                          "selectable-dates": _ctx.selectableDates,
                          events: _ctx.events,
                          indicators: _ctx.indicators,
                          "date-creator": _ctx.dateCreator,
                          "type-month": _ctx.isTypeMonth,
                          "nearby-month-days": _ctx.nearbyMonthDays,
                          "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
                          "show-week-number": _ctx.showWeekNumber,
                          "week-number-clickable": _ctx.weekNumberClickable,
                          range: _ctx.range,
                          multiple: _ctx.multiple,
                          onRangeStart: _cache[12] || (_cache[12] = (date) => _ctx.$emit("range-start", date)),
                          onRangeEnd: _cache[13] || (_cache[13] = (date) => _ctx.$emit("range-end", date)),
                          onClose: _cache[14] || (_cache[14] = ($event) => _ctx.togglePicker(false)),
                          "onUpdate:focused": _cache[15] || (_cache[15] = ($event) => _ctx.focusedDateData = $event)
                        }, null, 8, ["modelValue", "day-names", "month-names", "first-day-of-week", "rules-for-first-week", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "type-month", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "range", "multiple"])
                      ],
                      2
                      /* CLASS */
                    )) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                      vue.createVNode(_component_b_datepicker_month, {
                        modelValue: _ctx.computedValue,
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.computedValue = $event),
                        "month-names": _ctx.newMonthNames,
                        "min-date": _ctx.minDate,
                        "max-date": _ctx.maxDate,
                        focused: _ctx.focusedDateData,
                        disabled: _ctx.disabledOrUndefined,
                        "unselectable-dates": _ctx.unselectableDates,
                        "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                        "selectable-dates": _ctx.selectableDates,
                        events: _ctx.events,
                        indicators: _ctx.indicators,
                        "date-creator": _ctx.dateCreator,
                        range: _ctx.range,
                        multiple: _ctx.multiple,
                        onRangeStart: _cache[17] || (_cache[17] = (date) => _ctx.$emit("range-start", date)),
                        onRangeEnd: _cache[18] || (_cache[18] = (date) => _ctx.$emit("range-end", date)),
                        onClose: _cache[19] || (_cache[19] = ($event) => _ctx.togglePicker(false)),
                        onChangeFocus: _ctx.changeFocus,
                        "onUpdate:focused": _cache[20] || (_cache[20] = ($event) => _ctx.focusedDateData = $event)
                      }, null, 8, ["modelValue", "month-names", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "range", "multiple", "onChangeFocus"])
                    ]))
                  ]),
                  _ctx.$slots.default !== void 0 && _ctx.$slots.default([]).length ? (vue.openBlock(), vue.createElementBlock(
                    "footer",
                    {
                      key: 0,
                      class: vue.normalizeClass(["datepicker-footer", { "footer-horizontal-timepicker": _ctx.horizontalTimePicker }])
                    },
                    [
                      vue.renderSlot(_ctx.$slots, "default")
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["disabled", "focusable", "class"])
            ]),
            _: 2
            /* DYNAMIC */
          }, [
            !_ctx.inline ? {
              name: "trigger",
              fn: vue.withCtx((props) => [
                vue.renderSlot(_ctx.$slots, "trigger", vue.normalizeProps(vue.guardReactiveProps(props)), () => [
                  vue.createVNode(_component_b_input, vue.mergeProps({
                    ref: "input",
                    autocomplete: "off",
                    "model-value": _ctx.formattedValue,
                    placeholder: _ctx.placeholder,
                    size: _ctx.size,
                    icon: _ctx.icon,
                    "icon-right": _ctx.iconRight,
                    "icon-right-clickable": _ctx.iconRightClickable,
                    "icon-pack": _ctx.iconPack,
                    rounded: _ctx.rounded,
                    loading: _ctx.loading,
                    disabled: _ctx.disabledOrUndefined,
                    readonly: !_ctx.editable
                  }, _ctx.fallthroughAttrs, {
                    "use-html5-validation": false,
                    onClick: _ctx.onInputClick,
                    onIconRightClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("icon-right-click", $event)),
                    onKeyup: _cache[1] || (_cache[1] = vue.withKeys(($event) => _ctx.togglePicker(true), ["enter"])),
                    onChange: _cache[2] || (_cache[2] = ($event) => _ctx.onChange($event.target.value)),
                    onFocus: _ctx.handleOnFocus
                  }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-right", "icon-right-clickable", "icon-pack", "rounded", "loading", "disabled", "readonly", "onClick", "onFocus"])
                ])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "append-to-body", "onActiveChange"])) : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
            key: 1,
            ref: "input",
            type: !_ctx.isTypeMonth ? "date" : "month",
            autocomplete: "off",
            "model-value": _ctx.formatNative(_ctx.computedValue),
            placeholder: _ctx.placeholder,
            size: _ctx.size,
            icon: _ctx.icon,
            "icon-pack": _ctx.iconPack,
            rounded: _ctx.rounded,
            loading: _ctx.loading,
            max: _ctx.formatNative(_ctx.maxDate),
            min: _ctx.formatNative(_ctx.minDate),
            disabled: _ctx.disabledOrUndefined,
            readonly: false
          }, _ctx.fallthroughAttrs, {
            "use-html5-validation": false,
            onChange: _ctx.onChangeNativePicker,
            onFocus: _ctx.onFocus,
            onBlur: _ctx.onBlur
          }), null, 16, ["type", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "onChange", "onFocus", "onBlur"]))
        ],
        16
        /* FULL_PROPS */
      );
    }
    var Datepicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Datepicker);
      }
    };

    exports.BDatepicker = Datepicker;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
