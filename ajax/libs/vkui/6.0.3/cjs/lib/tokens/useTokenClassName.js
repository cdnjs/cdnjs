"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTokensClassName", {
    enumerable: true,
    get: function() {
        return useTokensClassName;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ConfigProviderContext = require("../../components/ConfigProvider/ConfigProviderContext");
const _appearance = require("../appearance");
const _platform = require("../platform");
const _constants = require("./constants");
const isTokensClassNamesForPlatforms = (tokensClassNames)=>_platform.Platform.ANDROID in tokensClassNames || _platform.Platform.IOS in tokensClassNames || _platform.Platform.VKCOM in tokensClassNames;
const getTokenClassNameByAppearance = (appearance, tokensClassNames)=>tokensClassNames ? tokensClassNames[appearance] : undefined;
const getAppearanceTokenClassNameByPlatform = (platform, tokensClassNames)=>tokensClassNames ? tokensClassNames[platform] : undefined;
const useTokensClassName = ()=>{
    const { platform, appearance = _appearance.DEFAULT_APPEARANCE, tokensClassNames } = _react.useContext(_ConfigProviderContext.ConfigProviderContext);
    const appearanceSchemeClassName = isTokensClassNamesForPlatforms(tokensClassNames) ? getAppearanceTokenClassNameByPlatform(platform, tokensClassNames) : tokensClassNames;
    const tokensClassName = getTokenClassNameByAppearance(appearance, appearanceSchemeClassName);
    return tokensClassName ? tokensClassName : _constants.DEFAULT_TOKENS_CLASS_NAMES[platform][appearance];
};

//# sourceMappingURL=useTokenClassName.js.map