"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useEventListener", {
    enumerable: true,
    get: function() {
        return useEventListener;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useEventListener(event, _cb, _options) {
    const cbRef = _react.useRef(_cb);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        cbRef.current = _cb;
    }, [
        _cb
    ]);
    const cb = _react.useCallback((e)=>cbRef.current && cbRef.current(e), []);
    const detach = _react.useRef(_vkjs.noop);
    const remove = _react.useCallback(()=>{
        detach.current();
        detach.current = _vkjs.noop;
    }, []);
    const add = _react.useCallback((el)=>{
        if (!_dom.canUseDOM) {
            return;
        }
        remove();
        if (!el) {
            return;
        }
        const options = _object_spread._({}, _options);
        el.addEventListener(event, cb, options);
        detach.current = ()=>el.removeEventListener(event, cb, options);
    }, [
        _options,
        cb,
        event,
        remove
    ]);
    _react.useEffect(()=>remove, [
        remove
    ]);
    return _react.useMemo(()=>({
            add,
            remove
        }), [
        add,
        remove
    ]);
}

//# sourceMappingURL=useEventListener.js.map