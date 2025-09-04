import * as React from "react";
import { ConfigProviderContext } from "../../components/ConfigProvider/ConfigProviderContext.js";
import { DEFAULT_COLOR_SCHEME } from "../colorScheme/index.js";
import { Platform } from "../platform.js";
import { DEFAULT_TOKENS_CLASS_NAMES } from "./constants.js";
const isTokensClassNamesForPlatforms = (tokensClassNames)=>Platform.ANDROID in tokensClassNames || Platform.IOS in tokensClassNames || Platform.VKCOM in tokensClassNames;
const getTokenClassNameByAppearance = (colorScheme, tokensClassNames)=>tokensClassNames ? tokensClassNames[colorScheme] : undefined;
const getAppearanceTokenClassNameByPlatform = (platform, tokensClassNames)=>tokensClassNames ? tokensClassNames[platform] : undefined;
/**
 * @private
 */ export const useTokensClassName = ()=>{
    const { platform, colorScheme = DEFAULT_COLOR_SCHEME, tokensClassNames } = React.useContext(ConfigProviderContext);
    const colorSchemeClassName = isTokensClassNamesForPlatforms(tokensClassNames) ? getAppearanceTokenClassNameByPlatform(platform, tokensClassNames) : tokensClassNames;
    const tokensClassName = getTokenClassNameByAppearance(colorScheme, colorSchemeClassName);
    return tokensClassName ? tokensClassName : DEFAULT_TOKENS_CLASS_NAMES[platform][colorScheme];
};

//# sourceMappingURL=useTokenClassName.js.map