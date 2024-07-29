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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useDraggableWithDomApi = require("../../hooks/useDraggableWithDomApi");
const _RootComponent = require("../RootComponent/RootComponent");
const List = (_param)=>{
    var { children, gap = 0, className, style } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "gap",
        "className",
        "style"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        role: "list",
        className: (0, _vkjs.classNames)("vkuiList", className),
        style: _object_spread_props._(_object_spread._({}, style), {
            gridGap: gap
        })
    }, restProps), {
        children: [
            children,
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
                "aria-hidden": true
            }, _useDraggableWithDomApi.DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP), {
                className: "vkuiList__placeholder"
            }))
        ]
    }));
};

//# sourceMappingURL=List.js.map