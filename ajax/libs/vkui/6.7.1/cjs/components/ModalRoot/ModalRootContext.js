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
    ModalRootContext: function() {
        return ModalRootContext;
    },
    useModalRegistry: function() {
        return useModalRegistry;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const ModalRootContext = /*#__PURE__*/ _react.createContext({
    updateModalHeight: ()=>undefined,
    registerModal: ()=>undefined,
    isInsideModal: false
});
function useModalRegistry(id, type) {
    const modalContext = _react.useContext(ModalRootContext);
    const elements = _react.useRef({}).current;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (id !== undefined) {
            modalContext.registerModal(_object_spread_props._(_object_spread._({}, elements), {
                type,
                id
            }));
            // unset refs on  unmount to prevent leak
            const reset = Object.keys(elements).reduce((acc, k)=>_object_spread_props._(_object_spread._({}, acc), {
                    [k]: null
                }), {
                type,
                id
            });
            return ()=>modalContext.registerModal(reset);
        }
        return undefined;
    }, []);
    const refs = _react.useRef({
        modalElement: (e)=>elements.modalElement = e,
        innerElement: (e)=>elements.innerElement = e,
        headerElement: (e)=>elements.headerElement = e,
        contentElement: (e)=>elements.contentElement = e,
        bottomInset: (e)=>elements.bottomInset = e
    }).current;
    return {
        refs
    };
}

//# sourceMappingURL=ModalRootContext.js.map