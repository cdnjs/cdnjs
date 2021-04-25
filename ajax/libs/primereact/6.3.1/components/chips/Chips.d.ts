import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/chips' {

    interface AddParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface RemoveParams extends AddParams { }

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: any[];
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any[];
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    export interface ChipsProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        name?: string;
        placeholder?: string;
        value?: any[];
        max?: number;
        disabled?: boolean;
        style?: object;
        className?: string;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        separator?: string;
        allowDuplicate?: boolean;
        itemTemplate?(item: any): React.ReactNode;
        onAdd?(e: AddParams): void;
        onRemove?(e: RemoveParams): void;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
    }

    export class Chips extends React.Component<ChipsProps, any> { }
}
