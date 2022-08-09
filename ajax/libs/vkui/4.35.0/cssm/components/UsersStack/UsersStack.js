import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["photos", "visibleCount", "size", "layout", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { hasReactNode } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Caption } from "../Typography/Caption/Caption";
import { createMasks } from "./masks";
import { useDOM } from "../../lib/dom";
import "./UsersStack.css";

/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */
export var UsersStack = function UsersStack(_ref) {
  var _ref$photos = _ref.photos,
      photos = _ref$photos === void 0 ? [] : _ref$photos,
      _ref$visibleCount = _ref.visibleCount,
      visibleCount = _ref$visibleCount === void 0 ? 3 : _ref$visibleCount,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$layout = _ref.layout,
      layout = _ref$layout === void 0 ? "horizontal" : _ref$layout,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  useIsomorphicLayoutEffect(function () {
    createMasks(document);
  }, [document]);
  var othersCount = Math.max(0, photos.length - visibleCount);
  var canShowOthers = othersCount > 0 && size !== "xs";
  var CounterTypography = size === "m" ? Footnote : Caption;
  var photoSize = {
    xs: 16,
    s: 24,
    m: 32
  }[size];
  var directionClip = canShowOthers ? "right" : "left";
  var photosShown = photos.slice(0, visibleCount);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("UsersStack", "UsersStack--size-".concat(size), "UsersStack--l-".concat(layout), canShowOthers && "UsersStack--others")
  }), createScopedElement("div", {
    vkuiClass: "UsersStack__photos",
    role: "presentation"
  }, photosShown.map(function (photo, i) {
    var direction = i === 0 && !canShowOthers ? "circle" : directionClip;
    var pathHref = "#users_stack_".concat(photoSize, "_").concat(direction);
    var clipPathHref = "url(#users_stack_mask_".concat(photoSize, "_").concat(direction, ")");
    return createScopedElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      vkuiClass: "UsersStack__photo",
      key: i,
      "aria-hidden": true
    }, createScopedElement("g", {
      clipPath: clipPathHref
    }, createScopedElement("use", {
      vkuiClass: "UsersStack__fill",
      href: pathHref
    }), createScopedElement("image", {
      href: photo,
      width: photoSize,
      height: photoSize
    }), createScopedElement("use", {
      href: pathHref,
      fill: "none",
      stroke: "rgba(0, 0, 0, 0.08)"
    })));
  }), canShowOthers && createScopedElement(CounterTypography, {
    caps: true,
    weight: "1",
    level: "2" // TODO: remove only level in #2343
    ,
    vkuiClass: "UsersStack__photo UsersStack__photo--others",
    "aria-hidden": true
  }, createScopedElement("span", null, "+", othersCount))), hasReactNode(children) && createScopedElement(Footnote, {
    vkuiClass: "UsersStack__text"
  }, children));
};
//# sourceMappingURL=UsersStack.js.map