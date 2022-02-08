"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDrop = useDrop;
var _useRegisteredDropTargetJs = require("./useRegisteredDropTarget.js");
var _useOptionalFactoryJs = require("../useOptionalFactory.js");
var _useDropTargetMonitorJs = require("./useDropTargetMonitor.js");
var _useDropTargetConnectorJs = require("./useDropTargetConnector.js");
var _useCollectedPropsJs = require("../useCollectedProps.js");
var _connectorsJs = require("./connectors.js");
function useDrop(specArg, deps) {
    const spec = (0, _useOptionalFactoryJs).useOptionalFactory(specArg, deps);
    const monitor = (0, _useDropTargetMonitorJs).useDropTargetMonitor();
    const connector = (0, _useDropTargetConnectorJs).useDropTargetConnector(spec.options);
    (0, _useRegisteredDropTargetJs).useRegisteredDropTarget(spec, monitor, connector);
    return [
        (0, _useCollectedPropsJs).useCollectedProps(spec.collect, monitor, connector),
        (0, _connectorsJs).useConnectDropTarget(connector), 
    ];
}

//# sourceMappingURL=useDrop.js.map