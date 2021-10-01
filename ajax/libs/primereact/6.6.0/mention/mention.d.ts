import * as React from 'react';

type MentionTriggerType = string | string[];

type MentionFieldType = string | string[];

type MentionHeaderTemplateType = React.ReactNode | ((props: MentionProps) => React.ReactNode);

type MentionFooterTemplateType = React.ReactNode | ((props: MentionProps) => React.ReactNode);

type MentionItemTemplateType = React.ReactNode | ((suggestion: any, options: MentionItemTemplateOptions) => React.ReactNode);

interface MentionItemTemplateOptions {
    index: number;
    trigger: string;
}

interface MentionSearchParams {
    originalEvent: React.SyntheticEvent;
    trigger: string;
    query: string;
}

interface MentionSelectParams {
    originalEvent: React.SyntheticEvent;
    suggestion: any;
}

export interface MentionProps {
    id?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    style?: object;
    className?: string;
    trigger?: MentionTriggerType;
    suggestions?: any[];
    field?: MentionFieldType;
    inputStyle?: object;
    inputClassName?: string;
    panelClassName?: string;
    panelStyle?: object;
    scrollHeight?: string;
    autoHighlight?: boolean;
    delay?: number;
    headerTemplate?: MentionHeaderTemplateType;
    footerTemplate?: MentionFooterTemplateType;
    itemTemplate?: MentionItemTemplateType;
    transitionOptions?: object;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    onSearch?(e: MentionSearchParams): void;
    onSelect?(e: MentionSelectParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class Mention extends React.Component<MentionProps, any> { }
