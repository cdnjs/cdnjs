/**
 *
 * Mention component is used to refer someone or something.
 *
 * [Live Demo](https://www.primereact.org/mention/)
 *
 * @module mention
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { InputTextarea } from '../inputtextarea';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type MentionPassThroughType<T> = PassThroughType<T, MentionPassThroughMethodOptions>;
export declare type MentionPassThroughTransitionType = ReactCSSTransitionProps | ((options: MentionPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface MentionPassThroughMethodOptions {
    props: MentionProps;
    state: MentionState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MentionProps.pt}
 */
export interface MentionPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MentionPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the InputTextarea component.
     * @see {@link InputTextareaPassThroughType}
     */
    input?: MentionPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: MentionPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: MentionPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the items' DOM element.
     */
    items?: MentionPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: MentionPassThroughTransitionType;
}

/**
 * Defines current inline state in Mention component.
 */
export interface MentionState {
    /**
     * Current overlay visible state as a boolean.
     * @defaultValue false
     */
    overlayVisible: boolean;
    /**
     * Current search state as a boolean.
     * @defaultValue false
     */
    searching: boolean;
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current trigger state.
     */
    trigger: any;
    /**
     * For item, this is the state of the item.
     */
    selected?: boolean;
}

/**
 * Defines current options in Mention component.
 */
export interface MentionContext {
    /**
     * Current trigger state.
     */
    trigger: any;
}

/**
 */
interface MentionItemTemplateOptions {
    /**
     * Index of the menu item.
     */
    index: number;
    /**
     * Triggered the mention item.
     */
    trigger: string;
}

/**
 * Custom search event
 * @see {@link MentionProps.onSearch}
 * @event
 */
interface MentionSearchEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Current trigger keyword.
     */
    trigger: string;
    /**
     * Current query string entered by the user.
     */
    query: string;
}

/**
 * Custom select event
 * @see {@link MentionProps.onSelect}
 * @event
 */
interface MentionSelectEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected item
     */
    suggestion: any;
}

/**
 * Defines valid properties in Mention component. In addition to these, all properties of HTMLTextAreaElement can be used in this component.
 * @group Properties
 */
export interface MentionProps extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onSelect' | 'onChange' | 'onInput' | 'onFocus' | 'onBlur' | 'ref' | 'pt'> {
    /**
     * When enabled, highlights the first item in the list by default.
     * @defaultValue true
     */
    autoHighlight?: boolean | undefined;
    /**
     * When present, height of textarea changes as being typed.
     */
    autoResize?: boolean | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Delay between keystrokes to wait before sending a query.
     * @defaultValue 0
     */
    delay?: number | undefined;
    /**
     * Field of a suggested object to resolve and display.
     */
    field?: string | string[] | undefined;
    /**
     * Custom template of footer.
     */
    footerTemplate?: React.ReactNode | ((props: MentionProps) => React.ReactNode);
    /**
     * Custom template of header.
     */
    headerTemplate?: React.ReactNode | ((props: MentionProps) => React.ReactNode);
    /**
     * Style class of the input field.
     */
    inputClassName?: string | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Custom template for the items.
     */
    itemTemplate?: React.ReactNode | ((suggestion: any, options: MentionItemTemplateOptions) => React.ReactNode);
    /**
     * Style class of the overlay panel element.
     */
    panelClassName?: string | undefined;
    /**
     * Inline style of the overlay panel element.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Maximum height of the suggestions panel.
     * @defaultValue 200px
     */
    scrollHeight?: string | undefined;
    /**
     * An array of suggestions to display.
     */
    suggestions?: any[] | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Set trigger keyword.
     * @defaultValue "@"
     */
    trigger?: string | string[] | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MentionPassThroughOptions}
     */
    pt?: MentionPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
    /**
     * Callback to invoke when the element loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when value changes.
     * @param {React.FormEvent<HTMLInputElement>} event Browser event
     */
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when the element receives focus.
     * @param {React.FocusEvent<HTMLInputElement>} event Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when overlay panel becomes hidden.
     */
    onHide?(): void;
    /**
     * Callback to invoke on input event of input field.
     * @param {React.FormEvent<HTMLInputElement>} event Browser event
     */
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when search.
     * @param {MentionSearchEvent} event Custom search event
     */
    onSearch?(event: MentionSearchEvent): void;
    /**
     * Callback to invoke when selection changes.
     * @param {MentionSelectEvent} event Custom select event
     */
    onSelect?(event: MentionSelectEvent): void;
    /**
     * Callback to invoke when overlay panel becomes visible.
     */
    onShow?(): void;
}

/**
 * **PrimeReact - Mention**
 *
 * _Mention component is used to refer someone or something._
 *
 * [Live Demo](https://www.primereact.org/mention/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Mention extends React.Component<MentionProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Show the mention.
     */
    public show(): void;
    /**
     * Hide the mention.
     */
    public hide(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get input element.
     * @return {InputTextarea} Input element
     */
    public getInput(): typeof InputTextarea;
    /**
     * Used to get overlay element.
     * @return {HTMLElement} Overlay element
     */
    public getOverlay(): HTMLElement;
}
