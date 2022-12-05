import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScrollerProps } from '../virtualscroller';

type DropdownOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type DropdownValueTemplateType = React.ReactNode | ((option: any, props: DropdownProps) => React.ReactNode);

type DropdownItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type DropdownFilterTemplateType = React.ReactNode | ((options: DropdownFilterOptions) => React.ReactNode);

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

interface DropdownFilterOptions {
    filter?: (event?: KeyboardEvent) => void;
    reset?: () => void;
}

export interface DropdownProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    appendTo?: DropdownAppendToType;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    autoFocus?: boolean;
    children?: React.ReactNode;
    className?: string;
    dataKey?: string;
    disabled?: boolean;
    dropdownIcon?: string;
    editable?: boolean;
    emptyFilterMessage?: DropdownEmptyFilterMessageType;
    emptyMessage?: DropdownEmptyMessageType;
    filter?: boolean;
    filterBy?: string;
    filterInputAutoFocus?: boolean;
    filterLocale?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterTemplate?: DropdownFilterTemplateType;
    focusInputRef?: React.Ref<HTMLInputElement>;
    id?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLSelectElement>;
    itemTemplate?: DropdownItemTemplateType;
    maxLength?: number;
    name?: string;
    optionDisabled?: DropdownOptionDisabledType;
    optionGroupChildren?: string;
    optionGroupLabel?: string;
    optionGroupTemplate?: DropdownOptionGroupTemplateType;
    optionLabel?: string;
    optionValue?: string;
    options?: SelectItemOptionsType;
    panelClassName?: string;
    panelStyle?: React.CSSProperties;
    placeholder?: string;
    required?: boolean;
    resetFilterOnHide?: boolean;
    scrollHeight?: string;
    showClear?: boolean;
    showFilterClear?: boolean;
    showOnFocus?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    transitionOptions?: CSSTransitionProps;
    value?: any;
    valueTemplate?: DropdownValueTemplateType;
    virtualScrollerOptions?: VirtualScrollerProps;
    onChange?(e: DropdownChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
    onFilter?(e: DropdownFilterParams): void;
}

export declare class Dropdown extends React.Component<DropdownProps, any> {
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
    public getFocusInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
}
