import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
type DayInputProps = {
    maxDate?: Date;
    minDate?: Date;
    month?: string | null;
    year?: string | null;
} & Omit<React.ComponentProps<typeof Input>, 'max' | 'min' | 'name'>;
declare function DayInput({ maxDate, minDate, month, year, ...otherProps }: DayInputProps): JSX.Element;
declare namespace DayInput {
    var propTypes: {
        ariaLabel: PropTypes.Requireable<string>;
        className: PropTypes.Validator<string>;
        disabled: PropTypes.Requireable<boolean>;
        inputRef: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | Required<PropTypes.InferProps<{
            current: PropTypes.Requireable<any>;
        }>> | null | undefined>>;
        maxDate: PropTypes.Validator<Date | null | undefined>;
        minDate: PropTypes.Validator<Date | null | undefined>;
        month: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        required: PropTypes.Requireable<boolean>;
        showLeadingZeros: PropTypes.Requireable<boolean>;
        value: PropTypes.Requireable<string>;
        year: PropTypes.Requireable<string>;
    };
}
export default DayInput;
