"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccordionContext", {
    enumerable: true,
    get: function() {
        return AccordionContext;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const AccordionContext = /*#__PURE__*/ _react.createContext({
    labelId: '',
    contentId: '',
    expanded: false,
    onChange: _vkjs.noop
});

//# sourceMappingURL=AccordionContext.js.map