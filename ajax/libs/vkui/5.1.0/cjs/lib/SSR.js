"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSRWrapper = void 0;
var React = _interopRequireWildcard(require("react"));
var _platform = require("./platform");
var _browser = require("./browser");
var _dom = require("./dom");
var _useObjectMemo = require("../hooks/useObjectMemo");
var _ConfigProviderOverride = require("../components/ConfigProvider/ConfigProviderOverride");
/**
 * @see https://vkcom.github.io/VKUI/#/SSR
 */
var SSRWrapper = function SSRWrapper(_ref) {
  var userAgent = _ref.userAgent,
    browserInfo = _ref.browserInfo,
    children = _ref.children;
  if (!browserInfo && userAgent) {
    browserInfo = (0, _browser.computeBrowserInfo)(userAgent);
  }
  var dom = (0, _useObjectMemo.useObjectMemo)((0, _dom.getDOM)());
  return /*#__PURE__*/React.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
    platform: (0, _platform.platform)(browserInfo)
  }, /*#__PURE__*/React.createElement(_dom.DOMContext.Provider, {
    value: dom
  }, children));
};
exports.SSRWrapper = SSRWrapper;
//# sourceMappingURL=SSR.js.map