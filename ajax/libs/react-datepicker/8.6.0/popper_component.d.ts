import React from "react";
import Portal from "./portal";
import TabLoop from "./tab_loop";
import type { FloatingProps } from "./with_floating";
import type { ReactNode } from "react";
interface PortalProps extends Omit<React.ComponentPropsWithoutRef<typeof Portal>, "children"> {
}
interface TabLoopProps extends Omit<React.ComponentPropsWithoutRef<typeof TabLoop>, "children"> {
}
interface PopperComponentProps extends Omit<PortalProps, "portalId">, TabLoopProps, FloatingProps {
    className?: string;
    wrapperClassName?: string;
    popperComponent: React.ReactNode;
    popperContainer?: React.FC<{
        children?: ReactNode | undefined;
    }>;
    targetComponent: React.ReactNode;
    popperOnKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    showArrow?: boolean;
    portalId?: PortalProps["portalId"];
}
export declare const PopperComponent: React.FC<PopperComponentProps>;
declare const _default: {
    (props: Omit<PopperComponentProps, "popperProps"> & import("./with_floating").WithFloatingProps): React.ReactElement;
    displayName: string;
};
export default _default;
