import { type UseFloatingOptions, type Middleware, type Placement, type UseFloatingReturn } from "@floating-ui/react";
import React from "react";
export interface FloatingProps {
    hidePopper?: boolean;
    popperProps: UseFloatingReturn & {
        arrowRef: React.RefObject<SVGSVGElement>;
    };
}
export interface WithFloatingProps {
    popperModifiers?: Middleware[];
    popperProps?: Omit<UseFloatingOptions, "middleware">;
    hidePopper?: boolean;
    popperPlacement?: Placement;
}
/**
 * `withFloating` is a higher-order component that adds floating behavior to a component.
 *
 * @param Component - The component to enhance.
 *
 * @example
 * const FloatingComponent = withFloating(MyComponent);
 * <FloatingComponent popperModifiers={[]} popperProps={{}} hidePopper={true} />
 *
 * @param popperModifiers - The modifiers to use for the popper.
 * @param popperProps - The props to pass to the popper.
 * @param hidePopper - Whether to hide the popper.
 * @param popperPlacement - The placement of the popper.
 *
 * @returns A new component with floating behavior.
 */
export default function withFloating<T extends FloatingProps>(Component: React.ComponentType<T>): React.FC<Omit<T, "popperProps"> & WithFloatingProps>;
