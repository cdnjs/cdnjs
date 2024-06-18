import * as React from 'react';
import { setRef } from '../lib/utils';
export function useExternRef(...externRefs) {
    const stableRef = React.useRef(null);
    return React.useMemo(()=>({
            get current () {
                return stableRef.current;
            },
            set current (el){
                stableRef.current = el;
                externRefs.forEach((ref)=>{
                    if (ref) {
                        setRef(el, ref);
                    }
                });
            }
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    externRefs);
}

//# sourceMappingURL=useExternRef.js.map