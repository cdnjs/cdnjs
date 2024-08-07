"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScrollY", {
    enumerable: true,
    get: function() {
        return ScrollY;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _utils = require("../../lib/utils");
const _useDragAndDrop = require("./useDragAndDrop");
const _useVerticalScrollController = require("./useVerticalScrollController");
const ScrollY = ({ barHandlers, boxRef, autoHideScrollbar, autoHideScrollbarDelay })=>{
    const { barRef: barY, trackerVisible: verticalTrackerVisible, trackerRef: trackerY, resize: verticalScrollResize, scroll: verticalScroll, dragStart: onVerticalDragStart, dragging: onVerticalDragging, dragEnd: onVerticalDragEnd, trackerMouseEnter: onVerticalTrackerMouseEnter, trackerMouseLeave: onVerticalTrackerMouseLeave } = (0, _useVerticalScrollController.useVerticalScrollController)(boxRef, autoHideScrollbar, autoHideScrollbarDelay);
    const { onDragStart: onMouseDown } = (0, _useDragAndDrop.useDragAndDrop)(onVerticalDragStart, onVerticalDragging, onVerticalDragEnd);
    _react.useImperativeHandle(barHandlers, ()=>({
            resize: verticalScrollResize,
            scroll: verticalScroll
        }), [
        verticalScrollResize,
        verticalScroll
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: "vkuiCustomScrollView__barY",
        ref: barY,
        onClick: _utils.stopPropagation,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            className: (0, _vkjs.classNames)("vkuiCustomScrollView__trackerY", !verticalTrackerVisible && "vkuiCustomScrollView__trackerY--hidden"),
            onMouseEnter: autoHideScrollbar ? onVerticalTrackerMouseEnter : undefined,
            onMouseLeave: autoHideScrollbar ? onVerticalTrackerMouseLeave : undefined,
            ref: trackerY,
            onMouseDown: onMouseDown
        })
    });
};

//# sourceMappingURL=ScrollY.js.map