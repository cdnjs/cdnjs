"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptivityContext = exports.ViewHeight = exports.ViewWidth = exports.SizeType = void 0;

var React = _interopRequireWildcard(require("react"));

var SizeType;
exports.SizeType = SizeType;

(function (SizeType) {
  SizeType["COMPACT"] = "compact";
  SizeType["REGULAR"] = "regular";
})(SizeType || (exports.SizeType = SizeType = {}));

var ViewWidth;
exports.ViewWidth = ViewWidth;

(function (ViewWidth) {
  ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
  ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
  ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
  ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
  ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (exports.ViewWidth = ViewWidth = {}));

var ViewHeight;
exports.ViewHeight = ViewHeight;

(function (ViewHeight) {
  ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
  ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
  ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (exports.ViewHeight = ViewHeight = {}));

var AdaptivityContext = /*#__PURE__*/React.createContext({
  sizeX: SizeType.COMPACT,
  sizeY: SizeType.REGULAR
});
exports.AdaptivityContext = AdaptivityContext;
//# sourceMappingURL=AdaptivityContext.js.map