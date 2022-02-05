"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectDragPreview = exports.useConnectDragSource = void 0;
const react_1 = require("react");
function useConnectDragSource(connector) {
    return (0, react_1.useMemo)(() => connector.hooks.dragSource(), [connector]);
}
exports.useConnectDragSource = useConnectDragSource;
function useConnectDragPreview(connector) {
    return (0, react_1.useMemo)(() => connector.hooks.dragPreview(), [connector]);
}
exports.useConnectDragPreview = useConnectDragPreview;
