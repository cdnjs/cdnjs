import * as React from 'react';

interface KnobProps {
    id?: string;
    style?: object;
    className?: string;
    value?: any;
    size?: number;
    disabled?: boolean;
    readOnly?: boolean;
    showValue?: boolean;
    step?: number;
    min?: number;
    max?: number;
    strokeWidth?: number;
    name?: string;
    valueColor?: string;
    rangeColor?: string;
    textColor?: string;
    valueTemplate?: string;
    onChange?(e: {value: any}): void;
}

export class Knob extends React.Component<KnobProps,any> {}
