"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBrowserInfo = useBrowserInfo;

var React = _interopRequireWildcard(require("react"));

var _SSR = require("../lib/SSR");

var _browser = require("../lib/browser");

function useBrowserInfo() {
  var ssrContext = React.useContext(_SSR.SSRContext);
  var browserInfo = ssrContext.browserInfo || (0, _browser.computeBrowserInfo)(ssrContext.userAgent);
  return browserInfo;
}
//# sourceMappingURL=useBrowserInfo.js.map