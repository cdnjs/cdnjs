import * as React from 'react';

declare namespace Knob {

    interface ChangeParams {
        value: number;
    }

    interface KnobProps {
        id?: string;
        style?: object;
        className?: string;
        value?: number;
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
        onChange?(e: ChangeParams): void;
    }
}

export declare class Knob extends React.Component<Knob.KnobProps, any> { }
