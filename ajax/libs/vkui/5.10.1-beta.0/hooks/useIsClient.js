import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
/**
 * Хук для two-pass рендеринга.
 *
 * ВНИМАНИЕ: Этот подход сделает ваши компоненты медленнее, потому что они
 * должны рендериться дважды, поэтому используйте хук с осторожностью.
 *
 * @see {@link https://beta.reactjs.org/apis/react-dom/hydrate#handling-different-client-and-server-content React Docs}
 */ export function useIsClient() {
    var initial = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array(React.useState(initial), 2), isClient = _React_useState[0], setIsClient = _React_useState[1];
    useIsomorphicLayoutEffect(function() {
        setIsClient(true);
    }, []);
    return isClient;
}

//# sourceMappingURL=useIsClient.js.map