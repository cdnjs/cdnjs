import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["initialSlideIndex", "children", "timeout", "onChange", "bullets"];
import * as React from 'react';
import { clamp } from '../../helpers/math';
import { useTimeout } from '../../hooks/useTimeout';
import { BaseGallery } from '../BaseGallery/BaseGallery';
/**
 * @see https://vkcom.github.io/VKUI/#/Gallery
 */
export var Gallery = function Gallery(_ref) {
  var _props$slideIndex;
  var _ref$initialSlideInde = _ref.initialSlideIndex,
    initialSlideIndex = _ref$initialSlideInde === void 0 ? 0 : _ref$initialSlideInde,
    children = _ref.children,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 0 : _ref$timeout,
    onChange = _ref.onChange,
    bullets = _ref.bullets,
    props = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = React.useState(initialSlideIndex),
    _React$useState2 = _slicedToArray(_React$useState, 2),
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
  var autoplay = useTimeout(function () {
    return handleChange((slideIndex + 1) % childCount);
  }, timeout);
  React.useEffect(function () {
    return timeout ? autoplay.set() : autoplay.clear();
  }, [timeout, slideIndex, autoplay]);

  // prevent invalid slideIndex
  // any slide index is invalid with no slides, just keep it as is
  var safeSlideIndex = childCount > 0 ? clamp(slideIndex, 0, childCount - 1) : slideIndex;
  // notify parent in controlled mode
  React.useEffect(function () {
    if (onChange && safeSlideIndex !== slideIndex) {
      onChange(safeSlideIndex);
    }
    setSlideIndex(safeSlideIndex);
  }, [onChange, safeSlideIndex, slideIndex]);
  return /*#__PURE__*/React.createElement(BaseGallery, _extends({
    isDraggable: isDraggable
  }, props, {
    bullets: childCount > 0 && bullets,
    slideIndex: safeSlideIndex,
    onChange: handleChange
  }), slides);
};
//# sourceMappingURL=Gallery.js.map