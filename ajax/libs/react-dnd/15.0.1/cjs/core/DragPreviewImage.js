"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragPreviewImage = void 0;
const react_1 = require("react");
/**
 * A utility for rendering a drag preview image
 */
exports.DragPreviewImage = (0, react_1.memo)(function DragPreviewImage({ connect, src }) {
    (0, react_1.useEffect)(() => {
        if (typeof Image === 'undefined')
            return;
        let connected = false;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            connect(img);
            connected = true;
        };
        return () => {
            if (connected) {
                connect(null);
            }
        };
    });
    return null;
});
