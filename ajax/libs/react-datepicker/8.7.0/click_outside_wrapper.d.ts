import React from "react";
export type ClickOutsideHandler = (event: MouseEvent) => void;
interface ClickOutsideWrapperProps {
    onClickOutside: ClickOutsideHandler;
    className?: string;
    children: React.ReactNode;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    style?: React.CSSProperties;
    ignoreClass?: string;
}
export declare const ClickOutsideWrapper: React.FC<ClickOutsideWrapperProps>;
export {};
