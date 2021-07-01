"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransitionProps = getTransitionProps;
exports.reflow = void 0;

const reflow = node => node.scrollTop;

exports.reflow = reflow;

function getTransitionProps(props, options) {
  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: style.transitionDuration || typeof timeout === 'number' ? timeout : timeout[options.mode] || 0,
    easing: style.transitionTimingFunction || typeof easing === 'object' ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}