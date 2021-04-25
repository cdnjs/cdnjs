import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/listbox' {

    type OptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

    type ItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

    type OptionDisabledType = string | ((option: any) => boolean);

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

    interface FilterValueChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    export interface ListBoxProps {
        id?: string;
        value?: any;
        options?: any[];
        optionLabel?: string;
        optionValue?: string;
        optionDisabled?: OptionDisabledType;
        optionGroupLabel?: string;
        optionGroupChildren?: string;
        optionGroupTemplate?: OptionGroupTemplateType;
        itemTemplate?: ItemTemplateType;
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
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
        onFilterValueChange?(e: FilterValueChangeParams): void;
    }

    export class ListBox extends React.Component<ListBoxProps, any> { }
}
