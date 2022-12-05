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

export interface MentionProps extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onSelect' | 'onChange' | 'onInput' | 'onFocus' | 'onBlur' | 'ref'> {
    autoHighlight?: boolean;
    autoResize?: boolean;
    children?: React.ReactNode;
    delay?: number;
    field?: MentionFieldType;
    footerTemplate?: MentionFooterTemplateType;
    headerTemplate?: MentionHeaderTemplateType;
    inputClassName?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputStyle?: React.CSSProperties;
    itemTemplate?: MentionItemTemplateType;
    panelClassName?: string;
    panelStyle?: React.CSSProperties;
    scrollHeight?: string;
    suggestions?: any[];
    transitionOptions?: CSSTransitionProps;
    trigger?: MentionTriggerType;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onHide?(): void;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    onSearch?(e: MentionSearchParams): void;
    onSelect?(e: MentionSelectParams): void;
    onShow?(): void;
}

export declare class Mention extends React.Component<MentionProps, any> {
    public getElement(): HTMLDivElement;
    public getInput(): typeof InputTextarea;
    public getOverlay(): HTMLElement;
}
