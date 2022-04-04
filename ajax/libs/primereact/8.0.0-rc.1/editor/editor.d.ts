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

export interface EditorProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id?: string;
    value?: string;
    style?: object;
    className?: string;
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
}

export declare class Editor extends React.Component<EditorProps, any> {
    public getQuill(): any;
}
