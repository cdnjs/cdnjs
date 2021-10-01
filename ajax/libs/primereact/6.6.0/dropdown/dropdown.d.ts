import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScrollerProps } from '../virtualscroller';

type DropdownOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type DropdownValueTemplateType = React.ReactNode | ((option: any, props: DropdownProps) => React.ReactNode);

type DropdownItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type DropdownEmptyMessageType = React.ReactNode | ((props: DropdownProps) => React.ReactNode);

type DropdownEmptyFilterMessageType = React.ReactNode | ((props: DropdownProps) => React.ReactNode);

type DropdownOptionDisabledType = string | ((option: any) => boolean);

type DropdownAppendToType = 'self' | HTMLElement | undefined | null;

interface DropdownChangeTargetOptions {
    name: string;
    id: string;
    value: any;
}

interface DropdownChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: DropdownChangeTargetOptions;
}

interface DropdownFilterParams {
    originalEvent: React.SyntheticEvent;
    filter: string;
}

export interface DropdownProps {
    id?: string;
    inputRef?: React.Ref<HTMLSelectElement>;
    name?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: DropdownOptionDisabledType;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: DropdownOptionGroupTemplateType;
    valueTemplate?: DropdownValueTemplateType;
    itemTemplate?: DropdownItemTemplateType;
    style?: object;
    className?: string;
    virtualScrollerOptions?: VirtualScrollerProps;
    scrollHeight?: string;
    filter?: boolean;
    filterBy?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    emptyMessage?: DropdownEmptyMessageType;
    emptyFilterMessage?: DropdownEmptyFilterMessageType;
    editable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    appendTo?: DropdownAppendToType;
    tabIndex?: number;
    autoFocus?: boolean;
    filterInputAutoFocus?: boolean;
    resetFilterOnHide?: boolean;
    showFilterClear?: boolean;
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
    dropdownIcon?: string;
    showOnFocus?: boolean;
    onChange?(e: DropdownChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
    onFilter?(e: DropdownFilterParams): void;
}

export declare class Dropdown extends React.Component<DropdownProps, any> { }
