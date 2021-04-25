import * as React from 'react';

declare module 'primereact/cascadeselect' {

    type ItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface GroupChangeParams extends ChangeParams { }

    export interface CascadeSelectProps {
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
        appendTo?: AppendToType;
        transitionOptions?: object;
        onChange?(e: ChangeParams): void;
        onGroupChange?(e: GroupChangeParams): void;
        onBeforeShow?(): void;
        onBeforeHide?(): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class CascadeSelect extends React.Component<CascadeSelectProps, any> { }
}
