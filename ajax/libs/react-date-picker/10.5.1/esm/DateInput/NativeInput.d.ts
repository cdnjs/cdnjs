import React from 'react';
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
export default function NativeInput({ ariaLabel, disabled, maxDate, minDate, name, onChange, required, value, valueType, }: NativeInputProps): JSX.Element;
export {};
