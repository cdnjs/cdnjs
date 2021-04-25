import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/selectbutton' {

    type OptionDisabledType = string | ((option: any) => boolean);

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: any;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    export interface SelectButtonProps {
        id?: string;
        value?: any;
        options?: any[];
        optionLabel?: string;
        optionValue?: string;
        optionDisabled?: OptionDisabledType;
        tabIndex?: number;
        multiple?: boolean;
        disabled?: boolean;
        style?: object;
        className?: string;
        dataKey?: string;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        itemTemplate?(option: any): React.ReactNode;
        onChange?(e: ChangeParams): void;
    }

    export class SelectButton extends React.Component<SelectButtonProps, any> { }
}
