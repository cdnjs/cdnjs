"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useFocusWithin", {
    enumerable: true,
    get: function() {
        return useFocusWithin;
    }
});
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _dom = require("../lib/dom");
var _useGlobalEventListener = require("./useGlobalEventListener");
function useFocusWithin(ref) {
    var document = (0, _dom.useDOM)().document;
    var isFocusWithin = function() {
        if (!ref.current || !document) {
            return false;
        }
        return ref.current.contains(document.activeElement);
    };
    var _React_useState = _slicedToArray(_react.default.useState(isFocusWithin), 2), focusWithin = _React_useState[0], setFocusWithin = _React_useState[1];
    var listener = function() {
        var focus = isFocusWithin();
        focus !== focusWithin && setFocusWithin(focus);
    };
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "focus", listener, {
        capture: true
    });
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "blur", listener, {
        capture: true
    });
    return focusWithin;
}

//# sourceMappingURL=useFocusWithin.js.map