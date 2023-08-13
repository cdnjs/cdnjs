"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PublicConfigAPI = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var config = {
  warnings: {
    fallbackImage: true,
    sizesAttribute: true,
    invalidARFormat: true
  }
};
var _setWarning = function _setWarning(name, value) {
  if (!name || !(name in config.warnings)) {
    return;
  }
  config.warnings[name] = value;
};
var PublicConfigAPI = /*#__PURE__*/function () {
  function PublicConfigAPI() {
    _classCallCheck(this, PublicConfigAPI);
  }
  _createClass(PublicConfigAPI, null, [{
    key: "disableWarning",
    value: function disableWarning(name) {
      _setWarning(name, false);
    }
  }, {
    key: "enableWarning",
    value: function enableWarning(name) {
      _setWarning(name, true);
    }
  }]);
  return PublicConfigAPI;
}();
exports.PublicConfigAPI = PublicConfigAPI;
var _default = config;
exports.default = _default;
//# sourceMappingURL=config.js.map