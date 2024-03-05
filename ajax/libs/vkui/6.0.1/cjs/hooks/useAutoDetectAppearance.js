"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAutoDetectAppearance", {
    enumerable: true,
    get: function() {
        return useAutoDetectAppearance;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _appearance = require("../lib/appearance");
const _dom = require("../lib/dom");
const _matchMedia = require("../lib/matchMedia");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const useAutoDetectAppearance = (appearanceProp)=>{
    const { window } = (0, _dom.useDOM)();
    const [appearance, setAppearance] = _react.useState(appearanceProp || _appearance.Appearance.LIGHT);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (appearanceProp) {
            setAppearance(appearanceProp);
            return _vkjs.noop;
        }
        const mediaQuery = window ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
        if (!mediaQuery) {
            return _vkjs.noop;
        }
        const check = (event)=>{
            // eslint-disable-next-line no-restricted-properties
            setAppearance(event.matches ? _appearance.Appearance.DARK : _appearance.Appearance.LIGHT);
        };
        check(mediaQuery);
        (0, _matchMedia.matchMediaListAddListener)(mediaQuery, check);
        return ()=>(0, _matchMedia.matchMediaListRemoveListener)(mediaQuery, check);
    }, [
        window,
        appearanceProp
    ]);
    return appearance;
};

//# sourceMappingURL=useAutoDetectAppearance.js.map