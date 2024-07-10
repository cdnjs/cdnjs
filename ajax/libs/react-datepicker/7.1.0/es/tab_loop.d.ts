import React, { Component } from "react";
interface TabLoopProps extends React.PropsWithChildren {
    enableTabLoop?: boolean;
}
/**
 * `TabLoop` is a React component that manages tabbing behavior for its children.
 *
 * TabLoop prevents the user from tabbing outside of the popper
 * It creates a tabindex loop so that "Tab" on the last element will focus the first element
 * and "Shift Tab" on the first element will focus the last element
 *
 * @component
 * @example
 * <TabLoop enableTabLoop={true}>
 *   <ChildComponent />
 * </TabLoop>
 *
 * @param props - The properties that define the `TabLoop` component.
 * @param props.children - The child components.
 * @param props.enableTabLoop - Whether to enable the tab loop.
 *
 * @returns The `TabLoop` component.
 */
export default class TabLoop extends Component<TabLoopProps> {
    static defaultProps: {
        enableTabLoop: boolean;
    };
    constructor(props: TabLoopProps);
    private tabLoopRef;
    /**
     * `getTabChildren` is a method of the `TabLoop` class that retrieves all tabbable children of the component.
     *
     * This method uses the `tabbable` library to find all tabbable elements within the `TabLoop` component.
     * It then filters out any elements that are not visible.
     *
     * @returns An array of all tabbable and visible children of the `TabLoop` component.
     */
    getTabChildren: () => any[];
    handleFocusStart: () => void;
    handleFocusEnd: () => void;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
}
export {};
