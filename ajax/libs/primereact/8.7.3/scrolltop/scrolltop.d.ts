import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';

type ScrollTopTargetType = 'window' | 'parent';

type ScrollTopScrollBehavior = 'auto' | 'smooth';

export interface ScrollTopProps {
    target?: ScrollTopTargetType;
    threshold?: number;
    icon?: IconType<ScrollTopProps>;
    behavior?: ScrollTopScrollBehavior;
    className?: string;
    style?: React.CSSProperties;
    transitionOptions?: CSSTransitionProps;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class ScrollTop extends React.Component<ScrollTopProps, any> {
    public getElement(): HTMLButtonElement;
}
