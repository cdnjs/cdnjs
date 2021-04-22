import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare namespace SelectButton {

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

    interface SelectButtonProps {
        id?: string;
        value?: any;
        options?: any[];
        optionLabel?: string;
        optionValue?: string;
        optionDisabled?: string;
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
}

export declare class SelectButton extends React.Component<SelectButton.SelectButtonProps, any> { }
