import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';

/**
 * Хук для two-pass рендеринга.
 *
 * ВНИМАНИЕ: Этот подход сделает ваши компоненты медленнее, потому что они
 * должны рендериться дважды, поэтому используйте хук с осторожностью.
 *
 * @see {@link https://beta.reactjs.org/apis/react-dom/hydrate#handling-different-client-and-server-content React Docs}
 */
export function useIsClient() {
  var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _React$useState = React.useState(initial),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isClient = _React$useState2[0],
    setIsClient = _React$useState2[1];
  React.useEffect(function () {
    setIsClient(true);
  }, []);
  return isClient;
}
//# sourceMappingURL=useIsClient.js.map