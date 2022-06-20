"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcMin = exports.calcMax = void 0;

var calcMin = function calcMin(_ref) {
  var _ref$containerWidth = _ref.containerWidth,
      containerWidth = _ref$containerWidth === void 0 ? 0 : _ref$containerWidth,
      _ref$layerWidth = _ref.layerWidth,
      layerWidth = _ref$layerWidth === void 0 ? 0 : _ref$layerWidth,
      _ref$slides = _ref.slides,
      slides = _ref$slides === void 0 ? [] : _ref$slides,
      _ref$viewporOffsettWi = _ref.viewporOffsettWidth,
      viewporOffsettWidth = _ref$viewporOffsettWi === void 0 ? 0 : _ref$viewporOffsettWi,
      align = _ref.align,
      isCenterWithCustomWidth = _ref.isCenterWithCustomWidth;

  switch (align) {
    case "left":
      return containerWidth - layerWidth;

    case "right":
      return viewporOffsettWidth - layerWidth;

    case "center":
      if (isCenterWithCustomWidth && slides.length) {
        var _slides = slides[slides.length - 1],
            coordX = _slides.coordX,
            width = _slides.width;
        return viewporOffsettWidth / 2 - coordX - width / 2;
      } else {
        return viewporOffsettWidth - (containerWidth - viewporOffsettWidth) / 2 - layerWidth;
      }

  }

  return undefined;
};

exports.calcMin = calcMin;

var calcMax = function calcMax(_ref2) {
  var _ref2$slides = _ref2.slides,
      slides = _ref2$slides === void 0 ? [] : _ref2$slides,
      _ref2$viewporOffsettW = _ref2.viewporOffsettWidth,
      viewporOffsettWidth = _ref2$viewporOffsettW === void 0 ? 0 : _ref2$viewporOffsettW,
      isCenterWithCustomWidth = _ref2.isCenterWithCustomWidth;

  if (isCenterWithCustomWidth && slides.length) {
    var _slides$ = slides[0],
        width = _slides$.width,
        coordX = _slides$.coordX;
    return viewporOffsettWidth / 2 - coordX - width / 2;
  }

  return 0;
};

exports.calcMax = calcMax;
//# sourceMappingURL=helpers.js.map