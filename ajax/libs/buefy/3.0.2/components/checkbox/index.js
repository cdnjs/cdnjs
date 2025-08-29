/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Checkbox = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var CheckRadioMixin = vue.defineComponent({
      props: {
        modelValue: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
      },
      emits: {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        "update:modelValue": (value) => true
      },
      data() {
        return {
          newValue: this.modelValue
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.newValue;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set(value) {
            this.newValue = value;
            this.$emit("update:modelValue", value);
          }
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
        },
        requiredOrUndefined() {
          return this.required || void 0;
        }
      },
      watch: {
        /*
        * When v-model change, set internal value.
        */
        modelValue(value) {
          this.newValue = value;
        }
      },
      methods: {
        focus() {
          this.$refs.input.focus();
        }
      }
    });

    var _sfc_main$1 = vue.defineComponent({
      name: "BCheckbox",
      mixins: [CheckRadioMixin],
      props: {
        indeterminate: Boolean,
        ariaLabelledby: String,
        trueValue: {
          type: [String, Number, Boolean, Function, Object, Array],
          default: true
        },
        falseValue: {
          type: [String, Number, Boolean, Function, Object, Array],
          default: false
        },
        autocomplete: {
          type: String,
          default: "on"
        },
        inputId: {
          type: String,
          default: ""
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

    const _hoisted_1$1 = ["disabled"];
    const _hoisted_2$1 = ["id", ".indeterminate", "autocomplete", "disabled", "required", "name", "value", "true-value", "false-value", "aria-labelledby"];
    const _hoisted_3 = ["id"];
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("label", {
        class: vue.normalizeClass(["b-checkbox checkbox", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: [
          _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
          _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["space"]))
        ]
      }, [
        vue.createCommentVNode(" Checkbox needs to listen for a space event instead of a just a\n             click and enter event so that that using the keyboard spacebar will also\n             trigger the checkbox change in the b-table "),
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          id: _ctx.inputId,
          ".indeterminate": _ctx.indeterminate,
          type: "checkbox",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"])),
          autocomplete: _ctx.autocomplete,
          disabled: _ctx.disabledOrUndefined,
          required: _ctx.requiredOrUndefined,
          name: _ctx.name,
          value: _ctx.nativeValue,
          "true-value": _ctx.trueValue,
          "false-value": _ctx.falseValue,
          "aria-labelledby": _ctx.ariaLabelledby
        }, null, 40, _hoisted_2$1), [
          [vue.vModelCheckbox, _ctx.computedValue]
        ]),
        vue.createElementVNode(
          "span",
          {
            class: vue.normalizeClass(["check", _ctx.type])
          },
          null,
          2
          /* CLASS */
        ),
        vue.createElementVNode("span", {
          id: _ctx.ariaLabelledby,
          class: "control-label"
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 8, _hoisted_3)
      ], 42, _hoisted_1$1);
    }
    var Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    var _sfc_main = vue.defineComponent({
      name: "BCheckboxButton",
      mixins: [CheckRadioMixin],
      props: {
        type: {
          type: String,
          default: "is-primary"
        },
        expanded: Boolean
      },
      data() {
        return {
          isFocused: false
        };
      },
      computed: {
        checked() {
          if (Array.isArray(this.newValue)) {
            return this.newValue.indexOf(this.nativeValue) >= 0;
          }
          return this.newValue === this.nativeValue;
        }
      }
    });

    const _hoisted_1 = ["disabled"];
    const _hoisted_2 = ["disabled", "required", "name", "value"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["control", { "is-expanded": _ctx.expanded }])
        },
        [
          vue.createElementVNode("label", {
            class: vue.normalizeClass(["b-checkbox checkbox button", [_ctx.checked ? _ctx.type : null, _ctx.size, {
              "is-disabled": _ctx.disabled,
              "is-focused": _ctx.isFocused
            }]]),
            ref: "label",
            disabled: _ctx.disabledOrUndefined,
            onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
            onKeydown: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
          }, [
            vue.renderSlot(_ctx.$slots, "default"),
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
              type: "checkbox",
              ref: "input",
              onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
              }, ["stop"])),
              disabled: _ctx.disabledOrUndefined,
              required: _ctx.requiredOrUndefined,
              name: _ctx.name,
              value: _ctx.nativeValue,
              onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = true),
              onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.isFocused = false)
            }, null, 40, _hoisted_2), [
              [vue.vModelCheckbox, _ctx.computedValue]
            ])
          ], 42, _hoisted_1)
        ],
        2
        /* CLASS */
      );
    }
    var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Checkbox);
        registerComponent(Vue, CheckboxButton);
      }
    };

    exports.BCheckbox = Checkbox;
    exports.BCheckboxButton = CheckboxButton;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
