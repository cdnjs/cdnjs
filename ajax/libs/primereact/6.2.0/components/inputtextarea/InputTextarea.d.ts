import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface InputTextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
    autoResize?: boolean;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    [key: string]: any;
}

export class InputTextarea extends React.Component<InputTextareaProps,any> {}