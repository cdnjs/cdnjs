import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type OverlayPanelEventType = React.SyntheticEvent | undefined | null;

type OverlayPanelTargetType = HTMLElement | EventTarget | undefined | null;

type OverlayPanelAppendToType = 'self' | HTMLElement | undefined | null;

interface OverlayPanelBreakpoints {
    [key: string]: string;
}

export interface OverlayPanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    dismissable?: boolean;
    showCloseIcon?: boolean;
    appendTo?: OverlayPanelAppendToType;
    ariaCloseLabel?: string;
    breakpoints?: OverlayPanelBreakpoints;
    transitionOptions?: CSSTransitionProps;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class OverlayPanel extends React.Component<OverlayPanelProps, any> {
    public toggle(event: OverlayPanelEventType, target?: OverlayPanelTargetType): void;
    public show(event: OverlayPanelEventType, target: OverlayPanelTargetType): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
}
