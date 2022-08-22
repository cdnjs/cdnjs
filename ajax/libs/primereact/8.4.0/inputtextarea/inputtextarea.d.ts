import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

export interface InputTextareaProps extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'ref'> {
    autoResize?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    children?: React.ReactNode;
}

export declare class InputTextarea extends React.Component<InputTextareaProps, any> { 
    public getElement(): HTMLTextAreaElement;
    public getInput(): HTMLTextAreaElement;
}
