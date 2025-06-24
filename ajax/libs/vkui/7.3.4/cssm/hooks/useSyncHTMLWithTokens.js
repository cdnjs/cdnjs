import { useTokensClassName } from "../lib/tokens/useTokenClassName.js";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
export function useSyncHTMLWithTokens({ appRootRef, enable }) {
    const tokenClassName = useTokensClassName();
    useIsomorphicLayoutEffect(()=>{
        if (!enable) {
            return;
        }
        const htmlElement = appRootRef.current?.ownerDocument.documentElement;
        /* eslint-disable-next-line no-restricted-properties */ htmlElement?.classList.add(tokenClassName);
        return ()=>{
            /* eslint-disable-next-line no-restricted-properties */ htmlElement?.classList.remove(tokenClassName);
        };
    }, [
        tokenClassName
    ]);
}

//# sourceMappingURL=useSyncHTMLWithTokens.js.map