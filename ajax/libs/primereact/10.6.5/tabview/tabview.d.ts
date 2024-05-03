/**
 *
 * TabView is a container component to group content with tabs.
 *
 * [Live Demo](https://www.primereact.org/tabview/)
 *
 * Helper Components:
 *
 * - {@link TabPanel}
 *
 * @module tabview
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type TabViewPassThroughType<T> = PassThroughType<T, TabViewPassThroughMethodOptions>;
export declare type TabPanelPassThroughType<T> = PassThroughType<T, TabPanelPassThroughMethodOptions>;

/**
 * Custom Tabpanel header template options
 */
interface TabPanelHeaderTemplateOptions {
    /**
     * Style class of the header element.
     */
    className: string;
    /**
     * Style class of the header title element.
     */
    titleClassName: string;
    /**
     * Callback to invoke on click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onClick(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when the key pressed.
     * @param {React.KeyboardEvent<HTMLElement>} event - Browser event.
     */
    onKeyDown(event: React.KeyboardEvent<HTMLElement>): void;
    /**
     * Left icon of the tab header.
     */
    leftIconElement: JSX.Element;
    /**
     * The title element of the tab header.
     */
    titleElement: JSX.Element;
    /**
     * Right icon of the tab header.
     */
    rightIconElement: JSX.Element;
    /**
     * The JSX element of the tab header.
     */
    element: JSX.Element;
    /**
     * The props of the tab panel component.
     */
    props: TabPanelProps;
    /**
     * The index of the tab header.
     */
    index: number;
    /**
     * Whether the tab header is selected or not.
     */
    selected: boolean;
    /**
     * The aria-controls attribute of the tab header.
     */
    ariaControls: string;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface TabPanelPassThroughMethodOptions {
    props: TabPanelProps;
    parent: TabViewPassThroughMethodOptions;
    context: TabViewContext;
}

/**
 * Defines current inline context in Tabview component.
 */
export interface TabViewContext {
    /**
     * Opened tab index.
     */
    index: number;
    /**
     * Total number of tabs
     */
    count: number;
    /**
     * Is this the first tab?
     * @defaultValue false
     */
    first: boolean;
    /**
     * Is this the last tab?
     * @defaultValue false
     */
    last: boolean;
    /**
     * Is this tab currently selected.
     * @defaultValue false
     */
    selected: boolean;
    /**
     * Is this tab currently disabled.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TabPanelProps.pt}
 */
export interface TabPanelPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TabPanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: TabPanelPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the header action's DOM element.
     */
    headerAction?: TabPanelPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the title's DOM element.
     */
    headerTitle?: TabPanelPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    content?: TabPanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in TabPanel component.
 * @group Properties
 */
export interface TabPanelProps {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Defines if tab can be removed.
     * @defaultValue false
     */
    closable?: boolean | undefined;
    /**
     * Style class of the tab header and content.
     */
    className?: string | undefined;
    /**
     * Inline style of the tab content.
     */
    contentStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the tab content.
     */
    contentClassName?: string | undefined;
    /**
     * Orientation of tab headers.
     */
    header?: React.ReactNode | undefined;
    /**
     * Header template of the tab to customize more.
     */
    headerTemplate?: React.ReactNode | ((options: TabPanelHeaderTemplateOptions) => React.ReactNode);
    /**
     * Inline style of the tab header.
     */
    headerStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the tab header.
     */
    headerClassName?: string | undefined;
    /**
     * Icons can be placed at left of a header.
     */
    leftIcon?: IconType<TabPanel> | undefined;
    /**
     * Icons can be placed at right of a header.
     */
    rightIcon?: IconType<TabPanel> | undefined;
    /**
     * Previous button of the tab header.
     */
    prevButton?: IconType<TabPanel> | undefined;
    /**
     * Next button of the tab header.
     */
    nextButton?: IconType<TabPanel> | undefined;
    /**
     * Close button of the tab header.
     */
    closeIcon?: IconType<TabPanel> | undefined;
    /**
     * Whether the tab is disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TabPanelPassThroughOptions}
     */
    pt?: TabPanelPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * Inline style of the tab header and content.
     */
    style?: React.CSSProperties | undefined;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
    /**
     * When set as false, hides the tab panel.
     * @defaultValue true
     */
    visible?: boolean | undefined;
}

/**
 * TabPanel is a helper component for TabView.
 * @group Component
 */
export declare class TabPanel extends React.Component<TabPanelProps, any> {}

/**
 * Custom change event.
 * @see {@link TabViewProps.onTabChange}
 * @event
 */
interface TabViewTabChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Index of the selected tab
     */
    index: number;
}

/**
 * Custom close event.
 * @see {@link TabViewProps.onTabClose}
 * @event
 */
interface TabViewTabCloseEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Index of the selected tab
     */
    index: number;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface TabViewPassThroughMethodOptions {
    props: TabViewProps;
    state: TabViewState;
}

/**
 * Defines current inline state in TabView component.
 */
export interface TabViewState {
    /**
     * Current active index state.
     */
    activeIndex: number;
    /**
     * Unique id for the TabView component.
     */
    id: string;
    /**
     * Current state of hidden tab.
     */
    hiddenTabsState: (number | string)[];
    /**
     * Current state of previous button.
     * @defaultValue true
     */
    isPrevButtonDisabled: boolean;
    /**
     * Current state of the next button.
     * @defaultValue false
     */
    isNextButtonDisabled: boolean;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TabViewProps.pt}
 */
export interface TabViewPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TabViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the nav container's DOM element.
     */
    navContainer?: TabViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the nav content's DOM element.
     */
    navContent?: TabViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    nav?: TabViewPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the inkbar's DOM element.
     */
    inkbar?: TabViewPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the previous button's DOM element.
     */
    previousButton?: TabViewPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the previous button icon's DOM element.
     */
    previousIcon?: TabViewPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the next button's DOM element.
     */
    nextButton?: TabViewPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the next button icon's DOM element.
     */
    nextIcon?: TabViewPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panelContainer?: TabViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to accordion tabs.
     */
    tab?: TabPanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines valid properties in TabView component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TabViewProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Active index of the TabView.
     * @defaultValue 0
     */
    activeIndex?: number | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Style class of the panels container of the tabview.
     */
    panelContainerClassName?: string | undefined;
    /**
     * Inline style of the panels container of the tabview.
     */
    panelContainerStyle?: React.CSSProperties | undefined;
    /**
     * Whether to render the contents of the selected tab or all tabs.
     * @defaultValue true
     */
    renderActiveOnly?: boolean | undefined;
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @defaultValue false
     */
    scrollable?: boolean | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TabViewPassThroughOptions}
     */
    pt?: TabViewPassThroughOptions;
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
     * Callback to invoke before an active tab is changed. Return false to prevent tab from changing.
     * @param {TabViewTabChangeEvent} event - Custom tab change event.
     */
    onBeforeTabChange?(event: TabViewTabChangeEvent): void;
    /**
     * Callback to invoke before an active tab is close. Return false to prevent tab from closing.
     * @param {TabViewTabCloseEvent} event - Custom tab close event.
     */
    onBeforeTabClose?(event: TabViewTabCloseEvent): void;
    /**
     * Callback to invoke when an active tab is changed.
     * @param {TabViewTabChangeEvent} event -  Custom tab change event.
     */
    onTabChange?(event: TabViewTabChangeEvent): void;
    /**
     * Callback to invoke when an active tab is closed.
     * @param {TabViewTabCloseEvent} event - Custom tab close event.
     */
    onTabClose?(event: TabViewTabCloseEvent): void;
}

/**
 * **PrimeReact - TabPanel**
 *
 * _TabView is a container component to group content with tabs._
 *
 * [Live Demo](https://www.primereact.org/tabview/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 *
 */
// tslint:disable-next-line:max-classes-per-file
export declare class TabView extends React.Component<TabViewProps, any> {
    /**
     * Resets all states.
     */
    public reset(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
