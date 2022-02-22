import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type OverlayPanelEventType = React.SyntheticEvent | undefined | null;

type OverlayPanelTargetType = HTMLElement | EventTarget | undefined | null;

type OverlayPanelAppendToType = 'self' | HTMLElement | undefined | null;

interface OverlayPanelBreakpoints {
    [key: string]: string;
}

export interface OverlayPanelProps {
    id?: string;
    dismissable?: boolean;
    showCloseIcon?: boolean;
    style?: object;
    className?: string;
    appendTo?: OverlayPanelAppendToType;
    ariaCloseLabel?: string;
    breakpoints?: OverlayPanelBreakpoints;
    transitionOptions?: CSSTransitionProps;
    onShow?(): void;
    onHide?(): void;
}

export declare class OverlayPanel extends React.Component<OverlayPanelProps, any> {
    public toggle(event: OverlayPanelEventType, target?: OverlayPanelTargetType): void;
    public show(event: OverlayPanelEventType, target: OverlayPanelTargetType): void;
    public hide(): void;
}
