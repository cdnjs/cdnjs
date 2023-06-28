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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _listContext = require("./ListContext");
var List = function(_param) {
    var children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "className"
    ]);
    var _React_useState = _slicedToArray(_react.useState(false), 2), isDragging = _React_useState[0], toggleDrag = _React_useState[1];
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({
        role: "list"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiList", isDragging && "vkuiInternalList--dragging", className)
    }), /*#__PURE__*/ _react.createElement(_listContext.ListContext.Provider, {
        value: _react.useMemo(function() {
            return {
                toggleDrag: toggleDrag
            };
        }, [])
    }, children));
};

//# sourceMappingURL=List.js.map