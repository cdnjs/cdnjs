import * as React from "react";
/* eslint-enable jsdoc/require-jsdoc */ export function useScrollListController() {
    const scrollBoxRef = React.useRef(null);
    const optionsWrapperRef = React.useRef(null);
    const scrollToElement = React.useCallback((index, center = false)=>{
        const dropdown = scrollBoxRef.current;
        const optionsWrapper = optionsWrapperRef.current;
        if (!dropdown || !optionsWrapper || index < 0 || index > optionsWrapper.children.length) {
            return;
        }
        const item = optionsWrapper.children[index];
        /* istanbul ignore if: проверка для TS (ситуация, когда среди children нет элемента с index, маловероятна) */ if (!item) {
            return;
        }
        const dropdownHeight = dropdown.offsetHeight;
        const scrollTop = dropdown.scrollTop;
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    }, [
        optionsWrapperRef,
        scrollBoxRef
    ]);
    return {
        scrollToElement,
        scrollBoxRef,
        optionsWrapperRef
    };
}

//# sourceMappingURL=useScrollListController.js.map