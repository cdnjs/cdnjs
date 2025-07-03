import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
const layoutClassNames = {
    card: 'vkui--layout-card',
    plain: 'vkui--layout-plain'
};
export function useSyncHTMLWithBaseVKUIClasses({ appRootRef, mode, enable, layout }) {
    useIsomorphicLayoutEffect(()=>{
        var _appRootRef_current, _appRootRef_current1;
        if (!enable) {
            return;
        }
        const htmlElement = (_appRootRef_current = appRootRef.current) === null || _appRootRef_current === void 0 ? void 0 : _appRootRef_current.ownerDocument.documentElement;
        var _appRootRef_current_parentElement;
        const parentElement = (_appRootRef_current_parentElement = (_appRootRef_current1 = appRootRef.current) === null || _appRootRef_current1 === void 0 ? void 0 : _appRootRef_current1.parentElement) !== null && _appRootRef_current_parentElement !== void 0 ? _appRootRef_current_parentElement : null;
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
            /* eslint-disable-next-line no-restricted-properties */ htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.classList.add(...htmlElementClasses);
        }
        /* eslint-disable-next-line no-restricted-properties */ parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList.add(...parentElementClasses);
        return ()=>{
            if (mode === 'full') {
                /* eslint-disable-next-line no-restricted-properties */ htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.classList.remove(...htmlElementClasses);
            }
            /* eslint-disable-next-line no-restricted-properties */ parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList.remove(...parentElementClasses);
        };
    }, [
        mode,
        enable,
        layout
    ]);
}

//# sourceMappingURL=useSyncHTMLWithBaseVKUIClasses.js.map