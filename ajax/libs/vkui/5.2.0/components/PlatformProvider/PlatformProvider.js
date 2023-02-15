import React from 'react';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
import { TokensClassProvider } from '../../lib/tokensClassProvider';
import { useAppearance } from '../../hooks/useAppearance';
/**
 * Компонент, позволяющий переопределить платформу для части приложения
 *
 * @version 5.1.0
 * @see https://vkcom.github.io/VKUI/#/PlatformProvider
 */
export function PlatformProvider(_ref) {
  var value = _ref.value,
    children = _ref.children;
  var appearance = useAppearance();
  return /*#__PURE__*/React.createElement(ConfigProviderOverride, {
    platform: value
  }, /*#__PURE__*/React.createElement(TokensClassProvider, {
    platform: value,
    appearance: appearance
  }, children));
}
//# sourceMappingURL=PlatformProvider.js.map