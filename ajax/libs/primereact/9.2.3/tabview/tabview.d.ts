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
 * Defines valid properties in TabPanel component.
 * @group Properties
 */
export interface TabPanelProps {
    /**
     * Orientation of tab headers.
     */
    header?: React.ReactNode | undefined;
    /**
     * Header template of the tab to customize more.
     */
    headerTemplate?: React.ReactNode | ((options: TabPanelHeaderTemplateOptions) => React.ReactNode);
    /**
     * Icons can be placed at left of a header.
     */
    leftIcon?: string | undefined;
    /**
     * Icons can be placed at right of a header.
     */
    rightIcon?: string | undefined;
    /**
     * Whether the tab is disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Defines if tab can be removed.
     * @defaultValue false
     */
    closable?: boolean | undefined;
    /**
     * Inline style of the tab header and content.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the tab header and content.
     */
    className?: string | undefined;
    /**
     * Inline style of the tab header.
     */
    headerStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the tab header.
     */
    headerClassName?: string | undefined;
    /**
     * Inline style of the tab content.
     */
    contentStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the tab content.
     */
    contentClassName?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
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
