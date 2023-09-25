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
    canUseDOM: function() {
        return _vkjs.canUseDOM;
    },
    canUseEventListeners: function() {
        return _vkjs.canUseEventListeners;
    },
    onDOMLoaded: function() {
        return _vkjs.onDOMLoaded;
    },
    getDOM: function() {
        return getDOM;
    },
    DOMContext: function() {
        return DOMContext;
    },
    useDOM: function() {
        return useDOM;
    },
    withDOM: function() {
        return withDOM;
    },
    blurActiveElement: function() {
        return blurActiveElement;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var getDOM = function() {
    return {
        window: _vkjs.canUseDOM ? window : undefined,
        document: _vkjs.canUseDOM ? document : undefined
    };
};
var DOMContext = /*#__PURE__*/ _react.createContext(getDOM());
var useDOM = function() {
    return _react.useContext(DOMContext);
};
function withDOM(Component) {
    var WithDOM = function(props) {
        var dom = useDOM();
        return /*#__PURE__*/ _react.createElement(Component, _object_spread._({}, props, dom));
    };
    return WithDOM;
}
function blurActiveElement(document1) {
    if (document1 && document1.activeElement) {
        document1.activeElement.blur();
    }
}

//# sourceMappingURL=dom.js.map