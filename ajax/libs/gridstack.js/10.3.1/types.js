/**
 * types.ts 10.3.1
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
// default values for grid options - used during init and when saving out
export const gridDefaults = {
    alwaysShowResizeHandle: 'mobile',
    animate: true,
    auto: true,
    cellHeight: 'auto',
    cellHeightThrottle: 100,
    cellHeightUnit: 'px',
    column: 12,
    draggable: { handle: '.grid-stack-item-content', appendTo: 'body', scroll: true },
    handle: '.grid-stack-item-content',
    itemClass: 'grid-stack-item',
    margin: 10,
    marginUnit: 'px',
    maxRow: 0,
    minRow: 0,
    placeholderClass: 'grid-stack-placeholder',
    placeholderText: '',
    removableOptions: { accept: 'grid-stack-item', decline: 'grid-stack-non-removable' },
    resizable: { handles: 'se' },
    rtl: 'auto',
    // **** same as not being set ****
    // disableDrag: false,
    // disableResize: false,
    // float: false,
    // handleClass: null,
    // removable: false,
    // staticGrid: false,
    // styleInHead: false,
    //removable
};
/** default dragIn options */
export const dragInDefaultOptions = {
    handle: '.grid-stack-item-content',
    appendTo: 'body',
    // revert: 'invalid',
    // scroll: false,
};
//# sourceMappingURL=types.js.map