import _extends from "@babel/runtime/helpers/extends";
import * as React from 'react';
import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function withPlatform(Component) {
  function WithPlatform(props) {
    var _useConfigProvider = useConfigProvider(),
      platform = _useConfigProvider.platform;
    return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
      platform: platform
    }));
  }
  return WithPlatform;
}
//# sourceMappingURL=withPlatform.js.map