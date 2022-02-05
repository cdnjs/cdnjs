"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDrag = useDrag;
var _useRegisteredDragSource = require("./useRegisteredDragSource");
var _useOptionalFactory = require("../useOptionalFactory");
var _useDragSourceMonitor = require("./useDragSourceMonitor");
var _useDragSourceConnector = require("./useDragSourceConnector");
var _useCollectedProps = require("../useCollectedProps");
var _connectors = require("./connectors");
var _invariant = require("@react-dnd/invariant");
function useDrag(specArg, deps) {
    const spec = (0, _useOptionalFactory).useOptionalFactory(specArg, deps);
    (0, _invariant).invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
    const monitor = (0, _useDragSourceMonitor).useDragSourceMonitor();
    const connector = (0, _useDragSourceConnector).useDragSourceConnector(spec.options, spec.previewOptions);
    (0, _useRegisteredDragSource).useRegisteredDragSource(spec, monitor, connector);
    return [
        (0, _useCollectedProps).useCollectedProps(spec.collect, monitor, connector),
        (0, _connectors).useConnectDragSource(connector),
        (0, _connectors).useConnectDragPreview(connector), 
    ];
}

//# sourceMappingURL=useDrag.js.map