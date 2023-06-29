import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { isMaxDate, isMinDate } from '../shared/propTypes';
type MonthInputProps = {
    maxDate?: Date;
    minDate?: Date;
    year?: string | null;
} & Omit<React.ComponentProps<typeof Input>, 'max' | 'min' | 'name'>;
declare function MonthInput({ maxDate, minDate, year, ...otherProps }: MonthInputProps): JSX.Element;
declare namespace MonthInput {
    var propTypes: {
        ariaLabel: PropTypes.Requireable<string>;
        className: PropTypes.Validator<string>;
        disabled: PropTypes.Requireable<boolean>;
        inputRef: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | Required<PropTypes.InferProps<{
            current: PropTypes.Requireable<any>;
        }>> | null | undefined>>;
        maxDate: typeof isMaxDate;
        minDate: typeof isMinDate;
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
export default MonthInput;
