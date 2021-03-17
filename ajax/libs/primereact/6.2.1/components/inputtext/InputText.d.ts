import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface InputTextProps extends React.HTMLProps<HTMLInputElement> {
    [key: string]: any;
    keyfilter?: any;
    validateOnly?: boolean;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

export class InputText extends React.Component<InputTextProps,any> {}
