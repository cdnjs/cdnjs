'use strict';

var vue = require('vue');
var config = require('./config-DR826Ki2.js');

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
      default: () => config.config.defaultCompatFallthrough
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

exports.CompatFallthroughMixin = CompatFallthroughMixin;
