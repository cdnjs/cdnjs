export var callMultiple = function callMultiple() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return fns.filter(function (f) {
      return typeof f === 'function';
    }).forEach(function (f) {
      return f.apply(void 0, args);
    });
  };
};
//# sourceMappingURL=callMultiple.js.map