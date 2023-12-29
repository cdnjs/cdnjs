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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _callMultiple = require("../../lib/callMultiple");
const _utils = require("../../lib/utils");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
    const result = [];
    for(let index = 0; index < length; index += 1){
        result.push(/*#__PURE__*/ _react.createElement("span", {
            key: index,
            className: "vkuiInputLike__mask"
        }, MASK_SYMBOL));
    }
    return result;
}
const InputLike = (_param)=>{
    var { value, length, index, onElementSelect, onClick, onFocus, label } = _param, restProps = _object_without_properties._(_param, [
        "value",
        "length",
        "index",
        "onElementSelect",
        "onClick",
        "onFocus",
        "label"
    ]);
    const handleElementSelect = _react.useCallback((event)=>{
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
    }, restProps), label && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, label), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/ _react.createElement("span", {
        key: index,
        className: "vkuiInputLike__last_character"
    }, value.slice(length - 1)), getMaskElements(length - ((_value_length = value === null || value === void 0 ? void 0 : value.length) !== null && _value_length !== void 0 ? _value_length : 0)));
};
InputLike.displayName = 'InputLike';

//# sourceMappingURL=InputLike.js.map