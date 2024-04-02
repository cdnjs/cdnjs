"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPortal", {
    enumerable: true,
    get: function() {
        return createPortal;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _reactdom = /*#__PURE__*/ _interop_require_wildcard._(require("react-dom"));
const _dom = require("./dom");
const createPortal = (children, container, key)=>{
    const resolvedContainer = container ? container : (0, _dom.getDocumentBody)();
    return resolvedContainer && _reactdom.createPortal(children, resolvedContainer, key);
};

//# sourceMappingURL=createPortal.js.map