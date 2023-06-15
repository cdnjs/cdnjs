import * as React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { TokensClassProvider } from '../../lib/tokensClassProvider';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * @see https://vkcom.github.io/VKUI/#/AppearanceProvider
 */
export var AppearanceProvider = function AppearanceProvider(_ref) {
  var appearance = _ref.appearance,
    children = _ref.children;
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(ConfigProviderOverride, {
    appearance: appearance
  }, /*#__PURE__*/React.createElement(TokensClassProvider, {
    platform: platform,
    appearance: appearance
  }, children));
};
//# sourceMappingURL=AppearanceProvider.js.map