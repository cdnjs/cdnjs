"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollectedProps = useCollectedProps;

var _useMonitorOutput = require("./useMonitorOutput");

function useCollectedProps(collector, monitor, connector) {
  return (0, _useMonitorOutput.useMonitorOutput)(monitor, collector || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
}