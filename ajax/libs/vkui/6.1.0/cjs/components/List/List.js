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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _useDraggableWithDomApi = require("../../hooks/useDraggableWithDomApi");
const _RootComponent = require("../RootComponent/RootComponent");
const List = (_param)=>{
    var { children } = _param, restProps = _object_without_properties._(_param, [
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        role: "list"
    }, restProps), {
        children: [
            children,
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread._({
                "aria-hidden": true
            }, _useDraggableWithDomApi.DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP))
        ]
    }));
};

//# sourceMappingURL=List.js.map