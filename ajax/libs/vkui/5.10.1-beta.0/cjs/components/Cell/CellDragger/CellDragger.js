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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useDraggableWithDomApi = require("../../../hooks/useDraggableWithDomApi");
var _usePlatform = require("../../../hooks/usePlatform");
var _platform = require("../../../lib/platform");
var _useIsomorphicLayoutEffect = require("../../../lib/useIsomorphicLayoutEffect");
var _Touch = require("../../Touch/Touch");
var CellDragger = function(_param) {
    var elRef = _param.elRef, disabled = _param.disabled, className = _param.className, onDragStateChange = _param.onDragStateChange, onDragFinish = _param.onDragFinish, restProps = _object_without_properties._(_param, [
        "elRef",
        "disabled",
        "className",
        "onDragStateChange",
        "onDragFinish"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var Icon = platform === _platform.Platform.IOS ? _icons.Icon24ReorderIos : _icons.Icon24Reorder;
    var _useDraggableWithDomApi1 = (0, _useDraggableWithDomApi.useDraggableWithDomApi)({
        elRef: elRef,
        onDragFinish: onDragFinish
    }), dragging = _useDraggableWithDomApi1.dragging, onDragStart = _useDraggableWithDomApi1.onDragStart, onDragMove = _useDraggableWithDomApi1.onDragMove, onDragEnd = _useDraggableWithDomApi1.onDragEnd;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
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
    }, restProps), /*#__PURE__*/ _react.createElement(Icon, {
        className: "vkuiCellDragger__icon"
    }));
};

//# sourceMappingURL=CellDragger.js.map