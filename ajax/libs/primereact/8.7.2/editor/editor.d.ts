import * as React from 'react';

interface EditorTextChangeParams {
    htmlValue: string | null;
    textValue: string;
    delta: any;
    source: string;
}

interface EditorSelectionChangeParams {
    range: any;
    oldRange: any;
    source: string;
}

export interface EditorProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    value?: string;
    placeholder?: string;
    readOnly?: boolean;
    modules?: any;
    formats?: string[];
    theme?: string;
    showHeader?: boolean;
    headerTemplate?: React.ReactNode;
    onTextChange?(e: EditorTextChangeParams): void;
    onSelectionChange?(e: EditorSelectionChangeParams): void;
    onLoad?(quill: any): void;
    children?: React.ReactNode;
}

export declare class Editor extends React.Component<EditorProps, any> {
    public getQuill(): any;
    public getElement(): HTMLDivElement;
    public getContent(): HTMLDivElement;
    public getToolbar(): HTMLDivElement;
}
