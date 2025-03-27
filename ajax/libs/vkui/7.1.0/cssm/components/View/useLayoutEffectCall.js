import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
/**
 * Возвращает функцию которая вызывает callback после изменения DOM, но до того
 * как пользователь увидит изменения
 */ export function useLayoutEffectCall() {
    const [fns] = React.useState(()=>[]);
    useIsomorphicLayoutEffect(()=>{
        while(fns.length > 0){
            fns.pop()();
        }
    });
    const add = React.useCallback((fn)=>fns.push(fn), [
        fns
    ]);
    return add;
}

//# sourceMappingURL=useLayoutEffectCall.js.map