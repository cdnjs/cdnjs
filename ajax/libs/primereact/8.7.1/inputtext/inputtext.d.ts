import * as React from 'react';
import { KeyFilterType } from '../keyfilter';
import TooltipOptions from '../tooltip/tooltipoptions';

export interface InputTextProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onInput' | 'ref'> {
    keyfilter?: KeyFilterType;
    validateOnly?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void;
    children?: React.ReactNode;
}

export declare class InputText extends React.Component<InputTextProps, any> {}
