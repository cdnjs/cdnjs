import * as React from 'react';
export function useResizeTextarea(onResize, grow) {
    const elementRef = React.useRef(null);
    const currentScrollHeight = React.useRef();
    const resizeElement = React.useCallback((el)=>{
        if (grow && el.offsetParent) {
            el.style.height = '';
            el.style.height = `${el.scrollHeight}px`;
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    }, [
        grow,
        onResize
    ]);
    const resize = React.useCallback(()=>{
        const el = elementRef.current;
        if (!el) {
            /* istanbul ignore next: нет возможности воспроизвести */ return;
        }
        resizeElement(el);
    }, [
        elementRef,
        resizeElement
    ]);
    return [
        elementRef,
        resize
    ];
}

//# sourceMappingURL=useResizeTextarea.js.map