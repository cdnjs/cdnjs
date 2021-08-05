"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#Polyfill
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function value(predicate) {
      "use strict";

      if (this == null) {
        throw new TypeError("Array.prototype.findIndex called on null or undefined");
      }

      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];

        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }

      return -1;
    },
    enumerable: false,
    configurable: false,
    writable: false
  });
}

var _default = true;
exports.default = _default;
//# sourceMappingURL=array-findindex.js.map