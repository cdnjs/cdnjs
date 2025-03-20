"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScrollX", {
    enumerable: true,
    get: function() {
        return ScrollX;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _utils = require("../../lib/utils");
const _useDragAndDrop = require("./useDragAndDrop");
const _useHorizontalScrollController = require("./useHorizontalScrollController");
const ScrollX = ({ barHandlers, boxRef, autoHideScrollbar, autoHideScrollbarDelay })=>{
    const { barRef: barX, trackerVisible: horizontalTrackerVisible, trackerRef: trackerX, resize: horizontalScrollResize, scroll: horizontalScroll, dragStart: onHorizontalDragStart, dragging: onHorizontalDragging, dragEnd: onHorizontalDragEnd, trackerMouseEnter: onHorizontalTrackerMouseEnter, trackerMouseLeave: onHorizontalTrackerMouseLeave } = (0, _useHorizontalScrollController.useHorizontalScrollController)(boxRef, autoHideScrollbar, autoHideScrollbarDelay);
    const { onDragStart: onMouseDown } = (0, _useDragAndDrop.useDragAndDrop)(onHorizontalDragStart, onHorizontalDragging, onHorizontalDragEnd);
    _react.useImperativeHandle(barHandlers, ()=>({
            resize: horizontalScrollResize,
            scroll: horizontalScroll
        }), [
        horizontalScrollResize,
        horizontalScroll
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: "vkuiCustomScrollView__barX",
        ref: barX,
        onClick: _utils.stopPropagation,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            className: (0, _vkjs.classNames)("vkuiCustomScrollView__trackerX", !horizontalTrackerVisible && "vkuiCustomScrollView__trackerX--hidden"),
            onMouseEnter: autoHideScrollbar ? onHorizontalTrackerMouseEnter : undefined,
            onMouseLeave: autoHideScrollbar ? onHorizontalTrackerMouseLeave : undefined,
            ref: trackerX,
            onMouseDown: onMouseDown
        })
    });
};

//# sourceMappingURL=ScrollX.js.map