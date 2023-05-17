import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["photoSize", "direction"],
  _excluded2 = ["photos", "visibleCount", "count", "size", "layout", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { hasReactNode } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Caption } from "../Typography/Caption/Caption";
import { useId } from "../../hooks/useId";
function PathElement(_ref) {
  var photoSize = _ref.photoSize,
    direction = _ref.direction,
    props = _objectWithoutProperties(_ref, _excluded);
  switch (direction) {
    case "circle":
      var radius = photoSize / 2;
      return createScopedElement("circle", _extends({
        cx: radius,
        cy: radius,
        r: radius
      }, props));
    case "right":
      switch (photoSize) {
        case 24:
          return createScopedElement("path", _extends({
            d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
          }, props));
        default:
          return createScopedElement("path", _extends({
            d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
          }, props));
      }
    default:
      switch (photoSize) {
        case 16:
          return createScopedElement("path", _extends({
            d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
          }, props));
        case 24:
          return createScopedElement("path", _extends({
            d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
          }, props));
        default:
          return createScopedElement("path", _extends({
            d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
          }, props));
      }
  }
}

/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */
export var UsersStack = function UsersStack(_ref2) {
  var _ref2$photos = _ref2.photos,
    photos = _ref2$photos === void 0 ? [] : _ref2$photos,
    _ref2$visibleCount = _ref2.visibleCount,
    visibleCount = _ref2$visibleCount === void 0 ? 3 : _ref2$visibleCount,
    _ref2$count = _ref2.count,
    count = _ref2$count === void 0 ? Math.max(0, photos.length - visibleCount) : _ref2$count,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? "s" : _ref2$size,
    _ref2$layout = _ref2.layout,
    layout = _ref2$layout === void 0 ? "horizontal" : _ref2$layout,
    children = _ref2.children,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  var cmpId = useId();
  var canShowOthers = count > 0 && size !== "xs";
  var CounterTypography = size === "m" ? Footnote : Caption;
  var photoSize = {
    xs: 16,
    s: 24,
    m: 32
  }[size];
  var directionClip = canShowOthers ? "right" : "left";
  var photosElements = photos.slice(0, visibleCount).map(function (photo, i) {
    var direction = i === 0 && !canShowOthers ? "circle" : directionClip;
    var id = "UsersStackDefs".concat(cmpId).concat(i);
    var hrefID = "#".concat(id);
    var maskID = "UsersStackMask".concat(cmpId).concat(i);
    return createScopedElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      vkuiClass: "UsersStack__photo",
      key: i,
      "aria-hidden": true
    }, createScopedElement("defs", null, createScopedElement(PathElement, {
      id: id,
      direction: direction,
      photoSize: photoSize
    })), createScopedElement("clipPath", {
      id: maskID
    }, createScopedElement("use", {
      href: hrefID
    })), createScopedElement("g", {
      clipPath: "url(#".concat(maskID, ")")
    }, createScopedElement("use", {
      href: hrefID,
      vkuiClass: "UsersStack__fill"
    }), createScopedElement("image", {
      href: photo,
      width: photoSize,
      height: photoSize
    }), createScopedElement("use", {
      href: hrefID,
      fill: "none",
      stroke: "rgba(0, 0, 0, 0.08)"
    })));
  });
  var othersElement = canShowOthers ? createScopedElement(CounterTypography, {
    caps: true,
    weight: "1",
    level: "2" // TODO: remove only level in #2343
    ,
    vkuiClass: "UsersStack__photo UsersStack__photo--others",
    "aria-hidden": true
  }, createScopedElement("span", null, "+", count)) : null;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("UsersStack", "UsersStack--size-".concat(size), "UsersStack--l-".concat(layout), canShowOthers && "UsersStack--others")
  }), (photosElements.length > 0 || othersElement) && createScopedElement("div", {
    vkuiClass: "UsersStack__photos",
    role: "presentation"
  }, photosElements, othersElement), hasReactNode(children) && createScopedElement(Footnote, {
    vkuiClass: "UsersStack__text"
  }, children));
};
//# sourceMappingURL=UsersStack.js.map