import * as React from "react";
import { isFunction, noop } from "@vkontakte/vkjs";
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
 *
 * Есть возможность передать функцию-обработчик, которая будет
 * вызвана сразу после вызова setState с новым значением стейта
 * в качестве аргумента.
 *
 * ```ts
 * const onCountChange = React.useCallback((count) => {
 *   // обработчик нового значения count
 *   // будет вызван через 500мс
 * }, []);
 *
 *
 * const [count, setCount] = useStateWithDelay(initialState, 0, onCountChange);
 *
 * const click = () => {
 *   setCount(count + 1, 500)
 * }
 * ```
 */ export function useStateWithDelay(initialState, defaultDelay = 0, onStateChange = noop) {
    const [value, setValue] = React.useState(initialState);
    const timeout = React.useRef(undefined);
    const handleSetValue = React.useCallback((nextValue)=>{
        if (isFunction(nextValue)) {
            setValue((prevValue)=>{
                const value = nextValue(prevValue);
                onStateChange(value);
                return value;
            });
        } else {
            setValue(nextValue);
            onStateChange(nextValue);
        }
    }, [
        onStateChange
    ]);
    const setValueWithDelay = React.useCallback((newValue, delay = defaultDelay)=>{
        clearTimeout(timeout.current);
        if (delay === 0) {
            handleSetValue(newValue);
            return;
        }
        timeout.current = setTimeout(()=>handleSetValue(newValue), delay);
    }, [
        defaultDelay,
        handleSetValue
    ]);
    return [
        value,
        setValueWithDelay
    ];
}

//# sourceMappingURL=useStateWithDelay.js.map