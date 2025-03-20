import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
var _fns = /*#__PURE__*/ new WeakMap();
class LayoutEffectCall {
    /**
   * Выполняет переданные функции
   */ run() {
        for (const fn of _class_private_field_get(this, _fns)){
            fn();
        }
        _class_private_field_set(this, _fns, []);
    }
    constructor(){
        _class_private_field_init(this, _fns, {
            writable: true,
            value: []
        });
        /**
   * Вызовет функцию после изменения DOM, но до того как пользователь увидит
   * изменения
   */ _define_property(this, "add", (fn)=>{
            _class_private_field_get(this, _fns).push(fn);
        });
    }
}
/**
 * Возвращает функцию которая вызывает callback после изменения DOM, но до того
 * как пользователь увидит изменения
 */ export function useLayoutEffectCall() {
    const ref = React.useRef(null);
    if (!ref.current) {
        ref.current = new LayoutEffectCall();
    }
    useIsomorphicLayoutEffect(()=>{
        ref.current.run();
    });
    return ref.current.add;
}

//# sourceMappingURL=useLayoutEffectCall.js.map