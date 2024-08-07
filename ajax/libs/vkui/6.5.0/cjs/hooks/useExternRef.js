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
const _class_private_field_get = require("@swc/helpers/_/_class_private_field_get");
const _class_private_field_init = require("@swc/helpers/_/_class_private_field_init");
const _class_private_field_set = require("@swc/helpers/_/_class_private_field_set");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _utils = require("../lib/utils");
var _element = /*#__PURE__*/ new WeakMap(), _externRefs = /*#__PURE__*/ new WeakMap();
class ExternalRef {
    updateExternRefs(refs) {
        refs.forEach((ref)=>{
            if (!ref || _class_private_field_get._(this, _externRefs).has(ref)) {
                return;
            }
            (0, _utils.setRef)(_class_private_field_get._(this, _element), ref);
            _class_private_field_get._(this, _externRefs).add(ref);
        });
    }
    get current() {
        return _class_private_field_get._(this, _element);
    }
    set current(el) {
        _class_private_field_set._(this, _element, el);
        _class_private_field_get._(this, _externRefs).forEach((ref)=>(0, _utils.setRef)(el, ref));
    }
    /**
   * React проверяет наличие свойства current у объектов через hasOwnProperty
   *
   * https://github.com/facebook/react/blob/c3cdbec0a78d39b5ff7329384cb41c4573a38212/packages/react-reconciler/src/ReactFiberCommitWork.js#L1612
   */ hasOwnProperty(v) {
        return v === 'current';
    }
    constructor(externRefs = []){
        _class_private_field_init._(this, _element, {
            writable: true,
            value: null
        });
        _class_private_field_init._(this, _externRefs, {
            writable: true,
            value: new Set()
        });
        externRefs.forEach((ref)=>{
            if (ref) {
                _class_private_field_get._(this, _externRefs).add(ref);
            }
        });
    }
}
function useExternRef(...externRefs) {
    const ref = _react.useRef(null);
    if (ref.current === null) {
        ref.current = new ExternalRef(externRefs);
    } else {
        ref.current.updateExternRefs(externRefs);
    }
    return ref.current;
}

//# sourceMappingURL=useExternRef.js.map