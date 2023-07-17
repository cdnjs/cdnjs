import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
export var useBooleanState = function() {
    var defaultValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array(React.useState(defaultValue), 2), value = _React_useState[0], setValue = _React_useState[1];
    var setTrue = React.useCallback(function() {
        setValue(true);
    }, []);
    var setFalse = React.useCallback(function() {
        setValue(false);
    }, []);
    var toggle = React.useCallback(function() {
        setValue(!value);
    }, [
        value
    ]);
    return {
        value: value,
        setTrue: setTrue,
        setFalse: setFalse,
        toggle: toggle
    };
};

//# sourceMappingURL=useBooleanState.js.map