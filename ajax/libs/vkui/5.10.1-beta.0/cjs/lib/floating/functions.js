"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    checkIsNotAutoPlacement: function() {
        return checkIsNotAutoPlacement;
    },
    convertFloatingDataToReactCSSProperties: function() {
        return convertFloatingDataToReactCSSProperties;
    },
    getAutoPlacementAlign: function() {
        return getAutoPlacementAlign;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function checkIsNotAutoPlacement(placement) {
    return !placement.startsWith("auto");
}
function getAutoPlacementAlign(placement) {
    var align = placement.replace(/auto-|auto/, "");
    return align === "start" || align === "end" ? align : null;
}
function convertFloatingDataToReactCSSProperties(strategy, x, y) {
    var initialWidth = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "max-content";
    var styles = {
        position: strategy,
        top: y,
        right: "auto",
        bottom: "auto",
        left: x
    };
    if (initialWidth !== null) {
        styles.width = initialWidth;
    }
    return styles;
}

//# sourceMappingURL=functions.js.map