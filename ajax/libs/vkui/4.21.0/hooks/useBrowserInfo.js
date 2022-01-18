import * as React from 'react';
import { SSRContext } from "../lib/SSR";
import { computeBrowserInfo } from "../lib/browser";
export function useBrowserInfo() {
  var ssrContext = React.useContext(SSRContext);
  var browserInfo = ssrContext.browserInfo || computeBrowserInfo(ssrContext.userAgent);
  return browserInfo;
}
//# sourceMappingURL=useBrowserInfo.js.map