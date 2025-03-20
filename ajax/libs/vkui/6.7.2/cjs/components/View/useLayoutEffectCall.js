"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useLayoutEffectCall", {
    enumerable: true,
    get: function() {
        return useLayoutEffectCall;
    }
});
const _class_private_field_get = require("@swc/helpers/_/_class_private_field_get");
const _class_private_field_init = require("@swc/helpers/_/_class_private_field_init");
const _class_private_field_set = require("@swc/helpers/_/_class_private_field_set");
const _define_property = require("@swc/helpers/_/_define_property");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _fns = /*#__PURE__*/ new WeakMap();
class LayoutEffectCall {
    /**
   * Выполняет переданные функции
   */ run() {
        for (const fn of _class_private_field_get._(this, _fns)){
            fn();
        }
        _class_private_field_set._(this, _fns, []);
    }
    constructor(){
        _class_private_field_init._(this, _fns, {
            writable: true,
            value: []
        });
        /**
   * Вызовет функцию после изменения DOM, но до того как пользователь увидит
   * изменения
   */ _define_property._(this, "add", (fn)=>{
            _class_private_field_get._(this, _fns).push(fn);
        });
    }
}
function useLayoutEffectCall() {
    const ref = _react.useRef(null);
    if (!ref.current) {
        ref.current = new LayoutEffectCall();
    }
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        ref.current.run();
    });
    return ref.current.add;
}

//# sourceMappingURL=useLayoutEffectCall.js.map