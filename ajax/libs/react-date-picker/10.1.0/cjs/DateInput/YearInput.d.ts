import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { isMaxDate, isMinDate } from '../shared/propTypes';
type YearInputProps = {
    maxDate?: Date;
    minDate?: Date;
    placeholder?: string;
    valueType?: 'century' | 'decade' | 'year' | 'month' | 'day';
} & Omit<React.ComponentProps<typeof Input>, 'max' | 'min' | 'name'>;
declare function YearInput({ maxDate, minDate, placeholder, valueType, ...otherProps }: YearInputProps): JSX.Element;
declare namespace YearInput {
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
        value: PropTypes.Requireable<string>;
        valueType: PropTypes.Requireable<string>;
    };
}
export default YearInput;
