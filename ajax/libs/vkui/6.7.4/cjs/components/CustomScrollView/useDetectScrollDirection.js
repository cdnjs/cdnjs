"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDetectScrollDirection", {
    enumerable: true,
    get: function() {
        return useDetectScrollDirection;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const useDetectScrollDirection = ()=>{
    const lastScrollLeft = _react.useRef(0);
    const lastScrollTop = _react.useRef(0);
    return _react.useCallback((event)=>{
        const { scrollTop, scrollLeft } = event.currentTarget;
        if (scrollTop !== lastScrollTop.current) {
            lastScrollTop.current = scrollTop;
            return 'vertical';
        } else if (scrollLeft !== lastScrollLeft.current) {
            lastScrollLeft.current = scrollLeft;
            return 'horizontal';
        }
        return null;
    }, []);
};

//# sourceMappingURL=useDetectScrollDirection.js.map