import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/colorpicker' {

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: string;
    }

    interface ChangeParams {
        value: string;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    export interface ColorPickerProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        value?: string;
        style?: object;
        className?: string;
        defaultColor?: string;
        inline?: boolean;
        format?: string;
        appendTo?: AppendToType;
        disabled?: boolean;
        tabIndex?: number;
        inputId?: string;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        transitionOptions?: object;
        onChange?(e: ChangeParams): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class ColorPicker extends React.Component<ColorPickerProps, any> { }
}
