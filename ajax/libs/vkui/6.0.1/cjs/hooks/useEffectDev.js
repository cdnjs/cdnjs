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
const _react = require("react");
const _vkjs = require("@vkontakte/vkjs");
const useEffectDev = process.env.NODE_ENV === 'development' ? _react.useEffect : _vkjs.noop;

//# sourceMappingURL=useEffectDev.js.map