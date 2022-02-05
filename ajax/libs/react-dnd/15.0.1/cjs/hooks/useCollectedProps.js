"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollectedProps = void 0;
const useMonitorOutput_1 = require("./useMonitorOutput");
function useCollectedProps(collector, monitor, connector) {
    return (0, useMonitorOutput_1.useMonitorOutput)(monitor, collector || (() => ({})), () => connector.reconnect());
}
exports.useCollectedProps = useCollectedProps;
