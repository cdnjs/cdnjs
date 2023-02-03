"use strict";
/**
 * types.ts 7.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dragInDefaultOptions = exports.gridDefaults = void 0;
// default values for grid options - used during init and when saving out
exports.gridDefaults = {
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
    oneColumnSize: 768,
    placeholderClass: 'grid-stack-placeholder',
    placeholderText: '',
    removableOptions: { accept: '.grid-stack-item' },
    resizable: { handles: 'se' },
    rtl: 'auto',
};
/** default dragIn options */
exports.dragInDefaultOptions = {
    handle: '.grid-stack-item-content',
    appendTo: 'body',
};
//# sourceMappingURL=types.js.map