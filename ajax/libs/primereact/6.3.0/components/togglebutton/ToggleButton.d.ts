import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare namespace ToggleButton {

    type IconPositionType = 'left' | 'right';

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: boolean;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: boolean;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    interface ToggleButtonProps {
        id?: string;
        onIcon?: string;
        offIcon?: string;
        onLabel?: string;
        offLabel?: string;
        iconPos?: IconPositionType;
        style?: object;
        className?: string;
        checked?: boolean;
        tabIndex?: number;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLElement>): void;
        onBlur?(event: React.FormEvent<HTMLElement>): void;
    }
}

export declare class ToggleButton extends React.Component<ToggleButton.ToggleButtonProps, any> { }
