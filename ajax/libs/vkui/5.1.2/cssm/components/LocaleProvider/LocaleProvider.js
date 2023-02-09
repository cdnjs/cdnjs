import React from 'react';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * Компонент, прокидывающий локаль. Список можно найти в
 * [реестре языковых подмёток IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
 *
 * @version 5.0.0
 * @see https://vkcom.github.io/VKUI/#/LocaleProvider
 */
export function LocaleProvider(_ref) {
  var value = _ref.value,
    children = _ref.children;
  return /*#__PURE__*/React.createElement(ConfigProviderOverride, {
    locale: value
  }, children);
}
//# sourceMappingURL=LocaleProvider.js.map