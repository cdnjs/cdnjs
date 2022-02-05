"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDrop = useDrop;
var _useRegisteredDropTarget = require("./useRegisteredDropTarget");
var _useOptionalFactory = require("../useOptionalFactory");
var _useDropTargetMonitor = require("./useDropTargetMonitor");
var _useDropTargetConnector = require("./useDropTargetConnector");
var _useCollectedProps = require("../useCollectedProps");
var _connectors = require("./connectors");
function useDrop(specArg, deps) {
    const spec = (0, _useOptionalFactory).useOptionalFactory(specArg, deps);
    const monitor = (0, _useDropTargetMonitor).useDropTargetMonitor();
    const connector = (0, _useDropTargetConnector).useDropTargetConnector(spec.options);
    (0, _useRegisteredDropTarget).useRegisteredDropTarget(spec, monitor, connector);
    return [
        (0, _useCollectedProps).useCollectedProps(spec.collect, monitor, connector),
        (0, _connectors).useConnectDropTarget(connector), 
    ];
}

//# sourceMappingURL=useDrop.js.map