import { callMultiple } from './callMultiple';
/**
 * Собирает события в callMultiple
 *
 * # Пример
 *
 * ```js
 * const handlers = mergeCalls(focusEvents, { onFocus, onBlur })
 * ```
 */ export function mergeCalls(...props) {
    const objectToArrays = props.reduce((record, obj)=>{
        Object.entries(obj).forEach(([key, value])=>{
            if (!record.hasOwnProperty(key)) {
                record[key] = [];
            }
            record[key].push(value);
        });
        return record;
    }, {});
    return Object.entries(objectToArrays).reduce((record, [key, array])=>{
        record[key] = callMultiple(...array);
        return record;
    }, {});
}

//# sourceMappingURL=mergeCalls.js.map