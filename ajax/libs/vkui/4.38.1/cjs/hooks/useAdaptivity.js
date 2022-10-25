"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityIsDesktop = exports.useAdaptivity = void 0;

var React = _interopRequireWildcard(require("react"));

var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");

var _usePlatform = require("./usePlatform");

var _platform = require("../lib/platform");

var useAdaptivity = function useAdaptivity() {
  return React.useContext(_AdaptivityContext.AdaptivityContext);
};

exports.useAdaptivity = useAdaptivity;

var useAdaptivityIsDesktop = function useAdaptivityIsDesktop() {
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = useAdaptivity(),
      viewWidth = _useAdaptivity.viewWidth,
      viewHeight = _useAdaptivity.viewHeight,
      hasMouse = _useAdaptivity.hasMouse;

  return viewWidth >= _AdaptivityContext.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _AdaptivityContext.ViewHeight.MEDIUM) || platform === _platform.VKCOM;
};

exports.useAdaptivityIsDesktop = useAdaptivityIsDesktop;
//# sourceMappingURL=useAdaptivity.js.map