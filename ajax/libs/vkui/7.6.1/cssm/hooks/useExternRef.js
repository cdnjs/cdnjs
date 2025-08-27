import * as React from "react";
import { setRef } from "../lib/utils.js";
class ExternalRef {
    #element = null;
    #externRefs = new Set();
    constructor(externRefs = []){
        externRefs.forEach((ref)=>{
            if (ref) {
                this.#externRefs.add(ref);
            }
        });
    }
    updateExternRefs(refs) {
        refs.forEach((ref)=>{
            if (!ref || this.#externRefs.has(ref)) {
                return;
            }
            setRef(this.#element, ref);
            this.#externRefs.add(ref);
        });
    }
    get current() {
        return this.#element;
    }
    set current(el) {
        this.#element = el;
        this.#externRefs.forEach((ref)=>setRef(el, ref));
    }
    /**
   * React проверяет наличие свойства current у объектов через hasOwnProperty
   *
   * https://github.com/facebook/react/blob/c3cdbec0a78d39b5ff7329384cb41c4573a38212/packages/react-reconciler/src/ReactFiberCommitWork.js#L1612
   */ hasOwnProperty(v) {
        return v === 'current';
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