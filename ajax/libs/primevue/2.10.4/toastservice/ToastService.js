"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ToastEventBus = _interopRequireDefault(require("./ToastEventBus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ToastService = {
  install: function install(Vue) {
    Vue.prototype.$toast = {
      add: function add(message) {
        _ToastEventBus.default.$emit('add', message);
      },
      removeGroup: function removeGroup(group) {
        _ToastEventBus.default.$emit('remove-group', group);
      },
      removeAllGroups: function removeAllGroups() {
        _ToastEventBus.default.$emit('remove-all-groups');
      }
    };
  }
};
var _default = exports.default = ToastService;
