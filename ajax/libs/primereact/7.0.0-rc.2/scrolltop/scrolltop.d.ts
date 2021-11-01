import * as React from 'react';

type ScrollTopTargetType = 'window' | 'parent';

type ScrollTopScrollBehavior = 'auto' | 'smooth';

export interface ScrollTopProps {
    target?: ScrollTopTargetType;
    threshold?: number;
    icon?: string;
    behavior?: ScrollTopScrollBehavior;
    className?: string;
    style?: object;
    transitionOptions?: object;
    onShow?(): void;
    onHide?(): void;
}

export declare class ScrollTop extends React.Component<ScrollTopProps, any> { }
