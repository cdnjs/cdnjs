import { jsx as _jsx } from "react/jsx-runtime";
import { isValidNotReactFragmentElement } from "../lib/utils.js";
import { usePatchChildren } from "./usePatchChildren.js";
export const useReferenceElement = (...args)=>{
    const [children, injectProps, externRef] = args;
    const child = isValidNotReactFragmentElement(children) ? children : /*#__PURE__*/ _jsx("span", {
        children: children
    });
    const [, patchedChild] = usePatchChildren(child, injectProps, externRef);
    return patchedChild;
};

//# sourceMappingURL=useReferenceElement.js.map