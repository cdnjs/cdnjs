import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';
import { VirtualScrollerProps } from '../virtualscroller';

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
    appendTo?: MultiSelectAppendToType;
    ariaLabelledBy?: string;
    children?: React.ReactNode;
    className?: string;
    dataKey?: string;
    disabled?: boolean;
    display?: MultiSelectDisplayType;
    dropdownIcon?: IconType<MultiSelectProps>;
    emptyFilterMessage?: MultiSelectEmptyFilterMessageType;
    filter?: boolean;
    filterBy?: string;
    filterLocale?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterTemplate?: MultiSelectFilterTemplateType;
    fixedPlaceholder?: boolean;
    flex?: boolean;
    id?: string;
    inline?: boolean;
    inputId?: string;
    inputRef?: React.Ref<HTMLSelectElement>;
    itemClassName?: string;
    itemTemplate?: MultiSelectItemTemplateType;
    maxSelectedLabels?: number;
    name?: string;
    optionDisabled?: MultiSelectOptionDisabledType;
    optionGroupChildren?: string;
    optionGroupLabel?: string;
    optionGroupTemplate?: MultiSelectOptionGroupTemplateType;
    optionLabel?: string;
    optionValue?: string;
    options?: SelectItemOptionsType;
    overlayVisible?: boolean;
    panelClassName?: string;
    panelFooterTemplate?: MultiSelectPanelFooterTemplateType;
    panelHeaderTemplate?: MultiSelectPanelHeaderTemplateType;
    panelStyle?: React.CSSProperties;
    placeholder?: string;
    removeIcon?: IconType<MultiSelectProps>;
    resetFilterOnHide?: boolean;
    scrollHeight?: string;
    selectAll?: boolean;
    selectedItemTemplate?: MultiSelectSelectedItemTemplateType;
    selectedItemsLabel?: string;
    selectionLimit?: number;
    showClear?: boolean;
    showSelectAll?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    transitionOptions?: CSSTransitionProps;
    useOptionAsValue?: boolean;
    value?: any;
    virtualScrollerOptions?: VirtualScrollerProps;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onChange?(e: MultiSelectChangeParams): void;
    onFilter?(e: MultiSelectFilterParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onHide?(): void;
    onSelectAll?(e: MultiSelectAllParams): void;
    onShow?(): void;
}

export declare class MultiSelect extends React.Component<MultiSelectProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
}
