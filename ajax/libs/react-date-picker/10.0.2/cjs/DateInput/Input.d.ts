import React from 'react';
import PropTypes from 'prop-types';
type InputProps = {
    ariaLabel?: string;
    autoFocus?: boolean;
    className?: string;
    disabled?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    max: number;
    min: number;
    name: string;
    nameForClass?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> & {
        target: HTMLInputElement;
    }) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement> & {
        target: HTMLInputElement;
    }) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement> & {
        target: HTMLInputElement;
    }) => void;
    placeholder?: string;
    required?: boolean;
    showLeadingZeros?: boolean;
    step?: number;
    value?: string | null;
};
declare function Input({ ariaLabel, autoFocus, className, disabled, inputRef, max, min, name, nameForClass, onChange, onKeyDown, onKeyUp, placeholder, required, showLeadingZeros, step, value, }: InputProps): JSX.Element;
declare namespace Input {
    var propTypes: {
        ariaLabel: PropTypes.Requireable<string>;
        autoFocus: PropTypes.Requireable<boolean>;
        className: PropTypes.Validator<string>;
        disabled: PropTypes.Requireable<boolean>;
        inputRef: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.InferProps<{
            current: PropTypes.Requireable<any>;
        }> | null | undefined>>;
        max: PropTypes.Requireable<number>;
        min: PropTypes.Requireable<number>;
        name: PropTypes.Requireable<string>;
        nameForClass: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        required: PropTypes.Requireable<boolean>;
        showLeadingZeros: PropTypes.Requireable<boolean>;
        step: PropTypes.Requireable<number>;
        value: PropTypes.Requireable<string>;
    };
}
export default Input;
