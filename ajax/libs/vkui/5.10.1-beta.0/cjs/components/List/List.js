"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "List", {
    enumerable: true,
    get: function() {
        return List;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useDraggableWithDomApi = require("../../hooks/useDraggableWithDomApi");
var _RootComponent = require("../RootComponent/RootComponent");
var List = function(_param) {
    var children = _param.children, restProps = _object_without_properties._(_param, [
        "children"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        role: "list"
    }, restProps), children, /*#__PURE__*/ _react.createElement("div", _object_spread._({
        "aria-hidden": true
    }, _useDraggableWithDomApi.DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP)));
};

//# sourceMappingURL=List.js.map