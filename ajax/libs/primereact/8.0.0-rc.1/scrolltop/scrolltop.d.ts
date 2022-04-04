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
    style?: object;
    transitionOptions?: CSSTransitionProps;
    onShow?(): void;
    onHide?(): void;
}

export declare class ScrollTop extends React.Component<ScrollTopProps, any> { }
