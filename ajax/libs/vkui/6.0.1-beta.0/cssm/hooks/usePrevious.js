import * as React from 'react';
export function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(()=>{
        ref.current = value;
    });
    return ref.current;
}

//# sourceMappingURL=usePrevious.js.map