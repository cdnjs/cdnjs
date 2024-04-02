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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ConfigProviderOverride = require("../components/ConfigProvider/ConfigProviderOverride");
const _useObjectMemo = require("../hooks/useObjectMemo");
const _browser = require("./browser");
const _dom = require("./dom");
const _platform = require("./platform");
const SSRWrapper = ({ userAgent, browserInfo, children })=>{
    if (!browserInfo && userAgent) {
        browserInfo = (0, _browser.computeBrowserInfo)(userAgent);
    }
    const dom = (0, _useObjectMemo.useObjectMemo)((0, _dom.getDOM)());
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        platform: (0, _platform.platform)(browserInfo)
    }, /*#__PURE__*/ _react.createElement(_dom.DOMContext.Provider, {
        value: dom
    }, children));
};

//# sourceMappingURL=SSR.js.map