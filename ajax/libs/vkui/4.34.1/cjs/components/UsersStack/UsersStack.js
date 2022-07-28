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

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _Footnote = require("../Typography/Footnote/Footnote");

var _Caption = require("../Typography/Caption/Caption");

var _masks = require("./masks");

var _dom = require("../../lib/dom");

var _excluded = ["photos", "visibleCount", "size", "layout", "children"];

/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */
var UsersStack = function UsersStack(_ref) {
  var _ref$photos = _ref.photos,
      photos = _ref$photos === void 0 ? [] : _ref$photos,
      _ref$visibleCount = _ref.visibleCount,
      visibleCount = _ref$visibleCount === void 0 ? 3 : _ref$visibleCount,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$layout = _ref.layout,
      layout = _ref$layout === void 0 ? "horizontal" : _ref$layout,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    (0, _masks.createMasks)(document);
  }, [document]);
  var othersCount = Math.max(0, photos.length - visibleCount);
  var canShowOthers = othersCount > 0 && size !== "xs";
  var CounterTypography = size === "m" ? _Footnote.Footnote : _Caption.Caption;
  var photoSize = {
    xs: 16,
    s: 24,
    m: 32
  }[size];
  var directionClip = canShowOthers ? "right" : "left";
  var photosShown = photos.slice(0, visibleCount);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("UsersStack", "UsersStack--size-".concat(size), "UsersStack--l-".concat(layout), canShowOthers && "UsersStack--others")
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "UsersStack__photos",
    role: "presentation"
  }, photosShown.map(function (photo, i) {
    var direction = i === 0 && !canShowOthers ? "circle" : directionClip;
    var pathHref = "#users_stack_".concat(photoSize, "_").concat(direction);
    var clipPathHref = "url(#users_stack_mask_".concat(photoSize, "_").concat(direction, ")");
    return (0, _jsxRuntime.createScopedElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      vkuiClass: "UsersStack__photo",
      key: i,
      "aria-hidden": true
    }, (0, _jsxRuntime.createScopedElement)("g", {
      clipPath: clipPathHref
    }, (0, _jsxRuntime.createScopedElement)("use", {
      vkuiClass: "UsersStack__fill",
      href: pathHref
    }), (0, _jsxRuntime.createScopedElement)("image", {
      href: photo,
      width: photoSize,
      height: photoSize
    }), (0, _jsxRuntime.createScopedElement)("use", {
      href: pathHref,
      fill: "none",
      stroke: "rgba(0, 0, 0, 0.08)"
    })));
  }), canShowOthers && (0, _jsxRuntime.createScopedElement)(CounterTypography, {
    caps: true,
    weight: "1",
    level: "2" // TODO: remove only level in #2343
    ,
    vkuiClass: "UsersStack__photo UsersStack__photo--others",
    "aria-hidden": true
  }, (0, _jsxRuntime.createScopedElement)("span", null, "+", othersCount))), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    vkuiClass: "UsersStack__text"
  }, children));
};

exports.UsersStack = UsersStack;
//# sourceMappingURL=UsersStack.js.map