import * as React from "react";
/**
 * Хук счетчика с возможностью задания начального значения и увеличения/уменьшения на 1.
 */ export function useCounter(initialValue = 0) {
    const [count, setCount] = React.useState(initialValue);
    const increment = React.useCallback(()=>setCount((x)=>x + 1), []);
    const decrement = React.useCallback(()=>setCount((x)=>x - 1), []);
    return {
        count,
        increment,
        decrement,
        setCount
    };
}

//# sourceMappingURL=useCounter.js.map