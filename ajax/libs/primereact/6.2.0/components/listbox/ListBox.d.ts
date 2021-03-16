import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface ListBoxProps {
    id?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: boolean;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    style?: object;
    listStyle?: object;
    listClassName?: string;
    className?: string;
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
    tabIndex?: number;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    itemTemplate?: any;
    optionGroupTemplate?: any;
    onChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
    onFilterValueChange?(e: {originalEvent: Event, value: string}): void;
}

export class ListBox extends React.Component<ListBoxProps,any> {}
