import React from 'react';
import Input from './Input.js';
type DayInputProps = {
    maxDate?: Date;
    minDate?: Date;
    month?: string | null;
    year?: string | null;
} & Omit<React.ComponentProps<typeof Input>, 'max' | 'min' | 'name'>;
export default function DayInput({ maxDate, minDate, month, year, ...otherProps }: DayInputProps): JSX.Element;
export {};
