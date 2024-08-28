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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const isFocusWithin = (ref, document)=>ref.contains(document.activeElement);
function useFocusWithin(ref) {
    const { document } = (0, _dom.useDOM)();
    const [focusWithin, setFocusWithin] = _react.useState(()=>ref.current && document ? isFocusWithin(ref.current, document) : false);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function handleAutoFocus() {
        /* istanbul ignore if: невозможный кейс, т.к. в SSR эффекты не вызываются. Проверка на будущее, если вдруг эффект будет вызываться. */ if (!document) {
            return;
        }
        const handleFocusOrBlurEvents = ()=>{
            if (ref.current) {
                setFocusWithin(isFocusWithin(ref.current, document));
            }
        };
        // Вызываем в начале, чтобы проверить autoFocus
        void handleFocusOrBlurEvents();
        document.addEventListener('focus', handleFocusOrBlurEvents, {
            capture: true
        });
        document.addEventListener('blur', handleFocusOrBlurEvents, {
            capture: true
        });
        return ()=>{
            document.removeEventListener('focus', handleFocusOrBlurEvents, {
                capture: true
            });
            document.removeEventListener('blur', handleFocusOrBlurEvents, {
                capture: true
            });
        };
    }, []);
    return focusWithin;
}

//# sourceMappingURL=useFocusWithin.js.map