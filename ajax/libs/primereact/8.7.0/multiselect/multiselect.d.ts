import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';
import { VirtualScrollerProps } from '../virtualscroller';
import { SelectItemOptionsType } from '../selectitem/selectitem';

type MultiSelectOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type MultiSelectItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type MultiSelectSelectedItemTemplateType = React.ReactNode | ((value: any) => React.ReactNode);

type MultiSelectFilterTemplateType = React.ReactNode | ((options: MultiSelectFilterOptions) => React.ReactNode);

type MultiSelectEmptyFilterMessageType = React.ReactNode | ((props: MultiSelectProps) => React.ReactNode);

type MultiSelectDisplayType = 'comma' | 'chip';

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

interface MultiSelectFilterOptions {
    filter?: (event?: KeyboardEvent) => void;
    reset?: () => void;
}

export interface MultiSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    id?: string;
    inputRef?: React.Ref<HTMLSelectElement>;
    name?: string;
    value?: any;
    options?: SelectItemOptionsType;
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: MultiSelectOptionDisabledType;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: MultiSelectOptionGroupTemplateType;
    display?: MultiSelectDisplayType;
    style?: React.CSSProperties;
    className?: string;
    panelClassName?: string;
    panelStyle?: React.CSSProperties;
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
    filterTemplate?: MultiSelectFilterTemplateType;
    selectedItemTemplate?: MultiSelectSelectedItemTemplateType;
    panelHeaderTemplate?: MultiSelectPanelHeaderTemplateType;
    panelFooterTemplate?: MultiSelectPanelFooterTemplateType;
    transitionOptions?: CSSTransitionProps;
    dropdownIcon?: IconType<MultiSelectProps>;
    removeIcon?: IconType<MultiSelectProps>;
    showSelectAll?: boolean;
    selectAll?: boolean;
    onChange?(e: MultiSelectChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onShow?(): void;
    onHide?(): void;
    onFilter?(e: MultiSelectFilterParams): void;
    onSelectAll?(e: MultiSelectAllParams): void;
    children?: React.ReactNode;
}

export declare class MultiSelect extends React.Component<MultiSelectProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
}
