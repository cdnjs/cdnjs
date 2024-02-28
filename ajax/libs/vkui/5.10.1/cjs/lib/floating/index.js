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
    arrowMiddleware: function() {
        return _reactdom.arrow;
    },
    autoPlacementMiddleware: function() {
        return _reactdom.autoPlacement;
    },
    autoUpdateFloatingElement: function() {
        return _adapters.autoUpdateFloatingElement;
    },
    checkIsNotAutoPlacement: function() {
        return _functions.checkIsNotAutoPlacement;
    },
    convertFloatingDataToReactCSSProperties: function() {
        return _functions.convertFloatingDataToReactCSSProperties;
    },
    flipMiddleware: function() {
        return _reactdom.flip;
    },
    getAutoPlacementAlign: function() {
        return _functions.getAutoPlacementAlign;
    },
    getOverflowAncestors: function() {
        return _reactdom.getOverflowAncestors;
    },
    hideMiddleware: function() {
        return _reactdom.hide;
    },
    offsetMiddleware: function() {
        return _reactdom.offset;
    },
    shiftMiddleware: function() {
        return _reactdom.shift;
    },
    sizeMiddleware: function() {
        return _reactdom.size;
    },
    useFloating: function() {
        return _reactdom.useFloating;
    }
});
var _reactdom = require("@vkontakte/vkui-floating-ui/react-dom");
var _functions = require("./functions");
var _adapters = require("./adapters");

//# sourceMappingURL=index.js.map