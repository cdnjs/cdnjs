import React from 'react';
import Input from './Input.js';
type MonthInputProps = {
    maxDate?: Date;
    minDate?: Date;
    year?: string | null;
} & Omit<React.ComponentProps<typeof Input>, 'max' | 'min' | 'name'>;
export default function MonthInput({ maxDate, minDate, year, ...otherProps }: MonthInputProps): JSX.Element;
export {};
