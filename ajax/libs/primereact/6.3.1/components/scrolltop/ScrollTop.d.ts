import * as React from 'react';

declare module 'primereact/scrolltop' {

    type TargetType = 'window' | 'parent';

    type ScrollBehavior = 'auto' | 'smooth';

    export interface ScrollTopProps {
        target?: TargetType;
        threshold?: number;
        icon?: string;
        behavior?: ScrollBehavior;
        className?: string;
        style?: object;
        transitionOptions?: object;
        onShow?(): void;
        onHide?(): void;
    }

    export class ScrollTop extends React.Component<ScrollTopProps, any> { }
}
