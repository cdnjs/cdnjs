import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/dropdown' {

    type OptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

    type ValueTemplateType = React.ReactNode | ((option: any, props: DropdownProps) => React.ReactNode);

    type ItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

    type EmptyFilterMessageType = React.ReactNode | ((props: DropdownProps) => React.ReactNode);

    type OptionDisabledType = string | ((option: any) => boolean);

    type AppendToType = 'self' | HTMLElement | undefined | null;

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

    export interface DropdownProps {
        id?: string;
        inputRef?: React.Ref<HTMLSelectElement>;
        name?: string;
        value?: any;
        options?: any[];
        optionLabel?: string;
        optionValue?: string;
        optionDisabled?: OptionDisabledType;
        optionGroupLabel?: string;
        optionGroupChildren?: string;
        optionGroupTemplate?: OptionGroupTemplateType;
        valueTemplate?: ValueTemplateType;
        itemTemplate?: ItemTemplateType;
        style?: object;
        className?: string;
        scrollHeight?: string;
        filter?: boolean;
        filterBy?: string;
        filterMatchMode?: string;
        filterPlaceholder?: string;
        filterLocale?: string;
        emptyFilterMessage?: EmptyFilterMessageType;
        editable?: boolean;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        appendTo?: AppendToType;
        tabIndex?: number;
        autoFocus?: boolean;
        filterInputAutoFocus?: boolean;
        resetFilterOnHide?: boolean;
        showFilterClear?: boolean;
        lazy?: boolean;
        panelClassName?: string;
        panelStyle?: object;
        dataKey?: string;
        inputId?: string;
        showClear?: boolean;
        maxLength?: number;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabel?: string;
        ariaLabelledBy?: string;
        transitionOptions?: object;
        showOnFocus?: boolean;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
        onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
        onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class Dropdown extends React.Component<DropdownProps, any> { }
}
