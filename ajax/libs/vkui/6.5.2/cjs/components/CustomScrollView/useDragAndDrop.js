"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDragAndDrop", {
    enumerable: true,
    get: function() {
        return useDragAndDrop;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useEventListener = require("../../hooks/useEventListener");
const _dom = require("../../lib/dom");
const useDragAndDrop = (onDragStart, onDragMove, onDragEnd)=>{
    const { document } = (0, _dom.useDOM)();
    const [isPressed, setIsPressed] = _react.useState(false);
    const onDragEndImpl = (e)=>{
        if (!isPressed) {
            return;
        }
        e.preventDefault();
        onDragEnd(e);
        unsubscribe();
    };
    const onDragMoveImpl = (e)=>{
        if (!isPressed) {
            return;
        }
        e.preventDefault();
        onDragMove(e);
    };
    const listeners = [
        // @ts-expect-error: TS2769 ругается на тип event
        (0, _useEventListener.useEventListener)('mousemove', onDragMoveImpl),
        // @ts-expect-error: TS2769 ругается на тип event
        (0, _useEventListener.useEventListener)('mouseup', onDragEndImpl)
    ];
    function subscribe(el) {
        if (el) {
            listeners.forEach((l)=>l.add(el));
        }
    }
    function unsubscribe() {
        listeners.forEach((l)=>l.remove());
    }
    return {
        onDragStart: (e)=>{
            e.preventDefault();
            setIsPressed(true);
            onDragStart(e);
            subscribe(document);
        }
    };
};

//# sourceMappingURL=useDragAndDrop.js.map