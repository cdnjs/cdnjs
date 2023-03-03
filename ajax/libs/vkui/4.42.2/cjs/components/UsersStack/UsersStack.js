"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersStack = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _utils = require("../../lib/utils");
var _classNames = require("../../lib/classNames");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Caption = require("../Typography/Caption/Caption");
var _useId = require("../../hooks/useId");
var _excluded = ["photoSize", "direction"],
  _excluded2 = ["photos", "visibleCount", "count", "size", "layout", "children"];
function PathElement(_ref) {
  var photoSize = _ref.photoSize,
    direction = _ref.direction,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  switch (direction) {
    case "circle":
      var radius = photoSize / 2;
      return (0, _jsxRuntime.createScopedElement)("circle", (0, _extends2.default)({
        cx: radius,
        cy: radius,
        r: radius
      }, props));
    case "right":
      switch (photoSize) {
        case 24:
          return (0, _jsxRuntime.createScopedElement)("path", (0, _extends2.default)({
            d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
          }, props));
        default:
          return (0, _jsxRuntime.createScopedElement)("path", (0, _extends2.default)({
            d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
          }, props));
      }
    default:
      switch (photoSize) {
        case 16:
          return (0, _jsxRuntime.createScopedElement)("path", (0, _extends2.default)({
            d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
          }, props));
        case 24:
          return (0, _jsxRuntime.createScopedElement)("path", (0, _extends2.default)({
            d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
          }, props));
        default:
          return (0, _jsxRuntime.createScopedElement)("path", (0, _extends2.default)({
            d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
          }, props));
      }
  }
}

/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */
var UsersStack = function UsersStack(_ref2) {
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
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var cmpId = (0, _useId.useId)();
  var canShowOthers = count > 0 && size !== "xs";
  var CounterTypography = size === "m" ? _Footnote.Footnote : _Caption.Caption;
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
    return (0, _jsxRuntime.createScopedElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      vkuiClass: "UsersStack__photo",
      key: i,
      "aria-hidden": true
    }, (0, _jsxRuntime.createScopedElement)("defs", null, (0, _jsxRuntime.createScopedElement)(PathElement, {
      id: id,
      direction: direction,
      photoSize: photoSize
    })), (0, _jsxRuntime.createScopedElement)("clipPath", {
      id: maskID
    }, (0, _jsxRuntime.createScopedElement)("use", {
      href: hrefID
    })), (0, _jsxRuntime.createScopedElement)("g", {
      clipPath: "url(#".concat(maskID, ")")
    }, (0, _jsxRuntime.createScopedElement)("use", {
      href: hrefID,
      vkuiClass: "UsersStack__fill"
    }), (0, _jsxRuntime.createScopedElement)("image", {
      href: photo,
      width: photoSize,
      height: photoSize
    }), (0, _jsxRuntime.createScopedElement)("use", {
      href: hrefID,
      fill: "none",
      stroke: "rgba(0, 0, 0, 0.08)"
    })));
  });
  var othersElement = canShowOthers ? (0, _jsxRuntime.createScopedElement)(CounterTypography, {
    caps: true,
    weight: "1",
    level: "2" // TODO: remove only level in #2343
    ,
    vkuiClass: "UsersStack__photo UsersStack__photo--others",
    "aria-hidden": true
  }, (0, _jsxRuntime.createScopedElement)("span", null, "+", count)) : null;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("UsersStack", "UsersStack--size-".concat(size), "UsersStack--l-".concat(layout), canShowOthers && "UsersStack--others")
  }), (photosElements.length > 0 || othersElement) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "UsersStack__photos",
    role: "presentation"
  }, photosElements, othersElement), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    vkuiClass: "UsersStack__text"
  }, children));
};
exports.UsersStack = UsersStack;
//# sourceMappingURL=UsersStack.js.map