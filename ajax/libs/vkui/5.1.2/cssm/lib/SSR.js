import * as React from 'react';
import { platform as getPlatform } from './platform';
import { computeBrowserInfo } from './browser';
import { DOMContext, getDOM } from './dom';
import { useObjectMemo } from '../hooks/useObjectMemo';
import { ConfigProviderOverride } from '../components/ConfigProvider/ConfigProviderOverride';
/**
 * @see https://vkcom.github.io/VKUI/#/SSR
 */
export var SSRWrapper = function SSRWrapper(_ref) {
  var userAgent = _ref.userAgent,
    browserInfo = _ref.browserInfo,
    children = _ref.children;
  if (!browserInfo && userAgent) {
    browserInfo = computeBrowserInfo(userAgent);
  }
  var dom = useObjectMemo(getDOM());
  return /*#__PURE__*/React.createElement(ConfigProviderOverride, {
    platform: getPlatform(browserInfo)
  }, /*#__PURE__*/React.createElement(DOMContext.Provider, {
    value: dom
  }, children));
};
//# sourceMappingURL=SSR.js.map