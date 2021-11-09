import * as React from 'react';
import {IconType} from "../utils/Utils";

type ScrollTopTargetType = 'window' | 'parent';

type ScrollTopScrollBehavior = 'auto' | 'smooth';

export interface ScrollTopProps {
    target?: ScrollTopTargetType;
    threshold?: number;
    icon?: IconType<ScrollTopProps>;
    behavior?: ScrollTopScrollBehavior;
    className?: string;
    style?: object;
    transitionOptions?: object;
    onShow?(): void;
    onHide?(): void;
}

export declare class ScrollTop extends React.Component<ScrollTopProps, any> { }
