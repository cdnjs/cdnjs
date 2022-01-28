"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicConfigAPI = exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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