"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SSRWrapper", {
    enumerable: true,
    get: function() {
        return SSRWrapper;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _ConfigProviderOverride = require("../components/ConfigProvider/ConfigProviderOverride");
var _useObjectMemo = require("../hooks/useObjectMemo");
var _browser = require("./browser");
var _dom = require("./dom");
var _platform = require("./platform");
var SSRWrapper = function(param) {
    var userAgent = param.userAgent, browserInfo = param.browserInfo, children = param.children;
    if (!browserInfo && userAgent) {
        browserInfo = (0, _browser.computeBrowserInfo)(userAgent);
    }
    var dom = (0, _useObjectMemo.useObjectMemo)((0, _dom.getDOM)());
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        platform: (0, _platform.platform)(browserInfo)
    }, /*#__PURE__*/ _react.createElement(_dom.DOMContext.Provider, {
        value: dom
    }, children));
};

//# sourceMappingURL=SSR.js.map