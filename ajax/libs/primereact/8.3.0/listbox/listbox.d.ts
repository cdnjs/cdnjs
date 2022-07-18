import * as React from 'react';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScrollerProps, VirtualScroller } from '../virtualscroller';


type ListBoxOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type ListBoxItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type ListBoxFilterTemplateType = React.ReactNode | ((options: ListBoxFilterOptions) => React.ReactNode);

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

interface ListBoxFilterOptions {
    filter?: (event?: KeyboardEvent) => void;
    reset?: () => void;
}

export interface ListBoxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    value?: any;
    options?: SelectItemOptionsType;
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: ListBoxOptionDisabledType;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: ListBoxOptionGroupTemplateType;
    itemTemplate?: ListBoxItemTemplateType;
    filterTemplate?: ListBoxFilterTemplateType;
    listStyle?: object;
    listClassName?: string;
    virtualScrollerOptions?: VirtualScrollerProps;
    disabled?: boolean;
    dataKey?: string;
    multiple?: boolean;
    metaKeySelection?: boolean;
    filter?: boolean;
    filterBy?: string;
    filterValue?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    filterInputProps?: any;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: ListBoxChangeParams): void;
    onFilterValueChange?(e: ListBoxFilterValueChangeParams): void;
    children?: React.ReactNode;
}

export declare class ListBox extends React.Component<ListBoxProps, any> { 
    public getElement(): HTMLDivElement;
    public getVirtualScroller(): VirtualScroller;
}
