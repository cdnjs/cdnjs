import React from 'react';
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
export default function Input({ ariaLabel, autoFocus, className, disabled, inputRef, max, min, name, nameForClass, onChange, onKeyDown, onKeyUp, placeholder, required, showLeadingZeros, step, value, }: InputProps): JSX.Element;
export {};
