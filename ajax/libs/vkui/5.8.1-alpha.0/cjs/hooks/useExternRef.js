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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _utils = require("../lib/utils");
function useExternRef() {
    for(var _len = arguments.length, externRefs = new Array(_len), _key = 0; _key < _len; _key++){
        externRefs[_key] = arguments[_key];
    }
    var stableRef = _react.useRef(null);
    return _react.useMemo(function() {
        return {
            get current () {
                return stableRef.current;
            },
            set current (el){
                stableRef.current = el;
                externRefs.forEach(function(ref) {
                    if (ref) {
                        (0, _utils.setRef)(el, ref);
                    }
                });
            }
        };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    externRefs);
}

//# sourceMappingURL=useExternRef.js.map