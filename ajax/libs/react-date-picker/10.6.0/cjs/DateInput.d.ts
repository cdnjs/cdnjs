/// <reference types="react" />
import type { Detail, LooseValuePiece, Value } from './shared/types.js';
type DateInputProps = {
    autoFocus?: boolean;
    className: string;
    dayAriaLabel?: string;
    dayPlaceholder?: string;
    disabled?: boolean;
    format?: string;
    isCalendarOpen?: boolean | null;
    locale?: string;
    maxDate?: Date;
    maxDetail?: Detail;
    minDate?: Date;
    monthAriaLabel?: string;
    monthPlaceholder?: string;
    name?: string;
    nativeInputAriaLabel?: string;
    onChange?: (value: Value, shouldCloseCalendar: boolean) => void;
    onInvalidChange?: () => void;
    required?: boolean;
    returnValue?: 'start' | 'end' | 'range';
    showLeadingZeros?: boolean;
    value?: LooseValuePiece;
    yearAriaLabel?: string;
    yearPlaceholder?: string;
};
export default function DateInput({ autoFocus, className, dayAriaLabel, dayPlaceholder, disabled, format, isCalendarOpen: isCalendarOpenProps, locale, maxDate, maxDetail, minDate, monthAriaLabel, monthPlaceholder, name, nativeInputAriaLabel, onChange: onChangeProps, onInvalidChange, required, returnValue, showLeadingZeros, value: valueProps, yearAriaLabel, yearPlaceholder, }: DateInputProps): JSX.Element;
export {};
