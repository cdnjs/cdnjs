import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface PasswordProps extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    mediumRegex?: string;
    strongRegex?: string;
    feedback?: boolean;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    [key: string]: any;
    panelClassName?: string;
    panelStyle?: object;
}

export class Password extends React.Component<PasswordProps,any> {}
