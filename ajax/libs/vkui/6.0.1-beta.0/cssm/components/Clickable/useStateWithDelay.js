import * as React from 'react';
/**
 * Возвращает значение с состоянием и функции на обновление состояния
 * без и с задержкой.
 *
 * # Пример
 *
 * ```ts
 * const [count, setCount] = useStateWithDelay(initialState);
 *
 * const click = () => {
 *   setCount(count + 1, 500)
 * }
 * ```
 */ export function useStateWithDelay(initialState, defaultDelay = 0) {
    const [value, setValue] = React.useState(initialState);
    const timeout = React.useRef();
    const setValueWithDelay = React.useCallback((newValue, delay = defaultDelay)=>{
        clearTimeout(timeout.current);
        if (delay === 0) {
            setValue(newValue);
            return;
        }
        timeout.current = setTimeout(()=>setValue(newValue), delay);
    }, [
        defaultDelay
    ]);
    return [
        value,
        setValueWithDelay
    ];
}

//# sourceMappingURL=useStateWithDelay.js.map