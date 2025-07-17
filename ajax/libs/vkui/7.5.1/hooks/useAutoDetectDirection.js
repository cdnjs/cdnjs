import * as React from "react";
import { useDOM } from "../lib/dom.js";
export const useAutoDetectDirection = (directionProp)=>{
    const { window, document } = useDOM();
    return React.useMemo(()=>{
        if (directionProp) {
            return directionProp;
        }
        if (!window || !document) {
            return 'ltr';
        }
        const styleDeclaration = window.getComputedStyle(document.body);
        return styleDeclaration.direction || 'ltr';
    }, [
        directionProp,
        document,
        window
    ]);
};

//# sourceMappingURL=useAutoDetectDirection.js.map