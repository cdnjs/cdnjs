import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import React from "react";
import { useDOM } from "../lib/dom";
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
    useGlobalEventListener(document, "focus", listener, {
        capture: true
    });
    useGlobalEventListener(document, "blur", listener, {
        capture: true
    });
    return focusWithin;
}

//# sourceMappingURL=useFocusWithin.js.map