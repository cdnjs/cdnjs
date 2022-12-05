import * as React from 'react';
import { KeyFilterType } from '../keyfilter';
import TooltipOptions from '../tooltip/tooltipoptions';

export interface InputTextProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onInput' | 'ref'> {
    children?: React.ReactNode;
    keyfilter?: KeyFilterType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    validateOnly?: boolean;
    onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void;
}

export declare const InputText: React.ForwardRefExoticComponent<InputTextProps & React.RefAttributes<HTMLInputElement>>;
