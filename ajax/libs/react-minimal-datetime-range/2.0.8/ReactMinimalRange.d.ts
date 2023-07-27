import React from 'react';
import './react-minimal-datetime-range.css';
export interface CalendarPickerProps {
    show?: boolean;
    locale?: string;
    allowPageClickToClose?: boolean;
    defaultDate?: string;
    style?: React.CSSProperties;
    defaultTimes?: Array<string>;
    enableTimeSelection?: boolean;
    markedDates?: Array<string>;
    supportDateRange?: Array<string>;
    duration?: number;
    onClose?: () => void;
    onYearPicked?: (res: object) => void;
    onMonthPicked?: (res: object) => void;
    onDatePicked?: (res: object) => void;
    onResetDate?: (res: object) => void;
    onResetDefaultDate?: (res: object) => void;
    handleChooseHourPick?: (res: Array<string>) => void;
    handleChooseMinutePick?: (res: Array<string>) => void;
}
export declare const CalendarPicker: React.FC<CalendarPickerProps>;
export interface RangePickerProps {
    show?: boolean;
    disabled?: boolean;
    locale?: string;
    allowPageClickToClose?: boolean;
    showOnlyTime?: boolean;
    defaultDate?: string;
    placeholder?: Array<string>;
    defaultDates?: Array<string>;
    defaultTimes?: Array<string>;
    initialDates?: Array<string>;
    initialTimes?: Array<string>;
    enableTimeSelection?: boolean;
    markedDates?: Array<string>;
    supportDateRange?: Array<string>;
    duration?: number;
    style?: React.CSSProperties;
    onConfirm?: (res: Array<string>) => void;
    onClear?: () => void;
    onClose?: () => void;
}
export declare const RangePicker: React.FC<RangePickerProps>;
