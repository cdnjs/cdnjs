"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropZone", {
    enumerable: true,
    get: function() {
        return DropZone;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _callMultiple = require("../../lib/callMultiple");
const _RootComponent = require("../RootComponent/RootComponent");
const _DropZoneGrid = require("./components/DropZoneGrid");
const DropZone = (_param)=>{
    var { onDragOver, onDragLeave, onDrop, children } = _param, props = _object_without_properties._(_param, [
        "onDragOver",
        "onDragLeave",
        "onDrop",
        "children"
    ]);
    const [active, setActive] = _react.useState(false);
    const onActive = (event)=>{
        if (event.isPropagationStopped()) {
            return;
        }
        setActive(true);
    };
    const offActive = ()=>{
        setActive(false);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiDropZone", active && "vkuiDropZone--active"),
        onDragOver: (0, _callMultiple.callMultiple)(onDragOver, onActive),
        onDragLeave: (0, _callMultiple.callMultiple)(onDragLeave, offActive),
        onDrop: (0, _callMultiple.callMultiple)(onDrop, offActive)
    }, props), {
        children: typeof children === 'function' ? children({
            active
        }) : children
    }));
};
DropZone.displayName = 'DropZone';
DropZone.Grid = _DropZoneGrid.DropZoneGrid;
DropZone.Grid.displayName = 'DropZone.Grid';

//# sourceMappingURL=DropZone.js.map