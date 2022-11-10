import * as React from 'react';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScroller, VirtualScrollerProps } from '../virtualscroller';

type ListBoxOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type ListBoxItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type ListBoxFilterTemplateType = React.ReactNode | ((options: ListBoxFilterTemplateOptions) => React.ReactNode);

type ListBoxOptionDisabledType = string | ((option: any) => boolean);

interface ListBoxChangeTargetOptions {
    name: string;
    id: string;
    value: any;
}

interface ListBoxChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: ListBoxChangeTargetOptions;
}

interface ListBoxFilterValueChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface ListBoxFilterTemplateOptions {
    className: string;
    disabled?: boolean;
    element: HTMLDivElement;
    filter?: string;
    filterIconClassName: string;
    filterInputChange?: React.ChangeEvent<HTMLInputElement>;
    filterInputProps?: any;
    filterOptions?: ListBoxFilterOptions;
    filterPlaceholder?: string;
    filterTemplate?: ListBoxFilterTemplateType;
}

interface ListBoxFilterOptions {
    filter?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    reset?: () => void;
}

export interface ListBoxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    ariaLabelledBy?: string;
    children?: React.ReactNode;
    dataKey?: string;
    disabled?: boolean;
    filter?: boolean;
    filterBy?: string;
    filterInputProps?: any;
    filterLocale?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterTemplate?: ListBoxFilterTemplateType;
    filterValue?: string;
    itemTemplate?: ListBoxItemTemplateType;
    listClassName?: string;
    listStyle?: React.CSSProperties;
    metaKeySelection?: boolean;
    multiple?: boolean;
    optionDisabled?: ListBoxOptionDisabledType;
    optionGroupChildren?: string;
    optionGroupLabel?: string;
    optionGroupTemplate?: ListBoxOptionGroupTemplateType;
    optionLabel?: string;
    optionValue?: string;
    options?: SelectItemOptionsType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    value?: any;
    virtualScrollerOptions?: VirtualScrollerProps;
    onChange?(e: ListBoxChangeParams): void;
    onFilterValueChange?(e: ListBoxFilterValueChangeParams): void;
}

export declare class ListBox extends React.Component<ListBoxProps, any> {
    public getElement(): HTMLDivElement;
    public getVirtualScroller(): VirtualScroller;
}
