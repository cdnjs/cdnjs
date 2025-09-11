import { useTokensClassName } from "../lib/tokens/useTokenClassName.js";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
export function useSyncHTMLWithTokens({ appRootRef, enable }) {
    const tokenClassName = useTokensClassName();
    useIsomorphicLayoutEffect(()=>{
        var _appRootRef_current;
        if (!enable) {
            return;
        }
        const htmlElement = (_appRootRef_current = appRootRef.current) === null || _appRootRef_current === void 0 ? void 0 : _appRootRef_current.ownerDocument.documentElement;
        /* eslint-disable-next-line no-restricted-properties */ htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.classList.add(tokenClassName);
        return ()=>{
            /* eslint-disable-next-line no-restricted-properties */ htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.classList.remove(tokenClassName);
        };
    }, [
        tokenClassName
    ]);
}

//# sourceMappingURL=useSyncHTMLWithTokens.js.map