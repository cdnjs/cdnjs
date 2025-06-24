/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { convertDateFromTimeZone, convertDateToTimeZone } from "../../lib/date.js";
const _convertDateToTimeZone = (date, timezone)=>{
    return convertDateToTimeZone(date, timezone) || null;
};
const _convertDateFromTimeZone = (date, timezone)=>{
    return convertDateFromTimeZone(date, timezone);
};
const getStateValue = (defaultStateValue, value, defaultValue, timezone)=>{
    if (value !== undefined) {
        return _convertDateToTimeZone(value, timezone);
    }
    if (defaultValue !== undefined) {
        return _convertDateToTimeZone(defaultValue, timezone);
    }
    return _convertDateToTimeZone(defaultStateValue, timezone);
};
export const useDateInputValue = ({ value, defaultValue, onChange, timezone })=>{
    const [internalValue, setInternalValue] = React.useState(getStateValue(null, value, defaultValue, timezone));
    const lastUpdatedValueRef = React.useRef(getStateValue(null, value, defaultValue, timezone));
    const isControlled = value !== undefined;
    React.useEffect(()=>{
        if (isControlled) {
            const newInternalValue = _convertDateToTimeZone(value, timezone);
            setInternalValue(newInternalValue);
            lastUpdatedValueRef.current = newInternalValue;
        }
    }, [
        isControlled,
        timezone,
        value
    ]);
    const getLastUpdatedValue = React.useCallback(()=>lastUpdatedValueRef.current, []);
    const updateValue = React.useCallback((newValue)=>{
        if (!isControlled) {
            setInternalValue(newValue);
            lastUpdatedValueRef.current = newValue;
        }
        const originalTimezoneValue = _convertDateFromTimeZone(newValue, timezone);
        onChange === null || onChange === void 0 ? void 0 : onChange(originalTimezoneValue);
        return originalTimezoneValue;
    }, [
        isControlled,
        onChange,
        timezone
    ]);
    const clearValue = ()=>{
        setInternalValue(null);
        lastUpdatedValueRef.current = null;
        onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
    };
    return {
        value: internalValue,
        updateValue,
        setInternalValue,
        getLastUpdatedValue,
        clearValue
    };
};

//# sourceMappingURL=hooks.js.map