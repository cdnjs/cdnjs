export function warnOnce(zone) {
  var didWarn = {};
  return function (message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "warn";
    if (!didWarn[message]) {
      console[type]("[VKUI/".concat(zone, "] ").concat(message));
      didWarn[message] = true;
    }
  };
}
//# sourceMappingURL=warnOnce.js.map