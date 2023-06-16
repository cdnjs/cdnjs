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
    getAutoPlacementAlign: function() {
        return getAutoPlacementAlign;
    },
    convertFloatingDataToReactCSSProperties: function() {
        return convertFloatingDataToReactCSSProperties;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
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
        top: y || 0,
        right: "auto",
        bottom: "auto",
        left: x || 0
    };
    if (initialWidth !== null) {
        styles.width = initialWidth;
    }
    return styles;
}

//# sourceMappingURL=functions.js.map