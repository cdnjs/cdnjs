import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScrollerProps } from '../virtualscroller';

type MultiSelectOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type MultiSelectItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type MultiSelectSelectedItemTemplateType = React.ReactNode | ((value: any) => React.ReactNode);

type MultiSelectEmptyFilterMessageType = React.ReactNode | ((props: MultiSelectProps) => React.ReactNode);

interface MultiSelectHeaderCheckboxChangeParams {
    originalEvent: React.FormEvent<HTMLInputElement>;
    checked: boolean;
}

interface MultiSelectPanelHeaderTemplateParams {
    className: string;
    checkboxElement: HTMLElement;
    checked: boolean;
    onChange(e: MultiSelectHeaderCheckboxChangeParams): void;
    filterElement: JSX.Element;
    closeElement: JSX.Element;
    closeElementClassName: string;
    closeIconClassName: string;
    onCloseClick(event: React.MouseEvent<HTMLElement>): void;
    element: JSX.Element;
    props: MultiSelectProps;
}

type MultiSelectPanelHeaderTemplateType = React.ReactNode | ((e: MultiSelectPanelHeaderTemplateParams) => React.ReactNode);

type MultiSelectPanelFooterTemplateType = React.ReactNode | ((props: MultiSelectProps, hide: () => void) => React.ReactNode);

type MultiSelectOptionDisabledType = string | ((option: any) => boolean);

type MultiSelectAppendToType = 'self' | HTMLElement | undefined | null;

interface MultiSelectChangeTargetOptions {
    name: string;
    id: string;
    value: any;
}

interface MultiSelectChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: MultiSelectChangeTargetOptions;
}

interface MultiSelectFilterParams {
    originalEvent: React.SyntheticEvent;
    filter: string;
}

interface MultiSelectAllParams {
    originalEvent: React.SyntheticEvent;
    checked: boolean;
}

export interface MultiSelectProps {
    id?: string;
    inputRef?: React.Ref<HTMLSelectElement>;
    name?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: MultiSelectOptionDisabledType;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: MultiSelectOptionGroupTemplateType;
    display?: string;
    style?: object;
    className?: string;
    panelClassName?: string;
    panelStyle?: object;
    virtualScrollerOptions?: VirtualScrollerProps;
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
    emptyFilterMessage?: MultiSelectEmptyFilterMessageType;
    resetFilterOnHide?: boolean;
    tabIndex?: number;
    dataKey?: string;
    inputId?: string;
    appendTo?: MultiSelectAppendToType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    maxSelectedLabels?: number;
    selectionLimit?: number;
    selectedItemsLabel?: string;
    ariaLabelledBy?: string;
    itemTemplate?: MultiSelectItemTemplateType;
    selectedItemTemplate?: MultiSelectSelectedItemTemplateType;
    panelHeaderTemplate?: MultiSelectPanelHeaderTemplateType;
    panelFooterTemplate?: MultiSelectPanelFooterTemplateType;
    transitionOptions?: object;
    dropdownIcon?: string;
    showSelectAll?: boolean;
    selectAll?: boolean;
    onChange?(e: MultiSelectChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onShow?(): void;
    onHide?(): void;
    onFilter?(e: MultiSelectFilterParams): void;
    onSelectAll?(e: MultiSelectAllParams): void;
}

export declare class MultiSelect extends React.Component<MultiSelectProps, any> { }
