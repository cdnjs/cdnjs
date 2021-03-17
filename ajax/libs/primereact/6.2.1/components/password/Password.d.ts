import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface PasswordProps extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    value?: string;
    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    mediumRegex?: string;
    strongRegex?: string;
    feedback?: boolean;
    toggleMask?: boolean;
    appendTo?: any;
    header?: any;
    content?: any;
    footer?: any;
    icon?: any;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    [key: string]: any;
    style?: object;
    className?: string;
    inputStyle?: object;
    inputClassName?: string;
    panelStyle?: object;
    panelClassName?: string;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
}

export class Password extends React.Component<PasswordProps,any> {}
