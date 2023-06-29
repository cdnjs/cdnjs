import React from 'react';
import PropTypes from 'prop-types';
import { isMaxDate, isMinDate } from '../shared/propTypes';
type MonthSelectProps = {
    ariaLabel?: string;
    autoFocus?: boolean;
    className: string;
    disabled?: boolean;
    inputRef?: React.RefObject<HTMLSelectElement>;
    locale?: string;
    maxDate?: Date;
    minDate?: Date;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement> & {
        target: HTMLSelectElement;
    }) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLSelectElement> & {
        target: HTMLSelectElement;
    }) => void;
    placeholder?: string;
    required?: boolean;
    short?: boolean;
    value?: string | null;
    year?: string | null;
};
declare function MonthSelect({ ariaLabel, autoFocus, className, disabled, inputRef, locale, maxDate, minDate, onChange, onKeyDown, placeholder, required, short, value, year, }: MonthSelectProps): JSX.Element;
declare namespace MonthSelect {
    var propTypes: {
        ariaLabel: PropTypes.Requireable<string>;
        autoFocus: PropTypes.Requireable<boolean>;
        className: PropTypes.Validator<string>;
        disabled: PropTypes.Requireable<boolean>;
        inputRef: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | Required<PropTypes.InferProps<{
            current: PropTypes.Requireable<any>;
        }>> | null | undefined>>;
        locale: PropTypes.Requireable<string>;
        maxDate: typeof isMaxDate;
        minDate: typeof isMinDate;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        required: PropTypes.Requireable<boolean>;
        short: PropTypes.Requireable<boolean>;
        value: PropTypes.Requireable<string>;
        year: PropTypes.Requireable<string>;
    };
}
export default MonthSelect;
