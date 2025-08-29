/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Switch = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultSwitchRounded: true};

    const Switch$1 = vue.defineComponent({
      name: "BSwitch",
      props: {
        modelValue: [String, Number, Boolean, Function, Object, Array, Date],
        nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
        disabled: Boolean,
        type: String,
        passiveType: String,
        name: String,
        required: Boolean,
        size: String,
        ariaLabelledby: String,
        trueValue: {
          type: [String, Number, Boolean, Function, Object, Array, Date],
          default: true
        },
        falseValue: {
          type: [String, Number, Boolean, Function, Object, Array, Date],
          default: false
        },
        rounded: {
          type: Boolean,
          default: () => {
            return config.defaultSwitchRounded;
          }
        },
        outlined: {
          type: Boolean,
          default: false
        },
        leftLabel: {
          type: Boolean,
          default: false
        }
      },
      emits: ["update:modelValue"],
      data() {
        return {
          newValue: this.modelValue,
          isMouseDown: false
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
        newClass() {
          return [
            this.size,
            {
              "is-disabled": this.disabled,
              "is-rounded": this.rounded,
              "is-outlined": this.outlined,
              "has-left-label": this.leftLabel
            }
          ];
        },
        checkClasses() {
          return [
            { "is-elastic": this.isMouseDown && !this.disabled },
            this.passiveType && `${this.passiveType}-passive`,
            this.type
          ];
        },
        showControlLabel() {
          return !!this.$slots.default;
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
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

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const _hoisted_1 = ["disabled"];
    const _hoisted_2 = ["disabled", "name", "required", "value", "true-value", "false-value", "aria-labelledby"];
    const _hoisted_3 = ["id"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("label", {
        class: vue.normalizeClass(["switch", _ctx.newClass]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
        onMousedown: _cache[4] || (_cache[4] = ($event) => _ctx.isMouseDown = true),
        onMouseup: _cache[5] || (_cache[5] = ($event) => _ctx.isMouseDown = false),
        onMouseout: _cache[6] || (_cache[6] = ($event) => _ctx.isMouseDown = false),
        onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.isMouseDown = false)
      }, [
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "checkbox",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"])),
          disabled: _ctx.disabledOrUndefined,
          name: _ctx.name,
          required: _ctx.required,
          value: _ctx.nativeValue,
          "true-value": _ctx.trueValue,
          "false-value": _ctx.falseValue,
          "aria-labelledby": _ctx.ariaLabelledby
        }, null, 8, _hoisted_2), [
          [vue.vModelCheckbox, _ctx.computedValue]
        ]),
        vue.createElementVNode(
          "span",
          {
            class: vue.normalizeClass(["check", _ctx.checkClasses])
          },
          null,
          2
          /* CLASS */
        ),
        _ctx.showControlLabel ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          id: _ctx.ariaLabelledby,
          class: "control-label"
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 8, _hoisted_3)) : vue.createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    }
    var Switch = /* @__PURE__ */ _export_sfc(Switch$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Switch);
      }
    };

    exports.BSwitch = Switch;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
