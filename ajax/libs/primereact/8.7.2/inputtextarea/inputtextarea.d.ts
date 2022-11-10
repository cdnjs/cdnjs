import * as React from 'react';
import { KeyFilterType } from '../keyfilter';
import TooltipOptions from '../tooltip/tooltipoptions';

export interface InputTextareaProps extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'ref'> {
    autoResize?: boolean;
    children?: React.ReactNode;
    keyfilter?: KeyFilterType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
}

export declare class InputTextarea extends React.Component<InputTextareaProps, any> {
    value?: string;
}
