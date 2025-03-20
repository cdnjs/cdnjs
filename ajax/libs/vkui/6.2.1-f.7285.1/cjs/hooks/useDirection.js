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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useDirection() {
    const ref = _react.useRef(null);
    const [direction, setDirection] = _react.useState(undefined);
    const [writingMode, setWritingMode] = _react.useState(undefined);
    const { window } = (0, _dom.useDOM)();
    const update = ()=>{
        if (!window || !ref.current) {
            return;
        }
        const styleDeclaration = window.getComputedStyle(ref.current);
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