import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/tristatecheckbox' {

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: boolean | undefined | null;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: boolean | undefined | null;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    export interface TriStateCheckboxProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        inputId?: string;
        value?: boolean | undefined | null;
        name?: string;
        style?: object;
        className?: string;
        disabled?: boolean;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
    }

    export class TriStateCheckbox extends React.Component<TriStateCheckboxProps, any> { }
}
