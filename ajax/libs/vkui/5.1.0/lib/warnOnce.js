export function warnOnce(zone) {
  var didWarn = new Set();
  return function (message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warn';
    if (!didWarn.has(message)) {
      didWarn.add(message);
      var formattedMessage = "%c[VKUI/".concat(zone, "] ").concat(message);
      var styles = type === 'log' ? 'color: steelblue; font-style: italic' : undefined;
      console[type](formattedMessage, styles);
    }
  };
}
//# sourceMappingURL=warnOnce.js.map