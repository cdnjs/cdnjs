import _typeof from "@babel/runtime/helpers/esm/typeof";
export var reflow = function reflow(node) {
  return node.scrollTop;
};
export function getTransitionProps(props, options) {
  var timeout = props.timeout,
      easing = props.easing,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
  return {
    duration: style.transitionDuration || typeof timeout === 'number' ? timeout : timeout[options.mode] || 0,
    easing: style.transitionTimingFunction || _typeof(easing) === 'object' ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}