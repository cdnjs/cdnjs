"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContext = void 0;
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var ListContext = /*#__PURE__*/React.createContext({
  toggleDrag: _vkjs.noop
});
exports.ListContext = ListContext;
//# sourceMappingURL=ListContext.js.map