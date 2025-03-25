import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { setHours, setMinutes } from 'date-fns';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { Button } from '../Button/Button';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import styles from './CalendarTime.module.css';
const hours = [];
for(let i = 0; i < 24; i += 1){
    hours.push({
        value: i,
        label: String(i).padStart(2, '0')
    });
}
const minutes = [];
for(let i = 0; i < 60; i += 1){
    minutes.push({
        value: i,
        label: String(i).padStart(2, '0')
    });
}
export const CalendarTime = ({ value, onChange, onClose, changeHoursLabel, changeMinutesLabel, isDayDisabled, doneButtonText = 'Готово', doneButtonDisabled = false, doneButtonShow = true, minutesTestId, hoursTestId, doneButtonTestId })=>{
    const localHours = isDayDisabled ? hours.map((hour)=>{
        return {
            ...hour,
            disabled: isDayDisabled(setHours(value, hour.value), true)
        };
    }) : hours;
    const localMinutes = isDayDisabled ? minutes.map((minute)=>{
        return {
            ...minute,
            disabled: isDayDisabled(setMinutes(value, minute.value), true)
        };
    }) : minutes;
    const onHoursChange = React.useCallback((event)=>onChange?.(setHours(value, Number(event.target.value))), [
        onChange,
        value
    ]);
    const onMinutesChange = React.useCallback((event)=>onChange?.(setMinutes(value, Number(event.target.value))), [
        onChange,
        value
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(styles['CalendarTime'], !doneButtonShow && styles['CalendarTime__withoutDone']),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: styles['CalendarTime__picker'],
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(CustomSelect, {
                        value: value.getHours(),
                        options: localHours,
                        onChange: onHoursChange,
                        forceDropdownPortal: false,
                        "aria-label": changeHoursLabel,
                        "data-testid": hoursTestId
                    })
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles['CalendarTime__divider'],
                children: ":"
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles['CalendarTime__picker'],
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(CustomSelect, {
                        value: value.getMinutes(),
                        options: localMinutes,
                        onChange: onMinutesChange,
                        forceDropdownPortal: false,
                        "aria-label": changeMinutesLabel,
                        "data-testid": minutesTestId
                    })
                })
            }),
            doneButtonShow && /*#__PURE__*/ _jsx("div", {
                className: styles['CalendarTime__button'],
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(Button, {
                        mode: "secondary",
                        onClick: onClose,
                        size: "l",
                        disabled: doneButtonDisabled,
                        "data-testid": doneButtonTestId,
                        children: doneButtonText
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=CalendarTime.js.map