"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useExternRef", {
    enumerable: true,
    get: function() {
        return useExternRef;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _utils = require("../lib/utils");
function useExternRef(...externRefs) {
    const stableRef = _react.useRef(null);
    return _react.useMemo(()=>({
            get current () {
                return stableRef.current;
            },
            set current (el){
                stableRef.current = el;
                externRefs.forEach((ref)=>{
                    if (ref) {
                        (0, _utils.setRef)(el, ref);
                    }
                });
            }
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    externRefs);
}

//# sourceMappingURL=useExternRef.js.map