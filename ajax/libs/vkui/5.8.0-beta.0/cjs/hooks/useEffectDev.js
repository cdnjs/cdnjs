"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useEffectDev", {
    enumerable: true,
    get: function() {
        return useEffectDev;
    }
});
var _react = require("react");
var _vkjs = require("@vkontakte/vkjs");
var useEffectDev = process.env.NODE_ENV === "development" ? _react.useEffect : _vkjs.noop;

//# sourceMappingURL=useEffectDev.js.map