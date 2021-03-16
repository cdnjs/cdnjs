import * as React from 'react';

interface EditorProps {
    id?: string;
    value?: string;
    style?: object;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
    modules?: any;
    formats?: any[];
    theme?: string;
    headerTemplate?: JSX.Element | undefined,
    onTextChange?(e: { htmlValue: string|null, textValue: string, delta: any, source: string }): void;
	onSelectionChange?(e: { range: any, oldRange: any, source: string }): void;
}

export class Editor extends React.Component<EditorProps, any> {
}
