import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { callMultiple } from "../../lib/callMultiple";
import { stopPropagation } from "../../lib/utils";
var MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
    var result = [];
    for(var index = 0; index < length; index += 1){
        result.push(/*#__PURE__*/ React.createElement("span", {
            key: index,
            className: "vkuiInputLike__mask"
        }, MASK_SYMBOL));
    }
    return result;
}
export var InputLike = function(_param) {
    var value = _param.value, length = _param.length, index = _param.index, onElementSelect = _param.onElementSelect, onClick = _param.onClick, onFocus = _param.onFocus, getRootRef = _param.getRootRef, className = _param.className, props = _object_without_properties(_param, [
        "value",
        "length",
        "index",
        "onElementSelect",
        "onClick",
        "onFocus",
        "getRootRef",
        "className"
    ]);
    var handleElementSelect = React.useCallback(function(event) {
        stopPropagation(event);
        onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
    }, [
        index,
        onElementSelect
    ]);
    var _value_length;
    return /*#__PURE__*/ React.createElement("span", _object_spread({
        className: classNames("vkuiInputLike", (value === null || value === void 0 ? void 0 : value.length) === length && "vkuiInputLike--full", className),
        tabIndex: 0,
        ref: getRootRef,
        onClick: callMultiple(onClick, handleElementSelect),
        onFocus: callMultiple(stopPropagation, onFocus)
    }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/ React.createElement("span", {
        key: index,
        className: "vkuiInputLike__last_character"
    }, value.slice(length - 1)), getMaskElements(length - ((_value_length = value === null || value === void 0 ? void 0 : value.length) !== null && _value_length !== void 0 ? _value_length : 0)));
};
InputLike.displayName = "InputLike";

//# sourceMappingURL=InputLike.js.map