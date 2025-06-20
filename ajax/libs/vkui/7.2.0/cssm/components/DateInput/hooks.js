import * as React from "react";
import { convertDateFromTimeZone, convertDateToTimeZone } from "../../lib/date.js";
const _convertDateToTimeZone = (date, timezone)=>{
    return convertDateToTimeZone(date, timezone) || undefined;
};
const _convertDateFromTimeZone = (date, timezone)=>{
    return convertDateFromTimeZone(date, timezone) || undefined;
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
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(getStateValue(undefined, value, defaultValue, timezone));
    const lastUpdatedValueRef = React.useRef(getStateValue(undefined, value, defaultValue, timezone));
    React.useEffect(()=>{
        if (isControlled) {
            setInternalValue(_convertDateToTimeZone(value, timezone));
            lastUpdatedValueRef.current = _convertDateToTimeZone(value, timezone);
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
        onChange?.(originalTimezoneValue);
        return originalTimezoneValue;
    }, [
        isControlled,
        onChange,
        timezone
    ]);
    return {
        value: internalValue,
        updateValue,
        setInternalValue,
        getLastUpdatedValue
    };
};

//# sourceMappingURL=hooks.js.map