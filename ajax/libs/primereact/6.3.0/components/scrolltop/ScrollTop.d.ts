import * as React from 'react';

declare namespace ScrollTop {

    type TargetType = 'window' | 'parent';

    type ScrollBehavior = 'auto' | 'smooth';

    interface ScrollTopProps {
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
}

export declare class ScrollTop extends React.Component<ScrollTop.ScrollTopProps, any> { }
