import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { callMultiple } from "../../lib/callMultiple";
import { stopPropagation } from "../../lib/utils";
import { RootComponent } from "../RootComponent/RootComponent";
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
    var value = _param.value, length = _param.length, index = _param.index, onElementSelect = _param.onElementSelect, onClick = _param.onClick, onFocus = _param.onFocus, props = _object_without_properties(_param, [
        "value",
        "length",
        "index",
        "onElementSelect",
        "onClick",
        "onFocus"
    ]);
    var _value, _value1, _value2, _value3;
    var handleElementSelect = React.useCallback(function(event) {
        var _onElementSelect;
        stopPropagation(event);
        (_onElementSelect = onElementSelect) === null || _onElementSelect === void 0 ? void 0 : _onElementSelect(index);
    }, [
        index,
        onElementSelect
    ]);
    var _value_length;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "span",
        baseClassName: ((_value = value) === null || _value === void 0 ? void 0 : _value.length) === length ? "vkuiInputLike--full" : undefined,
        tabIndex: 0,
        onClick: callMultiple(onClick, handleElementSelect),
        onFocus: callMultiple(stopPropagation, onFocus)
    }, props), (_value1 = value) === null || _value1 === void 0 ? void 0 : _value1.slice(0, length - 1), ((_value2 = value) === null || _value2 === void 0 ? void 0 : _value2.slice(length - 1)) && /*#__PURE__*/ React.createElement("span", {
        key: index,
        className: "vkuiInputLike__last_character"
    }, value.slice(length - 1)), getMaskElements(length - ((_value_length = (_value3 = value) === null || _value3 === void 0 ? void 0 : _value3.length) !== null && _value_length !== void 0 ? _value_length : 0)));
};
InputLike.displayName = "InputLike";

//# sourceMappingURL=InputLike.js.map