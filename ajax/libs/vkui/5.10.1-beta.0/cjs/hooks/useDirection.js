"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDirection", {
    enumerable: true,
    get: function() {
        return useDirection;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("../lib/dom");
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useDirection() {
    var ref = _react.useRef(null);
    var _React_useState = _sliced_to_array._(_react.useState(undefined), 2), direction = _React_useState[0], setDirection = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(undefined), 2), writingMode = _React_useState1[0], setWritingMode = _React_useState1[1];
    var window = (0, _dom.useDOM)().window;
    var update = function() {
        if (!window || !ref.current) {
            return;
        }
        var styleDeclaration = window.getComputedStyle(ref.current);
        setDirection(styleDeclaration.direction);
        setWritingMode(styleDeclaration.writingMode);
    };
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(update, [
        window
    ]);
    return [
        ref,
        direction,
        writingMode
    ];
}

//# sourceMappingURL=useDirection.js.map