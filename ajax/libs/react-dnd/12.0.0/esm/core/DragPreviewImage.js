import { useEffect, memo } from 'react';
/**
 * A utility for rendering a drag preview image
 */

export var DragPreviewImage = memo(function DragPreviewImage(_ref) {
  var connect = _ref.connect,
      src = _ref.src;
  useEffect(function () {
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