import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/autocomplete' {

    type OptionGroupTemplateType = React.ReactNode | ((suggestion: any, index: number) => React.ReactNode);

    type ItemTemplateType = React.ReactNode | ((suggestion: any, index: number) => React.ReactNode);

    type SelectedItemTemplateType = React.ReactNode | ((value: any) => React.ReactNode);

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

    interface SelectParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface UnselectParams extends SelectParams { }

    interface DropdownClickParams {
        originalEvent: React.SyntheticEvent;
        query: string;
    }

    interface CompleteMethodParams {
        originalEvent: React.SyntheticEvent;
        query: string;
    }

    export interface AutoCompleteProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        value?: any;
        name?: string;
        type?: string;
        suggestions?: any[];
        field?: string;
        optionGroupLabel?: string;
        optionGroupChildren?: string;
        optionGroupTemplate?: OptionGroupTemplateType;
        forceSelection?: boolean;
        autoHighlight?: boolean;
        scrollHeight?: string;
        dropdown?: boolean;
        dropdownMode?: string;
        multiple?: boolean;
        minLength?: number;
        delay?: number;
        style?: object;
        className?: string;
        inputId?: string;
        inputStyle?: object;
        inputClassName?: string;
        panelClassName?: string;
        panelStyle?: object;
        placeholder?: string;
        readOnly?: boolean;
        disabled?: boolean;
        maxlength?: number;
        size?: number;
        appendTo?: AppendToType;
        tabIndex?: number;
        autoFocus?: boolean;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        completeMethod?(e: CompleteMethodParams): void;
        itemTemplate?: ItemTemplateType;
        selectedItemTemplate?: SelectedItemTemplateType;
        transitionOptions?: object;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
        onSelect?(e: SelectParams): void;
        onUnselect?(e: UnselectParams): void;
        onDropdownClick?(e: DropdownClickParams): void;
        onClick?(event: React.MouseEvent<HTMLElement>): void;
        onDblClick?(event: React.MouseEvent<HTMLElement>): void;
        onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
        onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;
        onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
        onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
        onClear?(event: React.SyntheticEvent): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class AutoComplete extends React.Component<AutoCompleteProps, any> { }
}
