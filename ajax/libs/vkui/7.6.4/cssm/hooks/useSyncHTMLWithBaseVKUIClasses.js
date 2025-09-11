import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
const layoutClassNames = {
    card: 'vkui--layout-card',
    plain: 'vkui--layout-plain'
};
export function useSyncHTMLWithBaseVKUIClasses({ appRootRef, mode, enable, layout }) {
    useIsomorphicLayoutEffect(()=>{
        if (!enable) {
            return;
        }
        const htmlElement = appRootRef.current?.ownerDocument.documentElement;
        const parentElement = appRootRef.current?.parentElement ?? null;
        const htmlElementClasses = [
            'vkui'
        ];
        const parentElementClasses = [
            'vkui__root'
        ];
        if (mode === 'embedded') {
            parentElementClasses.push('vkui__root--embedded');
        }
        if (mode === 'full') {
            if (layout) {
                htmlElementClasses.push(layoutClassNames[layout]);
            }
            /* eslint-disable-next-line no-restricted-properties */ htmlElement?.classList.add(...htmlElementClasses);
        }
        /* eslint-disable-next-line no-restricted-properties */ parentElement?.classList.add(...parentElementClasses);
        return ()=>{
            if (mode === 'full') {
                /* eslint-disable-next-line no-restricted-properties */ htmlElement?.classList.remove(...htmlElementClasses);
            }
            /* eslint-disable-next-line no-restricted-properties */ parentElement?.classList.remove(...parentElementClasses);
        };
    }, [
        mode,
        enable,
        layout
    ]);
}

//# sourceMappingURL=useSyncHTMLWithBaseVKUIClasses.js.map