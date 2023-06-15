"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gallery = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _useTimeout = require("../../hooks/useTimeout");
var _BaseGallery = require("../BaseGallery/BaseGallery");
var _excluded = ["initialSlideIndex", "children", "timeout", "onChange", "bullets"];
/**
 * @see https://vkcom.github.io/VKUI/#/Gallery
 */
var Gallery = function Gallery(_ref) {
  var _props$slideIndex;
  var _ref$initialSlideInde = _ref.initialSlideIndex,
    initialSlideIndex = _ref$initialSlideInde === void 0 ? 0 : _ref$initialSlideInde,
    children = _ref.children,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 0 : _ref$timeout,
    onChange = _ref.onChange,
    bullets = _ref.bullets,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useState = React.useState(initialSlideIndex),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    localSlideIndex = _React$useState2[0],
    setSlideIndex = _React$useState2[1];
  var isControlled = typeof props.slideIndex === 'number';
  var slideIndex = isControlled ? (_props$slideIndex = props.slideIndex) !== null && _props$slideIndex !== void 0 ? _props$slideIndex : 0 : localSlideIndex;
  var isDraggable = !isControlled || Boolean(onChange);
  var slides = React.useMemo(function () {
    return React.Children.toArray(children).filter(function (item) {
      return Boolean(item);
    });
  }, [children]);
  var childCount = slides.length;
  var handleChange = React.useCallback(function (current) {
    if (current === slideIndex) {
      return;
    }
    !isControlled && setSlideIndex(current);
    onChange && onChange(current);
  }, [isControlled, onChange, slideIndex]);
  var autoplay = (0, _useTimeout.useTimeout)(function () {
    return handleChange((slideIndex + 1) % childCount);
  }, timeout);
  React.useEffect(function () {
    return timeout ? autoplay.set() : autoplay.clear();
  }, [timeout, slideIndex, autoplay]);

  // prevent invalid slideIndex
  // any slide index is invalid with no slides, just keep it as is
  var safeSlideIndex = childCount > 0 ? (0, _math.clamp)(slideIndex, 0, childCount - 1) : slideIndex;
  // notify parent in controlled mode
  React.useEffect(function () {
    if (onChange && safeSlideIndex !== slideIndex) {
      onChange(safeSlideIndex);
    }
    setSlideIndex(safeSlideIndex);
  }, [onChange, safeSlideIndex, slideIndex]);
  return /*#__PURE__*/React.createElement(_BaseGallery.BaseGallery, (0, _extends2.default)({
    isDraggable: isDraggable
  }, props, {
    bullets: childCount > 0 && bullets,
    slideIndex: safeSlideIndex,
    onChange: handleChange
  }), slides);
};
exports.Gallery = Gallery;
//# sourceMappingURL=Gallery.js.map