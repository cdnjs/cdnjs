import { isHTMLElement } from "./instanceOf.js";
var round = Math.round;
export default function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    // Fallback to 1 in case both values are `0`

    if (offsetWidth > 0) {
      scaleX = rect.width / offsetWidth || 1;
    }

    if (offsetHeight > 0) {
      scaleY = rect.height / offsetHeight || 1;
    }
  }

  return {
    width: round(rect.width / scaleX),
    height: round(rect.height / scaleY),
    top: round(rect.top / scaleY),
    right: round(rect.right / scaleX),
    bottom: round(rect.bottom / scaleY),
    left: round(rect.left / scaleX),
    x: round(rect.left / scaleX),
    y: round(rect.top / scaleY)
  };
}