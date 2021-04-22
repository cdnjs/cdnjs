import * as React from 'react';

declare namespace Editor {

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

    interface EditorProps {
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
}

export declare class Editor extends React.Component<Editor.EditorProps, any> { }
