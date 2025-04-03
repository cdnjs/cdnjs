import * as React from "react";
function basicStateInitializer(initialArg) {
    return initialArg instanceof Function ? initialArg() : initialArg;
}
function initializer(initialArg) {
    const initialState = basicStateInitializer(initialArg);
    return [
        initialState,
        undefined
    ];
}
function basicStateReducer(state, action) {
    return action instanceof Function ? action(state) : action;
}
function reducer([prevState], action) {
    const newState = basicStateReducer(prevState, action);
    return [
        newState,
        prevState
    ];
}
/**
 * Возвращает значение с текущим и предыдущим состоянием
 *
 * # Пример
 *
 * ```ts
 * const [[count, prevCount], setCount] = useStateWithPrev(initialState);
 * ```
 */ export function useStateWithPrev(initialState) {
    return React.useReducer(reducer, undefined, ()=>initializer(initialState));
}

//# sourceMappingURL=useStateWithPrev.js.map