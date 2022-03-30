"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _classNames = require("../../lib/classNames");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _Caption = require("../Typography/Caption/Caption");

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _masks = require("./masks");

var _dom = require("../../lib/dom");

var _excluded = ["photos", "visibleCount", "size", "layout", "children"];

var UsersStack = function UsersStack(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var _props$photos = props.photos,
      photos = _props$photos === void 0 ? [] : _props$photos,
      _props$visibleCount = props.visibleCount,
      visibleCount = _props$visibleCount === void 0 ? 0 : _props$visibleCount,
      size = props.size,
      layout = props.layout,
      children = props.children,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    (0, _masks.createMasks)(document);
  }, [document]);
  var othersCount = Math.max(0, photos.length - visibleCount);
  var canShowOthers = othersCount > 0 && size === "m";
  var photosShown = photos.slice(0, visibleCount);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("UsersStack", platform), "UsersStack--size-".concat(size), "UsersStack--l-".concat(layout), {
      "UsersStack--others": canShowOthers
    })
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "UsersStack__photos",
    role: "presentation"
  }, photosShown.map(function (photo, i) {
    return (0, _jsxRuntime.createScopedElement)("div", {
      key: i,
      vkuiClass: "UsersStack__photo",
      style: {
        backgroundImage: "url(".concat(photo, ")")
      }
    });
  }), canShowOthers && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    weight: "1",
    vkuiClass: "UsersStack__photo UsersStack__photo--others",
    "aria-hidden": "true"
  }, (0, _jsxRuntime.createScopedElement)("span", null, "+", othersCount))), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    Component: "span",
    vkuiClass: "UsersStack__text"
  }, children));
};

UsersStack.defaultProps = {
  photos: [],
  size: "s",
  visibleCount: 3,
  layout: "horizontal"
}; // eslint-disable-next-line import/no-default-export

var _default = /*#__PURE__*/React.memo(UsersStack);

exports.default = _default;
//# sourceMappingURL=UsersStack.js.map