"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ConfirmationEventBus = _interopRequireDefault(require("../confirmationeventbus/ConfirmationEventBus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ConfirmationService = {
  install: function install(Vue) {
    Vue.prototype.$confirm = {
      require: function require(options) {
        _ConfirmationEventBus.default.emit('confirm', options);
      },
      close: function close() {
        _ConfirmationEventBus.default.emit('close');
      }
    };
  }
};
var _default = exports.default = ConfirmationService;
