"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDrag = useDrag;
var _useRegisteredDragSourceJs = require("./useRegisteredDragSource.js");
var _useOptionalFactoryJs = require("../useOptionalFactory.js");
var _useDragSourceMonitorJs = require("./useDragSourceMonitor.js");
var _useDragSourceConnectorJs = require("./useDragSourceConnector.js");
var _useCollectedPropsJs = require("../useCollectedProps.js");
var _connectorsJs = require("./connectors.js");
var _invariant = require("@react-dnd/invariant");
function useDrag(specArg, deps) {
    const spec = (0, _useOptionalFactoryJs).useOptionalFactory(specArg, deps);
    (0, _invariant).invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
    const monitor = (0, _useDragSourceMonitorJs).useDragSourceMonitor();
    const connector = (0, _useDragSourceConnectorJs).useDragSourceConnector(spec.options, spec.previewOptions);
    (0, _useRegisteredDragSourceJs).useRegisteredDragSource(spec, monitor, connector);
    return [
        (0, _useCollectedPropsJs).useCollectedProps(spec.collect, monitor, connector),
        (0, _connectorsJs).useConnectDragSource(connector),
        (0, _connectorsJs).useConnectDragPreview(connector), 
    ];
}

//# sourceMappingURL=useDrag.js.map