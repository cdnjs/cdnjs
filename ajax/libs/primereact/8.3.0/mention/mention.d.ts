import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { InputTextarea } from '../inputtextarea';

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

export interface MentionProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'onInput' | 'onFocus' | 'onBlur' | 'ref'> {
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
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
    transitionOptions?: CSSTransitionProps;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    onSearch?(e: MentionSearchParams): void;
    onSelect?(e: MentionSelectParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class Mention extends React.Component<MentionProps, any> { 
    public getElement(): HTMLDivElement;
    public getInput(): InputTextarea;
    public getOverlay(): HTMLElement;
}
