import * as React from 'react';
import { SSRContext } from "../lib/SSR";
import { ConfigProviderContext } from "../components/ConfigProvider/ConfigProviderContext";
export function usePlatform() {
  var ssrContext = React.useContext(SSRContext);

  var _React$useContext = React.useContext(ConfigProviderContext),
      platform = _React$useContext.platform;

  return ssrContext.platform || platform;
}
//# sourceMappingURL=usePlatform.js.map