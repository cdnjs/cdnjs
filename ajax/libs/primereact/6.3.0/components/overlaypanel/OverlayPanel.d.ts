import * as React from 'react';

type TemplateType = React.ReactNode | ((props: OverlayPanelProps) => React.ReactNode);

type EventType = React.SyntheticEvent | undefined | null;

type TargetType = HTMLElement | EventTarget | undefined | null;

interface Breakpoints {
    [key: string]: string;
}

interface OverlayPanelProps {
    id?: string;
    dismissable?: boolean;
    showCloseIcon?: boolean;
    style?: object;
    className?: string;
    appendTo?: HTMLElement | string;
    ariaCloseLabel?: string;
    breakpoints?: Breakpoints;
    transitionOptions?: object;
    onShow?(): void;
    onHide?(): void;
}

export declare class OverlayPanel extends React.Component<OverlayPanelProps, any> {
    public toggle(event: EventType, target: TargetType): void;
    public show(event: EventType, target: TargetType): void;
    public hide(): void;
}
