"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEffectDev = void 0;
var _react = require("react");
var _vkjs = require("@vkontakte/vkjs");
var useEffectDev = process.env.NODE_ENV === 'development' ? _react.useEffect : _vkjs.noop;
exports.useEffectDev = useEffectDev;
//# sourceMappingURL=useEffectDev.js.map