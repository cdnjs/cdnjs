import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useDOM } from "../lib/dom";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
import { useGlobalEventListener } from "./useGlobalEventListener";
export function useFocusWithin(ref) {
    var document = useDOM().document;
    var isFocusWithin = function() {
        if (!ref.current || !document) {
            return false;
        }
        return ref.current.contains(document.activeElement);
    };
    var _React_useState = _sliced_to_array(React.useState(isFocusWithin), 2), focusWithin = _React_useState[0], setFocusWithin = _React_useState[1];
    var listener = function() {
        var focus = isFocusWithin();
        focus !== focusWithin && setFocusWithin(focus);
    };
    // Проверяем autoFocus
    useIsomorphicLayoutEffect(listener, []);
    useGlobalEventListener(document, "focus", listener, {
        capture: true
    });
    useGlobalEventListener(document, "blur", listener, {
        capture: true
    });
    return focusWithin;
}

//# sourceMappingURL=useFocusWithin.js.map