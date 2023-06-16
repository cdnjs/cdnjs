import React from 'react';
import PropTypes from 'prop-types';
import { isMaxDate, isMinDate } from '../shared/propTypes';
type NativeInputProps = {
    ariaLabel?: string;
    disabled?: boolean;
    maxDate?: Date;
    minDate?: Date;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    value?: Date | null;
    valueType: 'century' | 'decade' | 'year' | 'month' | 'day';
};
declare function NativeInput({ ariaLabel, disabled, maxDate, minDate, name, onChange, required, value, valueType, }: NativeInputProps): JSX.Element;
declare namespace NativeInput {
    var propTypes: {
        ariaLabel: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        maxDate: typeof isMaxDate;
        minDate: typeof isMinDate;
        name: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        required: PropTypes.Requireable<boolean>;
        value: PropTypes.Requireable<Date>;
        valueType: PropTypes.Requireable<string>;
    };
}
export default NativeInput;
