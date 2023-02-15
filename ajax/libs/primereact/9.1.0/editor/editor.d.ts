/**
 *
 * Editor is rich text editor component based on Quill.
 *
 * [Live Demo](https://www.primereact.org/editor/)
 *
 * @module editor
 *
 */
import * as React from 'react';

/**
 * Custom text change event
 * @see {@link EditorProps.onTextChange}
 * @event
 */
interface EditorTextChangeEvent {
    /**
     * Current value as html.
     */
    htmlValue: string | null;
    /**
     * Current value as text.
     */
    textValue: string;
    /**
     * Representation of the change.
     */
    delta: any;
    /**
     * Source of change. Will be either "user" or "api".
     */
    source: string;
}

/**
 * Custom selection change event
 * @see {@link EditorProps.onSelectionChange}
 * @event
 */
interface EditorSelectionChangeEvent {
    /**
     * Object with index and length keys indicating where the selection exists
     */
    range: any;
    /**
     * Object with index and length keys indicating where the previous selection was.
     */
    oldRange: any;
    /**
     * Source of change. Will be either "user" or "api".
     */
    source: string;
}

/**
 * Defines valid properties in Editor component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface EditorProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Value of the content.
     */
    value?: string | undefined;
    /**
     * Placeholder text to show when editor is empty.
     */
    placeholder?: string | undefined;
    /**
     * Whether to instantiate the editor to read-only mode.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Modules configuration, see [here](https://quilljs.com/docs/modules/) for available options.
     */
    modules?: any;
    /**
     * Whitelist of formats to display, see [here](https://quilljs.com/docs/formats/) for available options.
     */
    formats?: string[] | undefined;
    /**
     * The theme of editor
     */
    theme?: string | undefined;
    /**
     * Whether to show the header of editor.
     * @defaultValue false
     */
    showHeader?: boolean | undefined;
    /**
     * Style and modules of the toolbar.
     */
    headerTemplate?: React.ReactNode | undefined;
    /**
     * Callback to invoke when text of editor changes.
     * @param {EditorTextChangeEvent} event - Custom text change event
     */
    onTextChange?(event: EditorTextChangeEvent): void;
    /**
     * Callback to invoke when selected text of editor changes.
     * @param {EditorSelectionChangeEvent} event - Custom selection change event
     */
    onSelectionChange?(event: EditorSelectionChangeEvent): void;
    /**
     * Callback to invoke when the quill modules are loaded.
     * @param {*} quill - Quill instance
     */
    onLoad?(quill: any): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Editor**
 *
 * _Editor is rich text editor component based on Quill._
 *
 * [Live Demo](https://www.primereact.org/editor/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Editor extends React.Component<EditorProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get quill instance.
     * @return {*} Quill Instance
     */
    public getQuill(): any;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get content element.
     * @return {HTMLDivElement} Content element
     */
    public getContent(): HTMLDivElement;
    /**
     * Used to get toolbar element.
     * @return {HTMLDivElement} Toolbar element
     */
    public getToolbar(): HTMLDivElement;
}
