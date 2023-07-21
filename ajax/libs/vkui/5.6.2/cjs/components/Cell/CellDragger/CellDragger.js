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
var _usePlatform = require("../../../hooks/usePlatform");
var _platform = require("../../../lib/platform");
var _Touch = require("../../Touch/Touch");
var CellDragger = function(_param) {
    var onDragStart = _param.onDragStart, onDragMove = _param.onDragMove, onDragEnd = _param.onDragEnd, onClick = _param.onClick, className = _param.className, restProps = _object_without_properties._(_param, [
        "onDragStart",
        "onDragMove",
        "onDragEnd",
        "onClick",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var handleClick = function(event) {
        event.preventDefault();
        if (onClick) {
            onClick(event);
        }
    };
    return /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCellDragger", className),
        onStart: onDragStart,
        onMoveY: onDragMove,
        onEnd: onDragEnd,
        onClick: handleClick
    }, restProps), platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_icons.Icon24ReorderIos, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Reorder, null));
};

//# sourceMappingURL=CellDragger.js.map