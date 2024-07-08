/* eslint-disable no-restricted-properties */ "use strict";
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
    REDUCE_MOTION_MEDIA_QUERY: function() {
        return REDUCE_MOTION_MEDIA_QUERY;
    },
    useReducedMotion: function() {
        return useReducedMotion;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../dom");
const _matchMedia = require("../matchMedia");
const _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
const REDUCE_MOTION_MEDIA_QUERY = 'screen and (prefers-reduced-motion: reduce)';
const useReducedMotion = ()=>{
    const { window } = (0, _dom.useDOM)();
    const initial = _react.useMemo(()=>window ? window.matchMedia(REDUCE_MOTION_MEDIA_QUERY).matches : /* istanbul ignore next: на текущий момент, покрытие данного кейса неинтересно  */ false, [
        window
    ]);
    const reducedMotion = _react.useRef(initial);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!window) {
            return;
        }
        const match = window.matchMedia(REDUCE_MOTION_MEDIA_QUERY);
        reducedMotion.current = match.matches;
        /* istanbul ignore next: на текущий момент, покрытие данного кейса неинтересно  */ const handleMediaQueryChange = (event)=>{
            /* istanbul ignore next */ reducedMotion.current = event.matches;
        };
        (0, _matchMedia.matchMediaListAddListener)(match, handleMediaQueryChange);
        return ()=>(0, _matchMedia.matchMediaListRemoveListener)(match, handleMediaQueryChange);
    }, [
        window
    ]);
    return reducedMotion.current;
};

//# sourceMappingURL=useReducedMotion.js.map