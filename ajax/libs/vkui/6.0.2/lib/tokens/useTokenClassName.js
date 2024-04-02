import * as React from 'react';
import { ConfigProviderContext } from '../../components/ConfigProvider/ConfigProviderContext';
import { DEFAULT_APPEARANCE } from '../appearance';
import { Platform } from '../platform';
import { DEFAULT_TOKENS_CLASS_NAMES } from './constants';
const isTokensClassNamesForPlatforms = (tokensClassNames)=>Platform.ANDROID in tokensClassNames || Platform.IOS in tokensClassNames || Platform.VKCOM in tokensClassNames;
const getTokenClassNameByAppearance = (appearance, tokensClassNames)=>tokensClassNames ? tokensClassNames[appearance] : undefined;
const getAppearanceTokenClassNameByPlatform = (platform, tokensClassNames)=>tokensClassNames ? tokensClassNames[platform] : undefined;
/**
 * @private
 */ export const useTokensClassName = ()=>{
    const { platform, appearance = DEFAULT_APPEARANCE, tokensClassNames } = React.useContext(ConfigProviderContext);
    const appearanceSchemeClassName = isTokensClassNamesForPlatforms(tokensClassNames) ? getAppearanceTokenClassNameByPlatform(platform, tokensClassNames) : tokensClassNames;
    const tokensClassName = getTokenClassNameByAppearance(appearance, appearanceSchemeClassName);
    return tokensClassName ? tokensClassName : DEFAULT_TOKENS_CLASS_NAMES[platform][appearance];
};

//# sourceMappingURL=useTokenClassName.js.map