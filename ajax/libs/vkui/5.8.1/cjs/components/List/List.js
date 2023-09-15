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
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var _ListContext = require("./ListContext");
var List = function(_param) {
    var children = _param.children, restProps = _object_without_properties._(_param, [
        "children"
    ]);
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), isDragging = _React_useState[0], toggleDrag = _React_useState[1];
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        role: "list"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiList", isDragging && "vkuiInternalList--dragging")
    }), /*#__PURE__*/ _react.createElement(_ListContext.ListContext.Provider, {
        value: _react.useMemo(function() {
            return {
                toggleDrag: toggleDrag
            };
        }, [])
    }, children));
};

//# sourceMappingURL=List.js.map