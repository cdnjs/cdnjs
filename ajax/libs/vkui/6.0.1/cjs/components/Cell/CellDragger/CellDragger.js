"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CellDragger", {
    enumerable: true,
    get: function() {
        return CellDragger;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useDraggableWithDomApi = require("../../../hooks/useDraggableWithDomApi");
const _usePlatform = require("../../../hooks/usePlatform");
const _useIsomorphicLayoutEffect = require("../../../lib/useIsomorphicLayoutEffect");
const _Touch = require("../../Touch/Touch");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const CellDragger = (_param)=>{
    var { elRef, disabled, className, onDragStateChange, onDragFinish, children } = _param, restProps = _object_without_properties._(_param, [
        "elRef",
        "disabled",
        "className",
        "onDragStateChange",
        "onDragFinish",
        "children"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const Icon = platform === 'ios' ? _icons.Icon24ReorderIos : _icons.Icon24Reorder;
    const { dragging, onDragStart, onDragMove, onDragEnd } = (0, _useDraggableWithDomApi.useDraggableWithDomApi)({
        elRef,
        onDragFinish
    });
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (onDragStateChange) {
            onDragStateChange(dragging);
        }
    }, [
        dragging,
        onDragStateChange
    ]);
    return /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCellDragger", className),
        onStart: disabled ? undefined : onDragStart,
        onMoveY: disabled ? undefined : onDragMove,
        onEnd: disabled ? undefined : onDragEnd
    }, restProps), children && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), /*#__PURE__*/ _react.createElement(Icon, {
        className: "vkuiCellDragger__icon"
    }));
};

//# sourceMappingURL=CellDragger.js.map