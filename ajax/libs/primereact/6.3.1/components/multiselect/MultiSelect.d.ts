import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/multiselect' {

    type OptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

    type ItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

    type SelectedItemTemplateType = React.ReactNode | ((value: any) => React.ReactNode);

    type EmptyFilterMessageType = React.ReactNode | ((props: MultiSelectProps) => React.ReactNode);

    interface HeaderCheckboxChangeParams {
        originalEvent: React.FormEvent<HTMLInputElement>;
        checked: boolean;
    }

    interface PanelHeaderTemplateParams {
        className: string;
        checkboxElement: HTMLElement;
        checked: boolean;
        onChange(e: HeaderCheckboxChangeParams): void;
        filterElement: JSX.Element;
        closeElement: JSX.Element;
        closeElementClassName: string;
        closeIconClassName: string;
        onCloseClick(event: React.MouseEvent<HTMLElement>): void;
        element: JSX.Element;
        props: MultiSelectProps;
    }

    type PanelHeaderTemplateType = React.ReactNode | ((e: PanelHeaderTemplateParams) => React.ReactNode);

    type PanelFooterTemplateType = React.ReactNode | ((props: MultiSelectProps, hide: () => void) => React.ReactNode);

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

    export interface MultiSelectProps {
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
        display?: string;
        style?: object;
        className?: string;
        panelClassName?: string;
        panelStyle?: object;
        scrollHeight?: string;
        placeholder?: string;
        fixedPlaceholder?: boolean;
        disabled?: boolean;
        showClear?: boolean;
        filter?: boolean;
        filterBy?: string;
        filterMatchMode?: string;
        filterPlaceholder?: string;
        filterLocale?: string;
        emptyFilterMessage?: EmptyFilterMessageType;
        resetFilterOnHide?: boolean;
        tabIndex?: number;
        dataKey?: string;
        inputId?: string;
        required?: boolean;
        appendTo?: AppendToType;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        maxSelectedLabels?: number;
        selectionLimit?: number;
        selectedItemsLabel?: string;
        ariaLabelledBy?: string;
        itemTemplate?: ItemTemplateType;
        selectedItemTemplate?: SelectedItemTemplateType;
        panelHeaderTemplate?: PanelHeaderTemplateType;
        panelFooterTemplate?: PanelFooterTemplateType;
        transitionOptions?: object;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class MultiSelect extends React.Component<MultiSelectProps, any> { }
}
