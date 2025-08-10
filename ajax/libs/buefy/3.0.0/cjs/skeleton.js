'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var plugins = require('./plugins-DbyYGVpp.js');

const SKELETON_POSITIONS = ["", "is-centered", "is-right"];
const BSkeleton = (props) => {
  if (!props.active) return;
  const items = [];
  const width = props.width;
  const height = props.height;
  for (let i = 0; i < props.count; i++) {
    items.push(vue.h("div", {
      class: [
        "b-skeleton-item",
        { "is-rounded": props.rounded }
      ],
      key: i,
      style: {
        height: height === void 0 ? null : isNaN(+height) ? height : height + "px",
        width: width === void 0 ? null : isNaN(+width) ? width : width + "px",
        borderRadius: props.circle ? "50%" : null
      }
    }));
  }
  return vue.h(
    "div",
    {
      class: [
        "b-skeleton",
        props.size,
        props.position,
        { "is-animated": props.animated }
      ]
    },
    items
  );
};
BSkeleton.props = {
  active: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  width: [Number, String],
  height: [Number, String],
  circle: Boolean,
  rounded: {
    type: Boolean,
    default: true
  },
  count: {
    type: Number,
    default: 1
  },
  position: {
    type: String,
    default: "",
    validator(value) {
      return SKELETON_POSITIONS.indexOf(value) > -1;
    }
  },
  size: String
};

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, BSkeleton, "BSkeleton");
  }
};

exports.BSkeleton = BSkeleton;
exports.default = Plugin;
