"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InputLike", {
    enumerable: true,
    get: function() {
        return InputLike;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _callMultiple = require("../../lib/callMultiple");
var _utils = require("../../lib/utils");
var _RootComponent = require("../RootComponent/RootComponent");
var MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
    var result = [];
    for(var index = 0; index < length; index += 1){
        result.push(/*#__PURE__*/ _react.createElement("span", {
            key: index,
            className: "vkuiInputLike__mask"
        }, MASK_SYMBOL));
    }
    return result;
}
var InputLike = function(_param) {
    var value = _param.value, length = _param.length, index = _param.index, onElementSelect = _param.onElementSelect, onClick = _param.onClick, onFocus = _param.onFocus, props = _object_without_properties._(_param, [
        "value",
        "length",
        "index",
        "onElementSelect",
        "onClick",
        "onFocus"
    ]);
    var handleElementSelect = _react.useCallback(function(event) {
        (0, _utils.stopPropagation)(event);
        onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
    }, [
        index,
        onElementSelect
    ]);
    var _value_length;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "span",
        baseClassName: (value === null || value === void 0 ? void 0 : value.length) === length ? "vkuiInputLike--full" : undefined,
        tabIndex: 0,
        onClick: (0, _callMultiple.callMultiple)(onClick, handleElementSelect),
        onFocus: (0, _callMultiple.callMultiple)(_utils.stopPropagation, onFocus)
    }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/ _react.createElement("span", {
        key: index,
        className: "vkuiInputLike__last_character"
    }, value.slice(length - 1)), getMaskElements(length - ((_value_length = value === null || value === void 0 ? void 0 : value.length) !== null && _value_length !== void 0 ? _value_length : 0)));
};
InputLike.displayName = "InputLike";

//# sourceMappingURL=InputLike.js.map