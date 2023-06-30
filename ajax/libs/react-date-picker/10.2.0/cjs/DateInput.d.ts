/// <reference types="react" />
import PropTypes from 'prop-types';
import { isMaxDate, isMinDate } from './shared/propTypes';
import type { Detail, LooseValuePiece, Value } from './shared/types';
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
declare function DateInput({ autoFocus, className, dayAriaLabel, dayPlaceholder, disabled, format, isCalendarOpen: isCalendarOpenProps, locale, maxDate, maxDetail, minDate, monthAriaLabel, monthPlaceholder, name, nativeInputAriaLabel, onChange: onChangeProps, onInvalidChange, required, returnValue, showLeadingZeros, value: valueProps, yearAriaLabel, yearPlaceholder, }: DateInputProps): JSX.Element;
declare namespace DateInput {
    var propTypes: {
        autoFocus: PropTypes.Requireable<boolean>;
        className: PropTypes.Validator<string>;
        dayAriaLabel: PropTypes.Requireable<string>;
        dayPlaceholder: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        format: PropTypes.Requireable<string>;
        isCalendarOpen: PropTypes.Requireable<boolean>;
        locale: PropTypes.Requireable<string>;
        maxDate: typeof isMaxDate;
        maxDetail: PropTypes.Requireable<"month" | "year" | "century" | "decade">;
        minDate: typeof isMinDate;
        monthAriaLabel: PropTypes.Requireable<string>;
        monthPlaceholder: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        nativeInputAriaLabel: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        required: PropTypes.Requireable<boolean>;
        returnValue: PropTypes.Requireable<string>;
        showLeadingZeros: PropTypes.Requireable<boolean>;
        value: PropTypes.Requireable<NonNullable<string | Date | null | undefined>>;
        yearAriaLabel: PropTypes.Requireable<string>;
        yearPlaceholder: PropTypes.Requireable<string>;
    };
}
export default DateInput;
