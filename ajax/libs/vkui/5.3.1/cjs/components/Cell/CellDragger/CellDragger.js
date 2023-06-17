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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../../hooks/usePlatform");
var _platform = require("../../../lib/platform");
var _touch = require("../../Touch/Touch");
var CellDragger = function(_param) {
    var onDragStart = _param.onDragStart, onDragMove = _param.onDragMove, onDragEnd = _param.onDragEnd, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "onDragStart",
        "onDragMove",
        "onDragEnd",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var onClick = _react.useCallback(function(e) {
        e.preventDefault();
    }, []);
    return /*#__PURE__*/ _react.createElement(_touch.Touch, _objectSpread({
        className: (0, _vkjs.classNames)("vkuiCellDragger", className),
        onStart: onDragStart,
        onMoveY: onDragMove,
        onEnd: onDragEnd,
        onClick: onClick
    }, restProps), platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_icons.Icon24ReorderIos, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Reorder, null));
};

//# sourceMappingURL=CellDragger.js.map