import * as React from "react";
import { pressedKey } from "../lib/accessibility.js";
import { useDOM } from "../lib/dom.js";
import { useGlobalEventListener } from "./useGlobalEventListener.js";
export function useTabsNavigation(enabled = true, isRtl = false) {
    const { document } = useDOM();
    const tabsRef = React.useRef(null);
    const getTabEls = ()=>{
        if (!tabsRef.current) {
            return [];
        }
        return Array.from(// eslint-disable-next-line no-restricted-properties
        tabsRef.current.querySelectorAll(`[role=tab]:not([disabled]):not([aria-disabled='true'])`));
    };
    const handleDocumentKeydown = (event)=>{
        if (!document || !tabsRef.current || !enabled) {
            return;
        }
        const key = pressedKey(event);
        switch(key){
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'End':
            case 'Home':
                {
                    const tabEls = getTabEls();
                    const currentFocusedElIndex = tabEls.findIndex((el)=>document.activeElement === el);
                    if (currentFocusedElIndex === -1) {
                        return;
                    }
                    let nextIndex = 0;
                    if (key === 'Home') {
                        nextIndex = 0;
                    } else if (key === 'End') {
                        nextIndex = tabEls.length - 1;
                    } else {
                        const offset = (key === 'ArrowRight' ? 1 : -1) * (isRtl ? -1 : 1);
                        nextIndex = currentFocusedElIndex + offset;
                    }
                    const nextTabEl = tabEls[nextIndex];
                    if (nextTabEl) {
                        event.preventDefault();
                        nextTabEl.focus();
                    }
                    break;
                }
            /*
       В JAWS и NVDA стрелка вниз активирует контент.
       Это не прописано в стандартах, но по ссылке ниже это рекомендуется делать.
       https://inclusive-components.design/tabbed-interfaces/
      */ case 'ArrowDown':
                {
                    const tabEls = getTabEls();
                    const currentFocusedEl = tabEls.find((el)=>document.activeElement === el);
                    if (!currentFocusedEl || currentFocusedEl.getAttribute('aria-selected') !== 'true') {
                        return;
                    }
                    const relatedContentElId = currentFocusedEl.getAttribute('aria-controls');
                    if (!relatedContentElId) {
                        return;
                    }
                    // eslint-disable-next-line no-restricted-properties
                    const relatedContentEl = document.getElementById(relatedContentElId);
                    if (!relatedContentEl) {
                        return;
                    }
                    event.preventDefault();
                    relatedContentEl.focus();
                    break;
                }
            case 'Space':
            case 'Enter':
                {
                    const tabEls = getTabEls();
                    const currentFocusedEl = tabEls.find((el)=>document.activeElement === el);
                    if (currentFocusedEl) {
                        currentFocusedEl.click();
                    }
                }
        }
    };
    useGlobalEventListener(document, 'keydown', handleDocumentKeydown, {
        capture: true
    });
    return {
        tabsRef
    };
}

//# sourceMappingURL=useTabsNavigation.js.map