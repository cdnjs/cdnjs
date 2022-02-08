"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useCollectedProps = useCollectedProps;
var _useMonitorOutputJs = require("./useMonitorOutput.js");
function useCollectedProps(collector, monitor, connector) {
    return (0, _useMonitorOutputJs).useMonitorOutput(monitor, collector || (()=>({})
    ), ()=>connector.reconnect()
    );
}

//# sourceMappingURL=useCollectedProps.js.map