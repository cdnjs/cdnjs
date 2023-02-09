export var calcMin = function calcMin(_ref) {
  var _ref$containerWidth = _ref.containerWidth,
    containerWidth = _ref$containerWidth === void 0 ? 0 : _ref$containerWidth,
    _ref$layerWidth = _ref.layerWidth,
    layerWidth = _ref$layerWidth === void 0 ? 0 : _ref$layerWidth,
    _ref$slides = _ref.slides,
    slides = _ref$slides === void 0 ? [] : _ref$slides,
    _ref$viewportOffsetWi = _ref.viewportOffsetWidth,
    viewportOffsetWidth = _ref$viewportOffsetWi === void 0 ? 0 : _ref$viewportOffsetWi,
    align = _ref.align,
    isCenterWithCustomWidth = _ref.isCenterWithCustomWidth;
  switch (align) {
    case 'left':
      return containerWidth - layerWidth;
    case 'right':
      return viewportOffsetWidth - layerWidth;
    case 'center':
      if (isCenterWithCustomWidth && slides.length) {
        var _slides = slides[slides.length - 1],
          coordX = _slides.coordX,
          width = _slides.width;
        return viewportOffsetWidth / 2 - coordX - width / 2;
      } else {
        return viewportOffsetWidth - (containerWidth - viewportOffsetWidth) / 2 - layerWidth;
      }
  }
  return undefined;
};
export var calcMax = function calcMax(_ref2) {
  var _ref2$slides = _ref2.slides,
    slides = _ref2$slides === void 0 ? [] : _ref2$slides,
    _ref2$viewportOffsetW = _ref2.viewportOffsetWidth,
    viewportOffsetWidth = _ref2$viewportOffsetW === void 0 ? 0 : _ref2$viewportOffsetW,
    isCenterWithCustomWidth = _ref2.isCenterWithCustomWidth;
  if (isCenterWithCustomWidth && slides.length) {
    var _slides$ = slides[0],
      width = _slides$.width,
      coordX = _slides$.coordX;
    return viewportOffsetWidth / 2 - coordX - width / 2;
  }
  return 0;
};
//# sourceMappingURL=helpers.js.map