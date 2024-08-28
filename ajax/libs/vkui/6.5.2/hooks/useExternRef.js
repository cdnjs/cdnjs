import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import * as React from 'react';
import { setRef } from '../lib/utils';
var _element = /*#__PURE__*/ new WeakMap(), _externRefs = /*#__PURE__*/ new WeakMap();
class ExternalRef {
    updateExternRefs(refs) {
        refs.forEach((ref)=>{
            if (!ref || _class_private_field_get(this, _externRefs).has(ref)) {
                return;
            }
            setRef(_class_private_field_get(this, _element), ref);
            _class_private_field_get(this, _externRefs).add(ref);
        });
    }
    get current() {
        return _class_private_field_get(this, _element);
    }
    set current(el) {
        _class_private_field_set(this, _element, el);
        _class_private_field_get(this, _externRefs).forEach((ref)=>setRef(el, ref));
    }
    /**
   * React проверяет наличие свойства current у объектов через hasOwnProperty
   *
   * https://github.com/facebook/react/blob/c3cdbec0a78d39b5ff7329384cb41c4573a38212/packages/react-reconciler/src/ReactFiberCommitWork.js#L1612
   */ hasOwnProperty(v) {
        return v === 'current';
    }
    constructor(externRefs = []){
        _class_private_field_init(this, _element, {
            writable: true,
            value: null
        });
        _class_private_field_init(this, _externRefs, {
            writable: true,
            value: new Set()
        });
        externRefs.forEach((ref)=>{
            if (ref) {
                _class_private_field_get(this, _externRefs).add(ref);
            }
        });
    }
}
export function useExternRef(...externRefs) {
    const ref = React.useRef(null);
    if (ref.current === null) {
        ref.current = new ExternalRef(externRefs);
    } else {
        ref.current.updateExternRefs(externRefs);
    }
    return ref.current;
}

//# sourceMappingURL=useExternRef.js.map