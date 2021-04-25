import * as React from 'react';

declare module 'primereact/editor' {

    interface TextChangeParams {
        htmlValue: string | null;
        textValue: string;
        delta: any;
        source: string;
    }

    interface SelectionChangeParams {
        range: any;
        oldRange: any;
        source: string;
    }

    export interface EditorProps {
        id?: string;
        value?: string;
        style?: object;
        className?: string;
        placeholder?: string;
        readOnly?: boolean;
        modules?: any;
        formats?: string[];
        theme?: string;
        headerTemplate?: React.ReactNode;
        onTextChange?(e: TextChangeParams): void;
        onSelectionChange?(e: SelectionChangeParams): void;
    }

    export class Editor extends React.Component<EditorProps, any> { }
}
