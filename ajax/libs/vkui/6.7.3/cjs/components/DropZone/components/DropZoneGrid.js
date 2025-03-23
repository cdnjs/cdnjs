"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropZoneGrid", {
    enumerable: true,
    get: function() {
        return DropZoneGrid;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../../RootComponent/RootComponent");
const directionStyle = {
    row: "vkuiDropZoneGrid--row",
    column: "vkuiDropZoneGrid--column"
};
const DropZoneGrid = (_param)=>{
    var { direction = 'column' } = _param, props = _object_without_properties._(_param, [
        "direction"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiDropZoneGrid", directionStyle[direction])
    }, props));
};
DropZoneGrid.displayName = 'DropZoneGrid';

//# sourceMappingURL=DropZoneGrid.js.map