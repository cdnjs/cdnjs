import React from 'react';
import Input from './Input.js';
type YearInputProps = {
    maxDate?: Date;
    minDate?: Date;
    placeholder?: string;
    valueType?: 'century' | 'decade' | 'year' | 'month' | 'day';
} & Omit<React.ComponentProps<typeof Input>, 'max' | 'min' | 'name'>;
export default function YearInput({ maxDate, minDate, placeholder, valueType, ...otherProps }: YearInputProps): JSX.Element;
export {};
