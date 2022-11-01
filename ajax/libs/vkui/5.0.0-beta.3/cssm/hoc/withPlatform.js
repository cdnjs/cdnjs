import _extends from "@babel/runtime/helpers/extends";
import * as React from "react";
import { SSRContext } from "../lib/SSR";
import { ConfigProviderContext } from "../components/ConfigProvider/ConfigProviderContext";
export function withPlatform(Component) {
  function WithPlatform(props) {
    var ssrContext = React.useContext(SSRContext);
    var _React$useContext = React.useContext(ConfigProviderContext),
      platform = _React$useContext.platform;
    return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
      platform: ssrContext.platform || platform
    }));
  }
  return WithPlatform;
}
//# sourceMappingURL=withPlatform.js.map