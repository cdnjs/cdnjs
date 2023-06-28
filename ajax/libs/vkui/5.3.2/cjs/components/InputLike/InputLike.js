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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _callMultiple = require("../../lib/callMultiple");
var _utils = require("../../lib/utils");
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
    var value = _param.value, length = _param.length, index = _param.index, onElementSelect = _param.onElementSelect, onClick = _param.onClick, onFocus = _param.onFocus, getRootRef = _param.getRootRef, className = _param.className, props = _objectWithoutProperties(_param, [
        "value",
        "length",
        "index",
        "onElementSelect",
        "onClick",
        "onFocus",
        "getRootRef",
        "className"
    ]);
    var handleElementSelect = _react.useCallback(function(event) {
        (0, _utils.stopPropagation)(event);
        onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
    }, [
        index,
        onElementSelect
    ]);
    var _value_length;
    return /*#__PURE__*/ _react.createElement("span", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiInputLike", (value === null || value === void 0 ? void 0 : value.length) === length && "vkuiInputLike--full", className),
        tabIndex: 0,
        ref: getRootRef,
        onClick: (0, _callMultiple.callMultiple)(onClick, handleElementSelect),
        onFocus: (0, _callMultiple.callMultiple)(_utils.stopPropagation, onFocus)
    }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/ _react.createElement("span", {
        key: index,
        className: "vkuiInputLike__last_character"
    }, value.slice(length - 1)), getMaskElements(length - ((_value_length = value === null || value === void 0 ? void 0 : value.length) !== null && _value_length !== void 0 ? _value_length : 0)));
};
InputLike.displayName = "InputLike";

//# sourceMappingURL=InputLike.js.map