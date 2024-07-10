import React, { Component } from "react";
import Portal from "./portal";
import TabLoop from "./tab_loop";
import type { FloatingProps } from "./with_floating";
interface PortalProps extends Omit<React.ComponentPropsWithoutRef<typeof Portal>, "children"> {
}
interface TabLoopProps extends Omit<React.ComponentPropsWithoutRef<typeof TabLoop>, "children"> {
}
interface PopperComponentProps extends Omit<PortalProps, "portalId">, TabLoopProps, FloatingProps {
    className?: string;
    wrapperClassName?: string;
    popperComponent: React.ReactNode;
    popperContainer?: React.FC<React.PropsWithChildren>;
    targetComponent: React.ReactNode;
    popperOnKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    showArrow?: boolean;
    portalId?: PortalProps["portalId"];
}
export declare class PopperComponent extends Component<PopperComponentProps> {
    static get defaultProps(): {
        hidePopper: boolean;
    };
    render(): JSX.Element;
}
declare const _default: React.FC<Omit<PopperComponentProps, "popperProps"> & import("./with_floating").WithFloatingProps>;
export default _default;
