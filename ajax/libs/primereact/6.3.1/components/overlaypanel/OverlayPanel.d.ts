import * as React from 'react';

declare module 'primereact/overlaypanel' {

    type TemplateType = React.ReactNode | ((props: OverlayPanelProps) => React.ReactNode);

    type EventType = React.SyntheticEvent | undefined | null;

    type TargetType = HTMLElement | EventTarget | undefined | null;

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface Breakpoints {
        [key: string]: string;
    }

    export interface OverlayPanelProps {
        id?: string;
        dismissable?: boolean;
        showCloseIcon?: boolean;
        style?: object;
        className?: string;
        appendTo?: AppendToType;
        ariaCloseLabel?: string;
        breakpoints?: Breakpoints;
        transitionOptions?: object;
        onShow?(): void;
        onHide?(): void;
    }

    export class OverlayPanel extends React.Component<OverlayPanelProps, any> {
        public toggle(event: EventType, target: TargetType): void;
        public show(event: EventType, target: TargetType): void;
        public hide(): void;
    }
}
