"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragPreviewImage = void 0;
var _react = require("react");
const DragPreviewImage = (0, _react).memo(function DragPreviewImage({ connect , src  }) {
    (0, _react).useEffect(()=>{
        if (typeof Image === 'undefined') return;
        let connected = false;
        const img = new Image();
        img.src = src;
        img.onload = ()=>{
            connect(img);
            connected = true;
        };
        return ()=>{
            if (connected) {
                connect(null);
            }
        };
    });
    return null;
});
exports.DragPreviewImage = DragPreviewImage;

//# sourceMappingURL=DragPreviewImage.js.map