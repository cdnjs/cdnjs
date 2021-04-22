import * as React from 'react';

declare namespace CascadeSelect {

    type ItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface GroupChangeParams extends ChangeParams { }

    interface CascadeSelectProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        style?: object;
        className?: string;
        value?: any;
        name?: string;
        options?: any[];
        optionLabel?: string;
        optionValue?: string;
        optionGroupLabel?: string;
        optionGroupChildren?: string[];
        placeholder?: string;
        itemTemplate?: ItemTemplateType;
        disabled?: boolean;
        dataKey?: string;
        inputId?: string;
        tabIndex?: number;
        ariaLabelledBy?: string;
        appendTo?: HTMLElement | string;
        transitionOptions?: object;
        onChange?(e: ChangeParams): void;
        onGroupChange?(e: GroupChangeParams): void;
        onBeforeShow?(): void;
        onBeforeHide?(): void;
        onShow?(): void;
        onHide?(): void;
    }
}

export declare class CascadeSelect extends React.Component<CascadeSelect.CascadeSelectProps, any> { }
