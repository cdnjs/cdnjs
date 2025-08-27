'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { InputLike } from "../InputLike/InputLike.js";
const stringifyValue = (value, length)=>{
    if (value === undefined) {
        return undefined;
    }
    if (typeof value === 'string') {
        return value;
    }
    return String(value).padStart(length, '0');
};
export const NumberInputLike = ({ value, length, minValue, maxValue, readOnly, disabled, label, onKeyDown, 'aria-label': ariaLabel, ...restProps })=>{
    const stringValue = stringifyValue(value, length);
    return /*#__PURE__*/ _jsx(InputLike, {
        role: "spinbutton",
        value: stringValue,
        length: length,
        "aria-valuemin": minValue,
        "aria-valuemax": maxValue,
        "aria-valuenow": value !== undefined ? Number(value) : undefined,
        "aria-valuetext": stringValue,
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        "aria-label": label,
        label: label,
        tabIndex: readOnly ? -1 : 0,
        onKeyDown: readOnly ? undefined : onKeyDown,
        ...restProps
    });
};

//# sourceMappingURL=NumberInputLike.js.map