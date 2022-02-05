"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectDropTarget = void 0;
const react_1 = require("react");
function useConnectDropTarget(connector) {
    return (0, react_1.useMemo)(() => connector.hooks.dropTarget(), [connector]);
}
exports.useConnectDropTarget = useConnectDropTarget;
