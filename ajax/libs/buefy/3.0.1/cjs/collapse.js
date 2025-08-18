'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var plugins = require('./plugins-DbyYGVpp.js');

const COLLAPSE_POSITIONS = ["is-top", "is-bottom"];
var _sfc_main = vue.defineComponent({
  name: "BCollapse",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: "fade"
    },
    ariaId: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "is-top",
      validator(value) {
        return COLLAPSE_POSITIONS.indexOf(value) > -1;
      }
    }
  },
  emits: {
    close: () => true,
    open: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      isOpen: this.modelValue
    };
  },
  watch: {
    modelValue(value) {
      this.isOpen = value;
    }
  },
  methods: {
    /*
    * Toggle and emit events
    */
    toggle() {
      this.isOpen = !this.isOpen;
      this.$emit("update:modelValue", this.isOpen);
      this.isOpen ? this.$emit("open") : this.$emit("close");
    }
  },
  render() {
    const trigger = vue.h(
      "div",
      {
        class: "collapse-trigger",
        onClick: this.toggle
      },
      this.$slots.trigger ? this.$slots.trigger({ open: this.isOpen }) : void 0
    );
    const content = vue.withDirectives(
      vue.h(
        vue.Transition,
        { name: this.animation },
        () => [
          vue.h(
            "div",
            {
              class: "collapse-content",
              id: this.ariaId
            },
            this.$slots
          )
        ]
      ),
      [[vue.vShow, this.isOpen]]
    );
    return vue.h(
      "div",
      { class: "collapse" },
      this.position === "is-top" ? [trigger, content] : [content, trigger]
    );
  }
});

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, _sfc_main);
  }
};

exports.BCollapse = _sfc_main;
exports.default = Plugin;
