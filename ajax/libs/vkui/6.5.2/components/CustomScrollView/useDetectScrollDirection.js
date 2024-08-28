import * as React from 'react';
/**
 * Хук определяет в каком измерении происходит скролл(в горизонтальном или вертикальном)
 */ export const useDetectScrollDirection = ()=>{
    const lastScrollLeft = React.useRef(0);
    const lastScrollTop = React.useRef(0);
    return React.useCallback((event)=>{
        const { scrollTop, scrollLeft } = event.currentTarget;
        if (scrollTop !== lastScrollTop.current) {
            lastScrollTop.current = scrollTop;
            return 'vertical';
        } else if (scrollLeft !== lastScrollLeft.current) {
            lastScrollLeft.current = scrollLeft;
            return 'horizontal';
        }
        return null;
    }, []);
};

//# sourceMappingURL=useDetectScrollDirection.js.map