"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragPreviewImage = void 0;

var _react = require("react");

/**
 * A utility for rendering a drag preview image
 */
var DragPreviewImage = (0, _react.memo)(function DragPreviewImage(_ref) {
  var connect = _ref.connect,
      src = _ref.src;
  (0, _react.useEffect)(function () {
    if (typeof Image === 'undefined') return;
    var connected = false;
    var img = new Image();
    img.src = src;

    img.onload = function () {
      connect(img);
      connected = true;
    };

    return function () {
      if (connected) {
        connect(null);
      }
    };
  });
  return null;
});
exports.DragPreviewImage = DragPreviewImage;