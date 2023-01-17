"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersStack = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Caption = require("../Typography/Caption/Caption");
var _useId = require("../../hooks/useId");
var _excluded = ["photoSize", "direction"],
  _excluded2 = ["photos", "visibleCount", "count", "size", "layout", "children", "className"];
function PathElement(_ref) {
  var photoSize = _ref.photoSize,
    direction = _ref.direction,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  switch (direction) {
    case 'circle':
      var radius = photoSize / 2;
      return /*#__PURE__*/React.createElement("circle", (0, _extends2.default)({
        cx: radius,
        cy: radius,
        r: radius
      }, props));
    case 'right':
      switch (photoSize) {
        case 24:
          return /*#__PURE__*/React.createElement("path", (0, _extends2.default)({
            d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
          }, props));
        default:
          return /*#__PURE__*/React.createElement("path", (0, _extends2.default)({
            d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
          }, props));
      }
    default:
      switch (photoSize) {
        case 16:
          return /*#__PURE__*/React.createElement("path", (0, _extends2.default)({
            d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
          }, props));
        case 24:
          return /*#__PURE__*/React.createElement("path", (0, _extends2.default)({
            d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
          }, props));
        default:
          return /*#__PURE__*/React.createElement("path", (0, _extends2.default)({
            d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
          }, props));
      }
  }
}
var photoSizes = {
  s: 16,
  m: 24,
  l: 32
};

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
    size = _ref2$size === void 0 ? 'm' : _ref2$size,
    _ref2$layout = _ref2.layout,
    layout = _ref2$layout === void 0 ? 'horizontal' : _ref2$layout,
    children = _ref2.children,
    className = _ref2.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var cmpId = (0, _useId.useId)();
  var canShowOthers = count > 0 && size !== 's';
  var CounterTypography = size === 'l' ? _Footnote.Footnote : _Caption.Caption;
  var photoSize = photoSizes[size];
  var directionClip = canShowOthers ? 'right' : 'left';
  var photosElements = photos.slice(0, visibleCount).map(function (photo, i) {
    var direction = i === 0 && !canShowOthers ? 'circle' : directionClip;
    var id = "UsersStackDefs".concat(cmpId).concat(i);
    var hrefID = "#".concat(id);
    var maskID = "UsersStackMask".concat(cmpId).concat(i);
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "vkuiUsersStack__photo",
      key: i,
      "aria-hidden": true
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement(PathElement, {
      id: id,
      direction: direction,
      photoSize: photoSize
    })), /*#__PURE__*/React.createElement("clipPath", {
      id: maskID
    }, /*#__PURE__*/React.createElement("use", {
      href: hrefID
    })), /*#__PURE__*/React.createElement("g", {
      clipPath: "url(#".concat(maskID, ")")
    }, /*#__PURE__*/React.createElement("use", {
      href: hrefID,
      className: "vkuiUsersStack__fill"
    }), /*#__PURE__*/React.createElement("image", {
      href: photo,
      width: photoSize,
      height: photoSize
    }), /*#__PURE__*/React.createElement("use", {
      href: hrefID,
      fill: "none",
      stroke: "rgba(0, 0, 0, 0.08)"
    })));
  });
  var othersElement = canShowOthers ? /*#__PURE__*/React.createElement(CounterTypography, {
    caps: true,
    weight: "1",
    className: (0, _vkjs.classNames)("vkuiUsersStack__photo", "vkuiUsersStack__photo--others")
  }, "+", count) : null;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiUsersStack", styles["UsersStack--size-".concat(size)], styles["UsersStack--layout-".concat(layout)], canShowOthers && "vkuiUsersStack--others", className)
  }), (photosElements.length > 0 || othersElement) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiUsersStack__photos",
    role: "presentation"
  }, photosElements, othersElement), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiUsersStack__text"
  }, children));
};
exports.UsersStack = UsersStack;
var styles = {
  "UsersStack--size-s": "vkuiUsersStack--size-s",
  "UsersStack--size-m": "vkuiUsersStack--size-m",
  "UsersStack--size-l": "vkuiUsersStack--size-l",
  "UsersStack--layout-vertical": "vkuiUsersStack--layout-vertical",
  "UsersStack--layout-horizontal": "vkuiUsersStack--layout-horizontal"
};
//# sourceMappingURL=UsersStack.js.map